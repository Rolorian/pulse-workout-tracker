/* Pulse — your hero comes to life: mood, letters, dreams that come true, daily requests + Bond, and growing up. */
(function () {
  const G = (window.G = window.G || {});
  const KEY = 'pulse-herolife-v1';
  let L; try { L = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { L = null; }
  if (!L) L = {};
  L.letters = L.letters || []; L.sent = L.sent || {}; L.seen = L.seen || {}; L.bond = L.bond || 0;
  const save = () => localStorage.setItem(KEY, JSON.stringify(L));
  const DAY = 86400000;
  const today = () => dateKey(new Date());
  const addDays = (k, n) => { const [y, m, d] = k.split('-').map(Number); const x = new Date(y, m - 1, d); x.setDate(x.getDate() + n); return dateKey(x); };
  const between = (a, b) => { const [y1, m1, d1] = a.split('-').map(Number); const [y2, m2, d2] = b.split('-').map(Number); return Math.round((new Date(y2, m2 - 1, d2) - new Date(y1, m1 - 1, d1)) / DAY); };
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  const heroName = () => (G.heroState ? G.heroState().name : 'Hero');
  const trainedOn = (k) => workouts.some((w) => w.date === k);
  function lastTrainDate() { let d = null; workouts.forEach((w) => { if (w.date && (!d || w.date > d)) d = w.date; }); return d; }
  function daysAway() { const d = lastTrainDate(); return d ? Math.max(0, between(d, today())) : 99; }

  // =====================================================================
  // GROWING UP
  // =====================================================================
  const STAGES = [
    { name: 'Recruit', icon: '🌱', at: 0, look: 'Fresh-faced and eager' },
    { name: 'Adventurer', icon: '🗡️', at: 10, look: 'Earns a cape in your class colour' },
    { name: 'Veteran', icon: '🛡️', at: 30, look: 'Shoulder guards and a battle scar' },
    { name: 'Champion', icon: '🏅', at: 75, look: 'A longer, flowing cape and bigger arms' },
    { name: 'Legend', icon: '👑', at: 150, look: 'A gold-trimmed cape and a proper beard' },
    { name: 'Mythic', icon: '🌟', at: 300, look: 'Glowing eyes and orbiting runes' }
  ];
  G.HERO_STAGES = STAGES;
  G.heroGrowth = function () {
    const days = new Set(workouts.map((w) => w.date)).size;
    let s = 0; STAGES.forEach((st, i) => { if (days >= st.at) s = i; });
    const next = STAGES[s + 1];
    return { stage: s, name: STAGES[s].name, icon: STAGES[s].icon, days, next: next || null, pct: next ? (days - STAGES[s].at) / (next.at - STAGES[s].at) : 1 };
  };

  // =====================================================================
  // MOOD
  // =====================================================================
  function mood() {
    const away = daysAway();
    let questsDone = 0; try { questsDone = getDailyQuests().quests.filter((q) => q.done).length; } catch (e) {}
    const req = L.req && L.req.date === today() && L.req.done;
    if (away === 0 && (questsDone >= 2 || req)) return { id: 'thrilled', icon: '🤩', word: 'Thrilled', lines: ['That was a proper session. I feel unstoppable!', 'We are on FIRE today.', 'Best training day this week, easy.'] };
    if (away === 0) return { id: 'happy', icon: '😄', word: 'Happy', lines: ['Good work today! Fancy one more set?', 'My muscles are buzzing. In a good way.', 'Another day, another step forward.'] };
    if (away === 1) return { id: 'content', icon: '🙂', word: 'Content', lines: ['Rested and ready when you are.', 'Yesterday was good. Today could be better?', 'I\'ve been stretching. Just in case.'] };
    if (away <= 3) return { id: 'restless', icon: '😤', word: 'Restless', lines: ['I\'m getting twitchy… shall we train?', 'The goblins won\'t fight themselves.', `It's been ${away} days. My sword arm is itching.`] };
    if (away <= 6) return { id: 'bored', icon: '😑', word: 'Bored', lines: ['I\'ve counted every brick in the Tavern. Twice.', 'Even the pets are bored.', `${away} days… are we still a team?`] };
    return { id: 'lonely', icon: '🥺', word: 'Lonely', lines: ['I keep the cape folded for you.', 'The village is quiet without you.', 'Just two minutes? I miss training with you.'] };
  }
  G.heroMood = mood;

  // =====================================================================
  // BOND (from completed requests)
  // =====================================================================
  const BOND_AT = [0, 3, 7, 12, 18, 25, 33, 42, 52, 63];
  function bondLevel() { let l = 1; BOND_AT.forEach((v, i) => { if (L.bond >= v) l = i + 1; }); return l; }
  G.bondBonus = () => ({ xp: bondLevel() - 1 });
  G.bondLevel = bondLevel;

  // =====================================================================
  // REQUESTS
  // =====================================================================
  const CAT_NAME = { legs: 'legs', chest: 'chest', core: 'core', upper: 'arms', cardio: 'lungs' };
  function poolFor(cat) { const p = questExercisePool('reps'); if (cat === 'upper') return p.filter((e) => e.cat === 'arms' || e.cat === 'back'); return p.filter((e) => e.cat === cat); }
  function makeRequest() {
    const opts = [];
    let hero = null; try { hero = G.hero(); } catch (e) {}
    if (hero && hero.weak.length) { const [id, , , ] = hero.weak[0]; const pool = poolFor(id); if (pool.length) { const e = pick(pool); const n = HARD_BODYWEIGHT.has(e.name) ? 15 : 30; opts.push({ w: 5, type: 'weak', text: `My ${CAT_NAME[id] || id} feel weak… can we do ${n} ${e.name} today?`, ex: e.name, n, metric: 'reps' }); } }
    try { const P = G._plank && G._plank.state(); const T = G.PLANK_TARGET || 5; if (P && P.active && (P.days[today()] || 0) < T) opts.push({ w: 4, type: 'plank', text: `Let's knock out today's plank — ${T} minutes. I'll hold it with you.`, n: T, metric: 'plank' }); } catch (e) {}
    try {
      const xpMap = getSkillXPMap(); const pool = questExercisePool('reps').map((e) => e.name);
      const near = pool.map((n) => { const xp = xpMap[n] || 0; if (!xp) return null; const L0 = getLevelFromXP(xp); if (L0 >= 99) return null; const need = getXPForLevel(L0 + 1) - xp; const span = getXPForLevel(L0 + 1) - getXPForLevel(L0); return need / span < 0.25 && need <= 80 ? { n, need: Math.ceil(need), lvl: L0 + 1 } : null; }).filter(Boolean);
      if (near.length) { const s = pick(near); const n = Math.max(5, s.need); opts.push({ w: 4, type: 'level', text: `I'm SO close to level ${s.lvl} ${s.n}! Just ${n} more reps?`, ex: s.n, n, metric: 'reps' }); }
    } catch (e) {}
    try { const r = G.rivalSummary && G.rivalSummary(); if (r && r.above && r.above.gap <= 200 && r.above.gap > 0) opts.push({ w: 3, type: 'rival', text: `${r.above.name} is only ${r.above.gap} XP ahead of us. One good set and we pass them!`, n: r.above.gap + 1, metric: 'xp' }); } catch (e) {}
    try {
      const cut = addDays(today(), -21); const recent = new Set(workouts.filter((w) => w.date >= cut).map((w) => w.exercise));
      const fresh = questExercisePool('reps').filter((e) => !recent.has(e.name));
      if (fresh.length) { const e = pick(fresh); const n = HARD_BODYWEIGHT.has(e.name) ? 10 : 20; opts.push({ w: 2, type: 'new', text: `Let's try something different — ${n} ${e.name}? We haven't done those in ages.`, ex: e.name, n, metric: 'reps' }); }
    } catch (e) {}
    if (!opts.length) { const e = pick(questExercisePool('reps')); opts.push({ w: 1, type: 'basic', text: `Training idea: ${HARD_BODYWEIGHT.has(e.name) ? 15 : 30} ${e.name}. You in?`, ex: e.name, n: HARD_BODYWEIGHT.has(e.name) ? 15 : 30, metric: 'reps' }); }
    const tot = opts.reduce((a, o) => a + o.w, 0); let r = Math.random() * tot; let o = opts[0];
    for (const x of opts) { r -= x.w; if (r <= 0) { o = x; break; } }
    return Object.assign({ date: today(), start: Date.now(), done: false, declined: false }, o);
  }
  function reqProgress(q) {
    const ws = workouts.filter((w) => Number(w.id) >= q.start);
    if (q.metric === 'reps') return ws.filter((w) => w.exercise === q.ex && w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
    if (q.metric === 'xp') return Math.round(ws.reduce((a, w) => a + xpForWorkout(w), 0));
    if (q.metric === 'plank') { const P = G._plank && G._plank.state(); return P ? P.days[today()] || 0 : 0; }
    return 0;
  }
  function ensureRequest() {
    if (!L.req || L.req.date !== today()) { L.req = workouts.length || new Date().getHours() >= 6 ? makeRequest() : null; save(); }
    return L.req;
  }
  function checkRequest() {
    const q = L.req; if (!q || q.date !== today() || q.done || q.declined) return;
    if (reqProgress(q) >= q.n) {
      q.done = true; L.bond++; save();
      const before = BOND_AT.filter((v) => v <= L.bond - 1).length, after = BOND_AT.filter((v) => v <= L.bond).length;
      setTimeout(() => {
        showToast(`🧬 ${heroName()}: "${pick(['Thank you! I feel stronger already.', 'YES! That\'s what I needed.', 'We make a great team.', 'Legendary. Same time tomorrow?'])}"`, null, null, 5000);
        G.reward && G.reward({ coins: 120 }, { quiet: true }); G.confetti && G.confetti(70);
        if (after > before) { showToast(`💞 Bond level ${after}! +1% XP forever`, null, null, 5000); sendLetter('bond' + after, { kind: 'bond', subject: `We're getting close (Bond ${after})`, body: [`I've been thinking about how far we've come. ${L.bond} requests, and you said yes to every one that mattered.`, 'I\'m not just a bunch of pixels with a cape any more. I\'m YOUR hero.', 'Here\'s something I\'ve been saving.'], gift: { gems: after } }); }
      }, 800);
    }
  }
  G.heroRequestOpen = () => { const q = L.req; return !!(q && q.date === today() && !q.done && !q.declined); };

  // =====================================================================
  // LETTERS
  // =====================================================================
  function sendLetter(key, l) {
    if (L.sent[key]) return false;
    L.sent[key] = Date.now();
    L.letters.unshift(Object.assign({ id: Date.now() + Math.random(), t: Date.now(), from: heroName(), fromIcon: '🧬', read: false, claimed: false }, l));
    L.letters = L.letters.slice(0, 80); save();
    return true;
  }
  G.sendLetter = sendLetter;
  G.unreadLetters = () => L.letters.filter((l) => !l.read).length;

  const VILLAGERS = { townhall: ['Mayor Pemberton', '🎩'], tavern: ['Bess the Barkeep', '🍺'], blacksmith: ['Grimbold the Smith', '⚒️'], farm: ['Farmer Wren', '🌾'], training: ['Sergeant Kane', '🎯'],
    market: ['Ozzie the Merchant', '🎪'], temple: ['Priestess Lyra', '⛩️'], sanctuary: ['Keeper Moss', '🐾'], observatory: ['Stargazer Ilo', '🔭'], castle: ['The Royal Court', '🏰'] };

  function generateLetters() {
    const name = heroName(); const away = daysAway(); const last = lastTrainDate();
    const pet = G.activePet && G.activePet();
    let cls = ''; try { cls = G.hero().cls.name; } catch (e) {}
    // --- away letters (once per absence) ---
    if (last && away >= 2) {
      const tier = away >= 14 ? 3 : away >= 7 ? 2 : away >= 4 ? 1 : 0;
      const lastW = workouts.filter((w) => w.date === last).slice(-1)[0];
      let rival = null; try { rival = G.rivalSummary(); } catch (e) {}
      const vs = G.villageSummary ? G.villageSummary() : null;
      const lines = [
        [`It's been ${away} days since we last trained. I'm not saying I've been counting… but I have.`, `The last thing we did was ${lastW ? lastW.amount + ' ' + lastW.exercise : 'a great session'}. I've been practising the form while you were away.`],
        [`${away} days. The Tavern regulars keep asking where you've gone.`, pet ? `${pet.icon} ${pet.nick || pet.name} sits by the door every morning, waiting.` : 'I sit by the door every morning, just in case.', rival && rival.above ? `${rival.above.name} has been training every day. They're ${rival.above.gap} XP ahead now.` : 'The league table is moving without us.'],
        [`It's been over a week. The goblins in Goblin Woods have started calling me "the one who used to train".`, pet ? `${pet.icon} ${pet.nick || pet.name} has stopped bringing me sticks.` : 'Even the village cats look disappointed in me.', vs && vs.next ? `The ${vs.next.name} is still ${100 - vs.next.pct}% unfinished. The villagers keep looking at the scaffolding.` : 'The village needs us.'],
        [`${away} days. A black hole has started forming at the edge of our galaxy. It's pulling our stars in.`, 'I\'m not angry. I just miss us. Remember why we started?', 'Even two minutes would push it back. I\'ll be here.']
      ][tier];
      sendLetter('away:' + last + ':' + tier, { kind: 'away', subject: ['Missing our training', 'Where did you go?', 'The village is worried', 'Please come back'][tier], body: lines.concat([`Train with me today and this gift is yours.`]), gift: { coins: 100 * Math.min(7, away), gems: tier >= 2 ? 3 : 0 }, needTrain: true });
    }
    // --- weekly recap (first open of a new week, about last week) ---
    const wkStart = (() => { const x = new Date(); x.setDate(x.getDate() - ((x.getDay() + 6) % 7)); return dateKey(x); })();
    const lastWk = addDays(wkStart, -7), lastWkEnd = addDays(wkStart, -1);
    const lw = workouts.filter((w) => w.date >= lastWk && w.date <= lastWkEnd);
    if (lw.length && !L.sent['week:' + lastWk]) {
      const days = new Set(lw.map((w) => w.date)).size; const reps = lw.filter((w) => w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
      const best = lw.filter((w) => w.unit === 'reps').sort((a, b) => b.amount - a.amount)[0];
      const top = Object.entries(lw.reduce((a, w) => ((a[w.exercise] = (a[w.exercise] || 0) + 1), a), {})).sort((a, b) => b[1] - a[1])[0];
      sendLetter('week:' + lastWk, { kind: 'week', subject: `Our week: ${days} day${days === 1 ? '' : 's'}, ${reps.toLocaleString()} reps`, body: [
        days >= 5 ? 'What. A. Week. I genuinely feel like a different hero.' : days >= 3 ? 'Solid week. Consistent. That\'s how legends are built.' : 'A quieter week, but we showed up. That counts.',
        `We trained on ${days} day${days === 1 ? '' : 's'} and did ${reps.toLocaleString()} reps.${best ? ` Our biggest set was ${best.amount} ${best.exercise}.` : ''}${top ? ` Favourite move: ${top[0]}.` : ''}`,
        cls ? `As a ${cls}, I think we should aim for ${Math.min(7, days + 1)} days this week.` : `Let's aim for ${Math.min(7, days + 1)} days this week.`], gift: { coins: 25 * days } });
    }
    // --- milestones ---
    try {
      const h = G.hero(); const lv5 = Math.floor(h.level / 5) * 5;
      if (L.seen.level == null) L.seen.level = lv5;
      else if (lv5 > L.seen.level) { L.seen.level = lv5; sendLetter('lvl' + lv5, { kind: 'milestone', subject: `Hero level ${lv5}!`, body: [`We just reached hero level ${lv5}. I had to write it down so I'd never forget.`, `Strongest stat right now? ${Object.entries(h.base).sort((a, b) => b[1] - a[1])[0].join(' ')}. Not bad for someone who started as a ${STAGES[0].name.toLowerCase()}.`], gift: { coins: lv5 * 10 } }); }
      if (L.seen.cls && L.seen.cls !== h.cls.id) sendLetter('cls:' + h.cls.id, { kind: 'milestone', subject: `I'm a ${h.cls.name} now`, body: [`Something changed in me. The way we've been training… I'm not the same hero.`, `${h.cls.icon} ${h.cls.name}: ${h.cls.desc}.`, 'I like who we\'re becoming.'] });
      L.seen.cls = h.cls.id;
    } catch (e) {}
    const g = G.heroGrowth();
    if (L.seen.stage == null) L.seen.stage = g.stage;
    else if (g.stage > L.seen.stage) { L.seen.stage = g.stage; growthCeremony(g); sendLetter('stage' + g.stage, { kind: 'milestone', subject: `I've become a ${g.name}`, body: [`${g.days} days of training together. Look at me now — ${STAGES[g.stage].look.toLowerCase()}.`, g.next ? `Next: ${g.next.name} at ${g.next.at} days. ${g.next.look}. I want that.` : 'There is nothing left to grow into. We made it.'], gift: { gems: 3 + g.stage } }); }
    // villagers
    try { const V = G.villageState(); Object.keys(V.b || {}).forEach((id) => { if (V.b[id].done && VILLAGERS[id]) { const [who, ic] = VILLAGERS[id]; sendLetter('village:' + id, { kind: 'villager', from: who, fromIcon: ic, subject: 'Thank you, from Pulsehaven', body: [{ townhall: 'The Town Hall stands again. The whole village gathered on the steps this morning and someone started clapping. It was for you.', tavern: 'First round\'s on the house. Every round, actually, for you. The fire\'s lit and the stew is on.', blacksmith: 'The forge is warm again because of you. Bring me your gear — I\'ll make it sing.', farm: 'The fields are green! The first harvest is yours, of course.', training: 'Recruits are drilling on the grounds again. They\'ve heard stories about you. Don\'t let them down.', market: 'Stalls are full, coins are flowing. I saved you a discount, friend.', temple: 'The candles burn once more. We pray for your strength each morning.', sanctuary: 'The animals have a home again. Some of them ask about you. Well — they look at the door.', observatory: 'I saw a shooting star the night we finished. I named it after you.', castle: 'By royal decree, you are named Lord of Pulsehaven. The kingdom is restored.' }[id]], gift: { coins: 150 } }); } }); } catch (e) {}
    // anniversaries
    const first = workouts.reduce((a, w) => (!a || (w.date && w.date < a) ? w.date : a), null);
    const ANN = [[30, 'One month'], [91, 'Three months'], [182, 'Six months'], [365, 'One year']];
    const due = first ? ANN.filter(([d]) => between(first, today()) >= d) : [];
    due.slice(0, -1).forEach(([d]) => { L.sent['anniv' + d] = L.sent['anniv' + d] || 1; });
    due.slice(-1).forEach(([d, label]) => {
      {
        const fw = workouts.filter((w) => w.date >= first && w.date <= addDays(first, 6) && w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
        const nw = workouts.filter((w) => w.date > addDays(today(), -7) && w.unit === 'reps').reduce((a, w) => a + w.amount * (w.sets || 1), 0);
        sendLetter('anniv' + d, { kind: 'anniversary', subject: `${label} together`, body: [`${label} ago, on ${first}, we logged our very first workout.`, `Our first week: ${fw.toLocaleString()} reps. This past week: ${nw.toLocaleString()} reps.`, nw > fw ? 'Look how far we\'ve come.' : 'Some weeks are harder than others. We\'re still here, and that\'s what matters.'], gift: { gems: Math.ceil(d / 30) } });
      }
    });
    // monthly letter from Future You
    const month = today().slice(0, 7);
    if (workouts.length >= 5 && G.futureLetter && !L.sent['future:' + month]) { const fl = G.futureLetter(); if (fl) sendLetter('future:' + month, Object.assign({ kind: 'future', from: 'You, 6 months from now', fromIcon: '🔮' }, fl)); }
    save();
  }

  function openInbox() {
    const html = `<div class="cz-title" style="text-align:left">📬 Letters</div><div class="muted">${L.letters.length} letters · ${G.unreadLetters()} unread</div>
      <div class="inbox">${L.letters.length ? L.letters.map((l, i) => `<button class="letter-row ${l.read ? '' : 'unread'}" data-l="${i}"><span class="lr-ic">${l.fromIcon || '🧬'}</span><div><b>${esc(l.subject)}</b><div class="muted">${esc(l.from)} · ${new Date(l.t).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}${l.gift && !l.claimed ? ' · 🎁' : ''}</div></div></button>`).join('') : '<div class="empty">No letters yet. Your hero writes when something happens — or when you\'ve been away.</div>'}</div>`;
    const sh = G.sheet(html);
    sh.querySelectorAll('[data-l]').forEach((b) => (b.onclick = () => openLetter(Number(b.dataset.l))));
  }
  G.openInbox = openInbox;
  function openLetter(i) {
    const l = L.letters[i]; if (!l) return;
    l.read = true; save();
    const canClaim = l.gift && !l.claimed && (!l.needTrain || trainedOn(today()));
    const giftTxt = l.gift ? [l.gift.coins && `${l.gift.coins} 🪙`, l.gift.gems && `${l.gift.gems} 💎`].filter(Boolean).join(' + ') : '';
    const html = `<div class="letter ${l.kind}"><div class="lt-from">${l.fromIcon || '🧬'} From: <b>${esc(l.from)}</b><span>${new Date(l.t).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'long' })}</span></div>
      <div class="lt-subj">${esc(l.subject)}</div>
      <div class="lt-body">${l.from === 'You, 6 months from now' ? `<p>Dear ${esc(heroName())},</p>` : l.kind === 'villager' ? '<p>Dear friend,</p>' : `<p>Dear ${esc(heroName())},</p>`}${l.body.map((p, k) => `<p style="animation-delay:${0.15 + k * 0.25}s">${esc(p)}</p>`).join('')}
        <p class="lt-sign" style="animation-delay:${0.2 + l.body.length * 0.25}s">— ${esc(l.from)}</p></div>
      ${l.gift ? `<div class="lt-gift">${l.claimed ? `🎁 Claimed: ${giftTxt}` : canClaim ? `<button class="gbtn" id="ltClaim">🎁 Open the enclosed gift (${giftTxt})</button>` : `🎁 ${giftTxt} enclosed — log a workout today to open it`}</div>` : ''}
      <button class="gbtn ghost" id="ltBack">← All letters</button></div>`;
    const sh = G.sheet(html);
    const c = sh.querySelector('#ltClaim'); if (c) c.onclick = () => { l.claimed = true; save(); G.reward(l.gift, { label: '📬 Gift:' }); openLetter(i); };
    sh.querySelector('#ltBack').onclick = openInbox;
    G.sfx && G.sfx('tick'); G.navBadges && G.navBadges();
  }

  // =====================================================================
  // DREAMS — train today and your hero dreams tonight; tomorrow it comes true
  // =====================================================================
  const DREAMS = {
    goblin: ['…a small green figure, cackling, dragging a sack that clinks with every step…', 'A Treasure Goblin will appear when you open the app'],
    merchant: ['…a cloaked stranger with a cart full of strange, glowing wares…', 'The Travelling Merchant will visit'],
    monster: ['…shimmering scales in the morning mist, something rare and beautiful…', 'A rare monster will wander in'],
    star: ['…a bright light tearing across the night sky, close enough to catch…', 'A shooting star will cross your galaxy'],
    chest: ['…a golden chest, waiting at the end of the very first set…', 'Your first workout opens a free Gold Crate'],
    power: ['…muscles burning like the sun, every rep shaking the ground…', 'Your first workout starts 1 hour of ×2 XP'],
    pet: ['…tiny footsteps following mine, a creature I couldn\'t quite see…', 'Pet drop chance ×3 all day'],
    gems: ['…a cave glittering with blue stones, just out of reach…', 'Your first workout finds 5 gems']
  };
  function nightNow() { const h = new Date().getHours(); return h >= 21 || h < 5; }
  function trainingDay() { const h = new Date().getHours(); return h < 5 ? addDays(today(), -1) : today(); }
  function ensureDream() {
    if (!nightNow()) return;
    const td = trainingDay();
    if (!trainedOn(td)) return;
    if (L.dream && L.dream.night === td) return;
    const types = Object.keys(DREAMS);
    L.dream = { night: td, for: addDays(td, 1), type: pick(types), fulfilled: false }; save();
  }
  function fulfilDream(trigger) {
    const D = L.dream; if (!D || D.fulfilled || D.for !== today()) return;
    if (new Date().getHours() < 5) return;
    const t = D.type;
    const announce = () => { D.fulfilled = true; save(); setTimeout(() => { showToast(`🌙 Last night's dream came true: ${DREAMS[t][1]}!`, null, null, 5500); G.sparks && G.sparks(innerWidth / 2, 160, '#c7b8ff', 40); G.sfx && G.sfx('rare'); }, 600); };
    if (trigger === 'open') {
      if (['goblin', 'merchant', 'monster'].includes(t) && G.spawnEncounter) { const was = window.__PULSE_TEST; window.__PULSE_TEST = false; try { G.spawnEncounter(t); } finally { window.__PULSE_TEST = was; } announce(); }
      else if (t === 'star' && G.galaxySpawnShootingStar) { G.galaxySpawnShootingStar(); announce(); }
      else if (t === 'pet') announce();
    } else if (trigger === 'workout') {
      if (t === 'chest') { announce(); setTimeout(() => G.openCrate && G.openCrate('gold', true), 1500); }
      else if (t === 'power') { const s = G.state(); s.effects.xp = { mult: 2, until: Date.now() + 3600000 }; G.saveLoot(); announce(); }
      else if (t === 'gems') { G.reward({ gems: 5 }, { quiet: true }); announce(); }
    }
  }
  G.dreamPetBoost = () => !!(L.dream && L.dream.type === 'pet' && L.dream.for === today());
  G.heroDream = () => L.dream;
  G.on && G.on('workout', () => { try { fulfilDream('workout'); } catch (e) {} });

  // =====================================================================
  // GROWTH CEREMONY
  // =====================================================================
  function growthCeremony(g) {
    if (window.__PULSE_TEST || window.__PULSE_TEST_NOPOPUP) return;
    const run = () => {
      const el = document.createElement('div'); el.id = 'ceremony'; el.className = 'ceremony'; el.style.setProperty('--cc', '#f5c542');
      el.innerHTML = `<div class="cer-rays"></div><div class="cer-kicker">YOUR HERO GREW UP</div>
        <div class="grow-pair"><canvas id="grBefore" width="128" height="128"></canvas><span>➜</span><canvas id="grAfter" width="128" height="128"></canvas></div>
        <div class="cer-name">${g.icon} ${g.name}</div><div class="cer-desc">${STAGES[g.stage].look}</div>
        <div class="cer-sub">${g.days} days of training${g.next ? ` · next: ${g.next.name} at ${g.next.at} days` : ''}</div><button class="gbtn" id="grOk">Look at us!</button>`;
      document.body.appendChild(el); requestAnimationFrame(() => el.classList.add('show'));
      let raf; const loop = (t) => { if (!document.body.contains(el)) return; G.drawHero && G.drawHero(el.querySelector('#grBefore'), t, { stage: g.stage - 1 }); G.drawHero && G.drawHero(el.querySelector('#grAfter'), t, { stage: g.stage }); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
      setTimeout(() => { const r = el.querySelector('#grAfter').getBoundingClientRect(); G.beam && G.beam('245,197,66', { x: r.left + r.width / 2, w: 100, life: 3 }); G.sfx && G.sfx('godly'); G.fireworks && G.fireworks(3); }, 700);
      el.querySelector('#grOk').onclick = () => { cancelAnimationFrame(raf); el.remove(); G.flushCeremonies && G.flushCeremonies(); };
    };
    const tryRun = () => { if (G.bootActive || document.getElementById('ceremony') || document.getElementById('gSheet')) setTimeout(tryRun, 900); else run(); };
    setTimeout(tryRun, 600);
  }

  // =====================================================================
  // UI: Home companion card + Hero tab panels
  // =====================================================================
  let raf = null;
  function animate() {
    cancelAnimationFrame(raf);
    const loop = (t) => { const cv = document.getElementById('homeHeroCv'); if (!cv || !document.getElementById('today').classList.contains('active')) return; G.drawHero && G.drawHero(cv, t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
  }
  function renderHome() {
    const el = document.getElementById('heroHomeCard'); if (!el) return;
    ensureRequest(); ensureDream();
    const m = mood(); const q = L.req; const D = L.dream; const unread = G.unreadLetters(); const name = heroName();
    const asleep = nightNow() && D && D.night === trainingDay();
    let speech = '';
    if (asleep) speech = `<div class="hh-dream">💤 <i>${esc(name)} is dreaming…</i><div>${DREAMS[D.type][0]}</div><span class="muted">Dreams come true the next day.</span></div>`;
    else if (q && !q.done && !q.declined) { const p = Math.min(q.n, reqProgress(q)); speech = `<div class="hh-req"><div class="hh-say">"${esc(q.text)}"</div><div class="xp-bar"><div class="fill" style="width:${p / q.n * 100}%"></div></div><div class="hh-row"><span class="muted">${p}/${q.n} ${q.metric === 'xp' ? 'XP' : q.metric === 'plank' ? 'min' : 'reps'} · reward 120 🪙 + 💞 Bond</span><button class="hh-no" id="hhNo">Not today</button></div></div>`; }
    else if (q && q.done) speech = `<div class="hh-say">"${esc(pick(m.lines))}" <span class="muted">· request done ✓</span></div>`;
    else speech = `<div class="hh-say">"${esc(nightNow() && !trainedOn(trainingDay()) ? 'Train with me today and I\'ll dream something special tonight…' : pick(m.lines))}"</div>`;
    const dreamToday = D && D.for === today() && !asleep ? `<div class="hh-dreamline">🌙 Last night's dream: <b>${DREAMS[D.type][1]}</b>${D.fulfilled ? ' — ✨ came true!' : ''}</div>` : '';
    el.innerHTML = `<div class="card hh ${asleep ? 'asleep' : ''}">
      <div class="hh-top"><canvas id="homeHeroCv" width="128" height="128"></canvas>
        <div class="hh-id"><b>${esc(name)}</b><div class="muted">${asleep ? '😴 Asleep' : `${m.icon} ${m.word}`} · 💞 Bond ${bondLevel()} · ${G.heroGrowth().icon} ${G.heroGrowth().name}</div>${speech}</div>
        <button class="hh-mail" id="hhMail">📬${unread ? `<span>${unread}</span>` : ''}</button></div>${dreamToday}</div>`;
    const no = el.querySelector('#hhNo'); if (no) no.onclick = () => { q.declined = true; save(); showToast(`🧬 ${name}: "Okay… tomorrow then."`); renderHome(); };
    el.querySelector('#hhMail').onclick = openInbox;
    animate();
  }
  G.renderHeroLife = function (el) {
    if (!el) return;
    const g = G.heroGrowth(); const m = mood(); const bl = bondLevel();
    const nextBond = BOND_AT[bl] != null ? BOND_AT[bl] : null;
    const moodEl = document.getElementById('heroMood'); if (moodEl) moodEl.textContent = m.icon;
    const stEl = document.getElementById('heroStage'); if (stEl) stEl.textContent = `${g.icon} ${g.name}`;
    el.innerHTML = `
      <div class="card"><div class="cardhead"><h2>🌱 Growing up</h2><span class="muted">${g.days} training days</span></div>
        <div class="grow-line">${STAGES.map((s, i) => `<div class="gs ${i < g.stage ? 'done' : i === g.stage ? 'cur' : ''}"><span>${i <= g.stage ? s.icon : '🔒'}</span><b>${s.name}</b><i>${s.at}d</i></div>`).join('')}</div>
        ${g.next ? `<div class="xp-bar" style="margin-top:10px"><div class="fill" style="width:${g.pct * 100}%"></div></div><div class="muted" style="margin-top:6px">${g.next.at - g.days} more training days → <b>${g.next.name}</b>: ${g.next.look}</div>` : '<div class="muted">Fully grown. A Mythic hero.</div>'}</div>
      <div class="card"><div class="cardhead"><h2>💞 Bond</h2><span class="muted">Level ${bl}/10 · +${bl - 1}% XP</span></div>
        <div class="xp-bar"><div class="fill" style="width:${nextBond ? (L.bond - BOND_AT[bl - 1]) / (nextBond - BOND_AT[bl - 1]) * 100 : 100}%;background:linear-gradient(90deg,#ff6fae,#ff3d6e)"></div></div>
        <div class="muted" style="margin-top:6px">${L.bond} requests completed${nextBond ? ` · ${nextBond - L.bond} more to Bond ${bl + 1}` : ' · maximum bond'}. Your hero asks for something each day on Home.</div></div>
      <div class="card"><div class="cardhead"><h2>📬 Letters</h2><span class="muted">${G.unreadLetters()} unread</span></div>
        ${L.letters.slice(0, 3).map((l, i) => `<button class="letter-row ${l.read ? '' : 'unread'}" data-l="${i}"><span class="lr-ic">${l.fromIcon || '🧬'}</span><div><b>${esc(l.subject)}</b><div class="muted">${esc(l.from)}</div></div></button>`).join('') || '<div class="muted">No letters yet.</div>'}
        <button class="gbtn ghost" id="hlInbox">Open all letters</button></div>`;
    el.querySelectorAll('[data-l]').forEach((b) => (b.onclick = () => openLetter(Number(b.dataset.l))));
    el.querySelector('#hlInbox').onclick = openInbox;
  };

  function tick() {
    try { generateLetters(); } catch (e) { console.warn('letters', e); }
    try { checkRequest(); } catch (e) { console.warn('request', e); }
    try { renderHome(); } catch (e) { console.warn('herohome', e); }
  }
  G.on && G.on('render', tick);
  setTimeout(() => { try { fulfilDream('open'); } catch (e) {} tick(); }, 50);
  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') setTimeout(() => { try { fulfilDream('open'); } catch (e) {} tick(); }, 800); });
  G._herolife = { state: () => L, makeRequest, ensureDream, fulfilDream, openLetter, generateLetters, DREAMS };
})();
