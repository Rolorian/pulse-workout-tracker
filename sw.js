/* Pulse Workout Tracker — service worker
   Cache-first for the app shell so it loads instantly and fully offline.
   Bump CACHE on every release so clients pick up the new files. */
const CACHE = 'pulse-v14';
const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './game.css',
  './fx.js',
  './loot.js',
  './rivals.js',
  './world.js',
  './circuit.js',
  './plank.js',
  './character.js',
  './galaxy.js',
  './encounters.js',
  './boot.js',
  './pets.js',
  './village.js',
  './herolife.js',
  './future.js',
  './tower.js',
  './rpg.js',
  './nav.js',
  './assets/rpg/chars/c1.png',
  './assets/rpg/chars/c10.png',
  './assets/rpg/chars/c11.png',
  './assets/rpg/chars/c12.png',
  './assets/rpg/chars/c13.png',
  './assets/rpg/chars/c14.png',
  './assets/rpg/chars/c15.png',
  './assets/rpg/chars/c16.png',
  './assets/rpg/chars/c17.png',
  './assets/rpg/chars/c18.png',
  './assets/rpg/chars/c19.png',
  './assets/rpg/chars/c2.png',
  './assets/rpg/chars/c20.png',
  './assets/rpg/chars/c21.png',
  './assets/rpg/chars/c22.png',
  './assets/rpg/chars/c23.png',
  './assets/rpg/chars/c24.png',
  './assets/rpg/chars/c25.png',
  './assets/rpg/chars/c3.png',
  './assets/rpg/chars/c4.png',
  './assets/rpg/chars/c5.png',
  './assets/rpg/chars/c6.png',
  './assets/rpg/chars/c7.png',
  './assets/rpg/chars/c8.png',
  './assets/rpg/chars/c9.png',
  './assets/rpg/chars/dog.png',
  './assets/rpg/face/c1.png',
  './assets/rpg/face/c10.png',
  './assets/rpg/face/c11.png',
  './assets/rpg/face/c12.png',
  './assets/rpg/face/c13.png',
  './assets/rpg/face/c14.png',
  './assets/rpg/face/c15.png',
  './assets/rpg/face/c16.png',
  './assets/rpg/face/c17.png',
  './assets/rpg/face/c18.png',
  './assets/rpg/face/c19.png',
  './assets/rpg/face/c2.png',
  './assets/rpg/face/c20.png',
  './assets/rpg/face/c21.png',
  './assets/rpg/face/c22.png',
  './assets/rpg/face/c23.png',
  './assets/rpg/face/c24.png',
  './assets/rpg/face/c25.png',
  './assets/rpg/face/c3.png',
  './assets/rpg/face/c4.png',
  './assets/rpg/face/c5.png',
  './assets/rpg/face/c6.png',
  './assets/rpg/face/c7.png',
  './assets/rpg/face/c8.png',
  './assets/rpg/face/c9.png',
  './assets/rpg/face/dog.png',
  './assets/rpg/fx/f1.png',
  './assets/rpg/fx/f11.png',
  './assets/rpg/fx/f18.png',
  './assets/rpg/fx/f3.png',
  './assets/rpg/fx/f5.png',
  './assets/rpg/fx/f6.png',
  './assets/rpg/fx/f7.png',
  './assets/rpg/fx/f8.png',
  './assets/rpg/interior.png',
  './assets/rpg/items/arrow.png',
  './assets/rpg/items/big-treasure-chest.png',
  './assets/rpg/items/coin-2.png',
  './assets/rpg/items/gold-coin.png',
  './assets/rpg/items/gold-cup.png',
  './assets/rpg/items/heart.png',
  './assets/rpg/items/hud-heart.png',
  './assets/rpg/items/katana.png',
  './assets/rpg/items/life-pot.png',
  './assets/rpg/items/little-treasure-chest.png',
  './assets/rpg/items/scroll-fire.png',
  './assets/rpg/items/sword.png',
  './assets/rpg/mon/m1.png',
  './assets/rpg/mon/m10.png',
  './assets/rpg/mon/m11.png',
  './assets/rpg/mon/m12.png',
  './assets/rpg/mon/m13.png',
  './assets/rpg/mon/m14.png',
  './assets/rpg/mon/m15.png',
  './assets/rpg/mon/m16.png',
  './assets/rpg/mon/m17.png',
  './assets/rpg/mon/m18.png',
  './assets/rpg/mon/m19.png',
  './assets/rpg/mon/m2.png',
  './assets/rpg/mon/m20.png',
  './assets/rpg/mon/m21.png',
  './assets/rpg/mon/m22.png',
  './assets/rpg/mon/m3.png',
  './assets/rpg/mon/m4.png',
  './assets/rpg/mon/m5.png',
  './assets/rpg/mon/m6.png',
  './assets/rpg/mon/m7.png',
  './assets/rpg/mon/m8.png',
  './assets/rpg/mon/m9.png',
  './assets/rpg/music/battle.mp3',
  './assets/rpg/music/boss.mp3',
  './assets/rpg/music/dungeon.mp3',
  './assets/rpg/music/village.mp3',
  './assets/rpg/music/wilds.mp3',
  './assets/rpg/pixelify.ttf',
  './assets/rpg/ruins.png',
  './assets/rpg/sfx/1.mp3',
  './assets/rpg/sfx/13.mp3',
  './assets/rpg/sfx/2.mp3',
  './assets/rpg/sfx/3.mp3',
  './assets/rpg/sfx/5.mp3',
  './assets/rpg/sfx/9.mp3',
  './assets/rpg/sfx/alert.mp3',
  './assets/rpg/sfx/game-over.mp3',
  './assets/rpg/sfx/gold-1.mp3',
  './assets/rpg/sfx/kill.mp3',
  './assets/rpg/sfx/magic-1.mp3',
  './assets/rpg/sfx/menu-1.mp3',
  './assets/rpg/sfx/menu-3.mp3',
  './assets/rpg/sfx/power-up.mp3',
  './assets/rpg/sfx/succes-2.mp3',
  './assets/rpg/sfx/succes.mp3',
  './assets/rpg/sfx/sword.mp3',
  './assets/rpg/sfx/voice-1.mp3',
  './assets/rpg/sfx/voice-2.mp3',
  './assets/rpg/silkscreen.ttf',
  './assets/rpg/tileset.png',
  './assets/rpg/walls.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Never cache cross-origin calls (e.g. weather API) — just pass through.
  if (url.origin !== self.location.origin) return;

  const putInCache = (res) => {
    if (res && res.status === 200 && res.type === 'basic') {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
    }
    return res;
  };

  // Images, game art, audio and fonts rarely change: cache-first.
  if (/\.(png|jpg|jpeg|svg|ico|webp|mp3|ttf)$/i.test(url.pathname)) {
    e.respondWith(caches.match(req).then((cached) => cached || fetch(req).then(putInCache)));
    return;
  }

  // App code (HTML/JS/CSS/JSON): network-first so updates show up on the next open,
  // falling back to the offline copy if there's no signal or the network is slow (>3.5s).
  e.respondWith(new Promise((resolve) => {
    let settled = false;
    const fallback = () => caches.match(req, { ignoreSearch: req.mode === 'navigate' })
      .then((c) => c || caches.match('./index.html'));
    const timer = setTimeout(() => {
      fallback().then((c) => { if (c && !settled) { settled = true; resolve(c); } });
    }, 3500);
    fetch(req, { cache: 'no-cache' }).then((res) => {
      clearTimeout(timer);
      putInCache(res);
      if (!settled) { settled = true; resolve(res); }
    }).catch(() => {
      clearTimeout(timer);
      fallback().then((c) => { if (!settled) { settled = true; resolve(c || Response.error()); } });
    });
  }));
});
