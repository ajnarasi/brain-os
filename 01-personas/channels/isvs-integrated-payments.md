# Channel: ISVs (Integrated Payments)

Software vendors who embed Fiserv payments inside their own product — Clover itself, third-party apps on Clover App Market, ISVs using CommerceHub SDKs, Carat API consumers, dev.fiserv.com integrations.

- **Who owns the merchant:** The ISV
- **Who pays for Brain:** ISV (rev-share) or Fiserv (bundled into the platform)
- **Data access:** Full txn access typically; limited merchant-CRM access (the ISV owns the CRM)
- **Surface:** **Embedded inside the ISV's UX** — this is the key constraint
- **Trust relationship:** Merchant trusts the ISV; Fiserv is the "rails underneath"
- **Typical size:** Micro-SMB through mid-market (depends on the ISV)
- **Typical pain:** Varies by vertical the ISV serves
- **Brain autonomy default:** Medium-high (ISV typically has good data)

## Brain experience
- Brain **must** embed natively into the ISV's product — iframe, widget, or API
- Co-branded or fully white-labeled to the ISV
- Brain uses ISV-specific data sources (Clover knows the POS state; a salon-SaaS knows the booking state)
- Escalation path: Brain → ISV support → Fiserv TAM

## Clover specifically
Clover is the Fiserv-owned ISV and the highest-leverage ISV relationship. Clover App Market is the distribution mechanism for zero-CAC Brain rollout to SMB merchants. Slice B of the MVP (`04-prd/mvp-scope.md`) uses Clover specifically to prove this axis.

## Other ISVs
- CommerceHub SDK customers (vertical SaaS for specific industries)
- Carat API consumers (larger platforms using Fiserv as their commerce layer)
- Third-party Clover App Market apps

## Why this channel is strategic
- ISV merchants are "sticky by default" because the ISV relationship matters more than the processor relationship
- ISV-embedded Brain is low-friction install (the merchant already uses the ISV's product)
- Each ISV is a distribution lever — one ISV integration can reach thousands of merchants

## Hard problems
- ISV data contracts must allow Brain access
- Brain must ship in the ISV's style — different tone, different UI, different surface per ISV
- ISVs may build their own AI layer first — Brain must be more valuable than what the ISV could build alone
