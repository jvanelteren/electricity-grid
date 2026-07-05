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
//
// The same simulation runs at two resolutions, chosen by the Explore/Operate
// toggle (see the didactic guidance in CLAUDE.md): Explore hides the vocabulary
// and numbers and is more forgiving; Operate uses the real terms, tighter
// tolerances, and exposes the balancing-market (imbalance settlement) layer.
// Nothing shown in Explore becomes false in Operate — same truth, more pixels.

(function () {
  "use strict";

  const NOMINAL_HZ = 50;
  // Frequency dynamics: df = SENSITIVITY*imbalance - FCR_DAMPING*(f - 50).
  // At steady state f - 50 = (SENSITIVITY/FCR_DAMPING) * imbalance, so a
  // leftover imbalance leaves an offset only the player (aFRR) can close. The
  // physics is identical across levels; only tolerances and presentation differ.
  const SENSITIVITY = 0.00008;
  const FCR_DAMPING = 0.02;
  const COST_RATE = 0.01; // € accrued per MW of imbalance per tick (Operate only)

  const LEVELS = {
    explore: {
      name: "Explore",
      hint: "Plain language, forgiving. Get the feel for it.",
      safeBand: 0.25,    // ± Hz counted as "steady"
      blackoutBand: 1.2, // ± Hz before the lights go out (forgiving)
      tickMs: 140,
      demandScale: 0.55, // gentler demand swings
      showHz: false,
      showCost: false,
      unit: "",
      labels: { frequency: "Grid speed", demand: "Being used", supply: "You're making" },
      controlLabel: "Your power: slide it to match what people are using",
      scenario: "You're standing at the control panel. Across Europe, people are flipping light switches, charging devices, running appliances, all riding the same giant merry-go-round. Generators are the people pushing it; every switched-on appliance is a rider dragging their feet. Push exactly as hard as the riders drag and it turns at a steady, comfortable speed. Push too little and it grinds to a halt; push too hard and it spins so fast people fly off.",
      note:
        "<p>You run the grid. Think of it as one giant <strong>merry-go-round</strong> everyone rides. " +
        "Generators are the people pushing; appliances are riders dragging their feet. Push exactly as hard " +
        "as they drag and it spins steadily. Push too little and it slows down; push too much and it speeds up. " +
        "Let it drift too far and the <term data-term=\"blackout\">lights go out</term>.</p>" +
        "<p>The heavy platform has natural momentum, so it doesn't change speed instantly when you push harder. " +
        "Your job: slide your power to keep up with <term data-term=\"demand\">demand</term> and keep the carousel at a steady spin.</p>" +
        "<details><summary>Want the real names?</summary>" +
        "<p>The merry-go-round's spin speed is the grid <term data-term=\"frequency\">frequency</term> " +
        "(50&nbsp;<term data-term=\"hz\">Hz</term> in Europe). " +
        "The momentum that slows the dip is <term data-term=\"fcr\"><strong>FCR</strong></term> (primary <term data-term=\"reserve\">reserve</term>), and it's real inertia. " +
        "The power you slide is <term data-term=\"afrr\"><strong>aFRR</strong></term> (regulating power). " +
        "Switch to <strong>Operate</strong> to play with the real terms and numbers. " +
        "<a href=\"/learn\">How this works in the real grid</a></p></details>",
      status: "Press Start. Keep your power matched to what people are using and hold the carousel steady.",
      balanced: "✅ Steady. The carousel is holding; keep matching demand.",
      drift: function (low) {
        return low
          ? "The carousel is slowing: riders are dragging harder than you're pushing. Push harder."
          : "The carousel is speeding up: you're pushing harder than the riders are dragging. Push softer.";
      },
      explainer: function (low) {
        return low
          ? {
              title: "The lights went out: the carousel slowed to a halt",
              body:
                "Riders were dragging harder than you were pushing, so the merry-go-round slowed down and stalled. " +
                "The platform's momentum can soften a dip, but it can't keep the carousel spinning if you fall too far behind. " +
                "Only you can, by pushing harder to match. Real grids start switching off customers before it gets this far, to stop a total collapse.",
            }
          : {
              title: "The lights went out: the carousel spun too fast",
              body:
                "You were pushing harder than the riders were dragging, so the merry-go-round sped up out of control " +
                "and people flew off. The platform's momentum slows the rise, but it can't absorb the extra energy. You " +
                "needed to push softer. Real grids switch off some generation to cope.",
            };
      },
    },
    operate: {
      name: "Operate",
      hint: "Real terms, tight tolerances, market costs. The real job.",
      safeBand: 0.1,
      blackoutBand: 0.8,
      tickMs: 100,
      demandScale: 1.0,
      showHz: true,
      showCost: true,
      unit: " MW",
      labels: { frequency: "Frequency", demand: "Demand", supply: "Supply" },
      controlLabel: "Your regulating power (aFRR): match it to demand",
      scenario: "You're a TSO (Transmission System Operator) in the control room. Demand swings minute by minute, and every mismatch pulls the frequency away from 50 Hz. Your job: dispatch aFRR (regulating power) to track demand moment by moment. Every MW you're off balance costs money. Keep frequency at exactly 50 Hz.",
      note:
        "<p>You are the control room. <term data-term=\"fcr\"><strong>FCR</strong></term> (primary reserve) reacts automatically " +
        "in seconds to <em>contain</em> a <term data-term=\"frequency\">frequency</term> dip, but it leaves a small offset from " +
        "50&nbsp;<term data-term=\"hz\">Hz</term>. You provide <term data-term=\"afrr\"><strong>aFRR</strong></term> (regulating power): match your output to " +
        "<term data-term=\"demand\">demand</term> to pull frequency back to exactly 50&nbsp;Hz.</p>" +
        "<p>Every <term data-term=\"mw\">MW</term> you are out of <term data-term=\"imbalance\">balance</term> accrues an <strong>imbalance settlement</strong> cost: " +
        "the balancing market charges for deviation. <a href=\"/learn\">How this works in the real grid →</a></p>",
      status: "Press Start. Demand will swing around; move your aFRR output to track it and hold frequency at 50 Hz.",
      balanced: "✅ Balanced: frequency at 50 Hz. Keep tracking demand.",
      drift: function (low) {
        const dir = low ? "low (demand > supply)" : "high (supply > demand)";
        return "FCR is containing the deviation, but frequency is " + dir +
          ". Move your aFRR toward demand to restore 50 Hz.";
      },
      explainer: function (low) {
        return low
          ? {
              title: "Under-frequency: demand outran supply",
              body:
                "Demand exceeded your generation, so the grid slowed below 50 Hz. FCR (primary " +
                "reserve) only contains the dip; it can't close a sustained shortfall. You needed " +
                "to raise your aFRR to match demand. In the real grid, if frequency keeps falling, " +
                "TSOs shed load (disconnect customers) around 49 Hz to stop a full collapse.",
            }
          : {
              title: "Over-frequency: supply outran demand",
              body:
                "Your generation exceeded demand, pushing frequency above 50 Hz. FCR damps the rise " +
                "but doesn't remove the surplus, so you needed to lower your aFRR. In the real grid, " +
                "generation is curtailed; a sustained over-frequency can trip generators offline.",
            };
      },
    },
  };

  const STORAGE_KEY = "balance-level";
  const DEFAULT_LEVEL = "explore"; // beginner-first audience

  const el = {
    frequency: document.getElementById("frequency"),
    frequencyLabel: document.getElementById("frequency-label"),
    demand: document.getElementById("demand"),
    demandLabel: document.getElementById("demand-label"),
    supply: document.getElementById("supply"),
    supplyLabel: document.getElementById("supply-label"),
    costGauge: document.getElementById("cost-gauge"),
    cost: document.getElementById("cost"),
    score: document.getElementById("score"),
    needle: document.getElementById("needle"),
    generation: document.getElementById("generation"),
    generationLabel: document.getElementById("generation-label"),
    generationValue: document.getElementById("generation-value"),
    start: document.getElementById("start-btn"),
    reset: document.getElementById("reset-btn"),
    status: document.getElementById("status"),
    note: document.getElementById("game-note"),
    scenarioText: document.getElementById("scenario-text"),
    levelHint: document.getElementById("level-hint"),
    levelButtons: Array.prototype.slice.call(document.querySelectorAll(".level-btn")),
    explainer: document.getElementById("explainer"),
    explainerTitle: document.getElementById("explainer-title"),
    explainerBody: document.getElementById("explainer-body"),
    explainerRetry: document.getElementById("explainer-retry"),
  };

  let level = LEVELS[DEFAULT_LEVEL];
  let state = initialState();
  let timer = null;

  function initialState() {
    return {
      frequency: NOMINAL_HZ,
      demand: 1000,
      demandTarget: 1000,
      score: 0,
      cost: 0,
      running: false,
      ticks: 0,
    };
  }

  function pseudoDemand(ticks) {
    // Smooth-ish wandering demand from layered sines — deterministic, no deps.
    const t = ticks / 10;
    const swing = 350 * Math.sin(t * 0.7) + 200 * Math.sin(t * 0.23 + 1);
    return 1000 + swing * level.demandScale;
  }

  // The frequency readout: precise Hz in Operate, a plain qualitative word in
  // Explore (the number is the same truth, just hidden at this resolution).
  function frequencyText() {
    if (level.showHz) return state.frequency.toFixed(2) + " Hz";
    const deviation = state.frequency - NOMINAL_HZ;
    if (Math.abs(deviation) <= level.safeBand) return "Steady";
    return deviation < 0 ? "Slowing" : "Racing";
  }

  function render() {
    const supply = Number(el.generation.value);
    el.frequency.textContent = frequencyText();
    el.demand.textContent = Math.round(state.demand) + level.unit;
    el.supply.textContent = supply + level.unit;
    el.score.textContent = Math.round(state.score);
    el.cost.textContent = "€" + Math.round(state.cost);
    el.generationValue.textContent = supply + level.unit;

    // Needle position across the bar, scaled to this level's blackout range.
    const min = NOMINAL_HZ - level.blackoutBand;
    const max = NOMINAL_HZ + level.blackoutBand;
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

    // Imbalance settlement: deviation from balance costs money (Operate layer).
    state.cost += Math.abs(imbalance) * COST_RATE;

    const deviation = Math.abs(state.frequency - NOMINAL_HZ);
    if (deviation <= level.safeBand) {
      state.score += 1;
      el.status.textContent = level.balanced;
    } else {
      el.status.textContent = level.drift(state.frequency < NOMINAL_HZ);
    }

    if (deviation >= level.blackoutBand) {
      stop();
      el.status.textContent =
        "⚠ Blackout! Final score: " + Math.round(state.score) +
        (level.showCost ? ", imbalance cost €" + Math.round(state.cost) : "") + ".";
      showExplainer(state.frequency < NOMINAL_HZ);
    }

    render();
  }

  // Tie the loss back to the concept that caused it, in this level's language.
  function showExplainer(underFrequency) {
    const text = level.explainer(underFrequency);
    el.explainerTitle.textContent = text.title;
    el.explainerBody.textContent = text.body;
    el.explainer.hidden = false;
  }

  function start() {
    if (state.running) return;
    state.running = true;
    el.start.textContent = "Running…";
    el.start.disabled = true;
    timer = setInterval(tick, level.tickMs);
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
    el.status.textContent = level.status;
    render();
  }

  // Apply a level's labels, copy, tolerances and visibility, then reset. Called
  // on load and whenever the player switches level.
  function applyLevel(name) {
    level = LEVELS[name] || LEVELS[DEFAULT_LEVEL];
    el.scenarioText.textContent = level.scenario;
    el.frequencyLabel.textContent = level.labels.frequency;
    el.demandLabel.textContent = level.labels.demand;
    el.supplyLabel.textContent = level.labels.supply;
    el.generationLabel.textContent = level.controlLabel;
    el.note.innerHTML = level.note;
    el.levelHint.textContent = level.hint;
    el.costGauge.hidden = !level.showCost;
    el.levelButtons.forEach(function (btn) {
      const active = btn.dataset.level === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    try { localStorage.setItem(STORAGE_KEY, name); } catch (e) { /* ignore */ }
    reset();
  }

  function checkMedal() {
    // Award silver at score 50+, gold at score 150+
    if (state.score >= 150) {
      medalSystem.save("balance", "gold");
    } else if (state.score >= 50) {
      medalSystem.save("balance", "silver");
    }
  }

  el.start.addEventListener("click", start);
  el.reset.addEventListener("click", reset);
  el.explainerRetry.addEventListener("click", function () {
    reset();
    start();
  });
  el.generation.addEventListener("input", render);

  // Check for medal periodically while running
  const medalCheckInterval = setInterval(function () {
    if (state.running) checkMedal();
  }, 2000);
  el.levelButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.level === levelName()) return;
      applyLevel(btn.dataset.level);
    });
  });

  function levelName() {
    return level === LEVELS.operate ? "operate" : "explore";
  }

  let saved = DEFAULT_LEVEL;
  try { saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LEVEL; } catch (e) { /* ignore */ }
  applyLevel(LEVELS[saved] ? saved : DEFAULT_LEVEL);
})();
