/* Pulse — economy, loot & gambling.
   Coins come from training (capped per day), gems from bosses/events/milestones, dust from salvaging.
   Everything is earned by working out — there is no real money anywhere. */
(function () {
  const G = (window.G = window.G || {});
  const LKEY = 'pulse-loot-v1';
  const coinCap = () => 2000 + 500 * (G.talent ? G.talent('grind') : 0);
  const dropCap = () => 5 + (G.talent ? G.talent('scavenger') : 0);
  const BAG_SIZE = 28;

  // ---------------- tiers ----------------
  const TIERS = [
    { id: 'common', name: 'Common', color: '#9aa4af', rgb: '154,164,175' },
    { id: 'uncommon', name: 'Uncommon', color: '#49e39a', rgb: '73,227,154' },
    { id: 'rare', name: 'Rare', color: '#5aa8ff', rgb: '90,168,255' },
    { id: 'epic', name: 'Epic', color: '#a78bfa', rgb: '167,139,250' },
    { id: 'legendary', name: 'Legendary', color: '#ffb84d', rgb: '255,184,77' },
    { id: 'mythical', name: 'Mythical', color: '#ff5d8f', rgb: '255,93,143' },
    { id: 'godly', name: 'Godly', color: '#ffe066', rgb: '255,224,102' },
    { id: 'celestial', name: 'Celestial', color: '#ffffff', rgb: '255,255,255' }
  ];
  const TMULT = [1, 1.6, 2.5, 4, 6.5, 10, 16, 26];
  const MATERIALS = ['Bronze', 'Steel', 'Mithril', 'Adamant', 'Rune', 'Dragon', 'Godforged', 'Starborn'];
  const SALVAGE = [2, 5, 12, 30, 75, 180, 450, 1200];
  const SHOP_PRICE = [80, 200, 500, 1300, 3500, 9000, 25000, 70000];
  G.TIERS = TIERS;

  const SLOTS = [
    { id: 'weapon', name: 'Weapon', icon: '⚔️' }, { id: 'helm', name: 'Head', icon: '⛑️' },
    { id: 'body', name: 'Body', icon: '🦺' }, { id: 'legs', name: 'Legs', icon: '👖' },
    { id: 'gloves', name: 'Hands', icon: '🧤' }, { id: 'boots', name: 'Feet', icon: '👟' },
    { id: 'ring', name: 'Ring', icon: '💍' }, { id: 'amulet', name: 'Neck', icon: '📿' }
  ];
  const ARMOUR = ['helm', 'body', 'legs', 'gloves', 'boots'];
  const STAT_LABEL = { power: '⚔️ Power', xp: '✨ XP', coin: '🪙 Coins', crit: '💥 Crit', luck: '🍀 Luck' };

  const BASES = [
    { key: 'mace', slot: 'weapon', name: 'Dumbbell Mace', icon: '🔨', stats: { power: 5 } },
    { key: 'flail', slot: 'weapon', name: 'Kettlebell Flail', icon: '⛓️', stats: { power: 4, crit: 1 } },
    { key: 'halberd', slot: 'weapon', name: 'Barbell Halberd', icon: '🔱', stats: { power: 6 } },
    { key: 'whip', slot: 'weapon', name: 'Jump-Rope Whip', icon: '🪢', stats: { power: 3, crit: 2 } },
    { key: 'hammer', slot: 'weapon', name: 'Plate Hammer', icon: '⚒️', stats: { power: 5, coin: 1 } },
    { key: 'helm', slot: 'helm', name: 'Sweatband Helm', icon: '⛑️', stats: { xp: 3 } },
    { key: 'body', slot: 'body', name: 'Compression Platebody', icon: '🦺', stats: { power: 2, xp: 2 } },
    { key: 'legs', slot: 'legs', name: 'Squat Legguards', icon: '👖', stats: { power: 3 } },
    { key: 'gloves', slot: 'gloves', name: 'Lifting Gauntlets', icon: '🧤', stats: { crit: 2 } },
    { key: 'boots', slot: 'boots', name: 'Sprinter Boots', icon: '👟', stats: { coin: 3 } },
    { key: 'gains', slot: 'ring', name: 'Ring of Gains', icon: '💍', stats: { xp: 3 } },
    { key: 'fortune', slot: 'ring', name: 'Ring of Fortune', icon: '💍', stats: { luck: 4 } },
    { key: 'wealth', slot: 'ring', name: 'Ring of Wealth', icon: '💍', stats: { coin: 4 } },
    { key: 'protein', slot: 'amulet', name: 'Amulet of Protein', icon: '📿', stats: { xp: 3, power: 1 } },
    { key: 'rage', slot: 'amulet', name: 'Amulet of Rage', icon: '📿', stats: { crit: 2, power: 2 } }
  ];

  const CATALOG = [];
  const BY_ID = {};
  function reg(it) { if (BY_ID[it.id]) return; CATALOG.push(it); BY_ID[it.id] = it; }
  G.registerItems = (arr) => arr.forEach(reg);
  G.item = (id) => BY_ID[id];
  G.CATALOG = CATALOG;

  const r1 = (v) => Math.round(v * 10) / 10;
  BASES.forEach((b) => {
    for (let t = 0; t < 8; t++) {
      const stats = {};
      Object.keys(b.stats).forEach((k) => (stats[k] = r1(b.stats[k] * TMULT[t])));
      reg({ id: `${b.key}_${t}`, name: `${MATERIALS[t]} ${b.name}`, icon: b.icon, tier: t, type: 'gear', slot: b.slot, stats,
        set: ARMOUR.includes(b.slot) ? t : null });
    }
  });

  // Named uniques — only drop at their own tier, stronger than a regular item of that tier
  [
    ['excalibar', 'Excalibar', '🗡️', 4, 'weapon', { power: 38, crit: 4 }, 'Pulled from a squat rack of stone.'],
    ['crown_consistency', 'Crown of Consistency', '👑', 4, 'helm', { xp: 22, luck: 6 }, 'Worn by those who never miss a Monday.'],
    ['grip_of_iron', 'Grip of Iron', '✊', 4, 'gloves', { crit: 12, power: 6 }, 'Never drops the bar. Ever.'],
    ['mjolnir_kb', 'Mjölnir Kettlebell', '🔨', 5, 'weapon', { power: 62, crit: 8 }, 'Only the worthy can swing it.'],
    ['phoenix_plume', 'Phoenix Plume', '🪶', 5, 'amulet', { xp: 24, luck: 20 }, 'Rises from every rest day.'],
    ['hydra_fang', 'Hydra Fang', '🦷', 5, 'weapon', { power: 48, crit: 22 }, 'Cut one set, two more appear.'],
    ['hand_hercules', 'Hand of Hercules', '✊', 6, 'gloves', { power: 40, crit: 30 }, 'Twelve labours. Zero skipped leg days.'],
    ['aegis_atlas', 'Aegis of Atlas', '🛡️', 6, 'body', { power: 40, xp: 40 }, 'Holds up the sky. And a 300kg squat.'],
    ['olympus_band', 'Band of Olympus', '💍', 6, 'ring', { xp: 50, coin: 30 }, 'Forged where the gods do cardio.'],
    ['starforged_barbell', 'Starforged Barbell', '🌠', 7, 'weapon', { power: 160, crit: 20 }, 'Each plate is a collapsed star.'],
    ['cosmic_crown', 'Cosmic Crown', '👑', 7, 'helm', { xp: 90, luck: 40 }, 'The universe spots you.'],
    ['band_eternity', 'Band of Eternity', '♾️', 7, 'ring', { xp: 60, coin: 60, luck: 30 }, 'A streak that never ends.']
  ].forEach(([id, name, icon, tier, slot, stats, desc]) => reg({ id, name, icon, tier, slot, stats, desc, type: 'gear', unique: true }));

  // Consumables (stack)
  [
    ['xp_potion', 'Potion of Gains', '🧪', 1, '2× XP on workouts for 30 min', { k: 'xp', mult: 2, mins: 30 }],
    ['coin_potion', 'Potion of Greed', '🍯', 1, '2× coins on workouts for 30 min', { k: 'coin', mult: 2, mins: 30 }],
    ['quest_scroll', 'Scroll of Rerolling', '📜', 1, 'Rerolls today\'s daily quests'],
    ['luck_potion', 'Elixir of Luck', '🍀', 2, '+100% luck (better drops) for 30 min', { k: 'luck', add: 100, mins: 30 }],
    ['streak_shield', 'Streak Shield', '🛡️', 2, 'Marks yesterday as a rest day to protect your streak'],
    ['heart_crystal', 'Heart Crystal', '❤️', 3, '+1 heart in your current dungeon run'],
    ['boss_bomb', 'Boss Bomb', '💣', 3, 'Deals 750 damage to your active boss'],
    ['mega_xp', 'Titan\'s Brew', '⚗️', 4, '3× XP on workouts for 60 min', { k: 'xp', mult: 3, mins: 60 }]
  ].forEach(([id, name, icon, tier, desc, effect]) => reg({ id, name, icon, tier, desc, effect, type: 'cons' }));

  // Themes (recolour the app)
  const THEMES = {
    theme_emerald: { a: '#49e39a', b: '#5aa8ff' },
    theme_ocean: { a: '#38d6ff', b: '#4f7dff' },
    theme_inferno: { a: '#ff7a3d', b: '#ff3d6e' },
    theme_amethyst: { a: '#b48cff', b: '#ff7ad9' },
    theme_gold: { a: '#ffd04d', b: '#ff9f43' },
    theme_bloodmoon: { a: '#ff4d6a', b: '#b3123a' },
    theme_void: { a: '#c3b5ff', b: '#6c5ce7' },
    theme_aurora: { a: '#5effc8', b: '#c77dff', c: '#ffd166' }
  };
  G.THEMES = THEMES;
  [
    ['theme_emerald', 'Emerald (default)', 0], ['theme_ocean', 'Ocean Theme', 2], ['theme_inferno', 'Inferno Theme', 3],
    ['theme_amethyst', 'Amethyst Theme', 3], ['theme_gold', 'Royal Gold Theme', 4], ['theme_bloodmoon', 'Blood Moon Theme', 5],
    ['theme_void', 'Void Theme', 6], ['theme_aurora', 'Aurora Theme', 7]
  ].forEach(([id, name, tier]) => reg({ id, name, icon: '🎨', tier, type: 'theme', desc: 'Recolours the whole app', noDrop: id === 'theme_emerald' }));

  // Titles (shown under the logo)
  [['title_gymrat', 'Gym Rat', 0], ['title_ironwill', 'Iron Will', 1], ['title_beast', 'Beast Mode', 2], ['title_unbreakable', 'Unbreakable', 3],
   ['title_legend', 'Living Legend', 4], ['title_mythic', 'Mythic Lifter', 5], ['title_demigod', 'Demigod', 6], ['title_celestial', 'Celestial Being', 7]]
    .forEach(([id, name, tier]) => reg({ id, name, icon: '🏷️', tier, type: 'title', desc: 'A title shown under the Pulse logo' }));

  // ---------------- state ----------------
  let S;
  function load() {
    try { S = JSON.parse(localStorage.getItem(LKEY) || 'null'); } catch (e) { S = null; }
    if (!S) S = { fresh: true };
    S.coins = S.coins || 0; S.gems = S.gems || 0; S.dust = S.dust || 0;
    S.items = S.items || []; S.equip = S.equip || {}; S.effects = S.effects || {};
    S.seen = S.seen || []; S.log = S.log || {}; S.stats = S.stats || {};
    S.pity = S.pity || 0; S.uid = S.uid || 1; S.questPaid = S.questPaid || {}; S.streakPaid = S.streakPaid || [];
    S.owned = S.owned || ['theme_emerald'];
    S.daily = S.daily || {};
  }
  load();
  G.state = () => S;
  function save() { localStorage.setItem(LKEY, JSON.stringify(S)); updateWallet(); }
  G.saveLoot = save;

  function today() { return dateKey(new Date()); }
  function daily() {
    if (S.daily.date !== today()) S.daily = { date: today(), coins: 0, drops: 0, spin: false };
    return S.daily;
  }

  // ---------------- seeded RNG ----------------
  function hash(str) { let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); } return h >>> 0; }
  function mulberry(a) { return function () { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  G.seeded = (s) => mulberry(hash(String(s)));
  G.hash = hash;

  // ---------------- stats ----------------
  function instStats(inst) {
    const it = BY_ID[inst.id]; const out = {};
    if (!it || !it.stats) return out;
    Object.keys(it.stats).forEach((k) => (out[k] = r1(it.stats[k] * (1 + 0.12 * (inst.ench || 0)))));
    return out;
  }
  G.instStats = instStats;
  function findInst(uid) { return S.items.find((i) => i.uid === uid); }
  function setBonus() {
    const tiers = ARMOUR.map((s) => { const inst = findInst(S.equip[s]); const it = inst && BY_ID[inst.id]; return it && it.set != null ? it.set : null; });
    if (tiers.some((t) => t === null)) return null;
    if (tiers.every((t) => t === tiers[0])) return { tier: tiers[0], pct: (tiers[0] + 1) * 4 };
    return null;
  }
  G.stats = function () {
    const s = { power: 0, xp: 0, coin: 0, crit: 0, luck: 0 };
    Object.values(S.equip).forEach((uid) => { const inst = findInst(uid); if (!inst) return; const st = instStats(inst); Object.keys(st).forEach((k) => (s[k] += st[k])); });
    const sb = setBonus();
    if (sb) { s.power += sb.pct; s.xp += sb.pct; s.coin += sb.pct; }
    // class perks, traits, talents and weak points from the Hero sheet
    [G.heroBonus, G.petBonus, G.villageBonus, G.bondBonus].forEach((fn) => { try { const hb = fn ? fn() : null; if (hb) Object.keys(s).forEach((k) => { if (hb[k]) s[k] += hb[k]; }); } catch (e) {} });
    const now = Date.now(); const e = S.effects;
    let xpMult = 1, coinMult = 1;
    if (e.xp && e.xp.until > now) xpMult *= e.xp.mult;
    if (e.coin && e.coin.until > now) coinMult *= e.coin.mult;
    if (e.luck && e.luck.until > now) s.luck += e.luck.add;
    const ev = G.eventMods ? G.eventMods() : null;
    if (ev) { xpMult *= ev.xp || 1; coinMult *= ev.coin || 1; s.luck += ev.luck || 0; }
    Object.keys(s).forEach((k) => (s[k] = r1(s[k])));
    s.power = Math.max(-50, s.power);
    s.critChance = Math.max(0, Math.min(60, 5 + s.crit));
    s.xpMult = r1((1 + s.xp / 100) * xpMult * 100) / 100;
    s.coinMult = r1((1 + s.coin / 100) * coinMult * 100) / 100;
    s.set = sb;
    return s;
  };
  G.rollDamage = function (reps) {
    const st = G.stats();
    const crit = Math.random() * 100 < st.critChance;
    return { dmg: Math.max(1, Math.round(reps * (1 + st.power / 100) * (crit ? 2 : 1))), crit };
  };

  // ---------------- inventory ----------------
  function equippedUids() { return new Set(Object.values(S.equip)); }
  function bagItems() { const eq = equippedUids(); return S.items.filter((i) => !i.bank && !eq.has(i.uid)); }
  function addItem(id, qty = 1) {
    const it = BY_ID[id]; if (!it) return null;
    S.log[id] = (S.log[id] || 0) + qty;
    if (it.type === 'theme' || it.type === 'title') {
      if (S.owned.includes(id)) { const d = SALVAGE[it.tier] * 2; S.dust += d; return { dup: true, dust: d, it }; }
      S.owned.push(id); return { it, cosmetic: true };
    }
    if (it.type === 'cons') {
      let inst = S.items.find((i) => i.id === id);
      if (inst) inst.qty = (inst.qty || 1) + qty;
      else { inst = { uid: S.uid++, id, qty }; if (bagItems().length >= BAG_SIZE) inst.bank = true; S.items.push(inst); }
      return { it, inst };
    }
    const inst = { uid: S.uid++, id, ench: 0 };
    if (bagItems().length >= BAG_SIZE) inst.bank = true;
    S.items.push(inst);
    return { it, inst };
  }
  G.addItem = (id, qty) => { const r = addItem(id, qty); save(); return r; };
  function removeInst(uid) {
    Object.keys(S.equip).forEach((k) => { if (S.equip[k] === uid) delete S.equip[k]; });
    S.items = S.items.filter((i) => i.uid !== uid);
  }
  G.consume = function (id) {
    const inst = S.items.find((i) => i.id === id && (i.qty || 0) > 0);
    if (!inst) return false;
    inst.qty--; if (inst.qty <= 0) removeInst(inst.uid);
    save(); return true;
  };
  G.countOf = (id) => { const inst = S.items.find((i) => i.id === id); return inst ? inst.qty || 0 : 0; };

  // ---------------- rolling loot ----------------
  const CRATES = [
    { id: 'wood', name: 'Wooden Crate', icon: '📦', cost: 150, cur: 'coins', w: [60, 28, 9, 2.5, 0.45, 0.04, 0.01, 0.001] },
    { id: 'iron', name: 'Iron Crate', icon: '🗃️', cost: 400, cur: 'coins', w: [30, 38, 20, 9, 2.4, 0.5, 0.09, 0.01] },
    { id: 'gold', name: 'Gold Crate', icon: '🧰', cost: 1000, cur: 'coins', w: [0, 30, 38, 22, 8, 1.6, 0.35, 0.05] },
    { id: 'mythic', name: 'Mythic Crate', icon: '🎁', cost: 3000, cur: 'coins', w: [0, 0, 25, 40, 25, 8, 1.7, 0.3] },
    { id: 'celestial', name: 'Celestial Crate', icon: '🌌', cost: 40, cur: 'gems', w: [0, 0, 0, 30, 40, 22, 6.5, 1.5] }
  ];
  G.CRATES = CRATES;
  function rollTier(weights, luck) {
    const l = 1 + Math.max(0, luck || 0) / 100;
    const w = weights.map((x, i) => (i >= 3 ? x * l : x));
    const tot = w.reduce((a, b) => a + b, 0);
    let r = Math.random() * tot;
    for (let i = 0; i < w.length; i++) { r -= w[i]; if (r <= 0) return i; }
    return w.length - 1;
  }
  G.rollTier = rollTier;
  function rollItemOfTier(tier, rnd = Math.random) {
    const roll = rnd();
    let pool;
    if (roll < 0.72) pool = CATALOG.filter((i) => i.type === 'gear' && i.tier === tier && !i.event && !i.noDrop && !i.special);
    else if (roll < 0.9) pool = CATALOG.filter((i) => i.type === 'cons' && i.tier === Math.min(tier, 4));
    else pool = CATALOG.filter((i) => (i.type === 'theme' || i.type === 'title') && i.tier === tier && !i.noDrop && !i.event && !i.special);
    if (!pool.length) pool = CATALOG.filter((i) => i.type === 'gear' && i.tier === tier && !i.event && !i.special);
    // uniques are rarer than regular items of the same tier
    const weighted = []; pool.forEach((i) => { const n = i.unique ? 1 : 3; for (let k = 0; k < n; k++) weighted.push(i); });
    return weighted[Math.floor(rnd() * weighted.length)];
  }
  G.rollItemOfTier = rollItemOfTier;
  G.rollDrop = function (weights) { return rollItemOfTier(rollTier(weights, G.stats().luck)); };

  // ---------------- rewards ----------------
  const popupQueue = [];
  G.reward = function (r, opts = {}) {
    const msgs = [];
    if (r.coins) { S.coins += r.coins; msgs.push(`+${r.coins} 🪙`); }
    if (r.gems) { S.gems += r.gems; msgs.push(`+${r.gems} 💎`); }
    if (r.dust) { S.dust += r.dust; msgs.push(`+${r.dust} ✨dust`); }
    const got = [];
    (r.items || []).forEach((id) => { const res = addItem(id); if (res) got.push(res); });
    save();
    if (r.coins && !opts.quiet) { G.coinBurst && G.coinBurst(opts.el, Math.min(14, 4 + Math.floor(r.coins / 80))); G.sfx && G.sfx('coin'); }
    got.forEach((res) => {
      if (res.dup) msgs.push(`dup ${res.it.name} → ${res.dust} dust`);
      else if (res.it.tier >= 2 && !opts.noPopup) popupQueue.push(res);
      else msgs.push(`${res.it.icon} ${res.it.name}`);
    });
    if (msgs.length && !opts.quiet) showToast((opts.label ? opts.label + ' ' : '') + msgs.join(' · '), null, null, 3500);
    drainPopups();
    return got;
  };

  function drainPopups() {
    if (document.getElementById('gSheet') || !popupQueue.length) return;
    const res = popupQueue.shift();
    showDropPopup(res.it, res.inst, () => setTimeout(drainPopups, 250));
  }
  G.drainPopups = drainPopups;

  function itemCard(it, inst, extraCls = '') {
    const t = TIERS[it.tier];
    const ench = inst && inst.ench ? `<span class="ench">+${inst.ench}</span>` : '';
    const qty = inst && inst.qty > 1 ? `<span class="qty">${inst.qty}</span>` : '';
    return `<div class="icard t${it.tier} ${extraCls}" style="--tc:${t.color}">${ench}${qty}<div class="ii">${it.icon}</div></div>`;
  }
  G.itemCard = itemCard;
  function statLines(it, inst) {
    const st = inst ? instStats(inst) : it.stats || {};
    return Object.keys(st).map((k) => `<span class="stat">${STAT_LABEL[k]} +${st[k]}%</span>`).join('');
  }
  G.statLines = statLines;

  function showDropPopup(it, inst, done) {
    const t = TIERS[it.tier];
    const html = `
      <div class="drop-pop t${it.tier}" style="--tc:${t.color}">
        <div class="drop-rays"></div>
        <div class="drop-tier">${t.name.toUpperCase()} DROP</div>
        <div class="drop-icon">${it.icon}</div>
        <div class="drop-name" style="color:${t.color}">${esc(it.name)}</div>
        <div class="drop-stats">${statLines(it, inst)}</div>
        ${it.desc ? `<div class="drop-desc">${esc(it.desc)}</div>` : ''}
        <div class="row2">
          ${it.type === 'gear' && inst ? `<button class="gbtn" id="dpEquip">Equip</button>` : ''}
          ${it.type === 'theme' ? `<button class="gbtn" id="dpApply">Apply theme</button>` : ''}
          ${it.type === 'title' ? `<button class="gbtn" id="dpApply">Wear title</button>` : ''}
          <button class="gbtn ghost" id="dpOk">Nice</button>
        </div>
      </div>`;
    const sh = G.sheet(html, { onClose: done, center: true });
    setTimeout(() => {
      G.celebrate && G.celebrate(it.tier, sh.querySelector('.drop-icon'));
      G.sfx && G.sfx(it.tier >= 6 ? 'godly' : it.tier >= 3 ? 'rare' : 'win');
      if (typeof haptic === 'function') haptic(it.tier >= 4 ? 'levelup' : 'success');
    }, 60);
    const ok = sh.querySelector('#dpOk'); if (ok) ok.onclick = () => G.closeSheet();
    const eq = sh.querySelector('#dpEquip'); if (eq) eq.onclick = () => { equip(inst.uid); G.closeSheet(); };
    const ap = sh.querySelector('#dpApply'); if (ap) ap.onclick = () => { applyCosmetic(it.id); G.closeSheet(); };
  }

  // ---------------- generic sheet ----------------
  let sheetClose = null;
  G.sheet = function (html, opts = {}) {
    G.closeSheet(true);
    const ov = document.createElement('div');
    ov.id = 'gSheet';
    ov.className = 'gsheet' + (opts.center ? ' center' : '');
    ov.innerHTML = `<div class="gsheet-inner">${opts.noClose ? '' : '<button class="gclose" aria-label="Close">✕</button>'}${html}</div>`;
    document.body.appendChild(ov);
    sheetClose = opts.onClose || null;
    ov.addEventListener('click', (e) => { if (e.target === ov && !opts.lock) G.closeSheet(); });
    const c = ov.querySelector('.gclose'); if (c) c.onclick = () => G.closeSheet();
    requestAnimationFrame(() => ov.classList.add('open'));
    return ov;
  };
  G.closeSheet = function (silent) {
    const ov = document.getElementById('gSheet');
    if (!ov) return;
    ov.remove();
    const cb = sheetClose; sheetClose = null;
    if (!silent && cb) cb();
    if (!silent) { G.renderLoot(); setTimeout(drainPopups, 200); }
  };

  // ---------------- workout rewards (hook persist) ----------------
  function processNewWorkouts() {
    const seen = new Set(S.seen);
    if (S.fresh) {
      workouts.forEach((w) => seen.add(w.id));
      S.fresh = false; S.seen = [...seen];
      const back = Math.min(3000, workouts.length * 10); S.coins += 750 + back; S.gems += 5; S.welcomeBack = back;
      addItem('xp_potion'); addItem('mace_0');
      save();
      setTimeout(() => showToast(`🎁 Loot update! +${750 + back} 🪙${back ? ` (incl. ${back} for past workouts)` : ''} +5 💎 + starter kit — check 💰 Loot`, null, null, 7000), 900);
      return;
    }
    const fresh = workouts.filter((w) => !seen.has(w.id));
    if (!fresh.length) return;
    const st = G.stats(); const d = daily();
    let coinsTotal = 0; const drops = [];
    fresh.forEach((w) => {
      seen.add(w.id);
      // XP bonus from gear/potions/events is stamped onto the workout itself
      const mult = Math.round(st.xpMult * (G.workoutBonus ? G.workoutBonus(w) : 1) * 100) / 100;
      if (mult !== 1 && !w.bonus) w.bonus = Math.max(0.5, mult);
      const raw = xpForWorkout(Object.assign({}, w, { bonus: 1 }));
      let c = Math.max(5, Math.round(raw * 1.5 * st.coinMult));
      c = Math.min(c, coinCap() - d.coins);
      if (c > 0) { d.coins += c; coinsTotal += c; }
      if (d.drops < dropCap() && Math.random() < 0.18 * (1 + st.luck / 200)) {
        d.drops++;
        drops.push(G.rollDrop([55, 28, 11, 4.5, 1.2, 0.25, 0.04, 0.008]).id);
      }
      G.emit && G.emit('workout', w);
    });
    S.seen = [...seen].slice(-6000);
    if (coinsTotal || drops.length) G.reward({ coins: coinsTotal, items: drops }, { label: '💪', el: document.getElementById('fab') || document.querySelector('.bottom button') });
    else save();
    if (d.coins >= coinCap() && !d.capWarned) { d.capWarned = true; save(); setTimeout(() => showToast('🪙 Daily training coin cap reached — quests, battles & events still pay out!', null, null, 5000), 3800); }
  }
  G.processNewWorkouts = processNewWorkouts;

  // tiny event bus for other modules
  const bus = {};
  G.on = (ev, fn) => (bus[ev] = bus[ev] || []).push(fn);
  G.emit = (ev, ...a) => (bus[ev] || []).forEach((fn) => { try { fn(...a); } catch (e) { console.warn(e); } });

  if (typeof persist === 'function') {
    const origPersist = persist;
    persist = function () { try { processNewWorkouts(); } catch (e) { console.warn('loot', e); } origPersist(); };
  }

  // ---------------- quests, streaks, kills ----------------
  function payQuests() {
    let q; try { q = JSON.parse(localStorage.getItem('pulse-quests-v1') || 'null'); } catch (e) { q = null; }
    if (!q || !q.quests) return;
    const paid = S.questPaid[q.date] || [];
    let coins = 0, gems = 0;
    q.quests.forEach((x, i) => { if (x.done && !paid.includes(i)) { paid.push(i); coins += (x.xpReward || 20) * 10; } });
    if (paid.length === 3 && !paid.includes('all')) { paid.push('all'); gems += 2; }
    if (coins || gems) {
      S.questPaid = { [q.date]: paid };
      G.reward({ coins, gems }, { label: '📜 Quest reward:' });
      if (gems) G.confetti && G.confetti(90);
    }
  }
  function payStreaks() {
    if (typeof getStreak !== 'function') return;
    const s = getStreak();
    const MILE = [[3, 1], [7, 3], [14, 5], [30, 10], [60, 20], [100, 40], [365, 100]];
    MILE.forEach(([n, g]) => {
      if (s >= n && !S.streakPaid.includes(n)) { S.streakPaid.push(n); G.reward({ gems: g, coins: n * 50 }, { label: `🔥 ${n}-day streak!` }); G.fireworks && G.fireworks(2); }
    });
  }
  G.onMonsterKill = function (m) {
    const items = [];
    if (Math.random() < 0.35) items.push(G.rollDrop([40, 32, 16, 8, 3, 0.8, 0.15, 0.03]).id);
    G.reward({ coins: Math.round((m.xp || 20) * 2), gems: Math.random() < 0.25 ? 1 : 0, items }, { label: '⚔️ Victory!' });
    G.emit('monsterKill', m);
  };
  G.onBossKill = function (boss, idx) {
    const tier = [4, 5, 6][idx] || 4;
    G.reward({ coins: boss.xp, gems: [10, 25, 50][idx] || 10, items: [rollItemOfTier(tier).id] }, { label: `🐉 ${boss.name} slain!` });
    G.fireworks && G.fireworks(6);
    G.emit('bossKill', boss);
  };

  // ---------------- equip / cosmetics ----------------
  function equip(uid) {
    const inst = findInst(uid); const it = inst && BY_ID[inst.id];
    if (!it || it.type !== 'gear') return;
    S.equip[it.slot] = uid; inst.bank = false;
    save(); G.sfx && G.sfx('coin');
    if (typeof haptic === 'function') haptic('medium');
    showToast(`🛡️ Equipped ${it.name}`, null, null, 2200);
    G.renderLoot(); G.renderHero && G.renderHero();
  }
  function unequip(slot) { delete S.equip[slot]; save(); G.renderLoot(); G.renderHero && G.renderHero(); }
  function applyCosmetic(id) {
    const it = BY_ID[id]; if (!it) return;
    if (it.type === 'theme') S.theme = id; else S.title = id;
    save(); applyLooks(); G.renderLoot();
    showToast(`${it.icon} ${it.name} applied`, null, null, 2000);
  }
  function applyLooks() {
    const root = document.documentElement.style;
    const th = THEMES[S.theme] || THEMES.theme_emerald;
    const ev = G.eventTheme && G.eventTheme();
    const use = S.theme && S.theme !== 'theme_emerald' ? th : (ev || th);
    const grad = use.c ? `linear-gradient(135deg,${use.a},${use.b},${use.c})` : `linear-gradient(135deg,${use.a},${use.b})`;
    root.setProperty('--accent', use.a); root.setProperty('--green', use.a); root.setProperty('--accent2', use.b);
    root.setProperty('--accent-grad', grad);
    const hex = use.a.replace('#', ''); const rgb = [0, 2, 4].map((i) => parseInt(hex.substr(i, 2), 16)).join(',');
    root.setProperty('--glow', `0 0 18px rgba(${rgb},.32)`);
    let tag = document.getElementById('titleTag');
    const brand = document.querySelector('.brand');
    if (!tag && brand) { tag = document.createElement('div'); tag.id = 'titleTag'; brand.insertAdjacentElement('afterend', tag); }
    if (tag) {
      const t = S.title && BY_ID[S.title];
      tag.style.display = t ? '' : 'none';
      if (t) { tag.textContent = '« ' + t.name + ' »'; tag.style.color = TIERS[t.tier].color; tag.className = 't' + t.tier; }
    }
  }
  G.applyLooks = applyLooks;

  function useConsumable(id) {
    const it = BY_ID[id]; if (!it) return;
    if (it.effect) {
      if (!G.consume(id)) return;
      const e = it.effect; const until = Date.now() + e.mins * 60000;
      S.effects[e.k] = e.mult ? { mult: e.mult, until } : { add: e.add, until };
      save(); showToast(`${it.icon} ${it.name} active for ${e.mins} min!`); G.sparks && G.sparks(innerWidth / 2, innerHeight / 2, '#a78bfa', 40);
    } else if (id === 'quest_scroll') {
      if (!G.consume(id)) return;
      localStorage.removeItem('pulse-quests-v1');
      if (typeof renderQuests === 'function') renderQuests();
      showToast('📜 New daily quests rolled — check the ⚔️ Battle tab');
    } else if (id === 'streak_shield') {
      const y = new Date(); y.setDate(y.getDate() - 1); const yk = dateKey(y);
      const rd = getRestDays();
      if (rd.includes(yk) || workouts.some((w) => w.date === yk)) { showToast('🛡️ Yesterday is already covered — shield not needed'); return; }
      if (!G.consume(id)) return;
      rd.push(yk); saveRestDays(rd); showToast('🛡️ Streak protected — yesterday marked as a rest day');
    } else if (id === 'boss_bomb') {
      const saved = typeof getBosses === 'function' ? getBosses() : [];
      const active = saved.find((b) => !b.defeated);
      if (!active) { showToast('💣 Challenge a boss first (⚔️ Battle tab)'); return; }
      if (!G.consume(id)) return;
      active.remaining = Math.max(0, active.remaining - 750); active.hits++;
      if (active.remaining <= 0) {
        active.defeated = true; active.defeatedDate = today();
        const idx = BOSSES.findIndex((b) => b.name === active.name);
        localStorage.setItem(BOSS_KEY, JSON.stringify(saved));
        G.onBossKill(BOSSES[idx], idx);
      } else { localStorage.setItem(BOSS_KEY, JSON.stringify(saved)); showToast(`💣 BOOM! 750 damage to ${active.name}`); }
      G.shake && G.shake(null, 10); G.sfx && G.sfx('boom');
    } else if (id === 'heart_crystal') {
      if (!G.dungeonAddHeart || !G.dungeonAddHeart()) { showToast('❤️ Start a dungeon run first (🗺️ World tab)'); return; }
      G.consume(id); showToast('❤️ +1 heart in your dungeon run');
    }
    if (typeof render === 'function') render();
    G.renderLoot();
  }

  // ---------------- crates & roller ----------------
  function canPay(cur, amt) { return (cur === 'gems' ? S.gems : cur === 'dust' ? S.dust : S.coins) >= amt; }
  function pay(cur, amt) { if (cur === 'gems') S.gems -= amt; else if (cur === 'dust') S.dust -= amt; else S.coins -= amt; }
  G.canPay = canPay; G.pay = (c, a) => { pay(c, a); save(); };

  function openCrate(cid, free) {
    const c = CRATES.find((x) => x.id === cid); if (!c) return;
    if (!free) { if (!canPay(c.cur, c.cost)) { showToast(`Not enough ${c.cur === 'gems' ? '💎' : '🪙'}`); G.sfx && G.sfx('lose'); return; } pay(c.cur, c.cost); }
    S.stats.crates = (S.stats.crates || 0) + 1;
    let tier = rollTier(c.w, G.stats().luck);
    S.pity++;
    let pityHit = false;
    if (tier < 4 && S.pity >= 50) { tier = 4; pityHit = true; }
    if (tier >= 4) S.pity = 0;
    const win = rollItemOfTier(tier);
    save();
    roller(c, win, pityHit);
  }
  G.openCrate = openCrate;

  function roller(crate, win, pityHit) {
    const N = 56, WIN = 48;
    const strip = [];
    for (let i = 0; i < N; i++) strip.push(i === WIN ? win : rollItemOfTier(rollTier(crate.w.map((x, k) => (k >= 4 ? x * 4 : x)))));
    // tease: put a shiny next to the winner sometimes
    if (Math.random() < 0.5) strip[WIN + 1] = rollItemOfTier(Math.min(7, win.tier + 2));
    const html = `
      <div class="roller-wrap">
        <div class="roller-title">${crate.icon} ${crate.name}</div>
        <div class="roller"><div class="roller-marker"></div><div class="roller-strip" id="rStrip">${strip.map((it) => itemCard(it, null, 'rcard')).join('')}</div></div>
        <div class="roller-result" id="rResult">${pityHit ? '<span style="color:var(--gold)">Pity timer triggered — guaranteed Legendary!</span>' : 'Rolling…'}</div>
        <div class="row2" id="rBtns"><button class="gbtn ghost" id="rSkip">Skip</button></div>
      </div>`;
    const sh = G.sheet(html, { center: true, noClose: true, lock: true });
    const stripEl = sh.querySelector('#rStrip');
    const box = sh.querySelector('.roller');
    const CW = 96; // card 88 + gap 8
    const target = WIN * CW - (box.clientWidth / 2 - 44) + (Math.random() * 50 - 25);
    let finished = false; let lastIdx = -1; let raf;
    const t0 = performance.now(); const DUR = 5200;
    const ease = (x) => 1 - Math.pow(1 - x, 4);
    function frame(t) {
      const k = Math.min(1, (t - t0) / DUR);
      const x = target * ease(k);
      stripEl.style.transform = `translateX(${-x}px)`;
      const idx = Math.floor((x + box.clientWidth / 2) / CW);
      if (idx !== lastIdx) { lastIdx = idx; G.sfx && G.sfx('tick'); if (typeof haptic === 'function' && k < 0.9) haptic('selection'); }
      if (k < 1) raf = requestAnimationFrame(frame); else finish();
    }
    raf = requestAnimationFrame(frame);
    sh.querySelector('#rSkip').onclick = () => { cancelAnimationFrame(raf); stripEl.style.transform = `translateX(${-target}px)`; finish(); };
    function finish() {
      if (finished) return; finished = true;
      const cards = stripEl.children; if (cards[WIN]) cards[WIN].classList.add('winner');
      const res = addItem(win.id); save();
      const t = TIERS[win.tier];
      sh.querySelector('#rResult').innerHTML = `<div class="rr-tier" style="color:${t.color}">${t.name}</div><div class="rr-name">${win.icon} ${esc(win.name)}</div>
        <div class="drop-stats">${statLines(win, res && res.inst)}</div>${res && res.dup ? `<div class="muted">Duplicate cosmetic → +${res.dust} dust</div>` : ''}`;
      const btns = sh.querySelector('#rBtns');
      btns.innerHTML = `<button class="gbtn" id="rAgain">Open another (${crate.cost} ${crate.cur === 'gems' ? '💎' : '🪙'})</button><button class="gbtn ghost" id="rDone">Done</button>`;
      btns.querySelector('#rAgain').onclick = () => { G.closeSheet(true); openCrate(crate.id); };
      btns.querySelector('#rDone').onclick = () => G.closeSheet();
      if (res && res.inst && win.type === 'gear') {
        const b = document.createElement('button'); b.className = 'gbtn ghost'; b.textContent = 'Equip';
        b.onclick = () => { equip(res.inst.uid); G.closeSheet(); }; btns.insertBefore(b, btns.lastChild);
      }
      G.celebrate && G.celebrate(win.tier, cards[WIN]);
      G.sfx && G.sfx(win.tier >= 6 ? 'godly' : win.tier >= 3 ? 'rare' : 'win');
      if (typeof haptic === 'function') haptic(win.tier >= 4 ? 'levelup' : 'success');
      if (win.tier > (S.stats.best || 0)) { S.stats.best = win.tier; save(); }
    }
  }

  // ---------------- casino ----------------
  const WHEEL = [
    { label: '100🪙', r: { coins: 100 }, w: 22, col: '#1d2a36' }, { label: '2💎', r: { gems: 2 }, w: 10, col: '#203447' },
    { label: '250🪙', r: { coins: 250 }, w: 18, col: '#1d2a36' }, { label: '🧪', r: { items: ['xp_potion'] }, w: 12, col: '#2a2140' },
    { label: '50🪙', r: { coins: 50 }, w: 20, col: '#1d2a36' }, { label: '🗃️', r: { crate: 'iron' }, w: 8, col: '#3a2a12' },
    { label: '600🪙', r: { coins: 600 }, w: 7, col: '#1d2a36' }, { label: '10💎', r: { gems: 10 }, w: 3, col: '#47203a' }
  ];
  function spinWheel() {
    const d = daily();
    const free = !d.spin;
    const html = `<div class="casino">
      <div class="cz-title">🎡 Daily Spin</div>
      <div class="wheel-box"><div class="wheel-pointer">▼</div><div class="wheel" id="wheel">${WHEEL.map((s, i) => `<div class="wseg" style="transform:rotate(${i * 45 + 22.5}deg)"><span>${s.label}</span></div>`).join('')}</div></div>
      <div class="muted" id="wInfo">${free ? 'Your free spin is ready!' : 'Free spin used today — extra spins cost 3 💎'}</div>
      <button class="gbtn" id="wSpin">${free ? 'SPIN (free)' : 'SPIN (3 💎)'}</button></div>`;
    const sh = G.sheet(html, { center: true });
    const wheel = sh.querySelector('#wheel');
    wheel.style.background = `conic-gradient(${WHEEL.map((s, i) => `${s.col} ${i * 45}deg ${(i + 1) * 45}deg`).join(',')})`;
    let rot = 0, busy = false;
    sh.querySelector('#wSpin').onclick = () => {
      if (busy) return;
      const dd = daily();
      if (dd.spin) { if (!canPay('gems', 3)) { showToast('Not enough 💎'); return; } pay('gems', 3); } else dd.spin = true;
      save(); busy = true;
      const tot = WHEEL.reduce((a, s) => a + s.w, 0); let r = Math.random() * tot; let idx = 0;
      for (let i = 0; i < WHEEL.length; i++) { r -= WHEEL[i].w; if (r <= 0) { idx = i; break; } }
      const segCenter = idx * 45 + 22.5;
      rot += 360 * 6 + (360 - segCenter) - (rot % 360) + (Math.random() * 30 - 15);
      wheel.style.transition = 'transform 4.2s cubic-bezier(.12,.8,.2,1)';
      wheel.style.transform = `rotate(${rot}deg)`;
      let ticks = 0; const tk = setInterval(() => { G.sfx && G.sfx('tick'); if (++ticks > 26) clearInterval(tk); }, 140);
      setTimeout(() => {
        busy = false; const seg = WHEEL[idx];
        sh.querySelector('#wInfo').innerHTML = `You won <b style="color:var(--gold)">${seg.label}</b>!`;
        sh.querySelector('#wSpin').textContent = 'SPIN AGAIN (3 💎)';
        if (seg.r.crate) { G.closeSheet(true); openCrate(seg.r.crate, true); return; }
        G.reward(seg.r, { label: '🎡' }); G.confetti && G.confetti(50);
      }, 4300);
    };
  }

  function coinFlip() {
    let bet = Math.min(100, S.coins);
    const html = `<div class="casino">
      <div class="cz-title">🪙 Double or Nothing</div>
      <div class="coin3d" id="coin"><div class="cf front">💪</div><div class="cf back">🦵</div></div>
      <div class="bet-row">${[50, 100, 250, 500, 1000].map((b) => `<button class="chip" data-b="${b}">${b}</button>`).join('')}<button class="chip" data-b="half">½</button></div>
      <div class="muted">Bet: <b id="cfBet" style="color:var(--gold)">${bet}</b> 🪙 · Balance <span id="cfBal">${S.coins}</span></div>
      <div class="row2"><button class="gbtn" id="cfH">💪 Arms</button><button class="gbtn" id="cfT">🦵 Legs</button></div>
      <div class="muted" id="cfRes">Pick a side. Win = 2× your bet.</div></div>`;
    const sh = G.sheet(html, { center: true });
    const betEl = sh.querySelector('#cfBet');
    sh.querySelectorAll('.chip').forEach((c) => (c.onclick = () => { bet = c.dataset.b === 'half' ? Math.floor(S.coins / 2) : Number(c.dataset.b); betEl.textContent = bet; G.sfx && G.sfx('tick'); }));
    let busy = false, spins = 0;
    const go = (side) => {
      if (busy) return;
      if (bet < 10) { showToast('Minimum bet is 10 🪙'); return; }
      if (bet > 5000) bet = 5000;
      if (!canPay('coins', bet)) { showToast('Not enough 🪙'); return; }
      pay('coins', bet); save(); busy = true;
      S.stats.flips = (S.stats.flips || 0) + 1;
      const result = Math.random() < 0.5 ? 'h' : 't';
      spins += 5;
      const coin = sh.querySelector('#coin');
      coin.style.transition = 'transform 1.5s cubic-bezier(.2,.7,.3,1)';
      coin.style.transform = `rotateY(${spins * 360 + (result === 't' ? 180 : 0)}deg)`;
      G.sfx && G.sfx('whoosh');
      setTimeout(() => {
        busy = false;
        const won = result === side;
        if (won) { S.coins += bet * 2; S.stats.flipWins = (S.stats.flipWins || 0) + 1; save(); G.sfx && G.sfx('win'); G.coinBurst && G.coinBurst(coin, 8); G.confetti && G.confetti(40); }
        else { G.sfx && G.sfx('lose'); if (typeof haptic === 'function') haptic('error'); }
        sh.querySelector('#cfRes').innerHTML = won ? `<b style="color:var(--green)">WIN! +${bet * 2} 🪙</b>` : `<b style="color:var(--red)">Lost ${bet} 🪙</b>`;
        sh.querySelector('#cfBal').textContent = S.coins;
        spins = Math.round(spins);
      }, 1550);
    };
    sh.querySelector('#cfH').onclick = () => go('h');
    sh.querySelector('#cfT').onclick = () => go('t');
  }

  const SCRATCH = [
    { s: '🪙', r: { coins: 300 }, p: 25 }, { s: '🔥', r: { coins: 600 }, p: 12 }, { s: '💪', r: { coins: 1200 }, p: 5 },
    { s: '🏆', r: { coins: 3000 }, p: 2.5 }, { s: '💎', r: { coins: 2000, gems: 10 }, p: 0.5 }
  ];
  function scratchCard() {
    const COST = 200;
    if (!canPay('coins', COST)) { showToast('Scratch cards cost 200 🪙'); return; }
    pay('coins', COST); save();
    let r = Math.random() * 100; let win = null;
    for (const x of SCRATCH) { r -= x.p; if (r <= 0) { win = x; break; } }
    const syms = SCRATCH.map((x) => x.s).concat(['⭐']);
    const cells = [];
    if (win) { cells.push(win.s, win.s, win.s); }
    const counts = {}; cells.forEach((c) => (counts[c] = (counts[c] || 0) + 1));
    while (cells.length < 9) {
      const s = syms[Math.floor(Math.random() * syms.length)];
      if ((counts[s] || 0) >= 2 && !(win && s === win.s && false)) continue;
      if (win && s === win.s) continue;
      counts[s] = (counts[s] || 0) + 1; cells.push(s);
    }
    cells.sort(() => Math.random() - 0.5);
    const html = `<div class="casino"><div class="cz-title">🎟️ Scratch Card</div><div class="muted">Match 3 to win · tap to scratch</div>
      <div class="scratch">${cells.map((c, i) => `<button class="sc" data-i="${i}"><span>${c}</span></button>`).join('')}</div>
      <div class="muted" id="scRes">🪙300 · 🔥600 · 💪1200 · 🏆3000 · 💎2000+10💎</div>
      <div class="row2"><button class="gbtn ghost" id="scAll">Reveal all</button><button class="gbtn" id="scAgain">New card (200 🪙)</button></div></div>`;
    const sh = G.sheet(html, { center: true });
    let revealed = 0, paid = false;
    const reveal = (b) => {
      if (b.classList.contains('open')) return;
      b.classList.add('open'); revealed++; G.sfx && G.sfx('tick');
      const rr = b.getBoundingClientRect(); G.sparks && G.sparks(rr.left + rr.width / 2, rr.top + rr.height / 2, '#c9d3dd', 8);
      if (revealed === 9 && !paid) {
        paid = true;
        if (win) { sh.querySelectorAll('.sc').forEach((x) => { if (x.textContent === win.s) x.classList.add('hit'); }); G.reward(win.r, { label: `🎟️ ${win.s}${win.s}${win.s}!` }); G.confetti && G.confetti(80); }
        else { sh.querySelector('#scRes').innerHTML = '<b style="color:var(--red)">No match this time</b>'; G.sfx && G.sfx('lose'); }
      }
    };
    sh.querySelectorAll('.sc').forEach((b) => (b.onclick = () => reveal(b)));
    sh.querySelector('#scAll').onclick = () => sh.querySelectorAll('.sc').forEach((b, i) => setTimeout(() => reveal(b), i * 90));
    sh.querySelector('#scAgain').onclick = () => { G.closeSheet(true); scratchCard(); };
  }

  const REEL = [['🏋️', 30, 5], ['💪', 25, 8], ['🦵', 20, 10], ['🔥', 12, 20], ['⭐', 8, 40], ['💎', 4, 100], ['7️⃣', 1, 777]];
  function slots() {
    let bet = 50;
    const html = `<div class="casino"><div class="cz-title">🎰 Gym Slots</div>
      <div class="reels">${[0, 1, 2].map((i) => `<div class="reel" id="reel${i}">🏋️</div>`).join('')}</div>
      <div class="bet-row">${[25, 50, 100, 250].map((b) => `<button class="chip ${b === 50 ? 'on' : ''}" data-b="${b}">${b}</button>`).join('')}</div>
      <div class="muted" id="slRes">3× 🏋️5× 💪8× 🦵10× 🔥20× ⭐40× 💎100× 7️⃣777× · any pair = bet back</div>
      <button class="gbtn" id="slSpin">SPIN</button></div>`;
    const sh = G.sheet(html, { center: true });
    sh.querySelectorAll('.chip').forEach((c) => (c.onclick = () => { bet = Number(c.dataset.b); sh.querySelectorAll('.chip').forEach((x) => x.classList.toggle('on', x === c)); }));
    let busy = false;
    const pickSym = () => { const tot = REEL.reduce((a, x) => a + x[1], 0); let r = Math.random() * tot; for (const x of REEL) { r -= x[1]; if (r <= 0) return x; } return REEL[0]; };
    sh.querySelector('#slSpin').onclick = () => {
      if (busy) return;
      if (!canPay('coins', bet)) { showToast('Not enough 🪙'); return; }
      pay('coins', bet); save(); busy = true; S.stats.slots = (S.stats.slots || 0) + 1;
      const res = [pickSym(), pickSym(), pickSym()];
      [0, 1, 2].forEach((i) => {
        const el = sh.querySelector('#reel' + i); el.classList.add('spin');
        const iv = setInterval(() => { el.textContent = REEL[Math.floor(Math.random() * REEL.length)][0]; }, 60);
        setTimeout(() => { clearInterval(iv); el.textContent = res[i][0]; el.classList.remove('spin'); G.sfx && G.sfx('hit'); if (typeof haptic === 'function') haptic('light'); }, 800 + i * 450);
      });
      setTimeout(() => {
        busy = false;
        const [a, b, c] = res.map((x) => x[0]);
        let win = 0;
        if (a === b && b === c) win = bet * res[0][2];
        else if (a === b || b === c || a === c) win = bet;
        if (win) {
          S.coins += win; save();
          const big = a === b && b === c;
          sh.querySelector('#slRes').innerHTML = big ? `<b style="color:var(--gold)">${a}${a}${a} JACKPOT ×${res[0][2]}! +${win} 🪙</b>` : `Pair — bet back (+${win} 🪙)`;
          if (big) { G.confetti && G.confetti(120); G.coinBurst && G.coinBurst(sh.querySelector('.reels'), 14); G.sfx && G.sfx(res[0][2] >= 100 ? 'godly' : 'win'); if (res[0][0] === '7️⃣') { G.fireworks && G.fireworks(6); G.goldenRain && G.goldenRain(); } }
        } else { sh.querySelector('#slRes').innerHTML = '<span style="color:var(--muted)">No win — spin again?</span>'; }
      }, 800 + 2 * 450 + 80);
    };
  }

  // ---------------- forge: enchant / fuse / salvage ----------------
  const ENCH_CHANCE = [100, 95, 90, 80, 70, 60, 50, 40, 30, 20];
  const smith = () => (G.villagePerk && G.villagePerk('blacksmith'));
  const enchChance = (e) => Math.min(100, ENCH_CHANCE[e] + (smith() ? 5 : 0));
  function enchantCost(inst) { const it = BY_ID[inst.id]; const e = inst.ench || 0; const m = smith() ? 0.8 : 1; return { dust: Math.round(15 * (e + 1) * (it.tier + 1) * m), coins: Math.round(60 * (e + 1) * m) }; }
  function enchant(uid, blessed) {
    const inst = findInst(uid); if (!inst) return;
    const it = BY_ID[inst.id]; const e = inst.ench || 0;
    if (e >= 10) { showToast('Already +10 — maxed!'); return; }
    const cost = enchantCost(inst);
    if (S.dust < cost.dust || S.coins < cost.coins) { showToast(`Need ${cost.dust} dust + ${cost.coins} 🪙`); return; }
    if (blessed && S.gems < 5) { showToast('A blessing costs 5 💎'); return; }
    S.dust -= cost.dust; S.coins -= cost.coins; if (blessed) S.gems -= 5;
    S.stats.ench = (S.stats.ench || 0) + 1;
    const ok = Math.random() * 100 < enchChance(e);
    let msg;
    if (ok) {
      inst.ench = e + 1; msg = `✨ SUCCESS! ${it.name} is now +${inst.ench}`;
      G.sfx && G.sfx(inst.ench >= 7 ? 'rare' : 'win'); G.sparks && G.sparks(innerWidth / 2, innerHeight * 0.4, TIERS[it.tier].color, 30 + inst.ench * 5);
      if (inst.ench >= 7) G.confetti && G.confetti(80);
    } else if (e >= 5 && !blessed && Math.random() < 0.3) {
      removeInst(uid); S.stats.breaks = (S.stats.breaks || 0) + 1;
      msg = `💔 The enchant failed and ${it.name} SHATTERED`; G.sfx && G.sfx('break'); G.shake && G.shake(null, 12);
      save(); showToast(msg); G.closeSheet(); return;
    } else if (e >= 3 && !blessed) {
      inst.ench = e - 1; msg = `❌ Failed — dropped to +${inst.ench}`; G.sfx && G.sfx('lose'); G.shake && G.shake(null, 5);
    } else { msg = '❌ Failed — no change'; G.sfx && G.sfx('lose'); }
    save(); showToast(msg, null, null, 3000);
    itemSheet(uid);
  }
  function salvage(uid) {
    const inst = findInst(uid); if (!inst) return;
    if (inst.locked) { showToast('🔒 Unlock it first'); return; }
    const it = BY_ID[inst.id];
    const d = Math.round(SALVAGE[it.tier] * (1 + 0.2 * (inst.ench || 0)) * (inst.qty || 1));
    removeInst(uid); S.dust += d; save();
    showToast(`♻️ Salvaged ${it.name} → +${d} dust`); G.sfx && G.sfx('coin');
  }
  function salvageBelow(maxTier) {
    let d = 0, n = 0; const eq = equippedUids();
    S.items.filter((i) => { const it = BY_ID[i.id]; return it.type === 'gear' && it.tier <= maxTier && !i.locked && !eq.has(i.uid); })
      .forEach((i) => { d += Math.round(SALVAGE[BY_ID[i.id].tier] * (1 + 0.2 * (i.ench || 0))); n++; removeInst(i.uid); });
    S.dust += d; save(); showToast(n ? `♻️ Salvaged ${n} items → +${d} dust` : 'Nothing to salvage'); G.renderLoot();
  }
  function fuse(uids) {
    const insts = uids.map(findInst).filter(Boolean);
    if (insts.length !== 3) return;
    const tier = BY_ID[insts[0].id].tier;
    if (insts.some((i) => BY_ID[i.id].tier !== tier || BY_ID[i.id].type !== 'gear')) { showToast('All 3 must be gear of the same tier'); return; }
    if (tier >= 7) { showToast('Celestial is the top tier'); return; }
    insts.forEach((i) => removeInst(i.uid));
    const up = Math.min(7, tier + (Math.random() < 0.05 ? 2 : 1));
    let out = rollItemOfTier(up); let guard = 0;
    while (out.type !== 'gear' && guard++ < 20) out = rollItemOfTier(up);
    const res = addItem(out.id); save();
    if (up - tier === 2) showToast('🌟 PERFECT FUSION — jumped two tiers!');
    showDropPopup(out, res.inst, () => G.renderLoot());
  }

  // ---------------- shop ----------------
  function shopToday() {
    const rnd = G.seeded('shop' + today() + (S.shopReroll && S.shopReroll.date === today() ? S.shopReroll.n : 0));
    const offers = [];
    const tw = [10, 30, 32, 18, 7, 2.2, 0.6, 0.1];
    const rollT = () => { let tot = tw.reduce((a, b) => a + b, 0), r = rnd() * tot; for (let i = 0; i < tw.length; i++) { r -= tw[i]; if (r <= 0) return i; } return 0; };
    const market = G.villagePerk && G.villagePerk('market');
    for (let i = 0; i < (market ? 6 : 4); i++) { const t = rollT(); let it = rollItemOfTier(t, rnd), g = 0; while (it.type !== 'gear' && g++ < 15) it = rollItemOfTier(t, rnd); offers.push({ id: it.id, price: Math.round(SHOP_PRICE[t] * (0.85 + rnd() * 0.3) * (market ? 0.9 : 1)), cur: 'coins' }); }
    const cons = CATALOG.filter((i) => i.type === 'cons');
    for (let i = 0; i < 2; i++) { const it = cons[Math.floor(rnd() * cons.length)]; offers.push({ id: it.id, price: SHOP_PRICE[it.tier] + 40, cur: 'coins' }); }
    const cos = CATALOG.filter((i) => (i.type === 'theme' || i.type === 'title') && !i.noDrop && !i.event && !i.special && i.tier <= 5);
    const c = cos[Math.floor(rnd() * cos.length)]; offers.push({ id: c.id, price: Math.max(5, (c.tier + 1) * 6), cur: 'gems' });
    return offers;
  }
  function buy(i) {
    const o = shopToday()[i]; if (!o) return;
    const key = today() + ':' + (S.shopReroll && S.shopReroll.date === today() ? S.shopReroll.n : 0) + ':' + i;
    S.bought = S.bought || [];
    if (S.bought.includes(key)) return;
    if (!canPay(o.cur, o.price)) { showToast(`Not enough ${o.cur === 'gems' ? '💎' : '🪙'}`); return; }
    pay(o.cur, o.price); S.bought.push(key); S.bought = S.bought.slice(-40);
    const res = addItem(o.id); save();
    showToast(`🛒 Bought ${BY_ID[o.id].name}`); G.sfx && G.sfx('coin');
    if (res && BY_ID[o.id].tier >= 3) G.celebrate && G.celebrate(BY_ID[o.id].tier);
    G.renderLoot();
  }

  // ---------------- item detail sheet ----------------
  function itemSheet(uid, cosmeticId) {
    const inst = uid != null ? findInst(uid) : null;
    const it = inst ? BY_ID[inst.id] : BY_ID[cosmeticId];
    if (!it) return;
    const t = TIERS[it.tier];
    const isEq = inst && Object.values(S.equip).includes(inst.uid);
    let actions = '';
    if (it.type === 'gear' && inst) {
      const cost = enchantCost(inst); const e = inst.ench || 0;
      actions = `
        <div class="row2">${isEq ? `<button class="gbtn ghost" data-a="unequip">Unequip</button>` : `<button class="gbtn" data-a="equip">Equip</button>`}
          <button class="gbtn ghost" data-a="lock">${inst.locked ? '🔓 Unlock' : '🔒 Lock'}</button>
          <button class="gbtn ghost" data-a="bank">${inst.bank ? '🎒 To bag' : '🏦 To bank'}</button></div>
        <div class="forge-box">
          <div><b>✨ Enchant +${e} → +${Math.min(10, e + 1)}</b></div>
          <div class="muted">${e >= 10 ? 'Maxed' : `${enchChance(e)}% success · cost ${cost.dust} dust + ${cost.coins} 🪙${e >= 5 ? ' · <span style="color:var(--red)">30% chance to SHATTER on fail</span>' : e >= 3 ? ' · fail drops 1 level' : ''}`}</div>
          <div class="muted">Each + adds 12% to all stats</div>
          <div class="row2"><button class="gbtn" data-a="ench" ${e >= 10 ? 'disabled' : ''}>Enchant</button>${e >= 3 ? `<button class="gbtn ghost" data-a="bless" ${e >= 10 ? 'disabled' : ''}>Blessed (5💎, no loss)</button>` : ''}</div>
        </div>
        <button class="gbtn danger" data-a="salvage">♻️ Salvage for ${Math.round(SALVAGE[it.tier] * (1 + 0.2 * e))} dust</button>`;
    } else if (it.type === 'cons' && inst) {
      actions = `<div class="row2"><button class="gbtn" data-a="use">Use (${inst.qty} left)</button><button class="gbtn ghost" data-a="salvage">♻️ Salvage</button></div>`;
    } else if (it.type === 'theme' || it.type === 'title') {
      const active = S.theme === it.id || S.title === it.id;
      actions = `<div class="row2"><button class="gbtn" data-a="apply">${active ? 'Active ✓' : it.type === 'theme' ? 'Apply theme' : 'Wear title'}</button>${it.type === 'title' && active ? '<button class="gbtn ghost" data-a="untitle">Remove title</button>' : ''}</div>`;
    }
    const html = `<div class="item-sheet" style="--tc:${t.color}">
        <div class="is-head">${itemCard(it, inst)}<div><div class="is-tier" style="color:${t.color}">${t.name}${it.slot ? ' · ' + SLOTS.find((s) => s.id === it.slot).name : ''}${it.unique ? ' · Unique' : ''}${it.event ? ' · Event' : ''}</div>
        <div class="is-name">${esc(it.name)}${inst && inst.ench ? ` <span style="color:var(--gold)">+${inst.ench}</span>` : ''}</div></div></div>
        <div class="drop-stats">${statLines(it, inst)}</div>
        ${it.desc ? `<div class="drop-desc">${esc(it.desc)}</div>` : ''}
        ${actions}</div>`;
    const sh = G.sheet(html);
    sh.querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => {
      const a = b.dataset.a;
      if (a === 'equip') { equip(inst.uid); G.closeSheet(); }
      else if (a === 'unequip') { unequip(it.slot); G.closeSheet(); }
      else if (a === 'lock') { inst.locked = !inst.locked; save(); itemSheet(uid); }
      else if (a === 'bank') { if (inst.bank && bagItems().length >= BAG_SIZE) { showToast('Bag is full (28)'); return; } inst.bank = !inst.bank; save(); itemSheet(uid); }
      else if (a === 'ench') enchant(uid, false);
      else if (a === 'bless') enchant(uid, true);
      else if (a === 'salvage') { if (isEq) { showToast('Unequip it first'); return; } salvage(uid); G.closeSheet(); }
      else if (a === 'use') { G.closeSheet(true); useConsumable(it.id); }
      else if (a === 'apply') { applyCosmetic(it.id); G.closeSheet(); }
      else if (a === 'untitle') { S.title = null; save(); applyLooks(); G.closeSheet(); }
    }));
  }
  G.itemSheet = itemSheet;

  // ---------------- gear screens (shown in Hero) ----------------
  G.SLOTS = SLOTS;
  G.slotHtml = function (slotId) {
    const sl = SLOTS.find((x) => x.id === slotId); const inst = findInst(S.equip[slotId]); const it = inst && BY_ID[inst.id];
    return `<button class="dslot" data-slot="${slotId}">${it ? itemCard(it, inst) : `<div class="icard empty"><div class="ii">${sl.icon}</div></div>`}<span>${sl.name}</span></button>`;
  };
  G.statBarHtml = function () {
    const st = G.stats();
    return `<div class="statbar">${['power', 'xp', 'coin', 'crit', 'luck'].map((k) => `<div><b>${k === 'crit' ? st.critChance : st[k]}%</b><span>${STAT_LABEL[k]}</span></div>`).join('')}</div>
      <div class="muted" style="text-align:center">${st.set ? `<span style="color:${TIERS[st.set.tier].color}">${MATERIALS[st.set.tier]} set bonus +${st.set.pct}%</span> · ` : 'Full armour set of one material = bonus · '}damage ×${(1 + st.power / 100).toFixed(2)} · XP ×${st.xpMult} · coins ×${st.coinMult}</div>`;
  };
  function bindItems(el) {
    el.querySelectorAll('[data-uid]').forEach((b) => (b.onclick = () => itemSheet(Number(b.dataset.uid))));
    el.querySelectorAll('[data-cos]').forEach((b) => (b.onclick = () => itemSheet(null, b.dataset.cos)));
    el.querySelectorAll('[data-slot]').forEach((b) => (b.onclick = () => openSlot(b.dataset.slot)));
  }
  G.bindItems = bindItems;
  G.renderBag = function (el) {
    if (!el) return;
    const bag = bagItems(); const bank = S.items.filter((i) => i.bank && !equippedUids().has(i.uid));
    el.innerHTML = `<div class="card"><div class="cardhead"><h2>🎒 Bag</h2><span class="muted">${bag.length}/${BAG_SIZE} · tap an item</span></div>
        <div class="bag">${Array.from({ length: BAG_SIZE }, (_, i) => { const inst = bag[i]; return inst ? `<button class="bslot" data-uid="${inst.uid}">${itemCard(BY_ID[inst.id], inst, inst.locked ? 'locked' : '')}</button>` : '<div class="bslot"><div class="icard empty"></div></div>'; }).join('')}</div></div>
      <div class="card"><div class="cardhead"><h2>🏦 Bank</h2><span class="muted">${bank.length} items</span></div>
        ${bank.length ? `<div class="bag">${bank.map((inst) => `<button class="bslot" data-uid="${inst.uid}">${itemCard(BY_ID[inst.id], inst)}</button>`).join('')}</div>` : '<div class="empty">Overflow from a full bag lands here.</div>'}</div>
      <div class="card"><div class="cardhead"><h2>🎨 Cosmetics</h2><span class="muted">${S.owned.length} owned</span></div>
        <div class="bag">${S.owned.map((id) => { const it = BY_ID[id]; if (!it) return ''; const act = S.theme === id || S.title === id || (id === 'theme_emerald' && !S.theme); return `<button class="bslot" data-cos="${id}">${itemCard(it, null, act ? 'active' : '')}</button>`; }).join('')}</div>
        <div class="muted">Themes recolour the whole app, titles show under the logo.</div></div>`;
    bindItems(el);
  };
  // slot picker: what's equipped + everything that fits, with stat differences
  function openSlot(slotId) {
    const sl = SLOTS.find((x) => x.id === slotId); const cur = findInst(S.equip[slotId]); const curIt = cur && BY_ID[cur.id];
    const eq = equippedUids();
    const cands = S.items.filter((i) => { const it = BY_ID[i.id]; return it && it.type === 'gear' && it.slot === slotId && !eq.has(i.uid); })
      .sort((a, b) => BY_ID[b.id].tier - BY_ID[a.id].tier || (b.ench || 0) - (a.ench || 0));
    const cs = cur ? instStats(cur) : {};
    const diff = (inst) => { const st = instStats(inst); const ks = new Set([...Object.keys(st), ...Object.keys(cs)]); const out = [...ks].map((k) => { const d = r1((st[k] || 0) - (cs[k] || 0)); return d ? `<span class="stat ${d > 0 ? 'up' : 'down'}">${STAT_LABEL[k]} ${d > 0 ? '+' : ''}${d}%</span>` : ''; }).join(''); return out || '<span class="muted">same stats</span>'; };
    const html = `<div class="cz-title" style="text-align:left">${sl.icon} ${sl.name} slot</div>
      ${curIt ? `<div class="shop-row">${itemCard(curIt, cur)}<div class="crate-main"><div class="crate-name" style="color:${TIERS[curIt.tier].color}">${esc(curIt.name)}${cur.ench ? ' +' + cur.ench : ''}</div><div class="drop-stats sm">${statLines(curIt, cur)}</div></div>
        <div class="row2" style="flex-direction:column;gap:4px"><button class="gbtn sm" data-info="${cur.uid}">Details</button><button class="gbtn ghost sm" data-unequip="1">Unequip</button></div></div>` : '<div class="muted">Nothing equipped.</div>'}
      <div class="muted" style="margin:12px 0 4px">From your bag & bank (${cands.length})</div>
      ${cands.length ? cands.map((inst) => { const it = BY_ID[inst.id]; return `<div class="shop-row">${itemCard(it, inst)}<div class="crate-main"><div class="crate-name" style="color:${TIERS[it.tier].color}">${esc(it.name)}${inst.ench ? ' +' + inst.ench : ''}</div><div class="drop-stats sm">${diff(inst)}</div></div><button class="gbtn sm" data-equip="${inst.uid}">Equip</button></div>`; }).join('')
        : `<div class="empty">No ${sl.name.toLowerCase()} items yet — open crates, visit the shop or clear dungeons.</div>`}`;
    const sh = G.sheet(html);
    sh.querySelectorAll('[data-equip]').forEach((b) => (b.onclick = () => { equip(Number(b.dataset.equip)); G.closeSheet(); }));
    const inf = sh.querySelector('[data-info]'); if (inf) inf.onclick = () => itemSheet(Number(inf.dataset.info));
    const un = sh.querySelector('[data-unequip]'); if (un) un.onclick = () => { unequip(slotId); G.closeSheet(); };
  }
  G.openSlot = openSlot;

  // ---------------- Loot tab UI ----------------
  let tab = 'crates';
  let fuseSel = [];
  G.goLoot = function () { if (G.nav) G.nav('loot'); };

  function updateWallet() {
    const c = document.getElementById('coinCount'), g = document.getElementById('gemCount');
    if (c) c.textContent = S.coins >= 100000 ? Math.round(S.coins / 1000) + 'k' : S.coins;
    if (g) g.textContent = S.gems;
  }
  G.updateWallet = updateWallet;

  function effectsHtml() {
    const now = Date.now(); const out = [];
    const e = S.effects;
    if (e.xp && e.xp.until > now) out.push(`✨ ${e.xp.mult}× XP · ${Math.ceil((e.xp.until - now) / 60000)}m`);
    if (e.coin && e.coin.until > now) out.push(`🪙 ${e.coin.mult}× coins · ${Math.ceil((e.coin.until - now) / 60000)}m`);
    if (e.luck && e.luck.until > now) out.push(`🍀 +${e.luck.add}% luck · ${Math.ceil((e.luck.until - now) / 60000)}m`);
    const ev = G.eventMods && G.eventMods();
    if (ev && ev.label) out.push(ev.label);
    return out.length ? `<div class="effects">${out.map((x) => `<span class="eff">${x}</span>`).join('')}</div>` : '';
  }

  G.renderLoot = function () {
    const root = document.getElementById('lootRoot');
    updateWallet();
    if (!root) return;
    const d = daily(); const st = G.stats();
    tab = (G.navSub && G.navSub('loot')) || tab;
    let body = '';
    if (tab === 'crates') {
      body = `<div class="card"><div class="cardhead"><h2>📦 Loot Crates</h2><span class="muted">Pity: ${S.pity}/50 → Legendary</span></div>
        ${CRATES.map((c) => {
          const tot = c.w.reduce((a, b) => a + b, 0);
          return `<div class="crate">
            <div class="crate-ico">${c.icon}</div>
            <div class="crate-main"><div class="crate-name">${c.name}</div>
              <div class="odds">${c.w.map((w, i) => w ? `<span style="color:${TIERS[i].color}">${(() => { const p = w / tot * 100; return p >= 1 ? Math.round(p) : p >= 0.1 ? p.toFixed(1) : '<0.1'; })()}%</span>` : '').join('')}</div></div>
            <button class="gbtn sm" data-crate="${c.id}">${c.cost} ${c.cur === 'gems' ? '💎' : '🪙'}</button></div>`;
        }).join('')}
        <div class="tier-legend">${TIERS.map((t) => `<span style="color:${t.color}">● ${t.name}</span>`).join('')}</div>
        <div class="muted" style="margin-top:6px">🍀 Luck ${st.luck}% boosts Epic+ odds</div></div>`;
    } else if (tab === 'casino') {
      body = `<div class="casino-grid">
        <button class="cz-card" data-g="spin"><div class="cz-ico">🎡</div><b>Daily Spin</b><span>${d.spin ? '3 💎' : 'FREE today'}</span></button>
        <button class="cz-card" data-g="flip"><div class="cz-ico">🪙</div><b>Double or Nothing</b><span>50/50 coin flip</span></button>
        <button class="cz-card" data-g="scratch"><div class="cz-ico">🎟️</div><b>Scratch Card</b><span>200 🪙</span></button>
        <button class="cz-card" data-g="slots"><div class="cz-ico">🎰</div><b>Gym Slots</b><span>Jackpot 777×</span></button></div>
        <div class="card"><div class="muted">Coins in the casino are earned by training only — no real money, ever. Flips won: ${S.stats.flipWins || 0}/${S.stats.flips || 0} · Slot spins: ${S.stats.slots || 0}</div></div>`;
    } else if (tab === 'gear') {
      const bag = bagItems(); const bank = S.items.filter((i) => i.bank && !equippedUids().has(i.uid));
      body = `<div class="card"><div class="cardhead"><h2>🛡️ Equipment</h2>${st.set ? `<span class="muted" style="color:${TIERS[st.set.tier].color}">${MATERIALS[st.set.tier]} set +${st.set.pct}%</span>` : '<span class="muted">Full armour set = bonus</span>'}</div>
        <div class="doll">${SLOTS.map((s) => {
          const inst = findInst(S.equip[s.id]); const it = inst && BY_ID[inst.id];
          return `<button class="dslot" data-eq="${inst ? inst.uid : ''}">${it ? itemCard(it, inst) : `<div class="icard empty"><div class="ii">${s.icon}</div></div>`}<span>${s.name}</span></button>`;
        }).join('')}</div>
        <div class="statbar">${['power', 'xp', 'coin', 'crit', 'luck'].map((k) => `<div><b>${k === 'crit' ? st.critChance : st[k]}%</b><span>${STAT_LABEL[k]}</span></div>`).join('')}</div>
        <div class="muted">Battle damage ×${(1 + st.power / 100).toFixed(2)} · XP ×${st.xpMult} · Coins ×${st.coinMult}</div></div>
        <div class="card"><div class="cardhead"><h2>🎒 Bag</h2><span class="muted">${bag.length}/${BAG_SIZE}</span></div>
        <div class="bag">${Array.from({ length: BAG_SIZE }, (_, i) => { const inst = bag[i]; return inst ? `<button class="bslot" data-uid="${inst.uid}">${itemCard(BY_ID[inst.id], inst, inst.locked ? 'locked' : '')}</button>` : '<div class="bslot"><div class="icard empty"></div></div>'; }).join('')}</div></div>
        <div class="card"><div class="cardhead"><h2>🏦 Bank</h2><span class="muted">${bank.length} items</span></div>
        ${bank.length ? `<div class="bag">${bank.map((inst) => `<button class="bslot" data-uid="${inst.uid}">${itemCard(BY_ID[inst.id], inst)}</button>`).join('')}</div>` : '<div class="empty">Overflow from a full bag lands here.</div>'}</div>
        <div class="card"><div class="cardhead"><h2>🎨 Cosmetics</h2><span class="muted">${S.owned.length} owned</span></div>
        <div class="bag">${S.owned.map((id) => { const it = BY_ID[id]; if (!it) return ''; const act = S.theme === id || S.title === id || (id === 'theme_emerald' && !S.theme); return `<button class="bslot" data-cos="${id}">${itemCard(it, null, act ? 'active' : '')}</button>`; }).join('')}</div>
        <div class="muted">Tap to apply. Themes recolour the whole app, titles show under the logo.</div></div>`;
    } else if (tab === 'shop') {
      const offers = shopToday(); const rr = S.shopReroll && S.shopReroll.date === today() ? S.shopReroll.n : 0;
      body = `<div class="card"><div class="cardhead"><h2>🛒 Daily Shop</h2><span class="muted">Restocks at midnight</span></div>
        ${offers.map((o, i) => { const it = BY_ID[o.id]; const key = today() + ':' + rr + ':' + i; const sold = (S.bought || []).includes(key);
          return `<div class="shop-row">${itemCard(it)}<div class="crate-main"><div class="crate-name" style="color:${TIERS[it.tier].color}">${esc(it.name)}</div><div class="drop-stats sm">${statLines(it) || `<span class="stat">${esc(it.desc || '')}</span>`}</div></div>
          <button class="gbtn sm" data-buy="${i}" ${sold ? 'disabled' : ''}>${sold ? 'SOLD' : `${o.price} ${o.cur === 'gems' ? '💎' : '🪙'}`}</button></div>`; }).join('')}
        <div class="row2"><button class="gbtn ghost" data-a="reroll">🔄 Restock now (2 💎)</button><button class="gbtn ghost" data-a="exchange">💎→🪙 1 gem = 150 coins</button></div></div>`;
    } else if (tab === 'forge') {
      const eq = equippedUids();
      const gear = S.items.filter((i) => BY_ID[i.id].type === 'gear' && !eq.has(i.uid) && !i.locked).sort((a, b) => BY_ID[a.id].tier - BY_ID[b.id].tier);
      fuseSel = fuseSel.filter((u) => gear.some((g) => g.uid === u));
      body = `<div class="card"><div class="cardhead"><h2>✨ Enchanting</h2><span class="muted">${S.dust} dust</span></div>
        <div class="muted">Tap any item in Hero › 🎒 Bag to enchant it from +0 up to +10. From +5, a failed enchant can SHATTER the item — pay 5 💎 for a blessed attempt to make it safe.</div></div>
        <div class="card"><div class="cardhead"><h2>🔮 Fusion</h2><span class="muted">${fuseSel.length}/3 selected</span></div>
        <div class="muted" style="margin-bottom:8px">Pick 3 gear items of the same tier → 1 item of the next tier (5% chance to jump two).</div>
        ${gear.length ? `<div class="bag">${gear.map((inst) => `<button class="bslot" data-fuse="${inst.uid}">${itemCard(BY_ID[inst.id], inst, fuseSel.includes(inst.uid) ? 'sel' : '')}</button>`).join('')}</div>` : '<div class="empty">No unlocked spare gear yet.</div>'}
        <button class="gbtn" data-a="fuse" ${fuseSel.length === 3 ? '' : 'disabled'}>🔮 Fuse</button></div>
        <div class="card"><div class="cardhead"><h2>♻️ Salvage</h2></div>
        <div class="muted" style="margin-bottom:8px">Turns unequipped, unlocked gear into dust (used for enchanting).</div>
        <div class="row2"><button class="gbtn ghost" data-salv="0">All Common</button><button class="gbtn ghost" data-salv="1">Uncommon & below</button><button class="gbtn ghost" data-salv="2">Rare & below</button></div></div>`;
    }
    if (tab === 'log' || tab === 'forge') {
      const groups = [['Weapons', (i) => i.slot === 'weapon'], ['Armour', (i) => ARMOUR.includes(i.slot)], ['Jewellery', (i) => i.slot === 'ring' || i.slot === 'amulet'],
        ['Consumables', (i) => i.type === 'cons'], ['Themes & Titles', (i) => i.type === 'theme' || i.type === 'title'], ['Rival trophies', (i) => !!i.rival], ['Event exclusives', (i) => !!i.event]];
      const all = CATALOG.filter((i) => !i.noDrop);
      const have = all.filter((i) => S.log[i.id]).length;
      body += `<div class="card"><div class="cardhead"><h2>📖 Collection Log</h2><span class="muted">${have}/${all.length} · ${Math.round(have / all.length * 100)}%</span></div>
        <div class="xp-bar"><div class="fill" style="width:${have / all.length * 100}%"></div></div>
        <div class="muted" style="margin-top:6px">Best ever drop: <span style="color:${TIERS[S.stats.best || 0].color}">${TIERS[S.stats.best || 0].name}</span> · Crates opened: ${S.stats.crates || 0} · Items shattered: ${S.stats.breaks || 0}</div></div>
        ${groups.map(([name, f]) => {
          const list = all.filter((i) => (name === 'Event exclusives' || name === 'Rival trophies' ? f(i) : f(i) && !i.event && !i.rival)).sort((a, b) => a.tier - b.tier);
          if (!list.length) return '';
          const got = list.filter((i) => S.log[i.id]).length;
          return `<div class="card"><div class="cardhead"><h2>${name}</h2><span class="muted">${got}/${list.length}</span></div>
            <div class="bag log">${list.map((i) => `<div class="bslot" title="${escAttr(i.name)}">${itemCard(i, S.log[i.id] > 1 ? { qty: S.log[i.id] } : null, S.log[i.id] ? '' : 'unseen')}</div>`).join('')}</div></div>`;
        }).join('')}`;
    }
    root.innerHTML = `
      <div class="card wallet-card">
        <div class="wallet-row"><div><b>${S.coins.toLocaleString()}</b><span>🪙 Coins</span></div><div><b>${S.gems}</b><span>💎 Gems</span></div><div><b>${S.dust.toLocaleString()}</b><span>✨ Dust</span></div></div>
        <div class="capbar"><div style="width:${Math.min(100, d.coins / coinCap() * 100)}%"></div></div>
        <div class="muted">Training coins today: ${d.coins}/${coinCap()} · Drops today: ${d.drops}/${dropCap()}</div>
        ${effectsHtml()}
      </div>
      ${body}`;

    root.querySelectorAll('[data-crate]').forEach((b) => (b.onclick = () => openCrate(b.dataset.crate)));
    root.querySelectorAll('[data-g]').forEach((b) => (b.onclick = () => ({ spin: spinWheel, flip: coinFlip, scratch: scratchCard, slots })[b.dataset.g]()));
    root.querySelectorAll('[data-uid]').forEach((b) => (b.onclick = () => itemSheet(Number(b.dataset.uid))));
    root.querySelectorAll('[data-eq]').forEach((b) => (b.onclick = () => { if (b.dataset.eq) itemSheet(Number(b.dataset.eq)); }));
    root.querySelectorAll('[data-cos]').forEach((b) => (b.onclick = () => itemSheet(null, b.dataset.cos)));
    root.querySelectorAll('[data-buy]').forEach((b) => (b.onclick = () => buy(Number(b.dataset.buy))));
    root.querySelectorAll('[data-fuse]').forEach((b) => (b.onclick = () => {
      const u = Number(b.dataset.fuse);
      if (fuseSel.includes(u)) fuseSel = fuseSel.filter((x) => x !== u);
      else if (fuseSel.length < 3) fuseSel.push(u);
      G.renderLoot();
    }));
    root.querySelectorAll('[data-salv]').forEach((b) => (b.onclick = () => salvageBelow(Number(b.dataset.salv))));
    root.querySelectorAll('[data-a]').forEach((b) => (b.onclick = () => {
      const a = b.dataset.a;
      if (a === 'fuse') { const s = fuseSel; fuseSel = []; fuse(s); }
      else if (a === 'reroll') { if (!canPay('gems', 2)) { showToast('Not enough 💎'); return; } pay('gems', 2); const n = S.shopReroll && S.shopReroll.date === today() ? S.shopReroll.n + 1 : 1; S.shopReroll = { date: today(), n }; save(); G.renderLoot(); }
      else if (a === 'exchange') { if (!canPay('gems', 1)) { showToast('Not enough 💎'); return; } pay('gems', 1); S.coins += 150; save(); G.sfx && G.sfx('coin'); G.renderLoot(); }
    }));
  };

  // ---------------- hook render ----------------
  if (typeof render === 'function') {
    const origRender = render;
    render = function () {
      origRender();
      try { payQuests(); payStreaks(); G.renderLoot(); G.emit('render'); } catch (e) { console.warn('loot render', e); }
    };
  }
  applyLooks();
  updateWallet();
  G.initLoot = () => { try { processNewWorkouts(); } catch (e) { console.warn(e); } };
})();
