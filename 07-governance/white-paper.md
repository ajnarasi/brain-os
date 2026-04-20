---
document: The Fiserv Brain — A Per-Merchant Second Brain for Fiserv's Merchant Ecosystem
subtitle: A compound-AI architecture for integration acceleration, operational narrative, and merchant retention
authors:
  - Ajay Narasimma (Senior Lead PM, Global APMs & Checkout Solutions)
version: v1.0.1
prior_versions:
  - v1.0 (2026-04-14) — initial draft
  - v1.0.1 (2026-04-14) — spec-panel Immediate fixes (§3.4 SMART rewrite, §7.2 QSA gate, §7.3 Bedrock config list, §8 CI + judge diversity + inline G/W/T + regression policy)
date: 2026-04-14
status: internal working draft, pre-governance-committee review
classification: Fiserv Internal Use Only
pages: ~25
companion_docs:
  - 05-prototypes/exec-brief/index.html
  - 03-architecture/data-security-governance.md
  - 07-governance/committee-charter.md
---

# The Fiserv Brain — A Per-Merchant Second Brain for Fiserv's Merchant Ecosystem

**A compound-AI architecture for integration acceleration, operational narrative, and merchant retention.**

*Ajay Narasimma · Senior Lead PM, Global APMs & Checkout Solutions*
*April 2026 · v1.0 · Fiserv Internal Use Only*

---

## Abstract

Fiserv's largest merchant-loss vector is not pricing. It is friction — integration friction during onboarding, launch blindness during go-live, and operational toil across the long tail of steady-state operations. The September 2025 Payeezy-to-Clover securities class action made this retention problem public, costing Fiserv an 18.5 percent stock drop in a single day and reframing merchant churn as a Wall Street issue. This paper proposes the **Fiserv Brain**: a per-merchant compound-AI system that productizes Fiserv's tribal knowledge — runbooks, solutions-engineering notes, processor specs, dispute templates, TAM interaction history — into a durable, writable memory layer fused with a retrieval system and a catalog of narrow agents. Unlike existing payments-AI offerings from Stripe, Adyen, and Block, the proposed architecture is **channel-aware and platform-aware**, recognizing that Fiserv's structural advantage is the diversity of how merchants arrive (direct, bank, ISV, ISO, PayFac, marketplace, franchise) and which Fiserv product stacks they run on (Clover, CommerceHub, IPG, Carat, Optis, SnapPay over Nashville, Omaha, Buypass, STAR/NYCE, TeleCheck, ValueLink). We describe a five-axis segmentation model, a seven-layer architecture, a five-memory-type schema that extends Karpathy's Second Brain OS pattern with a Fiserv-specific partner-memory type, and a phased deployment strategy that validates the data-governance playbook on internal Fiserv users before exposing the Brain to external merchants. We argue that the Brain's defensibility comes not from any single model or prompt but from the compounding of per-merchant memory — a moat no competitor can clone in less than the time it takes the memory to accumulate. We conclude with projections of +200 to +400 basis points of net revenue retention lift on merchants using the Brain, a 10-fold increase in TAM coverage leverage, and a direct SaaS ARR ceiling of $1.0 to $1.4 billion across the addressable base, in addition to channel-partner revenue-share and NRR lift on the existing ARR book.

**Keywords:** compound AI, retrieval-augmented generation, per-merchant memory, agentic systems, payments, merchant retention, data governance, channel-aware architecture, Karpathy Second Brain, Fiserv, Bedrock, prompt injection defense, PCI DSS, HIPAA.

---

## 1. Introduction

The payments industry spent the 2020s commoditizing the bottom of its own stack. Acquiring is a commodity. Gateways are commodities. Fraud tooling and payment orchestration are converging commodities. The only operational layer where margin still lives — and where competitive differentiation is still possible — is the **merchant operational layer**: the human work of integrating, launching, supporting, and optimizing each merchant's specific payments configuration. That layer is labor-intensive, tribal, and under-productized. Fiserv's TAMs and solutions engineers know things about Clover restaurants and CommerceHub mid-market retailers that have never been written down in any searchable system. When a TAM retires or leaves, their merchants lose institutional memory. When a new merchant onboards, the learning curve resets. This is what we refer to as the **knowledge-asymmetry tax**: every merchant pays it, every TAM absorbs part of it, and every quarter it compounds into retention bleed.

The September 2025 Payeezy-to-Clover securities class action brought this bleed into public view. Court filings allege that Fiserv forcibly migrated approximately 200,000 Payeezy merchants to Clover and concealed churn to Square and Toast from investors, triggering an 18.5 percent stock drop on April 24, 2025. The market's interpretation was unambiguous: Fiserv's retention problem is real, it is substantial, and it is operational rather than commercial. Pricing cuts will not fix it. Promotional discounts will not fix it. Only a reduction in per-merchant friction — across integration, go-live, and steady-state operations — will fix it.

This paper proposes one such reduction. We describe the **Fiserv Brain**: a per-merchant second brain built on the compound-AI pattern articulated by Andrej Karpathy in his Second Brain Operating System work and extended with three Fiserv-specific components: a fifth memory type (partner memory) capturing the merchant's channel relationship, a five-axis segmentation model (size × channel × vertical × business model × Fiserv platform), and a platform-aware ingestion layer that reconciles data across Nashville, Omaha, Buypass, STAR/NYCE, ValueLink, and TeleCheck for merchants whose operational reality spans multiple back-ends.

The rest of this paper proceeds as follows. Section 2 reviews related work and clarifies the distinction between the Brain and Karpathy's pattern. Section 3 articulates the problem statement in detail. Section 4 describes the proposed seven-layer architecture. Section 5 explains why the Brain is a compound-AI system rather than a single trained model, and why the word "training" is misleading in this context. Section 6 presents the five-axis segmentation model. Section 7 covers data governance, security, and regulatory compliance, including the prompt injection defense, the five-tier data classification rubric, and the LLM procurement strategy. Section 8 describes the evaluation methodology we used to validate the first pass of the Brain. Section 9 proposes a phased deployment strategy. Section 10 projects business impact. Section 11 details the risk analysis. Section 12 outlines future work. Section 13 concludes. References and an appendix follow.

---

## 2. Background and Related Work

### 2.1 Compound AI systems

The term "compound AI system" refers to architectures in which multiple components — retrieval, memory, tools, agents, orchestration — work together to produce behavior that exceeds what any single language model can produce alone. Zaharia et al. (2024) articulated the general pattern, and the Berkeley AI Research group has since published several reference designs. The Fiserv Brain is a compound AI system in this sense. It does not rely on a single model or a single prompt; it is a pipeline with multiple failure modes, multiple governance gates, and multiple levers for iteration. The distinction matters because "training a compound AI system" is not a single activity — it is five parallel curation loops described in Section 5.

### 2.2 Karpathy's Second Brain Operating System

Andrej Karpathy's Second Brain Operating System (SBOS) is a design pattern for durable, per-user memory layers used by long-running agents. The pattern has four memory types: **user memory** (who the user is), **feedback memory** (rules learned from past interactions), **project memory** (in-flight initiatives), and **reference memory** (pointers to external resources). Karpathy implemented one reference version of the SBOS inside Claude Code's auto-memory feature, which runs on Anthropic's Claude API. It is important to note — and we will return to this in Section 7 — that **the SBOS is a pattern, not a product**. There is no Karpathy vendor; there is no licensing; there is no exclusive dependency on Claude. Fiserv is free to implement the pattern on any LLM infrastructure, and indeed the right production choice for Fiserv is not Anthropic's public API (see Section 7.3).

### 2.3 Existing payments AI

Stripe ships Docs AI and Sigma; Adyen has piloted Copilot for enterprise customers; Block has AI features across the Square and Cash App product lines. All three share a structural limitation: they are **single-channel**. Stripe's AI only serves merchants who arrived through Stripe's direct-sales or self-service funnel. Adyen's only serves direct-enterprise customers. Block's only serves merchants inside Square's or Cash App's walled garden. None of them are equipped to serve a merchant who arrived through a bank partner, or through a Clover ISV, or through an ISO residual agreement. None of them have the back-end diversity to reconcile a Buypass fuel transaction with a Nashville QSR purchase at the same c-store in the same second. **This is Fiserv's opportunity.** The Brain's channel-awareness (Section 6.2) and platform-awareness (Section 6.5) are not incremental features; they are structural advantages no competitor can replicate in under 18 to 24 months.

### 2.4 Prompt engineering and eval-driven iteration

The "training" of compound AI systems is increasingly dominated by evaluation-driven prompt iteration rather than gradient descent. Karpathy's autoresearch repository (github.com/karpathy/autoresearch) documents a loop in which a target file is modified against a binary eval harness, improvements are committed to git, regressions are reverted automatically, and the loop runs continuously until a target pass rate is achieved. We adapt this loop for the Brain's agent system prompts in Section 8.

---

## 3. Problem Statement

### 3.1 The retention bleed

Fiserv's merchant retention problem has three distinct components, each corresponding to a different phase of the merchant lifecycle:

- **Integration friction.** Every new Fiserv merchant must absorb a body of technical knowledge — API documentation, ISO 8583 dialect idiosyncrasies, fraud-rule defaults, webhook retry semantics — that has been absorbed before by hundreds of other Fiserv merchants. The knowledge is not shared. Each merchant re-learns it from scratch, typically by filing support tickets, waiting for TAM responses, and executing trial-and-error sandbox sequences. Mid-market merchants take between 60 and 120 days from contract signature to first production transaction; this duration is almost entirely composed of re-learned lessons.
- **Launch blindness.** The first 72 hours of production traffic are the highest-risk window in a merchant's lifecycle, yet most merchants have no monitoring capable of detecting subtle anomalies against a sandbox baseline. Issues are typically surfaced by end customers (via complaints or chargebacks) rather than by Fiserv or the merchant's own systems. By the time a TAM is aware, the reputational and financial damage is already in motion.
- **Operational toil.** Over the long tail of the merchant relationship, a steady stream of low-value repetitive questions consumes TAM and support capacity. A merchant asks why a specific transaction declined, and a TAM reads the ISO 8583 response code and translates it into plain English. The same question, from a different merchant, is translated the same way the next day. The translation is labor that could compound if captured.

### 3.2 Knowledge asymmetry as a tax

We model this collectively as a **knowledge-asymmetry tax**. Every Fiserv merchant pays it in the form of elongated integrations, avoidable incidents, and support-ticket volume. Fiserv pays it in the form of TAM labor, retention loss, and brand damage. The tax has been tolerable historically because there was no credible architecture for productizing the tribal knowledge it reflects. Compound AI systems with durable memory change that calculus.

### 3.3 Why existing solutions do not solve this

Three categories of existing solutions have failed to address the retention bleed:

1. **More documentation.** Fiserv has invested heavily in developer documentation for every product. The documentation is extensive, accurate, and under-used. Developers do not read documentation; they read Stack Overflow and other developers' implementations. Documentation is necessary but not sufficient.
2. **More TAMs.** Fiserv cannot scale TAM coverage linearly with merchant count. TAMs are scarce, expensive, and cannot be hired at the velocity that merchant growth demands. Moreover, TAMs are not distributed evenly across the merchant base — mid-market and enterprise merchants get dedicated coverage; SMB merchants get general-pool support. The tax is highest in the tier with the thinnest coverage.
3. **Point-solution AI products.** Fiserv has evaluated several third-party AI tools for specific operational tasks (chargeback management, fraud explanation, docs Q&A). Each one is useful in its lane but none of them share state with each other or with Fiserv's internal systems. A merchant using four point solutions gets four narrow answers; the Brain gives one integrated answer drawn from a unified memory.

### 3.4 What a solution must be

To solve the retention bleed, the proposed system shall satisfy seven criteria, each stated as a testable SMART requirement with a measurable threshold, a named test instrument, and a forward-link to its enforcement surface. These are the acceptance gates the AI Governance Committee will evaluate before approving any phase transition in Section 9.

1. **Per-merchant memory retention.** The system shall retain ≥ 95% of interaction-derived facts across a rolling 90-day window, measured by F1 score on a locked recall test set of 200 facts per merchant. Stale facts (> 90 days without re-verification) shall be re-surfaced for confirmation before reuse. *Instrument:* locked recall set + Section 8 eval harness.
2. **Cross-phase coverage.** The system shall answer a benchmark set of 20 integrate-phase questions, 20 go-live-phase questions, and 20 operate-phase questions per synthetic merchant persona (60 per persona, 180 total), achieving ≥ 90% pass on each phase under the Section 8 eval harness. *Instrument:* phase benchmark × 3 personas.
3. **Channel and platform awareness.** The system shall correctly identify channel of origin (8 channels) and Fiserv platform stack (front-end and back-end) for ≥ 98% of a test set of 500 merchants, and shall route prompts and brand surfaces appropriately for each channel without human override. *Instrument:* 500-merchant channel/platform classification test set.
4. **Multi-back-end reconciliation.** For the NorthGate persona (Slice D) with traffic across Nashville, Buypass, STAR/NYCE, ValueLink, and TeleCheck, the system shall produce a unified daily-close narrative within 30 minutes of the last transaction clearing, with reconciliation accuracy ≥ 99.5% against the back-end authoritative reports. *Instrument:* daily-close reconciliation delta audit.
5. **Regulatory compliance (measurable).** Zero Tier-2 (PCI) or Tier-3 (HIPAA) data shall appear in any Tier-0 or Tier-1 retrieval result in production, verified by a daily automated scan over a rolling 30-day window and signed off by the tokenization boundary QSA per Section 7.2. *Instrument:* daily tier-leakage scan + QSA written attestation.
6. **Governance gate coverage.** 100% of phase transitions in the Section 9 deployment sequence shall require documented AI Governance Committee approval with quorum met (5 of 9 voting members, per the charter in `07-governance/committee-charter.md`). 100% of financially material agent actions in Year 1 shall route through a human-in-the-loop gate with an auditable approval trail. *Instrument:* committee decision log + H-I-L approval audit trail.
7. **Economic defensibility (measurable).** The system shall accumulate ≥ 180 days of per-merchant memory before any Phase 4 general availability launch, such that any competitor attempting to replicate the behavior would face a minimum 6-month cold-start penalty on every new merchant, independent of model quality. *Instrument:* memory-age histogram across the GA cohort.

The Fiserv Brain is the proposed system to meet all seven. Each criterion maps to specific acceptance tests in the Section 8 eval harness (v2, in development) and to specific phase gates in Section 9.

---

## 4. Proposed Architecture

We propose a **seven-layer compound-AI architecture** for the Brain, summarized here and specified in detail in `03-architecture/system-overview.md`.

| # | Layer | Responsibility |
|---|---|---|
| 1 | Ingestion | Platform-aware parsers for every Fiserv back-end (Nashville, Omaha, Buypass, STAR/NYCE, TeleCheck, ValueLink), plus batch ingestion of KB, runbooks, TAM notes, support tickets. All ingestion passes through a data classifier (see Section 7.1) before entering downstream layers. |
| 2 | Knowledge graph | Canonical entity model: Merchant, MID, Terminal, Location, Transaction, Dispute, Settlement, Incident, Runbook, Partner, Platform. Supports path queries ("what connects to what") that flat tables cannot answer efficiently. |
| 3 | Memory store | Five memory types (user, feedback, project, reference, partner) per merchant, plus anonymized global memory for cross-merchant pattern reuse under consent. Memory is writable by the merchant, freshness-tracked, and physically partitioned by PCI and HIPAA scope. |
| 4 | Retrieval | Hybrid lexical + vector + graph traversal. Every retrieved piece of content is time-stamped and confidence-rated; stale memory is flagged for re-verification before it is surfaced to an agent. |
| 5 | Agent layer | Narrow agents with tightly scoped tool sets: DocsAgent, IntegrationAgent, LaunchAgent, OpsAgent, IncidentAgent, DisputeAgent. Each agent has its own system prompt, its own tool permissions, its own human-in-loop gates, and its own eval harness. |
| 6 | Orchestration | Routes each merchant interaction to the appropriate agent or multi-agent play. Enforces channel-aware behavior (a bank-channel merchant gets different routing from a direct merchant). Enforces human-in-loop gates on every financially material action. Hosts the kill switches. |
| 7 | Surface | Where the merchant sees the Brain: Fiserv merchant portal (direct), Clover app (ISV), bank merchant portal (white-label), ISV embed (third-party), Slack/Teams connector (ops teams), API (PayFacs and enterprise). Each surface inherits the governance contract appropriate to its channel. |

The architecture's defining property is that **each layer is independently replaceable**. The Brain does not depend on a single LLM vendor, a single vector store, a single orchestration framework, or a single UI. Every choice at every layer can be swapped without rewriting the layers above or below. This is a deliberate hedge against vendor lock-in and against model drift.

---

## 5. The Brain is a Compound System, Not a Trained Model

A recurring misunderstanding is that the Brain will be "trained" in the machine-learning sense, implying gradient descent over labeled examples, a training/validation/test split, and a fine-tuned model. This framing is incorrect and misleading.

The Brain is a compound AI system. Its behavior is shaped by **five parallel curation loops**, none of which involve gradient descent:

1. **Retrieval corpus curation.** The single largest lever. The Brain answers from whatever is in its corpus; a better corpus produces better answers. Curation means selecting, tagging, deduplicating, and refreshing the documents, runbooks, TAM notes, and support ticket histories that the retrieval layer indexes.
2. **Agent system prompt iteration.** Each narrow agent has a system prompt that governs its behavior. Prompts are iterated against a binary eval harness (Section 8) until a target pass rate is achieved. This is the Karpathy autoresearch pattern applied to the agent layer.
3. **Per-merchant memory seeding.** New merchants start with default memory shapes that are refined as interactions compound. Seeding matters for cold-start performance.
4. **Feedback loops and golden datasets.** Every merchant interaction is a data point. Every resolved support ticket can become a feedback-memory entry. Every dispute outcome updates the dispute-template win-rate tracker. These feedback loops are not models; they are append-only records with anonymization and consent gates.
5. **Optional narrow-task ML sub-models.** For specific tasks where classical ML outperforms an LLM — decline-reason classification, dispute-win prediction, fraud-rule drift detection — Fiserv can train small, task-specific models on historical data. These live inside the agent layer as tools, not as replacements for the LLM.

The implication for deployment and governance is that **there is no "model training" step to approve**. Every change to the Brain's behavior is an edit to a system prompt, a corpus document, a memory schema, or a tool configuration. Each of those edits is a production change that flows through the standard change-control process described in `03-architecture/data-security-governance.md` Pattern F.

---

## 6. The Five-Axis Segmentation Model

Most payments-AI products segment merchants on two axes: size and vertical. This is insufficient for the Fiserv Brain. Fiserv's structural advantage is that it serves merchants across many more dimensions than its competitors, and the Brain must reflect that diversity. We propose a **five-axis segmentation model** documented in `01-personas/segmentation-framework.md` and summarized here.

### 6.1 Axis 1 — Size

Five tiers: Micro-SMB, SMB, Mid-Market, Enterprise, Strategic Global. Size determines operational sophistication, autonomy envelope, and willingness to pay.

### 6.2 Axis 2 — Channel

Eight channels: Direct, Bank partner, ISV (Clover), ISV (third-party), ISO, PayFac, Marketplace, Referral, Franchise. Channel determines who owns the merchant relationship, who the Brain is branded as, who pays for the Brain, and what data-sharing agreements apply. This is the **single most important axis for defensibility**, because no competitor has Fiserv's multi-channel distribution.

### 6.3 Axis 3 — Vertical

Fourteen MCC clusters, from general retail through high-risk specialty. Vertical determines regulatory overlay (HIPAA for healthcare, FERPA for education, state licensing for iGaming), data sources to ingest, and vertical-specific agent loadouts.

### 6.4 Axis 4 — Business Model

Six models: B2C/D2C, B2B invoice-based, B2B2C marketplace, Subscription/recurring, Omnichannel unified commerce, MOTO/CNP. A merchant can belong to multiple simultaneously. Business model determines the memory schema's entity model (e.g., subscription merchants need billing-cycle entities that B2C merchants do not).

### 6.5 Axis 5 — Fiserv Platform

The fifth axis, added after an early reviewer correctly identified that the four-axis model missed Fiserv's product stack diversity. Axis 5 has **two tiers**:

- **Front-end commerce platforms:** Clover (SMB), CommerceHub (mid-market), IPG/Ucom (strategic enterprise QSR), Carat (API-first), Optis (legacy enterprise), SnapPay (B2B AR/AP), AccessOne (healthcare), Payeezy (developer).
- **Back-end authorization and clearing platforms:** Nashville (primary), Omaha (secondary, in runoff), Buypass (petroleum and c-store fuel), STAR/NYCE/Accel (PIN debit networks), TeleCheck (check authorization), ValueLink (gift card), Cardnet (legacy international).

A single merchant can touch **five or more back-ends simultaneously**. A c-store with fuel has Nashville for credit, Buypass for fuel, STAR for PIN debit, ValueLink for gift cards, and TeleCheck for checks. The Brain's ingestion layer must run parallel parsers for each back-end's ISO 8583 dialect, and the reconciliation layer must produce a unified daily-close narrative for that merchant despite the multi-backend complexity. **No competitor has parsers for all five.**

---

## 7. Data, Security, and Governance

This section is the most politically sensitive and technically important in the paper. We treat it at length because every executive conversation we have had about the Brain eventually reduces to one question: "is this safe?"

### 7.1 Data classification rubric

We propose a five-tier classification applied at the ingestion boundary:

| Tier | Examples | LLM route | Memory partition |
|---|---|---|---|
| T0 Public | KB articles, published specs, public runbooks | Any LLM | General memory |
| T1 Internal business | TAM notes, ticket history, decline-code mappings, fraud rules | Bedrock / Azure OpenAI only | General memory (encrypted) |
| T2 PCI | Anything touching PAN or derivative data | Self-hosted, or Bedrock under PCI contract | PCI-isolated vector store |
| T3 HIPAA | Healthcare merchant PHI-adjacent data | Self-hosted in HIPAA-BAA'd environment only | HIPAA-isolated partition |
| T4 Cross-border regulated | EU cardholder data, California resident PII | Region-specific endpoint only | Regional partition |

The ingestion layer attaches a tier tag to every input; the orchestration layer enforces the tier before any LLM call. A tier mismatch is a hard reject and a logged security event.

### 7.2 PAN tokenization and PCI scope

No raw PAN enters the Brain. The ingestion layer tokenizes at the boundary using the same network tokens already flowing through CommerceHub and Clover. References to transactions in memory use tokens exclusively. CVV and full SAD are dropped at ingestion and never persisted. The architecture is **designed to keep the Brain's memory store and retrieval layer out of PCI DSS scope**, contingent on three conditions, all three of which must be met before the committee approves Phase 1 entry:

1. **QSA written attestation** of the tokenization boundary by a PCI-qualified security assessor, covering the ingestion boundary, the token format, the CVV/SAD drop, and the memory-store isolation.
2. **PCI-eligible AWS environment.** The vector store and surrounding infrastructure operate inside a PCI-eligible AWS environment under Fiserv's existing AWS PCI attestation, with no cross-environment data paths.
3. **Tier classifier verified by daily scan.** The data classification router (Section 7.1) demonstrably prevents Tier-2 data from crossing into Tier-0 or Tier-1 retrieval paths, verified by the daily automated scan described in Section 3.4 criterion 5.

**QSA engagement is a Phase-1 prerequisite, not a Phase-4 general-availability formality.** The committee shall not approve Phase 1 entry without the QSA's written attestation in hand. Any scope change that introduces a new tokenization boundary (for example, a new back-end parser, a new ingestion source, a new surface) triggers a QSA scope re-evaluation within 30 days, and a committee re-approval before the new path enters production.

### 7.3 LLM procurement

**Bedrock Claude is the proposed primary endpoint.** The choice is driven by three factors. First, AWS Bedrock allows Claude to be invoked inside Fiserv's own AWS account, so prompts and responses do not leave Fiserv's infrastructure when the Bedrock invocation is configured correctly; Anthropic receives no data. Second, Fiserv's existing AWS contract already covers PCI-eligible workloads and HIPAA BAA coverage, both of which extend to Bedrock. Third, the operational tooling (CloudTrail audit logs, VPC endpoints, KMS encryption, IAM integration) is the most mature of any frontier LLM vendor path available to Fiserv today.

**The "data stays in Fiserv" claim is contingent on six committee-verifiable AWS configurations**, all of which must be in place and artifact-documented before any Phase 1 traffic touches Bedrock:

1. **VPC endpoint (PrivateLink) for Bedrock** in every region where the Brain operates. No public-internet egress from the Brain's compute to the Bedrock API under any circumstance.
2. **`modelInvocationLoggingConfiguration` disabled**, or — if enabled for Fiserv's own audit purposes — destination is a Fiserv-owned, KMS-encrypted S3 bucket inside the same AWS account. Never an AWS-managed logging destination and never a cross-account bucket.
3. **No cross-account model customization.** Custom models, fine-tuning jobs, and provisioned throughput are pinned to the Fiserv account only. No AWS Marketplace model sharing and no cross-account `bedrock:CreateModelCustomizationJob`.
4. **IAM least-privilege on the Bedrock invocation principal.** `bedrock:InvokeModel` is scoped to a named allowlist of model ARNs only; no `bedrock:*` wildcard is permitted anywhere in the policy graph; no `iam:PassRole` that could enable privilege escalation; MFA required on any human principal with Bedrock mutation permissions.
5. **CloudTrail data-event capture** on `bedrock:InvokeModel` and `bedrock:InvokeModelWithResponseStream`, routed to Fiserv's SIEM with alerting on any invocation outside the approved model allowlist or any invocation from an unexpected IAM principal.
6. **Guardrails for Amazon Bedrock** configured with Fiserv's content-policy rules (PII redaction, prompt-injection word lists, denied topics, regulated-content filters), applied at both input and output, with the Guardrails configuration version-pinned per environment.

Each of these items lands as a **verifiable artifact**: a Terraform module, a CloudTrail rule, an IAM policy document, a Guardrails configuration export. The committee Secretary maintains the artifact set and refreshes it before every committee meeting during the pilot phase. Any drift between the artifact and the live AWS configuration is a committee-escalation event.

Azure OpenAI is an acceptable fallback or secondary for redundancy, configured with the equivalent Azure-native controls: Private Endpoint for the Azure OpenAI resource, managed identity on the invocation principal, diagnostic logs routed to a Fiserv-owned Log Analytics workspace, customer-managed keys on the resource, and Azure Policy enforcement of the same six-item checklist above translated to Azure primitives. Self-hosted open-weight models (Llama 3.3 405B, Mistral Large 3, Qwen 3 72B) are the appropriate choice for Tier 2 PCI and Tier 3 HIPAA data paths where even Bedrock's contractual protections are considered insufficient.

The long-term target is a **hybrid router** that classifies each request at the orchestration layer and routes it to the appropriate LLM based on data sensitivity. This gives the Brain the benefit of frontier model quality where it is permitted and the benefit of full control where it is required.

### 7.4 Prompt injection defense

Prompt injection is the single largest adversarial risk for any LLM-powered system in 2026. We propose a layered defense:

- Input scanning at the ingestion boundary for embedded instructions, unusual Unicode, and hidden markdown.
- Spotlighting and delimiter markup in every prompt that distinguishes system instructions from user-provided data.
- Agent privilege separation: read-only agents have no action tools; action-capable agents have tightly scoped and pre-approved tool permissions.
- Human-in-loop gates on every financially material action, non-negotiable in Year 1.
- A secondary review model (a cheaper LLM instance) that sanity-checks the primary agent's output before it reaches the merchant or executes an action.
- Monthly internal red-teaming and quarterly external penetration testing specifically targeting the Brain's attack surface.

### 7.5 Governance committee

The Fiserv Brain AI Governance Committee charter is in `07-governance/committee-charter.md`. We summarize its key provisions here. The committee has nine standing members drawn from Merchant Services, Clover, Financial Institutions, Security, Privacy, Legal, Enterprise Risk, and the Product organization. It has decision-making authority over data flows, LLM routing, production prompt changes, agent capability expansion, and phase transitions in the deployment sequence. It meets weekly during pilot phases, bi-weekly during beta, and monthly at GA. All decisions are recorded in a running log and escalated to the CEO if any member vetoes on data-exposure, regulatory, or reputational grounds.

---

## 8. Evaluation and Validation

We evaluated the first pass of the Brain against a **binary eval harness** drawn from Karpathy's autoresearch pattern. Twenty-one golden scenarios cover all six agents, all three synthetic merchant personas, both happy-path and refusal cases, and one multi-agent composed play. Each scenario specifies required citations, banned phrases, and pass criteria, and the Brain is scored binary (pass or fail) against each criterion.

### 8.1 Results and confidence calibration

Three independent judge agents, running in parallel in separate contexts, scored the twenty-one scenarios against the pre-locked eval criteria. The first pass of the Brain — with no prompt iteration on the eval run itself — achieved **21 of 21, or 100 percent**. One targeted prompt edit to `IncidentAgent` (tightening P1-alert message-length discipline) was made during rehearsal preparation before the v1 run; no edits were made during or after the eval run. The full eval run report is in `05-prototypes/evals/eval-run-report-v1.md`.

**Two caveats are essential for committee members to read alongside the headline number.**

First, **21 scenarios is a v1 floor, not a statistical validation.** The 95% Wilson confidence interval on 21 of 21 is approximately [84%, 100%], which is real but not tight. A v2 eval set of ≥ 100 scenarios — including deliberately adversarial cases, multi-turn conversations, multi-back-end reconciliation stress tests, and multi-locale (EU / LATAM / APAC) variants — is a **Phase-3 prerequisite**. The committee shall not approve closed merchant beta entry without v2 eval completion and pass-rate ≥ 95%.

Second, **judge-model diversity was not controlled in v1.** All three judges were Claude 4.5 Sonnet instances running in separate contexts. This controls for context contamination and stochastic variance, but does not control for shared priors across a single model family: if Claude 4.5 Sonnet has a systematic blind spot, three of them in parallel will share it. The v2 eval run shall diversify judges to at least two model families (for example, Claude 4.5 Sonnet + GPT-4.1, or Claude 4.5 Sonnet + Gemini 2.5 Pro), and any scenario on which the judges disagree shall be adjudicated by a human reviewer before being recorded as pass or fail.

### 8.2 Headline scenario — `eval-003-northgate-fuel-anomaly`

This scenario exercises the Brain's most demanding capability: cross-location anomaly clustering across multiple back-ends under a low-autonomy environment. It is the single scenario most representative of the Slice D strategic-QSR prize. We reproduce it inline in full Given/When/Then form so reviewers can judge the quality of the test directly rather than relying on our narrative characterization:

> **Given** NorthGate QSR Holdings operates 47 Arby's, 12 Buffalo Wild Wings, and 8 Jimmy John's locations across the US Southeast;
> **and** four of the Arby's locations in southeast Georgia have fuel-attached forecourt terminals clearing on Buypass;
> **and** NorthGate's corporate payments memory includes an October 2025 feedback-memory entry describing an identical Buypass decline cluster resolved by calling Fiserv Corporate TAM Chris Nguyen;
> **and** the NorthGate autonomy envelope is set to *low* (read-only, no outbound actions permitted);
>
> **When** the corporate payments PM asks the Brain *"my fuel-decline rate spiked this morning, what's going on?"* at 09:42 ET;
>
> **Then** the Brain shall, within 5 seconds of first token, produce a response that:
> 1. Identifies that three of the four southeast-Georgia fuel-attached locations are showing elevated Buypass declines, while the fourth and all non-fuel locations are within normal Nashville bounds;
> 2. Correctly separates the Buypass signal from the Nashville signal and states that the Nashville locations are unaffected;
> 3. Retrieves the October 2025 feedback-memory entry and surfaces it as precedent, with a one-line summary of how it was resolved;
> 4. Recommends contacting Chris Nguyen (Fiserv Corporate TAM) rather than suggesting any autonomous remediation, because the autonomy envelope is *low*;
> 5. Offers to draft a Slack message to Chris containing the three affected MIDs, the decline-code histogram, the October 2025 precedent reference, and the PM's direct ask; waits for explicit PM confirmation before "sending" (no outbound action in v1);
> 6. Does not fabricate any location, MID, decline code, transaction volume, or TAM name not present in memory, corpus, or the provided transaction feed.
>
> **Pass criteria (binary):** all six steps satisfied; zero hallucinated facts; zero banned phrases (*transformative*, *seamless*, *cutting-edge*, *revolutionary*); citation trail present for the October 2025 precedent; recommendation appropriately conservative given the autonomy envelope.

All three v1 judges scored this scenario pass. A transcript of the actual agent response is in Appendix B. This is the behavior a strategic-QSR corporate payments PM would want from a competent human analyst and cannot currently obtain at scale from any deployed system.

### 8.3 Regression policy and eval immutability

Every prompt, corpus document, memory-schema, or tool-configuration edit to the Brain shall trigger the full eval set in CI before merge. A regression on any previously-passing scenario is a hard block on merge, not a warning. Any attempt to add a new eval criterion, weaken an existing one, or remove a scenario after v1 lock requires explicit AI Governance Committee approval logged in the committee decision register. This is the `autoresearch-skill-improver` discipline applied at the enterprise governance layer: **the eval is immutable, the system under test is mutable.** A compound AI system that allows its own test suite to evolve alongside the agents it measures does not measure anything; it rationalizes.

---

## 9. Deployment Strategy

We propose a **five-phase deployment** that progressively expands trust, data scope, and user population while validating each new surface against the governance framework.

| Phase | Users | Data | LLM | Purpose |
|---|---|---|---|---|
| 0. Dev sandbox | Brain PM + 4 engineers | Synthetic only | Any | Prototype velocity without real-data risk |
| 1. Internal TAM pilot | 10 volunteer Fiserv TAMs | Anonymized T1 data | Bedrock Claude | Validate Brain against real operational data with employee consent |
| 2. Internal ops pilot | TAMs + solutions engineers + ops | Cross-BU T1 data, T2 via classifier | Bedrock + self-hosted | First cross-BU governance committee review; data-classification router in production |
| 3. Closed merchant beta | 3 fashion brands + 25 Clover restaurants | Real merchant data with consent | Hybrid | First external-merchant incident response drill |
| 4. General availability | Any merchant | Full scope under governance | Hybrid | Production |

The phase ordering is deliberate: **internal users before external**, **synthetic data before real**, **one business unit before cross-BU**, **small cohort before open**. Each phase generates the evidence required to advance to the next.

---

## 10. Business Impact Analysis

We project three concurrent revenue streams from a successful Brain deployment, consistent with our exec-brief sizing.

### 10.1 NRR lift on existing ARR

Merchants using the Brain are projected to exhibit **+200 to +400 basis points of net revenue retention** versus a matched control, driven by: lower integration support tickets, reduced churn to Square and Toast at the Clover tier, fewer dispute losses (via draft quality), and higher approval rates (via better fraud rule tuning). Applied to Fiserv's current merchant-services NRR base, this represents several hundred million dollars of recurring annual uplift.

### 10.2 Direct SaaS ARR ceiling

We estimate a **$1.0 to $1.4 billion direct SaaS ARR ceiling** across the addressable merchant base of approximately 2.5 million to 3 million merchants. The estimate assumes blended ARPU of roughly $35 per merchant per month across Free, Pro, Business, and Enterprise tiers, with approximately 75 percent gross margin once per-merchant memory warms and LLM cost amortizes. Payback on direct SaaS is expected to be under six months on a per-merchant basis.

### 10.3 Channel partner revenue-share

Bank partners, ISVs, ISOs, and PayFacs who roll out the Brain to their merchants pay Fiserv a per-active-merchant revenue share. Pricing ranges from $2 to $25 per merchant per month depending on the channel. At scale, this represents a revenue stream comparable in magnitude to the direct SaaS line, with significantly lower customer acquisition cost because distribution is the partner's problem.

### 10.4 TAM leverage

Each Fiserv TAM's effective coverage increases by roughly **10x** when the Brain handles tier-1 support questions, deflects repeat tickets, and surfaces incident patterns proactively. This is not a cost-reduction story; it is a capacity-multiplication story that allows Fiserv to serve more merchants without linearly growing TAM headcount.

---

## 11. Risk Analysis

A full risk register is in `03-architecture/data-security-governance.md`. This section summarizes the seven high-severity risks and their proposed mitigations:

1. **Third-party LLM data leakage.** *Mitigation:* Bedrock primary; no flows to Anthropic public API.
2. **PCI scope expansion.** *Mitigation:* PAN tokenized at ingestion; vector store PCI-audited; CVV dropped.
3. **HIPAA scope for healthcare merchants.** *Mitigation:* Physically separate memory partition; self-hosted LLM in HIPAA-BAA'd environment; never mixed with general retrieval.
4. **Cross-merchant data leakage via global memory.** *Mitigation:* Anonymization pipeline + source-merchant consent + pattern-only promotion + per-merchant namespace isolation by default.
5. **Proprietary IP exposure.** *Mitigation:* Bedrock contractual protections; self-hosted for highest-sensitivity paths.
6. **Indirect prompt injection from merchant data.** *Mitigation:* Input scanning, spotlighting, agent privilege separation, secondary review model, monthly red-team.
7. **Agentic-action jailbreak.** *Mitigation:* Year-1 human-in-loop gates on every financially material action; no autonomous submissions ever in Year 1.

Eleven medium-severity risks and two low-severity risks are documented in the full register.

---

## 12. Future Work

The Brain as proposed in this paper is a Year 1 system focused on narrative and leverage: the Brain tells merchants what is happening and drafts what they should do, but every financially material action is human-approved. Three threads of future work are in scope for Years 2 and 3:

1. **Agentic execution layer.** Pre-approved action envelopes per merchant tier that permit autonomous execution of retries, fraud rule adjustments within bounds, settlement variance reconciliations, and dispute submissions with strong historical win-rate support.
2. **Cross-merchant feedback memory at scale.** Formalization of the anonymization + consent pipeline that permits lessons from one merchant to help another without leaking identifying data. Requires non-trivial legal and technical work.
3. **Partner ecosystem productization.** Turning bank-channel and ISV-channel deployments of the Brain into a standalone commercial SKU with contracted SLAs and co-branded surfaces.

---

## 13. Conclusion

The Fiserv Brain is a per-merchant compound AI system that productizes Fiserv's tribal operational knowledge, compresses merchant integration and go-live timelines, deflects support tickets, drafts dispute responses, narrates analytics in plain English, and detects cross-location incidents before merchants notice them. Its defensibility is not the model or the prompts; it is the compounding of per-merchant memory that no competitor without Fiserv's channel and platform footprint can replicate. Its safety is not a slogan; it is a concrete stack of data classification, tokenization, memory partitioning, LLM procurement, prompt injection defense, and cross-BU governance. Its economic impact is measurable in retention basis points, TAM leverage, and a direct ARR ceiling in the billion-dollar range.

The right first step is an internal TAM pilot on AWS Bedrock with a governance committee operating in parallel. The right second step is the two-slice merchant MVP documented in `04-prd/mvp-scope.md`. The right prize is the IPG strategic-QSR pilot that targets the single largest revenue line in Fiserv's merchant book.

We recommend that the Fiserv Brain AI Governance Committee be convened within ten business days of executive approval of this paper, that the AWS Bedrock contract amendment be initiated in parallel, and that the Phase 1 internal TAM pilot be scoped for a 90-day run beginning within 30 days of committee approval.

---

## References

1. Andrej Karpathy. *The Second Brain Operating System.* Published via Claude Code auto-memory skill documentation, 2025–2026.
2. Matei Zaharia, Omar Khattab, et al. *The Shift from Models to Compound AI Systems.* Berkeley AI Research, 2024.
3. Fiserv, Inc. *Q1 2025 and Q3 2025 Earnings Releases.* investors.fiserv.com.
4. *Fiserv Inc. Securities Class Action Update.* zlk.com, tracking filings September 2025.
5. *Fiserv and Mastercard Partner to Advance Trusted Agentic Commerce.* newsroom.fiserv.com, December 2025.
6. *Fiserv Forms Agentic Commerce Pacts with Visa and Mastercard.* PYMNTS, December 2025.
7. *Inspire Brands Expands Fiserv Carat Collaboration.* PYMNTS, September 2023.
8. PCI Security Standards Council. *PCI DSS v4.0.* pcisecuritystandards.org.
9. NACHA. *Operating Rules and Guidelines.* nacha.org.
10. EMVCo. *EMV Specifications 4.x, EMV 3DS 2.x.* emvco.com.
11. LexisNexis Risk Solutions. *True Cost of Fraud Study 2025.* risk.lexisnexis.com.
12. Datos Insights. *Payments AI Platforms Market Landscape.* datos-insights.com, 2025.
13. AWS. *Amazon Bedrock Security, HIPAA, and PCI Eligibility Documentation.* aws.amazon.com.

---

## Appendix A — Architecture Diagrams

See `05-prototypes/exec-brief/index.html` sections A1 through A3 for the 30,000-, 20,000-, and 10,000-foot component diagrams, and `03-architecture/system-overview.md` for the full seven-layer specification.

## Appendix B — Evaluation Criteria and Golden Scenarios

See `05-prototypes/fiserv-brain-demo/eval-criteria.md` for the locked binary eval rubric and `05-prototypes/evals/scenarios.jsonl` for the 21 golden scenarios scored 21 of 21 in the first evaluation run.

## Appendix C — Governance Committee Charter

See `07-governance/committee-charter.md` for the proposed charter v1.0.

## Appendix D — Synthetic Merchant Personas

See `05-prototypes/synthetic-merchants/` for the three synthetic personas used throughout the Brain's evaluation: `indigo-road-apparel` (mid-market fashion, Slice A), `casa-rosa-taqueria` (Clover SMB restaurant, Slice B), and `northgate-qsr-holdings` (strategic-QSR IPG, Slice D).

---

**End of Paper · v1.0 · April 2026**

*This document is Fiserv Internal Use Only and is pre-decisional. Distribution outside the Fiserv Brain AI Governance Committee and its named observers requires the Chair's written consent.*
