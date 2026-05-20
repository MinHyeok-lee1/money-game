# L-5C — Black Market Economy Pressure & Inflation QA
**Date:** 2026-05-20  
**Phase:** L-5C  
**Scope:** Audit-only pass on L-5B economy systems. One confirmed fix applied.

---

## QA Target 1 — Infinite Mode Shard Pacing

`getKillsRequiredForStage` always returns **5** (5 kills = 1 stage advance).  
Formula: `totalShardsAwarded = Math.floor(2 + 2 * intensityTier * 0.1)` per kill.

| Stage | Tier | Raw total | Floored | 10 kills | Tokens/10 kills | Kills/token |
|-------|------|-----------|---------|---------|----------------|-------------|
| 101–109 | 1 | 2.2 | **2** | 20 shards | 0.20 | 50 |
| 110–119 | 2 | 2.4 | **2** | 20 shards | 0.20 | 50 |
| 120–129 | 3 | 2.6 | **2** | 20 shards | 0.20 | 50 |
| 130–139 | 4 | 2.8 | **2** | 20 shards | 0.20 | 50 |
| 140–149 | 5 | 3.0 | **3** | 30 shards | 0.30 | 34 ← first jump |
| 150–159 | 6 | 3.2 | **3** | 30 shards | 0.30 | 34 |
| 190–199 | 10 | 4.0 | **4** | 40 shards | 0.40 | 25 |
| 290–299 | 20 | 6.0 | **6** | 60 shards | 0.60 | 17 |
| 490–499 | 40 | 10.0 | **10** | 100 shards | 1.00 | 10 |
| 990–999 | 91 | 20.2 | **20** | 200 shards | 2.00 | 5 |

### Finding F-1 — Floor collision Tiers 1–4 (documentation only, no fix)
Stages 101–139 all produce exactly 2 shards/kill despite being labeled Tier 1/2/3/4.
The `Math.floor()` of a 0.1-increment formula does not produce visible increments until Tier 5 (Stage 140).
Players see no differentiation in shard rate across 39 stages.

**Assessment:** UX readability concern — documented but outside the allowed fix scope for L-5C
(fixing would require changing the base scalar or formula, not authorized here).
The first meaningful jump a player notices is at Stage 140 (+50%, 3 shards/kill).

**Friction risk:** LOW-MEDIUM — early Reaper players (101–139) grind at 50 kills/token.
At 5 kills/stage, that's ~10 stage clears per token, which is meaningful but not punishing.

### Risk flags
- **Inflation risk at Stage 490+:** 1 token per 10 kills (2 stage clears) is fast. Acceptable because:
  1. Players at Stage 490+ are deep-invested optimizers
  2. The 3-token targeted roll absorbs surplus
  3. The 5-entry pool has finite decision space

---

## QA Target 2 — Token Generation Pacing

**Single convert (`convertShardsToTokens`):**
- ✅ Rate: 100 shards → 1 token (SHARD_TO_TOKEN_RATE = 100 confirmed)
- ✅ `shards < cost` outer check + inner transaction re-check — no negative shards
- ✅ `toFiniteNumber` wraps all inputs — NaN/Infinity impossible

**Bulk convert (`convertAllShardsToTokens`):**
- ✅ `maxTokens = Math.floor(currentShards / 100)` — always integer
- ✅ 4-gate validation: `shards >= 100` · `maxTokens >= 1` · `isFinite && isInteger` · `maxTokens * 100 <= shards`
- ✅ Inner transaction re-validates all conditions
- ✅ `Math.max(0, shards - shardsDeducted)` — floor at 0
- ✅ `Math.max(0, tokens + maxTokens)` — floor at 0
- ✅ Edge: shards = 99 → Gate 1 blocks, no mutation

---

## QA Target 3 — Reroll Pressure & Spam Safety

**Rapid roll trace (10 calls, starting tokens = 5):**

Each call to `rollWeaponModification`:
1. Reads `gameState.wallet.blackMarketTokens` snapshot (may be stale)
2. Gates check snapshot — all 10 calls initially see 5 tokens and pass
3. Each queues `updateGameState((prev) => ...)` functional update
4. React composes these: each `prev` reflects the previous committed write
5. Inner guard: `if (prevTokens < 1) return prev` — fires on calls 6–10

**Result:** Exactly 5 deductions, no double-deduction, no corruption.

**Mods array:** Written as `mods: [selectedMod]` — always exactly 1 element.
`slot_overflow` gate (`currentMods.length > 1`) is unreachable under normal flow but protects against
external state corruption.

**Conclusion:** No spam vulnerability found. State is consistent under rapid input. ✅

---

## QA Target 4 — UI Readability & Economy Transparency

| Check | Status |
|---|---|
| 100:1 rate visible near conversion | ✅ "💎 {shards} → 🪙 {tokens} · 100:1" |
| Roll cost visible before rolling | ✅ "1 암시장 토큰 소모" below CTA |
| Bulk preview shows expected tokens | ✅ "예상 토큰: {Math.floor(shards/100)}" |
| Token balance visible in GNB | ✅ "🪙 {tokens}" amber glow in GNB header |
| Token stockpile advisory when > 20 | **MISSING — Fix applied** |

**Fix applied:** Added soft advisory `"토큰 재고 충분. 전술 개조를 시도하십시오."` inside the conversion
block, display-only (`bmt > 20`), no block on conversion or rolling.

---

## QA Target 5 — Inflation Safety Assessment

**Risk level: LOW (stages 101–200) / MEDIUM (stages 300+)**

- Stages 101–139: 50 kills/token — meaningful grind per reroll
- Stage 140–200: 25–34 kills/token — reward for Reaper mastery
- Stage 300+: 17 kills/token — late-game ease, appropriate
- Stage 490+: 10 kills/token — 1 random reroll per 2 stage clears

**3-token targeted roll calibration:**
At Stage 300 (6 shards/kill), a targeted roll requires 300 shards = 50 kills ≈ 10 stage clears.
This is meaningfully more expensive than a random roll (17 kills). The cost differential holds
across all stage ranges — targeted costs 3× the kills of random.

**No runaway ceiling found.** IntensityTier grows unboundedly but the floor formula
(`Math.floor(2 + 2 * tier * 0.1)`) means the shards-per-kill grows linearly.
Token generation never becomes "free" — it just scales with player depth.

---

## QA Target 6 — Cross-Module Regression

| System | Status |
|---|---|
| Hero's Fate logic | ✅ Untouched |
| Landlord income | ✅ Untouched |
| Frontier Master | ✅ Untouched |
| Forge enhancement formulas | ✅ Untouched |
| RPG combat formulas | ✅ Untouched |
| Stage 1–100 reward paths | ✅ Untouched (`currentStage >= 101` guard active) |
| New setInterval | ✅ None added |
| Unbounded arrays | ✅ None added |

---

## Fixes Applied

| # | Location | Issue | Fix |
|---|---|---|---|
| 1 | Workstation conversion block | Missing token stockpile advisory (QA Target 4 requirement) | Added `{bmt > 20 && ...}` display-only hint — no block, no state mutation |

---

## Inflation Risk for PART 2 Targeted Roll Cost

**3-token targeted roll cost is well-calibrated.** At every stage range, a targeted roll costs
3× the kills of a random roll. This differential is meaningful and does not need adjustment.
PART 2 may proceed with the 3-token cost as specified.
