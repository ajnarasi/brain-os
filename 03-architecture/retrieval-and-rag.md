# Retrieval & RAG

How the Brain actually answers questions.

## Hybrid retrieval

Three retrieval modes run in parallel and results are merged:

### 1. Lexical (exact match)
Used for: API endpoint references, ISO 8583 DE codes, specific runbook IDs, error codes, regulatory citations.
Why: when the merchant asks "what does response code 51 mean?", you want an exact match, not a vector similarity.

### 2. Vector (semantic)
Used for: KB content, past TAM notes, support ticket history, prior incident narratives.
Why: when the merchant asks "why are my Visa declines spiking?", there may be a prior incident that doesn't share any exact words but is semantically the answer.

### 3. Graph traversal
Used for: "what's connected to what" queries. Walks the knowledge graph.
Why: "which runbooks apply to this merchant's channel + vertical + product stack?" is a path query, not a search query.

## Merging logic

Each retrieval result carries:
- Source
- Confidence score
- Recency timestamp
- Merchant-scope (merchant-specific, cluster-specific, global)

The orchestrator re-ranks by a weighted function of these, respecting the agent's explicit preferences (DocsAgent prefers exact + recent; AnalyticsAgent prefers merchant-specific history).

## Context assembly

For each agent call, the Brain assembles a context packet:

1. **System prompt** for the agent
2. **Memory load** — hydrated memory relevant to this query (5 types, freshness-filtered)
3. **Retrieval results** — top N from the hybrid retrieval
4. **Tool schemas** — what the agent can do
5. **H-I-L state** — what actions require approval

Budget: 10K–50K tokens depending on agent. AnalyticsAgent's monthly review gets the biggest budget; TicketAgent's first-pass answer gets a tiny one.

## Citation requirements

Every generated response must cite its sources. No un-sourced claims. If the agent can't cite, it must say "I don't know" and escalate.

## Retrieval-time freshness check

Every piece of retrieved content is time-stamped. If a retrieved memory or KB entry is older than its volatility window, the orchestrator flags it as "possibly stale — verify against current state." Agents must check live state before acting on stale memory.

## No training on merchant data without consent

Retrieval reads memory. It does not train on it. If Fiserv ever wants to fine-tune a model on merchant data, that requires explicit opt-in from the merchant and a separate pipeline.

## Cross-merchant leakage defense

Feedback memory from one merchant is retrievable by another only after:
1. PII strip
2. Merchant-identifying data removed
3. Pattern generalization (the *lesson* is preserved, the specifics are not)
4. Source merchant consent (or legal basis)

The orchestrator enforces this at retrieval time, not at storage time — merchant-scoped memory is always isolated; global memory is a separate (smaller) store seeded from anonymized patterns.
