/* Pulse — save safety. Loaded before everything else. No network, no library.
   1. A failed write (storage full) is caught, space is freed if possible, and you are told instead of losing data silently.
   2. Every save is checked on launch. A damaged one is set aside (never deleted) and the last safety copy is put back.
   3. Once a day the important saves are copied on this device; the two most recent copies are kept.
   4. A schema number and a migration list, so future changes to save formats can upgrade old saves safely. */
(function () {
  const G = (window.G = window.G || {});
  const SNAP = 'pulse-snap-v1', SCHEMA = 'pulse-schema-v1', VERSION = 1;
  const CRITICAL = ['pulse-workouts-v2', 'pulse-rpg-v1', 'pulse-goals-v1', 'pulse-loot-v1', 'pulse-hero-v1', 'pulse-village-v1', 'pulse-pets-v1', 'pulse-social-v1', 'pulse-friends-v1', 'pulse-me-v1', 'pulse-settings-v1', 'pulse-routines-v1', 'pulse-restdays-v1', 'pulse-quests-v1'];
  const MAX_SNAP = 1500000; // characters; bigger saves keep one copy instead of two
  const rawSet = Storage.prototype.setItem;
  const status = { full: false, failed: [], repaired: [], lost: [] };
  const day = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const say = (msg, label, fn) => { const go = () => { try { if (typeof showToast === 'function') showToast(msg, label, fn, 12000); } catch (e) { /* */ } }; if (document.readyState === 'complete') setTimeout(go, 600); else window.addEventListener('load', () => setTimeout(go, 1500)); };
  let warned = false;

  // 1. guarded writes
  Storage.prototype.setItem = function (k, v) {
    try { return rawSet.call(this, k, v); } catch (e) {
      if (this !== window.localStorage) throw e;
      // free the safety copies first: the live save matters more
      try { if (k !== SNAP) { this.removeItem(SNAP); return rawSet.call(this, k, v); } } catch (e2) { /* still full */ }
      status.full = true; if (!status.failed.includes(k)) status.failed.push(k);
      if (!warned) { warned = true; say('⚠️ Storage is full — your latest change may not be saved. Export a backup now.', 'Backup', () => { try { G.backup && G.backup.exportFull && G.backup.exportFull(); } catch (e3) { /* */ } }); }
      console.warn('[pulse] save failed for', k);
    }
  };

  const readSnap = () => { try { const s = JSON.parse(localStorage.getItem(SNAP) || 'null'); return s && Array.isArray(s.days) ? s : { days: [] }; } catch (e) { return { days: [] }; } };
  const looksJson = (v) => typeof v === 'string' && /^\s*[\[{]/.test(v);
  const parses = (v) => { try { JSON.parse(v); return true; } catch (e) { return false; } };

  // 2. health check
  function check() {
    const snap = readSnap(); const keys = [];
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.indexOf('pulse-') === 0 && k.indexOf('pulse-corrupt-') !== 0 && k !== SNAP) keys.push(k); }
    keys.forEach((k) => {
      const v = localStorage.getItem(k); if (!looksJson(v) || parses(v)) return;
      try { rawSet.call(localStorage, 'pulse-corrupt-' + k, v); } catch (e) { /* no room to set it aside; leave the original where it is */ return; }
      const copy = snap.days.map((d) => d.keys && d.keys[k]).find((x) => typeof x === 'string' && parses(x));
      if (copy) { localStorage.setItem(k, copy); status.repaired.push(k); } else { localStorage.removeItem(k); status.lost.push(k); }
    });
    if (status.repaired.length) say('🛟 A damaged save was repaired from your last safety copy.');
    else if (status.lost.length) say('⚠️ A damaged save was set aside. Restore a backup in Settings if something is missing.');
  }

  // 3. daily safety copy (taken after the health check, so only good saves are copied)
  function snapshot(force) {
    const snap = readSnap(); const today = day(); if (!force && snap.days[0] && snap.days[0].d === today) return false;
    const keys = {}; let size = 0; CRITICAL.forEach((k) => { const v = localStorage.getItem(k); if (typeof v === 'string' && v.length && (!looksJson(v) || parses(v))) { keys[k] = v; size += v.length; } });
    if (!Object.keys(keys).length) return false;
    const days = [{ d: today, t: Date.now(), keys }].concat(snap.days.filter((d) => d.d !== today)).slice(0, size > MAX_SNAP / 2 ? 1 : 2);
    try { rawSet.call(localStorage, SNAP, JSON.stringify({ days })); return true; } catch (e) {
      try { rawSet.call(localStorage, SNAP, JSON.stringify({ days: days.slice(0, 1) })); return true; } catch (e2) { try { localStorage.removeItem(SNAP); } catch (e3) { /* */ } return false; }
    }
  }
  function copies() { return readSnap().days.map((d) => ({ d: d.d, t: d.t, keys: Object.keys(d.keys || {}).length })); }
  function restore(i) {
    const d = readSnap().days[i]; if (!d || !d.keys) return false;
    const before = {}; Object.keys(d.keys).forEach((k) => { before[k] = localStorage.getItem(k); });
    try { Object.keys(d.keys).forEach((k) => { if (typeof d.keys[k] === 'string' && (!looksJson(d.keys[k]) || parses(d.keys[k]))) rawSet.call(localStorage, k, d.keys[k]); }); return true; } catch (e) {
      Object.keys(before).forEach((k) => { try { if (before[k] == null) localStorage.removeItem(k); else rawSet.call(localStorage, k, before[k]); } catch (e2) { /* */ } }); return false;
    }
  }

  // 4. schema + migrations. Each entry upgrades saves written by an older schema; they run once, in order.
  const MIGRATIONS = [/* { to: 2, run() { ... } } */];
  function migrate() {
    let s; try { s = JSON.parse(localStorage.getItem(SCHEMA) || 'null'); } catch (e) { s = null; }
    let v = s && typeof s.v === 'number' ? s.v : 1;
    if (v > VERSION) { status.newer = true; return; } // saves from a newer Pulse: leave them untouched
    MIGRATIONS.filter((m) => m.to > v && m.to <= VERSION).sort((a, b) => a.to - b.to).forEach((m) => { snapshot(true); try { m.run(); v = m.to; } catch (e) { console.warn('[pulse] migration failed', m.to, e); restore(0); } });
    try { rawSet.call(localStorage, SCHEMA, JSON.stringify({ v, at: Date.now() })); } catch (e) { /* */ }
  }

  try { check(); migrate(); snapshot(false); } catch (e) { console.warn('[pulse] safestore', e); }

  // storage use, for the Settings row
  async function usage() { try { if (navigator.storage && navigator.storage.estimate) { const e = await navigator.storage.estimate(); return { used: e.usage || 0, quota: e.quota || 0 }; } } catch (e) { /* */ } return null; }
  function localSize() { let n = 0; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); n += k.length + (localStorage.getItem(k) || '').length; } return n; }

  function wire() {
    const hap = document.getElementById('toggleHaptics'); const row = hap && hap.closest('.set-row'); if (!row || document.getElementById('safeRow')) return;
    const r = document.createElement('div'); r.className = 'set-row'; r.id = 'safeRow';
    const c = copies(); const kb = Math.round(localSize() / 1024);
    r.innerHTML = '<div><div class="set-name">🛟 Safety copies</div><div class="set-sub" id="safeSub"></div></div><button class="set-btn" type="button" id="safeBtn">Restore</button>';
    r.querySelector('#safeSub').textContent = (c.length ? 'Kept on this phone: ' + c.map((x) => x.d).join(', ') + '.' : 'First copy is made tomorrow.') + ' Saves use ' + kb + ' KB.' + (status.full ? ' Storage is full.' : '');
    const btn = r.querySelector('#safeBtn'); btn.disabled = !c.length;
    btn.onclick = () => { const cs = copies(); if (!cs.length) return; const i = cs.length > 1 ? 1 : 0; // the older copy is the one from before today
      showToast('Put back your save from ' + cs[i].d + '? Anything logged since is replaced.', 'Restore', () => { if (restore(i)) location.reload(); else showToast('Could not restore — nothing was changed.'); }, 12000); };
    row.parentNode.insertBefore(r, row.nextSibling);
  }
  window.addEventListener('load', () => setTimeout(() => { try { wire(); } catch (e) { /* */ } }, 400));
  G.safe = { status, check, snapshot, copies, restore, usage, localSize, VERSION };
})();
