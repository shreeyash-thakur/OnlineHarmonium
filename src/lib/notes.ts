// Note layout mirroring web-harmonium.com exactly.
// Single flat row of 27 keys (F3..G5 chromatic). Black keys are narrower
// and rendered inline (not overlapping) — matches the reference site's
// scale-changer layout.
export type Key = {
  note: string;      // e.g. "C4"
  midi: number;
  isBlack: boolean;
  sargam: string;    // Indian solfege as shown on reference site
  western: string;   // C, C#, D...
  kb?: string;       // computer keyboard binding
};

const semitoneToWestern = [
  "C","C#","D","D#","E","F","F#","G","G#","A","A#","B",
];

// Exact sequence from web-harmonium.com default view (F3..G5, 27 keys).
// Each row: [kb, sargam, isBlack]
const LAYOUT: Array<[string, string, boolean]> = [
  ["s", "Ṗ", false],
  ["a", "Ḍ", false],
  ["`", "Ṇ", false],
  ["1", "Ṗ", true],
  ["q", "Ḍ", false],
  ["2", "Ḍ", true],
  ["w", "Ṇ", false],
  ["e", "S", false],
  ["4", "S", true],
  ["r", "R", false],
  ["5", "R", true],
  ["t", "G", false],
  ["y", "M", false],
  ["7", "M", true],
  ["u", "P", false],
  ["8", "P", true],
  ["i", "D", false],
  ["9", "D", true],
  ["o", "N", false],
  ["p", "Ṡ", false],
  ["-", "Ṡ", true],
  ["[", "Ṙ", false],
  ["=", "Ṙ", true],
  ["]", "Ġ", false],
  ["\\", "Ṁ", false],
  ["'", "Ṗ", false],
  [";", "Ḋ", false],
];

export function buildKeys(): Key[] {
  const startMidi = 53; // F3
  return LAYOUT.map(([kb, sargam, isBlack], i) => {
    const midi = startMidi + i;
    const pc = midi % 12;
    const octave = Math.floor(midi / 12) - 1;
    return {
      note: `${semitoneToWestern[pc]}${octave}`,
      midi,
      isBlack,
      sargam,
      western: semitoneToWestern[pc],
      kb,
    };
  });
}

export function midiToNote(m: number): string {
  const pc = m % 12;
  const oct = Math.floor(m / 12) - 1;
  return `${semitoneToWestern[pc]}${oct}`;
}
