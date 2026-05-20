# Money Game Universe - Master TODO List

## Phase 0: System Architecture & Global State

- [x] **Global Wallet foundation:** canonical shared `localStorage` state for all game modes. Current key: `moneyGameUniverseStateV1`.
- [x] **Navigation (GNB):** Landlord, Investment, Enhancement, and RPG tabs keep shared state while switching views.
- [x] **Global Wallet Header:** shared cash/state header visible across all tabs.
- [x] **Emerald theme unification:** all four tabs use consistent `from-green-700 to-emerald-600` gradient header and emerald button accents.
- [x] **i18n consolidation:** language detection and translations unified under `settings.language`.
- [x] **Horizontal economy model:** `cash` is a cross-module booster; each module has its own entry currency (`investment.capital`, `dividends`, etc.). Vertical cash-gate dependency removed.
- [x] **Integrated data schema:** wallet, landlord, investment, enhancement, RPG, and settings state are stored together.
- [x] **Legacy save migration:** existing `idleLandlordSaveV4` data is migrated into Global Wallet and removed.
- [ ] **Data portability:** add export/import support for saved data.
- [ ] **Cloud saves:** consider Firebase, Supabase, or another hosted save backend later.

## Phase 1: Idle Landlord

- [x] Click and passive income systems.
- [x] 10 property tiers with 1.15x price scaling.
- [x] Rebirth and permanent multiplier system.
- [x] **[Refactor]** Idle Landlord cash is connected to Global Wallet `cash`.

## Phase 2: Investment Master / Defense Contracts

- [x] Market price simulation with bounded active-tab-only volatility.
- [x] Stock/coin asset data with lightweight SVG sparkline charts.
- [x] Buy/sell logic connected to Global Wallet `cash`.
- [x] Portfolio value, net worth, average buy price, and unrealized gain/loss.
- [x] Buy Max and Sell All trading controls.
- [x] **Independent capital base:** Investment uses `investment.capital` — players can enter without prior Landlord earnings; optional cash-to-capital booster flow available.
- [x] **Defense Contracts presentation:** Investment tab reframed as Hero's Fate Betting UI — flavor names, Dorothy lore, Market Status panel, renamed labels.
- [x] **Defense Contracts odds preview:** `getDefenseContractRiskTier`, `getDefenseContractOdds`, `getDefenseContractProjectedPayout` pure helpers; per-card Contract Preview panel.
- [x] **Defense Contracts bet slip:** `betSlip` state, stake input (clamped 0–cash), 25%/50%/Max shortcuts, projected win display.
- [x] **Defense Contracts settlement preview:** `getDefenseContractSimulatedOutcome` deterministic helper — Success Chance, Outcome, Gain/Loss, Confidence, Signal Analysis (no mutation).
- [x] **Defense Contracts preview history:** `contractHistory` (max 10, `"preview"` status only), save handler, live history list UI.
- [x] **Defense Contracts settlement gate:** `contractSettlementUnlocked: false` flag, `isDefenseContractSettlementUnlocked` helper, locked/unlocked status panel.
- [x] **Real settlement unlock:** gated by `normalEndingSeen === true` (Dorothy Proposal acknowledgement).
- [x] **Hero's Fate resolution:** basic probabilistic win/loss, stake deduction, payout to wallet.

## Phase 3: Gacha & Enhancement

- [x] Character and item gacha UI and reward logic; pulls now spend RPG `dividends` (not `cash`).
- [x] Weapon enhancement system with success/failure outcomes (Foundation); permanent progression via `weaponMastery` / `weaponLevels`.
- [x] Inventory and equipment data model.
- [x] Faction and weapon synergy data foundation.

## Phase 4: Idle RPG (RPG Master Blueprint adopted)

- [x] **Dividends Economy**: RPG-specific currency earned from monster defeats; ATK/SPD/PEN upgrade economy implemented.
- [x] **Combat Stat Model**: ATK, SPD, PEN stat upgrades active; ACC and CRT preview implemented.
- [x] **Normal Ending boundary**: Stage 100 marked as Normal Ending; `normalEndingReached` / `normalEndingSeen` state; three-way mode label (Normal Arc → Normal Ending Reached → Infinite Mode Preview).
- [x] **Dorothy Proposal script**: `DOROTHY_SCRIPTS.normalEndingProposal`, KO/EN localization, acknowledge handler; panel visible after Stage 100, dismissed via button.
- [x] **RPG run structure**: `rpg.run.activeUnits` ticket-gated volatile run units; legacy `rpg.characters` preserved for save compatibility.
- [x] **External Capital Leverage**: Bridge Landlord/Investment wealth into RPG combat power (Phase G-1 foundation, G-2 Balance QA, G-3 Specialization active, G-4A Sync Design complete).
- [x] **Infinite Mode Scaling**: Monster HP growth and stage rewards beyond Stage 100 (Phase F-1 foundation implemented).
- [x] **Infinite Mode Archetype Foundation**: Stage 101+ deterministic monster archetype labels and RPG UI panel implemented (Phase I-2A, display-only).
- [x] **Infinite Mode Bounded Modifiers**: Armor Wall PEN scaling and Regenerator healing active for Stage 101+ only (Phase I-2B).
- [x] **Infinite Mode Modifier QA**: Armor Wall / Regenerator bounds verified; Stage 1-100 remains neutral (Phase I-2C).
- [x] **Infinite Mode Remaining Modifiers**: Phantom ACC, Berserker SPD, and Shadow Wraith CRT pressure active with bounded deterministic formulas (Phase I-2D).
- [x] **Infinite Mode Remaining Modifier QA**: Phantom/Berserker/Shadow Wraith bounds verified; Authority Gate remains boss-phase work (Phase I-2E).
- [x] **Infinite Mode Boss Milestone Placeholders**: Stage 150/200/300/500/1000 boss metadata and RPG UI panel implemented without combat mechanics (Phase I-3A).
- [x] **Infinite Mode Boss Milestone QA**: Boss metadata/helper/UI gating verified; Authority Gate remains combat-neutral (Phase I-3B).
- [x] **Iron Sentinel Boss Foundation**: Stage 150 now applies a bounded PEN-based damage check while later boss milestones remain placeholders (Phase I-3C).
- [x] **Iron Sentinel Boss QA**: Stage 150 PEN boss check verified as bounded and isolated; later boss milestones remain placeholders (Phase I-3D).
- [x] **Infinite Mode Reaper Direction**: Future Stage 101+ direction reframed around a recurring Reaper-like final monster; Stage 200/300/500/1000 individual boss mechanics deferred (Phase I-4A).
- [x] **Reaper Infinite Mode Model Spec**: Unified Reaper fantasy, naming, masks/forms, scaling dimensions, UI direction, and integration plan defined (Phase I-4B).
- [x] **Reaper Model Data Foundation**: Static Reaper profile/form data and deterministic helper behavior added without combat changes (Phase I-4C).
- [x] **Reaper UI Integration**: Display Reaper identity, current mask/form, intensity tier, threat label, and counter stats without adding combat mechanics (Phase I-4D).
- [x] **Reaper UI Smoke QA**: Stage 101+ Reaper panel gating, translations, archetype/boss panel compatibility, and no-combat-change boundaries verified (Phase I-4D-1).
- [x] **Reaper Form Modifier Integration**: Added bounded Stage 101+ Reaper pressure while preserving Stage 1-100 and existing systems (Phase I-4E).
- [x] **Reaper Balance QA**: Reaper pressure bounds, Stage 150 stacking, deferred milestone behavior, and system boundaries verified (Phase I-4F).
- [x] **Reaper Infinite Mode Implementation (Phase K-1 & I-5)**:
  - [x] **PART 1: Entry UX & Requirement Gate (K-1)**: Add readiness badge (READY / UNDERPREPARED / EXTREME_RISK / PREVIEW_ONLY), signals, entry CTA, and pure helpers.
  - [x] **PART 2: Live Combat Engine & Scaling (I-5)**: Apply 101+ damage compression, rotate specialized enemy archetypes, spawn Stage 150 Iron Sentinel boss with dual-mitigation.
- [x] **Infinite Mode Playability Snapshot / QA**: Define manual playability plan and test ranges for Infinite Mode & Reaper system (Phase I-5A).
- [x] **Hero's Fate Betting**: High-stakes Investment/RPG wagering. Tactical Signal integration is live; Phase E-3 Game Over / Restart foundation and Phase E-4 settlement confirmation implemented.
- [ ] **52-Character Detailed Data Sheet**: Granular per-character stats and growth curves.
- [ ] **Mythic Authority Triggers**: Endgame characters with authority skills (Inflation, Market Crash, Monopoly).
- [ ] **Character Storylines**: Lore integration for characters and factions.
- [ ] Boss rewards that connect back into the shared economy.

## Phase J: Product UX Reframe

- [x] **Product UX Reframe Spec**: Create comprehensive reset specification document (`PRODUCT_UX_REFRAME_PLAN.md`) detailing naming audit, module reframes, and specs roadmap (Phase J-0).
- [x] **Korean Naming & Navigation Cleanup**: Apply Korean localization naming pivot across GNB headers and main app panels (Phase J-1).
- [ ] **Hero's Fate UX Simplification** (Phase J-2):
  - [x] **UX Redesign Spec**: Create a detailed prediction interface specification document (`HEROS_FATE_UX_REDESIGN_SPEC.md`) (Phase J-2A).
  - [x] **Label & Copy Cleanup**: Update visible text fields in `UI_TEXT.ko` (Phase J-2B).
  - [x] **Survival Prediction Card Layout**: Reframe standard cards into vertical prediction units (Phase J-2C).
  - [x] **Bet Slip Simplification**: Configure clean inputs and risk warnings (Phase J-2D).
  - [x] **Fate Log Polish**: Upgrade history log with green/red outcome cards (Phase J-2E).
  - [x] **1:1 Duel Model Proposal**: Define combat and weapon system integration schemas (Phase J-2F).
- [ ] **Weapon Enhancement Redesign**: Complete forging loop reframe (Phase J-3)
  - [x] **Redesign Spec**: Draft core 1~30 ladder spec, shard loop guardrails, dopamine specs, and prestige pacing (Phase J-3A, J-3A-1, J-3A-2, J-3C-2 & J-3C-3 complete).
  - [x] **Current Audit**: Inspect existing codebase hooks and gacha inventory arrays (Phase J-3B & J-3B-1).
  - [x] **Copy & UI Cleanup**: Localize forge naming, anvil actions, and inventory visual reframes safely (Phase J-3C, J-3C-1, J-3E-0, J-3E, J-3E-1 & J-3E-2 complete).
  - [x] **Data & Schema Design**: Model success rates and migration profiles (Phase J-3D complete, J-3F schema proposal complete). Phase J-3G (Breakage/Shards Prototype) remains pending implementation.
  - [x] **Blacksmith Prototype**: Breakage, salvage shards, stabilizer consumables, lock protection, forge stats (Phase J-3G foundation complete). Black Market scaffolding complete (L-1). Weapon mod pool, mod bonus helper, and additive RPG integration live (L-2).
  - [x] **Prestige & Recovery UX**: Tier visuals, weapon epithets, danger zone strips, recovery encouragement, equipped badges, forge record display (Phase J-3H complete). No schema changes.
  - [x] **Lock Confirmation & Bulk Salvage Safety**: Locked weapon hard-block, danger-zone confirmation modal, bulk broken weapon cleanup (Phase J-3I complete). No schema changes.
- [ ] **Defense Tab UX Redesign Spec**: Reframe the RPG tab around Random Tower Defense actions (Summon, Place, Evolve, Defend) (Phase J-4).
  - [x] **Unified UX Audit**: Perform product-wide UX pass and write docs/DARK_FRONTIER_UNIFIED_UX_AUDIT.md (Phase J-4A complete).
  - [x] **First-Time Player UX Rework**: Analyze 3-minute onboarding window and write docs/FIRST_TIME_PLAYER_UX_REWORK.md (Phase J-4B complete).
  - [x] **First-Click CTA Patch**: Add visually integrated dark-militarized tactical guidance to all four tabs (Phase J-4C complete).
  - [x] **Immediate Dopamine Feedback Pass**: Added dynamic firing overlay radar grids, heavy anticipation anvil strike recoil shake physics, high-risk real-time betting outcome alerts, active defense run battlefield vibration flashes, and real-time scrolling operations terminals (Phase J-4D complete).
  - [x] **Cross-System War Cohesion Pass**: Integrated Global War Status Strip telemetry GNB strip and linked rear outposts, betting results, and anvil updates to frontline Operations log feeds (Phase J-4E complete).
  - [x] **Cross-System War Cohesion Runtime QA**: Audited handlers, verified localization labels, and confirmed non-mutation safety constraints (Phase J-4E-1 complete).
  - [x] **First-Time Forge Onboarding & Empty State**: Added compact Smith & Shards guidance, currency role explanations, empty armory copy, danger-zone warning, and live forge vs sandbox boundary copy (Phase J-4G complete).
- [x] **Incremental Implementation Pass**: Phase in spec changes safely without breaking saves or combat formulas (Phase J-5).
  - [x] **Prestige Announcement Toast**: Added transient +6/+8/+10 forge milestone banner for successful weapon enhancement only (Phase J-5A complete). No schema changes.
  - [x] **Forge Result Recap Polish**: Added high-fidelity tactical recap metrics grid, dynamic advice cue, and live-linked fields (Phase J-5B complete).
  - [x] **Regression QA, Mobile Readability & Live Breakage Backend**: Implemented 1-30 live risk ladder, stabilizer consumption, auto-deletion on shatter, shard deposit, salvage history, and mobile layout fixes (Phase J-5C complete).
- [x] **Live Forge Risk Ladder Balance QA & Prepare Infinite Reaper Shift**: Upgraded danger confirmation modal, integrated stabilizer alerts, shifted milestone toasts to +10/+20/+30, mapped dynamic scaled power display, and embedded Phase 4 Infinite Mode roadmap teaser (Phase J-5D complete).

## Phase 5: Prestige & Honor

- [ ] Universe reset that grants Honor Points.
- [ ] Honor shop for permanent bonuses.

## Phase K-3 / L-1 / L-2: Reaper Infinite Mode & Black Market

- [x] **Reaper Run Objective & Reward Loop UX**: Implemented `getNextReaperMilestone`, `getReaperRunObjective`, `getReaperRewardLoopHint` pure helpers + Reaper Run Objective Panel in RPG tab (Phase K-3 complete).
- [x] **Black Market Economy Scaffolding**: `wallet.blackMarketTokens`, `weapon.mods[]` schema, `normalizeGameState` fallbacks, `convertShardsToTokens` 100:1 helper, weapon card placeholder UI (Phase L-1 complete).
- [x] **Economy Safety QA**: All 6 unsafe input types rejected by `convertShardsToTokens`. `isFinite`+`isInteger` guard added. `[object Object]` UI bug fixed. All cross-module systems verified untouched (Phase L-2 Part 1 complete).
- [x] **Weapon Mod Foundation**: `WEAPON_MOD_POOL` (3 mods: PEN/SPD/CRT), `getWeaponModBonus` pure helper, additive integration into `getRpgCombatStats`, minimal workstation UI with `[PROTOTYPE]` signals and shard→token conversion display (Phase L-2 Part 2 complete).
- [x] **Weapon Mod Rolling**: `rollWeaponModification` handler (5-gate validation, immutable `inventory.map()`, 1-token cost, broken/locked/zero-token hard-blocks), `lastRollResult` useState, full 6-state workstation UI — all `[PROTOTYPE]` tags replaced with live Roll/Reroll CTA, recap panel, and `[BLACK MARKET]` badge (Phase L-3 complete).
- [x] **Mod Display Polish**: `WEAPON_MOD_POOL` expanded to 5 entries (`mod_acc_boost` acc:3%, `mod_heavy_caliber` atk:8%, no "power" key). GNB header token widget (5th column, amber glow). Smith & Shards weapon card inline mod badge. RPG squad panel ⚡ mod badge beside weapon name. RPG stat preview mod bonus line (hidden when zero, `isFinite`-guarded). `getRpgCombatStats` extended to aggregate and apply `atk`/`acc` mod bonuses additively (Phase L-4 complete).
- [x] **Tactical Mod Identity Pass (L-5A)**: role/roleColor/roleGlyph/flavor added to all 5 pool entries. `getModPoolEntry()` display-only lookup helper. All badge render locations (Smith & Shards, RPG squad, workstation readout) updated with `[{glyph} {ROLE}]` tag + amber mod name + stat. Roll recap replaced with first-roll / reroll tactical narrative. `previousMod` captured as local variable before overwrite — not persisted.
- [x] **Bulk Shard Conversion & Reaper Scaling (L-5B)**: `convertAllShardsToTokens()` handler with 4-gate validation (≥100 shards, maxTokens≥1, isFinite+isInteger, underflow guard). Dual-action workbench UI (single + bulk buttons, preview estimate line, flex-col/row layout). Infinite Mode shard payout scaling injected into `applyCombatTick` for stage≥101 (IntensityTier formula, all isFinite guards, stage 1–100 path untouched).
- [x] **Black Market Economy QA (L-5C)**: Shard pacing traced across all Infinite Mode stage brackets. Reroll spam test passed (functional updates compose correctly, no double-deduction). Inflation risk: LOW 101–200, MEDIUM 300+ (acceptable). Token stockpile advisory added (bmt > 20, display-only). All cross-module systems verified untouched.
- [x] **Targeted Role Mod & Codex Panel (L-6)**: `rollTargetedWeaponModification()` handler (6-gate validation, exactly 3 tokens, role filter via `WEAPON_MOD_POOL.filter`, random within role, `isTargeted` recap flag). Role selector (5 pills, per-weapon local state). Targeted roll CTA (4 disabled states, cost comparison note). Black Market Tactical Codex panel (collapsible, 5-entry pool list with role/name/stat/flavor, collapsed by default). Recap extended with targeted variant header.
