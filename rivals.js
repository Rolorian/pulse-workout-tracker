/* Pulse — AI rivals & weekly leagues.
   Rival progress is generated from a seed per rival+week+day, so it keeps "happening"
   while the app is closed and is identical every time you open it.
   Rivals are rubber-banded to your own recent weekly XP so the race stays close. */
(function () {
  const G = (window.G = window.G || {});
  const RKEY = 'pulse-rivals-v1';
  const LEAGUES = [
    { name: 'Bronze', icon: '🥉', color: '#cd7f32', mult: 0.7 }, { name: 'Silver', icon: '🥈', color: '#c0c7d0', mult: 0.85 },
    { name: 'Gold', icon: '🥇', color: '#f5c542', mult: 1 }, { name: 'Platinum', icon: '💠', color: '#7fe3d8', mult: 1.15 },
    { name: 'Diamond', icon: '💎', color: '#7fdcff', mult: 1.3 }, { name: 'Master', icon: '🔮', color: '#b48cff', mult: 1.5 },
    { name: 'Grandmaster', icon: '👑', color: '#ff5d8f', mult: 1.75 }
  ];
  const RIVALS = [
    { id: 'gary', name: 'Gym Bro Gary', emoji: '🏋️', skill: 1.0, cons: 0.85, vol: 0.25,
      pass: ['Bro. BRO. Just passed you 💪', 'Gains don\'t sleep, and neither do I'], passed: ['Respect bro, respect… for now', 'You\'re lifting different this week 👀'],
      lead: ['Top of the board, where I belong'], win: 'Gary\'s Lucky Lifting Belt' },
    { id: 'kate', name: 'Cardio Kate', emoji: '🏃', skill: 1.05, cons: 0.8, vol: 0.35,
      pass: ['Lapped you 🏃💨', 'Keep up! Oh wait, you can\'t'], passed: ['Okay that was a sprint finish, fair', 'I\'ll catch you on the next lap'],
      lead: ['10k before breakfast, what did you do?'], win: 'Kate\'s Carbon Spikes' },
    { id: 'larry', name: 'Lazy Larry', emoji: '🛋️', skill: 0.7, cons: 0.45, vol: 0.9,
      pass: ['Wait… I\'m beating someone? 😂', 'Did one push-up. Passed you. Wild.'], passed: ['Yeah fair, I\'m on the sofa', 'Wake me when the week\'s over'],
      lead: ['Somehow I\'m winning. Don\'t ask.'], win: 'Larry\'s Golden Remote' },
    { id: 'machine', name: 'The Machine', emoji: '🤖', skill: 1.35, cons: 0.97, vol: 0.1,
      pass: ['OVERTAKE COMPLETE.', 'Human output: insufficient.'], passed: ['ANOMALY DETECTED. Recalibrating.', 'Unexpected. Increasing power.'],
      lead: ['Efficiency: 100%.'], win: 'Core of The Machine' },
    { id: 'yuki', name: 'Yoga Yuki', emoji: '🧘', skill: 0.9, cons: 0.92, vol: 0.2,
      pass: ['Slow and steady 🧘', 'Breathe. I just passed you.'], passed: ['Namaste… you earned that', 'Balance will return'],
      lead: ['Consistency is the real flex'], win: 'Yuki\'s Zen Mat' },
    { id: 'brick', name: 'Big Brick', emoji: '🦍', skill: 1.2, cons: 0.6, vol: 0.6,
      pass: ['BRICK SMASH 🦍', 'Big lift day. You\'re behind.'], passed: ['Brick… rests. Brick back tomorrow.', 'GRR. Good lift.'],
      lead: ['Brick on top'], win: 'Brick\'s Wrecking Plate' },
    { id: 'sofia', name: 'Sprint Sofia', emoji: '⚡', skill: 1.1, cons: 0.7, vol: 0.5,
      pass: ['Zoom ⚡ see ya', 'Too fast, too furious'], passed: ['Okay you got a burst in, nice', 'Watch me snap back'],
      lead: ['Fastest on the board'], win: 'Sofia\'s Lightning Band' },
    { id: 'dave', name: 'Dad-Bod Dave', emoji: '🍔', skill: 0.8, cons: 0.65, vol: 0.5,
      pass: ['Dad strength activated 👨', 'Passed you between school runs'], passed: ['Kids kept me up, fair play', 'You\'re young, enjoy it'],
      lead: ['Not bad for a dad, eh?'], win: 'Dave\'s Grill Tongs of Power' }
  ];

  // Signature items — only drop from beating that rival in a weekly duel
  G.registerItems && G.registerItems([
    { id: 'rv_gary', name: 'Gary\'s Lucky Lifting Belt', icon: '🥋', tier: 3, type: 'gear', slot: 'amulet', stats: { power: 14, xp: 6 }, rival: 'gary', special: true, desc: 'Smells of protein shakes and victory.' },
    { id: 'rv_kate', name: 'Kate\'s Carbon Spikes', icon: '👟', tier: 4, type: 'gear', slot: 'boots', stats: { coin: 22, luck: 10 }, rival: 'kate', special: true, desc: 'Still warm from her last 10k.' },
    { id: 'rv_larry', name: 'Larry\'s Golden Remote', icon: '📺', tier: 3, type: 'gear', slot: 'weapon', stats: { power: 10, luck: 25 }, rival: 'larry', special: true, desc: 'Never once left the sofa. Somehow lucky.' },
    { id: 'rv_machine', name: 'Core of The Machine', icon: '⚙️', tier: 6, type: 'gear', slot: 'amulet', stats: { power: 45, xp: 35, crit: 10 }, rival: 'machine', special: true, desc: 'It still hums with tireless output.' },
    { id: 'rv_yuki', name: 'Yuki\'s Zen Mat', icon: '🧘', tier: 4, type: 'gear', slot: 'body', stats: { xp: 30, luck: 10 }, rival: 'yuki', special: true, desc: 'Inner peace, +30% XP.' },
    { id: 'rv_brick', name: 'Brick\'s Wrecking Plate', icon: '🧱', tier: 5, type: 'gear', slot: 'weapon', stats: { power: 70 }, rival: 'brick', special: true, desc: 'BRICK SMASH.' },
    { id: 'rv_sofia', name: 'Sofia\'s Lightning Band', icon: '⚡', tier: 4, type: 'gear', slot: 'ring', stats: { crit: 18, coin: 12 }, rival: 'sofia', special: true, desc: 'Crackles when you sprint.' },
    { id: 'rv_dave', name: 'Dave\'s Grill Tongs of Power', icon: '🍖', tier: 3, type: 'gear', slot: 'gloves', stats: { crit: 10, coin: 15 }, rival: 'dave', special: true, desc: 'Flip burgers. Flip opponents.' },
    { id: 'title_nemesis', name: 'Nemesis Slayer', icon: '🏷️', tier: 5, type: 'title', special: true, rival: 'nemesis', desc: 'Beat your Nemesis in a duel' }
  ]);

  let R;
  try { R = JSON.parse(localStorage.getItem(RKEY) || 'null'); } catch (e) { R = null; }
  if (!R) R = {};
  R.league = R.league || 0; R.feed = R.feed || []; R.history = R.history || []; R.duelRecord = R.duelRecord || {}; R.lossStreak = R.lossStreak || {};
  const save = () => localStorage.setItem(RKEY, JSON.stringify(R));

  // ---------- week helpers ----------
  function weekStart(d) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate()); const wd = (x.getDay() + 6) % 7; x.setDate(x.getDate() - wd); return x; }
  function wk(d) { return dateKey(weekStart(d)); }
  function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function weekRange(startKey) { const [y, m, dd] = startKey.split('-').map(Number); const s = new Date(y, m - 1, dd); return { s, e: addDays(s, 6), sk: startKey, ek: dateKey(addDays(s, 6)) }; }

  function userWeekXP(startKey) { const r = weekRange(startKey); return Math.round(workouts.filter((w) => w.date >= r.sk && w.date <= r.ek).reduce((a, w) => a + xpForWorkout(w), 0)); }
  function refXP(startKey) {
    // average of your previous 4 weeks (ignoring empty weeks), floored so new users still get a race
    const r = weekRange(startKey); const vals = [];
    for (let i = 1; i <= 4; i++) { const k = dateKey(addDays(r.s, -7 * i)); const v = userWeekXP(k); if (v > 0) vals.push(v); }
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return Math.max(350, avg);
  }

  function rivalWeek(rv, startKey, league, now) {
    const rnd = G.seeded(rv.id + startKey);
    const nem = R.nemesis === rv.id ? 1.15 : 1;
    const target = refXP(startKey) * rv.skill * LEAGUES[league].mult * nem * (0.75 + rnd() * 0.5);
    const per = target / (7 * rv.cons);
    const r = weekRange(startKey);
    let total = 0;
    for (let i = 0; i < 7; i++) {
      const day = addDays(r.s, i); const dk = dateKey(day);
      const dr = G.seeded(rv.id + dk);
      const trains = dr() < rv.cons; const gain = per * (1 + (dr() * 2 - 1) * rv.vol);
      if (!trains) continue;
      if (now) {
        const nk = dateKey(now);
        if (dk > nk) break;
        if (dk === nk) { const hr = now.getHours() + now.getMinutes() / 60; const startH = 6 + dr() * 12; total += gain * Math.max(0, Math.min(1, (hr - startH) / 2)); break; }
      }
      total += gain;
    }
    return Math.round(total);
  }

  function standings(startKey, now) {
    const rows = RIVALS.map((rv) => ({ id: rv.id, rv, xp: rivalWeek(rv, startKey, R.league, now) }));
    rows.push({ id: 'you', xp: userWeekXP(startKey) });
    rows.sort((a, b) => b.xp - a.xp || (a.id === 'you' ? -1 : 1));
    return rows;
  }

  // ---------- duels ----------
  function userExReps(ex, sk, ek) { return workouts.filter((w) => w.exercise === ex && w.date >= sk && w.date <= ek && w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0); }
  function duelTarget(d) {
    const r = weekRange(d.week); const vals = [];
    for (let i = 1; i <= 4; i++) { const s = addDays(r.s, -7 * i); const v = userExReps(d.exercise, dateKey(s), dateKey(addDays(s, 6))); if (v) vals.push(v); }
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    const rv = RIVALS.find((x) => x.id === d.rival); const rnd = G.seeded('duel' + d.rival + d.week + d.exercise);
    return Math.round(Math.max(80, avg) * rv.skill * (R.nemesis === rv.id ? 1.15 : 1) * (0.85 + rnd() * 0.4));
  }
  function duelRivalProgress(d, now) {
    const target = duelTarget(d); const rv = RIVALS.find((x) => x.id === d.rival);
    const full = rivalWeek(rv, d.week, R.league, null) || 1;
    const sofar = now ? rivalWeek(rv, d.week, R.league, now) : full;
    return Math.round(target * Math.min(1, sofar / full));
  }

  function openDuelPicker() {
    const exs = sortForStyle(pickableExercises().filter((e) => e.unit === 'reps'));
    const html = `<div class="casino"><div class="cz-title">⚔️ Weekly 1v1 Duel</div>
      <div class="muted">Pick a rival and an exercise. Most reps of it by Sunday night wins. Beat them to win their signature item.</div>
      <div class="duel-pick">${RIVALS.map((rv, i) => `<button class="chip ${i === 0 ? 'on' : ''}" data-rv="${rv.id}">${rv.emoji} ${rv.name.split(' ').slice(-1)[0]}${R.nemesis === rv.id ? ' 👹' : ''}</button>`).join('')}</div>
      <select id="duelEx" class="ex-select">${exs.map((e) => `<option value="${escAttr(e.name)}">${e.icon} ${esc(e.name)}</option>`).join('')}</select>
      <div class="muted" id="duelPrize"></div>
      <button class="gbtn" id="duelGo">Throw down the gauntlet</button></div>`;
    const sh = G.sheet(html, { center: true });
    let pick = RIVALS[0].id;
    const prize = () => { const it = G.item('rv_' + pick); sh.querySelector('#duelPrize').innerHTML = it ? `Prize: <b style="color:${G.TIERS[it.tier].color}">${it.icon} ${esc(it.name)}</b>` : ''; };
    prize();
    sh.querySelectorAll('[data-rv]').forEach((b) => (b.onclick = () => { pick = b.dataset.rv; sh.querySelectorAll('[data-rv]').forEach((x) => x.classList.toggle('on', x === b)); prize(); }));
    sh.querySelector('#duelGo').onclick = () => {
      R.duel = { week: wk(new Date()), rival: pick, exercise: sh.querySelector('#duelEx').value };
      save(); G.closeSheet();
      const rv = RIVALS.find((x) => x.id === pick);
      pushFeed(rv, `${rv.name}: "${['You\'re on.', 'Bring it.', 'See you Sunday.'][Math.floor(Math.random() * 3)]}"`);
      if (typeof haptic === 'function') haptic('heavy'); G.sfx && G.sfx('crit');
      G.renderRivals();
    };
  }

  // ---------- feed / trash talk ----------
  function pushFeed(rv, text) { R.feed.unshift({ t: Date.now(), e: rv ? rv.emoji : '📣', text }); R.feed = R.feed.slice(0, 12); save(); }
  const pick = (a) => a[Math.floor(Math.random() * a.length)];

  function checkOvertakes(rows) {
    const youIdx = rows.findIndex((r) => r.id === 'you');
    const above = new Set(rows.slice(0, youIdx).map((r) => r.id));
    if (R.above && R.aboveWeek === wk(new Date())) {
      const prev = new Set(R.above);
      let toasted = false;
      RIVALS.forEach((rv) => {
        if (above.has(rv.id) && !prev.has(rv.id)) { const t = `${rv.name}: "${pick(rv.pass)}"`; pushFeed(rv, t); if (!toasted) { showToast(`${rv.emoji} ${rv.name} overtook you!`, null, null, 3500); toasted = true; } }
        if (!above.has(rv.id) && prev.has(rv.id)) { const t = `${rv.name}: "${pick(rv.passed)}"`; pushFeed(rv, t); if (!toasted) { showToast(`🔥 You overtook ${rv.name}!`, null, null, 3500); G.sparks && G.sparks(innerWidth / 2, 120, '#49e39a', 30); toasted = true; } }
      });
    }
    R.above = [...above]; R.aboveWeek = wk(new Date()); save();
  }

  // ---------- week rollover ----------
  function rollover() {
    const cur = wk(new Date());
    if (!R.week) { R.week = cur; save(); return; }
    if (R.week === cur) return;
    const last = R.week;
    const rows = standings(last, null);
    const rank = rows.findIndex((r) => r.id === 'you') + 1;
    const before = R.league;
    if (rank <= 3 && R.league < LEAGUES.length - 1) R.league++;
    else if (rank >= 8 && R.league > 0) R.league--;
    const pay = [[600, 8], [400, 5], [250, 3], [100, 0], [100, 0], [100, 0], [25, 0], [25, 0], [25, 0]][rank - 1];
    const lg = LEAGUES[R.league];
    R.history.unshift({ week: last, rank, league: before }); R.history = R.history.slice(0, 20);
    // league nemesis tracking: whoever won the week while you weren't first
    if (rank > 1) { const top = rows[0].id; R.lossStreak[top] = (R.lossStreak[top] || 0) + 1; } else R.lossStreak = {};
    // duel result
    let duelMsg = '';
    if (R.duel && R.duel.week === last) {
      const d = R.duel; const rv = RIVALS.find((x) => x.id === d.rival);
      const mine = userExReps(d.exercise, weekRange(last).sk, weekRange(last).ek); const theirs = duelRivalProgress(d, null);
      const rec = (R.duelRecord[d.rival] = R.duelRecord[d.rival] || { w: 0, l: 0 });
      if (mine > theirs) {
        rec.w++; R.lossStreak[d.rival] = 0;
        const items = ['rv_' + d.rival]; if (R.nemesis === d.rival) { items.push('title_nemesis'); R.nemesis = null; pushFeed(rv, `👹 Nemesis defeated! ${rv.name} retreats…`); }
        G.reward && G.reward({ coins: 500, gems: 5, items }, { label: `⚔️ Duel won vs ${rv.name}!` });
        duelMsg = ` · Duel WON vs ${rv.name}`;
      } else { rec.l++; R.lossStreak[d.rival] = (R.lossStreak[d.rival] || 0) + 1; duelMsg = ` · Duel lost vs ${rv.name}`; pushFeed(rv, `${rv.name}: "${pick(rv.lead)}"`); }
    }
    Object.keys(R.lossStreak).forEach((id) => { if (R.lossStreak[id] >= 3 && R.nemesis !== id) { R.nemesis = id; const rv = RIVALS.find((x) => x.id === id); pushFeed(rv, `👹 ${rv.name} has become your NEMESIS. Beat them in a duel to break the curse.`); } });
    R.week = cur; R.above = null; save();
    G.reward && G.reward({ coins: pay[0], gems: pay[1] }, { label: `🏆 Week over: #${rank} in ${LEAGUES[before].name}${R.league > before ? ` → PROMOTED to ${lg.name}!` : R.league < before ? ` → relegated to ${lg.name}` : ''}${duelMsg}` });
    if (R.league > before) { G.fireworks && G.fireworks(5); pushFeed(null, `📈 Promoted to ${lg.icon} ${lg.name} League!`); }
    else if (R.league < before) pushFeed(null, `📉 Relegated to ${lg.icon} ${lg.name} League`);
  }

  function ago(t) { const m = Math.floor((Date.now() - t) / 60000); if (m < 1) return 'now'; if (m < 60) return m + 'm'; const h = Math.floor(m / 60); return h < 24 ? h + 'h' : Math.floor(h / 24) + 'd'; }

  G.renderRivals = function () {
    const el = document.getElementById('rivalBoard'); if (!el) return;
    rollover();
    const cur = wk(new Date()); const now = new Date();
    const rows = standings(cur, now);
    checkOvertakes(rows);
    const lg = LEAGUES[R.league];
    const end = addDays(weekRange(cur).s, 7); const hrs = Math.max(0, Math.round((end - now) / 3600000));
    const timer = document.getElementById('leagueTimer'); if (timer) timer.textContent = hrs > 48 ? `${Math.floor(hrs / 24)}d left` : `${hrs}h left`;
    const max = Math.max(1, rows[0].xp);
    let duelHtml = '';
    if (R.duel && R.duel.week === cur) {
      const d = R.duel; const rv = RIVALS.find((x) => x.id === d.rival);
      const mine = userExReps(d.exercise, weekRange(cur).sk, weekRange(cur).ek); const theirs = duelRivalProgress(d, now); const tgt = duelTarget(d);
      const m2 = Math.max(mine, tgt, 1);
      duelHtml = `<div class="duel"><div class="duel-h">⚔️ Duel: ${esc(d.exercise)} vs ${rv.emoji} ${rv.name}${R.nemesis === rv.id ? ' 👹' : ''}</div>
        <div class="duel-row"><span>You</span><div class="dbar"><div style="width:${mine / m2 * 100}%;background:var(--accent)"></div></div><b>${mine}</b></div>
        <div class="duel-row"><span>${rv.emoji}</span><div class="dbar"><div style="width:${theirs / m2 * 100}%;background:var(--red)"></div></div><b>${theirs}</b></div>
        <div class="muted">${mine > theirs ? '🟢 You\'re ahead' : '🔴 Behind — log more ' + esc(d.exercise)} · ends Sunday midnight</div></div>`;
    } else duelHtml = `<button class="gbtn ghost" id="duelBtn">⚔️ Challenge a rival to a 1v1 duel</button>`;
    el.innerHTML = `
      <div class="league-head" style="--lc:${lg.color}"><span class="lg-ico">${lg.icon}</span><div><b>${lg.name} League</b><div class="muted">Top 3 promote · bottom 2 relegate · ranked on weekly XP</div></div></div>
      <div class="board">${rows.map((r, i) => {
        const you = r.id === 'you'; const zone = i < 3 ? 'up' : i >= 7 ? 'down' : '';
        const name = you ? 'You' : r.rv.name; const em = you ? '🫵' : r.rv.emoji;
        return `<div class="brow ${you ? 'you' : ''} ${zone}"><span class="rk">${i + 1}</span><span class="em">${em}</span>
          <div class="bmain"><div class="bname">${esc(name)}${!you && R.nemesis === r.id ? ' <span class="nem">NEMESIS</span>' : ''}</div><div class="bbar"><div style="width:${r.xp / max * 100}%"></div></div></div>
          <span class="bxp">${r.xp.toLocaleString()}</span></div>`;
      }).join('')}</div>
      ${duelHtml}
      ${R.feed.length ? `<div class="feed">${R.feed.slice(0, 5).map((f) => `<div class="fi"><span>${f.e}</span><span class="ft">${esc(f.text)}</span><span class="fa">${ago(f.t)}</span></div>`).join('')}</div>` : ''}`;
    const db = document.getElementById('duelBtn'); if (db) db.onclick = openDuelPicker;
  };

  // the Realm's wandering buddies read the live league here
  G.rivalRoster = function () {
    const sk = wk(new Date()); const rows = standings(sk, new Date());
    const out = rows.filter((r) => r.id !== 'you').map((r) => ({ id: r.id, name: r.rv.name, emoji: r.rv.emoji, xp: r.xp, rank: rows.indexOf(r) + 1, pass: r.rv.pass, lead: r.rv.lead }));
    out.week = sk; return out;
  };
  G.rivalSummary = function () {
    const rows = standings(wk(new Date()), new Date()); const i = rows.findIndex((x) => x.id === 'you');
    const above = i > 0 ? rows[i - 1] : null;
    return { rank: i + 1, league: LEAGUES[R.league].icon + ' ' + LEAGUES[R.league].name, above: above ? { name: above.rv.name, gap: above.xp - rows[i].xp } : null };
  };
  G.on && G.on('render', () => { try { G.renderRivals(); } catch (e) { console.warn('rivals', e); } });
})();
