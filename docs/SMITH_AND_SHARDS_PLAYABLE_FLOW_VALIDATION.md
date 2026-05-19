# 🧪 Smith & Shards: Playable Weapon Loop UX Validation Audit

This document delivers a brutal, player-facing UX audit and flow validation for the **스미스 앤 셔드 (Smith & Shards)** module for *자본전선: 데드라인 (Capital Front: Deadline)*. It simulates the cognitive load, dopamine timing, mobile reachability, and failure modes of a first-time player before downstream implementation work begins.

---

## 🎯 1. First-Time Player Experience Simulation

Imagine a new commander unlocking the **전쟁 대장간 (War Forge)** tab for the first time. They have no access to a wiki, tutorials, or dev notes.

### 👁️ What They See First
- A weathered, industrial bunker panel labeled **스미스 앤 셔드 (Smith & Shards)**.
- A card drawer filled with weapon icons.
- A massive, warning-striped anvil button labeled **`⚒️ 모루 타격 (Strike Anvil)`**.
- A notice banner displaying upcoming updates.

### ❓ Major Friction & Confusion Risks
1. **The Funding Dilemma**: The player sees two currencies: 전투 배당금 (DIV) and 전쟁 자금 (CASH). The UI must make it instantly obvious that **DIV is spent to draw weapons**, whereas **CASH is spent to strike the anvil**. 
2. **Equip Ambiguity**: The player draws a weapon. How do they put it on a soldier? If the weapon card does not clearly display a preferred hero tag (e.g. *“Preferred: Sniper”*), the player will suffer cognitive lag trying to match the weapon to their squad.
3. **Black Market Visibility**: If the liquidation options are hidden deep inside sub-menus, players will feel stuck with duplicates, leading to inventory frustration.

---

## 🔁 2. Core Gameplay Loop Validation

```
[Get Weapon] ──► [Inspect Dossier] ──► [⚒️ Anvil Strike] ──► [Shatter Fail] ──► [Circular Salvage]
    (DIV)          (Affinity Match)        (CASH spent)        (Danger zone)      (Refined Shards)
```

| Loop Step | Target Emotional State | Dopamine Trigger & Metric | Cognitive / Confusion Risk |
| :--- | :--- | :--- | :--- |
| **1. Get Weapon** | Anticipation | **The Crate Opening Reveal**: Spawning standard vs Epic weapon frames. | High noise if stats are overly complex. |
| **2. Inspect** | Ownership & Pride | **Synergy Match**: Seeing green $+20\%$ bonding multipliers. | Unclear how to bond/lock the weapon. |
| **3. Enhance** | Risk & Greed | **Hammer Strike Sound**: Clang clangs and spark particles. | Forgetting to add stabilizer additives. |
| **4. Shatter** | Loss Aversion | **Shatter Shock**: Solid red warning colors and sirens. | Feeling cheated if success odds are hidden. |
| **5. Salvage** | Relieved Progression | **Shard Explosion**: Particles flying into the shard bar. | Feeling that shards are worthless. |

---

## ⏱️ 3. The "3-Second Understanding" Test

Can a player understand the core panel state in under **3 seconds** of visual inspection?

```
+-------------------------------------------------------+
| ⚙️ SUCCESS: 45%                  ⚠️ SHATTER DANGER: 5% |  <-- (1.5s: Instant risk awareness)
|                                                       |
|                  [ ⚔️ SABER +14 ]                     |
|                                                       |
|             [⚒️ 모루 타격 (STRIKE ANVIL)]              |  <-- (0.5s: Immediate primary call-to-action)
+-------------------------------------------------------+
```

- **Main Click Point**: The prominent, dark metallic **`⚒️ 모루 타격`** button. **PASS.**
- **The Core Threat**: Standard-issue red danger bars clearly displaying `⚠️ 장비 파괴 확률: 5%`. **PASS.**
- **Identified Failure Point**: If the *Success Stabilizer slot* is not highlighted with neon borders, players will click upgrade without utilizing their protective shards, resulting in accidental weapon shattering.

---

## 🎒 4. Inventory Overload Audit (Anti-Clutter Protocol)

As players farm waves in Infinite Mode, their supply calls will yield massive numbers of duplicate weapons, risking inventory paralysis.

### 🛡️ Simplification Safeguards
- **Maximum 2 Main Combat Stats**: Weapons must only display **ATK (공격력)** and **PEN (관통력)**. Secondary modifiers (e.g. Crit, Speed) are compiled into a singular, clean percentage buff, keeping cards readable.
- **Bulk Dissolving (일괄 파편화)**: A prominent top-bar button allowing players to scrap all unenhanced Common and Uncommon weapons for shards in a single tap.
- **Dossier Compression**: In inventory lists, weapon cards collapse into clean, standard square grids showing only Level, Rarity, and Equip states. Full dossier logs are reserved for active inspection popups.

---

## 📱 5. Mobile UX Failure Audit

Many web apps fail on mobile due to visual crowding and poor touch targets:
- **Thumb Reach Target**: The **`⚒️ 모루 타격`** key must reside in the bottom $30\%$ of the screen. Actioning upgrades with standard top-aligned buttons forces uncomfortable two-handed play.
- **Text Density Risk**: Small font sizes (under `11px`) on weapon dossier descriptions will render the history logs unreadable on standard iPhone/Android viewports. Logs must use spacious line heights (`leading-relaxed`) and scroll containers.
- **Accidental Clicks**: Danger Zone upgrade buttons must require a double-tap or a brief hold to prevent players from accidentally shattering their +20 legendary relics.

---

## 🛡️ 6. Weapon Attachment Validation

Will players *actually* remember their weapons, or will they treat them as disposable trash?

- **Attachment Builders**:
  - **Dynamic Epithets**: A weapon named *"Reaper-Touched Saber"* creates a narrative bond.
  - **Survival Milestones**: Knowing a weapon survived three consecutive $10\%$ shatter risks creates absolute psychological attachment.
- **Attachment Destroyers**:
  - **Power Saturation**: If Epic weapon drops are too common, players will instantly trash their existing refined Common weapons, trivializing the entire forge. **Rarity scaling must remain strict.**

---

## 💥 7. Destruction Dopamine Validation

Upgrading past +10 must feel dangerous. However, to prevent players from rage-quitting:
- **Tension vs. Relief**: The solid red screen warning and klaxon alarms create localized stress.
- **The Payoff**: The broken shards do not feel like raw trash; they fly across the screen as glowing cyan particle elements. This makes players feel like they have converted a failed gamble into future success stabilizers, preserving positive motivation.

---

## 💎 8. Shard Loop Strategic Pacing

Shards must act as a crucial strategy pillar rather than generic secondary gold:
- **High-Level Protective Shields**: Shards are stored to buy shields for $+15$ weapons.
- **Forge Mastery**: Passive CASH discounts for hoarding shards create a meaningful strategic dilemma between spending and saving.

---

## 🏪 9. Black Market Narrative Authenticity

To maintain the gritty capitalistic theme, selling duplicate weapons must avoid standard "vendor sells":
- **Wartime Scrap Liquidations**: Duplicates are sold to dirty brokers who pay immediate **CASH** to help fund the player’s active anvil runs.
- **PRESTIGE auctions**: High-survival named weapons are traded on dynamic bidding boards, creating real capitalistic value.

---

## 🚫 10. UI Simplicity Constraints

Downstream implementation must strictly respect these layout constraints:
1. **Max Visible stats**: Clamped to **2** (ATK/PEN).
2. **Primary Buttons**: Clamped to **1** (`⚒️ 모루 타격`). Secondary actions (`[🔒 Lock]`, `[★]`) must use clean icon-only toggles.
3. **Currencies Displayed**: Clamped to **2** (CASH and Refined Shards).

---

## ⚠️ 11. Most Dangerous Future Failure Modes

1. **Korean Text Overflows**: Long epithets (e.g. *“잿더미에서 돌아온 사령관의 긍지”*) wrapping onto secondary lines and breaking card layout alignment.
2. **Microtransaction Sensation**: Introducing premium cash tickets that guarantee 100% success at +30, destroying the prestige curve.
3. **Stat Creep Out of Control**: Weapons multiplying damage to the point where active RPG mercenary training is rendered entirely useless.

---

## ⚖️ 12. Brutal Visual Verdict: Real Game vs. Lore Document

**VERDICT: REAL PLAYABLE GAME**

*The refined combination of physical anvil clangs, risk Safe Zones, dynamic visual epithets, mobile bottom interaction keys, and circular shard salvage loops elevates Smith & Shards from a cool lore document into an addictive, high-stakes tactical combat loop.*

---

## 📊 13. Status & Next Roadmap Actions

This spec represents **Phase J-3E-1: Playable Weapon Loop UX Validation Audit**. 
*Phase J-3F: Weapon Data Schema & Migration Proposal is blocked until the commander approves these visual and psychological UX safeguards.*
