# L-5B — Bulk Shard Conversion & Reaper Scaling
**Date:** 2026-05-20  
**Phase:** L-5B  
**Scope:** `index.html` — convertAllShardsToTokens + dual-action workbench UI + Infinite Mode shard scaling

---

## Summary

Economic depth pass closing the loop between Infinite Mode survival and Black Market customization.
All math is integer-safe, bounded, and uses existing save structure without new schema fields.

---

## STEP 5 — convertAllShardsToTokens Handler

Located immediately after `convertShardsToTokens` in the blacksmith interaction block.

### Gate order (all must pass; any failure → no mutation)
1. `gameState.enhancement?.refinedShards >= 100` — minimum 1 token producible
2. `maxTokens >= 1` — Math.floor result is positive
3. `isFinite(maxTokens) && Number.isInteger(maxTokens)` — no NaN, no Infinity, no float
4. `maxTokens * 100 <= currentShards` — deduction does not underflow

### Math
```
maxTokens = Math.floor(refinedShards / 100)
shardsDeducted = maxTokens * 100
newRefinedShards = refinedShards - shardsDeducted  (floor >= 0)
newTokenBalance = blackMarketTokens + maxTokens
```

### Result object
- Success: `{ success: true, tokensGained, shardsDeducted, newBalance }`
- Failure: `{ success: false, reason: "<gate-that-failed>" }`

State committed inside `updateGameState()` with re-validation at transaction time.

---

## STEP 6 — Dual-Action Workbench Conversion UI

Replaced the single conversion row with a two-button block in the workstation footer.

| | Button 1 (existing) | Button 2 (new) |
|---|---|---|
| Label | `💎 100 → 🪙 1` | `모든 파편 일괄 전환` |
| Preview sub | — | `예상 토큰: {Math.floor(shards/100)}` |
| Action | `convertShardsToTokens(1)` | `convertAllShardsToTokens()` |
| Disabled when | shards < 100 | shards < 100 |
| Layout | `flex-1` in row | `flex-1` in row |

Layout: `flex flex-col sm:flex-row gap-1.5` — stacks vertically on mobile, row on sm+.
Both buttons are touch-friendly (min py-1 padding). Preview sub-line muted when disabled.

---

## STEP 7 — Infinite Mode Shard Payout Scaling

Injected into `applyCombatTick` at the `nextHp <= 0` (monster defeat) branch.
Stage 1–100 reward path: **completely unchanged**.

### Formula
```
baseShardsAwarded = 2                               (constant per kill)
IntensityTier = Math.floor((currentStage - 100) / 10) + 1
shardBonus = baseShardsAwarded * IntensityTier * 0.1
totalShardsAwarded = Math.floor(baseShardsAwarded + shardBonus)
```

### Tier examples
| Stage range | Tier | Total shards/kill |
|-------------|------|-------------------|
| 101–110     | 1    | floor(2.2) = 2    |
| 111–120     | 2    | floor(2.4) = 2    |
| 141–150     | 5    | floor(3.0) = 3    |
| 191–200     | 10   | floor(4.0) = 4    |
| 291–300     | 20   | floor(6.0) = 6    |

### Safety guards applied
- `isFinite(intensityTier)` — no NaN/Infinity
- `isFinite(shardBonus)` — no NaN/Infinity
- `Math.floor(...)` — integer result
- `totalShardsFloored > 0` — no zero or negative award
- `currentStage >= 101` guard — stage 1–100 completely bypassed
- `Math.max(0, prevRefinedShards + shardsToAward)` — floor at 0
- `enhancement` spread is conditional — only updated when `shardsToAward > 0`

### Economic loop
Stage 101 Tier 1 → ~50 kills per token at 100:1 rate.
Stage 141 Tier 5 → ~34 kills per token.
Stage 191 Tier 10 → ~25 kills per token.
Connects high-risk Reaper survival directly to Black Market token throughput.

---

## Verification

- GAME_STATE_STORAGE_KEY: unchanged
- No new setInterval
- No new persistent schema fields
- No new stat keys
- convertShardsToTokens (single) still fully functional
- Both buttons disable when shards < 100
- Preview line shows correct Math.floor(shards/100) whether enabled or disabled
- IntensityTier formula identical to I-5 definition
- Stage 1–100 reward path: no changes (shardsToAward = 0, enhancement spread skipped)
- No NaN or Infinity can reach enhancement.refinedShards
- Hero's Fate / Landlord / Frontier Master untouched
