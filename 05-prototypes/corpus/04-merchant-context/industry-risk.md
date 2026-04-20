---
title: "Industry Risk and Payments Research 2025-2026"
topic: "industry-risk"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://merchantriskcouncil.org/resource-center"
    title: "Merchant Risk Council Resource Center"
    accessed: "2026-04-14"
  - url: "https://merchantriskcouncil.org/resource-center/research/global-payments-and-fraud-report"
    title: "MRC Global Payments and Fraud Report"
    accessed: "2026-04-14"
  - url: "https://nilsonreport.com/publication_chart_and_graphs_archive.php"
    title: "Nilson Report public charts archive"
    accessed: "2026-04-14"
  - url: "https://risk.lexisnexis.com/insights-resources/research/us-ca-true-cost-of-fraud-study"
    title: "LexisNexis True Cost of Fraud Study 2025"
    accessed: "2026-04-14"
  - url: "https://www.datos-insights.com/research/"
    title: "Datos Insights (formerly Aite-Novarica) research hub"
    accessed: "2026-04-14"
  - url: "https://chargebacks911.com/reports/"
    title: "Chargebacks911 public reports library"
    accessed: "2026-04-14"
---

## Overview

For the Fiserv Brain demo, the "industry risk" corpus is the grounding layer that lets the model talk credibly about payments risk, fraud, chargebacks and acquiring concentration without leaking any non-public Fiserv data. This file captures the publicly available research landscape as of April 2026, focused on five sources that are regularly cited by practitioners: the Merchant Risk Council (MRC), the Nilson Report, Datos Insights (formerly Aite-Novarica), LexisNexis Risk Solutions, and Chargebacks911. It then highlights the 2025-2026 themes that matter most for Brain's demo scenarios.

## Key findings

### 1. Merchant Risk Council (MRC) - the operator-side consensus
The MRC is the primary industry body for merchant payments and fraud professionals. Its public-facing outputs include the **Global Payments and Fraud Report** (its flagship annual research piece), the Paladin Vendor Reports, and regional insights such as the Southeast Asia Digital Commerce Insights series (merchantriskcouncil.org/resource-center). Many detailed sections are members-only, but the publicly summarized themes consistently cover:

- Fraud prevention and payment optimization as a joint discipline rather than two separate functions
- First-party misuse ("friendly fraud") as a growing share of chargeback volume
- Card network rule changes (PSD2/SCA, PSD3, Brazil 3DS, India RBI rules) and how merchants respond operationally
- Cybercrime and account takeover threats that cross the boundary from fraud into security
- Authorization optimization and decline recovery as a revenue lever, not just a loss-reduction lever

For the Brain demo, MRC is the voice Brain can "speak in" when talking about operator priorities: the framing of fraud, auth, and retention as interconnected is now the industry consensus, not a hot take.

### 2. Nilson Report - the scoreboard for the industry
The Nilson Report (nilsonreport.com) is the most widely cited public scoreboard for the payments industry. Its public chart and graphs archive (nilsonreport.com/publication_chart_and_graphs_archive.php) regularly surfaces data points that practitioners quote verbatim, including:

- Top US and global merchant acquirers ranked by purchase transactions and purchase volume - Fiserv is consistently one of the top acquirers by transaction count in the US
- Global card fraud losses as a share of total card purchase volume
- Card issuer rankings and network market share
- Year-over-year growth in card purchase volume by region

When the Brain demo needs to situate Fiserv's position or cite industry-level fraud trends, Nilson is the right public anchor - practitioners will immediately recognize the source.

### 3. Datos Insights (formerly Aite-Novarica) - analyst view
Datos Insights publishes a steady stream of analyst reports on fraud, payments and retail banking, with a subset of each report surfaced publicly as executive summaries and blog posts (datos-insights.com/research). The 2025-2026 themes that appear repeatedly in Datos' public work are:

- **AI in payments operations.** Moving from rule-based fraud decisioning to hybrid rule + model + LLM workflows, and the governance that goes with it.
- **First-party fraud measurement.** The industry's inability to cleanly distinguish genuine friendly-fraud chargebacks from actual fraud, and the operational cost of getting it wrong.
- **Card-not-present (CNP) fraud growth.** CNP share of total fraud losses continues to rise relative to card-present as EMV displaces counterfeit-card fraud.
- **Merchant retention as a risk domain.** Attrition risk and pricing pressure are increasingly discussed in the same breath as fraud, because losing a large merchant is a larger P&L event than most fraud losses.
- **Authorization rate as a board-level metric.** Executive dashboards now show auth rate next to fraud rate, and the gap between best-in-class and median auth is measured in hundreds of basis points.

### 4. LexisNexis True Cost of Fraud Study - the cost multiplier
The LexisNexis True Cost of Fraud Study is an annual public research piece widely cited by merchants and acquirers. The 2025 US and Canada edition (risk.lexisnexis.com/insights-resources/research/us-ca-true-cost-of-fraud-study) reported on a survey of 507 fraud and risk professionals at US and Canadian financial institutions, and its publicly disclosed headline numbers include:

- The average total cost is approximately **$5.75 for every $1 of fraud loss** for US financial services, once chargebacks, fees, labor and replacement costs are included.
- **Only about 1 in 5 institutions** rely primarily on automated fraud strategies.
- **44% of surveyed institutions** rely mostly or entirely on manual processes for fraud decisioning.
- **Half of institutions** cite emerging synthetic and stolen identities as a significant operational challenge.

LexisNexis's five public recommendations - strengthen digital identity verification, layer fraud solutions by customer journey stage, prioritize automation and analytics, communicate fraud control value to customers, and balance security with user experience - are the closest thing the industry has to a shared playbook, and Brain can reference them without overreaching.

### 5. Chargebacks911 - the dispute-operations view
Chargebacks911 (chargebacks911.com/reports) publishes an ongoing set of free reports and reason-code guides that have become de facto references for merchants and acquirers managing disputes. Its public materials are particularly useful for:

- Canonical Visa, Mastercard, Amex and Discover reason-code lists (which the companion `failure-patterns.md` file draws from directly)
- First-party fraud measurement (friendly fraud as a percentage of total chargebacks, estimated at a large and growing share year over year)
- Representment win-rate benchmarks by industry and reason code
- Issuer behavior patterns around 3DS and liability shift

## Consolidated 2025-2026 themes for Brain

Pulling across MRC, Nilson, Datos, LexisNexis and Chargebacks911, five themes recur often enough to be treated as industry consensus:

**1. AI in payments is crossing from fraud into auth and dispute.**
What used to be a fraud-scoring conversation is now a multi-workflow conversation: authorization routing, dispute evidence generation, and fraud decisioning are all being rebuilt around ML and LLMs. MRC and Datos both highlight this as a board-level shift.

**2. Merchant retention is now a risk topic.**
Large merchant attrition and mid-market attrition are discussed alongside fraud and chargebacks in analyst publications, because a lost flagship merchant is typically a bigger annual P&L event than a typical fraud loss. Datos' 2025 publications are particularly explicit on this.

**3. First-party fraud is the fastest-growing chargeback category.**
MRC, Chargebacks911 and LexisNexis all describe first-party misuse as a growing share of total dispute volume. The operational consequence is that merchants increasingly need historical context (prior purchases, device, IP, delivery history) to win representments.

**4. CNP fraud continues to outgrow card-present fraud.**
As EMV liability shift has suppressed counterfeit-card fraud, fraud has migrated online. Nilson's public charts and MRC's Global Payments and Fraud Report consistently show CNP dominating the loss mix in developed markets.

**5. Authorization optimization has joined fraud as a primary revenue lever.**
Authorization rate is now routinely discussed alongside fraud rate on executive dashboards. The difference between "median auth rate" and "best-in-class auth rate" for a given merchant segment is a meaningful revenue lever, and is called out by Datos, MRC and the major networks.

## Representative Brain-demo questions this file supports

- "What's the industry-standard cost multiplier for fraud losses right now?" (LexisNexis $5.75 per $1)
- "Where does Fiserv sit in the US merchant acquiring league tables?" (Nilson)
- "Is first-party fraud really growing, or is that a vendor talking point?" (MRC, Chargebacks911, LexisNexis consensus)
- "What are the 2025-2026 themes a merchant risk leader would expect Brain to understand without being briefed?" (the five consensus themes above)
- "Where are the boundaries of what Brain can say without leaking private data?" (everything in this file is publicly cited)

## Relevance to Fiserv Brain demo

This file gives Brain a trustworthy "outside view" of the payments industry in 2026. Anchored in five well-known public sources, it lets the demo answer risk, fraud, retention and auth questions with the vocabulary, numbers and framing that senior payments professionals actually use - without depending on any internal Fiserv intelligence. That is critical for the demo's credibility: senior merchants and reviewers will recognize the MRC, Nilson, Datos, LexisNexis and Chargebacks911 references immediately, and will treat Brain's answers as grounded rather than improvised.
