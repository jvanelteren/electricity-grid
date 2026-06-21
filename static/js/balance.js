// "Balance the Grid" — hold the system frequency at 50 Hz.
//
// This is a deliberately simple model of two real balancing layers (see the
// Learn page):
//
//   * FCR (primary reserve) — automatic, within seconds. Modelled as a
//     restoring force proportional to the frequency deviation. It *contains* a
//     disturbance and arrests runaway, but on its own it settles at a small
//     steady-state OFFSET from 50 Hz proportional to the leftover imbalance.
//   * aFRR (regulating power) — the player. By matching generation to demand
//     you remove the imbalance itself, which is what actually pulls frequency
//     back to exactly 50 Hz. In the real grid this is dispatched automatically
//     by the TSO; here you do it by hand.

(function () {
  "use strict";

  const NOMINAL_HZ = 50;
  const SAFE_BAND = 0.1;       // ± Hz: "balanced" (normal operational band)
  const BLACKOUT_BAND = 0.8;   // ± Hz: load shedding / blackout
  const TICK_MS = 100;

  // Frequency dynamics: df = SENSITIVITY*imbalance - FCR_DAMPING*(f - 50).
  // At steady state f - 50 = (SENSITIVITY/FCR_DAMPING) * imbalance, so a
  // leftover imbalance leaves an offset only the player (aFRR) can close.
  const SENSITIVITY = 0.00008;
  const FCR_DAMPING = 0.02;

  const el = {
    frequency: document.getElementById("frequency"),
    demand: document.getElementById("demand"),
    supply: document.getElementById("supply"),
    score: document.getElementById("score"),
    needle: document.getElementById("needle"),
    generation: document.getElementById("generation"),
    generationValue: document.getElementById("generation-value"),
    start: document.getElementById("start-btn"),
    reset: document.getElementById("reset-btn"),
    status: document.getElementById("status"),
    explainer: document.getElementById("explainer"),
    explainerTitle: document.getElementById("explainer-title"),
    explainerBody: document.getElementById("explainer-body"),
    explainerRetry: document.getElementById("explainer-retry"),
  };

  let state = initialState();
  let timer = null;

  function initialState() {
    return {
      frequency: NOMINAL_HZ,
      demand: 1000,
      demandTarget: 1000,
      score: 0,
      running: false,
      ticks: 0,
    };
  }

  function pseudoDemand(ticks) {
    // Smooth-ish wandering demand from layered sines — deterministic, no deps.
    const t = ticks / 10;
    return 1000 + 350 * Math.sin(t * 0.7) + 200 * Math.sin(t * 0.23 + 1);
  }

  function render() {
    const supply = Number(el.generation.value);
    el.frequency.textContent = state.frequency.toFixed(2) + " Hz";
    el.demand.textContent = Math.round(state.demand) + " MW";
    el.supply.textContent = supply + " MW";
    el.score.textContent = Math.round(state.score);
    el.generationValue.textContent = supply + " MW";

    // Needle position across the bar (49.2 .. 50.8 Hz).
    const min = NOMINAL_HZ - BLACKOUT_BAND;
    const max = NOMINAL_HZ + BLACKOUT_BAND;
    const pct = Math.max(0, Math.min(1, (state.frequency - min) / (max - min)));
    el.needle.style.left = pct * 100 + "%";
  }

  function tick() {
    state.ticks += 1;
    state.demandTarget = pseudoDemand(state.ticks);
    state.demand += (state.demandTarget - state.demand) * 0.2;

    const supply = Number(el.generation.value);
    const imbalance = supply - state.demand; // +ve: too much generation

    // FCR (automatic, proportional) + the imbalance driving the frequency.
    state.frequency += imbalance * SENSITIVITY;
    state.frequency += (NOMINAL_HZ - state.frequency) * FCR_DAMPING;

    const deviation = Math.abs(state.frequency - NOMINAL_HZ);
    if (deviation <= SAFE_BAND) {
      state.score += 1;
      el.status.textContent = "✅ Balanced — frequency at 50 Hz. Keep tracking demand.";
    } else {
      const dir = state.frequency < NOMINAL_HZ ? "low (demand > supply)" : "high (supply > demand)";
      el.status.textContent =
        `FCR is containing the deviation, but frequency is ${dir}. ` +
        "Move your aFRR toward demand to restore 50 Hz.";
    }

    if (deviation >= BLACKOUT_BAND) {
      stop();
      el.status.textContent =
        "⚠ Blackout! Frequency left the safe range. Final score: " +
        Math.round(state.score) + ".";
      showExplainer(state.frequency < NOMINAL_HZ);
    }

    render();
  }

  // Tie the loss back to the concept that caused it.
  function showExplainer(underFrequency) {
    if (underFrequency) {
      el.explainerTitle.textContent = "Under-frequency: demand outran supply";
      el.explainerBody.textContent =
        "Demand exceeded your generation, so the grid slowed below 50 Hz. " +
        "FCR (primary reserve) only contains the dip — it can't close a " +
        "sustained shortfall. You needed to raise your aFRR to match demand. " +
        "In the real grid, if frequency keeps falling, TSOs shed load " +
        "(disconnect customers) around 49 Hz to stop a full collapse.";
    } else {
      el.explainerTitle.textContent = "Over-frequency: supply outran demand";
      el.explainerBody.textContent =
        "Your generation exceeded demand, pushing frequency above 50 Hz. " +
        "FCR damps the rise but doesn't remove the surplus — you needed to " +
        "lower your aFRR. In the real grid, generation is curtailed; a " +
        "sustained over-frequency can trip generators offline to protect them.";
    }
    el.explainer.hidden = false;
  }

  function start() {
    if (state.running) return;
    state.running = true;
    el.start.textContent = "Running…";
    el.start.disabled = true;
    timer = setInterval(tick, TICK_MS);
  }

  function stop() {
    state.running = false;
    el.start.textContent = "Start";
    el.start.disabled = false;
    if (timer) clearInterval(timer);
    timer = null;
  }

  function reset() {
    stop();
    state = initialState();
    el.generation.value = 1000;
    el.explainer.hidden = true;
    el.status.textContent =
      "Press Start. Demand will swing around — move your aFRR output to track it and hold frequency at 50 Hz.";
    render();
  }

  el.start.addEventListener("click", start);
  el.reset.addEventListener("click", reset);
  el.explainerRetry.addEventListener("click", function () {
    reset();
    start();
  });
  el.generation.addEventListener("input", render);

  reset();
})();
