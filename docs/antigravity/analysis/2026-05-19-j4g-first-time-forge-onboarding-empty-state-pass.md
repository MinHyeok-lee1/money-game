# Phase J-4G: First-Time Forge Onboarding / Empty-State Pass

## Summary

Phase J-4G is a UX clarity pass for the Smith & Shards enhancement screen. It adds first-time forge guidance, currency role explanations, empty inventory guidance, danger-zone context, and clearer real forge versus sandbox copy.

This pass does not add gameplay systems, currencies, intervals, persistence fields, combat formulas, Hero's Fate behavior, RPG combat behavior, black market features, auction systems, tutorial modal chains, or visual particle/canvas effects.

## Onboarding Improvements

- Added a compact first-time forge guide near the top of the enhancement screen.
- Added recommended first action copy: claim a starter weapon or spend Dividends on supply draws, then select a weapon and strike the anvil with Cash.
- Kept the live forge CTA path dominant by pointing the player back to the existing weapon draw and anvil strike loop instead of adding a modal tutorial.

## Currency Clarity

- Dividends: draw weapons through supply calls.
- Cash: strike the anvil for live weapon enhancement.
- Refined Shards: craft stabilizers and recover value after breakage.

## Empty Inventory State

- Replaced the generic empty inventory label with explicit armory guidance.
- The empty state now explains why no forge action is available yet and recommends the first loop: claim weapon, strike anvil, equip squad.

## Danger-Zone Clarity

- Added conditional danger-zone copy when the player owns an unbroken weapon at +6 or higher.
- The warning explains that +6 or higher weapons can break on failure, stabilizers prevent breakage, and shattered weapons return Refined Shards.

## Sandbox Boundary

- Added explicit copy to the prototype sandbox panel stating that sandbox actions do not save.
- The copy clarifies that real weapons, Cash, Dividends, and Refined Shards only change in the live app view.

## Safety Verification Targets

- No new `setInterval` calls.
- `GAME_STATE_STORAGE_KEY` remains `moneyGameUniverseStateV1`.
- No save schema changes.
- No Hero's Fate settlement or odds changes.
- No RPG combat formula changes.
- No External Capital formula changes.
- No SEO/static file changes.

## Known Limitations

- The new guide copy is inline with the surrounding enhancement tab copy instead of centralized into the broader translation dictionaries.
- No interactive tutorial chain was added by design.
- No browser visual QA was performed in this pass.

## Recommended Next Phase

Phase J-5 should begin incremental implementation planning from the stabilized UX foundation, with particular attention to preserving save compatibility and formula safety.
