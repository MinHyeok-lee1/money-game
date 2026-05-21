# PWA Transformation & Native App Feel Analysis (O-1)

This report details the progressive web application (PWA) configuration and CSS tweaks applied to Money Game Universe under Phase O-1 to achieve a premium mobile game feel.

## 1. Web App Manifest Configurations
- **Manifest File**: Created at `manifest.json` in the root directory.
- **Key Parameters**:
  - `display`: `"standalone"` to remove browser chrome (navigation bars, menus).
  - `orientation`: `"portrait"` to lock viewport scaling correctly.
  - `start_url`: `"./index.html"` and `scope`: `"./"` to keep context within local app boundaries.
  - `theme_color` & `background_color`: Set to pitch-black/zinc dark theme `#09090b`.
- **Icon Assets**: Configured placeholders for standard Android/Chromium install prompts: `icon-192.png` and `icon-512.png`. Note that these icon files are optional for manual installation triggers in most modern web engines.

## 2. Head Meta Tags
- Linked manifest stylesheet: `<link rel="manifest" href="./manifest.json">`.
- Configured iOS Safari-specific tags:
  - `mobile-web-app-capable`: `"yes"`
  - `apple-mobile-web-app-capable`: `"yes"`
  - `apple-mobile-web-app-status-bar-style`: `"black-translucent"`
  - `apple-mobile-web-app-title`: `"자본전선"`

## 3. Service Worker caching strategy (`sw.js`)
- **Assets Caching**: Pre-caches `./index.html` exclusively during installation.
- **Cache Lifecycle**:
  - `activate` listener cleans up legacy caches to ensure smooth upgrades.
  - `fetch` listener intercepts navigation mode requests only, loading cached HTML instantly to enable offline play. All other assets/API/localStorage hooks pass through directly to avoid state mutations or storage lockouts.

## 4. Native App Feel CSS Optimizations
- **Highlight Color**: DisabledTap Flash highlights globally via `-webkit-tap-highlight-color: transparent` and `-webkit-touch-callout: none`.
- **Text Selection**: Disabled standard user selection globally on UI layout wrapper elements (`body`, `div`, `span`, `p`, etc.) using `user-select: none` to mimic compiled applications.
- **Tap Delay**: Integrated `touch-action: manipulation` on buttons and interactive items to skip the default 300ms tap delay in mobile browsers.
- **Critical Selection Exception**: Overrode user-select blockages on input elements (`textarea`, `input[type="text"]`, etc.) with `user-select: text !important` and `touch-action: auto !important` to ensure that clipboard operations (copy, paste, selection) remain fully functional inside backup modals.
