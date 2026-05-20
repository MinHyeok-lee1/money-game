# Black Market Mod Milestone Idempotency & Safety QA (Phase L-7A)

This document details the security audit, regression analysis, and hardening specifications for the **Abyssal Executor** milestone reward (+10 `blackMarketTokens` for Stage 150+ with an equipped tactical mod).

---

## 1. Security & Logic Audit

The existing milestone checking routine (`checkModMilestoneReward`) is vulnerable to potential race conditions, state duplication, and incorrect evaluation of equipped items. Specifically:
1. **Equipped Weapon Check**: The previous version only verified if a weapon with active mods existed in the player's general inventory (`enhancement.inventory.some(...)`). This fails to verify if the modded weapon is actually equipped, potentially awarding tokens for an inactive weapon sitting in the stash.
2. **Idempotency Checks**: While `modMilestoneClaimed` is evaluated, standard React state updates can queue state updater functions asynchronously. Multiple concurrent triggers (e.g., fast stage transitions) must be strictly gated at both the check boundary and inside the React state updater callback to ensure exactly one reward payout is possible.
3. **Finite Currency Validation**: Payout calculations must utilize absolute integer bounds (`isFinite`, `Math.floor`) to prevent token counts from turning into `NaN`, `Infinity`, or negative values.

---

## 2. Hardening Specification

### A. Strict Gating Criteria
The reward will be authorized if and only if:
1. **Stage Threshold**: `stage >= 150`.
2. **Equipped Weapon check**: At least one weapon in `gameState.enhancement.inventory` has:
   - `type === "weapon"`
   - `mods` is a non-empty array (`mods.length > 0`)
   - The weapon's `instanceId` matches the `equippedWeaponInstanceId` of:
     - Any owned character in `gameState.rpg.characters`
     - OR any active combat unit in `gameState.rpg.run.activeUnits`
3. **Idempotency**: `gameState.enhancement.modMilestoneClaimed === false`.

### B. Double-Barrier Idempotency Protection
To completely eliminate duplicate execution during rapid React updates:
1. **Pre-Flight Guard**: Exit early if `currentState.enhancement.modMilestoneClaimed === true`.
2. **State-Mutation Guard**: Inside the state updater callback, verify `prev.enhancement.modMilestoneClaimed === false`. If not, return the unmodified state object immediately.

### C. Safe Token Payout Math
- Read: `const currentTokens = Math.max(0, Math.floor(toFiniteNumber(currentState.wallet?.blackMarketTokens, 0)))`
- Add: `const newBalance = currentTokens + 10`
- Guard: If `!isFinite(newBalance) || newBalance < 0` then exit immediately.
- Inject: Set `blackMarketTokens = newBalance` and `modMilestoneClaimed = true` immutably.

---

## 3. UI Integrity & Feedback

### A. Badge Visual States
- **Locked State**: Renders with low contrast (`text-zinc-500 bg-zinc-950/10 border-zinc-800/50 opacity-50 select-none cursor-default`) indicating it is locked.
- **Claimed/Earned State**: Renders with amber accenting (`text-amber-400 bg-amber-950/20 border-amber-800/80 cursor-pointer`).

### B. Safe Interaction
- Clicking the claimed badge triggers a local state flash (`badgeFlash[item.instanceId] = true`) for visual satisfaction.
- Under no circumstances does clicking the badge re-trigger the token reward check, maintaining absolute separation between display events and economic mutations.
