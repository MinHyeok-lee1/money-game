# Phase P-1B Change Summary

This document summarizes the changes applied during Phase P-1B: Runtime QA & Exploit Audit.

## Changes Made

### 1. Currency Formatting Support
- **File modified**: [index.html](file:///c:/Users/ryan/dev/money-game/index.html)
- **Detail**: Changed the hardcoded Korean Won prefix (`₩`) on the bet slip stake input field to dynamically render based on language:
  ```html
  <span className="absolute left-3 top-2.5 text-gray-400 font-black text-xs">
    {language === "ko" ? "₩" : "$"}
  </span>
  ```

---

## Verification Results

### 1. Manual Verification
- Verified that switching the language to English updates the bet slip input currency prefix to `$`.
- Verified that switching the language to Korean updates the prefix to `₩`.
- Checked state normalization for empty inventories, which safely recovers by providing a starter weapon without causing infinite currency print loops.
- Gated the free defense run to only trigger when the user has 0 tickets and < 100 dividends, disabling itself as soon as the user wins dividends to prevent economy bypass.
