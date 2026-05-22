# Phase P-3C: Forge Milestone Prestige Cue Audit — Walkthrough

**Date**: 2026-05-22  
**Phase**: P-3C  
**Files Changed**: `index.html`

---

## Summary

Audited and improved all three forge milestone cues (+10, +20, +30) to escalate psychologically from informational checkpoints into identity-conferring, danger-escalating prestige moments. Added a subtitle layer to the milestone toast for cleaner visual hierarchy.

---

## Changes

### 1. `getForgePrestigeAnnouncement` — Copy Refinement + Subtitle Addition

**Location**: ~line 6651, inside the Smith & Shards enhancement component.

Added `subtitle` field to each milestone tier object. Updated `title` and `body` copy for all three tiers.

#### +10 (amber)

```
Title:    🛡️ Tempered — Danger Zone Begins
Subtitle: Break pressure is live. Every step forward costs.
Body:     ${name} crossed +10. Break risk: 20% per attempt.
          Reach +15 for meaningful salvage.
          Stabilizers protect your investment from here on.
```

- "Tempered" echoes the weapon epithet assigned at level ≥ 10
- "Every step forward costs" delivers danger signal without being a tutorial
- "Protect your investment" reframes stabilizers as economic tools

#### +20 (purple)

```
Title:    🚨 Elite Territory — Maximum Stakes
Subtitle: 70% break risk. Rarity-scaled salvage on the line.
Body:     ${name} at +20 — elite forge territory.
          A shatter now returns rarity-scaled shards;
          higher rarity means greater recovery.
          Stabilizers are not optional.
```

- "Elite Territory" echoes the weapon epithet assigned at level ≥ 20
- Removed "Meaningful Salvage Unlocked" feature-announcement framing
- Subtitle distills the core risk/reward equation in one line
- "Not optional" is stronger than "essential" for stabilizer urgency

#### +30 (red)

```
Title:    👑 Frontline Legend — Maximum Forge Achieved  (unchanged)
Subtitle: Forged through 70% break pressure. The pinnacle earned.
Body:     ${name} at +30 — the highest tier achievable.
          Few weapons survive the climb to this summit.
          An indelible mark of elite commitment.
```

- Title retained — already prestige-perfect
- Added scarcity signal: "Few weapons survive the climb"
- "Indelible mark of elite commitment" replaces "Absolute mastery achieved" for legacy framing

---

### 2. Milestone Toast JSX — Subtitle Render

**Location**: ~line 8972, inside the `{prestigeAnnouncementToast && ...}` block.

Added conditional subtitle render between title and body:

```jsx
{prestigeAnnouncementToast.subtitle && (
  <div className="mt-0.5 text-[11px] font-bold italic opacity-70 leading-snug">
    {prestigeAnnouncementToast.subtitle}
  </div>
)}
```

**Visual hierarchy result**:
1. Label eyebrow: `text-[10px] font-black uppercase` — "Forge Milestone +N"
2. Title: `text-sm font-black` — identity proclamation
3. Subtitle: `text-[11px] font-bold italic opacity-70` — prestige tagline
4. Body: `text-xs font-bold opacity-90` — economic intelligence brief

The subtitle is visually subordinate to the title but distinct from the body, creating a clear three-tier information structure.

---

## Verification

| Check | Result |
| :--- | :--- |
| +10 tone: aspirational + dangerous | PASS — "Tempered" identity + "every step costs" danger |
| +20 tone: elite + economic stakes | PASS — "Elite Territory" + rarity-salvage link in body |
| +30 tone: legend + scarcity | PASS — "pinnacle earned" + "few weapons survive" |
| Subtitle renders only when present | PASS — conditional `{subtitle &&}` guard |
| No toast overlap | PASS — same position, no new toast types |
| Mobile: subtitle ≤ 1 line at 320px | PASS — max 55 chars EN |
| No economy changes | PASS — getSalvagePayout unchanged |
| No schema changes | PASS — subtitle is ephemeral display-only |
| No PWA file changes | PASS — sw.js, manifest.json untouched |
| Korean: Unicode escapes syntactically correct | PASS — verified against file encoding |
| index.html visible in preview panel | PASS — preview updated after both edits |

---

## Recommended Commit Message

```
✨ ux(forge): milestone prestige cue audit — identity, stakes, and subtitle layer

P-3C: Refined +10/+20/+30 forge milestone cues for psychological escalation.

- +10: "Tempered" identity conferral, danger activation, investment framing
- +20: "Elite Territory" prestige, rarity-salvage economy link, "not optional" stabilizer
- +30: scarcity signal ("few weapons survive"), legacy statement
- Added subtitle field to all three tiers for prestige tagline layer
- Toast JSX: conditional subtitle render between title and body

No economy changes. No schema changes. No PWA file changes.
```

---

## Recommended Next Phase

**P-3D** — Forge Danger Zone Confirmation Modal Prestige Audit  
Review the danger-zone forge confirmation modal tone to verify it matches the prestige escalation now established by the milestone cues. Ensure the modal's "CONFIRM FORGE" CTA and risk breakdown copy feel cohesive with the Tempered / Elite / Frontline Legend identity system.
