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
- [ ] Verify diffs <!-- id: 10 -->
- [ ] Final report <!-- id: 11 -->

## Settlement Status (Audit 2026-05-14)
- **Status Category**: **B / D** (Foundation exists, locked by default, reachable via dev toggle).
- **Code Foundation**: `settleDefenseContract` and `createDefenseContractSettlementResult` are implemented with deterministic logic.
- **Player Access**: Locked by `contractSettlementUnlocked: false`. No normal player unlock condition currently active.
- **Resolution Model**: Deterministic placeholder (threshold-based). Probabilistic Hero's Fate model (Math.random) is **not yet implemented**.
- **Design Alignment**: Real settlement must remain locked until the God Phase transition.
- **Recommended Unlock Trigger**: `gameState.rpg.normalEndingSeen === true` (Stage 100 / Dorothy boundary).
