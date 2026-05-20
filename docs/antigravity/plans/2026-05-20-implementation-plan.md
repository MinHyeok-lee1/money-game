# Implementation Plan: Reaper Infinite Mode (Phase K-1 + I-5)

This plan implements the entry UX gate (Part 1, K-1) and the live combat engine/scaling logic (Part 2, I-5) for Stage 101+ Reaper Infinite Mode, ensuring zero regressions on the Stage 1–100 progression.

## User Review Required

> [!IMPORTANT]
> - All new scaling, damage compression, and monster archetypes activate strictly at Stage 101+. Stages 1–100 remain completely unaffected.
> - A new Infinite Reaper Entry Panel will be rendered in the RPG sidebar/tab when the Dorothy proposal has been acknowledged.
> - We introduce three pure, non-persistent helper functions for entry requirements and recommendations.
> - An active squad check and ticket requirement are enforced when launching the Stage 101+ run.

## Open Questions

None at this stage. The execution requirements are clear and bounded.

## Proposed Changes

### RPG Module & Combat Engine

#### [MODIFY] [index.html](file:///C:/Users/ryan/dev/money-game/index.html)

##### PART 1: Entry UX & Requirement Gate (K-1)
1. **Helper Functions**:
   Add the following pure, side-effect-free helpers in the global utility section of the script block:
   - `getBestWeaponEnhanceLevel(inventory)`: Scans non-broken weapons and returns the highest enhancement level (or 0 if empty).
   - `getReaperReadinessStatus(gameState)`: Evaluates whether the player is `PREVIEW_ONLY` (Dorothy not acknowledged), `UNDERPREPARED` (no squad, no +10 weapon, or DPS < 10M), `EXTREME_RISK` (weapon < +20, no stabilizers/shards ready, or DPS < 100M), or `READY`.
   - `getReaperEntryRecommendation(gameState)`: Returns localized advice strings for each state.

2. **Reaper Entry Panel**:
   Replace the simple Dorothy Acknowledged banner inside the RPG sidebar rendering area with the **Infinite Reaper Entry Panel**:
   - Displays a compact threat explanation.
   - Renders live-computed readiness signals: Best Weapon enhancement level, Total Team DPS (via `getTotalTeamDps`), Refined Shards & Stabilizers count, and Highest Stage.
   - Displays a color-coded status badge matching the readiness state.
   - Provides an Entry CTA:
     - Active if `READY` or `EXTREME_RISK` (triggers ticket check and enters Stage 101+).
     - Disabled if `UNDERPREPARED` or `PREVIEW_ONLY`, with clear helper tooltips explaining the missing prerequisites.
   - Handles empty weapon inventory, empty squads, and pre-Dorothy states safely without crashing.

3. **Entry Action Hook**:
   Define `enterReaperStage()` to allow players to launch a defense run starting at `Math.max(101, highestStage)` using 1 ticket and active squad characters, mirroring the existing `startDefenseRun` logic.

##### PART 2: Live Combat Engine & Scaling (I-5)
1. **Derived Infinite Mode State**:
   - In `getRpgCombatStats` and `applyCombatTick`, derive `isInfiniteMode = currentStage >= 101` locally without mutating the saved schema.

2. **Stage Indicator UI Transformation**:
   - When `currentStage >= 101`, style the stage text with a deep crimson color (`text-rose-500`) and a dark red background overlay. Display the Reaper Form name and Active Intensity Tier.

3. **Intensity Tier & Damage Compression**:
   - Compute `IntensityTier = Math.floor((stage - 100) / 10) + 1`.
   - Compute `DamageModifier = Math.max(0.45, 1 - IntensityTier * 0.025)`.
   - Apply `DamageModifier` to total squad damage output in `applyCombatTick` when `stage >= 101`.

4. **Monster Archetype Rotation**:
   - Rotate specialized enemy archetypes every 5 stages within Infinite Mode:
     - Stage 101–105: ARMOR WALL (Flat defense boost, counter: high PEN)
     - Stage 106–110: REGENERATOR (HP regen ticks, counter: extreme burst DPS)
     - Stage 111–115: PHANTOM (Soft evasion miss chance, counter: ACC)
     - Stage 116–120: BERSERKER (Enemy speed increments over time)
     - Stage 121–125: SHADOW WRAITH (Crit volatility on enemy damage)
   - Render tactical display cues/badges on the enemy card for the active archetype.
   - Ensure modifiers reset cleanly on stage changes and are never saved to local state.

5. **Stage 150 Boss: Iron Sentinel**:
   - When `stage === 150`, spawn the unique milestone boss Iron Sentinel.
   - Apply Layer 1 mitigation (Tier 5 Reaper modifier = 0.875) and Layer 2 boss mitigation (BossDR = 0.50), yielding a final output multiplier of `0.4375` for player DPS.
   - Display a crimson boss card with "EXTREME TACTICAL THREAT" branding and visible indicators for both mitigation layers.

---

## Verification Plan

### Automated / Logic Verification
- Validate pure helper functions through manual tests or console triggers:
  - Verify `getBestWeaponEnhanceLevel(inventory)` returns correct values for empty/filled inventories.
  - Verify `getReaperReadinessStatus` transition between states.
- Run the web application locally to test the combat simulator at Stage 100, Stage 101, and Stage 150.

### Manual Verification
- **Part 1 Gate Verification**:
  - Load a clean save: verify Reaper panel is locked/preview-only.
  - Advance to Stage 100 and accept Dorothy proposal: verify the full Reaper panel appears.
  - Test with empty weapon inventory and empty squad: verify no crashes and status is `UNDERPREPARED`.
  - Equip a +20 weapon and 5 characters: verify status changes to `READY` or `EXTREME_RISK`.
- **Part 2 Scaling Verification**:
  - Fight through Stage 101+: check crimson stage UI indicators.
  - Verify enemy archetype badges render.
  - Verify Iron Sentinel spawns at Stage 150 with both mitigation badges visible.
