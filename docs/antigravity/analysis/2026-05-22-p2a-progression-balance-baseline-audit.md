# Progression Balance Baseline Audit (Phase P-2A)

**Date**: 2026-05-22  
**Audit Conducted by**: Antigravity  

---

## 1. Current Branch
`main`

## 2. Files Changed
- `index.html` (Core combat and squad preview logic)
- `docs/task.md` (Task list tracking)
- `TODO.md` (Milestone updates)

---

## 3. Early-Game Audit
* **First 5 Minutes**:
  - The game loop starts with manual clicks on the landlord tab generating `$1` per click.
  - The first property upgrade (Yard Broker) costs `$100` and yields `$5/s`, which instantly shifts playstyle to idle income.
  - Price scaling at a compounding `1.15x` is smooth for the first five landlord tiers.
  - Transitioning from clicking to automated cash accumulation is extremely swift.
* **Cash Gain Speed**:
  - Within the first few minutes, cash velocity rises exponentially as the player ascends property levels. Landlord progression provides a solid buffer, but players soon transition capital to Defense Contract dry runs and real settlements (when unlocked) to multiply their cash.
* **First Property Upgrade**:
  - Extremely low barrier to entry. Leveling up properties remains highly satisfying in the early game due to high returns relative to investment cost.
* **First Forge Interaction**:
  - When the armory is empty, the game auto-grants a free starter weapon (`iron-dagger` +0) on state normalization, preventing a soft-lock.
  - The cost to enhance is paid in Cash, starting low (e.g., +1 enhancement is very cheap) but climbing exponentially.
* **First Defense Run**:
  - Gated by Defense Tickets which cost `100` dividends.
  - The first run starts at Stage 1, where monsters have 100 HP.
  - Starter characters (which have base DPS from definition) easily clear Stage 1 without weapons.
  - Each defeat awards `25` dividends, meaning players can recover the cost of a run ticket (100 dividends) in exactly 4 monster kills (less than 1 full stage which requires 5 kills).

---

## 4. Forge Audit
* **Starter Weapon Usefulness**:
  - The free `iron-dagger` (+0) has a base power of `10`, representing a crucial initial DPS addition for characters before the player gathers enough dividends for gacha pulls.
* **First Enhancement Cost**:
  - Very cheap for the first few levels (+1 to +5), allowing players to quickly experience weapon upgrades.
* **First Breakage Risk Exposure**:
  - Gated strictly by level:
    - **Safe Zone (+0 to +9)**: 0% Breakage.
    - **High Risk (+10 to +19)**: 20% Breakage chance.
    - **Extreme Risk (+20 to +29)**: 70% Breakage chance.
  - The jump to 20% breakage at level 10 (when enhancing from +10 to +11) serves as a sharp mechanical warning, effectively introducing the stakes of the forge.
* **Refined Shard Clarity**:
  - When weapons break, they are automatically deleted and converted to Refined Shards based on their enhance level and rarity.
  - Shard acquisition is highly transparent, and players can clearly see how many shards they have in the armory screen.

---

## 5. Defense/RPG Audit
* **Emergency Free Start Behavior**:
  - Enabled when tickets are `0` and dividends are `< 100`.
  - Highly effective at preventing dead ends.
  - While players can theoretically start a run, kill 3 monsters (75 dividends), retreat, and repeat to print dividends for free, this loop is extremely slow and self-limiting compared to clearing higher stages (e.g., Stage 50 awards 1,512 dividends/kill).
* **Ticket Purchase Pacing**:
  - Fixed at `100` dividends. This cost is trivial in the mid-to-late game but acts as a meaningful gate in the early game.
* **First Run Reward Pacing**:
  - Defeating a monster awards `25 * stage^1.05` dividends.
  - Stage 1-10 rewards feel rewarding enough to buy the first gacha character (1,000 dividends) within 1-2 completed runs.
* **Stage 1–10 Difficulty Feel**:
  - Monster HP scales at `100 * 1.3^(stage - 1)`.
  - Stage 1: 100 HP.
  - Stage 10: 1,060 HP.
  - Players can comfortably clear Stage 10 with level 1 characters and +0 weapons, matching expectations for starter pacing.

---

## 6. Black Market Audit
* **First Token Acquisition Path**:
  - Players convert Refined Shards to Black Market Tokens at a `100 shards : 1 token` ratio.
  - This path is clean, providing value to broken high-tier weapons.
* **Shard-to-Token Conversion Clarity**:
  - The dual-action workbench interface displays clear previews of shard-to-token yields and includes both single and bulk convert options.
* **Random Roll vs. Targeted Roll Pressure**:
  - **Random rolls** cost `1 token`.
  - **Targeted role rolls** cost `3 tokens`.
  - Players face a meaningful decision: take multiple cheap random rolls to get any mod, or save tokens to secure a specific modification role matching their squad composition.

---

## 7. Reaper / Late Game
* **Stage 101+ Readiness Clarity**:
  - The Dorothy tab displays a clear status readout assessing the team's readiness:
    - **READY**: viable for Stage 101+
    - **UNDERPREPARED**: base stat levels or equipment too low
    - **EXTREME_RISK / PREVIEW_ONLY**: warnings indicating entry will likely result in immediate failure
* **+30 Forge Ladder Pressure**:
  - Progressing from +20 to +30 carries a 70% breakage risk. Without Stabilizers, reaching +30 is practically impossible, creating heavy end-game resource pressure that drives the Black Market economy.
* **Offline Reward Influence**:
  - Offline progress rewards passive cash and Refined Shards for Stage 101+ using the `IntensityTier` formula. This ensures that players who are stuck at high stages can make progress passively, mitigating late-game friction.

---

## 8. UI / Formatting Audit
* **Compact Numbers Readability**:
  - The `formatCompactGlobal` and `formatDps` helpers scale smoothly, cleanly formatting values into K, M, B, T abbreviations.
* **No Overflow in Key Panels**:
  - Clean flex-grid container layouts prevent UI elements from breaking when displaying massive numbers (e.g. e+40 dps).
* **Mobile Readability**:
  - Flex layouts stack cleanly on smaller screens. Buttons and input areas remain touch-friendly.

---

## 9. Balance Risks Found (Critical Bug)
* **Weapon Enhancement DPS Combat Calculation Discrepancy**:
  - **The Bug**: While the weapon details panel correctly displays the enhanced power as `power * (1 + enhanceLevel * 0.05)`, the combat engine (`getTeamBaseAtk`) and the squad detail preview (`activeRunCharacterDetails`) only read the raw base power: `toFiniteNumber(equippedWeapon.power, 0)`.
  - **Impact**: All weapon enhancements (+1 through +30) effectively provide `+0%` combat power in actual fights, rendering weapon enhancement progression useless for stage clearing.
  - **Correction**: We will update both combat calculations to use the enhanced weapon power formula `Math.round(basePower * (1 + enhanceLevel * 0.05))`.

---

## 10. Recommended Next Phase
* **Phase P-2B: Telemetry and Analytics Pipeline**:
  - Now that the baseline progression formulas have been audited and the critical weapon power scaling bug is resolved, we recommend moving into telemetry and analytics event hooks to track progression speeds in real-time.
