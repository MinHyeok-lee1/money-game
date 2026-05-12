# 🌌 Money Game Universe - Master TODO List

## 🏗 Phase 0: System Architecture & Global State (기초 공사)

- [ ] **통합 지갑 (Global Wallet) 구축:** 모든 게임 모드에서 공유되는 `localStorage` 기반 마스터 지갑(`cash`, `diamonds`, `honorPoints`) 설계.
- [ ] **네비게이션 (GNB):** 게임 간(건물주 ↔ 투자 ↔ 강화 ↔ RPG) 데이터를 유지하며 부드럽게 화면을 전환할 수 있는 탭 UI 구현.
- [ ] **데이터 안전망 (Data Security):**
  - 1단계: 세이브 데이터 암호화(Base64 등) 기반 텍스트 내보내기/불러오기(Export/Import) 기능.
  - 2단계: 추후 Firebase/Supabase 등을 연동한 클라우드 저장 시스템 구축.
- [ ] **통합 데이터 스키마 적용:**

  ```json
  {
    "wallet": { "cash": 0, "diamonds": 0, "honorPoints": 0 },
    "landlord": { "properties": [], "rebirthCount": 0, "multiplier": 1 },
    "investment": { "holdings": [] },
    "enhancement": { "inventory": [], "failStacks": 0 },
    "rpg": { "characters": [], "highestStage": 0 }
  }
  ```

## 🏢 Phase 1: Idle Landlord (기본 수익 / 안전망)

- [x] 클릭 및 패시브 인컴(초당 수익) 시스템 구현.
- [x] 10단계 부동산 투자 트리 및 1.15배 가격 상승 로직 구현.
- [x] 환생(Rebirth) 및 영구 수익 배수(Multiplier) 시스템 구현.
- [ ] **[Refactor]** 기존 데이터를 Phase 0의 `Global Wallet` 구조로 마이그레이션 및 연동.

## 📈 Phase 2: Investment Master (하이리스크 / 하이리턴)

- [ ] **가상 시장 엔진:** 변동성 알고리즘을 적용한 실시간 주식/코인 차트.
- [ ] **투자 종목 설계:** 우량주(배당금) vs 잡코인(상장폐지 리스크).
- [ ] **매매 UI:** 실시간 포트폴리오 가치 및 평단가 추적 시스템.

## 🗡️ Phase 3: Weapon Enhancement (자본 소모 / 전용 무기)

- [ ] **무기 강화 시스템:** 성공/실패 애니메이션 및 스택(천장) 시스템.
- [ ] **전용 장비 시스템:** 특정 무기가 후술할 RPG 캐릭터와 만났을 때 폭발적인 시너지 효과(ex: 장비 + 장팔사모) 부여.

## 🦸‍♂️ Phase 4: Idle RPG (캐릭터 수집 및 무한 순환 엔드게임)

- [ ] **캐릭터 픽업(Gacha) 시스템:**
- 등급: 일반(Normal) - 희귀(Rare) - 에픽(Epic) - 유니크(Unique) - 레전더리(Legendary) - 신화(Mythic)
- 재화: Phase 1 & 2에서 획득한 돈이나 다이아몬드 소모.

- [ ] **합성(Merge) 시스템:** 하위 등급 캐릭터 여러 마리를 합성하여 상위 등급 캐릭터 획득.
- [ ] **시너지 및 장착 시스템:**
- 뽑은 캐릭터에 Phase 3에서 강화한 무기를 장착.
- 클래스/팩션 조합 버프 및 전용 무기 시너지 구현.

- [ ] **자동 전투 및 무한 스테이지:** 편성된 캐릭터들의 합산 DPS로 몬스터를 격파하며 스테이지 등반.
- [ ] **순환 재화 드랍:** 보스 처치 시 특수 재화를 드랍하여 Phase 1(특수 건물) 및 Phase 2(내부 정보)에 재투자.

## ♾️ Phase 5: Prestige & Honor (무한 환생 생태계)

- [ ] **명예(Honor) 환생 시스템:** RPG 스테이지 한계 도달 시 '명예 포인트'를 얻고 유니버스 전체를 초기화(하드 리셋).
- [ ] **명예 상점:** 초기화되지 않는 영구적인 특수 버프(뽑기 확률 증가, 건물 가격 할인, 강화 파괴 방지권 등) 구매.
