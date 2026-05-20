# Implementation Plan: Phase J-4G Onboarding & Empty State Pass

This document details the implementation plan for Phase J-4G, focusing on UX clarity improvements in the Smith & Shards enhancement module.

## Goal Description
Enhance the onboarding experience and empty-state guidance for the Smith & Shards screen without modifying core mechanics, game state schemas, or RPG combat/Hero's Fate formulas.

## Proposed Changes

### Smith & Shards UI Component (`index.html`)
- **[MODIFY]** Inject a compact first-time forge guide panel explaining the core enhancement loop.
- **[MODIFY]** Explain the role of each currency clearly:
  - **Dividends (DIV):** used to call weapon/character supply.
  - **Cash:** used to strike the anvil and enhance weapons.
  - **Refined Shards:** used to craft stabilizers or recover from weapon breakage.
- **[MODIFY]** Provide a recommended first-action call-out pointing the player to claiming the starter weapon or using Dividends for supply draws.
- **[MODIFY]** Implement empty armory/inventory messaging detailing how to get started when `enhancementInventory` is empty.
- **[MODIFY]** Display conditional danger-zone warnings when a player owns a weapon enhanced to `+6` or higher (`ENHANCE_BREAKAGE_START`), warning them of potential break risk.
- **[MODIFY]** Provide distinct text boundaries clarifying the mock prototype sandbox is safe and actions there do not write to the live game state.

## Verification Plan

### Automated Verification
- Verify that there are no new `setInterval` timers or schema migrations.

### Manual Verification
- Launch the application and navigate to the Enhancement tab.
- If inventory is empty, confirm that the empty armory block appears with the recommended first action copy.
- Claim the starter weapon and draw items. Confirm the empty block is replaced by the inventory.
- Ensure the first-time forge guide panel is clearly visible and correctly localized (EN/KO).
- Obtain or simulate a `+6` weapon and confirm that the danger-zone warning strip appears on the item and in the guide header.
- Confirm sandbox warning clearly marks mockup actions as separate from real wallet transactions.
