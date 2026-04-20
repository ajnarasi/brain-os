# Business Model: B2B2C Marketplace / Platform

Sub-merchant-facilitated payments. Platform accepts payment on behalf of a sub-merchant and splits the funds.

## Characteristic pattern
- Platform is the merchant of record
- Sub-merchants are the actual sellers
- Payment is split at capture
- 1099-K reporting for sub-merchants
- Sub-merchant KYC required

## Brain-relevant data sources
Platform txn system, sub-merchant KYC, split instructions, 1099-K data

## Memory schema
Platform → Sub-merchant (with its own memory subtree) → Transaction → Split

## Brain capabilities that matter most
- Sub-merchant onboarding
- Split-payment correctness
- 1099-K reporting automation
- MATCH-list risk propagation

## Typical size
Platform itself is usually enterprise. Sub-merchants span all sizes (a single platform may have sub-merchants from micro-SMB to strategic).

## Priority
V2+. See the marketplace channel doc for related notes.
