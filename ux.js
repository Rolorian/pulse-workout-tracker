// Pulse — UX layer: smooth list changes (AutoAnimate), the yearly training heatmap, and the "what's new" tour (Driver.js).
// All libraries are local copies in vendor/; nothing here talks to the network.
(function () {
  // ---------------- smooth lists ----------------
  // Lists are re-rendered with innerHTML. To let AutoAnimate move only what changed, we swap innerHTML on these
  // containers for a tiny keyed morph: identical rows keep their DOM node, new rows slide in, removed rows fade out.
  function morph(el, html) {
    const tpl = document.createElement('template'); tpl.innerHTML = html;
    [...el.childNodes].forEach((n) => { if (n.nodeType !== 1) n.remove(); });
    const pool = new Map();
    [...el.children].forEach((c) => { const k = c.outerHTML; if (!pool.has(k)) pool.set(k, []); pool.get(k).push(c); });
    const next = [...tpl.content.children].map((n) => { const reuse = pool.get(n.outerHTML); return reuse && reuse.length ? reuse.shift() : n; });
    pool.forEach((list) => list.forEach((n) => n.remove()));
    next.forEach((n, i) => { if (el.children[i] !== n) el.insertBefore(n, el.children[i] || null); });
    // keep any plain text the caller rendered (e.g. an empty-state message without a wrapper)
    if (!tpl.content.children.length && tpl.content.textContent.trim()) el.textContent = tpl.content.textContent;
  }
  const desc = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML');
  function smoothList(id) {
    const el = document.getElementById(id); if (!el || el.__smooth) return;
    el.__smooth = true;
    if (window.autoAnimate) { try { autoAnimate(el, { duration: 190, easing: 'ease-out' }); } catch (e) { /* optional */ } }
    Object.defineProperty(el, 'innerHTML', { configurable: true, get() { return desc.get.call(this); }, set(v) { try { morph(this, String(v)); } catch (e) { desc.set.call(this, v); } } });
  }
  ['todayList', 'historyList', 'questList'].forEach(smoothList);

  // ---------------- yearly training heatmap (Stats) ----------------
  const DAY = 864e5;
  function heatCard() {
    let card = document.getElementById('heatCard'); if (card) return card;
    const anchor = document.getElementById('progressChart'); const host = anchor && anchor.closest('.card'); if (!host) return null;
    card = document.createElement('div'); card.className = 'card'; card.id = 'heatCard';
    card.innerHTML = '<div class="cardhead"><h2>🗓️ Your Training Year</h2><span class="muted" id="heatSum"></span></div><div class="heat-scroll"><div class="heat" id="heatGrid"></div></div><div class="heat-legend"><span>Less</span><i class="l0"></i><i class="l1"></i><i class="l2"></i><i class="l3"></i><i class="l4"></i><span>More</span></div>';
    host.parentNode.insertBefore(card, host.nextSibling);
    card.querySelector('#heatGrid').addEventListener('click', (e) => { const c = e.target.closest('[data-d]'); if (!c) return; const d = c.dataset.d; const n = Number(c.dataset.n || 0); const ex = c.dataset.x || ''; if (typeof showToast === 'function') showToast(n ? `📅 ${d}: ${n} set${n > 1 ? 's' : ''}${ex ? ' · ' + ex : ''}` : `📅 ${d}: rest day`, null, null, 2600); });
    return card;
  }
  function renderHeatmap() {
    if (typeof workouts === 'undefined' || typeof dateKey !== 'function') return;
    const card = heatCard(); if (!card) return;
    const per = {}, exs = {};
    workouts.forEach((w) => { per[w.date] = (per[w.date] || 0) + (w.sets || 1); (exs[w.date] = exs[w.date] || new Set()).add(w.exercise); });
    const vals = Object.values(per).filter((v) => v > 0).sort((a, b) => a - b);
    const q = (p) => vals.length ? vals[Math.min(vals.length - 1, Math.floor(p * vals.length))] : 1;
    const t1 = q(0.25), t2 = q(0.5), t3 = q(0.8);
    const lvl = (v) => (!v ? 0 : v <= t1 ? 1 : v <= t2 ? 2 : v <= t3 ? 3 : 4);
    // 53 weeks ending this week, Monday first
    const today = new Date(); today.setHours(12, 0, 0, 0);
    const dow = (today.getDay() + 6) % 7; const start = new Date(today.getTime() - (52 * 7 + dow) * DAY);
    let html = '', active = 0, total = 0, lastMonth = -1; const months = [];
    for (let w = 0; w < 53; w++) {
      const wkStart = new Date(start.getTime() + w * 7 * DAY);
      if (wkStart.getMonth() !== lastMonth) { months.push([w, wkStart.toLocaleString(undefined, { month: 'short' })]); lastMonth = wkStart.getMonth(); }
      for (let d = 0; d < 7; d++) {
        const dt = new Date(start.getTime() + (w * 7 + d) * DAY); const k = dateKey(dt);
        if (dt > today) { html += '<b class="fut"></b>'; continue; }
        const v = per[k] || 0; if (v) { active++; total += v; }
        html += `<b class="l${lvl(v)}${k === dateKey(today) ? ' now' : ''}" data-d="${k}" data-n="${v}" data-x="${exs[k] ? [...exs[k]].slice(0, 3).join(', ').replace(/"/g, '') : ''}"></b>`;
      }
    }
    const grid = card.querySelector('#heatGrid'); grid.innerHTML = html;
    grid.style.setProperty('--weeks', 53);
    let ml = card.querySelector('.heat-months'); if (!ml) { ml = document.createElement('div'); ml.className = 'heat-months'; grid.parentNode.insertBefore(ml, grid); }
    ml.innerHTML = months.filter((m, i) => i === 0 || m[0] - months[i - 1][0] >= 3).map(([w, n]) => `<span style="grid-column:${w + 1}">${n}</span>`).join('');
    card.querySelector('#heatSum').textContent = `${active} active day${active === 1 ? '' : 's'} · ${total} sets`;
    const sc = card.querySelector('.heat-scroll'); requestAnimationFrame(() => { sc.scrollLeft = sc.scrollWidth; });
  }
  if (typeof window.renderProgressChart === 'function') {
    const orig = window.renderProgressChart;
    window.renderProgressChart = function () { const r = orig.apply(this, arguments); try { renderHeatmap(); } catch (e) { console.warn('heatmap', e); } return r; };
  }

  // ---------------- "what's new" tour ----------------
  const TOUR_KEY = 'pulse-tour-v1';
  function tourSteps() {
    return [
      { element: '#fab', popover: { title: '🔍 Smarter logging', description: 'Tap ＋, then search 180+ bodyweight exercises. Try “press ups” — typos like “pusups” work too. Each move has a How-to card.' } },
      { element: '.navbtn[data-nav="stats"]', popover: { title: '📈 New Stats', description: 'A zoomable progress chart for every exercise and a GitHub-style calendar of your whole training year.' } },
      { element: '.navbtn[data-nav="adventure"]', popover: { title: '⚔️ Realm upgrades', description: 'New combat effects, weather, chiptune music, and dungeons that are freshly carved every run — explore by torchlight.' } },
      { popover: { title: '🔒 Still 100% private', description: 'Everything new runs on your phone. No accounts, no tracking, nothing leaves the device. Replay this tour any time from ⚙️ Settings.' } }
    ];
  }
  function startTour(force) {
    if (!window.driverjs) return false;
    if (!force) { try { if (localStorage.getItem(TOUR_KEY)) return false; } catch (e) { return false; } }
    try {
      const d = driverjs.driver({ showProgress: true, allowClose: true, overlayOpacity: 0.72, stagePadding: 6, stageRadius: 14, popoverClass: 'pulse-tour', nextBtnText: 'Next ›', prevBtnText: '‹', doneBtnText: 'Let’s go', steps: tourSteps().filter((s) => !s.element || document.querySelector(s.element)), onDestroyed: () => { try { localStorage.setItem(TOUR_KEY, '1'); } catch (e) { /* */ } } });
      d.drive(); return true;
    } catch (e) { console.warn('tour', e); return false; }
  }
  // wait until nothing else (onboarding, popups, the Realm) is covering the screen
  function tourWhenClear(tries = 0) {
    if (window.__PULSE_TEST && !window.__PULSE_TOUR) return;
    try { if (localStorage.getItem(TOUR_KEY)) return; } catch (e) { return; }
    const busy = document.body.classList.contains('realm-on') || [...document.querySelectorAll('body > div, .modal.open')].some((d) => { const s = getComputedStyle(d); return (d.classList.contains('open') || (s.position === 'fixed' && parseInt(s.zIndex) >= 60)) && s.display !== 'none' && d.offsetHeight > 200 && d.id !== 'toast'; });
    if (busy || !(typeof workouts !== 'undefined' && workouts.length)) { if (tries < 40) setTimeout(() => tourWhenClear(tries + 1), 3000); return; }
    startTour(false);
  }
  setTimeout(tourWhenClear, 2500);
  // "Replay tour" row in Settings
  const hapRow = document.getElementById('toggleHaptics'); const row = hapRow && hapRow.closest('.set-row');
  if (row && !document.getElementById('replayTour')) {
    const r = document.createElement('div'); r.className = 'set-row'; r.id = 'replayTour';
    r.innerHTML = '<div><div class="set-name">🧭 What’s new tour</div><div class="set-sub">A quick walkthrough of the latest features</div></div><button class="set-btn" type="button">Replay</button>';
    r.querySelector('button').onclick = () => { if (typeof closeSettings === 'function') closeSettings(); if (window.G && G.nav) G.nav('today'); setTimeout(() => startTour(true), 350); };
    row.parentNode.insertBefore(r, row.nextSibling);
  }

  Object.assign(window, { renderHeatmap, startTour, smoothList });
})();
