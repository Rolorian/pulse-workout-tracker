/* Pulse — friend challenges and co-op raids (no server).
   An invite code carries only the rules (exercise, dates, boss health). Each player's running total rides along inside their normal
   friend code, so standings update whenever friends swap fresh codes. Totals are self-reported, like everything in friend codes.
   A daily cap on what counts keeps a contest from rewarding overtraining. */
(function () {
  const G = (window.G = window.G || {}); const FR = G.friends; if (!FR) return;
  const KEY = 'pulse-social-v1', PFX = 'PULSEC1-', MAX = 12;
  let S; try { S = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { S = null; }
  if (!S || !Array.isArray(S.list)) S = { list: [] };
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* */ } };
  const E = (s) => (typeof esc === 'function' ? esc(String(s)) : String(s));
  const W = () => (typeof workouts !== 'undefined' && Array.isArray(workouts) ? workouts : []);
  const today = () => dateKey(new Date());
  const plus = (key, n) => { const [y, m, d] = key.split('-').map(Number); const x = new Date(y, m - 1, d + n); return dateKey(x); };
  const CAP = { reps: 250, seconds: 1200, minutes: 30, km: 20 };
  const DATE = /^\d{4}-\d{2}-\d{2}$/;
  function myTotal(ch) { // per-day cap so the winner is the consistent one, not the reckless one
    const per = {}; let unit = 'reps';
    W().forEach((w) => { if (w.exercise !== ch.ex || w.date < ch.from || w.date > ch.to) return; unit = w.unit || unit; per[w.date] = (per[w.date] || 0) + w.amount * (w.sets || 1); });
    const cap = CAP[unit] || 250; return Math.round(Object.values(per).reduce((a, v) => a + Math.min(v, cap), 0) * 10) / 10;
  }
  function myDamage(ch) { const per = {}; W().forEach((w) => { if (w.date < ch.from || w.date > ch.to) return; per[w.date] = (per[w.date] || 0) + (typeof xpForWorkout === 'function' ? xpForWorkout(w) : w.amount); }); return Math.round(Object.values(per).reduce((a, v) => a + Math.min(v, 1500), 0)); }
  const mine = (ch) => (ch.kind === 'raid' ? myDamage(ch) : myTotal(ch));
  G.socialExtras = function () {
    const c = {}, r = {}; const keep = plus(today(), -7);
    S.list.forEach((ch) => { if (ch.to < keep) return; (ch.kind === 'raid' ? r : c)[ch.cid] = mine(ch); });
    return { c, r, d: [FR.weekKey(), G.rpgWeekly ? G.rpgWeekly() : 0] };
  };
  function encode(ch) { const p = FR.b64e(JSON.stringify([1, ch.cid, ch.kind, ch.ex, ch.from, ch.to, ch.by, ch.byName, ch.hp || 0])); return PFX + p + '.' + FR.sum('c|' + p); }
  function accept(raw) {
    const m = /PULSEC1-([A-Za-z0-9_-]{10,600})\.([a-z0-9]{1,8})/.exec(String(raw).slice(0, 3000)); if (!m) return { err: 'That doesn\'t look like a challenge code' };
    if (FR.sum('c|' + m[1]) !== m[2]) return { err: 'That challenge code is damaged or was edited' };
    let a; try { a = JSON.parse(FR.b64d(m[1])); } catch (e) { return { err: 'That challenge code couldn\'t be read' }; }
    if (!Array.isArray(a) || a[0] !== 1) return { err: 'That challenge is from a newer version of Pulse' };
    const cid = typeof a[1] === 'string' && /^[a-z0-9]{8}$/.test(a[1]) ? a[1] : null; const kind = a[2] === 'raid' ? 'raid' : a[2] === 'most' ? 'most' : null;
    if (!cid || !kind || !DATE.test(a[4]) || !DATE.test(a[5]) || a[5] < a[4] || a[5] > plus(a[4], 31)) return { err: 'That challenge code isn\'t valid' };
    const ch = { cid, kind, ex: FR.str(a[3], 30) || 'Press-ups', from: a[4], to: a[5], by: FR.str(a[6], 10), byName: FR.str(a[7], 20) || 'A friend', hp: Math.max(500, FR.num(a[8], 200000)) };
    if (S.list.some((x) => x.cid === cid)) return { ok: 'You\'re already in that one' };
    if (S.list.length >= MAX) return { err: `You can be in up to ${MAX} challenges — remove an old one first` };
    S.list.push(ch); save(); render(); return { ok: ch.kind === 'raid' ? `Joined ${ch.byName}'s raid ⚔️` : `Joined: most ${ch.ex} by ${ch.to.slice(5)}` };
  }
  function create(kind, ex, hp) {
    const a = new Uint8Array(8); crypto.getRandomValues(a); const cid = [...a].map((b) => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('');
    let name = 'Player'; try { name = (G.heroState && G.heroState().name) || name; } catch (e) { /* */ }
    const ch = { cid, kind, ex, from: today(), to: plus(today(), 6), by: FR.me(), byName: name, hp: hp || 0 };
    if (S.list.length >= MAX) S.list.shift(); S.list.push(ch); save(); render(); invite(ch);
  }
  function standings(ch) {
    const rows = [{ me: true, n: 'You', v: mine(ch) }];
    FR.list().forEach((f) => { const bag = f.x && f.x[ch.kind === 'raid' ? 'r' : 'c']; if (bag && bag[ch.cid] != null) rows.push({ n: f.n, v: bag[ch.cid] }); });
    return rows.sort((a, b) => b.v - a.v);
  }
  function settle(ch) { // pay once: a won challenge, or a raid boss brought down
    if (ch.paid) return; const rows = standings(ch);
    if (ch.kind === 'raid') { if (rows.reduce((a, r) => a + r.v, 0) >= ch.hp) { ch.paid = 1; save(); try { G.reward && G.reward({ gems: 3, coins: 200 }, { silent: true }); } catch (e) { /* */ } if (typeof showToast === 'function') showToast('⚔️ Raid boss defeated together! +3 💎 +200 🪙', null, null, 4500); if (window.pulseFx) pulseFx('questComplete', { x: .5, y: .2, w: .85 }); } }
    else if (ch.to < today() && rows.length > 1) { ch.paid = 1; save(); if (rows[0].me && rows[0].v > 0) { try { G.reward && G.reward({ coins: 100 }, { silent: true }); } catch (e) { /* */ } if (typeof showToast === 'function') showToast(`🏆 You won the ${ch.ex} challenge! +100 🪙`, null, null, 4500); } }
  }
  const fmt = (n) => Number(n || 0).toLocaleString();
  function invite(ch) {
    const code = encode(ch); const sh = FR.sheet(`<h2>${ch.kind === 'raid' ? '⚔️ Raid invite' : '🏁 Challenge invite'}</h2>
      <div class="muted" style="margin-bottom:10px">${ch.kind === 'raid' ? `Bring down a boss with ${fmt(ch.hp)} health together by ${E(ch.to.slice(5))}. All training counts as damage.` : `Most ${E(ch.ex)} from ${E(ch.from.slice(5))} to ${E(ch.to.slice(5))}.`} Send this code; friends paste it under Add friend. Then swap friend codes during the week to see each other's totals.</div>
      <textarea class="fr-code" readonly rows="3">${E(code)}</textarea>
      <div class="fr-btns"><button class="gbtn" id="scSend">Send…</button><button class="gbtn ghost" id="scCopy">Copy code</button></div>`);
    if (!sh) return; const done = (m) => typeof showToast === 'function' && showToast(m, null, null, 2500);
    sh.querySelector('#scCopy').onclick = () => (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(() => done('📋 Invite copied'), () => { sh.querySelector('.fr-code').select(); done('Select and copy the code'); });
    sh.querySelector('#scSend').onclick = () => { const text = `${ch.kind === 'raid' ? 'Join my Pulse raid ⚔️' : `Pulse challenge: most ${ch.ex} this week 💪`} Adventure → League → Add friend, paste:\n${code}`; if (navigator.share) navigator.share({ text }).catch(() => {}); else sh.querySelector('#scCopy').click(); };
  }
  function openCreate(kind) {
    const count = {}; W().forEach((w) => { if (w.exercise) count[w.exercise] = (count[w.exercise] || 0) + 1; });
    const exs = [...new Set(Object.keys(count).sort((a, b) => count[b] - count[a]).slice(0, 8).concat(['Press-ups', 'Squats', 'Plank']))];
    const sh = FR.sheet(kind === 'raid' ? `<h2>⚔️ New raid</h2><div class="muted" style="margin-bottom:10px">One boss, one shared health bar, seven days. Everyone's training XP is damage (up to 1,500 a day each).</div>
        <label class="muted">Boss health</label><select id="scHp" class="ex-select"><option value="3000">3,000 · two friends, steady week</option><option value="6000">6,000 · three or four friends</option><option value="12000">12,000 · a big group</option></select>
        <button class="gbtn" id="scGo" style="margin-top:12px;width:100%">Create raid</button>`
      : `<h2>🏁 New challenge</h2><div class="muted" style="margin-bottom:10px">Who does the most in seven days? A daily cap keeps it about showing up, not overdoing it.</div>
        <label class="muted">Exercise</label><select id="scEx" class="ex-select">${exs.map((e) => `<option>${E(e)}</option>`).join('')}</select>
        <button class="gbtn" id="scGo" style="margin-top:12px;width:100%">Create challenge</button>`);
    if (!sh) return;
    sh.querySelector('#scGo').onclick = () => { const ex = kind === 'raid' ? 'All training' : sh.querySelector('#scEx').value; const hp = kind === 'raid' ? Number(sh.querySelector('#scHp').value) : 0; G.closeSheet && G.closeSheet(true); create(kind, ex, hp); };
  }
  function render() {
    const anchor = document.getElementById('friendCard'); if (!anchor) return;
    let c = document.getElementById('socialCard'); if (!c) { c = document.createElement('div'); c.className = 'card'; c.id = 'socialCard'; }
    if (anchor.nextElementSibling !== c) anchor.parentNode.insertBefore(c, anchor.nextSibling);
    S.list.forEach(settle); const t = today();
    c.innerHTML = `<div class="cardhead"><h2>🏁 Challenges & Raids</h2><span class="muted">${S.list.length ? S.list.length + ' active' : ''}</span></div>
      ${S.list.length ? S.list.slice().reverse().map((ch) => {
        const rows = standings(ch); const ended = ch.to < t; const left = ended ? 'ended' : ch.to === t ? 'last day' : `${Math.round((new Date(ch.to) - new Date(t)) / 864e5) + 1}d left`;
        if (ch.kind === 'raid') { const tot = rows.reduce((a, r) => a + r.v, 0); const pct = Math.min(100, tot / ch.hp * 100);
          return `<div class="soc"><div class="soc-h"><b>⚔️ Raid by ${E(ch.by === FR.me() ? 'you' : ch.byName)}</b><span class="muted">${tot >= ch.hp ? 'defeated ✅' : left}</span></div><div class="soc-bar"><div style="width:${100 - pct}%;background:var(--red,#ff6b6b)"></div></div>
            <div class="muted soc-s">${fmt(Math.max(0, ch.hp - tot))} / ${fmt(ch.hp)} health left · ${rows.map((r) => `${E(r.n)} ${fmt(r.v)}`).join(' · ')}</div><div class="soc-b"><button class="coach-mini" data-inv="${ch.cid}">Invite</button><button class="coach-mini" data-rm="${ch.cid}">Remove</button></div></div>`; }
        const max = Math.max(1, rows[0].v);
        return `<div class="soc"><div class="soc-h"><b>🏁 Most ${E(ch.ex)}</b><span class="muted">${left}</span></div>
          ${rows.map((r, i) => `<div class="soc-row"><span>${i === 0 && r.v > 0 ? '👑' : i + 1} ${E(r.n)}</span><div class="soc-bar"><div style="width:${r.v / max * 100}%;background:${r.me ? 'var(--accent)' : 'var(--gold,#fbbf24)'}"></div></div><b>${fmt(r.v)}</b></div>`).join('')}
          ${rows.length < 2 ? '<div class="muted soc-s">Waiting for a friend\'s code that includes this challenge.</div>' : ''}<div class="soc-b"><button class="coach-mini" data-inv="${ch.cid}">Invite</button><button class="coach-mini" data-rm="${ch.cid}">Remove</button></div></div>`;
      }).join('') : '<div class="muted" style="line-height:1.45;margin-bottom:10px">Set a seven-day contest on one exercise, or team up against a raid boss. Friends\' totals arrive with their friend codes.</div>'}
      <div class="fr-btns"><button class="gbtn" id="scNew">🏁 New challenge</button><button class="gbtn ghost" id="scRaid">⚔️ New raid</button></div>
      <div class="muted fr-note">Got an invite? Paste it under Add friend.</div>`;
    c.querySelector('#scNew').onclick = () => openCreate('most'); c.querySelector('#scRaid').onclick = () => openCreate('raid');
    c.querySelectorAll('[data-inv]').forEach((b) => (b.onclick = () => { const ch = S.list.find((x) => x.cid === b.dataset.inv); if (ch) invite(ch); }));
    c.querySelectorAll('[data-rm]').forEach((b) => (b.onclick = () => { if (confirm('Remove this from your list?')) { S.list = S.list.filter((x) => x.cid !== b.dataset.rm); save(); render(); } }));
  }
  G.social = { accept, create, encode, standings, list: () => S.list.slice(), render };
  G.on && G.on('render', () => { try { render(); } catch (e) { console.warn('social', e); } });
  setTimeout(() => { try { render(); } catch (e) { /* */ } }, 0);
})();
