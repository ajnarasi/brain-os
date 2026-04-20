---
type: eval-criteria
target: Fiserv Brain pitch video (Remotion composition)
style: "Steve Jobs / Apple keynote discipline"
date: 2026-04-14
locked: true
---

# Eval Criteria — Fiserv Brain Pitch Video

Binary quality rubric inspired by the autoresearch-skill-improver discipline. Each criterion is **pass/fail**. The video is scored against all 6 criteria at build time and the results are captured in `eval-results.md` after the final tsc smoke test.

**Locked:** this file must not be modified after the build begins. If criteria need to change, start a fresh build cycle.

## Criteria

### C1 — ONE idea per scene (Jobs rule)
Every scene makes exactly one point. Multi-bullet, multi-topic slides are a failure.

- **PASS example:** "Fiserv has a retention problem." → one headline + one supporting fact + one image.
- **FAIL example:** "Fiserv has a retention problem AND an integration problem AND a margin problem AND a fraud problem."

### C2 — Specific numbers in at least 5 scenes
Jobs keynotes have specific, memorable numbers (99.4%, 1,000 songs, $999). Vague claims fail.

- **PASS example:** "200,000 merchants migrated from Payeezy to Clover. Stock dropped 18.5% in a day."
- **FAIL example:** "Fiserv has many merchants. Performance was poor last year."

### C3 — All 3 synthetic merchants named with one real public anchor
The 3 personas (Indigo Road / Casa Rosa / NorthGate) must all appear, and the video must reference at least one real public anchor (Yum! Brands, Inspire Brands, Costco, or the Sept 2025 class action).

- **PASS example:** PersonaBenefitsScene shows all 3 synthetic merchants AND the OutroScene references "one brand under Inspire Brands or Yum!".
- **FAIL example:** Only 2 merchants shown, or no real public reference anywhere.

### C4 — No generic buzzwords
Banned word list (case-insensitive). Zero occurrences across all scene content:

- `transformative` / `transformational`
- `revolutionary`
- `cutting-edge`
- `next-generation` / `next-gen`
- `leverage synergies`
- `seamless` (overused — use a specific claim instead)
- `best-in-class`
- `unprecedented`
- `game-changing`
- `paradigm shift`

- **PASS example:** "The brain remembers."
- **FAIL example:** "Our revolutionary next-gen platform delivers seamless, best-in-class merchant experiences."

### C5 — CTA names Slice A + Slice B + Slice D explicitly
The OutroScene must cite the two-slice MVP (Slice A: mid-market fashion, Slice B: Clover SMB restaurant) AND the V2 prize (Slice D: IPG strategic-QSR pilot). A generic "let's talk" closer is a fail.

- **PASS example:** "Slice A. Slice B. Both ready to pilot. Slice D — one brand under Inspire Brands or Yum! — is the V2 prize."
- **FAIL example:** "Let's talk about the Fiserv Brain."

### C6 — ProblemScene anchored to Sept 2025 class action
The problem framing must explicitly reference the September 2025 Payeezy→Clover forced-migration securities class action (documented in corpus/02-fiserv-general/merchant-issues.md). This is the single strongest public evidence of the retention problem the Brain solves, and skipping it weakens the pitch.

- **PASS example:** "September 2025: ~200,000 Payeezy merchants forcibly migrated to Clover. Stock drops 18.5% in a day. Fiserv has a retention problem."
- **FAIL example:** "Fiserv has merchant retention challenges that have been reported in the press."

## Scoring

Each criterion is scored binary (pass/fail) by reading the final scene files after the build is complete.

- **6/6 = ready to demo** — no iteration needed
- **5/6 = acceptable** — one known gap documented in eval-results.md
- **4/6 or lower = iterate** — identify failing criterion, make one targeted edit, re-score
- **Below 4/6 = rethink** — the build plan has a structural gap, not a wording gap; revisit scene architecture

Results are captured in `eval-results.md` after the final tsc smoke test, so the whole build is auditable.
