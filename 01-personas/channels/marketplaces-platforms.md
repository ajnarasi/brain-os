# Channel: Marketplaces / Platforms

Multi-sided platforms running split-payment flows on Fiserv. Uber-style, DoorDash-style, Etsy-style — one platform with many sub-merchants, aggregated payments, and 1099-K reporting obligations.

- **Who owns the merchant:** The platform
- **Who pays for Brain:** Platform (bundled into platform's Fiserv contract)
- **Data access:** Full at the platform level; sub-merchant data is hierarchical
- **Surface:** Embedded inside the platform's corporate dashboard, rolled up from sub-merchant level
- **Trust relationship:** Sub-merchants trust the platform; platform trusts Fiserv
- **Typical size:** Platform itself is enterprise; sub-merchants span all sizes
- **Typical pain:** Split-payment correctness, sub-merchant KYC, 1099-K reporting, fraud propagation from one sub-merchant to the platform
- **Brain autonomy default:** Medium (platform's ops team reviews actions)

## Brain experience
- Platform-level Brain: aggregate view across all sub-merchants
- Optional sub-merchant Brain: the platform passes Brain capabilities through to its sub-merchants
- Hierarchical memory: platform memory at the top, sub-merchant memory underneath
- Agents specialized for split-payment ops, sub-merchant onboarding, 1099-K workflow

## Why this channel is strategic
- A single platform deal = thousands of effective Brain instances
- Platforms are high-GPV and strategic for Fiserv
- Platform Brain can be a differentiator for Fiserv's platform-payments pitch vs. Stripe Connect / Adyen for Platforms

## Priority
Not in v1. Requires multi-level memory hierarchy + sub-merchant consent patterns that are hard to get right on the first ship. V2.
