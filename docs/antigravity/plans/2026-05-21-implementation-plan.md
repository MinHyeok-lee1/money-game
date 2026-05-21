# Implementation Plan: Offline Exploit Safety & Save Encryption Hardening (M-1A + N-1)

This plan details the production hardening pass for the Money Game Universe save pipeline and offline progress safety systems. We ensure all operations are mathematically precise, regression-safe, and backward compatible.

## User Review Required

> [!IMPORTANT]
> **1. Offline Progress Clamping (12 Hours Max)**
> A maximum clamp of `MAX_OFFLINE_SECONDS = 43200` (12 hours) will be applied. This prevents players from acquiring massive shard payouts (e.g. 7 days offline yields 262+ tokens) which would flood the mod economy.
> 
> **2. Encrypted Save Format & Tamper Alert**
> Saves written to `localStorage` under `moneyGameUniverseStateV1` will be obfuscated using Base64 with a trailing cyclic checksum (`encodedState.checksumHex`). If a checksum mismatch is detected on load, the game alerts the user and resets safely to the default state instead of crashing.
> 
> **3. UI Redesign of Save/Load Section**
> The existing white-themed "Save Data" container at the bottom of the "Frontier Master" tab will be refactored into a slate/zinc tactical block, integrating the new manual save, export clipboard flow, and paste-validation import modal.

## Open Questions

None. All constraints and requirements are fully specified.

---

## Proposed Changes

### [index.html](file:///c:/Users/ryan/dev/money-game/index.html)

#### [MODIFY] [index.html](file:///c:/Users/ryan/dev/money-game/index.html)
- **Define Constants**:
  - Add `const MAX_OFFLINE_SECONDS = 43200;` (12 hours).
- **Refactor `saveGameState`**:
  - Add Base64 serialization with Unicode safety: `btoa(unescape(encodeURIComponent(json)))`.
  - Calculate 16-bit cyclic checksum: sum of character codes modulo 65536, formatted as a hexadecimal suffix `.${checksumHex}`.
- **Refactor `loadGameState`**:
  - Check if string is plain JSON (starts with `{`). If so, load, normalize, and upgrade immediately by saving in the new format.
  - Split encrypted string by `.`, verify checksum.
  - If checksum matches, decode using `decodeURIComponent(escape(atob(encoded)))` and parse JSON.
  - If mismatch, alert user in selected language, reset to default, and do not crash.
  - Extract offline progression logic into `processOfflineProgress` for readability and robust isFinite/non-negative checks.
  - Update `lastSavedAt` immediately in memory (`gameState.settings.lastSavedAt`) when calculating offline rewards to prevent double-payouts on rapid reopening or refreshes.
- **Add React State in `GameApp`**:
  - `showImportModal` (boolean)
  - `importText` (string)
  - `importError` (string | null)
  - `systemToast` (`{ text: string, tone: "success" | "error" } | null`)
  - `exportFallbackString` (string)
- **Refactor Settings / Save Data Section**:
  - Re-style the section at the bottom of the Landlord tab to pitch-black tactical design.
  - Implement **Save**: calls `saveGameState` and triggers success toast.
  - Implement **Export**: saves latest state, reads string, writes to clipboard with fallback text area if clipboard permission fails.
  - Implement **Import**: displays modal overlay with full-width text area.
- **Add Import Modal and Toast Alert Overlay**:
  - Render at root level of `GameApp`'s JSX return.
  - Complete validations (checksum check, JSON parse check, normalization wrapper).

---

## Verification Plan

### Automated/Code Verification
- Run tests on base64 conversion containing Korean characters.
- Verify that a plain JSON string (representing old save version) upgrades seamlessly.
- Verify that a corrupted checksum triggers the alert and fallback.
- Verify that a future timestamp produces an elapsed time of 0.
- Verify that stage < 101 yields 0 offline shards.

### Manual Verification
1. **Offline Progress and Exploit Check**:
   - Manually edit `localStorage.moneyGameUniverseStateV1` to change `lastSavedAt` to 24 hours ago. Verify that rewards are capped at exactly 12 hours.
   - Verify that immediate refresh does not issue a second reward (no duplicates).
2. **Export / Import Integrity**:
   - Export state, verify it copies to clipboard.
   - Paste clipboard string into import modal, verify state updates successfully.
   - Modify one character of the save string in the text area, verify it fails validation and keeps the modal open.
