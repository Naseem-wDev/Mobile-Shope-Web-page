(function () {
  function initForm() {
    const form = document.getElementById("contactForm");
    if (!form || typeof window.__buildWhatsAppLink__ !== "function") return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = (document.getElementById("name").value || "").trim();
      const phone = (document.getElementById("phone").value || "").trim();
      const message = (document.getElementById("message").value || "").trim();

      const msg = `Assalam o Alaikum!\n\nName: ${name}\nPhone: ${phone}\nMessage: ${message}\n\nPlease reply with availability & final price (PTA).`;
      window.open(window.__buildWhatsAppLink__(msg), "_blank", "noopener,noreferrer");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForm);
  } else {
    initForm();
  }
})();
