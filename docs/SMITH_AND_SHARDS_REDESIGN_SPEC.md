# 스미스 앤 셔드 (Smith & Shards) - Weapon Enhancement Redesign Spec

This document outlines the visual and technical design specification for the upcoming **스미스 앤 셔드 (Smith & Shards)** weapon enhancement reframe in *자본전선: 데드라인 (Capital Front: Deadline)*.

> [!NOTE]
> This is a **documentation-only design specification** and does not modify active code, save files, or gacha/enhancement equations in this phase.

---

## 1. Purpose

The **스미스 앤 셔드 (Smith & Shards)** module exists to:
- Transition the abstract "Gacha & Enhancement" tab into an immersive, dopamine-driven **wartime forging experience**.
- Introduce an epic 1~30 enhancement ladder that scales in value, rarity, and danger.
- Build a robust resource circulation loop (**모루 타격 강화 → 무기 파괴 → 파편 순환 → 고강화 도전**) where failed enhancement attempts yield valuable materials (shards) rather than pure loss.
- Connect weapon progression horizontally with frontline wave defense (**전선 지휘부**) and future hero duels (**결전의 사선**).

---

## 2. Player Fantasy

As a Rear Commander coordinating weapons production inside the wartime forge:
1. **The Forging Process**: The commander hears the rhythmic striking of the hammer on the anvil. Selecting a weapon and pressing `모루 타격` (Anvil Strike) creates maximum anticipation.
2. **The Stakes**: High-level weapon attempts feel incredibly rare and dangerous. The risk of shattering a prized weapon adds tension.
3. **The Recycled Shard Loop**: A shattered weapon is not a dead end. Its destruction yields **강화 파편 (Enhancement Shards)** that feed directly back into crafting boosters or protecting future attempts, keeping the commander engaged.
4. **Tactical Strategy**: The player locks prized weapons, handles individual inventories, and sells unwanted gear to the black market, managing their armory like a cold, calculating tactician.

---

## 3. Core Enhancement Ladder (1~30)

Weapons will progress through six highly distinct tactical tiers from `+1` to `+30`. Each tier represents a growth phase in frontline weaponry:

| Level Range | Tier Name (Korean / English) | Lore & Aesthetic Concept |
|---|---|---|
| **+1 ~ +5** | **기초 병장기 (Basic Armaments)** | Mass-produced, rugged vanguards (e.g. *무딘 강철검*). Simple, high success chance. |
| **+6 ~ +10** | **단련된 철검 (Tempered Blades)** | Double-folded and hand-forged steel. Shows distinct glow and sharpness. |
| **+11 ~ +15** | **전선의 명검 (Vanguard Masterpieces)** | Named weapons carried by frontline captains. Enveloped in blue aura. |
| **+16 ~ +20** | **영웅의 성검 (Heroic Relics)** | Rare ancient blades infused with combat magic. High-glow purple radiance. |
| **+21 ~ +25** | **신화의 무기 (Mythic Relics)** | Decisive battlefield relics that bend light. Radiant gold glow. |
| **+26 ~ +30** | **종말급 신화 무기 (Apocalyptic Mythic Weapon)** | Excalibur-class (placeholder name for a legendary weapon) reality-bending blades. Deep crimson/black dark-fantasy flame. |

*Naming conventions and descriptions are design placeholders and will be adjusted in the balance phase.*

---

## 4. Success Chance Direction

To build the ideal high-stakes risk curve, success probabilities will scale downwards across levels:

```mermaid
lineChart
    title "Proposed Weapon Enhancement Success Curve (+1 to +30)"
    x-axis "Enhancement Level (+)"
    y-axis "Success Rate (%)"
    "+1 ~ +5" : 95
    "+6 ~ +10" : 75
    "+11 ~ +15" : 50
    "+16 ~ +20" : 25
    "+21 ~ +25" : 12
    "+26 ~ +30" : 5
```

### Proposed Dynamic Success Rates (Placeholders):
- **+1 ~ +5**: `95% → 80%` (Guaranteed early progression. Safe forging.)
- **+6 ~ +10**: `75% → 55%` (Tempering begins. Minor setbacks possible.)
- **+11 ~ +15**: `50% → 30%` (Vanguard threshold. Real resource management.)
- **+16 ~ +20**: `25% → 15%` (Heroic danger zone. High volatility.)
- **+21 ~ +25**: `12% → 7%` (Mythic trials. Extremely low success chances.)
- **+26 ~ +30**: `5% Floor` (Legendary ceiling. True endgame achievement.)

> [!IMPORTANT]
> **All success and failure probabilities are design placeholders only.** The existing enhancement formulas inside `index.html` remain the absolute source of truth until a dedicated implementation and balance QA phase.
>
> **No final enhancement probability, breakage rate, degradation rule, or shard return formula is approved in J-3A.** All numbers in this document are placeholder balance targets and must go through a dedicated implementation and balance QA phase before entering `index.html`.

---

## 5. Failure Result Model

Rather than causing immediate frustration, weapon failure consequences will be tiered by enhancement ranges:

### A. Early Stage (+1 ~ +5)
- **Failure Consequence**: Level remains unchanged (`Level Maintained`).
- **Breakage Risk**: `0%` (Zero chance of weapon destruction).

### B. Middle Stage (+6 ~ +10)
- **Failure Consequence**: Level has a 70% chance to remain, and a 30% chance to drop by 1 (`Level Degradation`).
- **Breakage Risk**: `0%` (No breakage risk yet).

### C. Vanguard Stage (+11 ~ +15)
- **Failure Consequence**: Level drops by 1.
- **Breakage Risk**: `5%` (Minor risk of complete weapon shattering).
- **Consolation**: Shattered weapons return **일반 강화 파편 (Common Shards)**.

### D. Heroic Stage (+16 ~ +20)
- **Failure Consequence**: Level drops by 1 or resets to +15 checkpost.
- **Breakage Risk**: `20%` (Significant risk of destruction).
- **Consolation**: Shattered weapons return **희귀 강화 파편 (Rare Shards)**.

### E. Mythic & Apocalyptic Stage (+21 ~ +30)
- **Failure Consequence**: Level resets to +20 checkpoint or completely shatters.
- **Breakage Risk**: `50%` (Extreme high-stakes gamble).
- **Consolation**: Shattered weapons return **전설 강화 파편 (Legendary Shards)**.

---

## 6. Breakage and Shard Loop

The **강화 파편 (Enhancement Shards)** system drives the core economy of the forge:

```
[Weapon Shatters] 
       │
       ▼
 [Receive Shards] ──► [Exchange / Craft] ──► [Success Boosters] 
       │                                            │
       ▼                                            ▼
 [Sell for CASH]                              [Safer Forge Attempts]
```

- **Shard Recovery Calculations**:
  - The count of recovered shards scales exponentially based on the level of the destroyed weapon.
  - A `+19` shattered weapon returns a high volume of `희귀 강화 파편` which carries high market trade values.
- **Dynamic Uses**:
  1. **Success Rate Boosters**: Consume shards to temporarily inject a success modifier (e.g. `+5%` success rate).
  2. **Break Protection**: Infuse legendary shards to act as a **파괴 방지 (Break Protection)** barrier during extreme attempts.
  3. **High-Tier Entry**: Certain +25 attempts will require raw shards as a base crafting reagent.
  4. **Liquidity**: Sell unwanted shards at the Black Market for fast war capital (`CASH`).

---

## 7. Material Requirement Model

Future updates will expand enhancement requirements beyond raw `CASH` costs:
- **Low Tiers (+1 to +10)**: Consumes standard `CASH` (representing coal and iron).
- **Mid Tiers (+11 to +20)**: Consumes `CASH` + **기초 제련석 (Basic Refining Stones)** (earned via gacha duplicates or command milestones).
- **Extreme Tiers (+21 to +30)**: Consumes `CASH` + **고대 제련석 (Ancient Catalyst)** + **강화 파편 (Shards)**.
- **Weapon Sacrifices**: Players will be able to sacrifice lower-level enhanced weapons to instantly extract bundles of high-tier refining stones, giving every forged weapon active utility.

---

## 8. Inventory / Storage Model

To support individual item tracing, the weapon inventory will eventually be refactored from an abstract level tracker into distinct item instances:

```typescript
interface WeaponItem {
  instanceId: string;        // Unique instance ID
  definitionId: string;      // ID linking to BASE_WEAPONS data
  baseName: string;          // E.g. "Vanguard Bastard Sword"
  enhanceLevel: number;      // Current level (+0 to +30)
  rarity: string;            // Common, Rare, Epic, Legendary, Mythic
  isLocked: boolean;         // Prevent accidental sell/deletion
  equippedTo: string | null; // InstanceId of equipped character (if any)
  marketValue: number;       // Direct sell value in CASH
}
```

> [!IMPORTANT]
> This schema is a design proposal only. **No active changes** to `gameState.enhancement.inventory` are permitted in this phase.
>
> **Future weapon inventory schema must be decided in a separate schema/migration proposal.** This spec does not approve any persistent field, item object shape, shard currency, or save migration.

---

## 9. Weapon Sale / Black Market

An organized armory allows seamless liquidation:
- **Black Market Sales**: Directly sell unlocked, unequipped weapons from the inventory panel.
- **Value Scaling**: Sell values scale exponentially with enhancement levels, making a `+15` weapon highly valuable for commanders seeking immediate liquidity to fund other sectors.
- **Lock Protection**: Locked/Favorite weapons (`isLocked: true`) will be completely shielded from bulk sells, preventing catastrophic accidental losses.

---

## 10. Equipment and Frontline Command Link

The ultimate power of the forge is weapon deployment:
- **Direct Stat Boosts**: Weapons equipped to heroes inside **전선 지휘부 (Frontline Command)** dynamically scale their combat attributes (e.g., boosting physical tower damage, defense penetration, and attack frequency).
- **Preferred Weapon Synergies**: Matching a character's preference (e.g., equipping an archer with a Tactical Bow) activates preferred synergies, unlocking special skill behaviors in wave defense.
- **Hero's Fate Duel Predictions**: Equipped weapons will directly feed into active 1:1 duel signals, increasing allied hero survival odds.

---

## 11. Current System Mapping

Below is the mapping between variables currently in the codebase and their future candidate role:

| Technical Code Identifier | Current UI Role | Future Redesigned Role (Candidate Mapping / To Be Verified) |
|---|---|---|
| `sortedEnhancementInventory` | Abstract item inventory list | Individual weapon instance grid with lock, sell, and equip controls (may become active after schema approval). |
| `getEnhanceCost(level)` | Simple cash cost calculator | Dynamic cost calculator requiring CASH, shards, and catalysts (may become active after schema approval). |
| `enhanceWeaponItem(id)` | Simple level-up function with max cap | Interactive anvil strike function with dynamic success/fail/break rates (may become active after schema approval). |
| `weaponMastery` | Permanent stat multiplier tracker | Forge Expertise level that permanently boosts success rates (to be verified in J-3B Current Code Audit). |
| `weaponLevels` | Simple highest level tracker | Historical high-score showcase for commander archives (to be verified in J-3B Current Code Audit). |

---

## 12. UI Target Direction

The redesigned **스미스 앤 셔드** UI will be split into four clean tactical zones:

### A. 대장간 모루 구역 (Forge Anvil Area)
- Centered graphic of a warm battlefield forge.
- Focus displays the selected weapon name, its visual tier, and progress stats.
- Clear probability gauges showing **강화 성공 확률 (Success Odds)**, **강화 실패 패널티 (Failure Penalty)**, and **무기 파괴 위험 (Breakage Risk)**.
- Highly tactical action button: `⚒️ 모루 타격 (Anvil Strike)`.

### B. 무기 보관소 (Weapon Inventory)
- Grid layout displaying item cards.
- Each card shows the weapon icon, its level badge (e.g. `+12`), and equipped indicators.
- Hover menus provide `🔒 잠금 (Lock)`, `⚔️ 장착 (Equip)`, and `💰 판매 (Sell)` buttons.

### C. 파편 보관고 (Shard Storage)
- Sub-panel displaying owned shards (`일반`, `희귀`, `전선 신화`).
- Slider bars to apply shards as success boosters.

### D. 타격 결과 로그 (Forge Log)
- Sleek feed showing recent anvil strike events:
  - *`[성공] 강철 철검이 +12 단계로 단련되었습니다!` (Emerald text)*
  - *`[파괴] 제7초소 명검이 산산조각났습니다. 일반 파편 15개 회수!` (Red/Warning text)*

---

## 13. Copywriting Guidelines (Korean)

To maintain the gritty rear commander fantasy, all labels will strictly avoid generic modern terminology:

*   **스미스 앤 셔드 (Smith & Shards)** — Primary module branding.
*   **전쟁 대장간 (War Forge)** — Sub-tab / UI frame name.
*   **모루 타격 (Anvil Strike)** — The core action button (replaces "강화하기").
*   **무기 강화 (Weapon Forging)** — General process name.
*   **강화 성공 (Forging Success)** — Success resolution.
*   **강화 실패 (Tempering Setback)** — Level degradation or failure.
*   **무기 파괴 (Weapon Shattered)** — Complete destruction consequence.
*   **강화 파편 (Enhancement Shard)** — Consolation resource.
*   **파편 회수 (Shard Salvage)** — The collection action.
*   **암시장 판매 (Black Market Sale)** — Selling action.

---

## 14. Future Implementation Roadmap

To develop the Smith & Shards loop safely without breaking active game mechanics, the following timeline is proposed:

| Phase | Milestone Name | Scope |
|---|---|---|
| **J-3B** | **Current Smith & Shards Audit** | Inspect existing gacha/inventory mapping hooks in `index.html`. **No gameplay or state changes are permitted.** |
| **J-3C** | **Smith & Shards Copy Cleanup** | Safe, localized Korean localization cleanup (`모루 타격`, `대장간`). **Zero formula or calculation edits are approved.** |
| **J-3D** | **Weapon Ladder Design Data Spec** | Write static lookup tables for success odds and material requirements inside a separate design spec. **No active code calculations are changed.** |
| **J-3E** | **Inventory UI Reframe** | Rerender the inventory grid with cards, badges, and empty states. **No schema mutations or backend edits are permitted.** |
| **J-3F** | **Breakage/Shards Schema Proposal** | Draft database migration strategies for item instance IDs. **No active local storage or state mutations are approved.** |
| **J-3G** | **Breakage/Shards Prototype** | Integrate active forge failures, shards distribution, and black market trades strictly after explicit approval of the J-3F schema. |

---

## 15. Guardrails

The following guardrails govern the Smith & Shards reframe:
- **No Schema Mutations**: No changes to `"moneyGameUniverseStateV1"` local storage profiles are permitted during Phase J-3A.
- **No Currency Injections**: No active database keys for shards or catalysts are added.
- **Existing Logic Gating**: The active `enhanceWeaponItem` cost validation and success checking logic must remain completely intact.
- **No Randomness Scrambling**: Standard mathematical parameters are preserved.

---

## 16. Open Questions

Before moving to Phase J-3B, the following design directions require commander feedback:
1. **Breakage Threshold**: Should weapon destruction risks start at `+10` (earlier tension) or be delayed until `+15` (safer progression)?
2. **Degradation Gating**: Should players have option nodes to prevent level drops by paying a multiplier cost in `CASH`?
3. **Synergy Limits**: Should preferred weapon synergies be class-exclusive (e.g. only knights can equip swords) or globally equipable with class bonuses?
4. **Relic Shards**: Should destroying extremely high mythic weapons (`+25` or higher) yield unique *Ancient Relic Shards* that unlock legendary combat masteries in **프론티어 마스터**?
