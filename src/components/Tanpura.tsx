import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { motion } from "framer-motion";

const PITCHES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export function Tanpura() {
  const [playing, setPlaying] = useState(false);
  const [tonic, setTonic] = useState("C");
  const [style, setStyle] = useState<"sa-pa" | "sa-ma">("sa-pa");
  const [tempo, setTempo] = useState(70);
  const [volume, setVolume] = useState(0.5);

  const partRef = useRef<Tone.Loop | null>(null);
  const synthRef = useRef<Tone.PluckSynth | null>(null);
  const gainRef = useRef<Tone.Gain | null>(null);

  useEffect(() => {
    return () => {
      partRef.current?.dispose();
      synthRef.current?.dispose();
      gainRef.current?.dispose();
    };
  }, []);

  useEffect(() => {
    if (gainRef.current) gainRef.current.gain.rampTo(volume, 0.2);
  }, [volume]);

  async function toggle() {
    await Tone.start();
    if (playing) {
      Tone.getTransport().stop();
      partRef.current?.stop();
      setPlaying(false);
      return;
    }
    if (!synthRef.current) {
      gainRef.current = new Tone.Gain(volume).toDestination();
      const reverb = new Tone.Reverb({ decay: 5, wet: 0.5 }).connect(gainRef.current);
      synthRef.current = new Tone.PluckSynth({
        attackNoise: 0.5,
        dampening: 2200,
        resonance: 0.95,
      }).connect(reverb);
    }
    const tonicOct = tonic + "3";
    const upper = tonic + "4";
    const second = style === "sa-pa" ? shift(tonic, 7) + "3" : shift(tonic, 5) + "3";

    const seq = [tonicOct, second, upper, tonicOct];
    let i = 0;
    partRef.current?.dispose();
    partRef.current = new Tone.Loop((time) => {
      synthRef.current!.triggerAttack(seq[i % seq.length], time);
      i++;
    }, 60 / tempo).start(0);
    Tone.getTransport().bpm.value = tempo;
    Tone.getTransport().start();
    setPlaying(true);
  }

  useEffect(() => {
    Tone.getTransport().bpm.rampTo(tempo, 0.5);
  }, [tempo]);

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold-soft">Tanpura</div>
          <div className="font-display text-lg">Drone Companion</div>
        </div>
        <motion.button
          onClick={toggle}
          whileTap={{ scale: 0.96 }}
          className={`px-4 py-2 rounded-full text-sm ${playing ? "btn-gold btn-gold-hover" : "btn-ghost-gold"}`}
        >
          {playing ? "Stop" : "Play"}
        </motion.button>
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
            onChange={(e) => setStyle(e.target.value as "sa-pa" | "sa-ma")}
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

function shift(tonic: string, semis: number) {
  const idx = PITCHES.indexOf(tonic);
  return PITCHES[(idx + semis + 12) % 12];
}
