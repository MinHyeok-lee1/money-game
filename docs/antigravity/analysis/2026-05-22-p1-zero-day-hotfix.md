# Phase P-1 Zero-Day Hotfix Analysis

## Overview
This document analyzes the Zero-Day gameplay hotfix (Phase P-1) implemented in the Money Game Universe repository. The hotfix resolves three primary gameplay issues:
1. **Compact Number Formatting**: Ensuring actual compact formatting is used for all values consistently and cleanly.
2. **Forge Tab Crash and Hook Violation**: Correcting React hook warnings and ensuring a starter weapon is always allocated upon game normalization.
3. **Defense Bankruptcy Soft-lock**: Bypassing the ticket gate for Stage 1 runs when players are bankrupt (0 tickets and <100 dividends).

---

## 1. Compact Number Formatting

### Root Cause
Initially, the codebase utilized `formatMoney` everywhere, which performed standard locale-based formatting. A partial rename to `formatCompact` was started but left incomplete, leaving formatting inconsistent and causing mixed formats.

### Solution
- Created a global `formatCompactGlobal(val, isCurrency = true, currencyCode = "USD")` helper.
- Leverages `Intl.NumberFormat('en-US')` with `notation: 'compact'` and `maximumFractionDigits: 1` to ensure consistent English compact suffixes (`K`, `M`, `B`, etc.) across all locales.
- Added guards for `null`, `undefined`, `NaN`, `Infinity`, `-Infinity`, and explicit zero checks (`num === 0`) to return tidy values (e.g. `$0`, `₩0`, `0`).
- Updated the local `formatCompact` React helper to route directly to this global helper.
- Applied compact formatting to all core stats:
  - Cash values (currency formatted)
  - Refined Shards, DPS, Upgrade costs, Forge costs, Reward summaries (offline report, salvage totals, salvage history), and Black Market Tokens.

---

## 2. Forge Tab Recovery

### Root Cause
If the player's saved state contained an empty `enhancement.inventory`, the Forge tab would crash because it couldn't retrieve a valid first action or selected weapon. Additionally, React threw console warnings about Hook violations within `getWarStatusIndicators` due to dynamic `useEffect` calls.

### Solution
- Modified state normalization (`normalizeGameState`) to detect an empty inventory and automatically inject an `iron-dagger` +0 starter weapon.
- Set `starterWeaponGranted` to `true` to persist the state change.
- Refactored `migrateLegacyStateIfNeeded` to normalize state after migration and prior to storage, preventing old saves from encountering the empty inventory problem.
- Removed conditional hooks in `getWarStatusIndicators` to fix the Hook violation permanently.

---

## 3. Defense Bankruptcy Recovery

### Root Cause
Starting a defense run costs 1 ticket. Tickets are bought with dividends (100 DIV per ticket). If a player is defeated early in RPG mode, loses all tickets, and drops below 100 dividends, they become bankrupt. They cannot buy tickets, cannot start defense runs, and are permanently locked out of combat.

### Solution (Option A - Zero-cost Starter Unit/Action)
- Updated `startDefenseRun` to detect bankruptcy: `tickets <= 0 && dividends < 100`.
- If bankrupt, the player is permitted to start a baseline Stage 1 defense run without deducting tickets (the ticket cost is bypassed).
- Updated the UI Start button to check for bankruptcy. If bankrupt, it changes text to "Emergency Start (Free)" / "긴급 방어 지원 (무료)" and applies a pulsing amber highlight (`animate-pulse`) to signal availability.

### Abuse / Exploit Safety Analysis
Since the free starting condition is strictly gated by `dividends < 100`, players cannot hoard dividends or purchase upgrades while abusing the free run. The moment their dividends exceed or meet 100, the free run is disabled, and they must purchase tickets normally. Thus, it acts purely as a catch-up recovery mechanism.
