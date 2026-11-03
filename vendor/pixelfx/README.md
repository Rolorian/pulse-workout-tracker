# pixelfx (vendored, curated)

Pulse Realm uses 29 pixel-art effects from [pixelfx](https://github.com/patch-gg/pixelfx) (MIT) for combat,
status, spawn and weather visuals.

## What is here

- `pixelfx.js` is one plain browser script. It was built once from commit
  `a84159688af3ca37a4be05a0d422b94451b2e24e` with `bun build entry.js --format=iife` and is not minified, so anyone can read it.
- `entry.js` lists exactly which effects were bundled.
- `LICENSE` is the MIT license. `NOTICE.md` holds the upstream attributions.
- The Patch Pixel font is **not** included, because it is not MIT.

## Privacy

This is a copy, not a link. Nothing is fetched from GitHub or anywhere else at runtime, and no npm package was
installed. None of the project's own scripts were run. The service worker caches the file with the rest of the app,
so it works offline.

The bundle was audited before it was added. It contains no `fetch`, `XMLHttpRequest`, `WebSocket`, `sendBeacon`,
`import()`, `eval`/`new Function`, `localStorage`, `sessionStorage`, `indexedDB`, `navigator`, `document` or cookie
access. All it does is fill pixel buffers with numbers; `rpg.js` copies those buffers to the screen. It cannot see the
player's data and has no way to send anything out.

To re-check:

```
grep -cE "fetch\(|XMLHttpRequest|WebSocket|sendBeacon|localStorage|indexedDB|eval\(|new Function|import\(|navigator|document\.|cookie" vendor/pixelfx/pixelfx.js
```

The command should print `0`.
