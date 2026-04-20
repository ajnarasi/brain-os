# Segmentation Framework — The 5-Axis Model

Most payments-product PRDs ship with a 2-axis segmentation (size × vertical) and that's why most of them miss the Fiserv opportunity. Fiserv's moat isn't just *what size* merchant it serves — it's *how the merchant got to Fiserv* and *which Fiserv product stack they actually run on*. A Yum! Brands corporate merchant, a mid-market fashion brand on CommerceHub, and a Clover SMB restaurant can all be "restaurant" or "retail" — but the Brain's ingestion, agents, surface, and failure modes are nothing alike. The Brain must be aware of **all five** of the following axes simultaneously.

## Axis 1 — Size Segment

Measured by Gross Processing Volume (GPV), not headcount or revenue, because payments volume is what drives product behavior.

| Tier | GPV range | Characteristics | Brain priorities |
|---|---|---|---|
| **Micro-SMB** | <$1M | Owner-operator, single location, zero PM/IT capacity, phone + Clover | Zero-touch, plain-English, proactive alerts, do-it-for-me by default |
| **SMB** | $1M–$10M | 1–10 locations, part-time ops person, one "tech-adjacent" owner | Daily ops automation, basic analytics narratives, dispute deflection |
| **Mid-Market** | $10M–$500M | 10–200 locations, light PM + IT, growing complexity | Integration acceleration, multi-location analytics, optimization, go-live brain |
| **Enterprise** | $500M–$5B | National, full PM/IT/procurement teams | Co-pilot mode, API-first, integrate into their own tooling, structured memory |
| **Strategic / Global** | $5B+ | Multi-region, multi-processor, often public-company reporting | White-glove, custom agents, negotiated SLAs, embedded as their own product |

See `size-segments/` for the full per-tier doc.

## Axis 2 — Go-to-Market Channel (the differentiating axis)

**This is how the merchant became a Fiserv merchant.** Fiserv's business is structurally different from Stripe's because most Fiserv merchants don't arrive direct — they arrive through partners. The Brain must be channel-aware because:

- **Onboarding flows differ** — a bank-channel merchant onboards through the bank's boarding platform, not Fiserv's.
- **Support ownership differs** — the bank / ISV is usually first-line of support, not Fiserv.
- **Commercial relationship differs** — who pays for the Brain (merchant, partner, or Fiserv).
- **Data access differs** — some channels expose full telemetry, others restrict it by agreement.
- **Trust relationship differs** — merchant trust is with the partner, not Fiserv.

| Channel | Who | Brain implication |
|---|---|---|
| **Direct sales** | Fiserv field + inside sales (CommerceHub, Optis, First Data direct accounts) | Fiserv owns the full relationship; Brain is a direct-sold SKU; full data access |
| **Bank partners (FI channel)** | Thousands of banks + credit unions that resell Fiserv acquiring under their own brand | Brain must be **white-label-able**; bank owns the merchant face; huge volume, restricted data access |
| **ISOs / agent networks** | Independent Sales Organizations + W2/1099 agents | Brain is a retention tool the ISO sells; residuals model; co-branded surface; ISO pays rev-share |
| **ISVs (integrated payments)** | Software companies embedding Fiserv payments (Clover App Market, CommerceHub SDK, Carat APIs, dev.fiserv.com) | Brain must be **embeddable** into ISV UX; ISV owns merchant UX, Fiserv owns rails; shared data access |
| **PayFacs / PSPs** | Sub-merchant aggregators using Fiserv as their underlying processor | Brain serves the PayFac's ops team and optionally their sub-merchants; API-first delivery |
| **Marketplaces / Platforms** | Uber/DoorDash/Etsy-style split-payment platforms running on Fiserv | Brain handles split-payment complexity, sub-merchant onboarding, 1099-K ops |
| **Referral / wholesale** | Accountants, POS resellers, trade associations | Low-touch; Brain is a lead-gen + retention surface |
| **Franchise / master merchants** | Franchisors, buying groups, co-ops | Hierarchical merchant model; Brain rolls location-level data up to corporate |

See `channels/` for per-channel docs.

## Axis 3 — Vertical / MCC Cluster

What the merchant sells. Drives regulatory overlay, data sources the Brain must ingest, and the specific pain the Brain addresses.

| Cluster | Sub-verticals | Regulatory / data specifics |
|---|---|---|
| Retail & Commerce | general retail, fashion/apparel, grocery, c-store+fuel, electronics, home goods, beauty, luxury, jewelry, sporting | PCI, inventory reconciliation, returns, BOPIS |
| Restaurant & Food | QSR, fast casual, FSR, bars/nightlife, coffee, ghost kitchens, catering, food trucks | Tips, delivery partners, liquor liability, PCI at the POS |
| Hospitality & Travel | hotels, OTAs, airlines, car rental, cruises, vacation rentals | Incremental auth, delayed capture, high chargeback rate, booking engines |
| Healthcare | dental, vet, clinics, hospitals, urgent care, pharmacy, optometry, mental/behavioral, telehealth, DME | HIPAA, HSA/FSA, copay flows, insurance adjudication |
| Professional Services | legal, accounting, consulting, real estate, property mgmt, insurance, staffing, agencies | Trust accounts, retainers, surcharging rules, Level 2 data |
| Personal Services | salons/spas, fitness, pet services, auto, home services, dry cleaning | Gratuity, booking integration, membership dunning |
| Education | K-12, higher ed, childcare, tutoring, EdTech | Convenience fees, tuition plans, PCI + FERPA |
| Nonprofit & Faith | nonprofits, churches, political campaigns | Donor privacy, recurring giving, campaign finance rules |
| Government & Public | municipal, utility, DMV, transit, parks | Level-3 data, convenience fees, public records requirements |
| B2B & Wholesale | distributors, manufacturers, industrial, trade supply, agriculture, fleet/fuel | Level 2/3 data, purchasing cards, NET terms, ACH, check conversion |
| Digital & Subscription | SaaS, streaming, gaming, digital goods, ad tech | Account updater, dunning, global tax, App Store sync |
| Financial & Regulated | lenders, collections, MSB, insurance finance, iGaming (licensed) | KYC/AML, state licensing, NMLS |
| Transportation & Mobility | rideshare, last-mile, freight, parking, toll, EV charging | Incremental auth, multi-party payout, real-time disbursement |
| High-Risk / Specialty | cannabis/CBD, firearms, nutraceuticals, adult, travel aggregators, sub-clubs, lead-gen | MATCH list, alternative rails, elevated reserves, limited card-brand access |

See `verticals/` for full per-cluster docs.

## Axis 4 — Business Model

Orthogonal to size, channel, and vertical. A "mid-market fashion brand" could be pure D2C, or omnichannel, or B2B wholesale-only, or all three — and the Brain has to know which, because the operational patterns differ completely.

- **B2C / D2C** — card-present, e-com, omnichannel retail
- **B2B invoice-based** — NET terms, ACH, Level 2/3, purchasing cards, AR integration
- **B2B2C marketplace / platform** — split payments, KYC at sub-merchant level, 1099-K
- **Subscription / recurring** — account updater, dunning, churn analytics
- **Omnichannel / unified commerce** — BOPIS, ship-from-store, tokenized loyalty
- **MOTO / CNP** — mail/phone order, call center, IVR payments

See `business-models/` for per-model docs.

## Axis 5 — Fiserv Platform (NEW)

**Which Fiserv product stack the merchant actually runs on.** Orthogonal to the other four axes — a merchant's channel tells you how they arrived, but the platform tells you what ingestion parser, agent loadout, surface, and failure modes apply.

Fiserv's stack is really **two layers**, and the Brain must model both:

### Front-end commerce platforms (what the merchant sees)

| Platform | Typical segment | Role |
|---|---|---|
| **Clover** | Micro-SMB → SMB | POS + App Market distribution |
| **CommerceHub** | Mid-Market → Enterprise | Unified commerce, e-com, omnichannel |
| **IPG (Ucom)** | **Enterprise / Strategic Global** | QSR + big-box strategic (Yum!, Dunkin', Inspire, Costco) |
| **Carat** | Enterprise → Strategic | API-first operating system |
| **Optis** | Legacy Enterprise | In runoff; migration wedge |
| **Payeezy** | Developer SMB | Developer-led gateway |
| **AccessOne** | Healthcare | Specialty healthcare payments |

### Back-end authorization / clearing platforms (the pipes underneath)

| Platform | Role | Notes |
|---|---|---|
| **Nashville (North)** | Primary auth + clearing | First Data North legacy; most merchant volume |
| **Omaha (South)** / "South Oceans" | Secondary auth + clearing | First Data South legacy; merchants migrating to Nashville |
| **Buypass** | Petroleum / c-store / fleet fuel | EMV pump, fleet card routing |
| **STAR / NYCE / Accel** | PIN debit networks (Fiserv-owned) | Interchange optimization lever |
| **TeleCheck** | Check authorization | Still material in grocery, big-box, some govt |
| **ValueLink** | Gift card | Open + closed loop |
| **Cardnet** | Legacy international | Limited ongoing investment |

### Why this axis exists

- **Ingestion differs per back-end.** Nashville's ISO 8583 dialect is not the same as Omaha's or Buypass's. The Brain must run multiple parsers in parallel and know which applies.
- **Agents differ per front-end.** Clover has the App Market surface; IPG has custom enterprise admin; CommerceHub has unified-commerce portal. Same Brain capability, different implementation per front-end.
- **Failure modes differ.** IPG custom-integration failures are nothing like Clover app-market publish failures.
- **Reconciliation is cross-platform.** A single c-store or IPG merchant can touch 4–5 back-ends (Nashville for credit, STAR for PIN debit, Buypass for fuel, TeleCheck for checks, ValueLink for gift). The Brain's SettlementAgent must reconcile across all of them.
- **Autonomy envelopes differ.** A Yum!-tier IPG merchant will never let the Brain autonomously change anything — corporate change-control is absolute. A Clover SMB merchant will expect the opposite.

### Combination with other axes — the strategic-QSR cell

The **IPG / Ucom strategic-QSR cell** — Yum!, Dunkin', Inspire Brands, Costco-style — is a dedicated pattern the v1 segmentation didn't capture:
- **Size:** Strategic / Global ($5B+ GPV)
- **Channel:** Direct + Franchise/Master-merchant hierarchy
- **Vertical:** Restaurant-QSR or Retail-Big-Box
- **Business model:** B2C card-present + growing omnichannel (mobile app, drive-thru, kiosk, loyalty)
- **Platform:** IPG (front-end) over Nashville + Buypass (for fuel-attached) + STAR/NYCE (PIN debit) + ValueLink (gift)

This cell is a **V2+ priority** (not MVP) but is the **largest single potential revenue line** in Fiserv's book. See `platforms/front-end/ipg-ucom.md` and the Slice D proposal in `../04-prd/mvp-scope.md`.

See `platforms/` for the full platform axis documentation.

## For each persona cell the Brain supports, capture

1. **JTBD** — what they hire the Brain to do, in their own words
2. **Primary pain** — integration vs. ops vs. analytics vs. optimization
3. **Data sources the Brain must ingest** — POS, ERP, practice mgmt, PMS, OMS, dispute system
4. **Regulatory overlay** — PCI, HIPAA, FERPA, state licensing, MATCH, card-brand rules
5. **Channel relationship** — who "owns" the merchant (Fiserv, bank, ISV, ISO, PayFac)
6. **Monetization ceiling** — what they'd realistically pay per month
7. **Brain telemetry available** — what the Brain can actually see given the channel
8. **Platform stack** — front-end + back-end pairings, with reconciliation requirements

## The combinatorial reality

5 size tiers × 8 channels × 14 verticals × 6 business models × 7 front-end platforms × 7 back-end platforms = **the number doesn't matter because 99% of those cells don't exist in Fiserv's real book**. What matters is that the Brain can handle the actual patterns that show up. In practice:

- **Channel drives the surface** (where the Brain appears, who pays, what it's branded as).
- **Size drives the sophistication** (how much automation vs. how much explanation).
- **Vertical drives the agents + regulatory overlay** (which specialized agents load, which compliance constraints apply).
- **Business model drives the data schema** (what entities the memory graph has to model).
- **Platform drives the ingestion + parser + failure-mode catalog** (which ISO 8583 dialect, which back-ends to reconcile, which front-end surface to embed in).

So the actual product surface is: one Brain platform, five knobs, thousands of merchant configurations that actually exist, millions that don't and never will.

## The beachhead

Four pilots, two launched day-one, one stretch, and one V2-prize:

1. **Mid-market fashion brand** — Mid-Market / Direct + ISV (Shopify) / Retail / Omnichannel + D2C / **CommerceHub + Nashville**
2. **Clover-native SMB restaurant** — SMB / ISV (Clover App Market) / Restaurant / B2C card-present / **Clover + Nashville**
3. **(Stretch)** Community bank SMB cohort — SMB / Bank partner / mixed / B2C card-present / mixed platform
4. **(V2 prize)** Single strategic-QSR brand under Inspire Brands or Yum! — Strategic Global / Direct + Franchise / Restaurant-QSR / B2C+Omnichannel / **IPG (Ucom) + Nashville + (Buypass if fuel)**

These stress-test the full axis matrix: three different channels, three different size tiers, three different front-end platforms, and both primary back-ends. If 1 and 2 land, Brain is real. If 3 lands, bank-channel is real. If 4 lands, the strategic-enterprise revenue line is real.
