/* Pulse Realm — the walkable world inside Adventure.
   Vertical slice: Pulsehaven village → Elder Oren → "Goblins at the Gate" → exercise-powered turn-based battle
   → victory → loot chest → equip → autosaved character.
   Art: Ninja Adventure by Pixel-boy (CC0). Fonts: Pixelify Sans / Silkscreen (OFL). See assets/rpg/CREDITS.md.
   Every attack is a real set: reps are logged once, as normal workouts, so XP/coins/skills flow through the existing systems. */
(function () {
  const G = (window.G = window.G || {});
  const KEY = 'pulse-rpg-v1';
  const A = 'assets/rpg/';
  const T = 16; // tile size in art pixels
  const TEST = () => !!window.__PULSE_TEST;

  // ------------------------------------------------------------------ save
  let R;
  function load() {
    try { R = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { R = null; }
    R = R || {};
    R.v = 1; R.x = R.x == null ? 14 : R.x; R.y = R.y == null ? 9 : R.y; R.dir = R.dir || 0;
    R.q = R.q || 0; // 0 meet elder · 1 see guard · 2 fight goblin · 3 report back · 4 done
    R.hp = R.hp == null ? 20 : R.hp; R.potions = R.potions == null ? 1 : R.potions;
    R.kills = R.kills || {}; R.fights = R.fights || 0; R.wins = R.wins || 0;
    R.music = R.music !== false; R.joy = !!R.joy; R.hint = R.hint || 0;
    R.slimeAt = R.slimeAt || 0;
  }
  load();
  let saveT = 0;
  function save(now) { R.savedAt = Date.now(); if (now) { localStorage.setItem(KEY, JSON.stringify(R)); return; } clearTimeout(saveT); saveT = setTimeout(() => localStorage.setItem(KEY, JSON.stringify(R)), 250); }
  G.rpgState = () => R;
  G._rpg = { get R() { return R; }, reset() { localStorage.removeItem(KEY); load(); spawn(); } };

  // ------------------------------------------------------------------ items (integrates with the loot system)
  G.registerItems && G.registerItems([
    { id: 'rpg_goblin_slayer', name: 'Goblin Slayer', icon: '🗡️', tier: 2, type: 'gear', slot: 'weapon', stats: { power: 12, crit: 3 }, special: true, desc: 'Taken from the goblin at Pulsehaven\'s gate. Still smells of turnips.' }
  ]);

  // ------------------------------------------------------------------ assets
  const IMG = {};
  const imgList = {
    ts: 'tileset.png', hero: 'chars/c15.png', goblin: 'chars/c1.png', elder: 'chars/c9.png', mira: 'chars/c6.png', bo: 'chars/c19.png', pip: 'chars/c24.png',
    dog: 'chars/dog.png', slime: 'chars/slime.png', fxRing: 'fx/f1.png', fxSpark: 'fx/f5.png', fxSlash: 'fx/f6.png', fxCross: 'fx/f7.png', fxArc: 'fx/f8.png', fxClaw: 'fx/f11.png',
    fxSmoke: 'fx/f18.png', fxHit: 'fx/f3.png', chest: 'items/big-treasure-chest.png', coin: 'items/coin-2.png', heart: 'items/hud-heart.png', pot: 'items/life-pot.png', katana: 'items/katana.png', sword: 'items/sword.png'
  };
  let loaded = 0; const total = Object.keys(imgList).length;
  function loadImages() {
    if (IMG.ts) return;
    Object.entries(imgList).forEach(([k, src]) => { const i = new Image(); i.onload = () => { loaded++; if (loaded === total) { buildGround(); } }; i.src = A + src; IMG[k] = i; });
  }
  const FACE = { elder: 'c9', mira: 'c6', bo: 'c19', pip: 'c24', goblin: 'c1', hero: 'c15', dog: 'dog' };
  const faceUrl = (who) => `${A}face/${FACE[who] || 'c15'}.png`;

  // ------------------------------------------------------------------ audio (WebAudio so volume works on iOS)
  const SND = {}; let musicNode = null, musicGain = null, musicWant = null, musicName = null;
  const sfxFiles = { sword: 'sword', kill: 'kill', gold: 'gold-1', power: 'power-up', win: 'succes', win2: 'succes-2', menu: 'menu-1', menu3: 'menu-3', alert: 'alert', over: 'game-over', magic: 'magic-1', hit1: '1', hit2: '2', hit3: '3', hit5: '5', hit9: '9' };
  function actx() { try { if (typeof initAudio === 'function') initAudio(); return typeof audioCtx !== 'undefined' ? audioCtx : null; } catch (e) { return null; } }
  const soundOn = () => typeof settings === 'undefined' || settings.sound !== false;
  function fetchBuf(path) {
    const ctx = actx(); if (!ctx) return Promise.resolve(null);
    if (SND[path]) return SND[path];
    SND[path] = fetch(A + path).then((r) => r.arrayBuffer()).then((b) => new Promise((res) => ctx.decodeAudioData(b, res, () => res(null)))).catch(() => null);
    return SND[path];
  }
  function sfx(name, vol = 0.55, rate = 1) {
    if (!soundOn() || TEST()) return;
    const ctx = actx(); if (!ctx) return;
    fetchBuf('sfx/' + sfxFiles[name] + '.mp3').then((buf) => {
      if (!buf) return;
      const s = ctx.createBufferSource(); s.buffer = buf; s.playbackRate.value = rate;
      const g = ctx.createGain(); g.gain.value = vol; s.connect(g); g.connect(ctx.destination); s.start();
    });
  }
  function blip(pitch) {
    if (!soundOn() || TEST()) return;
    const ctx = actx(); if (!ctx) return;
    const o = ctx.createOscillator(), g = ctx.createGain(); const n = ctx.currentTime;
    o.type = 'square'; o.frequency.value = pitch; g.gain.setValueAtTime(0.035, n); g.gain.exponentialRampToValueAtTime(0.001, n + 0.05);
    o.connect(g); g.connect(ctx.destination); o.start(n); o.stop(n + 0.06);
  }
  function music(name) {
    musicWant = name;
    if (TEST()) return;
    const ctx = actx(); if (!ctx) return;
    if (musicName === name && musicNode) return;
    stopMusic();
    if (!name || !R.music || !soundOn()) return;
    fetchBuf('music/' + name + '.mp3').then((buf) => {
      if (!buf || musicWant !== name || musicNode) return;
      musicGain = ctx.createGain(); musicGain.gain.setValueAtTime(0, ctx.currentTime); musicGain.gain.linearRampToValueAtTime(name === 'battle' ? 0.32 : 0.26, ctx.currentTime + 1.2);
      musicNode = ctx.createBufferSource(); musicNode.buffer = buf; musicNode.loop = true; musicNode.connect(musicGain); musicGain.connect(ctx.destination); musicNode.start(); musicName = name;
    });
  }
  function stopMusic() {
    if (!musicNode) { musicName = null; return; }
    const ctx = actx(); const n = musicNode, g = musicGain;
    try { g.gain.cancelScheduledValues(ctx.currentTime); g.gain.setValueAtTime(g.gain.value, ctx.currentTime); g.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5); n.stop(ctx.currentTime + 0.55); } catch (e) {}
    musicNode = null; musicGain = null; musicName = null;
  }
  const buzz = (t) => { try { if (typeof haptic === 'function') haptic(t); } catch (e) {} };

  // ------------------------------------------------------------------ map: Pulsehaven + the south field
  const MW = 30, MH = 34;
  const TILE = { g0: [22, 11], g1: [23, 11], pave: [19, 11], dirt: [20, 11], cob: [18, 11] };
  const ground = new Array(MW * MH).fill('g0');
  const block = new Uint8Array(MW * MH);
  const at = (x, y) => y * MW + x;
  const inMap = (x, y) => x >= 0 && y >= 0 && x < MW && y < MH;
  function noise(x, y) { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); }
  function smooth(x, y) { let v = 0; for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) v += noise(Math.floor((x + dx) / 2), Math.floor((y + dy) / 2)); return v / 9; }
  const fill = (x0, y0, x1, y1, t) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (inMap(x, y)) ground[at(x, y)] = t; };
  // grass with darker patches
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) ground[at(x, y)] = smooth(x, y) > 0.6 ? 'g1' : 'g0';
  fill(4, 7, 25, 9, 'pave');      // town square
  fill(14, 5, 15, 6, 'pave');     // elder's steps
  fill(14, 10, 15, 20, 'pave');   // main street → gate
  fill(5, 14, 24, 14, 'cob');     // lower lane
  fill(5, 13, 5, 13, 'cob');
  fill(14, 21, 15, 27, 'dirt');   // trail south
  fill(12, 26, 17, 29, 'dirt');   // goblin camp clearing

  // prefabs: [sx, sy, w, h] in tiles, placed at x,y; `solid` = rows from the bottom that block
  const PF = {
    houseO: [0, 0, 4, 3, 2], houseB: [4, 0, 4, 3, 2], houseC: [8, 0, 4, 3, 2], dojo: [12, 0, 4, 3, 2], hut: [16, 0, 2, 2, 1],
    torii: [0, 3, 3, 2, 0], treeA: [0, 10, 2, 2, 1], treeB: [2, 10, 2, 2, 1], pine: [6, 10, 2, 2, 1], rock: [12, 10, 2, 2, 1], stump: [6, 18, 2, 2, 1],
    fence: [23, 3, 1, 1, 1], flowers: [14, 9, 1, 1, 0], dots: [2, 8, 1, 1, 0], tuft: [0, 8, 1, 1, 0], tuft2: [0, 5, 1, 1, 0], clover: [0, 6, 1, 1, 0],
    pot: [1, 6, 1, 1, 1], crate: [2, 6, 1, 1, 1], stone: [0, 7, 1, 1, 1], lantern: [10, 5, 1, 1, 1], post: [13, 6, 1, 1, 1], twigs: [1, 5, 1, 1, 0]
  };
  const props = [];
  function place(name, x, y, extra) {
    const p = PF[name]; if (!p) return;
    const o = Object.assign({ name, x, y, sx: p[0], sy: p[1], w: p[2], h: p[3], solid: p[4] }, extra || {});
    for (let r = 0; r < o.solid; r++) for (let c = 0; c < o.w; c++) { const bx = x + c, by = y + o.h - 1 - r; if (inMap(bx, by)) block[at(bx, by)] = 1; }
    props.push(o); return o;
  }
  // forest ring
  for (let y = -1; y < MH; y += 2) for (let x = -1; x < MW; x += 2) {
    const edge = x <= 1 || x >= MW - 3 || y <= 0 || y >= MH - 3;
    if (!edge) continue;
    const ox = (Math.floor(y / 2) % 2) ? 1 : 0;
    place(noise(x, y) > 0.45 ? 'pine' : (noise(y, x) > 0.5 ? 'treeA' : 'treeB'), x - ox, y);
  }
  for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) if (x <= 1 || x >= MW - 2 || y <= 1 || y >= MH - 2) block[at(x, y)] = 1;
  // inner tree line bumps for an organic edge
  [[2, 3], [26, 2], [2, 16], [25, 17], [2, 23], [26, 24], [3, 29], [24, 30], [8, 30], [19, 30], [10, 2], [19, 2]].forEach(([x, y], i) => place(i % 3 ? 'pine' : 'treeA', x, y));
  // buildings
  const ELDER_HOUSE = place('houseO', 13, 2, { glow: [[13.4, 3.9], [15.9, 3.9]], smoke: [15.6, 2.1] });
  place('houseB', 4, 4, { glow: [[6.4, 5.9]], label: 'Your home' });
  place('dojo', 21, 4, { glow: [[23.4, 5.9]], smoke: [24.3, 4.2] });
  place('houseC', 4, 11, { glow: [[6.4, 12.9]] });
  place('hut', 22, 12, { glow: [] });
  place('torii', 13, 16);
  block[at(13, 17)] = 1; block[at(15, 17)] = 1;
  // greenery & clutter
  [['treeA', 9, 11], ['treeB', 18, 11], ['pine', 26, 8], ['treeA', 2, 8], ['rock', 9, 3], ['stump', 18, 2], ['treeB', 11, 4]].forEach(([n, x, y]) => place(n, x, y));
  [['lantern', 12, 7], ['lantern', 17, 7], ['lantern', 13, 19], ['lantern', 16, 19], ['crate', 20, 6], ['pot', 8, 6], ['crate', 25, 6], ['pot', 3, 13], ['post', 16, 10], ['crate', 8, 13]].forEach(([n, x, y]) => place(n, x, y));
  for (let i = 0; i < 70; i++) {
    const x = 2 + Math.floor(noise(i, 7) * 26), y = 2 + Math.floor(noise(9, i) * 30);
    if (block[at(x, y)] || ground[at(x, y)] !== 'g0' && ground[at(x, y)] !== 'g1') continue;
    if (props.some((p) => x >= p.x && x < p.x + p.w && y >= p.y && y < p.y + p.h)) continue;
    place(['flowers', 'dots', 'tuft', 'tuft2', 'clover', 'twigs', 'tuft'][i % 7], x, y);
  }
  // the south fence with its gate (cols 14-15)
  for (let x = 2; x <= 27; x++) if (x !== 14 && x !== 15) place('fence', x, 20);
  // south field
  [['rock', 5, 23], ['rock', 22, 26], ['stump', 9, 27], ['treeB', 20, 22], ['treeA', 6, 26], ['stone', 18, 28], ['stone', 11, 24], ['crate', 13, 26], ['pot', 17, 26]].forEach(([n, x, y]) => place(n, x, y));
  const GATE = [[14, 20], [15, 20]];
  const gateOpen = () => R.q >= 2;

  // ground canvas (pre-rendered at 1×)
  let groundCv = null;
  function buildGround() {
    groundCv = document.createElement('canvas'); groundCv.width = MW * T; groundCv.height = MH * T;
    const g = groundCv.getContext('2d'); g.imageSmoothingEnabled = false;
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) { const [sx, sy] = TILE[ground[at(x, y)]]; g.drawImage(IMG.ts, sx * T, sy * T, T, T, x * T, y * T, T, T); }
    // soft edge shading where paving meets grass
    g.fillStyle = 'rgba(30,20,10,.18)';
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) {
      const t = ground[at(x, y)]; if (t === 'g0' || t === 'g1') continue;
      if (y > 0 && /g/.test(ground[at(x, y - 1)])) g.fillRect(x * T, y * T, T, 2);
    }
  }

  // ------------------------------------------------------------------ entities
  const ents = [];
  let hero = null;
  function mk(id, img, x, y, o) {
    const e = Object.assign({ id, img, tx: x, ty: y, x: x * T, y: y * T, dir: 0, path: [], moving: false, step: 0, speed: 4.2, frame: 0, home: [x, y], wander: 0, bob: Math.random() * 6 }, o || {});
    ents.push(e); return e;
  }
  function spawn() {
    ents.length = 0;
    hero = mk('hero', 'hero', R.x, R.y, { dir: R.dir, speed: 5 });
    mk('elder', 'elder', 15, 5, { name: 'Elder Oren', wanderR: 0, dir: 0, talk: talkElder });
    mk('mira', 'mira', 9, 8, { name: 'Mira', wanderR: 3, talk: talkMira, speed: 2.2 });
    mk('bo', 'bo', gateOpen() ? 13 : 14, gateOpen() ? 19 : 20, { name: 'Bo', wanderR: 0, dir: 0, talk: talkBo });
    mk('pip', 'pip', 20, 15, { name: 'Pip', wanderR: 3, talk: talkPip, speed: 2.8 });
    mk('dog', 'dog', 21, 16, { name: 'Rex', wanderR: 4, talk: talkDog, speed: 3.5, dogSprite: true });
    if (!R.kills.goblin) mk('goblin', 'goblin', 15, 27, { name: 'Gate Goblin', enemy: 'goblin', wanderR: 2, speed: 2.4, home: [15, 27] });
    if (R.kills.goblin && Date.now() >= R.slimeAt) mk('slime', 'slime', 20, 25, { name: 'Field Slime', enemy: 'slime', wanderR: 3, speed: 1.6, monster: true, home: [20, 25] });
    if (block[at(hero.tx, hero.ty)]) { hero.tx = 14; hero.ty = 9; hero.x = 14 * T; hero.y = 9 * T; }
  }
  const entAt = (x, y, except) => ents.find((e) => e !== except && e.tx === x && e.ty === y);
  function solid(x, y, who) {
    if (!inMap(x, y) || block[at(x, y)]) return true;
    if (!gateOpen() && y >= 20 && who === hero) return true;
    if (entAt(x, y, who)) return true;
    return false;
  }
  // BFS — the village is small, so breadth-first gives true shortest paths cheaply
  function findPath(sx, sy, gx, gy, who) {
    if (sx === gx && sy === gy) return [];
    const prev = new Int32Array(MW * MH).fill(-1); const q = [at(sx, sy)]; prev[at(sx, sy)] = at(sx, sy);
    while (q.length) {
      const c = q.shift(); const cx = c % MW, cy = (c / MW) | 0;
      if (cx === gx && cy === gy) break;
      for (const [dx, dy] of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
        const nx = cx + dx, ny = cy + dy; if (!inMap(nx, ny)) continue; const n = at(nx, ny);
        if (prev[n] !== -1 || (solid(nx, ny, who) && !(nx === gx && ny === gy && !block[n]))) continue;
        prev[n] = c; q.push(n);
      }
    }
    if (prev[at(gx, gy)] === -1) return null;
    const out = []; let c = at(gx, gy);
    while (c !== at(sx, sy)) { out.unshift([c % MW, (c / MW) | 0]); c = prev[c]; }
    return out;
  }
  const DIRS = { '0,1': 0, '0,-1': 1, '-1,0': 2, '1,0': 3 };
  function face(e, x, y) { const dx = Math.sign(x - e.tx), dy = Math.sign(y - e.ty); if (dx || dy) e.dir = Math.abs(x - e.tx) > Math.abs(y - e.ty) ? (dx < 0 ? 2 : 3) : (dy < 0 ? 1 : 0); }

  // ------------------------------------------------------------------ DOM
  let root, cv, ctx, hud, dlg, menuEl, joyEl, battleEl, open = false, raf = 0, last = 0, W = 0, H = 0, DPR = 1, S = 3;
  const cam = { x: 0, y: 0, shake: 0 };
  function build() {
    if (root) return;
    root = document.createElement('div'); root.id = 'realm'; root.className = 'realm';
    root.innerHTML = `
      <canvas id="realmCv"></canvas>
      <div class="rl-hud">
        <div class="rl-quest" id="rlQuest"></div>
        <div class="rl-right"><div class="rl-hearts" id="rlHearts"></div><div class="rl-gold"><i class="px px-coin"></i><span id="rlGold">0</span></div><button class="rl-btn" id="rlMenuBtn" aria-label="Menu">≡</button></div>
      </div>
      <div class="rl-hint" id="rlHint"></div>
      <div class="rl-joy" id="rlJoy"><div class="rl-knob"></div></div>
      <div class="rl-dlg" id="rlDlg"></div>
      <div class="rl-menu" id="rlMenu"></div>
      <div class="rl-loading" id="rlLoading"><div class="rl-ltitle">PULSE REALM</div><div class="rl-lbar"><i></i></div></div>
      <div class="rl-fade" id="rlFade"></div>`;
    document.body.appendChild(root);
    cv = root.querySelector('#realmCv'); ctx = cv.getContext('2d');
    hud = root.querySelector('.rl-hud'); dlg = root.querySelector('#rlDlg'); menuEl = root.querySelector('#rlMenu'); joyEl = root.querySelector('#rlJoy');
    cv.addEventListener('pointerdown', onTap);
    root.querySelector('#rlMenuBtn').onclick = (e) => { e.stopPropagation(); toggleMenu(); };
    dlg.addEventListener('pointerdown', (e) => { e.stopPropagation(); advanceDlg(); });
    bindJoy();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', () => { if (document.hidden) stopMusic(); else if (open) music(B ? 'battle' : 'village'); });
  }
  function resize() {
    if (!root || !open) return;
    const nb = document.getElementById('navbar'); const nh = nb ? nb.offsetHeight : 0;
    root.style.bottom = nh + 'px';
    DPR = Math.min(3, window.devicePixelRatio || 1);
    W = root.clientWidth; H = root.clientHeight;
    cv.width = Math.round(W * DPR); cv.height = Math.round(H * DPR); cv.style.width = W + 'px'; cv.style.height = H + 'px';
    // integer pixel scale: ~9 tiles across on a phone, more on wide screens
    S = Math.max(2, Math.round(Math.min(W / (9.5 * T), H / (12 * T)) * DPR)) || 3;
    ctx.imageSmoothingEnabled = false;
    if (bcv) sizeBattle();
  }

  // ------------------------------------------------------------------ open / close (driven by the Adventure ▸ Realm sub-tab)
  G.rpgOpen = function () {
    build(); loadImages();
    if (!hero) spawn();
    if (!B) setTimeout(flushWorkouts, 300);
    open = true; root.classList.add('on'); document.body.classList.add('realm-on');
    resize(); snapCam(); renderHud();
    if (!raf) { last = performance.now(); raf = requestAnimationFrame(loop); }
    music(B ? 'battle' : 'village');
    if (R.hint < 1 && !TEST()) setTimeout(() => hint(R.joy ? 'Use the stick to walk · tap people to talk' : 'Tap anywhere to walk · tap people to talk'), 900);
    if (!R.introSeen) { R.introSeen = 1; save(); setTimeout(() => fade(true, () => {}), 0); }
  };
  G.rpgClose = function () {
    if (!open) return;
    if (B && B.phase === 'end') { /* left mid-spoils: keep sets safe */ }
    if (!B) flushWorkouts();
    open = false; if (root) root.classList.remove('on'); document.body.classList.remove('realm-on');
    cancelAnimationFrame(raf); raf = 0; stopMusic(); closeMenu();
    if (hero) { R.x = hero.tx; R.y = hero.ty; R.dir = hero.dir; save(true); }
  };
  G.rpgIsOpen = () => open;

  // ------------------------------------------------------------------ input
  let tapMark = null;
  function screenToTile(cx, cy) { const r = cv.getBoundingClientRect(); const px = ((cx - r.left) * DPR + cam.x * S) / S, py = ((cy - r.top) * DPR + cam.y * S) / S; return [Math.floor(px / T), Math.floor(py / T)]; }
  function onTap(ev) {
    actx(); if (!musicNode) music(B ? 'battle' : 'village');
    if (B || dlgQ || menuOpen || busy) { if (dlgQ) advanceDlg(); return; }
    const [tx, ty] = screenToTile(ev.clientX, ev.clientY);
    // tap on a character (or the tile above its feet)
    const tgt = ents.find((e) => e !== hero && e.tx === tx && (e.ty === ty || e.ty === ty + 1 && !e.dogSprite)) || null;
    if (tgt) { goTo(tgt); return; }
    if (!inMap(tx, ty)) return;
    let gx = tx, gy = ty;
    if (solid(gx, gy, hero)) {
      // the gate is shut until Bo lets you through
      if (!gateOpen() && ty >= 20 && ty <= 22 && (tx === 14 || tx === 15)) { const bo = ents.find((e) => e.id === 'bo'); if (bo) { goTo(bo); return; } }
      const n = [[0, 1], [1, 0], [-1, 0], [0, -1]].map(([dx, dy]) => [tx + dx, ty + dy]).find(([x, y]) => !solid(x, y, hero));
      if (!n) { tapMark = { x: tx, y: ty, t: 0, bad: true }; return; }
      [gx, gy] = n;
    }
    const p = findPath(hero.tx, hero.ty, gx, gy, hero);
    if (!p) { tapMark = { x: tx, y: ty, t: 0, bad: true }; return; }
    hero.path = p; hero.onArrive = null; tapMark = { x: gx, y: gy, t: 0 };
    if (R.hint < 1) { R.hint = 1; save(); hideHint(); }
  }
  function goTo(e) {
    const spots = [[0, 1], [1, 0], [-1, 0], [0, -1]].map(([dx, dy]) => [e.tx + dx, e.ty + dy]).filter(([x, y]) => !solid(x, y, hero) || (x === hero.tx && y === hero.ty));
    let best = null;
    spots.forEach(([x, y]) => { const p = x === hero.tx && y === hero.ty ? [] : findPath(hero.tx, hero.ty, x, y, hero); if (p && (!best || p.length < best.length)) best = p; });
    if (!best) { tapMark = { x: e.tx, y: e.ty, t: 0, bad: true }; return; }
    hero.path = best; tapMark = null;
    hero.onArrive = () => { face(hero, e.tx, e.ty); interact(e); };
    if (!best.length) { const f = hero.onArrive; hero.onArrive = null; f(); }
    if (R.hint < 1) { R.hint = 1; save(); hideHint(); }
  }
  const joy = { on: false, x: 0, y: 0 };
  function bindJoy() {
    const knob = joyEl.querySelector('.rl-knob'); let id = null, cx = 0, cy = 0;
    joyEl.addEventListener('pointerdown', (e) => { e.stopPropagation(); actx(); id = e.pointerId; joyEl.setPointerCapture(id); const r = joyEl.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2; joy.on = true; mv(e); });
    const mv = (e) => { if (e.pointerId !== id) return; let dx = e.clientX - cx, dy = e.clientY - cy; const d = Math.hypot(dx, dy), m = 38; if (d > m) { dx *= m / d; dy *= m / d; } joy.x = dx / m; joy.y = dy / m; knob.style.transform = `translate(${dx}px,${dy}px)`; };
    joyEl.addEventListener('pointermove', mv);
    const up = (e) => { if (e.pointerId !== id) return; id = null; joy.on = false; joy.x = joy.y = 0; knob.style.transform = ''; };
    joyEl.addEventListener('pointerup', up); joyEl.addEventListener('pointercancel', up);
  }

  // ------------------------------------------------------------------ update
  let busy = false; // cutscene lock
  function stepEnt(e, dt) {
    if (!e.moving) {
      if (e === hero && joy.on && !e.path.length && !dlgQ && !B && !busy) {
        const ax = Math.abs(joy.x), ay = Math.abs(joy.y);
        if (Math.max(ax, ay) > 0.35) { const dx = ax > ay ? Math.sign(joy.x) : 0, dy = ax > ay ? 0 : Math.sign(joy.y); e.dir = DIRS[dx + ',' + dy]; if (!solid(e.tx + dx, e.ty + dy, e)) e.path = [[e.tx + dx, e.ty + dy]]; }
      }
      if (e.path.length) {
        const [nx, ny] = e.path[0];
        if (solid(nx, ny, e)) { // someone stepped in the way: re-plan once
          const g = e.path[e.path.length - 1]; const p = (e.path.length > 1) ? findPath(e.tx, e.ty, g[0], g[1], e) : null;
          e.path = p || []; if (!p) { if (e.onArrive && e === hero) { /* try anyway when adjacent */ } return; }
          if (!e.path.length) return;
        }
        const [mx, my] = e.path.shift(); face(e, mx, my); e.fromX = e.tx * T; e.fromY = e.ty * T; e.tx = mx; e.ty = my; e.moving = true; e.prog = 0;
      } else if (e.onArrive) { const f = e.onArrive; e.onArrive = null; f(); }
    }
    if (e.moving) {
      e.prog += dt * e.speed; const p = Math.min(1, e.prog);
      e.x = e.fromX + (e.tx * T - e.fromX) * p; e.y = e.fromY + (e.ty * T - e.fromY) * p;
      e.step += dt * e.speed * 2;
      if (p >= 1) {
        e.moving = false; e.x = e.tx * T; e.y = e.ty * T;
        if (e === hero) { R.x = e.tx; R.y = e.ty; R.dir = e.dir; save(); if (e.ty % 2 === 0 && Math.random() < 0.5) dust(e); checkAggro(); }
      }
    }
  }
  function wander(e, dt) {
    if (e === hero || !e.wanderR || e.moving || e.path.length || dlgQ && dlgQ.who === e.id || e.frozen) return;
    e.wander -= dt; if (e.wander > 0) return;
    e.wander = 1.5 + Math.random() * 3.5;
    const [hx, hy] = e.home; const x = hx + Math.round((Math.random() * 2 - 1) * e.wanderR), y = hy + Math.round((Math.random() * 2 - 1) * e.wanderR);
    if (solid(x, y, e) || (e.enemy && y < 22)) return;
    const p = findPath(e.tx, e.ty, x, y, e); if (p && p.length < 8) e.path = p;
  }
  function checkAggro() {
    if (B || busy || dlgQ) return;
    ents.forEach((e) => {
      if (!e.enemy || e.aggro) return;
      const d = Math.abs(e.tx - hero.tx) + Math.abs(e.ty - hero.ty);
      if (d <= 2) { e.aggro = true; interact(e); }
    });
  }

  // ------------------------------------------------------------------ particles & ambience
  const parts = [];
  function dust(e) { for (let i = 0; i < 3; i++) parts.push({ x: e.x + 8 + (Math.random() - 0.5) * 6, y: e.y + 15, vx: (Math.random() - 0.5) * 8, vy: -4 - Math.random() * 4, life: 0.5, max: 0.5, c: '200,180,140', r: 1 }); }
  function ambient(dt, night) {
    if (parts.length > 120) return;
    if (night) { if (Math.random() < dt * 4) parts.push({ x: cam.x / S * 0 + Math.random() * MW * T, y: Math.random() * MH * T, vx: (Math.random() - 0.5) * 6, vy: (Math.random() - 0.5) * 6, life: 4, max: 4, c: '220,255,140', r: 1, glow: true, fly: true }); }
    else if (Math.random() < dt * 1.6) parts.push({ x: Math.random() * MW * T, y: -4 + Math.random() * MH * T * 0.2 + cam.y / S, vx: 10 + Math.random() * 8, vy: 6 + Math.random() * 5, life: 6, max: 6, c: noise(parts.length, 3) > 0.5 ? '120,170,60' : '200,130,60', r: 1, leaf: true });
    props.forEach((p) => { if (p.smoke && Math.random() < dt * 0.9) parts.push({ x: p.smoke[0] * T, y: p.smoke[1] * T, vx: 3 + Math.random() * 3, vy: -6 - Math.random() * 3, life: 2.4, max: 2.4, c: '190,190,200', r: 2, puff: true }); });
  }

  // ------------------------------------------------------------------ time of day
  function daylight() {
    const d = new Date(); const h = d.getHours() + d.getMinutes() / 60;
    if (h >= 7 && h < 17) return 0; if (h >= 17 && h < 20) return (h - 17) / 3; if (h >= 20 || h < 5) return 1; if (h >= 5 && h < 7) return 1 - (h - 5) / 2; return 0;
  }

  // ------------------------------------------------------------------ draw
  function drawChar(c, e, sx, sy, t) {
    const im = IMG[e.img]; if (!im || !im.complete) return;
    // shadow
    c.fillStyle = 'rgba(10,6,20,.32)'; c.beginPath(); c.ellipse(sx + 8, sy + 15, 5.5, 2.2, 0, 0, Math.PI * 2); c.fill();
    if (e.dogSprite) {
      const f = e.moving ? Math.floor(e.step) % 2 : Math.floor(t * 1.5) % 2;
      c.save(); if (e.dir === 2) { c.translate(sx + 16, sy); c.scale(-1, 1); c.drawImage(im, f * 16, 0, 16, 16, 0, 0, 16, 16); } else c.drawImage(im, f * 16, 0, 16, 16, sx, sy, 16, 16); c.restore(); return;
    }
    let row = e.moving ? (Math.floor(e.step) % 4) : 0;
    if (e.monster) row = Math.floor(t * 5 + e.bob) % 4;
    const bob = !e.moving && !e.monster ? (Math.floor(t * 2 + e.bob) % 2 ? 0 : 0) : 0;
    c.drawImage(im, e.dir * 16, row * 16, 16, 16, Math.round(sx), Math.round(sy + bob), 16, 16);
  }
  function drawProp(c, p) { c.drawImage(IMG.ts, p.sx * T, p.sy * T, p.w * T, p.h * T, p.x * T, p.y * T, p.w * T, p.h * T); }
  function snapCam() { if (!hero) return; cam.x = hero.x + 8 - W * DPR / S / 2; cam.y = hero.y + 8 - H * DPR / S / 2; clampCam(); }
  function clampCam() { const vw = W * DPR / S, vh = H * DPR / S; cam.x = Math.max(0, Math.min(MW * T - vw, cam.x)); cam.y = Math.max(0, Math.min(MH * T - vh, cam.y)); if (vw > MW * T) cam.x = (MW * T - vw) / 2; }

  function loop(now) {
    raf = requestAnimationFrame(loop);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!open) return;
    const t = now / 1000;
    if (loaded < total || !groundCv) { const l = root.querySelector('#rlLoading'); l.style.display = ''; l.querySelector('i').style.width = Math.round(loaded / total * 100) + '%'; return; }
    root.querySelector('#rlLoading').style.display = 'none';
    if (B) { battleFrame(dt, t); return; }
    ents.forEach((e) => { wander(e, dt); stepEnt(e, dt); });
    const night = daylight();
    ambient(dt, night > 0.5);
    // camera follows with a little lag
    const vw = W * DPR / S, vh = H * DPR / S;
    cam.x += (hero.x + 8 - vw / 2 - cam.x) * Math.min(1, dt * 8); cam.y += (hero.y + 8 - vh / 2 - cam.y) * Math.min(1, dt * 8); clampCam();
    const c = ctx; c.setTransform(1, 0, 0, 1, 0, 0); c.imageSmoothingEnabled = false;
    c.fillStyle = '#0d1a0f'; c.fillRect(0, 0, cv.width, cv.height);
    let shx = 0, shy = 0; if (cam.shake > 0) { cam.shake -= dt * 30; shx = (Math.random() - 0.5) * cam.shake; shy = (Math.random() - 0.5) * cam.shake; }
    c.setTransform(S, 0, 0, S, -Math.round((cam.x + shx) * S), -Math.round((cam.y + shy) * S));
    c.drawImage(groundCv, 0, 0);
    // shut gate glows faintly so it reads as "locked"
    if (!gateOpen()) { c.fillStyle = `rgba(255,90,60,${0.1 + Math.sin(t * 3) * 0.05})`; c.fillRect(14 * T, 20 * T, 2 * T, T); }
    // tap marker
    if (tapMark) { tapMark.t += dt; const a = 1 - tapMark.t / 0.6; if (a <= 0) tapMark = null; else { c.strokeStyle = tapMark.bad ? `rgba(255,90,90,${a})` : `rgba(255,240,180,${a})`; c.lineWidth = 1; const r = 3 + tapMark.t * 8; c.beginPath(); c.ellipse(tapMark.x * T + 8, tapMark.y * T + 12, r, r * 0.5, 0, 0, Math.PI * 2); c.stroke(); } }
    // depth-sorted props + characters
    const list = [];
    props.forEach((p) => list.push({ k: (p.y + p.h) * T - (p.solid ? 0 : 8), p }));
    ents.forEach((e) => list.push({ k: e.y + 16, e }));
    list.sort((a, b) => a.k - b.k);
    list.forEach((o) => { if (o.p) drawProp(c, o.p); else drawChar(c, o.e, o.e.x, o.e.y, t); });
    // quest markers above heads
    ents.forEach((e) => { const m = marker(e); if (!m) return; const y = e.y - 9 + Math.sin(t * 4) * 1.5; c.fillStyle = 'rgba(0,0,0,.6)'; c.fillRect(e.x + 6, y - 1, 5, 9); c.fillStyle = m === '!' ? '#ffd23f' : m === '?' ? '#9be7ff' : '#ff5a4a'; c.fillRect(e.x + 7, y, 3, 5); c.fillRect(e.x + 7, y + 6, 3, 2); });
    // particles
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i]; p.life -= dt; if (p.life <= 0) { parts.splice(i, 1); continue; }
      p.x += p.vx * dt; p.y += p.vy * dt; if (p.leaf) p.vx += Math.sin(t * 2 + i) * dt * 10; if (p.fly) { p.vx += (Math.random() - 0.5) * 20 * dt; p.vy += (Math.random() - 0.5) * 20 * dt; }
      const a = p.puff ? (p.life / p.max) * 0.45 : p.fly ? Math.abs(Math.sin(t * 3 + i)) : Math.min(1, p.life / p.max * 2);
      c.fillStyle = `rgba(${p.c},${a})`; const r = p.puff ? p.r + (1 - p.life / p.max) * 3 : p.r;
      if (p.puff) { c.beginPath(); c.arc(p.x, p.y, r, 0, 7); c.fill(); } else c.fillRect(Math.round(p.x), Math.round(p.y), r, r);
    }
    // grading: dusk/night + window/lantern light + vignette
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalCompositeOperation = 'multiply';
    c.fillStyle = night > 0 ? `rgba(${Math.round(255 - 170 * night)},${Math.round(240 - 160 * night)},${Math.round(235 - 90 * night)},1)` : 'rgba(246,236,226,1)';
    c.fillRect(0, 0, cv.width, cv.height);
    c.globalCompositeOperation = 'lighter';
    if (night > 0.15) {
      const lights = [];
      props.forEach((p) => { (p.glow || []).forEach(([x, y]) => lights.push([x * T + 8, y * T + 8, 26])); if (p.name === 'lantern') lights.push([p.x * T + 8, p.y * T + 4, 30]); });
      lights.forEach(([x, y, r]) => { const sx = (x - cam.x) * S, sy = (y - cam.y) * S, rr = r * S * (1 + Math.sin(t * 7 + x) * 0.03); const g = c.createRadialGradient(sx, sy, 0, sx, sy, rr); g.addColorStop(0, `rgba(255,170,70,${0.42 * night})`); g.addColorStop(1, 'rgba(255,120,40,0)'); c.fillStyle = g; c.fillRect(sx - rr, sy - rr, rr * 2, rr * 2); });
    }
    c.globalCompositeOperation = 'source-over';
    const vg = c.createRadialGradient(cv.width / 2, cv.height / 2, Math.min(cv.width, cv.height) * 0.35, cv.width / 2, cv.height / 2, Math.max(cv.width, cv.height) * 0.75);
    vg.addColorStop(0, 'rgba(8,4,16,0)'); vg.addColorStop(1, 'rgba(8,4,16,.55)'); c.fillStyle = vg; c.fillRect(0, 0, cv.width, cv.height);
  }
  function marker(e) {
    if (e.id === 'elder' && (R.q === 0 || R.q === 3)) return R.q === 0 ? '!' : '?';
    if (e.id === 'bo' && R.q === 1) return '!';
    if (e.enemy && !e.aggro && R.q >= 2) return 'x';
    return null;
  }

  // ------------------------------------------------------------------ HUD
  function renderHud() {
    if (!root) return;
    const q = root.querySelector('#rlQuest');
    const QT = ['Speak to Elder Oren', 'Talk to Bo at the south gate', 'Defeat the goblin in the south field', 'Return to Elder Oren', 'Quest complete'];
    q.innerHTML = R.q < 4 ? `<div class="rq-t">Goblins at the Gate</div><div class="rq-o"><i></i>${QT[R.q]}</div>` : `<div class="rq-t">Pulsehaven</div><div class="rq-o done"><i></i>The village is safe — for now</div>`;
    q.classList.toggle('pulse', R.q !== R._lastQ); R._lastQ = R.q;
    root.querySelector('#rlHearts').innerHTML = heartsHtml(R.hp, 20);
    root.querySelector('#rlGold').textContent = (G.state ? G.state().coins : 0).toLocaleString();
    joyEl.style.display = R.joy ? '' : 'none';
  }
  function heartsHtml(hp, max) { let h = ''; for (let i = 0; i < max / 4; i++) { const v = Math.max(0, Math.min(4, hp - i * 4)); h += `<i class="px-heart" style="--f:${4 - v}"></i>`; } return h; }
  let hintT = 0;
  function hint(txt) { const h = root.querySelector('#rlHint'); h.textContent = txt; h.classList.add('on'); clearTimeout(hintT); hintT = setTimeout(hideHint, 5000); }
  function hideHint() { const h = root && root.querySelector('#rlHint'); if (h) h.classList.remove('on'); }
  function fade(inOnly, cb) {
    const f = root.querySelector('#rlFade');
    if (inOnly) { f.classList.add('on'); f.offsetWidth; f.classList.remove('on'); cb && cb(); return; }
    f.classList.add('on'); setTimeout(() => { cb && cb(); setTimeout(() => f.classList.remove('on'), 60); }, 420);
  }
  // menu
  let menuOpen = false;
  function toggleMenu() { menuOpen ? closeMenu() : openMenu(); }
  function openMenu() {
    menuOpen = true; sfx('menu3', 0.4);
    const h = G.heroState ? G.heroState() : { name: 'Hero' };
    menuEl.innerHTML = `<div class="rm-box">
      <div class="rm-title">${esc(h.name || 'Hero')}</div>
      <div class="rm-sub">Battles ${R.fights} · Victories ${R.wins} · Potions ${R.potions}</div>
      <button class="rm-item" data-m="music">Music <b>${R.music ? 'ON' : 'OFF'}</b></button>
      <button class="rm-item" data-m="joy">Controls <b>${R.joy ? 'STICK' : 'TAP'}</b></button>
      <div class="rm-sep">Adventure</div>
      <div class="rm-grid"><button class="rm-item" data-go="map">World map</button><button class="rm-item" data-go="dungeons">Dungeons</button><button class="rm-item" data-go="village">Village</button><button class="rm-item" data-go="league">Battle &amp; League</button></div>
      <button class="rm-item ghost" data-m="close">Back to the realm</button></div>`;
    menuEl.classList.add('on');
    menuEl.onclick = (e) => { if (e.target === menuEl) closeMenu(); };
    menuEl.querySelectorAll('[data-m]').forEach((b) => (b.onclick = () => {
      const m = b.dataset.m;
      if (m === 'music') { R.music = !R.music; save(); if (R.music) music('village'); else stopMusic(); openMenu(); }
      else if (m === 'joy') { R.joy = !R.joy; save(); renderHud(); openMenu(); }
      else closeMenu();
    }));
    menuEl.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => { closeMenu(); G.nav && G.nav('adventure', b.dataset.go); }));
  }
  function closeMenu() { menuOpen = false; if (menuEl) menuEl.classList.remove('on'); }

  // ------------------------------------------------------------------ dialogue
  let dlgQ = null; // { lines:[{who,text,choices}], i, shown, full, who, done }
  function say(whoId, lines, done) {
    dlgQ = { lines: lines.map((l) => (typeof l === 'string' ? { who: whoId, text: l } : Object.assign({ who: whoId }, l))), i: 0, who: whoId, done };
    const e = ents.find((x) => x.id === whoId); if (e) { face(e, hero.tx, hero.ty); e.frozen = true; }
    showLine();
  }
  let typeT = 0;
  function showLine() {
    const L = dlgQ.lines[dlgQ.i];
    const name = L.who === 'hero' ? (G.heroState ? G.heroState().name : 'You') : (ents.find((e) => e.id === L.who) || {}).name || '';
    dlg.innerHTML = `<div class="rd-face" style="background-image:url(${faceUrl(L.who)})"></div><div class="rd-body"><div class="rd-name">${esc(name)}</div><div class="rd-text"></div>${L.choices ? '<div class="rd-ch"></div>' : '<div class="rd-more">▼</div>'}</div>`;
    dlg.classList.add('on');
    const tx = dlg.querySelector('.rd-text'); dlgQ.shown = 0; dlgQ.full = false;
    const pitch = { elder: 260, mira: 520, bo: 200, pip: 700, dog: 900, goblin: 160, hero: 420 }[L.who] || 400;
    clearInterval(typeT);
    typeT = setInterval(() => {
      dlgQ.shown += 1; tx.textContent = L.text.slice(0, dlgQ.shown);
      if (dlgQ.shown % 2 === 0 && L.text[dlgQ.shown] !== ' ') blip(pitch + Math.random() * 40);
      if (dlgQ.shown >= L.text.length) finishLine();
    }, TEST() ? 1 : 24);
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
  function advanceDlg() {
    if (!dlgQ) return;
    if (!dlgQ.full) { finishLine(); return; }
    if (dlgQ.lines[dlgQ.i].choices) return;
    dlgQ.i++;
    if (dlgQ.i >= dlgQ.lines.length) { const d = dlgQ.done; endDlg(); d && d(); } else showLine();
  }
  function endDlg() { clearInterval(typeT); const e = dlgQ && ents.find((x) => x.id === dlgQ.who); if (e) { e.frozen = false; e.wander = 2; } dlgQ = null; dlg.classList.remove('on'); }
  G._rpgDlg = () => dlgQ;
  G._rpgAdvance = advanceDlg;

  // ------------------------------------------------------------------ NPC talk
  function interact(e) {
    if (e.enemy) { startEncounter(e); return; }
    e.talk && e.talk(e);
  }
  const heroName = () => (G.heroState ? G.heroState().name : 'Hero');
  function talkElder() {
    if (R.q === 0) {
      say('elder', [
        `${heroName()}. Good — you're awake.`,
        'Goblins have been raiding our gardens from the south field. Last night one sat on the gate and laughed at Bo.',
        'Pulsehaven has no army. But you have something better.',
        'Your body. Every press-up, every squat — out here it becomes a strike.',
        { text: 'Will you drive the goblin off?', choices: [['I\'ll do it.', () => { R.q = 1; save(); renderHud(); sfx('power', 0.5); say('elder', ['Then go to the south gate and tell Bo I sent you.', 'And take this. Drink it if the fight turns.'], () => { hint('Quest updated · Talk to Bo at the south gate'); }); }], ['Not yet.', () => say('elder', ['Rest, then. The goblin isn\'t going anywhere. Sadly.'])]] }
      ]);
    } else if (R.q === 1) say('elder', ['Bo is at the south gate. Follow the main street down, through the shrine arch.']);
    else if (R.q === 2) say('elder', ['The goblin waits beyond the gate.', 'Breathe between rounds. When it winds up, you rest. When it\'s open — you strike.']);
    else if (R.q === 3) {
      say('elder', ['I heard the clash from here! The whole village did.', 'Pulsehaven thanks you. Here — it isn\'t much, but it\'s honest coin.'], () => {
        R.q = 4; R.potions += 2; save(); renderHud();
        G.reward && G.reward({ coins: 250, gems: 2 }, { label: '📜 Quest complete: Goblins at the Gate' });
        sfx('win2', 0.5); buzz('success');
        say('elder', ['Two potions as well. You\'ll need them.', 'Goblins never travel alone for long. Bigger ones will come.', 'Keep training. When they come, we\'ll be ready.']);
      });
    } else {
      const st = (typeof getStreak === 'function') ? getStreak() : 0;
      say('elder', [pick([
        st > 1 ? `${st} days in a row. The village notices, you know.` : 'The best warriors train when no one is watching.',
        'The field slimes are harmless... mostly. Good practice, though.',
        'One day I\'ll tell you about the Goblin King. Not today.',
        'Rest is part of training. Even heroes sleep.'
      ])]);
    }
  }
  function talkBo(e) {
    if (R.q < 1) say('bo', ['Gate\'s shut. Goblins about.', 'Elder Oren\'s orders — nobody goes south. Speak to him first.']);
    else if (R.q === 1) {
      say('bo', ['Oren sent you? Hah.', 'I\'ve seen you training in the square at dawn. Fine.', 'The goblin camps just past the trail. Go get it.'], () => {
        busy = true;
        e.path = [[13, 20], [13, 19]]; e.onArrive = () => { e.dir = 3; busy = false; R.q = 2; save(); renderHud(); sfx('magic', 0.45); hint('The south gate is open'); };
      });
    } else if (R.q === 2) say('bo', ['Well? Go on. I\'ll hold the gate.']);
    else say('bo', [pick(['Never seen a goblin run that fast.', 'Gate\'s yours whenever you need it.', 'You hit like a falling cart. Respect.'])]);
  }
  function talkMira() {
    let reps = 0; try { const d = dateKey(new Date()); workouts.filter((w) => w.date === d && w.unit === 'reps').forEach((w) => (reps += (w.amount || 0) * (w.sets || 1))); } catch (e) {}
    say('mira', [reps ? `${reps} reps already today? Leave some strength for the rest of us.` : pick(['Morning! The bakery smells like cinnamon today.', 'Have you seen Pip\'s dog? He keeps stealing my turnips.', 'The square is so quiet without the goblin\'s cackling. I could get used to it.'])]);
  }
  function talkPip() { say('pip', [pick(['Rex says woof. That means "do ten squats".', 'When I grow up I\'m gonna punch a goblin too!', 'Bo says you\'re strong. Are you stronger than a cart?'])]); }
  function talkDog(e) { e.dir = 2; say('dog', ['Woof!'], () => { buzz('light'); }); }
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  // ------------------------------------------------------------------ COMBAT
  // moves are real exercises; damage = reps × move multiplier × gear power (G.rollDamage handles power & crit)
  const MOVES = [
    { id: 'strike', name: 'Sword Strike', ex: 'Press-ups', mult: 1, aim: '8–15', fx: 'fxSlash', hint: 'Steady damage' },
    { id: 'smash', name: 'Heavy Smash', ex: 'Squats', mult: 1.25, aim: '12–20', fx: 'fxCross', hint: 'Big hit · shakes the ground' },
    { id: 'quick', name: 'Quick Strike', ex: 'Lunges', mult: 0.85, aim: '10–16', fx: 'fxArc', hint: 'Two fast hits · +crit' },
    { id: 'guard', name: 'Iron Guard', ex: 'Plank', timed: true, aim: '20–40s', fx: 'fxRing', hint: 'Block the next attack' }
  ];
  const ENEMIES = {
    goblin: { name: 'Gate Goblin', img: 'goblin', face: 'goblin', hpReps: 34, intents: [['Club Swing', 5], ['Rock Throw', 3], ['Taunt', 0], ['Wild Flail', 7]], bounty: 120, lines: ['Hehehe! Shiny human!', 'Grr! Turnips are MINE!'] },
    slime: { name: 'Field Slime', img: 'slime', face: 'goblin', monster: true, hpReps: 22, intents: [['Bounce', 3], ['Ooze', 2], ['Wobble', 0]], bounty: 50, lines: ['*blorp*'] }
  };
  let B = null, bcv = null, bctx = null;
  function skillLevel(ex) { try { const m = getSkillXPMap(); return getLevelFromXP(m[ex] || 0); } catch (e) { return 1; } }
  function startEncounter(e) {
    if (B) return;
    const def = ENEMIES[e.enemy]; busy = true; hero.path = []; e.path = []; e.frozen = true; face(e, hero.tx, hero.ty); face(hero, e.tx, e.ty);
    sfx('alert', 0.5); buzz('heavy');
    e.excl = 1;
    const go = () => { busy = false; openBattle(e, def); };
    if (e.enemy === 'goblin' && !R.kills.goblin) say('goblin', [def.lines[0]], go); else setTimeout(go, TEST() ? 0 : 500);
  }
  function openBattle(ent, def) {
    const lv = Math.round((skillLevel('Press-ups') + skillLevel('Squats') + skillLevel('Lunges')) / 3);
    const pw = G.stats ? Math.max(0, G.stats().power) : 0;
    // ~25-50 reps to win, gear lowers it a little but never trivialises it
    const reps = Math.min(52, def.hpReps + Math.floor(lv / 4));
    const hp = Math.round(reps * Math.pow(1 + pw / 100, 0.75));
    B = { ent, def, ehp: hp, emax: hp, turn: 'player', intent: null, shield: 0, enrage: 0, logged: {}, turns: 0, fx: [], nums: [], hAnim: null, eAnim: null, t0: performance.now() / 1000, banner: null, phase: 'intro' };
    R.fights++; R.hp = Math.max(R.hp, 8); save();
    pickIntent();
    battleTransition(() => { buildBattle(); music('battle'); B.phase = 'player'; renderBattleUi(); });
  }
  function battleTransition(cb) {
    const f = root.querySelector('#rlFade'); f.classList.add('swirl');
    setTimeout(() => { cb(); setTimeout(() => f.classList.remove('swirl'), 80); }, TEST() ? 0 : 650);
  }
  function pickIntent() { const it = B.def.intents; let i = Math.floor(Math.random() * it.length); if (B.turns === 0 && it[i][1] === 0) i = 0; B.intent = { name: it[i][0], dmg: it[i][1] ? it[i][1] + B.enrage : 0 }; }

  function buildBattle() {
    battleEl = document.createElement('div'); battleEl.className = 'rb'; battleEl.id = 'rlBattle';
    battleEl.innerHTML = `
      <div class="rb-stage"><canvas id="rbCv"></canvas>
        <div class="rb-bar rb-e"><div class="rb-n">${esc(B.def.name)}</div><div class="rb-hp"><i id="rbEHp"></i></div><div class="rb-hpn" id="rbEHpN"></div></div>
        <div class="rb-bar rb-h"><div class="rb-n">${esc(heroName())}</div><div class="rl-hearts" id="rbHearts"></div></div>
        <div class="rb-intent" id="rbIntent"></div>
        <div class="rb-banner" id="rbBanner"></div>
      </div>
      <div class="rb-ui" id="rbUi"></div>
      <div class="rb-reps" id="rbReps"></div>`;
    root.appendChild(battleEl);
    bcv = battleEl.querySelector('#rbCv'); bctx = bcv.getContext('2d');
    sizeBattle();
  }
  function sizeBattle() { const st = battleEl.querySelector('.rb-stage'); const w = st.clientWidth, h = st.clientHeight; bcv.width = Math.round(w * DPR); bcv.height = Math.round(h * DPR); bcv.style.width = w + 'px'; bcv.style.height = h + 'px'; }

  function renderBattleUi() {
    if (!B || !battleEl) return;
    const e = battleEl.querySelector('#rbEHp'); e.style.width = Math.max(0, B.ehp / B.emax * 100) + '%';
    battleEl.querySelector('#rbEHpN').textContent = `${Math.max(0, B.ehp)}/${B.emax}`;
    battleEl.querySelector('#rbHearts').innerHTML = heartsHtml(R.hp, 20) + (B.shield ? `<span class="rb-sh">GUARD ${Math.round(B.shield * 100)}%</span>` : '');
    const it = battleEl.querySelector('#rbIntent');
    it.innerHTML = B.phase === 'player' && B.intent ? (B.intent.dmg ? `<b>${esc(B.def.name.split(' ').pop())}</b> readies <b>${esc(B.intent.name)}</b> <span class="dmg">${B.intent.dmg}</span>` : `<b>${esc(B.def.name.split(' ').pop())}</b> is ${B.intent.name === 'Taunt' ? 'taunting — next attack is stronger' : 'wobbling — no attack coming'}`) : '';
    it.classList.toggle('on', !!it.innerHTML);
    const ui = battleEl.querySelector('#rbUi');
    if (B.phase !== 'player') { ui.innerHTML = B.phase === 'end' ? '' : `<div class="rb-wait">${esc(B.say || '…')}</div>`; return; }
    const rest = B.restUntil && B.restUntil > Date.now() ? Math.ceil((B.restUntil - Date.now()) / 1000) : 0;
    ui.innerHTML = `
      ${rest ? `<div class="rb-rest">Catch your breath · <b id="rbRest">${rest}s</b> <span>(optional)</span></div>` : '<div class="rb-rest ready">Your turn — choose a move</div>'}
      <div class="rb-moves">${MOVES.map((m) => `<button class="rb-mv" data-mv="${m.id}"><span class="mv-n">${m.name}</span><span class="mv-e">${m.ex}${m.timed ? ' · timed' : ''}</span><span class="mv-h">${m.hint}</span></button>`).join('')}</div>
      <div class="rb-row"><button class="rb-sm" data-act="potion" ${R.potions && R.hp < 20 ? '' : 'disabled'}><i class="px px-pot"></i>Potion ×${R.potions}</button><button class="rb-sm ghost" data-act="flee">Retreat</button></div>`;
    ui.querySelectorAll('[data-mv]').forEach((b) => (b.onclick = () => { sfx('menu', 0.3); openReps(MOVES.find((m) => m.id === b.dataset.mv)); }));
    ui.querySelector('[data-act="potion"]').onclick = () => { if (!R.potions) return; R.potions--; R.hp = Math.min(20, R.hp + 8); save(); sfx('power', 0.5); B.nums.push({ x: 0.27, y: 0.48, txt: '+8', c: '#7dff9a', t: 0 }); renderBattleUi(); };
    ui.querySelector('[data-act="flee"]').onclick = () => endBattle('flee');
    if (rest) { clearTimeout(B.restT); B.restT = setTimeout(renderBattleUi, 1000); }
  }

  // ---------- the rep counter: tap +1 for every rep, confirm whenever you're done ----------
  let RC = null;
  function openReps(mv) {
    RC = { mv, n: 0, sec: 0, running: false, started: 0, acc: 0 };
    const el = battleEl.querySelector('#rbReps');
    el.innerHTML = `<div class="rc-box">
      <div class="rc-top"><div><div class="rc-mv">${mv.name}</div><div class="rc-ex">${mv.ex} · aim ${mv.aim}</div></div><button class="rc-x" data-rc="cancel">Back</button></div>
      ${mv.timed ? `<div class="rc-num" id="rcNum">0:00</div><div class="rc-sub" id="rcSub">Hold your plank — the longer, the stronger your guard</div>
        <div class="rc-row"><button class="rc-b" data-rc="m5">−5s</button><button class="rc-big" data-rc="toggle" id="rcTog">Start</button><button class="rc-b" data-rc="p5">+5s</button></div>`
      : `<div class="rc-num" id="rcNum">0</div><div class="rc-sub" id="rcSub">Tap the pad for every rep</div><button class="rc-pad" data-rc="plus" id="rcPad">+1</button>
        <div class="rc-row"><button class="rc-b" data-rc="undo">Undo</button><button class="rc-b" data-rc="reset">Reset</button><button class="rc-b" data-rc="type">Type</button></div>`}
      <button class="rc-go" data-rc="go" id="rcGo" disabled>${mv.timed ? 'Raise guard' : 'Unleash'}</button></div>`;
    el.classList.add('on');
    el.querySelectorAll('[data-rc]').forEach((b) => b.addEventListener('pointerdown', (ev) => { ev.preventDefault(); repAct(b.dataset.rc, b); }));
    updReps();
  }
  function repAct(a, b) {
    if (!RC) return;
    const mv = RC.mv;
    if (a === 'plus') { RC.n++; blip(500 + Math.min(RC.n, 30) * 18); buzz('light'); b.classList.remove('pop'); b.offsetWidth; b.classList.add('pop'); }
    else if (a === 'undo') RC.n = Math.max(0, RC.n - 1);
    else if (a === 'reset') RC.n = 0;
    else if (a === 'type') { const v = prompt(`How many ${mv.ex.toLowerCase()}?`, RC.n || ''); const n = Math.floor(Number(v)); if (n > 0 && n < 500) RC.n = n; }
    else if (a === 'toggle') { if (RC.running) { RC.acc += (Date.now() - RC.started) / 1000; RC.running = false; } else { RC.started = Date.now(); RC.running = true; sfx('menu', 0.3); tickTimer(); } }
    else if (a === 'm5') RC.acc = Math.max(0, RC.acc - 5);
    else if (a === 'p5') RC.acc += 5;
    else if (a === 'cancel') { if (RC.running) RC.acc += (Date.now() - RC.started) / 1000; closeReps(); return; }
    else if (a === 'go') {
      if (RC.running) { RC.acc += (Date.now() - RC.started) / 1000; RC.running = false; }
      const amt = mv.timed ? Math.round(RC.acc) : RC.n; if (amt < 1) return;
      closeReps(); playerMove(mv, amt); return;
    }
    updReps();
  }
  function tickTimer() { if (!RC || !RC.running) return; updReps(); setTimeout(tickTimer, 250); }
  function updReps() {
    if (!RC) return; const el = battleEl.querySelector('#rbReps');
    const sec = RC.acc + (RC.running ? (Date.now() - RC.started) / 1000 : 0);
    const n = el.querySelector('#rcNum'); const go = el.querySelector('#rcGo');
    if (RC.mv.timed) {
      n.textContent = `${Math.floor(sec / 60)}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
      el.querySelector('#rcTog').textContent = RC.running ? 'Pause' : sec ? 'Resume' : 'Start';
      el.querySelector('#rcSub').textContent = sec ? `Guard ${Math.min(100, Math.round(sec / 30 * 100))}% · counter ${Math.round(sec * 0.25)} dmg` : 'Hold your plank — the longer, the stronger your guard';
      go.disabled = sec < 1;
    } else {
      n.textContent = RC.n; go.disabled = RC.n < 1;
      const est = Math.round(RC.n * RC.mv.mult * (1 + Math.max(0, G.stats ? G.stats().power : 0) / 100));
      el.querySelector('#rcSub').textContent = RC.n ? `≈ ${est} damage${RC.n >= 20 ? ' · huge!' : ''}` : 'Tap the pad for every rep';
      go.textContent = RC.n ? `Unleash ${RC.n}` : 'Unleash';
    }
  }
  function closeReps() { RC = null; const el = battleEl && battleEl.querySelector('#rbReps'); if (el) { el.classList.remove('on'); el.innerHTML = ''; } }
  G._rpgReps = { set(n) { if (RC) { if (RC.mv.timed) RC.acc = n; else RC.n = n; updReps(); } }, go() { repAct('go'); } };

  function log(ex, amt) { B.logged[ex] = (B.logged[ex] || 0) + amt; R.inBattle = { label: B.def.name, logged: B.logged }; save(true); }
  function playerMove(mv, amt) {
    B.phase = 'anim'; B.turns++; B.say = mv.timed ? `Iron Guard! You held for ${amt}s` : `${mv.name}! ${amt} ${mv.ex.toLowerCase()}`; renderBattleUi();
    if (mv.timed) {
      log('Plank', amt);
      B.shield = Math.min(1, amt / 30);
      const counter = Math.round(amt * 0.25 * (1 + Math.max(0, G.stats ? G.stats().power : 0) / 100));
      B.hAnim = { kind: 'guard', t: 0 }; sfx('magic', 0.45); buzz('medium');
      B.fx.push({ img: 'fxRing', x: 0.27, y: 0.6, t: 0, n: 5, sc: 1.4 });
      setTimeout(() => { if (counter > 0) damageEnemy(counter, false, 'fxSpark'); setTimeout(enemyTurn, 650); }, 700);
      return;
    }
    log(mv.ex, amt);
    const hits = mv.id === 'quick' ? 2 : 1;
    let total = 0, crit = false;
    const rolls = [];
    for (let i = 0; i < hits; i++) {
      const r = G.rollDamage ? G.rollDamage(Math.max(1, Math.round(amt * mv.mult / hits))) : { dmg: Math.round(amt * mv.mult / hits), crit: false };
      if (mv.id === 'quick' && !r.crit && Math.random() < 0.15) { r.dmg *= 2; r.crit = true; }
      rolls.push(r); total += r.dmg; crit = crit || r.crit;
    }
    B.hAnim = { kind: 'attack', t: 0, mv };
    sfx('sword', 0.55, mv.id === 'smash' ? 0.8 : 1.1); buzz(mv.id === 'smash' ? 'heavy' : 'medium');
    rolls.forEach((r, i) => setTimeout(() => damageEnemy(r.dmg, r.crit, mv.fx, mv.id === 'smash'), 280 + i * 260));
    setTimeout(() => { if (B && B.ehp > 0) enemyTurn(); }, 280 + hits * 260 + 700);
  }
  function damageEnemy(d, crit, fx, big) {
    if (!B) return;
    B.ehp -= d; B.eFlash = 0.18; B.eKnock = 1;
    B.fx.push({ img: fx, x: 0.72, y: 0.52, t: 0, n: fx === 'fxSlash' || fx === 'fxCross' ? 4 : 5, sc: big ? 2 : 1.5 });
    B.nums.push({ x: 0.72, y: 0.36, txt: (crit ? 'CRIT ' : '') + d, c: crit ? '#ffd23f' : '#fff', t: 0, big: crit || big });
    B.shake = big ? 9 : crit ? 7 : 4;
    sfx(pick(['hit1', 'hit2', 'hit3']), 0.5, crit ? 0.9 : 1.05);
    renderBattleUi();
    if (B.ehp <= 0) { B.phase = 'end'; setTimeout(victory, 600); }
  }
  function enemyTurn() {
    if (!B || B.phase === 'end') return;
    const it = B.intent;
    B.phase = 'enemy'; B.say = it.dmg ? `${B.def.name.split(' ').pop()} uses ${it.name}!` : it.name === 'Taunt' ? `${B.def.name.split(' ').pop()} taunts you…` : `${B.def.name.split(' ').pop()} wobbles…`; renderBattleUi();
    if (!it.dmg) {
      if (it.name === 'Taunt') { B.enrage = 2; B.nums.push({ x: 0.72, y: 0.3, txt: 'ENRAGED', c: '#ff7a5a', t: 0 }); sfx('alert', 0.35, 1.3); }
      else B.nums.push({ x: 0.72, y: 0.3, txt: '...', c: '#aaa', t: 0 });
      setTimeout(nextTurn, 900); return;
    }
    B.eAnim = { t: 0 };
    setTimeout(() => {
      if (!B) return;
      let d = it.dmg; const blocked = Math.round(d * B.shield); d -= blocked;
      B.fx.push({ img: B.shield > 0.5 ? 'fxRing' : 'fxClaw', x: 0.28, y: 0.55, t: 0, n: 5, sc: 1.5 });
      if (d > 0) { R.hp = Math.max(0, R.hp - d); B.hFlash = 0.2; B.shake = 6; sfx('hit9', 0.5, 0.8); buzz('heavy'); B.nums.push({ x: 0.28, y: 0.38, txt: '-' + d, c: '#ff6b6b', t: 0, big: d >= 6 }); }
      if (blocked) B.nums.push({ x: 0.28, y: 0.3, txt: `BLOCKED ${blocked}`, c: '#8fd3ff', t: 0 });
      if (it.name === 'Taunt' || B.enrage && it.dmg) B.enrage = 0;
      B.shield = 0; save(); renderBattleUi();
      if (R.hp <= 0) { B.phase = 'end'; setTimeout(defeat, 900); return; }
      setTimeout(nextTurn, 700);
    }, 450);
  }
  function nextTurn() { if (!B) return; pickIntent(); B.phase = 'player'; B.restUntil = Date.now() + 20000; renderBattleUi(); }

  // Battle sets become ordinary workout entries (one per exercise) — this is where XP, coins, quests & streaks come from.
  // They're staged in the save first and written to the log when you leave the battle screen, so app pop-ups
  // (level-ups, drops) appear back in the world instead of covering the spoils, and nothing is lost if the app closes.
  function stageWorkouts(label) {
    const entries = [];
    Object.entries(B.logged).forEach(([ex, amt]) => {
      if (!amt) return;
      const unit = ex === 'Plank' ? 'minutes' : 'reps';
      const amount = ex === 'Plank' ? Math.round(amt / 60 * 100) / 100 : amt;
      entries.push({ id: Date.now() + Math.floor(Math.random() * 1000) + entries.length, exercise: ex, amount, sets: 1, unit, date: dateKey(new Date()), time: new Date().toTimeString().slice(0, 5), isPR: false, feeling: '💪', notes: `⚔️ Realm: ${label}`, weight: null, category: null, realm: true });
    });
    B.logged = {}; R.inBattle = null;
    R.pending = (R.pending || []).concat(entries); save(true);
    return entries.map((w) => ({ ex: w.exercise, amt: w.unit === 'minutes' ? `${Math.round(w.amount * 60)}s` : `${w.amount}`, xp: (() => { try { return Math.round(xpForWorkout(w)); } catch (e) { return 0; } })() }));
  }
  function flushWorkouts() {
    if (R.inBattle && !B) { // the app was closed mid-fight: those sets still count
      const ib = R.inBattle; R.inBattle = null;
      Object.entries(ib.logged || {}).forEach(([ex, amt], i) => { if (amt > 0) (R.pending = R.pending || []).push({ id: Date.now() + i, exercise: ex, amount: ex === 'Plank' ? Math.round(amt / 60 * 100) / 100 : amt, sets: 1, unit: ex === 'Plank' ? 'minutes' : 'reps', date: dateKey(new Date()), time: new Date().toTimeString().slice(0, 5), isPR: false, feeling: '💪', notes: `⚔️ Realm: ${ib.label} (unfinished)`, weight: null, category: null, realm: true }); });
    }
    if (!R.pending || !R.pending.length || typeof workouts === 'undefined') return;
    const have = new Set(workouts.map((w) => w.id));
    R.pending.forEach((w) => { if (!have.has(w.id)) workouts.push(w); });
    R.pending = []; save(true);
    try { persist(); } catch (e) { console.warn(e); }
    try { checkQuestProgress && checkQuestProgress(); } catch (e) {}
  }
  G.rpgFlush = flushWorkouts;

  function victory() {
    if (!B) return;
    B.dying = 0.001; sfx('kill', 0.55); buzz('success'); stopMusic();
    const ent = B.ent, def = B.def; const first = ent.enemy === 'goblin' && !R.kills.goblin;
    R.kills[ent.enemy] = (R.kills[ent.enemy] || 0) + 1; R.wins++;
    if (ent.enemy === 'goblin' && R.q === 2) R.q = 3;
    if (ent.enemy === 'slime') R.slimeAt = Date.now() + 3 * 3600 * 1000;
    save(true);
    const xp = stageWorkouts(def.name);
    const coinsBefore = G.state ? G.state().coins : 0;
    G.reward && G.reward({ coins: def.bounty }, { quiet: true });
    const gained = (G.state ? G.state().coins : 0) - coinsBefore;
    let drop = null;
    if (first) drop = 'rpg_goblin_slayer';
    else if (Math.random() < 0.35 && G.rollDrop) drop = G.rollDrop([50, 32, 13, 4, 1, 0, 0, 0]).id;
    setTimeout(() => {
      if (!B) return;
      sfx('win', 0.55);
      banner('VICTORY');
      const ui = battleEl.querySelector('#rbUi');
      ui.innerHTML = `<div class="rv">
        <div class="rv-h">Spoils</div>
        <div class="rv-xp">${xp.map((x) => `<div class="rv-row"><span>${esc(x.ex)} <em>${x.amt}</em></span><b>+${x.xp} XP</b></div>`).join('') || '<div class="rv-row"><span>No sets logged</span></div>'}</div>
        <div class="rv-row gold"><span><i class="px px-coin"></i> Bounty</span><b>+${gained || def.bounty}</b></div>
        ${drop ? `<button class="rv-chest" id="rvChest"><i class="px-chest"></i><span>Something dropped! Tap to open</span></button>` : ''}
        <button class="rc-go" id="rvDone" ${drop ? 'style="display:none"' : ''}>Continue</button></div>`;
      const ch = ui.querySelector('#rvChest');
      if (ch) ch.onclick = () => openChest(drop, ch, ui);
      ui.querySelector('#rvDone').onclick = () => endBattle('win');
    }, 900);
  }
  function openChest(id, ch, ui) {
    const it = G.item && G.item(id); if (!it) { ui.querySelector('#rvDone').style.display = ''; ch.remove(); return; }
    ch.classList.add('open'); sfx('gold', 0.5); buzz('success');
    const res = G.addItem ? G.addItem(id) : null;
    const tier = G.TIERS ? G.TIERS[it.tier] : { name: '', color: '#fff' };
    const sprite = id === 'rpg_goblin_slayer' ? '<i class="px-katana"></i>' : `<span class="rv-emo">${it.icon}</span>`;
    setTimeout(() => {
      ch.outerHTML = `<div class="rv-item" style="--tc:${tier.color}"><div class="rv-rays"></div>${sprite}<div class="rv-iname">${esc(it.name)}</div><div class="rv-itier">${tier.name}${it.slot ? ' ' + it.slot : ''}</div><div class="rv-ist">${G.statLines ? G.statLines(it, res && res.inst) : ''}</div>
        ${it.type === 'gear' && res && res.inst ? '<button class="rc-go" id="rvEquip">Equip</button>' : ''}</div>`;
      const eq = ui.querySelector('#rvEquip');
      if (eq) eq.onclick = () => { const S0 = G.state(); S0.equip[it.slot] = res.inst.uid; G.saveLoot(); sfx('power', 0.5); eq.textContent = 'Equipped'; eq.disabled = true; R.weapon = id; save(); try { render(); } catch (e) {} };
      ui.querySelector('#rvDone').style.display = '';
      G.celebrate && G.celebrate(it.tier, ui.querySelector('.rv-item'));
    }, 550);
  }
  function defeat() {
    if (!B) return;
    stopMusic(); sfx('over', 0.5); banner('KNOCKED DOWN', true);
    stageWorkouts(B.def.name + ' (knocked down)');
    const ui = battleEl.querySelector('#rbUi');
    ui.innerHTML = `<div class="rv"><div class="rv-h">You'll get it next time</div><div class="rv-note">Every rep you did still counts — it's in your log. Elder Oren patched you up.</div><button class="rc-go" id="rvDone">Wake up</button></div>`;
    ui.querySelector('#rvDone').onclick = () => endBattle('lose');
  }
  function endBattle(how) {
    if (!B) return;
    if (how === 'flee') stageWorkouts(B.def.name + ' (retreated)');
    const ent = B.ent; const wasB = B;
    clearTimeout(B.restT); closeReps();
    fade(false, () => {
      if (battleEl) battleEl.remove(); battleEl = null; bcv = null; B = null;
      if (how === 'win') { const i = ents.indexOf(ent); if (i >= 0) ents.splice(i, 1); for (let k = 0; k < 8; k++) parts.push({ x: ent.x + 8, y: ent.y + 8, vx: (Math.random() - 0.5) * 30, vy: (Math.random() - 0.5) * 30, life: 0.8, max: 0.8, c: '230,230,240', r: 2, puff: true }); }
      else { ent.frozen = false; ent.aggro = false; ent.path = []; ent.tx = ent.home[0]; ent.ty = ent.home[1]; ent.x = ent.tx * T; ent.y = ent.ty * T; }
      if (how === 'lose') { R.hp = 20; hero.tx = 15; hero.ty = 6; hero.x = 15 * T; hero.y = 6 * T; hero.path = []; hero.dir = 1; }
      if (how === 'flee') { hero.path = []; const p = findPath(hero.tx, hero.ty, hero.tx, Math.max(21, hero.ty - 2), hero); if (p) hero.path = p; }
      R.x = hero.tx; R.y = hero.ty; save(true); snapCam(); renderHud();
      music('village');
      setTimeout(flushWorkouts, 450);
      if (how === 'win' && R.q === 3) setTimeout(() => hint('Quest updated · Return to Elder Oren'), 500);
      if (how === 'lose') setTimeout(() => say('elder', ['Easy now. You took a beating.', 'Rest, then try again. The goblin\'s not going anywhere.']), 500);
      try { if (typeof render === 'function') render(); } catch (e) {}
    });
    void wasB;
  }
  function banner(txt, bad) { const b = battleEl && battleEl.querySelector('#rbBanner'); if (!b) return; b.textContent = txt; b.className = 'rb-banner on' + (bad ? ' bad' : ''); }

  // ---------- battle rendering ----------
  function battleFrame(dt, t) {
    if (!bcv) return;
    const c = bctx, w = bcv.width, h = bcv.height;
    const s = Math.max(2, Math.round(DPR * Math.min(3, w / DPR / 130)));
    c.setTransform(1, 0, 0, 1, 0, 0); c.imageSmoothingEnabled = false;
    let shx = 0, shy = 0; if (B.shake > 0) { B.shake -= dt * 30; shx = (Math.random() - 0.5) * B.shake * DPR; shy = (Math.random() - 0.5) * B.shake * DPR; }
    c.translate(Math.round(shx), Math.round(shy));
    if (!B.bg || B.bg.width !== w || B.bg.height !== h) B.bg = arena(w, h, s);
    c.drawImage(B.bg, 0, 0);
    const big = Math.max(3, Math.round(Math.min(w * 0.2, h * 0.42) / 16)); // fighters drawn larger than the overworld
    const gy = h * 0.6;
    // hero
    let hx = w * 0.27, hy = gy;
    let hFrame = Math.floor(t * 2) % 2 ? 0 : 0, hRow = 0;
    if (B.hAnim) {
      B.hAnim.t += dt; const a = B.hAnim.t;
      if (B.hAnim.kind === 'attack') { const k = a < 0.25 ? a / 0.25 : a < 0.55 ? 1 : Math.max(0, 1 - (a - 0.55) / 0.3); hx += (w * 0.3) * k; hRow = a > 0.2 && a < 0.6 ? 4 : Math.floor(a * 10) % 4; if (a > 0.9) B.hAnim = null; }
      else if (B.hAnim.kind === 'guard') { hRow = 4; if (a > 1.2) B.hAnim = null; }
    }
    const hb = Math.sin(t * 3) * s * 0.5;
    shadow(c, hx, hy, big);
    if (B.hFlash > 0) { B.hFlash -= dt; c.globalAlpha = 0.5 + Math.sin(t * 60) * 0.5; }
    c.drawImage(IMG.hero, 3 * 16, hRow * 16, 16, 16, Math.round(hx - big * 8), Math.round(hy - big * 16 + hb), big * 16, big * 16);
    c.globalAlpha = 1;
    // weapon in hand
    const wpn = equippedSlayer() ? IMG.katana : IMG.sword;
    if (wpn && wpn.complete) { c.save(); c.translate(Math.round(hx + big * 6), Math.round(hy - big * 7 + hb)); c.rotate(B.hAnim && B.hAnim.kind === 'attack' && B.hAnim.t > 0.2 && B.hAnim.t < 0.6 ? 1.9 : 0.5); c.drawImage(wpn, -wpn.width * big / 2, -wpn.height * big, wpn.width * big, wpn.height * big); c.restore(); }
    // enemy
    const def = B.def; const eim = IMG[def.img];
    let ex = w * 0.72, ey = gy;
    if (B.eKnock > 0) { B.eKnock = Math.max(0, B.eKnock - dt * 4); ex += B.eKnock * s * 6; }
    let eRow = def.monster ? Math.floor(t * 6) % 4 : 0;
    if (B.eAnim) { B.eAnim.t += dt; const a = B.eAnim.t; const k = a < 0.3 ? a / 0.3 : Math.max(0, 1 - (a - 0.3) / 0.3); ex -= w * 0.3 * k; if (!def.monster) eRow = a > 0.2 && a < 0.45 ? 4 : Math.floor(a * 12) % 4; if (a > 0.7) B.eAnim = null; }
    if (!def.monster && B.phase === 'player' && !B.eAnim) eRow = Math.floor(t * 3) % 2 ? 0 : 2;
    let ea = 1;
    if (B.dying) { B.dying += dt; ea = Math.max(0, 1 - B.dying / 0.7); if (B.dying > 0.1 && !B.smoked) { B.smoked = 1; B.fx.push({ img: 'fxSmoke', x: 0.72, y: 0.55, t: 0, n: 6, sc: 2.2 }); } }
    shadow(c, ex, ey, big * ea);
    c.globalAlpha = ea;
    if (B.eFlash > 0) { B.eFlash -= dt; c.filter = 'brightness(3)'; }
    const eb = def.monster ? 0 : Math.sin(t * 3 + 1) * s * 0.5;
    c.drawImage(eim, 2 * 16, eRow * 16, 16, 16, Math.round(ex - big * 8), Math.round(ey - big * 16 + eb), big * 16, big * 16);
    c.filter = 'none'; c.globalAlpha = 1;
    // fx sprites
    for (let i = B.fx.length - 1; i >= 0; i--) {
      const f = B.fx[i]; f.t += dt; const fr = Math.floor(f.t / 0.07); if (fr >= f.n) { B.fx.splice(i, 1); continue; }
      const im = IMG[f.img]; if (!im) continue; const sz = 32 * big * f.sc / 2.4;
      c.drawImage(im, fr * 32, 0, 32, 32, Math.round(w * f.x - sz / 2), Math.round(h * f.y - sz / 2 - big * 4), sz, sz);
    }
    // damage numbers
    c.textAlign = 'center';
    for (let i = B.nums.length - 1; i >= 0; i--) {
      const n = B.nums[i]; n.t += dt; if (n.t > 1.1) { B.nums.splice(i, 1); continue; }
      const sc = n.big ? 1.5 : 1; const pop = n.t < 0.12 ? 1.6 - n.t * 5 : 1;
      c.font = `${Math.round(big * 4 * sc * pop)}px Silkscreen, monospace`;
      const y = h * n.y - n.t * big * 8 - big * 4;
      c.globalAlpha = Math.min(1, (1.1 - n.t) * 3);
      c.fillStyle = '#120a1c'; c.fillText(n.txt, w * n.x + big / 2, y + big / 2); c.fillStyle = n.c; c.fillText(n.txt, w * n.x, y);
      c.globalAlpha = 1;
    }
    c.setTransform(1, 0, 0, 1, 0, 0);
    const vg = c.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, w * 0.8); vg.addColorStop(0, 'rgba(8,4,16,0)'); vg.addColorStop(1, 'rgba(8,4,16,.6)'); c.fillStyle = vg; c.fillRect(0, 0, w, h);
  }
  // battle backdrop: the south field, framed by the forest, pre-rendered once per size
  function arena(w, h, s) {
    const o = document.createElement('canvas'); o.width = w; o.height = h; const c = o.getContext('2d'); c.imageSmoothingEnabled = false;
    const ts = s * T;
    for (let y = 0; y * ts < h; y++) for (let x = 0; x * ts < w; x++) { const k = smooth(x + 40, y + 9) > 0.62 ? TILE.g1 : TILE.g0; c.drawImage(IMG.ts, k[0] * T, k[1] * T, T, T, x * ts, y * ts, ts, ts); }
    const pf = (n, x, y) => { const p = PF[n]; c.drawImage(IMG.ts, p[0] * T, p[1] * T, p[2] * T, p[3] * T, Math.round(x), Math.round(y), p[2] * ts, p[3] * ts); };
    for (let x = -1, i = 0; x * ts < w + ts; x += 2, i++) pf(i % 3 ? 'pine' : 'treeA', x * ts + (i % 2) * ts * 0.5, -ts * 0.9 + (i % 2) * ts * 0.35);
    for (let x = 0, i = 0; x * ts < w + ts; x += 2, i++) pf(i % 2 ? 'treeB' : 'pine', x * ts - ts * 0.6, h - ts * 1.1 + (i % 2) * ts * 0.3);
    [['flowers', 0.12, 0.42], ['tuft', 0.45, 0.4], ['tuft2', 0.86, 0.45], ['dots', 0.62, 0.78], ['stone', 0.08, 0.74], ['twigs', 0.9, 0.76], ['clover', 0.33, 0.8]].forEach(([n, fx, fy]) => pf(n, w * fx, h * fy));
    pf('rock', w - ts * 2.2, h * 0.3); pf('stump', ts * 0.3, h * 0.33);
    const g = c.createLinearGradient(0, 0, 0, h); g.addColorStop(0, 'rgba(10,6,24,.6)'); g.addColorStop(0.35, 'rgba(10,6,24,.08)'); g.addColorStop(0.75, 'rgba(10,6,24,.05)'); g.addColorStop(1, 'rgba(10,6,24,.55)');
    c.fillStyle = g; c.fillRect(0, 0, w, h);
    return o;
  }
  function shadow(c, x, y, big) { c.fillStyle = 'rgba(8,4,16,.4)'; c.beginPath(); c.ellipse(x, y - big, big * 6, big * 2, 0, 0, 7); c.fill(); }
  function equippedSlayer() { try { const S0 = G.state(); const inst = S0.items.find((i) => i.uid === S0.equip.weapon); return inst && inst.id === 'rpg_goblin_slayer'; } catch (e) { return false; } }

  // ------------------------------------------------------------------ keep the HUD fresh when the rest of the app changes
  G.on && G.on('render', () => { if (open) renderHud(); });
  setTimeout(() => { if (!B) flushWorkouts(); }, 1500);
  G._rpgDebug = { ents: () => ents, hero: () => hero, battle: () => B, startFight(id) { const e = ents.find((x) => x.id === id); if (e) startEncounter(e); }, tp(x, y) { hero.tx = x; hero.ty = y; hero.x = x * T; hero.y = y * T; hero.path = []; snapCam(); }, walk(x, y) { const p = findPath(hero.tx, hero.ty, x, y, hero); if (p) hero.path = p; return !!p; }, talk(id) { const e = ents.find((x) => x.id === id); if (e) goTo(e); } };
})();
