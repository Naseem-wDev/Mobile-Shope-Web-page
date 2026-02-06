(function () {
  async function loadFeatured() {
    const grid = document.getElementById("homeFeaturedGrid");
    if (!grid) return;

    try {
      const res = await fetch("assets/data/mobiles.json", { cache: "no-store" });
      const data = await res.json();

      const picks = data
        .filter((m) => m.featured)
        .slice(0, 6);

      grid.innerHTML = picks.map(renderCard).join("");
      attachBuyNowHandlers(grid, picks);
    } catch (e) {
      grid.innerHTML = "<div class=\"results-note\">Unable to load featured mobiles right now.</div>";
    }
  }

  function formatPKR(n) {
    try {
      return new Intl.NumberFormat("en-PK").format(n);
    } catch {
      return String(n);
    }
  }

  function renderCard(m) {
    const tagClass = m.category === "Flagship" ? "flagship" : (m.category === "Mid-Range" ? "mid" : "budget");

    return `
      <article class="card" aria-label="${escapeHtml(m.brand)} ${escapeHtml(m.model)}">
        <div class="card-media">
          <span class="tag ${tagClass}">${escapeHtml(m.category)}</span>
          <img loading="lazy" src="${escapeHtml(m.image)}" alt="${escapeHtml(m.brand)} ${escapeHtml(m.model)}" />
        </div>
        <div class="card-body">
          <div class="card-top">
            <div>
              <div class="card-title">${escapeHtml(m.brand)} ${escapeHtml(m.model)}</div>
              <div class="card-sub">${escapeHtml(m.ram)} • ${escapeHtml(m.storage)} • ${escapeHtml(m.camera)}</div>
            </div>
            <div class="price">PKR ${formatPKR(m.price)}<small>PTA-approved</small></div>
          </div>

          <div class="specs">
            <div class="spec"><div class="spec-k">RAM</div><div class="spec-v">${escapeHtml(m.ram)}</div></div>
            <div class="spec"><div class="spec-k">Storage</div><div class="spec-v">${escapeHtml(m.storage)}</div></div>
            <div class="spec"><div class="spec-k">Camera</div><div class="spec-v">${escapeHtml(m.camera)}</div></div>
            <div class="spec"><div class="spec-k">Battery</div><div class="spec-v">${escapeHtml(m.battery)}</div></div>
          </div>

          <div class="card-actions">
            <a class="btn btn-primary btn-block" href="#" data-buy-now data-id="${escapeHtml(m.id)}">Buy Now (WhatsApp)</a>
          </div>
        </div>
      </article>
    `;
  }

  function attachBuyNowHandlers(container, items) {
    container.querySelectorAll("[data-buy-now]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");
        const m = items.find((x) => x.id === id);
        if (!m || typeof window.__buildWhatsAppLink__ !== "function") return;

        const msg = `Assalam o Alaikum! I want to buy: ${m.brand} ${m.model}. Price: PKR ${m.price}. Specs: ${m.ram}/${m.storage}, Camera ${m.camera}, Battery ${m.battery}. Please confirm stock & final PTA status.`;
        window.open(window.__buildWhatsAppLink__(msg), "_blank", "noopener,noreferrer");
      });
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", loadFeatured);
  } else {
    loadFeatured();
  }
})();
