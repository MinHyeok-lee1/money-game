# Phase P-3A: Salvage UX Differentiation — Analysis

**Date**: 2026-05-22  
**Phase**: P-3A (Salvage UX Differentiation Pass)  
**Scope**: Forge recap tactical cue copy and salvage panel sub-text differentiation

---

## 1. Problem Statement

Phase P-2D introduced a salvage gate in `getSalvagePayout`:
- Weapons shattered at **below `+15`** → flat **5 shards** (exploit prevention)
- Weapons shattered at **`+15` or above** → full rarity-scaled salvage payout

Phase P-2E verified the gate is mechanically correct and all exploit loops are dead.

The remaining UX issue identified in P-2E:

> The Forge recap tactical cue shows the **same copy** for both gated (5-shard) and ungated (1,175+ shard) shatters, leading to a confusing and slightly misleading player experience where a Mythic weapon shattered at `+10` receives 5 shards and is told to "salvage shards to craft a stabilizer" — as if the outcome was meaningful.

---

## 2. UX Analysis

### 2.1 Two Affected Text Elements

| Element | Location | Previous Behavior | Issue |
| :--- | :--- | :--- | :--- |
| Salvage panel sub-text | Lines 9525–9529 | Same copy for all shatters | Implied meaningful salvage even for 5-shard yields |
| Tactical cue (J-5B) | Lines 9542–9545 | Same copy for all shatters | "Craft a stabilizer" advice misleading at 5 shards |

### 2.2 Required Copy Logic

```
if (shattered AND prevLevel < 15):
  → "minimal salvage" copy — explains gate, directs toward +15
else if (shattered AND prevLevel >= 15):
  → "meaningful salvage" copy — directs toward stabilizer crafting
```

The variable `prevLevel` is already computed in-scope at line 9387 of the same IIFE:
```javascript
const prevLevel = lastEnhancementResult.prevLevel ?? (
  lastEnhancementResult.success ? lastEnhancementResult.level - 1 : lastEnhancementResult.level
);
```

No new persisted fields are required. No save schema changes needed.

---

## 3. Copy Design

### 3.1 Salvage Panel Sub-Text

| Condition | EN Copy | KO Copy |
| :--- | :--- | :--- |
| `prevLevel < 15` | "Low-level shatters return minimal recovery. Push beyond +15 to unlock meaningful salvage." | "+15 미만 파괴는 최소 회수만 지급됩니다. +15 이상 도달 시 본격적인 파편 회수가 시작됩니다." |
| `prevLevel >= 15` | "Shards salvaged from residue. Craft stabilizers to protect your next high-level run." | "파괴된 무기에서 파편을 회수했습니다. 파편을 합성해 다음 제련에서는 보정제(파괴 방지)를 사용하십시오." |

### 3.2 Tactical Cue (J-5B)

| Condition | EN Copy | KO Copy |
| :--- | :--- | :--- |
| `broken AND prevLevel < 15` | "Minimal salvage — low-level shatters only return token recovery. Reach +15 for meaningful salvage value." | "+15 미만 파괴는 최소 파편만 지급됩니다. +15 이상 위험 구간에서 파괴 시 본격적인 파편 회수가 가능합니다." |
| `broken AND prevLevel >= 15` | "Weapon shattered. Meaningful salvage recovered — craft stabilizers to secure the next run." | "무기가 파괴되었지만 의미 있는 파편을 회수했습니다. 파편을 모아 보정제를 합성하고 다음 제련을 준비하십시오." |

---

## 4. UX Design Rationale

### 4.1 Teach the Gate, Don't Just Apply It
A player who shatters a Mythic weapon at `+10` and receives 5 shards with no explanation will experience the outcome as arbitrary. Adding copy that explains *why* the recovery is minimal — and where the real recovery threshold is (`+15`) — transforms the outcome from "bug or unfairness" into "design you now understand."

### 4.2 Preserve the Consolation Feel at +15+
For `+15`+ shatters, the copy deliberately uses positive framing ("Meaningful salvage recovered") to reinforce that the player made a calculated risk and received appropriate consolation. This maintains Forge tension without making failure feel punishing.

### 4.3 Mobile Readability
Both branches use single-sentence structure under 100 characters (EN). The salvage panel sub-text and tactical cue fit on 2 lines at 320px viewport width without truncation.

---

## 5. Verification Checklist

| Test Scenario | Expected Tactical Cue | Expected Panel Sub-Text |
| :--- | :--- | :--- |
| Shatter at `+10` Common | "Minimal salvage — ... Reach +15..." | "Low-level shatters return minimal recovery..." |
| Shatter at `+14` Mythic | "Minimal salvage — ... Reach +15..." | "Low-level shatters return minimal recovery..." |
| Shatter at `+15` Common | "Weapon shattered. Meaningful salvage recovered..." | "Shards salvaged from residue. Craft stabilizers..." |
| Shatter at `+20` Epic | "Weapon shattered. Meaningful salvage recovered..." | "Shards salvaged from residue. Craft stabilizers..." |
| Shatter at `+30` Mythic | "Weapon shattered. Meaningful salvage recovered..." | "Shards salvaged from residue. Craft stabilizers..." |
| Non-shatter (fail/degrade) | Unaffected (degradation cue unchanged) | N/A (salvage panel only renders on shatter) |
| Successful enhancement | Unaffected (success cue unchanged) | N/A |

---

## 6. Out of Scope

Per strict constraints:
- Salvage payout math (`getSalvagePayout`) is **unchanged**
- Forge probabilities (`getEnhanceChance`, `getBreakageChance`) are **unchanged**
- Stabilizer economy is **unchanged**
- Black Market economy is **unchanged**
- PWA files (`sw.js`, `manifest.json`) are **untouched**
- Save schema is **unchanged** (no new persisted fields)
