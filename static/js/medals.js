// Medal system — track which games and levels (Explore/Operate) have been completed.
//
// Games call saveMedal(slug, level) when the player achieves a win condition.
// level = "silver" (Explore) or "gold" (Operate).
//
// Stored in localStorage under key "medals" as { slug: "silver"|"gold", ... }.
// If a player earns gold, silver is overwritten (gold > silver).
// Homepage reads this and displays medal icons on game cards.

window.medalSystem = {
  save: function (slug, level) {
    const medals = JSON.parse(localStorage.getItem("medals") || "{}");
    const current = medals[slug];

    // Gold overrides silver, but not vice versa
    if (!current || (current === "silver" && level === "gold")) {
      medals[slug] = level;
      localStorage.setItem("medals", JSON.stringify(medals));
    }
  },

  get: function (slug) {
    const medals = JSON.parse(localStorage.getItem("medals") || "{}");
    return medals[slug] || null;
  },

  getAll: function () {
    return JSON.parse(localStorage.getItem("medals") || "{}");
  },
};
