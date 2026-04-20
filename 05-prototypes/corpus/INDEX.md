# Corpus Index

Machine-readable manifest of the demo corpus. Generated 2026-04-14. See `README.md` for context.

## Summary

- **15 files**, **~21,400 words total**
- 4 topic clusters: APIs, Fiserv general, industry standards, merchant context
- Source type: `public-web-research` (public-only)
- Collected: 2026-04-14

## Manifest

| # | File | Cluster | Words | Reliability | Topic focus |
|---|---|---|--:|---|---|
| 1 | `01-apis/clover.md` | APIs | 1132 | High | Clover SMB POS — docs.clover.com, REST + Android SDK + Ecommerce, OAuth 2.0 w/ PKCE, webhooks |
| 2 | `01-apis/commercehub.md` | APIs | 1072 | High | CommerceHub — developer.fiserv.com, HMAC SHA256 auth, GitHub examples repo |
| 3 | `01-apis/ucom-ipg.md` | APIs | 1354 | Medium | Ucom = Connected Commerce + IPG NA + Carat, hashExtended signature, Inspire Brands reference case |
| 4 | `01-apis/snappay.md` | APIs | 1315 | High | Fiserv SnapPay B2B AR/AP, SAP S/4HANA + Oracle ERP + NetSuite + JD Edwards + MS Dynamics (Mizuno reference case) |
| 5 | `01-apis/mypg.md` | APIs | 764 | N/A (negative) | No public Fiserv product by this name; closest candidates enumerated |
| 6 | `02-fiserv-general/blogs-press-releases.md` | Fiserv general | 1690 | High | Agentic commerce pacts (Visa/MC Dec 2025), FIUSD stablecoin, Clover Q1 2025 stepdown, Finxact, CEO transition |
| 7 | `02-fiserv-general/merchant-issues.md` | Fiserv general | 1967 | Medium | Sept 2025 securities class action + 7 complaint themes (forced migration, settlement holds, lock-in, equipment, support, billing, fraud FPs) |
| 8 | `03-industry-standards/iso-8583.md` | Standards | 1576 | High | Versions, MTI, bitmap, DE reference table, DE3/DE22/DE39 tables, message flows, dialects |
| 9 | `03-industry-standards/emv-emvco.md` | Standards | 1238 | High | EMVCo governance, contact/contactless/3DS 2.x/tokenization, 12-step contact flow, merchant integration |
| 10 | `03-industry-standards/nacha.md` | Standards | 1391 | High | ACH network, SEC codes (PPD/CCD/WEB/etc), return codes (R01–R51), Same-Day ACH windows |
| 11 | `03-industry-standards/pci-dss.md` | Standards | 1447 | High | PCI DSS 4.0, 12 requirements, merchant levels 1–4, SAQ table, tokenization/P2PE scope reduction |
| 12 | `04-merchant-context/strategic-merchants.md` | Merchants | 1392 | High | Yum! (Byte, $40B digital, 61K+ stores), Costco (Anywhere Visa 2025 rewards), Inspire Brands (Carat Sep 2023) |
| 13 | `04-merchant-context/clover-merchants.md` | Merchants | 1416 | Medium | Clover case studies + Merchant Maverick/BND review consensus, App Market category table, Casa Rosa persona grounding |
| 14 | `04-merchant-context/industry-risk.md` | Merchants | 1398 | Medium | MRC, Nilson, Datos Insights, LexisNexis True Cost of Fraud 2025 ($5.75/$1), Chargebacks911, 5 themes |
| 15 | `04-merchant-context/failure-patterns.md` | Merchants | 2271 | High | Visa 10.x/11.x/12.x/13.x + Mastercard + Amex chargeback tables, decline reasons, Stack Overflow/GitHub SDK themes, Braintree 3DS/webhook/env issues |

## Per-cluster totals

| Cluster | Files | Words |
|---|--:|--:|
| 01-apis | 5 | 5637 |
| 02-fiserv-general | 2 | 3657 |
| 03-industry-standards | 4 | 5652 |
| 04-merchant-context | 4 | 6477 |
| **Total** | **15** | **21,423** |

## Key sources cited (partial — see individual files for full list)

**Primary Fiserv:**
- docs.clover.com
- developer.fiserv.com (CommerceHub, ConnectedCommerce, IPGNA, SnapPay products)
- merchants.fiserv.com
- newsroom.fiserv.com / investors.fiserv.com
- github.com/Fiserv (commercehub-api-examples, etc.)

**Industry standards:**
- emvco.com
- nacha.org
- pcisecuritystandards.org
- Wikipedia (ISO 8583 overview)

**Press / analysis:**
- pymnts.com
- paymentsdive.com
- qsrmagazine.com
- businesswire.com
- cnbc.com

**SEC filings:**
- Yum! Brands 2024 10-K, Q1/Q3 2025 earnings releases (s2.q4cdn.com)
- Inspire Brands corporate site

**Merchant review / complaint:**
- trustpilot.com
- bbb.org
- cardpaymentoptions.com
- reddit.com (r/smallbusiness, r/Clover, r/payments, r/merchantservices)
- zlk.com (securities class action tracking)

**Industry data:**
- merchantriskcouncil.org
- nilsonreport.com
- datos-insights.com
- risk.lexisnexis.com (True Cost of Fraud)
- chargebacks911.com

**Card brand chargeback docs:**
- Visa / Mastercard / American Express merchant operating guides (public portions)

**Developer pain points:**
- stackoverflow.com (tags: payment-gateway, stripe, braintree, iso-8583, chargeback)
- github.com (braintree/*, stripe/*, Adyen/*, square/* issue trackers)

## Integrity check

Run this from the corpus folder to verify all files are present and frontmatter parses:

```bash
cd "APM/Fiserv Brain/05-prototypes/corpus"
for f in $(find . -type f -name "*.md" ! -name "README.md" ! -name "INDEX.md"); do
  head -1 "$f" | grep -q "^---$" && echo "OK $f" || echo "MISSING FRONTMATTER $f"
done
```

## Refresh policy

- **Monthly** if the demo is live and being shown to stakeholders
- **On demand** when a specific topic in the corpus gets challenged in a demo (re-pull that file only)
- **Never** silently — every refresh bumps `collected:` in frontmatter so staleness is visible
