const CACHE_NAME = 'freshshop-static-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/products.html',
  '/bulk-order.html',
  '/compare.html',
  '/cart.html',
  '/checkout.html',
  '/orders.html',
  '/track.html',
  '/wallet.html',
  '/admin.html',
  '/css/style.css',
  '/js/app.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME ? caches.delete(k) : null)))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => {}))
  );
});
