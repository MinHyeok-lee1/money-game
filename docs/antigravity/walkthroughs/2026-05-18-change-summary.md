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

