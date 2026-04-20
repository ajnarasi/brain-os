---
type: project
merchant: indigo-road-apparel
last_reviewed: 2026-04-14
---

# Project memory — Indigo Road Apparel

In-flight initiatives. High decay rate — review weekly.

---

## proj-bnpl-rollout — "Adding Afterpay + Klarna BNPL for Gen Z segment"

**Status:** Integration phase — Afterpay in sandbox; Klarna not started
**Owner (merchant):** Sarah Chen (CTO)
**Fiserv contact:** Priya Patel
**Target go-live:** **2026-06-15** (in time for fall drop marketing)
**Why:** Q4 2025 customer survey showed 34% of 18–24 buyers abandoned checkout when BNPL wasn't offered. CFO (Marcus) approved $X budget for BNPL rollout after seeing the cart abandonment data.

**Current phase:**
- Afterpay in sandbox, cert scripts drafted
- 3DS integration flow decided (**2.x only, no v1 fallback** — per feedback memory `bfcm-3ds-retry`)
- Idempotency key TTL set to **35 days** — per feedback memory `klarna-webhook-timeout`
- Klarna integration not yet started; waiting on legal review of their ToS

**Blockers:**
- Klarna merchant agreement legal review (Marcus owns — ETA 2026-04-25)
- Shopify middleware change for BNPL payment-method surfacing (Adam's team, ETA 2026-05-01)

**Risks:**
- Running tight to June 15 if legal slips
- Afterpay cert scripts may fail first submission — flagging for CertAgent to pre-run when ready

**IntegrationAgent should be aware:** This project is why most of the recent integration questions come in. Default to BNPL-context framing when Sarah asks technical questions.

---

## proj-wholesale-netsuite-refactor — "SnapPay NetSuite integration refactor"

**Status:** Planning
**Owner (merchant):** Marcus Webb (CFO) + SnapPay engineering
**Target go-live:** 2026-Q3
**Why:** Current NetSuite → SnapPay AR integration has a manual reconciliation step that Marcus wants to automate. SnapPay has published new webhook-based flow (per `corpus/01-apis/snappay.md` — SAP S/4HANA and Oracle ERP Cloud already use it; NetSuite catching up).

**Current phase:** Discovery — scoping the API delta
**Blockers:** Waiting on SnapPay engineering for NetSuite connector roadmap (ETA: response expected from Priya Patel by 2026-04-20)

**Risks:**
- Refactor could disrupt wholesale AR processing — any change must be tested against existing B2B customers
- Could impact contract renewal negotiation (current contract has AR volume clauses)

---

## proj-bfcm-2026-prep — "BFCM 2026 capacity + fraud-envelope preparation"

**Status:** Planning (pre-planning, actually)
**Owner (merchant):** Sarah Chen + Marcus Webb (joint)
**Target prep-complete:** 2026-09-01 (8 weeks before BFCM)
**Why:** After the 2024 3DS retry incident and the 2025 smooth-but-conservative run, Marcus wants a clean BFCM 2026 with maximum conversion. Forecast assumption: **2.2x peak** (per feedback memory `bfcm-traffic-2x-baseline`).

**Current phase:** Early — no concrete work yet, but flagged in memory so AnalyticsAgent starts watching comparable-cohort BFCM benchmarks as Q3 approaches

**Risks:**
- BNPL rollout (proj-bnpl-rollout) could interact with BFCM in unexpected ways if not stable by September
- 3DS challenge flow tuning needs pre-BFCM rehearsal — flag for Sarah

---

## proj-contract-renewal — "Fiserv CommerceHub Enterprise contract renewal"

**Status:** Not yet started — approaching
**Owner (merchant):** Marcus Webb
**Target:** 2026-07-01 renewal date
**Current phase:** Informational; no action yet

**What the Brain should do:** Flag this in AnalyticsAgent's monthly narrative starting in May 2026. Marcus will want benchmarking + ammunition for his renewal discussion with Priya and Fiserv commercial.

---

## Archived projects (for reference)

- **proj-signifyd-migration** — Completed 2025-06. Migrated front-line e-com fraud from in-house rules to Signifyd. Lift: +0.8% approval rate, -12% chargeback rate.
- **proj-nps-2025** — Completed 2025-11. Implemented post-purchase NPS survey; Q4 score: 52.
