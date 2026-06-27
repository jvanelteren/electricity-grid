"""Freeze the site to static HTML for GitHub Pages.

The app has no real backend (every route just renders a template once, all game
logic is client-side JS), so it can be pre-rendered to plain HTML and served by
any static host. This boots the app like the smoke test does, fetches each
route, rewrites absolute links to sit under the Pages base path, and writes the
result to ``dist/``.

    BASE_PATH=/electricity-grid uv run scripts/freeze.py

``BASE_PATH`` is the sub-path the project page is served under
(``https://<user>.github.io/electricity-grid/``). Set it to an empty string to
build for a domain root or for local preview.
"""

import os
import shutil
import subprocess
import sys
import time
import urllib.request
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(BASE_DIR))  # make the `app` package importable

from app.games import GAMES  # noqa: E402
DIST = BASE_DIR / "dist"
PORT = 8033
ORIGIN = f"http://127.0.0.1:{PORT}"
# Sub-path the site lives under on GitHub Pages, e.g. "/electricity-grid".
BASE_PATH = os.environ.get("BASE_PATH", "/electricity-grid").rstrip("/")


def routes() -> dict[str, str]:
    """Map each served URL to its output file. Directory-style (`learn/index.html`)
    so a static host serves it at the app's extensionless link `/learn` via the
    standard trailing-slash redirect — works on GitHub Pages and `http.server`."""
    out = {"/": "index.html", "/learn": "learn/index.html"}
    for game in GAMES:
        if game.available:
            out[f"/games/{game.slug}"] = f"games/{game.slug}/index.html"
    return out


def wait_for_server(timeout: int = 20) -> bool:
    for _ in range(timeout * 5):
        try:
            urllib.request.urlopen(f"{ORIGIN}/", timeout=1)
            return True
        except Exception:
            time.sleep(0.2)
    return False


def rewrite(html: str) -> str:
    """Make every root-absolute link work under the Pages base path.

    `url_for` emits absolute URLs (with the dev host); strip the host so they
    become `/static/...`, then prefix every `/...` href/src with BASE_PATH.
    External `http(s)://` links don't start with `/` and are left untouched.
    """
    html = html.replace(ORIGIN, "")
    if BASE_PATH:
        html = html.replace('href="/', f'href="{BASE_PATH}/')
        html = html.replace('src="/', f'src="{BASE_PATH}/')
    return html


def main() -> int:
    if DIST.exists():
        shutil.rmtree(DIST)
    DIST.mkdir(parents=True)

    server = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--port", str(PORT)]
    )
    try:
        if not wait_for_server():
            print("SERVER DID NOT START")
            return 1
        for url, out in routes().items():
            with urllib.request.urlopen(ORIGIN + url, timeout=10) as resp:
                html = rewrite(resp.read().decode("utf-8"))
            dest = DIST / out
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(html, encoding="utf-8")
            print(f"  {url:20} -> {out}")
    finally:
        server.terminate()

    shutil.copytree(BASE_DIR / "static", DIST / "static")
    # Tell GitHub Pages to serve files as-is (no Jekyll processing).
    (DIST / ".nojekyll").write_text("", encoding="utf-8")
    print(f"Froze {len(routes())} pages + static assets to {DIST}")
    print(f"Base path: {BASE_PATH or '(root)'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
