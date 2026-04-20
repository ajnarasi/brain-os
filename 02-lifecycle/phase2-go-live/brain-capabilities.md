# Go-Live — Brain Capabilities

Detailed capability list for Phase 2 (Go-Live). Derived from `journey-map.md` in this folder.

## Capability catalog

| # | Capability | Agent(s) | Maturity | H-I-L |
|---|---|---|---|---|
| 2.1 | Generate channel-aware pre-launch checklist | LaunchAgent | v1 | None |
| 2.2 | Cross-check fraud thresholds vs. sandbox txn profile | FraudTuningAgent | v1 | Required for any change |
| 2.3 | Verify settlement accounts against banking record | SettlementAgent | v1 | Required for any change |
| 2.4 | Validate tax config against merchant's state/MCC | LaunchAgent | v1 | Required for any change |
| 2.5 | Flag pre-launch blockers | LaunchAgent | v1 | None |
| 2.6 | Monitor T-0 cutover in real time | LaunchAgent | v1 | None |
| 2.7 | Continuous anomaly detection in T+72h window | AnomalyAgent | v1 | None (read-only alerts) |
| 2.8 | Narrative anomaly alerts | AnomalyAgent | v1 | None |
| 2.9 | Hot-dial TAM on detected incident | EscalationAgent | v1 | None |
| 2.10 | Declare launch stable | LaunchAgent | v1 | Merchant + TAM confirmation |
| 2.11 | Auto-generate launch retrospective | RetroAgent | v1 | None |
| 2.12 | Write launch learnings to feedback memory | MemoryWriter | v1 | Approve candidate writes |

## Launch criticality

Phase 2 is where the highest-stakes Brain actions happen. Operational principle: the Brain is **aggressive on detection, conservative on action**. Anomalies are reported immediately; remediations require confirmation (except for clearly reversible actions).
