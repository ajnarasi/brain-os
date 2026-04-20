---
type: user
merchant: indigo-road-apparel
last_reviewed: 2026-04-14
---

# User memory — Indigo Road Apparel

## Entity
- Legal: Indigo Road Apparel, Inc. (Delaware C-corp)
- DBA: Indigo Road
- Primary MID: `8400-IR-001` (CommerceHub e-com)
- Retail MIDs: `8400-IR-R01` through `8400-IR-R32` (one per store)
- Wholesale MID: `8400-IR-WS1` (SnapPay / NetSuite AR)
- MCC primary: **5651** — Family Clothing Stores
- MCC secondary: **5691** — Men's and Women's Clothing Stores; **5999** (wholesale)
- Countries: US only (single-currency USD)
- Tax ID: synthetic `XX-XXXXXXX`

## Product stack
- **CommerceHub Enterprise** (e-com + card-present)
- **Fiserv Carat** (API bridge from Shopify Plus to CommerceHub)
- **Fiserv SnapPay** (B2B wholesale AR, SAP NetSuite integration)
- **Shopify Plus** (flagship + 2 outlet sites)
- **Signifyd** (e-com fraud, front-line)
- **Talon.One** (promo engine — not payments, but relevant to loyalty context)
- **NetSuite ERP** (inventory, wholesale AR, finance)

## Roles (DRIs)

| Role | Name | Primary responsibilities | Session scope |
|---|---|---|---|
| CTO / dev lead | Sarah Chen | Integration, API work, 3DS + BNPL rollout, cert prep | Full technical depth |
| CFO | Marcus Webb | Dispute strategy, settlement rec, fraud envelope sign-off, contract terms | Finance + risk only |
| Head of Retail | Lauren Okoye | Store ops, POS hardware, loyalty UX | Retail-specific |
| Head of E-com | Adam Reyes | Conversion funnel, Shopify optimization, checkout UX | E-com-specific |
| Fiserv TAM | Priya Patel | Fiserv-side escalation + quarterly reviews | External — Fiserv |

When a Brain session identifies the merchant user as one of the above, scope the retrieval and tone accordingly. Sarah gets technical detail; Marcus gets finance-first framing; Lauren gets retail vocabulary.

## Preferences

- **Alerting cadence:** Incident alerts immediately (any severity); weekly narrative delivered Monday 7am PT; monthly review first business day of month
- **Tone:** Direct, pragmatic, moderately technical; minimal hand-holding
- **Risk tolerance:** Medium — willing to tolerate some false positives in fraud rules to catch actual fraud, but not at the cost of conversion
- **Settlement preference:** Daily settlement into primary operating account; separate settlement account for wholesale
- **Reporting format:** Narrative over dashboard; drill-down on click
- **Do-not-contact windows:** No automated alerts between 6pm–7am PT unless P0/P1

## Contract

- **Tier:** CommerceHub Enterprise
- **Term:** 3 years, started 2023-07-01
- **Renewal:** 2026-07-01 (approaching — flag for Marcus in Q2 narrative)
- **Fraud envelope:** Sarah can adjust rules within ±20%; Marcus approves anything larger

## Platform notes

See `partner.md` for full channel + platform relationship. Short version: Direct CommerceHub + ISV Shopify (via Carat), back-end is Nashville primary + STAR/NYCE for PIN debit. No Buypass, no TeleCheck (no grocery/c-store exposure), no ValueLink (gift cards handled in Shopify, not through Fiserv gift rails).
