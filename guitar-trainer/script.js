const CONFIG = {
  paymentUrl: "https://brittle342.gumroad.com/l/fretflow-trainer",
  contactEmail: "fretflowtrainer@outlook.com",
  priceLabel: "$9",
  accessSalt: "fretflow-2026-founding-gate-v1",
  accessDigest: [
    "8a40f825d358b4a44594515b5380133e",
    "3dca4f956819601aafcb746e499a1652",
  ].join(""),
  maxAccessAttempts: 5,
  accessLockMinutes: 15,
};

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
const STRINGS = [
  { id: "highE", label: "e", midi: 64 },
  { id: "B", label: "B", midi: 59 },
  { id: "G", label: "G", midi: 55 },
  { id: "D", label: "D", midi: 50 },
  { id: "A", label: "A", midi: 45 },
  { id: "lowE", label: "E", midi: 40 },
];
const MAX_FRET = 12;
const OPEN_STRING_OFFSET = 0.9;
const KEYS = ["C", "G", "D", "A", "E", "F", "Bb"];
const DEGREE_STEPS = [0, 2, 4, 5, 7, 9, 11];
const DEGREE_LABELS = ["1", "b2", "2", "b3", "3", "4", "b5", "5", "b6", "6", "b7", "7"];
const SOLFEGE_LABELS = ["do", "ra", "re", "me", "mi", "fa", "se", "sol", "le", "la", "te", "ti"];
const LABEL_MODE_NAMES = {
  notes: "notes",
  degrees: "degrees",
  solfege: "do re mi",
};
const QUALITY_INTERVALS = {
  maj: [0, 4, 7],
  min: [0, 3, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  "6": [0, 4, 7, 9],
  m6: [0, 3, 7, 9],
  "7": [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  m7: [0, 3, 7, 10],
  m7b5: [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
  add9: [0, 4, 7, 14],
  madd9: [0, 3, 7, 14],
  "9": [0, 4, 7, 10, 14],
  maj9: [0, 4, 7, 11, 14],
  m9: [0, 3, 7, 10, 14],
};
const SCALE_INTERVALS = {
  majorScale: [0, 2, 4, 5, 7, 9, 11],
  naturalMinor: [0, 2, 3, 5, 7, 8, 10],
  harmonicMinor: [0, 2, 3, 5, 7, 8, 11],
  minorPentatonic: [0, 3, 5, 7, 10],
  majorPentatonic: [0, 2, 4, 7, 9],
  blues: [0, 3, 5, 6, 7, 10],
};
const BOX_WINDOWS = [
  [0, 3],
  [2, 6],
  [4, 8],
  [7, 10],
  [9, 12],
];
const CHORD_BLOCKS = {
  low: { label: "Low block", short: "Low", min: 0, max: 4, center: 2 },
  middle: { label: "Middle block", short: "Middle", min: 3, max: 7, center: 5 },
  high: { label: "High block", short: "High", min: 6, max: 10, center: 8 },
};
const PROGRESSION_PRESETS = [
  { id: "gospel", label: "1 6m 4 5", value: "1 6m 4 5", daily: "Say: 1 major, 6 minor, 4 major, 5 major." },
  { id: "classic", label: "1 5 6m 4", value: "1 5 6m 4", daily: "Listen for the big popular-song movement." },
  { id: "church", label: "1 4 5 1", value: "1 4 5 1", daily: "Resolve back home cleanly." },
  { id: "blues", label: "1 4 1 5", value: "1 4 1 5", daily: "Keep the groove steady and do not rush the 5." },
  { id: "sad", label: "6m 4 1 5", value: "6m 4 1 5", daily: "Start minor and hear how it opens back home." },
  { id: "ii-v-i", label: "2m7 5dom7 1maj7", value: "2m7 5dom7 1maj7", daily: "Jazz move: minor 2, dominant 5, major 1.", lab: true },
  { id: "turnaround", label: "1maj7 6m7 2m7 5dom7", value: "1maj7 6m7 2m7 5dom7", daily: "Turnaround: hear the path back to the 1.", lab: true },
  { id: "minor-jazz", label: "6m7 2m7 5dom7 1maj7", value: "6m7 2m7 5dom7 1maj7", daily: "Advanced loop: keep each 7th chord grip close.", lab: true },
  { id: "custom", label: "Custom", value: "1 6m 4 5", daily: "Type your own numbers or chord names." },
];

const NOTE_FINDER_TARGETS = ["C", "D", "E", "F", "G", "A", "B", "C#", "F#", "Bb"];
const CHORD_TRIVIA = [
  { tones: ["C", "E", "G"], answer: "C major", choices: ["C major", "C minor", "G major"] },
  { tones: ["A", "C", "E"], answer: "A minor", choices: ["A minor", "A major", "C major"] },
  { tones: ["G", "B", "D", "F"], answer: "G7", choices: ["G7", "Gmaj7", "Gm7"] },
  { tones: ["D", "F", "A", "C"], answer: "Dm7", choices: ["Dm7", "D7", "Dmaj7"] },
  { tones: ["B", "D", "F", "A"], answer: "Bm7b5", choices: ["Bm7b5", "Bmaj7", "B7"] },
];
const PROGRESS_KEY = "fretFlowPracticeProgress";
const ACCESS_KEY = "fretFlowFoundingAccess";
const ACCESS_ATTEMPT_KEY = "fretFlowAccessAttempts";
const DEMO_SETTINGS = {
  mode: "progression",
  key: "G",
  progression: "1 6m 4 5",
  progressionBlock: "middle",
  presetId: "gospel",
  selectedStrings: ["D", "G", "B", "highE"],
};

const els = {
  accessForm: document.getElementById("accessForm"),
  accessCode: document.getElementById("accessCode"),
  accessStatus: document.getElementById("accessStatus"),
  accessHelp: document.getElementById("accessHelp"),
  buyAccessButton: document.getElementById("buyAccessButton"),
  modeTabs: document.querySelectorAll(".mode-tab"),
  modePanels: document.querySelectorAll(".mode-panel"),
  keySelect: document.getElementById("keySelect"),
  soundSelect: document.getElementById("soundSelect"),
  tempoRange: document.getElementById("tempoRange"),
  tempoValue: document.getElementById("tempoValue"),
  labelButtons: document.querySelectorAll("[data-label-mode]"),
  blockButtons: document.querySelectorAll("[data-progression-block]"),
  progressionPresets: document.getElementById("progressionPresets"),
  customProgression: document.getElementById("customProgression"),
  applyProgression: document.getElementById("applyProgression"),
  scaleType: document.getElementById("scaleType"),
  boxSelect: document.getElementById("boxSelect"),
  playScale: document.getElementById("playScale"),
  chordRoot: document.getElementById("chordRoot"),
  chordQuality: document.getElementById("chordQuality"),
  playChord: document.getElementById("playChord"),
  stringSet: document.getElementById("stringSet"),
  modeEyebrow: document.getElementById("modeEyebrow"),
  mainTitle: document.getElementById("mainTitle"),
  previousButton: document.getElementById("previousButton"),
  playButton: document.getElementById("playButton"),
  nextButton: document.getElementById("nextButton"),
  flowLane: document.getElementById("flowLane"),
  fretboard: document.getElementById("fretboard"),
  legend: document.getElementById("legend"),
  lessonStrip: document.getElementById("lessonStrip"),
  nowName: document.getElementById("nowName"),
  nowDetail: document.getElementById("nowDetail"),
  practiceQueue: document.getElementById("practiceQueue"),
  dailyCopy: document.getElementById("dailyCopy"),
  sessionScore: document.getElementById("sessionScore"),
  progressToday: document.getElementById("progressToday"),
  progressHint: document.getElementById("progressHint"),
  progressStreak: document.getElementById("progressStreak"),
  progressSessions: document.getElementById("progressSessions"),
  progressChart: document.getElementById("progressChart"),
  checks: document.querySelectorAll("[data-check]"),
  buyButton: document.getElementById("buyButton"),
  paymentStatus: document.getElementById("paymentStatus"),
  paymentDialog: document.getElementById("paymentDialog"),
  noteFinderTarget: document.getElementById("noteFinderTarget"),
  noteFinderHint: document.getElementById("noteFinderHint"),
  newNoteTarget: document.getElementById("newNoteTarget"),
  showNoteHint: document.getElementById("showNoteHint"),
  chordTriviaQuestion: document.getElementById("chordTriviaQuestion"),
  chordTriviaChoices: document.getElementById("chordTriviaChoices"),
  chordTriviaFeedback: document.getElementById("chordTriviaFeedback"),
  nextChordTrivia: document.getElementById("nextChordTrivia"),
  advancedProgressions: document.getElementById("advancedProgressions"),
  contactEmailLink: document.getElementById("contactEmailLink"),
  contactEmailStatus: document.getElementById("contactEmailStatus"),
};

let state = {
  mode: "progression",
  key: "G",
  sound: "acoustic",
  progression: "1 6m 4 5",
  progressionBlock: "middle",
  presetId: "gospel",
  stepIndex: 0,
  selectedStrings: ["D", "G", "B", "highE"],
  labelMode: "notes",
  scaleType: "minorPentatonic",
  box: "0",
  chordRoot: "G",
  chordQuality: "maj",
};
let audioContext;
let transitionTimers = [];
let accessUnlocked = false;
let labState = {
  noteTarget: "G",
  chordTriviaIndex: 0,
};

function normalizeMode(mode, allowLab = false) {
  const modes = allowLab ? ["progression", "pentatonic", "chordtones", "notefinder"] : ["progression", "pentatonic", "chordtones"];
  return modes.includes(mode) ? mode : "progression";
}

function normalizeAccessCode(value) {
  return String(value || "").trim().toUpperCase();
}

async function codeDigest(value) {
  const normalized = normalizeAccessCode(value);
  if (!window.crypto?.subtle) return "";
  const bytes = new TextEncoder().encode(`${CONFIG.accessSalt}:${normalized}`);
  const digest = await window.crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

function sameText(left, right) {
  const a = String(left || "");
  const b = String(right || "");
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let index = 0; index < a.length; index += 1) {
    diff |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return diff === 0;
}

function loadAccessAttempts() {
  try {
    const attempts = JSON.parse(localStorage.getItem(ACCESS_ATTEMPT_KEY));
    if (attempts && typeof attempts === "object") return { count: 0, lockedUntil: 0, ...attempts };
  } catch {
    // Treat storage errors as no saved attempts.
  }
  return { count: 0, lockedUntil: 0 };
}

function saveAccessAttempts(attempts) {
  try {
    localStorage.setItem(ACCESS_ATTEMPT_KEY, JSON.stringify(attempts));
  } catch {
    // Ignore storage errors.
  }
}

function accessLockRemainingMinutes() {
  const attempts = loadAccessAttempts();
  const remaining = Math.max(0, attempts.lockedUntil - Date.now());
  return Math.ceil(remaining / 60000);
}

function recordFailedAccess() {
  const attempts = loadAccessAttempts();
  if (attempts.lockedUntil > Date.now()) return attempts;
  const nextCount = attempts.count + 1;
  const lockedUntil = nextCount >= CONFIG.maxAccessAttempts
    ? Date.now() + CONFIG.accessLockMinutes * 60000
    : 0;
  const next = { count: nextCount, lockedUntil };
  saveAccessAttempts(next);
  return next;
}

function clearAccessAttempts() {
  saveAccessAttempts({ count: 0, lockedUntil: 0 });
}

function isOwnerLocalCopy() {
  return ["file:", "http:"].includes(window.location.protocol)
    && ["", "localhost", "127.0.0.1"].includes(window.location.hostname);
}

async function loadAccess() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("demo") === "1") {
    accessUnlocked = false;
    return;
  }
  if (isOwnerLocalCopy()) {
    accessUnlocked = true;
    try {
      localStorage.setItem(ACCESS_KEY, "unlocked");
    } catch {
      // Local owner access still works for this visit.
    }
    return;
  }
  try {
    accessUnlocked = localStorage.getItem(ACCESS_KEY) === "unlocked";
  } catch {
    accessUnlocked = false;
  }
}

async function unlockAccess(code, showMessage = true) {
  const lockedFor = accessLockRemainingMinutes();
  if (lockedFor > 0) {
    if (els.accessHelp) els.accessHelp.textContent = `Too many tries. Wait about ${lockedFor} minute${lockedFor === 1 ? "" : "s"} before trying again.`;
    return false;
  }
  accessUnlocked = sameText(await codeDigest(code), CONFIG.accessDigest);
  if (!accessUnlocked) {
    const attempts = recordFailedAccess();
    const triesLeft = Math.max(0, CONFIG.maxAccessAttempts - attempts.count);
    if (els.accessHelp) {
      els.accessHelp.textContent = attempts.lockedUntil > Date.now()
        ? `Too many tries. Access entry is paused for ${CONFIG.accessLockMinutes} minutes.`
        : `That code did not unlock the trainer. ${triesLeft} ${triesLeft === 1 ? "try" : "tries"} left before a short pause.`;
    }
    return false;
  }
  clearAccessAttempts();
  try {
    localStorage.setItem(ACCESS_KEY, "unlocked");
  } catch {
    // Access still works for this visit.
  }
  if (showMessage && els.accessHelp) els.accessHelp.textContent = "Full trainer unlocked on this browser.";
  return true;
}

function hasPremiumAccess() {
  return accessUnlocked;
}

function enforceDemoState() {
  if (hasPremiumAccess()) return;
  state = {
    ...state,
    ...DEMO_SETTINGS,
    stepIndex: Math.min(state.stepIndex, 3),
  };
}

function showAccessPrompt(feature = "the full trainer") {
  if (els.accessHelp) els.accessHelp.textContent = `Founding access unlocks ${feature}.`;
  document.getElementById("access")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function guardPremium(feature) {
  if (hasPremiumAccess()) return true;
  showAccessPrompt(feature);
  enforceDemoState();
  applyAccessState();
  render();
  return false;
}

function mod(value, size) {
  return ((value % size) + size) % size;
}

function noteIndex(note) {
  const normalized = note.replace("Db", "C#").replace("Eb", "D#").replace("Gb", "F#").replace("Ab", "G#").replace("Bb", "A#");
  return NOTES.indexOf(normalized);
}

function noteName(midi) {
  return NOTES[mod(midi, 12)];
}

function degreeLabel(midi, rootMidi) {
  return DEGREE_LABELS[mod(midi - rootMidi, 12)];
}

function degreeClassName(value) {
  const safeValue = String(value || "")
    .replace("#", "sharp")
    .replace("b", "flat")
    .replace(/[^a-z0-9-]/gi, "")
    .toLowerCase();
  return safeValue ? `degree-${safeValue}` : "";
}

function solfegeLabel(midi, rootMidi) {
  return SOLFEGE_LABELS[mod(midi - rootMidi, 12)];
}

function labelModeName() {
  return LABEL_MODE_NAMES[state.labelMode] || LABEL_MODE_NAMES.notes;
}

function toneLabelHeading() {
  if (state.labelMode === "degrees") return "Degrees";
  if (state.labelMode === "solfege") return "Do Re Mi";
  return "Notes";
}

function toneLabel(midi, rootMidi) {
  if (state.labelMode === "degrees") return degreeLabel(midi, rootMidi);
  if (state.labelMode === "solfege") return solfegeLabel(midi, rootMidi);
  return noteName(midi);
}

function toneLabels(midis, rootMidi) {
  return midis.map(midi => toneLabel(midi, rootMidi));
}

function chordToneRole(midi, rootMidi) {
  return {
    "1": "Root",
    "b3": "Minor 3rd",
    "3": "Major 3rd",
    "4": "Sus4",
    "5": "5th",
    "b5": "Flat 5",
    "b7": "Flat 7",
    "7": "Major 7",
    "2": "9th",
    "6": "6th",
  }[degreeLabel(midi, rootMidi)] || "Tone";
}

function chordToneMapDetail(midi, rootMidi) {
  const label = toneLabel(midi, rootMidi);
  const note = noteName(midi);
  return state.labelMode === "notes" ? note : `${label} - ${note}`;
}

function labelLegend() {
  return `Labels = ${labelModeName()}`;
}

function midiToFrequency(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function ensureAudio() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
}

function toneSettings() {
  const sound = els.soundSelect.value;
  if (sound === "bell") return { type: "sine", attack: 0.01, decay: 1.2, peak: 0.14 };
  if (sound === "warm") return { type: "triangle", attack: 0.02, decay: 1.5, peak: 0.12 };
  if (sound === "electric") return { type: "sawtooth", attack: 0.006, decay: 0.82, peak: 0.09, filter: 1250, drive: 30 };
  return { type: "triangle", attack: 0.008, decay: 1.05, peak: 0.13, filter: 1850 };
}

function makeDistortionCurve(amount) {
  const samples = 44100;
  const curve = new Float32Array(samples);
  const deg = Math.PI / 180;
  for (let i = 0; i < samples; i += 1) {
    const x = (i * 2) / samples - 1;
    curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

function playMidi(midi, start, duration = 0.85) {
  ensureAudio();
  const tone = toneSettings();
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const filter = audioContext.createBiquadFilter();
  osc.type = tone.type;
  osc.frequency.setValueAtTime(midiToFrequency(midi), start);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(tone.filter || 1800, start);
  filter.Q.setValueAtTime(tone.drive ? 3.2 : 1.2, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(tone.peak, start + tone.attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration * tone.decay);
  if (tone.drive) {
    const shaper = audioContext.createWaveShaper();
    shaper.curve = makeDistortionCurve(tone.drive);
    shaper.oversample = "4x";
    osc.connect(shaper);
    shaper.connect(filter);
  } else {
    osc.connect(filter);
  }
  filter.connect(gain);
  gain.connect(audioContext.destination);
  osc.start(start);
  osc.stop(start + duration * tone.decay + 0.05);
}

function playMidiSet(midis, delay = 0.045) {
  ensureAudio();
  const start = audioContext.currentTime + 0.03;
  midis.forEach((midi, index) => playMidi(midi, start + index * delay));
}

function clearTransitionTimers() {
  transitionTimers.forEach(timer => clearTimeout(timer));
  transitionTimers = [];
  document.body.classList.remove("is-playing");
}

function keyRootMidi() {
  return 60 + noteIndex(state.key);
}

function parseProgression(text) {
  return text
    .trim()
    .split(/\s+/)
    .map(parseToken)
    .filter(Boolean);
}

function parseToken(token) {
  const clean = token.trim();
  const degreeMatch = clean.match(/^([b#]?)([1-7])(maj9|maj7|madd9|m7b5|dim7|dom7|min9|min7|m9|m7|min|maj|add9|sus2|sus4|dim|aug|m6|6|9|7|m|\+)?$/i);
  if (degreeMatch) {
    const accidental = degreeMatch[1] === "b" ? -1 : degreeMatch[1] === "#" ? 1 : 0;
    const degree = Number(degreeMatch[2]);
    const naturalQuality = [1, 4, 5].includes(degree) ? "maj" : degree === 7 ? "dim" : "min";
    const quality = normalizeQuality(degreeMatch[3], naturalQuality);
    const root = keyRootMidi() + DEGREE_STEPS[degree - 1] + accidental;
    return {
      token: clean,
      name: degreeChordName(degree, accidental, quality),
      rootMidi: root,
      rootName: noteName(root),
      quality,
      detail: `${degreeName(degree)} in ${state.key}`,
    };
  }
  const chordMatch = clean.match(/^([A-G](?:#|b)?)(maj9|maj7|madd9|m7b5|dim7|dom7|min9|min7|m9|m7|min|maj|add9|sus2|sus4|dim|aug|m6|6|9|7|m|\+)?(?:\/([A-G](?:#|b)?))?$/i);
  if (chordMatch) {
    const rootName = chordMatch[1].replace("b", "b");
    const quality = normalizeQuality(chordMatch[2], "maj");
    const bassName = chordMatch[3] ? noteName(60 + noteIndex(chordMatch[3])) : "";
    const rootMidi = 60 + noteIndex(rootName);
    return {
      token: clean,
      name: bassName ? `${chordName(noteName(rootMidi), quality)}/${bassName}` : chordName(noteName(rootMidi), quality),
      rootMidi,
      rootName: noteName(rootMidi),
      quality,
      detail: bassName ? `${chordQualityLabel(quality)} over ${bassName}` : chordQualityLabel(quality),
    };
  }
  return null;
}

function normalizeQuality(suffix = "", fallback = "maj") {
  const clean = String(suffix || "").toLowerCase();
  return {
    "": fallback,
    maj: "maj",
    min: "min",
    m: "min",
    "+": "aug",
    aug: "aug",
    dim: "dim",
    sus2: "sus2",
    sus4: "sus4",
    "6": "6",
    m6: "m6",
    dom7: "7",
    "7": "7",
    maj7: "maj7",
    min7: "m7",
    m7: "m7",
    m7b5: "m7b5",
    dim7: "dim7",
    add9: "add9",
    madd9: "madd9",
    "9": "9",
    maj9: "maj9",
    min9: "m9",
    m9: "m9",
  }[clean] || fallback;
}

function qualitySuffix(quality) {
  return {
    maj: "",
    min: "m",
    dim: "dim",
    aug: "aug",
    sus2: "sus2",
    sus4: "sus4",
    "6": "6",
    m6: "m6",
    "7": "7",
    maj7: "maj7",
    m7: "m7",
    m7b5: "m7b5",
    dim7: "dim7",
    add9: "add9",
    madd9: "madd9",
    "9": "9",
    maj9: "maj9",
    m9: "m9",
  }[quality] || "";
}

function degreeChordName(degree, accidental, quality) {
  const accidentalLabel = accidental === -1 ? "b" : accidental === 1 ? "#" : "";
  if (quality === "7") return `${accidentalLabel}${degree}dom7`;
  return `${accidentalLabel}${degree}${qualitySuffix(quality)}`;
}

function degreeName(degree) {
  return ["one", "two", "three", "four", "five", "six", "seven"][degree - 1];
}

function chordQualityLabel(quality) {
  return {
    maj: "major",
    min: "minor",
    dim: "diminished",
    aug: "augmented",
    sus2: "sus2",
    sus4: "sus4",
    "6": "6",
    m6: "minor 6",
    "7": "dominant 7",
    maj7: "major 7",
    m7: "minor 7",
    m7b5: "minor 7 flat 5",
    dim7: "diminished 7",
    add9: "add 9",
    madd9: "minor add 9",
    "9": "dominant 9",
    maj9: "major 9",
    m9: "minor 9",
  }[quality] || quality;
}

function chordIntervals(quality) {
  return QUALITY_INTERVALS[quality] || QUALITY_INTERVALS.maj;
}

function currentItems() {
  if (state.mode === "progression") return parseProgression(state.progression);
  if (state.mode === "chordtones") {
    const rootMidi = 60 + noteIndex(state.chordRoot);
    return [{ token: state.chordRoot, name: chordName(state.chordRoot, state.chordQuality), rootMidi, rootName: state.chordRoot, quality: state.chordQuality, detail: chordQualityLabel(state.chordQuality) }];
  }
  if (state.mode === "notefinder") {
    const rootMidi = 60 + noteIndex(labState.noteTarget);
    return [{ token: labState.noteTarget, name: `Find ${labState.noteTarget}`, rootMidi, rootName: labState.noteTarget, quality: "note", detail: "note finder" }];
  }
  return [{ token: state.key, name: `${state.key} scale`, rootMidi: keyRootMidi(), rootName: state.key, quality: "scale", detail: scaleLabel() }];
}

function chordName(root, quality) {
  return root + qualitySuffix(quality);
}

function chordToneMidis(item) {
  return chordIntervals(item.quality).map(interval => item.rootMidi + interval);
}

function chordToneNames(item) {
  return chordToneMidis(item).map(noteName);
}

function scaleLabel() {
  return {
    majorScale: "major scale",
    naturalMinor: "natural minor",
    harmonicMinor: "harmonic minor",
    minorPentatonic: "minor pentatonic",
    majorPentatonic: "major pentatonic",
    blues: "blues scale",
  }[state.scaleType];
}

function scaleToneMidis() {
  return SCALE_INTERVALS[state.scaleType].map(interval => keyRootMidi() + interval);
}

function currentBlock() {
  return CHORD_BLOCKS[state.progressionBlock] || CHORD_BLOCKS.middle;
}

function selectedStringObjects() {
  return STRINGS.filter(string => state.selectedStrings.includes(string.id));
}

function selectedStringObjectsLowToHigh() {
  return selectedStringObjects().slice().reverse();
}

function getFretPositionsForMidiClasses(classes, modeClass, rootClass, suggestedFrets = {}) {
  const positions = [];
  const hasSuggestedLane = Object.keys(suggestedFrets).length > 0;
  selectedStringObjects().forEach(string => {
    for (let fret = 0; fret <= MAX_FRET; fret += 1) {
      const midi = string.midi + fret;
      const pitch = mod(midi, 12);
      if (classes.includes(pitch)) {
        const root = pitch === rootClass;
        const interval = mod(midi - rootClass, 12);
        const suggested = suggestedFrets[string.id] === fret;
        positions.push({
          stringId: string.id,
          fret,
          midi,
          label: noteName(midi),
          degree: DEGREE_LABELS[interval],
          solfege: SOLFEGE_LABELS[interval],
          root,
          suggested,
          laneGhost: hasSuggestedLane && !suggested,
          modeClass,
        });
      }
    }
  });
  return positions;
}

function chordToneIndexForMidi(midi, item) {
  return chordIntervals(item.quality).findIndex(interval => mod(item.rootMidi + interval, 12) === mod(midi, 12));
}

function coreToneIndexes(item) {
  return chordIntervals(item.quality)
    .map((_, index) => index)
    .slice(0, 3);
}

function stringToneCandidates(string, item) {
  const toneClasses = chordToneMidis(item).map(midi => mod(midi, 12));
  const candidates = [];
  for (let fret = 0; fret <= MAX_FRET; fret += 1) {
    const midi = string.midi + fret;
    if (toneClasses.includes(mod(midi, 12))) {
      candidates.push({ stringId: string.id, fret, midi, toneIndex: chordToneIndexForMidi(midi, item) });
    }
  }
  return candidates;
}

function positionFromMidi(string, fret, midi, modeClass, rootClass, suggested = false) {
  const pitch = mod(midi, 12);
  const interval = mod(midi - rootClass, 12);
  return {
    stringId: string.id,
    fret,
    midi,
    label: noteName(midi),
    degree: DEGREE_LABELS[interval],
    solfege: SOLFEGE_LABELS[interval],
    root: pitch === rootClass,
    suggested,
    laneGhost: false,
    modeClass,
  };
}

function positionsFromGrip(item, grip, modeClass = "chord") {
  const rootClass = mod(item.rootMidi, 12);
  return selectedStringObjects()
    .filter(string => Number.isInteger(grip[string.id]))
    .map(string => positionFromMidi(string, grip[string.id], string.midi + grip[string.id], modeClass, rootClass, true));
}

function suggestedChordGrip(item, previousGrip = null, block = currentBlock()) {
  const strings = selectedStringObjects();
  const candidateLists = strings.map(string => {
    const target = previousGrip?.[string.id] ?? block.center;
    return stringToneCandidates(string, item)
      .map(candidate => ({
        ...candidate,
        localScore:
          Math.abs(candidate.fret - target) * 7 +
          Math.abs(candidate.fret - block.center) * 2 +
          (candidate.fret < block.min || candidate.fret > block.max ? 40 : 0),
      }))
      .sort((a, b) => a.localScore - b.localScore)
      .slice(0, 8);
  });

  if (candidateLists.some(candidates => !candidates.length)) return {};

  const toneCount = chordIntervals(item.quality).length;
  let bestChoice = null;
  let bestScore = Number.POSITIVE_INFINITY;

  function scoreChoice(choice) {
    const covered = new Set(choice.map(candidate => candidate.toneIndex));
    const coreIndexes = coreToneIndexes(item);
    const coveredCoreCount = coreIndexes.filter(index => covered.has(index)).length;
    const wantedCoreCoverage = Math.min(coreIndexes.length, choice.length);
    const wantedCoverage = Math.min(toneCount, choice.length);
    const missingCorePenalty = Math.max(0, wantedCoreCoverage - coveredCoreCount) * 3000;
    const missingTonePenalty = Math.max(0, wantedCoverage - covered.size) * 260;
    const duplicatePenalty = Math.max(0, choice.length - covered.size) * 18;
    const frets = choice.map(candidate => candidate.fret);
    const spanPenalty = (Math.max(...frets) - Math.min(...frets)) * 5;
    const localScore = choice.reduce((sum, candidate) => sum + candidate.localScore, 0);
    return missingCorePenalty + missingTonePenalty + duplicatePenalty + spanPenalty + localScore;
  }

  function walk(index, choice) {
    if (index === candidateLists.length) {
      const score = scoreChoice(choice);
      if (score < bestScore) {
        bestScore = score;
        bestChoice = choice.slice();
      }
      return;
    }
    candidateLists[index].forEach(candidate => {
      choice.push(candidate);
      walk(index + 1, choice);
      choice.pop();
    });
  }

  walk(0, []);

  return (bestChoice || []).reduce((grip, candidate) => {
    grip[candidate.stringId] = candidate.fret;
    return grip;
  }, {});
}

function voiceLeadingGrips(items, block = currentBlock()) {
  let previousGrip = null;
  return items.map(item => {
    const grip = suggestedChordGrip(item, previousGrip, block);
    previousGrip = grip;
    return grip;
  });
}

function gripMidis(grip) {
  return selectedStringObjectsLowToHigh()
    .filter(string => Number.isInteger(grip[string.id]))
    .map(string => string.midi + grip[string.id]);
}

function gripSummary(grip) {
  const summary = selectedStringObjectsLowToHigh()
    .filter(string => Number.isInteger(grip[string.id]))
    .map(string => `${string.label}${grip[string.id]}`);
  return summary.length ? summary.join(" ") : "no lane";
}

function gripMovementDetail(grips, index) {
  const grip = grips[index] || {};
  const previous = grips[index - 1];
  if (!previous) return `Start lane: ${gripSummary(grip)}`;
  const moves = selectedStringObjects()
    .filter(string => Number.isInteger(grip[string.id]) && Number.isInteger(previous[string.id]))
    .map(string => Math.abs(grip[string.id] - previous[string.id]));
  const maxMove = moves.length ? Math.max(...moves) : 0;
  return `Close move: ${maxMove} fret max`;
}

function gripToneLabels(item, grip) {
  const labels = selectedStringObjectsLowToHigh()
    .filter(string => Number.isInteger(grip[string.id]))
    .map(string => toneLabel(string.midi + grip[string.id], item.rootMidi));
  return labels.length ? labels.join(", ") : "none";
}

function fretCenterX(fret, left, fretWidth) {
  return fret === 0 ? left - fretWidth * OPEN_STRING_OFFSET : left + (fret - 0.5) * fretWidth;
}

function fretFingerX(fret, left, fretWidth) {
  return fret === 0 ? left - fretWidth * OPEN_STRING_OFFSET : left + fret * fretWidth - fretWidth * 0.16;
}

function drawFretboard(positions) {
  els.fretboard.innerHTML = "";
  els.fretboard.dataset.mode = state.mode;
  els.fretboard.dataset.labelMode = state.labelMode;
  const left = 11.5;
  const right = 96;
  const top = 11;
  const bottom = 91;
  const fretWidth = (right - left) / MAX_FRET;
  const stringGap = (bottom - top) / (STRINGS.length - 1);

  for (let fret = 0; fret <= MAX_FRET; fret += 1) {
    const wire = document.createElement("span");
    wire.className = `fret-wire${fret === 0 ? " nut" : ""}`;
    wire.style.left = `${left + fret * fretWidth}%`;
    els.fretboard.appendChild(wire);
  }

  [3, 5, 7, 9].forEach(fret => {
    const marker = document.createElement("span");
    marker.className = "marker";
    marker.style.left = `${fretCenterX(fret, left, fretWidth)}%`;
    marker.style.top = "50%";
    els.fretboard.appendChild(marker);
  });
  [37, 63].forEach((topValue, index) => {
    const marker = document.createElement("span");
    marker.className = `marker double-${index ? "b" : "a"}`;
    marker.style.left = `${fretCenterX(12, left, fretWidth)}%`;
    marker.style.top = `${topValue}%`;
    els.fretboard.appendChild(marker);
  });

  STRINGS.forEach((string, index) => {
    const y = top + index * stringGap;
    const line = document.createElement("span");
    line.className = `string-line ${index > 2 ? "wound" : ""}${state.selectedStrings.includes(string.id) ? "" : " off"}`;
    line.style.top = `${y}%`;
    els.fretboard.appendChild(line);

    const label = document.createElement("span");
    label.className = "string-label";
    label.style.top = `${y}%`;
    label.textContent = string.label;
    els.fretboard.appendChild(label);
  });

  for (let fret = 0; fret <= MAX_FRET; fret += 1) {
    const number = document.createElement("span");
    number.className = "fret-number";
    number.style.left = `${fretCenterX(fret, left, fretWidth)}%`;
    number.textContent = fret;
    els.fretboard.appendChild(number);
  }

  positions.forEach((position, index) => {
    const stringIndex = STRINGS.findIndex(string => string.id === position.stringId);
    const dot = document.createElement("button");
    const visibleLabel = state.labelMode === "degrees" ? position.degree : state.labelMode === "solfege" ? position.solfege : position.label;
    dot.type = "button";
    dot.className = `note-dot ${position.root ? "root" : position.modeClass} ${position.suggested ? "suggested" : ""} ${position.laneGhost ? "lane-ghost" : ""}`;
    if (position.fret === 0) dot.classList.add("open-string");
    if (visibleLabel.length > 2) dot.classList.add("compact");
    dot.style.setProperty("--dot-delay", `${Math.min(index * 28, 280)}ms`);
    dot.style.left = `${fretFingerX(position.fret, left, fretWidth)}%`;
    dot.style.top = `${top + stringIndex * stringGap}%`;
    dot.textContent = visibleLabel;
    const fretHint = position.fret === 0 ? "Open string." : "Press just behind the fret wire.";
    dot.title = `${position.label} / ${position.degree} / ${position.solfege} on ${STRINGS[stringIndex].label} string, fret ${position.fret}. ${fretHint}`;
    dot.addEventListener("click", () => playMidiSet([position.midi]));
    els.fretboard.appendChild(dot);
  });
}

function renderProgression() {
  const items = currentItems();
  if (!items.length) return;
  state.stepIndex = Math.min(state.stepIndex, items.length - 1);
  const item = items[state.stepIndex];
  const block = currentBlock();
  const grips = voiceLeadingGrips(items);
  const suggested = grips[state.stepIndex] || {};
  const positions = positionsFromGrip(item, suggested);
  drawFretboard(positions);
  setHeader("Progression trainer", `${state.key}: ${items.map(i => i.name).join(" - ")}`);
  setNow(item.name, `${block.short}: ${gripSummary(suggested)} | ${toneLabelHeading()}: ${gripToneLabels(item, suggested)}`);
  renderQueue(items.map((entry, index) => ({ ...entry, detail: `${gripSummary(grips[index] || {})} | ${gripMovementDetail(grips, index)}` })));
  renderFlowLane(items.map((entry, index) => ({ ...entry, detail: gripMovementDetail(grips, index) })), state.stepIndex, "Voice path");
  renderLegend(["Gold = root", "Green = fretted chord note", "Only this chord block is lit", labelLegend()]);
  renderLesson([`Block: ${block.label}`, `Only: fretted notes`, `Next: slow move to nearest grip`]);
}

function renderPentatonic() {
  const toneMidis = scaleToneMidis();
  const classes = toneMidis.map(midi => mod(midi, 12));
  const rootClass = mod(keyRootMidi(), 12);
  let positions = getFretPositionsForMidiClasses(classes, "scale", rootClass);
  if (state.scaleType === "blues") {
    const blueClass = mod(keyRootMidi() + 6, 12);
    positions = positions.map(position => ({ ...position, modeClass: mod(position.midi, 12) === blueClass && !position.root ? "blue-note" : position.modeClass }));
  }
  if (state.box !== "all") {
    const [start, end] = BOX_WINDOWS[Number(state.box)];
    positions = positions.filter(position => position.fret >= start && position.fret <= end + 2);
  }
  drawFretboard(positions);
  setHeader("Pentatonic trainer", `${state.key} ${scaleLabel()} ${state.box === "all" ? "all boxes" : `box ${Number(state.box) + 1}`}`);
  setNow(state.key, `${toneLabelHeading()}: ${toneLabels(toneMidis, keyRootMidi()).join(", ")}`);
  renderQueue(toneMidis.map((midi, index) => ({
    name: toneLabel(midi, keyRootMidi()),
    detail: state.labelMode === "notes" ? `Scale tone ${index + 1}` : `${noteName(midi)} - scale tone ${index + 1}`,
  })));
  renderFlowLane(toneMidis.map((midi, index) => ({
    name: toneLabel(midi, keyRootMidi()),
    detail: `Tone ${index + 1}`,
  })), 0, "Tone path");
  renderLegend(["Gold = root", "Blue = scale note", "Purple = blue note", labelLegend()]);
  renderLesson([`Box: ${state.box === "all" ? "all" : Number(state.box) + 1}`, `Labels: ${labelModeName()}`, `Next: make one small lick`]);
}

function renderChordTones() {
  const item = currentItems()[0];
  const toneMidis = chordToneMidis(item);
  const toneClasses = chordToneMidis(item).map(midi => mod(midi, 12));
  const rootClass = mod(item.rootMidi, 12);
  const suggested = suggestedChordGrip(item);
  const positions = getFretPositionsForMidiClasses(toneClasses, "chord", rootClass, suggested);
  drawFretboard(positions);
  setHeader("Chord tone trainer", `${item.name}: find every root, 3rd, and 5th`);
  setNow(item.name, `${toneLabelHeading()}: ${toneLabels(toneMidis, item.rootMidi).join(", ")}`);
  renderQueue(toneMidis.map((midi, index) => ({
    name: toneLabel(midi, item.rootMidi),
    detail: state.labelMode === "notes" ? `Chord tone ${index + 1}` : `${noteName(midi)} - chord tone ${index + 1}`,
  })));
  renderFlowLane(toneMidis.map(midi => ({
    count: degreeLabel(midi, item.rootMidi),
    name: chordToneRole(midi, item.rootMidi),
    detail: chordToneMapDetail(midi, item.rootMidi),
  })), null, "1-3-5 map", "tone-map");
  renderLegend(["Gold = root", "Green = chord tone", "Ring = suggested grip", labelLegend()]);
  renderLesson([`Chord: ${item.name}`, `Labels: ${labelModeName()}`, `Next: build one small grip`]);
}

function renderNoteFinder() {
  const target = labState.noteTarget;
  const targetClass = noteIndex(target);
  const positions = getFretPositionsForMidiClasses([targetClass], "scale", targetClass)
    .map(position => ({ ...position, label: target, degree: target, solfege: target }));
  drawFretboard(positions);
  setHeader("Note finder", `Find every ${target}`);
  setNow(target, `Target note: click each ${target} on the active strings.`);
  renderQueue(positions.slice(0, 8).map(position => {
    const string = STRINGS.find(item => item.id === position.stringId);
    return {
      name: `${string?.label || position.stringId}${position.fret}`,
      detail: position.fret === 0 ? "open string" : `fret ${position.fret}`,
    };
  }));
  renderFlowLane([
    { count: "?", name: `Find ${target}`, detail: "Look before you click" },
    { count: "1", name: "Say it", detail: "String and fret" },
    { count: "2", name: "Play it", detail: "Hear the note" },
  ], null, "Note finder");
  renderLegend(["Gold = target note", "Open notes sit before the nut", "Change strings to focus"]);
  renderLesson([`Target: ${target}`, "Action: say string and fret", "Next: new note"]);
}

function setHeader(eyebrow, title) {
  els.modeEyebrow.textContent = eyebrow;
  els.mainTitle.textContent = title;
}

function setNow(name, detail) {
  els.nowName.textContent = name;
  els.nowDetail.textContent = detail;
}

function renderQueue(items) {
  els.practiceQueue.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    if (state.mode === "progression" && index === state.stepIndex) li.classList.add("active");
    li.innerHTML = `<span>${index + 1}</span><div><strong>${item.name}</strong><small>${item.detail || ""}</small></div>`;
    li.addEventListener("click", () => {
      if (state.mode === "progression") {
        state.stepIndex = index;
        render();
      }
    });
    els.practiceQueue.appendChild(li);
  });
}

function renderLegend(items) {
  els.legend.innerHTML = items.map(item => `<span>${item}</span>`).join("");
}

function renderLesson(items) {
  els.lessonStrip.innerHTML = "";
  items.forEach(item => {
    const separator = item.indexOf(":");
    const label = separator >= 0 ? item.slice(0, separator) : "Next";
    const value = separator >= 0 ? item.slice(separator + 1).trim() : item;
    const chip = document.createElement("span");
    const strong = document.createElement("strong");
    strong.textContent = `${label}:`;
    chip.className = "lesson-chip";
    chip.appendChild(strong);
    chip.append(` ${value}`);
    els.lessonStrip.appendChild(chip);
  });
}

function renderFlowLane(items, activeIndex, label, variant = "") {
  if (!els.flowLane) return;
  els.flowLane.className = `flow-lane ${variant}`.trim();
  els.flowLane.innerHTML = "";
  const laneLabel = document.createElement("span");
  laneLabel.className = "flow-label";
  laneLabel.textContent = label;
  els.flowLane.appendChild(laneLabel);
  items.forEach((item, index) => {
    const node = document.createElement(state.mode === "progression" ? "button" : "span");
    node.className = "flow-node";
    if (variant === "tone-map") {
      const toneClass = degreeClassName(item.count);
      if (toneClass) node.classList.add(toneClass);
    }
    if (Number.isInteger(activeIndex) && index === activeIndex) node.classList.add("active");
    if (state.mode === "progression" && index < activeIndex) node.classList.add("complete");
    if (node.tagName === "BUTTON") {
      node.type = "button";
      node.addEventListener("click", () => {
        clearTransitionTimers();
        state.stepIndex = index;
        render();
      });
    }

    const count = document.createElement("span");
    count.className = "flow-count";
    count.textContent = item.count || `${index + 1}`;
    const name = document.createElement("strong");
    name.textContent = item.name;
    const detail = document.createElement("small");
    detail.textContent = item.detail || "";
    node.append(count, name, detail);
    els.flowLane.appendChild(node);
  });
}

function applyAccessState() {
  const unlocked = hasPremiumAccess();
  document.body.classList.toggle("has-access", unlocked);
  document.body.classList.toggle("is-demo", !unlocked);
  if (els.accessStatus) els.accessStatus.textContent = unlocked ? "Full access" : "Demo mode";
  if (els.accessCode) {
    els.accessCode.disabled = unlocked;
    els.accessCode.placeholder = unlocked ? "Full trainer unlocked" : "Enter access code";
  }
  els.modeTabs.forEach(tab => {
    const locked = !unlocked && tab.dataset.mode !== "progression";
    tab.disabled = locked;
    tab.title = locked ? "Founding access unlocks this mode." : "";
  });
  els.keySelect.disabled = !unlocked;
  els.customProgression.disabled = !unlocked;
  els.applyProgression.disabled = !unlocked;
  els.scaleType.disabled = !unlocked;
  els.boxSelect.disabled = !unlocked;
  els.playScale.disabled = !unlocked;
  els.chordRoot.disabled = !unlocked;
  els.chordQuality.disabled = !unlocked;
  els.playChord.disabled = !unlocked;
  els.blockButtons.forEach(button => {
    const locked = !unlocked && button.dataset.progressionBlock !== DEMO_SETTINGS.progressionBlock;
    button.disabled = locked;
    button.title = locked ? "Founding access unlocks low and high chord blocks." : "";
  });
  els.stringSet.querySelectorAll("input").forEach(input => {
    input.disabled = !unlocked;
    input.closest("label")?.classList.toggle("locked-control", !unlocked);
  });
  [...els.progressionPresets.children].forEach(button => {
    const locked = !unlocked && button.dataset.preset !== DEMO_SETTINGS.presetId;
    button.disabled = locked;
    button.title = locked ? "Founding access unlocks more progressions and custom songs." : "";
  });
  document.querySelectorAll("#practice-lab button, #practice-lab input, #practice-lab select").forEach(control => {
    control.disabled = !unlocked;
  });
  els.checks.forEach(check => {
    check.disabled = !unlocked;
    if (!unlocked) check.checked = false;
  });
}

function render() {
  enforceDemoState();
  applyAccessState();
  document.body.dataset.mode = state.mode;
  if (state.mode === "progression") renderProgression();
  if (state.mode === "pentatonic") renderPentatonic();
  if (state.mode === "chordtones") renderChordTones();
  if (state.mode === "notefinder") renderNoteFinder();
  saveState();
}

function playCurrent() {
  if (state.mode === "notefinder") {
    playMidiSet([60 + noteIndex(labState.noteTarget)]);
    return;
  }
  if (state.mode === "pentatonic") {
    playScaleRun();
    return;
  }
  if (state.mode === "progression") {
    const items = currentItems();
    const grips = voiceLeadingGrips(items);
    const grip = grips[state.stepIndex] || {};
    const midis = gripMidis(grip);
    playMidiSet(midis.length ? midis : chordToneMidis(items[state.stepIndex] || items[0]), 0.12);
    return;
  }
  const item = currentItems()[state.stepIndex] || currentItems()[0];
  playMidiSet(chordToneMidis(item), 0.055);
}

function playProgression() {
  clearTransitionTimers();
  const items = currentItems();
  const grips = voiceLeadingGrips(items);
  ensureAudio();
  document.body.classList.add("is-playing");
  const beat = 60 / Number(els.tempoRange.value);
  const chordSpan = Math.max(0.95, beat * 1.35);
  const start = audioContext.currentTime + 0.05;
  items.forEach((item, index) => {
    transitionTimers.push(setTimeout(() => {
      state.stepIndex = index;
      render();
    }, index * chordSpan * 1000));
    const voiceMidis = gripMidis(grips[index] || {});
    const midis = voiceMidis.length ? voiceMidis : chordToneMidis(item);
    const noteDelay = Math.min(0.18, chordSpan / Math.max(midis.length + 1, 2));
    midis.forEach((midi, toneIndex) => {
      playMidi(midi, start + index * chordSpan + toneIndex * noteDelay, noteDelay * 2.2);
    });
  });
  transitionTimers.push(setTimeout(() => {
    document.body.classList.remove("is-playing");
  }, items.length * chordSpan * 1000 + 450));
}

function playScaleRun() {
  ensureAudio();
  const notes = scaleToneMidis();
  const beat = 60 / Number(els.tempoRange.value);
  const start = audioContext.currentTime + 0.05;
  [...notes, ...notes.slice().reverse().slice(1)].forEach((midi, index) => playMidi(midi, start + index * beat * 0.55, beat * 0.5));
}

function updateChecks() {
  const score = [...els.checks].filter(check => check.checked).length;
  els.sessionScore.textContent = `${score} / ${els.checks.length}`;
  localStorage.setItem("britGuitarTrainerChecks", JSON.stringify({
    date: todayKey(),
    values: [...els.checks].map(check => check.checked),
  }));
  updatePracticeProgress(score);
}

function todayKey(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function loadPracticeProgress() {
  try {
    const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY));
    if (saved && typeof saved === "object") return { sessions: 0, days: {}, ...saved };
  } catch {
    // Keep an empty progress record.
  }
  return { sessions: 0, days: {} };
}

function savePracticeProgress(progress) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

function updatePracticeProgress(score) {
  const progress = loadPracticeProgress();
  const date = todayKey();
  const previous = progress.days[date] || {};
  const complete = score === els.checks.length && els.checks.length > 0;
  if (complete && !previous.completedEver) progress.sessions = (progress.sessions || 0) + 1;
  progress.days[date] = {
    ...previous,
    score,
    completed: complete,
    completedEver: previous.completedEver || complete,
    updatedAt: Date.now(),
  };
  savePracticeProgress(progress);
  renderPracticeProgress(progress);
}

function practiceStreak(progress) {
  let streak = 0;
  for (let offset = 0; offset > -90; offset -= 1) {
    const day = progress.days[todayKey(offset)];
    if (!day?.completedEver) break;
    streak += 1;
  }
  return streak;
}

function renderPracticeProgress(progress = loadPracticeProgress()) {
  if (!els.progressChart) return;
  const maxScore = Math.max(els.checks.length, 1);
  const today = progress.days[todayKey()] || { score: 0 };
  const score = Math.min(today.score || 0, maxScore);
  const remaining = Math.max(maxScore - score, 0);
  els.progressToday.textContent = `Today: ${score} / ${maxScore}`;
  els.progressHint.textContent = remaining
    ? `${remaining} daily step${remaining === 1 ? "" : "s"} left. Small wins count.`
    : "Session complete. Come back tomorrow and keep the streak alive.";
  const streak = practiceStreak(progress);
  els.progressStreak.textContent = `${streak} day${streak === 1 ? "" : "s"}`;
  els.progressSessions.textContent = String(progress.sessions || 0);
  els.progressChart.innerHTML = "";
  for (let offset = -6; offset <= 0; offset += 1) {
    const key = todayKey(offset);
    const date = new Date(`${key}T00:00:00`);
    const item = progress.days[key] || { score: 0 };
    const value = Math.min(item.score || 0, maxScore);
    const bar = document.createElement("div");
    bar.className = `progress-day${item.completedEver ? " complete" : ""}`;
    bar.innerHTML = `
      <div class="progress-bar-track">
        <div class="progress-bar-fill" style="height: ${Math.max(8, (value / maxScore) * 100)}%"></div>
      </div>
      <span>${date.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 3)}</span>
    `;
    els.progressChart.appendChild(bar);
  }
}

function saveState() {
  localStorage.setItem("britGuitarTrainerState", JSON.stringify(state));
}

function renderLab() {
  if (!els.noteFinderTarget || !els.chordTriviaChoices) return;
  els.noteFinderTarget.textContent = `Find ${labState.noteTarget}`;
  els.noteFinderHint.textContent = `Find every ${labState.noteTarget} on the active strings. Start slow and say the string name out loud.`;
  renderChordTrivia();
  renderAdvancedProgressions();
  renderContactLink();
}

function renderChordTrivia() {
  const item = CHORD_TRIVIA[labState.chordTriviaIndex % CHORD_TRIVIA.length];
  els.chordTriviaQuestion.textContent = item.tones.join(" - ");
  els.chordTriviaFeedback.textContent = "Pick the chord name that matches the notes.";
  els.chordTriviaChoices.innerHTML = "";
  item.choices.forEach(choice => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = choice;
    button.addEventListener("click", () => {
      const correct = choice === item.answer;
      button.classList.add(correct ? "correct" : "incorrect");
      els.chordTriviaFeedback.textContent = correct ? "Correct. That note stack names the chord." : `Close. The answer is ${item.answer}.`;
    });
    els.chordTriviaChoices.appendChild(button);
  });
}

function renderAdvancedProgressions() {
  if (!els.advancedProgressions) return;
  els.advancedProgressions.innerHTML = "";
  PROGRESSION_PRESETS.filter(preset => preset.lab).forEach(preset => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = preset.label;
    button.addEventListener("click", () => {
      setMode("progression");
      state.presetId = preset.id;
      state.progression = preset.value;
      els.customProgression.value = preset.value;
      els.dailyCopy.textContent = preset.daily;
      [...els.progressionPresets.children].forEach(child => child.classList.remove("active"));
      render();
      document.getElementById("trainer")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    els.advancedProgressions.appendChild(button);
  });
}

function renderContactLink() {
  if (!els.contactEmailLink || !els.contactEmailStatus) return;
  if (!CONFIG.contactEmail) {
    els.contactEmailLink.removeAttribute("href");
    els.contactEmailLink.setAttribute("aria-disabled", "true");
    els.contactEmailStatus.textContent = "Send trainer questions and feature wishes to the FretFlow inbox.";
    return;
  }
  const subject = encodeURIComponent("FretFlow Trainer question or feature idea");
  const body = encodeURIComponent("Hi, I have a question or feature idea for FretFlow Trainer:\n\n");
  els.contactEmailLink.href = `mailto:${CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  els.contactEmailLink.removeAttribute("aria-disabled");
  els.contactEmailStatus.textContent = `Send trainer questions and feature wishes to ${CONFIG.contactEmail}.`;
}

function nextNoteTarget() {
  const currentIndex = NOTE_FINDER_TARGETS.indexOf(labState.noteTarget);
  labState.noteTarget = NOTE_FINDER_TARGETS[(currentIndex + 1) % NOTE_FINDER_TARGETS.length];
  renderLab();
  if (state.mode === "notefinder") render();
}

function syncModeControls() {
  state.mode = normalizeMode(state.mode, true);
  els.modeTabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.mode === state.mode);
  });
  els.modePanels.forEach(panel => {
    panel.classList.toggle("hidden", panel.dataset.panel !== state.mode);
  });
}

function setMode(mode) {
  clearTransitionTimers();
  state.mode = normalizeMode(mode, true);
  state.stepIndex = 0;
  syncModeControls();
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("britGuitarTrainerState"));
    if (saved) state = { ...state, ...saved };
    state.mode = normalizeMode(state.mode);
    if (!LABEL_MODE_NAMES[state.labelMode]) state.labelMode = "notes";
    if (!SCALE_INTERVALS[state.scaleType]) state.scaleType = "minorPentatonic";
    if (!CHORD_BLOCKS[state.progressionBlock]) state.progressionBlock = "middle";
    state.progression = state.progression.replace(/\b([b#]?[1-7])7\b/g, "$1dom7");
  } catch {
    state = { ...state };
  }
  enforceDemoState();
}

function hydrateControls() {
  KEYS.forEach(key => {
    els.keySelect.add(new Option(key, key));
  });
  NOTES.forEach(note => {
    els.chordRoot.add(new Option(note, note));
  });
  STRINGS.forEach(string => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${string.id}"> ${string.label}`;
    const input = label.querySelector("input");
    input.checked = state.selectedStrings.includes(string.id);
    input.addEventListener("change", () => {
      if (!guardPremium("any string combination")) {
        input.checked = DEMO_SETTINGS.selectedStrings.includes(input.value);
        return;
      }
      clearTransitionTimers();
      state.selectedStrings = [...els.stringSet.querySelectorAll("input:checked")].map(item => item.value);
      if (!state.selectedStrings.length) {
        state.selectedStrings = ["G", "B", "highE"];
        [...els.stringSet.querySelectorAll("input")].forEach(item => {
          item.checked = state.selectedStrings.includes(item.value);
        });
      }
      render();
    });
    els.stringSet.appendChild(label);
  });
  PROGRESSION_PRESETS.filter(preset => !preset.lab).forEach(preset => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = preset.label;
    button.dataset.preset = preset.id;
    if (preset.id === state.presetId) button.classList.add("active");
    button.addEventListener("click", () => {
      if (!hasPremiumAccess() && preset.id !== DEMO_SETTINGS.presetId) {
        guardPremium("more progressions and custom songs");
        return;
      }
      setMode("progression");
      state.presetId = preset.id;
      state.progression = preset.value;
      els.customProgression.value = preset.value;
      els.dailyCopy.textContent = preset.daily;
      [...els.progressionPresets.children].forEach(child => child.classList.toggle("active", child.dataset.preset === preset.id));
      render();
    });
    els.progressionPresets.appendChild(button);
  });
  els.keySelect.value = state.key;
  els.soundSelect.value = state.sound;
  els.customProgression.value = state.progression;
  els.scaleType.value = state.scaleType;
  els.boxSelect.value = state.box;
  els.chordRoot.value = state.chordRoot;
  els.chordQuality.value = state.chordQuality;
  els.labelButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.labelMode === state.labelMode);
  });
  els.blockButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.progressionBlock === state.progressionBlock);
  });
  syncModeControls();
  els.tempoValue.textContent = `${els.tempoRange.value} bpm`;
  try {
    const checks = JSON.parse(localStorage.getItem("britGuitarTrainerChecks"));
    if (hasPremiumAccess() && checks?.date === todayKey() && Array.isArray(checks.values)) {
      checks.values.forEach((value, index) => { if (els.checks[index]) els.checks[index].checked = value; });
    }
  } catch {
    // Leave defaults.
  }
  updateChecks();
  renderLab();
}

function bindEvents() {
  els.modeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      if (!hasPremiumAccess() && tab.dataset.mode !== "progression") {
        guardPremium("advanced practice modes");
        return;
      }
      setMode(tab.dataset.mode);
      render();
    });
  });
  els.keySelect.addEventListener("change", () => {
    if (!guardPremium("all keys")) return;
    clearTransitionTimers();
    state.key = els.keySelect.value;
    render();
  });
  els.soundSelect.addEventListener("change", () => { state.sound = els.soundSelect.value; saveState(); });
  els.tempoRange.addEventListener("input", () => { els.tempoValue.textContent = `${els.tempoRange.value} bpm`; });
  els.labelButtons.forEach(button => {
    button.addEventListener("click", () => {
      clearTransitionTimers();
      state.labelMode = button.dataset.labelMode;
      els.labelButtons.forEach(item => item.classList.toggle("active", item === button));
      render();
    });
  });
  els.blockButtons.forEach(button => {
    button.addEventListener("click", () => {
      if (!hasPremiumAccess() && button.dataset.progressionBlock !== DEMO_SETTINGS.progressionBlock) {
        guardPremium("low and high chord blocks");
        return;
      }
      clearTransitionTimers();
      state.progressionBlock = button.dataset.progressionBlock;
      state.stepIndex = 0;
      els.blockButtons.forEach(item => item.classList.toggle("active", item === button));
      render();
    });
  });
  els.applyProgression.addEventListener("click", () => {
    if (!guardPremium("custom progressions")) return;
    setMode("progression");
    state.progression = els.customProgression.value || "1 6m 4 5";
    state.stepIndex = 0;
    render();
  });
  els.scaleType.addEventListener("change", () => { if (!guardPremium("full scale practice")) return; clearTransitionTimers(); state.scaleType = els.scaleType.value; render(); });
  els.boxSelect.addEventListener("change", () => { if (!guardPremium("all scale boxes")) return; clearTransitionTimers(); state.box = els.boxSelect.value; render(); });
  els.chordRoot.addEventListener("change", () => { if (!guardPremium("any chord root")) return; clearTransitionTimers(); state.chordRoot = els.chordRoot.value; render(); });
  els.chordQuality.addEventListener("change", () => { if (!guardPremium("advanced chord types")) return; clearTransitionTimers(); state.chordQuality = els.chordQuality.value; render(); });
  els.previousButton.addEventListener("click", () => {
    clearTransitionTimers();
    const items = currentItems();
    state.stepIndex = mod(state.stepIndex - 1, Math.max(items.length, 1));
    render();
  });
  els.nextButton.addEventListener("click", () => {
    clearTransitionTimers();
    const items = currentItems();
    state.stepIndex = mod(state.stepIndex + 1, Math.max(items.length, 1));
    render();
  });
  els.playButton.addEventListener("click", () => {
    if (state.mode === "progression") playProgression();
    else playCurrent();
  });
  els.playScale.addEventListener("click", () => { if (guardPremium("scale playback")) playScaleRun(); });
  els.playChord.addEventListener("click", () => { if (guardPremium("chord tone playback")) playCurrent(); });
  els.newNoteTarget?.addEventListener("click", () => {
    if (!guardPremium("note finder training")) return;
    nextNoteTarget();
  });
  els.showNoteHint?.addEventListener("click", () => {
    if (!guardPremium("note finder training")) return;
    setMode("notefinder");
    render();
  });
  els.nextChordTrivia?.addEventListener("click", () => {
    if (!guardPremium("chord naming games")) return;
    labState.chordTriviaIndex = (labState.chordTriviaIndex + 1) % CHORD_TRIVIA.length;
    renderLab();
  });
  els.checks.forEach(check => check.addEventListener("change", () => {
    if (!hasPremiumAccess()) {
      check.checked = false;
      guardPremium("progress tracking");
      return;
    }
    updateChecks();
  }));
  els.accessForm?.addEventListener("submit", async event => {
    event.preventDefault();
    const ok = await unlockAccess(els.accessCode.value);
    if (!ok) {
      els.accessCode.select();
      return;
    }
    applyAccessState();
    render();
  });
  els.buyAccessButton?.addEventListener("click", () => {
    if (CONFIG.paymentUrl) window.location.href = CONFIG.paymentUrl;
  });
  els.buyButton.addEventListener("click", () => {
    if (CONFIG.paymentUrl) {
      window.location.href = CONFIG.paymentUrl;
      return;
    }
    els.paymentDialog.showModal();
  });
}

async function init() {
  await loadAccess();
  loadState();
  hydrateControls();
  bindEvents();
  render();
}

init();
