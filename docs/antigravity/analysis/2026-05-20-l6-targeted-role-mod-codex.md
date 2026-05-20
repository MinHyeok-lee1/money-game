# L-6 — Targeted Role Mod & Black Market Codex Panel
**Date:** 2026-05-20  
**Phase:** L-6  
**Scope:** `index.html` — rollTargetedWeaponModification + Codex panel + role selector UI

---

## Summary

Adds player agency over mod direction without guaranteeing a specific outcome.
3-token premium filters the roll to a chosen role. One slot, one mod, role-restricted random.
No new currencies, no multiple slots, no rarity, no guaranteed outcomes.

---

## STEP 3 — rollTargetedWeaponModification Handler

### Constants (component-scope)
```
VALID_TARGET_ROLES = Set { "BREACH", "ASSAULT", "EXECUTION", "PRECISION", "HEAVY" }
TARGETED_ROLL_COST = 3
```

### Gate order (all must pass before any mutation)
| Gate | Check | Failure reason |
|------|-------|----------------|
| 1 | weapon exists in inventory by instanceId | `weapon_not_found` |
| 2 | `item.broken !== true` | `weapon_broken` |
| 3 | `item.locked !== true` | `weapon_locked` |
| 4 | `wallet.blackMarketTokens >= 3` | `insufficient_tokens` |
| 5 | `VALID_TARGET_ROLES.has(targetRole)` | `invalid_role` |
| 6 | `WEAPON_MOD_POOL.filter(m => m.role === targetRole).length >= 1` | `empty_role_pool` |

### Execution path (all gates pass)
1. Capture `previousMod` from `item.mods[0]` — local variable, not persisted
2. Filter pool: `rolePool = WEAPON_MOD_POOL.filter(m => m.role === targetRole)`
3. Select: `rolePool[Math.floor(Math.random() * rolePool.length)]`
4. Pre-check: `newTokenBalance = currentTokens - 3 >= 0`
5. Commit via `updateGameState((prev) => ...)`:
   - Inner re-check: `prevTokens < 3 → return prev`
   - Deduct exactly 3: `Math.max(0, prevTokens - 3)`
   - Write: `inventory.map(w => w.instanceId === id ? { ...w, mods: [selectedMod] } : w)`
6. Set `lastRollResult` with `isTargeted: true`, `targetedRole`, `previousMod`, `tokenBalance`

### Result object
- Success: `{ success: true, mod, previousMod, tokenBalance, isTargeted: true, targetedRole }`
- Failure: `{ success: false, reason: "<gate-that-failed>" }` — no mutation

---

## STEP 4 — Black Market Tactical Codex Panel

### New local React state (component-level, not persisted)
```javascript
const [showCodexForWeapon, setShowCodexForWeapon] = useState(null);
const [targetRoleSelection, setTargetRoleSelection] = useState({});
```
- `showCodexForWeapon`: instanceId of weapon with codex open, or `null`
- `targetRoleSelection`: `{ [instanceId]: "BREACH" | null | ... }` — per-weapon role selection

### Workstation layout additions (order within `bg-zinc-950` terminal div)
1. Header row ← unchanged
2. Mod state display ← unchanged
3. Roll recap ← updated (see below)
4. Primary CTA (random, 1 token) ← unchanged
5. **[NEW] Targeted Role Override** — role pills + 3-token CTA + cost comparison note
6. Dual-action shard→token conversion ← unchanged
7. Token stockpile advisory ← L-5C fix
8. **[NEW] Codex toggle + list** — collapsed by default

### Targeted Role Override section
- **Header:** "지정 개조" + "🪙 3" cost badge
- **Role pills:** 5 buttons rendered from `WEAPON_MOD_POOL.map()`, each showing `{glyph} {ROLE}`
  - Selected pill: role color + `bg-zinc-700 border-zinc-500` highlight
  - Unselected: muted `text-zinc-500`
  - Toggling selected pill again deselects it (sets `null`)
- **CTA:** "지정 벼림 (Roll Locked Role)"
  - Disabled conditions (4 total): broken / locked / tokens < 3 / no role selected
  - Each shows localized reason in muted sub-line
- **Cost comparison note:** "무작위: 🪙 1 | 지정: 🪙 3"
  - Replaced by disabled reason when applicable

### Codex toggle + list
- **Toggle button:** "⚙ 전술 카탈로그 / Tactical Codex" with ▲/▼ indicator
- **Default state:** collapsed
- **Behavior:** clicking toggles `showCodexForWeapon` between `item.instanceId` and `null`
  - Multiple weapons: opening one implicitly closes others (single instanceId tracked)
- **Content (when open):** renders all 5 `WEAPON_MOD_POOL` entries:
  - Role badge in role color + glyph
  - Localized name (kr/en)
  - Stat string (`+{val}% {STAT}`)
  - Flavor description (6px muted)
- **Footer:** "현재 pool: 5종 전술 모듈 — 무작위 1종 지급"
- No interaction on codex entries — preview only

### Roll recap extension (targeted variant)
New `isTargeted` flag check added before `isReroll`:
- **Targeted header:** `"지정 개조 완료 — [{ROLE}] 모듈 장착"` in role color
- **Sub-line:** flavor description (same as first-roll path — not prev→current)
- **Stat line:** `"+{val}% {STAT} 활성화"` unchanged
- **Token line:** `"잔여 토큰: {balance}"` unchanged

---

## Economy Safety

| Check | Result |
|---|---|
| Deduction: exactly 3 tokens | ✅ `prevTokens - TARGETED_ROLL_COST` |
| Post-deduction tokens ≥ 0 | ✅ `Math.max(0, prevTokens - 3)` |
| Inner transaction re-validation | ✅ `if (prevTokens < 3) return prev` |
| inventory.map() — no mutation | ✅ |
| mods length after targeted roll | ✅ always exactly 1 |
| Invalid gate → no deduction | ✅ all gates return before updateGameState |
| New schema fields | ✅ none — state and role-selection are component-local |
| New persistent keys | ✅ none |
| New setInterval | ✅ none |

---

## Mobile Layout Verification

| Element | 360px behavior |
|---|---|
| Role pills (5 pills) | `flex flex-wrap gap-1` — wraps safely to 2 rows |
| Targeted CTA | `w-full` — no overflow |
| Codex list entries | `min-w-0 truncate` on name — no overflow |
| Cost comparison note | single line, `text-[7px]` — no clip |
| Codex toggle button | `w-full flex justify-between` — no overflow |
