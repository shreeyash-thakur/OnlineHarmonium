// Sample-based harmonium engine using Web Audio API.
//
// This intentionally mirrors the playback mechanics of the reference
// "Web Harmonium" project by Rajaraman Iyer (rajaramaniyer.github.io/webharmonium.html)
// note-for-note, using the same "kannan" harmonium sustain sample and
// convolution reverb IR, so the reed tone matches exactly:
//   - the sample plays from its very start (offset 0), preserving the
//     natural reed attack chiff, then loops the full remainder of the
//     buffer from loopStart (no arbitrary loop-end truncation)
//   - notes have NO synthetic attack/release envelope — they start and
//     stop instantly, exactly like the original engine
//   - there is no lowpass filter or tonal coloring applied to the signal
//   - reverb is an additive parallel send (dry + wet), not a crossfade,
//     and is off by default — matching the original's toggle
//
// The .wav files live in /public/audio and are fetched by root-relative path
// at runtime (see README for how to obtain them).
const SAMPLE_URL = "/audio/harmonium-kannan-orig.wav";
const REVERB_URL = "/audio/reverb.wav";

export type HarmoniumPreset = "old-delhi" | "scale-changer" | "concert" | "vintage";

// The source sample is recorded at D4 (MIDI 62) — matches the reference project's rootKey.
const SAMPLE_BASE_MIDI = 62;

// Presets only vary the reverb send amount (an additive convolver send),
// exactly like toggling "Reverb" in the reference app. They never touch
// filtering, gain "brightness", or the raw reed tone, so the base sound
// is identical across presets and matches the reference 1:1.
const presetConfig: Record<HarmoniumPreset, { reverb: number }> = {
  "old-delhi":     { reverb: 0 },
  "scale-changer": { reverb: 0.15 },
  "concert":       { reverb: 0.3 },
  "vintage":       { reverb: 0.45 },
};

function noteToMidi(note: string): number {
  const m = /^([A-G])(#|b)?(-?\d+)$/.exec(note);
  if (!m) return 60;
  const pcMap: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  let pc = pcMap[m[1]];
  if (m[2] === "#") pc++;
  else if (m[2] === "b") pc--;
  const oct = parseInt(m[3], 10);
  return (oct + 1) * 12 + pc;
}

// loopStart matches the reference exactly; loopEnd is intentionally left
// unset so playback loops the full remainder of the buffer (native
// AudioBufferSourceNode default), same as the original.
const LOOP_START = 0.5;

class HarmoniumEngine {
  private started = false;
  private preloadPromise: Promise<void> | null = null;
  private startPromise: Promise<void> | null = null;
  private ctx: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private reverbBuffer: AudioBuffer | null = null;
  private masterGain: GainNode | null = null;
  private wetGain: GainNode | null = null;
  private convolver: ConvolverNode | null = null;
  private active = new Map<string, AudioBufferSourceNode>();
  private currentPreset: HarmoniumPreset = "old-delhi";
  private userVolume = 0.85;

  preload() {
    if (typeof window === "undefined") return;

    if (!this.preloadPromise) {
      this.preloadPromise = this.prepareAudio().catch(error => {
        this.preloadPromise = null;
        throw error;
      });
    }

    return this.preloadPromise;
  }

  async ensureStarted() {
    if (this.started) {
      if (this.ctx?.state === "suspended") await this.ctx.resume();
      return;
    }

    if (this.startPromise) return this.startPromise;

    this.startPromise = (async () => {
      await this.preload();
      const ctx = this.ctx;
      if (!ctx) return;
      if (ctx.state === "suspended") await ctx.resume();
      this.started = true;
      this.applyPreset(this.currentPreset);
      this.setMasterVolume(this.userVolume);
    })().catch(error => {
      this.startPromise = null;
      throw error;
    });

    return this.startPromise;
  }

  private async prepareAudio() {
    if (this.ctx && this.buffer && this.reverbBuffer && this.masterGain) return;

    const AC = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = this.ctx ?? new AC({ latencyHint: "interactive" });
    this.ctx = ctx;

    // Fetch sample + IR in parallel
    const [sampleBuf, irBuf] = await Promise.all([
      fetch(SAMPLE_URL)
        .then(r => {
          if (!r.ok) throw new Error(`Missing ${SAMPLE_URL} (${r.status}) — see README for setup`);
          return r.arrayBuffer();
        })
        .then(b => ctx.decodeAudioData(b)),
      fetch(REVERB_URL)
        .then(r => {
          if (!r.ok) throw new Error(`Missing ${REVERB_URL} (${r.status}) — see README for setup`);
          return r.arrayBuffer();
        })
        .then(b => ctx.decodeAudioData(b)),
    ]);
    this.buffer = sampleBuf;
    this.reverbBuffer = irBuf;

    // Signal chain: voices -> masterGain -> destination (dry, always)
    //                          masterGain -> convolver -> wetGain -> destination (additive send)
    // This mirrors the reference engine's gainNode -> destination (+ optional
    // gainNode -> reverbNode -> destination) routing exactly — no dry/wet
    // crossfade, no filtering, no synthetic noise layers.
    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = this.userVolume;
    this.masterGain.connect(ctx.destination);

    this.wetGain = ctx.createGain();
    this.convolver = ctx.createConvolver();
    this.convolver.buffer = this.reverbBuffer;
    this.masterGain.connect(this.convolver).connect(this.wetGain).connect(ctx.destination);

    this.applyPreset(this.currentPreset);
  }

  applyPreset(preset: HarmoniumPreset) {
    this.currentPreset = preset;
    const ctx = this.ctx;
    const wetGain = this.wetGain;
    if (!ctx || !wetGain) return;
    const c = presetConfig[preset];
    const t = ctx.currentTime;
    wetGain.gain.cancelScheduledValues(t);
    wetGain.gain.setTargetAtTime(c.reverb, t, 0.01);
  }

  noteOn(note: string) {
    const ctx = this.ctx;
    const buffer = this.buffer;
    const masterGain = this.masterGain;
    if (!this.started || !ctx || !buffer || !masterGain) return;
    // Fast retrigger: if already sounding, kill previous instantly (matches
    // the reference engine's setSourceNode(), which stops(0) before rearming).
    const existing = this.active.get(note);
    if (existing) {
      try { existing.stop(); existing.disconnect(); } catch {}
      this.active.delete(note);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.loopStart = LOOP_START;
    // loopEnd intentionally left unset — loops the full remainder of the
    // buffer, same as the reference (it never sets loopEnd).
    const detuneCents = (noteToMidi(note) - SAMPLE_BASE_MIDI) * 100;
    src.detune.value = detuneCents;

    src.connect(masterGain);
    // Start immediately from the very beginning of the sample (offset 0),
    // preserving the natural reed attack — no synthetic envelope.
    src.start(0);

    this.active.set(note, src);
  }

  noteOff(note: string) {
    if (!this.started) return;
    const src = this.active.get(note);
    if (!src) return;
    this.active.delete(note);
    // Instant, hard stop — matches the reference engine's immediate
    // sourceNodes[i].stop(0) with no release ramp.
    try { src.stop(); src.disconnect(); } catch {}
  }

  allOff() {
    for (const n of Array.from(this.active.keys())) this.noteOff(n);
  }

  setMasterVolume(v: number) {
    this.userVolume = Math.max(0, Math.min(1, v));
    const ctx = this.ctx;
    const masterGain = this.masterGain;
    if (!ctx || !masterGain) return;
    const t = ctx.currentTime;
    masterGain.gain.cancelScheduledValues(t);
    masterGain.gain.setTargetAtTime(this.userVolume, t, 0.01);
  }
}

let _engine: HarmoniumEngine | null = null;
export function getHarmonium(): HarmoniumEngine {
  if (!_engine) _engine = new HarmoniumEngine();
  return _engine;
}
