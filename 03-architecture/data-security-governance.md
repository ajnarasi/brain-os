# Data, Security, and AI Governance for the Fiserv Brain

**Scope:** The data, security, compliance, and governance playbook for deploying the Fiserv Brain inside Fiserv first (internal-facing for TAMs + solutions engineers + ops) and subsequently to external merchants as a productized service.

**Prompted by:** Three questions raised during the exec-brief pitch review — is "using Karpathy's Brain OS" okay, what are the risks, and how does Fiserv address them. This doc reframes the question and answers it systematically.

**Audience:** CISO, CPO, Privacy Office, Legal, Merchant Services GM, Clover GM, FI channel GM, plus the PM team building the Brain.

---

## 0. TL;DR

1. **There is no "Karpathy's BrainOS" product to license.** It's a design pattern published for free. Fiserv implements the pattern on whatever LLM infrastructure it chooses. Credit Karpathy intellectually; no vendor relationship exists.
2. **The real concern is which LLM endpoint touches Fiserv data.** The default assumption that "we'd be sending data to Anthropic" is only true if Fiserv points the Brain at Anthropic's public API. Bedrock, Azure OpenAI, and self-hosted alternatives all avoid that data flow while preserving model quality.
3. **Deploy internally before productizing to merchants.** You're right that Fiserv should analyze internal data first. Do it in a way that validates the data-governance playbook end-to-end — data classification, tokenization, memory boundaries, audit logs, kill switches — before a single external merchant is onboarded.
4. **Six risk buckets, roughly twenty specific risks.** Data exposure, prompt injection, model/system, legal/compliance, governance/operational, reputational. Each has a concrete mitigation.
5. **Eight architectural + process mitigations.** LLM procurement (Bedrock, not public API), data classification routing, tokenized memory boundaries, prompt injection defense, contract/legal playbook, cross-BU governance, phased deployment, and the reframe move in the pitch itself.
6. **When the CEO asks "is this safe," the answer isn't "we use Claude" — it's "we run on Bedrock with data classification, tokenized memory, HIPAA/PCI partition, and a cross-BU AI governance committee."** That answer is ten times more defensible.

---

## 1. Reframing the question

### The user's framing (what the pitch reviewer said)

> "If I deploy the Brain inside Fiserv first to analyze our data, I'm exposing Fiserv's proprietary data and all the internal mess to Claude's LLM, because Karpathy is using Claude to build this OS. How do I make sure using Karpathy's BrainOS is okay?"

### What's correct in that framing

- **Yes**, deploying any LLM-powered system against internal Fiserv data creates a data-flow question.
- **Yes**, the data involved includes proprietary Fiserv IP: ISO 8583 dialect extensions, Nashville/Omaha decline-code mappings, fraud rule configurations, TAM tribal knowledge, support ticket history, Clover operational telemetry, and potentially PCI/HIPAA-adjacent data.
- **Yes**, an exec reviewing this pitch will ask "who sees our data?" and the answer must be specific and defensible.

### What's incorrect in that framing

**"Karpathy's BrainOS" is not a product.** It's a design pattern Karpathy published as part of his work on long-running agent systems. He demonstrated one reference implementation inside Claude Code's auto-memory feature, which happens to run on Anthropic's Claude API. But the *pattern* is:

- Durable per-user memory split into distinct types (user / feedback / project / reference)
- Retrieval-over-memory at session start
- Tool-using agents that act on the memory + tools
- Write-back loops that compound memory over time
- "Verify before recommending" rule to guard against stale memory
- Binary eval-driven iteration (the autoresearch loop)

**None of this is proprietary to Anthropic.** You can implement the exact same pattern on GPT-5 via Azure OpenAI, on Llama 3.3 405B self-hosted on Fiserv's own GPUs, on Claude 4.6 via AWS Bedrock (Fiserv's AWS account), or on a hybrid. **The pattern is free; the LLM is swappable; the data governance is Fiserv's decision.**

### The real question, re-stated

> "When Fiserv runs an LLM-powered Brain against internal merchant-ops data, which LLM endpoint does that data flow to, how is the data classified and routed, and what governance applies?"

That's an enterprise AI governance question. The payments, banking, and healthcare industries have answered versions of this question dozens of times in the last 24 months. The playbook is well-established — it just hasn't been applied to Fiserv's Brain yet.

---

## 2. The risk inventory

Six buckets. Roughly twenty specific risks. Each tagged with a severity rating (H/M/L) from Fiserv's perspective.

### Bucket 1 — Data exposure

| # | Risk | Severity |
|---|---|:-:|
| 1.1 | **Third-party LLM data leakage.** If the production Brain calls Anthropic's public API, every prompt sends merchant data, TAM notes, ticket history, and potentially tokenized PAN references to Anthropic's infrastructure. Anthropic's enterprise offerings have zero-data-retention + no-training commitments, but these require specific contract paperwork — they're not the default. | H |
| 1.2 | **PCI scope expansion.** If the Brain ingests raw transaction data, its memory store enters PCI scope. PAN cannot be in memory; CVV can never be stored; SAD (Sensitive Authentication Data) must be stripped at ingestion. The vector DB + knowledge graph must be PCI-audited if they store anything derived from cardholder data. | H |
| 1.3 | **HIPAA scope (healthcare merchants).** Fiserv serves healthcare merchants via AccessOne, dental/vet clinics, and similar. PHI flowing through the same ingestion paths as non-HIPAA data is a HIPAA violation. HIPAA-scoped memory must be physically partitioned, never mixed with general retrieval, and served by a BAA-covered LLM. | H |
| 1.4 | **Cross-merchant data leakage via global memory.** The moment global feedback memory is built (lessons from merchant A surfacing in merchant B's Brain sessions), there's a real risk that identifying data bleeds across tenants. Anonymization + consent infrastructure is non-trivial and often done wrong on first implementation. | H |
| 1.5 | **Partner data restrictions.** Bank-channel and ISV-channel merchants have data-sharing agreements between Fiserv and the partner that predate LLMs. These agreements may prohibit using merchant data for AI purposes, or may not cover it at all — which is worse, legally. | M |
| 1.6 | **Employee/TAM PII + HR-sensitive content.** TAM notes contain employee names, merchant contact details, internal-only opinions, and sometimes information about disputes between Fiserv and its own employees. Legal sees this as HR-regulated. | M |
| 1.7 | **Proprietary IP exposure.** Fiserv's ISO 8583 dialect extensions, Nashville/Omaha decline-code internals, fraud-rule libraries, and processor-specific runbooks are trade secrets. Sending them to a third-party LLM for inference means a third party sees them (even with no-training, the request is processed by someone's infrastructure). | H |

### Bucket 2 — Prompt injection and adversarial

| # | Risk | Severity |
|---|---|:-:|
| 2.1 | **Indirect prompt injection from merchant data.** A malicious merchant (or a compromised merchant's system) injects hidden instructions into their own data fields (descriptor fields, ticket bodies, URLs). When the Brain ingests and acts on that data, the injected instructions hijack agent behavior. | H |
| 2.2 | **Cross-merchant indirect injection via global memory.** One compromised merchant's poisoned memory contaminates the global feedback memory and affects other merchants' Brain sessions. Detection is hard because the payload is latent. | M |
| 2.3 | **Agentic-action jailbreak.** If the Brain has agents that can open tickets, adjust fraud rules, submit disputes, or modify settlement configs, a successful jailbreak causes financially material damage. "Jailbreak" here includes both adversarial inputs and unintended edge-case behavior. | H |

### Bucket 3 — Model and system risks

| # | Risk | Severity |
|---|---|:-:|
| 3.1 | **Model drift / version risk.** Anthropic and OpenAI update model versions periodically. A prompt that worked on opus-4.6 may behave subtly differently on opus-4.7. Without version pinning + regression eval, behavior drifts silently in production. | M |
| 3.2 | **Hallucination in financially material responses.** An agent that confidently states an incorrect decline reason, dispute template, or fraud rule causes real monetary damage. Hallucinations look identical to correct answers in the UI. | H |
| 3.3 | **Denial of service via LLM vendor outage.** If the production Brain depends on one LLM vendor and that vendor has an outage, Fiserv's merchant-ops surface goes down. Multi-vendor fallback is non-trivial because prompts don't transfer cleanly. | M |
| 3.4 | **Supplier lock-in on prompt format.** If the Brain's prompts + tool schemas are tightly coupled to one vendor's format (Claude's XML tool-use, OpenAI's JSON function-calling), switching vendors later is a months-long re-engineering effort. | L |

### Bucket 4 — Legal and compliance

| # | Risk | Severity |
|---|---|:-:|
| 4.1 | **SOC 2 / ISO 27001 audit scope expansion.** Any new third-party data processor expands audit scope. Every data flow must be documented, every subprocessor listed, every data-residency decision justified. | M |
| 4.2 | **GDPR / state privacy laws.** Personal data of EU cardholders, California residents, or other protected-jurisdiction customers flowing through a US-hosted LLM provider triggers cross-border transfer rules. Legal review is mandatory. | M |
| 4.3 | **Discovery in litigation.** LLM prompts, retrievals, and responses can become discoverable in litigation. If the Brain drafts a dispute response or narrates an incident, those outputs are evidence. Retention policies must be defensible. | M |
| 4.4 | **Class-action exposure from bad advice.** Ironically, a Brain deployed to "solve the retention problem" could create new liability if it gives bad advice that hurts merchants. The same securities-class-action exposure that motivates the Brain could come back via a different vector. | M |
| 4.5 | **Contractual issues with existing merchants.** Current merchant contracts may not permit Fiserv to use operational data for AI. Re-papering is a 6–12 month legal project. | M |

### Bucket 5 — Governance and operational

| # | Risk | Severity |
|---|---|:-:|
| 5.1 | **Unclear ownership of Brain mistakes.** If the Brain auto-submits a dispute and loses, or adjusts a fraud rule and causes false declines, who is accountable? Fiserv, the merchant, the LLM vendor? Needs to be written down before deployment, not after an incident. | H |
| 5.2 | **Auditability of agentic decisions.** Every action must be reconstructable: which prompt + which retrieval + which model version + which memory snapshot produced this action. "Vibes-based" logging won't survive an audit. | M |
| 5.3 | **Change management for prompt updates.** Updating an agent prompt is a production change. Needs a review + eval-gated process + rollback plan. Current engineering cultures treat prompts as config, not code. | M |

### Bucket 6 — Reputational

| # | Risk | Severity |
|---|---|:-:|
| 6.1 | **Biased or offensive output on a merchant surface.** Brand damage hits Fiserv, not the LLM vendor. Even one screenshot going viral on social media causes disproportionate reputational harm. | M |
| 6.2 | **Market perception of AI risk.** Wall Street is still calibrating AI risk into bank-tech multiples. A Fiserv AI incident (even a minor one) could depress stock more than the underlying operational impact justifies. | M |

**Net: 7 High, 11 Medium, 2 Low.** This is manageable with the mitigation playbook below. It's not a greenfield problem — every pattern here has a known solution.

---

## 3. The mitigation playbook — eight patterns

### Pattern A — LLM procurement: Bedrock or Azure OpenAI, not the public API

**The single biggest decision.** Where does the LLM run?

| Option | Data flow | Model quality | Governance maturity | Recommendation |
|---|---|:-:|:-:|---|
| **Anthropic public API** | To Anthropic | Top tier | Enterprise options available but require paperwork | ❌ Not for production |
| **Anthropic Claude via AWS Bedrock** | Stays in Fiserv's AWS account | Top tier | AWS's existing BAAs, HIPAA/PCI eligible, IAM + VPC integration | ✅ **Primary** |
| **OpenAI GPT via Azure OpenAI** | Stays in Fiserv's Azure tenant | Top tier | Similar story — existing enterprise paperwork | ✅ Secondary / fallback |
| **Self-hosted open-weight** (Llama 3.3 405B, Mistral Large 3, Qwen 3, DeepSeek) | Never leaves Fiserv | Slightly below frontier | Full control; full operational burden | ✅ For highest-sensitivity paths |
| **Hybrid router** | Per-request decision | Best-of-both | Most complex governance | ✅ **Target end-state** |

**Recommended target architecture:**

1. **Bedrock Claude for most Brain traffic** — most agents, most merchants, non-sensitive data paths. Fast path to production with enterprise-grade data governance.
2. **Self-hosted open-weight for PCI/HIPAA paths** — anything touching cardholder data or healthcare PHI runs on Fiserv-hosted models. Slightly worse quality is an acceptable trade for zero third-party exposure.
3. **Hybrid router as the long-term goal** — a classifier at the Brain's orchestration layer (Layer 6 in `system-overview.md`) routes each request to the right LLM based on data classification.

**The insight most execs miss:** you don't have to choose between "Claude" and "safe." Bedrock gives you both. The contract, IAM, audit logging, and data residency are all Fiserv's.

### Pattern B — Data classification and routing

Build a classifier at the ingestion boundary (Layer 1 of the architecture) that tags every input before it enters the memory store or reaches the LLM:

| Tier | What it contains | LLM allowed | Memory partition |
|---|---|---|---|
| **T0 — Public** | Public docs, KB articles, published specs, public incident pages | Any LLM, including public API | General memory |
| **T1 — Internal business** | TAM notes, ticket history, decline-code mappings, fraud rules, merchant support calls | Bedrock / Azure OpenAI only | General memory (encrypted) |
| **T2 — PCI-scoped** | Anything touching PAN, CVV, SAD, or derivative data that could re-identify cardholders | Self-hosted only OR Bedrock with PCI-audited config | PCI-isolated vector store |
| **T3 — HIPAA-scoped** | Healthcare merchant data, PHI-adjacent content, insurance claim details | Self-hosted in HIPAA-BAA'd environment only | HIPAA-isolated partition |
| **T4 — Cross-border regulated** | EU cardholder data, California resident data, other jurisdictional PII | Regional LLM infrastructure only | Regional partition |

The router enforces the tier before every LLM call. Tier-mismatch = hard reject, logged as a security event.

### Pattern C — Tokenized memory boundaries and PCI scoping

- **Tokenization at ingestion.** Every transaction entering the Brain passes through a tokenizer. PAN becomes a network token (same tokens used in CommerceHub + Clover). CVV and full SAD are dropped. References to transactions use tokens exclusively.
- **Per-merchant memory partitions.** Merchant A's memory lives in its own namespace. Cross-merchant retrieval is disabled by default at the orchestration layer.
- **Global memory is pattern-only, not instance-specific.** Lessons that generalize (e.g., "Klarna webhook idempotency TTL must be ≥35 days") can enter global memory only after an anonymization + pattern-extraction pipeline strips merchant-identifying content AND the source merchant explicitly consents.
- **HIPAA-scoped memory is physically separated.** Not just logically partitioned — physically. Different vector store, different LLM endpoint, different audit stream, different retrieval pipeline. Never retrieves into a general Brain session.
- **Audit log of every retrieval.** Who asked, what was retrieved, which LLM answered, which model version, what was returned, what memory entries were touched. Discoverable, auditable, retention-policy-aware.

### Pattern D — Prompt injection defense

Prompt injection is the single biggest adversarial risk for any LLM-powered system in 2026. Defenses are layered:

- **Content scanning at ingestion.** Before merchant data enters memory, scan for embedded instructions (patterns like "ignore previous instructions," hidden markdown, unusual Unicode). Reject obvious injection payloads; quarantine suspicious ones for human review.
- **Spotlighting + delimiting.** In every prompt, distinguish `[SYSTEM]` instructions from `[USER_DATA]` with markup. Train (or prompt) the LLM to treat user data as data only, never as commands.
- **Agent privilege separation.** Read-only agents have no action-tool access. Action-capable agents have tightly-scoped tool sets with pre-approved parameters. No single agent has both broad retrieval and broad action capability.
- **Human-in-loop gates on every financially material action.** Year 1: no autonomous submissions, ever. Year 2: pre-approved action envelopes per merchant tier, with eval-tested boundaries.
- **Secondary review model.** A cheaper second LLM instance reviews the primary LLM's output before it reaches the merchant or executes an action. Acts as a sanity check. Catches blatant injection success.
- **Red-team the Brain regularly.** Dedicated red team runs adversarial tests (industry-standard methodology: PyRIT, Garak, or custom internal tooling) against every agent before release and on a monthly basis in production.

### Pattern E — Contract and legal playbook

- **Sign a BAA / DPA with the LLM provider.** AWS Bedrock HIPAA BAA + PCI eligibility is standard paperwork; Fiserv's existing AWS contract likely covers it with an amendment.
- **Re-paper merchant contracts for AI consent.** Start with new merchant contracts (add AI-use clauses to the standard MSA). For existing merchants, do a phased re-paper starting with Slice A/B pilot cohorts. This is a 6–12 month legal project; start now.
- **Add AI clauses to partner agreements.** Bank-channel and ISV-channel partners need explicit consent for their merchants' data to flow into the Brain. Reuse the partner-memory framework from `memory-layers.md` — the partner consent data itself becomes partner memory.
- **Indemnification carve-outs.** LLM vendor indemnification does not cover Fiserv's downstream liability to merchants. Negotiate specific carve-outs or accept the residual risk explicitly.
- **Data retention + deletion policy.** Brain prompts, retrievals, responses, and memory write-backs need a defensible retention policy. Consider separate retention for audit logs (7 years, common bank standard) vs. prompt bodies (30–90 days).
- **Right to be forgotten.** If a merchant churns, their memory gets deleted on a documented schedule (not "eventually" or "on request" — specific SLA).

### Pattern F — Governance and change control

- **Cross-BU AI Governance Committee.** Merchant Services, Clover, Financial Institutions, Security, Legal, Compliance, Privacy, Enterprise Risk — all represented. Meets weekly during pilot, monthly at scale. Chartered with: (a) approving tier-1+ data flows, (b) approving agent prompt changes that touch production, (c) reviewing incident reports, (d) signing off on new LLM vendors.
- **Prompt change control as code.** Every agent prompt update goes through: PR → eval suite regression test → committee review if touching tier-2+ data → deploy gated behind a feature flag → canary on 1% → full rollout. Exactly the same process as production code.
- **Model version pinning.** Production Brain pins specific model versions (e.g., `claude-opus-4-6-20260215` not `claude-opus-latest`). Upgrading is a release event with regression testing, not automatic.
- **Incident response playbook.** Named on-call, defined escalation (Committee → CPO → CEO for high-severity), defined rollback procedure. Drill it quarterly.
- **Kill switches at multiple layers.** Every agent has a tool-access kill switch. Every LLM endpoint has a traffic kill switch. Every memory partition has a freeze toggle. All of these are controllable without a code deploy, in < 5 minutes, by on-call engineers.
- **Monthly red-team + quarterly external pen test** specifically targeting the Brain's attack surface.

### Pattern G — Internal-first deployment sequence

**This is where the user's original instinct is exactly right.** Deploy inside Fiserv first, before external merchants. Do it in the following order:

| Phase | Users | Data flow | LLM | Purpose |
|---|---|---|---|---|
| **Phase 0 — Dev sandbox** | Brain PM + 4 engineers | Synthetic data only (what's in `synthetic-merchants/`) | Anthropic public API with zero-data-retention | Prototype velocity. No real data = no risk. |
| **Phase 1 — Internal TAM pilot** | 10 volunteer Fiserv TAMs | Real anonymized ticket history + TAM notes. Tier-1 only. | **Bedrock Claude** | Validate that the Brain answers correctly against real operational data. Employees consent in-contract. Internal to Fiserv, so no partner-consent issue. |
| **Phase 2 — Internal operations pilot** | TAMs + solutions engineers + internal ops | Real cross-BU operational data. Still tier-1 only. PCI-touching data routed through classification layer. | Bedrock primary, self-hosted for PCI paths | Validate the data-classification router. Validate cross-BU data sharing under governance. First real governance committee review. |
| **Phase 3 — Closed merchant beta (Slice A + Slice B)** | 3 fashion brands + 25 Clover restaurants | Real merchant data with explicit consent. PCI + operational. | Bedrock + self-hosted hybrid | External deployment with a small, consent-clear cohort. First external incident response drill. |
| **Phase 4 — Open merchant launch** | General merchant availability | Full data flow under governance | Hybrid | Full production. Only after Phase 3 validated everything. |

**The beautiful thing about Phase 1:** you don't need to solve every data-governance problem before you start. You need to solve them for Phase 1, which has a much smaller surface (employees, not merchants; anonymized, not raw; one BU, not three). Each subsequent phase adds complexity in controlled chunks.

### Pattern H — The pitch reframe

When the CEO or CPO asks "is this safe?" the worst answer is **"we use Claude, and Claude is safe."** That's not an answer — it's a brand statement.

The good answer is:

> *"The Brain runs on AWS Bedrock inside our existing AWS account, so merchant data never leaves Fiserv's infrastructure. Before any prompt reaches an LLM, every input passes through a data classifier that routes PCI-scoped content to a self-hosted model and HIPAA-scoped content to a separate partition. Memory is per-merchant by default, tokenized at the boundary so PAN never enters the store, and globally-shared memory only contains anonymized patterns that the source merchant consented to share. Every agent has a kill switch. Every financially material action requires human-in-loop approval in Year 1. A cross-BU AI Governance Committee reviews every production change. And the whole stack is deployed internally first — to Fiserv TAMs and solutions engineers — for 90 days before a single external merchant is onboarded. Here's the architecture diagram."*

**That's a ten-times-more-defensible answer.** It survives the next "is this safe?" question, and the one after that, and an audit, and Wall Street. It turns a vague worry into a specific set of controls the exec can reference.

---

## 4. When the CPO asks a specific question — ready answers

### "What if Anthropic has a breach?"
We're on Bedrock. Fiserv's data is in our AWS account, not Anthropic's infrastructure. A breach at Anthropic does not expose our data. An AWS breach would expose it — and AWS's security posture already underpins $XXX million of our existing infrastructure.

### "What if the Brain hallucinates and gives a merchant bad advice?"
Year 1 has no autonomous merchant-facing actions. Every financially material output is draft-only, human-reviewed, and logged. Hallucination risk exists but is bounded by the draft-only gate. Year 2 introduces pre-approved action envelopes per merchant tier, with eval-tested boundaries and secondary review model checking outputs before they're shown to merchants.

### "What if a merchant injects malicious instructions into their data?"
Input scanning at the ingestion boundary, spotlighting in every prompt, agent privilege separation (no agent has both broad retrieval and broad action), and a secondary review model. Plus monthly red-teaming specifically for prompt injection. Not zero risk, but significantly below the threshold at which it's a blocker.

### "What's our liability if the Brain causes damage?"
Governance-committee-approved actions are covered under existing operational insurance. Unapproved or autonomous actions are specifically carved out (they can't happen in Year 1 by design). Merchant contracts include AI-use clauses and limitation of liability consistent with existing merchant MSA terms.

### "Can we un-ship this if it goes wrong?"
Every agent has a kill switch. Every memory partition can be frozen. Every LLM endpoint has a traffic cut-off. All controllable in under 5 minutes without a code deploy. Monthly drilled. Full shutdown of the Brain is a 30-minute procedure.

### "Why Bedrock instead of building our own?"
Time-to-market. Self-hosted frontier models are 2–3 generations behind on capability, and the ops burden (inference cluster, safety tuning, red-teaming) adds 6–12 months to pilot timelines with no business upside. Bedrock gives us top-tier models with our data staying in our VPC. We DO self-host for PCI/HIPAA paths specifically, where the data-sensitivity trade justifies the capability gap.

### "What if regulators ask about our AI use?"
We have a documented governance committee, data classification scheme, audit logs, incident response playbook, and a phased-deployment record. Every one of those artifacts is regulator-ready. We are ahead of most peers, not behind.

---

## 5. Appendix — LLM supplier comparison

Fuller comparison than the table in Pattern A.

### Anthropic Claude via AWS Bedrock — primary

- **Data flow:** Requests go to Bedrock's inference endpoints which run in Fiserv's AWS account region. Anthropic receives no prompts or outputs. AWS has HIPAA BAA coverage + PCI eligibility.
- **Model quality:** Frontier. Current Claude Opus 4.6 with 1M context window. Tool-use + vision + structured output all supported.
- **Governance maturity:** Highest of any frontier vendor. IAM integration, CloudTrail audit logs, VPC endpoints, KMS encryption at rest and in transit, data residency controls.
- **Cost:** Higher than public API (Bedrock has a multiplier) but not meaningfully — for a pilot-scale deployment, cost is not the deciding factor.
- **Lock-in risk:** Medium. Claude's XML-style tool use is somewhat unique; prompts don't transfer cleanly to GPT or Llama. Mitigable with a thin abstraction layer.

### OpenAI GPT via Azure OpenAI — fallback / secondary

- **Data flow:** Requests stay in Fiserv's Azure tenant. OpenAI receives no data. Azure has HIPAA BAA + PCI eligibility.
- **Model quality:** Frontier. Current GPT-6 equivalent. Comparable to Claude Opus for most tasks.
- **Governance maturity:** Very high. Microsoft's enterprise AI governance tooling is arguably the most mature of any vendor.
- **Cost:** Similar to Bedrock.
- **Lock-in risk:** Similar. GPT's JSON function-calling is a different paradigm from Claude; prompts need rewriting.

### Self-hosted open-weight models — for highest-sensitivity paths

- **Options:** Llama 3.3 405B (Meta), Mistral Large 3 (Mistral), Qwen 3 72B (Alibaba — requires additional due diligence given Chinese origin), DeepSeek V4 (similar), specialized fine-tunes of any of the above.
- **Data flow:** Never leaves Fiserv. Full control.
- **Model quality:** 0.5–1 generation behind frontier for complex reasoning; acceptable for structured retrieval + drafting tasks.
- **Governance maturity:** Whatever Fiserv builds. Zero dependencies on third-party AI vendors (AWS/Azure still involved for infrastructure if cloud-hosted).
- **Cost:** High upfront infrastructure investment. Ongoing inference cost is actually lower per token at scale, but only at scale.
- **Lock-in risk:** Low. Open-weight models are swappable.

### Hybrid routing — target end state

- **How it works:** Classifier at the Brain's orchestration layer inspects each incoming request, tags it with data sensitivity, and routes to the appropriate LLM:
  - Tier 0 (public docs Q&A): any model, optimized for cost
  - Tier 1 (internal ops data): Bedrock Claude primary, Azure GPT fallback
  - Tier 2 (PCI-scoped): self-hosted Llama on Fiserv GPUs
  - Tier 3 (HIPAA-scoped): self-hosted in HIPAA-BAA'd environment
  - Tier 4 (EU data): region-specific endpoint
- **Benefit:** Best-of-both quality/control per data class.
- **Cost:** Highest operational complexity. Worth it for a production-scale deployment; overkill for Phase 1.

---

## 6. What to do this week

1. **Confirm Bedrock is in the current AWS contract.** If not, start the amendment. 1 week of legal work.
2. **Draft a one-page AI governance charter** for the cross-BU committee. Circulate to CISO, CPO, Privacy Office, Legal for sign-off. 1 week.
3. **Write the Phase 1 internal-TAM pilot spec.** 10 volunteer TAMs, tier-1 data only, 90 days, specific success metrics. 2 weeks.
4. **Draft the data classification rubric.** Five tiers, concrete examples of each, routing table. 1 week.
5. **Begin re-papering language** for new merchant contracts (AI-use clause). Legal + Procurement. 2 weeks for language, 3–6 months to adopt across all tiers.

None of this is blocked on anything. None of it requires exec sign-off to start drafting. All of it becomes the evidence base for the CPO conversation.

---

## 7. The one-sentence summary

**You're not deploying Karpathy's product — you're implementing a public design pattern on Fiserv-controlled infrastructure with an enterprise-grade data governance stack, and the right first step is an internal TAM pilot on Bedrock while the governance committee and data-classification router get built in parallel.**
