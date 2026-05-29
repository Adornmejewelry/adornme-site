/**
 * Adornme — Mobile Hamburger Menu (v2)
 *
 * Changes in v2:
 *   - Uses absolute paths (with leading /) for menu links so navigation
 *     always works from any page, no matter how deep
 *   - Menu now opens at 82% width with a dark overlay on the remaining 18%
 *   - Tapping the overlay closes the menu
 *   - Explicit X close button at top-right of the menu itself
 *   - Improved animation and accessibility
 */

(function () {
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

    /* === Overlay backdrop (dark dim layer over the rest of the screen) === */
    .mobile-menu-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(45, 77, 88, 0);
      z-index: 998;
      opacity: 0;
      visibility: hidden;
      transition: opacity .35s ease, visibility .35s ease, background-color .35s ease;
      cursor: pointer;
    }
    .mobile-menu-overlay.is-open {
      opacity: 1;
      visibility: visible;
      background: rgba(45, 77, 88, 0.45);
    }

    /* === Slide-out menu panel === */
    .mobile-menu-panel {
      position: fixed;
      top: 0;
      left: 0;
      width: 82%;
      max-width: 380px;
      height: 100vh;
      background: var(--ivory, #FAF6F0);
      z-index: 999;
      transform: translateX(-100%);
      transition: transform .35s cubic-bezier(.4, 0, .2, 1);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      box-shadow: 0 0 24px rgba(0, 0, 0, 0.08);
    }
    .mobile-menu-panel.is-open {
      transform: translateX(0);
    }

    /* X close button inside the panel */
    .mobile-menu-close {
      position: absolute;
      top: 16px;
      right: 16px;
      width: 44px;
      height: 44px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 10px;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mobile-menu-close::before,
    .mobile-menu-close::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 1.5px;
      background: var(--ink, #2D4D58);
      transition: background-color .2s ease;
    }
    .mobile-menu-close::before { transform: rotate(45deg); }
    .mobile-menu-close::after { transform: rotate(-45deg); }
    .mobile-menu-close:hover::before,
    .mobile-menu-close:hover::after {
      background: var(--antique-gold, #C9A961);
    }

    .mobile-menu-inner {
      padding: 70px 28px 50px 28px;
      min-height: 100%;
      box-sizing: border-box;
    }

    .mobile-menu-brand {
      font-family: var(--serif, "Cormorant Garamond"), serif;
      font-size: 28px;
      font-weight: 500;
      letter-spacing: 0.18em;
      color: var(--ink, #2D4D58);
      text-decoration: none;
      display: block;
      margin-bottom: 6px;
    }
    .mobile-menu-tagline {
      font-family: var(--serif, "Cormorant Garamond"), serif;
      font-style: italic;
      font-size: 13px;
      color: var(--ink-soft, #5B7480);
      margin: 0 0 32px 0;
    }

    .mobile-menu-section {
      margin-bottom: 28px;
    }
    .mobile-menu-section-label {
      font-family: var(--sans, "Inter"), sans-serif;
      font-size: 10px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--antique-gold, #C9A961);
      margin: 0 0 12px 0;
      font-weight: 500;
    }

    .mobile-menu-link {
      display: block;
      font-family: var(--serif, "Cormorant Garamond"), serif;
      font-size: 22px;
      font-weight: 400;
      color: var(--ink, #2D4D58);
      text-decoration: none;
      padding: 10px 0;
      border-bottom: 1px solid rgba(45, 77, 88, 0.08);
      transition: color .2s ease, padding-left .25s ease;
    }
    .mobile-menu-link:hover,
    .mobile-menu-link:active {
      color: var(--antique-gold, #C9A961);
      padding-left: 6px;
    }
    .mobile-menu-section .mobile-menu-link:last-child {
      border-bottom: none;
    }

    .mobile-menu-foot {
      margin-top: 36px;
      padding-top: 24px;
      border-top: 1px solid rgba(45, 77, 88, 0.12);
      font-family: var(--sans, "Inter"), sans-serif;
      font-size: 12px;
      color: var(--ink-soft, #5B7480);
      line-height: 1.7;
    }
    .mobile-menu-foot a {
      color: var(--ink, #2D4D58);
      text-decoration: none;
    }
    .mobile-menu-foot a:hover { color: var(--antique-gold, #C9A961); }
    .mobile-menu-foot p { margin: 0 0 4px 0; }

    /* Body lock when menu is open — prevents scroll bleed through */
    body.mobile-menu-open {
      overflow: hidden;
    }

    /* === Mobile breakpoint: show hamburger, hide desktop nav,
           make top nav STICKY (always visible) === */
    @media (max-width: 768px) {
      .mobile-menu-btn { display: flex; }
      .nav .nav-left,
      .nav .nav-right {
        display: none !important;
      }
      .nav .logo {
        margin: 0 auto;
      }
      /* Pin the nav to the top of the viewport on mobile.
         The hamburger is always reachable, no matter how far the user scrolls. */
      .nav {
        position: fixed !important;
        top: 0;
        left: 0;
        right: 0;
        z-index: 900;
        min-height: 60px;
        background: var(--ivory, #FAF6F0);
        /* Subtle frosted-glass effect on supporting browsers */
        backdrop-filter: saturate(180%) blur(12px);
        -webkit-backdrop-filter: saturate(180%) blur(12px);
        background: rgba(250, 246, 240, 0.92);
        border-bottom: 1px solid rgba(45, 77, 88, 0.08);
      }
      /* Compensate for the fixed nav by adding top padding to the body.
         60px nav + ~32px announce bar = ~92px */
      body {
        padding-top: 60px;
      }
      /* Hide the announce bar on mobile to save vertical space.
         The promo text is visible on desktop only. */
      .announce {
        display: none;
      }

      /* === Override "sticky" elements that get in the way on mobile === */

      /* Gallery: the filter chip bar should NOT stick to the top on mobile.
         It blocks content as you scroll. Let it scroll naturally. */
      .gallery-filter-bar,
      .filter-bar,
      .trinity-filter-bar,
      .gallery .sticky-filters,
      .shop-filter,
      [class*="sticky-filter"] {
        position: static !important;
        top: auto !important;
      }

      /* Customize: the preview image should not stick at the top.
         Let it scroll away naturally so customers can reach the configuration below. */
      .preview-box,
      .preview-wrap,
      .customize-preview,
      [class*="sticky-preview"],
      .product-image-wrap {
        position: static !important;
        top: auto !important;
      }
    }

    /* Smaller logo on small phones */
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

  function init() {
    const nav = document.querySelector("nav.nav");
    if (!nav) return;

    // 1. Hamburger button
    const button = document.createElement("button");
    button.className = "mobile-menu-btn";
    button.setAttribute("aria-label", "Open menu");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = "<span></span>";
    nav.appendChild(button);

    // 2. Dark overlay (tap to close)
    const overlay = document.createElement("div");
    overlay.className = "mobile-menu-overlay";
    overlay.setAttribute("aria-hidden", "true");
    document.body.appendChild(overlay);

    // 3. Slide-out panel
    // NOTE: Using absolute paths (leading /) so links work from any page
    const panel = document.createElement("div");
    panel.className = "mobile-menu-panel";
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = `
      <button class="mobile-menu-close" aria-label="Close menu" type="button"></button>
      <div class="mobile-menu-inner">
        <a class="mobile-menu-brand" href="/index.html">ADORNME</a>
        <p class="mobile-menu-tagline">A love story you can wear</p>

        <div class="mobile-menu-section">
          <p class="mobile-menu-section-label">Shop</p>
          <a class="mobile-menu-link" href="/trinity-collection.html">The Gallery</a>
          <a class="mobile-menu-link" href="/customize.html">Customize</a>
          <a class="mobile-menu-link" href="/for-him.html">For Him</a>
        </div>

        <div class="mobile-menu-section">
          <p class="mobile-menu-section-label">Brand</p>
          <a class="mobile-menu-link" href="/our-story.html">Our Story</a>
          <a class="mobile-menu-link" href="/journal.html">Journal</a>
        </div>

        <div class="mobile-menu-foot">
          <p><a href="mailto:hello@adornme.ai">hello@adornme.ai</a></p>
          <p>Designed in Newport Beach</p>
          <p>Made in Downtown Los Angeles</p>
        </div>
      </div>
    `;
    document.body.appendChild(panel);

    const closeBtn = panel.querySelector(".mobile-menu-close");

    function openMenu() {
      panel.classList.add("is-open");
      overlay.classList.add("is-open");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", "Close menu");
      panel.setAttribute("aria-hidden", "false");
      overlay.setAttribute("aria-hidden", "false");
      document.body.classList.add("mobile-menu-open");
    }
    function closeMenu() {
      panel.classList.remove("is-open");
      overlay.classList.remove("is-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", "Open menu");
      panel.setAttribute("aria-hidden", "true");
      overlay.setAttribute("aria-hidden", "true");
      document.body.classList.remove("mobile-menu-open");
    }

    button.addEventListener("click", openMenu);
    closeBtn.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);

    // Close on ESC key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && panel.classList.contains("is-open")) {
        closeMenu();
      }
    });

    // Close if resized past mobile breakpoint
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

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
