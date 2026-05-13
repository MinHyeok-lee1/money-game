# Money Game Universe - Master TODO List

## Phase 0: System Architecture & Global State

- [x] **Global Wallet foundation:** canonical shared `localStorage` state for all game modes. Current key: `moneyGameUniverseStateV1`.
- [x] **Navigation (GNB):** Landlord, Investment, Enhancement, and RPG tabs keep shared state while switching views.
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
- [x] **Defense Contracts presentation:** Investment tab reframed as Hero's Fate Betting UI — flavor names, Dorothy lore, Market Status panel, renamed labels.
- [x] **Defense Contracts odds preview:** `getDefenseContractRiskTier`, `getDefenseContractOdds`, `getDefenseContractProjectedPayout` pure helpers; per-card Contract Preview panel.
- [x] **Defense Contracts bet slip:** `betSlip` state, stake input (clamped 0–cash), 25%/50%/Max shortcuts, projected win display.
- [x] **Defense Contracts settlement preview:** `getDefenseContractSimulatedOutcome` deterministic helper — Success Chance, Outcome, Gain/Loss, Confidence, Signal Analysis (no mutation).
- [x] **Defense Contracts preview history:** `contractHistory` (max 10, `"preview"` status only), save handler, live history list UI.
- [x] **Defense Contracts settlement gate:** `contractSettlementUnlocked: false` flag, `isDefenseContractSettlementUnlocked` helper, locked/unlocked status panel.
- [ ] **Real settlement unlock:** wire `contractSettlementUnlocked: true` to a game condition (e.g., `highestStage >= 100`).
- [ ] **Hero's Fate resolution:** probabilistic win/loss, stake deduction, payout to wallet.

## Phase 3: Gacha & Enhancement

- [x] Character and item gacha UI and reward logic.
- [x] Weapon enhancement system with success/failure outcomes (Foundation).
- [x] Inventory and equipment data model.
- [x] Faction and weapon synergy data foundation.

## Phase 4: Idle RPG (RPG Master Blueprint adopted)

- [ ] **Dividends Economy**: Implement the first RPG-specific currency for early-game stat upgrades.
- [ ] **Combat Stat Model**: Add logic for ATK, ACC, CRT, SPD, and PEN stats.
- [ ] **External Capital Leverage**: Bridge Landlord/Investment wealth into RPG combat power.
- [ ] **Dorothy UI & Event**: Create the "Dorothy Proposal" script and interaction flow.
- [ ] **52-Character Detailed Data Sheet**: Define granular stats for the complete character roster.
- [ ] **Mythic Authority Triggers**: Implement endgame characters with reality-warping authority skills.
- [ ] **Character Storylines**: Add lore integration for characters and factions.
- [ ] **Hero's Fate Betting**: High-stakes Investment/RPG wagering system. Presentation and preview foundations complete; real settlement not yet active.
- [ ] **Infinite Mode Scaling**: Mathematical modeling for monster growth beyond Stage 100.
- [ ] Character collection and party setup.
- [ ] Auto-battle and endless stage progression.
- [ ] Boss rewards that connect back into the shared economy.

## Phase 5: Prestige & Honor

- [ ] Universe reset that grants Honor Points.
- [ ] Honor shop for permanent bonuses.
