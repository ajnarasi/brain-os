# Next Steps — Training, Testing, Data

Answers to the four operational questions that come after the pitch is written:
1. How do I train this?
2. How do I test this?
3. How do I create a prototype to demo this?
4. Can I use web research data to feed into the Brain for testing?

See `demo-mvp.md` for the concrete demo build spec that goes with this.

---

## 1. How do you "train" the Fiserv Brain?

**Reframe first — this is the most important point.** "Training" in the classic ML sense (gradient descent on labeled data) is **not** the primary lever for the Brain. The Brain is a **compound AI system** — LLM + retrieval + memory + tools + orchestration — and its "training" is really **five parallel curation and iteration loops**, not one model-training job.

Fine-tuning the underlying LLM would be expensive, slow, destructive to general reasoning ability, and almost entirely unnecessary for a product like this. Don't do it.

Instead, the Brain gets better through these five levers, in rough order of impact:

### Lever 1 — Retrieval corpus curation (biggest single lever)
The Brain is only as good as what it can retrieve. Curate:
- **Fiserv KB:** API docs, product guides, runbooks, processor specs, ISO 8583 reference, cert scripts
- **Past TAM notes and support tickets** (anonymized) — this is where the real tribal knowledge lives
- **Runbooks** for common incidents + resolutions
- **Per-vertical reference material** (MCC rules, regulatory overlays)
- **Per-platform parsers and decode tables** (Nashville/Omaha/Buypass dialects)

Quality beats quantity — 200 curated, well-tagged docs outperform 20,000 raw docs every time. Tag by platform, channel, vertical, size tier so retrieval can be scoped.

### Lever 2 — Agent system prompts (scripted behavior)
Each narrow agent (DocsAgent, IntegrationAgent, LaunchAgent, etc.) has its own system prompt that defines:
- Its job and its boundaries
- Its tool set (what it can read, what it can call, what it can write)
- Its human-in-loop gates
- Its citation requirements ("always cite; refuse to answer when you can't")
- Its output format

System-prompt iteration is where most of the product work lives. You'll rewrite each agent's prompt dozens of times during the pilot.

### Lever 3 — Memory schemas and seeded memory
- Define the 5 memory types (user / feedback / project / reference / partner) schema rigorously
- Seed demo merchants with realistic starting memory
- Define the freshness / decay model per memory type
- Build the write-back flow (candidate writes → merchant approves → persisted)

### Lever 4 — Feedback loops and golden datasets ("the training signal")
For LLM systems, the **eval set is the training signal**. You don't label examples to fit a classifier; you define "what's a good answer?" in 30–50 golden scenarios and iterate until the Brain consistently gets them right.

- Build 30–50 **golden eval scenarios** for v1 — each one a realistic merchant question with a known-good answer (graded by a Fiserv SME)
- Run the Brain against the eval set after every system-prompt change
- Track pass rate over time as the primary quality metric
- Fail fast: if pass rate regresses, don't ship the change

This is exactly the workflow Ajay's existing **autoresearch-skill-improver** skill implements. Karpathy's loop applied to the Brain's agents is the unlock.

### Lever 5 — Narrow-task ML models (optional, specific sub-components)
For specific narrow tasks inside the Brain, you *can* train classical ML models on Fiserv historical data:
- Decline-reason classification (ISO 8583 response codes → cleaned category)
- Dispute-win likelihood predictor (merchant history + dispute type → win probability)
- Anomaly detection (time-series on auth rates, latency, decline distribution)
- Retry-success predictor (which declines are worth retrying)

These are **inside** an agent's tool set, not replacements for the agent. They're optional — most of the Brain's value comes from Levers 1–4 alone.

### Order of operations
1. Start with Lever 1 (curate a small KB) + Lever 2 (write one agent's prompt) — get *something* answering questions
2. Add Lever 3 (seed memory for 2–3 demo merchants)
3. Add Lever 4 (build 30–50 evals, start iterating)
4. Only add Lever 5 later when a specific narrow-task need justifies it

---

## 2. How do you test this?

Testing an agentic system is different from testing traditional software. Seven layers of test, each catching a different failure mode:

### Layer 1 — Unit evals per agent (30–50 golden scenarios)
For each agent, define 10–15 input/expected-output pairs. Score by: correctness, citation quality, refusal-when-uncertain, latency.

Tools: **Promptfoo** (open-source, easy), **Inspect AI** (UK AISI, rigorous), **Braintrust**, **LangSmith**, or a custom eval harness. Ajay's existing `autoresearch-toolkit` in `/APM/autoresearch-toolkit/` is already set up for this.

### Layer 2 — End-to-end scenario tests
20–30 pre-recorded "merchant journeys" — e.g., "new mid-market fashion brand onboards, launches BFCM, handles a fraud incident." Run the whole Brain through each scenario and grade the output end-to-end. Catches orchestration and multi-agent failures that unit evals miss.

### Layer 3 — Replay testing against historical data
Feed 30+ days of historical (anonymized) production data through IncidentAgent. Score: did it catch the incidents that actually happened? Did it false-positive? This is the single most convincing test you can run for internal stakeholders — "the Brain would have caught 8 of the 10 incidents we actually had last month, 15 minutes before our NOC did."

### Layer 4 — Hallucination and citation guardrails
Adversarial tests:
- Ask a question with no correct answer in the corpus → agent must refuse
- Ask a question whose answer contradicts memory → agent must verify live state
- Ask a question citing fake data → agent must not take it at face value

Fail on any un-cited factual claim. Non-negotiable.

### Layer 5 — Regression evals on every change
Every system-prompt change, every corpus addition, every model version bump → rerun the full eval suite. Block ship if pass rate regresses below a threshold. This is what makes the Brain a real product vs. a demo.

### Layer 6 — Human-in-loop SME grading
Recruit 2–3 Fiserv TAMs or solutions engineers. Weekly, they grade 20 real Brain responses on a 1–5 rubric: accuracy, usefulness, tone, citation quality. Their grades become the highest-quality eval set over time — and they're also your internal champions when it's time to ship.

### Layer 7 — Pilot canary (the ultimate test)
The two-pilot MVP in `../04-prd/mvp-scope.md` is the real test. Metrics that matter: time-to-first-txn, ticket deflection, NPS, launch-week incident count. Everything before this is proxy for this.

### Testing anti-patterns to avoid
- **Vibe testing** — "looks good to me" is not a test. Write it down.
- **Single-shot demo tests** — passing one cherry-picked scenario means nothing
- **Ignoring regressions** — treat a prompt-change regression like a test failure, not a trade-off
- **Testing only happy paths** — the value of the Brain is in failure modes; test them aggressively
- **No calibration on refusals** — an agent that refuses 80% of questions is useless; an agent that never refuses is dangerous

---

## 3. How do you create a prototype to demo this?

**Two paths — pick based on how fast you need a demo and how polished it needs to look.**

### Path A (recommended, ~1 week solo) — Claude Code skill / Claude Project

This is elegant because Ajay already has all the infrastructure. Build the Fiserv Brain as a **Claude Code skill** that demonstrates the concept using Claude's existing:
- **Auto-memory** (already exists in Ajay's Claude Code) → plays the role of per-merchant memory
- **SKILL system** → plays the role of agents
- **Native tool use** → plays the role of the action layer
- **File system** → plays the role of the KB corpus

**Deliverable:** A skill named `fiserv-brain` you can invoke in Claude Code. When loaded with a synthetic merchant profile, it answers integration questions, runs simulated incident narratives, and demonstrates memory write-back. The demo is: open Claude Code, type `/fiserv-brain "walk me through integrating 3DS"`, watch the magic.

**Why this is the right first demo:**
- Zero new infrastructure — everything runs in Claude Code
- Uses Ajay's existing `autoresearch-skill-improver` to iterate the skill's prompts automatically
- Meta-demo: "I built the Fiserv Brain concept using Claude's own Second Brain OS" is itself a compelling pitch
- Ships in days, not weeks
- Easy to hand to a stakeholder: "open Claude Code and try this"

See `demo-mvp.md` for the concrete build spec.

### Path B (~2–4 weeks solo) — Standalone web app

If you need a demo that non-Claude-Code users can click on, build a minimal web app:

**Stack:**
- **Frontend:** Streamlit (fastest) or Next.js (prettier)
- **LLM:** Claude API (opus-4-6 for quality, haiku-4-5 for speed)
- **Vector store:** Chroma or LanceDB locally, Pinecone if cloud
- **Embeddings:** Voyage-3 or OpenAI text-embedding-3-large
- **Memory store:** JSON files (v1) → Postgres (v2)
- **Orchestration:** Raw Anthropic SDK with a thin agent loop; or LangGraph if you want multi-agent
- **Hosting:** Vercel (Next.js) or Streamlit Cloud (free) or Render

**Features:**
- Login as one of 2–3 synthetic merchants
- Chat interface scoped to that merchant
- Visible memory side-panel (so stakeholders see the "second brain" concept)
- 5 scripted demo scenarios with pre-recorded expected outputs
- Citation rendering (every claim shows source)
- Action-button UI (e.g., "Draft dispute response" → shows the draft, doesn't actually submit)

**Why Path B if Path A exists:** you want a demo you can share via URL to Fiserv leadership or potential partners who don't use Claude Code. Harder to build but better for external stakeholders.

### The 5 demo scenarios (both paths)
These are the scenarios the prototype must nail. Scripted, rehearsed, with pre-seeded memory that makes them work:

1. **"Why did this transaction decline?"** — shows merchant-specific diagnosis using memory + KB
2. **"Walk me through integrating 3DS"** — shows IntegrationAgent + docs retrieval + feedback memory from prior merchants
3. **"Give me my daily close narrative"** — shows AnalyticsAgent with plain-English output and drill-down
4. **"I got a dispute — draft a response"** — shows DisputeAgent drafting with historical templates
5. **"Something is wrong with my auth rate today"** — shows IncidentAgent catching + narrating an anomaly

Time each demo scenario to 90 seconds. Under 10 minutes total. Record them.

### Demo data (absolutely critical)
Seed 2–3 **synthetic merchants** before the demo — real-feeling names, real histories, real memory. See "Synthetic merchant personas" in `demo-mvp.md`.

---

## 4. Can you use web research data to feed into the Brain for testing?

**Yes — for the demo and the early testing phase, web research data is ideal.** Real Fiserv internal data is confidential, can't leave Fiserv's network, and can't be used in external demos or interview pitches. Public web data solves all three problems.

### Why web data works for the demo
- Every synthetic merchant, every scenario, every KB entry in the demo is **fake by definition** — the point is to show the *concept*, not to process real transactions
- Fiserv publishes a large amount of material about its own products (Clover, CommerceHub, Carat, dev.fiserv.com) that's perfectly usable
- Card-brand specs, ISO 8583 reference, MCC rules, and regulatory overlays are all public
- Public company merchants (Yum!, Costco, Dunkin') have earnings calls, SEC filings, and press releases you can use to build realistic synthetic contexts

### Specific web sources worth ingesting

**Fiserv product documentation (public):**
- dev.fiserv.com — the developer portal, API docs, SDK references
- Fiserv.com product pages for Clover, CommerceHub, Carat, Optis, IPG, Forte, AccessOne, Buypass
- Clover developer docs (docs.clover.com)
- CommerceHub documentation
- Fiserv public release notes + changelogs
- Fiserv blog and press releases

**Payments industry reference (public):**
- ISO 8583 specification (Wikipedia + public ISO references)
- Visa Acceptance Solutions docs (developer.visa.com)
- Mastercard Developers portal
- American Express developer docs
- Discover Network developer resources
- EMVCo specifications (public sections)
- PCI DSS public guidance
- NACHA ACH operating rules (public portions)

**Merchant context (for synthetic merchant personas):**
- Yum! Brands 10-K filings (SEC EDGAR)
- Costco 10-K filings
- Inspire Brands press coverage
- Dunkin' public earnings history (pre-Inspire acquisition)
- Shopify + BigCommerce merchant case studies

**Industry analysis:**
- Nilson Report summaries (public excerpts)
- Merchant Risk Council publications
- Payments podcasts: Leaders in Payments, The Money Pot, Fintech Insider
- Medium / Substack payments writers
- Stack Overflow questions tagged `payments`, `iso-8583`, `card-processing`

**Failure-mode reference:**
- Public card-brand chargeback reason code lists
- Public decline code references
- Stack Overflow + Reddit r/payments threads on integration failures
- GitHub issues on open-source payment libraries (Stripe, Braintree SDKs have lots of real integration failure patterns)

### How to pull this data efficiently

Ajay already has the right tools in his workspace:
- **`sc:research`** skill — deep-research with adaptive planning
- **`deep-research-agent`** — specialist for comprehensive research
- **WebFetch + WebSearch tools** — direct web ingestion
- **`autoresearch-toolkit`** — Karpathy's autoresearch loop for iterative research

**Recommended pipeline:**
1. Write a research brief ("I'm building a demo of a payments ops AI; I need public Fiserv product docs + ISO 8583 reference + card-brand chargeback rules + 3 public-company merchant profiles")
2. Run `sc:research` or `deep-research-agent` against it
3. Clean + tag the results (by platform, vertical, size tier)
4. Chunk + embed into the vector store
5. Iterate via autoresearch-skill-improver to test whether the Brain's retrieval is covering the right ground

### Hard rules for web-sourced data

- **Label everything as "demo / synthetic — not production data."** Every file, every source entry.
- **Never mix real Fiserv internal data with web data** in the demo environment. Keep them in completely separate stores. The moment you start mixing, you have a compliance problem you didn't need.
- **No real customer PII.** Even if you find it accidentally on a public site, don't ingest it.
- **No competitor proprietary data.** Public docs only.
- **Anonymize the synthetic merchants.** Don't name them "Yum! Brands" in the demo — name them something like "Blue Ocean QSR Holdings" and cite Yum! as the inspiration, not the identity.
- **Fresh-check on ingestion.** Web docs go stale. Re-crawl monthly if the demo is live.

### Three synthetic merchants to seed

For the demo, build these three profiles from web data (see `demo-mvp.md` for full spec):

1. **Indigo Road Apparel** — mid-market fashion brand, 30 stores, direct CommerceHub + Shopify ISV, omnichannel + D2C + B2B wholesale. Inspired by real mid-market fashion brands.
2. **Casa Rosa Taqueria** — Clover-native SMB restaurant, 3 locations, Clover App Market. Inspired by real small-chain taquerias.
3. **NorthGate QSR Holdings** — corporate QSR franchisee operating Arby's/Jimmy John's/Baskin-Robbins locations under Inspire Brands. IPG + Nashville + ValueLink + STAR/NYCE. Inspired by public Inspire Brands press coverage. This is the Slice D demo target.

Each gets: company overview, 5 MIDs, 10 recent "transactions" (synthetic), 3 "historical incidents" (from web-research failure modes), 5 memory entries in each of the 5 memory types.

---

## Summary — what to do this week

1. **Pick Path A (Claude Code skill).** It's the fastest path to something demoable.
2. **Run one `sc:research` pass** to pull ~50 public Fiserv + payments reference docs into `06-research/ingested/`.
3. **Build the 3 synthetic merchants** as memory seed files in `05-prototypes/synthetic-merchants/`.
4. **Write the first agent** (DocsAgent) system prompt and test it against 10 golden eval scenarios.
5. **Use `autoresearch-skill-improver`** to iterate on the agent prompt until the eval pass rate is >80%.
6. **Record the 5 demo scenarios** as screen captures so you can show the demo in any meeting without live-demoing.

See `demo-mvp.md` for the specific build plan.
