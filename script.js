const meterInputs = [
  { id: "trend", valueId: "trendValue", positive: true },
  { id: "levels", valueId: "levelsValue", positive: true },
  { id: "volatility", valueId: "volatilityValue", positive: false },
  { id: "macro", valueId: "macroValue", positive: false },
  { id: "fomo", valueId: "fomoValue", positive: false },
];

const scoreElement = document.getElementById("meterScore");
const stateElement = document.getElementById("meterState");
const guidanceElement = document.getElementById("meterGuidance");
const fillElement = document.getElementById("meterFill");
const needleElement = document.getElementById("meterNeedle");

const memberMeterInputs = [
  { id: "marketStructure", valueId: "marketStructureValue", positive: true },
  { id: "levelClarity", valueId: "levelClarityValue", positive: true },
  { id: "setupQuality", valueId: "setupQualityValue", positive: true },
  { id: "riskDefined", valueId: "riskDefinedValue", positive: true },
  { id: "chasePressure", valueId: "chasePressureValue", positive: false },
  { id: "newsPressure", valueId: "newsPressureValue", positive: false },
];
const indexPulseSymbols = ["spy", "qqq", "dia", "iwm"];

const memberScoreElement = document.getElementById("memberScore");
const memberStateElement = document.getElementById("memberState");
const memberGuidanceElement = document.getElementById("memberGuidance");
const memberNeedleElement = document.getElementById("memberNeedle");
const memberFillElement = document.getElementById("memberFill");
const memberCodeElement = document.getElementById("memberCode");
const structureScoreElement = document.getElementById("structureScore");
const setupReadScoreElement = document.getElementById("setupReadScore");
const riskPlanScoreElement = document.getElementById("riskPlanScore");
const pressureScoreElement = document.getElementById("pressureScore");
const memberReferenceRanges = [
  {
    id: "marketStructure",
    valueId: "marketStructureRefValue",
    statusId: "marketStructureRefStatus",
    min: 6.2,
    watch: 4.5,
    direction: "high",
    inRange: "In range: tradable structure",
    watchText: "Watch: needs cleaner structure",
    outText: "Out of range: protect first",
  },
  {
    id: "levelClarity",
    valueId: "levelClarityRefValue",
    statusId: "levelClarityRefStatus",
    min: 6.8,
    watch: 5,
    direction: "high",
    inRange: "In range: levels are clear",
    watchText: "Watch: mark cleaner levels",
    outText: "Out of range: mark the level first",
  },
  {
    id: "setupQuality",
    valueId: "setupQualityRefValue",
    statusId: "setupQualityRefStatus",
    min: 7,
    watch: 5.2,
    direction: "high",
    inRange: "In range: setup earned attention",
    watchText: "Watch: setup has not earned risk",
    outText: "Out of range: wait for proof",
  },
  {
    id: "riskDefined",
    valueId: "riskDefinedRefValue",
    statusId: "riskDefinedRefStatus",
    min: 7.4,
    watch: 5.5,
    direction: "high",
    inRange: "In range: risk is defined",
    watchText: "Watch: tighten invalidation",
    outText: "Out of range: no trade ticket yet",
  },
  {
    id: "chasePressure",
    valueId: "chasePressureRefValue",
    statusId: "chasePressureRefStatus",
    max: 3.3,
    watch: 5.8,
    direction: "low",
    inRange: "In range: chase pressure controlled",
    watchText: "Watch: pressure is rising",
    outText: "Out of range: step back",
  },
  {
    id: "newsPressure",
    valueId: "newsPressureRefValue",
    statusId: "newsPressureRefStatus",
    max: 4.2,
    watch: 6.6,
    direction: "low",
    inRange: "In range: volatility manageable",
    watchText: "Watch: require confirmation",
    outText: "Out of range: size down or stand aside",
  },
];
let memberMeterBooted = false;
let freeMeterBooted = false;
const ticketChecks = typeof document.querySelectorAll === "function"
  ? Array.from(document.querySelectorAll(".ticket-check"))
  : [];
const ticketScoreElement = document.getElementById("ticketScore");
const ticketGuidanceElement = document.getElementById("ticketGuidance");
const labForm = document.querySelector("[data-lab-form]");
const labMarketReadElement = document.getElementById("labMarketRead");
const labRuleElement = document.getElementById("labRule");
const labTriggerElement = document.getElementById("labTrigger");
const labScoreElement = document.getElementById("labScore");
const labMessageElement = document.getElementById("labMessage");
const labStreakElement = document.getElementById("labStreak");
const labLastReadinessElement = document.getElementById("labLastReadiness");
const labRuleFocusElement = document.getElementById("labRuleFocus");
const labCleanScoreElement = document.getElementById("labCleanScore");
const labHistoryCountElement = document.getElementById("labHistoryCount");
const labHistoryListElement = document.getElementById("labHistoryList");
const coachModeElement = document.getElementById("coachMode");
const coachRuleElement = document.getElementById("coachRule");
const coachReasonElement = document.getElementById("coachReason");
const coachActionElement = document.getElementById("coachAction");
const coachBriefElement = document.getElementById("coachBrief");
const LAB_STORAGE_KEY = "noFomoTraderLabEntries";

function hasElements(items) {
  return items.every(Boolean);
}

function clampScore(score) {
  return Math.max(3, Math.min(98, score));
}

function naturalizeScore(score, values, salt = 0) {
  let adjusted = clampScore(score);
  const signature = values.reduce((sum, value, index) => sum + value * (index + 3), salt);

  if (adjusted % 10 === 0) {
    adjusted += signature % 2 === 0 ? 3 : -3;
  } else if (adjusted % 5 === 0) {
    adjusted += signature % 2 === 0 ? 2 : -2;
  }

  return clampScore(adjusted);
}

function getIndexPulseReading(slope) {
  if (slope >= 2) {
    return { className: "is-up", state: "Constructive" };
  }

  if (slope <= -2) {
    return { className: "is-down", state: "Pressure" };
  }

  return { className: "is-flat", state: "Mixed" };
}

function buildSparkPath(slope, seed) {
  const points = [];
  const baseY = 36;
  const stepX = 30;

  for (let index = 0; index < 7; index++) {
    const wave = Math.sin((index + seed) * 1.15) * 5;
    const slopeMove = (3 - index) * slope * 3.1;
    const x = index * stepX;
    const y = Math.max(9, Math.min(61, baseY + slopeMove + wave));
    points.push(`${index === 0 ? "M" : "L"}${x} ${y.toFixed(1)}`);
  }

  return points.join(" ");
}

function updateIndexPulse() {
  indexPulseSymbols.forEach((symbol, index) => {
    const input = document.getElementById(`${symbol}PulseSlope`);
    const scoreElementForSymbol = document.getElementById(`${symbol}PulseScore`);
    const stateElementForSymbol = document.getElementById(`${symbol}PulseState`);
    const slopeElementForSymbol = document.getElementById(`${symbol}PulseSlopeText`);
    const pathElementForSymbol = document.getElementById(`${symbol}PulsePath`);
    const card = input ? input.closest("[data-index-card]") : null;

    if (!input || !scoreElementForSymbol || !stateElementForSymbol || !slopeElementForSymbol || !pathElementForSymbol || !card) {
      return;
    }

    const slope = Number(input.value);
    const score = naturalizeScore(52 + slope * 7, [slope, index + 1], index + 71);
    const reading = getIndexPulseReading(slope);

    scoreElementForSymbol.textContent = score;
    stateElementForSymbol.textContent = reading.state;
    slopeElementForSymbol.textContent = `Slope ${slope > 0 ? "+" : ""}${slope}`;
    pathElementForSymbol.setAttribute("d", buildSparkPath(slope, index + 1));
    card.classList.remove("is-up", "is-down", "is-flat");
    card.classList.add(reading.className);
  });
}

function getMeterReading(score) {
  if (score < 40) {
    return {
      state: "Red: Observe first",
      color: "#b94a3a",
      guidance: "Pressure is high. Reduce size, slow down, and journal the urge before acting.",
    };
  }

  if (score < 70) {
    return {
      state: "Yellow: Be selective",
      color: "#b98227",
      guidance: "Conditions are mixed. Trade less, wait for confirmation, and require a clean risk point.",
    };
  }

  return {
    state: "Green: Stay planned",
    color: "#67a85b",
    guidance: "Conditions look calmer. Study clean pullbacks, defined risk, and disciplined execution.",
  };
}

function updateMeter() {
  if (!hasElements([scoreElement, stateElement, guidanceElement, fillElement, needleElement])) {
    return;
  }

  const values = [];
  let weighted = 0;
  const weights = [0.27, 0.22, 0.18, 0.15, 0.18];

  meterInputs.forEach(({ id, valueId, positive }, index) => {
    const input = document.getElementById(id);
    const valueElement = document.getElementById(valueId);
    if (!input || !valueElement) {
      return;
    }
    const value = Number(input.value);
    const effectiveValue = positive ? value : 10 - value;

    valueElement.textContent = value;
    values.push(value);
    weighted += effectiveValue * weights[index];
  });

  const score = naturalizeScore(Math.round(weighted * 10 - 3), values, 5);
  const reading = getMeterReading(score);

  renderMeter(score, reading);
}

function renderMeter(score, reading) {
  scoreElement.textContent = score;
  stateElement.textContent = reading.state;
  guidanceElement.textContent = reading.guidance;
  fillElement.style.width = `${score}%`;
  fillElement.style.backgroundColor = reading.color;
  needleElement.style.transform = `translateX(-50%) rotate(${score * 1.8 - 90}deg)`;
}

function bootMeter() {
  if (!hasElements([scoreElement, stateElement, guidanceElement, fillElement, needleElement])) {
    return;
  }

  if (freeMeterBooted) {
    updateMeter();
    return;
  }

  const prefersReducedMotion = typeof window !== "undefined"
    && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    freeMeterBooted = true;
    updateMeter();
    return;
  }

  freeMeterBooted = true;
  const schedule = typeof window !== "undefined" && window.setTimeout
    ? window.setTimeout.bind(window)
    : globalThis.setTimeout.bind(globalThis);

  const values = [];
  let weighted = 0;
  const weights = [0.27, 0.22, 0.18, 0.15, 0.18];

  meterInputs.forEach(({ id, valueId, positive }, index) => {
    const input = document.getElementById(id);
    const valueElement = document.getElementById(valueId);
    if (!input || !valueElement) {
      return;
    }
    const value = Number(input.value);
    const effectiveValue = positive ? value : 10 - value;

    valueElement.textContent = value;
    values.push(value);
    weighted += effectiveValue * weights[index];
  });

  const score = naturalizeScore(Math.round(weighted * 10 - 3), values, 5);
  const reading = getMeterReading(score);

  scoreElement.textContent = "00";
  stateElement.textContent = "Calibrating conditions";
  guidanceElement.textContent = "Sweeping trend, levels, pressure, and chase risk.";
  fillElement.style.width = "0%";
  fillElement.style.backgroundColor = reading.color;
  needleElement.style.transform = "translateX(-50%) rotate(-90deg)";

  schedule(() => {
    fillElement.style.width = "100%";
    needleElement.style.transform = "translateX(-50%) rotate(90deg)";
  }, 220);

  schedule(() => {
    fillElement.style.width = `${score}%`;
    needleElement.style.transform = `translateX(-50%) rotate(${score * 1.8 - 90}deg)`;
  }, 860);

  schedule(() => {
    renderMeter(score, reading);
  }, 1160);
}

function getMemberReading(score) {
  if (score < 40) {
    return {
      state: "Protect: Conditions first",
      guidance: "This is a protect-capital environment. Reduce activity, require stronger proof, and review the urge to force a trade.",
    };
  }

  if (score < 72) {
    return {
      state: "Selective: Wait for proof",
      guidance: "Conditions are not bad, but the trade still needs a cleaner setup, defined risk, and emotional control.",
    };
  }

  return {
    state: "Ready: Plan still required",
    guidance: "The environment and setup quality look stronger. Stay planned, define risk first, and avoid treating the score like a signal.",
  };
}

function calculateMemberMeter() {
  if (!hasElements([memberScoreElement, memberStateElement, memberGuidanceElement, memberNeedleElement])) {
    return null;
  }

  const values = {};
  const rawValues = [];

  memberMeterInputs.forEach(({ id, valueId, positive }) => {
    const input = document.getElementById(id);
    const valueElement = document.getElementById(valueId);
    if (!input || !valueElement) {
      return;
    }
    const value = Number(input.value);
    const effectiveValue = positive ? value : 10 - value;

    valueElement.textContent = value;
    values[id] = effectiveValue;
    rawValues.push(value);
  });

  const score = naturalizeScore(Math.round(
    values.marketStructure * 1.8 +
    values.levelClarity * 1.8 +
    values.setupQuality * 2.2 +
    values.riskDefined * 2.2 +
    values.chasePressure * 1.1 +
    values.newsPressure * .9 +
    2
  ), rawValues, 11);
  const structureScore = naturalizeScore(Math.round((values.marketStructure * .58 + values.levelClarity * .42) * 10 + 1), rawValues, 21);
  const setupScore = naturalizeScore(Math.round((values.setupQuality * .7 + values.levelClarity * .3) * 10 - 2), rawValues, 31);
  const riskScore = naturalizeScore(Math.round((values.riskDefined * .75 + values.chasePressure * .25) * 10 + 3), rawValues, 41);
  const pressureScore = naturalizeScore(Math.round(((10 - values.chasePressure) * .52 + (10 - values.newsPressure) * .48) * 10 - 2), rawValues, 51);
  const reading = getMemberReading(score);

  return {
    pressureScore,
    rawValues: {
      chasePressure: rawValues[4],
      levelClarity: rawValues[1],
      marketStructure: rawValues[0],
      newsPressure: rawValues[5],
      riskDefined: rawValues[3],
      setupQuality: rawValues[2],
    },
    reading,
    riskScore,
    score,
    setupScore,
    structureScore,
  };
}

function getScoreCoach(result) {
  if (!result || !result.rawValues) {
    return null;
  }

  const values = result.rawValues;
  const coachItems = [
    {
      id: "levelClarity",
      label: "Key level clarity",
      severity: Math.max(0, 6.8 - values.levelClarity),
      rule: "No clean level, no trade.",
      reason: "Key level clarity is below the reference range. The trade does not deserve attention until the level, invalidation, and risk point are written down.",
      action: "Mark the key level before watching entries.",
    },
    {
      id: "setupQuality",
      label: "Setup quality",
      severity: Math.max(0, 7 - values.setupQuality),
      rule: "Wait for proof, not movement.",
      reason: "Setup quality is below the reference range. Movement alone is not enough; wait for a pullback, reclaim, hold, or clear rejection.",
      action: "Name the setup before considering the trade.",
    },
    {
      id: "riskDefined",
      label: "Risk defined",
      severity: Math.max(0, 7.4 - values.riskDefined),
      rule: "No stop, no trade.",
      reason: "Risk is not fully defined. If the stop has to be invented after entry, the setup is not ready for capital.",
      action: "Write what proves the idea wrong.",
    },
    {
      id: "marketStructure",
      label: "Market structure",
      severity: Math.max(0, 6.2 - values.marketStructure),
      rule: "Trade the environment, not the candle.",
      reason: "Market structure is below the healthy range. In chop or unclear trend, the same setup needs more confirmation.",
      action: "Decide trend, range, or chop before scanning entries.",
    },
    {
      id: "chasePressure",
      label: "Chase pressure",
      severity: Math.max(0, values.chasePressure - 3.3),
      rule: "If I feel late, I am late.",
      reason: "Chase pressure is above the reference range. The rule today is to let the first move go and wait for the next clean risk point.",
      action: "Take one full breath before any entry decision.",
    },
    {
      id: "newsPressure",
      label: "News / volatility",
      severity: Math.max(0, values.newsPressure - 4.2),
      rule: "Let volatility show its range first.",
      reason: "News or volatility pressure is elevated. The rule today is to wait for confirmation instead of guessing the first reaction.",
      action: "Wait for a range, reclaim, or failed move before acting.",
    },
  ];

  const topIssue = coachItems.sort((a, b) => b.severity - a.severity)[0];
  const mode = result.score < 40 ? "Protect Mode" : result.score < 72 ? "Selective Mode" : "Ready Mode";

  if (result.score >= 72 && topIssue.severity < 1) {
    return {
      action: "Write the stop and wait for the clean pullback.",
      brief: "The score is healthy, so the coach shifts from protection to execution quality. Consistency still comes from defined risk and patient entries.",
      mode,
      reason: "Most inputs are inside or near their reference ranges. The danger now is getting careless because conditions look cleaner.",
      rule: "Green does not mean chase.",
    };
  }

  if (result.score < 40) {
    return {
      action: "Stand aside until the weakest category improves.",
      brief: "The daily brief should protect attention and capital when the score is red.",
      mode,
      reason: `${topIssue.label} is the biggest drag on the read. The consistent move is to protect attention and capital until conditions improve.`,
      rule: topIssue.rule,
    };
  }

  return {
    action: topIssue.action,
    brief: "Consistency comes from matching behavior to conditions. The daily rule should coach the weakest part of the current read, not throw out a random note.",
    mode,
    reason: topIssue.reason,
    rule: topIssue.rule,
  };
}

function renderScoreCoach(result) {
  if (!hasElements([coachModeElement, coachRuleElement, coachReasonElement, coachActionElement, coachBriefElement])) {
    return;
  }

  const coach = getScoreCoach(result);
  if (!coach) {
    return;
  }

  coachModeElement.textContent = coach.mode;
  coachRuleElement.textContent = coach.rule;
  coachReasonElement.textContent = coach.reason;
  coachActionElement.textContent = coach.action;
  coachBriefElement.textContent = coach.brief;
}

function getReferenceStatus(value, range) {
  if (range.direction === "high") {
    if (value >= range.min) {
      return { className: "is-in-range", text: range.inRange };
    }

    if (value >= range.watch) {
      return { className: "is-watch-range", text: range.watchText };
    }

    return { className: "is-out-range", text: range.outText };
  }

  if (value <= range.max) {
    return { className: "is-in-range", text: range.inRange };
  }

  if (value <= range.watch) {
    return { className: "is-watch-range", text: range.watchText };
  }

  return { className: "is-out-range", text: range.outText };
}

function renderReferenceRanges() {
  memberReferenceRanges.forEach((range) => {
    const input = document.getElementById(range.id);
    const valueElement = document.getElementById(range.valueId);
    const statusElement = document.getElementById(range.statusId);

    if (!input || !valueElement || !statusElement) {
      return;
    }

    const value = Number(input.value);
    const status = getReferenceStatus(value, range);
    const card = statusElement.closest("article");

    valueElement.textContent = value.toFixed(1);
    statusElement.textContent = status.text;

    if (card) {
      card.classList.remove("is-in-range", "is-watch-range", "is-out-range");
      card.classList.add(status.className);
    }
  });
}

function renderMemberMeter(result) {
  if (!result) {
    return;
  }

  memberScoreElement.textContent = result.score;
  memberStateElement.textContent = result.reading.state;
  memberGuidanceElement.textContent = result.reading.guidance;
  memberNeedleElement.style.transform = `translateX(-50%) rotate(${result.score * 1.8 - 90}deg)`;

  if (memberFillElement) {
    memberFillElement.style.width = `${result.score}%`;
  }

  if (memberCodeElement) {
    memberCodeElement.textContent = `MR-${String(result.score).padStart(3, "0")}`;
  }

  if (structureScoreElement) {
    structureScoreElement.textContent = result.structureScore;
  }

  if (setupReadScoreElement) {
    setupReadScoreElement.textContent = result.setupScore;
  }

  if (riskPlanScoreElement) {
    riskPlanScoreElement.textContent = result.riskScore;
  }

  if (pressureScoreElement) {
    pressureScoreElement.textContent = result.pressureScore;
  }

  renderReferenceRanges();
  renderScoreCoach(result);
}

function updateMemberMeter() {
  const result = calculateMemberMeter();
  renderMemberMeter(result);
}

function bootMemberMeter() {
  const result = calculateMemberMeter();

  if (!result || memberMeterBooted) {
    renderMemberMeter(result);
    return;
  }

  const prefersReducedMotion = typeof window !== "undefined"
    && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    renderMemberMeter(result);
    memberMeterBooted = true;
    return;
  }

  memberMeterBooted = true;
  const schedule = typeof window !== "undefined" && window.setTimeout
    ? window.setTimeout.bind(window)
    : globalThis.setTimeout.bind(globalThis);

  memberScoreElement.textContent = "00";
  memberStateElement.textContent = "Calibrating readiness";
  memberGuidanceElement.textContent = "Sweeping market structure, setup quality, risk plan, and pressure inputs.";
  memberNeedleElement.style.transform = "translateX(-50%) rotate(-90deg)";

  if (memberFillElement) {
    memberFillElement.style.width = "0%";
  }

  if (memberCodeElement) {
    memberCodeElement.textContent = "MR-000";
  }

  [structureScoreElement, setupReadScoreElement, riskPlanScoreElement, pressureScoreElement].forEach((element) => {
    if (element) {
      element.textContent = "--";
    }
  });

  schedule(() => {
    memberNeedleElement.style.transform = "translateX(-50%) rotate(90deg)";
    if (memberFillElement) {
      memberFillElement.style.width = "100%";
    }
  }, 260);

  schedule(() => {
    memberNeedleElement.style.transform = `translateX(-50%) rotate(${result.score * 1.8 - 90}deg)`;
    if (memberFillElement) {
      memberFillElement.style.width = `${result.score}%`;
    }
  }, 900);

  schedule(() => {
    renderMemberMeter(result);
  }, 1220);
}

function updateTicketScore() {
  if (!ticketChecks.length || !ticketScoreElement || !ticketGuidanceElement) {
    return;
  }

  const checkedCount = ticketChecks.filter((input) => input.checked).length;
  ticketScoreElement.textContent = `${checkedCount} / ${ticketChecks.length}`;

  if (checkedCount <= 3) {
    ticketGuidanceElement.textContent = "Not ready yet. Finish the plan before the trade gets emotional.";
  } else if (checkedCount <= 5) {
    ticketGuidanceElement.textContent = "Getting closer. The setup needs a clearer risk point before it deserves capital.";
  } else {
    ticketGuidanceElement.textContent = "The plan is mostly defined. Stay disciplined and do not treat readiness as a guarantee.";
  }
}

function readLabEntries() {
  if (typeof window === "undefined" || !window.localStorage) {
    return [];
  }

  try {
    const stored = window.localStorage.getItem(LAB_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function writeLabEntries(entries) {
  if (typeof window === "undefined" || !window.localStorage) {
    return;
  }

  window.localStorage.setItem(LAB_STORAGE_KEY, JSON.stringify(entries.slice(0, 21)));
}

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function calculateLabStreak(entries) {
  const dates = new Set(entries.map((entry) => entry.date));
  let streak = 0;
  const cursor = new Date();

  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderLab() {
  if (!labHistoryListElement) {
    return;
  }

  const entries = readLabEntries();
  const latest = entries[0];
  const streak = calculateLabStreak(entries);

  if (labStreakElement) {
    labStreakElement.textContent = streak;
  }

  if (labLastReadinessElement) {
    labLastReadinessElement.textContent = latest ? latest.readiness : "--";
  }

  if (labRuleFocusElement) {
    labRuleFocusElement.textContent = latest ? latest.rule : "Not set";
  }

  if (labCleanScoreElement) {
    labCleanScoreElement.textContent = latest ? `${latest.score}/10` : "--";
  }

  if (labHistoryCountElement) {
    labHistoryCountElement.textContent = `${entries.length} Saved`;
  }

  if (!entries.length) {
    labHistoryListElement.innerHTML = "<p>No check-ins yet. The value starts when the trader sees their own pattern.</p>";
    return;
  }

  labHistoryListElement.innerHTML = entries.slice(0, 5).map((entry) => `
    <article class="lab-history-item">
      <div>
        <span>Date</span>
        <strong>${escapeHtml(entry.date)}</strong>
      </div>
      <div>
        <span>${escapeHtml(entry.marketRead)}</span>
        <p>${escapeHtml(entry.rule)}${entry.trigger ? ` - Trigger: ${escapeHtml(entry.trigger)}` : ""}</p>
      </div>
      <div>
        <small>Clean</small>
        <strong>${escapeHtml(entry.score)}/10</strong>
      </div>
    </article>
  `).join("");
}

function saveLabCheckIn(event) {
  event.preventDefault();

  if (!labMarketReadElement || !labRuleElement || !labScoreElement) {
    return;
  }

  const entries = readLabEntries();
  const today = getTodayKey();
  const score = Math.max(0, Math.min(10, Number(labScoreElement.value) || 0));
  const entry = {
    date: today,
    marketRead: labMarketReadElement.value,
    readiness: memberScoreElement ? memberScoreElement.textContent : "--",
    rule: labRuleElement.value,
    score,
    trigger: labTriggerElement ? labTriggerElement.value.trim() : "",
  };
  const withoutToday = entries.filter((item) => item.date !== today);

  writeLabEntries([entry, ...withoutToday]);

  if (labMessageElement) {
    labMessageElement.textContent = "Saved. This is the piece that makes the dashboard personal.";
  }

  renderLab();
}

meterInputs.forEach(({ id }) => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", updateMeter);
  }
});

memberMeterInputs.forEach(({ id }) => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", updateMemberMeter);
  }
});

ticketChecks.forEach((input) => {
  input.addEventListener("change", updateTicketScore);
});

indexPulseSymbols.forEach((symbol) => {
  const input = document.getElementById(`${symbol}PulseSlope`);
  if (input) {
    input.addEventListener("input", updateIndexPulse);
  }
});

if (labForm) {
  labForm.addEventListener("submit", saveLabCheckIn);
}

bootMeter();
bootMemberMeter();
updateIndexPulse();
updateTicketScore();
renderLab();
