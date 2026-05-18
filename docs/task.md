# Task: Gameplay UX and SEO Alignment Pass

## Status Dashboard
- [x] SEO fallback removal <!-- id: 0 -->
- [x] HTML lang dynamic setting <!-- id: 1 -->
- [x] Stage 1 Dividends reward balance (25~30 DIV) <!-- id: 2 -->
- [x] Enhancement Dividends empty hint <!-- id: 3 -->
- [x] New player onboarding hint <!-- id: 4 -->

## Progress
### Phase 1: Analysis & Planning
- [x] Review requirements <!-- id: 5 -->
- [x] Analyze `index.html` structure and logic <!-- id: 6 -->

### Phase 2: Implementation
- [x] Apply SEO and Lang fixes <!-- id: 7 -->
- [x] Apply Economy balance fixes <!-- id: 8 -->
- [x] Apply UX/Hint fixes <!-- id: 9 -->

### Phase 3: Verification
- [x] Verify diffs (SEO fix applied) <!-- id: 10 -->
- [x] Final report <!-- id: 11 -->

## Settlement Status (Audit 2026-05-14)
- **Status Category**: **A / D** (Real settlement probabilistic, Dorothy gate).
- **Code Foundation**: `settleDefenseContract` and `createDefenseContractSettlementResult` are implemented with probabilistic logic.
- **Player Access**: Unlocks when `gameState.rpg.normalEndingSeen === true` (Stage 100 / Dorothy boundary).
- **Resolution Model**: Probabilistic Hero's Fate model now live.
    - [x] Phase A: Pure success chance helper foundation <!-- id: 12 -->
    - [x] Phase B: Wire dry-run preview to probabilistic helper <!-- id: 13 -->
    - [x] Phase C: Wire real settlement to probabilistic helper <!-- id: 14 -->
    - [x] Phase D-0: Probability formula tuning (decouple base odds) <!-- id: 15 -->
    - [x] Phase D-1: Faction/Rarity design spec <!-- id: 16 -->
    - [x] Phase D-1B: Implement candidate tactical signal helper <!-- id: 17 -->
    - [x] Phase D-1C: Preview-only display of tactical signal <!-- id: 18 -->
    - [x] Phase D-1D: Wire tactical signal into real settlement odds <!-- id: 19 -->
- **Phase E: Balance & Polish**
    - [x] Phase E-1: Probability formula audit and PEN signal fix <!-- id: 20 -->
    - [x] Phase E-2: Payout vs. Risk audit and multiplier tuning <!-- id: 21 -->
    - [x] Phase E-3: Hero's Fate Game Over / Restart Foundation <!-- id: 22 -->
    - [x] Phase E-4: Hero's Fate Final Settlement Confirmation UX <!-- id: 23 -->
- **Phase F: Infinite Mode Scaling**
    - [x] Phase F-1: Infinite Mode Scaling Foundation <!-- id: 24 -->
- **Phase G: External Capital Leverage**
    - [x] Phase G-1: External Capital Leverage Foundation <!-- id: 25 -->
    - [x] Phase G-1A: Source Alignment QA (Diamonds removed, Investment/Rebirth alignment verified) <!-- id: 26 -->
    - [x] Phase G-2: Leverage Balance QA (Tactical trade-offs confirmed) <!-- id: 27 -->
    - [x] Phase G-3A: Specialization Design Spec (RE/Stock mapping defined) <!-- id: 28 -->
    - [x] Phase G-3A-1: Spec Guardrail Patch (Schema & HP formula protection) <!-- id: 29 -->
    - [x] Phase G-3B: Specialization Foundation Implementation (RE/Inv/Faction multipliers active) <!-- id: 30 -->
    - [x] Phase G-3C: Specialization Integration QA (Safe, bounded, no double-counting) <!-- id: 31 -->
- **Phase G-4: Tactical Signal Synchronization**
    - [x] Phase G-4A: Tactical Signal Synchronization Design Spec (Alignment Signal defined) <!-- id: 32 -->
    - [x] Phase G-4A-1: Tactical Signal Synchronization Cap Guardrail Patch (Capped at +12%) <!-- id: 33 -->
    - [x] Phase G-4B: Tactical Signal Build Alignment Implementation (Specialization → faction alignment signal, capped within +12%) <!-- id: 34 -->
    - [x] Phase G-4C: Tactical Signal Build Alignment Balance QA (Cap verified, high-risk contracts remain risky, no double-counting) <!-- id: 35 -->
    - [x] Phase G-4D: Defense Contract Base Odds Tier Calibration (vol^0.6 power curve, tiers now Stable 79% / Volatile 62% / High Risk 32%) <!-- id: 36 -->
    - [x] Phase G-4E: Hero's Fate End-to-End Regression QA (Confirmation modal missing properties fixed, all flows verified) <!-- id: 37 -->
- **Design Alignment**: 
    - Real settlement is locked during the "Sponsor" phase and becomes active in the "God" phase. 
    - Tactical Edge is now active in real settlement odds. 
    - PEN signal and preview history payout bugs fixed. 
    - Payout multipliers scaled for better risk reward.
    - **FAILURE CONSEQUENCE REVISION**: Defense Contract failure now triggers **Game Over / Restart from beginning**, replacing the rejected "Capital Freeze" concept.
- **Detailed Spec**: See [HEROS_FATE_BETTING_SPEC.md](HEROS_FATE_BETTING_SPEC.md) for the probabilistic model details.

## Phase I: Infinite Mode Depth
- **Phase I-1: Boss & Monster Pattern Design**
    - [x] Phase I-1A: Design Spec (Archetypes, boss milestones, stat counter mapping, economic integration) <!-- id: 38 -->
    - [x] Phase I-2A: Monster Archetype Foundation (deterministic Stage 101+ archetype labels, UI panel, no combat modifiers) <!-- id: 39 -->
    - [x] Phase I-2B: Monster Archetype Combat Modifier Foundation (Armor Wall PEN scaling, Regenerator bounded healing) <!-- id: 42 -->
    - [x] Phase I-2C: Armor Wall / Regenerator Modifier Balance QA (bounds verified, Stage 1-100 neutral, no schema changes) <!-- id: 43 -->
    - [x] Phase I-2D: Remaining Archetype Combat Modifiers (Phantom ACC, Berserker SPD, Shadow Wraith CRT pressure) <!-- id: 44 -->
    - [x] Phase I-2E: Remaining Archetype Modifier Balance QA (Phantom/Berserker/Shadow bounds verified, Authority Gate neutral) <!-- id: 45 -->
    - [x] Phase I-3A: Boss Milestone Placeholder Foundation (static metadata + Stage 150/200/300/500/1000 UI panel, no combat mechanics) <!-- id: 40 -->
    - [x] Phase I-3B: Boss Milestone Foundation QA (metadata/helper/UI verified, Authority Gate neutral) <!-- id: 46 -->
    - [x] Phase I-3C: Stage 150 Iron Sentinel Boss Mechanic Foundation (PEN-based bounded damage check) <!-- id: 47 -->
    - [x] Phase I-3D: Iron Sentinel Boss Mechanic QA (Stage 150-only, bounded, no later boss mechanics) <!-- id: 48 -->
    - [x] Phase I-4A: Reaper Direction Alignment (unified recurring Reaper model; Stage 200/300/500/1000 mechanics deferred) <!-- id: 49 -->
    - [x] Phase I-4B: Reaper Infinite Mode Model Design Spec (fantasy, naming, masks, scaling, UI, integration plan) <!-- id: 50 -->
    - [x] Phase I-4C: Reaper Model Data Foundation (static forms + pure profile helper, no combat changes) <!-- id: 51 -->
    - [x] Phase I-4D: Reaper UI Integration (Stage 101+ identity/threat/form/counter panel, display-only) <!-- id: 52 -->
    - [x] Phase I-4D-1: Reaper UI Smoke QA (Stage gating, translations, existing panels, no combat changes verified) <!-- id: 53 -->
    - [x] Phase I-4E: Reaper Form Modifier Integration (bounded Stage 101+ pressure, final multiplier floor) <!-- id: 54 -->
    - [x] Phase I-4F: Reaper Balance QA (pressure bounds, Stage 150 stacking, deferred milestones verified) <!-- id: 55 -->
    - [ ] Phase I-5: Infinite Mode Reaper Iteration <!-- id: 56 -->
    - [x] Phase I-5A: Infinite Mode Playability Snapshot / Manual QA Plan (checklist & test ranges defined) <!-- id: 57 -->
- **Phase J: Product UX Reframe**
    - [x] Phase J-0: Product UX Reframe Spec (PRODUCT_UX_REFRAME_PLAN.md created) <!-- id: 58 -->
    - [x] Phase J-1: Korean Naming & Navigation Cleanup (Korean UI translations updated) <!-- id: 59 -->
    - [ ] Phase J-2: Investment Tab UX Simplification (Dry contracts turned to Prediction Cards) <!-- id: 60 -->
    - [ ] Phase J-3: Weapon Enhancement Redesign Spec (1~30 ladder & breakage spec drafted) <!-- id: 61 -->
    - [ ] Phase J-4: Defense Tab UX Redesign Spec (RPG tab TD-style reframe spec drafted) <!-- id: 62 -->
    - [ ] Phase J-5: Incremental Implementation Pass (Incremental spec implementations complete) <!-- id: 63 -->
- **Detailed Spec**: See [INFINITE_MODE_DEPTH_SPEC.md](INFINITE_MODE_DEPTH_SPEC.md) for the design details.
