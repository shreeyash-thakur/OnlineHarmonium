// Sample-based harmonium engine using Web Audio API.
// Uses the original "kannan" harmonium sustain sample + convolution reverb IR
// from the Web Harmonium project by Rajaraman Iyer, for authentic reed sound.
//
// The .wav files live in /public/audio and are fetched by root-relative path
// at runtime (see README for how to obtain them).
const SAMPLE_URL = "/audio/harmonium-kannan-orig.wav";
const REVERB_URL = "/audio/reverb.wav";

export type HarmoniumPreset = "old-delhi" | "scale-changer" | "concert" | "vintage";

// The source sample is recorded at D4 (MIDI 62) — matches the reference project's rootKey.
const SAMPLE_BASE_MIDI = 62;

const presetConfig: Record<
  HarmoniumPreset,
  {
    filter: number;
    reverb: number;
    brightness: number;
  }
> = {
  "old-delhi": { filter: 4200, reverb: 0.05, brightness: 0.95 },
  "scale-changer": { filter: 5200, reverb: 0.03, brightness: 1.0 },
  concert: { filter: 6500, reverb: 0.1, brightness: 1.1 },
  vintage: { filter: 3200, reverb: 0.12, brightness: 0.85 },
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

type Voice = {
  src: AudioBufferSourceNode;
  gain: GainNode;
};

const NOTE_START_OFFSET = 0.5;
const NOTE_ATTACK_TIME = 0.001;
const NOTE_RELEASE_TIME = 0.012;

class HarmoniumEngine {
  private started = false;
  private preloadPromise: Promise<void> | null = null;
  private startPromise: Promise<void> | null = null;
  private ctx: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private reverbBuffer: AudioBuffer | null = null;
  private masterGain: GainNode | null = null;
  private dryGain: GainNode | null = null;
  private wetGain: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private convolver: ConvolverNode | null = null;
  private bellowsGain: GainNode | null = null;
  private bellowsSrc: AudioBufferSourceNode | null = null;
  private active = new Map<string, Voice>();
  private currentPreset: HarmoniumPreset = "old-delhi";
  private userVolume = 0.85;

  preload() {
    if (typeof window === "undefined") return;

    if (!this.preloadPromise) {
      this.preloadPromise = this.prepareAudio().catch((error) => {
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
    })().catch((error) => {
      this.startPromise = null;
      throw error;
    });

    return this.startPromise;
  }

  private async prepareAudio() {
    if (
      this.ctx &&
      this.buffer &&
      this.reverbBuffer &&
      this.masterGain &&
      this.filter &&
      this.bellowsGain
    )
      return;

    const AC = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = this.ctx ?? new AC({ latencyHint: "interactive" });
    this.ctx = ctx;

    // Fetch sample + IR in parallel
    const [sampleBuf, irBuf] = await Promise.all([
      fetch(SAMPLE_URL)
        .then((r) => {
          if (!r.ok) throw new Error(`Missing ${SAMPLE_URL} (${r.status}) — see README for setup`);
          return r.arrayBuffer();
        })
        .then((b) => ctx.decodeAudioData(b)),
      fetch(REVERB_URL)
        .then((r) => {
          if (!r.ok) throw new Error(`Missing ${REVERB_URL} (${r.status}) — see README for setup`);
          return r.arrayBuffer();
        })
        .then((b) => ctx.decodeAudioData(b)),
    ]);
    this.buffer = sampleBuf;
    this.reverbBuffer = irBuf;

    // Signal chain: voices -> filter -> [dry -> master, wet -> convolver -> master]
    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = this.userVolume;
    this.masterGain.connect(ctx.destination);

    this.filter = ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.Q.value = 0.5;

    this.dryGain = ctx.createGain();
    this.wetGain = ctx.createGain();
    this.convolver = ctx.createConvolver();
    this.convolver.buffer = this.reverbBuffer;

    this.filter.connect(this.dryGain).connect(this.masterGain);
    this.filter.connect(this.convolver).connect(this.wetGain).connect(this.masterGain);
    this.dryGain.gain.value = 1.0;

    // Bellows air noise (very subtle) — filtered white noise loop
    const noiseLen = 2 * ctx.sampleRate;
    const noiseBuf = ctx.createBuffer(1, noiseLen, ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) nd[i] = (Math.random() * 2 - 1) * 0.5;
    const nSrc = ctx.createBufferSource();
    nSrc.buffer = noiseBuf;
    nSrc.loop = true;
    const nFilt = ctx.createBiquadFilter();
    nFilt.type = "bandpass";
    nFilt.frequency.value = 700;
    nFilt.Q.value = 0.8;
    this.bellowsGain = ctx.createGain();
    this.bellowsGain.gain.value = 0.005;
    nSrc.connect(nFilt).connect(this.bellowsGain).connect(this.masterGain);
    nSrc.start();
    this.bellowsSrc = nSrc;

    this.applyPreset(this.currentPreset);
  }

  applyPreset(preset: HarmoniumPreset) {
    this.currentPreset = preset;
    const ctx = this.ctx;
    const filter = this.filter;
    const wetGain = this.wetGain;
    const dryGain = this.dryGain;
    const masterGain = this.masterGain;
    if (!ctx || !filter || !wetGain || !dryGain || !masterGain) return;
    const c = presetConfig[preset];
    const t = ctx.currentTime;
    filter.frequency.cancelScheduledValues(t);
    filter.frequency.setTargetAtTime(c.filter, t, 0.01);
    wetGain.gain.cancelScheduledValues(t);
    dryGain.gain.cancelScheduledValues(t);
    masterGain.gain.cancelScheduledValues(t);
    wetGain.gain.setTargetAtTime(c.reverb, t, 0.01);
    dryGain.gain.setTargetAtTime(1 - c.reverb * 0.4, t, 0.01);
    masterGain.gain.setTargetAtTime(this.userVolume * c.brightness, t, 0.01);
  }

  noteOn(note: string, velocity = 0.9) {
    const ctx = this.ctx;
    const buffer = this.buffer;
    const filter = this.filter;
    const bellowsGain = this.bellowsGain;
    if (!this.started || !ctx || !buffer || !filter || !bellowsGain) return;
    // Fast retrigger: if already sounding, kill previous instantly.
    const existing = this.active.get(note);
    if (existing) {
      try {
        existing.src.stop();
        existing.src.disconnect();
        existing.gain.disconnect();
      } catch {}
      this.active.delete(note);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.loopStart = NOTE_START_OFFSET;
    src.loopEnd = 7.5;
    const detuneCents = (noteToMidi(note) - SAMPLE_BASE_MIDI) * 100;
    src.detune.value = detuneCents;

    const gain = ctx.createGain();
    const v = Math.max(0.2, Math.min(1, velocity));
    const t = ctx.currentTime;
    // Near-instant attack: jump straight into the stable reed sustain portion.
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(v * 0.85, t + NOTE_ATTACK_TIME);

    src.connect(gain).connect(filter);
    src.start(0, NOTE_START_OFFSET);

    this.active.set(note, { src, gain });

    // Bump bellows air
    bellowsGain.gain.cancelScheduledValues(t);
    bellowsGain.gain.setTargetAtTime(0.05, t, 0.01);
  }

  noteOff(note: string) {
    const ctx = this.ctx;
    const bellowsGain = this.bellowsGain;
    if (!this.started || !ctx || !bellowsGain) return;
    const voice = this.active.get(note);
    if (!voice) return;
    this.active.delete(note);
    const t = ctx.currentTime;
    const releaseTime = NOTE_RELEASE_TIME;
    voice.gain.gain.cancelScheduledValues(t);
    voice.gain.gain.setValueAtTime(voice.gain.gain.value, t);
    voice.gain.gain.linearRampToValueAtTime(0, t + releaseTime);
    try {
      voice.src.stop(t + releaseTime + 0.05);
    } catch {}
    setTimeout(
      () => {
        try {
          voice.src.disconnect();
          voice.gain.disconnect();
        } catch {}
      },
      (releaseTime + 0.1) * 1000,
    );

    if (this.active.size === 0) {
      bellowsGain.gain.cancelScheduledValues(t);
      bellowsGain.gain.setTargetAtTime(0.005, t, 0.03);
    }
  }

  allOff() {
    for (const n of Array.from(this.active.keys())) this.noteOff(n);
  }

  setMasterVolume(v: number) {
    this.userVolume = Math.max(0, Math.min(1, v));
    const ctx = this.ctx;
    const masterGain = this.masterGain;
    if (!ctx || !masterGain) return;
    const c = presetConfig[this.currentPreset];
    const t = ctx.currentTime;
    masterGain.gain.cancelScheduledValues(t);
    masterGain.gain.setTargetAtTime(this.userVolume * c.brightness, t, 0.01);
  }
}

let _engine: HarmoniumEngine | null = null;
export function getHarmonium(): HarmoniumEngine {
  if (!_engine) _engine = new HarmoniumEngine();
  return _engine;
}
