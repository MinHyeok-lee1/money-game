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

## Phase 2: Investment Master

- [x] Market price simulation with bounded active-tab-only volatility.
- [x] Stock/coin asset data with lightweight SVG sparkline charts.
- [x] Buy/sell logic connected to Global Wallet `cash`.
- [x] Portfolio value, net worth, average buy price, and unrealized gain/loss.
- [x] Buy Max and Sell All trading controls.

## Phase 3: Gacha & Enhancement

- [x] Character and item gacha UI and reward logic.
- [x] Weapon enhancement system with success/failure outcomes (Foundation).
- [x] Inventory and equipment data model.
- [x] Faction and weapon synergy data foundation.

## Phase 4: Idle RPG

- [ ] Character collection and party setup.
- [ ] Auto-battle and endless stage progression.
- [ ] Boss rewards that connect back into the shared economy.

## Phase 5: Prestige & Honor

- [ ] Universe reset that grants Honor Points.
- [ ] Honor shop for permanent bonuses.
