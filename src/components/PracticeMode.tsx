import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Check, X, Music, ChevronRight } from "lucide-react";
import { buildKeys, type Key } from "@/lib/notes";
import { getHarmonium } from "@/lib/harmonium-engine";

type Exercise = {
  id: string;
  title: string;
  description: string;
  /** Sargam syllables for display, e.g. ["S","R","G","M"] */
  sargam: string[];
  /** Corresponding note names the engine understands, e.g. ["E4","F#4",...] */
  notes: string[];
};

// Map sargam display names to the actual note names from the key layout.
// The harmonium's default layout starts at F3 (MIDI 53) and Sa (S) is on
// key "e" which is E4 (MIDI 64). We use the buildKeys() lookup to find the
// real note name for each sargam label.
function buildSargamToNoteMap(): Map<string, string> {
  const keys = buildKeys();
  const map = new Map<string, string>();
  for (const k of keys) {
    // Only map the first occurrence of each sargam label
    if (!map.has(k.sargam)) {
      map.set(k.sargam, k.note);
    }
  }
  return map;
}

const EXERCISES: Exercise[] = [
  {
    id: "sa-re-ga-ma",
    title: "Sa Re Ga Ma",
    description: "Play the first four notes ascending.",
    sargam: ["S", "R", "G", "M"],
    notes: [], // filled at runtime
  },
  {
    id: "sa-re-ga-ma-pa",
    title: "Sa Re Ga Ma Pa",
    description: "Add the fifth note — Pa.",
    sargam: ["S", "R", "G", "M", "P"],
    notes: [],
  },
  {
    id: "full-saptak",
    title: "Sa Re Ga Ma Pa Dha Ni",
    description: "Play all seven notes of the saptak.",
    sargam: ["S", "R", "G", "M", "P", "D", "N"],
    notes: [],
  },
  {
    id: "up-down",
    title: "Sa Re Ga Ma Pa Ma Ga Re Sa",
    description: "Ascend to Pa, then descend back to Sa.",
    sargam: ["S", "R", "G", "M", "P", "M", "G", "R", "S"],
    notes: [],
  },
];

function resolveExerciseNotes(): Exercise[] {
  const sargamMap = buildSargamToNoteMap();
  return EXERCISES.map((ex) => ({
    ...ex,
    notes: ex.sargam.map((s) => sargamMap.get(s) ?? "E4"),
  }));
}

export function PracticeMode() {
  const exercises = useMemo(() => resolveExerciseNotes(), []);
  const [activeIdx, setActiveIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "correct" | "wrong" | "done">("idle");
  const [feedback, setFeedback] = useState<string | null>(null);
  const engineReady = useRef(false);

  const exercise = exercises[activeIdx];
  const targetNote = exercise.notes[currentStep];
  const targetSargam = exercise.sargam[currentStep];

  // Build a reverse lookup: note name -> sargam label (for display)
  const noteToSargam = useMemo(() => {
    const keys = buildKeys();
    const m = new Map<string, string>();
    for (const k of keys) {
      if (!m.has(k.note)) m.set(k.note, k.sargam);
    }
    return m;
  }, []);

  // Keyboard lookup: computer key -> Key
  const kbLookup = useMemo(() => {
    const keys = buildKeys();
    const m = new Map<string, Key>();
    for (const k of keys) {
      if (k.kb) m.set(k.kb, k);
    }
    return m;
  }, []);

  // Reverse: note name -> computer key (for hint display)
  const noteToKb = useMemo(() => {
    const keys = buildKeys();
    const m = new Map<string, string>();
    for (const k of keys) {
      if (k.kb && !m.has(k.note)) m.set(k.note, k.kb);
    }
    return m;
  }, []);

  async function ensureEngine() {
    if (engineReady.current) return;
    try {
      await getHarmonium().ensureStarted();
      engineReady.current = true;
    } catch {
      // ignore — user can still see the exercise
    }
  }

  const checkNote = useCallback(
    (note: string) => {
      if (status === "done") return;
      const playedSargam = noteToSargam.get(note) ?? note;
      if (note === targetNote) {
        setStatus("correct");
        setFeedback(`Correct! ${playedSargam} ✓`);
        // Play the note so the user hears it
        getHarmonium().noteOn(note);
        setTimeout(() => getHarmonium().noteOff(note), 600);

        // Advance after a short delay
        setTimeout(() => {
          setCurrentStep((step) => {
            const next = step + 1;
            if (next >= exercise.notes.length) {
              setStatus("done");
              setFeedback("Exercise complete! 🎉");
              return step;
            }
            setStatus("idle");
            setFeedback(null);
            return next;
          });
        }, 700);
      } else {
        setStatus("wrong");
        setFeedback(`That was ${playedSargam} — try again, looking for ${targetSargam}`);
        // Play the wrong note briefly so user hears what they pressed
        getHarmonium().noteOn(note);
        setTimeout(() => getHarmonium().noteOff(note), 300);
        setTimeout(() => {
          setStatus("idle");
        }, 1000);
      }
    },
    [targetNote, targetSargam, status, exercise.notes.length, noteToSargam],
  );

  // Listen for computer keyboard input (same keys as the harmonium)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const key = e.key.toLowerCase();
      const k = kbLookup.get(key);
      if (k) {
        e.preventDefault();
        void ensureEngine();
        checkNote(k.note);
      }
    };
    window.addEventListener("keydown", down);
    return () => window.removeEventListener("keydown", down);
  }, [kbLookup, checkNote]);

  function restart() {
    setCurrentStep(0);
    setStatus("idle");
    setFeedback(null);
  }

  function nextExercise() {
    setActiveIdx((i) => Math.min(exercises.length - 1, i + 1));
    restart();
  }

  function selectExercise(i: number) {
    setActiveIdx(i);
    restart();
  }

  const progress = Math.round((currentStep / exercise.notes.length) * 100);
  const hintKb = noteToKb.get(targetNote);

  return (
    <div className="wood-panel rounded-3xl p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-10 w-10 shrink-0 rounded-xl btn-gold grid place-items-center font-display font-bold">
          ♪
        </div>
        <div>
          <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gold-soft">
            Interactive Practice
          </div>
          <div className="font-display text-base sm:text-lg font-semibold gold-text">
            {exercise.title}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-5">{exercise.description}</p>

      {/* Exercise selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {exercises.map((ex, i) => (
          <button
            key={ex.id}
            type="button"
            onClick={() => selectExercise(i)}
            className={`px-3 py-1.5 rounded-full text-xs transition-all ${
              i === activeIdx
                ? "btn-gold btn-gold-hover"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {i + 1}. {ex.title}
          </button>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <span>Progress: {currentStep}/{exercise.notes.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full btn-gold"
            animate={{ width: `${status === "done" ? 100 : progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Note sequence display */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
        {exercise.sargam.map((s, i) => {
          const isCurrent = i === currentStep && status !== "done";
          const isDone = i < currentStep || status === "done";
          return (
            <div
              key={i}
              className={`relative flex flex-col items-center justify-center rounded-xl px-3 py-3 sm:px-4 sm:py-4 min-w-[3rem] transition-all ${
                isCurrent
                  ? "btn-gold scale-110 shadow-lg"
                  : isDone
                    ? "bg-white/5 border border-gold/30"
                    : "bg-white/5 border border-white/10"
              }`}
            >
              <span
                className={`font-display text-lg sm:text-xl font-bold ${
                  isCurrent ? "text-amber-900" : isDone ? "text-gold-soft" : "text-muted-foreground"
                }`}
              >
                {s}
              </span>
              {isDone && (
                <Check className="absolute -top-1 -right-1 h-4 w-4 text-gold-soft bg-background rounded-full" />
              )}
            </div>
          );
        })}
      </div>

      {/* Current note prompt */}
      {status !== "done" ? (
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground mb-2">
            Play this note on the harmonium:
          </p>
          <div className="inline-flex items-center gap-3 glass rounded-2xl px-6 py-4">
            <span className="font-display text-3xl font-bold gold-text">{targetSargam}</span>
            {hintKb && (
              <span className="text-xs text-muted-foreground">
                press <kbd className="px-2 py-1 rounded bg-white/10 font-mono uppercase">{hintKb}</kbd>
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mb-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 glass rounded-2xl px-6 py-4"
          >
            <Check className="h-6 w-6 text-gold-soft" />
            <span className="font-display text-xl gold-text">Complete!</span>
          </motion.div>
        </div>
      )}

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`text-center text-sm mb-4 ${
              status === "correct"
                ? "text-green-400"
                : status === "wrong"
                  ? "text-red-400"
                  : "text-gold-soft"
            }`}
          >
            {feedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={restart}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground transition-all"
        >
          <RotateCcw className="h-4 w-4" /> Restart
        </button>
        {status === "done" && activeIdx < exercises.length - 1 && (
          <button
            type="button"
            onClick={nextExercise}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full btn-gold btn-gold-hover text-sm"
          >
            Next Exercise <ChevronRight className="h-4 w-4" />
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            void ensureEngine();
            getHarmonium().noteOn(targetNote);
            setTimeout(() => getHarmonium().noteOff(targetNote), 800);
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground transition-all"
          title="Hear the target note"
        >
          <Music className="h-4 w-4" /> Hear note
        </button>
      </div>

      <p className="mt-4 text-[10px] sm:text-xs text-muted-foreground text-center">
        Use your computer keyboard or tap the harmonium keys on the <a href="/play" className="text-gold-soft hover:underline">play page</a>.
        The practice mode listens for the same keys.
      </p>
    </div>
  );
}