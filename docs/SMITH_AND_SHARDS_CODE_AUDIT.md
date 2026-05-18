# 스미스 앤 셔드 (Smith & Shards) - Current Code Audit



This document outlines the detailed code audit of the current **스미스 앤 셔드 (Smith & Shards)** (former Gacha & Enhancement) code structure inside [index.html](file:///c:/Users/ryan/dev/money-game/index.html).



> [!NOTE]

> This is an **audit-only document** and does not modify active game logic, state profiles, or enhancement algorithms.



---



## 1. Current State Shape



The Gacha and Enhancement states are initialized inside the global React state in two major blocks: `enhancement` and `rpg`.



### A. Enhancement State Initialization

Located inside the canonical state loader:

```javascript

enhancement: {

  inventory: [],                  // Array of active item instances (weapons and materials)

  failStacks: 0,                  // Fail stacks (currently initialized but not active in calculations)

  lastPulledItem: null,           // Recent item generated from the gacha pool

  recentPulls: [],                // Array tracking recent history of gacha outcomes

  lastEnhancementResult: null,    // Object tracking the recent anvil results

  starterWeaponGranted: false,    // Tracks if first starter weapon was claimed

  weaponMastery: {},              // Maps weapon IDs/types to mastery multiplier levels

  weaponLevels: {},               // Maps weapon IDs/types to historical high-score levels

}

```



### B. RPG State Characters Initialization

Used for equipment mappings:

```javascript

rpg: {

  characters: [],                 // Array of character objects containing equipped weapon instances

  unlockedCharacterIds: [],       // Array of unlocked character definitions IDs

  dividends: 0,                   // Currency spent to draw from gacha pools

  ...

}

```



### C. State Shape Key Observations

1. **Weapon Traceability**: Weapons are stored as **individual item instances** inside `enhancement.inventory`. Each weapon has a unique `instanceId`. However, weapon objects themselves do not contain any backlinks to characters (e.g. `equippedCharacterId` or similar properties) under the current schema, and any equipment checks require querying the characters array.

2. **Abstract Traceability**: In contrast, mastery (`weaponMastery`) and high level (`weaponLevels`) are stored as **abstract key-value maps** indexed by weapon type.

3. **No Currency Keys**: There are **no active variables** inside the state for shards, catalysts, favorites/locks, or scrap rates.

4. **Clean Decoupling**: Gacha draws spend RPG `dividends`, whereas weapon enhancements spend commander `CASH` (`prev.wallet.cash`), cleanly separating active tabs.



---



## 2. Current Function Map



Below is a detailed audit of all enhancement-related javascript functions defined inside [index.html](file:///c:/Users/ryan/dev/money-game/index.html):



| Function Name | Purpose / Operational Role | Inputs | Outputs | Touched State Keys | Safety Verdict |

|---|---|---|---|---|---|

| `getEnhanceCost` | Computes CASH cost based on level. | `level: number` | `CASH cost: number` | None (pure function). | **Safe** to copy-clean. Math is static: `500 * (level + 1)`. |

| `getEnhanceChance` | Computes success probability. | `level: number` | `probability: number` | None (pure function). | **Safe** to copy-clean. Bounded: `0.9 - level * 0.06` (clamped `0.3` to `0.9`). |

| `enhanceWeaponItem` | Resolves standard item level-up. | `instanceId: string` | None (mutates state). | `prev.wallet.cash`, `prev.enhancement.inventory`, `prev.enhancement.weaponLevels`, `prev.enhancement.weaponMastery`, `prev.enhancement.lastEnhancementResult` | **Unsafe** to modify logic. Must be kept pristine until J-3F/G. |

| `pickGachaRarity` | Rolls gacha outcome weight. | None | `rarityName: string` | None (pure function). | **Safe** to copy-clean labels. |

| `createPulledGachaItem` | Generates a unique item instance. | None | `itemInstance: object` | None (pure function). | **Safe** to clean. Generates instanceId using `Date.now()` + math random. |

| `drawGachaItems` | Resolves single/bulk draws. | `quantity: number` | None (mutates state). | `prev.rpg.dividends`, `prev.rpg.unlockedCharacterIds`, `prev.rpg.characters`, `prev.enhancement.inventory`, `prev.enhancement.recentPulls` | **Unsafe** to edit. Integrates gacha mechanics with active character unlocking. |

| `claimStarterWeapon` | Grants initial vanguard tool. | None | None (mutates state). | `prev.enhancement.starterWeaponGranted`, `prev.enhancement.inventory` | **Safe** to copy-clean button descriptions. |

| `equipWeaponToCharacter` | Maps weapon item to character. | `characterInstanceId`, `weaponInstanceId` | None (mutates state). | `prev.rpg.characters` (updates `equippedWeaponInstanceId` parameter). | **Unsafe** to edit. Standardizes direct equipment mechanics. |



---



## 3. Current UI Map



The current `activeTab === "enhancement"` container is rendered around lines 6395 to 6790. It is structured into three visual areas:



### A. Gacha / Draw Panel

- **Observed Elements**: Displays owned RPG `dividends`, a `Claim Starter Weapon` action button (disabled if already granted), and `Draw 1` / `Draw 10` buttons.

- **Wording/Copy Status**: Currently uses simple labels (`Claim Starter Weapon`, `Draw 1`, `Draw 10`). 

- **Opportunity in J-3C**: Cleanly localize to wartime blacksmithy terms (e.g. *소환/영입* to *병기 호출 / 강철 소환* depending on context).



### B. Active Inventory List

- **Observed Elements**: Displays a scrollable inventory block.

- **Wording/Copy Status**: Lists items with simple `+enhanceLevel` labels and an `[Enhance]` action button displaying standard costs.

- **Opportunity in J-3C**: Rerender cost tags safely; relabel button to `⚒️ 모루 타격 (Anvil Strike)`.



### C. Character Equipment Bar

- **Observed Elements**: Lists owned characters. If a weapon is equipped, displays name and enhance level; otherwise displays a fallback label.

- **Wording/Copy Status**: Simple buttons like `[Equip]` or `[Unequip]`.

- **Opportunity in J-3C**: Localize button actions to *장착 (Deploy)* and *해제 (Recall)*.



---



## 4. Current Formula Map



The codebase runs two simple, robust formulas:



### A. Cost Calculation Formula

Defined inside `getEnhanceCost`:

$$\text{Cost} = 500 \times (\text{ClampedLevel} + 1)$$

- Level is clamped between `0` and `MAX_ENHANCE_LEVEL` (10).

- Scale: Level 0 costs `₩500`; Level 9 (trying for +10) costs `₩5,000`.

- **Verdict**: Extremely linear, simple, and safe. Zero risks of value inflation or integer overflows.



### B. Success Rate Formula

Defined inside `getEnhanceChance`:

$$\text{Success Chance} = 0.9 - (\text{ClampedLevel} \times 0.06)$$

- Probability is clamped between `0.3` (30% floor) and `0.9` (90% ceiling).

- Scale: Level 0 chance is `90%`; Level 9 (trying for +10) chance is `36%`.

- **Verdict**: Robust, clean, and completely safe. No fail stacks or drop factors are actively computed.



---



## 5. Save Schema Risk Assessment



Implementing future features presents distinct structural risks to user save data:



1. **Individual Weapon Instances**:

   - **Current State**: Already supports individual instances (`type === "weapon"`, `instanceId`).

   - **Risk**: Low. Existing files can handle weapon instances. However, safe deployment in UI reframing is strictly visual-only. Mock sell buttons must not be rendered as active; a disabled upcoming label may be shown only if clearly marked as future-only.

2. **Breakage and Shards**:

   - **Current State**: No shard array or failure checks are present.

   - **Risk**: **High**. Adding a shard currency requires modifying `gameState.enhancement.shards` or similar fields.

   - **Requirement**: **Phase J-3F (Schema Proposal)** is strictly required before any active failure mutations can occur.

3. **Weapon Locking / Favorites**:

   - **Current State**: Item objects do not contain `isLocked` flags.

   - **Risk**: Moderate. Loading legacy save profiles must automatically inject `isLocked = false` fallbacks.

4. **UI Layouts**:

   - **Risk**: **Zero**. Reorganizing inventory rendering or adding tabs in Phase J-3E is fully safe since it is purely a visual reframe and does not mutate states.



---



## 6. Current-to-Target Mapping



Below is the safety and feasibility classification mapping our current systems to target redesign spec features:



| Target Redesign Feature | Technical Mapping | Classification / Phase Gating |

|---|---|---|

| **Forge Panel** | Maps to enhancement display area. | **UI Reframe (Phase J-3E)**. Safe to re-render without state mutations. |

| **Weapon Inventory Cards** | Maps to scrollable list. | **UI Reframe (Phase J-3E)**. Safe to add lock toggles (state is UI-only). |

| **Shard Storage** | New visual panel. | **Requires Schema Proposal (Phase J-3F)**. Deferred until database migration spec is ready. |

| **Enhancement Result Log** | Maps to `lastEnhancementResult` object. | **UI Reframe (Phase J-3E)**. Safe to convert standard logs into emerald/red cards. |

| **Black Market Sale** | New inventory action button. | **Requires Schema/UX Proposal (Phase J-3F)**. Mock interactive buttons must not be shown. A disabled upcoming label may be shown only if clearly marked as future-only. |

| **Breakage/Shards loop** | New random roll in `enhanceWeaponItem`. | **Requires Formula / Balance QA (Phase J-3G)**. Strictly deferred to prevent save corruption. |



---



## 7. J-3C Readiness Decision



We confirm that **Phase J-3C (Smith & Shards Copy Cleanup) is 100% safe to proceed immediately** under the following strict limits:

- **Scope**: **Korean localization text cleanup only**.

- **No Mechanics**: No changes to gacha probabilities, cost formulas, equipment states, or item shapes.

- **No Active Shards**: All terms like "파편" or "제련" will be used purely in UI labels and preview messages, with no backend logic.



### Safe Copy Targets in J-3C:

- `ui.tabEnhancement` → `스미스 앤 셔드` (Primary module tab header).

- `ui.gachaEnhancement` → `용병 집결 및 병기 호출` (Tab sub-header).

- `ui.inventory` → `무기 보관고 (인벤토리)`.

- `ui.enhance` button → `⚒️ 모루 타격 (Anvil Strike)`.

- `ui.mastery` / `ui.levels` → `제련 숙련도` / `역대 최고 제련 등급`.

- `ui.claimStarterWeapon` → `보급 병기 지원 (스타터 팩)`.

- `ui.starterGranted` → `보급 병기 수령 완료`.



### Risky Replacements to Avoid in J-3C:

- **Do not replace generic terms globally** (e.g. replacing every `강화` with `모루 강화` in formulas or keys).

- **Do not globally replace `gacha` or `enhancement` where they are bound in javascript keys**.

- **Do not imply breakage is active** (e.g. do not show "10% 파괴 위험" in the active UI yet, as it would mislead players since active weapons cannot shatter in this phase).

- **Do not add fake shard counters** or mock zero state balances that imply shards are active.

