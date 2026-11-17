/* Pulse — muscle map and coach notes. Sits inside the Muscle Balance card.
   The map is drawn here as blocky SVG (own artwork, no library). Notes are suggestions only: easy weeks and plateau ideas. */
(function () {
  const G = (window.G = window.G || {});
  const W = () => (typeof workouts !== 'undefined' && Array.isArray(workouts) ? workouts : []);
  const dk = (d) => (typeof dateKey === 'function' ? dateKey(d) : d.toISOString().slice(0, 10));
  const daysAgo = (n) => { const d = new Date(); d.setDate(d.getDate() - n); return dk(d); };
  const E = (s) => (typeof esc === 'function' ? esc(s) : String(s));
  const COL = { ok: '#49e39a', mid: '#f5c542', low: '#ff6b7a', none: '#2b3445' };
  const NAME = { push: 'Push', pull: 'Pull', legs: 'Legs', core: 'Core' };
  // [x, y, w, h, group] on a 44×64 grid; front figure at x 0–20, back figure at x 24–44
  const FRONT = [[8, 0, 5, 5, 'head'], [4, 6, 4, 4, 'push'], [13, 6, 4, 4, 'push'], [8, 6, 5, 6, 'push'], [3, 11, 3, 9, 'push'], [15, 11, 3, 9, 'push'], [8, 13, 5, 9, 'core'], [7, 23, 3, 13, 'legs'], [11, 23, 3, 13, 'legs'], [7, 37, 3, 10, 'legs'], [11, 37, 3, 10, 'legs']];
  const BACK = [[32, 0, 5, 5, 'head'], [28, 6, 13, 4, 'pull'], [30, 11, 9, 8, 'pull'], [27, 11, 3, 9, 'pull'], [39, 11, 3, 9, 'pull'], [31, 20, 7, 3, 'core'], [31, 23, 3, 13, 'legs'], [35, 23, 3, 13, 'legs'], [31, 37, 3, 10, 'legs'], [35, 37, 3, 10, 'legs']];
  function mapSvg(b) {
    const state = (g) => (g === 'head' ? 'none' : !b.sets[g] ? 'none' : b.fresh[g] >= 70 ? 'ok' : b.fresh[g] >= 40 ? 'mid' : 'low');
    const rect = ([x, y, w, h, g]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${COL[state(g)]}" stroke="#0d1117" stroke-width=".6"/>`;
    const label = 'Muscle map. ' + ['push', 'pull', 'legs', 'core'].map((g) => NAME[g] + ': ' + (b.sets[g] ? b.sets[g] + ' sets, ' + (b.fresh[g] >= 70 ? 'fresh' : b.fresh[g] >= 40 ? 'recovering' : 'tired') : 'not trained this week')).join('. ');
    return `<svg viewBox="-1 -1 46 56" width="150" height="182" role="img" aria-label="${E(label)}" shape-rendering="crispEdges" style="display:block">${FRONT.concat(BACK).map(rect).join('')}<text x="10.5" y="53.5" font-size="3.4" text-anchor="middle" fill="#8b98a9">FRONT</text><text x="34.5" y="53.5" font-size="3.4" text-anchor="middle" fill="#8b98a9">BACK</text></svg>`;
  }
  // total sets per week, newest first (week 0 = the last 7 days)
  function weeks(n) { const out = new Array(n).fill(0); W().forEach((w) => { for (let i = 0; i < n; i++) { if (w.date <= daysAgo(i * 7) && w.date > daysAgo(i * 7 + 7)) { out[i] += w.sets || 1; break; } } }); return out; }
  function plateau() {
    const per = {}; W().forEach((w) => { if (w.unit !== 'reps' || w.date < daysAgo(42)) return; const e = per[w.exercise] || (per[w.exercise] = {}); e[w.date] = Math.max(e[w.date] || 0, w.amount); });
    let best = null; Object.keys(per).forEach((ex) => { const days = Object.keys(per[ex]).sort(); if (days.length < 4) return; const last = days.slice(-4).map((d) => per[ex][d]); if (last.every((v) => v === last[0]) && (!best || days.length > best.n)) best = { ex, reps: last[0], n: days.length }; });
    return best;
  }
  function notes() {
    const out = []; const w = weeks(4);
    if (w[3] >= 6 && w[0] > w[1] && w[1] > w[2] && w[2] > w[3] && w[0] >= w[3] * 1.3) out.push({ id: 'deload', icon: '🌙', text: `Three weeks of climbing volume (${w[3]} → ${w[0]} sets). An easy week now — same moves, about half the sets — is how the gains settle in. Optional.` });
    const p = plateau(); if (p) out.push({ id: 'plateau', icon: '🧗', text: `${p.ex} has sat at ${p.reps} for four sessions. Try slower reps (3 seconds down), a short pause at the bottom, or one extra set instead of chasing more reps.` });
    const b = G.coachBalance ? G.coachBalance() : null;
    if (b && b.total >= 8 && b.sets.pull * 2 < b.sets.push) out.push({ id: 'pull', icon: '↔️', text: 'You push about twice as much as you pull. Rows or Superman holds keep shoulders happy.' });
    return out;
  }
  function render() {
    const c = document.getElementById('balanceCard'); if (!c || !G.coachBalance) return; const b = G.coachBalance();
    let box = c.querySelector('#muscleMap'); if (!box) { box = document.createElement('div'); box.id = 'muscleMap'; box.className = 'mmap'; const first = c.querySelector('.bal-row'); if (first) c.insertBefore(box, first); else c.appendChild(box); }
    box.innerHTML = mapSvg(b) + `<div class="mmap-key"><span><i style="background:${COL.ok}"></i>Fresh</span><span><i style="background:${COL.mid}"></i>Recovering</span><span><i style="background:${COL.low}"></i>Tired</span><span><i style="background:${COL.none}"></i>Not trained</span></div>`;
    let nb = c.querySelector('#coachNotes'); const ns = notes();
    if (!nb) { nb = document.createElement('div'); nb.id = 'coachNotes'; c.appendChild(nb); }
    nb.innerHTML = ns.map((n) => `<div class="cnote" data-note="${n.id}"><span aria-hidden="true">${n.icon}</span><span>${E(n.text)}</span></div>`).join('');
  }
  G.coach2 = { weeks, plateau, notes, render };
  G.on && G.on('render', () => { try { render(); } catch (e) { console.warn('coach2', e); } });
  setTimeout(() => { try { render(); } catch (e) { /* */ } }, 50);
})();
