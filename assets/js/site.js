(function () {
  const SHOP = {
    businessName: "Shigari Mobile World",
    phoneDisplay: "+92 310 1234567",
    phoneE164: "+923101234567",
    whatsappE164: "+923101234567",
    email: "shigarimobileshop@gmail.com"
  };

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((el) => {
      el.textContent = value;
    });
  }

  function buildWhatsAppLink(message) {
    const text = encodeURIComponent(message || `Assalam o Alaikum! I want to buy a mobile from ${SHOP.businessName}.`);
    const number = SHOP.whatsappE164.replace(/\D/g, "");
    return `https://wa.me/${number}?text=${text}`;
  }

  function applyWhatsAppLinks() {
    document.querySelectorAll("[data-whatsapp-link]").forEach((a) => {
      const msg = a.getAttribute("data-whatsapp-message") || "";
      a.setAttribute("href", buildWhatsAppLink(msg));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
  }

  function applyContactLinks() {
    document.querySelectorAll("[data-call-link]").forEach((a) => {
      a.setAttribute("href", `tel:${SHOP.phoneE164}`);
    });
    document.querySelectorAll("[data-email-link]").forEach((a) => {
      a.setAttribute("href", `mailto:${SHOP.email}`);
    });
  }

  function initNav() {
    const btn = document.querySelector("[data-nav-toggle]");
    const mobileNav = document.querySelector("[data-mobile-nav]");
    if (!btn || !mobileNav) return;

    btn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });

    mobileNav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
  }

  function initYear() {
    const y = new Date().getFullYear();
    document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = String(y)));
  }

  function init() {
    setText("[data-shop-phone]", SHOP.phoneDisplay);
    setText("[data-shop-whatsapp]", SHOP.phoneDisplay);
    setText("[data-shop-email]", SHOP.email);

    applyWhatsAppLinks();
    applyContactLinks();
    initNav();
    initYear();

    window.__SHIGARI_SHOP__ = SHOP;
    window.__buildWhatsAppLink__ = buildWhatsAppLink;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
