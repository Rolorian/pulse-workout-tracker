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
- Levels / XP, achievements, capes (RPG-style)
- Keyless weather (Open-Meteo, uses device location, optional)
- Sound + haptic toggles, richer sound effects
- Export backup as JSON or CSV, import, delete-all
- No account / server / database — fully private & offline

INSTALL AS AN APP (iPhone/Android)
Serve all the files above from an HTTPS origin (e.g. GitHub Pages), open in
the browser, then use "Add to Home Screen". The service worker makes it load
fully offline after the first visit.

Note: the service worker caches the app shell. After deploying an update,
bump the CACHE version string at the top of sw.js so devices fetch the new files.
