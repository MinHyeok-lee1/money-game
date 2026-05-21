# Project Analysis: Offline Payouts Exploit & Inflation QA (M-1A)

This analysis evaluates the offline progress calculations, exploit surfaces, and inflation risks of the Money Game Universe gameplay loop.

## Offline progression parameters

- **Wartime Cash (Passive Income)**: Derived from the Landlord multiplier and passive income per second:
  $$\text{Income per Sec} = \text{Landlord Multiplier} \times \sum (\text{Base Income}_i \times \text{Count}_i)$$
- **Refined Shards**: Issued only to players at stage 101 or above in Infinite Mode, using the intensity tier rate:
  $$\text{Shards Rate per Min} = 2 + 2 \times \text{Intensity Tier} \times 0.05$$
  $$\text{Intensity Tier} = \lfloor \frac{\text{Stage} - 100}{10} \rfloor + 1$$
- **Shards-to-Token Conversion Rate**: 100 Shards = 1 Black Market Token.
- **Weapon Reroll Cost**: 1 Token (Random) or 3 Tokens (Targeted).

---

## 1. Timestamp Safety Audits

### 1.1. Missing / Null Timestamps
If the `lastSavedAt` setting is omitted, the game skips offline calculation and initializes with zero offline elapsed time.

### 1.2. Invalid Timestamps
An invalid timestamp (e.g. string corruptions) parses as `NaN` by `Date.parse()`. Our code enforces `isFinite(lastSavedTime) && lastSavedTime > 0` validation. Invalid formats fail this guard and yield zero offline progress.

### 1.3. Future Timestamps
If the user modifies their system clock to the past or edits `lastSavedAt` to a future timestamp, `Date.now() - lastSavedTime` will yield a negative number. Our clamp `Math.max(0, ...)` bounds the elapsed time to 0, ensuring future times yield zero progress.

### 1.4. Huge Elapsed Times (Uncapped)
Without a cap, leaving the game closed for 7 days (10,080 minutes) yields:
- At Stage 150 (intensity rate = 2.6 shards/min): 26,208 shards (262 tokens).
- At Stage 300 (intensity rate = 4.1 shards/min): 41,328 shards (413 tokens).
This completely breaks the mod economy. Adding a strict limit of `MAX_OFFLINE_SECONDS = 43200` (12 hours) prevents this exploit.
- Maximum shards at Stage 150 is capped at 1,872 shards (18 tokens).
- Maximum shards at Stage 300 is capped at 2,952 shards (29 tokens).

---

## 2. Duplicate Payout Mitigation

To prevent players from rapidly closing and reopening the game or refreshing the browser to claim duplicate rewards (double-payouts):
- The `loadGameState` script processes offline progress and **immediately** updates the state's `lastSavedAt` property to the current timestamp.
- It calls `saveGameState()` **immediately** before loading the React app.
- This creates an atomic check-and-update flow. By the time the UI modal renders, the storage timestamp has already been advanced, preventing double-dipping.

---

## 3. Inflation & Economy Stability Matrix

The table below outlines the token generation velocity under normal play vs. maximum capped offline progress (12h limit):

| Player Stage | Intensity Tier | Shard Rate (per min) | 8h Payout (Tokens) | 12h Capped Payout (Tokens) | Inflation Risk Assessment |
|---|---|---|---|---|---|
| **Stage 1–100** | N/A | 0.0 | 0.0 | 0.0 | **Zero** (Excluded from Shard drops) |
| **Stage 101–110** | 1 | 2.1 | 10.0 | 15.0 | **Low** (Basic progression start) |
| **Stage 150** | 6 | 2.6 | 12.0 | 18.0 | **Medium** (Affords 6 targeted rerolls) |
| **Stage 200** | 11 | 3.1 | 14.0 | 22.0 | **Medium** (Standard end-game pacing) |
| **Stage 300** | 21 | 4.1 | 19.0 | 29.0 | **Medium-High** (Max limit handles pressure) |

*Conclusion*: Applying `MAX_OFFLINE_SECONDS = 43200` successfully mitigates inflation pressure on the weapon modification system.
