/* Pulse — accessibility pass. Labels for screen readers, keyboard support for switches, visible focus,
   and reduced motion honoured across the whole app (the system setting, no extra switch). */
(function () {
  const css = document.createElement('style');
  css.textContent = `
@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important;scroll-behavior:auto!important}}
:focus-visible{outline:2px solid #49e39a;outline-offset:2px;border-radius:6px}
.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}`;
  document.head.appendChild(css);
  const label = (sel, text) => document.querySelectorAll(sel).forEach((e) => { if (!e.getAttribute('aria-label')) e.setAttribute('aria-label', text); });
  function pass() {
    label('#fab', 'Log a workout'); label('#walletChip', 'Coins and gems. Open Loot'); label('button[onclick="openSettings()"]', 'Settings');
    label('#rlCanvas, #realm canvas', 'The Realm game view');
    const nav = document.getElementById('navbar'); if (nav && !nav.getAttribute('role')) { nav.setAttribute('role', 'navigation'); nav.setAttribute('aria-label', 'Main'); }
    document.querySelectorAll('#navbar [data-nav]').forEach((b) => { if (b.classList.contains('on')) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    document.querySelectorAll('.navsub').forEach((bar) => { bar.setAttribute('role', 'tablist'); bar.querySelectorAll('[data-sub]').forEach((b) => { b.setAttribute('role', 'tab'); b.setAttribute('aria-selected', b.classList.contains('on') ? 'true' : 'false'); }); });
    document.querySelectorAll('.modal').forEach((m) => { if (!m.getAttribute('role')) { m.setAttribute('role', 'dialog'); m.setAttribute('aria-modal', 'true'); const h = m.querySelector('h2,h3'); if (h) m.setAttribute('aria-label', h.textContent.trim()); } });
    // switches: announce state, work from the keyboard
    document.querySelectorAll('.set-toggle').forEach((t) => {
      const row = t.closest('.set-row'); const name = row && row.querySelector('.set-name');
      t.setAttribute('role', 'switch'); t.setAttribute('tabindex', '0'); t.setAttribute('aria-checked', t.classList.contains('on') || t.classList.contains('active') ? 'true' : 'false');
      if (name && !t.getAttribute('aria-label')) t.setAttribute('aria-label', name.textContent.replace(/^[^\w]+/, '').trim());
      if (!t.dataset.kb) { t.dataset.kb = '1'; t.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); } }); }
    });
    document.querySelectorAll('.fold-h').forEach((h) => { const c = h.closest('.fold'); if (c) h.setAttribute('aria-expanded', c.classList.contains('open') ? 'true' : 'false'); });
    // decorative emoji-only icons inside buttons that already have text
    document.querySelectorAll('.nb-ic').forEach((i) => i.setAttribute('aria-hidden', 'true'));
    const toast = document.getElementById('toast'); if (toast && !toast.getAttribute('role')) { toast.setAttribute('role', 'status'); toast.setAttribute('aria-live', 'polite'); }
  }
  let t = null; const later = () => { clearTimeout(t); t = setTimeout(() => { try { pass(); } catch (e) { /* */ } }, 150); };
  window.addEventListener('load', () => { later(); const G = window.G; if (G && G.on) G.on('render', later); document.addEventListener('click', later, true); });
  (window.G = window.G || {}).a11y = { pass };
})();
