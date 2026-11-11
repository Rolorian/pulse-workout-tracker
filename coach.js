/* Pulse — Coach: muscle balance, recovery, next-target nudges, bodyweight skill ladders, Today's plan and rest-day quests.
   Everything is worked out on the phone from your own log. Recovery is an estimate from recent training, not a medical reading. */
(function () {
  const G = (window.G = window.G || {});
  const KEY = 'pulse-coach-v1';
  let C; try { C = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { C = null; }
  if (!C || typeof C !== 'object') C = {};
  C.passed = C.passed || {}; C.mins = C.mins || 20; C.rest = C.rest || {}; C.open = C.open || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(C)); } catch (e) { /* */ } };
  const E = (s) => (typeof esc === 'function' ? esc(String(s)) : String(s));
  const W = () => (typeof workouts !== 'undefined' && Array.isArray(workouts) ? workouts : []);
  const dk = (d) => dateKey(d);
  const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return dk(d); };

  // ---------------- skill ladders ----------------
  // Each step: [exercise, unit, target per set]. A step is passed by 3 sets at the target on one day.
  const LADDERS = [
    { id: 'push', name: 'Push', icon: '💪', group: 'push', steps: [['Knee push-ups', 'reps', 12], ['Press-ups', 'reps', 15], ['Diamond push-ups', 'reps', 12], ['Decline push-ups', 'reps', 12], ['Archer push-ups', 'reps', 8], ['One-arm push-ups', 'reps', 5]] },
    { id: 'legs', name: 'Legs', icon: '🦵', group: 'legs', steps: [['Squats', 'reps', 20], ['Lunges', 'reps', 16], ['Bulgarian split squats', 'reps', 12], ['Jump squats', 'reps', 15], ['Pistol squats', 'reps', 6]] },
    { id: 'pull', name: 'Pull', icon: '🧗', group: 'pull', note: 'From step 3 you need a bar, a sturdy table or a door-frame bar.', steps: [['Door frame rows', 'reps', 15], ['Rows', 'reps', 12], ['Negative pull-ups', 'reps', 5], ['Pull-ups', 'reps', 8]] },
    { id: 'core', name: 'Core', icon: '🔥', group: 'core', steps: [['Plank', 'minutes', 1], ['Hollow hold', 'seconds', 30], ['Leg raises', 'reps', 12], ['L-sit', 'seconds', 15]] },
    { id: 'shoulders', name: 'Shoulders', icon: '🤸', group: 'push', steps: [['Pike push-ups', 'reps', 10], ['Decline pike push-ups', 'reps', 8], ['Wall handstand hold', 'seconds', 30], ['Handstand push-ups', 'reps', 3]] }
  ];
  const LCAT = { push: 'chest', legs: 'legs', pull: 'back', core: 'core', shoulders: 'arms' };
  const STEP_OF = {}; LADDERS.forEach((L) => L.steps.forEach((s, i) => { STEP_OF[s[0]] = { L, i }; }));
  // ladder moves that aren't built-in buttons still get the right category
  const oldCat = window.getCategoryForExercise;
  if (typeof oldCat === 'function') window.getCategoryForExercise = function (ex, cc) { const r = oldCat(ex, cc); if (r && r !== 'custom') return r; const s = STEP_OF[ex]; return s ? LCAT[s.L.id] : r; };

  function stepDone(step) {
    const [name, , target] = step; const per = {};
    W().forEach((w) => { if (w.exercise === name && w.amount >= target) per[w.date] = (per[w.date] || 0) + (w.sets || 1); });
    return Object.values(per).some((n) => n >= 3);
  }
  function bestToward(step) { // best "sets at target" on one day, and best single amount, to show progress
    const [name, , target] = step; const per = {}; let best = 0;
    W().forEach((w) => { if (w.exercise !== name) return; best = Math.max(best, w.amount); if (w.amount >= target) per[w.date] = (per[w.date] || 0) + (w.sets || 1); });
    return { sets: Math.min(3, Math.max(0, ...Object.values(per))), best };
  }
  function ladderState(L) { let top = -1; L.steps.forEach((s, i) => { if (stepDone(s)) top = i; }); return { passed: top + 1, cur: Math.min(top + 1, L.steps.length - 1), mastered: top + 1 >= L.steps.length }; }
  function totalSteps() { return LADDERS.reduce((a, L) => a + ladderState(L).passed, 0); }
  G.ladderSteps = totalSteps;
  function checkUnlocks(quiet) {
    let fresh = null;
    LADDERS.forEach((L) => { const st = ladderState(L); const had = C.passed[L.id] || 0; if (st.passed > had) { if (C.init) fresh = { L, st }; C.passed[L.id] = st.passed; } });
    if (!C.init) { C.init = 1; save(); return; }
    if (fresh && !quiet) {
      save(); const { L, st } = fresh; const next = st.mastered ? null : L.steps[st.cur];
      if (window.pulseFx) pulseFx('levelUp', { x: .5, y: .35, w: .8, opts: { text: st.mastered ? 'MASTERED!' : 'NEW SKILL!' } });
      if (window.pulseSfx) pulseSfx('quest');
      try { G.reward && G.reward({ coins: 60 * st.passed, gems: st.mastered ? 5 : 1 }, { silent: true }); } catch (e) { /* */ }
      if (typeof showToast === 'function') setTimeout(() => showToast(st.mastered ? `🏅 ${L.name} ladder mastered!` : `🧗 ${L.name} ladder: unlocked ${next[0]}`, null, null, 4500), 500);
    } else save();
  }

  // ---------------- muscle groups, balance, recovery ----------------
  const GROUPS = [['push', 'Push', '💪'], ['pull', 'Pull', '🧗'], ['legs', 'Legs', '🦵'], ['core', 'Core', '🔥']];
  const MUS = { chest: 'push', triceps: 'push', shoulders: 'push', lats: 'pull', 'middle back': 'pull', biceps: 'pull', traps: 'pull', forearms: 'pull', 'lower back': 'pull', quadriceps: 'legs', hamstrings: 'legs', glutes: 'legs', calves: 'legs', adductors: 'legs', abductors: 'legs', abdominals: 'core' };
  const CATG = { chest: 'push', back: 'pull', legs: 'legs', core: 'core' };
  const gcache = {};
  function groupOf(name) {
    if (name in gcache) return gcache[name];
    let g = null; const s = STEP_OF[name];
    if (s) g = s.L.group;
    if (!g) { const cat = typeof oldCat === 'function' ? oldCat(name) : null; if (cat === 'arms') g = /curl|chin|row/i.test(name) ? 'pull' : 'push'; else if (CATG[cat]) g = CATG[cat]; else if (cat === 'cardio') g = 'cardio'; }
    if (!g && window.libFind) { const e = libFind(name); if (e && e.m && e.m[0]) g = MUS[e.m[0]] || null; }
    return (gcache[name] = g);
  }
  function balance() {
    const from = daysAgo(6); const sets = { push: 0, pull: 0, legs: 0, core: 0 }; const load = { push: 0, pull: 0, legs: 0, core: 0 };
    const wts = { [daysAgo(0)]: 1, [daysAgo(1)]: 0.65, [daysAgo(2)]: 0.3 }; let tired = 0;
    W().forEach((w) => {
      if (w.date < from) return; const g = groupOf(w.exercise); const n = w.sets || 1;
      if (wts[w.date] && (w.feeling === '😴' || w.feeling === '🤕') && w.date >= daysAgo(1)) tired = 20;
      if (!(g in sets)) return; sets[g] += n; if (wts[w.date]) load[g] += n * wts[w.date];
    });
    const total = sets.push + sets.pull + sets.legs + sets.core;
    const fresh = {}; Object.keys(load).forEach((g) => { fresh[g] = Math.max(0, Math.round(100 - load[g] * 9 - tired)); });
    const low = total >= 8 ? GROUPS.map((x) => x[0]).filter((g) => sets[g] / total < 0.12) : [];
    return { sets, total, fresh, low, tired: tired > 0 };
  }
  const freshLabel = (f) => (f >= 70 ? ['Fresh', 'ok'] : f >= 40 ? ['Recovering', 'mid'] : ['Tired', 'low']);
  G.coachBalance = balance;

  // ---------------- next-target nudges ----------------
  function nudge(name) {
    const per = {}; W().forEach((w) => { if (w.exercise !== name) return; const d = per[w.date] || (per[w.date] = { best: 0, sets: 0, unit: w.unit }); d.best = Math.max(d.best, w.amount); d.sets += w.sets || 1; });
    const days = Object.keys(per).sort(); if (!days.length) return null;
    const last = per[days[days.length - 1]], prev = days.length > 1 ? per[days[days.length - 2]] : null;
    const step = last.unit === 'reps' ? 1 : last.unit === 'seconds' ? 5 : last.unit === 'minutes' ? 0.25 : last.unit === 'km' ? 0.2 : 1;
    const up = !prev || last.best >= prev.best; // held or improved last time → nudge up; dipped → repeat it first
    const target = up ? Math.round((last.best + step) * 100) / 100 : last.best;
    return { date: days[days.length - 1], last, sets: Math.max(1, Math.min(5, last.sets)), target, up, unit: last.unit };
  }
  G.coachNudge = nudge;
  function fill(amount, sets) { const a = document.getElementById('amount'), s = document.getElementById('sets'); if (a) a.value = amount; if (s && sets) s.value = sets; if (typeof haptic === 'function') haptic('selection'); }
  function renderNudge() {
    const host = document.getElementById('exHowTo'); if (!host) return;
    let el = document.getElementById('exNudge'); if (!el) { el = document.createElement('div'); el.id = 'exNudge'; host.parentNode.insertBefore(el, host); }
    const name = typeof selected !== 'undefined' ? selected : null; const n = name && name !== 'Custom' ? nudge(name) : null; const st = name && STEP_OF[name];
    let html = '';
    if (n) html += `<button type="button" class="nudge" data-a="${n.target}" data-s="${n.sets}"><span>Last: <b>${n.sets}×${n.last.best}</b> ${E(n.unit)} · ${E(n.date.slice(5))}</span><span class="nudge-go">${n.up ? 'Try' : 'Repeat'} ${n.sets}×${n.target} ›</span></button>`;
    if (st) { const s = st.L.steps[st.i]; html += `<div class="nudge-ladder">${st.L.icon} ${E(st.L.name)} ladder · step ${st.i + 1}/${st.L.steps.length} · pass with 3 sets of ${s[2]} ${E(s[1])}</div>`; }
    el.innerHTML = html;
    const b = el.querySelector('.nudge'); if (b) b.onclick = () => fill(b.dataset.a, b.dataset.s);
  }
  if (typeof window.renderExercises === 'function') { const o = window.renderExercises; window.renderExercises = function () { const r = o.apply(this, arguments); try { renderNudge(); } catch (e) { /* */ } return r; }; }

  // ---------------- Today's plan ----------------
  function planItems() {
    const b = balance(); const n = C.mins <= 10 ? 3 : C.mins <= 20 ? 4 : 5; const setsEach = C.mins <= 10 ? 2 : 3;
    const share = (g) => (b.total ? b.sets[g] / b.total : 0);
    const order = GROUPS.map((x) => x[0]).sort((a, c) => (b.fresh[c] - share(c) * 60) - (b.fresh[a] - share(a) * 60));
    const picks = []; const usable = order.filter((g) => b.fresh[g] >= 35); const pool = usable.length ? usable : order.slice(0, 2);
    const ladFor = { push: ['push', 'shoulders'], pull: ['pull'], legs: ['legs'], core: ['core'] };
    let i = 0;
    while (picks.length < n && i < 12) {
      const g = pool[i % pool.length]; const lids = ladFor[g]; const L = LADDERS.find((x) => x.id === lids[Math.floor(i / pool.length) % lids.length]);
      const st = ladderState(L); let step = L.steps[st.cur];
      if (picks.some((p) => p.name === step[0])) { const alt = L.steps[Math.max(0, st.cur - 1)]; if (picks.some((p) => p.name === alt[0])) { i++; continue; } step = alt; }
      const nd = nudge(step[0]); const amt = nd ? nd.target : Math.max(1, step[1] === 'minutes' ? 0.5 : Math.round(step[2] * 0.6));
      picks.push({ name: step[0], unit: step[1], sets: setsEach, amount: amt, why: b.low.includes(g) ? 'neglected this week' : b.fresh[g] >= 70 ? 'fresh' : 'recovering', L });
      i++;
    }
    return { picks, b, allTired: !usable.length && b.total > 0 };
  }
  function logPlanned(p) { if (typeof openAdd !== 'function') return; openAdd(); if (typeof selectEx === 'function') selectEx(p.name, p.unit); setTimeout(() => fill(p.amount, p.sets), 60); }
  function restQuest(today) {
    const lib = (window.EXLIB || []).filter((e) => e.k === 'stretching' && e.st && e.st.length); if (!lib.length) return '';
    let h = 0; for (const ch of today) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
    const picks = []; for (let k = 0; picks.length < 3 && k < 30; k++) { const e = lib[(h + k * 37) % lib.length]; if (!picks.includes(e)) picks.push(e); }
    const done = C.rest[today] || {}; const all = picks.every((e) => done[e.n]);
    return `<div class="coach-rest"><div class="coach-sub">🛌 Rest day quest — three easy stretches. ${all ? 'Done — enjoy the rest. ✅' : 'Finish all three for 30 🪙. Your streak is already safe.'}</div>
      ${picks.map((e) => `<details class="coach-st ${done[e.n] ? 'done' : ''}"><summary><span>${done[e.n] ? '✅' : '🧘'} ${E(e.n)}</span>${done[e.n] ? '' : `<button type="button" class="coach-mini" data-st="${E(e.n)}">Done</button>`}</summary><ol>${e.st.slice(0, 4).map((s) => `<li>${E(s)}</li>`).join('')}</ol></details>`).join('')}</div>`;
  }
  function host(id, beforeId) { let c = document.getElementById(id); if (c) return c; const a = document.getElementById(beforeId); if (!a) return null; c = document.createElement('div'); c.className = 'card'; c.id = id; a.parentNode.insertBefore(c, a); return c; }
  function renderPlan() {
    const c = host('coachPlan', 'plankCard'); if (!c) return; const today = dk(new Date());
    const isRest = typeof getRestDays === 'function' && getRestDays().includes(today);
    if (isRest) { c.innerHTML = `<div class="cardhead"><h2>🧭 Today's Plan</h2><span class="muted">rest day</span></div>${restQuest(today)}`; }
    else {
      const { picks, b, allTired } = planItems(); const doneToday = new Set(W().filter((w) => w.date === today).map((w) => w.exercise));
      const left = picks.filter((p) => !doneToday.has(p.name)).length;
      c.innerHTML = `<div class="cardhead"><h2>🧭 Today's Plan</h2><span class="coach-mins">${[10, 20, 30].map((m) => `<button type="button" data-m="${m}" class="${C.mins === m ? 'on' : ''}">${m}m</button>`).join('')}</span></div>
        ${allTired ? `<div class="coach-sub">Everything is still recovering${b.tired ? ' and you logged feeling worn out' : ''}. A rest day would do more than another session. <button type="button" class="coach-mini" id="coachRest">Take a rest day</button></div>` : `<div class="coach-sub">${left ? 'Built from what you\'ve trained least and what has recovered.' : 'Plan complete — nice work. ✅'}</div>`}
        ${picks.map((p, i) => `<div class="coach-row ${doneToday.has(p.name) ? 'done' : ''}"><div><b>${doneToday.has(p.name) ? '✅ ' : ''}${E(p.name)}</b><small>${p.sets} × ${p.amount} ${E(p.unit)} · ${E(p.why)}</small></div><button type="button" class="coach-mini" data-p="${i}">${doneToday.has(p.name) ? 'Again' : 'Log'}</button></div>`).join('')}`;
      c.querySelectorAll('[data-p]').forEach((bn) => (bn.onclick = () => logPlanned(picks[Number(bn.dataset.p)])));
      c.querySelectorAll('[data-m]').forEach((bn) => (bn.onclick = () => { C.mins = Number(bn.dataset.m); save(); renderPlan(); }));
      const r = c.querySelector('#coachRest'); if (r) r.onclick = () => typeof toggleRestDay === 'function' && toggleRestDay();
    }
    c.querySelectorAll('[data-st]').forEach((bn) => (bn.onclick = (ev) => {
      ev.preventDefault(); const d = (C.rest[today] = C.rest[today] || {}); d[bn.dataset.st] = 1;
      Object.keys(C.rest).forEach((k) => { if (k < daysAgo(14)) delete C.rest[k]; });
      if (Object.keys(d).filter((k) => k !== '_paid').length >= 3 && !d._paid) { d._paid = 1; try { G.reward && G.reward({ coins: 30 }, { silent: true }); } catch (e) { /* */ } if (typeof showToast === 'function') showToast('🧘 Rest day quest complete · +30 🪙', null, null, 3000); if (window.pulseSfx) pulseSfx('quest'); }
      save(); renderPlan();
    }));
  }
  function renderLadders() {
    const c = host('coachLadders', 'plankCard'); if (!c) return;
    c.innerHTML = `<div class="cardhead"><h2>🧗 Skill Ladders</h2><span class="muted">${totalSteps()} steps climbed</span></div>` + LADDERS.map((L) => {
      const st = ladderState(L); const step = L.steps[st.cur]; const pr = bestToward(step); const open = !!C.open[L.id];
      return `<div class="lad"><button type="button" class="lad-head" data-l="${L.id}"><span>${L.icon} <b>${E(L.name)}</b> <small>${st.mastered ? 'mastered 🏅' : `step ${st.cur + 1}/${L.steps.length}: ${E(step[0])}`}</small></span><span class="lad-pips">${L.steps.map((s, i) => `<i class="${i < st.passed ? 'on' : i === st.cur ? 'cur' : ''}"></i>`).join('')}</span></button>
        ${open ? `<div class="lad-body">${L.steps.map((s, i) => `<div class="lad-step ${i < st.passed ? 'on' : i === st.cur ? 'cur' : 'lock'}"><span>${i < st.passed ? '✅' : i === st.cur ? '➡️' : '🔒'} ${E(s[0])}</span><small>3 × ${s[2]} ${E(s[1])}</small></div>`).join('')}
          ${st.mastered ? '' : `<div class="coach-sub">To pass: 3 sets of ${step[2]} ${E(step[1])} in one day. So far: ${pr.sets}/3 sets at target${pr.best ? `, best ${pr.best}` : ''}.</div><button type="button" class="coach-mini" data-go="${L.id}">Log ${E(step[0])}</button>`}
          ${L.note ? `<div class="coach-sub">${E(L.note)}</div>` : ''}</div>` : ''}</div>`;
    }).join('') + '<div class="coach-sub" style="margin-top:8px">Each step climbed also adds +1% damage in the Realm.</div>';
    c.querySelectorAll('[data-l]').forEach((b) => (b.onclick = () => { C.open[b.dataset.l] = !C.open[b.dataset.l]; save(); renderLadders(); }));
    c.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => { const L = LADDERS.find((x) => x.id === b.dataset.go); const s = L.steps[ladderState(L).cur]; const nd = nudge(s[0]); logPlanned({ name: s[0], unit: s[1], sets: 3, amount: nd ? Math.max(nd.target, 1) : s[2] }); }));
  }
  function renderBalance() {
    const anchor = document.getElementById('heatCard') || (document.getElementById('progressChart') && document.getElementById('progressChart').closest('.card')); if (!anchor) return;
    let c = document.getElementById('balanceCard'); if (!c) { c = document.createElement('div'); c.className = 'card'; c.id = 'balanceCard'; anchor.parentNode.insertBefore(c, anchor.nextSibling); }
    const b = balance(); const max = Math.max(1, ...Object.values(b.sets));
    const tip = { push: 'Press-ups or Pike push-ups', pull: 'Door frame rows or Superman', legs: 'Squats or Lunges', core: 'Plank or Leg raises' };
    c.innerHTML = `<div class="cardhead"><h2>⚖️ Muscle Balance</h2><span class="muted">last 7 days · sets</span></div>
      ${GROUPS.map(([g, n, ic]) => { const [lab, cls] = freshLabel(b.fresh[g]); return `<div class="bal-row"><span class="bal-n">${ic} ${n}</span><div class="bal-bar"><div style="width:${b.sets[g] / max * 100}%"></div></div><b>${b.sets[g]}</b><span class="bal-f ${cls}">${lab}</span></div>`; }).join('')}
      <div class="coach-sub" style="margin-top:8px">${!b.total ? 'Log a few sessions and this will show what you\'re training and what you\'re skipping.' : b.low.length ? `⚠️ Light on <b>${b.low.map((g) => GROUPS.find((x) => x[0] === g)[1].toLowerCase()).join(' and ')}</b> this week. Try ${E(tip[b.low[0]])}.` : 'Nicely balanced this week. ✅'}</div>
      <div class="coach-sub">Fresh / Recovering / Tired is an estimate from your last three days of training.</div>`;
  }
  function renderAll() { try { checkUnlocks(); renderPlan(); renderLadders(); renderBalance(); } catch (e) { console.warn('coach', e); } }
  G.coach = { LADDERS, ladderState, balance, nudge, planItems, render: renderAll };
  G.on && G.on('render', renderAll);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(renderAll, 0)); else setTimeout(renderAll, 0);
})();
// Realm damage modifiers are collected here: ladders now, builds and companions add theirs.
(function () { const G = window.G; const mods = (G._dmgMods = G._dmgMods || []); G.dmgMods = (mv, B) => mods.reduce((m, fn) => { try { return m * (fn(mv, B) || 1); } catch (e) { return m; } }, 1); mods.push(() => 1 + 0.01 * (G.ladderSteps ? G.ladderSteps() : 0)); })();
