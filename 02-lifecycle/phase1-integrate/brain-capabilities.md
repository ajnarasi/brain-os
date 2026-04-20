# Integrate — Brain Capabilities

Detailed capability list for Phase 1 (Integrate). Derived from `journey-map.md` in this folder.

## Capability catalog

| # | Capability | Agent(s) | Maturity | H-I-L |
|---|---|---|---|---|
| 1.1 | Retrieve channel-aware integration path | IntegrationAgent | v1 | None |
| 1.2 | Answer API/spec questions with merchant-specific context | DocsAgent | v1 | None |
| 1.3 | Run a supervised test transaction in sandbox | SandboxAgent | v1 | None |
| 1.4 | Interpret ISO 8583 response + decline reason | SandboxAgent, DocsAgent | v1 | None |
| 1.5 | Diagnose a failed test transaction from history | SandboxAgent | v1 | None |
| 1.6 | Pre-run cert scripts in sandbox | CertAgent | v1 | None |
| 1.7 | Flag cert-blocking issues + explain fixes | CertAgent | v1 | None |
| 1.8 | Write feedback memory from integration failures | MemoryWriter | v1 | Approve candidate writes |
| 1.9 | Walk through webhook setup per merchant's stack | IntegrationAgent | v1 | None |
| 1.10 | Validate prod credential handoff | IntegrationAgent | v1 | Merchant confirms receipt |
| 1.11 | Detect dev using wrong product (e.g. integrating against CommerceHub when they should be on Clover) | IntegrationAgent | v2 | None |
| 1.12 | Auto-generate integration status report for TAM/merchant | IntegrationAgent | v2 | None |

## What the Brain does NOT do in Phase 1

- Does not make any production changes
- Does not access live txn data (sandbox only, until T-7)
- Does not auto-submit cert scripts for final review (drafts only)
- Does not modify merchant configuration without approval
