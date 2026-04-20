---
type: project
merchant: casa-rosa-taqueria
last_reviewed: 2026-04-14
---

# Project memory — Casa Rosa Taqueria

---

## proj-loyalty-clover-rewards — "Evaluate Clover Rewards digital loyalty"

**Status:** Evaluation — not yet committed
**Owner (merchant):** Luis Delgado (project lead), Maria (decision-maker)
**Target decision:** 2026-05-30
**Why:** Maria wants to replace the paper stamp card with something digital that customers can track via text or Clover app. Luis is evaluating whether Clover Rewards is good enough or whether to use a third-party Clover App Market loyalty app.

**Current phase:**
- Luis has read the Clover Rewards docs
- Running 2 weeks of manual loyalty tracking to establish baseline repeat-customer rate
- Cost-benefit analysis pending

**Blockers:**
- Need baseline data (week 2 of 2 in progress)
- Maria wants to see per-location repeat-customer analysis before committing

**What the Brain should do:**
- AnalyticsAgent should start tracking repeat-customer frequency per location in daily close narratives, so Luis has the baseline data when he's ready
- If Maria asks about loyalty in any interaction, DocsAgent should retrieve `corpus/01-apis/clover.md` for Clover Rewards specifics and `corpus/04-merchant-context/clover-merchants.md` for App Market alternatives

---

## proj-catering-online-ordering — "Add catering orders to Clover Online Ordering"

**Status:** Planning
**Owner (merchant):** Maria Delgado (driver), Javier Ruiz (kitchen feasibility)
**Target go-live:** 2026-06-01 (graduation season catering)
**Why:** Maria has been turning down catering requests for lack of a structured ordering process. Recent graduation-season inquiries made her realize this is lost revenue. Wants a simple flow where customers order online with 48-hour advance notice for catering quantities.

**Current phase:**
- Menu built out (Javier completed 2026-04-05)
- Need to configure Clover Online Ordering for "catering" category with minimum advance time
- Pricing model TBD

**Blockers:**
- Javier needs to confirm kitchen capacity for catering alongside regular service
- Payment handling: deposit at order + balance at pickup, or full payment at order?

**What the Brain should do:**
- DocsAgent: when Maria asks "how do I set up advance ordering in Clover Online," retrieve Clover-specific configuration from corpus/01-apis/clover.md
- Flag this as an "integration project in flight" so IntegrationAgent treats related questions with appropriate priority

---

## proj-sxsw-2026-retro — "SXSW 2026 performance retrospective"

**Status:** ✅ Completed 2026-03-20
**Archived:** Yes (kept in memory for historical context)
**Outcome:** SXSW 2026 went smoothly. Fraud envelope was loosened the week prior (per `feedback.md#sxsw-fraud-tuning`), and the first-day conversion issue from 2025 did not repeat. Total SXSW week revenue: ~$127K across 3 locations (vs. ~$41K for a normal week — 3.1x lift). Tip reconciliation was per-location from day 1 (per `feedback.md#tip-reconciliation-by-location`), no discrepancies.

**Notes for next year's SXSW project:** Maria wants to add a pop-up stand at the Austin Convention Center if Clover will support it without a full boarding cycle. Flag this in Q3 2026 planning.

---

## proj-sxsw-2027-popup (future)

**Status:** Not yet started — future consideration
**Target:** November 2026 scoping for March 2027 SXSW pop-up

(Intentionally thin — placeholder so the Brain remembers the intent and surfaces it in Q3 2026.)
