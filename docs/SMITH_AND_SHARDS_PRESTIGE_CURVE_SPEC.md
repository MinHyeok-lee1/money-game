# ⚒️ Smith & Shards: Progression Tempo & Prestige Curve Spec

This document establishes the strategic pacing, time-based progression, prestige scaling, and balance boundaries for the **전쟁 대장간 (Smith & Shards)** module inside *자본전선: 데드라인 (Capital Front: Deadline)*. It outlines how a +30 weapon achieves mythic rarity without destroying player motivation or grinder accessibility.

---

## ⏱️ 1. Weapon Progression Tempo (Time & Capital Pacing)

To prevent players from instantly maxing out their gear while keeping progression exciting for active grinders, the tempo is divided into distinct capital and time zones:

### 📈 Pacing & Time Commitments

| Milestone Level | Target Player Tier | Estimated Time to First Reach (Active Grinding) | Expected Capital Cost (CASH & DIV) | Success Chance & Safety State |
| :--- | :--- | :--- | :--- | :--- |
| **+1 ~ +5** | Casual / Early Game | **15 ~ 30 Minutes** | Extremely Low (Under ₩10,000) | **100% Safe Zone** (No loss, high base chance) |
| **+6 ~ +10** | Established Mid-Game | **2 ~ 4 Hours** | Moderate (₩50,000 ~ ₩150,000) | **Safe Zone** (odds scale down; no breakage, minor downgrade chance) |
| **+11 ~ +15** | Advanced Frontline | **1 ~ 2 Days** | High (₩500,000 ~ ₩2,000,000) | **Danger Zone** (Breakage chance starts at $1\%$; odds clamp to $50\%$) |
| **+16 ~ +20** | Elite Squads | **5 ~ 7 Days** | Severe (₩5,000,000 ~ ₩25,000,000) | **Prestige Zone** (Breakage chance scales to $5\%$; success chance under $30\%$) |
| **+21 ~ +25** | Legendary Commander | **2 ~ 3 Weeks** | Astronomical (₩100M+ & Shards) | **Mythic Zone** (Breakage chance scales to $10\%$; success chance under $15\%$) |
| **+26 ~ +30** | Mythic Excalibur | **2 ~ 3 Months** | Colossal (Sunk Cost Peak) | **Sovereign Zone** (Breakage chance scales to $15\%$; success chance clamped to $5\%$) |

---

## 🏆 2. Prestige Curve & Weapon Permanence

A high-enhancement weapon is not just a damage buff; it is a legendary status symbol that should instantly generate prestige.

### 🌟 Visual Aura & Prestige Signatures
- **Visual Aura Expectation**: When a weapon is viewed in the `무기 보관고` (Inventory) or equipped on a character, it displays a distinct aura overlay:
  - **+15**: Subtle crimson glow *(선혈의 제련)*
  - **+20**: Deep neon emerald aura *(사령부 전설)*
  - **+25**: Apocalypse lightning/spark particles *(종말급 결전)*
  - **+30**: Radiant mythic sovereign sunburst glow *(신화적 영광)*
- **Server/UI Announcements**: Reaching +20, +25, and +30 triggers highly rewarding UI banners celebrating the commander's forging success.
- **Weapon Identity Permanence**: High-end weapons allow customized prefix titles (e.g., *“Reaper-Slayer +25 Executer”*), making them memorable artifacts that carry the player's history.

---

## 💔 3. Failure Recovery Tempo (Psychological Bounce-Back)

Upgrading weapons beyond +15 must carry stakes, but a failure should never trigger rage-quitting. The time-to-recovery (TTR) is cushioned by recycling loops:

- **Immediate Retrying Pressure**: Breaking a +18 weapon yields enough **제련 파편 (Refined Shards)** to instantly manufacture 2 Success Stabilizers or purchase 1 High-Tier base weapon box.
- **TTR Curve**:
  - A player who loses a +15 weapon should recover their progression back to a +10 base weapon within **30 minutes of active play**.
  - A player who loses a +20 weapon should be able to secure a +15 weapon within **6 hours of active play** by leveraging their shard recovery payouts.
- **Motivation Safeguard**: Instead of starting from scratch, players pivot to a fortified retry state, where their shard hoarding ensures the *next* attempt has higher odds.

---

## 💎 4. Shard Economy Pressure & Hoarding Psychology

The shard loop introduces complex, tactical decision points:

- **The Stabilizer Dilemma**: *“Do I spend my 50 shards now to increase my +14 weapon's success chance by 5%, or do I save 200 shards to purchase a guaranteed Legendary Epic weapon frame?”*
- **Hoarding Incentive**: Shards have a secondary yield—storing shards in the inventory grants a passive "Forge Mastery" level, slightly lowering overall upgrade Cash costs, driving a delicate balance between spending and hoarding.
- **Circular Salvage**: Stabilizers can never guarantee 100% success at high levels, keeping the pressure high while ensuring that every click is a strategic choice.

---

## 🛡️ 5. Safe Zone & Danger Zone Philosophy

To keep the game fair yet challenging, safety levels are defined by distinct milestones:

- **Level 1 ~ 5 (The Green Zone)**: 100% Safe. Zero chance of downgrade or breakage. Perfect for learning and quick base squad arming.
- **Level 6 ~ 10 (The Amber Zone)**: Downgrades are possible on failure, but weapons **cannot break**. This creates early friction and introduces the concept of protection materials.
- **Level 11 ~ 20 (The Danger Zone)**: Breakage chance emerges ($1\%$ to $5\%$). Standard protection shields (available for Diamonds/Shards) can prevent breakage but cannot prevent downgrades.
- **Level 21 ~ 30 (The Sovereign Zone)**: Ultimate stakes. Protection shields are disabled or require astronomical Diamond costs. Maximum tension, reserved for top-tier achievements.

---

## 🌐 6. Infinite Mode Integration (Power Scaling Boundaries)

Weapons must feel like crucial, wave-deciding assets in Frontline Command RPG battles without completely breaking game balance:

- **Reaper Adaptive Thresholds**: Adapting Reaper entities dynamically analyze the team's weapon DPS. Highly upgraded weapons break boss armor phases faster but trigger faster Reaper phase escalations, keeping combat intense.
- **Non-Linear Scaling**: Weapon power increases non-linearly (e.g., $+20\%$ power per level at high tiers), but monster HP in Infinite Mode scales exponentially, ensuring that a +30 weapon pushes the wave threshold further without making the mode trivially beatable.

---

## ⚖️ 7. Whale vs. Grinder Balance (Fairness Protocols)

To ensure a balanced community dynamic:
- **The Grinder’s Path**: Active players can collect high-tier drops and shards entirely through Frontline wave pushing and daily tasks. Grinders leverage high-volume runs and salvage loops to gradually brute-force upgrades.
- **The Whale’s Path**: Spenders can bypass the time grinding by purchasing supply draws using Diamonds or battle resources. However, **they are subject to the exact same upgrade success percentages on the Anvil**. Cash cannot buy a guaranteed +30 weapon without facing the real danger of shattering, preserving the sheer prestige of mythic items for all players.

---

## 🚫 8. Core Guardrails

Future implementation tasks must strictly adhere to these balance guardrails:
1. **No Instant Max Inflation**: A +30 weapon must remain extremely rare. No shortcuts, premium tickets, or microtransactions may ever grant a guaranteed +30 weapon directly.
2. **Exponential Cost Curves**: CASH upgrade costs must escalate exponentially beyond +15 to naturally prevent infinite clicking inflation.
3. **Pristine Combat Integration**: Changes must never bypass the existing character preference synergetic multiplier formula.

---

## 📊 9. Status & Next Roadmap Actions

This spec represents **Phase J-3C-3: Smith & Shards Weapon Progression Tempo and Prestige Curve Audit**. It works in lockstep with J-3C-2 to establish the mathematical and emotional boundaries that the upcoming Phase J-3D: Weapon Ladder Design Data Spec will formulate into concrete numbers.
