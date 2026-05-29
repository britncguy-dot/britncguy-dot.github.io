const CONFIG = {
  paymentUrl: "",
  priceLabel: "$9",
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
  "7": [0, 4, 7, 10],
  maj7: [0, 4, 7, 11],
  m7: [0, 3, 7, 10],
  sus4: [0, 5, 7],
};
const SCALE_INTERVALS = {
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
  { id: "custom", label: "Custom", value: "1 6m 4 5", daily: "Type your own numbers or chord names." },
];

const els = {
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
  fretboard: document.getElementById("fretboard"),
  legend: document.getElementById("legend"),
  lessonStrip: document.getElementById("lessonStrip"),
  nowName: document.getElementById("nowName"),
  nowDetail: document.getElementById("nowDetail"),
  practiceQueue: document.getElementById("practiceQueue"),
  dailyCopy: document.getElementById("dailyCopy"),
  sessionScore: document.getElementById("sessionScore"),
  checks: document.querySelectorAll("[data-check]"),
  buyButton: document.getElementById("buyButton"),
  paymentStatus: document.getElementById("paymentStatus"),
  paymentDialog: document.getElementById("paymentDialog"),
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
  const degreeMatch = clean.match(/^([b#]?)([1-7])(m|maj|min|dim|7|maj7|m7)?$/i);
  if (degreeMatch) {
    const accidental = degreeMatch[1] === "b" ? -1 : degreeMatch[1] === "#" ? 1 : 0;
    const degree = Number(degreeMatch[2]);
    const suffix = (degreeMatch[3] || "").toLowerCase();
    const naturalQuality = [1, 4, 5].includes(degree) ? "maj" : degree === 7 ? "dim" : "min";
    const quality = suffix === "m" || suffix === "min" ? "min" : suffix === "7" ? "7" : suffix === "maj7" ? "maj7" : suffix === "m7" ? "m7" : naturalQuality;
    const root = keyRootMidi() + DEGREE_STEPS[degree - 1] + accidental;
    return {
      token: clean,
      name: `${degree}${quality === "min" ? "m" : quality === "dim" ? "dim" : quality === "7" ? "7" : ""}`,
      rootMidi: root,
      rootName: noteName(root),
      quality,
      detail: `${degreeName(degree)} in ${state.key}`,
    };
  }
  const chordMatch = clean.match(/^([A-G](?:#|b)?)(m7|maj7|m|7|sus4)?$/i);
  if (chordMatch) {
    const rootName = chordMatch[1].replace("b", "b");
    const suffix = chordMatch[2] || "";
    const quality = suffix === "m" ? "min" : suffix === "m7" ? "m7" : suffix === "maj7" ? "maj7" : suffix === "7" ? "7" : suffix === "sus4" ? "sus4" : "maj";
    const rootMidi = 60 + noteIndex(rootName);
    return {
      token: clean,
      name: clean,
      rootMidi,
      rootName: noteName(rootMidi),
      quality,
      detail: chordQualityLabel(quality),
    };
  }
  return null;
}

function degreeName(degree) {
  return ["one", "two", "three", "four", "five", "six", "seven"][degree - 1];
}

function chordQualityLabel(quality) {
  return {
    maj: "major",
    min: "minor",
    "7": "dominant 7",
    maj7: "major 7",
    m7: "minor 7",
    sus4: "sus4",
    dim: "diminished",
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
  return [{ token: state.key, name: `${state.key} scale`, rootMidi: keyRootMidi(), rootName: state.key, quality: "scale", detail: scaleLabel() }];
}

function chordName(root, quality) {
  return root + ({ maj: "", min: "m", "7": "7", maj7: "maj7", m7: "m7", sus4: "sus4" }[quality] || "");
}

function chordToneMidis(item) {
  return chordIntervals(item.quality).map(interval => item.rootMidi + interval);
}

function chordToneNames(item) {
  return chordToneMidis(item).map(noteName);
}

function scaleLabel() {
  return {
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

function stringToneCandidates(string, toneClasses) {
  const candidates = [];
  for (let fret = 0; fret <= MAX_FRET; fret += 1) {
    const midi = string.midi + fret;
    if (toneClasses.includes(mod(midi, 12))) {
      candidates.push({ stringId: string.id, fret, midi });
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
  const toneClasses = chordToneMidis(item).map(midi => mod(midi, 12));
  const grip = {};
  selectedStringObjects().forEach(string => {
    const target = previousGrip?.[string.id] ?? block.center;
    const candidates = stringToneCandidates(string, toneClasses);
    const best = candidates
      .map(candidate => ({
        ...candidate,
        score:
          Math.abs(candidate.fret - target) * 7 +
          Math.abs(candidate.fret - block.center) * 2 +
          (candidate.fret < block.min || candidate.fret > block.max ? 40 : 0),
      }))
      .sort((a, b) => a.score - b.score)[0];
    if (best) grip[string.id] = best.fret;
  });
  return grip;
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
  const summary = selectedStringObjects()
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
  const labels = selectedStringObjects()
    .filter(string => Number.isInteger(grip[string.id]))
    .map(string => toneLabel(string.midi + grip[string.id], item.rootMidi));
  return labels.length ? labels.join(", ") : "none";
}

function fretCenterX(fret, left, fretWidth) {
  return fret === 0 ? left + fretWidth * 0.24 : left + (fret - 0.5) * fretWidth;
}

function fretFingerX(fret, left, fretWidth) {
  return fret === 0 ? left + fretWidth * 0.24 : left + fret * fretWidth - fretWidth * 0.16;
}

function drawFretboard(positions) {
  els.fretboard.innerHTML = "";
  const left = 6;
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

  positions.forEach(position => {
    const stringIndex = STRINGS.findIndex(string => string.id === position.stringId);
    const dot = document.createElement("button");
    const visibleLabel = state.labelMode === "degrees" ? position.degree : state.labelMode === "solfege" ? position.solfege : position.label;
    dot.type = "button";
    dot.className = `note-dot ${position.root ? "root" : position.modeClass} ${position.suggested ? "suggested" : ""} ${position.laneGhost ? "lane-ghost" : ""}`;
    if (visibleLabel.length > 2) dot.classList.add("compact");
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
  renderLegend(["Gold = root", "Blue = scale note", "Purple = blue note", labelLegend()]);
  renderLesson([`Box: ${state.box === "all" ? "all" : Number(state.box) + 1}`, `Labels: ${labelModeName()}`, `Next: make one small lick`]);
}

function renderChordTones() {
  const item = currentItems()[0];
  const toneClasses = chordToneMidis(item).map(midi => mod(midi, 12));
  const rootClass = mod(item.rootMidi, 12);
  const suggested = suggestedChordGrip(item);
  const positions = getFretPositionsForMidiClasses(toneClasses, "chord", rootClass, suggested);
  drawFretboard(positions);
  setHeader("Chord tone trainer", `${item.name}: find every root, 3rd, and 5th`);
  setNow(item.name, `${toneLabelHeading()}: ${toneLabels(chordToneMidis(item), item.rootMidi).join(", ")}`);
  renderQueue(chordToneMidis(item).map((midi, index) => ({
    name: toneLabel(midi, item.rootMidi),
    detail: state.labelMode === "notes" ? `Chord tone ${index + 1}` : `${noteName(midi)} - chord tone ${index + 1}`,
  })));
  renderLegend(["Gold = root", "Green = chord tone", "Ring = suggested grip", labelLegend()]);
  renderLesson([`Chord: ${item.name}`, `Labels: ${labelModeName()}`, `Next: build one small grip`]);
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

function render() {
  if (state.mode === "progression") renderProgression();
  if (state.mode === "pentatonic") renderPentatonic();
  if (state.mode === "chordtones") renderChordTones();
  saveState();
}

function playCurrent() {
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
  localStorage.setItem("britGuitarTrainerChecks", JSON.stringify([...els.checks].map(check => check.checked)));
}

function saveState() {
  localStorage.setItem("britGuitarTrainerState", JSON.stringify(state));
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("britGuitarTrainerState"));
    if (saved) state = { ...state, ...saved };
    if (!LABEL_MODE_NAMES[state.labelMode]) state.labelMode = "notes";
    if (!CHORD_BLOCKS[state.progressionBlock]) state.progressionBlock = "middle";
  } catch {
    state = { ...state };
  }
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
  PROGRESSION_PRESETS.forEach(preset => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = preset.label;
    button.dataset.preset = preset.id;
    if (preset.id === state.presetId) button.classList.add("active");
    button.addEventListener("click", () => {
      clearTransitionTimers();
      state.presetId = preset.id;
      state.progression = preset.value;
      state.stepIndex = 0;
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
  els.tempoValue.textContent = `${els.tempoRange.value} bpm`;
  try {
    const checks = JSON.parse(localStorage.getItem("britGuitarTrainerChecks"));
    if (Array.isArray(checks)) checks.forEach((value, index) => { if (els.checks[index]) els.checks[index].checked = value; });
  } catch {
    // Leave defaults.
  }
  updateChecks();
}

function bindEvents() {
  els.modeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      clearTransitionTimers();
      state.mode = tab.dataset.mode;
      state.stepIndex = 0;
      els.modeTabs.forEach(item => item.classList.toggle("active", item === tab));
      els.modePanels.forEach(panel => panel.classList.toggle("hidden", panel.dataset.panel !== state.mode));
      render();
    });
  });
  els.keySelect.addEventListener("change", () => { clearTransitionTimers(); state.key = els.keySelect.value; render(); });
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
      clearTransitionTimers();
      state.progressionBlock = button.dataset.progressionBlock;
      state.stepIndex = 0;
      els.blockButtons.forEach(item => item.classList.toggle("active", item === button));
      render();
    });
  });
  els.applyProgression.addEventListener("click", () => {
    clearTransitionTimers();
    state.progression = els.customProgression.value || "1 6m 4 5";
    state.stepIndex = 0;
    render();
  });
  els.scaleType.addEventListener("change", () => { clearTransitionTimers(); state.scaleType = els.scaleType.value; render(); });
  els.boxSelect.addEventListener("change", () => { clearTransitionTimers(); state.box = els.boxSelect.value; render(); });
  els.chordRoot.addEventListener("change", () => { clearTransitionTimers(); state.chordRoot = els.chordRoot.value; render(); });
  els.chordQuality.addEventListener("change", () => { clearTransitionTimers(); state.chordQuality = els.chordQuality.value; render(); });
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
  els.playScale.addEventListener("click", playScaleRun);
  els.playChord.addEventListener("click", playCurrent);
  els.checks.forEach(check => check.addEventListener("change", updateChecks));
  els.buyButton.addEventListener("click", () => {
    if (CONFIG.paymentUrl) {
      window.location.href = CONFIG.paymentUrl;
      return;
    }
    els.paymentDialog.showModal();
  });
}

loadState();
hydrateControls();
bindEvents();
render();
