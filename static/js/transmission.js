// "Redispatch" — the market's cheapest plan doesn't fit the grid. You steer generation, not power.
//
// Each round, the day-ahead market from G4 auto-dispatches cheapest-first. But power can't
// teleport: lines have capacity limits. If the cheap wind up north wants to send everything
// through one line, that line overheats (red), and the player must redispatch by adjusting
// generation: turn down the cheap-but-far plant, turn up the expensive-but-close plant.
// The cost difference ticks up on a meter — that's redispatch, and it's real billions/year
// money in Germany and the Netherlands.
//
// Core loop: market plan is cheapest; your job is to bend it into one that physically fits,
// as cheaply as possible. You learn hands-on: you can't steer power, only choose where to make it.
//
// Campaign: 1 — calm day (learn). 2 — evening peak (congestion). 3 — storm (wind flood,
// cheap power wasted behind bottleneck, the Germany story). 4 — N-1 cascade (line trips,
// you must keep grid safe against single failures). Optional: interconnector to neighbor (G5).

(function () {
  "use strict";

  // Network topology: 4-node linear backbone.
  // North: Wind farm + City North. South: Coal plant + City South.
  // Lines: Wind→City North → City South → Coal. Middle line (bottleneck) is the test.
  const NETWORK = {
    nodes: [
      { id: "wind", name: "Wind Farm (North)", x: 100, y: 100, type: "generator" },
      { id: "city_n", name: "City North", x: 300, y: 100, type: "load" },
      { id: "city_s", name: "City South", x: 300, y: 300, type: "load" },
      { id: "coal", name: "Coal Plant (South)", x: 100, y: 300, type: "generator" },
    ],
    lines: [
      { id: "line_wn", from: "wind", to: "city_n", capacity: 400, resistance: 1.0 },
      { id: "line_ns", from: "city_n", to: "city_s", capacity: 300, resistance: 1.5 }, // bottleneck
      { id: "line_sc", from: "city_s", to: "coal", capacity: 400, resistance: 1.0 },
    ],
  };

  const SCENARIOS = {
    explore: [
      {
        round: 1,
        title: "Round 1: Calm morning",
        scenario: "Demand is balanced, wind is gentle. Learn the controls: adjust the sliders to balance generation and load.",
        wind_capacity: 400,
        coal_capacity: 500,
        load_north: 200,
        load_south: 200,
        wind_cost: 20,
        coal_cost: 50,
        forgivingLimits: true,
        lesson: "You adjusted generation to match load. All wires stayed green — no congestion.",
      },
      {
        round: 2,
        title: "Round 2: Evening peak",
        scenario: "Demand surges (peak evening). Cheap wind up north wants to send everything south. But the middle wire jams.",
        wind_capacity: 400,
        coal_capacity: 500,
        load_north: 100,
        load_south: 400,
        wind_cost: 20,
        coal_cost: 50,
        forgivingLimits: false,
        lesson: "You turned down wind (wasted cheap power) and up coal (expensive local) to fit the wire. That cost difference is redispatch.",
      },
      {
        round: 3,
        title: "Round 3: Storm (wind flood)",
        scenario: "A storm floods the north with cheap wind — more than ever. The south still needs power, but the middle wire can only carry so much of it. Someone asks: why don't we just build more wind? Play the round and find out.",
        wind_capacity: 600,
        coal_capacity: 500,
        load_north: 150,
        load_south: 350,
        wind_cost: 15,
        coal_cost: 50,
        forgivingLimits: false,
        lesson: "Wind is cheap but far. You had to waste wind output and pay for expensive coal down south. This is why transmission constraints matter — it's not just about building more renewables.",
      },
      {
        round: 4,
        title: "Round 4: System stress",
        scenario: "High demand, tight margins. Real operators never load a wire to the brim: if any one wire fails, its power instantly piles onto the others. Run the grid with room to spare — could yours survive losing a wire?",
        wind_capacity: 400,
        coal_capacity: 500,
        load_north: 250,
        load_south: 350,
        wind_cost: 20,
        coal_cost: 50,
        forgivingLimits: false,
        lesson: "When one wire fails, its power doesn't wait — it instantly crowds onto the neighbouring wires. If those are already near their limit, they fail too: a cascade, and a whole region goes dark. That's why grid operators always keep spare room on every wire.",
      },
    ],
    operate: [
      {
        round: 1,
        title: "Round 1: Baseline forecast",
        scenario: "Day-ahead market result: wind €20/MWh, coal €50/MWh. Demand 200 MW north, 200 MW south. All lines have spare capacity, so the market plan should fit as-is. Target: €0 redispatch.",
        wind_capacity: 400,
        coal_capacity: 500,
        load_north: 200,
        load_south: 200,
        wind_cost: 20,
        coal_cost: 50,
        forgivingLimits: false,
        lesson: "The market's plan: 400 MW wind, 0 MW coal. Wind serves the north (200 MW) and sends 200 MW south through the middle line — well inside its 300 MW limit. The cheapest plan fits, so redispatch costs €0. It won't stay that easy.",
      },
      {
        round: 2,
        title: "Round 2: Evening peak & bottleneck",
        scenario: "Evening peak. Demand: 100 MW north, 400 MW south. The market wants wind to serve everything (€20 < coal's €50) — which loads line N–S right up to its 300 MW limit, zero margin. Every MW you shift from wind to coal costs the €30/MWh spread. Keep all lines green at the lowest cost.",
        wind_capacity: 400,
        coal_capacity: 500,
        load_north: 100,
        load_south: 400,
        wind_cost: 20,
        coal_cost: 50,
        forgivingLimits: false,
        lesson: "The cheapest plan filled line N–S to the brim. Shifting generation from far wind to local coal relieves it — at the €30/MWh spread between them. That premium for making the plan fit the wires is redispatch, and real TSOs pay it every evening peak.",
      },
      {
        round: 3,
        title: "Round 3: Renewable flood (Germany)",
        scenario: "Storm forecast: 600 MW of wind at €15/MWh. Demand: 150 MW north, 350 MW south. The market plan pushes 350 MW through the N–S bottleneck — 50 MW more than its 300 MW limit. Cheap wind must be held back and coal run in the south, at the €35/MWh spread. Make it fit.",
        wind_capacity: 600,
        coal_capacity: 500,
        load_north: 150,
        load_south: 350,
        wind_cost: 15,
        coal_cost: 50,
        forgivingLimits: false,
        lesson: "Cheap wind sat idle behind the bottleneck while pricier coal ran in the south — you paid the spread on every displaced MW. Germany pays billions per year for exactly this: northern wind that can't reach southern demand. 'Just build more wind' isn't enough; the wires have to get it there.",
      },
      {
        round: 4,
        title: "Round 4: N-1 security",
        scenario: "Tight margins: demand 250 MW north, 350 MW south. A real control room must keep the grid safe even if any single line fails (the N-1 rule) — a failed line's flow instantly reroutes over the rest, so a line running near its limit is a cascade waiting to happen. Dispatch so that every line keeps healthy headroom, not just legal flow.",
        wind_capacity: 400,
        coal_capacity: 500,
        load_north: 250,
        load_south: 350,
        wind_cost: 20,
        coal_cost: 50,
        forgivingLimits: false,
        lesson: "TSOs don't just keep today's flows legal — they keep the grid safe against every possible single failure at once (N-1 security). Control rooms run contingency simulations around the clock and hold reserves ready. Professional paranoia: that's the real job.",
      },
    ],
  };

  const STORAGE_KEY = "transmission-level";
  const DEFAULT_LEVEL = "explore";

  let level = DEFAULT_LEVEL;
  let currentRound = 1;
  let scenario = null;
  let state = {
    tick: 0,
    running: false,
    wind_dispatch: 0,
    coal_dispatch: 0,
    redispatch_cost: 0,
    cascading: false,
    line_tripped: false,
  };

  const el = {
    levelButtons: Array.prototype.slice.call(document.querySelectorAll(".level-btn")),
    levelHint: document.getElementById("level-hint"),
    scenarioText: document.getElementById("scenario-text"),
    note: document.getElementById("game-note"),
    roundTitle: document.getElementById("round-title"),
    canvas: document.getElementById("network-canvas"),
    windSlider: document.getElementById("wind-slider"),
    coalSlider: document.getElementById("coal-slider"),
    windValue: document.getElementById("wind-value"),
    coalValue: document.getElementById("coal-value"),
    demandNorth: document.getElementById("demand-north"),
    demandSouth: document.getElementById("demand-south"),
    redispatchCost: document.getElementById("redispatch-cost"),
    startBtn: document.getElementById("start-btn"),
    resetBtn: document.getElementById("reset-btn"),
    nextRoundBtn: document.getElementById("next-round-btn"),
    results: document.getElementById("round-results"),
    resultsTitle: document.getElementById("results-title"),
    resultsBody: document.getElementById("results-body"),
    resultsLesson: document.getElementById("results-lesson"),
  };

  let canvas_ctx = null;

  function initCanvas() {
    canvas_ctx = el.canvas.getContext("2d");
    el.canvas.width = 600;
    el.canvas.height = 400;
  }

  function drawNetwork() {
    const ctx = canvas_ctx;
    ctx.fillStyle = "#0e1726";
    ctx.fillRect(0, 0, el.canvas.width, el.canvas.height);

    // Draw lines
    NETWORK.lines.forEach(function (line) {
      const from = NETWORK.nodes.find(n => n.id === line.from);
      const to = NETWORK.nodes.find(n => n.id === line.to);

      // Calculate flow on this line
      const flow = calculateLineFlow(line.id);
      const maxFlow = line.capacity;
      const ratio = Math.min(2, flow / maxFlow);

      // Color: green (ok) → yellow (warning) → red (critical)
      let color = "#2e7d4f"; // green
      if (ratio > 0.8 && ratio <= 1.0) color = "#ffd24d"; // yellow
      if (ratio > 1.0) color = "#c0392b"; // red

      // Line width
      const thickness = 2 + (ratio * 4);
      ctx.strokeStyle = color;
      ctx.lineWidth = thickness;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();

      // Draw capacity/flow label
      const midX = (from.x + to.x) / 2;
      const midY = (from.y + to.y) / 2;
      ctx.fillStyle = color;
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(Math.round(flow) + "/" + maxFlow + " MW", midX, midY - 8);
    });

    // Draw nodes
    NETWORK.nodes.forEach(function (node) {
      const isGen = node.type === "generator";
      ctx.fillStyle = isGen ? "#ffd24d" : "#7fe0a3";
      ctx.beginPath();
      ctx.arc(node.x, node.y, 20, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = "#0e1726";
      ctx.font = "bold 12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(isGen ? "G" : "L", node.x, node.y);

      // Node label
      ctx.fillStyle = "#e7ecf3";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(node.name, node.x, node.y + 35);
    });
  }

  function calculateLineFlow(lineId) {
    // Simplified power flow: wind sends north, coal sends south, flows across middle line
    if (lineId === "line_wn") {
      return state.wind_dispatch;
    } else if (lineId === "line_ns") {
      const wind_to_south = Math.max(0, state.wind_dispatch - scenario.load_north);
      const coal_to_north = Math.max(0, scenario.load_north - state.wind_dispatch);
      return wind_to_south + coal_to_north;
    } else if (lineId === "line_sc") {
      return state.coal_dispatch;
    }
    return 0;
  }

  function calculateRedispatchCost() {
    const market_wind = Math.min(scenario.wind_capacity, scenario.load_north + scenario.load_south);
    const market_coal = Math.max(0, (scenario.load_north + scenario.load_south) - market_wind);

    const wind_delta = market_wind - state.wind_dispatch;
    const coal_delta = state.coal_dispatch - market_coal;

    const cost_per_mw = scenario.coal_cost - scenario.wind_cost;
    const redispatch_cost = Math.abs(coal_delta) * cost_per_mw;

    return redispatch_cost;
  }

  function checkLineViolations() {
    let violations = [];
    NETWORK.lines.forEach(function (line) {
      const flow = calculateLineFlow(line.id);
      if (flow > line.capacity) {
        violations.push({ line: line.id, flow: flow, capacity: line.capacity });
      }
    });
    return violations;
  }

  function runRound() {
    const demand_ok = (state.wind_dispatch + state.coal_dispatch) >= (scenario.load_north + scenario.load_south);
    if (!demand_ok) {
      el.resultsTitle.textContent = "❌ Generation < Demand";
      el.resultsBody.textContent = "Total generation must meet total demand!";
      el.results.hidden = false;
      return;
    }

    state.tick = 0;
    state.running = true;

    const simulate = setInterval(function () {
      state.tick += 1;

      const violations = checkLineViolations();
      if (violations.length > 0) {
        clearInterval(simulate);
        state.running = false;
        el.resultsTitle.textContent = `❌ Grid failed`;
        el.resultsBody.textContent = `Line overloaded: ${violations[0].line} (${Math.round(violations[0].flow)}/${violations[0].capacity} MW). One line trip cascades to neighbors.`;
        el.results.hidden = false;
        return;
      }

      if (state.tick >= 30) {
        clearInterval(simulate);
        state.running = false;
        endRound(true);
      }
    }, 50);
  }

  function endRound(success) {
    const cost = calculateRedispatchCost();
    el.resultsTitle.textContent = `✅ Round ${currentRound} OK`;
    el.resultsBody.textContent = `Redispatch cost: €${Math.round(cost)}/hr. All wires within limits.`;
    el.resultsLesson.textContent = scenario.lesson;
    el.results.hidden = false;

    if (currentRound < 4) {
      el.nextRoundBtn.hidden = false;
    } else {
      el.nextRoundBtn.hidden = true;
    }
  }

  function nextRound() {
    currentRound += 1;
    if (currentRound <= 4) {
      const scenarios_list = level === "operate" ? SCENARIOS.operate : SCENARIOS.explore;
      scenario = scenarios_list[currentRound - 1];
      reset();
    }
  }

  function applyLevel(name) {
    level = name;
    const hint = name === "operate" ? "Real MW, congestion, redispatch costs, N-1 security." : "Adjust generation to fit the wires.";
    el.levelHint.textContent = hint;

    const note = name === "operate"
      ? "<p>The day-ahead market picks the cheapest plants — but power can't teleport, and every line has an MW limit.</p>" +
        "<p><strong>Your only lever:</strong> you can't steer power down a chosen line; you can only change where it's generated. Turn down the cheap-but-far plant, turn up the expensive-but-close one, until every line is inside its limit. The price difference between them is the <term data-term=\"congestion\">congestion</term> cost you pay — <strong>redispatch</strong>, billions per year across Europe.</p>" +
        "<p><strong>Four rounds:</strong> calm day → evening peak (congestion) → storm (cheap wind trapped behind a bottleneck) → tight margins (<term data-term=\"n_minus_one\">N-1</term>: stay safe against any single line failing).</p>"
      : "<p>The market picked the cheapest power plants. Your problem: the wires between them and the cities can only carry so much.</p>" +
        "<p>You can't push power down a particular wire — it flows where physics sends it. All you can do is change where it's <em>made</em>: less from the cheap faraway plant, more from the expensive nearby one, until no wire is overloaded. The extra money that costs is the price of the grid's shape.</p>";

    el.note.innerHTML = note;
    el.levelButtons.forEach(function (btn) {
      btn.classList.toggle("is-active", btn.dataset.level === name);
      btn.setAttribute("aria-pressed", btn.dataset.level === name ? "true" : "false");
    });
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch (e) {
      /* ignore */
    }
    reset();
  }

  function reset() {
    const scenarios_list = level === "operate" ? SCENARIOS.operate : SCENARIOS.explore;
    scenario = scenarios_list[currentRound - 1];

    state = {
      tick: 0,
      running: false,
      wind_dispatch: scenario.wind_capacity / 2,
      coal_dispatch: scenario.coal_capacity / 2,
      redispatch_cost: 0,
      cascading: false,
      line_tripped: false,
    };

    el.roundTitle.textContent = scenario.title;
    el.scenarioText.textContent = scenario.scenario;
    el.demandNorth.textContent = scenario.load_north + " MW";
    el.demandSouth.textContent = scenario.load_south + " MW";

    el.windSlider.max = scenario.wind_capacity;
    el.coalSlider.max = scenario.coal_capacity;
    el.windSlider.value = state.wind_dispatch;
    el.coalSlider.value = state.coal_dispatch;

    updateSliderDisplay();
    el.results.hidden = true;
    el.nextRoundBtn.hidden = true;

    drawNetwork();
  }

  function updateSliderDisplay() {
    el.windValue.textContent = Math.round(state.wind_dispatch) + " MW";
    el.coalValue.textContent = Math.round(state.coal_dispatch) + " MW";
    el.redispatchCost.textContent = "€" + Math.round(calculateRedispatchCost()) + "/hr";
    drawNetwork();
  }

  el.windSlider.addEventListener("input", function () {
    state.wind_dispatch = parseFloat(this.value);
    updateSliderDisplay();
  });

  el.coalSlider.addEventListener("input", function () {
    state.coal_dispatch = parseFloat(this.value);
    updateSliderDisplay();
  });

  el.startBtn.addEventListener("click", runRound);
  el.resetBtn.addEventListener("click", reset);
  el.nextRoundBtn.addEventListener("click", nextRound);

  el.levelButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (btn.dataset.level === level) return;
      applyLevel(btn.dataset.level);
    });
  });

  let saved = DEFAULT_LEVEL;
  try {
    saved = localStorage.getItem(STORAGE_KEY) || DEFAULT_LEVEL;
  } catch (e) {
    /* ignore */
  }

  initCanvas();
  applyLevel(saved);
})();
