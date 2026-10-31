/* Pulse Workout Tracker — service worker
   Cache-first for the app shell so it loads instantly and fully offline.
   Bump CACHE on every release so clients pick up the new files. */
const CACHE = 'pulse-v12';
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
  './nav.js'
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

  // Images/icons rarely change: cache-first.
  if (/\.(png|jpg|jpeg|svg|ico|webp)$/i.test(url.pathname)) {
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
