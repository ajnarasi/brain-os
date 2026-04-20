# Channel: Bank Partners (FI Channel)

Merchants who get acquiring services from their bank, where the bank resells Fiserv under its own brand. This is one of Fiserv's largest channels by merchant count and the single most important channel for the Brain's long-term growth — because the bank channel has the most merchants and the least competitive pressure.

- **Who owns the merchant:** The partner bank
- **Who pays for Brain:** Partner bank (rev-share back to Fiserv)
- **Data access:** Restricted by partner agreement; typically full txn/dispute/settlement, limited TAM access, no cross-merchant benchmarking without bank consent
- **Surface:** White-labeled inside the bank's merchant portal (Fiserv typically invisible to the end merchant)
- **Trust relationship:** Merchant trusts the bank, not Fiserv
- **Typical size:** Micro-SMB through mid-market
- **Typical pain:** Low-tech merchants, bank support is first line, limited product sophistication
- **Brain autonomy default:** Medium — bank may require higher H-I-L gates for their book

## Brain experience
- Fully white-labeled: bank logo, bank colors, bank TAM as escalation
- Data-sharing scope defined per partner agreement
- Bank ops team gets a separate aggregate view of the Brain across their merchant book
- Brain capabilities restricted to what the bank has licensed
- Escalation path: Brain → bank TAM → Fiserv (invisible to merchant)

## Why this channel matters so much
- Largest raw merchant count
- Banks desperately need differentiation beyond price
- "Your bank's AI ops assistant" is a sales story the bank can tell
- Rev-share model means bank carries the distribution cost
- Highest moat: once a bank deploys the Brain across their book, the switching cost hits the bank, not just the merchant

## Hard problems to solve
- Data-sharing legal work for each partner bank
- Multi-tenant white-labeling infra
- Cross-merchant feedback memory anonymization (can't accidentally leak merchant-specific data across bank books)
- Bank compliance review cycles are long

## Fit for the stretch pilot
The "Slice C" stretch pilot in `04-prd/mvp-scope.md` targets a single community bank to prove this channel works. If it lands, Year 2 is dominated by bank-channel scaling.
