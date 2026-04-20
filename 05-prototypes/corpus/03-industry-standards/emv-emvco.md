---
title: "EMV and EMVCo - Chip, Contactless, 3DS, and Payment Tokenisation"
topic: "emv-emvco"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://www.emvco.com/about/overview/"
    title: "About EMVCo - Overview"
    accessed: "2026-04-14"
  - url: "https://www.emvco.com/specifications/"
    title: "EMVCo Specifications"
    accessed: "2026-04-14"
  - url: "https://www.emvco.com/emv-technologies/3d-secure/"
    title: "EMV 3-D Secure"
    accessed: "2026-04-14"
  - url: "https://www.emvco.com/emv-technologies/payment-tokenisation/"
    title: "EMV Payment Tokenisation"
    accessed: "2026-04-14"
---

# EMV and EMVCo

## Overview

EMV is the global set of specifications for secure chip-based, contactless, e-commerce authentication, and payment-tokenisation technologies used across the card-payments industry. The acronym originally stood for "Europay, Mastercard, and Visa" — the three networks that first published the contact chip card specification in 1996. Today EMV specifications are maintained by **EMVCo**, a neutral technical body that develops, publishes, and maintains the EMV Specifications and their associated testing and certification programs with the stated purpose of "facilitating the worldwide interoperability of secure payment transactions."

EMVCo does not process payments, operate networks, or certify merchants directly. It publishes specifications and runs type-approval labs; networks, issuers, acquirers, processors, terminal vendors, and merchants then implement and certify against those specifications under their individual network scheme rules.

## Governance and Members

EMVCo is collectively owned by **six payment networks**, each holding an equal share:

- American Express
- Discover
- JCB
- Mastercard
- UnionPay
- Visa

Oversight is provided by a Board of Managers with two representatives from each member, and long-term strategy is set by an Executive Committee. Beyond the six owners, the industry participates through EMVCo's **Associates Programme** (technical review and voting input) and **Subscribers Programme** (access to draft specifications and test plans). Associates include merchants, issuers, acquirers, processors (including Fiserv), terminal manufacturers, HSM vendors, and chip fabricators. This structure matters because it means EMV specifications are developed by the payments industry collectively, not mandated by a single network — which is why EMV is interoperable across Visa, Mastercard, and the other members without requiring a separate card or terminal for each brand.

## Core EMV Technologies

EMVCo's published specification families fall into four main technology areas:

### 1. Contact Chip (the original EMV)

The Contact Chip specifications define how a chip card and an EMV terminal communicate over the ISO/IEC 7816 contact interface to perform a payment transaction. The contact chip flow includes **application selection**, **data authentication** (offline static, offline dynamic, or combined DDA/AC using asymmetric cryptography), **cardholder verification** (CVM list, typically PIN — online or offline, chip+PIN — or signature — chip+signature), **terminal risk management**, **card action analysis**, and either **online authorization** via the acquirer-issuer link or **offline approval** by the chip itself for low-value, low-risk transactions. Contact EMV transactions produce an **Application Cryptogram (ARQC/TC/AAC)** that cryptographically binds the card, terminal, and transaction data — this is what shifts counterfeit-fraud liability from issuers to acquirers in jurisdictions that have completed the EMV liability shift (US: October 2015 for POS, October 2017 for fuel).

### 2. Contactless EMV

The Contactless Specifications define transactions over the ISO/IEC 14443 radio interface between a contactless card (or NFC-enabled mobile device, wearable, or tokenised credential in a mobile wallet) and a contactless POS reader. EMVCo publishes a common **Contactless Book A** (architecture), **Book B** (entry point), **Book C** (kernel specifications — there are currently several kernels, including C-1 for American Express, C-2 for Mastercard, C-3 for Visa, C-4 for Discover, C-5 for JCB, C-6 for UnionPay, and C-7 for Interac), and **Book D** (contactless communication protocol). Contactless EMV also powers Apple Pay, Google Pay, Samsung Pay, and other mobile wallets over NFC.

### 3. EMV 3-D Secure (EMV 3DS 2.x)

EMV 3DS is the specification that governs how card-not-present (e-commerce, in-app, and remote-commerce) transactions are authenticated between merchants, acquirers, card networks, and issuers. It replaced the legacy 3DS 1.0 protocol (originally developed by Visa as Verified by Visa). EMV 3DS 2.x introduced:

- **Richer data exchange** — up to ~150 data elements (device fingerprint, billing/shipping, prior-transaction history, merchant risk indicators) are sent from the merchant to the issuer, enabling issuer risk-based decisioning.
- **Frictionless flow** — the issuer's Access Control Server (ACS) can authenticate the cardholder silently based on that data, returning an authentication value (CAVV/AAV) without any cardholder interaction. The merchant sees an authenticated transaction and a liability shift.
- **Challenge flow** — when the issuer's risk assessment is inconclusive, the cardholder is presented with a step-up challenge (one-time passcode via SMS, banking-app biometric, push notification, etc.).
- **Non-payment authentication** — supports cardholder-initiated credential verification and wallet-provisioning flows.
- **3-D Secure Requestor Initiated (3RI)** — merchant-initiated authentication for recurring, stored-credential, and decoupled flows.

EMV 3DS 2.2 and 2.3 added exemptions (SCA exemptions under PSD2), delegated authentication, and richer device-binding data.

### 4. EMV Payment Tokenisation

The **EMV Payment Tokenisation Specification** defines how a real Primary Account Number (PAN) is substituted with a **payment token** for use in a specific channel (mobile wallet, merchant card-on-file, device). Key concepts include **Token Service Providers (TSPs)** — typically the card networks themselves — which mint and manage tokens, **Token Requestors** (wallets, merchants, PSPs) that request tokens, **Token Domain Restriction Controls** that bind a token to a channel/device/merchant, and **dynamic cryptograms** that make each transaction with a token uniquely verifiable. EMV tokens are what power Apple Pay's Device Primary Account Number (DPAN), Google Pay tokens, and network-tokenised card-on-file programs (Visa Token Service, Mastercard Digital Enablement Service).

## EMV Transaction Anatomy (Contact Chip, Simplified)

A contact EMV transaction involves roughly twelve steps:

1. Application Selection (terminal and card agree on which AID to run)
2. Initiate Application Processing (GET PROCESSING OPTIONS)
3. Read Application Data
4. Offline Data Authentication (SDA/DDA/CDA)
5. Processing Restrictions
6. Cardholder Verification (CVM list)
7. Terminal Risk Management
8. Terminal Action Analysis
9. Card Action Analysis (generates ARQC/TC/AAC)
10. Online Authorization (if required) — transaction is sent over ISO 8583 with DE55 carrying the ICC data
11. Issuer Script Processing (optional)
12. Completion

## Relevance to Merchant Integration

For a merchant, EMV touches the integration in several concrete ways:

- **In-store POS** must use an EMV-certified terminal and a certified payment application to avoid counterfeit-fraud chargeback liability.
- **In-app / mobile** integrations typically rely on network tokenisation and EMVCo Secure Remote Commerce (SRC) / Click to Pay for a wallet-neutral checkout.
- **E-commerce** integrations need EMV 3DS 2.x via a 3DS Server — usually provided by the PSP or acquirer — to achieve liability shift and PSD2 SCA compliance in regulated regions.
- **Card-on-file merchants** can request network tokens (via their PSP) to replace stored PANs, which reduces PCI scope, improves authorization rates (auto-lifecycle updates on card reissue), and hardens the stored-credential program against data breaches.

## Public Sources

- EMVCo Overview — https://www.emvco.com/about/overview/
- EMVCo Specifications — https://www.emvco.com/specifications/
- EMV 3-D Secure — https://www.emvco.com/emv-technologies/3d-secure/
- EMV Payment Tokenisation — https://www.emvco.com/emv-technologies/payment-tokenisation/

## Relevance to the Fiserv Brain Demo

The Brain's ability to explain and improve payment outcomes depends on recognizing which EMV pathway a given transaction took. Was an in-store decline caused by a fallback from chip to stripe (DE22 = 80)? Was an e-commerce authorization frictionless 3DS (liability-shifted) or unauthenticated (liability with merchant)? Is the stored credential a real PAN or a network token (Visa VTS, Mastercard MDES)? The Brain must model EMV kernel behavior, 3DS outcomes, and tokenisation state because each materially changes the recommended next action: retry strategy, fraud rule tuning, dispute-response posture, or PCI-scope advice. Including EMVCo specifications in corpus gives the Brain grounding for all four.
