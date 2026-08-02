import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Circle,
  Square,
  Download,
  Share2,
  Keyboard as KeyboardIcon,
  Music2,
  HelpCircle,
  PlugZap,
  Plug,
} from "lucide-react";
import { buildKeys, type Key } from "@/lib/notes";
import { getHarmonium, type SoundBank } from "@/lib/harmonium-engine";
import { connectMidi, disconnectMidi, isMidiSupported } from "@/lib/midi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type LabelMode = "sargam" | "western" | "none";

const OCTAVE_MIN = -2;
const OCTAVE_MAX = 2;
const SCALE_MIN = -6;
const SCALE_MAX = 6;

export function Harmonium() {
  const [labels, setLabels] = useState<LabelMode>("sargam");
  const [bank, setBank] = useState<SoundBank>("indian");
  const [volume, setVolume] = useState(0.85);
  const [octave, setOctave] = useState(0);
  const [scaleShift, setScaleShift] = useState(0);
  const [sustain, setSustain] = useState(false);
  const [bellowsPumping, setBellowsPumping] = useState(false);
  const [held, setHeld] = useState<Set<string>>(new Set());
  const [loadError, setLoadError] = useState<string | null>(null);
  const [midiDevices, setMidiDevices] = useState<string[]>([]);
  const [midiConnecting, setMidiConnecting] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioStarting, setAudioStarting] = useState(false);
  const [keyboardAllowed, setKeyboardAllowed] = useState(false);

  // --- Recording state ---
  const [recState, setRecState] = useState<"idle" | "recording" | "ready">("idle");
  const [recSeconds, setRecSeconds] = useState(0);
  const [recUrl, setRecUrl] = useState<string | null>(null);
  const recBlobRef = useRef<Blob | null>(null);
  const recTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const engineReady = useRef(false);

  const keys = useMemo(() => buildKeys(), []);
  const kbLookup = useMemo(() => {
    const m = new Map<string, Key>();
    keys.forEach((k) => {
      if (k.kb) m.set(k.kb, k);
    });
    return m;
  }, [keys]);

  useEffect(() => {
    getHarmonium()
      .preload()
      ?.catch((err) => setLoadError(err instanceof Error ? err.message : String(err)));
  }, []);

  async function startEngineOnce() {
    if (engineReady.current) {
      setAudioStarted(true);
      return;
    }

    const engine = getHarmonium();
    try {
      await engine.ensureStarted();
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : String(err));
      return;
    }
    engine.applyBank(bank);
    engine.setMasterVolume(volume);
    engine.setTranspose(scaleShift + octave * 12);
    engineReady.current = true;
    setAudioStarted(true);
    setLoadError(null);
  }

  async function startHarmonium() {
    if (engineReady.current) {
      setAudioStarted(true);
      return;
    }

    setAudioStarting(true);
    try {
      await startEngineOnce();
    } finally {
      setAudioStarting(false);
    }
  }

  async function allowKeyboardInput() {
    if (keyboardAllowed) return;
    setAudioStarting(true);
    try {
      if (!engineReady.current) await startEngineOnce();
      setKeyboardAllowed(true);
    } finally {
      setAudioStarting(false);
    }
  }

  const press = useCallback(
    async (note: string, options: { allowAutoStart?: boolean } = {}) => {
      if (!engineReady.current) {
        if (options.allowAutoStart === false) {
          if (!keyboardAllowed) {
            setLoadError("Keyboard input requires clicking Allow keyboard input first.");
            return;
          }
          await startEngineOnce();
        } else {
          await startEngineOnce();
        }
      }
      if (!engineReady.current) return;

      const engine = getHarmonium();
      engine.noteOn(note);
      setBellowsPumping(true);
      setHeld((prev) => {
        if (prev.has(note)) return prev;
        const n = new Set(prev);
        n.add(note);
        return n;
      });
    },
    [keyboardAllowed],
  );
  const release = useCallback((note: string) => {
    getHarmonium().noteOff(note);
    setHeld((prev) => {
      if (!prev.has(note)) return prev;
      const n = new Set(prev);
      n.delete(note);
      if (n.size === 0) setBellowsPumping(false);
      return n;
    });
  }, []);

  useEffect(() => {
    if (engineReady.current) getHarmonium().applyBank(bank);
  }, [bank]);
  useEffect(() => {
    if (engineReady.current) getHarmonium().setMasterVolume(volume);
  }, [volume]);
  useEffect(() => {
    if (engineReady.current) getHarmonium().setTranspose(scaleShift + octave * 12);
  }, [scaleShift, octave]);
  useEffect(() => {
    getHarmonium().setSustain(sustain);
  }, [sustain]);

  // --- Computer keyboard: notes + shortcuts (Space = sustain, Z/X = octave, C/V = scale) ---
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const key = e.key.toLowerCase();
      if (key === " ") {
        e.preventDefault();
        setSustain((s) => !s);
        return;
      }
      if (key === "z") {
        e.preventDefault();
        setOctave((o) => Math.max(OCTAVE_MIN, o - 1));
        return;
      }
      if (key === "x") {
        e.preventDefault();
        setOctave((o) => Math.min(OCTAVE_MAX, o + 1));
        return;
      }
      if (key === "c") {
        e.preventDefault();
        setScaleShift((s) => Math.max(SCALE_MIN, s - 1));
        return;
      }
      if (key === "v") {
        e.preventDefault();
        setScaleShift((s) => Math.min(SCALE_MAX, s + 1));
        return;
      }

      const k = kbLookup.get(key);
      if (k) {
        e.preventDefault();
        press(k.note, { allowAutoStart: false });
      }
    };
    const up = (e: KeyboardEvent) => {
      const k = kbLookup.get(e.key.toLowerCase());
      if (k) {
        e.preventDefault();
        release(k.note);
      }
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [kbLookup, press, release]);

  useEffect(
    () => () => {
      try {
        getHarmonium().allOff();
      } catch {
        // ignore
      }
    },
    [],
  );
  useEffect(
    () => () => {
      disconnectMidi();
    },
    [],
  );
  useEffect(
    () => () => {
      if (recUrl) URL.revokeObjectURL(recUrl);
    },
    [recUrl],
  );

  // --- MIDI ---
  async function toggleMidi() {
    if (midiDevices.length > 0) {
      disconnectMidi();
      setMidiDevices([]);
      return;
    }
    setMidiConnecting(true);
    try {
      const devices = await connectMidi({
        onNoteOn: (note) => {
          void press(note);
        },
        onNoteOff: (note) => release(note),
        onDevicesChange: (names) => setMidiDevices(names),
      });
      setMidiDevices(devices);
      if (devices.length === 0) {
        setLoadError("No MIDI devices found. Plug in a MIDI keyboard and try again.");
      }
    } catch {
      setLoadError("Couldn't access MIDI — check your browser's MIDI permission.");
    } finally {
      setMidiConnecting(false);
    }
  }

  // --- Recording ---
  async function toggleRecording() {
    const engine = getHarmonium();
    if (!engine.isRecordingSupported()) {
      setLoadError("Recording isn't supported in this browser.");
      return;
    }
    if (recState === "recording") {
      if (recTimerRef.current) clearInterval(recTimerRef.current);
      const blob = await engine.stopRecording();
      recBlobRef.current = blob;
      if (recUrl) URL.revokeObjectURL(recUrl);
      setRecUrl(URL.createObjectURL(blob));
      setRecState("ready");
      return;
    }

    if (!engineReady.current) await startEngineOnce();
    if (recUrl) {
      URL.revokeObjectURL(recUrl);
      setRecUrl(null);
    }
    setRecSeconds(0);
    getHarmonium().startRecording();
    setRecState("recording");
    recTimerRef.current = setInterval(() => setRecSeconds((s) => s + 1), 1000);
  }

  function recordingFilename() {
    return `riyaz-harmonium-${new Date().toISOString().replace(/[:.]/g, "-")}.webm`;
  }

  async function shareRecording() {
    const blob = recBlobRef.current;
    if (!blob) return;
    const file = new File([blob], recordingFilename(), { type: blob.type || "audio/webm" });
    const nav = navigator as Navigator & { canShare?: (data: { files: File[] }) => boolean };
    if (nav.share && nav.canShare?.({ files: [file] })) {
      try {
        await nav.share({
          files: [file],
          title: "My harmonium recording",
          text: "Recorded with Riyaz — Virtual Harmonium",
        });
        return;
      } catch {
        // fall through to download
      }
    }
    downloadRecording();
  }

  function downloadRecording() {
    if (!recUrl) return;
    const a = document.createElement("a");
    a.href = recUrl;
    a.download = recordingFilename();
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  const mm = String(Math.floor(recSeconds / 60)).padStart(2, "0");
  const ss = String(recSeconds % 60).padStart(2, "0");

  return (
    <div className="wood-panel rounded-3xl p-3 sm:p-5 md:p-6 relative overflow-hidden">
      {loadError && (
        <div className="mb-3 rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-2 text-xs text-red-200 flex items-center justify-between gap-2">
          <span>{loadError}</span>
          <button
            onClick={() => setLoadError(null)}
            className="shrink-0 text-red-200/70 hover:text-red-100"
          >
            ✕
          </button>
        </div>
      )}
      {!loadError && (!audioStarted || !keyboardAllowed) && (
        <div className="mb-3 rounded-2xl border border-gold-soft/30 bg-gold-soft/10 p-4 text-sm text-foreground">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <p className="font-semibold text-foreground">
                {audioStarted
                  ? "Keyboard input is disabled until you allow it."
                  : "Start the harmonium before playing."}
              </p>
              <p className="text-[13px] text-muted-foreground">
                {audioStarted
                  ? "Touch or click can still play the harmonium. To use your computer keyboard, click Allow keyboard input."
                  : "Click Start to unlock browser audio for touch/mouse play. Keyboard input requires explicit permission."}
              </p>
              {isMidiSupported() && (
                <p className="text-[12px] text-muted-foreground">
                  After starting, use the MIDI button to grant MIDI permission for your controller.
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {!audioStarted && (
                <button
                  type="button"
                  onClick={startHarmonium}
                  disabled={audioStarting}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                    audioStarting ? "bg-white/10 text-muted-foreground" : "btn-gold btn-gold-hover"
                  }`}
                >
                  {audioStarting ? "Starting…" : "Start harmonium"}
                </button>
              )}
              {!keyboardAllowed && (
                <button
                  type="button"
                  onClick={allowKeyboardInput}
                  disabled={audioStarting}
                  className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition ${
                    audioStarting ? "bg-white/10 text-muted-foreground" : "glass text-foreground hover:text-foreground"
                  }`}
                >
                  Allow keyboard input
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Top brass strip */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:flex sm:flex-wrap sm:justify-between mb-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="h-10 w-10 shrink-0 rounded-xl btn-gold grid place-items-center font-display font-bold">
            H
          </div>
          <div className="min-w-0">
            <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-soft">
              Virtual Harmonium
            </div>
            <div className="font-display text-base sm:text-lg font-semibold gold-text truncate">
              {bank === "indian" && "Indian"}
              {bank === "reed" && "Reed"}
              {bank === "concert" && "Concert"}
            </div>
          </div>
        </div>

        <div className="col-span-2 flex flex-wrap items-center gap-2 text-xs">
          <Segmented
            value={bank}
            onChange={(v) => setBank(v as SoundBank)}
            options={[
              { v: "indian", l: "Indian" },
              { v: "reed", l: "Reed" },
              { v: "concert", l: "Concert" },
            ]}
          />
          <Segmented
            value={labels}
            onChange={(v) => setLabels(v as LabelMode)}
            options={[
              { v: "sargam", l: "Sargam" },
              { v: "western", l: "Notes" },
              { v: "none", l: "Off" },
            ]}
          />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass">
            <span className="text-muted-foreground">Vol</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-20 sm:w-24 accent-[color:var(--gold)]"
            />
          </div>
        </div>
      </header>

      {/* Second control row: scale changer, octave, sustain, MIDI, record, help */}
      <div className="flex flex-wrap items-center gap-2 text-xs mb-4 sm:mb-6">
        <Stepper
          label="Scale"
          value={scaleShift}
          onDec={() => setScaleShift((s) => Math.max(SCALE_MIN, s - 1))}
          onInc={() => setScaleShift((s) => Math.min(SCALE_MAX, s + 1))}
          display={scaleShift > 0 ? `+${scaleShift}` : `${scaleShift}`}
          title="Scale changer — shifts pitch in semitones (keys C / V)"
        />
        <Stepper
          label="Octave"
          value={octave}
          onDec={() => setOctave((o) => Math.max(OCTAVE_MIN, o - 1))}
          onInc={() => setOctave((o) => Math.min(OCTAVE_MAX, o + 1))}
          display={octave > 0 ? `+${octave}` : `${octave}`}
          title="Octave shift (keys Z / X)"
        />

        <button
          type="button"
          onClick={() => setSustain((s) => !s)}
          title="Sustain — notes ring after release (Space)"
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            sustain
              ? "btn-gold btn-gold-hover"
              : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          <Music2 className="h-3.5 w-3.5" /> Sustain
        </button>

        {isMidiSupported() && (
          <button
            type="button"
            onClick={toggleMidi}
            disabled={midiConnecting}
            title={
              midiDevices.length
                ? `Connected: ${midiDevices.join(", ")}`
                : "Connect a MIDI keyboard"
            }
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              midiDevices.length
                ? "btn-gold btn-gold-hover"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {midiDevices.length ? (
              <PlugZap className="h-3.5 w-3.5" />
            ) : (
              <Plug className="h-3.5 w-3.5" />
            )}
            {midiConnecting
              ? "Connecting…"
              : midiDevices.length
                ? `MIDI (${midiDevices.length})`
                : "MIDI"}
          </button>
        )}

        <RecordControl
          state={recState}
          seconds={`${mm}:${ss}`}
          onToggle={toggleRecording}
          onDownload={downloadRecording}
          onShare={shareRecording}
          recUrl={recUrl}
        />

        <ShortcutsHelp kbLookup={kbLookup} />
      </div>

      <Bellows pumping={bellowsPumping} />

      {/* Keyboard — hero visual: whites as flex row, blacks overlaid on top */}
      <Keyboard keys={keys} labels={labels} held={held} onDown={press} onUp={release} />

      <p className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-muted-foreground text-center px-2">
        Play with mouse, touch, keyboard, or a MIDI controller. Sa is on{" "}
        <kbd className="px-1.5 py-0.5 rounded bg-white/10">E</kbd>.
      </p>
    </div>
  );
}

function Stepper({
  label,
  value,
  onDec,
  onInc,
  display,
  title,
}: {
  label: string;
  value: number;
  onDec: () => void;
  onInc: () => void;
  display: string;
  title?: string;
}) {
  return (
    <div className="flex items-center gap-1 px-1 py-1 rounded-full glass" title={title}>
      <span className="pl-2 text-muted-foreground">{label}</span>
      <button
        type="button"
        onClick={onDec}
        className="h-6 w-6 grid place-items-center rounded-full hover:bg-white/10 text-foreground"
        aria-label={`Decrease ${label.toLowerCase()}`}
      >
        −
      </button>
      <span className="min-w-[1.6em] text-center font-semibold tabular-nums text-gold-soft">
        {display}
      </span>
      <button
        type="button"
        onClick={onInc}
        className="h-6 w-6 grid place-items-center rounded-full hover:bg-white/10 text-foreground"
        aria-label={`Increase ${label.toLowerCase()}`}
      >
        +
      </button>
    </div>
  );
}

function RecordControl({
  state,
  seconds,
  onToggle,
  onDownload,
  onShare,
  recUrl,
}: {
  state: "idle" | "recording" | "ready";
  seconds: string;
  onToggle: () => void;
  onDownload: () => void;
  onShare: () => void;
  recUrl: string | null;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          onClick={state === "ready" ? undefined : onToggle}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
            state === "recording"
              ? "bg-red-500/90 text-white"
              : "glass text-muted-foreground hover:text-foreground"
          }`}
        >
          {state === "recording" ? (
            <Square className="h-3.5 w-3.5" />
          ) : (
            <Circle className="h-3.5 w-3.5" />
          )}
          {state === "recording" ? `Stop ${seconds}` : state === "ready" ? "Recorded" : "Record"}
        </button>
      </PopoverTrigger>
      {state === "ready" && recUrl && (
        <PopoverContent className="w-72">
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Your recording is ready.</p>
            <audio controls src={recUrl} className="w-full" />
            <div className="flex gap-2">
              <button
                onClick={onDownload}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md btn-gold btn-gold-hover text-xs"
              >
                <Download className="h-3.5 w-3.5" /> Download
              </button>
              <button
                onClick={onShare}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md glass text-xs hover:text-foreground"
              >
                <Share2 className="h-3.5 w-3.5" /> Share
              </button>
            </div>
            <button
              onClick={onToggle}
              className="text-xs text-muted-foreground hover:text-foreground underline underline-offset-2"
            >
              Record again
            </button>
          </div>
        </PopoverContent>
      )}
    </Popover>
  );
}

function ShortcutsHelp({ kbLookup }: { kbLookup: Map<string, Key> }) {
  const noteEntries = useMemo(
    () => Array.from(kbLookup.entries()).sort((a, b) => a[1].midi - b[1].midi),
    [kbLookup],
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-muted-foreground hover:text-foreground transition-all"
          title="Keyboard shortcuts"
        >
          <HelpCircle className="h-3.5 w-3.5" /> Shortcuts
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <KeyboardIcon className="h-4 w-4" /> Keyboard shortcuts
          </DialogTitle>
          <DialogDescription>
            Play the harmonium and control it entirely from your keyboard.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-soft mb-2">Controls</h4>
            <ul className="space-y-1.5">
              <ShortcutRow keys={["Space"]} label="Toggle sustain" />
              <ShortcutRow keys={["Z", "X"]} label="Octave down / up" />
              <ShortcutRow keys={["C", "V"]} label="Scale changer: semitone down / up" />
            </ul>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gold-soft mb-2">Notes</h4>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {noteEntries.map(([kb, k]) => (
                <div
                  key={kb}
                  className="flex flex-col items-center gap-1 rounded-lg glass px-1.5 py-2"
                >
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[11px] font-bold">
                    {kb}
                  </kbd>
                  <span className="text-[10px] text-muted-foreground">{k.sargam}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ShortcutRow({ keys, label }: { keys: string[]; label: string }) {
  return (
    <li className="flex items-center justify-between gap-3">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex gap-1">
        {keys.map((k) => (
          <kbd key={k} className="px-1.5 py-0.5 rounded bg-white/10 text-[11px] font-bold">
            {k}
          </kbd>
        ))}
      </span>
    </li>
  );
}

const Keyboard = memo(function Keyboard({
  keys,
  labels,
  held,
  onDown,
  onUp,
}: {
  keys: Key[];
  labels: LabelMode;
  held: Set<string>;
  onDown: (n: string) => void;
  onUp: (n: string) => void;
}) {
  const whites = keys.filter((k) => !k.isBlack);
  const W = whites.length;
  const blacks = keys
    .map((k, i) => ({ k, i }))
    .filter((x) => x.k.isBlack)
    .map(({ k, i }) => ({
      k,
      whitesBefore: keys.slice(0, i).filter((x) => !x.isBlack).length,
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
          {whites.map((k) => (
            <WhiteKey
              key={k.note}
              note={k.note}
              kb={k.kb}
              sargam={k.sargam}
              western={k.western}
              labels={labels}
              active={held.has(k.note)}
              onDown={onDown}
              onUp={onUp}
            />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {blacks.map(({ k, whitesBefore }) => (
            <BlackKey
              key={k.note}
              note={k.note}
              kb={k.kb}
              sargam={k.sargam}
              western={k.western}
              labels={labels}
              active={held.has(k.note)}
              leftPct={(whitesBefore / W) * 100 - blackWidthPct / 2}
              widthPct={blackWidthPct}
              onDown={onDown}
              onUp={onUp}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

type WhiteKeyProps = {
  note: string;
  kb?: string;
  sargam: string;
  western: string;
  labels: LabelMode;
  active: boolean;
  onDown: (n: string) => void;
  onUp: (n: string) => void;
};

const WhiteKey = memo(function WhiteKey({
  note,
  kb,
  sargam,
  western,
  labels,
  active,
  onDown,
  onUp,
}: WhiteKeyProps) {
  const down = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.currentTarget as HTMLButtonElement).setPointerCapture?.(e.pointerId);
      onDown(note);
    },
    [note, onDown],
  );
  const up = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      onUp(note);
    },
    [note, onUp],
  );

  return (
    <button
      type="button"
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={up}
      onContextMenu={(e) => e.preventDefault()}
      className="min-w-0 flex-1 select-none focus:outline-none flex flex-col items-center justify-between py-1.5 border-r border-black/40 touch-none will-change-transform"
      style={{
        transform: active ? "translateY(3px)" : "translateY(0)",
        transition: "transform 60ms ease-out",
        background: active
          ? "linear-gradient(180deg, oklch(0.96 0.04 85), oklch(0.85 0.06 82))"
          : "linear-gradient(180deg, oklch(0.98 0.01 85), oklch(0.90 0.015 80))",
        boxShadow: active
          ? "inset 0 4px 8px oklch(0.7 0.1 60 / 0.4), 0 0 24px oklch(0.85 0.15 80 / 0.5)"
          : "inset 0 -6px 10px oklch(0.6 0.05 60 / 0.3)",
      }}
    >
      {kb ? (
        <div className="px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-neutral-800 text-neutral-100">
          {kb}
        </div>
      ) : (
        <div />
      )}

      {labels !== "none" ? (
        <div className="font-bold leading-none text-sm sm:text-base text-amber-700">
          {labels === "sargam" ? sargam : western}
        </div>
      ) : (
        <div />
      )}

      {labels === "sargam" ? (
        <div className="px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-teal-100 text-teal-700">
          {western}
        </div>
      ) : (
        <div />
      )}
    </button>
  );
});

type BlackKeyProps = WhiteKeyProps & { leftPct: number; widthPct: number };

const BlackKey = memo(function BlackKey({
  note,
  kb,
  sargam,
  western,
  labels,
  active,
  leftPct,
  widthPct,
  onDown,
  onUp,
}: BlackKeyProps) {
  const down = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      (e.currentTarget as HTMLButtonElement).setPointerCapture?.(e.pointerId);
      onDown(note);
    },
    [note, onDown],
  );
  const up = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      onUp(note);
    },
    [note, onUp],
  );

  return (
    <button
      type="button"
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={up}
      onContextMenu={(e) => e.preventDefault()}
      className="absolute top-0 rounded-b-md pointer-events-auto select-none focus:outline-none flex flex-col items-center justify-between py-1 touch-none will-change-transform"
      style={{
        left: `${leftPct}%`,
        width: `${widthPct}%`,
        height: "62%",
        transform: active ? "translateY(2px)" : "translateY(0)",
        transition: "transform 60ms ease-out",
        background: active
          ? "linear-gradient(180deg, oklch(0.30 0.05 60), oklch(0.20 0.04 55))"
          : "linear-gradient(180deg, oklch(0.14 0.02 55), oklch(0.06 0.015 50))",
        boxShadow: active
          ? "inset 0 3px 8px oklch(0 0 0 / 0.6), 0 0 20px oklch(0.85 0.15 80 / 0.5)"
          : "inset 0 -3px 6px oklch(0 0 0 / 0.5), 0 3px 0 oklch(0 0 0 / 0.6)",
        border: "1px solid oklch(0 0 0 / 0.7)",
      }}
    >
      {kb ? (
        <div className="px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-bold bg-white/85 text-neutral-900">
          {kb}
        </div>
      ) : (
        <div />
      )}
      {labels !== "none" ? (
        <div className="font-bold leading-none text-[10px] sm:text-xs text-amber-300">
          {labels === "sargam" ? sargam : western}
        </div>
      ) : (
        <div />
      )}
    </button>
  );
});

function Segmented<T extends string>({
  value,
  onChange,
  options,
}: {
  value: T;
  onChange: (v: T) => void;
  options: { v: T; l: string }[];
}) {
  return (
    <div className="glass rounded-full p-1 flex">
      {options.map((o) => (
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(400px 60px at 50% 50%, oklch(0.85 0.15 80 / 0.15), transparent 70%)",
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