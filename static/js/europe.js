// "In Sync" — the continental grid is one machine. You were never balancing alone.
//
// Capstone: recontextualizes G1's balance mechanic at continental scale.
// Four days, one concept: cooperation + self-reliance.
//
// Day 1 (Island): Balance alone. Hard, expensive, shows why isolation is undesirable.
// Day 2 (Connect): Same day, now coupled to continent. Easy, cheap. Two reasons visible:
//   - Shared inertia (your wobble hardly dents the huge machine)
//   - Imbalance netting (neighbour's surplus cancels your shortfall before anyone moves)
// Day 3 (Reactor trip): French reactor fails. Frequency dips everywhere instantly.
//   Your plants auto-push without orders (FCR/aFRR at continental scale + G4 hook: cheapest dispatch).
// Day 4 (Split): Border interconnectors trip. Machine splits in two. You're back to Day 1
//   (alone, hard, must survive on own reserves). This teaches: cooperation reduces cost,
//   but you can't rely on it entirely. The TSO dilemma encoded in a medal condition.
//
// Medal logic:
// Silver: survive the split (Day 4, no blackout on your island, any level).
// Gold: 3 stars on total campaign cost (benchmark set to require cooperation days 2–3,
//   but day 4 punishes over-reliance). Player must thread the needle: cooperate for cost,
//   stay ready to stand alone.

(function () {
  "use strict";

  const NOMINAL_HZ = 50;
  const SENSITIVITY = 0.00008;
  const FCR_DAMPING = 0.02;

  const SCENARIOS = {
    explore: [
      {
        day: 1,
        title: "Day 1: Island — You balance alone",
        scenario: "It's a Tuesday. You're the TSO for your country. Your frequency is yours alone. No neighbours to help. A wobble hits — demand spikes 300 MW. Can you balance it with your own reserves?",
        coupled: false,
        demand_pattern: "normal",
        disturbance_mw: 300,
        disturbance_at: 10,
        reserves_cost: 60,
        solo_cost_estimate: 18000, // 300 * 60
        lesson: "Alone, every wobble is entirely yours — and so is the bill. Every MW of help had to come from your own expensive reserves. Remember this day.",
      },
      {
        day: 2,
        title: "Day 2: Connect — Your wheel is joined to everyone's",
        scenario: "Same Tuesday, same wobbles. But now your grid is coupled to the continent. The same demand spike hits. Watch what happens.",
        coupled: true,
        demand_pattern: "normal",
        disturbance_mw: 300,
        disturbance_at: 10,
        reserves_cost: 60,
        solo_cost_estimate: 18000,
        netting_savings: 0.4, // 40% cheaper due to netting + shared inertia
        lesson: "The same wobble, but the continent's huge shared machine absorbed most of it — your frequency barely moved. And a neighbour's surplus cancelled part of your shortfall before any reserves started. Same day, 40% cheaper.",
      },
      {
        day: 3,
        title: "Day 3: Reactor trip — A plant in France fails",
        scenario: "Wednesday afternoon. A nuclear reactor in France suddenly trips offline — 1000 MW gone. The frequency dips everywhere on the continent at the same instant, including in your country. Watch what your own plants do about a French problem, without anyone asking them.",
        coupled: true,
        demand_pattern: "normal",
        disturbance_mw: 1000,
        disturbance_at: 12,
        disturbance_location: "france",
        reserves_cost: 60,
        solo_cost_estimate: 60000,
        netting_savings: 0.5,
        lesson: "Your plants pushed back within seconds without being asked — the automatic smoothing from the first game, now working across a whole continent, because a shared frequency is a shared problem. Then the cheapest available help was called up across borders — yours — and you got paid for it. Solidarity here isn't policy; it's physics.",
      },
      {
        day: 4,
        title: "Day 4: The split — A border line trips",
        scenario: "Thursday evening. A major interconnector between your region and the continent trips offline mid-crisis. Your side islands. You're alone again, mid-emergency, with only your own reserves. Can you survive?",
        coupled: true,
        will_split: true,
        split_at: 15,
        demand_pattern: "evening_peak",
        disturbance_mw: 400,
        disturbance_at: 8,
        reserves_cost: 80,
        lesson: "All campaign, the continent made your life easy and cheap. Then one line failed and none of that help could reach you. This is the operator's dilemma: cooperate to save money, but always stay ready to stand alone.",
      },
    ],
    operate: [
      {
        day: 1,
        title: "Day 1: Island — Balancing alone",
        scenario: "You're the TSO for the Netherlands. Frequency is yours to manage, your reserves to activate. A 400 MW demand spike hits. Your aFRR activation costs ~€80/MWh × 400 MW = €32k.",
        coupled: false,
        demand_pattern: "normal",
        disturbance_mw: 400,
        disturbance_at: 10,
        reserves_cost: 80,
        solo_cost_estimate: 32000,
        lesson: "An isolated control area pays full price for every disturbance: all 400 MW came from your own aFRR at €80/MWh. No netting, no cross-border bids, no shared inertia. This is the baseline the rest of the campaign beats.",
      },
      {
        day: 2,
        title: "Day 2: Connect — Continental coupling",
        scenario: "Same day, same demand pattern — but now your grid is synchronized with Germany and France. The same 400 MW spike hits. Shared inertia softens the dip, and IGCC imbalance netting cancels nearly half your shortfall against neighbours' surpluses before any reserves activate.",
        coupled: true,
        demand_pattern: "normal",
        disturbance_mw: 400,
        disturbance_at: 10,
        reserves_cost: 80,
        solo_cost_estimate: 32000,
        netting_savings: 0.45,
        lesson: "Same disturbance, nearly half the reserve activation. Two reasons: shared inertia means your wobble barely dents the continental machine, and imbalance netting cancels your shortfall against someone else's surplus — free balancing, before a single bid is activated. Cooperation saved €14,400 today.",
      },
      {
        day: 3,
        title: "Day 3: Reactor trip — Cross-border dispatch (PICASSO)",
        scenario: "A 1 GW French reactor trips. Frequency dips across the whole synchronous area. Within seconds, FCR everywhere — including yours — pushes back automatically. Then PICASSO activates the cheapest aFRR bids across borders: your providers, at €60/MWh, undercut France's own reserves at €80/MWh.",
        coupled: true,
        demand_pattern: "normal",
        disturbance_mw: 1000,
        disturbance_at: 12,
        disturbance_location: "france",
        reserves_cost: 80,
        cross_border_price: 60,
        solo_cost_estimate: 80000,
        netting_savings: 0.4,
        lesson: "First inertia and continent-wide FCR arrested the dip — automatic, within seconds, no orders given. Then aFRR was dispatched cheapest-first across Europe via PICASSO, and since your bids sat below the cross-border marginal price, helping France turned a profit. Cooperation isn't charity.",
      },
      {
        day: 4,
        title: "Day 4: The split — Resynchronization crisis",
        scenario: "Evening peak, high demand — and you're running lean on reserves, because days 2–3 taught you that cooperation is cheap. Then a 380 kV interconnector trips and your region splits from the continent. Two grids now, two frequencies. Nobody's surplus can reach you across the gap. Survive on what you kept.",
        coupled: true,
        will_split: true,
        split_at: 15,
        demand_pattern: "evening_peak",
        disturbance_mw: 500,
        disturbance_at: 8,
        reserves_cost: 90,
        solo_cost_estimate: 45000,
        lesson: "Europe has split for real — in 2006, in 2021, and Iberia went dark in 2025. The split day asks the only question that matters: did you keep enough reserves to stand alone? Balancing cooperation's savings against self-reliance is the real TSO job.",
      },
    ],
  };

  const STORAGE_KEY = "europe-level";
  const DEFAULT_LEVEL = "explore";

  let level = DEFAULT_LEVEL;
  let currentDay = 1;
  let scenario = null;
  let state = {
    tick: 0,
    running: false,
    frequency_local: NOMINAL_HZ,
    frequency_continental: NOMINAL_HZ,
    cost_today: 0,
    cost_campaign: 0,
    blackout_today: false,
    blackout_campaign: false,
    split_occurred: false,
  };

  const el = {
    levelButtons: Array.prototype.slice.call(document.querySelectorAll(".level-btn")),
    levelHint: document.getElementById("level-hint"),
    scenarioText: document.getElementById("scenario-text"),
    note: document.getElementById("game-note"),
    dayTitle: document.getElementById("day-title"),
    canvas: document.getElementById("frequency-canvas"),
    frequencyLocal: document.getElementById("frequency-local"),
    frequencyContinental: document.getElementById("frequency-continental"),
    costToday: document.getElementById("cost-today"),
    costCampaign: document.getElementById("cost-campaign"),
    startBtn: document.getElementById("start-btn"),
    resetBtn: document.getElementById("reset-btn"),
    nextDayBtn: document.getElementById("next-day-btn"),
    dayResults: document.getElementById("day-results"),
    dayResultsTitle: document.getElementById("day-results-title"),
    dayResultsBody: document.getElementById("day-results-body"),
    dayResultsLesson: document.getElementById("day-results-lesson"),
    campaignSummary: document.getElementById("campaign-summary"),
    campaignTitle: document.getElementById("campaign-title"),
    campaignBody: document.getElementById("campaign-body"),
    campaignPlayAgain: document.getElementById("campaign-play-again"),
  };

  let canvas_ctx = null;
  let simulation_timer = null;

  function initCanvas() {
    canvas_ctx = el.canvas.getContext("2d");
    el.canvas.width = 600;
    el.canvas.height = 200;
  }

  function drawFrequency() {
    const ctx = canvas_ctx;
    ctx.fillStyle = "#0e1726";
    ctx.fillRect(0, 0, el.canvas.width, el.canvas.height);

    // Background bands: safe zone in green, danger in red
    const h = el.canvas.height;
    const center = h / 2;
    const scale_hz_to_px = 30; // 1 Hz = 30 pixels

    // Safe zone (49.5-50.5 Hz)
    ctx.fillStyle = "rgba(46, 125, 79, 0.2)";
    ctx.fillRect(0, center - scale_hz_to_px * 0.5, el.canvas.width, scale_hz_to_px);

    // Danger zones
    ctx.fillStyle = "rgba(192, 57, 43, 0.2)";
    ctx.fillRect(0, 0, el.canvas.width, center - scale_hz_to_px * 0.5); // above 50.5
    ctx.fillRect(0, center + scale_hz_to_px * 0.5, el.canvas.width, center - scale_hz_to_px * 0.5); // below 49.5

    // Grid lines
    ctx.strokeStyle = "#8fa0b8";
    ctx.lineWidth = 1;
    for (let f = 48; f <= 52; f += 0.5) {
      const y = center - (f - NOMINAL_HZ) * scale_hz_to_px;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(el.canvas.width, y);
      ctx.stroke();
    }

    // Current frequency lines
    const freq_local_y = center - (state.frequency_local - NOMINAL_HZ) * scale_hz_to_px;
    const freq_cont_y = center - (state.frequency_continental - NOMINAL_HZ) * scale_hz_to_px;

    // Local frequency (solid line)
    ctx.strokeStyle = "#ffd24d";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, freq_local_y);
    ctx.lineTo(el.canvas.width, freq_local_y);
    ctx.stroke();

    // Continental frequency (dashed line, if coupled)
    if (scenario.coupled) {
      ctx.strokeStyle = "#7fe0a3";
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, freq_cont_y);
      ctx.lineTo(el.canvas.width, freq_cont_y);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Labels
    ctx.fillStyle = "#e7ecf3";
    ctx.font = "10px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("52 Hz", 5, 20);
    ctx.fillText("50 Hz", 5, center + 10);
    ctx.fillText("48 Hz", 5, h - 10);
  }

  function tick() {
    state.tick += 1;

    // Simplified dynamics: local frequency affected by disturbance, damped by reserves
    if (state.tick === scenario.disturbance_at) {
      // Disturbance hits
      const imbalance = scenario.disturbance_mw;
      state.frequency_local -= (imbalance / 4000) * 0.8; // dip
    }

    // FCR: automatic recovery
    state.frequency_local += (NOMINAL_HZ - state.frequency_local) * FCR_DAMPING;

    // If coupled, blend with continental frequency
    if (scenario.coupled && !state.split_occurred) {
      // Continental frequency: smaller dip due to huge inertia
      if (state.tick === scenario.disturbance_at) {
        const cont_imbalance = scenario.disturbance_mw * 0.15; // continent is 7x larger
        state.frequency_continental -= (cont_imbalance / 4000) * 0.8;
      }
      state.frequency_continental += (NOMINAL_HZ - state.frequency_continental) * FCR_DAMPING;

      // Coupling: your frequency is pulled toward continental
      const coupling = 0.3;
      state.frequency_local += (state.frequency_continental - state.frequency_local) * coupling;
    }

    // Split logic
    if (scenario.will_split && state.tick === scenario.split_at) {
      state.split_occurred = true;
      // Your island dips hard because you lose the continental anchor
      state.frequency_local -= 0.3; // additional dip as inertia is lost
    }

    // Blackout if frequency dips too far
    if (state.frequency_local < 49.5) {
      state.blackout_today = true;
    }

    // Render
    el.frequencyLocal.textContent = state.frequency_local.toFixed(2) + " Hz";
    if (scenario.coupled) {
      el.frequencyContinental.textContent = state.frequency_continental.toFixed(2) + " Hz";
    }
    drawFrequency();

    // Simulation runs for 30 ticks
    if (state.tick >= 30) {
      clearInterval(simulation_timer);
      endDay();
    }
  }

  function startDay() {
    state = {
      tick: 0,
      running: true,
      frequency_local: NOMINAL_HZ,
      frequency_continental: NOMINAL_HZ,
      cost_today: 0,
      blackout_today: false,
      split_occurred: false,
    };

    el.dayResults.hidden = true;
    simulation_timer = setInterval(tick, 100);
  }

  function endDay() {
    state.running = false;

    // Calculate cost for this day
    const base_cost = scenario.disturbance_mw * scenario.reserves_cost;
    let actual_cost = base_cost;

    if (scenario.coupled && scenario.netting_savings && !state.split_occurred) {
      // Netting reduces cost
      actual_cost = base_cost * (1 - scenario.netting_savings);
    }

    state.cost_today = actual_cost;
    state.cost_campaign += actual_cost;

    el.costToday.textContent = "€" + Math.round(actual_cost);
    el.costCampaign.textContent = "€" + Math.round(state.cost_campaign);

    // Results
    el.dayResults.hidden = false;
    if (state.blackout_today) {
      if (state.split_occurred) {
        el.dayResultsTitle.textContent = "⚠ Blackout — the split isolated you mid-crisis";
        el.dayResultsBody.textContent = `Your frequency dipped below 49.5 Hz when the interconnector tripped. You didn't have enough reserves to survive alone. This is why TSOs don't rely entirely on cooperation.`;
      } else {
        el.dayResultsTitle.textContent = "⚠ Blackout — frequency collapse";
        el.dayResultsBody.textContent = `Your frequency dipped below 49.5 Hz and stayed there too long. In the real grid, automatic load shedding would already be switching customers off to stop a full collapse.`;
      }
    } else {
      if (state.split_occurred) {
        el.dayResultsTitle.textContent = `✅ Island survived — cost €${Math.round(actual_cost)}`;
        el.dayResultsBody.textContent = `You kept your island alive on your own reserves until resynchronization. That's the campaign's hard lesson: enjoy cheap cooperation while the machine is whole, and hold enough reserves for the day it isn't.`;
      } else if (scenario.coupled) {
        el.dayResultsTitle.textContent = `✅ Day ${currentDay} — cost €${Math.round(actual_cost)}`;
        const savings = scenario.netting_savings ? (base_cost - actual_cost) : 0;
        el.dayResultsBody.textContent = savings > 0
          ? `Cooperation saved €${Math.round(savings)}. Imbalance netting and continental inertia made this day cheap.`
          : `Day completed. Interconnection helped you stay stable.`;
      } else {
        el.dayResultsTitle.textContent = `✅ Day ${currentDay} alone — cost €${Math.round(actual_cost)}`;
        el.dayResultsBody.textContent = `You balanced alone. Expensive and risky. This is why every TSO wants interconnections.`;
      }
    }

    el.dayResultsLesson.textContent = scenario.lesson;

    if (currentDay < 4) {
      el.nextDayBtn.hidden = false;
    } else {
      el.nextDayBtn.hidden = true;
      showCampaignSummary();
    }
  }

  function nextDay() {
    currentDay += 1;
    if (currentDay <= 4) {
      const scenarios_list = level === "operate" ? SCENARIOS.operate : SCENARIOS.explore;
      scenario = scenarios_list[currentDay - 1];
      el.dayTitle.textContent = scenario.title;
      el.scenarioText.textContent = scenario.scenario;
      el.dayResults.hidden = true;
      startDay();
    }
  }

  function showCampaignSummary() {
    el.dayResults.hidden = true;
    el.campaignSummary.hidden = false;

    const total_cost = state.cost_campaign;
    const cost_benchmark = level === "operate" ? 85000 : 40000; // Benchmark requires cooperation to hit 3 stars
    const stars = total_cost <= cost_benchmark ? 3 : total_cost <= cost_benchmark * 1.3 ? 2 : 1;
    const survived_split = !state.blackout_today; // Day 4 result

    let medal = null;
    if (survived_split) {
      medal = stars >= 3 ? "gold" : "silver";
    }

    el.campaignTitle.textContent = `Campaign: €${Math.round(total_cost)} ${stars >= 3 ? "⭐⭐⭐" : stars >= 2 ? "⭐⭐" : "⭐"}`;
    el.campaignBody.innerHTML = `
      <p><strong>Total balancing cost across 4 days: €${Math.round(total_cost)}</strong></p>
      <p>You learned why Europe is one synchronous area: shared inertia absorbs wobbles, imbalance netting cuts costs, cooperation is cheaper. But when the split happened on day 4, you needed reserves you'd built up. Gold required threading the needle: cooperate for cost, stay ready to stand alone.</p>
      <p>${survived_split ? "✅ You survived the split." : "❌ The split isolated you mid-crisis and you blacked out."}</p>
      <p>${stars >= 3 ? "⭐⭐⭐ Perfect campaign — you balanced cooperation and self-reliance." : stars >= 2 ? "⭐⭐ Good campaign — but could have optimized better." : "⭐ Expensive campaign — cooperation saves money, but you also need reserves."}</p>
    `;

    if (medal) {
      medalSystem.save("europe", medal);
    }
  }

  function applyLevel(name) {
    level = name;
    const hint = name === "operate" ? "Real TSO scenarios, real reserve costs, real platforms." : "Plain language. One shared machine — and the day it splits.";
    el.levelHint.textContent = hint;

    const note = name === "operate"
      ? `<p>A four-day campaign across the continental <term data-term="synchronous_area">synchronous area</term> — one machine from Lisbon to Istanbul.</p>
         <p><strong>Day 1:</strong> island operation — every disturbance met by your own <term data-term="reserve">reserves</term>, at full price.</p>
         <p><strong>Day 2:</strong> coupled to the continent — shared inertia softens the dip, and <term data-term="igcc">IGCC</term> netting cancels imbalances before reserves activate.</p>
         <p><strong>Day 3:</strong> a French reactor trips — <term data-term="fcr">FCR</term> reacts continent-wide, then <term data-term="picasso">PICASSO</term> dispatches the cheapest <term data-term="afrr">aFRR</term> across borders.</p>
         <p><strong>Day 4:</strong> the split — an <term data-term="interconnector">interconnector</term> trips, the machine tears in two, and only your own reserves count.</p>
         <p><strong>Gold requires both:</strong> the low costs of cooperation on days 2–3 <em>and</em> surviving day 4 alone. That's the TSO dilemma.</p>`
      : `<p>Four days, one lesson: you were never balancing alone.</p>
         <p><strong>Day 1:</strong> your grid by itself. Twitchy, hard, expensive.</p>
         <p><strong>Day 2:</strong> your wheel is joined to everyone else's. The same wobble barely registers — a huge, heavy machine is very hard to shake.</p>
         <p><strong>Day 3:</strong> a power plant in France fails, and the dip shows up on your dials at the same instant. Your plants help automatically — and you get paid for it.</p>
         <p><strong>Day 4:</strong> the split. A border line fails, the machine tears into two islands with two frequencies, and you're on your own again — mid-crisis.</p>
         <p><strong>The lesson:</strong> being connected keeps everyone steady and saves everyone money. But keep enough reserves of your own for the day the connection breaks.</p>`

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
    currentDay = 1;
    const scenarios_list = level === "operate" ? SCENARIOS.operate : SCENARIOS.explore;
    scenario = scenarios_list[0];

    state = {
      tick: 0,
      running: false,
      frequency_local: NOMINAL_HZ,
      frequency_continental: NOMINAL_HZ,
      cost_today: 0,
      cost_campaign: 0,
      blackout_today: false,
      blackout_campaign: false,
      split_occurred: false,
    };

    el.dayTitle.textContent = scenario.title;
    el.scenarioText.textContent = scenario.scenario;
    el.frequencyLocal.textContent = "50.00 Hz";
    el.frequencyContinental.hidden = !scenario.coupled;
    el.costToday.textContent = "€0";
    el.costCampaign.textContent = "€0";
    el.dayResults.hidden = true;
    el.campaignSummary.hidden = true;
    drawFrequency();
  }

  el.startBtn.addEventListener("click", startDay);
  el.resetBtn.addEventListener("click", reset);
  el.nextDayBtn.addEventListener("click", nextDay);
  el.campaignPlayAgain.addEventListener("click", reset);
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
