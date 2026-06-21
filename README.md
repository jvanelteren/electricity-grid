# ⚡ Electricity Course

A website that teaches people how the electricity system works through simple,
interactive games. Built with **FastAPI** (Python) serving an HTML/CSS/JS
frontend.

## Quick start

This project uses [uv](https://docs.astral.sh/uv/). Dependencies and a Python
3.12 virtual environment are already set up in `.venv`.

```bash
uv run main.py
```

Then open http://127.0.0.1:8000 in your browser.

> **Note:** on this machine `uv` is shadowed by a pyenv shim. If `uv` errors
> with a `pyenv` message, call the real binary directly:
> `C:\Users\Gebruiker\.pyenv\pyenv-win\versions\3.14.0rc3\Scripts\uv.exe`
> (e.g. `& "...\uv.exe" run main.py`).

## Project layout

```
app/
  main.py        FastAPI app: landing page + per-game routes
  games.py       Single registry of all games (drives the whole site)
  main.py        Routes: landing page, /learn, per-game pages
templates/
  base.html      Shared page shell (nav: Games / Learn)
  index.html     Landing page (game cards)
  learn.html     Renders docs/european-grid-balancing.md
  games/
    balance.html "Balance the Grid" game page
static/
  css/style.css
  js/balance.js  "Balance the Grid" game logic
docs/
  european-grid-balancing.md  Study note powering the /learn page
  sources/tennet/             Captured TenneT documentation + PDFs
scripts/         Doc-collection + smoke-test tooling (see below)
main.py          Dev-server entry point
```

## The Learn page

`/learn` renders [docs/european-grid-balancing.md](docs/european-grid-balancing.md)
— a cited study note on European grid balancing built from TenneT's public
documentation in [docs/sources/tennet/](docs/sources/tennet/). The games are
designed to make those concepts tangible (e.g. *Balance the Grid* models the
FCR/aFRR layers described there).

To collect/refresh sources: `scripts/scrape_tennet.py` (Playwright),
`scripts/convert_saved_html.py` (browser-saved pages), `scripts/fetch_pdfs.py`
(S3-hosted PDFs). `scripts/smoke_test.py` checks the routes and game still work.

## Adding a new game

1. Add a `Game(...)` entry to `GAMES` in [`app/games.py`](app/games.py).
2. Create `templates/games/<slug>.html` (extend `base.html`).
3. Add any `static/js/<slug>.js` the game needs.

The landing page and routing pick it up automatically — set
`available=False` to show a "coming soon" card while you build it.

## Games

- **Balance the Grid** — keep generation matched to demand to hold the grid
  frequency at 50 Hz. Teaches that electricity supply and demand must match
  instant-by-instant.
- **Build the Energy Mix** *(coming soon)* — cost vs. emissions vs.
  reliability trade-offs across power sources.
