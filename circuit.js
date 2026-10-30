/* Pulse — Circuit mode.
   Work/rest intervals through a full-body list, a longer break between rounds, repeat until you stop.
   Timing is timestamp-based so it never drifts; it auto-pauses if you leave the app. */
(function () {
  const G = (window.G = window.G || {});
  const CKEY = 'pulse-circuit-v1';
  let C;
  try { C = JSON.parse(localStorage.getItem(CKEY) || 'null'); } catch (e) { C = null; }
  if (!C) C = {};
  C.cfg = Object.assign({ preset: 'full', work: 20, rest: 20, brk: 60, rounds: 0, voice: true, custom: null }, C.cfg || {});
  C.history = C.history || [];
  C.last = C.last || {}; // last reps per exercise, for "beat last time"
  const save = () => localStorage.setItem(CKEY, JSON.stringify(C));
  G.circuitState = () => C;

  const PRESETS = {
    full: { name: 'Full Body Blast', icon: '🔥', list: ['Jumping jacks', 'Squats', 'Press-ups', 'Mountain climbers', 'Lunges', 'Plank', 'Burpees'] },
    quick: { name: 'Quick Burn', icon: '⚡', list: ['High knees', 'Squats', 'Press-ups', 'Sit-ups', 'Burpees'] },
    legs: { name: 'Legs & Core', icon: '🦵', list: ['Jump squats', 'Lunges', 'Glute bridges', 'Flutter kicks', 'Wall sit', 'Bicycle crunches'] },
    upper: { name: 'Upper Body', icon: '💪', list: ['Press-ups', 'Tricep dips', 'Pike push-ups', 'Superman', 'Diamond push-ups', 'Door frame rows'] },
    cardio: { name: 'Cardio Storm', icon: '🌪️', list: ['Jumping jacks', 'High knees', 'Skater jumps', 'Mountain climbers', 'Burpees', 'Sprints'] },
    random: { name: 'Random Full Body', icon: '🎲', list: null },
    custom: { name: 'My Circuit', icon: '⭐', list: null }
  };
  G.CIRCUIT_PRESETS = PRESETS;

  const meta = (n) => (typeof exMeta === 'function' && exMeta(n)) || pickableExercises().find((e) => e.name === n) || { name: n, icon: '⭐', unit: 'reps' };
  const timed = (n) => { const u = meta(n).unit; return u === 'seconds' || u === 'minutes'; };
  const fmt = (s) => { s = Math.max(0, Math.round(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  function circuitPool() { return pickableExercises().filter((e) => (e.unit === 'reps' || e.unit === 'seconds' || e.unit === 'minutes') && (trainStyle() !== 'bodyweight' || isBodyweight(e.name))); }

  function randomRound() {
    // one move from each body area, shuffled, so every random round is still full-body
    const pool = circuitPool();
    const byCat = {}; pool.forEach((e) => (byCat[e.cat] = byCat[e.cat] || []).push(e.name));
    const order = ['cardio', 'legs', 'chest', 'core', 'legs', 'back', 'cardio'];
    const out = [];
    order.forEach((c) => { const arr = (byCat[c] || []).filter((n) => !out.includes(n)); if (arr.length) out.push(arr[Math.floor(Math.random() * arr.length)]); });
    return out.slice(0, 7);
  }
  function listFor(cfg) {
    if (cfg.preset === 'random') return randomRound();
    if (cfg.preset === 'custom') return (cfg.custom && cfg.custom.length ? cfg.custom : PRESETS.full.list).slice();
    return PRESETS[cfg.preset].list.filter((n) => pickableExercises().some((e) => e.name === n));
  }
  function roundSecs(cfg, n) { return n * cfg.work + (n - 1) * cfg.rest; }

  // ---------------- audio / voice ----------------
  function beep(kind) {
    try {
      if (typeof settings !== 'undefined' && !settings.sound) return;
      initAudio(); if (!audioCtx) return;
      const n = audioCtx.currentTime; const P = (f, d, t, o) => playNote(f, d, n + t, o);
      if (kind === 'tick') P(880, 0.09, 0, { gain: 0.14 });
      else if (kind === 'go') { P(1175, 0.12, 0, { gain: 0.16 }); P(1568, 0.3, 0.12, { gain: 0.16 }); }
      else if (kind === 'rest') { P(784, 0.14, 0, { gain: 0.14 }); P(523, 0.3, 0.14, { gain: 0.14 }); }
      else if (kind === 'break') { [523, 659, 784, 1047].forEach((f, i) => P(f, 0.18, i * 0.12, { gain: 0.14 })); }
      else if (kind === 'done') playSound('achievement');
    } catch (e) {}
  }
  function say(text) {
    if (!C.cfg.voice || !('speechSynthesis' in window)) return;
    try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.rate = 1.05; u.pitch = 1; u.lang = 'en-GB'; speechSynthesis.speak(u); } catch (e) {}
  }
  let wake = null;
  async function lockScreen(on) {
    try {
      if (on && 'wakeLock' in navigator && !wake) { wake = await navigator.wakeLock.request('screen'); wake.addEventListener && wake.addEventListener('release', () => (wake = null)); }
      if (!on && wake) { wake.release(); wake = null; }
    } catch (e) {}
  }

  // ---------------- session state machine ----------------
  // phases: ready → work → rest → work … → break → work …
  let R = null; // running session
  let raf = null;

  function start() {
    const cfg = Object.assign({}, C.cfg);
    const list = listFor(cfg);
    if (list.length < 2) { showToast('Add at least 2 exercises to your circuit'); return; }
    initAudio && initAudio();
    R = { cfg, list, round: 1, idx: 0, phase: 'ready', end: Date.now() + 10000, dur: 10, paused: false, remain: 0,
      totals: {}, perRound: [{}], started: Date.now(), activeMs: 0, lastTick: Date.now(), lastBeep: null, pending: null, intervals: 0 };
    list.forEach((n) => (R.totals[n] = R.totals[n] || { reps: 0, secs: 0, sets: 0 }));
    G.closeSheet && G.closeSheet(true);
    openPlayer();
    say(`Get ready. First up, ${list[0]}`);
    lockScreen(true);
    loop();
  }

  function setPhase(phase, secs) { R.phase = phase; R.dur = secs; R.end = Date.now() + secs * 1000; R.lastBeep = null; }

  function next() {
    const cfg = R.cfg;
    if (R.phase === 'ready') { setPhase('work', cfg.work); beep('go'); haptic('heavy'); say(R.list[R.idx]); }
    else if (R.phase === 'work') {
      // finished an interval: record it, then ask for reps during the rest
      const n = R.list[R.idx];
      R.intervals++;
      R.totals[n] = R.totals[n] || { reps: 0, secs: 0, sets: 0 };
      R.totals[n].sets++;
      if (timed(n)) { R.totals[n].secs += cfg.work; R.pending = null; }
      else {
        const guess = (R.perRound[R.round - 2] && R.perRound[R.round - 2][n]) || C.last[n] || 10;
        R.pending = { name: n, reps: guess, round: R.round };
      }
      const lastInRound = R.idx === R.list.length - 1;
      if (lastInRound) {
        if (cfg.rounds && R.round >= cfg.rounds) { commitPending(); finish(); return; }
        setPhase('break', cfg.brk); beep('break'); haptic('levelup');
        say(`Round ${R.round} done. Take a minute.`);
        G.confetti && G.confetti(60);
      } else {
        setPhase('rest', cfg.rest); beep('rest'); haptic('medium');
        say(`Rest. Next, ${R.list[R.idx + 1]}`);
      }
    } else if (R.phase === 'rest') {
      commitPending(); R.idx++; setPhase('work', cfg.work); beep('go'); haptic('heavy'); say('Go');
    } else if (R.phase === 'break') {
      commitPending();
      R.round++; R.idx = 0; R.perRound.push({});
      if (cfg.preset === 'random') { R.list = randomRound(); R.list.forEach((n) => (R.totals[n] = R.totals[n] || { reps: 0, secs: 0, sets: 0 })); }
      setPhase('work', cfg.work); beep('go'); haptic('heavy'); say(`Round ${R.round}. ${R.list[0]}`);
    }
    renderPlayer(true);
  }

  function commitPending() {
    if (!R || !R.pending) return;
    const p = R.pending;
    R.totals[p.name].reps += p.reps;
    const pr = R.perRound[p.round - 1] || (R.perRound[p.round - 1] = {});
    pr[p.name] = p.reps;
    C.last[p.name] = p.reps;
    R.pending = null;
  }

  function loop() {
    if (!R) return;
    const now = Date.now();
    if (!R.paused) {
      R.activeMs += now - R.lastTick;
      const left = (R.end - now) / 1000;
      const whole = Math.ceil(left);
      if (whole <= 3 && whole >= 1 && R.lastBeep !== whole && (R.phase !== 'work' || R.cfg.work > 5)) { R.lastBeep = whole; beep('tick'); if (R.phase !== 'work') haptic('light'); }
      if (left <= 0) next();
      renderPlayer(false);
    }
    R && (R.lastTick = now);
    raf = requestAnimationFrame(loop);
  }

  function pause(on) {
    if (!R) return;
    if (on === undefined) on = !R.paused;
    if (on && !R.paused) { R.paused = true; R.remain = R.end - Date.now(); speechSynthesis && speechSynthesis.cancel && speechSynthesis.cancel(); }
    else if (!on && R.paused) { R.paused = false; R.end = Date.now() + R.remain; R.lastTick = Date.now(); }
    renderPlayer(true);
  }
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && R && !R.paused) pause(true); if (document.visibilityState === 'visible' && R) lockScreen(true); });

  function skip() { if (!R) return; if (R.phase === 'rest' || R.phase === 'break') commitPending(); R.end = Date.now(); if (R.paused) { R.paused = false; R.lastTick = Date.now(); } }
  function addTime(s) { if (!R) return; if (R.paused) R.remain += s * 1000; else R.end += s * 1000; R.dur += s; renderPlayer(true); }

  // ---------------- player UI ----------------
  function openPlayer() {
    let el = document.getElementById('circuitPlayer');
    if (!el) { el = document.createElement('div'); el.id = 'circuitPlayer'; document.body.appendChild(el); }
    el.className = 'cp open';
    renderPlayer(true);
  }
  function closePlayer() { const el = document.getElementById('circuitPlayer'); if (el) el.remove(); cancelAnimationFrame(raf); lockScreen(false); }

  const PHASE = { ready: ['GET READY', '#ffd23f'], work: ['WORK', 'var(--accent)'], rest: ['REST', '#5aa8ff'], break: ['ROUND BREAK', '#b48cff'] };

  function renderPlayer(full) {
    const el = document.getElementById('circuitPlayer'); if (!el || !R) return;
    const left = R.paused ? R.remain / 1000 : (R.end - Date.now()) / 1000;
    const pct = Math.max(0, Math.min(1, left / R.dur));
    const totalReps = Object.values(R.totals).reduce((a, t) => a + t.reps, 0) + (R.pending ? R.pending.reps : 0);
    if (!full && el.querySelector('#cpSecs')) {
      el.querySelector('#cpSecs').textContent = Math.max(0, Math.ceil(left));
      el.querySelector('#cpRing').style.strokeDashoffset = String(565.5 * (1 - pct));
      el.querySelector('#cpElapsed').textContent = fmt(R.activeMs / 1000);
      el.classList.toggle('final3', Math.ceil(left) <= 3 && R.phase === 'work');
      return;
    }
    const [label, color] = PHASE[R.phase];
    const cur = R.list[R.idx]; const nxt = R.phase === 'work' ? R.list[R.idx + 1] : R.phase === 'break' ? null : R.list[R.idx + (R.phase === 'ready' ? 0 : 1)];
    const showEx = R.phase === 'rest' || R.phase === 'ready' ? R.list[R.idx + (R.phase === 'ready' ? 0 : 1)] : cur;
    const m = meta(showEx || cur);
    let mid = '';
    if (R.pending) {
      const p = R.pending; const last = C.last[p.name];
      mid = `<div class="cp-reps"><div class="cp-q">How many <b>${esc(p.name)}</b>?</div>
        <div class="cp-stepper"><button data-d="-5">−5</button><button data-d="-1">−</button><span id="cpRepN">${p.reps}</span><button data-d="1">+</button><button data-d="5">+5</button></div>
        <div class="muted">${R.perRound[p.round - 2] && R.perRound[p.round - 2][p.name] != null ? `Last round: ${R.perRound[p.round - 2][p.name]}` : last != null ? `Last time: ${last}` : 'Tap to adjust — saves automatically'}</div></div>`;
    }
    if (R.phase === 'break') {
      const rr = R.perRound[R.round - 1] || {};
      const rnd = Object.values(rr).reduce((a, b) => a + b, 0) + (R.pending ? R.pending.reps : 0);
      mid += `<div class="cp-round">Round ${R.round} · ${rnd} reps · next: ${esc(R.cfg.preset === 'random' ? 'a new random set' : R.list[0])}</div>`;
    }
    el.style.setProperty('--pc', color);
    el.innerHTML = `
      <div class="cp-top"><span>Round <b>${R.round}</b>${R.cfg.rounds ? '/' + R.cfg.rounds : ''} · ${R.phase === 'break' ? 'break' : `move ${Math.min(R.idx + 1 + (R.phase === 'rest' ? 1 : 0), R.list.length)}/${R.list.length}`}</span><span>⏱ <b id="cpElapsed">${fmt(R.activeMs / 1000)}</b> · ${totalReps} reps</span></div>
      <div class="cp-phase">${label}${R.paused ? ' · PAUSED' : ''}</div>
      <div class="cp-ringbox">
        <svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" class="trk"/><circle id="cpRing" cx="100" cy="100" r="90" class="prog" style="stroke-dashoffset:${565.5 * (1 - pct)}"/></svg>
        <div class="cp-center"><div class="cp-ico">${R.phase === 'break' ? '☕' : m.icon}</div><div id="cpSecs" class="cp-secs">${Math.max(0, Math.ceil(left))}</div></div>
      </div>
      <div class="cp-ex">${R.phase === 'break' ? 'Breathe. Shake it out.' : (R.phase === 'rest' ? 'Next: ' : '') + esc(showEx || '')}</div>
      ${R.phase === 'work' && nxt ? `<div class="cp-next">Up next: ${meta(nxt).icon} ${esc(nxt)}</div>` : R.phase === 'work' ? `<div class="cp-next">Last move of the round 💥</div>` : ''}
      ${mid}
      <div class="cp-btns">
        <button class="gbtn ghost" id="cpPause">${R.paused ? '▶ Resume' : '⏸ Pause'}</button>
        ${R.phase === 'break' || R.phase === 'rest' ? `<button class="gbtn ghost" id="cpAdd">+${R.phase === 'break' ? 30 : 10}s</button>` : ''}
        <button class="gbtn ghost" id="cpSkip">⏭ Skip</button>
        <button class="gbtn danger" id="cpEnd">■ Finish</button>
      </div>
      <div class="cp-dots">${R.list.map((n, i) => `<span class="${i < R.idx || (i === R.idx && R.phase !== 'work' && R.phase !== 'ready') ? 'done' : i === R.idx && R.phase === 'work' ? 'cur' : ''}" title="${escAttr(n)}">${meta(n).icon}</span>`).join('')}</div>
      <button class="cp-voice" id="cpVoice">${C.cfg.voice ? '🗣️' : '🔇'}</button>`;
    el.querySelectorAll('[data-d]').forEach((b) => (b.onclick = () => { if (!R.pending) return; R.pending.reps = Math.max(0, R.pending.reps + Number(b.dataset.d)); const s = el.querySelector('#cpRepN'); if (s) s.textContent = R.pending.reps; haptic('selection'); G.sfx && G.sfx('tick'); }));
    el.querySelector('#cpPause').onclick = () => pause();
    el.querySelector('#cpSkip').onclick = skip;
    const add = el.querySelector('#cpAdd'); if (add) add.onclick = () => addTime(R.phase === 'break' ? 30 : 10);
    el.querySelector('#cpEnd').onclick = () => { if (confirm('Finish the circuit and save it?')) { commitPending(); finish(); } };
    el.querySelector('#cpVoice').onclick = () => { C.cfg.voice = !C.cfg.voice; save(); if (!C.cfg.voice) speechSynthesis.cancel(); renderPlayer(true); };
  }

  // ---------------- finish & save ----------------
  function finish() {
    if (!R) return;
    cancelAnimationFrame(raf); lockScreen(false);
    try { speechSynthesis.cancel(); } catch (e) {}
    const s = R; R = null;
    // a part-finished last round counts once at least half its moves are done
    const movesDone = s.idx + (s.phase === 'work' || s.phase === 'ready' ? 0 : 1);
    const roundsDone = s.round - 1 + (s.phase === 'break' || movesDone >= Math.ceil(s.list.length / 2) ? 1 : 0);
    const totals = Object.entries(s.totals).filter(([, t]) => t.sets > 0);
    beep('done'); say('Circuit complete. Great work.');
    const el = document.getElementById('circuitPlayer'); if (!el) return;
    el.style.setProperty('--pc', 'var(--gold)');
    el.innerHTML = `<div class="cp-sum">
      <div class="cp-phase">CIRCUIT COMPLETE</div>
      <div class="cp-big">${roundsDone} round${roundsDone === 1 ? '' : 's'} · ${fmt(s.activeMs / 1000)}</div>
      <div class="muted">${s.intervals} intervals · adjust anything below before saving</div>
      <div class="cp-list">${totals.map(([n, t]) => `<div class="cp-row" data-n="${escAttr(n)}"><span>${meta(n).icon} ${esc(n)}</span>
        ${timed(n) ? `<b>${t.secs}s</b>` : `<div class="cp-mini"><button data-dd="-1">−</button><b>${t.reps}</b><button data-dd="1">+</button></div>`}</div>`).join('') || '<div class="empty">Nothing logged</div>'}</div>
      <div class="cp-btns"><button class="gbtn" id="cpSave">💾 Save circuit</button><button class="gbtn ghost" id="cpDiscard">Discard</button></div></div>`;
    G.fireworks && G.fireworks(3);
    el.querySelectorAll('.cp-row').forEach((row) => row.querySelectorAll('[data-dd]').forEach((b) => (b.onclick = () => {
      const t = s.totals[row.dataset.n]; t.reps = Math.max(0, t.reps + Number(b.dataset.dd)); row.querySelector('b').textContent = t.reps; haptic('selection');
    })));
    el.querySelector('#cpDiscard').onclick = () => { if (confirm('Discard this circuit?')) closePlayer(); };
    el.querySelector('#cpSave').onclick = () => save_(s, totals, roundsDone);
  }

  function save_(s, totals, roundsDone) {
    const today = dateKey(new Date()); const time = new Date().toTimeString().slice(0, 5);
    const bonus = 1.25 * ((G.stats && G.stats().xpMult) || 1); // circuit bonus XP on top of gear/potions
    let id = Date.now();
    totals.forEach(([n, t]) => {
      const m = meta(n);
      if (timed(n)) {
        if (!t.secs) return;
        workouts.push({ id: id++, exercise: n, amount: m.unit === 'minutes' ? Math.round(s.cfg.work / 60 * 100) / 100 : s.cfg.work, sets: t.sets, unit: m.unit,
          date: today, time, isPR: false, feeling: '💪', notes: `🔁 Circuit · ${t.sets}×${s.cfg.work}s`, weight: null, category: null, bonus, circuit: true });
      } else {
        if (!t.reps) return;
        workouts.push({ id: id++, exercise: n, amount: t.reps, sets: 1, unit: 'reps', date: today, time, isPR: false, feeling: '💪',
          notes: `🔁 Circuit · ${t.sets} round${t.sets > 1 ? 's' : ''}`, weight: null, category: null, bonus, circuit: true });
      }
    });
    const reps = totals.reduce((a, [, t]) => a + t.reps, 0);
    const rec = { date: today, t: Date.now(), rounds: roundsDone, secs: Math.round(s.activeMs / 1000), reps, preset: s.cfg.preset };
    const prevBest = C.history.reduce((a, h) => Math.max(a, h.rounds), 0);
    C.history.unshift(rec); C.history = C.history.slice(0, 60); save();
    closePlayer();
    persist();
    if (G.reward && roundsDone > 0) G.reward({ coins: Math.round(40 * roundsDone * (1 + 0.25 * (G.talent ? G.talent('steady') : 0))), gems: roundsDone >= 5 ? 1 : 0 }, { label: `🔁 Circuit bonus (${roundsDone} rounds):` });
    if (roundsDone > prevBest && prevBest > 0) setTimeout(() => { showToast(`🏆 New circuit record: ${roundsDone} rounds!`); G.confetti && G.confetti(140); }, 1200);
    G.emit && G.emit('circuit', rec);
  }

  // ---------------- setup sheet ----------------
  function setup() {
    const cfg = C.cfg;
    const draw = () => {
      const list = cfg.preset === 'random' ? null : listFor(cfg);
      const n = list ? list.length : 7;
      const html = `<div class="cz-title" style="text-align:left">🔁 Circuit Setup</div>
        <div class="cs-presets">${Object.entries(PRESETS).map(([k, p]) => `<button class="chip ${cfg.preset === k ? 'on' : ''}" data-p="${k}">${p.icon} ${p.name}</button>`).join('')}</div>
        ${list ? `<div class="cs-list">${list.map((x, i) => `<div class="cs-item"><span>${meta(x).icon} ${esc(x)}${timed(x) ? ' <span class="muted">(timed)</span>' : ''}</span>
          ${cfg.preset === 'custom' ? `<span><button data-up="${i}">↑</button><button data-rm="${i}">✕</button></span>` : ''}</div>`).join('')}</div>` : '<div class="muted" style="margin:8px 0">A fresh full-body mix every round: cardio, legs, chest, core and back.</div>'}
        ${cfg.preset === 'custom' ? `<div class="row2"><select id="csAdd" class="ex-select" style="flex:1;margin:0">${circuitPool().map((e) => `<option>${esc(e.name)}</option>`).join('')}</select><button class="gbtn sm" id="csAddBtn">+ Add</button></div>` : `<button class="gbtn ghost sm" id="csCopy" style="margin-top:6px">✏️ Copy into My Circuit to edit</button>`}
        <div class="cs-grid">
          ${[['work', 'Work', [15, 20, 30, 40, 45]], ['rest', 'Rest', [10, 15, 20, 30]], ['brk', 'Round break', [30, 60, 90, 120]], ['rounds', 'Rounds', [0, 3, 4, 5, 6, 8]]].map(([k, l, opts]) =>
            `<div><div class="muted">${l}</div><div class="cs-opts">${opts.map((o) => `<button class="chip ${cfg[k] === o ? 'on' : ''}" data-k="${k}" data-v="${o}">${k === 'rounds' ? (o ? o : '∞') : o + 's'}</button>`).join('')}</div></div>`).join('')}
        </div>
        <div class="cs-est">1 round ≈ <b>${fmt(roundSecs(cfg, n))}</b> + ${cfg.brk}s break${cfg.rounds ? ` · total ≈ <b>${fmt(cfg.rounds * roundSecs(cfg, n) + (cfg.rounds - 1) * cfg.brk)}</b>` : ' · keep going until you tap Finish'}</div>
        <label class="cs-voice"><input type="checkbox" id="csVoice" ${cfg.voice ? 'checked' : ''}> 🗣️ Voice coach (calls out each move)</label>
        <button class="gbtn" id="csGo">▶ START CIRCUIT</button>`;
      const sh = G.sheet(html);
      sh.querySelectorAll('[data-p]').forEach((b) => (b.onclick = () => { cfg.preset = b.dataset.p; save(); draw(); }));
      sh.querySelectorAll('[data-k]').forEach((b) => (b.onclick = () => { cfg[b.dataset.k] = Number(b.dataset.v); save(); draw(); }));
      sh.querySelectorAll('[data-rm]').forEach((b) => (b.onclick = () => { cfg.custom.splice(Number(b.dataset.rm), 1); save(); draw(); }));
      sh.querySelectorAll('[data-up]').forEach((b) => (b.onclick = () => { const i = Number(b.dataset.up); if (i > 0) { const a = cfg.custom; [a[i - 1], a[i]] = [a[i], a[i - 1]]; save(); draw(); } }));
      const ab = sh.querySelector('#csAddBtn'); if (ab) ab.onclick = () => { cfg.custom = cfg.custom || []; if (cfg.custom.length >= 12) { showToast('Max 12 moves'); return; } cfg.custom.push(sh.querySelector('#csAdd').value); save(); draw(); };
      const cp = sh.querySelector('#csCopy'); if (cp) cp.onclick = () => { cfg.custom = cfg.preset === 'random' ? randomRound() : listFor(cfg); cfg.preset = 'custom'; save(); draw(); };
      sh.querySelector('#csVoice').onchange = (e) => { cfg.voice = e.target.checked; save(); };
      sh.querySelector('#csGo').onclick = start;
    };
    draw();
  }
  G.circuitSetup = setup;

  // ---------------- Today card ----------------
  function renderCard() {
    const el = document.getElementById('circuitCard'); if (!el) return;
    const p = PRESETS[C.cfg.preset] || PRESETS.full;
    const last = C.history[0]; const best = C.history.reduce((a, h) => Math.max(a, h.rounds), 0);
    const todayRounds = C.history.filter((h) => h.date === dateKey(new Date())).reduce((a, h) => a + h.rounds, 0);
    el.innerHTML = `<div class="card circuit-card"><div class="cardhead"><h2>🔁 Circuit</h2><span class="muted">${C.cfg.work}s on · ${C.cfg.rest}s off · ${C.cfg.brk}s break</span></div>
      <div class="cc-row"><div class="cc-ico">${p.icon}</div><div style="flex:1"><div class="cc-name">${p.name}</div>
      <div class="muted">${last ? `Last: ${last.rounds} rounds · ${last.reps} reps · ${fmt(last.secs)}` : 'Whole-body intervals until you drop'}${best ? ` · Best ${best} rounds` : ''}${todayRounds ? ` · Today ${todayRounds}` : ''}</div></div></div>
      <div class="row2"><button class="gbtn" id="ccStart">▶ Start</button><button class="gbtn ghost" id="ccSetup">⚙ Setup</button></div></div>`;
    el.querySelector('#ccStart').onclick = start;
    el.querySelector('#ccSetup').onclick = setup;
  }
  G.on && G.on('render', () => { try { renderCard(); } catch (e) { console.warn('circuit', e); } });
  renderCard();

  // test hooks
  G._circuit = { next: () => next(), get: () => R, finish: () => { commitPending(); finish(); }, start };
})();
