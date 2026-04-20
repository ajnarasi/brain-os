# Front-End Platform: Clover

Fiserv's SMB-facing commerce platform. POS-first, owner-operator-friendly, with an App Market that ISVs build into.

## Characteristics
- **Size tier:** Micro-SMB → SMB (mostly)
- **Channel:** ISV channel (Clover is itself the ISV, plus third-party Clover App Market apps). Also distributed through bank partners.
- **Vertical:** Heavy in Restaurant/Food, Personal Services, Retail SMB
- **Business model:** Mostly B2C card-present; increasingly omnichannel for multi-location operators
- **Back-end typical pairing:** Nashville default; STAR/NYCE for PIN debit; ValueLink for gift

## Why Clover matters to the Brain
- **Distribution.** Clover App Market is zero-CAC distribution for reaching hundreds of thousands of SMBs.
- **Data access.** Fiserv owns Clover — full telemetry, no restrictive partner agreements.
- **Product familiarity.** Clover merchants already use a digital dashboard; adding "Brain" as a tab is a low-friction install.
- **MVP Slice B.** Clover-native SMB restaurants are one of the two beachhead pilots. See `../../../04-prd/mvp-scope.md`.

## Brain implications
- **Ingestion:** Clover POS events + Fiserv back-end txn events (Nashville)
- **Surface:** Embedded Clover app (dedicated Brain tab)
- **Agents:** SMB-scoped — DocsAgent, TicketAgent, DailyCloseAgent, DisputeAgent, TipReconciliationAgent, AnalyticsAgent
- **Autonomy:** High by default (owners want the Brain to act, not explain)

## Key platform quirks
- Clover has its own Developer portal and cert flow; Brain's IntegrationAgent for Clover ISVs is Clover-specific
- Tip flows are a core Clover feature and need specialized handling
- Clover's offline mode means some events land in batches, not real-time
