# 자본전선: 데드라인 - Cross-System War Cohesion Pass (Phase J-4E)

This document specifies the structural cross-module cohesion mappings and presentation indicators implemented under **Phase J-4E: Cross-System War Cohesion Pass**. It connects all target modules into a single, unified collapsing frontline metaphor without introducing breaking save schemas or persistent database states.

---

## 🌐 1. Top-Level Telemetry HUD: Global War Status Strip
We injected a beautiful, monospaced **Global War Status Strip** directly inside the top-level sticky GNB Wallet Header. It derives four reactive, tactical indicators in real-time based on the player's memory state:

| Telemetry indicator | Derived Resource Mapping | Status Ratios | Aesthetic Styling |
|---|---|---|---|
| **전선 안정도 (Frontline Stability)** | Current RPG stage | `SECURE` (1-10) / `ENGAGED` (11-50) / `UNSTABLE PRE-WARP` (51-100) / `CRITICAL COLLAPSE` (101+) | Deep slate boundary with emerald/amber/red animations |
| **병참 상태 (Logistics Status)** | Current wallet cash | `CRITICAL DEPLETION` (<10k) / `MARGINAL SUPPLY` (10k+) / `STABLE RESERVES` (1M+) / `SURPLUS OVERLOAD` (100M+) | Deep slate with flashing warning animations |
| **사령부 위신 (Command Prestige)** | Landlord properties count & Rebirth level | Level scales dynamically: `REAR ADMIRAL` (LV.1+) / `FRONT BRIGADIER` (LV.4+) / `FLEET COMMANDER` (LV.9+) / `SUPREME CHIEF` (LV.16+) | Monospaced high-contrast amber indicator |
| **위협 등급 (Threat Level)** | Current RPG stage | `TIER I (MINIMAL)` (1-10) / `TIER II (ELEVATED)` (11-50) / `TIER III (HIGH)` (51-100) / `TIER IV (HAZARD)` (101-150) / `TIER V (REAPER)` (151+) | Dynamic pulsing hazard flash alerts |

---

## 🏢 2. Rear Artillery & Depot Cohesion (Frontier Master)
- **Artillery Ticker Messages**: Upgraded to directly announce the rearward artillery support actions:
  - `🔥 [전선 화력 지원 가능] 포격 개시! 전선 화력 지원`
  - `💣 [전쟁 자금 확보] 군수 거점 돌파 시도`
  - `💰 [병참선 안정화] 사령부 전쟁 세금 징수`
  - `📦 [병참선 안정화] 후방 보급 라인 기동`
  - `⚡ [전선 화력 지원 가능] 화력 지원 부대 급파`
  - `📡 [전선 화력 지원 가능] 최전방 전술 신호 연결`
- **Depot Reclamation / Upgrade Logs**: When outposts are captured or clickers upgraded, active combat logs are dynamically broadcast to the Frontline operations terminal feed:
  - `📦 [병참선 안정화] {Zone Name} 구역 수복 완료! 전방 보급 물자 수송 정상화 개시`
  - `🔥 [전선 화력 지원 가능] 후방 포격 화력 배율 상향 완료!`

---

## 📈 3. Prediction Morale & Survival Cohesion (Hero's Fate)
- **Modelling / Previews**: Running dry-run contract models prints telemetry data to the scrolling battlefield operations terminal:
  - `📡 [전선 생존 가능성 재평가] {Contract Name} 모의 시뮬레이션 개시: 성공률 {Odds}% 추정 (사령부 위신 분석)`
- **Tactical Settlements**: Resolving live contract predictions triggers tactical morale status alerts:
  - **Success**: `📈 [사령부 위신 변동] 지하 계약 작전 성공! 전선 유지력 확보 및 사령부 위신 상승`
  - **Failure**: `🚨 [부대 사기 영향] 지하 계약 전선 붕괴! 부대 사기 극도로 저하 및 추가 물자 보급 급무`

---

## ⚒️ 4. Hydraulic Forging Firepower Cohesion (Smith & Shards)
- **Anvil Upgrades & Sandbox Strikes**: Refined upgrades feed physical frontline armory reinforcement indicators to the scrolling operations logs:
  - **Success**: `⚒️ [병기 품질 상승] {Weapon Name} 제련 성공! (전선 화력 강화 예상 및 대원 장착 효율 상승)`
  - **Failure**: `⚠️ [제련 안정성 충격 감지] {Weapon Name} 제련 실패! (병기 연마 품질 불안정 및 차기 화력 전력 대기)`

---

## 🌲 5. Outpost Combat System Dependency (Frontline Command)
- **Combat Ticks events**: Integrated clear cross-system resource dependencies directly inside the active battlefield operations log feed:
  - `🚨 [병기 강화 효과 대기] 적 개체 접근 중 - 방어막 충격 감지!`
  - `📡 [병참 지원 필요] 최전방 화력 지원 분대 격전 중!`
  - `💥 [사령부 자본 투입 권장] 아군 원격 포격 지원 포탄 분대 투하 완료`
  - `👥 [병참 지원 필요] 대원들 최선 전선 사수 대형 및 재장전 개시`
  - `🔋 [병기 강화 효과 대기] 방어망 에너지 쉴드 긴급 충전 순차 기동 중`

---

## 🔒 6. Zero-Mutation Compliance Confirmed
We executed rigorous checks to verify that:
1. All derived states are transient and computed in-memory.
2. `GAME_STATE_STORAGE_KEY` and save configurations are unmodified.
3. Core combat formulas, rebirth metrics, settlement payouts, and enhancement chances are completely preserved.
