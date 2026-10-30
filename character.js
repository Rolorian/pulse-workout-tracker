/* Pulse — Hero: character sheet, classes, talents, traits, weak points, pixel avatar. */
(function () {
  const G = (window.G = window.G || {});
  const HKEY = 'pulse-hero-v1';
  let H;
  try { H = JSON.parse(localStorage.getItem(HKEY) || 'null'); } catch (e) { H = null; }
  if (!H) H = {};
  H.name = H.name || 'Rolorian'; H.talents = H.talents || {}; H.traits = H.traits || {}; H.snap = H.snap || null;
  const save = () => localStorage.setItem(HKEY, JSON.stringify(H));
  G.heroState = () => H;

  const STATS = ['STR', 'END', 'AGI', 'CORE', 'CON', 'WIL'];
  const STAT_INFO = {
    STR: { name: 'Strength', icon: '💪', color: '#ff6b7a', from: 'press-ups, squats, pulls & presses' },
    END: { name: 'Endurance', icon: '🫀', color: '#49e39a', from: 'holds and cardio minutes' },
    AGI: { name: 'Agility', icon: '⚡', color: '#ffd23f', from: 'burpees, jumps & sprints' },
    CORE: { name: 'Core', icon: '🧱', color: '#ffb84d', from: 'core work and planks' },
    CON: { name: 'Consistency', icon: '📅', color: '#5aa8ff', from: 'how many days you train' },
    WIL: { name: 'Willpower', icon: '🔥', color: '#b48cff', from: 'overtime, challenges, early/late sessions, bosses' }
  };
  G.STAT_INFO = STAT_INFO;
  const AGI_EX = new Set(['Burpees', 'Jump squats', 'Jumping jacks', 'High knees', 'Skater jumps', 'Sprints', 'Mountain climbers', 'Bear crawl', 'Skipping']);
  const HOLD_EX = ['Plank', 'Wall sit', 'Side plank', 'Hollow hold'];
  G.isHold = (n) => HOLD_EX.includes(n);

  function profile(w) {
    const n = w.exercise;
    if (n === 'Wall sit') return { END: 0.6, STR: 0.4 };
    if (HOLD_EX.includes(n)) return { CORE: 0.6, END: 0.4 };
    if (AGI_EX.has(n)) return { AGI: 0.7, END: 0.3 };
    switch (getCategoryForExercise(n, w.category)) {
      case 'legs': return { STR: 0.7, END: 0.3 };
      case 'chest': case 'arms': return { STR: 1 };
      case 'back': return { STR: 0.8, CORE: 0.2 };
      case 'core': return { CORE: 0.85, END: 0.15 };
      case 'cardio': return { END: 0.85, AGI: 0.15 };
      default: return { STR: 0.4, END: 0.3, CORE: 0.3 };
    }
  }
  const clamp = (v) => Math.max(1, Math.min(99, Math.floor(v)));
  const lvlPts = (p) => clamp(Math.sqrt(p) * 0.7);
  const lvlCon = (d) => clamp(Math.sqrt(d) * 6);
  const lvlWil = (p) => clamp(Math.sqrt(p) * 1.2);

  // ---------------- classes ----------------
  const CLASSES = {
    STR: { name: 'Juggernaut', icon: '🛡️', color: '#ff6b7a', perk: { power: 15 }, desc: '+15% power' },
    END: { name: 'Ranger', icon: '🏹', color: '#49e39a', perk: { coin: 10 }, special: 'cardio', desc: 'Cardio deals 1.5× boss damage · +10% coins' },
    AGI: { name: 'Rogue', icon: '🗡️', color: '#ffd23f', perk: { luck: 20, crit: 5 }, desc: '+20% luck · +5% crit · more wandering encounters' },
    CORE: { name: 'Monk', icon: '🧘', color: '#ffb84d', perk: { xp: 10 }, special: 'holds', desc: 'Holds deal 2× boss damage · +10% XP' },
    CON: { name: 'Sentinel', icon: '🏰', color: '#5aa8ff', perk: { coin: 15, xp: 5 }, desc: '+15% coins · +5% XP' },
    WIL: { name: 'Berserker', icon: '🪓', color: '#b48cff', perk: { crit: 10, power: 10 }, desc: '+10% crit · +10% power' },
    paladin: { name: 'Paladin', icon: '⚜️', color: '#f5c542', perk: { power: 8, xp: 8, coin: 8, luck: 8 }, desc: 'Balanced: +8% power, XP, coins & luck' },
    titan: { name: 'Titan', icon: '⚡', color: '#ffffff', perk: { power: 15, xp: 15, coin: 15, luck: 15, crit: 5 }, desc: 'Mastery of everything: +15% to all' },
    wanderer: { name: 'Wanderer', icon: '🧭', color: '#9aa4af', perk: { xp: 25 }, desc: '+25% XP while you find your path' }
  };
  const PREFIX = { STR: 'Iron', END: 'Wild', AGI: 'Swift', CORE: 'Stone', CON: 'Steadfast', WIL: 'Blood' };
  G.CLASSES = CLASSES;

  function classFrom(vals) {
    const arr = STATS.map((s) => [s, vals[s]]).sort((a, b) => b[1] - a[1]);
    const avg = arr.reduce((a, x) => a + x[1], 0) / 6;
    if (avg < 8) return { id: 'wanderer', ...CLASSES.wanderer };
    if (arr[5][1] >= 60) return { id: 'titan', ...CLASSES.titan };
    if (arr[0][1] / Math.max(1, arr[5][1]) < 1.35) return { id: 'paladin', ...CLASSES.paladin };
    const p = arr[0][0]; const sec = arr[1][1] >= 0.85 * arr[0][1] ? arr[1][0] : null;
    const c = CLASSES[p];
    return { id: sec ? p + '+' + sec : p, primary: p, secondary: sec, name: (sec ? PREFIX[sec] + ' ' : '') + c.name, icon: c.icon, color: c.color,
      desc: c.desc + (sec ? ` · half of ${CLASSES[sec].name}: ${CLASSES[sec].desc.split(' · ')[0]}` : '') };
  }

  // ---------------- talents ----------------
  const TALENTS = {
    STR: [['heavy', 'Heavy Hands', '+3% power', 3, { power: 3 }], ['crush', 'Crushing Blow', '+2% crit', 3, { crit: 2 }], ['overpower', 'Overpower', 'Dungeon monsters −5% HP', 2], ['titan', 'Titan Grip', '+5% power', 1, { power: 5 }]],
    END: [['marathon', 'Marathon', '+4% coins', 3, { coin: 4 }], ['endure', 'Endurance', '+3% XP', 3, { xp: 3 }], ['secondwind', 'Second Wind', '+1 max heart in dungeons', 1], ['steady', 'Steady Pace', '+25% circuit coin bonus', 2]],
    AGI: [['quick', 'Quick Feet', '+4% luck', 3, { luck: 4 }], ['flurry', 'Flurry', '+2% crit', 3, { crit: 2 }], ['evasion', 'Evasion', 'First flee in each dungeon run is free', 1], ['scavenger', 'Scavenger', '+1 workout drop per day', 2]],
    CORE: [['stonecore', 'Stone Core', '+3% XP', 3, { xp: 3 }], ['plank', 'Plank Lord', 'Holds earn +10% XP', 2], ['unshake', 'Unshakeable', '+4% power', 2, { power: 4 }], ['ironbelly', 'Iron Belly', 'Plank challenge coins ×2', 1]],
    CON: [['habit', 'Habit', '+4% coins', 3, { coin: 4 }], ['ritual', 'Ritual', '+3% XP', 3, { xp: 3 }], ['guard', 'Streak Guard', 'A free Streak Shield every month', 1], ['grind', 'Daily Grind', '+500 daily training coin cap', 2]],
    WIL: [['grit', 'Grit', '+3% power', 3, { power: 3 }], ['fury', 'Fury', '+3% crit', 2, { crit: 3 }], ['laststand', 'Last Stand', '×1.5 damage on your last dungeon heart', 1], ['defiance', 'Defiance', '+5% luck', 3, { luck: 5 }]]
  };
  G.talent = (id) => H.talents[id] || 0;
  function treeSpent(stat) { return TALENTS[stat].reduce((a, t) => a + (H.talents[t[0]] || 0), 0); }
  function treePoints(stat, base) { return Math.floor(base[stat] / 10); }

  // ---------------- traits & weak points ----------------
  const TRAITS = [
    ['centurion', 'Centurion', '🏛️', '100 workouts logged', 'the Centurion', { power: 2, xp: 2, coin: 2 }],
    ['unbroken', 'Unbroken', '⛓️', 'A 14-day streak', 'the Unbroken', { coin: 3 }],
    ['plank_lord', 'Plank Lord', '🧱', '100 total minutes of plank', 'the Unbreakable', { xp: 3 }],
    ['burpee_fiend', 'Burpee Fiend', '🔥', '500 burpees', 'the Relentless', { crit: 3 }],
    ['dungeon_delver', 'Dungeon Delver', '🏰', '5 dungeon clears', 'the Delver', { luck: 5 }],
    ['circuit_breaker', 'Circuit Breaker', '🔁', '25 circuit rounds', 'the Tireless', { power: 3 }],
    ['iron_monday', 'Iron Monday', '📆', 'Trained 4 Mondays in a row', 'the Ironclad', { power: 3 }],
    ['comeback_kid', 'Comeback Kid', '🌅', 'Came back after 7+ days off', 'the Returned', { xp: 5 }],
    ['early_bird', 'Early Bird', '🌄', '5 workouts before 8am', 'the Dawnbringer', { xp: 3 }],
    ['night_owl', 'Night Owl', '🦉', '5 workouts after 9pm', 'the Nightstalker', { luck: 3 }],
    ['weekend_warrior', 'Weekend Warrior', '⚔️', 'Trained on 8 different weekends', 'the Unresting', { coin: 3 }],
    ['versatile', 'Versatile', '🎨', '20 different exercises', 'the Versatile', { luck: 3 }]
  ];
  const WEAK = [
    ['legs', 'Leg Day Dodger', '🦵', 'legs'], ['chest', 'Pancake Chest', '🥞', 'chest'], ['core', 'Jelly Core', '🍮', 'core'],
    ['upper', 'Noodle Arms', '🍜', 'arms or back'], ['cardio', 'Couch Lungs', '🛋️', 'cardio']
  ];

  function maxStreak(dates) {
    const s = [...dates].sort(); let best = 0, cur = 0, prev = null;
    s.forEach((d) => { if (prev) { const diff = Math.round((new Date(d) - new Date(prev)) / 86400000); cur = diff === 1 ? cur + 1 : 1; } else cur = 1; best = Math.max(best, cur); prev = d; });
    return best;
  }
  function traitChecks(ctx) {
    const W = workouts; const days = ctx.days;
    const reps = (n) => W.filter((w) => w.exercise === n && w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
    const plankMin = W.filter((w) => HOLD_EX.includes(w.exercise)).reduce((a, w) => a + (w.unit === 'minutes' ? w.amount : w.unit === 'seconds' ? w.amount / 60 : 0) * (w.sets || 1), 0);
    const sorted = [...days].sort();
    let gap7 = false; for (let i = 1; i < sorted.length; i++) if ((new Date(sorted[i]) - new Date(sorted[i - 1])) / 86400000 >= 8) gap7 = true;
    const mondays = sorted.filter((d) => new Date(d + 'T12:00').getDay() === 1);
    let monRun = 0, monBest = 0; mondays.forEach((d, i) => { monRun = i && (new Date(d) - new Date(mondays[i - 1])) / 86400000 === 7 ? monRun + 1 : 1; monBest = Math.max(monBest, monRun); });
    const weekends = new Set(sorted.filter((d) => [0, 6].includes(new Date(d + 'T12:00').getDay())).map((d) => { const x = new Date(d + 'T12:00'); if (x.getDay() === 0) x.setDate(x.getDate() - 1); return dateKey(x); }));
    const cs = G.circuitState ? G.circuitState().history.reduce((a, h) => a + h.rounds, 0) : 0;
    let clears = 0; try { const ws = JSON.parse(localStorage.getItem('pulse-world-v1') || '{}'); Object.values(ws.dungeons || {}).forEach((d) => (clears += d.clears || 0)); } catch (e) {}
    return {
      centurion: W.length >= 100, unbroken: maxStreak(days) >= 14, plank_lord: plankMin >= 100, burpee_fiend: reps('Burpees') >= 500,
      dungeon_delver: clears >= 5, circuit_breaker: cs >= 25, iron_monday: monBest >= 4, comeback_kid: gap7,
      early_bird: W.filter((w) => w.time && w.time < '08:00').length >= 5, night_owl: W.filter((w) => w.time && w.time >= '21:00').length >= 5,
      weekend_warrior: weekends.size >= 8, versatile: new Set(W.map((w) => w.exercise)).size >= 20
    };
  }

  // ---------------- willpower ----------------
  function willpower(since) {
    let p = 0;
    workouts.forEach((w) => {
      if (since && w.date < since) return;
      if (w.time && (w.time < '07:00' || w.time >= '21:00')) p += 8;
      if (w.plankChallenge) { if (w.amount >= 10) p += 5; if (w.amount > 10) p += (w.amount - 10) * 6; }
    });
    if (G.circuitState) G.circuitState().history.forEach((h) => { if (!since || h.date >= since) p += h.rounds * 6; });
    if (!since) {
      try { const ws = JSON.parse(localStorage.getItem('pulse-world-v1') || '{}'); Object.values(ws.dungeons || {}).forEach((d) => (p += (d.clears || 0) * 40)); Object.values(ws.region || {}).forEach((r) => { if (r.done) p += 30; }); } catch (e) {}
      try { p += (typeof getBosses === 'function' ? getBosses() : []).filter((b) => b.defeated).length * 50; } catch (e) {}
      if (G._plank) p += (G._plank.state().completed || 0) * 100;
    }
    return p;
  }

  // ---------------- compute (cached) ----------------
  let cache = null;
  function compute() {
    const last = workouts.length ? workouts[workouts.length - 1] : null;
    const key = [workouts.length, last && last.id, last && last.amount, dateKey(new Date()), G.circuitState ? G.circuitState().history.length : 0, localStorage.getItem('pulse-world-v1') ? localStorage.getItem('pulse-world-v1').length : 0].join('|');
    if (cache && cache.key === key) return cache;
    const pts = { STR: 0, END: 0, AGI: 0, CORE: 0 }, pts28 = { STR: 0, END: 0, AGI: 0, CORE: 0 };
    const cut = dateKey(new Date(Date.now() - 27 * 86400000)), cut10 = dateKey(new Date(Date.now() - 9 * 86400000)), cut14 = dateKey(new Date(Date.now() - 13 * 86400000));
    const days = new Set(); const days28 = new Set();
    const recentAreas = new Set(); let recent14 = 0;
    workouts.forEach((w) => {
      const x = xpForWorkout(Object.assign({}, w, { bonus: 1 }));
      const p = profile(w);
      Object.keys(p).forEach((k) => { pts[k] += x * p[k]; if (w.date >= cut) pts28[k] += x * p[k]; });
      days.add(w.date); if (w.date >= cut) days28.add(w.date);
      if (w.date >= cut14) recent14++;
      if (w.date >= cut10) { const c = getCategoryForExercise(w.exercise, w.category); recentAreas.add(c === 'arms' || c === 'back' ? 'upper' : c); if (HOLD_EX.includes(w.exercise)) recentAreas.add('core'); }
    });
    const base = { STR: lvlPts(pts.STR), END: lvlPts(pts.END), AGI: lvlPts(pts.AGI), CORE: lvlPts(pts.CORE), CON: lvlCon(days.size), WIL: lvlWil(willpower(null)) };
    const form = { STR: lvlPts(pts28.STR * 13), END: lvlPts(pts28.END * 13), AGI: lvlPts(pts28.AGI * 13), CORE: lvlPts(pts28.CORE * 13), CON: lvlCon(days28.size * 13), WIL: lvlWil(willpower(cut) * 13) };
    const mix = {}; STATS.forEach((s) => (mix[s] = (base[s] + form[s]) / 2));
    const cls = classFrom(mix);
    const formCls = classFrom(form);
    const next = {}; // progress within the current base level
    ['STR', 'END', 'AGI', 'CORE'].forEach((s) => { const L = base[s]; const lo = Math.pow(L / 0.7, 2), hi = Math.pow((L + 1) / 0.7, 2); next[s] = L >= 99 ? 1 : Math.max(0, Math.min(1, (pts[s] - lo) / (hi - lo))); });
    next.CON = base.CON >= 99 ? 1 : Math.max(0, Math.min(1, (days.size - Math.pow(base.CON / 6, 2)) / (Math.pow((base.CON + 1) / 6, 2) - Math.pow(base.CON / 6, 2))));
    const wp = willpower(null); next.WIL = base.WIL >= 99 ? 1 : Math.max(0, Math.min(1, (wp - Math.pow(base.WIL / 1.2, 2)) / (Math.pow((base.WIL + 1) / 1.2, 2) - Math.pow(base.WIL / 1.2, 2))));
    const weak = recent14 >= 4 ? WEAK.filter(([id]) => !recentAreas.has(id)) : [];
    const level = Math.floor(STATS.reduce((a, s) => a + base[s], 0) / 6);
    cache = { key, base, form, mix, cls, formCls, weak, level, days, next, traitsMet: traitChecks({ days }) };
    return cache;
  }
  G.hero = compute;
  G.heroStat = (s) => compute().base[s] || 0;

  // ---------------- bonuses for the rest of the app ----------------
  function addTo(o, src, mult = 1) { Object.keys(src || {}).forEach((k) => (o[k] = (o[k] || 0) + src[k] * mult)); }
  G.heroBonus = function () {
    const c = compute(); const o = { power: 0, xp: 0, coin: 0, crit: 0, luck: 0 };
    const cl = c.cls;
    if (cl.primary) { addTo(o, CLASSES[cl.primary].perk); if (cl.secondary) addTo(o, CLASSES[cl.secondary].perk, 0.5); } else addTo(o, CLASSES[cl.id].perk);
    TRAITS.forEach(([id, , , , , b]) => { if (H.traits[id]) addTo(o, b); });
    STATS.forEach((s) => TALENTS[s].forEach(([id, , , , b]) => { if (b && H.talents[id]) addTo(o, b, H.talents[id]); }));
    o.power -= c.weak.length * 5;
    return o;
  };
  // boss damage multiplier for a single workout (Monk holds, Ranger cardio)
  G.classDmgMult = function (w) {
    const cl = compute().cls; let m = 1;
    const isHold = HOLD_EX.includes(w.exercise); const isCardio = getCategoryForExercise(w.exercise, w.category) === 'cardio';
    if (cl.primary === 'CORE' && isHold) m *= 2; else if (cl.secondary === 'CORE' && isHold) m *= 1.5;
    if (cl.primary === 'END' && isCardio) m *= 1.5; else if (cl.secondary === 'END' && isCardio) m *= 1.25;
    return m;
  };
  // per-workout XP multiplier from talents (Plank Lord)
  G.workoutBonus = (w) => (HOLD_EX.includes(w.exercise) ? 1 + 0.1 * G.talent('plank') : 1);

  // ---------------- traits, snapshots, class changes ----------------
  function checkProgress() {
    const c = compute();
    let changed = false;
    TRAITS.forEach(([id, name, icon]) => {
      if (c.traitsMet[id] && !H.traits[id]) {
        H.traits[id] = dateKey(new Date()); changed = true;
        if (H.cls) setTimeout(() => { showToast(`🏅 New trait: ${icon} ${name}`, null, null, 4000); G.confetti && G.confetti(70); G.reward && G.reward({ coins: 150, gems: 2 }, { quiet: true }); }, 1500);
      }
    });
    const wk = (() => { const x = new Date(); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dateKey(x); })();
    if (!H.snap || H.snap.week !== wk) { H.prevSnap = H.snap; H.snap = { week: wk, base: c.base, cls: c.cls.name }; changed = true; }
    if (!H.cls) { H.cls = c.cls.id; H.clsName = c.cls.name; changed = true; queue(() => ceremony(null, c.cls)); }
    else if (H.cls !== c.cls.id) { const from = { name: H.clsName, icon: (CLASSES[H.cls.split('+')[0]] || CLASSES.wanderer).icon }; H.cls = c.cls.id; H.clsName = c.cls.name; changed = true; queue(() => ceremony(from, c.cls)); }
    // Streak Guard talent: one free Streak Shield per month
    const month = dateKey(new Date()).slice(0, 7);
    if (G.talent('guard') && H.guardMonth !== month && G.addItem) { H.guardMonth = month; changed = true; G.addItem('streak_shield'); setTimeout(() => showToast('🛡️ Streak Guard: free Streak Shield for this month'), 2000); }
    if (changed) save();
  }

  // overlay queue so ceremonies wait for the boot HUD / other sheets
  const cq = [];
  function queue(fn) { cq.push(fn); setTimeout(flush, 400); }
  function flush() {
    if (window.__PULSE_TEST) { cq.length = 0; return; }
    if (G.bootActive || document.getElementById('gSheet') || document.getElementById('ceremony') || document.getElementById('circuitPlayer')) { setTimeout(flush, 800); return; }
    const fn = cq.shift(); if (fn) fn();
  }
  G.flushCeremonies = flush;

  function ceremony(from, to) {
    const el = document.createElement('div'); el.id = 'ceremony'; el.className = 'ceremony';
    el.style.setProperty('--cc', to.color || '#f5c542');
    el.innerHTML = `<div class="cer-rays"></div>
      <div class="cer-kicker">${from ? 'CLASS CHANGE' : 'YOUR CLASS AWAKENS'}</div>
      ${from ? `<div class="cer-from">${from.icon} ${esc(from.name || '')}</div><div class="cer-arrow">▼</div>` : ''}
      <div class="cer-icon">${to.icon}</div>
      <div class="cer-name">${esc(to.name)}</div>
      <div class="cer-desc">${esc(to.desc)}</div>
      <div class="cer-sub">${from ? 'Your training changed who you are.' : 'Your class comes from how you actually train. Change your training and it changes too.'}</div>
      <button class="gbtn" id="cerOk">Embrace it</button>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      const r = el.querySelector('.cer-icon').getBoundingClientRect();
      G.beam && G.beam(hexRgb(to.color || '#f5c542'), { x: r.left + r.width / 2, w: 120, life: 3 });
      G.sparks && G.sparks(r.left + r.width / 2, r.top + r.height / 2, to.color || '#f5c542', 60);
      G.sfx && G.sfx('godly'); if (typeof haptic === 'function') haptic('levelup');
    }, from ? 900 : 300);
    el.querySelector('#cerOk').onclick = () => { el.remove(); setTimeout(flush, 300); render(); };
  }
  function hexRgb(h) { h = (h || '#ffffff').replace('#', ''); return [0, 2, 4].map((i) => parseInt(h.substr(i, 2), 16)).join(','); }

  function epithet(c) {
    const t = TRAITS.find(([id]) => H.traits[id]);
    let region = 'the Meadow';
    try { const ws = JSON.parse(localStorage.getItem('pulse-world-v1') || '{}'); const names = ['Starter Meadow', 'Goblin Woods', 'Iron Hills', 'Mistmarsh', 'Sunscorch Desert', 'Frostpeak', 'Volcano Forge', 'Shadow Realm', 'Sky Citadel', 'Titan\'s Throne'];
      let far = -1; Object.keys(ws.region || {}).forEach((k) => { if (ws.region[k].done) far = Math.max(far, Number(k)); }); if (far >= 0) region = names[far]; } catch (e) {}
    return `${H.name} ${t ? t[4] : 'the Untested'}, ${c.cls.name} of ${region}`;
  }

  // ---------------- pixel avatar ----------------
  function shade(hex, f) { const h = hex.replace('#', ''); const c = [0, 2, 4].map((i) => Math.max(0, Math.min(255, Math.round(parseInt(h.substr(i, 2), 16) * f)))); return `rgb(${c.join(',')})`; }
  function equipped(slot) { const S = G.state && G.state(); if (!S) return null; const inst = S.items.find((i) => i.uid === S.equip[slot]); return inst ? G.item(inst.id) : null; }
  function tierCol(it, t) { if (!it) return null; if (it.tier === 7) return `hsl(${(t / 20) % 360},90%,70%)`; return G.TIERS[it.tier].color; }
  function line(px, x0, y0, x1, y1, c) { const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let err = dx + dy; for (;;) { px(x0, y0, c); if (x0 === x1 && y0 === y1) break; const e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; } } }

  function drawAvatar(cv, t) {
    const ctx = cv.getContext('2d'); const S = cv.width / 32;
    ctx.clearRect(0, 0, cv.width, cv.height);
    const c = compute(); const col = c.cls.color || '#9aa4af';
    // aura
    const g = ctx.createRadialGradient(cv.width / 2, cv.height * 0.55, 2, cv.width / 2, cv.height * 0.55, cv.width * 0.48);
    const pulse = 0.25 + 0.12 * Math.sin(t / 500);
    g.addColorStop(0, col + Math.round(pulse * 255).toString(16).padStart(2, '0')); g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
    const bob = Math.floor(t / 600) % 2;
    const px = (x, y, color) => { ctx.fillStyle = color; ctx.fillRect(x * S, (y + bob + 1) * S, S, S); };
    const rect = (x, y, w, h, color) => { for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) px(x + i, y + j, color); };
    const skin = '#e9b98c', hair = '#3b2a20', pants = '#2b3440', bootC = '#3a2a1e';
    const shirt = shade(col.startsWith('#') ? col : '#9aa4af', 0.75);
    const helm = equipped('helm'), body = equipped('body'), legs = equipped('legs'), boots = equipped('boots'), gloves = equipped('gloves'), weapon = equipped('weapon'), amulet = equipped('amulet'), ring = equipped('ring');
    // shadow
    ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.beginPath(); ctx.ellipse(cv.width / 2, 30.5 * S, 7 * S, 1.2 * S, 0, 0, 6.3); ctx.fill();
    // legs + boots
    const lc = tierCol(legs, t) || pants;
    rect(12, 21, 3, 7, lc); rect(17, 21, 3, 7, lc);
    if (legs) { rect(12, 21, 1, 7, shade(G.TIERS[legs.tier].color, 0.7)); rect(17, 21, 1, 7, shade(G.TIERS[legs.tier].color, 0.7)); }
    const bc = tierCol(boots, t) || bootC;
    rect(11, 28, 4, 2, bc); rect(17, 28, 4, 2, bc);
    // torso
    const tc = tierCol(body, t) || shirt;
    rect(11, 12, 10, 9, tc);
    if (body) { rect(15, 13, 2, 7, shade(G.TIERS[body.tier].color, 1.25)); rect(11, 12, 10, 1, shade(G.TIERS[body.tier].color, 0.7)); } else rect(11, 19, 10, 1, '#1b1b1b');
    // arms + hands
    rect(9, 13, 2, 7, tc); rect(21, 13, 2, 7, tc);
    const hc = tierCol(gloves, t) || skin;
    rect(9, 20, 2, 2, hc); rect(21, 20, 2, 2, hc);
    if (ring) px(9, 21, tierCol(ring, t));
    // head
    rect(15, 11, 2, 1, skin);
    rect(12, 3, 8, 8, skin);
    rect(12, 2, 8, 2, hair); rect(11, 3, 1, 4, hair); rect(20, 3, 1, 4, hair);
    px(14, 7, '#1b1b1b'); px(17, 7, '#1b1b1b'); rect(15, 9, 2, 1, shade(skin, 0.75));
    if (amulet) { px(15, 13, tierCol(amulet, t)); px(16, 13, tierCol(amulet, t)); }
    // helm
    if (helm) {
      const hcol = tierCol(helm, t); const id = helm.id;
      if (/crown/.test(id)) { rect(12, 1, 8, 2, hcol); px(12, 0, hcol); px(15, 0, hcol); px(16, 0, hcol); px(19, 0, hcol); px(15, 1, '#ff5d8f'); }
      else if (/bunny/.test(id)) { rect(13, -3, 2, 5, '#f5f5f5'); rect(17, -3, 2, 5, '#f5f5f5'); px(13, -2, '#ffb3e6'); px(17, -2, '#ffb3e6'); }
      else if (/antlers/.test(id)) { line(px, 13, 2, 11, -2, '#8b5a2b'); line(px, 18, 2, 20, -2, '#8b5a2b'); px(10, -1, '#8b5a2b'); px(21, -1, '#8b5a2b'); }
      else if (/pumpkin/.test(id)) { rect(11, 2, 10, 9, '#ff8a2a'); px(14, 6, '#1b1b1b'); px(17, 6, '#1b1b1b'); rect(14, 8, 4, 1, '#1b1b1b'); rect(15, 1, 2, 1, '#3ddc84'); }
      else if (/shades/.test(id)) { rect(13, 6, 6, 2, '#111'); }
      else if (/^helm_/.test(id)) { rect(12, 5, 8, 1, hcol); }
      else { rect(11, 1, 10, 4, hcol); rect(11, 5, 1, 3, hcol); rect(20, 5, 1, 3, hcol); }
    }
    // weapon in right hand
    if (weapon) {
      const wc = tierCol(weapon, t); const dark = weapon.tier === 7 ? wc : shade(G.TIERS[weapon.tier].color, 0.6); const id = weapon.id;
      const glow = weapon.tier >= 4;
      if (glow) { ctx.shadowColor = G.TIERS[weapon.tier].color; ctx.shadowBlur = 8 + 4 * Math.sin(t / 300); }
      if (/^mace_/.test(id)) { line(px, 23, 20, 25, 13, '#8b5a2b'); rect(24, 9, 3, 3, wc); px(25, 8, dark); }
      else if (/^flail_/.test(id)) { line(px, 23, 20, 24, 15, '#8b5a2b'); px(25, 14, '#aaa'); px(26, 13, '#aaa'); px(27, 12, '#aaa'); rect(27, 9, 3, 3, wc); }
      else if (/^halberd_/.test(id) || /trident/.test(id)) { line(px, 23, 22, 27, 3, '#8b5a2b'); rect(26, 2, 3, 2, wc); px(25, 1, wc); px(29, 1, wc); px(27, 0, wc); }
      else if (/^whip_/.test(id)) { [[23, 19], [24, 17], [26, 16], [27, 14], [27, 12], [26, 10], [27, 8]].forEach(([x, y]) => px(x, y, wc)); }
      else if (/^hammer_/.test(id)) { line(px, 23, 20, 25, 12, '#8b5a2b'); rect(23, 8, 6, 3, wc); rect(23, 8, 6, 1, dark); }
      else { line(px, 23, 19, 28, 7, wc); line(px, 24, 19, 29, 7, wc); rect(22, 18, 4, 1, dark); px(29, 6, '#fff'); }
      ctx.shadowBlur = 0;
      if (weapon.tier >= 5 && Math.floor(t / 250) % 6 === 0) px(28, 5, '#ffffff');
    }
    // active pet follows you
    const pet = G.activePet && G.activePet();
    if (pet) { ctx.font = `${S * 8}px system-ui,"Apple Color Emoji"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; if (pet.golden) { ctx.shadowColor = '#ffe066'; ctx.shadowBlur = 12; } ctx.fillText(pet.icon, 27.5 * S, (26.5 + (Math.floor(t / 400) % 2 ? 0 : -0.6)) * S); ctx.shadowBlur = 0; }
    // class head flair when no helm
    if (!helm) {
      const k = c.cls.primary || c.cls.id;
      if (k === 'CORE') rect(12, 4, 8, 1, '#ff6b7a');
      else if (k === 'WIL') { px(11, 1, '#ddd'); px(10, 0, '#ddd'); px(20, 1, '#ddd'); px(21, 0, '#ddd'); }
      else if (k === 'AGI') { rect(12, 8, 8, 2, '#222'); px(14, 7, '#1b1b1b'); px(17, 7, '#1b1b1b'); }
      else if (k === 'END') { rect(11, 2, 10, 2, '#2f6b3a'); px(10, 4, '#2f6b3a'); }
      else if (k === 'titan') { rect(12, 1, 8, 1, '#ffe066'); px(13, 0, '#ffe066'); px(18, 0, '#ffe066'); }
      else if (k === 'paladin') rect(12, 2, 8, 1, '#f5c542');
      else if (k === 'wanderer') { rect(11, 2, 10, 2, '#5b4a3a'); rect(10, 4, 1, 4, '#5b4a3a'); rect(21, 4, 1, 4, '#5b4a3a'); }
    }
  }

  // ---------------- radar chart ----------------
  let radarFrom = null, radarT0 = 0;
  function drawRadar(cv, t) {
    const ctx = cv.getContext('2d'); const W = cv.width, Hh = cv.height, cx = W / 2, cy = Hh / 2 + 4, R = Math.min(W, Hh) * 0.36;
    ctx.clearRect(0, 0, W, Hh);
    const c = compute();
    const k = Math.min(1, (t - radarT0) / 900); const e = 1 - Math.pow(1 - k, 3);
    const from = radarFrom || c.base;
    const val = (s, which) => (which === 'form' ? c.form[s] : from[s] + (c.base[s] - from[s]) * e);
    const pt = (i, v) => { const a = -Math.PI / 2 + i * Math.PI / 3; return [cx + Math.cos(a) * R * v / 99, cy + Math.sin(a) * R * v / 99]; };
    ctx.strokeStyle = 'rgba(255,255,255,.07)'; ctx.lineWidth = 1;
    [25, 50, 75, 99].forEach((r) => { ctx.beginPath(); STATS.forEach((s, i) => { const [x, y] = pt(i, r); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.stroke(); });
    STATS.forEach((s, i) => { const [x, y] = pt(i, 99); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke(); });
    const col = c.cls.color || '#49e39a';
    // form (glow outline)
    ctx.beginPath(); STATS.forEach((s, i) => { const [x, y] = pt(i, val(s, 'form')); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath();
    ctx.setLineDash([4, 4]); ctx.strokeStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 10 + 6 * Math.sin(t / 400); ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]); ctx.shadowBlur = 0;
    // base (solid)
    ctx.beginPath(); STATS.forEach((s, i) => { const [x, y] = pt(i, val(s, 'base')); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath();
    const hx = col.startsWith('#') ? col : '#49e39a';
    ctx.fillStyle = hx + '44'; ctx.fill(); ctx.strokeStyle = hx; ctx.lineWidth = 2; ctx.stroke();
    STATS.forEach((s, i) => { const [x, y] = pt(i, val(s, 'base')); ctx.fillStyle = STAT_INFO[s].color; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 6.3); ctx.fill(); });
    ctx.font = '700 11px ui-monospace,Menlo,monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    STATS.forEach((s, i) => { const [x, y] = pt(i, 122); ctx.fillStyle = STAT_INFO[s].color; ctx.fillText(`${s} ${c.base[s]}`, x, y); });
  }

  // ---------------- UI ----------------
  let sub = 'char'; let tree = 'STR'; let raf = null;
  function animate() {
    cancelAnimationFrame(raf);
    const loop = (t) => {
      const sec = document.getElementById('hero'); if (!sec || !sec.classList.contains('active') || sub === 'galaxy') return;
      const a = document.getElementById('heroAvatar'); if (a) drawAvatar(a, t);
      const r = document.getElementById('heroRadar'); if (r) drawRadar(r, t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
  }

  function render() {
    const root = document.getElementById('heroRoot'); if (!root) return;
    const sec = document.getElementById('hero');
    try { checkProgress(); } catch (e) { console.warn('hero', e); }
    const c = compute();
    const subs = `<div class="subtabs"><button class="stab ${sub === 'char' ? 'on' : ''}" data-hs="char">🧬 Character</button><button class="stab ${sub === 'tal' ? 'on' : ''}" data-hs="tal">🌳 Talents${STATS.some((s) => treePoints(s, c.base) > treeSpent(s)) ? ' •' : ''}</button><button class="stab ${sub === 'galaxy' ? 'on' : ''}" data-hs="galaxy">🌌 Galaxy</button><button class="stab ${sub === 'pets' ? 'on' : ''}" data-hs="pets">🐾 Pets</button></div>`;
    let body = '';
    if (sub === 'char') {
      const bonus = G.heroBonus();
      const snapBase = H.snap && H.snap.base;
      const deltas = snapBase ? STATS.map((s) => [s, c.base[s] - snapBase[s]]).filter(([, d]) => d) : [];
      body = `
      <div class="card hero-card" style="--cc:${c.cls.color}">
        <div class="hero-top"><canvas id="heroAvatar" width="128" height="128"></canvas>
          <div class="hero-id"><button class="hero-name" id="heroName">${esc(H.name)} ✎</button>
            <div class="hero-epi">${esc(epithet(c))}</div>
            <div class="hero-cls"><span>${c.cls.icon}</span> <b>${esc(c.cls.name)}</b> <span class="hero-lv">Lv ${c.level}</span></div>
            <div class="hero-perk">${esc(c.cls.desc)}</div></div></div>
      </div>
      <div class="card"><div class="cardhead"><h2>📊 Stats</h2><span class="muted">solid = lifetime · glow = last 4 weeks</span></div>
        <canvas id="heroRadar" width="320" height="280" class="radar"></canvas>
        <div class="statlist">${STATS.map((s) => { const i = STAT_INFO[s]; const f = c.form[s] - c.base[s];
          return `<div class="srow"><span class="s-ic">${i.icon}</span><div class="s-main"><div><b style="color:${i.color}">${s}</b> ${i.name} <span class="muted">· ${i.from}</span></div>
            <div class="s-bar"><div style="width:${c.next[s] * 100}%;background:${i.color}"></div></div></div>
            <div class="s-val"><b>${c.base[s]}</b><span class="${f > 0 ? 'up' : f < 0 ? 'down' : ''}">${f > 0 ? '▲' : f < 0 ? '▼' : '='} form ${c.form[s]}</span></div></div>`; }).join('')}</div>
        <div class="bonus-line">Total from class, traits, talents & weak points: ${['power', 'xp', 'coin', 'crit', 'luck'].map((k) => `<span class="${bonus[k] < 0 ? 'neg' : ''}">${{ power: '⚔️', xp: '✨', coin: '🪙', crit: '💥', luck: '🍀' }[k]} ${bonus[k] >= 0 ? '+' : ''}${Math.round(bonus[k])}%</span>`).join('')}</div></div>
      <div class="card"><div class="cardhead"><h2>📜 Weekly Report</h2><span class="muted">since Monday</span></div>
        <div class="report">${deltas.length ? deltas.map(([s, d]) => `<span class="${d > 0 ? 'up' : 'down'}">${STAT_INFO[s].icon} ${s} ${d > 0 ? '+' : ''}${d}</span>`).join('') : '<span class="muted">No stat changes yet this week — go earn some!</span>'}</div>
        <div class="muted" style="margin-top:8px">${c.formCls.id !== c.cls.id ? `Your recent training has you drifting towards <b style="color:${c.formCls.color}">${c.formCls.icon} ${esc(c.formCls.name)}</b>.` : `Your recent training fits your class — you're a true ${esc(c.cls.name)}.`}</div></div>
      <div class="card"><div class="cardhead"><h2>🏅 Traits</h2><span class="muted">${Object.keys(H.traits).length}/${TRAITS.length}</span></div>
        <div class="traits">${TRAITS.map(([id, name, icon, how, , b]) => `<div class="trait ${H.traits[id] ? 'on' : ''}"><span>${H.traits[id] ? icon : '🔒'}</span><div><b>${name}</b><div class="muted">${how} · ${Object.entries(b).map(([k, v]) => `+${v}% ${k}`).join(', ')}</div></div></div>`).join('')}</div>
        ${c.weak.length ? `<div class="weak-h">⚠️ Weak points</div>${c.weak.map(([id, name, icon, area]) => `<div class="trait weak"><span>${icon}</span><div><b>${name}</b><div class="muted">No ${area} in 10 days · −5% power until you train ${area}</div></div></div>`).join('')}` : ''}</div>`;
    } else if (sub === 'tal') {
      const pts = treePoints(tree, c.base), spent = treeSpent(tree);
      body = `<div class="card"><div class="cardhead"><h2>🌳 Talents</h2><span class="muted">1 point per 10 levels of a stat</span></div>
        <div class="tal-tabs">${STATS.map((s) => { const free = treePoints(s, c.base) - treeSpent(s); return `<button class="chip ${tree === s ? 'on' : ''}" data-tree="${s}">${STAT_INFO[s].icon} ${s}${free > 0 ? ` <b class="free">${free}</b>` : ''}</button>`; }).join('')}</div>
        <div class="tal-head" style="--tcol:${STAT_INFO[tree].color}"><b>${STAT_INFO[tree].name}</b> Lv ${c.base[tree]} · <b>${pts - spent}</b> point${pts - spent === 1 ? '' : 's'} free (${spent}/${pts} spent)</div>
        <div class="tal-tree" style="--tcol:${STAT_INFO[tree].color}">
          ${[0, 1].map((row) => `<div class="tal-row">${TALENTS[tree].slice(row * 2, row * 2 + 2).map(([id, name, desc, max]) => {
            const r = H.talents[id] || 0; const locked = row === 1 && spent < 3 && !r;
            return `<button class="tal ${r ? 'has' : ''} ${locked ? 'locked' : ''} ${r === max ? 'max' : ''}" data-tal="${id}" data-max="${max}"><div class="tal-name">${name}</div><div class="tal-desc">${desc}</div><div class="tal-rank">${'◆'.repeat(r)}${'◇'.repeat(max - r)}</div>${locked ? '<div class="tal-lock">🔒 3 points in tree</div>' : ''}</button>`; }).join('')}</div>${row === 0 ? '<div class="tal-link"></div>' : ''}`).join('')}
        </div>
        <div class="row2"><button class="gbtn ghost" id="talReset">↺ Reset ${tree} tree (free)</button></div>
        <div class="muted" style="margin-top:8px">Tap a talent to add a rank. Bottom-row talents unlock after 3 points in the tree.</div></div>`;
    } else if (sub === 'pets') {
      body = `<div id="petsRoot"></div>`;
    } else {
      body = `<div id="galaxyRoot"></div>`;
    }
    root.innerHTML = subs + body;
    root.querySelectorAll('[data-hs]').forEach((b) => (b.onclick = () => { sub = b.dataset.hs; radarT0 = 0; render(); G.sfx && G.sfx('tick'); }));
    const nm = root.querySelector('#heroName'); if (nm) nm.onclick = () => { const n = prompt('Hero name', H.name); if (n && n.trim()) { H.name = n.trim().slice(0, 20); save(); render(); } };
    root.querySelectorAll('[data-tree]').forEach((b) => (b.onclick = () => { tree = b.dataset.tree; render(); }));
    root.querySelectorAll('[data-tal]').forEach((b) => (b.onclick = () => {
      const id = b.dataset.tal; const max = Number(b.dataset.max); const r = H.talents[id] || 0;
      if (b.classList.contains('locked')) { showToast('🔒 Spend 3 points in this tree first'); return; }
      if (r >= max) { showToast('Maxed'); return; }
      if (treePoints(tree, c.base) - treeSpent(tree) <= 0) { showToast(`No ${tree} points — level ${STAT_INFO[tree].name} to earn more`); G.sfx && G.sfx('lose'); return; }
      H.talents[id] = r + 1; save(); G.sfx && G.sfx('rare'); if (typeof haptic === 'function') haptic('success');
      const rr = b.getBoundingClientRect(); G.sparks && G.sparks(rr.left + rr.width / 2, rr.top + rr.height / 2, STAT_INFO[tree].color, 30);
      render();
    }));
    const tr = root.querySelector('#talReset'); if (tr) tr.onclick = () => { TALENTS[tree].forEach(([id]) => delete H.talents[id]); save(); render(); };
    if (sub === 'galaxy') { G.renderGalaxy && G.renderGalaxy(document.getElementById('galaxyRoot')); }
    else if (sub === 'pets') { G.renderPets && G.renderPets(document.getElementById('petsRoot')); }
    else if (sec && sec.classList.contains('active')) { if (sub === 'char' && radarT0 === 0) { radarFrom = H.snap ? H.snap.base : null; radarT0 = performance.now(); } animate(); }
  }
  G.renderHero = render;
  G.heroSub = (s) => { sub = s; };
  setTimeout(() => { try { checkProgress(); } catch (e) { console.warn('hero', e); } }, 0);
  G.on && G.on('render', () => { try { const sec = document.getElementById('hero'); if (sec && sec.classList.contains('active')) render(); else checkProgress(); } catch (e) { console.warn('hero', e); } });
})();
