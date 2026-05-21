# Change Summary: Save Encryption & Offline Exploit QA (M-1A + N-1)

This document summarizes the changes applied to `index.html` to introduce 12-hour offline progress clamping, duplicate payout prevention, Base64 save obfuscation with checksumming, and a dark-themed Import/Export UI modal.

## Summary of Changes

### 1. Offline Progress Security (M-1A)
- **Time Clamping**: Defined `const MAX_OFFLINE_SECONDS = 43200;` (12 hours) in [index.html](file:///c:/Users/ryan/dev/money-game/index.html).
- **Refactored Offline Progression**: Extracted the math and validations into a standalone helper function `processOfflineProgress(normalizedState)`.
- **Immediate Saving**: Auto-advances the `lastSavedAt` timestamp in memory and writes it to localStorage *before* loading the React UI state, blocking rapid page reload duplicate claims.
- **Robust Checks**: Enforces `isFinite()` on elapsed times, rates, intermediate products, and final values. Enforces `Math.max(0, ...)` floors to handle clock manipulation or future dates. Enforces zero shard drops for Stages < 101.

### 2. Encrypted Save Pipeline & Backup UI (N-1)
- **Encryption Layer**: Implemented Base64 save data obfuscation using `btoa(unescape(encodeURIComponent(json)))` for UTF-8 Unicode characters. Calculates a 16-bit cyclic checksum (char code sum modulo 65536) appended as a hex suffix `.checksumHex`.
- **Backward Compatibility**: Plain JSON files are automatically parsed, normalized, and updated on initial load to avoid breaking existing users' progress.
- **Import Validation**: Checks string patterns, verifies checksum equality, handles decode exceptions safely, runs parsed data through `normalizeGameState`, and writes to storage immediately.
- **UI Integration**:
  - Re-themed the "Save Data" panel in the Landlord tab to slate/zinc dark aesthetics.
  - Implemented **Save** button (manual save + success toast).
  - Implemented **Export** button (saves, obfuscates, writes to clipboard + success toast, with fallback textarea if permission is denied).
  - Implemented **Import** button & modal (interactive modal with a paste input field, confirming validation inline, updating React state and localStorage instantly, and closing on successful parse).

---

## Verification & Validation Results

### 1. Offline Progress Scenarios
- **Missing timestamp**: Evaluates to 0 minutes offline progress. No modal shown.
- **Future timestamp**: Enforced floor of 0 seconds elapsed. No modal shown.
- **Uncapped time (7 days)**: Cap of 12 hours applied successfully.
- **Double-opening**: Re-entry within 5 seconds yields 0 seconds elapsed. No duplicate modal shown.

### 2. Encryption Pipeline Scenarios
- **Plain JSON load**: Loads and updates format immediately.
- **Tampered string**: Mismatched checksum triggers a browser warn, alerts the user, and fallback-initializes a default state.
- **Valid save import**: Modifies the React state immediately, saving the new progress safely to localStorage.
