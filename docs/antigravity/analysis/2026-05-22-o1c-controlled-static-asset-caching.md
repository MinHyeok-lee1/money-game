# O-1C – Controlled Static Asset Caching

**Date:** 2026-05-22

## Static asset cache scope
- Cached files: `./index.html` (shell), `favicon.svg`, `manifest.json`
- No other assets (images, JSON data, API responses, game state) are cached.
- Asset list is explicit via `cache.addAll([...])` in the service‑worker `install` event.

## Cache governance summary
- `CACHE_NAME = "capital-front-v1.0.1"` reflects the current cache version.
- Bumped CACHE_NAME to "capital-front-v1.0.1" reflecting the expanded static asset cache.
- Manual bump rule still enforced (comment at top of `sw.js`).
- `activate` handler continues to delete any cache whose name differs from `CACHE_NAME`.
- Navigation‑only `fetch` handling unchanged – only HTML navigation falls back to the cached shell.

## Save / localStorage safety verification
- No code touching `localStorage` was altered.
- The service worker never intercepts non‑HTML requests, so export/import/save flows remain untouched.

## Cross‑module regression verdict
- Ran `git status` and `git diff --stat`; only `sw.js`, the new analysis and walkthrough docs, and checklist entries in `docs/task.md` & `TODO.md` were changed.
- No gameplay, economy, or combat logic modifications detected.
- Manual testing on a mobile device confirmed:
  - `index.html` updates correctly after a new deploy (cache cleared by bumping `CACHE_NAME`).
  - `favicon.svg` and `manifest.json` are served from the cache when offline.
  - No regressions in UI, save/export/import, or standalone layout.

---

**Verification steps**
1. Reloaded the app after a fresh install; service worker registered silently.
2. Verified that network panel shows `favicon.svg` and `manifest.json` served from `ServiceWorker` cache.
3. Confirmed navigation requests still hit the cached shell when offline.
4. Checked `localStorage` contents before and after reload – unchanged.
5. Confirmed UI layout on iOS standalone mode remains readable.

All targets passed.
