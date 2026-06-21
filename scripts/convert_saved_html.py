"""Convert manually-saved TenneT HTML pages into clean cited markdown.

Workflow:
  1. In your browser, open a TenneT page and press Ctrl+S.
  2. Choose "Webpage, HTML Only" (NOT "Single File / .mhtml").
  3. Save it into  docs/sources/tennet/inbox/  (filename doesn't matter).

Then run:  uv run python scripts/convert_saved_html.py

For each .html in inbox/ this writes docs/sources/tennet/<slug>.md in the same
format as the auto-scraped page, recovering the original URL from the
"saved from url=(...)" comment that Chrome/Edge embed. The manifest is updated
and processed files are moved to inbox/done/.
"""

from __future__ import annotations

import json
import re
from datetime import date
from pathlib import Path
from urllib.parse import urlparse

from bs4 import BeautifulSoup
from markdownify import markdownify as to_markdown

TENNET_DIR = Path(__file__).resolve().parent.parent / "docs" / "sources" / "tennet"
INBOX = TENNET_DIR / "inbox"
DONE = INBOX / "done"
MANIFEST = TENNET_DIR / "manifest.json"

# Chrome/Edge embed: <!-- saved from url=(0047)https://www.tennet.eu/... -->
MOTW = re.compile(r"saved from url=\(\d+\)(\S+)")


def read_text(path: Path) -> str:
    raw = path.read_bytes()
    for enc in ("utf-8", "cp1252", "latin-1"):
        try:
            return raw.decode(enc)
        except UnicodeDecodeError:
            continue
    return raw.decode("utf-8", errors="replace")


def recover_url(html: str) -> str | None:
    m = MOTW.search(html)
    return m.group(1).strip() if m else None


def slugify(url: str | None, fallback: str) -> str:
    base = urlparse(url).path.strip("/") if url else fallback
    return re.sub(r"[^a-z0-9]+", "-", (base or fallback).lower()).strip("-")


def extract_main_markdown(html: str) -> str:
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup(["script", "style", "nav", "header", "footer", "noscript"]):
        tag.decompose()
    main = soup.find("main") or soup.find("article") or soup.body or soup
    return to_markdown(str(main), heading_style="ATX").strip()


def load_manifest() -> dict:
    if MANIFEST.exists():
        return json.loads(MANIFEST.read_text(encoding="utf-8"))
    return {"retrieved": date.today().isoformat(), "pages": [], "pdfs": []}


def main() -> None:
    files = sorted(p for p in INBOX.glob("*.htm*") if p.is_file())
    if not files:
        print(f"No .html files found in {INBOX}")
        print("Save TenneT pages there as 'Webpage, HTML Only' and re-run.")
        return

    DONE.mkdir(exist_ok=True)
    manifest = load_manifest()
    today = date.today().isoformat()
    by_url = {p.get("url"): p for p in manifest["pages"]}

    for path in files:
        html = read_text(path)
        url = recover_url(html)
        slug = slugify(url, path.stem)
        markdown = extract_main_markdown(html)
        words = len(markdown.split())
        src_line = url or f"(manually saved file: {path.name})"

        out_file = TENNET_DIR / f"{slug}.md"
        out_file.write_text(
            f"<!-- Source: {src_line}\n     Retrieved: {today} via saved HTML -->\n\n"
            f"# {slug}\n\nSource: {src_line}\n\n---\n\n{markdown}\n",
            encoding="utf-8",
        )

        entry = {
            "url": url or src_line,
            "status": 200,
            "file": out_file.name,
            "words": words,
            "via": "saved-html",
        }
        by_url[entry["url"]] = entry
        print(f"  saved {out_file.name} ({words} words)  <- {path.name}  [{src_line}]")
        path.rename(DONE / path.name)

    manifest["pages"] = list(by_url.values())
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"\nDone. Updated {MANIFEST}")


if __name__ == "__main__":
    main()
