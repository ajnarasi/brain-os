# Front-End Platform: Carat

Fiserv's enterprise "operating system for commerce." API-first, developer-led, aimed at large enterprises and platforms that want to build their own commerce surfaces on top of Fiserv rails.

## Characteristics
- **Size tier:** Enterprise → Strategic
- **Channel:** Direct + PayFac + Marketplace
- **Vertical:** Mixed — often platform-style merchants (marketplaces, mobility, delivery) that cut across verticals
- **Business model:** API-first, usually powering B2B2C marketplaces or omnichannel enterprise
- **Back-end typical pairing:** Nashville mostly, some Omaha legacy

## Why Carat matters to the Brain
- **Composable.** Carat customers build their own UX — Brain needs to be consumable as an API, not just as a UI
- **Enterprise ROI story.** A single Carat customer can represent billions in GPV; Brain ROI scales accordingly
- **Bridge to Strategic segment.** Carat is the natural on-ramp for moving Brain upmarket from CommerceHub

## Brain implications
- **Ingestion:** Carat API events + merchant-side integrations
- **Surface:** API-first (Brain exposed as callable APIs the enterprise embeds in their own ops stack)
- **Agents:** Full catalog but API-consumed; less UI emphasis
- **Autonomy:** Defined by the customer's own ops tooling, not by Brain defaults

## Key platform quirks
- Carat customers typically run their own BI/ops stack; Brain must integrate, not replace
- Many Carat merchants are platforms (marketplaces, mobility apps) — sub-merchant hierarchy matters
- V2 target — too custom for MVP but high-value once the platform proves itself
