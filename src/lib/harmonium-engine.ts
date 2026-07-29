// Sample-based harmonium engine using Web Audio API.
//
// Playback mechanics mirror the reference "Web Harmonium" project by
// Rajaraman Iyer (rajaramaniyer.github.io/webharmonium.html) note-for-note,
// using the same "kannan" harmonium sustain sample:
//   - the sample plays from its very start (offset 0), preserving the
//     natural reed attack chiff, then loops the full remainder of the
//     buffer from loopStart (no arbitrary loop-end truncation)
//   - notes have NO synthetic attack/release envelope — they start and
//     stop instantly, exactly like the original engine (unless Sustain is on)
//   - reverb is an additive parallel send (dry + wet), not a crossfade
//
// On top of that reference behaviour this engine adds:
//   - Sound banks (Indian / Reed / Concert): each is a distinct tone (EQ)
//     + room (reverb) combination built from the same real reed sample —
//     there's only one recorded instrument here, so banks are genuine
//     signal-chain variations rather than fake separate instruments.
//   - A real scale changer (semitone transpose) and octave shift, applied
//     as extra detune on top of the note's own pitch — this is what an
//     actual harmonium's scale-changer coupler does.
//   - Sustain (pedal-style): notes keep ringing after key-up until the
//     key is pressed again or Sustain is switched off.
//   - A recording tap (MediaStreamAudioDestinationNode) so the mixed
//     output (dry + reverb) can be captured with MediaRecorder.
//
// The .wav files live in /public/audio and are fetched by root-relative path
// at runtime (see README for how to obtain them).
const SAMPLE_URL = "/audio/harmonium-kannan-orig.wav";
const REVERB_URL = "/audio/reverb.wav";

export type SoundBank = "indian" | "reed" | "concert";

// The source sample is recorded at D4 (MIDI 62) — matches the reference project's rootKey.
const SAMPLE_BASE_MIDI = 62;

// Each bank shapes the same raw reed sample differently:
//  - indian:  warm & close, like sitting right next to the instrument — a
//             gentle low-pass roll-off, almost no room.
//  - reed:    the rawest, brightest tone — a slight presence boost on the
//             upper-mids so the reed's buzz cuts through, minimal reverb.
//  - concert: a bigger stage — darker top end, larger reverb send, like
//             it's being heard a few rows back in a hall.
const bankConfig: Record<
  SoundBank,
  {
    reverb: number;
    filterType: BiquadFilterType;
    filterFreq: number;
    filterGain: number;
    filterQ: number;
  }
> = {
  indian: { reverb: 0.1, filterType: "lowpass", filterFreq: 8000, filterGain: 0, filterQ: 0.7 },
  reed: { reverb: 0.04, filterType: "peaking", filterFreq: 2200, filterGain: 4, filterQ: 1.1 },
  concert: { reverb: 0.38, filterType: "lowpass", filterFreq: 6200, filterGain: 0, filterQ: 0.7 },
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
  private toneFilter: BiquadFilterNode | null = null;
  private masterGain: GainNode | null = null;
  private wetGain: GainNode | null = null;
  private convolver: ConvolverNode | null = null;
  private recordDest: MediaStreamAudioDestinationNode | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private recordedChunks: BlobPart[] = [];

  /** Notes currently physically held down (key/mouse/MIDI still pressed). */
  private active = new Map<string, AudioBufferSourceNode>();
  /** Notes that were released while sustain was on, still ringing. */
  private sustaining = new Map<string, AudioBufferSourceNode>();

  private currentBank: SoundBank = "indian";
  private userVolume = 0.85;
  private sustain = false;
  /** Semitone offset from the scale-changer coupler + octave shift. */
  private transposeSemitones = 0;

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
      this.applyBank(this.currentBank);
      this.setMasterVolume(this.userVolume);
    })().catch((error) => {
      this.startPromise = null;
      throw error;
    });

    return this.startPromise;
  }

  private async prepareAudio() {
    if (this.ctx && this.buffer && this.reverbBuffer && this.masterGain) return;

    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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

    // Signal chain:
    //   voices -> toneFilter -> masterGain -> destination (dry, always)
    //                                       -> convolver -> wetGain -> destination (additive send)
    //   masterGain & wetGain also -> recordDest, for capturing a mixed recording
    this.toneFilter = ctx.createBiquadFilter();
    this.toneFilter.type = "lowpass";
    this.toneFilter.frequency.value = 20000;

    this.masterGain = ctx.createGain();
    this.masterGain.gain.value = this.userVolume;
    this.toneFilter.connect(this.masterGain);
    this.masterGain.connect(ctx.destination);

    this.wetGain = ctx.createGain();
    this.convolver = ctx.createConvolver();
    this.convolver.buffer = this.reverbBuffer;
    this.masterGain.connect(this.convolver).connect(this.wetGain).connect(ctx.destination);

    this.recordDest = ctx.createMediaStreamDestination();
    this.masterGain.connect(this.recordDest);
    this.wetGain.connect(this.recordDest);

    this.applyBank(this.currentBank);
  }

  applyBank(bank: SoundBank) {
    this.currentBank = bank;
    const ctx = this.ctx;
    const wetGain = this.wetGain;
    const filter = this.toneFilter;
    if (!ctx || !wetGain || !filter) return;
    const c = bankConfig[bank];
    const t = ctx.currentTime;

    wetGain.gain.cancelScheduledValues(t);
    wetGain.gain.setTargetAtTime(c.reverb, t, 0.01);

    filter.type = c.filterType;
    filter.frequency.cancelScheduledValues(t);
    filter.frequency.setTargetAtTime(c.filterFreq, t, 0.01);
    filter.Q.setTargetAtTime(c.filterQ, t, 0.01);
    if ("gain" in filter) filter.gain.setTargetAtTime(c.filterGain, t, 0.01);
  }

  /** @deprecated kept for backwards compatibility — use applyBank */
  applyPreset(bank: SoundBank) {
    this.applyBank(bank);
  }

  /** Real scale-changer coupler: shifts pitch of every note by this many semitones. */
  setTranspose(semitones: number) {
    this.transposeSemitones = semitones;
    // Re-pitch anything currently sounding so the change is audible live.
    const ctx = this.ctx;
    if (!ctx) return;
    const t = ctx.currentTime;
    for (const [note, src] of [...this.active, ...this.sustaining]) {
      const cents = (noteToMidi(note) - SAMPLE_BASE_MIDI + this.transposeSemitones) * 100;
      src.detune.setTargetAtTime(cents, t, 0.01);
    }
  }

  getTranspose() {
    return this.transposeSemitones;
  }

  setSustain(on: boolean) {
    this.sustain = on;
    if (!on) {
      // Pedal up: stop everything that was only ringing because of sustain.
      for (const [note, src] of this.sustaining) {
        try {
          src.stop();
          src.disconnect();
        } catch {
          // ignore
        }
        this.sustaining.delete(note);
      }
    }
  }

  getSustain() {
    return this.sustain;
  }

  noteOn(note: string) {
    const ctx = this.ctx;
    const buffer = this.buffer;
    const filter = this.toneFilter;
    if (!this.started || !ctx || !buffer || !filter) return;

    // Fast retrigger: if already sounding (held or sustaining), kill previous
    // instantly (matches the reference engine's setSourceNode(), which stops(0)
    // before rearming).
    const existing = this.active.get(note) ?? this.sustaining.get(note);
    if (existing) {
      try {
        existing.stop();
        existing.disconnect();
      } catch {
        // ignore
      }
      this.active.delete(note);
      this.sustaining.delete(note);
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    src.loopStart = LOOP_START;
    // loopEnd intentionally left unset — loops the full remainder of the
    // buffer, same as the reference (it never sets loopEnd).
    const detuneCents = (noteToMidi(note) - SAMPLE_BASE_MIDI + this.transposeSemitones) * 100;
    src.detune.value = detuneCents;

    src.connect(filter);
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

    if (this.sustain) {
      // Pedal down: let it keep ringing instead of stopping.
      this.sustaining.set(note, src);
      return;
    }

    // Instant, hard stop — matches the reference engine's immediate
    // sourceNodes[i].stop(0) with no release ramp.
    try {
      src.stop();
      src.disconnect();
    } catch {
      // ignore
    }
  }

  allOff() {
    for (const n of Array.from(this.active.keys())) this.noteOff(n);
    for (const [note, src] of this.sustaining) {
      try {
        src.stop();
        src.disconnect();
      } catch {
        // ignore
      }
      this.sustaining.delete(note);
    }
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

  // --- Recording -----------------------------------------------------

  isRecordingSupported() {
    return typeof window !== "undefined" && typeof window.MediaRecorder !== "undefined";
  }

  startRecording() {
    if (!this.recordDest) throw new Error("Audio engine not ready yet");
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") return;

    const mimeCandidates = [
      "audio/webm;codecs=opus",
      "audio/webm",
      "audio/ogg;codecs=opus",
      "audio/mp4",
    ];
    const mimeType = mimeCandidates.find((t) => window.MediaRecorder.isTypeSupported?.(t)) ?? "";

    this.recordedChunks = [];
    this.mediaRecorder = new MediaRecorder(
      this.recordDest.stream,
      mimeType ? { mimeType } : undefined,
    );
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) this.recordedChunks.push(e.data);
    };
    this.mediaRecorder.start(250);
  }

  stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const rec = this.mediaRecorder;
      if (!rec) {
        reject(new Error("No active recording"));
        return;
      }
      rec.onstop = () => {
        const blob = new Blob(this.recordedChunks, { type: rec.mimeType || "audio/webm" });
        this.recordedChunks = [];
        resolve(blob);
      };
      rec.onerror = (e) => reject(e);
      if (rec.state !== "inactive") rec.stop();
      else resolve(new Blob(this.recordedChunks, { type: rec.mimeType || "audio/webm" }));
    });
  }

  isRecording() {
    return this.mediaRecorder?.state === "recording";
  }
}

let _engine: HarmoniumEngine | null = null;
export function getHarmonium(): HarmoniumEngine {
  if (!_engine) _engine = new HarmoniumEngine();
  return _engine;
}