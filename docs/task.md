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
    - [x] Phase K-1 & I-5: Reaper Infinite Mode <!-- id: 56 -->
        - [x] PART 1 — Entry UX & Requirement Gate (K-1) <!-- id: 99 -->
            - [x] Pure helper functions: `getBestWeaponEnhanceLevel`, `getReaperReadinessStatus`, `getReaperEntryRecommendation` <!-- id: 100 -->
            - [x] Infinite Reaper Entry Panel in Dorothy acknowledged area <!-- id: 101 -->
            - [x] Entry CTA button (Stage 101+ Entry with ticket check) <!-- id: 102 -->
            - [x] Gate every new code path behind stage >= 101 or normalEndingSeen check <!-- id: 103 -->
        - [x] PART 2 — Live Combat Engine & Scaling (I-5) <!-- id: 104 -->
            - [x] Math scaling logic & DamageModifier dynamic calculation <!-- id: 105 -->
            - [x] Monster Archetype Rotations and tactical badges <!-- id: 106 -->
            - [x] Stage 150 Boss: Iron Sentinel dual-mitigation layer <!-- id: 107 -->
            - [x] Crimson stage UI indicator transformation <!-- id: 108 -->
    - [x] Phase I-5A: Infinite Mode Playability Snapshot / Manual QA Plan (checklist & test ranges defined) <!-- id: 57 -->
    - [x] Phase K-2: Reaper Infinite Mode Regression QA & Stabilization <!-- id: 109 -->
        - [x] Target 1: Infinite Mode Entry Gate Security audited <!-- id: 110 -->
        - [x] Target 2: Stage 1–100 Neutrality & Progression Safety verified <!-- id: 111 -->
        - [x] Target 3: Stage 101+ Combat Math Safety wrapped with toFiniteNumber and capped <!-- id: 112 -->
        - [x] Target 4: Crimson UI Performance & Responsive Checks audited <!-- id: 113 -->
        - [x] Target 5: Deep Save-State Resilience (Legacy Compatibility) implemented via optional chaining <!-- id: 114 -->
        - [x] Target 6: Cross-Module State Sync Verification confirmed <!-- id: 115 -->
        - [x] Target 7: Cross-Module Regression Isolation completed <!-- id: 116 -->
- **Phase J: Product UX Reframe**
    - [x] Phase J-0: Product UX Reframe Spec (PRODUCT_UX_REFRAME_PLAN.md created) <!-- id: 58 -->
    - [x] Phase J-1: Korean Naming & Navigation Cleanup (Korean UI translations updated) <!-- id: 59 -->
    - [ ] Phase J-2: Hero's Fate UX Simplification <!-- id: 60 -->
        - [x] Phase J-2A: Hero's Fate UX Simplification Design Spec (HEROS_FATE_UX_REDESIGN_SPEC.md created) <!-- id: 64 -->
        - [x] Phase J-2B: Hero's Fate label/copy cleanup (UI_TEXT.ko copy-only cleanup applied) <!-- id: 65 -->
        - [x] Phase J-2C: Survival Prediction Card layout <!-- id: 66 -->
        - [x] Phase J-2D: Bet Slip simplification <!-- id: 67 -->
        - [x] Phase J-2E: Fate Log / result history polish <!-- id: 68 -->
        - [x] Phase J-2F: Future 1:1 Duel data model proposal (docs/HEROS_FATE_DUEL_MODEL_PROPOSAL.md created) <!-- id: 69 -->
    - [ ] Phase J-3: Weapon Enhancement Redesign
        - [x] Phase J-3A: Smith & Shards Weapon Enhancement Redesign Spec (docs/SMITH_AND_SHARDS_REDESIGN_SPEC.md drafted) <!-- id: 61 -->
        - [x] Phase J-3A-1: Redesign Spec Guardrail QA passed <!-- id: 70 -->
        - [x] Phase J-3A-2: Status Wording Sanity Check passed <!-- id: 71 -->
        - [x] Phase J-3B: Current Smith & Shards Audit (docs/SMITH_AND_SHARDS_CODE_AUDIT.md complete) <!-- id: 72 -->
        - [x] Phase J-3B-1: Code Audit Accuracy and Guardrail QA passed <!-- id: 78 -->
        - [x] Phase J-3C: Smith & Shards Copy Cleanup (localize naming safely) <!-- id: 73 -->
        - [x] Phase J-3C-1: Smith & Shards False Feature and UX Consistency QA passed <!-- id: 79 -->
        - [x] Phase J-3C-2: Smith & Shards Weapon Fantasy and Dopamine Loop Audit (docs/SMITH_AND_SHARDS_DOPAMINE_LOOP_SPEC.md complete) <!-- id: 80 -->
        - [x] Phase J-3C-3: Smith & Shards Weapon Progression Tempo and Prestige Curve Audit (docs/SMITH_AND_SHARDS_PRESTIGE_CURVE_SPEC.md complete) <!-- id: 81 -->
        - [x] Phase J-3D: Weapon Ladder Design Data Spec (docs/SMITH_AND_SHARDS_ECONOMY_MATRIX_SPEC.md complete) <!-- id: 74 -->
        - [x] Phase J-3E-0: Weapon Identity & Historical Artifact Specification (docs/WEAPON_IDENTITY_AND_ARTIFACT_SYSTEM_SPEC.md complete) <!-- id: 82 -->
        - [x] Phase J-3E: Inventory UI Reframe (docs/SMITH_AND_SHARDS_INVENTORY_UX_SPEC.md complete) <!-- id: 75 -->
        - [x] Phase J-3E-1: Playable Weapon Loop Validation (docs/SMITH_AND_SHARDS_PLAYABLE_FLOW_VALIDATION.md complete) <!-- id: 83 -->
        - [x] Phase J-3E-2: Interactive Weapon Screen Mockup (implemented in index.html sandbox) <!-- id: 84 -->
        - [x] Phase J-3F: Breakage/Shards Schema Proposal (database migrations spec) <!-- id: 76 -->
        - [x] Phase J-3G: Breakage/Shards Prototype (anvil failures and shards recovery) <!-- id: 77 -->
        - [x] Phase J-3H: Prestige & Recovery UX Pass (tier visuals, epithets, recovery encouragement, danger zone readability) <!-- id: 92 -->
        - [x] Phase J-3I: Lock Confirmation & Bulk Salvage Safety Pass (locked weapon hard-block, danger-zone confirmation modal, bulk broken weapon cleanup) <!-- id: 93 -->
    - [ ] Phase J-4: Defense Tab UX Redesign Spec (RPG tab TD-style reframe spec drafted) <!-- id: 62 -->
        - [x] Phase J-4A: Dark Frontier Unified UX Pass (docs/DARK_FRONTIER_UNIFIED_UX_AUDIT.md complete) <!-- id: 85 -->
        - [x] Phase J-4B: First-Time Player UX Rework (docs/FIRST_TIME_PLAYER_UX_REWORK.md complete) <!-- id: 86 -->
        - [x] Phase J-4C: First-Click CTA Patch (first-click guidance injected to all four tabs) <!-- id: 87 -->
        - [x] Phase J-4D: Immediate Dopamine Feedback Pass (high-fidelity visual triggers and indicators live on all four modules) <!-- id: 88 -->
        - [x] Phase J-4E: Cross-System War Cohesion Pass (Global War status strip telemetry HUD + dynamic cohesion log transmitters) <!-- id: 89 -->
        - [x] Phase J-4E-1: Cross-System War Cohesion Runtime QA (Telemetry localization and runtime verification completed) <!-- id: 90 -->
        - [x] Phase J-4F: Product UX Stabilization Smoke Test (all tabs, formulas, timers, persistence verified PASS) <!-- id: 91 -->
        - [x] Phase J-4G: First-Time Forge Onboarding / Empty-State Pass (Smith & Shards guide, currency clarity, and sandbox boundary copy) <!-- id: 94 -->
    - [x] Phase J-5: Incremental Implementation Pass (Incremental spec implementations complete) <!-- id: 63 -->
        - [x] Phase J-5A: Prestige Announcement Toast (+6/+8/+10 forge milestone banner, no schema change) <!-- id: 95 -->
        - [x] Phase J-5B: Forge Result Recap Polish (high-contrast tactical recap metrics grid, dynamic advice cue, live-linked fields) <!-- id: 96 -->
        - [x] Phase J-5C: Smith & Shards — Regression QA, Mobile Readability Pass & Live Breakage Backend Engine (Completed) <!-- id: 97 -->
        - [x] Phase J-5D: Live Forge Risk Ladder Balance QA & Prepare Infinite Reaper Shift (Completed) <!-- id: 98 -->
- **Detailed Spec**: See [INFINITE_MODE_DEPTH_SPEC.md](INFINITE_MODE_DEPTH_SPEC.md) for the design details.

## Phase K-3: Reaper Run Objective & Reward Loop UX
- [x] Phase K-3A: Research & Design Specification <!-- id: 117 -->
- [x] Phase K-3B: Implement getNextReaperMilestone, getReaperRunObjective, getReaperRewardLoopHint <!-- id: 118 -->
- [x] Phase K-3C: Implement Reaper Run Objective Panel in RPG tab <!-- id: 119 -->
- [x] Phase K-3D: Integration & UI Verification <!-- id: 120 -->

## Phase L-1: Black Market Economy Scaffolding
- [x] Phase L-1A: Research & Design Specification <!-- id: 121 -->
- [x] Phase L-1B: Expand save state schema & GACHA_ITEMS weapon blueprints <!-- id: 122 -->
- [x] Phase L-1C: Implement convertShardsToTokens conversion helper <!-- id: 123 -->
- [x] Phase L-1D: Implement Weapon Trait Placeholder UI inside Smith & Shards card <!-- id: 124 -->
- [x] Phase L-1E: End-to-End Regression & Compatibility QA <!-- id: 125 -->

## Phase L-2: Black Market & Weapon Modification
- [x] Phase L-2A: Part 1 - Scaffolding Regression & Economy Safety QA <!-- id: 126 -->
- [x] Phase L-2B: Part 2 - Define WEAPON_MOD_POOL static constant <!-- id: 127 -->
- [x] Phase L-2C: Part 2 - Implement getWeaponModBonus pure helper <!-- id: 128 -->
- [x] Phase L-2D: Part 2 - Integrate mods into RPG combat stats additively <!-- id: 129 -->
- [x] Phase L-2E: Part 2 - Convert workstation UI slot (minimal active terminal) <!-- id: 130 -->
- [x] Phase L-2F: Part 2 - Logic Tests & E2E Validation <!-- id: 131 -->

## Phase L-3: Weapon Mod Rolling Foundation
- [x] Phase L-3A: rollWeaponModification handler (5 gates, immutable map, result object) <!-- id: 132 -->
- [x] Phase L-3B: lastRollResult useState for recap feedback <!-- id: 133 -->
- [x] Phase L-3C: Workstation UI — 6-state active terminal, all [PROTOTYPE] removed <!-- id: 134 -->
- [x] Phase L-3D: Economy & eligibility safety verification (11/11 logic tests) <!-- id: 135 -->
- [x] Phase L-3E: Docs, task.md, TODO.md updated <!-- id: 136 -->

## Phase L-4: Weapon Mod Persistence & Display Polish
- [x] Phase L-4A: WEAPON_MOD_POOL expanded to 5 entries (mod_acc_boost, mod_heavy_caliber) <!-- id: 137 -->
- [x] Phase L-4B: getRpgCombatStats extended — atk/acc mod aggregation + mod atk multiplier bonus <!-- id: 138 -->
- [x] Phase L-4C: GNB header token widget (grid-cols-5, amber glow, ?? 0 fallback) <!-- id: 139 -->
- [x] Phase L-4D: Smith & Shards weapon card inline mod badge (amber, compact, broken-safe) <!-- id: 140 -->
- [x] Phase L-4E: RPG squad panel mod badge next to equipped weapon line <!-- id: 141 -->
- [x] Phase L-4F: RPG stat preview mod bonus line (isFinite-guarded, zero-state hidden) <!-- id: 142 -->
- [x] Phase L-4G: All L-4 logic tests pass (pool, coverage, display safety) <!-- id: 143 -->

## Phase L-5A: Tactical Mod Identity & Readability Pass
- [x] Phase L-5A-1: role/roleColor/roleGlyph/flavor added to all 5 WEAPON_MOD_POOL entries <!-- id: 144 -->
- [x] Phase L-5A-2: getModPoolEntry() lookup helper — display-only, not persisted <!-- id: 145 -->
- [x] Phase L-5A-3: Smith & Shards weapon card badge updated (role tag + name + stat) <!-- id: 146 -->
- [x] Phase L-5A-4: Workstation active mod readout updated (role tag + name + stat + flavor) <!-- id: 147 -->
- [x] Phase L-5A-5: RPG squad card badge updated (role tag + name + stat) <!-- id: 148 -->
- [x] Phase L-5A-6: previousMod captured as local var in rollWeaponModification before overwrite <!-- id: 149 -->
- [x] Phase L-5A-7: Roll recap — first-roll vs reroll tactical narrative copy <!-- id: 150 -->

## Phase L-5B: Bulk Shard Conversion & Reaper Scaling
- [x] Phase L-5B-1: convertAllShardsToTokens handler (4-gate validation, Math.floor, no mutation on fail) <!-- id: 151 -->
- [x] Phase L-5B-2: Dual-action workbench conversion UI (single + bulk buttons, preview line, flex layout) <!-- id: 152 -->
- [x] Phase L-5B-3: Infinite Mode shard payout scaling in applyCombatTick (stage >= 101, IntensityTier formula, all guards) <!-- id: 153 -->

## Phase L-5C: Black Market Economy Pressure & Inflation QA
- [x] Phase L-5C-1: Shard pacing documented per stage bracket (101–109, 120, 150, 200, 300+) <!-- id: 154 -->
- [x] Phase L-5C-2: Token generation math verified — single and bulk paths, all floors ≥ 0 <!-- id: 155 -->
- [x] Phase L-5C-3: Reroll spam test — functional update composition safe, no double-deduction <!-- id: 156 -->
- [x] Phase L-5C-4: Inflation risk assessed — LOW (101–200) / MEDIUM (300+), acceptable <!-- id: 157 -->
- [x] Phase L-5C-5: Token stockpile advisory added (bmt > 20, display-only) <!-- id: 158 -->
- [x] Phase L-5C-6: Cross-module regression confirmed — all systems untouched <!-- id: 159 -->

## Phase L-6: Targeted Role Mod & Black Market Codex Panel
- [x] Phase L-6-1: VALID_TARGET_ROLES + TARGETED_ROLL_COST constants (component-scope) <!-- id: 160 -->
- [x] Phase L-6-2: rollTargetedWeaponModification handler (6 gates, 3-token deduction, role filter, inventory.map) <!-- id: 161 -->
- [x] Phase L-6-3: showCodexForWeapon + targetRoleSelection local useState added (not persisted) <!-- id: 162 -->
- [x] Phase L-6-4: Targeted Role Override UI — role pills, 3-token CTA, 4 disabled states, cost comparison note <!-- id: 163 -->
- [x] Phase L-6-5: Black Market Tactical Codex — toggle, 5-entry list, stats + flavor, collapsed by default <!-- id: 164 -->
- [x] Phase L-6-6: Roll recap extended — isTargeted header variant + flavor sub-line <!-- id: 165 -->

## Phase L-6A: Targeted Roll & Codex Regression QA
- [x] Target 1: Gate Failure Paths (exactly 0 tokens deducted on failures) <!-- id: 166 -->
- [x] Target 2: Token Deduction & Math (exactly 3 tokens, safe balance check, integer math) <!-- id: 167 -->
- [x] Target 3: Roll Isolation & Codex (no state leaks, collapsibility, correct stats) <!-- id: 168 -->
- [x] Target 4: Roll Recap Display (fixed reroll recap bug showing previous/current mod names) <!-- id: 169 -->
- [x] Target 5: UI Layout Constraints (compact, mobile-resilient, localized, no misleading language) <!-- id: 170 -->

## Phase L-7: Mod Milestone Persistence & Rewards
- [x] Phase L-7A: modMilestoneClaimed schema expansion (createDefaultGameState & normalizeGameState fallback) <!-- id: 171 -->
- [x] Phase L-7B: checkModMilestoneReward handler (idempotent reward logic, Stage 150+ gate, modded weapon gate, 10 tokens payout, toast) <!-- id: 172 -->
- [x] Phase L-7C: Automatic milestone check trigger (combat loop integration / stage change useEffect hook) <!-- id: 173 -->
- [x] Phase L-7D: Achievement Badge UI (pitch-black tactical theme, '🎖️ 심연의 집행자' badge, active click feedback, compact) <!-- id: 174 -->

## Phase L-7A: Mod Milestone Hardening & Regression QA
- [x] Target 1: Enforce weapon equipment verification on characters/activeUnits <!-- id: 175 -->
- [x] Target 2: Double-barrier idempotency guard inside setGameState <!-- id: 176 -->
- [x] Target 3: Token math safety verification with isFinite & floor bounds <!-- id: 177 -->

## Phase M-1: End-Game UX & Offline Progress Rebalance
- [x] Target 1: Integrate offline progression calculation on loadGameState <!-- id: 178 -->
- [x] Target 2: Immutably add passive cash and Refined Shards for Stage 101+ using IntensityTier formula <!-- id: 179 -->
- [x] Target 3: Render High-Fidelity glassmorphic Offline progress recap modal on mount <!-- id: 180 -->
- [x] Target 4: Optimize mobile CSS pulse performance via compositing layers <!-- id: 181 -->

## Phase M-1A: Offline Exploit & Inflation QA
- [x] Target 1: Validate timestamp safety (missing, invalid, future, huge elapsed times) <!-- id: 182 -->
- [x] Target 2: Verify duplicate reward safety (rapid reopening, refresh test) <!-- id: 183 -->
- [x] Target 3: Inflation pressure assessment (shard rates, token conversion pressure) <!-- id: 184 -->
- [x] Target 4: Offline progress modal UX (mobile layout, non-overlapping modals) <!-- id: 185 -->
- [x] Target 5: Economy integrity check (isFinite checks, non-negative floors, Stage <101 check) <!-- id: 186 -->
- [x] Target 6: Cross-module regression isolation <!-- id: 187 -->

## Phase N-1: Save Encryption & Export/Import
- [x] Step 3: Implement save data obfuscation (Base64 serialization + 16-bit cyclic checksum) <!-- id: 188 -->
- [x] Step 3: Implement load data parsing (backward compatibility for plain JSON, checksum verify, validation try/catch) <!-- id: 189 -->
- [x] Step 4: Implement Export button (clipboard copy with fallback text area) <!-- id: 190 -->
- [x] Step 4: Implement Import button & modal (validate input, normalize state, immediate save, cancel support) <!-- id: 191 -->
- [x] Step 5: Scrub non-essential console.logs <!-- id: 192 -->

## Phase N-1B: Save Recovery & Corruption UX Pass
- [x] Target 1: Remove native browser blocking `alert()` on load corruption detection <!-- id: 193 -->
- [x] Target 2: Implement React-based corruption overlay notification with CTAs <!-- id: 194 -->
- [x] Target 3: Implement 5 distinct, descriptive Korean import error messages <!-- id: 195 -->
- [x] Target 4: Add descriptive Export/Import labels and backup reminder message <!-- id: 196 -->
- [x] Target 5: Implement mobile-responsive Import modal (flexible width, stack buttons, line-cap errors) <!-- id: 197 -->
- [x] Target 6: Ensure text areas support copy/paste action selectors <!-- id: 198 -->
- [x] Target 7: Confirm silent migration of legacy plain JSON data <!-- id: 199 -->

## Phase O-1: PWA Transformation & Native App Feel
- [x] Target 1: Create web application manifest (`manifest.json`) in project root <!-- id: 200 -->
- [x] Target 2: Create service worker (`sw.js`) to cache index.html for navigation mode only <!-- id: 201 -->
- [x] Target 3: Inject manifest link, Apple-specific and Android theme-color meta tags into head <!-- id: 202 -->
- [x] Target 4: Register the service worker at the end of the body in `index.html` <!-- id: 203 -->
- [x] Target 5: Implement native app styling tweaks (remove tap-flash, disable selection, manipulator touch-action) <!-- id: 204 -->
- [x] Target 6: Exception override to keep text-area selectable inside import modal <!-- id: 205 -->
- [x] Phase O-1A: PWA Lifecycle Hardening (static cache, safe-area CSS, silent SW registration) <!-- id: O1A -->
- [x] Phase O-1C: Controlled Static Asset Caching <!-- id: O1C -->



-   [ x ]   O - 1 B   P W A   U p d a t e   R e c o v e r y   &   C a c h e   R e g r e s s i o n   Q A  
 -   [ x ]   O - 1 C   C o n t r o l l e d   S t a t i c   A s s e t   C a c h i n g  

## Phase P-1: Zero-Day Hotfix
- [x] Compact Number Formatting
  - [x] Implement `formatCompactGlobal` at global scope
  - [x] Refactor `formatDps` to use non-currency compact formatting
  - [x] Update `formatCompact` React wrapper to route to global helper
  - [x] Apply `formatCompact` for Cash, Shards, DPS, Upgrade costs, Forge costs, Reward summaries, and Tokens in UI
- [x] Forge Initialization Recovery
  - [x] Automatically grant a starter weapon (`iron-dagger` +0) when inventory is empty in `normalizeGameState`
  - [x] Resolve React Hook violation in `getWarStatusIndicators`
  - [x] Update `migrateLegacyStateIfNeeded` to normalize returned migrated states
- [x] Defense Bankruptcy Soft-lock Prevention
  - [x] Update `startDefenseRun` to cost 0 tickets when player has 0 tickets and <100 dividends
  - [x] Update UI for Start Run button to allow and highlight free starts under bankruptcy

## Phase P-1B: Runtime QA & Exploit Audit
- [x] Verify Compact Formatting consistency <!-- id: p1b_compact_qa -->
- [x] Fix Bet Slip Stake input currency prefix in index.html <!-- id: p1b_bet_slip_fix -->
- [x] Verify Forge Recovery safety and claim starter weapon limits <!-- id: p1b_forge_qa -->
- [x] Verify Defense Bankruptcy exploit safety and low-dividend loops <!-- id: p1b_defense_qa -->
- [x] Verify Runtime Stability (no conditional hooks, no recursive normalize loops) <!-- id: p1b_stability_qa -->
- [x] Generate Runtime QA & Exploit Audit report <!-- id: p1b_report -->

## Phase P-2A: Progression Balance Baseline Audit
- [x] Run baseline progression audits across early game, Forge, Defense runs, Black Market, Reaper/late-game, and UI readability <!-- id: p2a_audit -->
- [x] Resolve weapon enhancement DPS combat scaling discrepancy <!-- id: p2a_combat_fix -->
- [x] Generate Baseline Progression Balance Audit report <!-- id: p2a_report -->
- [x] Generate walkthrough summary <!-- id: p2a_walkthrough -->

## Phase P-2B: Progression Curve Tuning & Reward Pressure Audit
- [x] Evaluate Forge reward pressure and align breakage shatter salvage payout to rarity-scaled helper <!-- id: p2b_forge_audit -->
- [x] Evaluate RPG combat stage scaling, HP growth, and dividends pacing <!-- id: p2b_rpg_audit -->
- [x] Evaluate Defense economy ticket costs, emergency starting, and contract pressure <!-- id: p2b_defense_audit -->
- [x] Evaluate UI formatting, compact numbering readability, and milestone notifications <!-- id: p2b_ui_audit -->
- [x] Generate Progression Curve Tuning & Reward Pressure Audit analysis report <!-- id: p2b_report -->
- [x] Generate walkthrough summary <!-- id: p2b_walkthrough -->