/* Pulse — Future You. Forecasts from your real pace: a milestone road with dates, two futures, ahead/behind schedule. */
(function () {
  const G = (window.G = window.G || {});
  const FKEY = 'pulse-future-v1';
  let F; try { F = JSON.parse(localStorage.getItem(FKEY) || 'null'); } catch (e) { F = null; }
  if (!F) F = {};
  F.base = F.base || {};
  const save = () => localStorage.setItem(FKEY, JSON.stringify(F));
  const DAY = 86400000;
  const today = () => dateKey(new Date());
  const addDays = (n) => dateKey(new Date(Date.now() + n * DAY));
  const fmtDate = (k) => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m - 1, d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: new Date().getFullYear() === y ? undefined : 'numeric' }); };
  const daysTo = (k) => { const [y, m, d] = k.split('-').map(Number); return Math.round((new Date(y, m - 1, d) - new Date(new Date().toDateString())) / DAY); };
  const nextOf = (arr, v) => arr.find((x) => x > v);

  function forecast() {
    const out = [];
    const now = Date.now(); const cut28 = dateKey(new Date(now - 27 * DAY));
    const recent = workouts.filter((w) => w.date >= cut28);
    if (!workouts.length) return out;
    const rate = (n) => n / 28; // per day over the last 4 weeks
    // 1) best single set, per exercise — linear trend over weekly bests (last 8 weeks)
    const weeks = {}; const cut56 = dateKey(new Date(now - 55 * DAY));
    workouts.filter((w) => w.unit === 'reps' && w.date >= cut56).forEach((w) => {
      const wk = Math.floor((new Date(w.date) - new Date(cut56)) / (7 * DAY));
      const k = w.exercise; weeks[k] = weeks[k] || {}; weeks[k][wk] = Math.max(weeks[k][wk] || 0, w.amount);
    });
    Object.entries(weeks).forEach(([ex, wk]) => {
      const pts = Object.entries(wk).map(([x, y]) => [Number(x), y]); if (pts.length < 3) return;
      const n = pts.length, sx = pts.reduce((a, p) => a + p[0], 0), sy = pts.reduce((a, p) => a + p[1], 0), sxy = pts.reduce((a, p) => a + p[0] * p[1], 0), sxx = pts.reduce((a, p) => a + p[0] * p[0], 0);
      const slope = (n * sxy - sx * sy) / Math.max(1e-6, n * sxx - sx * sx); if (slope <= 0.05) return;
      const best = Math.max(...workouts.filter((w) => w.exercise === ex && w.unit === 'reps').map((w) => w.amount));
      const goal = nextOf([10, 15, 20, 25, 30, 40, 50, 60, 75, 100, 150, 200], best); if (!goal) return;
      const days = Math.ceil(((goal - best) / slope) * 7);
      out.push({ id: 'set:' + ex + ':' + goal, icon: (typeof exMeta === 'function' && exMeta(ex) ? exMeta(ex).icon : '💪'), title: `${goal} ${ex} in one set`, days, cur: best, target: goal, how: `Your best set is ${best}, improving about ${slope.toFixed(1)} reps a week` });
    });
    // 2) skill level milestones
    try {
      const xpMap = getSkillXPMap(); const gain = {};
      recent.forEach((w) => (gain[w.exercise] = (gain[w.exercise] || 0) + xpForWorkout(w)));
      Object.entries(gain).sort((a, b) => b[1] - a[1]).slice(0, 4).forEach(([ex, g]) => {
        const xp = xpMap[ex] || 0; const lvl = getLevelFromXP(xp); const goal = nextOf([10, 20, 30, 40, 50, 60, 70, 80, 90, 99], lvl); if (!goal) return;
        const need = getXPForLevel(goal) - xp; const days = Math.ceil(need / Math.max(0.01, rate(g)));
        out.push({ id: 'lvl:' + ex + ':' + goal, icon: '⭐', title: `Level ${goal} ${ex}`, days, cur: lvl, target: goal, how: `Level ${lvl} now, earning ~${Math.round(rate(g) * 7)} XP a week in it` });
      });
    } catch (e) {}
    // 3) workouts, 4) lifetime reps, 5) training days → hero growth
    const wTarget = nextOf([25, 50, 100, 250, 500, 1000, 2000, 5000], workouts.length);
    if (wTarget && recent.length) out.push({ id: 'w:' + wTarget, icon: '📒', title: `${wTarget} workouts logged`, days: Math.ceil((wTarget - workouts.length) / rate(recent.length)), cur: workouts.length, target: wTarget, how: `${recent.length} logged in the last 4 weeks` });
    const reps = workouts.filter((w) => w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
    const r28 = recent.filter((w) => w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
    const rTarget = nextOf([1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000], reps);
    if (rTarget && r28) out.push({ id: 'r:' + rTarget, icon: '🔢', title: `${rTarget.toLocaleString()} lifetime reps`, days: Math.ceil((rTarget - reps) / rate(r28)), cur: reps, target: rTarget, how: `${r28.toLocaleString()} reps in the last 4 weeks` });
    const tDays = new Set(workouts.map((w) => w.date)).size; const d28 = new Set(recent.map((w) => w.date)).size;
    const g = G.heroGrowth && G.heroGrowth();
    if (g && g.next && d28) out.push({ id: 'grow:' + g.next.name, icon: g.next.icon, title: `Hero becomes a ${g.next.name}`, days: Math.ceil((g.next.at - tDays) / rate(d28)), cur: tDays, target: g.next.at, how: `${d28} training days in the last 4 weeks` });
    // 6) plank challenge, 7) habit tower
    try { const P = G._plank && G._plank.state(); if (P && P.active && P.start) { const d = Math.round((new Date(P.start) - new Date(today())) / DAY) + 29; out.push({ id: 'plank:' + P.start, icon: '🧱', title: 'Finish the 30-day plank challenge', days: Math.max(0, d), cur: 30 - Math.max(0, d), target: 30, how: 'If you don\'t miss a single day' }); } } catch (e) {}
    try { const t = G.towerStatus && G.towerStatus(); if (t && t.next) out.push({ id: 'tower:' + t.next.h, icon: '🗼', title: `Habit Tower reaches ${t.next.h} blocks (${t.next.name})`, days: (t.next.h - t.height) * 7 - ((new Date().getDay() + 6) % 7), cur: t.height, target: t.next.h, how: 'One block for every week you hit your goal' }); } catch (e) {}
    return out.filter((m) => m.days >= 0 && m.days <= 730).map((m) => Object.assign(m, { date: addDays(m.days) })).sort((a, b) => a.days - b.days);
  }
  G.forecast = forecast;

  function schedule(ms) {
    // baseline = the first date we ever predicted for each milestone; compare against it
    let changed = false;
    ms.forEach((m) => { if (!F.base[m.id]) { F.base[m.id] = m.date; changed = true; } m.delta = daysTo(F.base[m.id]) - m.days; });
    Object.keys(F.base).forEach((id) => { if (!ms.some((m) => m.id === id)) { delete F.base[id]; changed = true; } });
    if (changed) save();
    return ms;
  }

  G.futureLetter = function () {
    const ms = forecast().filter((m) => m.days <= 183).slice(0, 4);
    if (!ms.length) return null;
    const when = new Date(Date.now() + 183 * DAY).toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    return { subject: `A letter from ${when}`, body: [`I'm writing to you from ${when}. I know this sounds strange. Just listen.`,
      ...ms.map((m) => `On ${fmtDate(m.date)}, we hit "${m.title}". I remember it. You'll feel it.`),
      'None of it happened by luck. It happened because the version of us reading this kept showing up — on the good days and the "can\'t be bothered" days.',
      'So go train. I\'ll be waiting.'], gift: { gems: 3 } };
  };

  let raf = null;
  G.renderFuture = function (el) {
    if (!el) return;
    const ms = schedule(forecast());
    const recent = workouts.filter((w) => w.date >= dateKey(new Date(Date.now() - 27 * DAY)));
    const d28 = new Set(recent.map((w) => w.date)).size; const tDays = new Set(workouts.map((w) => w.date)).size;
    const proj = (n) => Math.round(n * 182 / 28);
    const repsR = recent.filter((w) => w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
    const g = G.heroGrowth ? G.heroGrowth() : { stage: 0 };
    let futStage = g.stage; if (G.HERO_STAGES) G.HERO_STAGES.forEach((s, i) => { if (tDays + proj(d28) >= s.at) futStage = i; });
    let lvl = 1; try { lvl = G.hero().level; } catch (e) {}
    const lvlF = Math.min(99, lvl + Math.round(d28 / 28 * 182 / 12));
    const towerH = G.towerStatus ? G.towerStatus().height : 0;
    el.innerHTML = `
      <div class="card"><div class="cardhead"><h2>🔮 Two futures</h2><span class="muted">6 months from now</span></div>
        <div class="futures">
          <div class="fut good"><div class="fut-h">If you keep going</div><canvas id="futGood" width="128" height="128"></canvas>
            <div class="fut-l"><b>${G.HERO_STAGES ? G.HERO_STAGES[futStage].icon + ' ' + G.HERO_STAGES[futStage].name : ''}</b><span>Hero Lv ~${lvlF}</span><span>+${proj(recent.length).toLocaleString()} workouts</span><span>+${proj(repsR).toLocaleString()} reps</span><span>🗼 ${towerH + 26} blocks</span></div></div>
          <div class="fut bad"><div class="fut-h">If you stop today</div><div class="fut-cvw"><canvas id="futBad" width="128" height="128"></canvas><span class="fut-dust">🕸️</span><span class="fut-sofa">🛋️</span></div>
            <div class="fut-l"><b>Frozen at Lv ${lvl}</b><span>⚫ Black hole eats your galaxy</span><span>🗼 Tower topples in 2 weeks</span><span>🏆 Rivals leave you behind</span><span>🥺 Your hero waits…</span></div></div>
        </div></div>
      <div class="card"><div class="cardhead"><h2>🛣️ Milestone road</h2><span class="muted">based on your last 4 weeks</span></div>
        ${ms.length ? `<div class="road">${ms.slice(0, 12).map((m, i) => `<div class="rd ${m.delta >= 2 ? 'ahead' : m.delta <= -2 ? 'behind' : ''}">
          <div class="rd-dot">${m.icon}</div><div class="rd-main"><div class="rd-t">${esc(m.title)}</div>
            <div class="rd-d"><b>${fmtDate(m.date)}</b> · ${m.days === 0 ? 'today!' : `in ${m.days} day${m.days === 1 ? '' : 's'}`}${m.delta >= 2 ? ` <span class="up">⏩ ${m.delta} days ahead of schedule</span>` : m.delta <= -2 ? ` <span class="down">⏪ ${-m.delta} days behind</span>` : ''}</div>
            <div class="rd-bar"><div style="width:${Math.min(100, (m.cur / m.target) * 100)}%"></div></div><div class="muted">${esc(m.how)}</div></div></div>`).join('')}</div>`
          : '<div class="empty">Train for a couple of weeks and your future starts to take shape here.</div>'}
        <div class="muted" style="margin-top:8px">Dates move as you train. Train more and watch them jump closer — you'll see "ahead of schedule" when they do.</div></div>
      <div class="card"><div class="cardhead"><h2>📅 12 months at this pace</h2></div>
        <div class="statbar"><div><b>${(recent.length * 13).toLocaleString()}</b><span>workouts</span></div><div><b>${(repsR * 13).toLocaleString()}</b><span>reps</span></div><div><b>${d28 * 13}</b><span>training days</span></div></div></div>`;
    const good = el.querySelector('#futGood'), bad = el.querySelector('#futBad');
    cancelAnimationFrame(raf);
    const loop = (t) => { if (!document.body.contains(good)) return; G.drawHero && G.drawHero(good, t, { stage: futStage }); G.drawHero && G.drawHero(bad, 0, { stage: g.stage }); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
  };
})();
