# Understanding balancing in the European electricity grid

A study note built from TenneT's public documentation (captured locally in
[docs/sources/tennet/](sources/tennet/)) and the EU regulations it references.
TenneT is the TSO (Transmission System Operator) for the Netherlands and a large
part of Germany; its design is a concrete instance of the *pan-European*
balancing framework, so it's an excellent lens on the whole synchronous grid.

**Primary sources captured (all retrieved 2026-06-21):**
- [Ancillary Services](sources/tennet/nl-en-markets-ancillary-services.md) — products, dimensioning tables, procurement
- [Balancing markets](sources/tennet/balancing-markets.md) — roles, activation, passive balancing, price formation
- [Merit order list](sources/tennet/merit-order-list.md) — how aFRR bids are published
- [Imbalance Pricing System (PDF, v6.1)](sources/tennet/imbalance-pricing-system.md) — the authoritative pricing rulebook
- Plus the [FCR](sources/tennet/fcr-documents.md) / [aFRR](sources/tennet/afrr-documents.md) document libraries and the [FCR Handbook for BSPs](sources/tennet/handboek-fcr-voor-bsps-en-20260408-1.md)

---

## 1. The core problem: supply must equal demand, every instant

Electricity isn't cheaply storable at grid scale, so generation and consumption
must match continuously. The shared rotational speed of all synchronous
generators shows up as the **system frequency**, nominally **50 Hz** in
continental Europe.

- Demand > supply → generators slow → **frequency falls below 50 Hz**.
- Supply > demand → **frequency rises above 50 Hz**.

Large excursions trigger automatic load shedding and, worst case, a blackout.
All of continental Europe is **one synchronous area** at a common frequency, so
a generator tripping in France nudges the frequency seen in the Netherlands.
Balancing is therefore a **shared international obligation** coordinated through
ENTSO-E. This is exactly the dynamic the *Balance the Grid* game models.

---

## 2. The three roles

The Netherlands and the EU define three balancing roles
([Imbalance Pricing System §3.1](sources/tennet/imbalance-pricing-system.md)):

| Role | Meaning |
| --- | --- |
| **TSO** | Operates the high-voltage grid; responsible for monitoring, maintaining and **restoring** the balance in its area. In NL: TenneT. |
| **BRP** — Balance Responsible Party | Every grid connection is assigned to a BRP. The BRP submits a day-ahead **commercial trade schedule (E-programma)** and is **financially responsible** for any deviation from it. |
| **BSP** — Balancing Service Provider | Provides the reserve capacity/energy bids the TSO activates. Must **prequalify** assets (or an aggregated pool) against each product's technical requirements. |

A TSO may **not** own generation/demand assets — it stays market-neutral and
buys balancing from BSPs. One company can be both BRP and BSP.

Note TenneT's balancing is **reactive**: it activates reserves only when an
imbalance *actually* occurs, not against forecasts
([Balancing markets](sources/tennet/balancing-markets.md)).

---

## 3. The balancing products — a layered defence

The grid restores balance in **escalating layers**, differing in speed and
activation mechanism. **FRR = aFRR + mFRRda.**

### Layer 1 — FCR (Frequency Containment Reserve) — "stop the fall" (seconds)
- Primary/automatic reserve. Activated **automatically and locally** from
  measured frequency — *not* dispatched by the TSO — within **≤30 seconds**.
- **Contains** (arrests) a frequency disturbance anywhere in the synchronous
  area; it does not return frequency to exactly 50 Hz.
- Volume set by **ENTSO-E** for the whole area. Reference incident **3000 MW**.
  Each TSO's share = its **frequency bias**; NL's was **3.7 % (2019)**, so TenneT
  must hold **111 MW** up and down (3.7 % × 3000). NL volume: 114 MW (2013) →
  **136 MW (2026)**.
- Procured via a daily cross-border **common auction** in 4-hour blocks, with
  **30 % "core share"** delivered inside the Dutch control block.
- Legal basis: **SO GL** (EU) 2017/1485 Art. 153; SAFA.

### Layer 2 — aFRR (automatic Frequency Restoration Reserve) — "push back to 50 Hz"
- Secondary/automatic reserve ("regelvermogen"). **Automatically dispatched** by
  the TSO algorithm to *restore* frequency and relieve FCR.
- Two bid types compete on the **same merit order**: contracted **bid-obligation**
  bids and uncontracted **free bids** — this keeps enough liquidity while letting
  the market set the price.
- NL minimum dimensioning grew 300/300 MW (2013) → **454/496 MW (2025–26)**;
  **Dynamic Dimensioning** from December 2025.

### Layer 3 — mFRRda (manual FRR, directly activated) — "reserves & incidents"
- Reserve/incident power ("noodvermogen"). **Manually** activated by a control-room
  operator for **incidents and long-lasting** deviations, freeing up aFRR.
- **No bids and no merit order** — only *availability* is contracted; TenneT
  activates the procured amount directly.
- NL recent volumes ~850/580 MW (2026 provisional); dynamic dimensioning since
  Sep 2025.

**Escalation in one line:** FCR (seconds, automatic, *contains*) → aFRR
(automatic, *restores* to 50 Hz) → mFRR (manual, *backs up* + incidents).

### Imbalance netting — avoiding activation entirely
Before/instead of activating aFRR, TenneT nets its imbalance against other TSOs
([Imbalance Pricing System §3.4](sources/tennet/imbalance-pricing-system.md)):
- **IGCC** (International Grid Control Cooperation): imbalances netted
  **proportionally** between TSOs — a Dutch shortage can be cancelled by another
  area's surplus, so *no local bid is activated*.
- **PICASSO** (the European aFRR platform): exchanges imbalance **taking prices
  into account** (cross-border marginal price, CBMP, every 4 s), relocating the
  remaining imbalance to the cheapest bids. **PICASSO is preferred** over IGCC
  because it's more economical.
- Both are limited by available cross-zonal capacity. **MARI** is the equivalent
  platform for mFRR. (EB GL framework.)

---

## 4. Dimensioning: how much reserve, and why it's growing

Volumes come from **deterministic** (largest single failure), **stochastic** and
**probabilistic** analysis; the result is at least the deterministic outcome
(**SO GL Art. 157(2)**). NL's largest reference incident for upward FRR is
currently a **1304 MW** unit. As offshore wind connects via **2 GW** HVDC cables,
one cable's failure becomes binding: from **2030** the reference incident rises
to **2 GW** (downward possibly ~1800 MW)
([Ancillary Services, "Outlook 2030"](sources/tennet/nl-en-markets-ancillary-services.md)).
A concrete example of how decarbonisation reshapes balancing needs.

---

## 5. Time structure & the balancing process timeline

The **Imbalance Settlement Period (ISP)** is fixed at **15 minutes** → **96 ISPs
per day**. The schedule is energy-per-ISP, so instantaneous deviations within an
ISP don't *by themselves* create a settled imbalance
([Imbalance Pricing System §2, §3.2](sources/tennet/imbalance-pricing-system.md)).

1. **Day-ahead (D-1):** each BRP submits a commercial trade schedule for every
   ISP; the TSO checks the market's schedules net to **zero**.
2. **Delivery day (D):** parties follow their schedules. If a power imbalance
   occurs, TenneT restores it **within 15 minutes** using FRR.
   - BRPs may adjust their schedule up to **4 ISPs before** delivery (domestic
     trades up to D+1, 10:00).
   - BSPs may adjust bids up to **2 ISPs before** delivery.
3. **Settlement (from D+1, 10:00):** settlement prices are published, each BRP's
   imbalance is computed and invoiced.

---

## 6. Imbalance settlement: the money that makes it work

### Balancing-energy price — marginal (uniform) pricing
Per ISP and per direction, **all** activated balancing energy is paid one
**marginal price** ([Imbalance Pricing System §4.2](sources/tennet/imbalance-pricing-system.md)):
- **P_up** = price of the **highest-priced activated upward** aFRR bid (or the
  mFRRda price if higher).
- **P_down** = price of the **lowest-priced activated downward** aFRR bid (or
  mFRRda if lower); can be **negative**.
- **Mid-price (P_mid)** = average of the lowest upward bid and the highest
  downward bid on the merit order.

Bids are published with **10 MW granularity** so every market party can estimate
the developing price ([Merit order list](sources/tennet/merit-order-list.md)).

### Regulation states — and single vs. dual pricing
The **regulation state** of each ISP sets which price applies
([Imbalance Pricing System §4.3, §5](sources/tennet/imbalance-pricing-system.md)):

| State | Situation | Imbalance price |
| --- | --- | --- |
| **0** | No balancing energy activated (e.g. fully netted, or LFC down) | **P_mid** — *single price* |
| **+1** | Only upward regulation | **P_up** — *single price* |
| **−1** | Only downward regulation | **P_down** — *single price* |
| **2** | Both directions within the ISP | **dual pricing** — surplus and shortage priced differently (P_up / P_down, with P_mid in "reverse-pricing" cases) |

So **surplus and shortage get the same price in states 0/+1/−1**, but **differ in
state 2**. A **BRP shortage** that worsened the system **pays** TenneT; a
**surplus** that helped **receives** the price (signs flip with negative prices —
see the direction-of-payment table in §5 of the source).

### Passive balancing — the whole market helps
Because TenneT publishes activation volumes and prices **every minute (≈2-min
delay)**, BRPs can *deliberately* deviate in the helpful direction to earn the
imbalance price. This **passive balancing** lets BRPs compete with BSPs and means
the market — not just contracted providers — actively restores balance
([Balancing markets](sources/tennet/balancing-markets.md)). The incentive
("incentive component") was a separate surcharge until it was **abolished on
31 July 2020**; the bid↔balancing-energy↔imbalance price link now does the work.

### Financial residue
Differences between balancing-energy and imbalance volumes/prices (and netting
settlements) leave a **financial residue** at TenneT. TenneT has **no stake** in
it — positive or negative, it's returned to all tariff payers via regulated
tariffs ([Imbalance Pricing System §6](sources/tennet/imbalance-pricing-system.md)).

---

## 7. The other ancillary services (context)

Balancing reserves are one of several ancillary services TenneT buys
([Ancillary Services](sources/tennet/nl-en-markets-ancillary-services.md)):
**reactive power** (voltage control), **redispatch** (relieving congestion by
shifting generation between locations), **black start** (re-energising a dead
grid), and **losses & Guarantees of Origin** (covering transmission losses incl.
the NorNed DC cable).

---

## 8. Glossary

- **ISP / PTU** — Imbalance Settlement Period; 15 min in NL (PTU was the old name).
- **E-programma** — a BRP's day-ahead commercial trade schedule.
- **Merit order** — bids sorted by price (upward low→high, downward high→low).
- **Balance delta** — activated upward power minus activated downward power.
- **CBMP** — cross-border marginal price set by PICASSO (per 4 s).
- **LFC block / FRCE** — Load-Frequency Control area / its Frequency Restoration
  Control Error.
- **Surplus / shortage** — BRP injects more / less than its schedule.

---

## 9. Provenance & how this was gathered

**Now fully captured locally** (see the source links at the top): all four
balancing pages plus three PDFs — the Imbalance Pricing System, the FCR Handbook
for BSPs, and the Manual Bidding document.

**Method.** `www.tennet.eu` runs active bot protection that 403s server-side
fetchers, and its `robots.txt` blocks ~30 named AI crawlers (for `User-agent: *`
only `/api/`). The first page was loaded with a real browser engine (Playwright);
the rest were **saved manually in a browser** and converted with
[scripts/convert_saved_html.py](../scripts/convert_saved_html.py). The PDFs are
served from public **AWS S3** (no bot protection) and downloaded directly with
[scripts/fetch_pdfs.py](../scripts/fetch_pdfs.py). No access controls were
circumvented and no credentials were used.

**Wider European framework to read next (open access):** ENTSO-E Load-Frequency
Control & Reserves; balancing platforms **FCR Cooperation / PICASSO / MARI /
TERRE**; **SO GL** (EU) 2017/1485; **EB GL** (EU) 2017/2195.
