// Sample-based harmonium engine using Web Audio API.
// Uses the original "kannan" harmonium sustain sample + convolution reverb IR
// from the Web Harmonium project by Rajaraman Iyer, for authentic reed sound.
import sampleAsset from "@/assets/harmonium-kannan-orig.wav.asset.json";
import reverbAsset from "@/assets/reverb.wav.asset.json";

export type HarmoniumPreset = "old-delhi" | "scale-changer" | "concert" | "vintage";

// The source sample is recorded at D4 (MIDI 62) — matches the reference project's rootKey.
const SAMPLE_BASE_MIDI = 62;

const presetConfig: Record<HarmoniumPreset, {
  filter: number; reverb: number; brightness: number;
}> = {
  "old-delhi":     { filter: 4200, reverb: 0.28, brightness: 0.95 },
  "scale-changer": { filter: 5200, reverb: 0.20, brightness: 1.00 },
  "concert":       { filter: 6500, reverb: 0.42, brightness: 1.10 },
  "vintage":       { filter: 3200, reverb: 0.50, brightness: 0.85 },
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

class HarmoniumEngine {
  private started = false;
  private ctx: AudioContext | null = null;
  private buffer: AudioBuffer | null = null;
  private reverbBuffer: AudioBuffer | null = null;
  private masterGain!: GainNode;
  private dryGain!: GainNode;
  private wetGain!: GainNode;
  private filter!: BiquadFilterNode;
  private convolver!: ConvolverNode;
  private bellowsGain!: GainNode;
  private bellowsSrc: AudioBufferSourceNode | null = null;
  private active = new Map<string, Voice>();
  private currentPreset: HarmoniumPreset = "old-delhi";
  private userVolume = 0.85;

  async ensureStarted() {
    if (this.started) return;
    if (typeof window === "undefined") return;

    const AC = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AC();
    if (this.ctx.state === "suspended") await this.ctx.resume();

    // Fetch sample + IR in parallel
    const [sampleBuf, irBuf] = await Promise.all([
      fetch(sampleAsset.url).then(r => r.arrayBuffer()).then(b => this.ctx!.decodeAudioData(b)),
      fetch(reverbAsset.url).then(r => r.arrayBuffer()).then(b => this.ctx!.decodeAudioData(b)),
    ]);
    this.buffer = sampleBuf;
    this.reverbBuffer = irBuf;

    // Signal chain: voices -> filter -> [dry -> master, wet -> convolver -> master]
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = this.userVolume;
    this.masterGain.connect(this.ctx.destination);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = "lowpass";
    this.filter.Q.value = 0.5;

    this.dryGain = this.ctx.createGain();
    this.wetGain = this.ctx.createGain();
    this.convolver = this.ctx.createConvolver();
    this.convolver.buffer = this.reverbBuffer;

    this.filter.connect(this.dryGain).connect(this.masterGain);
    this.filter.connect(this.convolver).connect(this.wetGain).connect(this.masterGain);
    this.dryGain.gain.value = 1.0;

    // Bellows air noise (very subtle) — filtered white noise loop
    const noiseLen = 2 * this.ctx.sampleRate;
    const noiseBuf = this.ctx.createBuffer(1, noiseLen, this.ctx.sampleRate);
    const nd = noiseBuf.getChannelData(0);
    for (let i = 0; i < noiseLen; i++) nd[i] = (Math.random() * 2 - 1) * 0.5;
    const nSrc = this.ctx.createBufferSource();
    nSrc.buffer = noiseBuf;
    nSrc.loop = true;
    const nFilt = this.ctx.createBiquadFilter();
    nFilt.type = "bandpass";
    nFilt.frequency.value = 700;
    nFilt.Q.value = 0.8;
    this.bellowsGain = this.ctx.createGain();
    this.bellowsGain.gain.value = 0.005;
    nSrc.connect(nFilt).connect(this.bellowsGain).connect(this.masterGain);
    nSrc.start();
    this.bellowsSrc = nSrc;

    this.applyPreset(this.currentPreset);
    this.started = true;
  }

  applyPreset(preset: HarmoniumPreset) {
    this.currentPreset = preset;
    if (!this.started || !this.ctx) return;
    const c = presetConfig[preset];
    const t = this.ctx.currentTime;
    this.filter.frequency.cancelScheduledValues(t);
    this.filter.frequency.linearRampToValueAtTime(c.filter, t + 0.2);
    this.wetGain.gain.linearRampToValueAtTime(c.reverb, t + 0.3);
    this.dryGain.gain.linearRampToValueAtTime(1 - c.reverb * 0.4, t + 0.3);
    this.masterGain.gain.linearRampToValueAtTime(this.userVolume * c.brightness, t + 0.2);
  }

  noteOn(note: string, velocity = 0.9) {
    if (!this.started || !this.ctx || !this.buffer) return;
    if (this.active.has(note)) return;

    const src = this.ctx.createBufferSource();
    src.buffer = this.buffer;
    src.loop = true;
    src.loopStart = 0.5;
    src.loopEnd = 7.5;
    const detuneCents = (noteToMidi(note) - SAMPLE_BASE_MIDI) * 100;
    src.detune.value = detuneCents;

    const gain = this.ctx.createGain();
    const v = Math.max(0.2, Math.min(1, velocity));
    const t = this.ctx.currentTime;
    // Reed-like attack: quick swell
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(v * 0.85, t + 0.04);

    src.connect(gain).connect(this.filter);
    src.start(0);

    this.active.set(note, { src, gain });

    // Bump bellows air
    this.bellowsGain.gain.cancelScheduledValues(t);
    this.bellowsGain.gain.linearRampToValueAtTime(0.05, t + 0.08);
  }

  noteOff(note: string) {
    if (!this.started || !this.ctx) return;
    const voice = this.active.get(note);
    if (!voice) return;
    this.active.delete(note);
    const t = this.ctx.currentTime;
    const releaseTime = 0.28;
    voice.gain.gain.cancelScheduledValues(t);
    voice.gain.gain.setValueAtTime(voice.gain.gain.value, t);
    voice.gain.gain.linearRampToValueAtTime(0, t + releaseTime);
    try { voice.src.stop(t + releaseTime + 0.05); } catch {}
    setTimeout(() => {
      try { voice.src.disconnect(); voice.gain.disconnect(); } catch {}
    }, (releaseTime + 0.1) * 1000);

    if (this.active.size === 0) {
      this.bellowsGain.gain.cancelScheduledValues(t);
      this.bellowsGain.gain.linearRampToValueAtTime(0.005, t + 0.5);
    }
  }

  allOff() {
    for (const n of Array.from(this.active.keys())) this.noteOff(n);
  }

  setMasterVolume(v: number) {
    this.userVolume = Math.max(0, Math.min(1, v));
    if (!this.started || !this.ctx) return;
    const c = presetConfig[this.currentPreset];
    const t = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(t);
    this.masterGain.gain.linearRampToValueAtTime(this.userVolume * c.brightness, t + 0.1);
  }
}

let _engine: HarmoniumEngine | null = null;
export function getHarmonium(): HarmoniumEngine {
  if (!_engine) _engine = new HarmoniumEngine();
  return _engine;
}
