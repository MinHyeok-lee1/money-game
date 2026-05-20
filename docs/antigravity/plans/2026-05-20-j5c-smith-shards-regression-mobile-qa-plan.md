# Implementation Plan - Phase J-5C: Smith & Shards Regression QA, Mobile Readability, and Live Breakage Engine

This phase connects the prototype breakage, stabilizer protection, and shard recovery mechanics of the Sandbox Mockup into the **LIVE** core blacksmith execution engine (`requestEnhance`, `enhanceWeaponItem`, `craftStabilizer`, and state normalization) using real save state variables (`gameState.enhancement.shards`, `gameState.enhancement.refinedShards`, and `gameState.enhancement.stabilizers`).

Additionally, it hardens UI layouts against mobile viewport overflow, calibrates danger thresholds, and enables milestone toasts for high prestige achievements (+10, +20, and +30).

---

## User Review Required

> [!IMPORTANT]
> **We are increasing `MAX_ENHANCE_LEVEL` from 10 to 30 to support the new live risk ladder.** 
> This is a safe progression extension. The cost formula (`500 * (level + 1)`) and success rate curve (`0.9 - level * 0.06`, floored at `30%`) will scale smoothly up to level 30 without any modifications.

> [!WARNING]
> **Confirmed shatters in the Live Forge will permanently delete the weapon from the player's inventory.**
> Shards (calculated as `level * 10`) will be added to the player's state. Legacy weapons marked as `broken: true` remain intact and can still be manually dismissed/salvaged.

---

## Open Questions

There are no unresolved open questions. All design specs map cleanly to the codebase structure.

---

## Proposed Changes

### Blacksmith & Enhancements Component

#### [MODIFY] [index.html](file:///C:/Users/ryan/dev/money-game/index.html)
- **State Initialization (`createDefaultGameState`)**:
  - Append `shards: 0` inside the `enhancement` state block.
- **State Normalization & Migration (`normalizeGameState`)**:
  - Ensure legacy saves map `shards` safely: fallback to `refinedShards` if `shards` is undefined.
  - Keep `shards` and `refinedShards` synchronized during normalizations.
- **Forge Danger confirmation logic (`requestEnhance`)**:
  - Only prompt confirmation modals for danger-zone levels (+11 and above).
  - Safe-zone levels (+1 to +10) bypass modals and execute immediately.
- **Live Forge Execution Engine (`enhanceWeaponItem`)**:
  - Implement live risk ladder consequences:
    - **Levels +1 to +10 (Safe Zone)**: Failure drops level by 1 (floor: +0). No breakage.
    - **Levels +11 to +20 (High Risk)**: Failure has 20% chance to shatter (or drop 1 level if protected by stabilizer).
    - **Levels +21 to +30 (Extreme Risk)**: Failure has 70% chance to shatter (or drop 1 level if protected by stabilizer).
  - On confirm shatter, remove weapon via `filter()` and credit `level * 10` shards.
- **Prestige Milestone Toasts (`getForgePrestigeAnnouncement`)**:
  - Expand thresholds to trigger toasts at +10, +20, and +30.
- **Stabilizer Crafting (`craftStabilizer`)**:
  - Deduct from both `shards` and `refinedShards` to keep them fully synced.
- **Mobile Auditing (CSS)**:
  - Inject `max-w-full overflow-hidden break-words whitespace-normal` to the onboarding panels and recap containers.

---

## Verification Plan

### Automated / Manual Verification
- **Enhance Test**: Strike the anvil below +11. Verify level drops by 1 on failure, floor: 0, no confirmation.
- **Breakage Test**: Strike the anvil at +11. Confirm warning modal is shown. Confirm shatter removes the item and adds shards.
- **Legacy Compatibility**: Ensure launching the app loads legacy storage correctly without throwing NaN or crashing.
