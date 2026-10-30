/* Pulse — Wandering encounters. Opening the app can spawn a visitor for a limited time. */
(function () {
  const G = (window.G = window.G || {});
  const EKEY = 'pulse-enc-v1';
  let E;
  try { E = JSON.parse(localStorage.getItem(EKEY) || 'null'); } catch (e) { E = null; }
  if (!E) E = { cur: null, next: 0, seen: {} };
  const save = () => localStorage.setItem(EKEY, JSON.stringify(E));
  const MIN = 60000;

  const TYPES = {
    merchant: { w: 22, name: 'Travelling Merchant', icon: '🧙‍♂️', mins: 45, blurb: 'Rare wares, one-time deals. Gone when the timer runs out.' },
    monster: { w: 22, name: 'Rare Monster', icon: '✨', mins: 30, blurb: 'A rare creature wandered in. Fight it with real reps.' },
    goblin: { w: 18, name: 'Treasure Goblin', icon: '💰', mins: 15, blurb: 'It\'s running off with a sack of loot! Log reps fast to catch it.' },
    trainer: { w: 18, name: 'Wandering Trainer', icon: '🥋', mins: 10, blurb: 'A master sets you a challenge. Beat the clock.' },
    fortune: { w: 10, name: 'Fortune Teller', icon: '🔮', mins: 60, blurb: 'One free card from her deck. Choose wisely… well, randomly.' },
    well: { w: 10, name: 'Wishing Well', icon: '⛲', mins: 20, blurb: 'Toss a coin. Make a wish. Up to 3 tosses.' }
  };
  const MONSTERS = [['Golden Goblin', '👺', '#f5c542'], ['Shiny Slime', '🟢', '#5effc8'], ['Crystal Golem', '💎', '#7fdcff'], ['Ghost Stag', '🦌', '#c9d3dd'], ['Ember Drake', '🐉', '#ff7a3d'], ['Moon Moth', '🦋', '#c77dff']];

  function repsSince(ts, ex) { return workouts.filter((w) => Number(w.id) >= ts && w.unit === 'reps' && (!ex || w.exercise === ex)).reduce((a, w) => a + w.amount * (w.sets || 1), 0); }
  function heroLv() { try { return G.hero ? G.hero().level : 5; } catch (e) { return 5; } }

  function spawn(type) {
    const now = Date.now();
    if (!type) {
      const tot = Object.values(TYPES).reduce((a, t) => a + t.w, 0); let r = Math.random() * tot;
      for (const [k, t] of Object.entries(TYPES)) { r -= t.w; if (r <= 0) { type = k; break; } }
    }
    const T = TYPES[type]; const seed = now;
    const cur = { type, start: now, until: now + T.mins * MIN, seed };
    const rnd = G.seeded('enc' + seed);
    if (type === 'monster') { const m = MONSTERS[Math.floor(rnd() * MONSTERS.length)]; cur.mob = m; cur.hp = cur.max = Math.round(50 + heroLv() * 4 + rnd() * 30); }
    if (type === 'goblin') cur.target = 40 + Math.floor(rnd() * 5) * 10;
    if (type === 'trainer') { const pool = questExercisePool('reps'); const ex = pool[Math.floor(rnd() * pool.length)]; cur.ex = ex.name; cur.target = HARD_BODYWEIGHT.has(ex.name) ? 10 + Math.floor(rnd() * 3) * 5 : 20 + Math.floor(rnd() * 3) * 5; }
    if (type === 'merchant') cur.deals = merchantDeals(rnd);
    if (type === 'well') cur.tosses = 0;
    E.cur = cur; save();
    showToast(`${type === 'monster' ? cur.mob[1] : T.icon} ${type === 'monster' ? cur.mob[0] : T.name} appeared! (${T.mins} min)`, 'See', () => openSheet(), 6000);
    G.sfx && G.sfx('rare'); if (typeof haptic === 'function') haptic('success');
    G.sparks && G.sparks(innerWidth - 40, innerHeight - 130, '#ffd23f', 30);
    bubble();
  }
  G.spawnEncounter = spawn;

  function merchantDeals(rnd) {
    const t = 3 + Math.floor(rnd() * 3);
    let it = G.rollItemOfTier(t, rnd), g = 0; while (it.type !== 'gear' && g++ < 15) it = G.rollItemOfTier(t, rnd);
    const price = [80, 200, 500, 1300, 3500, 9000, 25000, 70000][t];
    return [
      { kind: 'item', id: it.id, cost: Math.round(price * 0.6), cur: 'coins', label: `${it.name}`, note: '40% off' },
      { kind: 'mystery', cost: 500, cur: 'coins', label: 'Mystery Box', note: 'Rare or better guaranteed' },
      { kind: 'bundle', cost: 3, cur: 'gems', label: 'Potion Bundle', note: '3 random potions' }
    ];
  }

  function rollMaybe() {
    if (window.__PULSE_TEST || E.cur || !workouts.length) return;
    const now = Date.now(); if (now < (E.next || 0)) return;
    if (E.lastRoll && now - E.lastRoll < 20 * MIN) return;
    E.lastRoll = now; save();
    let chance = 0.35;
    try { const c = G.hero && G.hero().cls; if (c && (c.primary === 'AGI' || c.secondary === 'AGI')) chance += 0.1; } catch (e) {}
    if (Math.random() < chance) spawn();
  }
  G.rollEncounter = rollMaybe;

  function finish(msg, cooldownH = 2) { E.cur = null; E.next = Date.now() + cooldownH * 3600000; save(); if (msg) showToast(msg, null, null, 4500); bubble(); G.closeSheet && document.getElementById('gSheet') && document.getElementById('gSheet').dataset.enc && G.closeSheet(true); }

  function check() {
    const c = E.cur; if (!c) return;
    const now = Date.now();
    if (c.type === 'goblin' && repsSince(c.start) >= c.target) {
      const it = G.rollItemOfTier(3 + (Math.random() < 0.25 ? 1 : 0));
      finish(null); G.reward && G.reward({ coins: 800 + Math.floor(Math.random() * 700), items: [it.id] }, { label: '💰 You caught the Treasure Goblin!' }); G.goldenRain && G.goldenRain(); return;
    }
    if (c.type === 'trainer' && repsSince(c.start, c.ex) >= c.target) {
      finish(null); G.reward && G.reward({ coins: 250, gems: 2, items: ['xp_potion'] }, { label: '🥋 Challenge complete! The trainer bows:' }); G.confetti && G.confetti(90); return;
    }
    if (now > c.until) {
      const T = TYPES[c.type];
      finish(c.type === 'goblin' ? `💨 The Treasure Goblin escaped with its loot… (${repsSince(c.start)}/${c.target} reps)` : c.type === 'monster' ? `${c.mob[1]} The ${c.mob[0]} wandered off.` : `${T.icon} The ${T.name} has moved on.`);
    }
  }

  function bubble() {
    let b = document.getElementById('encBubble');
    const c = E.cur;
    if (!c || window.__PULSE_TEST) { if (b) b.remove(); return; }
    if (!b) { b = document.createElement('button'); b.id = 'encBubble'; b.className = 'enc-bubble'; b.onclick = openSheet; document.body.appendChild(b); }
    const left = Math.max(0, c.until - Date.now()); const T = TYPES[c.type];
    const pct = left / (T.mins * MIN);
    b.innerHTML = `<svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="20" class="eb-trk"/><circle cx="22" cy="22" r="20" class="eb-prog" style="stroke-dashoffset:${125.7 * (1 - pct)}"/></svg><span class="eb-ic">${c.type === 'monster' ? c.mob[1] : T.icon}</span><span class="eb-t">${Math.ceil(left / MIN)}m</span>`;
  }
  setInterval(() => { if (E.cur) { check(); bubble(); const sh = document.getElementById('gSheet'); const tm = sh && sh.querySelector('#encTimer'); if (tm && E.cur) tm.textContent = fmtLeft(); } }, 1000);
  const fmtLeft = () => { const s = Math.max(0, Math.round((E.cur.until - Date.now()) / 1000)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} left`; };

  function openSheet() {
    const c = E.cur; if (!c) return;
    const T = TYPES[c.type];
    let body = '';
    if (c.type === 'merchant') {
      body = c.deals.map((d, i) => { const it = d.kind === 'item' ? G.item(d.id) : null;
        return `<div class="shop-row">${it ? G.itemCard(it) : `<div class="icard t4" style="--tc:#ffb84d"><div class="ii">${d.kind === 'mystery' ? '🎁' : '🧪'}</div></div>`}
          <div class="crate-main"><div class="crate-name" ${it ? `style="color:${G.TIERS[it.tier].color}"` : ''}>${esc(d.label)}</div><div class="muted">${d.note}${it ? ' · ' + G.TIERS[it.tier].name : ''}</div>${it ? `<div class="drop-stats sm">${G.statLines(it)}</div>` : ''}</div>
          <button class="gbtn sm" data-deal="${i}" ${d.sold ? 'disabled' : ''}>${d.sold ? 'SOLD' : `${d.cost} ${d.cur === 'gems' ? '💎' : '🪙'}`}</button></div>`; }).join('');
    } else if (c.type === 'monster') {
      const exs = sortForStyle(pickableExercises().filter((e) => e.unit === 'reps'));
      body = `<div class="dg-room"><div class="dg-mob" id="encMob" style="filter:drop-shadow(0 0 16px ${c.mob[2]})">${c.mob[1]}</div><div class="dg-mobname" style="color:${c.mob[2]}">✨ ${esc(c.mob[0])}</div>
        <div class="xp-bar" style="height:10px"><div class="fill" style="width:${c.hp / c.max * 100}%;background:var(--red)"></div></div><div class="muted">${Math.max(0, c.hp)}/${c.max} HP</div>
        <div class="fields" style="margin-top:8px"><div><select id="encEx" class="ex-select" style="margin:0">${exs.map((e) => `<option>${esc(e.name)}</option>`).join('')}</select></div><div><input id="encReps" type="number" inputmode="numeric" placeholder="Reps"></div></div>
        <button class="gbtn" id="encHit">⚔️ Attack</button></div>`;
    } else if (c.type === 'goblin') {
      const p = repsSince(c.start);
      body = `<div class="enc-chase"><div class="enc-goblin" style="left:${Math.min(85, 10 + p / c.target * 75)}%">💰👺</div><div class="enc-you" style="left:${Math.min(80, p / c.target * 75)}%">🏃</div></div>
        <div class="xp-bar"><div class="fill" style="width:${Math.min(100, p / c.target * 100)}%"></div></div>
        <div class="muted">Log <b>${c.target} reps</b> of anything before it escapes · ${p}/${c.target}</div>
        <button class="gbtn" id="encLog">＋ Log reps now</button>`;
    } else if (c.type === 'trainer') {
      const p = repsSince(c.start, c.ex);
      body = `<div class="cq-text">${c.target} ${esc(c.ex)}</div><div class="muted">Before the timer runs out. Only reps logged after the trainer arrived count.</div>
        <div class="xp-bar"><div class="fill" style="width:${Math.min(100, p / c.target * 100)}%"></div></div><div class="muted">${p}/${c.target} · reward: 250 🪙, 2 💎, Potion of Gains</div>
        <button class="gbtn" id="encLog">＋ Log ${esc(c.ex)}</button>`;
    } else if (c.type === 'fortune') {
      body = `<div class="enc-cards">${[0, 1, 2].map((i) => `<button class="enc-card" data-card="${i}">🂠</button>`).join('')}</div><div class="muted">Pick a card. One draw only.</div>`;
    } else if (c.type === 'well') {
      body = `<div class="enc-well">⛲</div><div class="muted">Toss 100 🪙 · 30% 3💎 · 10% 10💎 · 5% a rare+ item · tosses left: <b>${3 - c.tosses}</b></div>
        <button class="gbtn" id="encToss" ${c.tosses >= 3 ? 'disabled' : ''}>🪙 Toss a coin</button><div id="encWish" class="muted"></div>`;
    }
    const html = `<div class="enc-head"><span class="enc-ic">${c.type === 'monster' ? c.mob[1] : T.icon}</span><div><div class="cz-title" style="text-align:left">${c.type === 'monster' ? esc(c.mob[0]) : T.name}</div><div class="muted">${T.blurb}</div><div class="enc-timer" id="encTimer">${fmtLeft()}</div></div></div>${body}`;
    const sh = G.sheet(html); sh.dataset.enc = '1';
    sh.querySelectorAll('[data-deal]').forEach((b) => (b.onclick = () => {
      const d = c.deals[Number(b.dataset.deal)]; if (d.sold) return;
      if (!G.canPay(d.cur, d.cost)) { showToast(`Not enough ${d.cur === 'gems' ? '💎' : '🪙'}`); return; }
      G.pay(d.cur, d.cost); d.sold = true; save();
      if (d.kind === 'item') G.reward({ items: [d.id] }, { label: '🧙‍♂️ Bought:' });
      else if (d.kind === 'mystery') G.reward({ items: [G.rollItemOfTier(2 + G.rollTier([0, 0, 60, 28, 9, 2.5, 0.45, 0.05], G.stats().luck) - 2).id] }, { label: '🎁 Mystery Box:' });
      else G.reward({ items: [0, 1, 2].map(() => ['xp_potion', 'coin_potion', 'luck_potion', 'mega_xp'][Math.floor(Math.random() * 4)]) }, { label: '🧪 Bundle:' });
      if (!document.getElementById('gSheet')) return; openSheet();
    }));
    const hit = sh.querySelector('#encHit'); if (hit) hit.onclick = () => {
      const reps = Number(sh.querySelector('#encReps').value); if (!reps || reps < 1) { showToast('Enter your reps'); return; }
      const ex = sh.querySelector('#encEx').value; const r = G.rollDamage(reps);
      c.hp -= r.dmg; save();
      workouts.push({ id: Date.now(), exercise: ex, amount: reps, sets: 1, unit: 'reps', date: dateKey(new Date()), time: new Date().toTimeString().slice(0, 5), isPR: false, feeling: '💪', notes: `Encounter: ${c.mob[0]}`, weight: null, category: null });
      const mob = sh.querySelector('#encMob'); G.fxHit && G.fxHit(mob, r.dmg, r.crit);
      if (c.hp <= 0) {
        const it = G.rollItemOfTier(3 + Math.floor(Math.random() * 3));
        finish(null); G.closeSheet(true); persist();
        G.reward({ coins: 300, gems: 3, items: [it.id] }, { label: `✨ ${c.mob[0]} defeated!` }); G.fireworks && G.fireworks(3);
      } else { persist(); setTimeout(openSheet, 350); }
    };
    const lg = sh.querySelector('#encLog'); if (lg) lg.onclick = () => { G.closeSheet(true); openAdd(); if (c.type === 'trainer') { selected = c.ex; renderExercises(); } };
    sh.querySelectorAll('[data-card]').forEach((b) => (b.onclick = () => {
      const cards = [
        ['☀️ The Sun', 'XP ×1.5 for an hour', () => { G.state().effects.xp = { mult: 1.5, until: Date.now() + 3600000 }; G.saveLoot(); }],
        ['💰 The Merchant', 'Coins ×2 for 30 minutes', () => { G.state().effects.coin = { mult: 2, until: Date.now() + 1800000 }; G.saveLoot(); }],
        ['🍀 The Star', '+75% luck for an hour', () => { G.state().effects.luck = { add: 75, until: Date.now() + 3600000 }; G.saveLoot(); }],
        ['🎁 The Chariot', 'A free Gold Crate', () => { G.closeSheet(true); G.openCrate('gold', true); }],
        ['💎 The Empress', '+8 gems', () => G.reward({ gems: 8 }, { quiet: true })]
      ];
      const card = cards[Math.floor(Math.random() * cards.length)];
      b.classList.add('flip'); b.innerHTML = `<span>${card[0].split(' ')[0]}</span>`;
      G.sfx && G.sfx('rare'); G.sparks && G.sparks(innerWidth / 2, innerHeight / 2, '#c77dff', 40);
      setTimeout(() => { finish(null, 3); showToast(`🔮 ${card[0]}: ${card[1]}`, null, null, 5000); card[2](); if (document.getElementById('gSheet') && document.getElementById('gSheet').dataset.enc) G.closeSheet(); }, 1100);
    }));
    const ts = sh.querySelector('#encToss'); if (ts) ts.onclick = () => {
      if (c.tosses >= 3) return; if (!G.canPay('coins', 100)) { showToast('Not enough 🪙'); return; }
      G.pay('coins', 100); c.tosses++; save(); G.sfx && G.sfx('coin');
      const r = Math.random(); const out = sh.querySelector('#encWish');
      if (r < 0.05) { G.reward({ items: [G.rollItemOfTier(2 + Math.floor(Math.random() * 3)).id] }, { label: '⛲ The well grants a treasure:' }); out.textContent = '✨ Your wish came true!'; }
      else if (r < 0.15) { G.reward({ gems: 10 }, { label: '⛲' }); out.textContent = '💎💎 A big splash of gems!'; G.confetti && G.confetti(60); }
      else if (r < 0.45) { G.reward({ gems: 3 }, { label: '⛲' }); out.textContent = '💎 A few gems bubble up.'; }
      else { out.textContent = '…the coin sinks. Nothing happens.'; G.sfx && G.sfx('lose'); }
      if (c.tosses >= 3) { finish(null, 2); }
      else if (document.getElementById('gSheet')) { sh.querySelector('#encToss').disabled = false; sh.querySelector('.muted b').textContent = 3 - c.tosses; }
    };
  }
  G.openEncounter = openSheet;
  G.encounterStatus = () => { const c = E.cur; if (!c) return null; const T = TYPES[c.type]; return { name: c.type === 'monster' ? c.mob[0] : T.name, icon: c.type === 'monster' ? c.mob[1] : T.icon, mins: Math.ceil((c.until - Date.now()) / MIN) }; };

  G.on && G.on('render', () => { try { check(); bubble(); } catch (e) { console.warn('enc', e); } });
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') setTimeout(rollMaybe, 2500); });
  bubble();
})();
