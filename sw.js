const CACHE_NAME = "capital-frontline-v1";
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
});

// Fetch: navigation requests served from cache
// ALL other requests pass through — never intercept
// localStorage, clipboard, or any dynamic operations
self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      caches.match("./index.html")
        .then((cached) => cached || fetch(event.request))
    );
    return;
  }
  // Non-navigation: fall through to network unchanged
});
