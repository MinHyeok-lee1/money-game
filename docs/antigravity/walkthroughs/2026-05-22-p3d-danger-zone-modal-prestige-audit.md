# Phase P-3D: Forge Danger-Zone Confirmation Modal Prestige Audit — Walkthrough

**Date**: 2026-05-22  
**Phase**: P-3D  
**Files Changed**: `index.html`

---

## Summary

Elevated the forge danger-zone confirmation modal from a binary system warning popup into a three-tier psychologically escalating prestige briefing. Added a subtitle context layer, refined warning banner copy, upgraded stabilizer language to tactical protocol terminology, and changed the confirm button from "FORGE ANYWAY" to level-appropriate deliberate commitment phrasing.

---

## Changes

### 1. Title (h2) — 3-Tier Identity System

**Location**: ~line 7894

**Old** (2-state, breakPct-based):
```
breakPct >= 70 → "EXTREME RISK FORGE"
else           → "DANGER ZONE FORGE"
```

**New** (3-state, level-based):
```
level >= 20  → "ELITE FORGE COMMITMENT"   / "정예 제련 작전"
level >= 15  → "HIGH RISK OPERATION"      / "고위험 제련 작전"
level < 15   → "DANGER ZONE FORGE"        / "위험구간 제련 확인"
```

Echoes the P-3C milestone identity hierarchy (Tempered → Elite → Frontline Legend).

---

### 2. Subtitle Paragraph — Prestige Context Layer

**Location**: ~line 7901 (new `<p>` between h2 and warning banner)

```jsx
<p className="text-[10px] font-bold text-gray-400 tracking-wide mb-4 mt-0.5">
  {level >= 20
    ? "Elite pressure. Few weapons reach this depth."
    : level >= 15
      ? "Advanced risk. Meaningful salvage awaits if it falls."
      : "Danger zone active. Protect your investment."}
</p>
```

**Purpose per tier:**
- `< 15`: Ties to investment protection (coheres with P-3C +10 "protect your investment" body copy)
- `>= 15`: References meaningful salvage (coheres with P-3A/P-3B threshold education)
- `>= 20`: Adds scarcity signal — "Few weapons reach this depth" (coheres with P-3C +30 scarcity framing)

---

### 3. Warning Banner — Composed 3-Tier Copy

**Location**: ~line 7912

**Old**:
```
breakPct >= 70 → "🚨 70% CHANCE OF PERMANENT SHATTER! 🚨"
else           → "WEAPON MAY BE DESTROYED!"
```

**New**:
```
level >= 20  → "🚨 ELITE ZONE — 70% SHATTER RISK"
level >= 15  → "⚠️ HIGH EXPOSURE — SEVERE SHATTER RISK"
level < 15   → "⚠️ DANGER ZONE — WEAPON AT RISK"
```

Removes panicked double-emoji. Each tier names the danger grade precisely. "ELITE ZONE" reframes 70% risk as elite territory rather than emergency.

---

### 4. Stabilizer Absent Row — Tactical Protocol Language

**Location**: ~line 7940

**Old**:
```
Label: "⚠️ NO STABILIZER"      → "⚠️ UNPROTECTED"
Value: "No Break Protection!"   → "Full exposure — no cover"
```

---

### 5. Stabilizer Advisory — Protocol Framing

**Location**: ~line 7946

**Old**: `"N stabilizer(s) available — consider using one."`  
**New**: `"Protection protocol available — N stabilizer(s) in reserve."`

"Protection protocol" matches the task's target tactical tone. "In reserve" is inventory language, not tutorial language.

---

### 6. Confirm Button — Deliberate Commitment

**Location**: ~line 7976

**Old** (universal): `"⚒️ FORGE ANYWAY"`

**New** (2-tier, breakPct-based):
```
breakPct >= 70 → "⚒️ FORGE UNDER PRESSURE"   / "⚒️ 압박 속에서 제련"
else           → "⚒️ ACCEPT THE RISK"          / "⚒️ 위험 감수하고 제련"
```

"FORGE ANYWAY" implied reluctant override. "ACCEPT THE RISK" signals informed strategic consent. "FORGE UNDER PRESSURE" signals elite performance under adversity.

---

## Verification

| Check | Result |
| :--- | :--- |
| +10-14 modal: danger zone entry tone | PASS — "DANGER ZONE FORGE" + "Danger zone active. Protect your investment." |
| +15-19 modal: high stakes tone | PASS — "HIGH RISK OPERATION" + salvage reference subtitle |
| +20+ modal: elite prestige tone | PASS — "ELITE FORGE COMMITMENT" + "Few weapons reach this depth." |
| Warning banner: not alarmist at elite level | PASS — "🚨 ELITE ZONE — 70% SHATTER RISK" (no double siren) |
| Stabilizer advisory: tactical language | PASS — "Protection protocol available" |
| Confirm button: deliberate not reckless | PASS — "ACCEPT THE RISK" / "FORGE UNDER PRESSURE" |
| No new toast overlap | PASS — modal unchanged in z-index and positioning |
| No mobile overflow | PASS — subtitle adds ~22px net; modal fits on iPhone SE |
| "FORGE UNDER PRESSURE" fits on button | PASS — 21 chars at text-sm; w-full stretches to container |
| No economy changes | PASS — enhanceWeaponItem, getSalvagePayout, getEnhanceChance unchanged |
| No schema changes | PASS — no new persisted fields |
| No PWA file changes | PASS — sw.js, manifest.json untouched |
| P-3B salvage row preserved | PASS — untouched, still gated at level >= 15 |
| index.html visible in preview panel | PASS — updated after all three edits |

---

## Recommended Commit Message

```
✨ ux(forge): P-3D danger-zone modal prestige audit — 3-tier identity and tactical copy

Elevated forge confirmation modal from binary warning to 3-tier prestige briefing:

- Title: 3-tier level-based (DANGER ZONE FORGE / HIGH RISK OPERATION / ELITE FORGE COMMITMENT)
- Subtitle: contextual prestige tagline per tier (investment / salvage / scarcity)
- Warning banner: composed danger grades replacing panicked double-siren copy
- Stabilizer absent: "UNPROTECTED" + "Full exposure — no cover" (tactical)
- Stabilizer advisory: "Protection protocol available — N in reserve" 
- Confirm button: "ACCEPT THE RISK" / "FORGE UNDER PRESSURE" (vs "FORGE ANYWAY")

No economy, schema, or PWA changes.
```

---

## Recommended Next Phase

**P-3E** — Forge UX Cohesion Final Pass  
Review the complete Forge flow end-to-end (Guide card → confirmation modal → forge outcome → recap → milestone toast) to verify all P-3A through P-3D improvements form a coherent narrative arc. Look for any remaining copy mismatches, tone discontinuities, or mobile readability regressions before closing the P-3 UX series.
