# Vertical: Restaurant & Food

Sub-verticals: QSR, fast casual, full-service restaurants, bars/nightlife, coffee shops, ghost kitchens, catering, food trucks.

## Characteristic pain
Tips and tip handling, delivery aggregator chargebacks, daily close reconciliation, shift-level ops, PCI drift at the POS, staff turnover losing tribal knowledge, fraud/dispute from delivery partners, liquor licensing rules.

## Brain-relevant data sources
POS (Clover, Toast, Square for non-Fiserv), delivery aggregator APIs (DoorDash, Uber Eats, Grubhub), settlement, dispute, labor scheduling.

## Regulatory overlay
PCI, liquor licensing (state), tip reporting requirements.

## Vertical-specific Brain capabilities
- **Tip reconciliation:** handle card tips, tip-out distribution, tip reporting
- **Delivery chargeback defense:** specific templates for aggregator-originated disputes
- **Daily close narrative:** end-of-day plain-English summary
- **Shift-level analytics:** per-shift revenue, tips, labor cost
- **PCI drift monitoring:** POS update / config drift that could break PCI scope
- **"Staff leaves, brain remembers":** capture operational knowledge in memory so the next closer can run it

## MVP fit
**Slice B beachhead.** Clover-native SMB restaurants are the distribution pilot. See `04-prd/mvp-scope.md`.

## Monetization ceiling
Micro/SMB: $0–$49/mo per location. Volume play — the math only works if install rate is high. Clover App Market is the distribution lever.
