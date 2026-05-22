# Phase P-3A: Salvage UX Differentiation — Walkthrough

**Date**: 2026-05-22  
**Phase**: P-3A (Salvage UX Differentiation Pass)  
**Type**: UX copy change — no economy or schema changes

---

## 1. What Changed

Two copy elements in the Forge recap UI were updated to distinguish between gated (sub-`+15`) and ungated (`+15`+) shatters.

Both changes are inside the `lastEnhancementResult` IIFE where `prevLevel` is already in scope.

---

## 2. Change 1: Salvage Panel Sub-Text

**Location**: [`index.html`](file:///c:/Users/ryan/dev/money-game/index.html#L9525-L9534) — lines 9525–9534

```diff
- {language === "ko"
-   ? "파괴된 무기에서 제련 파편을 안정적으로 회수했습니다. 파편을 합성해 다음 제련에서는 보정제(파괴 방지)를 사용하십시오."
-   : "Refined shards safely extracted from the residue. Craft stabilizers using shards to protect your next attempt."}

+ {/* P-3A: Differentiated salvage panel copy */}
+ {prevLevel < 15
+   ? (language === "ko"
+     ? "+15 미만 파괴는 최소 회수만 지급됩니다. +15 이상 도달 시 본격적인 파편 회수가 시작됩니다."
+     : "Low-level shatters return minimal recovery. Push beyond +15 to unlock meaningful salvage.")
+   : (language === "ko"
+     ? "파괴된 무기에서 파편을 회수했습니다. 파편을 합성해 다음 제련에서는 보정제(파괴 방지)를 사용하십시오."
+     : "Shards salvaged from residue. Craft stabilizers to protect your next high-level run.")}
```

**Effect**: The pink salvage panel body copy now clearly states "minimal recovery" for sub-`+15` shatters and redirects the player toward the `+15` threshold. High-level shatters retain the consolation framing with stabilizer direction.

---

## 3. Change 2: Tactical Cue — Broken Branch (J-5B)

**Location**: [`index.html`](file:///c:/Users/ryan/dev/money-game/index.html#L9542-L9552) — lines 9542–9552

```diff
- {lastEnhancementResult.broken ? (
-   language === "ko"
-     ? "무기가 산산조각 났지만 파편을 회수했습니다. 파편을 모아 보정제를 합성하고 다음 무기를 제련하십시오."
-     : "Weapon shattered. Salvage shards to craft a stabilizer, securing your next run."
- ) : lastEnhancementResult.success ? (

+ {lastEnhancementResult.broken ? (
+   /* P-3A: Differentiated tactical cue - gated vs. ungated shatter */
+   prevLevel < 15 ? (
+     language === "ko"
+       ? "+15 미만 파괴는 최소 파편만 지급됩니다. +15 이상 위험 구간에서 파괴 시 본격적인 파편 회수가 가능합니다."
+       : "Minimal salvage — low-level shatters only return token recovery. Reach +15 for meaningful salvage value."
+   ) : (
+     language === "ko"
+       ? "무기가 파괴되었지만 의미 있는 파편을 회수했습니다. 파편을 모아 보정제를 합성하고 다음 제련을 준비하십시오."
+       : "Weapon shattered. Meaningful salvage recovered — craft stabilizers to secure the next run."
+   )
+ ) : lastEnhancementResult.success ? (
```

**Effect**: Players who shatter at `+10`–`+14` see "Minimal salvage" with guidance toward `+15`. Players who shatter at `+15`+ see "Meaningful salvage recovered" with stabilizer direction — matching the actual shard amounts they receive.

---

## 4. What Was NOT Changed

| Item | Status |
| :--- | :---: |
| `getSalvagePayout` math | ✅ Untouched |
| `getEnhanceChance` / `getBreakageChance` | ✅ Untouched |
| Stabilizer crafting cost (50 shards) | ✅ Untouched |
| Black Market economy | ✅ Untouched |
| `sw.js` / `manifest.json` (PWA) | ✅ Untouched |
| Save schema / persisted fields | ✅ No new fields |
| Shard amounts displayed (`💎 +5`, `💎 +1175`) | ✅ Accurate, unchanged |
| Success / failure / degradation cues | ✅ Untouched |

---

## 5. Verification Results

| Test | Expected Result | Verified |
| :--- | :--- | :---: |
| `+10` shatter → tactical cue | "Minimal salvage — ... Reach +15..." | ✅ (prevLevel=10, 10<15) |
| `+14` shatter → tactical cue | "Minimal salvage — ... Reach +15..." | ✅ (prevLevel=14, 14<15) |
| `+15` shatter → tactical cue | "Weapon shattered. Meaningful salvage recovered..." | ✅ (prevLevel=15, 15≥15) |
| `+20` shatter → tactical cue | "Weapon shattered. Meaningful salvage recovered..." | ✅ (prevLevel=20, 20≥15) |
| `+30` shatter → tactical cue | "Weapon shattered. Meaningful salvage recovered..." | ✅ (prevLevel=30, 30≥15) |
| Actual shard payout unchanged | 5 for <+15, formula for ≥+15 | ✅ `getSalvagePayout` untouched |
| No save schema changes | No new fields | ✅ Confirmed |
| No PWA changes | `sw.js`, `manifest.json` untouched | ✅ Confirmed |

---

## 6. Files Changed

| File | Action |
| :--- | :--- |
| [`index.html`](file:///c:/Users/ryan/dev/money-game/index.html) | **Modified** — 2 UX copy blocks differentiated (~18 lines changed) |
| [`docs/antigravity/analysis/2026-05-22-p3a-salvage-ux-differentiation.md`](file:///c:/Users/ryan/dev/money-game/docs/antigravity/analysis/2026-05-22-p3a-salvage-ux-differentiation.md) | **Created** — Analysis document |
| [`docs/antigravity/walkthroughs/2026-05-22-p3a-salvage-ux-differentiation.md`](file:///c:/Users/ryan/dev/money-game/docs/antigravity/walkthroughs/2026-05-22-p3a-salvage-ux-differentiation.md) | **Created** — This walkthrough |
| [`docs/task.md`](file:///c:/Users/ryan/dev/money-game/docs/task.md) | **Updated** — Phase P-3A checklist appended |
| [`TODO.md`](file:///c:/Users/ryan/dev/money-game/TODO.md) | **Updated** — Phase P-3A entry appended |

No temporary scripts were created. None were left behind.
