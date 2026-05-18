# 🌌 히어로즈 페이트 (Hero's Fate) - UX Redesign Specification (Phase J-2A)

This document provides a comprehensive, player-centric UX redesign specification for the **히어로즈 페이트 (Hero's Fate)** tab in **자본전선: 데드라인 (Capital Front: Deadline)**. 

The goal of this redesign is to transition the tab from an abstract financial trading layout into an immersive, immediate, and high-tension prediction interface. By the end of this phase, the player should be able to understand the core prediction loop within **3 seconds** of opening the tab.

---

## 🔍 1. Current UX Problem (Paperwork vs. Apocalypse)

The former "Investment/Defense Contract" interface was inherited from a generic trading simulator, which created several critical friction points for players:
1. **Financial Paperwork Feeling**: Terms like "Defense Contract," "Settlement Gating," and "Dry Run" read like bureaucratic legal forms rather than high-stakes tactical military command decisions.
2. **Action Blindness**: Players did not immediately know what they were predicting, what button to press, or how their decisions impacted their resources.
3. **Muted Stakes**: The catastrophic consequence of prediction failure—which triggers **방어 실패 / 전멸 (Game Over / Restart)** if resolving real bets without proper preparation—was obscured behind dense text.
4. **Weak Narrative Integration**: There was no clear visual or text connection between a player's bets, the status of frontline hero squads, and the ongoing apocalyptic wave defense.

---

## 🎭 2. Target Player Fantasy (Rear Commander)

The re-themed experience places the player in the role of the **Rear Commander (후방 사령관)** overseeing the active combat front:
*   **The Frontline View**: The commander sits at a tactical terminal monitoring chaotic frontline skirmishes, troop movements, and incoming waves.
*   **Decisive Predictions**: The commander uses war capital (`investment.capital`) to predict the outcomes of critical engagements—predicting whether a defending hero squad will **Survive (영웅 생존)** or be **Wiped Out (영웅 사망)**, and whether a base defense will **Succeed (방어 성공)** or **Fail (방어 실패)**.
*   **Tactical Gains & Risks**: Correct predictions supply critical resources back to the command wallet, increasing military prestige. Wrong predictions waste capital or trigger catastrophic command failure.

---

## 🖥️ 3. Core Screen Structure (4 Visual Zones)

The simplified screen layout organizes the interface into **four distinct vertical/grid zones** designed for maximum visual hierarchy and immediate readability:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      A. MARKET / WAR SIGNAL PANEL                     │
│  [전선 자본]: 1,250,000 CASH   │   [전선 변동성]: 극심함 (High Volatility) │
│  [최근 흐름]: ▲ 영웅 생존율 증가 추세 (Tactical Signal Graph)          │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                     B. SURVIVAL PREDICTION CARDS                       │
│  ┌───────────────────────────────┐   ┌───────────────────────────────┐  │
│  │ 카드 1: 궁수 영웅 vs 오크 전장  │   │ 카드 2: 기사 단장 vs 보스 침공  │  │
│  │ [ 영웅 생존 ]    [ 영웅 사망 ]  │   │ [ 방어 성공 ]    [ 방어 실패 ]  │  │
│  │ 확률: 62%   │   배당: x1.8     │   │ 확률: 35%   │   배당: x2.9     │  │
│  └───────────────────────────────┘   └───────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                       C. PREDICTION BET SLIP                           │
│  [선택 결과]: 카드 1 - 영웅 생존 (확률: 62%)                            │
│  [배팅 금액]: [ 25% ] [ 50% ] [ MAX ]  ( 입력 칸: ____________ )       │
│  [예상 배당]: 180,000 CASH                                              │
│  ⚠️ 경고: 실제 작전 실패 시 후방 전쟁 자금이 소멸됩니다.                 │
│  [ ⚡ 결과 정산 (작전 수락) ]                                           │
└────────────────────────────────────────────────────────────────────────┘
┌────────────────────────────────────────────────────────────────────────┐
│                         D. RESULT / FATE LOG                           │
│  * 궁수 영웅 vs 오크 전장: [예측 성공] +80,000 CASH (영웅력 +10 획득)   │
│  * 기사 단장 vs 보스 침공: [예측 실패] -50,000 CASH (서사력 +5 획득)    │
└────────────────────────────────────────────────────────────────────────┘
```

### 📈 A. Market / War Signal Panel (시장 / 전선 신호 판넬)
*   **Purpose**: Establish the volatility of the active fronts and display the commander's available pool of capital.
*   **Visual Elements**:
    *   Large, bold numeric display of `전선 작전 자본` (representing `investment.capital`).
    *   A simulated tactical chart showing signal volatility (using lightweight SVG sparklines rebranded as "전술 신호 흐름").
    *   A high-visibility state indicator showing the current risk profile (e.g., `안정`, `불안정`, `붕괴 위기`).

### 🎴 B. Survival Prediction Cards (생존 예측 카드)
*   **Purpose**: Display the active skirmish scenarios that the player can place bets on.
*   **Each card contains**:
    *   **Tactical Scenario Title**: Highly thematic flavor texts (*e.g., "제7초소 궁수 부대 포위망 돌파", "기사 단장 엘리자베스의 관문 사수"*).
    *   **Hero/Unit Avatars**: Minimalist, clean visual profile representing the defending heroes.
    *   **Prediction Selectors**: Two prominent, mutually exclusive tactical buttons:
        *   `[ 영웅 생존 ]` vs. `[ 영웅 사망 ]` (or `[ 방어 성공 ]` vs. `[ 방어 실패 ]`).
    *   **Odds Display**: Clear percentage of success chance (`생존 확률`) and the expected payout multiplier (`배당 배수`).
    *   **Tactical Consequence**: A micro-text warning explaining the loss condition (*e.g., "실패 시: 전방 방어 거점 파괴 및 기금 소실"*).

### 📝 C. Prediction Bet Slip (예측 배팅 슬립)
*   **Purpose**: The central action zone where the player configures and executes their bet.
*   **Functional Fields**:
    *   **Active Target**: Shows the currently selected card and choice in bold text.
    *   **Stake Input**: Clamped text input showing the current bet amount, accompanied by quick shortcut buttons (`25%`, `50%`, `최대 지원`).
    *   **Projected Output**: Displays the precise amount of CASH to be won upon a successful outcome.
    *   **Risk / Loss Gate Warning**: Highly visible warning block explaining that real operations can deplete command assets or lead to the Dorothy Proposal Game Over trigger.
    *   **Execute Button**: A high-impact, flashing button labeled `[ ⚡ 결과 정산 (작전 개시) ]`.

### 📜 D. Result / Fate Log (운명 기록 / 정산 로그)
*   **Purpose**: Render past predictive results, cementing player progression and narrative history.
*   **Visual Elements**:
    *   List of the last 10 predictions with clear success markers (`[예측 성공] +CASH` in emerald or `[예측 실패] -CASH` in red).
    *   Placeholders for future design stats: **영웅력 (Heroic Might)** and **서사력 (Narrative Momentum)**.

---

## ⚔️ 5. 1:1 Duel Prediction Model ("결전의 사선")

As a future extension of the Hero's Fate system, the spec introduces **결전의 사선 (The Line of Decisive Battle)**—a specialized 1:1 duel prediction interface:
*   **Gameplay Core**: Instead of general squad battles, the terminal captures direct 1:1 duels between elite Allied Heroes (*e.g., 엘리자베스*) and invading Bosses (*e.g., 철갑의 사신*).
*   **Dynamic Variable Engine**: The odds of the allied hero surviving the duel will be computed dynamically using:
    1.  **Hero Rarity & Faction**: High rarity heroes and strong faction alignments boost survival odds.
    2.  **Current Frontline Command Upgrades**: Stat boosts from the *전선 지휘부* tab (e.g. ATK, SPD, PEN levels) directly bleed into the hero's combat efficiency, increasing their survival probability.
    3.  **Blacksmith Weapon Forge**: The level of the currently active forged weapon in *스미스 앤 셔드* adds physical multipliers to the hero's survival chance.
    4.  **Enemy Boss Threat Level**: Calculated based on the wave progression and Reaper intensity tiers.

> [!TIP]
> For a detailed blueprint of non-breaking data structures, commander fantasies, and reward mechanics, see the complete [HEROS_FATE_DUEL_MODEL_PROPOSAL.md](file:///c:/Users/ryan/dev/money-game/docs/HEROS_FATE_DUEL_MODEL_PROPOSAL.md).

---

## 🎁 6. Reward Reframe (Heroic Might & Narrative Momentum)

To deepen the horizontal economic loop, correct predictions will eventually reward the player with two premium prestige resources (kept as future design concepts in this phase):

1.  **영웅력 (Heroic Might)**
    *   **Thematic concept**: The tactical charisma and physical inspiration generated by successful combat predictions.
    *   **Future mechanic**: Automatically scales the basic physical combat parameters (ATK, SPD) of defensive units in *전선 지휘부*, serving as a permanent horizontal buffer.
2.  **서사력 (Narrative Momentum)**
    *   **Thematic concept**: The strategic lore, equipment research, and narrative progression unlocked by resolving complex frontline fates.
    *   **Future mechanic**: Unlocks rare weapon blueprints, discounts gacha draw costs in *스미스 앤 셔드*, or lowers black market taxes.

---

## 🗺️ 7. Terminology Map

The following maps current technical labels in the code structure to their future player-facing Korean terms:

| Technical / Code Identifier | Current UI Label | Future Rebranded UI Label | Role / Purpose |
| :--- | :--- | :--- | :--- |
| `Defense Contract` | 방어 계약 | **생존 예측 / 결전의 사선** | Core active prediction cards |
| `settlement` | 정산 | **결과 정산** | Executing stake resolution |
| `stake` | 배팅 금액 | **참전 자금 / 지원 기금** | Capital risked on a scenario |
| `odds` | 방어 확률 | **생존 확률 / 사망 확률** | Calculated probability percentage |
| `projected payout` | 예상 배당 배수 | **성공 배당률 (배수)** | Payout multiplier (e.g. x1.8) |
| `preview` | 미리보기 | **사전 분석** | Simulating outcome before commit |
| `dry run` | 가상 시뮬레이션 | **모의 작전 (가상 결과)** | Resolution preview without cash transfer |
| `contract history` | 계약 내역 | **운명 기록 (정산 로그)** | Archive of past outcomes |

---

## ✍️ 8. Copywriting Guidelines

To maintain premium, professional dark apocalyptic military aesthetics:
*   **Direct & Tactical**: Action labels must use short, sharp imperative phrasing (*e.g., "참전", "철수", "정산", "확정"*).
*   **Thematic Immersion**: Replace abstract financial vocabulary (*"투자", "매도", "수익률"*) with military keywords (*"기금 지원", "구역 철수", "작전 성과"*).
*   **No Narrative Clutter**: Scenarios must convey lore in under 15 words rather than long prose, ensuring cards remain highly scannable during high-speed play.

### Recommended Label Lexicon:
*   `히어로즈 페이트` (Hero's Fate Tab Header)
*   `결전의 사선` (1:1 Duel Prediction Subheading)
*   `생존 예측` / `사망 예측` (Choice actions)
*   `영웅 생존` / `영웅 사망` (Outcome types)
*   `방어 성공` / `방어 실패` (Outcome types)
*   `예측 배팅 슬립` (Configuration Panel)
*   `결과 정산` (Action Button)
*   `운명 기록` (History Logs)
*   `전선 리스크` / `전술 신호` (Market Volatility parameters)

---

## 🚀 9. J-2 Implementation Plan

The Hero's Fate UX revamp is structured into five distinct, reviewable milestones:

```
┌────────────────────────────────────────────────────────┐
│  Phase J-2A: Create UX Redesign Spec (COMPLETE)        │
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│  Phase J-2B: Perform Label & Copy Cleanup              │
│  - Rename existing text nodes in UI_TEXT.ko            │
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│  Phase J-2C: Layout Survival Prediction Cards          │
│  - Redesign standard grids to vertical prediction cards│
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│  Phase J-2D: Simplify Prediction Bet Slip              │
│  - Clear input fields and high-impact action buttons  │
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│  Phase J-2E: Polish Fate Log / History Results         │
│  - High-visibility green/red outcome cards            │
└───────────┬────────────────────────────────────────────┘
            ▼
┌────────────────────────────────────────────────────────┐
│  Phase J-2F: 1:1 Duel Model Proposal                   │
│  - Core data model and integration rules for J-5       │
└────────────────────────────────────────────────────────┘
```

---

## 🔒 10. Technical Guardrails & Constraints

*   **State Keys Preservation**: Do not alter `gameState.investment.capital`, `gameState.investment.portfolio`, or the global `localStorage` key.
*   **Combat Math Preservation**: Do not touch `calculateDefenseContractSuccessChance()` or the deterministic random engine. The odds scaling is mathematically balanced with the horizontal economy.
*   **Zero Logic Mutation**: Phase J-2 is strictly a layout and cosmetic UI reframe. Do not implement live gameplay calculations, faction boosts, or weapon integrations until Phase J-5.

---

## 📐 11. Wireframe Text Mockup (Korean)

```text
================================================================================
[ 📈 히어로즈 페이트 | HERO'S FATE ]
전방 전선의 운명을 예측하고 후방 자본을 배팅하십시오.
================================================================================

[ 📡 전술 신호 모니터 ] --------------------------------------------------------
작전 가능 자본: 3,520,000 CASH
전선 불안정성: [ 극심함 (High Volatility) ] 
신호 트렌드: ▲ 아군 생존율 소폭 증가 추세
[ ─────────────────── (Lightweight SVG Sparkline Graph) ─────────────────── ]

[ 🎴 전방 생존 예측 전선 ] ------------------------------------------------------
┌──────────────────────────────────────────────────────────────────────────────┐
│  ■ 제7초소 수색대 포위망 돌파 작전 (위험도: 보통)                            │
│  "돌격대장 휴이와 대원들이 적의 습격을 피해 안전하게 후방으로 복귀할 것인가?" │
│                                                                              │
│  [ 🛡️ 영웅 생존 예측 ]          [ 💀 영웅 사망 예측 ]                         │
│  생존 확률: 62.5%               사망 확률: 37.5%                             │
│  성공 배당: x1.6                성공 배당: x2.4                              │
└──────────────────────────────────────────────────────────────────────────────┘
┌──────────────────────────────────────────────────────────────────────────────┐
│  ■ 강철 사신 보스 1차 장벽 조우전 (위험도: 극도로 위험)                      │
│  "제4방벽 방어군이 수호 방패를 전개해 철갑의 사신의 맹공을 막아낼 것인가?"     │
│                                                                              │
│  [ 🛡️ 방어 성공 예측 ]          [ 💀 방어 실패 예측 ]                         │
│  성공 확률: 25.0%               실패 확률: 75.0%                             │
│  성공 배당: x4.0                성공 배당: x1.3                              │
└──────────────────────────────────────────────────────────────────────────────┘

[ 📝 예측 배팅 슬립 (PREDICTION BET SLIP) ] ------------------------------------
선택한 전선: 제7초소 수색대 포위망 돌파 작전
예측한 운명: [ 🛡️ 영웅 생존 ] (확률: 62.5% | 배당: x1.6)

지원할 기금 (CASH):
[ 25% ] [ 50% ] [ 75% ] [ 최대 지원 ]
(입력창: 1,000,000 ) CASH

성공 시 예상 배당금: +600,000 CASH (총 1,600,000 CASH 수급)
⚠️ 경고: 실제 정산 시, 예측 실패 시 지원한 전쟁 자금이 소멸됩니다.

[ ⚡ 전선 결과 정산 (작전 수락) ]  [ 🔍 모의 작전 (시뮬레이션) ]

[ 📜 운명 기록 (FATE LOG) ] ----------------------------------------------------
* 제3초소 철수 엄호 작전   - [ 예측 성공 ] +450,000 CASH (영웅력 +10 획득)
* 기사단 관문 돌파전       - [ 예측 실패 ] -200,000 CASH (서사력 +5 획득)
* 보급 물자 수송선 방어    - [ 예측 성공 ] +150,000 CASH (영웅력 +8 획득)
================================================================================
```
