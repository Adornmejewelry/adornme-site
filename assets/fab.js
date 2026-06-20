(function() {
  const fabHTML = `
  <div id="adornme-fab" class="adornme-fab" aria-label="Contact Adornme">
    <button class="adornme-fab-toggle" aria-expanded="false" aria-controls="adornme-fab-menu">
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true">
        <path fill="white" d="M12 2a10 10 0 0 1 6.32 17.78L22 22l-2.31-3.61A10 10 0 1 1 12 2zm0 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-1.5 4.5v6h3v-6h-3z"/>
      </svg>
    </button>
    <div id="adornme-fab-menu" class="adornme-fab-menu" role="menu">
      <a href="https://wa.me/19498658009?text=Hi%20Mira%2C%20I%27d%20love%20to%20learn%20more%20about%20Adornme%20jewelry."
         target="_blank" rel="noopener"
         class="adornme-fab-item" role="menuitem" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="white" d="M20.52 3.48A11.86 11.86 0 0 0 12 0C5.4 0 .03 5.37.03 12c0 2.11.55 4.17 1.6 5.98L0 24l6.2-1.62A11.93 11.93 0 0 0 12 24c6.6 0 11.97-5.37 11.97-12 0-3.2-1.25-6.21-3.45-8.52ZM12 21.86a9.83 9.83 0 0 1-5.02-1.37l-.36-.21-3.68.97.98-3.59-.23-.37A9.85 9.85 0 1 1 12 21.86Zm5.45-7.36c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.43-1.5-.9-.8-1.5-1.79-1.68-2.09-.17-.3-.02-.46.13-.61.13-.13.3-.34.45-.51.15-.17.2-.29.3-.49.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.09 3.2 5.07 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.08 1.77-.72 2.02-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35Z"/>
        </svg>
        <span>WhatsApp</span>
      </a>
      <a href="mailto:hello@adornme.ai?subject=Adornme%20Inquiry"
         class="adornme-fab-item adornme-fab-item--email" role="menuitem" aria-label="Email Adornme">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="white" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.01L12 13l8-6.99V6H4zm16 2.24-8 7-8-7V18h16V8.24z"/>
        </svg>
        <span>Email</span>
      </a>
      <a href="tel:+19498658009"
         class="adornme-fab-item adornme-fab-item--phone" role="menuitem" aria-label="Call Adornme">
        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
          <path fill="white" d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24a11.36 11.36 0 0 0 3.58.57c.55 0 1 .45 1 1v3.49c0 .55-.45 1-1 1A17 17 0 0 1 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.58.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <span>Call</span>
      </a>
    </div>
  </div>`;

  const fabCSS = `
    .adornme-fab { position: fixed; bottom: 24px; right: 24px; z-index: 9999; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
    .adornme-fab-toggle { width: 56px; height: 56px; border-radius: 50%; background: #2d4d58; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(0,0,0,0.2); transition: transform 0.2s ease, background 0.2s ease; order: 2; }
    .adornme-fab-toggle:hover { background: #1f3942; transform: scale(1.05); }
    .adornme-fab-menu { display: flex; flex-direction: column; gap: 10px; opacity: 0; pointer-events: none; transform: translateY(10px); transition: opacity 0.25s ease, transform 0.25s ease; order: 1; }
    .adornme-fab.open .adornme-fab-menu { opacity: 1; pointer-events: auto; transform: translateY(0); }
    .adornme-fab.open .adornme-fab-toggle { transform: rotate(45deg); }
    .adornme-fab-item { display: flex; align-items: center; gap: 10px; padding: 10px 16px; background: #25D366; color: white; text-decoration: none; border-radius: 28px; font-size: 14px; font-weight: 600; box-shadow: 0 3px 10px rgba(0,0,0,0.15); transition: transform 0.2s ease, opacity 0.2s ease; }
    .adornme-fab-item--email { background: #c9a961; }
    .adornme-fab-item--phone { background: #2d4d58; }
    .adornme-fab-item:hover { transform: translateX(-4px); opacity: 0.95; }
    @media (max-width: 768px) {
      .adornme-fab { bottom: 20px; right: 20px; }
      .adornme-fab-toggle { width: 52px; height: 52px; }
      .adornme-fab-item span { display: none; }
      .adornme-fab-item { width: 44px; height: 44px; padding: 0; justify-content: center; border-radius: 50%; }
    }
  `;

  const style = document.createElement('style');
  style.textContent = fabCSS;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.innerHTML = fabHTML;
  document.body.appendChild(container.firstElementChild);

  const fab = document.getElementById('adornme-fab');
  const toggle = fab.querySelector('.adornme-fab-toggle');
  toggle.addEventListener('click', function() {
    fab.classList.toggle('open');
    toggle.setAttribute('aria-expanded', fab.classList.contains('open') ? 'true' : 'false');
  });
})();
