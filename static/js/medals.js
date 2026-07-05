// Medal system — track which games have been completed and at what tier.
//
// Games call medalSystem.save(slug, level) when the player meets a win
// condition. level = "silver" or "gold" (gold > silver; gold overrides silver,
// never the reverse).
//
// Stored in localStorage under "medals" as { slug: "silver"|"gold", ... }.
//
// This module is loaded on EVERY page (via base.html), so medalSystem is always
// defined when game JS runs. It also owns all medal *rendering*:
//   * Any element with a data-medal-slug attribute is auto-filled on load with
//     that game's medal — a coloured coin if earned, a dashed outline if not.
//   * Earning (or upgrading) a medal pops the on-page slot and shows a toast,
//     so the reward is immediate, both in-game and on the homepage cards.

window.medalSystem = {
  LABELS: { gold: "Gold", silver: "Silver" },

  // Persist a medal. Returns true only when this is a brand-new earn or a
  // silver→gold upgrade (so callers/animations fire once, not every tick).
  save: function (slug, level) {
    const medals = JSON.parse(localStorage.getItem("medals") || "{}");
    const current = medals[slug];
    const isUpgrade = !current || (current === "silver" && level === "gold");
    if (isUpgrade && current !== level) {
      medals[slug] = level;
      localStorage.setItem("medals", JSON.stringify(medals));
      this._onEarned(slug, level);
      return true;
    }
    return false;
  },

  get: function (slug) {
    const medals = JSON.parse(localStorage.getItem("medals") || "{}");
    return medals[slug] || null;
  },

  getAll: function () {
    return JSON.parse(localStorage.getItem("medals") || "{}");
  },

  // Build a medal element. level null/unknown → dashed "empty" outline.
  medalEl: function (level) {
    const known = level === "gold" || level === "silver";
    const medal = document.createElement("div");
    medal.className = "medal " + (known ? "medal-" + level : "medal-empty");
    medal.textContent = "★";
    medal.title = known
      ? this.LABELS[level] + " medal earned"
      : "No medal yet. Play to earn one";
    return medal;
  },

  // Replace a container's contents with the current medal for `slug`.
  renderInto: function (container, slug, celebrate) {
    if (!container) return;
    container.innerHTML = "";
    const el = this.medalEl(this.get(slug));
    if (celebrate) el.classList.add("medal--celebrate");
    container.appendChild(el);
  },

  // Fill every medal slot on the page (called on load).
  refreshAll: function () {
    const self = this;
    document.querySelectorAll("[data-medal-slug]").forEach(function (c) {
      self.renderInto(c, c.getAttribute("data-medal-slug"));
    });
  },

  _onEarned: function (slug, level) {
    const self = this;
    // Pop every on-page slot for this game (game stage + any homepage card).
    document.querySelectorAll('[data-medal-slug="' + slug + '"]').forEach(function (c) {
      self.renderInto(c, slug, true);
    });
    this._toast(level);
  },

  _toast: function (level) {
    const sub =
      level === "gold" ? "Top marks. Well played!" : "Nice! Keep going for gold.";
    const toast = document.createElement("div");
    toast.className = "medal-toast";
    toast.innerHTML =
      '<span class="medal medal-' + level + ' medal-toast-icon">★</span>' +
      '<span class="medal-toast-text"><strong>' +
      this.LABELS[level] +
      " medal earned!</strong><br><span class='medal-toast-sub'>" +
      sub +
      "</span></span>";
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.classList.add("medal-toast--out");
      setTimeout(function () {
        toast.remove();
      }, 400);
    }, 3600);
  },
};

document.addEventListener("DOMContentLoaded", function () {
  window.medalSystem.refreshAll();
});
