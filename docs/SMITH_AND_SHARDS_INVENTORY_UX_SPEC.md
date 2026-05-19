# ⚒️ Smith & Shards: Inventory UX Reframe Spec

This master specification details the player-facing visual layout, interaction flows, mobile usability rules, and aesthetic assets for the **전쟁 대장간 (Smith & Shards) Inventory UX** in *자본전선: 데드라인 (Capital Front: Deadline)*. It serves as the canonical UX bible to ensure the weapon armory feels immersive, dangerous, prestigious, and highly rewarding to touch and navigate.

---

## 🗺️ 1. Intended Player UX Flow

The experience of acquiring and upgrading weapons balances intense tension against relief and narrative progress:

```
[보급 호출 (Frontline Supply)] 
       │ (Tension: What drop frame did I secure?)
       ▼
[무기 보관고 (Inspect & Dossier)] ───► [Favorite / Lock (Safe State)]
       │ (Dilemma: Do I sacrifice duplicates to buffer success odds?)
       ▼
[⚒️ 모루 타격 (Anvil Upgrade Click)]
       │ (1-2s screen vibration, industrial hammer clangs, sparks fly)
       ├─────────────────────────────────┐
       ▼ (Success!)                      ▼ (Shatter!)
[Prestige Aura + Glowing Title]   [Catastrophic Red Alarm Screen]
       │                                 │
       ▼ (Active combat deployment)      ▼ (Circular Salvage payout)
[Infinite Wave Push / Reaper Counter]  [Refined Shards & Stabilizer Crafting]
```

### 🧠 Emotional States at Each Step:
1. **Supply Call**: Desperate anticipation. *“We need heavy weapons to hold the Line.”*
2. **Armory Dossier**: Tactical pride. *“This blade survived two shatters. I must lock it.”*
3. **Anvil Strike**: Localized gambling peak. *“One more hit. If it survives, my DPS is set.”*
4. **Shatter Failure**: Devastating shock, immediately followed by relief when shard payloads explode onto the screen.

---

## 📦 2. Main Inventory Armory Layout (Wartime Armory UX)

The inventory screen is designed as a **Wartime Armory Dossier Board**, completely avoiding dry spreadsheets:

```
+-------------------------------------------------------------+
| ⚒️ 전쟁 대장간 [보관고]               [파편: 💎 1,200 | 🪨 4,500]  |
+-------------------------------------------------------------+
| [전선 보급 호출 (Draw)] [⚒️ 모루 타격 (Forge)] [암시장 상인 (Trade)]  |
|-------------------------------------------------------------|
| 필터: [전체] [장착됨] [★ 즐겨찾기] [희귀도▼]    (보유 슬롯: 24/50) |
|-------------------------------------------------------------|
| +---------+  +---------+  +---------+  +---------+          |
| | 🛡️ +15  |  | ⚒️ +10   |  | ❌ +18  |  |  [+]    |          |
| | Epic    |  | Rare    |  | Broken  |  | Expand  |          |
| | Execution| | Saber   |  | Shards  |  | Slots   |          |
| |  [★] [E]|  |   [★]   |  | [Scrap] |  |         |          |
| +---------+  +---------+  +---------+  +---------+          |
|                                                             |
| ⚒️ [안내] 현재 버전에서는 무기 제련 및 장착만 지원됩니다.       |
+-------------------------------------------------------------+
```

### 🎨 Visual Hierarchy & Indicators
- **Military Dossier Weapon Cards**: Border overlays resembling weathered titanium military folders with warning stripes.
- **Rarity Glows**: Clean HSL borders mapping to HSL tailored color schemes:
  - *Rare*: Soft neon blue.
  - *Epic*: Deep neon purple.
  - *Legendary*: Vibrant, glowing orange.
  - *Mythic*: Pulsing crimson sunburst aura.
- **Equipped Marker `[E]`**: A neon green high-contrast badge in the top-right corner, immediately showing which mercenary currently wields the weapon.
- **Slot Expansion Button `[+]`**: Rendered in caution-yellow/black stripes, reminding the player that space is limited.

---

## 📇 3. Weapon Card UX Wireframe

The item card itself serves as a tactical military dossier:

```
+-----------------------------------------------------------+
| [★] FAVORITED                [E] EQUIP: Sn.-04 (Sniper)  |
|                                                           |
| ⚔️ 잿더미에서 돌아온 선혈의 제련검 +17                     |
|    "THE ASHEN BLOOD-FORGED SABER +17"                     |
| --------------------------------------------------------- |
|  [|||||||||||||||||||| ] ATK: 78,400 | CRIT RATE: +12%    |
|                                                           |
|  [!] CONDITION: UNSTABLE (SURVIVED IMPOSSIBLE UPGRADE)    |
| --------------------------------------------------------- |
|  ⚒️ DOSSIER LOG:                                           |
|  - Tempered in Rearline Bunker Forge Sector-B4            |
|  - Anvil Strikes: 17 successes | 3 Amber Zone setbacks     |
|  - Frontline wave clears: 140 siege operations            |
|  - Survived a 15% catastrophic breakage odds gamble       |
|                                                           |
|  [🔒 LOCK WEAPON]                      [⚒️ UPGRADE AT ANVIL] |
+-----------------------------------------------------------+
```

### 📜 Storytelling Indicators
- **Epithet Prefix**: E.g., *“잿더미에서 돌아온”* (Ashen / Back from the Ashes), celebrating its survival history.
- **Dossier Log**: Details its forging location, active deployment count, and specific gambling survival records.
- **Unstable Warning Stamp**: Appears in blinking red text if the item is in the Sovereign Danger Zone (+21 ~ +30).

---

## ⚡ 4. The Anvil Screen Flow

Opening a weapon transitions the player into the physical forge:

```
+-------------------------------------------------------------+
| ⚒️ 무기 제련 모루 (The War Anvil)                            |
+-------------------------------------------------------------+
|                     [ ⚔️ Saber +14 ]                         |
|                                                             |
|   제련 성공 확률: ⚙️ 45%         파괴 위기 확률: ⚠️ 5%       |
|   -------------------------------------------------------   |
|   [!] 파괴 경고: 실패 시 장비가 영구 파괴되어 파편화됩니다.  |
|                                                             |
|   보정제 슬롯: [ 💎 Refined Stabilizer (+3% Success) ]      |
|                                                             |
|   소모 비용: ₩85,000 CASH        제련 파편 보너스: +240     |
|   -------------------------------------------------------   |
|   [⚒️ 모루 타격 (⚒️ Strike Anvil)]                            |
+-------------------------------------------------------------+
```

### ⚒️ Physical Feedback Triggers
- **1-2s Delay**: The button blinks grey while dynamic hammer-striking sounds (`Clang! Clang! Clang!`) build anticipation.
- **Localized Camera Shake**: Sparks fly from the center weapon slot during the beat animation.
- **Stabilizer Interaction**: Dragging a stabilizer into the active slot lights up the button border with a golden aura.

---

## 💥 5. Catastrophic Weapon Destruction UX

Loss should feel monumental, immediately transitioning into a reward:

1. **The Fail Trigger**: Screen lights up in solid high-contrast crimson.
2. **Dynamic Shatter**: A loud cracking sound effect plays as the card image splinter-breaks into geometric glass fragments.
3. **The Alarm Sound**: A low bunker-warning klaxon horn plays.
4. **The Shard Explosion**: The broken pieces instantly dissolve, morphing into glowing cyan particle crystals that fly into the player's currency bar, flashing: **`“파편 분해 회수 완료: +450 제련 파편!”`** ( circular salvage complete).
5. **Dopamine Mitigation**: The failure popup reads: *“Your weapon sacrificed itself for the frontline, but its shards have paved the way for future victories.”*

---

## 💎 6. Shard UI Representation

Shards must feel like highly coveted war resources, not abstract dust:
- **🪨 기본 파편 (Basic Scrap)**: Visualized as molten metallic steel chunks with smoking ember effects.
- **💎 제련 파편 (Refined Crystals)**: Glowing, cyan crystalline shards showing localized pulse animations.
- **🌟 신화 파편 (Mythic Cores)**: Radiant purple stellar spheres floating inside containment cells.

---

## 🏪 7. Black Market Salvage Trade Flow

The Black Market trade panel represents capitalistic, desperate wartime transactions:
- **Liquidation**: Players slide their unwanted weaponry onto a military scale widget, instantly displaying the **CASH** payouts.
- **Auctions**: High-tier, named items (e.g. *“The Scarred Executioner +18”*) are placed on dynamic auction boards where virtual rearline commanders bid, creating narrative prestige.

---

## ⚖️ 8. High-Fidelity Comparison UX

Comparing weapons displays narrative and emotional parameters side-by-side:

```
[ Wielded: Saber +10 ]           VS          [ Inspecting: Executioner +12 ]
ATK: 45,000                                  ATK: 68,000  (▲ 23,000)
Rarity: Rare                                 Rarity: Epic
History: Deployed 12 waves                   History: Deployed 180 waves
Prestige: Standard Saber                     Prestige: [★ The Scarred Veteran]
Bonding: 100% (Affined)                      Bonding: 0% (New frame)
```

---

## 📱 9. Mobile-First UX Constraints

To guarantee beautiful rendering on narrow mobile devices without visual clutter:
- **Bottom Active Zones**: All action buttons (`⚒️ 모루 타격`, `[🔒 Lock]`, `[★]`) are placed in the bottom $30\%$ of the viewport, enabling perfect one-handed thumb reach.
- **Scrollable Dossiers**: The dossier logs use touch-swipe vertical scrolling inside an isolated widget card, keeping main weapon stats static at the top.
- **No Mobile Wraps**: Text size scales down automatically on screen widths below `380px`, preventing Korean UI text overlaps.

---

## 🚫 10. Core Guardrails

1. **Emotion Over Numbers**: The UI must display epithets and logs prominently, ensuring players do not treat weapons as disposable spreadsheets.
2. **Strict Currency Separation**: Blacksmith screens must display Shards (`💎`) and CASH (`₩`) separately, keeping funding loops highly legible.

---

## 🗺️ 11. Suggestive Implementation Roadmap

```
Phase J-3E: Inventory UX Spec [COMPLETE]
  ▼
Phase J-3F: Weapon Data Schema [NEXT]
  ▼
Phase J-3G: Inventory Runtime (Cards rendering)
  ▼
Phase J-3H: Enhancement Runtime Rewrite (Refinement functions)
  ▼
Phase J-3I: Weapon Breakage Runtime (Shattering & Shards payouts)
```

---

## 📊 12. Status & Next Roadmap Actions

This spec represents **Phase J-3E: Smith & Shards Inventory UX Reframe Specification**. The next active phase is **Phase J-3F: Weapon Data Schema**, which will detail the precise JSON database structures and local storage persistence schemas required to track these weapon artifacts.
