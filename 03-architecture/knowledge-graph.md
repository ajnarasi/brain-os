# Knowledge Graph

The Brain's canonical entity model. Everything the Brain "understands about the world" is a node or edge in this graph.

## Top-level entities

| Entity | Description |
|---|---|
| **Merchant** | Legal entity boarded with Fiserv |
| **MID** | Merchant Identifier (a merchant can have many) |
| **Location** | Physical or logical store / outlet |
| **Terminal** | Physical POS device or logical endpoint |
| **Product** | Fiserv product enabled for this merchant (CommerceHub, Clover, Carat, etc.) |
| **Transaction** | A single payment attempt |
| **Dispute** | A chargeback or inquiry on a transaction |
| **Settlement** | A funds settlement to the merchant |
| **Customer** | End consumer (where merchant shares this data) |
| **Sub-Merchant** | For marketplace / PayFac models |
| **Incident** | A named operational event affecting the merchant |
| **Runbook** | A Fiserv-maintained procedure the Brain can reference |
| **ContractTier** | The merchant's commercial relationship with Fiserv |
| **Partner** | The channel entity (bank, ISV, ISO, PayFac, marketplace, franchisor) |
| **Channel** | The channel type (direct / bank / ISV / etc.) |
| **Vertical** | The merchant's MCC cluster |
| **BusinessModel** | B2C / B2B / marketplace / subscription / omnichannel / MOTO |

## Key relationships

```
Partner ─[owns-relationship-with]→ Merchant
Merchant ─[has]→ MID ─[maps-to]→ Location ─[contains]→ Terminal
Merchant ─[operates-in]→ Vertical
Merchant ─[uses]→ BusinessModel
Merchant ─[boarded-through]→ Channel
Merchant ─[consumes]→ Product
Merchant ─[originates]→ Transaction
Transaction ─[may-trigger]→ Dispute
Transaction ─[aggregates-into]→ Settlement
Incident ─[affects]→ Merchant
Runbook ─[remediates]→ Incident
```

## Why a graph, not flat tables

Two reasons:
1. **"What's connected to what" queries** are native — "what incidents affected merchants sharing this terminal model last month?"
2. **Agents reason over paths** — an agent looking at a transaction can walk to the merchant, to the channel, to the partner, to the applicable runbook, without the orchestration layer managing the joins.

## Extension points

- **Per-vertical subgraphs** (healthcare adds: Patient, Claim, Adjudication, HSA; B2B adds: Customer-Business, Invoice, PO)
- **Per-channel subgraphs** (bank adds: BankBranch, BankRM; marketplace adds: Sub-Merchant)

## What's not in the graph

- PII beyond minimum required (PAN, CVV never)
- Transient transaction state (pending, in-flight — lives in the live txn system, not the graph)
- Conversational state (lives in session state)

## Storage

Graph layer uses a property graph (e.g., Neo4j or Neptune) for relationship queries, paired with Postgres for transactional source of truth and a columnar store for analytics. Memory store (see `memory-layers.md`) references graph nodes by ID.
