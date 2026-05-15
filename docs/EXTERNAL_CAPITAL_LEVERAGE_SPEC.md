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
