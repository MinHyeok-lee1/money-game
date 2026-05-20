# Implementation Plan: Reaper Run Objective & Black Market Economy Scaffolding (Phase K-3 & L-1)

This plan implements the Reaper Run Objective panel (Phase K-3) and scaffolds the Black Market economy (Phase L-1) without modifying the saved game state version or introducing breaking changes.

## User Review Required

> [!IMPORTANT]
> - All new helper functions are pure and stage-driven.
> - The new state fields (`wallet.blackMarketTokens: 0` and `weapon.mods: []`) are added inside memory initialization and normalized during load to ensure full backward compatibility with older save states.
> - No functional Black Market trading or modifications are implemented in this phase. The UI block inside the weapon card acts as a placeholder visual cue.

## Open Questions

None. The specifications are fully defined.

## Proposed Changes

### 1. Pure Helper Functions

#### [NEW] [index.html](file:///C:/Users/ryan/dev/money-game/index.html) (Lines ~2826)

Implement three pure stage-driven helper functions:
- `getNextReaperMilestone(stage, language)`: Returns `{ targetStage, label, isPreview }` based on a static list of stages `[150, 200, 300, 500, 1000]`.
- `getReaperRunObjective(stage, language)`: Returns a localized one-line survival copy string.
- `getReaperRewardLoopHint(stage, language)`: Returns `{ line1, line2 }` with localized reward loop guidelines.

### 2. State & Wallet Schema Expansion

#### [MODIFY] [index.html](file:///C:/Users/ryan/dev/money-game/index.html)

- **`createDefaultGameState`**: Add `blackMarketTokens: 0` under `wallet`.
- **`normalizeGameState`**: Ensure `blackMarketTokens` resolves to a finite integer defaulting to 0.
- **Weapon Blueprints in `GACHA_ITEMS`**: Add `mods: []` to each weapon item definition.
- **Factory Functions**: Add `mods: []` in `createStarterWeaponInstance` and `mods: item.type === "weapon" ? [] : undefined` in `createPulledGachaItem`.
- **`normalizeGachaItem`**: Add mapping for `mods: definition.type === "weapon" ? (Array.isArray(item?.mods) ? item.mods : []) : undefined`.
- **Global Reads**: Enforce safe fallback `item.mods ?? []` wherever weapon items are read.

### 3. Shard-to-Token Conversion Helper

#### [NEW] [index.html](file:///C:/Users/ryan/dev/money-game/index.html) (Blacksmith Handlers)

- Implement `convertShardsToTokens(amount, stateArg)` to validate shard counts (100:1 conversion rate), deduct shards, and credit `blackMarketTokens` via `updateGameState` securely. Logs console warnings on validation failures.

### 4. User Interface Elements

#### [MODIFY] [index.html](file:///C:/Users/ryan/dev/money-game/index.html)

- **Reaper Run Objective Panel**: Render inside the RPG tab conditional layout. Displays the 4 elements:
  1. Current survival objective.
  2. Next milestone target (with custom preview formatting for locked milestones).
  3. Two-line reward loop guide.
  4. Forge connection readiness signal.
- **Weapon Trait Placeholder UI**: Render inside the weapon card list mapping on the Smith & Shards tab (for active/unbroken weapons). Preserves pitch-black tactical look, remains compact and mobile-responsive.

---

## Verification Plan

### Automated / Logic Verification
- Evaluate new helpers inside the browser dev tools console:
  - Verify output of `getNextReaperMilestone(stage)` for stage inputs: `0`, `120`, `150`, `180`, `250`, `1020`.
  - Verify output of `getReaperRunObjective(stage)` and `getReaperRewardLoopHint(stage)`.
- Test `convertShardsToTokens` behavior:
  - Try calling with 50 shards: verify no state changes and console warning prints.
  - Try calling with 150 shards: verify state updates correctly (deducts 100 refined shards, adds 1 black market token).

### Manual UI Verification
- **RPG Tab**:
  - Load a pre-Dorothy save: verify Reaper Run Objective panel is NOT visible.
  - Load a post-Dorothy save at Stage 101+: verify Reaper Run Objective panel renders correctly with survival copy, milestones, reward hint, and forge connection status.
- **Smith & Shards Tab**:
  - Verify every weapon card shows the new tactical modifications slot below the action buttons.
  - Verify text and spacing fits perfectly on narrow screen viewports (360px - 430px).
