/* Pulse — full backup, restore and move-to-a-new-phone.
   The old export only saved the workout list. This saves every Pulse save on the device (hero, Realm, loot, village, friends…)
   in one file, and restores it after checking it. Nothing is uploaded: the file goes wherever you send it.
   Your own music files (kept in the browser's database) are not included — re-add those on the new phone. */
(function () {
  const G = (window.G = window.G || {});
  const MAX = 25 * 1024 * 1024, KEY_OK = /^pulse-[a-z0-9-]{1,40}$/;
  const SKIP = new Set(['pulse-boot-last', 'pulse-install-dismissed']);
  function snapshot() {
    const keys = {};
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (KEY_OK.test(k) && !SKIP.has(k)) keys[k] = localStorage.getItem(k); }
    return { pulse: 1, kind: 'full-backup', v: 1, at: new Date().toISOString(), keys };
  }
  function fileOf() { const d = typeof todayKey === 'function' ? todayKey() : new Date().toISOString().slice(0, 10); return new File([JSON.stringify(snapshot())], 'pulse-full-backup-' + d + '.json', { type: 'application/json' }); }
  function download(f) { const a = document.createElement('a'); a.href = URL.createObjectURL(f); a.download = f.name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 2000); }
  function done(msg) { if (typeof markBackedUp === 'function') markBackedUp(); if (typeof haptic === 'function') haptic('success'); if (typeof showToast === 'function') showToast(msg, null, null, 3500); }
  function exportFull() { download(fileOf()); done('📤 Full backup saved — everything, not just workouts'); }
  // hand the backup to another phone through the share menu (AirDrop, Nearby Share, messages…)
  function sendToPhone() {
    const f = fileOf();
    if (navigator.canShare && navigator.canShare({ files: [f] })) navigator.share({ files: [f], title: 'Pulse backup' }).then(() => done('📲 Sent. On the new phone: Settings → Import Data'), () => {});
    else { download(f); done('📤 Backup saved. Send that file to the new phone, then Settings → Import Data'); }
  }
  // returns {keys} or {err}; every key and value is checked before anything is written
  function check(obj) {
    if (!obj || obj.pulse !== 1 || obj.kind !== 'full-backup' || typeof obj.keys !== 'object' || !obj.keys) return { err: 'That isn\'t a Pulse full backup.' };
    if (obj.v > 1) return { err: 'That backup is from a newer version of Pulse. Update the app first.' };
    const out = {}; let n = 0;
    for (const k of Object.keys(obj.keys)) {
      const v = obj.keys[k]; if (!KEY_OK.test(k) || typeof v !== 'string' || SKIP.has(k)) continue;
      n += v.length; if (n > MAX) return { err: 'That backup is too large to be real.' };
      if (/^[\[{"]/.test(v)) { try { JSON.parse(v); } catch (e) { return { err: 'That backup is damaged (' + k + ').' }; } }
      out[k] = v;
    }
    if (!out['pulse-workouts-v2']) return { err: 'That backup has no workouts in it.' };
    try { if (!Array.isArray(JSON.parse(out['pulse-workouts-v2']))) throw 0; } catch (e) { return { err: 'That backup\'s workout list is damaged.' }; }
    return { keys: out };
  }
  function restore(keys) {
    // keep a copy of what is here now, so a bad import can be undone once
    let undo = null; try { undo = JSON.stringify(snapshot()); } catch (e) { /* */ }
    const old = []; for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (KEY_OK.test(k) && !SKIP.has(k)) old.push(k); }
    try {
      old.forEach((k) => localStorage.removeItem(k));
      Object.keys(keys).forEach((k) => localStorage.setItem(k, keys[k]));
    } catch (e) {
      if (undo) { try { const u = JSON.parse(undo).keys; Object.keys(u).forEach((k) => localStorage.setItem(k, u[k])); } catch (e2) { /* */ } }
      return false;
    }
    return true;
  }
  const oldImport = window.importData;
  window.importData = function (event) {
    const file = event.target.files[0]; if (!file) return;
    if (file.size > MAX) { alert('That file is too large to be a Pulse backup.'); event.target.value = ''; return; }
    const reader = new FileReader();
    reader.onload = (e) => {
      let obj; try { obj = JSON.parse(e.target.result); } catch (err) { alert('That file couldn\'t be read.'); event.target.value = ''; return; }
      if (Array.isArray(obj)) { // an older workouts-only backup: use the original importer
        const fake = { target: { files: [file], set value(v) { event.target.value = v; } } };
        return oldImport ? oldImport(fake) : alert('Workout-only backups can\'t be imported here.');
      }
      const r = check(obj); event.target.value = '';
      if (r.err) { alert(r.err); return; }
      const n = JSON.parse(r.keys['pulse-workouts-v2']).length; const when = String(obj.at || '').slice(0, 10);
      if (!confirm(`Restore full backup from ${when}?\n\n${n} workouts plus hero, Realm, loot and friends.\nThis replaces everything on this phone.`)) return;
      if (!restore(r.keys)) { alert('Restore failed — your current data was put back.'); return; }
      alert('✅ Restored. Pulse will now reload.'); location.reload();
    };
    reader.readAsText(file);
  };
  window.exportData = exportFull;
  G.backup = { snapshot, check, restore, exportFull, sendToPhone };
  // settings buttons
  function wire() {
    const exp = document.querySelector('button[onclick="exportData()"]'); if (!exp || document.getElementById('sendPhoneBtn')) return;
    exp.textContent = '📤 Export full backup';
    const b = document.createElement('button'); b.className = 'save secondary'; b.id = 'sendPhoneBtn'; b.style.marginTop = '8px'; b.textContent = '📲 Move to a new phone'; b.onclick = sendToPhone;
    exp.parentNode.insertBefore(b, exp.nextSibling);
    const st = document.getElementById('backupStatus'); if (st && !st.dataset.full) { st.dataset.full = '1'; st.insertAdjacentHTML('afterend', '<p class="note" style="margin-top:4px">Backups now include everything: workouts, hero, Realm, loot, village and friends.</p>'); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire); else wire();
  // ask the browser not to clear Pulse's storage when the phone is low on space
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persisted().then((p) => { if (!p) navigator.storage.persist().catch(() => {}); }).catch(() => {}); } catch (e) { /* */ }
})();
