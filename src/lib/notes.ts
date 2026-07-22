// Note layout & keyboard mapping for the harmonium.
export type Key = {
  note: string;        // e.g. "C4"
  midi: number;
  isBlack: boolean;
  sargam: string;      // Indian solfege label (rough C-based mapping)
  western: string;     // C, C#, D...
  kb?: string;         // computer keyboard binding
};

const semitoneToSargam = [
  "Sa", "re", "Re", "ga", "Ga", "Ma", "ma", "Pa", "dha", "Dha", "ni", "Ni",
];
const semitoneToWestern = [
  "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
];

// Two-row QWERTY mapping across ~2 octaves
const KB_MAP: Record<number, string> = {
  // white keys row (ASDFGHJKL;')
  0: "a", 2: "s", 4: "d", 5: "f", 7: "g", 9: "h", 11: "j",
  12: "k", 14: "l", 16: ";", 17: "'",
  // black keys row (WE TYU O P])
  1: "w", 3: "e", 6: "t", 8: "y", 10: "u", 13: "o", 15: "p",
};

export function buildKeys(startMidi = 48 /* C3 */, octaves = 3): Key[] {
  const keys: Key[] = [];
  const total = octaves * 12 + 1;
  for (let i = 0; i < total; i++) {
    const midi = startMidi + i;
    const pc = midi % 12;
    const octave = Math.floor(midi / 12) - 1;
    keys.push({
      note: `${semitoneToWestern[pc]}${octave}`,
      midi,
      isBlack: [1, 3, 6, 8, 10].includes(pc),
      sargam: semitoneToSargam[pc],
      western: semitoneToWestern[pc],
      kb: KB_MAP[i],
    });
  }
  return keys;
}

export function midiToNote(m: number): string {
  const pc = m % 12;
  const oct = Math.floor(m / 12) - 1;
  return `${semitoneToWestern[pc]}${oct}`;
}
