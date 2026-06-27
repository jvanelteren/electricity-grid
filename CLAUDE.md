# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A website that teaches how the electricity system works through simple, interactive browser games. FastAPI (Python 3.12) serves Jinja2-templated HTML with vanilla CSS/JS — no frontend framework, no build step, no database. Game logic lives in plain `static/js/*.js` files.

## Commands

```bash
uv run main.py                    # dev server with reload at http://127.0.0.1:8000
uv run scripts/smoke_test.py      # end-to-end smoke test (Playwright): routes respond, Learn renders, game runs with no JS errors
```

`smoke_test.py` is the regression check — it boots the app on port 8021, drives it with a headless browser, and fails on any console error. Run it after touching routes, templates, or game JS.

**`uv` gotcha (this machine):** `uv` on PATH is shadowed by a pyenv shim and errors with a pyenv message. Call the real binary directly:
`C:\Users\Gebruiker\.pyenv\pyenv-win\versions\3.14.0rc3\Scripts\uv.exe` (e.g. `& "...\uv.exe" run main.py`).

## Architecture

**The game registry drives the whole site.** [app/games.py](app/games.py) holds a single `GAMES` list of frozen `Game` dataclasses. The landing page, routing, and "coming soon" cards are all generated from it — adding a game is one `Game(...)` entry + a `templates/games/<slug>.html` + optional `static/js/<slug>.js`; nothing else to wire up. Set `available=False` to ship a teaser card before the game exists ([app/main.py](app/main.py) 404s on unavailable slugs).

**Three route types** in [app/main.py](app/main.py): `/` (landing, lists games), `/learn` (renders a Markdown study note to HTML), `/games/{slug}` (renders the per-game template). `BASE_DIR` is resolved from the file so templates/static/docs paths work regardless of CWD.

**The Learn page is content, not code.** `/learn` renders [docs/european-grid-balancing.md](docs/european-grid-balancing.md) — a cited study note built from TenneT's public docs in [docs/sources/tennet/](docs/sources/tennet/). `render_doc()` strips internal/relative Markdown links (to `../` and `sources/`) down to plain text so the rendered page has no broken links, while keeping external `http(s)` links. The games are designed to make the concepts in that note tangible (e.g. *Balance the Grid* models its FCR/aFRR layers), so keep game physics and the study note consistent.

**Source-collection scripts** in `scripts/` refresh the TenneT material: `scrape_tennet.py` (Playwright — tennet.eu 403s plain server fetchers), `convert_saved_html.py` (browser-saved pages), `fetch_pdfs.py` (S3 PDFs). These are dev tooling, not part of the served app.

## Didactic design (how to build games)

The audience is a **curious layperson with zero grid knowledge**, so invert the expert-first source material: start from lived experience (flip a switch → lights on), build intuition through play, then attach real names. Two levels, switched by an **in-game toggle** on the same simulation — *Explore* (analogies, no acronyms, forgiving) and *Operate* (real terms like FCR/aFRR/50 Hz/MW, realistic tolerances, market layer). They teach the **same truth at different resolution** — nothing in Explore may become false in Operate. Principles: play before vocabulary; one concept per game; concrete → analogy → real term; failure teaches (match the blackout-explainer wording to the active level); depth is opt-in; maintain a plain-term ↔ real-term vocabulary ladder so the levels stay honest.

The **balance game is the reference implementation**: [static/js/balance.js](static/js/balance.js) drives all level differences from a single `LEVELS` config (labels, units, tolerances, copy, and a `showCost`/`showHz` toggle), defaults to Explore, and persists the choice in `localStorage`. Copy that pattern for new games. Note: a gauge hidden via the `hidden` attribute needs `.gauge[hidden] { display: none }` in CSS, since `.gauge { display: flex }` otherwise overrides it.

## The game arc (learning path)

The games form one **ordered arc that zooms out in space and time** — seconds in one control room → a continent over a day. Each game reveals an assumption the previous one quietly made (G1 lets you slide a magic power knob, assumes power teleports, assumes you're alone; later games pay off each debt). Build order = play order, because each game's copy reuses intuition from the one before. The homepage is a learning path, not a flat grid.

1. **Balance the Grid** *(built)* — supply must equal demand every instant; frequency is the signal. Explore: spinning wheel. Operate: FCR/aFRR, 50 Hz, imbalance €.
2. **Build the Energy Mix** *(next; teased in registry)* — sources differ on cost, carbon, and controllability (variable vs dispatchable). **Storage & demand-flexibility live here** as special "buffer" sources. Pays off G1: half your fleet won't take orders, so balancing is hard.
3. **Get It There (Transmission)** — the grid is a network of lines with capacity limits; bottlenecks force re-routing/redispatch. Operate: line MW limits, congestion, N-1, voltage levels. Pays off G1–2: power was teleporting.
4. **The Market / Merit Order** *(its own game)* — a day-ahead auction stacks bids cheapest-first; the marginal plant sets one price for all. Connects to the imbalance € already in G1's Operate.
5. **One Synchronous Europe** — one synchronous machine; a fault in France nudges Dutch frequency; neighbours share reserves and net imbalances (PICASSO/IGCC, ENTSO-E). Capstone integrating G1–4.

Pillars: physical elements = G2+G3; balancing = G1+G5; transmission = G3+G5; G4 (market) is the economic glue. G4+G5 are the opt-in "deepen" tier.
