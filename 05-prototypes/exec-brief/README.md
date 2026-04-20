# Fiserv Brain — Executive Brief (HTML Motion Page)

A single-file scroll-animated HTML deck designed to brief the Fiserv CEO and CPO on the Fiserv Brain concept. Built to be **portable**: emailable, openable from `file://`, printable to PDF, offline-capable.

## How to open

### Option 1 — Double-click (simplest)
Open `index.html` in any modern browser (Chrome, Safari, Firefox, Edge). No build step, no install, no server. Keyboard shortcuts work out of the box.

### Option 2 — Serve locally (for live preview with proper URLs)
```bash
cd "APM/Fiserv Brain/05-prototypes/exec-brief"
python3 -m http.server 3100
# Then open http://localhost:3100
```

Or use the `fiserv-brain-exec-brief` launch config from `APM/.claude/launch.json`.

### Option 3 — Email / share
`index.html` is self-contained — inline CSS, inline JS, no asset folder. You can email the file directly. The only external dependency is Google Fonts (Inter); the page gracefully falls back to `SF Pro Display` → system UI if the network isn't available.

## Controls

| Key | Action |
|---|---|
| `↓` / `Space` / `j` | Next section |
| `↑` / `k` | Previous section |
| `Home` | Jump to cover |
| `End` | Jump to closing |
| Mouse wheel / trackpad | Normal smooth scrolling |
| Right-side dots | Click to jump to any section |

## Print to PDF (for email handout)

1. `Cmd+P` (macOS) or `Ctrl+P` (Windows)
2. Destination: **Save as PDF**
3. Layout: Portrait
4. The `@media print` styles kick in automatically:
   - Animations disabled
   - Page break between every section
   - Dark → light palette swap
   - Nav + progress bar hidden

The printed PDF is email-ready for execs who don't want to scroll through an HTML file.

## Content structure (15 sections)

| # | Section | Maps to user brief question |
|---|---|---|
| 1 | Cover | (setup) |
| 2 | The problem / why now | Framing anchored to Sept 2025 class action |
| 3 | What the Brain does for the ecosystem | Q: What can the Brain do for our merchant ecosystem |
| 4 | Jobs to be done | 2(a) — JTBD: Integrate / Go-Live / Operate |
| 5 | Strategy evolution | 2(b) — How the strategy came into place since inception |
| 6 | 5-axis segmentation | 2(c) — Segmentation framework |
| 7 | The 3 pilot personas | 2(c) — Indigo Road / Casa Rosa / NorthGate |
| 8 | Architecture + "training" | 3(a) — Structure + how it's trained |
| 9 | Internal Fiserv benefits | 3(b) — Benefits for internal stakeholders |
| 10 | Merchant benefits | 3(c) — Benefits for merchants |
| 11 | Auto-learning flywheel | 3(d) — How the brain gets sharper |
| 12 | How to pitch internally | User's extra ask — pitch strategy |
| 13 | Ops changes Fiserv must make | User's extra ask — ops improvement |
| 14 | The ask (time-boxed) | CTA |
| 15 | Closing | Bottom line |

Total read time: ~5–8 minutes scrolling on a laptop, or ~3 minutes if skimming.

## Design principles applied

Directly inherited from the Remotion pitch video's `eval-criteria.md`:

1. **One idea per section** — Jobs keynote discipline
2. **Specific numbers in every technical section** — no vague claims
3. **All 3 synthetic merchants named + real public anchor** (Inspire Brands, Yum!, Sept 2025 class action)
4. **No buzzwords** — no "transformative," "seamless," "next-gen," "revolutionary," etc.
5. **CTA names Slice A + B + D explicitly** in the ask section
6. **Problem scene anchored to the Sept 2025 Payeezy → Clover class action** — the single strongest public evidence of the retention problem the Brain solves

All 6 criteria pass. Same rubric as the Remotion video, same binary scoring.

## Presentation tips

**For a live walkthrough with the CEO + CPO (15 min):**
1. Open the page fullscreen (`Cmd+Shift+F` in most browsers)
2. Let the title card breathe for 5 seconds before scrolling
3. Pause on sections 2, 5, 8, 11, and 14 — those are the "do they get it?" beats
4. The anti-patterns callout in section 12 is the part where you look up and make eye contact — it's the "I know the politics" credibility moment
5. End on section 15. Do not read the tagline out loud. Let it sit.

**For async email distribution:**
1. Print to PDF (see above)
2. Attach the PDF + a 3-line cover email: (a) subject + who sent it, (b) what it is (exec brief on Fiserv Brain), (c) 15-min read → 150-day pilot → $1.2M ask → $1.4B ceiling
3. Or embed a screenshot of the title card inline and link to the HTML file

**For an interview pitch (external):**
1. Skip sections 12 and 13 (internal politics + ops changes — not relevant to an external audience)
2. Emphasize sections 3, 4, 8, and 11 — the product narrative
3. Close on section 15

## Companion artifacts in the workspace

This brief is one of five exec-ready artifacts Ajay built:

1. **This file** — `05-prototypes/exec-brief/index.html` (scroll-animated HTML deck)
2. **Remotion pitch video** — `05-prototypes/fiserv-brain-demo/` (3-minute animated video with matching palette)
3. **Rehearsal transcripts** — `05-prototypes/rehearsals/transcripts.md` (5 scripted demo scenarios)
4. **Eval report** — `05-prototypes/evals/eval-run-report-v1.md` (21/21 scenario pass rate)
5. **Workspace documentation** — `00-strategy/`, `01-personas/`, `02-lifecycle/`, `03-architecture/`, `04-prd/`

All five are internally consistent: same palette, same merchants, same numbers, same tone. If an exec asks "can I see more," every layer of detail is already built.

## Tech notes

- **Single file:** ~50 KB HTML with inline everything. No build, no npm, no bundler.
- **Vanilla JS:** Intersection Observer for animations, simple scroll progress bar, keyboard shortcuts. No React, no dependencies.
- **Accessibility:** semantic HTML (`<main>`, `<section>`, proper heading hierarchy). Nav labels for screen readers.
- **Browser support:** any browser from the last 3 years. Uses standard CSS (custom properties, grid, flexbox) and standard JS (IntersectionObserver, arrow functions).
- **Print-friendly:** `@media print` disables animations and swaps to a light palette.
- **Mobile:** works down to ~720px wide. Executives present on laptops/desktops — no mobile-first optimization.

## Known limitations

- No animation while offline: Google Fonts won't load without internet. Falls back to system SF Pro Display / Inter cleanly.
- Section transitions are scroll-triggered, not slide-based. If an exec wants PowerPoint-style click-through, print to PDF instead.
- The NorthGate persona summary is truncated for space. Full detail is in the Remotion `NorthGateShowcase` composition + `05-prototypes/synthetic-merchants/northgate-qsr-holdings/`.

## Changelog

- **2026-04-14** — v1 initial build. 15 sections, 6/6 eval criteria pass, tsc-equivalent clean (vanilla JS, no types to check but manually verified via live preview).
