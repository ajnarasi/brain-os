# Back-End Platform: Buypass

Fiserv's petroleum / c-store / fleet-fuel authorization network. Specialty back-end with EMV pump support, fleet card acceptance, and c-store-specific handling that neither Nashville nor Omaha cover natively.

## Role
- Authorization for fuel transactions at gas stations and c-stores
- **Fleet card routing:** Voyager, WEX, Fuelman, Comdata — the fleet cards that general-purpose card networks don't handle cleanly
- **EMV pump support:** outdoor PIN / EMV handling at fuel dispensers (a distinct technical surface from indoor POS)
- **C-store basket integration:** linking the fuel dispense to the in-store basket purchase

## Who uses it
- Petroleum / c-store merchants (MCCs 5541, 5542, 5411-combined)
- Fleet-heavy merchants (transportation, last-mile, trucking c-stores)
- **IPG strategic merchants with fuel-attached locations** (e.g., Costco with fuel islands; 7-Eleven-style c-stores)
- Stand-alone SMB fuel stations

## Key characteristics
- **Fuel-specific ISO 8583 extensions:** DEs for pump number, fuel grade, quantity, price-per-gallon, fleet card controls
- **Pre-authorization + completion pattern:** unlike retail (single auth+capture), fuel uses a pre-auth on card insert → dispense → completion for actual amount
- **Odometer + driver-ID prompts:** fleet cards often require additional prompt data the Brain must model
- **Different settlement cycles** than general retail

## Ingestion priority for the Brain
**Tier 2 for MVP, Tier 1 for any merchant with fuel exposure.** Buypass parser is specialty but critical for the merchants that need it. A Costco or IPG-powered c-store chain is underserved without it.

## Brain-relevant quirks
- Pre-auth amounts differ from final capture amounts for fuel (pump holds vs. actual fuel purchased) — this is not fraud, it's normal, and the Brain must know
- Fleet card controls (e.g., "this card can only buy fuel, not snacks") are MCC-enforced at the pump and generate specific decline codes Brain must recognize
- Brand-specific fleet cards (Voyager, WEX, etc.) have their own authorization networks behind Buypass

## Relationship to other back-ends
- Fuel transactions route via **Buypass**
- In-store basket purchases (at the same c-store) typically route via **Nashville**
- Gift loads at the same merchant route via **ValueLink**
- PIN debit at the same merchant routes via **STAR/NYCE**

A single c-store merchant's Brain must reconcile telemetry from 4+ back-ends — this is part of why Brain coverage for c-store / petroleum is hard and why it matters that the Brain's ingestion layer is platform-aware.
