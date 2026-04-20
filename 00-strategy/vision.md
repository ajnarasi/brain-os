# Vision

## One-liner

*"Every Fiserv merchant gets a second brain that knows their stack cold — integrated from day one, learns from every incident, and talks to Fiserv on their behalf."*

## The problem, in one paragraph

Every merchant who signs with Fiserv (directly, through a bank, through an ISV, through an ISO) has to rebuild the same operational knowledge other Fiserv merchants have already built. Integration lessons, dispute templates, fraud thresholds, BFCM scaling runbooks, settlement reconciliation quirks for a specific partner bank — all of it lives in TAM heads, Slack threads, and tickets that expire. The result is a **knowledge-asymmetry tax** on every merchant, and a retention leak for Fiserv that shows up as "integration friction" and "post-launch blindness" in every churn post-mortem.

## The product, in one paragraph

The **Fiserv Brain** is a per-merchant second brain that takes Fiserv's tribal knowledge (runbooks, solutions-engineering notes, processor specs, MCC-specific patterns, support ticket history) and fuses it with the merchant's own operational history (their integration log, their incidents, their analytics, their preferences) into a durable, writable memory layer. On top of that memory layer sits a retrieval system and a set of agents — IntegrationAgent during integration, LaunchAgent at go-live, OpsAgent afterwards — that don't just answer questions but *take action* (run a test transaction, open a ticket, pull a report, trigger a runbook, flag an incident).

## 3-year arc

**Year 1 — Integration & Go-Live copilot.** Ship the Brain as a copilot inside the integration flow for new merchants on direct and ISV channels. Target metrics: 40% reduction in time-from-contract-to-first-prod-txn, 25% reduction in support tickets during integration, 90%+ cert pass rate on first submission. Free tier bundled with CommerceHub / Clover sign-up; paid tier for mid-market.

**Year 2 — Ops brain.** Turn the Brain on for existing merchants too. Ticket deflection, incident triage, plain-English weekly business narratives ("your auth rate dropped 3% on Tuesday, here's why, here's what to do"), proactive optimization suggestions for interchange, routing, and retry logic. Start landing mid-market paid customers and ISV revenue-share deals.

**Year 3 — Agentic execution.** The Brain stops telling merchants what to do and starts *doing it*. Opens tickets. Adjusts fraud rules. Reconciles settlement variances. Negotiates interchange optimization with Fiserv's own ops teams. This is where "Brain as a Service" becomes a standalone SKU with its own P&L, and where the moat compounds — switching cost goes from "high" to "prohibitive" because the merchant's operational memory now lives inside the Brain.

## North-star metric

**Merchant-hours saved per month** across the Fiserv base. Every dimension of the Brain (integration, ops, analytics, agentic execution) has to ladder up to this number. Secondary metrics: NRR, ticket volume trend, time-to-first-txn, launch-week incident count.

## What this is NOT

- Not a chatbot on top of docs (that's a RAG demo, not a product).
- Not a replacement for TAMs (it's TAM leverage — each TAM can serve 10x more merchants).
- Not a single-vertical tool (channel-aware, vertical-aware, business-model-aware).
- Not tied to any one Fiserv product (it's a control plane above CommerceHub, Clover, Optis, First Data, Carat, AccessOne, etc.).

## Why Fiserv, specifically

Stripe and Adyen can build a brain, but they can't build a **channel-aware *and* platform-aware** brain — they don't have thousands of bank partners, they don't have Clover, they don't have IPG (Ucom) powering Yum! Brands and Costco-class strategic merchants, they don't have ISO residual models, they don't have Nashville + Omaha + Buypass + STAR/NYCE + TeleCheck + ValueLink as a back-end fleet to reconcile, and they don't have Fiserv's breadth of MCCs. Fiserv is the only processor whose **distribution, platform breadth, and back-end diversity** are all simultaneously structural advantages for this product. The Brain turns Fiserv's biggest operational weakness (fragmented channels, fragmented commerce platforms, fragmented processing back-ends) into a moat that no single-platform competitor can cross.
