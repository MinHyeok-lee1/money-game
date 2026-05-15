# Infinite Mode Depth: Boss & Monster Pattern Design (Phase I-1)

## Vision

Stage 101+ currently scales only via harsher HP growth (1.1^n per stage beyond 100). This creates a smooth difficulty wall but no strategic variety — players simply need "more DPS."

Phase I introduces **monster archetypes** and **boss milestones** that force diverse stat investment, squad composition choices, and economic integration. The goal: Infinite Mode should feel like an evolving challenge, not a number treadmill.

---

## Monster Archetypes (Stage 101+)

Starting from Stage 101, regular waves mix in specialized monsters alongside standard HP-scaled enemies. Each archetype is hard-countered by a specific stat, creating build pressure across multiple upgrade paths.

| Archetype | Behavior | Counter Stat | Design Intent |
| :--- | :--- | :--- | :--- |
| **Armor Wall** | Extremely high effective HP via damage reduction. Flat damage is absorbed. | **PEN** | Forces PEN investment. Players who dump everything into ATK hit a wall. |
| **Phantom** | High evasion rate. Attacks frequently miss. | **ACC** | Forces ACC investment via Community-tier Real Estate specialization. |
| **Regenerator** | Regenerates HP each tick. Must be killed quickly or it fully heals. | **SPD + DPS** | Forces SPD investment and raw throughput. Punishes slow, heavy-hit builds. |
| **Berserker** | Enrage timer. Deals increasing "pressure damage" the longer it lives. | **SPD + ATK** | Forces burst speed. Creates urgency rather than passive idle waiting. |
| **Shadow Wraith** | Volatile: randomly absorbs or reflects a portion of damage each tick. | **CRT + ATK** | Forces critical-hit builds that punch through unpredictable defenses. |
| **Standard** | No special mechanic. Pure HP scaling as currently implemented. | **ATK (general)** | Baseline filler between specialized enemies. |

### Spawn Rules (Design Intent)

- **Stage 101–149**: Waves are mostly Standard, with 1-in-5 chance of a single archetype enemy per wave.
- **Stage 150–199**: Archetype enemies appear regularly (2-in-5). Mixed waves become common.
- **Stage 200–299**: Every wave includes at least one archetype. Dual-archetype waves begin.
- **Stage 300+**: Pure archetype waves. Standard enemies become rare.
- **Stage 500+**: Elite variants of archetypes (higher stat thresholds to counter).

---

## Stat Counter Mapping

Each RPG stat has a primary role and a secondary utility against archetypes:

| Stat | Primary Counter | Secondary Utility | Current Source |
| :--- | :--- | :--- | :--- |
| **ATK** | Standard HP pressure | Base damage vs all types | atkLevel upgrade, Leverage (wealth), Specialization (Foundation RE) |
| **PEN** | Armor Wall (bypass damage reduction) | Hero's Fate signal (+3%/level, max +15%) | penLevel upgrade, Leverage (rebirths), Specialization (Authority RE) |
| **ACC** | Phantom (reduce miss rate) | Consistency vs all types | Base 95%, Specialization (Community RE) only |
| **SPD** | Regenerator, Berserker (kill speed) | DPS multiplier vs all types | spdLevel upgrade, Leverage (liquidity), Specialization (Enterprise RE) |
| **CRT** | Shadow Wraith (burst through volatility) | Spike damage vs all types | Base 5%, Leverage (portfolio cost basis), Character rarity roster |

### Key Observation: ACC Gap

ACC currently has no upgrade path — it is only boosted by Community-tier Real Estate specialization (max +2%) on top of the 95% base. Phantom enemies create demand for ACC investment, which means:

- Players must invest in Community-tier properties (Coffee Shop, Cyber Cafe) to reach the ACC needed for Phantom-heavy stages.
- This creates a natural economic pressure that ties Landlord progression to RPG performance.
- Future phases may introduce an ACC upgrade (divLevel or similar), but Phase I-1 intentionally leaves ACC scarce to make Phantoms a meaningful gate.

---

## Boss Milestone Plan

Boss encounters appear at fixed stage milestones. Each boss tests a specific combination of stats and economic progression, functioning as a "skill check" gate.

### Stage 150 — The Iron Sentinel (Armor Wall Boss)

| Aspect | Detail |
| :--- | :--- |
| **Archetype** | Armor Wall (extreme damage reduction) |
| **Stat Check** | PEN ≥ 15-20% to deal meaningful damage |
| **Economic Signal** | Players who ignored penLevel upgrades hit a wall. Rebirths (PEN leverage) become valuable. |
| **Hero's Fate Link** | Winning a Defense Contract before Stage 150 provides capital for rebirth cycles, boosting PEN via leverage. |
| **Design Intent** | First "you need more than ATK" moment. Teaches PEN importance. |

### Stage 200 — The Phantom General (Evasion Boss)

| Aspect | Detail |
| :--- | :--- |
| **Archetype** | Phantom (very high evasion, ~40% miss rate without ACC investment) |
| **Stat Check** | ACC ≥ 97-98% to maintain reliable damage output |
| **Economic Signal** | Community-tier Real Estate specialization becomes critical. Players must diversify property portfolio. |
| **Hero's Fate Link** | Capital from contracts funds property purchases. Landlord cash boosting accelerates RE acquisition. |
| **Design Intent** | Forces Landlord engagement. Players who only play RPG + Investment hit an accuracy wall. |

### Stage 300 — The Eternal Hydra (Regenerator Boss)

| Aspect | Detail |
| :--- | :--- |
| **Archetype** | Regenerator (massive HP regen per tick, must be out-DPSed) |
| **Stat Check** | totalDps must exceed regen threshold. Requires strong ATK + SPD + Leverage bonuses. |
| **Economic Signal** | Total wealth leverage (ATK bonus) and liquidity leverage (SPD bonus) both matter. Diversified economy required. |
| **Hero's Fate Link** | High-risk contracts offer capital windfalls that can break through the DPS threshold faster. Risk-reward decision point. |
| **Design Intent** | First "whole economy" check. No single module solves it alone. |

### Stage 500 — The Berserker King (Speed Pressure Boss)

| Aspect | Detail |
| :--- | :--- |
| **Archetype** | Berserker (escalating pressure damage, must be killed within time window) |
| **Stat Check** | High SPD and burst damage. CRT becomes valuable for spike windows. |
| **Economic Signal** | Enterprise-tier RE (SPD specialization) + Investment portfolio (CRT leverage) + Growth stock exposure (Ticker faction). |
| **Hero's Fate Link** | Players may need to risk high-payout contracts to fund the economic empire needed for this stat spread. Meme Coin contracts become tempting despite Game Over risk. |
| **Design Intent** | Deep endgame gate. Tests broad economic diversification and willingness to take Hero's Fate risks. |

### Stage 1000 — The Authority (Multi-Phase Boss)

| Aspect | Detail |
| :--- | :--- |
| **Archetype** | Authority Gate: cycles through all archetype phases |
| **Stat Check** | All stats must be above threshold. No single weakness allowed. |
| **Economic Signal** | Complete economic mastery: maxed properties, diversified portfolio, high rebirth count, faction alignment. |
| **Hero's Fate Link** | Contract settlement history and capital reserves become a measure of player's risk management skill over the entire run. |
| **Design Intent** | Ultimate Infinite Mode test. Not a hard lock — just extremely demanding. Players who reach this have mastered all systems. |

---

## External Capital Integration

Each economic module should create a distinct advantage against specific archetypes:

### Landlord (Real Estate)

| RE Tier | Stat Provided | Archetype Countered | Pressure Created |
| :--- | :--- | :--- | :--- |
| Foundation (T1-3) | ATK stability | Standard | Early game baseline |
| Community (T4-5) | ACC | **Phantom** | Mid-game diversification |
| Enterprise (T6-7) | SPD | **Regenerator, Berserker** | Late-game speed pressure |
| Authority (T8-9) | PEN | **Armor Wall** | Late-game penetration |
| Frontier (T10) | Pressure Breaker | All (Stage 101+ DMG) | Endgame multiplier |

### Investment Portfolio

| Asset Type | Stat Provided (via Leverage/Specialization) | Archetype Countered |
| :--- | :--- | :--- |
| Blue-Chip (low vol) | Stable CRT via portfolio cost basis | **Shadow Wraith** (consistent crits) |
| Growth (mid vol) | SPD via Ticker faction bridge | **Regenerator, Berserker** |
| Meme/Crypto (high vol) | CRT via Shadow faction bridge | **Shadow Wraith** (burst through volatility) |
| Total Net Worth | Luxury faction synergy | General power amplification |

### Hero's Fate / Defense Contracts

| Scenario | Risk Profile | When Attractive |
| :--- | :--- | :--- |
| Stable contract before Stage 150 | Low risk (79% base), small payout | Safe capital accumulation for PEN leverage |
| Volatile contract at Stage 200 wall | Mid risk (62% base), mid payout | Funding property purchases for ACC specialization |
| High-risk contract at Stage 300+ wall | High risk (32% base), high payout | Desperate capital injection to break DPS threshold |
| Repeated safe contracts | Grinding pattern | Steady wealth accumulation for Leverage bonuses |
| Single high-risk gamble | All-or-nothing | "Break through the wall or Game Over trying" |

**Design Rule**: Hero's Fate should never be *required* to pass a boss. It should *accelerate* progress. A patient player who grinds Landlord income and safe contracts should eventually pass every gate. A risk-taker can skip weeks of grinding with one high-risk contract — but risks losing everything.

---

## Balance Constraints

1. **Infinite Mode must remain infinite.** No boss is a hard lock. Every gate can be passed with sufficient time investment. Boss HP follows the same 1.1^n scaling — they are difficulty spikes, not permanent walls.

2. **No single stat solves all enemies.** Archetype diversity forces distributed stat investment. A player who max-dumps ATK will stall at Phantom stages. A player who only builds PEN will struggle against Regenerators.

3. **External Capital helps but doesn't trivialize.** Leverage and Specialization bonuses use logarithmic/square-root scaling with hard caps. Even maxed economic bonuses should leave the highest stages (500+) challenging.

4. **Hero's Fate accelerates but remains dangerous.** The Game Over consequence ensures contracts are never a free lunch. High-risk contracts at 32% base odds mean roughly 1-in-3 chance of total wipe, even with full tactical optimization.

5. **Archetype difficulty scales with stage.** A Phantom at Stage 150 might have 30% evasion. A Phantom at Stage 500 might have 50% evasion. The counter stat threshold rises, preventing players from "solving" an archetype once and ignoring it forever.

6. **Boss milestones are spaced logarithmically.** 150, 200, 300, 500, 1000 — the gaps widen, giving players more time to prepare for each successive gate. This matches the exponential cost curves of stat upgrades.

7. **Squad composition matters.** Faction alignment (Realty, Ticker, Shadow, Luxury) should influence effectiveness against specific archetypes in future implementation, connecting Gacha/Enhancement investment to combat performance.

---

## Implementation Notes (For Future Phases)

This spec defines *design intent* only. Implementation considerations:

- **Monster archetype data** is defined as `INFINITE_MONSTER_ARCHETYPES`, a static lookup table with translation keys for name, description, and counter stat.
- **Spawn logic** is handled by `getInfiniteMonsterArchetype(stage)`, a pure function of stage number; no new persistent state is required.
- **Phase I-2A scope** is display/foundation only: Stage 101+ shows deterministic archetype information in the RPG UI.
- **Phase I-2B scope** activates only two bounded modifiers: Armor Wall damage reduction (`0.65 + PEN * 0.35`, capped at 1.0) and Regenerator healing (`1.5%` max HP per combat tick).
- **Phase I-2C QA** verified that these modifiers are Stage 101+ only, neutral for Stage 1-100, bounded against zero/negative/over-max HP outcomes, and do not add save schema.
- **Phase I-2D scope** activates bounded deterministic pressure for Phantom (`ACC`), Berserker (`SPD`), and Shadow Wraith (`CRT`) without random miss, timer, or crit-roll state.
- **Phase I-2E QA** verified that Phantom, Berserker, and Shadow Wraith are bounded, Stage 1-100 neutral, and Authority Gate remains display-only. Phantom is intentionally mild with the current high ACC baseline and may need future tuning if it feels invisible.
- **Phase I-3A scope** adds static boss milestone metadata and a compact RPG UI panel for Stage 150/200/300/500/1000. Authority Gate combat mechanics remain neutral.
- **Boss encounters** can be flagged via stage number checks (e.g., `stage === 150`) within the existing combat flow.
- **No new localStorage fields** are required if archetype assignment is deterministic from stage number.

---

## Status

- **Phase I-1**: Design Spec — COMPLETE
- **Phase I-2A**: Monster Archetype Foundation — COMPLETE
- **Phase I-2B**: Armor Wall / Regenerator Combat Modifier Foundation — COMPLETE
- **Phase I-2C**: Armor Wall / Regenerator Balance QA — COMPLETE
- **Phase I-2D**: Phantom / Berserker / Shadow Wraith Combat Modifier Foundation — COMPLETE
- **Phase I-2E**: Remaining Archetype Modifier Balance QA — COMPLETE
- **Phase I-3A**: Boss Milestone Placeholder Foundation — COMPLETE
- **Phase I-3B**: Boss Milestone Combat Mechanics — NOT STARTED
- **Phase I-4**: Balance QA — NOT STARTED
