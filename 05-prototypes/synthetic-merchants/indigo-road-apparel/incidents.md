---
merchant: indigo-road-apparel
file_type: synthetic_incidents
count: 3
source_type: "synthetic-demo-data"
---

# Historical incidents — Indigo Road Apparel

Three significant past incidents. Each one seeds the Brain's IncidentAgent with a narrative pattern + ties to a feedback-memory entry.

---

## bfcm-2024-3ds-retry — "BFCM 2024 3DS v1/v2 retry loop"

**Severity:** P0 (critical)
**Date:** 2024-11-29 23:00 PT → 2024-11-30 05:00 PT (6-hour window)
**Impact:** ~$180,000 in declined volume during Cyber Monday morning
**Status:** Resolved 2024-11-30 05:12 PT

### Narrative

During peak BFCM (Cyber Monday early morning), a 3DS v1/v2 retry loop in the Shopify middleware caused a cascade of issuer blocks, primarily affecting Capital One BINs 414720–414729. Root cause: a legacy `fallback_v1_on_v2_friction=true` flag left over from the 3DS 1.0 era, which caused the middleware to retry at 3DS v1 whenever 3DS 2.x frictionless soft-declined.

Issuers interpreted the rapid retry as suspicious and blanket-blocked the cardholder for ~24 hours. The 24-hour cooldown torched Cyber Monday morning conversion for any Capital One–held cardholder who had attempted to buy on Sunday night.

Detection came from the Brain's precursor (a legacy dashboard + Slack alerts) at 00:47 PT on Monday morning when auth rate dropped 14% and concentrated in Capital One BIN ranges. Priya Patel (Fiserv TAM) was paged. Sarah Chen disabled the retry flag in production by 05:12 PT. Residual impact continued through Monday as the 24-hour issuer cooldown timers cleared.

### Root cause

- **Primary:** Stale middleware flag from pre-EMV 3DS 2.x era
- **Contributing:** No standing test for "what happens when 3DS 2.x friction-declines" in cert scripts
- **Contributing:** No issuer-BIN concentration alert in the dashboard (would have triggered at 01:15 PT if it existed)

### Resolution

1. Flip `fallback_v1_on_v2_friction=false` in production middleware config (2024-11-30 05:12 PT)
2. Audit all middleware config flags for 3DS-era legacy (completed 2024-12-05)
3. Add issuer-BIN concentration alerts to dashboard (completed 2025-01-10)
4. Post-mortem with Sarah + Priya (2024-12-03)
5. Feedback memory entry created: `feedback.md#bfcm-3ds-retry`

### Cited feedback memory

- `feedback.md#bfcm-3ds-retry` — the rule that came out of this incident

### Lessons for the Brain

IncidentAgent should watch for: (1) auth rate drop >5% concentrated in a specific issuer-BIN range, (2) 3DS 2.x frictionless decline clusters, (3) any config change to 3DS flow flags without a corresponding cert script run. Cross-reference `corpus/03-industry-standards/emv-emvco.md` for the 3DS 2.x state machine.

---

## klarna-dupe-2025-09 — "Klarna duplicate-order webhook (Sept 2025)"

**Severity:** P2 (medium)
**Date:** 2025-09-15 to 2025-09-18 (identified over 3 days, rolling fix)
**Impact:** 6 duplicate orders, ~$4,000 in reconciliation work
**Status:** Resolved 2025-10-02

### Narrative

Six duplicate orders appeared in Shopify + NetSuite for Klarna-paid transactions that had originally completed 31–33 days earlier. Investigation showed Klarna had re-sent "order complete" webhooks outside the standard 30-day window (tied to late delivery scenarios — customer had received the product but contested delivery date, which reset Klarna's internal timer).

Our checkout service's idempotency key cache expired at 30 days, so the second webhook looked like a new order. Duplicate orders were created in Shopify, duplicate line items flowed to NetSuite, and duplicate settlements were processed before the discrepancy was caught by the weekly reconciliation.

Detection came from Marcus Webb's CFO team during weekly reconciliation on 2025-09-22. Marcus flagged to Sarah on 2025-09-23.

### Root cause

- **Primary:** Idempotency key TTL in checkout service set to 30 days, but Klarna's retry window can exceed 30 days
- **Contributing:** No monitoring for "txn arriving outside expected idempotency window"

### Resolution

1. Extended idempotency key TTL from 30 days → **35 days** across checkout service (2025-09-25)
2. Added "stale-idempotency-retry" alert to webhook service (2025-09-30)
3. Manual reversal of 6 duplicate orders (completed 2025-10-02)
4. Customer notifications sent (completed 2025-10-02)
5. Feedback memory entry created: `feedback.md#klarna-webhook-timeout`

### Cited feedback memory

- `feedback.md#klarna-webhook-timeout`

### Lessons for the Brain

IntegrationAgent should proactively surface this feedback memory when the Afterpay integration (project memory `proj-bnpl-rollout`) reaches the idempotency-configuration step. This is *exactly* the kind of cross-provider lesson that compounds.

---

## presidents-day-2026-price-desync — "Shopify/Carat price cache desync"

**Severity:** P1 (high)
**Date:** 2026-02-17 09:00 PT → 2026-02-17 13:00 PT (4-hour window)
**Impact:** 23 chargebacks under Visa 13.5 (Misrepresentation), ~$9,800 in refunds
**Status:** Resolved 2026-02-17; post-mortem 2026-02-24

### Narrative

For Presidents' Day promo, Indigo Road dropped site-wide 20% at 09:00 PT. Shopify Plus applied the markdown correctly on the storefront. However, Carat's price-token cache held the stale (pre-markdown) prices for up to 4 hours, meaning checkouts that started before 09:00 PT but completed after 09:00 PT charged at the **full price**, not the promo price.

Customers who had added to cart at 08:55 PT and checked out at 09:02 PT saw "20% off" in the shopping cart but got charged full price at the final transaction. Customer complaints flowed via email and social (monitored by Lauren Okoye's retail team) within 90 minutes of the promo start. The 23 affected customers filed chargebacks under Visa 13.5 (Misrepresentation) — card brand says price shown at checkout != price charged.

Adam Reyes identified the cache-flush issue in Carat documentation by ~11:30 PT; Sarah executed the flush at ~13:00 PT. Subsequent affected carts re-priced correctly.

### Root cause

- **Primary:** Carat price-token cache TTL of up to 4 hours for Shopify-sourced price changes
- **Contributing:** Indigo Road's promo launch runbook didn't include an explicit "flush Carat cache" step

### Resolution

1. Manual Carat cache flush (2026-02-17 13:00 PT)
2. 23 affected customers refunded and issued a 30% discount code (2026-02-18)
3. 23 disputes actively contested with explanation + refund confirmation (most won)
4. Added `flush-carat-cache-before-promo` to the promo launch runbook (2026-02-22)
5. Feedback memory entry created: `feedback.md#shopify-carat-desync`

### Cited feedback memory

- `feedback.md#shopify-carat-desync`

### Lessons for the Brain

IncidentAgent should watch for: chargeback spikes under Visa 13.5 within 24 hours of any known promo launch. AnalyticsAgent should cross-reference the merchant's promo calendar (not yet in memory — research gap) with chargeback flows.

**Research gap for the corpus:** The specific Carat cache behavior is not documented in `corpus/01-apis/commercehub.md` or `corpus/01-apis/ucom-ipg.md`. Flag for corpus refresh — the Carat cache-flush endpoint may be public somewhere on developer.fiserv.com.
