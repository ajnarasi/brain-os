# Karpathy's Second Brain OS — Notes

Running notes from studying Karpathy's "Second Brain Operating System" concept (as implemented in Claude Code's auto-memory skill) and what it means for the Fiserv Brain design.

## Core concepts to borrow

### Memory types (user / feedback / project / reference)
Clean taxonomy. Maps directly to merchant context with one addition (partner memory). See `../00-strategy/karpathy-mapping.md` for the full map.

### MEMORY.md as an index, not storage
Fast-load pattern: a small index file lists memory entries by title + one-line hook, and the agent loads the actual content lazily on demand. For the Brain, this becomes a per-merchant `MEMORY.md` equivalent that hydrates at session start and gates further memory reads.

### "What NOT to save"
Don't save things you can re-derive from current state. Ephemeral state stays in session, not memory. Applied to merchants: don't save current fraud rules, current txn data, current settings — query them instead.

### "Verify before recommending"
If a memory names a specific function/file/flag, verify it still exists before recommending action on it. Applied to merchants: if a memory says "this merchant uses 3DS v1," check current config before acting on it.

### Frontmatter structure
Memory entries have frontmatter (name, description, type). Lightweight, parseable, human-editable. Adopt directly.

### Feedback memory body structure (rule + why + how-to-apply)
Corrections carry the *reason*, not just the rule, so future-you can judge edge cases. Applied to Brain: every feedback memory entry captures the Fiserv TAM reasoning, the incident context, and the application conditions — not just the fix.

## Key adaptations for Fiserv

### Multi-tenant by default
Karpathy's version is single-user. The Brain is per-merchant where "merchant" can mean an org with many users. Access control is a first-class concern.

### Regulatory-aware
HIPAA-scoped memory, PCI-scoped references, data residency — none of which exist for a developer's personal memory.

### Partner memory (5th type)
Channel relationship is the Fiserv-specific axis. Not in the original 4-type model.

### Writable by non-author
In Karpathy's model, only the user writes memory. In the Brain, agents write candidates and merchants approve. This changes the write pattern significantly.

### Cross-merchant feedback memory (anonymized)
A Fiserv-specific opportunity: lessons from one merchant can help another merchant. Requires anonymization + consent infrastructure Karpathy's design doesn't need.

## Things to stress-test

1. **Memory decay.** Karpathy's model has a 7-day reminder for project memory. Merchants operate on longer timescales (contract cycles, seasonal cycles, incident cycles). The decay model needs adjustment.
2. **Global memory size.** Karpathy caps MEMORY.md at ~200 lines. For a merchant with 3 years of history, this isn't enough. Need a tiered model: fast index + summarized long-term + full archive.
3. **Conflict resolution.** What happens when two users within a merchant org write conflicting feedback memory? Karpathy doesn't have this problem.
4. **Trust boundary between merchant and Fiserv.** Can Fiserv TAMs read merchant memory? Under what conditions? The answer affects how memory is scoped.

## Quote I want to hold onto

From the auto-memory skill:
> "Memory is one of several persistence mechanisms available... the distinction is often that memory can be recalled in future conversations and should not be used for persisting information that is only useful within the scope of the current conversation."

This is the single most important principle for Brain memory design: **don't confuse session state with memory.** Session state is "what we're talking about right now." Memory is "what should still be true next quarter."
