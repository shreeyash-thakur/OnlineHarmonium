import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildKeys, type Key } from "@/lib/notes";
import { getHarmonium, type HarmoniumPreset } from "@/lib/harmonium-engine";

type LabelMode = "sargam" | "western" | "none";

export function Harmonium() {
  const [octaves, setOctaves] = useState<3 | 5>(3);
  const [labels, setLabels] = useState<LabelMode>("sargam");
  const [preset, setPreset] = useState<HarmoniumPreset>("old-delhi");
  const [volume, setVolume] = useState(0.85);
  const [bellowsPumping, setBellowsPumping] = useState(false);
  const [held, setHeld] = useState<Set<string>>(new Set());
  const engineReady = useRef(false);

  const keys = useMemo(() => buildKeys(octaves === 5 ? 36 : 48, octaves), [octaves]);
  const kbLookup = useMemo(() => {
    const m = new Map<string, Key>();
    keys.forEach(k => { if (k.kb) m.set(k.kb, k); });
    return m;
  }, [keys]);

  async function ensureEngine() {
    if (!engineReady.current) {
      await getHarmonium().ensureStarted();
      getHarmonium().applyPreset(preset);
      getHarmonium().setMasterVolume(volume);
      engineReady.current = true;
    }
  }

  const press = async (note: string) => {
    await ensureEngine();
    getHarmonium().noteOn(note, 0.9);
    setBellowsPumping(true);
    setHeld(prev => {
      const n = new Set(prev); n.add(note); return n;
    });
  };
  const release = (note: string) => {
    getHarmonium().noteOff(note);
    setHeld(prev => {
      const n = new Set(prev); n.delete(note);
      if (n.size === 0) setBellowsPumping(false);
      return n;
    });
  };

  // Preset / volume propagation
  useEffect(() => { if (engineReady.current) getHarmonium().applyPreset(preset); }, [preset]);
  useEffect(() => { if (engineReady.current) getHarmonium().setMasterVolume(volume); }, [volume]);

  // Computer keyboard
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const k = kbLookup.get(e.key.toLowerCase());
      if (k) { e.preventDefault(); press(k.note); }
    };
    const up = (e: KeyboardEvent) => {
      const k = kbLookup.get(e.key.toLowerCase());
      if (k) { e.preventDefault(); release(k.note); }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [kbLookup]);

  // Cleanup on unmount
  useEffect(() => () => { try { getHarmonium().allOff(); } catch {} }, []);

  const whiteKeys = keys.filter(k => !k.isBlack);
  const whiteWidth = 100 / whiteKeys.length;

  return (
    <div className="wood-panel rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Top brass strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl btn-gold grid place-items-center font-display font-bold">H</div>
          <div>
            <div className="text-xs uppercase tracking-widest text-gold-soft">Virtual Harmonium</div>
            <div className="font-display text-lg font-semibold gold-text">
              {preset === "old-delhi" && "Old Delhi"}
              {preset === "scale-changer" && "Scale Changer"}
              {preset === "concert" && "Concert"}
              {preset === "vintage" && "Vintage"}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <Segmented
            value={preset}
            onChange={v => setPreset(v as HarmoniumPreset)}
            options={[
              { v: "old-delhi", l: "Old Delhi" },
              { v: "scale-changer", l: "Scale Changer" },
              { v: "concert", l: "Concert" },
              { v: "vintage", l: "Vintage" },
            ]}
          />
          <Segmented
            value={String(octaves)}
            onChange={v => setOctaves(Number(v) as 3 | 5)}
            options={[{ v: "3", l: "3 oct" }, { v: "5", l: "5 oct" }]}
          />
          <Segmented
            value={labels}
            onChange={v => setLabels(v as LabelMode)}
            options={[
              { v: "sargam", l: "Sargam" },
              { v: "western", l: "Notes" },
              { v: "none", l: "Off" },
            ]}
          />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass">
            <span className="text-muted-foreground">Vol</span>
            <input
              type="range" min={0} max={1} step={0.01}
              value={volume} onChange={e => setVolume(Number(e.target.value))}
              className="w-24 accent-[color:var(--gold)]"
            />
          </div>
        </div>
      </div>

      {/* Bellows */}
      <Bellows pumping={bellowsPumping} />

      {/* Keyboard */}
      <div
        className="relative mt-6 rounded-2xl p-3"
        style={{
          background: "linear-gradient(180deg, oklch(0.16 0.02 40), oklch(0.10 0.015 30))",
          boxShadow: "inset 0 4px 20px oklch(0 0 0 / 0.6), 0 20px 40px -20px oklch(0 0 0 / 0.7)",
        }}
      >
        <div className="relative w-full overflow-x-auto">
          <div className="relative h-56 sm:h-64 md:h-72 min-w-[720px]">
            {/* White keys */}
            {whiteKeys.map((k, idx) => (
              <WhiteKey
                key={k.note}
                left={idx * whiteWidth}
                width={whiteWidth}
                k={k}
                labels={labels}
                active={held.has(k.note)}
                onDown={() => press(k.note)}
                onUp={() => release(k.note)}
              />
            ))}
            {/* Black keys overlay */}
            {keys.map((k, i) => {
              if (!k.isBlack) return null;
              const whiteBefore = keys.slice(0, i).filter(x => !x.isBlack).length;
              const left = whiteBefore * whiteWidth - whiteWidth * 0.32;
              return (
                <BlackKey
                  key={k.note}
                  left={left}
                  width={whiteWidth * 0.64}
                  k={k}
                  labels={labels}
                  active={held.has(k.note)}
                  onDown={() => press(k.note)}
                  onUp={() => release(k.note)}
                />
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground text-center">
        Play with mouse, touch, or your keyboard — <kbd className="px-1.5 py-0.5 rounded bg-white/10">A S D F G H J K L</kbd> for white keys, <kbd className="px-1.5 py-0.5 rounded bg-white/10">W E T Y U O P</kbd> for black keys.
      </p>
    </div>
  );
}

function WhiteKey({ left, width, k, labels, active, onDown, onUp }: {
  left: number; width: number; k: Key; labels: LabelMode; active: boolean;
  onDown: () => void; onUp: () => void;
}) {
  return (
    <motion.button
      type="button"
      onMouseDown={onDown}
      onMouseUp={onUp}
      onMouseLeave={() => active && onUp()}
      onTouchStart={(e) => { e.preventDefault(); onDown(); }}
      onTouchEnd={(e) => { e.preventDefault(); onUp(); }}
      style={{ left: `${left}%`, width: `${width}%` }}
      className="absolute top-0 bottom-0 select-none focus:outline-none"
      animate={{ y: active ? 3 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div
        className="h-full mx-[1px] rounded-b-xl flex flex-col justify-end items-center pb-3 relative overflow-hidden"
        style={{
          background: active
            ? "linear-gradient(180deg, oklch(0.96 0.04 85), oklch(0.85 0.06 82))"
            : "linear-gradient(180deg, oklch(0.98 0.01 85), oklch(0.90 0.015 80))",
          boxShadow: active
            ? "inset 0 4px 8px oklch(0.7 0.1 60 / 0.4), 0 0 24px oklch(0.85 0.15 80 / 0.5)"
            : "inset 0 -6px 10px oklch(0.6 0.05 60 / 0.3), 0 2px 0 oklch(0 0 0 / 0.4)",
          border: "1px solid oklch(0.2 0.02 60 / 0.4)",
        }}
      >
        {labels !== "none" && (
          <div className="text-[10px] sm:text-xs font-medium text-neutral-800">
            {labels === "sargam" ? k.sargam : k.western}
          </div>
        )}
        {k.kb && (
          <div className="mt-1 text-[9px] uppercase text-neutral-500">{k.kb}</div>
        )}
      </div>
    </motion.button>
  );
}

function BlackKey({ left, width, k, labels, active, onDown, onUp }: {
  left: number; width: number; k: Key; labels: LabelMode; active: boolean;
  onDown: () => void; onUp: () => void;
}) {
  return (
    <motion.button
      type="button"
      onMouseDown={onDown}
      onMouseUp={onUp}
      onMouseLeave={() => active && onUp()}
      onTouchStart={(e) => { e.preventDefault(); onDown(); }}
      onTouchEnd={(e) => { e.preventDefault(); onUp(); }}
      style={{ left: `${left}%`, width: `${width}%` }}
      className="absolute top-0 h-[62%] z-10 select-none focus:outline-none"
      animate={{ y: active ? 3 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <div
        className="h-full rounded-b-lg flex flex-col items-center justify-end pb-2"
        style={{
          background: active
            ? "linear-gradient(180deg, oklch(0.30 0.05 60), oklch(0.20 0.04 55))"
            : "linear-gradient(180deg, oklch(0.15 0.02 55), oklch(0.08 0.015 50))",
          boxShadow: active
            ? "inset 0 3px 8px oklch(0 0 0 / 0.6), 0 0 20px oklch(0.85 0.15 80 / 0.5)"
            : "inset 0 -3px 6px oklch(0 0 0 / 0.5), 0 3px 0 oklch(0 0 0 / 0.6)",
          border: "1px solid oklch(0 0 0 / 0.7)",
        }}
      >
        {labels !== "none" && (
          <div className="text-[9px] font-medium text-gold-soft">
            {labels === "sargam" ? k.sargam : k.western}
          </div>
        )}
      </div>
    </motion.button>
  );
}

function Segmented<T extends string>({ value, onChange, options }: {
  value: T; onChange: (v: T) => void; options: { v: T; l: string }[];
}) {
  return (
    <div className="glass rounded-full p-1 flex">
      {options.map(o => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`px-3 py-1.5 rounded-full text-xs transition-all ${
            value === o.v
              ? "btn-gold btn-gold-hover"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  );
}

function Bellows({ pumping }: { pumping: boolean }) {
  return (
    <div className="relative h-16 rounded-2xl glass overflow-hidden">
      {/* Pleats */}
      <div className="absolute inset-0 flex">
        {Array.from({ length: 22 }).map((_, i) => (
          <motion.div
            key={i}
            className="flex-1 border-r border-white/5"
            animate={{
              scaleY: pumping ? [1, 0.75, 1] : 1,
              opacity: pumping ? [0.6, 1, 0.6] : 0.5,
            }}
            transition={{
              duration: 1.4,
              repeat: pumping ? Infinity : 0,
              delay: (i % 6) * 0.05,
              ease: "easeInOut",
            }}
            style={{
              background: "linear-gradient(180deg, oklch(0.32 0.05 45), oklch(0.18 0.03 40))",
            }}
          />
        ))}
      </div>
      <AnimatePresence>
        {pumping && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(400px 60px at 50% 50%, oklch(0.85 0.15 80 / 0.15), transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] uppercase tracking-widest text-gold-soft">
        Bellows
      </div>
    </div>
  );
}
