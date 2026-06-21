"""Download TenneT's public balancing PDFs (hosted on AWS S3) and extract text.

The PDFs are linked from TenneT's document-library pages and served from
``tennet-drupal.s3.eu-central-1.amazonaws.com`` — plain S3, no bot protection,
so a normal HTTP GET works (unlike www.tennet.eu). We save the original PDF to
docs/sources/tennet/files/ and a text extraction alongside the other sources.

Add new URLs to PDFS as you discover them on the document pages.

Run:  uv run python scripts/fetch_pdfs.py
"""

from __future__ import annotations

import re
import urllib.request
from datetime import date
from pathlib import Path
from urllib.parse import unquote, urlparse

from pypdf import PdfReader

TENNET_DIR = Path(__file__).resolve().parent.parent / "docs" / "sources" / "tennet"
FILES_DIR = TENNET_DIR / "files"

PDFS = [
    "https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2024-10/Imbalance%20Pricing%20System.pdf",
    "https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2026-04/Handboek%20FCR%20voor%20BSPs%20-%20EN_20260408%20%281%29.pdf",
    "https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2026-05/Manual%20Bidding%20BTP.pdf",
]


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def main() -> None:
    FILES_DIR.mkdir(parents=True, exist_ok=True)
    today = date.today().isoformat()

    for url in PDFS:
        fname = unquote(Path(urlparse(url).path).name)
        pdf_path = FILES_DIR / fname
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=60) as r:
                pdf_path.write_bytes(r.read())
        except Exception as e:  # noqa: BLE001
            print(f"  ERROR downloading {fname}: {e}")
            continue

        try:
            reader = PdfReader(str(pdf_path))
            text = "\n\n".join(page.extract_text() or "" for page in reader.pages)
        except Exception as e:  # noqa: BLE001
            print(f"  downloaded {fname} but text extraction failed: {e}")
            continue

        stem = slugify(pdf_path.stem)
        md_path = TENNET_DIR / f"{stem}.md"
        md_path.write_text(
            f"<!-- Source: {url}\n     Retrieved: {today} (PDF, text extracted) -->\n\n"
            f"# {stem}\n\nSource PDF: {url}\nLocal copy: files/{fname}\n\n---\n\n"
            f"{text.strip()}\n",
            encoding="utf-8",
        )
        words = len(text.split())
        print(f"  saved files/{fname} + {md_path.name} ({len(reader.pages)} pages, {words} words)")

    print(f"\nDone. PDFs in {FILES_DIR}")


if __name__ == "__main__":
    main()
