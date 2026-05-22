# Phase P-5A: Forge Economy Telemetry Foundation — Implementation Plan

**Date**: 2026-05-22  
**Phase**: P-5A  
**Scope**: Local-only, privacy-safe, zero-network telemetry schema for Forge economy analysis  
**Status**: Planning phase — no index.html changes in this phase

---

## 1. Objective

Design a lightweight client-side event log for Forge economy analysis. The goal is to answer four questions post-launch that the current `forgeStats` aggregate counters cannot answer:

1. What fraction of players actually reach +15 (the salvage gate)?
2. Are stabilizers purchased and consumed at high levels, or hoarded?
3. Where in the +11–+30 range does the shatter curve cluster?
4. Does the +15 salvage gate create a meaningful behavioral shift (less risk-taking below it)?

---

## 2. Non-Goals (Hard Constraints)

| Constraint | Reason |
| :--- | :--- |
| No external analytics SDK | Privacy; no third-party JS |
| No network requests of any kind | PWA offline-first; no server dependency |
| No user identity / device fingerprinting | Ethical; no PII |
| No changes to Forge math | Economy regression risk |
| No changes to `getSalvagePayout`, `getEnhanceChance` | Series-locked constants |
| No changes to `sw.js` or `manifest.json` | PWA stability |
| No changes to game save schema (`moneyGameUniverseStateV1`) | Save compatibility |

---

## 3. Storage Design

### 3.1 Separate localStorage Key

**Key**: `moneyGameForgeTelemetryV1`  
**Rationale**: Keeps telemetry completely isolated from the game save. A corrupted or cleared telemetry log has zero impact on game state. Players can clear telemetry independently.

### 3.2 Storage Structure

```json
{
  "schemaVersion": 1,
  "createdAt": 1716400000000,
  "updatedAt": 1716400000000,
  "events": []
}
```

### 3.3 Event Cap

**Maximum 150 events** (rolling — oldest events are dropped when the cap is reached).

**Rationale**: At ~200 bytes per event, 150 events ≈ 30 KB. Well within localStorage limits (5–10 MB). The cap prevents unbounded growth in long play sessions without requiring a flush or upload mechanism.

### 3.4 Persistence Failures

If `localStorage.setItem` throws (storage quota exceeded, private mode restriction), telemetry silently fails. The game save path is unaffected. No try/catch propagation into game logic.

---

## 4. Event Schema

See companion schema document: `docs/antigravity/analysis/2026-05-22-p5a-forge-telemetry-event-schema.md`

Four event types:
- `forge_attempt` — emitted from `enhanceWeaponItem` on every forge result
- `stab_action` — emitted from `craftStabilizer` (craft) and from `enhanceWeaponItem` (use)
- `salvage` — emitted from `enhanceWeaponItem` when `broken === true`
- `milestone` — emitted from `enhanceWeaponItem` when result level is 10, 15, 20, or 30

---

## 5. Integration Points

### 5.1 `enhanceWeaponItem` (~line 6701)

This is the single authoritative emit point for forge results. Both the success path and the breakage path converge here. Emit three event types from this function:

1. `forge_attempt` — always, on every call
2. `salvage` — when `broken === true` (alongside `forge_attempt`)
3. `stab_action` with `action: "use"` — when `stabilizerUsed === true`
4. `milestone` — when `result.level` (the new level after success) is 10, 15, 20, or 30

### 5.2 `craftStabilizer` (~line 7025)

Emit `stab_action` with `action: "craft"` when stabilizer crafting succeeds (i.e., after the shard deduction and stabilizer count increment).

### 5.3 Emit Helper (new utility function)

```js
function emitForgeEvent(event) {
  try {
    const raw = localStorage.getItem("moneyGameForgeTelemetryV1");
    const store = raw ? JSON.parse(raw) : { schemaVersion: 1, createdAt: Date.now(), events: [] };
    store.events.push(event);
    if (store.events.length > 150) store.events = store.events.slice(-150);
    store.updatedAt = Date.now();
    localStorage.setItem("moneyGameForgeTelemetryV1", JSON.stringify(store));
  } catch (_) {}
}
```

This is a standalone pure-utility function — no React state, no re-render, no side effects beyond localStorage.

---

## 6. Privacy Guardrails

| Guardrail | Implementation |
| :--- | :--- |
| No user identity | Events contain only game-state values (level, rarity, booleans) |
| No timestamps beyond session | `ts` is `Date.now()` — a millisecond epoch, not a user ID |
| No device info | No `navigator.*`, no screen dimensions, no locale |
| No cross-session correlation | No session ID, no install ID, no persistent identifier |
| Entirely local | No `fetch`, no `XMLHttpRequest`, no `sendBeacon` |
| Player-clearable | Independent key — deleting `moneyGameForgeTelemetryV1` resets telemetry without affecting saves |

---

## 7. Analysis Queries (Post-Launch)

Once implemented, the event log enables the following queries via browser DevTools console:

```js
// Load the log
const log = JSON.parse(localStorage.getItem("moneyGameForgeTelemetryV1"));
const events = log.events;

// Q1: Salvage gate activation rate (what % of breaks are ≥+15?)
const breaks = events.filter(e => e.type === "salvage");
const gatedBreaks = breaks.filter(e => e.gated);
console.log("Gate activation:", (gatedBreaks.length / breaks.length * 100).toFixed(1) + "%");

// Q2: Stabilizer usage rate at ≥+15
const forges = events.filter(e => e.type === "forge_attempt");
const highForges = forges.filter(e => e.prevLevel >= 15);
const stabUsed = highForges.filter(e => e.stabilizerUsed);
console.log("Stab use at +15+:", (stabUsed.length / highForges.length * 100).toFixed(1) + "%");

// Q3: Shatter distribution by prevLevel
const shattersByLevel = events.filter(e => e.type === "salvage")
  .reduce((acc, e) => { acc[e.atLevel] = (acc[e.atLevel] || 0) + 1; return acc; }, {});
console.table(shattersByLevel);

// Q4: Milestone reach rate (+15 vs total attempts)
const totalAttempts = forges.length;
const reached15 = events.filter(e => e.type === "milestone" && e.level === 15).length;
console.log("+15 milestone rate:", (reached15 / totalAttempts * 100).toFixed(2) + "%");
```

---

## 8. Rollout Phases

| Sub-Phase | Scope | Deliverables |
| :--- | :--- | :--- |
| P-5A | Schema design, privacy review, integration plan | This document + schema doc (no code) |
| P-5B | Implementation: `emitForgeEvent` + `enhanceWeaponItem` wiring | `index.html` changes for `forge_attempt`, `salvage`, `milestone` |
| P-5C | Implementation: `craftStabilizer` + stab `use` wiring | `index.html` changes for `stab_action` events |
| P-5D | Verification: read back events in DevTools, confirm schema, confirm no game-state side effects | QA walkthrough |

P-5A (this phase) is documentation only. No index.html changes.

---

## 9. Risk Assessment

| Risk | Severity | Mitigation |
| :--- | :--- | :--- |
| `localStorage` quota exceeded | Low | Silent catch; no impact on game |
| JSON parse error on malformed store | Low | Silent catch resets store to empty |
| Emit point inside wrong conditional branch | Medium | P-5D QA phase verifies event counts against known actions |
| `enhanceWeaponItem` refactor moves emit point | Low | `emitForgeEvent` is side-effect-free; easy to re-locate |
| Privacy concern from `ts` field | Low | `Date.now()` is not PII; no identifier attached |

---

## 10. Recommended Next Phase

**P-5B** — Forge Telemetry Implementation: `forge_attempt`, `salvage`, `milestone` events  
Add `emitForgeEvent` utility and wire it into `enhanceWeaponItem`. Emit three event types. No stab events in P-5B (deferred to P-5C to keep diffs reviewable).
