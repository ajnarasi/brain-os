# Back-End Platform: STAR / NYCE / Accel (PIN Debit Networks)

Fiserv's owned PIN debit networks. A parallel authorization path to Nashville/Omaha — PIN debit traffic doesn't flow through the same pipes as signature debit or credit.

## Role
- PIN debit authorization and clearing
- PINless debit capabilities (for CNP merchants that can still route as debit)
- Competes with Interlink, Maestro, Pulse, and other PIN debit networks

## Who uses it
- Any merchant with in-store POS that accepts PIN debit (most of them)
- E-commerce merchants using PINless debit for lower-cost routing
- Mid-market and enterprise merchants specifically optimizing interchange

## Key characteristics
- **Different ISO 8583 variant** from Nashville/Omaha
- **Lower interchange** than signature debit or credit — a major cost lever for high-volume merchants
- **Routing decisions** happen at the merchant/gateway level: which PIN network to route to (Fiserv's STAR/NYCE vs. competitors) affects interchange cost
- **PINless debit** — same network, different auth path, CNP-capable

## Ingestion priority for the Brain
**Tier 2.** Relevant for OptimizationAgent (routing decisions) and for merchants where PIN debit is a meaningful share of volume. Not required for merchants that are credit-dominated.

## Brain-relevant use cases
- **Routing optimization:** "merchants like you route their PIN debit to X network and save 8 bps — want to switch?"
- **PINless debit capture:** for subscription + recurring merchants, PINless debit can significantly lower costs; the Brain should surface this opportunity
- **Decline reason translation:** STAR/NYCE decline codes are different from card-network codes; translation required
