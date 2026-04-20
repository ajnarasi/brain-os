---
type: reference
merchant: indigo-road-apparel
last_reviewed: 2026-04-14
---

# Reference memory — Indigo Road Apparel

Pointers to external resources the Brain should consult.

## Fiserv product docs (corpus)
- **CommerceHub** — `corpus/01-apis/commercehub.md` (HMAC SHA256 auth, GitHub examples repo). Primary reference for all in-store POS and e-com backend questions.
- **SnapPay** — `corpus/01-apis/snappay.md` (B2B AR/AP, NetSuite connector context). Relevant for wholesale AR questions + the `proj-wholesale-netsuite-refactor` project.

## Industry standards (corpus)
- **ISO 8583** — `corpus/03-industry-standards/iso-8583.md`. Referenced when interpreting decline codes, DE fields, or raw txn messages.
- **EMV / EMVCo (3DS 2.x)** — `corpus/03-industry-standards/emv-emvco.md`. Referenced for the BNPL rollout project and 3DS retry rules (see `feedback.md#bfcm-3ds-retry`).
- **PCI DSS 4.0** — `corpus/03-industry-standards/pci-dss.md`. Referenced for any PCI scope discussion — Indigo Road is Level 2.

## External vendor docs (NOT in corpus — must be flagged as research gaps if needed)
- **Shopify Plus BNPL integration docs** — live at shopify.dev, not currently ingested. Flag for research refresh if BNPL questions stall.
- **Afterpay merchant integration guide** — live at developers.afterpay.com, not currently ingested. Flag for research refresh.
- **Klarna merchant integration guide** — live at docs.klarna.com, not currently ingested.
- **Signifyd decision engine docs** — merchant-private; not in corpus.

## Internal runbooks (merchant-owned — don't exist in demo)
- `runbook-carat-price-cache-flush.md` — Adam Reyes owns. Used for promo flushes per `feedback.md#shopify-carat-desync`.
- `runbook-bfcm-fraud-tuning.md` — Marcus owns. Annual tuning doc.
- `runbook-netsuite-ar-reconciliation.md` — Marcus's CFO team owns. Monthly process.

## Fiserv-side contacts
- **Priya Patel** — TAM, weekly with Sarah, quarterly with Marcus
- **Fiserv solutions engineering** — for cert prep (engage via Priya)
- **Fiserv legal** — for BNPL provider contract review (engage via Priya + Marcus)

## Benchmarking cohort (for AnalyticsAgent)
- Cluster: **Mid-market fashion/apparel, 20–50 stores, omnichannel + D2C, some B2B wholesale**
- Public benchmark source: `corpus/04-merchant-context/industry-risk.md` + `corpus/04-merchant-context/strategic-merchants.md`
- Always label comparisons as "merchants like you" — never name specific real merchants

## Freshness notes
- Corpus files above: collected 2026-04-14, `reliability: high` for Fiserv docs and standards
- External vendor docs (Shopify/Afterpay/Klarna/Signifyd): **not ingested yet** — request corpus refresh if BNPL integration questions pile up
- Internal runbooks: synthetic placeholder for the demo only; no real file exists
