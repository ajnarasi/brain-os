# Verticals — MCC Cluster Map

14 clusters covering the practical universe of Fiserv merchants. Each cluster maps to a set of MCCs, a set of regulatory constraints, a set of typical data sources the Brain needs to ingest, and a set of vertical-specific agents or playbooks.

## The 14 clusters

| # | Cluster | Representative MCCs | Primary data sources | Top regulatory overlays | Vertical-specific Brain capabilities |
|---|---|---|---|---|---|
| 1 | **Retail & Commerce** | 5411, 5651, 5691, 5712, 5722, 5732, 5812-no (non-food retail) | POS, OMS, inventory, e-com platform | PCI | Inventory-aware fraud, return narratives, BOPIS reconciliation, APM-per-geo |
| 2 | **Restaurant & Food** | 5812, 5813, 5814 | POS (Clover, Toast, Square), delivery aggregator APIs | PCI, liquor licensing | Tip handling, delivery chargeback defense, daily close narrative, shift-level analytics |
| 3 | **Hospitality & Travel** | 3000–3999 (airlines), 7011 (hotels), 3351–3441 (car rental), 4411 (cruises), 7012 (vacation rentals), 4722 (OTAs) | PMS, GDS, reservation systems | IATA/BSP, delayed-capture rules, card-brand travel MCC rules | Incremental auth orchestration, delayed-capture state tracking, high-chargeback defense |
| 4 | **Healthcare** | 8011 (physicians), 8021 (dentists), 8031 (osteopaths), 8041 (chiropractors), 8042 (optometrists), 8043 (opticians), 8049 (podiatrists), 8050 (nursing), 8062 (hospitals), 8071 (medical labs), 8099 (medical services), 5912 (pharmacy), 5976 (vet) | EHR, practice management, billing clearinghouse | HIPAA, HSA/FSA card handling, insurance adjudication | HIPAA-scoped memory, copay workflow, HSA/FSA tokenization, patient-balance dunning |
| 5 | **Professional Services** | 8111 (legal), 8931 (accounting), 7392 (consulting), 6513 (real estate), 7011+PM (property mgmt), 6300 (insurance), 7361 (staffing) | Practice mgmt, billing, CRM | Trust account rules, surcharging, Level-2 | Trust account reconciliation, retainer dunning, Level-2 data enrichment |
| 6 | **Personal Services** | 7230 (salons/spas), 7298 (spas), 7991/7997 (fitness), 0742 (vet), 7538 (auto), 7623/7629/1711 (home services), 7216 (dry cleaning) | Booking systems, membership CRMs | PCI, gratuity handling, recurring payment rules | Booking integration, gratuity split, membership dunning, "staff leaves, brain remembers" |
| 7 | **Education** | 8211 (K-12), 8220 (higher ed), 8351 (childcare), 8299 (tutoring), 5968 (EdTech) | SIS, LMS, tuition mgmt | FERPA, PCI, convenience fee rules | Tuition plan dunning, convenience fee calc, student-payer workflows |
| 8 | **Nonprofit & Faith** | 8398 (charities), 8661 (religious orgs), 8651 (political orgs) | Donor CRM (Blackbaud, etc.) | Donor privacy, campaign finance, 501(c) reporting | Donor recurring giving, campaign-cycle analytics, giving-day ops brain |
| 9 | **Government & Public** | 9399 (govt svcs), 9211 (court costs), 9222 (fines), 9311 (taxes), 9402 (postal), 4111 (transit), 4784 (tolls) | Govt ERPs, utility billing | Level-3 data, convenience fees, public records | Level-3 enrichment, convenience-fee arithmetic, public-audit trail |
| 10 | **B2B & Wholesale** | 5039 (construction materials), 5065 (electrical), 5072 (hardware), 5099 (durable goods), 5111 (stationery), 5200 (home supply), 5511 (auto dealers), 5541 (service stations), 5599 (auto/vehicle), 5712–5999 (wholesale) | ERP (SAP, NetSuite), AR, EDI | Level 2/3 data rules, purchasing card rules, NACHA for ACH | Level 2/3 enrichment, NET terms dunning, purchasing card acceptance, ACH orchestration |
| 11 | **Digital & Subscription** | 5815 (digital goods), 7372 (software), 4899 (streaming), 7995 (gaming, where allowed) | SaaS billing, subscription mgmt | Account updater, global tax, App Store rules | Dunning optimization, account updater orchestration, churn narrative, MRR analytics |
| 12 | **Financial & Regulated** | 6012 (financial), 6051 (non-fi money orders), 6540 (funds transfer), 7995 (iGaming where allowed), 7273 (dating, adjacent) | Core banking, lending LOS, KYC providers | KYC/AML, state licensing, NMLS, FinCEN MSB | KYC orchestration, state-license state tracking, NMLS compliance |
| 13 | **Transportation & Mobility** | 4111 (transit), 4121 (taxi/limo), 4214 (freight), 4131 (bus), 7523 (parking) | Dispatch systems, telematics, EV charging networks | Incremental auth, multi-party payout, real-time disbursement rules | Incremental auth state, driver payout orchestration, EV charging settlement |
| 14 | **High-Risk / Specialty** | 5993 (cigar/tobacco), 5933 (pawn), 5912-CBD (cannabis/CBD where allowed), 5722 (firearms retail), 5122 (drugs/nutraceuticals) | Varies | MATCH list risk, elevated reserves, limited card-brand access, state cannabis rules | High-risk reserve tracking, alternative-rail routing, MATCH-risk monitoring |

## Why clusters, not flat MCC list

MCC is too granular for segment-level product thinking (there are ~700 MCCs). Vertical clusters group MCCs that share:
- Data sources
- Regulatory constraints
- Typical Fiserv product footprint
- The agents the Brain needs to run for them

A merchant can belong to multiple clusters — a pharmacy chain is both Retail & Commerce and Healthcare; a country club is both Hospitality and Personal Services. The Brain handles this by tagging merchants with all applicable clusters and loading the union of agents + compliance constraints.

## Per-cluster detail

See the individual `.md` files in this folder for per-cluster deeper dives (JTBD, pain points, data sources, Brain capabilities, monetization ceiling).
