/* Pulse — 5-tab bottom navigation. Reorganises the existing screens without rewriting them:
   Home · Hero · Adventure · Loot · Stats, each with at most 5 sub-tabs. */
(function () {
  const G = (window.G = window.G || {});
  const NKEY = 'pulse-nav-v1';
  let N; try { N = JSON.parse(localStorage.getItem(NKEY) || '{}'); } catch (e) { N = {}; }
  N.tab = N.tab || 'today'; N.sub = N.sub || {}; N.fold = N.fold || {};
  const save = () => localStorage.setItem(NKEY, JSON.stringify(N));

  const TABS = [
    { id: 'today', icon: '🏠', name: 'Home' },
    { id: 'hero', icon: '🧬', name: 'Hero', subs: [['hero', '🧬 Hero'], ['bag', '🎒 Bag'], ['talents', '🌳 Talents'], ['pets', '🐾 Pets']] },
    { id: 'adventure', icon: '⚔️', name: 'Adventure', subs: [['realm', '🌲 Realm'], ['map', '🗺️ Map'], ['dungeons', '🏰 Dungeons'], ['village', '🏘️ Village'], ['league', '🏆 Battle']] },
    { id: 'loot', icon: '💰', name: 'Loot', subs: [['crates', '📦 Crates'], ['casino', '🎰 Casino'], ['shop', '🛒 Shop'], ['forge', '⚒️ Forge']] },
    { id: 'stats', icon: '📊', name: 'Stats', subs: [['progress', '📈 Progress'], ['history', '📅 History'], ['galaxy', '🌌 Galaxy'], ['future', '🔮 Future']] }
  ];
  const byId = Object.fromEntries(TABS.map((t) => [t.id, t]));
  G.navSub = (tab) => { const t = byId[tab]; if (!t || !t.subs) return null; const s = N.sub[tab]; return t.subs.some((x) => x[0] === s) ? s : t.subs[0][0]; };
  G.navTab = () => N.tab;

  const $ = (id) => document.getElementById(id);
  const card = (el) => (el ? el.closest('.card') : null);
  const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };

  function subnav(tab) {
    const t = byId[tab];
    const bar = el('div', 'subtabs navsub'); bar.dataset.tab = tab;
    bar.innerHTML = t.subs.map(([id, label]) => `<button class="stab" data-sub="${id}">${label}<span class="sbadge" data-badge="${tab}:${id}"></span></button>`).join('');
    bar.querySelectorAll('[data-sub]').forEach((b) => (b.onclick = () => { G.nav(tab, b.dataset.sub); G.sfx && G.sfx('tick'); }));
    return bar;
  }

  function fold(title, key, nodes) {
    const c = el('div', 'card fold' + (N.fold[key] ? ' open' : ''));
    const h = el('button', 'fold-h', `<span>${title}</span><span class="fold-arrow">▾</span>`);
    const body = el('div', 'fold-body');
    nodes.forEach((n) => body.appendChild(n));
    h.onclick = () => { N.fold[key] = !N.fold[key]; save(); c.classList.toggle('open', !!N.fold[key]); };
    c.appendChild(h); c.appendChild(body);
    return c;
  }

  function build() {
    const app = document.querySelector('.app'); if (!app || $('navbar')) return;
    const oldTabs = document.querySelector('.tabs'); if (oldTabs) oldTabs.style.display = 'none';
    const today = $('today');
    // ---------- HOME ----------
    const grid = $('sessionCount') && $('sessionCount').parentElement.parentElement;
    const anchor = el('div'); anchor.id = 'homeTop';
    anchor.innerHTML = '<div id="heroHomeCard"></div><div id="towerCard"></div>';
    if (grid && grid.parentElement === today) grid.after(anchor); else today.prepend(anchor);
    const quests = card($('questList')); if (quests) $('plankCard').before(quests);
    const superset = card($('supersetArea')); if (superset) $('circuitCard').after(superset);
    const minimum = $('minimum'); const warmup = $('warmup');
    if (minimum && minimum.children.length) today.appendChild(fold('🎯 Daily Minimum', 'minimum', [...minimum.children]));
    if (warmup && warmup.children.length) today.appendChild(fold('🔥 Warm-up generator', 'warmup', [...warmup.children]));
    // the old cards' own titles are redundant inside folds
    today.querySelectorAll('.fold-body > .card').forEach((c) => c.classList.add('flat'));
    // ---------- HERO ----------
    const hero = $('hero'); hero.prepend(subnav('hero'));
    // ---------- ADVENTURE ----------
    const adv = el('section', 'section'); adv.id = 'adventure';
    adv.appendChild(subnav('adventure'));
    const banner = $('eventBanner'); if (banner) adv.appendChild(banner);
    const pRealm = el('div', 'pane'); pRealm.dataset.pane = 'realm'; pRealm.innerHTML = '<div class="realm-ph"></div>';
    const pLeague = el('div', 'pane'); pLeague.dataset.pane = 'league';
    const pWorld = el('div', 'pane'); pWorld.dataset.pane = 'world';
    const rival = $('rivalCard'); if (rival) pLeague.appendChild(rival);
    const battle = $('battle'); [...battle.children].forEach((c) => pLeague.appendChild(c));
    const wr = $('worldRoot'); if (wr) pWorld.appendChild(wr);
    adv.append(pRealm, pWorld, pLeague);
    hero.after(adv);
    // ---------- LOOT ----------
    const loot = $('loot'); loot.prepend(subnav('loot'));
    // ---------- STATS ----------
    const stats = el('section', 'section'); stats.id = 'stats';
    stats.appendChild(subnav('stats'));
    const mk = (name, src) => { const p = el('div', 'pane'); p.dataset.pane = name; if (src) [...src.children].forEach((c) => p.appendChild(c)); stats.appendChild(p); return p; };
    mk('progress', $('progress')); mk('history', $('history'));
    mk('galaxy').innerHTML = '<div id="statsGalaxy"></div>'; mk('future').innerHTML = '<div id="futureRoot"></div>';
    loot.after(stats);
    ['progress', 'history', 'warmup', 'minimum', 'battle', 'world'].forEach((id) => { const s = $(id); if (s) s.classList.add('retired'); });
    // ---------- bottom bar ----------
    const old = document.querySelector('.bottom'); if (old) old.style.display = 'none';
    const nav = el('nav', 'navbar'); nav.id = 'navbar';
    nav.innerHTML = TABS.map((t) => `<button class="navbtn" data-nav="${t.id}"><span class="nb-ic">${t.icon}</span><span class="nb-l">${t.name}</span><span class="nbadge" data-nbadge="${t.id}"></span></button>`).join('');
    nav.querySelectorAll('[data-nav]').forEach((b) => (b.onclick = () => { G.nav(b.dataset.nav); }));
    const fab = el('button', 'fab', '＋'); fab.id = 'fab'; fab.setAttribute('aria-label', 'Log workout'); fab.onclick = () => { openAdd(); };
    document.body.append(nav, fab);
  }

  function applyPanes(tab) {
    const sub = G.navSub(tab);
    document.querySelectorAll(`.navsub[data-tab="${tab}"] [data-sub]`).forEach((b) => b.classList.toggle('on', b.dataset.sub === sub));
    const realm = tab === 'adventure' && sub === 'realm' && N.tab === 'adventure';
    if (realm) { G.rpgOpen && G.rpgOpen(); } else if (G.rpgClose) G.rpgClose();
    if (tab === 'adventure') document.querySelectorAll('#adventure .pane').forEach((p) => (p.style.display = p.dataset.pane === (['map', 'dungeons', 'village'].includes(sub) ? 'world' : sub) ? '' : 'none'));
    if (tab === 'stats') {
      document.querySelectorAll('#stats .pane').forEach((p) => (p.style.display = p.dataset.pane === sub ? '' : 'none'));
      if (sub === 'galaxy' && G.renderGalaxy) G.renderGalaxy($('statsGalaxy'));
      if (sub === 'future' && G.renderFuture) G.renderFuture($('futureRoot'));
    }
  }

  G.nav = function (tab, sub) {
    if (!byId[tab]) tab = 'today';
    N.tab = tab; if (sub) N.sub[tab] = sub; save();
    document.querySelectorAll('.section').forEach((s) => s.classList.toggle('active', s.id === tab));
    document.querySelectorAll('#navbar [data-nav]').forEach((b) => b.classList.toggle('on', b.dataset.nav === tab));
    applyPanes(tab);
    window.scrollTo(0, 0);
    if (typeof haptic === 'function') haptic('light');
    if (typeof render === 'function') render();
  };
  // keep old tab ids working (bookmarks, other modules)
  const MAP = { today: ['today'], progress: ['stats', 'progress'], history: ['stats', 'history'], warmup: ['today'], minimum: ['today'], battle: ['adventure', 'league'], realm: ['adventure', 'realm'], world: ['adventure', 'map'], loot: ['loot'], hero: ['hero'] };
  window.switchTab = function (id) { const m = MAP[id] || ['today']; G.nav(m[0], m[1]); };
  G.goLoot = () => G.nav('loot');

  function badges() {
    const set = (sel, n) => document.querySelectorAll(sel).forEach((b) => { b.textContent = n ? (n > 9 ? '9+' : n) : ''; b.style.display = n ? '' : 'none'; });
    const letters = G.unreadLetters ? G.unreadLetters() : 0;
    const req = G.heroRequestOpen ? (G.heroRequestOpen() ? 1 : 0) : 0;
    set('[data-nbadge="hero"]', 0); set('[data-nbadge="today"]', letters + req);
    let free = 0; try { const c = G.hero(); ['STR', 'END', 'AGI', 'CORE', 'CON', 'WIL'].forEach((s) => (free += Math.max(0, Math.floor(c.base[s] / 10) - (G.talentSpent ? G.talentSpent(s) : 0)))); } catch (e) {}
    set('[data-badge="hero:talents"]', free); set('[data-nbadge="hero"]', free ? '•' : 0);
    let q = 0; try { const d = getDailyQuests(); q = d.quests.filter((x) => !x.done).length; } catch (e) {}
    set('[data-badge="adventure:village"]', 0);
  }
  G.navBadges = badges;

  build();
  G.on && G.on('render', () => { try { badges(); if (N.tab === 'stats' && G.navSub('stats') === 'future' && G.renderFuture) G.renderFuture($('futureRoot')); } catch (e) { console.warn('nav', e); } });
  G.nav(N.tab);
})();
