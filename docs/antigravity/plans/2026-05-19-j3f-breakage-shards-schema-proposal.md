# Phase J-3F: Breakage/Shards Schema Proposal

## Date: 2026-05-19

## Purpose

This document proposes the persistence schema additions required to support the Smith & Shards breakage, shard salvage, stabilizer, and weapon identity systems described in the J-3 design specs. It is a documentation-only proposal. No runtime code changes are included.

---

## 1. Current State Summary

### Current Save Key
`moneyGameUniverseStateV1` (must not change).

### Current `enhancement` Schema (from `createDefaultGameState`)
```js
enhancement: {
  inventory: [],          // Array of weapon/item instances
  failStacks: 0,          // Unused legacy field
  lastPulledItem: null,    // Last gacha result
  recentPulls: [],         // Recent gacha history (capped)
  lastEnhancementResult: null,
  starterWeaponGranted: false,
  weaponMastery: {},       // Legacy mastery map
  weaponLevels: {},        // Legacy level map
}
```

### Current Weapon Instance Shape (from `normalizeGachaItem`)
```js
{
  instanceId: string,      // Unique per-instance ID
  id: string,              // Base item definition ID
  characterId: string|null,
  name: string,
  type: "weapon"|"character",
  weaponType: string|null,
  rarity: string,
  power: number,
  enhanceLevel: number,    // 0 to MAX_ENHANCE_LEVEL (10)
}
```

### Current Enhancement Formulas (must not change)
- Cost: `500 * (level + 1)`
- Chance: `clamp(0.9 - level * 0.06, 0.3, 0.9)`
- Max level: `MAX_ENHANCE_LEVEL` (currently 10)

### Current Sandbox State (non-persistent, local React `useState`)
The sandbox forge in the Enhancement tab uses an isolated `sandboxState` with richer weapon fields (`scars`, `reaperEncounters`, `waveClears`, `successRate`, `breakRate`, `condition`, `locked`, `equipped`, `preferred`). This state is never persisted to localStorage and must remain non-persistent.

---

## 2. Proposed Schema Additions

All additions are backward-compatible. Missing fields default to safe values during normalization. No existing field is removed or renamed.

### 2A. Enhancement-Level Additions
```js
enhancement: {
  // ... all existing fields preserved ...

  refinedShards: 0,        // Refined Shards currency (primary shard type)
  basicShards: 0,          // Basic Scrap currency (common salvage)
  forgeStats: {            // Lifetime forge statistics
    totalAttempts: 0,
    totalSuccesses: 0,
    totalFailures: 0,
    totalBreakages: 0,
    totalShardsEarned: 0,
  },
  salvageHistory: [],      // Recent salvage payout log, capped at 10
}
```

### 2B. Weapon Instance Additions
```js
{
  // ... all existing fields preserved ...

  // Breakage & condition
  broken: false,           // Whether this weapon has been shattered
  condition: "normal",     // "normal" | "unstable" | "contaminated" | "blessed"
  breakSurvivalCount: 0,  // Times survived a breakage roll

  // Lock & favorite
  locked: false,           // Prevents accidental salvage/sell
  favorite: false,         // Star marker for sorting priority

  // Identity dossier (accumulated metadata)
  dossier: {
    anvilStrikes: 0,       // Total enhancement attempts on this weapon
    anvilSuccesses: 0,     // Successful enhancements
    deploymentCount: 0,    // Combat runs while equipped
    reaperEncounters: 0,   // Reaper-form enemies faced while equipped
    waveClears: 0,         // Stages cleared while equipped
    ownerHistory: [],      // Character IDs that equipped this weapon, capped at 5
    epithet: null,         // Dynamic title string, null = no earned title
  },
}
```

### 2C. Salvage History Entry Shape
```js
{
  id: string,              // Unique entry ID (e.g., "salvage-{timestamp}-{rand}")
  weaponName: string,      // Name of the destroyed weapon
  weaponLevel: number,     // Enhancement level at time of destruction
  weaponRarity: string,    // Rarity at time of destruction
  refinedShardsAwarded: number,
  basicShardsAwarded: number,
  createdAt: number,       // Timestamp
}
```

### 2D. Stabilizer Item Shape (Future Inventory Addition)
```js
{
  id: string,              // e.g., "stabilizer-basic", "stabilizer-refined"
  type: "stabilizer",
  tier: "basic"|"refined"|"mythic",
  successBonus: number,    // Additive % bonus to success chance (e.g., 3)
  breakProtection: boolean,// If true, prevents breakage on this attempt
  consumed: false,         // Single-use; consumed on anvil strike
}
```

Stabilizers are stored in `enhancement.inventory` alongside weapons. They are filtered by `type === "stabilizer"` in the forge UI.

---

## 3. Migration Rules

### Principle: Additive-Only, No Destructive Changes

All new fields are optional with safe defaults. The existing `normalizeGachaItem` and `normalizeInventoryItem` functions already strip unknown fields and fill missing fields. The migration strategy follows the same pattern.

### Migration Steps (for J-3G implementation)

1. **On load**: `normalizeGameState` reads `enhancement` from saved state.
2. **New fields**: If `refinedShards` is missing, default to `0`. If `basicShards` is missing, default to `0`. If `forgeStats` is missing, create the default object. If `salvageHistory` is missing, default to `[]`.
3. **Weapon instances**: If a weapon lacks `broken`, default to `false`. If it lacks `locked`, default to `false`. If it lacks `favorite`, default to `false`. If it lacks `condition`, default to `"normal"`. If it lacks `breakSurvivalCount`, default to `0`. If it lacks `dossier`, create the default empty dossier object.
4. **No field removal**: `failStacks`, `weaponMastery`, `weaponLevels` remain in schema even if unused, to preserve backward compatibility.
5. **No key change**: Save key remains `moneyGameUniverseStateV1`.

### Rollback Safety

If J-3G is reverted:
- The `normalizeGachaItem` function already strips fields not in its return shape. Unknown fields in saved weapons are naturally dropped on next load.
- Top-level fields (`refinedShards`, `basicShards`, `forgeStats`, `salvageHistory`) would remain in saved data as inert JSON. They cause no runtime errors because the existing normalization only reads known fields.
- No data loss occurs. The save file remains loadable by any version of the app.

---

## 4. Save Compatibility Rules

| Rule | Detail |
| :--- | :--- |
| Key unchanged | `moneyGameUniverseStateV1` |
| Additive only | No fields removed, no fields renamed |
| Default fill | All new fields have safe zero/null/empty defaults |
| Array caps | `salvageHistory` capped at 10 entries via `.slice(-10)` |
| Array caps | `dossier.ownerHistory` capped at 5 entries via `.slice(-5)` |
| Type safety | All new numeric fields wrapped in `toFiniteNumber(x, 0)` |
| Type safety | All new string fields validated with `typeof x === "string"` |
| Type safety | All new boolean fields coerced with `x === true` |
| Backward compat | Old saves without new fields load cleanly via defaults |
| Forward compat | New saves with extra fields load cleanly on old code (ignored) |

---

## 5. Non-Goals

This proposal explicitly does NOT include:

- Changing `GAME_STATE_STORAGE_KEY`
- Changing `MAX_ENHANCE_LEVEL` or enhancement cost/chance formulas
- Changing combat formulas (`applyCombatTick`, `getMonsterMaxHp`, Reaper modifiers)
- Changing Defense Contract odds, payout, settlement, or Game Over behavior
- Changing External Capital Leverage or Specialization formulas
- Implementing runtime breakage mechanics (deferred to J-3G)
- Implementing shard payout calculations (deferred to J-3G)
- Implementing stabilizer crafting or consumption (deferred to J-3G)
- Implementing Black Market trade UI or backend
- Implementing weapon epithet generation logic
- Making sandbox state persistent
- Adding server-side persistence or cloud saves
- Adding new tabs or navigation changes

---

## 6. J-3G Implementation Readiness Checklist

Before J-3G implementation begins, confirm:

- [x] Schema proposal document created (this document)
- [ ] Enhancement normalization function updated to fill new weapon fields
- [ ] Enhancement state normalization updated to fill `refinedShards`, `basicShards`, `forgeStats`, `salvageHistory`
- [ ] Shard payout formula defined (how many shards per weapon level/rarity on breakage)
- [ ] Breakage chance formula defined (probability curve by enhancement level)
- [ ] Stabilizer effect formula defined (success bonus and break protection rules)
- [ ] `MAX_ENHANCE_LEVEL` increase decision made (10 to 30 or phased)
- [ ] Existing sandbox weapons validated against new schema shape
- [ ] Forge UI updated to consume real `enhancement` state instead of sandbox state
- [ ] Salvage history UI implemented with `.slice(-10)` cap
- [ ] Lock/favorite toggle wired to persistent weapon instance fields

---

## 7. Risk Table

| Risk | Severity | Mitigation |
| :--- | :--- | :--- |
| Save corruption on malformed new fields | High | All new fields use `toFiniteNumber`/`typeof` guards with defaults |
| Unbounded array growth | Medium | `salvageHistory` capped at 10, `dossier.ownerHistory` capped at 5 |
| Korean text overflow in weapon epithets | Medium | Epithets capped at 30 characters; UI uses `truncate` class |
| Sandbox state accidentally persisted | Medium | Sandbox uses separate `useState`; no `setGameState` calls |
| Old code ignoring new fields silently | Low | Expected and safe; additive schema is forward-compatible |
| `weaponMastery`/`weaponLevels` drift | Low | Fields preserved but unused; no reads depend on them for new logic |
| Stabilizer items mixed with weapons in inventory | Low | Filtered by `type` field; `normalizeInventoryItem` already filters by type |

---

## 8. Explicit Guardrails

1. **No localStorage key change.** `moneyGameUniverseStateV1` is permanent.
2. **No destructive migration.** No fields are deleted, renamed, or type-changed.
3. **No schema required for sandbox-only state.** The sandbox forge remains ephemeral React state.
4. **No combat formula changes.** `applyCombatTick`, `getMonsterMaxHp`, `getMonsterDefeatReward`, Reaper pressure modifiers, and External Capital formulas are untouched.
5. **No fake backend / fake black market activation.** Black Market is design-only until a future phase explicitly implements it.
6. **No unbounded history arrays.** All new arrays have explicit slice caps documented above.
7. **No Korean text overflow from uncontrolled titles.** Epithet field is nullable and capped; UI rendering must use `truncate`.
8. **No Hero's Fate changes.** Defense Contract odds, payout, settlement, confirmation modal, and Game Over flow are untouched.
