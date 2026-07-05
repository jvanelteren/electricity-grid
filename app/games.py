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
        summary="Pick your power plants and cover the whole day. The cheapest, cleanest ones don't take orders — they follow the weather.",
        concept=(
            "Some plants obey you. The others obey the weather — and those are "
            "the cheapest, cleanest ones. Build a mix that covers every "
            "hour anyway, and keep it affordable and clean."
        ),
        available=True,
    ),
    Game(
        slug="transmission",
        title="Get It There",
        summary="The market's cheapest plan doesn't fit the wires. Adjust where power is made to keep every line within its limit.",
        concept=(
            "Electricity flows over physical lines with limited capacity — and you "
            "can't steer it, only choose where to make it. When the cheap plan "
            "overloads a line, you pay closer, pricier plants to run instead. "
            "That cost is called redispatch, and Europe pays billions for it every year."
        ),
        available=True,
    ),
    Game(
        slug="market",
        title="The Bidder",
        summary="You own one gas plant. Bid it into the daily power auction, read the market — and one cold day, your bid sets the price for the whole country.",
        concept=(
            "A day-ahead auction stacks all bids cheapest-first; the last plant "
            "needed sets one price that everyone gets. Bid your true cost and the "
            "market pays you a margin whenever you run — the craft is knowing "
            "when you'll run at all."
        ),
        available=True,
    ),
    Game(
        slug="europe",
        title="In Sync",
        summary="Every power plant from Lisbon to Istanbul spins as one machine. Feel what your neighbours do for you — until the day the machine splits in two.",
        concept=(
            "The grid you've been balancing was never just yours: every generator "
            "on the continent is locked to the same frequency, one shared machine. "
            "A power plant tripping in France dips the lights in Amsterdam — and "
            "help flows back automatically, because connection is what keeps "
            "everyone steady."
        ),
        available=True,
    ),
    Game(
        slug="home",
        title="Flip the Switch",
        summary="After five games running the grid, you're just… home. Shift your use to the hours when power is cheap and clean — and discover you were a power plant all along.",
        concept=(
            "Demand isn't weather — electricity use can move through time. Charge "
            "the car, run the heat pump, and fill the home battery in the cheap, "
            "clean hours, and the same energy costs less and pollutes less. "
            "Millions of households doing this is the grid's other half."
        ),
        available=True,
    ),
]

GAMES_BY_SLUG: dict[str, Game] = {g.slug: g for g in GAMES}
