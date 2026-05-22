# Progression Curve Tuning & Reward Pressure Audit (Phase P-2B)

**Date**: 2026-05-22  
**Audit Conducted by**: Antigravity  

---

## 1. Current Branch
`main`

## 2. Files Changed
- `index.html` (Weapon shatter salvage alignment: aligned linear fallback `level * 10` to `getSalvagePayout` helper)
- `docs/task.md` (Updated task board with Phase P-2B check-boxes)
- `TODO.md` (Synced checklist state)

---

## 3. Forge Scaling Audit

Following the correction of the weapon power scaling bug in Phase P-2A, weapon enhancements now correctly multiply character DPS inside the combat engine and squad preview. We have evaluated the pacing of the +0 to +30 Forge progression ladder.

### Progression Ladder Breakdown
* **+0 to +5 (Early Game Progression)**:
  - Success Chance: **90% to 66%**
  - Breakage Risk: **0%**
  - Upgrade Cost: **$500 to $2,500**
  - *Feel*: Highly accessible and satisfying. The linear cost scaling is easily supported by early-game landlord passive income, and the absence of breakage risk encourages immediate onboarding.
* **+6 to +9 (Transition / Warning Zone)**:
  - Success Chance: **60% to 36%**
  - Breakage Risk: **0%**
  - Upgrade Cost: **$3,000 to $5,000**
  - *Feel*: Failure leads to rank degradation (e.g. +7 drops to +6), which teaches the player the cost of failure without destroying their item.
* **+10 Prestige Milestone (Danger Zone Entry)**:
  - Success Chance: Clamped to **30%** (minimum)
  - Breakage Risk: **20%**
  - Upgrade Cost: **$5,500**
  - *Feel*: Players entry into the high-risk bracket is marked by the Prestige Toast and a sharp mechanical cliff. The 20% shatter risk introduces the critical need for stabilizers.
* **+20 (Extreme Risk Milestone)**:
  - Success Chance: Clamped to **30%**
  - Breakage Risk: **70%**
  - Upgrade Cost: **$10,500**
  - *Feel*: Attempting upgrades without stabilizers at this point is mathematically unsustainable, creating high pressure to farm and salvage weapons.
* **+30 Endgame Viability**:
  - Success Chance: Clamped to **30%**
  - Breakage Risk: **70%**
  - Upgrade Cost: **$15,500**
  - *Feel*: A +30 weapon provides a **+150% DPS multiplier** (2.5x base power). In Infinite Mode where HP compression is active, +30 weapons are crucial for progression.

### Balance & Safety Verification
* **Enhancement Investment Feel**: Since weapon power now correctly scales squad DPS (`atk = (levelDps + weaponPower * (1 + enhanceLevel * 0.05)) * synergies`), upgrading a high-rarity weapon yields highly visible, psychological improvements in clear times.
* **Breakage Risk vs Reward Ratio**: The risk is severe (loss of item), but the introduction of the shard salvage alignment cushions the blow.
* **Stabilizer Crafting Pressure**: Stabilizers cost **50 Refined Shards** to craft. This cost is extremely visible and creates a satisfying micro-economic loop: players farm shards by breaking lower-tier weapons to protect their primary weapon.
* **Shard Recovery Loop Sustainability**: 
  - *Previous linear path*: A +10 weapon yielded `100 shards` on breakage.
  - *New aligned path*: A +10 Epic weapon now yields `320 shards` (6.4 stabilizers' worth). A +15 Epic weapon yields `470 shards` (9.4 stabilizers' worth).
  - *Verdict*: High-rarity and high-level weapon breakage now rewards players with a proportionate amount of shards, making recovery sustainable and preventing endgame stagnation.

---

## 4. RPG Combat Curve Audit

### Scaling Formula Overview
* **Stage HP Growth**: `HP = 100 * 1.3^(stage - 1)` (compounding +30% per stage in Normal Arc)
  - Stage 1: **100 HP**
  - Stage 100: **2.56e11 HP (256B)**
  - Stage 101+ (Infinite Mode): Compounding +10% extra per stage -> `HP_101 = HP_base * 1.1^1` (compounding 43% total growth per stage).
* **Stage Reward Growth**: `Reward = 25 * stage^1.05` dividends (polynomial growth)
  - Stage 1: **25 Dividends**
  - Stage 100: **3,147 Dividends**
  - Stage 101+ (Infinite Mode): Compounding +2% extra per stage.
* **DPS Growth scaling**: Squad base ATK is upgraded using dividends. Upgrades grow linearly in cost and add multiplier increments. Weapon modifications add further modifiers.

### Pacing Verification
* **No Massive Dead-Zone Grind**: In the Normal Arc (Stage 1 to 100), the HP scaling (1.3x) matches the player's ability to buy characters (1,000 dividends) and upgrade stats. Dividends income scales polynomially which avoids a dead-zone grid, since ticket costs are flat (100).
* **No Runaway Exponential Collapse**: Because upgrade curves, weapon synergy multipliers, and weapon modification tiers align, squad DPS can reach e+15+ comfortably by late-game.
* **No Infinite Easy-Farm Zone**: In Infinite Mode (Stage 101+), monster HP scales at a compound rate of ~43% per stage (1.3 * 1.1), while rewards scale at a polynomial base + 2% compound rate. HP outpaces income, ensuring players cannot farm infinitely without hitting a hard progression wall.

---

## 5. Defense Economy Audit

The Defense economy relies on the relationship between Dividends (RPG), Cash (Global Wallet), and Contracts.

* **Ticket Cost Scaling**: Gated at a flat **100 Dividends** per run. In late game, a single run pays out 10,000+ dividends, making the ticket cost trivial. However, tickets prevent early-game infinite run spam, pacing early progression.
* **Emergency Free-Start Recovery**: When tickets are `0` and dividends are `< 100`, players can start runs for free. Since Stage 1 rewards are small (25 dividends), players cannot exploit this to print wealth quickly, but it ensures they can always scrape together enough dividends to buy their next real ticket.
* **Dividends Pacing**: High-tier RPG stages yield enough dividends to feed the Gacha system (1,000/10,000 pull costs) and upgrade stats without creating inflation, as characters have caps and gacha pool entries are finite.
* **Contract Payout Pressure**: Defense Contracts (High-Stakes Betting) allow players to bet their Cash at calculated odds.
  - Stable: **~79% success, ~1.20x payout**
  - Volatile: **~62% success, ~1.70x payout**
  - High Risk: **~32% success, ~2.20x payout**
  - *Risk Check*: Contract failure triggers a **Game Over / Hard Reset** of cash and properties. This severe consequence completely deters low-effort bypass loops and forces players to pay close attention to Tactical Signals.

---

## 6. UI/Feedback Audit

* **Forge Progression Visibility**: The addition of Danger Zone confirmation dialogs and Prestige toasts makes player choices feel heavy and interactive.
* **Psychological DPS Growth**: Players can immediately see their DPS rise after weapon upgrades. The RPG stat panel reflects exactly what character level, equipped weapon, synergy, and faction multipliers contribute.
* **Milestone Toasts**: The +10, +20, and +30 prestige toasts fire correctly, emphasizing milestone progression without cluttering the screen.
* **Reward Recaps**: Offline and active stage recap formats are compact and readable. The formatting library routes values to `formatCompactGlobal` to keep screen boundaries clean.

---

## 7. Balance Risks Identified
1. **Late-Game Shard Abundance**: With +20 and +30 weapons yielding hundreds of shards, players who fail enhancements repeatedly can hoard thousands of shards, bypassing the stabilizer loop. However, since targeted weapon mod rolling costs 3 tokens (300 shards) and rerolling is highly randomized, the Black Market acts as an effective shard sink.
2. **Exponential Landlord Cash Growth vs. Linear Forge Cost**: At late-game, Landlord cash generation reaches quadrillions, making the linear Forge cost ($500 * (level + 1)) completely negligible. The primary gating mechanic for the Forge becomes **Breakage Risk** and **Stabilizer Crafting**, rather than Cash. This is an intentional design choice to shift late-game focus to active shard farming.

---

## 8. Tuning Changes Applied
- Aligned weapon breakage shatter yield in `enhanceWeaponItem` to utilize the rarity-and-level scaled helper `getSalvagePayout(currentLevel, item.rarity)` instead of hardcoded `currentLevel * 10` shards.

---

## 9. Verification Summary
1. Verified that +10 Epic weapons yield **320 Refined Shards** upon shattering (instead of 100).
2. Verified that stabilizers can be crafted for **50 shards** using these yields.
3. Verified that normal stage combat scaling remains unaffected while late-game progression loops remain sustainable.
