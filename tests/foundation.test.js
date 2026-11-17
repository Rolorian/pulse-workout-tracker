// Foundation checks: Home shows what you log, save safety, no outside requests.
const { chromium } = require('playwright');
const URL = process.env.PULSE_URL || 'http://localhost:8782';
(async () => {
  const b = await chromium.launch(); const ctx = await b.newContext({ viewport: { width: 430, height: 932 }, deviceScaleFactor: 2 }); const page = await ctx.newPage();
  const errs = [], net = [], fails = []; const ok = (name, cond, extra) => { console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra !== undefined ? ' · ' + JSON.stringify(extra) : '')); if (!cond) fails.push(name); };
  page.on('pageerror', (e) => errs.push('pageerror: ' + e.message)); page.on('console', (m) => { if (m.type() === 'error' && !/vibrate|favicon/i.test(m.text())) errs.push(m.text()); });
  page.on('request', (r) => { if (!r.url().startsWith(URL)) net.push(r.url()); }); page.on('dialog', (d) => d.accept());
  await page.addInitScript(() => { window.__PULSE_TEST = true; window.__PULSE_TEST_NOPOPUP = true; });
  await page.goto(URL + '/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => { localStorage.clear(); const W = []; let id = 1; for (let back = 5; back >= 1; back--) { const d = new Date(); d.setDate(d.getDate() - back); W.push({ id: id++, exercise: 'Press-ups', amount: 15, sets: 3, unit: 'reps', date: dateKey(d), time: '18:00' }); } localStorage.setItem('pulse-workouts-v2', JSON.stringify(W)); });
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(900);

  // Home: Today's Activity is the first card, and a new log appears there without leaving the page
  const first = await page.evaluate(() => { const c = [...document.querySelectorAll('#today > .card')].find((x) => x.offsetParent); return c ? (c.querySelector('h2') || {}).textContent : null; });
  ok("Home's first card is Today's Activity", /Today's Activity/.test(first || ''), first);
  await page.evaluate(() => { workouts.push({ id: Date.now(), exercise: 'Squats', amount: 20, sets: 2, unit: 'reps', date: todayKey(), time: '09:00' }); localStorage.setItem('pulse-workouts-v2', JSON.stringify(workouts)); render(); });
  await page.waitForTimeout(400);
  const seen = await page.evaluate(() => { const l = document.getElementById('todayList'); const r = l.getBoundingClientRect(); return { text: /Squats/.test(l.textContent), top: Math.round(r.top + window.scrollY), tab: document.getElementById('today').classList.contains('active'), inFold: !!l.closest('.fold') }; });
  ok('a logged set shows on Home, outside any fold', seen.text && seen.tab && !seen.inFold, seen);
  await page.screenshot({ path: '/tmp/shots/p1/home.png' });

  // save safety
  ok('safety layer loaded with a schema record', await page.evaluate(() => !!(G.safe && G.safe.VERSION === 1 && JSON.parse(localStorage.getItem('pulse-schema-v1')).v === 1)));
  ok('a daily safety copy exists', await page.evaluate(() => G.safe.copies().length >= 1 && G.safe.copies()[0].keys >= 1), await page.evaluate(() => G.safe.copies()));
  // corrupt the workouts save, reload: it is repaired from the copy and the damaged text is kept aside
  await page.evaluate(() => { G.safe.snapshot(true); localStorage.setItem('pulse-workouts-v2', '[{"id":1,"exercise":"Press-u'); });
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(900);
  const rep = await page.evaluate(() => ({ n: workouts.length, aside: (localStorage.getItem('pulse-corrupt-pulse-workouts-v2') || '').length, repaired: G.safe.status.repaired }));
  ok('a damaged save is repaired and the original set aside', rep.n >= 6 && rep.aside > 0 && rep.repaired.includes('pulse-workouts-v2'), rep);
  // a full disk does not throw or wipe anything
  const full = await page.evaluate(() => { const before = localStorage.getItem('pulse-workouts-v2'); const real = Storage.prototype.setItem; let threw = false;
    const orig = Object.getOwnPropertyDescriptor(Storage.prototype, 'setItem'); // simulate quota by filling storage
    try { let chunk = 'x'.repeat(1024 * 512), i = 0; while (i < 40) { try { real.call(localStorage, 'fill-' + i, chunk); } catch (e) { break; } i++; if (G.safe.status.full) break; } } catch (e) { threw = true; }
    try { localStorage.setItem('pulse-settings-v1', JSON.stringify({ big: 'y'.repeat(1024 * 1024 * 6) })); } catch (e) { threw = true; }
    const res = { threw, full: G.safe.status.full, same: localStorage.getItem('pulse-workouts-v2') === before };
    for (let j = 0; j < 40; j++) localStorage.removeItem('fill-' + j); return res; });
  ok('storage-full is caught, reported and loses nothing', !full.threw && full.full && full.same, full);
  // exports never include the per-device safety copies
  ok('backup export skips safety copies', await page.evaluate(() => { const s = G.backup.snapshot(); const k = Object.keys(s.keys || s); return !k.includes('pulse-snap-v1') && !k.some((x) => x.indexOf('pulse-corrupt-') === 0); }));
  // restore puts the copy back
  ok('restore from a safety copy works', await page.evaluate(() => { G.safe.snapshot(true); const n = JSON.parse(localStorage.getItem('pulse-workouts-v2')).length; localStorage.setItem('pulse-workouts-v2', '[]'); return G.safe.restore(0) && JSON.parse(localStorage.getItem('pulse-workouts-v2')).length === n; }));

  // approved reworks
  ok('weather no longer changes damage', await page.evaluate(async () => { const t = await (await fetch('rpg.js')).text(); return !/Storm-forged/.test(t) && !/realWx\(\) \? 1\.1/.test(t); }));
  ok('hero body never shrinks', await page.evaluate(async () => { const t = await (await fetch('rpg.js')).text(); return !/mirVal \+= 'T'/.test(t); }));
  ok('updates wait for the app', await page.evaluate(async () => { const t = await (await fetch('sw.js')).text(); return /PULSE_SKIP_WAITING/.test(t) && !/addAll\(SHELL\)\)\.then\(\(\) => self\.skipWaiting/.test(t); }));
  ok('every precached file exists', await page.evaluate(async () => { const t = await (await fetch('sw.js')).text(); const files = [...t.matchAll(/'(\.\/[^']+)'/g)].map((m) => m[1]); const bad = []; for (const f of files) { const r = await fetch(f, { method: 'HEAD' }); if (!r.ok) bad.push(f); } window.__bad = bad; return bad.length === 0; }), await page.evaluate(() => window.__bad));

  // Adventure: the Realm is the hub; old screens open from it and lead back
  await page.evaluate(() => G.nav('adventure', 'realm')); await page.waitForTimeout(500);
  ok('Adventure shows two sub-tabs', await page.evaluate(() => [...document.querySelectorAll('.navsub[data-tab="adventure"] [data-sub]')].map((b) => b.dataset.sub).join(',') === 'realm,league'));
  await page.evaluate(() => G.nav('adventure', 'village')); await page.waitForTimeout(400);
  ok('old Village screen still opens, with a way back', await page.evaluate(() => { const p = document.querySelector('#adventure .pane[data-pane="world"]'); return p.style.display !== 'none' && !!p.querySelector('.realm-back') && !!document.getElementById('villageRoot'); }));
  await page.evaluate(() => document.querySelector('.realm-back').click()); await page.waitForTimeout(400);
  ok('Back returns to the Realm', await page.evaluate(() => G.navSub('adventure') === 'realm'));
  await page.evaluate(() => G.nav('today'));

  ok('no console errors', errs.length === 0, errs.slice(0, 5)); ok('no outside requests', net.length === 0, net.slice(0, 5));
  await b.close(); console.log(fails.length ? '\n' + fails.length + ' FAILED' : '\nALL PASSED'); process.exit(fails.length ? 1 : 0);
})();
