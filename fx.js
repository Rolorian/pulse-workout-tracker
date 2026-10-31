/* Pulse — particles & juice engine.
   One full-screen canvas overlay (pointer-events:none) drives confetti, fireworks,
   golden rain, rarity light beams, floating damage numbers and ambient seasonal particles. */
(function () {
  const G = (window.G = window.G || {});
  const FX_KEY = 'pulse-fx-v1';
  let fxSettings;
  try { fxSettings = JSON.parse(localStorage.getItem(FX_KEY) || '{}'); } catch (e) { fxSettings = {}; }
  if (fxSettings.particles === undefined) fxSettings.particles = true;
  if (fxSettings.ambient === undefined) fxSettings.ambient = true;
  const prefersReduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  G.fxSettings = fxSettings;
  G.saveFx = () => localStorage.setItem(FX_KEY, JSON.stringify(fxSettings));
  const on = () => fxSettings.particles && !prefersReduced;

  const cv = document.createElement('canvas');
  cv.id = 'fxCanvas';
  cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:115';
  document.body.appendChild(cv);
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, DPR = 1;
  function resize() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  addEventListener('resize', resize);

  const parts = [];   // burst particles
  const beams = [];   // vertical light beams
  const texts = [];   // floating text
  let ambient = null; // {emojis:[], rate, kind}
  const amb = [];
  let running = false;
  const MAX = 700;

  function rand(a, b) { return a + Math.random() * (b - a); }
  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function add(p) { if (parts.length < MAX) parts.push(p); kick(); }

  function kick() { if (!running) { running = true; requestAnimationFrame(loop); } }

  let last = performance.now();
  function loop(t) {
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    ctx.clearRect(0, 0, W, H);

    // beams
    for (let i = beams.length - 1; i >= 0; i--) {
      const b = beams[i]; b.t += dt;
      const k = b.t / b.life;
      if (k >= 1) { beams.splice(i, 1); continue; }
      const alpha = k < 0.15 ? k / 0.15 : 1 - (k - 0.15) / 0.85;
      const w = b.w * (0.6 + 0.4 * Math.sin(b.t * 9));
      const grad = ctx.createLinearGradient(b.x - w, 0, b.x + w, 0);
      const col = b.rainbow ? `hsla(${(b.t * 240) % 360},100%,70%,` : b.rgba;
      grad.addColorStop(0, col + '0)');
      grad.addColorStop(0.5, col + (0.55 * alpha) + ')');
      grad.addColorStop(1, col + '0)');
      ctx.fillStyle = grad;
      ctx.fillRect(b.x - w, 0, w * 2, H);
      ctx.fillStyle = col + (0.9 * alpha) + ')';
      ctx.fillRect(b.x - 1.5, 0, 3, H);
    }

    // particles
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.t += dt;
      if (p.t >= p.life) {
        if (p.onDie) p.onDie(p);
        parts.splice(i, 1); continue;
      }
      p.vy += (p.g || 0) * dt;
      p.vx *= p.drag || 1; p.vy *= p.drag || 1;
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.rot = (p.rot || 0) + (p.vr || 0) * dt;
      const a = p.fade === false ? 1 : Math.max(0, 1 - p.t / p.life);
      ctx.globalAlpha = a;
      if (p.emoji) {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.font = `${p.size}px system-ui,"Apple Color Emoji"`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0); ctx.restore();
      } else if (p.shape === 'rect') {
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.fillStyle = p.color; ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2 * Math.abs(Math.cos(p.t * 8)) + 1);
        ctx.restore();
      } else {
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color; ctx.shadowBlur = p.glow || 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, 6.283); ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
    }

    // ambient seasonal particles
    if (ambient && fxSettings.ambient && !prefersReduced && !document.body.classList.contains('realm-on')) {
      if (amb.length < ambient.max && Math.random() < ambient.rate * dt * 60) {
        const fromTop = ambient.dir !== 'up';
        amb.push({
          x: rand(0, W), y: fromTop ? -20 : H + 20, vx: rand(-15, 15) + (ambient.wind || 0),
          vy: fromTop ? rand(25, 60) : rand(-60, -25), size: rand(12, 22), emoji: pick(ambient.emojis),
          sway: rand(0, 6.28), alpha: rand(0.35, 0.75)
        });
      }
      for (let i = amb.length - 1; i >= 0; i--) {
        const p = amb[i];
        p.sway += dt * 1.5;
        p.x += (p.vx + Math.sin(p.sway) * 18) * dt; p.y += p.vy * dt;
        if (p.y > H + 30 || p.y < -40) { amb.splice(i, 1); continue; }
        ctx.globalAlpha = p.alpha;
        ctx.font = `${p.size}px system-ui,"Apple Color Emoji"`; ctx.textAlign = 'center';
        ctx.fillText(p.emoji, p.x, p.y);
      }
      ctx.globalAlpha = 1;
    } else if (amb.length) amb.length = 0;

    // floating text
    for (let i = texts.length - 1; i >= 0; i--) {
      const tx = texts[i]; tx.t += dt;
      if (tx.t >= tx.life) { texts.splice(i, 1); continue; }
      const k = tx.t / tx.life;
      const s = tx.size * (k < 0.12 ? 0.5 + k / 0.12 * 0.7 : 1.2 - Math.min(0.2, (k - 0.12)));
      ctx.globalAlpha = 1 - Math.max(0, (k - 0.6) / 0.4);
      ctx.font = `900 ${s}px ui-monospace,Menlo,monospace`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(0,0,0,.75)';
      ctx.strokeText(tx.text, tx.x, tx.y - k * 70);
      ctx.fillStyle = tx.color; ctx.fillText(tx.text, tx.x, tx.y - k * 70);
      ctx.globalAlpha = 1;
    }

    if (parts.length || beams.length || texts.length || (ambient && fxSettings.ambient && !prefersReduced)) requestAnimationFrame(loop);
    else { running = false; ctx.clearRect(0, 0, W, H); }
  }

  const CONFETTI = ['#49e39a', '#5aa8ff', '#f5c542', '#ff6b7a', '#a78bfa', '#ffb86b', '#ffffff'];

  G.confetti = function (n = 120, x, y) {
    if (!on()) return;
    x = x == null ? W / 2 : x; y = y == null ? H * 0.35 : y;
    for (let i = 0; i < n; i++) {
      const a = rand(-Math.PI, 0), sp = rand(250, 750);
      add({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 900, drag: 0.985, size: rand(7, 12),
        color: pick(CONFETTI), shape: 'rect', vr: rand(-12, 12), t: 0, life: rand(1.6, 2.6) });
    }
  };

  G.sparks = function (x, y, color = '#49e39a', n = 18) {
    if (!on()) return;
    for (let i = 0; i < n; i++) {
      const a = rand(0, 6.283), sp = rand(80, 260);
      add({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 300, drag: 0.96, size: rand(1.5, 3), color, glow: 10, t: 0, life: rand(0.4, 0.8) });
    }
  };

  function shell(x, y, color) {
    const n = 46;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * 6.283, sp = rand(160, 300);
      add({ x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, g: 120, drag: 0.975, size: 2.4, color, glow: 14, t: 0, life: rand(1.1, 1.6) });
    }
  }
  G.fireworks = function (count = 4) {
    if (!on()) return;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const x = rand(W * 0.15, W * 0.85), ty = rand(H * 0.15, H * 0.4), color = pick(CONFETTI);
        add({ x, y: H, vx: rand(-30, 30), vy: -(H - ty) * 1.9, g: 900, drag: 1, size: 2.5, color, glow: 12, t: 0,
          life: 0.55, fade: false, onDie: (p) => shell(p.x, p.y, color) });
        if (G.sfx) G.sfx('whoosh');
        setTimeout(() => G.sfx && G.sfx('boom'), 550);
      }, i * 380);
    }
  };

  G.goldenRain = function (n = 160) {
    if (!on()) return;
    for (let i = 0; i < n; i++) {
      setTimeout(() => add({ x: rand(0, W), y: -10, vx: rand(-20, 20), vy: rand(200, 420), g: 200, size: rand(2, 4),
        color: pick(['#f5c542', '#ffe58a', '#fff6c8']), glow: 12, t: 0, life: rand(1.8, 2.6) }), i * 8);
    }
  };

  G.coinBurst = function (fromEl, n = 10) {
    if (!on()) return;
    const chip = document.getElementById('walletChip');
    let sx = W / 2, sy = H / 2;
    if (fromEl && fromEl.getBoundingClientRect) { const r = fromEl.getBoundingClientRect(); sx = r.left + r.width / 2; sy = r.top + r.height / 2; }
    let tx = W - 60, ty = 40;
    if (chip) { const r = chip.getBoundingClientRect(); tx = r.left + r.width / 2; ty = r.top + r.height / 2; }
    for (let i = 0; i < n; i++) {
      const life = rand(0.6, 0.95);
      const ox = rand(-40, 40), oy = rand(-40, 40);
      add({ x: sx + ox, y: sy + oy, vx: (tx - sx - ox) / life, vy: (ty - sy - oy) / life - 200, g: 400, size: 16, emoji: '🪙',
        t: 0, life, fade: false, onDie: () => { if (chip) { chip.classList.remove('bump'); void chip.offsetWidth; chip.classList.add('bump'); } } });
    }
  };

  // Rarity light beam (PoE / Diablo style). rgb like '255,215,0'
  G.beam = function (rgb, opts = {}) {
    if (!on()) return;
    beams.push({ x: opts.x == null ? W / 2 : opts.x, w: opts.w || 60, rgba: `rgba(${rgb},`, rainbow: !!opts.rainbow, t: 0, life: opts.life || 2.4 });
    kick();
  };

  G.floatText = function (x, y, text, color = '#fff', size = 26) {
    if (!on()) return;
    texts.push({ x, y, text, color, size, t: 0, life: 1.1 }); kick();
  };

  G.shake = function (el, strength = 8) {
    if (prefersReduced) return;
    el = el || document.querySelector('.app');
    if (!el || !el.animate) return;
    el.animate([
      { transform: 'translate(0,0)' }, { transform: `translate(${-strength}px,${strength / 2}px)` },
      { transform: `translate(${strength}px,${-strength / 2}px)` }, { transform: `translate(${-strength / 2}px,${strength / 3}px)` },
      { transform: 'translate(0,0)' }], { duration: 380, easing: 'ease-out' });
  };

  // Battle hit: damage number + shake + sparks on the target element
  G.fxHit = function (el, dmg, crit) {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    G.floatText(x + rand(-20, 20), y - 10, (crit ? 'CRIT ' : '-') + dmg, crit ? '#ffd23f' : '#ff6b7a', crit ? 34 : 26);
    G.sparks(x, y, crit ? '#ffd23f' : '#ff6b7a', crit ? 34 : 16);
    G.shake(el, crit ? 12 : 6);
    if (crit) { G.shake(null, 5); G.sfx && G.sfx('crit'); }
    else G.sfx && G.sfx('hit');
  };

  G.setAmbient = function (cfg) { ambient = cfg; if (cfg) kick(); };

  // Celebration by rarity tier index (0 common … 7 celestial)
  G.celebrate = function (tier, el) {
    let x = W / 2;
    if (el && el.getBoundingClientRect) { const r = el.getBoundingClientRect(); x = r.left + r.width / 2; }
    if (tier >= 2) G.sparks(x, H * 0.4, ['#9aa4af', '#49e39a', '#5aa8ff', '#a78bfa', '#ffb84d', '#ff5d8f', '#ffe066', '#ffffff'][tier], 24 + tier * 8);
    if (tier >= 3) G.confetti(60 + tier * 20, x);
    if (tier === 4) G.beam('255,184,77', { x });
    if (tier >= 5) { G.goldenRain(); G.shake(null, 6 + tier); }
    if (tier === 5) G.beam('255,93,143', { x, w: 80 });
    if (tier === 6) { G.beam('255,224,102', { x, w: 110, life: 3.2 }); G.fireworks(3); }
    if (tier >= 7) { G.beam('255,255,255', { x, w: 140, life: 3.8, rainbow: true }); G.fireworks(6); }
  };

  // ---- extra synth sounds (reuse the app's playNote + audioCtx) ----
  G.sfx = function (type) {
    try {
      if (typeof settings !== 'undefined' && !settings.sound) return;
      if (typeof initAudio === 'function') initAudio();
      if (typeof audioCtx === 'undefined' || !audioCtx) return;
      const n = audioCtx.currentTime;
      const P = (f, d, t, o) => playNote(f, d, n + t, o);
      switch (type) {
        case 'tick': P(1400, 0.03, 0, { gain: 0.05, type: 'square' }); break;
        case 'coin': P(1319, 0.06, 0); P(1760, 0.12, 0.06); break;
        case 'hit': P(180, 0.08, 0, { type: 'square', gain: 0.08 }); P(120, 0.1, 0.03, { type: 'sawtooth', gain: 0.05 }); break;
        case 'crit': P(220, 0.08, 0, { type: 'square' }); P(660, 0.1, 0.05); P(990, 0.18, 0.1); break;
        case 'whoosh': P(300, 0.25, 0, { type: 'sine', gain: 0.04 }); break;
        case 'boom': P(70, 0.35, 0, { type: 'sawtooth', gain: 0.07 }); P(55, 0.4, 0.02, { type: 'square', gain: 0.05 }); break;
        case 'lose': P(392, 0.15, 0); P(330, 0.15, 0.15); P(262, 0.35, 0.3); break;
        case 'win': P(523, 0.1, 0); P(659, 0.1, 0.1); P(784, 0.1, 0.2); P(1047, 0.3, 0.3); break;
        case 'break': P(200, 0.1, 0, { type: 'sawtooth' }); P(140, 0.12, 0.08, { type: 'sawtooth' }); P(90, 0.3, 0.16, { type: 'square' }); break;
        case 'rare': [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => P(f, 0.25, i * 0.08)); break;
        case 'godly': [392, 523, 659, 784, 1047, 1319, 1568, 2093].forEach((f, i) => P(f, 0.4, i * 0.09)); P(196, 1.2, 0, { gain: 0.08 }); break;
        default: break;
      }
    } catch (e) {}
  };

  // Hook existing celebrations: PRs → confetti, level-ups → fireworks, achievements → sparkles
  if (typeof playSound === 'function') {
    const orig = playSound;
    playSound = function (type) {
      orig(type);
      if (type === 'pr') G.confetti(140);
      else if (type === 'levelup') G.fireworks(3);
      else if (type === 'achievement') G.confetti(70);
    };
  }
})();
