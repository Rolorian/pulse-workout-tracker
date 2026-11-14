/* Pulse — Goals tab: your own daily things and goals, with a quick tick.
   Private by design: everything here is saved only on this phone (localStorage key pulse-goals-v1). It is never put into
   friend codes, challenges or anything a friend can see. It is included in your own full backup file. */
(function () {
  const G = (window.G = window.G || {}); const KEY = 'pulse-goals-v1';
  let S; try { S = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { S = null; }
  if (!S || typeof S !== 'object') S = {}; if (!Array.isArray(S.daily)) S.daily = []; if (!Array.isArray(S.goals)) S.goals = [];
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { if (typeof showToast === 'function') showToast('⚠️ Could not save — storage is full'); } };
  const E = (s) => (typeof esc === 'function' ? esc(String(s)) : String(s).replace(/[&<>"']/g, (c) => '&#' + c.charCodeAt(0) + ';'));
  const dk = (d) => dateKey(d); const today = () => dk(new Date());
  const back = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return d; };
  const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; const AREA = { body: '💪', mind: '🧠' };
  const REPEAT = [['daily', 'Every day'], ['weekdays', 'Weekdays'], ['weekends', 'Weekends'], ['days', 'Certain days…'], ['once', 'Just today']];
  // pixel tick-box icon for the nav (drawn for Pulse)
  (window.PXI = window.PXI || {}).goals = '<svg aria-hidden="true" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v2H4zM4 18h16v2H4zM4 6h2v12H4zM18 6h2v12h-2zM8 12h2v2H8zM10 14h2v2h-2zM12 12h2v2h-2zM14 10h2v2h-2z"/></svg>';

  // is this item scheduled on that date?
  function dueOn(it, d) {
    const k = dk(d), wd = d.getDay(); if (k < it.made) return false;
    if (it.repeat === 'once') { const ks = Object.keys(it.done || {}); return ks.length ? !!it.done[k] : k === it.made || k === today(); } // a one-off carries over until it is ticked
    if (it.repeat === 'weekdays') return wd >= 1 && wd <= 5; if (it.repeat === 'weekends') return wd === 0 || wd === 6;
    if (it.repeat === 'days') return (it.days || []).includes(wd);
    return true;
  }
  const isDone = (it, k) => !!(it.done && it.done[k]);
  function streak(it) {
    if (it.repeat === 'once') return 0; let n = 0;
    for (let i = 0; i < 400; i++) { const d = back(i); const k = dk(d); if (k < it.made) break; if (!dueOn(it, d)) continue; if (isDone(it, k)) n++; else if (i === 0) continue; else break; }
    return n;
  }
  function repeatLabel(it) { return it.repeat === 'days' ? (it.days || []).slice().sort().map((d) => DAYS[d]).join(' ') || 'No days' : it.repeat === 'once' ? (it.made === today() ? 'Just today' : 'From ' + it.made.slice(5)) : (REPEAT.find((r) => r[0] === it.repeat) || REPEAT[0])[1]; }
  function prune() { const cut = dk(back(200)); S.daily.forEach((it) => { if (it.done) Object.keys(it.done).forEach((k) => { if (k < cut) delete it.done[k]; }); }); S.daily = S.daily.filter((it) => !(it.repeat === 'once' && it.done && Object.keys(it.done).some((k) => k < today()))); }

  function section() {
    let s = document.getElementById('goals'); if (s) return s;
    const app = document.querySelector('.app'); if (!app) return null;
    s = document.createElement('div'); s.className = 'section'; s.id = 'goals';
    s.innerHTML = '<div class="card" id="glToday"></div><div class="card" id="glGoals"></div><div class="card" id="glWeek"></div><div class="gl-private">🔒 Only on this phone. Never shared with friends or sent anywhere.</div>';
    const anchor = document.getElementById('today'); if (anchor && anchor.parentNode === app) app.insertBefore(s, anchor.nextSibling); else app.appendChild(s);
    return s;
  }
  let form = { repeat: 'daily', area: '', days: [1, 3, 5], garea: '' };
  const areaBtns = (cur, attr) => `<span class="gl-seg">${[['', 'Any'], ['body', '💪 Body'], ['mind', '🧠 Mind']].map(([v, n]) => `<button type="button" ${attr}="${v}" class="${cur === v ? 'on' : ''}">${n}</button>`).join('')}</span>`;
  function renderToday() {
    const c = document.getElementById('glToday'); if (!c) return; const t = today(); const now = new Date();
    const items = S.daily.filter((it) => dueOn(it, now)); const done = items.filter((it) => isDone(it, t)).length;
    const keep = c.querySelector('#glNew') ? c.querySelector('#glNew').value : '';
    c.innerHTML = `<div class="cardhead"><h2>✅ Daily Things</h2><span class="muted">${items.length ? `${done} of ${items.length} done` : now.toLocaleDateString(undefined, { weekday: 'long' })}</span></div>
      ${items.length ? `<div class="gl-bar"><div style="width:${done / items.length * 100}%"></div></div>` : '<div class="muted gl-empty">Nothing yet. Add the things you want to do each day — a walk, reading, water, prayer, study, anything.</div>'}
      <div class="gl-list">${items.map((it) => { const d = isDone(it, t), st = streak(it); return `<div class="gl-row ${d ? 'done' : ''}"><button type="button" class="gl-tick" data-tick="${it.id}" aria-label="${d ? 'Untick' : 'Tick'} ${E(it.text)}">${d ? '✓' : ''}</button><div class="gl-main" data-tick="${it.id}"><div class="gl-text">${it.area ? AREA[it.area] + ' ' : ''}${E(it.text)}</div><div class="gl-sub">${E(repeatLabel(it))}${st >= 2 ? ` · 🔥 ${st}` : ''}</div></div><button type="button" class="gl-more" data-edit="${it.id}" aria-label="Edit ${E(it.text)}">⋯</button></div>`; }).join('')}</div>
      <div class="gl-add"><input id="glNew" type="text" maxlength="80" placeholder="Add a daily thing…" autocomplete="off"><button type="button" class="gl-go" id="glAdd">Add</button></div>
      <div class="gl-opts"><select id="glRepeat" class="gl-sel" aria-label="Repeat">${REPEAT.map(([v, n]) => `<option value="${v}" ${form.repeat === v ? 'selected' : ''}>🔁 ${n}</option>`).join('')}</select>${areaBtns(form.area, 'data-area')}</div>
      ${form.repeat === 'days' ? `<div class="gl-days">${DAYS.map((n, i) => `<button type="button" data-day="${i}" class="${form.days.includes(i) ? 'on' : ''}">${n}</button>`).join('')}</div>` : ''}`;
    const inp = c.querySelector('#glNew'); inp.value = keep;
    const add = () => { const text = inp.value.trim().slice(0, 80); if (!text) { inp.focus(); return; } if (S.daily.length >= 60) { showToast && showToast('That\'s a lot of daily things — remove one first'); return; } S.daily.push({ id: uid(), text, repeat: form.repeat, days: form.repeat === 'days' ? form.days.slice() : undefined, area: form.area, made: t, done: {} }); save(); inp.value = ''; form.area = ''; if (typeof haptic === 'function') haptic('light'); render(); };
    c.querySelector('#glAdd').onclick = add; inp.onkeydown = (e) => { if (e.key === 'Enter') add(); };
    c.querySelector('#glRepeat').onchange = (e) => { form.repeat = e.target.value; renderToday(); };
    c.querySelectorAll('[data-area]').forEach((b) => (b.onclick = () => { form.area = b.dataset.area; renderToday(); }));
    c.querySelectorAll('[data-day]').forEach((b) => (b.onclick = () => { const d = Number(b.dataset.day); form.days = form.days.includes(d) ? form.days.filter((x) => x !== d) : form.days.concat(d); renderToday(); }));
    c.querySelectorAll('[data-tick]').forEach((b) => (b.onclick = () => tick(b.dataset.tick)));
    c.querySelectorAll('[data-edit]').forEach((b) => (b.onclick = () => edit(b.dataset.edit)));
  }
  function tick(id) {
    const it = S.daily.find((x) => x.id === id); if (!it) return; const t = today(); it.done = it.done || {};
    if (it.done[t]) delete it.done[t]; else it.done[t] = 1; save();
    if (typeof haptic === 'function') haptic(it.done[t] ? 'success' : 'light'); if (it.done[t] && window.pulseSfx) pulseSfx('pop');
    const items = S.daily.filter((x) => dueOn(x, new Date()));
    if (it.done[t] && items.length > 1 && items.every((x) => isDone(x, t)) && S.allDone !== t) { S.allDone = t; save(); if (typeof showToast === 'function') showToast('✅ Everything done for today', null, null, 2500); }
    render();
  }
  function edit(id) {
    const it = S.daily.find((x) => x.id === id); if (!it || !G.sheet) return; let rep = it.repeat, days = (it.days || [1, 3, 5]).slice(), area = it.area || '';
    const sh = G.sheet('<div class="fr-sheet" id="glEdit"></div>'); if (!sh) return; const box = sh.querySelector('#glEdit');
    const draw = () => {
      const txt = box.querySelector('#glEText') ? box.querySelector('#glEText').value : it.text;
      box.innerHTML = `<h2>Edit daily thing</h2><input id="glEText" class="gl-in" type="text" maxlength="80">
        <label class="muted gl-lab">Repeats</label><select id="glERep" class="gl-sel" style="width:100%">${REPEAT.map(([v, n]) => `<option value="${v}" ${rep === v ? 'selected' : ''}>${n}</option>`).join('')}</select>
        ${rep === 'days' ? `<div class="gl-days">${DAYS.map((n, i) => `<button type="button" data-eday="${i}" class="${days.includes(i) ? 'on' : ''}">${n}</button>`).join('')}</div>` : ''}
        <label class="muted gl-lab">Area</label>${areaBtns(area, 'data-earea')}
        <div class="gl-sub" style="margin-top:10px">Ticked ${Object.keys(it.done || {}).length} time${Object.keys(it.done || {}).length === 1 ? '' : 's'}${streak(it) >= 2 ? ` · current streak ${streak(it)}` : ''}</div>
        <div class="fr-btns" style="margin-top:14px"><button class="gbtn" id="glESave">Save</button><button class="gbtn ghost fr-del" id="glEDel">Delete</button></div>`;
      box.querySelector('#glEText').value = txt;
      box.querySelector('#glERep').onchange = (e) => { rep = e.target.value; draw(); };
      box.querySelectorAll('[data-eday]').forEach((b) => (b.onclick = () => { const d = Number(b.dataset.eday); days = days.includes(d) ? days.filter((x) => x !== d) : days.concat(d); draw(); }));
      box.querySelectorAll('[data-earea]').forEach((b) => (b.onclick = () => { area = b.dataset.earea; draw(); }));
      box.querySelector('#glESave').onclick = () => { const v = box.querySelector('#glEText').value.trim().slice(0, 80); if (v) it.text = v; it.repeat = rep; it.days = rep === 'days' ? days : undefined; it.area = area; save(); G.closeSheet && G.closeSheet(true); render(); };
      box.querySelector('#glEDel').onclick = () => { if (confirm(`Delete "${it.text}"? Its ticks are removed too.`)) { S.daily = S.daily.filter((x) => x.id !== id); save(); G.closeSheet && G.closeSheet(true); render(); } };
    };
    draw();
  }
  function dueText(g) { if (!g.due) return ''; const [y, m, d] = g.due.split('-').map(Number); const days = Math.round((new Date(y, m - 1, d) - new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) / 864e5); const nice = new Date(y, m - 1, d).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }); return `by ${nice} · ${days > 1 ? days + ' days left' : days === 1 ? 'tomorrow' : days === 0 ? 'today' : Math.abs(days) + ' days over'}`; }
  function renderGoals() {
    const c = document.getElementById('glGoals'); if (!c) return; const act = S.goals.filter((g) => !g.done), fin = S.goals.filter((g) => g.done).sort((a, b) => (a.done < b.done ? 1 : -1));
    const keep = c.querySelector('#glGNew') ? c.querySelector('#glGNew').value : '', keepD = c.querySelector('#glGDue') ? c.querySelector('#glGDue').value : '';
    c.innerHTML = `<div class="cardhead"><h2>🎯 Goals</h2><span class="muted">${act.length ? act.length + ' in progress' : ''}${fin.length ? `${act.length ? ' · ' : ''}${fin.length} achieved` : ''}</span></div>
      ${act.length ? '' : '<div class="muted gl-empty">Bigger things you\'re working towards — a first pull-up, reading a book a month, a calmer morning.</div>'}
      <div class="gl-list">${act.map((g) => `<div class="gl-row"><button type="button" class="gl-tick" data-gdone="${g.id}" aria-label="Mark ${E(g.text)} achieved"></button><div class="gl-main"><div class="gl-text">${g.area ? AREA[g.area] + ' ' : ''}${E(g.text)}</div>${g.due ? `<div class="gl-sub">${E(dueText(g))}</div>` : ''}</div><button type="button" class="gl-more" data-gdel="${g.id}" aria-label="Remove ${E(g.text)}">✕</button></div>`).join('')}</div>
      <div class="gl-add"><input id="glGNew" type="text" maxlength="100" placeholder="Add a goal…" autocomplete="off"><button type="button" class="gl-go" id="glGAdd">Add</button></div>
      <div class="gl-opts"><label class="gl-date">📅 <input id="glGDue" type="date" aria-label="Target date (optional)"></label>${areaBtns(form.garea, 'data-garea')}</div>
      ${fin.length ? `<details class="gl-fin" ${S.finOpen ? 'open' : ''}><summary>🏆 Achieved (${fin.length})</summary>${fin.map((g) => `<div class="gl-row done"><button type="button" class="gl-tick" data-gundo="${g.id}" aria-label="Move ${E(g.text)} back to in progress">✓</button><div class="gl-main"><div class="gl-text">${g.area ? AREA[g.area] + ' ' : ''}${E(g.text)}</div><div class="gl-sub">achieved ${E(g.done.slice(5))}</div></div><button type="button" class="gl-more" data-gdel="${g.id}" aria-label="Remove ${E(g.text)}">✕</button></div>`).join('')}</details>` : ''}`;
    const inp = c.querySelector('#glGNew'), due = c.querySelector('#glGDue'); inp.value = keep; due.value = keepD;
    const add = () => { const text = inp.value.trim().slice(0, 100); if (!text) { inp.focus(); return; } if (S.goals.length >= 100) return; S.goals.push({ id: uid(), text, area: form.garea, due: /^\d{4}-\d{2}-\d{2}$/.test(due.value) ? due.value : '', made: today(), done: '' }); save(); inp.value = ''; due.value = ''; form.garea = ''; if (typeof haptic === 'function') haptic('light'); render(); };
    c.querySelector('#glGAdd').onclick = add; inp.onkeydown = (e) => { if (e.key === 'Enter') add(); };
    c.querySelectorAll('[data-garea]').forEach((b) => (b.onclick = () => { form.garea = b.dataset.garea; renderGoals(); }));
    c.querySelectorAll('[data-gdone]').forEach((b) => (b.onclick = () => { const g = S.goals.find((x) => x.id === b.dataset.gdone); if (!g) return; g.done = today(); save(); if (typeof haptic === 'function') haptic('success'); if (window.pulseFx) pulseFx('questComplete', { x: .5, y: .22, w: .85 }); if (window.pulseSfx) pulseSfx('quest'); if (typeof showToast === 'function') showToast('🏆 Goal achieved: ' + g.text, null, null, 3500); render(); }));
    c.querySelectorAll('[data-gundo]').forEach((b) => (b.onclick = () => { const g = S.goals.find((x) => x.id === b.dataset.gundo); if (g) { g.done = ''; save(); render(); } }));
    c.querySelectorAll('[data-gdel]').forEach((b) => (b.onclick = () => { const g = S.goals.find((x) => x.id === b.dataset.gdel); if (g && confirm(`Remove "${g.text}"?`)) { S.goals = S.goals.filter((x) => x.id !== g.id); save(); render(); } }));
    const f = c.querySelector('.gl-fin'); if (f) f.ontoggle = () => { S.finOpen = f.open; save(); };
  }
  function renderWeek() {
    const c = document.getElementById('glWeek'); if (!c) return;
    const cells = []; let tot = 0, got = 0;
    for (let i = 6; i >= 0; i--) { const d = back(i), k = dk(d); const items = S.daily.filter((it) => dueOn(it, d)); const n = items.filter((it) => isDone(it, k)).length; tot += items.length; got += n; cells.push({ d, n, of: items.length }); }
    c.style.display = S.daily.length ? '' : 'none';
    c.innerHTML = `<div class="cardhead"><h2>📆 Last 7 Days</h2><span class="muted">${tot ? Math.round(got / tot * 100) + '% ticked' : ''}</span></div>
      <div class="gl-week">${cells.map((x) => { const p = x.of ? x.n / x.of : 0; return `<div class="gl-day"><div class="gl-pip ${!x.of ? 'none' : p >= 1 ? 'full' : p > 0 ? 'part' : ''}" title="${x.n} of ${x.of}">${x.of ? x.n : '–'}</div><span>${DAYS[x.d.getDay()][0]}</span></div>`; }).join('')}</div>
      <div class="gl-sub">The number is how many daily things you ticked that day. Gold means all of them.</div>`;
  }
  function render() { if (!section()) return; try { renderToday(); renderGoals(); renderWeek(); } catch (e) { console.warn('goals', e); } const fab = document.getElementById('fab'); if (fab && G.navTab) fab.style.display = G.navTab() === 'goals' ? 'none' : ''; }
  prune(); save(); section();
  G.goals = { state: () => S, render, dueOn, streak };
  G.on && G.on('render', render);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else setTimeout(render, 0);
  // a new day while the app is open: redraw so yesterday's ticks clear
  let seen = today(); setInterval(() => { if (today() !== seen) { seen = today(); render(); } }, 60000);
})();
