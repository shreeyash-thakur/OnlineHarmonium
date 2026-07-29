// Lightweight WebMIDI helper. Keeps the MIDI layer out of the React component
// so the engine/component stays browser-API-agnostic.
export type MidiCallbacks = {
  onNoteOn: (note: string) => void;
  onNoteOff: (note: string) => void;
  onDevicesChange: (names: string[]) => void;
};

const midiAccessToNames = (midi: MIDIAccess | null): string[] => {
  if (!midi) return [];
  const names: string[] = [];
  for (const input of midi.inputs.values()) {
    const name = input.name || input.id || "MIDI Input";
    if (!names.includes(name)) names.push(name);
  }
  return names;
};

let midiAccess: MIDIAccess | null = null;
let midiCallbacks: MidiCallbacks | null = null;
let deviceChangeHandler: ((e: Event) => void) | null = null;

function noteFromStatus(status: number, note: number): number | null {
  const cmd = status & 0xf0;
  if (cmd === 0x90 && note >= 0 && note <= 127) return note;
  if (cmd === 0x80 && note >= 0 && note <= 127) return note;
  return null;
}

function midiToNoteName(midi: number): string {
  // Map MIDI note number to note name string used by the harmonium engine.
  // The engine's noteToMidi() uses names like "C4", "C#4", "Db4" — here we
  // only emit sharps for simplicity because the sample pitch table is
  // built around note names, and the harmonium layout is chromatic.
  const pc = midi % 12;
  const oct = Math.floor(midi / 12) - 1;
  const names = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  return `${names[pc]}${oct}`;
}

async function ensureMidiAccess(): Promise<MIDIAccess | null> {
  if (midiAccess) return midiAccess;

  const ac = (navigator as Navigator & { midi?: { requestAccess: () => Promise<MIDIAccess> } }).midi;
  if (!ac) return null;

  try {
    midiAccess = await ac.requestAccess();
  } catch {
    return null;
  }

  return midiAccess;
}

function attachMidiListener(access: MIDIAccess) {
  const cb = midiCallbacks;
  if (!cb) return;

  const onStateChange = () => {
    cb.onDevicesChange(midiAccessToNames(access));
  };

  const onMessage = (ev: MIDIMessageEvent) => {
    const data = ev.data;
    if (!data || data.length < 2) return;
    const status = data[0];
    const note = data[1];
    const velocity = data[2] || 0;

    const n = noteFromStatus(status, note);
    if (n === null) return;
    const name = midiToNoteName(n);
    const cmd = status & 0xf0;
    if (cmd === 0x90 && velocity > 0) {
      cb.onNoteOn(name);
    } else if (cmd === 0x80 || (cmd === 0x90 && velocity === 0)) {
      cb.onNoteOff(name);
    }
  };

  for (const input of access.inputs.values()) {
    input.onmidimessage = onMessage;
  }

  access.onstatechange = onStateChange;
  deviceChangeHandler = onStateChange;
}

export function disconnectMidi() {
  try {
    midiAccess?.inputs.forEach((input) => {
      input.onmidimessage = null;
    });
    if (midiAccess) {
      midiAccess.onstatechange = null;
    }
  } catch {
    // ignore
  }
  midiAccess = null;
  midiCallbacks = null;
  deviceChangeHandler = null;
}

export async function connectMidi(callbacks: MidiCallbacks): Promise<string[]> {
  const access = await ensureMidiAccess();
  if (!access) return [];

  midiCallbacks = callbacks;
  attachMidiListener(access);

  const names = midiAccessToNames(access);
  callbacks.onDevicesChange(names);
  return names;
}

export function isMidiSupported() {
  return typeof navigator !== "undefined" && !!(navigator as Navigator & { midi?: unknown }).midi;
}