// "Build the Energy Mix" — choose power sources to meet demand cheaply and cleanly.
//
// This game reveals why balancing is hard: the sources from Game 1 (Balance)
// don't obey your commands. Some only work at night (solar fails you), some
// are moody (wind is variable), the steady ones cost a fortune, and you have
// limited capacity. The player picks a mix and runs a 24-hour simulation to
// see cost, emissions, and whether demand was met.
//
// Explore/Operate toggle (see CLAUDE.md): Explore uses analogies (sunny/windy
// helpers); Operate uses real source names, costs, carbon, and capacity factors.
// Both let the player pick storage (battery) as a source.

(function () {
  "use strict";

  const HOURS = 24;
  const TICKS_PER_HOUR = 4; // 15-min granularity
  const TICKS = HOURS * TICKS_PER_HOUR;

  const LEVELS = {
    explore: {
      name: "Explore",
      hint: "Analogies, simple sources. Build a team of helpers.",
      showCarbon: false,
      unit: "",
      sourceTitle: "Pick your helpers",
      note:
        "<p>You need a team of helpers to cover the day's demand curve. Each helper " +
        "works at different times and costs different amounts.</p>" +
        "<p><strong>Sunny one</strong> works best at noon, is free. " +
        "<strong>Windy one</strong> is unpredictable, free. " +
        "<strong>Steady one</strong> works all day but costs a lot. " +
        "<strong>Battery</strong> stores extra power to use later.</p>" +
        "<p>Goal: cover demand (no blackouts), minimize cost. Pick a mix and " +
        "hit \"Simulate day\" to see how your team does.</p>" +
        "<details><summary>Want the real names?</summary>" +
        "<p>Sunny → solar, Windy → wind, Steady → nuclear/coal, Battery → battery storage. " +
        "Switch to <strong>Operate</strong> for real specs, costs, and carbon.</p></details>",
      status: "Pick a mix of sources and click Simulate day.",
      sources: [
        {
          id: "solar",
          name: "Sunny one",
          capacity: 1000,
          cost: 0,
          carbon: 0,
          availability: (t) => Math.max(0, Math.sin((t / TICKS) * Math.PI) ** 2),
        },
        {
          id: "wind",
          name: "Windy one",
          capacity: 800,
          cost: 0,
          carbon: 0,
          availability: (t) => 0.3 + 0.5 * Math.sin(t * 0.3 + 2) ** 2,
        },
        {
          id: "coal",
          name: "Steady one",
          capacity: 1200,
          cost: 50,
          carbon: 0,
          availability: () => 1.0,
        },
        {
          id: "battery",
          name: "Battery",
          capacity: 500,
          cost: 0,
          carbon: 0,
          isBattery: true,
        },
      ],
    },
    operate: {
      name: "Operate",
      hint: "Real sources, realistic costs and carbon. The actual energy mix.",
      showCarbon: true,
      unit: " MW",
      sourceTitle: "Choose your power plants",
      note:
        "<p>Build a realistic energy mix from available sources. Each has capacity, " +
        "cost (€/MWh), carbon intensity (gCO₂/kWh), and availability " +
        "(capacity factor or dispatch model).</p>" +
        "<p><strong>Solar &amp; wind</strong> are variable (capacity factor). " +
        "<strong>Nuclear</strong> is steady and clean but pricey. " +
        "<strong>Coal &amp; gas</strong> are dispatchable but carbon-heavy. " +
        "<strong>Hydro</strong> is flexible. <strong>Battery</strong> shifts power in time.</p>" +
        "<p>Simulate a day. Goal: meet demand, minimize cost, minimize carbon, " +
        "avoid blackouts. Real grids balance all four.</p>",
      status: "Pick plants and simulate the day. How cheap and clean can you build it?",
      sources: [
        {
          id: "solar",
          name: "Solar",
          capacity: 2000,
          cost: 30,
          carbon: 50,
          availability: (t) => Math.max(0, Math.sin((t / TICKS) * Math.PI) ** 1.5),
        },
        {
          id: "wind",
          name: "Wind",
          capacity: 1500,
          cost: 40,
          carbon: 15,
          availability: (t) => 0.3 + 0.5 * Math.sin(t * 0.3 + 2) ** 2,
        },
        {
          id: "nuclear",
          name: "Nuclear",
          capacity: 1000,
          cost: 60,
          carbon: 12,
          availability: () => 0.9,
        },
        {
          id: "coal",
          name: "Coal",
          capacity: 1200,
          cost: 50,
          carbon: 900,
          availability: () => 0.7,
        },
        {
          id: "gas",
          name: "Gas",
          capacity: 800,
          cost: 80,
          carbon: 500,
          availability: () => 0.8,
        },
        {
          id: "hydro",
          name: "Hydro",
          capacity: 600,
          cost: 45,
          carbon: 24,
          availability: (t) => 0.5 + 0.3 * Math.sin((t / TICKS) * Math.PI * 2),
        },
        {
          id: "battery",
          name: "Battery (4-hour store)",
          capacity: 300,
          cost: 5,
          carbon: 0,
          isBattery: true,
        },
      ],
    },
  };

  const demandProfile = function (t) {
    // Realistic EU-like profile: low at night, peaks morning and evening.
    const hour = (t / TICKS_PER_HOUR) % 24;
    const morningPeak = 1.1 * (1 - Math.cos(((hour - 8) / 4) * Math.PI) ** 2);
    const eveningPeak = 1.0 * (1 - Math.cos(((hour - 19) / 4) * Math.PI) ** 2);
    const base = 0.6 + Math.max(0, morningPeak) + Math.max(0, eveningPeak);
    return 1000 * Math.max(0.5, Math.min(1.2, base));
  };

  const STORAGE_KEY = "mix-level";
  const DEFAULT_LEVEL = "explore";

  const el = {
    sourcesGrid: document.getElementById("sources-grid"),
    demandChart: document.getElementById("demand-chart"),
    cost: document.getElementById("cost"),
    carbon: document.getElementById("carbon"),
    carbonLabel: document.getElementById("carbon-label"),
    blackouts: document.getElementById("blackouts"),
    storageGauge: document.getElementById("storage-gauge"),
    storageSoC: document.getElementById("storage-soc"),
    simulate: document.getElementById("simulate-btn"),
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
  let selected = new Set();
  let state = {
    cost: 0,
    carbon: 0,
    blackouts: 0,
    storageEnergy: 0,
  };

  function renderSources() {
    el.sourcesGrid.innerHTML = "";
    level.sources.forEach(function (src) {
      const label = document.createElement("label");
      label.className = "source-checkbox";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = src.id;
      checkbox.checked = selected.has(src.id);
      checkbox.addEventListener("change", function () {
        if (checkbox.checked) selected.add(src.id);
        else selected.delete(src.id);
      });
      const span = document.createElement("span");
      span.innerHTML = "<strong>" + src.name + "</strong>";
      if (src.cost) span.innerHTML += " • €" + src.cost + "/MWh";
      if (level.showCarbon && src.carbon)
        span.innerHTML += " • " + src.carbon + " gCO₂/kWh";
      label.appendChild(checkbox);
      label.appendChild(span);
      el.sourcesGrid.appendChild(label);
    });
  }

  function drawDemand() {
    const canvas = el.demandChart;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = "#0e1726";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "#ffd24d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let t = 0; t < TICKS; t++) {
      const d = demandProfile(t);
      const maxD = 1300;
      const x = (t / (TICKS - 1)) * w;
      const y = h - (d / maxD) * h;
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function simulate() {
    if (selected.size === 0) {
      el.status.textContent = "Pick at least one source first.";
      return;
    }
    state = { cost: 0, carbon: 0, blackouts: 0, storageEnergy: 0 };
    const sources = level.sources.filter((s) => selected.has(s.id));
    let totalEnergy = 0;

    for (let t = 0; t < TICKS; t++) {
      const demand = demandProfile(t);
      let supply = 0;

      // Non-battery sources contribute
      sources.forEach(function (src) {
        if (src.isBattery) return;
        const avail = src.availability ? src.availability(t) : 1.0;
        supply += src.capacity * avail;
      });

      // Battery dispatch: charge if surplus, discharge if deficit
      const battery = sources.find((s) => s.isBattery);
      if (battery) {
        const batteryMax = battery.capacity;
        const surplus = supply - demand;
        if (surplus > 0) {
          const canCharge = Math.min(surplus, batteryMax - state.storageEnergy);
          supply -= canCharge;
          state.storageEnergy += canCharge;
        } else if (surplus < 0) {
          const canDischarge = Math.min(-surplus, state.storageEnergy);
          supply += canDischarge;
          state.storageEnergy -= canDischarge;
        }
      }

      // Cost and carbon
      if (supply >= demand) {
        const usedEnergy = demand;
        sources.forEach(function (src) {
          if (!src.isBattery) {
            const avail = src.availability ? src.availability(t) : 1.0;
            const contrib = Math.min(usedEnergy * (src.capacity * avail) / supply, src.capacity * avail);
            state.cost += (contrib / 4) * src.cost; // 15-min periods, cost is per MWh
            state.carbon += (contrib / 4) * src.carbon;
          }
        });
        totalEnergy += demand;
      } else {
        state.blackouts += 1;
      }
    }

    // Render results
    el.cost.textContent = "€" + Math.round(state.cost);
    el.carbon.textContent = Math.round(state.carbon / 1000) + " t CO₂";
    el.blackouts.textContent = state.blackouts + " periods";
    if (battery) {
      el.storageGauge.hidden = false;
      el.storageSoC.textContent = Math.round((state.storageEnergy / battery.capacity) * 100) + "%";
    }

    let verdict =
      state.blackouts === 0
        ? "✅ Success — you covered the whole day!"
        : "⚠ " + state.blackouts + " blackout periods. Try again with more capacity.";
    el.resultsTitle.textContent = verdict;
    const summary =
      "Cost: €" +
      Math.round(state.cost) +
      "; Carbon: " +
      Math.round(state.carbon / 1000) +
      " t CO₂.";
    el.resultsBody.textContent = summary;
    el.results.hidden = false;

    // Award medal if no blackouts
    if (state.blackouts === 0) {
      // Gold if cost is low (Operate level) or if in Operate mode
      const isOperate = level.name === "Operate";
      const lowCost = state.cost < 50000;
      if (isOperate && lowCost) {
        medalSystem.save("mix", "gold");
      } else {
        medalSystem.save("mix", "silver");
      }
    }
  }

  function applyLevel(name) {
    level = LEVELS[name] || LEVELS[DEFAULT_LEVEL];
    document.getElementById("sources-title").textContent = level.sourceTitle;
    el.note.innerHTML = level.note;
    el.levelHint.textContent = level.hint;
    el.carbonLabel.textContent = level.showCarbon ? "Carbon" : "Carbon";
    el.storageGauge.hidden = !level.showCarbon;
    el.status.textContent = level.status;
    el.levelButtons.forEach(function (btn) {
      const active = btn.dataset.level === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    selected.clear();
    state = { cost: 0, carbon: 0, blackouts: 0, storageEnergy: 0 };
    el.results.hidden = true;
    renderSources();
    drawDemand();
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch (e) {
      /* ignore */
    }
  }

  el.simulate.addEventListener("click", simulate);
  el.reset.addEventListener("click", function () {
    selected.clear();
    state = { cost: 0, carbon: 0, blackouts: 0, storageEnergy: 0 };
    el.results.hidden = true;
    renderSources();
  });
  el.resultsOk.addEventListener("click", function () {
    el.results.hidden = true;
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
