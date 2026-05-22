# Phase P-3D: Forge Danger-Zone Confirmation Modal Prestige Audit — Analysis

**Date**: 2026-05-22  
**Phase**: P-3D (Danger-Zone Modal Prestige Audit)  
**Scope**: Wording, hierarchy, and prestige tone audit of the forge danger-zone confirmation modal

---

## 1. Problem Statement

After P-3C, the Forge milestone cues (+10/+20/+30) now escalate psychologically across three tiers:
- **+10**: "🛡️ Tempered — Danger Zone Begins" (identity conferral + danger activation)
- **+20**: "🚨 Elite Territory — Maximum Stakes" (prestige + economy stakes)
- **+30**: "👑 Frontline Legend — Maximum Forge Achieved" (legend + scarcity)

However, the **danger-zone confirmation modal** — shown on every forge attempt at level 10+ — still behaved like a system warning popup rather than a high-stakes tactical briefing. Specifically:

| Element | Old Copy | Tone Issue |
| :--- | :--- | :--- |
| Title | "EXTREME RISK FORGE" / "DANGER ZONE FORGE" | Binary only; all levels 10-19 identical |
| Warning banner | "🚨 70% CHANCE OF PERMANENT SHATTER! 🚨" | Alarmist double-emoji, not prestigious |
| Warning banner (low) | "WEAPON MAY BE DESTROYED!" | Generic system warning, no escalation |
| Stabilizer absent | "⚠️ NO STABILIZER" / "No Break Protection!" | Tutorial-grade copy |
| Stabilizer advisory | "N stabilizer(s) available — consider using one." | Passive and casual |
| Confirm button | "⚒️ FORGE ANYWAY" | Implies recklessness, not informed commitment |
| Subtitle layer | *(none)* | No hierarchy between title and risk data |

The modal had no psychological escalation between the three weapon tiers (Tempered / Elite / Frontline Legend). Every danger-zone forge looked identical regardless of whether you were at +11 or +29.

---

## 2. Modal Prestige Tier Design

### 2.1 Existing Tier Mapping

The `forgeConfirmTarget` state object includes `level` (current weapon level before forge) and `breakPct` (either 20 or 70 — simplified binary from `requestEnhance`).

| Weapon Level | `breakPct` | Weapon Epithet | Target Modal Identity |
| :--- | :--- | :--- | :--- |
| 10–14 | 20% | Tempered | Danger zone entry — protect investment |
| 15–19 | 20% (displayed) | Approaching Elite | High risk — meaningful salvage at stake |
| 20–29 | 70% | Elite | Elite forge commitment — few reach this depth |

Note: `breakPct` is simplified to 20 or 70 by `requestEnhance` (line 7340). The actual `getEnhanceChance` curve is more nuanced but not exposed in the modal. This means level-based tier logic (`forgeConfirmTarget.level`) is needed for a 3-tier title/subtitle system.

### 2.2 Three-Tier Title System

Replacing the 2-state title (`breakPct >= 70` split) with a 3-state system using `level`:

| Level Range | EN Title | KO Title |
| :--- | :--- | :--- |
| `level < 15` | "DANGER ZONE FORGE" | "위험구간 제련 확인" |
| `level >= 15` | "HIGH RISK OPERATION" | "고위험 제련 작전" |
| `level >= 20` | "ELITE FORGE COMMITMENT" | "정예 제련 작전" |

**Why these labels:**
- "DANGER ZONE FORGE" → matches the milestone cue language ("Danger Zone Begins")
- "HIGH RISK OPERATION" → tactical briefing language; implies a mission, not a warning
- "ELITE FORGE COMMITMENT" → echoes the P-3C "Elite Territory" milestone; frames the action as elite, not desperate

---

## 3. Audit Findings & Refinements Applied

### 3.1 Title — 3-Tier Identity

**Old**: Binary `breakPct >= 70` check → 2 states only  
**New**: Ternary `level >= 20` / `level >= 15` / else → 3 states

All three states now echo the prestige language from the milestone cues system (P-3C):
- "DANGER ZONE FORGE" matches "+10 Danger Zone Begins"
- "HIGH RISK OPERATION" is new but coheres with approaching-Elite stakes
- "ELITE FORGE COMMITMENT" matches "+20 Elite Territory"

### 3.2 Subtitle Layer — Prestige Context

**Old**: None — title jumped directly to warning banner  
**New**: Added `<p>` subtitle between h2 and warning banner:

| Level Range | EN Subtitle | KO Subtitle |
| :--- | :--- | :--- |
| `< 15` | "Danger zone active. Protect your investment." | "위험구간 진입. 투자를 보호하십시오." |
| `>= 15` | "Advanced risk. Meaningful salvage awaits if it falls." | "고위험 구간. 파괴 시 의미 있는 파편을 회수합니다." |
| `>= 20` | "Elite pressure. Few weapons reach this depth." | "정예 구간. 극소수만 이 깊이에 도달합니다." |

**Key design decisions:**
- `< 15` subtitle ties to investment/stabilizer protection (connects to P-3C +10 messaging)
- `>= 15` subtitle acknowledges meaningful salvage (connects to P-3A/P-3B threshold education)
- `>= 20` subtitle adds scarcity signal ("few weapons reach this depth") — prestige without false reassurance
- Styling: `text-[10px] font-bold text-gray-400 tracking-wide` — subordinate to the title, above the stats grid noise

### 3.3 Warning Banner — Composed Escalation

**Old**: Alarmist double-emoji or generic system warning:
- `>= 70%`: "🚨 70% CHANCE OF PERMANENT SHATTER! 🚨" (panicked)
- `< 70%`: "WEAPON MAY BE DESTROYED!" (vague)

**New**: Composed, tactical escalation:
- `level >= 20`: "🚨 ELITE ZONE — 70% SHATTER RISK" (declarative, not hysterical)
- `level >= 15`: "⚠️ HIGH EXPOSURE — SEVERE SHATTER RISK" (precise danger grade)
- `level < 15`: "⚠️ DANGER ZONE — WEAPON AT RISK" (clear, not alarmist)

**Why this is better:**  
The old `"🚨 70% CHANCE OF PERMANENT SHATTER! 🚨"` with double sirens reads as panic, which undercuts the prestige of elite forging. "🚨 ELITE ZONE — 70% SHATTER RISK" delivers the same information in a composed, military-briefing tone — more consistent with a player who knows they're operating at an elite level.

### 3.4 Stabilizer Messaging — Tactical Protocol Language

**Old (absent row):**
- Label: "⚠️ NO STABILIZER" — blunt, tutorial-grade
- Value: "No Break Protection!" — exclamation mark is juvenile

**New (absent row):**
- Label: "⚠️ UNPROTECTED" — tactical status
- Value: "Full exposure — no cover" — military field language

**Old (advisory):**  
`"N stabilizer(s) available — consider using one."` — passive, casual

**New (advisory):**  
`"Protection protocol available — N stabilizer(s) in reserve."` — matches the task's target tone example ("protection protocol"); `in reserve` evokes inventory management, not tutorial hand-holding

**Stabilizer active row**: Unchanged — `"🛡️ Stabilizer Active"` / `"Break protection + 3% success"` is already tactically correct.

### 3.5 Confirm Button — Deliberate Commitment

**Old (universal):** "⚒️ FORGE ANYWAY" — implies the player is overriding a warning recklessly

**New (2-tier):**
- `breakPct < 70` (levels 10-19): "⚒️ ACCEPT THE RISK" — informed consent; player acknowledges the danger
- `breakPct >= 70` (levels 20+): "⚒️ FORGE UNDER PRESSURE" — evokes elite performance under adversity

**Why these labels:**
- "ACCEPT THE RISK" treats the player as a strategist making a calculated decision
- "FORGE UNDER PRESSURE" frames the action as a feat of elite craftsmanship, not a desperate gamble
- Both are more prestigious than "FORGE ANYWAY" which implies reluctance or recklessness

---

## 4. UI Hierarchy After Refinement

Full modal reading order:

```
[Icon] 🚨 / ⚠️             ← visual tier signal (breakPct-based, unchanged)
[Title] ELITE FORGE COMMITMENT  ← identity (3-tier level-based)
[Subtitle] Elite pressure. Few weapons reach this depth.  ← prestige context
[Banner] 🚨 ELITE ZONE — 70% SHATTER RISK  ← danger level (3-tier level-based)
[Stats grid]
  Weapon: Iron Dagger +20
  Success: 30%
  Break Risk: 70%
  ⚠️ UNPROTECTED | Full exposure — no cover
  Protection protocol available — 2 stabilizer(s) in reserve.
  💎 Est. Salvage if Broken | Meaningful shards (+15 zone)
[Button] ⚒️ FORGE UNDER PRESSURE   ← deliberate elite commitment
[Button] Cancel
```

The hierarchy flows: **identity → context → danger → intelligence brief → commitment**.

---

## 5. Height & Mobile Impact

The subtitle `<p>` tag adds ~22px of vertical height to the modal:
- Title: `mb-2` → `mb-1` (saves 4px)
- Subtitle: `text-[10px]` line (~14px) + `mb-4` (16px) = 30px
- Net addition: +26px

Modal total height estimate (pre-change: ~438px → post-change: ~464px).

On an iPhone SE viewport (568px safe area with `p-6` outer padding = 516px usable):
- 464px modal height < 516px usable = **no overflow**

On a Moto G4 (smallest common target, ~500px safe area):
- 464px < 500px = fits within 36px margin

No horizontal overflow introduced. Button width unchanged (`w-full`). Button copy at `text-sm tracking-widest` — "FORGE UNDER PRESSURE" (21 chars) fits on one line at 320px.

---

## 6. Economy & Schema Verification

- `enhanceWeaponItem` — **unchanged** (modal is display-only confirmation gate)
- `requestEnhance` — **unchanged** (breakPct calculation unchanged)
- `getSalvagePayout` — **unchanged**
- `getEnhanceChance` — **unchanged**
- Stabilizer costs — **unchanged**
- Save schema — **unchanged** (no new persisted fields)
- PWA files (`sw.js`, `manifest.json`) — **untouched**

---

## 7. Remaining UX Risks

| Risk | Severity | Notes |
| :--- | :--- | :--- |
| "FORGE UNDER PRESSURE" button may be tight on very small screens | Low | 21 chars at `text-sm tracking-widest` = ~180px; `w-full` stretches to container width, text wraps gracefully |
| Korean subtitle copy not in-browser tested | Low | Syntactically correct; all strings are React JSX string literals |
| `breakPct` still shows 20% for all levels 10-19 in stats grid | Pre-existing | Out of scope for P-3D; the actual chance is computed by `getEnhanceChance` in `enhanceWeaponItem` |
