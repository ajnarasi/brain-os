# Back-End Platform: Nashville (North)

Fiserv's primary authorization and clearing platform. Originally First Data's "North" platform, built in Nashville (hence the internal name). Handles the vast majority of Fiserv's merchant transaction volume across all front-end commerce platforms.

## Role
- **Authorization:** real-time decisioning for credit + signature debit transactions
- **Clearing:** end-of-day clearing file generation to card networks
- **Settlement:** origination of settlement files to merchant banks
- **ISO 8583 message bus:** the canonical message format the Brain must parse

## What front-ends it powers
- Clover (default)
- CommerceHub (default)
- IPG (Ucom) (default)
- Carat (default)
- Payeezy (default)
- Most others

## Key characteristics
- **ISO 8583 dialect:** Fiserv extensions on top of standard ISO 8583. Several DE (Data Element) positions carry Fiserv-specific meaning. The Brain's SandboxAgent / DocsAgent must parse this dialect natively.
- **Near-real-time telemetry:** Nashville message bus exposes txn events with sub-second latency
- **Huge scale:** thousands of transactions per second at peak (BFCM, Super Bowl, etc.)
- **Custom decline reasons:** Nashville has internal decline codes not present in raw card-network specs; Brain's diagnostic agents must know the mapping

## Ingestion priority for the Brain
**Tier 1 must-have.** The Brain is useless for most merchants without Nashville telemetry. First ingestion pipeline to build, first parser to harden.

## Data the Brain can pull from Nashville
- Individual authorization requests + responses
- Full ISO 8583 message with all DEs
- Decline reason (card brand + Fiserv internal)
- Latency breakdown (merchant → Fiserv → card network → back)
- Settlement batch references
- Chargeback and representment events

## Data the Brain CANNOT pull from Nashville
- Merchant-side fulfillment data (not a Nashville concern)
- Customer-level PII beyond what's in the txn (nothing — PCI scope)
- Cross-merchant aggregates (those are computed on top, not from Nashville itself)

## Brain-relevant quirks
- **Settlement cutoffs** are timezone-specific and affect "what settled today" queries
- **Chargeback lifecycle** has distinct states Brain's DisputeAgent must track
- **Retry semantics** — Nashville has its own retry logic; Brain's RetryAgent must coordinate rather than duplicate
