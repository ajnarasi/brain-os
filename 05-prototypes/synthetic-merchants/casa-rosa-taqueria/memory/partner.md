---
type: partner
merchant: casa-rosa-taqueria
last_reviewed: 2026-04-14
---

# Partner memory — Casa Rosa Taqueria

## Channel (Axis 2)

**Primary channel:** ISV — **Clover App Market** (technically "ISV via Clover," though Clover is Fiserv-owned so this effectively functions as direct-via-Clover)

Casa Rosa came to Fiserv by signing up for Clover. She has no other relationship with Fiserv — no CommerceHub account, no direct sales contact, no separate TAM. Everything flows through Clover's product surface.

### Support routing
- **First line:** Maria or Luis self-serve in the Clover dashboard
- **Second line:** Clover Merchant Support (general support tier — no dedicated TAM for SMB)
- **Third line:** Fiserv back-end support (engaged indirectly through Clover if needed; Maria never sees this directly)

### Commercial relationship
- Pays Clover directly (month-to-month Clover Pro + Restaurant bundle)
- Clover is the relationship — Fiserv is invisible in day-to-day
- Hardware leased through Clover Capital

## Fiserv Platform (Axis 5)

### Front-end
- **Clover** — everything. Clover Flex (handhelds), Clover Mini (counters), Clover KDS, Clover Online Ordering, Clover App Market apps

### Back-end
- **Nashville (North)** — default for all card-present and card-not-present transaction flows
- **STAR / NYCE / Accel** — PIN debit routing

*No Buypass (no fuel), no TeleCheck (no check acceptance at restaurants), no ValueLink (gift cards not offered yet — Clover Rewards project may add this), no Omaha exposure, no Cardnet.*

### ISO 8583 dialect
- Nashville dialect for card transactions
- Clover normalizes most of the raw ISO 8583 detail away from merchants — Casa Rosa never sees raw DEs, only Clover's "decline" messages

## Data access scope

**Full** within the Clover ecosystem. Clover is Fiserv-owned so there's no partner agreement restricting telemetry.

## Branding

**Clover-branded.** The Brain should appear as a Clover feature (a "Brain" tab in the Clover dashboard or app), not as a Fiserv feature. Maria's trust relationship is with Clover; Fiserv is invisible behind the scenes. Never surface "Fiserv" in the Brain's UI language unless she specifically asks.

## Autonomy envelope

**High — do-it-for-me by default.**

| Action class | Default gate |
|---|---|
| Read-only retrieval, daily close narrative, dispute drafts | None |
| Draft a dispute response | None (draft only) |
| Mark a draft "ready to submit" (submit in demo = simulated) | One-click approval |
| Fraud rule tuning within the SMB envelope | Brain may suggest and act within a conservative range; show the merchant after |
| Reboot suggestion for a sluggish terminal | None — just tell Maria, she'll reboot |
| Contract or plan changes | **Always** require Maria's approval (she owns commercial decisions) |

SMB merchants like Casa Rosa want the Brain to do the work, not ask permission for every step. The envelope is deliberately loose inside the "ops automation" lane but tight for anything that touches contracts or money movement beyond what Clover already does autonomously.

## Escalation path

1. **Brain** handles → Maria sees the result in the daily close narrative or in-session
2. **Clover Merchant Support** — for hardware issues or platform bugs the Brain can't explain
3. **Luis** — for anything technical Maria doesn't understand (Brain should route technical questions to Luis when Maria is the user)
4. **Nobody else** — no TAM, no SE, no Fiserv direct contact in the SMB tier

## Freshness

- Channel + platform facts: **stable** — event-driven changes only
- Last verified: 2026-04-14
- Next review: if Maria adds a new Clover app or makes a major platform change (e.g., adding Clover Rewards from `proj-loyalty-clover-rewards`)
