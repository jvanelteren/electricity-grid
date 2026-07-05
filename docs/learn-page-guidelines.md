# Learn page guidelines

Instructions for writing and maintaining the Learn page. The page (`/learn`) renders [european-grid-balancing.md](european-grid-balancing.md) via `render_doc()` in [app/main.py](../app/main.py), which strips relative links (to `../` and `sources/`) down to plain text. External http(s) links survive, so only link to things that exist on the public web.

## Purpose

Real-world background for someone who just played one of the games and wants to know how much of it was true. It is not a reference manual: the captured TenneT sources in [sources/tennet/](sources/tennet/) hold the detail, and the glossary tooltips inside the games hold the definitions.

## Structure

1. A short intro: what this page is, where the material comes from. Three sentences maximum.
2. One `##` section per game, in play order, titled `Game Title: plain-language claim` (for example, `Get It There: wires have limits`). Game titles must match [app/games.py](../app/games.py).
3. A closing `## Sources` paragraph. One paragraph, not a list.

No other sections. No provenance or methodology story, no disclaimers; that background lives in CLAUDE.md and the scripts.

## Length

The whole page stays under about 900 words. Each game section gets two or three short paragraphs. If a new fact deserves a place, an old one gives up its place.

## Tone

Follow [avoid-ai-writing.md](../avoid-ai-writing.md), docs profile. The rules that matter most here: em dashes near zero, at most one or two bolded terms per section (bold marks a real term's first appearance, nothing else), no filler transitions, no significance inflation, varied sentence length. Write like you're explaining to a curious friend, then read it aloud once.

## Facts

Every number must trace to the TenneT captures in [sources/tennet/](sources/tennet/) or to the EU regulations (SO GL 2017/1485, EB GL 2017/2195). The page and the games tell the same truth: nothing here may contradict game copy or `static/js/glossary.js`. When in doubt, drop the number and keep the idea.

## Maintenance

When a game's concept changes, rewrite its section. When a new game ships, add its section in play order. Run the smoke test afterwards; it renders the page headless and fails on errors.
