"""Collect TenneT's public balancing documentation for personal study.

Why a real browser: tennet.eu sits behind bot protection that returns HTTP 403
to plain server-side fetchers (requests/urllib). A real Chromium via Playwright
loads the same public, free, non-login pages a person would see in a browser.

Politeness / ethics:
  * Their robots.txt blocks ~30 named AI-training crawlers entirely, and for
    ``User-agent: *`` only disallows ``/api/``. This script never touches /api/
    and only fetches the curated balancing pages below.
  * One request at a time, with a delay between pages.
  * Read-only: we only GET public documentation.

Output:
  docs/sources/tennet/<slug>.md   one markdown file per page (with source header)
  docs/sources/tennet/files/      any linked PDFs discovered on those pages
  docs/sources/tennet/manifest.json

Run:  uv run python scripts/scrape_tennet.py
"""

from __future__ import annotations

import json
import re
import time
from datetime import date
from pathlib import Path
from urllib.parse import urljoin, urlparse

from bs4 import BeautifulSoup
from markdownify import markdownify as to_markdown
from playwright.sync_api import sync_playwright

OUT_DIR = Path(__file__).resolve().parent.parent / "docs" / "sources" / "tennet"
FILES_DIR = OUT_DIR / "files"
DELAY_SECONDS = 2.0
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
)

# Curated seed list — pages directly about the balancing process.
SEED_URLS = [
    "https://www.tennet.eu/nl-en/markets/ancillary-services",
    "https://www.tennet.eu/nl-en/markets/dutch-market/balancing-markets",
    "https://www.tennet.eu/markets/ancillary-services/fcr-documents",
    "https://www.tennet.eu/nl-en/markets/transparency-data/merit-order-list",
    "https://www.tennet.eu/nl-en/grids-and-markets/transparency-data-netherlands/settled-imbalance-volumes",
]

# Only follow/download links whose URL hints at balancing relevance.
RELEVANT = re.compile(
    r"(balanc|fcr|afrr|mfrr|imbalance|reserve|ancillary|frequency|merit)",
    re.IGNORECASE,
)


def slugify(url: str) -> str:
    path = urlparse(url).path.strip("/") or "index"
    return re.sub(r"[^a-z0-9]+", "-", path.lower()).strip("-")


def extract_main_markdown(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "header", "footer", "noscript"]):
        tag.decompose()
    main = soup.find("main") or soup.find("article") or soup.body or soup
    return to_markdown(str(main), heading_style="ATX").strip()


def main() -> None:
    FILES_DIR.mkdir(parents=True, exist_ok=True)
    today = date.today().isoformat()
    manifest: list[dict] = []
    pdf_links: set[str] = set()

    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(user_agent=UA)
        page = ctx.new_page()

        for url in SEED_URLS:
            try:
                resp = page.goto(url, wait_until="domcontentloaded", timeout=30000)
                status = resp.status if resp else 0
            except Exception as e:  # noqa: BLE001
                print(f"  ERROR {type(e).__name__} {url}")
                manifest.append({"url": url, "status": "error", "error": str(e)})
                time.sleep(DELAY_SECONDS)
                continue

            if status != 200:
                print(f"  {status} (skipped) {url}")
                manifest.append({"url": url, "status": status})
                time.sleep(DELAY_SECONDS)
                continue

            html = page.content()
            markdown = extract_main_markdown(html)
            slug = slugify(url)
            out_file = OUT_DIR / f"{slug}.md"
            out_file.write_text(
                f"<!-- Source: {url}\n     Retrieved: {today} via Playwright -->\n\n"
                f"# {slug}\n\nSource: {url}\n\n---\n\n{markdown}\n",
                encoding="utf-8",
            )
            words = len(markdown.split())
            print(f"  200 saved {out_file.name} ({words} words) {url}")
            manifest.append(
                {"url": url, "status": 200, "file": out_file.name, "words": words}
            )

            # Discover relevant PDF links on this page.
            soup = BeautifulSoup(html, "html.parser")
            for a in soup.find_all("a", href=True):
                href = urljoin(url, a["href"])
                if href.lower().endswith(".pdf") and RELEVANT.search(href):
                    pdf_links.add(href)

            time.sleep(DELAY_SECONDS)

        # Download discovered PDFs via the same browser context.
        downloaded = []
        for href in sorted(pdf_links):
            name = Path(urlparse(href).path).name
            try:
                r = ctx.request.get(href, timeout=30000)
                if r.ok:
                    (FILES_DIR / name).write_bytes(r.body())
                    print(f"  PDF saved files/{name}")
                    downloaded.append({"url": href, "file": f"files/{name}"})
                else:
                    print(f"  PDF {r.status} {href}")
            except Exception as e:  # noqa: BLE001
                print(f"  PDF ERROR {type(e).__name__} {href}")
            time.sleep(DELAY_SECONDS)

        browser.close()

    (OUT_DIR / "manifest.json").write_text(
        json.dumps(
            {"retrieved": today, "pages": manifest, "pdfs": downloaded},
            indent=2,
        ),
        encoding="utf-8",
    )
    print(f"\nDone. Output in {OUT_DIR}")


if __name__ == "__main__":
    main()
