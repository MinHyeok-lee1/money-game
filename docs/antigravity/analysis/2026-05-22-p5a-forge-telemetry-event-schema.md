# Phase P-5A: Forge Economy Telemetry — Event Schema

**Date**: 2026-05-22  
**Phase**: P-5A  
**Scope**: Local-only event schema for Forge economy telemetry  
**Status**: Design document — no code changes

---

## 1. Design Principles

1. **Minimum viable fields** — only what is needed to answer the four target questions. No speculative fields.
2. **Game-state values only** — all field values come directly from existing game state or function parameters. No derived metrics, no computed aggregates.
3. **Versioned** — each event carries `v:1` so schema changes can be detected on read.
4. **Typed strings** — `type` field is the discriminant for all event variants.
5. **Silent failure** — no event emission failure should propagate into game logic.

---

## 2. Storage Envelope

```json
{
  "schemaVersion": 1,
  "createdAt": 1716400000000,
  "updatedAt": 1716486400000,
  "events": [ ... ]
}
```

| Field | Type | Description |
| :--- | :--- | :--- |
| `schemaVersion` | number | Envelope schema version. Currently `1`. |
| `createdAt` | number | `Date.now()` when the store was first created. |
| `updatedAt` | number | `Date.now()` at last write. |
| `events` | array | Ordered array of event objects, oldest first. Capped at 150. |

**localStorage key**: `moneyGameForgeTelemetryV1`

---

## 3. Event Types

### 3.1 `forge_attempt`

Emitted on every call to `enhanceWeaponItem`, covering both the success and breakage paths.

**Emit point**: `enhanceWeaponItem` (~line 6701), after the result is computed and before state update.

```json
{
  "type": "forge_attempt",
  "v": 1,
  "ts": 1716400000000,
  "rarity": "epic",
  "prevLevel": 14,
  "success": false,
  "broken": true,
  "stabilizerUsed": false,
  "cost": 2100,
  "salvage": 5,
  "dz": true
}
```

| Field | Type | Source | Description |
| :--- | :--- | :--- | :--- |
| `type` | `"forge_attempt"` | literal | Event discriminant |
| `v` | `1` | literal | Schema version |
| `ts` | number | `Date.now()` | Emit timestamp (ms epoch) |
| `rarity` | string | `item.rarity` | Weapon rarity at time of forge attempt |
| `prevLevel` | number | `item.enhanceLevel` (before forge) | Enhancement level entering this attempt |
| `success` | boolean | forge result | True if level increased |
| `broken` | boolean | forge result | True if weapon was destroyed |
| `stabilizerUsed` | boolean | `forgeConfirmTarget.useStabilizer` | True if stabilizer was active for this attempt |
| `cost` | number | `getEnhanceCost(prevLevel)` | Shard cost of this attempt |
| `salvage` | number | `getSalvagePayout(prevLevel, rarity)` | Shards returned on break (0 if not broken) |
| `dz` | boolean | `prevLevel >= ENHANCE_BREAKAGE_START` | True if this attempt was in the danger zone (≥+11) |

**Notes**:
- `prevLevel` is the level before the attempt. If `success === true`, the weapon is now at `prevLevel + 1`.
- `salvage` is 0 when `broken === false`. When `broken === true`, this mirrors the `salvage` event's `payout` field.
- `dz` uses the existing constant `ENHANCE_BREAKAGE_START = 11`.

---

### 3.2 `stab_action`

Emitted when a stabilizer is crafted or consumed.

**Emit points**:
- `craftStabilizer` (~line 7025): action `"craft"`, after successful crafting
- `enhanceWeaponItem` (~line 6701): action `"use"`, when `stabilizerUsed === true`

```json
{
  "type": "stab_action",
  "v": 1,
  "ts": 1716400000000,
  "action": "craft",
  "shardsAfter": 850,
  "atLevel": 17
}
```

| Field | Type | Source | Description |
| :--- | :--- | :--- | :--- |
| `type` | `"stab_action"` | literal | Event discriminant |
| `v` | `1` | literal | Schema version |
| `ts` | number | `Date.now()` | Emit timestamp (ms epoch) |
| `action` | `"craft"` \| `"use"` | context | `"craft"` from `craftStabilizer`; `"use"` from `enhanceWeaponItem` |
| `shardsAfter` | number | `gameState.enhancement.shards` (post-action) | Shard balance after this action |
| `atLevel` | number | context | For `"craft"`: highest current weapon level (proxy for player progression). For `"use"`: `item.enhanceLevel` (prevLevel) of the weapon being forged. |

**Notes**:
- `shardsAfter` for craft events: shards after the `STABILIZER_CRAFT_COST = 50` deduction.
- `shardsAfter` for use events: shards at the time the forge is confirmed (stabilizer is consumed at confirm-time, not after result).
- `atLevel` for craft events uses the highest `enhanceLevel` across all weapons as a player-progression proxy (not tied to a specific weapon). Use `Math.max(...gameState.enhancement.items.map(i => i.enhanceLevel || 0))`.

---

### 3.3 `salvage`

Emitted from `enhanceWeaponItem` when the forge result is a breakage (`broken === true`). This event is always co-emitted with a `forge_attempt` event for the same forge action.

**Emit point**: `enhanceWeaponItem` (~line 6701), on the breakage path, after computing `getSalvagePayout`.

```json
{
  "type": "salvage",
  "v": 1,
  "ts": 1716400000000,
  "atLevel": 14,
  "rarity": "epic",
  "payout": 5,
  "gated": false
}
```

| Field | Type | Source | Description |
| :--- | :--- | :--- | :--- |
| `type` | `"salvage"` | literal | Event discriminant |
| `v` | `1` | literal | Schema version |
| `ts` | number | `Date.now()` | Emit timestamp (ms epoch) |
| `atLevel` | number | `item.enhanceLevel` (prevLevel) | Level at which the weapon broke |
| `rarity` | string | `item.rarity` | Weapon rarity |
| `payout` | number | `getSalvagePayout(prevLevel, rarity)` | Shards returned |
| `gated` | boolean | `prevLevel >= 15` | True if the weapon was above the +15 salvage gate (meaningful payout zone) |

**Notes**:
- `gated === false` means `payout === 5` (flat minimal return). `gated === true` means payout scales with rarity.
- `ts` on `salvage` and the co-emitted `forge_attempt` will be identical (same `Date.now()` call or ≤1ms apart).

---

### 3.4 `milestone`

Emitted from `enhanceWeaponItem` when a forge success brings a weapon to a tracked threshold level.

**Tracked levels**: 10, 15, 20, 30.

**Rationale for 15**: Not a prestige milestone in-game, but the salvage gate — the key economy behavioral threshold. Adding it here gives direct measurement of gate reach rate.

**Emit point**: `enhanceWeaponItem` (~line 6701), on the success path, after confirming `result.level` equals a tracked value.

```json
{
  "type": "milestone",
  "v": 1,
  "ts": 1716400000000,
  "level": 15,
  "rarity": "rare",
  "stabUsed": false,
  "attemptsHere": 3
}
```

| Field | Type | Source | Description |
| :--- | :--- | :--- | :--- |
| `type` | `"milestone"` | literal | Event discriminant |
| `v` | `1` | literal | Schema version |
| `ts` | number | `Date.now()` | Emit timestamp (ms epoch) |
| `level` | `10` \| `15` \| `20` \| `30` | result level | The threshold level just reached |
| `rarity` | string | `item.rarity` | Weapon rarity |
| `stabUsed` | boolean | `forgeConfirmTarget.useStabilizer` | True if a stabilizer was active for the final strike |
| `attemptsHere` | number | derived | Number of forge attempts at `prevLevel` before this success (retry count at the threshold level) |

**Notes**:
- `attemptsHere` requires a transient counter: how many times `enhanceWeaponItem` was called with `item.enhanceLevel === level - 1` before this success. This counter is in-memory only (not persisted). Reset to 0 after a success or break. Implementation: a `Map<instanceId, number>` tracking attempt count per weapon slot.
- `attemptsHere === 1` means the weapon leveled up on the first try at that level.
- If a weapon breaks before reaching the milestone, no milestone event is emitted — only a `salvage` event.

---

## 4. Field Value Inventory

All field values come from existing game state or constants. No new state is introduced:

| Field value | Existing source |
| :--- | :--- |
| `item.rarity` | Weapon object in `gameState.enhancement.items` |
| `item.enhanceLevel` | Weapon object in `gameState.enhancement.items` |
| `getEnhanceCost(level)` | Existing function, already called in `enhanceWeaponItem` |
| `getSalvagePayout(level, rarity)` | Existing function, already called in `enhanceWeaponItem` |
| `forgeConfirmTarget.useStabilizer` | Already read in `enhanceWeaponItem` |
| `gameState.enhancement.shards` | Existing state field |
| `ENHANCE_BREAKAGE_START` | Existing constant (= 11) |
| `Date.now()` | Standard JS |

---

## 5. Schema Versioning Policy

- Each event carries `v: 1`. If the schema is revised (field added, field removed, type changed), increment to `v: 2`.
- The storage envelope carries `schemaVersion: 1`. If the envelope structure changes, increment.
- Readers should filter `events.filter(e => e.v === 1)` to handle mixed-version logs gracefully.

---

## 6. Complete Example Log

```json
{
  "schemaVersion": 1,
  "createdAt": 1716400000000,
  "updatedAt": 1716400120000,
  "events": [
    {
      "type": "forge_attempt",
      "v": 1,
      "ts": 1716400010000,
      "rarity": "rare",
      "prevLevel": 9,
      "success": true,
      "broken": false,
      "stabilizerUsed": false,
      "cost": 525,
      "salvage": 0,
      "dz": false
    },
    {
      "type": "milestone",
      "v": 1,
      "ts": 1716400010000,
      "level": 10,
      "rarity": "rare",
      "stabUsed": false,
      "attemptsHere": 2
    },
    {
      "type": "stab_action",
      "v": 1,
      "ts": 1716400060000,
      "action": "craft",
      "shardsAfter": 450,
      "atLevel": 10
    },
    {
      "type": "forge_attempt",
      "v": 1,
      "ts": 1716400090000,
      "rarity": "rare",
      "prevLevel": 13,
      "success": false,
      "broken": true,
      "stabilizerUsed": false,
      "cost": 1575,
      "salvage": 5,
      "dz": true
    },
    {
      "type": "salvage",
      "v": 1,
      "ts": 1716400090000,
      "atLevel": 13,
      "rarity": "rare",
      "payout": 5,
      "gated": false
    }
  ]
}
```

---

## 7. Implementation Checklist (for P-5B / P-5C)

- [ ] Add `emitForgeEvent(event)` utility function (standalone, near top of script section)
- [ ] Wire `forge_attempt` emit into `enhanceWeaponItem` (both success and break paths)
- [ ] Wire `salvage` emit into `enhanceWeaponItem` (break path only)
- [ ] Wire `milestone` emit into `enhanceWeaponItem` (success path, level check: 10/15/20/30)
- [ ] Add in-memory `forgeMilestoneAttemptCounts` Map for `attemptsHere` tracking
- [ ] Wire `stab_action "use"` emit into `enhanceWeaponItem` (when `stabilizerUsed === true`)
- [ ] Wire `stab_action "craft"` emit into `craftStabilizer` (after successful crafting)
- [ ] Verify no game-state side effects: `emitForgeEvent` must not mutate any React state
- [ ] Verify silent failure: wrap all emit logic in try/catch
- [ ] QA: manually trigger each event type and confirm schema in DevTools console
