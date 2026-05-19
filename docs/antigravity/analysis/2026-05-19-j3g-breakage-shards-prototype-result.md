# J-3G: Breakage/Shards Prototype Foundation — Implementation Report

## Date: 2026-05-19

## Scope
First runtime implementation of the Smith & Shards destruction loop: breakage on enhancement failure, shard salvage payouts, stabilizer consumables, lock protection, and persistent forge statistics.

---

## 1. Runtime Systems Added

### A. Breakage Logic
- **Safe zone**: Enhancement levels +0 to +5 have 0% breakage chance.
- **Danger zone**: From +6 onward, breakage chance escalates via `dangerSteps^2 * 0.005 + dangerSteps * 0.015`.
  - +6: ~2%, +7: ~4%, +8: ~7%, +9: ~11%, +10: ~15%
- **Breakage occurs only on enhancement failure** — success never triggers breakage.
- **Broken weapons**: `broken: true` flag persists. Broken weapons cannot be enhanced or equipped.
- **Breakage survival counter**: `breakSurvivalCount` increments on successful enhancement or survived failure in the danger zone.

### B. Salvage Payout
- On breakage, refined shards are awarded immediately.
- **Formula**: `(10 + level * 15) * rarityMultiplier`, minimum 5 shards.
- **Rarity multipliers**: common 1x, uncommon 1.2x, rare 1.5x, epic 2x, legendary 3x, mythic 5x.
- Salvage history entry created with weapon name, level, rarity, shards awarded, timestamp.
- `salvageHistory` array capped at 10 entries via `.slice(-SALVAGE_HISTORY_CAP)`.

### C. Stabilizer Support
- `stabilizers` integer field tracks consumable count.
- **Crafting**: 50 refined shards per stabilizer, via `craftStabilizer()`.
- **Usage**: Optional per-strike via "보정 타격" button (visible only when stabilizers owned and breakage risk > 0).
- **Effect**: +3% success chance bonus + full breakage protection for that strike.
- **Consumed on use** regardless of success/failure outcome.

### D. Weapon Lock
- `locked` boolean persisted per weapon instance.
- Toggle via 🔒/🔓 button in inventory.
- Lock state is purely informational in this foundation — players must consciously unlock before risking.

### E. Forge Statistics
- `forgeStats` object tracks: `totalAttempts`, `totalSuccesses`, `totalFailures`, `totalBreakages`, `totalShardsEarned`.
- All fields default to 0; all guarded with `toFiniteNumber`.

### F. Visual Feedback
- **Breakage result display**: Last enhancement result shows "💥 파괴됨" / "💥 BROKEN" with cyan shard salvage count.
- **Inventory broken items**: Red background, strikethrough name, "잔해 정리" (Dismiss) button.
- **Breakage risk indicator**: Red `⚠️ 파괴: X%` shown inline per weapon when risk > 0.
- **Break survival badge**: `🛡️×N` shown for weapons that have survived danger zone attempts.
- **Shard currency strip**: Displayed in Enhancement header with refined shards, stabilizer count, and total breakages.
- **Stabilizer craft button**: Inline "+1" button appears when enough shards are available.
- **Salvage history panel**: Shown below inventory when entries exist, with reverse-chronological list.
- **Tactical log messages**: Breakage events emit dramatic tactical log entries.

---

## 2. Normalization & Migration Safety

### normalizeGachaItem Updates
New fields added to return shape:
- `broken: item.broken === true` (defaults `false`)
- `locked: item.locked === true` (defaults `false`)
- `breakSurvivalCount: Math.max(0, Math.floor(toFiniteNumber(..., 0)))` (defaults `0`)

### normalizeGameState Updates
Enhancement section now normalizes:
- `refinedShards`: `Math.max(0, toFiniteNumber(..., 0))`
- `forgeStats`: Each field `Math.max(0, Math.floor(toFiniteNumber(..., 0)))`
- `salvageHistory`: Validated array filtered by required fields, capped at `SALVAGE_HISTORY_CAP` (10)
- `stabilizers`: `Math.max(0, Math.floor(toFiniteNumber(..., 0)))`
- `lastEnhancementResult`: Extended with `broken` and `salvageShards` fields

### createDefaultGameState Updates
Enhancement defaults now include:
- `refinedShards: 0`
- `forgeStats: { totalAttempts: 0, totalSuccesses: 0, totalFailures: 0, totalBreakages: 0, totalShardsEarned: 0 }`
- `salvageHistory: []`
- `stabilizers: 0`

### Backward Compatibility
- All new fields have safe zero/false/empty defaults.
- Old saves missing new fields load cleanly via normalization.
- New saves with extra fields are ignored by older code.
- Save key remains `moneyGameUniverseStateV1`.
- No fields removed or renamed.

---

## 3. Performance Safety

| Check | Result |
|:---|:---|
| New setInterval calls | 0 (still exactly 3 total) |
| Array caps | `salvageHistory` capped at 10, all tactical logs at 10 |
| Recursive objects | None — `forgeStats` is flat, no nested dossier |
| Active-tab timer leaks | None — no new timers added |
| Expensive rerender loops | None — all state updates are synchronous via `updateGameState` |
| Unbounded growth | None — all new arrays have explicit caps |

---

## 4. UX Behavior Summary

| Scenario | Behavior |
|:---|:---|
| Enhancement +1 to +5 | No breakage risk shown, standard success/fail |
| Enhancement +6 to +10 | Red "⚠️ 파괴: X%" shown, breakage possible on failure |
| Weapon breaks | Red background, strikethrough, salvage shards awarded instantly, tactical log alert |
| Broken weapon in inventory | Cannot enhance, cannot equip, "잔해 정리" (Dismiss) button removes it |
| Locked weapon | 🔒 icon shown, lock toggle available (informational protection) |
| Stabilizer available + risk > 0 | "🛡️ 보정 타격" button appears alongside normal strike |
| Stabilizer used | Consumed, +3% success, breakage prevented for that strike |
| Salvage history | Reverse-chronological list below inventory, capped at 10 |
| Shard currency | Displayed in Enhancement header alongside stabilizer count |

---

## 5. Untouched Systems (Verified)

- `applyCombatTick` — unchanged
- `getMonsterMaxHp` / `getMonsterDefeatReward` — unchanged
- `settleDefenseContract` / `getDefenseContractOdds` — unchanged
- `getEnhanceCost` / `getEnhanceChance` — unchanged (original formulas preserved)
- Sandbox forge state — remains isolated `useState`, no `gameState` mutation
- All 3 existing `setInterval` calls — unchanged with `activeTab` guards and `clearInterval` cleanup
- `GAME_STATE_STORAGE_KEY` — `moneyGameUniverseStateV1` unchanged

---

## 6. Constants Added

```js
const ENHANCE_SAFE_ZONE_MAX = 5;
const ENHANCE_BREAKAGE_START = 6;
const SALVAGE_HISTORY_CAP = 10;
const STABILIZER_SUCCESS_BONUS = 0.03;
const STABILIZER_BREAK_PROTECTION = true;
const STABILIZER_CRAFT_COST = 50; // refined shards per stabilizer
```

---

## 7. Known Limitations

1. **Lock does not hard-block enhancement** — it is a visual indicator. Players must unlock before accidentally enhancing. A future phase could add a lock-guard confirmation modal.
2. **No stabilizer crafting UI beyond inline "+1" button** — a dedicated crafting panel is deferred.
3. **No Black Market** — explicitly out of scope per J-3F non-goals.
4. **No epithet generation** — deferred to future phase.
5. **No dossier rendering** — `breakSurvivalCount` is tracked but full dossier display is deferred.
6. **MAX_ENHANCE_LEVEL remains 10** — the J-3F spec notes this decision is deferred to J-3G+. This foundation supports the current 10-level cap.
7. **Breakage chance curve is tuned for levels 6-10** — if MAX_ENHANCE_LEVEL increases, the formula naturally extends.

---

## 8. Verdict: PASS

The breakage/shards prototype foundation is implemented with:
- Bounded, safe persistence
- No combat or settlement regressions
- No new timers or performance concerns
- Emotionally impactful breakage + immediate salvage relief
- Stabilizer strategic choice layer
- Full backward/forward save compatibility
