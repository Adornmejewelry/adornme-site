/**
 * Adornme newsletter sign-up (v1.0, Nov 16 2026)
 * Sends the email to Shopify's built-in newsletter form, which adds the person to
 * Shopify > Customers, subscribed to email marketing, tagged "newsletter".
 * The post goes to a hidden frame, so the visitor stays on the page.
 *
 * Usage: <form data-adornme-newsletter> with an <input type="email"> and a submit <button>.
 */
(function () {
  const SHOP = "https://adornme-809.myshopify.com";
  const okEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

  function frame() {
    let f = document.getElementById("adornmeNewsletterFrame");
    if (!f) {
      f = document.createElement("iframe");
      f.id = "adornmeNewsletterFrame"; f.name = "adornmeNewsletterFrame";
      f.title = "Newsletter sign-up"; f.setAttribute("aria-hidden", "true"); f.tabIndex = -1;
      f.style.cssText = "position:absolute;width:0;height:0;border:0;visibility:hidden;";
      document.body.appendChild(f);
    }
    return f;
  }

  function subscribe(email, source) {
    const form = document.createElement("form");
    form.method = "POST"; form.action = `${SHOP}/contact#contact_form`;
    form.target = frame().name; form.acceptCharset = "UTF-8"; form.style.display = "none";
    const fields = { form_type: "customer", utf8: "✓", "contact[email]": email, "contact[tags]": `newsletter, ${source}` };
    for (const [k, v] of Object.entries(fields)) {
      const i = document.createElement("input"); i.type = "hidden"; i.name = k; i.value = v; form.appendChild(i);
    }
    document.body.appendChild(form); form.submit(); setTimeout(() => form.remove(), 1000);
  }

  function wire(form) {
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"], button');
    const note = form.parentElement.querySelector("[data-newsletter-note]");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = (input.value || "").trim();
      if (!okEmail(email)) { input.focus(); if (note) note.textContent = "Please enter a valid email address."; return; }
      subscribe(email, form.dataset.source || "adornme.ai");
      btn.textContent = "✓ Subscribed"; btn.disabled = true; input.value = ""; input.disabled = true;
      if (note) note.textContent = "Thank you — you're on the list. You can unsubscribe at any time.";
    });
  }

  function init() { document.querySelectorAll("form[data-adornme-newsletter]").forEach(wire); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
  window.AdornmeNewsletter = { subscribe };
})();
