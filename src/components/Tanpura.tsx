import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";

const PITCHES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"] as const;
type Style = "sa-pa" | "sa-ma";

export function Tanpura() {
  const [tonic, setTonic] = useState("C");
  const [style, setStyle] = useState<Style>("sa-pa");
  const [tempo, setTempo] = useState(80);
  const [volume, setVolume] = useState(0.8);
  const [playing, setPlaying] = useState(false);

  const synthRef = useRef<Tone.PluckSynth | null>(null);
  const gainRef = useRef<Tone.Gain | null>(null);
  const loopRef = useRef<Tone.Loop | null>(null);

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.rampTo(volume, 0.2);
  }, [volume]);

  async function toggle() {
    await Tone.start();
    if (playing) {
      loopRef.current?.stop();
      synthRef.current?.disconnect();
      gainRef.current?.disconnect();
      synthRef.current = null;
      gainRef.current = null;
      setPlaying(false);
      return;
    }

    gainRef.current = new Tone.Gain(volume).toDestination();
    const reverb = new Tone.Reverb({ decay: 5, wet: 0.5 }).connect(gainRef.current);
    synthRef.current = new Tone.PluckSynth({
      attackNoise: 0.5,
      dampening: 2200,
      resonance: 0.95,
    }).connect(reverb);

    const tonicOct = tonic + "3";
    const notes =
      style === "sa-pa"
        ? [tonicOct, tonicOct, tonicOct, tonicOct, tonicOct, tonicOct]
        : [tonicOct, tonicOct, tonicOct, tonicOct, tonicOct, tonicOct];

    loopRef.current?.dispose();
    loopRef.current = new Tone.Loop((time) => {
      const note = notes[Math.floor(Tone.getTransport().ticks / 960) % notes.length];
      synthRef.current?.triggerAttackRelease(note, "8n", time);
    }, "4n").start(0);

    Tone.getTransport().bpm.value = tempo;
    Tone.getTransport().start();
    setPlaying(true);
  }

  useEffect(() => {
    if (playing) Tone.getTransport().bpm.rampTo(tempo, 0.5);
  }, [tempo, playing]);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold-soft">Tanpura</div>
          <div className="font-display text-lg">Shruti Box</div>
        </div>
        <button
          onClick={toggle}
          className={`px-4 py-2 rounded-full text-sm ${playing ? "btn-gold btn-gold-hover" : "btn-ghost-gold"}`}
        >
          {playing ? "Stop" : "Start"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-xs">
        <label className="glass rounded-xl p-3 flex flex-col gap-2">
          <span className="text-muted-foreground">Tonic (Sa)</span>
          <select
            value={tonic}
            onChange={(e) => setTonic(e.target.value)}
            className="bg-transparent outline-none"
          >
            {PITCHES.map((p) => (
              <option key={p} value={p} className="bg-neutral-900">
                {p}
              </option>
            ))}
          </select>
        </label>
        <label className="glass rounded-xl p-3 flex flex-col gap-2">
          <span className="text-muted-foreground">Style</span>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value as Style)}
            className="bg-transparent outline-none"
          >
            <option value="sa-pa" className="bg-neutral-900">
              Sa – Pa
            </option>
            <option value="sa-ma" className="bg-neutral-900">
              Sa – Ma
            </option>
          </select>
        </label>
        <label className="glass rounded-xl p-3 flex flex-col gap-2 col-span-2">
          <span className="text-muted-foreground">Tempo · {tempo} bpm</span>
          <input
            type="range"
            min={40}
            max={140}
            value={tempo}
            onChange={(e) => setTempo(Number(e.target.value))}
            className="accent-[color:var(--gold)]"
          />
        </label>
        <label className="glass rounded-xl p-3 flex flex-col gap-2 col-span-2">
          <span className="text-muted-foreground">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="accent-[color:var(--gold)]"
          />
        </label>
      </div>
    </div>
  );
}
