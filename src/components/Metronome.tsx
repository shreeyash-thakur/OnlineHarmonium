import { useEffect, useRef, useState } from "react";
import * as Tone from "tone";
import { motion } from "framer-motion";

export function Metronome() {
  const [bpm, setBpm] = useState(80);
  const [meter, setMeter] = useState(4);
  const [playing, setPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const loopRef = useRef<Tone.Loop | null>(null);
  const clickRef = useRef<Tone.MembraneSynth | null>(null);
  const accentRef = useRef<Tone.MetalSynth | null>(null);
  const counter = useRef(0);

  useEffect(() => () => { loopRef.current?.dispose(); clickRef.current?.dispose(); accentRef.current?.dispose(); }, []);
  useEffect(() => { Tone.getTransport().bpm.rampTo(bpm, 0.1); }, [bpm]);

  async function toggle() {
    await Tone.start();
    if (playing) {
      Tone.getTransport().stop();
      loopRef.current?.stop();
      setPlaying(false); setBeat(0); counter.current = 0;
      return;
    }
    if (!clickRef.current) {
      clickRef.current = new Tone.MembraneSynth({ pitchDecay: 0.008, envelope: { attack: 0.001, decay: 0.1, sustain: 0 } }).toDestination();
      accentRef.current = new Tone.MetalSynth({ envelope: { attack: 0.001, decay: 0.1, release: 0.01 } }).toDestination();
      accentRef.current.volume.value = -12;
    }
    counter.current = 0;
    loopRef.current?.dispose();
    loopRef.current = new Tone.Loop((time) => {
      const step = counter.current % meter;
      if (step === 0) accentRef.current!.triggerAttackRelease("C6", "16n", time);
      else clickRef.current!.triggerAttackRelease("C4", "16n", time);
      Tone.getDraw().schedule(() => setBeat(step), time);
      counter.current++;
    }, "4n").start(0);
    Tone.getTransport().bpm.value = bpm;
    Tone.getTransport().start();
    setPlaying(true);
  }

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-gold-soft">Metronome</div>
          <div className="font-display text-lg">Steady & Alive</div>
        </div>
        <motion.button
          onClick={toggle} whileTap={{ scale: 0.96 }}
          className={`px-4 py-2 rounded-full text-sm ${playing ? "btn-gold btn-gold-hover" : "btn-ghost-gold"}`}
        >
          {playing ? "Stop" : "Start"}
        </motion.button>
      </div>

      <div className="flex justify-center gap-2 my-4">
        {Array.from({ length: meter }).map((_, i) => (
          <motion.div key={i}
            animate={{
              scale: playing && beat === i ? 1.15 : 1,
              backgroundColor: playing && beat === i
                ? (i === 0 ? "oklch(0.85 0.15 85)" : "oklch(0.78 0.14 82)")
                : "oklch(0.3 0.02 60 / 0.5)",
            }}
            transition={{ duration: 0.1 }}
            className="h-10 w-10 rounded-full grid place-items-center text-xs font-semibold text-neutral-900"
          >
            {i + 1}
          </motion.div>
        ))}
      </div>

      <label className="block text-xs text-muted-foreground mb-1">Tempo · {bpm} bpm</label>
      <input type="range" min={30} max={220} value={bpm}
        onChange={e => setBpm(Number(e.target.value))}
        className="w-full accent-[color:var(--gold)]" />

      <div className="flex gap-2 mt-3">
        {[2, 3, 4, 5, 6, 7].map(m => (
          <button key={m} onClick={() => setMeter(m)}
            className={`flex-1 py-1.5 rounded-lg text-xs ${meter === m ? "btn-gold" : "glass"}`}>
            {m}/4
          </button>
        ))}
      </div>
    </div>
  );
}
