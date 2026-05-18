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
- **No Temporary Scripts**: No temporary patch scripts or disposable helper files were created or left in the workspace.
