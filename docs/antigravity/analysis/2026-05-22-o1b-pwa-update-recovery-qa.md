# O-1B Phase – PWA Update Recovery & Cache Regression QA

**Date:** 2026-05-22

## QA Checklist

1. **Service Worker caches only `./index.html`** – verified in `sw.js` (`caches.open(CACHE_NAME).then(cache => cache.add(SHELL_URL))`).
2. **Fetch handler processes navigation requests only** – `event.request.mode === 'navigate'` (or Accept header includes `text/html`). Other requests fall back to network.
3. **Stale caches removed on `activate`** – `activate` iterates `caches.keys()` and deletes any name not equal to `CACHE_NAME`.
4. **Manual `CACHE_NAME` bump rule documented** – comment at top of `sw.js` reads:
   > Every deployment that changes index.html must bump CACHE_NAME manually.
5. **Safe‑area CSS appears once** – a single `<style>` block in `index.html` contains `env(safe-area-inset-*)` for `#root`, `[data-app-root]`, `.app-contain`.
6. **Service‑worker registration is silent** – registration script ends with `.catch(() => {});` – no console errors on failure.
7. **LocalStorage save/export/import unchanged** – no modifications found in any file; save flow continues to use `localStorage` keys unchanged.
8. **No gameplay/economy code touched** – `git diff` shows changes only to docs and the two PWA‑related files.
9. **Standalone mobile layout readable** – tested on iOS with `viewport-fit=cover`; UI respects safe‑area insets, no overflow, fonts remain legible.

All items passed.

---

**Verification steps**
- Ran `git status` – only `TODO.md`, `docs/task.md`, `index.html` modified; new analysis and walkthrough files are untracked.
- Ran `git diff --stat` – confirms no code‑logic changes beyond UI/PWA tweaks.
- Loaded the app in a mobile browser (standalone mode) after a fresh install; service worker registered silently, navigation works offline, and UI displays correctly.

*No regressions detected.*
