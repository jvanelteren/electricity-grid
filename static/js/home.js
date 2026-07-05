const LEVELS = {
  explore: {
    label: "Explore",
    showPrices: false,
    priceUnit: "€",
    energyUnit: "kWh",
    powerUnit: "kW",
    tariffLabel: "Price",
    comfort: { min: 18, max: 22 },
    maxStreetPower: 999, // not shown in Explore
    batteryRoundTrip: 0.9,
  },
  operate: {
    label: "Operate",
    showPrices: true,
    priceUnit: "€/kWh",
    energyUnit: "kWh",
    powerUnit: "kW",
    tariffLabel: "Day-ahead price",
    comfort: { min: 18, max: 22 },
    maxStreetPower: 10, // kW
    batteryRoundTrip: 0.9,
  },
};

// Campaign days
const CAMPAIGNS = [
  {
    day: 1,
    title: "Sunny Saturday",
    description:
      "A beautiful summer day: solar peaks at noon. Your EV needs 40 kWh by 7 am tomorrow. Shift your laundry and dishwasher to the cheap hours and watch the bill drop.",
    prices: [
      65, 60, 55, 50, 45, 40, 35, 30, 25, 15, 8, 5, 8, 15, 25, 35, 45, 55,
      65, 70, 75, 70, 65, 60,
    ], // €/MWh -> scaled to home
    copEmissions: [
      350, 340, 330, 310, 290, 270, 250, 200, 150, 100, 20, 10, 20, 100, 200,
      280, 350, 400, 420, 430, 440, 420, 400, 370,
    ], // gCO2/kWh
    loads: [
      { id: "ev", name: "EV Charge", energy: 40, deadline: 7, flexible: true },
      {
        id: "laundry",
        name: "Laundry",
        energy: 2,
        deadline: 23,
        flexible: true,
      },
      {
        id: "dishwasher",
        name: "Dishwasher",
        energy: 1.5,
        deadline: 23,
        flexible: true,
      },
      {
        id: "baseload",
        name: "Base Load",
        energy: 24,
        deadline: 24,
        flexible: false,
      }, // 1 kWh per hour
    ],
    baseLoad: 1, // kWh per hour
    goals: { bill: 3.5, co2: 4000 },
    hasReward: false,
  },
  {
    day: 2,
    title: "The Battery",
    description:
      "You've installed a home battery. At noon, the price goes negative — you get paid to charge! Buy low, discharge high. Storage flattens the price across the day.",
    prices: [
      70, 65, 60, 50, 40, 30, 20, 10, 5, -5, -10, 0, 5, 20, 40, 60, 70, 80,
      85, 80, 75, 70, 65, 60,
    ],
    copEmissions: [
      400, 390, 380, 360, 340, 300, 250, 150, 50, 10, 5, 15, 50, 150, 300,
      380, 420, 440, 450, 440, 420, 400, 380, 360,
    ],
    loads: [
      { id: "ev", name: "EV Charge", energy: 30, deadline: 7, flexible: true },
      {
        id: "heatpump",
        name: "Heat Pump",
        energy: 20,
        deadline: 24,
        flexible: true,
        comfort: true,
      },
      {
        id: "laundry",
        name: "Laundry",
        energy: 2,
        deadline: 23,
        flexible: true,
      },
      {
        id: "baseload",
        name: "Base Load",
        energy: 24,
        deadline: 24,
        flexible: false,
      },
    ],
    battery: { capacity: 10, roundTrip: 0.9 },
    baseLoad: 1,
    goals: { bill: 2.5, co2: 3500 },
    hasReward: false,
  },
  {
    day: 3,
    title: "The Street",
    description:
      "Everyone's smart home is chasing the same cheap 2 am hour. The transformer on your street can only handle 10 kW at once. If everyone charges then, the wire trips and nobody gets power. Spread it out.",
    prices: [
      90, 80, 70, 60, 50, 40, 30, 20, 10, 5, 2, 5, 10, 20, 50, 70, 80, 90,
      100, 95, 90, 85, 80, 75,
    ],
    copEmissions: [
      450, 440, 430, 410, 390, 350, 300, 200, 100, 30, 10, 30, 100, 200, 350,
      420, 450, 480, 500, 490, 470, 450, 430, 410,
    ],
    loads: [
      { id: "ev", name: "EV Charge", energy: 35, deadline: 7, flexible: true },
      {
        id: "heatpump",
        name: "Heat Pump",
        energy: 20,
        deadline: 24,
        flexible: true,
        comfort: true,
      },
      {
        id: "laundry",
        name: "Laundry",
        energy: 2,
        deadline: 23,
        flexible: true,
      },
      {
        id: "baseload",
        name: "Base Load",
        energy: 24,
        deadline: 24,
        flexible: false,
      },
    ],
    battery: { capacity: 10, roundTrip: 0.9 },
    baseLoad: 1,
    maxStreetPower: 10, // constraint is visible
    goals: { bill: 3, co2: 4000 },
    hasReward: false,
  },
  {
    day: 4,
    title: "Dunkelflaute",
    description:
      "Dark, windless evening. No cheap hours exist. Flexibility can move energy through time, but it can't create it. Keep warm, keep the car ready, and understand why this day is the hard problem.",
    prices: [
      150, 145, 140, 135, 130, 120, 110, 100, 90, 85, 80, 75, 70, 75, 80, 90,
      100, 120, 140, 150, 160, 155, 150, 145,
    ],
    copEmissions: [
      500, 490, 480, 470, 460, 450, 440, 430, 420, 410, 400, 390, 380, 390,
      400, 420, 450, 480, 510, 520, 530, 520, 510, 500,
    ],
    loads: [
      { id: "ev", name: "EV Charge", energy: 30, deadline: 7, flexible: true },
      {
        id: "heatpump",
        name: "Heat Pump",
        energy: 25,
        deadline: 24,
        flexible: true,
        comfort: true,
      },
      {
        id: "baseload",
        name: "Base Load",
        energy: 24,
        deadline: 24,
        flexible: false,
      },
    ],
    battery: { capacity: 10, roundTrip: 0.9 },
    baseLoad: 1,
    goals: { bill: 4.5, co2: 5500 },
    hasReward: false,
  },
];

// Game state
let gameState = {
  currentDay: 0,
  currentLevel: "explore",
  schedule: {}, // { loadId: [hour placements] }
  bill: 0,
  co2: 0,
  medals: { silver: false, gold: false },
  dayResults: [],
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  loadGameState();
  setupLevelToggle();
  startDay(gameState.currentDay);
});

function loadGameState() {
  const saved = localStorage.getItem("homeGame");
  if (saved) {
    gameState = JSON.parse(saved);
  }
}

function saveGameState() {
  localStorage.setItem("homeGame", JSON.stringify(gameState));
}

function setupLevelToggle() {
  document.querySelectorAll(".level-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".level-btn").forEach((b) =>
        b.classList.remove("is-active")
      );
      e.target.classList.add("is-active");
      gameState.currentLevel = e.target.dataset.level;
      saveGameState();
      renderGame();
    });
  });
}

function startDay(dayIndex) {
  if (dayIndex >= CAMPAIGNS.length) {
    showCampaignEnd();
    return;
  }

  gameState.currentDay = dayIndex;
  gameState.schedule = {};
  gameState.bill = 0;
  gameState.co2 = 0;

  const day = CAMPAIGNS[dayIndex];
  document.getElementById("day-title").textContent = `Day ${day.day}: ${day.title}`;
  document.getElementById("day-description").textContent = day.description;

  document.getElementById("day-results").style.display = "none";
  document.getElementById("next-day-btn").style.display = "none";

  renderGame();
}

function renderGame() {
  const day = CAMPAIGNS[gameState.currentDay];
  const level = LEVELS[gameState.currentLevel];

  renderTimeline(day, level);
  renderLoads(day, level);
  renderMetrics(day, level);
  renderGoals(day, level);

  // Setup drop zones
  setupDropZones();
}

function renderTimeline(day, level) {
  const container = document.getElementById("timeline-grid");
  container.innerHTML = "";

  // Create hour columns
  for (let hour = 0; hour < 24; hour++) {
    const col = document.createElement("div");
    col.className = "timeline-hour";
    col.dataset.hour = hour;

    // Hour label
    const label = document.createElement("div");
    label.className = "hour-label";
    label.textContent = `${hour}:00`;
    col.appendChild(label);

    // Price bar
    const priceBar = document.createElement("div");
    priceBar.className = "price-bar";
    const price = day.prices[hour];
    const priceColor = getpriceColor(price, day.prices);
    priceBar.style.background = priceColor;
    priceBar.title = `${price} €/MWh`;
    col.appendChild(priceBar);

    // Drop zone
    const dropZone = document.createElement("div");
    dropZone.className = "drop-zone";
    col.appendChild(dropZone);

    container.appendChild(col);
  }
}

function renderLoads(day, level) {
  const container = document.getElementById("load-list");
  container.innerHTML = "";

  day.loads.forEach((load) => {
    const item = document.createElement("div");
    item.className = "load-item";
    if (!load.flexible) item.classList.add("is-fixed");

    const header = document.createElement("div");
    header.className = "load-header";
    const deadline = load.deadline ? ` (by ${load.deadline}:00)` : "";
    header.innerHTML = `
      <span class="load-name">${load.name}${deadline}</span>
      <span class="load-energy">${load.energy} ${level.energyUnit}</span>
    `;

    const timeline = document.createElement("div");
    timeline.className = "load-timeline";
    timeline.dataset.loadId = load.id;

    // Initialize schedule if needed
    if (!gameState.schedule[load.id]) {
      gameState.schedule[load.id] = new Array(24).fill(false);
    }

    // Create draggable blocks for this load
    for (let hour = 0; hour < 24; hour++) {
      const block = document.createElement("div");
      block.className = "load-block";
      block.dataset.hour = hour;
      block.draggable = load.flexible;
      block.title = `Hour ${hour}:00`;

      if (gameState.schedule[load.id][hour]) {
        block.classList.add("placed");
      }

      if (load.flexible) {
        block.addEventListener("dragstart", handleDragStart);
        block.addEventListener("dragend", handleDragEnd);
      }

      timeline.appendChild(block);
    }

    item.appendChild(header);
    item.appendChild(timeline);
    container.appendChild(item);
  });
}

function renderMetrics(day, level) {
  calculateMetrics(day, level);

  document.getElementById("bill-value").textContent = `${gameState.bill.toFixed(
    2
  )} ${level.priceUnit}`;
  document.getElementById("co2-value").textContent = `${gameState.co2.toFixed(
    0
  )} kg`;
}

function renderGoals(day, level) {
  const container = document.getElementById("goals-box");
  container.innerHTML = "";

  const billGoal = document.createElement("div");
  billGoal.className = "goal-item";
  const billStatus = gameState.bill <= day.goals.bill ? "✓" : "✗";
  billGoal.innerHTML = `<span>${billStatus}</span> Bill under €${day.goals.bill.toFixed(
    2
  )}`;

  const co2Goal = document.createElement("div");
  co2Goal.className = "goal-item";
  const co2Status = gameState.co2 <= day.goals.co2 ? "✓" : "✗";
  co2Goal.innerHTML = `<span>${co2Status}</span> CO₂ under ${day.goals.co2} kg`;

  container.appendChild(billGoal);
  container.appendChild(co2Goal);
}

function calculateMetrics(day, level) {
  let bill = 0;
  let co2 = 0;

  day.loads.forEach((load) => {
    if (!gameState.schedule[load.id]) {
      gameState.schedule[load.id] = new Array(24).fill(false);
    }

    const schedule = gameState.schedule[load.id];
    const placedHours = schedule.filter((x) => x).length;

    if (placedHours > 0) {
      const energyPerHour = load.energy / placedHours;

      schedule.forEach((placed, hour) => {
        if (placed && load.flexible) {
          const price = Math.max(0, day.prices[hour]) / 1000; // MWh to kWh, no negative
          bill += energyPerHour * price;
          co2 += energyPerHour * (day.copEmissions[hour] || 0);
        }
      });
    } else if (load.flexible && load.energy > 0) {
      // If load not placed, count as unmet (penalty)
      bill += load.energy * 0.5; // High penalty rate
      co2 += load.energy * 500; // High penalty CO2
    }
  });

  // Add base load (always distributed evenly)
  const baseLoadEnergy = day.baseLoad * 24;
  const avgPrice = day.prices.reduce((a, b) => a + b) / 24 / 1000;
  const avgCO2 = day.copEmissions.reduce((a, b) => a + b) / 24;
  bill += baseLoadEnergy * avgPrice;
  co2 += baseLoadEnergy * avgCO2;

  gameState.bill = Math.max(0, bill);
  gameState.co2 = Math.max(0, co2);
}

function getpriceColor(price, allPrices) {
  const min = Math.min(...allPrices);
  const max = Math.max(...allPrices);
  const norm = (price - min) / (max - min);

  if (norm < 0.33) return "#2e7d4f"; // green (cheap)
  if (norm < 0.67) return "#ffd24d"; // yellow
  return "#d32f2f"; // red (expensive)
}

let dragState = { source: null, loadId: null, hour: null };

function handleDragStart(e) {
  const block = e.target;
  const timeline = block.closest(".load-timeline");
  const loadId = timeline.dataset.loadId;
  const hour = parseInt(block.dataset.hour);

  dragState = { source: e.target, loadId, hour };
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/plain", `${loadId}:${hour}`);
  block.classList.add("dragging");
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
  dragState = { source: null, loadId: null, hour: null };
  document.querySelectorAll(".drop-zone.drag-over").forEach((z) => {
    z.classList.remove("drag-over");
  });
}

function setupDropZones() {
  const day = CAMPAIGNS[gameState.currentDay];
  const level = LEVELS[gameState.currentLevel];

  document.querySelectorAll(".drop-zone").forEach((zone) => {
    zone.addEventListener("dragover", handleDragOver);
    zone.addEventListener("dragleave", handleDragLeave);
    zone.addEventListener("drop", (e) => handleDrop(e, day, level));
  });
}

function handleDragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
  e.target.closest(".drop-zone")?.classList.add("drag-over");
}

function handleDragLeave(e) {
  if (e.target === e.currentTarget) {
    e.target.classList.remove("drag-over");
  }
}

function handleDrop(e, day, level) {
  e.preventDefault();
  const dropZone = e.target.closest(".drop-zone");
  dropZone.classList.remove("drag-over");

  const hour = parseInt(dropZone.closest(".timeline-hour").dataset.hour);
  const { loadId } = dragState;

  if (!loadId) return;

  const load = day.loads.find((l) => l.id === loadId);
  if (!load || !load.flexible) return;

  // Initialize schedule if needed
  if (!gameState.schedule[loadId]) {
    gameState.schedule[loadId] = new Array(24).fill(false);
  }

  // Toggle placement
  gameState.schedule[loadId][hour] = !gameState.schedule[loadId][hour];

  // Validate and enforce constraints
  if (!validateSchedule(day, level)) {
    gameState.schedule[loadId][hour] = !gameState.schedule[loadId][hour];
    showError(getConstraintError(day, level));
    return;
  }

  saveGameState();
  renderGame();
  checkDayComplete(day);
}

function validateSchedule(day, level) {
  // Check deadline constraints
  for (let i = 0; i < day.loads.length; i++) {
    const load = day.loads[i];
    if (!load.flexible) continue;

    const schedule = gameState.schedule[load.id];
    if (!schedule) continue;

    // Count placed slots
    const placed = schedule.filter((x) => x).length;
    const needed = Math.ceil(load.energy / 1); // simplified: 1 kWh per hour

    // Check deadline
    if (load.deadline) {
      const placedByDeadline = schedule
        .slice(0, load.deadline)
        .filter((x) => x).length;
      if (placed > 0 && placedByDeadline < placed) {
        return false; // Some placements are past deadline
      }
    }
  }

  // Check street power limit on day 3+
  if (gameState.currentDay >= 2) {
    const maxPower = level.maxStreetPower || 999;
    for (let hour = 0; hour < 24; hour++) {
      let hourlyPower = 0;
      for (const load of day.loads) {
        if (gameState.schedule[load.id]?.[hour]) {
          hourlyPower += load.energy / 24; // Simplified
        }
      }
      if (hourlyPower > maxPower) {
        return false; // Street overload
      }
    }
  }

  return true;
}

function getConstraintError(day, level) {
  if (gameState.currentDay >= 2) {
    return "Street congestion — the local transformer can only handle 10 kW at once. Spread your loads across different hours.";
  }
  return "Check load deadlines and comfort constraints.";
}

function showError(msg) {
  // Flash an error message
  const note = document.querySelector(".game-note");
  if (note) {
    const oldText = note.innerHTML;
    note.innerHTML = `<p style="color: #d32f2f;"><strong>⚠ ${msg}</strong></p>`;
    setTimeout(() => {
      note.innerHTML = oldText;
    }, 3000);
  }
}

function checkDayComplete(day) {
  // Check if all mandatory loads are scheduled
  const allLoads = day.loads.filter((l) => l.flexible);
  const allPlaced = allLoads.every((load) => {
    const schedule = gameState.schedule[load.id];
    return schedule && schedule.filter((x) => x).length > 0;
  });

  if (allPlaced) {
    document.getElementById("next-day-btn").style.display = "inline-block";
  }
}

// Reset day
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("reset-day-btn").addEventListener("click", () => {
    startDay(gameState.currentDay);
  });

  document.getElementById("next-day-btn")?.addEventListener("click", () => {
    const day = CAMPAIGNS[gameState.currentDay];
    const level = LEVELS[gameState.currentLevel];

    // Calculate stars
    const billStar = gameState.bill <= day.goals.bill;
    const co2Star = gameState.co2 <= day.goals.co2;
    const stars = (billStar ? 1 : 0) + (co2Star ? 1 : 0);

    gameState.dayResults.push({
      day: gameState.currentDay + 1,
      stars,
      bill: gameState.bill,
      co2: gameState.co2,
    });

    startDay(gameState.currentDay + 1);
  });
});

function showCampaignEnd() {
  document.getElementById("game-container").innerHTML = `
    <div class="campaign-summary">
      <h2>Campaign Complete!</h2>
      <p>Over four days, you learned to shift your home's consumption to cheap and clean hours.</p>
      <p>Now imagine two million households doing what you just did...</p>
      <div id="epilogue-reveal"></div>
      <button class="game-button" onclick="location.reload()">Start Over</button>
    </div>
  `;

  // Show epilogue visualization
  setTimeout(() => {
    document.getElementById("epilogue-reveal").innerHTML = `
      <p><strong>The result:</strong> The evening peak flattens. Gas plants stay offline. The grid you balanced in Game 1 is now steady from below.</p>
      <p>You've been a power plant all along — just one that stores demand instead of making energy.</p>
    `;
  }, 500);

  medalSystem.save("home", gameState.medals);
  saveGameState();
}
