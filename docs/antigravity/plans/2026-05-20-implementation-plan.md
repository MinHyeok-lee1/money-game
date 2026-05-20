# Implementation Plan: Mod Milestone QA & Offline Shard Progression (Phase L-7A & M-1)

This plan specifies the technical execution details for Phase L-7A (Mod Milestone regression & safety hardening) and Phase M-1 (Offline passive shard calculations and performance optimization).

## User Review Required

> [!IMPORTANT]
> - **No Schema Version Upgrade**: The state key remains `moneyGameUniverseStateV1` and schema is fully compatible. The claimed status (`modMilestoneClaimed`) persists correctly inside `enhancement`, and offline shard rewards are injected into `enhancement.refinedShards`.
> - **Automatic Save on Load**: Upon loading a save file with accumulated offline time, rewards are calculated and written to `localStorage` immediately. This prevents exploits (e.g. force-closing browser to double-claim).
> - **Compositing Layers for Pulse**: Override base pulse styles globally via CSS GPU layers to prevent micro-stuttering on mobile screens.

## Open Questions

> [!NOTE]
> None. Requirements are fully specified and the scope is strictly aligned with the requested safety and progression fixes.

## Proposed Changes

### Core Game Implementation

#### [MODIFY] [index.html](file:///c:/Users/ryan/dev/money-game/index.html)

- **GPU Animation Optimization**:
  - Add CSS rule inside `<style>` block to optimize `.animate-pulse` and `.animate-pulse-optimized` using compositing layers:
    ```css
    .animate-pulse, .animate-pulse-optimized {
      will-change: opacity, transform;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
    }
    ```
  - Apply `animate-pulse-optimized` to the stage progress container and tactical speed descriptions in the Infinite Mode combat panel.

- **`normalizeGameState` Enhancements**:
  - Ensure `tempOfflineProgress` is explicitly copied inside the return value:
    `tempOfflineProgress: state?.tempOfflineProgress || null,`

- **`loadGameState` Offline Progress Engine**:
  - Integrate passive offline progression:
    1. Parse `gameState.settings.lastSavedAt`.
    2. If `offlineMinutes = Math.floor((Date.now() - savedTime) / 60000)` is 1 or more:
       - Calculate Landlord current passive income.
       - Calculate passive cash: `offlineCash = offlineMinutes * 60 * currentIncomePerSec`.
       - If `stage >= 101`, calculate `IntensityTier = Math.floor((stage - 100) / 10) + 1`.
       - Compute `shardsEarned = Math.floor(offlineMinutes * (2 + 2 * IntensityTier * 0.05))`.
       - Validate results with `isFinite()` checks.
       - Immutably update cash and refined shards.
       - Write a temporary property `tempOfflineProgress` into the state.
       - Save the modified state to `localStorage` immediately via `saveGameState`.

- **`checkModMilestoneReward` Hardening**:
  - Enforce character/run active squad checks for weapon equipment.
  - Apply double-barrier idempotency guards (checking before update and inside React set state).
  - Enforce bounds validation for token additions.

- **`GameApp` React Mount Lifecycle & UI Modal**:
  - Define local state `const [offlineProgressData, setOfflineProgressData] = useState(null);`.
  - Add mount `useEffect` to retrieve `tempOfflineProgress`, update local state, and remove the property from React `gameState`.
  - Render a glassmorphic recap modal at the top of the viewport when `offlineProgressData` is present.
  - Update `checkModMilestoneReward` trigger `useEffect` to include `gameState.rpg?.characters` in dependencies.

---

## Verification Plan

### Automated / Code Validation
- Audit the updated logic to verify:
  - Exact token awards (+10 tokens) and safety against NaN/Infinity/negative.
  - Zero token changes on failed checks.
  - Correct stage boundary logic (>= 150) and equipped weapon check.
  - Offline shard payout formulas match the spec.

### Manual Verification
- **Milestone Validation**:
  - Test at Stage 149 with modded equipped weapon (verify no reward).
  - Test at Stage 150 with modded unequipped weapon (verify no reward).
  - Test at Stage 150 with modded equipped weapon (verify reward is awarded and Abyssal Executor badge turns active).
  - Verify badge pulse works on click and does not award extra tokens.
- **Offline Passive Calculations**:
  - Simulate offline progress by manually editing the saved timestamp in localStorage, reloading the app, and verifying cash/shard accumulation in the High-Fidelity modal.
- **Mobile performance**:
  - Set browser viewport to 360px width and check rendering and animation smoothness of pulsing elements.
