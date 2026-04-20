# Karpathy's Second Brain OS → Merchant Brain

Andrej Karpathy's "Second Brain OS" concept (durable per-user memory layers + retrieval + agents, built into Claude Code via the auto-memory feature) is the cleanest mental model for what this product should be. It's not a coincidence — payments merchant ops has the exact same problem as a long-running developer project: context compounds, facts become obsolete, corrections must stick, and humans forget things the system should remember.

## The primitives map 1:1

| Karpathy primitive | Merchant Brain equivalent |
|---|---|
| **User memory** | Merchant profile: legal entity, MIDs, MCC, channel of origin, contract tier, product stack, go-live date, key contacts (DRI dev, DRI ops, TAM, bank RM if applicable) |
| **Feedback memory** | "We tried X in sandbox, it failed because of Y, the workaround is Z" — captured so this merchant (and no one else) is never asked to re-learn it |
| **Project memory** | Current in-flight initiatives: "migrating from legacy gateway," "adding Apple Pay in EU," "scaling for BFCM," "adding BNPL via Klarna" |
| **Reference memory** | Pointers to Fiserv runbooks, API docs, processor specs, ISO 8583 DE maps, country-specific APM rules, specific dispute templates, incident playbooks |
| **Retrieval (RAG)** | Hybrid retrieval over (a) Fiserv's internal KB, (b) the merchant's own operational history, (c) structured telemetry from txn + dispute + settlement systems |
| **Skill / tool layer** | Agents that can *act*: IntegrationAgent, CertAgent, LaunchAgent, DisputeAgent, SettlementAgent, AnalyticsNarrativeAgent, FraudTuningAgent |
| **Self-update** | Every interaction writes back to memory; the brain gets smarter per-merchant, not just globally. Merchant can correct the brain, and corrections stick. |
| **"Before recommending, verify"** | The Brain must check current state before acting on remembered state — txn systems change, reroute happens, contract tiers get upgraded. Memory is a head start, not ground truth. |

## The key insight Karpathy gets right

A Second Brain is **not a chatbot on top of docs**. It's a **durable, writable memory layer that compounds per user**. Three things follow from this:

1. **Memory must be writable by the merchant.** If the brain is wrong and the merchant corrects it, the correction has to stick. Otherwise you rebuild the same tribal-knowledge tax you're trying to kill.
2. **Memory decays.** Project memory especially — contract terms, in-flight migrations, launch dates — goes stale fast. The Brain needs a freshness model, not just a storage model. Stale memory should be auto-flagged, not silently served.
3. **Retrieval is not enough.** You need the skill layer. A merchant who asks "why did my auth rate drop" doesn't want a document, they want an agent that checked the last 7 days of decline reasons, correlated against BIN ranges, identified a specific issuer drop, and drafted the re-routing change.

## What changes when you apply this to merchants (vs. developers)

Three things that Karpathy's Claude-Code auto-memory doesn't have to worry about but the Fiserv Brain does:

- **Multi-tenant memory.** A developer's memory is personal. A merchant's memory belongs to an organization with many users (dev team, ops team, finance, exec). Access control matters.
- **Regulatory overlay.** HIPAA-scoped memory for a healthcare merchant can't be stored the same way as retail memory. PCI scope, HIPAA scope, data residency — all constraints the developer version doesn't have.
- **Channel-mediated trust.** For a bank-channel or ISV-channel merchant, the merchant's trust relationship is with the partner, not Fiserv. The Brain's surface has to reflect that — it might be white-labeled under the bank's brand, with the bank's TAM, with the bank's data-access rules.

## What the Brain borrows wholesale from Karpathy's design

- The **4 memory types** (user, feedback, project, reference) map cleanly to merchant data. Keep them.
- The **"what NOT to save"** discipline — don't save things you can re-derive from current state (current code / current txn data / current settings). Matters 10x more here because merchant state changes constantly.
- The **"verify before recommending"** rule — a memory saying "this merchant uses 3DS v1" must be checked against current config before acting.
- The **index file** pattern (MEMORY.md) for fast loading. Per-merchant, this becomes the Brain's session-start context.

## What to pressure-test

- Does the 4-memory-type taxonomy hold across channels? A bank-channel merchant might need a 5th type: "partner memory" (the bank's preferences, the bank's TAM, the bank's contract with Fiserv).
- How does the Brain handle multi-entity merchants (a franchisor and its 500 franchisees)? Is memory hierarchical (corporate → location)? Shared? Isolated?
- What's the write-back policy when an agent takes an action? Does the action automatically become feedback memory? Does the merchant review it first?
