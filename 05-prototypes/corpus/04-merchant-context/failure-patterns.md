---
title: "Payment Failure Patterns: Chargeback Codes, Declines, and SDK Pain Points"
topic: "failure-patterns"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://chargebacks911.com/visa-chargeback-reason-codes/"
    title: "Chargebacks911 - Visa Chargeback Reason Codes"
    accessed: "2026-04-14"
  - url: "https://chargebacks911.com/mastercard-chargeback-reason-codes/"
    title: "Chargebacks911 - Mastercard Chargeback Reason Codes"
    accessed: "2026-04-14"
  - url: "https://chargebacks911.com/american-express-chargeback-reason-codes/"
    title: "Chargebacks911 - American Express Chargeback Reason Codes"
    accessed: "2026-04-14"
  - url: "https://usa.visa.com/support/consumer/dispute-resolution.html"
    title: "Visa dispute resolution overview"
    accessed: "2026-04-14"
  - url: "https://www.mastercard.us/en-us/business/overview/support/rules.html"
    title: "Mastercard Rules and dispute resources"
    accessed: "2026-04-14"
  - url: "https://stackoverflow.com/questions/tagged/payment-gateway"
    title: "Stack Overflow - payment-gateway tag"
    accessed: "2026-04-14"
  - url: "https://stackoverflow.com/questions/tagged/stripe-payments"
    title: "Stack Overflow - stripe-payments tag"
    accessed: "2026-04-14"
  - url: "https://stackoverflow.com/questions/tagged/braintree"
    title: "Stack Overflow - braintree tag"
    accessed: "2026-04-14"
  - url: "https://stackoverflow.com/questions/tagged/iso-8583"
    title: "Stack Overflow - iso-8583 tag"
    accessed: "2026-04-14"
  - url: "https://github.com/braintree/braintree_node/issues"
    title: "Braintree Node SDK issues"
    accessed: "2026-04-14"
  - url: "https://github.com/stripe/stripe-node/issues"
    title: "Stripe Node SDK issues"
    accessed: "2026-04-14"
  - url: "https://github.com/Adyen/adyen-node-api-library/issues"
    title: "Adyen Node API library issues"
    accessed: "2026-04-14"
---

## Overview

This file is the reference layer for how card payments actually fail - both at the network/processing layer (chargeback reason codes and authorization declines) and at the developer-experience layer (the recurring SDK and integration questions that show up on Stack Overflow and GitHub for Stripe, Braintree, Adyen, Square and ISO 8583 implementations). For the Fiserv Brain demo, this is the corpus that lets Brain answer questions like "why did this transaction fail?" or "what's behind a spike in 13.1 chargebacks?" with real public-reason-code structure rather than vague prose. All merchants mentioned in failure examples are anonymized.

## Visa chargeback reason codes (current framework)

Visa's current dispute framework (in effect since the VCR rollout) organizes chargebacks into four numbered categories. The tables below capture the canonical public reason-code list as documented by Chargebacks911 and cross-referenced to Visa's public dispute-resolution overview.

### 10.x - Fraud

| Code | Name | Short definition |
|------|------|------------------|
| 10.1 | EMV Liability Shift Counterfeit Fraud | Counterfeit chip card used at a POS where the transaction was not processed as a chip transaction |
| 10.2 | EMV Liability Shift Non-Counterfeit Fraud | Unauthorized EMV transaction involving a lost, stolen, or not-received card |
| 10.3 | Other Fraud - Card-Present | Manual key entry in a card-present setting on a transaction the cardholder claims was unauthorized |
| 10.4 | Other Fraud - Card-Absent | CNP transaction the cardholder claims was not authorized |
| 10.5 | Visa Fraud Monitoring Program | Transaction flagged under VFMP restrictions |

### 11.x - Authorization

| Code | Name | Short definition |
|------|------|------------------|
| 11.1 | Card Recovery Bulletin | Transaction processed without checking the Card Recovery Bulletin |
| 11.2 | Declined Authorization | Merchant completed a transaction after receiving a decline |
| 11.3 | No Authorization / Late Presentment | Missing authorization or authorization expired before presentment |

### 12.x - Processing Errors

| Code | Name | Short definition |
|------|------|------------------|
| 12.2 | Incorrect Transaction Code | Wrong debit/credit designation applied |
| 12.3 | Incorrect Currency | Currency mismatch or undisclosed DCC |
| 12.4 | Incorrect Account Number | Account number mismatch between auth and clearing |
| 12.5 | Incorrect Amount | Amount discrepancy between authorization and processing |
| 12.6.1 | Duplicate Processing | Single transaction submitted multiple times |
| 12.6.2 | Paid by Other Means | Charged despite another payment method being used |
| 12.7 | Invalid Data | Authorization obtained using incorrect data fields |

### 13.x - Consumer Disputes

| Code | Name | Short definition |
|------|------|------------------|
| 13.1 | Merchandise / Services Not Received | Goods or services not delivered by agreed date |
| 13.2 | Cancelled Recurring Transaction | Charge applied after subscription cancellation |
| 13.3 | Not as Described or Defective | Product damaged, defective, or mismatched description |
| 13.4 | Counterfeit Merchandise | Goods verified as counterfeit by authority |
| 13.5 | Misrepresentation | Purchased item or service was misrepresented |
| 13.6 | Credit Not Processed | Promised refund never applied |
| 13.7 | Cancelled Merchandise / Services | Return completed but credit not applied |
| 13.8 | Original Credit Transaction Not Accepted | Credit reversal rejected |
| 13.9 | Non-Receipt of Cash at ATM | Incomplete cash withdrawal from ATM |

## Mastercard chargeback reason codes

Mastercard's reason-code structure uses four top-level codes with defined sub-categories (Chargebacks911; Mastercard Rules resource).

| Code | Category | Representative triggers |
|------|----------|-------------------------|
| 4808 | Authorization-Related | Account not on file, required authorization not obtained, expired chargeback protection period, multiple authorization requests, warning bulletin file, CAT 3 device, transit first-ride-risk claims |
| 4834 | Point-of-Interaction Error | Duplicate billing, amount discrepancies, ATM disputes, currency conversion errors, improper surcharges, late presentment |
| 4837 | No Cardholder Authorization | Cardholder claims the transaction was not authorized (typical CNP fraud pattern) |
| 4853 | Cardholder Dispute | Defective or misrepresented goods, services not provided, digital goods under $25, recurring dispute, counterfeit goods, travel / entertainment issues |
| 4863 | Cardholder Does Not Recognize | Cardholder cannot identify the transaction |
| 4870 | Chip Liability Shift | Fraudulent transaction processed on a counterfeit EMV card where chip was not used |
| 4871 | Chip / PIN Liability Shift | Lost/stolen/never-received card used without chip+PIN verification |

## American Express chargeback reason codes

American Express uses its own letter-plus-number taxonomy. The most frequently cited codes in public dispute references include:

| Code | Category | Short definition |
|------|----------|------------------|
| F14 | Fraud - Missing Signature | Card-present transaction lacks a valid signature or equivalent |
| F24 | Fraud - No Cardmember Authorization | Cardmember denies authorizing the CNP transaction |
| F29 | Fraud - Card Not Present | CNP fraud claim outside EMV liability scope |
| F30 | Fraud - EMV Counterfeit | EMV liability shift - counterfeit chip card |
| F31 | Fraud - EMV Lost / Stolen / NRI | EMV liability shift - lost, stolen, or never received |
| C02 | Credit Not Processed | Refund or credit promised but not issued |
| C04 | Goods / Services Returned or Refused | Cardmember returned goods or refused service |
| C05 | Goods / Services Cancelled | Cardmember cancelled the transaction |
| C08 | Goods / Services Not Received | Merchandise or service never delivered |
| C14 | Paid by Other Means | Cardmember paid through another method |
| C18 | "No Show" or CARDeposit Cancelled | Hotel / lodging dispute |
| C28 | Cancelled Recurring Billing | Charge after recurring cancellation |
| C31 | Goods / Services Not As Described | Product differs materially from description |
| C32 | Goods / Services Damaged or Defective | Item received damaged or defective |
| P05 | Incorrect Amount | Billed amount doesn't match documentation |
| P07 | Late Submission | Charge submitted outside allowed window |
| P22 | Non-Matching Card Number | Account number mismatch |
| P23 | Currency Discrepancy | Currency mismatch |

## Common authorization decline reasons

Separately from chargebacks, issuer auth declines are a first-order failure mode. The most common public decline reasons (normalized across network and gateway taxonomies) are:

| Reason | Typical ISO response / meaning | Operator implication |
|--------|--------------------------------|----------------------|
| Insufficient funds | 51 - "Not sufficient funds" | Retry logic and dunning windows matter |
| Do not honor | 05 - "Do not honor" | Generic issuer decline; high volume, low signal |
| AVS mismatch | AVS response N or varying match codes | Merchant rule or 3DS step-up decision |
| CVV mismatch | CVV response N | Strong fraud signal in CNP |
| Fraud rule block | 57 / 62 / 59 / network-specific | Issuer fraud rule triggered |
| Expired card | 54 - "Expired card" | Network Account Updater opportunity |
| Invalid merchant | 03 - "Invalid merchant" | Setup or BIN-acceptance issue |
| Invalid card number | 14 - "Invalid card number" | Data-quality or tokenization issue |
| Lost / stolen card | 41 / 43 | Hard decline, do not retry |
| Exceeds withdrawal limit | 61 / 65 | Retry with partial auth where supported |
| Pickup card | 04 / 07 | Hard decline, do not retry |
| System error / issuer unavailable | 91 / 96 | Retry with backoff is appropriate |

## Developer pain points (Stack Overflow themes)

Stack Overflow tags for payments (`payment-gateway`, `stripe-payments`, `braintree`, `iso-8583`, `chargeback`) consistently surface the same categories of questions year over year. Drawing on publicly visible question themes:

1. **3DS v2 challenge flow handling.** "How do I finish a 3DS2 challenge in a SPA without losing state?" - questions about redirect-back handling, iframe sizing, and Stripe `handleCardAction` vs. `confirmCardPayment`.
2. **Tokenization and vaulting errors.** "My nonce is valid once then fails" - questions about single-use vs. multi-use tokens, especially in Braintree and Stripe.
3. **Webhook signature verification.** "Webhook works in dev but fails in production." Raw-body vs. parsed-body handling is the most common root cause across Stripe, Braintree and Adyen.
4. **Sandbox vs. production credential mismatches.** "Why is my API key returning authentication_error?" - merchants mixing sandbox and production keys, or leaking them through the wrong environment variable.
5. **Idempotency keys and duplicate charges.** "Customer was charged twice" - questions about when to set an idempotency key, how long it lives, and how retries interact with it.
6. **Webhook delivery and retry behavior.** "My endpoint timed out, did Stripe retry?" - questions about back-off schedules and dead-letter handling.
7. **SCA / PSD2 exemptions.** "When is a transaction out of scope for SCA?" - questions about merchant-initiated transactions, low-value exemptions, and TRA.
8. **ISO 8583 field encoding.** "DE 48 sub-element parsing help" - questions about BCD vs. EBCDIC vs. ASCII encoding, bitmap handling, and secondary bitmap presence. Practitioners in emerging markets ask these questions most often.
9. **Currency and minor units.** "Why does my 100 JPY charge look like 10000?" - confusion about ISO 4217 exponent handling (JPY has zero minor units, BHD has three).
10. **Refunds and partial captures.** "Can I refund more than I captured?" - questions about overpayments, split refunds, and interactions with reserves.

## GitHub SDK issue themes

Issue trackers for major payment SDKs (Stripe, Braintree, Adyen, Square) surface a parallel set of recurring themes:

- **Stripe (stripe-node, stripe-js).** TypeScript typings drift across API versions, `expand` parameter behavior, idempotency-key edge cases, and connected-account header propagation.
- **Braintree (braintree_node, braintree_java).** 3DS v2 challenge flow bugs (especially lost state on redirect), nonce consumption errors, webhook signature validation (including the historic forced-browser-version coverage), and environment-mismatch issues where sandbox credentials are used in production by accident. These are the most frequently filed Braintree issues and the ones most commonly cited in migration retrospectives.
- **Adyen (adyen-node-api-library).** Checkout API session resumption, `additionalData` field handling, webhook HMAC verification, and mismatches between drop-in UI versions and backend API versions.
- **Square (square-nodejs-sdk).** Catalog object versioning, location-scoped API behavior, and OAuth scope changes across API versions.

## Representative (anonymized) failure vignettes for the Brain demo

**Vignette A - Spike in 13.1 "not received" after delivery-provider switch (QSR, anonymized).**
A multi-brand restaurant operator migrated its delivery orchestration vendor. Two weeks later, the 13.1 chargeback count rose roughly 3x on delivery orders. Investigation traced the spike to missing proof-of-delivery metadata in the new vendor's webhook payload, which meant representments could not be built. Root cause was integration, not fraud - but the shape looked like fraud until the metadata gap was identified.

**Vignette B - 11.2 "declined authorization" cluster on a subscription service (anonymized DTC).**
A subscription merchant saw 11.2 chargebacks cluster on one BIN range. The cause was a retry loop: after an initial decline, the merchant retried with a soft-decline handler that ignored the issuer's original hard-decline response code. Fix: respect the original decline taxonomy and suppress retries on 54 and 41.

**Vignette C - Webhook signature failures after infra migration (anonymized SaaS).**
A SaaS merchant migrated its webhook ingestion behind a new API gateway, which began JSON-parsing the body before the Stripe SDK could verify the signature. Every webhook started failing signature verification in production, but worked in staging because staging still used the direct endpoint. Fix: preserve the raw body on the production path.

**Vignette D - ISO 8583 DE 48 sub-element drift (anonymized emerging-markets acquirer).**
An acquirer integrating with a regional switch saw intermittent auth failures on a subset of MCCs. The root cause was a sub-element inside DE 48 being populated with ASCII where the switch expected EBCDIC. The symptom was a 96 "system malfunction" response that was effectively opaque without pcap-level inspection.

## Relevance to Fiserv Brain demo

This file is what lets Brain answer the "why did it fail?" class of questions with structure and precision. The reason-code tables, decline-code table, and Stack Overflow / GitHub themes give the demo:

- **Shared vocabulary** with engineers, risk analysts and dispute operations professionals.
- **Anchored code references** (10.x, 11.x, 12.x, 13.x for Visa; 4808, 4834, 4837, 4853, 4863, 4870, 4871 for Mastercard; F14/F24/F29/C04/C05/C08 for Amex) that a reviewer will recognize on sight.
- **Realistic failure narratives** (the four vignettes) that match the shapes of real public incidents without naming any merchant.
- **A safe perimeter** - every code list and every theme in this file is publicly documented, so the demo can go deep on failure patterns without crossing into confidential territory.
