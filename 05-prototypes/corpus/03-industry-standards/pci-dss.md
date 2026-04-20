---
title: "PCI DSS 4.0 - Payment Card Industry Data Security Standard"
topic: "pci-dss"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://www.pcisecuritystandards.org/standards/pci-dss/"
    title: "PCI DSS - PCI Security Standards Council"
    accessed: "2026-04-14"
  - url: "https://www.pcisecuritystandards.org/document_library/"
    title: "PCI SSC Document Library"
    accessed: "2026-04-14"
  - url: "https://www.pcisecuritystandards.org/standards/pci-dss-v4-0-resource-hub/"
    title: "PCI DSS v4.0 Resource Hub"
    accessed: "2026-04-14"
---

# PCI DSS 4.0

## Overview

The **Payment Card Industry Data Security Standard (PCI DSS)** is the global information-security standard that governs how organizations that store, process, or transmit cardholder data must protect that data. It is published and maintained by the **PCI Security Standards Council (PCI SSC)**, a body founded in 2006 by American Express, Discover, JCB, Mastercard, and Visa. PCI DSS is not a law — it is a contractual obligation flowed down through network rules, acquirer agreements, and payment-facilitator agreements — but in practice any merchant, processor, acquirer, gateway, or service provider handling real PANs must comply, and a breach that proves non-compliance can trigger significant fines, forensic costs, and remediation requirements.

**PCI DSS v4.0** was published in March 2022 as the first major revision since 3.2.1. Version 3.2.1 was retired on March 31, 2024. A subsequent minor update, **v4.0.1**, was published in June 2024 to correct errata and clarify requirements. Many new v4.0 requirements were "best practice" until March 31, 2025, after which they became **required**. Key themes of v4.0 include: promoting security as a continuous process (not an annual assessment), adding flexibility via a **Customized Approach** alongside the traditional **Defined Approach**, strengthening authentication (MFA and stronger password rules), expanding requirements for e-commerce script integrity (targeting Magecart-style attacks), and increasing focus on targeted risk analysis.

## Scope: What Data PCI DSS Protects

PCI DSS protects two categories of data:

### Cardholder Data (CHD)
- **Primary Account Number (PAN)** — the card number itself. **PAN is the defining element of PCI scope.** If systems store, process, or transmit PAN, they are in scope.
- **Cardholder Name**
- **Expiration Date**
- **Service Code**

Cardholder name, expiration date, and service code are in scope only when stored together with PAN.

### Sensitive Authentication Data (SAD)
- **Full Track Data** (Track 1 / Track 2 contents from the magnetic stripe or chip equivalent)
- **CAV2 / CVC2 / CVV2 / CID** (the 3–4 digit validation value)
- **PINs / PIN blocks**

**Sensitive Authentication Data must not be stored after authorization**, even if encrypted. This is the single most important rule in PCI DSS: CVV2 may be used during auth but must be discarded immediately after.

A **Cardholder Data Environment (CDE)** is the set of people, processes, and technology that store, process, or transmit CHD or SAD — plus any system components directly connected to or able to impact the security of that environment.

## The 12 Requirements

PCI DSS v4.0 retains the same twelve top-level requirements as prior versions, organized under six control objectives:

**Build and Maintain a Secure Network and Systems**
1. Install and maintain network security controls.
2. Apply secure configurations to all system components.

**Protect Account Data**
3. Protect stored account data.
4. Protect cardholder data with strong cryptography during transmission over open, public networks.

**Maintain a Vulnerability Management Program**
5. Protect all systems and networks from malicious software.
6. Develop and maintain secure systems and software.

**Implement Strong Access Control Measures**
7. Restrict access to system components and cardholder data by business need to know.
8. Identify users and authenticate access to system components.
9. Restrict physical access to cardholder data.

**Regularly Monitor and Test Networks**
10. Log and monitor all access to system components and cardholder data.
11. Test security of systems and networks regularly.

**Maintain an Information Security Policy**
12. Support information security with organizational policies and programs.

Each requirement expands into sub-requirements (12 requirements cover ~300 sub-requirements in v4.0), and each sub-requirement has a defined testing procedure that a QSA uses in an assessment.

## Compliance Levels (Merchants)

Acquiring card brands assign merchants to one of four levels based on annual transaction volume. Exact thresholds vary slightly by brand but the industry-standard Visa scheme is:

| Level | Annual Transaction Volume | Validation Requirements |
|-------|--------------------------|-------------------------|
| 1     | >6M Visa transactions/yr (or any merchant suffering a breach, or flagged by card brand) | Annual on-site assessment by a QSA (producing a Report on Compliance, ROC) + quarterly ASV scans + attestation of compliance (AOC) |
| 2     | 1M–6M transactions/yr | Annual Self-Assessment Questionnaire (SAQ) + quarterly ASV scans + AOC (some brands require QSA) |
| 3     | 20,000–1M e-commerce transactions/yr | Annual SAQ + quarterly ASV scans + AOC |
| 4     | <20,000 e-commerce or <1M total | Annual SAQ (recommended) + quarterly ASV scans (recommended) + AOC |

Service providers have their own two-tier classification (Level 1 and Level 2) with somewhat different thresholds.

## Self-Assessment Questionnaire (SAQ) Types

Levels 2–4 merchants typically validate via an SAQ — a shortened subset of PCI DSS requirements tailored to the merchant's acceptance channel:

| SAQ | Applies To |
|-----|------------|
| SAQ A | Card-not-present merchants who have fully outsourced ALL CHD functions to a PCI-validated third party. Merchant's website never touches PAN. |
| SAQ A-EP | E-commerce merchants using a partially outsourced payment page but whose website can still impact the security of the payment page (e.g., iframe plus merchant-controlled JS). |
| SAQ B | Merchants using only imprint machines or standalone, dial-out terminals with no electronic storage. |
| SAQ B-IP | Merchants using only standalone, PTS-approved payment terminals with an IP connection (no electronic storage). |
| SAQ C | Merchants with payment application systems connected to the internet (no e-commerce). |
| SAQ C-VT | Merchants with web-based virtual payment terminals only, no electronic storage. |
| SAQ P2PE | Merchants using only a hardware payment terminal included in a PCI-listed P2PE solution. |
| SAQ D (Merchant) | Merchants that don't fit any other SAQ — the full, longest questionnaire. |
| SAQ D (Service Provider) | Service providers eligible to complete an SAQ. |
| SAQ SPoC | Merchants using a PCI SPoC (Software-Based PIN on COTS) solution. |

SAQ A is the smallest scope (roughly two dozen requirements) and is the destination every e-commerce merchant wants to reach — because the simplest way to meet PCI DSS is not to touch PAN at all.

## Tokenization and Scope Reduction

The single most important scope-reduction technique is **tokenization**: replacing the PAN in all post-authorization storage with a surrogate value (a **token**) that has no exploitable value to an attacker. Tokens come in two main flavors:

- **Acquirer / gateway tokens** (e.g., Fiserv, Stripe, Adyen, Braintree vault tokens) — merchant sends PAN once at the point of collection, receives a token, and stores only the token. The PAN lives in the gateway's PCI-compliant vault.
- **Network tokens** (EMV payment tokens issued by Visa VTS, Mastercard MDES, Amex, Discover) — a DPAN bound to a merchant + channel with domain restriction controls, minted by the card network's Token Service Provider.

In both cases the merchant's systems no longer store PAN, which dramatically shrinks the CDE. Combined with a hosted payment page (iframe or redirect), tokenization lets many e-commerce merchants attest against **SAQ A**.

Other scope-reduction techniques include **P2PE (Point-to-Point Encryption)** for in-store, which encrypts card data inside a PCI-listed terminal before it enters the merchant's systems, and strong **network segmentation** to isolate the CDE from the rest of the corporate network.

## Public Sources

- PCI DSS — https://www.pcisecuritystandards.org/standards/pci-dss/
- PCI DSS v4.0 Resource Hub — https://www.pcisecuritystandards.org/standards/pci-dss-v4-0-resource-hub/
- PCI SSC Document Library (PCI DSS v4.0.1, SAQs, AOCs, ROC template) — https://www.pcisecuritystandards.org/document_library/

## Relevance to the Fiserv Brain Demo

A per-merchant AI brain that reasons about a payments stack must treat PCI DSS as a hard constraint. The operating rules are simple and absolute for a demo prototype: **the Brain must never ingest, store, or display PAN, CVV, full track data, or PIN blocks.** Any test payload or merchant evidence fed to the Brain should be masked (e.g., `411111******1111`) or tokenized upstream. When the Brain surfaces a "stored card" to a merchant user, it must render a network token or gateway token reference, never a raw PAN. When the Brain recommends integration changes (iframe vs. direct-post, network tokenization, P2PE terminals), it should frame those recommendations explicitly as PCI scope-reduction moves — lowering SAQ class from D to A-EP to A is a concrete, measurable outcome a merchant will recognize and value. Grounding the Brain in PCI DSS corpus ensures it respects the "what must never happen" boundary and also knows how to advise merchants toward smaller-scope postures.
