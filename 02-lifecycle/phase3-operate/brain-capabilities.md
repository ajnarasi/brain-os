# Operate — Brain Capabilities

Detailed capability list for Phase 3 (Operate). Derived from `journey-map.md` in this folder.

## Capability catalog

| # | Capability | Agent(s) | Maturity | H-I-L |
|---|---|---|---|---|
| 3.1 | Answer support questions with merchant-specific context | TicketAgent, DocsAgent | v1 | None |
| 3.2 | Open a support ticket on behalf of the merchant | TicketAgent | v2 | Required |
| 3.3 | Continuous anomaly detection | IncidentAgent | v1 | None (alert only) |
| 3.4 | Narrative incident reports | IncidentAgent | v1 | None |
| 3.5 | Weekly plain-English business narrative | AnalyticsAgent | v1 | None |
| 3.6 | Monthly business review narrative | AnalyticsAgent | v1 | None |
| 3.7 | Optimization suggestions (interchange, routing, retry, fraud) | OptimizationAgent | v1 | Suggest-only; Required for action |
| 3.8 | Benchmark against comparable merchants (anonymized) | OptimizationAgent | v2 | None |
| 3.9 | Dispute response drafting | DisputeAgent | v1 | Required to submit |
| 3.10 | Dispute win-rate tracking per template | DisputeAgent | v1 | None |
| 3.11 | Settlement variance reconciliation | SettlementAgent | v1 | Required for adjustment |
| 3.12 | Fraud rule drift monitoring | FraudTuningAgent | v1 | Alert-only; Required for change |
| 3.13 | Fraud rule auto-tuning within envelope | FraudTuningAgent | v2 | None within envelope |
| 3.14 | Retry orchestration for soft declines | RetryAgent | v1 | None within envelope |
| 3.15 | APM coverage analysis + rollout guidance | APMAgent | v1 | Required for rollout |

## Long-tail scope

Phase 3 is the phase with the longest tail of capabilities. The list above is v1–v2; Year 3 adds agentic execution capabilities that require higher trust + more mature merchant memory.
