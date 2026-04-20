# Back-End Platform: TeleCheck

Fiserv's check authorization and verification service. Still material for specific verticals despite check volume declining overall.

## Role
- Check authorization at point of sale (real-time decisioning on whether to accept a check)
- Check verification (is this account valid?)
- Returned-check recovery

## Who uses it
- **Grocery** — check acceptance is still common in grocery, especially regionally
- **Big-box retail** — Costco historically; some department stores
- **Government / utility** — taxes, utility bills, court fees paid by check
- **B2B wholesale** — some legacy B2B merchants
- **Automotive / home services** — larger-ticket purchases sometimes paid by check

## Key characteristics
- **Separate data pipe** from card transactions — TeleCheck events are not on the card-network ISO 8583 bus
- **Different fraud signals** — check fraud is a different domain than card fraud
- **Declining relative share** but still material in specific merchant types

## Ingestion priority for the Brain
**Tier 3 — merchant-specific.** Most merchants don't touch TeleCheck. For those that do (grocery, big-box, some IPG-tier merchants), Brain must ingest it. Otherwise skip.

## Brain-relevant use cases
- **Check fraud narratives** — separate from card fraud narratives
- **Recovery ops** — returned check recovery is a real ops line for some merchants
- **Channel optimization** — "you're accepting checks at 4% of your grocery volume; the opportunity cost of card acceptance is X"
