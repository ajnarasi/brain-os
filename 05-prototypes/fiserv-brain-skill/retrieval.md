# Retrieval Policy

How the Brain queries the corpus and memory to answer merchant questions.

## Retrieval order

Every query walks three layers, in this order. Stop when you have enough to answer with citation.

### Layer 1 — Merchant memory
First check: is the answer already in this merchant's memory?
- Check user memory for profile facts (product stack, MCC, roles)
- Check project memory for in-flight initiatives that frame the question
- Check feedback memory for "we've hit this before" entries
- Check partner memory for channel + platform context

If memory has the answer, cite it and stop. *This is the whole point of per-merchant memory — don't re-retrieve what the merchant's brain already knows.*

### Layer 2 — Corpus
If memory doesn't have it, query the corpus at `../corpus/` based on the agent running:

**DocsAgent / IntegrationAgent** → `01-apis/` + `03-industry-standards/`
- Clover → `01-apis/clover.md`
- CommerceHub → `01-apis/commercehub.md`
- IPG / Ucom / Connected Commerce → `01-apis/ucom-ipg.md`
- SnapPay → `01-apis/snappay.md`
- ISO 8583 decline codes, DEs → `03-industry-standards/iso-8583.md`
- 3DS + EMV → `03-industry-standards/emv-emvco.md`
- ACH return codes → `03-industry-standards/nacha.md`
- PCI scope questions → `03-industry-standards/pci-dss.md`

**AnalyticsAgent** → `04-merchant-context/industry-risk.md` + merchant's own `transactions.md` and past narratives in memory

**DisputeAgent** → `04-merchant-context/failure-patterns.md` (chargeback code tables for Visa/MC/Amex)

**IncidentAgent** → `04-merchant-context/failure-patterns.md` (failure modes) + `03-industry-standards/iso-8583.md` (decline reasons) + merchant's `incidents.md`

**Fiserv context (press, merchant issues, CEO strategy)** → `02-fiserv-general/`

### Layer 3 — Ask the merchant
If neither memory nor corpus has the answer, do NOT fabricate. Ask the merchant for the missing piece or say: *"I don't have that in your memory or the corpus — want me to flag it for research?"*

## Citation rules (non-negotiable)

Every factual claim in a response must cite its source. Formats:

- **Corpus citation:** `(corpus/03-industry-standards/iso-8583.md)` — in parentheses, inline
- **Memory citation:** `(your feedback memory from 2026-03-12 BFCM incident)` — conversational
- **Combined:** `(your project memory + corpus/01-apis/commercehub.md)`

If you can't cite, you can't claim. Refuse cleanly: *"I don't have a source for that specific point."*

## Retrieval budget

- **Fast session:** top-5 merchant-memory chunks + top-3 corpus chunks ≈ 2–4K tokens
- **Deep session:** top-10 merchant-memory chunks + top-8 corpus chunks + sibling files ≈ 10–20K tokens
- Never load an entire corpus file unless the merchant explicitly asked for it

## Freshness + verification

Before acting on a memory entry that says "X is configured as Y":
1. Check the entry's `last verified` timestamp
2. If >90 days old for feedback memory, or >7 days for project memory, or >1 day for anything volatile → **verify against current state** (in demo, re-read the relevant memory file or ask the merchant to confirm)
3. If the memory conflicts with current state, **trust current state** and update the memory

This is the demo's version of Karpathy's "before recommending from memory, verify."

## Cross-merchant retrieval (disabled in demo)

Production would allow anonymized global feedback memory — lessons from one merchant help another. In the demo, cross-merchant retrieval is **disabled**. Each merchant's memory is isolated. The corpus serves as the shared knowledge base instead.

## Refusal template

When you can't answer:

> *"I don't have that in your memory or the current corpus. I could ask you to check [specific thing], or flag this as a research gap for the next corpus refresh. Which do you prefer?"*

Refusal is a feature, not a failure. An agent that never refuses is an agent that hallucinates.
