---
merchant: indigo-road-apparel
file_type: synthetic_transactions
count: 10
window: "2026-04-07 to 2026-04-14"
source_type: "synthetic-demo-data"
---

# Synthetic transactions — Indigo Road Apparel

10 representative transactions from the last 7 days. Fabricated for the demo. Structured so DocsAgent / AnalyticsAgent / IncidentAgent / DisputeAgent can retrieve individual transactions by `txn_id` for the 5 demo scenarios.

All amounts in USD. All MIDs and cardholder details are fake.

---

## txn_4721 — Shipped order with signature confirmation, now disputed

- **Date:** 2026-04-09 14:32 PT
- **Channel:** E-com (Shopify Plus → Carat → CommerceHub)
- **MID:** 8400-IR-001
- **Amount:** $287.42 (1 item, shipping included)
- **Auth result:** Approved, ISO 8583 DE39 = `00`
- **3DS:** 2.x frictionless
- **Card:** Visa credit, BIN 4147XX, issuer: Chase
- **Shipped:** 2026-04-10 09:14 PT via FedEx, tracking `FX7YJ829KQ`
- **Delivery confirmation:** 2026-04-12 11:47 PT, **signed** by "R. WALKER" at billing address on file
- **Customer history:** 4 prior orders, 0 returns, 0 disputes
- **Status as of 2026-04-14:** ⚠️ **DISPUTED** — received chargeback under **Visa 13.1** (Merchandise/Services Not Received) on 2026-04-14 09:00 PT
- **Dispute notes:** Cardholder claims package never arrived. Signature confirmation + billing-address match + customer's positive prior history make this a high-win dispute per `feedback.md#dispute-template-not-received` (84% historical win rate on this template).
- **Recommended agent:** DisputeAgent → draft response using template `visa-13-1-shipped-signed`

## txn_4722 — BNPL (Afterpay) test transaction in sandbox

- **Date:** 2026-04-11 10:15 PT
- **Channel:** Sandbox (Afterpay integration test)
- **MID:** 8400-IR-SANDBOX
- **Amount:** $150.00
- **Auth result:** Declined — Afterpay return code `AFTERPAY_INVALID_SIGNATURE`
- **Notes:** Sarah's integration test. Likely HMAC signature mis-formatted per CommerceHub auth pattern. See `corpus/01-apis/commercehub.md` for the exact `apiKey + clientRequestId + timestamp + rawPayload` signing order.
- **Recommended agent:** IntegrationAgent → diagnose signature; check project memory `proj-bnpl-rollout`

## txn_4723 — Regular e-com conversion

- **Date:** 2026-04-08 19:47 PT
- **Channel:** E-com
- **MID:** 8400-IR-001
- **Amount:** $142.00
- **Auth:** Approved, DE39 `00`, 3DS 2.x frictionless
- **Card:** Mastercard debit
- **Customer:** First-time buyer
- **Status:** Settled, no issues

## txn_4724 — In-store sale with PIN debit (STAR routing)

- **Date:** 2026-04-13 13:02 PT
- **Channel:** Retail POS (Portland flagship store)
- **MID:** 8400-IR-R01
- **Amount:** $89.99
- **Auth:** Approved via STAR network (PIN debit)
- **Card:** Visa debit with PIN
- **Notes:** Good example of PIN debit routing — AnalyticsAgent can use this for the "PIN vs signature debit" optimization narrative

## txn_4725 — Declined fraud rule hit (false positive?)

- **Date:** 2026-04-12 20:58 PT
- **Channel:** E-com
- **MID:** 8400-IR-001
- **Amount:** $450.00 (2 items)
- **Auth:** **Declined** — Signifyd fraud rule: `velocity_same_card_5min`
- **Card:** Visa credit, returning customer (6 prior orders, 0 disputes)
- **Notes:** Fraud rule blocked what looks like a legitimate cart abandonment → retry. Customer completed purchase on Indigo Road's competitor's site 8 minutes later (per marketing attribution data). **Potential false positive** — flag for IncidentAgent review.
- **Recommended agent:** IncidentAgent → check if velocity rule is too tight; reference `feedback.md#bfcm-traffic-2x-baseline` for context on fraud rule tuning

## txn_4726 — Wholesale ACH via SnapPay

- **Date:** 2026-04-10 11:00 PT
- **Channel:** SnapPay / NetSuite AR
- **MID:** 8400-IR-WS1
- **Amount:** $14,280.00 (invoice INV-20260410-042)
- **Settlement method:** ACH, NET-30 terms
- **Counterparty:** Midland Provisions Boutique (wholesale customer)
- **Status:** Pending — due 2026-05-10
- **Notes:** Example of the wholesale side. See `corpus/01-apis/snappay.md` for SnapPay's NetSuite integration context.

## txn_4727 — BOPIS order (omnichannel)

- **Date:** 2026-04-09 16:22 PT
- **Channel:** E-com order, in-store pickup at Seattle store (MID 8400-IR-R15)
- **Amount:** $76.50
- **Auth:** Approved online, DE39 `00`
- **Pickup:** Completed 2026-04-11 at Seattle store; cardholder presented ID
- **Notes:** Demonstrates the omnichannel reconciliation case — payment on one MID (8400-IR-001), fulfillment at another (8400-IR-R15). AnalyticsAgent should know this is a healthy pattern.

## txn_4728 — 3DS challenge flow, completed

- **Date:** 2026-04-11 21:14 PT
- **Channel:** E-com
- **MID:** 8400-IR-001
- **Amount:** $315.00
- **Auth:** Approved after 3DS 2.x challenge (not frictionless)
- **Card:** Visa credit, Capital One BIN 414720
- **Notes:** Good example of the challenge flow working correctly. Contrast with the `bfcm-3ds-retry` feedback memory where Capital One BINs were central to the incident.

## txn_4729 — Return / refund

- **Date:** 2026-04-12 10:00 PT (original purchase 2026-03-15)
- **Channel:** E-com return processed
- **MID:** 8400-IR-001
- **Amount:** -$187.00 (full refund)
- **Notes:** Customer return, processed within the 45-day return window. No dispute. Healthy return.

## txn_4730 — Failed 3DS frictionless, correctly fell through to decline (not retry)

- **Date:** 2026-04-13 08:45 PT
- **Channel:** E-com
- **MID:** 8400-IR-001
- **Amount:** $210.00
- **Auth:** **Declined** — 3DS 2.x frictionless soft-decline, **no retry** (per middleware config from `feedback.md#bfcm-3ds-retry`)
- **Card:** Discover credit
- **Notes:** This is what the correct behavior looks like post-BFCM 2024 lesson. The middleware did NOT attempt a v1 retry. Customer re-attempted manually 40 minutes later and completed via challenge flow. This is a healthy failure mode.

---

## Summary stats (synthetic, for AnalyticsAgent)

- **Approval rate:** 7 / 10 = 70% (not representative — skewed by the declined + disputed examples for demo value)
- **Net revenue:** ~$15,390 across 10 txns
- **Disputes opened:** 1 (txn_4721, Visa 13.1)
- **Fraud declines:** 1 (txn_4725, potential false positive)
- **Legitimate declines:** 1 (txn_4730, 3DS correctly declined)
- **BNPL sandbox:** 1 failure (txn_4722, integration work in progress)

Normal weekly approval rate is ~94.2%. This sample is intentionally unrepresentative to support the 5 demo scenarios.
