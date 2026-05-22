# Phase P-2A: Progression Balance Baseline Audit Implementation Plan

Establish a baseline progression balance audit to identify early-game, mid-game, and late-game progression scaling risks, and fix a critical discrepancy in weapon enhancement calculations where enhanced weapon power is ignored in live combat.

## User Review Required

> [!IMPORTANT]
> - **Economy Fix**: During our baseline audit, we identified a critical bug: weapon enhancement level scaling (+5% DPS per enhancement level) is displayed in the UI but ignored in both the live combat engine (`getTeamBaseAtk`) and the squad detail preview (`activeRunCharacterDetails`). As a result, enhanced weapons behave as +0 in combat, severely capping player progression and violating expectations.
> - **Documentation Deliverables**: We will deliver the baseline progression balance audit report and the walkthrough summary.
> - **Scope Preservation**: We will strictly avoid introducing telemetry backend, new gameplay systems, or save state schema changes.

## Proposed Changes

### Core UI & Combat Calculations

#### [MODIFY] [index.html](file:///c:/Users/ryan/dev/money-game/index.html)

- **Modify `getTeamBaseAtk` (around line 3130)**:
  Update weapon DPS calculation to account for the enhancement level:
  ```javascript
  const weaponDps = char.equippedWeapon
    ? Math.round(toFiniteNumber(char.equippedWeapon.power, 0) * (1 + toFiniteNumber(char.equippedWeapon.enhanceLevel, 0) * 0.05))
    : 0;
  ```

- **Modify `activeRunCharacterDetails` (around line 5363)**:
  Update weapon DPS calculation in the squad detail preview map to match:
  ```javascript
  const weaponDps = equippedWeapon
    ? Math.round(toFiniteNumber(equippedWeapon.power, 0) * (1 + toFiniteNumber(equippedWeapon.enhanceLevel, 0) * 0.05))
    : 0;
  ```

### Documentation & Progression Audits

#### [NEW] [2026-05-22-p2a-progression-balance-baseline-audit.md](file:///c:/Users/ryan/dev/money-game/docs/antigravity/analysis/2026-05-22-p2a-progression-balance-baseline-audit.md)
Create a comprehensive progression balance audit report covering:
1. Current branch
2. Files changed
3. Early-game audit (5 min, cash speed, property upgrade, first Forge, first Defense run)
4. Forge audit (starter weapon, enhancement cost, breakage risk, refined shard clarity)
5. Defense/RPG audit (free start behavior, ticket pacing, first run reward, stage 1–10 difficulty)
6. Black Market audit (token path, shard-to-token clarity, roll pressure)
7. Reaper/late-game audit (Stage 101+ readiness, +30 forge pressure, offline reward influence)
8. UI/formatting audit (compact number readability, overflow, mobile)
9. Balance risks found
10. Recommended next phase

#### [NEW] [2026-05-22-p2a-progression-balance-baseline-audit.md](file:///c:/Users/ryan/dev/money-game/docs/antigravity/walkthroughs/2026-05-22-p2a-progression-balance-baseline-audit.md)
Create a walkthrough summary of the changes and audit outcomes.

#### [MODIFY] [task.md](file:///c:/Users/ryan/dev/money-game/docs/task.md)
Update the active task board with the Phase P-2A checklist and mark it complete.

#### [MODIFY] [TODO.md](file:///c:/Users/ryan/dev/money-game/TODO.md)
Check off or update relevant gameplay audit items.

## Verification Plan

### Manual Verification
1. **Enhancement Math Verification**:
   - Equipping an enhanced weapon (e.g. +1 iron-dagger) should increase the team's Total DPS in both the Battle Preview UI and the live combat calculations by the correct (+5% * level) amount.
   - Verify that the squad preview DPS and actual combat ticks align perfectly.
2. **UI & Code Sandbox Verification**:
   - Load the workspace in the browser/sandbox.
   - Verify that no console errors occur on boot.
   - Verify that UI panel scaling handles large numbers nicely.
