# Walkthrough: Reaper Run Objective & Black Market Economy Scaffolding (Phase K-3 & L-1)

All deliverables under Phase K-3 and Phase L-1 are fully implemented and verified. The RPG Infinite Mode progression is clear, and the Black Market scaffolding is safely integrated without save state version updates or legacy file incompatibility.

## Changes Made

### 1. Pure Stage-Driven Helper Functions
Implemented and exposed to `window`:
- `getNextReaperMilestone(stage, language)`: Returns the next target milestone (Stage 150, 200, 300, 500, 1000) with a locked/preview boolean indicator.
- `getReaperRunObjective(stage, language)`: Returns localized one-line current wave survival objectives.
- `getReaperRewardLoopHint(stage, language)`: Returns localized advice regarding shards and stabilizers.

### 2. Reaper Run Objective Panel (RPG Tab)
- Added the objective panel block directly below the Infinite Reaper entry controls.
- Displayed:
  - Localized current wave survival objective.
  - Next milestone stage target with locked/preview styling if `isPreview`.
  - Localized 2-line explanation of the Refined Shard/Stabilizer loop.
  - Tactical Forge Connection Signal reflecting current blacksmith weapon level readiness.

### 3. State Schema & Blueprint Expansion
- **Default Game State**: Added `wallet.blackMarketTokens: 0` under `wallet`.
- **Normalization**: Added safe loading parsing of `blackMarketTokens` inside `normalizeGameState`.
- **GACHA_ITEMS static registry**: Added `mods: []` to all 5 weapon configurations.
- **Factory Functions**: Appended `mods: []` inside `createStarterWeaponInstance` and `createPulledGachaItem`.
- **Item Normalization**: Extended `normalizeGachaItem` to resolve `mods` to a clean array on weapons.
- **Read Safe Guarding**: Verified legacy code references are protected via default fallback `item.mods ?? []`.

### 4. Shard-to-Token Conversion Helper
- Implemented `convertShardsToTokens(amount, stateArg)` to deduct Refined Shards (100:1 rate) and credit Black Market Tokens.
- Embedded validation rules (non-negative, integer counts, sufficient shards). Exposes warning signals to developer console on validation failure. Exposes function on `window` for test integration.

### 5. Weapon Trait Placeholder UI (Smith & Shards Tab)
- Injected a dark tactical container under active weapon cards.
- Label: `⚙️ 특수 전술 개조 (Tactical Modifications Preset)`.
- Content: displays locked state prompt if `item.mods.length === 0`. Fits beautifully within mobile screens without overflow issues.

---

## Verification & Test Results

### Automated Sandbox Tests
Run via Node.js script:
`node C:\Users\ryan\.gemini\antigravity\brain\8f72c005-caec-4701-8b99-563ec565a336\scratch\run_logic_tests.js`

All tests PASSED:
```
Evaluating getNextReaperMilestone...
Input: 0,en -> Result: { targetStage: 150, label: 'Iron Sentinel Gate', isPreview: false }
Input: 120,ko -> Result: { targetStage: 150, label: '철벽 감시자의 관문', isPreview: false }
Input: 150,en -> Result: { targetStage: 200, label: 'Locked Threshold', isPreview: true }
getNextReaperMilestone: PASS

Evaluating getReaperRunObjective...
Input: 50,en -> Result: "Enter Infinite Reaper Mode and survive."
Input: 120,ko -> Result: "Stage 150 Iron Sentinel까지 생존을 유지하십시오."
getReaperRunObjective: PASS

Evaluating getReaperRewardLoopHint...
Input: 120,en -> Result: { line1: 'Survival accumulates Refined Shards.', line2: 'Enhance weapons with shards to venture deeper.' }
getReaperRewardLoopHint: PASS

Evaluating convertShardsToTokens...
Test 1 (Success 1 token): PASS
Test 2 (Insufficient shards): PASS
Test 3 (Negative amount): PASS
convertShardsToTokens: PASS

ALL LOGIC TESTS PASSED SUCCESSFULLY!
```

### Manual Verification
- Checked that loading legacy save files succeeds without state errors.
- Verified RPG tab panel visibility gates correctly at stage >= 101.
- Verified Smith & Shards card contains the new preset container.
