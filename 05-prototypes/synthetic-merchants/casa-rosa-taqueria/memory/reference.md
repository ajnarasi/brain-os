---
type: reference
merchant: casa-rosa-taqueria
last_reviewed: 2026-04-14
---

# Reference memory — Casa Rosa Taqueria

## Fiserv / Clover product docs (corpus)
- **Clover platform** — `corpus/01-apis/clover.md`. Primary reference for any POS, app, or webhook question. Clover REST + Android SDK + Ecommerce + OAuth 2.0 v2 with PKCE.
- **Clover case studies and reviews** — `corpus/04-merchant-context/clover-merchants.md`. Referenced for benchmarking against similar Clover SMB restaurants.

## Industry standards (corpus)
- **PCI DSS 4.0** — `corpus/03-industry-standards/pci-dss.md`. Casa Rosa is a **Level 4 merchant** (<$20K CNP). SAQ C applies (POS + Clover-managed). Relevant if Maria ever asks about compliance drift.
- **ISO 8583 decline codes** — `corpus/03-industry-standards/iso-8583.md`. Referenced when interpreting why a card declined (in owner-friendly language, not the code itself).

## External / vendor docs (NOT in corpus — flag as research gap if needed)
- **DoorDash Drive API / Clover integration** — relevant for the dispute template. Currently referenced only through `feedback.md#doordash-not-received-template`.
- **Uber Eats Connect / Clover integration** — similar.
- **Grubhub Marketplace / Clover integration** — similar.
- **Clover Rewards documentation** — for `proj-loyalty-clover-rewards`. Live at clover.com/help, not in corpus.
- **Clover Online Ordering catering config** — for `proj-catering-online-ordering`. Live at clover.com/help.

## Clover support contacts
- **Clover Merchant Support** — primary escalation for any hardware or platform issue
- **No named TAM** (SMB tier doesn't have a dedicated TAM — served through Clover's general support tier)

## Benchmarking cohort (for AnalyticsAgent)
- Cluster: **SMB Mexican / fast-casual restaurants, 1–5 locations, Clover-native, delivery-aggregator presence**
- Public benchmark source: `corpus/04-merchant-context/clover-merchants.md` + `corpus/04-merchant-context/industry-risk.md`

## Internal runbooks (merchant-owned — synthetic, don't exist in demo)
- `opening-checklist.md` — Maria's daily open routine including the Flex pre-shift check (per `feedback.md#friday-dinner-rush-terminal-reboot`)
- `closing-checklist.md` — Maria's daily close routine
- `firmware-update-morning.md` — Luis's morning reboot routine after overnight updates

## Freshness notes
- Corpus files: collected 2026-04-14, reliability high for Clover and standards
- Delivery aggregator API docs: **not ingested** — flag for corpus refresh if DoorDash questions pile up
- Clover Rewards specific docs: **not ingested** — will need for `proj-loyalty-clover-rewards` decision

## Language preference

When retrieving and responding, always translate to **owner-language**. Maria doesn't want to read "ISO 8583 DE39 response code `51`" — she wants to read "the card was declined because there wasn't enough money in the account." Technical-accurate, plain English.
