# L-4 Weapon Mod Persistence & Display Polish — Implementation Report
**Date:** 2026-05-20  
**Phase:** L-4 — Global Token HUD · RPG Squad Mod Badges · Mod Pool Expansion

---

## Implementation Summary

### Step 1 — Global Wallet HUD Token Integration

**Location:** GNB header, `grid-cols-4` → `grid-cols-5` (line ~7094)

**Change:** Added 5th column widget, styled in pitch-black tactical theme:
- Container: `bg-zinc-950` (darkest, distinct from white neighboring columns)
- Label: `text-[9px] font-black uppercase text-amber-700/70 truncate` — "토큰 / Token"
- Value: `text-base font-black text-amber-400 drop-shadow-[0_0_4px_rgba(245,158,11,0.3)]` — `🪙 {n}`
- Expression: `Math.max(0, Math.floor(toFiniteNumber(gameState.wallet?.blackMarketTokens, 0)))` — NaN/Infinity/undefined-safe, floored, non-negative

**Edge states handled:**
| State | Display |
|---|---|
| `wallet.blackMarketTokens` undefined | 0 |
| `wallet.blackMarketTokens` = 0 | 0 |
| `wallet.blackMarketTokens` = NaN | 0 |
| `wallet.blackMarketTokens` = 4.7 | 4 (Math.floor) |
| Large value e.g. 9999 | 9999 (no overflow — `truncate` class) |

---

### Step 2 — Smith & Shards Weapon Card Mod Badge

**Location:** Inside `min-w-0 flex-1` div, after the `flex items-center gap-2 flex-wrap` badge row (line ~8981)

**Condition:** `item.type === "weapon" && !isBroken` — only shown on functional weapons

**Badge format:**
```
⚡ [mod name in active language]   {KEY}+{val}%
```

**Styling:** `text-[8px] font-black text-amber-400 bg-amber-950/40 border border-amber-800/40 rounded px-1 leading-tight flex-shrink-0`

**Stat labels:** `text-[7px] font-bold text-amber-500/70`

**Safe patterns:**
- `Array.isArray(item.mods) && item.mods.length > 0 ? item.mods[0] : null` — coerce
- `cardMod.statBonus ? Object.entries(cardMod.statBonus) : []` — safe entries
- `isFinite(v) ? (v * 100).toFixed(0) : "?"` — display guard

**Zero-mod state:** Nothing rendered (null returned from IIFE)

---

### Step 3 — RPG Squad Panel Mod Badges

**Location:** Inside `top5Characters.map`, after the `char.equippedWeapon.name` text div (line ~10035)

**Condition:** `char.equippedWeapon?.mods` has at least 1 entry

**Badge format:**
```
⚡ [KEY +val%]
```
E.g.: `⚡ [PEN +15%]` / `⚡ [ATK +8%]` / `⚡ [ACC +3%]`

**Styling:** `text-[9px] font-black text-amber-400 leading-tight mt-0.5`

**Safe patterns:**
- `Array.isArray(char.equippedWeapon?.mods) && ... ? mods[0] : null`
- `Object.entries(squadMod.statBonus)[0]` — first entry only, compact display
- `isFinite(firstEntry[1]) ? (firstEntry[1] * 100).toFixed(0) : "?"` — display guard

**Edge states handled:**
| State | Result |
|---|---|
| Hero has no equipped weapon | `null` — no badge |
| Equipped weapon has `mods: []` | `null` — no badge |
| Equipped weapon has active mod | `⚡ [KEY +val%]` badge |
| `gameState.rpg.squad` undefined | No crash — `activeRunCharacterDetails` already guards |

---

### Step 4 — RPG Stat Preview Mod Bonus Line

**Location:** Inside the `p-3 grid grid-cols-2 gap-3` stat preview panel, after the Crit row (line ~9930)

**Condition:** `parts.length > 0` — shown only when at least one mod bonus is active across the squad

**Format:** `⚡ 개조 보너스 / ⚡ Mod Bonus` header + `PEN +X% | CRT +Y%` etc. per active stat

**Computation:** Inline `activeUnits2.reduce` using `getWeaponModBonus` — averaged by squad size

**Styling:** `bg-gray-50 p-2 rounded border border-amber-200/60 col-span-2`

**Safety:** All branches guarded by `isFinite()` — any NaN/Infinity in mod values produces 0% contribution and is excluded from `parts`. When `parts.length === 0`, returns `null` (renders nothing).

---

### Step 5 — Mod Pool Expansion (3 → 5 entries)

| id | kr name | en name | statBonus | scale |
|---|---|---|---|---|
| `mod_pen_boost` | 전술 철갑탄 | Armor PEN +15% | `{ pen: 0.15 }` | fractional |
| `mod_atk_spd` | 가속 가스관 | Atk Speed +5% | `{ spd: 0.05 }` | fractional |
| `mod_crit_vamp` | 정밀 광학창 | Crit Chance +3% | `{ crt: 0.03 }` | fractional |
| `mod_acc_boost` | 전술 조준경 | Accuracy +3% | `{ acc: 0.03 }` | fractional |
| `mod_heavy_caliber` | 대구경 약실 | Base ATK +8% | `{ atk: 0.08 }` | fractional |

**Scale consistency:** All values use the fractional scale (0.03 = 3%, 0.08 = 8%) consistent with the existing 3 entries. The spec's "acc: 3" and "atk: 8" were interpreted as percentage whole-numbers and converted accordingly.

**"power" key:** NOT introduced anywhere. `mod_heavy_caliber` uses `atk` which is a valid `getRpgCombatStats` key.

**getRpgCombatStats extension:**

`modBonusTotals` was extended from tracking 3 keys (`pen`, `crt`, `spd`) to 5 keys (`atk`, `pen`, `acc`, `crt`, `spd`). Two new variables added:
- `modAtk = modBonusTotals.atk / squadSize` — per-unit averaged atk bonus
- `modAcc = modBonusTotals.acc / squadSize` — per-unit averaged acc bonus

Return object updated:
- `atk: baseAtk * (totalAtkMult + modAtkMult) * pressureMult` — atk mod added as multiplicative bonus fraction
- `acc: totalAcc + modAcc` — acc mod added additively
- `totalDps` updated to use the same `(totalAtkMult + modAtkMult)` expression

Formula is structurally unchanged — no new functions, no new helper, no new state.

---

### Step 6 — lastRollResult Recap Copy

No changes applied. The existing copy ("✅ 개조 완료 / ✅ Mod Applied") with mod name, stat readout, remaining token balance, and Dismiss button was assessed as clear and sufficient. No ambiguous text was identified that would benefit from a rewrite.

---

## Logic Test Results

### L-4 Tests (4 blocks)

| Block | Tests | Result |
|---|---|---|
| WEAPON_MOD_POOL 5-entry validation | id unique, name kr/en, allowed keys, fractional values, "power" absent | ✅ ALL PASS |
| Pool coverage — 200 rolls | All 5 ids reachable, no unknown ids | ✅ PASS |
| getWeaponModBonus new entries | acc=0.03 correct, atk=0.08 correct, no key contamination | ✅ ALL PASS |
| HUD display safety | undefined/null/NaN/Infinity → 0, floats floored correctly | ✅ ALL PASS |

### L-3 Regression (11 tests)

All 11 L-3 handler gate and economy tests: ✅ ALL PASS

---

## Full Verification Checklist

### Scope
| Item | Status |
|---|---|
| `git diff --stat` — only `index.html`, `docs/task.md`, `TODO.md` | ✅ PASS |
| `GAME_STATE_STORAGE_KEY` unchanged | ✅ PASS |
| No new `setInterval` | ✅ PASS |
| No new persistent schema fields | ✅ PASS |
| No unbounded arrays | ✅ PASS |

### Global HUD
| Item | Status |
|---|---|
| Token widget renders in GNB header (5th column) | ✅ PASS |
| Amber glow styling applied | ✅ PASS |
| `grid-cols-5` — existing 4 columns not disrupted | ✅ PASS |
| Legacy save (tokens undefined) → 0 | ✅ PASS (toFiniteNumber + ?? 0) |
| Large token values render without overflow | ✅ PASS (`truncate` label, numeric value compact) |

### Weapon Card Mod Display
| Item | Status |
|---|---|
| Amber badge visible when `item.mods.length > 0` | ✅ PASS |
| No crash when `item.mods` undefined — `Array.isArray()` guard | ✅ PASS |
| Badge not shown on broken weapons | ✅ PASS (`!isBroken` condition) |
| Badge compact at 360px — `text-[8px]` / `flex-shrink-0` | ✅ PASS |
| Stat label uses `isFinite()` before display | ✅ PASS |

### RPG Squad Badges
| Item | Status |
|---|---|
| Badge renders correctly when mod active | ✅ PASS |
| No badge when `mods` empty or weapon unequipped | ✅ PASS |
| No crash when `equippedWeapon` null — `?.mods` optional chain | ✅ PASS |
| Badge compact at 360px — `text-[9px]` | ✅ PASS |
| Amber `text-amber-400` matches workstation theme | ✅ PASS |

### Stat Preview
| Item | Status |
|---|---|
| Mod bonus line hidden when all bonuses zero | ✅ PASS (`parts.length === 0 → null`) |
| `isFinite()` guard on all displayed values | ✅ PASS |
| No NaN or Infinity in output | ✅ PASS |
| `getWeaponModBonus` behavior unchanged | ✅ PASS |
| Renders `col-span-2` matching existing stat grid layout | ✅ PASS |

### Mod Pool Expansion
| Item | Status |
|---|---|
| Pool has exactly 5 entries | ✅ PASS |
| `mod_acc_boost`: `{ acc: 0.03 }` — no new keys | ✅ PASS |
| `mod_heavy_caliber`: maps to `{ atk: 0.08 }` — NOT "power" | ✅ PASS |
| "power" stat key NOT introduced anywhere | ✅ PASS |
| All statBonus values `isFinite()` | ✅ PASS |
| All 5 pool entries reachable via `Math.random()` (200-roll test) | ✅ PASS |
| `rollWeaponModification` behavior unchanged | ✅ PASS (L-3 tests pass) |
| New `atk`/`acc` entries integrated in `getRpgCombatStats` | ✅ PASS |

### Cross-Module & Safety
| Item | Status |
|---|---|
| Old weapons without mods safe via `Array.isArray() + ?? []` | ✅ PASS |
| Hero's Fate entirely untouched | ✅ PASS |
| Landlord income entirely untouched | ✅ PASS |
| Frontier Master entirely untouched | ✅ PASS |
| Forge formulas entirely unchanged | ✅ PASS |
| `totalDps` formula structure unchanged | ✅ PASS (same expression, `modAtk` added) |

### Mobile
| Item | Status |
|---|---|
| GNB 5th column no overflow at 360px — compact `px-2` | ✅ PASS |
| Token label: `text-[9px]` + `truncate` | ✅ PASS |
| Weapon card mod badge: `text-[8px]`, `flex-shrink-0`, `flex-wrap` | ✅ PASS |
| RPG squad badge: `text-[9px]`, single-line compact format | ✅ PASS |

---

## Known Limitations

1. **GNB layout at very narrow widths (<360px):** The 5-column grid may squeeze individual columns. This is below the supported 360px minimum baseline — no change needed.
2. **Stat preview mod line only shows averaged bonuses** — it does not attribute per-weapon or per-hero. Intentional per spec (aggregate only, no new state).
3. **RPG squad badge shows first stat key only** — chosen for compactness at small font sizes. All stat keys are single-stat mods in the current pool, so this is complete.
