---
type: partner
merchant: indigo-road-apparel
last_reviewed: 2026-04-14
---

# Partner memory — Indigo Road Apparel

The channel + platform relationship. Drives which surface, which branding, which back-ends, and how much autonomy the Brain has.

## Channel (Axis 2)

**Primary channel:** Direct (Fiserv corporate sales relationship)
**Secondary channel:** ISV — Shopify Plus via Fiserv Carat for e-com

Because Indigo Road has both a direct CommerceHub relationship (for in-store) and an ISV-mediated relationship (for e-com via Shopify → Carat → CommerceHub), the Brain sees them as a **mixed-channel merchant**. Fiserv owns the commercial relationship; Shopify owns part of the UX surface.

### Support routing
- **First line for dev questions:** Sarah Chen (CTO)
- **Second line:** Priya Patel (Fiserv TAM) — weekly 1:1 with Sarah
- **Third line:** Fiserv solutions engineering (engaged via Priya)
- **Shopify-side issues:** Shopify Plus support directly (not Fiserv's responsibility, but the Brain should still know)

### Commercial relationship
- Fiserv-branded (no white-label)
- Pays Fiserv directly on CommerceHub Enterprise contract
- Shopify is paid separately (platform fees)

## Fiserv Platform (Axis 5)

### Front-end
- **CommerceHub** — primary (direct integration for in-store POS, plus backend for e-com via Carat)
- **Carat** — API bridge layer between Shopify Plus and CommerceHub
- **SnapPay** — wholesale AR via NetSuite

### Back-end
- **Nashville (North)** — primary authorization + clearing for ~97% of volume
- **STAR / NYCE / Accel** — PIN debit routing (smaller share; signature debit + credit dominate in fashion retail)

*No Buypass (no fuel), no TeleCheck (no check acceptance), no ValueLink (gift cards handled in Shopify, not via Fiserv gift rails). Omaha / South — legacy, not relevant to this merchant.*

### ISO 8583 dialect
- Nashville dialect — use the parser documented in `corpus/03-industry-standards/iso-8583.md` + any Fiserv-specific extensions noted in `corpus/01-apis/commercehub.md`

## Data access scope

Full data access. Fiserv owns the CommerceHub stack and Shopify shares the e-com txn context via Carat. No restrictive partner agreement reducing telemetry.

## Branding

**Fiserv-branded** — the Brain appears in Sarah's Fiserv merchant portal tab, with Fiserv's visual identity. No white-label requirement.

## Autonomy envelope

**Medium.**

| Action class | Default gate |
|---|---|
| Read-only retrieval, narratives, drafts | None |
| Fraud rule changes within ±20% of current | Sarah approves inline |
| Fraud rule changes >±20% | Marcus (CFO) approval required |
| Dispute response drafting | None (draft only) |
| Dispute submission | Marcus approval required |
| Integration config changes | Sarah approves; production changes require a PR + review |
| Contract-affecting suggestions (routing, settlement account) | Marcus approval required |

The envelope is looser than enterprise (NorthGate QSR) because Sarah is a technical CTO who trusts the Brain to move fast, but tighter than SMB (Casa Rosa) because Marcus watches risk actively.

## Escalation path

1. **Brain** answers → merchant acts (most cases)
2. **Priya Patel (Fiserv TAM)** — for Fiserv-specific questions the Brain can't source
3. **Fiserv solutions engineering** — for integration deep dives (engaged via Priya)
4. **Fiserv product + legal** — for contract or BNPL-vendor-review questions
5. **Marcus Webb (internal)** — for any decision that crosses the autonomy envelope

## Freshness

- Channel + platform facts: **stable** — event-driven changes only
- Last verified: 2026-04-14
- Next review: on contract renewal (2026-07-01) or major platform change
