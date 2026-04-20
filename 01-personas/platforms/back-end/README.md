# Back-End Authorization / Clearing Platforms

The processing pipes underneath Fiserv's front-end commerce platforms. Merchants never see these directly — they see Clover / CommerceHub / IPG / Carat — but the back-ends determine what telemetry the Brain can ingest, what ISO 8583 dialects to parse, and which decline-code mappings apply.

## Platforms covered
- `nashville-north.md` — primary authorization + clearing (First Data North legacy)
- `omaha-south.md` — secondary authorization + clearing (First Data South / "South Oceans")
- `buypass.md` — petroleum / c-store / fleet fuel authorization
- `star-nyce.md` — PIN debit networks (Fiserv-owned)
- `telecheck.md` — check authorization and verification

## Not yet documented
- `valuelink.md` — gift card authorization and settlement (open + closed loop)
- `cardnet.md` — legacy international (limited ongoing investment)
- `forte-ach.md` — ACH origination
- `zelle-disbursement.md` — real-time payouts (not strictly merchant auth, but relevant for mobility / gig merchants)

## Cross-platform reconciliation

A single merchant's transactions can span 3–5 back-ends simultaneously. A c-store with:
- Fuel at the pump → **Buypass**
- In-store credit purchases → **Nashville**
- PIN debit purchases → **STAR/NYCE**
- Gift-card loads → **ValueLink**
- Occasional checks → **TeleCheck**

…has five back-ends to reconcile. The Brain's ingestion layer must handle this and the SettlementAgent must reconcile across all of them to give an accurate "what settled today" narrative.
