# 결전의 사선 (The Duel of Fates) - 1:1 Duel Data Model Proposal

This document outlines a design proposal for the upcoming **결전의 사선 (The Duel of Fates)** 1:1 Duel Prediction system in *자본전선: 데드라인 (Capital Front: Deadline)*. 

> [!NOTE]
> This is a **documentation-only proposal** and does not modify active game mechanics, settlement equations, or initial game states.

---

## 1. Purpose

The **결전의 사선 (The Duel of Fates)** system is designed to:
- Deepen the **Rear Commander** fantasy by introducing high-stakes, localized tactical decisions.
- Bridge gameplay loops across core modules: market prediction (**히어로즈 페이트**), weapon enhancement (**스미스 앤 셔드**), wave defense progression (**전선 지휘부**), and strategic meta-progression (**프론티어 마스터**).
- Establish a balanced progression loop where prediction wins directly affect allied hero capabilities in battle, and defense wave milestones in **전선 지휘부** alter market forecast odds.
- Introduce dark-fantasy tactical depth with two-sided predictions (**영웅 생존 / 영웅 사망**).

---

## 2. Player Fantasy

As a Rear Commander observing frontline engagements from the bunker:
1. **The Tactical Encounter**: The player monitors a high-fidelity 1:1 duel at the vanguard between an Allied Hero and an apocalyptic Enemy Threat.
2. **Examples**:
   - **Tactical Archer Hero** vs. **Orc Berserker General**
   - **Iron Knight Guardian** vs. **Dimensional Behemoth**
   - **Shadow Assassin Guildmaster** vs. **Avatar of the Reaper**
3. **The Prediction**: Rather than making abstract investments, the commander allocates military funds based on combat diagnostics to predict:
   - `🛡️ 영웅 생존 / 방어 성공`: The hero prevails, secures the zone, and returns safely.
   - `💀 영웅 사망 / 방어 실패`: The hero is defeated, the defensive line collapses, and the capital stake is lost.
4. **The Vibe**: Strategic, calculated, and high-tension. Every choice carries irreversible risk to the war budget.

---

## 3. Current System Boundaries

The current stable code implements Phase J-2E with the following strict constraints:
- **Survival Prediction Cards**: Active and styled vertically mapping Vanguard/Archer/Raid scenarios.
- **Bet Slip Panel**: Active and simplified with quick budget ratios (`25%`, `50%`, `최대 기금`).
- **Fate Log Panel**: Active with visual cards distinguishing Real Outcomes (`결정적 결과`) from Simulated Outcomes (`가상 결과`).
- **One-Sided Gating**: Players predict allied survival (`영웅 생존`). Death-side betting (`영웅 사망`) and hero attributes (`영웅력` / `서사력`) are **not yet active**.
- **Pristine Formulas**: Combat math, payout scales, and validation rules remain completely unchanged.

---

## 4. Future Duel Data Model

To ensure seamless future updates, duels will be managed via a clean, non-breaking object model that integrates with the existing `INVESTMENT_ASSETS` arrays:

```typescript
interface DuelScenario {
  id: string;                 // Unique tactical scenario identifier
  title: string;              // Thematic name of the combat front
  alliedHero: {
    id: string;               // Allied hero identifier
    name: string;             // Name (e.g. "돌격대장 휴이")
    rarity: string;           // Normal, Rare, Epic, Mythic
    faction: string;          // Royal Vanguard, Tactical Archer, Shadow Guild
    role: string;             // Tanker, DPS, Assassin
  };
  enemyThreat: {
    id: string;               // Enemy threat identifier
    name: string;             // Name (e.g. "오크 광전사 기습 돌격대")
    tier: string;             // Hazard, Threat, Catastrophe
    archetype: string;        // Berserker, Sentinel, Colossus
  };
  baseSurvivalChance: number; // Raw success rate before modifiers (e.g. 0.65)
  volatilityMod: number;      // Random fluctuation amplitude (e.g. 0.05)
  rewardMultiplier: {
    survival: number;         // Payout multiple on survival success (e.g. 1.5)
    death: number;            // Payout multiple on death prediction success (e.g. 2.5)
  };
}
```

> [!IMPORTANT]
> This schema is a design-only reference. It is **not added** to the active `INITIAL_GAME_STATE` during this phase.

---

## 5. Hero Inputs (Allied Side)

Future modifications will allow the following hero parameters to dynamically boost prediction success chances:
- **Hero Rarity & Faction Bonuses**: Synergies between currently active factions.
- **Weapon Enhancement Level**: Directly pulled from **스미스 앤 셔드** (e.g., a `+15 Knight Claymore` boosts base survival rate by `+15%`).
- **Weapon Tier**: Legendary or Mythic weapons unlock exclusive defensive skill signatures.
- **Frontline Command Deployed Strength**: Deployed tower upgrades and defense unit alignments in **전선 지휘부** supply local backing, increasing the hero's defensive coverage.
- **External Capital Leverage**: Meta-progression nodes that permanently scale defense effectiveness.

---

## 6. Enemy Inputs (Hostile Side)

Hostile attributes will scale difficulty and volatility dynamically:
- **Threat Tier**: Catastrophe-class threats lower allied survival odds while exponentially scaling payout structures.
- **Wave / Stage Progression**: Higher stages and wave density inside the wave defense engine in **전선 지휘부** increase enemy combat stats, reducing base survival odds.
- **Reaper Volatility Pressure**: Deeper infinite levels trigger active environment mutations that add random volatility mods.
- **Special Hazard Tags**: Status effects (e.g., `Fire Hazard`, `Shield Pierce`) that degrade specific hero roles (e.g., reducing tank survival odds).

---

## 7. Prediction Sides

Once implemented, the duel interface will support two distinct prediction sides:

### A. 영웅 생존 (Allied Victory)
- **Commander Goal**: Bet on the hero's survival and defensive success.
- **Odds Dynamics**:
  - High survival chance = lower payout (safer option).
  - Low survival chance = high payout (clutch victory).
- **Thematic Reward**: Gain standard CASH and allied combat prestige.

### B. 영웅 사망 (Allied Defeat)
- **Commander Goal**: Bet that the hero will perish or the defensive wall will crumble.
- **Odds Dynamics**:
  - High survival chance = massive payout (betting on a rare tragic collapse).
  - Low survival chance = low payout (predicting an inevitable defeat).
- **Fantasy Vibe**: Represents a cold, pragmatic commander capitalizing on tactical failure to recoup war budgets.
- **Gating**: Death-side betting is strictly future-only. It is **not approved** for immediate implementation. Any future implementation requires:
  1. A separate state proposal.
  2. Clear UI affordance approval.
  3. A focused settlement safety audit.
  4. A detailed Game Over consequence review.

---

## 8. Reward Concepts (Future System)

Winning a prediction will distribute dual rewards to fuel the loop:

```mermaid
graph TD
    A[Prediction Win] --> B[CASH Payout]
    A --> C[Heroic Might / 영웅력]
    A --> D[Narrative Momentum / 서사력]
    
    B --> E[Spends in Smith & Shards]
    C --> F[Boosts Combat DPS in Frontline Command]
    D --> G[Unlocks High-Tier Legendary Duels]
```

### A. CASH Payout
- Immediate liquidity to purchase shards, upgrade gears, or scale active command posts.

### B. 영웅력 (Heroic Might)
- A non-tradeable meta-statistic representing combat coordination.
- **Effect**: Directly multiplies allied towers' base physical damage and attack speeds inside the wave defense engine in **전선 지휘부**.

### C. 서사력 (Narrative Momentum)
- Represents strategic fortune and battlefield prestige.
- **Effect**: Accelerates rare drop occurrences in **스미스 앤 셔드** and unlocks Mythic-tier duel scenarios with high-multiplier payouts.

---

## 9. Failure Concepts

Losing a prediction will trigger immediate localized consequences:
- **Loss of Stake**: The allocated war capital (`CASH`) is completely wiped out.
- **Frontline Collateral Pressure**: The defensive gate suffers structural damage, causing an immediate wave density spike in the defense rounds in **전선 지휘부**.
- **Hero Recovery Timeout**: The defeated hero goes into recovery mode, disabling their specific card for a set duration.
- **Catastrophic Failure**: Extreme failures risk breaching the core command post, triggering the standard **Game Over** flow.

---

## 10. Formula Direction

Future calculation formulas will adhere to strict mathematical principles to prevent visual inflation or game-breaking loops:
1. **Bounded Probability**: Success odds will always be clamped between `10%` and `90%`, ensuring no absolute sure-wins or impossible fights occur.
2. **Payout Scale**: Payout multipliers will be calculated as a direct inverse function of odds:
   $$\text{Payout} = \frac{1}{\text{Odds}} \times (1 - \text{House Edge}) \times \text{Commander Buffs}$$
3. **No Hidden Math**: All modifiers (tactical bonus, build alignment, weapon enhancements) must be rendered as clean percentages in the Bet Slip, ensuring total transparency.

> [!IMPORTANT]
> **No final survival or payout formula is approved in this proposal.** Any formulas shown here are illustrative only and must not replace existing Defense Contract formulas without a dedicated implementation and balance QA phase. The existing Defense Contract formulas remain the absolute source of truth until a separate balance phase is formally approved.

---

## 11. Future Implementation Phases

To execute the Duel of Fates development safely, the following phased track is proposed:

| Phase | Milestone Name | Scope |
|---|---|---|
| **J-2G** | **Duel Scenario Data Spec** | Draft static mock JSON arrays of combat scenarios inside a separate design spec. **No gameplay logic or active duel betting is implemented.** |
| **J-2H** | **Duel Preview UI Mock** | Add a disabled/preview-only 1:1 Duel visual container inside the tab to capture visual feedback. |
| **J-2I** | **Duel Prediction State Proposal** | Design state migrations, mapping schemas for `selectedSide`, and local storage version buffers safely. **No active code updates are approved.** |
| **J-2J** | **Duel Settlement Prototype** | Implement the full state transitions, payout resolutions, and visual battle animations strictly under prototype scope and **only after explicit approval.** |

---

## 12. Save Schema Guardrails

To prevent breaking existing user save files:
- **No Active Mutations**: No modifications to the active structure of `"moneyGameUniverseStateV1"` are permitted in Phase J-2F.
- **Future State Abstractions**: Future schema locations for new parameters must be decided in a separate migration proposal. Candidate locations include a Hero's Fate-specific branch, a global meta branch, or an existing module branch, but this proposal (J-2F) does not approve any persistent field. No placeholder fields should be added until UI and calculations are fully finalized.
- **No Unused Keys**: Avoid injecting placeholder variables into local storage until calculations and settlement logic are fully integrated.

---

## 13. Relationship to Existing Systems

The Duel of Fates completes the macro-system integration of *자본전선: 데드라인*:

| Target Module | Integration Vector | Fantasy Connection |
|---|---|---|
| **히어로즈 페이트 (Hero's Fate)** | Host tab for the 1:1 prediction UI, slip calculations, and log records. | The commander's strategic command deck. |
| **스미스 앤 셔드 (Smith & Shards)** | Weapon upgrades directly increase allied hero survival odds. | Supply lines crafting epic armaments for frontline heroes. |
| **프론티어 마스터 (Frontier Master)** | Directs meta-progression, capital taxation, and passive commander buffs. | Reclaiming sectors, unlocking resources, and setting global commander tax policies. |
| **전선 지휘부 (Frontline Command)** | Stage milestones unlock legendary bosses; deployed towers supply backup; hero might buffs physical tower DPS. | Live defensive wave battles (summon, place, merge) supported by active tactical combat units. |

---

## 14. Open Questions

Before proceeding to Phase J-2G, the following strategic questions require feedback:
1. **Permadeath Risk**: Should a hero's defeat result in permanent card loss, or purely trigger a recovery timer?
2. **Double-Bet Gating**: Should players be allowed to place opposite predictions on the same duel, or must they commit to a single outcome per wave?
3. **Weapon Breakage Mod**: Should a weapon breaking event in **스미스 앤 셔드** instantly degrade ongoing duel survival odds, or affect only future encounters?
4. **Reaper Interference**: Should Stage 100+ Reaper mutations dynamically scramble active duel signal monitors during active betting?
