// Overhaul checks: pet sprites, muscle map, coach notes, locked backups, accessibility, rematches, challenge history.
const { chromium } = require('playwright');
const URL = process.env.PULSE_URL || 'http://localhost:8782';
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 }); const page = await ctx.newPage();
  const errs = [], net = [], fails = []; const ok = (name, cond, extra) => { console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra !== undefined ? ' · ' + JSON.stringify(extra) : '')); if (!cond) fails.push(name); };
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/vibrate|favicon/i.test(m.text())) errs.push(m.text()); });
  page.on('request', (r) => { if (!r.url().startsWith(URL)) net.push(r.url()); }); page.on('dialog', (d) => d.accept());
  await page.addInitScript(() => { window.__PULSE_TEST = true; window.__PULSE_TEST_NOPOPUP = true; });
  await page.goto(URL + '/index.html', { waitUntil: 'networkidle' });
  // four weeks of rising volume, press-ups stuck at 15, far more push than pull
  await page.evaluate(() => { localStorage.clear(); const W = []; let id = 1; for (let back = 27; back >= 0; back--) { const d = new Date(); d.setDate(d.getDate() - back); const wk = 3 - Math.floor(back / 7); if (back % 2) continue;
    W.push({ id: id++, exercise: 'Press-ups', amount: 15, sets: 2 + wk * 2, unit: 'reps', date: dateKey(d), time: '18:00' }); W.push({ id: id++, exercise: 'Squats', amount: 20 + wk, sets: 1 + wk, unit: 'reps', date: dateKey(d), time: '18:05' }); }
    localStorage.setItem('pulse-workouts-v2', JSON.stringify(W)); });
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(900);

  // pets
  const pets = await page.evaluate(() => G.PETS.map((p) => { const c = G.petSprite(p.id); if (!c) return [p.id, 0]; const d = c.getContext('2d').getImageData(0, 0, 16, 16).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++; return [p.id, n]; }));
  ok('every pet has a hand-drawn sprite', pets.every((p) => p[1] > 60), pets.filter((p) => p[1] <= 60));
  ok('golden pets are recoloured', await page.evaluate(() => G.petImg('owl', true, 32) !== G.petImg('owl', false, 32)));
  await page.evaluate(() => { G.forcePet('owl'); G.nav('hero', 'pets'); }); await page.waitForTimeout(500);
  ok('Pets screen shows sprites, not emoji', await page.evaluate(() => !!document.querySelector('.pa-ic img') && !!document.querySelector('.ps-ic img')));
  await page.screenshot({ path: '/tmp/shots/p2/pets_ui.png' });

  // muscle map + notes
  await page.evaluate(() => G.nav('stats', 'progress')); await page.waitForTimeout(500);
  const mm = await page.evaluate(() => { const s = document.querySelector('#muscleMap svg'); return s ? { label: s.getAttribute('aria-label'), rects: s.querySelectorAll('rect').length, fills: [...new Set([...s.querySelectorAll('rect')].map((r) => r.getAttribute('fill')))] } : null; });
  ok('muscle map is drawn with a text description', !!mm && mm.rects === 21 && /Push: \d+ sets/.test(mm.label) && /Pull: not trained/.test(mm.label), mm);
  const notes = await page.evaluate(() => G.coach2.notes().map((n) => n.id));
  ok('coach notes: easy week, plateau and pull balance', notes.includes('deload') && notes.includes('plateau') && notes.includes('pull'), notes);
  await page.evaluate(() => document.getElementById('balanceCard').scrollIntoView()); await page.screenshot({ path: '/tmp/shots/p2/map.png' });

  // locked backups
  const enc = await page.evaluate(async () => { const snap = G.backup.snapshot(); const box = await G.backup.encrypt(snap, 'correct horse'); const back = await G.backup.decrypt(box, 'correct horse'); let wrong = false; try { await G.backup.decrypt(box, 'nope nope'); } catch (e) { wrong = true; }
    const box2 = await G.backup.encrypt(snap, 'correct horse'); return { same: JSON.stringify(back.keys) === JSON.stringify(snap.keys), wrong, leak: JSON.stringify(box).includes('Press-ups'), fresh: box.salt !== box2.salt && box.iv !== box2.iv, ok: !G.backup.check(back).err, btn: !!document.getElementById('lockedExportBtn') }; });
  ok('locked backup round-trips, rejects a wrong password, hides contents', enc.same && enc.wrong && !enc.leak && enc.fresh && enc.ok && enc.btn, enc);

  // accessibility
  await page.evaluate(() => G.a11y.pass());
  const a = await page.evaluate(() => ({ fab: document.getElementById('fab').getAttribute('aria-label'), nav: document.getElementById('navbar').getAttribute('role'), cur: document.querySelectorAll('#navbar [aria-current="page"]').length, sw: [...document.querySelectorAll('.set-toggle')].every((t) => t.getAttribute('role') === 'switch' && t.getAttribute('aria-label') && t.tabIndex === 0), dlg: [...document.querySelectorAll('.modal')].every((m) => m.getAttribute('role') === 'dialog'), toast: document.getElementById('toast') ? document.getElementById('toast').getAttribute('aria-live') : 'none' }));
  ok('labels, roles and keyboard switches are in place', a.fab && a.nav === 'navigation' && a.cur === 1 && a.sw && a.dlg, a);

  // rematches
  await page.evaluate(() => G.nav('adventure', 'realm')); await page.waitForTimeout(1500);
  for (let i = 0; i < 8; i++) { await page.evaluate(() => G._rpgAdvance && G._rpgAdvance()); await page.waitForTimeout(80); }
  const rm = await page.evaluate(() => { const R = G._rpgDebug.R(); G._rpgDebug.go('r0'); const boss = () => G._rpgDebug.ents().find((e) => e.def && e.def.boss && e.def.region === 0); const base = boss(); if (!base) return null; const b0 = { hp: base.def.hp, name: base.def.name, top: Math.max(...base.def.intents.map((i) => i[1])) };
    R.conq[0] = true; R.rm = { 0: 2 }; G._rpgDebug.go('village'); delete R.dead.r0; G._rpgDebug.go('r0'); const t = boss(); return t ? { b0, hp: t.def.hp, name: t.def.name, top: Math.max(...t.def.intents.map((i) => i[1])), tier: t.def.tier } : { b0, missing: true }; });
  ok('a beaten boss returns tougher (★★: +30% health, +2 damage)', !!rm && !rm.missing && rm.tier === 2 && /★★$/.test(rm.name) && rm.hp === Math.round(rm.b0.hp * 1.3) && rm.top === rm.b0.top + 2, rm);
  await page.evaluate(() => G.nav('adventure', 'league')); await page.waitForTimeout(400);

  // challenge history
  const hist = await page.evaluate(() => { const S = G.social.state(); const d = (n) => { const x = new Date(); x.setDate(x.getDate() - n); return dateKey(x); }; S.list.push({ cid: 'oldone01', kind: 'most', ex: 'Press-ups', from: d(12), to: d(6), by: 'x', byName: 'Me', hp: 0 }); S.list.push({ cid: 'live0001', kind: 'most', ex: 'Squats', from: d(1), to: d(-5), by: 'x', byName: 'Me', hp: 0 }); G.social.render(); return { list: G.social.list().map((c) => c.cid), hist: G.social.history().map((h) => h.cid + ':' + h.rows.length), ui: !!document.querySelector('#socialCard .soc-hist') }; });
  ok('finished challenges move to History; live ones stay', hist.list.join() === 'live0001' && hist.hist[0].startsWith('oldone01') && hist.ui, hist);

  ok('no console errors', errs.length === 0, errs.slice(0, 5)); ok('no outside requests', net.length === 0, net.slice(0, 5));
  await b.close(); console.log(fails.length ? '\n' + fails.length + ' FAILED' : '\nALL PASSED'); process.exit(fails.length ? 1 : 0);
})();
