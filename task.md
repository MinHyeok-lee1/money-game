# 🎯 Money Game Universe - Task & Milestone Tracker

## 🏁 Milestone 1: 기초 공사 및 통합 지갑 (Global Wallet) 연동

**목표:** 기존 독립된 게임을 생태계의 일부로 편입하고, 여러 탭을 오갈 수 있는 뼈대 구축.

- [x] 1-1. `localStorage` 마스터 지갑(Global Wallet) 스키마 정의 및 초기화 로직 구현.
- [x] 1-2. 게임 간 화면 전환을 위한 최상단 네비게이션 탭(GNB) UI 추가 (건물주 / 투자 / 강화 / RPG).
- [x] 1-3. 기존 `Idle Landlord`의 재화를 `Global Wallet`의 `cash`로 마이그레이션 연동.

**Milestone 1 complete:** Global Wallet state is saved under `moneyGameUniverseStateV1`; legacy `idleLandlordSaveV4` data is migrated and removed.

## 🏁 Milestone 2: 투자 게임 (Investment Master) 구현

**목표:** 하이리스크 하이리턴의 변동성 시장 엔진 구축.

- [x] 2-1. 실시간 가격 변동 알고리즘(Random Walk) 뼈대 구축.
- [x] 2-2. 우량주/잡코인 종목 데이터 구성 및 차트 UI 렌더링.
- [x] 2-3. 매수/매도 로직 구현 및 Global Wallet의 `cash`와 연동.

**Milestone 2 complete:** Investment tab has a basic static asset list, bounded active-tab price updates, Buy 1/Sell 1, Buy Max/Sell All, portfolio metrics, lightweight mini charts, average buy price, and unrealized gain/loss connected to Global Wallet `cash`.

## 🏁 Milestone 3: 뽑기 및 무기 강화 시스템 (Gacha & Enhancement)

**목표:** 잉여 자본을 소모할 핵심 콘텐츠 설계.

- [x] 3-1. 캐릭터 뽑기(Gacha) UI 및 확률형 획득 로직 구현.
- [ ] 3-2. 무기 강화 시스템 (성공/실패/하락/파괴) 및 이펙트 구현.
- [ ] 3-3. 장착 및 시너지(캐릭터+전용무기) 데이터 구조 세팅.

**Milestone 3B complete:** Enhancement tab has Draw 1/Draw 10, shared wallet spending, rarity counts, recent pull history, and inventory controls.

**Milestone 3C complete:** Basic weapon enhancement is available for weapon items with shared wallet spending, level cap, success/failure result, and safe item-level persistence.

**Milestone 3-3A complete:** Added the 52-character static data foundation for future equipment, synergy, and Idle RPG combat; full 3-3 gameplay integration remains pending.

**Milestone 3-3B complete:** Added canonical owned character instances under `gameState.rpg.characters` with safe normalization and unique instance IDs; full 3-3 gameplay integration remains pending.

**Milestone 3-3C complete:** Character gacha pulls now create owned RPG character instances while weapon pulls remain in Enhancement inventory; full 3-3 gameplay integration remains pending.

**Milestone 3-3D complete:** Added basic weapon equip/unequip foundation using character `equippedWeaponInstanceId`; full 3-3 gameplay integration remains pending.

**Milestone 3-3E complete:** Preferred weapon synergy foundation is implemented with character `preferredWeaponType` comparison, safe normalization, and bounded synergy multipliers visible in UI.

**Milestone 3-3F complete:** Faction synergy foundation is implemented with owned character faction counting and multiplier previews (x1.05 for 2, x1.12 for 3, x1.25 for 4+ same faction) visible in UI.

**Milestone 3-3G complete:** Final QA and documentation alignment for equipment and synergy data structure are complete.

**Milestone 3-3 complete:** The RPG character and weapon equipment foundation is fully integrated.
- 52-character definitions with faction/rarity balance.
- Canonical owned character instance management.
- Gacha integration for both characters and weapons.
- Weapon equip/unequip foundation.
- Preferred weapon synergy preview and safe normalization.
- Faction synergy preview and derived multiplier logic.
- All systems use shared Global Wallet `cash` and preserve tab-scoped passive behaviors.

## 🏁 Milestone 4: 방치형 RPG (Idle RPG) 구현

**목표:** 강화된 캐릭터로 몬스터를 사냥하고 특수 재화를 파밍하는 엔드 콘텐츠.

- [ ] 4-1. 자동 전투 엔진 (캐릭터 합산 DPS vs 몬스터 체력) 구현.
- [ ] 4-2. 무한 스테이지 등반 및 보스전 로직.
- [ ] 4-3. 몬스터 처치 시 특수 재화(다이아몬드 등) 획득 및 마스터 지갑 연동.

## 🏁 Milestone 5: 명예 환생 및 클라우드 세이브 (Endgame & Security)

**목표:** 무한 순환 루프 완성 및 데이터 안정성 확보.

- [ ] 5-1. 유니버스 전체 초기화(Hard Reset) 및 명예 포인트(Honor) 획득 로직.
- [ ] 5-2. 명예 상점 (영구 버프 구매) 구현.
- [ ] 5-3. Base64 세이브 데이터 Import/Export 기능.
