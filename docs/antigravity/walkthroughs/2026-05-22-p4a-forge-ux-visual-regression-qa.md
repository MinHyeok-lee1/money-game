# Phase P-4A: Forge UX Visual Regression & Mobile Readability QA — Walkthrough

**Date**: 2026-05-22  
**Phase**: P-4A  
**Files Changed**: `index.html`

---

## 1. Current Branch

`main`

---

## 2. Files Changed

| File | Change Type |
| :--- | :--- |
| `index.html` | 4 KO tactical cue copy fixes |

---

## 3. Forge Guide Card QA

| Check | Result |
| :--- | :--- |
| Text density — readable at mobile widths | PASS |
| +15 threshold explanation — structured and scannable | PASS |
| EN copy — compact, wraps without overflow | PASS |
| KO copy — Unicode escapes render correctly as Korean | PASS |
| 3-chip grid stacks to 1 col on mobile | PASS |

No changes needed.

---

## 4. Confirmation Modal QA

| Check | Result |
| :--- | :--- |
| Title/subtitle/warning hierarchy — correct reading order | PASS |
| "ELITE FORGE COMMITMENT" (22 chars) fits on one button line | PASS |
| Warning banner wraps gracefully — pre-existing behavior, no regression | PASS |
| Stabilizer absent row — "UNPROTECTED" / "Full exposure — no cover" clear | PASS |
| Advisory text — "Protection protocol available" readable at text-[9px] | PASS |
| Salvage row — "Meaningful shards (+15 zone)" / "Minimal — reach +15" distinct | PASS |
| Total modal height ~464px < 520px iPhone SE safe area | PASS |

No changes needed.

---

## 5. Result Recap QA

| Check | Result |
| :--- | :--- |
| "⚡ FORGED" uppercase — CSS `uppercase` renders "Failed (Safe)" as "FAILED (SAFE)" | PASS |
| Low-level vs high-level salvage copy — clearly distinct | PASS |
| "token recovery" — no longer present (removed P-3E) | PASS |
| Tactical cues EN — all 5 states correct tone | PASS |
| Tactical cues KO — 4 parity gaps found and fixed (see Section 8) | FIXED |

---

## 6. Milestone Toast QA

| Check | Result |
| :--- | :--- |
| Longest subtitle (55 chars) wraps to ~2 lines, fits in toast | PASS |
| 4500ms auto-dismiss — short but Close button always available | PASS |
| Toast is inline (not fixed) — does not cover forge CTA buttons | PASS |
| All three toast tones (amber/purple/red) render without conflict | PASS |

No changes needed.

---

## 7. Cross-Language QA

| Check | Result |
| :--- | :--- |
| Unicode escape sequences in P-3C function decode correctly | PASS |
| Unicode escape sequences in guide card danger zone block decode correctly | PASS |
| KO danger zone success cue — "성공 완료!" whiplash | FIXED |
| KO safe zone success cue — flat system report | FIXED |
| KO danger zone failure cue — passive voice | FIXED |
| KO safe zone failure cue — "강화 마스터리" jargon | FIXED |
| EN copy compactness — all tactical cues ≤95 chars | PASS |

---

## 8. Fixes Applied

### Fix 1: KO Danger Zone Success — Whiplash Removal (~line 9603)

**Old**: `` `+${level} 성공 완료! 다음 단계는 위험 구간(+${level+1})입니다. 보정제 사용 후 타격하십시오.` ``  
**New**: `` `+${level} 제련 완료. 다음 단계(+${level+1})는 위험 구간 진입 — 보정제를 권장합니다.` ``

Removes "성공 완료!" exclamation. Mirrors EN "Forged to +N" anchor pattern.

### Fix 2: KO Safe Zone Success — Flat Message Fix (~line 9607)

**Old**: `` `성공 기록 누적. 다음 단계(+${level+1})는 안전 영역입니다. 계속 모루를 타격하세요.` ``  
**New**: `` `+${level} 제련 완료. 안전 구간 — 계속 타격하십시오.` ``

Anchors result with level. Removes "성공 기록 누적" passive accumulation framing.

### Fix 3: KO Danger Zone Failure — Active Voice (~line 9613)

**Old**: `"위험 구간에서 강화 수치가 보호되었습니다. 안전 강화를 위해 보정제 사용 후 재시도하십시오."`  
**New**: `"타격 실패 — 위험 구간에서 등급 유지. 다음 시도에 보정제를 권장합니다."`

Passive → active voice. Mirrors EN "Strike failed — level held."

### Fix 4: KO Safe Zone Failure — Jargon Removal (~line 9617)

**Old**: `"강화 실패로 등반 흐름이 끊겼습니다. 모루를 다시 타격하여 강화 마스터리에 도달하십시오."`  
**New**: `"타격 실패. 안전 구간 — 등급 유지. 계속 타격하여 진행하십시오."`

Removes "강화 마스터리" (undefined jargon). Mirrors EN "Strike failed. Safe zone — level held."

---

## 9. Remaining Risks

| Risk | Severity | Notes |
| :--- | :--- | :--- |
| Warning banner wraps on very small screens | Low | Pre-existing; graceful `<p>` wrap |
| Moto G4 modal height ~12px over safe area | Low | Pre-existing from P-3D |
| Toast body read time exceeds 4500ms | Low | Pre-existing design decision; Close always available |
| `breakPct` simplified to 20/70 in modal stats grid | Pre-existing | Out of scope for copy-only series |

---

## 10. Recommended Commit Message

```
qa(forge): P-4A visual regression and mobile readability QA

Full audit of P-3A–P-3E Forge UX changes:
- Guide Card: PASS — no changes needed
- Danger-Zone Modal: PASS — hierarchy, button fit, mobile height verified
- Result Recap: PASS — status labels, salvage distinction, no token confusion
- Milestone Toast: PASS — subtitle fit, dismiss timing, CTA clearance

Cross-language fix: 4 KO tactical cues updated for P-3E parity:
- DZ success: remove "성공 완료!" whiplash
- SZ success: flat system report → tactical forward cue
- DZ failure: passive → "타격 실패 — 등급 유지" active voice
- SZ failure: "강화 마스터리" jargon removed

No economy, schema, or PWA changes.
```

---

## 11. Recommended Next Phase

**P-4B** — Forge UX Accessibility & Contrast Pass  
Review the complete Forge flow for color contrast ratios (WCAG AA), touch target sizes, and screen-reader label coverage. Specifically: danger zone red palette at `text-[9px]`/`text-[10px]`, amber toast copy at `opacity-70`, and stabilizer advisory at `text-[9px] text-cyan-500`. Scope: className adjustments only, no layout or economy changes.

---

## P-3/P-4A Series Checkpoint

| Phase | Scope | Status |
| :--- | :--- | :--- |
| P-3A | Salvage recap differentiation | ✓ Complete |
| P-3B | +15 threshold onboarding | ✓ Complete |
| P-3C | Milestone prestige cue hierarchy | ✓ Complete |
| P-3D | Danger-zone modal prestige audit | ✓ Complete |
| P-3E | End-to-end Forge UX cohesion pass | ✓ Complete |
| P-4A | Visual regression & mobile readability QA | ✓ Complete |
