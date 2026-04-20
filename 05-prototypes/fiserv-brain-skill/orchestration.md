# Orchestration Policy

How the Brain picks which agent handles a merchant interaction, and how multi-agent plays are composed.

## Routing rules

### Single-agent routing (most interactions)

Match the merchant's intent to exactly one agent and dispatch:

| Intent signals | Route to |
|---|---|
| "Why did X decline", "what does this error mean", "what's the API for X", "how does 3DS work" | **DocsAgent** |
| "Help me integrate", "walk me through", "my sandbox is failing", "prep for cert", "which endpoint should I call" | **IntegrationAgent** |
| "How am I doing", "give me the weekly summary", "what changed this week", "benchmark me against similar merchants", "daily close" | **AnalyticsAgent** |
| "I got a chargeback", "draft a response", "help me fight this dispute", "what's the reason code mean" | **DisputeAgent** |
| "Auth rate is dropping", "latency spike", "something's wrong", "my dashboard is weird" | **IncidentAgent** |

### Multi-agent plays (composed workflows)

Some merchant interactions need multiple agents in sequence. The orchestrator composes them:

**Play 1 — "Ticket deflection"**
Merchant asks a support-ish question → TicketAgent (logically = DocsAgent in demo) → cites merchant memory + corpus → if answer unlocks an action (retry, fraud rule change, dispute draft), hand off to the relevant action agent. Nothing executes without merchant approval.

**Play 2 — "Incident triage"**
IncidentAgent detects anomaly → narrates root cause → if remediation is in a known playbook, hand off to the specific agent (FraudTuningAgent, RetryAgent, etc. — conceptually; in the demo these are all surfaced through IncidentAgent itself) → merchant approves or declines.

**Play 3 — "Weekly review"**
AnalyticsAgent runs weekly narrative → OptimizationAgent (conceptually) appends 2–3 optimization suggestions from the corpus's benchmark data → MemoryWriter flags any candidate memory updates → merchant approves, rejects, or edits.

**Play 4 — "Launch-phase operation"**
For merchants in active go-live (see project memory), IncidentAgent runs in watch mode every session; any anomaly above threshold triggers a narrative alert even if the merchant didn't ask.

### Ambiguity handling

When intent isn't clear from one signal:

- **Ask one short clarifying question.** "Are you asking about the new integration, or the existing one?" Do not guess.
- **Default to DocsAgent** only if the question is clearly informational and has no action implication.
- **Never silently swap agents mid-conversation** — if the conversation needs to pivot from DocsAgent to IncidentAgent, say so: *"This looks like an active incident, not a docs question — shifting to incident triage."*

## H-I-L gate matrix

| Action | Gate |
|---|---|
| Read-only retrieval, plain-English answers, narratives | **None** |
| Draft dispute response | **None** (draft is auto) |
| Submit dispute response | **Required — explicit merchant confirm** |
| Suggest fraud rule change | **None** (suggest only) |
| Apply fraud rule change | **Required — in demo, everything is simulated** |
| Write feedback memory | **Required — show draft, wait for approval** |
| Cross-merchant memory read | **Anonymized only + source merchant consent** |

In the demo environment, no actions actually execute. "Submit" means the Brain simulates submission and writes a success confirmation to an audit log, not that any external system is touched.

## Channel-aware loadout (demo subset)

Full production Brain would load different agents per channel (bank-channel gets white-label surface; ISV-channel hides Fiserv branding). In the demo we simplify: all three merchants get the same agent catalog, but each merchant's **partner memory** (in `memory/partner.md`) declares the channel so the Brain can *speak* in the right register even though the loadout is identical.

- Indigo Road (Direct + ISV mixed) → Fiserv-branded, medium autonomy
- Casa Rosa (ISV Clover) → Clover-branded, high autonomy
- NorthGate QSR (Direct + Franchise hierarchy) → Fiserv-branded enterprise, **low autonomy** (corporate change-control is absolute; everything is approval-required)
