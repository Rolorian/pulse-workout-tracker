/*! pixelfx — curated subset bundled for Pulse Realm.
 * Source: https://github.com/patch-gg/pixelfx @ a84159688af3ca37a4be05a0d422b94451b2e24e
 * MIT License — Copyright (c) 2026 Patch, Copyright (c) 2026 Hugo Duprez. See vendor/pixelfx/LICENSE and NOTICE.md.
 * Pure drawing code: no network, storage, cookies, DOM or eval. It only fills pixel buffers that rpg.js draws.
 */
(() => {
  var __defProp = Object.defineProperty;
  var __returnValue = (v) => v;
  function __exportSetter(name, newValue) {
    this[name] = __returnValue.bind(null, newValue);
  }
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: __exportSetter.bind(all, name)
      });
  };

  // ../vendor_src/pixelfx/src/fx/melee/sword-slash.js
  var exports_sword_slash = {};
  __export(exports_sword_slash, {
    act: () => act,
    create: () => create,
    meta: () => meta
  });

  // ../vendor_src/pixelfx/src/fx/melee/hammer-smash.js
  var exports_hammer_smash = {};
  __export(exports_hammer_smash, {
    act: () => act2,
    create: () => create2,
    meta: () => meta2
  });

  // ../vendor_src/pixelfx/src/fx/melee/dagger-flurry.js
  var exports_dagger_flurry = {};
  __export(exports_dagger_flurry, {
    act: () => act3,
    create: () => create3,
    meta: () => meta3
  });

  // ../vendor_src/pixelfx/src/fx/melee/claw-swipe.js
  var exports_claw_swipe = {};
  __export(exports_claw_swipe, {
    act: () => act4,
    create: () => create4,
    meta: () => meta4
  });

  // ../vendor_src/pixelfx/src/fx/impacts/hit-spark.js
  var exports_hit_spark = {};
  __export(exports_hit_spark, {
    create: () => create5,
    meta: () => meta5
  });

  // ../vendor_src/pixelfx/src/fx/impacts/crit-hit.js
  var exports_crit_hit = {};
  __export(exports_crit_hit, {
    create: () => create6,
    meta: () => meta6
  });

  // ../vendor_src/pixelfx/src/fx/impacts/blunt-hit.js
  var exports_blunt_hit = {};
  __export(exports_blunt_hit, {
    create: () => create7,
    meta: () => meta7
  });

  // ../vendor_src/pixelfx/src/fx/impacts/shield-block.js
  var exports_shield_block = {};
  __export(exports_shield_block, {
    act: () => act5,
    create: () => create8,
    meta: () => meta8
  });

  // ../vendor_src/pixelfx/src/fx/impacts/ground-slam.js
  var exports_ground_slam = {};
  __export(exports_ground_slam, {
    create: () => create9,
    meta: () => meta9
  });

  // ../vendor_src/pixelfx/src/fx/status/burning.js
  var exports_burning = {};
  __export(exports_burning, {
    act: () => act6,
    actorAlpha: () => actorAlpha,
    draw: () => draw,
    drawBack: () => drawBack,
    meta: () => meta10
  });

  // ../vendor_src/pixelfx/src/fx/status/poisoned.js
  var exports_poisoned = {};
  __export(exports_poisoned, {
    act: () => act7,
    actorAlpha: () => actorAlpha2,
    draw: () => draw2,
    drawBack: () => drawBack2,
    meta: () => meta11
  });

  // ../vendor_src/pixelfx/src/fx/status/frozen.js
  var exports_frozen = {};
  __export(exports_frozen, {
    act: () => act8,
    actorAlpha: () => actorAlpha3,
    draw: () => draw3,
    drawBack: () => drawBack3,
    meta: () => meta12
  });

  // ../vendor_src/pixelfx/src/fx/spawn/poof.js
  var exports_poof = {};
  __export(exports_poof, {
    create: () => create10,
    meta: () => meta13
  });

  // ../vendor_src/pixelfx/src/fx/spawn/shatter-death.js
  var exports_shatter_death = {};
  __export(exports_shatter_death, {
    act: () => act9,
    actorAlpha: () => actorAlpha4,
    create: () => create11,
    meta: () => meta14
  });

  // ../vendor_src/pixelfx/src/fx/spawn/soul-rise.js
  var exports_soul_rise = {};
  __export(exports_soul_rise, {
    act: () => act10,
    actorAlpha: () => actorAlpha5,
    create: () => create12,
    meta: () => meta15
  });

  // ../vendor_src/pixelfx/src/fx/pickups/collect-burst.js
  var exports_collect_burst = {};
  __export(exports_collect_burst, {
    create: () => create13,
    meta: () => meta16
  });

  // ../vendor_src/pixelfx/src/fx/weather/rain.js
  var exports_rain = {};
  __export(exports_rain, {
    draw: () => draw4,
    drawBack: () => drawBack4,
    meta: () => meta17
  });

  // ../vendor_src/pixelfx/src/fx/weather/snow.js
  var exports_snow = {};
  __export(exports_snow, {
    draw: () => draw5,
    drawBack: () => drawBack5,
    meta: () => meta18
  });

  // ../vendor_src/pixelfx/src/fx/holy/heal.js
  var exports_heal = {};
  __export(exports_heal, {
    act: () => act11,
    create: () => create14,
    meta: () => meta19
  });

  // ../vendor_src/pixelfx/src/fx/arcane/spell-charge.js
  var exports_spell_charge = {};
  __export(exports_spell_charge, {
    act: () => act12,
    draw: () => draw6,
    meta: () => meta20
  });

  // ../vendor_src/pixelfx/src/fx/shadow/dark-explosion.js
  var exports_dark_explosion = {};
  __export(exports_dark_explosion, {
    create: () => create15,
    meta: () => meta21
  });

  // ../vendor_src/pixelfx/src/fx/ice/frost-nova.js
  var exports_frost_nova = {};
  __export(exports_frost_nova, {
    act: () => act13,
    create: () => create16,
    meta: () => meta22
  });

  // ../vendor_src/pixelfx/src/fx/nature/acid-splash.js
  var exports_acid_splash = {};
  __export(exports_acid_splash, {
    create: () => create17,
    meta: () => meta23
  });

  // ../vendor_src/pixelfx/src/fx/fire/fireball.js
  var exports_fireball = {};
  __export(exports_fireball, {
    draw: () => draw7,
    meta: () => meta24
  });

  // ../vendor_src/pixelfx/src/fx/ui/confetti.js
  var exports_confetti = {};
  __export(exports_confetti, {
    create: () => create18,
    meta: () => meta25
  });

  // ../vendor_src/pixelfx/src/fx/ui/level-up.js
  var exports_level_up = {};
  __export(exports_level_up, {
    act: () => act14,
    create: () => create19,
    meta: () => meta26
  });

  // ../vendor_src/pixelfx/src/fx/ui/achievement.js
  var exports_achievement = {};
  __export(exports_achievement, {
    create: () => create20,
    meta: () => meta27
  });

  // ../vendor_src/pixelfx/src/fx/ui/quest-complete.js
  var exports_quest_complete = {};
  __export(exports_quest_complete, {
    create: () => create21,
    meta: () => meta28
  });

  // ../vendor_src/pixelfx/src/fx/explosions/firework-burst.js
  var exports_firework_burst = {};
  __export(exports_firework_burst, {
    create: () => create22,
    meta: () => meta29
  });

  // ../vendor_src/pixelfx/src/core/math.js
  var TAU = Math.PI * 2;
  var clamp = (x, a = 0, b = 1) => x < a ? a : x > b ? b : x;
  var lerp = (a, b, t) => a + (b - a) * t;
  var fract = (x) => x - Math.floor(x);
  var wrap = (x, m) => (x % m + m) % m;
  var seg = (t, t0, t1) => clamp((t - t0) / (t1 - t0));
  var smooth = (e0, e1, x) => {
    const t = seg(x, e0, e1);
    return t * t * (3 - 2 * t);
  };
  var ease = {
    linear: (t) => t,
    inQuad: (t) => t * t,
    outQuad: (t) => 1 - (1 - t) * (1 - t),
    inOutQuad: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
    inCubic: (t) => t * t * t,
    outCubic: (t) => 1 - Math.pow(1 - t, 3),
    inOutCubic: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
    inQuart: (t) => t * t * t * t,
    outQuart: (t) => 1 - Math.pow(1 - t, 4),
    inExpo: (t) => t <= 0 ? 0 : Math.pow(2, 10 * t - 10),
    outExpo: (t) => t >= 1 ? 1 : 1 - Math.pow(2, -10 * t),
    inSine: (t) => 1 - Math.cos(t * Math.PI / 2),
    outSine: (t) => Math.sin(t * Math.PI / 2),
    inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
    inBack: (t, s = 1.70158) => t <= 0 ? 0 : t >= 1 ? 1 : (s + 1) * t * t * t - s * t * t,
    outBack: (t, s = 1.70158) => t <= 0 ? 0 : t >= 1 ? 1 : 1 + (s + 1) * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2),
    outElastic: (t) => t <= 0 ? 0 : t >= 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * (2 * Math.PI / 3)) + 1,
    outBounce: (t) => {
      const n = 7.5625, d = 2.75;
      if (t < 1 / d)
        return n * t * t;
      if (t < 2 / d)
        return n * (t -= 1.5 / d) * t + 0.75;
      if (t < 2.5 / d)
        return n * (t -= 2.25 / d) * t + 0.9375;
      return n * (t -= 2.625 / d) * t + 0.984375;
    }
  };
  function hash(...ns) {
    let h = 2654435769;
    for (const n of ns) {
      h = Math.imul(h ^ (n | 0), 2246822507);
      h ^= h >>> 13;
      h = Math.imul(h, 3266489909);
      h ^= h >>> 16;
    }
    return h >>> 0;
  }
  var rand = (...ns) => hash(...ns) / 4294967296;

  class Rng {
    constructor(seed = 1) {
      this.s = seed >>> 0 || 1;
    }
    next() {
      let t = this.s = this.s + 1831565813 >>> 0;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
    range(a, b) {
      return a + (b - a) * this.next();
    }
    int(a, b) {
      return Math.floor(this.range(a, b + 1));
    }
    chance(p) {
      return this.next() < p;
    }
    sign() {
      return this.next() < 0.5 ? -1 : 1;
    }
    pick(list) {
      return list[Math.floor(this.next() * list.length)];
    }
    gauss() {
      return (this.next() + this.next() + this.next() + this.next() - 2) * 1.732;
    }
  }
  var rng = (...ns) => new Rng(hash(...ns));
  function noise(x, seed = 0) {
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    return lerp(rand(i, seed), rand(i + 1, seed), u) * 2 - 1;
  }
  function noise2(x, y, seed = 0) {
    const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
    const ux = fx * fx * (3 - 2 * fx), uy = fy * fy * (3 - 2 * fy);
    const a = rand(ix, iy, seed), b = rand(ix + 1, iy, seed), c = rand(ix, iy + 1, seed), d = rand(ix + 1, iy + 1, seed);
    return lerp(lerp(a, b, ux), lerp(c, d, ux), uy) * 2 - 1;
  }
  function loopNoise(phase, radius = 1, seed = 0) {
    const a = phase * TAU;
    return noise2(Math.cos(a) * radius + 50, Math.sin(a) * radius + 50, seed);
  }
  // ../vendor_src/pixelfx/src/core/color.js
  var rgb = (r, g, b) => 255 << 24 | (b & 255) << 16 | (g & 255) << 8 | r & 255;
  var red = (c) => c & 255;
  var green = (c) => c >>> 8 & 255;
  var blue = (c) => c >>> 16 & 255;
  function hex(h) {
    if (typeof h === "number")
      return h;
    let s = h.replace("#", "");
    if (s.length === 3)
      s = s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
    const v = parseInt(s.slice(0, 6), 16);
    return rgb(v >> 16 & 255, v >> 8 & 255, v & 255);
  }
  var toHex = (c) => "#" + [red(c), green(c), blue(c)].map((v) => v.toString(16).padStart(2, "0")).join("");
  function mix(a, b, t) {
    t = clamp(t);
    return rgb(red(a) + (red(b) - red(a)) * t, green(a) + (green(b) - green(a)) * t, blue(a) + (blue(b) - blue(a)) * t);
  }
  var scale = (c, k) => rgb(Math.min(255, red(c) * k), Math.min(255, green(c) * k), Math.min(255, blue(c) * k));
  var luma = (c) => (0.299 * red(c) + 0.587 * green(c) + 0.114 * blue(c)) / 255;
  var ramp = (list) => list.map(hex);
  function fit(r, n) {
    r = r.map(hex);
    if (r.length === n)
      return r;
    return Array.from({ length: n }, (_, i) => r[Math.round(i * (r.length - 1) / Math.max(1, n - 1))]);
  }
  var PAL = {
    fire: ["#1f0b10", "#4a1118", "#8c1d1c", "#cc3a1a", "#f2701f", "#ffae35", "#ffe27a", "#fff8d6"],
    ember: ["#1a0a0e", "#3d1012", "#701a14", "#a8301a", "#e0561e", "#ff8a2a", "#ffc46a"],
    lava: ["#14060a", "#380a10", "#6e1210", "#ac2410", "#e8501a", "#ff8c2a", "#ffd25a"],
    smoke: ["#0e0c12", "#1d1a22", "#2e2a35", "#433e4b", "#5c5664", "#7b7484", "#a39cab"],
    dust: ["#1c1610", "#33281c", "#4f3f2c", "#6e5a40", "#927a58", "#b89f78", "#dcc8a2"],
    ice: ["#0c1430", "#162c5c", "#1f4f94", "#2f7fcc", "#58b4ec", "#9bdcff", "#d8f4ff", "#ffffff"],
    water: ["#081830", "#0e2e5a", "#14508c", "#1c76bc", "#36a2e0", "#78ccf4", "#c4ecff", "#ffffff"],
    electric: ["#0a0f2e", "#172a78", "#2550d0", "#3f8cff", "#7cc8ff", "#c8f0ff", "#ffffff"],
    volt: ["#24160a", "#5e3a0c", "#a8680f", "#e8a218", "#ffd23c", "#fff08a", "#ffffff"],
    poison: ["#0d1a0c", "#173a14", "#265e18", "#3f8a1e", "#6cb82a", "#a8e04a", "#e0ff8a"],
    holy: ["#2a1c08", "#5a3e10", "#9a6c18", "#d8a428", "#ffd84a", "#fff09a", "#fffbe6", "#ffffff"],
    heal: ["#08201a", "#0f3f2c", "#17663e", "#24924e", "#3ec466", "#7ee88a", "#c8ffc4", "#ffffff"],
    arcane: ["#140a26", "#2b1252", "#481c88", "#6b2cc0", "#9a48ec", "#c684ff", "#ecc8ff", "#ffffff"],
    shadow: ["#050308", "#0f0a18", "#1c1230", "#2c1a4a", "#432468", "#5e3290", "#8048b8", "#a970e0"],
    blood: ["#14040a", "#3a0a14", "#6a101c", "#a01824", "#d42a30", "#ff5a50", "#ff9a8a"],
    earth: ["#140e0a", "#2a1e14", "#47321e", "#69492a", "#8e6638", "#b88a52", "#dcb47c"],
    stone: ["#0e0e12", "#1c1c24", "#2c2c38", "#42424f", "#5c5c6b", "#7d7d8c", "#a4a4b2", "#d0d0da"],
    gold: ["#1e1206", "#4a2c08", "#86520c", "#c48412", "#f0b424", "#ffe066", "#fff6c4", "#ffffff"],
    leaf: ["#0c1a0e", "#163418", "#225224", "#357530", "#4f9a3a", "#7cc048", "#b4e070", "#e4ffb0"],
    wood: ["#160c06", "#2e1a0c", "#4a2c14", "#6a421e", "#8e5c2c", "#b47c40", "#d8a464"],
    metal: ["#0c0e14", "#1c2230", "#2e3648", "#4a5468", "#6e7a90", "#9aa6ba", "#d0d8e6", "#ffffff"],
    bone: ["#1a1814", "#3a352c", "#5e5648", "#8a806c", "#b8ad96", "#e4dcc8", "#fffaf0"],
    neon: ["#1a0516", "#3d0a33", "#701560", "#b0228f", "#f53cd1", "#ff86e6", "#ffd2f6", "#ffffff"],
    cyber: ["#041418", "#08303a", "#0c5260", "#108088", "#18b4b0", "#4ce8d8", "#b4fff0", "#ffffff"],
    matrix: ["#020a04", "#05200c", "#0a3c16", "#106624", "#1a9a34", "#3cd650", "#a4ffa8", "#e8ffe8"],
    candy: ["#ff4a5a", "#ff9a2a", "#ffe03c", "#5ad84a", "#3cc8ff", "#7a6cff", "#f53cd1"],
    night: ["#07060d", "#0c0a18", "#131026", "#1b1734", "#241f44", "#2f2956"]
  };
  var RAMP = Object.fromEntries(Object.entries(PAL).map(([k, v]) => [k, ramp(v)]));
  var WHITE = hex("#ffffff");
  var BLACK = hex("#000000");
  var INK = hex("#0b0a10");
  var PATCH = hex("#f53cd1");
  // ../vendor_src/pixelfx/src/core/particles.js
  function cycle(t, period, count, seed, life, fn) {
    for (let i = 0;i < count; i++) {
      const g = rng(seed, i, 911);
      const born = g.next() * period;
      const L = typeof life === "function" ? life(g) : life;
      let age = ((t - born) % period + period) % period;
      for (;age < L; age += period)
        fn(age, L, rng(seed, i), i);
    }
  }
  // ../vendor_src/pixelfx/src/core/shapes.js
  function bolt(r, x0, y0, x1, y1, { jag = 0.22, depth = 5 } = {}) {
    let pts = [[x0, y0], [x1, y1]];
    for (let d = 0;d < depth; d++) {
      const next = [pts[0]];
      for (let i = 1;i < pts.length; i++) {
        const [ax, ay] = pts[i - 1], [bx, by] = pts[i], dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy);
        const off = (r.next() * 2 - 1) * jag * L;
        next.push([(ax + bx) / 2 + -dy / (L || 1) * off, (ay + by) / 2 + dx / (L || 1) * off], pts[i]);
      }
      pts = next;
    }
    return pts;
  }
  function star(cx, cy, r0, r1, n = 5, rot = -Math.PI / 2) {
    const pts = [];
    for (let i = 0;i < n * 2; i++) {
      const a = rot + i * Math.PI / n, r = i % 2 ? r0 : r1;
      pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
    }
    return pts;
  }
  // ../vendor_src/pixelfx/src/core/sim.js
  var GRAVITY = 950;
  var CROSS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  var DIAG = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  var HOT = ["#fff3a6", "#ffe26b", "#ff8a2a", "#f2561d"].map(hex);
  var FIRE_RAMP = ["#ffffff", "#fff3a6", "#ffe26b", "#ffc23d", "#ff8a2a", "#f2561d", "#c9281f", "#8a1f17", "#4a1712"].map(hex);
  var SMOKE_RAMP = ["#7b6f72", "#5d5660", "#433d48", "#2b2630", "#1a171e"].map(hex);
  var rampAt = (r, t) => r[Math.min(r.length - 1, Math.max(0, Math.floor(t * r.length)))];
  var P = { SPARK: 0, MOTE: 1, STREAK: 2, FLAKE: 3, VAPOUR: 4, DUST: 5, STAR: 6, EMBER: 7, SMOKE: 8, FIRE: 9, BRAND: 10, GRIT: 11 };
  var PF = { SMOKES: 1, BIG: 2, BACK: 4 };
  var SOFT = new Set([P.VAPOUR, P.DUST, P.SMOKE]);

  class Particles {
    constructor(opts = {}) {
      this.R = opts.rng ?? new Rng(opts.seed ?? 1);
      this.list = [];
      this.t = 0;
      this.ground = opts.ground ?? (() => Infinity);
      this.sparks = (opts.sparks ?? HOT).map(hex);
      this.haze = opts.haze === undefined ? null : hex(opts.haze);
      this.onLand = opts.onLand ?? null;
    }
    spawn(k, x, y, vx, vy, life, col = WHITE, size = 1, delay = 0, flag = 0) {
      this.list.push({ k, x, y, vx, vy, life, max: life, col: col ? hex(col) : 0, size, seed: this.R.next() * 100, delay, flag });
    }
    get count() {
      return this.list.length;
    }
    update(dt) {
      this.t += dt;
      const R = this.R, t = this.t;
      for (let i = this.list.length - 1;i >= 0; i--) {
        const p = this.list[i];
        if (p.delay > 0) {
          p.delay -= dt;
          continue;
        }
        if ((p.life -= dt) <= 0) {
          if (p.k === P.FIRE && p.flag & PF.SMOKES) {
            const big = p.flag & PF.BIG;
            this.spawn(P.SMOKE, p.x, p.y, p.vx * 0.6, p.vy * 0.6 - 6, big ? R.range(1.3, 2.3) : R.range(0.8, 1.4), 0, p.size * (big ? 0.85 : 0.7), 0, big ? PF.BIG : 0);
          }
          this.list.splice(i, 1);
          continue;
        }
        switch (p.k) {
          case P.FIRE:
            p.vy -= 95 * dt;
            p.vx += Math.sin(t * 17 + p.seed) * 30 * dt;
            p.vx -= p.vx * 5 * dt;
            p.vy -= p.vy * 3.2 * dt;
            break;
          case P.GRIT: {
            p.vy += GRAVITY * dt;
            p.vx -= p.vx * 0.8 * dt;
            const g = this.ground(p.x), ny = p.y + p.vy * dt;
            p.x += p.vx * dt;
            if (p.vy > 0 && p.y <= g && ny >= g) {
              p.y = g - 0.25;
              if (p.vy > 130 && R.chance(0.4))
                p.vy = -p.vy * 0.25, p.vx = p.vx * 0.5 + R.range(-10, 10);
              else
                p.vx = p.vy = 0, p.life = Math.min(p.life, 0.5);
            } else
              p.y = ny;
            continue;
          }
          case P.BRAND: {
            p.vy += GRAVITY * 0.8 * dt;
            p.vx -= p.vx * 0.9 * dt;
            if (R.chance(0.9 * Math.min(1, dt * 60)))
              this.spawn(P.FIRE, p.x, p.y, p.vx * 0.1 + R.range(-7, 7), p.vy * 0.1 - 10, R.range(0.16, 0.32), 0, R.range(0.9, 1.7) * (0.5 + p.life / p.max * 0.6), 0, R.chance(0.4) ? PF.SMOKES : 0);
            const g = this.ground(p.x), ny = p.y + p.vy * dt;
            p.x += p.vx * dt;
            if (p.vy > 0 && p.y <= g && ny >= g) {
              this.onLand?.(p.x, g);
              this.list.splice(i, 1);
            } else
              p.y = ny;
            continue;
          }
          case P.SPARK: {
            p.vy += GRAVITY * 0.45 * dt;
            p.vx -= p.vx * 2.2 * dt;
            p.vy -= p.vy * 2.2 * dt;
            const g = this.ground(p.x), ny = p.y + p.vy * dt;
            p.x += p.vx * dt;
            if (p.vy > 0 && p.y <= g && ny >= g)
              p.vy = -p.vy * 0.45, p.vx *= 0.7, p.y = g - 0.25;
            else
              p.y = ny;
            continue;
          }
          case P.STREAK:
            p.vx += p.vx * 3 * dt, p.vy += p.vy * 3 * dt;
            break;
          case P.FLAKE:
            p.vx -= p.vx * 2.2 * dt;
            p.vy -= p.vy * 2.2 * dt - 35 * dt;
            p.x += Math.sin(this.t * 2.5 + p.seed) * 7 * dt;
            break;
          case P.EMBER:
            p.vy += (-30 + Math.sin(t * 3 + p.seed) * 20) * dt;
            p.vx += Math.cos(t * 2.3 + p.seed) * 45 * dt;
            p.vx -= p.vx * 1.6 * dt;
            p.vy -= p.vy * 1.6 * dt;
            break;
          case P.SMOKE: {
            const big = p.flag & PF.BIG;
            p.vy -= (big ? 23 : 16) * dt;
            p.vx += Math.sin(t * 1.3 + p.seed) * 8 * dt;
            p.vx -= p.vx * 1.6 * dt;
            p.vy -= p.vy * 1.2 * dt;
            break;
          }
          case P.MOTE:
            p.vx -= p.vx * 0.6 * dt;
            p.vy -= p.vy * 0.6 * dt;
            break;
          default: {
            const drag = SOFT.has(p.k) ? 4 : 1.6;
            p.vx -= p.vx * drag * dt;
            p.vy -= p.vy * drag * dt + 5 * dt;
          }
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
      }
    }
    draw(p, layer) {
      for (const q of this.list) {
        if (q.delay > 0)
          continue;
        if (layer && (SOFT.has(q.k) || q.flag & PF.BACK ? "back" : "front") !== layer)
          continue;
        const k = q.life / q.max, { x, y } = q, sp = Math.hypot(q.vx, q.vy) || 1, ux = q.vx / sp, uy = q.vy / sp;
        switch (q.k) {
          case P.SPARK: {
            const S = this.sparks, head = k > 0.6 ? S[0] : k > 0.3 ? S[1] : S[2], len = Math.min(9, 1 + sp * 0.022);
            p.line(x - ux * len, y - uy * len, x - ux * len * 0.4, y - uy * len * 0.4, k > 0.5 ? head : S[S.length - 1]);
            p.line(x - ux * len * 0.45, y - uy * len * 0.45, x, y, head);
            p.glow(x, y, 3, head, 0.45 * k);
            break;
          }
          case P.MOTE: {
            const len = Math.min(16, 0.5 + sp * 0.026) * q.size, a = k < 0.35 ? k / 0.35 : 1;
            p.line(x - ux * len, y - uy * len, x - ux * len * 0.35, y - uy * len * 0.35, scale(q.col, 0.55), a);
            p.line(x - ux * len * 0.4, y - uy * len * 0.4, x, y, q.col, a);
            p.glow(x, y, 2.5 + q.size, q.col, 0.4 * k);
            break;
          }
          case P.STREAK: {
            const L = clamp(sp / 30, 1, 7);
            for (let d = L;d >= 0; d -= 0.5)
              p.dot(x - ux * d, y - uy * d, d < 1 ? WHITE : d < L * 0.5 ? q.col : scale(q.col, 0.6), d < L * 0.5 ? 1 : 1.2 - d / L);
            p.glow(x, y, 4, q.col, 0.4);
            break;
          }
          case P.FLAKE: {
            const a = Math.min(1, k * 3);
            p.dot(x, y, q.col, a);
            if (q.size > 1.3)
              for (const [dx, dy] of CROSS)
                p.dot(x + dx, y + dy, scale(q.col, 0.8), a * 0.8);
            break;
          }
          case P.VAPOUR: {
            const r = q.size * (0.6 + (1 - k) * 0.9);
            p.disc(x, y, r, q.col, Math.pow(k, 1.3) * 0.45);
            if (this.haze)
              p.glow(x, y, r * 1.8, this.haze, 0.16 * k);
            break;
          }
          case P.DUST:
            p.disc(x, y, q.size * (0.6 + (1 - k) * 0.9), q.col, Math.pow(k, 1.3) * 0.7);
            break;
          case P.SMOKE: {
            const age = 1 - k, big = q.flag & PF.BIG;
            const r = q.size * (0.65 + Math.min(1, age * 2.5) * 0.45 + age * (big ? 0.5 : 0.4));
            const a = Math.min(1, age * 12) * Math.min(1, k * 2.4) * (big ? 0.7 : 0.58);
            const c = q.col ? mix(q.col, rampAt(SMOKE_RAMP, age), age) : rampAt(SMOKE_RAMP, age * 1.05);
            p.disc(x, y, r, c, a * 0.45);
            p.disc(x + r * 0.05, y + r * 0.06, r * 0.74, c, a * 0.62);
            if (age < 0.5)
              p.disc(x - r * 0.22, y - r * 0.3, r * 0.5, mix(c, WHITE, 0.12), a * 0.4 * (1 - age * 2));
            break;
          }
          case P.FIRE: {
            const age = 1 - k, heat = Math.min(0.999, Math.pow(age, 0.62) + q.seed % 1 * 0.1), F = FIRE_RAMP, n = F.length;
            const idx = Math.min(n - 2, Math.floor(heat * (n - 1)));
            const r = q.size * (0.55 + 0.45 * Math.min(1, age * 7)) * (1 - age * 0.55), c = F[idx];
            if (idx >= n - 2)
              p.disc(x, y, r, c, Math.min(1, k * 3) * 0.85);
            else {
              p.circle(x, y, r, F[Math.min(n - 1, idx + 2)]);
              p.circle(x - r * 0.16, y - r * 0.22, r * 0.78, c);
              if (r > 1.6)
                p.circle(x, y - r * 0.9, r * 0.42, c);
              if (idx <= 3 && r > 1.8)
                p.circle(x - r * 0.28, y - r * 0.34, r * 0.36, F[Math.max(0, idx - 1)]);
              if (idx < 6)
                p.glow(x, y, r * 2.4 + 2, c, 0.18 * k);
            }
            break;
          }
          case P.BRAND:
            p.circle(x, y, 1.6, HOT[3]);
            p.px(x, y, Math.sin(this.t * 40 + q.seed) > 0 ? HOT[0] : HOT[1]);
            p.px(x + 1, y, HOT[1]);
            p.glow(x, y, 7, HOT[2], 0.45);
            break;
          case P.GRIT:
            if (k > 0.25 || k * 4 > 0.5) {
              p.px(x, y, q.col);
              if (q.size >= 2)
                p.px(x + 1, y, q.col), p.px(x, y + 1, scale(q.col, 0.8)), p.px(x + 1, y + 1, scale(q.col, 0.7));
            }
            break;
          case P.EMBER: {
            const c = k > 0.6 ? this.sparks[0] : k > 0.3 ? this.sparks[1] : this.sparks[2];
            if (k < 0.25 && Math.sin(this.t * 40 + q.seed) < 0)
              break;
            p.px(x, y, c);
            if (q.size > 1.5)
              p.px(x, y + 1, this.sparks[this.sparks.length - 1]);
            p.glow(x, y, 3 + q.size, c, 0.35 * k);
            break;
          }
          default: {
            const tw = 0.6 + 0.4 * Math.sin(this.t * (8 + q.seed % 5) + q.seed);
            if (q.size < 1) {
              if (tw * k > 0.25)
                p.px(x, y, tw > 0.8 ? WHITE : q.col);
              p.glow(x, y, 3, q.col, 0.4 * k * tw);
              break;
            }
            sparkle(p, x, y, q.size * tw * Math.min(1, k * 3), q.col, scale(q.col, 0.75), 0.5 * k * tw);
          }
        }
      }
    }
  }
  var B = { SHARD: 0, CHUNK: 1, DRIP: 2 };

  class Bits {
    constructor(opts = {}) {
      this.list = [];
      this.ground = opts.ground ?? (() => Infinity);
    }
    add(b) {
      const life = b.life ?? 1;
      this.list.push({ kind: B.SHARD, vx: 0, vy: 0, a: 0, va: 0, s: 1, c: WHITE, g: 1, drag: 0, bounce: 0, rest: false, ...b, life, max: life });
    }
    get count() {
      return this.list.length;
    }
    update(dt) {
      for (let i = this.list.length - 1;i >= 0; i--) {
        const b = this.list[i];
        if ((b.life -= dt) <= 0) {
          this.list.splice(i, 1);
          continue;
        }
        if (b.rest)
          continue;
        b.vy += GRAVITY * b.g * dt;
        b.vx -= b.vx * b.drag * dt;
        b.vy -= b.vy * b.drag * dt;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        b.a += b.va * dt;
        const floor = this.ground(b.x), sp = b.vy;
        if (b.g <= 0 || b.y < floor || sp <= 0)
          continue;
        b.y = floor - 0.01;
        if (b.kind === B.DRIP)
          b.life = 0;
        else if (b.bounce > 0 && sp > 70)
          b.vy = -sp * b.bounce, b.vx *= 0.7, b.va *= 0.6;
        else
          b.rest = true, b.vx = b.vy = 0;
      }
    }
    draw(p) {
      for (const b of this.list) {
        const a = Math.min(1, b.life / 0.4), ca = Math.cos(b.a), sa = Math.sin(b.a);
        if (b.kind === B.SHARD) {
          for (let d = -b.s / 2;d <= b.s / 2; d += 0.5)
            p.dot(b.x + ca * d, b.y + sa * d, d > b.s / 2 - 0.6 ? WHITE : hex(b.c), a);
        } else if (b.kind === B.DRIP) {
          p.dot(b.x, b.y, hex(b.c), a);
          p.dot(b.x, b.y - 1, hex(b.c), a * 0.5);
        } else {
          const R = (b.ramp ?? ["#1c2030", "#3a4a66", "#6e86a8", "#a8c0dc", "#e8f2ff"]).map(hex), n = R.length;
          const x = Math.round(b.x), y = Math.round(b.y), r = Math.ceil(b.s) + 1;
          for (let py = -r;py <= r; py++)
            for (let px = -r;px <= r; px++) {
              const u = (px + 0.5) * ca + (py + 0.5) * sa, v = -(px + 0.5) * sa + (py + 0.5) * ca;
              const d = Math.abs(u) / b.s + Math.abs(v) / (b.s * 0.62);
              if (d > 1.3)
                continue;
              p.dot(x + px, y + py, d > 1 ? R[0] : v < 0 ? u < 0 ? R[n - 1] : R[n - 2] : u < 0 ? R[n - 3] : R[Math.max(1, n - 4)], a);
            }
        }
      }
    }
  }

  class Lights {
    constructor() {
      this.list = [];
    }
    add(x, y, r, color, k, life) {
      this.list.push({ x, y, r, color: hex(color), k, life, max: life });
    }
    update(dt) {
      for (let i = this.list.length - 1;i >= 0; i--)
        if ((this.list[i].life -= dt) <= 0)
          this.list.splice(i, 1);
    }
    draw(p) {
      for (const l of this.list) {
        const k = l.life / l.max;
        p.glow(l.x, l.y, l.r * (0.55 + 0.45 * k), l.color, l.k * k * k);
      }
    }
  }
  function sparkle(p, x, y, arm, c, tip = c, k = 0.6) {
    const n = Math.round(arm);
    if (n < 1)
      return;
    const X = Math.floor(x), Y = Math.floor(y);
    for (let d = 1;d <= n; d++) {
      const cc = d > n * 0.6 ? tip : c;
      for (const [dx, dy] of CROSS)
        p.px(X + dx * d, Y + dy * d, cc);
    }
    if (n >= 3)
      for (const [dx, dy] of DIAG)
        p.px(X + dx, Y + dy, c);
    if (n >= 6)
      for (const [dx, dy] of DIAG)
        p.px(X + dx * 2, Y + dy * 2, tip);
    p.px(X, Y, WHITE);
    p.glow(x, y, 4 + n * 2, c, k);
  }
  function flare(p, x, y, L, k, ramp) {
    if (L < 1)
      return;
    const R = ramp.map(hex), n = R.length;
    for (let i = 0;i < 8; i++) {
      const an = i * Math.PI / 4, len = i % 4 === 0 ? L : i % 2 === 0 ? L * 0.6 : L * 0.3, ca = Math.cos(an), sa = Math.sin(an);
      for (let d = 0;d <= len; d += 0.5) {
        const u = d / len;
        p.dot(x + ca * d, y + sa * d, u < 0.35 ? WHITE : u < 0.7 ? R[n - 2] : R[n - 3], u < 0.6 ? 1 : k * 1.5 * (1 - u) + 0.2);
      }
    }
  }
  function band(p, cx, cy, r, sy, th, k, ramp, keep = () => true, hot = false) {
    if (r <= 0 || k <= 0)
      return;
    const R = ramp.map(hex), n = R.length;
    for (let j = 0, m = Math.ceil(r * TAU * 1.2);j < m; j++) {
      const ang = j / m * TAU, ca = Math.cos(ang), sa = Math.sin(ang);
      if (!keep(ang))
        continue;
      for (let o = th;o >= 0; o -= 0.5) {
        const u = o / th, c = u < 0.15 ? hot ? WHITE : R[n - 1] : u < 0.4 ? R[n - 2] : u < 0.7 ? R[n - 3] : R[n - 4];
        p.dot(cx + ca * (r - o), cy + sa * (r - o) * sy, c, k * (u < 0.4 ? 1.2 : 1.15 - u));
      }
    }
  }
  function crystal(p, x, base, h, w, lean, ramp, opts = {}) {
    if (h < 1.5)
      return;
    const R = ramp.map(hex), n = R.length, C = (i) => R[Math.max(0, n - 1 - i)];
    const a = opts.a ?? 1, top = base - h, ridge0 = x - w * 0.14, glint = opts.glint ?? -1;
    const inside = (px, py) => {
      const u = (base - (py + 0.5)) / h;
      return u >= 0 && u <= 1 && Math.abs(px + 0.5 - (x + lean * u)) <= w / 2 * (1 - u) + 0.35;
    };
    for (let py = Math.floor(top) - 1;py < Math.ceil(base); py++)
      for (let px = Math.floor(x - w / 2 - Math.abs(lean) - 2);px <= Math.ceil(x + w / 2 + Math.abs(lean) + 2); px++) {
        if (!inside(px, py)) {
          if (inside(px - 1, py) || inside(px + 1, py) || inside(px, py + 1) || inside(px, py - 1) && py < base - 1)
            p.dot(px, py, R[0], a);
          continue;
        }
        if (opts.white) {
          p.dot(px, py, WHITE, a);
          continue;
        }
        const u = (base - (py + 0.5)) / h, rx = ridge0 + (x + lean - ridge0) * u, c = x + lean * u, hw = w / 2 * (1 - u) + 0.35, fx = px + 0.5;
        let col = u > 0.9 ? WHITE : Math.abs(fx - rx) < 0.55 ? C(1) : fx < rx ? fx - (c - hw) < 1 ? C(1) : (fx - (c - hw)) / Math.max(1, rx - (c - hw)) > 0.55 ? C(2) : C(3) : c + hw - fx < 1.2 ? C(Math.min(n - 2, 6)) : (fx - rx) / Math.max(1, c + hw - rx) > 0.5 ? C(5) : C(4);
        if (glint >= 0 && fx <= rx + 0.6) {
          const g = Math.abs(u - glint);
          if (g < 0.05)
            col = WHITE;
          else if (g < 0.1)
            col = C(1);
        }
        p.dot(px, py, col, a);
      }
  }
  // ../vendor_src/pixelfx/src/core/font.js
  var MINI = {
    A: ".#.|#.#|###|#.#|#.#",
    B: "##.|#.#|##.|#.#|##.",
    C: ".##|#..|#..|#..|.##",
    D: "##.|#.#|#.#|#.#|##.",
    E: "###|#..|##.|#..|###",
    F: "###|#..|##.|#..|#..",
    G: ".##|#..|#.#|#.#|.##",
    H: "#.#|#.#|###|#.#|#.#",
    I: "###|.#.|.#.|.#.|###",
    J: "..#|..#|..#|#.#|.#.",
    K: "#.#|#.#|##.|#.#|#.#",
    L: "#..|#..|#..|#..|###",
    M: "#.#|###|###|#.#|#.#",
    N: "##.|#.#|#.#|#.#|#.#",
    O: ".#.|#.#|#.#|#.#|.#.",
    P: "##.|#.#|##.|#..|#..",
    Q: ".#.|#.#|#.#|##.|.##",
    R: "##.|#.#|##.|#.#|#.#",
    S: ".##|#..|.#.|..#|##.",
    T: "###|.#.|.#.|.#.|.#.",
    U: "#.#|#.#|#.#|#.#|###",
    V: "#.#|#.#|#.#|#.#|.#.",
    W: "#.#|#.#|###|###|#.#",
    X: "#.#|#.#|.#.|#.#|#.#",
    Y: "#.#|#.#|.#.|.#.|.#.",
    Z: "###|..#|.#.|#..|###",
    0: "###|#.#|#.#|#.#|###",
    1: ".#.|##.|.#.|.#.|###",
    2: "##.|..#|.#.|#..|###",
    3: "##.|..#|.#.|..#|##.",
    4: "#.#|#.#|###|..#|..#",
    5: "###|#..|##.|..#|##.",
    6: ".##|#..|###|#.#|###",
    7: "###|..#|.#.|.#.|.#.",
    8: "###|#.#|###|#.#|###",
    9: "###|#.#|###|..#|##.",
    "+": "...|.#.|###|.#.|...",
    "-": "...|...|###|...|...",
    "!": "#|#|#|.|#",
    "?": "##.|..#|.#.|...|.#.",
    ".": ".|.|.|.|#",
    ",": "..|..|..|.#|#.",
    ":": ".|#|.|#|.",
    "/": "..#|..#|.#.|#..|#..",
    "%": "#.#|..#|.#.|#..|#.#",
    x: "...|#.#|.#.|#.#|...",
    "*": "#.#|.#.|#.#|...|...",
    "'": "#|#|.|.|.",
    "(": ".#|#.|#.|#.|.#",
    ")": "#.|.#|.#|.#|#.",
    "<": "..#|.#.|#..|.#.|..#",
    ">": "#..|.#.|..#|.#.|#..",
    "=": "...|###|...|###|...",
    _: "...|...|...|...|###",
    "#": "#.#|###|#.#|###|#.#"
  };
  var BIG = {
    A: ".###.|#...#|#...#|#####|#...#|#...#|#...#",
    B: "####.|#...#|#...#|####.|#...#|#...#|####.",
    C: ".###.|#...#|#....|#....|#....|#...#|.###.",
    D: "####.|#...#|#...#|#...#|#...#|#...#|####.",
    E: "#####|#....|#....|####.|#....|#....|#####",
    F: "#####|#....|#....|####.|#....|#....|#....",
    G: ".###.|#...#|#....|#.###|#...#|#...#|.####",
    H: "#...#|#...#|#...#|#####|#...#|#...#|#...#",
    I: "###|.#.|.#.|.#.|.#.|.#.|###",
    J: "..###|...#.|...#.|...#.|...#.|#..#.|.##..",
    K: "#...#|#..#.|#.#..|##...|#.#..|#..#.|#...#",
    L: "#....|#....|#....|#....|#....|#....|#####",
    M: "#...#|##.##|#.#.#|#.#.#|#...#|#...#|#...#",
    N: "#...#|#...#|##..#|#.#.#|#..##|#...#|#...#",
    O: ".###.|#...#|#...#|#...#|#...#|#...#|.###.",
    P: "####.|#...#|#...#|####.|#....|#....|#....",
    Q: ".###.|#...#|#...#|#...#|#.#.#|#..#.|.##.#",
    R: "####.|#...#|#...#|####.|#.#..|#..#.|#...#",
    S: ".####|#....|#....|.###.|....#|....#|####.",
    T: "#####|..#..|..#..|..#..|..#..|..#..|..#..",
    U: "#...#|#...#|#...#|#...#|#...#|#...#|.###.",
    V: "#...#|#...#|#...#|#...#|#...#|.#.#.|..#..",
    W: "#...#|#...#|#...#|#.#.#|#.#.#|#.#.#|.#.#.",
    X: "#...#|#...#|.#.#.|..#..|.#.#.|#...#|#...#",
    Y: "#...#|#...#|.#.#.|..#..|..#..|..#..|..#..",
    Z: "#####|....#|...#.|..#..|.#...|#....|#####",
    0: ".###.|#...#|#..##|#.#.#|##..#|#...#|.###.",
    1: ".#.|##.|.#.|.#.|.#.|.#.|###",
    2: ".###.|#...#|....#|...#.|..#..|.#...|#####",
    3: "#####|...#.|..#..|...#.|....#|#...#|.###.",
    4: "...#.|..##.|.#.#.|#..#.|#####|...#.|...#.",
    5: "#####|#....|####.|....#|....#|#...#|.###.",
    6: "..##.|.#...|#....|####.|#...#|#...#|.###.",
    7: "#####|....#|...#.|..#..|.#...|.#...|.#...",
    8: ".###.|#...#|#...#|.###.|#...#|#...#|.###.",
    9: ".###.|#...#|#...#|.####|....#|...#.|.##..",
    "!": "#|#|#|#|#|.|#",
    "?": ".###.|#...#|....#|...#.|..#..|.....|..#..",
    "+": ".....|..#..|..#..|#####|..#..|..#..|.....",
    "-": "....|....|....|####|....|....|....",
    ".": ".|.|.|.|.|.|#",
    ",": "..|..|..|..|..|.#|#.",
    ":": ".|.|#|.|.|#|.",
    "/": "....#|....#|...#.|..#..|.#...|#....|#....",
    "%": "##...|##..#|...#.|..#..|.#...|#..##|...##",
    x: ".....|.....|#...#|.#.#.|..#..|.#.#.|#...#",
    "*": ".....|..#..|#.#.#|.###.|#.#.#|..#..|.....",
    "'": "#|#|.|.|.|.|.",
    "<": "...#|..#.|.#..|#...|.#..|..#.|...#",
    ">": "#...|.#..|..#.|...#|..#.|.#..|#...",
    "=": "....|....|####|....|####|....|....",
    "(": "..#|.#.|#..|#..|#..|.#.|..#",
    ")": "#..|.#.|..#|..#|..#|.#.|#..",
    "#": ".#.#.|.#.#.|#####|.#.#.|#####|.#.#.|.#.#."
  };
  function build(table, h) {
    const out = {};
    for (const [ch, src] of Object.entries(table)) {
      const rows = src.split("|");
      out[ch] = { w: rows[0].length, rows: rows.map((r) => [...r].map((c) => c === "#")) };
      if (rows.length !== h)
        throw new Error(`glyph ${ch} has ${rows.length} rows, expected ${h}`);
    }
    return out;
  }
  var FONTS = {
    mini: { h: 5, space: 2, gap: 1, glyphs: build(MINI, 5) },
    big: { h: 7, space: 3, gap: 1, glyphs: build(BIG, 7) }
  };
  function textWidth(str, font = "mini") {
    const F = FONTS[font];
    let w = 0;
    for (const ch of String(str)) {
      const g = F.glyphs[ch] ?? F.glyphs[ch.toUpperCase()];
      w += (g ? g.w : F.space) + F.gap;
    }
    return Math.max(0, w - F.gap);
  }
  function rasterText(str, font, plot) {
    const F = FONTS[font];
    let x = 0;
    for (const ch of String(str)) {
      const g = F.glyphs[ch] ?? F.glyphs[ch.toUpperCase()];
      if (!g) {
        x += F.space + F.gap;
        continue;
      }
      for (let r = 0;r < F.h; r++)
        for (let c = 0;c < g.w; c++)
          if (g.rows[r][c])
            plot(x + c, r);
      x += g.w + F.gap;
    }
  }

  // ../vendor_src/pixelfx/src/core/painter.js
  var BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
  var OUT = { c: 0, a: 1, l: 0, k: 0 };
  var sprites = new WeakMap;
  var call = (v, ...args) => typeof v === "function" ? v(...args) : v;

  class Painter {
    constructor(frame) {
      this.frame = frame;
      this.reset();
    }
    reset() {
      const f = this.frame;
      this.w = f.w;
      this.h = f.h;
      this.ox = f.ox | 0;
      this.oy = f.oy | 0;
      this.C = f.color;
      this.L = f.light;
      this.tx = 0;
      this.ty = 0;
      this.fx = 1;
      this.cs = 1;
      this.sn = 0;
      this.fade = 1;
      this.lightK = 1;
      this.layer = "front";
      return this;
    }
    place(x, y, flip = false, angle = 0) {
      this.tx = x;
      this.ty = y;
      this.fx = flip ? -1 : 1;
      this.cs = Math.cos(angle);
      this.sn = Math.sin(angle);
      return this;
    }
    toX(x, y) {
      return this.tx + x * this.fx * this.cs - y * this.sn;
    }
    toY(x, y) {
      return this.ty + x * this.fx * this.sn + y * this.cs;
    }
    fromX(sx, sy) {
      const dx = sx - this.tx, dy = sy - this.ty;
      return (dx * this.cs + dy * this.sn) * this.fx;
    }
    fromY(sx, sy) {
      const dx = sx - this.tx, dy = sy - this.ty;
      return -dx * this.sn + dy * this.cs;
    }
    cellX(x, y) {
      return Math.floor(this.toX(Math.floor(x) + 0.5, Math.floor(y) + 0.5));
    }
    cellY(x, y) {
      return Math.floor(this.toY(Math.floor(x) + 0.5, Math.floor(y) + 0.5));
    }
    put(sx, sy, c, a = 1) {
      if (!c)
        return;
      a *= this.fade;
      if (a < 1 && a <= BAYER[(sy & 3) << 2 | sx & 3])
        return;
      const x = sx - this.ox, y = sy - this.oy;
      if (x < 0 || y < 0 || x >= this.w || y >= this.h)
        return;
      this.C[y * this.w + x] = c;
    }
    add(sx, sy, c, k = 1) {
      k *= this.fade * this.lightK;
      if (k <= 0.004)
        return;
      const x = sx - this.ox, y = sy - this.oy;
      if (x < 0 || y < 0 || x >= this.w || y >= this.h)
        return;
      const i = y * this.w + x, d = this.L[i];
      const r = Math.min(255, (d & 255) + (c & 255) * k) | 0;
      const g = Math.min(255, (d >>> 8 & 255) + (c >>> 8 & 255) * k) | 0;
      const b = Math.min(255, (d >>> 16 & 255) + (c >>> 16 & 255) * k) | 0;
      this.L[i] = 255 << 24 | b << 16 | g << 8 | r;
    }
    blendPx(sx, sy, c, a) {
      a *= this.fade;
      if (!c || a <= 0.004)
        return;
      const x = sx - this.ox, y = sy - this.oy;
      if (x < 0 || y < 0 || x >= this.w || y >= this.h)
        return;
      const i = y * this.w + x, d = this.C[i], da = (d >>> 24) / 255, oa = a + da * (1 - a), k = a / oa;
      const ch = (s) => (c >>> s & 255) * k + (d >>> s & 255) * (1 - k) & 255;
      this.C[i] = (oa * 255 & 255) << 24 | ch(16) << 16 | ch(8) << 8 | ch(0);
    }
    blend(x, y, c, a) {
      this.blendPx(this.cellX(x, y), this.cellY(x, y), c, a);
    }
    disc(cx, cy, r, c, a) {
      if (r < 0.5)
        return this.blend(cx, cy, call(c, 0, 0), call(a, 0, 0));
      this.each(cx - r, cy - r, cx + r, cy + r, (x, y, sx, sy) => {
        const dx = x - cx, dy = y - cy, d2 = dx * dx + dy * dy;
        if (d2 > r * r)
          return;
        const d = Math.sqrt(d2) / r, ang = Math.atan2(dy, dx);
        this.blendPx(sx, sy, call(c, d, ang), call(a, d, ang));
      });
    }
    get(x, y) {
      const sx = this.cellX(x, y) - this.ox, sy = this.cellY(x, y) - this.oy;
      return sx < 0 || sy < 0 || sx >= this.w || sy >= this.h ? 0 : this.C[sy * this.w + sx];
    }
    px(x, y, c) {
      this.put(this.cellX(x, y), this.cellY(x, y), c, 1);
    }
    dot(x, y, c, a = 1) {
      if (a > 0)
        this.put(this.cellX(x, y), this.cellY(x, y), c, a);
    }
    light(x, y, c, k = 1) {
      this.add(this.cellX(x, y), this.cellY(x, y), c, k);
    }
    each(x0, y0, x1, y1, fn) {
      let ax = Infinity, bx = -Infinity, ay = Infinity, by = -Infinity;
      for (let k = 0;k < 4; k++) {
        const x = k & 1 ? x1 : x0, y = k & 2 ? y1 : y0, sx = this.toX(x, y), sy = this.toY(x, y);
        if (sx < ax)
          ax = sx;
        if (sx > bx)
          bx = sx;
        if (sy < ay)
          ay = sy;
        if (sy > by)
          by = sy;
      }
      const sx0 = Math.max(Math.floor(ax), this.ox), sx1 = Math.min(Math.ceil(bx), this.ox + this.w - 1);
      const sy0 = Math.max(Math.floor(ay), this.oy), sy1 = Math.min(Math.ceil(by), this.oy + this.h - 1);
      for (let sy = sy0;sy <= sy1; sy++)
        for (let sx = sx0;sx <= sx1; sx++) {
          const cx = sx + 0.5, cy = sy + 0.5;
          fn(this.fromX(cx, cy), this.fromY(cx, cy), sx, sy);
        }
    }
    shade(x0, y0, x1, y1, fn) {
      const o = OUT;
      this.each(x0, y0, x1, y1, (lx, ly, sx, sy) => {
        o.c = 0;
        o.a = 1;
        o.l = 0;
        o.k = 0;
        const c = fn(lx, ly, o) || o.c;
        if (c)
          this.put(sx, sy, c, o.a);
        if (o.k > 0)
          this.add(sx, sy, o.l || c, o.k);
      });
    }
    line(x0, y0, x1, y1, c, a = 1) {
      let sx = this.cellX(x0, y0), sy = this.cellY(x0, y0);
      const ex = this.cellX(x1, y1), ey = this.cellY(x1, y1);
      const dx = Math.abs(ex - sx), dy = -Math.abs(ey - sy), stepx = sx < ex ? 1 : -1, stepy = sy < ey ? 1 : -1;
      const n = Math.max(dx, -dy) || 1, fc = typeof c === "function", fa = typeof a === "function";
      let err = dx + dy, i = 0;
      for (;; ) {
        const u = i++ / n;
        this.put(sx, sy, fc ? c(u) : c, fa ? a(u) : a);
        if (sx === ex && sy === ey)
          break;
        const e2 = 2 * err;
        if (e2 >= dy) {
          err += dy;
          sx += stepx;
        }
        if (e2 <= dx) {
          err += dx;
          sy += stepy;
        }
      }
    }
    polyline(pts, c, a = 1) {
      for (let i = 1;i < pts.length; i++)
        this.line(pts[i - 1][0], pts[i - 1][1], pts[i][0], pts[i][1], c, a);
    }
    beam(x0, y0, x1, y1, width, c, a = 1) {
      const r = width / 2, dx = x1 - x0, dy = y1 - y0, L2 = dx * dx + dy * dy || 0.000000001;
      this.shade(Math.min(x0, x1) - r, Math.min(y0, y1) - r, Math.max(x0, x1) + r, Math.max(y0, y1) + r, (x, y, o) => {
        const u = clamp(((x - x0) * dx + (y - y0) * dy) / L2), px = x0 + dx * u - x, py = y0 + dy * u - y;
        const d2 = px * px + py * py;
        if (d2 > r * r)
          return;
        const v = Math.sqrt(d2) / r;
        o.c = call(c, u, v);
        o.a = call(a, u, v);
      });
    }
    circle(cx, cy, r, c, a = 1) {
      if (r < 0.6)
        return this.dot(cx, cy, call(c, 0, 0), call(a, 0, 0));
      this.shade(cx - r, cy - r, cx + r, cy + r, (x, y, o) => {
        const dx = x - cx, dy = y - cy, d2 = dx * dx + dy * dy;
        if (d2 > r * r)
          return;
        const d = Math.sqrt(d2) / r, ang = Math.atan2(dy, dx);
        o.c = call(c, d, ang);
        o.a = call(a, d, ang);
      });
    }
    ellipse(cx, cy, rx, ry, c, a = 1) {
      if (rx <= 0 || ry <= 0)
        return;
      this.shade(cx - rx, cy - ry, cx + rx, cy + ry, (x, y, o) => {
        const dx = (x - cx) / rx, dy = (y - cy) / ry, d2 = dx * dx + dy * dy;
        if (d2 > 1)
          return;
        const d = Math.sqrt(d2), ang = Math.atan2(dy, dx);
        o.c = call(c, d, ang);
        o.a = call(a, d, ang);
      });
    }
    ring(cx, cy, r, w, c, a = 1) {
      const r0 = Math.max(0, r - w);
      this.shade(cx - r, cy - r, cx + r, cy + r, (x, y, o) => {
        const dx = x - cx, dy = y - cy, d2 = dx * dx + dy * dy;
        if (d2 > r * r || d2 < r0 * r0)
          return;
        const v = w > 0 ? (Math.sqrt(d2) - r0) / (r - r0 || 1) : 1, ang = Math.atan2(dy, dx);
        o.c = call(c, v, ang);
        o.a = call(a, v, ang);
      });
    }
    arc(cx, cy, r, w, a0, a1, c, a = 1) {
      const span = a1 - a0, wf = typeof w === "function";
      this.shade(cx - r, cy - r, cx + r, cy + r, (x, y, o) => {
        const dx = x - cx, dy = y - cy, d = Math.sqrt(dx * dx + dy * dy);
        if (d > r)
          return;
        let ang = Math.atan2(dy, dx) - a0;
        ang -= Math.floor(ang / (Math.PI * 2)) * Math.PI * 2;
        if (ang > span)
          return;
        const u = ang / span, ww = wf ? w(u) : w;
        if (ww <= 0 || d < r - ww)
          return;
        const v = (d - (r - ww)) / ww;
        o.c = call(c, u, v);
        o.a = call(a, u, v);
      });
    }
    rect(x, y, w, h, c, a = 1) {
      if (this.sn === 0) {
        const X0 = Math.round(x), Y0 = Math.round(y), X1 = Math.round(x + w), Y1 = Math.round(y + h);
        for (let yy = Y0;yy < Y1; yy++)
          for (let xx = X0;xx < X1; xx++)
            this.put(this.cellX(xx, yy), this.cellY(xx, yy), c, a);
        return;
      }
      this.shade(x, y, x + w, y + h, (lx, ly, o) => {
        if (lx < x || ly < y || lx >= x + w || ly >= y + h)
          return;
        o.c = c;
        o.a = a;
      });
    }
    poly(pts, c, a = 1) {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      for (const [x, y] of pts) {
        if (x < x0)
          x0 = x;
        if (x > x1)
          x1 = x;
        if (y < y0)
          y0 = y;
        if (y > y1)
          y1 = y;
      }
      const n = pts.length;
      this.shade(x0, y0, x1, y1, (x, y, o) => {
        let inside = false;
        for (let i = 0, j = n - 1;i < n; j = i++) {
          const [xi, yi] = pts[i], [xj, yj] = pts[j];
          if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi)
            inside = !inside;
        }
        if (!inside)
          return;
        o.c = call(c, x, y);
        o.a = call(a, x, y);
      });
    }
    tri(x0, y0, x1, y1, x2, y2, c, a = 1) {
      this.poly([[x0, y0], [x1, y1], [x2, y2]], c, a);
    }
    glow(x, y, r, c, k = 0.5) {
      if (r < 1 || k <= 0.004)
        return;
      const cx = this.toX(x, y), cy = this.toY(x, y);
      const x0 = Math.floor(cx - r), x1 = Math.ceil(cx + r), y0 = Math.floor(cy - r), y1 = Math.ceil(cy + r);
      for (let sy = y0;sy <= y1; sy++) {
        const dy = (sy + 0.5 - cy) / r;
        for (let sx = x0;sx <= x1; sx++) {
          const dx = (sx + 0.5 - cx) / r, d = dx * dx + dy * dy;
          if (d >= 1)
            continue;
          const f = 1 - Math.sqrt(d);
          this.add(sx, sy, c, f * f * k);
        }
      }
    }
    glowLine(x0, y0, x1, y1, r, c, k = 0.5) {
      if (r < 1 || k <= 0.004)
        return;
      const ax = this.toX(x0, y0), ay = this.toY(x0, y0), bx = this.toX(x1, y1), by = this.toY(x1, y1);
      const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy || 0.000000001;
      const X0 = Math.floor(Math.min(ax, bx) - r), X1 = Math.ceil(Math.max(ax, bx) + r);
      const Y0 = Math.floor(Math.min(ay, by) - r), Y1 = Math.ceil(Math.max(ay, by) + r);
      for (let sy = Y0;sy <= Y1; sy++)
        for (let sx = X0;sx <= X1; sx++) {
          const px = sx + 0.5, py = sy + 0.5, u = clamp(((px - ax) * dx + (py - ay) * dy) / L2);
          const ex = ax + dx * u - px, ey = ay + dy * u - py, d = Math.sqrt(ex * ex + ey * ey) / r;
          if (d >= 1)
            continue;
          const f = 1 - d;
          this.add(sx, sy, c, f * f * k);
        }
    }
    glowRing(x, y, R, r, c, k = 0.5) {
      if (r < 1 || k <= 0.004)
        return;
      const cx = this.toX(x, y), cy = this.toY(x, y), E = R + r;
      for (let sy = Math.floor(cy - E);sy <= Math.ceil(cy + E); sy++)
        for (let sx = Math.floor(cx - E);sx <= Math.ceil(cx + E); sx++) {
          const d = Math.abs(Math.hypot(sx + 0.5 - cx, sy + 0.5 - cy) - R) / r;
          if (d >= 1)
            continue;
          const f = 1 - d;
          this.add(sx, sy, c, f * f * k);
        }
    }
    sprite(rows, pal, x, y, opts = {}) {
      let s = sprites.get(rows);
      if (!s)
        sprites.set(rows, s = rows.map((r) => [...r]));
      const k = opts.scale ?? 1, a = opts.a ?? 1, W = s[0]?.length ?? 0, cache = {};
      for (let r = 0;r < s.length; r++)
        for (let q = 0;q < s[r].length; q++) {
          const ch = s[r][q];
          if (ch === "." || ch === " ")
            continue;
          let c = opts.tint;
          if (c === undefined) {
            c = cache[ch];
            if (c === undefined)
              c = cache[ch] = pal[ch] === undefined ? 0 : hex(pal[ch]);
          }
          if (!c)
            continue;
          const col = opts.flip ? W - 1 - q : q, row = opts.flipY ? s.length - 1 - r : r;
          if (k === 1)
            this.dot(x + col, y + row, c, a);
          else
            this.rect(x + col * k, y + row * k, k, k, c, a);
        }
    }
    text(str, x, y, c, opts = {}) {
      const font = opts.font ?? "mini", k = opts.scale ?? 1, a = opts.a ?? 1, w = textWidth(str, font) * k;
      const left = Math.round(opts.align === "center" ? x - w / 2 : opts.align === "right" ? x - w : x), top = Math.round(y);
      const { outline: ol, shadow: sh } = opts;
      if (ol !== undefined)
        rasterText(str, font, (gx, gy) => this.rect(left + gx * k - 1, top + gy * k - 1, k + 2, k + 2, ol, a));
      if (sh !== undefined)
        rasterText(str, font, (gx, gy) => this.rect(left + gx * k + 1, top + gy * k + 1, k, k, sh, a));
      rasterText(str, font, (gx, gy) => this.rect(left + gx * k, top + gy * k, k, k, call(c, gx, gy), a));
    }
    measure(str, opts = {}) {
      const k = opts.scale ?? 1;
      return [textWidth(str, opts.font ?? "mini") * k, FONTS[opts.font ?? "mini"].h * k];
    }
    mask(m, x, y, c, a = 1) {
      for (let my = 0;my < m.h; my++)
        for (let mx = 0;mx < m.w; mx++)
          if (m.data[my * m.w + mx])
            this.dot(x + mx, y + my, call(c, mx, my), call(a, mx, my));
    }
    outline(m, x, y, c, a = 1) {
      const at = (mx, my) => mx >= 0 && my >= 0 && mx < m.w && my < m.h && m.data[my * m.w + mx];
      for (let my = -1;my <= m.h; my++)
        for (let mx = -1;mx <= m.w; mx++)
          if (!at(mx, my) && (at(mx - 1, my) || at(mx + 1, my) || at(mx, my - 1) || at(mx, my + 1)))
            this.dot(x + mx, y + my, call(c, mx, my), call(a, mx, my));
    }
  }
  // ../vendor_src/pixelfx/src/core/actor.js
  var HERO = [
    "....kkkkk...",
    "..kkhhhhhk..",
    ".khhhhhhhhk.",
    ".khhhhhhhhhk",
    ".khhssssshhk",
    ".khsessesshk",
    ".khsessesshk",
    "..ksssssssk.",
    "...kkSSSkk..",
    "..kttttttk..",
    ".kttTttTttk.",
    ".ksttTTttsk.",
    ".kstttttttk.",
    "..kbbbbbbk..",
    "..kppkkppk..",
    "..kppk.kppk.",
    "..kppk.kppk.",
    "..koook.kook",
    "..kkkkk.kkkk"
  ];
  var HERO_PAL = {
    k: "#17121f",
    h: "#7a4128",
    s: "#f3c49d",
    S: "#c98b6c",
    e: "#17121f",
    t: "#5f6f94",
    T: "#46536f",
    b: "#8a5a32",
    p: "#38334a",
    o: "#6a4030",
    H: "#a35d34",
    w: "#ffffff",
    m: "#a3564a",
    g: "#e8c060",
    L: "#7f90b6",
    O: "#8f5a3f",
    P: "#4b4560",
    c: "#f53cd1",
    C: "#ff8fe6",
    D: "#a31f8a"
  };
  var DUMMY_PAL = {
    k: "#0e0c14",
    A: "#e4e6ec",
    B: "#b6b9c3",
    C: "#868995",
    D: "#5c5e6a",
    E: "#6e707c",
    F: "#4b4d58",
    G: "#34353f",
    J: "#2a2b33",
    m: "#f53cd1"
  };
  var HERO2 = [
    "...........kkk..........",
    "..........kAABk.........",
    ".........kAAABJk........",
    ".........kABBJJk........",
    ".........kBBBJCDk.......",
    ".........kBCJDDDk.......",
    ".........kkJJJDk........",
    ".......kkkkABBJCkk......",
    "......kAABCJBCCCkDk.....",
    "......kABBCJCCCmDkDk....",
    "......kBBCDDJCDDDkDk....",
    "......kABCDJDDDDDkk.....",
    ".....kAABDkDDDDJkk......",
    ".....kABCDkDDJJGkk......",
    ".....kABCkJJJGGGkk......",
    "....kJJCDkFFFGGGk.......",
    "....kAJJDkJJJGGGk.......",
    "....kJCJJkABBJGGk.......",
    ".....kJCCkBBCDJJJk......",
    ".....kCCCJBBCDJJDk......",
    ".....kCCCDJCCDkJDDk.....",
    "......kCDDJBCDkDDDk.....",
    ".......kDJJJCDkDDDkk....",
    ".......kJBCJCDkDDDkk....",
    ".......kBDJBCDkCDDkk....",
    "........kJJBCDkCDDk.....",
    "........kBBBCDkCCDDk....",
    "........kBBBCDkCCDDk....",
    ".........kBBCDkJDDDk....",
    "........kBJJJJkCJJJk....",
    "........kBBCCDkCCDDk....",
    "........kBBCDDkCDDk.....",
    "........kBBCDkCCDDk.....",
    "........kBCCDkCCDDk.....",
    "........kBCDDkCDDDk.....",
    ".......kJBCJkkkDJkkkk...",
    ".......kAJJAAAAkCCCCCk..",
    "........kkkkkkkkkkkkk..."
  ];
  function maskOf(rows, k = 1) {
    const h = rows.length * k, w = rows[0].length * k, data = new Uint8Array(w * h);
    rows.forEach((r, y) => [...r].forEach((ch, x) => {
      if (ch === ".")
        return;
      for (let j = 0;j < k * k; j++)
        data[(y * k + (j / k | 0)) * w + x * k + j % k] = 1;
    }));
    return { w, h, data };
  }
  var MASKS = { 1: maskOf(HERO, 1), 2: maskOf(HERO2, 1) };
  function pixelsOf(rows, pal) {
    const w = rows[0].length, data = new Uint32Array(w * rows.length);
    rows.forEach((r, y) => [...r].forEach((ch, x) => data[y * w + x] = ch === "." ? 0 : hex(pal[ch])));
    return data;
  }
  var PIXELS = { 1: pixelsOf(HERO, HERO_PAL), 2: pixelsOf(HERO2, DUMMY_PAL) };
  function stockActor(k = 1) {
    k = k === 2 ? 2 : 1;
    const m = MASKS[k], x = -Math.floor(m.w / 2), y = -m.h;
    return { mask: m, pixels: PIXELS[k], x, y, w: m.w, h: m.h, k, head: [0, y], chest: [0, k === 2 ? -26 : y + 11], ...k === 2 ? { eyes: [[13, 3], [15, 3]] } : {} };
  }

  // ../vendor_src/pixelfx/src/core/fx.js
  function createFrame(w, h, ox = 0, oy = 0) {
    return { w, h, ox, oy, color: new Uint32Array(w * h), light: new Uint32Array(w * h) };
  }
  function clearFrame(f) {
    f.color.fill(0);
    f.light.fill(0);
    return f;
  }
  var painters = new WeakMap;
  function painterFor(frame) {
    let p = painters.get(frame);
    if (!p)
      painters.set(frame, p = new Painter(frame));
    return p.reset();
  }
  var FADE = 0.3;
  var isRamp = (v) => Array.isArray(v) && v.length > 0 && v.every((c) => typeof c === "number" || /^#[0-9a-f]{3,8}$/i.test(c));
  function resolveOptions(meta, o = {}) {
    const opts = { ...meta.options ?? {}, ...o };
    for (const [k, def] of Object.entries(meta.options ?? {}))
      if (isRamp(def) && isRamp(o[k]) && o[k].length !== def.length)
        opts[k] = fit(o[k], def.length).map(toHex);
    if (meta.actor && !opts.actor)
      opts.actor = stockActor(meta.actor === 2 ? 2 : 1);
    return opts;
  }
  function createFx(mod, o = {}) {
    const meta = mod.meta ?? {};
    const opts = resolveOptions(meta, o);
    const impl = mod.create ? mod.create(opts) : mod;
    const D = meta.duration ?? 1;
    let t = 0, stopAt = Infinity;
    return {
      meta,
      options: opts,
      get t() {
        return t;
      },
      update(dt) {
        t += dt;
        if (!impl.update)
          return;
        const n = Math.max(1, Math.ceil(dt * 120 - 0.000000001));
        for (let i = 0;i < n; i++)
          impl.update(dt / n, opts);
      },
      draw(frame, layer) {
        const p = painterFor(frame);
        p.place(opts.x ?? 0, opts.y ?? 0, !!opts.flip, opts.angle ?? 0);
        p.fade = stopAt === Infinity ? 1 : clamp(1 - (t - stopAt) / FADE);
        p.lightK = opts.light ?? 1;
        const tt = meta.loop ? t % D : Math.min(t, D);
        if (layer !== "front" && impl.drawBack) {
          p.layer = "back";
          impl.drawBack(p, tt, opts);
        }
        if (layer !== "back") {
          p.layer = "front";
          impl.draw(p, tt, opts);
        }
      },
      stop() {
        if (stopAt === Infinity)
          stopAt = t;
      },
      done() {
        return t - stopAt >= FADE || !meta.loop && t >= D;
      }
    };
  }
  function composite(f, out, bg = null, lightK = 1) {
    const n = f.w * f.h, { color: C, light: L } = f, flat = typeof bg === "number";
    for (let i = 0;i < n; i++) {
      const c = C[i], l = L[i] & 16777215;
      let r, g, b, a;
      const ca = c >>> 24;
      if (ca === 255) {
        r = c & 255;
        g = c >>> 8 & 255;
        b = c >>> 16 & 255;
        a = 255;
      } else if (bg === null) {
        r = c & 255;
        g = c >>> 8 & 255;
        b = c >>> 16 & 255;
        a = ca;
      } else {
        const k = flat ? bg : bg[i], f = ca / 255;
        r = (c & 255) * f + (k & 255) * (1 - f);
        g = (c >>> 8 & 255) * f + (k >>> 8 & 255) * (1 - f);
        b = (c >>> 16 & 255) * f + (k >>> 16 & 255) * (1 - f);
        a = 255;
      }
      if (l) {
        const lr = (l & 255) * lightK, lg = (l >>> 8 & 255) * lightK, lb = (l >>> 16 & 255) * lightK;
        if (a < 255) {
          const pa = a / 255, pr = r * pa + lr, pg = g * pa + lg, pb = b * pa + lb;
          const na = Math.min(1, Math.max(pa, Math.max(lr, lg, lb) / 255));
          if (na > 0) {
            r = Math.min(255, pr / na);
            g = Math.min(255, pg / na);
            b = Math.min(255, pb / na);
            a = na * 255;
          }
        } else {
          r = Math.min(255, r + lr);
          g = Math.min(255, g + lg);
          b = Math.min(255, b + lb);
        }
      }
      const j = i * 4;
      out[j] = r;
      out[j + 1] = g;
      out[j + 2] = b;
      out[j + 3] = a;
    }
    return out;
  }
  // ../vendor_src/pixelfx/src/core/scene.js
  var SKY = hex("#15131d");
  var SKY_TOP = hex("#0d0b14");
  var SKY_LOW = hex("#221d33");
  var FLOOR_EDGE = hex("#4a4263");
  var FLOOR = hex("#2b2639");
  var FLOOR_DARK = hex("#211d2d");
  var MORTAR = hex("#1a1724");
  // ../vendor_src/pixelfx/src/core/rig.js
  var PAL2 = Object.fromEntries(Object.entries(DUMMY_PAL).map(([k, v]) => [k, hex(v) >>> 0]));
  var INK2 = PAL2.k;
  var SEAM = PAL2.J;
  var MARK = PAL2.m;
  var SHELL = [PAL2.A, PAL2.B, PAL2.C, PAL2.D];
  var CORE = [PAL2.E, PAL2.F, PAL2.G, PAL2.G];
  var DEG = Math.PI / 180;
  var add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  var sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  var mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  var dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  var cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  var len = (a) => Math.hypot(a[0], a[1], a[2]);
  var unit = (a) => mul(a, 1 / (len(a) || 0.000001));
  var rotY = (t) => {
    const c = Math.cos(t), s = Math.sin(t);
    return [c, 0, s, 0, 1, 0, -s, 0, c];
  };
  var rotZ = (t) => {
    const c = Math.cos(t), s = Math.sin(t);
    return [c, -s, 0, s, c, 0, 0, 0, 1];
  };
  var mm = (A, B) => {
    const o = new Array(9);
    for (let r = 0;r < 3; r++)
      for (let c = 0;c < 3; c++)
        o[r * 3 + c] = A[r * 3] * B[c] + A[r * 3 + 1] * B[3 + c] + A[r * 3 + 2] * B[6 + c];
    return o;
  };
  var mv = (M, v) => [M[0] * v[0] + M[1] * v[1] + M[2] * v[2], M[3] * v[0] + M[4] * v[1] + M[5] * v[2], M[6] * v[0] + M[7] * v[1] + M[8] * v[2]];
  var clamp01 = (v) => Math.max(0, Math.min(1, v));
  var M = {
    pelvis: 19.7,
    spine1: 2.8,
    spine2: 4.6,
    shoulderUp: 2.5,
    shoulderOut: 5.9,
    neckUp: 4,
    headUp: 3.1,
    hipDown: 1.1,
    hipOut: 2.8,
    thigh: 8.6,
    shin: 8.3,
    upper: 7.6,
    fore: 7.4,
    turn: 36 * DEG
  };
  var STAND = { lean: 0, crouch: 0, yaw: 0, fx: -3, fy: -15, bx: 5, by: -15, ffx: -2, ffy: -4, fbx: 3, fby: -4 };
  function ik(a, target, L1, L2, pole) {
    let to = sub(target, a), d = len(to);
    const reach = L1 + L2 - 0.02;
    if (d > reach) {
      to = mul(to, reach / d);
      d = reach;
    }
    const u = unit(to), along = (L1 * L1 - L2 * L2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, L1 * L1 - along * along));
    let v = sub(pole, mul(u, dot(pole, u)));
    v = len(v) < 0.0001 ? unit(cross(u, [0, 0, 1])) : unit(v);
    return { joint: add(a, add(mul(u, along), mul(v, h))), end: add(a, to), u, v };
  }
  function frame(t, R) {
    return { t, R };
  }
  function boneFrame(a, b, pole) {
    const x = unit(sub(b, a));
    let y = sub(pole, mul(x, dot(pole, x)));
    y = len(y) < 0.0001 ? unit(cross(x, [0, 0, 1])) : unit(y);
    const z = cross(x, y);
    return frame(a, [x[0], y[0], z[0], x[1], y[1], z[1], x[2], y[2], z[2]]);
  }
  var weaponOf = (name) => WEAPONS[name];
  function solve(pose) {
    const q = { ...STAND, ...pose }, lean = q.lean, W = q.weapon && weaponOf(q.weapon), OW = q.offWeapon && weaponOf(q.offWeapon);
    const sa = q.sa ?? 0, wl = q.wl ?? 1, axisZ = Math.sqrt(Math.max(0, 1 - wl * wl)) * (q.wz ?? 1);
    const axis = [Math.cos(sa) * wl, -Math.sin(sa) * wl, axisZ], side = [-Math.sin(sa), -Math.cos(sa), 0];
    const two = !!(q.two && W), nearZ = q.fz ?? (two ? 3 : 4.5);
    const fwd = (q.fx - STAND.fx) / 24, farFwd = two ? 0 : (q.bx - STAND.bx) / 22;
    let turn = M.turn + (fwd >= 0 ? -44 * DEG * Math.min(1, fwd) : 28 * DEG * Math.min(1, -fwd * 1.8));
    turn += (farFwd > 0 ? 34 * DEG * Math.min(1, farFwd) : 0) + (q.twist ?? 0) * 4 * DEG;
    if (q.turn !== undefined)
      turn = q.turn;
    const hipTurn = M.turn + (turn - M.turn) * 0.45, tilt = Math.atan2(lean, 13);
    const Rp = mm(rotZ(-tilt * 0.25), rotY(-hipTurn)), Rc = mm(rotZ(-tilt), rotY(-turn));
    const ankleN = [q.ffx, -q.ffy - 1.8, q.fzz ?? 2.4], ankleF = [q.fbx, -q.fby - 1.8, q.bzz ?? -2.4];
    let pelvis = [lean * 0.2, M.pelvis - q.crouch, 0];
    const hipAt = (s) => add(pelvis, mv(Rp, [0, -M.hipDown, s * M.hipOut]));
    const maxLeg = (M.thigh + M.shin) * 0.995;
    for (const [s, a] of [[1, ankleN], [-1, ankleF]]) {
      const h = hipAt(s), dx = h[0] - a[0], dz = h[2] - a[2], flat = dx * dx + dz * dz;
      if (flat < maxLeg * maxLeg) {
        const top = a[1] + Math.sqrt(maxLeg * maxLeg - flat);
        if (h[1] > top)
          pelvis = [pelvis[0], pelvis[1] - (h[1] - top), pelvis[2]];
      }
    }
    const waist = add(pelvis, [Math.sin(tilt * 0.45) * M.spine1, Math.cos(tilt * 0.45) * M.spine1, 0]);
    const chest = add(waist, [Math.sin(tilt) * M.spine2, Math.cos(tilt) * M.spine2, 0]);
    const neck = add(chest, mv(Rc, [0, M.neckUp, 0]));
    const headTurn = M.turn * 0.9 + (turn - M.turn) * 0.35, nod = tilt * 0.35 + (q.hy ?? 0) * 7 * DEG, roll = (q.hx ?? 0) * 7 * DEG;
    const Rh = mm(rotZ(-nod - roll), rotY(-headTurn));
    const head = add(neck, mv(Rh, [0.15, M.headUp, 0]));
    const pick = (s, target) => {
      const base = add(chest, mv(Rc, [0, M.shoulderUp, s * M.shoulderOut])), to = sub(target, base), d = len(to);
      return add(base, mul(unit(to), Math.min(1.8, Math.max(0, d - 11) * 0.35)));
    };
    const nearT = [q.fx, -q.fy, nearZ];
    const farT = two ? [q.fx + axis[0] * W.two, -q.fy + axis[1] * W.two, nearZ + axis[2] * W.two] : [q.bx, -q.by, q.bz ?? (q.armsFront ? 5.5 : -4.5)];
    const sN = pick(1, nearT), sF = pick(-1, farT);
    const pole = (s, T, shoulder, hold) => {
      const up = clamp01((T[1] - shoulder[1] + 2) / 10);
      const base = [-0.55 + up * 1.1, -1 + up * 0.9, s * (0.45 + up * 0.5)];
      if (!hold)
        return base;
      const u = unit(sub(T, shoulder));
      let best = base, score = Infinity;
      for (let i = 0;i < 16; i++) {
        const a = i / 16 * Math.PI * 2, x = unit(cross(u, [0.3, 1, 0.2])), y = cross(u, x), v = add(mul(x, Math.cos(a)), mul(y, Math.sin(a)));
        const A = ik(shoulder, T, M.upper, M.fore, v), f = unit(sub(A.end, A.joint));
        const cost = Math.abs(dot(f, hold)) * 0.7 + (1 - dot(unit(base), v)) * 0.55;
        if (cost < score) {
          score = cost;
          best = v;
        }
      }
      return best;
    };
    const holdN = W ? W.across ? side : axis : null, holdF = two ? W.across ? side : axis : OW ? [Math.cos(q.sb ?? Math.PI), -Math.sin(q.sb ?? Math.PI), 0] : null;
    const armN = ik(sN, nearT, M.upper, M.fore, pole(1, nearT, sN, holdN)), armF = ik(sF, farT, M.upper, M.fore, pole(-1, farT, sF, holdF));
    const kneePole = (s) => mv(Rp, [1, 0, s * 0.35]);
    const hipN = hipAt(1), hipF = hipAt(-1);
    const legN = ik(hipN, ankleN, M.thigh, M.shin, kneePole(1)), legF = ik(hipF, ankleF, M.thigh, M.shin, kneePole(-1));
    const footDir = (s) => {
      const t = hipTurn * 0.6 + s * 8 * DEG;
      return [Math.cos(t), 0, Math.sin(t)];
    };
    const B = {
      pelvis: frame(pelvis, Rp),
      waist: frame(waist, mm(rotZ(-tilt * 0.6), rotY(-(turn + hipTurn) / 2))),
      chest: frame(chest, Rc),
      head: frame(head, Rh),
      neck: frame(neck, Rh),
      upperN: boneFrame(sN, armN.joint, armN.v),
      foreN: boneFrame(armN.joint, armN.end, armN.v),
      upperF: boneFrame(sF, armF.joint, armF.v),
      foreF: boneFrame(armF.joint, armF.end, armF.v),
      thighN: boneFrame(hipN, legN.joint, legN.v),
      shinN: boneFrame(legN.joint, legN.end, legN.v),
      thighF: boneFrame(hipF, legF.joint, legF.v),
      shinF: boneFrame(legF.joint, legF.end, legF.v)
    };
    B.footN = frame(legN.end, mm(rotY(-Math.atan2(footDir(1)[2], footDir(1)[0])), rotZ(q.toeF ? -55 * DEG : 0)));
    B.footF = frame(legF.end, mm(rotY(-Math.atan2(footDir(-1)[2], footDir(-1)[0])), rotZ(q.toeB ? -55 * DEG : 0)));
    return { B, W, OW, q, axis, side, armN, armF, legN, legF, sN, sF, hipN, hipF, turn };
  }
  var BW = 300;
  var BH = 240;
  var OX = 150;
  var OY = 180;
  var Zb = new Float32Array(BW * BH);
  var Tone = new Float32Array(BW * BH);
  var Part = new Int8Array(BW * BH);
  var Mat = new Int8Array(BW * BH);
  var Fr = new Int8Array(BW * BH);
  var LX = new Float32Array(BW * BH);
  var LY = new Float32Array(BW * BH);
  var Col = new Uint32Array(BW * BH);
  var touched = [];
  var LIGHT = unit([-0.55, 0.72, 0.5]);
  var curFrameIndex = 0;
  var onlyPart = 0;
  function plot(i, z, tone, part, mat, wx, wy, color) {
    if (onlyPart && part !== onlyPart)
      return;
    if (Part[i] === 0)
      touched.push(i);
    else if (z <= Zb[i])
      return;
    Zb[i] = z;
    Tone[i] = tone;
    Part[i] = part;
    Mat[i] = mat;
    Fr[i] = curFrameIndex;
    LX[i] = wx;
    LY[i] = wy;
    Col[i] = color;
  }
  var PART = { pelvis: 1, waist: 2, chest: 3, neck: 4, head: 5, face: 6, upperN: 7, elbowN: 8, foreN: 9, handN: 10, upperF: 11, elbowF: 12, foreF: 13, handF: 14, thighN: 15, kneeN: 16, shinN: 17, footN: 18, thighF: 19, kneeF: 20, shinF: 21, footF: 22, weapon: 23, offWeapon: 24 };
  var STEEL = Object.fromEntries(Object.entries({ hi: "#ffffff", a: "#e8edf6", b: "#a4afc6", d: "#68748f", gold: "#ffd84a", goldD: "#b8862a", grip: "#7a3a2a", gripD: "#4a2018", wood: "#8a5a32", woodD: "#5a3820", dark: "#3a3448", darkD: "#262033", olive: "#58663f", oliveA: "#7d8c58", oliveD: "#3a4529" }).map(([k, v]) => [k, hex(v) >>> 0]));
  function blade(T, from, length, w) {
    for (let i = from;i <= from + length + 0.01; i += 0.4) {
      const r = i - from, wd = r > length - 5 ? Math.max(0, (length - r) / 5 * w) : w;
      for (let k = -wd;k <= wd + 0.01; k += 0.4)
        T(i, k, k < -w * 0.4 ? STEEL.hi : k > w * 0.4 ? STEEL.d : STEEL.a);
    }
  }
  var haft = (T, from, to, a, d, r = 0.8) => {
    for (let i = from;i <= to; i += 0.4)
      for (let k = -r;k <= r + 0.01; k += 0.4)
        T(i, k, k > 0.1 ? d : a);
  };
  var WEAPONS = {
    sword: { two: -4.4, draw(T, q) {
      const end = q.two ? -6.5 : -2.6;
      haft(T, end, 2.2, STEEL.grip, STEEL.gripD);
      for (let k = -1.4;k <= 1.4; k += 0.4)
        T(end - 0.4, k, STEEL.gold);
      for (let k = -4.6;k <= 4.6; k += 0.4)
        T(2.6, k, Math.abs(k) > 3.8 ? STEEL.goldD : STEEL.gold), T(3, k, STEEL.goldD);
      blade(T, 3.2, 25, 2.2);
    } },
    greatsword: { two: -4.8, draw(T) {
      haft(T, -7.2, 2.2, STEEL.grip, STEEL.gripD);
      for (let k = -1.8;k <= 1.8; k += 0.4)
        T(-7.6, k, STEEL.gold);
      for (let k = -6.6;k <= 6.6; k += 0.4)
        T(2.6, k, Math.abs(k) > 5.6 ? STEEL.goldD : STEEL.gold), T(3, k, STEEL.goldD);
      blade(T, 3.2, 31, 3);
      for (let i = 4;i <= 28; i += 0.4)
        T(i, 0, STEEL.b);
    } },
    dagger: { draw(T) {
      haft(T, -2.4, 1.8, STEEL.grip, STEEL.gripD);
      for (let k = -2.6;k <= 2.6; k += 0.4)
        T(2.2, k, STEEL.goldD);
      blade(T, 2.6, 10, 1.3);
    } },
    spear: { two: -12, draw(T) {
      haft(T, -18, 36, STEEL.wood, STEEL.woodD, 0.5);
      blade(T, 36, 11, 2);
      for (let k = -2.4;k <= 2.4; k += 0.4)
        T(36, k, STEEL.goldD);
    } },
    hammer: { two: -7, draw(T) {
      for (const lift of [-0.8, 0, 0.8])
        for (let i = -10;i <= 18; i += 0.4)
          for (let k = -0.8;k <= 0.81; k += 0.4)
            T(i, k, k > 0.1 ? STEEL.woodD : STEEL.wood, lift);
      for (let i = 18;i <= 28; i += 0.4)
        for (let k = -9;k <= 9; k += 0.4) {
          const face = Math.abs(k) > 7.4 ? k < 0 ? STEEL.a : STEEL.d : i < 20 ? STEEL.hi : i > 26.4 ? STEEL.d : Math.abs(k) < 2 ? STEEL.gold : STEEL.b;
          T(i, k, face, 4.5);
          T(i, k, face, -4.5);
          if (i < 18.4 || i > 27.6 || Math.abs(k) > 8.6)
            for (let l = -4;l <= 4; l += 0.4)
              T(i, k, k < 0 ? STEEL.a : i > 27.6 ? STEEL.d : STEEL.b, l);
        }
    } },
    scythe: { two: -11, draw(T) {
      haft(T, -16, 31, STEEL.dark, STEEL.darkD, 0.5);
      for (let j = 0;j <= 28; j += 0.4) {
        const u = j / 28, w = 3.2 * (1 - u) + 0.3, b = 31.5 - u * u * 12;
        for (let k = -w;k <= w; k += 0.4)
          T(b + k, j + 0.8, k > w * 0.3 ? STEEL.hi : k < -w * 0.4 ? STEEL.d : STEEL.b);
      }
    } },
    claw: { draw(T) {
      for (const q0 of [-2.4, 0, 2.4])
        for (let i = 2;i <= 9.5; i += 0.4) {
          const u = (i - 2) / 7.5, k = q0 + u * u * 1.8;
          T(i, k, u > 0.55 ? STEEL.hi : STEEL.a);
          if (u < 0.6)
            T(i, k + 0.8, STEEL.d);
        }
    } },
    bow: { across: true, draw(T, q, off) {
      for (let u = -1;u <= 1.001; u += 0.025) {
        const k = u * 17, i = 6 * (1 - u * u) - 1;
        T(i, k, Math.abs(u) > 0.85 ? STEEL.goldD : STEEL.wood);
        T(i + 0.8, k, STEEL.woodD);
      }
      const tipA = T.at(-1, -17), tipB = T.at(-1, 17), mid = q.pull ? off : T.at(-1, 0);
      const line = (A, B, c) => {
        const n = Math.max(2, Math.ceil(len(sub(B, A)) / 0.4)), Z = STEEL.a;
        for (let k = 0;k <= n; k++) {
          const P = add(A, mul(sub(B, A), k / n)), wx = Math.round(P[0]), wy = Math.round(P[1]), idx = (OY - wy) * BW + (OX + wx);
          curFrameIndex = -1;
          plot(idx, P[2] + 0.05, 2, PART.weapon, 2, wx, wy, c ?? Z);
        }
      };
      line(tipA, mid);
      line(tipB, mid);
      if (q.nocked) {
        const nock = mid, tip = T.at(13, 0);
        line(nock, tip, STEEL.wood);
        for (let i = 9;i <= 13; i += 0.4)
          for (let k = -(13 - i) * 0.45;k <= (13 - i) * 0.45; k += 0.4)
            T(i, k, STEEL.hi);
      }
    } },
    pistol: { across: true, draw(T) {
      for (let i = -1;i <= 9.5; i += 0.4)
        for (let k = -4.2;k <= -2.4; k += 0.4)
          T(i, k, k < -3.6 ? STEEL.a : k > -2.9 ? STEEL.d : STEEL.b);
      for (let i = -1.2;i <= 1.2; i += 0.4)
        for (let k = -2.4;k <= 2.4; k += 0.4)
          T(i, k, STEEL.gripD);
      T(9, -4.6, STEEL.hi);
    } },
    launcher: { two: -9, draw(T) {
      for (let i = -14;i <= 22; i += 0.4)
        for (let k = -6;k <= -1; k += 0.4)
          T(i, k, k < -4.8 ? STEEL.oliveA : k > -2.2 ? STEEL.oliveD : Math.abs(i - 3) < 1.4 ? STEEL.gold : STEEL.olive);
      for (let k = -6.8;k <= -0.2; k += 0.4)
        T(22.4, k, STEEL.b), T(-14.4, k, STEEL.d);
    } },
    handle: { draw(T) {
      haft(T, -2.6, 6, STEEL.grip, STEEL.gripD);
      for (let k = -1.6;k <= 1.6; k += 0.4)
        T(-3, k, STEEL.gold), T(6.4, k, STEEL.gold);
    } }
  };
  var REST_FRAMES = null;
  REST_FRAMES = solve({}).B;
  var CACHE = new Map;

  // ../vendor_src/pixelfx/src/core/act.js
  var TW = 38;
  var TH = 52;
  var TP = Object.fromEntries(Object.entries({ ink: "#0b0a1a", wood: "#724c2e", woodL: "#a0703a", woodD: "#4e331f", straw: "#d2aa55", strawL: "#f0d98a", burlapD: "#86643a", burlap: "#b38b57", burlapL: "#c9a26c", red: "#9a2f3c", redL: "#c4434f", white: "#ffffff" }).map(([k, v]) => [k, hex(v)]));
  var DUST = ["#efe7dc", "#c9bfb8", "#8f8693", "#5a5468"].map(hex);
  var DUMMY = new Uint32Array(TW * TH);
  (function buildDummy() {
    const px = (x, y, c) => {
      if (x >= 0 && y >= 0 && x < TW && y < TH)
        DUMMY[y * TW + x] = c;
    };
    const R = (x, y, w, h, c) => {
      for (let j = 0;j < h; j++)
        for (let i = 0;i < w; i++)
          px(x + i, y + j, c);
    };
    R(15, 38, 8, 14, TP.ink);
    R(16, 34, 6, 18, TP.wood);
    R(16, 34, 2, 18, TP.woodL);
    R(20, 34, 2, 18, TP.woodD);
    R(1, 18, 36, 1, TP.ink);
    R(1, 23, 36, 1, TP.ink);
    R(1, 19, 36, 4, TP.wood);
    R(1, 19, 36, 1, TP.woodL);
    R(1, 22, 36, 1, TP.woodD);
    for (const [bx, s] of [[0, -1], [33, 1]]) {
      R(bx, 17, 5, 8, TP.straw);
      for (const [dx, dy, c] of [[2, 16, TP.straw], [3, 15, TP.strawL], [1, 17, TP.strawL], [2, 25, TP.straw], [1, 26, TP.strawL], [3, 25, TP.burlapD], [2, 19, TP.strawL], [3, 21, TP.strawL], [1, 22, TP.burlapD], [2, 23, TP.strawL]])
        px(bx + dx, dy, c);
      px(s < 0 ? bx - 1 : bx + 5, 19, TP.straw);
      px(s < 0 ? bx - 1 : bx + 5, 22, TP.strawL);
    }
    const sack = (x, y, w, h) => {
      R(x + 1, y, w - 2, 1, TP.ink);
      R(x + 1, y + h - 1, w - 2, 1, TP.ink);
      R(x, y + 1, 1, h - 2, TP.ink);
      R(x + w - 1, y + 1, 1, h - 2, TP.ink);
      R(x + 1, y + 1, w - 2, h - 2, TP.burlap);
      R(x + w - 4, y + 1, 3, h - 2, TP.burlapD);
      R(x + 1, y + h - 3, w - 2, 2, TP.burlapD);
      R(x + 1, y + 1, 1, h - 4, TP.burlapL);
      R(x + 1, y + 1, w - 6, 1, TP.burlapL);
      for (let j = y + 2;j < y + h - 2; j += 3)
        for (let i = x + 3 + j % 2;i < x + w - 4; i += 4)
          px(i, j, TP.burlapD);
    };
    sack(9, 17, 20, 24);
    for (let y = 19;y < 36; y++)
      for (let x = 11;x < 27; x++) {
        const d = Math.hypot(x - 18.5, y - 27);
        if (d > 4 && d < 5.4 || d < 1.9)
          px(x, y, x + y < 45 ? TP.redL : TP.red);
      }
    for (let x = 10;x < 28; x++) {
      px(x, 36, x & 1 ? TP.woodL : TP.straw);
      px(x, 37, x & 1 ? TP.woodD : TP.wood);
    }
    for (const [x, y, c] of [[11, 41, TP.straw], [12, 42, TP.strawL], [14, 41, TP.strawL], [15, 42, TP.straw], [23, 41, TP.straw], [24, 42, TP.strawL], [26, 41, TP.straw], [13, 43, TP.straw], [25, 43, TP.straw]])
      px(x, y, c);
    sack(10, 1, 18, 16);
    for (const ex of [14, 23])
      for (let d = -2;d <= 2; d++) {
        px(ex + d, 7 + d, TP.ink);
        px(ex - d, 7 + d, TP.ink);
      }
    for (let x = 14;x < 24; x++)
      px(x, 12, x & 1 ? TP.ink : TP.burlapD);
    for (const x of [15, 18, 21]) {
      px(x, 11, TP.ink);
      px(x, 13, TP.ink);
    }
    for (let x = 12;x < 26; x++) {
      px(x, 16, x & 1 ? TP.woodL : TP.straw);
      px(x, 17, x & 1 ? TP.wood : TP.woodD);
    }
    for (const [x, y, c] of [[13, 0, TP.straw], [15, 0, TP.strawL], [18, 0, TP.straw], [21, 0, TP.strawL], [24, 0, TP.straw], [9, 4, TP.straw], [28, 6, TP.straw], [8, 7, TP.strawL], [29, 3, TP.strawL]])
      px(x, y, c);
  })();
  var SKINS = { flash: [TP.white, 1], char: [hex("#1a0c0e"), 0.72], ice: [hex("#a8e8ff"), 0.72], shadow: [hex("#3a1a70"), 0.5], holy: [hex("#fff4c0"), 0.5], red: [hex("#ff2040"), 0.45], shock: [hex("#8fd6ff"), 0.6], poison: [hex("#58c43a"), 0.5] };
  var STRAW = [TP.strawL, TP.straw, TP.straw, TP.burlapD, TP.burlapD];
  var REST_MASK = new Uint8Array(24 * 38);
  var REST_PX = new Uint32Array(24 * 38);
  HERO2.forEach((row, r) => [...row].forEach((ch, c) => {
    if (ch !== ".") {
      REST_MASK[r * 24 + c] = 1;
      REST_PX[r * 24 + c] = hex(DUMMY_PAL[ch]);
    }
  }));
  var NEAREST = new Int16Array(24 * 38).fill(-1);
  for (let r = 0;r < 38; r++)
    for (let c = 0;c < 24; c++) {
      let best = -1, bd = 1e9;
      for (let y = Math.max(0, r - 7);y < Math.min(38, r + 8); y++)
        for (let x = Math.max(0, c - 7);x < Math.min(24, c + 8); x++) {
          const d = (x - c) * (x - c) + (y - r) * (y - r);
          if (REST_MASK[y * 24 + x] && d < bd) {
            bd = d;
            best = y * 24 + x;
          }
        }
      NEAREST[r * 24 + c] = best;
    }
  // ../vendor_src/pixelfx/src/core/poses.js
  var READY = { crouch: 3, fx: 11, fy: -21, bx: 9, by: -21, ffx: 7, fbx: -7 };
  // ../vendor_src/pixelfx/src/fx/melee/sword-slash.js
  var meta = {
    name: "Sword slash",
    desc: "A tilted crescent whips round in two frames, cools from white to deep blue as it trails off, glints at the tip and throws sparks.",
    tags: ["melee", "slash", "sword", "combat", "directional", "one-shot"],
    size: [136, 104],
    origin: [44, 92],
    duration: 0.75,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: {
      palette: ["#212f6b", "#2c58aa", "#3a8bd8", "#62c8f4", "#b8c9e8", "#e8f1ff", "#ffffff"],
      sparks: ["#fff3a6", "#ffe26b", "#ff8a2a", "#f2561d"],
      radius: 42,
      seed: 2
    }
  };
  var GUARD = { ...READY, weapon: "sword", fx: 12, fy: -21, sa: -0.85 };
  var WIND = { ...GUARD, x: -8, crouch: 4, lean: -4, fx: -7, fy: -35, sa: -2.65, bx: 9, by: -25, armsFront: true, ffx: 9, fbx: -8 };
  var CUT = { ...GUARD, x: 0, crouch: 2, lean: 3, fx: 16, fy: -37, sa: -1.45, bx: -7, by: -24, ffx: 11, fbx: -10, ghost: 1 };
  var DOWN = { ...GUARD, x: 2, crouch: 5, lean: 5, fx: 20, fy: -21, sa: 0.62, bx: -9, by: -24, ffx: 13, fbx: -10, toeB: true };
  var act = {
    target: { x: 58 },
    poses: [
      [-0.55, { ...GUARD, x: -8 }],
      [-0.3, WIND],
      [-0.08, { ...WIND, crouch: 5, lean: -5 }],
      [0, CUT, "snap"],
      [0.06, DOWN, "snap"],
      [0.3, { ...DOWN, x: 3, crouch: 6 }],
      [0.58, { ...GUARD, x: 1, crouch: 3, fx: 15, fy: -21, sa: 0.1, bx: -5, by: -21, ffx: 9, fbx: -7 }],
      [0.86, { ...GUARD, x: -8 }]
    ],
    hits: [{ t: 0.06, stop: 0.14, shake: 0.18, amp: 2, push: 2.8, straw: 18 }],
    dust: [{ t: 0.06, x: 16, n: 7, dir: 1 }, { t: 0.06, x: -11, n: 4, dir: -1 }]
  };
  function onArc(s, r, a) {
    const lx = Math.cos(a) * r, ly = Math.sin(a) * r * s.sy, c = Math.cos(s.rot), n = Math.sin(s.rot);
    return [s.cx + lx * c - ly * n, s.cy + lx * n + ly * c];
  }
  function crescent(p, s, ta, L, W, age) {
    if (Math.abs(L) < 0.02 || W < 0.3)
      return;
    const R = s.ramp, n = R.length, dir = Math.sign(L), span = Math.abs(L), c = Math.cos(s.rot), sn = Math.sin(s.rot), B = s.R + 2;
    p.shade(s.cx - B, s.cy - B, s.cx + B, s.cy + B, (x, y, out) => {
      const dx = x - s.cx, dy = y - s.cy, lx = dx * c + dy * sn, ly = (-dx * sn + dy * c) / s.sy, r = Math.hypot(lx, ly);
      if (r > s.R + 0.5 || r < s.R - W - 1)
        return;
      let u = dir * (Math.atan2(ly, lx) - ta) % TAU;
      if (u < 0)
        u += TAU;
      if (u > span)
        return;
      const v = u / span, w = W * Math.pow(Math.sin(Math.PI * Math.pow(v, 2.2)), 0.6);
      if (w < 0.35)
        return;
      const q = (s.R - r) / w;
      if (q < 0 || q > 1)
        return;
      const ci = q < 0.22 && age < 0.5 ? 0 : Math.round(q * (n - 1) * 0.75 + age * 2.4 - v * 0.8 + 0.4);
      out.c = R[n - 1 - clamp(ci, 0, n - 1)];
      out.a = Math.min(1, v / 0.4);
    });
    for (let u = 0;u <= span; u += 0.3) {
      const [x, y] = onArc(s, s.R - W * 0.4, ta + dir * u);
      p.glow(x, y, 5 + W, R[n - 3], 0.22 * (1 - age) * (u / span));
    }
  }
  function drawSlash(p, s, t) {
    const u = t - s.t0;
    if (u < 0)
      return;
    const span = s.a1 - s.a0, head = ease.outExpo(clamp(u / s.sweep)), tail = smooth(s.sweep + s.hold, s.sweep + s.hold + s.trail, u);
    const age = clamp(u / (s.sweep + s.hold + s.trail));
    if (tail < 1)
      crescent(p, s, s.a0 + span * tail, span * (head - tail), s.W * (1 - tail * 0.55), age);
    const th = 0.7 * (1 - clamp((u - s.sweep - s.hold) / (s.trail + 0.2)));
    if (tail > 0.02 && th > 0)
      for (let k = 0;k <= tail; k += 0.6 / (Math.abs(span) * s.R)) {
        const [x, y] = onArc(s, s.R - 0.5, s.a0 + span * k);
        p.dot(x, y, s.ramp[1], th * (0.4 + 0.6 * k));
      }
  }
  function tipOf(s) {
    const [x, y] = onArc(s, s.R - s.W * 0.3, s.a1), [x2, y2] = onArc(s, s.R - s.W * 0.3, s.a1 + Math.sign(s.a1 - s.a0) * 0.05);
    const l = Math.hypot(x2 - x, y2 - y) || 1;
    return { x, y, dx: (x2 - x) / l, dy: (y2 - y) / l };
  }
  function create(o) {
    const C = fit(o.palette, 7), Rg = new Rng(o.seed), ps = new Particles({ rng: Rg, ground: () => 0, sparks: o.sparks });
    const R0 = o.radius, a0 = -2.55, a1 = 0.95;
    const A = { cx: 6, cy: -26, R: R0, sy: 0.6, rot: -0.38, a0, a1, W: 12, t0: 0, sweep: 0.06, hold: 0.06, trail: 0.24, ramp: C };
    const E = { ...A, R: R0 * (33 / 42), W: R0 * (4.5 / 42), a0: a0 + (a1 - a0) * 0.1, a1: a1 - (a1 - a0) * (0.15 / 3.5), t0: 0.017, hold: 0.03, trail: 0.2, ramp: C.slice(0, 6) };
    const tip = tipOf(A);
    let t = 0, landed = false;
    return {
      update(dt) {
        t += dt;
        if (!landed && t >= A.sweep) {
          landed = true;
          for (let i = 0;i < 10; i++) {
            const a = Math.atan2(tip.dy, tip.dx) + Rg.range(-0.5, 0.5), sp = Rg.range(150, 400);
            ps.spawn(P.SPARK, tip.x, tip.y, Math.cos(a) * sp, Math.sin(a) * sp, Rg.range(0.12, 0.35));
          }
          for (let i = 0;i < 16; i++) {
            const a = a0 + (a1 - a0) * Rg.range(0.3, 1), [x, y] = onArc(A, A.R, a);
            const ox = x - A.cx, oy = y - A.cy, l = Math.hypot(ox, oy) || 1, sp = Rg.range(30, 100);
            ps.spawn(P.MOTE, x, y, ox / l * sp, oy / l * sp - 10, Rg.range(0.25, 0.55), C[4 + Rg.int(0, 1)], 0.6);
          }
        }
        ps.update(dt);
      },
      draw(p) {
        drawSlash(p, E, t);
        drawSlash(p, A, t);
        const g = t - A.sweep * 0.6;
        if (g > 0 && g < 0.22)
          sparkle(p, tip.x, tip.y, 9 * ease.outBack(Math.min(1, g / 0.05)) * (1 - g / 0.22), C[5], C[3], 0.6);
        if (t < 0.3) {
          const [x, y] = onArc(A, A.R - 4, A.a0 + (A.a1 - A.a0) * ease.outExpo(clamp(t / A.sweep)));
          p.glow(x, y, 40, C[3], 0.5 * (1 - t / 0.3));
        }
        ps.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/melee/_lib.js
  var swing = (o) => ({ cx: 0, cy: 0, R: 30, sy: 1, rot: 0, a0: 0, dir: 1, k: 0, ...o });
  function through(x, y, th, dir, R, span, at = 0.55, extra = {}) {
    const a = th - dir * Math.PI / 2;
    return swing({ cx: x - Math.cos(a) * R, cy: y - Math.sin(a) * R, R, sy: 1, rot: 0, a0: a - dir * span * at, dir, span, ...extra });
  }
  function onSwing(s, r, u) {
    const a = s.a0 + s.dir * u, lx = Math.cos(a) * r, ly = Math.sin(a) * r * s.sy - s.k * (s.R - r), c = Math.cos(s.rot), n = Math.sin(s.rot);
    return [s.cx + lx * c - ly * n, s.cy + lx * n + ly * c];
  }
  function travel(s, u) {
    const [x0, y0] = onSwing(s, s.R, u), [x1, y1] = onSwing(s, s.R, u + 0.01), l = Math.hypot(x1 - x0, y1 - y0) || 1;
    return { x: x0, y: y0, dx: (x1 - x0) / l, dy: (y1 - y0) / l, a: s.a0 + s.dir * u };
  }
  function plane(s, x, y) {
    const c = Math.cos(s.rot), n = Math.sin(s.rot), dx = x - s.cx, dy = y - s.cy, lx = dx * c + dy * n, ly = -dx * n + dy * c;
    if (!s.k)
      return [Math.hypot(lx, ly / s.sy), Math.atan2(ly / s.sy, lx)];
    const m = ly + s.k * s.R, A = s.sy * s.sy - s.k * s.k, B = 2 * m * s.k, Cc = lx * lx * s.sy * s.sy + m * m;
    const r = (-B + Math.sqrt(B * B + 4 * A * Cc)) / (2 * A);
    return [r, Math.atan2((m - s.k * r) / s.sy, lx)];
  }
  function smear(p, s, u0, u1, wMax, fn, half = 0, pad = 1) {
    if (u1 - u0 < 0.005)
      return;
    const c = Math.cos(s.rot), n = Math.sin(s.rot), A = s.R + pad + 1, Bn = A * s.sy + s.k * (wMax + 2);
    const hx = Math.hypot(A * c, Bn * n) + 1, hy = Math.hypot(A * n, Bn * c) + 1, rIn = s.R - wMax - 1;
    const over = Math.abs(n) * A + s.k * (wMax + 2) + 2, y0 = half > 0 ? s.cy - over : s.cy - hy, y1 = half < 0 ? s.cy + over : s.cy + hy;
    p.shade(s.cx - hx, y0, s.cx + hx, y1, (x, y, out) => {
      const [r, a] = plane(s, x, y);
      if (r > s.R + pad || r < rIn)
        return;
      if (half && (Math.sin(a) < 0 ? -1 : 1) !== half)
        return;
      let u = s.dir * (a - s.a0) % TAU;
      if (u < 0)
        u += TAU;
      while (u < u0)
        u += TAU;
      if (u > u1)
        return;
      return fn(u, r, out, a);
    });
  }
  function trace(p, s, r, u0, u1, c, a, half = 0, step = 0.6) {
    const du = step / Math.max(4, r);
    for (let u = u0;u <= u1; u += du) {
      const g = s.a0 + s.dir * u;
      if (half && (Math.sin(g) < 0 ? -1 : 1) !== half)
        continue;
      const [x, y] = onSwing(s, r, u), k = typeof a === "function" ? a(u) : a;
      if (k > 0)
        p.dot(x, y, typeof c === "function" ? c(u) : c, k);
    }
  }
  function glowAlong(p, s, r, u0, u1, rad, c, k, half = 0, step = 0.35) {
    for (let u = u0;u <= u1; u += step) {
      const g = s.a0 + s.dir * u;
      if (half && (Math.sin(g) < 0 ? -1 : 1) !== half)
        continue;
      const [x, y] = onSwing(s, r, u), kk = typeof k === "function" ? k(u) : k;
      if (kk > 0.004)
        p.glow(x, y, rad, c, kk);
    }
  }
  function slash(p, s, t, half = 0) {
    const u = t - s.t0;
    if (u < 0)
      return;
    const R = s.ramp, n = R.length, life = s.sweep + s.hold + s.trail, hot = s.hot ?? 0;
    const head = ease.outExpo(clamp(u / s.sweep)), tail = smooth(s.sweep + s.hold, life, u), age = clamp(u / life);
    const U = s.span * head, T = s.span * tail, W = s.W * (1 - tail * 0.55);
    if (tail < 1 && U - T > 0.01) {
      smear(p, s, T, U, W, (uu, r, out) => {
        const v = (uu - T) / (U - T), w = W * Math.pow(Math.sin(Math.PI * Math.pow(v, s.lens ? 1 : 2.2)), s.lens ? 0.75 : 0.6);
        if (w < 0.35)
          return;
        const q = (s.R - r) / w;
        if (q < 0 || q > 1)
          return;
        const ci = q < 0.22 && age < 0.5 || q < hot * 0.7 ? 0 : Math.round(q * (n - 1) * 0.75 + age * 2.4 - v * 0.8 + 0.4 - hot * 3);
        out.c = R[n - 1 - clamp(ci, 0, n - 1)];
        out.a = Math.min(1, v / (s.lens ? 0.1 : 0.4));
      }, half);
      glowAlong(p, s, s.R - W * 0.4, T, U, 5 + W, R[n - 3], (uu) => (0.22 + hot * 0.3) * (1 - age) * ((uu - T) / (U - T)), half, 0.3);
    }
    const th = 0.7 * (1 - clamp((u - s.sweep - s.hold) / (s.trail + 0.2)));
    if (tail > 0.02 && th > 0)
      trace(p, s, s.R - 0.5, 0, T, R[2], (uu) => th * (0.4 + 0.6 * uu / s.span), half);
  }
  var slashEnd = (s) => travel({ ...s, R: s.R - s.W * 0.3 }, s.span);
  function shavings(ps, R, s, n, colors, from = 0.3) {
    for (let i = 0;i < n; i++) {
      const [x, y] = onSwing(s, s.R, s.span * R.range(from, 1)), ox = x - s.cx, oy = y - s.cy, l = Math.hypot(ox, oy) || 1, sp = R.range(30, 100);
      ps.spawn(P.MOTE, x, y, ox / l * sp, Math.min(25, oy / l * sp) - 10, R.range(0.25, 0.55), R.pick(colors), 0.6);
    }
  }
  function stone(c) {
    c = hex(c);
    return { light: mix(scale(c, 1.35), WHITE, 0.08), body: c, shade: scale(c, 0.64), dust: mix(scale(c, 1.2), rgb(150, 140, 150), 0.3), dark: scale(c, 0.42) };
  }
  var OUTLINE = hex("#1a1422");
  function rock(p, b, st) {
    const r = 0.6 + b.s * 0.75, fade = Math.min(1, b.life / 0.5), lx = Math.cos(b.a) * r * 0.4, ly = Math.sin(b.a) * r * 0.4;
    p.shade(b.x - r - 1, b.y - r - 1, b.x + r + 1, b.y + r + 1, (x, y, out) => {
      const dx = x - b.x, dy = y - b.y, d = Math.hypot(dx * 1.15, dy);
      if (d > r + 0.9)
        return;
      const lit = dx * lx + dy * ly;
      out.c = d > r ? OUTLINE : lit < -0.4 ? st.light : lit > 0.6 ? st.shade : st.body;
      out.a = fade;
    });
  }
  function cracks(R, x0, n, reach, depth = 7, bias = 0.3) {
    const out = [];
    for (let i = 0;i < n; i++) {
      const side = R.chance(0.5 + bias * 0.5) ? 1 : -1, L = reach * R.range(0.45, 1) * (i < 2 ? 1 : 0.7), pts = [[x0 + side * R.range(0, 1.5), 0]];
      let x = pts[0][0], y = 0;
      while (Math.abs(x - x0) < L && y < depth) {
        x += side * R.range(1.5, 3.5);
        y = Math.min(depth, Math.max(0, y + R.range(-0.6, 1.6) * (Math.abs(x - x0) > 3 ? 1 : 0.3)));
        pts.push([Math.round(x), Math.round(y)]);
        if (R.chance(0.18) && pts.length > 3 && y < depth - 2) {
          const f = [[Math.round(x), Math.round(y)]];
          let fx = x, fy = y;
          for (let j = R.int(1, 3);j > 0; j--)
            fx += side * R.range(1, 3), fy += R.range(0.8, 2), f.push([Math.round(fx), Math.round(Math.min(depth + 1, fy))]);
          out.push({ pts: f, at: Math.abs(x - x0) / reach, fork: true });
        }
      }
      out.push({ pts, at: 0, fork: false });
    }
    return out;
  }
  function sliver(p, x, y, a, r, arc, c, k) {
    const n = Math.ceil(r * arc * 2.2);
    for (let j = 0;j <= n; j++) {
      const u = j / n - 0.5, th = a + u * arc, w = 1.4 * (1 - Math.abs(u) * 2);
      for (let o = -w * 0.5;o <= w * 0.5 + 0.01; o += 0.5)
        p.dot(x + Math.cos(th) * (r + o), y + Math.sin(th) * (r + o), c, k);
    }
  }
  function along(pts, len, fn) {
    let d = 0;
    for (let i = 1;i < pts.length && d < len; i++) {
      const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], l = Math.hypot(x1 - x0, y1 - y0), f = Math.min(1, (len - d) / l);
      fn(x0, y0, x0 + (x1 - x0) * f, y0 + (y1 - y0) * f, d);
      d += l;
    }
  }

  // ../vendor_src/pixelfx/src/fx/melee/hammer-smash.js
  var meta2 = {
    name: "Hammer smash",
    desc: "A hammer drops in front in a wedge of motion: a white slam with rays, a dome of force, a dent with cracks, rocks thrown up that bounce and settle, and dust.",
    tags: ["melee", "smash", "hammer", "heavy", "ground", "shockwave", "debris", "combat", "directional", "one-shot"],
    size: [208, 112],
    origin: [80, 92],
    duration: 2,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: {
      palette: ["#141834", "#242c5c", "#38479a", "#5a72d0", "#8fa8f0", "#c4d4ff", "#eef3ff", "#ffffff"],
      stone: "#4a3f69",
      seed: 9
    }
  };
  var REST_ = { ...READY, weapon: "hammer", two: true, sa: 0.62, fx: 11, fy: -21, crouch: 3 };
  var TOP = { ...REST_, x: -3, crouch: 0, lean: -3, fx: 3, fy: -41, sa: -2.1, ffx: 8, ffy: -8, fbx: -5, toeB: true };
  var SLAM = { ...REST_, x: -1, crouch: 7, lean: 6, fx: 14, fy: -19, sa: 0.62, ffx: 11, fbx: -10 };
  var act2 = {
    target: { x: 66 },
    poses: [
      [-0.72, { ...REST_, x: -3 }],
      [-0.44, { ...REST_, x: -3, crouch: 5, lean: -1, fx: 16, fy: -28, sa: -0.9 }],
      [-0.2, TOP],
      [-0.03, { ...TOP, y: -2 }],
      [0.06, { ...REST_, x: 0, y: -3, crouch: -1, lean: 2, fx: 13, fy: -41, sa: -1.2, ffx: 11, ffy: -8, ghost: 1 }, "snap"],
      [0.11, { ...REST_, x: 0, y: -1, crouch: 3, lean: 5, fx: 19, fy: -30, sa: -0.15, ffx: 13, ghost: 1 }, "snap"],
      [0.15, SLAM, "snap"],
      [0.62, { ...SLAM, crouch: 6, lean: 5 }],
      [1.02, { ...REST_, x: -2, crouch: 5, lean: 2, fx: 14, fy: -24, sa: 0.3 }],
      [1.4, { ...REST_, x: -3 }]
    ],
    hits: [{ t: 0.15, stop: 0.2, shake: 0.34, amp: 3, push: 3, straw: 26, y: -8 }],
    dust: [{ t: 0.15, x: 10, n: 8 }, { t: 0.15, x: -12, n: 5, dir: -1 }]
  };
  var SOOT = hex("#0d0a12");
  var HOT2 = ["#fff3a6", "#ffc23d", "#ff8a2a", "#c9281f"].map(hex);
  var DROP = 0.15;
  var head = (t) => {
    const x = clamp((t + 0.03) / (DROP + 0.03));
    return 0.28 * x + 0.72 * x * x;
  };
  function create2(o) {
    const C = fit(o.palette, 8), n = C.length, R = new Rng(o.seed), st = stone(o.stone), floor = () => 0;
    const ps = new Particles({ rng: R, ground: floor }), bits = new Bits({ ground: floor }), chips = new Bits({ ground: floor }), lights = new Lights;
    const A = swing({ cx: 5, cy: -25, R: 32, sy: 1, rot: 0, a0: -2.25, dir: 1 });
    let U1 = 0;
    while (onSwing(A, A.R, U1)[1] < -0.5 && U1 < 4)
      U1 += 0.005;
    const HW = 13, [X] = onSwing(A, A.R - HW / 2, U1);
    const lines = cracks(R, X, 5, 24, 6, 0);
    const rays = [-0.95, -0.6, -0.3, -0.05, 0.22, 0.5, 0.85].map((d, i) => ({ a: -Math.PI / 2 + d + R.range(-0.06, 0.06), L: (i === 3 ? 34 : i === 2 || i === 4 ? 26 : i === 1 || i === 5 ? 18 : 12) * R.range(0.9, 1.1) }));
    let t = 0, hit = false;
    const Rm = A.R - HW / 2;
    const wedge = (p) => {
      const h = head(t), U = U1 * h, after = smooth(DROP, DROP + 0.07, t), lagU = Math.max(0, U - (0.3 + 1.05 * h)), T = lagU + (U - lagU) * after * 0.8;
      if (U - T < 0.03 || after >= 1)
        return;
      const len = (U - T) * Rm;
      smear(p, A, T, U, HW + 1, (u, r, out) => {
        const lead = (U - u) * Rm, f = lead / len, w = HW * (lead < 3 ? 1 : Math.pow(1 - (lead - 3) / Math.max(1, len - 3), 0.85)) * (1 - after * 0.5);
        const off = (r - Rm) / (w / 2 + 0.01);
        if (w < 0.6 || Math.abs(off) > 1)
          return;
        let ci = lead < 2 ? 0 : Math.round(1 + f * 3.4 + Math.abs(off) * 1.4 - (off > 0.55 ? 1 : 0) + after * 3);
        if (ci > n - 3)
          return;
        out.c = C[n - 1 - Math.max(0, ci)];
      });
      if (after < 0.6)
        for (const [dr, l0, L] of [[-HW / 2 - 2, 3, 26], [-HW / 2 - 5, 9, 16], [HW / 2 + 2, 2, 30], [HW / 2 + 5, 8, 18], [-1, len + 2, 14], [3, len + 4, 9]]) {
          const r = Rm + dr;
          for (let d = l0;d < l0 + L * (1 - after); d += 0.5) {
            const u = U - d / r, k = (d - l0) / L;
            if (u < 0)
              break;
            p.dot(...onSwing(A, r, u), k < 0.25 ? C[6] : k < 0.6 ? C[5] : C[4], (1 - k) * (1 - after));
          }
        }
      const [hx, hy] = onSwing(A, Rm, U);
      p.glow(hx, hy, 34, C[4], 0.5 * (1 - smooth(DROP - 0.03, DROP, t)));
    };
    return {
      update(dt) {
        t += dt;
        if (!hit && t >= DROP) {
          hit = true;
          lights.add(X, -5, 16, WHITE, 0.35, 0.08);
          lights.add(X, -10, 64, C[4], 0.42, 0.6);
          for (let i = 0;i < 15; i++) {
            const s = R.sign();
            bits.add({ kind: B.CHUNK, x: X + s * R.range(0, 5), y: -2, vx: s * R.range(20, 105), vy: -R.range(110, 300), g: 1, drag: 0.35, bounce: 0.38, life: R.range(1.25, 1.65), a: R.range(0, TAU), va: R.range(-16, 16), s: R.pick([1, 1, 2, 2, 3]) });
          }
          for (let i = 0;i < 11; i++) {
            const a = -Math.PI / 2 + R.range(-1.2, 1.2), sp = R.range(90, 230);
            chips.add({ kind: B.SHARD, x: X + R.range(-4, 4), y: -2, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 0.9, drag: 0.5, bounce: 0.35, life: R.range(0.9, 1.5), s: 1 });
          }
          for (let i = 0;i < 40; i++) {
            const a = -Math.PI / 2 + R.range(-1.1, 1.1), sp = R.range(50, 210);
            ps.spawn(P.GRIT, X + R.range(-4, 4), -1, Math.cos(a) * sp, Math.sin(a) * sp, R.range(0.9, 1.5), R.pick([st.light, st.body, st.body, st.shade]), R.chance(0.4) ? 2 : 1);
          }
          for (let i = 0;i < 14; i++) {
            const s = i % 2 ? -1 : 1, sp = R.range(120, 260);
            ps.spawn(P.MOTE, X + s * 6, -R.range(1, 4), s * sp, -R.range(0, 30), R.range(0.18, 0.34), R.chance(0.5) ? C[6] : C[5], 0.8, R.range(0.02, 0.05));
          }
          for (let i = 0;i < 24; i++) {
            const a = -Math.PI / 2 + R.range(-1.4, 1.4), sp = R.range(150, 380);
            ps.spawn(P.SPARK, X + Math.cos(a) * 6, -2 + Math.sin(a) * 4, Math.cos(a) * sp, Math.sin(a) * sp - 30, R.range(0.12, 0.42), 0, 1, R.range(0.035, 0.08));
          }
          for (let i = 0;i < 20; i++) {
            const s = i % 2 ? -1 : 1;
            ps.spawn(P.SMOKE, X + s * R.range(2, 10), -R.range(2, 7), s * R.range(40, 125), -R.range(2, 14), R.range(0.95, 1.5), st.dust, R.range(6, 9), R.range(0.02, 0.08), PF.BIG);
          }
          for (let i = 0;i < 7; i++)
            ps.spawn(P.SMOKE, X + R.range(-6, 6), -R.range(3, 9), R.range(-20, 20), -R.range(30, 80), R.range(1, 1.4), st.dust, R.range(5, 7.5), R.range(0.04, 0.14), PF.BIG);
          for (let i = 0;i < 8; i++)
            ps.spawn(P.DUST, X + R.range(-6, 6), -R.range(1, 4), R.range(-70, 70), -R.range(8, 30), R.range(0.35, 0.7), st.dust, R.range(2, 3.5));
        }
        bits.update(dt);
        chips.update(dt);
        if (hit && t > DROP + 0.4 && t < DROP + 1.2 && R.chance(0.08)) {
          const b = R.pick(bits.list);
          if (b && b.rest)
            ps.spawn(P.STAR, b.x + R.range(-1, 1), b.y - 1.5 - b.s, 0, -2, R.range(0.25, 0.45), R.chance(0.5) ? HOT2[0] : WHITE, R.range(0.6, 1.6));
        }
        for (const b of bits.list)
          if (b.rest && !b.dusted) {
            b.dusted = true;
            for (let i = 0;i < 3; i++)
              ps.spawn(P.DUST, b.x + R.range(-1.5, 1.5), -0.5, R.sign() * R.range(8, 35), -R.range(2, 14), R.range(0.3, 0.6), st.dust, R.range(1.3, 2.6));
          }
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        const q = t - DROP;
        if (q >= 0) {
          const fade = 1 - smooth(1.3, 1.7, q);
          for (let x = -11;x <= 11; x++) {
            const u = x / 10, d = Math.abs(x) > 10 ? 0 : Math.round(3.2 * (1 - u * u) + (rand(x, 4) - 0.5) * 0.8);
            for (let y = 0;y < d; y++)
              p.dot(X + x, y, y === 0 ? SOOT : st.dark, fade);
            if (d > 0)
              p.dot(X + x, d, Math.abs(x) < 7 ? st.light : st.body, fade);
            if (Math.abs(x) >= 8)
              p.dot(X + x, -1, Math.abs(x) >= 10 ? st.body : st.light, fade);
            if (Math.abs(x) === 9 && rand(x, 7) < 0.7)
              p.dot(X + x, -2, st.body, fade);
          }
          const k = q / 0.5;
          if (k < 1)
            band(p, X, 0.5, 6 + 50 * ease.outCubic(k), 0.16, Math.max(1, 2 * (1 - k)), 1.15 - k, [st.body, C[3], C[5], C[7]], (g) => Math.sin(g) < 0);
        }
        ps.draw(p, "back");
      },
      draw(p) {
        const q = t - DROP;
        wedge(p);
        if (q >= 0) {
          const fade = 1 - smooth(1.3, 1.7, q);
          for (const c of lines) {
            const reach = 30 * ease.outCubic(clamp((q - c.at * 0.06) / 0.08)) * (c.fork ? 0.3 : 1);
            if (reach > 0)
              along(c.pts, reach, (x0, y0, x1, y1) => {
                if (q >= 0.12)
                  p.line(x0, y0 + 3, x1, y1 + 3, st.shade, fade);
                p.line(x0, y0 + 2, x1, y1 + 2, q < 0.05 ? WHITE : q < 0.12 ? C[5] : SOOT, fade);
              });
          }
          const k = q / 0.5;
          if (k < 1)
            band(p, X, 0.5, 6 + 50 * ease.outCubic(k), 0.16, Math.max(1, 2 * (1 - k)), 1.15 - k, [st.body, C[3], C[5], C[7]], (g) => Math.sin(g) >= 0);
          const d = (q - 0.045) / 0.4;
          if (d >= 0 && d < 1) {
            const r = 12 + 30 * ease.outCubic(d), th = Math.max(1, 3.6 * Math.pow(1 - d, 0.8)), a = d < 0.6 ? 1 : (1 - d) / 0.4;
            p.shade(X - r - 1, -r - 1, X + r + 1, 0, (x, y, out) => {
              const e = r - Math.hypot(x - X, y);
              if (e < 0 || e > th || y > -0.5)
                return;
              const v = e / th;
              out.c = d < 0.1 ? v < 0.6 ? WHITE : C[6] : v < 0.34 ? d < 0.45 ? WHITE : C[6] : v < 0.67 ? C[5] : C[4];
              out.a = a;
            });
            for (let i = 0;i < 7; i++) {
              const g = -Math.PI * (0.08 + i / 6 * 0.84);
              p.glow(X + Math.cos(g) * r, Math.sin(g) * r, 14, C[4], 0.36 * (1 - d));
            }
          }
          if (q < 0.2)
            for (const ry of rays) {
              const d1 = ry.L * ease.outCubic(Math.min(1, q / 0.05)), d0 = ry.L * smooth(0.04, 0.2, q), ca = Math.cos(ry.a), sa = Math.sin(ry.a);
              if (d1 - d0 < 1)
                continue;
              p.line(X + ca * (2 + d0), -1 + sa * (2 + d0), X + ca * d1, -1 + sa * d1, (u) => u < 0.5 ? WHITE : u < 0.8 ? C[6] : C[5]);
              p.glowLine(X + ca * d0, -1 + sa * d0, X + ca * d1, -1 + sa * d1, 4, C[5], 0.18 * (1 - q / 0.2));
            }
          if (q < 0.07) {
            const hot = q < 0.035, rx = hot ? 16 : 12, ry = hot ? 3 : 2;
            p.ellipse(X, 0, rx + 2, ry + 1, hot ? C[6] : C[5]);
            p.ellipse(X, 0, rx, ry, hot ? WHITE : C[7]);
          }
          if (q < 0.2) {
            const pop = Math.exp(-q / 0.05);
            p.glow(X, -5, 26, C[5], 0.3 * pop);
          }
          p.glow(X, -1, 16, HOT2[2], 0.28 * Math.exp(-q / 0.35));
        }
        for (const b of bits.list)
          rock(p, b, st);
        for (const b of chips.list) {
          const k = b.life / b.max, c = k > 0.7 ? HOT2[0] : k > 0.45 ? HOT2[1] : k > 0.25 ? HOT2[2] : HOT2[3];
          p.dot(b.x, b.y, c, Math.min(1, k * 4));
          if (!b.rest)
            p.dot(b.x - b.vx * 0.012, b.y - b.vy * 0.012, HOT2[3], Math.min(1, k * 4));
          p.glow(b.x, b.y, 4, c, 0.35 * k);
        }
        ps.draw(p, "front");
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/melee/dagger-flurry.js
  var meta3 = {
    name: "Dagger flurry",
    desc: "A flurry of small quick crescents at every angle in front of the fighter, each with a flick of sparks, finished by one big cut that glints and bursts.",
    tags: ["melee", "slash", "dagger", "combo", "flurry", "fast", "combat", "directional", "one-shot"],
    size: [148, 104],
    origin: [36, 86],
    duration: 0.95,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: {
      palette: ["#1b1630", "#3a2f63", "#6150a3", "#9480d8", "#c7b8f5", "#efe9ff", "#ffffff"],
      sparks: ["#ffffff", "#efe9ff", "#c7b8f5", "#9480d8"],
      seed: 12
    }
  };
  var BASE = { ...READY, weapon: "dagger", offWeapon: "dagger", sa: -0.5, sb: -0.9, crouch: 4, lean: 3, ffx: 11, fbx: -9, fx: 12, fy: -24, bx: 9, by: -24 };
  var near = (fx, fy, sa, o = {}) => ({ ...BASE, fx, fy, sa, bx: 4, by: -24, sb: -1, ...o });
  var far = (bx, by, sb, o = {}) => ({ ...BASE, bx, by, sb, fx: 1, fy: -23, sa: -1, ...o });
  var act3 = {
    target: { x: 60 },
    poses: [
      [-0.4, { ...BASE, x: -4 }],
      [-0.14, { ...BASE, x: -6, lean: -2, crouch: 5, fx: 2, fy: -22, sa: -1.2, bx: 2, by: -26, sb: -1.5 }],
      [-0.03, { ...BASE, x: -6, lean: -3, crouch: 6, fx: 1, fy: -21, sa: -1.2, bx: 1, by: -25, sb: -1.5 }],
      [0, near(20, -31, -0.5, { x: 2, ghost: 1 }), "snap"],
      [0.055, far(21, -23, 0.5, { x: 3 }), "snap"],
      [0.11, near(18, -36, -1, { x: 4 }), "snap"],
      [0.165, far(22, -31, -0.6, { x: 5 }), "snap"],
      [0.22, near(20, -22, 0.2, { x: 5 }), "snap"],
      [0.275, far(21, -27, 0.05, { x: 6 }), "snap"],
      [0.33, { ...BASE, x: 4, lean: -3, crouch: 5, fx: -1, fy: -33, sa: -2.5, bx: 2, by: -23, sb: -1.2 }, "snap"],
      [0.37, { ...BASE, x: 7, lean: 2, crouch: 4, fx: 16, fy: -34, sa: -1, bx: -7, by: -24, sb: -2.4, ghost: 1 }, "snap"],
      [0.43, { ...BASE, x: 9, lean: 6, crouch: 6, fx: 22, fy: -23, sa: 0.15, bx: -9, by: -24, sb: -2.6, ffx: 13, fbx: -10, toeB: true }, "snap"],
      [0.68, { ...BASE, x: 9, lean: 5, crouch: 5, fx: 21, fy: -22, sa: 0.2, bx: -8, by: -24, sb: -2.6 }],
      [1.05, { ...BASE, x: -4 }]
    ],
    hits: [
      { t: 0.05, stop: 0.015, push: 0.5, straw: 3, flash: 0.02 },
      { t: 0.105, stop: 0.015, push: -0.3, straw: 3, flash: 0.02 },
      { t: 0.16, stop: 0.015, push: 0.5, straw: 3, flash: 0.02 },
      { t: 0.215, stop: 0.015, push: -0.3, straw: 3, flash: 0.02 },
      { t: 0.27, stop: 0.015, push: 0.5, straw: 3, flash: 0.02 },
      { t: 0.325, stop: 0.015, push: -0.3, straw: 3, flash: 0.02 },
      { t: 0.42, stop: 0.12, shake: 0.18, amp: 2, push: 2.6, straw: 16 }
    ],
    dust: [{ t: 0.43, x: 20, n: 7, dir: 1 }, { t: 0, x: -6, n: 3, dir: -1 }]
  };
  var EVERY = 0.055;
  var CUTS = [
    [21, -27, -0.5, 1],
    [33, -16, 0.9, -1],
    [26, -38, 2.4, 1],
    [37, -30, -1.8, -1],
    [19, -17, 0.2, 1],
    [30, -24, 1.4, -1]
  ];
  function create3(o) {
    const C = fit(o.palette, 7), Rg = new Rng(o.seed), ps = new Particles({ rng: Rg, ground: () => 0, sparks: o.sparks }), lights = new Lights;
    const small = CUTS.map(([x, y, rot, dir], i) => swing({ cx: x, cy: y, R: Rg.range(12, 15), sy: Rg.range(0.55, 0.75), rot, a0: Rg.range(-2.8, -2.2), dir, span: Rg.range(2.3, 2.8), W: Rg.range(5.2, 6.4), t0: i * EVERY, sweep: 0.035, hold: 0.03, trail: 0.13, ramp: C }));
    const big = swing({ cx: 24, cy: -26, R: 30, sy: 0.36, k: 0.24, rot: 0.12, a0: 3, dir: -1, span: 2.85, W: 11, t0: small.length * EVERY + 0.04, sweep: 0.055, hold: 0.06, trail: 0.24, ramp: C });
    const all = [...small, big], ends = all.map(slashEnd), done = all.map(() => false);
    const slivers = [-2.6, -1.5, -0.4, 0.7].map((a) => ({ a: a + Rg.range(-0.2, 0.2), r: Rg.range(4, 7), v: Rg.range(70, 110), arc: Rg.range(0.4, 0.7) }));
    let t = 0;
    return {
      update(dt) {
        t += dt;
        all.forEach((s, i) => {
          if (done[i] || t < s.t0 + s.sweep)
            return;
          done[i] = true;
          const e = ends[i], last = s === big;
          lights.add(e.x, e.y, last ? 56 : 26, C[3], last ? 0.6 : 0.4, last ? 0.4 : 0.14);
          if (last)
            lights.add(e.x, e.y, 16, WHITE, 0.7, 0.08);
          for (let k = 0;k < (last ? 12 : 3); k++) {
            const a = Math.atan2(e.dy, e.dx) + Rg.range(-0.5, 0.5), sp = Rg.range(100, last ? 340 : 220);
            ps.spawn(P.SPARK, e.x, e.y, Math.cos(a) * sp, Math.sin(a) * sp, Rg.range(0.1, last ? 0.35 : 0.22));
          }
          shavings(ps, Rg, s, last ? 14 : 4, [C[4], C[5]]);
          if (last)
            for (let k = 0;k < 5; k++)
              ps.spawn(P.STAR, s.cx + Rg.range(-22, 22), s.cy + Rg.range(-14, 14), 0, -4, Rg.range(0.2, 0.45), Rg.chance(0.5) ? C[5] : WHITE, Rg.range(1, 2.2), Rg.range(0.05, 0.25));
        });
        ps.update(dt);
        lights.update(dt);
      },
      draw(p) {
        for (const s of all)
          slash(p, s, t);
        all.forEach((s, i) => {
          const e = ends[i], g = t - s.t0 - s.sweep * 0.6, last = s === big, life = last ? 0.24 : 0.12;
          if (g > 0 && g < life)
            sparkle(p, e.x, e.y, (last ? 10 : 4) * ease.outBack(Math.min(1, g / 0.04)) * (1 - g / life), C[5], C[3], last ? 0.6 : 0.35);
          const u = t - s.t0;
          if (u > 0 && u < s.sweep + 0.1) {
            const h = slashEnd({ ...s, span: s.span * ease.outExpo(clamp(u / s.sweep)) });
            p.glow(h.x, h.y, last ? 40 : 22, C[3], (last ? 0.5 : 0.35) * (1 - u / (s.sweep + 0.1)));
          }
        });
        const q = t - big.t0 - big.sweep;
        if (q > 0.02 && q < 0.14) {
          const k = (q - 0.02) / 0.12, e = ends[ends.length - 1];
          for (const s of slivers)
            sliver(p, e.x, e.y, s.a + Math.atan2(e.dy, e.dx), s.r + s.v * (q - 0.02), s.arc * (1 - 0.4 * k), k < 0.4 ? C[6] : k < 0.7 ? C[5] : C[4], 1 - k);
        }
        ps.draw(p);
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/melee/claw-swipe.js
  var meta4 = {
    name: "Claw swipe",
    desc: "Three claw marks rake down one after another, white-hot, cooling through orange to red, then close up from both ends and leave a dotted scar, with hot flecks and drips.",
    tags: ["melee", "claw", "swipe", "beast", "scratch", "combat", "directional", "one-shot"],
    size: [128, 96],
    origin: [36, 84],
    duration: 0.9,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: {
      palette: ["#2a0808", "#5c0f12", "#a51d1d", "#e2401f", "#ff8a2a", "#ffd166", "#fff3c4", "#ffffff"],
      sparks: ["#fff3c4", "#ffd166", "#ff8a2a", "#c42a1a"],
      seed: 8
    }
  };
  var READY_ = { ...READY, weapon: "claw", offWeapon: "claw", sa: -0.4, sb: -0.9, crouch: 5, lean: 3, fx: 14, fy: -21, bx: 8, by: -25, ffx: 9, fbx: -8 };
  var HIGH = { ...READY_, x: -6, crouch: 4, lean: -3, fx: 3, fy: -41, sa: -1.4, bx: 7, by: -18, sb: -0.3, ffx: 10 };
  var act4 = {
    target: { x: 58 },
    poses: [
      [-0.46, { ...READY_, x: -6 }],
      [-0.2, HIGH],
      [-0.05, { ...HIGH, crouch: 5 }],
      [0, { ...READY_, x: 0, crouch: 3, lean: 4, fx: 19, fy: -36, sa: -0.9, bx: -7, by: -24, ghost: 1 }, "snap"],
      [0.05, { ...READY_, x: 2, crouch: 5, lean: 6, fx: 23, fy: -24, sa: 0.5, bx: -7, by: -24, ffx: 13, fbx: -10, toeB: true }, "snap"],
      [0.1, { ...READY_, x: 3, crouch: 7, lean: 7, fx: 22, fy: -12, sa: 1.2, bx: -7, by: -24, ffx: 13, fbx: -10, toeB: true }, "snap"],
      [0.42, { ...READY_, x: 3, crouch: 6, lean: 5, fx: 21, fy: -13, sa: 1.1, bx: -6, by: -22, ffx: 13, fbx: -10 }],
      [0.9, { ...READY_, x: -6 }]
    ],
    hits: [
      { t: 0.04, stop: 0.03, push: 0.9, straw: 5, y: -30, flash: 0.03 },
      { t: 0.08, stop: 0.03, push: 0.9, straw: 5, y: -26, flash: 0.03 },
      { t: 0.12, stop: 0.08, shake: 0.14, amp: 2, push: 1.4, straw: 9, y: -18 }
    ],
    dust: [{ t: 0.1, x: 12, n: 6, dir: 1 }]
  };
  var RAKE = 0.05;
  var STAGGER = 0.04;
  var CLOSE0 = 0.16;
  var CLOSE = 0.3;
  function create4(o) {
    const C = fit(o.palette, 8), n = C.length, Rg = new Rng(o.seed), floor = () => 0;
    const ps = new Particles({ rng: Rg, ground: floor, sparks: o.sparks }), drips = new Bits({ ground: floor }), lights = new Lights;
    const marks = [0, 1, 2].map((i) => {
      const s = through(31 + i * 8, -23 + i * 2, 1.84, 1, 40, 0.84 - i * 0.05, 0.5);
      return { s, t0: i * STAGGER, W: 4.2 - i * 0.4, open: false, end: travel(s, s.span) };
    });
    let t = 0;
    const heatAt = (m) => clamp(1 - (t - m.t0) / 0.42);
    return {
      update(dt) {
        t += dt;
        for (const m of marks) {
          if (!m.open && t >= m.t0 + RAKE * 0.7) {
            m.open = true;
            lights.add(m.end.x, m.end.y - 6, 34, C[4], 0.45, 0.3);
            for (let i = 0;i < 7; i++) {
              const a = Math.atan2(m.end.dy, m.end.dx) + Rg.range(-0.5, 0.5), sp = Rg.range(110, 260);
              ps.spawn(P.SPARK, m.end.x, m.end.y, Math.cos(a) * sp, Math.sin(a) * sp, Rg.range(0.12, 0.32));
            }
            for (let i = 0;i < 5; i++) {
              const [x, y] = onSwing(m.s, m.s.R, m.s.span * Rg.range(0.15, 0.9));
              ps.spawn(P.MOTE, x, y, Rg.range(-60, -10), Rg.range(-30, 30), Rg.range(0.2, 0.4), Rg.chance(0.5) ? C[5] : C[4], 0.5);
            }
            for (let i = 0;i < 2; i++) {
              const [x, y] = onSwing(m.s, m.s.R - 1, m.s.span * Rg.range(0.35, 0.75));
              drips.add({ kind: B.DRIP, x, y, vx: Rg.range(-8, 8), vy: Rg.range(10, 40), g: 0.55, life: 1.2, c: C[3] });
            }
          }
        }
        drips.update(dt);
        ps.update(dt);
        lights.update(dt);
      },
      draw(p) {
        for (const m of marks) {
          const u = t - m.t0;
          if (u < 0)
            continue;
          const S = m.s.span, head = S * ease.outExpo(clamp(u / RAKE)), c = smooth(CLOSE0, CLOSE0 + CLOSE, u), lo = S / 2 * c, hi = Math.min(head, S - S / 2 * c);
          const heat = heatAt(m);
          if (hi - lo > 0.02) {
            smear(p, m.s, lo, hi, m.W, (uu, r, out) => {
              const v = uu / S, w = m.W * Math.pow(Math.sin(Math.PI * v), 1.15) * (1 - 0.55 * c), off = Math.abs(r - (m.s.R - m.W / 2)) / (w / 2 + 0.01);
              if (w < 0.5 || off > 1)
                return;
              const ci = Math.round((1 - heat) * 5.2 + off * 1.6 + (head < S ? (S - uu) / S : 0) * 0.5);
              out.c = C[n - 1 - clamp(ci, 0, n - 2)];
            }, 0, 2);
            glowAlong(p, m.s, m.s.R - m.W / 2, lo, hi, 11, C[4], 0.42 * heat * heat, 0, 0.2);
          }
          const k = 0.8 * (1 - clamp((u - CLOSE0 - CLOSE * 0.5) / 0.4));
          if (c > 0.05 && k > 0) {
            trace(p, m.s, m.s.R - m.W / 2, 0.04 * S, lo, C[2], k);
            trace(p, m.s, m.s.R - m.W / 2, S - lo, 0.96 * S, C[2], k);
          }
          const g = u - RAKE * 0.4;
          if (g > 0 && g < 0.16)
            sparkle(p, m.end.x, m.end.y, 5 * ease.outBack(Math.min(1, g / 0.04)) * (1 - g / 0.16), C[6], C[4], 0.4);
        }
        drips.draw(p);
        ps.draw(p);
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/impacts/hit-spark.js
  var meta5 = {
    name: "Hit spark",
    desc: "The everyday hit: a sharp, lopsided cross flare with one long ray along the blow round a white diamond core, then a cone of sparks and hot chips that fall and bounce.",
    tags: ["impact", "hit", "spark", "combat", "directional", "one-shot"],
    size: [136, 80],
    origin: [44, 64],
    duration: 0.5,
    loop: false,
    fps: 30,
    bg: "ground",
    options: { palette: ["#4a1712", "#c9281f", "#f2561d", "#ff8a2a", "#ffe26b", "#fff3a6", "#ffffff"], height: 20, aim: 0.1, seed: 4 }
  };
  function ray(p, x, y, a, L, w, C, from = 0) {
    const c = Math.cos(a), s = Math.sin(a);
    for (let d = from * L;d <= L; d += 0.5) {
      const u = d / L, hw = w * Math.pow(1 - u, 1.6);
      const col = u < 0.3 ? WHITE : u < 0.62 ? C[5] : u < 0.88 ? C[4] : C[3];
      p.px(x + c * d, y + s * d, col);
      if (hw > 0.45)
        for (let o = 0.5;o <= hw; o += 0.5)
          for (const e of [-o, o])
            p.px(x + c * d - s * e, y + s * d + c * e, u < 0.3 && o < 1 ? C[5] : C[4]);
    }
  }
  function diamond(p, x, y, r, C) {
    for (let dy = -r - 1;dy <= r + 1; dy++)
      for (let dx = -r - 1;dx <= r + 1; dx++) {
        const m = Math.abs(dx) + Math.abs(dy);
        if (m <= r)
          p.px(x + dx, y + dy, WHITE);
        else if (m === r + 1)
          p.px(x + dx, y + dy, C[3]);
      }
  }
  function create5(o) {
    const C = fit(o.palette, 7), R = new Rng(o.seed), X = 0, Y = -o.height, A = o.aim, floor = () => 0;
    const ps = new Particles({ rng: R, ground: floor, sparks: [C[6], C[5], C[4], C[2]] });
    const lights = new Lights;
    const tilt = R.range(-0.08, 0.08);
    const rays = [
      { a: A + tilt, L: R.range(33, 37), w: 2.2 },
      { a: A + Math.PI + tilt, L: R.range(8, 10), w: 2.2 },
      { a: A - Math.PI / 2 + tilt, L: R.range(15, 18), w: 2.6 },
      { a: A + Math.PI / 2 + tilt, L: R.range(10, 12), w: 2.3 },
      { a: A - Math.PI / 4 + tilt, L: R.range(5, 7), w: 1 }
    ];
    lights.add(X, Y, 38, C[4], 0.35, 0.18);
    lights.add(X + Math.cos(A) * 10, Y + Math.sin(A) * 10, 22, C[5], 0.45, 0.1);
    lights.add(X, -2, 26, C[3], 0.22, 0.22);
    for (let i = 0;i < 9; i++) {
      const a = A + R.range(-0.6, 0.6) - 0.15, v = R.range(170, 360);
      ps.spawn(P.SPARK, X + 1, Y, Math.cos(a) * v, Math.sin(a) * v - 40, R.range(0.25, 0.45), WHITE, 1, i > 6 ? R.range(0.01, 0.03) : 0);
    }
    for (let i = 0;i < 6; i++) {
      const a = A + R.range(-1.1, 0.5) - 0.3, v = R.range(70, 170);
      ps.spawn(P.GRIT, X + 1, Y, Math.cos(a) * v, Math.sin(a) * v - R.range(30, 80), R.range(0.35, 0.45), R.pick([C[5], C[4], C[4], C[3]]), 1);
    }
    let t = 0;
    return {
      update(dt) {
        t += dt;
        ps.update(dt);
        lights.update(dt);
      },
      draw(p) {
        ps.draw(p);
        if (t < 0.025) {
          for (const r of rays)
            ray(p, X, Y, r.a, r.L, r.w, C);
          diamond(p, X, Y, 4, C);
        } else if (t < 0.058) {
          for (const r of rays)
            ray(p, X, Y, r.a, r.L * 1.2, r.w * 0.55, C, 0.12);
          diamond(p, X, Y, 3, C);
        } else if (t < 0.092) {
          const r = rays[0];
          ray(p, X, Y, r.a, r.L * 1.3, 0.6, [C[0], C[1], C[2], C[3], C[3], C[4]], 0.4);
        }
        const pop = Math.exp(-t / 0.045);
        if (pop > 0.02) {
          p.glow(X, Y, 22, C[4], 0.3 * pop);
          p.glow(X, Y, 7, WHITE, 0.15 * pop);
          p.glowLine(X, Y, X + Math.cos(A) * 26, Y + Math.sin(A) * 26, 4, C[5], 0.25 * pop);
        }
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/impacts/_lib.js
  var SOOT2 = hex("#0d0a12");
  var OUTLINE2 = hex("#1a1422");
  var LIGHT2 = Math.atan2(-1, -1);
  function stone2(c) {
    c = hex(c);
    return { light: mix(scale(c, 1.35), WHITE, 0.08), body: c, shade: scale(c, 0.64), dust: mix(scale(c, 1.2), rgb(150, 140, 150), 0.3), lip: mix(scale(c, 1.55), WHITE, 0.12) };
  }
  function spikes(R, n, aim, { len = [7, 10], w = [1.5, 2.1], fwd = 1.8, back = 0.6, jag = 1, jit = 0.18 } = {}) {
    return Array.from({ length: n }, (_, i) => {
      const a = aim + i / n * TAU + R.range(-jit, jit), cb = Math.cos(a - aim);
      const L = R.range(len[0], len[1]) * (1 + fwd * Math.pow(Math.max(0, cb), 3) + back * Math.pow(Math.max(0, -cb), 3)) * (i % 2 ? jag : 1);
      return { a, len: L, w: R.range(w[0], w[1]) * (i % 2 ? Math.sqrt(jag) : 1) };
    });
  }
  function star2(p, x, y, list, sc, th, [rim, body, inner, core], a = 1, heart = 2.4) {
    for (let pass = 0;pass < 3; pass++)
      for (const s of list) {
        const c = Math.cos(s.a), sn = Math.sin(s.a), L = s.len * sc;
        for (let d = 0;d <= L; d += 0.5) {
          if (pass === 2 && d > L * 0.55)
            break;
          const hw0 = s.w * th * (1 - d / L) * Math.min(1, 0.5 + d / 3);
          const hw = pass === 0 ? hw0 + 0.8 : pass === 1 ? hw0 : hw0 * 0.45;
          const col = pass === 0 ? rim : pass === 1 ? d < L * 0.35 ? inner : body : core;
          for (let o = -hw;o <= hw; o += 0.5)
            p.dot(x + c * d - sn * o, y + sn * d + c * o, col, a);
        }
      }
    const r = heart * sc * Math.sqrt(th);
    p.circle(x, y, r + 0.8, inner, a);
    p.circle(x, y, r, core, a);
  }
  function brokenRing(p, x, y, r, th, segs, brk, c, c2 = c, k = 1, sy = 1, maxY = Infinity) {
    if (r <= 0 || k <= 0)
      return;
    const full = TAU / segs.length;
    for (const s of segs) {
      const span = full * (1 - s.gap * brk) + 0.02, rr = r * (1 + s.dr * brk), m = Math.max(4, Math.ceil(rr * span * 1.8));
      for (let j = 0;j <= m; j++) {
        const u = j / m, ang = s.a + (u - 0.5) * span, w = Math.max(0.5, th * (s.w ?? 1) * (1 - brk * Math.pow(Math.abs(2 * u - 1), 1.6)));
        const ca = Math.cos(ang), sa = Math.sin(ang);
        for (let o = -w / 2;o <= w / 2 + 0.01; o += 0.5)
          if (y + sa * (rr + o) * sy < maxY)
            p.dot(x + ca * (rr + o), y + sa * (rr + o) * sy, o > -0.26 ? c : c2, k);
      }
    }
  }
  function walk(R, x, y, a, L, { jit = 0.55, steer = 0.45, step = [2, 4], maxY = Infinity, d0 = 0 } = {}) {
    const pts = [[x, y, d0]];
    let d = 0, cur = a;
    while (d < L - 0.01) {
      const s = Math.min(L - d, R.range(step[0], step[1]));
      cur += R.range(-jit, jit) + (a - cur) * steer;
      x += Math.cos(cur) * s;
      y = clamp(y + Math.sin(cur) * s, 0.5, maxY);
      d += s;
      pts.push([x, y, d0 + d]);
    }
    return pts;
  }
  function makeCracks(R, n, { len = [14, 40], dive = 0.85, maxY = 22, forks = 0.5, x0 = [1, 5] } = {}) {
    const out = [];
    for (let i = 0;i < n; i++) {
      const side = i % 2 ? 1 : -1, dip = 0.06 + Math.pow(R.next(), 1.7) * dive, L = R.range(len[0], len[1]) * (1 - 0.5 * dip / (dive + 0.06));
      const a = side > 0 ? dip : Math.PI - dip, pts = walk(R, side * R.range(x0[0], x0[1]), R.range(0.5, 1.5), a, L, { maxY });
      const c = { pts, len: L, t0: R.range(0, 0.035), kids: [] };
      for (let j = 2;j < pts.length - 1; j++)
        if (R.chance(forks * 0.4)) {
          const [fx, fy, fd] = pts[j];
          c.kids.push(walk(R, fx, fy, a + R.sign() * R.range(0.45, 1), R.range(3, 9) * (1 - 0.5 * j / pts.length), { maxY, d0: fd, jit: 0.7, step: [1.5, 3] }));
        }
      out.push(c);
    }
    return out;
  }
  function drawCracks(p, cracks, g, heat, hot, dark, lip, k = 1) {
    if (k <= 0)
      return;
    const col = (d) => {
      const h = heat(d);
      return h > 0.75 ? hot[0] : h > 0.5 ? hot[1] : h > 0.3 ? hot[2] : h > 0.12 ? hot[3] : dark;
    };
    for (const c of cracks) {
      const G = g(c);
      if (G <= 0)
        continue;
      for (const path of [c.pts, ...c.kids]) {
        for (let i = 1;i < path.length; i++) {
          const [x0, y0, d0] = path[i - 1], [x1, y1, d1] = path[i];
          if (d0 >= G)
            break;
          const f = d1 > G ? (G - d0) / (d1 - d0) : 1, ex = x0 + (x1 - x0) * f, ey = y0 + (y1 - y0) * f;
          p.line(x0, y0 + 1, ex, ey + 1, lip, (u) => rand(Math.round(x0 + (ex - x0) * u), Math.round(y0 + (ey - y0) * u), 5) < 0.3 ? k * 0.8 : 0);
          p.line(x0, y0, ex, ey, (u) => col(d0 + (d1 - d0) * f * u), k);
          const h = heat(d0);
          if (h > 0.12)
            p.glow((x0 + ex) / 2, (y0 + ey) / 2, 4 + h * 4, hot[2], 0.22 * h * k);
        }
      }
    }
  }
  function frontCrescent(p, x, dir, h, w, cols, k = 1) {
    if (h < 1 || w < 0.3 || k <= 0)
      return;
    const ry = h * 0.8, cy = -h * 0.2, rx = Math.max(2, h * 0.55);
    const x0 = dir > 0 ? x - rx - w - 1 : x - 1, x1 = dir > 0 ? x + 1 : x + rx + w + 1;
    p.shade(x0, -h - 1, x1, 0, (px, py, out) => {
      if (py > 0)
        return;
      const ey = (py - cy) / ry;
      if (ey <= -1 || ey >= 1)
        return;
      const e2 = 1 - ey * ey, edge = rx * Math.sqrt(e2) - rx, wt = w * Math.pow(e2, 0.45), q = (edge - (px - x) * dir) / Math.max(0.5, wt);
      if (q < 0 || q > 1)
        return;
      out.c = q < 0.28 ? cols[0] : q < 0.62 ? cols[1] : cols[2];
      out.a = k * (ey < -0.8 ? 0.7 : 1) * (q > 0.7 ? 1.25 - q * 0.8 : 1);
    });
  }
  var rockShape = (R, n = 6) => Array.from({ length: n }, () => R.range(0.7, 1.12));
  function rock2(p, b, st) {
    const r = 0.75 + b.s * 0.8, n = b.pts.length, fade = Math.min(1, b.life / 0.5), ca = Math.cos(b.a), sa = Math.sin(b.a);
    p.shade(b.x - r - 2, b.y - r - 2, b.x + r + 2, b.y + r + 2, (x, y, out) => {
      const dx = x - b.x, dy = y - b.y, u = dx * ca + dy * sa, v = -dx * sa + dy * ca, d = Math.hypot(u, v);
      let ang = Math.atan2(v, u);
      if (ang < 0)
        ang += TAU;
      const f = ang / TAU * n, i = Math.floor(f) % n, w = f - Math.floor(f), edge = r * (b.pts[i] * (1 - w) + b.pts[(i + 1) % n] * w);
      if (d > edge + 0.85)
        return;
      out.a = fade;
      if (d > edge)
        return OUTLINE2;
      const lit = Math.cos((i + 0.5) / n * TAU + b.a - LIGHT2);
      if (d < edge * 0.42)
        return lit > 0.55 ? st.light : st.body;
      return lit > 0.35 ? st.light : lit < -0.4 ? st.shade : st.body;
    });
  }

  // ../vendor_src/pixelfx/src/fx/impacts/crit-hit.js
  var meta6 = {
    name: "Critical hit",
    desc: "A critical hit: a jagged starburst slams in white and overshoots, a ring breaks into flying arcs, sparks streak off, shards tumble to the floor under a big flare.",
    tags: ["impact", "hit", "crit", "critical", "combat", "directional", "one-shot"],
    size: [216, 136],
    origin: [84, 106],
    duration: 0.9,
    loop: false,
    fps: 30,
    bg: "ground",
    options: { palette: ["#2a0510", "#5c0a1c", "#a3142a", "#e0302c", "#ff7a2a", "#ffc23d", "#fff09a", "#ffffff"], height: 26, aim: 0.12, seed: 3 }
  };
  var KEYS = [
    [0, 1, 1, 1, [6, 7, 7, 7]],
    [0.025, 1.3, 1, 1, [2, 5, 6, 7]],
    [0.058, 1.05, 0.72, 1, [2, 4, 5, 6]],
    [0.092, 1.22, 0.3, 1, [1, 2, 3, 4]],
    [0.125]
  ];
  function flare2(p, x, y, L, k, C) {
    for (const [dx, dy, len] of [[1, 0, L], [0, 1, L * 0.45], [0.7, 0.7, L * 0.16], [0.7, -0.7, L * 0.16]])
      for (const s of [-1, 1])
        for (let d = 1;d <= len; d++) {
          const u = d / len, a = u < 0.7 ? 1 : k * (1.6 - u);
          p.dot(x + s * dx * d, y + s * dy * d, u < 0.35 ? WHITE : u < 0.7 ? C[6] : C[5], a);
          if (dy === 0 && u < 0.42)
            for (const e of [-1, 1])
              p.dot(x + s * d, y + e, u < 0.2 ? C[6] : C[5], u < 0.3 ? 1 : k);
        }
    p.glowLine(x - L, y, x + L, y, 6, C[6], 0.5 * k);
    p.glowLine(x, y - L * 0.45, x, y + L * 0.45, 4, C[6], 0.3 * k);
  }
  function create6(o) {
    const C = fit(o.palette, 8), R = new Rng(o.seed), X = 0, Y = -o.height, A = o.aim, floor = () => 0;
    const ps = new Particles({ rng: R, ground: floor, sparks: [C[7], C[6], C[5], C[3]] });
    const bits = new Bits({ ground: floor }), lights = new Lights;
    const sp = spikes(R, 14, A, { len: [11, 15], w: [1.8, 2.5], fwd: 1.4, back: 0.6, jag: 0.5 });
    [...sp].sort((a, b) => b.len - a.len).slice(0, 2).forEach((s) => s.len *= 1.3);
    const segs = Array.from({ length: 7 }, (_, i) => {
      const a = A + i / 7 * TAU;
      return { a, gap: R.range(0.55, 0.85), dr: R.range(0.08, 0.4) + 0.15 * Math.max(0, Math.cos(a - A)), w: 0.7 + 0.5 * Math.max(0, Math.cos(a - A)) };
    });
    lights.add(X, Y, 84, C[5], 0.6, 0.5);
    lights.add(X, Y, 30, WHITE, 0.7, 0.1);
    lights.add(X, -4, 44, C[4], 0.3, 0.45);
    for (let i = 0;i < 36; i++) {
      const back = R.chance(0.22), a = (back ? A + Math.PI : A) + R.range(-1, 1) * (back ? 0.6 : 0.8), v = R.range(170, 430) * (back ? 0.6 : 1);
      ps.spawn(P.SPARK, X, Y, Math.cos(a) * v, Math.sin(a) * v - 50, R.range(0.15, 0.5), WHITE, 1, R.chance(0.3) ? R.range(0, 0.04) : 0);
    }
    for (let i = 0;i < 10; i++) {
      const a = A + R.range(-1, 1) * 1.1 - 0.35, v = R.range(110, 280);
      bits.add({ kind: B.SHARD, x: X, y: Y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 40, g: 0.8, drag: 0.7, bounce: 0.35, life: R.range(0.55, 0.85), a: R.range(0, TAU), va: R.range(-25, 25), s: R.range(2, 4.5), c: R.pick([C[7], C[6], C[6], C[5]]) });
    }
    for (let i = 0;i < 12; i++) {
      const a = A - Math.PI / 2 + R.range(-1.4, 1.4), v = R.range(35, 110);
      ps.spawn(P.MOTE, X + Math.cos(a) * 4, Y + Math.sin(a) * 4, Math.cos(a) * v, Math.sin(a) * v - 15, R.range(0.35, 0.7), R.pick([C[6], C[5], C[5]]), 0.6, R.range(0, 0.05));
    }
    for (let i = 0;i < 5; i++) {
      const a = R.range(0, TAU), d = R.range(14, 34);
      ps.spawn(P.STAR, X + Math.cos(a) * d, Y + Math.sin(a) * d * 0.8, 0, -4, R.range(0.22, 0.38), R.chance(0.5) ? C[6] : WHITE, R.range(1.6, 3), R.range(0.08, 0.32));
    }
    let t = 0;
    return {
      update(dt) {
        t += dt;
        ps.update(dt);
        bits.update(dt);
        lights.update(dt);
      },
      draw(p) {
        const u = clamp((t - 0.03) / 0.37);
        if (t >= 0.03 && u < 1) {
          const r = 10 + 30 * ease.outCubic(u), brk = smooth(0.12, 0.6, u), th = Math.max(1, 3.6 * Math.pow(1 - u, 1.2));
          const i = u < 0.12 ? 7 : u < 0.3 ? 6 : u < 0.5 ? 5 : u < 0.75 ? 4 : 3;
          brokenRing(p, X, Y, r, th, segs, brk, C[i], C[Math.max(2, i - 2)], u < 0.6 ? 1 : (1 - u) / 0.4, 1, 0);
          if (u < 0.6)
            p.glowRing(X, Y, r, 6, C[5], 0.35 * Math.pow(1 - u / 0.6, 2));
        }
        bits.draw(p);
        ps.draw(p);
        const f = (t - 0.04) / 0.28;
        if (f > 0 && f < 1) {
          flare2(p, X, Y, 64 * Math.pow(1 - f, 1.3), 1 - f, C);
          p.glow(X, Y, 56, C[5], 0.4 * (1 - f));
        }
        for (let i = 0;i < KEYS.length - 1; i++)
          if (t >= KEYS[i][0] && t < KEYS[i + 1][0]) {
            const [, sc, th, a, cols] = KEYS[i];
            star2(p, X, Y, sp, sc, th, cols.map((j) => C[j]), a, 2.6);
          }
        const pop = Math.exp(-t / 0.05);
        if (pop > 0.02) {
          p.glow(X, Y, 44, C[5], 0.4 * pop);
          p.glow(X, Y, 12, WHITE, 0.6 * pop);
        }
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/impacts/blunt-hit.js
  var meta7 = {
    name: "Blunt hit",
    desc: "A heavy, soft thud: a white-hot lumpy blob cools to cream in a warm pool of light, inked wedges jab out and snap back, a squashed ring of dust puffs swells and drifts, clods drop.",
    tags: ["impact", "hit", "blunt", "punch", "club", "thump", "dust", "comic", "one-shot"],
    size: [128, 88],
    origin: [64, 72],
    duration: 0.9,
    loop: false,
    fps: 30,
    bg: "ground",
    options: { palette: ["#1d1620", "#4a3a3c", "#7d6a66", "#b09c90", "#dccab4", "#f6ead2", "#ffffff"], warm: "#ffc98a", dust: "#b7a8a6", clod: "#6e5a5a", height: 22, seed: 9 }
  };
  var lump = (r, a, ph) => r * (1 + 0.15 * Math.sin(5 * a + ph) + 0.08 * Math.sin(9 * a + ph * 2.3));
  function create7(o) {
    const C = fit(o.palette, 7), R = new Rng(o.seed), X = 0, Y = -o.height, PH = R.range(0, TAU), floor = () => 0;
    const WARM = hex(o.warm), DUST = hex(o.dust), st = stone2(o.clod);
    const lights = new Lights, bits = new Bits({ ground: floor });
    lights.add(X, Y, 48, WARM, 0.6, 0.4);
    lights.add(X, Y, 16, WHITE, 0.6, 0.07);
    lights.add(X, -2, 36, WARM, 0.25, 0.4);
    const wedges = Array.from({ length: 9 }, (_, i) => ({ a: i / 9 * TAU + R.range(-0.2, 0.2), len: R.range(6, 15), w: R.range(3.2, 5), r0: R.range(13, 16), t0: R.range(0.015, 0.04), out: R.range(0.04, 0.06), back: R.range(0.09, 0.14) }));
    const puffs = Array.from({ length: 30 }, (_, i) => {
      const a = i / 30 * TAU + R.range(-0.12, 0.12), side = Math.abs(Math.cos(a)), v = R.range(40, 140) * (0.6 + 0.5 * side);
      return { x: X + Math.cos(a) * 9, y: Y + Math.sin(a) * 6, vx: Math.cos(a) * v, vy: Math.sin(a) * v * 0.5, r: R.range(2.4, 6.2) * (0.75 + 0.35 * side), life: R.range(0.35, 0.85), max: 0, t0: R.range(0.03, 0.1), lift: R.range(4, 16) };
    });
    for (let i = 0;i < 5; i++)
      puffs.push({ x: X + R.range(-6, 6), y: Y - R.range(3, 6), vx: R.range(-30, 30), vy: -R.range(20, 45), r: R.range(3.5, 5.5), life: R.range(0.6, 0.85), max: 0, t0: R.range(0.05, 0.1), lift: R.range(14, 24) });
    for (const q of puffs)
      q.max = q.life;
    for (let i = 0;i < 5; i++) {
      const s = R.sign(), a = -Math.PI / 2 + s * R.range(0.5, 1.3), v = R.range(70, 140);
      bits.add({ kind: B.CHUNK, x: X + s * R.range(4, 8), y: Y + R.range(-3, 3), vx: Math.cos(a) * v, vy: Math.sin(a) * v, g: 1, drag: 0.6, bounce: 0.28, life: R.range(0.65, 0.85), a: R.range(0, TAU), va: s * R.range(8, 16), s: R.chance(0.4) ? 2 : 1, pts: rockShape(R), pvy: 0 });
    }
    const kicks = [];
    let t = 0;
    return {
      update(dt) {
        t += dt;
        for (const q of puffs) {
          if (t < q.t0)
            continue;
          q.life -= dt;
          q.vx -= q.vx * 4.5 * dt;
          q.vy -= q.vy * 4.5 * dt + (q.lift ?? 6) * dt;
          q.x += q.vx * dt;
          q.y += q.vy * dt;
        }
        for (const b of bits.list)
          b.pvy = b.vy;
        bits.update(dt);
        for (const b of bits.list)
          if (b.pvy > 60 && b.vy <= 0) {
            for (let i = 0;i < 2; i++)
              kicks.push({ x: b.x, y: -1, vx: R.sign() * R.range(8, 22), vy: -R.range(3, 10), r: R.range(1.2, 2), life: 0.4, max: 0.4, t0: 0 });
            b.pvy = 0;
          }
        for (const q of kicks) {
          q.life -= dt;
          q.vx -= q.vx * 4 * dt;
          q.vy -= q.vy * 4 * dt;
          q.x += q.vx * dt;
          q.y += q.vy * dt;
        }
        lights.update(dt);
      },
      draw(p) {
        for (const q of [...puffs, ...kicks]) {
          const k = q.life / q.max;
          if (t < q.t0 || k <= 0)
            continue;
          const r = q.r * (0.7 + (1 - k) * 0.85), a = Math.pow(k, 1.25) * Math.min(1, (t - q.t0) / 0.03), c = mix(DUST, WARM, clamp(1 - (t - 0.03) / 0.25) * 0.55);
          p.disc(q.x, q.y, r, c, (d) => 0.58 * a * (1 - d * d * 0.75));
          p.disc(q.x - r * 0.22, q.y - r * 0.32, r * 0.58, mix(c, WHITE, 0.55), (d) => 0.48 * a * (1 - d * d));
        }
        for (const b of bits.list)
          rock2(p, b, st);
        if (t < 0.058) {
          const f = t < 0.025 ? 0 : 1, R0 = f ? 13.5 : 11.5;
          p.shade(X - R0 * 1.4, Y - R0 * 1.4, X + R0 * 1.4, Y + R0 * 1.4, (x, y) => {
            const dx = x - X, dy = (y - Y) * (f ? 1.25 : 1.1), d = Math.hypot(dx, dy), ro = lump(R0, Math.atan2(dy, dx), PH + f * 0.6);
            if (d > ro)
              return;
            const q = d / ro;
            return f === 0 ? q < 0.55 ? WHITE : q < 0.86 ? C[5] : C[4] : q < 0.3 ? WHITE : q < 0.72 ? C[5] : q < 0.9 ? C[4] : C[3];
          });
        }
        for (const w of wedges) {
          const u = t - w.t0;
          if (u < 0 || u > w.out + w.back)
            continue;
          const s = u < w.out ? ease.outCubic(u / w.out) : 1 - ease.inQuad((u - w.out) / w.back), L = w.len * s;
          if (L < 1.5)
            continue;
          const ca = Math.cos(w.a), sa = Math.sin(w.a), r0 = w.r0 + 2 * s, hw = w.w * (0.6 + 0.4 * s) / 2;
          const tip = [X + ca * r0, Y + sa * r0], end = [X + ca * (r0 + L), Y + sa * (r0 + L)], n = [-sa * hw, ca * hw];
          const wedge = (g) => [[tip[0] - ca * g, tip[1] - sa * g], [end[0] + n[0] * (1 + g * 0.45) + ca * g, end[1] + n[1] * (1 + g * 0.45) + sa * g], [end[0] - n[0] * (1 + g * 0.45) + ca * g, end[1] - n[1] * (1 + g * 0.45) + sa * g]];
          p.poly(wedge(1), C[1]);
          p.poly(wedge(0), u < w.out + 0.02 ? WHITE : C[5]);
        }
        const pop = Math.exp(-t / 0.06);
        if (pop > 0.02)
          p.glow(X, Y, 28, WARM, 0.5 * pop);
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/impacts/shield-block.js
  var meta8 = {
    name: "Shield block",
    desc: "A blow is caught on a half-dome of energy in front of the character: its diamond lattice flashes, a ripple runs over it, sparks glance off, then it blinks out cell by cell.",
    tags: ["impact", "block", "shield", "barrier", "energy", "ripple", "actor", "one-shot"],
    size: [148, 104],
    origin: [40, 88],
    duration: 1.1,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: {
      palette: ["#151a3d", "#212f6b", "#2c58aa", "#3a8bd8", "#62c8f4", "#a6ecff", "#dcfbff", "#ffffff"],
      sparks: ["#fff3a6", "#ffe26b", "#ff8a2a", "#f2561d"],
      seed: 12
    }
  };
  var BRACE = { ...READY, crouch: 4, lean: 2, fx: 13, fy: -28, bx: 6, by: -21, ffx: 9, fbx: -9 };
  var act5 = {
    poses: [
      [-0.36, READY],
      [-0.1, BRACE],
      [0, { ...BRACE, x: -3, crouch: 6, lean: -2, fx: 10, fy: -26 }, "snap"],
      [0.18, { ...BRACE, x: -4, crouch: 5, lean: 0 }],
      [0.65, { ...BRACE, x: -3 }],
      [1.1, { ...READY, x: 0 }]
    ],
    hits: [{ t: 0.005, stop: 0.09, shake: 0.2, amp: 2 }],
    dust: [{ t: 0.01, x: -10, n: 6, dir: -1 }]
  };
  var CX = 3;
  var RX = 28;
  var RY = 44;
  var GRID = 3.4;
  var HIT = { lon: 1.18, lat: 0.5 };
  var GONE = 0.5;
  var onDome = (lon, lat) => [CX + RX * Math.cos(lat) * Math.sin(lon), -RY * Math.sin(lat)];
  function create8(o) {
    const C = fit(o.palette, 8), S = fit(o.sparks, 4), R = new Rng(o.seed), floor = () => 0;
    const ps = new Particles({ rng: R, ground: floor, sparks: S });
    const lights = new Lights;
    const [hx, hy] = onDome(HIT.lon, HIT.lat), sp = spikes(R, 8, 0.2, { len: [5, 8], w: [1.4, 1.9], fwd: 1.2, back: 0.3 });
    lights.add(hx, hy, 40, S[1], 0.7, 0.2);
    lights.add(hx, hy, 12, WHITE, 0.7, 0.06);
    const nA = Math.atan2(-Math.sin(HIT.lat) / RY, Math.cos(HIT.lat) * Math.sin(HIT.lon) / RX);
    for (let i = 0;i < 14; i++) {
      const a = nA + R.range(-1.2, 0.9), v = R.range(130, 300);
      ps.spawn(P.SPARK, hx + 1, hy, Math.cos(a) * v, Math.sin(a) * v - 30, R.range(0.15, 0.42), WHITE, 1, i > 10 ? R.range(0.01, 0.04) : 0);
    }
    let t = 0;
    const dome = (p, back) => {
      const fade = 1 - smooth(GONE + 0.35, GONE + 0.55, t);
      if (fade <= 0)
        return;
      for (let y = -RY - 1;y < 0; y++)
        for (let x = CX;x <= CX + RX + 1; x++) {
          const u = (x + 0.5 - CX) / RX, v = -(y + 0.5) / RY, q = u * u + v * v;
          if (q > 1 || u < 0 || v < 0)
            continue;
          const z = Math.sqrt(1 - q) * (back ? -1 : 1), lon = Math.atan2(u, z), lat = Math.asin(clamp(v));
          const a = (lon + lat) * GRID, b = (lon - lat) * GRID, fa = a - Math.floor(a), fb = b - Math.floor(b);
          const cell = rand(Math.floor(a), Math.floor(b), 31), line = Math.min(fa, 1 - fa, fb, 1 - fb) < 0.13;
          const gone = GONE + cell * 0.35;
          if (t > gone)
            continue;
          const d = Math.acos(clamp(Math.cos(lat) * Math.cos(HIT.lat) * Math.cos(lon - HIT.lon) + Math.sin(lat) * Math.sin(HIT.lat), -1, 1));
          let hit = 0;
          for (const [t0, k0] of [[0, 1], [0.12, 0.55]]) {
            const k = t - t0, front = k * 3.6;
            if (k < 0 || k > 0.55)
              continue;
            if (Math.abs(d - front) < 0.2)
              hit = Math.max(hit, k0 * (1 - k / 0.55));
            else if (d < front)
              hit = Math.max(hit, 0.3 * k0 * (1 - k / 0.55));
          }
          const rim = 1 - Math.abs(z), flash = t < 0.05, blink = t > gone - 0.06, sheen = Math.abs(((lat * 0.8 - lon * 0.3 - t * 1.6) % 1 + 1) % 1 - 0.5) < 0.05;
          if (back) {
            if (line)
              p.dot(x, y, C[3], 0.5 * fade);
            continue;
          }
          if (q > 0.9)
            p.dot(x, y, flash || hit > 0.5 ? WHITE : C[6], fade);
          else if (line)
            p.dot(x, y, flash || blink || hit > 0.5 ? WHITE : hit > 0.2 || sheen ? C[6] : rim > 0.7 ? C[5] : rim > 0.35 ? C[4] : C[3], fade);
          else
            p.blend(x, y, flash || hit > 0.35 ? C[6] : C[3], fade * Math.min(0.85, (flash ? 0.35 : 0.1 + 0.25 * rim * rim) + hit * 0.65));
          if ((x * 7 + y * 3 & 15) === 0)
            p.light(x, y, C[4], 0.15 + 0.5 * hit);
        }
    };
    return {
      update(dt) {
        t += dt;
        if (t > GONE && t < GONE + 0.38 && R.chance(0.5)) {
          const lon = R.range(0, Math.PI / 2), lat = R.range(0.05, 1.4), [x, y] = onDome(lon, lat);
          ps.spawn(P.STAR, x, y, R.range(-10, 10), -R.range(10, 40), R.range(0.2, 0.36), R.chance(0.5) ? C[6] : C[5], R.range(0.6, 1.4));
        }
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        dome(p, true);
      },
      draw(p) {
        dome(p, false);
        const fade = 1 - smooth(GONE + 0.3, GONE + 0.55, t);
        if (fade > 0)
          for (let x = CX;x <= CX + RX; x++)
            p.dot(x, 0, t < 0.05 ? WHITE : C[5], fade * (0.6 + 0.4 * ((x - CX) / RX)));
        if (t < 0.03)
          star2(p, hx, hy, sp, 1, 1, [S[3], S[0], S[1], WHITE], 1, 2);
        else if (t < 0.06)
          star2(p, hx, hy, sp, 1.25, 0.55, [S[3], S[1], S[2], S[0]], 1, 2);
        ps.draw(p);
        p.glow(CX + RX * 0.5, -RY * 0.45, RY * 0.9, C[4], 0.2 * (1 - smooth(GONE, GONE + 0.55, t)) + 0.35 * Math.exp(-t / 0.08));
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/impacts/ground-slam.js
  var meta9 = {
    name: "Ground slam",
    desc: "Something lands hard: the floor flashes and cracks, two crescent shock waves race out along it, a dust wave and a tall dust cloud rise, rocks erupt, bounce and settle.",
    tags: ["impact", "ground", "slam", "shockwave", "quake", "rocks", "dust", "one-shot"],
    size: [288, 208],
    origin: [144, 164],
    duration: 3.2,
    loop: false,
    fps: 30,
    bg: "ground",
    options: { palette: ["#2a1712", "#5e2c1c", "#a4502a", "#e8893a", "#ffc764", "#fff0b4", "#ffffff"], stone: "#4a3f69", reach: 104, seed: 5 }
  };
  var WAVE = 0.6;
  function crater(p, st, hot, C, k) {
    for (let x = -12;x <= 11; x++) {
      const q = Math.abs(x + 0.5) / 12, dep = Math.round(2.6 * (1 - q * q));
      if (q < 0.84) {
        for (let y = 0;y < dep; y++)
          p.dot(x, y, SOOT2, k);
        p.dot(x, dep, hot > 0.5 ? C[5] : hot > 0.2 ? C[4] : st.lip, k);
      } else {
        p.dot(x, -1, q > 0.93 ? st.light : st.lip, k);
        if (q < 0.9)
          p.dot(x, -2, st.light, k * 0.8);
      }
    }
  }
  function create9(o) {
    const C = fit(o.palette, 7), st = stone2(o.stone), REACH = o.reach, R = new Rng(o.seed), floor = () => 0, D = meta9.duration;
    const ps = new Particles({ rng: R, ground: floor, sparks: [C[6], C[5], C[4], C[3]] });
    const bits = new Bits({ ground: floor }), lights = new Lights, HOT = [WHITE, C[5], C[4], C[3]];
    const dustLit = mix(st.dust, WHITE, 0.2), cracks = makeCracks(R, 10, { len: [22, 58], dive: 0.55, maxY: 22, forks: 0.7, x0: [2, 9] });
    const front = (t) => 7 + (REACH - 7) * ease.outCubic(clamp((t - 0.015) / WAVE));
    const heat = (t) => Math.pow(clamp(1 - t / 0.8), 1.4);
    const crest = (u) => [6 + 28 * Math.pow(1 - u, 0.75), 1.5 + 5 * Math.pow(1 - u, 0.9)];
    const burst = [
      { a: -0.07, len: R.range(34, 40), w: 1.9 },
      { a: Math.PI + 0.07, len: R.range(34, 40), w: 1.9 },
      { a: -0.42 + R.range(-0.08, 0.08), len: R.range(15, 20), w: 1.5 },
      { a: -Math.PI + 0.42 + R.range(-0.08, 0.08), len: R.range(15, 20), w: 1.5 },
      { a: -Math.PI / 2 + R.range(-0.15, 0.15), len: R.range(18, 24), w: 1.7 },
      { a: -1.05 + R.range(-0.1, 0.1), len: R.range(10, 14), w: 1.2 },
      { a: -Math.PI + 1.05 + R.range(-0.1, 0.1), len: R.range(10, 14), w: 1.2 }
    ];
    const embers = [];
    for (const c of cracks)
      for (const [x, y, d] of c.pts)
        if (d > 3 && d < 32 && R.chance(0.25))
          embers.push({ x, y, d, life: R.range(0.8, 2.2), ph: R.range(0, TAU) });
    lights.add(0, -12, 96, C[4], 0.6, 0.6);
    lights.add(0, -4, 50, WHITE, 0.9, 0.14);
    for (let i = 0;i < 56; i++) {
      const low = i < 14, s = R.sign(), a = low ? s > 0 ? -R.range(0.04, 0.6) : Math.PI + R.range(0.04, 0.6) : -Math.PI / 2 + R.range(-1.15, 1.15);
      const sp = low ? R.range(150, 380) : R.range(200, 500);
      ps.spawn(P.SPARK, R.range(-4, 4), -1, Math.cos(a) * sp, Math.sin(a) * sp, low ? R.range(0.2, 0.5) : R.range(0.25, 0.65), WHITE, 1, low ? 0 : R.range(0, 0.05));
    }
    for (let i = 0;i < 20; i++) {
      const s = i < 3 ? 4 : R.int(1, 3), a = -Math.PI / 2 + R.range(-0.5, 0.5), sp = s > 3 ? R.range(110, 190) : R.range(170, 380) * (s > 2 ? 0.8 : 1);
      bits.add({ kind: B.CHUNK, x: R.range(-7, 7), y: -2, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 1, drag: 0.4, bounce: 0.38, life: R.range(1.9, 2.7), a: R.range(0, TAU), va: R.range(-14, 14), s, pts: rockShape(R), pvy: 0 });
    }
    for (let i = 0;i < 110; i++) {
      const u = R.range(-1, 1), a = -Math.PI / 2 + u * 0.65, sp = R.range(110, 380) * (1 - 0.35 * Math.abs(u));
      ps.spawn(P.GRIT, u * 6, -1, Math.cos(a) * sp, Math.sin(a) * sp, R.range(1, 2.2), R.pick([st.light, st.body, st.body, st.shade, st.shade, st.lip]), R.chance(0.35) ? 2 : 1);
    }
    for (let i = 0;i < 28; i++) {
      const core = i < 14, s = R.sign();
      ps.spawn(P.SMOKE, core ? R.range(-5, 5) : s * R.range(4, 12), -R.range(2, 10), core ? R.range(-12, 12) : s * R.range(14, 38), -R.range(50, 130) * (core ? 1 : R.range(0.3, 0.6)), R.range(1.9, 2.7), R.chance(0.35) ? dustLit : st.dust, core ? R.range(4.5, 9) : R.range(4, 7.5), R.range(0.02, 0.22), PF.BIG);
    }
    for (let i = 0;i < 10; i++) {
      const s = R.sign();
      ps.spawn(P.SMOKE, s * R.range(2, 14), -R.range(2, 6), s * R.range(20, 70), -R.range(4, 20), R.range(1.4, 2.3), st.dust, R.range(6, 9), R.range(0, 0.08), PF.BIG);
    }
    for (let i = 0;i < 26; i++)
      ps.spawn(P.FLAKE, R.range(-22, 22), -R.range(14, 80), R.range(-12, 12), R.range(-10, 4), R.range(1.2, 2), R.chance(0.5) ? st.lip : dustLit, R.range(0.5, 1.2), R.range(0.25, 1));
    let t = 0;
    const acc = [R.next(), R.next()];
    const ring = (p, back) => {
      const u = clamp((t - 0.015) / (WAVE + 0.1));
      if (t < 0.015 || u >= 0.9)
        return;
      band(p, 0, 0.5, front(t) + 1, 0.16, Math.max(1, 4 * Math.pow(1 - u, 0.8)), u < 0.55 ? 1.1 : (0.9 - u) / 0.35, u < 0.35 ? [C[3], C[4], C[5], C[6]] : [st.body, st.light, C[4], C[5]], (g) => Math.sin(g) < 0 === back, t < 0.09);
    };
    const fronts = (p) => {
      const u = clamp((t - 0.03) / (WAVE + 0.16));
      if (t < 0.03 || u >= 1)
        return;
      const fr = front(t), [h, w] = crest(u), k = u < 0.7 ? 1 : (1 - u) / 0.3;
      const cols = u < 0.14 ? [WHITE, C[6], C[5]] : u < 0.34 ? [C[6], C[5], C[4]] : u < 0.55 ? [C[5], C[4], st.lip] : [st.lip, st.light, st.dust];
      for (const s of [-1, 1]) {
        frontCrescent(p, s * fr, s, h, w, cols, k);
        p.glow(s * fr, -h * 0.3, 8 + h * 0.7, C[4], 0.5 * (1 - u) * k);
      }
    };
    return {
      update(dt) {
        t += dt;
        const u = clamp((t - 0.015) / WAVE);
        if (u > 0 && u < 1) {
          const fr = front(t), [h] = crest(u);
          for (let k = 0;k < 2; k++) {
            const s = k ? 1 : -1;
            for (acc[k] += dt * 120 * (1 - u * 0.7);acc[k] > 1; acc[k]--) {
              ps.spawn(P.SMOKE, s * (fr - R.range(1, 7)), -R.range(0.5, 3), s * R.range(15, 70) * (1 - u), -R.range(2, 12), R.range(1, 2.1), R.chance(0.3) ? dustLit : st.dust, R.range(2.5, 6.5) * (1 - 0.4 * u), 0, PF.BIG);
              if (R.chance(0.5))
                ps.spawn(P.DUST, s * (fr - R.range(0, 3)), -R.range(0.3, 0.9) * h, s * R.range(-15, 25), -R.range(8, 35), R.range(0.3, 0.6), R.chance(0.5) ? dustLit : st.dust, R.range(1.2, 2.4));
              if (R.chance(0.4))
                ps.spawn(P.GRIT, s * fr, -1, s * R.range(10, 60), -R.range(40, 140) * (1 - u), R.range(0.5, 1), R.pick([st.light, st.body, st.lip]), 1);
              if (u < 0.45 && R.chance(0.2))
                ps.spawn(P.SPARK, s * fr, -1, s * R.range(60, 200), -R.range(30, 160), R.range(0.12, 0.3));
            }
          }
        }
        for (const b of bits.list)
          b.pvy = b.vy;
        bits.update(dt);
        for (const b of bits.list)
          if (b.pvy > 70 && b.vy <= 0) {
            const n = b.pvy > 200 ? 3 : 2;
            for (let i = 0;i < n; i++)
              ps.spawn(P.DUST, b.x + R.range(-1.5, 1.5), -0.5, R.sign() * R.range(8, 35), -R.range(2, 16), R.range(0.3, 0.65), st.dust, R.range(1.3, 2.4) * (0.7 + b.s * 0.25));
            b.pvy = 0;
          }
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        const fade = 1 - smooth(D - 0.9, D - 0.15, t), H = heat(t);
        if (t > 0.02)
          crater(p, st, H, C, fade);
        drawCracks(p, cracks, (c) => c.len * ease.outCubic(clamp((t - c.t0) / 0.1)), (d) => H * clamp(1.2 - d / 40), HOT, SOOT2, st.light, fade);
        for (const e of embers) {
          const k = 1 - (t - 0.1) / e.life;
          if (t < 0.1 || k <= 0)
            continue;
          const f = 0.6 + 0.4 * Math.sin(t * 23 + e.ph);
          p.px(e.x, e.y, k * f > 0.55 ? C[5] : k * f > 0.25 ? C[4] : C[3]);
          p.glow(e.x, e.y, 4, C[4], 0.35 * k * f);
        }
        ring(p, true);
        ps.draw(p, "back");
      },
      draw(p) {
        ring(p, false);
        fronts(p);
        for (const b of bits.list)
          rock2(p, b, st);
        ps.draw(p, "front");
        if (t < 0.035) {
          p.ellipse(0, 0, 30, 4.5, (d) => d > 0.8 ? C[4] : d > 0.5 ? C[6] : WHITE);
          star2(p, 0, -1, burst, 1, 1, [C[4], C[6], WHITE, WHITE]);
        } else if (t < 0.07)
          star2(p, 0, -1, burst, 1.25, 0.5, [C[3], C[5], C[6], WHITE]);
        if (t < 0.14)
          p.glowLine(-80, 0, 80, 0, 10, C[5], 0.55 * (1 - t / 0.14));
        const H = heat(t);
        if (H > 0)
          p.glow(0, 1, 46, C[4], 0.35 * H);
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/status/_lib.js
  var SHAPES = new WeakMap;
  function shape(a) {
    const m = a.mask;
    let s = SHAPES.get(m);
    if (s)
      return s;
    const { w, h, data } = m, on = (x, y) => x >= 0 && y >= 0 && x < w && y < h && data[y * w + x] > 0;
    const body = [], up = [], side = [], outline = [], top = [], rows = [];
    for (let x = 0;x < w; x++) {
      let y = 0;
      while (y < h && !on(x, y))
        y++;
      top.push(y < h ? y : -1);
    }
    for (let y = 0;y < h; y++) {
      let l = -1, r = -1;
      for (let x = 0;x < w; x++) {
        if (!on(x, y))
          continue;
        if (l < 0)
          l = x;
        r = x;
        body.push([x, y]);
        if (!on(x, y - 1))
          up.push([x, y]);
        if (!on(x - 1, y))
          side.push([x, y, -1]);
        if (!on(x + 1, y))
          side.push([x, y, 1]);
      }
      rows.push([l, r]);
    }
    for (let y = -1;y <= h; y++)
      for (let x = -1;x <= w; x++) {
        if (on(x, y))
          continue;
        let nx = 0, ny = 0;
        for (let dy = -1;dy <= 1; dy++)
          for (let dx = -1;dx <= 1; dx++)
            if (on(x + dx, y + dy))
              nx -= dx, ny -= dy;
        if (on(x - 1, y) || on(x + 1, y) || on(x, y - 1) || on(x, y + 1)) {
          const l = Math.hypot(nx, ny) || 1;
          outline.push([x, y, nx / l, ny / l]);
        }
      }
    s = { w, h, on, body, up, side, outline, top, rows };
    SHAPES.set(m, s);
    return s;
  }
  var colorAt = (a, x, y) => a.pixels ? a.pixels[y * a.mask.w + x] : a.mask.data[y * a.mask.w + x] ? 4285229931 : 0;
  function wnoise(x, P, seed = 0) {
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    const a = rand(wrap(i, P), seed), b = rand(wrap(i + 1, P), seed);
    return (a + (b - a) * u) * 2 - 1;
  }
  function tnoise(t, D, f, seed = 0, off = 0) {
    const P = Math.max(2, Math.round(f * D));
    return wnoise(t / D * P + off, P, seed);
  }
  var travel2 = (v, g, d, a) => d > 0 ? g / d * a + (v - g / d) * (1 - Math.exp(-d * a)) / d : v * a + 0.5 * g * a * a;
  var LAYERS = [[1, 1, 6], [0.76, 0.86, 4], [0.54, 0.68, 2], [0.3, 0.42, 0]];
  function tongue(p, x, y, h, w, sx, F, t, D, n, layers = LAYERS) {
    if (h < 1)
      return;
    for (const [lw, lh, ri] of layers) {
      if (ri === 0 && h < 4)
        continue;
      const H = h * lh, col = F[ri];
      for (let r = 0;r <= H; r++) {
        const u = r / Math.max(1, H);
        const half = w * lw * Math.pow(1 - u, 0.85) * Math.min(1, (r + 1.5) / 3.5) + tnoise(t, D, 9, n, r * 0.45) * 0.5;
        if (half < 0.3)
          continue;
        const cx = x + sx * u * u * lh + tnoise(t, D, 4, n + 7, r * 0.2) * u * 1.1;
        for (let px = Math.round(cx - half);px <= Math.round(cx + half); px++)
          p.px(px, Math.round(y - r), col);
      }
    }
  }
  var rampAt2 = (r, t) => r[Math.min(r.length - 1, Math.max(0, Math.floor(t * r.length)))];
  function smoke(p, x, y, size, u, col, k = 1, warm = 0) {
    const r = size * (0.65 + Math.min(1, u * 2.5) * 0.45 + u * 0.4);
    const a = Math.min(1, u * 12) * Math.min(1, (1 - u) * 2.4) * 0.58 * k;
    if (a <= 0.01)
      return;
    const c = col ? mix(col, rampAt2(SMOKE_RAMP, u), u) : rampAt2(SMOKE_RAMP, u * 1.05);
    p.disc(x, y, r, c, a * 0.45);
    p.disc(x + r * 0.05, y + r * 0.06, r * 0.74, c, a * 0.62);
    if (warm && u < 0.6)
      p.disc(x + r * 0.1, y + r * 0.3, r * 0.56, mix(c, warm, 0.5), a * 0.7 * (1 - u / 0.6));
    if (u < 0.5)
      p.disc(x - r * 0.22, y - r * 0.3, r * 0.5, mix(c, WHITE, 0.12), a * 0.4 * (1 - u * 2));
  }
  function ember(p, x, y, u, E, ph, k = 1) {
    const left = 1 - u;
    if (left < 0.22 && Math.sin(ph * 40) < 0)
      return;
    const c = left > 0.5 ? Math.sin(ph * 22) > -0.2 ? E[0] : E[1] : left > 0.22 ? E[1] : E[2];
    p.px(x, y, c);
    p.glow(x, y, 3, c, 0.32 * left * k);
  }
  var EYES = new WeakMap;
  function eyes(a) {
    let list = EYES.get(a.mask);
    if (list)
      return list;
    if (a.eyes) {
      list = a.eyes.map(([x, y]) => ({ x0: x, x1: x, y0: y, y1: y + 1, px: [[x, y], [x, y + 1]], skin: colorAt(a, x, y) }));
      EYES.set(a.mask, list);
      return list;
    }
    const S = shape(a), W = S.w, col = (x, y) => S.on(x, y) ? colorAt(a, x, y) : 0;
    const dark = (x, y) => S.on(x, y) && y < S.h * 0.4 && luma(col(x, y)) < 0.15 && S.on(x - 1, y) && S.on(x + 1, y) && S.on(x, y - 1) && S.on(x, y + 1);
    const seen = new Set;
    list = [];
    for (const [x0, y0] of S.body) {
      if (seen.has(y0 * W + x0) || !dark(x0, y0))
        continue;
      const px = [], q = [[x0, y0]];
      seen.add(y0 * W + x0);
      while (q.length) {
        const [x, y] = q.pop();
        px.push([x, y]);
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
          const nx = x + dx, ny = y + dy, k = ny * W + nx;
          if (seen.has(k) || !(dark(nx, ny) || S.on(nx, ny) && luma(col(nx, ny)) > 0.95))
            continue;
          seen.add(k);
          q.push([nx, ny]);
        }
      }
      if (px.length < 2 || px.length > 14)
        continue;
      const xs = px.map((p) => p[0]), ys = px.map((p) => p[1]), counts = new Map;
      const e = { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys), px };
      for (const [x, y] of px)
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [2, 0], [-2, 0]]) {
          const c = col(x + dx, y + dy), l = luma(c);
          if (c && l > 0.5 && l < 0.95 && !px.some((p) => p[0] === x + dx && p[1] === y + dy))
            counts.set(c, (counts.get(c) ?? 0) + 1);
        }
      e.skin = [...counts].sort((p, q) => q[1] - p[1])[0]?.[0];
      if (e.skin && e.x1 - e.x0 <= 4 && e.y1 - e.y0 <= 5)
        list.push(e);
    }
    list.sort((p, q) => p.x0 - q.x0);
    if (list.length > 2)
      list = [];
    EYES.set(a.mask, list);
    return list;
  }

  // ../vendor_src/pixelfx/src/fx/status/burning.js
  var meta10 = {
    name: "Burning",
    desc: "Burning over time: small flames lick from four hot spots, trailing sparks and thin smoke; every 0.6 s they flare, the body flashes white then orange, scorch marks spread.",
    tags: ["status", "fire", "burn", "dot", "debuff", "loop"],
    size: [72, 80],
    origin: [36, 70],
    duration: 1.2,
    loop: true,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: {
      palette: ["#4a1712", "#8a1f17", "#c9281f", "#f2561d", "#ff8a2a", "#ffc23d", "#ffe26b", "#fff3a6", "#ffffff"],
      char: ["#120c0a", "#2a1a14", "#4a2c1c"],
      smoke: "#5b5566",
      seed: 3
    }
  };
  var A_ = { turn: 1, crouch: 2, lean: 2, fx: -13, fy: -38, bx: 12, by: -17, ffx: -3, ffy: -7, fbx: 5 };
  var B_ = { turn: 0.9, crouch: 3, lean: -2, fx: -12, fy: -17, bx: 13, by: -38, ffx: -4, fbx: 4, fby: -7 };
  var act6 = {
    onBody: true,
    poses: [[0, A_], [0.15, B_, "snap"], [0.3, A_, "snap"], [0.45, B_, "snap"], [0.6, A_, "snap"], [0.75, B_, "snap"], [0.9, A_, "snap"], [1.05, B_, "snap"], [1.2, A_, "snap"]]
  };
  var D = meta10.duration;
  var TICK = 0.6;
  var WIND2 = -14;
  var since = (t) => (t % TICK + TICK) % TICK;
  var flare3 = (t) => Math.exp(-since(t) / 0.12);
  var actorAlpha = (t) => since(t) < 0.034 ? 0 : 1;
  var SPOTS = new WeakMap;
  function spots(a, seed) {
    let s = SPOTS.get(a.mask);
    if (!s)
      SPOTS.set(a.mask, s = new Map);
    if (s.has(seed))
      return s.get(seed);
    const S = shape(a), { h: H, w: W } = S, R = new Rng(seed * 13 + 5);
    const at = (q, side) => {
      const my = Math.round(H * q), [l, r] = S.rows[my];
      return [side < 0 ? l : r, my];
    };
    const hair = S.up.filter(([x]) => x < W * 0.42).sort((p, q) => p[1] - q[1] || p[0] - q[0])[0];
    const shoulder = S.up.filter(([x, y]) => x > W / 2 && y > H * 0.4 && y < H * 0.62).sort((p, q) => p[1] - q[1])[0] ?? at(0.5, 1);
    const list = [
      { at: hair, side: -1, n: 3, h: 4.5 },
      { at: shoulder, side: 1, n: 2, h: 4 },
      { at: at(0.62, -1), side: -1, n: 2, h: 3.5 },
      { at: at(0.6, 1), side: 1, n: 2, h: 3.5 }
    ].map((sp, i) => ({ ...sp, x: a.x + sp.at[0] + 0.5, y: a.y + sp.at[1] + 1.5, tongues: Array.from({ length: sp.n }, (_, j) => ({ dx: (j - (sp.n - 1) / 2) * 1.6 + R.range(-0.4, 0.4), h: sp.h * R.range(0.8, 1.2), n: i * 17 + j * 5 + seed })) }));
    const scorch = [0, 1].map((tick) => [0, 1].map((k) => {
      const sp = list[(tick * 2 + k + 1) % list.length], lum = (x, y) => luma(colorAt(a, x, y));
      let cand = S.body.filter(([x, y]) => Math.hypot(a.x + x + 0.5 - sp.x, a.y + y + 0.5 - sp.y) < 9 && y > H * 0.42 && lum(x, y) > 0.3 && lum(x, y) < 0.6);
      if (!cand.length)
        cand = S.body.filter(([, y]) => y > H * 0.45);
      const [x, y] = cand[Math.floor(R.next() * cand.length)];
      return { x: a.x + x + 0.5, y: a.y + y + 0.5, r: R.range(3.2, 4.4) };
    }));
    const out = { list, scorch };
    s.set(seed, out);
    return out;
  }
  function drawBack(p, t, o) {
    const F = fit(o.palette, 9).reverse(), a = o.actor, fl = flare3(t), flick = 0.8 + 0.2 * tnoise(t, D, 7.5, 3);
    p.shade(-30, -3, 30, 7, (x, y, out) => {
      const d = Math.hypot(x / 26, (y - 0.5) / 4.5);
      if (d < 1)
        out.l = mix(F[3], F[4], 0.5), out.k = (0.16 + 0.22 * fl) * flick * (1 - d) * (1 - d);
    });
    const smokeC = mix(hex(o.smoke), F[6], 0.2), { list } = spots(a, o.seed);
    cycle(t, D, 16, o.seed + 4, (r) => r.range(0.8, 1.2), (age, life, r, i) => {
      const sp = list[i % list.length], x = sp.x + travel2(WIND2 * 0.6, WIND2 * 0.5, 0.8, age) + Math.sin(age * 4 + i) * 1.2, y = sp.y - 3 - travel2(18, 6, 1, age);
      smoke(p, x, y, r.range(1.1, 1.9), age / life, smokeC, 0.9);
    });
  }
  function draw(p, t, o) {
    const F = fit(o.palette, 9).reverse(), CH = fit(o.char, 3), a = o.actor, S = shape(a), { list, scorch } = spots(a, o.seed);
    const ph = since(t), tick = Math.floor(t / TICK) % 2, fl = flare3(t);
    if (ph < 0.034)
      for (const [mx, my] of S.body)
        p.px(a.x + mx, a.y + my, WHITE);
    else if (ph < 0.22) {
      const k = 1 - (ph - 0.034) / 0.186;
      for (const [mx, my] of S.body)
        p.blend(a.x + mx, a.y + my, F[4], 0.55 * k);
    }
    for (const sc of scorch[tick]) {
      const grow = clamp(ph / 0.14), fade = 1 - clamp((ph - 0.25) / 0.33), r = sc.r * (0.4 + 0.6 * grow);
      if (fade <= 0)
        continue;
      for (const [mx, my] of S.body) {
        const x = a.x + mx + 0.5, y = a.y + my + 0.5, d = Math.hypot(x - sc.x, (y - sc.y) * 1.2) + rand(mx, my, 7) * 0.9;
        if (d > r)
          continue;
        const edge = d > r - 1;
        if (edge)
          p.dot(x - 0.5, y - 0.5, rand(mx, my, Math.floor(t * 20)) < 0.5 ? F[3] : F[4], fade * 1.2);
        else
          p.dot(x - 0.5, y - 0.5, d < r * 0.5 ? CH[0] : CH[1], fade * 1.1);
      }
      p.glow(sc.x, sc.y, 6, F[4], 0.3 * fade);
    }
    for (const sp of list) {
      for (const tg of sp.tongues) {
        const h = tg.h * (0.85 + 0.25 * tnoise(t, D, 5, tg.n)) * (1 + 1.6 * fl);
        tongue(p, sp.x + tg.dx, sp.y, h, 1.1 + 0.3 * fl, WIND2 * 0.08 * h / 4 + tnoise(t, D, 3, tg.n + 9) * 0.8, F, t, D, tg.n);
      }
      p.glow(sp.x, sp.y - 2, 9 + 6 * fl, F[4], 0.22 + 0.35 * fl);
    }
    cycle(t, D, 20, o.seed + 6, (r) => r.range(0.5, 0.9), (age, life, r, i) => {
      const sp = list[i % list.length], x = sp.x + r.range(-1.5, 1.5) + travel2(WIND2 + r.range(-10, 6), WIND2 * 0.6, 1.2, age) + Math.sin(age * 9 + i) * 1.2 * age;
      const y = sp.y - 2 + travel2(-r.range(25, 55), -18, 1.4, age);
      ember(p, x, y, age / life, [F[1], F[3], F[5]], age + i);
    });
    if (ph < 0.3)
      for (const [k, sp] of list.entries())
        for (let j = 0;j < 4; j++) {
          const an = -Math.PI / 2 + (rand(k, j, tick) - 0.5) * 2.2, v = 50 + 50 * rand(k, j, 2), x = sp.x + Math.cos(an) * travel2(v, 0, 3, ph), y = sp.y - 2 + Math.sin(an) * travel2(v, 0, 3, ph) + 60 * ph * ph;
          p.px(x, y, ph < 0.12 ? F[1] : F[3]);
          p.light(x, y, F[3], 0.4 * (1 - ph / 0.3));
        }
  }

  // ../vendor_src/pixelfx/src/fx/status/poisoned.js
  var meta11 = {
    name: "Poisoned",
    desc: "Sick to the bone: green rolls up the body in waves, dark veins creep from a wound, toxic sweat drips and hisses; every 0.8 s it wobbles, blisters pop and a ring pulses out.",
    tags: ["status", "poison", "toxic", "dot", "debuff", "sick", "loop"],
    size: [72, 64],
    origin: [36, 54],
    duration: 1.6,
    loop: true,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: { palette: ["#0e1d14", "#173320", "#23552e", "#318232", "#55b92f", "#8eea3f", "#cfff63", "#f6ffc2"], veins: "#2c1a3a", seed: 5 }
  };
  var SICK = { turn: 0.8, crouch: 4, lean: 4, hy: 1, fx: 2, fy: -20, bx: 8, by: -14, ffx: 3, fbx: -3 };
  var act7 = {
    onBody: true,
    poses: [[0, { ...SICK, x: -1, crouch: 5, lean: 5 }], [0.2, { ...SICK, x: 0 }], [0.5, { ...SICK, x: 1 }], [0.8, { ...SICK, x: 1, crouch: 5, lean: 5 }], [1, { ...SICK, x: 0 }], [1.3, { ...SICK, x: -1 }], [1.6, { ...SICK, x: -1, crouch: 5, lean: 5 }]]
  };
  var D2 = meta11.duration;
  var TICK2 = 0.8;
  var G = 760;
  var since2 = (t) => (t % TICK2 + TICK2) % TICK2;
  var actorAlpha2 = () => 0;
  var BODIES = new WeakMap;
  function body(a, seed) {
    let m = BODIES.get(a.mask);
    if (!m)
      BODIES.set(a.mask, m = new Map);
    if (m.has(seed))
      return m.get(seed);
    const S = shape(a), { h: H, w: W } = S, R = new Rng(seed * 7 + 3);
    const [l, r] = S.rows[Math.round(H * 0.6)], wx = r - 1, wy = Math.round(H * 0.6);
    const veins = [];
    const walk = (x, y, ang, len, depth) => {
      const pts = [];
      for (let s = 0;s < len; s++) {
        ang += R.range(-0.5, 0.5);
        x += Math.cos(ang);
        y += Math.sin(ang);
        if (!S.on(Math.round(x), Math.round(y)))
          break;
        pts.push([Math.round(x), Math.round(y), s / len]);
        if (depth < 2 && s > 2 && R.chance(0.16))
          walk(x, y, ang + R.sign() * R.range(0.6, 1.1), len * 0.55, depth + 1);
      }
      veins.push(pts);
    };
    for (let i = 0;i < 4; i++)
      walk(wx, wy, Math.PI + (i / 4 - 0.45) * 2.2, 11, 0);
    const lum = (x, y) => luma(colorAt(a, x, y));
    const skin = S.body.filter(([x, y]) => lum(x, y) > 0.55 && S.on(x - 1, y) && S.on(x + 1, y));
    const pick = (list) => list[Math.floor(R.next() * list.length)];
    const blisters = [0, 1].map(() => [0, 1, 2].map(() => {
      const [x, y] = pick(S.body.filter(([x, y]) => y > 4 && S.on(x - 1, y) && S.on(x + 1, y) && S.on(x, y - 1)));
      return { x, y, r: R.range(1.1, 1.8) };
    }));
    const E = eyes(a), sweat = [];
    for (const e of E)
      sweat.push([e.x0 < W / 2 ? e.x0 - 1 : e.x1 + 1, e.y0 - 1]);
    for (const side of [-1, 1]) {
      const hand = S.body.filter(([x, y]) => y > H * 0.5 && y < H * 0.7 && (side < 0 ? x <= l + 1 : x >= r - 1) && !S.on(x, y + 1));
      if (hand.length)
        sweat.push(hand[0]);
    }
    if (!sweat.length)
      sweat.push(pick(skin.length ? skin : S.body));
    const out = { veins, wound: [wx, wy], blisters, sweat };
    m.set(seed, out);
    return out;
  }
  function offsets(t, H) {
    const lean = 1.3 * Math.sin(t / D2 * TAU), ph = since2(t), wob = ph < 0.12;
    const w = wob ? Math.sin(ph / 0.12 * Math.PI) : 0;
    return (my) => Math.round(lean * (1 - my / H) + w * Math.sin(my * 0.42 + ph * 40));
  }
  function drawBack2(p, t, o) {
    const P = fit(o.palette, 8), ph = since2(t);
    const k = ph / 0.55;
    if (k < 1)
      band(p, 0, 0, 5 + 22 * Math.sqrt(k), 0.18, Math.max(1, 2.5 * (1 - k)), 1 - k, [P[3], P[4], P[5], P[6]], (g) => Math.sin(g) < 0);
    p.shade(-28, -3, 28, 6, (x, y, out) => {
      const d = Math.hypot(x / 24, (y - 0.5) / 4);
      if (d < 1)
        out.l = P[4], out.k = (0.14 + 0.2 * Math.exp(-ph / 0.2)) * (1 - d) * (1 - d);
    });
  }
  function draw2(p, t, o) {
    const P = fit(o.palette, 8), a = o.actor, S = shape(a), H = S.h, B = body(a, o.seed), off = offsets(t, H), ph = since2(t), tick = Math.floor(t / TICK2) % 2;
    const vein = hex(o.veins);
    for (const [mx, my] of S.body) {
      const c = colorAt(a, mx, my), l = luma(c), wave = 0.5 + 0.5 * Math.sin(TAU * (my / H * 1.6 + t / D2 * 2));
      const sick = P[clamp(1 + Math.round(l * 6.2), 1, 7)], k = 0.22 + 0.4 * wave * wave;
      p.px(a.x + mx + off(my), a.y + my, mix(c, wave > 0.85 && l > 0.4 ? mix(sick, P[6], 0.3) : sick, k));
    }
    const grow = smooth(0, D2 * 0.55, t) * (1 - smooth(D2 * 0.62, D2, t)) * 1.15;
    for (const pts of B.veins)
      for (const [x, y, u] of pts)
        if (u < grow)
          p.px(a.x + x + off(y), a.y + y, u > grow - 0.12 ? P[2] : vein);
    const [wx, wy] = B.wound;
    p.px(a.x + wx + off(wy), a.y + wy, P[6]);
    p.px(a.x + wx + off(wy) - 1, a.y + wy, P[3]);
    p.glow(a.x + wx, a.y + wy, 6, P[5], 0.3);
    for (const bl of B.blisters[tick]) {
      const x = a.x + bl.x + off(bl.y), y = a.y + bl.y, grow2 = clamp(ph / 0.16), pop = ph > 0.38;
      if (!pop) {
        const r = bl.r * grow2;
        p.circle(x, y, r + 0.6, P[3]);
        p.circle(x - 0.2, y - 0.2, r, P[5]);
        if (r > 0.8)
          p.px(x - 0.5, y - 0.8, WHITE);
        p.glow(x, y, 4, P[5], 0.3 * grow2);
      } else if (ph < 0.56) {
        const k = (ph - 0.38) / 0.18;
        for (let j = 0;j < 6; j++) {
          const an = j / 6 * TAU + bl.x, d = bl.r + 0.5 + k * 3.5;
          p.dot(x + Math.cos(an) * d, y + Math.sin(an) * d - k * 2, j % 2 ? P[6] : P[5], 1.2 - k);
        }
        p.glow(x, y, 6, P[6], 0.4 * (1 - k));
      }
    }
    B.sweat.forEach(([sx, sy], i) => {
      const per = D2 / 2, age = ((t - i * 0.37) % per + per) % per, gather = 0.35;
      const x = a.x + sx + 0.5 + off(sy), y0 = a.y + sy;
      if (age < gather) {
        const k = age / gather, run = Math.round(k * 2);
        p.px(x, y0 + run, k > 0.5 ? P[6] : P[5]);
        if (k > 0.5)
          p.px(x, y0 + run - 1, P[4]);
        return;
      }
      const f = age - gather, fallH = -1 - (y0 + 2), tf = Math.sqrt(2 * Math.max(1, fallH) / G);
      if (f < tf) {
        const y = y0 + 2 + 0.5 * G * f * f;
        p.line(x, y - Math.min(3, G * f * 0.012), x, y, P[4]);
        p.px(x, y, P[6]);
        return;
      }
      const h = f - tf;
      if (h > 0.4)
        return;
      const k = h / 0.4;
      p.line(x - 1 - k * 2, -1, x + 1 + k * 2, -1, P[k < 0.4 ? 6 : 4], 1.2 - k);
      for (let j = 0;j < 3; j++)
        p.dot(x + (j - 1) * (2 + 3 * k), -2 - j % 2 - 5 * k * (1 - k), P[6], 1 - k);
      p.disc(x + Math.sin(k * 6) * 1.5, -3 - k * 6, 1 + 1.5 * k, P[5], 0.35 * (1 - k));
      p.glow(x, -1.5, 5, P[5], 0.35 * (1 - k));
    });
    const k = ph / 0.55;
    if (k < 1)
      band(p, 0, 0, 5 + 22 * Math.sqrt(k), 0.18, Math.max(1, 2.5 * (1 - k)), 1 - k, [P[3], P[4], P[5], P[6]], (g) => Math.sin(g) >= 0);
    p.glow(0, a.y + H * 0.45, 26, P[4], 0.14 + 0.2 * Math.exp(-ph / 0.18));
  }

  // ../vendor_src/pixelfx/src/fx/status/frozen.js
  var meta12 = {
    name: "Frozen",
    desc: "Chilled to the bone: frost ferns creep over the body, icicles hang from chin and hands and drip, breath steams, snow settles, a shiver every second, frost spreads underfoot.",
    tags: ["status", "ice", "freeze", "frozen", "cold", "chill", "debuff", "loop"],
    size: [72, 64],
    origin: [36, 54],
    duration: 2,
    loop: true,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: { palette: ["#151a3d", "#212f6b", "#2c58aa", "#3a8bd8", "#62c8f4", "#a6ecff", "#dcfbff", "#ffffff"], seed: 4 }
  };
  var STIFF = { turn: 0.9, crouch: 1, fx: -6, fy: -15, bx: 7, by: -15, ffx: -2, fbx: 3 };
  var act8 = {
    onBody: true,
    poses: [[0, { ...STIFF, crouch: 2 }], [0.22, STIFF], [1, STIFF], [1, { ...STIFF, crouch: 2 }, "snap"], [1.22, STIFF], [2, { ...STIFF, crouch: 2 }]]
  };
  var D3 = meta12.duration;
  var SHIVER = 1;
  var since3 = (t) => (t % SHIVER + SHIVER) % SHIVER;
  var actorAlpha3 = () => 0;
  var shake = (t) => since3(t) < 0.22 ? Math.floor(t * 50) % 2 ? 1 : -1 : 0;
  var PLANS = new WeakMap;
  function plan(a, seed) {
    let m = PLANS.get(a.mask);
    if (!m)
      PLANS.set(a.mask, m = new Map);
    if (m.has(seed))
      return m.get(seed);
    const S = shape(a), { h: H, w: W } = S, R = new Rng(seed * 11 + 1);
    const ferns = [];
    const roots = S.side.filter(([, y]) => y > H * 0.2 && y < H * 0.85).sort(() => R.next() - 0.5).slice(0, 6);
    roots.forEach(([x0, y0, dir], i) => {
      let x = x0, y = y0, ang = dir < 0 ? -0.5 : Math.PI + 0.5;
      ang += R.range(-0.4, 0.4);
      for (let s = 0;s < 9; s++) {
        x += Math.cos(ang) * 1.1;
        y += Math.sin(ang) * 1.1;
        const px = Math.round(x), py = Math.round(y);
        if (!S.on(px, py))
          break;
        ferns.push([px, py, s / 9, i]);
        if (s % 2 === 1)
          for (const side of [-1, 1]) {
            const ba = ang + side * 1.05, L = 1 + Math.round(R.range(0, 2) * (1 - s / 9));
            for (let k = 1;k <= L; k++) {
              const bx = Math.round(x + Math.cos(ba) * k), by = Math.round(y + Math.sin(ba) * k);
              if (S.on(bx, by))
                ferns.push([bx, by, (s + k * 0.6) / 9, i]);
            }
          }
        ang += R.range(-0.25, 0.25);
      }
    });
    const clear = (x, y) => {
      let n = 0;
      while (n < 7 && y + 1 + n < H && !S.on(x, y + 1 + n))
        n++;
      return n;
    };
    const hangs = S.body.filter(([x, y]) => !S.on(x, y + 1) && S.on(x, y - 1) && y < H * 0.72 && y > 4).map(([x, y]) => [x, y, clear(x, y)]).filter(([, , c]) => c >= 4);
    const best = (f, key) => hangs.filter(f).sort(key)[0];
    const icicles = [
      best(([, y]) => y < H * 0.36, (p, q) => p[0] - q[0]),
      best(([, y]) => y < H * 0.36, (p, q) => q[0] - p[0]),
      best(([x, y]) => y >= H * 0.36 && y < H * 0.5 && x < W / 2, (p, q) => q[0] - p[0]),
      best(([x, y]) => y >= H * 0.36 && y < H * 0.5 && x >= W / 2, (p, q) => p[0] - q[0]),
      best(([x, y]) => y >= H * 0.5 && x < W / 2, (p, q) => p[0] - q[0]),
      best(([x, y]) => y >= H * 0.5 && x >= W / 2, (p, q) => q[0] - p[0])
    ].filter(Boolean).map(([x, y, c], i) => ({ x, y: y + 1, len: Math.min(c - 1, R.range(3, 5.5)), phase: R.next(), period: i % 2 ? 1 : 2 }));
    const snow = S.up.filter(([, y]) => y < H * 0.6).map(([x, y]) => [x, y, 1 + (rand(x, seed, 3) < 0.45 ? 1 : 0)]);
    const E = eyes(a), mouth = E.length === 2 ? [(E[0].x1 + E[1].x0 + 1) / 2, Math.max(E[0].y1, E[1].y1) + 2] : [W / 2, H * 0.38];
    const out = { ferns, icicles, snow, mouth };
    m.set(seed, out);
    return out;
  }
  function frost(p, C, t, reach) {
    for (let x = -Math.ceil(reach) - 1;x <= reach + 1; x++) {
      const q = Math.abs(x + 0.5) / reach, h = rand(x, 17), k = 1 - q * q;
      if (q > 1 + h * 0.15)
        continue;
      const tw = Math.sin(t / D3 * TAU * 2 + rand(x, 3) * TAU) > 0.94;
      p.px(x, 0, tw || h < 0.3 ? C[7] : q > 0.85 ? C[5] : C[6]);
      if (h < 0.3 * k)
        p.px(x, -1, C[6]);
      for (let j = 1;j <= 1 + Math.round(2 * k); j++)
        p.dot(x, j, j === 1 ? C[5] : C[4], (1.05 - j / 4) * 0.85);
    }
  }
  function drawBack3(p, t, o) {
    const C = fit(o.palette, 8), reach = 13 + 3.5 * Math.sin(t / D3 * TAU);
    p.shade(-28, -3, 28, 6, (x, y, out) => {
      const d = Math.hypot(x / 24, (y - 0.5) / 4);
      if (d < 1)
        out.l = C[4], out.k = 0.24 * (1 - d) * (1 - d);
    });
    frost(p, C, t, reach);
  }
  function draw3(p, t, o) {
    const C = fit(o.palette, 8), a = o.actor, S = shape(a), H = S.h, P = plan(a, o.seed), dx = shake(t), ph = since3(t);
    const X = (mx) => a.x + mx + dx, Y = (my) => a.y + my;
    for (const [mx, my] of S.body) {
      const c = colorAt(a, mx, my), ice = C[clamp(1 + Math.round(luma(c) * 5.6), 1, 7)];
      const rim = !S.on(mx - 1, my) || !S.on(mx, my - 1) || !S.on(mx + 1, my);
      p.px(X(mx), Y(my), rim && luma(c) < 0.3 ? my < H * 0.5 || !S.on(mx - 1, my) ? C[5] : C[3] : mix(c, ice, 0.38));
    }
    const grow = 0.2 + 0.65 * smooth(0.05, 0.95, ph);
    for (const [x, y, u] of P.ferns)
      if (u < grow)
        p.px(X(x), Y(y), u > grow - 0.1 ? WHITE : rand(x, y, 5) < 0.5 ? C[6] : C[5]);
    for (const [x, y, d] of P.snow) {
      p.px(X(x), Y(y) - 1, C[7]);
      if (d > 1)
        p.px(X(x), Y(y) - 2, rand(x, y, 9) < 0.5 ? C[7] : C[6]);
    }
    for (const ic of P.icicles) {
      const per = ic.period, u = ((t / per + ic.phase) % 1 + 1) % 1, L = ic.len * (0.55 + 0.45 * smooth(0, 0.7, u)), x = X(ic.x), y0 = Y(ic.y);
      for (let j = 0;j < L; j++) {
        const v = j / L;
        p.px(x, y0 + j, v > 0.75 ? WHITE : v < 0.3 ? C[7] : C[6]);
        if (v < 0.5)
          p.px(x + 1, y0 + j, C[4]);
      }
      if (u > 0.7 && u < 0.86)
        p.px(x, y0 + L, C[6]);
      else if (u >= 0.86) {
        const f = (u - 0.86) * per, y = y0 + L + 0.5 * 760 * f * f;
        if (y < -1)
          p.px(x, y, C[6]), p.px(x, y - 1, C[5]);
      }
      p.glow(x, y0 + L * 0.6, 4, C[5], 0.18);
    }
    const [mx0, my0] = P.mouth;
    for (let i = 0;i < 4; i++) {
      const age = ph - 0.35 - i * 0.05;
      if (age < 0 || age > 0.65)
        continue;
      const u = age / 0.65, x = X(mx0) + 1 + travel2(16, 0, 2.2, age) + i, y = Y(my0) - travel2(6, 3, 1, age) - i * 0.5, rad = 0.8 + 2.4 * Math.sqrt(u);
      p.disc(x, y, rad, C[7], 0.5 * (1 - u) * Math.min(1, u * 8));
      p.disc(x - rad * 0.2, y - rad * 0.3, rad * 0.5, WHITE, 0.4 * (1 - u));
    }
    cycle(t, D3, 9, o.seed + 2, (r) => r.range(1.2, 1.8), (age, life, r) => {
      const x = r.range(-14, 14) + Math.sin(age * 3 + r.next() * TAU) * 1.5, y = a.y - 16 + age * 14;
      if (y > a.y + 2)
        return;
      p.dot(x, y, r.next() < 0.5 ? WHITE : C[6], Math.min(1, age * 4));
    });
    if (ph < 0.5)
      for (let i = 0;i < 8; i++) {
        const side = i % 2 ? 1 : -1, vx = side * (20 + 30 * rand(i, 4)), vy = -(20 + 30 * rand(i, 5)), x = side * (6 + 6 * rand(i, 6)) + vx * ph, y = a.y + 3 * rand(i, 7) + vy * ph + 0.5 * 300 * ph * ph;
        p.dot(x, y, i % 3 ? C[6] : WHITE, 1.2 - ph * 2);
      }
    if (ph < 0.25)
      sparkle(p, X(Math.round(S.w * 0.3)), Y(4), Math.round(3 * (1 - ph / 0.25)), C[6], C[5], 0.4);
    p.glow(0, a.y + H * 0.45, 30, C[4], 0.2 + 0.12 * Math.exp(-ph / 0.2));
    p.glow(0, a.y + 2, 16, C[5], 0.1);
  }

  // ../vendor_src/pixelfx/src/fx/spawn/poof.js
  var meta13 = {
    name: "Poof",
    desc: "A cartoon death poof: a white pop, a ring of soft round smoke balls bursting out between speed lines, little stars spinning off, and the cloud lifting and thinning away.",
    tags: ["spawn", "death", "despawn", "smoke", "poof", "cartoon", "one-shot"],
    size: [112, 92],
    origin: [56, 80],
    duration: 1.6,
    loop: false,
    fps: 30,
    bg: "ground",
    options: {
      palette: ["#2a2440", "#5e5878", "#9a94b4", "#cdc8e0", "#f2f0fa", "#ffffff"],
      stars: ["#ffd84a", "#fff3a6", "#ffffff"],
      seed: 21
    }
  };
  var CY = -17;
  function create10(o) {
    const C = fit(o.palette, 6), S = fit(o.stars, 3), R = new Rng(o.seed), floor = () => 0;
    const ps = new Particles({ rng: R, ground: floor, sparks: [WHITE, S[1], S[0], C[2]] }), lights = new Lights;
    const balls = [], lines = [];
    const ring = 9;
    for (let i = 0;i < ring; i++) {
      const a = i / ring * TAU + R.range(-0.2, 0.2), sp = R.range(95, 140), r = R.range(5, 7);
      balls.push({ x: Math.cos(a) * 3, y: CY + Math.sin(a) * 3, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.8 - 12, r0: r * 0.5, r1: r, life: R.range(0.7, 1.05), delay: R.range(0, 0.03) });
    }
    for (let i = 0;i < 5; i++) {
      const a = R.range(0, TAU), sp = R.range(20, 60);
      balls.push({ x: Math.cos(a) * 2, y: CY + Math.sin(a) * 2, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 16, r0: 4, r1: R.range(6.5, 8.5), life: R.range(0.85, 1.2), delay: R.range(0.02, 0.06) });
    }
    for (let i = 0;i < 7; i++) {
      const a = R.range(0, TAU), sp = R.range(170, 240), r = R.range(2.2, 3.6);
      balls.push({ x: Math.cos(a) * 4, y: CY + Math.sin(a) * 4, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp * 0.75 - 10, r0: r * 0.6, r1: r, life: R.range(0.32, 0.5), delay: R.range(0.01, 0.04) });
    }
    for (const b of balls)
      b.max = b.life;
    for (let i = 0;i < 12; i++) {
      const a = i / 12 * TAU + R.range(-0.12, 0.12) + 0.13, sa = Math.sin(a);
      lines.push({ a, r1: Math.min(R.range(24, 34), sa > 0.1 ? (-2 - CY) / sa : 99), d: R.range(0, 0.04) });
    }
    for (let i = 0;i < 7; i++) {
      const a = R.range(-Math.PI, 0.3), sp = R.range(70, 125);
      ps.spawn(P.STAR, Math.cos(a) * 6, CY + Math.sin(a) * 6, Math.cos(a) * sp, Math.sin(a) * sp - 30, R.range(0.55, 0.95), R.pick([S[2], S[1], S[1], S[0]]), R.range(1.3, 2.4), R.range(0.02, 0.1));
    }
    for (let i = 0;i < 10; i++) {
      const a = R.range(0, TAU), sp = R.range(40, 110);
      ps.spawn(P.STAR, Math.cos(a) * 5, CY + Math.sin(a) * 5, Math.cos(a) * sp, Math.sin(a) * sp - 20, R.range(0.3, 0.6), R.pick([WHITE, S[1]]), 0.6, R.range(0, 0.08));
    }
    for (let i = 0;i < 6; i++) {
      const s = R.sign();
      ps.spawn(P.DUST, s * R.range(1, 6), -1, s * R.range(25, 70), -R.range(2, 10), R.range(0.4, 0.7), C[2], R.range(1.6, 3), R.range(0.02, 0.08));
    }
    lights.add(0, CY, 46, C[4], 0.8, 0.4);
    lights.add(0, CY, 22, WHITE, 0.8, 0.1);
    let t = 0;
    const radius = (b) => {
      const age = b.max - b.life, u = age / b.max;
      const grow = b.r0 + (b.r1 - b.r0) * ease.outBack(clamp(age / 0.22), 2), breathe = 1 + 0.06 * Math.sin(age * 14 + b.r1);
      return grow * breathe * (u < 0.62 ? 1 : 1 - ease.inBack(clamp((u - 0.62) / 0.38), 1.4));
    };
    const drawBall = (p, b, layer) => {
      const age = b.max - b.life, r = radius(b), a = Math.min(1, age * 20), lit = age < 0.12;
      if (r < 0.6)
        return;
      const hy = (b.y - CY + 6) / 14, lo = hy > 0.4, hi = hy < -0.3;
      if (layer === "shade")
        p.disc(b.x + r * 0.16, b.y + r * 0.2, r, lit ? C[3] : lo ? C[1] : C[2], 0.8 * a);
      else if (layer === "body")
        p.disc(b.x - r * 0.06, b.y - r * 0.08, r * 0.86, lit ? C[4] : lo ? C[2] : C[3], 0.88 * a);
      else if (!lo || lit) {
        p.disc(b.x - r * 0.28, b.y - r * 0.34, r * 0.42, lit || hi ? WHITE : C[4], 0.85 * a);
        if (age < 0.25)
          p.disc(b.x - r * 0.3, b.y - r * 0.38, r * 0.2, WHITE, 0.9 * a * (1 - age / 0.25));
      }
    };
    return {
      update(dt) {
        t += dt;
        for (let i = balls.length - 1;i >= 0; i--) {
          const b = balls[i];
          if (b.delay > 0) {
            b.delay -= dt;
            continue;
          }
          if ((b.life -= dt) <= 0) {
            if (b.r1 > 4)
              ps.spawn(P.STAR, b.x, b.y, 0, -8, 0.22, WHITE, 0.6);
            balls.splice(i, 1);
            continue;
          }
          b.vx -= b.vx * 7 * dt;
          b.vy -= b.vy * 7 * dt + 30 * dt;
          b.x += b.vx * dt;
          b.y = Math.min(b.y + b.vy * dt, -radius(b) * 0.7);
        }
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        const s = 1 - smooth(0.1, 0.9, t);
        if (s > 0)
          p.glow(0, -1, 26, C[4], 0.25 * s);
        ps.draw(p, "back");
      },
      draw(p) {
        const live = balls.filter((b) => b.delay <= 0);
        for (const layer of ["shade", "body", "cap"])
          for (const b of live)
            drawBall(p, b, layer);
        if (t < 0.07) {
          const k = t / 0.07;
          p.circle(0, CY, 9 + 3 * k, C[4]);
          p.circle(0, CY, 7 + 3 * k, WHITE);
          flare(p, 0, CY, 20 * (1 - k * 0.5), 1 - k, C);
        }
        const rk = (t - 0.03) / 0.2;
        if (rk > 0 && rk < 1)
          p.ring(0, CY, 8 + 18 * ease.outCubic(rk), Math.max(1, 2.5 * (1 - rk)), rk < 0.3 ? WHITE : C[4], 1.1 - rk);
        for (const l of lines) {
          const u = (t - l.d) / 0.2;
          if (u <= 0 || u >= 1)
            continue;
          const head = 8 + (l.r1 - 8) * ease.outExpo(clamp(u / 0.6)), tail = 8 + (l.r1 - 8) * ease.inCubic(u), ca = Math.cos(l.a), sa = Math.sin(l.a);
          p.line(ca * tail, CY + sa * tail, ca * head, CY + sa * head, (v) => v > 0.6 ? WHITE : C[4]);
          p.glowLine(ca * tail, CY + sa * tail, ca * head, CY + sa * head, 3, C[4], 0.25);
        }
        ps.draw(p, "front");
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/spawn/_lib.js
  function bodyOf(actor, C) {
    const { mask: m, pixels: px } = actor, list = [], cells = new Array(m.w * m.h).fill(null);
    const on = (mx, my) => mx >= 0 && my >= 0 && mx < m.w && my < m.h && !!m.data[my * m.w + mx];
    for (let my = 0;my < m.h; my++)
      for (let mx = 0;mx < m.w; mx++) {
        if (!on(mx, my))
          continue;
        const own = px?.[my * m.w + mx];
        const c = own ? hex(own) : C[Math.max(1, Math.min(C.length - 2, Math.round((C.length - 2) * (0.85 - my / m.h * 0.5))))];
        const b = { x: actor.x + mx, y: actor.y + my, mx, my, c, edge: !on(mx - 1, my) || !on(mx + 1, my) || !on(mx, my - 1) || !on(mx, my + 1) };
        list.push(b);
        cells[my * m.w + mx] = b;
      }
    return { list, w: m.w, h: m.h, x: actor.x, y: actor.y, on, cell: (mx, my) => on(mx, my) ? cells[my * m.w + mx] : null };
  }
  function rimOf(body) {
    const out = [];
    for (let my = -1;my <= body.h; my++)
      for (let mx = -1;mx <= body.w; mx++)
        if (!body.on(mx, my) && (body.on(mx - 1, my) || body.on(mx + 1, my) || body.on(mx, my - 1) || body.on(mx, my + 1)))
          out.push({ x: body.x + mx, y: body.y + my, mx, my });
    return out;
  }

  // ../vendor_src/pixelfx/src/fx/spawn/shatter-death.js
  var meta14 = {
    name: "Shatter death",
    desc: "Frost races up the body and seals it in faceted ice, a glint sweeps it, cracks spread from the chest, then it bursts into its own facets that tumble, bounce and melt.",
    tags: ["spawn", "death", "ice", "freeze", "shatter", "shards", "one-shot"],
    size: [172, 96],
    origin: [84, 84],
    duration: 3.3,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: {
      palette: ["#0e1636", "#1a2f66", "#2557a3", "#3488d6", "#5fc0f0", "#a2e6ff", "#dcf8ff", "#ffffff"],
      seed: 14
    }
  };
  var FEAR = { turn: 0.9, lean: -2, crouch: 2, fx: -9, fy: -31, bx: 9, by: -31, ffx: -3, fbx: 4 };
  var act9 = {
    onBody: true,
    poses: [[-0.2, READY], [0.08, FEAR, "snap"], [0.3, { ...FEAR, lean: -3, fy: -34 }], [0.5, FEAR], [3.3, FEAR]],
    hits: [{ t: 0.5, stop: 0.02, shake: 0.06, amp: 1 }, { t: 1.4, stop: 0.09, shake: 0.26, amp: 3 }]
  };
  var LOCK = 0.5;
  var CRACK = 1.05;
  var BURST = 1.4;
  var actorAlpha4 = (t) => t < BURST ? 1 : 0;
  function create11(o) {
    const C = fit(o.palette, 8), R = new Rng(o.seed), floor = () => 0;
    const body = bodyOf(o.actor, C), W = body.w + 2, H = body.h + 1, X0 = body.x - 1, Y0 = body.y - 1;
    const ice = new Int16Array(W * H).fill(-1), col = new Uint32Array(W * H), glass = new Uint32Array(W * H), solid = new Uint8Array(W * H);
    const inBody = (mx, my) => body.on(mx, my);
    for (let y = 0;y < H; y++)
      for (let x = 0;x < W; x++) {
        const mx = x - 1, my = y - 1;
        if (inBody(mx, my) || my < body.h - 1 && (inBody(mx - 1, my) || inBody(mx + 1, my) || inBody(mx, my - 1) || inBody(mx, my + 1)))
          ice[y * W + x] = 0;
      }
    const seeds = [];
    for (let i = 0;i < 22; i++) {
      let x, y, tries = 0;
      do
        x = R.range(0, W), y = R.range(0, H);
      while (ice[Math.floor(y) * W + Math.floor(x)] < 0 && ++tries < 40);
      seeds.push([x, y]);
    }
    const at = (x, y) => x >= 0 && y >= 0 && x < W && y < H && ice[y * W + x] >= 0;
    for (let y = 0;y < H; y++)
      for (let x = 0;x < W; x++) {
        const i = y * W + x;
        if (ice[i] < 0)
          continue;
        let d1 = 1e9, d2 = 1e9, k = 0;
        seeds.forEach(([sx, sy], j) => {
          const d = Math.hypot(x + 0.5 - sx, (y + 0.5 - sy) * 0.85);
          if (d < d1)
            d2 = d1, d1 = d, k = j;
          else if (d < d2)
            d2 = d;
        });
        ice[i] = k;
        const [sx, sy] = seeds[k], lit = clamp(0.55 + 0.35 * (rand(k, 41) - 0.5) - 0.5 * ((sx - W / 2) / W) - 0.55 * ((sy - H / 2) / H));
        const own = body.cell(x - 1, y - 1)?.c;
        col[i] = own ? mix(own, C[4], 0.36) : C[3];
        glass[i] = C[3 + Math.min(2, Math.floor(lit * 3))];
        let sc = 0;
        if (d2 - d1 < 0.42 && !own)
          sc = lit > 0.5 ? C[6] : C[5];
        else if (d2 - d1 < 0.42)
          col[i] = mix(col[i], C[6], 0.45);
        if (!at(x - 1, y) || !at(x, y - 1))
          sc = C[6];
        if (!at(x + 1, y) || !at(x, y + 1) && y < H - 1)
          sc = C[3];
        if (sc)
          col[i] = sc, solid[i] = 1;
      }
    const spikes = [];
    for (let i = 0;i < 7; i++) {
      const x = R.int(1, W - 2), y0 = R.int(2, H - 3);
      let y = y0;
      while (y > 0 && at(x, y - 1))
        y--;
      if (at(x, y))
        spikes.push({ x: X0 + x + 0.5, base: Y0 + y + 1, h: R.range(3, 6), w: R.range(2.5, 3.5), lean: R.range(-2.5, 2.5), at: LOCK + R.range(-0.02, 0.08) });
    }
    for (const sd of [-1, 1])
      for (let i = 0;i < 2; i++) {
        const h = i ? R.range(5, 7) : R.range(8, 11);
        spikes.push({ x: sd * (i ? R.range(11, 13) : R.range(7, 9)), base: 0, h, w: i ? 3.5 : 4.5, lean: sd * h * R.range(0.25, 0.45), at: R.range(0.08, 0.2) });
      }
    const IX = Math.round(W * 0.48), IY = Math.round(H * 0.42), cracks = [];
    const walk = (x, y, a, len) => {
      const pts = [[x, y]];
      for (let s = 0;s < len; s++) {
        a += R.range(-0.5, 0.5);
        x += Math.cos(a) * R.range(1.4, 2.4);
        y += Math.sin(a) * R.range(1.4, 2.4);
        if (!at(Math.floor(x), Math.floor(y)))
          break;
        pts.push([x, y]);
        if (pts.length > 3 && cracks.length < 18 && R.chance(0.15))
          walk(x, y, a + R.sign() * R.range(0.6, 1.1), len / 2);
      }
      cracks.push(pts);
    };
    for (let i = 0;i < 7; i++)
      walk(IX, IY, i / 7 * TAU + R.range(-0.3, 0.3), 20);
    const ps = new Particles({ rng: R, ground: floor, sparks: [WHITE, C[6], C[5], C[4]], haze: C[5] });
    const bits = new Bits({ ground: floor }), lights = new Lights, pieces = [], rime = [];
    let t = 0, locked = false, cracked = false, burst = false;
    const level = (t) => H * (1 - ease.outCubic(clamp(t / LOCK)));
    function shatter() {
      const cells = new Map;
      for (let y = 0;y < H; y++)
        for (let x = 0;x < W; x++) {
          const k = ice[y * W + x];
          if (k < 0)
            continue;
          if (!cells.has(k))
            cells.set(k, []);
          const i = y * W + x;
          cells.get(k).push([x, y, solid[i] ? col[i] : mix(col[i], glass[i], 0.3)]);
        }
      for (const px of cells.values()) {
        let cx = 0, cy = 0;
        for (const [x, y] of px)
          cx += x + 0.5, cy += y + 0.5;
        cx /= px.length, cy /= px.length;
        const map = new Map, r = Math.max(...px.map(([x, y]) => Math.hypot(x + 0.5 - cx, y + 0.5 - cy))) + 1;
        for (const [x, y, c] of px)
          map.set(`${Math.round(x + 0.5 - cx)},${Math.round(y + 0.5 - cy)}`, c);
        const dx = cx - IX, dy = cy - IY, d = Math.hypot(dx, dy) || 1, sp = R.range(55, 115);
        const life = R.range(1.3, 1.85);
        pieces.push({ id: pieces.length + 1, x: X0 + cx, y: Y0 + cy, vx: dx / d * sp + R.range(-18, 18), vy: dy / d * sp * 0.6 - R.range(110, 220), a: 0, va: R.range(-9, 9), r, map, life, max: life, rest: false, n: px.length });
      }
      for (let i = 0;i < 64; i++) {
        const a = -Math.PI / 2 + R.range(-1.45, 1.45), sp = R.range(60, 180);
        bits.add({ kind: B.SHARD, x: X0 + IX + R.range(-6, 6), y: Y0 + IY + R.range(-8, 8), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 0.85, drag: 0.6, bounce: 0.3, life: R.range(0.9, 1.6), a: R.range(0, TAU), va: R.range(-20, 20), s: R.range(1.5, 3.2), c: R.pick([C[7], C[6], C[5]]) });
      }
      for (let i = 0;i < 14; i++)
        ps.spawn(P.VAPOUR, R.range(-10, 10), -R.range(1, 20), R.sign() * R.range(20, 80), -R.range(4, 20), R.range(0.6, 1.1), R.chance(0.5) ? C[6] : C[5], R.range(2.5, 4.5));
      for (let i = 0;i < 16; i++)
        ps.spawn(P.STAR, R.range(-16, 16), -R.range(4, 38), R.range(-40, 40), -R.range(10, 60), R.range(0.4, 1), R.pick([WHITE, C[6]]), R.range(1, 2.4));
      lights.add(0, Y0 + IY, 46, WHITE, 0.75, 0.14);
      lights.add(0, Y0 + IY, 70, C[4], 0.6, 0.5);
    }
    return {
      update(dt) {
        t += dt;
        if (t < LOCK) {
          const y = Y0 + level(t);
          if (R.chance(0.7))
            ps.spawn(P.STAR, R.range(-10, 10), y, R.range(-12, 12), -R.range(0, 18), R.range(0.25, 0.5), R.chance(0.5) ? WHITE : C[6], R.range(0.8, 1.8));
          if (R.chance(0.25))
            ps.spawn(P.VAPOUR, R.range(-8, 8), -1, R.sign() * R.range(15, 50), -R.range(2, 10), R.range(0.6, 1), C[6], R.range(2, 3.5));
        }
        if (!locked && t >= LOCK) {
          locked = true;
          lights.add(0, -20, 54, C[4], 0.6, 0.3);
          for (let i = 0;i < 6; i++)
            ps.spawn(P.STAR, R.range(-12, 12), -R.range(4, 36), 0, -4, R.range(0.35, 0.7), R.pick([WHITE, C[6]]), R.range(1.2, 2.4));
        }
        if (locked && t < CRACK && R.chance(0.08))
          ps.spawn(P.STAR, R.range(-11, 11), -R.range(2, 36), 0, -3, R.range(0.3, 0.6), R.pick([WHITE, C[6]]), R.range(0.8, 2));
        if (!cracked && t >= CRACK) {
          cracked = true;
          for (let i = 0;i < 5; i++) {
            const a = R.range(0, TAU), sp = R.range(60, 150);
            bits.add({ kind: B.SHARD, x: X0 + IX, y: Y0 + IY, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 60, g: 0.8, drag: 0.6, bounce: 0.3, life: R.range(0.5, 0.9), a: R.range(0, TAU), va: R.range(-20, 20), s: R.range(1, 2), c: C[6] });
          }
          lights.add(0, Y0 + IY, 24, WHITE, 0.7, 0.1);
        }
        if (!burst && t >= BURST) {
          burst = true;
          shatter();
        }
        for (let i = pieces.length - 1;i >= 0; i--) {
          const q = pieces[i];
          if ((q.life -= dt) <= 0) {
            pieces.splice(i, 1);
            continue;
          }
          if (q.rest) {
            if (t < meta14.duration - 0.9 && R.chance(0.02))
              ps.spawn(P.VAPOUR, q.x, q.y - 1, R.range(-4, 4), -R.range(4, 10), R.range(0.5, 0.8), C[5], R.range(1.5, 2.5));
            continue;
          }
          q.vy += 900 * dt;
          q.vx -= q.vx * 0.5 * dt;
          q.x += q.vx * dt;
          q.y += q.vy * dt;
          q.a += q.va * dt;
          const g = -q.r * 0.55;
          if (q.y > g && q.vy > 0) {
            q.y = g;
            if (q.vy > 90) {
              rime.push({ x: q.x, w: 2 + q.r * 0.6, t0: t });
              q.vy *= -0.32;
              q.vx *= 0.65;
              q.va = q.va * 0.5 + R.range(-4, 4);
              if (q.n > 8)
                ps.spawn(P.STAR, q.x, q.y, 0, -6, 0.3, WHITE, 1.2);
              for (let j = 0;j < 2; j++)
                ps.spawn(P.DUST, q.x + R.range(-2, 2), -0.5, R.sign() * R.range(10, 30), -R.range(2, 8), R.range(0.3, 0.5), C[5], R.range(1.2, 2));
            } else if (Math.abs(q.vx) > 12)
              q.vy = 0, q.vx *= 0.9, q.va *= 0.85;
            else
              q.rest = true, q.vx = q.vy = 0;
          }
        }
        bits.update(dt);
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        const k = smooth(0.1, LOCK, t) * (1 - smooth(BURST + 0.6, BURST + 1.6, t)), reach = 6 + 12 * smooth(0, LOCK + 0.3, t);
        if (k > 0)
          for (let x = Math.floor(-reach);x <= Math.ceil(reach); x++) {
            const h = rand(x, 17), e = 1 - Math.abs(x) / (reach + 1);
            p.dot(x, 0, h < 0.3 ? WHITE : C[6], k * Math.min(1, e * 2));
            if (h < 0.5)
              p.dot(x, 1, C[5], k * e);
            if (h < 0.35 && e > 0.3)
              p.dot(x, -1, C[6], k * e);
          }
        if (k > 0)
          p.glow(0, -2, 26, C[4], 0.25 * k);
        for (const r of rime) {
          const a = clamp((t - r.t0) / 0.08) * (1 - smooth(meta14.duration - 1, meta14.duration - 0.15, t));
          for (let x = Math.floor(r.x - r.w);x <= r.x + r.w; x++) {
            const h = rand(x, 23);
            if (h < 0.7)
              p.dot(x, 0, h < 0.25 ? WHITE : C[6], a);
            if (h < 0.3)
              p.dot(x, 1, C[5], a * 0.7);
          }
        }
        ps.draw(p, "back");
      },
      draw(p) {
        if (!burst) {
          const lv = level(t), shake = t > CRACK && t < BURST ? (Math.floor(t * 50) % 2 ? 1 : -1) * (t > BURST - 0.15 ? 1 : 0.5) : 0;
          const glint = t > LOCK ? (t - LOCK) * 0.9 % 1.6 : -1;
          for (let y = 0;y < H; y++) {
            if (y < Math.floor(lv))
              continue;
            for (let x = 0;x < W; x++) {
              const i = y * W + x;
              if (ice[i] < 0)
                continue;
              let c = y === Math.floor(lv) && t < LOCK ? rand(x, 5) < 0.6 ? WHITE : C[6] : t >= LOCK && t < LOCK + 0.05 ? WHITE : col[i];
              const g = Math.abs((x + (H - y) * 0.6) / (W + H * 0.6) - glint), on = glint >= 0 && glint <= 1;
              if (on && g < 0.035)
                c = WHITE;
              else if (on && g < 0.07 && c !== C[3])
                c = C[6];
              p.px(X0 + x + shake, Y0 + y, c);
              if (!solid[i] && c === col[i])
                p.blend(X0 + x + shake, Y0 + y, glass[i], 0.3);
            }
          }
          for (let y = Math.max(0, Math.floor(lv) - 1);y <= H; y++)
            for (let x = -1;x <= W; x++)
              if (!at(x, y) && (at(x - 1, y) || at(x + 1, y) || at(x, y + 1) && y + 1 >= lv || at(x, y - 1)) && y < H)
                p.px(X0 + x + shake, Y0 + y, C[0]);
          for (const s of spikes) {
            const g = ease.outBack(clamp((t - s.at) / 0.12), 2.4);
            if (g > 0)
              crystal(p, s.x + shake, s.base, s.h * g, s.w, s.lean * g, C, { white: t < s.at + 0.04 });
          }
          if (cracked) {
            const k = clamp((t - CRACK) / 0.25);
            for (const pts of cracks)
              for (let i = 0, n = Math.floor(pts.length * k);i < n; i++) {
                const [x, y] = pts[i], fresh = i > n - 3 && t - CRACK < 0.3;
                p.px(X0 + x + shake, Y0 + y, fresh ? WHITE : C[7]);
                if (!fresh)
                  p.px(X0 + x + shake, Y0 + y + 1, C[1]);
              }
          }
          p.glow(0, -18, 30, C[4], 0.18 * smooth(0, LOCK, t));
          if (t > LOCK && t < LOCK + 0.18)
            sparkle(p, -4, Y0 + 8, Math.round(8 * (1 - (t - LOCK) / 0.18)), WHITE, C[5], 0.6);
        } else if (t < BURST + 0.08) {
          const k = (t - BURST) / 0.08;
          p.circle(X0 + IX, Y0 + IY, 10 * (1 - k) + 3, WHITE);
        }
        for (const q of pieces) {
          const ca = Math.cos(q.a), sa = Math.sin(q.a), fade = Math.min(1, q.life / 0.5), r = Math.ceil(q.r);
          for (let py = -r;py <= r; py++)
            for (let px = -r;px <= r; px++) {
              const ux = Math.round(px * ca + py * sa), uy = Math.round(-px * sa + py * ca), c = q.map.get(`${ux},${uy}`);
              if (c && rand(ux, uy, q.id) < fade)
                p.px(Math.floor(q.x) + px, Math.floor(q.y) + py, q.max - q.life < 0.05 ? WHITE : c);
            }
          if (q.n > 6)
            p.glow(q.x, q.y, 6, C[5], 0.2 * fade);
        }
        bits.draw(p);
        ps.draw(p, "front");
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/spawn/soul-rise.js
  var meta15 = {
    name: "Soul rise",
    desc: "The body's outline flares and dims, then a pale glowing copy of it lifts out, stretching as its legs melt into a rippling wisp, shedding motes until it thins into light.",
    tags: ["spawn", "death", "soul", "ghost", "spirit", "rise", "light", "one-shot"],
    size: [96, 140],
    origin: [48, 126],
    duration: 3.2,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: {
      palette: ["#101a33", "#1f3563", "#35609e", "#5c96d4", "#94c8f0", "#d2f0ff", "#ffffff"],
      height: 50,
      seed: 27
    }
  };
  var SLUMP = { crouch: 8, lean: 6, hy: 2, fx: 7, fy: -9, bx: 11, by: -9, ffx: 9, fbx: -8 };
  var act10 = {
    onBody: true,
    follow: 0,
    poses: [
      [-0.2, READY],
      [0.3, { turn: 1, crouch: 2, hy: -1, fx: -10, fy: -24, bx: 11, by: -24, ffx: -3, fbx: 4 }],
      [0.7, { turn: 0.7, crouch: 4, lean: 3, hy: 1, fx: 2, fy: -14, bx: 8, by: -14, ffx: 4, fbx: -3 }],
      [1.1, SLUMP],
      [2.7, SLUMP],
      [3.2, { ...SLUMP, crouch: 7 }]
    ],
    dust: [{ t: 1.1, x: 0, n: 5 }]
  };
  var LEAVE = 0.35;
  var TOP2 = 2.05;
  var GONE2 = 2.55;
  var SHADOW = hex("#0c0f1e");
  function create12(o) {
    const C = fit(o.palette, 7), R = new Rng(o.seed), floor = () => 0;
    const body = bodyOf(o.actor, C), rim = rimOf(body), { w: W, h: Hh } = body, waist = Math.round(Hh * 0.6);
    const tone = body.list.map((b) => b.edge ? 6 : 3 + Math.min(2, Math.floor(luma(b.c) * 3.6)));
    const toneAt = new Int8Array(W * Hh).fill(-1);
    body.list.forEach((b, i) => toneAt[b.my * W + b.mx] = tone[i]);
    const ps = new Particles({ rng: R, ground: floor, sparks: [WHITE, C[5], C[4], C[3]] }), lights = new Lights;
    let t = 0, left = false;
    const lift = () => o.height * ease.inOutSine(clamp((t - LEAVE) / (TOP2 - LEAVE)));
    const stretch = () => 1 + 0.22 * ease.inOutSine(clamp((t - LEAVE) / (TOP2 - LEAVE)));
    const sway = (row) => Math.sin(t * 3 - row * 0.12) * 2.2 * smooth(LEAVE, LEAVE + 0.5, t);
    const melt = () => smooth(LEAVE + 0.1, LEAVE + 0.9, t);
    const thin = () => smooth(TOP2 - 0.25, GONE2, t);
    const ring = (p, near) => {
      const k = (t - LEAVE) / 0.5;
      if (k > 0 && k < 1)
        band(p, 0, 0, 6 + 26 * ease.outCubic(k), 0.18, Math.max(1, 3 * (1 - k)), 1.15 - k, C, (g) => Math.sin(g) >= 0 === near, k < 0.12);
    };
    return {
      update(dt) {
        t += dt;
        if (!left && t >= LEAVE) {
          left = true;
          lights.add(0, -20, 50, C[4], 0.85, 0.55);
          lights.add(0, -20, 24, WHITE, 0.8, 0.12);
          for (let i = 0;i < 10; i++) {
            const c = R.pick(rim);
            ps.spawn(P.STAR, c.x, c.y, R.range(-20, 20), -R.range(20, 60), R.range(0.4, 0.8), R.pick([WHITE, C[5]]), R.range(0.8, 1.8));
          }
        }
        if (t > LEAVE && t < GONE2) {
          const s = stretch(), y0 = body.y * s - lift(), th = thin();
          for (let n = 0;n < (th > 0 ? 3 : 1); n++) {
            if (!R.chance(th > 0 ? 0.9 : 0.5))
              continue;
            const c = R.pick(rim), row = c.my;
            if (row / Hh < 1 - th * 1.1 - 0.05 && th > 0)
              continue;
            const x = c.x * (1 - 0.12 * (s - 1) * 4) + sway(row), y = y0 + c.my * s;
            const life = Math.min(R.range(0.5, 1.1), meta15.duration - 0.1 - t, (y + 120) / 60);
            if (life > 0.1)
              ps.spawn(R.chance(0.7) ? P.MOTE : P.STAR, x, y, R.range(-12, 12), -R.range(25, 60), life, R.pick([WHITE, C[5], C[5], C[4]]), R.range(0.5, 1));
          }
        }
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        const k = smooth(0, LEAVE, t) * (1 - smooth(LEAVE + 0.4, TOP2, t));
        if (k > 0)
          p.glow(0, -1, 26, C[4], 0.3 * k);
        ring(p, false);
      },
      draw(p) {
        if (t < LEAVE + 0.3) {
          const k = t < LEAVE ? t / LEAVE : 1 - (t - LEAVE) / 0.3;
          for (const c of rim)
            if (rand(c.mx, c.my, Math.floor(t * 30)) < 0.25 + 0.7 * k)
              p.px(c.x, c.y, k > 0.7 ? WHITE : C[5]);
          p.glow(0, -19, 26, C[4], 0.45 * k);
        }
        const dim = smooth(LEAVE, LEAVE + 0.6, t) * (1 - smooth(GONE2, meta15.duration - 0.1, t));
        if (dim > 0)
          for (const b of body.list)
            p.blend(b.x, b.y, SHADOW, 0.45 * dim);
        ring(p, true);
        if (t < LEAVE || t > GONE2 + 0.1) {
          ps.draw(p);
          lights.draw(p);
          return;
        }
        const s = stretch(), L = lift(), m = melt(), th = thin(), top = body.y * s - L, sx = 1 - 0.12 * (s - 1) * 4;
        const tail = Math.round(10 * m), y1 = top + (Hh + tail) * s, fadeIn = clamp((t - LEAVE) / 0.15);
        for (let y = Math.floor(top);y <= Math.ceil(y1); y++) {
          const my = Math.floor((y + 0.5 - top) / s);
          if (my < 0)
            continue;
          const k = my >= waist ? (my - waist + 1) / (Hh - waist + tail) : 0, narrow = 1 - k * m * 0.95;
          if (narrow <= 0.05)
            continue;
          const cx = sway(my) + Math.sin(my * 0.7 - t * 8) * 2 * k * m, a = (my >= waist ? 1 - k * 0.45 : 1) * fadeIn;
          for (let x = Math.floor(cx - W / 2 - 4);x <= Math.ceil(cx + W / 2 + 4); x++) {
            const mx = Math.floor((x + 0.5 - cx) / (sx * narrow) - body.x);
            if (th > 0 && my / (Hh + tail) > 1 - th * 1.25 + 0.25 * rand(mx, my, 5) - 0.1)
              continue;
            let ti;
            if (my < Hh) {
              if (mx < 0 || mx >= W)
                continue;
              ti = toneAt[my * W + mx];
              if (ti < 0)
                continue;
            } else {
              const w = (1 - (my - Hh) / Math.max(1, tail)) * 3.2 * m, d = Math.abs(x + 0.5 - cx);
              if (d > w)
                continue;
              ti = d > w - 1 ? 5 : 4;
            }
            if (t < LEAVE + 0.07)
              p.px(x, y, ti >= 6 ? C[5] : WHITE);
            else if (ti >= 5)
              p.dot(x, y, ti >= 6 ? WHITE : C[5], Math.min(1, a * 1.3));
            else
              p.blend(x, y, C[ti], a * 0.7);
          }
        }
        const cy = top + Hh * s * 0.45;
        p.glow(sway(10), cy, 30, C[4], 0.42 * fadeIn * (1 - th));
        p.glow(sway(10), cy - 6, 14, C[5], 0.3 * fadeIn * (1 - th));
        ps.draw(p);
        lights.draw(p);
      }
    };
  }
  var actorAlpha5 = () => 1;

  // ../vendor_src/pixelfx/src/fx/pickups/_lib.js
  var SHADOW2 = hex("#100e17");
  var INK3 = hex("#0b0814");
  function glint(p, x, y, arm, c, k = 0.4, tip = scale(c, 0.8)) {
    const n = Math.round(arm), X = Math.floor(x), Y = Math.floor(y);
    if (n < 0)
      return;
    for (let d = 1;d <= n; d++) {
      const cc = d === n && n > 1 ? tip : c;
      p.px(X + d, Y, cc), p.px(X - d, Y, cc), p.px(X, Y + d, cc), p.px(X, Y - d, cc);
    }
    p.px(X, Y, n > 0 ? WHITE : c);
    p.glow(X + 0.5, Y + 0.5, 3 + n * 2.5, c, k);
  }

  // ../vendor_src/pixelfx/src/fx/pickups/collect-burst.js
  var meta16 = {
    name: "Collect burst",
    desc: "The moment of pickup: a white flash and a cross of light, a thin ring snapping out ahead of a softer one, twinkles thrown wide on curving paths that brake, hang and wink out.",
    tags: ["pickup", "collect", "burst", "sparkle", "reward", "one-shot"],
    size: [112, 108],
    origin: [56, 94],
    duration: 1.35,
    loop: false,
    fps: 30,
    bg: "ground",
    options: { palette: ["#1a0516", "#3d0a33", "#701560", "#b0228f", "#f53cd1", "#ff86e6", "#ffd2f6", "#ffffff"], seed: 3 }
  };
  var CY2 = -30;
  function create13(o) {
    const C = fit(o.palette, 8), R = new Rng(o.seed), lights = new Lights;
    lights.add(0, CY2, 36, C[5], 0.85, 0.32);
    lights.add(0, CY2, 14, WHITE, 0.75, 0.08);
    const stars = Array.from({ length: 14 }, (_, i) => {
      const a = i / 14 * TAU + R.range(-0.2, 0.2), sp = R.range(145, 225) * (i % 3 === 0 ? 1.12 : 0.85);
      return { x: 0, y: CY2, a, sp, turn: (i % 2 ? 1 : -1) * R.range(2.5, 5), life: R.range(0.75, 1.15), age: 0, size: i % 3 === 0 ? 2.6 : R.range(1.2, 2), tr: [], c: i % 4 === 0 ? WHITE : i % 2 ? C[6] : C[5], ph: R.range(0, TAU) };
    });
    const motes = Array.from({ length: 7 }, () => ({ x: R.range(-8, 8), y: CY2 + R.range(-4, 6), vy: -R.range(12, 30), life: R.range(0.5, 0.9), d: R.range(0.05, 0.25), w: R.range(0, TAU) }));
    let t = 0;
    return {
      update(dt) {
        t += dt;
        for (const s of stars) {
          if (s.age > s.life)
            continue;
          s.age += dt;
          s.tr.unshift([s.x, s.y]);
          if (s.tr.length > 4)
            s.tr.pop();
          s.a += s.turn * dt * Math.max(0, 1 - s.age * 1.5);
          s.sp -= s.sp * 4.3 * dt;
          s.x += Math.cos(s.a) * s.sp * dt;
          s.y += Math.sin(s.a) * s.sp * dt + 6 * s.age * dt;
          if (s.y > -2)
            s.y = -2, s.a = -Math.abs(s.a), s.sp *= 0.5;
        }
        lights.update(dt);
      },
      draw(p) {
        if (t < 0.07)
          p.circle(0, CY2, 5.5 * (1 - t / 0.07) + 1, WHITE);
        if (t < 0.16) {
          const k = 1 - t / 0.16, L = 26 * ease.outCubic(Math.min(1, t / 0.03 + 0.4)) * k;
          for (const [dx, dy, l] of [[1, 0, 1], [-1, 0, 1], [0, 1, 0.6], [0, -1, 0.6]])
            p.line(0, CY2, dx * L * l, CY2 + dy * L * l, (u) => u < 0.3 ? WHITE : u < 0.65 ? C[6] : C[5], (u) => (u < 0.5 ? 1 : (1 - u) * 2) * (0.5 + k));
          p.glow(0, CY2, 20 * k + 4, C[5], 0.6 * k);
        }
        const u1 = t / 0.32;
        if (u1 < 1) {
          const r = 3 + 23 * ease.outExpo(u1);
          p.ring(0, CY2, r, 1, u1 < 0.3 ? WHITE : C[6], 1.3 - u1 * 1.2);
          p.glowRing(0, CY2, r, 4, C[5], 0.4 * (1 - u1));
        }
        const u2 = (t - 0.04) / 0.5;
        if (u2 > 0 && u2 < 1) {
          const r = 2 + 16 * ease.outCubic(u2);
          p.ring(0, CY2, r, Math.max(1, 2.6 * (1 - u2)), C[5], 1 - u2);
        }
        for (const s of stars) {
          if (s.age > s.life)
            continue;
          const k = 1 - s.age / s.life, tw = 0.65 + 0.35 * Math.sin(s.age * 26 + s.ph);
          s.tr.forEach(([x, y], i) => i > 0 && p.dot(x, y, i < 2 ? C[5] : C[4], (1 - i / 4) * k * 1.4));
          if (k < 0.3 && Math.sin(s.age * 40 + s.ph) < 0)
            continue;
          glint(p, s.x, s.y, Math.round(s.size * tw * Math.min(1, k * 2.5)), s.c, 0.45 * k);
        }
        for (const m of motes) {
          const a = t - m.d;
          if (a < 0 || a > m.life)
            continue;
          const k = 1 - a / m.life, x = m.x + Math.sin(a * 6 + m.w) * 1.5, y = m.y + m.vy * a;
          p.dot(x, y, k > 0.5 ? C[6] : C[5], k * 1.5);
          p.glow(x + 0.5, y + 0.5, 3, C[5], 0.3 * k);
        }
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/weather/_lib.js
  var BAYER2 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
  function box(meta) {
    const [W, H] = meta.size, [OX, OY] = meta.origin;
    return { x0: -OX, y0: -OY, x1: W - OX, y1: H - OY, w: W, h: H };
  }
  function clip(p, meta) {
    const B = box(meta), q = Object.create(p);
    let ok;
    if (p.sn === 0) {
      const a = p.toX(B.x0, 0), b = p.toX(B.x1, 0), sx0 = Math.round(Math.min(a, b)), sx1 = Math.round(Math.max(a, b));
      const sy0 = Math.round(p.toY(0, B.y0)), sy1 = Math.round(p.toY(0, B.y1));
      ok = (sx, sy) => sx >= sx0 && sx < sx1 && sy >= sy0 && sy < sy1;
    } else
      ok = (sx, sy) => {
        const lx = p.fromX(sx + 0.5, sy + 0.5), ly = p.fromY(sx + 0.5, sy + 0.5);
        return lx >= B.x0 && lx < B.x1 && ly >= B.y0 && ly < B.y1;
      };
    q.put = (sx, sy, c, a) => ok(sx, sy) && p.put(sx, sy, c, a);
    q.add = (sx, sy, c, k) => ok(sx, sy) && p.add(sx, sy, c, k);
    q.blendPx = (sx, sy, c, a) => ok(sx, sy) && p.blendPx(sx, sy, c, a);
    q.glow = (x, y, r, c, k) => glow(q, B, x, y, r, c, k);
    return q;
  }
  function glow(q, B, x, y, r, c, k) {
    if (r < 1 || k <= 0.004)
      return;
    const x0 = Math.max(B.x0, Math.floor(x - r)), x1 = Math.min(B.x1 - 1, Math.ceil(x + r));
    const y0 = Math.max(B.y0, Math.floor(y - r)), y1 = Math.min(B.y1 - 1, Math.ceil(y + r));
    for (let py = y0;py <= y1; py++) {
      const dy = (py + 0.5 - y) / r;
      for (let px = x0;px <= x1; px++) {
        const dx = (px + 0.5 - x) / r, d = dx * dx + dy * dy;
        if (d >= 1)
          continue;
        const f = 1 - Math.sqrt(d);
        q.light(px, py, c, f * f * k);
      }
    }
  }
  var OUT2 = { c: 0, a: 1, b: 0, l: 0, k: 0 };
  function pass(p, meta, y0, y1, fn) {
    const B = box(meta), o = OUT2;
    y0 = Math.max(B.y0, Math.floor(y0));
    y1 = Math.min(B.y1 - 1, Math.ceil(y1));
    if (y0 > y1)
      return;
    if (p.sn !== 0) {
      const q = clip(p, meta);
      for (let y = y0;y <= y1; y++)
        for (let x = B.x0;x < B.x1; x++) {
          o.c = 0;
          o.a = 1;
          o.b = 0;
          o.l = 0;
          o.k = 0;
          fn(x + 0.5, y + 0.5, o);
          if (o.c)
            o.b ? q.blend(x, y, o.c, o.a) : q.dot(x, y, o.c, o.a);
          if (o.k > 0)
            q.light(x, y, o.l || o.c, o.k);
        }
      return;
    }
    const { C, L, w: W, fade } = p, lk = p.lightK * fade, { fx, tx } = p;
    for (let y = y0;y <= y1; y++) {
      const sy = Math.floor(p.ty + y + 0.5), ry = sy - p.oy;
      if (ry < 0 || ry >= p.h)
        continue;
      const row = ry * W, by = (sy & 3) << 2;
      let sxf = tx + (B.x0 + 0.5) * fx;
      for (let x = B.x0;x < B.x1; x++, sxf += fx) {
        const sx = Math.floor(sxf), rx = sx - p.ox;
        if (rx < 0 || rx >= W)
          continue;
        o.c = 0;
        o.a = 1;
        o.b = 0;
        o.l = 0;
        o.k = 0;
        fn(x + 0.5, y + 0.5, o);
        const i = row + rx;
        if (o.c) {
          const a = o.a * fade;
          if (o.b) {
            if (a > 0.004) {
              const d = C[i], da = (d >>> 24) / 255, oa = a + da * (1 - a), k = a / oa, j = 1 - k, c = o.c;
              const r = (c & 255) * k + (d & 255) * j & 255, g = (c >>> 8 & 255) * k + (d >>> 8 & 255) * j & 255;
              const b = (c >>> 16 & 255) * k + (d >>> 16 & 255) * j & 255;
              C[i] = (oa * 255 & 255) << 24 | b << 16 | g << 8 | r;
            }
          } else if (a >= 1 || a > BAYER2[by | sx & 3])
            C[i] = o.c;
        }
        if (o.k > 0) {
          const k = o.k * lk;
          if (k > 0.004) {
            const c = o.l || o.c, d = L[i];
            const r = Math.min(255, (d & 255) + (c & 255) * k) | 0, g = Math.min(255, (d >>> 8 & 255) + (c >>> 8 & 255) * k) | 0;
            const b = Math.min(255, (d >>> 16 & 255) + (c >>> 16 & 255) * k) | 0;
            L[i] = 255 << 24 | b << 16 | g << 8 | r;
          }
        }
      }
    }
  }
  var bayer = (x, y) => BAYER2[(Math.floor(y) & 3) << 2 | Math.floor(x) & 3];
  var FIELDS = new Map;
  function field(seed, w = 256, h = 128, cells = [4, 8, 16, 32]) {
    const key = `${seed}|${w}|${h}|${cells}`;
    let F = FIELDS.get(key);
    if (F)
      return F;
    const d = new Float32Array(w * h);
    let amp = 0.5, total = 0;
    for (const n of cells) {
      const cs = w / n, rows = Math.max(1, Math.round(h / cs));
      const at = (a, b) => rand(wrap(a, n), wrap(b, rows), seed, n);
      for (let y = 0;y < h; y++)
        for (let x = 0;x < w; x++) {
          const gx = x / cs, gy = y / h * rows, ix = Math.floor(gx), iy = Math.floor(gy), u = gx - ix, v = gy - iy;
          const su = u * u * (3 - 2 * u), sv = v * v * (3 - 2 * v);
          const top = at(ix, iy) + (at(ix + 1, iy) - at(ix, iy)) * su, bot = at(ix, iy + 1) + (at(ix + 1, iy + 1) - at(ix, iy + 1)) * su;
          d[y * w + x] += (top + (bot - top) * sv) * amp;
        }
      total += amp;
      amp *= 0.5;
    }
    for (let i = 0;i < d.length; i++)
      d[i] /= total;
    FIELDS.set(key, F = { w, h, d });
    return F;
  }
  function sample(F, u, v) {
    const x = Math.floor(u), y = Math.floor(v), fx = u - x, fy = v - y, m = F.w - 1, n = F.h - 1, D = F.d;
    const x0 = x & m, x1 = x + 1 & m, y0 = (y & n) * F.w, y1 = (y + 1 & n) * F.w;
    const a = D[y0 + x0], b = D[y0 + x1], c = D[y1 + x0], e = D[y1 + x1];
    return a + (b - a) * fx + (c - a + (a - b - c + e) * fx) * fy;
  }
  function trips(t, D, n, seed, m0, m1, fn) {
    for (let i = 0;i < n; i++) {
      const m = m0 + Math.floor(rand(seed, i, 72) * (m1 - m0 + 1)), s = t / D * m + rand(seed, i, 71), k = Math.floor(s);
      fn(s - k, k, m, i);
    }
  }
  function crown(q, x, z, age, size, c, h) {
    const L = 0.22 + 0.14 * size, u = age / L, X = Math.round(x), Z = Math.round(z);
    if (u >= 1)
      return false;
    if (age < 0.1) {
      const up = age < 0.033 ? 1 : age < 0.067 ? 2 : 2 + (size > 0.5 ? 1 : 0);
      q.px(X, Z - 1, age < 0.05 ? c.white : c.hot);
      for (let d = 1;d <= Math.min(up, size > 0.5 ? 3 : 1); d++)
        q.px(X - d, Z - 1 - (d > 1 ? d - 1 : 0), d === 1 ? c.hot : c.cool), q.px(X + d, Z - 1 - (d > 1 ? d - 1 : 0), d === 1 ? c.hot : c.cool);
    }
    if (u > 0.15) {
      const w = Math.round(1 + (1.5 + 3.5 * size) * Math.sqrt(u)), gap = u > 0.55 ? Math.max(0, w - 2) : -1;
      for (let d = -w;d <= w; d++)
        if (Math.abs(d) > gap)
          q.px(X + d, Z, Math.abs(d) >= w - 1 && u < 0.6 ? c.hot : c.cool);
    }
    const nd = size > 0.5 ? 2 : 1, H = Math.floor(h * 1e6);
    for (let d = 0;d < nd; d++) {
      const vx = (rand(H, d, 1) - 0.5) * 2 * (20 + 30 * size), vy = -(50 + rand(H, d, 2) * 60 * (0.4 + size)), y = Z - 1 + vy * age + 475 * age * age;
      if (y < Z - 0.5 && age < 0.3)
        q.px(x + vx * age, y, age < 0.1 ? c.white : c.hot);
    }
    return true;
  }

  // ../vendor_src/pixelfx/src/fx/weather/rain.js
  var meta17 = {
    name: "Rain",
    desc: "Slanted rain at four depths: far drops fade into the dark, near ones glint and splash, drops ring the puddles and a low mist drifts over the wet floor.",
    tags: ["weather", "rain", "storm", "water", "ambient", "loop"],
    size: [320, 180],
    origin: [160, 170],
    duration: 8,
    loop: true,
    fps: 30,
    bg: "sky",
    options: {
      palette: ["#0e1322", "#1a2440", "#283a5e", "#3a5482", "#5674a8", "#84a6d6", "#c0dcf8", "#f2f8ff"],
      density: 1,
      seed: 4
    }
  };
  var D4 = 8;
  var SLANT = -0.2;
  var UX = SLANT / Math.hypot(SLANT, 1);
  var UY = 1 / Math.hypot(SLANT, 1);
  var LAYERS2 = [
    { n: 200, m: [10, 13], len: 2, col: [2, 2, 3], stop: [-80, -6] },
    { n: 150, m: [14, 17], len: 4, col: [2, 3, 4], stop: [-45, -2] },
    { n: 96, m: [19, 23], len: 7, col: [3, 4, 5], z: [0, 1.4], size: [0.15, 0.4] },
    { n: 42, m: [25, 29], len: 13, col: [3, 5, 7], z: [2, 6.5], size: [0.6, 1], near: true }
  ];
  function pools(S) {
    return Array.from({ length: 5 }, (_, i) => {
      const x = -150 + i * 66 + rand(S, i, 61) * 30, w = 16 + rand(S, i, 63) * 26;
      return { x0: x, x1: x + w, y: 3 + Math.floor(rand(S, i, 62) * 3) };
    });
  }
  var poolAt = (P, x, y) => P.find((p) => x >= p.x0 + 2 && x <= p.x1 - 2 && Math.abs(y - p.y) < 1.5);
  function drawBack4(p, t, o) {
    t = Math.round(t * 30000) / 30000;
    const q = clip(p, meta17), S = o.seed, C = fit(o.palette, 8), P = pools(S);
    const haze = mix(C[0], C[1], 0.6);
    pass(p, meta17, -170, -0.5, (x, y, out) => {
      out.c = haze;
      out.a = 0.3 + 0.26 * smooth(-170, 0, y);
      out.b = 1;
    });
    floor(q, t, S, C, P);
    for (let L = 0;L < 3; L++)
      layer(q, t, S, C, P, L, o.density);
    mist(p, t, S, C);
  }
  function draw4(p, t, o) {
    t = Math.round(t * 30000) / 30000;
    const q = clip(p, meta17), S = o.seed, C = fit(o.palette, 8), P = pools(S);
    layer(q, t, S, C, P, 3, o.density);
  }
  function layer(q, t, S, C, P, L, density) {
    const Ly = LAYERS2[L], sd = S * 11 + L, [c0, c1, c2] = Ly.col.map((i) => C[i]), len = Ly.len;
    const n = Math.round(Ly.n * density), G = field(S + 21, 256, 128, [4, 8, 16]), sweep = 256 * t / D4;
    trips(t, D4, n, sd, Ly.m[0], Ly.m[1], (u, k, m, i) => {
      const j = wrap(k, m);
      if (L < 2 && rand(sd, i, j, 7) > 0.35 + 1.3 * (sample(G, (-166 + rand(sd, i, j, 2) * 332) * 0.8 + sweep, 9 + L * 40) - 0.32))
        return;
      const end = Ly.z ? Ly.z[0] + rand(sd, i, j, 1) * (Ly.z[1] - Ly.z[0]) : Ly.stop[0] + rand(sd, i, j, 1) * (Ly.stop[1] - Ly.stop[0]);
      const y0 = -172 - len, y = y0 + (end - y0) * u, x = -166 + rand(sd, i, j, 2) * 332 - (end - y) * SLANT;
      const a = Ly.z ? 1 : Math.min(1, (1 - u) * 5);
      if (len <= 2)
        q.dot(x, y, c2, a), q.dot(x - UX, y - UY, c1, a * 0.8);
      else {
        q.line(x - UX * len, y - UY * len, x - UX * len * 0.45, y - UY * len * 0.45, c0, (v) => a * (0.35 + 0.65 * v));
        q.line(x - UX * len * 0.45, y - UY * len * 0.45, x - UX, y - UY, c1, a);
        q.dot(x, y, c2, a);
      }
      if (Ly.near)
        q.glow(x, y - 2, 4, C[5], 0.12);
      if (!Ly.z)
        return;
      const dur = D4 / m;
      for (let back = 1;back < 4; back++) {
        const age = u * dur + (back - 1) * dur;
        if (age > 0.7)
          break;
        const jp = wrap(k - back, m), z = Ly.z[0] + rand(sd, i, jp, 1) * (Ly.z[1] - Ly.z[0]), xp = -166 + rand(sd, i, jp, 2) * 332;
        if (rand(sd, i, jp, 5) > (Ly.near ? 1 : 0.7))
          continue;
        const size = Ly.size[0] + (z - Ly.z[0]) / (Ly.z[1] - Ly.z[0]) * (Ly.size[1] - Ly.size[0]), pool = Ly.near && poolAt(P, xp, z);
        if (pool)
          rings(q, xp, pool, age, C);
        else if (crown(q, xp, z, age, size, { hot: C[6], cool: C[4], white: WHITE }, rand(sd, i, jp, 4)) && Ly.near && age < 0.1)
          q.glow(xp, z - 1, 5, C[5], 0.3 * (1 - age / 0.1));
      }
    });
  }
  function rings(q, x, pool, age, C) {
    const X = Math.round(x), y = pool.y;
    if (age < 0.05)
      q.px(X, y, C[7]);
    for (let r = 0;r < 2; r++) {
      const a = age - r * 0.16, u = a / 0.5;
      if (u <= 0 || u >= 1)
        continue;
      const w = Math.round(1 + 7 * Math.sqrt(u)), c = u < 0.4 && !r ? C[6] : C[5];
      for (const s of [-1, 1])
        for (let d = 0;d < (u < 0.6 ? 2 : 1); d++) {
          const px = X + s * (w - d);
          if (px > pool.x0 && px < pool.x1)
            q.px(px, y, c);
        }
    }
  }
  function floor(q, t, S, C, P) {
    pass(q, meta17, 0, 9.5, (x, y, out) => {
      if (y < 1)
        return void (out.c = C[4], out.l = C[5], out.k = 0.08);
      if (y < 2)
        return void (out.c = C[1]);
      out.c = C[0];
      out.a = 0.55;
      out.b = 1;
      for (const p of P)
        if (x >= p.x0 && x < p.x1 && Math.floor(y) === p.y) {
          const edge = x < p.x0 + 2 || x >= p.x1 - 2;
          out.c = edge ? C[3] : C[4];
          out.a = 1;
          out.b = 0;
          out.l = C[5];
          out.k = 0.06;
        }
    });
    P.forEach((p, i) => {
      const gx = Math.round(p.x0 + 3 + (p.x1 - p.x0 - 6) * (0.5 + 0.5 * Math.sin(Math.PI * 2 * t / D4 + i * 1.9)));
      q.px(gx, p.y, C[6]);
      q.glow(gx, p.y, 4, C[5], 0.2);
    });
  }
  function mist(p, t, S, C) {
    const M = field(S + 9, 256, 128, [4, 8, 16, 32]), drift = 256 * t / D4, crest = mix(C[4], C[5], 0.5);
    const dens = (x, y) => {
      const prof = smooth(-22, -4, y) * (1 - smooth(7, 10, y));
      return prof * (0.62 + (sample(M, x * 0.45 + drift, y * 4 + 30) - 0.5) * 2);
    };
    pass(p, meta17, -20, 9, (x, y, out) => {
      const d = dens(x, y);
      if (d < 0.28)
        return;
      const th = bayer(x, y) * 0.06;
      out.b = 1;
      if (d > 0.46 + th && dens(x, y - 1) < 0.43)
        out.c = crest, out.a = 0.5;
      else
        out.c = d > 0.58 + th ? C[4] : C[3], out.a = clamp((d - 0.28) * 1.6) * 0.5;
      out.l = C[4];
      out.k = (d - 0.3) * 0.1;
    });
  }

  // ../vendor_src/pixelfx/src/fx/weather/snow.js
  var meta18 = {
    name: "Snow",
    desc: "Snow at three depths in a gusty breeze: far specks, drifting flakes, big near crystals that spin and glow; they settle on a sparkling drift and melt away.",
    tags: ["weather", "snow", "winter", "cold", "ambient", "loop"],
    size: [320, 180],
    origin: [160, 170],
    duration: 12,
    loop: true,
    fps: 30,
    bg: "sky",
    options: {
      palette: ["#0c1020", "#161d36", "#24304f", "#3a4a72", "#5f74a3", "#93abd6", "#cfe0fa", "#ffffff"],
      seed: 6
    }
  };
  var D5 = 12;
  var bank = (x) => -3 + 1.6 * Math.sin(x * 0.045 + 1.3) + 1.1 * Math.sin(x * 0.12 + 0.4) + 0.6 * Math.sin(x * 0.31 + 2);
  var gust = (t) => 10 * Math.sin(TAU * t / D5 + 0.6) + 4 * Math.sin(TAU * 2 * t / D5 + 2.1);
  var LAYERS3 = [
    { n: 230, m: [1, 2], air: 1, sway: [1, 3], wind: 3, gust: 0.4 },
    { n: 140, m: [2, 3], air: 0.8, sway: [3, 7], wind: 6, gust: 0.7 },
    { n: 24, m: [2, 3], air: 0.74, sway: [8, 15], wind: 9, gust: 1 }
  ];
  function drawBack5(p, t, o) {
    const q = clip(p, meta18), S = o.seed, C = fit(o.palette, 8);
    const haze = mix(C[1], C[2], 0.4);
    pass(p, meta18, -170, 9, (x, y, out) => {
      out.c = haze;
      out.a = 0.26 + 0.22 * smooth(-170, 0, y);
      out.b = 1;
    });
    layer2(q, t, S, C, 0);
    drift(q, t, S, C);
    layer2(q, t, S, C, 1);
  }
  function draw5(p, t, o) {
    const q = clip(p, meta18), S = o.seed, C = fit(o.palette, 8);
    layer2(q, t, S, C, 2);
  }
  function layer2(q, t, S, C, L) {
    const Ly = LAYERS3[L], sd = S * 13 + L;
    trips(t, D5, Ly.n, sd, Ly.m[0], Ly.m[1], (u, k, m, i) => {
      const j = wrap(k, m), dur = D5 / m, R = (n) => rand(sd, i, j, n);
      const tf = dur * Ly.air, age = Math.min(u * dur, tf), sw = Ly.sway[0] + R(3) * (Ly.sway[1] - Ly.sway[0]), f = 0.25 + R(4) * 0.35, ph = R(5) * TAU;
      const xAt = (a) => -175 + R(2) * 350 + Ly.wind * a + (gust(t - u * dur + a) - gust(t - u * dur)) * Ly.gust + sw * Math.sin(TAU * f * a + ph);
      const x = xAt(age), xl = xAt(tf), y0 = -176, y1 = L ? bank(xl) - 0.5 : -110 + R(1) * 106;
      const y = y0 + (y1 - y0) * (age / tf), rest = u * dur - tf;
      if (L === 0) {
        const a = Math.min(1, (1 - u) * 6);
        q.dot(x, y, R(6) < 0.5 ? C[4] : C[5], a);
        return;
      }
      const fade = rest > 0 ? 1 - rest / (dur - tf) : 1;
      if (L === 1) {
        const big = R(6) < 0.3;
        if (rest > 0)
          return void q.dot(xl, y1, C[7], fade * 0.9);
        q.px(x, y, big ? WHITE : C[7]);
        if (big)
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]])
            q.px(x + dx, y + dy, C[5]);
        else
          q.px(x + 1, y, C[6]), q.px(x, y + 1, C[6]), q.px(x + 1, y + 1, C[5]);
        return;
      }
      const r = R(6) < 0.4 ? 3 : R(6) < 0.8 ? 4 : 5, spin = 1.5 + R(7) * 2.5;
      if (rest > 0) {
        q.dot(xl - 1, y1, C[6], fade);
        q.dot(xl, y1, WHITE, fade);
        q.dot(xl + 1, y1, C[6], fade);
        q.glow(xl, y1, 5, C[5], 0.25 * fade);
        return;
      }
      crystal2(q, x, y, r, Math.floor(age * spin + R(8) * 2) % 2, C);
    });
  }
  var AXIS = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  var DIAG2 = [[1, 1], [-1, -1], [1, -1], [-1, 1]];
  function crystal2(q, x, y, r, turn, C) {
    const X = Math.round(x), Y = Math.round(y), long = turn ? DIAG2 : AXIS, short = turn ? AXIS : DIAG2, R = turn ? r - 1 : r;
    for (const [dx, dy] of long) {
      for (let d = 1;d <= R; d++)
        q.px(X + dx * d, Y + dy * d, d === R ? WHITE : C[6]);
      const nubs = turn ? R >= 3 ? [R - 1] : [] : R >= 5 ? [R - 1, R - 2] : R >= 4 ? [R - 1] : [];
      for (const n of nubs) {
        const ox = turn ? dx : dy, oy = turn ? -dy : -dx;
        q.px(X + dx * n + (turn ? 0 : ox), Y + dy * n + (turn ? oy : oy), C[4]);
        q.px(X + dx * n + (turn ? -dx : -ox) + (turn ? dx : 0), Y + dy * n + (turn ? dy * 0 : -oy), C[4]);
      }
    }
    for (const [dx, dy] of short)
      for (let d = 1;d <= (turn ? 1 : Math.max(1, Math.floor(R / 2))); d++)
        q.px(X + dx * d, Y + dy * d, d === 1 ? C[6] : C[5]);
    q.px(X, Y, WHITE);
    q.glow(X + 0.5, Y + 0.5, r * 2.5 + 5, C[5], 0.13);
    q.light(X, Y, C[6], 0.4);
  }
  function drift(q, t, S, C) {
    pass(q, meta18, -7, 9, (x, y, out) => {
      const top = bank(x), d = y - top;
      if (d < 0)
        return;
      out.c = d < 1 ? WHITE : d < 2 ? C[7] : d < 3.5 ? C[6] : d < 6 ? C[5] : C[4];
      if (d < 1)
        out.l = C[6], out.k = 0.12;
    });
    for (let i = 0;i < 18; i++) {
      const x = -156 + rand(S, i, 81) * 312, c = 1 + Math.floor(rand(S, i, 82) * 3), tw = Math.sin(TAU * c * t / D5 + rand(S, i, 83) * TAU);
      if (tw < 0.55)
        continue;
      const y = Math.ceil(bank(x)) + Math.floor(rand(S, i, 84) * 3), k = (tw - 0.55) / 0.45;
      q.px(x, y, WHITE);
      if (k > 0.5)
        for (const [dx, dy] of [[1, 0], [-1, 0], [0, -1]])
          q.px(x + dx, y + dy, C[6]);
      q.glow(x + 0.5, y + 0.5, 6, C[6], 0.35 * k);
    }
  }

  // ../vendor_src/pixelfx/src/fx/holy/_lib.js
  var SHAPES2 = new WeakMap;
  function shapeOf(A) {
    let s = SHAPES2.get(A.mask);
    if (s && s.x === A.x && s.y === A.y)
      return s;
    const m = A.mask, inside = (i, j) => i >= 0 && j >= 0 && i < m.w && j < m.h && m.data[j * m.w + i] > 0;
    const edge = [], out = [];
    for (let j = -1;j <= m.h; j++)
      for (let i = -1;i <= m.w; i++) {
        const nb = inside(i - 1, j) + inside(i + 1, j) + inside(i, j - 1) + inside(i, j + 1);
        if (inside(i, j)) {
          if (nb < 4)
            edge.push([A.x + i, A.y + j]);
        } else if (nb)
          out.push([A.x + i, A.y + j]);
      }
    s = { x: A.x, y: A.y, edge, out, top: A.y, bottom: A.y + m.h, at: (x, y) => inside(Math.floor(x) - A.x, Math.floor(y) - A.y) };
    SHAPES2.set(A.mask, s);
    return s;
  }
  function recolor(p, A, fn, a = 1) {
    const { mask: m, pixels: P } = A, fa = typeof a === "function";
    if (!P)
      return;
    for (let j = 0;j < m.h; j++)
      for (let i = 0;i < m.w; i++) {
        const c = P[j * m.w + i];
        if (!c)
          continue;
        const x = A.x + i, y = A.y + j, n = fn(c, x, y);
        if (n)
          p.dot(x, y, n, fa ? a(x, y) : a);
      }
  }
  function oval(p, cx, cy, rx, ry, c, a = 1, keep = null) {
    if (rx < 0.5)
      return;
    const n = Math.ceil(Math.max(rx, ry) * TAU * 1.5) + 6, fc = typeof c === "function", fa = typeof a === "function";
    for (let j = 0;j < n; j++) {
      const g = j / n * TAU;
      if (keep && !keep(g))
        continue;
      p.dot(cx + Math.cos(g) * rx, cy + Math.sin(g) * ry, fc ? c(g) : c, fa ? a(g) : a);
    }
  }

  // ../vendor_src/pixelfx/src/fx/holy/heal.js
  var meta19 = {
    name: "Heal",
    desc: "Petals of light bloom under the feet, a hoop of light rises up the body restoring its colour and leaving sparkles, and motes spiral up and pop into tiny hearts.",
    tags: ["holy", "heal", "restore", "buff", "petals", "hearts", "character", "one-shot"],
    size: [80, 104],
    origin: [40, 92],
    duration: 1.9,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: { palette: ["#3d2027", "#7d3f35", "#c97a4a", "#f2b46a", "#ffd994", "#fff0cf", "#fffaf2", "#ffffff"], seed: 2 }
  };
  var HURT = { turn: 0.8, crouch: 5, lean: 3, hy: 1, fx: 1, fy: -21, bx: 7, by: -15, ffx: 4, fbx: -3 };
  var UP = { turn: 1.15, crouch: -1, fx: -13, fy: -36, bx: 14, by: -36, hy: -1, ffx: -3, fbx: 4 };
  var act11 = {
    onBody: true,
    poses: [
      [-0.3, HURT],
      [0.16, { ...HURT, crouch: 6 }],
      [0.5, { ...HURT, crouch: 3, lean: 1, hy: 0 }],
      [0.78, UP],
      [1.2, { ...UP, crouch: 0, fy: -30, by: -30, hy: 0 }],
      [1.9, READY]
    ]
  };
  var SY = 0.3;
  var NP = 8;
  var PR = 16;
  var LIFT0 = 0.16;
  var LIFT1 = 0.74;
  var TOPY = -43;
  var HEART = [".#.#.", "#####", ".###.", "..#.."];
  function heart(p, x, y, C, a) {
    const X = Math.round(x) - 2, Y = Math.round(y) - 2, at = (i, j) => j >= 0 && j < 4 && i >= 0 && i < 5 && HEART[j][i] === "#";
    for (let j = -1;j <= 4; j++)
      for (let i = -1;i <= 5; i++) {
        if (at(i, j))
          p.dot(X + i, Y + j, i === 1 && j === 1 ? WHITE : j >= 2 ? C[5] : C[6], a);
        else if (at(i - 1, j) || at(i + 1, j) || at(i, j - 1) || at(i, j + 1))
          p.dot(X + i, Y + j, C[3], a * 0.9);
      }
    p.glow(x, y, 6, C[5], 0.4 * a);
  }
  function create14(o) {
    const C = fit(o.palette, 8), A = o.actor, S = shapeOf(A), R = new Rng(o.seed);
    const ps = new Particles({ rng: R, ground: () => 0, sparks: [WHITE, C[6], C[5], C[4]] });
    const lights = new Lights;
    const rows = new Map;
    for (const [x, y] of S.edge)
      (rows.get(y) ?? rows.set(y, []).get(y)).push(x);
    const petals = Array.from({ length: NP }, (_, k) => ({ a: k / NP * TAU + 0.2, t0: 0.02 + k * 3 % NP * 0.035, w: R.range(4.2, 5.2) }));
    const motes = [];
    for (let k = 0;k < NP; k++)
      motes.push({ t0: 0.2 + k * 0.05, th0: petals[k].a, r0: PR * 0.9, y0: -1, w: 4.2 * (k % 2 ? 1 : -1), v: R.range(46, 58), life: R.range(0.75, 0.95), kind: k % 2 });
    for (let k = 0;k < 8; k++)
      motes.push({ t0: LIFT1 + R.range(0, 0.06), th0: k / 8 * TAU, r0: R.range(12, 18), y0: TOPY + R.range(-2, 4), w: 3.6 * (k % 2 ? 1 : -1), v: R.range(14, 34), life: R.range(0.35, 0.6), kind: (k + 1) % 2 });
    let t = 0, burst = false, lastRow = 1;
    const hoopY = (tt) => lerp(0, TOPY, ease.inOutSine(seg(tt, LIFT0, LIFT1)));
    const hoopR = (tt) => lerp(PR, 12, seg(tt, LIFT0, LIFT1));
    function bloom(k, tt) {
      const pe = petals[k];
      return ease.outBack(seg(tt, pe.t0, pe.t0 + 0.3), 1.8) * (1 - ease.inBack(seg(tt, 1.25 + k * 0.02, 1.6 + k * 0.02), 1.4));
    }
    function petal(p, k, back) {
      const pe = petals[k], g = pe.a + t * 0.4, near = Math.sin(g) >= 0, b = bloom(k, t);
      if (near === back || b <= 0.02)
        return;
      const ca = Math.cos(g), sa = Math.sin(g), rb = 6, rt = rb + 9 * Math.min(1.2, b), h = (k % 2 ? 7 : 9) * b;
      const bx = ca * rb, by = sa * rb * SY, tx = ca * rt, ty = sa * rt * SY - h, L = Math.hypot(tx - bx, ty - by);
      if (L < 1.5)
        return;
      const ux = (tx - bx) / L, uy = (ty - by) / L, W = pe.w * Math.min(1, b) * (0.35 + 0.65 * Math.abs(sa)), pad = W + 1;
      p.each(Math.min(bx, tx) - pad, Math.min(by, ty) - pad, Math.max(bx, tx) + pad, Math.max(by, ty) + pad, (x, y, sx, sy) => {
        const dx = x - bx, dy = y - by, u = (dx * ux + dy * uy) / L;
        if (u < 0 || u > 1)
          return;
        const hw = W * Math.pow(Math.sin(Math.PI * Math.pow(u, 0.6)), 0.7) + 0.2, v = Math.abs(-dx * uy + dy * ux) / hw;
        if (v > 1)
          return;
        if (u > 0.9)
          return p.put(sx, sy, WHITE, 1);
        if (v > 0.7)
          return p.put(sx, sy, u < 0.3 ? C[3] : u < 0.7 ? C[5] : C[6], 1);
        if (v < 0.2 && u > 0.15 && u < 0.85)
          return p.put(sx, sy, u < 0.55 ? C[5] : C[6], back ? 0.75 : 0.85);
        p.blendPx(sx, sy, u < 0.45 ? C[3] : C[4], back ? 0.6 : 0.45);
      });
      p.glow(tx, ty, 5, C[5], 0.35 * Math.min(1, b));
    }
    function hoop(p, back) {
      if (t < LIFT0 || t > LIFT1 + 0.12)
        return;
      const y = hoopY(t), r = hoopR(t) * (t > LIFT1 ? 1 - (t - LIFT1) / 0.12 : 1), keep = back ? (g) => Math.sin(g) < 0 : (g) => Math.sin(g) >= 0;
      oval(p, 0, y, r, r * SY, (g) => Math.sin(g) > 0.5 ? WHITE : C[6], back ? 0.8 : 1, keep);
      if (!back) {
        oval(p, 0, y + 1, r - 0.5, r * SY, C[4], 1, keep);
        for (let i = -2;i <= 2; i++)
          p.glow(i * r * 0.45, y, 8, C[5], 0.32);
      }
    }
    return {
      update(dt) {
        t += dt;
        if (t > LIFT0 && t < LIFT1) {
          const Y = Math.round(hoopY(t));
          for (let y = lastRow;y > Y; y--) {
            const xs = rows.get(y);
            if (!xs || !R.chance(0.45))
              continue;
            ps.spawn(P.STAR, R.pick(xs) + R.range(-1, 1) * 2, y, R.range(-4, 4), -R.range(4, 12), R.range(0.3, 0.55), R.chance(0.5) ? WHITE : C[6], R.range(0.6, 1.6));
          }
          lastRow = Math.min(lastRow, Y);
        }
        if (!burst && t >= LIFT1) {
          burst = true;
          lights.add(0, TOPY, 26, C[5], 0.55, 0.3);
          lights.add(0, TOPY, 10, WHITE, 0.45, 0.08);
        }
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        const pool = smooth(0, 0.2, t) * (1 - smooth(1.3, 1.75, t));
        if (pool > 0)
          p.glow(0, -2, 30, C[4], 0.3 * pool);
        for (let k = 0;k < NP; k++)
          petal(p, k, true);
        hoop(p, true);
        ps.draw(p, "back");
        riders(p, true);
      },
      draw(p) {
        const drain = smooth(0, 0.08, t);
        if (t < LIFT1 + 0.35) {
          const Y = t < LIFT0 ? 1 : hoopY(t), done = t >= LIFT1;
          recolor(p, A, (c, x, y) => {
            const d = y - Y;
            if (!done && d < -0.5) {
              const l = luma(c) * 0.88;
              return mix(c, rgb(l * 236, l * 226, l * 222), 0.68 * drain);
            }
            if (!done && d < 1)
              return WHITE;
            if (!done && d < 2.5)
              return C[6];
            const k = done ? 0.45 * (1 - seg(t, LIFT1, LIFT1 + 0.35)) : 0.5 * Math.exp(-(d - 2.5) / 5);
            return k > 0.05 ? mix(c, C[5], k) : 0;
          });
          if (t > LIFT0 && !done)
            p.glow(0, Y, 18, C[5], 0.35);
        }
        for (let k = 0;k < NP; k++)
          petal(p, k, false);
        hoop(p, false);
        if (t >= LIFT1 && t < LIFT1 + 0.25)
          sparkle(p, 0, TOPY, 8 * (1 - (t - LIFT1) / 0.25), WHITE, C[5], 0.6);
        riders(p, false);
        ps.draw(p, "front");
        lights.draw(p);
      }
    };
    function riders(p, back) {
      for (const m of motes) {
        const a = t - m.t0;
        if (a < 0)
          continue;
        const at = (aa) => {
          const th = m.th0 + m.w * aa, r = m.r0 * (1 - 0.45 * (aa / m.life));
          return [Math.cos(th) * r, m.y0 - m.v * aa, Math.sin(th)];
        };
        if (a < m.life) {
          const [x, y, z] = at(a);
          if (z < 0 !== back)
            continue;
          for (let j = 0;j < 7; j++) {
            const aj = a - j * 0.03;
            if (aj < 0)
              break;
            const [tx, ty, tz] = at(aj);
            if (tz < 0 !== back)
              continue;
            p.dot(tx, ty, j === 0 ? WHITE : j < 3 ? C[6] : C[5], (1 - j / 7) * (back ? 0.6 : 1));
          }
          p.glow(x, y, 4, C[5], back ? 0.2 : 0.4);
          continue;
        }
        const u = (a - m.life) / 0.36;
        if (u >= 1 || back)
          continue;
        const [x, y] = at(m.life), k = 1 - smooth(0.5, 1, u);
        if (u < 0.12)
          sparkle(p, x, y, 3, WHITE, C[6], 0.5);
        else if (m.kind)
          heart(p, x, y - u * 6, C, k);
        else
          sparkle(p, x, y - u * 5, 1 + 2 * k * (0.7 + 0.3 * Math.sin(a * 30)), WHITE, C[5], 0.45 * k);
      }
    }
  }

  // ../vendor_src/pixelfx/src/fx/arcane/_lib.js
  var BAYER3 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
  var CROSS2 = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  function mote(p, x, y, vx, vy, c, size = 1, k = 1, glow = 0.4) {
    const sp = Math.hypot(vx, vy) || 1, ux = vx / sp, uy = vy / sp, len = Math.min(16, 0.5 + sp * 0.026) * size, a = k < 0.35 ? k / 0.35 : 1;
    if (len > 1.2)
      p.line(x - ux * len, y - uy * len, x - ux * len * 0.35, y - uy * len * 0.35, scale(c, 0.55), a);
    p.line(x - ux * len * 0.4, y - uy * len * 0.4, x, y, c, a);
    if (glow > 0)
      p.glow(x, y, 2.5 + size, c, glow * k);
  }
  function streak(p, x, y, vx, vy, c, a = 1, maxLen = 7, glow = 0.4) {
    const sp = Math.hypot(vx, vy) || 1, ux = vx / sp, uy = vy / sp, L = clamp(sp / 30, 1, maxLen);
    for (let d = L;d >= 0; d -= 0.5)
      p.dot(x - ux * d, y - uy * d, d < 1 ? WHITE : d < L * 0.5 ? c : scale(c, 0.6), (d < L * 0.5 ? 1 : 1.2 - d / L) * a);
    if (glow > 0)
      p.glow(x, y, 4, c, glow * a);
  }
  function arc(r, x0, y0, x1, y1, { jag = 0.3, forks = 1, forkLen = 0.5 } = {}) {
    const L = Math.hypot(x1 - x0, y1 - y0), depth = Math.max(1, Math.min(5, Math.round(Math.log2(L / 1.5)))), main = bolt(r, x0, y0, x1, y1, { jag, depth });
    const out = [{ pts: main, w: 1 }];
    for (let k = 0;k < forks && main.length > 3; k++) {
      if (r.next() > 0.7)
        continue;
      const i = 1 + Math.floor(r.next() * (main.length - 2)), [x, y] = main[i], [px, py] = main[i - 1];
      const a = Math.atan2(y - py, x - px) + (r.next() < 0.5 ? -1 : 1) * (0.4 + r.next() * 0.6), l = L * forkLen * (0.4 + 0.6 * r.next()) * (1 - i / main.length);
      if (l > 1.5)
        out.push({ pts: bolt(r, x, y, x + Math.cos(a) * l, y + Math.sin(a) * l, { jag: jag * 1.1, depth: Math.max(1, depth - 2) }), w: 0.55 });
    }
    return out;
  }
  function drawArc(p, paths, cols, k = 1, glowK = 0.5) {
    const steps = (fn) => {
      for (const path of paths)
        for (let i = 0;i < path.pts.length - 1; i++) {
          const [ax, ay] = path.pts[i], [bx, by] = path.pts[i + 1], l = Math.max(1, Math.hypot(bx - ax, by - ay));
          for (let d = 0;d <= l; d += 0.5)
            fn(ax + (bx - ax) * d / l, ay + (by - ay) * d / l, path, i, d === 0);
        }
    };
    if (k > 0.45)
      steps((x, y, path) => {
        if (path.w >= 1)
          for (const [dx, dy] of CROSS2)
            p.dot(x + dx * 1.5, y + dy * 1.5, cols.halo, (k - 0.45) * 1.6);
      });
    if (k > 0.25)
      steps((x, y, path) => {
        if (path.w > 0.4)
          p.dot(x + 1, y, cols.body), p.dot(x, y + 1, cols.body);
      });
    steps((x, y, path, i, first) => {
      p.px(x, y, path.w >= 1 && k > 0.3 ? cols.core : cols.body);
      if (first && i % 3 === 0)
        p.glow(x, y, (path.w >= 1 ? 9 : 5) * (0.5 + k * 0.5), cols.glow, glowK * k * path.w);
    });
  }

  // ../vendor_src/pixelfx/src/fx/arcane/spell-charge.js
  var D6 = 1.6;
  var HX = 15;
  var HY = -22;
  var RINGS = 4;
  var RT = 0.5;
  var meta20 = {
    name: "Spell charge",
    desc: "Energy gathers in the caster's hand: streaks and motes spiral in, rings collapse into a swelling orb that crackles with arcs, ready to fire.",
    tags: ["arcane", "charge", "spell", "orb", "cast", "magic", "loop"],
    size: [120, 86],
    origin: [44, 80],
    duration: D6,
    loop: true,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: { palette: PAL.arcane, seed: 5 }
  };
  var HOLD = { ...READY, x: -3, crouch: 4, lean: 2, fx: 18, fy: -22, bx: 11, by: -17, ffx: 10, fbx: -8 };
  var act12 = {
    poses: [
      [-0.46, { ...READY, x: -3 }],
      [-0.12, { ...HOLD, crouch: 3 }],
      [0, HOLD],
      [0.4, { ...HOLD, crouch: 5 }],
      [0.8, { ...HOLD, lean: 3 }],
      [1.2, { ...HOLD, crouch: 5 }],
      [1.6, HOLD]
    ]
  };
  var landings = Array.from({ length: RINGS }, (_, k) => k * D6 / RINGS + RT);
  var sinceLast = (t) => Math.min(...landings.map((l) => ((t - l) % D6 + D6) % D6));
  function orb(p, C, x, y, r, t, ph) {
    for (let i = 0;i < 8; i++) {
      const a = i / 8 * TAU + ph * (TAU / 8) * 3, l = (1.5 + 4.5 * Math.abs(loopNoise(ph, 3, i * 7 + 1))) * (i % 2 ? 0.7 : 1);
      const x0 = x + Math.cos(a) * (r + 1.2), y0 = y + Math.sin(a) * (r + 1.2);
      p.line(x0, y0, x0 + Math.cos(a) * l, y0 + Math.sin(a) * l, (u) => u < 0.4 ? C[6] : i % 2 ? C[4] : C[5], (u) => u < 0.6 ? 1 : 1.6 - u);
    }
    p.circle(x, y, r + 1.3, C[4]);
    p.circle(x, y, r + 0.3, C[5]);
    p.circle(x - r * 0.12, y - r * 0.12, r * 0.8, C[6]);
    p.circle(x, y, r * 0.5, WHITE);
    const R = rng(Math.floor(t * 15), 77);
    for (let i = 0;i < 3; i++) {
      const a = R.range(0, TAU), pts = arc(R, x + Math.cos(a) * r * 0.4, y + Math.sin(a) * r * 0.4, x + Math.cos(a + R.range(-0.6, 0.6)) * (r + 0.6), y + Math.sin(a + R.range(-0.6, 0.6)) * (r + 0.6), { jag: 0.45, forks: 0 })[0].pts;
      p.polyline(pts, (u) => u < 0.6 ? WHITE : C[6]);
    }
    p.px(x - r * 0.5, y - r * 0.62, WHITE);
  }
  function ringAt(p, C, x, y, rr, sy, rot, q) {
    const n = Math.ceil(rr * TAU * 1.4), c = Math.cos(rot), s = Math.sin(rot);
    const col = q > 0.85 ? WHITE : q > 0.55 ? C[6] : C[5], a = Math.min(1, q * 3);
    for (let j = 0;j < n; j++) {
      const g = j / n * TAU, lx = Math.cos(g) * rr, ly = Math.sin(g) * rr * sy, px = x + lx * c - ly * s, py = y + lx * s + ly * c;
      if (py > -0.5)
        continue;
      p.dot(px, py, col, a);
      if (j % 10 === 0)
        p.glow(px, py, 5, C[5], 0.12 * a);
    }
  }
  function draw6(p, t, o) {
    const C = fit(o.palette, 8), ph = t / D6, S = o.seed, f = Math.floor(t * 30);
    const since = sinceLast(t), swell = Math.exp(-((since / 0.07) ** 2)) + 0.5 * Math.exp(-((since / 0.18) ** 2));
    const r = 6.1 + 0.5 * Math.sin(ph * TAU * 4) + 1.4 * swell;
    const jit = swell > 0.4 ? f % 2 ? 1 : -1 : 0, x = HX + jit, y = HY;
    cycle(t, D6, 110, S * 3 + 1, (g) => g.range(0.2, 0.34), (age, life, R) => {
      const a0 = R.range(2.8, 5.75), d0 = R.range(20, 52), spin = R.range(0.6, 1.3);
      const pos = (q) => {
        const a = a0 + spin * q * q, d = d0 * (1 - q * q) + r;
        return [HX + Math.cos(a) * d, HY + Math.sin(a) * d * 0.92];
      };
      const q = age / life, [px, py] = pos(q), [qx, qy] = pos(Math.min(1, q + 0.02));
      streak(p, px, py, (qx - px) / (0.02 * life), (qy - py) / (0.02 * life), R.chance(0.55) ? C[6] : C[5], Math.min(1, q * 4) * (1 - smooth(0.9, 1, q)), 7, 0.4 * (1 - smooth(0.6, 0.9, q)));
    });
    cycle(t, D6, 56, S * 3 + 2, (g) => g.range(0.4, 0.7), (age, life, R) => {
      const a0 = R.range(2.6, 5.2), d0 = R.range(12, 32), spin = R.range(1, 2.2), size = R.range(0.6, 1);
      const pos = (q) => {
        const a = a0 + spin * q, d = d0 * (1 - ease.inQuad(q)) + r;
        return [HX + Math.cos(a) * d, HY + Math.sin(a) * d];
      };
      const q = age / life, [px, py] = pos(q), [qx, qy] = pos(Math.min(1, q + 0.02));
      mote(p, px, py, (qx - px) / (0.02 * life), (qy - py) / (0.02 * life), R.pick([C[5], C[6], C[6], WHITE]), size, Math.min(1, q * 3) * (q > 0.9 ? (1 - q) / 0.1 : 1), 0.3 * (1 - smooth(0.55, 0.85, q)));
    });
    for (let k = 0;k < RINGS; k++)
      for (const off of [-D6, 0]) {
        const q = (t - k * D6 / RINGS - off) / RT;
        if (q < 0 || q >= 1)
          continue;
        const rr = r + 1.5 + 22 * (1 - ease.inQuad(q)), shape = [[1, 0], [0.38, 0.55], [1, 0], [0.42, -0.7]][k];
        ringAt(p, C, x, y, rr, shape[0], shape[1], q);
      }
    orb(p, C, x, y, r, t, ph);
    const w = Math.floor(f / 2), Rw = rng(S, w, 3), n = (Rw.next() < 0.6 ? 1 : 0) + (swell > 0.3 ? 1 : 0), fresh = f % 2 === 0 ? 0.8 : 0.4;
    for (let i = 0;i < n; i++) {
      const a = Rw.range(0, TAU), L = Rw.range(5, 10) * (1 + swell * 0.4), a1 = a + Rw.range(-0.5, 0.5);
      const x0 = x + Math.cos(a) * (r + 0.5), y0 = y + Math.sin(a) * (r + 0.5), x1 = x0 + Math.cos(a1) * L, y1 = Math.min(-2, y0 + Math.sin(a1) * L);
      drawArc(p, arc(Rw, x0, y0, x1, y1, { jag: 0.35, forks: Rw.next() < 0.5 ? 1 : 0 }), { core: WHITE, body: C[5], halo: C[3], glow: C[5] }, fresh, 0.3);
    }
    cycle(t, D6, 7, S * 3 + 4, 0.22, (age, life, R) => {
      const a = R.range(0, TAU), d = R.range(r + 5, r + 15), k = Math.sin(age / life * Math.PI);
      sparkle(p, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.9, 1 + 2.5 * k, C[6], C[4], 0.4 * k);
    });
    if (since < 0.07)
      sparkle(p, x, y, 4 + 6 * (1 - since / 0.07), C[6], C[5], 0.5);
    const pulse = 0.85 + 0.15 * Math.sin(ph * TAU * 4) + 0.2 * swell;
    p.glow(x, y, 46, C[4], 0.26 * pulse);
    p.glowRing(x, y, r + 3, 8, C[5], 0.3 * pulse);
    p.glow(x, y, r, C[6], 0.12);
    p.glow(HX, -1, 22, C[5], 0.16 * pulse);
  }

  // ../vendor_src/pixelfx/src/fx/shadow/_lib.js
  var VOID = ["#06040b", "#150c26", "#2a1150", "#461a84", "#6f2cc0", "#9d5cec", "#cfa6ff", "#f6eaff"];
  function unlight(p, x0, y0, x1, y1, dark, keep = 0) {
    const { L, w, ox, oy } = p;
    p.each(x0, y0, x1, y1, (x, y, sx, sy) => {
      if (!dark(x, y))
        return;
      const i = (sy - oy) * w + (sx - ox), d = L[i];
      if (!d)
        return;
      if (keep <= 0)
        L[i] = 0;
      else
        L[i] = 255 << 24 | (d >>> 16 & 255) * keep << 16 | (d >>> 8 & 255) * keep << 8 | (d & 255) * keep;
    });
  }
  function annulus(x, y, r0, r1, fn) {
    const r02 = r0 > 0 ? r0 * r0 : -1, r12 = r1 * r1;
    for (let py = Math.floor(y - r1);py <= Math.ceil(y + r1); py++) {
      const cy = py + 0.5, dy = cy - y, dy2 = dy * dy;
      if (dy2 >= r12)
        continue;
      const xo = Math.sqrt(r12 - dy2), xi = dy2 < r02 ? Math.sqrt(r02 - dy2) : 0;
      for (let px = Math.floor(x - xo), x1 = Math.ceil(x + xo);px <= x1; px++) {
        const cx = px + 0.5, dx = cx - x;
        if (xi > 0 && dx > -xi && dx < xi) {
          px = Math.max(px, Math.floor(x + xi) - 1);
          continue;
        }
        const d2 = dx * dx + dy2;
        if (d2 < r12 && d2 >= r02)
          fn(cx, cy, Math.sqrt(d2));
      }
    }
  }
  function ringFast(p, x, y, r, w, c, a = 1) {
    if (r <= 0)
      return;
    const r0 = Math.max(0, r - w), fc = typeof c === "function", fa = typeof a === "function";
    annulus(x, y, r0, r, (cx, cy, d) => {
      const v = (d - r0) / (r - r0 || 1), ang = fc || fa ? Math.atan2(cy - y, cx - x) : 0;
      p.dot(cx, cy, fc ? c(v, ang) : c, fa ? a(v, ang) : a);
    });
  }
  function ringLight(p, x, y, R, w, c, k, keep = null) {
    if (w < 1 || k <= 0.004)
      return;
    const col = hex(c);
    annulus(x, y, Math.max(0, R - w), R + w, (cx, cy, d) => {
      if (keep && !keep(cx, cy))
        return;
      const f = 1 - Math.abs(d - R) / w;
      p.light(cx, cy, col, f * f * k);
    });
  }
  function halo(p, x, y, r0, r1, c, k) {
    if (r1 <= r0 || k <= 0.004)
      return;
    const col = hex(c), w = r1 - r0;
    annulus(x, y, Math.max(0, r0), r1, (cx, cy, d) => {
      const f = 1 - (d - r0) / w;
      p.light(cx, cy, col, f * f * k);
    });
  }
  function blackStar(cy, L, rot, short = 0.46, q = 0.32) {
    const R0 = Math.ceil(L) + 2, n = R0 * 2 + 1, data = new Uint8Array(n * n);
    for (let j = 0;j < n; j++)
      for (let i = 0;i < n; i++) {
        const x = i - R0 + 0.5, y = cy + j - R0 + 0.5;
        if (inStar(x, y, 0, cy, L, rot, q) || inStar(x, y, 0, cy, L * short, rot + Math.PI / 4, q))
          data[j * n + i] = 1;
      }
    for (let a = 0;a < 4; a++)
      for (let d = 0, ca = Math.cos(rot + a * Math.PI / 2), sa = Math.sin(rot + a * Math.PI / 2);d < L - 1; d += 0.5) {
        const i = Math.floor(ca * d) + R0, j = Math.floor(sa * d) + R0;
        data[j * n + i] = 1;
      }
    const at = (x, y) => {
      const i = Math.floor(x) + R0, j = Math.floor(y - cy) + R0;
      return i >= 0 && j >= 0 && i < n && j < n && data[j * n + i] === 1;
    };
    return {
      R0,
      at,
      unlight(p) {
        const { L: Lb, w, h, ox, oy } = p;
        for (let j = 0;j < n; j++)
          for (let i = 0;i < n; i++) {
            if (!data[j * n + i])
              continue;
            const x = i - R0 + 0.5, y = cy + j - R0 + 0.5, sx = p.cellX(x, y) - ox, sy = p.cellY(x, y) - oy;
            if (sx >= 0 && sy >= 0 && sx < w && sy < h)
              Lb[sy * w + sx] = 0;
          }
      },
      draw(p, c, rim, skip) {
        for (let j = 0;j < n; j++)
          for (let i = 0;i < n; i++) {
            const x = i - R0 + 0.5, y = cy + j - R0 + 0.5;
            if (data[j * n + i])
              p.px(x, y, c);
            else if (rim && !skip(x, y) && (at(x - 1, y) || at(x + 1, y) || at(x, y - 1) || at(x, y + 1)))
              p.px(x, y, rim);
          }
      }
    };
  }
  function inStar(x, y, cx, cy, L, rot, q = 0.42) {
    if (L <= 0)
      return false;
    const c = Math.cos(rot), s = Math.sin(rot), dx = x - cx, dy = y - cy;
    const u = Math.abs(dx * c + dy * s) / L, v = Math.abs(-dx * s + dy * c) / L;
    return u < 1 && v < 1 && Math.min(u, v) <= Math.pow(0.5, 1 / q) && Math.pow(u, q) + Math.pow(v, q) <= 1;
  }
  function attract(list, x, y, G, reach, swirl, r0, dt, w = () => 1, vmax = Infinity) {
    let eaten = 0;
    for (let i = list.length - 1;i >= 0; i--) {
      const q = list[i], wt = w(q);
      if (!wt || q.delay > 0)
        continue;
      const dx = x - q.x, dy = y - q.y, d2 = dx * dx + dy * dy;
      if (d2 > reach * reach)
        continue;
      const d = Math.sqrt(d2) || 1;
      if (d < r0) {
        list.splice(i, 1);
        eaten++;
        continue;
      }
      const a = G / (d2 + r0 * r0) * Math.min(1, (reach - d) / (reach * 0.25)) * wt * dt, ux = dx / d, uy = dy / d;
      q.vx += (ux - uy * swirl) * a;
      q.vy += (uy + ux * swirl) * a;
      const drag = Math.min(0.2, (1 - d / reach) * 1.6 * dt);
      q.vx -= q.vx * drag;
      q.vy -= q.vy * drag;
      const v = Math.hypot(q.vx, q.vy);
      if (v > vmax)
        q.vx *= vmax / v, q.vy *= vmax / v;
    }
    return eaten;
  }
  var PK = { FLAME: 0, SOOT: 1 };

  class Puffs {
    constructor(o) {
      this.R = o.rng;
      this.list = [];
      this.t = 0;
      this.F = ramp(o.flame);
      this.soot = ramp(o.soot);
      this.cap = hex(o.cap);
      this.rim = ramp(o.rim);
      this.floor = o.floor ?? null;
    }
    spawn(k, x, y, vx, vy, life, size, delay = 0, smokes = false) {
      this.list.push({ k, x, y, vx, vy, life, max: life, size, delay, smokes, seed: this.R.next() * 100 });
    }
    get count() {
      return this.list.length;
    }
    update(dt) {
      this.t += dt;
      const t = this.t;
      for (let i = this.list.length - 1;i >= 0; i--) {
        const q = this.list[i];
        if (q.delay > 0) {
          q.delay -= dt;
          continue;
        }
        if ((q.life -= dt) <= 0) {
          if (q.k === PK.FLAME && q.smokes)
            this.spawn(PK.SOOT, q.x, q.y - 1, q.vx * 0.5, q.vy * 0.5 - 6, this.R.range(0.9, 1.6), q.size * 1.25);
          this.list.splice(i, 1);
          continue;
        }
        if (q.k === PK.FLAME) {
          q.vy -= 95 * dt;
          q.vx += Math.sin(t * 17 + q.seed) * 30 * dt;
          q.vx -= q.vx * 5 * dt;
          q.vy -= q.vy * 3.2 * dt;
        } else {
          q.vy -= 18 * dt;
          q.vx += Math.sin(t * 1.3 + q.seed) * 8 * dt;
          q.vx -= q.vx * 1.6 * dt;
          q.vy -= q.vy * 1.3 * dt;
        }
        q.x += q.vx * dt;
        q.y += q.vy * dt;
        if (this.floor && q.k === PK.SOOT) {
          const f = this.floor(q.x) - q.size * 0.6;
          if (q.y > f)
            q.y = f, q.vy = Math.min(0, q.vy), q.vx *= 1 - 2 * dt;
        }
      }
    }
    draw(p, kind, light = null) {
      const F = this.F, n = F.length;
      for (const q of this.list) {
        if (q.delay > 0 || q.k !== kind)
          continue;
        const k = q.life / q.max, age = 1 - k, { x, y } = q;
        if (q.k === PK.FLAME) {
          const heat = Math.min(0.999, Math.pow(age, 0.62) + q.seed % 1 * 0.1), idx = Math.min(n - 2, Math.floor(heat * (n - 1)));
          const r = q.size * (0.55 + 0.45 * Math.min(1, age * 7)) * (1 - age * 0.55), c = F[idx];
          if (idx >= n - 3)
            p.disc(x, y, r, c, Math.min(1, k * 3) * 0.8);
          else {
            p.circle(x, y, r, F[Math.min(n - 1, idx + 2)]);
            p.circle(x - r * 0.16, y - r * 0.22, r * 0.78, c);
            if (r > 1.6)
              p.circle(x, y - r * 0.9, r * 0.42, c);
            if (idx <= 3 && r > 1.8)
              p.circle(x - r * 0.28, y - r * 0.34, r * 0.36, F[Math.max(0, idx - 1)]);
            if (idx < 6)
              p.glow(x, y, r * 2.4 + 2, c, 0.2 * k);
          }
          continue;
        }
        const r = q.size * (0.65 + Math.min(1, age * 2.5) * 0.45 + age * 0.45);
        const a = Math.min(1, age * 10) * Math.min(1, k * 2.2) * 0.72, body = mix(this.soot[0], this.soot[1], age);
        const edge = a * 0.5, core = 1 - (1 - a * 0.5) * (1 - a * 0.62);
        p.disc(x, y + r * 0.06, r, body, (d) => d < 0.72 ? core : edge);
        const lk = light ? light.k : 0;
        if (lk < 0.5)
          p.disc(x - r * 0.2, y - r * 0.32, r * 0.48, this.cap, a * 0.32 * (1 - age * 0.7) * (1 - lk * 2));
        if (lk <= 0.02)
          continue;
        const lx = light.x - x, ly = light.y - y, dl = Math.sqrt(lx * lx + ly * ly) || 1, ux = lx / dl, uy = ly / dl;
        const lit = Math.min(1, light.k * clamp(1.3 - dl / light.reach)) * a;
        if (lit <= 0.02)
          continue;
        const [hot, warm, dim] = this.rim;
        p.disc(x + ux * r * 0.26, y + uy * r * 0.26, r * 0.72, dim, lit * 0.55);
        p.disc(x + ux * r * 0.5, y + uy * r * 0.5, r * 0.46, warm, lit * 0.5);
        if (r > 3)
          p.disc(x + ux * r * 0.68, y + uy * r * 0.68, r * 0.24, hot, lit * 0.4);
      }
    }
  }
  function shard(p, b, C, lx, ly, lk) {
    const fa = Math.min(1, b.life / 0.4), ca = Math.cos(b.a), sa = Math.sin(b.a), L = Math.max(2, b.s), W = Math.max(2, L * 0.55);
    const side = -sa * (lx - b.x) + ca * (ly - b.y) > 0 ? 1 : -1;
    const rim = lk > 0.6 ? C[6] : lk > 0.3 ? C[5] : lk > 0.08 ? C[4] : C[3], E = L / 2 + 1.5;
    p.shade(b.x - E, b.y - E, b.x + E, b.y + E, (x, y, out) => {
      const dx = x - b.x, dy = y - b.y, u = dx * ca + dy * sa, v = (-dx * sa + dy * ca) * side;
      if (u < -L / 2 - 0.4 || u > L / 2 + 0.4)
        return;
      const half = W / 2 * (L / 2 - u) / L + 0.4;
      if (Math.abs(v) > half)
        return;
      out.a = fa;
      if (u > L / 2 - 1.3 && lk > 0.3)
        return WHITE;
      if (v > half - 1)
        return u > -L / 4 ? rim : C[Math.max(3, C.indexOf(rim) - 1)];
      return v < -half + 1 ? C[1] : C[2];
    });
    if (lk > 0.04)
      p.glow(b.x, b.y, 3 + L * 0.6, C[5], 0.2 * lk * fa);
  }

  // ../vendor_src/pixelfx/src/fx/shadow/dark-explosion.js
  var meta21 = {
    name: "Dark explosion",
    desc: "Motes swirl into a pulsing core, a black star cuts across a violet-white flash, and a black sphere burns at the rim, throws lit shards and smoke, then collapses.",
    tags: ["shadow", "explosion", "void", "dark", "magic", "impact", "one-shot"],
    size: [280, 248],
    origin: [140, 206],
    duration: 3.8,
    loop: false,
    fps: 30,
    bg: "ground",
    options: { palette: VOID, seed: 6 }
  };
  var Y = -54;
  var RS = 16;
  var REL = 0.52;
  var BURN = 1.62;
  var POP = 1.84;
  var SMOKE = hex("#5d5468");
  function sphere(p, C, r, t, heat) {
    if (r < 0.6)
      return;
    const E = r + 12 * heat + 2;
    p.shade(-E, Y - E, E, Y + E, (x, y, out) => {
      const dx = x, dy = y - Y, d = Math.sqrt(dx * dx + dy * dy);
      if (d > E)
        return;
      if (d < r - 0.5) {
        const e = r - d, ang = Math.atan2(dy, dx);
        if (e < 1.4 && Math.cos(ang - 0.8) > 0.55)
          return C[2];
        if (r > 8 && (dx + r * 0.45) ** 2 + (dy + r * 0.45) ** 2 < 1.6)
          return C[3];
        return C[0];
      }
      const e = d - (r - 0.5);
      if (e < 1) {
        out.c = Math.sin(Math.atan2(dy, dx) * 7 + t * 9) > -0.6 ? WHITE : C[7];
        out.k = 0.4;
        return;
      }
      const ang = Math.atan2(dy + e * 0.6, dx), top = Math.max(0, -Math.sin(ang));
      const a1 = ang - t * 0.9, a2 = ang + t * 1.7;
      const i1 = Math.round(a1 * 9 / TAU), i2 = Math.round(a2 * 15 / TAU);
      const T1 = Math.pow(0.5 + 0.5 * Math.cos(a1 * 9), 3) * (0.55 + 0.45 * noise(t * 7 + i1 * 3.7, 1));
      const T2 = Math.pow(0.5 + 0.5 * Math.cos(a2 * 15), 4) * (0.5 + 0.5 * noise(t * 11 + i2 * 5.1, 2));
      const h = heat * (0.3 + 0.95 * top) * (1.5 + 12 * Math.max(0, T1) + 6 * Math.max(0, T2));
      if (e > h + 1)
        return;
      const u = (e - 1) / h;
      out.c = u < 0.18 ? WHITE : u < 0.4 ? C[7] : u < 0.62 ? C[6] : u < 0.84 ? C[5] : C[4];
      out.a = u < 0.8 ? 1 : (1 - u) * 5;
      if (u < 0.6 && (Math.floor(x) + Math.floor(y) & 1) === 0)
        out.k = 0.25 * (1 - u);
    });
  }
  function create15(o) {
    const C = fit(o.palette, 8), R = new Rng(o.seed), floor = () => 0;
    const ps = new Particles({ rng: R, ground: floor, sparks: [WHITE, C[7], C[6], C[5]] });
    const embers = new Particles({ rng: R, ground: floor, sparks: [C[7], C[6], C[5], C[4]] });
    const puffs = new Puffs({
      rng: R,
      flame: [WHITE, C[7], C[6], C[5], C[5], C[4], C[4], C[3], C[2]],
      soot: [mix(mix(C[3], C[1], 0.3), SMOKE, 0.45), mix(C[1], SMOKE, 0.3)],
      cap: mix(mix(C[4], C[2], 0.5), SMOKE, 0.4),
      rim: [C[6], C[5], C[4]],
      floor
    });
    const bits = new Bits({ ground: floor }), lights = [], rings = [];
    let t = 0, released = false, collapsing = false, popped = false, acc = 0, dustAcc = 0, flick = 1;
    const coreR = (tt) => tt < REL - 0.07 ? 1.5 + 5 * ease.inQuad(tt / REL) : 1;
    const sphereR = (tt) => {
      if (tt < REL)
        return 0;
      if (tt < BURN)
        return RS * ease.outBack(clamp((tt - REL) / 0.14), 2.4) * (1 + 0.06 * smooth(REL + 0.3, BURN, tt) + 0.02 * Math.sin(tt * 11));
      if (tt < POP)
        return RS * 1.08 * (1 - ease.inQuad((tt - BURN) / (POP - BURN)));
      return 0;
    };
    const starL = (tt) => tt < REL || tt > REL + 0.26 ? 0 : 60 * (1 - ease.inQuad(clamp((tt - REL - 0.05) / 0.21)));
    const starRot = (tt) => 0.32 + (tt - REL) * 2.2;
    const burning = (tt) => tt < REL ? clamp(tt / REL) * 0.7 : tt < BURN ? 1 : tt < POP ? 1.2 : Math.max(0, 1 - (tt - POP) / 0.35);
    const light = (x, y, r, c, k, life) => lights.push({ x, y, r, c, k, life, max: life });
    const rim = (a, r) => [Math.cos(a) * r, Y + Math.sin(a) * r];
    function release() {
      light(0, Y, 100, C[4], 1.25, 0.85);
      light(0, Y, 86, mix(C[6], WHITE, 0.5), 1.3, 0.22);
      rings.push({ r0: RS, r1: 104, life: 0.46, max: 0.46, th: 3.6, hot: true, delay: 0 });
      rings.push({ r0: RS * 0.8, r1: 62, life: 0.3, max: 0.3, th: 1.6, hot: true, delay: 0.02 });
      rings.push({ r0: RS, r1: 124, life: 0.62, max: 0.62, th: 1.2, hot: false, delay: 0.07 });
      for (let i = 0;i < 34; i++) {
        const big = i < 20, a = R.range(0, TAU), [x, y] = rim(a, RS * 0.7), sp = big ? R.range(80, 170) : R.range(130, 220);
        bits.add({ kind: B.SHARD, x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - R.range(40, 110), g: 0.75, drag: big ? 1.3 : 1.7, bounce: 0.35, life: R.range(1.6, 2.6), a: R.range(0, TAU), va: R.range(-16, 16), s: big ? R.range(6, 11) : R.range(3, 4.5) });
      }
      for (let i = 0;i < 84; i++) {
        const a = R.range(0, TAU), [x, y] = rim(a, RS * 0.8), sp = R.range(120, 235);
        ps.spawn(P.SPARK, x, y, Math.cos(a) * sp, Math.sin(a) * sp - 50, R.range(0.2, 0.7));
      }
      for (let i = 0;i < 28; i++) {
        const a = R.range(0, TAU), [x, y] = rim(a, RS * 0.9), sp = R.range(30, 130);
        embers.spawn(P.EMBER, x, y, Math.cos(a) * sp, Math.sin(a) * sp - 40, R.range(1.3, 2.5));
      }
      for (let i = 0;i < 24; i++) {
        const a = R.range(0, TAU), [x, y] = rim(a, RS * 0.9), sp = R.range(15, 70);
        puffs.spawn(PK.SOOT, x, y, Math.cos(a) * sp, Math.sin(a) * sp * 0.8 - 14, R.range(2, 2.8), R.range(7, 12), R.range(0.02, 0.3));
      }
      for (let i = 0;i < 12; i++) {
        const s = i % 2 ? 1 : -1;
        puffs.spawn(PK.SOOT, s * R.range(10, 40), -R.range(2, 5), s * R.range(50, 120), -R.range(0, 10), R.range(1.6, 2.4), R.range(5, 9), R.range(0.08, 0.2));
      }
      for (let i = 0;i < 10; i++) {
        const a = -Math.PI / 2 + R.range(-1.6, 1.6), [x, y] = rim(a, RS), sp = R.range(30, 80);
        puffs.spawn(PK.FLAME, x, y, Math.cos(a) * sp, Math.sin(a) * sp - 30, R.range(0.3, 0.6), R.range(2, 3.6), 0, R.chance(0.5));
      }
      ps.list.length = 0;
      puffs.list = puffs.list.filter((q) => q.delay > 0);
    }
    function pop() {
      light(0, Y, 56, WHITE, 0.9, 0.18);
      light(0, Y, 120, C[5], 0.8, 0.5);
      rings.push({ r0: 2, r1: 40, life: 0.28, max: 0.28, th: 2, hot: true, delay: 0 });
      for (let i = 0;i < 26; i++) {
        const a = R.range(0, TAU), sp = R.range(120, 250);
        ps.spawn(P.SPARK, 0, Y, Math.cos(a) * sp, Math.sin(a) * sp - 40, R.range(0.2, 0.6));
      }
      for (let i = 0;i < 14; i++) {
        const a = R.range(0, TAU), sp = R.range(20, 90);
        embers.spawn(P.EMBER, 0, Y, Math.cos(a) * sp, Math.sin(a) * sp - 30, R.range(0.9, 1.6));
      }
      for (let i = 0;i < 10; i++) {
        const a = R.range(0, TAU), sp = R.range(20, 70);
        puffs.spawn(PK.SOOT, Math.cos(a) * 3, Y + Math.sin(a) * 3, Math.cos(a) * sp, Math.sin(a) * sp - 15, R.range(1.1, 1.7), R.range(3, 6), R.range(0, 0.08));
      }
      for (const q of [...embers.list, ...puffs.list]) {
        const dx = q.x, dy = q.y - Y, d = Math.hypot(dx, dy) || 1, f = 90 * Math.max(0, 1 - d / 70);
        q.vx += dx / d * f;
        q.vy += dy / d * f - f * 0.3;
      }
      for (let i = 0;i < 12; i++)
        puffs.spawn(PK.SOOT, R.range(-6, 6), Y + R.range(-4, 6), R.range(-10, 10), -R.range(20, 55), R.range(1.3, 1.8), R.range(7, 12), R.range(0.02, 0.2));
    }
    return {
      update(dt) {
        t += dt;
        flick = 0.88 + 0.12 * Math.sin(t * 37) * Math.sin(t * 23);
        if (t < REL - 0.06) {
          const k = t / REL;
          for (acc += dt * (90 + 150 * k);acc > 1; acc--) {
            const a = R.range(0, TAU), D = R.range(36, 84), x = Math.cos(a) * D, y = Math.min(-3, Y + Math.sin(a) * D), vt = R.range(50, 110), vi = R.range(10, 40);
            ps.spawn(P.MOTE, x, y, -Math.sin(a) * vt - Math.cos(a) * vi, Math.cos(a) * vt - Math.sin(a) * vi, 0.9, R.pick([WHITE, C[6], C[6], C[5]]), R.range(0.7, 1.2));
          }
          if (R.chance(0.75)) {
            const a = R.range(0, TAU), D = R.range(28, 70), T = R.range(0.18, 0.28), v = D * 3 / (Math.exp(3 * T) - 1);
            ps.spawn(P.STREAK, Math.cos(a) * D, Y + Math.sin(a) * D, -Math.cos(a) * v, -Math.sin(a) * v, T, R.chance(0.5) ? C[7] : C[6]);
          }
          if (t < REL - 0.2 && R.chance(0.16)) {
            const a = R.range(0, TAU), D = R.range(34, 60);
            puffs.spawn(PK.SOOT, Math.cos(a) * D, Y + Math.sin(a) * D, -Math.sin(a) * 40, Math.cos(a) * 40, R.range(0.6, 0.9), R.range(3, 6));
          }
          attract(ps.list, 0, Y, 2200000 * (0.3 + k), 110, 0.55, 2.5, dt, (q) => q.k === P.MOTE ? 1 : 0, 420);
          attract(puffs.list, 0, Y, 1200000 * (0.3 + k), 90, 0.7, 4, dt, () => 1, 160);
        }
        if (t >= REL && !released) {
          released = true;
          release();
        }
        if (released && t < BURN) {
          const sr = sphereR(t);
          for (acc += dt * 34;acc > 1; acc--) {
            const a = -Math.PI / 2 + R.gauss() * 1.1, [x, y] = rim(a, sr + 1), sp = R.range(10, 35);
            puffs.spawn(PK.FLAME, x, y, Math.cos(a) * sp, Math.sin(a) * sp - R.range(10, 30), R.range(0.25, 0.45), R.range(1.2, 2.2), 0, R.chance(0.2));
          }
          if (R.chance(dt * 10)) {
            const a = -Math.PI / 2 + R.range(-1.4, 1.4), [x, y] = rim(a, sr * 0.9);
            puffs.spawn(PK.SOOT, x, y, Math.cos(a) * 20, -R.range(15, 35), R.range(1.2, 1.7), R.range(5, 9));
          }
          if (R.chance(dt * 8)) {
            const a = R.range(0, TAU), [x, y] = rim(a, sr), sp = R.range(110, 200);
            ps.spawn(P.SPARK, x, y, Math.cos(a) * sp, Math.sin(a) * sp - 40, R.range(0.2, 0.5));
          }
          if (R.chance(dt * 7)) {
            const a = -Math.PI / 2 + R.range(-1.2, 1.2), [x, y] = rim(a, sr);
            embers.spawn(P.EMBER, x, y, Math.cos(a) * 30, -R.range(20, 50), R.range(0.9, 1.6));
          }
        }
        if (t >= BURN && !collapsing) {
          collapsing = true;
          for (let i = 0;i < 14; i++) {
            const a = R.range(0, TAU), D = R.range(26, 48), T = R.range(0.14, 0.2), v = D * 3 / (Math.exp(3 * T) - 1);
            ps.spawn(P.STREAK, Math.cos(a) * D, Y + Math.sin(a) * D, -Math.cos(a) * v, -Math.sin(a) * v, T, R.chance(0.5) ? WHITE : C[6]);
          }
        }
        if (collapsing && !popped) {
          attract(puffs.list, 0, Y, 1400000, 64, 0.6, 3, dt, (q) => q.k === PK.FLAME ? 1 : 0.35, 200);
        }
        if (t >= POP && !popped) {
          popped = true;
          pop();
        }
        for (const r of rings) {
          if (r.delay > 0 || !r.hot || r.th < 3)
            continue;
          const rr = r.r0 + (r.r1 - r.r0) * (1 - Math.pow(r.life / r.max, 3)), rf = rr > -Y ? Math.sqrt(rr * rr - Y * Y) : 0;
          if (rf > 0)
            for (dustAcc += dt * 60;dustAcc > 1; dustAcc--) {
              const s = R.sign();
              ps.spawn(P.DUST, s * rf + R.range(-2, 2), -R.range(1, 3), s * R.range(20, 50), -R.range(4, 14), R.range(0.4, 0.8), mix(C[2], C[3], R.next()), R.range(1.5, 3));
            }
        }
        for (const a of [lights, rings])
          for (let i = a.length - 1;i >= 0; i--) {
            const q = a[i];
            if (q.delay > 0)
              q.delay -= dt;
            else if ((q.life -= dt) <= 0)
              a.splice(i, 1);
          }
        bits.update(dt);
        for (const b of bits.list) {
          if (b.rest && !b.flat) {
            b.flat = true;
            b.a = Math.round(b.a / Math.PI) * Math.PI + R.range(-0.2, 0.2);
            b.y = -1;
          }
          if (b.life < 0.45 && !b.wisp) {
            b.wisp = true;
            puffs.spawn(PK.SOOT, b.x, b.y - 1, R.range(-4, 4), -R.range(8, 16), R.range(0.6, 0.9), R.range(1.4, 2.4));
          }
        }
        puffs.update(dt);
        ps.update(dt);
        embers.update(dt);
      },
      drawBack(p) {
        const k = burning(t);
        for (const r of rings)
          floorRing(p, C, r, true);
        puffs.draw(p, PK.SOOT, { x: 0, y: Y, k: k * flick, reach: 84 });
        ps.draw(p, "back");
        if (k > 0)
          p.glow(0, -3, 74, C[4], 0.24 * Math.min(1, k) * flick);
      },
      draw(p) {
        const sr = sphereR(t), k = burning(t), L = starL(t);
        for (const r of rings)
          floorRing(p, C, r, false);
        let cr = 0;
        if (t < REL) {
          const q = t / REL, ring = 3 + 74 * (1 - ease.inQuad(q));
          const beat = 1 + 0.3 * Math.exp(-((t - REL * 0.5) ** 2) / 0.0015) + 0.4 * Math.exp(-((t - REL * 0.8) ** 2) / 0.0015);
          cr = coreR(t) * beat;
          ringFast(p, 0, Y, ring, 1, q > 0.7 ? C[6] : C[5], 0.2 + 0.7 * q);
          if (t > REL - 0.07)
            p.circle(0, Y, 1.6, WHITE);
          else
            sphere(p, C, cr, t, 0.3 + 0.3 * q);
          halo(p, 0, Y, cr, cr + 14 + 30 * q, C[5], (0.45 + 0.7 * q) * beat);
          p.glow(0, Y, 60 + 30 * q, C[4], 0.12 + 0.3 * q);
        }
        const fu = (t - REL) / 0.12;
        if (fu >= 0 && fu < 1) {
          const r = 36 * (1 - 0.3 * fu);
          p.circle(0, Y, r + 1.5, C[5], 1.2 - fu);
          p.circle(0, Y, r, fu < 0.35 ? WHITE : C[6], 1.1 - fu);
          if (fu < 0.6)
            p.circle(0, Y, r * 0.62, WHITE);
        }
        for (const r of rings) {
          if (r.delay > 0)
            continue;
          const q = r.life / r.max, rr = r.r0 + (r.r1 - r.r0) * (1 - q * q * q), th = Math.max(1, r.th * q + 0.4);
          ringFast(p, 0, Y, rr, th, (v) => r.hot ? v > 0.6 ? WHITE : v > 0.3 ? C[6] : C[5] : v > 0.5 ? C[5] : C[4], (v, g) => Y + Math.sin(g) * rr > 0.5 ? 0 : Math.min(1, q * 1.6));
          if (r.hot)
            ringLight(p, 0, Y, rr, 4, C[5], 0.4 * q, (x, y) => y < 0.5);
        }
        sphere(p, C, sr, t, t < BURN ? 1 : 1 + 0.5 * clamp((t - BURN) / (POP - BURN)));
        const star = L > 0 ? blackStar(Y, L, starRot(t), 0.5, 0.4) : null;
        if (star) {
          const age = t - REL, fr = age < 0.12 ? 36 * (1 - 0.3 * (age / 0.12)) + 1.5 : 0, cut = Math.max(fr, sr);
          star.draw(p, C[0], age < 0.1 ? C[5] : C[4], (x, y) => x * x + (y - Y) ** 2 < cut * cut);
        }
        puffs.draw(p, PK.FLAME);
        for (const b of bits.list)
          shard(p, b, C, 0, Y, Math.min(1, k) * 0.9);
        ps.draw(p, "front");
        embers.draw(p, "front");
        const pu = (t - POP) / 0.2;
        if (pu >= 0 && pu < 1)
          sparkle(p, 0, Y, 12 * (1 - pu), C[6], C[5], 0.7 * (1 - pu));
        for (const l of lights) {
          const q = l.life / l.max;
          p.glow(l.x, l.y, l.r * (0.55 + 0.45 * q), l.c, l.k * q * q);
        }
        if (sr > 1) {
          halo(p, 0, Y, sr - 0.5, sr + 16, C[6], 0.5 * flick * Math.min(1, k));
          p.glow(0, Y, sr + 54, C[4], 0.5 * flick * Math.min(1, k));
        }
        const B0 = Math.max(sr, cr) + 1;
        if (B0 > 2)
          unlight(p, -B0, Y - B0, B0, Y + B0, (x, y) => x * x + (y - Y) ** 2 < (Math.max(sr, cr) - 0.5) ** 2);
        if (star)
          star.unlight(p);
      }
    };
  }
  function floorRing(p, C, r, back) {
    if (r.delay > 0 || !r.hot || r.th < 3)
      return;
    const q = r.life / r.max, rr = r.r0 + (r.r1 - r.r0) * (1 - q * q * q);
    if (rr <= -Y)
      return;
    const rf = Math.sqrt(rr * rr - Y * Y);
    band(p, 0, 0.5, rf, 0.16, Math.max(1, 3 * q), Math.min(1, q * 1.5), [C[3], C[4], C[5], C[6]], (g) => Math.sin(g) < 0 === back);
    if (!back)
      for (const s of [-1, 1])
        p.glow(s * rf, -2, 16, C[5], 0.4 * q);
  }

  // ../vendor_src/pixelfx/src/fx/ice/frost-nova.js
  var meta22 = {
    name: "Frost nova",
    desc: "Frost spirals into a spinning snowflake, then a wave blooms three rings of ice crystals round the caster; snow drifts, frost creeps, and the ice melts back into the floor.",
    tags: ["ice", "nova", "aoe", "frost", "magic", "one-shot"],
    size: [288, 192],
    origin: [144, 150],
    duration: 3.4,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: { palette: ["#151a3d", "#212f6b", "#2c58aa", "#3a8bd8", "#62c8f4", "#a6ecff", "#dcfbff", "#ffffff"], reach: 104, seed: 4 }
  };
  var HIGH2 = { turn: 1.15, crouch: 0, fx: -7, fy: -44, bx: 8, by: -44, ffx: -5, fbx: 6 };
  var SLAM2 = { turn: 1.15, crouch: 8, lean: 3, fx: -9, fy: -8, bx: 11, by: -8, ffx: -8, fbx: 9 };
  var EASE = { turn: 1, crouch: 2, fx: -8, fy: -17, bx: 9, by: -17, ffx: -4, fbx: 5 };
  var act13 = {
    target: { x: 76 },
    poses: [
      [-0.34, READY],
      [-0.04, { ...HIGH2, crouch: 2, fy: -36, by: -36 }],
      [0.36, HIGH2],
      [0.42, SLAM2, "snap"],
      [0.9, { ...SLAM2, crouch: 7 }],
      [1.9, { ...SLAM2, crouch: 6 }],
      [2.6, EASE],
      [3.4, READY]
    ],
    hits: [
      { t: 0.42, stop: 0.1, shake: 0.26, amp: 2, target: false },
      { t: 0.66, push: 0.9, straw: 6, y: -10, skin: "ice", shiver: 1.7 },
      { t: 2.9, push: 0.2, straw: 0, flash: 0, skin: null }
    ],
    dust: [{ t: 0.42, x: 10, n: 5, dir: 1, c: "#d8f2ff" }, { t: 0.42, x: -10, n: 5, dir: -1, c: "#d8f2ff" }]
  };
  var CHARGE = 0.42;
  var SPREAD = 0.62;
  var HOLD2 = 1.95;
  var MELT = 0.7;
  var CORE_Y = -24;
  var RINGS2 = [
    { q: [0.15, 0.24], h: [24, 32], w: [10, 13], n: 2, kids: 2 },
    { q: [0.36, 0.52], h: [13, 19], w: [7, 9], n: 3, kids: 1 },
    { q: [0.62, 0.9], h: [5, 10], w: [4, 6], n: 4, kids: 0 }
  ];
  function frost2(p, C, x0, x1, reach, a, edge) {
    for (let x = Math.floor(x0);x <= Math.ceil(x1); x++) {
      const d = Math.abs(x + 0.5), q = d / reach, k = clamp((a * 1.15 - q) / 0.15);
      if (k <= 0)
        continue;
      const h = rand(x, 17), fresh = edge > 0 && d > edge - 3, tuft = h < 0.45 ? Math.round((1 + rand(x, 5) * 3) * (1 - q * 0.6)) : 0, D = (4 + rand(x, 11) * 4) * (1 - q * 0.5);
      p.dot(x, 0, fresh || h < 0.25 ? WHITE : C[6], k);
      for (let j = 1;j <= tuft; j++)
        p.dot(x, -j, j === tuft ? WHITE : C[5], k);
      if (tuft > 1 && rand(x, 9) < 0.5)
        p.dot(x + (rand(x, 3) < 0.5 ? -1 : 1), -tuft + 1, C[6], k);
      for (let j = 1;j <= D; j++) {
        const v = j / D;
        p.dot(x, j, rand(x * 31 + j, 7) < 0.06 ? WHITE : v < 0.25 ? C[6] : v < 0.55 ? C[5] : C[4], k * (1.1 - v) * (fresh ? 1.3 : 1));
      }
    }
  }
  function snowflake(p, C, x, y, L, spin, k) {
    if (L < 0.8)
      return;
    for (let i = 0;i < 6; i++) {
      const a = spin + i * TAU / 6, ca = Math.cos(a), sa = Math.sin(a);
      for (let d = 0;d <= L; d += 0.5)
        p.dot(x + ca * d, y + sa * d, d < L * 0.4 ? WHITE : C[6], k + 0.2);
      if (L > 3)
        for (const s of [-1, 1]) {
          const bx = x + ca * L * 0.6, by = y + sa * L * 0.6, ba = a + s * 0.9;
          for (let d = 0;d <= L * 0.35; d += 0.5)
            p.dot(bx + Math.cos(ba) * d, by + Math.sin(ba) * d, C[5], k);
        }
    }
    p.px(x, y, WHITE);
    p.glow(x, y, 10 + L * 3, C[5], 0.35 + 0.5 * k);
  }
  function create16(o) {
    const C = fit(o.palette, 8), DIM = [C[0], C[0], C[1], C[2], C[3], C[4], C[5], C[6]], REACH = o.reach;
    const R = new Rng(o.seed), floor = () => 0;
    const ps = new Particles({ rng: R, ground: floor, sparks: [C[7], C[6], C[5], C[4]], haze: C[5] });
    const bits = new Bits({ ground: floor }), lights = new Lights;
    const front = (t) => t < CHARGE ? 0 : REACH * (1 - Math.pow(1 - clamp((t - CHARGE) / SPREAD), 3));
    const reachedAt = (d) => CHARGE + SPREAD * (1 - Math.cbrt(1 - Math.min(1, d / REACH)));
    const sites = [];
    for (const side of [-1, 1])
      RINGS2.forEach((ring, ri) => {
        for (let i = 0;i < ring.n; i++) {
          const q = ring.q[0] + (ring.q[1] - ring.q[0]) * (i + R.range(0.2, 0.8)) / ring.n, h = R.range(...ring.h), w = R.range(...ring.w);
          const parts = [{ dx: 0, h, w, lean: side * h * R.range(0.1, 0.28) }];
          for (let k = 0;k < ring.kids; k++) {
            const s = k % 2 ? -side : side, kh = h * R.range(0.4, 0.62);
            parts.unshift({ dx: s * R.range(0.3, 0.5) * w, h: kh, w: w * 0.62, lean: s * kh * R.range(0.35, 0.6) });
          }
          sites.push({ x: side * q * REACH, d: q * REACH, h, back: (i + ri + (side > 0 ? 1 : 0)) % 2 === 1, t0: reachedAt(q * REACH) + R.range(0, 0.03), up: false, parts, phase: R.next() });
        }
      });
    let t = 0, released = false;
    const sink = (tt) => smooth(HOLD2, HOLD2 + MELT, tt);
    const drawCrystals = (p, back) => {
      const m = sink(t);
      for (const s of sites) {
        if (!s.up || s.back !== back || m >= 1)
          continue;
        const g = ease.outBack(clamp((t - s.t0) / 0.1), 2.6), white = t < s.t0 + 0.03, sw = ((t - s.t0) * 0.7 + s.phase * 3) % 1.6 / 0.5;
        for (const q of s.parts)
          crystal(p, s.x + q.dx, back ? -1 : 0, q.h * g * (1 - m), q.w * (1 - m * 0.3), q.lean * g * (1 - m), back ? DIM : C, { white, glint: sw <= 1 ? sw : -1 });
      }
    };
    const ring = (p, back) => {
      if (t < CHARGE)
        return;
      const u = clamp((t - CHARGE) / (SPREAD + 0.15));
      if (u >= 1)
        return;
      band(p, 0, 0, front(t) + 2, 0.16, Math.max(2, 10 * Math.pow(1 - u, 0.7)), u < 0.75 ? 1 : (1 - u) / 0.25, C, (g) => Math.sin(g) < 0 === back, t - CHARGE < 0.1);
      if (!back)
        for (const s of [-1, 1])
          p.glow(s * (front(t) + 2), -2, 22, C[5], 0.55 * (1 - u));
    };
    return {
      update(dt) {
        t += dt;
        if (t < CHARGE - 0.06) {
          if (R.chance(0.9)) {
            const a = R.range(0, TAU), D = R.range(26, 58), T = R.range(0.2, 0.3), v = D * 3 / (Math.exp(3 * T) - 1);
            const x = Math.cos(a) * D, y = Math.min(CORE_Y + Math.sin(a) * D * 0.8, -2), l = Math.hypot(x, y - CORE_Y) || 1;
            ps.spawn(P.STREAK, x, y, -x / l * v, (CORE_Y - y) / l * v, T, R.chance(0.5) ? C[6] : C[5]);
          }
          if (R.chance(0.14)) {
            const s = R.sign();
            ps.spawn(P.VAPOUR, s * R.range(28, 60), -R.range(0, 2), -s * R.range(35, 70), -R.range(0, 3), R.range(0.35, 0.5), C[6], R.range(2, 3));
          }
        }
        if (t >= CHARGE && !released) {
          released = true;
          lights.add(0, CORE_Y, 84, C[4], 0.8, 0.55);
          lights.add(0, CORE_Y, 45, WHITE, 0.7, 0.12);
          for (let i = 0;i < 22; i++) {
            const a = R.range(-Math.PI, 0.25), sp = R.range(110, 280);
            bits.add({ kind: B.SHARD, x: R.range(-3, 3), y: CORE_Y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 0.7, drag: 0.6, bounce: 0.3, life: R.range(0.9, 1.5), a: R.range(0, TAU), va: R.range(-20, 20), s: R.range(1.5, 3.5), c: R.pick([C[7], C[6], C[5]]) });
          }
          for (let i = 0;i < 14; i++) {
            const a = R.range(-Math.PI, 0), sp = R.range(40, 160);
            ps.spawn(P.FLAKE, 0, CORE_Y, Math.cos(a) * sp, Math.sin(a) * sp, R.range(1.2, 1.8), R.chance(0.6) ? WHITE : C[6], R.range(0.5, 1.6));
          }
        }
        const fr = front(t);
        if (t > CHARGE && t < CHARGE + SPREAD)
          for (const s of [-1, 1]) {
            ps.spawn(P.VAPOUR, s * fr + R.range(-2, 2), -R.range(0, 5), s * R.range(15, 75), -R.range(2, 15), R.range(0.6, 1), R.chance(0.7) ? C[6] : C[5], R.range(3, 5.5) * (1 - 0.4 * (fr / REACH)));
            if (R.chance(0.45))
              ps.spawn(P.FLAKE, s * fr, -2, s * R.range(10, 45), -R.range(30, 85), R.range(1.1, 1.9), R.chance(0.5) ? WHITE : C[6], R.range(0.5, 1.2));
          }
        for (const s of sites) {
          if (!s.up && t >= s.t0) {
            s.up = true;
            for (let i = 0;i < 2 + Math.round(s.h / 8); i++) {
              const a = -Math.PI / 2 + R.range(-1.3, 1.3), sp = R.range(60, 200) * (0.5 + s.h / 40);
              bits.add({ kind: B.SHARD, x: s.x + R.range(-3, 3), y: 0, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 0.8, drag: 0.6, bounce: 0.3, life: R.range(0.9, 1.6), a: R.range(0, TAU), va: R.range(-18, 18), s: R.range(1.5, 3), c: R.pick([C[7], C[6], C[5]]) });
            }
            ps.spawn(P.VAPOUR, s.x, -1, R.range(-30, 30), -R.range(2, 8), R.range(0.5, 0.9), C[6], R.range(2.5, 4));
            if (s.h > 10)
              ps.spawn(P.STAR, s.x + R.range(-3, 3), -R.range(4, s.h * 0.8), 0, -3, R.range(0.3, 0.6), C[6], R.range(1, 2.4));
          }
        }
        if (t > CHARGE + 0.2 && t < HOLD2 + 0.2) {
          if (R.chance(0.5)) {
            const s = R.pick(sites);
            if (s.up)
              ps.spawn(P.STAR, s.x + R.range(-3, 3), -R.range(2, s.h * 0.9), 0, -3, R.range(0.3, 0.6), R.chance(0.6) ? C[6] : WHITE, R.range(0.6, 2.2));
          }
          if (t < HOLD2 - 0.3 && R.chance(0.16))
            ps.spawn(P.FLAKE, R.range(-1, 1) * fr, -R.range(40, 90), R.range(-5, 5), R.range(3, 10), R.range(1.1, 1.5), R.chance(0.5) ? WHITE : C[6], R.range(0.5, 1.4));
        }
        if (t > HOLD2 && t < HOLD2 + MELT) {
          if (R.chance(0.5)) {
            const s = R.pick(sites);
            bits.add({ kind: B.DRIP, x: s.x + R.range(-3, 3), y: -R.range(3, s.h * 0.6 * (1 - sink(t))), vy: 10, g: 0.6, life: 1, c: C[5] });
          }
          if (R.chance(0.25))
            ps.spawn(P.VAPOUR, R.range(-1, 1) * REACH * 0.8, -R.range(0, 3), R.range(-10, 10), -R.range(6, 16), R.range(0.6, 1), C[5], R.range(3, 5));
        }
        ps.update(dt);
        bits.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        const out = 1 - smooth(HOLD2 + 0.2, HOLD2 + MELT + 0.6, t), fr = front(t);
        if (out > 0 && t > CHARGE)
          frost2(p, C, -Math.max(12, fr + 1), Math.max(12, fr + 1), REACH, out, fr);
        ring(p, true);
        drawCrystals(p, true);
        ps.draw(p, "back");
      },
      draw(p) {
        ring(p, false);
        drawCrystals(p, false);
        if (t < CHARGE) {
          const k = t / CHARGE, beat = 1 + 0.25 * Math.exp(-((t - CHARGE * 0.55) ** 2) / 0.002) + 0.3 * Math.exp(-((t - CHARGE * 0.85) ** 2) / 0.002);
          snowflake(p, C, 0, CORE_Y, (2 + 5.5 * k * k) * beat, t * 4, k);
        } else if (t < CHARGE + 0.22) {
          const a = (t - CHARGE) / 0.22;
          flare(p, 0, CORE_Y, 36 * Math.pow(1 - a, 1.5), 1 - a, C);
          p.glow(0, CORE_Y, 46, WHITE, 0.6 * (1 - a));
        }
        if (t > CHARGE) {
          const k = (1 - smooth(HOLD2, HOLD2 + MELT + 0.3, t)) * (0.85 + 0.15 * Math.sin(t * 2.4)), fr = front(t);
          for (let i = -3;i <= 3; i++)
            p.glow(i / 3.5 * fr, -4, 26, C[4], 0.16 * k);
        }
        bits.draw(p);
        ps.draw(p, "front");
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/nature/_lib.js
  var MASK = new Uint8Array(64 * 64);
  var FACE = new Int8Array(64 * 64);
  var ROWS = 400;
  var RL = new Float32Array(ROWS);
  var RR = new Float32Array(ROWS);
  var RU = new Float32Array(ROWS);
  class Drops {
    constructor(ground = () => 0) {
      this.list = [];
      this.ground = ground;
    }
    add(x, y, vx, vy, s = 1, delay = 0) {
      this.list.push({ x, y, vx, vy, s, delay });
    }
    update(dt, onLand) {
      for (let i = this.list.length - 1;i >= 0; i--) {
        const d = this.list[i];
        if (d.delay > 0) {
          d.delay -= dt;
          continue;
        }
        const drag = 0.6 / d.s, py = d.y;
        d.vy += GRAVITY * dt;
        d.vx -= d.vx * drag * dt;
        d.vy -= d.vy * drag * 0.5 * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        const g = this.ground(d.x);
        if (d.vy > 0 && py <= g && d.y >= g) {
          onLand?.(d, g);
          this.list.splice(i, 1);
        }
      }
    }
    draw(p, C) {
      const n = C.length;
      for (const d of this.list) {
        if (d.delay > 0)
          continue;
        const sp = Math.hypot(d.vx, d.vy) || 1, ux = d.vx / sp, uy = d.vy / sp, len = Math.min(5, 0.5 + sp * 0.012);
        p.line(d.x - ux * len, d.y - uy * len, d.x - ux, d.y - uy, C[n - 4]);
        p.px(d.x, d.y, C[n - 1]);
        if (d.s > 1)
          p.px(d.x - ux, d.y - uy, C[n - 2]), p.px(d.x + 1, d.y, C[n - 3]);
        p.glow(d.x, d.y, 3 + d.s * 1.5, C[n - 2], 0.3);
      }
    }
  }

  // ../vendor_src/pixelfx/src/fx/nature/acid-splash.js
  var meta23 = {
    name: "Acid splash",
    desc: "A gob of acid bursts into a crown and spatters; it eats a glowing, smoking pit into the floor and boils down into it, spitting bright beads, pale steam curling off.",
    tags: ["nature", "acid", "poison", "splash", "liquid", "ground", "one-shot"],
    size: [184, 116],
    origin: [92, 100],
    duration: 2.8,
    loop: false,
    fps: 30,
    bg: "ground",
    options: { palette: ["#0e140a", "#1c3010", "#2c5214", "#457e18", "#6aae1c", "#a0dc2a", "#dcff6a", "#f8ffd0"], seed: 6 }
  };
  var HIT2 = 0.3;
  var Y0 = -62;
  var V0 = 60;
  var SPREAD2 = 0.4;
  var DRY = 0.7;
  var GONE3 = 2.2;
  var W = 30;
  var PIT = 5;
  function wisp(p, q, t, col) {
    const age = t - q.t0, u = age / q.life;
    if (u < 0 || u >= 1)
      return;
    const head = q.rise * age, tail = Math.max(0, head - q.len), fade = smooth(0, 0.15, u) * (1 - smooth(0.4, 1, u));
    for (let h = tail;h <= head; h += 0.5) {
      const s = (h - tail) / Math.max(1, head - tail), x = q.x + q.amp * Math.sin(h * q.k + q.ph) * (0.2 + s) + q.drift * age;
      p.blend(x, q.y - h, col, fade * Math.sin(Math.PI * s) * 0.42);
    }
  }
  function create17(o) {
    const C = fit(o.palette, 8), R = new Rng(o.seed), floor = () => 0;
    const SCORCH = mix(C[0], hex("#140f0c"), 0.6), BURNT = mix(C[1], hex("#2a1a10"), 0.6), STEAM = mix(C[7], hex("#e8ece6"), 0.75);
    const ps = new Particles({ rng: R, ground: floor, sparks: [C[7], C[6], C[5], C[4]] });
    const drops = new Drops(floor), lights = new Lights, stains = [], wisps = [], pops = [];
    const spikes = Array.from({ length: 13 }, (_, i) => ({ a: i / 13 * TAU + R.range(-0.18, 0.18), h: R.range(4, 10), r: R.range(0.85, 1.12), shed: false }));
    const rag = Array.from({ length: 80 }, (_, i) => rand(i, o.seed, 5) - 0.5);
    let t = 0, hit = false;
    const pw = () => W * ease.outCubic(clamp((t - HIT2) / SPREAD2)) * 1.02;
    const pitD = () => PIT * ease.outCubic(clamp((t - HIT2) / 1.1));
    const depth = (x) => {
      const w = pw(), d = Math.abs(x) / Math.max(1, w);
      return d >= 1 ? -1 : pitD() * Math.sqrt(1 - d * d) + rag[(Math.round(x) + 200) % 80] * 0.9;
    };
    const level = () => t < HIT2 ? 0 : -1.6 + (PIT + 1.6) * ease.inQuad(smooth(DRY, GONE3, t));
    const width = () => {
      const L = level(), w = pw();
      return L <= 0 ? w : w * Math.sqrt(Math.max(0, 1 - (L / Math.max(0.1, pitD())) ** 2));
    };
    const heat = () => smooth(HIT2, HIT2 + 0.3, t) * (1 - smooth(GONE3 - 0.3, GONE3 + 0.25, t));
    const gobY = () => Y0 + V0 * t + 0.5 * 950 * t * t;
    const crownR = () => 4 + 11 * ease.outCubic(clamp((t - HIT2) / 0.16));
    const crownH = () => 5 * Math.sin(Math.PI * clamp((t - HIT2) / 0.26));
    const spikeK = () => {
      const u = clamp((t - HIT2 - 0.015) / 0.26);
      return Math.sin(Math.PI * Math.pow(u, 0.6));
    };
    const tipOf = (s) => {
      const r = crownR() * s.r, h = crownH(), sn = Math.sin(s.a), sh = s.h * spikeK();
      const bx = Math.cos(s.a) * r, by = sn * r * 0.3 - h * (0.75 + 0.25 * Math.abs(sn));
      return [bx, by, bx + Math.cos(s.a) * sh * 0.55, by - sh];
    };
    const steam = (x, y, big) => wisps.push({ x, y, t0: t, life: Math.min(R.range(0.5, 0.9) * (big ? 1.3 : 1), meta23.duration - 0.05 - t), rise: R.range(22, 32), len: R.range(5, 10) * (big ? 1.4 : 1), amp: R.range(1, 2.5), k: R.range(0.35, 0.6), ph: R.range(0, TAU), drift: R.range(-4, 4) });
    const crown = (p, back) => {
      if (t < HIT2 || t > HIT2 + 0.27)
        return;
      const r = crownR(), h = crownH(), ry = r * 0.3;
      for (let x = Math.floor(-r);x <= Math.ceil(r); x++) {
        const c = (x + 0.5) / r;
        if (Math.abs(c) > 1)
          continue;
        const e = Math.sqrt(1 - c * c), yb = (back ? -ry : ry) * e, hh = h * (0.75 + 0.25 * e);
        for (let y = Math.floor(yb - hh);y <= Math.round(yb); y++) {
          const rim = y === Math.floor(yb - hh);
          if (rim)
            p.px(x, y, back ? C[5] : c < 0.1 ? C[7] : C[6]);
          else
            p.blend(x, y, C[(c < -0.25 ? 5 : c > 0.45 ? 3 : 4) - (back ? 1 : 0)], back ? 0.55 : 0.7);
        }
      }
      for (const s of spikes) {
        if (Math.sin(s.a) < 0 !== back)
          continue;
        const [bx, by, tx, ty] = tipOf(s);
        p.line(bx, by, tx, ty, back ? C[4] : C[6]);
        p.line(bx + 1, by, (bx + tx) / 2 + 0.5, (by + ty) / 2, back ? C[3] : C[5]);
        if (!s.shed)
          p.px(tx, ty - 1, back ? C[5] : C[7]), p.px(tx + 1, ty - 1, C[5]);
      }
    };
    return {
      update(dt) {
        t += dt;
        const f = Math.min(1, dt * 120), w = width();
        if (!hit && t >= HIT2) {
          hit = true;
          lights.add(0, -4, 28, WHITE, 0.6, 0.08);
          lights.add(0, -10, 56, C[5], 0.5, 0.6);
          for (let i = 0;i < 26; i++) {
            const a = -Math.PI / 2 + R.range(-1.35, 1.35), sp = R.range(60, 250);
            drops.add(R.range(-3, 3), -2, Math.cos(a) * sp, Math.sin(a) * sp, R.chance(0.3) ? 2 : 1);
          }
          for (let i = 0;i < 10; i++) {
            const a = -Math.PI / 2 + R.range(-1.2, 1.2), sp = R.range(120, 260);
            ps.spawn(P.SPARK, 0, -2, Math.cos(a) * sp, Math.sin(a) * sp, R.range(0.12, 0.3));
          }
          for (let i = 0;i < 5; i++)
            steam(R.range(-10, 10), -R.range(2, 6), true);
        }
        if (hit) {
          for (const s of spikes)
            if (!s.shed && t > HIT2 + 0.09) {
              s.shed = true;
              const [, , tx, ty] = tipOf(s);
              drops.add(tx, ty - 1, Math.cos(s.a) * R.range(30, 80), -R.range(50, 130), R.chance(0.4) ? 2 : 1);
            }
        }
        drops.update(dt, (d) => {
          if (Math.abs(d.x) > pw())
            stains.push({ x: d.x, t0: t, w: d.s * 0.8 + R.range(0.3, 1.2) });
          if (t < GONE3)
            steam(d.x, -1, false);
        });
        const lv = level(), w2 = width();
        if (t > HIT2 + 0.15 && t < GONE3 && w2 > 2) {
          if (R.chance(0.3 * f)) {
            const x = R.range(-0.85, 0.85) * w2, y = Math.min(lv, depth(x)) - 1;
            pops.push({ x, y, t0: t });
            for (let j = 0;j < R.int(1, 3); j++)
              drops.add(x, Math.min(y - 1, -1), R.range(-40, 40), -R.range(50, 110), 1);
          }
          if (R.chance(0.14 * f))
            steam(R.range(-0.9, 0.9) * w2, Math.min(lv, 0) - 1, R.chance(0.25));
        }
        if (t > GONE3 - 0.2 && t < meta23.duration - 0.5 && R.chance(0.08 * f))
          steam(R.range(-0.7, 0.7) * pw(), 0, false);
        for (let i = pops.length - 1;i >= 0; i--)
          if (t - pops[i].t0 > 0.1)
            pops.splice(i, 1);
        for (let i = wisps.length - 1;i >= 0; i--)
          if (t - wisps[i].t0 > wisps[i].life)
            wisps.splice(i, 1);
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        const fade = 1 - smooth(meta23.duration - 0.6, meta23.duration - 0.08, t), hk = heat(), w = pw(), lv = level();
        for (const s of stains) {
          const age = t - s.t0, k = 1 - smooth(1, 1.8, age), c = age < 0.15 ? C[7] : age < 0.5 ? C[6] : age < 0.9 ? C[4] : BURNT;
          for (let x = Math.floor(s.x - s.w);x <= Math.ceil(s.x + s.w); x++)
            p.dot(x, 0, Math.abs(x - s.x) < s.w * 0.5 ? SCORCH : c, k * fade);
          if (age < 0.5)
            p.glow(s.x, -1, 5, C[5], 0.3 * (1 - age / 0.5));
        }
        crown(p, true);
        if (t > HIT2 && w > 1) {
          for (let x = Math.floor(-w) - 1;x <= Math.ceil(w) + 1; x++) {
            const dp = depth(x + 0.5);
            if (dp < 0)
              continue;
            const bottom = Math.max(0, Math.round(dp)), edge = Math.abs(x + 0.5) / w > 0.88;
            for (let y = 0;y <= bottom; y++)
              p.dot(x, y, y === bottom ? hk > 0.5 ? C[6] : hk > 0.15 ? C[4] : BURNT : SCORCH, fade);
            p.dot(x, bottom + 1, hk > 0.5 ? C[5] : hk > 0.15 ? C[3] : SCORCH, fade * 0.8);
            if (edge)
              p.dot(x, -1, hk > 0.4 ? C[7] : hk > 0.1 ? C[5] : BURNT, fade);
          }
          for (const sd of [-1, 1])
            p.glow(sd * w, -1, 8, C[6], 0.45 * hk);
          if (t < GONE3)
            for (let x = Math.floor(-w);x <= Math.ceil(w); x++) {
              const dp = depth(x + 0.5);
              if (dp < 0)
                continue;
              const d = Math.abs(x + 0.5) / w, dome = lv < 0 ? Math.round(lv * Math.sqrt(Math.max(0, 1 - d * d))) : Math.round(lv), bottom = Math.round(dp);
              if (dome > bottom)
                continue;
              const n = noise(x * 0.25 - t * 2.4, 3) + noise(x * 0.1 + t * 1.4, 5) * 0.6;
              for (let y = dome;y <= bottom; y++)
                p.px(x, y, y === dome ? n > 0.7 ? C[7] : C[6] : y === dome + 1 ? n > 0.2 ? C[5] : C[4] : y >= bottom ? C[3] : C[4]);
            }
          p.glow(0, -6, w * 1.4 + 10, C[4], 0.3 * hk * (0.85 + 0.15 * Math.sin(t * 9)));
          p.glow(0, 1, w * 0.9, C[6], 0.2 * hk);
        }
        ps.draw(p, "back");
      },
      draw(p) {
        if (t < HIT2) {
          const y = gobY(), v = V0 + 950 * t, st = 1 + v * 0.0022, rx = 2.6 / Math.sqrt(st), ry = 2.8 * st;
          p.shade(-rx - 1, y - ry - 4, rx + 1, y + ry + 1, (x, yy, out) => {
            const dx = x / rx, dy = (yy - y) / ry, tail = dy < 0 && Math.abs(x) < rx * (1 + dy * 0.9) + 0.4 && dy > -1.7;
            const d = dx * dx + dy * dy;
            if (d > 1.25 && !tail)
              return;
            out.c = d > 1 && !tail ? C[2] : dx < -0.2 && dy < -0.1 ? C[7] : dy > 0.45 ? C[4] : C[5];
          });
          p.px(-1, y - ry * 0.3, WHITE);
          for (let i = 1;i <= 3; i++)
            p.dot(0, y - ry - 2 - i * 4, C[5], 1 - i * 0.25);
          p.glow(0, y, 10, C[5], 0.45);
        }
        crown(p, false);
        const e = t - HIT2;
        if (e >= 0 && e < 0.07) {
          const k = 1 - e / 0.07;
          p.ellipse(0, -2, 6 + 6 * (1 - k), 2.5, k > 0.5 ? WHITE : C[7]);
          sparkle(p, 0, -4, 8 * k, C[7], C[6], 0.6);
        }
        for (const q of pops) {
          const k = (t - q.t0) / 0.1;
          p.px(q.x, q.y, WHITE);
          for (const [dx, dy] of [[1, 0], [-1, 0], [0, -1]])
            p.dot(q.x + dx * (1 + k * 2), q.y + dy * (1 + k * 2), C[7], 1 - k);
          p.glow(q.x, q.y, 4, C[6], 0.4 * (1 - k));
        }
        for (const q of wisps)
          wisp(p, q, t, STEAM);
        drops.draw(p, C);
        ps.draw(p, "front");
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/fire/_lib.js
  function pnoise(x, period, seed = 0) {
    const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f);
    const a = rand(wrap(i, period), seed), b = rand(wrap(i + 1, period), seed);
    return (a + (b - a) * u) * 2 - 1;
  }
  function noiseFor(D) {
    if (!D)
      return (tt, rate, seed = 0, off = 0) => noise(tt * rate + off, seed);
    return (tt, rate, seed = 0, off = 0) => {
      const P = Math.max(1, Math.round(rate * D));
      return pnoise(tt / D * P + off, P, seed);
    };
  }
  function looped(t, D, count, seed, make, draw) {
    for (let i = 0;i < count; i++) {
      const r = rng(seed, i), born = r.next() * D, q = make(r, i);
      for (let age = wrap(t - born, D);age < q.life; age += D)
        draw(q, age, i);
    }
  }
  var hotFirst = (F) => [...F].reverse();
  var LAYERS4 = [[1, 1, 6], [0.76, 0.86, 4], [0.54, 0.68, 2], [0.3, 0.42, 0]];
  function flameBlade(p, x, y, ux, uy, len, w, bend, N, n, H, layers = LAYERS4, jit = 0.5, wob = 1.1) {
    if (len < 1)
      return;
    const nx = -uy, ny = ux;
    for (const [lw, lh, ri] of layers) {
      const L = len * lh, c = H[ri];
      for (let r = 0;r <= L; r += 0.5) {
        const u = r / Math.max(1, L);
        const half = w * lw * Math.pow(1 - u, 0.85) * Math.min(1, (r + 1.5) / 3.5) + N(9, n, r * 0.45) * jit;
        if (half < 0.3)
          continue;
        const off = bend * u * u * lh + N(4, n + 7, r * 0.2) * u * wob, cx = x + ux * r + nx * off, cy = y + uy * r + ny * off;
        for (let q = -half;q <= half; q += 0.5)
          p.px(cx + nx * q, cy + ny * q, c);
      }
    }
  }
  function solid(p, x, y, r, c) {
    if (r < 0.6)
      return p.px(x, y, c);
    const cx = p.toX(x, y), cy = p.toY(x, y), r2 = r * r;
    for (let sy = Math.floor(cy - r);sy <= Math.ceil(cy + r); sy++) {
      const dy = sy + 0.5 - cy, s2 = r2 - dy * dy;
      if (s2 < 0)
        continue;
      const s = Math.sqrt(s2);
      for (let sx = Math.ceil(cx - s - 0.5);sx <= Math.floor(cx + s - 0.5); sx++)
        p.put(sx, sy, c, 1);
    }
  }
  function soft(p, x, y, r, c, a) {
    if (a <= 0.004)
      return;
    if (r < 0.5)
      return p.blend(x, y, c, a);
    const cx = p.toX(x, y), cy = p.toY(x, y), r2 = r * r;
    for (let sy = Math.floor(cy - r);sy <= Math.ceil(cy + r); sy++) {
      const dy = sy + 0.5 - cy, s2 = r2 - dy * dy;
      if (s2 < 0)
        continue;
      const s = Math.sqrt(s2);
      for (let sx = Math.ceil(cx - s - 0.5);sx <= Math.floor(cx + s - 0.5); sx++)
        p.blendPx(sx, sy, c, a);
    }
  }
  function firePuff(p, x, y, k, size, frac, H, glowK = 0.18, tx = 0, ty = -1) {
    const age = 1 - k, n = H.length, heat = Math.min(0.999, Math.pow(age, 0.62) + frac * 0.1);
    const idx = Math.min(n - 2, Math.floor(heat * (n - 1)));
    const r = size * (0.55 + 0.45 * Math.min(1, age * 7)) * (1 - age * 0.55), c = H[idx];
    if (idx >= n - 2)
      return soft(p, x, y, r, c, Math.min(1, k * 3) * 0.85);
    solid(p, x, y, r, H[Math.min(n - 1, idx + 2)]);
    if (r > 1.6 && ty > -0.99)
      solid(p, x + tx * r * 1.5, y + ty * r * 1.5, r * 0.3, H[Math.min(n - 1, idx + 1)]);
    solid(p, x - r * 0.16, y - r * 0.22, r * 0.78, c);
    if (r > 1.6)
      solid(p, x + tx * r * 0.9, y + ty * r * 0.9, r * 0.42, c);
    if (idx <= 3 && r > 1.8)
      solid(p, x - r * 0.28, y - r * 0.34, r * 0.36, H[Math.max(0, idx - 1)]);
    if (idx < 6)
      p.glow(x, y, r * 2.4 + 2, c, glowK * k);
  }
  var rampAt3 = (r, t) => r[Math.min(r.length - 1, Math.max(0, Math.floor(t * r.length)))];
  function smokePuff(p, x, y, k, size, col = 0, big = false, aMul = 1) {
    const age = 1 - k;
    const r = size * (0.65 + Math.min(1, age * 2.5) * 0.45 + age * (big ? 0.5 : 0.4));
    const a = Math.min(1, age * 12) * Math.min(1, k * 2.4) * (big ? 0.7 : 0.58) * aMul;
    const c = col ? mix(col, rampAt3(SMOKE_RAMP, age), age) : rampAt3(SMOKE_RAMP, age * 1.05);
    soft(p, x, y, r, c, a * 0.45);
    soft(p, x + r * 0.05, y + r * 0.06, r * 0.74, c, a * 0.62);
    if (age < 0.5)
      soft(p, x - r * 0.22, y - r * 0.3, r * 0.5, mix(c, WHITE, 0.12), a * 0.4 * (1 - age * 2));
  }
  function ember2(p, x, y, k, size, cols, ph) {
    if (k < 0.25 && Math.sin(ph) < 0)
      return;
    const c = k > 0.6 ? cols[0] : k > 0.3 ? cols[1] : cols[2];
    if (size >= 2) {
      const rim = k > 0.45 ? cols[2] : cols[3];
      p.px(x - 1, y, rim), p.px(x + 1, y, rim), p.px(x, y - 1, rim), p.px(x, y + 1, rim);
      p.px(x, y, c);
      p.glow(x, y, 8, c, 0.4 * k);
      return;
    }
    p.px(x, y, c);
    if (size > 1.4)
      p.px(x, y + 1, cols[3]);
    p.glow(x, y, 3 + size, c, 0.35 * k);
  }
  function spark(p, x, y, vx, vy, k, cols) {
    const sp = Math.hypot(vx, vy) || 1, ux = vx / sp, uy = vy / sp, len = Math.min(9, 1 + sp * 0.022);
    const head = k > 0.6 ? cols[0] : k > 0.3 ? cols[1] : cols[2];
    p.line(x - ux * len, y - uy * len, x - ux * len * 0.4, y - uy * len * 0.4, k > 0.5 ? head : cols[cols.length - 1]);
    p.line(x - ux * len * 0.45, y - uy * len * 0.45, x, y, head);
    p.glow(x, y, 3, head, 0.45 * k);
  }
  function along2(x, v, a, k, t) {
    if (k <= 0)
      return [x + v * t + 0.5 * a * t * t, v + a * t];
    const e = Math.exp(-k * t), vt = a / k;
    return [x + vt * t + (v - vt) * (1 - e) / k, vt + (v - vt) * e];
  }
  function drift2(x, y, vx, vy, t, ax, ay, kx, ky) {
    const X = along2(x, vx, ax, kx, t), Y = along2(y, vy, ay, ky, t);
    return [X[0], Y[0], X[1], Y[1]];
  }
  var SMOKE1 = hex("#5b5566");

  // ../vendor_src/pixelfx/src/fx/fire/fireball.js
  var meta24 = {
    name: "Fireball",
    desc: "A fireball flying right: a churning white-hot head with a corona of flame, a long torn tail of flame puffs cooling into smoke, embers shed behind.",
    tags: ["fire", "fireball", "projectile", "magic", "directional", "loop"],
    size: [136, 56],
    origin: [112, 28],
    duration: 1.2,
    loop: true,
    fps: 30,
    bg: "dark",
    options: {
      palette: ["#4a1712", "#8a1f17", "#c9281f", "#f2561d", "#ff8a2a", "#ffc23d", "#ffe26b", "#fff3a6", "#ffffff"],
      radius: 5,
      speed: 120,
      seed: 5
    }
  };
  var D7 = meta24.duration;
  var NL = noiseFor(D7);
  var SMOKE12 = hex("#5b5566");
  var BODY = [[30, 4.2, 0], [23, 4.4, -1.6], [22, 4.4, 1.6], [15, 4.6, 0]];
  var CORONA = [[-1.3, 6, 1.1], [-1.8, 8, 1.2], [-2.3, 7, 1.1], [1.3, 6, 1.1], [1.8, 8, 1.2], [2.3, 7, 1.1]];
  function head2(p, H, t, R0, S, hx, hy) {
    const ph = t / D7;
    p.shade(hx - R0 * 2.4, hy - R0 * 1.7, hx + R0 * 1.5, hy + R0 * 1.7, (x, y, out) => {
      x -= hx;
      y -= hy;
      const d = Math.hypot(x, y), th = Math.atan2(y, x), back = Math.max(0, -Math.cos(th)), a = th / TAU;
      const bump = 0.55 * pnoise(a * 9 + ph * 9, 9, S) + 0.35 * pnoise(a * 5 - ph * 10, 5, S + 1);
      const rim = R0 * (1 + 0.55 * back * back) + bump;
      if (d > rim)
        return;
      const swirl = pnoise(a * 5 - ph * 10 + d * 0.45, 5, S + 2);
      const h = 1 - d / rim + 0.26 * swirl + 0.1 * (1 - back);
      if (rim - d < 1 && back < 0.3)
        return h > 0.3 ? H[3] : H[5];
      return h > 0.74 ? H[0] : h > 0.58 ? H[1] : h > 0.42 ? H[2] : h > 0.27 ? H[4] : h > 0.13 ? H[5] : H[6];
    });
  }
  function draw7(p, t, o) {
    const F = fit(o.palette, 9), H = hotFirst(F), { seed: S, radius: R0, speed: V } = o;
    const N = (rate, seed = 0, off = 0) => NL(t, rate, seed, off);
    const GLOW = mix(mix(H[3], H[4], 0.5), WHITE, 0.25), SMOKE = mix(SMOKE12, H[6], 0.3), SPARKS = [H[1], H[2], H[4], H[5]], EMB = [H[1], H[2], H[4], H[6]];
    const hx = N(3, S + 50) * 0.5, hy = N(2.5, S + 51) * 0.7;
    const fire = [], smoke = [];
    looped(t, D7, 130, S + 100, (r) => {
      const fl = r.range(0.22, 0.55), sm = r.chance(0.55), x = -r.range(2, 24);
      return { x, y: r.range(-1, 1) * (R0 - 0.1 * -x), v: V * r.range(0.3, 0.6), vy: r.range(-16, 16), fl, sm, sl: r.range(0.25, 0.45), s: r.range(1.3, 2.9), f: r.next() * 0.5 + 0.5 * (-x / 24), life: fl + (sm ? 0.45 : 0) };
    }, (q, age) => {
      const ta = Math.min(age, q.fl), [wx, y, wvx, vy] = drift2(0, q.y, q.v, q.vy, ta, 0, -70, 4.5, 3);
      const x = q.x + wx - V * ta;
      if (age < q.fl)
        return fire.push([age, x, y, q]);
      if (!q.sm || age - q.fl > q.sl)
        return;
      const sa = age - q.fl, [sx, sy] = drift2(x, y, wvx - V, vy * 0.6 - 6, sa, V * 2, -30, 2, 1.2);
      smoke.push([sa, sx, sy, q]);
    });
    for (const [sa, x, y, q] of smoke)
      smokePuff(p, x, y, 1 - sa / q.sl, q.s * 0.9, SMOKE);
    fire.sort((a, b) => b[0] - a[0]);
    for (const [age, x, y, q] of fire) {
      const u = age / q.fl;
      firePuff(p, x, y, 1 - u, q.s * (1 + 1.3 * u), q.f, H, 0.07, -0.86, -0.5);
    }
    BODY.forEach(([len, w, dy], i) => {
      const n = (S * 5 + i) * 17, L = len * (0.82 + 0.25 * N(4, n)) * (1 + 0.3 * Math.max(0, N(2.4, n + 3)));
      flameBlade(p, hx + 1, hy + dy * 0.5, -1, dy * 0.02, L, w * R0 / 5, N(3, n + 5) * 3 + dy, N, n, H, LAYERS4, 0.5, 1.1 + L * 0.05);
    });
    CORONA.forEach(([a, len, w], i) => {
      const n = (S * 5 + i + 20) * 17, L = len * (0.7 + 0.4 * (0.5 + 0.5 * N(6, n))), ox = Math.cos(a) * R0 * 0.85, oy = Math.sin(a) * R0 * 0.85;
      const dx = Math.cos(a) * 0.55 - 1, dy = Math.sin(a) * 0.55, l = Math.hypot(dx, dy);
      flameBlade(p, hx + ox, hy + oy, dx / l, dy / l, L, w, -Math.sign(a) * 1.5, N, n, H, LAYERS4);
    });
    head2(p, H, t, R0, S, hx, hy);
    looped(t, D7, 26, S + 200, (r) => ({ a: r.range(-2.4, 2.4), v: r.range(30, 70), life: r.range(0.08, 0.18) }), (q, age) => {
      const ca = Math.cos(q.a), sa = Math.sin(q.a), d = R0 * 0.9 + q.v * age, x = hx + ca * d - V * 0.4 * age, y = hy + sa * d;
      const k = 1 - age / q.life, L = 1 + 2 * k;
      p.line(x - ca * L + V * 0.02, y - sa * L, x, y, k > 0.5 ? H[1] : H[3]);
      p.glow(x, y, 3, H[2], 0.4 * k);
    });
    looped(t, D7, 30, S + 300, (r) => ({ x: -r.range(2, 16), y: r.range(-3, 3), v: V * r.range(0.3, 0.8), vy: r.range(-20, 20), life: r.range(0.25, 0.55), big: r.chance(0.25), ph: r.range(0, 6.3) }), (q, age) => {
      const [wx, y, wvx, vy] = drift2(0, q.y, q.v, q.vy, age, 0, 50, 3, 2);
      const x = q.x + wx - V * age, k = 1 - age / q.life;
      if (q.big)
        ember2(p, x, y, k, 2, EMB, age * 40 + q.ph);
      else
        spark(p, x, y, wvx - V, vy, k, SPARKS);
    });
    const fl = 0.85 + 0.15 * N(9, S + 7);
    p.glowLine(hx - 6, hy, -50, -2, 12, GLOW, 0.2 * fl);
    p.glow(hx - 2, hy, 42, GLOW, 0.42 * fl);
    p.glow(hx, hy, 13, H[1], 0.3 * fl);
  }

  // ../vendor_src/pixelfx/src/fx/ui/confetti.js
  var meta25 = {
    name: "Confetti",
    desc: "Two party poppers bang one after the other: paper bits and curly streamers burst out, stall, then tumble and flutter down, flipping, and settle on the floor.",
    tags: ["ui", "celebration", "confetti", "party", "reward", "one-shot"],
    size: [200, 140],
    origin: [100, 126],
    duration: 3.4,
    loop: false,
    fps: 30,
    bg: "ground",
    options: { palette: ["#ff4a5a", "#ff9a2a", "#ffe03c", "#5ad84a", "#3cc8ff", "#7a6cff", "#f53cd1"], seed: 11 }
  };
  var POPPERS = [
    { x: -74, y: -1, a: -Math.PI / 2 + 0.62, t: 0.1 },
    { x: 74, y: -1, a: -Math.PI / 2 - 0.62, t: 0.26 }
  ];
  var INK4 = hex("#141019");
  function popper(p, x, y, a, k, C, alpha) {
    const ca = Math.cos(a), sa = Math.sin(a), bx = x - ca * k, by = y - sa * k;
    p.shade(bx - 12, by - 12, bx + 12, by + 12, (px, py, o) => {
      const dx = px - bx, dy = py - by, u = dx * ca + dy * sa, v = -dx * sa + dy * ca;
      if (u < 0 || u > 11)
        return;
      const hw = 0.8 + u * 0.32;
      if (Math.abs(v) > hw + 0.6)
        return;
      o.a = alpha;
      if (Math.abs(v) > hw - 0.4 || u > 10.2 || u < 0.8)
        return INK4;
      const stripe = Math.floor((u + v * 0.6) / 2.2) % 2 === 0;
      return stripe ? v < 0 ? C[2] : scale(C[2], 0.75) : v < 0 ? WHITE : hex("#c8c0d8");
    });
  }
  function create18(o) {
    const C = fit(o.palette, 7), R = new Rng(o.seed);
    const ps = new Particles({ rng: R, ground: () => 0, sparks: ["#ffffff", "#fff3a6", "#ffc23d", "#ff8a2a"] }), lights = new Lights;
    const bits = [], ribbons = [], fired = [false, false], end = meta25.duration - 0.05;
    const kick = (t, pp) => t < pp.t ? 0 : 3 * Math.exp(-(t - pp.t) * 14);
    function fire(pp) {
      const mx = pp.x + Math.cos(pp.a) * 11, my = pp.y + Math.sin(pp.a) * 11;
      lights.add(mx, my, 34, WHITE, 0.6, 0.12);
      lights.add(mx, my, 50, C[2], 0.4, 0.4);
      for (let i = 0;i < 6; i++)
        ps.spawn(P.SMOKE, mx, my, Math.cos(pp.a) * R.range(20, 60) + R.range(-10, 10), Math.sin(pp.a) * R.range(20, 60), R.range(0.6, 1), hex("#5d5660"), R.range(2.5, 4));
      for (let i = 0;i < 12; i++) {
        const an = pp.a + R.range(-0.5, 0.5), sp = R.range(120, 260);
        ps.spawn(P.SPARK, mx, my, Math.cos(an) * sp, Math.sin(an) * sp, R.range(0.1, 0.25));
      }
      for (let i = 0;i < 46; i++) {
        const an = pp.a + R.range(-0.38, 0.38), sp = R.range(200, 380);
        bits.push({ x: mx, y: my, vx: Math.cos(an) * sp, vy: Math.sin(an) * sp, c: R.pick(C), w: R.range(2, 3), h: R.range(3, 4.6), ang: R.range(0, TAU), spin: R.range(-14, 14), flip: R.range(0, TAU), fs: R.range(5, 13), ph: R.range(0, TAU), amp: R.range(5, 12), fw: R.range(2, 3.4), x0: 0, mode: 0, rest: 0, fall: R.range(26, 40) });
      }
      for (let i = 0;i < 4; i++) {
        const an = pp.a + R.range(-0.25, 0.25), sp = R.range(220, 330), n = 11;
        ribbons.push({ pts: Array.from({ length: n }, () => [mx, my]), vx: Math.cos(an) * sp, vy: Math.sin(an) * sp, c: R.pick(C), ph: R.range(0, TAU), amp: R.range(6, 12), fw: R.range(1.5, 2.4), mode: 0, x0: 0, curl: R.range(0.7, 1.1), fall: R.range(22, 32) });
      }
    }
    let t = 0;
    return {
      update(dt) {
        t += dt;
        POPPERS.forEach((pp, i) => !fired[i] && t >= pp.t && (fired[i] = true, fire(pp)));
        for (const b of bits) {
          if (b.mode === 2) {
            b.rest += dt;
            continue;
          }
          b.flip += b.fs * dt;
          if (b.mode === 0) {
            b.vx -= b.vx * 3.4 * dt;
            b.vy -= b.vy * 3.4 * dt - 140 * dt;
            b.x += b.vx * dt;
            b.y += b.vy * dt;
            b.ang += b.spin * dt;
            if (Math.hypot(b.vx, b.vy) < 40)
              b.mode = 1, b.x0 = b.x - Math.sin(b.ph) * b.amp;
          } else {
            b.ph += b.fw * dt;
            b.x0 += b.vx * dt;
            b.vx -= b.vx * 2 * dt;
            b.x = b.x0 + Math.sin(b.ph) * b.amp;
            b.y += b.fall * (0.4 + 0.9 * Math.abs(Math.cos(b.ph))) * dt;
            b.ang = Math.cos(b.ph) * 0.9;
            if (b.y >= -1)
              b.y = -0.5, b.mode = 2, b.ang = R.range(-0.3, 0.3), b.flip = 0;
          }
        }
        for (const r of ribbons) {
          const h = r.pts[0];
          if (r.mode === 0) {
            r.vx -= r.vx * 3 * dt;
            r.vy -= r.vy * 3 * dt - 120 * dt;
            h[0] += r.vx * dt;
            h[1] += r.vy * dt;
            if (Math.hypot(r.vx, r.vy) < 35)
              r.mode = 1, r.x0 = h[0] - Math.sin(r.ph) * r.amp;
          } else if (h[1] < -1) {
            r.ph += r.fw * dt;
            r.x0 += r.vx * dt;
            r.vx -= r.vx * 2 * dt;
            h[0] = r.x0 + Math.sin(r.ph) * r.amp;
            h[1] += r.fall * (0.5 + 0.7 * Math.abs(Math.cos(r.ph))) * dt;
          }
          for (let i = 1;i < r.pts.length; i++) {
            const a = r.pts[i - 1], b = r.pts[i];
            b[1] = Math.min(-0.5, b[1] + 20 * dt);
            const dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1;
            if (d > 2.6)
              b[0] = a[0] + dx / d * 2.6, b[1] = a[1] + dy / d * 2.6;
          }
        }
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        ps.draw(p, "back");
      },
      draw(p) {
        const fade = 1 - seg(t, end - 0.45, end - 0.05);
        for (const pp of POPPERS) {
          const k = kick(t, pp);
          popper(p, pp.x, pp.y, pp.a, k, C, 1 - seg(t, 2.5, 2.9));
          const ft = t - pp.t;
          if (ft > 0 && ft < 0.12)
            sparkle(p, pp.x + Math.cos(pp.a) * 13, pp.y + Math.sin(pp.a) * 13, 7 * (1 - ft / 0.12), WHITE, C[2], 0.7);
        }
        for (const r of ribbons) {
          const pts = r.pts.map(([x, y], i) => [x + Math.sin(i * r.curl + t * 9 + r.ph) * (i ? 1.6 : 0), y]);
          for (let i = 1;i < pts.length; i++) {
            const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], front = Math.sin(i * r.curl + t * 9 + r.ph) > 0;
            p.line(x0, y0, x1, y1, front ? r.c : scale(r.c, 0.6), fade);
            p.line(x0 + 1, y0, x1 + 1, y1, front ? mix(r.c, WHITE, 0.35) : scale(r.c, 0.45), fade);
          }
        }
        for (const b of bits) {
          if (b.y > 1)
            continue;
          const fw = b.mode === 2 ? 1 : Math.cos(b.flip), w = Math.max(0.5, Math.abs(fw) * b.w), ca = Math.cos(b.ang), sa = Math.sin(b.ang);
          const c = fw >= 0 ? b.c : scale(b.c, 0.62), a = fade;
          if (b.mode === 2) {
            p.dot(b.x, b.y, scale(b.c, 0.8), a);
            p.dot(b.x + 1, b.y, scale(b.c, 0.6), a);
            continue;
          }
          p.shade(b.x - 4, b.y - 4, b.x + 4, b.y + 4, (x, y, out) => {
            const dx = x - b.x, dy = y - b.y, u = dx * ca + dy * sa, v = -dx * sa + dy * ca;
            if (Math.abs(u) > w / 2 + 0.2 || Math.abs(v) > b.h / 2)
              return;
            out.a = a;
            return Math.abs(fw) > 0.92 && v < -b.h / 2 + 1 ? WHITE : c;
          });
          if (Math.abs(fw) > 0.97)
            p.glow(b.x, b.y, 5, mix(b.c, WHITE, 0.5), 0.35 * fade);
        }
        ps.draw(p, "front");
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/ui/_lib.js
  function spell(str, font = "big") {
    const F = FONTS[font], letters = [];
    let x = 0;
    for (const ch of String(str)) {
      const g = F.glyphs[ch] ?? F.glyphs[ch.toUpperCase()] ?? null;
      const w = g ? g.w : F.space;
      letters.push({ ch, g, x, w, h: F.h });
      x += w + F.gap;
    }
    return { letters, w: Math.max(0, x - F.gap), h: F.h };
  }
  var ids = new Int16Array(4096);
  var edges = new Uint8Array(4096);
  function drawWord(p, items, st) {
    if (!items.length)
      return;
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    for (const it of items) {
      const h = it.g.rows.length * it.sy, w = it.g.w * it.sx, sl = Math.abs(it.slant ?? 0) * it.g.rows.length;
      x0 = Math.min(x0, it.x - sl);
      x1 = Math.max(x1, it.x + w + sl);
      y0 = Math.min(y0, it.y);
      y1 = Math.max(y1, it.y + h);
    }
    const ow = st.ow ?? 1;
    x0 = Math.floor(x0) - 1 - ow;
    y0 = Math.floor(y0) - 1 - ow;
    x1 = Math.ceil(x1) + 2 + ow;
    y1 = Math.ceil(y1) + 3 + ow;
    const W = x1 - x0, H = y1 - y0;
    if (W * H > ids.length)
      ids = new Int16Array(W * H * 2), edges = new Uint8Array(W * H * 2);
    ids.fill(0, 0, W * H);
    items.forEach((it, k) => {
      const g = it.g, gh = g.rows.length, h = gh * it.sy, bot = it.y + h, sl = it.slant ?? 0;
      for (let py = Math.floor(it.y);py < Math.ceil(bot); py++) {
        const gy = Math.floor((py + 0.5 - it.y) / it.sy);
        if (gy < 0 || gy >= gh)
          continue;
        const shift = Math.round((bot - py - 0.5) / it.sy * sl);
        const ry = py + 0.5 - it.y - gy * it.sy, row = g.rows[gy];
        for (let px = Math.floor(it.x + shift) - 1;px <= Math.ceil(it.x + shift + g.w * it.sx); px++) {
          const fx = px + 0.5 - it.x - shift, gx = Math.floor(fx / it.sx);
          if (gx < 0 || gx >= g.w || !row[gx])
            continue;
          const i = (py - y0) * W + (px - x0);
          if (i < 0 || i >= W * H)
            continue;
          ids[i] = k + 1;
          const rx = fx - gx * it.sx, up = gy > 0 ? g.rows[gy - 1] : null, dn = gy < gh - 1 ? g.rows[gy + 1] : null;
          const open = (r) => !r || !r[gx] && !r[gx - 1] && !r[gx + 1];
          edges[i] = (ry < 1 && open(up) ? 1 : 0) | (ry >= it.sy - 1 && open(dn) ? 2 : 0) | (rx < 1 && !(gx > 0 && row[gx - 1]) ? 4 : 0);
        }
      }
    });
    const at = (x, y) => x < x0 || y < y0 || x >= x1 || y >= y1 ? 0 : ids[(y - y0) * W + (x - x0)];
    const F = st.fill, nF = F.length, shine = st.shine, glint = st.glint ?? WHITE, sy0 = st.shineY ?? y0;
    for (let y = y0;y < y1; y++)
      for (let x = x0;x < x1; x++) {
        const id = at(x, y);
        if (id) {
          const it = items[id - 1], v = (y + 0.5 - it.y) / (it.g.rows.length * it.sy);
          let i = Math.min(nF - 1, Math.max(0, Math.floor((1 - v) * nF)));
          let c = F[i];
          const e = edges[(y - y0) * W + (x - x0)];
          if (e & 1)
            c = st.edge ?? F[nF - 1];
          else if (e & 2)
            c = st.under ?? F[0];
          else if (e & 4 && i < nF - 1)
            c = F[i + 1];
          if (shine !== undefined && shine !== null) {
            const d = Math.abs(x + 0.5 - (y + 0.5 - sy0) * 0.6 - shine);
            if (d < 1.1)
              c = WHITE;
            else if (d < 2.4)
              c = glint;
          }
          if (it.flash > 0.6 || it.flash > 0.25 && v < 0.5)
            c = WHITE;
          p.dot(x, y, c, it.a ?? 1);
          continue;
        }
        let n = 0;
        for (let dy = -ow;dy <= ow && !n; dy++)
          for (let dx = -ow;dx <= ow && !n; dx++)
            if (ow < 2 || Math.abs(dx) + Math.abs(dy) < 4)
              n = at(x + dx, y + dy);
        if (n) {
          p.dot(x, y, st.outline, items[n - 1].a ?? 1);
          continue;
        }
        const s = at(x - ow, y - 1 - ow) || at(x + 1 - ow, y - 1 - ow) || at(x - ow, y - ow);
        if (s && st.shadow)
          p.dot(x, y, st.shadow, (items[s - 1].a ?? 1) * 0.9);
      }
  }
  function tintActor(p, A, k, ramp) {
    if (!A || k <= 0.12)
      return;
    const { mask: m, pixels: pix } = A, cut = k > 0.6 ? 0 : k > 0.3 ? 0.22 : 0.5;
    for (let j = 0;j < m.h; j++)
      for (let i = 0;i < m.w; i++) {
        const q = j * m.w + i;
        if (!m.data[q])
          continue;
        const l = pix ? luma(pix[q]) : 0.6;
        if (l < cut)
          continue;
        p.px(A.x + i, A.y + j, l > 0.5 ? k > 0.8 ? WHITE : ramp[2] : l > 0.22 ? ramp[1] : ramp[0]);
      }
  }
  function lightActor(p, A, c, k, rim = 0, t = 0) {
    if (!A || k <= 0.01 && rim <= 0.01)
      return;
    const { mask: m, pixels: pix } = A, has = (i, j) => i >= 0 && j >= 0 && i < m.w && j < m.h && m.data[j * m.w + i];
    for (let j = 0;j < m.h; j++)
      for (let i = 0;i < m.w; i++) {
        if (!m.data[j * m.w + i])
          continue;
        if (k > 0.01)
          p.light(A.x + i, A.y + j, c, k * (1.1 - 0.5 * j / m.h));
        if (rim <= 0.01 || !has(i - 1, j) || !has(i + 1, j) || !has(i, j - 1))
          continue;
        if (has(i - 2, j) && has(i + 2, j) && has(i, j - 2))
          continue;
        const f = rim * (0.75 + 0.35 * noise(j * 0.6 - t * 8, i * 3));
        if (f > 0.25)
          p.px(A.x + i, A.y + j, mix(pix ? pix[j * m.w + i] || c : c, c, Math.min(0.85, f)));
      }
  }
  function haloActor(p, A, c, k, t = 0) {
    if (!A || k <= 0.02)
      return;
    p.outline(A.mask, A.x, A.y, c, (mx, my) => k * (0.75 + 0.45 * noise(my * 0.45 - t * 7, mx * 3)));
  }
  function panel(p, x, y, w, h, col, { r = 3, a = 1, shine = null } = {}) {
    if (w < 2 || h < 2)
      return;
    const X1 = x + w, Y1 = y + h;
    p.shade(x, y, X1, Y1, (px, py, o) => {
      const cx = Math.max(x + r - px, 0, px - (X1 - r)), cy = Math.max(y + r - py, 0, py - (Y1 - r));
      const e = cx > 0 && cy > 0 ? r - Math.hypot(cx, cy) : Math.min(px - x, X1 - px, py - y, Y1 - py);
      if (e < 0)
        return;
      o.a = a;
      if (e < 1)
        return col.outline;
      if (py - y < 2)
        return col.rim;
      if (Y1 - py < 2)
        return col.low;
      if (shine !== null) {
        const d = Math.abs(px - (py - y) * 0.6 - shine);
        if (d < 1.3)
          return WHITE;
        if (d < 3)
          return col.rim;
      }
      return py - y < h * 0.45 ? col.top : col.body;
    });
  }
  function shake2(t, amp, t0 = 0, len = 0.3, seed = 1, hz = 32) {
    if (t < t0 || t > t0 + len)
      return [0, 0];
    const k = 1 - (t - t0) / len;
    return [Math.round(noise(t * hz, seed) * amp * k * 1.7), Math.round(noise(t * hz, seed + 7) * amp * k * 1.3)];
  }

  // ../vendor_src/pixelfx/src/fx/ui/level-up.js
  var meta26 = {
    name: "Level up",
    desc: "Gold gathers at the feet and bursts up as a pillar of light round the hero; rings climb it, LEVEL UP! drops in letter by letter, a shine sweeps it, sparkles twinkle.",
    tags: ["ui", "level", "reward", "text", "light", "one-shot"],
    size: [176, 138],
    origin: [88, 114],
    duration: 3.2,
    loop: false,
    fps: 30,
    bg: "ground",
    actor: 2,
    options: { palette: ["#2a1405", "#5c3008", "#9a5a0e", "#d48e18", "#f5b92c", "#ffde5e", "#fff4bc", "#ffffff"], text: "LEVEL UP!", seed: 5 }
  };
  var COIL = { turn: 0.9, crouch: 7, lean: 2, fx: -6, fy: -13, bx: 7, by: -13, ffx: -5, fbx: 6 };
  var LEAP = { turn: 1.1, y: -16, crouch: -1, fx: -6, fy: -45, bx: 7, by: -44, ffx: -2, ffy: -8, fbx: 5, fby: -3, toeB: true };
  var PUMP = { turn: 0.9, crouch: 0, fx: -6, fy: -45, bx: 9, by: -15, ffx: -3, fbx: 4 };
  var act14 = {
    onBody: true,
    follow: 0,
    poses: [
      [-0.3, READY],
      [0.28, COIL],
      [0.3, LEAP, "snap"],
      [0.46, { ...LEAP, y: -19 }],
      [0.72, { ...LEAP, y: 0, ffy: -4, fby: -4 }, "in"],
      [0.74, { ...COIL, crouch: 5 }, "snap"],
      [0.95, PUMP, "out"],
      [1.2, { ...PUMP, crouch: 1, fy: -43 }],
      [1.45, PUMP],
      [2.3, { ...PUMP, fy: -41 }],
      [2.8, READY],
      [3.2, READY]
    ],
    hits: [{ t: 0.28, stop: 0.05, shake: 0.14, amp: 2 }],
    dust: [{ t: 0.3, x: 0, n: 7 }, { t: 0.74, x: 0, n: 6 }]
  };
  var REL2 = 0.28;
  var RET = 1.02;
  var GONE4 = 1.34;
  var TOP3 = 100;
  var TY = -68;
  var DROP2 = 0.5;
  var STAG = 0.05;
  var LANDED = 1.06;
  var SHINE = 1.24;
  var EXIT = 2.3;
  var STRANDS = Array.from({ length: 9 }, (_, i) => ({ x: (i / 8 - 0.5) * 1.5 + (rand(i, 1) - 0.5) * 0.16, sp: 170 + rand(i, 2) * 170, per: 10 + rand(i, 3) * 16, duty: 0.3 + rand(i, 4) * 0.35, ph: rand(i, 5), lvl: rand(i, 6) < 0.35 ? 1 : 2, end: 0.5 + rand(i, 7) * 0.42 }));
  var widthAt = (t) => t < REL2 ? 0 : 12 * (1 + 0.4 * Math.exp(-(t - REL2) * 10)) * (1 - 0.82 * smooth(RET - 0.12, RET + 0.16, t));
  function column(p, C, t) {
    const a = t - REL2;
    if (a < 0 || t > GONE4)
      return;
    const top = -TOP3 * ease.outExpo(clamp(a / 0.12)), bot = -TOP3 * ease.inCubic(seg(t, RET, GONE4)), W = widthAt(t), k = 1 - smooth(RET, GONE4, t);
    p.glowLine(0, top, 0, Math.min(bot, -34), W * 1.6 + 6, C[5], 0.2 * k + 0.06);
    p.glowLine(0, top, 0, Math.min(bot, -40), 5, WHITE, 0.18 * k);
    if (a < 0.04) {
      for (let y = Math.floor(top);y < bot; y++) {
        const wr = W * 0.55 * (1 - 0.3 * (-y / TOP3));
        for (let x = Math.floor(-wr);x <= Math.ceil(wr); x++)
          p.dot(x, y, Math.abs(x + 0.5) < wr - 1.5 ? WHITE : C[6], clamp((y + TOP3) / 20) * 1.5);
      }
      return;
    }
    for (let y = Math.ceil(top);y < Math.ceil(bot); y++) {
      const h = -y / TOP3, fade = clamp((y + TOP3) / 16) * (t < RET ? 1 : clamp((bot - y) / 10)), head = y - top < 3 && a < 0.16;
      const wr = W * (1 - 0.3 * h) + 0.9 * noise2(y * 0.2, t * 12, 3);
      for (const s of [-1, 1]) {
        const run = fract(y * 0.06 + t * 3.4 + (s > 0 ? 0.5 : 0)) < 0.78, xw = s * wr;
        p.dot(xw, y, head ? WHITE : run ? C[6] : C[5], fade * 1.4);
        p.dot(xw + s, y, C[4], fade * (run ? 0.5 : 0.25));
        if (run)
          p.dot(xw - s, y, C[5], fade * 1.2);
      }
      p.dot(0, y, WHITE, fade * 1.6);
      p.dot(-1, y, noise2(y * 0.3, t * 14, 5) > -0.2 ? WHITE : C[6], fade * 1.3);
      if (noise2(y * 0.25, t * 9, 8) > 0.25)
        p.dot(1, y, C[6], fade * 1.2);
      for (const S of STRANDS) {
        if (h > S.end)
          continue;
        const ph = fract((y + t * S.sp) / S.per + S.ph);
        if (ph > S.duty)
          continue;
        const u = ph / S.duty;
        p.px(S.x * wr, y, head || u < 0.2 ? WHITE : u < 0.65 ? C[7 - S.lvl] : C[6 - S.lvl]);
      }
    }
  }
  function plate(p, C, t, k) {
    if (k <= 0.02)
      return;
    const rx = 9 + 9 * k + Math.sin(t * 9), ry = 2.2;
    p.shade(-rx, -ry, rx, ry, (x, y, o) => {
      const dx = x / rx, dy = y / ry, d = Math.sqrt(dx * dx + dy * dy);
      if (d > 1)
        return;
      const u = d / Math.max(0.05, k);
      o.c = u < 0.3 ? WHITE : u < 0.55 ? C[6] : u < 0.8 ? C[5] : C[4];
      o.a = d < 0.6 * k ? 1 : k * (1 - d) * 2.2;
    });
    p.glow(0, -1, rx * 2.2, C[4], 0.35 * k);
  }
  function rays(p, C, t, k, cx, cy) {
    if (k <= 0.02)
      return;
    for (let i = 0;i < 20; i++) {
      const an = i / 20 * TAU + 0.08, ca = Math.cos(an), sa = Math.sin(an), long = i % 2 === 0;
      if (Math.abs(sa) < 0.4)
        continue;
      const r0 = 1 / Math.sqrt((ca / 52) ** 2 + (sa / 12) ** 2) + 2 * k, len = (long ? 15 + 7 * rand(i, 9) : 7 + 4 * rand(i, 8)) * k;
      if (len < 1)
        continue;
      const sh = 0.75 + 0.25 * Math.sin(t * 7 + i * 2.1), x0 = cx + ca * r0, y0 = cy + sa * r0;
      p.line(x0, y0, x0 + ca * len, y0 + sa * len, (u) => u < 0.3 ? C[7] : u < 0.6 ? C[6] : C[5], (u) => sh * (u < 0.55 ? 1.3 : 1.3 * (1 - u) / 0.45));
    }
  }
  function create19(o) {
    const C = fit(o.palette, 8), R = new Rng(o.seed), A = o.actor, SHADOW = scale(C[0], 0.5);
    const ps = new Particles({ rng: R, ground: () => 0, sparks: [C[7], C[6], C[5], C[3]] }), lights = new Lights;
    const spawn = (k, x, y, vx, vy, life, ...rest) => ps.spawn(k, x, y, vx, vy, Math.min(life, meta26.duration - 0.05 - t), ...rest);
    const word = spell(o.text), BASE = TY + 14, X0 = -word.w;
    const lets = word.letters.filter((L) => L.g).map((L, i) => ({ g: L.g, w: L.w, cx: X0 + (L.x + L.w / 2) * 2, born: DROP2 + i * STAG, pop: EXIT + i * 0.04, off: -18, v: 60, sq: 0, flash: 0, on: false, landed: false, rest: false, burst: false }));
    const right = X0 + word.w * 2;
    const sats = Array.from({ length: 8 }, (_, i) => {
      const s = i % 2 ? 1 : -1, x = s * R.range(20, 60), y = TY + 7 + (Math.abs(x) < 50 ? R.sign() * R.range(11, 18) : R.range(-14, 14));
      return { x, y, t0: SHINE - 0.1 + i * 0.13 + R.range(0, 0.05), dur: R.range(0.32, 0.5), L: R.range(3, 6) };
    });
    const halos = [];
    let t = 0, released = false, nextHalo = REL2 + 0.03, gather = 0;
    const rush = [];
    const drawRush = (p, back) => {
      for (const m of rush) {
        if (m.back !== back)
          continue;
        const sp = Math.hypot(m.vx, m.vy), ux = m.vx / sp, uy = m.vy / sp, L = m.len;
        p.line(m.x - ux * L, m.y - uy * L, m.x - ux * L * 0.4, m.y - uy * L * 0.4, m.c);
        p.line(m.x - ux * L * 0.35, m.y - uy * L * 0.35, m.x, m.y, WHITE);
        p.glow(m.x, m.y, 4, C[5], 0.25);
      }
    };
    return {
      update(dt) {
        t += dt;
        for (gather += t < REL2 ? dt * 420 : 0;gather >= 1; gather--) {
          const kind = R.next(), sp = R.range(140, 250) * (1 + t * 2);
          let x, y, tx, ty;
          if (kind < 0.42) {
            const an = R.range(0, TAU), D = R.range(22, 70);
            x = Math.cos(an) * D, y = -1 - Math.abs(Math.sin(an)) * D * 0.1, tx = Math.cos(an) * 3, ty = -1;
          } else if (kind < 0.84) {
            const an = R.range(0, TAU), D = R.range(34, 64);
            x = Math.cos(an) * D, y = Math.min(-3, -20 + Math.sin(an) * D * 0.85), tx = Math.cos(an) * 11, ty = -20 + Math.sin(an) * 14;
          } else {
            if (t < REL2 * 0.4)
              continue;
            x = R.range(-9, 9), y = -1, tx = x * 0.7, ty = -R.range(26, 44);
          }
          const dx = tx - x, dy = ty - y, l = Math.hypot(dx, dy) || 1;
          rush.push({ x, y, vx: dx / l * sp, vy: dy / l * sp, life: Math.min(l / sp, REL2 + 0.06 - t), len: R.range(5, 9), c: R.chance(0.45) ? C[6] : C[5], back: kind > 0.84 && R.chance(0.5) });
        }
        for (let i = rush.length - 1;i >= 0; i--) {
          const m = rush[i];
          if ((m.life -= dt) <= 0)
            rush.splice(i, 1);
          else
            m.x += m.vx * dt, m.y += m.vy * dt;
        }
        if (t < REL2 && R.chance(0.12))
          spawn(P.STAR, R.range(-30, 30), -R.range(0, 3), 0, -R.range(10, 30), R.range(0.3, 0.5), C[6], 0.6);
        if (!released && t >= REL2) {
          released = true;
          lights.add(0, -24, 90, C[5], 0.6, 0.7);
          lights.add(0, -8, 40, WHITE, 0.6, 0.12);
          for (let i = 0;i < 22; i++) {
            const an = i / 22 * TAU + R.range(-0.12, 0.12), sp = R.range(260, 460);
            const y0 = -18 + Math.sin(an) * 8, vy = Math.sin(an) * sp * 0.8, life = Math.min(R.range(0.1, 0.2), vy > 0 ? -y0 / vy : vy < 0 ? (y0 + 104) / -vy : 1, 78 / Math.abs(Math.cos(an) * sp));
            spawn(P.MOTE, Math.cos(an) * 6, y0, Math.cos(an) * sp, vy, life, R.chance(0.4) ? C[7] : C[6], 1, 0, an > 0.3 && an < Math.PI - 0.3 ? PF.BACK : 0);
          }
          for (let i = 0;i < 26; i++) {
            const an = -Math.PI / 2 + R.range(-1.3, 1.3), sp = R.range(120, 290);
            spawn(P.SPARK, R.range(-5, 5), -2, Math.cos(an) * sp, Math.sin(an) * sp, R.range(0.35, 0.8));
          }
          for (let i = 0;i < 16; i++)
            spawn(P.STAR, R.range(-10, 10), R.range(-36, -4), R.range(-30, 30), -R.range(15, 60), R.range(0.6, 1.3), R.pick([C[7], C[6], C[5]]), R.chance(0.35) ? R.range(1.5, 2.6) : R.range(0.4, 0.9), 0, R.chance(0.4) ? PF.BACK : 0);
        }
        const W = widthAt(t);
        if (t >= nextHalo && t < RET - 0.1)
          halos.push(t), nextHalo += 0.16;
        if (t > REL2 && t < RET + 0.1 && R.chance(0.5)) {
          const s = R.sign();
          const y = R.range(-4, -60), vy = -R.range(140, 260);
          spawn(P.MOTE, s * R.range(0.75, 1.6) * W, y, 0, vy, Math.min(R.range(0.16, 0.32), (y + 96) / -vy), R.chance(0.5) ? C[7] : C[6], R.range(0.6, 1), 0, R.chance(0.5) ? PF.BACK : 0);
        }
        if (t > REL2 && t < 2.4 && R.chance(0.14 * (1 - seg(t, 1.6, 2.4)))) {
          spawn(P.EMBER, R.range(-20, 20), -R.range(1, 30), R.range(-15, 15), -R.range(20, 55), R.range(0.8, 1.6), C[5], R.range(1, 2), 0, R.chance(0.4) ? PF.BACK : 0);
        }
        if (A && t > REL2 + 0.1 && t < 2.2 && R.chance(0.09)) {
          const m = A.mask;
          for (let n = 0;n < 12; n++) {
            const i = R.int(0, m.w - 1), j = R.int(0, m.h - 1);
            if (!m.data[j * m.w + i])
              continue;
            spawn(P.STAR, A.x + i + 0.5, A.y + j + 0.5, R.range(-8, 8), -R.range(14, 34), R.range(0.6, 1.1), R.pick([C[7], C[6], C[5]]), R.chance(0.2) ? 1.5 : 0.6, 0, R.chance(0.5) ? PF.BACK : 0);
            break;
          }
        }
        if (t > 1 && t < 2.5 && R.chance(0.13)) {
          const up = R.chance(0.6), x = up ? R.range(-58, 58) : R.range(-20, 20), y = up ? TY + 7 + R.range(-16, 16) : R.range(-44, -6);
          spawn(P.STAR, x, y, R.range(-6, 6), -R.range(4, 14), R.range(0.4, 0.8), R.pick([C[7], C[6], C[6], C[5]]), R.chance(0.3) ? R.range(1.5, 2.4) : 0.6, 0, R.chance(0.3) ? PF.BACK : 0);
        }
        for (const L of lets) {
          if (t < L.born)
            continue;
          L.on = true;
          if (!L.rest) {
            L.v += 1700 * dt;
            L.off += L.v * dt;
            if (L.off >= 0 && L.v > 0) {
              L.off = 0;
              if (L.v > 110) {
                L.sq = 1;
                if (!L.landed) {
                  L.landed = true;
                  L.flash = 1;
                  lights.add(L.cx, BASE - 7, 18, C[5], 0.55, 0.25);
                  for (const s of [-1, 1])
                    spawn(P.STAR, L.cx + s * L.w, BASE - R.range(0, 3), s * R.range(15, 40), -R.range(5, 25), R.range(0.25, 0.45), C[6], R.range(0.5, 1.2));
                }
                L.v = -L.v * 0.3;
              } else
                L.v = 0, L.rest = true;
            }
          }
          L.sq = Math.max(0, L.sq - dt / 0.1);
          L.flash = Math.max(0, L.flash - dt / 0.12);
          if (!L.burst && t >= L.pop + 0.06) {
            L.burst = true;
            for (let i = 0;i < 3; i++) {
              const an = R.range(0, TAU), sp = R.range(20, 55);
              spawn(P.STAR, L.cx + R.range(-3, 3), BASE - 7 + R.range(-4, 4), Math.cos(an) * sp, Math.sin(an) * sp - 15, R.range(0.3, 0.6), R.pick([C[7], C[6]]), i ? 0.6 : R.range(1.2, 2));
            }
          }
        }
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        rays(p, C, t, ease.outExpo(seg(t, LANDED, LANDED + 0.2)) * (1 - ease.inQuad(seg(t, EXIT - 0.15, EXIT + 0.1))), 0, TY + 7);
        if (t < REL2) {
          const k = seg(t, 0.02, REL2);
          band(p, 0, 0, 4 + 52 * (1 - ease.inQuad(k)), 0.2, 1.5, k * 1.1, C, (g) => Math.sin(g) < 0);
        }
        for (const [d, r1, th] of [[0, 72, 4], [0.08, 46, 2.5]]) {
          const k = (t - REL2 - d) / 0.55;
          if (k > 0 && k < 1)
            band(p, 0, 0, 5 + r1 * ease.outCubic(k), 0.2, Math.max(1, th * (1 - k)), 1.15 - k, C, (g) => Math.sin(g) < 0, k < 0.15);
        }
        for (const h0 of halos) {
          const k = (t - h0) / 0.6;
          if (k > 0 && k < 1)
            band(p, 0, -2 - 72 * ease.outQuad(k), (widthAt(t) * 1.45 + 4) * (1 - 0.4 * k), 0.3, 1.5, (1 - k) * 1.4, C, (g) => Math.sin(g) < 0, k < 0.12);
        }
        column(p, C, t);
        plate(p, C, t, t < REL2 ? 0.55 * seg(t, 0.05, REL2) : 1 - smooth(RET - 0.1, GONE4 + 0.2, t));
        ps.draw(p, "back");
        drawRush(p, true);
      },
      draw(p) {
        if (t < REL2) {
          const k = seg(t, 0.02, REL2);
          band(p, 0, 0, 4 + 52 * (1 - ease.inQuad(k)), 0.2, 1.5, k * 1.1, C, (g) => Math.sin(g) >= 0);
        }
        for (const [d, r1, th] of [[0, 72, 4], [0.08, 46, 2.5]]) {
          const k = (t - REL2 - d) / 0.55;
          if (k > 0 && k < 1)
            band(p, 0, 0, 5 + r1 * ease.outCubic(k), 0.2, Math.max(1, th * (1 - k)), 1.15 - k, C, (g) => Math.sin(g) >= 0, k < 0.15);
        }
        for (const h0 of halos) {
          const k = (t - h0) / 0.6;
          if (k > 0 && k < 1)
            band(p, 0, -2 - 72 * ease.outQuad(k), (widthAt(t) * 1.45 + 4) * (1 - 0.4 * k), 0.3, 1.5, (1 - k) * 1.4, C, (g) => Math.sin(g) >= 0, k < 0.12);
        }
        const lit = smooth(REL2 - 0.02, REL2 + 0.04, t) * (1 - smooth(RET, 2.5, t));
        tintActor(p, A, t < REL2 ? 0 : t < REL2 + 0.06 ? 1 : Math.exp(-(t - REL2 - 0.06) / 0.07), [C[4], C[5], C[6]]);
        lightActor(p, A, C[5], 0.1 * seg(t, 0.05, REL2) * (1 - lit) + 0.06 * lit, 0.6 * lit, t);
        haloActor(p, A, C[5], 0.85 * lit * (1 - smooth(RET, GONE4 + 0.3, t)) + 0.3 * lit, t);
        if (t < REL2) {
          const k = seg(t, 0.05, REL2), beat = 1 + 0.4 * Math.exp(-((t - REL2 * 0.6) ** 2) / 0.001);
          sparkle(p, 0, -2, (1 + 4 * k * k) * beat, C[6], C[5], 0.3 + 0.4 * k);
        } else if (t < REL2 + 0.22) {
          const a = (t - REL2) / 0.22;
          flare(p, 0, -4, 28 * Math.pow(1 - a, 1.5), 1 - a, C);
          p.glow(0, -16, 48, WHITE, 0.3 * (1 - a));
        }
        ps.draw(p, "front");
        drawRush(p, false);
        const items = [], done = (t - LANDED) / 0.12;
        for (const L of lets) {
          if (!L.on)
            continue;
          let sx = 2, sy = 2, flash = L.flash;
          if (!L.landed && L.v > 150)
            sx = 1.8, sy = 2.3;
          if (L.sq > 0)
            sx = 2 * (1 + 0.22 * L.sq), sy = 2 * (1 - 0.22 * L.sq);
          const pu = (t - L.pop) / 0.07, hop = seg(t, L.pop - 0.1, L.pop);
          if (pu >= 1)
            continue;
          if (hop > 0 && pu <= 0)
            sx = 2 * (1 - 0.1 * hop), sy = 2 * (1 + 0.15 * hop);
          if (pu > 0)
            sx = sy = 2 * (1 + 0.3 * pu), flash = 1;
          flash = Math.max(flash, done > 0 && done < 1 ? 1 - done : 0);
          const h = 7 * sy, w = L.w * sx;
          items.push({ g: L.g, x: L.cx - w / 2, y: BASE + L.off - h - 3 * ease.outQuad(hop), sx, sy, a: clamp((t - L.born) / 0.05), flash });
        }
        const sh = seg(t, SHINE, SHINE + 0.34), shine = sh > 0 && sh < 1 ? X0 - 14 + (right - X0 + 30) * ease.inOutSine(sh) : null;
        drawWord(p, items, { fill: [C[3], C[4], C[5], C[6]], edge: WHITE, under: C[2], outline: C[0], shadow: SHADOW, shine, shineY: TY, glint: C[6] });
        if (shine !== null && shine > X0 && shine < right)
          p.glowLine(shine, TY, shine + 8.4, BASE, 9, C[6], 0.3);
        const hold = smooth(0.9, 1.2, t) * (1 - smooth(EXIT, EXIT + 0.4, t));
        if (hold > 0)
          p.glow(0, TY + 7, 50, C[5], 0.22 * hold + (done > 0 && done < 1 ? 0.3 * (1 - done) : 0));
        for (const L of lets) {
          const u = (t - L.pop - 0.07) / 0.16;
          if (u > 0 && u < 1)
            sparkle(p, L.cx, BASE - 7, 6 * (1 - u) * (1 - u), C[6], C[5], 0.5);
        }
        const g = (t - SHINE - 0.3) / 0.26;
        if (g > 0 && g < 1)
          sparkle(p, right - 2, TY + 1, 7 * Math.sin(g * Math.PI), C[6], C[5], 0.6);
        for (const s of sats) {
          const u = (t - s.t0) / s.dur;
          if (u > 0 && u < 1)
            sparkle(p, s.x, s.y, s.L * Math.pow(Math.sin(u * Math.PI), 0.7), C[6], C[5], 0.5);
        }
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/ui/achievement.js
  var meta27 = {
    name: "Achievement",
    desc: "A toast slides in on speed lines and settles; a gold medal pops onto it in a burst of sparkles, a shine sweeps the whole toast, then it slides away.",
    tags: ["ui", "achievement", "toast", "medal", "reward", "text", "one-shot"],
    size: [220, 72],
    origin: [110, 36],
    duration: 2.4,
    loop: false,
    fps: 30,
    bg: "dark",
    options: {
      palette: ["#2a1405", "#5c3008", "#9a5a0e", "#d48e18", "#f5b92c", "#ffde5e", "#fff4bc", "#ffffff"],
      ribbon: ["#0c1430", "#1f3a7a", "#2f66c4", "#5aa0f0", "#a6d4ff"],
      title: "ACHIEVEMENT",
      text: "UNLOCKED",
      seed: 9
    }
  };
  var PW = 130;
  var PH = 34;
  var PX = -PW / 2;
  var PY = -PH / 2;
  var IN = 0.2;
  var MEDAL = 0.26;
  var SHINE2 = 0.95;
  var OUT3 = 1.92;
  var MX = PX + 17;
  var MY = 2;
  var INK5 = { outline: hex("#0d0a14"), rim: hex("#5a4f74"), top: hex("#2a2338"), body: hex("#211b2d"), low: hex("#15111c") };
  function medal(p, G, B, x, y, s, white, shine) {
    const r = 10 * s;
    for (const sd of [-1, 1]) {
      p.poly([[x + sd * 2 * s, y - r + 2], [x + sd * 7 * s, y - r + 2], [x + sd * 9 * s, PY + 1], [x + sd * 4 * s, PY + 1]], (px) => Math.abs(px - x) < 4.5 * s ? B[2] : B[3]);
      p.line(x + sd * 2 * s, y - r + 2, x + sd * 4 * s, PY + 1, B[0]);
      p.line(x + sd * 7 * s, y - r + 2, x + sd * 9 * s, PY + 1, B[0]);
    }
    const st = star(x, y + 0.5, 2.8 * s, 6.5 * s, 5);
    const inStar = (px, py) => {
      let inside = false;
      for (let i = 0, j = st.length - 1;i < st.length; j = i++) {
        const [xi, yi] = st[i], [xj, yj] = st[j];
        if (yi > py !== yj > py && px < (xj - xi) * (py - yi) / (yj - yi) + xi)
          inside = !inside;
      }
      return inside;
    };
    p.shade(x - r - 1, y - r - 1, x + r + 1, y + r + 1, (px, py) => {
      const dx = px - x, dy = py - y, d = Math.hypot(dx, dy);
      if (d > r)
        return;
      if (white)
        return r - d < 1 ? G[6] : WHITE;
      if (r - d < 1)
        return G[0];
      const l = -(dx * 0.6 + dy * 0.8) / r;
      if (shine !== null && Math.abs(dx - dy * 0.6 - shine) < 1.2)
        return WHITE;
      if (r - d < 2.5)
        return l > 0.2 ? G[6] : l > -0.3 ? G[4] : G[3];
      if (inStar(px, py))
        return !inStar(px + 1, py) || !inStar(px - 1, py) || !inStar(px, py + 1) || !inStar(px, py - 1) ? G[2] : dx + dy < 0 ? G[7] : G[6];
      return l > 0.4 ? G[5] : l > -0.2 ? G[4] : G[3];
    });
  }
  function create20(o) {
    const G = fit(o.palette, 8), B = fit(o.ribbon, 5), R = new Rng(o.seed);
    const ps = new Particles({ rng: R, sparks: [G[7], G[6], G[5], G[3]] }), lights = new Lights;
    const title = spell(o.title, "mini"), sub = spell(o.text, "mini"), TX = PX + 34;
    let t = 0, popped = false;
    const end = meta27.duration - 0.05;
    const xAt = (t) => t < IN ? 30 * Math.pow(1 - t / IN, 3) : t < OUT3 ? -3 * Math.exp(-(t - IN) * 12) * Math.sin((t - IN) * 30) : seg(t, OUT3, OUT3 + 0.06) < 1 ? -3 * seg(t, OUT3, OUT3 + 0.06) : -3 + 33 * ease.inQuad(seg(t, OUT3 + 0.06, OUT3 + 0.24));
    return {
      update(dt) {
        t += dt;
        if (!popped && t >= MEDAL + 0.06) {
          popped = true;
          lights.add(MX, MY, 36, G[5], 0.7, 0.4);
          for (let i = 0;i < 12; i++) {
            const an = i / 12 * TAU + R.range(-0.2, 0.2), sp = R.range(40, 90);
            ps.spawn(P.STAR, MX + Math.cos(an) * 9, MY + Math.sin(an) * 9, Math.cos(an) * sp, Math.sin(an) * sp * 0.6, R.range(0.25, 0.45), R.pick([G[7], G[6], G[5]]), i % 3 ? 0.6 : R.range(1.2, 1.8));
          }
        }
        if (t > 0.5 && t < OUT3 && R.chance(0.05))
          ps.spawn(P.STAR, MX + R.range(-11, 11), MY + R.range(-11, 9), 0, -R.range(4, 10), Math.min(R.range(0.3, 0.5), end - t), G[6], R.chance(0.3) ? 1.4 : 0.6);
        ps.update(dt);
        lights.update(dt);
      },
      draw(p) {
        const x = xAt(t), out = t > OUT3 + 0.06, a = t < 0.05 ? 0.5 : out ? 1 - seg(t, OUT3 + 0.12, OUT3 + 0.24) : 1;
        if (a <= 0)
          return;
        const moving = t < IN * 0.8 || out;
        if (moving)
          for (let i = 0;i < 8; i++) {
            const y = PY + 3 + rand(Math.floor(t * 30), i, 1) * (PH - 6), L = 10 + rand(Math.floor(t * 30), i, 2) * 26, x0 = x + PW / 2 + 2 + rand(i, 3) * 6;
            p.line(x0, y, Math.min(106, x0 + L), y, (u) => u < 0.3 ? WHITE : u < 0.6 ? G[6] : G[4], (u) => a * (1.1 - u));
          }
        const sh = seg(t, SHINE2, SHINE2 + 0.36), shine = sh > 0 && sh < 1 ? PX - 12 + (PW + 30) * ease.inOutSine(sh) : null;
        panel(p, PX + x, PY, PW, PH, INK5, { r: 4, a, shine: shine === null ? null : shine + x });
        p.line(PX + x + 4, PY + 1, PX + x + PW - 5, PY + 1, G[4], a);
        p.px(PX + x + 3, PY + 1, G[2]);
        const ti = title.letters.filter((L) => L.g).map((L) => ({ g: L.g, x: TX + x + L.x * 2, y: PY + 5, sx: 2, sy: 2, a }));
        drawWord(p, ti, { fill: [G[4], G[5], G[6]], edge: G[7], under: G[3], outline: INK5.outline, shadow: 0, shine: shine === null ? null : shine + x, shineY: PY, glint: G[7] });
        const si = sub.letters.filter((L) => L.g).map((L) => ({ g: L.g, x: TX + x + L.x * 2, y: PY + 19, sx: 2, sy: 2, a }));
        drawWord(p, si, { fill: [hex("#9a94b0"), hex("#d8d4e6"), WHITE], edge: WHITE, under: hex("#6e6886"), outline: INK5.outline, shadow: 0, shine: shine === null ? null : shine + x, shineY: PY });
        const mk = t - MEDAL;
        if (mk > 0) {
          const s = mk < 0.035 ? 1.5 : 1 + 0.35 * Math.exp(-mk * 16) * Math.cos(mk * 28);
          medal(p, G, B, MX + x, MY, s, mk < 0.07, shine === null ? null : shine - MX + 4);
          p.glow(MX + x, MY, 20, G[5], 0.3 * a + (mk < 0.15 ? 0.5 * (1 - mk / 0.15) : 0));
          const g = (t - 1.5) % 0.9 / 0.9;
          if (t > 1.5 && g < 0.25)
            sparkle(p, MX + x - 4, MY - 4, 4 * Math.sin(g / 0.25 * Math.PI), G[7], G[6], 0.5);
        }
        ps.draw(p);
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/ui/quest-complete.js
  var meta28 = {
    name: "Quest complete",
    desc: "A stitched ribbon unrolls from the middle, QUEST COMPLETE types on letter by letter, a gold seal stamps down and ticks, stars pop; then it all rolls away.",
    tags: ["ui", "quest", "banner", "reward", "text", "one-shot"],
    size: [204, 92],
    origin: [102, 46],
    duration: 2.6,
    loop: false,
    fps: 30,
    bg: "dark",
    options: {
      palette: ["#2a1405", "#5c3008", "#9a5a0e", "#d48e18", "#f5b92c", "#ffde5e", "#fff4bc", "#ffffff"],
      ribbon: ["#1e0608", "#45101a", "#7a1a26", "#ad2632", "#d8433f", "#f27a5e", "#ffb79a"],
      text: "QUEST COMPLETE",
      seed: 8
    }
  };
  var L = 66;
  var BH2 = 8;
  var OPEN = 0.32;
  var TYPE = 0.2;
  var STEP = 0.036;
  var STAMP = 0.95;
  var SX = 64;
  var SY2 = 4;
  var POPSEAL = 2;
  var ROLL = 2.08;
  function ribbon(p, Rb, G, l, tails, t) {
    if (l < 1)
      return;
    if (tails > 0.02)
      for (const s of [-1, 1]) {
        const drop = 6 * tails, x0 = s * (l - 8), x1 = s * (l + 16 * tails);
        p.shade(Math.min(x0, x1) - 1, -BH2 + drop - 1, Math.max(x0, x1) + 1, BH2 + drop + 1, (x, y) => {
          const u = (x - x0) / (x1 - x0), v = y - drop;
          if (u < 0 || u > 1 || Math.abs(v) > BH2)
            return;
          if (u > 1 - 0.3 * (BH2 - Math.abs(v)) / BH2)
            return;
          const e = Math.min(BH2 - Math.abs(v), (1 - u) * (x1 - x0) * s);
          if (e < 1 || u < 0.02)
            return Rb[0];
          return v < -BH2 + 2 ? Rb[3] : v < 0 ? Rb[2] : Rb[1];
        });
        p.tri(s * (l - 8), BH2, s * (l - 1), BH2, s * (l - 8), BH2 + drop, Rb[0]);
      }
    p.shade(-l - 1, -BH2 - 1, l + 1, BH2 + 1, (x, y) => {
      const ax = Math.abs(x), v = y;
      if (ax > l || Math.abs(v) > BH2)
        return;
      const e = Math.min(l - ax, BH2 - Math.abs(v));
      if (e < 1)
        return Rb[0];
      if (v < -BH2 + 2)
        return Rb[5];
      if (v > BH2 - 2)
        return Rb[1];
      if ((Math.abs(v + BH2 - 2.5) < 0.5 || Math.abs(v - BH2 + 3.5) < 0.5) && Math.floor(x + 0.5) % 3 !== 0 && ax < l - 3)
        return G[3];
      return v < -1 ? Rb[4] : Rb[3];
    });
    if (tails < 0.02)
      for (const s of [-1, 1]) {
        const x = s * l;
        p.rect(Math.round(x) - 2, -BH2 - 2, 4, BH2 * 2 + 4, Rb[0]);
        p.rect(Math.round(x) - 1, -BH2 - 1, 1, BH2 * 2 + 2, Rb[4]);
        p.rect(Math.round(x), -BH2 - 1, 1, BH2 * 2 + 2, Rb[2]);
        p.px(Math.round(x) - 1, -BH2 - 1, Rb[6]);
      }
  }
  function seal(p, G, x, y, r, sx, sy, white, k) {
    const M = r * 1.25 + 2;
    p.shade(x - M * sx, y - M * sy, x + M * sx, y + M * sy, (px, py) => {
      const dx = (px - x) / sx, dy = (py - y) / sy, d = Math.hypot(dx, dy), an = Math.atan2(dy, dx), edge = r * (1 + 0.09 * Math.cos(an * 14));
      if (d > edge)
        return;
      if (white)
        return edge - d < 1 ? G[5] : WHITE;
      if (edge - d < 1)
        return G[0];
      const l = -(dx * 0.6 + dy * 0.8) / r;
      if (edge - d < 3)
        return l > 0.3 ? G[6] : l > -0.3 ? G[5] : G[3];
      if (Math.abs(d - r * 0.66) < 0.5)
        return l > 0 ? G[3] : G[2];
      return l > 0.45 ? G[7] : l > 0.1 ? G[6] : l > -0.35 ? G[5] : G[4];
    });
    if (white || k <= 0)
      return;
    const pts = [[-5, 0], [-1.5, 3.5], [5.5, -4.5]].map(([a, b]) => [x + a * sx, y + b * sy]);
    const len1 = Math.hypot(pts[1][0] - pts[0][0], pts[1][1] - pts[0][1]), len2 = Math.hypot(pts[2][0] - pts[1][0], pts[2][1] - pts[1][1]);
    const done = k * (len1 + len2), segs = [[pts[0], pts[1], Math.min(1, done / len1)], [pts[1], pts[2], clamp((done - len1) / len2)]];
    for (const [w, c] of [[4.2, G[0]], [2.4, WHITE]])
      for (const [a, b, u] of segs)
        if (u > 0)
          p.beam(a[0], a[1], a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u, w, c);
  }
  function create21(o) {
    const G = fit(o.palette, 8), Rb = fit(o.ribbon, 7), R = new Rng(o.seed);
    const ps = new Particles({ rng: R, sparks: [G[7], G[6], G[5], G[3]] }), lights = new Lights;
    const word = spell(o.text, "mini"), TS = 2, TW = word.w * TS, TX = -TW / 2 - 4, TY = -5;
    const glyphs = word.letters.filter((Lt) => Lt.g);
    const sats = Array.from({ length: 7 }, (_, i) => ({ x: (i / 6 - 0.5) * 140 + R.range(-6, 6), y: (i % 2 ? 1 : -1) * R.range(15, 22), t0: STAMP + 0.12 + i * 0.12 + R.range(0, 0.04), dur: R.range(0.3, 0.45), L: R.range(3, 6) }));
    let t = 0, stamped = false, popped = false;
    const end = meta28.duration - 0.05;
    return {
      update(dt) {
        t += dt;
        if (!stamped && t >= STAMP) {
          stamped = true;
          lights.add(SX, SY2, 40, G[5], 0.7, 0.35);
          lights.add(SX, SY2, 18, WHITE, 0.7, 0.1);
          for (let i = 0;i < 12; i++) {
            const an = i / 12 * TAU + R.range(-0.2, 0.2), sp = R.range(40, 80) * (Math.cos(an) > 0 ? 0.6 : 1);
            ps.spawn(P.STAR, SX + Math.cos(an) * 11, SY2 + Math.sin(an) * 11, Math.cos(an) * sp, Math.sin(an) * sp * 0.7, R.range(0.25, 0.45), R.pick([G[7], G[6], G[5]]), i % 3 ? 0.6 : R.range(1.2, 1.8));
          }
        }
        if (t > STAMP && t < POPSEAL && R.chance(0.08))
          ps.spawn(P.STAR, R.range(-L, L), R.range(-BH2, BH2), R.range(-5, 5), -R.range(8, 20), Math.min(R.range(0.4, 0.8), end - t), R.pick([G[6], G[5]]), 0.6);
        if (!popped && t >= POPSEAL + 0.05) {
          popped = true;
          lights.add(SX, SY2, 30, G[6], 0.6, 0.2);
          for (let i = 0;i < 8; i++) {
            const an = R.range(0, TAU), sp = R.range(40, 90);
            ps.spawn(P.STAR, SX + Math.cos(an) * 6, SY2 + Math.sin(an) * 6, Math.cos(an) * sp, Math.sin(an) * sp, Math.min(R.range(0.25, 0.4), end - t), R.pick([G[7], G[6]]), i % 2 ? 0.6 : 1.5);
          }
        }
        ps.update(dt);
        lights.update(dt);
      },
      draw(p) {
        const [jx, jy] = shake2(t, 2, STAMP, 0.18, o.seed);
        const l = L * (t < ROLL ? ease.outCubic(seg(t, 0, OPEN)) : 1 - ease.inCubic(seg(t, ROLL, ROLL + 0.26)));
        const tails = seg(t, OPEN - 0.02, OPEN + 0.12) * (t < ROLL ? 1 : 0);
        const sh = seg(t, 1.2, 1.5), shine = sh > 0 && sh < 1 ? -L - 10 + (2 * L + 20) * sh : null;
        ribbon(p, Rb, G, l, ease.outBack(tails, 2), t);
        if (shine !== null)
          for (let y = -BH2 + 1;y < BH2; y++) {
            const x = shine + (y + BH2) * 0.6;
            if (Math.abs(x) < l - 2)
              p.px(x, y, Rb[6]), p.px(x + 1, y, Rb[5]);
          }
        const items = [];
        glyphs.forEach((Lt, i) => {
          const u = t - (TYPE + i * STEP), x = TX + Lt.x * TS + jx;
          if (u < 0 || Math.abs(x + Lt.w) > l - 3)
            return;
          const s = u < 0.035 ? 2.6 : TS;
          items.push({ g: Lt.g, x: x - (s - TS) * Lt.w / 2, y: TY + jy - (s - TS) * 5 / 2, sx: s, sy: s, flash: u < 0.07 ? 1 : 0 });
        });
        drawWord(p, items, { fill: [G[4], G[5], G[6], G[7]], edge: WHITE, under: G[3], outline: Rb[0], shadow: Rb[1] });
        const dk = seg(t, STAMP - 0.12, STAMP), pk = t - POPSEAL;
        if (dk > 0 && pk < 0.08) {
          const fall = 1 - ease.inQuad(dk), sq = Math.exp(-(t - STAMP) * 30) * (t >= STAMP ? 1 : 0);
          let s = 1 + 0.8 * fall, sx = s * (1 + 0.2 * sq), sy = s * (1 - 0.2 * sq);
          if (pk > 0)
            sx = sy = 1 + 0.3 * (pk / 0.08);
          const white = t >= STAMP && t < STAMP + 0.05 || pk > 0;
          if (dk < 1)
            p.ellipse(SX, SY2 + 12, 10 * (1 - 0.3 * fall), 2, Rb[0], 0.5 * dk);
          seal(p, G, SX + jx, SY2 - 14 * fall + jy, 11, sx, sy, white, seg(t, STAMP + 0.08, STAMP + 0.24));
          p.glow(SX, SY2, 22, G[5], 0.3 + (white ? 0.4 : 0));
        }
        const rk = (t - STAMP) / 0.3;
        const rr = 12 + 13 * ease.outCubic(rk);
        if (rk > 0 && rk < 1)
          p.ellipse(SX, SY2, rr * 1.15, rr, rk < 0.3 ? WHITE : G[5], (d) => d > 1 - 1.4 / rr ? 1.2 - rk : 0);
        for (const s of sats) {
          const u = (t - s.t0) / s.dur;
          if (u > 0 && u < 1)
            sparkle(p, s.x, s.y, s.L * Math.pow(Math.sin(u * Math.PI), 0.7), G[6], G[5], 0.5);
        }
        ps.draw(p);
        p.glow(0, 0, 76, G[4], 0.2 * seg(t, 0.2, 0.5) * (1 - seg(t, ROLL, ROLL + 0.2)));
        lights.draw(p);
      }
    };
  }

  // ../vendor_src/pixelfx/src/fx/explosions/firework-burst.js
  var meta29 = {
    name: "Firework burst",
    desc: "A shell climbs, slows and bursts into a sphere of coloured trailing stars round a gold core; they droop, crackle into white pops and fade, leaving glitter.",
    tags: ["firework", "celebration", "sparkle", "sky", "burst", "one-shot"],
    size: [240, 248],
    origin: [120, 100],
    duration: 3.6,
    loop: false,
    fps: 30,
    bg: "sky",
    options: {
      palette: ["#3d0a33", "#701560", "#b0228f", "#f53cd1", "#ff86e6", "#ffd2f6", "#ffffff"],
      core: ["#4a2c08", "#86520c", "#c48412", "#f0b424", "#ffe066", "#fff6c4", "#ffffff"],
      seed: 9
    }
  };
  var RISE = 0.42;
  var Y02 = 72;
  var DRAG = 2.6;
  var G2 = 88;
  var TRAIL = 0.34;
  var TURN = 0.22;
  function create22(o) {
    const C = fit(o.palette, 7), K = fit(o.core, 7), R = new Rng(o.seed);
    const ps = new Particles({ rng: R, sparks: [K[6], K[5], K[4], K[3]] }), lights = new Lights;
    const stars = [], pops = [];
    let t = 0, burst = false;
    const shell = (n, speed, ramp, life, first) => {
      for (let i = 0;i < n; i++) {
        const z = R.range(-1, 1), a = R.range(0, TAU), s = Math.sqrt(1 - z * z), v = speed * R.range(0.93, 1.05);
        stars.push({ x: 0, y: 0, vx: Math.cos(a) * s * v, vy: Math.sin(a) * s * v, life: R.range(life[0], life[1]), age: 0, ramp, first, big: R.chance(0.2), pts: [], acc: R.next(), seed: R.range(0, 100) });
      }
    };
    return {
      update(dt) {
        t += dt;
        if (t < RISE) {
          const y = Y02 * (1 - ease.outCubic(t / RISE));
          if (R.chance(50 * dt))
            ps.spawn(P.SPARK, R.range(-0.5, 0.5), y + 2, R.range(-25, 25), R.range(20, 70), R.range(0.15, 0.35));
          if (R.chance(14 * dt))
            ps.spawn(P.VAPOUR, R.range(-1, 1), y + 3, R.range(-3, 3), R.range(5, 15), R.range(0.5, 0.8), hex("#4a4458"), R.range(1.5, 2.5));
        }
        if (!burst && t >= RISE) {
          burst = true;
          lights.add(0, 0, 110, C[4], 0.6, 1.5);
          lights.add(0, 0, 30, WHITE, 0.5, 0.07);
          shell(66, 236, C, [1.35, 1.9], K);
          shell(26, 120, K, [1, 1.4], K);
          for (let i = 0;i < 7; i++) {
            const a = R.range(0, TAU), d = R.range(0, 8);
            ps.spawn(P.VAPOUR, Math.cos(a) * d, Math.sin(a) * d, Math.cos(a) * R.range(10, 30), Math.sin(a) * R.range(10, 30), R.range(2.2, 3), hex("#4a4458"), R.range(6, 11));
          }
          for (let i = 0;i < 24; i++) {
            const a = R.range(0, TAU), sp = R.range(40, 140);
            ps.spawn(P.SPARK, 0, 0, Math.cos(a) * sp, Math.sin(a) * sp, R.range(0.15, 0.35));
          }
        }
        for (let i = stars.length - 1;i >= 0; i--) {
          const s = stars[i];
          s.age += dt;
          const k = s.age / s.life;
          if (k >= 1) {
            for (let j = 0;j < 2 + (s.big ? 1 : 0); j++)
              pops.push({ x: s.x + R.range(-3, 3), y: s.y + R.range(-3, 3), t0: t + R.range(0, 0.18), life: R.range(0.06, 0.12), c: R.chance(0.6) ? WHITE : s.ramp[5] });
            stars.splice(i, 1);
            continue;
          }
          s.vx -= s.vx * DRAG * dt;
          s.vy -= s.vy * DRAG * dt - G2 * dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.pts.push(s.x, s.y, t);
          while (s.pts.length > 3 && t - s.pts[2] > TRAIL)
            s.pts.splice(0, 3);
          for (s.acc += dt * (k < 0.25 ? 4 : 11);s.acc > 1; s.acc--)
            ps.spawn(P.STAR, s.x, s.y, s.vx * 0.15 + R.range(-6, 6), s.vy * 0.15 + R.range(0, 10), R.range(0.35, 0.8), R.chance(0.5) ? K[5] : WHITE, R.chance(0.15) ? R.range(1, 1.6) : 0.5);
        }
        for (let i = pops.length - 1;i >= 0; i--)
          if (t > pops[i].t0 + pops[i].life)
            pops.splice(i, 1);
        ps.update(dt);
        lights.update(dt);
      },
      drawBack(p) {
        ps.draw(p, "back");
      },
      draw(p) {
        if (t < RISE) {
          const u = t / RISE, y = Y02 * (1 - ease.outCubic(u));
          p.line(0, y, 0, y + 3 + 6 * (1 - u), (q) => q < 0.3 ? K[5] : K[3]);
          p.px(0, y, WHITE);
          p.glow(0, y, 7, K[4], 0.5);
        }
        for (const s of stars) {
          const k = s.age / s.life, P2 = s.pts, n = P2.length / 3;
          for (let j = n - 1;j > 0; j--) {
            const u = (t - P2[j * 3 + 2]) / TRAIL;
            if (u >= 1)
              break;
            const ramp = s.age - (t - P2[j * 3 + 2]) < TURN ? s.first : s.ramp;
            const c = u < 0.3 ? ramp[5] : u < 0.6 ? ramp[4] : ramp[3];
            p.line(P2[j * 3], P2[j * 3 + 1], P2[j * 3 - 3], P2[j * 3 - 2], c, Math.pow(1 - u, 0.8) * (1.3 - k * 0.6));
          }
          if (k > 0.72 && Math.sin(t * 60 + s.seed) < -0.2)
            continue;
          const ramp = s.age < TURN ? s.first : s.ramp, head = s.age < 0.04 ? WHITE : k < 0.55 ? ramp[s.age < TURN ? 5 : 6] : ramp[5];
          p.px(s.x, s.y, head);
          if (s.big && k < 0.6 && s.age > 0.06)
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]])
              p.px(s.x + dx, s.y + dy, ramp[5]);
          p.glow(s.x, s.y, s.big ? 7 : 5, ramp[4], (s.big ? 0.7 : 0.5) * (1 - k * 0.6) * Math.min(1, s.age / 0.2));
        }
        for (const q of pops) {
          const u = (t - q.t0) / q.life;
          if (u < 0 || u > 1)
            continue;
          sparkle(p, q.x, q.y, 2.6 * Math.sin(Math.PI * u), q.c, mix(q.c, C[3], 0.5), 0.5);
        }
        const b = t - RISE;
        if (b >= 0 && b < 0.28) {
          const u = b / 0.28, L = 32 * Math.pow(1 - u, 1.3);
          flareRays(p, 0, 0, L, u * 0.6, C, K);
          if (b < 0.07)
            p.circle(0, 0, 2.6 - b * 20, WHITE);
        }
        ps.draw(p, "front");
        lights.draw(p);
      }
    };
  }
  function flareRays(p, x, y, L, ang, C, K) {
    if (L < 1)
      return;
    for (let i = 0;i < 8; i++) {
      const diag = i % 2 === 1, an = ang + i * TAU / 8, len = diag ? L * 0.42 : L, ca = Math.cos(an), sa = Math.sin(an);
      for (let d = 0;d <= len; d += 0.5) {
        const u = d / len;
        p.dot(x + ca * d, y + sa * d, diag ? u < 0.5 ? K[5] : K[4] : u < 0.3 ? WHITE : u < 0.65 ? C[5] : C[4], u < 0.7 ? 1 : 1 - (u - 0.7) / 0.35);
      }
    }
    p.glow(x, y, 4 + L * 1.2, C[4], 0.3);
    p.glow(x, y, 2 + L * 0.3, WHITE, 0.25);
  }

  // entry.js
  window.PFX = { createFx, createFrame, clearFrame, composite, FX: {
    swordSlash: exports_sword_slash,
    hammerSmash: exports_hammer_smash,
    daggerFlurry: exports_dagger_flurry,
    clawSwipe: exports_claw_swipe,
    hitSpark: exports_hit_spark,
    critHit: exports_crit_hit,
    bluntHit: exports_blunt_hit,
    shieldBlock: exports_shield_block,
    groundSlam: exports_ground_slam,
    burning: exports_burning,
    poisoned: exports_poisoned,
    frozen: exports_frozen,
    poof: exports_poof,
    shatterDeath: exports_shatter_death,
    soulRise: exports_soul_rise,
    collectBurst: exports_collect_burst,
    rain: exports_rain,
    snow: exports_snow,
    heal: exports_heal,
    spellCharge: exports_spell_charge,
    darkExplosion: exports_dark_explosion,
    frostNova: exports_frost_nova,
    acidSplash: exports_acid_splash,
    fireball: exports_fireball,
    confetti: exports_confetti,
    levelUp: exports_level_up,
    achievement: exports_achievement,
    questComplete: exports_quest_complete,
    fireworkBurst: exports_firework_burst
  } };
})();
