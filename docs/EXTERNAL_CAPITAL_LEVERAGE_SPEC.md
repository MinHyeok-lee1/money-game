# 🏛️ External Capital Leverage Specialization (Phase G-3)

## 📖 Vision
Phase G-1 provided the "Broad Leverage" (Total Wealth, Liquidity, Rebirths). Phase G-3 introduces **Specialization**, allowing players to tune their RPG combat performance based on the *composition* of their economic empire. 

Players are no longer just "rich"; they are "Industrialists," "Day Traders," or "Lunar Pioneers," each providing unique advantages against the Infinite Mode wall.

---

## 🏗️ Real Estate Specialization Mapping
Landlord properties influence core combat stability and authority.

| Category | Properties | RPG Stat Influence | Design Intent |
| :--- | :--- | :--- | :--- |
| **Foundation** | Tier 1-3 (Hotdog, Conv, Pizza) | **Base ATK Stability** | Rewards early-game completion. |
| **Community** | Tier 4-5 (Coffee, Cyber Cafe) | **ACC (Accuracy)** | "Community precision" to reduce misses. |
| **Enterprise** | Tier 6-7 (Luxury Apt, Supermarket) | **SPD (Speed)** | "High volume logistics" for attack frequency. |
| **Authority** | Tier 8-9 (Hotel, Global Tower) | **PEN (Penetration)** | "Institutional authority" to bypass late-game DEF. |
| **Frontier** | Tier 10 (Lunar Colony) | **Pressure Breaker** | Authority multiplier (DMG bonus) applied against Stage 101+ enemies. |

---

## 📈 Investment Portfolio Specialization Mapping
Portfolio composition influences faction-specific lethality and burst potential.

| Asset Type | Primary Stat | Faction Bridge | Design Intent |
| :--- | :--- | :--- | :--- |
| **Blue-Chip Stocks** | Crit Damage | **Realty** | Stability and high-value strikes. |
| **Growth Stocks** | Action Rate (SPD) | **Ticker** | High-frequency trading, high-frequency attacks. |
| **Meme/Crypto** | Crit Rate | **Shadow** | Volatile, high-risk "Lethality" builds. |
| **Net Worth** | Faction Synergy | **Luxury** | Pure wealth amplifies character synergies. |

---

## 🌉 Faction Bridge Table
Connecting economic activity to the 4 RPG Factions.

| Faction | Economic Anchor | Scaling Metric |
| :--- | :--- | :--- |
| **Realty** | Real Estate Diversification | Number of unique property types owned (max 10). |
| **Ticker** | Growth Portfolio Value | Total invested cost basis in Ticker-type (Growth) assets. |
| **Shadow** | High-Risk Exposure | Total value of assets with >8% volatility. |
| **Luxury** | Absolute Wealth | Net Worth milestones (1B, 1T, 1Q, etc.). |

---

## ⚖️ Balance Constraints
- **Multiplicative Stacking**: Specialization bonuses stack multiplicatively with the G-1 Broad Leverage to prevent either system from becoming obsolete.
- **Dorothy Gate**: Remained locked until Stage 100 Boss clear / Dorothy Proposal acknowledgement.
- **Diminishing Returns**: Specialized stats use square-root or logarithmic scaling to prevent "infinite power loops."
- **Infinite Integrity**: Even a "Perfect Specialization" should eventually hit a wall at Stage 500/1000+, maintaining the "Infinite Mode" status.

---

## 📅 Implementation Plan (Phase G-3B)

### 1. Logic (Pure Helpers)
- [x] Implement `getExternalCapitalSpecializationStats(state)` in `index.html`.
- [x] Update `getRpgCombatStats(state)` to incorporate the results of the specialization helper.
- [ ] Update `calculateDefenseContractTacticalSignal` to reflect specialization bonuses in Hero's Fate previews.

### 2. UI/UX
- [x] Extend the RPG "External Capital Leverage" panel with a "Specialization" section.
- [x] Add tooltips or small icons for each specialization category.
- [x] Clearly label "Locked" specializations with the required property/asset milestone.

### 3. Data Integrity
- [x] No changes to the `localStorage` schema are required, as all specialization values are derived from existing property/investment state.

---

## 🛰️ Tactical Signal Synchronization (Phase G-4)

### 1. Vision
External specialization shouldn't just be a stat stick; it should enhance the player's ability to analyze and execute high-stakes Defense Contracts. "Synchronization" creates a bridge where your portfolio build directly clarifies the tactical signals of matching contracts.

### 2. Alignment Signal (Proposed)
| Metric | Condition | Effect |
| :--- | :--- | :--- |
| **Portfolio Alignment** | Contract Faction matches Portfolio Specialization | +1% per squad unit of that faction. |
| **Authority Insight** | PEN Specialization Level > 2 | Flat +1% insight bonus (Max +2%). |

### 3. Cap & Balance (G-4A)
- **Shared Cap**: Specialization signals should share a unified cap with the Squad Tactical Signal.
- **Proposed Cap Expansion**: Total Tactical Signal cap increases from **+12%** to **+15%**.
- **Double-Counting Prevention**: Alignment signals use the *Specialization Tier* (built through cost basis/diversity), not the raw *Leverage Value* (built through total wealth). This ensures the "God of Wealth" and the "God of Tactics" are distinct builds.

---

## ✅ Integration QA (Phase G-3C)
- [x] **Gating**: Verified that all bonuses are 0 until `normalEndingSeen` is true.
- [x] **Bounds**: Verified that property bonuses are finite (capped by max 10 properties) and investment bonuses use logarithmic scaling.
- [x] **Double-Counting**: Verified that specialization bonuses are additive within the `totalAtkMult` and do not re-apply existing leverage sources.
- [x] **Hero's Fate Integrity**: Confirmed that `calculateDefenseContractSuccessChance` remains independent of specialization bonuses for now (no Tactical Signal leak).
- [x] **Pressure Breaker**: Confirmed `pressureMult` is player-side and only active at Stage 101+.
