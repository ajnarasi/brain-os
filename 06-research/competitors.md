# Competitors

Running inventory of competitive / adjacent products. Not a market report — just a working list of who's building what.

## Direct-adjacent (payments-AI)

| Player | What they have | Gap vs. Brain |
|---|---|---|
| **Stripe Docs AI / Sigma** | Best-in-class docs RAG, unified data APIs, developer DX | Direct-channel only. No bank, ISV, ISO. No POS ecosystem. No multi-processor memory. |
| **Adyen Copilot** (early betas reported 2025–2026) | Enterprise polish, unified commerce | Enterprise-only. No SMB path. No channel distribution. |
| **Klarna's internal merchant AI** | BNPL-specific merchant support | Single-product scope. Not a control plane. |
| **PayPal merchant assistant** | Conversational support for PayPal merchants | PayPal-only. Lives in the PayPal walled garden. |

## Chargeback / dispute AI

- **Chargeflow, Midigator (Equifax), Ethoca Consumer Clarity, Verifi Order Insight** — point solutions in dispute management. Valuable in their lane; not cross-lane; not memory-based.

## Fraud AI

- **Forter, Signifyd, Riskified, Sift, Accertify** — fraud scoring and decision engines. Adjacent, not competitive (Brain would integrate with these, not replace them).

## Merchant analytics

- **Mode, Looker, Tableau** — generic BI. Merchants use these for their own data but they're not payments-specific.
- **Square Analytics, Shopify Analytics** — bundled with their respective platforms. Closed ecosystems.

## POS / commerce operating systems

- **Clover** — Fiserv-owned; the Brain's most important distribution partner
- **Toast** — restaurant-specific; a Clover competitor; potential wedge for the restaurant vertical if Toast partners
- **Square** — Block's closed ecosystem
- **Lightspeed** — retail/restaurant/golf
- **Shopify POS** — DTC and retail

Most of these have their own analytics layer but none have a per-merchant brain in the Karpathy sense.

## Horizontal AI agents

- **Claude, ChatGPT, Gemini** — general-purpose. Not competitive; would be consumed by the Brain as the underlying model.
- **Generic agent frameworks** — LangChain, LlamaIndex, etc. — tooling, not products.

## The "nothing exists" observation

There is no product in the market today that:
1. Is channel-aware (direct + bank + ISV + ISO + PayFac + marketplace)
2. Is cross-product (works across POS + e-com + disputes + settlement + fraud)
3. Is memory-first (per-merchant durable memory)
4. Takes action (agent layer, not just RAG)

Stripe is the closest in sophistication but only covers #4 at the direct-merchant level. No one is thinking about channels.

## Watch list

- Stripe's next agent release
- Any announcement from Adyen on multi-tenant copilot
- Block/Square's AI roadmap
- Any payments startup raising on an AI-first merchant ops thesis
- Big Tech (Google/Microsoft) attempts to embed merchant-ops AI into their broader cloud commerce offerings
