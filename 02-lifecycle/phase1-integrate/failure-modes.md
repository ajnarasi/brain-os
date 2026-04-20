# Integrate — Top Integration Failure Modes

The 20+ failure modes the Brain must recognize and remediate. Each becomes a structured entry in global feedback memory.

## Category 1 — Wrong-documentation failures
1. Dev reads stale docs; feature has been renamed/moved
2. Dev integrates against wrong product (CommerceHub vs. Clover vs. Optis vs. Carat)
3. Dev uses wrong API version
4. Dev misses a sub-section of the docs that's critical for their vertical

## Category 2 — Config / credentials failures
5. Sandbox credentials mismatched to production-target product
6. API key scoped incorrectly (read vs. read-write, restricted endpoints)
7. Webhook endpoint not HTTPS / not publicly accessible
8. Webhook signature verification missing or wrong
9. Merchant uses a static IP the Brain/Fiserv can't reach

## Category 3 — Data / schema failures
10. Missing required field in request (e.g., `mcc`, `merchant_descriptor`, `soft_descriptor`)
11. Incorrect date/time format or time zone
12. Wrong currency for geo (submitting USD for a EU-locked MID)
13. ISO 8583 DE mis-mapping (common for merchants migrating from another processor)

## Category 4 — 3DS / auth failures
14. 3DS version wrong for issuer (v1 retry after v2 frictionless fails)
15. Exemption flag missing / incorrect
16. Merchant initiates 3DS but doesn't handle the challenge callback
17. Card-brand rules for SCA not applied for EU-region txns

## Category 5 — Cert failures
18. Cert scripts submitted against wrong endpoint
19. Cert scenarios missing required edge cases for merchant's product
20. Cert response schema not matched (merchant returns extra fields card brand doesn't expect)

## Category 6 — Channel-specific failures
21. Bank-channel merchant tries to use a direct-channel boarding flow
22. Clover ISV merchant integrates at the wrong layer (Clover API vs. underlying CommerceHub)
23. PayFac sub-merchant onboarding skips KYC step

## Brain response pattern

For each failure mode, the Brain:
1. Detects the pattern from the ISO 8583 response + request context
2. Cites the prior merchants that hit this (anonymized) and the fix that worked
3. Drafts the fix for the merchant's dev to review
4. Writes the resolution to feedback memory so this merchant never hits it twice

## Writing back to global memory

After an anonymization pass, patterns that repeat across merchants get promoted to global feedback memory, available to all future merchants' IntegrationAgent sessions. This is where the compounding kicks in.
