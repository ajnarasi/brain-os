---
merchant_id: casa-rosa-taqueria
title: "Casa Rosa Taqueria — Clover-native SMB restaurant (Slice B synthetic persona)"
source_type: "synthetic-demo-persona"
inspired_by: "Public Clover SMB restaurant patterns — NOT a real Fiserv customer"
created: "2026-04-14"
---

# Casa Rosa Taqueria

> **SYNTHETIC — DEMO ONLY.** Not a real merchant. Inspired by public Clover SMB restaurant patterns. All names, locations, MIDs, and transaction data are fabricated for the Fiserv Brain demo prototype.

## At a glance

| | |
|---|---|
| Industry | Restaurant — fast-casual Mexican, family-run |
| Founded | 2018 |
| HQ | Austin, TX |
| Size tier | **SMB** ($1M–$10M GPV) |
| GPV 2025 | ~$4.2M |
| Locations | 3 (East Austin, South Congress, North Loop) |
| E-com | Online ordering via Clover; delivery via DoorDash, Uber Eats, Grubhub |
| Channel mix | ~72% in-store card-present / ~28% delivery/aggregator |
| Employees | ~34 across all 3 locations (mix of FT + PT) |

## Business model

**B2C card-present + delivery aggregators.** Classic SMB restaurant shape. Owner-operated, lean ops team (one PT ops person), heavy reliance on POS automation. No wholesale, no B2B, no subscription. Loyalty is informal (a paper stamp card) — one of the in-flight projects is to evaluate a Clover Rewards digital loyalty program.

## Seasonality

- **SXSW week** (early March) is peak — ~3x normal weekly volume
- **UT football weekends** (August–November) drive Saturday spikes
- Summer is steady; post-holidays (January) is the slowest month

## Tech stack

| Layer | Tool |
|---|---|
| POS | **Clover Flex** (handheld, server-forward ordering) + **Clover Mini** (counter) at each of 3 locations |
| Kitchen display | Clover KDS |
| Online ordering | Clover Online Ordering (built-in) |
| Delivery aggregators | DoorDash, Uber Eats, Grubhub — each integrated via Clover App Market |
| Loyalty | Paper stamp card (not digital — project in flight) |
| Inventory | Clover Inventory (basic) |
| Payroll | Gusto (outside Clover) |
| Back-end | **Clover → Nashville** (default); **STAR/NYCE** for PIN debit |

## Fiserv relationship

- **Channel:** ISV (Clover App Market, since Clover is Fiserv-owned this is technically direct-via-Clover)
- **Contract tier:** Clover Pro + Restaurant app bundle
- **TAM:** None (SMB tier — served through Clover support)
- **Autonomy envelope:** **High** — Maria wants the Brain to act, not explain. Do-it-for-me by default.

## Key people (synthetic)

| Role | Name | Notes |
|---|---|---|
| Owner | **Maria Delgado** | Primary user. Runs the business. Tech-adjacent but not a developer. Runs POS daily. |
| Part-time ops / son | **Luis Delgado** | Maria's son, age 24. Handles scheduling, loyalty, and delivery aggregator ops. More comfortable with tech than Maria. |
| Head cook (East Austin) | Javier Ruiz | — |
| General Manager (South Congress) | Elena Moreno | — |
| Clover support contact | Generic Clover support hotline |

## Why this persona for the demo

Casa Rosa is the **Slice B "distribution pilot" persona** from `../04-prd/mvp-scope.md`. She proves zero-CAC distribution through Clover App Market. Specifically stresses:

- **AnalyticsAgent** — the "daily close narrative" demo scenario. This is the emotionally resonant scene: Maria at 11pm after close, opens Clover, clicks "Brain," reads a 6-line plain-English summary of her day. If this doesn't land in the demo, nothing will.
- **DisputeAgent** — DoorDash chargebacks are a real pain for restaurants; the `dd-chargeback-streak-2025` incident is the seed.
- **IncidentAgent** — the terminal-offline incident pattern + tip reconciliation discrepancy.
- **DocsAgent** — Clover-specific questions like "how do I issue a refund" or "why did this card decline"

## Relationship to the corpus

This persona pulls context from:
- `corpus/01-apis/clover.md` — Clover's REST + Android SDK + OAuth 2.0 v2 with PKCE
- `corpus/04-merchant-context/clover-merchants.md` — Clover case studies + App Market context
- `corpus/04-merchant-context/failure-patterns.md` — Visa reason codes for disputes, Stack Overflow SDK patterns
- `corpus/03-industry-standards/pci-dss.md` — PCI scope at the POS (Level 4 merchant)

## Tone for the Brain when serving Casa Rosa

Owner-language. Short sentences. No jargon. Treat Maria like a smart owner who's busy closing up for the night. Agents should never say "authorization response code" — say "the card was declined" and optionally "I can explain why if you want."
