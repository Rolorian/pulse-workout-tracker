# Vendored code

All third-party code and data is copied in here. **Nothing is loaded from the internet at runtime.**

The app's Content-Security-Policy in `index.html` only allows the app's own files plus the weather API, so none of this code could send data anywhere even if it tried.

Each file was read and checked for `fetch`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`, `import()`, `eval`/`new Function`, storage and cookies before it was added.

| Folder | What | License | Used for |
|---|---|---|---|
| `pixelfx/` | 29 curated pixel effects (one readable bundle) | MIT | Realm combat, weather, and celebrations: PR, level-up, achievement, quest, confetti |
| `exercise-db/` | Bodyweight subset (188 moves) of free-exercise-db, text only | Public domain (Unlicense) | Exercise search and "How to do it" cards in the log sheet |
| `uplot/` | uPlot 1.6.32 (`uPlot.iife.min.js` + CSS) | MIT | Exercise Progress chart in Stats |
| `zzfx/` | ZzFX sound synth, wrapped as a classic script; no AudioContext is created at load | MIT | Small sound effects (set logged, PR sparkle, quest, delete) |
| `pixelarticons/` | 5 icons, inlined as SVG | MIT | Bottom navigation |
| `fuse/` | Fuse.js fuzzy search | Apache-2.0 | Typo-tolerant exercise search ("pusups", "sqauts") |
| `autoanimate/` | AutoAnimate | MIT | Smooth row changes in Today, History and Quests lists |
| `driver/` | Driver.js (+ CSS) | MIT | The "what's new" tour, replayable from Settings |
| `zzfxm/` | ZzFXM music renderer, wrapped to use the vendored ZzFX | MIT | The Realm's original chiptune soundtrack (`chiptunes.js`), made on the device |
| `rot/` | rot.js subset: RNG, Map.Digger, FOV, Path.AStar | BSD-3-Clause | Freshly carved dungeons, torchlight field of view, and monsters that chase you |
| `simplex-noise/` | simplex-noise.js | MIT | Organic ground patches and tree groves in Realm regions |

Sources and commits:
- pixelfx — patch-gg/pixelfx @ a841596
- exercise data — yuhonas/free-exercise-db @ f00c92c
- uPlot — leeoniya/uPlot @ e9066c1
- ZzFX — KilledByAPixel/ZzFX @ ac5a472
- Pixelarticons — halfmage/pixelarticons @ c9ecc2d
- Fuse.js — krisk/Fuse @ edf2fb6
- AutoAnimate — formkit/auto-animate @ 06882a8
- Driver.js — kamranahmedse/driver.js @ a75736a
- ZzFXM — keithclark/ZzFXM @ cb07fa9
- rot.js — ondras/rot.js @ 46782e2
- simplex-noise.js — jwagner/simplex-noise.js @ 6bfff87

The libraries written in TypeScript or ES modules were bundled once into plain browser scripts with `bun build --format=iife`. None of their install or build scripts were run.
