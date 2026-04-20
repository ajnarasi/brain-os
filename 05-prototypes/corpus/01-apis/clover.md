---
title: "Clover"
topic: "clover"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://docs.clover.com/docs"
    title: "Clover Developer Documentation — Home"
    accessed: "2026-04-14"
  - url: "https://docs.clover.com/docs/welcome"
    title: "Welcome to Clover Developer Docs"
    accessed: "2026-04-14"
  - url: "https://docs.clover.com/docs/ecommerce-api"
    title: "Clover Ecommerce API Overview"
    accessed: "2026-04-14"
  - url: "https://docs.clover.com/docs/using-oauth-20"
    title: "Using OAuth 2.0 — Clover Developer Docs"
    accessed: "2026-04-14"
  - url: "https://docs.clover.com/docs/webhooks"
    title: "Webhooks — Clover Developer Docs"
    accessed: "2026-04-14"
  - url: "https://docs.clover.com/docs/rest-pay-display-api"
    title: "REST Pay Display API — Clover Developer Docs"
    accessed: "2026-04-14"
---

# Clover

## Overview

Clover is Fiserv's point-of-sale and commerce platform for small and mid-sized merchants. It is one of the most publicly documented products in the Fiserv portfolio: the developer site at `docs.clover.com` exposes a full REST API, Android SDKs for app development on Clover hardware, a dedicated Ecommerce API, a semi-integration protocol for connecting external POS systems to Clover devices, an OAuth 2.0 authorization framework, a webhook subscription system, and a sandbox environment with test merchants. From a corpus standpoint Clover is the "rich" end of the Fiserv developer spectrum — there is enough public surface area to reason about endpoints, object schemas, auth flows, and event payloads without needing any internal material.

The platform combines a cloud REST backend, a merchant/app model (apps installed from the Clover App Market receive scoped tokens per merchant), and on-device payment hardware that runs Android. Unlike Commerce Hub, which is primarily a card-not-present processing API, Clover is simultaneously an ecommerce gateway, an in-person/EMV terminal stack, a merchant SaaS (inventory, orders, employees, customers, reporting), and an app marketplace.

## Public documentation sources

- `https://docs.clover.com/docs` — main documentation portal
- `https://docs.clover.com/docs/welcome` — product surface overview, lists the five core API products (REST API, Ecommerce API, Android SDK, Android Payments API, REST Pay Display API)
- `https://docs.clover.com/docs/ecommerce-api` — ecommerce-specific reference (tokenization, charges, recurring, hosted checkout, iframes)
- `https://docs.clover.com/docs/using-oauth-20` — OAuth 2.0 v2 flow, including PKCE guidance for low-trust clients
- `https://docs.clover.com/docs/webhooks` — webhook subscription, event types, signature verification
- `https://docs.clover.com/docs/rest-pay-display-api` — semi-integration protocol between external POS and Clover devices
- `https://docs.clover.com/docs/clover-android-sdk` — Android SDK for apps running on Clover hardware
- `https://sandbox.dev.clover.com` — sandbox environment with test merchants and test tokens

## Integration model

**Protocols.** Clover exposes REST/JSON for its core merchant platform and Ecommerce API. The Ecommerce API uses short-lived card tokens (`pakms`/`ecomind` style session tokens) generated client-side via a JavaScript SDK (`clover.js`), then charged server-side. The Android SDK is a native Kotlin/Java library for on-device apps; the REST Pay Display API is a semi-integration protocol that lets an external POS send order and payment intents over the local network to a Clover device which then handles the physical card capture.

**Authentication.**
- OAuth 2.0 v2 flow with access tokens and refresh tokens is the production auth for merchant-installed apps. The older v1 flow (non-expiring tokens) still exists in legacy docs but is deprecated.
- PKCE is recommended for public/low-trust clients.
- API tokens (per-merchant, per-app) are used for server-to-server calls after the OAuth dance completes.
- Sandbox has separate test tokens that work only against sandbox merchants.

**Multi-tenancy.** Every request is scoped to a `merchantId`. Apps are installed per-merchant from the Clover App Market, and an access token grants scopes only over that one merchant.

**Webhooks.** Apps can subscribe to merchant events (orders, payments, inventory changes, customer updates). Delivery is HTTP POST to a registered callback URL. Webhook requests include a verification code and payloads that identify the merchant, object type, and object ID — consumers typically fetch the full object via REST after receiving the webhook.

## Key API surfaces

Public docs describe the following major API groupings (exact paths and parameters live in the reference sections of `docs.clover.com`):

- **Merchant / Employees / Roles** — `/v3/merchants/{mId}` and sub-resources for merchant metadata, business hours, tipping configuration, employees, and RBAC.
- **Inventory** — items, categories, modifier groups, tags, stock counts, item overrides per-device.
- **Orders** — create orders, add line items, apply discounts and service charges, calculate tax, associate customers, handle splits.
- **Payments** — payment authorizations, captures, voids, refunds, tips adjustment, tender types, credit/debit/cash/gift-card.
- **Customers** — customer profiles, addresses, marketing consent, loyalty association.
- **Ecommerce API** — separate REST surface for CNP flows: iframe/hosted checkout, tokenization via `clover.js`, charges endpoint, subscriptions/recurring, 3D Secure handoff.
- **Apps / App Market** — app metadata, billing (subscription and metered app charges), installs.
- **Reporting** — closeouts, settlement batches, payment-level exports.
- **REST Pay Display API** — terminal-facing protocol for external POS integrations (transaction start, tip/signature display, receipts, cancel).

## Known integration patterns / failure modes

**Patterns.**
- Semi-integration via REST Pay Display is strongly preferred over direct Android SDK integration for third-party POS vendors that want to stay out of PCI scope — the card never touches the external POS.
- Long-running Android apps on-device should listen to order webhooks rather than polling, and use the local content provider for low-latency reads.
- For ecommerce, the canonical pattern is `clover.js` tokenization in the browser, then server-side `POST /ecomm/v1/charges` with the token.

**Failure modes visible in public docs.**
- Token expiry is the most common integration friction: v2 access tokens expire and must be refreshed, and a lot of older sample code assumes the deprecated non-expiring v1 tokens.
- Webhook delivery is at-least-once, so consumers must dedupe on the event ID or object version.
- Sandbox and production are separate domains (`apisandbox.dev.clover.com` vs `api.clover.com`) with separate merchants and separate tokens — cross-environment mistakes are a frequent support topic.
- Clover charges fees per-API-call over certain volume tiers for some endpoints, which surprises app developers who assume REST access is free.

## Gaps — what is NOT publicly available

- Backend processing linkage: how Clover routes card transactions to the underlying acquirer/processor (First Data / Fiserv back-end, TSYS where applicable) is not documented publicly at the ISO-message level.
- Interchange optimization and Level 2/3 data passing for B2B use cases is not documented on the public developer site.
- Private APIs used by the first-party Clover mobile apps and internal merchant dashboard are not exposed.
- Pricing, MDR, and per-call fee schedules are not in the developer docs — they live in the merchant contract.
- Any cross-product linkage between Clover and Commerce Hub, Carat, or Connected Commerce is not documented on `docs.clover.com`.

## Relevance to Fiserv Brain demo

Clover is the ideal "public rich" anchor for the corpus because it is the one Fiserv product where a PM or engineer can realistically answer integration questions from public docs alone. For the Fiserv Brain demo it serves as the contrast case against CommerceHub (CNP/acquirer API), Connected Commerce/Ucom (omnichannel orchestration), and SnapPay (B2B AR) — showing the Brain correctly identifying Clover as the SMB POS/ecommerce surface rather than routing Clover questions to a generic gateway answer.
