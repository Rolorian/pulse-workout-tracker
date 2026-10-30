/* Pulse — Your Galaxy. Every workout is a star on a spiral that grows outward over time. */
(function () {
  const G = (window.G = window.G || {});
  const GKEY = 'pulse-galaxy-v1';
  let S;
  try { S = JSON.parse(localStorage.getItem(GKEY) || 'null'); } catch (e) { S = null; }
  if (!S) S = {};
  S.found = S.found || {};
  const save = () => localStorage.setItem(GKEY, JSON.stringify(S));
  const CAT_COL = { legs: '#5aa8ff', chest: '#ff6b7a', core: '#f5c542', cardio: '#49e39a', arms: '#ff9f43', back: '#b48cff', custom: '#c9d3dd' };
  const TAU = Math.PI * 2;
  const dayMs = 86400000;
  const toDate = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d); };
  const between = (a, b) => Math.round((toDate(b) - toDate(a)) / dayMs);
  const weekOf = (k) => { const d = toDate(k); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return dateKey(d); };
  const rng = (s) => G.seeded(s);

  const HIDDEN = [
    ['trident', 'The Trident', '🔱', 'Train Mon, Wed & Fri for 4 weeks in a row'],
    ['crown', 'The Crown', '👑', 'A 7-day streak'],
    ['phoenix', 'The Phoenix', '🐦‍🔥', 'Come back after a week off and train 5 of the next 7 days'],
    ['dawn', 'The Dawn Serpent', '🐍', '3 sessions before 8am in one week'],
    ['night', 'The Night Hunter', '🦉', '5 sessions after 9pm in one month'],
    ['wolf', 'The Weekend Wolf', '🐺', 'Train Saturday and Sunday 4 weekends in a row'],
    ['hydra', 'The Hydra', '🐉', '3 sessions in a single day, on 3 different days'],
    ['bear', 'The Great Bear', '🐻', '10,000 total reps'],
    ['lighthouse', 'The Lighthouse', '🗼', '100 days trained'],
    ['ouroboros', 'The Ouroboros', '🐍', 'A 30-day streak']
  ];
  const CREATURES = ['Serpent', 'Bear', 'Hydra', 'Phoenix', 'Wolf', 'Stag', 'Kraken', 'Griffin', 'Lion', 'Dragon', 'Raven', 'Titan', 'Hare', 'Scorpion'];
  const ADJ = { legs: 'Striding', chest: 'Iron', core: 'Stone', cardio: 'Swift', arms: 'Mighty', back: 'Winged', custom: 'Wandering' };
  const MYTHS = ['Orion', 'Atlas', 'Hercules', 'Artemis', 'Perseus', 'Andromeda', 'Draco', 'Lyra', 'Cassiopeia'];

  // ---------------- model ----------------
  let model = null;
  function build() {
    const key = workouts.length + '|' + (workouts.length ? workouts[workouts.length - 1].id + ':' + workouts[workouts.length - 1].amount : '') + '|' + dateKey(new Date());
    if (model && model.key === key) return model;
    const byDay = {};
    workouts.forEach((w) => { if (w.date) (byDay[w.date] = byDay[w.date] || []).push(w); });
    const dates = Object.keys(byDay).sort();
    const m = { key, dates, byDay, stars: [], days: {}, weeks: [], gaps: [], sunrise: [], maxR: 80 };
    if (!dates.length) return (model = m);
    const d0 = dates[0];
    const xps = workouts.map((w) => xpForWorkout(Object.assign({}, w, { bonus: 1 }))).sort((a, b) => a - b);
    const median = xps[Math.floor(xps.length / 2)] || 20;
    dates.forEach((k) => {
      const t = between(d0, k); const r = rng('day' + k);
      const arm = Math.floor(between(weekOf(d0), weekOf(k)) / 7) % 2;
      const th = t * (TAU / 120) + arm * Math.PI + (r() - 0.5) * 0.12;
      const rad = 26 + 9 * Math.pow(t, 0.72) + (r() - 0.5) * 10;
      const day = { k, t, arm, x: Math.cos(th) * rad, y: Math.sin(th) * rad, list: byDay[k] };
      m.days[k] = day; m.maxR = Math.max(m.maxR, rad);
      byDay[k].forEach((w, i) => {
        const rr = rng('w' + w.id); const a = rr() * TAU; const dist = i === 0 ? rr() * 3 : 4 + i * 2.6 + rr() * 3;
        const xp = xpForWorkout(Object.assign({}, w, { bonus: 1 }));
        const cat = getCategoryForExercise(w.exercise, w.category);
        m.stars.push({ w, k, x: day.x + Math.cos(a) * dist, y: day.y + Math.sin(a) * dist, col: CAT_COL[cat] || CAT_COL.custom,
          size: 1.3 + Math.min(4, Math.sqrt(xp) / 4), bright: 0.55 + 0.45 * Math.min(1, xp / (median * 2)), tw: rr() * TAU,
          pr: !!w.isPR, bin: !!w.circuit, gold: !!w.plankChallenge, t: day.t + (w.time ? (Number(w.time.slice(0, 2)) * 60 + Number(w.time.slice(3, 5))) / 1440 : 0.5), cat });
      });
    });
    m.stars.sort((a, b) => a.t - b.t);
    // gaps & sunrises
    for (let i = 1; i < dates.length; i++) {
      const g = between(dates[i - 1], dates[i]);
      if (g >= 4) {
        const a = m.days[dates[i - 1]], b = m.days[dates[i]];
        m.gaps.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, r: 14 + Math.min(40, g * 2.5), len: g });
        m.sunrise.push(b);
      }
    }
    // weekly constellations
    const weeks = {};
    dates.forEach((k) => (weeks[weekOf(k)] = weeks[weekOf(k)] || []).push(k));
    const thisWeek = weekOf(dateKey(new Date()));
    Object.entries(weeks).forEach(([wk, ks]) => {
      if (ks.length < 3 || wk === thisWeek) return;
      const counts = {}; const cats = {};
      ks.forEach((k) => byDay[k].forEach((w) => { counts[w.exercise] = (counts[w.exercise] || 0) + w.amount * (w.sets || 1); const c = getCategoryForExercise(w.exercise, w.category); cats[c] = (cats[c] || 0) + 1; }));
      const ex = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      const cat = Object.entries(cats).sort((a, b) => b[1] - a[1])[0][0];
      const r = rng('const' + wk);
      const single = ex.replace(/s$/, '').replace(/-ups?$/i, '-up');
      const name = r() < 0.3 ? `${MYTHS[Math.floor(r() * MYTHS.length)]}'s ${single}` : `The ${ADJ[cat] || 'Wandering'} ${CREATURES[Math.floor(r() * CREATURES.length)]}`;
      const pts = ks.map((k) => m.days[k]);
      m.weeks.push({ wk, name, pts, cx: pts.reduce((a, p) => a + p.x, 0) / pts.length, cy: pts.reduce((a, p) => a + p.y, 0) / pts.length, col: CAT_COL[cat] || '#fff' });
    });
    // finished plank challenge runs
    m.plankRuns = ((G._plank && G._plank.state().runs) || []).map((run) => dates.filter((k) => k >= run.start && k <= run.end).map((k) => m.days[k]));
    m.lastDate = dates[dates.length - 1];
    model = m;
    return m;
  }

  // ---------------- hidden constellations ----------------
  function streaks(dates) { let best = 0, cur = 0; for (let i = 0; i < dates.length; i++) { cur = i && between(dates[i - 1], dates[i]) === 1 ? cur + 1 : 1; best = Math.max(best, cur); } return best; }
  function checkHidden(m) {
    const ds = m.dates; if (!ds.length) return;
    const set = new Set(ds); const has = (k) => set.has(k);
    const add = (d, n) => { const x = toDate(d); x.setDate(x.getDate() + n); return dateKey(x); };
    const got = {};
    // trident
    const mondays = [...new Set(ds.map(weekOf))].sort(); let run = 0, best = 0;
    mondays.forEach((mo, i) => { const ok = has(mo) && has(add(mo, 2)) && has(add(mo, 4)); run = ok ? (i && between(mondays[i - 1], mo) === 7 && run ? run + 1 : 1) : 0; best = Math.max(best, run); });
    got.trident = best >= 4;
    const st = streaks(ds); got.crown = st >= 7; got.ouroboros = st >= 30;
    for (let i = 1; i < ds.length; i++) if (between(ds[i - 1], ds[i]) >= 8) { const end = add(ds[i], 6); if (ds.filter((k) => k >= ds[i] && k <= end).length >= 5) got.phoenix = true; }
    const early = {}; const late = {}; const perDayTimes = {};
    workouts.forEach((w) => { if (!w.time) return; if (w.time < '08:00') early[weekOf(w.date)] = (early[weekOf(w.date)] || 0) + 1; if (w.time >= '21:00') late[w.date.slice(0, 7)] = (late[w.date.slice(0, 7)] || 0) + 1; (perDayTimes[w.date] = perDayTimes[w.date] || new Set()).add(w.time.slice(0, 2)); });
    got.dawn = Object.values(early).some((v) => v >= 3); got.night = Object.values(late).some((v) => v >= 5);
    got.hydra = Object.values(perDayTimes).filter((s) => s.size >= 3).length >= 3;
    const sats = ds.filter((k) => toDate(k).getDay() === 6 && has(add(k, 1))); let wr = 0, wb = 0; sats.forEach((k, i) => { wr = i && between(sats[i - 1], k) === 7 ? wr + 1 : 1; wb = Math.max(wb, wr); }); got.wolf = wb >= 4;
    got.bear = workouts.filter((w) => w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0) >= 10000;
    got.lighthouse = ds.length >= 100;
    HIDDEN.forEach(([id, name, icon]) => {
      if (got[id] && !S.found[id]) {
        S.found[id] = dateKey(new Date()); save();
        if (S.init) setTimeout(() => { showToast(`✨ Hidden constellation discovered: ${icon} ${name}!`, null, null, 5000); G.reward && G.reward({ coins: 300, gems: 5 }, { quiet: true }); G.fireworks && G.fireworks(3); }, 1200);
      }
    });
  }

  // ---------------- global checks: comeback, black hole, shooting star ----------------
  function daysAway(m) { return m.lastDate ? between(m.lastDate, dateKey(new Date())) : 0; }
  function globalChecks() {
    const m = build();
    if (!S.init) { S.init = true; S.seenPR = m.stars.filter((s) => s.pr).map((s) => s.w.id); HIDDEN.forEach(([id]) => {}); save(); checkHidden(m); return; }
    checkHidden(m);
    const today = dateKey(new Date());
    // comeback sunrise bonus
    const ds = m.dates;
    if (ds.length >= 2 && ds[ds.length - 1] === today && between(ds[ds.length - 2], today) >= 4 && S.comeback !== today) {
      S.comeback = today; save();
      setTimeout(() => { G.reward && G.reward({ coins: 250, gems: 3 }, { label: '🌅 Comeback! A new dawn rises in your galaxy:' }); }, 900);
    }
    // black hole
    const away = daysAway(m);
    if (away >= 14 && !S.hole) { S.hole = true; save(); }
    else if (away < 14 && S.hole) {
      S.hole = false; S.holeCollapse = Date.now(); save();
      setTimeout(() => { showToast('⚫→✨ You pushed the black hole back! Your stars are safe.', null, null, 5000); G.reward && G.reward({ coins: 200, gems: 2 }, { quiet: true }); }, 1000);
    }
    // shooting star roll (at most every 3h)
    const now = Date.now();
    if ((!S.shoot || S.shoot.until < now) && (!S.lastRoll || now - S.lastRoll > 3 * 3600000) && workouts.length) {
      S.lastRoll = now;
      const rogue = G.hero && (G.hero().cls.primary === 'AGI' || G.hero().cls.secondary === 'AGI') ? 0.1 : 0;
      const obs = G.villagePerk && G.villagePerk('observatory') ? 0.25 : 0;
      if (Math.random() < 0.3 + rogue + obs && !window.__PULSE_TEST) S.shoot = { until: now + 3600000 };
      save();
    }
  }
  G.galaxyStatus = function () {
    const m = build(); const now = Date.now();
    return { stars: m.stars.length, shooting: S.shoot && S.shoot.until > now ? Math.ceil((S.shoot.until - now) / 60000) : 0, away: daysAway(m), hole: daysAway(m) >= 14, found: Object.keys(S.found).length };
  };
  G.galaxySpawnShootingStar = () => { S.shoot = { until: Date.now() + 3600000 }; save(); };

  // ---------------- renderer ----------------
  const views = new Set(); // active canvases {cv, cam, full}
  let raf = null; let bursts = []; let tl = null; let shootAnim = null;

  function camFit(v) { const m = build(); v.cam = { x: 0, y: 0, zoom: 1, scale: (Math.min(v.cv.width, v.cv.height) / 2) / (m.maxR + 50) }; }
  function toScreen(v, x, y) { const s = v.cam.scale * v.cam.zoom; return [v.cv.width / 2 + (x - v.cam.x) * s, v.cv.height / 2 + (y - v.cam.y) * s]; }
  function toWorld(v, sx, sy) { const s = v.cam.scale * v.cam.zoom; return [(sx - v.cv.width / 2) / s + v.cam.x, (sy - v.cv.height / 2) / s + v.cam.y]; }
  function hex2rgba(h, a) { h = h.replace('#', ''); return `rgba(${parseInt(h.substr(0, 2), 16)},${parseInt(h.substr(2, 2), 16)},${parseInt(h.substr(4, 2), 16)},${a})`; }

  function draw(v, t) {
    const m = build(); const ctx = v.ctx; const W = v.cv.width, Hh = v.cv.height; const dpr = v.dpr;
    const s = v.cam.scale * v.cam.zoom;
    ctx.fillStyle = '#03050a'; ctx.fillRect(0, 0, W, Hh);
    const tint = (G.eventTheme && G.eventTheme()) || { a: '#5a3fbf', b: '#1f6fbf' };
    // nebulae
    const nr = rng('neb');
    for (let i = 0; i < 4; i++) {
      const a = nr() * TAU, d = nr() * m.maxR * 0.7, R = (m.maxR * (0.5 + nr() * 0.6)) * s;
      const [x, y] = toScreen(v, Math.cos(a) * d, Math.sin(a) * d);
      const g = ctx.createRadialGradient(x, y, 0, x, y, R);
      g.addColorStop(0, hex2rgba(i % 2 ? tint.a : tint.b, 0.13)); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(x - R, y - R, R * 2, R * 2);
    }
    // dust
    const dr = rng('dust');
    for (let i = 0; i < 260; i++) {
      const a = dr() * TAU, d = Math.sqrt(dr()) * (m.maxR + 80); const [x, y] = toScreen(v, Math.cos(a) * d, Math.sin(a) * d);
      ctx.fillStyle = `rgba(200,210,255,${0.12 + 0.2 * Math.abs(Math.sin(t / 900 + i))})`; ctx.fillRect(x, y, dpr, dpr);
    }
    const visibleN = tl ? Math.floor(m.stars.length * Math.min(1, (t - tl.t0) / tl.dur)) : m.stars.length;
    const tlDate = tl && visibleN ? m.stars[Math.max(0, visibleN - 1)].k : null;
    const shownDay = (k) => !tl || (tlDate && k <= tlDate);
    // dark gaps
    m.gaps.forEach((g) => { const [x, y] = toScreen(v, g.x, g.y); const R = g.r * s; const gr = ctx.createRadialGradient(x, y, 0, x, y, R); gr.addColorStop(0, 'rgba(0,0,0,.75)'); gr.addColorStop(0.7, 'rgba(40,10,60,.25)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = gr; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill(); });
    // core
    { const [x, y] = toScreen(v, 0, 0); const R = 34 * s + 10 * dpr; const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, 'rgba(255,240,210,.9)'); g.addColorStop(0.25, 'rgba(255,200,140,.35)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill(); }
    // planets, moons, ringed planets
    if (m.stars.length && !tl) {
      let regions = 0; try { const ws = JSON.parse(localStorage.getItem('pulse-world-v1') || '{}'); regions = Object.values(ws.region || {}).filter((r) => r.done).length; } catch (e) {}
      const planets = 1 + Math.floor(workouts.length / 100);
      const ringed = (G._plank ? G._plank.state().completed || 0 : 0);
      for (let i = 0; i < planets + ringed; i++) {
        const pr = rng('planet' + i); const orbit = 34 + i * 13; const ang = pr() * TAU + t / (9000 + i * 3000);
        const [ox, oy] = toScreen(v, 0, 0); ctx.strokeStyle = 'rgba(255,255,255,.05)'; ctx.lineWidth = dpr; ctx.beginPath(); ctx.arc(ox, oy, orbit * s, 0, TAU); ctx.stroke();
        const [x, y] = toScreen(v, Math.cos(ang) * orbit, Math.sin(ang) * orbit);
        const R = (i === 0 ? 4.5 : 3.5) * s + 2 * dpr; const hue = Math.floor(pr() * 360);
        const g = ctx.createRadialGradient(x - R / 3, y - R / 3, 0, x, y, R); g.addColorStop(0, `hsl(${hue},70%,72%)`); g.addColorStop(1, `hsl(${hue},60%,30%)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill();
        if (i >= planets) { ctx.strokeStyle = 'rgba(245,197,66,.8)'; ctx.lineWidth = 1.5 * dpr; ctx.beginPath(); ctx.ellipse(x, y, R * 2, R * 0.6, -0.4, 0, TAU); ctx.stroke(); }
        if (i === 0) for (let j = 0; j < regions; j++) { const ma = t / (1500 + j * 400) + j; const mr = R + (5 + j * 3) * dpr; ctx.fillStyle = '#d6dbe3'; ctx.beginPath(); ctx.arc(x + Math.cos(ma) * mr, y + Math.sin(ma) * mr, 1.4 * dpr, 0, TAU); ctx.fill(); }
      }
    }
    // streak lines
    ctx.lineWidth = dpr;
    for (let i = 1; i < m.dates.length; i++) {
      if (!shownDay(m.dates[i])) break;
      if (between(m.dates[i - 1], m.dates[i]) !== 1) continue;
      const a = m.days[m.dates[i - 1]], b = m.days[m.dates[i]];
      if (a.arm !== b.arm) continue; const [x1, y1] = toScreen(v, a.x, a.y), [x2, y2] = toScreen(v, b.x, b.y);
      ctx.strokeStyle = 'rgba(160,190,255,.16)'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    }
    // weekly constellations
    m.weeks.forEach((c) => {
      if (!shownDay(c.pts[c.pts.length - 1].k)) return;
      ctx.strokeStyle = hex2rgba(c.col, 0.45); ctx.lineWidth = 1.3 * dpr; ctx.beginPath();
      c.pts.forEach((p, i) => { const [x, y] = toScreen(v, p.x, p.y); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
    });
    // plank challenge crowns
    (m.plankRuns || []).forEach((pts) => { if (pts.length < 2) return; ctx.strokeStyle = 'rgba(245,197,66,.85)'; ctx.lineWidth = 2 * dpr; ctx.shadowColor = '#f5c542'; ctx.shadowBlur = 10 * dpr; ctx.beginPath(); pts.forEach((p, i) => { if (!p) return; const [x, y] = toScreen(v, p.x, p.y); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); ctx.shadowBlur = 0; });
    // black hole
    const away = daysAway(m); const hole = away >= 14 && !tl ? (() => { const last = m.days[m.lastDate]; const t2 = last.t + 10; const th = t2 * (TAU / 120); const rad = 26 + 9 * Math.pow(t2, 0.72) + 20; return { x: Math.cos(th) * rad, y: Math.sin(th) * rad, s: Math.min(1, 0.3 + (away - 14) / 16) }; })() : null;
    const recentCut = m.lastDate ? dateKey(new Date(toDate(m.lastDate).getTime() - 30 * dayMs)) : '';
    // PR nebula halos
    m.stars.forEach((st, i) => {
      if (i >= visibleN || !st.pr) return;
      const [x, y] = toScreen(v, st.x, st.y); const R = (12 + st.size * 2) * s + 6 * dpr;
      const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, hex2rgba(st.col, 0.35)); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill();
    });
    // sunrise halos
    m.sunrise.forEach((d) => { if (!shownDay(d.k)) return; const [x, y] = toScreen(v, d.x, d.y); const R = 22 * s + 8 * dpr; const g = ctx.createRadialGradient(x, y, 0, x, y, R); g.addColorStop(0, 'rgba(255,170,80,.45)'); g.addColorStop(1, 'rgba(255,120,40,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill(); });
    // stars
    for (let i = 0; i < visibleN; i++) {
      const st = m.stars[i];
      let wx = st.x, wy = st.y, dim = 1;
      if (hole && st.k >= recentCut) { const dx = hole.x - wx, dy = hole.y - wy; const d = Math.hypot(dx, dy); const f = hole.s * 0.45 * Math.exp(-d / 220); wx += dx * f; wy += dy * f; dim = 1 - hole.s * 0.5; }
      const [x, y] = toScreen(v, wx, wy);
      if (x < -20 || y < -20 || x > W + 20 || y > Hh + 20) continue;
      const tw = 0.75 + 0.25 * Math.sin(t / 600 + st.tw);
      const R = (st.size * (0.6 + 0.4 * v.cam.zoom)) * dpr * (st.pr ? 1.6 : 1);
      const a = st.bright * tw * dim;
      if (st.bin) {
        const ang = t / 500 + st.tw; const o = 2.2 * dpr;
        [[1, 0], [-1, 0]].forEach(([sx]) => { ctx.fillStyle = hex2rgba(st.col, a); ctx.beginPath(); ctx.arc(x + Math.cos(ang) * o * sx, y + Math.sin(ang) * o * sx, R * 0.7, 0, TAU); ctx.fill(); });
        continue;
      }
      const col = st.gold ? '#ffd76a' : st.col;
      ctx.shadowColor = col; ctx.shadowBlur = (st.pr ? 14 : 6) * dpr;
      ctx.fillStyle = hex2rgba(col, a); ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill();
      ctx.shadowBlur = 0;
      if (st.gold || st.pr) { ctx.strokeStyle = hex2rgba(st.gold ? '#fff3c4' : '#ffffff', 0.7 * tw); ctx.lineWidth = dpr * 0.8; const L = R * 2.6; ctx.beginPath(); ctx.moveTo(x - L, y); ctx.lineTo(x + L, y); ctx.moveTo(x, y - L); ctx.lineTo(x, y + L); ctx.stroke(); }
    }
    if (tl) {
      const st = m.stars[Math.max(0, visibleN - 1)];
      if (st && visibleN > (tl.lastN || 0)) { tl.lastN = visibleN; if (t - (tl.lastSnd || 0) > 70) { tl.lastSnd = t; try { initAudio(); playNote(300 + ({ legs: 0, chest: 2, core: 4, cardio: 7, arms: 9, back: 11 }[st.cat] || 5) * 60, 0.08, audioCtx.currentTime, { gain: 0.05 }); } catch (e) {} } }
      ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.font = `800 ${14 * dpr}px ui-monospace,Menlo,monospace`; ctx.textAlign = 'left';
      if (tlDate) ctx.fillText(toDate(tlDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }), 14 * dpr, Hh - 16 * dpr);
      if (t - tl.t0 > tl.dur + 600) { const done = tl.onDone; tl = null; done && done(); }
    }
    // black hole draw
    if (hole) {
      const [x, y] = toScreen(v, hole.x, hole.y); const R = (10 + 18 * hole.s) * s + 6 * dpr;
      const g = ctx.createRadialGradient(x, y, R * 0.6, x, y, R * 2.6); g.addColorStop(0, 'rgba(255,140,60,.55)'); g.addColorStop(0.4, 'rgba(160,60,200,.25)'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R * 2.6, 0, TAU); ctx.fill();
      ctx.save(); ctx.translate(x, y); ctx.rotate(t / 900); ctx.strokeStyle = 'rgba(255,190,120,.7)'; ctx.lineWidth = 2 * dpr; ctx.beginPath(); ctx.ellipse(0, 0, R * 1.7, R * 0.55, 0, 0, TAU); ctx.stroke(); ctx.restore();
      ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.fill();
    }
    // black hole collapse flash
    if (S.holeCollapse && Date.now() - S.holeCollapse < 4000) { const k = (Date.now() - S.holeCollapse) / 4000; ctx.fillStyle = `rgba(255,255,255,${0.25 * (1 - k)})`; ctx.fillRect(0, 0, W, Hh); }
    // supernova bursts
    bursts = bursts.filter((b) => t - b.t0 < 1800);
    bursts.forEach((b) => { if (t < b.t0) return; const k = (t - b.t0) / 1800; const [x, y] = toScreen(v, b.x, b.y); const R = (8 + 70 * k) * dpr; ctx.strokeStyle = hex2rgba(b.col, 1 - k); ctx.lineWidth = 3 * dpr * (1 - k); ctx.beginPath(); ctx.arc(x, y, R, 0, TAU); ctx.stroke(); ctx.fillStyle = `rgba(255,255,255,${(1 - k) * 0.8})`; ctx.beginPath(); ctx.arc(x, y, 6 * dpr * (1 - k), 0, TAU); ctx.fill(); });
    // shooting star
    if (S.shoot && S.shoot.until > Date.now() && !tl) {
      if (!shootAnim || t - shootAnim.t0 > 5200) { const r = Math.random; const fromLeft = r() < 0.5; shootAnim = { t0: t, x0: fromLeft ? -0.1 : 1.1, y0: 0.1 + r() * 0.4, x1: fromLeft ? 1.1 : -0.1, y1: 0.4 + r() * 0.5 }; }
      const k = (t - shootAnim.t0) / 1400;
      if (k <= 1) {
        const hx = (shootAnim.x0 + (shootAnim.x1 - shootAnim.x0) * k) * W, hy = (shootAnim.y0 + (shootAnim.y1 - shootAnim.y0) * k) * Hh;
        const tx = hx - (shootAnim.x1 - shootAnim.x0) * W * 0.12, ty = hy - (shootAnim.y1 - shootAnim.y0) * Hh * 0.12;
        const g = ctx.createLinearGradient(tx, ty, hx, hy); g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(255,255,255,.95)');
        ctx.strokeStyle = g; ctx.lineWidth = 3 * dpr; ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(hx, hy); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.shadowColor = '#bfe6ff'; ctx.shadowBlur = 16 * dpr; ctx.beginPath(); ctx.arc(hx, hy, 3.5 * dpr, 0, TAU); ctx.fill(); ctx.shadowBlur = 0;
        v.shootHead = [hx, hy];
      } else v.shootHead = null;
    } else v.shootHead = null;
    // labels
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    if (m.stars.length) { const [x, y] = toScreen(v, 0, 0); ctx.fillStyle = 'rgba(255,240,210,.7)'; ctx.font = `700 ${10 * dpr}px ui-monospace,Menlo,monospace`; ctx.fillText('ORIGIN', x, y + 16 * dpr); }
    if (v.cam.zoom >= 1.5) {
      ctx.font = `700 ${10 * dpr}px system-ui`; m.weeks.forEach((c) => { if (!shownDay(c.pts[c.pts.length - 1].k)) return; const [x, y] = toScreen(v, c.cx, c.cy); ctx.fillStyle = hex2rgba(c.col, 0.85); ctx.fillText(c.name, x, y - 14 * dpr); });
    }
    // month markers
    ctx.font = `600 ${9 * dpr}px ui-monospace,Menlo,monospace`; let lastMonth = '';
    m.dates.forEach((k) => { if (!shownDay(k)) return; const mo = k.slice(0, 7); if (mo === lastMonth) return; lastMonth = mo; const d = m.days[k]; const [x, y] = toScreen(v, d.x * 1.12, d.y * 1.12); ctx.fillStyle = 'rgba(160,170,190,.45)'; ctx.fillText(toDate(k).toLocaleDateString(undefined, { month: 'short' }).toUpperCase(), x, y); });
    if (!m.stars.length) { ctx.fillStyle = 'rgba(255,255,255,.6)'; ctx.font = `700 ${13 * dpr}px system-ui`; ctx.fillText('Log a workout to light your first star ✨', W / 2, Hh / 2 + 40 * dpr); }
  }

  function loop(t) {
    views.forEach((v) => { if (!document.body.contains(v.cv)) views.delete(v); });
    if (!views.size) { raf = null; return; }
    views.forEach((v) => draw(v, t));
    raf = requestAnimationFrame(loop);
  }
  function addView(cv, full) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = cv.getBoundingClientRect();
    cv.width = Math.max(200, rect.width * dpr); cv.height = Math.max(200, rect.height * dpr);
    const v = { cv, ctx: cv.getContext('2d'), dpr, full }; camFit(v); views.add(v);
    if (!raf) raf = requestAnimationFrame(loop);
    attachInput(v);
    // newly earned PRs go supernova the first time you see them
    const m = build(); const seen = new Set(S.seenPR || []);
    m.stars.filter((s) => s.pr && !seen.has(s.w.id)).forEach((s, i) => { bursts.push({ x: s.x, y: s.y, col: s.col, t0: performance.now() + i * 250 }); seen.add(s.w.id); });
    if (bursts.length) { S.seenPR = [...seen]; save(); G.sfx && G.sfx('rare'); }
    return v;
  }

  function attachInput(v) {
    const pts = new Map(); let start = null, pinch = null;
    const cv = v.cv; cv.style.touchAction = 'none';
    const pos = (e) => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * v.dpr, (e.clientY - r.top) * v.dpr]; };
    cv.addEventListener('pointerdown', (e) => { cv.setPointerCapture(e.pointerId); pts.set(e.pointerId, pos(e)); if (pts.size === 1) start = { p: pos(e), t: Date.now(), cam: { ...v.cam }, moved: false }; if (pts.size === 2) { const [a, b] = [...pts.values()]; pinch = { d: Math.hypot(a[0] - b[0], a[1] - b[1]), zoom: v.cam.zoom }; } });
    cv.addEventListener('pointermove', (e) => {
      if (!pts.has(e.pointerId)) return; pts.set(e.pointerId, pos(e));
      if (pts.size === 2 && pinch) { const [a, b] = [...pts.values()]; const d = Math.hypot(a[0] - b[0], a[1] - b[1]); v.cam.zoom = Math.max(0.6, Math.min(8, pinch.zoom * d / pinch.d)); if (start) start.moved = true; }
      else if (pts.size === 1 && start && v.full) { const p = pos(e); const dx = p[0] - start.p[0], dy = p[1] - start.p[1]; if (Math.hypot(dx, dy) > 8 * v.dpr) start.moved = true; const s = v.cam.scale * v.cam.zoom; v.cam.x = start.cam.x - dx / s; v.cam.y = start.cam.y - dy / s; }
    });
    const end = (e) => {
      if (!pts.has(e.pointerId)) return; const p = pos(e); pts.delete(e.pointerId);
      if (pts.size < 2) pinch = null;
      if (start && !start.moved && Date.now() - start.t < 400 && pts.size === 0) tapAt(v, p);
      if (pts.size === 0) start = null;
    };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    cv.addEventListener('wheel', (e) => { if (!v.full) return; e.preventDefault(); v.cam.zoom = Math.max(0.6, Math.min(8, v.cam.zoom * (e.deltaY < 0 ? 1.15 : 0.87))); }, { passive: false });
  }

  function tapAt(v, p) {
    if (v.shootHead && Math.hypot(p[0] - v.shootHead[0], p[1] - v.shootHead[1]) < 60 * v.dpr) { catchShootingStar(p, v); return; }
    if (!v.full) { openFull(); return; }
    const m = build(); let best = null, bd = 26 * v.dpr;
    Object.values(m.days).forEach((d) => { const [x, y] = toScreen(v, d.x, d.y); const dd = Math.hypot(x - p[0], y - p[1]); if (dd < bd) { bd = dd; best = d; } });
    if (best) daySheet(best);
  }
  function catchShootingStar(p, v) {
    S.shoot = null; save();
    const r = v.cv.getBoundingClientRect(); const x = r.left + p[0] / v.dpr, y = r.top + p[1] / v.dpr;
    G.sparks && G.sparks(x, y, '#bfe6ff', 50); G.sfx && G.sfx('rare'); if (typeof haptic === 'function') haptic('success');
    const item = G.rollDrop ? G.rollDrop([20, 35, 25, 13, 5, 1.6, 0.35, 0.05]).id : null;
    G.reward && G.reward({ coins: 200, items: item ? [item] : [] }, { label: '🌠 You caught a shooting star!' });
    G.renderHero && G.renderHero();
  }
  function daySheet(d) {
    const wk = model.weeks.find((c) => c.pts.includes(d));
    const html = `<div class="cz-title" style="text-align:left">✨ ${toDate(d.k).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div>
      ${wk ? `<div class="muted">Part of the constellation <b style="color:${wk.col}">${esc(wk.name)}</b></div>` : ''}
      <div class="gx-day">${d.list.map((w) => `<div class="cs-item"><span>${icon(w.exercise)} ${esc(w.exercise)}${w.isPR ? ' 🏆' : ''}${w.circuit ? ' 🔁' : ''}${w.plankChallenge ? ' 🧱' : ''}</span><b>${(w.sets || 1) > 1 ? w.sets + '×' : ''}${w.amount} ${w.unit}</b></div>`).join('')}</div>`;
    G.sheet(html);
  }

  // ---------------- fullscreen & timelapse ----------------
  function openFull(withTimelapse) {
    let el = document.getElementById('galaxyFull'); if (el) el.remove();
    el = document.createElement('div'); el.id = 'galaxyFull'; el.className = 'gx-full';
    el.innerHTML = `<canvas id="gxFullCv"></canvas>
      <div class="gx-ctl"><button id="gxClose">✕</button><button id="gxTl">▶ Timelapse</button><button id="gxFit">⟲</button><button id="gxIn">＋</button><button id="gxOut">－</button></div>
      <div class="gx-hint">Pinch to zoom · drag to pan · tap a star to see that day</div><div class="gx-save" id="gxSave"></div>`;
    document.body.appendChild(el);
    const v = addView(el.querySelector('#gxFullCv'), true);
    el.querySelector('#gxClose').onclick = () => { el.remove(); };
    el.querySelector('#gxFit').onclick = () => camFit(v);
    el.querySelector('#gxIn').onclick = () => (v.cam.zoom = Math.min(8, v.cam.zoom * 1.3));
    el.querySelector('#gxOut').onclick = () => (v.cam.zoom = Math.max(0.6, v.cam.zoom / 1.3));
    el.querySelector('#gxTl').onclick = () => timelapse(v, el);
    if (withTimelapse) timelapse(v, el);
  }
  G.openGalaxy = openFull;
  function timelapse(v, el) {
    camFit(v); v.cam.zoom = 2.4;
    const z0 = performance.now();
    const zoomOut = () => { const k = Math.min(1, (performance.now() - z0) / 20000); v.cam.zoom = 2.4 - 1.4 * (1 - Math.pow(1 - k, 2)); if (k < 1 && tl) requestAnimationFrame(zoomOut); };
    tl = { t0: performance.now(), dur: 20000, onDone: () => { v.cam.zoom = 1; showSave(v, el); } };
    requestAnimationFrame(zoomOut);
    const sv = el.querySelector('#gxSave'); sv.innerHTML = '<button id="gxSkip" class="gbtn ghost sm">Skip ⏭</button>';
    sv.querySelector('#gxSkip').onclick = () => { if (tl) tl.t0 -= 60000; };
  }
  function showSave(v, el) {
    const sv = el.querySelector('#gxSave'); if (!sv) return;
    sv.innerHTML = '<button id="gxSaveBtn" class="gbtn sm">📸 Save image</button>';
    sv.querySelector('#gxSaveBtn').onclick = () => {
      v.cv.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], 'my-pulse-galaxy.png', { type: 'image/png' });
        try { if (navigator.canShare && navigator.canShare({ files: [file] })) { await navigator.share({ files: [file], title: 'My Pulse galaxy' }); return; } } catch (e) {}
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = file.name; a.click(); showToast('📸 Galaxy saved');
      }, 'image/png');
    };
  }

  // ---------------- panel in Hero › Galaxy ----------------
  G.renderGalaxy = function (root) {
    if (!root) return;
    const m = build(); const st = G.galaxyStatus();
    const supernovas = m.stars.filter((s) => s.pr).length;
    const planets = (m.stars.length ? 1 : 0) + Math.floor(workouts.length / 100) + (G._plank ? G._plank.state().completed || 0 : 0);
    root.innerHTML = `
      ${st.shooting ? `<div class="gx-alert shoot">🌠 A shooting star is crossing your galaxy — tap it within <b>${st.shooting} min</b> for loot!</div>` : ''}
      ${st.hole ? `<div class="gx-alert hole">⚫ A black hole is forming after ${st.away} days away and pulling in your recent stars. Train to push it back.</div>` : ''}
      <div class="card gx-card"><canvas id="gxCv" class="gx-cv"></canvas>
        <div class="gx-stats"><span>⭐ <b>${m.stars.length}</b> stars</span><span>✨ <b>${m.weeks.length}</b> constellations</span><span>💥 <b>${supernovas}</b> supernovas</span><span>🪐 <b>${planets}</b> planets</span></div>
        <div class="row2"><button class="gbtn" id="gxOpen">⛶ Explore</button><button class="gbtn ghost" id="gxTimelapse">▶ Timelapse</button></div></div>
      <div class="card"><div class="cardhead"><h2>🔭 Hidden constellations</h2><span class="muted">${Object.keys(S.found).length}/${HIDDEN.length}</span></div>
        <div class="traits">${HIDDEN.map(([id, name, icon, how]) => `<div class="trait ${S.found[id] ? 'on' : ''}"><span>${S.found[id] ? icon : '❔'}</span><div><b>${S.found[id] ? name : '???'}</b><div class="muted">${how}</div></div></div>`).join('')}</div></div>
      <div class="card"><div class="cardhead"><h2>🗺️ Star chart</h2></div><div class="gx-legend">
        ${Object.entries(CAT_COL).filter(([k]) => k !== 'custom').map(([k, c]) => `<span><i style="background:${c}"></i>${k}</span>`).join('')}
        <span>💥 PR supernova</span><span>⚭ circuit binary</span><span>🟡 plank day</span><span>🌑 gap</span><span>🌅 comeback</span><span>🪐 every 100 workouts</span><span>💍 finished challenge</span><span>🌙 conquered region</span></div>
        <div class="muted" style="margin-top:8px">Bigger stars = more volume · brighter = harder effort · finished weeks with 3+ days become named constellations.</div></div>`;
    addView(root.querySelector('#gxCv'), false);
    root.querySelector('#gxOpen').onclick = () => openFull();
    root.querySelector('#gxTimelapse').onclick = () => openFull(true);
  };

  G.on && G.on('render', () => { try { globalChecks(); } catch (e) { console.warn('galaxy', e); } });
  try { globalChecks(); } catch (e) { console.warn('galaxy', e); }
  G._galaxy = { build, state: () => S, checkHidden };
})();
