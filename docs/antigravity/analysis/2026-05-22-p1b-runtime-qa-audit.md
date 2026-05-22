# Phase P-1B: Runtime QA & Exploit Audit Report

This report documents the verification, security audit, and stability checks for the Phase P-1 hotfixes implemented in the Money Game Universe codebase.

---

## 1. QA Scope

The runtime QA and exploit audit targeted the following core areas:
- **Compact Formatting Consistency**: Audited all currency, stats, costs, and rewards to ensure no overflow, duplicate symbols, or malformed suffixes exist.
- **Forge Recovery Safety**: Evaluated the empty-inventory weapon auto-grant and the one-time claim weapon constraints to check for duplicate items or React warnings.
- **Defense Bankruptcy Exploit Security**: Audited the emergency free-start ticket bypass mechanism to ensure it cannot be bypassed to bypass ticket costs or print dividends infinitely.
- **Runtime Stability**: Analyzed component mount/unmount behaviors, hook safety, state update recursion risks, and save/load lifecycle stability.

---

## 2. Compact Formatting Audit

- **Global Formatting Utility**: The global function `formatCompactGlobal` handles NaN, Infinity, negative values, and zero values with safety guards (e.g. `₩0`, `$0`, `0`).
- **Locale & Suffix Consistency**: The function enforces standard English compact suffixes (`K`, `M`, `B`, etc.) across all locales.
- **Negative & Zero Values**: Verified that negative values are safely rendered (e.g. `-₩1.5M`).
- **Raw Overflow Prevention**: Verified that all large currency figures (Cash) and count fields (Refined Shards, DPS, and Black Market Tokens) utilize `formatCompact` or `formatDps` to prevent overflow rendering.
- **Identified & Fixed Visual Bug**: The bet slip stake input field currency prefix was hardcoded to `₩`. This has been updated to dynamically check the language state (`language === "ko" ? "₩" : "$"`).

---

## 3. Forge Recovery Audit

- **Auto-Grant Fallback**: In state normalization (`normalizeGameState`), if the player's inventory becomes empty (e.g. after salvaging a weapon), a default `Iron Dagger` (+0) is automatically injected.
- **Dismantle/Salvage Exploit Assessment**: A +0 starter weapon dismantles for `0` shards (since salvage payout is `level * 10` or base levels below +10 return 0 salvage shards). Upgrading weapons costs Cash. Thus, there is no circular infinite resource printing vector.
- **Claim Action Isolation**: The "Claim Starter Weapon" action is strictly guarded by `starterWeaponGranted === true`. It can only be claimed once, and the button is permanently disabled after activation.
- **Save/Load Integrity**: Loops of saving and loading successfully preserve the one-time claim state and the auto-granted weapons without duplicating items.

---

## 4. Defense Exploit Audit

- **Bankruptcy Condition Lock**: The ticket cost bypass is strictly gated by `tickets <= 0 && dividends < ticketCost` (where `ticketCost = 100`).
- **Farming Vector Assessment**:
  - A Stage 1 run grants `25` dividends per monster killed.
  - As soon as the player kills 4 monsters, their dividends hit `100`.
  - Once dividends are `>= 100`, the bankruptcy check `dividends < ticketCost` fails, disabling the free start capability.
  - The player must then spend `100` dividends to buy a ticket to start a run.
  - Therefore, the bypass cannot be used to accumulate tickets or hoard dividends, ensuring it remains a pure recovery mechanism and not an exploit.

---

## 5. Runtime Stability Audit

- **React Hook Security**: Verified that `getWarStatusIndicators` is a pure function that does not call any React hooks, resolving previous conditional hook warnings and console spam.
- **State Loop Prevention**: State normalization is executed immutably during the state update transition, avoiding recursive update loop conditions.
- **Legacy Save Normalization**: Validated that old saved states containing legacy schema structures are safely migrated and normalized before committing to `localStorage`.

---

## 6. Remaining Risks

- **Low Risk**: Standard floating-point values during high-multiplier runs. These are protected by standard `isFinite` and `toFiniteNumber` guards. No new risks identified.

---

## 7. Minimal Fixes Applied

- Modified line 8489 in [index.html](file:///c:/Users/ryan/dev/money-game/index.html) to render the currency prefix conditionally based on the active language setting:
  ```html
  <span className="absolute left-3 top-2.5 text-gray-400 font-black text-xs">
    {language === "ko" ? "₩" : "$"}
  </span>
  ```

---

## 8. Verification Summary

- **JSX Structure**: Verified compile-safety and valid React render tree structure.
- **Currency Switcher**: Verified the bet slip prefix renders as `₩` in Korean and `$` in English.
- **Zero Console Warnings**: Verified that React does not emit warnings regarding hook execution order or infinite render loops.

---

## 9. Recommended Commit Message

```text
qa(front): complete runtime QA audit and fix bet slip currency prefix

- Update hardcoded currency prefix in bet slip to respect language setting
- Document stability, exploit safety, and formatting audits for P-1
```

---

## 10. Recommended Next Phase

- **Phase P-2: Balance Tuning & Analytics Scaffolding**: Refine progression curves and introduce clean telemetry metrics to monitor player engagement.
