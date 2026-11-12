/* Pulse — declutter. Nothing is deleted: the cards you use every day stay on top, and the rest are grouped into
   folds you can open with one tap (the app remembers which you keep open). Turn it off in Settings → Simple layout. */
(function () {
  const G = (window.G = window.G || {}); const KEY = 'pulse-layout-v1';
  let L; try { L = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { L = null; }
  if (!L || typeof L !== 'object') L = {}; L.open = L.open || {};
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(L)); } catch (e) { /* */ } };
  const title = (c) => ((c.querySelector('h2') || c.querySelector('.fold-h span') || {}).textContent || '').trim();
  const find = (box, m) => [...box.children].find((c) => (m[0] === '#' ? c.id === m.slice(1) || c.querySelector(':scope > ' + m) : title(c).includes(m)));
  function fold(name, key, nodes, note) {
    const c = document.createElement('div'); c.className = 'card fold' + (L.open[key] ? ' open' : ''); c.dataset.dfold = key;
    const h = document.createElement('button'); h.className = 'fold-h'; h.type = 'button'; h.innerHTML = `<span>${name} <small class="fold-n">${nodes.length}</small></span><span class="fold-arrow">▾</span>`;
    const body = document.createElement('div'); body.className = 'fold-body';
    if (note) { const p = document.createElement('div'); p.className = 'coach-sub'; p.style.padding = '0 12px'; p.textContent = note; body.appendChild(p); }
    nodes.forEach((n) => { n.classList.add('flat'); body.appendChild(n); });
    h.onclick = () => { L.open[key] = !L.open[key]; save(); c.classList.toggle('open', !!L.open[key]); if (L.open[key]) { try { typeof render === 'function' && render(); } catch (e) { /* */ } window.dispatchEvent(new Event('resize')); } };
    c.appendChild(h); c.appendChild(body); return c;
  }
  // put `top` cards first (in that order), then everything unlisted, then the folds
  function arrange(box, top, folds) {
    if (!box || box.dataset.decluttered) return; box.dataset.decluttered = '1';
    const tops = top.map((m) => find(box, m)).filter(Boolean);
    const groups = folds.map((f) => ({ f, nodes: f.match.map((m) => find(box, m)).filter(Boolean) }));
    const firstCard = [...box.children].find((c) => c.classList.contains('card') && !tops.includes(c) && !groups.some((g) => g.nodes.includes(c)));
    const anchor = tops[0] && firstCard && (firstCard.compareDocumentPosition(tops[0]) & Node.DOCUMENT_POSITION_PRECEDING) ? tops[0] : firstCard;
    const mark = document.createComment('top'); if (anchor) box.insertBefore(mark, anchor); else box.appendChild(mark);
    tops.forEach((n) => box.insertBefore(n, mark)); mark.remove();
    groups.forEach(({ f, nodes }) => { if (nodes.length) box.appendChild(fold(f.name, f.key, nodes, f.note)); });
  }
  function run() {
    if (L.off) return;
    const today = document.getElementById('today');
    if (today) {
      const tower = document.getElementById('towerCard'); if (tower && tower.parentElement && tower.parentElement.id === 'homeTop') today.appendChild(tower); // out of the header block so it can be grouped
      arrange(today, ['#coachPlan', "Today's Activity", 'Daily Quests', '#coachLadders'], [
        { name: '🧰 Routines & circuits', key: 'tools', match: ['Routines', '#circuitCard', 'Supersets', "Today's Workout"] },
        { name: '🗼 Long-term challenges', key: 'long', match: ['#towerCard', '#plankCard'] }
      ]);
      // the two older folds (Daily Minimum, Warm-up) go last
      [...today.children].filter((c) => c.classList.contains('fold') && !c.dataset.dfold).forEach((c) => today.appendChild(c));
    }
    const stats = document.querySelector('#stats .pane[data-pane="progress"]');
    if (stats) arrange(stats, ['Exercise Progress', '#heatCard', '#balanceCard', 'Personal Records', 'Weekly Wrap'], [
      { name: '🏅 Achievements & capes', key: 'ach', match: ['Achievements', 'Cape Collection'] },
      { name: '📊 More charts', key: 'charts', match: ['Weekly Activity', '28-Day Consistency', 'Weekly Volume Trend', 'Body Part Volume', 'Exercise Frequency', 'Exercise Breakdown', 'Monthly Insights', 'Strength Estimates'] },
      { name: '📸 Memories & sharing', key: 'mem', match: ['This Day Last Year', 'Anniversary Highlights', 'Smart Tags', 'Shareable Progress'] }
    ]);
    const league = document.querySelector('#adventure .pane[data-pane="league"]');
    if (league) arrange(league, [], [{ name: '⚔️ Classic battle', key: 'classic', match: ['Live Battle', 'Boss Fights'], note: 'The original battle screens. The Realm is the full version of these.' }]);
    const lt = document.querySelector('.navsub[data-tab="adventure"] [data-sub="league"]'); if (lt && /Battle/.test(lt.textContent)) lt.firstChild.textContent = '🏆 League';
  }
  // Settings switch (reload applies it — moving cards back by hand would be fragile)
  function wire() {
    const hap = document.getElementById('toggleHaptics'); const row = hap && hap.closest('.set-row'); if (!row || document.getElementById('layoutRow')) return;
    const r = document.createElement('div'); r.className = 'set-row'; r.id = 'layoutRow';
    r.innerHTML = `<div><div class="set-name">🧹 Simple layout</div><div class="set-sub">Daily cards on top, the rest in folds. Nothing is removed.</div></div><button class="set-btn" type="button">${L.off ? 'Turn on' : 'Turn off'}</button>`;
    r.querySelector('button').onclick = () => { L.off = !L.off; save(); location.reload(); };
    row.parentNode.insertBefore(r, row.nextSibling);
  }
  function start() { setTimeout(() => { try { run(); wire(); } catch (e) { console.warn('declutter', e); } }, 250); }
  if (document.readyState === 'complete') start(); else window.addEventListener('load', start);
  G.declutter = { run, state: () => L };

  // keep the screen awake while a rest timer runs (built into the browser; no library)
  let lock = null;
  async function wake(on) { try { if (on && !lock && navigator.wakeLock) { lock = await navigator.wakeLock.request('screen'); lock.addEventListener('release', () => { lock = null; }); } else if (!on && lock) { await lock.release(); lock = null; } } catch (e) { lock = null; } }
  setInterval(() => { const running = typeof restInterval !== 'undefined' && !!restInterval; if (running !== !!lock) wake(running); }, 2000);
})();
