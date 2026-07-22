// Harmonium sound engine using Tone.js. Approximates a free-reed harmonium
// with additive-ish detuned sawtooth voices, band-limited via a lowpass,
// plus a subtle noise "bellows" bed.
import * as Tone from "tone";

export type HarmoniumPreset = "old-delhi" | "scale-changer" | "concert" | "vintage";

const presetConfig: Record<HarmoniumPreset, {
  detune: number; filter: number; reverb: number; brightness: number;
}> = {
  "old-delhi":     { detune: 14, filter: 2200, reverb: 0.35, brightness: 0.9 },
  "scale-changer": { detune: 9,  filter: 2600, reverb: 0.25, brightness: 1.0 },
  "concert":       { detune: 6,  filter: 3200, reverb: 0.45, brightness: 1.1 },
  "vintage":       { detune: 18, filter: 1800, reverb: 0.5,  brightness: 0.8 },
};

class HarmoniumEngine {
  private started = false;
  private voices = new Map<string, Tone.PolySynth>();
  private reverb!: Tone.Reverb;
  private eq!: Tone.EQ3;
  private comp!: Tone.Compressor;
  private filter!: Tone.Filter;
  private bellows!: Tone.Noise;
  private bellowsGain!: Tone.Gain;
  private masterGain!: Tone.Gain;
  private active = new Map<string, number>();
  private currentPreset: HarmoniumPreset = "old-delhi";

  async ensureStarted() {
    if (this.started) return;
    await Tone.start();
    this.masterGain = new Tone.Gain(0.85).toDestination();
    this.comp = new Tone.Compressor({ threshold: -18, ratio: 3 }).connect(this.masterGain);
    this.reverb = new Tone.Reverb({ decay: 2.8, wet: 0.3 }).connect(this.comp);
    this.eq = new Tone.EQ3({ low: 1, mid: 0, high: -2 }).connect(this.reverb);
    this.filter = new Tone.Filter({ frequency: 2400, type: "lowpass", Q: 0.6 }).connect(this.eq);

    // Bellows air noise (very subtle)
    this.bellowsGain = new Tone.Gain(0).connect(this.eq);
    this.bellows = new Tone.Noise("pink");
    const bellowsFilter = new Tone.Filter({ frequency: 700, type: "bandpass", Q: 0.8 });
    this.bellows.connect(bellowsFilter);
    bellowsFilter.connect(this.bellowsGain);
    this.bellows.start();
    // Gentle idle breathing
    new Tone.LFO({ frequency: 0.5, min: 0.005, max: 0.02 }).connect(this.bellowsGain.gain).start();

    // Two detuned poly voices for the "reed" beating
    const makeSynth = (detune: number) => new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "sawtooth" },
      envelope: { attack: 0.05, decay: 0.1, sustain: 0.9, release: 0.35 },
      detune,
    }).connect(this.filter);

    this.voices.set("a", makeSynth(-7));
    this.voices.set("b", makeSynth(+7));
    this.voices.set("sub", new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.08, decay: 0.15, sustain: 0.7, release: 0.4 },
      volume: -14,
    }).connect(this.filter));

    this.applyPreset(this.currentPreset);
    this.started = true;
  }

  applyPreset(preset: HarmoniumPreset) {
    this.currentPreset = preset;
    if (!this.started) return;
    const c = presetConfig[preset];
    this.voices.get("a")!.set({ detune: -c.detune });
    this.voices.get("b")!.set({ detune: +c.detune });
    this.filter.frequency.rampTo(c.filter, 0.2);
    this.reverb.wet.rampTo(c.reverb, 0.3);
    this.masterGain.gain.rampTo(0.85 * c.brightness, 0.2);
  }

  noteOn(note: string, velocity = 0.9) {
    if (!this.started) return;
    if (this.active.has(note)) return;
    this.active.set(note, Tone.now());
    const v = Math.max(0.2, Math.min(1, velocity));
    this.voices.get("a")!.triggerAttack(note, undefined, v);
    this.voices.get("b")!.triggerAttack(note, undefined, v * 0.9);
    this.voices.get("sub")!.triggerAttack(note, undefined, v * 0.6);
    this.bellowsGain.gain.rampTo(0.06, 0.08);
  }

  noteOff(note: string) {
    if (!this.started) return;
    if (!this.active.has(note)) return;
    this.active.delete(note);
    this.voices.get("a")!.triggerRelease(note);
    this.voices.get("b")!.triggerRelease(note);
    this.voices.get("sub")!.triggerRelease(note);
    if (this.active.size === 0) this.bellowsGain.gain.rampTo(0.008, 0.4);
  }

  allOff() {
    for (const n of Array.from(this.active.keys())) this.noteOff(n);
  }

  setMasterVolume(v: number) {
    if (!this.started) return;
    this.masterGain.gain.rampTo(Math.max(0, Math.min(1, v)), 0.1);
  }
}

let _engine: HarmoniumEngine | null = null;
export function getHarmonium(): HarmoniumEngine {
  if (typeof window === "undefined") {
    // Return a no-op stub during SSR
    return new HarmoniumEngine();
  }
  if (!_engine) _engine = new HarmoniumEngine();
  return _engine;
}
