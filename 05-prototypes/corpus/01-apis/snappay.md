---
title: "SnapPay (Fiserv B2B AR/AP)"
topic: "snappay"
source_type: "public-web-research"
collected: "2026-04-14"
reliability: "high"
scope: "public-only"
purpose: "demo corpus for Fiserv Brain prototype"
sources:
  - url: "https://merchants.fiserv.com/en-us/products/merchants/snappay/"
    title: "SnapPay — Fiserv Merchants Site"
    accessed: "2026-04-14"
  - url: "https://developer.fiserv.com/product/SnapPay"
    title: "SnapPay — Fiserv Developer Studio"
    accessed: "2026-04-14"
  - url: "https://merchants.fiserv.com/en-us/products/merchants/bill-presentment-and-erp-integrated-payments"
    title: "Fiserv — ERP-Integrated Payments and Bill Presentment"
    accessed: "2026-04-14"
  - url: "https://appsource.microsoft.com/en-us/product/dynamics-365-for-operations/fiserv.fiserv_snappay_d365"
    title: "SnapPay Integrated Payment for Dynamics 365 — Microsoft AppSource"
    accessed: "2026-04-14"
  - url: "https://appsource.microsoft.com/en-us/product/web-apps/fiserv.fiserv_snappay_b2bpayments"
    title: "SnapPay B2B Integrated Enterprise Payment Platform — Microsoft AppSource"
    accessed: "2026-04-14"
  - url: "https://help.sap.com/docs/r/a5c364402f8d4c0b99f6a4c7de385a56/PROD/en-US/65337de9b36e421192c88b415fac845b.html"
    title: "SnapPay from Fiserv — SAP Help Portal"
    accessed: "2026-04-14"
  - url: "https://www.carat.fiserv.com/content/dam/carat/us/en/documents/pdf/SnapPay_ARAP_Overview_SAP_Specific.pdf"
    title: "SnapPay Integrated Payments for SAP — Overview PDF"
    accessed: "2026-04-14"
  - url: "https://www.carat.fiserv.com/en-us/resources/b2b-payments-automation/"
    title: "Carat — B2B Payment Automation Guide"
    accessed: "2026-04-14"
  - url: "https://insidesap.com/fiserv-inc-sap-advances-b2b-enterprise-payment-solutions/"
    title: "Inside SAP — Fiserv and SAP Advance B2B Enterprise Payment Solutions"
    accessed: "2026-04-14"
---

# SnapPay (Fiserv B2B AR/AP)

## Overview

SnapPay is Fiserv's B2B accounts-receivable and accounts-payable automation platform: a cloud-based payment-processing, tokenization, and ERP-integration layer purpose-built for enterprise finance teams rather than retail merchants. It automates order-to-cash end-to-end — electronic invoice presentment and payment (EIPP), tokenized card and ACH capture, automated reconciliation back into the ledger, surcharging, and cash-flow analytics — and it integrates at a process level with every major enterprise ERP: **SAP S/4HANA Cloud and SAP ECC**, **Oracle ERP Cloud**, **NetSuite Cloud ERP**, **JD Edwards**, and **Microsoft Dynamics 365**. It is listed on SAP's App Center, Microsoft AppSource, and Fiserv's own merchant site, and it sits inside the Carat / B2B Payment Automation portfolio.

**Important disambiguation.** There is a separate, unrelated Canadian company operating at `snappay.ca` which is a cross-border Alipay / WeChat Pay acceptance provider for merchants selling to Chinese tourists. That company is **not** part of Fiserv. When the Fiserv Brain sees "SnapPay" it should default to the Fiserv B2B AR/AP product documented here; only treat it as the Canadian APM provider if the user explicitly references Alipay, WeChat, or `snappay.ca`.

## Public documentation sources

- `https://merchants.fiserv.com/en-us/products/merchants/snappay/` — official Fiserv product page
- `https://developer.fiserv.com/product/SnapPay` — Fiserv Developer Studio product entry
- `https://merchants.fiserv.com/en-us/products/merchants/bill-presentment-and-erp-integrated-payments` — broader ERP-integrated payments landing
- `https://www.carat.fiserv.com/en-us/resources/b2b-payments-automation/` — Carat B2B payment automation guide
- `https://www.carat.fiserv.com/content/dam/carat/us/en/documents/pdf/SnapPay_ARAP_Overview_SAP_Specific.pdf` — PDF overview focused on SAP integration
- `https://help.sap.com/docs/r/a5c364402f8d4c0b99f6a4c7de385a56/PROD/en-US/65337de9b36e421192c88b415fac845b.html` — SAP Help Portal page for SnapPay
- `https://appsource.microsoft.com/en-us/product/dynamics-365-for-operations/fiserv.fiserv_snappay_d365` — Microsoft AppSource listing for Dynamics 365
- `https://appsource.microsoft.com/en-us/product/web-apps/fiserv.fiserv_snappay_b2bpayments` — Microsoft AppSource listing for the general B2B platform
- `https://azuremarketplace.microsoft.com/en-us/marketplace/apps/fiserv.fiserv_snappay_b2bpayments` — Azure Marketplace listing
- `https://insidesap.com/fiserv-inc-sap-advances-b2b-enterprise-payment-solutions/` — press coverage of the Fiserv–SAP partnership expansion

## Integration model

SnapPay is fundamentally an **ERP add-on plus a payment gateway**. The integration pattern differs from a traditional CNP gateway like Commerce Hub because the primary caller is the ERP system (or a UI embedded inside it), not a merchant web storefront.

**ERP integration layer.**
- **SAP (ECC and S/4HANA)** — SnapPay is listed as a certified solution on SAP's App Center and documented in SAP Help Portal. The SAP integration supports card, ACH, and emerging digital payment methods, embeds into SAP transaction screens, and handles tokenization so the SAP system never stores raw PANs. The `SnapPay_ARAP_Overview_SAP_Specific.pdf` is the authoritative public reference.
- **Oracle ERP Cloud** — real-time sync via APIs.
- **NetSuite** — native bundle that integrates directly into NetSuite Cloud ERP.
- **JD Edwards** — process-level integration for AR automation (Mizuno is a public reference case cited in the Carat B2B guide: ~20% processing-fee reduction).
- **Microsoft Dynamics 365** — certified as an integrated payment solution for Dynamics 365 Finance and Operations on Microsoft AppSource, with additional Azure Marketplace presence.

**Payment gateway / API layer.**
- REST APIs exposed via Fiserv Developer Studio under the SnapPay product.
- Tokenized card storage with PCI-scope reduction (tokens live in SnapPay, not in the ERP).
- ACH via NACHA rails.
- Multi-channel acceptance: AR clerks in the ERP, call-center / IVR, customer-facing EIPP portal, mobile, in-person terminals.
- **Surcharging** support to let merchants pass card-processing fees to the payer, publicly marketed as "reducing processing costs by over 20%."
- **Level 2 / Level 3 enhanced data capture** — SnapPay is positioned for corporate/purchasing cards and the broader B2B AR guide from Carat emphasizes L2/L3 data as a core interchange-optimization lever, though the specific field-by-field L2/L3 mapping is not in the public marketing docs.

**Authentication.** The public pages do not fully enumerate the auth scheme. Because SnapPay is hosted on Fiserv Developer Studio alongside Commerce Hub, and because its Dynamics/SAP bundles sign on the ERP user's behalf, the realistic production patterns are: (a) API-key + message-signature headers for server-to-server calls analogous to Commerce Hub, and (b) ERP-embedded connectors that use a pre-provisioned service credential stored in the ERP's secure vault. Treat the exact header scheme as a **gap** pending authenticated Developer Studio access.

## Key product/API surfaces

Based on the public merchant page, SAP PDF, and AppSource listings:

- **EIPP portal** — customer-facing hosted portal for viewing and paying invoices, branded to the merchant.
- **Invoice import / presentment** — invoices flow from the ERP into SnapPay; payment status flows back.
- **Tokenization / vault** — card-on-file for recurring B2B customers.
- **Card-present and card-not-present payment acceptance** — cards, ACH, and emerging digital payment methods (per SAP Help Portal wording).
- **Surcharging engine** — conditional fee assessment at transaction time.
- **Automated reconciliation** — posts cash application back to the ERP's open invoices.
- **Cash-flow forecasting and analytics** — dashboards built on SnapPay's transaction and aging data.
- **Multi-channel collection** — web, mobile, IVR, call center, in-person.
- **Customer risk prediction** — analytics on payer behavior.
- **Automated collections workflows** — dunning and follow-up.

## Known integration patterns / failure modes

- **ERP is the integration surface, not a merchant web app.** Teams accustomed to Commerce Hub's "tokenize in a browser, charge server-side" model have to re-learn: with SnapPay the AR clerk is the operator, and the ERP screen is the UI.
- **SAP-specific embedding** — the SAP bundle hooks into SAP transaction codes; upgrading SAP without re-certifying the SnapPay bundle is a known failure mode called out in the SAP-specific overview PDF.
- **Dynamics 365 versioning** — the AppSource listing is for Dynamics 365 Finance and Operations; teams on legacy Dynamics AX or Dynamics NAV may need the older SnapPay connector.
- **Level 2/3 data pass-through** — if the ERP does not populate the purchase-order number, tax amount, and line-item detail on the invoice, SnapPay cannot up-tier the transaction and interchange economics degrade.
- **Surcharging compliance** — surcharging is regulated differently by US state and not permitted in some jurisdictions; the merchant is responsible for configuring where surcharging is allowed.
- **Cash application timing** — automated reconciliation depends on the ERP's open-invoice refresh cadence; if the ERP batch runs infrequently, the "real-time" posting can look stale.

## Gaps — what is NOT publicly available

- Complete REST endpoint catalog, request/response schemas, and exact authentication header scheme (the Developer Studio SnapPay page requires login for full detail).
- Webhook / notification event catalog.
- Field-by-field Level 2 / Level 3 data requirements and interchange tables by card brand.
- Supported NACHA SEC codes and ACH return handling semantics.
- Pricing and interchange economics.
- SLA, rate limits, and concurrency targets.
- Exact list of SAP transaction codes the SAP bundle hooks into.
- Interop or token sharing between SnapPay and Commerce Hub.

## Relevance to Fiserv Brain demo

SnapPay is the Fiserv Brain corpus's clearest test of name disambiguation: the Canadian `snappay.ca` Alipay/WeChat provider is a completely different company, so any Brain answer that conflates the two is a visible failure. It is also the best example in the corpus of a **non-merchant, B2B AR/AP** surface — forcing the Brain to distinguish "pay an invoice from inside SAP" (SnapPay) from "charge a card on a website" (Commerce Hub) from "take a tap at a counter" (Clover). That three-way contrast is the most valuable demo scenario this file enables.
