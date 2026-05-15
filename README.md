# 🌌 Money Game Universe

> 단순한 방치형 게임을 넘어선 완벽한 경제 순환 생태계!
> 안정적인 패시브 인컴(건물주), 하이리스크 하이리턴(투자), 확률형 스펙업(강화 및 뽑기), 그리고 최종 콘텐츠(RPG)까지 하나의 통합된 자본으로 이어지는 거대한 웹 게임 유니버스입니다.

🔗 **Live Demo:** [https://money-game-zeta.vercel.app](https://money-game-zeta.vercel.app)

## ✨ 핵심 콘텐츠 (Core Modules)

> **Architecture note:** The four modules share a single Global Wallet state but operate as a **horizontal economy**. Landlord `cash` is a booster, not a prerequisite — each module has its own entry currency. The old vertical "cash → everything" dependency is removed.

1. **🏢 Idle Landlord (건물주 키우기 - Current)**
   - 클릭 및 10단계 부동산 투자를 통한 안정적인 기초 자본(Cash) 생산.
   - 환생(Rebirth)을 통한 영구적인 수익 배수(Multiplier) 획득.
   - `cash` is now a cross-module booster, not the mandatory gateway to other tabs.
2. **📈 Defense Contracts / Hero's Fate Betting (투자 → 방어 계약 - Current)**
   - Investment tab reframed as a Defense Contracts / Hero's Fate Betting system. Backed by the existing Buy/Sell engine (Back/Exit controls, sparklines, portfolio metrics).
   - Investment runs on its own `investment.capital` — players can enter without prior Landlord earnings.
   - Defense Contracts odds preview, bet slip, deterministic settlement preview, and preview history are live.
   - Settlement gate is in place. Real settlement, stake deduction, and payout are **unlocked via Dorothy Proposal acknowledgement** (Stage 100 boundary).
3. **🗡️ Gacha & Enhancement (캐릭터 뽑기 및 강화 - Current)**
   - Gacha pulls spend RPG `dividends` (no longer forced through Landlord `cash`).
   - Enhancement tracks permanent weapon progression via `weaponMastery` / `weaponLevels`.
   - 52-character static roster with factions, rarities, and preferred weapon synergies.
4. **🌲 Idle RPG (방치형 RPG - Current)**
   - Auto-combat engine with stage progression, Dividends rewards, and ATK/SPD/PEN stat upgrades.
   - RPG runs use a ticket-gated `rpg.run.activeUnits` structure (volatile per-run units).
   - Normal Ending boundary at Stage 100; Dorothy Proposal script foundation implemented.
   - Infinite Mode mechanics and External Capital Leverage remain locked.

## 🛠 기술 스택 (Tech Stack)

- **Frontend:** HTML5, Tailwind CSS
- **Framework:** React.js 18 (CDN), Babel
- **Architecture:** Single Page Application (SPA) with Global LocalStorage State
- **Deployment:** Vercel, GitHub Actions

## 📈 현재 개발 상태 (Status)

- Phase 1 (Idle Landlord) 구현 완료.
- 생태계 확장을 위한 `task.md` 마일스톤 설계 완료.

### Milestone 1 Completion

- All four modules are playable. Global Wallet Header shows shared state across tabs.
- Canonical localStorage key: `moneyGameUniverseStateV1`.
- Legacy `idleLandlordSaveV4` saves are migrated into the canonical state and removed.
- UI: all tabs use a unified Emerald theme; i18n driven by `settings.language`.

### Milestone 2 Completion

- Investment runs on its own `investment.capital` (independent of Landlord earnings).
- Investment Master includes static assets, bounded price history, SVG sparklines, Buy 1/Sell 1, Buy Max/Sell All, portfolio value, net worth, average buy price, and unrealized gain/loss.
- Trading is bounded to the active Investment tab only.

### Milestone 3-3 Completion

- Gacha and inventory system foundations are complete.
- Static data for 52 unique characters with factions (Realty, Ticker, Luxury, Shadow) and rarities is implemented.
- Owned characters are stored as canonical instances with unique IDs.
- Gacha pulls spend RPG `dividends` (not Landlord `cash`).
- Enhancement tracks permanent progression via `weaponMastery` / `weaponLevels`.
- Basic equipment foundation: characters can equip/unequip weapons via instance IDs.
- Preferred weapon synergy foundation: x1.25 multiplier (capped) for matching character preference.
- Faction synergy foundation: multiplier previews for owning multiple characters of the same faction.

### Milestone 4 (In Progress)

- RPG Master Blueprint adopted (`RPG_MASTER_BLUEPRINT.md`) covering "Sponsor to God" progression.
- Auto-combat engine with stage progression, Dividends rewards, and ATK/SPD/PEN stat upgrades implemented.
- RPG runs use ticket-gated `rpg.run.activeUnits` (volatile per-run units); legacy `rpg.characters` preserved for save compatibility.
- Normal Ending boundary at Stage 100; `normalEndingReached` / `normalEndingSeen` state fields and three-way mode label implemented.
- Dorothy Proposal script foundation implemented (`DOROTHY_SCRIPTS`, KO/EN localization, acknowledge handler).
- Defense Contracts / Hero's Fate Betting presentation and preview foundations are complete. Real settlement is unlocked after Dorothy acknowledgement.

**Next recommended steps:**
1. Faction/Rarity signal integration — add granular character-specific bonuses to the success chance formula.
2. Infinite Mode scaling — monster HP growth and stage rewards beyond Stage 100.
