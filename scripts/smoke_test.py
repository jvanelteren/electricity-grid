"""Smoke-test the site: routes respond, Learn renders, the game runs cleanly."""

import subprocess
import sys
import time
import urllib.request

from playwright.sync_api import sync_playwright

PORT = 8021
BASE = f"http://127.0.0.1:{PORT}"


def wait_for_server(timeout=20):
    for _ in range(timeout * 5):
        try:
            urllib.request.urlopen(f"{BASE}/", timeout=1)
            return True
        except Exception:
            time.sleep(0.2)
    return False


def main():
    server = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--port", str(PORT)]
    )
    try:
        if not wait_for_server():
            print("SERVER DID NOT START")
            return
        with sync_playwright() as p:
            page = p.chromium.launch().new_page()
            errors = []
            page.on("pageerror", lambda e: errors.append(str(e)))

            # Learn page renders markdown (headings + a table).
            page.goto(f"{BASE}/learn")
            h1 = page.inner_text("h1")
            tables = page.locator(".prose table").count()
            nav = page.locator(".site-nav a").count()
            print(f"/learn  h1='{h1}'  tables={tables}  nav_links={nav}")

            # Game still runs after the rewrite.
            page.goto(f"{BASE}/games/balance")
            note = page.locator(".game-note").count()
            page.click("#start-btn")
            btn = page.inner_text("#start-btn")
            time.sleep(1.2)
            print(
                f"/games/balance  note={note}  start_btn='{btn}'  "
                f"demand={page.inner_text('#demand')}  "
                f"freq={page.inner_text('#frequency')}  "
                f"score={page.inner_text('#score')}"
            )
            print("pageerrors:", errors or "none")
    finally:
        server.terminate()


if __name__ == "__main__":
    main()
