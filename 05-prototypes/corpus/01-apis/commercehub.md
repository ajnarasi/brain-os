---
title: "Commerce Hub"
topic: "commercehub"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://developer.fiserv.com/product/CommerceHub"
    title: "Commerce Hub — Fiserv Developer Studio"
    accessed: "2026-04-14"
  - url: "https://developer.fiserv.com/product/CommerceHub/docs/?path=docs%2FResources%2FAPI-Documents%2FUse-Our-APIs.md"
    title: "Commerce Hub — Use Our APIs"
    accessed: "2026-04-14"
  - url: "https://developer.fiserv.com/product/CommerceHub/docs?path=docs/Resources/API-Documents/Authentication-Header.md"
    title: "Commerce Hub — Generate an Authentication Header"
    accessed: "2026-04-14"
  - url: "https://developer.fiserv.com/product/CommerceHub/api/?type=post&path=/payments/v1/charges"
    title: "Commerce Hub — POST /payments/v1/charges"
    accessed: "2026-04-14"
  - url: "https://developer.fiserv.com/product/CommerceHub/docs/?path=docs/Resources/API-Documents/Payments/Charges.md"
    title: "Commerce Hub — Process a Payment Authorization (Charges)"
    accessed: "2026-04-14"
  - url: "https://developer.fiserv.com/product/CommerceHub/docs/Online-Commerce/3D-Secure/SCA-Exemption.mdx"
    title: "Commerce Hub — 3DS / SCA Exemptions"
    accessed: "2026-04-14"
  - url: "https://github.com/Fiserv/commercehub-api-examples"
    title: "Fiserv/commercehub-api-examples — GitHub"
    accessed: "2026-04-14"
---

# Commerce Hub

## Overview

Commerce Hub is Fiserv's unified, card-not-present processing API — the strategic "one API" product positioned as the next-generation replacement for the older Payeezy, First Data Gateway e4, and various IPG interfaces. It is hosted on Fiserv Developer Studio at `developer.fiserv.com/product/CommerceHub`, has a public OpenAPI-style reference, and an official sample repository at `github.com/Fiserv/commercehub-api-examples` containing C# and Node.js credentials/signature samples. For the Fiserv Brain corpus, Commerce Hub is the second-richest public source after Clover: the authentication scheme, the core `/payments/v1/charges` endpoint, and the 3DS/SCA exemption flows are all publicly documented in enough detail to ground factual answers.

Commerce Hub's value proposition is a single REST surface that consolidates authorization, capture, void, refund, tokenization (payment instruments / vault), recurring payments, 3D Secure, fraud scoring, and alternative payment methods behind one auth scheme and one envelope. It targets merchants and ISVs that previously had to integrate to multiple Fiserv legacy gateways.

## Public documentation sources

- `https://developer.fiserv.com/product/CommerceHub` — product landing page on Developer Studio
- `https://developer.fiserv.com/product/CommerceHub/docs/?path=docs/Resources/API-Documents/Use-Our-APIs.md` — getting-started, environment URLs, required headers
- `https://developer.fiserv.com/product/CommerceHub/docs?path=docs/Resources/API-Documents/Authentication-Header.md` — HMAC SHA256 signature construction
- `https://developer.fiserv.com/product/CommerceHub/api/?type=post&path=/payments/v1/charges` — the canonical `POST /payments/v1/charges` reference
- `https://developer.fiserv.com/product/CommerceHub/docs/?path=docs/Resources/API-Documents/Payments/Charges.md` — narrative guide for the Charges endpoint
- `https://developer.fiserv.com/product/CommerceHub/docs/Online-Commerce/3D-Secure/SCA-Exemption.mdx` — 3DS2 / PSD2 SCA exemption flags
- `https://github.com/Fiserv/commercehub-api-examples` — official example repo (C# and Node.js `credentials-sample` zips) showing request signing

## Integration model

**Protocol.** REST/JSON. All production and cert calls go over HTTPS with a shared set of required headers on every request. A single base path (`/payments/v1/...`, `/payments-vas/v1/...`, etc.) segments the product's API families.

**Authentication — HMAC SHA256 message signature.** Commerce Hub does not use OAuth. Every request is authenticated by a deterministic HMAC signature constructed from:
1. API key (issued per merchant/ISV in Developer Studio)
2. Client request ID (GUID, unique per request, used for idempotency)
3. Epoch timestamp in milliseconds
4. Raw request payload (JSON body as-is)

These are concatenated into a "raw signature" string, HMAC-SHA256 signed with the client secret, Base64 encoded, and placed in the `Authorization` or `Api-Key`/`Client-Request-Id`/`Timestamp`/`Message-Signature` header set described in the Authentication Header doc. The sample repo's `c#-credentials-sample.zip` and `nodejs-credentials-sample.zip` are Fiserv's canonical reference implementations of this signing routine.

**Idempotency.** The `Client-Request-Id` doubles as an idempotency key — repeating a request with the same ID within the supported window returns the prior result instead of double-charging.

**Environments.** Cert (sandbox) and production are separate base URLs with separate API keys and secrets.

**Webhooks / notifications.** Commerce Hub exposes a notifications subscription model for async events (settled transactions, chargebacks, disputes, refund status). Public docs describe the subscription concept, though the full event catalog is partially behind the Developer Studio login.

## Key API surfaces

Based on public reference and guide pages:

- **Payments — Charges** (`POST /payments/v1/charges`) — authorize, authorize-and-capture, sale, with card-present and card-not-present variants, supporting raw PAN (PCI scope), tokenized payment instruments, network tokens, and device-captured encrypted blobs.
- **Payments — Cancels / Reversals** — reversal and void flows.
- **Payments — Captures** — deferred capture of a prior authorization.
- **Payments — Refunds** — referenced and unreferenced (open) refunds.
- **Payments — Inquiries** — transaction lookup by reference.
- **Payment Instruments / Vault** — tokenize once, charge many; card-on-file lifecycle.
- **3D Secure** — 3DS2 authentication flow with SCA exemption flags (low-value, TRA, merchant-initiated, recurring, corporate card) as documented in `SCA-Exemption.mdx`.
- **Merchant-initiated transactions (MIT)** and **Credential-on-file (COF)** indicators.
- **Recurring / subscriptions**, **split shipments**, **incremental authorizations**.
- **Verification / account verification (AVS+zero-dollar auth)**.
- **Digital wallets** — Apple Pay, Google Pay decryption and pass-through on the Charges envelope.
- **Fraud / risk** — optional fraud scoring add-on.
- **Alternative payment methods** — BNPL and bank-rail handoffs are referenced in the product landing materials; specific flows vary per scheme.

## Known integration patterns / failure modes

**Patterns.**
- The canonical integration is: tokenize the PAN client-side (or via hosted page) → call `POST /payments/v1/charges` with the token + transaction details → store the returned `gatewayResponse.transactionId` and `ipgTransactionId` for reconciliation.
- Reuse the same `Client-Request-Id` on retry to stay idempotent.
- Use the `SCA-Exemption.mdx` flags to request frictionless 3DS where eligible, fall back to challenge on `transStatus = C`.

**Failure modes visible in public docs and community discussion.**
- Signature mismatches caused by JSON payload re-serialization: the HMAC is computed over the *exact* bytes of the body, so any middleware that re-orders keys, changes whitespace, or re-encodes Unicode breaks auth. The sample repo exists largely because teams keep getting this wrong.
- Clock skew: timestamp is validated against server time in ms; drift of more than a few minutes rejects the request.
- Missing or reused `Client-Request-Id` values cause duplicate-detection or missing-header errors.
- Mixing cert and production keys is a frequent onboarding failure.

## Gaps — what is NOT publicly available

- Full event catalog and payload schemas for the notifications/webhooks subscription (partially behind Developer Studio login).
- Per-processor routing (how Commerce Hub routes to Omaha, Nashville, Buypass, etc.) and the resulting response-code mapping back to the unified envelope.
- Interchange optimization rules, Level 2/3 data requirements by card brand, and the exact conditions under which a transaction down-grades.
- Rate limits, concurrency limits, and production SLA numbers.
- Internal mapping between Commerce Hub requests and the underlying ISO 8583 messages sent to the networks.
- Complete list of supported alternative payment methods per region.

## Relevance to Fiserv Brain demo

Commerce Hub is the Fiserv Brain's most important "structured API" corpus entry: it is the strategic CNP gateway, it has a genuine public reference, and it is the product against which PM and engineering questions about charges, tokens, 3DS, and idempotency will most often be asked. Having Commerce Hub well-represented lets the Brain demonstrate grounded answers to endpoint-level questions (e.g., "how do I sign a Charges request?") rather than hallucinating from the generic "Fiserv gateway" pool.
