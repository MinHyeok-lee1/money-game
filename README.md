# 🌌 Money Game Universe

> 단순한 방치형 게임을 넘어선 완벽한 경제 순환 생태계!
> 안정적인 패시브 인컴(건물주), 하이리스크 하이리턴(투자), 확률형 스펙업(강화 및 뽑기), 그리고 최종 콘텐츠(RPG)까지 하나의 통합된 자본으로 이어지는 거대한 웹 게임 유니버스입니다.

🔗 **Live Demo:** [https://money-game-zeta.vercel.app](https://money-game-zeta.vercel.app)

## ✨ 핵심 콘텐츠 (Core Modules)

1. **🏢 Idle Landlord (건물주 키우기 - Current)**
   - 클릭 및 10단계 부동산 투자를 통한 안정적인 기초 자본(Cash) 생산.
   - 환생(Rebirth)을 통한 영구적인 수익 배수(Multiplier) 획득.
2. **📈 Investment Master (투자 고수되기 - Current)**
   - Static assets, bounded active-tab price updates, Buy/Sell controls, portfolio metrics, and lightweight sparklines.
3. **🗡️ Gacha & Enhancement (캐릭터 뽑기 및 강화 - Planned)**
   - 등급별 캐릭터 뽑기와 무기 강화 시스템, 전용 무기 시너지 로직.
4. **🌲 Idle RPG (방치형 RPG - Planned)**
   - 스펙업한 캐릭터들로 무한 스테이지를 등반하고 특수 재화를 파밍하는 엔드게임.

## 🛠 기술 스택 (Tech Stack)

- **Frontend:** HTML5, Tailwind CSS
- **Framework:** React.js 18 (CDN), Babel
- **Architecture:** Single Page Application (SPA) with Global LocalStorage State
- **Deployment:** Vercel, GitHub Actions

## 📈 현재 개발 상태 (Status)

- Phase 1 (Idle Landlord) 구현 완료.
- 생태계 확장을 위한 `task.md` 마일스톤 설계 완료.

### Milestone 1 Completion

- Current playable modules: Idle Landlord and Investment Master.
- Planned modules: Enhancement and RPG are visible as Coming Soon tabs.
- Global Wallet is now the shared state foundation.
- Canonical localStorage key: `moneyGameUniverseStateV1`.
- Legacy `idleLandlordSaveV4` saves are migrated into the canonical state and removed.

### Milestone 2 Completion

- Investment data is stored under the shared Global Game State.
- Investment trading uses shared wallet `cash`.
- Investment Master includes static assets, bounded price history, SVG sparklines, Buy 1/Sell 1, Buy Max/Sell All, portfolio value, net worth, average buy price, and unrealized gain/loss.
- Trading is bounded to the active Investment tab only.

### Milestone 3-3 Completion

- Gacha and inventory system foundations are complete.
- Static data for 52 unique characters with factions (Realty, Ticker, Luxury, Shadow) and rarities is implemented.
- Owned characters are stored as canonical instances with unique IDs.
- Character/Weapon gacha integration: characters go to RPG state, weapons go to Enhancement inventory.
- Basic equipment foundation: characters can equip/unequip weapons via instance IDs.
- Preferred weapon synergy foundation: x1.25 multiplier (capped) for matching character preference.
- Faction synergy foundation: multiplier previews for owning multiple characters of the same faction.
- Enhancement and Draw logic use shared wallet `cash`.

### Milestone 4 (In Progress)

- RPG Master Blueprint adopted (`RPG_MASTER_BLUEPRINT.md`) covering "Sponsor to God" progression.
- Basic idle combat engine with monster HP scaling and stage progression is implemented.
