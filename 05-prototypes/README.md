# Prototypes

Reserved for code, demos, and proof-of-concept implementations built during the side-project phase.

Nothing here yet. When this folder starts filling up, it means we're past "pitch" and into "prove it."

## Files in this folder
- **`next-steps.md`** — answers to the four operational questions after the pitch is written: how to train, how to test, how to build a demo prototype, and whether to use web-research data (yes)
- **`demo-mvp.md`** — concrete build spec for the demo prototype (Path A = Claude Code skill in ~1 week; Path B = web app in 2–4 weeks)

## Candidate early prototypes
1. **DocsAgent minimum viable** — RAG over a scraped subset of Fiserv KB + synthetic merchant memory, answering 10 seed questions
2. **Clover daily-close narrative mock** — take sample Clover txn data, generate a plain-English daily summary with an LLM
3. **Launch-watch simulator** — replay a recorded launch-week txn stream through AnomalyAgent to show it catches known incidents
4. **Dispute-draft demo** — given a dispute, draft a response using the merchant's historical templates

See `demo-mvp.md` for the consolidated demo plan that builds on all four.
