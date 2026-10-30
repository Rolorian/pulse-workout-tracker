/* Pulse — world map campaign, roguelike dungeon runs and seasonal events. */
(function () {
  const G = (window.G = window.G || {});
  const WKEY = 'pulse-world-v1';
  let W;
  try { W = JSON.parse(localStorage.getItem(WKEY) || 'null'); } catch (e) { W = null; }
  if (!W) W = {};
  W.region = W.region || {}; W.ev = W.ev || {}; W.dungeons = W.dungeons || {};
  const save = () => localStorage.setItem(WKEY, JSON.stringify(W));
  const today = () => dateKey(new Date());
  const pickR = (a, rnd) => a[Math.floor(rnd() * a.length)];

  // =====================================================================
  // SEASONAL EVENTS
  // =====================================================================
  function easter(y) {
    const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3),
      h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
      month = Math.floor((h + l - 7 * m + 114) / 31), day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(y, month - 1, day);
  }
  const md = (d) => (d.getMonth() + 1) * 100 + d.getDate();

  const EVENTS = [
    { id: 'halloween', name: 'Halloween: Night of the Lifting Dead', icon: '🎃', theme: { a: '#ff8a2a', b: '#9b5cff' },
      when: (d) => md(d) >= 1024 && md(d) <= 1101, cur: { name: 'Candy', icon: '🍬' },
      ambient: { emojis: ['🦇', '🦇', '🎃', '👻'], rate: 0.02, max: 9 },
      boss: { name: 'The Headless Lifter', emoji: '🎃', hp: 3000 }, blurb: 'Bats in the gym, candy for every rep. Slay the Headless Lifter before the clock strikes November.',
      items: [['ev_pumpkin_helm', 'Pumpkin Helm', '🎃', 3, 'gear', 'helm', { xp: 16, luck: 8 }, 40], ['ev_bat_boots', 'Batwing Boots', '🦇', 3, 'gear', 'boots', { coin: 16, crit: 4 }, 40],
        ['theme_halloween', 'Haunted Theme', '🎨', 4, 'theme', null, null, 60], ['title_pumpkin', 'Pumpkin King', '🏷️', 4, 'title', null, null, 50],
        ['ev_scythe', 'Scythe of Reaping', '⚰️', 5, 'gear', 'weapon', { power: 65, crit: 12 }, 0]] },
    { id: 'bonfire', name: 'Bonfire Night', icon: '🎆', theme: { a: '#ffb02e', b: '#ff3d3d' },
      when: (d) => md(d) >= 1102 && md(d) <= 1108, cur: { name: 'Embers', icon: '🔥' },
      ambient: { emojis: ['✨', '🔥', '🎇'], rate: 0.04, max: 16, dir: 'up' },
      boss: { name: 'The Bonfire Golem', emoji: '🔥', hp: 2000 }, blurb: 'Remember, remember… to train in November. Fireworks on every level-up.',
      items: [['ev_sparkler', 'Sparkler Wand', '🎇', 2, 'gear', 'weapon', { power: 14, crit: 4 }, 30], ['ev_rocket_boots', 'Rocket Boots', '🚀', 3, 'gear', 'boots', { coin: 18, power: 4 }, 45],
        ['theme_fireworks', 'Fireworks Theme', '🎨', 4, 'theme', null, null, 60], ['title_remember', 'Remember Remember', '🏷️', 3, 'title', null, null, 40],
        ['ev_golem_core', 'Golem Heartstone', '❤️‍🔥', 5, 'gear', 'amulet', { power: 30, xp: 30 }, 0]] },
    { id: 'christmas', name: 'Winter Gains Advent', icon: '🎄', theme: { a: '#ff4d5e', b: '#3ddc84' },
      when: (d) => md(d) >= 1201 && md(d) <= 1226, cur: { name: 'Snowflakes', icon: '❄️' }, advent: true,
      ambient: { emojis: ['❄️', '❄️', '❅', '❆'], rate: 0.06, max: 22 },
      boss: { name: 'Krampus', emoji: '👹', hp: 6000 }, blurb: 'A door a day until Christmas. Open each one by finishing that day\'s challenge.',
      items: [['ev_antlers', 'Reindeer Antlers', '🦌', 3, 'gear', 'helm', { xp: 18, luck: 6 }, 50], ['ev_sack', 'Santa\'s Sack', '🎅', 4, 'gear', 'amulet', { luck: 30, coin: 15 }, 90],
        ['theme_xmas', 'Festive Theme', '🎨', 4, 'theme', null, null, 60], ['title_elf', 'Elf on the Shelf', '🏷️', 3, 'title', null, null, 40],
        ['ev_candycane', 'Candy Cane Halberd', '🍭', 5, 'gear', 'weapon', { power: 70, luck: 10 }, 0]] },
    { id: 'newyear', name: 'New Year, New PRs', icon: '🎊', theme: { a: '#ffd04d', b: '#e8e8e8' }, mods: { xp: 1.25, label: '🎊 New Year +25% XP' },
      when: (d) => md(d) >= 1230 || md(d) <= 107, cur: { name: 'Confetti', icon: '🎊' },
      ambient: { emojis: ['🎊', '✨', '🎉'], rate: 0.035, max: 14 },
      boss: { name: 'Ghost of Last Year', emoji: '⌛', hp: 3000 }, blurb: 'Resolutions start now: +25% XP on every workout during the event.',
      items: [['ev_resolution', 'Resolution Ring', '💍', 3, 'gear', 'ring', { xp: 20 }, 45], ['ev_party', 'Party Popper', '🎉', 2, 'gear', 'weapon', { power: 12, luck: 8 }, 30],
        ['theme_newyear', 'Midnight Gold Theme', '🎨', 4, 'theme', null, null, 60], ['title_fresh', 'Fresh Start', '🏷️', 3, 'title', null, null, 40],
        ['ev_midnight_crown', 'Midnight Crown', '👑', 5, 'gear', 'helm', { xp: 45, luck: 15 }, 0]] },
    { id: 'valentine', name: 'Love Your Gains', icon: '💘', theme: { a: '#ff6fae', b: '#ff3d6e' },
      when: (d) => md(d) >= 210 && md(d) <= 216, cur: { name: 'Hearts', icon: '💗' },
      ambient: { emojis: ['💗', '💕', '💖'], rate: 0.035, max: 12, dir: 'up' },
      boss: { name: 'The Heartbreaker', emoji: '💔', hp: 1500 }, blurb: 'Fall in love with leg day. Hearts for every workout.',
      items: [['ev_cupid', 'Cupid\'s Bow', '🏹', 3, 'gear', 'weapon', { power: 20, crit: 8 }, 40], ['ev_devotion', 'Ring of Devotion', '💞', 3, 'gear', 'ring', { xp: 14, luck: 8 }, 40],
        ['theme_valentine', 'Rose Theme', '🎨', 4, 'theme', null, null, 55], ['title_heart', 'Heart Throb', '🏷️', 3, 'title', null, null, 35],
        ['ev_heartbreaker', 'Heartbreaker Gauntlets', '💔', 5, 'gear', 'gloves', { crit: 35, power: 15 }, 0]] },
    { id: 'easter', name: 'The Great Egg Hunt', icon: '🐣', theme: { a: '#b8f28c', b: '#ffb3e6' }, eggs: true,
      when: (d) => { const e = easter(d.getFullYear()); const diff = Math.round((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - e) / 86400000); return diff >= -5 && diff <= 2; },
      cur: { name: 'Eggs', icon: '🥚' }, ambient: { emojis: ['🌸', '🐣', '🌼'], rate: 0.025, max: 10 },
      boss: { name: 'The Giant Rabbit', emoji: '🐰', hp: 2000 }, blurb: 'Eggs are hidden around the app every day. Find them all!',
      items: [['ev_bunny_ears', 'Bunny Ears', '🐰', 3, 'gear', 'helm', { xp: 15, luck: 10 }, 40], ['ev_basket', 'Egg Basket', '🧺', 2, 'gear', 'amulet', { coin: 14 }, 30],
        ['theme_easter', 'Pastel Theme', '🎨', 4, 'theme', null, null, 55], ['title_egg', 'Egg Hunter', '🏷️', 3, 'title', null, null, 35],
        ['ev_golden_egg', 'Golden Egg', '🥚', 5, 'gear', 'amulet', { luck: 45, coin: 25 }, 0]] },
    { id: 'summer', name: 'Summer Shred', icon: '☀️', theme: { a: '#2ee6d6', b: '#ffd23f' }, mods: { coin: 1.25, label: '☀️ Summer +25% coins' },
      when: (d) => md(d) >= 715 && md(d) <= 831, cur: { name: 'Seashells', icon: '🐚' },
      ambient: { emojis: ['☀️', '🌴', '🫧'], rate: 0.015, max: 6 },
      boss: { name: 'The Kraken', emoji: '🐙', hp: 5000 }, blurb: 'Beach season. +25% coins and a Kraken to wrestle.',
      items: [['ev_flipflops', 'Flip-Flops of Speed', '🩴', 3, 'gear', 'boots', { coin: 20 }, 45], ['ev_shades', 'Cool Shades', '🕶️', 3, 'gear', 'helm', { luck: 15, xp: 8 }, 45],
        ['theme_summer', 'Tropical Theme', '🎨', 4, 'theme', null, null, 60], ['title_beach', 'Beach Body', '🏷️', 3, 'title', null, null, 40],
        ['ev_trident', 'Trident of Tides', '🔱', 5, 'gear', 'weapon', { power: 72, coin: 15 }, 0]] }
  ];
  EVENTS.forEach((ev) => {
    G.THEMES && ev.items.forEach((x) => { if (x[4] === 'theme') G.THEMES[x[0]] = ev.theme; });
    G.registerItems(ev.items.map(([id, name, icon, tier, type, slot, stats]) => ({ id, name, icon, tier, type, slot, stats, event: ev.id, desc: `${ev.icon} ${ev.name} exclusive` })));
  });

  function preview() { try { const p = new URLSearchParams(location.search).get('event'); if (p) return p; } catch (e) {} return null; }
  function activeEvent(d = new Date()) {
    const p = preview(); if (p) return EVENTS.find((e) => e.id === p) || null;
    return EVENTS.find((e) => e.when(d)) || null;
  }
  function evKey(ev) { const d = new Date(); return ev.id + (ev.id === 'newyear' && d.getMonth() === 0 ? d.getFullYear() - 1 : d.getFullYear()); }
  function evState(ev) { const k = evKey(ev); W.ev[k] = W.ev[k] || { cur: 0, dmg: 0, dead: false, bought: [], advent: {}, eggs: {}, earnedToday: {} }; return W.ev[k]; }
  function isDoubleXP(d = new Date()) { const day = d.getDay(); if (day !== 6 && day !== 0) return false; const sat = day === 6 ? d.getDate() : d.getDate() - 1; return sat >= 1 && sat <= 7; }
  function isBloodMoon(d = new Date()) { if (preview() === 'bloodmoon') return true; const h = d.getHours(); if (h < 20 && h >= 4) return false; const k = h < 4 ? dateKey(new Date(d.getTime() - 86400000)) : dateKey(d); return G.hash('bm' + k) % 11 === 0; }

  G.eventMods = function () {
    const ev = activeEvent(); const out = { xp: 1, coin: 1, luck: 0, label: '' }; const labels = [];
    if (ev && ev.mods) { out.xp *= ev.mods.xp || 1; out.coin *= ev.mods.coin || 1; labels.push(ev.mods.label); }
    if (isDoubleXP()) { out.xp *= 2; labels.push('⚡ Double XP Weekend'); }
    if (isBloodMoon()) { out.luck += 100; labels.push('🩸 Blood Moon: +100% luck'); }
    out.label = labels.join(' · ');
    return out;
  };
  G.eventTheme = function () { if (isBloodMoon()) return { a: '#ff4d6a', b: '#8b0a2a' }; const ev = activeEvent(); return ev ? ev.theme : null; };

  // earn event currency + damage the event boss with every new workout
  G.on('workout', (w) => {
    const ev = activeEvent(); if (!ev) return;
    const s = evState(ev); const d = today();
    const raw = xpForWorkout(Object.assign({}, w, { bonus: 1 }));
    const earned = s.earnedToday[d] || 0;
    const amt = Math.min(Math.max(1, Math.round(raw / 15)), 300 - earned);
    s.earnedToday = { [d]: earned + Math.max(0, amt) };
    if (amt > 0) s.cur += amt;
    if (!s.dead) {
      const dmg = Math.round(raw * (1 + G.stats().power / 100));
      s.dmg += dmg;
      if (s.dmg >= ev.boss.hp) {
        s.dead = true; save();
        const best = ev.items.find((x) => x[7] === 0);
        setTimeout(() => { G.reward({ gems: 15, coins: 1500, items: best ? [best[0]] : [] }, { label: `${ev.boss.emoji} ${ev.boss.name} defeated!` }); G.fireworks && G.fireworks(6); }, 900);
      }
    }
    save();
  });

  function eventShop(ev) {
    const s = evState(ev);
    const html = `<div class="casino"><div class="cz-title">${ev.icon} Event Shop</div><div class="muted">You have <b style="color:var(--gold)">${s.cur} ${ev.cur.icon}</b> ${ev.cur.name}</div>
      ${ev.items.filter((x) => x[7] > 0).map((x) => { const it = G.item(x[0]); const owned = s.bought.includes(x[0]);
        return `<div class="shop-row">${G.itemCard(it)}<div class="crate-main"><div class="crate-name" style="color:${G.TIERS[it.tier].color}">${esc(it.name)}</div><div class="drop-stats sm">${G.statLines(it) || `<span class="stat">${it.type}</span>`}</div></div>
        <button class="gbtn sm" data-evb="${x[0]}" ${owned ? 'disabled' : ''}>${owned ? 'OWNED' : x[7] + ' ' + ev.cur.icon}</button></div>`; }).join('')}
      <div class="muted">Boss-only reward: ${(() => { const b = ev.items.find((x) => x[7] === 0); const it = b && G.item(b[0]); return it ? `<b style="color:${G.TIERS[it.tier].color}">${it.icon} ${esc(it.name)}</b>` : ''; })()}</div></div>`;
    const sh = G.sheet(html, { center: true });
    sh.querySelectorAll('[data-evb]').forEach((b) => (b.onclick = () => {
      const x = ev.items.find((y) => y[0] === b.dataset.evb);
      if (s.cur < x[7]) { showToast(`Need ${x[7]} ${ev.cur.icon}`); return; }
      s.cur -= x[7]; s.bought.push(x[0]); save();
      G.reward({ items: [x[0]] }, { label: '🛒' });
      G.closeSheet(true); eventShop(ev);
    }));
  }

  // ---- advent calendar (Christmas) ----
  function adventChallenge(day) {
    const rnd = G.seeded('advent' + new Date().getFullYear() + day);
    const types = ['any', 'reps', 'variety', 'sets'];
    const t = day === 25 ? 'reps' : types[Math.floor(rnd() * types.length)];
    if (t === 'any') return { t, n: 1, text: 'Log any workout' };
    if (t === 'reps') { const n = day === 25 ? 125 : 30 + Math.floor(rnd() * 5) * 10; return { t, n, text: `Do ${n} reps (any exercises)` }; }
    if (t === 'variety') { const n = 2 + Math.floor(rnd() * 2); return { t, n, text: `Train ${n} different exercises` }; }
    const n = 3 + Math.floor(rnd() * 4); return { t, n, text: `Log ${n} sets` };
  }
  function adventProgress(c) {
    const td = workouts.filter((w) => w.date === today());
    if (c.t === 'any') return td.length;
    if (c.t === 'reps') return td.filter((w) => w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
    if (c.t === 'variety') return new Set(td.map((w) => w.exercise)).size;
    return td.reduce((a, w) => a + (w.sets || 1), 0);
  }
  function adventHtml(ev) {
    const s = evState(ev); const now = new Date(); const dayN = preview() ? Math.min(25, now.getDate()) : now.getDate();
    const c = adventChallenge(dayN); const prog = adventProgress(c);
    return `<div class="advent">${Array.from({ length: 25 }, (_, i) => {
      const d = i + 1; const done = s.advent[d]; const isToday = d === dayN && md(now) <= 1225 || (preview() && d === dayN);
      const cls = done ? 'open' : isToday ? 'today' : d < dayN ? 'missed' : 'locked';
      return `<button class="door ${cls}" data-adv="${d}">${done ? '🎁' : d === 25 ? '⭐' : d}</button>`;
    }).join('')}</div>
    ${s.advent[dayN] ? `<div class="muted">Door ${dayN} opened ✓ — come back tomorrow</div>` : `<div class="muted">Today's door: <b>${c.text}</b> · ${Math.min(prog, c.n)}/${c.n}</div>`}`;
  }
  function openDoor(ev, d) {
    const s = evState(ev); const now = new Date(); const dayN = preview() ? Math.min(25, now.getDate()) : now.getDate();
    if (d !== dayN || s.advent[d]) { if (!s.advent[d]) showToast(d < dayN ? 'That door has passed ❄️' : 'Not yet! 🎄'); return; }
    const c = adventChallenge(d);
    if (adventProgress(c) < c.n) { showToast(`🔒 ${c.text} to open door ${d}`); return; }
    s.advent[d] = true; save();
    const rnd = G.seeded('gift' + d);
    const r = d === 25 ? { gems: 25, coins: 2500, items: [G.rollItemOfTier(5).id] } : d % 5 === 0 ? { gems: 5, items: [G.rollItemOfTier(3, rnd).id] } : { coins: 150 + d * 15, items: rnd() < 0.5 ? [pickR(['xp_potion', 'coin_potion', 'luck_potion'], rnd)] : [] };
    r.items = (r.items || []); s.cur += 10;
    G.reward(r, { label: `🎁 Door ${d}:` }); G.confetti && G.confetti(100);
    render();
  }

  // ---- easter eggs hidden around the app ----
  const EGG_TABS = ['today', 'progress', 'history', 'battle', 'world', 'loot', 'warmup', 'minimum'];
  function placeEgg() {
    const old = document.getElementById('easterEgg'); if (old) old.remove();
    const ev = activeEvent(); if (!ev || !ev.eggs) return;
    const s = evState(ev); const d = today(); const found = s.eggs[d] || [];
    const activeTab = (document.querySelector('.section.active') || {}).id;
    for (let i = 0; i < 8; i++) {
      if (found.includes(i)) continue;
      const rnd = G.seeded('egg' + d + i);
      if (EGG_TABS[Math.floor(rnd() * EGG_TABS.length)] !== activeTab) continue;
      const b = document.createElement('button');
      b.id = 'easterEgg'; b.className = 'egg'; b.textContent = pickR(['🥚', '🪺', '🐣'], rnd);
      b.style.left = (8 + rnd() * 78) + 'vw'; b.style.top = (22 + rnd() * 55) + 'vh';
      b.onclick = () => {
        const r = b.getBoundingClientRect(); G.sparks && G.sparks(r.left + 20, r.top + 20, '#ffe066', 30);
        s.eggs = { [d]: found.concat(i) }; s.cur += 8; save(); b.remove();
        G.sfx && G.sfx('rare'); showToast(`🥚 Found an egg! +8 Eggs (${s.eggs[d].length}/8 today)`);
        if (s.eggs[d].length === 8) G.reward({ gems: 5 }, { label: '🧺 All 8 eggs found!' });
        setTimeout(placeEgg, 400);
      };
      document.body.appendChild(b);
      return;
    }
  }

  function renderEventStrip() {
    let strip = document.getElementById('eventStrip');
    const ev = activeEvent(); const mods = G.eventMods();
    if (!strip) { strip = document.createElement('button'); strip.id = 'eventStrip'; const tabs = document.querySelector('.tabs'); if (tabs) tabs.parentNode.insertBefore(strip, tabs); }
    const bits = [];
    if (ev) bits.push(`${ev.icon} ${ev.name.split(':')[0]} event live`);
    if (mods.label && (!ev || !ev.mods || mods.label !== ev.mods.label)) bits.push(mods.label.replace(ev && ev.mods ? ev.mods.label + ' · ' : '', ''));
    strip.style.display = bits.length ? '' : 'none';
    strip.innerHTML = bits.join(' · ') + ' <span>›</span>';
    strip.onclick = () => { const b = [...document.querySelectorAll('.tab')].find((x) => x.textContent.includes('World')); if (b) b.click(); };
    G.setAmbient && G.setAmbient(ev ? ev.ambient : isBloodMoon() ? { emojis: ['🩸', '🌕'], rate: 0.01, max: 4 } : null);
    if (ev) document.body.dataset.event = ev.id; else delete document.body.dataset.event;
  }

  function eventCardHtml() {
    const ev = activeEvent(); if (!ev) return '';
    const s = evState(ev); const pct = Math.min(100, s.dmg / ev.boss.hp * 100);
    return `<div class="card event-card" style="--ea:${ev.theme.a};--eb:${ev.theme.b}">
      <div class="ev-head"><span class="ev-ico">${ev.icon}</span><div><div class="ev-name">${esc(ev.name)}</div><div class="muted">${esc(ev.blurb)}</div></div></div>
      <div class="ev-cur">${ev.cur.icon} <b>${s.cur}</b> ${ev.cur.name} <span class="muted">· earned from every workout</span></div>
      <div class="ev-boss"><span class="eb-emoji ${s.dead ? 'dead' : ''}">${ev.boss.emoji}</span><div style="flex:1"><div><b>${ev.boss.name}</b> ${s.dead ? '<span style="color:var(--gold)">— SLAIN ✓</span>' : ''}</div>
        <div class="xp-bar"><div class="fill" style="width:${100 - pct}%;background:linear-gradient(90deg,var(--ea),var(--eb))"></div></div>
        <div class="muted">${s.dead ? 'Exclusive reward claimed' : `${Math.max(0, ev.boss.hp - s.dmg).toLocaleString()} / ${ev.boss.hp.toLocaleString()} HP · every workout deals damage`}</div></div></div>
      ${ev.advent ? adventHtml(ev) : ''}
      ${ev.eggs ? `<div class="muted">🥚 Eggs found today: ${(s.eggs[today()] || []).length}/8 — they hide on different tabs</div>` : ''}
      <button class="gbtn" id="evShopBtn">${ev.icon} Event Shop</button></div>`;
  }

  // =====================================================================
  // WORLD MAP CAMPAIGN
  // =====================================================================
  const REGIONS = [
    { name: 'Starter Meadow', icon: '🌾', c: '#49e39a', need: 0, lore: 'Every legend starts with a single rep.', boss: ['Grumpy Scarecrow', '🎃'] },
    { name: 'Goblin Woods', icon: '🌲', c: '#7bd88f', need: 5, lore: 'Goblins hoard the dumbbells. Take them back.', boss: ['Goblin Warchief', '👺'] },
    { name: 'Iron Hills', icon: '⛰️', c: '#a7b4c2', need: 15, lore: 'Dwarves forge plates from the mountain itself.', boss: ['Stone Golem', '🗿'] },
    { name: 'Mistmarsh', icon: '🌫️', c: '#7fc8b8', need: 30, lore: 'Something lurks in the fog. It skips cardio.', boss: ['Bog Witch', '🧙'] },
    { name: 'Sunscorch Desert', icon: '🏜️', c: '#ffb86b', need: 50, lore: 'Heat, sand, and endless lunges.', boss: ['Sand Wyrm', '🐍'] },
    { name: 'Frostpeak', icon: '🏔️', c: '#7fdcff', need: 75, lore: 'Only the warm-blooded survive the climb.', boss: ['Frost Giant', '🧊'] },
    { name: 'Volcano Forge', icon: '🌋', c: '#ff7a3d', need: 105, lore: 'Where legendary weapons are born in lava.', boss: ['Magma Titan', '🔥'] },
    { name: 'Shadow Realm', icon: '🌑', c: '#a78bfa', need: 140, lore: 'Your doubts take form here. Out-train them.', boss: ['The Doubt', '👤'] },
    { name: 'Sky Citadel', icon: '🏰', c: '#5aa8ff', need: 180, lore: 'A fortress above the clouds, guarded by angels.', boss: ['Seraph Knight', '😇'] },
    { name: 'Titan\'s Throne', icon: '⚡', c: '#ffe066', need: 230, lore: 'The final summit. The Titan awaits.', boss: ['The Titan', '⚡'] }
  ];
  const CATS = [['legs', 'Legs'], ['chest', 'Chest'], ['core', 'Core'], ['arms', 'Arms'], ['back', 'Back']];

  function advLevel() { try { return Math.max(0, getTotalLevel() - getSkillRoster().length); } catch (e) { return 0; } }

  function stageDef(ri, si) {
    const rnd = G.seeded('stage' + ri + '-' + si);
    if (si === 4) return { t: 'boss', n: 150 + ri * 120, text: `Defeat ${REGIONS[ri].boss[1]} ${REGIONS[ri].boss[0]}`, sub: 'Every rep deals damage (boosted by your gear)' };
    const types = ri >= 2 ? ['cat', 'cat', 'ex', 'variety', 'sets', 'weighted', 'cardio'] : ['cat', 'cat', 'ex', 'variety', 'sets', 'cardio'];
    const t = types[Math.floor(rnd() * types.length)];
    if (t === 'cat') { const c = pickR(CATS, rnd); const n = 30 + ri * 20 + si * 10; return { t, cat: c[0], n, text: `${n} ${c[1]} reps`, sub: `Any ${c[1].toLowerCase()} exercise counts` }; }
    if (t === 'ex') { const pool = EXERCISES.filter((e) => e.unit === 'reps'); const e = pickR(pool, rnd); const n = 20 + ri * 12 + si * 6; return { t, ex: e.name, n, text: `${n} ${e.name}`, sub: `${e.icon} Specific exercise` }; }
    if (t === 'variety') { const n = 3 + Math.floor(ri / 3); return { t, n, text: `Train ${n} different exercises`, sub: 'Variety is strength' }; }
    if (t === 'sets') { const n = 5 + ri * 2; return { t, n, text: `Log ${n} sets`, sub: 'Sets × entries all count' }; }
    if (t === 'weighted') { const n = 3 + ri; return { t, n, text: `Log ${n} weighted sets`, sub: 'Add a kg value to an entry' }; }
    const n = 10 + ri * 5; return { t: 'cardio', n, text: `${n} minutes of cardio`, sub: 'Any cardio logged in minutes' };
  }
  function stageProgress(def, since) {
    const ws = workouts.filter((w) => Number(w.id) >= since);
    const reps = (f) => ws.filter((w) => w.unit === 'reps' && f(w)).reduce((a, w) => a + w.amount * (w.sets || 1), 0);
    switch (def.t) {
      case 'boss': return Math.round(ws.reduce((a, w) => a + xpForWorkout(Object.assign({}, w, { bonus: 1 })), 0) * (1 + G.stats().power / 100));
      case 'cat': return reps((w) => getCategoryForExercise(w.exercise, w.category) === def.cat);
      case 'ex': return reps((w) => w.exercise === def.ex);
      case 'variety': return new Set(ws.map((w) => w.exercise)).size;
      case 'sets': return ws.reduce((a, w) => a + (w.sets || 1), 0);
      case 'weighted': return ws.filter((w) => w.weight).reduce((a, w) => a + (w.sets || 1), 0);
      case 'cardio': return ws.filter((w) => w.unit === 'minutes').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
    }
    return 0;
  }
  function regionState(ri) { W.region[ri] = W.region[ri] || { stage: 0, start: null, done: false }; return W.region[ri]; }
  function regionUnlocked(ri) { return ri === 0 || (regionState(ri - 1).done && advLevel() >= REGIONS[ri].need); }

  function startStage(ri) { const rs = regionState(ri); rs.start = Date.now(); W.activeRegion = ri; save(); if (typeof haptic === 'function') haptic('medium'); G.sfx && G.sfx('win'); render(); }
  function claimStage(ri) {
    const rs = regionState(ri); const def = stageDef(ri, rs.stage);
    if (stageProgress(def, rs.start) < def.n) return;
    const coins = 80 * (ri + 1) * (rs.stage === 4 ? 3 : 1);
    if (rs.stage === 4) {
      rs.done = true; rs.start = null; W.activeRegion = null;
      const tier = [1, 1, 2, 2, 3, 3, 4, 5, 6, 7][ri];
      save();
      G.reward({ coins, gems: (ri + 1) * 2, items: [G.rollItemOfTier(tier).id] }, { label: `${REGIONS[ri].icon} ${REGIONS[ri].name} conquered!` });
      G.fireworks && G.fireworks(5);
      showToast(`🏰 ${DUNGEONS[ri].name} dungeon unlocked!`, null, null, 4000);
    } else {
      rs.stage++; rs.start = Date.now(); save();
      G.reward({ coins }, { label: `⭐ Stage cleared!` }); G.confetti && G.confetti(70);
    }
    render();
  }

  function mapHtml() {
    const lvl = advLevel();
    const act = W.activeRegion != null && regionState(W.activeRegion).start ? W.activeRegion : null;
    let cur = '';
    if (act != null) {
      const rs = regionState(act); const def = stageDef(act, rs.stage); const p = stageProgress(def, rs.start); const done = p >= def.n;
      cur = `<div class="card cur-quest" style="--rc:${REGIONS[act].c}"><div class="muted">${REGIONS[act].icon} ${REGIONS[act].name} · Stage ${rs.stage + 1}/5</div>
        <div class="cq-text">${esc(def.text)}</div><div class="muted">${esc(def.sub)}</div>
        <div class="xp-bar"><div class="fill" style="width:${Math.min(100, p / def.n * 100)}%"></div></div>
        <div class="muted">${Math.min(p, def.n)}/${def.n} · only workouts logged after you started count</div>
        ${done ? `<button class="gbtn" data-claim="${act}">⭐ Claim stage reward</button>` : ''}</div>`;
    }
    return `${cur}<div class="card"><div class="cardhead"><h2>🗺️ World Map</h2><span class="muted">Adventurer Lv ${lvl}</span></div>
      <div class="muted" style="margin-bottom:10px">Adventurer level = skill levels you've gained. Conquer a region (5 stages) + reach its level to unlock the next. Each conquered region unlocks a dungeon.</div>
      <div class="map">${REGIONS.map((rg, ri) => {
        const rs = regionState(ri); const unlocked = regionUnlocked(ri);
        const nodes = Array.from({ length: 5 }, (_, si) => { const st = rs.done || si < rs.stage ? 'done' : si === rs.stage && unlocked ? (rs.start ? 'active' : 'next') : 'locked'; return `<div class="node ${st} ${si === 4 ? 'boss' : ''}" style="left:${[12, 34, 56, 78, 50][si]}%;top:${[62, 30, 62, 30, 0][si] + (si === 4 ? 0 : 20)}px" ${st === 'next' || st === 'active' ? `data-node="${ri}"` : ''}>${st === 'done' ? '✓' : si === 4 ? rg.boss[1] : si + 1}</div>`; }).join('');
        return `<div class="region ${unlocked ? '' : 'locked'} ${rs.done ? 'done' : ''}" style="--rc:${rg.c}">
          <div class="rg-head"><span class="rg-ico">${rg.icon}</span><div><div class="rg-name">${rg.name}</div><div class="rg-lore">${unlocked ? esc(rg.lore) : ri > 0 && !regionState(ri - 1).done ? `🔒 Conquer ${REGIONS[ri - 1].name} first` : `🔒 Adventurer Lv ${rg.need} needed (you: ${lvl})`}</div></div>${rs.done ? '<span class="rg-done">CONQUERED</span>' : ''}</div>
          <div class="trail"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M12,82 C20,60 26,56 34,56 S50,82 56,82 S72,56 78,56 S62,14 50,14" fill="none" stroke="var(--rc)" stroke-width="1.2" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" opacity=".6"/></svg>${nodes}</div>
        </div>`;
      }).join('')}</div></div>`;
  }

  function stageSheet(ri) {
    const rs = regionState(ri); const def = stageDef(ri, rs.stage); const rg = REGIONS[ri];
    if (rs.start && W.activeRegion === ri) { const b = [...document.querySelectorAll('.cur-quest')][0]; if (b) b.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    const html = `<div class="casino"><div class="cz-title">${rg.icon} ${rg.name} — Stage ${rs.stage + 1}</div>
      <div class="cq-text">${esc(def.text)}</div><div class="muted">${esc(def.sub)}</div>
      <div class="muted">Reward: ${80 * (ri + 1) * (rs.stage === 4 ? 3 : 1)} 🪙${rs.stage === 4 ? ` + ${(ri + 1) * 2} 💎 + guaranteed ${G.TIERS[[1, 1, 2, 2, 3, 3, 4, 5, 6, 7][ri]].name} item` : ''}</div>
      ${W.activeRegion != null && W.activeRegion !== ri && regionState(W.activeRegion).start ? `<div class="muted" style="color:var(--orange)">This will pause your quest in ${REGIONS[W.activeRegion].name} (progress there restarts).</div>` : ''}
      <button class="gbtn" id="stGo">Begin quest</button></div>`;
    const sh = G.sheet(html, { center: true });
    sh.querySelector('#stGo').onclick = () => { if (W.activeRegion != null && W.activeRegion !== ri) regionState(W.activeRegion).start = null; G.closeSheet(true); startStage(ri); };
  }

  // =====================================================================
  // DUNGEON RUNS (roguelike)
  // =====================================================================
  const DUNGEONS = [
    { name: 'Meadow Burrows', icon: '🕳️', mobs: [['Giant Rat', '🐀'], ['Angry Bee', '🐝'], ['Mole', '🦔']], boss: ['Rat King', '🐀'] },
    { name: 'Goblin Warren', icon: '🪵', mobs: [['Goblin', '👺'], ['Spider', '🕷️'], ['Wild Boar', '🐗']], boss: ['Goblin Shaman', '🧌'] },
    { name: 'Iron Mines', icon: '⛏️', mobs: [['Rock Crab', '🦀'], ['Bat Swarm', '🦇'], ['Mine Troll', '🧌']], boss: ['Iron Golem', '🤖'] },
    { name: 'Sunken Crypt', icon: '⚰️', mobs: [['Skeleton', '💀'], ['Zombie', '🧟'], ['Ghost', '👻']], boss: ['Lich', '☠️'] },
    { name: 'Sand Tomb', icon: '🏺', mobs: [['Mummy', '🧟'], ['Scorpion', '🦂'], ['Jackal', '🐺']], boss: ['Pharaoh', '👑'] },
    { name: 'Ice Caverns', icon: '🧊', mobs: [['Ice Wolf', '🐺'], ['Yeti', '🦍'], ['Frost Wraith', '👻']], boss: ['Ice Queen', '👸'] },
    { name: 'Magma Depths', icon: '🌋', mobs: [['Fire Imp', '😈'], ['Salamander', '🦎'], ['Lava Hound', '🐕']], boss: ['Infernal Dragon', '🐉'] },
    { name: 'Void Labyrinth', icon: '🌀', mobs: [['Shade', '👤'], ['Void Eye', '👁️'], ['Nightmare', '🐴']], boss: ['The Unmaker', '🕳️'] },
    { name: 'Cloud Vault', icon: '☁️', mobs: [['Gryphon', '🦅'], ['Storm Sprite', '⚡'], ['Sky Serpent', '🐉']], boss: ['Thunderbird', '🦤'] },
    { name: 'Titan\'s Forge', icon: '⚒️', mobs: [['Forge Golem', '🗿'], ['Cyclops', '👁️'], ['Titan Guard', '🛡️']], boss: ['Forge-Father', '⚡'] }
  ];
  const RELICS = {
    lungs: { name: 'Iron Lungs', icon: '🫁', desc: 'Monsters have 15% less HP', hp: 0.85 },
    berserk: { name: 'Berserker Totem', icon: '🪓', desc: '+50% damage, monsters +20% HP', dmg: 1.5, hp: 1.2 },
    rabbit: { name: 'Lucky Rabbit Foot', icon: '🐇', desc: 'Treasure rooms pay double', treasure: 2 },
    phoenix: { name: 'Phoenix Feather', icon: '🪶', desc: 'Revive once with 1 heart', phoenix: true },
    vamp: { name: 'Vampire Fang', icon: '🧛', desc: '25% chance to heal a heart on kill', vamp: 0.25 },
    idol: { name: 'Golden Idol', icon: '🗿', desc: '+50% coins from rooms', coin: 1.5 },
    crit: { name: 'Crit Crystal', icon: '💠', desc: '+20% crit chance', crit: 20 },
    belt: { name: 'Giant\'s Belt', icon: '🎗️', desc: '+30% damage', dmg: 1.3 },
    glass: { name: 'Hourglass', icon: '⌛', desc: 'Elites have 30% less HP', elite: 0.7 }
  };
  const DOORS = { monster: ['⚔️', 'Monster', 'Fight for coins & loot'], elite: ['💀', 'Elite', 'Tough fight — win a relic'], treasure: ['💰', 'Treasure', 'Free loot, no fight'],
    rest: ['🔥', 'Campfire', 'Heal 1 heart'], shrine: ['⛩️', 'Shrine', 'Take a curse for a relic'] };

  function relicMod(run, key, def) { return run.relics.reduce((a, r) => { const v = RELICS[r][key]; return v == null ? a : typeof v === 'number' && typeof a === 'number' ? (key === 'crit' ? a + v : a * v) : v; }, def); }
  function floorsFor(di) { return 5 + Math.floor(di / 2); }

  function startRun(di) {
    W.run = { d: di, floor: 1, hearts: 3, maxHearts: 3, relics: [], loot: { coins: 0, gems: 0, items: [] }, seed: Date.now(), room: null, curse: 1, log: [] };
    save(); G.sfx && G.sfx('boom'); G.shake && G.shake(null, 6);
    if (typeof haptic === 'function') haptic('heavy'); render();
  }
  function doorChoices(run) {
    const rnd = G.seeded(run.seed + ':' + run.floor);
    if (run.floor === floorsFor(run.d)) return ['boss'];
    if (run.floor === 1) return ['monster', 'monster'];
    const pool = [['monster', 45], ['elite', 15], ['treasure', 13], ['rest', run.hearts < run.maxHearts ? 12 : 4], ['shrine', 11]];
    const out = []; let guard = 0;
    while (out.length < 3 && guard++ < 40) {
      const tot = pool.reduce((a, p) => a + p[1], 0); let r = rnd() * tot; let pick = 'monster';
      for (const p of pool) { r -= p[1]; if (r <= 0) { pick = p[0]; break; } }
      if (!out.includes(pick) || pick === 'monster' && out.filter((x) => x === 'monster').length < 2) out.push(pick);
    }
    return out;
  }
  function enterDoor(type) {
    const run = W.run; if (!run || run.room) return;
    const rnd = G.seeded(run.seed + ':room' + run.floor + type);
    const dg = DUNGEONS[run.d]; const d = run.d;
    if (type === 'monster' || type === 'elite' || type === 'boss') {
      const ex = pickR(pickableExercises().filter((e) => e.unit === 'reps'), rnd);
      const mob = type === 'boss' ? dg.boss : pickR(dg.mobs, rnd);
      let hp = (12 + 4 * d + 2 * run.floor) * (type === 'elite' ? 1.8 * relicMod(run, 'elite', 1) : type === 'boss' ? 3 : 1);
      hp = Math.round(hp * relicMod(run, 'hp', 1) * run.curse);
      run.room = { type, mob, ex: ex.name, exIcon: ex.icon, hp, max: hp };
    } else if (type === 'treasure') {
      const mult = relicMod(run, 'treasure', 1);
      const c = Math.round((40 + 25 * d) * mult);
      run.loot.coins += c;
      let got = `💰 Found ${c} coins`;
      if (rnd() < 0.5 * mult) { const it = G.rollItemOfTier(Math.min(7, G.rollTier([40, 30, 18, 8, 3, 0.8, 0.15, 0.03], G.stats().luck) + Math.floor(d / 3))); run.loot.items.push(it.id); got += ` and ${it.icon} ${it.name}`; }
      run.log.unshift(got); nextFloor(); G.sfx && G.sfx('coin'); G.sparks && G.sparks(innerWidth / 2, innerHeight / 2, '#f5c542', 30);
      return;
    } else if (type === 'rest') {
      run.hearts = Math.min(run.maxHearts, run.hearts + 1); run.log.unshift('🔥 Rested at a campfire (+1 ❤️)'); nextFloor(); G.sfx && G.sfx('win'); return;
    } else if (type === 'shrine') { shrineSheet(); return; }
    save(); render();
  }
  function nextFloor() { const run = W.run; run.room = null; run.floor++; save(); render(); }
  function offerRelic(cb) {
    const run = W.run; const rnd = G.seeded(run.seed + ':relic' + run.floor + run.relics.length);
    const avail = Object.keys(RELICS).filter((k) => !run.relics.includes(k));
    const opts = []; while (opts.length < Math.min(3, avail.length)) { const k = pickR(avail, rnd); if (!opts.includes(k)) opts.push(k); }
    if (!opts.length) { cb && cb(); return; }
    const html = `<div class="casino"><div class="cz-title">✨ Choose a Relic</div><div class="muted">Relics last for this run only</div>
      ${opts.map((k) => `<button class="relic-opt" data-relic="${k}"><span>${RELICS[k].icon}</span><div><b>${RELICS[k].name}</b><div class="muted">${RELICS[k].desc}</div></div></button>`).join('')}</div>`;
    const sh = G.sheet(html, { center: true, noClose: true, lock: true });
    sh.querySelectorAll('[data-relic]').forEach((b) => (b.onclick = () => { run.relics.push(b.dataset.relic); run.log.unshift(`✨ Took relic: ${RELICS[b.dataset.relic].icon} ${RELICS[b.dataset.relic].name}`); save(); G.sfx && G.sfx('rare'); G.closeSheet(true); cb && cb(); render(); }));
  }
  function shrineSheet() {
    const html = `<div class="casino"><div class="cz-title">⛩️ Mysterious Shrine</div><div class="muted">A voice whispers: "Power… for a price."</div>
      <button class="relic-opt" id="shCurse"><span>🩸</span><div><b>Accept the curse</b><div class="muted">Monsters get +25% HP for the rest of the run → choose a relic</div></div></button>
      <button class="relic-opt" id="shGamble"><span>🎲</span><div><b>Offer a heart</b><div class="muted">Lose 1 ❤️ — 60% chance of a rare+ item, 40% nothing</div></div></button>
      <button class="relic-opt" id="shLeave"><span>🚶</span><div><b>Walk away</b><div class="muted">Nothing happens</div></div></button></div>`;
    const sh = G.sheet(html, { center: true, noClose: true, lock: true });
    const run = W.run;
    sh.querySelector('#shCurse').onclick = () => { run.curse *= 1.25; run.log.unshift('🩸 Accepted the shrine\'s curse'); G.closeSheet(true); offerRelic(() => nextFloor()); };
    sh.querySelector('#shGamble').onclick = () => {
      G.closeSheet(true); loseHeart('⛩️ Offered a heart at the shrine');
      if (!W.run) return;
      if (Math.random() < 0.6) { const it = G.rollItemOfTier(Math.min(7, 2 + Math.floor(run.d / 2) + (Math.random() < 0.2 ? 1 : 0))); run.loot.items.push(it.id); run.log.unshift(`🎲 The shrine grants ${it.icon} ${it.name}!`); G.sfx && G.sfx('rare'); G.confetti && G.confetti(60); }
      else { run.log.unshift('🎲 The shrine takes your heart… and gives nothing'); G.sfx && G.sfx('lose'); }
      nextFloor();
    };
    sh.querySelector('#shLeave').onclick = () => { G.closeSheet(true); run.log.unshift('🚶 Walked past the shrine'); nextFloor(); };
  }
  function loseHeart(why) {
    const run = W.run; run.hearts--; run.log.unshift(why + ' (-1 ❤️)');
    G.shake && G.shake(null, 10); G.sfx && G.sfx('lose'); if (typeof haptic === 'function') haptic('error');
    if (run.hearts <= 0) {
      const pi = run.relics.indexOf('phoenix');
      if (pi >= 0) { run.relics.splice(pi, 1); run.hearts = 1; run.log.unshift('🪶 The Phoenix Feather revives you!'); G.sparks && G.sparks(innerWidth / 2, innerHeight / 2, '#ff7a3d', 50); save(); return; }
      endRun(false);
    } else save();
  }
  function dungeonAttack() {
    const run = W.run; if (!run || !run.room || run.room.hp <= 0) return;
    const inp = document.getElementById('dgReps'); const reps = Number(inp && inp.value);
    if (!reps || reps < 1) { showToast('Enter how many reps you did'); return; }
    const st = G.stats();
    const crit = Math.random() * 100 < Math.min(80, st.critChance + relicMod(run, 'crit', 0));
    const dmg = Math.max(1, Math.round(reps * (1 + st.power / 100) * relicMod(run, 'dmg', 1) * (crit ? 2 : 1)));
    run.room.hp -= dmg;
    const room = run.room;
    run.log.unshift(`${crit ? '💥 CRIT! ' : '⚔️ '}${reps} ${room.ex} → ${dmg} dmg to ${room.mob[0]}`);
    const killed = room.hp <= 0;
    if (killed) onRoomCleared();
    save();
    // log the real workout (persist re-renders everything)
    workouts.push({ id: Date.now(), exercise: room.ex, amount: reps, sets: 1, unit: 'reps', date: today(), time: new Date().toTimeString().slice(0, 5),
      isPR: false, feeling: '💪', notes: `Dungeon: ${DUNGEONS[run.d].name} F${run.floor}`, weight: null, category: null });
    persist();
    const el = document.getElementById('dgMob');
    if (el && G.fxHit) G.fxHit(el, dmg, crit);
  }
  function onRoomCleared() {
    const run = W.run; const room = run.room; const d = run.d;
    const coinM = relicMod(run, 'coin', 1);
    const c = Math.round((room.type === 'boss' ? 300 + 150 * d : room.type === 'elite' ? 60 + 30 * d : 25 + 15 * d) * coinM);
    run.loot.coins += c;
    let msg = `🏆 ${room.mob[1]} ${room.mob[0]} defeated! +${c} coins`;
    if (room.type === 'boss' || (room.type === 'elite' && Math.random() < 0.6) || Math.random() < 0.18) {
      const base = room.type === 'boss' ? Math.min(6, 2 + Math.floor(d / 2)) : Math.floor(d / 3);
      const it = G.rollItemOfTier(Math.min(7, base + G.rollTier([60, 28, 9, 2.5, 0.5, 0, 0, 0], G.stats().luck)));
      run.loot.items.push(it.id); msg += ` · ${it.icon} ${it.name}`;
    }
    if (room.type === 'boss') run.loot.gems += d + 2;
    run.log.unshift(msg);
    if (run.relics.includes('vamp') && Math.random() < 0.25 && run.hearts < run.maxHearts) { run.hearts++; run.log.unshift('🧛 Vampire Fang heals 1 ❤️'); }
    G.sfx && G.sfx('win');
    if (room.type === 'boss') { room.hp = 0; save(); setTimeout(() => endRun(true), 700); return; }
    if (room.type === 'elite') { room.hp = 0; save(); setTimeout(() => offerRelic(() => nextFloor()), 600); return; }
    run.room = null; run.floor++;
  }
  function flee() { const run = W.run; if (!run || !run.room) return; const room = run.room; run.room = null; loseHeart(`🏃 Fled from ${room.mob[0]}`); if (W.run) nextFloor(); }
  function retreat() {
    const run = W.run; if (!run) return;
    if (!confirm('Retreat and keep all loot gathered so far?')) return;
    endRun(false, true);
  }
  function endRun(won, retreated) {
    const run = W.run; if (!run) return;
    const dg = DUNGEONS[run.d]; const rec = (W.dungeons[run.d] = W.dungeons[run.d] || { best: 0, clears: 0 });
    rec.best = Math.max(rec.best, won ? floorsFor(run.d) : run.floor - 1);
    let r = { coins: run.loot.coins, gems: run.loot.gems, items: run.loot.items.slice() };
    let label;
    if (won) {
      rec.clears++; if (rec.clears === 1) r.gems += 5;
      label = `🏰 ${dg.name} CLEARED${rec.clears === 1 ? ' (first clear +5 💎)' : ''}!`;
    } else if (retreated) label = `🚪 Escaped ${dg.name} with your loot`;
    else { r = { coins: Math.floor(r.coins / 2), gems: 0, items: [] }; label = `💀 Fell on floor ${run.floor} — kept half the coins`; }
    W.run = null; save();
    G.reward(r, { label });
    if (won) { G.fireworks && G.fireworks(6); G.goldenRain && G.goldenRain(); }
    render();
  }
  G.dungeonAddHeart = () => { const run = W.run; if (!run) return false; run.hearts = Math.min(5, run.hearts + 1); run.maxHearts = Math.max(run.maxHearts, run.hearts); save(); return true; };

  function dungeonsHtml() {
    const run = W.run;
    if (run) {
      const dg = DUNGEONS[run.d]; const F = floorsFor(run.d);
      const hearts = '❤️'.repeat(Math.max(0, run.hearts)) + '🖤'.repeat(Math.max(0, run.maxHearts - run.hearts));
      let mid = '';
      if (run.room) {
        const rm = run.room;
        mid = `<div class="dg-room ${rm.type}"><div class="dg-mob" id="dgMob">${rm.mob[1]}</div><div class="dg-mobname">${rm.type === 'boss' ? '👑 BOSS: ' : rm.type === 'elite' ? '💀 ELITE: ' : ''}${esc(rm.mob[0])}</div>
          <div class="xp-bar" style="height:10px"><div class="fill" style="width:${Math.max(0, rm.hp / rm.max * 100)}%;background:var(--red)"></div></div>
          <div class="muted">${Math.max(0, rm.hp)}/${rm.max} HP · Weapon: <b>${rm.exIcon} ${esc(rm.ex)}</b></div>
          <div class="fields" style="margin-top:8px"><div><input id="dgReps" type="number" inputmode="numeric" min="1" placeholder="Reps of ${escAttr(rm.ex)}"></div><div><button class="gbtn" id="dgHit" style="margin:0">⚔️ Attack</button></div></div>
          <div class="row2"><button class="gbtn ghost sm" id="dgFlee">🏃 Flee (-1 ❤️)</button></div></div>`;
      } else {
        const ch = doorChoices(run);
        mid = `<div class="muted" style="margin:6px 0">${ch[0] === 'boss' ? 'The boss chamber looms…' : 'Choose your path:'}</div><div class="doors">${ch.map((t) => {
          const d = t === 'boss' ? ['👑', dg.boss[0], 'Final boss — big loot'] : DOORS[t];
          return `<button class="dgdoor ${t}" data-door="${t}"><span class="dd-ico">${t === 'boss' ? dg.boss[1] : d[0]}</span><b>${esc(d[1])}</b><span class="muted">${d[2]}</span></button>`;
        }).join('')}</div>
        <button class="gbtn ghost" id="dgRetreat">🚪 Retreat & keep loot</button>`;
      }
      return `<div class="card dg-run"><div class="cardhead"><h2>${dg.icon} ${dg.name}</h2><span class="muted">Floor ${Math.min(run.floor, F)}/${F}</span></div>
        <div class="dg-bar"><span>${hearts}</span><span>🪙 ${run.loot.coins}${run.loot.gems ? ` · 💎 ${run.loot.gems}` : ''} · 🎁 ${run.loot.items.length}</span></div>
        <div class="floors">${Array.from({ length: F }, (_, i) => `<span class="${i + 1 < run.floor ? 'done' : i + 1 === run.floor ? 'cur' : ''}">${i + 1 === F ? '👑' : ''}</span>`).join('')}</div>
        ${run.relics.length ? `<div class="relics">${run.relics.map((r) => `<span title="${escAttr(RELICS[r].desc)}">${RELICS[r].icon} ${RELICS[r].name}</span>`).join('')}</div>` : ''}
        ${mid}
        <div class="dg-log">${run.log.slice(0, 5).map((l) => `<div>${esc(l)}</div>`).join('')}</div></div>`;
    }
    return `<div class="card"><div class="cardhead"><h2>🏰 Dungeons</h2></div>
      <div class="muted" style="margin-bottom:8px">Roguelike runs: pick doors floor by floor, fight with real reps, grab relics, beat the boss. 3 hearts — fleeing or shrine offerings cost one. Die and you keep only half the coins; retreat any time between rooms to keep everything.</div>
      ${DUNGEONS.map((dg, i) => { const open = regionState(i).done; const rec = W.dungeons[i] || {};
        return `<div class="crate ${open ? '' : 'locked'}"><div class="crate-ico">${dg.icon}</div><div class="crate-main"><div class="crate-name">${dg.name}</div>
          <div class="muted">${open ? `${floorsFor(i)} floors · Boss ${dg.boss[1]} ${dg.boss[0]}${rec.clears ? ` · cleared ${rec.clears}×` : rec.best ? ` · best floor ${rec.best}` : ''}` : `🔒 Conquer ${REGIONS[i].name} on the map`}</div></div>
          ${open ? `<button class="gbtn sm" data-run="${i}">Enter</button>` : ''}</div>`; }).join('')}</div>`;
  }

  // =====================================================================
  // RENDER
  // =====================================================================
  let wtab = 'map';
  G.renderWorld = function () {
    renderEventStrip();
    const banner = document.getElementById('eventBanner'); if (banner) banner.innerHTML = eventCardHtml();
    const root = document.getElementById('worldRoot'); if (!root) return;
    root.innerHTML = `<div class="subtabs"><button class="stab ${wtab === 'map' ? 'on' : ''}" data-wt="map">🗺️ Map</button><button class="stab ${wtab === 'dg' ? 'on' : ''}" data-wt="dg">🏰 Dungeons${W.run ? ' •' : ''}</button></div>
      ${wtab === 'map' ? mapHtml() : dungeonsHtml()}`;
    root.querySelectorAll('[data-wt]').forEach((b) => (b.onclick = () => { wtab = b.dataset.wt; G.renderWorld(); G.sfx && G.sfx('tick'); }));
    root.querySelectorAll('[data-node]').forEach((b) => (b.onclick = () => stageSheet(Number(b.dataset.node))));
    root.querySelectorAll('[data-claim]').forEach((b) => (b.onclick = () => claimStage(Number(b.dataset.claim))));
    root.querySelectorAll('[data-run]').forEach((b) => (b.onclick = () => startRun(Number(b.dataset.run))));
    root.querySelectorAll('[data-door]').forEach((b) => (b.onclick = () => enterDoor(b.dataset.door)));
    const hit = document.getElementById('dgHit'); if (hit) hit.onclick = dungeonAttack;
    const reps = document.getElementById('dgReps'); if (reps) reps.onkeydown = (e) => { if (e.key === 'Enter') dungeonAttack(); };
    const fl = document.getElementById('dgFlee'); if (fl) fl.onclick = flee;
    const rt = document.getElementById('dgRetreat'); if (rt) rt.onclick = retreat;
    const es = document.getElementById('evShopBtn'); if (es) es.onclick = () => eventShop(activeEvent());
    if (banner) banner.querySelectorAll('[data-adv]').forEach((b) => (b.onclick = () => openDoor(activeEvent(), Number(b.dataset.adv))));
    placeEgg();
  };
  G.on('render', () => { try { G.renderWorld(); } catch (e) { console.warn('world', e); } });
  G.goWorld = (sub) => { if (sub) wtab = sub; };

  // =====================================================================
  // BOOT (last module loaded)
  // =====================================================================
  G.applyLooks && G.applyLooks();
  G.initLoot && G.initLoot();
  if (typeof render === 'function') render();
  setInterval(() => { if (document.visibilityState === 'visible') { renderEventStrip(); G.applyLooks && G.applyLooks(); } }, 60000);
})();
