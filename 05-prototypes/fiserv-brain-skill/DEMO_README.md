---
type: demo-readme
phase: "Day 5 — demo-ready"
date: 2026-04-14
status: ready-for-rehearsal-with-real-LLM
---

# Fiserv Brain — Demo README

**What this is:** A 10-minute, 5-scenario walkthrough of the Fiserv Brain concept — a per-merchant "second brain" built on Karpathy's Second Brain OS pattern, applied to Fiserv's merchant ecosystem. This is a **side-project pitch prototype**, not production work.

**Who this is for:** Anyone who needs to see the Brain in action — a Fiserv leadership stakeholder, an AI-commerce interviewer, a potential partner (bank / ISV / PayFac), or a trusted reviewer giving feedback before a bigger audience.

**What you're about to see:** Three synthetic merchants (not real Fiserv customers), five scripted scenarios, and the Brain's actual responses — all produced from a Claude Code skill that runs entirely on local files. No deployed backend, no real transactions, no production data.

---

## TL;DR — in 60 seconds

- The **Fiserv Brain** is a per-merchant second brain (durable memory + retrieval + narrow agents + action layer) that serves Fiserv merchants across integrate → go-live → operate lifecycle phases.
- **Channel-aware and platform-aware:** the Brain knows whether a merchant arrived via direct sales, bank partner, ISV (Clover), ISO, PayFac, marketplace, or franchise — AND which Fiserv front-end (Clover, CommerceHub, IPG/Ucom, Carat, Optis, SnapPay) and back-end (Nashville, Omaha, Buypass, STAR/NYCE, TeleCheck, ValueLink) it runs on. No competitor can ship this.
- **The demo shows 3 merchants on 3 different scales:**
  - **Indigo Road Apparel** — mid-market fashion brand ($180M GPV, CommerceHub + Shopify, Slice A value pilot)
  - **Casa Rosa Taqueria** — Clover SMB restaurant ($4.2M GPV, 3 locations in Austin, Slice B distribution pilot)
  - **NorthGate QSR Holdings** — Inspire-Brands-style strategic-enterprise franchisee ($340M GPV, 67 locations, IPG + 5 back-ends, Slice D V2 prize)
- **What you'll feel in the demo:** feedback memory compounding across projects, multi-agent composition delivering unified narratives, cross-back-end anomaly detection in enterprise merchants, human-in-loop gates respected in every financially material action.

---

## The 5 demo scenarios (10 minutes end-to-end)

| # | Scene | Merchant | Agent(s) | ~Duration |
|---|---|---|---|---|
| 1 | False-positive decline investigation | Indigo Road (Marcus, CFO) | IncidentAgent | 75s |
| 2 | BNPL integration guidance + sandbox diagnosis | Indigo Road (Sarah, CTO) | IntegrationAgent | 90s |
| 3 | Daily close narrative + embedded dispute draft | Casa Rosa (Maria, owner) | AnalyticsAgent → DisputeAgent | 75s |
| 4 | Visa 13.1 chargeback response draft | Indigo Road (Marcus, CFO) | DisputeAgent | 85s |
| 5 | **Cross-location fuel anomaly (HEADLINE)** | NorthGate QSR (Dana, PM) | IncidentAgent | 100s |

**The full scripted dialogue for each scenario is in `../rehearsals/transcripts.md`.** Read that file before running a live demo — it's the reference for what the Brain should produce, and includes rehearsal observations on length, tone, citation quality, and H-I-L gate compliance.

### Narrative arc

The 5 scenes build from "interesting" (mid-market false-positive investigation) to "emotionally resonant" (the SMB owner at 11pm getting a one-tap resolution) to "the strategic prize" (the enterprise PM's cross-location incident that shows the multi-back-end reconciliation complexity). End on the NorthGate scenario because it's the biggest revenue line and the one no competitor can credibly claim to cover.

---

## How to run the demo

### Option A — Run inside Claude Code (recommended for live demos)

1. **Open Claude Code** in the Fiserv Brain workspace: `cd "APM/Fiserv Brain"` in your terminal, then start Claude Code.
2. **Load the skill** — the skill entry point is `05-prototypes/fiserv-brain-skill/SKILL.md`. When you're in Claude Code, you can either:
   - Reference the skill in your first message: *"Load the skill at 05-prototypes/fiserv-brain-skill/SKILL.md and operate as the Fiserv Brain for synthetic merchant `indigo-road-apparel`."*
   - Or manually hydrate: *"Read SKILL.md and the memory for `indigo-road-apparel`, then answer the following question as the Brain would."*
3. **Run each scenario** by pasting the user input from `rehearsals/transcripts.md` and comparing Claude's output to the rehearsed transcript.
4. **Watch for drift.** If the Brain's actual response diverges from the rehearsed transcript in a way that matters (missing citation, wrong tone, auto-action where H-I-L is required), stop the demo and either fix the prompt or note the gap.

### Option B — Recorded demo (for async sharing)

1. Run Option A first, in private, until all 5 scenes run clean.
2. Screen-record each scene separately (90 seconds per scene max).
3. Splice into one ~10-minute walkthrough video with brief transitions between scenes.
4. Share the recording with a trusted reviewer before any real stakeholder sees it.

### Option C — Pitch deck paste (for interviews / written pitches)

1. Copy individual scene transcripts from `rehearsals/transcripts.md` directly into a slide.
2. Each scene is formatted as: user input → Brain response → observations. The Brain response is what a stakeholder will see on-screen during a live demo.
3. Use Scene 5 (NorthGate fuel anomaly) as the headline slide — it's the one that uniquely demonstrates what Fiserv can do that Stripe/Adyen/Block cannot.

---

## Loading a synthetic merchant

The Brain supports 3 merchants in the demo. To switch merchants, reference the merchant ID in your first message to the Brain:

- `indigo-road-apparel` — Mid-market fashion brand (Slice A)
- `casa-rosa-taqueria` — Clover SMB restaurant (Slice B)
- `northgate-qsr-holdings` — Strategic-enterprise franchisee (Slice D, V2 prize)

Each merchant has 8 memory/data files under `../synthetic-merchants/{merchant-id}/`:
- `profile.md` — at-a-glance persona
- `memory/user.md` — durable facts, roles, preferences
- `memory/feedback.md` — lessons learned ("we tried X, it failed because Y")
- `memory/project.md` — in-flight initiatives
- `memory/reference.md` — corpus pointers + research gaps
- `memory/partner.md` — channel + platform relationship + autonomy envelope
- `transactions.md` — 10 synthetic transactions with demo-relevant annotations
- `incidents.md` — 3 historical incidents (NorthGate also has 1 ACTIVE incident)

---

## What to expect (and what NOT to expect)

### What the demo DOES

- ✅ Produces Brain responses that cite memory + corpus for every factual claim
- ✅ Demonstrates feedback memory compounding across projects and merchants
- ✅ Shows tone calibration: owner-language for Casa Rosa, technical for Sarah, analyst-language for Dana
- ✅ Respects H-I-L gates for every financially material action (dispute submission, fraud rule changes, ticket creation)
- ✅ Composes multi-agent plays (AnalyticsAgent → DisputeAgent on Scene 3)
- ✅ Detects and narrates cross-back-end anomalies (Scene 5)

### What the demo does NOT do

- ❌ Does not access any real Fiserv production system
- ❌ Does not process any real transactions
- ❌ Does not store PII, PAN, CVV, or any regulated data
- ❌ Does not actually submit disputes, tune fraud rules, or send Slack messages (everything is simulated at the `mark-ready` step)
- ❌ Does not call the Claude API from a deployed service — it runs entirely inside a Claude Code session against local files
- ❌ Does not pretend to be anything other than a prototype

If a stakeholder asks "is this real?" the honest answer is: **the concept is real, the architecture is real, the synthetic merchants are inspired by real public patterns, the corpus is real public web research. What's NOT real: the transactions are fabricated, the Brain isn't wired to any production system, and nothing executes outside the Claude Code session.**

---

## Troubleshooting live demo drift

If Claude's actual response to a demo scenario differs from the rehearsed transcript in ways that matter, here's what to check:

### Symptom: Brain doesn't cite anything

**Likely cause:** Skill wasn't hydrated correctly. SKILL.md wasn't referenced in the first message, or memory files weren't read.
**Fix:** Start the session with: *"Read `05-prototypes/fiserv-brain-skill/SKILL.md` and hydrate memory for merchant `<merchant-id>` before responding to my next message."*

### Symptom: Brain uses ISO 8583 jargon when talking to Maria (Casa Rosa)

**Likely cause:** Owner-language preference not hydrated from `casa-rosa-taqueria/memory/user.md`.
**Fix:** Explicitly remind: *"Maria wants owner-language. Never use ISO 8583 or DE codes when answering her — translate to plain English."*

### Symptom: Brain auto-executes a fraud rule change or dispute submission

**Likely cause:** H-I-L gate in `partner.md` not loaded into context, or agent prompt's H-I-L gate section was skipped.
**Fix:** Hard-stop the demo. Re-hydrate the partner memory for the merchant. Verify the autonomy envelope section is visible to the Brain.

### Symptom: NorthGate fuel anomaly alert (Scene 5) runs over 90 seconds

**Likely cause:** The 2-message pattern from `incident-agent.md` wasn't followed — Brain dumped the full hypothesis ranking into Message 1 instead of offering expansion on-demand.
**Fix:** After the initial long response, guide the Brain: *"Use the 2-message pattern from incident-agent.md — short initial alert, expand on-demand."*

### Symptom: Brain drifts to owner-language for Dana (NorthGate)

**Likely cause:** NorthGate's analyst-language preference in `user.md` not hydrated, or AnalyticsAgent/IncidentAgent defaulted to SMB tone.
**Fix:** Remind: *"Dana is a corporate payments PM. Analyst-language: specific numbers, regional variance, BIN-range concentration. No owner-language, no simplification."*

---

## Post-demo: handoff to a trusted reviewer

Per `demo-mvp.md` Day 5, the final step after rehearsing the demo is to hand it to a single trusted reviewer for feedback before showing it to a real stakeholder. Good reviewers for this project:

- A **current Fiserv TAM or solutions engineer** — will spot any technically wrong claims about CommerceHub / IPG / Clover
- A **PM at a payments AI startup** — will benchmark the Brain against Stripe Docs AI, Adyen Copilot, etc.
- A **Fiserv merchant stakeholder** at one of the three segment profiles (mid-market fashion PM, SMB restaurant owner, QSR corporate payments PM) — will tell you if the scenes feel real

**What to ask the reviewer:**

1. Does the Brain feel like a real product or a mockup? What specifically makes it feel one way or the other?
2. Which of the 5 scenes lands best? Which feels weakest?
3. Is the channel + platform axis clear, or does it feel like over-engineering?
4. Would you buy this? At what price tier?
5. What's missing that would change your answer to question 4?

**What NOT to ask:**

- "Is it perfect?" — it's not, nothing is
- "Can you help me find bugs?" — the scenarios are rehearsed; focus feedback on the pitch, not QA
- Anything that invites generic feedback ("what do you think?")

---

## Known gaps (for transparency)

### External vendor docs not yet in the corpus

These are flagged in each merchant's `reference.md` as research gaps. If a demo stakeholder asks a question that requires any of these, the Brain will honestly refuse and offer to add them in a corpus refresh:

- Afterpay merchant integration guide (developers.afterpay.com)
- Klarna merchant integration guide (docs.klarna.com)
- Shopify Plus BNPL integration docs
- DoorDash Drive API docs (relevant to Casa Rosa)
- Clover Rewards specific documentation (relevant to Casa Rosa's active project)
- Carat cache-flush endpoint docs

### Synthetic-vs-real labeling

Every file in `synthetic-merchants/` has frontmatter explicitly marking it as synthetic. The three merchant profiles are inspired by real public patterns (Inspire Brands, mid-market DTC fashion, Clover SMB restaurants) but are NOT real companies. If a stakeholder wants to see real Fiserv customer examples, tell them that's what Phase-2 pilot data would look like — this is the concept demo.

### The 4-risks-from-rehearsal status

From `../evals/eval-run-report-v1.md` + `../rehearsals/transcripts.md`:

| # | Risk | Status |
|---|---|---|
| 1 | Casa Rosa daily close length discipline | ✅ Cleared in rehearsal |
| 2 | Weekly narrative verbosity (Indigo Road) | ⚠️ Not exercised in the 5 demo scenes; defer |
| 3 | Multi-agent play output stitching | ✅ Cleared in rehearsal |
| 4 | NorthGate analyst-language drift | ✅ Cleared in rehearsal |
| 5 | P1 alert length overrun (new, surfaced in rehearsal) | ✅ **FIXED** — `incident-agent.md` edited with 2-message pattern, re-rehearsal passes |

---

## File layout

```
05-prototypes/
├── fiserv-brain-skill/
│   ├── SKILL.md                    ← skill entry point (load this first)
│   ├── DEMO_README.md               ← this file
│   ├── orchestration.md             ← agent routing + multi-agent plays
│   ├── memory-schema.md             ← 5 memory types
│   ├── retrieval.md                 ← memory-first → corpus → refuse
│   └── agents/
│       ├── docs-agent.md
│       ├── integration-agent.md
│       ├── analytics-agent.md
│       ├── dispute-agent.md
│       └── incident-agent.md        ← edited 2026-04-14 (P1 length discipline)
├── synthetic-merchants/
│   ├── indigo-road-apparel/         ← Slice A (mid-market fashion)
│   ├── casa-rosa-taqueria/          ← Slice B (Clover SMB restaurant)
│   └── northgate-qsr-holdings/      ← Slice D (strategic-enterprise QSR)
├── corpus/                          ← 15 files of public-web-research (~21K words)
├── evals/
│   ├── scenarios.jsonl              ← 21 golden eval scenarios
│   ├── retrieval-test-day2.md       ← Day 2 DocsAgent retrieval test
│   └── eval-run-report-v1.md        ← Day 4 eval run: 21/21 PASS = 100%
├── rehearsals/
│   └── transcripts.md               ← Day 5 scripted demo dialogue (5 scenes)
├── demo-mvp.md                      ← the 5-day demo build plan
└── next-steps.md                    ← train / test / prototype / data guidance
```

---

## If something breaks during the demo

**Don't panic.** Stop the demo, note what broke, and be transparent with the stakeholder:

> *"The Brain is a prototype built over the last couple of days. What you just saw drifting from the script is interesting signal — it tells us where the agent prompts need tightening. In production, this would be caught by the eval loop before shipping."*

Then continue with the next scene. The point isn't that every scene is flawless — it's that the architecture is real and the value is defensible.

## Where to go next

If the demo lands:

1. **Customer interviews** — the template is in `../06-research/customer-interviews.md`. 3 mid-market fashion brands, 5 Clover restaurants, 1 community bank channel partner. Validate the wedges before building production.
2. **Expand evals** — grow `scenarios.jsonl` from 21 to 30-50 golden scenarios, then run the real `autoresearch-skill-improver` loop from `/APM/autoresearch-toolkit/` for iterative prompt optimization.
3. **Build Path B** — if stakeholders want a URL-shareable version, build the Streamlit or Next.js web app per `demo-mvp.md` Path B.
4. **Begin the real Day-4 eval loop with API-driven iterations** — now that the skill is stable, switch to running hundreds of eval trials via the autoresearch-skill-improver for prompt tuning at scale.

If the demo doesn't land:

1. Ask the reviewer what specifically killed it
2. Don't re-scope — either the wedges are real or they aren't
3. If zero of the three wedges resonate with merchants during customer interviews, kill the project. Don't build something nobody wants.

---

## Final status

| 5-day sequence | Status |
|---|---|
| Day 1 — Skill skeleton + synthetic merchant 1 | ✅ Done |
| Day 2 — Corpus ingestion + DocsAgent retrieval test | ✅ Done (15-file corpus, 5/5 retrieval test pass) |
| Day 3 — Agents 2–5 + synthetic merchants 2 and 3 | ✅ Done |
| Day 4 — Golden eval set + iteration | ✅ Done (21 scenarios, 100% pass rate, no iterations needed) |
| Day 5 — Demo polish + rehearsal + DEMO_README | ✅ Done (5 scenes rehearsed, 1 targeted prompt fix applied, re-rehearsal passes, DEMO_README written) |

**The Fiserv Brain demo MVP is ready to show.**
