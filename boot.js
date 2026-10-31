/* Pulse — Boot-up HUD. A 2-second sci-fi status readout when you open the app. Tap to skip. */
(function () {
  const G = (window.G = window.G || {});
  const BKEY = 'pulse-boot-last';
  let hiddenAt = null;

  function lines() {
    const L = [];
    const pad = (k) => (k + ' ').padEnd(12, '·') + ' ';
    try { const h = G.hero(); const H = G.heroState(); L.push([pad('HERO'), `${H.name} · ${h.cls.icon} ${h.cls.name} · Lv ${h.level}`, h.cls.color]); } catch (e) {}
    try { const m = G.heroMood && G.heroMood(); const q = G.heroRequestOpen && G.heroRequestOpen(); if (m) L.push([pad('MOOD'), `${m.icon} ${m.word}${q ? ' · has a request for you' : ''}${G.unreadLetters && G.unreadLetters() ? ` · 📬 ${G.unreadLetters()} letter${G.unreadLetters() > 1 ? 's' : ''}` : ''}`, '#ff9fd0']); } catch (e) {}
    try { const t = G.towerStatus && G.towerStatus(); if (t) L.push([pad('TOWER'), `${t.height} blocks · this week ${t.thisN}/${t.goal}${t.wobble ? ' · ⚠ WOBBLING' : ''}`, t.wobble ? '#ff6b7a' : '#a7b4c2']); } catch (e) {}
    try { const s = getStreak(); L.push([pad('STREAK'), s ? `${s} day${s > 1 ? 's' : ''} 🔥` : 'offline — train today to reignite', s ? '#ffb86b' : '#ff6b7a']); } catch (e) {}
    try {
      const P = G._plank && G._plank.state();
      if (P && P.active) { const T = G.PLANK_TARGET || 5; const m = P.days[dateKey(new Date())] || 0; const day = Math.round((new Date(dateKey(new Date())) - new Date(P.start)) / 86400000) + 1; L.push([pad('PLANK'), m >= T ? `Day ${day}/30 ✓ done${m > T ? ` (+${m - T} bonus)` : ''}` : `Day ${day}/30 · ${T - m} min left today`, m >= T ? '#49e39a' : '#f5c542']); }
    } catch (e) {}
    try { const q = getDailyQuests(); checkQuestProgress(q.quests); const d = q.quests.filter((x) => x.done).length; L.push([pad('QUESTS'), `${d}/3 complete${d < 3 ? ' · ' + q.quests.find((x) => !x.done).desc : ''}`, d === 3 ? '#49e39a' : '#5aa8ff']); } catch (e) {}
    try { const r = G.rivalSummary && G.rivalSummary(); if (r) L.push([pad('LEAGUE'), `#${r.rank} ${r.league}${r.above ? ` · ${r.above.name} +${r.above.gap} XP ahead` : ' · leading the pack 👑'}`, r.rank <= 3 ? '#49e39a' : r.rank >= 8 ? '#ff6b7a' : '#c9d3dd']); } catch (e) {}
    try { const ev = G.eventMods && G.eventMods(); const strip = document.getElementById('eventStrip'); if (strip && strip.style.display !== 'none') L.push([pad('EVENT'), strip.textContent.replace('›', '').trim(), '#ffb84d']); } catch (e) {}
    try { const e = G.encounterStatus && G.encounterStatus(); if (e) L.push([pad('ENCOUNTER'), `${e.icon} ${e.name} spotted · ${e.mins} min`, '#ffd23f']); } catch (e) {}
    try { const g = G.galaxyStatus && G.galaxyStatus(); if (g) L.push([pad('GALAXY'), g.shooting ? `🌠 shooting star detected · ${g.shooting} min` : g.hole ? `⚫ black hole forming — ${g.away} days away` : `${g.stars} stars charted`, g.shooting ? '#bfe6ff' : g.hole ? '#ff6b7a' : '#b48cff']); } catch (e) {}
    try { const v = G.villageSummary && G.villageSummary(); if (v) L.push([pad('VILLAGE'), `${v.restored}/10 restored${v.next ? ` · ${v.next.name} ${v.next.pct}%` : ' · fully rebuilt 👑'}`, '#c9a27a']); } catch (e) {}
    try { const p = G.activePet && G.activePet(); if (p) L.push([pad('PET'), `${p.icon} ${p.nick || p.name} is following you`, '#ffe066']); } catch (e) {}
    try { const s = G.state(); L.push([pad('WALLET'), `🪙 ${s.coins.toLocaleString()} · 💎 ${s.gems}`, '#f5c542']); } catch (e) {}
    return L;
  }

  function boot(force) {
    if (window.__PULSE_TEST) return;
    if (typeof settings !== 'undefined' && settings.bootHud === false && !force) return;
    if (document.getElementById('bootHud')) return;
    G.bootActive = true;
    localStorage.setItem(BKEY, String(Date.now()));
    const L = lines();
    const el = document.createElement('div'); el.id = 'bootHud'; el.className = 'boot';
    const now = new Date();
    el.innerHTML = `<div class="boot-scan"></div><div class="boot-frame">
      <div class="boot-title"><span class="boot-logo">PULSE</span><span class="boot-ver">OS v9 // ${now.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })} ${now.toTimeString().slice(0, 5)}</span></div>
      <div class="boot-lines" id="bootLines"></div>
      <div class="boot-bar"><div id="bootBar"></div></div>
      <div class="boot-go" id="bootGo">INITIALISING…</div></div><div class="boot-skip">tap to skip</div>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('on'));
    const box = el.querySelector('#bootLines'); const bar = el.querySelector('#bootBar');
    let i = 0, done = false; const timers = [];
    const step = 190;
    try { initAudio(); } catch (e) {}
    L.forEach((ln, idx) => {
      timers.push(setTimeout(() => {
        const row = document.createElement('div'); row.className = 'boot-line';
        row.innerHTML = `<span class="bl-k">▸ ${ln[0]}</span><span class="bl-v" style="color:${ln[2]}"></span>`;
        box.appendChild(row);
        const v = row.querySelector('.bl-v'); const txt = ln[1]; let c = 0;
        const typer = setInterval(() => { c += 3; v.textContent = txt.slice(0, c); if (c >= txt.length) clearInterval(typer); }, 14);
        timers.push(typer);
        bar.style.width = ((idx + 1) / L.length * 100) + '%';
        try { if (settings.sound) playNote(660 + idx * 70, 0.04, audioCtx.currentTime, { gain: 0.04, type: 'square' }); } catch (e) {}
        if (typeof haptic === 'function') haptic('selection');
      }, 250 + idx * step));
    });
    const total = 250 + L.length * step + 450;
    timers.push(setTimeout(() => {
      const go = el.querySelector('#bootGo'); go.textContent = 'ALL SYSTEMS GO ▮'; go.classList.add('ok');
      try { if (settings.sound) { const n = audioCtx.currentTime; playNote(880, 0.08, n, { gain: 0.08 }); playNote(1320, 0.22, n + 0.08, { gain: 0.08 }); } } catch (e) {}
      if (typeof haptic === 'function') haptic('success');
    }, total - 300));
    timers.push(setTimeout(close, total + 450));
    el.addEventListener('click', close);
    function close() {
      if (done) return; done = true;
      timers.forEach((t) => { clearTimeout(t); clearInterval(t); });
      el.classList.add('out');
      const app = document.querySelector('.app'); if (app) { app.classList.remove('power-on'); void app.offsetWidth; app.classList.add('power-on'); }
      setTimeout(() => { el.remove(); G.bootActive = false; G.flushCeremonies && G.flushCeremonies(); setTimeout(() => G.rollEncounter && G.rollEncounter(), 600); }, 380);
    }
  }
  G.boot = boot;

  // On launch (unless opened in the last 5 minutes) and when coming back after 30+ minutes away
  const last = Number(localStorage.getItem(BKEY) || 0);
  if (Date.now() - last > 5 * 60000) setTimeout(boot, 120);
  else setTimeout(() => G.rollEncounter && G.rollEncounter(), 1500);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') hiddenAt = Date.now();
    else if (hiddenAt && Date.now() - hiddenAt > 30 * 60000) { hiddenAt = null; boot(); }
  });
})();
