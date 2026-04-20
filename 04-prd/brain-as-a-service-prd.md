# Brain as a Service — Master PRD

**Status:** First-draft, side-project pitch
**Owner:** Ajay Narasimma
**Last updated:** 2026-04-13

## TL;DR

Fiserv's merchants arrive through eight different channels (direct, bank, ISV, ISO, PayFac, marketplace, referral, franchise) and bleed retention because every merchant has to re-learn the same integration + operational lessons in isolation. Brain as a Service (BaaS) productizes Fiserv's tribal knowledge into a per-merchant "second brain" — durable memory + agents — that compresses time-to-live, deflects support tickets, narrates analytics, and eventually takes action on the merchant's behalf. Channel-awareness is the moat: no competitor can ship a multi-channel brain, because no competitor has multi-channel distribution.

## Problem

1. **Integration friction.** Every new Fiserv merchant spends 2–6 months re-learning lessons other merchants already learned. TAMs burn 5–15 hours per merchant answering documented questions.
2. **Launch blindness.** The first 72 hours of production traffic are critical and undermonitored. Issues get found by end customers, not by Fiserv.
3. **Operational toil.** Post-launch, merchants manage payments ops through dashboards that nobody reads and support tickets that repeat themselves.
4. **Knowledge decay.** When a TAM leaves, their merchant context goes with them. When a merchant's ops lead leaves, their runbook context goes with them.
5. **Channel fragmentation.** Each channel (direct, bank, ISV, etc.) has reinvented the onboarding + ops wheel separately. There's no shared substrate.

## Who this is for

Four concentric rings:

- **Ring 1 (users):** Merchant devs, ops teams, finance leads, exec dashboards
- **Ring 2 (buyers):** For direct merchants, the merchant themselves; for partner channels, the partner (bank, ISV, ISO, PayFac, marketplace)
- **Ring 3 (internal stakeholders):** Fiserv TAMs (Brain is their leverage), Fiserv support (Brain deflects tickets), Fiserv BUs (Brain lifts NRR)
- **Ring 4 (regulators):** PCI, HIPAA, card brands — Brain must respect all constraints transparently

## Goals

**Year 1 goals:**
- Ship Integrate + Go-Live phases for two beachhead pilots
- 40% reduction in time-from-contract-to-first-prod-txn for pilot merchants
- 25% reduction in integration-phase support tickets
- 90%+ cert pass rate on first submission
- 1 signed channel-partner co-brand deal (stretch)

**Year 2 goals:**
- Turn on Operate phase for existing merchants
- 40–60% ticket deflection
- 200–400 bps NRR lift on merchants using the Brain vs. matched control
- Scale to ≥10,000 paying merchants across direct + ISV channels

**Year 3 goals:**
- Agentic execution layer live
- 30%+ of routine merchant ops work executed by Brain agents
- Standalone P&L for Brain-as-a-Service SKU
- Deployed across ≥5 channels including at least 1 bank-partner deployment

## Non-goals

- Not building a new merchant acquiring platform (the Brain sits above the existing ones)
- Not replacing TAMs (it's TAM leverage)
- Not competing with Stripe/Adyen on enterprise direct-channel (win on SMB + mid-market via channels)
- Not a chatbot on top of docs
- Not a white-labeled generic LLM (requires Fiserv-specific data + actions)

## The 5-axis segmentation (from `01-personas/segmentation-framework.md`)

Size × Channel × Vertical × Business Model × **Fiserv Platform**. The fifth axis (added after v1 draft) captures which Fiserv product stack the merchant actually runs on — both the front-end commerce platform they interact with (Clover, CommerceHub, **IPG / Ucom**, Carat, Optis, Payeezy, AccessOne) and the back-end authorization / clearing platforms the telemetry flows through (Nashville / North, Omaha / South, Buypass, STAR/NYCE, TeleCheck, ValueLink). Platform-awareness is what lets the Brain serve a Yum! Brands corporate merchant on IPG + Nashville + Buypass the same way it serves a Clover SMB restaurant on Clover + Nashville — with shared memory architecture but different parsers, agents, surfaces, and autonomy envelopes.

## The three lifecycle phases (from `02-lifecycle/`)

1. **Integrate** — onboarding brain (contract → first prod txn)
2. **Go-Live** — launch brain (T-7 days through T+2 weeks post-cutover)
3. **Operate** — ops brain (forever, starting T+2 weeks)

## Architecture summary (from `03-architecture/system-overview.md`)

Seven layers: Ingestion → Knowledge Graph → Memory Store → Retrieval → Agents → Orchestration → Surface. Memory store uses 5 types (user, feedback, project, reference, **partner**). Agents are narrow, auditable, H-I-L-gated by default.

## Monetization (from `00-strategy/monetization.md`)

Three concurrent streams: direct merchant SaaS, channel partner rev-share, NRR lift on existing Fiserv ARR.

## Success metrics

| Phase | Primary metric | Target |
|---|---|---|
| Integrate | Time-to-first-prod-txn | -40% vs. baseline |
| Integrate | Cert pass rate first submit | 90%+ |
| Go-Live | Clean-launch rate | 90%+ |
| Go-Live | Launch-week incident count | -60% |
| Operate | Ticket deflection | 40–60% |
| Operate | NRR delta | +200–400 bps |
| Cross | Merchant NPS | >50 at 6 months |
| Cross | North star: merchant-hours saved / month | TBD baseline from pilots |

## Risks

Covered in `00-strategy/market-thesis.md` and `00-strategy/moat-and-defensibility.md`. The top four:
1. Fiserv internal coordination (cross-BU alignment)
2. Data access on bank-channel agreements
3. Competitive response from Stripe / Adyen
4. Trust erosion from a bad action by an agent

## Out-of-scope for v1

- Multi-region data residency (US-only for MVP)
- Strategic global merchants (requires custom everything; save for v2)
- **IPG (Ucom) strategic-QSR pilots** (e.g., Yum!, Dunkin', Inspire Brands, Costco) — high priority for v2 but integration cycles, custom change-control, and stakeholder surface are too large for MVP; see Slice D in mvp-scope.md
- **Buypass / fuel-attached merchant coverage** — specialty parser needed; v2 when IPG pilots begin
- **TeleCheck / ValueLink integration** — specialty back-ends relevant for grocery, big-box, and enterprise; v2
- PayFac channel (API-first, harder to demo; save for v2)
- Voice-channel MOTO support
- Regulatory-heavy verticals beyond healthcare (cannabis, iGaming, firearms — handled by compliance overlay, but not MVP priority)

## MVP scope

See `04-prd/mvp-scope.md`.

## Open questions

1. Who internally owns Brain as a Service (which Fiserv BU)?
2. What's the acceptable agentic-action envelope for v1 (how much autonomy by default)?
3. How is Brain-memory portability handled on churn (do merchants own their memory)?
4. What's the minimum viable integration into Clover App Market for the Clover pilot?
5. Does the Brain plug into Carat APIs specifically, or is it cross-product by default?
