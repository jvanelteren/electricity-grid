# The real grid behind the games

Every game on this site simplifies one piece of the European electricity system. This page gives you the real version, one section per game, in play order. It draws on the public documentation of TenneT, the grid operator for the Netherlands and a large part of Germany, and the EU rules it implements.

## Balance the Grid: supply must equal demand, every instant

Electricity can't be stored cheaply at grid scale, so generation and consumption must match from second to second. The shared rotation speed of all generators shows up as the system frequency: 50 Hz when balanced, falling when demand outruns supply, rising when supply outruns it. Because all of continental Europe is a single **synchronous area**, one generator tripping in France nudges the frequency seen in the Netherlands at the same instant. Drift too far and protection systems start disconnecting customers to prevent a full blackout.

Operators restore balance in layers. **FCR** (primary reserve) reacts automatically within 30 seconds, everywhere at once, and stops the frequency from running away, but leaves it off target. **aFRR** (regulating power) is dispatched automatically to pull frequency back to exactly 50 Hz. **mFRR** is called up manually for incidents and long deviations. In the game, you play the aFRR layer by hand.

The money side: every grid connection belongs to a Balance Responsible Party that commits to a schedule the day before. Deviations are measured per 15 minutes and settled at the marginal price of the balancing energy the operator had to activate. That is the imbalance € in the game's Operate level. The TSO (grid operator) stays neutral: it doesn't own power plants, so it buys all balancing from independent service providers at prices set by the market.

## Build the Energy Mix: plants that obey and plants that don't

Power plants come in two families. **Dispatchable** plants (gas, coal, nuclear, hydro with a reservoir) run when ordered. **Variable** plants (solar, wind) run when the weather allows, and they are the cheapest to run and the cleanest. A real fleet needs both: enough weather-driven capacity to keep cost and carbon down, enough dispatchable capacity to cover the dark, windless hours.

That last part is the planner's trap. You build for the worst hour of the year, not the average one, so a gas plant that sits idle 95% of the time can still be indispensable. Storage helps by moving energy through time, but today's batteries hold hours, not weeks.

## Get It There: wires have limits

Power doesn't travel from plant A to city B along a chosen route. It flows over every connected line at once, split by physics, and nobody can steer it. The only lever is where power is generated. Each line has a limit: overload it and it overheats, sags, and switches off, dumping its flow onto its neighbours. That chain reaction is how the big blackouts happen.

When the market's cheapest plan would overload a line, the operator pays to deviate from it: a cheap far-away plant is turned down and a pricier nearby one turned up. This is **redispatch**, and Germany alone has spent billions of euros on it in a single year, largely to move northern wind power around bottlenecks. Operators also apply the N-1 rule: the grid must survive the failure of any single line or plant, so every line runs with headroom to spare.

## The Bidder: one price for everyone

Around noon each day, power exchanges auction off the next day's electricity. Every plant bids the price it is willing to run for; bids are stacked cheapest-first (the **merit order**) until demand is covered. The last bid needed sets the clearing price, and everyone who runs is paid that price, not their own bid.

That one rule shapes the whole market. It rewards honest bidding: state your true cost, and whenever the price clears above it you earn the difference. It explains price spikes, because in scarce hours the most expensive plant on the system sets the price for all. And it explains negative prices: on windy, sunny days with low demand, producers occasionally pay to keep running. The same principle applies to balancing: when the grid needs to restore frequency, regulating reserves are activated in merit order, and all providers are paid the highest price that was activated (for upward reserves) or the lowest (for downward). This creates the imbalance settlement price you see in the game.

## In Sync: one machine from Lisbon to Istanbul

Continental Europe is a single **synchronous area**. Every generator from Portugal to Turkey spins in lockstep, so there is one frequency for the whole continent. A power plant tripping in France dips the frequency in the Netherlands at the same instant, and Dutch plants push back within seconds, automatically, because FCR responds to frequency wherever it is measured. The reserve is sized for the whole area together (a 3,000 MW reference incident), with each country holding a small share.

Cooperation goes further than physics. Before activating regulating reserves, grid operators net their imbalances against each other. **IGCC** cancels shortages against surpluses proportionally across countries. **PICASSO** goes further, activating the cheapest available reserves anywhere in Europe first, charged at a cross-border price. This is cheaper than each country keeping enough reserves to cover itself alone. The flip side is shared risk: the area split into pieces in 2006 and briefly in January 2021, and in April 2025 Spain and Portugal went dark for most of a day. So every operator cooperates to save money, and keeps reserves of its own for the day the machine tears.

## Flip the Switch: demand is the other half

Everything above treats demand as a given. It isn't. With a **dynamic tariff**, the day-ahead price lands on your energy bill hour by hour, and suddenly when you use electricity matters as much as how much. Charging the car at windy 3 a.m. instead of at the evening peak makes the same kilowatt-hours cheaper and cleaner, because a different power plant serves them.

The limits are real too. Comfort can't always wait, a still winter week has no cheap hours to shift into, and if a whole street charges at the same moment the neighbourhood transformer becomes the bottleneck. In the Netherlands, grid congestion already puts new connections on waiting lists. But in aggregate, flexible demand behaves like a power plant. Professionals already trade on this as passive balancing: deliberately deviating from schedule in the helpful direction, paid at the imbalance price.

## Sources

Built from TenneT's public documentation (the ancillary services and balancing markets pages and the Imbalance Pricing System document, captured in this repository) and the EU framework behind them: SO GL (EU) 2017/1485, EB GL (EU) 2017/2195, and the [ENTSO-E balancing platforms](https://www.entsoe.eu/network_codes/eb/) (FCR Cooperation, PICASSO, MARI).
