/* Pulse — 30-Day Plank Challenge.
   10 minutes a day for 30 days in a row. Tap +1 for each minute done.
   Miss a day and it resets to Day 1. Minutes past 10 earn bonus loot. */
(function () {
  const G = (window.G = window.G || {});
  const PKEY = 'pulse-plank-v1';
  const TARGET = 10, DAYS = 30, BONUS_CAP = 20; // bonus pays out for up to 20 extra minutes a day
  let P;
  try { P = JSON.parse(localStorage.getItem(PKEY) || 'null'); } catch (e) { P = null; }
  if (!P) P = { active: false, start: null, days: {}, paid: {}, best: 0, attempts: 0, completed: 0, msg: null };
  const save = () => localStorage.setItem(PKEY, JSON.stringify(P));
  let nowOverride = null; // for tests
  const now = () => nowOverride ? new Date(nowOverride) : new Date();
  const dk = (d) => dateKey(d);
  const addDays = (k, n) => { const [y, m, d] = k.split('-').map(Number); const x = new Date(y, m - 1, d); x.setDate(x.getDate() + n); return dk(x); };
  const diffDays = (a, b) => { const [y1, m1, d1] = a.split('-').map(Number); const [y2, m2, d2] = b.split('-').map(Number); return Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / 86400000); };

  G.registerItems && G.registerItems([
    { id: 'title_coresteel', name: 'Core of Steel', icon: '🏷️', tier: 5, type: 'title', special: true, desc: 'Finished the 30-Day Plank Challenge' },
    { id: 'iron_core_belt', name: 'Iron Core Belt', icon: '🎗️', tier: 5, type: 'gear', slot: 'amulet', stats: { xp: 30, power: 20, luck: 10 }, special: true, desc: '30 days. 300 minutes. Unbreakable.' }
  ]);

  // Reset if any day between the start and yesterday fell short of 10 minutes
  function checkReset() {
    if (!P.active || !P.start) return;
    const today = dk(now());
    for (let k = P.start; k < today; k = addDays(k, 1)) {
      if ((P.days[k] || 0) < TARGET) {
        const reached = diffDays(P.start, k); // full days completed before the miss
        P.best = Math.max(P.best, reached);
        P.msg = { t: 'reset', reached, missed: k };
        P.start = today; P.days = {}; P.attempts++;
        save();
        if (typeof haptic === 'function') haptic('error');
        return;
      }
    }
  }

  function dayNum() { return P.start ? diffDays(P.start, dk(now())) + 1 : 0; }
  function todayMin() { return P.days[dk(now())] || 0; }

  function startChallenge() {
    P.active = true; P.start = dk(now()); P.days = {}; P.attempts++; P.msg = null; save();
    if (typeof haptic === 'function') haptic('heavy');
    G.sfx && G.sfx('win');
    render();
  }

  // Keep one Plank entry per day in the workout log, updated as you tap
  function syncWorkout(mins) {
    const today = dk(now());
    let w = workouts.find((x) => x.plankChallenge === today);
    if (!w && mins > 0) {
      w = { id: Date.now(), exercise: 'Plank', amount: mins, sets: 1, unit: 'minutes', date: today, time: new Date().toTimeString().slice(0, 5),
        isPR: false, feeling: '💪', notes: '🧱 30-Day Plank Challenge', weight: null, category: null, plankChallenge: today };
      workouts.push(w);
    } else if (w) {
      if (mins <= 0) workouts.splice(workouts.indexOf(w), 1);
      else w.amount = mins;
    }
    persist();
  }

  function tap(delta) {
    checkReset();
    if (!P.active) return;
    const today = dk(now());
    const before = todayMin();
    const after = Math.max(0, before + delta);
    if (after === before) return;
    P.days[today] = after;
    const paid = (P.paid[today] = P.paid[today] || { max: 0 });
    save();
    syncWorkout(after);

    if (delta > 0) {
      if (typeof haptic === 'function') haptic(after === TARGET ? 'levelup' : 'medium');
      const btn = document.getElementById('plankPlus');
      // rewards only for minutes not already paid today (so −1 then +1 can't farm)
      if (after > paid.max) {
        paid.max = after;
        const r = { coins: after <= TARGET ? 5 : after - TARGET <= BONUS_CAP ? 15 : 0, gems: 0, items: [] };
        let label = '🧱';
        if (after === TARGET) {
          const d = dayNum();
          r.coins += 50; label = `🧱 Day ${d} complete!`;
          if (d === 7) { r.gems += 3; r.items.push(G.rollItemOfTier(2).id); label = '🧱 One week of planks!'; }
          if (d === 14) { r.gems += 5; r.items.push(G.rollItemOfTier(3).id); label = '🧱 Two weeks strong!'; }
          if (d === 21) { r.gems += 8; r.items.push(G.rollItemOfTier(4).id); label = '🧱 Three weeks — nearly there!'; }
          if (d >= DAYS) {
            r.gems += 30; r.coins += 1500; r.items.push('title_coresteel', 'iron_core_belt');
            label = '🏆 30-DAY PLANK CHALLENGE COMPLETE!';
            P.completed++; P.best = Math.max(P.best, DAYS); P.active = false; P.msg = { t: 'done' };
            setTimeout(() => { G.fireworks && G.fireworks(8); G.goldenRain && G.goldenRain(); }, 300);
          } else { G.confetti && G.confetti(90); }
        }
        if (after === TARGET + 5) { r.gems += 1; label = '🔥 Overtime: 15 minutes!'; G.confetti && G.confetti(60); }
        if (after === TARGET + 10) { r.gems += 2; label = '🔥🔥 20 minutes — absolute unit!'; G.fireworks && G.fireworks(3); }
        save();
        if (r.coins || r.gems || r.items.length) {
          const quiet = !r.gems && !r.items.length && after !== TARGET;
          G.reward && G.reward(r, { label, el: btn, quiet });
          if (quiet) { G.coinBurst && G.coinBurst(btn, 2); G.sfx && G.sfx('coin'); }
        }
        if (after < TARGET) { const r2 = btn && btn.getBoundingClientRect(); if (r2) G.floatText && G.floatText(r2.left + r2.width / 2, r2.top, '+1 min', '#49e39a', 22); }
        else if (after > TARGET) { const r2 = btn && btn.getBoundingClientRect(); if (r2) G.floatText && G.floatText(r2.left + r2.width / 2, r2.top, 'BONUS +1', '#f5c542', 22); }
      } else { G.sfx && G.sfx('tick'); }
    } else { G.sfx && G.sfx('tick'); if (typeof haptic === 'function') haptic('light'); }
    render();
  }

  function render() {
    const el = document.getElementById('plankCard'); if (!el) return;
    checkReset();
    if (!P.active) {
      const done = P.msg && P.msg.t === 'done';
      el.innerHTML = `<div class="card plank-card"><div class="cardhead"><h2>🧱 30-Day Plank Challenge</h2>${P.completed ? `<span class="muted">Completed ${P.completed}×</span>` : ''}</div>
        <div class="pk-intro">${done ? '🏆 <b>You did it — 30 days straight!</b> Core of Steel is yours. Go again?' : '10 minutes of plank a day for 30 days. Split it up however you like — tap <b>+1</b> for every minute. <b>Miss a day and it resets.</b> Go past 10 for bonus loot.'}</div>
        <button class="gbtn" id="plankStart">${done ? '🔁 Start again' : '▶ Start the challenge'}</button></div>`;
      el.querySelector('#plankStart').onclick = startChallenge;
      return;
    }
    const d = Math.min(dayNum(), DAYS), m = todayMin(), today = dk(now());
    const pct = Math.min(1, m / TARGET), extra = Math.max(0, m - TARGET);
    const resetMsg = P.msg && P.msg.t === 'reset' ? `<div class="pk-reset">💔 You missed a day — back to Day 1. ${P.msg.reached ? `You reached ${P.msg.reached} day${P.msg.reached > 1 ? 's' : ''}.` : ''} <button id="pkDismiss">OK</button></div>` : '';
    const grid = Array.from({ length: DAYS }, (_, i) => {
      const k = addDays(P.start, i); const mins = P.days[k] || 0;
      const cls = k < today ? 'done' : k === today ? (mins >= TARGET ? 'done today' : 'today') : '';
      return `<span class="${cls}">${k < today || (k === today && mins >= TARGET) ? '🔥' : i + 1}</span>`;
    }).join('');
    el.innerHTML = `<div class="card plank-card ${m >= TARGET ? 'complete' : ''}"><div class="cardhead"><h2>🧱 30-Day Plank Challenge</h2><span class="muted">Best ${Math.max(P.best, d - (m >= TARGET ? 0 : 1))} days</span></div>
      ${resetMsg}
      <div class="pk-day">Day <b>${d}</b><span>/${DAYS}</span></div>
      <div class="pk-bar"><div class="pk-fill" style="width:${pct * 100}%"></div>${Array.from({ length: TARGET - 1 }, (_, i) => `<i style="left:${(i + 1) * 10}%"></i>`).join('')}</div>
      <div class="pk-mins"><b>${Math.min(m, TARGET)}</b> / ${TARGET} min today${extra ? ` <span class="pk-extra">+${extra} bonus</span>` : ''}</div>
      <div class="pk-status">${m >= TARGET ? (extra ? `🔥 Overtime! Every extra minute pays out${extra < 5 ? ' — 15 min = 💎' : extra < 10 ? ' — 20 min = 💎💎' : ''}` : '✅ Today\'s done! Keep going for bonus loot.') : `${TARGET - m} min to go — finish before midnight or it resets`}</div>
      <div class="pk-btns"><button class="pk-minus" id="plankMinus" ${m ? '' : 'disabled'}>−1</button><button class="pk-plus" id="plankPlus">+1 min</button></div>
      <div class="pk-grid">${grid}</div></div>`;
    el.querySelector('#plankPlus').onclick = () => tap(1);
    el.querySelector('#plankMinus').onclick = () => tap(-1);
    const dm = el.querySelector('#pkDismiss'); if (dm) dm.onclick = () => { P.msg = null; save(); render(); };
  }
  G.renderPlank = render;
  G.on && G.on('render', () => { try { render(); } catch (e) { console.warn('plank', e); } });
  render();
  // test hooks
  G._plank = { tap, setNow: (d) => { nowOverride = d; render(); }, state: () => P, start: startChallenge };
})();
