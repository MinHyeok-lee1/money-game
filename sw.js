const CACHE_NAME = "capital-frontline-v" + Date.now();
const STATIC_ASSETS = ["./index.html"];

// Install: pre-cache index.html only
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Activate: remove stale caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME)
            .map(k => caches.delete(k))
      )
    )
  );
    self.clients.claim();
    // Listen for messages to skip waiting (e.g., when a new version is available)
    self.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
      }
    });
});

// Fetch: navigation requests served from cache
// ALL other requests pass through — never intercept
// localStorage, clipboard, or any dynamic operations
self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
      event.respondWith(
        caches.match("./index.html")
          .then((cached) => cached || fetch(event.request))
          .catch(() => new Response('<!doctype html><html><body><h1>Offline</h1><p>Please reconnect.</p></body></html>', { headers: { 'Content-Type': 'text/html' } }))
      );
      return;
    }
  // Non-navigation: fall through to network unchanged
});
