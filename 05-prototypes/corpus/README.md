# Corpus — Demo Data for Fiserv Brain Prototype

Curated public-web-research corpus. Feeds the Day-2 ingestion step of the 5-day demo sequence in `../demo-mvp.md`. This is the Brain's "KB" for the prototype — what DocsAgent, IntegrationAgent, and the other agents retrieve against.

## What this is

- **15 markdown files** across 4 topic clusters (~21,400 words total)
- **Public web sources only** — every file has YAML frontmatter with source URLs
- **Synthetic / demo use only** — NOT production data
- Collected via 4 parallel `deep-research-agent` runs on 2026-04-14

## What this is NOT

- Not Fiserv internal data
- Not customer-confidential
- Not PII-bearing
- Not production-grade — this is a demo corpus meant to show the concept, not operate a real merchant

## Folder structure

```
corpus/
├── 01-apis/                      Public API & product documentation
│   ├── clover.md                 SMB POS + App Market
│   ├── commercehub.md            Mid-market / enterprise unified commerce
│   ├── ucom-ipg.md               Ucom = Connected Commerce + IPG (strategic QSR, Inspire Brands)
│   ├── snappay.md                B2B AR/AP for SAP/Oracle/NetSuite/JDE/MS Dynamics
│   └── mypg.md                   NEGATIVE RESULT — no public product by this name
├── 02-fiserv-general/            Fiserv corporate narrative + merchant reality
│   ├── blogs-press-releases.md   Agentic commerce pacts, FIUSD stablecoin, Clover Q1 2025, Finxact, CEO transition
│   └── merchant-issues.md        Sept 2025 securities class action + 7 top complaint themes
├── 03-industry-standards/        Reference specs
│   ├── iso-8583.md               Message structure, DEs, flows, dialects
│   ├── emv-emvco.md              Contact/contactless EMV, 3DS 2.x, tokenization
│   ├── nacha.md                  ACH operating rules, SEC codes, return codes, Same-Day ACH
│   └── pci-dss.md                PCI DSS 4.0, 12 requirements, SAQs, tokenization/P2PE
└── 04-merchant-context/          Merchant personas + risk + failure modes
    ├── strategic-merchants.md    Yum!, Costco, Inspire (grounds NorthGate QSR persona)
    ├── clover-merchants.md       Clover case studies + reviews (grounds Casa Rosa persona)
    ├── industry-risk.md          MRC, Nilson, Datos, LexisNexis, Chargebacks911
    └── failure-patterns.md       Visa/MC/Amex chargeback tables + decline codes + SDK issue patterns
```

## Frontmatter schema

Every file starts with:

```yaml
---
title: "<Platform or topic>"
topic: "<slug>"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high | medium | low"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "<URL>"
    title: "<Title>"
    accessed: "2026-04-14"
---
```

Ingestion scripts should respect `reliability` (down-weight low-reliability entries in retrieval) and parse `sources[]` for citation rendering in the Brain's responses.

## How this corpus feeds the demo

Per `../demo-mvp.md`:

1. **Day 2 — corpus ingestion:** this folder is the input. Chunk + embed + tag by topic cluster.
2. **Day 3 — agent grounding:** DocsAgent, IntegrationAgent, DisputeAgent, IncidentAgent retrieve against this corpus.
3. **Day 4 — eval iteration:** the golden eval scenarios reference specific citations in these files.
4. **Day 5 — demo scenarios:** each of the 5 demo scenarios relies on specific knowledge from this corpus.

### Which cluster serves which demo scenario

| Demo scenario | Primary clusters |
|---|---|
| "Why did this transaction decline?" | `03-industry-standards/iso-8583.md`, `04-merchant-context/failure-patterns.md` |
| "Walk me through integrating 3DS" | `01-apis/commercehub.md`, `01-apis/clover.md`, `03-industry-standards/emv-emvco.md` |
| "Give me my daily close narrative" | `01-apis/clover.md`, `04-merchant-context/clover-merchants.md` |
| "Draft a dispute response" | `04-merchant-context/failure-patterns.md` (chargeback code tables), `03-industry-standards/iso-8583.md` |
| "Something is wrong with my auth rate today" (NorthGate QSR) | `01-apis/ucom-ipg.md`, `04-merchant-context/strategic-merchants.md`, `04-merchant-context/industry-risk.md` |

## Reliability map

| Cluster | Reliability | Notes |
|---|---|---|
| 01-apis (Clover, CommerceHub, Ucom/IPG, SnapPay) | **High** | Primary sources at developer.fiserv.com, docs.clover.com, github.com/Fiserv |
| 01-apis/mypg.md | **N/A** | Negative result — no public product found |
| 02-fiserv-general/blogs-press-releases | **High** | investors.fiserv.com, pymnts.com, primary press releases |
| 02-fiserv-general/merchant-issues | **Medium** | Mix of SEC filings, reviews, anonymized complaints — calibrate on "theme" weight |
| 03-industry-standards | **High** | Wikipedia + ISO + emvco.com + nacha.org + pcisecuritystandards.org |
| 04-merchant-context | **Medium–High** | SEC 10-Ks are high; review-site consensus is medium |

## Notable framing findings from corpus research

Two things surfaced during research that sharpen the Brain's pitch:

1. **Fiserv securities class action (September 2025)** — public allegation that Fiserv inflated growth by forcibly migrating ~200,000 Payeezy merchants to Clover and concealed merchant churn to Square/Toast. April 24 2025 stock drop 18.5% to $176.90. This is public evidence that **Fiserv has a merchant-retention problem** — exactly what the Brain is designed to address. Use as the "why now" framing in any pitch.

2. **Fiserv's own agentic commerce pacts with Visa + Mastercard (December 2025)** — Visa Trusted Agent Protocol + Mastercard Agent Pay Acceptance Framework. Fiserv is publicly committing to agentic commerce infrastructure at the network level. The Brain is the merchant-facing counterpart: if Fiserv is enabling AI agents to *transact* via those pacts, the Brain is how merchants *operate* inside that new world. The two stories line up.

See `02-fiserv-general/blogs-press-releases.md` and `02-fiserv-general/merchant-issues.md` for full context.

## Guardrails for using this corpus

- **Anonymize synthetic merchants.** The Yum!, Costco, Inspire Brands content is *inspiration* for synthetic personas, never their real identity. In the demo, use "NorthGate QSR Holdings," not "Arby's."
- **Label every output that cites this corpus** with "public web research — demo use."
- **Never mix with real Fiserv internal data.** The moment that happens, you have a compliance problem you didn't need.
- **Refresh monthly** if the demo stays live — web pages drift, press releases get superseded, class-action filings progress.
- **Cite on every response.** The Brain must show sources — that's non-negotiable.

## Next steps (per `../demo-mvp.md` Day 2)

1. Chunk each file into ~500-token segments
2. Embed with Voyage-3 or OpenAI text-embedding-3-large
3. Store in Chroma / LanceDB (local) or Pinecone (cloud)
4. Tag each chunk with: `topic`, `reliability`, `cluster`, `frontmatter.sources`
5. Test DocsAgent retrieval with 5 ad-hoc questions before proceeding to Day 3

See `INDEX.md` in this folder for a machine-readable manifest.
