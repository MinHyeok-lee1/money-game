# 🎯 Money Game Universe - Task & Milestone Tracker

## 🏁 Milestone 1: 기초 공사 및 통합 지갑 (Global Wallet) 연동

**목표:** 기존 독립된 게임을 생태계의 일부로 편입하고, 여러 탭을 오갈 수 있는 뼈대 구축.

- [x] 1-1. `localStorage` 마스터 지갑(Global Wallet) 스키마 정의 및 초기화 로직 구현.
- [x] 1-2. 게임 간 화면 전환을 위한 최상단 네비게이션 탭(GNB) UI 추가 (건물주 / 투자 / 강화 / RPG).
- [x] 1-3. 기존 `Idle Landlord`의 재화를 `Global Wallet`의 `cash`로 마이그레이션 연동.

**Milestone 1 complete:** Global Wallet state is saved under `moneyGameUniverseStateV1`; legacy `idleLandlordSaveV4` data is migrated and removed.

## 🏁 Milestone 2: 투자 게임 (Investment Master) 구현

**목표:** 하이리스크 하이리턴의 변동성 시장 엔진 구축.

- [x] 2-1. 실시간 가격 변동 알고리즘(Random Walk) 뼈대 구축.
- [x] 2-2. 우량주/잡코인 종목 데이터 구성 및 차트 UI 렌더링.
- [x] 2-3. 매수/매도 로직 구현 및 Global Wallet의 `cash`와 연동.

**Milestone 2 complete:** Investment tab has a basic static asset list, bounded active-tab price updates, Buy 1/Sell 1, Buy Max/Sell All, portfolio metrics, lightweight mini charts, average buy price, and unrealized gain/loss connected to Global Wallet `cash`.

## 🏁 Milestone 3: 뽑기 및 무기 강화 시스템 (Gacha & Enhancement)

**목표:** 잉여 자본을 소모할 핵심 콘텐츠 설계.

- [x] 3-1. 캐릭터 뽑기(Gacha) UI 및 확률형 획득 로직 구현.
- [ ] 3-2. 무기 강화 시스템 (성공/실패/하락/파괴) 및 이펙트 구현.
- [ ] 3-3. 장착 및 시너지(캐릭터+전용무기) 데이터 구조 세팅.

**Milestone 3B complete:** Enhancement tab has Draw 1/Draw 10, shared wallet spending, rarity counts, recent pull history, and inventory controls.

**Milestone 3C complete:** Basic weapon enhancement is available for weapon items with shared wallet spending, level cap, success/failure result, and safe item-level persistence.

**Milestone 3-3A complete:** Added the 52-character static data foundation for future equipment, synergy, and Idle RPG combat; full 3-3 gameplay integration remains pending.

**Milestone 3-3B complete:** Added canonical owned character instances under `gameState.rpg.characters` with safe normalization and unique instance IDs; full 3-3 gameplay integration remains pending.

**Milestone 3-3C complete:** Character gacha pulls now create owned RPG character instances while weapon pulls remain in Enhancement inventory; full 3-3 gameplay integration remains pending.

**Milestone 3-3D complete:** Added basic weapon equip/unequip foundation using character `equippedWeaponInstanceId`; full 3-3 gameplay integration remains pending.

**Milestone 3-3E complete:** Preferred weapon synergy foundation is implemented with character `preferredWeaponType` comparison, safe normalization, and bounded synergy multipliers visible in UI.

**Milestone 3-3F complete:** Faction synergy foundation is implemented with owned character faction counting and multiplier previews (x1.05 for 2, x1.12 for 3, x1.25 for 4+ same faction) visible in UI.

**Milestone 3-3G complete:** Final QA and documentation alignment for equipment and synergy data structure are complete.

**Milestone 3-3 complete:** The RPG character and weapon equipment foundation is fully integrated.
- 52-character definitions with faction/rarity balance.
- Canonical owned character instance management.
- Gacha integration for both characters and weapons.
- Weapon equip/unequip foundation.
- Preferred weapon synergy preview and safe normalization.
- Faction synergy preview and derived multiplier logic.
- All systems use shared Global Wallet `cash` and preserve tab-scoped passive behaviors.

## 🏁 Milestone 4: 방치형 RPG (Idle RPG) 구현

**목표:** 강화된 캐릭터로 몬스터를 사냥하고 특수 재화를 파밍하는 엔드 콘텐츠.

**Milestone 4A complete:** RPG DPS preview foundation is implemented with non-mutating derived DPS helper functions, Battle Preview UI, synergy multipliers (preferred weapon & faction), and top squad rankings.

**Milestone 4A-1 complete:** Implemented safe number formatting (`formatDps`) for large DPS values, supporting compact (M, B) and scientific notation (e+42) while preventing `NaN` or `Infinity` displays.

**Milestone 4B complete:** Basic idle combat engine implemented with stage-based monster HP scaling, active combat loop gated by RPG tab, and monster defeat tracking.

**Milestone 4C complete:** Basic stage progression foundation implemented. Stage advances every 5 kills, with monster HP scaling and highest stage tracking integrated into the live combat UI.

**RPG Master Blueprint adopted:** Integrated long-term vision document (`RPG_MASTER_BLUEPRINT.md`) covering the "Sponsor to God" progression, external capital leverage, and Dorothy proposal system.

**Next - Milestone 4D (Planned):** Introduce `Dividends` as the first RPG-specific defeat reward foundation to enable early-game stat upgrades.

**Milestone 4D complete:** RPG Dividends reward foundation implemented. Monsters now award Dividends on defeat, with stage-based scaling rewards displayed in the live RPG dashboard.

**RPG Master Blueprint expanded:** Added Normal Ending (Stage 100), Infinite Mode (Stage 101+), Hero's Fate Betting, and Dorothy's Infinite Mode unlock logic to the vision document.

**Milestone 4E complete:** RPG Dividends Upgrade Foundation implemented. Players can now spend Dividends on ATK, SPD, and PEN boosts. ATK and SPD upgrades directly multiply Total Team DPS, while PEN is prepared for future defense-heavy Infinite Mode stages.

**Milestone 4F complete:** RPG Stat Model Preview Foundation implemented. Derived stat helpers (ATK, SPD, PEN, ACC, CRT) and Combat Stat Preview UI panel added to RPG tab, with ACC/CRT support for future mechanics.

**Milestone 4G complete:** Normal Ending Boundary Foundation implemented. `NORMAL_ENDING_STAGE = 100` constant added; `normalEndingReached` and `normalEndingSeen` fields added to `gameState.rpg` with safe defaults and normalization; stage progression sets `normalEndingReached: true` when `highestStage >= 100` without blocking further progression; `isNormalEndingReached` and `getRpgModeLabel` helpers added; RPG tab now shows Stage 100 target progress bar, current mode label (Normal Arc / Infinite Mode Preview / Locked Mechanics), and a small narrative placeholder when Normal Ending is reached. `normalEndingSeen` remains reserved for a future modal. Milestone 4-2 not yet complete.

**Milestone 4H complete:** Dorothy Proposal Script Foundation implemented. `DOROTHY_SCRIPTS.normalEndingProposal` added with four speaker/textKey lines; KO and EN localization entries added to `TRANSLATIONS`; `acknowledgeDorothyProposal` handler sets `normalEndingSeen: true`; RPG tab shows Dorothy proposal panel when `normalEndingReached && !normalEndingSeen` and a compact acknowledged note when `normalEndingSeen`; external capital leverage, Infinite Mode mechanics, and Dorothy UI beyond the script remain locked. Milestone 4-2 not yet complete.

**UI Alignment pass complete:** Investment, Enhancement, and RPG tabs now follow the Landlord emerald/card layout. All tab headers use `from-green-700 to-emerald-600` gradient; buttons use emerald/green accents; red/teal/purple/slate/rose UI colors removed. No gameplay logic, data, or save state was modified.

**Horizontal economy foundation complete:** Investment now uses independent `investment.capital` with a one-time support grant and optional cash-to-capital booster flow; Gacha now spends RPG `dividends`; RPG runs now use ticket-gated temporary `rpg.run.activeUnits` with capped run result history while preserving legacy `rpg.characters` for save compatibility.

**Defense Contract deterministic real settlement foundation added:** `contractSettlementHistory: []` added to default state and normalization (10-entry cap, strict 10-field type check, `status === "settled"`). Pure helper `createDefenseContractSettlementResult` added — same deterministic win logic as dry-run (`successChance + stageSignal + dpsSignal >= 60`). Handler `settleDefenseContract` added using `setGameState` — deducts stake once, adds `stake * projectedPayout` to cash on win only, appends to `contractSettlementHistory`, clears bet slip stake, never touches holdings or RPG state. Settlement button now active (emerald, `onClick={settleDefenseContract}`) when `canSettle: true`. Real settlement history panel added showing Won/Lost, net result, odds, payout, timestamp per entry. No random outcome, no new localStorage key.

**Defense Contract dry-run settlement result foundation added:** `lastContractDryRun: null` added to `gameState.investment` default and normalization (strict shape check — all 11 fields typed, `status === "dry-run"`, malformed → null). Pure helper `createDefenseContractDryRunResult` added — calls `validateDefenseContractSettlement`, derives deterministic `wouldWin` from `successChance + stageSignal + dpsSignal >= 60` (no `Math.random` for outcome), computes `netPreview`. Handler `runDefenseContractDryRun` added using `setGameState` — only writes `lastContractDryRun`, no cash deduction, no payout, no history write. "Run Dry-Run Simulation" button added (blue, enabled only when `canSettle: true`). Dry-run result panel shows contract name, Would Win/Lose, Success Chance, Projected Payout, Net Preview, timestamp, and "Dry-run only — no cash moved." note. Real settlement button remains disabled with no handler.

**Defense Contract dev settlement gate toggle added:** Handler `toggleDefenseContractSettlementGate()` added using `updateGameState` — only flips `contractSettlementUnlocked` boolean, touches no other state. Dev-only toggle panel added in bet slip (yellow dashed border, "Dev Preview Only" label, "Unlock Gate"/"Lock Gate" button). When unlocked, validation may reach `canSettle: true` and button reads "Settle Contract" — but button remains `disabled` with no `onClick`. No wallet deduction, no payout, no new localStorage key.

**Defense Contract settlement validation foundation added:** Pure helper `validateDefenseContractSettlement(gameState, assetList, highestStage, squadDps)` added at script scope — returns `{ canSettle, reason, selectedContractId, stake, odds, projectedPayout, checks }`. Six sequential validation rules: settlement unlocked, contract selected, stake > 0, stake ≤ wallet cash, odds finite+positive, payout finite+positive. Short-circuits with `canSettle: false` at the first failing rule. `settlementValidation` derived const added in component body. Settlement Status panel now renders all six check rows with ✓/✗ indicators and the reason text. Settlement button remains disabled with no onClick handler. No state mutation, no payout, no new localStorage key.

**Defense Contract settlement gate foundation added:** `contractSettlementUnlocked: false` added to `gameState.investment` default and normalization (boolean-only, strict `=== true` guard). Pure helper `isDefenseContractSettlementUnlocked(gameState)` added at script scope. Bet slip now shows a "Settlement Status" panel with Locked/Unlocked indicator and explanatory text. Settlement button renders "Real Settlement Locked" when locked (disabled) or "Settle Contract" when unlocked (still disabled — no handler wired). No mutation of `contractSettlementUnlocked`, no wallet deduction, no payout, no new localStorage key.

**Defense Contract preview history foundation added:** `contractHistory: []` added to `gameState.investment` default and normalization (array-only, max 10, malformed entries dropped). Pure helper `createDefenseContractPreviewHistoryEntry` added. Handler `saveDefenseContractPreviewToHistory` added — requires valid contract + stake > 0, appends preview entry, caps at 10, no cash deduction, no payout. "Save Preview to History" button added to bet slip (enabled only when contract selected and stake > 0). "Settlement History Coming Soon" placeholder replaced with live preview history list (reversed, empty state). All entries have status `"preview"`. No new localStorage key introduced.

**Defense Contract settlement preview foundation added:** Pure deterministic helper `getDefenseContractSimulatedOutcome` added — returns `outcomeLabel`, `successChance`, `projectedGain`, `projectedLoss`, `confidenceLevel`, and `explanation` with no state mutation. `simulatedOutcome` derived const added in component body. Bet slip panel now shows a "Settlement Preview" panel (Success Chance, Outcome, Projected Gain/Loss, Confidence, Signal Analysis) when a contract and stake are active. Disabled "Real Settlement Locked" button replaces old placeholder. "Settlement History Coming Soon" placeholder added between bet slip and contract list. No payout, no localStorage change.

**Defense Contract bet slip preview foundation added:** `betSlip: { selectedContractId, stake }` added to `gameState.investment` with safe normalization. Pure helper `getDefenseContractBetPreview` added. Handlers `selectDefenseContract`, `updateDefenseContractStake`, `clearDefenseContractBetSlip` added. Each contract card has a "Select Contract" toggle button. Bet slip panel shows selected contract name, odds, projected payout, risk tier, stake input (clamped 0–cash) with 25%/50%/Max shortcuts, projected win preview, and a disabled "Settlement Coming Soon" button. No settlement logic, no payout, no new localStorage key. All existing Back/Exit mechanics and portfolio calculations unchanged.

**Defense Contracts derived odds preview foundation added:** Three pure derived helpers (`getDefenseContractRiskTier`, `getDefenseContractOdds`, `getDefenseContractProjectedPayout`) added outside the component — no state mutation, no settlement logic. Each Defense Contract card now shows a "Contract Preview" panel with Defense Odds (%), Projected Payout (multiplier), Risk Tier (Stable/Volatile/High Risk), and Linked RPG Signal (highest stage + squad DPS). All existing buy/sell mechanics, portfolio calculations, sparklines, and localStorage schema are unchanged.

**Investment presentation layer shifted toward Hero's Fate Betting foundation:** `DEFENSE_CONTRACT_FLAVOR` static map added for asset display names, contract types, and lore. Investment tab header renamed to "Defense Contracts"; stat labels renamed (War Chest, Contract Value, Total Capital). Lore panel with Dorothy voice added. Derived-only Market Status panel (Defense Stability, Hero Survival Index, Raid Confidence, Capital Pressure, dominant faction, squad DPS) added. Per-asset labels renamed (Contract Rate, Positions Held, Stake Value, Entry Rate, Return) and action buttons renamed (Back 1, Back Max, Exit 1, Exit All). All buy/sell/portfolio logic and internal state keys are unchanged.

**Defense Contracts progress summary (Documentation & Task Alignment Pass):**
Six foundation layers are complete under `gameState.investment`. Real settlement, payout, and Hero's Fate resolution are **not yet active**.
- ✅ Presentation: Investment tab reframed as Defense Contracts with flavor names, Dorothy lore, renamed labels/buttons, Market Status panel.
- ✅ Odds preview: `getDefenseContractRiskTier`, `getDefenseContractOdds`, `getDefenseContractProjectedPayout` pure helpers; per-card Contract Preview panel.
- ✅ Bet slip: `betSlip` sub-state, `selectDefenseContract` / `updateDefenseContractStake` / `clearDefenseContractBetSlip` handlers, stake UI with 25%/50%/Max shortcuts.
- ✅ Settlement preview: `getDefenseContractSimulatedOutcome` deterministic helper; Success Chance, Outcome, Projected Gain/Loss, Confidence, Signal Analysis panel — no mutation.
- ✅ Preview history: `contractHistory` (max 10, status `"preview"`), `createDefenseContractPreviewHistoryEntry` helper, `saveDefenseContractPreviewToHistory` handler, live history list UI.
- ✅ Settlement gate: `contractSettlementUnlocked: false` flag, `isDefenseContractSettlementUnlocked` helper, Settlement Status panel with Locked/Unlocked indicator.
- 🔒 Real settlement: not implemented — no stake deducted, no payout granted, no random outcome.
- 🔒 Hero's Fate resolution formula: not implemented.
- 🔒 Infinite Mode unlock via Dorothy: not implemented.

**Next recommended implementation:**
1. Manual settlement QA — test bet slip → save preview → history flow end-to-end in browser.
2. Real settlement unlock design — define trigger for `contractSettlementUnlocked: true` (e.g., `highestStage >= NORMAL_ENDING_STAGE`).
3. Hero's Fate resolution formula — probabilistic win/loss using `getDefenseContractOdds` as success probability, payout via `getDefenseContractProjectedPayout`, with stake deduction from wallet.

- [ ] 4-1. 자동 전투 엔진 (캐릭터 합산 DPS vs 몬스터 체력) 구현.
- [ ] 4-2. 무한 스테이지 등반 및 보스전 로직.
- [ ] 4-3. 몬스터 처치 시 특수 재화(다이아몬드 등) 획득 및 마스터 지갑 연동.

## 🏁 Milestone 5: 명예 환생 및 클라우드 세이브 (Endgame & Security)

**목표:** 무한 순환 루프 완성 및 데이터 안정성 확보.

- [ ] 5-1. 유니버스 전체 초기화(Hard Reset) 및 명예 포인트(Honor) 획득 로직.
- [ ] 5-2. 명예 상점 (영구 버프 구매) 구현.
- [ ] 5-3. Base64 세이브 데이터 Import/Export 기능.
