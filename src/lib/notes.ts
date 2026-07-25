// Note layout & keyboard mapping for the harmonium.
// Matches the visual layout of web-harmonium.com: Sa mapped to C, with
// sargam labels using combining dots for octave (dot below = lower octave,
// no dot = middle, dot above = upper octave, two dots = higher still).
export type Key = {
  note: string;        // e.g. "C4"
  midi: number;
  isBlack: boolean;
  sargam: string;      // Indian solfege with octave dots
  western: string;     // C, C#, D...
  kb?: string;         // computer keyboard binding
};

// Base sargam letters for Sa=C (middle octave, no dot)
const sargamBase = [
  "S", "r", "R", "g", "G", "M", "m", "P", "d", "D", "n", "N",
];
const semitoneToWestern = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

// Combining diacritics
const DOT_BELOW = "\u0323";
const DOT_ABOVE = "\u0307";

// Apply octave dots relative to middle octave (C4..B4 => octave 4)
function sargamWithOctave(pc: number, octave: number): string {
  const base = sargamBase[pc];
  const diff = octave - 4;
  if (diff === 0) return base;
  if (diff < 0) return base + DOT_BELOW.repeat(Math.min(2, -diff));
  return base + DOT_ABOVE.repeat(Math.min(2, diff));
}

// White-key keyboard row (left→right) mirrors web-harmonium.com
const WHITE_KB = ["s","a","`","w","e","r","t","y","u","i","o","p","]","\\","'",";","/"];
// Black-key keyboard row
const BLACK_KB = ["1","2","4","5","7","8","9","-","[","="];

export function buildKeys(_totalMidi = 24, octaves: 3 | 5 = 3): Key[] {
  // Default range: start at F3 (MIDI 53), like the reference site.
  const startMidi = 53;
  const total = octaves === 5 ? 36 : 26; // ~2 octaves visible for 3-mode, wider for 5
  const keys: Key[] = [];
  let whiteIdx = 0;
  let blackIdx = 0;
  for (let i = 0; i < total; i++) {
    const midi = startMidi + i;
    const pc = midi % 12;
    const octave = Math.floor(midi / 12) - 1;
    const isBlack = [1, 3, 6, 8, 10].includes(pc);
    let kb: string | undefined;
    if (isBlack) {
      kb = BLACK_KB[blackIdx++];
    } else {
      kb = WHITE_KB[whiteIdx++];
    }
    keys.push({
      note: `${semitoneToWestern[pc]}${octave}`,
      midi,
      isBlack,
      sargam: sargamWithOctave(pc, octave),
      western: semitoneToWestern[pc],
      kb,
    });
  }
  return keys;
}

export function midiToNote(m: number): string {
  const pc = m % 12;
  const oct = Math.floor(m / 12) - 1;
  return `${semitoneToWestern[pc]}${oct}`;
}
