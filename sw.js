// Service Worker for Money Game Universe
// Every deployment that changes index.html must bump CACHE_NAME manually.
const CACHE_NAME = "capital-front-v1.0.1";
const SHELL_URL = "./index.html";

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll([
      SHELL_URL,
      "favicon.svg",
      "manifest.json"
    ]))
  );
  // Activate the new SW immediately.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  // Only handle navigation requests (HTML pages).
  if (req.mode === 'navigate' || (req.headers.get('Accept') && req.headers.get('Accept').includes('text/html')) ) {
    event.respondWith(
      fetch(req).catch(() => caches.match(SHELL_URL))
    );
  } else {
    // For all other requests, fall back to network.
    event.respondWith(fetch(req));
  }
});
