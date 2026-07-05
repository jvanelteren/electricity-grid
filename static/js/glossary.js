// Glossary of grid terms with Explore (simple) and Operate (detailed) definitions.
//
// Terms are marked in HTML with <term data-term="KEY">display text</term>.
// On hover, a tooltip appears with the definition at the current level.
// If no level is specified, defaults to Explore.

window.glossary = {
  terms: {
    frequency: {
      explore: "How fast the grid's generators are spinning. Like the heartbeat of the grid. Normal is 50 Hz (spins 50 times per second).",
      operate:
        "The frequency of the AC power in the synchronous area, nominally 50 Hz in continental Europe. Deviations indicate imbalance: demand > supply slows it down; supply > demand speeds it up. Normal operation stays within about ±0.05 Hz; a deviation of ±0.2 Hz already counts as a serious disturbance.",
    },
    fcr: {
      explore:
        "Automatic smoothing that kicks in within seconds when the grid speeds up or slows down. Like a shock absorber.",
      operate:
        "Frequency Containment Reserve (primary reserve). Activated automatically and locally within ≤30 seconds based on measured frequency deviation. It arrests the frequency excursion but cannot return it to exactly 50 Hz. Set by ENTSO-E; NL share ~111–136 MW.",
    },
    afrr: {
      explore: "Your power dial. You slide it to match what people are using right now. This pulls the grid frequency back to steady.",
      operate:
        "Automatic Frequency Restoration Reserve (secondary reserve). Automatically dispatched by the TSO algorithm to restore frequency and relieve FCR. Contracted via daily merit-order auction. NL minimum ~454–496 MW (2025–26).",
    },
    mfrr: {
      explore: "Emergency backup power that a human operator calls in when something big fails.",
      operate:
        "Manual Frequency Restoration Reserve. Activated by a control-room operator (rather than automatically) for long-lasting deviations and incidents, typically within 15 minutes. Capacity is contracted in advance; the TSO calls it up when needed. NL volumes ~850/580 MW (2026).",
    },
    demand: {
      explore: "How much power people and businesses are using right now.",
      operate:
        "The electrical load drawn by consumers at a given moment, measured in MW. Varies over time (daily and seasonal patterns). Must be matched by generation within seconds.",
    },
    supply: {
      explore: "How much power the generators are making right now.",
      operate:
        "The electrical generation provided by power plants at a given moment, measured in MW. Must equal demand instantaneously to maintain frequency at 50 Hz.",
    },
    imbalance: {
      explore: "When supply and demand don't match. Too much supply speeds up the grid; too little slows it down.",
      operate:
        "The difference between scheduled generation and actual generation (or between scheduled and actual load) within an ISP (15 min). Settled financially: the BRP pays or is paid based on the imbalance price.",
    },
    tso: {
      explore: "The operator who runs the high-voltage grid and keeps the frequency steady.",
      operate:
        "Transmission System Operator. Responsible for monitoring and maintaining balance in its control area. TSOs buy balancing reserves from BSPs (Balancing Service Providers) and remain market-neutral. TenneT is the TSO for the Netherlands and parts of Germany.",
    },
    brp: {
      explore: "A company that buys and sells power on the market and is responsible for staying balanced.",
      operate:
        "Balance Responsible Party. Every grid connection is assigned to a BRP. The BRP submits a day-ahead commercial trade schedule (E-programma) and is financially responsible for any deviation from it. Can be a generator, supplier, trader, or consumer.",
    },
    bsp: {
      explore: "A power plant or battery operator that sells their balancing power to the TSO.",
      operate:
        "Balancing Service Provider. Provides reserve capacity/energy bids that the TSO activates. Must pre-qualify assets against each product's technical requirements (ramp rate, minimum/maximum volume, etc.). Can be a single plant or aggregated pool.",
    },
    merit_order: {
      explore: "A ranked list of power plants, cheapest first. The market works down the list until demand is covered.",
      operate:
        "The ranking of bids by price, cheapest first. The day-ahead market covers demand this way, and the TSO activates balancing bids the same way (lowest first for upward regulation, highest first for downward). The last activated bid sets the clearing price (uniform pricing).",
    },
    clearing_price: {
      explore: "The price set by the last plant that had to turn on. Everyone who ran gets paid that price, not their own bid.",
      operate:
        "The uniform market-clearing price: the price of the highest bid activated in the upward direction (or lowest in the downward direction). All activated generators are paid this marginal price, not their individual bid prices.",
    },
    congestion: {
      explore: "A transmission line is overloaded and can't carry any more power. Like a traffic jam on a road.",
      operate:
        "Constraint on a transmission line: the power flow exceeds the line's thermal or stability limit. Forces the TSO to redispatch generation or shed load. Managed via congestion pricing or explicit redispatch.",
    },
    transmission_loss: {
      explore: "Power lost as heat while traveling through the transmission lines (long distances = more loss).",
      operate:
        "Energy dissipation in transmission lines due to electrical resistance (I²R losses). Proportional to current squared and distance. Covered by TSO's procurement of 'Losses & Guarantees of Origin' ancillary service.",
    },
    synchronous_area: {
      explore: "All the grids electrically connected and sharing the same frequency. Continental Europe is one.",
      operate:
        "A group of generators electrically interconnected and spinning in lockstep at the same frequency. Continental Europe — from Portugal to Turkey — is one synchronous area at 50 Hz, coordinated by ENTSO-E. A fault anywhere nudges the frequency everywhere.",
    },
    interconnector: {
      explore: "A transmission line that connects one country's grid to a neighbour's, allowing power to flow between them.",
      operate:
        "A high-capacity transmission line connecting two TSOs' control areas. Limits the cross-zonal power transfer; managed by Capacity Allocation and Congestion Management (CACM) rules.",
    },
    picasso: {
      explore: "A platform where countries swap balancing power via an auction. Cheaper than each country calling its own expensive reserves.",
      operate:
        "Platform for the International Coordination of Automated Frequency Restoration and Stable System Operation. The European platform for exchanging aFRR across borders: TSOs forward their bids, and an optimization selects the cheapest available every few seconds at a cross-border marginal price. Works alongside IGCC: netting first cancels opposing imbalances for free; PICASSO then activates the cheapest reserves for what remains.",
    },
    igcc: {
      explore: "When one country is short of power and a neighbour has too much, the two cancel out — before anyone starts up expensive reserves. Free balancing.",
      operate:
        "International Grid Control Cooperation: imbalance netting between TSOs before aFRR activation. A Dutch shortage can be cancelled against another area's surplus, so fewer (or no) reserve bids are activated. Limited by available cross-zonal capacity.",
    },
    capacity_factor: {
      explore: "How often a renewable source is actually making power (solar works noon-ish, wind is moody).",
      operate:
        "The ratio of actual energy generated over a period to the maximum possible (nameplate capacity × hours). Solar: ~15–25%; wind: ~30–50%; nuclear: ~90%; hydro: ~30–50% depending on water availability.",
    },
    dispatchable: {
      explore: "Power you can turn on and off whenever you need it (nuclear, coal, gas, hydro with reservoir).",
      operate:
        "Generation sources whose output can be controlled by the operator (ramp up/down on demand). Coal, gas, nuclear, pumped hydro. Opposite: variable/non-dispatchable (solar, wind).",
    },
    variable: {
      explore: "Power from sources that depend on nature: sun and wind. You can't control them directly.",
      operate:
        "Generation sources whose output is not dispatchable and depends on weather or time of day (solar, wind, run-of-river hydro). High variability requires larger balancing reserves and flexible demand or storage.",
    },
    load_shedding: {
      explore: "Turning off customer power (the lights go out) to prevent a total grid collapse when frequency drops too far.",
      operate:
        "Disconnection of load by the TSO under emergency conditions to restore balance when frequency falls below critical thresholds (e.g., ~49 Hz in continental Europe). A last resort to prevent blackout cascade.",
    },
    hz: {
      explore: "Hertz. The unit for frequency: how many times per second the AC current oscillates. Normal is 50 times per second.",
      operate:
        "Hertz (Hz). SI unit of frequency. The AC power in continental Europe oscillates 50 times per second, hence nominal frequency = 50 Hz. Deviations up to ±0.05 Hz are normal; automatic load shedding starts around 49.0 Hz (a full −1.0 Hz) to prevent collapse.",
    },
    mw: {
      explore: "A unit of power. One megawatt = one million watts. A typical city uses 100–1000 MW.",
      operate:
        "Megawatt (MW). Unit of electrical power. 1 MW = 1 million watts = 1000 kW. Typical large generator: ~1000 MW; typical household: ~1 kW average (peak ~5–10 kW). Grid frequency stability requires MW-level precision in balancing.",
    },
    fifty_hz: {
      explore: "The target frequency for the European grid. When supply matches demand, frequency holds at 50 Hz.",
      operate:
        "Nominal frequency of the continental European synchronous area. The UK and Ireland also run at 50 Hz but are separate synchronous areas (linked only by DC cables); the US runs at 60 Hz. Deviations indicate imbalance; TSOs activate reserves to restore 50 Hz.",
    },
    renewable: {
      explore: "Power from sources that won't run out: sun, wind, water, etc.",
      operate:
        "Electricity generated from naturally replenishing sources (solar, wind, hydro, geothermal, biomass). Expanding rapidly — the EU aims for renewables to supply the majority of its electricity by 2030 — but variability increases balancing costs and reserve requirements.",
    },
    reserve: {
      explore: "Extra power kept standing by to turn on when needed, in case demand suddenly spikes or a plant fails.",
      operate:
        "Pre-qualified capacity held ready by BSPs to be activated by the TSO when an imbalance occurs. Comes in three layers: FCR, aFRR, mFRR. Contracted in advance, activated reactively.",
    },
    blackout: {
      explore: "When the grid frequency drops so far that protection systems automatically disconnect customers to prevent total collapse.",
      operate:
        "Total or widespread loss of power due to frequency collapse or cascading failures. Triggered when frequency falls below critical thresholds (e.g., 49 Hz). Load shedding and generator trips are automatic protection measures to prevent it.",
    },
    n_minus_one: {
      explore: "A safety rule: the grid must survive even if the biggest single thing fails (plant, line, etc.).",
      operate:
        "N-1 contingency: the transmission system must remain stable and secure even if the single largest generator or transmission element fails. A key design and operation criterion in European grid codes (SO GL).",
    },
    isp: {
      explore: "A 15-minute window. Your imbalance is measured, added up, and settled every 15 minutes.",
      operate:
        "Imbalance Settlement Period. Fixed at 15 minutes in continental Europe (96 ISPs per day). Imbalances are netted and settled per ISP at the marginal price. Schedule is energy-per-ISP, so instantaneous deviations within an ISP don't create settled imbalance unless they persist.",
    },
    regulation_state: {
      explore: "Whether the grid needed help going up, down, or neither at that moment. Determines which price the BRP pays.",
      operate:
        "The direction and magnitude of balancing activation in an ISP: state 0 (none, P_mid), state +1 (upward only, P_up), state −1 (downward only, P_down), state 2 (both directions, dual pricing P_up/P_down). Determines imbalance pricing rule.",
    },
  },

  getDefinition: function (term, level) {
    const t = this.terms[term];
    if (!t) return null;
    return level === "operate" ? t.operate : t.explore;
  },

  getAllTerms: function () {
    return Object.keys(this.terms);
  },
};

// Tooltip system. Uses event delegation on the document so it works for
// <term> elements that are injected dynamically (e.g. game notes, which are
// re-rendered on every level switch) — not just those present at page load.
// Appearance (dotted underline, help cursor) is handled in CSS via the
// term[data-term] selector, so it never depends on JS having run yet.
document.addEventListener("DOMContentLoaded", function () {
  // Read the level live at hover time so the right definition shows after a
  // level toggle, without needing to re-bind anything.
  function currentLevel() {
    const operateBtn = document.querySelector('.level-btn[data-level="operate"]');
    return operateBtn && operateBtn.getAttribute("aria-pressed") === "true"
      ? "operate"
      : "explore";
  }

  let activeTerm = null;
  let activeTooltip = null;

  function hideTooltip() {
    if (activeTooltip) activeTooltip.remove();
    activeTooltip = null;
    activeTerm = null;
  }

  document.addEventListener("mouseover", function (e) {
    const term =
      e.target.closest && e.target.closest("term[data-term]");
    if (!term) return;
    if (term === activeTerm) return; // already showing for this term

    const key = term.getAttribute("data-term");
    const def = glossary.terms[key] ? glossary.getDefinition(key, currentLevel()) : null;
    if (!def) return;

    hideTooltip();
    const tooltip = document.createElement("div");
    tooltip.className = "glossary-tooltip";
    tooltip.innerHTML = "<strong>" + key + ":</strong> " + def;
    document.body.appendChild(tooltip);

    const rect = term.getBoundingClientRect();
    tooltip.style.left = rect.left + "px";
    tooltip.style.top = rect.bottom + 10 + "px";

    activeTerm = term;
    activeTooltip = tooltip;
  });

  document.addEventListener("mouseout", function (e) {
    const term = e.target.closest && e.target.closest("term[data-term]");
    if (!term || term !== activeTerm) return;
    // Don't hide if the cursor merely moved onto a child of the same term.
    if (e.relatedTarget && term.contains(e.relatedTarget)) return;
    hideTooltip();
  });

  // Switching level dismisses any open tooltip (the next hover re-reads level).
  document.querySelectorAll(".level-btn").forEach(function (btn) {
    btn.addEventListener("click", hideTooltip);
  });
});
