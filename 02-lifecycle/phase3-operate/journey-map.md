# Phase 3 — Operate

The "ops brain." The long-tail value. Serves merchants from ~2 weeks post-launch through the rest of their Fiserv relationship. This is where NRR lives.

## What "operating a merchant" means in 2026

Forget the 2015 mental model of "the merchant processes cards and checks a dashboard once a week." Today's merchant has:

- A live stream of transactions across 3–8 surfaces (in-store POS, website, mobile app, marketplace listings, delivery partners, BOPIS, call center)
- Disputes arriving daily in at least one product
- Settlement running on a complex schedule (daily on card, NET-30 on ACH, 7-day rolling on cross-border)
- Fraud rules that drift without maintenance
- Interchange and routing decisions worth single-digit bps per txn
- A thousand small questions ("why did this decline," "can I refund this," "how do I change my descriptor") that hit Fiserv support daily

Today, the merchant deals with all of this by opening tickets, reading dashboards, and calling their TAM. Every one of those interactions is a chance for the Brain to add value.

## The Operate-phase value stack

### Layer 1 — Ticket deflection (the wedge)

When a merchant has a question, the Brain answers it. Not from generic docs — from *their* merchant-specific context. "Why did this decline?" → the Brain pulls the actual txn, reads the ISO 8583 response code, explains it in plain English, and (if appropriate) suggests a fix.

**Target:** deflect 40–60% of tier-1 support tickets.

### Layer 2 — Proactive incidents (the surprise)

The Brain watches merchant metrics continuously and surfaces issues before the merchant notices them. "Your auth rate dropped 3% last Tuesday. The drop is concentrated on Visa credit from issuer Capital One. This matches a known BIN routing change from 9pm Tuesday. Here's what to do."

**Target:** detect 80% of material ops issues before the merchant reports them.

### Layer 3 — Analytics narratives (the differentiator)

Every merchant has a dashboard. Nobody reads dashboards. The Brain turns the dashboard into a story: "This week, you processed $2.4M (+4% WoW). Your approval rate was 94.2% (down 0.3pt — this was driven by a delivery-partner chargeback spike you can see in the dispute section). Your top SKU by revenue was X. Here's what to watch next week."

Delivered weekly as a plain-English summary, expandable into source data on click.

**Target:** 70% of paying merchants open the weekly narrative within 24 hours of delivery.

### Layer 4 — Optimization suggestions (the upside)

The Brain continuously benchmarks the merchant against comparable merchants (same cluster, same size tier, anonymized). It surfaces specific optimization opportunities: "Merchants in your cluster who route their Amex traffic through X instead of Y see 0.4% higher approval rates. Want me to suggest the routing change?"

**Target:** each merchant accepts ≥3 optimization suggestions per quarter.

### Layer 5 — Agentic execution (Year 3+)

The Brain stops suggesting and starts doing. Opens tickets on the merchant's behalf. Adjusts fraud rules within a pre-approved envelope. Reconciles settlement variances. Drafts and submits dispute responses. Runs retries on specific decline categories.

Every agentic action is logged, reversible, and initially human-in-loop for anything financially material. Trust is earned: after N weeks of a specific agent making good recommendations in suggest-only mode, the merchant can upgrade it to act-first mode.

**Target (Year 3):** 30%+ of merchant-initiated ops work is executed by Brain agents.

## Brain capabilities required for Phase 3

- **TicketAgent** — deflects support tickets with merchant-specific context
- **IncidentAgent** — continuous anomaly detection + narrative incident reports
- **AnalyticsAgent** — generates weekly/monthly plain-English business narratives
- **OptimizationAgent** — benchmarks against comparable merchants, surfaces specific opportunities
- **DisputeAgent** — drafts dispute responses using merchant context + historical win rates
- **SettlementAgent** — watches settlement, catches variances, reconciles
- **FraudTuningAgent** — continuously tunes fraud rules within merchant's risk envelope
- **RetryAgent** — decides which declines are worth retrying, when, and how

## KPIs

- **Ticket deflection rate** — % of merchant questions answered by Brain without human escalation
- **Incident detection lead time** — hours the Brain detects an issue before the merchant reports it
- **Optimization suggestions accepted** — count per merchant per quarter
- **NRR delta vs. matched control** — 200–400 bps target
- **NPS** at 6 months and 12 months post-launch

## The long-tail value story

Phase 1 and 2 are one-time events (Integrate → Go-Live). Phase 3 is the forever phase. The vast majority of the Brain's lifetime value for any merchant — and the vast majority of the Brain's revenue potential for Fiserv — lives in Phase 3.

## Channel nuance

- **Direct:** Brain is the merchant's primary ops surface; full agentic authority over time
- **Bank:** Brain is white-labeled; bank ops team sees aggregate view across their merchant book; merchant sees bank-branded Brain
- **ISV (Clover):** Brain embedded in Clover app; merchant uses it alongside their existing ISV workflow
- **PayFac:** Brain powers the PayFac's internal ops team + optionally their sub-merchant UX
- **Enterprise:** Brain is API-first; merchant's own ops tooling calls Brain agents as needed
