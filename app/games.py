"""Registry of games available in the course.

Each game is described once here. The site's landing page and the game
pages are both generated from this list, so adding a new game means adding
one ``Game`` entry plus its template/JS — nothing else to wire up.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class Game:
    slug: str          # URL fragment, e.g. "balance" -> /games/balance
    title: str         # shown on cards and the game page
    summary: str       # one-line description for the landing page
    concept: str       # the electricity-system idea the game teaches
    available: bool = True  # set False to show a "coming soon" card


GAMES: list[Game] = [
    Game(
        slug="balance",
        title="Balance the Grid",
        summary="Keep generation matched to demand and hold the grid frequency at 50 Hz.",
        concept=(
            "Electricity can't easily be stored, so supply and demand must match "
            "instant by instant. When they drift apart the grid frequency moves "
            "away from 50 Hz — and the operator must respond in seconds."
        ),
    ),
    Game(
        slug="mix",
        title="Build the Energy Mix",
        summary="Choose power sources to meet demand cheaply, cleanly, and reliably.",
        concept="Trade-offs between cost, emissions, and dispatchability of power sources.",
        available=True,
    ),
    Game(
        slug="transmission",
        title="Get It There (Transmission)",
        summary="Power flows over physical lines with capacity limits.",
        concept="The grid is a network; bottlenecks force you to re-route power or change which plants run.",
        available=False,
    ),
    Game(
        slug="market",
        title="The Market / Merit Order",
        summary="A day-ahead auction decides which plants run, and the marginal price sets the cost.",
        concept="Cheapest bids run first; the last plant needed sets one price for everyone.",
        available=False,
    ),
    Game(
        slug="europe",
        title="One Synchronous Europe",
        summary="One grid: a fault in France nudges the frequency you feel in the Netherlands.",
        concept="The continental synchronous area is one shared machine; neighbours share reserves and net imbalances.",
        available=False,
    ),
]

GAMES_BY_SLUG: dict[str, Game] = {g.slug: g for g in GAMES}
