// Pulse — exercise library search.
// The data (window.EXLIB) is the bodyweight subset of free-exercise-db, public domain, stored in vendor/exercise-db.
// Everything happens on the device: no requests, nothing sent anywhere.
(function () {
  const LIB = () => window.EXLIB || [];

  // "Press ups", "press-up", "PRESSUPS", "push ups" all become the same key.
  const SYN = [[/pressup/g, 'pushup'], [/starjump/g, 'jumpingjack'], [/situp/g, 'situp'], [/sitsup/g, 'situp'],
    [/chinsup/g, 'chinup'], [/pullsup/g, 'pullup'], [/pushsup/g, 'pushup'], [/skippingrope/g, 'skip'], [/skipping/g, 'skip'],
    [/gluebridge/g, 'glutebridge'], [/hipthrust/g, 'glutebridge'], [/burpie/g, 'burpee']];
  function words(s) {
    return String(s || '').toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean)
      .map((w) => (w.length > 3 && /ses$/.test(w) ? w.slice(0, -2) : w.length > 2 && /[^s]s$/.test(w) ? w.slice(0, -1) : w));
  }
  function key(s) { let k = words(s).join(''); SYN.forEach(([a, b]) => (k = k.replace(a, b))); return k; }
  function toks(s) { return words(s).map((w) => { let k = w; SYN.forEach(([a, b]) => (k = k.replace(a, b))); return k; }); }

  // Matches a name against what was typed: the whole phrase, or every word somewhere in it ("squat jump" finds "Jump Squat").
  function exMatches(name, q) {
    const nk = key(name), qk = key(q); if (!qk) return true;
    if (nk.includes(qk)) return true;
    const t = toks(q); return t.length > 1 && t.every((w) => nk.includes(w));
  }

  // Library moves that are the same as one of Pulse's built-in buttons log under the built-in name,
  // so your history, PRs and quests stay in one place.
  const CORE_LINK = {
    'Pushups': 'Press-ups', 'Bodyweight Squat': 'Squats', 'Crunches': 'Crunches', 'Sit-Up': 'Sit-ups', 'Plank': 'Plank',
    'Mountain Climbers': 'Mountain climbers', 'Flutter Kicks': 'Flutter kicks', 'Superman': 'Superman', 'Pullups': 'Pull-ups',
    'Butt Lift (Bridge)': 'Glute bridges', 'Bodyweight Walking Lunge': 'Lunges', 'Freehand Jump Squat': 'Jump squats',
    'Decline Push-Up': 'Decline push-ups', 'Push-Up Wide': 'Wide push-ups', 'Side Bridge': 'Side plank',
    'Dips - Triceps Version': 'Dips', 'Bench Dips': 'Tricep dips'
  };
  const CORE_TO_LIB = {}; Object.keys(CORE_LINK).forEach((k) => (CORE_TO_LIB[CORE_LINK[k]] = k));
  function coreOf(e) { return CORE_LINK[e.n] || null; }

  function libFind(name) {
    const L = LIB(); const ln = CORE_TO_LIB[name] || name; const k = key(ln);
    return L.find((e) => e.n === ln) || L.find((e) => key(e.n) === k) || null;
  }

  // Best matches first: exact, then starts-with, then contains, then all-words; beginners before experts.
  function libSearch(q, limit = 12) {
    const qk = key(q); if (!qk) return [];
    const lv = { beginner: 0, intermediate: 1, expert: 2 };
    return LIB().map((e, i) => {
      const nk = key(e.n); let s = -1;
      if (nk === qk) s = 0; else if (nk.startsWith(qk)) s = 1; else if (nk.includes(qk)) s = 2; else if (exMatches(e.n, q)) s = 3;
      else if (e.m.concat(e.s).some((m) => key(m).startsWith(qk)) && qk.length >= 3) s = 5; // "chest", "glutes"…
      return s < 0 ? null : { e, i, s: s * 10 + (lv[e.l] ?? 1) + (e.k === 'stretching' ? 3 : 0) };
    }).filter(Boolean).sort((a, b) => a.s - b.s || a.e.n.length - b.e.n.length).slice(0, limit);
  }

  const CAT_ICON = { legs: '🦵', chest: '💪', core: '🔥', cardio: '🏃', arms: '💪', back: '🏋️', custom: '⭐' };
  const LVL = { beginner: 'Beginner', intermediate: 'Intermediate', expert: 'Expert' };
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const E = (s) => (window.esc ? window.esc(s) : String(s).replace(/[&<>"']/g, (c) => '&#' + c.charCodeAt(0) + ';'));

  function libButtons(q, shown) {
    const hits = libSearch(q, 14).filter((h) => !shown.has(coreOf(h.e) || h.e.n) && !shown.has(h.e.n)).slice(0, 10);
    if (!hits.length) return '';
    return `<div class="exgrid-head">📚 Exercise library · bodyweight</div>` + hits.map(({ e, i }) =>
      `<button class="ex ex-lib ${typeof selected !== 'undefined' && selected === e.n ? 'selected' : ''}" onclick="selectLib(${i})">${CAT_ICON[e.c] || '⭐'}<b>${E(e.n)}</b><small>${LVL[e.l] || ''}${e.m[0] ? ' · ' + E(cap(e.m[0])) : ''}</small></button>`).join('');
  }

  function selectLib(i) {
    const e = LIB()[i]; if (!e) return;
    const core = coreOf(e);
    if (core && typeof selectEx === 'function') { const m = typeof exMeta === 'function' && exMeta(core); selectEx(core, m ? m.unit : e.u); return; }
    // eslint-disable-next-line no-global-assign
    selected = e.n;
    const u = document.getElementById('unit'); if (u) u.value = e.u;
    if (typeof renderExercises === 'function') renderExercises();
    if (typeof haptic === 'function') haptic('selection');
    if (typeof playSound === 'function') playSound('click');
    const h = document.getElementById('exHowTo'); if (h) h.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }

  function howToHtml(name) {
    const e = name && name !== 'Custom' ? libFind(name) : null; if (!e || !e.st.length) return '';
    const mus = e.m.concat(e.s).map(cap).join(', ');
    return `<details class="howto"><summary>📖 How to do it <span>${LVL[e.l] || ''}${mus ? ' · ' + E(mus) : ''}</span></summary><ol>${e.st.map((s) => `<li>${E(s)}</li>`).join('')}</ol></details>`;
  }

  Object.assign(window, { exMatches, libSearch, libFind, libButtons, selectLib, howToHtml });
})();
