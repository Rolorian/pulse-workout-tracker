/* Pulse — friend codes.
   Compare progress with friends without accounts or a server.
   - "Share my code" makes a short snapshot of your stats (name, levels, this week's XP, streak, best lifts) and turns it into a code,
     a link and a QR code. You decide when to share it and who gets it.
   - "Add friend" takes their code/link. Re-adding a newer code updates them.
   - Nothing is uploaded anywhere: the code travels however you send it (message, QR), and friends are stored on this phone only.
   - Codes are untrusted input: they are size-limited, checked, and every value is clamped and escaped before it is shown.
*/
(function () {
  const G = (window.G = window.G || {});
  const FKEY = 'pulse-friends-v1', MEKEY = 'pulse-me-v1', PFX = 'PULSE1-', MAX_CODE = 3000, MAX_FRIENDS = 50;
  const load = (k, d) => { try { return JSON.parse(localStorage.getItem(k) || 'null') || d; } catch (e) { return d; } };
  let F = load(FKEY, { list: [] }); if (!Array.isArray(F.list)) F.list = [];
  const saveF = () => { try { localStorage.setItem(FKEY, JSON.stringify(F)); } catch (e) { /* storage full */ } };
  // a random player id, so re-adding a friend updates them instead of duplicating (not linked to anything about you)
  let ME = load(MEKEY, null);
  if (!ME || !/^[a-z0-9]{10}$/.test(ME.id)) { const a = new Uint8Array(10); crypto.getRandomValues(a); ME = { id: [...a].map((b) => 'abcdefghijklmnopqrstuvwxyz0123456789'[b % 36]).join('') }; try { localStorage.setItem(MEKEY, JSON.stringify(ME)); } catch (e) { /* */ } }

  const E = (s) => (typeof esc === 'function' ? esc(String(s)) : String(s).replace(/[&<>"']/g, (c) => '&#' + c.charCodeAt(0) + ';'));
  const dk = (d) => (typeof dateKey === 'function' ? dateKey(d) : d.toISOString().slice(0, 10));
  function weekKey(d = new Date()) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dk(x); }
  const W = () => (typeof workouts !== 'undefined' && Array.isArray(workouts) ? workouts : []);
  const xpOf = (w) => (typeof xpForWorkout === 'function' ? xpForWorkout(w) : w.amount * (w.sets || 1));

  // ---------------- my snapshot ----------------
  function mySnapshot() {
    const ws = W(); const wk = weekKey(); const end = new Date(); end.setDate(end.getDate() + 7);
    const wx = Math.round(ws.filter((w) => w.date >= wk).reduce((a, w) => a + xpOf(w), 0));
    const days = new Set(ws.map((w) => w.date)).size;
    const sets = ws.reduce((a, w) => a + (w.sets || 1), 0);
    const best = {};
    ws.forEach((w) => { const k = w.exercise; if (!k) return; const b = best[k]; if (!b || w.amount > b.a) best[k] = { a: w.amount, u: w.unit || 'reps', c: 0 }; });
    ws.forEach((w) => { if (best[w.exercise]) best[w.exercise].c++; });
    const pr = Object.keys(best).sort((a, b) => best[b].c - best[a].c).slice(0, 8).map((k) => [k, best[k].a, best[k].u]);
    let regions = 0; try { for (let i = 0; i < 10; i++) if (G.regionDone && G.regionDone(i)) regions++; } catch (e) { /* */ }
    let league = ''; try { league = G.rivalSummary ? G.rivalSummary().league : ''; } catch (e) { /* */ }
    let name = 'Player'; try { name = (G.heroState && G.heroState().name) || name; } catch (e) { /* */ }
    return { v: 1, id: ME.id, n: name, t: Date.now(), wk, wx, tl: typeof getTotalLevel === 'function' ? getTotalLevel() : 0, st: typeof getStreak === 'function' ? getStreak() : 0, d: days, s: sets, rg: regions, lg: league, pr };
  }

  // ---------------- encoding ----------------
  // checksum: catches typos and casual edits. It is not real security — with no server, a determined player can always fake their own numbers.
  function sum(s) { let h = 0x811c9dc5; s = 'pulse-friends|' + s; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193) >>> 0; } return h.toString(36); }
  const b64e = (str) => btoa(String.fromCharCode(...new TextEncoder().encode(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  const b64d = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0)));
  function encode(snap) {
    const body = JSON.stringify([snap.v, snap.id, snap.n, snap.t, snap.wk, snap.wx, snap.tl, snap.st, snap.d, snap.s, snap.rg, snap.lg, snap.pr]);
    const p = b64e(body); return PFX + p + '.' + sum(p);
  }
  // only these fields, only these types, only sane ranges
  const num = (v, max) => (typeof v === 'number' && isFinite(v) ? Math.max(0, Math.min(max, Math.round(v))) : 0);
  const str = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩]/g, '').trim().slice(0, max) : '');
  const UNITS = ['reps', 'seconds', 'minutes', 'km', 'kg', 'lbs', 'm', 'cal'];
  function decode(raw) {
    if (typeof raw !== 'string') return { err: 'No code found' };
    raw = raw.trim(); if (raw.length > MAX_CODE) return { err: 'That code is too long' };
    const m = /PULSE1-([A-Za-z0-9_-]{10,2900})\.([a-z0-9]{1,8})/.exec(raw); // works for a pasted code, link or message
    if (!m) return { err: 'That doesn\'t look like a Pulse friend code' };
    if (sum(m[1]) !== m[2]) return { err: 'That code is damaged or was edited — ask for a fresh one' };
    let a; try { a = JSON.parse(b64d(m[1])); } catch (e) { return { err: 'That code couldn\'t be read' }; }
    if (!Array.isArray(a) || a[0] !== 1) return { err: 'That code is from a newer version of Pulse — update the app' };
    const id = typeof a[1] === 'string' && /^[a-z0-9]{10}$/.test(a[1]) ? a[1] : null; if (!id) return { err: 'That code is missing its player id' };
    const t = num(a[3], Date.now() + 864e5);
    const wk = typeof a[4] === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(a[4]) ? a[4] : '';
    const pr = Array.isArray(a[12]) ? a[12].slice(0, 8).map((p) => (Array.isArray(p) ? [str(p[0], 30), num(p[1], 100000), UNITS.includes(p[2]) ? p[2] : 'reps'] : null)).filter((p) => p && p[0]) : [];
    return { f: { id, n: str(a[2], 20) || 'Friend', t, wk, wx: num(a[5], 2e6), tl: num(a[6], 5000), st: num(a[7], 10000), d: num(a[8], 20000), s: num(a[9], 5e6), rg: num(a[10], 10), lg: str(a[11], 24), pr } };
  }
  function link(code) { return location.origin + location.pathname + '#f=' + code; }

  // ---------------- friends list ----------------
  function addFriend(raw) {
    const r = decode(raw); if (r.err) return r;
    const f = r.f; if (f.id === ME.id) return { err: 'That\'s your own code 🙂' };
    const i = F.list.findIndex((x) => x.id === f.id);
    if (i >= 0) {
      if (f.t < F.list[i].t) return { err: `You already have a newer update from ${f.n}` };
      F.list[i] = Object.assign(f, { added: F.list[i].added, nick: F.list[i].nick }); saveF(); return { ok: `${f.n} updated` };
    }
    if (F.list.length >= MAX_FRIENDS) return { err: `You can have up to ${MAX_FRIENDS} friends` };
    f.added = Date.now(); F.list.push(f); saveF(); return { ok: `${f.n} added 🎉` };
  }
  function removeFriend(id) { F.list = F.list.filter((x) => x.id !== id); saveF(); }

  // ---------------- UI ----------------
  function ago(t) { const m = Math.floor((Date.now() - t) / 60000); if (m < 2) return 'just now'; if (m < 60) return m + 'm ago'; const h = Math.floor(m / 60); if (h < 24) return h + 'h ago'; const d = Math.floor(h / 24); return d + 'd ago'; }
  const fmt = (n) => Number(n || 0).toLocaleString();
  function card() {
    let c = document.getElementById('friendCard'); if (c) return c;
    const anchor = document.getElementById('rivalCard'); if (!anchor) return null;
    c = document.createElement('div'); c.className = 'card'; c.id = 'friendCard';
    anchor.parentNode.insertBefore(c, anchor.nextSibling); return c;
  }
  function render() {
    const c = card(); if (!c) return;
    if (c.parentNode && c.previousElementSibling !== document.getElementById('rivalCard')) { const a = document.getElementById('rivalCard'); if (a && a.parentNode) a.parentNode.insertBefore(c, a.nextSibling); }
    const me = mySnapshot(); const wk = weekKey();
    const rows = [{ me: true, n: 'You', wx: me.wx, st: me.st, tl: me.tl, t: Date.now() }].concat(F.list.map((f) => Object.assign({}, f, { wx: f.wk === wk ? f.wx : 0, stale: f.wk !== wk })));
    rows.sort((a, b) => b.wx - a.wx || b.tl - a.tl);
    const max = Math.max(1, ...rows.map((r) => r.wx));
    c.innerHTML = `<div class="cardhead"><h2>🤝 Friends</h2><span class="muted">${F.list.length ? 'this week · XP' : ''}</span></div>
      ${F.list.length ? `<div class="board">${rows.map((r, i) => `<div class="brow ${r.me ? 'you' : ''}" ${r.me ? '' : `data-fr="${E(r.id)}"`} style="cursor:${r.me ? 'default' : 'pointer'}"><span class="rk">${i + 1}</span><span class="em">${r.me ? '🫵' : '🧑'}</span>
        <div class="bmain"><div class="bname">${E(r.me ? 'You' : r.n)} <span class="fr-sub">${r.me ? `🔥${r.st} · Lv ${r.tl}` : r.stale ? `needs an update · ${ago(r.t)}` : `🔥${r.st} · Lv ${r.tl} · ${ago(r.t)}`}</span></div><div class="bbar"><div style="width:${r.wx / max * 100}%"></div></div></div>
        <span class="bxp">${r.stale ? '—' : fmt(r.wx)}</span></div>`).join('')}</div>`
        : `<div class="muted" style="margin:2px 0 10px;line-height:1.45">Race your friends on weekly XP and compare best lifts. Share your code, add theirs — no accounts, nothing uploaded.</div>`}
      <div class="fr-btns"><button class="gbtn" id="frShare">📤 Share my code</button><button class="gbtn ghost" id="frAdd">➕ Add friend</button></div>
      ${F.list.length ? '<div class="muted fr-note">Friends update when they send you a new code. Tap a friend to compare.</div>' : ''}`;
    c.querySelector('#frShare').onclick = openShare; c.querySelector('#frAdd').onclick = () => openAdd('');
    c.querySelectorAll('[data-fr]').forEach((r) => (r.onclick = () => openCompare(r.dataset.fr)));
  }
  function sheet(html) { if (G.sheet) return G.sheet(`<div class="fr-sheet">${html}</div>`); return null; }
  function openShare() {
    const code = encode(mySnapshot()); const url = link(code);
    let qr = ''; try { if (window.qrcode) { const q = qrcode(0, 'L'); q.addData(url); q.make(); qr = q.createSvgTag({ cellSize: 4, margin: 3, scalable: true }); } } catch (e) { /* too long for a QR; the code still works */ }
    const sh = sheet(`<h2>📤 Your friend code</h2>
      <div class="muted" style="margin-bottom:10px">Shares your name, levels, streak, this week's XP and best lifts — nothing else. It's a snapshot: send a new one whenever you want your friends to see your progress.</div>
      ${qr ? `<div class="fr-qr">${qr}</div><div class="muted" style="text-align:center;margin:6px 0 10px">Friend on Android? Scan with the camera. On iPhone, use Copy instead.</div>` : ''}
      <textarea class="fr-code" readonly rows="3">${E(code)}</textarea>
      <div class="fr-btns"><button class="gbtn" id="frSend">Send…</button><button class="gbtn ghost" id="frCopy">Copy code</button></div>`);
    if (!sh) return;
    const done = (m) => { if (typeof showToast === 'function') showToast(m, null, null, 2500); };
    sh.querySelector('#frCopy').onclick = () => { const ta = sh.querySelector('.fr-code'); (navigator.clipboard ? navigator.clipboard.writeText(code) : Promise.reject()).then(() => done('📋 Code copied — paste it to your friend'), () => { ta.select(); document.execCommand && document.execCommand('copy'); done('📋 Code selected — copy and send it'); }); };
    sh.querySelector('#frSend').onclick = () => {
      const text = `Add me on Pulse 💪 Open the app → Adventure → League → Add friend, and paste:\n${code}`;
      if (navigator.share) navigator.share({ title: 'My Pulse friend code', text, url }).catch(() => {}); else sh.querySelector('#frCopy').click();
    };
  }
  function openAdd(prefill) {
    const sh = sheet(`<h2>➕ Add a friend</h2>
      <div class="muted" style="margin-bottom:10px">Paste the code (or the whole message) your friend sent you. Already added? Pasting their newer code updates them.</div>
      <textarea class="fr-code" id="frIn" rows="4" placeholder="PULSE1-…" maxlength="${MAX_CODE}">${E(prefill || '')}</textarea>
      <div class="fr-err" id="frErr"></div>
      <div class="fr-btns"><button class="gbtn" id="frGo">Add friend</button>${navigator.clipboard && navigator.clipboard.readText ? '<button class="gbtn ghost" id="frPaste">Paste</button>' : ''}</div>`);
    if (!sh) return;
    const ta = sh.querySelector('#frIn'), err = sh.querySelector('#frErr');
    const go = () => { const r = addFriend(ta.value); if (r.err) { err.textContent = r.err; if (typeof haptic === 'function') haptic('error'); return; } G.closeSheet && G.closeSheet(true); if (typeof showToast === 'function') showToast('🤝 ' + r.ok, null, null, 2600); if (window.pulseSfx) pulseSfx('quest'); render(); };
    sh.querySelector('#frGo').onclick = go;
    const p = sh.querySelector('#frPaste'); if (p) p.onclick = () => navigator.clipboard.readText().then((t) => { ta.value = t.slice(0, MAX_CODE); go(); }, () => { err.textContent = 'Couldn\'t read the clipboard — long-press the box and Paste'; });
    if (prefill) go();
  }
  function openCompare(id) {
    const f = F.list.find((x) => x.id === id); if (!f) return; const me = mySnapshot(); const wk = weekKey();
    const row = (label, a, b, unit = '') => { const w = a > b ? 'win' : a < b ? 'lose' : ''; return `<div class="fc-row"><span class="fc-a ${w}">${fmt(a)}${unit}</span><span class="fc-l">${label}</span><span class="fc-b ${w === 'win' ? 'lose' : w === 'lose' ? 'win' : ''}">${fmt(b)}${unit}</span></div>`; };
    const mine = {}; me.pr.forEach((p) => (mine[p[0].toLowerCase()] = p));
    const theirs = {}; f.pr.forEach((p) => (theirs[p[0].toLowerCase()] = p));
    const shared = Object.keys(theirs).filter((k) => mine[k] && mine[k][2] === theirs[k][2]);
    const only = Object.keys(theirs).filter((k) => !mine[k]);
    const sh = sheet(`<h2>🧑 ${E(f.n)}</h2><div class="muted" style="margin-bottom:10px">Updated ${ago(f.t)}${f.lg ? ' · ' + E(f.lg) + ' League' : ''}${f.wk !== wk ? ' · from an earlier week — ask for a new code' : ''}</div>
      <div class="fc-head"><span>You</span><span></span><span>${E(f.n)}</span></div>
      ${row('This week XP', me.wx, f.wk === wk ? f.wx : 0)}${row('Streak', me.st, f.st, 'd')}${row('Total level', me.tl, f.tl)}${row('Active days', me.d, f.d)}${row('Total sets', me.s, f.s)}${row('Realm regions', me.rg, f.rg, '/10')}
      ${shared.length ? `<div class="rm-sep fc-sep">Best lifts</div>${shared.map((k) => row(E(theirs[k][0]), mine[k][1], theirs[k][1], ' ' + E(theirs[k][2]))).join('')}` : ''}
      ${only.length ? `<div class="muted" style="margin-top:8px">${E(f.n)} also trains: ${only.map((k) => `${E(theirs[k][0])} (${fmt(theirs[k][1])} ${E(theirs[k][2])})`).join(', ')}</div>` : ''}
      <div class="fr-btns" style="margin-top:14px"><button class="gbtn ghost" id="frUpd">Paste update</button><button class="gbtn ghost fr-del" id="frDel">Remove</button></div>`);
    if (!sh) return;
    sh.querySelector('#frUpd').onclick = () => openAdd('');
    sh.querySelector('#frDel').onclick = () => { if (confirm(`Remove ${f.n} from your friends?`)) { removeFriend(id); G.closeSheet && G.closeSheet(true); render(); } };
  }

  // opening a shared link (…#f=PULSE1-…) offers to add the friend, then clears the code from the address bar
  function fromLink() {
    const h = location.hash || ''; if (!/^#f=PULSE1-/.test(h)) return;
    const code = decodeURIComponent(h.slice(3)).slice(0, MAX_CODE);
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* */ }
    setTimeout(() => { if (G.nav) G.nav('adventure', 'league'); openAdd(code); }, 1500);
  }

  window.addEventListener('hashchange', fromLink); // link opened while the app is already running
  G.friends = { list: () => F.list.slice(), mySnapshot, encode, decode, add: addFriend, remove: removeFriend, render, openShare, openAdd, openCompare };
  G.on && G.on('render', () => { try { render(); } catch (e) { console.warn('friends', e); } });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => { render(); fromLink(); }); else { setTimeout(render, 0); fromLink(); }
})();
