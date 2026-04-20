# Phase 1 — Integrate

The "onboarding brain." Serves merchants from contract signature through first successful production transaction.

## Target merchant states covered

- **Day 0** — Contract signed, MID(s) provisioned, sandbox credentials issued
- **Day 1–30** — Developer integration (API calls, test transactions, webhook setup)
- **Day 30–60** — UAT and merchant-side QA
- **Day 60–90** — Certification (cert scripts, card-brand requirements)
- **Day 90** — First production transaction

Actual elapsed time varies 2–10x by channel, size, and vertical. The Brain's job is to compress it.

## The integration journey, today (without the Brain)

1. **Kickoff call with TAM or SE.** Merchant gets a PDF of the integration guide, a sandbox credential set, a Slack channel. The TAM spends 5–15 hours per merchant answering questions that are answered *literally somewhere in the Fiserv docs*.
2. **Dev starts reading.** They find the wrong section. They write API calls against stale documentation. They hit edge cases that are documented in a runbook no one pointed them to.
3. **First sandbox transaction.** Something fails. The merchant opens a support ticket. The TAM reproduces the issue, diagnoses it, sends a PDF workaround. Resolution time: 2–5 days.
4. **More failures.** Same patterns. Different merchants, different TAMs, different workarounds, all discovering the same 30 top failure modes independently.
5. **Cert.** Merchant submits cert scripts. 40–60% fail on first submission because of predictable, documented issues.
6. **First prod txn.** Usually 60–120 days after contract signature for mid-market; 2–8 weeks for SMB.

## The same journey with the Brain

1. **Kickoff.** TAM introduces the Brain. Brain loads: merchant profile, channel context, vertical context, Fiserv KB, every prior merchant's integration feedback memory. Brain asks the merchant five questions to nail down stack + product scope. Those answers go into project memory.
2. **Dev starts.** Brain walks them through the specific integration path for *their* stack (not the generic PDF). When the dev asks a question, Brain retrieves the right KB section + any prior-merchant feedback on that exact issue.
3. **First sandbox transaction.** Brain runs a supervised test transaction. If it fails, Brain diagnoses immediately (it has access to the ISO 8583 message, decline reason, and prior-failure memory). Resolution in minutes, not days.
4. **Ongoing failures.** Every resolution writes back to feedback memory. The same dev doesn't hit the same issue twice. Across merchants, the global feedback memory makes the Brain smarter for everyone (with appropriate privacy boundaries).
5. **Cert.** Brain pre-runs all cert scripts in sandbox, flags anything that would fail, walks the dev through fixes. Cert pass rate on first submission → 90%+.
6. **First prod txn.** Target compression: 40% reduction for mid-market (60 days → 36), 30% for SMB.

## Brain capabilities required for Phase 1

- **DocsAgent** — RAG over Fiserv KB + merchant-specific retrieval
- **IntegrationAgent** — loads channel-aware integration path, walks dev through it
- **SandboxAgent** — runs test transactions on the merchant's behalf in sandbox, interprets ISO 8583 responses, diagnoses failures
- **CertAgent** — pre-runs cert scripts, flags failures, explains fixes
- **MemoryWriter** — captures every question, failure, and resolution into project + feedback memory

## KPIs

- **Time-to-first-successful-prod-txn** — primary metric
- **Tickets opened during integration** (down 40%+)
- **Cert pass rate on first submission** (up to 90%+)
- **Dev NPS at cert** — leading indicator for ongoing Brain adoption

## Failure modes the Brain must handle

- Dev using outdated docs (Brain must always link to current version + warn on stale references)
- Dev integrating against wrong product (CommerceHub vs. Clover vs. Optis — Brain must detect and course-correct)
- Dev hitting channel-specific quirks (bank-channel UAT environment is different from direct — Brain must know)
- TAM unavailable (Brain is the first line until TAM catches up)
- Merchant dev team is 1 person (Brain fills in for the "team" the merchant doesn't have)

## Integration journey by size

| Size | Typical duration today | With Brain | Brain autonomy level |
|---|---|---|---|
| Micro-SMB / SMB | 2–8 weeks | 1–4 weeks | High — Brain does most of the work |
| Mid-Market | 60–120 days | 36–70 days | Medium — Brain co-pilots dev team |
| Enterprise | 3–9 months | 2–6 months | Low — Brain is API-accessible reference, dev team drives |
| Strategic | 6–18 months | 4–12 months | Custom — Brain is embedded in merchant's own tools |

## Integration journey by channel

| Channel | Key Brain differences |
|---|---|
| Direct | Full access; Brain is Fiserv-branded; TAM is the escalation |
| Bank | White-labeled; bank's TAM is first line; Brain has to respect data-sharing agreement |
| ISO | Co-branded; ISO is first line; Brain supports residuals reporting |
| ISV (Clover, etc.) | Embedded in ISV UX; Brain pre-configured for the ISV's merchant type; zero-touch install for most SMB cases |
| PayFac | API-only; PayFac's dev team consumes Brain via API, not UI |
| Marketplace | Brain supports sub-merchant onboarding at the platform level |
| Franchise | Brain integrates corporate + franchisee hierarchy |
