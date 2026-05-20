# Implementation Plan: Black Market & Weapon Modification (Phase L-2)

This plan outlines the QA verification steps for the Black Market scaffolding (Part 1) and the technical specification for the Live Weapon Modification Engine and Workstation UI (Part 2).

## User Review Required

> [!IMPORTANT]
> - **Zero Schema Version Upgrade**: Weapon mods are stored in the existing `mods` array, and black market tokens are in `wallet.blackMarketTokens`. No new fields are added, maintaining 100% save file compatibility.
> - **One Active Mod Slot**: As per the prototype design, only a single mod slot is active per weapon. Re-rolling replaces the existing mod.
> - **Additive Stat Integration**: Weapon modification stat bonuses are cleanly integrated into the existing `getRpgCombatStats` formula without altering core mechanics.

## Proposed Changes

### Part 1: Scaffolding Regression & Economy Safety QA

#### [MODIFY] [index.html](file:///C:/Users/ryan/dev/money-game/index.html)
- **`convertShardsToTokens` Input Validation**:
  - Update `convertShardsToTokens` to strictly reject non-integer inputs using `!Number.isInteger(amount) || amount <= 0`.
  - Validate against `NaN`, `Infinity`, decimals, negative numbers, and zeroes.

---

### Part 2: Live Weapon Modification Engine & Workstation UI

#### [MODIFY] [index.html](file:///C:/Users/ryan/dev/money-game/index.html)
- **`WEAPON_MOD_POOL` (Static Constant)**:
  Define static non-persisted constant pool mapping to existing combat keys:
  - `mod_pen_boost`: PEN flat +15 (`{ pen: 0.15 }`)
  - `mod_atk_spd`: Atk Speed +5% (`{ spd: 0.05 }`)
  - `mod_crit_vamp`: Crit Chance +3% (`{ crt: 0.03 }`)

- **`rollWeaponModification(weaponInstanceId)`**:
  - Hard guards: `wallet.blackMarketTokens >= 1`, target weapon exists, is not locked, and is not broken.
  - Deduct 1 `blackMarketTokens` from `wallet`.
  - Overwrite `item.mods = [selectedMod]` (1 mod slot limit).
  - Update state immutably.

- **RPG Combat Tick Integration**:
  - Update `getRpgCombatStats` to iterate through active characters.
  - If a character has a weapon with an active mod, add the flat PEN bonus (`totalPen += mod.statBonus.pen`) and multiply percentage multipliers (`totalSpdMult *= (1 + mod.statBonus.spd)` and `totalCrt *= (1 + mod.statBonus.crt)`).
  - Apply `isFinite()` guards on all added/multiplied stats.

- **Workstation UI Conversion**:
  - Convert placeholder in `Smith & Shards` tab to a functional block:
    - **Empty state**: displays label and "벼림 가동 (Roll Passive Trait) (1 암시장 토큰 소모)".
    - **Active state**: displays mod name in amber glow (`text-amber-400`), its stat bonuses, and a "재개조 (Reroll Trait) (1 암시장 토큰 소모)" button.
    - **Conversion button**: adjacent to the workstation, displays shard/token balance and converts 100 refined shards to 1 token when clicked.
    - Enforce active disabled states for locked weapons or low tokens.

---

## Verification Plan

### Automated / Logic Verification
- Write logic unit tests inside `run_logic_tests.js` to assert:
  - `convertShardsToTokens` correctly rejects all 6 invalid input types (NaN, Infinity, negative, decimal, 0, insufficient funds).
  - `rollWeaponModification` properly validates locked/broken states, deducts exactly 1 token, and generates one valid mod.
  - `getRpgCombatStats` incorporates weapon mods correctly, applies `isFinite` guards, and increases team DPS without crashing.

### Manual Verification
- **Save Compatibility**: Load legacy save file (with zero tokens/mods) and confirm no render warnings or crashes.
- **Weapon Modification**: Forge a weapon, earn refined shards, convert them to tokens, and roll traits on the workstation.
- **Mobile responsiveness**: Inspect layout rendering on 360px width viewport.
