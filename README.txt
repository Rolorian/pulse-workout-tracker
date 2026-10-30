PULSE — WORKOUT TRACKER
Polished offline-first personal workout tracker (PWA).

Open index.html in a modern browser. Data is stored in localStorage on that device/browser.

FILES
- index.html ............ the whole app (HTML + CSS + JS)
- manifest.json ......... PWA manifest (now with icons)
- sw.js ................. service worker (real offline caching)
- icon-192.png .......... app icon
- icon-512.png .......... app icon
- icon-maskable-512.png . Android adaptive/maskable icon
- apple-touch-icon.png .. iOS home-screen icon

Includes:
- Today dashboard, workout + rest timers (with end-of-rest alarm)
- Jogging, press-ups, plank, sit-ups, squats, cycling and custom exercises
- Reps, minutes, seconds, kilometres, plus optional weight/load (kg)
- Back-dated entries, edit any logged workout, delete with Undo
- History with search + a month calendar view
- Streaks (with rest-day "freeze"), weekly stats, personal bests
- Per-exercise progress chart
- Routines: save a day's workout and re-log it in one tap
- RPG system: every exercise is its own 1-99 skill, grouped under 7
  categories, rolling up into a total level with unlockable titles
- Skill capes (per 99), Max/Comp/Trimmed capes, auto prestige past 99
- Reusable saved custom exercises (assign to a category, remembered)
- Level-up / cape-unlock popups with confetti
- Keyless weather (Open-Meteo, uses device location, optional)
- Sound + haptic toggles, retro/modern sound styles
- Export backup as JSON or CSV, import, delete-all
- No account / server / database — fully private & offline

INSTALL AS AN APP (iPhone/Android)
Serve all the files above from an HTTPS origin (e.g. GitHub Pages), open in
the browser, then use "Add to Home Screen". The service worker makes it load
fully offline after the first visit.

Note: the service worker caches the app shell. After deploying an update,
bump the CACHE version string at the top of sw.js so devices fetch the new files.

LOOT / RIVALS / WORLD UPDATE
- Economy: coins from every workout (daily cap), gems from bosses/quests/streaks/events, dust from salvaging
- 8 rarity tiers (Common → Celestial), 200+ items: fitness-themed gear, named uniques, sets, consumables, themes, titles
- Crates with CS:GO-style roller + pity timer, daily spin wheel, double-or-nothing, scratch cards, gym slots
- Forge: enchant +1..+10 (can shatter from +5), fusion, salvage; daily shop; 28-slot bag + bank; collection log
- Rivals: 8 AI rivals, weekly leagues Bronze → Grandmaster, trash talk feed, 1v1 duels, nemesis system
- World map: 10 regions × 5 stages, region bosses; dungeons: roguelike runs with doors, relics, hearts, bosses
- Seasonal events: Halloween, Bonfire Night, Christmas advent, New Year, Valentine's, Easter egg hunt, Summer,
  Double XP weekends, Blood Moon nights. Preview any event with ?event=halloween (etc.)
- Particles: confetti, fireworks, golden rain, rarity light beams, damage numbers, screen shake, ambient seasonal effects
- Files: fx.js, loot.js, rivals.js, world.js, game.css (all cached offline by sw.js)
