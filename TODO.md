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
- [ ] **Reaper Form Modifier Integration**: Fold Reaper forms into bounded Stage 101+ modifiers while preserving Stage 1-100 and existing systems (Phase I-4E).
- [x] **Hero's Fate Betting**: High-stakes Investment/RPG wagering. Tactical Signal integration is live; Phase E-3 Game Over / Restart foundation and Phase E-4 settlement confirmation implemented.
- [ ] **52-Character Detailed Data Sheet**: Granular per-character stats and growth curves.
- [ ] **Mythic Authority Triggers**: Endgame characters with authority skills (Inflation, Market Crash, Monopoly).
- [ ] **Character Storylines**: Lore integration for characters and factions.
- [ ] Boss rewards that connect back into the shared economy.

## Phase 5: Prestige & Honor

- [ ] Universe reset that grants Honor Points.
- [ ] Honor shop for permanent bonuses.
