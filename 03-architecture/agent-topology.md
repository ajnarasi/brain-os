# Agent Topology

The agents are the "skill layer" that turns the Brain from a RAG demo into a product that takes action. This doc enumerates the agent catalog, their jobs, their tools, their human-in-loop gates, and how they compose.

## Design principles

1. **Narrow agents beat wide agents.** One agent per job. Each agent has a tight system prompt and a small, auditable tool set.
2. **Read-only by default, action on demand.** Agents start in "suggest mode." Action capability is unlocked per merchant over time as trust builds.
3. **Every action is reversible.** No agent ships an irreversible action without an explicit human approval, always.
4. **Every action writes to feedback memory.** The Brain learns from its own actions.
5. **Channel-aware loadout.** Which agents run for a merchant depends on their channel (some channels restrict certain actions).

## The agent catalog

### Lifecycle: Integrate

| Agent | Job | Key tools | H-I-L gate |
|---|---|---|---|
| **DocsAgent** | Answers technical questions from Fiserv KB + merchant feedback memory | KB retrieval, memory read | None (read-only) |
| **IntegrationAgent** | Walks a merchant dev team through an integration path tailored to their stack + channel | KB, memory, integration-path planner | None |
| **SandboxAgent** | Runs test transactions in the merchant's sandbox, interprets ISO 8583 responses, diagnoses failures | Sandbox txn API, ISO 8583 parser, memory | None (sandbox) |
| **CertAgent** | Pre-runs cert scripts, flags failures, explains fixes | Cert script runner, KB, memory | None (sandbox) |

### Lifecycle: Go-Live

| Agent | Job | Key tools | H-I-L gate |
|---|---|---|---|
| **LaunchAgent** | Orchestrates pre-launch checklist, cutover watch, stability declaration | Merchant config, KB, memory, all sub-agents | Required for any production config change |
| **AnomalyAgent** | Continuous statistical + comparative anomaly detection | Txn stream, metric store, comparable-merchant index | None (read-only alerts) |
| **FraudTuningAgent** | Initial fraud threshold tuning from sandbox patterns | Fraud rule API, sandbox history, risk envelope | Required for any threshold change |
| **SettlementAgent** | Verifies settlement flows, catches discrepancies in first cycles | Settlement system, banking rec, memory | Required for any settlement action |
| **EscalationAgent** | Decides when to wake up a human (TAM or merchant) | All of the above + paging system | None (it's the gate for others) |
| **RetroAgent** | Generates structured launch retrospectives | Memory, event log, metric store | None |

### Lifecycle: Operate

| Agent | Job | Key tools | H-I-L gate |
|---|---|---|---|
| **TicketAgent** | Deflects support tickets with merchant-specific context | KB, memory, txn query, ticket system (read) | Optional — can open tickets with approval |
| **IncidentAgent** | Continuous anomaly detection + narrative incident reports | Metric store, comparable-merchant index, memory | None (detection); optional for remediation |
| **AnalyticsAgent** | Generates weekly/monthly plain-English business narratives | Analytics store, memory | None |
| **OptimizationAgent** | Benchmarks against comparable merchants, surfaces specific opportunities | Comparable-merchant index, routing API (read), interchange tables | Required for any optimization action |
| **DisputeAgent** | Drafts dispute responses using merchant context + historical win rates | Dispute system, memory, template library | Required to submit (draft is auto) |
| **FraudTuningAgent (ops mode)** | Continuously tunes fraud rules within merchant's risk envelope | Fraud rule API, txn history, memory | Required for any change above small delta |
| **RetryAgent** | Decides which declines are worth retrying, when, and how | Txn API, decline-reason DB, memory | None inside pre-approved retry envelope |
| **SettlementAgent (ops mode)** | Watches settlement, catches variances, reconciles | Settlement API, banking rec, memory | Required for any adjustment |
| **APMAgent** | Recommends and configures alternative payment methods per geo; leverages the APM Checkout SDK | APM SDK, country-specific APM rules, memory | Required for any rollout |

### Cross-lifecycle

| Agent | Job | Key tools | H-I-L gate |
|---|---|---|---|
| **MemoryWriter** | Captures candidate memory updates, surfaces them for merchant approval | Memory write API, event log | Required for persistent writes |
| **ComplianceAgent** | Watches for PCI / HIPAA / data-residency / partner-agreement violations | Policy store, event log, regulated-data index | Blocks any action that would violate policy |
| **EscalationAgent** | Decides when human beats brain, routes to correct human per channel | Paging system, partner contact DB, memory | (is itself the gate) |

## Agent composition pattern

The orchestration layer composes agents into *plays* for specific merchant interactions. Examples:

- **"Merchant opens a ticket about a declined txn"** → TicketAgent asks DocsAgent, reads the txn, cites the decline reason. If Retry would help, offers the merchant RetryAgent. If fraud rule change would help, routes to FraudTuningAgent (which requires H-I-L).

- **"Merchant's auth rate drops at 9pm"** → IncidentAgent detects, narrates the incident, hands to OpsAgent. OpsAgent diagnoses (issuer? BIN? fraud rule? merchant-side fulfillment?), suggests a fix, routes to the relevant agent (FraudTuningAgent, RetryAgent, or EscalationAgent).

- **"It's Monday morning"** → AnalyticsAgent assembles the weekly narrative using the past 7 days of metrics, memory, and any incidents. OptimizationAgent appends 2–3 suggestions. MemoryWriter flags any candidate memory updates for the week.

## Human-in-loop architecture

Three gate types:

1. **Autonomous** — agent acts without asking. Used only for read-only actions, sandbox actions, and explicitly pre-approved low-risk operations (like retrying a declined txn within an envelope the merchant set).
2. **Confirm** — agent drafts an action and asks the merchant to approve in one click. Default for most write actions.
3. **Escalate** — agent can't confidently act; routes to a human (TAM, support, or merchant ops lead depending on channel).

Every action logs to an audit trail. Every action is reversible (either automatically or with a documented rollback procedure).

## Channel-aware loadout

| Channel | Full catalog? | Notable restrictions |
|---|---|---|
| Direct | Yes | None |
| Clover ISV | Yes | Some actions restricted to Clover API surface |
| Other ISVs | Yes | Actions limited to ISV's exposed APIs |
| Bank partner | Partial | Some data-access restrictions; escalation goes to bank TAM not Fiserv TAM |
| ISO | Partial | Limited by ISO's data agreement; escalation to ISO |
| PayFac | API-only | No UI agents; everything exposed via API |
| Marketplace | Platform-scoped | Some agents run at sub-merchant level, some at platform level |
| Franchise | Hierarchical | Analytics agents roll up to corporate; ops agents run per location |

## Trust & autonomy progression

A new merchant starts at autonomy level 1 (everything is Confirm or Escalate). Over time, for agents that have demonstrated reliability:

- **Level 1** (day 0) — everything requires confirm
- **Level 2** (after ~2 weeks of consistent accuracy) — small-delta optimizations can run autonomous
- **Level 3** (after ~2 months) — full optimization envelope autonomous
- **Level 4** (mature + explicit opt-in) — agent can act on incidents without pre-approval, within scope

Merchants set the max autonomy level per agent. The Brain never silently upgrades itself.

## What's NOT an agent

- Data ingestion → that's Layer 1
- Retrieval → that's Layer 4 (agents consume retrieval; they don't own it)
- Memory writes → agents submit candidates; MemoryWriter is the single write path
- User auth → outside the Brain entirely
