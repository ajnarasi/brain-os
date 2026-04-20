# Front-End Platform: CommerceHub

Fiserv's unified-commerce / e-com platform for mid-market and enterprise merchants. Originally First Data's e-com stack, now the primary commerce platform for online + omnichannel merchants in Fiserv's mid-market and enterprise books.

## Characteristics
- **Size tier:** Mid-Market → Enterprise
- **Channel:** Direct sales; ISV via CommerceHub SDK
- **Vertical:** Retail (especially fashion + omnichannel), Digital subscription, some B2B
- **Business model:** E-commerce, Omnichannel, increasingly Subscription
- **Back-end typical pairing:** Nashville default; some legacy on Omaha; ValueLink for gift; TeleCheck in specific verticals

## Why CommerceHub matters to the Brain
- **Mid-market sweet spot.** Most of the Brain's early-revenue potential lives here.
- **Rich API surface.** Well-documented developer portal → Brain's DocsAgent has a lot to work with.
- **APM orchestration.** The existing APM Checkout SDK (parent `APM/` folder) plugs directly into CommerceHub merchants via the APMAgent.
- **MVP Slice A.** Mid-market fashion brands on CommerceHub (+ Shopify ISV) are the value pilot.

## Brain implications
- **Ingestion:** CommerceHub txn stream + dispute system + settlement + OMS (merchant-side) + Shopify or BigCommerce integrations where present
- **Surface:** Embedded in the Fiserv merchant portal + API access for merchants with their own tooling
- **Agents:** Full catalog — IntegrationAgent, LaunchAgent, DisputeAgent, AnalyticsAgent, APMAgent, OptimizationAgent
- **Autonomy:** Medium to high — mid-market operators accept agent-driven action within defined envelopes

## Key platform quirks
- CommerceHub-specific webhook patterns Brain must know
- Unified commerce merchants have both POS and e-com data; the Brain must reconcile across channels
- BFCM season creates predictable traffic surges the LaunchAgent should anticipate
