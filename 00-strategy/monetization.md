# Monetization

## Three concurrent revenue streams

The Brain is unusual because it can legitimately monetize three ways simultaneously, and each stream re-enforces the others.

### 1. Direct merchant SaaS (per-seat / per-MID)

| Tier | Who | Price | What they get |
|---|---|---|---|
| **Free / Starter** | Micro-SMB, Clover app-market installs | $0 | Integration copilot, docs Q&A, basic launch checklist. Loss leader. |
| **Pro** | SMB ($1M–$10M GPV) | $49–$99/mo/MID | Operate phase: ticket deflection, dispute templates, daily-close narrative, basic analytics |
| **Business** | Mid-market ($10M–$500M) | $499–$1,999/mo | Full lifecycle, multi-location, custom agents (APMAgent, BFCM brain), priority TAM routing, analytics narratives |
| **Enterprise** | $500M+ GPV | Custom ($10K–$100K/mo) | White-glove, custom memory schemas, API access to Brain memory, embedded in merchant's own tooling |

### 2. Channel revenue-share (B2B2B via partners)

Channel partners pay Fiserv per active merchant they roll the Brain out to. Fiserv does the work; partner gets co-branding + retention lift.

- **ISV partners (Clover App Market, CommerceHub SDK ISVs):** $2–$10 per active merchant per month, rev-share 70/30 Fiserv/ISV.
- **Bank partners:** negotiated per-partner, typically $5–$25 per merchant per month, white-labeled under the bank's brand.
- **ISOs:** $1–$5 per merchant per month, positioned as a retention tool the ISO sells to its own book; ISO keeps the residual upside.
- **PayFacs:** API-first pricing, typically $X per API call for Brain queries + $Y per active sub-merchant.
- **Marketplaces / franchise master merchants:** custom, usually bundled into their existing Fiserv contract as a value-add.

### 3. NRR uplift on existing Fiserv ARR (the internal pitch)

Not a new revenue line per se, but the easiest number to defend internally: show that merchants using the Brain have measurably higher retention, higher processing volume (because they launch faster and optimize more), and lower support cost (because tickets deflect). This justifies Fiserv funding the Brain even if direct monetization is slow.

Target: **+200–400 bps of NRR** on the cohort using the Brain, vs. matched control.

## Packaging principles

1. **Free tier must exist.** Zero-CAC distribution through Clover + CommerceHub sign-up is the whole distribution thesis. No free tier, no flywheel.
2. **Upgrade triggers are usage-based, not time-based.** A Free-tier merchant hits the paywall when they try to use an agentic action (open a ticket, tune fraud rules, auto-reconcile settlement) or when their transaction volume crosses a threshold — not after a 30-day trial.
3. **Channel SKUs must be co-brandable.** If a bank or ISV can't put their logo on the Brain, they won't sell it to their merchants.
4. **Enterprise is bespoke.** Don't try to package a strategic global merchant. Sell them a custom deployment and charge accordingly.
5. **No contract lock-in at free/pro.** Brain memory is the lock-in. If the merchant can take their memory with them, the product has to be good enough to keep them.

## Pricing discipline (what NOT to do)

- Don't charge for seats within a merchant org. A merchant with 5 people on the Brain is 5x more valuable to Fiserv than 1; punishing team adoption kills the flywheel.
- Don't charge per query. It makes merchants avoid using the product.
- Don't bundle this into existing Fiserv merchant-services contracts at zero dollars. That destroys the P&L story and makes the Brain look like a cost center instead of a product line.

## Unit economics target (Year 2)

- Blended ARPU across direct + channel: **~$35/mo/merchant**.
- Gross margin: **75%+** (LLM cost dominates COGS, but per-merchant LLM cost amortizes fast once memory warms up).
- Payback: **<6 months** on direct, **<2 months** on channel (because CAC is effectively zero).
- LTV/CAC: **>5x** on direct, **>20x** on channel.
