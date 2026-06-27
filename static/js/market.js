// "The Market / Merit Order" — an auction determines which plants run.
//
// This game reveals how prices form in the real grid: not by cost-plus markup,
// but by an auction where the cheapest bids run first, and the *last* bid
// activated (the marginal bid) sets the price for everyone. This is uniform/
// marginal pricing — all activated bids earn the same price. Players see that
// your revenue depends not on your cost, but on the clearing price set by
// the most expensive plant the TSO had to turn on.
//
// Explore: simple auction with 3 bidders. Operate: 5 bidders, realistic prices,
// the mechanic connects to G1's imbalance €.

(function () {
  "use strict";

  const DEMAND = 1000;

  const LEVELS = {
    explore: {
      name: "Explore",
      hint: "Cheapest bid wins, the marginal bid sets the price for all.",
      unit: "",
      note:
        "<p>An auction decides which plants run today. Everyone bids a price. The " +
        "auctioneer stacks all bids cheapest-first and activates enough to cover " +
        "demand. The <strong>last bid activated</strong> (the <strong>marginal bid</strong>) " +
        "sets the price for <em>everyone</em>.</p>" +
        "<p>You're a bidder. Pick your bid price and hit \"Run the auction\". You'll see if " +
        "you run, and what price you get (the marginal price, not your cost).</p>" +
        "<details><summary>Want the real name?</summary>" +
        "<p>This is the <strong>day-ahead energy market</strong>. The rule (last activated " +
        "bid sets the price) is <strong>uniform/marginal pricing</strong>. It's the same " +
        "principle as the imbalance prices in Game 1. " +
        "<a href=\"/learn\">How the real market works →</a></p></details>",
      status: "Pick your bid price. Will you be in the merit order?",
      bidders: [
        { id: "you", name: "You", capacity: 200, costMin: 20, costMax: 60, isPlayer: true },
        { id: "comp1", name: "Competitor A", capacity: 300, cost: 30 },
        { id: "comp2", name: "Competitor B", capacity: 500, cost: 50 },
      ],
    },
    operate: {
      name: "Operate",
      hint: "Real sources, realistic prices, complex merit order. The actual market.",
      unit: " MW",
      note:
        "<p>The <strong>day-ahead energy market</strong>: generators bid capacity and " +
        "price. The TSO stacks them cheapest-first (the <strong>merit order</strong>). " +
        "Demand must equal supply, so the TSO activates bids until demand is met. " +
        "The <strong>clearing price</strong> is the highest bid activated (the marginal bid). " +
        "All activated generators are paid this price.</p>" +
        "<p>This uniform pricing means: if you bid €40/MWh and the marginal bid is €80/MWh, " +
        "you earn €80/MWh, not €40/MWh. Your revenue depends on the market, not your cost.</p>" +
        "<details><summary>Real market details</summary>" +
        "<p>Real European markets (EUPHEMIA) use <strong>marginal pricing</strong> (last activated bid " +
        "wins). Bids have 10 MW granularity. Negative prices are possible if there's " +
        "surplus. See the study note for <a href=\"/learn\">the full imbalance pricing → </a></p></details>",
      status: "Bid strategically: too low and you win but earn little; too high and you don't run.",
      bidders: [
        { id: "you", name: "You (Your plant)", capacity: 300, costMin: 30, costMax: 80, isPlayer: true },
        { id: "solar", name: "Solar", capacity: 400, cost: 20 },
        { id: "wind", name: "Wind", capacity: 350, cost: 25 },
        { id: "coal", name: "Coal", capacity: 450, cost: 50 },
        { id: "gas", name: "Gas", capacity: 200, cost: 70 },
      ],
    },
  };

  const STORAGE_KEY = "market-level";
  const DEFAULT_LEVEL = "explore";

  const el = {
    biddersList: document.getElementById("bidders-list"),
    demandValue: document.getElementById("demand-value"),
    clearingPrice: document.getElementById("clearing-price"),
    yourRevenue: document.getElementById("your-revenue"),
    yourPosition: document.getElementById("your-position"),
    clear: document.getElementById("clear-btn"),
    reset: document.getElementById("reset-btn"),
    status: document.getElementById("status"),
    note: document.getElementById("game-note"),
    levelHint: document.getElementById("level-hint"),
    levelButtons: Array.prototype.slice.call(document.querySelectorAll(".level-btn")),
    meritOrder: document.getElementById("merit-order"),
    orderList: document.getElementById("order-list"),
    results: document.getElementById("results"),
    resultsTitle: document.getElementById("results-title"),
    resultsBody: document.getElementById("results-body"),
    resultsOk: document.getElementById("results-ok"),
  };

  let level = LEVELS[DEFAULT_LEVEL];
  let bids = [];
  let playerBid = null;

  function renderBidders() {
    el.biddersList.innerHTML = "";
    level.bidders.forEach(function (bidder) {
      const container = document.createElement("div");
      container.className = "bidder-control";

      const name = document.createElement("strong");
      name.textContent = bidder.name + " (" + bidder.capacity + level.unit + ")";
      container.appendChild(name);

      if (bidder.isPlayer) {
        const sliderContainer = document.createElement("div");
        sliderContainer.className = "bidder-slider";

        const label = document.createElement("label");
        label.textContent = "Your bid: ";
        const input = document.createElement("input");
        input.type = "range";
        input.min = bidder.costMin;
        input.max = bidder.costMax;
        input.step = 5;
        input.value = (bidder.costMin + bidder.costMax) / 2;
        const value = document.createElement("span");
        value.className = "bidder-value";
        value.textContent = "€" + input.value + "/MWh";
        input.addEventListener("input", function () {
          value.textContent = "€" + input.value + "/MWh";
          playerBid = { ...bidder, bid: parseFloat(input.value) };
        });
        label.appendChild(input);
        label.appendChild(value);
        sliderContainer.appendChild(label);
        container.appendChild(sliderContainer);
        playerBid = { ...bidder, bid: parseFloat(input.value) };
      } else {
        const bidValue = document.createElement("div");
        bidValue.className = "bidder-fixed";
        bidValue.textContent = "€" + bidder.cost + "/MWh";
        container.appendChild(bidValue);
      }

      el.biddersList.appendChild(container);
    });
  }

  function runAuction() {
    // Gather all bids
    const allBids = level.bidders
      .filter((b) => !b.isPlayer)
      .map((b) => ({ ...b, bid: b.cost }))
      .concat([playerBid]);

    // Sort cheapest-first
    const sorted = allBids.sort((a, b) => a.bid - b.bid);

    // Activate until demand is met
    let accum = 0;
    const activated = [];
    sorted.forEach(function (bid) {
      if (accum < DEMAND) {
        const volume = Math.min(bid.capacity, DEMAND - accum);
        activated.push({ ...bid, volume: volume });
        accum += volume;
      }
    });

    // Clearing price = highest activated bid
    const clearingPrice = activated.length > 0 ? activated[activated.length - 1].bid : 0;

    // Your revenue
    const yourActivation = activated.find((a) => a.id === "you");
    const yourRevenue = yourActivation ? yourActivation.volume * clearingPrice : 0;

    // Render merit order
    el.orderList.innerHTML = "";
    sorted.forEach(function (bid, idx) {
      const div = document.createElement("div");
      div.className = "order-row";
      const isActivated = activated.some((a) => a.id === bid.id);
      const isYou = bid.id === "you";
      if (isYou) div.classList.add("is-you");
      if (isActivated) div.classList.add("is-activated");

      div.innerHTML =
        "<span class='order-rank'>#" +
        (idx + 1) +
        "</span>" +
        "<span class='order-name'>" +
        bid.name +
        "</span>" +
        "<span class='order-bid'>€" +
        bid.bid +
        "/MWh</span>" +
        "<span class='order-cap'>" +
        bid.capacity +
        level.unit +
        "</span>" +
        (isActivated ? "<span class='order-vol'>" + activated.find((a) => a.id === bid.id).volume + level.unit + "</span>" : "");

      el.orderList.appendChild(div);
    });

    // Update gauges
    el.clearingPrice.textContent = "€" + Math.round(clearingPrice) + "/MWh";
    el.yourRevenue.textContent = "€" + Math.round(yourRevenue);
    el.yourPosition.textContent = yourActivation
      ? "✅ Activated (" + yourActivation.volume + level.unit + ")"
      : "❌ Not activated";

    // Results
    el.meritOrder.hidden = false;
    el.results.hidden = false;
    if (yourActivation) {
      el.resultsTitle.textContent =
        "✅ You ran at the clearing price €" + Math.round(clearingPrice) + "/MWh";
      el.resultsBody.textContent =
        "Revenue: €" +
        Math.round(yourRevenue) +
        ". Your bid was €" +
        playerBid.bid +
        "/MWh, but the clearing price was €" +
        Math.round(clearingPrice) +
        "/MWh (set by the last bid activated). " +
        (clearingPrice > playerBid.bid
          ? "You made a profit!"
          : "You bid too high and didn't quite break even.");

      // Award medal: silver for activation, gold for good profit
      const profit = yourRevenue - yourActivation.volume * playerBid.bid;
      if (profit > 1000) {
        medalSystem.save("market", "gold");
      } else {
        medalSystem.save("market", "silver");
      }
    } else {
      el.resultsTitle.textContent = "❌ You didn't run";
      el.resultsBody.textContent =
        "The clearing price was €" +
        Math.round(clearingPrice) +
        "/MWh, but your bid (€" +
        playerBid.bid +
        "/MWh) was too high. " +
        "Bid lower next time if you want to run.";
    }
  }

  function applyLevel(name) {
    level = LEVELS[name] || LEVELS[DEFAULT_LEVEL];
    el.note.innerHTML = level.note;
    el.levelHint.textContent = level.hint;
    el.status.textContent = level.status;
    el.demandValue.textContent = DEMAND + level.unit;
    el.levelButtons.forEach(function (btn) {
      const active = btn.dataset.level === name;
      btn.classList.toggle("is-active", active);
      btn.setAttribute("aria-pressed", active ? "true" : "false");
    });
    el.meritOrder.hidden = true;
    el.results.hidden = true;
    renderBidders();
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch (e) {
      /* ignore */
    }
  }

  el.clear.addEventListener("click", runAuction);
  el.reset.addEventListener("click", function () {
    el.meritOrder.hidden = true;
    el.results.hidden = true;
    el.clearingPrice.textContent = "—";
    el.yourRevenue.textContent = "€0";
    el.yourPosition.textContent = "—";
  });
  el.resultsOk.addEventListener("click", function () {
    el.results.hidden = true;
    el.meritOrder.hidden = true;
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
