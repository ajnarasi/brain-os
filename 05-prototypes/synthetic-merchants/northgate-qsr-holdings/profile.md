---
merchant_id: northgate-qsr-holdings
title: "NorthGate QSR Holdings — Strategic-enterprise franchisee group (Slice D synthetic persona)"
source_type: "synthetic-demo-persona"
inspired_by: "Public Inspire-Brands-style franchisee groups and Fiserv Carat/IPG strategic QSR patterns — NOT a real Fiserv customer"
created: "2026-04-14"
---

# NorthGate QSR Holdings

> **SYNTHETIC — DEMO ONLY.** Not a real merchant. Inspired by public Inspire Brands franchisee group patterns and the Fiserv Carat / IPG Sep 2023 announcement. All names, locations, financials, and transaction data are fabricated for the Fiserv Brain demo prototype.

## At a glance

| | |
|---|---|
| Entity type | Franchisee group (operates brands under multiple parent franchisors) |
| Founded | 2008 |
| HQ | Nashville, TN *(coincidentally matches the Fiserv back-end platform name — NorthGate is a Nashville-based company)* |
| Size tier | **Strategic Global precursor** (operates as Enterprise by GPV; on track for Strategic classification) |
| GPV 2025 | ~$340M across portfolio |
| Brands operated | **47 Arby's** + **12 Buffalo Wild Wings** + **8 Jimmy John's** (all parent: Inspire Brands) |
| Geographic concentration | US Southeast — TN, GA, AL, MS, KY, FL |
| Channel mix | ~88% in-store card-present / ~12% mobile app + delivery aggregator |
| Employees | ~2,100 across all locations |

## Business model

**B2C card-present at scale**, with growing omnichannel via parent-brand mobile apps (Arby's app, BWW Blazin' Rewards app, Jimmy John's app) and delivery aggregators (DoorDash + Uber Eats at most locations). Some Arby's locations are **fuel-attached** (travel-plaza format — 4 of 47 Arby's are combined with fuel islands under a separate c-store operator with revenue-share). Those 4 locations touch Buypass for the fuel side while the QSR side runs on IPG/Nashville.

## Scale context

- **~$340M GPV across 67 locations**
- Single-day peak (Super Bowl Sunday for BWW): individual BWW location can hit $75K GPV
- SXSW + March Madness: BWW overall spikes 3.5x
- National days (National Wing Day, Free Sandwich Day): BWW / Arby's / Jimmy John's all spike
- Regular Tuesday weeknight: ~$650K across all 67 locations

## Tech stack

| Layer | Tool |
|---|---|
| Front-end platform | **IPG (Ucom / Connected Commerce)** — the Fiserv strategic-enterprise platform per `corpus/01-apis/ucom-ipg.md` |
| POS (brand-standard) | NCR Aloha at BWW; Arby's has a proprietary franchise-mandated POS; Jimmy John's has Oracle Simphony |
| Kitchen display | Per brand standard |
| Loyalty | **ValueLink** via Inspire Brands loyalty program (Arby's Rewards, BWW Blazin' Rewards, JJ Freaky Fast Rewards) |
| Mobile ordering | Parent-brand mobile apps (NorthGate doesn't own these; they run on top) |
| Aggregators | DoorDash + Uber Eats integrated at ~54 locations |
| Inventory / ERP | Oracle ERP Cloud integrated to **Fiserv SnapPay** for B2B supplier AR/AP |
| Back-end | **Nashville (North)** primary for all non-fuel authorization; **Buypass** for the 4 fuel-attached Arby's; **STAR/NYCE/Accel** for PIN debit; **ValueLink** for gift card authorization and Inspire loyalty; **TeleCheck** used at higher-ticket BWW locations for check acceptance (rare but present) |

## Fiserv relationship

- **Channel:** Direct (Fiserv corporate sales directly contracts with NorthGate)
- **Secondary consideration:** NorthGate operates under three different parent-brand franchise agreements, each of which has their own Fiserv-related stipulations (notably, Inspire Brands' 2023 expanded Carat relationship per `corpus/04-merchant-context/strategic-merchants.md`)
- **Contract tier:** Strategic / Enterprise custom (not a standard SKU)
- **Fiserv Corp TAM:** Chris Nguyen (assigned 2022)
- **Fiserv Solutions Engineering:** Rotating, engaged through Chris
- **Autonomy envelope:** **LOW — corporate change-control is absolute.** Nothing ships to production without Dana Okafor's approval + IT governance review. The Brain is strictly narrative + leverage, not actor.

## Key people (synthetic)

| Role | Name | Responsibilities | Session scope |
|---|---|---|---|
| Corporate Payments PM | **Dana Okafor** | Primary Brain user. Owns payments strategy across all 67 locations, cross-brand reporting, incident review, Fiserv commercial | Full enterprise scope; narrative + leverage |
| Corporate IT director | **Tony Ruiz** | Owns infrastructure, POS connectivity, change-control review, security | Technical + compliance |
| CFO | **Rachel Stern** | Owns settlement, AR, budget — signs off on contract and commercial changes | Finance + commercial only |
| Ops VP (multi-brand) | **Marcus Thurmond** | Owns location-level operations across all 67 | Ops + incident response |
| Regional ops (Arby's) | Janice Park | Arby's-specific ops | Region-specific |
| Regional ops (BWW) | Derek Lee | BWW-specific ops (including Super Bowl planning) | Region-specific |
| Fiserv Corp TAM | **Chris Nguyen** | Primary Fiserv contact — monthly with Dana, quarterly with Rachel | External |

## Why this persona for the demo

NorthGate is the **Slice D "V2 prize pilot"** persona from `../04-prd/mvp-scope.md`. This is the **largest single potential revenue line** in Fiserv's book if the Brain can prove value at enterprise scale. Specifically stresses:

- **IncidentAgent** — cross-location anomaly detection + multi-back-end reconciliation. The "auth rate dip in the southeast Arby's traced to Buypass pump firmware" is exactly the Slice D demo scenario.
- **AnalyticsAgent** — cross-brand, cross-location narratives rolled up from individual locations to region to corporate. Dana's weekly exec review is the killer use case.
- **DocsAgent** — enterprise-scale compliance questions (PCI scope across 67 locations, contract terms across 3 brands)
- **IntegrationAgent** — the mobile-ordering rollout project is a live integration in flight

## Relationship to the corpus

This persona pulls context from:
- `corpus/01-apis/ucom-ipg.md` — **primary** reference for the IPG platform. The hashExtended signature, Inspire Brands Carat relationship, multi-back-end nature of strategic QSR.
- `corpus/01-apis/snappay.md` — wholesale AR context (supplier payments)
- `corpus/02-fiserv-general/blogs-press-releases.md` — the Inspire Brands + Fiserv Carat 2023 announcement, Fiserv's agentic commerce pacts with Visa/MC (relevant to NorthGate's mobile-order rollout thinking)
- `corpus/03-industry-standards/iso-8583.md` — decline codes and DEs for cross-location anomaly diagnosis
- `corpus/03-industry-standards/pci-dss.md` — enterprise-scope PCI (NorthGate is Level 1 — >6M txns/year)
- `corpus/04-merchant-context/strategic-merchants.md` — context on Inspire Brands corporate-level strategy (even though NorthGate is a franchisee, the parent-brand strategy affects them)
- `corpus/04-merchant-context/failure-patterns.md` — chargeback reason codes for dispute handling

## Tone for the Brain when serving NorthGate

**Analyst-language.** Dana is a corporate payments PM — she wants regional variance, BIN-range concentration, time-series deltas, and specific cross-location patterns. She's not Maria (owner-language) and she's not Sarah (dev-language) — she wants analyst-language with specific numbers and clear recommendations. Default to bullet-pointed findings with citations to specific locations and times.

**Never suggest autonomous action.** Every recommendation routes through corporate change-control. The Brain drafts; Dana reviews; Tony's IT team executes; everyone stays in the loop. The value is **leverage for Dana's lean central team**, not automation.
