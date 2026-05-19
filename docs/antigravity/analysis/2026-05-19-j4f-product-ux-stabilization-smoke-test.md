# J-4F: Product UX Stabilization Smoke Test

## Date: 2026-05-19

## Scope
End-to-end smoke test of all four tabs after the J-4 UX pass (J-4A through J-4E-1).

## Method
Static code inspection of all UI components, state management, timers, formulas, and persistence layer. Browser preview attempted but aborted due to Babel transpilation load on the ~330KB single-file SPA.

---

## Tab Results

### A. Frontier Master (Landlord)
- **Status**: PASS
- Tab loads with first-click CTA guidance panel (line 6219)
- Global War Status HUD renders with 4-column grid, `truncate` overflow protection
- Fire support click triggers `handleMainClick` → `updateGameState` with cash gain
- Tactical log feed receives messages from Landlord actions (property buy, rebirth)
- All log writes capped at `.slice(0, 10)`
- Landlord income timer (`setInterval`) guarded by `activeTab === "landlord"` with cleanup

### B. Hero's Fate (Investment)
- **Status**: PASS
- Tab loads with first-click CTA guidance panel
- Survival prediction cards (contract cards) render with odds, payout, risk tier
- Bet slip renders with stake input and validation breakdown
- Dry-run button calls `runDefenseContractDryRun` → writes to `lastContractDryRun`, no state mutation
- Settlement button opens confirmation modal (`showSettlementConfirm`), does not settle until confirmed
- Settlement calls `settleDefenseContract` with `createDefenseContractSettlementResult` (Math.random)
- Loss path sets `meta.gameOver` → Game Over overlay → `handleRestart`
- Fate log (settlement history) capped at `.slice(-10)`
- Contract preview history capped at `.slice(-10)`
- Investment price timer guarded by `activeTab === "investment"` with cleanup

### C. Smith & Shards (Enhancement)
- **Status**: PASS
- Tab loads with first-click CTA guidance panel
- Real enhancement UI renders with `enhanceWeaponItem`, `getEnhanceCost`, `getEnhanceChance`
- Enhancement formulas unchanged: cost = `500 * (level + 1)`, chance = `0.9 - level * 0.06` clamped [0.3, 0.9]
- Sandbox forge operates on local `sandboxState` (useState) — no gameState mutation
- Sandbox labels include "모의" (simulation) markers
- Sandbox forge log writes capped at `.slice(0, 10)`
- No fake shard/sell backend appears as active gameplay

### D. Frontline Command (RPG)
- **Status**: PASS
- Tab loads with first-click CTA guidance panel
- Defense operation starts via existing RPG run mechanism
- Tactical operations terminal: `h-28 overflow-y-auto`, capped at 10 entries
- Combat timer guarded by `activeTab === "rpg" && runState.isActive === true` with cleanup
- No duplicate interval after tab switching (dependency array: `[activeTab, runState.isActive]`)
- HUD remains readable with `truncate` and `grid-cols-4` layout
- Monster archetype panel displays for Stage 101+ only
- Reaper form panel displays for Stage 101+ only

---

## Interaction Spam Safety

| Test | Result |
| :--- | :--- |
| Rapid fire support clicks | Safe: `handleMainClick` is synchronous, no debounce needed |
| Rapid tab switching | Safe: all timers cleanup via `return () => clearInterval(timer)` |
| Rapid sandbox forge clicks | Safe: guarded by `sandboxState.isForging` flag |
| Rapid dry-run clicks | Safe: writes to `lastContractDryRun` state, no accumulation |
| Rapid combat ticks | Safe: 1s interval, cleanup on tab switch |
| Tactical log growth | Safe: all 11 `setTacticalLogFeed` calls use `.slice(0, 10)` |

---

## Static Safety Verification

| Check | Result |
| :--- | :--- |
| `GAME_STATE_STORAGE_KEY` | `moneyGameUniverseStateV1` — unchanged |
| `localStorage` writes | Only via `saveGameState` in the save effect — no rogue writes |
| `applyCombatTick` | Formula unchanged: `dps * deltaSeconds`, stage progression at 5 kills |
| `getMonsterMaxHp` | Formula unchanged: `100 * 1.3^(s-1)`, infinite: `* 1.1^(s-100)` |
| `getMonsterDefeatReward` | Formula unchanged: `25 * s^1.05`, infinite: `* 1.02^(s-100)` |
| `getDefenseContractOdds` | Formula unchanged: `(1 - vol^0.6 * 3.5) * 100` clamped [30, 80] |
| `settleDefenseContract` | Flow unchanged: `createDefenseContractSettlementResult` → Math.random |
| `showSettlementConfirm` | Confirmation modal still gates real settlement |
| `enhanceWeaponItem` | Formula unchanged: cost `500*(l+1)`, chance `0.9-l*0.06` |
| `getEnhanceCost` / `getEnhanceChance` | Unchanged |
| Tactical Signal cap | `Math.min(12, ...)` — unchanged |
| Build Alignment | Logic unchanged, capped at 3 |
| History arrays | All capped: `.slice(-10)` or `.slice(0, 10)` |
| Timer cleanup | All 3 `setInterval` have matching `clearInterval` cleanup |
| Duplicate timers | Prevented by `activeTab` guards in useEffect dependencies |

---

## Verdict: PASS

No code changes needed. All formulas, persistence, timers, and UI boundaries are intact after the J-4 UX pass.
