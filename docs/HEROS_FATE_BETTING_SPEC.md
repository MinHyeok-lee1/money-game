# 🎲 Hero's Fate Betting: Probabilistic Settlement Spec

This document defines the implementation of the probabilistic settlement model for the "Hero's Fate" betting system (Investment Module -> RPG Module linkage).

---

## 📖 Vision
Hero's Fate is the primary high-stakes linkage between **Investment Capital** and **RPG Performance**. It allows players to leverage their economic success to amplify RPG growth or generate massive capital windfalls, provided their squad can meet the challenge.

---

## 🛠️ Probabilistic Settlement Model

The settlement model is **probabilistic**, using a weighted success chance calculated from the delta between Squad Power and Contract Difficulty.

### 1. Model Inputs
- **Contract Data**: Difficulty Tier (Stage Target), Base Odds, Payout Multiplier.
- **Wager Data**: Stake amount (Investment Capital).
- **Combat Stats**: 
    - `totalTeamDps`: Current active run DPS.
    - `highestStage`: Maximum stage reached.
    - `rpg.upgrades`: ATK, SPD, PEN levels.
    - `enhancement.inventory`: Equippable gear quality.
- **Risk Modifiers**: Faction synergies or Character rarity bonuses (Future).

### 2. Probability Bounds
- **Minimum Win Chance**: 5%
- **Maximum Win Chance**: 95%
- **Success Formula (Policy C)**: 
    `WinProb = clamp(BaseOdds + StageSignal + CombatSignals, 0.05, 0.95)`
    *   **BaseOdds**: Pure investment risk (30% to 80%).
    *   **StageSignal**: RPG progress bonus (up to +15%).
    *   **CombatSignals**: DPS (+5%) and PEN (+3% per level, max +15%).
    *   **Headroom**: Total max bonus (+35%) allows tactical signals to remain impactful.

### 3. Settlement Outputs
- **Win Outcome**:
    - `Investment.capital` increases by `Stake * PayoutMultiplier`.
    - `RPG.dividends` reward bonus (Optional).
    - Entry added to `contractSettlementHistory` with `status: "won"`.
- **Loss Outcome**:
    - `Investment.capital` decreases by `Stake`.
    - **Consequence**: Temporary "Capital Freeze" (Optional) or loss of RPG run tickets.
    - Entry added to `contractSettlementHistory` with `status: "lost"`.

---

## ⚖️ Economic Guardrails (Horizontal Model)

To maintain the horizontal economy integrity, the following rules must be strictly enforced:

1.  **Dorothy Gate**: Real settlement remains **LOCKED** until `gameState.rpg.normalEndingSeen === true`. 
2.  **Isolation**: Before the God Phase, RPG Dividends cannot be used to bypass Investment Capital requirements.
3.  **Booster Only**: Landlord Cash can boost Investment Capital, but it cannot directly influence the win probability of a Defense Contract. Only RPG stats (derived from effort/time) increase the win rate.
4.  **No Hidden Math**: All probability factors must be visible in the user-facing "Signal Analysis" or "Odds Preview" panel.

---

## 🚀 Implementation Phases

- [x] **Phase A: Probability Helper**: Implement `calculateDefenseContractSuccessChance` using real RPG combat stats.
- [x] **Phase B: Dry-Run Parity**: Update the Dry-Run simulation to use the new probabilistic helper for "Confidence" and "Outcome" previews.
- [x] **Phase C: Real Settlement Integration**: Wire the `settleDefenseContract` handler to use `Math.random()` against the calculated success chance.
- **Phase D: Balance QA**: Tune the Payout vs. Risk ratio to ensure high-tier contracts are rewarding but dangerous.

---

## ❓ Open Questions
- **Payout Destination**: Should the payout go to `investment.capital` (to keep the loop independent) or directly to Global `cash`?
- **Failure Consequence**: Should a loss only take the stake, or should it trigger a temporary cooldown (Capital Freeze) on all trading?
- **RPG Multiplier**: Should winning a contract also grant a temporary buff to RPG Dividends gain?
- **Odds Basis**: Should the contract difficulty be fixed to a Stage Tier (e.g., "Stage 50 Difficulty"), or should it scale dynamically with the player's current stage?

---

## 📝 Status
- **Current Status**: **IMPLEMENTED** (Phases A, B, C).
- **Active Code**: Probabilistic resolution live (Math.random).
- **Unlock Status**: Gated by Dorothy Proposal (Stage 100).
