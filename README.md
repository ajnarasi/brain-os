# Brain OS — Fiserv Merchant Brain

> *"Every Fiserv merchant gets a second brain that knows their stack cold — integrated from day one, learns from every incident, and talks to Fiserv on their behalf."*

A side-project pitch to validate whether a per-merchant "second brain" (Karpathy-style durable memory + agents) could be Fiserv's next productized layer above its merchant ecosystem. Demo-ready PM artifact — not an internal roadmap.

**Live deck:** _set after first Vercel deploy_ · **Source:** https://github.com/ajnarasi/brain-os

---

## Run the deck locally

```bash
cd 05-prototypes/exec-brief
npx http-server -p 3100 -c-1 --silent     # then open http://localhost:3100
```

The deck is a single `index.html` (~237 KB) with inline CSS/JS plus an `assets/` folder containing 4 rendered MP4 videos (~26 MB total). 34 sections across 7 tabs (Overview · Product · Demo · Architecture · Structure · Value & Safety · The Ask).

## Re-render the videos

```bash
cd 05-prototypes/fiserv-brain-demo
npm install
npx remotion render FiservBrainMain    out/FiservBrainMain.mp4
npx remotion render IndigoRoadShowcase out/IndigoRoadShowcase.mp4
npx remotion render CasaRosaShowcase   out/CasaRosaShowcase.mp4
npx remotion render NorthGateShowcase  out/NorthGateShowcase.mp4
# Then copy the showcase MP4s into ../exec-brief/assets/
```

## Deploy

```bash
cd 05-prototypes/exec-brief
npx vercel --prod
```

A `vercel.json` is included with sensible cache headers (long-lived for `assets/`, short for `index.html`).

---

## The idea in 60 seconds

Fiserv already owns the rails under millions of merchants across direct, bank, ISV, ISO, PayFac, marketplace, franchise, and referral channels — running on commerce platforms like Clover, CommerceHub, IPG (Ucom), Carat, and Optis, with authorization flowing underneath through Nashville, Omaha, Buypass, STAR/NYCE, TeleCheck, and ValueLink. What it doesn't own is the **knowledge layer** those merchants build every day: what broke during integration, which configs got tuned for BFCM, which dispute template works for this MCC, which settlement window a specific partner bank uses.

Today that knowledge lives in TAM heads, Slack threads, and expired support tickets. The **Fiserv Brain** is the productization of that knowledge — a per-merchant second brain that:

1. **Compresses integration** (sandbox → cert → prod) with a memory that never forgets the last failure.
2. **Runs the go-live** with a launch brain that watches the first 72 hours and hot-dials the TAM when something drifts.
3. **Operates the business afterwards** — ticket deflection, incident narratives, analytics in plain English, and eventually agentic execution (open a ticket, adjust routing, reconcile settlement).

The non-obvious insights: the Brain must be **channel-aware AND platform-aware**. A Clover-ISV merchant, a community-bank-channel SMB, a direct CommerceHub mid-market brand, and a Yum!-scale IPG strategic merchant all need different surfaces, different data access, different commercial models, different ISO 8583 parsers, and wildly different autonomy envelopes. Every other "payments AI" product skips both.

---

## Folder map

```
Fiserv Brain/
├── 00-strategy/         Vision, Karpathy mapping, market thesis, monetization, moat
├── 01-personas/         5-axis segmentation: size × channel × vertical × business model × platform
│   ├── size-segments/   Micro-SMB → Strategic Global
│   ├── channels/        Direct, bank, ISO, ISV, PayFac, marketplace, referral, franchise
│   ├── verticals/       14 MCC clusters from retail to high-risk specialty
│   ├── business-models/ B2C, B2B, marketplace, subscription, omnichannel, MOTO
│   └── platforms/       Front-end (Clover, CommerceHub, IPG/Ucom, Carat, Optis) +
│                        Back-end (Nashville, Omaha, Buypass, STAR/NYCE, TeleCheck)
├── 02-lifecycle/        Integrate → Go-Live → Operate, with journey maps per phase
├── 03-architecture/     System overview, memory layers, agent topology, knowledge graph
├── 04-prd/              Master PRD + MVP scope (fashion + Clover restaurant + stretch bank + V2 IPG)
├── 05-prototypes/       Code / demos (reserved)
├── 06-research/         Karpathy notes, competitors, customer interviews
└── CHANGELOG.md         Running log of decisions
```

---

## Where to start reading

If you have 5 minutes: **`00-strategy/vision.md`** + **`04-prd/mvp-scope.md`**.
If you have 30 minutes: add **`00-strategy/karpathy-mapping.md`**, **`01-personas/segmentation-framework.md`**, and **`03-architecture/system-overview.md`**.
If you're doing a full pass: walk the folders top-to-bottom.

---

## Relationship to APM Checkout SDK

The APM Checkout SDK (parent `APM/` directory) is **one of many parallel tracks** the Brain would orchestrate — not the Brain itself. The Brain is a control plane that sits above APM, disputes, settlement, fraud, onboarding, and analytics. Treat everything outside this `Fiserv Brain/` folder as unrelated work.

## Status

First-pass scaffold + seeded thesis. Next step: customer interviews (3 mid-market fashion brands, 5 Clover restaurants, 1 community bank channel partner) to validate or kill the wedges in `04-prd/mvp-scope.md`.
