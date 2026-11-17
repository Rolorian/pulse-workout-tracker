// Combat balance simulator. Plain Node, no browser: it mirrors the battle formulas in rpg.js
// (openBattle, pickIntent, playerMove, impact, enemyTurn) so numbers can be checked across thousands of fights.
// If you change a formula in rpg.js, change it here too.   node tests/balance.sim.js
const fs = require('fs'); const src = fs.readFileSync(__dirname + '/../rpg.js', 'utf8');
const num = (re, d) => { const m = src.match(re); return m ? Number(m[1]) : d; };
const CFG = { chargeMult: num(/CHARGE_MULT = ([\d.]+)/, 1.7), brkPct: num(/BRK_PCT = ([\d.]+)/, 0.12), brkMin: num(/BRK_MIN = ([\d.]+)/, 6), rage: num(/RAGE_ADD = ([\d.]+)/, 3), bossHpStep: num(/BOSS_HP_STEP = ([\d.]+)/, 0), bossCap: num(/BOSS_HP_CAP = ([\d.]+)/, 160), bulFull: num(/BULWARK_FULL = ([\d.]+)/, 20), bulCounter: num(/BULWARK_COUNTER = ([\d.]+)/, 1.6), tempQuick: num(/TEMPEST_FLURRY = ([\d.]+)/, 1.25), brkSmash: num(/BREAKER_SMASH = ([\d.]+)/, 1.3) };
for (const a of process.argv.slice(2)) { const [k, v] = a.split('='); if (k in CFG) CFG[k] = Number(v); }
const BOSS = [[55, [5, 0, 8]], [62, [7, 0, 10]], [70, [8, 0, 11]], [76, [8, 0, 11]], [82, [9, 0, 12]], [88, [10, 0, 13]], [94, [11, 0, 14]], [100, [11, 0, 15]], [106, [12, 0, 16]], [115, [13, 0, 17]]];
const MOVES = { strike: 1, smash: 1.25, quick: 0.85 };
const ST = { balanced: { m: () => 1, take: 0 }, bulwark: { m: () => 0.9, take: -1 }, tempest: { m: (id) => (id === 'quick' ? CFG.tempQuick : id === 'smash' ? 0.85 : 1), take: 1 }, breaker: { m: (id) => (id === 'smash' ? CFG.brkSmash : id === 'quick' ? 0.85 : 1), take: 0 } };
function fight(bi, stance, P, policy) {
  const [base, its] = BOSS[bi]; const pw = 1 + P.power / 100; const emax = Math.round(Math.min(CFG.bossCap, Math.round(base * (1 + CFG.bossHpStep * bi))) * Math.pow(pw, 0.75));
  let ehp = emax, hp = P.hp, turns = 0, mom = 0, last = null, stag = 0, reps = 0, hold = 0, guards = 0; const order = ['strike', 'smash', 'quick']; let oi = 0;
  const S = ST[stance]; let intent = { dmg: its[0] };
  const pick = () => { const raging = ehp < emax / 2; const d = its[Math.floor(Math.random() * its.length)]; intent = { dmg: d ? d + (raging ? CFG.rage : 0) : 0 };
    if (turns > 0 && turns % 3 === 2) { const top = Math.max(...its); intent = { dmg: Math.round((top + (raging ? CFG.rage : 0)) * CFG.chargeMult), charge: true, brk: Math.max(CFG.brkMin, Math.round(emax * CFG.brkPct)), got: 0 }; } };
  while (turns < 60) {
    let shield = 0; const incoming = Math.max(intent.dmg ? 1 : 0, intent.dmg + (intent.dmg ? S.take : 0));
    const brkTry = policy === 'smart' && intent.charge && stance === 'breaker' && P.reps * MOVES.smash * CFG.brkSmash * pw * 1.5 >= intent.brk; // Breaker goes for the interrupt with Smash
    const guard = policy === 'attack' ? false : policy === 'guardCharge' ? !!intent.charge : brkTry ? false : (!!intent.charge || incoming >= hp); // 'smart': guard charges and anything that would kill
    turns++;
    if (guard) { guards++; hold += P.hold; const bul = stance === 'bulwark'; shield = Math.min(1, P.hold / (bul ? CFG.bulFull : 30)); if (intent.charge && shield >= 0.5) { shield = 1; stag = 1; }
      mom = last && last !== 'guard' ? Math.min(3, mom + 1) : last === 'guard' ? 0 : mom; last = 'guard';
      ehp -= Math.round(P.hold * 0.25 * (bul ? CFG.bulCounter : 1) * pw * (1 + 0.1 * mom)); }
    else { const id = brkTry ? 'smash' : order[oi++ % 3]; mom = last && last !== id ? Math.min(3, mom + 1) : last === id ? 0 : mom; last = id; reps += P.reps;
      let d = Math.max(1, Math.round(P.reps * MOVES[id] * (1 + 0.1 * mom) * S.m(id) * (stag ? 1.5 : 1))); stag = 0; d = Math.round(d * pw * (Math.random() < 0.05 ? 2 : 1)); ehp -= d;
      if (ehp > 0 && intent.charge) { intent.got += d * (stance === 'breaker' ? 1.5 : 1); if (intent.got >= intent.brk) { intent = { dmg: 0 }; stag = 1; } } }
    if (ehp <= 0) return { win: 1, turns, reps, hold, guards, left: hp };
    let d = intent.dmg ? Math.max(1, intent.dmg + S.take) : 0; d -= Math.round(d * shield); hp -= d; if (hp <= 0) return { win: 0, turns, reps, hold, guards, left: 0 };
    pick();
  }
  return { win: 0, turns, reps, hold, guards, left: hp };
}
const PLAYERS = { 'new (8 reps, 20s hold, 20 hp)': { reps: 8, hold: 20, hp: 20, power: 0 }, 'regular (15 reps, 30s, 28 hp, +20%)': { reps: 15, hold: 30, hp: 28, power: 20 }, 'strong (25 reps, 45s, 40 hp, +50%)': { reps: 25, hold: 45, hp: 40, power: 50 } };
const N = 4000; const out = {};
for (const [pn, P] of Object.entries(PLAYERS)) { console.log('\n' + pn);
  for (const st of Object.keys(ST)) { let line = '  ' + st.padEnd(9);
    for (const bi of [0, 4, 9]) { let best = null; for (const pol of ['attack', 'guardCharge', 'smart']) { let w = 0, t = 0, r = 0, g = 0; for (let i = 0; i < N; i++) { const f = fight(bi, st, P, pol); w += f.win; t += f.turns; r += f.reps; g += f.guards; } const res = { pol, win: Math.round(w / N * 100), turns: +(t / N).toFixed(1), reps: Math.round(r / N), guards: +(g / N).toFixed(1) }; if (!best || res.win > best.win) best = res; (out[pn + st + bi] = out[pn + st + bi] || []).push(res); }
      line += ` | boss${bi + 1}: ${String(best.win).padStart(3)}% ${best.turns}t ${best.reps}reps best=${best.pol}(${best.guards}g)`; }
    console.log(line); } }
console.log('\ncfg', JSON.stringify(CFG));
