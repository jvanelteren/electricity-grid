// "The Bidder" — 4-day campaign learning market price mechanics.
//
// Each day teaches a price phenomenon through scripted scenarios:
// Day 1: Calm — learn the basic loop. Bid at cost, see clearing price.
// Day 2: Peak — scarcity spikes price; greed gets punished (bid too high, miss peak).
// Day 3: Storm — wind floods the stack near zero; your plant doesn't run (€5, maybe negative).
//        The lesson: sometimes not running is the right outcome.
// Day 4: Cold snap + outage — you become the marginal plant; your bid sets the national price.
//        Capstone: individual bid, systemic impact. (Operate: G1 hook—imbalance € appears.)
//
// Explore: 3 bid slots per day (morning/afternoon/evening), plain language, real plant names.
// Operate: 24 hourly bids €/MWh, real terms (day-ahead auction, clearing price, merit order),
//          supply curve chart, G1 integration (imbalance settlement on Day 4).

(function () {
  "use strict";

  // Scenario data for each of the 4 days.
  const DAYS = {
    explore: [
      {
        day: 1,
        title: "Day 1: Calm market",
        scenario:
          "A normal day. Demand is steady. Competitors bid at their usual cost. You bid your gas plant's cost (€40). What happens when the market clears?",
        periods: ["Morning", "Afternoon", "Evening"],
        demand: [800, 1000, 900],
        competitors: [
          { id: "solar", name: "Solar", capacity: 300, cost: 15 },
          { id: "wind", name: "Wind", capacity: 200, cost: 20 },
          { id: "coal", name: "Coal", capacity: 400, cost: 35 },
        ],
        plantCost: 40,
        lesson:
          "✅ The market filled up with the cheap plants first and only called on you when demand outgrew them. And when you were the last plant needed, your bid became the price, so you broke even. Bidding your true cost never loses you money.",
      },
      {
        day: 2,
        title: "Day 2: Evening peak",
        scenario:
          "A cold evening is coming: demand will outgrow everything the cheap plants can make, and the market will need every plant it can find, including yours. Someone's bid is going to set the price for the whole country. Whose?",
        periods: ["Morning", "Afternoon", "Evening (Peak)"],
        demand: [700, 900, 1400],
        competitors: [
          { id: "solar", name: "Solar", capacity: 300, cost: 15 },
          { id: "wind", name: "Wind", capacity: 150, cost: 20 },
          { id: "coal", name: "Coal", capacity: 400, cost: 35 },
        ],
        plantCost: 40,
        lesson:
          "In the evening peak the market needed every plant on the table, so the most expensive bid set the price, and everyone got paid it, cheap wind included. That's scarcity: the fewer plants left over, the more the last one needed can name its price.",
      },
      {
        day: 3,
        title: "Day 3: Storm (wind floods the market)",
        scenario:
          "A storm brings high wind. Wind plants flood the market with near-zero bids, and demand is only moderate. The cheap end of the stack covers almost everything. Do you run your €40 plant, or sit this one out?",
        periods: ["Morning", "Afternoon", "Evening"],
        demand: [750, 850, 900],
        competitors: [
          { id: "solar", name: "Solar", capacity: 100, cost: 15 },
          { id: "wind", name: "Wind", capacity: 600, cost: 5 }, // Storm: lots of wind, bids at €5
          { id: "coal", name: "Coal", capacity: 400, cost: 35 },
        ],
        plantCost: 40,
        lesson:
          "The storm's cheap wind covered most of the day, and the price never reached your €40 cost. Your plant sat idle, and that was the right outcome: running below cost means paying to work. Knowing when not to run is a skill.",
      },
      {
        day: 4,
        title: "Day 4: Cold snap + plant outage (You set the price)",
        scenario:
          "Extreme cold. Heating demand spikes to 2000 MW. A major coal plant is suddenly offline. Now the market needs your plant. Your bid will literally set the clearing price the whole country pays.",
        periods: ["Morning", "Afternoon", "Evening (Critical)"],
        demand: [1100, 1300, 2000],
        competitors: [
          { id: "solar", name: "Solar", capacity: 200, cost: 15 },
          { id: "wind", name: "Wind", capacity: 250, cost: 20 },
          { id: "coal_offline", name: "Coal (offline)", capacity: 0, cost: 999 }, // Outage
        ],
        plantCost: 40,
        lesson:
          "With the big coal plant offline, the market couldn't cover the peak without you. You were the marginal plant: whatever you bid became the price the entire country paid, for every plant, not just yours. One plant's bid, everyone's price.",
      },
    ],
    operate: [
      {
        day: 1,
        title: "Day 1: Baseline forecast",
        scenario:
          "Day-ahead auction: normal 24-hour forecast. Demand curve smooth. Competitors bid at cost. Learn the loop: bid, clear, settle.",
        hours: 24,
        demand: null, // Will use realistic curve
        forecastAccuracy: 1.0, // Perfect forecast
        competitors: [
          { id: "solar", name: "Solar", capacity: 400, cost: 10 },
          { id: "wind", name: "Wind", capacity: 350, cost: 15 },
          { id: "coal", name: "Coal", capacity: 450, cost: 40 },
          { id: "nuclear", name: "Nuclear", capacity: 300, cost: 25 },
        ],
        plantCost: 50,
        lesson:
          "Bids stack cheapest-first: that's the merit order. The last bid needed each hour sets the clearing price, and everyone who runs is paid that price, not their own bid. On a calm day the price never climbs to your €50, so you rarely run. Normal life at the expensive end of the stack.",
      },
      {
        day: 2,
        title: "Day 2: Peak pricing",
        scenario:
          "The day-ahead forecast shows a strong evening peak. Watch the clearing price hour by hour: as demand climbs, the auction reaches deeper into the merit order and the price steps up with it. Where does your €50 plant start to matter?",
        hours: 24,
        demand: null,
        forecastAccuracy: 1.0,
        competitors: [
          { id: "solar", name: "Solar", capacity: 400, cost: 10 },
          { id: "wind", name: "Wind", capacity: 300, cost: 15 },
          { id: "coal", name: "Coal", capacity: 450, cost: 40 },
          { id: "nuclear", name: "Nuclear", capacity: 300, cost: 25 },
          { id: "gas_comp", name: "Competitor Gas", capacity: 250, cost: 55 },
        ],
        plantCost: 50,
        lesson:
          "Compare the quiet night with the evening peak: higher demand reaches deeper into the merit order, and the clearing price climbs from the cheap bids to the expensive ones. Whoever is last in line, the marginal plant, sets the price for everyone that hour.",
      },
      {
        day: 3,
        title: "Day 3: Renewable flood (negative prices possible)",
        scenario:
          "Forecast: high wind, low demand. Wind bids near zero and floods the cheap end of the stack, so the clearing price collapses. What does the expensive end of the merit order do on a day like this?",
        hours: 24,
        demand: null,
        forecastAccuracy: 1.0,
        competitors: [
          { id: "solar", name: "Solar", capacity: 300, cost: 10 },
          { id: "wind", name: "Wind", capacity: 700, cost: 2 }, // Massive wind, near-zero cost
          { id: "coal", name: "Coal", capacity: 450, cost: 40 },
          { id: "nuclear", name: "Nuclear", capacity: 300, cost: 25 },
        ],
        plantCost: 50,
        lesson:
          "Wind bid almost nothing and covered nearly everything: the merit order ran wind, then solar, then nuclear, and the price stayed far below your €50 cost. You stayed out. Running would have lost €48 on every MWh. In the real market, prices even dip below zero on days like this, with producers paying to keep running.",
      },
      {
        day: 4,
        title: "Day 4: Cold snap — reality beats the forecast",
        scenario:
          "The forecast said a normal day. Reality: a cold snap sends demand 40% above forecast, and the market suddenly needs every MW it can get, including yours. The day-ahead plan is broken. What does your bid do to the price now?",
        hours: 24,
        demand: null,
        forecastAccuracy: 0.6, // Reality deviates: cold snap
        competitors: [
          { id: "solar", name: "Solar", capacity: 400, cost: 10 },
          { id: "wind", name: "Wind", capacity: 350, cost: 15 },
          { id: "coal", name: "Coal", capacity: 450, cost: 40 },
          { id: "nuclear", name: "Nuclear", capacity: 300, cost: 25 },
        ],
        plantCost: 50,
        lesson:
          "Demand blew past the forecast, the whole stack ran, and you were the marginal plant. Your bid set the national price. In the real grid, the gap between the day-ahead plan and reality doesn't vanish: it becomes imbalance, settled at prices like the ones you fought in Balance the Grid.",
      },
    ],
  };

  // Generate realistic 24-hour demand curve
  function generateDemandCurve(day, peakFactor = 1.0) {
    const curve = [];
    for (let h = 0; h < 24; h++) {
      // Base 800 MW, peak evening (18-20), low night (1-6)
      const base = 800 * peakFactor;
      let demand = base;
      if ([18, 19, 20].includes(h)) demand = base + 400;
      else if ([1, 2, 3, 4, 5, 6].includes(h)) demand = base - 200;
      else if ([12, 13].includes(h)) demand = base + 100;
      curve.push(Math.max(300, demand));
    }
    return curve;
  }

  const STORAGE_KEY = "market-day";
  const DEFAULT_LEVEL = "explore";

  let level = DEFAULT_LEVEL;
  let currentDay = 1;
  let dayData = null;
  let state = {
    bids: {},
    results: {},
    cumulativeProfit: 0,
    gameOver: false,
  };

  const el = {
    levelButtons: Array.prototype.slice.call(document.querySelectorAll(".level-btn")),
    levelHint: document.getElementById("level-hint"),
    scenarioText: document.getElementById("scenario-text"),
    note: document.getElementById("game-note"),
    dayTitle: document.getElementById("day-title"),
    dayPanel: document.getElementById("day-panel"),
    biddingSlots: document.getElementById("bidding-slots"),
    submitBtn: document.getElementById("submit-btn"),
    resetBtn: document.getElementById("reset-btn"),
    dayResults: document.getElementById("day-results"),
    dayResultsTitle: document.getElementById("day-results-title"),
    dayResultsBody: document.getElementById("day-results-body"),
    dayResultsLesson: document.getElementById("day-results-lesson"),
    nextDayBtn: document.getElementById("next-day-btn"),
    campaignSummary: document.getElementById("campaign-summary"),
    campaignTitle: document.getElementById("campaign-title"),
    campaignBody: document.getElementById("campaign-body"),
    campaignPlayAgain: document.getElementById("campaign-play-again"),
    supplyChart: document.getElementById("supply-chart"),
  };

  function renderBiddingSlots() {
    el.biddingSlots.innerHTML = "";
    const isOperate = level === "operate";
    const periods = isOperate ? Array.from({ length: 24 }, (_, i) => `Hour ${i < 10 ? "0" + i : i}`) : dayData.periods;

    periods.forEach((period, idx) => {
      const container = document.createElement("div");
      container.className = "bidding-slot";

      const label = document.createElement("label");
      label.textContent = period;

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = dayData.plantCost - 20;
      slider.max = dayData.plantCost + 40;
      slider.step = 1;
      slider.value = dayData.plantCost;
      slider.dataset.slot = idx;

      const value = document.createElement("span");
      value.className = "bid-value";
      value.textContent = "€" + slider.value + (isOperate ? "/MWh" : "");

      slider.addEventListener("input", function () {
        value.textContent = "€" + slider.value + (isOperate ? "/MWh" : "");
        state.bids[idx] = parseFloat(slider.value);
      });

      state.bids[idx] = dayData.plantCost;

      label.appendChild(slider);
      label.appendChild(value);
      container.appendChild(label);
      el.biddingSlots.appendChild(container);
    });
  }

  function runDay() {
    const isOperate = level === "operate";
    const demand = dayData.demand || generateDemandCurve(currentDay, isOperate && currentDay === 4 ? 1.4 : 1.0);
    const periods = isOperate ? 24 : dayData.periods.length;

    let totalProfit = 0;
    const hourResults = [];

    for (let p = 0; p < periods; p++) {
      const bid = state.bids[p] || dayData.plantCost;
      const demandForPeriod = isOperate ? demand[p] : (demand[p] || 1000);

      // All competitors bid at cost
      const allBids = dayData.competitors
        .map(c => ({ ...c, bid: c.cost }))
        .concat([{ id: "you", name: "Your plant", capacity: isOperate ? 300 : 200, bid: bid, cost: dayData.plantCost }]);

      allBids.sort((a, b) => a.bid - b.bid);

      // Activate until demand met
      let accum = 0;
      const activated = [];
      allBids.forEach(function (b) {
        if (accum < demandForPeriod) {
          const vol = Math.min(b.capacity, demandForPeriod - accum);
          activated.push({ ...b, volume: vol });
          accum += vol;
        }
      });

      const clearingPrice = activated.length > 0 ? activated[activated.length - 1].bid : 0;
      const yourActivation = activated.find(a => a.id === "you");
      let hourProfit = 0;

      if (yourActivation) {
        hourProfit = (clearingPrice - dayData.plantCost) * yourActivation.volume;
      }

      totalProfit += hourProfit;

      hourResults.push({
        period: isOperate ? `Hour ${p < 10 ? "0" : ""}${p}` : dayData.periods[p],
        demand: demandForPeriod,
        clearingPrice: clearingPrice,
        bid: bid,
        activated: !!yourActivation,
        volume: yourActivation ? yourActivation.volume : 0,
        profit: hourProfit,
      });
    }

    state.cumulativeProfit += totalProfit;
    state.results = hourResults;
    state.gameOver = true;

    showDayResults(totalProfit);
  }

  function showDayResults(dayProfit) {
    el.dayPanel.hidden = true;
    el.dayResults.hidden = false;

    const medal = dayProfit > 1000 ? "🥇" : dayProfit > 0 ? "🥈" : "—";
    el.dayResultsTitle.textContent = `Day ${currentDay} complete: €${Math.round(dayProfit)} (${medal})`;
    el.dayResultsBody.textContent = generateResultsBody();
    el.dayResultsLesson.textContent = dayData.lesson;

    if (currentDay < 4) {
      el.nextDayBtn.hidden = false;
      el.nextDayBtn.textContent = "Next day →";
    } else {
      el.nextDayBtn.hidden = true;
    }

    if (dayProfit >= 500) {
      medalSystem.save("market", currentDay === 4 ? "gold" : "silver");
    }
  }

  function generateResultsBody() {
    const results = state.results;
    const ranHours = results.filter(r => r.activated).length;
    const profitableHours = results.filter(r => r.activated && r.profit > 0).length;
    const lossHours = results.filter(r => r.activated && r.profit < 0).length;

    let body = `You submitted ${results.length} bids. `;
    body += `You ran in ${ranHours} period(s). `;
    if (profitableHours > 0) body += `${profitableHours} profitable, `;
    if (lossHours > 0) body += `${lossHours} at a loss.`;
    return body;
  }

  function nextDay() {
    currentDay += 1;
    if (currentDay <= 4) {
      const dayList = level === "operate" ? DAYS.operate : DAYS.explore;
      dayData = dayList[currentDay - 1];
      state = { bids: {}, results: {}, cumulativeProfit: state.cumulativeProfit, gameOver: false };
      el.dayPanel.hidden = false;
      el.dayResults.hidden = true;
      el.dayTitle.textContent = dayData.title;
      el.scenarioText.textContent = dayData.scenario;
      renderBiddingSlots();
    } else {
      showCampaignSummary();
    }
  }

  function showCampaignSummary() {
    el.dayResults.hidden = true;
    el.campaignSummary.hidden = false;
    el.campaignTitle.textContent = `Campaign complete: €${Math.round(state.cumulativeProfit)} total`;
    el.campaignBody.textContent =
      "You've seen four faces of the same auction: a calm market, a scarcity peak, a renewable flood, and the day your own bid set the national price. No magic behind any of it. Individual bids, stacked cheapest-first, one clearing price for all.";
  }

  function applyLevel(name) {
    level = name;
    const hint = name === "operate" ? "Real terms: 24 hourly bids in €/MWh." : "Three bids a day, plain language. Get a feel for the auction.";
    el.levelHint.textContent = hint;

    const note = name === "operate"
      ? "<p>You own a 300 MW gas plant with a running cost of €50/MWh. Each day you submit 24 hourly bids into the day-ahead auction; bids stack cheapest-first (the <term data-term=\"merit_order\">merit order</term>) and the last bid needed sets the <term data-term=\"clearing_price\">clearing price</term> everyone is paid.</p>" +
        "<p><strong>Day 1:</strong> calm market — bid your cost, watch how the price forms.</p>" +
        "<p><strong>Day 2:</strong> evening peak — scarcity pulls the price up the merit order.</p>" +
        "<p><strong>Day 3:</strong> storm — cheap wind floods the stack; the right move may be not running at all.</p>" +
        "<p><strong>Day 4:</strong> cold snap — demand beats the forecast and your bid sets the national price.</p>" +
        "<details><summary>How real is this?</summary><p>Very: European power exchanges run exactly this kind of day-ahead auction every day, and the marginal bid sets one price for all. <a href=\"/learn\">How it works in the real grid →</a></p></details>"
      : "<p>You own one gas power plant. It costs you €40 to make each unit of power, and you tell the market the price you want for it — that's your bid.</p>" +
        "<p>The market buys from the cheapest plants first, until demand is covered. And <strong>everyone who runs gets paid the price of the last plant needed</strong>, not their own bid.</p>" +
        "<p>Four days, each with its own weather and its own lesson. Bid low and you always run (but maybe at a loss); bid high and you might not run at all. Find the sweet spot.</p>";

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
    const dayList = level === "operate" ? DAYS.operate : DAYS.explore;
    dayData = dayList[0];
    state = { bids: {}, results: {}, cumulativeProfit: 0, gameOver: false };
    el.dayPanel.hidden = false;
    el.dayResults.hidden = true;
    el.campaignSummary.hidden = true;
    el.dayTitle.textContent = dayData.title;
    el.scenarioText.textContent = dayData.scenario;
    renderBiddingSlots();
  }

  el.submitBtn.addEventListener("click", runDay);
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
  applyLevel(saved);
})();
