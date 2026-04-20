# Memory Layers

The Brain's memory architecture is the single most important piece of the system. Everything else (retrieval, agents, surface) can be ripped out and replaced without killing the product. The memory is the product.

## The 5 memory types

Extending Karpathy's 4-type model with a 5th type (**partner memory**) that's specific to Fiserv's multi-channel reality.

### 1. User memory
Durable facts about the merchant and the humans operating it.

| Field class | Examples |
|---|---|
| Entity | Legal name, DBA, MIDs, MCCs, tax IDs (hashed), countries of operation |
| Product stack | Fiserv products enabled (CommerceHub, Clover, Carat APIs, AccessOne, etc.), 3rd-party products in the stack |
| Roles | DRI dev, DRI ops, finance lead, TAM, escalation contact, bank RM (if channel=bank) |
| Preferences | Alerting cadence, risk tolerance, settlement window pref, reporting format, language |
| Contract | Tier, rate structure (referenced not stored), contract term, renewal date |

**Write policy:** Merchant can edit all of this. Brain writes provisionally; merchant confirms.
**Freshness:** Stable. Review quarterly or on event (contract renewal, MID change).

### 2. Feedback memory
Rules learned from prior interactions. The "we tried X, it failed because Y, the fix is Z" memory.

Each entry structured as:
- **Rule** — the lesson
- **Why** — the reason (often a past incident)
- **How to apply** — when this kicks in
- **Source** — the conversation or incident it came from
- **Confidence** — based on repeat confirmations
- **Scope** — merchant-specific, cluster-specific, or global

Example entry:
> **Rule:** When this merchant's 3DS frictionless attempts fail, don't retry with 3DS v1 — issuer rejects the second attempt for 24 hours.
> **Why:** Incident 2026-03-12, cost $4k in declined volume
> **How to apply:** In the 3DS retry logic for this merchant only
> **Scope:** Merchant-specific

**Write policy:** Brain writes after every interaction; merchant can edit or delete.
**Freshness:** Marked stale if no confirmation in 90 days; revalidated before use.

### 3. Project memory
In-flight initiatives and temporary state.

Examples:
- "Migrating from legacy gateway — target cutover 2026-06-01, currently in UAT"
- "Adding Apple Pay in EU for BFCM — integration phase"
- "Scaling fraud rules for BFCM — new thresholds effective 2026-11-01"

**Write policy:** Brain writes on detection; merchant edits freely.
**Freshness:** High decay rate. Entries have explicit expiry dates. Auto-archive after completion.

### 4. Reference memory
Pointers to external resources the Brain should consult.

- Fiserv runbook locations
- API documentation URLs
- ISO 8583 DE mapping tables for this merchant's processor
- Country-specific APM rules
- This merchant's own docs (if shared)

**Write policy:** Brain curates globally; merchant can add/remove for their own brain.
**Freshness:** Links checked periodically; stale links flagged.

### 5. Partner memory (Fiserv-specific)
The channel relationship.

| Field class | Examples |
|---|---|
| Channel | direct / bank / ISO / ISV / PayFac / marketplace / referral / franchise |
| Partner entity | Specific bank name, specific ISV name, specific ISO name, etc. |
| Support routing | Who is first line (Fiserv TAM, bank TAM, ISO agent, ISV support, merchant's own team) |
| Data access constraints | Which data is shared, which is restricted, per partner agreement |
| Branding | White-label config — logos, colors, domain, tone |
| Commercial | Who pays Fiserv for this Brain instance (merchant, partner, bundled) |

**Write policy:** Mostly system-written from partner config; merchant sees but typically can't edit.
**Freshness:** Event-driven — changes on channel change or contract amendment.

## Memory storage model

- **Vector index** (for semantic retrieval): per-merchant namespace, with partner-memory indexed as a retrieval filter not a document.
- **Structured store** (Postgres or similar): canonical fields, strict schemas per type.
- **Event log**: append-only log of all memory writes for audit + rollback + training-data generation.
- **Freshness index**: tracks last-confirmed timestamp for every entry; stale entries flagged at retrieval time.

## Access control

- **Merchant scope.** Users within a merchant org see only that merchant's memory, scoped further by role (dev vs. finance vs. exec).
- **Partner scope.** Partner-memory visible to both the merchant and the partner, per partner agreement.
- **Fiserv internal.** TAMs and support can see merchant memory subject to merchant consent + internal RBAC.
- **Cross-merchant anonymization.** Feedback memory can be promoted to "global" only after PII / merchant-identifying info is stripped, and only with the originating merchant's consent.

## Regulated-data handling

- **PCI.** No PAN in memory, ever. References to transactions use tokens.
- **HIPAA.** Healthcare merchants have a HIPAA-scoped memory partition. Data stays in that partition; never retrieved into general context.
- **Data residency.** Memory store respects the merchant's country of operation for residency requirements.
- **Right to delete.** Merchant can erase their memory on request; audit log preserved for compliance window, then purged.

## Freshness model — the "verify before recommending" rule

At retrieval time, every memory entry is scored on:
1. **Age** — last confirmed timestamp
2. **Volatility** — how fast this type of fact typically changes (product stack = low; fraud thresholds = high)
3. **Consequence** — is the action about to be taken financially material

If age × volatility × consequence exceeds a threshold, the Brain must re-verify against current state before using the memory. This is the payments-ops analogue of Karpathy's "don't recommend from memory without checking first."

## What NOT to save in memory

- Anything derivable from current state (live txns, current fraud rules, current settlement accounts — query instead)
- PAN, CVV, any regulated identifiers not tokenized
- Conversation-local context ("what we were just talking about") — use session state, not memory
- Merchant-internal documents or emails unless explicitly opted-in
- Anything that would violate partner data-sharing constraints

## Memory hydration at session start

On every merchant interaction, the Brain loads:
1. Partner memory (sets the channel context)
2. User memory (who this merchant is)
3. Most recently touched project memory entries
4. Feedback memory entries relevant to the current context
5. Reference memory lazily on retrieval

Total hydration budget: ~10K tokens for fast sessions, expandable to ~50K for deep sessions.

## Memory write-back from agents

Every agent action that teaches the Brain something writes back to memory:
- **DocsAgent answered a question the merchant accepted** → candidate feedback memory
- **LaunchAgent detected a drift and fixed it** → feedback memory + project memory update
- **DisputeAgent drafted a successful response** → feedback memory (template that worked)
- **OpsAgent narrated an incident the merchant confirmed** → feedback memory

Write-back is throttled and reviewed — every 7 days, the Brain summarizes the week's candidate memory additions and asks the merchant to approve/reject.
