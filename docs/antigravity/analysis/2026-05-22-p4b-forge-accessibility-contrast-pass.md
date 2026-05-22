# Phase P-4B: Forge UX Accessibility & Contrast Pass — Analysis

**Date**: 2026-05-22  
**Phase**: P-4B (Accessibility & Contrast Pass)  
**Scope**: Color contrast, small-text readability, touch target sizing, and modal accessibility across all Forge UI sections

---

## 1. Audit Method

Four audit zones examined against WCAG 2.1 AA standards and mobile HIG guidelines:

1. **Color Contrast** — WCAG AA 4.5:1 minimum for small text (<18px normal, <14px bold)
2. **Small Text** — Minimum 10px for any user-facing content carrying meaning
3. **Touch Targets** — iOS HIG / WCAG 2.5.5 recommend ≥44pt; practical floor ≥30px for secondary controls
4. **Modal Accessibility** — Hierarchy legibility without color dependency, Korean overflow safety

Reference luminance values used (sRGB approximations):
- `gray-400` (#9ca3af) ≈ L=0.370 → contrast on `black/40+gray-900` bg ≈ **7.9:1** ✓
- `gray-500` (#6b7280) ≈ L=0.182 → contrast on same bg ≈ **4.38:1** (marginal miss vs 4.5:1 AA)
- `slate-400` (#94a3b8) ≈ L=0.333 → contrast ≈ **7.2:1** ✓
- `slate-500` (#64748b) ≈ L=0.176 → contrast ≈ **4.26:1** (miss vs 4.5:1 AA)
- `cyan-500` (#06b6d4) ≈ L=0.350 → contrast ≈ **7.5:1** ✓ (advisory text passes)

---

## 2. Color Contrast Audit

### 2.1 Danger-Zone Modal Stats Grid Labels

**Location**: ~lines 7922–7932 — "Weapon", "Success", "Break Risk" label spans

**Issue**: `text-gray-500` on `bg-black/40` overlay on `bg-gray-900` yields ≈ 4.38:1. WCAG AA requires 4.5:1 for non-large text. At `text-xs font-bold` (12px bold), this is sub-threshold bold text — does not qualify as "large" text (requires ≥14pt/~18.67px bold).

**Fix**: `text-gray-500` → `text-gray-400` (≈7.9:1). Visual hierarchy preserved: values remain white/emerald/red (bright); labels are now gray-400 (muted but readable).

### 2.2 Minimal Salvage Row Label

**Location**: ~line 7961 — "💎 Est. Salvage if Broken" label (low-level variant)

**Issue**: `text-slate-500` on same dark overlay background ≈ 4.26:1. Below 4.5:1 AA.

**Fix**: `text-slate-500` → `text-slate-400` (≈7.2:1). The muted-vs-amber distinction between the two salvage tier labels is maintained via the amber-400 color of the high-level variant — color hierarchy does not depend on the label shade alone.

### 2.3 Stabilizer Advisory

**Location**: ~line 7946 — "Protection protocol available — N stabilizer(s) in reserve."

**Color**: `text-cyan-500` ≈ L=0.350 on dark bg → ≈7.5:1. **PASS** — No contrast change needed.

### 2.4 Toast Subtitle (`opacity-70`)

**Location**: ~line 8986 — `text-[11px] font-bold italic opacity-70`

**Composite**: `text-amber-50/purple-50/red-50` at 70% opacity on `bg-amber-950/purple-950/red-950`. Blended effective color is a muted warm-tinted near-white on a very dark tinted background. Estimated contrast ≥7:1 in all three tone variants. **PASS** — No change needed.

### 2.5 Rose Shatter Panel / Emerald Success Panel

**Location**: ~lines 9568–9584

- Shatter header: `text-rose-400` on `bg-rose-950/30` — rose-400 ≈ L=0.26, rose-950/30 is very dark → ≈ 5.4:1. **PASS**
- Shatter body: `text-rose-300` on same bg → even higher contrast. **PASS**
- Emerald success label: `text-emerald-400` on `bg-slate-950/80` → ≈ 5.1:1. **PASS**

### 2.6 Amber vs Red Meaning Confusion Risk

Amber is used for: forge warnings (guide card danger zone header text is `text-red-300`/`text-red-100`), stabilizer advisory label, and failure-state status in result recap.  
Red is used for: break risk values, shatter results, danger-zone modal elements.

The two colors are semantically distinct:
- Red = immediate danger / breakage
- Amber = advisory / muted salvage info / failure (no break)

No semantic overlap found. **PASS**

---

## 3. Small Text Readability Audit

### Inventory of `text-[9px]` and below in Forge UI

| Location | Size | Content | Criticality |
| :--- | :--- | :--- | :--- |
| ~7946: Stabilizer advisory in modal | `text-[9px]` | "Protection protocol available — N in reserve." | **HIGH** — key pre-forge decision info |
| ~8920: Guide card "LIVE FORGE" badge | `text-[9px]` | "LIVE FORGE" / "실전 제련" | Low — decorative status |
| ~9428: "LIVE LINK" recap badge | `text-[9px]` | "LIVE LINK" / "실시간 연동됨" | Low — decorative status |
| ~9513: Stabilizer boost indicator | `text-[9px]` | "(+3% 🛡️)" in Chance vs Fate cell | Medium — supplementary |
| ~10004: Locked-state inline label | `text-[9px]` | "🔒 Locked — Enhancement blocked. Unlock first." | **HIGH** — action-blocking state info |
| ~10061: Mod workstation header | `text-[9px]` | "⚙️ Mod Workstation" | Low — decorative section header |
| ~10062: Slot indicator | `text-[8px]` | "[1/1]" | Low — purely decorative |
| ~10064: [BLACK MARKET] badge | `text-[7px]` | "[BLACK MARKET]" | Low — decorative brand tag |

**Fixes applied** to HIGH criticality items:
- Stabilizer advisory: `text-[9px]` → `text-[10px]`
- Locked-state label: `text-[9px]` → `text-[10px]`

**Not fixed** (decorative/low criticality):
- Guide card "LIVE FORGE" badge: decorative context label, no decision value
- "LIVE LINK" badge: purely ornamental sync indicator
- "(+3% 🛡️)" boost tag: supplementary to primary stat display
- Mod workstation headers (7px, 8px, 9px): section badges, not forge-critical

---

## 4. Touch Target Audit

Reference: iOS HIG recommends ≥44pt (≈44px CSS at 1x DPR). WCAG 2.5.5 recommends ≥44×44px. Practical floor for secondary controls: ≥28–32px.

### Pre-fix Measurements

| Control | Padding | Estimated Height | Status |
| :--- | :--- | :--- | :--- |
| Modal confirm button (`py-4 text-sm`) | 16+16 | ~52px | ✓ PASS |
| Modal cancel button (`py-3 text-xs`) | 12+12 | ~44px | ✓ Borderline PASS |
| Toast "Close" button (`py-1 text-[10px]`) | 4+4 | ~22px | ✗ FAIL |
| Enhance button in card (`py-1.5 text-xs`) | 6+6 | ~28px | ✗ FAIL |
| Stabilizer button in card (`py-1.5 text-[10px]`) | 6+6 | ~28px | ✗ FAIL |
| Lock/unlock button (`py-1 text-[10px]`) | 4+4 | ~22px | ✗ FAIL |

### Post-fix Measurements

| Control | New Padding | New Height | Delta |
| :--- | :--- | :--- | :--- |
| Toast "Close" button | `py-1.5` | ~30px | +8px |
| Enhance button | `py-2` | ~32px | +4px |
| Stabilizer button | `py-2` | ~32px | +4px |
| Lock/unlock button | `py-1.5` | ~30px | +8px |

All four corrected controls remain below the 44px ideal but clear the practical 28px secondary-control floor. The modal confirm/cancel buttons were already adequate and unchanged.

### Why Not 44px for Card Buttons?

Increasing weapon-card forge buttons to `py-4` (44px) would inflate each weapon card by ~24px per button row. With 5–10 weapons in inventory, this adds 120–240px of scroll content. The chosen `py-2` / `py-1.5` improvements are the best balance of usability and layout density.

---

## 5. Modal Accessibility Audit

### 5.1 Primary vs Secondary Action Hierarchy

| Element | Visual Treatment | Non-color Signal |
| :--- | :--- | :--- |
| Confirm button | `bg-red-700 py-4 w-full shadow-lg font-black` | Full-width, heavy shadow, 52px tall |
| Cancel button | `bg-transparent py-3 w-full text-gray-500` | No background, smaller padding, muted text |

Hierarchy is legible without color: full-width heavy button vs borderless quiet button. **PASS**

### 5.2 Korean Copy Overflow

- Modal title KO: "정예 제련 작전" (7 chars) at `text-xl` — fits single line. **PASS**
- Modal subtitle KO longest: "고위험 구간. 파괴 시 의미 있는 파편을 회수합니다." (24 chars) at `text-[10px]` — wraps to 2 lines in ~263px container. **PASS**
- Warning banner KO longest: "⚠️ 고노출 — 무기 중대 위험" at `text-[11px]` — fits on one line. **PASS**
- Advisory KO: "보호 프로토콜 가동 가능 — 보정제 N개 보유." at `text-[10px]` — fits one line even at min width. **PASS**

### 5.3 Danger/Safe State Distinction Beyond Color

| State | Color | Non-color Signal |
| :--- | :--- | :--- |
| 70%+ break | Red border + glow + `animate-pulse` + 🚨 | Animation, icon, border |
| <70% break | Dark red border, no animation, ⚠️ | Icon difference, no glow |
| Stabilizer active | Cyan text | 🛡️ icon |
| Unprotected | Red text | ⚠️ icon |

States are distinguishable without relying solely on color. **PASS**

---

## 6. Economy & Schema Verification

All P-4B changes are `className` attribute modifications only:
- `enhanceWeaponItem` — **unchanged**
- `getSalvagePayout` — **unchanged**
- `getEnhanceChance` — **unchanged**
- `requestEnhance` — **unchanged**
- Save schema — **unchanged**
- PWA files (`sw.js`, `manifest.json`) — **untouched**

---

## 7. Remaining Risks

| Risk | Severity | Notes |
| :--- | :--- | :--- |
| Card buttons still below 44px ideal | Low | `py-2` (~32px) is a practical compromise; full 44px would inflate inventory scroll significantly |
| Decorative 7px/8px text in mod workstation | Low | Non-forge-critical badge labels; out of scope for P-4B copy-only pass |
| `breakPct` shows 20% for all levels 10–19 in modal | Pre-existing | Actual chance from `getEnhanceChance`; out of scope |
| Moto G4 modal height | Pre-existing | Carried from P-3D; scroll available within fixed overlay |
