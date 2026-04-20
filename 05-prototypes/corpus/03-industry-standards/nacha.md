---
title: "NACHA and the ACH Network - Operating Rules, SEC Codes, Returns, Same-Day ACH"
topic: "nacha"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://www.nacha.org/about-us"
    title: "About Nacha"
    accessed: "2026-04-14"
  - url: "https://www.nacha.org/rules"
    title: "Nacha Operating Rules & Guidelines"
    accessed: "2026-04-14"
  - url: "https://www.nacha.org/content/same-day-ach-resource-center"
    title: "Same Day ACH Resource Center"
    accessed: "2026-04-14"
  - url: "https://www.nacha.org/ach-network"
    title: "The ACH Network"
    accessed: "2026-04-14"
---

# NACHA and the ACH Network

## Overview

**Nacha** (the National Automated Clearing House Association) is the non-profit, member-owned association that develops, administers, and enforces the operating rules for the Automated Clearing House (ACH) network in the United States. The ACH network is the batch-based electronic funds transfer system that moves direct deposits, direct debits, payroll, vendor payments, tax refunds, Social Security benefits, bill payments, and person-to-person transfers between U.S. bank accounts. It is operated by two ACH Operators — the **Federal Reserve's FedACH service** and **The Clearing House's Electronic Payments Network (EPN)** — with Nacha setting the rulebook that all participating depository financial institutions must follow.

The ACH network is one of the largest payment rails in the world by volume. It is distinct from the card networks (no PAN, no ISO 8583, no EMV), distinct from wires (FedWire/CHIPS are real-time gross settlement and irrevocable), and distinct from the newer instant-payment rails (FedNow, RTP). ACH is **batch-processed, deferred-settlement, reversible-with-return-codes**, and extremely low cost per transaction, which is why it dominates payroll, recurring billing, and B2B invoice payments in the U.S.

Participants in a typical ACH transaction include the **Originator** (the party initiating the debit or credit — e.g., a merchant collecting a bill), the **ODFI** (Originating Depository Financial Institution — the Originator's bank), the **ACH Operator** (FedACH or EPN), the **RDFI** (Receiving Depository Financial Institution — the consumer's or business's bank), and the **Receiver** (the account holder).

## Nacha Operating Rules

The **Nacha Operating Rules & Guidelines** are the legal foundation of the ACH network. They are published annually, binding by contract on every participating financial institution, and enforced through the Nacha Rules Enforcement process (warnings, fines, and referral to regulators for persistent violations). The Rules cover authorization requirements, data security, risk management, prefunding requirements, return-code usage, timing, WEB-debit account validation, third-party-sender obligations, and the Originator's responsibility to obtain and retain valid consumer authorizations.

Key operational obligations on merchants and their PSPs include:

- Obtaining and retaining a valid **authorization** from the Receiver (written, signed or similarly authenticated for PPD; account-agreement or standing-order for CCD; specific authentication requirements for WEB and TEL).
- **WEB-debit account validation** (effective March 2022) — Originators must use a commercially reasonable method to verify the Receiver's account is legitimate and in good standing before the first WEB debit.
- **Unauthorized-return monitoring** — Originators must keep their unauthorized-return rate below 0.5%, administrative return rate below 3%, and overall return rate below 15%, or face remediation.
- **Data security** — large Originators and Third-Party Senders must protect account numbers using encryption or equivalent methods when stored electronically.

## Standard Entry Class (SEC) Codes

Every ACH transaction carries a 3-character **SEC Code** that identifies the type of authorization and the flow. Merchants generally only need to know a handful:

| SEC | Name | Typical Use | Direction |
|-----|------|-------------|-----------|
| PPD | Prearranged Payment and Deposit | Direct deposit of payroll; recurring consumer bill payments with written authorization | Credit or Debit |
| CCD | Corporate Credit or Debit | B2B payments between businesses; vendor disbursements; cash concentration | Credit or Debit |
| CTX | Corporate Trade Exchange | B2B with structured remittance addenda (up to 9,999 addenda records; commonly EDI 820) | Credit or Debit |
| WEB | Internet-Initiated Entry | Consumer debit authorized via a website or mobile app | Debit (credit also allowed for P2P) |
| TEL | Telephone-Initiated Entry | Consumer debit authorized by phone | Debit |
| ARC | Accounts Receivable Conversion | Converting a consumer check received in the mail or at a drop box into an ACH debit | Debit |
| BOC | Back Office Conversion | Converting a consumer check at POS in a back-office process | Debit |
| POP | Point-of-Purchase | Converting a consumer check at POS | Debit |
| RCK | Re-presented Check Entry | Re-presenting a returned NSF check as an ACH | Debit |
| IAT | International ACH Transaction | Cross-border ACH with OFAC screening fields | Credit or Debit |

For a B2B invoice-oriented merchant, **CCD** (and **CTX** when remittance data is needed) is the workhorse SEC code. For consumer-facing merchants billing online, **WEB** is the standard.

## Return Codes

When an RDFI cannot post an ACH entry, it returns it to the ODFI with a **Return Reason Code** (R01–R85+). The Originator sees the return and must reconcile. Common codes:

| Code | Description | Window |
|------|-------------|--------|
| R01  | Insufficient Funds | 2 banking days |
| R02  | Account Closed | 2 banking days |
| R03  | No Account / Unable to Locate Account | 2 banking days |
| R04  | Invalid Account Number Structure | 2 banking days |
| R05  | Unauthorized Debit to Consumer Account Using Corporate SEC Code | 60 days |
| R06  | Returned per ODFI's Request | Per agreement |
| R07  | Authorization Revoked by Customer | 60 days |
| R08  | Payment Stopped | 2 banking days |
| R09  | Uncollected Funds | 2 banking days |
| R10  | Customer Advises Originator is Not Known / Not Authorized / Ineligible | 60 days |
| R11  | Customer Advises Entry Not in Accordance with Terms of Authorization | 60 days |
| R12  | Account Sold to Another DFI | 2 banking days |
| R13  | Invalid ACH Routing Number | 2 banking days |
| R14  | Representative Payee Deceased / Unable to Continue | 2 banking days |
| R15  | Beneficiary or Account Holder Deceased | 2 banking days |
| R16  | Account Frozen / Entry Returned per OFAC Instruction | 2 banking days |
| R17  | File Record Edit Criteria (field-level error) | 2 banking days |
| R20  | Non-Transaction Account | 2 banking days |
| R23  | Credit Entry Refused by Receiver | 2 banking days |
| R29  | Corporate Customer Advises Not Authorized | 2 banking days |
| R31  | Permissible Return Entry (CCD/CTX) | Per agreement |
| R51  | Item Related to RCK Entry is Ineligible | 2 banking days |

R10 and R11 were harmonized in 2020 so that R10 captures "no authorization exists" cases while R11 captures "authorization existed but the terms were not followed" (which still counts against unauthorized-return thresholds). R05 and R07 are the other unauthorized-return codes.

## Same-Day ACH

Traditional ACH settles next-banking-day or second-banking-day. **Same Day ACH** (launched in phases from 2016 onwards) provides same-business-day settlement for eligible entries. Three processing windows are currently offered:

| Window | ODFI Submission Deadline (ET) | Settlement Time (ET) |
|--------|-------------------------------|----------------------|
| 1      | 10:30 AM                      | 1:00 PM |
| 2      | 2:45 PM                       | 5:00 PM |
| 3      | 4:45 PM                       | 6:00 PM |

The **per-entry dollar limit for Same Day ACH was raised to $1,000,000** effective March 18, 2022. International ACH Transactions (IAT) above the limit and returns are not eligible for Same Day processing. Same-Day ACH supports credits, debits, and most SEC codes.

## Public Sources

- Nacha — About — https://www.nacha.org/about-us
- Nacha Operating Rules — https://www.nacha.org/rules
- ACH Network overview — https://www.nacha.org/ach-network
- Same Day ACH Resource Center — https://www.nacha.org/content/same-day-ach-resource-center

## Relevance to the Fiserv Brain Demo

B2B invoice merchants on a Fiserv acquiring + ACH stack care less about DE39 decline codes and more about ACH return codes. A Brain that can explain "why did this $47,000 CCD debit return R10 seven days after it was originated" in merchant language — and propose a remediation path (re-authorize, represent as R29 corporate exception, switch to WEB with account validation, escalate to dunning) — is genuinely useful. For same-day use cases the Brain must know the three processing windows, the $1M cap, and the eligibility exclusions. Nacha corpus is the grounding for every ACH-adjacent answer the Brain will generate.
