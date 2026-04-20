---
merchant_id: indigo-road-apparel
title: "Indigo Road Apparel — Mid-market fashion brand (Slice A synthetic persona)"
source_type: "synthetic-demo-persona"
inspired_by: "Public mid-market DTC + omnichannel fashion brand patterns — NOT a real Fiserv customer"
created: "2026-04-14"
---

# Indigo Road Apparel

> **SYNTHETIC — DEMO ONLY.** Not a real merchant. Inspired by public DTC + omnichannel fashion brand patterns. All names, MIDs, and transaction data are fabricated for the Fiserv Brain demo prototype. Do not confuse with any real company.

## At a glance

| | |
|---|---|
| Industry | Fashion & apparel — elevated basics + limited drops |
| Founded | 2014 |
| HQ | Portland, OR |
| Size tier | **Mid-Market** ($10M–$500M GPV) |
| GPV 2025 | ~$180M |
| Stores | 32 brick-and-mortar across 18 US states |
| E-com | Shopify Plus (flagship DTC site + 2 outlet sites) |
| Channel mix | ~58% retail card-present / ~38% e-com / ~4% B2B wholesale (to boutiques) |
| Employees | ~420 (retail + corporate) |

## Business model

**Omnichannel + D2C + light B2B wholesale.** Retail stores are the emotional anchor; e-com is the scale. BOPIS and ship-from-store both active. Wholesale is small but growing — 40 independent boutiques currently carry the line, paid NET-30 ACH via SnapPay integration with their NetSuite ERP (*per `corpus/01-apis/snappay.md`*).

## Seasonality

- **Q4 is everything** — BFCM + holiday drives ~40% of annual revenue
- Spring drop (March) and fall drop (September) are secondary peaks
- Summer is soft; August is the lowest month

## Tech stack

| Layer | Tool |
|---|---|
| POS (in-store) | Direct **CommerceHub** integration via proprietary iPad POS app (Fiserv-branded, HMAC SHA256 auth — *per corpus/01-apis/commercehub.md*) |
| E-com | **Shopify Plus** → **Fiserv Carat** → CommerceHub for payment processing |
| B2B wholesale | **Fiserv SnapPay** integrated with NetSuite ERP for AR collection |
| OMS | Custom on top of Shopify + NetSuite |
| Inventory | NetSuite |
| Fraud | Signifyd (frontend) + CommerceHub fraud rules (backend) |
| Back-end | **Nashville** (default for all card-present and e-com flows); STAR/NYCE for PIN debit |

## Fiserv relationship

- **Channel:** Direct (contracted directly with Fiserv) + ISV (Shopify via Carat for e-com)
- **Contract tier:** CommerceHub Enterprise
- **TAM:** Priya Patel (Fiserv, assigned since 2023)
- **Autonomy envelope:** Medium — Sarah Chen (CTO) can approve fraud rule changes within a ±20% envelope; anything larger goes to Marcus Webb (CFO) for sign-off

## Key people (synthetic)

| Role | Name | Notes |
|---|---|---|
| CTO / dev lead | **Sarah Chen** | Primary DRI for integration work. Pragmatic, moves fast. |
| CFO | **Marcus Webb** | Owns dispute strategy, settlement reconciliation, fraud envelope sign-off |
| Head of Retail | Lauren Okoye | Owns in-store experience, loyalty |
| Head of E-com | Adam Reyes | Owns Shopify + conversion funnel |
| Fiserv TAM | **Priya Patel** | Weekly 1:1 with Sarah, quarterly with Marcus |

## Why this persona for the demo

Indigo Road is the **Slice A "value pilot" persona** from `../04-prd/mvp-scope.md`. She stresses multiple Brain agents simultaneously:

- **IntegrationAgent** — the Afterpay/Klarna BNPL project is in-flight and genuinely complicated (3DS v2 + multi-provider routing)
- **AnalyticsAgent** — omnichannel + wholesale split makes analytics narratives non-trivial
- **DisputeAgent** — mid-market fashion has a real dispute volume and real template-driven wins
- **IncidentAgent** — the 2024 BFCM 3DS retry loop (feedback memory) is a perfect seed for anomaly detection
- **APMAgent** (conceptually — folded into DocsAgent + IntegrationAgent in the demo) — BNPL APM rollout is explicitly a use case

## Relationship to the corpus

This persona pulls context from:
- `corpus/01-apis/commercehub.md` — HMAC SHA256 auth + GitHub examples
- `corpus/01-apis/snappay.md` — B2B AR wholesale flow
- `corpus/03-industry-standards/emv-emvco.md` — 3DS 2.x context for BNPL
- `corpus/04-merchant-context/strategic-merchants.md` — benchmark cohort
- `corpus/04-merchant-context/failure-patterns.md` — dispute templates + Visa reason codes
