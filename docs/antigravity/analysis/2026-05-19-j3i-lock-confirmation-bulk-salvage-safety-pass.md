# J-3I: Lock Confirmation & Bulk Salvage Safety Pass — Implementation Report

## Date: 2026-05-19

## Scope
Safety-focused UX pass on the J-3G/J-3H foundation. Adds locked weapon enhancement hard-block, danger-zone forge confirmation modal, bulk broken weapon cleanup, and locked weapon UI explanation. No new persistence, no new timers, no formula changes.

---

## 1. Safety Improvements Added

### A. Locked Weapon Hard-Block
- `enhanceWeaponItem` now checks `item.locked === true` and returns early — locked weapons **cannot** be enhanced.
- `requestEnhance` wrapper also checks locked state before any modal or enhancement action.
- Inventory UI replaces enhance/stabilizer buttons with explicit explanation text when weapon is locked:
  - KO: "🔒 잠금 상태 — 제련 불가. 잠금 해제 후 진행하십시오."
  - EN: "🔒 Locked — Enhancement blocked. Unlock first."
- Lock toggle button remains visible next to the explanation, enabling intentional unlock.

### B. Danger Zone Forge Confirmation Modal
- New `forgeConfirmTarget` useState — stores `{ instanceId, useStabilizer, itemName, level, breakPct, successPct, stabCount }` or `null`.
- `requestEnhance(instanceId, useStabilizer)` wrapper function:
  - Safe zone (breakPct === 0): calls `enhanceWeaponItem` directly — no interruption.
  - Danger zone (breakPct > 0): sets `forgeConfirmTarget` to open confirmation modal.
- Confirmation modal displays:
  - Weapon name and current level
  - Success chance percentage
  - Break risk percentage (red highlight)
  - Stabilizer status (if used: break protection + 3% noted; if available but not used: recommendation shown)
- "⚒️ 제련 강행" / "FORGE ANYWAY" button confirms and proceeds with enhancement.
- "취소" / "Cancel" button closes modal without action.
- Modal uses same z-[110] overlay pattern as existing settlement confirmation modal.

### C. Bulk Broken Weapon Cleanup
- `bulkSalvageBrokenWeapons()` function removes all broken + unlocked weapons in one action.
- Filters: `broken === true && locked !== true` — locked broken weapons are preserved.
- Uses Set-based ID matching inside `updateGameState` for safe concurrent state access.
- Bulk dismiss button appears in inventory header only when broken unlocked weapons exist.
- Button shows count: "🗑️ 잔해 일괄 정리 (N)" / "🗑️ Bulk Dismiss (N)".
- Individual dismiss buttons remain for per-weapon cleanup.

### D. UI Flow Changes
- Enhance buttons ("⚒️ 모루 타격" / "🛡️ 보정 타격") now route through `requestEnhance` instead of calling `enhanceWeaponItem` directly.
- Locked weapons show explanation text instead of enhance buttons.
- Lock toggle button always visible regardless of locked state.

---

## 2. Schema & Persistence Impact

**No schema changes.** No new persisted fields. All changes are UI-layer:
- `forgeConfirmTarget` is transient React state (useState, not persisted).
- `requestEnhance` is a wrapper function — does not modify game state.
- `bulkSalvageBrokenWeapons` uses existing `inventory.filter()` pattern — no new fields.

No changes to `normalizeGachaItem`, `normalizeGameState`, or `createDefaultGameState`.

---

## 3. Performance Safety Verification

| Check | Result |
|:---|:---|
| New setInterval calls | 0 (still exactly 3 total) |
| Array caps | All unchanged — `salvageHistory` at 10, tactical logs at 10 |
| New persistence fields | 0 — forgeConfirmTarget is transient useState |
| Expensive animations | None — uses existing modal pattern |
| Canvas / particle systems | None |
| Unbounded growth | None — bulk salvage reduces inventory size |
| Active-tab timer leaks | None |

---

## 4. Save Compatibility Verification

| Rule | Status |
|:---|:---|
| Key unchanged: `moneyGameUniverseStateV1` | PASS |
| No new persisted fields | PASS |
| No schema changes | PASS |
| Old saves load cleanly | PASS (no normalization changes) |
| New saves compatible with old code | PASS (no new fields) |

---

## 5. Untouched Systems (Verified)

- `applyCombatTick` — unchanged
- `getMonsterMaxHp` / `getMonsterDefeatReward` — unchanged
- `settleDefenseContract` / `getDefenseContractOdds` — unchanged
- `getEnhanceCost` / `getEnhanceChance` — unchanged
- `getBreakageChance` / `getSalvagePayout` — unchanged
- Sandbox forge state — remains isolated, no cross-mutation
- All 3 `setInterval` calls — unchanged
- Enhancement formulas — unchanged
- Reaper modifiers — unchanged
- External Capital Leverage — unchanged

---

## 6. Safety UX Summary

| Scenario | Before (J-3H) | After (J-3I) |
|:---|:---|:---|
| Locked weapon enhance attempt | Enhancement proceeds (lock is informational only) | Hard-blocked — explanation text shown, must unlock first |
| Danger zone enhance attempt | Enhancement proceeds immediately | Confirmation modal with break risk, success chance, stabilizer recommendation |
| Danger zone + stabilizer available | No warning about unused stabilizer | Modal shows "N stabilizer(s) available — consider using one" |
| Multiple broken weapons | Must dismiss each individually | Bulk dismiss button in inventory header |
| Broken + locked weapon | Could be accidentally dismissed | Excluded from bulk dismiss — preserved by lock |

---

## 7. Known Limitations

1. **No undo for bulk salvage** — once dismissed, broken weapons are permanently removed. This is consistent with individual dismiss behavior.
2. **Confirmation modal does not appear for safe-zone weapons** — intentional; safe zone has 0% breakage risk.
3. **Lock does not block equip** — equip already blocks broken weapons (J-3G); lock is forge-specific safety.
4. **No confirmation for unlock action** — toggle is immediate. A future phase could add unlock confirmation for danger-zone weapons.
5. **Stabilizer recommendation in modal is passive** — player must cancel and choose stabilizer strike separately; no in-modal stabilizer toggle.

---

## 8. Verdict: PASS

The lock confirmation & bulk salvage safety pass adds meaningful player protection without any persistence changes, new timers, or formula modifications. Locked weapons are now truly protected, danger-zone forging requires conscious confirmation, and broken weapon cleanup is streamlined.
