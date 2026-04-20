# System Overview

The Fiserv Brain is a layered system. This doc is the one-page architectural summary; the other files in `03-architecture/` go deeper on specific layers.

## The seven layers

```
┌─────────────────────────────────────────────────────────────────┐
│  7. Surface Layer                                                │
│     Fiserv portal  |  Clover app  |  Bank portal (white-label)  │
│     ISV embed      |  Slack/Teams |  API (for PayFacs / ent.)   │
└─────────────────────────────────────────────────────────────────┘
                               ▲
┌─────────────────────────────────────────────────────────────────┐
│  6. Orchestration Layer                                          │
│     Lifecycle router (Integrate / Go-Live / Operate)             │
│     Agent selector · Channel-aware policy · H-I-L gates         │
└─────────────────────────────────────────────────────────────────┘
                               ▲
┌─────────────────────────────────────────────────────────────────┐
│  5. Agent Layer (skill / tool use)                               │
│     DocsAgent  IntegrationAgent  CertAgent  LaunchAgent         │
│     OpsAgent   TicketAgent  DisputeAgent  FraudTuningAgent      │
│     AnalyticsAgent  OptimizationAgent  SettlementAgent          │
│     RetryAgent  IncidentAgent  APMAgent (leverages APM SDK)     │
└─────────────────────────────────────────────────────────────────┘
                               ▲
┌─────────────────────────────────────────────────────────────────┐
│  4. Retrieval / RAG Layer                                        │
│     Hybrid: lexical (API refs) + vector (unstructured KB)       │
│     + graph traversal (entity relationships)                     │
└─────────────────────────────────────────────────────────────────┘
                               ▲
┌─────────────────────────────────────────────────────────────────┐
│  3. Memory Store                                                 │
│     Per-merchant memory (5 types: user, feedback, project,       │
│     reference, partner) · Vector DB · Structured profile        │
│     Writable by merchant · Freshness-aware · Access-controlled   │
└─────────────────────────────────────────────────────────────────┘
                               ▲
┌─────────────────────────────────────────────────────────────────┐
│  2. Knowledge Graph                                              │
│     Entities: Merchant, MID, Terminal, Product, Transaction,    │
│     Incident, Runbook, ContractTier, Partner, Channel,          │
│     SubMerchant, Location, Customer, Dispute, Settlement        │
└─────────────────────────────────────────────────────────────────┘
                               ▲
┌─────────────────────────────────────────────────────────────────┐
│  1. Ingestion Layer (platform-aware)                             │
│     Front-ends: Clover · CommerceHub · IPG (Ucom) · Carat ·     │
│                 Optis · Payeezy · AccessOne                      │
│     Back-ends:  Nashville (North) · Omaha (South) · Buypass ·   │
│                 STAR/NYCE/Accel · TeleCheck · ValueLink          │
│     Plus: Dispute system · Settlement · KB · TAM CRM ·          │
│           Runbooks · Contracts · Partner + Platform configs     │
│     Per-platform ISO 8583 parsers run in parallel               │
└─────────────────────────────────────────────────────────────────┘
```

## Layer-by-layer summary

### Layer 1 — Ingestion (platform-aware)
Pulls from every Fiserv system that matters, normalizes into a canonical event model. **Platform-aware by design**: each merchant's front-end commerce platform (Clover / CommerceHub / IPG / Carat / Optis / …) and back-end authorization/clearing platform(s) (Nashville / Omaha / Buypass / STAR-NYCE / TeleCheck / ValueLink / …) drive which parsers and which ingestion pipelines run for them. A single merchant — especially an IPG-tier strategic merchant or a c-store — can span 4–5 back-ends simultaneously, and ingestion must reconcile across all of them. Must handle both batch (KB docs, contracts, runbooks) and stream (ISO 8583 messages in multiple dialects, dispute events, settlement reconciliation). Data residency + PII scoping (PCI, HIPAA) enforced at ingest time.

### Layer 2 — Knowledge Graph
Canonical entity model. The Brain's "understanding of the world." A Merchant has N MIDs, belongs to M locations, processes through a Channel under a Partner, owns a Product Stack, runs on a ContractTier, etc. Graph lets the Brain answer "what's connected to what" questions that flat docs can't.

### Layer 3 — Memory Store
Per-merchant memory split into 5 types:
1. **User memory** — merchant profile, roles, preferences
2. **Feedback memory** — "we tried X, it failed, workaround is Y"
3. **Project memory** — in-flight initiatives
4. **Reference memory** — pointers to Fiserv KB + external resources
5. **Partner memory** — channel relationship (who owns, data restrictions, surface, branding)

Memory must be writable by the merchant and freshness-tracked. See `memory-layers.md`.

### Layer 4 — Retrieval / RAG
Hybrid retrieval:
- **Lexical** for exact API references (processor specs, ISO 8583 DE maps, runbook IDs)
- **Vector** for unstructured KB + prior TAM notes + support ticket history
- **Graph traversal** for "what connects to what" queries
- Answers are always grounded to a citation — no un-sourced claims.

### Layer 5 — Agents
Specialized agents per lifecycle phase and per domain. Each agent has:
- A system prompt scoped to its job
- A set of tools it can use (read-only by default, action-capable with human-in-loop gates)
- Memory read/write permissions
- An "autonomy level" per merchant (set during onboarding, upgradable with trust)

See `agent-topology.md`.

### Layer 6 — Orchestration
Routes incoming requests to the right agent(s), applies channel-aware policy (a bank-channel merchant gets a different agent loadout than a direct merchant), enforces human-in-loop gates for financially material actions, and manages conversation state across multi-turn interactions.

### Layer 7 — Surface
Where the merchant actually sees the Brain:
- **Fiserv merchant portal** — primary surface for direct merchants
- **Clover app** — embedded for Clover-ISV merchants
- **Bank merchant portal (white-label)** — for bank-channel merchants
- **ISV embed** — iframe or native integration inside an ISV's product
- **Slack / Teams** — for ops teams that live in chat
- **API** — for PayFacs, enterprise, and partners building their own surfaces

## Non-negotiable design principles

1. **Channel-aware from day 1.** Every layer knows which channel a merchant belongs to and adjusts behavior accordingly.
2. **Memory is writable.** If the Brain is wrong and the merchant corrects it, the correction sticks.
3. **Memory decays.** Stale memory is auto-flagged, not silently served.
4. **Every action is reversible.** Human-in-loop gates until per-merchant trust is earned.
5. **Every recommendation cites its source.** No black-box answers.
6. **No cross-merchant data leakage.** Global feedback memory is anonymized + reviewed before broad use.
7. **Regulated data stays in its lane.** HIPAA-scoped memory doesn't leak into general retrieval; PCI-scoped data never enters the Brain except as tokenized references.

## What this system is NOT

- Not a monolith. Every layer is independently replaceable.
- Not a LLM wrapper. The models are at Layer 5; Layers 1–4 are Fiserv-specific infrastructure.
- Not a chatbot. The chat surface is one of several; the API is first-class.
- Not cloud-agnostic. Starts on Fiserv's own cloud stack to minimize data-movement and compliance surface.

## Build order (priority stack)

1. Ingestion + Knowledge Graph + Memory Store (Layer 1–3) — the data substrate
2. Retrieval (Layer 4) — makes it queryable
3. DocsAgent + IntegrationAgent (minimal Layer 5) — first real product use case
4. Orchestration (Layer 6) — ties it together
5. Fiserv portal + Clover app surfaces (Layer 7) — first merchant contact
6. Then expand the agent catalog one lifecycle phase at a time
