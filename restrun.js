/* Pulse — rest-timer exploration. When the rest timer starts, offer the Resting Vault: a treasure dungeon in the Realm that stays
   open for exactly as long as the rest lasts, then sends you back for the next set. */
(function () {
  const G = (window.G = window.G || {});
  function offer() {
    if (!G.rpgRestRun || typeof showToast !== 'function') return;
    const secs = typeof restTimer !== 'undefined' ? restTimer : 60; if (secs < 15) return;
    showToast(`⏱️ Resting ${secs}s — explore the vault until the timer ends?`, 'Explore', () => { const left = typeof restTimer !== 'undefined' ? restTimer : secs; if (left >= 8) G.rpgRestRun(left); }, 7000);
  }
  if (typeof window.startRestTimer === 'function') {
    const o = window.startRestTimer;
    window.startRestTimer = function () { const was = typeof restInterval !== 'undefined' && restInterval; const r = o.apply(this, arguments); if (!was) setTimeout(offer, 300); return r; };
  }
})();
