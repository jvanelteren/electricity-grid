// "Build the Energy Mix" — choose power sources to meet demand cheaply and cleanly.
//
// This game reveals why balancing is hard: the sources from Game 1 (Balance)
// don't obey your commands. Some only work at night (solar fails you), some
// are moody (wind is variable), the steady ones cost a fortune, and you have
// limited capacity. The player picks a mix and runs a 24-hour simulation to
// see cost, emissions, and whether demand was met.
//
// Explore/Operate toggle (see CLAUDE.md): both use real source names (everyone
// knows solar/wind/nuclear/gas); Explore keeps a small, simple roster with no
// costs/carbon detail, while Operate adds the full portfolio, costs, carbon, and
// capacity factors. Both let the player pick storage (battery) as a source.

(function () {
  "use strict";

  const HOURS = 24;
  const TICKS_PER_HOUR = 4; // 15-min granularity
  const TICKS = HOURS * TICKS_PER_HOUR;

  const LEVELS = {
    explore: {
      name: "Explore",
      hint: "Real sources, simple specs. Build a mix to cover the day.",
      showCarbon: false,
      useSliders: false,
      // Calibrated against the merit-order sim: solar+wind+nuclear covers the day
      // for ~€346k (renewables run free first, nuclear fills the gap); nuclear-only
      // is ~€1.37M. Two stars rewards adding free renewables, three the lean mix.
      targets: { cost: 1000000, costGreat: 450000 },
      unit: "",
      sourceTitle: "Pick your sources",
      scenario: "It's 6 AM on a Tuesday. Europe wakes up. The grid demand is rising. You need to turn on power sources to keep up. Some are free and work only at certain times. Some work all day but cost money. Can you cover demand without blackouts?",
      note:
        "<p>You need a mix of sources to cover the day's demand curve. Each source " +
        "works at different times and costs different amounts.</p>" +
        "<p><strong>Solar</strong> works best at noon, is free. " +
        "<strong>Wind</strong> is unpredictable, free. " +
        "<strong>Nuclear</strong> works all day but costs a lot. " +
        "<strong>Battery</strong> stores extra power to use later.</p>" +
        "<p>Goal: cover demand (no blackouts), minimize cost. Pick a mix and " +
        "hit \"Simulate day\" to see how your mix does.</p>" +
        "<details><summary>Want more detail?</summary>" +
        "<p>Switch to <strong>Operate</strong> for the full portfolio (adds gas and " +
        "hydro), real costs, carbon, and capacity factors.</p></details>",
      status: "Pick a mix of sources and click Simulate day.",
      sources: [
        {
          id: "solar",
          name: "Solar",
          capacity: 1000,
          cost: 0,
          carbon: 0,
          availability: (t) => Math.max(0, Math.sin((t / TICKS) * Math.PI) ** 2),
        },
        {
          id: "wind",
          name: "Wind",
          capacity: 800,
          cost: 0,
          carbon: 0,
          availability: (t) => 0.3 + 0.5 * Math.sin(t * 0.3 + 2) ** 2,
        },
        {
          id: "nuclear",
          name: "Nuclear",
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
      useSliders: true,
      // Calibrated against the merit-order sim. Cheapest-first dispatch makes any
      // mix cheap (~€0.9M), so the tension shifts to carbon: "all plants on" pulls
      // in coal (cost 50 < nuclear 60) for ~1,491 t, while dropping/dialing down
      // coal gets the clean mix to ~1,112 t. Three stars demands cheap AND clean.
      targets: { cost: 1000000, carbon: 1200 },
      unit: " MW",
      sourceTitle: "Choose your power plants",
      scenario: "You're a grid operator. Tuesday, 6 AM. EU demand is rising. You have a day-ahead market and a portfolio of generators: solar, wind, nuclear, coal, gas, hydro, and battery. Some are cheap, some are clean, some are reliable. Build an energy mix that covers demand, stays affordable, and minimizes emissions.",
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

  // One colour per source so the stacked supply chart is readable; demand is a
  // white line on top, shortfalls (blackout periods) shade red.
  const COLORS = {
    solar: "#ffd24d",
    wind: "#5fd0e0",
    nuclear: "#b07cff",
    coal: "#7a7f87",
    gas: "#ff8a5f",
    hydro: "#4d8aff",
    battery: "#6ee7a8",
  };
  const DEMAND_COLOR = "#ffffff";
  const SHORTFALL_COLOR = "rgba(255, 90, 80, 0.55)";
  // Capacity that's available but deliberately not dispatched (held back or
  // curtailed). Drawn faint above the demand line so it reads as headroom, not
  // as supply exceeding demand — supply always meets demand exactly.
  const CURTAIL_COLOR = "rgba(255, 255, 255, 0.09)";
  const CURTAIL_LEGEND = "rgba(255, 255, 255, 0.22)";

  let maxDemand = 0;
  for (let t = 0; t < TICKS; t++) maxDemand = Math.max(maxDemand, demandProfile(t));

  const el = {
    sourcesGrid: document.getElementById("sources-grid"),
    demandChart: document.getElementById("demand-chart"),
    chartLegend: document.getElementById("chart-legend"),
    targets: document.getElementById("mix-targets"),
    cost: document.getElementById("cost"),
    carbon: document.getElementById("carbon"),
    carbonGauge: document.getElementById("carbon-gauge"),
    blackouts: document.getElementById("blackouts"),
    storageGauge: document.getElementById("storage-gauge"),
    storageSoC: document.getElementById("storage-soc"),
    simulate: document.getElementById("simulate-btn"),
    reset: document.getElementById("reset-btn"),
    status: document.getElementById("status"),
    note: document.getElementById("game-note"),
    scenarioText: document.getElementById("scenario-text"),
    levelHint: document.getElementById("level-hint"),
    levelButtons: Array.prototype.slice.call(document.querySelectorAll(".level-btn")),
    results: document.getElementById("results"),
    resultsTitle: document.getElementById("results-title"),
    resultsStars: document.getElementById("mix-stars"),
    resultsBody: document.getElementById("results-body"),
    resultsOk: document.getElementById("results-ok"),
  };

  let level = LEVELS[DEFAULT_LEVEL];
  // id -> fraction of capacity in use (0..1). Checkbox levels store 1; slider
  // levels store the dial value. A source absent from the map is off.
  let selected = new Map();
  let state = { cost: 0, carbon: 0, blackouts: 0, storageEnergy: 0 };
  let lastSeries = null; // per-tick chart data from the most recent simulation

  function fmt(n) {
    return Math.round(n).toLocaleString("en-US");
  }
  function starStr(n) {
    let s = "";
    for (let i = 0; i < 3; i++) s += i < n ? "★" : "☆";
    return s;
  }
  function specText(src) {
    let s = "";
    if (src.cost) s += " • €" + src.cost + "/MWh";
    if (level.showCarbon && src.carbon) s += " • " + src.carbon + " gCO₂/kWh";
    return s;
  }

  function renderSources() {
    el.sourcesGrid.innerHTML = "";
    level.sources.forEach(function (src) {
      const frac = selected.get(src.id) || 0;
      if (level.useSliders) {
        // Slider row: tune how much of each plant's capacity you commit.
        const row = document.createElement("div");
        row.className = "source-slider";
        const head = document.createElement("div");
        head.className = "source-slider-head";
        head.innerHTML =
          "<span><strong>" + src.name + "</strong>" + specText(src) + "</span>";
        const valSpan = document.createElement("span");
        valSpan.className = "source-slider-value";
        const slider = document.createElement("input");
        slider.type = "range";
        slider.min = "0";
        slider.max = "100";
        slider.step = "5";
        slider.value = String(Math.round(frac * 100));
        const renderVal = function () {
          const pct = Number(slider.value);
          valSpan.textContent =
            pct === 0 ? "off" : pct + "% · " + Math.round((src.capacity * pct) / 100) + " MW";
        };
        slider.addEventListener("input", function () {
          const f = Number(slider.value) / 100;
          if (f > 0) selected.set(src.id, f);
          else selected.delete(src.id);
          renderVal();
        });
        renderVal();
        head.appendChild(valSpan);
        row.appendChild(head);
        row.appendChild(slider);
        el.sourcesGrid.appendChild(row);
      } else {
        // Checkbox row: a source is either in the mix (full capacity) or out.
        const label = document.createElement("label");
        label.className = "source-checkbox";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = src.id;
        checkbox.checked = frac > 0;
        checkbox.addEventListener("change", function () {
          if (checkbox.checked) selected.set(src.id, 1);
          else selected.delete(src.id);
        });
        const span = document.createElement("span");
        span.innerHTML = "<strong>" + src.name + "</strong>" + specText(src);
        label.appendChild(checkbox);
        label.appendChild(span);
        el.sourcesGrid.appendChild(label);
      }
    });
  }

  function renderTargets() {
    if (!el.targets) return;
    const tg = level.targets;
    let txt = "🎯 Cover the day with no blackouts.";
    if (!level.showCarbon) {
      txt +=
        " ⭐⭐ keep cost under €" + fmt(tg.cost) +
        " · ⭐⭐⭐ under €" + fmt(tg.costGreat) + ".";
    } else {
      txt +=
        " ⭐⭐ cost under €" + fmt(tg.cost) +
        " · ⭐⭐⭐ also carbon under " + fmt(tg.carbon) + " t CO₂.";
    }
    el.targets.textContent = txt;
  }

  function renderLegend(sources, hadShortfall, hadCurtail) {
    if (!el.chartLegend) return;
    el.chartLegend.innerHTML = "";
    if (!sources) return;
    const add = function (swatchStyle, text, isLine) {
      const item = document.createElement("span");
      item.className = "legend-item";
      const sw = document.createElement("span");
      sw.className = "legend-swatch" + (isLine ? " legend-line" : "");
      if (swatchStyle) sw.style.background = swatchStyle;
      item.appendChild(sw);
      item.appendChild(document.createTextNode(text));
      el.chartLegend.appendChild(item);
    };
    sources.forEach(function (s) {
      add(COLORS[s.id] || "#888", s.name, false);
    });
    add(null, "Demand", true);
    if (hadCurtail) add(CURTAIL_LEGEND, "Unused capacity", false);
    if (hadShortfall) add(SHORTFALL_COLOR, "Shortfall", false);
  }

  // Draw the demand curve alone (series == null) or the stacked supply mix with
  // the demand line on top and red shading over any shortfall periods.
  function drawChart(series) {
    const canvas = el.demandChart;
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    ctx.fillStyle = "#0e1726";
    ctx.fillRect(0, 0, w, h);

    let maxY = maxDemand;
    if (series) {
      series.forEach(function (p) {
        // Headroom (unused capacity) is drawn above the demand line, so the
        // y-axis must fit demand + curtailed, not the dispatched stack (which
        // never exceeds demand).
        const top = p.demand + (p.curtailed || 0);
        if (top > maxY) maxY = top;
      });
    }
    maxY *= 1.08;
    const scaleY = h / maxY;

    if (series) {
      const barW = w / TICKS;
      for (let t = 0; t < TICKS; t++) {
        const p = series[t];
        let cursor = 0;
        p.stack.forEach(function (seg) {
          const segH = seg.mw * scaleY;
          ctx.fillStyle = seg.color;
          ctx.fillRect(t * barW, h - cursor - segH, barW + 0.6, segH);
          cursor += segH;
        });
        // Unused/curtailed capacity: faint band above the demand line.
        if (p.curtailed > 0) {
          const yD = h - p.demand * scaleY;
          const cH = p.curtailed * scaleY;
          ctx.fillStyle = CURTAIL_COLOR;
          ctx.fillRect(t * barW, yD - cH, barW + 0.6, cH);
        }
        // Shortfall: the gap between what we could supply and demand (blackout).
        if (p.shortfall > 0) {
          const yS = h - p.supplyAfter * scaleY;
          const yD = h - p.demand * scaleY;
          ctx.fillStyle = SHORTFALL_COLOR;
          ctx.fillRect(t * barW, yD, barW + 0.6, yS - yD);
        }
      }
    }

    ctx.strokeStyle = DEMAND_COLOR;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let t = 0; t < TICKS; t++) {
      const d = demandProfile(t);
      const x = (t / (TICKS - 1)) * w;
      const y = h - d * scaleY;
      if (t === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function computeStars() {
    if (state.blackouts > 0) return 0;
    const tg = level.targets;
    if (!level.showCarbon) {
      if (state.cost <= tg.costGreat) return 3;
      if (state.cost <= tg.cost) return 2;
      return 1;
    }
    const carbonT = state.carbon / 1000;
    if (state.cost <= tg.cost && carbonT <= tg.carbon) return 3;
    if (state.cost <= tg.cost) return 2;
    return 1;
  }

  function tipFor(stars) {
    if (state.blackouts > 0) {
      return "Watch the red gaps on the chart — add firm, always-on capacity (nuclear/gas) or storage to cover those periods.";
    }
    if (stars === 3) return "Perfect mix — you covered the day as cheaply and cleanly as it gets.";
    if (!level.showCarbon) {
      return "Lean harder on free solar & wind so you burn less of the costly steady source.";
    }
    const carbonT = state.carbon / 1000;
    if (state.cost > level.targets.cost) {
      return "Too pricey — shift demand toward your cheapest sources and trim the expensive ones.";
    }
    if (carbonT > level.targets.carbon) {
      return "Clean it up: replace coal/gas with renewables, nuclear, or storage.";
    }
    return "Tune the sliders to squeeze out the last star.";
  }

  function simulate() {
    if (selected.size === 0) {
      el.status.textContent = "Pick at least one source first.";
      return;
    }
    state = { cost: 0, carbon: 0, blackouts: 0, storageEnergy: 0 };
    const sources = level.sources.filter((s) => selected.has(s.id));
    const fracOf = function (src) {
      return selected.get(src.id) || 0;
    };
    const battery = sources.find((s) => s.isBattery);
    const batteryMax = battery ? battery.capacity * fracOf(battery) : 0;
    const series = [];
    // Merit order: dispatch the cheapest plants first, only up to demand.
    const merit = sources
      .filter((s) => !s.isBattery)
      .slice()
      .sort((a, b) => a.cost - b.cost);

    for (let t = 0; t < TICKS; t++) {
      const demand = demandProfile(t);

      // Available output this tick = capacity * dial * availability.
      let totalAvail = 0;
      const avail = {};
      sources.forEach(function (src) {
        if (src.isBattery) return;
        const a = src.availability ? src.availability(t) : 1.0;
        const mw = src.capacity * fracOf(src) * a;
        avail[src.id] = mw;
        totalAvail += mw;
      });

      // Dispatch cheapest-first up to demand. Only delivered output is billed
      // and stacked, so the coloured stack equals demand whenever we can meet
      // it — supply never sits above the demand line.
      let remaining = demand;
      let deliveredGen = 0;
      const delivered = {};
      merit.forEach(function (src) {
        const give = Math.min(avail[src.id], remaining);
        delivered[src.id] = give;
        remaining -= give;
        deliveredGen += give;
        state.cost += (give / 4) * src.cost; // 15-min periods, cost is per MWh
        state.carbon += (give / 4) * src.carbon;
      });

      // Battery discharges to cover any remaining deficit (power-limited).
      let batteryDischarge = 0;
      if (battery && remaining > 1e-9) {
        const dis = Math.min(remaining, state.storageEnergy, batteryMax);
        batteryDischarge = dis;
        state.storageEnergy -= dis;
        remaining -= dis;
        state.cost += (dis / 4) * battery.cost;
      }

      const shortfall = Math.max(0, remaining);
      if (shortfall > 1e-9) state.blackouts += 1;

      // Spare generation (otherwise curtailed) charges the battery for free;
      // whatever can't be stored is the visible "unused capacity" headroom.
      const spareGen = totalAvail - deliveredGen;
      let charged = 0;
      if (battery && spareGen > 1e-9) {
        charged = Math.max(0, Math.min(spareGen, batteryMax - state.storageEnergy, batteryMax));
        state.storageEnergy += charged;
      }
      const curtailed = Math.max(0, spareGen - charged);

      // Stack delivered output in a stable source order (so colours don't jump).
      const stack = [];
      sources.forEach(function (src) {
        if (src.isBattery) return;
        const mw = delivered[src.id] || 0;
        if (mw > 1e-9) stack.push({ id: src.id, color: COLORS[src.id] || "#888", mw: mw });
      });
      if (batteryDischarge > 1e-9)
        stack.push({ id: "battery", color: COLORS.battery, mw: batteryDischarge });

      series.push({
        demand: demand,
        supplyAfter: demand - shortfall,
        shortfall: shortfall,
        curtailed: curtailed,
        stack: stack,
      });
    }
    lastSeries = series;

    // Gauges
    el.cost.textContent = "€" + fmt(state.cost);
    el.carbon.textContent = fmt(state.carbon / 1000) + " t CO₂";
    el.blackouts.textContent = state.blackouts + " periods";
    if (battery && batteryMax > 0) {
      el.storageGauge.hidden = false;
      el.storageSoC.textContent =
        Math.round((state.storageEnergy / batteryMax) * 100) + "%";
    } else {
      el.storageGauge.hidden = true;
    }

    // Chart + legend
    drawChart(series);
    const hadCurtail = series.some(function (p) {
      return p.curtailed > 1e-6;
    });
    renderLegend(sources, state.blackouts > 0, hadCurtail);

    // Results: stars, verdict, tip
    const stars = computeStars();
    el.resultsStars.textContent = starStr(stars);
    el.resultsTitle.textContent =
      state.blackouts === 0
        ? "✅ You covered the whole day!"
        : "⚠ " + state.blackouts + " blackout periods — you came up short.";
    el.results.classList.toggle("is-success", state.blackouts === 0);
    el.resultsBody.textContent =
      "Cost: €" + fmt(state.cost) +
      " · Carbon: " + fmt(state.carbon / 1000) + " t CO₂. " +
      tipFor(stars);
    el.results.hidden = false;
    el.status.textContent =
      state.blackouts === 0
        ? "Covered the day — " + starStr(stars) + ". Tweak the mix to chase more stars."
        : "Blackouts — see the red gaps on the chart, then adjust.";

    // Medal: any blackout-free day earns silver; a 3-star day earns gold.
    if (stars >= 3) medalSystem.save("mix", "gold");
    else if (stars >= 1) medalSystem.save("mix", "silver");
  }

  function applyLevel(name) {
    level = LEVELS[name] || LEVELS[DEFAULT_LEVEL];
    el.scenarioText.textContent = level.scenario;
    document.getElementById("sources-title").textContent = level.sourceTitle;
    el.note.innerHTML = level.note;
    el.levelHint.textContent = level.hint;
    el.storageGauge.hidden = true;
    if (el.carbonGauge) el.carbonGauge.hidden = !level.showCarbon;
    el.status.textContent = level.status;
    el.levelButtons.forEach(function (btn) {
      const active = btn.dataset.level === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    selected = new Map();
    state = { cost: 0, carbon: 0, blackouts: 0, storageEnergy: 0 };
    lastSeries = null;
    el.results.hidden = true;
    renderSources();
    renderTargets();
    renderLegend(null, false);
    drawChart(null);
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch (e) {
      /* ignore */
    }
  }

  el.simulate.addEventListener("click", simulate);
  el.reset.addEventListener("click", function () {
    selected = new Map();
    state = { cost: 0, carbon: 0, blackouts: 0, storageEnergy: 0 };
    lastSeries = null;
    el.results.hidden = true;
    el.storageGauge.hidden = true;
    el.status.textContent = level.status;
    renderSources();
    renderLegend(null, false);
    drawChart(null);
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
