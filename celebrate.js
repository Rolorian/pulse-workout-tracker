// Pulse — app-wide celebrations and sound effects.
// Pixel effects come from the vendored pixelfx bundle (vendor/pixelfx), sounds from vendored ZzFX (vendor/zzfx).
// Both are local copies: nothing is fetched and nothing leaves the device.
(function () {
  // ---------------- pixel effects on a full-screen overlay ----------------
  let cv = null, ctx = null, raf = 0, last = 0; const live = [];
  const reduced = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ensure() {
    if (cv) return;
    cv = document.createElement('canvas'); cv.id = 'pulseFxLayer';
    cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;pointer-events:none;z-index:150;image-rendering:pixelated';
    document.body.appendChild(cv); ctx = cv.getContext('2d');
  }
  function size() { const d = Math.min(2, window.devicePixelRatio || 1); const w = Math.round(innerWidth * d), h = Math.round(innerHeight * d); if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; } return d; }
  function make(name, o) {
    const P = window.PFX; const mod = P && P.FX[name]; if (!mod) return null;
    const m = mod.meta || {}; const [W, H] = m.size || [128, 128]; const [OX, OY] = m.origin || [W / 2, H / 2];
    const opts = Object.assign({ seed: (Math.random() * 1e6) | 0 }, o.opts || {}, { x: OX, y: OY });
    const fx = P.createFx(mod, opts); const frame = P.createFrame(W, H, 0, 0);
    const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d');
    return { fx, frame, c, x, img: x.createImageData(W, H), W, H, OX, OY, at: o, drawnAt: -1 };
  }
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016); last = now;
    const d = size(); ctx.clearRect(0, 0, cv.width, cv.height); ctx.imageSmoothingEnabled = false;
    const P = window.PFX;
    for (let i = live.length - 1; i >= 0; i--) {
      const f = live[i]; f.fx.update(dt); if (f.fx.done()) { live.splice(i, 1); continue; }
      if (f.drawnAt !== f.fx.t) { P.clearFrame(f.frame); f.fx.draw(f.frame); P.composite(f.frame, f.img.data); f.x.putImageData(f.img, 0, 0); f.drawnAt = f.fx.t; }
      // integer pixel scale that fits the effect into ~90% of the screen width
      const u = Math.max(1, Math.floor(Math.min(cv.width * (f.at.w || 0.9) / f.W, cv.height * 0.6 / f.H)));
      const X = Math.round(cv.width * (f.at.x ?? 0.5) - f.OX * u), Y = Math.round(cv.height * (f.at.y ?? 0.5) - f.OY * u);
      ctx.drawImage(f.c, X, Y, f.W * u, f.H * u);
    }
    if (live.length) raf = requestAnimationFrame(tick); else { raf = 0; ctx.clearRect(0, 0, cv.width, cv.height); cv.style.display = 'none'; }
  }
  // pulseFx('levelUp', { x: .5, y: .3, opts: { text: 'NEW PR!' } }) — x/y are screen fractions for the effect's anchor
  function pulseFx(name, o = {}) {
    if (!window.PFX || reduced() || (window.settings && settings.reduceFx)) return false;
    try {
      ensure();
      // the same effect twice within half a second (e.g. several unlocks at once) plays once
      if (live.some((x) => x.name === name && x.fx.t < 0.5)) return true;
      const f = make(name, o); if (!f) return false; f.name = name; live.push(f);
      // keep it readable: at most 4 at once, dropping confetti before banners
      while (live.length > 4) { const i = live.findIndex((x) => x.name === 'confetti'); live.splice(i >= 0 ? i : 0, 1); } cv.style.display = 'block'; if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); } return true; }
    catch (e) { console.warn('pulseFx', e); return false; }
  }

  // ---------------- ZzFX sound effects, played through the app's own audio context ----------------
  const SFX = {
    log: [0.9, , 1046, 0.01, 0.03, 0.12, 1, 1.6, , , 520, 0.04],            // set logged: a bright coin blip
    pr: [1.1, , 1675, , 0.06, 0.24, 1, 1.82, , , 837, 0.06],                // PR sparkle (layered on the PR jingle)
    quest: [1, , 523, 0.02, 0.2, 0.32, 1, 1.2, , , 262, 0.1, 0.08],          // quest complete chime
    del: [0.8, , 200, 0.01, 0.03, 0.12, 3, 1, -8],                         // delete / undo
    pop: [0.6, , 780, , 0.02, 0.06, 1, 2.2, , , , , , , , , 0.02]           // small UI pop
  };
  const CACHE = {};
  function pulseSfx(name) {
    try {
      if (!window.ZZFX || !SFX[name] || (window.settings && !settings.sound)) return;
      if (typeof initAudio === 'function') initAudio();
      const ac = window.audioCtx || (typeof audioCtx !== 'undefined' ? audioCtx : null); if (!ac) return;
      ZZFX.audioContext = ac; ZZFX.sampleRate = ac.sampleRate;
      const key = name + ac.sampleRate;
      const s = CACHE[key] || (CACHE[key] = ZZFX.buildSamples(...SFX[name]));
      ZZFX.playSamples([s], 0.9);
    } catch (e) { /* sound is optional */ }
  }

  Object.assign(window, { pulseFx, pulseSfx });
})();
