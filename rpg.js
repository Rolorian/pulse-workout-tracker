/* Pulse Realm — the walkable RPG inside Adventure.
   Pulsehaven (your village, rebuilt through the Village system) → ten regions from the World Map → a dungeon in each
   → region bosses, world bosses from the Battle tab, and your league rivals wandering as buddies who level up.
   Every attack is a real set: reps are logged once, as normal workouts, so XP/coins/skills flow through the existing systems.
   Art: Ninja Adventure by Pixel-boy (CC0). Fonts: Pixelify Sans / Silkscreen (OFL). See assets/rpg/CREDITS.md. */
(function () {
  const G = (window.G = window.G || {});
  const KEY = 'pulse-rpg-v1';
  const A = 'assets/rpg/';
  const T = 16;
  const TEST = () => !!window.__PULSE_TEST;
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const dk = () => dateKey(new Date());
  function hash(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) { let a = hash(String(seed)); return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  // ================================================================== SAVE
  let R;
  function load() {
    try { R = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { R = null; }
    R = R || {};
    if (!R.v || R.v < 2) { // v1 → v2: the village got bigger; keep progress, re-place the hero in the square
      R.zone = 'village'; R.x = 20; R.y = 12; R.v = 2;
      R.kills = R.kills || {}; if (R.kills.goblin) R.kills.gate_goblin = 1;
    }
    R.zone = R.zone || 'village'; R.x = R.x == null ? 20 : R.x; R.y = R.y == null ? 12 : R.y; R.dir = R.dir || 0;
    R.q = R.q || 0; R.hp = R.hp == null ? 20 : R.hp; R.hpAt = R.hpAt || Date.now();
    R.potions = R.potions == null ? 1 : R.potions; R.elixirs = R.elixirs || 0;
    R.kills = R.kills || {}; R.fights = R.fights || 0; R.wins = R.wins || 0;
    R.music = R.music !== false; R.joy = !!R.joy; R.hint = R.hint || 0;
    R.dead = R.dead || {};      // zone → spawnId → time killed (respawns)
    R.conq = R.conq || {};      // region index → true (boss beaten in the Realm)
    R.dg = R.dg || {};          // dungeon index → clears
    R.seen = R.seen || { village: 1 };
    R.buddy = R.buddy || {};    // rival id → { xp, lvl, banked:{week:xp} }
    R.party = R.party || null;  // rival id following you
    R.moves = R.moves || {};    // slot → exercise override
    R.bounty = R.bounty || null; R.chests = R.chests || {};
  }
  load();
  let saveT = 0;
  function save(now) { R.savedAt = Date.now(); if (now) { clearTimeout(saveT); localStorage.setItem(KEY, JSON.stringify(R)); return; } clearTimeout(saveT); saveT = setTimeout(() => localStorage.setItem(KEY, JSON.stringify(R)), 250); }
  G.rpgState = () => R;

  // ================================================================== ITEMS (live in the normal loot system)
  G.registerItems && G.registerItems([
    { id: 'rpg_goblin_slayer', name: 'Goblin Slayer', icon: '🗡️', tier: 2, type: 'gear', slot: 'weapon', stats: { power: 12, crit: 3 }, special: true, desc: 'Taken from the goblin at Pulsehaven\'s gate. Still smells of turnips.' },
    { id: 'rpg_crown_slime', name: 'Slime King\'s Crown', icon: '👑', tier: 4, type: 'gear', slot: 'helm', stats: { xp: 18, luck: 10 }, special: true, desc: 'Sticky. Regal. Slightly damp.' },
    { id: 'rpg_lich_phylactery', name: 'Lich Lord\'s Phylactery', icon: '🔮', tier: 5, type: 'gear', slot: 'amulet', stats: { power: 30, crit: 6 }, special: true, desc: 'It whispers rep counts in the dark.' },
    { id: 'rpg_dragon_heart', name: 'World Dragon\'s Heart', icon: '❤️‍🔥', tier: 6, type: 'gear', slot: 'ring', stats: { power: 45, xp: 25, crit: 8 }, special: true, desc: 'Still beating. Still warm. Still terrifying.' }
  ]);

  // ================================================================== ASSETS
  const IMG = {};
  const SRC = {
    ts: 'tileset.png', ab: 'ruins.png', wl: 'walls.png', inf: 'interior.png', dog: 'chars/dog.png',
    fxRing: 'fx/f1.png', fxSpark: 'fx/f5.png', fxSlash: 'fx/f6.png', fxCross: 'fx/f7.png', fxArc: 'fx/f8.png', fxClaw: 'fx/f11.png', fxSmoke: 'fx/f18.png', fxHit: 'fx/f3.png',
    chest: 'items/big-treasure-chest.png', katana: 'items/katana.png', sword: 'items/sword.png'
  };
  function srcOf(k) { if (SRC[k]) return A + SRC[k]; if (/^c\d+$/.test(k)) return `${A}chars/${k}.png`; if (/^m\d+$/.test(k)) return `${A}mon/${k}.png`; return null; }
  function img(k) { if (IMG[k]) return IMG[k]; const s = srcOf(k); if (!s) return null; const i = new Image(); i.src = s; IMG[k] = i; return i; }
  const ready = (k) => { const i = img(k); return i && i.complete && i.naturalWidth > 0; };
  const CORE = ['ts', 'ab', 'wl', 'inf', 'c15', 'fxSlash', 'fxCross', 'fxArc', 'fxRing', 'fxClaw', 'fxSmoke', 'fxSpark', 'chest', 'katana', 'sword'];
  // tinted copies (Safari's canvas `filter` is unreliable, so tints are baked once)
  const TINT = {};
  function tinted(k, col, a) {
    const id = k + col + a; if (TINT[id]) return TINT[id];
    const i = img(k); if (!ready(k)) return i;
    const c = document.createElement('canvas'); c.width = i.naturalWidth; c.height = i.naturalHeight; const x = c.getContext('2d');
    x.drawImage(i, 0, 0); x.globalCompositeOperation = 'source-atop'; x.globalAlpha = a; x.fillStyle = col; x.fillRect(0, 0, c.width, c.height);
    TINT[id] = c; return c;
  }
  const faceUrl = (k) => (k === 'dog' ? `${A}face/dog.png` : /^c\d+$/.test(k) ? `${A}face/${k}.png` : `${A}face/c1.png`);

  // ================================================================== AUDIO (WebAudio → volume works on iOS; your own MP3s live in IndexedDB)
  const BUF = {}; let musicNode = null, musicGain = null, musicWant = null, musicName = null;
  const SFX = { sword: 'sword', kill: 'kill', gold: 'gold-1', power: 'power-up', win: 'succes', win2: 'succes-2', menu: 'menu-1', menu3: 'menu-3', alert: 'alert', over: 'game-over', magic: 'magic-1', hit1: '1', hit2: '2', hit3: '3', hit9: '9' };
  const SLOTS = [['village', 'Village'], ['wilds', 'Wilds'], ['dungeon', 'Dungeons'], ['battle', 'Battles'], ['boss', 'Boss fights']];
  function actx() { try { if (typeof initAudio === 'function') initAudio(); return typeof audioCtx !== 'undefined' ? audioCtx : null; } catch (e) { return null; } }
  const soundOn = () => typeof settings === 'undefined' || settings.sound !== false;
  function decode(ab) { const ctx = actx(); return new Promise((res) => { try { ctx.decodeAudioData(ab, res, () => res(null)); } catch (e) { res(null); } }); }
  function fetchBuf(path) { const ctx = actx(); if (!ctx) return Promise.resolve(null); if (!BUF[path]) BUF[path] = fetch(A + path).then((r) => r.arrayBuffer()).then(decode).catch(() => null); return BUF[path]; }
  // --- custom soundtrack storage
  let idb = null;
  function db() { if (idb) return idb; idb = new Promise((res) => { try { const r = indexedDB.open('pulse-rpg-music', 1); r.onupgradeneeded = () => r.result.createObjectStore('t'); r.onsuccess = () => res(r.result); r.onerror = () => res(null); } catch (e) { res(null); } }); return idb; }
  function idbGet(k) { return db().then((d) => d && new Promise((res) => { const q = d.transaction('t').objectStore('t').get(k); q.onsuccess = () => res(q.result || null); q.onerror = () => res(null); })); }
  function idbPut(k, v) { return db().then((d) => d && new Promise((res) => { const tx = d.transaction('t', 'readwrite'); v == null ? tx.objectStore('t').delete(k) : tx.objectStore('t').put(v, k); tx.oncomplete = () => res(true); tx.onerror = () => res(false); })); }
  const customHas = {};
  SLOTS.forEach(([s]) => idbGet('meta:' + s).then((m) => { if (m) customHas[s] = m; }).catch(() => {}));
  function musicBuf(slot) {
    const key = 'custom:' + slot;
    if (customHas[slot]) { if (!BUF[key]) BUF[key] = idbGet(slot).then((b) => (b ? b.arrayBuffer() : null)).then((ab) => (ab ? decode(ab) : null)); return BUF[key].then((b) => b || fetchBuf('music/' + slot + '.mp3')); }
    return fetchBuf('music/' + slot + '.mp3');
  }
  function sfx(name, vol = 0.55, rate = 1) {
    if (!soundOn() || TEST()) return; const ctx = actx(); if (!ctx) return;
    fetchBuf('sfx/' + SFX[name] + '.mp3').then((buf) => { if (!buf) return; const s = ctx.createBufferSource(); s.buffer = buf; s.playbackRate.value = rate; const g = ctx.createGain(); g.gain.value = vol; s.connect(g); g.connect(ctx.destination); s.start(); });
  }
  function blip(p) {
    if (!soundOn() || TEST()) return; const ctx = actx(); if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain(), n = ctx.currentTime; o.type = 'square'; o.frequency.value = p;
    g.gain.setValueAtTime(0.035, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.05); o.connect(g); g.connect(ctx.destination); o.start(n); o.stop(n + 0.06);
  }
  function music(slot) {
    musicWant = slot; if (TEST()) return; const ctx = actx(); if (!ctx) return;
    if (musicName === slot && musicNode) return;
    stopMusic(); if (!slot || !R.music || !soundOn()) return;
    musicBuf(slot).then((buf) => {
      if (!buf || musicWant !== slot || musicNode) return;
      musicGain = ctx.createGain(); musicGain.gain.setValueAtTime(0, ctx.currentTime); musicGain.gain.linearRampToValueAtTime(slot === 'battle' || slot === 'boss' ? 0.32 : 0.26, ctx.currentTime + 1.2);
      musicNode = ctx.createBufferSource(); musicNode.buffer = buf; musicNode.loop = true; musicNode.connect(musicGain); musicGain.connect(ctx.destination); musicNode.start(); musicName = slot;
    });
  }
  function stopMusic() {
    if (!musicNode) { musicName = null; return; }
    const ctx = actx(); const n = musicNode, g = musicGain;
    try { g.gain.cancelScheduledValues(ctx.currentTime); g.gain.setValueAtTime(g.gain.value, ctx.currentTime); g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); n.stop(ctx.currentTime + 0.55); } catch (e) {}
    musicNode = null; musicGain = null; musicName = null;
  }
  const zoneMusic = () => (Z ? Z.music : 'village');
  const buzz = (t) => { try { if (typeof haptic === 'function') haptic(t); } catch (e) {} };

  // ================================================================== CONTENT: regions, monsters, bosses
  const REG = () => (G.worldRegions ? G.worldRegions() : [{ name: 'Starter Meadow', boss: ['Grumpy Scarecrow'] }]);
  const DUN = () => (G.worldDungeons ? G.worldDungeons() : []);
  // biome per region (ground tiles, decor, colour grade, monsters)
  const BIOME = [
    { g: [['ts', 22, 11], ['ts', 23, 11]], path: ['ts', 24, 11], trees: ['treeA', 'treeB', 'pine'], deco: ['flowers', 'dots', 'tuft', 'clover'], grade: [246, 238, 226], mobs: ['slime', 'shroom', 'beetle'] },
    { g: [['ts', 23, 11], ['ts', 22, 11]], path: ['ts', 25, 11], trees: ['pine', 'pine', 'treeB', 'bigbush'], deco: ['tuft', 'twigs', 'clover', 'stump1'], grade: [205, 222, 205], mobs: ['goblin', 'snake', 'moss'] },
    { g: [['ts', 19, 11], ['ts', 18, 11]], path: ['ts', 20, 11], trees: ['rock', 'boulder', 'rock', 'pine'], deco: ['stone', 'twigs', 'tuft'], grade: [228, 222, 212], mobs: ['crab', 'bear', 'golem'] },
    { g: [['ts', 23, 11], ['ts', 23, 11]], path: ['ts', 24, 11], trees: ['bigbush', 'treeB', 'pond'], deco: ['tuft', 'tuft2', 'clover'], grade: [168, 210, 196], mobs: ['fish', 'lizard', 'wisp'], fog: 'rgba(170,220,210,.18)' },
    { g: [['ts', 20, 11], ['ts', 20, 11]], path: ['ts', 19, 11], trees: ['rock', 'boulder', 'stump'], deco: ['stone', 'twigs'], grade: [255, 236, 205], mobs: ['viper', 'scarab', 'imp'] },
    { g: [['ts', 15, 19], ['ts', 13, 19]], path: ['ts', 19, 19], trees: ['snowtree', 'pine', 'igloo', 'snowtree', 'boulder'], deco: ['snowball', 'stone'], grade: [214, 228, 255], mobs: ['eye', 'troll', 'wisp'], snow: true },
    { g: [['ts', 20, 11], ['ts', 20, 11]], path: ['inf', 13, 13], trees: ['boulder', 'rock', 'stump'], deco: ['stone', 'twigs'], grade: [255, 170, 140], mobs: ['flame', 'bat', 'scarab'], embers: true },
    { g: [['ts', 23, 11], ['ts', 23, 11]], path: ['inf', 13, 13], trees: ['pine', 'boulder', 'stump'], deco: ['stone', 'twigs'], grade: [150, 130, 190], mobs: ['skull', 'eye', 'skeleton'], fog: 'rgba(90,40,140,.18)' },
    { g: [['ts', 26, 11], ['ts', 19, 11]], path: ['ts', 18, 11], trees: ['bigbush', 'treeA', 'statue'], deco: ['flowers', 'dots'], grade: [235, 240, 255], mobs: ['owl', 'knight', 'wisp'] },
    { g: [['ts', 26, 11], ['ts', 26, 11]], path: ['ts', 19, 11], trees: ['boulder', 'statue', 'rock'], deco: ['stone'], grade: [255, 225, 170], mobs: ['knight', 'viking', 'troll'] }
  ];
  // monster roster — names that match the Battle tab are counted there too
  const MOB = {
    slime: ['Slime', 'm18', 16, [['Bounce', 3], ['Ooze', 2], ['Wobble', 0]], 15],
    shroom: ['Shroomling', 'm21', 16, [['Spore Puff', 3], ['Headbutt', 4], ['Wobble', 0]], 15],
    beetle: ['Shellback', 'm16', 20, [['Ram', 4], ['Shell Up', 0], ['Pinch', 3]], 20],
    goblin: ['Goblin', 'c1', 22, [['Club Swing', 5], ['Rock Throw', 3], ['Taunt', 0], ['Wild Flail', 7]], 25],
    snake: ['Grass Viper', 'm6', 18, [['Bite', 4], ['Coil', 0], ['Lunge', 5]], 20],
    moss: ['Moss Blob', 'm3', 22, [['Smother', 4], ['Wobble', 0], ['Slam', 5]], 25],
    crab: ['Rock Crab', 'm1', 26, [['Pincer', 5], ['Hide', 0], ['Crush', 7]], 35],
    bear: ['Cave Bear', 'm8', 30, [['Maul', 7], ['Roar', 0], ['Swipe', 5]], 45],
    golem: ['Mud Golem', 'm11', 32, [['Pound', 7], ['Harden', 0], ['Quake', 8]], 50],
    fish: ['Bog Lurker', 'm22', 26, [['Splash', 4], ['Chomp', 6], ['Submerge', 0]], 40],
    lizard: ['Marsh Lizard', 'm12', 24, [['Tail Whip', 5], ['Lick', 3], ['Lunge', 6]], 40],
    wisp: ['Wisp', 'm7', 22, [['Chill', 5], ['Flicker', 0], ['Hex', 6]], 40],
    viper: ['Sand Viper', 'm20', 28, [['Venom', 6], ['Coil', 0], ['Strike', 7]], 60],
    scarab: ['Fire Scarab', 'm15', 28, [['Burn', 6], ['Burrow', 0], ['Charge', 7]], 60],
    imp: ['Dust Imp', 'm10', 26, [['Scratch', 5], ['Cackle', 0], ['Pounce', 7]], 55],
    eye: ['Watcher', 'm17', 30, [['Glare', 6], ['Blink', 0], ['Beam', 8]], 70],
    troll: ['Troll', 'm14', 36, [['Club', 8], ['Roar', 0], ['Stomp', 9]], 75],
    flame: ['Ember Sprite', 'm2', 32, [['Scorch', 7], ['Flare', 0], ['Inferno', 9]], 90],
    bat: ['Fire Bat', 'm9', 28, [['Bite', 6], ['Screech', 0], ['Dive', 8]], 80],
    skull: ['Demon', 'm19', 38, [['Curse', 8], ['Laugh', 0], ['Soul Burn', 10]], 200],
    skeleton: ['Skeleton', 'c23', 34, [['Bone Slash', 7], ['Rattle', 0], ['Thrust', 8]], 40],
    owl: ['Sky Sentinel', 'm13', 40, [['Talon', 8], ['Hover', 0], ['Gale', 10]], 120],
    knight: ['Dark Knight', 'c18', 44, [['Cleave', 9], ['Guard', 0], ['Execute', 11]], 150],
    viking: ['Titan Guard', 'c20', 46, [['Axe', 10], ['War Cry', 0], ['Sunder', 12]], 160]
  };
  // region bosses (names come from the World Map)
  const RBOSS = [
    ['m4', 1.9, null, 55, [['Straw Swipe', 5], ['Crow Call', 0], ['Pitchfork', 8]]],
    ['c1', 2, '#c0392b', 62, [['War Club', 7], ['Rally', 0], ['Cleave', 10]]],
    ['m11', 2, '#8a8f99', 70, [['Boulder Fist', 8], ['Harden', 0], ['Landslide', 11]]],
    ['c4', 2, '#7d3c98', 76, [['Hex Bolt', 8], ['Cackle', 0], ['Bog Curse', 11]]],
    ['m20', 2.2, '#e1b12c', 82, [['Sand Bite', 9], ['Burrow', 0], ['Sandstorm', 12]]],
    ['c11', 2.1, '#a9d6ff', 88, [['Ice Fist', 10], ['Bellow', 0], ['Avalanche', 13]]],
    ['m2', 2.3, '#ff3b1f', 94, [['Magma Slam', 11], ['Smoulder', 0], ['Eruption', 14]]],
    ['c7', 2.1, '#3d1f5c', 100, [['Whisper', 11], ['Fade', 0], ['Despair', 15]]],
    ['c21', 2.1, '#ffd23f', 106, [['Holy Lance', 12], ['Halo', 0], ['Judgement', 16]]],
    ['c20', 2.4, '#ffb400', 115, [['Titan Fist', 13], ['Roar', 0], ['World Breaker', 17]]]
  ];
  // world bosses from the Battle tab — slaying one here slays it there too
  const WBOSS = { 0: { bi: 0, name: 'King Slime', spr: 'm18', sc: 2.6, tint: '#2ecc71', hp: 75, crown: true, item: 'rpg_crown_slime', intents: [['Body Slam', 7], ['Split', 0], ['Royal Flood', 10]] },
    7: { bi: 1, name: 'Lich Lord', spr: 'c23', sc: 2.3, tint: '#8e44ad', hp: 120, item: 'rpg_lich_phylactery', intents: [['Soul Drain', 10], ['Raise Dead', 0], ['Necrotic Nova', 14]] },
    9: { bi: 2, name: 'World Dragon', spr: 'm20', sc: 3, tint: '#b71c1c', hp: 150, item: 'rpg_dragon_heart', intents: [['Dragonfire', 13], ['Wingbeat', 6], ['Inhale', 0], ['Cataclysm', 18]] } };
  const bossSlainInBattleTab = (bi) => { try { return (typeof getBosses === 'function' ? getBosses() : []).some((b) => b.name === BOSSES[bi].name && b.defeated); } catch (e) { return false; } };
  const conquered = (ri) => !!R.conq[ri] || (G.regionDone ? G.regionDone(ri) : false);
  const regionOpen = (ri) => ri === 0 ? R.q >= 4 : conquered(ri - 1);

  // ================================================================== TILES & PREFABS
  // prefab: [sheet, sx, sy, w, h, solidRowsFromBottom]
  const PF = {
    houseO: ['ts', 0, 0, 4, 3, 2], houseB: ['ts', 4, 0, 4, 3, 2], houseC: ['ts', 8, 0, 4, 3, 2], dojo: ['ts', 12, 0, 4, 3, 2], hut: ['ts', 16, 0, 2, 2, 1],
    torii: ['ts', 0, 3, 3, 2, 0], treeA: ['ts', 0, 10, 2, 2, 1], treeB: ['ts', 2, 10, 2, 2, 1], pine: ['ts', 6, 10, 2, 2, 1], rock: ['ts', 12, 10, 2, 2, 1], stump: ['ts', 6, 18, 2, 2, 1],
    boulder: ['ts', 8, 25, 2, 2, 2], statue: ['ts', 26, 0, 2, 2, 1], field: ['ts', 20, 15, 3, 2, 2], cave: ['ts', 8, 21, 3, 3, 2], igloo: ['ts', 12, 21, 2, 3, 2],
    snowtree: ['ts', 0, 19, 2, 2, 1], snowpine: ['ts', 3, 21, 2, 3, 1], snowball: ['ts', 7, 24, 1, 1, 1], stairs: ['ts', 16, 3, 2, 3, 0], pond: ['ts', 18, 6, 5, 5, 5],
    ruin: ['ab', 0, 0, 3, 3, 2], ruin2: ['ab', 11, 0, 3, 3, 2], rubble: ['ab', 8, 1, 3, 2, 1], bigbush: ['ab', 0, 6, 3, 3, 1],
    fence: ['ts', 23, 3, 1, 1, 1], flowers: ['ts', 14, 9, 1, 1, 0], dots: ['ts', 2, 8, 1, 1, 0], tuft: ['ts', 0, 8, 1, 1, 0], tuft2: ['ts', 0, 5, 1, 1, 0], clover: ['ts', 0, 6, 1, 1, 0],
    pot: ['ts', 1, 6, 1, 1, 1], crate: ['ts', 2, 6, 1, 1, 1], stone: ['ts', 0, 7, 1, 1, 1], lantern: ['ts', 10, 5, 1, 1, 1], post: ['ts', 13, 6, 1, 1, 1], twigs: ['ts', 1, 5, 1, 1, 0],
    stump1: ['ts', 8, 8, 1, 1, 1], board: ['ts', 14, 6, 3, 1, 1], ladder: ['ts', 4, 12, 1, 2, 0], stall: ['ts', 7, 6, 2, 2, 1], wallb: ['ts', 21, 4, 4, 2, 2]
  };

  // ================================================================== ZONES
  // A zone holds its own ground tiles, collision, props, spawns and exits; the hero walks between them.
  function newZone(id, w, h, o) {
    const z = Object.assign({ id, w, h, ground: new Array(w * h), block: new Uint8Array(w * h), props: [], spawns: [], exits: [], npcs: [], lights: [], music: 'wilds', grade: [246, 238, 226] }, o || {});
    return z;
  }
  const zat = (z, x, y) => y * z.w + x;
  const zin = (z, x, y) => x >= 0 && y >= 0 && x < z.w && y < z.h;
  function zfill(z, x0, y0, x1, y1, t) { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (zin(z, x, y)) z.ground[zat(z, x, y)] = t; }
  function zplace(z, name, x, y, extra) {
    const p = PF[name]; if (!p) return null;
    const o = Object.assign({ name, sheet: p[0], sx: p[1], sy: p[2], w: p[3], h: p[4], solid: p[5], x, y }, extra || {});
    for (let r = 0; r < o.solid; r++) for (let c = 0; c < o.w; c++) { const bx = x + c, by = y + o.h - 1 - r; if (zin(z, bx, by)) z.block[zat(z, bx, by)] = 1; }
    z.props.push(o); return o;
  }
  const occupied = (z, x, y) => z.props.some((p) => x >= p.x && x < p.x + p.w && y >= p.y && y < p.y + p.h);
  function noise(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function smooth(x, y) { let v = 0; for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) v += noise(Math.floor((x + dx) / 2), Math.floor((y + dy) / 2)); return v / 9; }

  // ---------- Pulsehaven: buildings come from the Village system (ruins until you restore them) ----------
  const SITES = {
    castle: [18, 2, 'houseB'], observatory: [4, 3, 'houseC'], temple: [31, 3, 'statue'],
    market: [5, 9, 'stall'], townhall: [18, 8, 'houseO'], blacksmith: [30, 9, 'hut'],
    tavern: [4, 15, 'houseC'], training: [30, 15, 'dojo'], farm: [5, 21, 'field'], sanctuary: [30, 21, 'hut']
  };
  function buildVillage() {
    const W = 40, H = 46;
    const z = newZone('village', W, H, { name: 'Pulsehaven', music: 'village', safe: true, grade: [246, 236, 226] });
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) z.ground[zat(z, x, y)] = smooth(x, y) > 0.6 ? ['ts', 23, 11] : ['ts', 22, 11];
    const PAVE = ['ts', 19, 11], COB = ['ts', 18, 11], DIRT = ['ts', 20, 11];
    zfill(z, 4, 12, 35, 14, PAVE); zfill(z, 19, 5, 20, 11, PAVE); zfill(z, 19, 15, 20, 28, PAVE); zfill(z, 4, 19, 35, 19, COB);
    zfill(z, 6, 6, 6, 11, COB); zfill(z, 33, 6, 33, 11, COB); zfill(z, 19, 29, 20, 44, DIRT); zfill(z, 16, 34, 23, 37, DIRT);
    // forest ring
    for (let y = -1; y < H; y += 2) for (let x = -1; x < W; x += 2) {
      if (!(x <= 1 || x >= W - 3 || y <= 0 || y >= H - 3)) continue;
      const ox = x - ((Math.floor(y / 2) % 2) ? 1 : 0);
      if (y >= H - 4 && ox + 1 >= 18 && ox <= 21) continue; // south road out
      zplace(z, noise(x, y) > 0.45 ? 'pine' : noise(y, x) > 0.5 ? 'treeA' : 'treeB', ox, y);
    }
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if ((x <= 1 || x >= W - 2 || y <= 1 || y >= H - 2) && !(y >= H - 2 && (x === 19 || x === 20))) z.block[zat(z, x, y)] = 1;
    // buildings
    const VB = G._village ? G._village.B : [];
    Object.entries(SITES).forEach(([id, [x, y, pf]]) => {
      const b = VB.find((v) => v.id === id); const built = G._village ? G._village.done(id) : id === 'townhall';
      const o = zplace(z, built ? pf : (pf === 'field' || pf === 'stall' || pf === 'statue' ? 'rubble' : 'ruin'), x, y, { building: id, bname: b ? b.name : id, built });
      if (built && (pf === 'houseO' || pf === 'houseB' || pf === 'houseC' || pf === 'dojo')) { z.lights.push([x + 1.4, y + 1.9], [x + 2.9, y + 1.9]); o.smoke = [x + 2.6, y + 0.1]; }
      if (pf === 'statue' && built) zplace(z, 'torii', x - 1, y + 2);
    });
    zplace(z, 'board', 23, 11, { board: true });
    zplace(z, 'torii', 18, 24); z.block[zat(z, 18, 25)] = 1; z.block[zat(z, 20, 25)] = 1;
    [['lantern', 16, 12], ['lantern', 23, 15], ['lantern', 17, 27], ['lantern', 22, 27], ['crate', 26, 11], ['pot', 13, 11], ['crate', 9, 18], ['pot', 28, 18], ['post', 21, 16]].forEach(([n, x, y]) => { zplace(z, n, x, y); if (n === 'lantern') z.lights.push([x + 0.5, y + 0.3]); });
    [['treeA', 11, 4], ['treeB', 26, 4], ['pine', 12, 20], ['treeA', 25, 22], ['treeB', 2, 27], ['pine', 35, 27], ['rock', 10, 16]].forEach(([n, x, y]) => zplace(z, n, x, y));
    // the south fence & gate
    for (let x = 2; x <= W - 3; x++) if (x !== 19 && x !== 20) zplace(z, 'fence', x, 30);
    // outskirts field
    [['rock', 6, 33], ['rock', 30, 36], ['stump', 10, 39], ['treeB', 27, 32], ['treeA', 7, 38], ['stone', 25, 40], ['stone', 13, 35], ['crate', 17, 36], ['pot', 22, 36]].forEach(([n, x, y]) => zplace(z, n, x, y));
    scatter(z, 80, ['flowers', 'dots', 'tuft', 'tuft2', 'clover', 'twigs'], 7);
    z.exits.push({ x: 19, y: H - 1, w: 2, h: 1, to: 'r0', tx: 18, ty: 2, label: () => `${REG()[0].name}`, locked: () => (R.q < 4 ? 'The road south isn\'t safe yet.' : null) });
    z.npcs = [
      ['elder', 'c9', 'Elder Oren', 21, 11, 0, talkElder],
      ['mira', 'c6', 'Mira', 12, 13, 3, talkMira],
      ['bo', 'c8', 'Bo', R.q >= 2 ? 18 : 19, R.q >= 2 ? 29 : 30, 0, talkBo],
      ['pip', 'c25', 'Pip', 26, 20, 3, talkPip],
      ['dog', 'dog', 'Rex', 27, 21, 4, talkDog]
    ];
    z.spawns.push({ id: 'gate_goblin', mob: 'goblin', x: 20, y: 36, r: 2, lvl: 1, name: 'Gate Goblin', once: true, quest: true });
    z.spawns.push({ id: 'field_slime', mob: 'slime', x: 26, y: 37, r: 3, lvl: 1, cond: () => !!R.kills.gate_goblin }, { id: 'field_slime2', mob: 'slime', x: 10, y: 35, r: 3, lvl: 1, cond: () => !!R.kills.gate_goblin });
    z.gateClosed = () => R.q < 2;
    return z;
  }
  function scatter(z, n, kinds, salt) {
    for (let i = 0; i < n; i++) {
      const x = 2 + Math.floor(noise(i, salt) * (z.w - 4)), y = 2 + Math.floor(noise(salt + 9, i) * (z.h - 4));
      if (z.block[zat(z, x, y)] || occupied(z, x, y) || z.pathMask && z.pathMask[zat(z, x, y)]) continue;
      const g = z.ground[zat(z, x, y)]; if (z.noDecoOn && z.noDecoOn(g)) continue;
      zplace(z, kinds[i % kinds.length], x, y);
    }
  }

  // ---------- a region of the World Map: a winding trail from the north gate to the boss arena ----------
  function buildRegion(ri) {
    const W = 36, H = 48; const rg = REG()[ri] || { name: 'Wilds', boss: ['Boss'] }; const B = BIOME[ri] || BIOME[0];
    const r = rng('region' + ri);
    const z = newZone('r' + ri, W, H, { name: rg.name, ri, music: 'wilds', grade: B.grade, fog: B.fog, snow: B.snow, embers: B.embers });
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) z.ground[zat(z, x, y)] = smooth(x + ri * 7, y) > 0.58 ? B.g[1] : B.g[0];
    // carve a meandering trail + clearings
    const mask = new Uint8Array(W * H); z.pathMask = mask;
    const carve = (cx, cy, rad) => { for (let y = cy - rad; y <= cy + rad; y++) for (let x = cx - rad; x <= cx + rad; x++) if (zin(z, x, y) && x > 1 && x < W - 2 && y > 0 && y < H - 1 && (x - cx) ** 2 + (y - cy) ** 2 <= rad * rad + 1) mask[zat(z, x, y)] = 1; };
    let x = 18; const clear = [];
    for (let y = 0; y < H; y++) {
      if (y > 3 && y < H - 12 && y % 2 === 0) { const q = r(); x = clamp(x + (q < 0.34 ? -1 : q < 0.68 ? 1 : 0), 7, W - 8); }
      if (y >= H - 12) x += Math.sign(18 - x);
      carve(x, y, 2);
      for (let k = x - 1; k <= x; k++) if (zin(z, k, y)) z.ground[zat(z, k, y)] = B.path;
      if (y > 6 && y < H - 14 && y % 7 === 3) { const cx = clamp(x + (r() < 0.5 ? -6 : 6), 5, W - 6); carve(cx, y, 3 + (r() < 0.4 ? 1 : 0)); clear.push([cx, y]); for (let k = Math.min(cx, x); k <= Math.max(cx, x); k++) carve(k, y, 1); }
    }
    carve(18, H - 7, 5); // boss arena
    carve(18, 2, 2);     // entrance
    // fill everything that isn't trail with the biome's trees/rocks
    for (let y = -1; y < H; y += 2) for (let xx = -1; xx < W; xx += 2) {
      const ox = xx + ((y >> 1) % 2 ? 1 : 0);
      let free = true; for (let dy = 0; dy < 2; dy++) for (let dx = 0; dx < 2; dx++) if (zin(z, ox + dx, y + dy) && mask[zat(z, ox + dx, y + dy)]) free = false;
      if (!free) continue;
      zplace(z, B.trees[Math.floor(noise(ox + ri, y) * B.trees.length)] === 'pond' ? 'bigbush' : B.trees[Math.floor(noise(ox + ri, y) * B.trees.length)], ox, y);
    }
    for (let y = 0; y < H; y++) for (let xx = 0; xx < W; xx++) z.block[zat(z, xx, y)] = mask[zat(z, xx, y)] ? 0 : 1;
    z.noDecoOn = (g) => g === B.path;
    for (let i = 0; i < 120; i++) { const px = Math.floor(noise(i, ri + 3) * W), py = Math.floor(noise(ri + 5, i) * H); if (mask[zat(z, px, py)] && !z.block[zat(z, px, py)] && !occupied(z, px, py) && z.ground[zat(z, px, py)] !== B.path && (py > 4 && py < H - 13)) zplace(z, pick(B.deco), px, py); }
    // waystone at the entrance, the boss's arena, a dungeon cave in the biggest side clearing
    zplace(z, 'statue', 20, 1, { waystone: true });
    const cave = clear.length ? clear[Math.floor(clear.length / 2)] : [10, 20];
    const cv = zplace(z, 'cave', cave[0] - 1, cave[1] - 3, { cave: ri });
    z.exits.push({ x: cave[0], y: cave[1] - 1, w: 1, h: 1, to: `d${ri}-1`, tx: 6, ty: 8, label: () => (DUN()[ri] || {}).name || 'Dungeon', locked: () => (conquered(ri) ? null : `Sealed — defeat ${rg.boss[0]} first`) });
    void cv;
    // exits
    z.exits.push({ x: 17, y: 0, w: 3, h: 1, to: ri === 0 ? 'village' : 'r' + (ri - 1), tx: ri === 0 ? 19 : 18, ty: ri === 0 ? 43 : H - 3, label: () => (ri === 0 ? 'Pulsehaven' : REG()[ri - 1].name) });
    if (ri < 9) z.exits.push({ x: 17, y: H - 1, w: 3, h: 1, to: 'r' + (ri + 1), tx: 18, ty: 2, label: () => REG()[ri + 1].name, locked: () => (conquered(ri) ? null : `${rg.boss[0]} blocks the way`) });
    // monsters along the trail
    const lvl = 2 + ri * 5;
    clear.forEach(([cx, cy], i) => { z.spawns.push({ id: 'm' + i, mob: B.mobs[i % B.mobs.length], x: cx, y: cy, r: 2, lvl: lvl + (i % 3) }); if (i % 2 === 0) z.spawns.push({ id: 'n' + i, mob: B.mobs[(i + 1) % B.mobs.length], x: cx + 1, y: cy + 1, r: 2, lvl: lvl + 1 }); });
    for (let y = 10; y < H - 14; y += 9) z.spawns.push({ id: 't' + y, mob: B.mobs[(y >> 2) % B.mobs.length], x: pathX(z, y), y, r: 1, lvl, elite: y === 28 });
    const bd = RBOSS[ri];
    z.spawns.push({ id: 'boss', boss: ri, x: 18, y: H - 7, r: 0, lvl: lvl + 6 });
    if (WBOSS[ri]) { const li = clear.length - 1; const c = clear[li] || [8, 30]; z.spawns = z.spawns.filter((sp) => sp.id !== 'm' + li && sp.id !== 'n' + li); z.spawns.push({ id: 'world', world: ri, x: c[0], y: c[1], r: 0, lvl: lvl + 10 }); }
    void bd;
    // buddies hang out at the entrance of regions you've conquered
    return z;
  }
  function pathX(z, y) { for (let x = 2; x < z.w - 2; x++) if (z.pathMask[zat(z, x, y)] && z.pathMask[zat(z, x + 1, y)] && z.pathMask[zat(z, x - 1, y)]) return x; return 18; }

  // ---------- dungeons: three floors of stone rooms below each region ----------
  function buildDungeon(ri, floor) {
    const W = 30, H = 26; const dg = DUN()[ri] || { name: 'Dungeon', boss: ['Guardian'] }; const B = BIOME[ri] || BIOME[0];
    const r = rng('dg' + ri + '-' + floor + '-' + (R.dg[ri] || 0));
    const z = newZone(`d${ri}-${floor}`, W, H, { name: `${dg.name} · ${['', 'I', 'II', 'III'][floor]}`, ri, floor, dungeon: true, music: 'dungeon', grade: [200, 190, 215], dark: true });
    z.ground.fill(null); z.block.fill(1);
    // 3×3 grid of rooms, linked by a random spanning tree
    const rooms = []; const CW = 10, CH = 8;
    for (let gy = 0; gy < 3; gy++) for (let gx = 0; gx < 3; gx++) { const w = 6 + Math.floor(r() * 3), h = 5 + Math.floor(r() * 2); rooms.push({ gx, gy, x: gx * CW + 1 + Math.floor((CW - 1 - w) / 2), y: gy * CH + 1 + Math.floor((CH - 1 - h) / 2), w, h }); }
    const FLOOR = ['inf', 13, 13];
    const room = (rm) => { for (let y = rm.y; y < rm.y + rm.h; y++) for (let x = rm.x; x < rm.x + rm.w; x++) { z.ground[zat(z, x, y)] = FLOOR; z.block[zat(z, x, y)] = 0; } };
    rooms.forEach(room);
    const link = (a, b) => {
      const ax = a.x + (a.w >> 1), ay = a.y + (a.h >> 1), bx = b.x + (b.w >> 1), by = b.y + (b.h >> 1);
      for (let x = Math.min(ax, bx); x <= Math.max(ax, bx); x++) for (let k = 0; k < 2; k++) { z.ground[zat(z, x, ay + k)] = FLOOR; z.block[zat(z, x, ay + k)] = 0; }
      for (let y = Math.min(ay, by); y <= Math.max(ay, by); y++) for (let k = 0; k < 2; k++) { z.ground[zat(z, bx + k, y)] = FLOOR; z.block[zat(z, bx + k, y)] = 0; }
    };
    const seen = new Set([0]); const order = [0];
    while (seen.size < 9) { const a = order[Math.floor(r() * order.length)]; const ra = rooms[a]; const nb = rooms.map((x, i) => i).filter((i) => !seen.has(i) && Math.abs(rooms[i].gx - ra.gx) + Math.abs(rooms[i].gy - ra.gy) === 1); if (!nb.length) continue; const b = nb[Math.floor(r() * nb.length)]; link(ra, rooms[b]); seen.add(b); order.push(b); }
    if (r() < 0.6) link(rooms[4], rooms[r() < 0.5 ? 2 : 6]);
    z.wallStyle = ri % 2 ? 'green' : 'brown';
    const start = rooms[0], end = rooms[8];
    zplace(z, 'ladder', start.x + 1, start.y);
    z.exits.push({ x: start.x + 1, y: start.y + 1, w: 1, h: 1, to: floor === 1 ? 'r' + ri : `d${ri}-${floor - 1}`, tx: floor === 1 ? null : 0, ty: 0, up: true, label: () => (floor === 1 ? 'Back to the surface' : 'Up a floor') });
    if (floor < 3) { zplace(z, 'stairs', end.x + end.w - 3, end.y + end.h - 3, { solid: 0 }); z.exits.push({ x: end.x + end.w - 3, y: end.y + end.h - 1, w: 2, h: 1, to: `d${ri}-${floor + 1}`, tx: 0, ty: 0, down: true, label: () => 'Deeper', locked: () => (z.spawns.some((s) => s.guard && alive(z, s)) ? 'The stairs are guarded' : null) }); }
    // monsters & treasure
    const mobs = B.mobs.concat(['skeleton', 'bat']); const lvl = 4 + ri * 5 + floor;
    rooms.slice(1).forEach((rm, i) => {
      const cx = rm.x + (rm.w >> 1), cy = rm.y + (rm.h >> 1);
      if (i === 7 && floor === 3) z.spawns.push({ id: 'dboss', dboss: ri, x: cx, y: cy, r: 0, lvl: lvl + 8 });
      else if (i === 7) z.spawns.push({ id: 'guard', mob: mobs[Math.floor(r() * mobs.length)], x: cx, y: cy - 1, r: 1, lvl: lvl + 2, elite: true, guard: true });
      else if (r() < 0.75) z.spawns.push({ id: 'g' + i, mob: mobs[Math.floor(r() * mobs.length)], x: cx, y: cy, r: 2, lvl });
      if (r() < 0.35 && i !== 7) z.chests = (z.chests || []).concat([{ id: `c${floor}-${i}`, x: rm.x + 1 + Math.floor(r() * (rm.w - 2)), y: rm.y + rm.h - 1 }]);
    });
    z.entry = [start.x + 2, start.y + 2]; z.exitDown = [end.x + end.w - 2, end.y + end.h - 2 < end.y + end.h - 1 ? end.y + 1 : end.y + 1];
    z.dungeonRooms = rooms;
    return z;
  }

  // ================================================================== ENTITIES
  let Z = null; const ZCACHE = {};
  const ents = []; let hero = null;
  function zoneById(id) {
    if (ZCACHE[id]) return ZCACHE[id];
    let z;
    if (id === 'village') z = buildVillage();
    else if (/^r\d+$/.test(id)) z = buildRegion(Number(id.slice(1)));
    else if (/^d\d+-\d+$/.test(id)) { const [a, b] = id.slice(1).split('-').map(Number); z = buildDungeon(a, b); }
    else z = buildVillage();
    ZCACHE[id] = z; return z;
  }
  function mk(id, imgKey, x, y, o) {
    const e = Object.assign({ id, img: imgKey, tx: x, ty: y, x: x * T, y: y * T, dir: 0, path: [], moving: false, step: 0, speed: 4.2, home: [x, y], wander: Math.random() * 3, bob: Math.random() * 6 }, o || {});
    e.monster = /^m\d+$/.test(imgKey); e.dogSprite = imgKey === 'dog';
    ents.push(e); img(imgKey); return e;
  }
  const RESPAWN = 4 * 3600e3;
  function alive(z, s) {
    if (s.cond && !s.cond()) return false;
    if (s.once && R.kills[s.id]) return false;
    if (s.boss != null) { const t = (R.dead[z.id] || {})[s.id]; return !t || Date.now() - t > 20 * 3600e3; }
    if (s.world != null) return !bossSlainInBattleTab(WBOSS[s.world].bi);
    const t = (R.dead[z.id] || {})[s.id]; if (!t) return true;
    if (z.dungeon) return t < (z.enteredAt || 0); // dungeons reset each visit
    return Date.now() - t > RESPAWN;
  }
  function enemyDef(s, z) {
    if (s.boss != null) { const b = RBOSS[s.boss]; return { name: REG()[s.boss].boss[0], spr: b[0], sc: b[1], tint: b[2], hp: b[3], intents: b[4], boss: true, region: s.boss }; }
    if (s.world != null) { const w = WBOSS[s.world]; return { name: w.name, spr: w.spr, sc: w.sc, tint: w.tint, hp: w.hp, intents: w.intents, boss: true, world: s.world, crown: w.crown }; }
    if (s.dboss != null) { const dg = DUN()[s.dboss] || { boss: ['Guardian'] }; const b = RBOSS[s.dboss]; return { name: dg.boss[0], spr: b[0], sc: 1.8, tint: '#4a148c', hp: Math.round(b[3] * 0.9), intents: b[4], boss: true, dungeonBoss: s.dboss }; }
    const m = MOB[s.mob] || MOB.slime; const ri = z.ri || 0;
    return { name: s.name || (s.elite ? 'Elite ' : '') + m[0], base: m[0], spr: m[1], sc: s.elite ? 1.35 : 1, tint: s.elite ? '#ff8a00' : null, hp: Math.round((m[2] + ri * 2) * (s.elite ? 1.5 : 1)), intents: m[3].map(([n, d]) => [n, d ? d + Math.floor(ri * 0.8) + (s.elite ? 2 : 0) : 0]), xp: m[4], elite: s.elite };
  }
  function spawnZone() {
    ents.length = 0;
    hero = mk('hero', 'c15', R.x, R.y, { dir: R.dir, speed: 5 });
    Z.npcs.forEach(([id, im, name, x, y, wr, talk]) => { if (id === 'bo') { x = R.q >= 2 ? 18 : 19; y = R.q >= 2 ? 29 : 30; } mk(id, im, x, y, { name, wanderR: wr, talk, speed: id === 'dog' ? 3.5 : 2.4 }); });
    Z.spawns.forEach((s) => { if (!alive(Z, s)) return; const d = enemyDef(s, Z); mk('s:' + s.id, d.spr, s.x, s.y, { name: d.name, spawn: s, def: d, enemy: true, wanderR: s.r, speed: d.boss ? 1.2 : 2, home: [s.x, s.y], scale: d.sc, tint: d.tint, crown: d.crown, lvl: s.lvl }); });
    (Z.chests || []).forEach((c) => { if (!(R.chests[Z.id + (R.dg[Z.ri] || 0)] || {})[c.id]) mk('chest:' + c.id, 'chest', c.x, c.y, { chest: c, name: 'Chest' }); });
    buddiesInZone().forEach((b, i) => { const sp = buddySpot(i); if (sp) mk('buddy:' + b.id, b.spr, sp[0], sp[1], { name: `${b.name}`, buddy: b, wanderR: 3, talk: talkBuddy, speed: 2.6 }); });
    if (R.party) { const b = buddyInfo(R.party); if (b && !ents.some((e) => e.buddy && e.buddy.id === b.id)) { const sp = freeNear(hero.tx, hero.ty); mk('buddy:' + b.id, b.spr, sp[0], sp[1], { name: b.name, buddy: b, follow: true, talk: talkBuddy, speed: 5 }); } }
    ents.forEach((e) => { if (e.buddy && R.party === e.buddy.id) { e.follow = true; e.wanderR = 0; } });
    if (blockedAt(hero.tx, hero.ty)) { const sp = freeNear(hero.tx, hero.ty); hero.tx = sp[0]; hero.ty = sp[1]; hero.x = hero.tx * T; hero.y = hero.ty * T; }
  }
  function freeNear(x, y) { for (let r = 0; r < 8; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const nx = x + dx, ny = y + dy; if (zin(Z, nx, ny) && !Z.block[zat(Z, nx, ny)] && !entAt(nx, ny)) return [nx, ny]; } return [x, y]; }
  const entAt = (x, y, except) => ents.find((e) => e !== except && e.tx === x && e.ty === y && !e.ghost);
  const blockedAt = (x, y) => !zin(Z, x, y) || Z.block[zat(Z, x, y)];
  function solid(x, y, who) {
    if (blockedAt(x, y)) return true;
    if (Z.gateClosed && Z.gateClosed() && y >= 30 && who === hero) return true;
    const e = entAt(x, y, who); if (e && !(who === hero && e.follow) && !(who && who.follow && e === hero)) return true;
    return false;
  }
  function findPath(sx, sy, gx, gy, who) {
    if (sx === gx && sy === gy) return [];
    const W = Z.w, H = Z.h; const prev = new Int32Array(W * H).fill(-1); const q = [sy * W + sx]; prev[sy * W + sx] = sy * W + sx; let qi = 0;
    while (qi < q.length) {
      const c = q[qi++]; const cx = c % W, cy = (c / W) | 0; if (cx === gx && cy === gy) break;
      for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) { const nx = cx + dx, ny = cy + dy; if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue; const n = ny * W + nx; if (prev[n] !== -1) continue; if (solid(nx, ny, who) && !(nx === gx && ny === gy && !Z.block[n])) continue; prev[n] = c; q.push(n); }
    }
    if (prev[gy * W + gx] === -1) return null;
    const out = []; let c = gy * W + gx; while (c !== sy * W + sx) { out.unshift([c % W, (c / W) | 0]); c = prev[c]; }
    return out;
  }
  const DIRS = { '0,1': 0, '0,-1': 1, '-1,0': 2, '1,0': 3 };
  function face(e, x, y) { const dx = Math.sign(x - e.tx), dy = Math.sign(y - e.ty); if (dx || dy) e.dir = Math.abs(x - e.tx) > Math.abs(y - e.ty) ? (dx < 0 ? 2 : 3) : (dy < 0 ? 1 : 0); }

  // ================================================================== GROUND & WALL RENDERING
  function buildGround(z) {
    const c = document.createElement('canvas'); c.width = z.w * T; c.height = z.h * T; const g = c.getContext('2d'); g.imageSmoothingEnabled = false;
    g.fillStyle = z.dark ? '#0d0a12' : '#0d1a0f'; g.fillRect(0, 0, c.width, c.height);
    for (let y = 0; y < z.h; y++) for (let x = 0; x < z.w; x++) { const t = z.ground[zat(z, x, y)]; if (!t) continue; g.drawImage(IMG[t[0]], t[1] * T, t[2] * T, T, T, x * T, y * T, T, T); }
    if (z.dungeon) drawWalls(z, g);
    else {
      g.fillStyle = 'rgba(30,20,10,.16)';
      for (let y = 1; y < z.h; y++) for (let x = 0; x < z.w; x++) { const t = z.ground[zat(z, x, y)], u = z.ground[zat(z, x, y - 1)]; if (t && u && t !== u && t[1] !== u[1]) g.fillRect(x * T, y * T, T, 1); }
    }
    z.canvas = c;
  }
  function drawWalls(z, g) {
    // stone walls around every walkable tile, using the wall sheet's frame pieces
    const ox = z.wallStyle === 'green' ? 5 : 0, oy = 6;
    const open = (x, y) => zin(z, x, y) && !!z.ground[zat(z, x, y)];
    for (let y = 0; y < z.h; y++) for (let x = 0; x < z.w; x++) {
      if (open(x, y)) continue;
      const n = open(x, y + 1), s = open(x, y - 1), e = open(x - 1, y), w = open(x + 1, y);
      const ne = open(x - 1, y + 1), nw = open(x + 1, y + 1), se = open(x - 1, y - 1), sw = open(x + 1, y - 1);
      let p = null;
      if (n && !e && !w) p = [ox + 1, oy];               // wall above a floor → top edge
      else if (s && !e && !w) p = [ox + 1, oy + 4];      // wall below → bottom edge
      else if (e && !n && !s) p = [ox + 4, oy + 1];      // floor to the left → right edge
      else if (w && !n && !s) p = [ox, oy + 1];          // floor to the right → left edge
      else if (n && w) p = [ox, oy];
      else if (n && e) p = [ox + 4, oy];
      else if (s && w) p = [ox, oy + 4];
      else if (s && e) p = [ox + 4, oy + 4];
      else if (nw && !ne) p = [ox, oy];
      else if (ne && !nw) p = [ox + 4, oy];
      else if (sw) p = [ox, oy + 4];
      else if (se) p = [ox + 4, oy + 4];
      if (p) g.drawImage(IMG.wl, p[0] * T, p[1] * T, T, T, x * T, y * T, T, T);
    }
  }

  // ================================================================== DOM
  let root, cv, ctx, dlg, menuEl, joyEl, battleEl, open = false, raf = 0, last = 0, W = 0, H = 0, DPR = 1, S = 3;
  const cam = { x: 0, y: 0, shake: 0 };
  function build() {
    if (root) return;
    root = document.createElement('div'); root.id = 'realm'; root.className = 'realm';
    root.innerHTML = `
      <canvas id="realmCv"></canvas>
      <div class="rl-hud">
        <div class="rl-quest" id="rlQuest"></div>
        <div class="rl-right"><div class="rl-hearts" id="rlHearts"></div><div class="rl-gold"><i class="px px-coin"></i><span id="rlGold">0</span></div>
          <div class="rl-btns"><button class="rl-btn" id="rlMapBtn" aria-label="World map">◈</button><button class="rl-btn" id="rlMenuBtn" aria-label="Menu">≡</button></div></div>
      </div>
      <div class="rl-party" id="rlParty"></div>
      <div class="rl-zone" id="rlZone"></div>
      <div class="rl-hint" id="rlHint"></div>
      <div class="rl-joy" id="rlJoy"><div class="rl-knob"></div></div>
      <div class="rl-dlg" id="rlDlg"></div>
      <div class="rl-menu" id="rlMenu"></div>
      <div class="rl-loading" id="rlLoading"><div class="rl-ltitle">PULSE REALM</div><div class="rl-lbar"><i></i></div></div>
      <div class="rl-fade" id="rlFade"></div>`;
    document.body.appendChild(root);
    cv = root.querySelector('#realmCv'); ctx = cv.getContext('2d');
    dlg = root.querySelector('#rlDlg'); menuEl = root.querySelector('#rlMenu'); joyEl = root.querySelector('#rlJoy');
    cv.addEventListener('pointerdown', onTap);
    root.querySelector('#rlMenuBtn').onclick = (e) => { e.stopPropagation(); if (busy || B) return; menuOpen ? closeMenu() : openMenu(); };
    root.querySelector('#rlMapBtn').onclick = (e) => { e.stopPropagation(); if (busy || B) return; openTravel(); };
    dlg.addEventListener('pointerdown', (e) => { e.stopPropagation(); advanceDlg(); });
    bindJoy();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopMusic(); else if (open) music(B ? B.music : zoneMusic()); });
  }
  function resize() {
    if (!root || !open) return;
    const nb = document.getElementById('navbar'); root.style.bottom = (nb ? nb.offsetHeight : 0) + 'px';
    DPR = Math.min(3, window.devicePixelRatio || 1);
    W = root.clientWidth; H = root.clientHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); cv.style.width = W + 'px'; cv.style.height = H + 'px';
    S = Math.max(2, Math.round(Math.min(W / (9.5 * T), H / (12 * T)) * DPR)) || 3;
    ctx.imageSmoothingEnabled = false;
    if (bcv) sizeBattle();
  }

  // ================================================================== OPEN / CLOSE / TRAVEL
  let coreReady = false;
  function whenCore(cb) { CORE.forEach(img); const ok = () => CORE.every(ready); if (ok()) { coreReady = true; cb(); return; } const iv = setInterval(() => { if (ok()) { clearInterval(iv); coreReady = true; cb(); } }, 60); }
  function enterZone(id, tx, ty, opts = {}) {
    Z = zoneById(id); Z.enteredAt = Date.now();
    if (Z.dungeon && opts.fresh) Z.enteredAt = Date.now();
    if (tx == null || (Z.dungeon && opts.arrive)) { const sp = opts.up ? Z.exitDown : Z.entry || [18, 2]; tx = sp[0]; ty = sp[1]; }
    R.zone = id; R.x = tx; R.y = ty; R.seen[id] = 1; save(true);
    if (!Z.canvas) buildGround(Z);
    spawnZone(); snapCam(); renderHud();
    music(zoneMusic());
    zoneBanner(Z.name, Z.dungeon ? 'Dungeon' : Z.ri != null ? `Region ${Z.ri + 1}${conquered(Z.ri) ? ' · conquered' : ''}` : 'Your village');
  }
  function travel(id, tx, ty, opts) { if (busy) return; busy = true; hero.path = []; fade(false, () => { enterZone(id, tx, ty, opts); busy = false; }); sfx('menu3', 0.35); }
  G.rpgOpen = function () {
    build();
    open = true; root.classList.add('on'); document.body.classList.add('realm-on');
    resize();
    whenCore(() => {
      if (!Z) { try { enterZone(R.zone, R.x, R.y); } catch (e) { console.warn('realm zone', e); R.zone = 'village'; R.x = 20; R.y = 12; enterZone('village', 20, 12); } }
      else { if (G._village && Z.id === 'village') refreshVillage(); snapCam(); renderHud(); music(B ? B.music : zoneMusic()); }
      regen(); checkBuddies();
      if (!B) setTimeout(flushWorkouts, 300);
      if (R.hint < 1 && !TEST()) setTimeout(() => hint(R.joy ? 'Use the stick to walk · tap people to talk' : 'Tap anywhere to walk · tap people to talk'), 900);
    });
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
  };
  G.rpgClose = function () {
    if (!open) return;
    if (!B) flushWorkouts();
    open = false; if (root) root.classList.remove('on'); document.body.classList.remove('realm-on');
    cancelAnimationFrame(raf); raf = 0; stopMusic(); closeMenu();
    if (hero) { R.x = hero.tx; R.y = hero.ty; R.dir = hero.dir; save(true); }
  };
  G.rpgIsOpen = () => open;
  function refreshVillage() { // buildings may have been restored in the Village tab since we last looked
    const sig = Object.keys(SITES).map((id) => (G._village && G._village.done(id) ? 1 : 0)).join('');
    if (ZCACHE.village && ZCACHE.village.sig !== sig) { delete ZCACHE.village; Z = null; enterZone('village', hero ? hero.tx : R.x, hero ? hero.ty : R.y); }
    if (ZCACHE.village) ZCACHE.village.sig = sig;
  }
  function regen() { const now = Date.now(); const hrs = (now - (R.hpAt || now)) / 3600e3; if (hrs > 0) { R.hp = Math.min(maxHp(), R.hp + Math.floor(hrs * 6)); if (hrs >= 1 / 6) R.hpAt = now; } if (R.hp <= 0) R.hp = 1; save(); }
  function maxHp() { let con = 0; try { con = G.heroStat ? G.heroStat('CON') : 0; } catch (e) {} return 20 + 4 * clamp(Math.floor(con / 12), 0, 5); }

  // ================================================================== INPUT
  let tapMark = null;
  function screenToTile(cx, cy) { const r = cv.getBoundingClientRect(); const px = ((cx - r.left) * DPR + cam.x * S) / S, py = ((cy - r.top) * DPR + cam.y * S) / S; return [Math.floor(px / T), Math.floor(py / T)]; }
  function onTap(ev) {
    actx(); if (!musicNode) music(B ? B.music : zoneMusic());
    if (B || menuOpen || busy || !Z) return;
    if (dlgQ) { advanceDlg(); return; }
    const [tx, ty] = screenToTile(ev.clientX, ev.clientY);
    const tgt = ents.find((e) => e !== hero && (e.tx === tx || (e.scale > 1.5 && Math.abs(e.tx - tx) <= 1)) && (e.ty === ty || (e.ty === ty + 1 && !e.dogSprite) || (e.scale > 1.5 && e.ty - ty <= 2 && e.ty >= ty)));
    if (tgt) { goTo(tgt); return; }
    // buildings, the board, waystones
    const pr = Z.props.find((p) => (p.building || p.board || p.waystone) && tx >= p.x && tx < p.x + p.w && ty >= p.y && ty < p.y + p.h);
    if (pr) { goToProp(pr); return; }
    if (!zin(Z, tx, ty)) return;
    let gx = tx, gy = ty;
    if (solid(gx, gy, hero)) {
      if (Z.gateClosed && Z.gateClosed() && ty >= 30 && ty <= 32 && (tx === 19 || tx === 20)) { const bo = ents.find((e) => e.id === 'bo'); if (bo) { goTo(bo); return; } }
      const n = [[0, 1], [1, 0], [-1, 0], [0, -1]].map(([dx, dy]) => [tx + dx, ty + dy]).find(([x, y]) => !solid(x, y, hero));
      if (!n) { tapMark = { x: tx, y: ty, t: 0, bad: true }; return; }
      [gx, gy] = n;
    }
    const p = findPath(hero.tx, hero.ty, gx, gy, hero);
    if (!p) { tapMark = { x: tx, y: ty, t: 0, bad: true }; return; }
    hero.path = p; hero.onArrive = null; tapMark = { x: gx, y: gy, t: 0 };
    if (R.hint < 1) { R.hint = 1; save(); hideHint(); }
  }
  function walkAdjacent(tx, ty, w, h, then) {
    const spots = [];
    for (let x = tx - 1; x <= tx + w; x++) for (let y = ty - 1; y <= ty + h; y++) { const inside = x >= tx && x < tx + w && y >= ty && y < ty + h; if (inside) continue; if (!solid(x, y, hero) || (x === hero.tx && y === hero.ty)) spots.push([x, y]); }
    let best = null; spots.forEach(([x, y]) => { const p = x === hero.tx && y === hero.ty ? [] : findPath(hero.tx, hero.ty, x, y, hero); if (p && (!best || p.length < best.length)) best = p; });
    if (!best) { tapMark = { x: tx, y: ty, t: 0, bad: true }; return; }
    hero.path = best; tapMark = null; hero.onArrive = then;
    if (!best.length) { hero.onArrive = null; then(); }
    if (R.hint < 1) { R.hint = 1; save(); hideHint(); }
  }
  function goTo(e) { walkAdjacent(e.tx, e.ty, 1, 1, () => { face(hero, e.tx, e.ty); interact(e); }); }
  function goToProp(p) { walkAdjacent(p.x, p.y + p.h - 1 - Math.max(0, p.solid - 1), p.w, Math.max(1, p.solid), () => { face(hero, p.x + (p.w >> 1), p.y + p.h - 1); useProp(p); }); }
  const joy = { on: false, x: 0, y: 0 };
  function bindJoy() {
    const knob = joyEl.querySelector('.rl-knob'); let id = null, cx = 0, cy = 0;
    joyEl.addEventListener('pointerdown', (e) => { e.stopPropagation(); actx(); id = e.pointerId; joyEl.setPointerCapture(id); const r = joyEl.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; joy.on = true; mv(e); });
    const mv = (e) => { if (e.pointerId !== id) return; let dx = e.clientX - cx, dy = e.clientY - cy; const d = Math.hypot(dx, dy), m = 38; if (d > m) { dx *= m / d; dy *= m / d; } joy.x = dx / m; joy.y = dy / m; knob.style.transform = `translate(${dx}px,${dy}px)`; };
    joyEl.addEventListener('pointermove', mv);
    const up = (e) => { if (e.pointerId !== id) return; id = null; joy.on = false; joy.x = joy.y = 0; knob.style.transform = ''; };
    joyEl.addEventListener('pointerup', up); joyEl.addEventListener('pointercancel', up);
  }

  // ================================================================== UPDATE
  let busy = false;
  function stepEnt(e, dt) {
    if (!e.moving) {
      if (e === hero && joy.on && !e.path.length && !dlgQ && !B && !busy) {
        const ax = Math.abs(joy.x), ay = Math.abs(joy.y);
        if (Math.max(ax, ay) > 0.35) { const dx = ax > ay ? Math.sign(joy.x) : 0, dy = ax > ay ? 0 : Math.sign(joy.y); e.dir = DIRS[dx + ',' + dy]; if (!solid(e.tx + dx, e.ty + dy, e)) e.path = [[e.tx + dx, e.ty + dy]]; else bump(e.tx + dx, e.ty + dy); }
      }
      if (e.path.length) {
        const [nx, ny] = e.path[0];
        if (solid(nx, ny, e)) { const g = e.path[e.path.length - 1]; const p = e.path.length > 1 ? findPath(e.tx, e.ty, g[0], g[1], e) : null; e.path = p || []; if (!e.path.length) return; }
        const [mx, my] = e.path.shift(); face(e, mx, my); e.fromX = e.tx * T; e.fromY = e.ty * T; e.prevT = [e.tx, e.ty]; e.tx = mx; e.ty = my; e.moving = true; e.prog = 0;
      } else if (e.onArrive) { const f = e.onArrive; e.onArrive = null; f(); }
    }
    if (e.moving) {
      e.prog += dt * e.speed; const p = Math.min(1, e.prog);
      e.x = e.fromX + (e.tx * T - e.fromX) * p; e.y = e.fromY + (e.ty * T - e.fromY) * p; e.step += dt * e.speed * 2;
      if (p >= 1) { e.moving = false; e.x = e.tx * T; e.y = e.ty * T; if (e === hero) arrived(); }
    }
  }
  function bump(x, y) { const ex = Z.exits.find((q) => x >= q.x && x < q.x + q.w && y >= q.y && y < q.y + q.h); if (ex) useExit(ex); }
  function arrived() {
    R.x = hero.tx; R.y = hero.ty; R.dir = hero.dir; save();
    if (Math.random() < 0.3) dust(hero);
    const ex = Z.exits.find((q) => hero.tx >= q.x && hero.tx < q.x + q.w && hero.ty >= q.y && hero.ty < q.y + q.h);
    if (ex) { hero.path = []; useExit(ex); return; }
    // open chests by walking into them
    checkAggro();
  }
  let exitCool = 0;
  function useExit(ex) {
    if (busy || Date.now() < exitCool) return; exitCool = Date.now() + 900;
    const lock = ex.locked && ex.locked();
    if (lock) { hint(lock); sfx('menu3', 0.3, 0.7); buzz('light'); // step back
      if (hero.prevT && !(hero.prevT[0] === hero.tx && hero.prevT[1] === hero.ty)) { const [px, py] = hero.prevT; hero.path = [[px, py]]; } return; }
    const toZ = ex.to;
    if (/^d/.test(toZ)) { const opts = ex.up ? { up: true, arrive: true } : { arrive: true, fresh: !/^d/.test(Z.id) }; if (!/^d/.test(Z.id)) { R.dgVisit = (R.dgVisit || 0) + 1; } travel(toZ, null, null, opts); return; }
    if (/^r/.test(toZ) && Z.dungeon) { const rz = zoneById(toZ); const cave = rz.exits.find((q) => /^d/.test(q.to)); travel(toZ, cave.x, cave.y + 1); return; }
    travel(toZ, ex.tx, ex.ty);
  }
  function wander(e, dt) {
    if (e === hero || e.moving || e.path.length || e.frozen || (dlgQ && dlgQ.who === e.id)) return;
    if (e.follow) { const d = Math.abs(e.tx - hero.tx) + Math.abs(e.ty - hero.ty); if (d > 1 && hero.prevT) { if (d > 6) { const sp = freeNear(hero.tx, hero.ty); e.tx = sp[0]; e.ty = sp[1]; e.x = e.tx * T; e.y = e.ty * T; return; } const p = findPath(e.tx, e.ty, hero.prevT[0], hero.prevT[1], e); if (p && p.length) e.path = p.slice(0, 1); } return; }
    if (!e.wanderR) return;
    e.wander -= dt; if (e.wander > 0) return; e.wander = 1.5 + Math.random() * 3.5;
    const [hx, hy] = e.home; const x = hx + Math.round((Math.random() * 2 - 1) * e.wanderR), y = hy + Math.round((Math.random() * 2 - 1) * e.wanderR);
    if (solid(x, y, e)) return;
    if (Z.id === 'village' && e.enemy && y < 32) return;
    if (Z.id === 'village' && !e.enemy && y >= 30 && Z.gateClosed && Z.gateClosed()) return;
    const p = findPath(e.tx, e.ty, x, y, e); if (p && p.length < 8) e.path = p;
  }
  function checkAggro() {
    if (B || busy || dlgQ) return;
    for (const e of ents) {
      if (!e.enemy || e.aggro) continue;
      const d = Math.abs(e.tx - hero.tx) + Math.abs(e.ty - hero.ty);
      if (d <= (e.def.boss ? 1 : 2)) { e.aggro = true; interact(e); return; }
    }
    for (const e of ents) if (e.chest && Math.abs(e.tx - hero.tx) + Math.abs(e.ty - hero.ty) <= 1) { interact(e); return; }
  }

  // ================================================================== PARTICLES / AMBIENCE
  const parts = [];
  function dust(e) { for (let i = 0; i < 3; i++) parts.push({ x: e.x + 8 + (Math.random() - 0.5) * 6, y: e.y + 15, vx: (Math.random() - 0.5) * 8, vy: -4 - Math.random() * 4, life: 0.5, max: 0.5, c: Z.snow ? '240,248,255' : '200,180,140', r: 1 }); }
  function ambient(dt, night) {
    if (parts.length > 140) return;
    const vx = cam.x, vy = cam.y, vw = W * DPR / S, vh = H * DPR / S;
    if (Z.snow) { if (Math.random() < dt * 14) parts.push({ x: vx + Math.random() * vw, y: vy - 4, vx: -4 + Math.random() * 3, vy: 14 + Math.random() * 10, life: 8, max: 8, c: '255,255,255', r: 1, snow: true }); }
    else if (Z.embers) { if (Math.random() < dt * 8) parts.push({ x: vx + Math.random() * vw, y: vy + vh + 2, vx: (Math.random() - 0.5) * 6, vy: -12 - Math.random() * 10, life: 5, max: 5, c: '255,140,40', r: 1, fly: true }); }
    else if (Z.dungeon) { if (Math.random() < dt * 2) parts.push({ x: vx + Math.random() * vw, y: vy + Math.random() * vh, vx: (Math.random() - 0.5) * 3, vy: -2, life: 4, max: 4, c: '200,190,255', r: 1, fly: true }); }
    else if (night) { if (Math.random() < dt * 4) parts.push({ x: vx + Math.random() * vw, y: vy + Math.random() * vh, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6, life: 4, max: 4, c: '220,255,140', r: 1, fly: true }); }
    else if (Math.random() < dt * 1.6) parts.push({ x: vx + Math.random() * vw, y: vy - 4, vx: 10 + Math.random() * 8, vy: 6 + Math.random() * 5, life: 6, max: 6, c: Math.random() > 0.5 ? '120,170,60' : '200,130,60', r: 1, leaf: true });
    Z.props.forEach((p) => { if (p.smoke && Math.random() < dt * 0.9) parts.push({ x: p.smoke[0] * T, y: p.smoke[1] * T, vx: 3 + Math.random() * 3, vy: -6 - Math.random() * 3, life: 2.4, max: 2.4, c: '190,190,200', r: 2, puff: true }); });
  }
  function daylight() { const d = new Date(); const h = d.getHours() + d.getMinutes() / 60; if (h >= 7 && h < 17) return 0; if (h >= 17 && h < 20) return (h - 17) / 3; if (h >= 20 || h < 5) return 1; return 1 - (h - 5) / 2; }

  // ================================================================== DRAW
  function drawSprite(c, e, t) {
    const sc = e.scale || 1; const sz = 16 * sc; const sx = Math.round(e.x + 8 - sz / 2), sy = Math.round(e.y + 16 - sz);
    c.fillStyle = 'rgba(10,6,20,.32)'; c.beginPath(); c.ellipse(e.x + 8, e.y + 15, 5.5 * sc, 2.2 * sc, 0, 0, 7); c.fill();
    if (e.chest) { if (ready('chest')) c.drawImage(IMG.chest, 0, 0, 16, 14, e.x, e.y + 2 + Math.round(Math.sin(t * 3) * 0.6), 16, 14); return; }
    const k = e.img; if (!ready(k)) return;
    const im = e.tint ? tinted(k, e.tint, 0.38) : IMG[k];
    if (e.dogSprite) { const f = e.moving ? Math.floor(e.step) % 2 : Math.floor(t * 1.5) % 2; c.save(); if (e.dir === 2) { c.translate(e.x + 16, e.y); c.scale(-1, 1); c.drawImage(im, f * 16, 0, 16, 16, 0, 0, 16, 16); } else c.drawImage(im, f * 16, 0, 16, 16, e.x, e.y, 16, 16); c.restore(); return; }
    let row = e.moving ? Math.floor(e.step) % 4 : 0; if (e.monster) row = Math.floor(t * 5 + e.bob) % 4;
    c.drawImage(im, e.dir * 16, row * 16, 16, 16, sx, sy, sz, sz);
    if (e.crown) drawCrown(c, sx + sz / 2, sy + sz * 0.12, sc);
    if (e.enemy && e.lvl) { c.font = '5px Silkscreen, monospace'; c.textAlign = 'center'; c.fillStyle = 'rgba(0,0,0,.7)'; c.fillText('Lv' + e.lvl, e.x + 8.5, sy - 1.5); c.fillStyle = e.def.boss ? '#ff6b6b' : e.def.elite ? '#ffb347' : '#f3e3c3'; c.fillText('Lv' + e.lvl, e.x + 8, sy - 2); }
    if (e.follow) { c.fillStyle = '#7dff9a'; c.fillRect(e.x + 7, sy - 3, 2, 2); }
  }
  function drawCrown(c, x, y, sc) { const s = sc; c.fillStyle = '#ffd23f'; c.fillRect(x - 4 * s, y, 8 * s, 2 * s); c.fillRect(x - 4 * s, y - 2 * s, 1.5 * s, 2 * s); c.fillRect(x - 0.75 * s, y - 3 * s, 1.5 * s, 3 * s); c.fillRect(x + 2.5 * s, y - 2 * s, 1.5 * s, 2 * s); c.fillStyle = '#e74c3c'; c.fillRect(x - 0.5 * s, y + 0.3 * s, s, s); }
  function drawProp(c, p) { const im = IMG[p.sheet]; if (!im) return; c.drawImage(im, p.sx * T, p.sy * T, p.w * T, p.h * T, p.x * T, p.y * T, p.w * T, p.h * T); }
  function snapCam() { if (!hero) return; cam.x = hero.x + 8 - W * DPR / S / 2; cam.y = hero.y + 8 - H * DPR / S / 2; clampCam(); }
  function clampCam() { const vw = W * DPR / S, vh = H * DPR / S; cam.x = clamp(cam.x, 0, Math.max(0, Z.w * T - vw)); cam.y = clamp(cam.y, 0, Math.max(0, Z.h * T - vh)); if (vw > Z.w * T) cam.x = (Z.w * T - vw) / 2; if (vh > Z.h * T) cam.y = (Z.h * T - vh) / 2; }
  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!open) return;
    const t = now / 1000;
    const ld = root.querySelector('#rlLoading');
    if (!coreReady || !Z || !Z.canvas) { ld.style.display = ''; ld.querySelector('i').style.width = Math.round(CORE.filter(ready).length / CORE.length * 100) + '%'; return; }
    ld.style.display = 'none';
    if (B) { battleFrame(dt, t); return; }
    ents.forEach((e) => { wander(e, dt); stepEnt(e, dt); });
    const night = Z.dungeon ? 0 : daylight();
    ambient(dt, night > 0.5);
    const vw = W * DPR / S, vh = H * DPR / S;
    cam.x += (hero.x + 8 - vw / 2 - cam.x) * Math.min(1, dt * 8); cam.y += (hero.y + 8 - vh / 2 - cam.y) * Math.min(1, dt * 8); clampCam();
    const c = ctx; c.setTransform(1, 0, 0, 1, 0, 0); c.imageSmoothingEnabled = false;
    c.fillStyle = Z.dark ? '#08060c' : '#0d1a0f'; c.fillRect(0, 0, cv.width, cv.height);
    let shx = 0, shy = 0; if (cam.shake > 0) { cam.shake -= dt * 30; shx = (Math.random() - 0.5) * cam.shake; shy = (Math.random() - 0.5) * cam.shake; }
    c.setTransform(S, 0, 0, S, -Math.round((cam.x + shx) * S), -Math.round((cam.y + shy) * S));
    c.drawImage(Z.canvas, 0, 0);
    if (Z.gateClosed && Z.gateClosed()) { c.fillStyle = `rgba(255,90,60,${0.1 + Math.sin(t * 3) * 0.05})`; c.fillRect(19 * T, 30 * T, 2 * T, T); }
    Z.exits.forEach((ex) => { const lk = ex.locked && ex.locked(); c.fillStyle = lk ? `rgba(255,80,60,${0.12 + Math.sin(t * 3) * 0.05})` : `rgba(255,230,140,${0.1 + Math.sin(t * 2) * 0.06})`; c.fillRect(ex.x * T, ex.y * T, ex.w * T, ex.h * T); });
    if (tapMark) { tapMark.t += dt; const a = 1 - tapMark.t / 0.6; if (a <= 0) tapMark = null; else { c.strokeStyle = tapMark.bad ? `rgba(255,90,90,${a})` : `rgba(255,240,180,${a})`; c.lineWidth = 1; const r = 3 + tapMark.t * 8; c.beginPath(); c.ellipse(tapMark.x * T + 8, tapMark.y * T + 12, r, r * 0.5, 0, 0, 7); c.stroke(); } }
    const list = [];
    Z.props.forEach((p) => list.push({ k: (p.y + p.h) * T - (p.solid ? 0 : 8), p }));
    ents.forEach((e) => list.push({ k: e.y + 16, e }));
    list.sort((a, b) => a.k - b.k);
    list.forEach((o) => { if (o.p) drawProp(c, o.p); else drawSprite(c, o.e, t); });
    // building nameplates for ruins you can restore
    Z.props.forEach((p) => { if (p.building && !p.built) { c.font = '5px Silkscreen, monospace'; c.textAlign = 'center'; c.fillStyle = 'rgba(0,0,0,.65)'; const tw = c.measureText(p.bname).width + 4; c.fillRect(p.x * T + p.w * 8 - tw / 2, p.y * T - 3, tw, 7); c.fillStyle = '#ffd23f'; c.fillText(p.bname, p.x * T + p.w * 8, p.y * T + 2); } });
    ents.forEach((e) => { const m = marker(e); if (!m) return; const y = e.y - 9 - ((e.scale || 1) - 1) * 16 + Math.sin(t * 4) * 1.5; c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(e.x + 6, y - 1, 5, 9); c.fillStyle = m === '!' ? '#ffd23f' : m === '?' ? '#9be7ff' : '#ff5a4a'; c.fillRect(e.x + 7, y, 3, 5); c.fillRect(e.x + 7, y + 6, 3, 2); });
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; if (p.leaf) p.vx += Math.sin(t * 2 + i) * dt * 10; if (p.fly) { p.vx += (Math.random() - 0.5) * 20 * dt; p.vy += (Math.random() - 0.5) * 20 * dt; } if (p.snow) p.vx += Math.sin(t + i) * dt * 4;
      const a = p.puff ? (p.life / p.max) * 0.45 : p.fly ? Math.abs(Math.sin(t * 3 + i)) : Math.min(1, p.life / p.max * 2);
      c.fillStyle = `rgba(${p.c},${a})`; const r = p.puff ? p.r + (1 - p.life / p.max) * 3 : p.r;
      if (p.puff) { c.beginPath(); c.arc(p.x, p.y, r, 0, 7); c.fill(); } else c.fillRect(Math.round(p.x), Math.round(p.y), r, r);
    }
    c.setTransform(1, 0, 0, 1, 0, 0);
    // colour grade: the zone's palette, dusk/night, then lights and a vignette
    const gr = Z.grade; const n = night;
    c.globalCompositeOperation = 'multiply';
    c.fillStyle = `rgb(${Math.round(gr[0] - (gr[0] - 85) * n)},${Math.round(gr[1] - (gr[1] - 80) * n)},${Math.round(gr[2] - (gr[2] - 145) * n)})`;
    c.fillRect(0, 0, cv.width, cv.height);
    if (Z.fog) { c.globalCompositeOperation = 'source-over'; c.fillStyle = Z.fog; c.fillRect(0, 0, cv.width, cv.height); }
    c.globalCompositeOperation = 'lighter';
    const lights = (Z.lights || []).map(([x, y]) => [x * T, y * T, 26]);
    if (Z.dungeon) lights.push([hero.x + 8, hero.y + 8, 70]);
    if (n > 0.15 || Z.dungeon) lights.forEach(([x, y, r]) => { const sx = (x - cam.x) * S, sy = (y - cam.y) * S, rr = r * S * (1 + Math.sin(t * 7 + x) * 0.03); const g = c.createRadialGradient(sx, sy, 0, sx, sy, rr); g.addColorStop(0, `rgba(255,170,70,${Z.dungeon ? 0.22 : 0.42 * n})`); g.addColorStop(1, 'rgba(255,120,40,0)'); c.fillStyle = g; c.fillRect(sx - rr, sy - rr, rr * 2, rr * 2); });
    c.globalCompositeOperation = 'source-over';
    const vg = c.createRadialGradient(cv.width / 2, cv.height / 2, Math.min(cv.width, cv.height) * (Z.dungeon ? 0.2 : 0.35), cv.width / 2, cv.height / 2, Math.max(cv.width, cv.height) * 0.75);
    vg.addColorStop(0, 'rgba(8,4,16,0)'); vg.addColorStop(1, `rgba(8,4,16,${Z.dungeon ? 0.85 : 0.55})`); c.fillStyle = vg; c.fillRect(0, 0, cv.width, cv.height);
  }
  function marker(e) {
    if (e.id === 'elder' && (R.q === 0 || R.q === 3 || R.q === 5)) return R.q === 0 ? '!' : '?';
    if (e.id === 'bo' && R.q === 1) return '!';
    if (e.enemy && e.def.boss && !e.aggro) return 'x';
    if (e.buddy && !e.follow && e.buddy.lvlUp) return '!';
    return null;
  }

  // ================================================================== HUD
  function objective() {
    const QT = ['Speak to Elder Oren', 'Talk to Bo at the south gate', 'Defeat the goblin outside the gate', 'Return to Elder Oren'];
    if (R.q < 4) return ['Goblins at the Gate', QT[R.q]];
    const regs = REG(); const nx = regs.findIndex((x, i) => !conquered(i));
    if (R.q === 5) return ['The Road South', 'Report back to Elder Oren'];
    if (nx === -1) return ['Legend of Pulsehaven', 'Every region conquered. Hunt the world bosses.'];
    return [nx === 0 ? 'The Road South' : regs[nx].name, `Defeat ${regs[nx].boss[0]} in ${regs[nx].name}`];
  }
  function renderHud() {
    if (!root) return;
    const [t, o] = objective();
    const q = root.querySelector('#rlQuest'); q.innerHTML = `<div class="rq-t">${esc(t)}</div><div class="rq-o"><i></i>${esc(o)}</div>`;
    const sig = t + o; q.classList.toggle('pulse', sig !== renderHud.last); renderHud.last = sig;
    R.hp = Math.min(R.hp, maxHp());
    root.querySelector('#rlHearts').innerHTML = heartsHtml(R.hp, maxHp());
    root.querySelector('#rlGold').textContent = (G.state ? G.state().coins : 0).toLocaleString();
    joyEl.style.display = R.joy ? '' : 'none';
    const pb = root.querySelector('#rlParty'); const b = R.party && buddyInfo(R.party);
    pb.innerHTML = b ? `<div class="rp-face" style="background-image:url(${faceUrl(b.spr)})"></div><div><div class="rp-n">${esc(b.short)}</div><div class="rp-l">Lv ${b.lvl}</div></div>` : ''; pb.style.display = b ? '' : 'none';
  }
  function heartsHtml(hp, max) { let h = ''; for (let i = 0; i < Math.ceil(max / 4); i++) { const v = clamp(hp - i * 4, 0, 4); h += `<i class="px-heart" style="--f:${4 - v}"></i>`; } return h; }
  let hintT = 0;
  function hint(txt) { const h = root.querySelector('#rlHint'); h.textContent = txt; h.classList.add('on'); clearTimeout(hintT); hintT = setTimeout(hideHint, 4200); }
  function hideHint() { const h = root && root.querySelector('#rlHint'); if (h) h.classList.remove('on'); }
  function zoneBanner(name, sub) { const z = root.querySelector('#rlZone'); z.innerHTML = `<div class="rz-n">${esc(name)}</div><div class="rz-s">${esc(sub)}</div>`; z.classList.remove('on'); void z.offsetWidth; z.classList.add('on'); }
  function fade(inOnly, cb) { const f = root.querySelector('#rlFade'); if (inOnly) { cb && cb(); return; } f.classList.add('on'); setTimeout(() => { cb && cb(); setTimeout(() => f.classList.remove('on'), 60); }, TEST() ? 10 : 420); }

  // ================================================================== MENUS: travel map, moves, soundtrack, party
  let menuOpen = false;
  function closeMenu() { menuOpen = false; if (menuEl) { menuEl.classList.remove('on'); menuEl.innerHTML = ''; } }
  function showMenu(html, bind) { menuOpen = true; menuEl.innerHTML = `<div class="rm-box">${html}</div>`; menuEl.classList.add('on'); menuEl.onclick = (e) => { if (e.target === menuEl) closeMenu(); }; bind && bind(menuEl); menuEl.querySelectorAll('[data-close]').forEach((b) => (b.onclick = closeMenu)); }
  function openMenu() {
    sfx('menu3', 0.4);
    const h = G.heroState ? G.heroState() : { name: 'Hero' };
    const b = R.party && buddyInfo(R.party);
    showMenu(`<div class="rm-title">${esc(h.name || 'Hero')}</div>
      <div class="rm-sub">Hearts ${R.hp}/${maxHp()} · Potions ${R.potions} · Elixirs ${R.elixirs} · Wins ${R.wins}</div>
      <div class="rm-grid"><button class="rm-item" data-m="travel">World map</button><button class="rm-item" data-m="moves">Moves</button>
        <button class="rm-item" data-m="party">${b ? 'Party: ' + esc(b.short) : 'Buddies'}</button><button class="rm-item" data-m="sound">Soundtrack</button></div>
      <button class="rm-item" data-m="music">Music <b>${R.music ? 'ON' : 'OFF'}</b></button>
      <button class="rm-item" data-m="joy">Controls <b>${R.joy ? 'STICK' : 'TAP'}</b></button>
      <div class="rm-sep">Other screens</div>
      <div class="rm-grid"><button class="rm-item" data-go="map">Map log</button><button class="rm-item" data-go="dungeons">Dungeon runs</button><button class="rm-item" data-go="village">Village bundles</button><button class="rm-item" data-go="league">League</button></div>
      <button class="rm-item ghost" data-close>Back to the realm</button>`, (m) => {
      m.querySelectorAll('[data-m]').forEach((x) => (x.onclick = () => {
        const k = x.dataset.m;
        if (k === 'music') { R.music = !R.music; save(); if (R.music) music(zoneMusic()); else stopMusic(); openMenu(); }
        else if (k === 'joy') { R.joy = !R.joy; save(); renderHud(); openMenu(); }
        else if (k === 'travel') openTravel(); else if (k === 'moves') openMoves(); else if (k === 'sound') openSound(); else if (k === 'party') openParty();
      }));
      m.querySelectorAll('[data-go]').forEach((x) => (x.onclick = () => { closeMenu(); G.nav && G.nav('adventure', x.dataset.go); }));
    });
  }
  function openTravel() {
    sfx('menu3', 0.4);
    const regs = REG(); const dgs = DUN();
    const row = (id, name, sub, st, extra) => `<button class="tv-row ${st}" ${st === 'locked' ? 'disabled' : `data-tv="${id}"`}><span class="tv-pin"></span><span class="tv-main"><span class="tv-n">${esc(name)}</span><span class="tv-s">${sub}</span></span>${extra || ''}</button>`;
    const html = `<div class="rm-title">World Map</div><div class="rm-sub">Travel to any place you've reached. Bosses unlock the road onward.</div>
      <div class="tv-list">${row('village', 'Pulsehaven', `${Object.keys(SITES).filter((id) => G._village && G._village.done(id)).length}/10 buildings restored`, Z && Z.id === 'village' ? 'here' : 'open')}
      ${regs.map((rg, i) => {
        const openR = regionOpen(i); const seen = R.seen['r' + i]; const st = !openR ? 'locked' : Z && Z.id === 'r' + i ? 'here' : conquered(i) ? 'done' : 'open';
        const wb = WBOSS[i] && !bossSlainInBattleTab(WBOSS[i].bi) && openR ? ` · <em>${WBOSS[i].name} roams here</em>` : '';
        const sub = !openR ? `Locked — defeat ${regs[i - 1] ? regs[i - 1].boss[0] : 'the gate goblin'}` : conquered(i) ? `Conquered · dungeon: ${esc((dgs[i] || {}).name || '')}${R.dg[i] ? ` (cleared ×${R.dg[i]})` : ''}` : `Boss: ${esc(rg.boss[0])}${seen ? '' : ' · unexplored'}`;
        return row('r' + i, `${i + 1}. ${rg.name}`, sub + wb, st);
      }).join('')}</div><button class="rm-item ghost" data-close>Close</button>`;
    showMenu(html, (m) => m.querySelectorAll('[data-tv]').forEach((x) => (x.onclick = () => { const id = x.dataset.tv; closeMenu(); if (Z && id === Z.id) return; if (id === 'village') travel('village', 20, 13); else travel(id, 18, 2); })));
  }
  // ---------- moves: built from the exercises you actually train ----------
  const SLOT_DEF = [
    { id: 'strike', name: 'Strike', mult: 1, cats: ['chest', 'arms', 'back', 'shoulders'], fx: 'fxSlash', hint: 'Steady damage', def: 'Press-ups' },
    { id: 'smash', name: 'Smash', mult: 1.25, cats: ['legs'], fx: 'fxCross', hint: 'Big hit · shakes the ground', def: 'Squats' },
    { id: 'quick', name: 'Flurry', mult: 0.85, cats: ['core', 'cardio', 'full', 'other'], fx: 'fxArc', hint: 'Two fast hits · +crit', def: 'Lunges', hits: 2 },
    { id: 'guard', name: 'Guard', timed: true, fx: 'fxRing', hint: 'Block the next attack + counter', def: 'Plank' }
  ];
  function exMeta(name) { try { return EXERCISES.find((e) => e.name === name) || null; } catch (e) { return null; } }
  function catOf(name) { try { return getCategoryForExercise(name); } catch (e) { return 'other'; } }
  const HOLDS = ['Plank', 'Wall sit', 'Side plank', 'Hollow hold'];
  function autoMove(slot) {
    const counts = {}; try { workouts.slice(-400).forEach((w) => { counts[w.exercise] = (counts[w.exercise] || 0) + (w.sets || 1); }); } catch (e) {}
    const ranked = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
    if (slot.timed) return ranked.find((n) => HOLDS.includes(n)) || 'Plank';
    const used = SLOT_DEF.filter((s) => s !== slot && !s.timed).map((s) => R.moves[s.id]).filter(Boolean);
    return ranked.find((n) => { const m = exMeta(n); return m && m.unit === 'reps' && slot.cats.includes(catOf(n)) && !used.includes(n); }) || slot.def;
  }
  function moves() {
    return SLOT_DEF.map((s) => {
      const ex = R.moves[s.id] || autoMove(s); const m = exMeta(ex) || { unit: s.timed ? 'minutes' : 'reps' };
      const hard = typeof HARD_BODYWEIGHT !== 'undefined' && HARD_BODYWEIGHT.has(ex);
      return Object.assign({}, s, { ex, unit: m.unit, mult: s.timed ? 0 : s.mult * (hard ? 1.6 : 1), hard, name: `${s.name}: ${ex}` });
    });
  }
  function openMoves() {
    const mv = moves(); let pool = []; try { pool = EXERCISES.filter((e) => typeof trainStyle !== 'function' || trainStyle() !== 'bodyweight' || isBodyweight(e.name)); } catch (e) {}
    showMenu(`<div class="rm-title">Your moves</div><div class="rm-sub">Each move is an exercise. Auto picks what you train most — change any slot.</div>
      ${mv.map((m) => `<label class="mv-slot"><span class="mv-sn">${m.id === 'strike' ? 'Strike' : m.id === 'smash' ? 'Smash' : m.id === 'quick' ? 'Flurry' : 'Guard'} <em>${m.hint}${m.hard ? ' · hard exercise ×1.6' : ''}</em></span>
        <select data-slot="${m.id}"><option value="">Auto (${esc(autoMove(SLOT_DEF.find((s) => s.id === m.id)))})</option>${pool.filter((e) => (m.timed ? HOLDS.includes(e.name) : e.unit === 'reps')).map((e) => `<option ${R.moves[m.id] === e.name ? 'selected' : ''}>${esc(e.name)}</option>`).join('')}</select></label>`).join('')}
      <button class="rm-item ghost" data-close>Done</button>`, (m) => m.querySelectorAll('[data-slot]').forEach((s) => (s.onchange = () => { if (s.value) R.moves[s.dataset.slot] = s.value; else delete R.moves[s.dataset.slot]; save(); })));
  }
  // ---------- soundtrack: drop in your own MP3s per mood ----------
  function openSound() {
    showMenu(`<div class="rm-title">Soundtrack</div><div class="rm-sub">Use your own music for any mood. Files stay on this phone.</div>
      ${SLOTS.map(([s, n]) => `<div class="snd-row"><div><div class="snd-n">${n}</div><div class="snd-s">${customHas[s] ? esc(customHas[s].name) : 'Default pack track'}</div></div>
        <label class="rm-mini">Choose<input type="file" accept="audio/*" data-snd="${s}" hidden></label>${customHas[s] ? `<button class="rm-mini ghost" data-rst="${s}">Reset</button>` : ''}<button class="rm-mini ghost" data-play="${s}">▶</button></div>`).join('')}
      <button class="rm-item ghost" data-close>Done</button>`, (m) => {
      m.querySelectorAll('[data-snd]').forEach((inp) => (inp.onchange = () => {
        const f = inp.files && inp.files[0]; if (!f) return; const s = inp.dataset.snd;
        if (f.size > 25 * 1024 * 1024) { hint('That file is over 25 MB — try a shorter track'); return; }
        idbPut(s, f).then((ok) => { if (!ok) { hint('Could not save that file'); return; } const meta = { name: f.name.slice(0, 40), size: f.size }; idbPut('meta:' + s, meta); customHas[s] = meta; delete BUF['custom:' + s]; if (musicName === s) { stopMusic(); music(s); } openSound(); hint(`${meta.name} will play for ${SLOTS.find((x) => x[0] === s)[1]}`); });
      }));
      m.querySelectorAll('[data-rst]').forEach((b) => (b.onclick = () => { const s = b.dataset.rst; idbPut(s, null); idbPut('meta:' + s, null); delete customHas[s]; delete BUF['custom:' + s]; if (musicName === s) { stopMusic(); music(s); } openSound(); }));
      m.querySelectorAll('[data-play]').forEach((b) => (b.onclick = () => { actx(); const s = b.dataset.play; const keep = R.music; R.music = true; stopMusic(); music(s); R.music = keep; }));
    });
  }

  // ================================================================== BUDDIES — your league rivals, out in the world and levelling up
  const BUDDY_SPR = { gary: 'c22', kate: 'c17', larry: 'c16', machine: 'c21', yuki: 'c4', brick: 'c14', sofia: 'c12', dave: 'c3' };
  function roster() { try { return G.rivalRoster ? G.rivalRoster() : []; } catch (e) { return []; } }
  const lvlFor = (xp) => Math.max(1, Math.floor(Math.sqrt(Math.max(0, xp) / 40)) + 1);
  function buddyInfo(id) {
    const r = roster().find((x) => x.id === id); if (!r) return null;
    const b = R.buddy[id] = R.buddy[id] || { xp: 0, lvl: 1, week: null, wxp: 0, banked: 0 };
    const total = b.banked + (r.xp || 0) + b.xp; const lvl = lvlFor(total);
    return { id, name: r.name, short: r.name.split(' ').pop(), spr: BUDDY_SPR[id] || 'c3', lvl, total, weekXp: r.xp || 0, rank: r.rank, lines: r, lvlUp: lvl > (b.lvl || 1) };
  }
  function checkBuddies() {
    // bank last week's league XP when the week rolls over, and announce level-ups
    const ros = roster(); const wk = ros.week || dk();
    const ups = [];
    ros.forEach((r) => {
      const b = R.buddy[r.id] = R.buddy[r.id] || { xp: 0, lvl: 1, week: wk, wxp: 0, banked: 0 };
      if (b.week && b.week !== wk) { b.banked += b.wxp || 0; }
      b.week = wk; b.wxp = r.xp || 0;
      const info = buddyInfo(r.id); if (info && info.lvl > (b.lvl || 1)) { if (b.lvl) ups.push(`${info.short} reached Lv ${info.lvl}`); b.lvl = info.lvl; }
    });
    save();
    if (ups.length && open && !TEST()) setTimeout(() => hint(ups.slice(0, 2).join(' · ')), 1800);
  }
  function buddiesInZone() {
    if (!Z || Z.dungeon) return [];
    const ros = roster(); if (!ros.length) return [];
    const rr = rng('buddies' + dk() + Z.id); const n = Z.id === 'village' ? 3 : 1;
    const pool = ros.map((r) => r.id).filter((id) => id !== R.party).sort(() => rr() - 0.5);
    if (Z.ri != null && !conquered(Z.ri) && rr() < 0.4) return [];
    return pool.slice(0, n).map(buddyInfo).filter(Boolean);
  }
  function buddySpot(i) {
    if (Z.id === 'village') return freeNear([[15, 13], [27, 13], [24, 19]][i % 3][0], [[15, 13], [27, 13], [24, 19]][i % 3][1]);
    return freeNear(17, 5);
  }
  function talkBuddy(e) {
    const b = buddyInfo(e.buddy.id); if (!b) return;
    const st = R.buddy[b.id];
    const lines = b.lines && b.lines.pass ? b.lines : {};
    const banter = pick([...(lines.pass || []), ...(lines.lead || []), 'Training hard today?']).replace(/[\u{1F300}-\u{1FAFF}☀-➿]/gu, '').trim();
    const intro = `${banter} I'm level ${b.lvl} now${b.rank ? ` — #${b.rank} in the league this week` : ''}.`;
    if (st && b.lvl > (st.lvl || 1)) { st.lvl = b.lvl; save(); }
    const inParty = R.party === b.id;
    say(e.id, [{ text: intro, choices: inParty ? [['Let\'s split up.', () => { R.party = null; e.follow = false; e.wanderR = 3; save(); renderHud(); say(e.id, ['Catch you later. Don\'t skip leg day.']); }], ['Keep going.', null]]
      : [['Team up with me.', () => { R.party = b.id; e.follow = true; e.wanderR = 0; e.speed = 5; save(); renderHud(); sfx('power', 0.45); say(e.id, ['Let\'s go. I\'ll hit whatever you hit.'], () => hint(`${b.short} joined your party — they attack after every move you make`)); }], ['Maybe later.', null]] }], null, b.spr, b.name);
  }
  function openParty() {
    const ros = roster().map((r) => buddyInfo(r.id)).filter(Boolean);
    showMenu(`<div class="rm-title">Buddies</div><div class="rm-sub">Your league rivals, out adventuring. They level up from their own training and from fights at your side. Find them around the world to team up.</div>
      <div class="tv-list">${ros.map((b) => `<div class="bd-row ${R.party === b.id ? 'on' : ''}"><div class="rp-face" style="background-image:url(${faceUrl(b.spr)})"></div><div class="tv-main"><span class="tv-n">${esc(b.name)}</span><span class="tv-s">Lv ${b.lvl} · ${b.weekXp.toLocaleString()} league XP this week${R.party === b.id ? ' · in your party' : ''}</span></div></div>`).join('') || '<div class="rm-sub">No rivals yet — open the League once.</div>'}</div>
      ${R.party ? '<button class="rm-item" data-leave>Leave party</button>' : ''}<button class="rm-item ghost" data-close>Close</button>`, (m) => { const l = m.querySelector('[data-leave]'); if (l) l.onclick = () => { R.party = null; save(); ents.forEach((e) => { if (e.follow) { e.follow = false; e.wanderR = 3; } }); renderHud(); openParty(); }; });
  }

  // ================================================================== DIALOGUE
  let dlgQ = null;
  function say(whoId, lines, done, faceKey, nameOverride) {
    if (menuOpen) closeMenu();
    dlgQ = { lines: lines.map((l) => (typeof l === 'string' ? { who: whoId, text: l } : Object.assign({ who: whoId }, l))), i: 0, who: whoId, done, faceKey, nameOverride };
    const e = ents.find((x) => x.id === whoId); if (e && hero) { face(e, hero.tx, hero.ty); e.frozen = true; }
    showLine();
  }
  let typeT = 0;
  function showLine() {
    const L = dlgQ.lines[dlgQ.i]; const e = ents.find((x) => x.id === L.who);
    const name = dlgQ.nameOverride || (L.who === 'hero' ? (G.heroState ? G.heroState().name : 'You') : e ? e.name : '');
    const fk = dlgQ.faceKey || (e ? e.img : 'c15');
    dlg.innerHTML = `<div class="rd-face" style="background-image:url(${faceUrl(fk)})"></div><div class="rd-body"><div class="rd-name">${esc(name)}</div><div class="rd-text"></div>${L.choices ? '<div class="rd-ch"></div>' : '<div class="rd-more">▼</div>'}</div>`;
    dlg.classList.add('on');
    const tx = dlg.querySelector('.rd-text'); dlgQ.shown = 0; dlgQ.full = false;
    const pitch = 260 + (hash(L.who) % 500);
    clearInterval(typeT);
    typeT = setInterval(() => { if (!dlgQ) { clearInterval(typeT); return; } dlgQ.shown += 1; tx.textContent = L.text.slice(0, dlgQ.shown); if (dlgQ.shown % 2 === 0 && L.text[dlgQ.shown] !== ' ') blip(pitch + Math.random() * 40); if (dlgQ.shown >= L.text.length) finishLine(); }, TEST() ? 1 : 24);
  }
  function finishLine() {
    clearInterval(typeT); const L = dlgQ.lines[dlgQ.i];
    dlg.querySelector('.rd-text').textContent = L.text; dlgQ.full = true;
    if (L.choices) {
      const box = dlg.querySelector('.rd-ch');
      box.innerHTML = L.choices.map((c, k) => `<button class="rd-c" data-c="${k}">${esc(c[0])}</button>`).join('');
      box.querySelectorAll('[data-c]').forEach((b) => b.addEventListener('pointerdown', (ev) => { ev.stopPropagation(); const c = L.choices[Number(b.dataset.c)]; sfx('menu', 0.35); endDlg(); c[1] && c[1](); }));
    }
  }
  function advanceDlg() { if (!dlgQ) return; if (!dlgQ.full) { finishLine(); return; } if (dlgQ.lines[dlgQ.i].choices) return; dlgQ.i++; if (dlgQ.i >= dlgQ.lines.length) { const d = dlgQ.done; endDlg(); d && d(); } else showLine(); }
  function endDlg() { clearInterval(typeT); const e = dlgQ && ents.find((x) => x.id === dlgQ.who); if (e) { e.frozen = false; e.wander = 2; } dlgQ = null; dlg.classList.remove('on'); }
  G._rpgDlg = () => dlgQ; G._rpgAdvance = advanceDlg;

  // ================================================================== NPCs, BUILDINGS, BOUNTIES, SHOP
  function interact(e) { if (e.enemy) { startEncounter(e); return; } if (e.chest) { openChestEnt(e); return; } e.talk && e.talk(e); }
  const heroName = () => (G.heroState ? G.heroState().name : 'Hero');
  function useProp(p) {
    if (p.building) {
      const b = (G._village && G._village.B.find((x) => x.id === p.building)) || { name: p.bname, perk: '' };
      if (p.built) { if (p.building === 'tavern') { say('elder', [{ text: `The Tavern. Warm stew, warmer beds. Rest here to restore your hearts?`, choices: [['Rest (free)', () => { R.hp = maxHp(); R.hpAt = Date.now(); save(); renderHud(); sfx('power', 0.45); hint('Fully rested'); }], ['Not now', null]] }], null, 'c10', 'Innkeeper'); return; }
        if (p.building === 'market' || p.building === 'blacksmith') { shop(p.building === 'blacksmith'); return; } }
      say('elder', [p.built ? `${b.name}. ${b.perk || ''}` : `The ${b.name} lies in ruins. Fill its bundles with training to rebuild it. Perk: ${b.perk || ''}`, { text: 'Open the building?', choices: [['Open', () => { try { G._village.openBuilding(p.building); } catch (e) { G.nav && G.nav('adventure', 'village'); } }], ['Later', null]] }], null, 'c9', 'Elder Oren');
      return;
    }
    if (p.board) { openBounties(); return; }
    if (p.waystone) { openTravel(); }
  }
  // daily bounties on the square's notice board
  function bounties() {
    if (R.bounty && R.bounty.day === dk()) return R.bounty;
    const rr = rng('bounty' + dk()); const open = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(regionOpen); const top = open.length ? open[open.length - 1] : 0;
    const list = [];
    for (let i = 0; i < 3; i++) {
      const ri = open.length ? open[Math.max(0, open.length - 1 - Math.floor(rr() * Math.min(3, open.length)))] : 0; const mobs = BIOME[ri].mobs; const mob = mobs[Math.floor(rr() * mobs.length)];
      const n = 2 + Math.floor(rr() * 3);
      if (list.some((b) => b.mob === mob)) { i--; if (list.length > 6) break; continue; }
      list.push({ mob, ri, n, got: 0, coins: 60 + ri * 45 + n * 15, gems: rr() < 0.3 ? 1 + (ri >> 2) : 0, done: false });
    }
    R.bounty = { day: dk(), list, top }; save(); return R.bounty;
  }
  function openBounties() {
    const bt = bounties(); sfx('menu3', 0.4);
    showMenu(`<div class="rm-title">Bounty Board</div><div class="rm-sub">New bounties every day. Any of these monsters counts, wherever you meet them.</div>
      ${bt.list.map((b, i) => `<div class="bt-row ${b.done ? 'done' : ''}"><div class="tv-main"><span class="tv-n">${MOB[b.mob][0]} ×${b.n}</span><span class="tv-s">${esc(REG()[b.ri].name)} · ${Math.min(b.got, b.n)}/${b.n}</span></div><span class="bt-r">${b.done ? 'PAID' : `${b.coins}c${b.gems ? ` +${b.gems}g` : ''}`}</span></div>`).join('')}
      <div class="rm-sub" style="margin-top:8px">${R.q < 4 ? 'The roads open once the gate goblin is dealt with.' : ''}</div><button class="rm-item ghost" data-close>Close</button>`);
  }
  function bountyKill(mob) {
    const bt = R.bounty; if (!bt || bt.day !== dk()) return null;
    let paid = null;
    bt.list.forEach((b) => { if (b.mob === mob && !b.done) { b.got++; if (b.got >= b.n) { b.done = true; paid = b; } } });
    save(); return paid;
  }
  function shop(smith) {
    const S0 = G.state ? G.state() : { coins: 0 };
    const items = smith ? [['sharpen', 'Whetstone', 'Next battle: +25% damage', 180]] : [['potion', 'Potion', 'Restores 8 hearts-worth (2 hearts)', 120], ['elixir', 'Elixir', 'Restores all hearts', 320]];
    say(smith ? 'elder' : 'mira', [{ text: smith ? 'Blades, buckles, whetstones. Coin up front.' : `Fresh potions! You've got ${S0.coins.toLocaleString()} coins.`, choices: items.map(([id, n, d, c]) => [`${n} · ${c}c`, () => {
      if (!G.canPay || !G.canPay('coins', c)) { hint('Not enough coins'); sfx('menu3', 0.3, 0.7); return; }
      G.pay('coins', c); if (id === 'potion') R.potions++; else if (id === 'elixir') R.elixirs++; else R.sharp = 1;
      save(); renderHud(); sfx('gold', 0.45); hint(`Bought ${n}`);
    }]).concat([['Just looking', null]]) }], null, smith ? 'c19' : 'c6', smith ? 'Smith Hana' : 'Mira');
  }
  function talkElder() {
    if (R.q === 0) {
      say('elder', [
        `${heroName()}. Good — you're awake.`, 'Goblins have been raiding our gardens from the south field. Last night one sat on the gate and laughed at Bo.',
        'Pulsehaven has no army. But you have something better.', 'Your body. Every press-up, every squat — out here it becomes a strike.',
        { text: 'Will you drive the goblin off?', choices: [['I\'ll do it.', () => { R.q = 1; save(); renderHud(); sfx('power', 0.5); say('elder', ['Then go to the south gate and tell Bo I sent you.', 'And take this. Drink it if the fight turns.'], () => hint('Quest updated · Talk to Bo at the south gate')); }], ['Not yet.', () => say('elder', ['Rest, then. The goblin isn\'t going anywhere. Sadly.'])]] }
      ]);
    } else if (R.q === 1) say('elder', ['Bo is at the south gate. Follow the main street down, through the shrine arch.']);
    else if (R.q === 2) say('elder', ['The goblin waits beyond the gate.', 'Breathe between rounds. When it winds up, you rest. When it\'s open — you strike.']);
    else if (R.q === 3) {
      say('elder', ['I heard the clash from here! The whole village did.', 'Pulsehaven thanks you. Here — it isn\'t much, but it\'s honest coin.'], () => {
        R.q = 4; R.potions += 2; save(); renderHud();
        G.reward && G.reward({ coins: 250, gems: 2 }, { label: 'Quest complete: Goblins at the Gate' }); sfx('win2', 0.5); buzz('success');
        say('elder', ['Two potions as well.', `The road south leads to ${REG()[0].name}. Its master, ${REG()[0].boss[0]}, sends the goblins.`, 'Beat it, and the whole world map opens up — region by region.', 'The ruins around the square? Rebuild them with your training. Every building helps.']);
      });
    } else if (R.q === 5) {
      say('elder', [`You beat ${REG()[0].boss[0]}? Ha! I knew it.`, 'The whole world map is yours to walk now. Every boss you beat opens the next road, and its dungeon.', 'Take these. And check the notice board — the bounties pay well.'], () => { R.q = 6; R.potions += 2; R.elixirs += 1; save(); renderHud(); G.reward && G.reward({ coins: 400, gems: 5 }, { label: 'Quest complete: The Road South' }); sfx('win2', 0.5); });
    } else {
      const nx = REG().findIndex((x, i) => !conquered(i)); const st = (typeof getStreak === 'function') ? getStreak() : 0;
      say('elder', [nx >= 0 ? `${REG()[nx].boss[0]} still holds ${REG()[nx].name}. Take the south road and keep going.` : 'Every region is free. The world bosses still stir, though.',
        pick([st > 1 ? `${st} days in a row. The village notices.` : 'The best warriors train when no one is watching.', 'The notice board has new bounties every morning.', 'Your rivals wander the roads now. Some will fight beside you.', 'Rest at the tavern once it\'s rebuilt — hearts come back faster there.'])]);
    }
  }
  function talkBo(e) {
    if (R.q < 1) say('bo', ['Gate\'s shut. Goblins about.', 'Elder Oren\'s orders — nobody goes south. Speak to him first.']);
    else if (R.q === 1) say('bo', ['Oren sent you? Hah.', 'I\'ve seen you training in the square at dawn. Fine.', 'The goblin camps just past the trail. Go get it.'], () => { busy = true; e.path = [[18, 30], [18, 29]]; e.onArrive = () => { e.dir = 3; busy = false; R.q = 2; save(); renderHud(); sfx('magic', 0.45); hint('The south gate is open'); }; });
    else if (R.q === 2) say('bo', ['Well? Go on. I\'ll hold the gate.']);
    else say('bo', [pick(['Never seen a goblin run that fast.', 'Gate\'s yours whenever you need it.', 'The south road goes a long way. Bring potions.'])]);
  }
  function talkMira() { shop(false); }
  function talkPip() { say('pip', [pick(['Rex says woof. That means "do ten squats".', 'When I grow up I\'m gonna punch a goblin too!', 'I saw a HUGE slime with a crown in the meadow!', 'Bo says you\'re strong. Are you stronger than a cart?'])]); }
  function talkDog(e) { e.dir = 2; say('dog', ['Woof!'], () => buzz('light'), 'dog'); }

  // ================================================================== CHESTS
  function openChestEnt(e) {
    const key = Z.id + (R.dg[Z.ri] || 0); R.chests[key] = R.chests[key] || {}; R.chests[key][e.chest.id] = 1; save();
    const i = ents.indexOf(e); if (i >= 0) ents.splice(i, 1);
    sfx('gold', 0.5); buzz('success');
    const coins = 40 + (Z.ri || 0) * 30 + Math.floor(Math.random() * 40);
    const items = Math.random() < 0.4 && G.rollDrop ? [G.rollDrop([40, 32, 18, 7, 2.5, 0.4, 0.08, 0.02]).id] : [];
    if (Math.random() < 0.3) R.potions++;
    G.reward && G.reward({ coins, items }, { label: 'Chest:' });
    for (let k = 0; k < 10; k++) parts.push({ x: e.x + 8, y: e.y + 6, vx: (Math.random() - 0.5) * 40, vy: -20 - Math.random() * 20, life: 0.7, max: 0.7, c: '255,210,63', r: 1 });
    renderHud();
  }

  // ================================================================== COMBAT
  let B = null, bcv = null, bctx = null;
  function skillLevel(ex) { try { return getLevelFromXP(getSkillXPMap()[ex] || 0); } catch (e) { return 1; } }
  function startEncounter(e) {
    if (B) return;
    busy = true; hero.path = []; e.path = []; e.frozen = true; face(e, hero.tx, hero.ty); face(hero, e.tx, e.ty);
    sfx('alert', 0.5); buzz('heavy');
    const go = () => { busy = false; openBattle(e); };
    if (e.spawn && e.spawn.quest && !R.kills.gate_goblin) say(e.id, ['Hehehe! Shiny human!'], go, 'c1', e.name);
    else if (e.def.boss) say(e.id, [e.def.world != null ? `${e.def.name} rises before you.` : `${e.def.name} blocks the road.`], go, e.img, e.name);
    else setTimeout(go, TEST() ? 0 : 450);
  }
  function openBattle(ent) {
    const def = ent.def;
    const lv = Math.round(moves().filter((m) => !m.timed).reduce((a, m) => a + skillLevel(m.ex), 0) / 3);
    const pw = G.stats ? Math.max(0, G.stats().power) : 0;
    const reps = Math.min(def.boss ? 160 : 60, def.hp + Math.floor(lv / 4));
    const hp = Math.round(reps * Math.pow(1 + pw / 100, 0.75));
    const party = R.party ? buddyInfo(R.party) : null;
    B = { ent, def, ehp: hp, emax: hp, phase: 'intro', intent: null, shield: 0, enrage: 0, logged: {}, turns: 0, fx: [], nums: [], ally: party, music: def.boss ? 'boss' : 'battle', sharp: R.sharp ? 1.25 : 1 };
    R.sharp = 0; R.fights++; R.hp = Math.max(R.hp, 4); save();
    pickIntent();
    battleTransition(() => { buildBattle(); music(B.music); B.phase = 'player'; renderBattleUi(); });
  }
  function battleTransition(cb) { const f = root.querySelector('#rlFade'); f.classList.add('swirl'); setTimeout(() => { cb(); setTimeout(() => f.classList.remove('swirl'), 80); }, TEST() ? 0 : 650); }
  function pickIntent() {
    const it = B.def.intents; let i = Math.floor(Math.random() * it.length); if (B.turns === 0 && !it[i][1]) i = 0;
    const raging = B.def.boss && B.ehp < B.emax / 2;
    B.intent = { name: it[i][0], dmg: it[i][1] ? it[i][1] + B.enrage + (raging ? 3 : 0) : 0 };
  }
  function buildBattle() {
    battleEl = document.createElement('div'); battleEl.className = 'rb'; battleEl.id = 'rlBattle';
    battleEl.innerHTML = `<div class="rb-stage"><canvas id="rbCv"></canvas>
        <div class="rb-bar rb-e"><div class="rb-n">${esc(B.def.name)} <span class="rb-lv">Lv ${B.ent.lvl || 1}</span></div><div class="rb-hp"><i id="rbEHp"></i></div><div class="rb-hpn" id="rbEHpN"></div></div>
        <div class="rb-bar rb-h"><div class="rb-n">${esc(heroName())}</div><div class="rl-hearts" id="rbHearts"></div>${B.ally ? `<div class="rb-ally">+ ${esc(B.ally.short)} Lv ${B.ally.lvl}</div>` : ''}</div>
        <div class="rb-intent" id="rbIntent"></div><div class="rb-banner" id="rbBanner"></div></div>
      <div class="rb-ui" id="rbUi"></div><div class="rb-reps" id="rbReps"></div>`;
    root.appendChild(battleEl);
    bcv = battleEl.querySelector('#rbCv'); bctx = bcv.getContext('2d'); sizeBattle();
  }
  function sizeBattle() { if (!battleEl) return; const st = battleEl.querySelector('.rb-stage'); const w = st.clientWidth, h = st.clientHeight; bcv.width = Math.round(w * DPR); bcv.height = Math.round(h * DPR); bcv.style.width = w + 'px'; bcv.style.height = h + 'px'; }
  const shortName = () => B.def.name.split(' ').pop();
  function renderBattleUi() {
    if (!B || !battleEl) return;
    battleEl.querySelector('#rbEHp').style.width = Math.max(0, B.ehp / B.emax * 100) + '%';
    battleEl.querySelector('#rbEHpN').textContent = `${Math.max(0, B.ehp)}/${B.emax}${B.def.boss && B.ehp < B.emax / 2 && B.ehp > 0 ? ' · ENRAGED' : ''}`;
    battleEl.querySelector('#rbHearts').innerHTML = heartsHtml(R.hp, maxHp()) + (B.shield ? `<span class="rb-sh">GUARD ${Math.round(B.shield * 100)}%</span>` : '');
    const it = battleEl.querySelector('#rbIntent');
    it.innerHTML = B.phase === 'player' && B.intent ? (B.intent.dmg ? `<b>${esc(shortName())}</b> readies <b>${esc(B.intent.name)}</b> <span class="dmg">${B.intent.dmg}</span>` : `<b>${esc(shortName())}</b> — ${esc(B.intent.name)} (no attack)`) : '';
    it.classList.toggle('on', !!it.innerHTML);
    const ui = battleEl.querySelector('#rbUi');
    if (B.phase !== 'player') { ui.innerHTML = B.phase === 'end' ? '' : `<div class="rb-wait">${esc(B.say || '…')}</div>`; return; }
    const rest = B.restUntil && B.restUntil > Date.now() ? Math.ceil((B.restUntil - Date.now()) / 1000) : 0;
    const mv = moves();
    ui.innerHTML = `${rest ? `<div class="rb-rest">Catch your breath · <b>${rest}s</b> <span>(optional)</span></div>` : '<div class="rb-rest ready">Your turn — choose a move</div>'}
      <div class="rb-moves">${mv.map((m) => `<button class="rb-mv" data-mv="${m.id}"><span class="mv-n">${m.id === 'strike' ? 'Strike' : m.id === 'smash' ? 'Smash' : m.id === 'quick' ? 'Flurry' : 'Guard'}</span><span class="mv-e">${esc(m.ex)}${m.timed ? ' · timed' : ''}</span><span class="mv-h">${m.hint}</span></button>`).join('')}</div>
      <div class="rb-row"><button class="rb-sm" data-act="potion" ${R.potions && R.hp < maxHp() ? '' : 'disabled'}><i class="px px-pot"></i>Potion ×${R.potions}</button>${R.elixirs ? `<button class="rb-sm" data-act="elixir" ${R.hp < maxHp() ? '' : 'disabled'}>Elixir ×${R.elixirs}</button>` : ''}<button class="rb-sm ghost" data-act="flee">Retreat</button></div>`;
    ui.querySelectorAll('[data-mv]').forEach((b) => (b.onclick = () => { sfx('menu', 0.3); openReps(mv.find((m) => m.id === b.dataset.mv)); }));
    const heal = (k, n) => { R[k]--; R.hp = Math.min(maxHp(), R.hp + n); save(); sfx('power', 0.5); B.nums.push({ x: 0.27, y: 0.48, txt: '+' + n, c: '#7dff9a', t: 0 }); renderBattleUi(); };
    ui.querySelector('[data-act="potion"]').onclick = () => { if (R.potions) heal('potions', 8); };
    const el = ui.querySelector('[data-act="elixir"]'); if (el) el.onclick = () => { if (R.elixirs) heal('elixirs', maxHp()); };
    ui.querySelector('[data-act="flee"]').onclick = () => endBattle('flee');
    if (rest) { clearTimeout(B.restT); B.restT = setTimeout(renderBattleUi, 1000); }
  }
  // ---------- rep counter ----------
  let RC = null;
  function openReps(mv) {
    RC = { mv, n: 0, running: false, started: 0, acc: 0 };
    const el = battleEl.querySelector('#rbReps');
    el.innerHTML = `<div class="rc-box"><div class="rc-top"><div><div class="rc-mv">${esc(mv.ex)}</div><div class="rc-ex">${mv.timed ? 'Hold it — the longer, the stronger' : `aim ${mv.id === 'smash' ? '12–20' : '8–15'} · ×${mv.mult.toFixed(2).replace(/\.?0+$/, '')} per rep`}</div></div><button class="rc-x" data-rc="cancel">Back</button></div>
      ${mv.timed ? `<div class="rc-num" id="rcNum">0:00</div><div class="rc-sub" id="rcSub"></div><div class="rc-row"><button class="rc-b" data-rc="m5">−5s</button><button class="rc-big" data-rc="toggle" id="rcTog">Start</button><button class="rc-b" data-rc="p5">+5s</button></div>`
      : `<div class="rc-num" id="rcNum">0</div><div class="rc-sub" id="rcSub"></div><button class="rc-pad" data-rc="plus" id="rcPad">+1</button><div class="rc-row"><button class="rc-b" data-rc="undo">Undo</button><button class="rc-b" data-rc="reset">Reset</button><button class="rc-b" data-rc="type">Type</button></div>`}
      <button class="rc-go" data-rc="go" id="rcGo" disabled>${mv.timed ? 'Raise guard' : 'Unleash'}</button></div>`;
    el.classList.add('on');
    el.querySelectorAll('[data-rc]').forEach((b) => b.addEventListener('pointerdown', (ev) => { ev.preventDefault(); repAct(b.dataset.rc, b); }));
    updReps();
  }
  function repAct(a, b) {
    if (!RC) return; const mv = RC.mv;
    if (a === 'plus') { RC.n++; blip(500 + Math.min(RC.n, 30) * 18); buzz('light'); if (b) { b.classList.remove('pop'); void b.offsetWidth; b.classList.add('pop'); } }
    else if (a === 'undo') RC.n = Math.max(0, RC.n - 1);
    else if (a === 'reset') RC.n = 0;
    else if (a === 'type') { const v = prompt(`How many ${mv.ex.toLowerCase()}?`, RC.n || ''); const n = Math.floor(Number(v)); if (n > 0 && n < 500) RC.n = n; }
    else if (a === 'toggle') { if (RC.running) { RC.acc += (Date.now() - RC.started) / 1000; RC.running = false; } else { RC.started = Date.now(); RC.running = true; sfx('menu', 0.3); tickTimer(); } }
    else if (a === 'm5') RC.acc = Math.max(0, RC.acc - 5);
    else if (a === 'p5') RC.acc += 5;
    else if (a === 'cancel') { closeReps(); return; }
    else if (a === 'go') { if (RC.running) { RC.acc += (Date.now() - RC.started) / 1000; RC.running = false; } const amt = mv.timed ? Math.round(RC.acc) : RC.n; if (amt < 1) return; closeReps(); playerMove(mv, amt); return; }
    updReps();
  }
  function tickTimer() { if (!RC || !RC.running) return; updReps(); setTimeout(tickTimer, 250); }
  function updReps() {
    if (!RC) return; const el = battleEl.querySelector('#rbReps');
    const sec = RC.acc + (RC.running ? (Date.now() - RC.started) / 1000 : 0); const n = el.querySelector('#rcNum'), go = el.querySelector('#rcGo');
    if (RC.mv.timed) { n.textContent = `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`; el.querySelector('#rcTog').textContent = RC.running ? 'Pause' : sec ? 'Resume' : 'Start'; el.querySelector('#rcSub').textContent = sec ? `Guard ${Math.min(100, Math.round(sec / 30 * 100))}% · counter ≈${Math.round(sec * 0.25)}` : 'Tap Start when you\'re in position'; go.disabled = sec < 1; }
    else { n.textContent = RC.n; go.disabled = RC.n < 1; const est = Math.round(RC.n * RC.mv.mult * (1 + Math.max(0, G.stats ? G.stats().power : 0) / 100) * B.sharp); el.querySelector('#rcSub').textContent = RC.n ? `≈ ${est} damage${RC.n >= 20 ? ' · huge!' : ''}` : 'Tap the pad for every rep'; go.textContent = RC.n ? `Unleash ${RC.n}` : 'Unleash'; }
  }
  function closeReps() { RC = null; const el = battleEl && battleEl.querySelector('#rbReps'); if (el) { el.classList.remove('on'); el.innerHTML = ''; } }
  G._rpgReps = { set(n) { if (RC) { if (RC.mv.timed) RC.acc = n; else RC.n = n; updReps(); } }, go() { repAct('go'); } };

  function log(ex, amt) { B.logged[ex] = (B.logged[ex] || 0) + amt; R.inBattle = { label: B.def.name, logged: B.logged }; save(true); }
  function playerMove(mv, amt) {
    B.phase = 'anim'; B.turns++; B.say = mv.timed ? `Guard! You held ${mv.ex.toLowerCase()} for ${amt}s` : `${amt} ${mv.ex.toLowerCase()}!`; renderBattleUi();
    const pw = 1 + Math.max(0, G.stats ? G.stats().power : 0) / 100;
    if (mv.timed) {
      log(mv.ex, amt); B.shield = Math.min(1, amt / 30); const counter = Math.round(amt * 0.25 * pw * B.sharp);
      B.hAnim = { kind: 'guard', t: 0 }; sfx('magic', 0.45); buzz('medium'); B.fx.push({ img: 'fxRing', x: 0.27, y: 0.6, t: 0, n: 5, sc: 1.4 });
      setTimeout(() => { if (counter > 0) damageEnemy(counter, false, 'fxSpark'); afterHero(1300); }, 700); return;
    }
    log(mv.ex, amt);
    const hits = mv.hits || 1; const rolls = [];
    for (let i = 0; i < hits; i++) { const r = G.rollDamage ? G.rollDamage(Math.max(1, Math.round(amt * mv.mult * B.sharp / hits))) : { dmg: Math.round(amt * mv.mult / hits), crit: false }; if (hits > 1 && !r.crit && Math.random() < 0.15) { r.dmg *= 2; r.crit = true; } rolls.push(r); }
    B.hAnim = { kind: 'attack', t: 0 }; sfx('sword', 0.55, mv.id === 'smash' ? 0.8 : 1.1); buzz(mv.id === 'smash' ? 'heavy' : 'medium');
    rolls.forEach((r, i) => setTimeout(() => damageEnemy(r.dmg, r.crit, mv.fx, mv.id === 'smash'), 280 + i * 260));
    afterHero(280 + hits * 260 + 600);
  }
  function afterHero(ms) {
    setTimeout(() => {
      if (!B || B.phase === 'end') return;
      if (B.ally) { // your buddy follows up
        const d = Math.max(1, Math.round((3 + B.ally.lvl * 1.2) * (0.8 + Math.random() * 0.4)));
        B.aAnim = { t: 0 }; B.say = `${B.ally.short} attacks!`; renderBattleUi();
        setTimeout(() => { if (!B || B.phase === 'end') return; damageEnemy(d, false, 'fxHit'); setTimeout(() => { if (B && B.ehp > 0) enemyTurn(); }, 600); }, 350);
      } else enemyTurn();
    }, ms);
  }
  function damageEnemy(d, crit, fx, big) {
    if (!B) return;
    B.ehp -= d; B.eFlash = 0.18; B.eKnock = 1;
    B.fx.push({ img: fx, x: 0.72, y: 0.52, t: 0, n: fx === 'fxSlash' || fx === 'fxCross' ? 4 : 5, sc: big ? 2 : 1.5 });
    B.nums.push({ x: 0.72, y: 0.36, txt: (crit ? 'CRIT ' : '') + d, c: crit ? '#ffd23f' : '#fff', t: 0, big: crit || big });
    B.shake = big ? 9 : crit ? 7 : 4; sfx(pick(['hit1', 'hit2', 'hit3']), 0.5, crit ? 0.9 : 1.05);
    renderBattleUi();
    if (B.ehp <= 0 && B.phase !== 'end') { B.phase = 'end'; setTimeout(victory, 600); }
  }
  function enemyTurn() {
    if (!B || B.phase === 'end') return;
    const it = B.intent; B.phase = 'enemy';
    B.say = it.dmg ? `${shortName()} uses ${it.name}!` : `${shortName()}: ${it.name}…`; renderBattleUi();
    if (!it.dmg) {
      if (/Taunt|Rally|Roar|War Cry|Cackle|Laugh|Bellow/.test(it.name)) { B.enrage = 2; B.nums.push({ x: 0.72, y: 0.3, txt: 'ENRAGED', c: '#ff7a5a', t: 0 }); sfx('alert', 0.35, 1.3); }
      else if (/Harden|Shell|Guard|Hide|Halo/.test(it.name)) { const h = Math.round(B.emax * 0.06); B.ehp = Math.min(B.emax, B.ehp + h); B.nums.push({ x: 0.72, y: 0.3, txt: '+' + h, c: '#7dff9a', t: 0 }); }
      else B.nums.push({ x: 0.72, y: 0.3, txt: '...', c: '#aaa', t: 0 });
      setTimeout(nextTurn, 900); renderBattleUi(); return;
    }
    B.eAnim = { t: 0 };
    setTimeout(() => {
      if (!B) return;
      let d = it.dmg; const blocked = Math.round(d * B.shield); d -= blocked;
      B.fx.push({ img: B.shield > 0.5 ? 'fxRing' : 'fxClaw', x: 0.28, y: 0.55, t: 0, n: 5, sc: 1.5 });
      if (d > 0) { R.hp = Math.max(0, R.hp - d); B.hFlash = 0.2; B.shake = 6; sfx('hit9', 0.5, 0.8); buzz('heavy'); B.nums.push({ x: 0.28, y: 0.38, txt: '-' + d, c: '#ff6b6b', t: 0, big: d >= 8 }); }
      if (blocked) B.nums.push({ x: 0.28, y: 0.3, txt: `BLOCKED ${blocked}`, c: '#8fd3ff', t: 0 });
      B.enrage = 0; B.shield = 0; R.hpAt = Date.now(); save(); renderBattleUi();
      if (R.hp <= 0) { B.phase = 'end'; setTimeout(defeat, 900); return; }
      setTimeout(nextTurn, 700);
    }, 450);
  }
  function nextTurn() { if (!B || B.phase === 'end') return; pickIntent(); B.phase = 'player'; B.restUntil = Date.now() + 20000; renderBattleUi(); }

  // ---------- workout logging (staged, then written once) ----------
  function stageWorkouts(label) {
    const entries = [];
    Object.entries(B.logged).forEach(([ex, amt]) => {
      if (!amt) return; const m = exMeta(ex) || { unit: 'reps' };
      const unit = HOLDS.includes(ex) ? m.unit || 'minutes' : 'reps';
      const amount = unit === 'minutes' ? Math.round(amt / 60 * 100) / 100 : amt;
      entries.push({ id: Date.now() + Math.floor(Math.random() * 1000) + entries.length, exercise: ex, amount, sets: 1, unit, date: dk(), time: new Date().toTimeString().slice(0, 5), isPR: false, feeling: '💪', notes: `⚔️ Realm: ${label}`, weight: null, category: null, realm: true });
    });
    B.logged = {}; R.inBattle = null; R.pending = (R.pending || []).concat(entries); save(true);
    return entries.map((w) => ({ ex: w.exercise, amt: w.unit === 'minutes' ? `${Math.round(w.amount * 60)}s` : w.unit === 'seconds' ? `${w.amount}s` : `${w.amount}`, xp: (() => { try { return Math.round(xpForWorkout(w)); } catch (e) { return 0; } })() }));
  }
  function flushWorkouts() {
    if (R.inBattle && !B) {
      const ib = R.inBattle; R.inBattle = null;
      Object.entries(ib.logged || {}).forEach(([ex, amt], i) => { if (amt > 0) { const hold = HOLDS.includes(ex); const unit = hold ? ((exMeta(ex) || {}).unit || 'minutes') : 'reps'; (R.pending = R.pending || []).push({ id: Date.now() + i, exercise: ex, amount: unit === 'minutes' ? Math.round(amt / 60 * 100) / 100 : amt, sets: 1, unit, date: dk(), time: new Date().toTimeString().slice(0, 5), isPR: false, feeling: '💪', notes: `⚔️ Realm: ${ib.label} (unfinished)`, weight: null, category: null, realm: true }); } });
    }
    if (!R.pending || !R.pending.length || typeof workouts === 'undefined') return;
    const have = new Set(workouts.map((w) => w.id));
    R.pending.forEach((w) => { if (!have.has(w.id)) workouts.push(w); });
    R.pending = []; save(true);
    try { persist(); } catch (e) { console.warn(e); }
    try { checkQuestProgress && checkQuestProgress(); } catch (e) {}
  }
  G.rpgFlush = flushWorkouts;

  // ---------- results ----------
  function victory() {
    if (!B) return;
    B.dying = 0.001; sfx('kill', 0.55); buzz('success'); stopMusic();
    const ent = B.ent, def = B.def, s = ent.spawn;
    R.wins++; R.kills[s.id] = (R.kills[s.id] || 0) + 1; R.dead[Z.id] = R.dead[Z.id] || {}; R.dead[Z.id][s.id] = Date.now();
    const xp = stageWorkouts(def.name);
    const rewards = { coins: 0, gems: 0, items: [] }; const notes = [];
    const coins0 = G.state ? G.state().coins : 0;
    if (s.quest) { if (R.q === 2) R.q = 3; rewards.items.push('rpg_goblin_slayer'); rewards.coins += 120; }
    else if (def.world != null) { const w = WBOSS[def.world]; try { const saved = getBosses(); let a = saved.find((b) => b.name === BOSSES[w.bi].name && !b.defeated); if (!a) { a = { name: BOSSES[w.bi].name, remaining: 0, hits: 0, started: dk() }; saved.push(a); } a.remaining = 0; a.defeated = true; a.defeatedDate = dk(); localStorage.setItem('pulse-bosses-v1', JSON.stringify(saved)); G.onBossKill && G.onBossKill(BOSSES[w.bi], w.bi); } catch (e) { console.warn(e); } rewards.items.push(w.item); notes.push('World boss slain — it falls in the Battle tab too'); }
    else if (def.region != null) {
      const first = !R.conq[def.region]; R.conq[def.region] = true;
      if (G.realmConquer) G.realmConquer(def.region);
      rewards.coins += 120 * (def.region + 1) * (first ? 3 : 1); rewards.gems += first ? (def.region + 1) * 2 : 1;
      if (first && G.rollItemOfTier) rewards.items.push(G.rollItemOfTier([1, 1, 2, 2, 3, 3, 4, 5, 6, 7][def.region]).id);
      if (first) { notes.push(`${REG()[def.region].name} conquered · dungeon unsealed`); if (def.region < 9) notes.push(`The road to ${REG()[def.region + 1].name} is open`); if (def.region === 0 && R.q === 4) R.q = 5; }
    } else if (def.dungeonBoss != null) {
      R.dg[def.dungeonBoss] = (R.dg[def.dungeonBoss] || 0) + 1; Object.keys(ZCACHE).forEach((k) => { if (k.startsWith('d' + def.dungeonBoss + '-') && k !== Z.id) delete ZCACHE[k]; });
      rewards.coins += 200 + def.dungeonBoss * 150; rewards.gems += 2 + def.dungeonBoss; if (G.rollItemOfTier) rewards.items.push(G.rollItemOfTier(Math.min(7, 2 + Math.floor(def.dungeonBoss / 2))).id);
      notes.push(`${(DUN()[def.dungeonBoss] || {}).name || 'Dungeon'} cleared`);
    } else {
      try { G.onMonsterKill && G.onMonsterKill({ name: def.base || def.name, xp: (def.xp || 20) * (def.elite ? 2 : 1), realm: true }); } catch (e) {}
      const paid = bountyKill(s.mob); if (paid) { rewards.coins += paid.coins; rewards.gems += paid.gems; notes.push(`Bounty complete: ${MOB[paid.mob][0]} ×${paid.n}`); }
      if (Math.random() < 0.12) { R.potions++; notes.push('Found a potion'); }
    }
    if (B.ally) { const st = R.buddy[B.ally.id]; if (st) { st.xp += 15 + (ent.lvl || 1) * 3; const before = B.ally.lvl; const now = buddyInfo(B.ally.id); if (now && now.lvl > before) { st.lvl = now.lvl; notes.push(`${now.short} levelled up to Lv ${now.lvl}!`); } } }
    if (rewards.coins || rewards.gems || rewards.items.length) G.reward && G.reward(rewards, { quiet: true, noPopup: true });
    const gained = (G.state ? G.state().coins : 0) - coins0;
    save(true);
    const drop = rewards.items[0] || null;
    setTimeout(() => {
      if (!B) return; sfx('win', 0.55); banner(def.boss ? 'BOSS DEFEATED' : 'VICTORY');
      const ui = battleEl.querySelector('#rbUi');
      ui.innerHTML = `<div class="rv"><div class="rv-h">Spoils</div>
        <div class="rv-xp">${xp.map((x) => `<div class="rv-row"><span>${esc(x.ex)} <em>${x.amt}</em></span><b>+${x.xp} XP</b></div>`).join('') || '<div class="rv-row"><span>No sets logged</span></div>'}</div>
        <div class="rv-row gold"><span><i class="px px-coin"></i> Coins</span><b>+${gained.toLocaleString()}</b></div>${rewards.gems ? `<div class="rv-row gold"><span>Gems</span><b>+${rewards.gems}</b></div>` : ''}
        ${notes.map((n) => `<div class="rv-note">${esc(n)}</div>`).join('')}
        ${drop ? '<button class="rv-chest" id="rvChest"><i class="px-chest"></i><span>Loot dropped! Tap to open</span></button>' : ''}
        <button class="rc-go" id="rvDone" ${drop ? 'style="display:none"' : ''}>Continue</button></div>`;
      const ch = ui.querySelector('#rvChest'); if (ch) ch.onclick = () => revealLoot(drop, ch, ui, rewards.items.slice(1));
      ui.querySelector('#rvDone').onclick = () => endBattle('win');
    }, 900);
  }
  function revealLoot(id, ch, ui, more) {
    const it = G.item && G.item(id); if (!it) { ui.querySelector('#rvDone').style.display = ''; ch.remove(); return; }
    ch.classList.add('open'); sfx('gold', 0.5); buzz('success');
    const S0 = G.state(); const inst = [...S0.items].reverse().find((i) => i.id === id);
    const tier = G.TIERS ? G.TIERS[it.tier] : { name: '', color: '#fff' };
    const sprite = id === 'rpg_goblin_slayer' ? '<i class="px-katana"></i>' : `<span class="rv-emo">${it.icon}</span>`;
    setTimeout(() => {
      ch.outerHTML = `<div class="rv-item" style="--tc:${tier.color}"><div class="rv-rays"></div>${sprite}<div class="rv-iname">${esc(it.name)}</div><div class="rv-itier">${tier.name}${it.slot ? ' ' + it.slot : ''}</div><div class="rv-ist">${G.statLines ? G.statLines(it, inst) : ''}</div>
        ${it.type === 'gear' && inst ? '<button class="rc-go" id="rvEquip">Equip</button>' : ''}${more.length ? `<div class="rv-note">+ ${more.map((m) => esc((G.item(m) || {}).name || '')).join(', ')}</div>` : ''}</div>`;
      const eq = ui.querySelector('#rvEquip');
      if (eq) eq.onclick = () => { S0.equip[it.slot] = inst.uid; G.saveLoot(); sfx('power', 0.5); eq.textContent = 'Equipped'; eq.disabled = true; try { render(); } catch (e) {} };
      ui.querySelector('#rvDone').style.display = '';
      G.celebrate && G.celebrate(it.tier, ui.querySelector('.rv-item'));
    }, 550);
  }
  function defeat() {
    if (!B) return;
    stopMusic(); sfx('over', 0.5); banner('KNOCKED DOWN', true);
    stageWorkouts(B.def.name + ' (knocked down)');
    const ui = battleEl.querySelector('#rbUi');
    ui.innerHTML = `<div class="rv"><div class="rv-h">You'll get it next time</div><div class="rv-note">Every rep you did still counts — it's in your log.${Z.dungeon ? ' You were carried out of the dungeon.' : ''} Hearts recover over time, at the tavern, or with potions.</div><button class="rc-go" id="rvDone">Wake up</button></div>`;
    ui.querySelector('#rvDone').onclick = () => endBattle('lose');
  }
  function endBattle(how) {
    if (!B) return;
    if (how === 'flee') stageWorkouts(B.def.name + ' (retreated)');
    const ent = B.ent; clearTimeout(B.restT); closeReps();
    fade(false, () => {
      if (battleEl) battleEl.remove(); battleEl = null; bcv = null; B = null;
      if (how === 'win') { const i = ents.indexOf(ent); if (i >= 0) ents.splice(i, 1); for (let k = 0; k < 8; k++) parts.push({ x: ent.x + 8, y: ent.y + 8, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30, life: 0.8, max: 0.8, c: '230,230,240', r: 2, puff: true }); }
      else { ent.frozen = false; ent.aggro = false; ent.path = []; ent.tx = ent.home[0]; ent.ty = ent.home[1]; ent.x = ent.tx * T; ent.y = ent.ty * T; ent.cool = Date.now() + 4000; }
      if (how === 'flee') { const p = findPath(hero.tx, hero.ty, ...freeNear(hero.tx, Math.max(1, hero.ty - 3)), hero); if (p) hero.path = p; setTimeout(() => { ent.aggro = false; }, 3000); ent.aggro = true; }
      if (how === 'lose') { R.hp = Math.max(4, Math.round(maxHp() / 2)); R.hpAt = Date.now(); save(true); enterZone('village', 21, 12); setTimeout(() => say('elder', ['Easy now. Bo carried you back.', 'Rest, drink something, then try again.']), 500); }
      else { R.x = hero.tx; R.y = hero.ty; save(true); snapCam(); renderHud(); music(zoneMusic()); }
      if (how === 'win' && R.q === 3) setTimeout(() => hint('Quest updated · Return to Elder Oren'), 500);
      setTimeout(flushWorkouts, 450);
      try { if (typeof render === 'function') render(); } catch (e) {}
    });
  }
  function banner(txt, bad) { const b = battleEl && battleEl.querySelector('#rbBanner'); if (!b) return; b.textContent = txt; b.className = 'rb-banner on' + (bad ? ' bad' : ''); }

  // ---------- battle rendering ----------
  function arena(w, h, s) {
    const o = document.createElement('canvas'); o.width = w; o.height = h; const c = o.getContext('2d'); c.imageSmoothingEnabled = false;
    const ts = s * T; const bio = Z.ri != null ? BIOME[Z.ri] : BIOME[0];
    if (Z.dungeon) { for (let y = 0; y * ts < h; y++) for (let x = 0; x * ts < w; x++) c.drawImage(IMG.inf, 13 * T, 13 * T, T, T, x * ts, y * ts, ts, ts); }
    else { const g = Z.id === 'village' ? [['ts', 22, 11], ['ts', 23, 11]] : bio.g; for (let y = 0; y * ts < h; y++) for (let x = 0; x * ts < w; x++) { const k = smooth(x + 40, y + 9) > 0.62 ? g[1] : g[0]; c.drawImage(IMG[k[0]], k[1] * T, k[2] * T, T, T, x * ts, y * ts, ts, ts); } }
    const pf = (n, x, y) => { const p = PF[n]; if (!p || !IMG[p[0]]) return; c.drawImage(IMG[p[0]], p[1] * T, p[2] * T, p[3] * T, p[4] * T, Math.round(x), Math.round(y), p[3] * ts, p[4] * ts); };
    if (!Z.dungeon) {
      const trees = Z.id === 'village' ? ['pine', 'treeA'] : bio.trees.filter((t) => t !== 'pond' && t !== 'igloo' && t !== 'statue');
      for (let x = -1, i = 0; x * ts < w + ts; x += 2, i++) pf(trees[i % trees.length], x * ts + (i % 2) * ts * 0.5, -ts * 0.9 + (i % 2) * ts * 0.35);
      for (let x = 0, i = 0; x * ts < w + ts; x += 2, i++) pf(trees[(i + 1) % trees.length], x * ts - ts * 0.6, h - ts * 1.1 + (i % 2) * ts * 0.3);
      const deco = Z.id === 'village' ? ['flowers', 'tuft', 'clover', 'stone'] : bio.deco;
      [[0.12, 0.42], [0.45, 0.4], [0.86, 0.45], [0.62, 0.78], [0.08, 0.74], [0.9, 0.76], [0.33, 0.8]].forEach(([fx, fy], i) => pf(deco[i % deco.length], w * fx, h * fy));
    } else { for (let x = 0; x * ts < w; x++) { c.drawImage(IMG.wl, 1 * T, 6 * T, T, T, x * ts, 0, ts, ts); c.drawImage(IMG.wl, 1 * T, 10 * T, T, T, x * ts, h - ts, ts, ts); } }
    const gr = Z.grade || [246, 238, 226]; c.globalCompositeOperation = 'multiply'; c.fillStyle = `rgb(${gr.join(',')})`; c.fillRect(0, 0, w, h); c.globalCompositeOperation = 'source-over';
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(10,6,24,.6)'); g.addColorStop(0.35, 'rgba(10,6,24,.08)'); g.addColorStop(0.75, 'rgba(10,6,24,.05)'); g.addColorStop(1, 'rgba(10,6,24,.55)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    return o;
  }
  function battleFrame(dt, t) {
    if (!bcv) return;
    const c = bctx, w = bcv.width, h = bcv.height;
    const s = Math.max(2, Math.round(DPR * Math.min(3, w / DPR / 130)));
    c.setTransform(1, 0, 0, 1, 0, 0); c.imageSmoothingEnabled = false;
    let shx = 0, shy = 0; if (B.shake > 0) { B.shake -= dt * 30; shx = (Math.random() - 0.5) * B.shake * DPR; shy = (Math.random() - 0.5) * B.shake * DPR; }
    c.translate(Math.round(shx), Math.round(shy));
    if (!B.bg || B.bg.width !== w || B.bg.height !== h) B.bg = arena(w, h, s);
    c.drawImage(B.bg, 0, 0);
    const big = Math.max(3, Math.round(Math.min(w * 0.2, h * 0.42) / 16));
    const gy = h * 0.62;
    // hero
    let hx = w * 0.27; let hRow = 0;
    if (B.hAnim) { B.hAnim.t += dt; const a = B.hAnim.t; if (B.hAnim.kind === 'attack') { const k = a < 0.25 ? a / 0.25 : a < 0.55 ? 1 : Math.max(0, 1 - (a - 0.55) / 0.3); hx += w * 0.3 * k; hRow = a > 0.2 && a < 0.6 ? 4 : Math.floor(a * 10) % 4; if (a > 0.9) B.hAnim = null; } else { hRow = 4; if (a > 1.2) B.hAnim = null; } }
    const hb = Math.sin(t * 3) * s * 0.5;
    // ally behind the hero
    if (B.ally && ready(B.ally.spr)) { let ax = w * 0.12; if (B.aAnim) { B.aAnim.t += dt; const a = B.aAnim.t; const k = a < 0.25 ? a / 0.25 : Math.max(0, 1 - (a - 0.25) / 0.35); ax += w * 0.45 * k; if (a > 0.7) B.aAnim = null; } const ab = big * 0.8; shadow(c, ax, gy - h * 0.06, ab); c.drawImage(IMG[B.ally.spr], 3 * 16, (B.aAnim ? 4 : 0) * 16, 16, 16, Math.round(ax - ab * 8), Math.round(gy - h * 0.06 - ab * 16), ab * 16, ab * 16); }
    shadow(c, hx, gy, big);
    if (B.hFlash > 0) { B.hFlash -= dt; c.globalAlpha = 0.5 + Math.sin(t * 60) * 0.5; }
    c.drawImage(IMG.c15, 3 * 16, hRow * 16, 16, 16, Math.round(hx - big * 8), Math.round(gy - big * 16 + hb), big * 16, big * 16);
    c.globalAlpha = 1;
    const wpn = equippedSlayer() ? IMG.katana : IMG.sword;
    if (wpn && wpn.complete) { c.save(); c.translate(Math.round(hx + big * 6), Math.round(gy - big * 7 + hb)); c.rotate(B.hAnim && B.hAnim.kind === 'attack' && B.hAnim.t > 0.2 && B.hAnim.t < 0.6 ? 1.9 : 0.5); c.drawImage(wpn, -wpn.width * big / 2, -wpn.height * big, wpn.width * big, wpn.height * big); c.restore(); }
    // enemy
    const def = B.def; const ek = B.ent.img; const esc2 = (def.sc || 1); const eb2 = Math.round(big * Math.min(1.9, esc2)) ;
    let ex = w * 0.72;
    if (B.eKnock > 0) { B.eKnock = Math.max(0, B.eKnock - dt * 4); ex += B.eKnock * s * 6; }
    const mon = /^m/.test(ek); let eRow = mon ? Math.floor(t * 6) % 4 : 0;
    if (B.eAnim) { B.eAnim.t += dt; const a = B.eAnim.t; const k = a < 0.3 ? a / 0.3 : Math.max(0, 1 - (a - 0.3) / 0.3); ex -= w * 0.3 * k; if (!mon) eRow = a > 0.2 && a < 0.45 ? 4 : Math.floor(a * 12) % 4; if (a > 0.7) B.eAnim = null; }
    else if (!mon && B.phase === 'player') eRow = Math.floor(t * 3) % 2 ? 0 : 2;
    let ea = 1;
    if (B.dying) { B.dying += dt; ea = Math.max(0, 1 - B.dying / 0.7); if (B.dying > 0.1 && !B.smoked) { B.smoked = 1; B.fx.push({ img: 'fxSmoke', x: 0.72, y: 0.55, t: 0, n: 6, sc: 2.2 * Math.min(1.6, esc2) }); } }
    shadow(c, ex, gy, eb2 * ea);
    c.globalAlpha = ea;
    let eim = def.tint ? tinted(ek, def.tint, 0.38) : IMG[ek];
    if (B.eFlash > 0) { B.eFlash -= dt; eim = tinted(ek, '#ffffff', 0.85); }
    const bob = mon ? 0 : Math.sin(t * 3 + 1) * s * 0.5;
    if (eim) c.drawImage(eim, 2 * 16, eRow * 16, 16, 16, Math.round(ex - eb2 * 8), Math.round(gy - eb2 * 16 + bob), eb2 * 16, eb2 * 16);
    if (def.crown) drawCrown(c, ex, gy - eb2 * 16 + eb2 * 2, eb2);
    c.globalAlpha = 1;
    for (let i = B.fx.length - 1; i >= 0; i--) { const f = B.fx[i]; f.t += dt; const fr = Math.floor(f.t / 0.07); if (fr >= f.n) { B.fx.splice(i, 1); continue; } const im = IMG[f.img]; if (!im) continue; const sz = 32 * big * f.sc / 2.4; c.drawImage(im, fr * 32, 0, 32, 32, Math.round(w * f.x - sz / 2), Math.round(h * f.y - sz / 2 - big * 4), sz, sz); }
    c.textAlign = 'center';
    for (let i = B.nums.length - 1; i >= 0; i--) {
      const n = B.nums[i]; n.t += dt; if (n.t > 1.1) { B.nums.splice(i, 1); continue; }
      const sc = n.big ? 1.5 : 1; const pop = n.t < 0.12 ? 1.6 - n.t * 5 : 1;
      c.font = `${Math.round(big * 4 * sc * pop)}px Silkscreen, monospace`; const y = h * n.y - n.t * big * 8 - big * 4;
      c.globalAlpha = Math.min(1, (1.1 - n.t) * 3); c.fillStyle = '#120a1c'; c.fillText(n.txt, w * n.x + big / 2, y + big / 2); c.fillStyle = n.c; c.fillText(n.txt, w * n.x, y); c.globalAlpha = 1;
    }
    c.setTransform(1, 0, 0, 1, 0, 0);
    const vg = c.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, w * 0.8); vg.addColorStop(0, 'rgba(8,4,16,0)'); vg.addColorStop(1, 'rgba(8,4,16,.6)'); c.fillStyle = vg; c.fillRect(0, 0, w, h);
  }
  function shadow(c, x, y, big) { c.fillStyle = 'rgba(8,4,16,.4)'; c.beginPath(); c.ellipse(x, y - big, big * 6, big * 2, 0, 0, 7); c.fill(); }
  function equippedSlayer() { try { const S0 = G.state(); const inst = S0.items.find((i) => i.uid === S0.equip.weapon); return inst && inst.id === 'rpg_goblin_slayer'; } catch (e) { return false; } }

  // ================================================================== HOOKS
  G.on && G.on('render', () => { if (open) renderHud(); });
  setTimeout(() => { if (!B) flushWorkouts(); }, 1500);
  G._rpg = { get R() { return R; }, reset() { localStorage.removeItem(KEY); load(); Object.keys(ZCACHE).forEach((k) => delete ZCACHE[k]); Z = null; } };
  G._rpgDebug = {
    ents: () => ents, hero: () => hero, battle: () => B, zone: () => Z,
    startFight(id) { const e = ents.find((x) => x.id === id || x.id === 's:' + id); if (e) startEncounter(e); },
    tp(x, y) { hero.tx = x; hero.ty = y; hero.x = x * T; hero.y = y * T; hero.path = []; snapCam(); },
    walk(x, y) { const p = findPath(hero.tx, hero.ty, x, y, hero); if (p) hero.path = p; return !!p; },
    talk(id) { const e = ents.find((x) => x.id === id); if (e) goTo(e); return !!e; },
    go(id, x, y) { enterZone(id, x, y, { arrive: x == null }); },
    useExit(i) { useExit(Z.exits[i]); }, exits: () => Z.exits.map((e) => ({ to: e.to, x: e.x, y: e.y, locked: e.locked ? e.locked() : null })),
    menu: (k) => (k === 'travel' ? openTravel() : k === 'moves' ? openMoves() : k === 'sound' ? openSound() : k === 'party' ? openParty() : k === 'bounty' ? openBounties() : openMenu()),
    prop(kind) { const p = Z.props.find((q) => q[kind] != null && q[kind] !== false); if (p) goToProp(p); return !!p; }
  };
})();
