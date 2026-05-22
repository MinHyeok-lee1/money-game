# Phase P-3E: Forge UX Cohesion Final Pass — Analysis

**Date**: 2026-05-22  
**Phase**: P-3E (Forge UX Cohesion Final Pass)  
**Scope**: End-to-end audit of the full Forge player journey for tone coherence, arc continuity, and copy precision

---

## 1. Problem Statement

After P-3A through P-3D, the individual forge subsystems had been individually improved:
- P-3A: Salvage panel copy differentiated by prevLevel gate
- P-3B: Danger-zone modal threshold education row added
- P-3C: Milestone prestige cues elevated (+10/+20/+30)
- P-3D: Danger-zone confirmation modal given 3-tier prestige identity

However, the **forge result recap section** (J-5B tactical cue block) had not been audited as part of any P-3 phase. Four tone-level issues and two copy-precision issues were identified during this pass.

---

## 2. Full Journey Audit

### 2.1 Guide Card (~line 8911)

**Verdict: No changes needed.**

The Guide Card is intentionally more informational — it appears early-game to orient new players. Its tone (explanatory, forward-pointing) is appropriate for the context. No prestige framing needed here.

### 2.2 Threshold Education (P-3B modal row)

**Verdict: No changes needed.** Already implemented in P-3B.

### 2.3 Danger-Zone Confirmation Modal (P-3D)

**Verdict: No changes needed.** Fully audited and implemented in P-3D.

### 2.4 Forge Result Recap — J-5B Tactical Cue Block (~lines 9444–9621)

Seven issues identified. See Section 3.

### 2.5 Prestige Toast (P-3C)

**Verdict: No changes needed.** Fully audited and implemented in P-3C.

---

## 3. Issues Identified and Fixes Applied

### 3.1 Status Label: Case Inconsistency

**Location**: ~line 9459

**Issue**: `"💥 BROKEN"` is uppercase. `"⚡ Success"` is mixed case. Within the same conditional display block, inconsistent casing reads as a bug.

**Old**: `"⚡ Success"`  
**New**: `"⚡ FORGED"`

**Why "FORGED"**: Consistent uppercase. Replaces the passive "Success" label with an active verb that echoes the Forge system's tactical language. "BROKEN" / "FORGED" / "Failed (Safe)" — all-caps for terminal states.

---

### 3.2 Danger Zone Success Cue: Tonal Whiplash

**Location**: ~line 9604

**Issue**: `"Success! Level +N is a Danger Zone. Secure stabilizers before striking again."` — opens with an exclamation-mark celebration then immediately pivots to a warning. This creates tonal dissonance: the player just succeeded in elite territory but the copy treats it like a first-time danger alert.

**Old**: `` `Success! Level +${level+1} is a Danger Zone. Secure stabilizers before striking again.` ``  
**New**: `` `Forged to +${level}. Level +${level+1} enters the danger zone — stabilizer recommended.` ``

**Key changes**:
- "Forged to +N" anchors the result as an elite achievement first
- Drops exclamation mark — composure, not excitement
- "enters the danger zone" is more precise than "is a Danger Zone" (it implies the transition, not a static label)
- "stabilizer recommended" replaces "Secure stabilizers before striking again" — recommendation, not imperative

---

### 3.3 Safe Zone Success Cue: Flat System Message

**Location**: ~line 9608

**Issue**: `"Success. Level +N is safe. Proceed with striking."` — reads like a status report from an automated system, not a tactical briefing. No prestige language, no continuity with the forge journey narrative.

**Old**: `` `Success. Level +${level+1} is safe. Proceed with striking.` ``  
**New**: `` `Forged to +${level}. Safe zone — advance and strike again.` ``

**Key changes**:
- "Forged to +N" gives the same result-anchor as fix 3.2
- "Safe zone — advance and strike again" is forward-motion tactical language
- Drops "Level +N is safe" — the safe zone status is implied by the cue, not needing to be stated as a level-number fact

---

### 3.4 Danger Zone Failure Cue: Passive Verbose Copy

**Location**: ~line 9614

**Issue**: `"Enhancement level preserved in Danger Zone. Use a stabilizer for a safer retry."` — passive voice ("level preserved"), verbose framing ("for a safer retry"), and "Enhancement" is tutorial-grade. Does not match the tactical protocol tone of P-3D stabilizer messaging.

**Old**: `"Enhancement level preserved in Danger Zone. Use a stabilizer for a safer retry."`  
**New**: `"Strike failed — level held in the danger zone. Stabilizer recommended for the next attempt."`

**Key changes**:
- "Strike failed" is active, direct, matches the anvil-strike metaphor
- "level held" replaces "level preserved" — active voice
- "in the danger zone" is consistent with the modal's "DANGER ZONE" language
- "Stabilizer recommended for the next attempt." echoes P-3D advisory language pattern

---

### 3.5 Safe Zone Failure Cue: "Weapon Mastery" Jargon

**Location**: ~line 9618

**Issue**: `"Enhancement failed but level is safe. Strike again to accumulate weapon mastery."` — "weapon mastery" is an undefined term that doesn't correspond to any visible system in the game. Players seeing this copy have no way to know what "weapon mastery" refers to. Also "Enhancement failed but" uses a concessive construction that softens the result unnecessarily.

**Old**: `"Enhancement failed but level is safe. Strike again to accumulate weapon mastery."`  
**New**: `"Strike failed. Safe zone — level held. Strike again to advance."`

**Key changes**:
- "Strike failed." is direct and consistent with fix 3.4
- "Safe zone — level held." mirrors the success cue's "Safe zone —" prefix for arc consistency
- "Strike again to advance." replaces the jargon-laden accumulation framing with a simple forward directive

---

### 3.6 High-Level Salvage Panel Body: "Residue" Is Generic

**Location**: ~line 9580

**Issue**: `"Shards salvaged from residue."` — "residue" is a chemistry/cleaning word, not a forge or combat word. It undercuts the dramatic weight of a weapon shatter at elite level.

**Old**: `"Shards salvaged from residue. Craft stabilizers to protect your next high-level run."`  
**New**: `"Salvage secured from the wreck. Craft stabilizers for your next high-tier run."`

**Key changes**:
- "Salvage secured from the wreck" — "the wreck" is evocative of a destroyed weapon, not a chemistry byproduct
- "high-tier run" replaces "high-level run" — "tier" is more consistent with the rarity-scaling framing of P-3A/P-3B

---

### 3.7 Low-Level Break Tactical Cue: "Token Recovery" Currency Confusion

**Location**: ~line 9594

**Issue**: `"Minimal salvage — low-level shatters only return token recovery."` — "token recovery" sounds like a reference to Black Market Tokens (a real in-game currency). Players who have Black Market Tokens in their wallet may be confused about whether they're receiving tokens. The phrase should convey "a small amount" without naming a currency.

**Old**: `"Minimal salvage — low-level shatters only return token recovery. Reach +15 for meaningful salvage value."`  
**New**: `"Minimal salvage — low-level shatters return only a small payout. Reach +15 for meaningful recovery."`

**Key changes**:
- "only a small payout" — unambiguous size signal, no currency name
- "meaningful recovery" replaces "meaningful salvage value" — slightly more concise, echoes "recovery" language

---

## 4. Psychological Arc Verification

| Journey Step | Before P-3E | After P-3E | Arc Status |
| :--- | :--- | :--- | :--- |
| Guide Card | Informational | Informational | ✓ Appropriate |
| Threshold Education | Tactical (P-3B) | Tactical (P-3B) | ✓ Appropriate |
| Danger-Zone Modal | 3-tier prestige (P-3D) | 3-tier prestige (P-3D) | ✓ Appropriate |
| Success (danger zone) | Whiplash: celebrate → warn | Composed: anchor → tactical forward | ✓ Fixed |
| Success (safe zone) | Flat system report | Tactical momentum cue | ✓ Fixed |
| Failure (danger zone) | Passive verbose | Strike-failed + advisory | ✓ Fixed |
| Failure (safe zone) | "Weapon mastery" jargon | Direct advance cue | ✓ Fixed |
| Salvage Panel (≥15) | "from residue" | "from the wreck" | ✓ Fixed |
| Salvage Panel (<15) | "token recovery" confusion | "small payout" | ✓ Fixed |
| Prestige Toast | 3-tier prestige (P-3C) | 3-tier prestige (P-3C) | ✓ Appropriate |

Full arc: beginner curiosity → danger awareness → tactical investment → meaningful loss → recovery → prestige survival → legendary status. All steps now cohere.

---

## 5. Economy & Schema Verification

All 7 edits are display-only copy changes:
- `enhanceWeaponItem` — **unchanged**
- `getSalvagePayout` — **unchanged**
- `getEnhanceChance` — **unchanged**
- `requestEnhance` — **unchanged**
- `lastEnhancementResult` state shape — **unchanged**
- Save schema — **unchanged**
- PWA files (`sw.js`, `manifest.json`) — **untouched**

---

## 6. Remaining UX Risks

None introduced by P-3E. Pre-existing known issue: `breakPct` shows 20% for all levels 10–19 in the modal stats grid (the actual curve is more nuanced). Out of scope for the copy-only P-3 series.
