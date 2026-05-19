# 자본전선: 데드라인 - Immediate Dopamine Feedback Pass (Phase J-4D)

This document specifies the technical design, tactile mechanics, and reactive animations implemented during **Phase J-4D: Immediate Dopamine Feedback Pass** to ensure that every single interaction in **자본전선: 데드라인** results in immediate, heavy emotional and physical reactions from the game world within 1–3 seconds of a player's click.

---

## 🏢 1. Frontier Master (후방 자원 확보)
**Tactical Metaphor**: Commanding Rear Artillery Fire Support.

### A. The Radar Interface
- Replaced the generic flat `TAP!` button with a dark military-grid radar sweep.
- Includes green circular scan overlays and horizontal sweep line grids to represent active telemetry.

### B. Immediate Click Action Feedback
- **Recoil Screen Flash**: Clicking the grid triggers a rapid `isArtilleryFlashing` state, flashing the canvas deep red/amber and scaling the container down by `95%` (physical recoil).
- **Artillery Fire Sounding**: Randomizes a list of dynamic combat telemetry tickers in real-time on every click:
  - `"📡 ARTILLERY BATTERY 1 ACTIVE"`
  - `"💥 DEFENSE GRID OVERLOADED"`
  - `"📢 REQUESTING REINFORCEMENTS"`
  - `"🔥 AMMUNITION RESERVES DEPLETED"`
  - `"🛰️ ORBITAL RADAR GRID ENGAGED"`

---

## 📈 2. Hero's Fate (지하 전선 생존 예측)
**Tactical Metaphor**: physically dangerous underground high-stakes military defense contracts.

### A. Sibling Outcome Banner Alert
- Intercepts betting contract settlements to trigger an immediate full-width tactical toast alert.
- Renders at the top of the interface:
  - **Success**: `🏆 BATTLE OPERATIONAL SUCCESS` in emerald text with high-contrast glowing green boundaries and clear profit logs.
  - **Loss**: `🚨 BATTLE DEFENSE FAILED` in crimson text with flashing red alert margins and casualty summaries.
- Includes a manual closure boundary to keep the user inside the tactical combat flow.

---

## ⚒️ 3. Smith & Shards (전쟁 대장간)
**Tactical Metaphor**: Heavy hydraulic anvil forging under volatile tension.

### A. Heavy Anticipation Recoil Delay
- Clicking `STRIKE ANVIL` no longer resolves instantly. It blocks interaction and triggers a **450ms heavy physical strike delay**.
- **Anvil Shaking Tremors**: During the 450ms delay, the entire weapon detail card vibrates violently using a custom CSS keyframe shake (`.animate-anvil-shake`).
- **Anvil Recoil Compression**: The card scales inward (`scale-95`) to represent hydraulic anvil impact pressure.

### B. High-Fidelity Spark Glow Overlay
- **Success Glow**: Upgrading successfully triggers `enhanceSuccessPulse` for 1000ms, surrounding the weapon screen with a bright emerald glow and displaying `⚡ 제련 성공 (UPGRADE SUCCESS) ⚡`.
- **Fail Glow**: Upgrading failures trigger `enhanceFailPulse` for 1000ms, flashing the card with a crimson warning border and displaying `⚠️ 위험: 제련 실패 (UPGRADE FAILED) ⚠️` in a pulsing warning animation.

---

## 🌲 4. Frontline Command (최전선 지휘부)
**Tactical Metaphor**: Actively defending a reinforced frontline outpost against incoming Reaper waves.

### A. Battlefield Recoil Vibration Flash
- During active runs, each 1-second combat tick triggers a heavy screen shake recoil and red radial shockwave alert flash overlay across the battlefield arena card container.
- Simulates real-time wave pressure impact in the active sector.

### B. Real-Time Operations scrolling terminal feed
- Added a Scrolling monospaced **Tactical Operations Terminal** above the stats overview card.
- Automatically writes real-time status tickers on each active combat tick:
  - `"🚨 적 개체 접근 중 - 방어막 충격 감지!"`
  - `"📡 최전방 화력 지원 분대 격전 중!"`
  - `"💥 아군 원격 포격 지원 포탄 분대 투하 완료"`
  - `"👥 대원들 최선 전선 사수 대형 및 재장전 개시"`
  - `"🔋 방어망 에너지 쉴드 긴급 충전 순차 기동 중"`
- Includes active blinking green status pulse indicators to represent live tactical transmissions.

---

## 🔒 5. Zero-Mutation Guardrails Compliance
To maintain absolute compliance with production stability rules, all visual states operate on in-memory transient hooks:
1. **No Save-Schema Changes**: Transient states are never saved or committed to local storage.
2. **Core Preservation**: Combat tick calculations, damage figures, and economic ratios are untouched.
3. **Save Portability**: The canonical save string formats remain fully compatible with current versions.
