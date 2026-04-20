# Vertical: Hospitality & Travel

Sub-verticals: hotels, OTAs, airlines, car rental, cruises, vacation rentals, tour operators.

## Characteristic pain
Incremental auth (hold then capture), delayed capture state tracking, high chargeback rate (friendly fraud, "didn't stay" disputes), IATA/BSP compliance for airlines, dynamic pricing reconciliation, cross-border settlement.

## Brain-relevant data sources
PMS (property management system), GDS (global distribution system), reservation systems, settlement, dispute, card-brand travel MCC rules.

## Regulatory overlay
PCI, IATA/BSP for airlines, ATOL/ABTA in some markets, delayed-capture rules.

## Vertical-specific Brain capabilities
- **Incremental auth orchestration:** track hold/release/capture state across multi-day bookings
- **Delayed capture state tracking:** know which auths are pending capture, which have aged out
- **Travel-specific chargeback defense:** templates tuned for "no-show," "dissatisfied," "booking error"
- **Multi-party payout reconciliation:** for OTAs and vacation rentals

## MVP fit
Not in MVP. High complexity, specialized data sources, smaller Fiserv footprint.

## Monetization ceiling
Mid-market to enterprise. Willing to pay well for chargeback-defense automation (disputes are their biggest ops cost).
