// "One Synchronous Europe" — the grid is one shared machine.
//
// This capstone game reveals that the electricity system is not national but
// pan-European: all countries on the continental synchronous area share one
// frequency, so a fault in France nudges the frequency everyone feels in the
// Netherlands. When one country's demand spikes, neighbours can send power
// (or reserves) via interconnectors. International netting (PICASSO/IGCC) lets
// imbalances cancel before expensive reserves activate, saving everyone money.
//
// Player is a TSO in one country (NL). A disturbance hits (demand spike). They
// must balance it. Show them the cost if they do it alone vs. if neighbours help.
// Both frequency traces should match (one synchronous area), but the cost and
// activation volumes differ — teaching the incentive to cooperate.

(function () {
  "use strict";

  const LEVELS = {
    explore: {
      name: "Explore",
      hint: "One shared heartbeat. Neighbours can help when you're in trouble.",
      note:
        "<p>The continental grid is <strong>one synchronous area</strong>: every country's " +
        "frequency is locked together by shared inertia. A power plant trips in France, " +
        "and the frequency dips everywhere.</p>" +
        "<p>The upside: when <strong>one country is short</strong> of power, " +
        "<strong>neighbours can send it via interconnectors</strong>, sharing the cost of " +
        "balancing. Without sharing, you'd have to use expensive emergency reserves alone.</p>" +
        "<p>Trigger a disturbance (a big factory suddenly starts up in your country). Check the " +
        "cost with sharing ON vs. OFF.</p>" +
        "<details><summary>Want the real names?</summary>" +
        "<p>The shared frequency is the <strong>synchronous area</strong>. Neighbours sending power " +
        "is <strong>PICASSO</strong> (European aFRR platform) or <strong>IGCC</strong> (proportional " +
        "imbalance netting). <a href=\"/learn\">How it works →</a></p></details>",
      countries: [
        { id: "nl", name: "Netherlands", x: 150, y: 120, reserves: 100, demand: 300 },
        { id: "de", name: "Germany", x: 200, y: 100, reserves: 150, demand: 400 },
        { id: "fr", name: "France", x: 150, y: 180, reserves: 120, demand: 400 },
      ],
      disturbance: 150, // MW sudden demand spike in NL
      resolveCost: 40, // € per MW
      sharingDiscount: 0.3, // 30% cheaper with neighbours helping
    },
    operate: {
      name: "Operate",
      hint: "Real TSO scenario. Quantify the incentive to cooperate.",
      note:
        "<p>You're the TSO (Transmission System Operator) for the Netherlands. " +
        "A <strong>2 GW offshore wind cable fails</strong> (sudden loss, equivalent to " +
        "demand spike). Your FCR and aFRR are ~500 MW. The imbalance must be balanced " +
        "within 15 minutes.</p>" +
        "<p><strong>Option 1 (no sharing):</strong> activate all your own mFRR reserves at " +
        "expensive prices (~€100/MWh).</p>" +
        "<p><strong>Option 2 (PICASSO):</strong> post your imbalance on the platform; " +
        "neighbouring TSOs can bid to help; you pay the marginal price (usually cheaper).</p>" +
        "<p>The math: cooperation saves money because you're not forced to buy at your " +
        "highest reserve price — the market finds the cheapest available power across Europe.</p>",
      countries: [
        { id: "nl", name: "Netherlands (You)", x: 150, y: 120, reserves: 500, demand: 1500 },
        { id: "de", name: "Germany", x: 200, y: 100, reserves: 800, demand: 2000 },
        { id: "fr", name: "France", x: 150, y: 180, reserves: 700, demand: 1800 },
      ],
      disturbance: 800, // MW sudden loss
      resolveCost: 100, // € per MW (emergency reserves)
      sharingDiscount: 0.4, // 40% cheaper via PICASSO
    },
  };

  const STORAGE_KEY = "europe-level";
  const DEFAULT_LEVEL = "explore";

  const el = {
    map: document.getElementById("europe-map"),
    scenarioTitle: document.getElementById("scenario-title"),
    scenarioDesc: document.getElementById("scenario-desc"),
    allowSharing: document.getElementById("allow-sharing"),
    frequency: document.getElementById("frequency"),
    balancingCost: document.getElementById("balancing-cost"),
    stableCount: document.getElementById("stable-count"),
    trigger: document.getElementById("trigger-btn"),
    reset: document.getElementById("reset-btn"),
    status: document.getElementById("status"),
    note: document.getElementById("game-note"),
    levelHint: document.getElementById("level-hint"),
    levelButtons: Array.prototype.slice.call(document.querySelectorAll(".level-btn")),
    results: document.getElementById("results"),
    resultsTitle: document.getElementById("results-title"),
    resultsBody: document.getElementById("results-body"),
    resultsOk: document.getElementById("results-ok"),
  };

  let level = LEVELS[DEFAULT_LEVEL];
  let state = {
    frequency: 50,
    balancingCost: 0,
    triggered: false,
  };

  function drawMap() {
    const canvas = el.map;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0e1726";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw connections (interconnectors)
    ctx.strokeStyle = "#8fa0b8";
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(level.countries[0].x, level.countries[0].y);
    ctx.lineTo(level.countries[1].x, level.countries[1].y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(level.countries[0].x, level.countries[0].y);
    ctx.lineTo(level.countries[2].x, level.countries[2].y);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw countries
    level.countries.forEach(function (country) {
      const isNL = country.id === "nl";
      ctx.fillStyle = isNL ? "#2e7d4f" : "#16223a";
      ctx.beginPath();
      ctx.arc(country.x, country.y, 30, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isNL ? "#ffd24d" : "#8fa0b8";
      ctx.lineWidth = isNL ? 3 : 1;
      ctx.stroke();

      ctx.fillStyle = "#e7ecf3";
      ctx.font = "bold 12px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(country.name.split(" ")[0], country.x, country.y - 5);
      ctx.font = "10px system-ui";
      ctx.fillStyle = "#ffd24d";
      ctx.fillText(state.frequency.toFixed(2) + " Hz", country.x, country.y + 10);
    });
  }

  function trigger() {
    state.triggered = true;
    state.frequency = 50 - (level.disturbance / 4000) * 0.5; // Simplified frequency dip

    const costWithoutSharing = level.disturbance * level.resolveCost;
    const costWithSharing = costWithoutSharing * (1 - level.sharingDiscount);
    const actualCost = el.allowSharing.checked ? costWithSharing : costWithoutSharing;

    state.balancingCost = actualCost;

    el.frequency.textContent = state.frequency.toFixed(2) + " Hz";
    el.balancingCost.textContent = "€" + Math.round(actualCost);
    el.stableCount.textContent = state.frequency >= 49.5 ? "3/3" : "2/3";

    el.results.hidden = false;
    if (el.allowSharing.checked) {
      el.resultsTitle.textContent = "✅ Neighbours helped — stabilised together";
      el.resultsBody.textContent =
        "Cost to resolve: €" +
        Math.round(actualCost) +
        ". Neighbours provided power via PICASSO, " +
        "saving €" +
        Math.round(costWithoutSharing - costWithSharing) +
        " (that's " +
        (level.sharingDiscount * 100).toFixed(0) +
        "% cheaper). One synchronous area means cooperation is cheaper for everyone.";

      // Award medal: silver for showing it works without sharing, gold with sharing (Operate preferred)
      medalSystem.save("europe", level.name === "Operate" ? "gold" : "silver");
    } else {
      el.resultsTitle.textContent = "⚠ You're alone — expensive fix";
      el.resultsBody.textContent =
        "Cost to resolve: €" +
        Math.round(actualCost) +
        ". Without international sharing, you paid full price for " +
        "emergency reserves. If you turn ON sharing next time, the same " +
        "disturbance costs only €" +
        Math.round(costWithSharing) +
        ". " +
        "That's the power of PICASSO and IGCC.";

      // Trigger with sharing OFF awards a medal (player sees the contrast)
      medalSystem.save("europe", "silver");
    }
  }

  function applyLevel(name) {
    level = LEVELS[name] || LEVELS[DEFAULT_LEVEL];
    el.note.innerHTML = level.note;
    el.levelHint.textContent = level.hint;
    el.levelButtons.forEach(function (btn) {
      const active = btn.dataset.level === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });

    el.scenarioTitle.textContent =
      level.countries[0].name + ": " + level.disturbance + " MW demand spike";
    el.scenarioDesc.textContent =
      "Your reserves: " +
      level.countries[0].reserves +
      " MW. Cost per MW of emergency reserve: €" +
      level.resolveCost +
      ". " +
      (el.allowSharing.checked
        ? "With PICASSO: "
        : "Without sharing: ") +
      "full cost activation.";

    state = { frequency: 50, balancingCost: 0, triggered: false };
    el.frequency.textContent = "50.00 Hz";
    el.balancingCost.textContent = "€0";
    el.stableCount.textContent = "3/3";
    el.results.hidden = true;
    el.status.textContent = "Trigger a disturbance and see the difference cooperation makes.";
    drawMap();

    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch (e) {
      /* ignore */
    }
  }

  el.trigger.addEventListener("click", trigger);
  el.reset.addEventListener("click", function () {
    state = { frequency: 50, balancingCost: 0, triggered: false };
    el.frequency.textContent = "50.00 Hz";
    el.balancingCost.textContent = "€0";
    el.stableCount.textContent = "3/3";
    el.results.hidden = true;
    drawMap();
  });
  el.resultsOk.addEventListener("click", function () {
    el.results.hidden = true;
  });
  el.allowSharing.addEventListener("change", function () {
    el.scenarioDesc.textContent =
      "Your reserves: " +
      level.countries[0].reserves +
      " MW. Cost per MW: €" +
      level.resolveCost +
      ". " +
      (el.allowSharing.checked
        ? "With PICASSO (neighbours help): "
        : "No sharing (you're alone): ") +
      "see the cost difference.";
    if (state.triggered) {
      trigger();
    }
  });
  el.levelButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const name = btn.dataset.level;
      if (level.name === LEVELS[name].name) return;
      applyLevel(name);
    });
  });

  let saved = DEFAULT_LEVEL;
  try {
    saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LEVEL;
  } catch (e) {
    /* ignore */
  }
  applyLevel(LEVELS[saved] ? saved : DEFAULT_LEVEL);
})();
