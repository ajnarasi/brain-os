---
type: feedback
merchant: indigo-road-apparel
last_reviewed: 2026-04-14
---

# Feedback memory — Indigo Road Apparel

Rules learned from prior interactions. Each entry is a "we tried X, it failed because Y, fix is Z" lesson that should never need re-learning.

---

## bfcm-3ds-retry — "Never retry a 3DS v1 attempt after a v2 frictionless fail"

**Rule:** In our Shopify middleware, if 3DS v2 frictionless declines for an issuer, do **not** fall back to 3DS v1 on the same transaction. The issuer will block all subsequent auths on that card for ~24 hours.

**Why:** During BFCM 2024 (2024-11-29), ~$180K in declined volume over 6 hours. Root cause: our middleware had a `fallback_v1_on_v2_friction=true` flag left over from the 3DS 1.0 era. When ~12K frictionless attempts soft-declined at 11pm PT, the middleware immediately retried at v1. Issuers (especially Capital One BINs 414720–414729) blanket-blocked the second attempt and the resulting 24-hour cooldown torched Cyber Monday morning conversion. See `incidents.md#bfcm-2024-3ds-retry`.

**How to apply:** Any time a 3DS 2.x transaction goes through frictionless flow and declines, do **not** auto-retry. Either challenge-flow it or decline cleanly. Specifically, keep `fallback_v1_on_v2_friction=false` in the Shopify middleware config. See EMV 3DS 2.x flow diagram in `corpus/03-industry-standards/emv-emvco.md`.

**Source:** Post-mortem with Sarah Chen + Priya Patel (Fiserv TAM), 2024-12-03.
**Scope:** Merchant-specific (config lives in our middleware).
**Confidence:** High — reproduced in sandbox during post-mortem.
**Last verified:** 2026-02-10 (middleware config audit).

---

## klarna-webhook-timeout — "Klarna webhook retries need an idempotency key longer than 30 days"

**Rule:** When integrating Klarna BNPL callbacks, the `idempotency-key` TTL in our checkout service must be at least 35 days, not 30. Klarna sometimes retries webhooks beyond the standard 30-day window, particularly on return scenarios tied to late delivery.

**Why:** In September 2025, we saw 6 duplicate order creations when Klarna re-sent "order complete" webhooks 31–33 days after the original transaction. Our idempotency cache expired at 30 days, so the second webhook looked like a new order. Created ~$4K in reconciliation work.

**How to apply:** Idempotency key TTL = **35 days minimum** for any BNPL provider. Flag this specifically for the Afterpay integration currently in project memory.

**Source:** Duplicate order investigation, Sarah Chen, 2025-10-02.
**Scope:** Merchant-specific, but almost certainly generalizable to other BNPL integrations.
**Confidence:** Medium-high.
**Last verified:** 2026-03-20.

---

## shopify-carat-desync — "Shopify Plus price changes do not propagate to Carat cached price tokens"

**Rule:** When we change a product price on Shopify Plus, the Carat-side price-token cache holds the stale price for up to 4 hours. During promotional markdowns, checkout can complete at the old (higher) price, which triggers customer refund disputes.

**Why:** February 2026 Presidents' Day promo. We dropped site-wide 20% at 9am; customers who started checkout before 9am but completed after 9am charged at full price. Generated 23 chargebacks under Visa 13.5 (misrepresentation).

**How to apply:** For any site-wide promo, flush the Carat price-token cache explicitly before the promo window starts. Adam Reyes owns this runbook; Sarah Chen has the cache-flush endpoint documented in our internal runbook.

**Source:** Presidents' Day post-mortem, Adam + Sarah, 2026-02-24.
**Scope:** Merchant-specific.
**Confidence:** High.
**Last verified:** 2026-03-05.

---

## dispute-template-not-received — "High-win template for 'item not received' on shipped orders"

**Rule:** For Visa 13.1 "Merchandise/Services Not Received" chargebacks on shipped orders, our highest-win template attaches: (a) signed delivery confirmation, (b) tracking carrier + date, (c) billing address match, (d) customer's prior positive order history if available.

**Why:** Template win rate on Visa 13.1: **84%** over 46 disputes from Q2 2024 through Q1 2026 (per Marcus Webb's dispute tracker). The signed-delivery-confirmation is the single strongest evidence piece — loses rise to 34% without it.

**How to apply:** Default template for Visa 13.1 on shipped orders. If delivery confirmation isn't available (customer claims signed for by someone else), win rate drops to ~40% — flag as risky in the DisputeAgent draft.

**Source:** Marcus Webb's dispute tracker, Q2 2024 → Q1 2026.
**Scope:** Merchant-specific but probably cluster-generalizable.
**Confidence:** High (46 samples).
**Last verified:** 2026-04-01.

---

## bfcm-traffic-2x-baseline — "BFCM peak is ~2.2x regular Monday traffic, not 3x"

**Rule:** When forecasting Black Friday capacity, assume peak hour is 2.2x regular-Monday-afternoon peak, not 3x. We historically over-provisioned fraud-rule strictness assuming 3x and lost ~1.8% in false-positive declines.

**Why:** BFCM 2023 and 2024 peak-hour traffic analysis: 2.1x and 2.3x respective peaks. Fraud rules tuned for 3x were too tight.

**How to apply:** For BFCM 2026 planning, set fraud thresholds assuming 2.2x peak. Marcus to sign off before deployment.

**Source:** Post-BFCM analysis, 2024-12-10 and 2025-12-08.
**Scope:** Merchant-specific.
**Confidence:** Medium — only 2 data points but consistent.
**Last verified:** 2026-03-15.
