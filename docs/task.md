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
- **Design Alignment**: 
    - Real settlement is locked during the "Sponsor" phase and becomes active in the "God" phase. 
    - Tactical Edge is now active in real settlement odds. 
    - PEN signal and preview history payout bugs fixed. 
    - Payout multipliers scaled for better risk reward.
    - **FAILURE CONSEQUENCE REVISION**: Defense Contract failure now triggers **Game Over / Restart from beginning**, replacing the rejected "Capital Freeze" concept.
- **Detailed Spec**: See [HEROS_FATE_BETTING_SPEC.md](HEROS_FATE_BETTING_SPEC.md) for the probabilistic model details.
