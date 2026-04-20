# Front-End Platform: IPG (Ucom)

The strategic-enterprise commerce platform. Internal name Ucom; external name IPG (Integrated Payments Gateway). Powers some of Fiserv's largest and most operationally complex merchants.

## Flagship merchants (representative)
- **Yum! Brands** — Taco Bell, KFC, Pizza Hut, Habit Burger
- **Dunkin'** (via Inspire Brands)
- **Inspire Brands** — Arby's, Buffalo Wild Wings, Sonic, Dunkin', Baskin-Robbins, Jimmy John's
- **Costco** — big-box membership warehouse

Pattern: **strategic-global QSR + big-box retail**, thousands to tens of thousands of locations, billions in GPV.

## Characteristics

- **Size tier:** almost always Enterprise or Strategic / Global
- **Channel:** usually Direct (Fiserv corporate sales), often with a Franchise/Master-merchant hierarchy underneath (corporate is the contracting party; individual locations are franchised)
- **Vertical:** heavily Restaurant (QSR + fast casual) and Retail (big-box, c-store, grocery)
- **Business model:** dominantly B2C card-present, with growing omnichannel (mobile app, drive-thru, self-serve kiosk, loyalty)
- **Back-end typical pairing:** Nashville primary; Buypass for fuel-attached locations; ValueLink for gift; STAR/NYCE for PIN debit; TeleCheck in grocery

## What makes IPG different from CommerceHub or Clover

- **Custom integrations by default.** Every IPG merchant has a bespoke integration — no out-of-the-box flow. Integrations take quarters, not weeks.
- **Strict change control.** Corporate IT approves changes. No ad-hoc config tweaks; every change goes through a release train.
- **Extreme uptime requirements.** A Yum!-scale merchant can't tolerate authorization-path downtime. Platform SLAs are far tighter than SMB-class platforms.
- **Franchise hierarchy baked in.** Corporate contracts; individual franchisees operate locations; Brain must model this hierarchy natively.
- **Volume + latency.** Millions of transactions per day, single-digit-millisecond authorization latency targets.
- **Specialty rail handling.** Fleet cards (at fuel locations), WIC/SNAP (at grocery), gift (ValueLink) — not edge cases, core flows.
- **Loyalty + tokenization.** IPG merchants almost always have a loyalty program integrated with payment tokens.

## Brain implications

### What the Brain must do differently for IPG merchants

1. **Hierarchical memory** — corporate memory shared across locations; location-specific memory for local quirks. See the franchise channel doc for the hierarchy model.
2. **Conservative autonomy** — never act autonomously on corporate-level config. Every suggested change routes through corporate change-control. Default H-I-L gate is full approval, not quick-confirm.
3. **Aggregation narratives** — weekly narratives roll up from location → region → brand → corporate. Different audiences want different granularity.
4. **Cross-location anomaly detection** — spot regional patterns ("the southeast has a 3% lower approval rate this week; here's the probable BIN-range cause").
5. **Fleet / specialty rail agents** — separate agent logic for Buypass-routed fuel transactions, ValueLink gift loads, PIN debit via STAR/NYCE.
6. **Custom integration support** — IntegrationAgent must handle bespoke integrations, not canned paths.

### What the Brain does NOT do for IPG merchants (day 1)

- Does not auto-adjust fraud rules — corporate risk teams own this
- Does not auto-route traffic — corporate ops owns this
- Does not auto-submit tickets — corporate support already has a full NOC
- Does not auto-reconcile settlement — corporate finance already has AR teams

IPG Brain value at the strategic tier is **narrative + leverage**, not autonomy. The Brain's job is to make corporate's lean central team effective across thousands of locations — not to replace any of those teams.

## Brain wedge for IPG merchants

The most valuable capability for an IPG-tier merchant is **cross-location narrative and benchmarking**, not transaction-level ops. A Yum! Brands corporate payments PM who can walk into an exec review with "here's what changed across 7,000 locations this week, here are the 12 locations driving most of our chargeback spend, here are the 3 regional issues driving our auth rate dip" — that's the Brain ROI pitch. The Brain is the analyst the lean central team doesn't have.

## Back-end interactions

IPG-tier merchants typically touch:
- **Nashville** for mainstream credit + signature debit authorization and clearing
- **STAR / NYCE / Accel** for PIN debit
- **Buypass** for fuel at c-store-attached locations (Yum! locations don't have fuel, but Costco and 7-Eleven-style merchants do)
- **TeleCheck** in grocery / big-box where check acceptance still matters
- **ValueLink** for gift and loyalty-card fulfillment

The Brain must ingest from all of these to give a complete picture.

## MVP priority

**V2, not v1.** IPG-tier pilots are not MVP material for three reasons:
1. Sales cycles are 6–18 months before pilot can even begin
2. Integration is custom → Brain capabilities need more maturity
3. Corporate stakeholder surface is large and political

However, IPG is the **largest single potential revenue line** for Brain as a Service in Fiserv's book, and corporate merchants are the stickiest segment. Treat it as the long-term prize while the SMB + mid-market slices prove the product.

## Slice D — Proposed IPG pilot (Year 2)

When the two-slice MVP lands, Slice D candidate: a single Inspire Brands-scale pilot with 1 brand (e.g., Arby's corporate only, not all of Inspire), 120 days, focused on cross-location analytics narratives + incident detection — no autonomous action. Success metric: corporate payments team saves 10+ hours/week on analyst work, and the Brain catches at least one material incident before corporate's own NOC does.

## Open questions specific to IPG

1. Data residency for IPG merchant telemetry — some strategic merchants require on-prem or VPC deployment
2. Loyalty / token interoperability with the Brain's memory — does loyalty context enter Brain memory?
3. Franchise privacy — can a Taco Bell franchisee see location-level Brain output, or only corporate?
4. Deployment model — is the Brain a SaaS consumed by corporate, or an on-prem component of corporate's own stack?
5. Relationship to corporate's existing BI stack — the Brain cannot duplicate what they already have; it must complement
