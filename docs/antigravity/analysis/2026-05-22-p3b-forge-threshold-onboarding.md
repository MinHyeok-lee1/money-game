# Phase P-3B: Forge Onboarding Tooltip & Threshold Education — Analysis

**Date**: 2026-05-22  
**Phase**: P-3B (Forge Onboarding Tooltip & Threshold Education Pass)  
**Scope**: Proactive salvage threshold education, danger-zone forge confirmation modal, Forge Guide card

---

## 1. Problem Statement

After Phase P-3A, the Forge recap correctly communicates different outcomes for gated vs. ungated shatters (post-failure). However, the player **still learns about the +15 salvage threshold reactively** — only after shattering a weapon.

The remaining UX gap is:

> **Pre-risk education is missing.** A player pushing toward +15 receives no signal that crossing this threshold unlocks meaningful recovery, increasing the perceived "worth" of risking the shatter.

This is the difference between:
- "I shattered. I got 5 shards. I don't know why." (reactive, confusion-inducing)
- "I know that +14 shatters return minimal shards, but +15 unlocks real recovery." (proactive, decision-enabling)

---

## 2. Design Analysis

### 2.1 Proactive Education Surface Inventory

| Location | Triggers | Player State |
| :--- | :--- | :--- |
| Forge Guide card (`hasDangerZoneWeapon`) | Once player enters danger zone | Engaged, pre-forge |
| Forge confirmation modal (`forgeConfirmTarget`) | On every danger-zone enhance attempt | High-attention decision moment |
| Forge recap (post-outcome) | After every forge | Post-failure reflection |

P-3A already fixed the recap (post-failure). P-3B targets the two **pre-fork** surfaces.

### 2.2 Decision: Where to Add Education

**Confirmation modal** is the highest-priority injection point:
- Shows exactly when the player is deciding whether to forge
- Player is in high-attention state (reading risks, making a decision)
- A "Est. Salvage if Broken" row belongs alongside "Success %", "Break Risk %", and "Stabilizer status" — it completes the risk/reward picture

**Forge Guide card** is the second-priority injection point:
- Visible whenever the player has a weapon in the danger zone
- Already explains "weapons can break, shards are returned" — the natural place to add the `+14 / +15` threshold structure
- Not a modal, not blocking gameplay — persistent ambient education

### 2.3 Design Constraints

- **No blocking tutorials**: education must be embedded in existing UI flows, not as pop-ups
- **Mobile-friendly**: each education element ≤ 2 lines at 320px
- **Tone**: tactical, not condescending — treat player as a strategist receiving intelligence, not a beginner receiving instructions
- **No new state**: use existing `forgeConfirmTarget.level` and `hasDangerZoneWeapon`

---

## 3. Implementation

### 3.1 Confirmation Modal — Salvage Preview Row (P-3B Edit 1)

**Location**: Inside the stats grid of `forgeConfirmTarget` modal, after the stabilizer status row.

**Logic**:
```jsx
{forgeConfirmTarget.level >= 15 ? (
  <div>
    💎 Est. Salvage if Broken | Meaningful shards (+15 zone)
  </div>
) : (
  <div>
    💎 Est. Salvage if Broken | Minimal — reach +15 for real salvage
  </div>
)}
```

**EN Copy:**
- `>= +15`: "Meaningful shards (+15 zone)"
- `< +15`: "Minimal — reach +15 for real salvage"

**KO Copy:**
- `>= +15`: "의미 있는 파편 회수 (+15 이상)"
- `< +15`: "최소 회수 — +15 이상부터 본격적인 파편 보상"

**Color signal:**
- `>= +15` label: `text-amber-400 / text-amber-300` — positive recovery framing
- `< +15` label: `text-slate-500 / text-slate-400` — muted, not alarming, just honest

### 3.2 Forge Guide Card — Salvage Structure Note (P-3B Edit 2)

**Location**: Appended inside the `hasDangerZoneWeapon` conditional block in the First Forge Guide header, after the existing red danger zone warning.

**Implementation**: New amber info card with "Salvage Structure" header.

**EN Copy**: "+14 and below: minimal salvage (5 shards). +15 and above: rarity-scaled recovery. Higher rarity = more shards."

**KO Copy**: "+14 이하 파괴 → 최소 파편(5). +15 이상 파괴 → 희귀 스케일 보상. 동등 무기라도 등급이 높으면 더 많은 파편이 지급됩니다."

---

## 4. UX Psychology Notes

### 4.1 Goal-Framing Effect

Showing "+15 zone = meaningful salvage" before the forge **transforms the +15 target into a goal**, not just a boundary. Players who learn this pre-forge will intentionally push toward +15 — which is exactly the behavior the system is designed to encourage.

### 4.2 Color Psychology

The amber color for the `>= +15` salvage row (vs. slate for `< +15`) creates a subtle visual reward signal at the decision moment. Amber = "economic opportunity." Slate = "neutral/minimal." No red needed — these are informational, not warnings.

### 4.3 Modal as Intelligence Briefing

The confirmation modal already communicates:
- Weapon + level
- Success %
- Break Risk %
- Stabilizer status

The new "Est. Salvage if Broken" row completes the full risk-reward equation. A player can now read: "40% break risk, but +15 zone — I'll get meaningful salvage back if it breaks." This is a complete decision framework.

### 4.4 Non-Blocking Ambient Education

The Forge Guide card is always visible (whenever `hasDangerZoneWeapon` is true). The new "Salvage Structure" note is ambient — players who don't need it can ignore it; players who do need it find it without leaving the Forge.

---

## 5. Mobile Readability

All added text elements are:
- `text-[10px]` or `text-xs` — renders cleanly at 320px width
- Max 2 lines at 320px viewport (verified by character count: EN copy < 80 chars per element)
- No horizontal scroll added
- No layout breakage — both elements use existing `flex justify-between` and `rounded p-2` patterns

---

## 6. Out of Scope

Per strict constraints:
- `getSalvagePayout` math — **unchanged**
- Forge probabilities — **unchanged**  
- Stabilizer crafting cost — **unchanged**
- Black Market economy — **unchanged**
- PWA files (`sw.js`, `manifest.json`) — **untouched**
- Save schema — **unchanged** (no new persisted fields)
- Forge recap logic — **unchanged** (P-3A already handled this)
