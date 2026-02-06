(function () {
  const els = {
    grid: null,
    count: null,
    search: null,
    brand: null,
    price: null,
    reset: null,
    tabs: null
  };

  let all = [];
  let activeCategory = "all";

  function $(id) {
    return document.getElementById(id);
  }

  function formatPKR(n) {
    try {
      return new Intl.NumberFormat("en-PK").format(n);
    } catch {
      return String(n);
    }
  }

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
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
            <div class="price">PKR ${formatPKR(m.price)}<small>Confirm on WhatsApp</small></div>
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

  function uniqueBrands(items) {
    const set = new Set(items.map((x) => x.brand));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }

  function applyBrandOptions(items) {
    const brands = uniqueBrands(items);
    els.brand.innerHTML = [
      "<option value=\"all\">All brands</option>",
      ...brands.map((b) => `<option value=\"${escapeHtml(b)}\">${escapeHtml(b)}</option>`)
    ].join("");
  }

  function matchesFilters(m) {
    const q = (els.search.value || "").trim().toLowerCase();
    const brand = els.brand.value;
    const maxPrice = els.price.value === "all" ? null : Number(els.price.value);

    if (activeCategory !== "all" && m.category !== activeCategory) return false;

    if (brand !== "all" && m.brand !== brand) return false;

    if (maxPrice != null && m.price > maxPrice) return false;

    if (q) {
      const hay = `${m.brand} ${m.model}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }

    return true;
  }

  function render() {
    const filtered = all.filter(matchesFilters);
    els.count.textContent = `${filtered.length} mobiles found`;
    els.grid.innerHTML = filtered.map(renderCard).join("");

    els.grid.querySelectorAll("[data-buy-now]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const id = btn.getAttribute("data-id");
        const m = all.find((x) => x.id === id);
        if (!m || typeof window.__buildWhatsAppLink__ !== "function") return;

        const msg = `Assalam o Alaikum! I want to buy: ${m.brand} ${m.model}. Price: PKR ${m.price}. Specs: ${m.ram}/${m.storage}, Camera ${m.camera}, Battery ${m.battery}. Please confirm stock & final PTA status.`;
        window.open(window.__buildWhatsAppLink__(msg), "_blank", "noopener,noreferrer");
      });
    });
  }

  function setActiveCategory(category) {
    activeCategory = category;
    document.querySelectorAll("#categoryTabs .pill").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-category") === category);
    });
    render();
  }

  async function init() {
    els.grid = $("mobilesGrid");
    els.count = $("resultsCount");
    els.search = $("search");
    els.brand = $("brand");
    els.price = $("price");
    els.reset = $("resetFilters");
    els.tabs = $("categoryTabs");

    if (!els.grid) return;

    const res = await fetch("assets/data/mobiles.json", { cache: "no-store" });
    all = await res.json();

    applyBrandOptions(all);

    els.search.addEventListener("input", render);
    els.brand.addEventListener("change", render);
    els.price.addEventListener("change", render);
    els.reset.addEventListener("click", () => {
      els.search.value = "";
      els.brand.value = "all";
      els.price.value = "all";
      setActiveCategory("all");
    });

    if (els.tabs) {
      els.tabs.querySelectorAll("button").forEach((b) => {
        b.addEventListener("click", () => setActiveCategory(b.getAttribute("data-category")));
      });
    }

    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
