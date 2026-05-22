# Phase P-3C: Forge Milestone Prestige Cue Audit — Analysis

**Date**: 2026-05-22  
**Phase**: P-3C (Forge Milestone Prestige Cue Audit)  
**Scope**: Audit and refinement of forge milestone psychological escalation at +10, +20, +30

---

## 1. Problem Statement

After P-3A and P-3B, the Forge system teaches:
- Low-level shatters (below +15) = minimal recovery
- High-level shatters (+15+) = meaningful rarity-scaled salvage
- Stabilizers are economic protection tools

However, the forge milestone cues (+10, +20, +30) remained **primarily informational** rather than **aspirational and prestigious**. The previous copy treated milestones as checkpoint notifications, not as identity-conferring moments with escalating psychological weight.

Specific gaps identified:

| Milestone | Previous Title | Tone Issue |
| :--- | :--- | :--- |
| +10 | "🛡️ Safe Zone Cleared — Danger Zone Begins" | Passive checkpoint. No identity conferral. |
| +20 | "🚨 Extreme Risk Zone — Meaningful Salvage Unlocked" | Feature-announcement framing. Salvage "unlocked" sounds like a tutorial. |
| +30 | "👑 Frontline Legend — Maximum Forge Achieved" | Good prestige, but body lacked economic legacy context. |

Body copy was also consistently **tutorial-list** style (`hit +10! Break risk is now 20%...`) rather than **intelligence-briefing** style that treats the player as a strategist making elite decisions.

---

## 2. Audit Findings

### 2.1 Tone Escalation Coherence (Pre-Audit)

| Tier | Old Tone Assessment | Target Tone |
| :--- | :--- | :--- |
| +10 | Neutral checkpoint | Dangerous entry, identity conferral |
| +20 | Informational feature unlock | Elite territory, economic stakes |
| +30 | Prestige celebration | Legacy statement, scarcity signal |

The progression was **weakly escalating** — +30 was clearly prestige while +10/+20 felt like tutorial prompts. This created a tone discontinuity: players experienced a tutorial at +10, another tutorial at +20, then suddenly prestige at +30.

### 2.2 Weapon Epithet Alignment

The `getWeaponEpithet` function already assigns identity labels:
- `level >= 10` → "Tempered" / "숙련된"
- `level >= 20` → "Elite" / "전선 정예"
- `level >= 30` → "Frontline Legend" / "전선의 전설"

The previous milestone titles did **not echo these identities**. The +10 title said "Safe Zone Cleared" — but the weapon is now "Tempered." The +20 title said "Extreme Risk Zone" — but the weapon is now "Elite." This was a missed prestige signal.

### 2.3 Economy Messaging Alignment (Pre-Audit)

| Milestone | Economic Message | Quality |
| :--- | :--- | :--- |
| +10 | "Reach +15 to unlock meaningful salvage" | Good direction, weak framing ("unlock" is tutorial language) |
| +20 | "Shatters now return rarity-scaled salvage" | Informational only, misses investment weight |
| +30 | "70% break pressure" | Good danger context, but missing legacy/scarcity framing |

### 2.4 Stabilizer Dependency Messaging (Pre-Audit)

| Milestone | Stabilizer Message | Quality |
| :--- | :--- | :--- |
| +10 | "Stabilizers recommended." | Weak — sounds optional and casual |
| +20 | "Stabilizers are essential." | Better, but buried after two factual lines |
| +30 | None | Missing (at +30 the player has survived; stabilizer education not needed) |

### 2.5 UI Hierarchy (Pre-Audit)

The toast structure was:
1. Label: "Forge Milestone +N" (eyebrow text)
2. Title: main headline
3. Body: informational paragraph

No middle layer between the headline and the body to carry a **prestige tagline**. This meant the title had to do double duty (prestige + information) and often succeeded at neither.

---

## 3. Refinements Applied

### 3.1 Subtitle Layer Added

A new `subtitle` field added to each milestone tier and rendered in the toast UI between title and body:

```jsx
{prestigeAnnouncementToast.subtitle && (
  <div className="mt-0.5 text-[11px] font-bold italic opacity-70 leading-snug">
    {prestigeAnnouncementToast.subtitle}
  </div>
)}
```

**Purpose**: The subtitle carries the **prestige/danger tagline** — a short punchy phrase that sets psychological tone. The body then delivers economic intelligence without the title needing to carry that weight.

**Hierarchy after change**:
1. Label: "Forge Milestone +N" (eyebrow — context anchor)
2. Title: identity proclamation (weapon tier echo + milestone name)
3. Subtitle: danger/prestige tagline (psychological escalator)
4. Body: economic intelligence brief (tactical information)

### 3.2 +10 Milestone — "Tempered" Identity Conferral

| Field | Old | New |
| :--- | :--- | :--- |
| Title | "🛡️ Safe Zone Cleared — Danger Zone Begins" | "🛡️ Tempered — Danger Zone Begins" |
| Subtitle | *(none)* | "Break pressure is live. Every step forward costs." |
| Body | `${name} hit +10! Break risk is now 20%. Reach +15 to unlock meaningful salvage. Stabilizers recommended.` | `${name} crossed +10. Break risk: 20% per attempt. Reach +15 for meaningful salvage. Stabilizers protect your investment from here on.` |

**Key changes**:
- Title now echoes the weapon's new epithet ("Tempered") — milestone = identity conferral
- Subtitle delivers the danger signal with emotional weight ("every step forward costs")
- Body reframed from tutorial list to intelligence brief; "protect your investment" adds economic stakes
- "Stabilizers recommended" → "Stabilizers protect your investment from here on" — reframes stabilizers as economic protection, not a suggestion

### 3.3 +20 Milestone — "Elite Territory" Economic Stakes

| Field | Old | New |
| :--- | :--- | :--- |
| Title | "🚨 Extreme Risk Zone — Meaningful Salvage Unlocked" | "🚨 Elite Territory — Maximum Stakes" |
| Subtitle | *(none)* | "70% break risk. Rarity-scaled salvage on the line." |
| Body | `${name} hit +20! Break risk jumps to 70%. Shatters now return rarity-scaled salvage. Stabilizers are essential.` | `${name} at +20 — elite forge territory. A shatter now returns rarity-scaled shards; higher rarity means greater recovery. Stabilizers are not optional.` |

**Key changes**:
- Title echoes weapon epithet ("Elite Territory") and frames this as peak investment zone ("Maximum Stakes")
- Removes feature-announcement framing ("Meaningful Salvage Unlocked") in favor of prestige territory framing
- Subtitle compresses the key risk/reward signal into one punchy line
- Body explains the salvage link to rarity explicitly ("higher rarity means greater recovery") — connects economy dots
- "Stabilizers are essential" → "Stabilizers are not optional" — stronger, more commanding

### 3.4 +30 Milestone — Legacy Statement

| Field | Old | New |
| :--- | :--- | :--- |
| Title | "👑 Frontline Legend — Maximum Forge Achieved" | Unchanged (already strong) |
| Subtitle | *(none)* | "Forged through 70% break pressure. The pinnacle earned." |
| Body | `${name} reached +30 max! A perfect weapon forged through unrelenting 70% break pressure. Absolute mastery achieved.` | `${name} at +30 — the highest tier achievable. Few weapons survive the climb to this summit. An indelible mark of elite commitment.` |

**Key changes**:
- Title retained — "Frontline Legend" is already prestige-perfect
- Subtitle emphasizes the **journey** rather than just the arrival (70% pressure, earned)
- Body adds **scarcity signal**: "Few weapons survive the climb to this summit" — makes the player feel their achievement is rare, not just final
- "Absolute mastery achieved" → "An indelible mark of elite commitment" — shifts from simple celebration to legacy framing

---

## 4. Tone Escalation After Refinement

| Tier | New Tone Profile |
| :--- | :--- |
| +10 | Identity conferral (Tempered) + danger activation + economic protection framing |
| +20 | Elite territory + maximum stakes + rarity-salvage economy link |
| +30 | Legacy statement + scarcity signal + permanent prestige |

The escalation now reads as: **threshold → elite → legend**, each step adding prestige depth rather than just increasing urgency.

---

## 5. UI Hierarchy Verification

- **Toast overlap**: Milestone toast appears in the same position as before; no new toast types. No overlap risk introduced.
- **Subtitle sizing**: `text-[11px]` at `opacity-70 italic` — visually subordinate to the title (`text-sm font-black`) but distinct from the body (`text-xs opacity-90`). Hierarchy is readable.
- **Total toast height**: Added ~16px for subtitle on mobile. Still well within the toast container bounds. No overflow risk.
- **Dismiss button**: Unchanged. Still shrink-0, top-aligned, accessible.
- **Timeout**: 4500ms unchanged. Subtitle is ≤ 55 chars (EN) — scannable in under 1 second.

---

## 6. Mobile Verification

All text elements:
- Subtitle: `text-[11px]` — renders at ~11px on mobile. Max length 55 chars EN ≈ 1 line at 320px.
- Body: `text-xs` — unchanged from previous. Max length ~160 chars ≈ 3–4 lines at 320px.
- No new layout structures added.
- No horizontal scroll introduced.
- Toast width unchanged (`mx-4` — 16px margins on each side).

---

## 7. Economy & Schema Verification

- `getSalvagePayout` — **unchanged**
- Forge probabilities — **unchanged**
- Stabilizer crafting cost — **unchanged**
- Save schema — **unchanged** (no new persisted fields)
- `getForgePrestigeAnnouncement` returns `{ title, subtitle, body, tone }` — subtitle is display-only, ephemeral, never persisted
- PWA files (`sw.js`, `manifest.json`) — **untouched**

---

## 8. Remaining UX Risks

| Risk | Severity | Notes |
| :--- | :--- | :--- |
| Korean subtitle copy not verified in-browser | Low | Unicode escapes confirmed correct from PowerShell raw read; matches JS escape syntax |
| +30 Korean title unchanged | None | Pre-existing title already strong; kept intentionally |
| 4500ms timeout with longer content | Low | Subtitle adds ~16px height but ~0.5s additional read time; 4.5s still sufficient |

---

## 9. Out of Scope

Per strict constraints:
- Forge economy math — **unchanged**
- Salvage formula — **unchanged**
- Stabilizer costs — **unchanged**
- PWA files — **untouched**
- Progression systems — **unchanged**
- No new state, no new analytics
