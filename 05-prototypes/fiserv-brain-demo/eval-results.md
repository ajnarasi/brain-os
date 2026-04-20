---
type: eval-results
target: Fiserv Brain Remotion pitch video
eval_criteria_file: eval-criteria.md
date: 2026-04-14
build_round: v1 (initial build from scratch, no iteration)
---

# Eval Results — Fiserv Brain Pitch Video v1

**Final score: 6/6 = 100% PASS. No iteration needed.**

Scored by reading the final scene files after tsc clean + live Remotion Studio verification on 4 representative frames across 2 compositions.

## Scoring methodology

Unlike autoresearch-skill-improver's loop (which optimizes a single text file against a binary eval), this build scored a **multi-file React/Remotion codebase** against the same kind of binary rubric. The pattern:

1. Define 6 binary quality criteria upfront (`eval-criteria.md`, locked)
2. Build the entire video in one pass, applying the criteria as drafting constraints
3. tsc smoke test (zero errors)
4. Live Remotion Studio verification on 4 frames across 2 compositions:
   - Main `/FiservBrainMain` at frames 60 (TitleScene), 310 (ProblemScene), 2010 (PersonaBenefitsScene)
   - Showcase `/NorthGateShowcase` at frame 80 (Intro)
5. Score each criterion pass/fail based on final scene file content

## Verification screenshots

All 4 verification frames rendered correctly in Remotion Studio preview:

| Frame | Composition | Scene | Status |
|---|---|---|---|
| 60 | FiservBrainMain | TitleScene | ✅ "Fiserv Brain" / "A second brain for every merchant." / gradient underline / dark palette |
| 310 | FiservBrainMain | ProblemScene | ✅ "SEPTEMBER 2025" kicker / "Fiserv has a retention problem." / "200,000 Payeezy merchants" |
| 2010 | FiservBrainMain | PersonaBenefitsScene | ✅ All 3 merchant cards: Indigo Road ($180M, 32 stores) / Casa Rosa (3 Austin locations) / NorthGate (47 Arby's, 12 BWW, 8 JJ, $340M, 5 back-ends) |
| 80 | NorthGateShowcase | SceneIntro | ✅ "SHOWCASE 3 · SLICE D · THE PRIZE" / "NorthGate QSR Holdings" / "67 locations · 3 brands under Inspire Brands · $340M GPV · IPG + Nashville + Buypass + STAR/NYCE + ValueLink + TeleCheck" |

## Per-criterion scoring

### ✅ C1 — ONE idea per scene (Jobs rule)

**PASS.** All 9 main-composition scenes + 6 NorthGate showcase scenes hold to the rule.

| Scene | ONE idea | Evidence of discipline |
|---|---|---|
| TitleScene | The name | Just the title, subtitle, gradient bar, footer — no list |
| ProblemScene | Retention problem | Kicker → headline → fact → stat → punchline all serve the ONE claim |
| IdeaScene | Introduce the brain | 3-beat slow reveal: "What if..." → question → name |
| JTBDScene | Three jobs, one brain | Framing line is explicitly "one brain" |
| PersonaBenefitsScene | Three merchants, same architecture | Single headline + 3 supporting cards |
| SelfEnhancementScene | The brain compounds | Story-driven: Klarna → Afterpay narrative as single arc |
| SolutionScene | Value to Fiserv | 3 counters laddered to "three revenue streams at once" |
| TimeReductionScene | Value to merchants | 4 KPI counters under one question |
| OutroScene | MVP ready to pilot | 3 slice cards laddered to one CTA |

### ✅ C2 — Specific numbers in at least 5 scenes

**PASS.** 7 of 9 scenes contain specific numbers (exceeds the ≥5 threshold).

| Scene | Specific numbers present |
|---|---|
| ProblemScene | 200,000 merchants · −18.5% · April 24, 2025 |
| JTBDScene | 40% faster · 90%+ clean launch · 40–60% deflection |
| PersonaBenefitsScene | $180M · 32 stores · 47 Arby's · 12 BWW · 8 JJ · $340M |
| SelfEnhancementScene | September 2025 · 6 duplicate orders · 30 days · 35 days · April 2026 |
| SolutionScene | 400 bps · 10× · $1.4B · 2–3M merchants |
| TimeReductionScene | −40% · −25% · 60% · NPS 52 |
| OutroScene | 3 merchants · 120 days · 25 merchants · 90 days |

TitleScene and IdeaScene intentionally carry no numbers (they're the brand moments — a Jobs title slide never has a chart on it).

### ✅ C3 — All 3 synthetic merchants + real public anchor

**PASS.** Three merchants and two real public anchors, all verified.

- **Indigo Road Apparel** — named in `PersonaBenefitsScene` + `IndigoRoadShowcase`
- **Casa Rosa Taqueria** — named in `PersonaBenefitsScene` + `CasaRosaShowcase`
- **NorthGate QSR Holdings** — named in `PersonaBenefitsScene` + `NorthGateShowcase`
- **Inspire Brands** — named in `OutroScene` (Slice D) and `NorthGateShowcase` intro
- **Yum!** — named in `OutroScene` (Slice D CTA)
- **September 2025 Payeezy→Clover class action** — anchored in `ProblemScene`

### ✅ C4 — No generic buzzwords

**PASS.** Zero occurrences of the banned list across all 9 main scenes + 3 showcase compositions.

Verified absent: `transformative` / `transformational` / `revolutionary` / `cutting-edge` / `next-generation` / `next-gen` / `leverage synergies` / `seamless` / `best-in-class` / `unprecedented` / `game-changing` / `paradigm shift`.

Scene language prefers specific claims instead:
- Instead of "transformative AI" → "the brain remembers"
- Instead of "seamless integration" → "40% faster time-to-live"
- Instead of "next-gen platform" → "IPG + Nashville + Buypass"
- Instead of "revolutionary approach" → "narrative + leverage. Never actor."

### ✅ C5 — CTA names Slice A + Slice B + Slice D explicitly

**PASS.** `OutroScene` has dedicated cards for all three slices with specific descriptions.

- **Slice A** — "Mid-market fashion brand · CommerceHub + Shopify ISV · 3 merchants · 120-day value pilot" (blue card)
- **Slice B** — "Clover SMB restaurant · Clover App Market · 25 merchants · 90-day distribution pilot" (green card)
- **"and one more thing..."** transition beat
- **Slice D** — "Strategic-QSR prize · One brand under Inspire Brands or Yum! · IPG + Nashville + Buypass + STAR/NYCE + ValueLink" (amber card)
- **Closing line** — "Let's pilot Slice A and Slice B. Then go after Slice D."

Not a generic "let's talk" closer.

### ✅ C6 — ProblemScene anchored to Sept 2025 class action

**PASS.** Opening kicker is literally "SEPTEMBER 2025" in red. Headline: "Fiserv has a retention problem." Supporting fact explicitly cites the securities class action: "A securities class action alleged that Fiserv forcibly migrated roughly **200,000 Payeezy merchants** to Clover and concealed churn to Square and Toast." Central stat card: **−18.5%** stock drop, April 24 2025.

This is the strongest public evidence that the retention problem the Brain solves is real and documented, and it's the first content the audience sees after the title.

## Aggregate

| Criterion | Pass? |
|:--:|:--:|
| C1 — ONE idea per scene | ✅ |
| C2 — Specific numbers in ≥5 scenes | ✅ |
| C3 — All 3 merchants + real public anchor | ✅ |
| C4 — No buzzwords | ✅ |
| C5 — CTA names Slice A + B + D | ✅ |
| C6 — ProblemScene anchored to Sept 2025 class action | ✅ |
| **TOTAL** | **6/6 = 100%** |

## What was NOT iterated

Per the autoresearch-skill-improver discipline, iteration is only run on criteria that fail. All 6 criteria passed on v1, so no prompt/scene edits were applied after the initial build.

## Known risks observed during build

These didn't fail any criterion but are worth noting for future builds:

1. **Scene length calibration** — JTBDScene duration (540 frames / 18s) may be too tight to read all 3 phase cards comfortably at 30fps; 720 frames (24s) might feel more "Jobs-paced." Only visible under live playback; defer to a real rehearsal.
2. **IdeaScene final reveal timing** — the "Introducing Fiserv Brain" reveal at frame 240 of the scene may want 30 more frames of hold before transitioning to JTBDScene, so the audience has time to land on the name. Minor.
3. **OutroScene line spacing** — the 3 slice cards + closer + footer may be visually dense at 1920×1080. Only visible under live render.

None of these affect the eval-criteria score. All are stylistic refinements for a future rehearsal+record pass.

## Verification

- `npx tsc --noEmit` — ✅ 0 errors across 27 TypeScript files
- Remotion Studio live preview on port 3000 — ✅ 4 frames verified across 2 compositions
- All 4 compositions registered in `Root.tsx` — ✅ `FiservBrainMain` + `IndigoRoadShowcase` + `CasaRosaShowcase` + `NorthGateShowcase`
- No unused imports — ✅ (one was caught on first tsc run, fixed, re-run clean)
- Old APM `Composition.tsx` deleted — ✅

## Ready for next step

The video is eval-validated and ready to render. To produce the final MP4s:

```bash
cd "APM/Fiserv Brain/05-prototypes/fiserv-brain-demo"
npx remotion render FiservBrainMain fiserv-brain-main.mp4
npx remotion render IndigoRoadShowcase indigo-road-showcase.mp4
npx remotion render CasaRosaShowcase casa-rosa-showcase.mp4
npx remotion render NorthGateShowcase northgate-showcase.mp4
```

To preview interactively (already running on port 3000):

```bash
# Already running — open http://localhost:3000
# Or restart with:
cd "APM/Fiserv Brain/05-prototypes/fiserv-brain-demo" && npm run dev
```
