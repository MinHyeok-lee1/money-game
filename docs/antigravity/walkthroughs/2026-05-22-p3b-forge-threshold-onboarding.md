# Phase P-3B: Forge Onboarding Tooltip & Threshold Education — Walkthrough

**Date**: 2026-05-22  
**Phase**: P-3B (Forge Onboarding Tooltip & Threshold Education Pass)  
**Type**: UX copy + layout change — no economy or schema changes

---

## 1. Overview

P-3B adds proactive education about the `+15` salvage threshold to two existing UI surfaces. The player now learns about the recovery structure **before** they forge, not only after shattering.

---

## 2. Change 1 — Confirmation Modal: Salvage Preview Row

**Location**: [`index.html`](file:///c:/Users/ryan/dev/money-game/index.html#L7938-L7949) — lines 7938–7949

Added directly after the stabilizer status row (line 7936 `)}`) inside the `forgeConfirmTarget` stats card, before the action buttons.

### What it shows:

```
[+15+ weapon]    💎 Est. Salvage if Broken  |  Meaningful shards (+15 zone)     ← amber
[<+15 weapon]    💎 Est. Salvage if Broken  |  Minimal — reach +15 for real salvage  ← slate
```

### JSX structure:
```jsx
{/* P-3B: Salvage threshold education row in confirm modal */}
{forgeConfirmTarget.level >= 15 ? (
  <div className="flex justify-between ... border-t border-white/5 pt-2">
    <span className="text-amber-400 uppercase">💎 Est. Salvage if Broken</span>
    <span className="text-amber-300 font-black">Meaningful shards (+15 zone)</span>
  </div>
) : (
  <div className="flex justify-between ... border-t border-white/5 pt-2">
    <span className="text-slate-500 uppercase">💎 Est. Salvage if Broken</span>
    <span className="text-slate-400 font-black">Minimal — reach +15 for real salvage</span>
  </div>
)}
```

### Behavioral notes:
- Uses `forgeConfirmTarget.level` (already in scope) — no new state
- Color-coded: amber = valuable recovery opportunity; slate = honest minimal return
- Appears on every danger-zone forge confirmation (when `level >= ENHANCE_BREAKAGE_START = 10`)

---

## 3. Change 2 — Forge Guide Card: Salvage Structure Note

**Location**: [`index.html`](file:///c:/Users/ryan/dev/money-game/index.html#L8930-L8949) — lines 8930–8949

Replaced the single-block `hasDangerZoneWeapon` conditional with a two-card `space-y-1.5` layout:
1. **Red block** (existing): Danger Zone warning — weapons can break at `+ENHANCE_BREAKAGE_START`+
2. **Amber block** (new — P-3B): Salvage Structure — "+14 and below: minimal salvage (5 shards). +15 and above: rarity-scaled recovery."

### EN copy:
```
SALVAGE STRUCTURE: +14 and below: minimal salvage (5 shards). +15 and above: rarity-scaled recovery. Higher rarity = more shards.
```

### KO copy:
```
파편 회수 구조: +14 이하 파괴 → 최소 파편(5). +15 이상 파괴 → 희귀 스케일 보상. 동등 무기라도 등급이 높으면 더 많은 파편이 지급됩니다.
```

### Behavioral notes:
- Visible only when `hasDangerZoneWeapon === true` — players who have no danger-zone weapons don't see this yet
- Always-visible (not dismissible) — ambient educational reference
- Amber tone matches the "Salvage if Broken" row color language from the modal

---

## 4. What Was NOT Changed

| Item | Status |
| :--- | :---: |
| `getSalvagePayout` math | ✅ Untouched |
| `getEnhanceChance` / `getBreakageChance` | ✅ Untouched |
| Stabilizer economy (crafting cost) | ✅ Untouched |
| Black Market economy | ✅ Untouched |
| `sw.js` / `manifest.json` (PWA) | ✅ Untouched |
| Save schema / persisted fields | ✅ No new fields |
| Forge recap logic (P-3A changes) | ✅ Untouched |
| Success / fail / danger-zone cues (recap) | ✅ Untouched |
| Forge confirmation CTA buttons | ✅ Untouched |
| Salvage history log | ✅ Untouched |

---

## 5. Verification Results

| Test | Expected Result | Verified |
| :--- | :--- | :---: |
| Confirmation modal for `+10` weapon | "Minimal — reach +15 for real salvage" (slate) | ✅ `forgeConfirmTarget.level=10, 10<15` |
| Confirmation modal for `+14` weapon | "Minimal — reach +15 for real salvage" (slate) | ✅ `forgeConfirmTarget.level=14, 14<15` |
| Confirmation modal for `+15` weapon | "Meaningful shards (+15 zone)" (amber) | ✅ `forgeConfirmTarget.level=15, 15>=15` |
| Confirmation modal for `+20` weapon | "Meaningful shards (+15 zone)" (amber) | ✅ `forgeConfirmTarget.level=20, 20>=15` |
| Forge Guide — no danger-zone weapon | No amber block shown | ✅ `hasDangerZoneWeapon=false` |
| Forge Guide — has danger-zone weapon | Both red + amber blocks shown | ✅ `hasDangerZoneWeapon=true` |
| KO language mode | Korean copy displays for both blocks | ✅ Both `language === "ko"` branches present |
| Actual shard payout unchanged | Verified `getSalvagePayout` untouched | ✅ |
| No save schema changes | No new fields | ✅ |
| No PWA changes | `sw.js`, `manifest.json` untouched | ✅ |
| No runtime errors | `forgeConfirmTarget.level` always defined when modal renders | ✅ (modal only renders when `forgeConfirmTarget !== null`) |

---

## 6. Files Changed

| File | Action |
| :--- | :--- |
| [`index.html`](file:///c:/Users/ryan/dev/money-game/index.html) | **Modified** — 2 UI blocks added (~22 lines) |
| [`docs/antigravity/analysis/2026-05-22-p3b-forge-threshold-onboarding.md`](file:///c:/Users/ryan/dev/money-game/docs/antigravity/analysis/2026-05-22-p3b-forge-threshold-onboarding.md) | **Created** — Analysis document |
| [`docs/antigravity/walkthroughs/2026-05-22-p3b-forge-threshold-onboarding.md`](file:///c:/Users/ryan/dev/money-game/docs/antigravity/walkthroughs/2026-05-22-p3b-forge-threshold-onboarding.md) | **Created** — This walkthrough |
| [`docs/task.md`](file:///c:/Users/ryan/dev/money-game/docs/task.md) | **Updated** — Phase P-3B checklist appended |
| [`TODO.md`](file:///c:/Users/ryan/dev/money-game/TODO.md) | **Updated** — Phase P-3B entry appended |

No temporary scripts were created. None were left behind.
