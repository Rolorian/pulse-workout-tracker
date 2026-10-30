/* Pulse — Rebuild Pulsehaven (Stardew-style bundles).
   Restore 10 ruined buildings by filling bundles with training and donations. Each building unlocks a real perk. */
(function () {
  const G = (window.G = window.G || {});
  const VKEY = 'pulse-village-v1';
  let V;
  try { V = JSON.parse(localStorage.getItem(VKEY) || 'null'); } catch (e) { V = null; }
  if (!V) V = {};
  V.b = V.b || {};
  const save = () => localStorage.setItem(VKEY, JSON.stringify(V));
  const today = () => dateKey(new Date());

  G.registerItems && G.registerItems([{ id: 'title_villagelord', name: 'Lord of Pulsehaven', icon: '🏷️', tier: 6, type: 'title', special: true, desc: 'Restored every building in Pulsehaven' }]);

  // slot types: training ones fill automatically from workouts logged after the building opened
  const B = [
    { id: 'townhall', name: 'Town Hall', icon: '🏛️', x: 50, y: 47, perk: 'Mayor\'s daily gift — free coins (sometimes gems) every day', bundles: [
      { name: 'Foundations', slots: [{ t: 'reps', cat: 'legs', n: 150 }, { t: 'coins', n: 300 }, { t: 'days', n: 2 }], reward: { coins: 200 } },
      { name: 'First Steps', slots: [{ t: 'variety', n: 5 }, { t: 'hold', n: 120 }, { t: 'dust', n: 20 }], reward: { coins: 200, gems: 2 } }] },
    { id: 'tavern', name: 'Tavern', icon: '🍺', x: 15, y: 38, needs: ['townhall'], perk: 'Rested XP — come back after 2+ days off and your next workouts earn ×1.5 XP', bundles: [
      { name: 'Hearty Meal', slots: [{ t: 'reps', cat: 'core', n: 120 }, { t: 'coins', n: 500 }], reward: { coins: 300 } },
      { name: 'Night Shift', slots: [{ t: 'circuit', n: 3 }, { t: 'days', n: 3 }, { t: 'gems', n: 2 }], reward: { coins: 300, items: ['xp_potion'] } }] },
    { id: 'blacksmith', name: 'Blacksmith', icon: '⚒️', x: 85, y: 38, needs: ['townhall'], perk: 'Enchanting: +5% success and 20% cheaper', bundles: [
      { name: 'Bellows', slots: [{ t: 'reps', cat: 'chest', n: 200 }, { t: 'dust', n: 50 }], reward: { coins: 300 } },
      { name: 'Anvil', slots: [{ t: 'item', tier: 1, n: 3 }, { t: 'coins', n: 800 }], reward: { coins: 300, dust: 80 } }] },
    { id: 'farm', name: 'Farm', icon: '🌾', x: 17, y: 72, needs: ['townhall'], perk: 'Daily harvest — a free potion every day', bundles: [
      { name: 'Seeds', slots: [{ t: 'reps', cat: 'legs', n: 250 }, { t: 'cardio', n: 30 }], reward: { coins: 300 } },
      { name: 'Harvest', slots: [{ t: 'days', n: 5 }, { t: 'coins', n: 600 }, { t: 'item', tier: 0, n: 5 }], reward: { coins: 300, items: ['luck_potion'] } }] },
    { id: 'training', name: 'Training Grounds', icon: '🎯', x: 83, y: 72, needs2: ['tavern', 'blacksmith', 'farm'], perk: '+5% XP on every workout', bundles: [
      { name: 'Drills', slots: [{ t: 'reps', n: 600 }, { t: 'variety', n: 10 }], reward: { coins: 500 } },
      { name: 'Endurance', slots: [{ t: 'hold', n: 600 }, { t: 'circuit', n: 6 }], reward: { coins: 500 } },
      { name: 'Sparring', slots: [{ t: 'item', tier: 2, n: 2 }, { t: 'gems', n: 5 }], reward: { gems: 5, items: ['mega_xp'] } }] },
    { id: 'market', name: 'Market', icon: '🎪', x: 30, y: 21, needs2: ['tavern', 'blacksmith', 'farm'], perk: 'Shop: 2 extra offers every day and 10% off', bundles: [
      { name: 'Trade Goods', slots: [{ t: 'coins', n: 2500 }, { t: 'dust', n: 150 }], reward: { coins: 800 } },
      { name: 'Merchant\'s Favour', slots: [{ t: 'item', tier: 3, n: 1 }, { t: 'days', n: 7 }], reward: { gems: 6 } }] },
    { id: 'temple', name: 'Temple', icon: '⛩️', x: 70, y: 21, needs2: ['tavern', 'blacksmith', 'farm'], perk: '+1 heart in dungeons and a daily blessing (1-hour buff)', bundles: [
      { name: 'Meditation', slots: [{ t: 'hold', n: 900 }, { t: 'reps', cat: 'core', n: 300 }], reward: { coins: 600 } },
      { name: 'Offering', slots: [{ t: 'gems', n: 10 }, { t: 'item', tier: 2, n: 2 }], reward: { items: ['heart_crystal', 'heart_crystal'] } }] },
    { id: 'sanctuary', name: 'Pet Sanctuary', icon: '🐾', x: 35, y: 88, needsN: 5, perk: 'Pet drop chance ×1.5, and your pets roam the village', bundles: [
      { name: 'Feeding Time', slots: [{ t: 'reps', n: 1000 }, { t: 'days', n: 10 }], reward: { coins: 800 } },
      { name: 'Shelter', slots: [{ t: 'coins', n: 3000 }, { t: 'dust', n: 300 }], reward: { gems: 8 } }] },
    { id: 'observatory', name: 'Observatory', icon: '🔭', x: 65, y: 88, needsN: 5, perk: 'Shooting stars appear in your galaxy far more often', bundles: [
      { name: 'Lens', slots: [{ t: 'item', tier: 4, n: 1 }, { t: 'gems', n: 15 }], reward: { coins: 1000 } },
      { name: 'Night Watch', slots: [{ t: 'days', n: 14 }, { t: 'circuit', n: 10 }], reward: { gems: 10 } }] },
    { id: 'castle', name: 'Castle', icon: '🏰', x: 50, y: 9, needsN: 9, perk: 'Lord of Pulsehaven title, +10% coins forever and a free Celestial Crate', bundles: [
      { name: 'Royal Treasury', slots: [{ t: 'coins', n: 10000 }, { t: 'gems', n: 40 }, { t: 'dust', n: 1000 }], reward: { coins: 2000 } },
      { name: 'Knight\'s Oath', slots: [{ t: 'reps', n: 3000 }, { t: 'hold', n: 1800 }, { t: 'days', n: 20 }], reward: { gems: 15 } },
      { name: 'Crown Jewel', slots: [{ t: 'item', tier: 5, n: 1 }], reward: { gems: 20 } }] }
  ];
  const byId = Object.fromEntries(B.map((b) => [b.id, b]));
  const done = (id) => !!(V.b[id] && V.b[id].done);
  G.villagePerk = (id) => done(id);
  G.villageBonus = () => ({ xp: done('training') ? 5 : 0, coin: done('castle') ? 10 : 0 });
  G.villageState = () => V;

  function unlocked(b) {
    if (b.needs) return b.needs.every(done);
    if (b.needs2) return b.needs2.filter(done).length >= 2;
    if (b.needsN) return B.filter((x) => x.id !== b.id && done(x.id)).length >= b.needsN;
    return true;
  }
  function bs(id) { V.b[id] = V.b[id] || { start: null, bun: {}, done: false }; return V.b[id]; }
  function ensureStarts() { let ch = false; B.forEach((b) => { if (unlocked(b) && !bs(b.id).start) { bs(b.id).start = Date.now(); ch = true; } }); if (ch) save(); }

  // ---------------- slot progress ----------------
  function since(ts) { return workouts.filter((w) => Number(w.id) >= ts); }
  function slotLabel(s) {
    switch (s.t) {
      case 'reps': return `${s.n.toLocaleString()} ${s.cat ? s.cat + ' ' : ''}reps`;
      case 'hold': return `${s.n >= 120 ? Math.round(s.n / 60) + ' min' : s.n + 's'} of holds`;
      case 'variety': return `${s.n} different exercises`;
      case 'days': return `Train on ${s.n} different days`;
      case 'circuit': return `${s.n} circuit rounds`;
      case 'cardio': return `${s.n} min of cardio`;
      case 'coins': return `${s.n.toLocaleString()} 🪙`;
      case 'gems': return `${s.n} 💎`;
      case 'dust': return `${s.n.toLocaleString()} ✨ dust`;
      case 'item': return `${s.n}× ${G.TIERS[s.tier].name}${s.tier < 7 ? '+' : ''} gear`;
    }
  }
  const isDonation = (s) => ['coins', 'gems', 'dust', 'item'].includes(s.t);
  function trainProgress(s, start) {
    const ws = since(start);
    switch (s.t) {
      case 'reps': return ws.filter((w) => w.unit === 'reps' && (!s.cat || getCategoryForExercise(w.exercise, w.category) === s.cat)).reduce((a, w) => a + w.amount * (w.sets || 1), 0);
      case 'hold': return holdSeconds(ws);
      case 'variety': return new Set(ws.map((w) => w.exercise)).size;
      case 'days': return new Set(ws.map((w) => w.date)).size;
      case 'circuit': return (G.circuitState ? G.circuitState().history : []).filter((h) => h.t >= start).reduce((a, h) => a + h.rounds, 0);
      case 'cardio': return Math.round(ws.filter((w) => w.unit === 'minutes' && getCategoryForExercise(w.exercise, w.category) === 'cardio').reduce((a, w) => a + w.amount * (w.sets || 1), 0));
    }
    return 0;
  }
  function donatable(s) {
    const S = G.state(); if (!S) return [];
    if (s.t !== 'item') return [];
    const eq = new Set(Object.values(S.equip));
    return S.items.filter((i) => { const it = G.item(i.id); return it && it.type === 'gear' && it.tier >= s.tier && !i.locked && !eq.has(i.uid); }).sort((a, b) => G.item(a.id).tier - G.item(b.id).tier);
  }
  function have(s) { const S = G.state(); if (!S) return 0; if (s.t === 'coins') return S.coins; if (s.t === 'gems') return S.gems; if (s.t === 'dust') return S.dust; if (s.t === 'item') return donatable(s).length; return 0; }

  function slotState(bid, bi, si) { const st = bs(bid); st.bun[bi] = st.bun[bi] || { filled: {}, done: false }; return st.bun[bi]; }
  function slotFull(bid, bi, si) {
    const b = byId[bid]; const s = b.bundles[bi].slots[si]; const ss = slotState(bid, bi);
    if (ss.done || ss.filled[si]) return true;
    if (isDonation(s)) return false;
    return trainProgress(s, bs(bid).start) >= s.n;
  }

  function donate(bid, bi, si) {
    const s = byId[bid].bundles[bi].slots[si]; const S = G.state();
    if (have(s) < s.n) { showToast(`Not enough — you have ${have(s)} of ${s.n}`); G.sfx && G.sfx('lose'); return; }
    if (s.t === 'item') donatable(s).slice(0, s.n).forEach((i) => { S.items = S.items.filter((x) => x.uid !== i.uid); });
    else S[s.t] -= s.n;
    G.saveLoot();
    slotState(bid, bi).filled[si] = true; save();
    G.sfx && G.sfx('coin'); if (typeof haptic === 'function') haptic('medium');
    check(); openBuilding(bid);
  }

  // ---------------- completion ----------------
  let checking = false;
  function check() {
    if (checking) return; checking = true;
    try {
      ensureStarts();
      B.forEach((b) => {
        if (!unlocked(b) || done(b.id)) return;
        b.bundles.forEach((bun, bi) => {
          const ss = slotState(b.id, bi); if (ss.done) return;
          if (bun.slots.every((s, si) => slotFull(b.id, bi, si))) {
            bun.slots.forEach((s, si) => { if (!isDonation(s)) ss.filled[si] = true; });
            ss.done = true; save();
            G.reward && G.reward(bun.reward, { label: `📦 ${bun.name} bundle complete!` });
            G.confetti && G.confetti(80);
          }
        });
        if (b.bundles.every((_, bi) => slotState(b.id, bi).done)) {
          bs(b.id).done = true; bs(b.id).doneDate = today(); save();
          ensureStarts();
          ceremony(b);
          if (b.id === 'castle') { G.reward && G.reward({ items: ['title_villagelord'] }, { quiet: true }); setTimeout(() => G.openCrate && G.openCrate('celestial', true), 4500); }
        }
      });
    } finally { checking = false; }
  }

  function ceremony(b) {
    if (window.__PULSE_TEST_NOPOPUP) return;
    const run = () => {
      const el = document.createElement('div'); el.className = 'ceremony vcer'; el.id = 'ceremony'; el.style.setProperty('--cc', '#f5c542');
      el.innerHTML = `<div class="cer-rays"></div><div class="cer-kicker">PULSEHAVEN RESTORED</div>
        <div class="vc-stage"><div class="vc-rubble">🏚️</div><div class="vc-new">${b.icon}</div></div>
        <div class="cer-name">The ${esc(b.name)} is open!</div><div class="cer-desc">${esc(b.perk)}</div>
        <div class="cer-sub">${B.filter((x) => done(x.id)).length}/10 buildings restored</div><button class="gbtn" id="vcOk">Wonderful</button>`;
      document.body.appendChild(el); requestAnimationFrame(() => el.classList.add('show'));
      [300, 650, 1000].forEach((t, i) => setTimeout(() => { G.sfx && G.sfx('hit'); if (typeof haptic === 'function') haptic('heavy'); const r = el.querySelector('.vc-stage').getBoundingClientRect(); G.sparks && G.sparks(r.left + r.width / 2, r.top + r.height * 0.7, '#c9a27a', 26); }, t));
      setTimeout(() => { const r = el.querySelector('.vc-new').getBoundingClientRect(); G.beam && G.beam('245,197,66', { x: r.left + r.width / 2, w: 110, life: 3 }); G.fireworks && G.fireworks(4); G.sfx && G.sfx('godly'); }, 1350);
      el.querySelector('#vcOk').onclick = () => { el.remove(); render(); G.flushCeremonies && G.flushCeremonies(); };
    };
    if (G.bootActive || document.getElementById('ceremony')) setTimeout(() => ceremony(b), 1200); else { G.closeSheet && G.closeSheet(true); run(); }
  }

  // ---------------- daily perks ----------------
  function claimDaily(kind) {
    V.claims = V.claims || {};
    if (V.claims[kind] === today()) return;
    V.claims[kind] = today(); save();
    if (kind === 'mayor') G.reward({ coins: 150, gems: Math.random() < 0.25 ? 2 : 0 }, { label: '🏛️ The Mayor\'s gift:' });
    if (kind === 'harvest') G.reward({ items: [['xp_potion', 'coin_potion', 'luck_potion', 'xp_potion', 'coin_potion', 'mega_xp'][Math.floor(Math.random() * 6)]] }, { label: '🌾 Today\'s harvest:' });
    if (kind === 'blessing') {
      const opts = [['xp', { mult: 1.5 }, '✨ XP ×1.5'], ['coin', { mult: 1.5 }, '🪙 Coins ×1.5'], ['luck', { add: 60 }, '🍀 +60% luck']];
      const o = opts[Math.floor(Math.random() * opts.length)]; G.state().effects[o[0]] = Object.assign({ until: Date.now() + 3600000 }, o[1]); G.saveLoot();
      showToast(`⛩️ The Temple blesses you: ${o[2]} for 1 hour`);
    }
    G.sfx && G.sfx('rare'); render();
  }

  // Tavern: rested XP — after 2+ days off, your next few workouts earn ×1.5
  const prevWB = G.workoutBonus || (() => 1);
  G.workoutBonus = function (w) {
    let m = prevWB(w);
    if (done('tavern')) {
      V.rested = V.rested || {};
      const others = workouts.filter((x) => x !== w && x.date).map((x) => x.date).sort();
      const last = others.filter((d) => d < w.date).pop();
      if (last && V.rested.for !== w.date) { const gap = Math.round((new Date(w.date) - new Date(last)) / 86400000); if (gap >= 2) { V.rested = { for: w.date, pool: Math.min(5, gap) }; setTimeout(() => showToast(`🍺 Well rested! Your next ${Math.min(5, gap)} workouts earn ×1.5 XP`), 1200); } }
      if (V.rested.for === w.date && V.rested.pool > 0) { V.rested.pool--; m *= 1.5; }
      save();
    }
    return m;
  };

  // ---------------- UI ----------------
  let rootEl = null;
  function openBuilding(id) {
    const b = byId[id]; const st = bs(id); const isOpen = unlocked(b);
    const lockMsg = b.needs ? `Restore the ${b.needs.map((x) => byId[x].name).join(' & ')} first` : b.needs2 ? `Restore 2 of: ${b.needs2.map((x) => byId[x].name).join(', ')}` : `Restore ${b.needsN} other buildings first`;
    const html = `<div class="vb-head"><span class="vb-big ${done(id) ? '' : 'ruin'}">${done(id) ? b.icon : isOpen ? '🏗️' : '🏚️'}</span><div><div class="cz-title" style="text-align:left">${esc(b.name)}</div>
        <div class="muted">${done(id) ? '✅ Restored' : isOpen ? 'Under construction — training after it opened counts' : '🔒 ' + lockMsg}</div><div class="vb-perk">✨ ${esc(b.perk)}</div></div></div>
      ${isOpen ? b.bundles.map((bun, bi) => { const ss = slotState(id, bi);
        return `<div class="bundle ${ss.done ? 'done' : ''}"><div class="bun-h"><b>📦 ${esc(bun.name)}</b><span class="muted">${ss.done ? 'Complete ✓' : 'Reward: ' + rewardText(bun.reward)}</span></div>
          ${bun.slots.map((s, si) => { const full = slotFull(id, bi, si);
            if (isDonation(s)) return `<div class="slot ${full ? 'full' : ''}"><span>${slotLabel(s)}</span>${full ? '<b>✓</b>' : `<button class="gbtn sm" data-don="${bi}:${si}" ${have(s) >= s.n ? '' : 'disabled'}>Donate (${s.t === 'item' ? have(s) : have(s).toLocaleString()})</button>`}</div>`;
            const p = Math.min(s.n, full ? s.n : trainProgress(s, st.start));
            return `<div class="slot ${full ? 'full' : ''}"><span>${slotLabel(s)}</span><div class="slot-bar"><div style="width:${p / s.n * 100}%"></div></div><b>${full ? '✓' : `${p.toLocaleString()}/${s.n.toLocaleString()}`}</b></div>`; }).join('')}</div>`; }).join('') : ''}`;
    const sh = G.sheet(html);
    sh.querySelectorAll('[data-don]').forEach((btn) => (btn.onclick = () => { const [bi, si] = btn.dataset.don.split(':').map(Number); donate(id, bi, si); }));
  }
  function rewardText(r) { const p = []; if (r.coins) p.push(`${r.coins} 🪙`); if (r.gems) p.push(`${r.gems} 💎`); if (r.dust) p.push(`${r.dust} dust`); (r.items || []).forEach((i) => { const it = G.item(i); if (it) p.push(it.icon); }); return p.join(' · '); }

  function bundleProgress(b) {
    let tot = 0, got = 0;
    b.bundles.forEach((bun, bi) => bun.slots.forEach((s, si) => { tot++; if (slotFull(b.id, bi, si)) got++; }));
    return got / tot;
  }

  function render() {
    if (!rootEl || !document.body.contains(rootEl)) return;
    ensureStarts();
    const restored = B.filter((b) => done(b.id)).length;
    const h = new Date().getHours(); const night = h < 7 || h >= 19;
    const ev = document.body.dataset.event;
    const decor = { halloween: ['🎃', '🕸️', '🦇', '🎃'], bonfire: ['🔥', '🎆', '✨'], christmas: ['🎄', '⛄', '🎁', '❄️'], newyear: ['🎊', '🎉', '🥂'], valentine: ['💗', '🌹', '💕'], easter: ['🥚', '🌷', '🐣'], summer: ['🌴', '🌻', '🍉'] }[ev] || [];
    const villagers = ['🧑‍🌾', '👩‍🍳', '🧔', '👵', '🧙', '👨‍🔧', '🧝', '💂', '👸'].slice(0, restored);
    const pets = done('sanctuary') && G.petsOwned ? G.petsOwned().map((p) => p.icon) : [];
    const claims = V.claims || {};
    const daily = [];
    if (done('townhall')) daily.push(['mayor', '🏛️ Mayor\'s gift']);
    if (done('farm')) daily.push(['harvest', '🌾 Harvest']);
    if (done('temple')) daily.push(['blessing', '⛩️ Blessing']);
    const r = G.seeded('decor');
    rootEl.innerHTML = `
      <div class="card"><div class="cardhead"><h2>🏘️ Pulsehaven</h2><span class="muted">${restored}/10 restored</span></div>
        <div class="xp-bar"><div class="fill" style="width:${restored * 10}%"></div></div>
        <div class="muted" style="margin-top:6px">The village fell into ruin. Tap a building to see its bundles — fill them with training and donations to restore it.</div>
        ${daily.length ? `<div class="vdaily">${daily.map(([k, l]) => `<button class="chip ${claims[k] === today() ? '' : 'on'}" data-claim="${k}" ${claims[k] === today() ? 'disabled' : ''}>${l}${claims[k] === today() ? ' ✓' : ''}</button>`).join('')}</div>` : ''}</div>
      <div class="vscene ${night ? 'night' : ''}">
        <svg class="vpaths" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M-5,60 C20,55 30,70 50,62 S80,50 105,58" class="river"/>
          ${B.filter((b) => b.id !== 'townhall').map((b) => `<path d="M50,50 Q${(50 + b.x) / 2 + (b.y > 50 ? 6 : -6)},${(50 + b.y) / 2} ${b.x},${b.y}" class="vpath"/>`).join('')}
        </svg>
        ${Array.from({ length: 14 }, (_, i) => `<span class="vtree" style="left:${r() * 94}%;top:${r() * 92}%">${['🌲', '🌳', '🌲', '🪨', '🌿'][Math.floor(r() * 5)]}</span>`).join('')}
        ${decor.length ? Array.from({ length: 8 }, (_, i) => `<span class="vdecor" style="left:${4 + r() * 90}%;top:${6 + r() * 88}%">${decor[i % decor.length]}</span>`).join('') : ''}
        ${B.map((b) => { const isOpen = unlocked(b); const d = done(b.id); const p = Math.round(bundleProgress(b) * 100);
          return `<button class="vb ${d ? 'done' : isOpen ? 'build' : 'locked'}" data-b="${b.id}" style="left:${b.x}%;top:${b.y}%">
            <span class="vb-ic">${d ? b.icon : isOpen ? '🏚️' : '🏚️'}</span>${!d && isOpen ? `<span class="vb-scaf">🏗️</span><span class="vb-pct">${p}%</span>` : ''}${!isOpen ? '<span class="vb-fog"></span>' : ''}${d && night ? '<span class="vb-glow">✨</span>' : ''}
            <span class="vb-name">${esc(b.name)}</span></button>`; }).join('')}
        ${villagers.map((v, i) => `<span class="villager" style="top:${55 + (i % 3) * 9}%;animation-duration:${14 + i * 3}s;animation-delay:-${i * 4}s">${v}</span>`).join('')}
        ${pets.map((p, i) => `<span class="villager pet" style="top:${30 + (i % 4) * 14}%;animation-duration:${9 + i * 2}s;animation-delay:-${i * 3}s">${p}</span>`).join('')}
        ${night ? '<span class="vmoon">🌙</span>' : '<span class="vsun">☀️</span>'}
      </div>
      <div class="card"><div class="cardhead"><h2>📜 Perks</h2></div><div class="traits">${B.map((b) => `<div class="trait ${done(b.id) ? 'on' : ''}"><span>${done(b.id) ? b.icon : '🔒'}</span><div><b>${esc(b.name)}</b><div class="muted">${esc(b.perk)}</div></div></div>`).join('')}</div></div>`;
    rootEl.querySelectorAll('[data-b]').forEach((btn) => (btn.onclick = () => { G.sfx && G.sfx('tick'); openBuilding(btn.dataset.b); }));
    rootEl.querySelectorAll('[data-claim]').forEach((btn) => (btn.onclick = () => claimDaily(btn.dataset.claim)));
  }
  G.renderVillage = (el) => { rootEl = el; check(); render(); };
  G.villageSummary = () => {
    ensureStarts();
    const restored = B.filter((b) => done(b.id)).length;
    const next = B.filter((b) => unlocked(b) && !done(b.id)).map((b) => [b, bundleProgress(b)]).sort((a, b) => b[1] - a[1])[0];
    return { restored, next: next ? { name: next[0].name, pct: Math.round(next[1] * 100) } : null };
  };
  G._village = { check, state: () => V, B, done, openBuilding, claimDaily, donate, unlocked, bs };

  G.on && G.on('render', () => { try { check(); } catch (e) { console.warn('village', e); } });
  setTimeout(() => { try { ensureStarts(); } catch (e) {} }, 0);
})();
