# Phase P-2B: Progression Curve Tuning & Reward Pressure Audit Implementation Plan

Tuning and auditing the game's progression curves after the weapon enhancement scaling fix, specifically aligning the weapon shatter salvage shard payout to use the structured `getSalvagePayout` formula instead of a hardcoded linear fallback.

## User Review Required

> [!IMPORTANT]
> - **Shatter Salvage Alignment**: During our audit, we identified that when a weapon shatters in the Live Forge failure path, the state updates hardcode `currentLevel * 10` shards, completely ignoring the designed `getSalvagePayout(enhanceLevel, rarity)` helper which scales shards with weapon rarity (Common to Mythic) and level.
> - **Impact**: Aligning the shatter path with `getSalvagePayout` ensures that high-prestige and high-rarity weapons yield a proportional and fair shard amount, making the shard recovery loop sustainable and stabilizing endgame progression pressure.
> - **Scope Guardrail**: No analytics SDK, telemetry backends, PWA cache changes, or broad economy overhauls will be introduced.

## Open Questions

There are no open questions. The change aligns an existing, defined helper to resolve a math discrepancy.

## Proposed Changes

### Blacksmith & Forge Calculation Alignment

#### [MODIFY] [index.html](file:///c:/Users/ryan/dev/money-game/index.html)

- **Update `enhanceWeaponItem` failure path (around line 6828)**:
  Replace the hardcoded `const salvageShards = currentLevel * 10;` with:
  ```javascript
  const salvageShards = getSalvagePayout(currentLevel, item.rarity);
  ```

---

### Project Documentation & Tasks

#### [MODIFY] [task.md](file:///c:/Users/ryan/dev/money-game/docs/task.md)
Update the active task board with the Phase P-2B milestone list.

#### [MODIFY] [TODO.md](file:///c:/Users/ryan/dev/money-game/TODO.md)
Keep the master todo listing in sync by checking off the audit items.

#### [NEW] [2026-05-22-p2b-progression-curve-tuning.md](file:///c:/Users/ryan/dev/money-game/docs/antigravity/analysis/2026-05-22-p2b-progression-curve-tuning.md)
Create the progression curve tuning and reward pressure audit analysis document.

#### [NEW] [2026-05-22-p2b-progression-curve-tuning.md](file:///c:/Users/ryan/dev/money-game/docs/antigravity/walkthroughs/2026-05-22-p2b-progression-curve-tuning.md)
Create the walkthrough / change summary document for this phase.

## Verification Plan

### Manual Verification
1. **Verification of Shatter Shard Yields**:
   - In the browser sandbox, attempt to enhance a weapon above +10.
   - Force a breakage/shatter event (e.g. by using a high-prestige weapon without stabilizer).
   - Verify that the awarded shards in the message toast and the user's total shards match `getSalvagePayout(level, rarity)` rather than `level * 10`.
   - Verify that higher rarity weapons yield larger amounts of shards upon shattering.
2. **UI & Code Integrity**:
   - Ensure the app mounts cleanly without syntax or console errors.
   - Verify that all tab transitions (Landlord, Investment, Forge, RPG) are responsive.
