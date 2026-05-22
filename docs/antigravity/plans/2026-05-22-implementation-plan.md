# Phase P-1B: Runtime QA & Exploit Audit Implementation Plan

Complete the verification, audit, and stability checks for Phase P-1 components, and apply a minor cosmetic fix to render the currency prefix dynamically in the bet slip.

## User Review Required

> [!IMPORTANT]
> - **Verification Scope**: We will audit compact formatting consistency, Forge empty-state recovery safety, and Defense bankruptcy ticket bypass mechanics.
> - **Bet Slip Currency Fix**: We will update the hardcoded `₩` symbol prefix on the bet slip input to render conditionally: `language === "ko" ? "₩" : "$"`.

## Proposed Changes

### Core UI Logic

#### [MODIFY] [index.html](file:///c:/Users/ryan/dev/money-game/index.html)

- **Line 8489**:
  Change:
  ```html
  <span className="absolute left-3 top-2.5 text-gray-400 font-black text-xs">₩</span>
  ```
  To:
  ```html
  <span className="absolute left-3 top-2.5 text-gray-400 font-black text-xs">
    {language === "ko" ? "₩" : "$"}
  </span>
  ```

## Verification Plan

### Manual Verification
1. **Currency Prefix Check**:
   - Set the language to Korean (`ko`) and verify the bet slip stake prefix is `₩`.
   - Set the language to English (`en`) and verify the bet slip stake prefix is `$`.
2. **End-to-End System Audit**:
   - Verify that formatting remains consistent.
   - Verify that empty inventory does not crash the Forge tab.
   - Verify that bankrupt players can use the emergency start option.
