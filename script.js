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
let memberMeterBooted = false;
let freeMeterBooted = false;
const ticketChecks = typeof document.querySelectorAll === "function"
  ? Array.from(document.querySelectorAll(".ticket-check"))
  : [];
const ticketScoreElement = document.getElementById("ticketScore");
const ticketGuidanceElement = document.getElementById("ticketGuidance");
const signupForm = document.querySelector("[data-signup-form]");
const signupMessage = document.querySelector("[data-signup-message]");

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
    reading,
    riskScore,
    score,
    setupScore,
    structureScore,
  };
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

if (signupForm && signupMessage) {
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    signupMessage.textContent = "Almost there. The email platform still needs to be connected before this can collect addresses.";
  });
}

bootMeter();
bootMemberMeter();
updateTicketScore();
