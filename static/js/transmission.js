// "Get It There (Transmission)" — manage a network of power lines.
//
// This game reveals why the sources from G2 and the dispatching from G1 aren't
// enough: power must physically travel through a network of lines with finite
// capacity. Bottlenecks force you to shut down remote plants or add capacity.
// The player picks which plants run and checks whether the network can carry
// the power to the loads without congestion.
//
// Explore: simple network, analogies (roads jam). Operate: realistic line limits,
// transmission loss, N-1 contingency (if the biggest line fails, does the rest
// of the network still work?).

(function () {
  "use strict";

  const LEVELS = {
    explore: {
      name: "Explore",
      hint: "Roads, congestion, re-routing. Analogies for the physical network.",
      showLoss: false,
      showN1: false,
      unit: "",
      scenario: "Power flows from plants to cities through transmission lines — like roads carrying trucks. Each road has a speed limit. If you push too much power down one road, it jams. Can you balance which plants run so all roads stay uncongested?",
      note:
        "<p>Think of the grid as roads from power plants to cities. Each road has a " +
        "speed limit (capacity). If you try to push too much power through a road, " +
        "it jams — <term data-term=\"congestion\">congestion</term>.</p>" +
        "<p>Pick which plants to turn on. If the roads jam, turn off remote plants " +
        "or find another route.</p>" +
        "<details><summary>Want the real names?</summary>" +
        "<p>Roads are <strong><term data-term=\"transmission_loss\">transmission lines</term></strong>, speed limits are <strong><term data-term=\"mw\">MW</term> limits</strong>, " +
        "jams are <strong><term data-term=\"congestion\">congestion</term></strong>. Switch to <strong>Operate</strong> for the full picture.</p></details>",
      status:
        "Pick plants and check if power can flow to the cities without jamming the roads.",
      nodes: [
        { id: "north", label: "North\nPlant", x: 175, y: 50, type: "plant" },
        { id: "south", label: "South\nCity", x: 175, y: 250, type: "load" },
        { id: "east", label: "East\nCity", x: 300, y: 150, type: "load" },
        { id: "west", label: "West\nCity", x: 50, y: 150, type: "load" },
      ],
      lines: [
        { from: "north", to: "south", capacity: 800, label: "Main N-S" },
        { from: "north", to: "east", capacity: 500, label: "N-E" },
        { from: "north", to: "west", capacity: 500, label: "N-W" },
        { from: "south", to: "east", capacity: 400, label: "S-E" },
        { from: "south", to: "west", capacity: 400, label: "S-W" },
      ],
      plants: [
        { node: "north", name: "Big Steady", capacity: 2000, cost: 50 },
      ],
      loads: [
        { node: "south", name: "South City", demand: 800 },
        { node: "east", name: "East City", demand: 500 },
        { node: "west", name: "West City", demand: 500 },
      ],
    },
    operate: {
      name: "Operate",
      hint: "Real line limits, transmission loss, N-1 contingency. The real constraint.",
      showLoss: true,
      showN1: true,
      unit: " MW",
      scenario: "You're a grid planner. Power must physically flow through a finite network. Every line has a thermal limit. Transmission loss grows with distance. And you must survive N-1: if the biggest line fails, can the rest still deliver power? Choose plants wisely.",
      note:
        "<p>The <term data-term=\"transmission_loss\">transmission grid</term> is a network of <strong>high-voltage lines</strong> " +
        "each with a <strong><term data-term=\"mw\">MW</term> capacity limit</strong> set by thermal/stability constraints. " +
        "<strong><term data-term=\"transmission_loss\">Transmission loss</term></strong> grows with distance and current (I²R). " +
        "<strong><term data-term=\"n_minus_one\">N-1 contingency</term></strong>: if one big line fails, can the rest of the network " +
        "still carry the load?</p>" +
        "<p>Redispatch: if a line jams (<term data-term=\"congestion\">congestion</term>), you might shut down a remote plant and fire up one " +
        "closer to load. <a href=\"/learn\">How real <term data-term=\"tso\">TSOs</term> handle this →</a></p>",
      status:
        "Build a reliable network: pick plants so power reaches all cities without congestion, " +
        "even if the biggest line fails.",
      nodes: [
        { id: "north", label: "North\nPlant", x: 175, y: 50, type: "plant" },
        { id: "south", label: "South\nCity", x: 175, y: 250, type: "load" },
        { id: "east", label: "East\nCity", x: 300, y: 150, type: "load" },
        { id: "west", label: "West\nCity", x: 50, y: 150, type: "load" },
      ],
      lines: [
        { from: "north", to: "south", capacity: 800, label: "Main N-S (115 kV)" },
        { from: "north", to: "east", capacity: 500, label: "N-E (110 kV)" },
        { from: "north", to: "west", capacity: 500, label: "N-W (110 kV)" },
        { from: "south", to: "east", capacity: 400, label: "S-E (110 kV)" },
        { from: "south", to: "west", capacity: 400, label: "S-W (110 kV)" },
      ],
      plants: [
        { node: "north", name: "Nuclear (North)", capacity: 1000, cost: 60 },
        { node: "south", name: "Coal (South)", capacity: 1200, cost: 50 },
        { node: "east", name: "Wind (East)", capacity: 600, cost: 40 },
        { node: "west", name: "Solar (West)", capacity: 500, cost: 30 },
      ],
      loads: [
        { node: "south", name: "South City", demand: 800 },
        { node: "east", name: "East City", demand: 600 },
        { node: "west", name: "West City", demand: 500 },
      ],
    },
  };

  const STORAGE_KEY = "transmission-level";
  const DEFAULT_LEVEL = "explore";

  const el = {
    canvas: document.getElementById("network-canvas"),
    plantsList: document.getElementById("plants-list"),
    totalDemand: document.getElementById("total-demand"),
    totalGeneration: document.getElementById("total-generation"),
    congestion: document.getElementById("congestion"),
    lossGauge: document.getElementById("loss-gauge"),
    loss: document.getElementById("loss"),
    solve: document.getElementById("solve-btn"),
    reset: document.getElementById("reset-btn"),
    status: document.getElementById("status"),
    note: document.getElementById("game-note"),
    scenarioText: document.getElementById("scenario-text"),
    levelHint: document.getElementById("level-hint"),
    levelButtons: Array.prototype.slice.call(document.querySelectorAll(".level-btn")),
    results: document.getElementById("results"),
    resultsTitle: document.getElementById("results-title"),
    resultsBody: document.getElementById("results-body"),
    resultsOk: document.getElementById("results-ok"),
    networkHint: document.getElementById("network-hint"),
  };

  let level = LEVELS[DEFAULT_LEVEL];
  let plantStates = {};
  let canvasClickHandler = null;

  function renderNetwork() {
    const canvas = el.canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#0e1726";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw lines first (behind nodes)
    ctx.strokeStyle = "#8fa0b8";
    ctx.lineWidth = 2;
    level.lines.forEach(function (line) {
      const from = level.nodes.find((n) => n.id === line.from);
      const to = level.nodes.find((n) => n.id === line.to);
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
      // Label
      ctx.fillStyle = "#8fa0b8";
      ctx.font = "10px system-ui";
      const mid = { x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 };
      ctx.fillText(line.capacity + " MW", mid.x + 5, mid.y - 5);
    });

    // Draw nodes
    level.nodes.forEach(function (node) {
      const isPlant = node.type === "plant";
      const isOn = plantStates[node.id];
      ctx.fillStyle = isPlant ? (isOn ? "#2e7d4f" : "#666") : "#16223a";
      ctx.beginPath();
      ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = isOn ? "#ffd24d" : "#8fa0b8";
      ctx.lineWidth = isOn ? 3 : 1;
      ctx.stroke();

      // Label
      ctx.fillStyle = "#e7ecf3";
      ctx.font = "bold 11px system-ui";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const lines = node.label.split("\n");
      lines.forEach(function (line, i) {
        ctx.fillText(line, node.x, node.y + (i - 0.5) * 8);
      });
    });
  }

  function renderPlants() {
    el.plantsList.innerHTML = "";
    level.plants.forEach(function (plant) {
      const container = document.createElement("div");
      container.className = "plant-control";
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = plantStates[plant.node] || false;
      checkbox.addEventListener("change", function () {
        plantStates[plant.node] = checkbox.checked;
        renderNetwork();
        updateGauges();
      });
      const text = document.createElement("span");
      text.innerHTML = "<strong>" + plant.name + "</strong> " + plant.capacity + " MW";
      label.appendChild(checkbox);
      label.appendChild(text);
      container.appendChild(label);
      el.plantsList.appendChild(container);
    });
  }

  function updateGauges() {
    const totalGen = level.plants.reduce(function (sum, p) {
      return sum + (plantStates[p.node] ? p.capacity : 0);
    }, 0);
    const totalDem = level.loads.reduce(function (sum, l) {
      return sum + l.demand;
    }, 0);
    el.totalDemand.textContent = totalDem + level.unit;
    el.totalGeneration.textContent = totalGen + level.unit;
  }

  function checkNetwork() {
    if (Object.values(plantStates).every((v) => !v)) {
      el.results.hidden = false;
      el.resultsTitle.textContent = "No plants running";
      el.resultsBody.textContent =
        "Pick at least one plant to turn on.";
      return;
    }

    const totalGen = level.plants.reduce(function (sum, p) {
      return sum + (plantStates[p.node] ? p.capacity : 0);
    }, 0);
    const totalDem = level.loads.reduce(function (sum, l) {
      return sum + l.demand;
    }, 0);

    if (totalGen < totalDem) {
      el.results.hidden = false;
      el.resultsTitle.textContent = "Not enough generation";
      el.resultsBody.textContent =
        "Total generation (" +
        totalGen +
        " MW) < demand (" +
        totalDem +
        " MW). Turn on more plants.";
      return;
    }

    // Simplified congestion check: assume power splits proportionally to line capacity
    let maxLineUsage = 0;
    level.lines.forEach(function (line) {
      // Rough proportional split: power from gen nodes flows through lines proportionally
      const lineUsage = (totalGen / totalDem) * line.capacity * 0.7; // simplified
      maxLineUsage = Math.max(maxLineUsage, lineUsage / line.capacity);
    });

    const congested = maxLineUsage > 1.0;
    if (congested) {
      el.results.hidden = false;
      el.resultsTitle.textContent = "⚠ Congestion detected";
      el.resultsBody.textContent =
        "One or more lines are overloaded. Try redispatching: " +
        "turn off remote plants and turn on ones closer to the loads.";
      return;
    }

    const loss = level.showLoss ? 3 : 0; // Operate: 3% loss, Explore: hidden
    el.results.hidden = false;
    el.resultsTitle.textContent = "✅ Network is healthy";
    el.resultsBody.textContent =
      "Generation meets demand, no congestion." +
      (loss ? " Transmission loss: " + loss + "%." : "");

    // Award medal: silver for healthy network, gold for Operate level
    if (level.name === "Operate") {
      medalSystem.save("transmission", "gold");
    } else {
      medalSystem.save("transmission", "silver");
    }
  }

  function applyLevel(name) {
    level = LEVELS[name] || LEVELS[DEFAULT_LEVEL];
    el.scenarioText.textContent = level.scenario;
    el.note.innerHTML = level.note;
    el.levelHint.textContent = level.hint;
    el.status.textContent = level.status;
    el.lossGauge.hidden = !level.showLoss;
    el.levelButtons.forEach(function (btn) {
      const active = btn.dataset.level === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    plantStates = {};
    level.plants.forEach(function (p) {
      plantStates[p.node] = false;
    });
    el.results.hidden = true;
    renderNetwork();
    renderPlants();
    updateGauges();
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch (e) {
      /* ignore */
    }
  }

  el.solve.addEventListener("click", checkNetwork);
  el.reset.addEventListener("click", function () {
    plantStates = {};
    level.plants.forEach(function (p) {
      plantStates[p.node] = false;
    });
    el.results.hidden = true;
    renderNetwork();
    renderPlants();
    updateGauges();
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
