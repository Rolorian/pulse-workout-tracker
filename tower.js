/* Pulse — Habit Tower. One block for every week you hit your training-days goal.
   Miss a week and it wobbles; miss two in a row and it topples. Mortar can patch a missed week. */
(function () {
  const G = (window.G = window.G || {});
  const TKEY = 'pulse-tower-v1';
  let T; try { T = JSON.parse(localStorage.getItem(TKEY) || 'null'); } catch (e) { T = null; }
  if (!T) T = {};
  T.goals = T.goals || []; T.patched = T.patched || []; T.mortar = T.mortar == null ? 1 : T.mortar;
  const save = () => localStorage.setItem(TKEY, JSON.stringify(T));
  const DAY = 86400000;
  const weekOf = (k) => { const [y, m, d] = k.split('-').map(Number); const x = new Date(y, m - 1, d); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dateKey(x); };
  const addW = (k, n) => { const [y, m, d] = k.split('-').map(Number); const x = new Date(y, m - 1, d); x.setDate(x.getDate() + 7 * n); return dateKey(x); };
  const curWeek = () => weekOf(dateKey(new Date()));
  const CAT_COL = { legs: '#5aa8ff', chest: '#ff6b7a', core: '#f5c542', cardio: '#49e39a', arms: '#ff9f43', back: '#b48cff', custom: '#c9d3dd' };
  const MILESTONES = [{ h: 4, name: 'Flag', icon: '🚩', gems: 5 }, { h: 12, name: 'Lit windows', icon: '🪟', gems: 10 }, { h: 26, name: 'Turret', icon: '🏯', gems: 20 }, { h: 52, name: 'Beacon spire', icon: '🗼', gems: 50 }, { h: 104, name: 'Crown of Years', icon: '👑', gems: 100 }];

  if (!T.goals.length) T.goals.push({ from: '0000-00-00', goal: 3 });
  function goalFor(wk) { let g = 3; T.goals.forEach((x) => { if (x.from <= wk) g = x.goal; }); return g; }
  function setGoal(n) { const wk = curWeek(); T.goals = T.goals.filter((x) => x.from < wk); T.goals.push({ from: wk, goal: n }); save(); }

  function compute() {
    const days = {}; const cats = {};
    workouts.forEach((w) => { if (!w.date) return; const wk = weekOf(w.date); (days[wk] = days[wk] || new Set()).add(w.date); const c = getCategoryForExercise(w.exercise, w.category); cats[wk] = cats[wk] || {}; cats[wk][c] = (cats[wk][c] || 0) + 1; });
    const keys = Object.keys(days).sort(); const cw = curWeek();
    let blocks = [], miss = 0; const fallen = [];
    if (keys.length) {
      for (let wk = keys[0]; wk < cw; wk = addW(wk, 1)) {
        const n = days[wk] ? days[wk].size : 0; const goal = goalFor(wk); const patched = T.patched.includes(wk);
        if (n >= goal || patched) {
          const dom = cats[wk] ? Object.entries(cats[wk]).sort((a, b) => b[1] - a[1])[0][0] : 'custom';
          blocks.push({ wk, kind: patched && n < goal ? 'mortar' : n >= 7 ? 'crystal' : n > goal ? 'gold' : 'stone', col: CAT_COL[dom] || '#c9d3dd', days: n });
          miss = 0;
        } else {
          miss++;
          if (miss >= 2 && blocks.length) { fallen.push({ h: blocks.length, wk }); blocks = []; }
        }
      }
    }
    const thisN = days[cw] ? days[cw].size : 0;
    const lastWk = addW(cw, -1);
    const wobble = miss === 1 && blocks.length > 0;
    const next = MILESTONES.find((m) => m.h > blocks.length) || null;
    return { blocks, height: blocks.length, fallen, wobble, lastWk, thisN, goal: goalFor(cw), next, best: Math.max(blocks.length, ...fallen.map((f) => f.h), 0) };
  }
  G.towerStatus = compute;

  // detect new blocks / topples / milestones and reward them
  function events() {
    const c = compute();
    if (T.seenH == null) { T.seenH = c.height; T.seenFallen = c.fallen.length; save(); return; }
    if (c.fallen.length > (T.seenFallen || 0)) {
      const f = c.fallen[c.fallen.length - 1];
      T.seenFallen = c.fallen.length; T.seenH = c.height; save();
      setTimeout(() => { showToast(`💥 Your Habit Tower toppled after ${f.h} week${f.h === 1 ? '' : 's'}. Its rubble stays as a memorial — time to rebuild.`, null, null, 6000); G.sfx && G.sfx('break'); G.shake && G.shake(null, 10); }, 1200);
      return;
    }
    if (c.height > T.seenH) {
      const gained = c.height - T.seenH; T.seenH = c.height;
      const ms = MILESTONES.filter((m) => m.h <= c.height && !(T.ms || []).includes(m.h));
      T.ms = (T.ms || []).concat(ms.map((m) => m.h));
      if (c.height % 12 === 0) T.mortar++;
      save();
      setTimeout(() => {
        G.reward && G.reward({ coins: 100 * gained, gems: ms.reduce((a, m) => a + m.gems, 0) }, { label: `🧱 ${gained > 1 ? gained + ' new blocks' : 'A new block'} on your Habit Tower!` });
        ms.forEach((m) => { showToast(`${m.icon} Tower milestone: ${m.name} at ${m.h} blocks!`, null, null, 5000); G.fireworks && G.fireworks(4); });
        G.sfx && G.sfx('win');
      }, 1500);
    }
  }

  function useMortar() {
    const c = compute();
    if (!c.wobble) { showToast('Mortar is for patching a missed week while the tower wobbles'); return; }
    if (T.mortar <= 0) { showToast('No mortar — buy one for 10 💎 or earn one every 12 blocks'); return; }
    T.mortar--; T.patched.push(c.lastWk); save();
    G.sfx && G.sfx('hit'); setTimeout(() => G.sfx && G.sfx('win'), 300);
    showToast('🪣 Mortar applied — last week is patched and the tower is steady again.');
    render();
  }
  function buyMortar() { if (!G.canPay('gems', 10)) { showToast('Not enough 💎'); return; } G.pay('gems', 10); T.mortar++; save(); G.sfx && G.sfx('coin'); render(); }

  // ---------------- drawing ----------------
  function draw(cv, t) {
    const ctx = cv.getContext('2d'); const W = cv.width, H = cv.height; const dpr = W / cv.clientWidth || 2;
    const c = compute(); const hr = new Date().getHours(); const night = hr < 7 || hr >= 19;
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    if (night) { sky.addColorStop(0, '#060a1c'); sky.addColorStop(1, '#16203a'); } else { sky.addColorStop(0, '#3d7bd1'); sky.addColorStop(1, '#a9d4f5'); }
    ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
    if (night) for (let i = 0; i < 40; i++) { const r = G.seeded('tstar' + i); ctx.fillStyle = `rgba(255,255,255,${0.3 + 0.5 * Math.abs(Math.sin(t / 900 + i))})`; ctx.fillRect(r() * W, r() * H * 0.6, dpr, dpr); }
    // clouds
    for (let i = 0; i < 3; i++) { const r = G.seeded('cloud' + i); const x = ((r() * W + t / (40 + i * 20)) % (W + 120)) - 60; const y = H * (0.12 + i * 0.13); ctx.fillStyle = night ? 'rgba(120,140,180,.15)' : 'rgba(255,255,255,.75)'; [0, 18, 36].forEach((o, k) => { ctx.beginPath(); ctx.arc(x + o * dpr, y + (k === 1 ? -6 : 0) * dpr, (12 + (k === 1 ? 5 : 0)) * dpr, 0, 6.3); ctx.fill(); }); }
    const ground = H - 26 * dpr;
    ctx.fillStyle = night ? '#1d3323' : '#4c8a46'; ctx.fillRect(0, ground, W, H - ground);
    ctx.fillStyle = night ? '#16281b' : '#3f7a3b'; ctx.fillRect(0, ground, W, 3 * dpr);
    // rubble of fallen towers
    c.fallen.slice(-3).forEach((f, i) => { const x = (i % 2 ? W * 0.82 : W * 0.15) + (i > 1 ? 20 * dpr : 0); for (let k = 0; k < Math.min(8, 2 + f.h / 2); k++) { const r = G.seeded('rub' + f.wk + k); ctx.fillStyle = '#6b6f78'; ctx.fillRect(x + (r() - 0.5) * 30 * dpr, ground - (r() * 8 + 4) * dpr, (6 + r() * 6) * dpr, (5 + r() * 4) * dpr); } ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.font = `700 ${9 * dpr}px ui-monospace,monospace`; ctx.textAlign = 'center'; ctx.fillText(`${f.h}w`, x, ground + 14 * dpr); });
    // tower
    const n = c.height; const slots = Math.max(n + 1, 8);
    const bh = Math.min(22 * dpr, (ground - 40 * dpr) / slots); const bw = 74 * dpr; const cx = W / 2;
    ctx.save();
    if (c.wobble) { ctx.translate(cx, ground); ctx.rotate(Math.sin(t / 220) * 0.035); ctx.translate(-cx, -ground); }
    c.blocks.forEach((b, i) => {
      const r = G.seeded('blk' + b.wk); const off = (r() - 0.5) * 6 * dpr; const w = bw - Math.min(20 * dpr, i * 0.3 * dpr);
      const x = cx - w / 2 + off, y = ground - (i + 1) * bh;
      const base = b.kind === 'crystal' ? 'rgba(127,220,255,.85)' : b.kind === 'mortar' ? '#5b5f69' : '#8d929c';
      ctx.fillStyle = base; ctx.fillRect(x, y, w, bh - 1.5 * dpr);
      ctx.fillStyle = b.col; ctx.globalAlpha = b.kind === 'crystal' ? 0.25 : 0.32; ctx.fillRect(x, y, w, bh - 1.5 * dpr); ctx.globalAlpha = 1;
      ctx.strokeStyle = 'rgba(0,0,0,.25)'; ctx.lineWidth = dpr; ctx.beginPath(); ctx.moveTo(x + w * (0.33 + (i % 2) * 0.2), y); ctx.lineTo(x + w * (0.33 + (i % 2) * 0.2), y + bh - 1.5 * dpr); ctx.stroke();
      if (b.kind === 'gold') { ctx.fillStyle = '#f5c542'; ctx.fillRect(x, y, w, 2 * dpr); ctx.fillRect(x, y + bh - 3.5 * dpr, w, 2 * dpr); }
      if (b.kind === 'crystal' && Math.sin(t / 300 + i) > 0.92) { ctx.fillStyle = '#fff'; ctx.fillRect(x + w * r(), y + bh * 0.3, 2 * dpr, 2 * dpr); }
      if (b.kind === 'mortar') { ctx.strokeStyle = '#2b2d33'; ctx.beginPath(); ctx.moveTo(x + w * 0.6, y); ctx.lineTo(x + w * 0.5, y + bh * 0.5); ctx.lineTo(x + w * 0.65, y + bh); ctx.stroke(); }
      if (n >= 12 && i % 3 === 1) { ctx.fillStyle = night ? '#ffd76a' : '#33415a'; ctx.fillRect(cx - 4 * dpr + off, y + bh * 0.25, 8 * dpr, bh * 0.45); }
    });
    let topY = ground - n * bh;
    // this week's block under construction
    const frac = Math.min(1, c.thisN / c.goal);
    { const w = bw - Math.min(20 * dpr, n * 0.3 * dpr); const x = cx - w / 2, y = topY - bh;
      ctx.setLineDash([4 * dpr, 3 * dpr]); ctx.strokeStyle = 'rgba(255,255,255,.7)'; ctx.lineWidth = dpr; ctx.strokeRect(x, y, w, bh - 1.5 * dpr); ctx.setLineDash([]);
      ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.fillRect(x, y + (bh - 1.5 * dpr) * (1 - frac), w, (bh - 1.5 * dpr) * frac);
      ctx.strokeStyle = '#b08850'; ctx.lineWidth = 1.5 * dpr; ctx.beginPath(); ctx.moveTo(x - 6 * dpr, y + bh); ctx.lineTo(x - 6 * dpr, y - 4 * dpr); ctx.moveTo(x + w + 6 * dpr, y + bh); ctx.lineTo(x + w + 6 * dpr, y - 4 * dpr); ctx.moveTo(x - 6 * dpr, y + 2 * dpr); ctx.lineTo(x + w + 6 * dpr, y + 2 * dpr); ctx.stroke();
    }
    // crown decorations
    if (n >= 26) { ctx.fillStyle = '#7a3b3b'; ctx.beginPath(); ctx.moveTo(cx - 30 * dpr, topY); ctx.lineTo(cx, topY - 26 * dpr); ctx.lineTo(cx + 30 * dpr, topY); ctx.fill(); topY -= 26 * dpr; }
    if (n >= 52) { ctx.fillStyle = '#9aa4af'; ctx.fillRect(cx - 2 * dpr, topY - 26 * dpr, 4 * dpr, 26 * dpr); const a = t / 500; const g = ctx.createRadialGradient(cx, topY - 28 * dpr, 0, cx, topY - 28 * dpr, 60 * dpr); g.addColorStop(0, 'rgba(255,230,120,.9)'); g.addColorStop(1, 'rgba(255,230,120,0)'); ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx, topY - 28 * dpr); ctx.arc(cx, topY - 28 * dpr, 70 * dpr, a, a + 0.5); ctx.fill(); topY -= 26 * dpr; }
    if (n >= 4) { ctx.strokeStyle = '#ddd'; ctx.lineWidth = 1.5 * dpr; ctx.beginPath(); ctx.moveTo(cx, topY - bh); ctx.lineTo(cx, topY - bh - 22 * dpr); ctx.stroke(); ctx.fillStyle = '#ff6b7a'; const wv = Math.sin(t / 250) * 2 * dpr; ctx.beginPath(); ctx.moveTo(cx, topY - bh - 22 * dpr); ctx.lineTo(cx + 14 * dpr, topY - bh - 18 * dpr + wv); ctx.lineTo(cx, topY - bh - 13 * dpr); ctx.fill(); }
    ctx.restore();
    // labels
    ctx.fillStyle = night ? '#fff' : '#0b1016'; ctx.font = `900 ${13 * dpr}px ui-monospace,monospace`; ctx.textAlign = 'left';
    ctx.fillText(`${n} block${n === 1 ? '' : 's'}`, 10 * dpr, 20 * dpr);
    if (c.wobble) { ctx.fillStyle = '#ff6b7a'; ctx.fillText('⚠ WOBBLING', 10 * dpr, 38 * dpr); }
  }

  // ---------------- UI ----------------
  let raf = null;
  function render() {
    const el = document.getElementById('towerCard'); if (!el) return;
    const c = compute();
    el.innerHTML = `<div class="card tower-card ${c.wobble ? 'wobble' : ''}"><div class="cardhead"><h2>🗼 Habit Tower</h2><span class="muted">best ${c.best} · 🪣 ${T.mortar} mortar</span></div>
      <canvas id="towerCv" class="tower-cv"></canvas>
      <div class="tw-week"><b>This week: ${c.thisN}/${c.goal} days</b>${c.thisN >= c.goal ? ' ✓ block secured — it\'s placed on Monday' : ` · ${c.goal - c.thisN} more to place this week's block`}</div>
      ${c.wobble ? `<div class="tw-warn">⚠️ You missed last week's goal — the tower is wobbling. Hit ${c.goal} days this week or it topples! <button class="gbtn sm" id="twMortar">🪣 Use mortar (${T.mortar})</button></div>` : ''}
      <div class="tw-row"><span class="muted">Goal:</span>${[2, 3, 4, 5, 6, 7].map((g) => `<button class="chip ${g === c.goal ? 'on' : ''}" data-tg="${g}">${g}</button>`).join('')}<span class="muted">days/week</span></div>
      <div class="muted" style="margin-top:6px">${c.next ? `Next: ${c.next.icon} ${c.next.name} at ${c.next.h} blocks` : 'Your tower is legendary.'} · 7/7 weeks make crystal blocks, beating your goal makes gold ones. <button class="linkbtn" id="twBuy">Buy mortar (10 💎)</button></div></div>`;
    el.querySelectorAll('[data-tg]').forEach((b) => (b.onclick = () => { setGoal(Number(b.dataset.tg)); G.sfx && G.sfx('tick'); render(); }));
    const m = el.querySelector('#twMortar'); if (m) m.onclick = useMortar;
    el.querySelector('#twBuy').onclick = buyMortar;
    const cv = el.querySelector('#towerCv');
    const dpr = Math.min(window.devicePixelRatio || 1, 2); cv.width = cv.clientWidth * dpr || 600; cv.height = 240 * dpr;
    cancelAnimationFrame(raf);
    const loop = (t) => { if (!document.body.contains(cv)) return; if (document.getElementById('today').classList.contains('active')) draw(cv, t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
  }
  G.renderTower = render;
  G._tower = { state: () => T, compute, useMortar, setGoal };
  G.on && G.on('render', () => { try { events(); if (document.getElementById('today') && document.getElementById('today').classList.contains('active')) render(); } catch (e) { console.warn('tower', e); } });
  setTimeout(() => { try { events(); render(); } catch (e) {} }, 0);
})();
