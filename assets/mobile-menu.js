/**
 * Adornme — Mobile Hamburger Menu
 * 
 * Injects a mobile-friendly hamburger menu into every page automatically.
 * 
 * On mobile (< 768px):
 *   - Hides the desktop nav links
 *   - Shows a hamburger icon (☰) in the top-right
 *   - Tapping opens a full-screen slide-in menu with all navigation links
 * 
 * On desktop (>= 768px):
 *   - Original nav appearance is preserved
 *   - Hamburger is hidden
 * 
 * Include this script on every page after the <nav> element is rendered.
 * It auto-initializes on DOMContentLoaded.
 */

(function () {
  // Inject CSS first
  const styles = `
    /* === Mobile hamburger button === */
    .mobile-menu-btn {
      display: none;
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 10px;
      z-index: 1001;
      align-items: center;
      justify-content: center;
    }
    .mobile-menu-btn span {
      display: block;
      width: 22px;
      height: 1.5px;
      background: var(--ink, #2D4D58);
      position: relative;
      transition: background-color .25s ease;
    }
    .mobile-menu-btn span::before,
    .mobile-menu-btn span::after {
      content: "";
      position: absolute;
      left: 0;
      width: 22px;
      height: 1.5px;
      background: var(--ink, #2D4D58);
      transition: transform .25s ease, top .25s ease;
    }
    .mobile-menu-btn span::before { top: -7px; }
    .mobile-menu-btn span::after { top: 7px; }
    .mobile-menu-btn:hover span,
    .mobile-menu-btn:hover span::before,
    .mobile-menu-btn:hover span::after {
      background: var(--antique-gold, #C9A961);
    }

    /* When menu is open, hamburger becomes X */
    .mobile-menu-btn.is-open span {
      background: transparent;
    }
    .mobile-menu-btn.is-open span::before {
      top: 0;
      transform: rotate(45deg);
    }
    .mobile-menu-btn.is-open span::after {
      top: 0;
      transform: rotate(-45deg);
    }

    /* === Slide-out menu panel === */
    .mobile-menu-panel {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: var(--ivory, #FAF6F0);
      z-index: 1000;
      transform: translateX(-100%);
      transition: transform .35s cubic-bezier(.4, 0, .2, 1);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      visibility: hidden;
    }
    .mobile-menu-panel.is-open {
      transform: translateX(0);
      visibility: visible;
    }

    .mobile-menu-inner {
      padding: 90px 30px 50px 30px;
      max-width: 480px;
      min-height: 100%;
      box-sizing: border-box;
    }

    .mobile-menu-brand {
      font-family: var(--serif, "Cormorant Garamond"), serif;
      font-size: 32px;
      font-weight: 500;
      letter-spacing: 0.18em;
      color: var(--ink, #2D4D58);
      text-decoration: none;
      display: block;
      margin-bottom: 8px;
    }
    .mobile-menu-tagline {
      font-family: var(--serif, "Cormorant Garamond"), serif;
      font-style: italic;
      font-size: 14px;
      color: var(--ink-soft, #5B7480);
      margin: 0 0 36px 0;
    }

    .mobile-menu-section {
      margin-bottom: 32px;
    }
    .mobile-menu-section-label {
      font-family: var(--sans, "Inter"), sans-serif;
      font-size: 11px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--antique-gold, #C9A961);
      margin: 0 0 16px 0;
      font-weight: 500;
    }

    .mobile-menu-link {
      display: block;
      font-family: var(--serif, "Cormorant Garamond"), serif;
      font-size: 24px;
      font-weight: 400;
      color: var(--ink, #2D4D58);
      text-decoration: none;
      padding: 12px 0;
      border-bottom: 1px solid rgba(45, 77, 88, 0.08);
      transition: color .2s ease, padding-left .25s ease;
    }
    .mobile-menu-link:hover,
    .mobile-menu-link:active {
      color: var(--antique-gold, #C9A961);
      padding-left: 8px;
    }
    .mobile-menu-link:last-child {
      border-bottom: none;
    }

    .mobile-menu-foot {
      margin-top: 40px;
      padding-top: 30px;
      border-top: 1px solid rgba(45, 77, 88, 0.12);
      font-family: var(--sans, "Inter"), sans-serif;
      font-size: 13px;
      color: var(--ink-soft, #5B7480);
      line-height: 1.6;
    }
    .mobile-menu-foot a {
      color: var(--ink, #2D4D58);
      text-decoration: none;
    }
    .mobile-menu-foot a:hover {
      color: var(--antique-gold, #C9A961);
    }
    .mobile-menu-foot p { margin: 0 0 6px 0; }

    /* Body lock when menu is open */
    body.mobile-menu-open {
      overflow: hidden;
    }

    /* === Show hamburger on mobile, hide desktop nav links === */
    @media (max-width: 768px) {
      .mobile-menu-btn { display: flex; }

      /* Hide the old desktop nav links on mobile */
      .nav .nav-left,
      .nav .nav-right {
        display: none !important;
      }

      /* Center the logo on mobile */
      .nav .logo {
        margin: 0 auto;
      }

      /* Make the nav bar a fixed-height with relative positioning */
      .nav {
        position: relative;
        min-height: 60px;
      }
    }

    /* Smaller logo on phones */
    @media (max-width: 480px) {
      .nav .logo strong {
        font-size: 20px !important;
      }
      .nav .logo span {
        display: none;
      }
    }
  `;

  // Inject styles
  const styleEl = document.createElement("style");
  styleEl.setAttribute("data-mobile-menu", "true");
  styleEl.textContent = styles;
  document.head.appendChild(styleEl);

  // Wait for DOM to be ready
  function init() {
    const nav = document.querySelector("nav.nav");
    if (!nav) {
      // No nav on this page (unusual) — skip
      return;
    }

    // 1. Add the hamburger button into the nav
    const button = document.createElement("button");
    button.className = "mobile-menu-btn";
    button.setAttribute("aria-label", "Open menu");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = "<span></span>";
    nav.appendChild(button);

    // 2. Build the slide-out menu panel
    const panel = document.createElement("div");
    panel.className = "mobile-menu-panel";
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = `
      <div class="mobile-menu-inner">
        <a class="mobile-menu-brand" href="index.html">ADORNME</a>
        <p class="mobile-menu-tagline">A love story you can wear</p>

        <div class="mobile-menu-section">
          <p class="mobile-menu-section-label">Shop</p>
          <a class="mobile-menu-link" href="trinity-collection.html">The Gallery</a>
          <a class="mobile-menu-link" href="for-him.html">For Him</a>
          <a class="mobile-menu-link" href="customize.html">Customize</a>
        </div>

        <div class="mobile-menu-section">
          <p class="mobile-menu-section-label">Brand</p>
          <a class="mobile-menu-link" href="our-story.html">Our Story</a>
          <a class="mobile-menu-link" href="journal.html">Journal</a>
        </div>

        <div class="mobile-menu-foot">
          <p><a href="mailto:hello@adornme.ai">hello@adornme.ai</a></p>
          <p>Designed in Newport Beach</p>
          <p>Made in Downtown Los Angeles</p>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    // 3. Open/close behavior
    function openMenu() {
      panel.classList.add("is-open");
      button.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Close menu");
      panel.setAttribute("aria-hidden", "false");
      document.body.classList.add("mobile-menu-open");
    }
    function closeMenu() {
      panel.classList.remove("is-open");
      button.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open menu");
      panel.setAttribute("aria-hidden", "true");
      document.body.classList.remove("mobile-menu-open");
    }
    function toggleMenu() {
      if (panel.classList.contains("is-open")) closeMenu();
      else openMenu();
    }

    button.addEventListener("click", toggleMenu);

    // Close when any nav link inside the panel is clicked
    panel.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        closeMenu();
      }
    });

    // Close menu if viewport grows past mobile breakpoint (e.g. rotation)
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768 && panel.classList.contains("is-open")) {
          closeMenu();
        }
      }, 100);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
