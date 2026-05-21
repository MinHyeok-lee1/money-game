# Implementation Plan: Save Recovery & PWA Transformation (N-1B + O-1)

This plan outlines the changes required to improve the user experience for save corruption recovery and convert the application into a progressive web app (PWA).

## User Review Required

> [!NOTE]
> All changes are pre-authorized for immediate execution.

## Proposed Changes

### [index.html](file:///c:/Users/ryan/dev/money-game/index.html)

#### [MODIFY] [index.html](file:///c:/Users/ryan/dev/money-game/index.html)
- **State Initialization & Corruption Flag**:
  - Add module-level `initialCorruptionDetected = false` to communicate load errors to React state.
  - In `loadGameState`, check `localStorage.getItem(GAME_STATE_STORAGE_KEY)`. If present and load fails (mismatch or exception), set `initialCorruptionDetected = true` and return a default state. Remove the raw browser `alert()`.
  - In `GameApp`, declare `[showCorruptionNotice, setShowCorruptionNotice] = useState(() => { const val = initialCorruptionDetected; initialCorruptionDetected = false; return val; })`.
- **UI Copy & Buttons (Landlord Tab)**:
  - Stack "진행 상황 저장" button.
  - Render Export as "데이터 추출 (저장 코드 복사)" and Import as "데이터 복구 (저장 코드 붙여넣기)".
  - Add small reminder: "저장 코드를 정기적으로 복사해두면 데이터를 보호할 수 있습니다."
- **Import Modal Refinements**:
  - Update `handleConfirmImport` with step-by-step checks to throw/set 5 distinct Korean error messages.
  - Re-style CTA buttons inside the modal to stack vertically on small devices and align side-by-side on larger screens (`flex-col sm:flex-row`).
  - Cap error text with `line-clamp-2` to prevent overflow.
- **PWA Meta & Service Worker**:
  - Inject manifest link and iOS standalone meta tags into `<head>`.
  - Append Service Worker registration script before `</body>` closing tag.
  - Inject native feel CSS rules to `<style>` block, ensuring the textarea remains fully text-selectable via `!important` exceptions.

### [manifest.json](file:///c:/Users/ryan/dev/money-game/manifest.json)
#### [NEW] [manifest.json](file:///c:/Users/ryan/dev/money-game/manifest.json)
- Create manifest file at root containing app name, short name, and portrait Standalone parameters.

### [sw.js](file:///c:/Users/ryan/dev/money-game/sw.js)
#### [NEW] [sw.js](file:///c:/Users/ryan/dev/money-game/sw.js)
- Create Service Worker at root to cache `./index.html` on install, prune old caches on activation, and serve `./index.html` exclusively for navigate requests.

---

## Verification Plan

### Automated Tests
- Validate that manifest.json is readable and contains valid JSON.
- Verify that sw.js caches only `./index.html` and bypasses all other requests.

### Manual Verification
1. **Corruption Notice Trigger**:
   - Corrupt the localStorage save file with a random string. Refresh the browser. Verify that the "저장 데이터 오류" notice is displayed.
   - Verify that clicking "데이터 복구" opens the import modal.
   - Verify that clicking "새로 시작" allows clean gameplay.
2. **Distinct Errors**:
   - Input empty save code: Verify "저장 코드를 입력하십시오." error.
   - Input invalid checksum code: Verify "저장 코드가 손상되었거나 변조되었습니다. 올바른 코드를 확인하십시오." error.
   - Input invalid base64: Verify "저장 코드 형식이 올바르지 않습니다." error.
3. **PWA Standalone & CSS Selection**:
   - Verify that UI text is not selectable, but input/textarea elements remain fully selectable.
   - Verify that there is no tap highlight on click.
