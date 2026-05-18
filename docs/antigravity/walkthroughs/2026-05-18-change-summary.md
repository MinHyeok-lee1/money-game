# 📝 2026-05-18 Change Summary: Dark Frontier Rebranding & Korean Naming Cleanup (Phase J-1)

This change summary details the complete execution of **Phase J-1: Dark Frontier Korean Naming and Navigation Cleanup** in **자본전선: 데드라인 (Capital Front: Deadline)**. All changes were applied incrementally and verified using precise, CRLF-safe single-line replacement techniques.

---

## 🌌 1. Identity & Rebrand Summary

The core game has been successfully transitioned to the confirmed product identity:
- **Title**: `자본전선: 데드라인` (Capital Front: Deadline)
- **Fantasy**: The player is a supreme commander controlling war capital from the rear in an apocalyptic war against endless enemy waves.
- **Pillars**:
  1. **프론티어 마스터** (Frontier Master / Short: **프론티어**): Command fire support, reclaim zones, and collect war taxes.
  2. **히어로즈 페이트** (Hero's Fate / Short: **페이트**): Predict frontline hero survival (생존/사망) and manage high-stakes defense contracts.
  3. **스미스 앤 셔드** (Smith & Shards / Short: **대장간**): Strike the anvil, forge weapons, and climb the enhancement ladder.
  4. **전선 지휘부** (Frontline Command / Short: **지휘부**): Automate defense lines, summon units using combat dividends, and survive waves.

---

## 🛠️ 2. Detailed Modifications

### 🌐 A. HTML Metadata & Header Rebrand
- Updated HTML `<title>` tag from `Idle Landlord` to `자본전선: 데드라인 | Capital Front: Deadline`.
- Updated HTML description `<meta>` tag to reflect the new dark frontier theme, incorporating war capital command, forging, and apocalyptic wave defense keywords.

### 🇰🇷 B. translation Sheets (`TRANSLATIONS.ko`)
- **Title & Rebirth**: Rebranded application title to `자본전선: 데드라인` and updated `rebirthConfirm` to describe the military operation `작전 재기동` and permanent `통치 권위` acquisition.
- **Dorothy Dialogs**: Reframed Dorothy's lines around wave defense and military frontiers.
- **Game Over & Failure**: Updated title to `방어 실패 / 전멸` and rephrased loss reasons to reference `생존 예측 실패` and `부대 전멸`.
- **Archetypes & Bosses**: Upgraded monster terms to `침략자 / 적` and stage terms to `웨이브`. Rebranded bosses (e.g., `철갑의 사신 (Iron Sentinel)`) and milestones.
- **Reapers**: Aligned all dormant, dark, and recurring reaper descriptions to emphasize combat pressure and frontline instability threats.
- **Leverage & Specialization**: Rebranded landlord wealth modifiers to reference `후방 자본 레버리지` and `영토 수복 공학 특화`.
- **Confirm Settlement**: Re-mapped confirmation overlays to `생존 예측 결과 확정` and `예측 정산 실행`.

### 🎛️ C. Interface Label Updates (`UI_TEXT.ko`)
- **GNB Navigation**: Rebranded GNB tab labels to `"프론티어 마스터"`, `"히어로즈 페이트"`, `"스미스 앤 셔드"`, and `"전선 지휘부"`.
- **Wallet & Headers**: Updated global wallet display to `사령부 월렛` and currency/income fields to `전쟁 자금`, `전투 배당금`, and `작전 기금`.
- **Bidding Cards & Slip**: Rebranded investment terminology to predictive betting elements (`예측 배팅 슬립`, `방어 성공률`, `아군 생존 확률`, `용병 모집`, `시뮬레이션 내역`).
- **Defend Actions**: Updated defense control terms to `전선 작전 기동`, `전선 방어 작전 개시`, and `작전 철수 (RUN 종료)`.
- **Property Renames**: Completely rebranded the 10 real estate properties in `PROPERTIES_DATA` to military resource zones (e.g., `핫도그 포장마차` $\rightarrow$ `임시 보급소`, `편의점` $\rightarrow$ `전방 간이 초소`, `달 식민지` $\rightarrow$ `전선 개척 성계`).

---

## 🛡️ 3. Verification & Safety Checks
- **Zero Save State Mutations**: Checked that `localStorage` key `moneyGameUniverseStateV1` and internal JS variables are completely unchanged.
- **Formula Integrity**: Verified that no gameplay formulas, HP scaling curves, or betting settlement odds code blocks were modified.
- **Static SEO Files**: Confirmed that all deploy-ready configuration files remain fully active in the repository.
- **No Temporary Scripts**: A temporary CRLF-safe helper script `patch_index.py` was created to perform precise replacements, and was successfully removed immediately after run execution.

---

## 🌌 4. Phase J-2B: Hero's Fate Label & Copy Cleanup (Complete)

We have successfully executed Phase J-2B by applying a comprehensive, copy-only rebrand of the `히어로즈 페이트` (Hero's Fate) tab inside [index.html](file:///c:/Users/ryan/dev/money-game/index.html) (lines 3646–3734).

### ✍️ A. Localization Terms Mapping (`UI_TEXT.ko`)
All visible player-facing strings were pivoted from stock/investment terminology to immersive, high-tension frontline military forecasting:
- `warChest` (작전 기금 $\rightarrow$ **지원 기금**)
- `contractValue` (계약 가치 $\rightarrow$ **작전 규모**)
- `totalCapital` (총 자본 $\rightarrow$ **총 작전 자본**)
- `contractCapital` (작전 자본 $\rightarrow$ **작전 자본**)
- `betSlip` (예측 배팅 슬립 $\rightarrow$ **예측 배팅 슬립**)
- `stakeAmount` (전쟁 기금 예측 배팅 $\rightarrow$ **작전 투입 기금 배팅**)
- `projectedWin` (예측 성공 시 정산 수익 $\rightarrow$ **예측 성공 시 예상 배당금**)
- `settlementPreview` (정산 시뮬레이션 $\rightarrow$ **모의 작전 분석 (시뮬레이션)**)
- `successChance` (방어 성공률 $\rightarrow$ **생존 및 성공 확률**)
- `outcome` (예측 결과 $\rightarrow$ **작전 예측 결과**)
- `projectedGain` / `projectedLoss` (예상 수입/손실 $\rightarrow$ **예측 성공/실패 시 수급/손실 CASH**)
- `confidence` (레이더 정밀도 $\rightarrow$ **전술 레이더 정밀도**)
- `signalAnalysis` (전선 신호 분석 $\rightarrow$ **전방 전술 신호 분석**)
- `savePreviewToHistory` (미리보기를 기록에 저장 $\rightarrow$ **분석 결과를 운명 기록에 저장**)
- `settlementStatus` (정산 승인 상태 $\rightarrow$ **작전 결과 정산 승인 상태**)
- `settlementUnlocked` (정산 게이트 오픈 $\rightarrow$ **정산 게이트 개방 완료**)
- `contractSelected` (작전 계약 수락 $\rightarrow$ **참전 전선 선택 완료**)
- `positiveStake` (스테이크 > 0 $\rightarrow$ **투입 기금 > 0**)
- `stakeWithinCapital` (스테이크 <= 자본 $\rightarrow$ **투입 기금 <= 보유 자본**)
- `oddsValid` (배당률 연동 상태 양호 $\rightarrow$ **전선 배당 배수 동기화 완료**)
- `payoutValid` (수익 배수 연동 상태 양호 $\rightarrow$ **예상 정산 배수 정합성 확인**)
- `runDryRun` (드라이런 시뮬레이션 기동 $\rightarrow$ **모의 작전 시뮬레이션 기동 (Dry Run)**)
- `settleContract` (작전 정산 승인 (실제) $\rightarrow$ **⚡ 전선 결과 정산**)
- `realSettlementLocked` (도로시 수락 필요 $\rightarrow$ **⚠️ 실제 작전 불가 (도로시 제안 수락 필요)**)
- `dryRunResult` (시뮬레이션 정산 결과 $\rightarrow$ **모의 작전 정산 결과**)
- `contract` (방어 계약 $\rightarrow$ **생존 예측 전선**)
- `wouldWin` (생존 성공 (승리) $\rightarrow$ **생존 성공 / 방어 성공**)
- `wouldLose` (부대 전멸 (실패) $\rightarrow$ **영웅 사망 / 방어 실패**)
- `netPreview` (예상 순익 $\rightarrow$ **순 예상 배당금**)
- `dryRunNoMove` (가상 시뮬레이션 안내 $\rightarrow$ **모의 작전(Dry Run)이며 실제 전선 작전 자금은 이전되지 않습니다.**)
- `noContractSelected` (선택된 방어 계약 없음 $\rightarrow$ **참전할 예측 전선이 선택되지 않았습니다.**)
- `selectContractHint` (계약 선택 힌트 $\rightarrow$ **아래 전선 작전 카드를 선택하여 예측 배팅 슬립을 활성화하십시오.**)
- `previewHistory` (시뮬레이션 내역 $\rightarrow$ **모의 작전 분석 내역**)
- `previewOnlyNotSettled` (가상 테스트 $\rightarrow$ **모의 분석 (미정산)**)
- `noPreviewHistory` (가상 내역 없음 $\rightarrow$ **저장된 모의 작전 분석 기록이 없습니다.**)
- `settlementHistory` (실제 작전 정산 기록 $\rightarrow$ **운명 기록 (실제 작전 정산 로그)**)
- `noSettlementHistory` (실제 내역 없음 $\rightarrow$ **정산된 실제 운명 기록이 없습니다.**)
- `contractPreview` (계약 조건 분석 $\rightarrow$ **전선 작전 조건 분석**)
- `previewUsesLiveRules` (전선 실시간 데이터 기준 $\rightarrow$ **실시간 전술 데이터 기준 조건 분석**)
- `defenseOdds` (아군 생존 확률 $\rightarrow$ **아군 생존 및 성공 확률**)
- `projectedPayout` (성공 배당률 $\rightarrow$ **작전 성공 배당률 (배수)**)
- `riskTier` (전선 위험도 $\rightarrow$ **전선 리스크 위험도**)
- `linkedRpgSignal` (Frontline Command 연동 $\rightarrow$ **전선 지휘부(Command) 연동 신호**)
- `positionsHeld` (체결 구역 수 $\rightarrow$ **확보 전선 구역**)
- `stakeValue` (구역 총 가치 $\rightarrow$ **구역 총 작전 가치**)
- `entryRate` (평균 확보 단가 $\rightarrow$ **평균 전선 확보 단가**)
- `selectedForBetSlip` (선택됨 $\rightarrow$ **예측 슬립에 등록됨**)
- `selectContract` (계약 수락 $\rightarrow$ **작전 수락**)

### 🎁 B. Explanatory Context for Future Systems (`investmentIntro`)
The introductory text `investmentIntro` has been updated to include clear upcoming concepts:
> `"전방 영웅들의 운명을 예측하고 참전할 독립 작전 자본입니다. (※ 결전의 사선: 1:1 결투 예측 및 예측 성공 시 영웅력/서사력 성장 시스템은 향후 확장 예정입니다.)"`

### 📖 C. Strategic Wiki Rebrand
The SEO / Strategic Wiki section under `SEO_TAB_CONTENT.ko.investment` has been completely rewritten to use the rebranded vocabulary (e.g., `참전 기금`, `운명 예측`, `결과 정산`), while preserving key internal code names (`betSlip`, `contractHistory`, `dry-run`) to maintain developer clarity and assure players of system stability.

### 🛡️ D. Implementation Integrity
- **Save State Safety**: No variables inside the `gameState` structure were modified. The save engine mapped to `"moneyGameUniverseStateV1"` is completely intact.
- **Combat Math Safety**: Checked that `calculateDefenseContractSuccessChance` and real settlement resolution mechanics are left untouched.
- **No Residual Helpers**: `patch_index.py`, `patch_qa.py`, `restore_j2b.py`, and `patch_layout.py` were fully removed after successful execution.

---

## 🎴 5. Phase J-2C: Survival Prediction Card Layout (Complete)

We have successfully executed Phase J-2C by reorganizing the prediction cards in the `히어로즈 페이트` tab inside [index.html](file:///c:/Users/ryan/dev/money-game/index.html) into highly structured, thematic, and readable **Survival Prediction Cards**.

### 📐 A. Vertical Card Structure
Each prediction card now presents data in a clean, high-impact vertical block:
1. **Scenario Header**: Displays the tactical name of the contract, its core type, and a colored risk badge (**안정**, **불안정**, or **붕괴 위기**) mapped from volatility tiers. It also shows the target **작전 규모** (CASH price) clearly in the upper right.
2. **Frontline Matchup**: Shows the specific allied squad and enemy monster details, mapped dynamically to contract flavor metadata:
   - *Vanguard Defense Fund*: `🛡️ 왕실 최정예 근위 스쿼드` vs `👾 강철의 차원 침략 괴수군`
   - *Rising Squad Futures*: `⚡ 전술 아처 돌격 연대` vs `👹 오크 광전사 기습 돌격대`
   - *Underground Raid Bond*: `🩸 그림자 사설 용병 연맹` vs `☠️ 침략 군단 보스 [철갑의 사신] 조우전`
3. **Sparkline Chart**: Retained the high-fidelity SVG volatility sparkline indicating active tactical fluctuations.
4. **Prediction Outcome Area**: An explicit box framing **영웅 생존 / 방어 성공** as the active prediction choice, warning players of the high-stakes failure consequence (**영웅 사망 / 방어 실패**), and clarifying that 1:1 duels are future expansions.
5. **Probability/Reward Grid**: A 3-column tactical summary showing **아군 생존 및 성공 확률**, **작전 성공 배당률 (배수)**, and the real-time **전선 지휘부 (Command) 연동 신호** (current Stage and DPS).
6. **Collapsible Position Panel**: Shows total **확보 전선 구역**, **구역 총 작전 가치**, **평균 전선 확보 단가**, and unrealized **수익** only when active shares are held (`asset.owned > 0`), keeping the card extremely clean.
7. **Action Grid**: Integrates 2x2 compact action controls (**지원 / 최대 / 철수 / 전원철수**) and a prominent **이 예측 선택** (배팅 슬립 등록) primary button.

### 🛡️ B. Preserved Technical Logic
- **Odds & Multipliers**: Consumes exact pure helpers (`getDefenseContractOdds`, `getDefenseContractProjectedPayout`, etc.) without altering combat, leveling, or settlement equations.
- **Save Integrity**: Zero modifications to state schema or local storage keys.
- **Controls Fidelity**: Preserves original `buyInvestmentAsset`, `buyMaxInvestmentAsset`, `sellInvestmentAsset`, `sellAllInvestmentAsset`, and `selectDefenseContract` hooks perfectly.

---

## 🧾 6. Phase J-2D: Bet Slip Simplification (Complete)

We have successfully executed Phase J-2D by refactoring the abstract financial trading slip into a highly immersive **Prediction Bet Slip / Confirmation Panel** inside [index.html](file:///c:/Users/ryan/dev/money-game/index.html).

### 🧾 A. Bet Slip Visual Structure
The redesigned bet slip organizes the tactical action into a simplified vertical layout:
1. **Selected Prediction Summary**: Displays the active contract name, its success probability, the expected multiplier, and frames the prediction choice (**영웅 생존 / 방어 성공**) alongside explicit red warnings for failure consequences (**영웅 사망 / 방어 실패 / 게임오버 위험**).
2. **Stake Input Area**: Fully redesigned with a tactical prefix currency symbol (`₩`), clear displays of available available capital (`CASH`), and quick fraction buttons (`25%`, `50%`, `최대 기금`). Clamping and validation code rules are fully preserved.
3. **Probability & Reward Grid**: Displays a balanced layout for the **지원 기금액** (Stake) and **예상 획득 자금** (Projected Payout) directly in high-visibility stats cards.
4. **Simulation & Analysis**: Features expandable, clean summaries of the **사전 모의 작전 결과 분석** (Dry Run preview, success rates, expected base outcomes, confidence tiers, and signal logs).
5. **Action Buttons**: Cleanly divides the execution sequence:
   - `🔍 모의 작전 (가상 결과)`
   - `⚡ 결과 정산 (실제 계약 정산)`
   - Locked button statuses and the warning prompt confirmation modal have been perfectly preserved to prevent unauthorized operations before Phase Stage 100/Dorothy proposta.
6. **Empty State**: Displays an elegant, centered prompt when no cards are active, encouraging players to click and select from the fronts above.

---

## 📜 7. Phase J-2E: Fate Log / Result History Polish (Complete)

We have successfully executed Phase J-2E by refactoring the abstract transaction ledger tables inside [index.html](file:///c:/Users/ryan/dev/money-game/index.html) into an immersive **운명 기록 (Fate Log / Result History)** card deck.

### 📜 A. Unified Fate Log Layout
The history section is refactored into two elegant, stacked card sections under a cohesive tactical header:
1. **Header Block**: A clean section title `운명 기록 (전선 판단 기록)` paired with the thematic subtitle `생존 예측과 모의 작전 결과를 최근 순서로 확인합니다.`
2. **실제 결과 정산 로그 (Real Outcomes)**:
   - Compact cards displaying final tactical combat results.
   - **Visual Distinctions**:
     - 예측 성공 (Won): Emerald styling (`bg-emerald-50 bg-opacity-20 border-emerald-100`) and the status label `🛡️ 생존 성공`. It clearly shows profits in positive green text (e.g. `+₩900`).
     - 예측 실패 (Lost): Red/danger styling (`bg-red-50 bg-opacity-10 border-red-100`) and the status label `💀 영웅 사망`. It clearly shows losses in red text.
   - **Details Displayed**: Shows total 참전 지원금 (Stake), success probability, payout multiplier, and the exact completion timestamp.
   - **Empty State**: Displays `아직 기록된 실제 결과 정산 내역이 없습니다.` when empty.
3. **모의 작전 분석 내역 (Simulated Previews)**:
   - Colored in clean cyber-blue (`bg-sky-50 bg-opacity-10 border-sky-100`) with a visual status label indicating `예측 성공`, `보합`, or `예측 실패` based on simulated outcome labels.
   - Includes an explicit footer outlining future development priorities:
     `💡 향후 모의 작전 예측 성공은 사령부 영웅력/서사력 성장과 직접 연결될 예정입니다.`
   - **Empty State**: Displays `아직 기록된 모의 작전 분석 내역이 없습니다.` when empty.

### 🛡️ B. Verification and Preservation Checklist
- **No Mutated States**: State keys (`contractHistory`, `contractSettlementHistory`) and cap constraints are completely unchanged.
- **Formulas Safety**: Success chances, dry-run simulated outcomes, and cash calculations run exactly the original state behaviors without modifications.
- **Future Safeguards**: No mock statistics or variables (such as `heroMight` or `narrativeMomentum`) were introduced to the game state. All narrative hooks are strictly informational.
- **JSX compilation**: The React markup is fully validated with perfectly balanced scopes, avoiding any runtime compiler issues.

---

## ⚔️ 8. Phase J-2F: Future 1:1 Duel Data Model Proposal (Complete)

We have successfully executed Phase J-2F by authoring a comprehensive, future-proof design proposal in [HEROS_FATE_DUEL_MODEL_PROPOSAL.md](file:///c:/Users/ryan/dev/money-game/docs/HEROS_FATE_DUEL_MODEL_PROPOSAL.md) defining the future **결전의 사선 (The Duel of Fates)** prediction mechanics.

### ⚔️ A. Key Proposal Elements
The design proposal establishes clear guidelines for future integrations:
1. **Core Purpose**: Align market-based forecasting directly with the defensive frontline hero fantasy, creating deep progression loops between modules.
2. **Data Structure Concept**: Outlines a clean `DuelScenario` object model describing heroes, bosses, base survival rates, and two-sided payout structures (`survival` vs `death`) without breaking existing state properties.
3. **Hero & Enemy Inputs**: Explains how weapon enhancement, tower tiers, wave stage progression, and Reaper pressure will dynamically adjust live tactical combat odds.
4. **Prestige & Rewards**: Specs out the horizontal loop benefits of **영웅력 (Heroic Might)** and **서사력 (Narrative Momentum)**.
5. **Formulas & Schema Safety**: Establishes strict mathematical guardrails (e.g. bounded probabilities, direct odds inversion) and save schema buffers to prevent future data corruption.

### 📝 B. Integration and Documentation Updates
- **UX Re-spec Reference**: Appended an explicit Tip box to [HEROS_FATE_UX_REDESIGN_SPEC.md](file:///c:/Users/ryan/dev/money-game/docs/HEROS_FATE_UX_REDESIGN_SPEC.md) pointing future developers to the complete duel proposal.
- **Pristine State Maintenance**: Verified that zero changes were made to active script scopes, formulas, or save game states in `index.html`. All concepts remain strictly documentation-only.

---

## ⚒️ 9. Phase J-3A: Weapon Enhancement Redesign Spec (Complete)

We have successfully executed Phase J-3A (Weapon Enhancement Redesign Spec) by authoring the complete design-only specification document [SMITH_AND_SHARDS_REDESIGN_SPEC.md](file:///c:/Users/ryan/dev/money-game/docs/SMITH_AND_SHARDS_REDESIGN_SPEC.md).

### ⚒️ A. Key Design Elements
The new specification defines a comprehensive reframe of the forging module (**스미스 앤 셔드**):
1. **Thematic Forging Fantasy**: Transits abstract "Gacha & Enhancement" tabs into a wartime blacksmith forge utilizing `모루 타격` (Anvil Strike) action flows.
2. **1~30 Core Enhancement Ladder**: Organizes progression through six distinct visual and lore-based weapon tiers from basic iron tools to Excalibur-class Apocalyptic Mythic Weapons.
3. **Setback & Shattering Failures**: Structures failure consequences safely (level preservation, degradation, reset checkpoints, and weapon shattering) matching the enhancement levels.
4. **강화 파편 (Enhancement Shards) Loop**: Establishes a resource conservation loop where shattered weapons yield Common, Rare, and Mythic shards that players use as success rate boosters or sell for war CASH.
5. **UI Target Layout**: Specs out distinct tactile panels (Forge Anvil, Weapon Inventory, Shard Storage, and result logs) for future implementation.

---

## 🛡️ 10. Phase J-3A-1: Smith & Shards Redesign Spec Guardrail QA (Complete)

We have successfully executed Phase J-3A-1 (Smith & Shards Redesign Spec Guardrail QA) by auditing and patching the design specification document [SMITH_AND_SHARDS_REDESIGN_SPEC.md](file:///c:/Users/ryan/dev/money-game/docs/SMITH_AND_SHARDS_REDESIGN_SPEC.md) to implement extremely rigid safety boundaries.

### 🛡️ A. Key Guardrail Adjustments
1. **Formula and Probability Gating**: Embedded an explicit Warning banner explaining that all enhancement success/failure chances and breakage odds are design-only placeholders, and the active `index.html` equations remain the absolute source of truth.
2. **Save Schema Isolations**: Added a hard requirement preventing the approval or addition of active shard/weapon object schemas inside the database to protect user local storage profiles.
3. **Current Mapping Tentativeness**: Refactored mapping descriptions to designate existing technical hooks (`sortedEnhancementInventory`, `weaponMastery`) as candidate/tentative mappings subject to the J-3B audit.
4. **Roadmap Hardening**: Strengthened downstream roadmap timelines (J-3B to J-3G) to be explicitly audit-first and prototype-only.
5. **Tone and Casing Cleanups**: Replaced speculative naming (*"종말급 종적"*) with appropriate canon templates (*"종말급 신화 무기"*). All concepts remain strictly documentation-only.

---

## 🛡️ 11. Phase J-3A-2: Smith & Shards Status Wording Sanity Check (Complete)

We have successfully executed Phase J-3A-2 (Smith & Shards Status Wording Sanity Check) by auditing and patching status descriptions in all tracking and roadmap files.

### 🛡️ A. Key Status Clarifications
1. **Explicit Roadmap Gating**: Checked off `Phase J-3A` (Redesign Spec), `Phase J-3A-1` (Guardrail QA), and `Phase J-3A-2` (Sanity Check) inside `docs/task.md` while adding unchecked entries (`[ ]`) for future phases `J-3B` through `J-3G`.
2. **Phase Status Isolation**: Updated the `TODO.md` to cleanly separate the spec blueprint from downstream blacksmith prototypes.
3. **Readme Preservation**: Hardened `README.md` focus bullet points to explicitly declare that the active weapon forging system is **pending backend implementation**.
4. **Pristine Logic Maintenance**: Verified that zero changes exist in `index.html` runtime structures, cost maps, or save game migrations. All actions remain strictly documentation-only.

---

## 🔍 12. Phase J-3B: Current Smith & Shards Code Audit (Complete)

We have successfully executed Phase J-3B (Current Smith & Shards Code Audit) by authoring the complete technical and structure audit document [SMITH_AND_SHARDS_CODE_AUDIT.md](file:///c:/Users/ryan/dev/money-game/docs/SMITH_AND_SHARDS_CODE_AUDIT.md).

### 🔍 A. Key Audit Conclusions
1. **Pristine State Layout**: Confirmed that weapons are successfully stored as individual, traceable instances with unique IDs (`instanceId`) in `enhancement.inventory`.
2. **Current Mapping Safety**: Confirmed that gacha drawings mutate RPG dividends, whereas weapon forging is funded by CASH.
3. **Decoupled Equations**: Verified that cost maps (`500 * (level + 1)`) and success odds (`0.9 - level * 0.06`, clamped `30%` to `90%`) are clean, linear, and completely safe.
4. **Localization Readiness**: Identified that the next step, **Phase J-3C (Copy Cleanup)**, is 100% safe to proceed for copy-only translations (e.g. *대장간*, *모루 타격*), while preserving all database keys.
5. **Rigid Implementation Guardrails**: Confirmed that Phase J-3F (Schema Proposal) is strictly required before any persistent shards, catalog drops, or weapon failures are added.

---

## 🛡️ 13. Phase J-3B-1: Smith & Shards Code Audit Accuracy and Guardrail QA (Complete)

We have successfully executed Phase J-3B-1 (Smith & Shards Code Audit Accuracy and Guardrail QA) by auditing and patching the newly created audit document [SMITH_AND_SHARDS_CODE_AUDIT.md](file:///c:/Users/ryan/dev/money-game/docs/SMITH_AND_SHARDS_CODE_AUDIT.md).

### 🛡️ A. Key Guardrail Adjustments in the Audit
1. **Backlink Limits Clarification**: Clarified in Section 1 that while weapons have unique instance IDs, the weapon objects themselves do not contain any backlinks to characters (`equippedCharacterId` or similar), and any equipment status lookup must query characters directly.
2. **Hard Gating on Safe UI Reframing**: Clarified that safe deployment in Phase J-3E inventory cards is strictly visual-only. Mock interactive sell buttons must not be shown. A disabled upcoming label may be shown only if clearly marked as future-only.
3. **Rigid J-3C Copy Rules**: Reinforced the localization cleanup scope to explicitly state that future developers must not globally replace `gacha` or `enhancement` where they are bound in javascript state keys, nor add terms implying active shards/breakage.
4. **Pristine Logic Maintenance**: Verified that zero changes exist in `index.html` runtime structures, cost curves, or save files. All actions remain strictly documentation-only.

---

## ⚒️ 14. Phase J-3C: Smith & Shards Copy Cleanup (Complete)

We have successfully executed Phase J-3C (Smith & Shards Copy Cleanup) by refactoring player-facing Korean strings and labels inside [index.html](file:///c:/Users/ryan/dev/money-game/index.html) to perfectly match the gritty battlefield forge fantasy.

### ⚒️ A. Key Copy Transformations
1. **Module & GNB Branding**: Refactored the generic "스미스 앤 셔드" tab header and containers to `"스미스 앤 셔드 (전쟁 대장간)"` in Korean UI.
2. **Draw / Gacha Localizations**:
   - `Claim Starter Weapon` $\rightarrow$ `"보급 병기 지원 (스타터 팩)"`
   - `Draw Cost` $\rightarrow$ `"보급 소환 비용"`
   - `Draw 1` / `Draw 10` $\rightarrow$ `"1회 소환"` / `"10회 소환"`
   - `Last Pull` $\rightarrow$ `"최근 소환 획득"`
   - `Recent Pulls` $\rightarrow$ `"최근 소환 내역"`
   - Updated descriptive blocks to use `"용병/장비 소환"` instead of abstract 모집/가챠.
3. **Refining & Anvil Actions**:
   - `Enhance Button` $\rightarrow$ `"⚒️ 모루 타격"`
   - `Cost` / `Chance` labels $\rightarrow$ `"제련 비용"` / `"제련 확률"`
   - `Last Enhancement` $\rightarrow$ `"최근 모루 타격 결과"`
4. **Inventory & Equipment**:
   - `Inventory` $\rightarrow$ `"무기 보관고 (인벤토리)"`
   - `Equip First` $\rightarrow$ `"첫 무기 장착 (Deploy)"`
   - `Unequip` $\rightarrow$ `"장착 해제 (Recall)"`
5. **Notice Banner Addition**: Inserted a premium, subtle, non-interactive banner at the bottom of the tab content container:
   - *“⚒️ [안내] 현재 버전에서는 전쟁 대장간 무기 제련(강화) 및 장원 대원 무기 배치(장착)만 지원됩니다. 향후 무기 파괴, 파편 회수, 암시장 판매 시스템이 추가될 예정입니다.”*
6. **Technical State Segregation**: Left all underlying state variables (`gacha`, `enhancement`, `weaponLevels`, `weaponMastery`, `getEnhanceCost`, `getEnhanceChance`) pristine to maintain full save file and mechanical integrity. No game logic was altered.



