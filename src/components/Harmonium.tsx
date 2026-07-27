import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildKeys, type Key } from "@/lib/notes";
import { getHarmonium, type HarmoniumPreset } from "@/lib/harmonium-engine";

type LabelMode = "sargam" | "western" | "none";

export function Harmonium() {
  const [labels, setLabels] = useState<LabelMode>("sargam");
  const [preset, setPreset] = useState<HarmoniumPreset>("old-delhi");
  const [volume, setVolume] = useState(0.85);
  const [bellowsPumping, setBellowsPumping] = useState(false);
  const [held, setHeld] = useState<Set<string>>(new Set());
  const engineReady = useRef(false);

  const keys = useMemo(() => buildKeys(), []);
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

  const press = useCallback(async (note: string) => {
    await ensureEngine();
    getHarmonium().noteOn(note, 0.9);
    setBellowsPumping(true);
    setHeld(prev => {
      if (prev.has(note)) return prev;
      const n = new Set(prev); n.add(note); return n;
    });
  }, []);
  const release = useCallback((note: string) => {
    getHarmonium().noteOff(note);
    setHeld(prev => {
      if (!prev.has(note)) return prev;
      const n = new Set(prev); n.delete(note);
      if (n.size === 0) setBellowsPumping(false);
      return n;
    });
  }, []);

  useEffect(() => { if (engineReady.current) getHarmonium().applyPreset(preset); }, [preset]);
  useEffect(() => { if (engineReady.current) getHarmonium().setMasterVolume(volume); }, [volume]);

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

  useEffect(() => () => { try { getHarmonium().allOff(); } catch {} }, []);

  return (
    <div className="wood-panel rounded-3xl p-3 sm:p-5 md:p-6 relative overflow-hidden">
      {/* Top brass strip */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between mb-4 sm:mb-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-xl btn-gold grid place-items-center font-display font-bold">H</div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-soft">Virtual Harmonium</div>
            <div className="font-display text-base sm:text-lg font-semibold gold-text truncate">
              {preset === "old-delhi" && "Old Delhi"}
              {preset === "scale-changer" && "Scale Changer"}
              {preset === "concert" && "Concert"}
              {preset === "vintage" && "Vintage"}
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-wrap items-center gap-2 text-xs">
          <Segmented
            value={preset}
            onChange={v => setPreset(v as HarmoniumPreset)}
            options={[
              { v: "old-delhi", l: "Old Delhi" },
              { v: "scale-changer", l: "Scale" },
              { v: "concert", l: "Concert" },
              { v: "vintage", l: "Vintage" },
            ]}
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
              className="w-20 sm:w-24 accent-[color:var(--gold)]"
            />
          </div>
        </div>
      </header>

      <Bellows pumping={bellowsPumping} />

      {/* Keyboard — hero visual: whites as flex row, blacks overlaid on top */}
      <Keyboard keys={keys} labels={labels} held={held} onDown={press} onUp={release} />

      <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-muted-foreground text-center px-2">
        Play with mouse, touch, or your keyboard. Sa is on <kbd className="px-1.5 py-0.5 rounded bg-white/10">E</kbd>.
      </p>
    </div>
  );
}

function Keyboard({ keys, labels, held, onDown, onUp }: {
  keys: Key[]; labels: LabelMode; held: Set<string>;
  onDown: (n: string) => void; onUp: (n: string) => void;
}) {
  const whites = keys.filter(k => !k.isBlack);
  const W = whites.length;
  const blacks = keys
    .map((k, i) => ({ k, i }))
    .filter(x => x.k.isBlack)
    .map(({ k, i }) => ({
      k,
      whitesBefore: keys.slice(0, i).filter(x => !x.isBlack).length,
    }));

  const blackWidthPct = (100 / W) * 0.62;

  return (
    <div
      className="relative mt-4 sm:mt-6 rounded-2xl p-2 sm:p-3"
      style={{
        background: "linear-gradient(180deg, oklch(0.16 0.02 40), oklch(0.10 0.015 30))",
        boxShadow: "inset 0 4px 20px oklch(0 0 0 / 0.6), 0 20px 40px -20px oklch(0 0 0 / 0.7)",
      }}
    >
      <div className="relative h-40 sm:h-52 md:h-60 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex">
          {whites.map(k => (
            <WhiteKey
              key={k.note}
              k={k}
              labels={labels}
              active={held.has(k.note)}
              onDown={() => onDown(k.note)}
              onUp={() => onUp(k.note)}
            />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {blacks.map(({ k, whitesBefore }) => (
            <BlackKey
              key={k.note}
              k={k}
              labels={labels}
              active={held.has(k.note)}
              leftPct={(whitesBefore / W) * 100 - blackWidthPct / 2}
              widthPct={blackWidthPct}
              onDown={() => onDown(k.note)}
              onUp={() => onUp(k.note)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function WhiteKey({ k, labels, active, onDown, onUp }: {
  k: Key; labels: LabelMode; active: boolean;
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
      className="min-w-0 flex-1 select-none focus:outline-none flex flex-col items-center justify-between py-1.5 border-r border-black/40"
      animate={{ y: active ? 3 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      style={{
        background: active
          ? "linear-gradient(180deg, oklch(0.96 0.04 85), oklch(0.85 0.06 82))"
          : "linear-gradient(180deg, oklch(0.98 0.01 85), oklch(0.90 0.015 80))",
        boxShadow: active
          ? "inset 0 4px 8px oklch(0.7 0.1 60 / 0.4), 0 0 24px oklch(0.85 0.15 80 / 0.5)"
          : "inset 0 -6px 10px oklch(0.6 0.05 60 / 0.3)",
      }}
    >
      {k.kb ? (
        <div className="px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-neutral-800 text-neutral-100">
          {k.kb}
        </div>
      ) : <div />}

      {labels !== "none" ? (
        <div className="font-bold leading-none text-sm sm:text-base text-amber-700">
          {labels === "sargam" ? k.sargam : k.western}
        </div>
      ) : <div />}

      {labels === "sargam" ? (
        <div className="px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-teal-100 text-teal-700">
          {k.western}
        </div>
      ) : <div />}
    </motion.button>
  );
}

function BlackKey({ k, labels, active, leftPct, widthPct, onDown, onUp }: {
  k: Key; labels: LabelMode; active: boolean;
  leftPct: number; widthPct: number;
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
      className="absolute top-0 rounded-b-md pointer-events-auto select-none focus:outline-none flex flex-col items-center justify-between py-1"
      style={{
        left: `${leftPct}%`,
        width: `${widthPct}%`,
        height: "62%",
        background: active
          ? "linear-gradient(180deg, oklch(0.30 0.05 60), oklch(0.20 0.04 55))"
          : "linear-gradient(180deg, oklch(0.14 0.02 55), oklch(0.06 0.015 50))",
        boxShadow: active
          ? "inset 0 3px 8px oklch(0 0 0 / 0.6), 0 0 20px oklch(0.85 0.15 80 / 0.5)"
          : "inset 0 -3px 6px oklch(0 0 0 / 0.5), 0 3px 0 oklch(0 0 0 / 0.6)",
        border: "1px solid oklch(0 0 0 / 0.7)",
      }}
      animate={{ y: active ? 2 : 0 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      {k.kb ? (
        <div className="px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-white/85 text-neutral-900">
          {k.kb}
        </div>
      ) : <div />}
      {labels !== "none" ? (
        <div className="font-bold leading-none text-[10px] sm:text-xs text-amber-300">
          {labels === "sargam" ? k.sargam : k.western}
        </div>
      ) : <div />}
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
          className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs transition-all ${
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
    <div className="relative h-10 sm:h-14 rounded-2xl glass overflow-hidden">
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
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[9px] sm:text-[10px] uppercase tracking-widest text-gold-soft">
        Bellows
      </div>
    </div>
  );
}
