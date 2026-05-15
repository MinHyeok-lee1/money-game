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
- **Tactical Signals**: Faction synergies and Character rarity bonuses (Phase D-1).

### 2. Probability Bounds
- **Minimum Win Chance**: 5%
- **Maximum Win Chance**: 95%
- **Success Formula (Policy C)**: 
    `WinProb = clamp(BaseOdds + StageSignal + CombatSignals + TacticalSignal, 0.05, 0.95)`
    *   **BaseOdds**: Pure investment risk (30% to 80%).
    *   **StageSignal**: RPG progress bonus (up to +15%).
    *   **CombatSignals**: DPS (+5%) and PEN (+3% per level, max +15%).
    *   **TacticalSignal**: Composition bonuses from Factions and Rarity (up to +12% capped).
    *   **Headroom**: Total max bonus (+47%) ensures even high-risk contracts remain challenging but solvable through tactics.

### 3. Settlement Outputs
- **Win Outcome**:
    - `Investment.capital` increases by `Stake * PayoutMultiplier`.
    - `RPG.dividends` reward bonus (Optional).
    - Entry added to `contractSettlementHistory` with `status: "won"`.
- **Loss Outcome**:
    - `Investment.capital` decreases by `Stake`.
    - **Consequence**: Game Over / Run Collapse (Restart from beginning).
    - Entry added to `contractSettlementHistory` with `status: "lost"`.

---

## 🎨 Phase D-1: Tactical Signal Integration (Design)

To deepen the RPG-Investment linkage, character composition now provides a "Tactical Edge" to specific contracts.

### 1. Faction Mapping
Each Defense Contract is categorized by its underlying asset type, matching a character faction:
- **Realty Faction**: Stability-oriented (Real Estate, Bonds).
- **Ticker Faction**: Market-standard (Index, ETFs).
- **Luxury Faction**: High-payout/Premium (Gold, Art).
- **Shadow Faction**: High-risk/Unstable (Crypto, Dark-market).

### 2. Signal Calculation
- **Faction Bonus**: `+2%` per active character matching the contract faction (Max **+10%**).
- **Rarity Bonus**: 
    - 4-Star Character: `+1%`
    - 5-Star Character: `+2%`
    - (Max total rarity bonus: **+5%**).
- **Tactical Cap**: The combined Faction and Rarity bonus is capped at **+12%**.

### 3. Display Requirements
- **Signal Analysis**: Must break out "Tactical Edge" as a separate line.
- **Dynamic Updates**: Recalculate whenever the active squad or contract selection changes.

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
- **Phase D-0**: Probability formula tuning (decouple base odds) [DONE].
- **Phase D-1: Tactical Integration**:
    - [x] D-1A: Design Spec (Faction/Rarity Mapping).
    - [x] D-1B: Implement `factionSignal` and `raritySignal` helpers.
    - [x] D-1C: Update Signal Analysis UI and Previews.
    - [x] D-1D: Final balance QA and integration.
- **Phase E: Balance & Polish**:
    - [x] Phase E-1: Probability formula audit and PEN signal fix.
    - [x] Phase E-2: Payout vs. Risk ratio tuning and bug fix.
    - [x] Phase E-3: Game Over / Restart foundation implementation.

---

## ❓ Open Questions
- **Payout Destination**: Should the payout go to `investment.capital` (to keep the loop independent) or directly to Global `cash`?
- **Failure Consequence**: Should a loss only take the stake, or should it trigger a Game Over? (Confirmed: Settlement failure triggers Game Over/Restart; Capital Freeze is rejected).
- **Character Eligibility**: Should faction bonuses count only "Active Run" units, or the entire owned roster? (Design decision: **Active Run only** to emphasize squad management).
- **Rarity Scaling**: Should higher rarity characters provide larger bonuses, or should we keep the range tight to prevent rarity-gating?

---

## 📝 Status
- **Current Status**: **IMPLEMENTED** (Phases A, B, C, D-0, D-1, E-3).
- **Active Code**: Probabilistic resolution live (Math.random) with Tactical Signals active.
- **Unlock Status**: Gated by Dorothy Proposal (Stage 100).
