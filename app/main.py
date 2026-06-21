"""FastAPI application for the Electricity Course site.

Serves a landing page listing the available games and a page per game.
Run locally with::

    uv run uvicorn app.main:app --reload
"""

from __future__ import annotations

import re
from pathlib import Path

import markdown as md
from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from markupsafe import Markup

from app.games import GAMES, GAMES_BY_SLUG

BASE_DIR = Path(__file__).resolve().parent.parent
LEARN_DOC = BASE_DIR / "docs" / "european-grid-balancing.md"
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))

app = FastAPI(title="Electricity Course")
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")

# Links to local source files / scripts aren't served on the site; drop them to
# plain text so the rendered Learn page has no broken links. External http(s)
# links are kept.
_INTERNAL_LINK = re.compile(r"\[([^\]]+)\]\((?:\.\./|sources/)[^)]+\)")


def render_doc(path: Path) -> Markup:
    text = _INTERNAL_LINK.sub(r"\1", path.read_text(encoding="utf-8"))
    html = md.markdown(text, extensions=["tables", "fenced_code", "sane_lists"])
    return Markup(html)


@app.get("/", response_class=HTMLResponse)
async def index(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        request, "index.html", {"games": GAMES}
    )


@app.get("/learn", response_class=HTMLResponse)
async def learn(request: Request) -> HTMLResponse:
    return templates.TemplateResponse(
        request, "learn.html", {"content": render_doc(LEARN_DOC)}
    )


@app.get("/games/{slug}", response_class=HTMLResponse)
async def game(request: Request, slug: str) -> HTMLResponse:
    game = GAMES_BY_SLUG.get(slug)
    if game is None or not game.available:
        raise HTTPException(status_code=404, detail="Game not found")
    return templates.TemplateResponse(
        request, f"games/{slug}.html", {"game": game}
    )
