# Back-End Platform: Omaha (South) — "South Oceans"

Fiserv's secondary authorization and clearing platform. Originally First Data's "South" platform, historically headquartered in Omaha. Internal shorthand: "South Oceans" — treated here as synonymous with the Omaha-origin South platform. *(If "South Oceans" refers to a distinct platform, update this doc.)*

## Role
- Authorization + clearing, same categories as Nashville
- Serves a shrinking share of Fiserv's merchant base — merchants are migrating toward Nashville over time
- Still load-bearing for specific merchant cohorts, especially legacy strategic accounts and some Optis front-end customers

## What front-ends it powers
- Optis (default — legacy)
- Some legacy CommerceHub merchants (pre-consolidation)
- Some legacy Carat merchants
- A handful of IPG legacy deployments

## Key characteristics
- **Different ISO 8583 dialect than Nashville.** Parser is not interchangeable — Brain must run two parallel parsers.
- **Different decline-code mapping.** Internal codes don't always match Nashville 1:1.
- **Some batch-only flows.** Certain event types are batch-delivered, not streamed.
- **Longer settlement cycles** in some legacy configurations.

## Ingestion priority for the Brain
**Tier 1 for affected merchants, Tier 2 overall.** Build Nashville parser first; Omaha parser second. Any merchant on Omaha must have Brain coverage, but the volume weight is lower than Nashville.

## Brain-relevant quirks
- Merchants migrating from Omaha → Nashville are a unique Brain use case: Brain can be the memory continuity layer across the migration, so the merchant doesn't lose operational history.
- Some Omaha merchants have decades of history that doesn't exist in Nashville — Brain migration-aware ingestion can capture this for the pre-migration period too.
- Settlement reconciliation during migration is a known failure mode that Brain's SettlementAgent should watch for.

## Ambiguity note
"South Oceans" is the user-reported internal term. I've interpreted it as the Omaha/South platform in the absence of another match. If there's a separate platform called "South Oceans" that's distinct from Omaha/South, this doc should be split into two.
