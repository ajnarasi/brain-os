# Channel: PayFacs / PSPs

Payment facilitators and payment service providers who use Fiserv as their underlying processor while aggregating sub-merchants under their own master account.

- **Who owns the merchant:** The PayFac
- **Who pays for Brain:** PayFac (API consumption pricing)
- **Data access:** Full access to the PayFac's own book; sub-merchant data is platform-mediated
- **Surface:** **API-only** — the PayFac builds its own UX
- **Trust relationship:** The PayFac's end sub-merchants trust the PayFac, never see Fiserv
- **Typical size:** PayFac itself is usually mid-market to enterprise; sub-merchants vary
- **Typical pain:** Complex split-payment ops, sub-merchant onboarding at scale, 1099-K reporting, MATCH-risk propagation
- **Brain autonomy default:** High (PayFac's ops team drives it)

## Brain experience
- No UI. Brain is consumed via API by the PayFac's internal ops tooling or embedded in their own merchant-facing product
- PayFac's ops team uses Brain for:
  - Sub-merchant onboarding ("is this applicant risky?")
  - Ongoing sub-merchant monitoring
  - Split-payment reconciliation
  - MATCH-list exposure checks
- Optionally, PayFac passes Brain capabilities to its sub-merchants (sub-merchant Brain as a feature of the PayFac's product)

## Why this channel matters
- PayFacs are large, sophisticated, and API-native — they'll integrate Brain fast
- PayFacs serve many sub-merchants, so one PayFac deal = many effective Brain instances
- High technical sophistication means agents can operate at higher autonomy from day 1

## Hard problems
- PayFac pricing models are different (usage-based, not per-seat)
- Sub-merchant data access needs another layer of consent
- PayFacs may prefer to build their own brain rather than consume one

## Priority
Not in v1. Save for v2 once the UI-based product proves itself — PayFacs want to consume a mature API, not beta-test one.
