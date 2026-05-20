# Regression QA Audit: Targeted Roll & Codex (Phase L-6A)

- **Date**: 2026-05-20
- **Auditor**: Antigravity (Systems Engineer)
- **Status**: Complete

---

## 1. Gate Failure Paths (Target 1)
We audited the six validation gates in the targeted roll transaction handler `rollTargetedWeaponModification`:
1. **Gate 1 (Weapon Exists)**: Audited. If the `weaponInstanceId` does not match an existing item in the inventory with type `"weapon"`, it returns `{ success: false, reason: "weapon_not_found" }`.
2. **Gate 2 (Not Broken)**: Audited. If `item.broken === true`, it returns `{ success: false, reason: "weapon_broken" }`.
3. **Gate 3 (Not Locked)**: Audited. If `item.locked === true`, it returns `{ success: false, reason: "weapon_locked" }`.
4. **Gate 4 (Token Check)**: Audited. If `blackMarketTokens < 3`, it returns `{ success: false, reason: "insufficient_tokens" }`.
5. **Gate 5 (Valid Role)**: Audited. If the selected role is not in `VALID_TARGET_ROLES`, it returns `{ success: false, reason: "invalid_role" }`.
6. **Gate 6 (Pool Non-Empty)**: Audited. If the filtered `WEAPON_MOD_POOL` count is `< 1`, it returns `{ success: false, reason: "empty_role_pool" }`.

**Result**: **PASS**. All gates return early before modifying state. Exactly `0` tokens are deducted on any validation failure.

---

## 2. Token Deduction & Math (Target 2)
- **Cost**: Deducts exactly `3` tokens (`TARGETED_ROLL_COST`).
- **Math Safety**: Inside the `updateGameState` transaction updater, the token count is read safely using `toFiniteNumber` and `Math.floor`. The subtraction `prevTokens - TARGETED_ROLL_COST` is written back using `Math.max(0, ...)` ensuring it remains a non-negative integer.
- **Double Deduction**: Handled safely because the token balance check is re-verified inside the synchronous React state transition (`updateGameState` transaction callback), making it immune to rapid-click double deduction.

**Result**: **PASS**.

---

## 3. Roll Isolation & Codex (Target 3)
- **Per-Weapon Local State**: `targetRoleSelection` is a React state object keyed by `instanceId`. Role selections on one card do not leak or carry over to other cards.
- **Deselection**: Verified. Clicking the same active role pill sets the target role to `null` (toggles off).
- **Codex Collapse**: Default state for `showCodexForWeapon` is `null`. The Codex is collapsed by default on all cards.
- **Badge/Stats**: All 5 mod entries render role badge, glyph, name, stat, and flavor in a read-only layout (no purchasing/interactive actions).

**Result**: **PASS**.

---

## 4. Roll Recap Display Bug (Target 4)
We identified a logic bug in the roll recap layout at line 9331:
```javascript
{isReroll && !recap.isTargeted ? (
  <div className="text-[8px] text-zinc-400 leading-tight">
    {language === "ko"
      ? `이전: ${recap.previousMod?.name?.kr ?? "—"} → 현재: ${recap.mod?.name?.kr ?? "—"}`
      : `Prev: ${recap.previousMod?.name?.en ?? "—"} → Now: ${recap.mod?.name?.en ?? "—"}`}
  </div>
) : (
  recapFlavor && (
    <div className="text-[8px] text-zinc-400 leading-tight italic">
      {recapFlavor}
    </div>
  )
)}
```
*Issue*: If `recap.isTargeted` is true, the condition `isReroll && !recap.isTargeted` evaluates to `false`. Therefore, a targeted roll that replaces an existing mod (which is a reroll) will NOT show the "Prev -> Now" comparison, failing the QA target: *"Reroll recap (random or targeted) shows previous mod name before and current mod name after"*.

*Resolution*: The check `isReroll && !recap.isTargeted` should be simplified to `isReroll`.

---

## 5. UI Layout Constraints (Target 5)
- **Viewport Resilience**: The role selector layout wraps flex-pills natively. The name and stats use truncated flex configurations ensuring no layout break on 360px or 430px viewports.
- **Korean Localization**: "지정 개조 완료" is properly mapped as the header prefix for targeted rolls.
- **No Misleading Language**: The copy correctly uses "지정 벼림" (Roll Locked Role) rather than implies a guaranteed specific module, which accommodates future pool expansions per role.

**Result**: **PASS** (with the recap bug fix pending).
