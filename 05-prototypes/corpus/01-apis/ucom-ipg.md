---
title: "Ucom / Connected Commerce / IPG NA"
topic: "ucom-ipg"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "medium"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://developer.fiserv.com/product/ConnectedCommerce"
    title: "Connected Commerce — Fiserv Developer Studio"
    accessed: "2026-04-14"
  - url: "https://developer.fiserv.com/product/IPGNA"
    title: "Internet Payment Gateway (IPG) NA — Fiserv Developer Studio"
    accessed: "2026-04-14"
  - url: "https://developer.fiserv.com/product/IPGNA/api/?type=post&path=/payments&branch=main&version=1.0.0"
    title: "IPGNA — POST /payments API reference"
    accessed: "2026-04-14"
  - url: "https://docs.fiserv.dev/public/docs/introduction"
    title: "Fiserv Dev Docs — Introduction (IPG / Gateway)"
    accessed: "2026-04-14"
  - url: "https://docs.fiserv.dev/public/docs/payments-hpp-quickstart"
    title: "Hosted Payment Page (Connect) Quickstart"
    accessed: "2026-04-14"
  - url: "https://docs.fiserv.dev/public/docs/payments-generate-a-hash"
    title: "Generate a Message Signature / Hash (IPG)"
    accessed: "2026-04-14"
  - url: "https://merchants.fiserv.com/content/dam/firstdata/uk/en/pdf/online-payments/connect-integration-guide-v3.4.pdf"
    title: "First Data Gateway Connect Integration Guide v3.4"
    accessed: "2026-04-14"
  - url: "https://github.com/Fiserv-Developer/Fiserv-Hosted-Payment-Page-demo"
    title: "Fiserv-Developer/Fiserv-Hosted-Payment-Page-demo"
    accessed: "2026-04-14"
  - url: "https://newsroom.fiserv.com/news-releases/news-release-details/inspire-brands-streamlines-omnichannel-commerce-across-north"
    title: "Inspire Brands Streamlines Omnichannel Commerce via Expanded Fiserv Relationship (Sept 2023)"
    accessed: "2026-04-14"
  - url: "https://www.pymnts.com/partnerships/2023/dunkin-owner-inspire-brands-expands-fiserv-collab-simplify-omnichannel-commerce/"
    title: "PYMNTS — Dunkin' Owner Inspire Brands Expands Fiserv Collab for Omnichannel Commerce"
    accessed: "2026-04-14"
---

# Ucom / Connected Commerce / IPG NA

## Overview

"Ucom" is the internal Fiserv shorthand for what the public developer portal lists as **Connected Commerce**, and the closely-related **Internet Payment Gateway NA (IPG NA)**. These are the omnichannel / orchestration and legacy-gateway surfaces that sit next to Commerce Hub in the Fiserv commerce stack. They are the infrastructure that powers **Carat**, Fiserv's global commerce platform used by large enterprise merchants including eight of the ten largest global QSRs — most prominently Inspire Brands (Dunkin', Baskin-Robbins, Sonic, Arby's, Buffalo Wild Wings, Jimmy John's), whose 2023 expansion of the Fiserv relationship to unify in-store, in-app, and online commerce is the canonical public reference for what Connected Commerce does in practice.

Two concrete public developer surfaces back this product family:
1. **Connected Commerce** on Developer Studio (`developer.fiserv.com/product/ConnectedCommerce`) — the omnichannel orchestration product.
2. **IPG NA** on Developer Studio (`developer.fiserv.com/product/IPGNA`) and the older gateway docs at `docs.fiserv.dev/public/docs/` — the underlying Internet Payment Gateway, historically known as First Data Global Gateway / Gateway e4 / Gateway Connect. The IPG is the gateway that actually processes transactions for many Connected Commerce / Carat flows.

Reliability is rated "medium" because while Carat's business proposition and the Inspire Brands partnership are well-reported in the press, and the underlying IPG has extensive public PDF integration guides and a dev docs site, the Developer Studio pages for Connected Commerce itself are sparse and much of the orchestration layer's API surface is behind a login.

## Public documentation sources

**Connected Commerce (Ucom) product page**
- `https://developer.fiserv.com/product/ConnectedCommerce`

**IPG NA — the underlying gateway**
- `https://developer.fiserv.com/product/IPGNA` — Developer Studio product landing
- `https://developer.fiserv.com/product/IPGNA/api/?type=post&path=/payments&branch=main&version=1.0.0` — `POST /payments` reference
- `https://docs.fiserv.dev/public/docs/introduction` — IPG/Gateway developer docs (separate from Developer Studio)
- `https://docs.fiserv.dev/public/docs/payments-hpp-quickstart` — Hosted Payment Page (Connect) quickstart
- `https://docs.fiserv.dev/public/docs/payments-generate-a-hash` — message signature / `hashExtended` construction
- `https://docs.fiserv.dev/public/docs/payment-url-1` — payment URL reference
- `https://merchants.fiserv.com/content/dam/firstdata/uk/en/pdf/online-payments/connect-integration-guide-v3.4.pdf` — First Data Gateway Connect Integration Guide v3.4 (authoritative PDF for Connect field set)
- `https://merchants.fiserv.com/content/dam/firstdata/au/en/documents/IPG_IntegrationGuide_Connect_V2020-4%20Aust_v2.pdf` — IPG Connect Integration Guide (AU flavor, same field set)
- `https://github.com/Fiserv-Developer/Fiserv-Hosted-Payment-Page-demo` — official HPP demo app

**Carat / Connected Commerce business context**
- `https://www.fiserv.com/en/insights/articles-and-blogs/drive-more-commerce-with-carat.html` — Carat overview
- `https://newsroom.fiserv.com/news-releases/news-release-details/inspire-brands-streamlines-omnichannel-commerce-across-north` — Inspire Brands announcement (Sept 27, 2023)
- `https://www.pymnts.com/partnerships/2023/dunkin-owner-inspire-brands-expands-fiserv-collab-simplify-omnichannel-commerce/` — press coverage

## Integration model

**Two distinct layers.**

1. **Connected Commerce / Carat (orchestration)** — enterprise-grade omnichannel orchestration: unified tokens across in-store EMV, in-app, and web; unified settlement, reporting, analytics; gift and loyalty; routing to the appropriate processing rail per region. The public Developer Studio page describes this at a product level; the detailed API reference is largely behind Developer Studio authentication.

2. **IPG NA (underlying gateway)** — the technical REST and hosted-page surface that handles individual transactions. Two integration modes:
   - **API (server-to-server)** — `POST /payments` on the Developer Studio reference; `POST /ipgapi/services/order/...` in the legacy documentation. Accepts a JSON/XML transaction envelope and returns an authorization result.
   - **Connect / Hosted Payment Page** — redirect the cardholder to `https://test.ipg-online.com/connect/gateway/processing` (prod: `https://www.ipg-online.com/connect/gateway/processing`) with a signed form POST, then receive the result at `responseSuccessURL` / `responseFailURL`.

**Authentication / request signing.**
- IPG uses a **message signature hash**, not OAuth. For Connect/HPP the field is `hashExtended`, constructed from the store name, transaction timing, amount, currency, and the shared secret, and documented at `docs.fiserv.dev/public/docs/payments-generate-a-hash` and in the Connect Integration Guide PDF.
- Production use requires an approved production API key, active gateway onboarding, and a valid Message Signature on every request.
- The Developer Studio IPG NA reference uses a similar signed-header scheme described in its API docs.

**Store model.** IPG is organized by `storename` (also called "store ID") — a merchant's gateway identity. All requests carry the store identifier and must be signed with that store's shared secret.

## Key API surfaces

**IPG (public PDF + dev docs, high confidence):**
- `POST /payments` (Developer Studio) — unified transaction endpoint covering sale, preauth, postauth, void, return, forceauth, tagged refund, and tagged void.
- **Connect Hosted Payment Page** — form POST to `/connect/gateway/processing` with `txntype`, `storename`, `chargetotal`, `currency`, `txndatetime`, and `hashExtended`.
- **Recurring orders** — scheduled billing and tokenized card-on-file against the gateway.
- **Token service** — store a card once, charge many; the token is gateway-scoped.
- **3D Secure** — 3DS1/3DS2 on both the API and HPP flows.
- **Refunds, voids, inquiries** — referenced by order ID.
- **Level 2 / Level 3 data** fields are supported on the envelope for corporate/purchasing-card transactions (documented in the Connect Integration Guide PDF).

**Connected Commerce orchestration (product-level, lower detail):**
- Unified tokens that move between in-store EMV captures and ecom flows.
- Cross-channel order and customer identity.
- Settlement, reporting, and analytics consolidation across channels (the Inspire Brands announcement specifically cites this).
- Gift card issuance and redemption across channels.

## Known integration patterns / failure modes

- **Hash mismatch on HPP** — the `hashExtended` must be computed with the exact same field order, amount formatting, and `txndatetime` as the submitted form; any drift fails the form POST. This is the single most common onboarding issue for IPG Connect.
- **Timezone and datetime format** — `txndatetime` must match gateway expectations; UTC vs. local store time tripping up new integrations is a recurring theme in the PDFs.
- **Store secret rotation** — changing the shared secret mid-integration invalidates outstanding recurring schedules if they were cached.
- **Two documentation universes** — the newer Developer Studio (`developer.fiserv.com/product/IPGNA`) and the older `docs.fiserv.dev/public/docs/` site describe overlapping but not identical surfaces. Teams often pick one and miss fields defined only in the other, or miss the canonical v3.4 / v2020-4 PDFs entirely.
- **Connected Commerce vs IPG vs Commerce Hub confusion** — all three can process a card, and the "right" one depends on the merchant's contract and which Fiserv platform they were onboarded to. There is no public decision tree mapping a merchant to the correct product.

## Gaps — what is NOT publicly available

- The Connected Commerce orchestration REST API reference at field level — the Developer Studio page is a product overview, not an API spec.
- How Connected Commerce routes between Commerce Hub, IPG NA, and international IPG instances under the hood.
- The Carat-specific unified-token format and its interop with Commerce Hub tokens.
- SLA, rate-limit, and concurrency numbers for any of these surfaces.
- Per-merchant routing rules and tokenization domains.
- Complete list of supported alternative payment methods per region under Connected Commerce.

## Disambiguation

"Ucom" is the internal shorthand. The public names are **Connected Commerce** (on Developer Studio) and **IPG NA** (the underlying gateway). **Carat** is the branded enterprise commerce platform that sits on top and is the name used in marketing and press — most famously in the September 27, 2023 Inspire Brands expansion.

## Relevance to Fiserv Brain demo

Ucom/Connected Commerce is the most ambiguous entry in the Fiserv Brain corpus — it has multiple names (Ucom, Connected Commerce, Carat, IPG NA), two developer documentation universes (Developer Studio + docs.fiserv.dev), and significant overlap with Commerce Hub. For the demo, having this file lets the Brain correctly disambiguate a question like "which Fiserv product does Inspire Brands use?" (answer: Carat, built on Connected Commerce) versus "how do I sign an IPG Connect request?" (answer: `hashExtended`, not HMAC SHA256 — that's Commerce Hub).
