/* Pulse — Skilling pets (RuneScape style).
   Every logged workout has a small chance to drop the pet tied to that exercise or body area.
   Higher skill level and bigger sets improve the odds. No pity timer — pure luck, like the real thing. */
(function () {
  const G = (window.G = window.G || {});
  const PKEY = 'pulse-pets-v1';
  let P;
  try { P = JSON.parse(localStorage.getItem(PKEY) || 'null'); } catch (e) { P = null; }
  if (!P) P = { owned: {}, active: null, rolls: 0, sinceLast: 0, dupes: 0, names: {} };
  const save = () => localStorage.setItem(PKEY, JSON.stringify(P));

  // signature pets for iconic moves, category pets for everything else
  const PETS = [
    { id: 'pushpup', name: 'Pushpup', icon: '🐶', match: { ex: ['Press-ups', 'Wide push-ups', 'Decline push-ups', 'Diamond push-ups'] }, buff: { power: 3 }, lore: 'Does press-ups when you\'re not looking.' },
    { id: 'squatgolem', name: 'Squat Golem', icon: '🗿', match: { ex: ['Squats', 'Jump squats', 'Sumo squats', 'Pistol squats'] }, buff: { power: 3 }, lore: 'Made of compressed leg days.' },
    { id: 'burpeeimp', name: 'Burpee Imp', icon: '😈', match: { ex: ['Burpees'] }, buff: { crit: 3 }, lore: 'Born from the screams of burpee sets.' },
    { id: 'planktortoise', name: 'Plank Tortoise', icon: '🐢', match: { ex: ['Plank', 'Side plank', 'Hollow hold', 'Wall sit'] }, buff: { xp: 4 }, lore: 'Has been holding a plank for 300 years.' },
    { id: 'crunchcrab', name: 'Crunch Crab', icon: '🦀', match: { ex: ['Sit-ups', 'Crunches', 'Bicycle crunches', 'Russian twists', 'Leg raises', 'Flutter kicks'] }, buff: { xp: 3 }, lore: 'Sideways crunches only.' },
    { id: 'hopbunny', name: 'Hop Bunny', icon: '🐰', match: { ex: ['Jumping jacks', 'High knees', 'Skater jumps', 'Skipping'] }, buff: { luck: 5 }, lore: 'Never stops bouncing.' },
    { id: 'llama', name: 'Leg Day Llama', icon: '🦙', match: { cat: 'legs' }, buff: { power: 2, xp: 2 }, lore: 'Spits on anyone who skips leg day.' },
    { id: 'chimp', name: 'Chest Chimp', icon: '🐒', match: { cat: 'chest' }, buff: { power: 3 }, lore: 'Beats its chest after every set.' },
    { id: 'gecko', name: 'Core Gecko', icon: '🦎', match: { cat: 'core' }, buff: { xp: 3 }, lore: 'Sticks to walls using pure core strength.' },
    { id: 'cheetah', name: 'Cardio Cheetah', icon: '🐆', match: { cat: 'cardio' }, buff: { coin: 4 }, lore: 'Fastest pet in Pulsehaven.' },
    { id: 'bear', name: 'Bicep Bear', icon: '🐻', match: { cat: 'arms' }, buff: { power: 3 }, lore: 'Curls honey jars for fun.' },
    { id: 'owl', name: 'Lat Owl', icon: '🦉', match: { cat: 'back' }, buff: { luck: 4 }, lore: 'Wings like lat spreads.' },
    { id: 'phoenixling', name: 'Phoenixling', icon: '🐣', match: { cat: 'custom' }, buff: { xp: 3, luck: 3 }, lore: 'Hatched from an exercise nobody had a name for.' }
  ];
  G.PETS = PETS;
  const byId = Object.fromEntries(PETS.map((p) => [p.id, p]));

  function petFor(w) {
    const sig = PETS.find((p) => p.match.ex && p.match.ex.includes(w.exercise));
    if (sig) return sig;
    const cat = getCategoryForExercise(w.exercise, w.category);
    return PETS.find((p) => p.match.cat === cat) || byId.phoenixling;
  }
  function skillLevel(name) { try { return getLevelFromXP(getSkillXPMap()[name] || 0); } catch (e) { return 1; } }
  // chance per logged entry, e.g. ~1 in 140 for a typical bodyweight set at level 30
  function chance(w) {
    const xp = xpForWorkout(Object.assign({}, w, { bonus: 1 }));
    const vol = 1 + Math.min(3, xp / 50);
    const lvl = 1 + skillLevel(w.exercise) / 99;
    const sanct = G.villagePerk && G.villagePerk('sanctuary') ? 1.5 : 1;
    const dream = G.dreamPetBoost && G.dreamPetBoost() ? 3 : 1;
    return Math.min(0.05, (vol * lvl * sanct * dream) / 400);
  }
  G.petChance = chance;

  function roll(w) {
    if (!w || w.exercise == null) return;
    P.rolls++; P.sinceLast++;
    const pet = petFor(w);
    if (Math.random() < chance(w)) drop(pet, w);
    else save();
  }
  function drop(pet, w) {
    const golden = Math.random() < 1 / 25;
    const had = P.owned[pet.id];
    const rec = had || { got: dateKey(new Date()), logs: P.sinceLast, from: w ? w.exercise : '', golden: false, count: 0 };
    rec.count = (rec.count || 0) + 1;
    if (golden && !rec.golden) rec.golden = true;
    P.owned[pet.id] = rec; P.sinceLast = 0;
    if (had && !golden) P.dupes++;
    if (!P.active) P.active = pet.id;
    save();
    setTimeout(() => announce(pet, !!had && !golden, golden, rec), 900);
  }
  G.forcePet = (id, golden) => { const pet = byId[id] || PETS[0]; const orig = Math.random; if (golden) Math.random = () => 0; try { drop(pet, { exercise: 'Test' }); } finally { Math.random = orig; } };

  function announce(pet, dupe, golden, rec) {
    if (window.__PULSE_TEST_NOPOPUP) return;
    const el = document.createElement('div'); el.className = 'pet-drop'; el.id = 'petDrop';
    el.innerHTML = `<div class="pd-msg">${dupe ? 'You have a funny feeling like you <i>would</i> have been followed…' : 'You have a funny feeling like you\'re being followed…'}</div>
      <div class="pd-pet ${golden ? 'golden' : ''}">${pet.icon}</div>
      <div class="pd-name">${golden ? '✨ GOLDEN ' : ''}${esc(pet.name)}</div>
      <div class="pd-sub">${dupe ? `You already own ${esc(pet.name)} — the duplicate leaves you 500 coins.` : `${esc(pet.lore)}<br>Dropped after ${rec.logs} log${rec.logs === 1 ? '' : 's'} · buff: ${buffText(pet.buff)}`}</div>
      <button class="gbtn" id="pdOk">${dupe ? 'Nice' : 'Welcome aboard'}</button>`;
    document.body.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => { const r = el.querySelector('.pd-pet').getBoundingClientRect(); G.celebrate && G.celebrate(golden ? 7 : dupe ? 3 : 6, el.querySelector('.pd-pet')); G.sparks && G.sparks(r.left + r.width / 2, r.top + r.height / 2, golden ? '#ffe066' : '#ffffff', 50); }, 500);
    try { initAudio(); const n = audioCtx.currentTime; [392, 523, 659, 784, 1047].forEach((f, i) => playNote(f, 0.35, n + 0.4 + i * 0.13, { gain: 0.1 })); } catch (e) {}
    if (typeof haptic === 'function') haptic('levelup');
    el.querySelector('#pdOk').onclick = () => { el.remove(); if (dupe && G.reward) G.reward({ coins: 500 }, { label: '🐾 Duplicate pet:' }); render(); G.renderHero && G.renderHero(); };
  }
  function buffText(b) { return Object.entries(b).map(([k, v]) => `+${v}% ${k}`).join(', '); }

  G.activePet = () => (P.active && P.owned[P.active] ? Object.assign({}, byId[P.active], { golden: P.owned[P.active].golden, nick: P.names[P.active] }) : null);
  G.petBonus = () => { const p = G.activePet(); if (!p) return null; const m = p.golden ? 2 : 1; const o = {}; Object.keys(p.buff).forEach((k) => (o[k] = p.buff[k] * m)); return o; };
  G.petsOwned = () => Object.keys(P.owned).map((id) => Object.assign({}, byId[id], P.owned[id]));
  G.petsState = () => P;

  // ---------------- Hero › Pets panel ----------------
  let root = null;
  function render() {
    if (!root || !document.body.contains(root)) return;
    const owned = Object.keys(P.owned).length;
    const act = G.activePet();
    root.innerHTML = `
      <div class="card pet-card"><div class="cardhead"><h2>🐾 Following you</h2><span class="muted">${owned}/${PETS.length} pets · ${Object.values(P.owned).filter((x) => x.golden).length} golden</span></div>
        ${act ? `<div class="pet-active"><div class="pa-ic ${act.golden ? 'golden' : ''}">${act.icon}</div><div><button class="hero-name" id="petName">${esc(act.nick || act.name)} ✎</button><div class="muted">${esc(act.name)}${act.golden ? ' · ✨ Golden (double buff)' : ''}</div><div class="hero-perk">${buffText(G.petBonus())}</div><div class="muted" style="font-style:italic;margin-top:4px">"${esc(act.lore)}"</div></div></div>`
          : `<div class="muted">No pets yet. Every workout you log has a small chance to drop the pet for that exercise — bigger sets and higher skill levels improve your odds.</div>`}
        <div class="pet-stats"><span>🎲 <b>${P.rolls.toLocaleString()}</b> rolls</span><span>⏳ <b>${P.sinceLast}</b> logs since last pet</span><span>🔁 <b>${P.dupes}</b> duplicates</span></div></div>
      <div class="card"><div class="cardhead"><h2>📖 Pet collection</h2><span class="muted">tap one you own to make it follow you</span></div>
        <div class="pet-grid">${PETS.map((p) => { const o = P.owned[p.id];
          const how = p.match.ex ? p.match.ex.slice(0, 3).join(', ') + (p.match.ex.length > 3 ? '…' : '') : `any ${p.match.cat} exercise`;
          return `<button class="pet-slot ${o ? 'own' : ''} ${o && o.golden ? 'golden' : ''} ${P.active === p.id ? 'active' : ''}" data-pet="${p.id}">
            <div class="ps-ic">${o ? p.icon : '❔'}</div><div class="ps-name">${o ? esc(P.names[p.id] || p.name) : '???'}</div>
            <div class="ps-how">${o ? `got ${o.got}${o.count > 1 ? ` · ×${o.count}` : ''}` : esc(how)}</div></button>`; }).join('')}</div>
        <div class="muted" style="margin-top:10px">Drop chance per log is roughly 1 in ${Math.round(1 / chance({ exercise: 'Squats', amount: 20, sets: 3, unit: 'reps' }))} for 3×20 squats right now. Golden variants are 1 in 25 drops and double the buff.</div></div>`;
    root.querySelectorAll('[data-pet]').forEach((b) => (b.onclick = () => {
      const id = b.dataset.pet; if (!P.owned[id]) { showToast('🔒 Not found yet — keep training'); return; }
      P.active = id; save(); G.sfx && G.sfx('coin'); if (typeof haptic === 'function') haptic('light'); render();
    }));
    const nm = root.querySelector('#petName'); if (nm) nm.onclick = () => { const n = prompt('Pet name', P.names[P.active] || byId[P.active].name); if (n && n.trim()) { P.names[P.active] = n.trim().slice(0, 18); save(); render(); } };
  }
  G.renderPets = (el) => { root = el; render(); };

  G.on && G.on('workout', (w) => { try { roll(w); } catch (e) { console.warn('pets', e); } });
})();
