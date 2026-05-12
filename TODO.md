# 🌌 Money Game Universe - Master TODO List

## 🏗 Phase 0: System Architecture & Global State (기초 공사)

- [ ] **통합 지갑 (Global Wallet) 구축:** 모든 게임 모드에서 공유되는 `localStorage` 기반 마스터 지갑(`cash`, `diamonds`) 설계.
- [ ] **네비게이션 (GNB):** 게임 간(건물주 ↔ 투자 ↔ 강화 ↔ RPG) 데이터를 유지하며 부드럽게 화면을 전환할 수 있는 탭 UI 구현.
- [ ] **통합 데이터 스키마 적용:**

  ```json
  {
    "wallet": { "cash": 0, "diamonds": 0 },
    "landlord": { "properties": [], "rebirthCount": 0, "multiplier": 1 },
    "investment": { "holdings": [] },
    "enhancement": { "weaponLevel": 0, "failStacks": 0 },
    "rpg": { "highestStage": 0 }
  }
  ```

## 🏢 Phase 1: Idle Landlord (기본 수익 / 안전망)

- [x] 클릭 및 패시브 인컴(초당 수익) 시스템 구현.
- [x] 10단계 부동산 투자 트리 및 1.15배 가격 상승 로직 구현.
- [x] 환생(Rebirth) 및 영구 수익 배수(Multiplier) 시스템 구현.
- [ ] **[Refactor]** 기존의 독립적인 게임 데이터를 Phase 0의 `Global Wallet` 구조로 마이그레이션(이동) 및 연동.

## 📈 Phase 2: Investment Master (하이리스크 / 하이리턴)

- [ ] **가상 시장 엔진:** 랜덤 워크(Random Walk) 및 변동성 알고리즘을 적용한 실시간 주식/코인 차트 구현.
- [ ] **투자 종목 설계:**
- 우량주 (낮은 변동성, 안정적인 배당금 지급)
- 잡코인 (극단적인 변동성, 상장폐지 리스크 존재)

- [ ] **매매 UI:** 매수/매도 버튼, 실시간 포트폴리오 가치 및 평단가 추적 시스템.

## 🗡️ Phase 3: Weapon Enhancement (자본 소모 / 핵심 스펙)

- [ ] **강화 UI:** 대장간 컨셉의 직관적인 UI 및 성공/실패 타격감(애니메이션) 부여.
- [ ] **확률 엔진:**
- 안전 강화 구간 (+1 ~ +5 강)
- 위험 구간 (강화 실패 시 수치 하락 또는 무기 파괴 리스크)

- [ ] **천장 시스템 (Pity System):** 실패 시 '스택'이 쌓여 다음번 강화 성공 확률 증가.
- [ ] **파산 안전망:** 자본이 $0이 될 경우 '기본 지원금($1,000)' 무한 지급 로직 (건물주 게임이 궤도에 오르면 무의미해지는 구조).

## 🌲 Phase 4: Idle RPG (엔드게임 / 보상 순환)

- [ ] **전투 엔진:** Phase 3의 `weaponLevel`이 캐릭터의 DPS(초당 데미지)를 100% 결정하는 자동 전투 시스템.
- [ ] **몬스터 스케일링:** 체력이 기하급수적으로 늘어나는 무한 스테이지.
- [ ] **전리품(Loot) 시스템:** 보스 처치 시 특수 재화(다이아몬드 등) 드랍.
- [ ] **유니버스 순환 루프:** 획득한 특수 재화를 Phase 1(건물주)의 특수 업그레이드나 Phase 2(투자)의 내부 정보 구매 등에 사용 가능하게 연결.
