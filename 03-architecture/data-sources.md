# Data Sources

Every Fiserv (and merchant-side) system the Brain must ingest. Organized by phase of the ingestion pipeline.

## Tier 1 — Must-have for MVP

### Front-end commerce platform events
| Source | Type | Content | Access |
|---|---|---|---|
| **Clover events** | Real-time | POS + app events; txn lifecycle; device telemetry | Internal |
| **CommerceHub events** | Real-time | E-com + omnichannel txn events, webhook events | Internal |
| **IPG (Ucom) events** | Near-real-time | Enterprise QSR / big-box txn events; V2 ingestion | Internal |
| **Carat API events** | Real-time | API-consumer events | Internal |

### Back-end authorization / clearing message buses
| Source | Type | Content | Access |
|---|---|---|---|
| **Nashville (North) ISO 8583 bus** | Real-time | Auth requests/responses, clearing, settlement refs — the primary telemetry source | Internal |
| **Omaha (South / "South Oceans") ISO 8583 bus** | Real-time / batch | Legacy back-end auth + clearing for Omaha-resident merchants | Internal |
| **Buypass event stream** | Real-time | Petroleum / c-store / fleet fuel auth, EMV pump, fleet card routing | Internal |
| **STAR / NYCE / Accel events** | Real-time | PIN debit authorization and routing | Internal |
| **TeleCheck events** | Near-real-time | Check authorization + verification + returned-check recovery | Internal |
| **ValueLink events** | Near-real-time | Gift card authorization + settlement (open + closed loop) | Internal |

### Cross-cutting
| Source | Type | Content | Access |
|---|---|---|---|
| **Dispute system** | Near-real-time | Chargeback, inquiry, representment events | Internal |
| **Settlement system** | Daily | Settlement batches, funding events, variance reports (cross-platform) | Internal |
| **Fiserv KB** | Batch (crawled weekly) | API docs, product guides, runbooks, spec sheets | Internal |
| **Merchant profile store** | Batch | Boarding info, contract tier, MCC, channel, platform stack, TAM assignment | Internal |
| **Partner config** | Batch | Which channel, which partner entity, data-access scope, branding config | Internal |
| **Platform config** | Batch | Which front-end platform(s) + back-end(s) a merchant runs on | Internal |

## Tier 2 — Phase 2+

| Source | Type | Content | Access |
|---|---|---|---|
| **ISO 8583 raw message bus** | Real-time | Raw DEs for deep decline-reason diagnosis | Internal |
| **Fraud tool (Accertify / Fiserv Fraud Detect)** | Real-time | Fraud scores, rule hits, false positives | Internal |
| **TAM CRM notes** | Batch | Unstructured TAM interaction history | Internal |
| **Support ticket history** | Batch + stream | Past tickets, resolutions, time-to-resolve | Internal |
| **Comparable-merchant aggregates** | Computed | Anonymized benchmarks by cluster × size × geo | Computed from above |

## Tier 3 — Year 2+

| Source | Type | Content | Access |
|---|---|---|---|
| **Merchant-side ERP** | API | SAP, NetSuite, etc. | Merchant consent + integration |
| **Merchant-side OMS** | API | Shopify, BigCommerce, custom | Merchant consent |
| **Merchant-side POS (non-Fiserv)** | API | Toast, Square | Merchant consent |
| **Network account updater feed** | Real-time | Card refresh data for subscription merchants | Network agreement |
| **Card brand data** | Batch | Interchange tables, MATCH list (where permitted), BIN ranges | Network agreement |

## Per-platform ISO 8583 dialect parsers

Each back-end has its own ISO 8583 variant. The ingestion layer runs **parallel parsers** and routes incoming messages to the correct one based on source:

| Parser | Source | Notes |
|---|---|---|
| Nashville parser | North platform bus | Fiserv extensions on top of standard ISO 8583; custom decline-code mapping |
| Omaha parser | South platform bus | Different DE semantics from Nashville; some batch-only flows |
| Buypass parser | Petroleum network | Fuel-specific DE extensions (pump number, grade, quantity, fleet card controls) |
| STAR/NYCE parser | PIN debit networks | PIN debit variant; different decline code set |
| TeleCheck parser | Check network | Different message format entirely (not card ISO 8583) |
| ValueLink parser | Gift card network | Gift-specific auth + balance events |

The Brain's `SandboxAgent`, `IncidentAgent`, and `AnomalyAgent` must know which parser to consult per merchant, driven by the merchant's platform config.

## Ingestion pipeline

```
Source → Platform-aware parser → Normalizer → Entity Resolver → Knowledge Graph writer
                                                              → Memory store candidate writer
                                                              → Analytics columnar store writer
```

Every ingest must:
- Tag PII scope (PCI / HIPAA / PII / none)
- Tag source for auditability
- Respect data-residency constraints
- Be idempotent and replayable

## What the Brain ingests but NEVER persists

- Full PAN (tokenized at ingest)
- Full CVV (never stored at all)
- HIPAA-scoped free-text beyond minimum required
- Merchant-private content flagged as "do not train on"

## Data quality

Each source has a freshness SLA. The Brain exposes freshness metadata on every retrieval — agents know when data is live vs. stale vs. nightly batch.
