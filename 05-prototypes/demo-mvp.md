# Demo MVP — Build Spec

Concrete build spec for the first demoable prototype of the Fiserv Brain. Pairs with `next-steps.md` (which covers the *why* and the surrounding training/testing/data questions).

**Goal:** A demo you can show to Fiserv leadership, an interviewer, or a potential external partner in under 10 minutes, that makes them *feel* how the Brain works — not a working production system.

---

## Recommended path: Claude Code skill ("Path A")

### Why this path
- **Zero new infrastructure.** Runs inside Claude Code using auto-memory, SKILL system, native tool use, and the file system — all of which Ajay already has.
- **1-week solo build** for a first playable version.
- **Meta-pitch:** "I built this using the same Second Brain OS concept the pitch is based on." Strong narrative.
- **Easy handoff:** any Claude Code user can load the skill and try it.

### Deliverables
1. A skill at `05-prototypes/fiserv-brain-skill/SKILL.md` that Claude Code can invoke
2. A synthetic KB at `05-prototypes/corpus/` with ~50 web-sourced docs (chunked, tagged)
3. Three synthetic merchants at `05-prototypes/synthetic-merchants/` with full seed memory
4. A golden eval set at `05-prototypes/evals/scenarios.jsonl` with 30–50 input/expected-output pairs
5. Five recorded demo scenarios (screen captures, 90s each)
6. A one-pager `DEMO_README.md` explaining how to run the demo

### Skill architecture

```
05-prototypes/fiserv-brain-skill/
├── SKILL.md                     # Skill entry point (Claude loads this)
├── agents/
│   ├── docs-agent.md            # DocsAgent system prompt
│   ├── integration-agent.md     # IntegrationAgent system prompt
│   ├── analytics-agent.md       # AnalyticsAgent system prompt
│   ├── dispute-agent.md         # DisputeAgent system prompt
│   └── incident-agent.md        # IncidentAgent system prompt
├── orchestration.md             # How to pick which agent to invoke
├── memory-schema.md             # 5 memory types + partner memory definition
└── retrieval.md                 # How to query the corpus
```

### Synthetic merchant layout

```
05-prototypes/synthetic-merchants/
├── indigo-road-apparel/         # Mid-market fashion (Slice A persona)
│   ├── profile.md
│   ├── memory/
│   │   ├── user.md
│   │   ├── feedback.md
│   │   ├── project.md
│   │   ├── reference.md
│   │   └── partner.md
│   ├── transactions/            # 10 synthetic txns
│   └── incidents/               # 3 synthetic historical incidents
├── casa-rosa-taqueria/          # Clover SMB restaurant (Slice B persona)
│   └── (same structure)
└── northgate-qsr-holdings/      # Inspire-Brands-style IPG (Slice D persona)
    └── (same structure)
```

### The 5 demo scenarios (scripted)

Each scenario is a rehearsed 60–90 second walkthrough. Rehearse each one until it works every time.

#### Scenario 1 — "Why did this transaction decline?" (Indigo Road Apparel)
**Setup:** Merchant pastes a txn ID from their system.
**Brain does:** Retrieves the synthetic txn, parses the (fake) ISO 8583 response, cites the decline reason, pulls a matching entry from feedback memory ("two weeks ago we hit a similar issue with a Capital One BIN range"), and suggests a retry strategy.
**Why it sells:** shows merchant-specific memory, retrieval with citation, and actionable recommendation — in one answer.

#### Scenario 2 — "Walk me through integrating 3DS" (Indigo Road Apparel)
**Setup:** Merchant dev asks how to implement 3DS on CommerceHub + Shopify.
**Brain does:** Loads their product stack from user memory, retrieves the specific 3DS path for CommerceHub, cites docs, references a prior feedback-memory entry ("another merchant hit a 3DS v1/v2 retry loop — don't do that"), drafts the integration steps.
**Why it sells:** shows Integration-phase value and feedback-memory compounding across merchants.

#### Scenario 3 — "Give me my daily close narrative" (Casa Rosa Taqueria)
**Setup:** Owner opens Clover at 11pm after close. Clicks "Brain."
**Brain does:** Generates a plain-English 6-line summary: today's revenue, comparison to last Tuesday, tips average, one DoorDash chargeback (with drafted response), tomorrow's forecast based on weather + history.
**Why it sells:** shows Operate-phase SMB value — the single most emotionally resonant scenario for anyone who has run a restaurant.

#### Scenario 4 — "I got a dispute — draft a response" (Indigo Road Apparel)
**Setup:** Merchant gets a new chargeback on a specific order.
**Brain does:** Loads the order from memory, loads the dispute reason, pulls 3 historical similar disputes from feedback memory (win rates: 80%, 65%, 20%), drafts a response using the highest-win-rate template, shows it for approval.
**Why it sells:** shows H-I-L gated agent action and the compounding memory advantage.

#### Scenario 5 — "Something is wrong with my auth rate today" (NorthGate QSR Holdings)
**Setup:** Corporate payments PM at NorthGate notices auth rate is dipping across locations.
**Brain does:** Pulls the dip data, identifies that 40% of declines are concentrated in 3 locations in the southeast, cross-references a (fake) Buypass pump firmware update at those 3 locations, narrates the incident, suggests escalation to Buypass support, offers to open a ticket (H-I-L gated).
**Why it sells:** shows cross-location narrative, multi-back-end reconciliation (Nashville + Buypass), and the strategic-QSR / IPG value at the corporate-PM level. This is the Slice D pitch.

### Build sequence (5 days solo)

**Day 1 — Skill skeleton + synthetic merchant 1**
- Create the `fiserv-brain-skill/` folder structure
- Write `SKILL.md` with the high-level orchestration prompt
- Write `docs-agent.md` system prompt
- Build synthetic merchant #1 (Indigo Road Apparel) with seeded memory
- Verify skill loads in Claude Code

**Day 2 — Corpus ingestion**
- Run `sc:research` against the public sources list in `next-steps.md`
- Pull ~50 docs into `05-prototypes/corpus/`
- Chunk + tag (platform, vertical, size)
- Test DocsAgent retrieval with 5 ad-hoc questions

**Day 3 — Agents 2–5**
- Write IntegrationAgent, AnalyticsAgent, DisputeAgent, IncidentAgent system prompts
- Write orchestration logic (which agent runs when)
- Build synthetic merchants #2 (Casa Rosa) and #3 (NorthGate QSR)

**Day 4 — Golden eval set + iteration**
- Write 30–40 input/expected-output pairs in `evals/scenarios.jsonl`
- Run the eval suite; target >70% pass rate
- Use `autoresearch-skill-improver` to iterate prompts for failing scenarios
- Get to >80% pass rate

**Day 5 — Demo polish + recording**
- Rehearse the 5 demo scenarios until each works reliably
- Screen-record each scenario (90s max)
- Write `DEMO_README.md`
- Share with 1 trusted reviewer for feedback

### What the skill entry point (`SKILL.md`) should look like

Sketch of the contents — not the final prompt, just the shape:

```markdown
---
name: fiserv-brain
description: Per-merchant "second brain" for Fiserv merchants — demo skill implementing
             the Brain as a Service concept using Claude's own Second Brain OS primitives.
             Operates over synthetic merchant memory + curated payments KB.
---

You are the Fiserv Brain, a per-merchant second brain built on Karpathy's Second Brain
OS concept applied to payments operations.

## Starting any interaction

1. Ask (or receive) which merchant you're operating for. Supported: Indigo Road Apparel,
   Casa Rosa Taqueria, NorthGate QSR Holdings.
2. Hydrate that merchant's memory from `../synthetic-merchants/{merchant}/memory/`.
3. Load platform config (front-end + back-end) from their profile.
4. Greet the merchant in-character with a one-line acknowledgment of their current
   project memory (e.g., "Glad to be back. You're still in the middle of migrating
   Apple Pay in EU — anything blocking on that?").

## Routing

Based on the merchant's question, pick the right agent:
- Docs / API / how-to → DocsAgent (see agents/docs-agent.md)
- Integration walkthrough → IntegrationAgent
- Daily close / analytics narrative → AnalyticsAgent
- Dispute / chargeback → DisputeAgent
- Auth rate / latency / incident → IncidentAgent

## Memory write-back

After any substantive interaction:
- Draft a candidate feedback-memory entry
- Show the draft to the merchant
- Write it on approval
- Never write silently

## Guardrails

- Cite every factual claim against the corpus or memory
- Refuse if you can't cite
- Never take a financially-material action without human confirmation
- Respect merchant role scoping
```

### Rehearsal discipline
Before showing this to anyone, run each scenario 3 times clean. If any scenario fails, fix the prompt or seed memory before the demo. A single bad answer in front of an exec kills the pitch.

---

## Alternative path: Web app (Path B, ~2–4 weeks)

Skip unless you need a URL to share with non-Claude-Code users. Build spec:

**Stack:**
- Streamlit (fastest, v1) or Next.js (prettier, v2)
- Anthropic SDK direct (claude-opus-4-6 for quality, claude-haiku-4-5 for latency)
- Chroma or LanceDB for the vector store (local, zero-ops)
- Voyage-3 embeddings (better than OpenAI for retrieval)
- JSON files for memory (v1); Postgres (v2)

**Screens:**
1. **Merchant selector** — pick one of the 3 synthetic merchants
2. **Chat** — the main interaction surface
3. **Memory panel** — sidebar showing live memory (shows stakeholders what's different about this)
4. **Scenario runner** — drop-down that runs one of the 5 scripted scenarios end-to-end
5. **Eval page** — shows the eval suite pass rate (establishes credibility for technical reviewers)

**Hosting:** Streamlit Cloud (free for Streamlit) or Vercel (for Next.js). Both have sub-day deploys.

**When to switch from Path A to Path B:** once the skill works and the demo is rehearsed, if you need a URL-shareable version for Fiserv leadership who don't use Claude Code. Not before.

---

## What this demo MVP does NOT include

- Any real Fiserv internal data
- Any real production ingestion pipeline
- Any real back-end platform parsers (Nashville, Omaha, Buypass) — simulated only
- Any real channel partners
- Any agentic actions that actually write to external systems
- Any multi-tenant / access control
- Any regulatory compliance (no HIPAA, no PCI scope)

All of that is v1 pilot material, not demo material.

---

## Success criteria for the demo MVP

- [ ] Runs end-to-end without breaking on any of the 5 scenarios
- [ ] Eval suite pass rate >80% (document the methodology)
- [ ] Walk-through time <10 minutes, rehearsed
- [ ] Stakeholder can load it themselves in <5 minutes (for Path A)
- [ ] At least one Fiserv SME reviews it and says "this is directionally right"
- [ ] Screen recordings exist for every scenario, so the demo works even when tech fails

---

## After the demo lands

Once the demo is working and has been shown to 3+ stakeholders, the next real step is **customer interviews** (see `../06-research/customer-interviews.md`). The demo is the artifact that gets you in the room; the interviews are what validate or kill the thesis.

Do not build Path B or any "v2 features" until customer interviews confirm the wedges are real. The trap here is polishing the demo instead of talking to merchants.
