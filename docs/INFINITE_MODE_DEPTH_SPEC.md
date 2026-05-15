# Infinite Mode Depth: Boss & Monster Pattern Design (Phase I-1)

## Vision

Stage 101+ currently scales only via harsher HP growth (1.1^n per stage beyond 100). This creates a smooth difficulty wall but no strategic variety — players simply need "more DPS."

Phase I introduces **monster archetypes** and boss-grade pressure that force diverse stat investment, squad composition choices, and economic integration. The goal: Infinite Mode should feel like an evolving challenge, not a number treadmill.

## Phase I-4A Direction Alignment: Unified Reaper Model

Future Infinite Mode direction is shifting away from a sequence of separate handcrafted bosses at Stage 200/300/500/1000. The preferred fantasy is a single recurring final-monster archetype: a Reaper-like death entity that appears like a normal Infinite Mode monster but carries boss-grade threat.

Working concept names:

| Korean Concepts | English Concepts |
| :--- | :--- |
| 어둠의 사신 | Dark Reaper |
| 죽음의 사신 | Death Reaper |
| 종말의 사신 | Endbringer Reaper |
| 사신 | The Reaper |

The exact name is not locked. The important design is the role: Infinite Mode should feel like an endless confrontation with a death entity that becomes more absurdly dangerous as stages rise.

### Current Completed Infinite Mode Work

- **F-1**: Infinite Mode scaling foundation is active from Stage 101+.
- **I-1**: Infinite Mode boss/monster pattern design spec was created.
- **I-2A**: Stage 101+ archetype foundation and UI panel were implemented.
- **I-2B / I-2D**: Armor Wall, Regenerator, Phantom, Berserker, and Shadow Wraith bounded modifiers were implemented.
- **I-2C / I-2E**: Archetype modifier QA passes confirmed Stage 1-100 compatibility and bounded behavior.
- **I-3A**: Boss milestone placeholder metadata and UI were implemented for Stage 150/200/300/500/1000.
- **I-3B**: Boss milestone foundation QA passed.
- **I-3C**: Stage 150 Iron Sentinel PEN-based boss check was implemented.
- **I-3D**: Iron Sentinel QA passed; later boss milestones remain placeholder-only.

### Reaper Design Principles

- The Reaper appears repeatedly like a normal monster in Infinite Mode.
- It carries boss-grade pressure despite using the regular combat loop.
- It scales brutally with stage so Infinite Mode feels like it is trying to end the run.
- It should not require separate handcrafted boss mechanics at every milestone.
- It should preserve the infinite loop feel rather than becoming a finite boss ladder.
- It should continue to pressure **PEN**, **ACC**, **SPD**, **CRT**, and **ATK** through the existing archetype counter language.
- External Capital should help break pressure points but never erase danger.
- Hero's Fate should remain attractive as an acceleration/risk tool, not a mandatory wall key.

### Boss Milestone Reframing

Stage 150 Iron Sentinel remains as an implemented first experiment and historical prototype for a boss-grade PEN check.

Stage 200 Phantom General, Stage 300 Eternal Hydra, Stage 500 Berserker King, and Stage 1000 The Authority are now **deferred as individual mechanics**. They should not be treated as the immediate implementation path. They may later return as:

- Reaper phases
- Reaper titles
- Reaper masks/forms
- narrative overlays
- milestone warnings

The next design phase should define the unified Reaper model before any more milestone-specific boss mechanics are implemented.

---

## Phase I-4B Reaper Infinite Mode Model Design Spec

### Reaper Core Fantasy

The Reaper is a single recurring death-like entity that turns Infinite Mode into an endless confrontation. It does not need to be a unique boss encounter every time it appears. It can enter the same loop as regular Infinite Mode monsters, but the player should immediately read it as the final threat hiding inside the normal grind.

Core fantasy targets:

- A single recurring entity, not a roster of unrelated bosses.
- Appears repeatedly like a normal monster in Stage 101+.
- Feels like the final boss of Infinite Mode even when it is not using separate boss state.
- Scales brutally as stages increase.
- Represents Infinite Mode itself trying to end the player's run.
- Feels oppressive, inevitable, and increasingly unfair, while remaining mathematically playable.

### Naming Direction

No final name is locked in Phase I-4B. The table below records tone and likely use.

| Candidate | Language | Tone | Best Use Case | Fit |
| :--- | :--- | :--- | :--- | :--- |
| **어둠의 사신** | Korean | Dark, mythic, readable | Main enemy name or form title | Strong final-name candidate |
| **죽음의 사신** | Korean | Direct death fantasy | UI label, warning text, tutorial copy | Clear but less distinctive |
| **종말의 사신** | Korean | Apocalyptic, endgame-heavy | Late-stage title or Stage 1000 overlay | Best for peak threat |
| **무한의 사신** | Korean | Tied directly to Infinite Mode | System label or recurring enemy name | Strong UI/system fit |
| **Dark Reaper** | English | Clean, ominous | Main enemy name | Strong final-name candidate |
| **Death Reaper** | English | Blunt, arcade-like | Early concept label | Clear but slightly generic |
| **Endbringer Reaper** | English | Final-boss, dramatic | High-intensity form title | Strong milestone/title fit |
| **Infinite Reaper** | English | Systemic, mode-specific | UI label, model name | Strong implementation/spec fit |
| **The Reaper** | English | Minimal, iconic | Short UI label or final reveal | Strong if supported by flavor |

### Reaper Form / Mask Model

The deferred milestone bosses become Reaper manifestations rather than separate unrelated enemies.

| Stage | Deferred Name | Reaper Interpretation | Pressure Profile | Design Role |
| :--- | :--- | :--- | :--- | :--- |
| **150** | Iron Sentinel | The Reaper wears an Iron Sentinel mask | **PEN** | Implemented prototype boss-grade penetration check |
| **200** | Phantom General | The Reaper becomes a Phantom General aspect | **ACC** | Accuracy and consistency pressure |
| **300** | Eternal Hydra | The Reaper takes an Eternal Hydra form | **DPS / SPD** | Throughput and regeneration pressure |
| **500** | Berserker King | The Reaper wears a Berserker King mask | **SPD / CRT** | Tempo and burst pressure |
| **1000** | The Authority | The Reaper reveals an Authority aspect | **All stats** | Full economic mastery warning |

These names can function as masks, titles, aspects, milestone warnings, or narrative overlays. They should not force a separate bespoke boss implementation per milestone unless the Reaper model later proves too flat.

### Gameplay Model

Future implementation should fit inside the current Infinite Mode structure:

- Reaper mode activates only after Stage 101.
- The enemy can be selected through existing archetype logic or a small Reaper-specific wrapper around it.
- Boss milestone stages become intensification points, not mandatory separate boss objects.
- Reaper forms can inherit or combine existing archetype pressures: **PEN**, **ACC**, **SPD**, **CRT**, and **ATK**.
- Stage 150 Iron Sentinel remains the first prototype form and should not be undone.
- Regular archetype enemies can still exist; the Reaper should feel like the recurring apex inside that ecosystem.
- No new persistent state is required for the first implementation if form, intensity, and title are deterministic from stage.

Suggested future helper shape:

```js
getInfiniteReaperProfile(stage, archetype, bossMilestone)
```

This should be design guidance only for now. Phase I-4B does not implement it.

### Scaling Model

The global Infinite Mode HP formula should remain intact. Reaper pressure should layer on top through deterministic profiles rather than replacing the base scaling curve.

Suggested future scaling dimensions:

| Dimension | Purpose | Example Direction |
| :--- | :--- | :--- |
| **Reaper intensity tier** | Broad stage-based threat bracket | Tier 1 at 101+, Tier 2 at 200+, Tier 3 at 300+, etc. |
| **Pressure profile** | Which stat pressure is active | PEN, ACC, SPD, CRT, ATK, or mixed |
| **Stat check profile** | How strongly a counter stat recovers damage/output | Bounded multiplier recovery, never zeroing progress |
| **Milestone form** | Presentation and flavor at key stages | Iron Sentinel, Phantom General, Eternal Hydra, etc. |
| **UI threat level** | Player-readable danger summary | "Rising", "Severe", "Run-ending", "Absurd" |

Rules:

- Do not reduce global monster HP scaling.
- Do not create hard locks.
- Do not require new save schema for deterministic form selection.
- Do not make one stat solve every Reaper form.
- Reaper growth should become absurd over time, but still respond to patient economy growth and smart risk-taking.

### UI / UX Direction

The player should understand that the Reaper is both part of the normal Infinite Mode loop and a special existential threat.

Future UI can show:

- Reaper identity label, such as "The Reaper" or "무한의 사신".
- Current form or mask, such as "Iron Sentinel Mask".
- Recommended counter stat.
- Threat warning.
- Milestone warning when approaching 150/200/300/500/1000.
- Flavor such as "The Reaper is adapting."

The UI should stay compact and fit near the existing Infinite Mode archetype / boss milestone panel. It should not become a separate boss screen unless a later phase intentionally creates a larger encounter presentation.

### Hero's Fate Integration

Hero's Fate remains a dangerous acceleration tool:

- Reaper pressure can make Defense Contracts more tempting.
- Contracts should help players break through slow Reaper walls faster.
- Hero's Fate should not be mandatory for every Reaper form.
- Game Over / Restart on failed real settlement remains unchanged.
- Failure should remain catastrophic; Reaper pressure should increase temptation, not remove consequence.

Design intent: the Reaper makes the player ask, "Do I grind safely, or gamble the run to break this wall?"

### External Capital Integration

External Capital remains the main long-term answer to Reaper pressure:

- Landlord property tiers provide stat counters and specialization routes.
- Community property support can help ACC-oriented Reaper forms.
- Enterprise property support can help SPD / throughput forms.
- Authority property and rebirth pressure support PEN / authority forms.
- Investment portfolio specialization supports speed, crit, and faction alignment.
- Broad wealth helps through leverage, but should never fully trivialize the Reaper.

The Reaper should reward diversified economic mastery rather than raw wealth alone.

### Future Implementation Phases

- **Phase I-4C: Reaper Model Data Foundation** — define static Reaper profile/form data and deterministic helper outputs without changing combat behavior.
- **Phase I-4D: Reaper UI Integration** — display Reaper identity, current mask/form, counter stat, and threat level in the RPG UI.
- **Phase I-4E: Reaper Form Modifier Integration** — fold existing archetype pressures into bounded Reaper modifiers, starting conservatively and preserving Stage 1-100 behavior.
- **Phase I-4F: Reaper Balance QA** — verify scaling, caps, Hero's Fate pressure, External Capital relevance, and no hard-lock behavior.

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

## Historical Boss Milestone Plan

This plan records the existing milestone placeholders and the Stage 150 prototype. It is no longer the immediate implementation roadmap for separate Stage 200/300/500/1000 boss mechanics. Future work should reinterpret these names as possible Reaper forms, masks, titles, narrative overlays, or milestone warnings.

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
- **Phase I-3B QA** verified boss milestone metadata/helper/UI gating and confirmed Authority Gate remains combat-neutral.
- **Phase I-3C scope** activates only the Stage 150 Iron Sentinel boss check with bounded PEN-based damage recovery (`0.55 + PEN * 0.45`, capped at 1.0). Later boss milestones remain placeholder-only.
- **Phase I-3D QA** verified the Iron Sentinel modifier is Stage 150-only, stronger than Armor Wall without becoming a hard lock, and does not activate mechanics for Stage 200/300/500/1000.
- **Phase I-4A scope** redirects future Infinite Mode design toward a recurring Reaper enemy model. Stage 200/300/500/1000 individual boss mechanics are deferred.
- **Phase I-4B scope** defines the unified Reaper model fantasy, naming direction, form/mask model, gameplay model, scaling dimensions, UI direction, and future implementation phases.
- **Boss encounters** can be flagged via stage number checks (e.g., `stage === 150`) within the existing combat flow.
- **No new localStorage fields** are required if archetype assignment is deterministic from stage number.

## Next Implementation Phase: I-4C Reaper Model Data Foundation

Phase I-4C should define:

- static Reaper profile/form data
- deterministic Reaper helper behavior
- Stage 101+ activation rules
- milestone form/title mapping
- no combat behavior changes yet

---

## Status

- **Phase I-1**: Design Spec — COMPLETE
- **Phase I-2A**: Monster Archetype Foundation — COMPLETE
- **Phase I-2B**: Armor Wall / Regenerator Combat Modifier Foundation — COMPLETE
- **Phase I-2C**: Armor Wall / Regenerator Balance QA — COMPLETE
- **Phase I-2D**: Phantom / Berserker / Shadow Wraith Combat Modifier Foundation — COMPLETE
- **Phase I-2E**: Remaining Archetype Modifier Balance QA — COMPLETE
- **Phase I-3A**: Boss Milestone Placeholder Foundation — COMPLETE
- **Phase I-3B**: Boss Milestone Foundation QA — COMPLETE
- **Phase I-3C**: Stage 150 Iron Sentinel Boss Mechanic Foundation — COMPLETE
- **Phase I-3D**: Iron Sentinel Boss Mechanic QA — COMPLETE
- **Phase I-4A**: Reaper Direction Alignment — COMPLETE
- **Phase I-4B**: Reaper Infinite Mode Model Design Spec — COMPLETE
- **Phase I-4C**: Reaper Model Data Foundation — NEXT
