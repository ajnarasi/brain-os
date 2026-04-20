---
type: user
merchant: northgate-qsr-holdings
last_reviewed: 2026-04-14
---

# User memory — NorthGate QSR Holdings

## Entity
- Legal: NorthGate QSR Holdings, LLC (Tennessee LLC; parent of multiple single-brand subsidiaries)
- DBA: NorthGate QSR (corporate); individual locations operate under brand names (Arby's, BWW, Jimmy John's)
- **Brand portfolio:** 47 Arby's + 12 Buffalo Wild Wings + 8 Jimmy John's = **67 total locations**
- **Parent franchisor for all three brands:** Inspire Brands (Atlanta, GA)
- Primary corporate MID: `NGHOLD-CORP-001` (roll-up / reporting)
- Sub-brand roll-up MIDs: `NGHOLD-ARBY-01`, `NGHOLD-BWW-01`, `NGHOLD-JJ-01`
- Per-location MIDs: `NGHOLD-ARBY-01` through `NGHOLD-ARBY-47`; `NGHOLD-BWW-01` through `NGHOLD-BWW-12`; `NGHOLD-JJ-01` through `NGHOLD-JJ-08`
- **MCCs:** Primary **5814** (Fast Food Restaurants) across all QSR locations. **5542** (Automated Fuel Dispensers) at 4 fuel-attached Arby's locations. **5813** (Drinking Places) sometimes shows at BWW locations that serve alcohol heavily.
- Countries: US only (TN, GA, AL, MS, KY, FL)
- State licenses: Alcohol/liquor licenses for all 12 BWW locations (state-by-state)
- Tax ID: synthetic `XX-XXXXXXX`

## Product stack
- **IPG / Connected Commerce (Ucom)** — primary front-end payment platform across all 67 locations (per `corpus/01-apis/ucom-ipg.md`). hashExtended message signature, custom enterprise integration.
- **Fiserv SnapPay** — B2B AR/AP for supplier payments, integrated with Oracle ERP Cloud (per `corpus/01-apis/snappay.md`)
- **Oracle ERP Cloud** — corporate finance + inventory
- **NCR Aloha** (BWW POS, brand-standard)
- **Arby's proprietary POS** (brand-standard)
- **Oracle Simphony** (Jimmy John's POS, brand-standard)
- **ValueLink** — Inspire Brands loyalty gift card platform (Arby's Rewards, BWW Blazin' Rewards, JJ Freaky Fast Rewards)
- **STAR / NYCE / Accel** — PIN debit routing
- **Buypass** — fuel authorization at 4 fuel-attached Arby's (travel-plaza format)
- **TeleCheck** — check acceptance at high-ticket BWW locations (rarely used but present)

## Roles (DRIs)

| Role | Name | Responsibilities | Session scope |
|---|---|---|---|
| Corporate Payments PM | **Dana Okafor** | **Primary Brain user.** Payments strategy, cross-brand reporting, incident review, Fiserv commercial, exec review prep | Full enterprise scope |
| Corporate IT Director | **Tony Ruiz** | Infrastructure, POS connectivity, change-control gate, security | Technical + compliance |
| CFO | **Rachel Stern** | Settlement, AR, budget, contract sign-off | Finance + commercial only |
| Ops VP (cross-brand) | **Marcus Thurmond** | Location operations, incident escalation | Ops |
| Regional ops (Arby's) | Janice Park | Arby's-specific ops + fuel-attached location coordination | Region-specific |
| Regional ops (BWW) | Derek Lee | BWW-specific ops + Super Bowl planning | Region-specific |
| Fiserv Corp TAM | **Chris Nguyen** | Monthly 1:1 with Dana, quarterly with Rachel, on-call for major incidents | External — Fiserv |
| Inspire Brands liaison | Corporate contact (name varies by brand) | Franchisor coordination | External — not used in demo |

**Default session user:** Dana Okafor. Assume this unless otherwise specified. When Tony Ruiz asks, scope to technical + compliance. When Rachel Stern asks, scope to finance + commercial.

## Preferences

- **Alerting cadence:**
  - **Incident alerts:** Immediate for P0/P1. P2 can batch into daily digest. Dana's phone is always on; she prefers specific narrative alerts over generic "something changed" pings.
  - **Weekly narrative:** Monday 6am CT (before her weekly exec review at 10am CT)
  - **Monthly business review:** First business day of month, 7am CT
  - **Quarterly review:** Before her quarterly meeting with Chris Nguyen + Rachel
- **Tone:** **Analyst-language.** Specific numbers, regional variance, BIN-range concentration, time-series deltas, cross-location clustering. No owner-language. Dana reads a lot of data and wants density, not friendliness.
- **Risk tolerance:** **Very low for autonomous action.** Very high for information volume. The Brain can flag everything — it just cannot *do* anything without approval.
- **Settlement preference:** Daily settlement per brand roll-up + corporate aggregate daily. Weekly reconciliation is Rachel's purview.
- **Reporting format:** Dana wants structured sections with drill-down citations. Tables for cross-location data. Bullet-pointed findings with severity ranking.
- **Do-not-contact windows:** None — Dana is on-call 24/7 for P0.

## Contract

- **Tier:** Strategic / Enterprise custom
- **Term:** 5 years, started 2023-09-01 (concurrent with the Inspire Brands Carat expansion per `corpus/02-fiserv-general/blogs-press-releases.md` and `corpus/04-merchant-context/strategic-merchants.md`)
- **Next renewal:** 2028-09-01 (not near-term)
- **Commercial structure:** Custom rate card, volume-based tiering across the 3 brands
- **Change-control:** **Absolute.** Any production change requires: (1) Tony's IT review, (2) Dana's PM sign-off, (3) for financially-material changes, Rachel's sign-off
- **Compliance:** **PCI DSS Level 1** (>6M card txns/year). Maintains full PCI audit.

## Platform notes

See `partner.md` for the full channel + platform relationship. Short version: **Direct Fiserv channel, IPG front-end, Nashville + Buypass + STAR/NYCE + ValueLink + TeleCheck back-ends**. This is the most complex platform stack in the three demo merchants; the Brain must reconcile across 5 back-ends for a complete picture of a single merchant.
