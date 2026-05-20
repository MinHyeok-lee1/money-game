# Offline Progress Shard Payout Rebalance & Mobile UX (Phase M-1)

This document outlines the analysis and technical design for integrating Refined Shards into the offline progression calculations, designing a high-fidelity recap modal, and optimizing rendering performance on mobile viewports.

---

## 1. Offline Progress Calculation Engine

### A. Current Problem
The existing game saves `lastSavedAt` when saving but does not compute offline progress upon loading. As a result, players in Infinite Mode (Stage 101+) do not gain Refined Shards when offline, causing a significant progression bottleneck for end-game weapon modifications.

### B. Solution: Synchronous Lifecycle Hook
To prevent race conditions with periodic auto-saves, offline progress is calculated synchronously within the initial state loader `loadGameState()`:
1. **Time Delta**: `elapsedMinutes = Math.floor((Date.now() - lastSavedTime) / 60000)`.
2. **Minimum Threshold**: Progression activates if `elapsedMinutes >= 1` minute.
3. **Passive Cash**: Computed using the player's current Landlord properties and multipliers:
   `offlineCash = elapsedMinutes * 60 * currentIncomePerSec`.
4. **Refined Shards (Stage >= 101)**:
   - Identify stage depth: `stage = rpg.currentStage`.
   - Calculate Intensity Tier: `IntensityTier = Math.floor((stage - 100) / 10) + 1`.
   - Accumulate shards using the formula:
     `shardsEarned = Math.floor(elapsedMinutes * (2 + 2 * IntensityTier * 0.05))`.
5. **Immediate Storage Persistence**:
   - The rewards are immutably added to the loaded state in memory.
   - The state is immediately saved back to `localStorage` with a fresh `lastSavedAt` timestamp to prevent double-claiming exploits.
   - A temporary field `tempOfflineProgress = { minutes, cashEarned, shardsEarned }` is appended to the returned state.
6. **UI Recognition**: On mount, the component checks for `tempOfflineProgress`, displays the recap modal, and removes the temporary property from React state.

---

## 2. High-Fidelity Offline Recap Modal

A premium glassmorphic overlay will display the summarized earnings:
- **Title**: Localized title indicating "Offline Operations Report" (오프라인 누적 보고서).
- **Time Elapsed**: Beautifully formatted duration in hours and minutes.
- **Slate Box Summary**:
  - `₩ 전쟁 자금 수득` / `₩ War Funds Earned` line (if cash > 0).
  - `💎 정제된 파편 수득` / `💎 Refined Shards Acquired` line (if shards > 0).
- **Claim CTA**: Emerald-accented tactical confirmation button that closes the modal.
- **Defensive Safeguards**: Strict nullish fallbacks (`?? 0`, `isFinite`) are used to prevent legacy loading errors on older saves.

---

## 3. Mobile Viewport Animation Throttle

### A. Performance Bottle-neck
Tailwind's base `.animate-pulse` uses the CSS `opacity` animation. On mobile screens (360px–640px) under heavy canvas/combat loops, repeating opacity updates trigger layout recalculations and repaint operations on the CPU, causing micro-stuttering.

### B. GPU-Accelerated Compositing Layers
We will override `.animate-pulse` and define `.animate-pulse-optimized` using hardware-accelerated CSS properties:
- **`will-change`**: Advises the browser to optimize for imminent opacity/transform transitions.
- **`transform: translate3d(0, 0, 0)`**: Forces the browser to instantiate a GPU-accelerated compositing layer for the element.
- **`backface-visibility: hidden`**: Prevents rendering glitches on composited layer swaps.

This optimization ensures smooth 60fps UI performance even during active tactical combat waves.
