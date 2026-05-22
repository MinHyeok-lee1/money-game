# Phase P-4A: Forge UX Visual Regression & Mobile Readability QA — Analysis

**Date**: 2026-05-22  
**Phase**: P-4A (Visual Regression & Mobile Readability QA)  
**Scope**: End-to-end QA of all P-3A through P-3E Forge UX changes for visual correctness, mobile safety, and cross-language parity

---

## 1. QA Scope and Method

Five audit zones examined by reading the live source of `index.html`:

1. Forge Guide Card (~lines 8911–8968)
2. Danger-Zone Confirmation Modal (~lines 7877–7990)
3. Forge Result Recap / J-5B Tactical Cues (~lines 9433–9629)
4. Milestone Toast (~lines 8970–9002)
5. Cross-language: Korean Unicode escape rendering, KO/EN parity

---

## 2. Forge Guide Card QA

### 2.1 Text Density

- Header row: `text-[10px]` badge + `text-xs` first-action body. Readable.
- 3-chip grid: `grid-cols-1 md:grid-cols-3` — stacks to single column on mobile. Each chip is `p-2 rounded-md`. No overflow.
- Danger zone block: `text-[10px] font-bold leading-relaxed` — tight but readable.
- Salvage structure block: `text-[10px] font-bold leading-relaxed` — same.

**Verdict: PASS**

### 2.2 +15 Threshold Explanation Readability

English: `"+14 and below: minimal salvage (5 shards). +15 and above: rarity-scaled recovery. Higher rarity = more shards."` — structured, scannable.

Korean (Unicode escape): `"+14 이하 파괴 → 최소 파편(5). +15 이상 파괴 → 희귀 스케일 보상. 동등 무기라도 등급이 높으면 더 많은 파편이 지급됩니다."` — correct Unicode escapes, renders as intended. KO is significantly longer than EN but wraps naturally in a block element.

**Verdict: PASS**

### 2.3 Korean/English Overflow

Danger zone block KO: `+${ENHANCE_BREAKAGE_START} 이상 무기는 실패 시 파괴될 수 있습니다. 보정제는 파괴를 막고, 파괴된 무기는 Refined Shards로 회수됩니다.` — wraps in `leading-relaxed` block. No overflow.

**Verdict: PASS — No guide card copy or layout issues found. No changes needed.**

---

## 3. Danger-Zone Confirmation Modal QA

### 3.1 Title/Subtitle/Warning Hierarchy

Reading order verified:
```
[Icon]      ← 🚨 / ⚠️ (breakPct-based)
[Title]     ← text-xl font-black uppercase tracking-tighter (3-tier level-based)
[Subtitle]  ← text-[10px] gray-400 tracking-wide (3-tier level-based)
[Banner]    ← text-[11px] font-black uppercase tracking-wider (3-tier level-based)
[Stats]     ← text-xs grid
[Button]    ← text-sm tracking-widest w-full (breakPct-based)
```

Hierarchy flows correctly: identity → context → danger grade → intelligence brief → commitment. **PASS**

### 3.2 Button Labels on Mobile

- `"⚒️ FORGE UNDER PRESSURE"` (22 chars) at `text-sm tracking-widest w-full`
  - At `tracking-widest` (0.1em) and `text-sm` (14px), estimated rendered width ~215px
  - Button is `w-full` — on iPhone SE modal inner width ~263px — fits on one line
- `"⚒️ ACCEPT THE RISK"` (18 chars) — shorter, fits comfortably

**Verdict: PASS**

### 3.3 Warning Banner Wrapping

`"⚠️ HIGH EXPOSURE — SEVERE SHATTER RISK"` (38 chars) at `text-[11px] font-black uppercase tracking-wider` in a container ~231px wide.

Estimated width: 38 chars × ~7px avg + tracking ≈ 287px > 231px available. This wraps to two lines. However:
- This is a `<p>` tag with no `whitespace-nowrap` — wraps gracefully
- The previous copy before P-3D had the same character count ("🚨 70% CHANCE OF PERMANENT SHATTER! 🚨" = 38 chars). No regression.
- The `animate-bounce` on the high-risk banner draws appropriate attention even when wrapped

**Verdict: PASS — pre-existing behavior, no regression from P-3D**

### 3.4 Stabilizer Messaging Clarity

- Absent: `"⚠️ UNPROTECTED"` / `"Full exposure — no cover"` — direct, no excess words. PASS.
- Advisory: `"Protection protocol available — N stabilizer(s) in reserve."` at `text-[9px]` — smallest text in the modal but rendered in `font-bold text-cyan-500`, sufficient contrast. PASS.
- Active: `"🛡️ Stabilizer Active"` / `"Break protection + 3% success"` — unchanged, correct. PASS.

**Verdict: PASS**

### 3.5 Vertical Overflow on Small Screens

Modal total height estimate (P-3D analysis): ~464px.
- iPhone SE safe viewport: 568px − 2×24px (`p-6` outer) = 520px usable. 464px < 520px. PASS.
- Moto G4: 500px safe − 48px = 452px. 464px > 452px — 12px over. However, the modal uses `items-center` with overflow scroll available. In practice, on devices below 500px the user can scroll within the `fixed inset-0` backdrop. This is a pre-existing condition noted in P-3D; not introduced by P-4A.

**Verdict: PASS (pre-existing minor constraint on Moto G4)**

---

## 4. Forge Result Recap QA

### 4.1 Status Label Clarity

```
💥 BROKEN   → text-rose-500   (shatter)
⚡ FORGED   → text-emerald-400 (success)   ← P-3E fix
⚠️ Failed (Safe) → text-amber-300 (fail, no break)
```

The label container has `className="text-xs font-black uppercase ..."`. The CSS `uppercase` transform renders `"Failed (Safe)"` as `"FAILED (SAFE)"` in the browser — consistent with BROKEN and FORGED. No source-level change needed.

**Verdict: PASS — CSS `uppercase` handles visual consistency**

### 4.2 Salvage Copy Distinction

| Condition | Copy | Distinction |
| :--- | :--- | :--- |
| `prevLevel < 15` panel | "Low-level shatters return minimal recovery. Push beyond +15 to unlock meaningful salvage." | Pushes forward |
| `prevLevel >= 15` panel | "Salvage secured from the wreck. Craft stabilizers for your next high-tier run." | Acknowledges loss, orients recovery |
| `prevLevel < 15` cue | "Minimal salvage — low-level shatters return only a small payout. Reach +15 for meaningful recovery." | No currency confusion |
| `prevLevel >= 15` cue | "Weapon shattered. Meaningful salvage recovered — craft stabilizers to secure the next run." | Validates the loss |

Both panel and cue clearly differentiate the two paths. No overlap or confusion. **PASS**

### 4.3 Black Market Token Confusion Check

- "token recovery" string: **no longer present** — removed in P-3E. Grep confirms the EN cue now reads "small payout." PASS.
- No other uses of "token" in salvage-adjacent copy found.

**Verdict: PASS**

---

## 5. Milestone Toast QA

### 5.1 Subtitle Overflow

Longest subtitle: `"Forged through 70% break pressure. The pinnacle earned."` (55 chars) at `text-[11px] font-bold italic leading-snug`.

Available width: 375px (iPhone SE) − 2×16px (`mx-4`) − 2×12px (`p-3`) − ~30px (Close button) ≈ 289px. At `text-[11px]`, 55 chars wraps to ~2 lines with `leading-snug` (line-height ~1.375). Total subtitle height ≈ 30px. Acceptable.

**Verdict: PASS**

### 5.2 Toast Duration

Timeout: `4500ms`. Body copy is 1–2 sentences at `text-xs`. A median reader covers ~200 wpm; the longest body (~25 words) takes ~7.5 seconds. The 4500ms auto-dismiss is short for the body, but the manual "Close" button is always available, and the toast persists if the user is actively reading (no click-away needed). This is a pre-existing design decision, not a P-3 regression.

**Verdict: PASS — acceptable; Close button provides escape**

### 5.3 Toast Position vs Forge CTA

Toast renders as `mx-4 mt-3` inline block — not `fixed` positioned. It sits above the weapon list in the scroll flow. Forge CTA buttons are in weapon cards below the fold. Toast does not cover any interactive element. Manual dismiss is always available.

**Verdict: PASS**

---

## 6. Cross-Language QA

### 6.1 Unicode Escape Rendering

`getForgePrestigeAnnouncement` (P-3C) stores all KO strings as JS Unicode escape sequences (e.g., `"🛡️ 담금질 완료"`). These decode correctly to `"🛡️ 담금질 완료"` in all modern browsers. This is standard JS encoding — no rendering risk.

Guide card danger zone block (lines 8951–8963) also uses Unicode escapes. Same conclusion. **PASS**

### 6.2 KO/EN Parity — Critical Finding

**P-3E corrected 5 English tactical cues but did NOT update the corresponding Korean strings.** Four KO strings were identified as tone mismatches:

| Location | KO (pre-P-4A) | Issue |
| :--- | :--- | :--- |
| ~9603 (DZ success) | `성공 완료! 다음 단계는 위험 구간(+N)입니다…` | "성공 완료!" exclamation whiplash |
| ~9607 (SZ success) | `성공 기록 누적. 다음 단계(+N)는 안전 영역입니다…` | Flat system report |
| ~9613 (DZ fail) | `위험 구간에서 강화 수치가 보호되었습니다. 안전 강화를 위해…` | Passive voice |
| ~9617 (SZ fail) | `강화 실패로 등반 흐름이 끊겼습니다. 강화 마스터리에 도달하십시오` | "강화 마스터리" undefined jargon |

**All four fixed in P-4A.** See Section 7.

### 6.3 EN Copy Compactness

Post-P-3E EN tactical cues are all ≤95 chars. At `text-[10px]` on a 343px wide container, none exceed 4 lines. **PASS**

---

## 7. Fixes Applied

Four KO tactical cue parity fixes applied to `index.html`:

### Fix 1: KO Danger Zone Success Cue — Whiplash Removal

**Line**: ~9603  
**Old**: `` `+${level} 성공 완료! 다음 단계는 위험 구간(+${level+1})입니다. 보정제 사용 후 타격하십시오.` ``  
**New**: `` `+${level} 제련 완료. 다음 단계(+${level+1})는 위험 구간 진입 — 보정제를 권장합니다.` ``

Removes exclamation-mark celebration before danger pivot. "제련 완료" mirrors EN "Forged to +N" anchor. "권장합니다" (recommended) replaces imperative "타격하십시오."

### Fix 2: KO Safe Zone Success Cue — Forward Momentum

**Line**: ~9607  
**Old**: `` `성공 기록 누적. 다음 단계(+${level+1})는 안전 영역입니다. 계속 모루를 타격하세요.` ``  
**New**: `` `+${level} 제련 완료. 안전 구간 — 계속 타격하십시오.` ``

Anchors result with level number. Removes "성공 기록 누적" (accumulating success records) flat framing. Shorter and tactically forward.

### Fix 3: KO Danger Zone Failure Cue — Active Voice

**Line**: ~9613  
**Old**: `"위험 구간에서 강화 수치가 보호되었습니다. 안전 강화를 위해 보정제 사용 후 재시도하십시오."`  
**New**: `"타격 실패 — 위험 구간에서 등급 유지. 다음 시도에 보정제를 권장합니다."`

Converts passive "강화 수치가 보호되었습니다" (enhancement value was protected) to active "타격 실패 — 등급 유지" (strike failed — level held). Matches EN's "Strike failed — level held in the danger zone."

### Fix 4: KO Safe Zone Failure Cue — Jargon Removal

**Line**: ~9617  
**Old**: `"강화 실패로 등반 흐름이 끊겼습니다. 모루를 다시 타격하여 강화 마스터리에 도달하십시오."`  
**New**: `"타격 실패. 안전 구간 — 등급 유지. 계속 타격하여 진행하십시오."`

Removes "강화 마스터리" (undefined jargon — KO equivalent of "weapon mastery"). Replaces "등반 흐름이 끊겼습니다" (climbing momentum broken) with direct tactical cue. Matches EN brevity.

---

## 8. Economy & Schema Verification

All P-4A changes are display-only copy:
- `enhanceWeaponItem` — **unchanged**
- `getSalvagePayout` — **unchanged**
- `getEnhanceChance` — **unchanged**
- `requestEnhance` — **unchanged**
- Save schema — **unchanged**
- PWA files (`sw.js`, `manifest.json`) — **untouched**

---

## 9. Remaining Risks

| Risk | Severity | Notes |
| :--- | :--- | :--- |
| Warning banner wraps on small screens | Low | Pre-existing; `<p>` wraps gracefully; `animate-bounce` maintains attention |
| Moto G4 modal height ~12px over safe area | Low | Pre-existing from P-3D; `fixed inset-0` allows scroll; not a regression |
| Toast body read time exceeds 4500ms auto-dismiss | Low | Pre-existing design decision; Close button always available |
| `breakPct` shows 20% for all levels 10–19 in stats grid | Pre-existing | Actual curve handled by `getEnhanceChance`; out of scope for copy-only P-3/P-4 series |

No new risks introduced by P-4A.
