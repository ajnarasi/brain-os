---
type: project
merchant: northgate-qsr-holdings
last_reviewed: 2026-04-14
---

# Project memory — NorthGate QSR Holdings

---

## proj-mobile-order-rollout — "Arby's mobile order rollout across the 47 locations"

**Status:** Rollout in progress — 29 of 47 Arby's locations live; 18 remaining
**Owner (merchant):** Dana Okafor (PM) + Janice Park (Arby's regional ops)
**Fiserv contact:** Chris Nguyen
**Inspire Brands contact:** Arby's corporate mobile-ordering program office
**Target 100% rollout:** **2026-06-30**
**Why:** Inspire Brands' corporate Arby's app has mobile ordering + curbside pickup as a national program. NorthGate is one of the franchisee groups in the rollout cohort. Expected uplift (per Inspire Brands' pilot data): +11% average ticket on mobile-order customers, +4% visit frequency. Dana's target: full NorthGate Arby's rollout before summer road-trip season.

**Current phase:**
- 29 locations live with mobile order + curbside
- 18 remaining — mostly smaller rural Arby's locations + the 4 fuel-attached ones (which have extra complexity because of the fuel-side integration)
- IPG config changes required at each location (Connected Commerce configuration per `corpus/01-apis/ucom-ipg.md`)
- Integration tested per-location before go-live

**Blockers:**
- Fuel-attached locations: additional testing required for fuel/QSR reconciliation (pending)
- Cert script for Connected Commerce "mobile order" event type has been slower than expected — 2 cert resubmissions so far (Tony Ruiz owns)

**Risks:**
- Rolling out too fast risks a BFCM-style retry loop during the June peak travel weekend
- Fuel-attached locations could introduce Buypass-related complexity (per `feedback.md#buypass-pump-firmware-sentinel`)

**What the Brain should do:**
- IntegrationAgent: when Tony asks cert-script questions, retrieve `corpus/01-apis/ucom-ipg.md` with IPG-specific guidance
- IncidentAgent: Watch for anomalies at freshly-rolled-out locations in the 72-hour post-go-live window; apply the Go-Live phase launch runbook pattern
- AnalyticsAgent: Track mobile-order attach rate per location in weekly narratives; benchmark against Inspire Brands pilot data

---

## proj-consolidated-reporting — "Cross-brand reporting across Arby's + BWW + Jimmy John's"

**Status:** Scoping → early build
**Owner (merchant):** Dana Okafor (driving), Rachel Stern (CFO, stakeholder)
**Target v1 delivery:** 2026-07-15
**Why:** Today, NorthGate has three separate per-brand reports (one per brand's POS + IPG roll-up). Dana wants a unified weekly/monthly report that rolls up across brands with comparable metrics (revenue, approval rate, dispute rate, tip rate for BWW, ticket average, etc.). Rachel wants the same view for finance consolidation.

**Current phase:**
- Data model scoping — which fields are comparable across three POS systems (NCR Aloha, Arby's proprietary, Oracle Simphony)
- Exploring whether IPG / Connected Commerce roll-ups can serve as the data substrate (per `corpus/01-apis/ucom-ipg.md`)
- Dana + Tony scoping whether to build in-house or request Fiserv to surface it

**Blockers:**
- Per-brand POS systems expose different field sets — normalization is non-trivial
- Change-control for any custom Fiserv-side work is lengthy

**Risks:**
- Scope creep — every exec who sees v1 will want more fields
- Rachel wants monthly close finality; Dana wants daily ops narratives — two different cadences

**What the Brain should do:**
- AnalyticsAgent should proactively propose this "unified report" as the natural format for the Brain's weekly narrative
- Act as the "thin prototype" of consolidated reporting while the real project is being built
- Cite cross-brand patterns when discovered

---

## proj-super-bowl-2027-plan — "Super Bowl LXI prep (February 2027)"

**Status:** Pre-planning — early
**Owner (merchant):** Dana Okafor + Derek Lee (BWW regional ops)
**Target prep-complete:** 2027-01-20 (two weeks before game day)
**Why:** Super Bowl is NorthGate BWW's single-largest revenue day. The 2025 (Super Bowl LIX) incident generated the `feedback.md#bww-super-bowl-capacity` rule. 2026 (Super Bowl LX) went clean. Dana wants to keep the streak going.

**Current phase:**
- Flagged for Q4 2026 planning
- No active work yet

**What the Brain should do:**
- AnalyticsAgent should surface this project in monthly narratives starting October 2026
- Pre-game: remind Dana to apply `bww-super-bowl-capacity` rule the Thursday before game day
- During game: watch for cross-BWW location anomalies in real time

---

## proj-pci-audit-2026 — "Annual PCI DSS Level 1 audit"

**Status:** Prep phase
**Owner (merchant):** Tony Ruiz (IT Director, DRI) + Rachel Stern (audit sponsor)
**Target audit completion:** 2026-08-30
**Why:** Annual PCI DSS Level 1 audit. NorthGate processes >6M card txns/year so Level 1 applies.

**Current phase:**
- QSA selection finalized
- Scope walk-through scheduled for May
- Evidence collection starts June

**What the Brain should do:**
- DocsAgent: when Tony asks PCI scope questions, retrieve `corpus/03-industry-standards/pci-dss.md`
- Proactively flag any IncidentAgent narrative that touches PCI-scope data handling during the audit window — auditors will want a trail
- If the Brain itself operates on transaction data, make absolutely sure the demo labeling doesn't muddy the PCI scope discussion (the Brain in the demo doesn't touch real data, but the principle matters for the real deployment)

---

## proj-fuel-attached-reconciliation — "Improve cross-back-end reconciliation for fuel-attached Arby's locations"

**Status:** Scoping
**Owner (merchant):** Tony Ruiz + Janice Park (Arby's regional ops)
**Target:** 2026-Q3 decision point
**Why:** The 4 fuel-attached Arby's locations touch both Nashville (Arby's side) and Buypass (fuel side). Reconciliation across back-ends has been manual and error-prone. Tony wants a cleaner reconciliation process.

**Current phase:** Discovery — scoping what's needed
**Blockers:** Need Buypass operations engagement; Chris Nguyen owns that

**What the Brain should do:** Flag any cross-back-end reconciliation question as relevant to this project
