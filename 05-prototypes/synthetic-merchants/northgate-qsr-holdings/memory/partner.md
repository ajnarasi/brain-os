---
type: partner
merchant: northgate-qsr-holdings
last_reviewed: 2026-04-14
---

# Partner memory — NorthGate QSR Holdings

## Channel (Axis 2)

**Primary channel:** Direct (Fiserv Corporate Sales)
**Secondary consideration:** NorthGate operates as a franchisee group under three different parent-brand franchise agreements (Arby's, BWW, Jimmy John's — all owned by Inspire Brands). This adds a **Franchise hierarchy** layer on top of the direct relationship:

1. **Fiserv corporate** contracts directly with NorthGate (commercial relationship)
2. **Inspire Brands corporate** has its own Fiserv Carat relationship (per the Sep 2023 expansion, cited in `corpus/02-fiserv-general/blogs-press-releases.md` + `corpus/04-merchant-context/strategic-merchants.md`), which shapes some of the technical standards NorthGate must follow
3. **NorthGate** operates the 67 individual locations

So the Brain sees a merchant with a **direct** commercial channel but a **franchise hierarchy** for brand-standard compliance.

### Support routing
- **First line (technical):** Tony Ruiz's IT team (corporate-internal)
- **Second line:** Chris Nguyen (Fiserv Corp TAM) — monthly 1:1 with Dana, 24/7 on-call for P0
- **Third line:** Fiserv solutions engineering (rotating, engaged via Chris)
- **Parent-brand issues:** Routed to Inspire Brands corporate contacts per brand (not Fiserv's responsibility but affects NorthGate ops)
- **Buypass-specific:** via Chris only; NorthGate has no direct Buypass operations contact
- **ValueLink-specific:** via Chris only

### Commercial relationship
- Pays Fiserv directly on a strategic / enterprise custom contract
- Fiserv-branded (internal facing — Dana sees Fiserv's visual identity)
- Not white-labeled
- 5-year contract (started 2023-09-01; renewal 2028-09-01)

## Fiserv Platform (Axis 5)

### Front-end
- **IPG / Connected Commerce (Ucom)** — primary, all 67 locations
  - hashExtended message signature (not HMAC) — see `corpus/01-apis/ucom-ipg.md`
  - Custom enterprise integration with each brand's POS
- **Fiserv SnapPay** — supplier AR/AP, integrated with Oracle ERP Cloud
- **Fiserv Carat** — Inspire Brands' flagship Carat relationship provides some of the platform capabilities NorthGate benefits from

### Back-end (FIVE back-ends — the full complexity)
- **Nashville (North)** — **primary** authorization + clearing for ~94% of NorthGate's total card volume (all QSR side of every brand)
- **Buypass** — fuel authorization at the **4 fuel-attached Arby's** locations (petroleum / fleet fuel). These 4 locations also touch Nashville for their non-fuel QSR sales.
- **STAR / NYCE / Accel** — PIN debit routing at all 67 locations (smaller share; most volume is signature debit + credit + EMV contactless)
- **ValueLink** — gift card authorization for Inspire Brands loyalty programs (Arby's Rewards, BWW Blazin' Rewards, JJ Freaky Fast Rewards). Material volume — Inspire's loyalty programs are heavily gift-card-integrated.
- **TeleCheck** — check acceptance at BWW locations (rare but present; high-ticket private events occasionally pay by check)

### Critical: cross-back-end reconciliation

A single fuel-attached Arby's location's daily transactions span:
- **Nashville** (QSR food + drink purchases — ~80% of the location's volume)
- **Buypass** (fuel purchases — ~15% of the location's volume)
- **STAR/NYCE** (PIN debit across both — ~4%)
- **ValueLink** (gift card purchases + redemptions — ~1%)
- **TeleCheck** (occasional checks at BWW, n/a at Arby's)

The Brain's `SettlementAgent` (conceptual) + `IncidentAgent` must reconcile across ALL FIVE back-ends to give Dana a complete picture of a single location's day. This is NorthGate's signature complexity and is the exact capability the Slice D demo needs to showcase.

### ISO 8583 dialects

The Brain's ingestion must run parallel parsers per back-end:
- Nashville parser for the QSR side
- Buypass parser for fuel (different DEs — pump number, fuel grade, quantity, fleet card controls)
- STAR/NYCE parser for PIN debit
- ValueLink parser for gift card
- TeleCheck parser for check auth

See `corpus/03-industry-standards/iso-8583.md` for standard reference; each back-end has its own dialect documented in the relevant platform doc.

## Data access scope

**Full across all Fiserv back-ends** — NorthGate's direct-channel relationship gives Fiserv complete telemetry across Nashville, Buypass, STAR/NYCE, ValueLink, and TeleCheck. No partner-agreement restrictions.

One nuance: **parent-brand (Inspire Brands) loyalty data** is owned by Inspire corporate, not by NorthGate or Fiserv. The Brain sees the gift-card transaction events but not the underlying loyalty program state.

## Branding

**Fiserv-branded enterprise.** The Brain appears in Dana's corporate dashboard with Fiserv visual identity. No white-label requirement. However, **narratives should reference specific locations by brand + location identifier** ("Arby's location 23 in Macon, GA") — not use Fiserv-centric terminology that obscures the brand reality.

## Autonomy envelope

**LOW — corporate change-control is absolute.**

| Action class | Default gate |
|---|---|
| Read-only retrieval, narratives, reports | None |
| Draft incident narrative | None (read-only) |
| Suggest a fraud rule change | None (suggestion) |
| Apply a fraud rule change | **Required — Tony's IT review + Dana's PM sign-off** |
| Draft a dispute response | None (draft only) |
| Submit a dispute response | **Required — Dana approval** |
| Suggest an integration change | None (suggestion) |
| Apply an integration change | **Absolute — IT governance review + change advisory board** |
| Contract or commercial action | **Absolute — Rachel Stern sign-off required** |
| Escalate to TAM | None — Brain can suggest "want me to loop in Chris?" at any time |

The philosophy: **the Brain is narrative + leverage, not actor.** At NorthGate's scale, the cost of a bad autonomous action is enormous ("the Brain pushed a fraud rule change that broke 47 Arby's locations during lunch rush" = career-ending). Autonomy is deliberately constrained.

## Escalation path

1. **Brain** answers → Dana acts (or routes to Tony / Rachel / Marcus / regional ops)
2. **Tony Ruiz (internal)** — for technical questions the Brain can't answer
3. **Chris Nguyen (Fiserv Corp TAM)** — for Fiserv-side escalation, monthly 1:1 with Dana, 24/7 on P0
4. **Fiserv solutions engineering** — via Chris
5. **Fiserv Carat product team** — via Chris; for Carat-specific questions only
6. **Rachel Stern (CFO, internal)** — for financially-material decisions

## Freshness

- Channel + platform facts: **stable** — event-driven changes only (e.g., acquiring a new location, changing a back-end)
- Last verified: 2026-04-14
- Next review: on contract amendment, major platform change, or acquisition of additional locations
