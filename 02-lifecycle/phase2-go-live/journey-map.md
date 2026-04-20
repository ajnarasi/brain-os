# Phase 2 — Go-Live

The "launch brain." Covers the ~72 hours before cutover through the first two weeks of stable production traffic. This is the highest-stakes phase — a bad launch costs the merchant real money and Fiserv real reputation.

## The go-live moment

"Go-Live" isn't a single event. It's a sequence:

1. **T-7 days** — Pre-launch checklist, production credentials issued, DNS / webhook endpoints validated
2. **T-48 hours** — Final config (fraud thresholds, chargeback routing, settlement accounts, tax config, refund policies)
3. **T-24 hours** — Dry-run transactions, TAM sign-off
4. **T-0** — Traffic cutover
5. **T+0 to T+72 hours** — Critical watch window
6. **T+1 week** — Stability declared
7. **T+2 weeks** — Launch retrospective

## Today, without the Brain

- Pre-launch checklists are PDFs. Merchants miss items. TAMs chase.
- Fraud thresholds are set to "generic conservative defaults" and nobody tunes them until the merchant complains about false declines.
- First 72 hours is the TAM staring at a dashboard manually, or nobody staring at anything.
- When something breaks at 2am, the merchant finds out from a customer complaint before Fiserv does.
- Launch retros happen only if someone remembers to schedule one.

## With the Brain

### Pre-launch (T-7 to T-0)

The **LaunchAgent** runs a dynamic checklist scoped to the merchant's exact configuration: channel, vertical, business model, products enabled. It doesn't surface items that don't apply. For a Clover restaurant in Texas, the checklist is shorter and more specific than a generic retail launch.

The Brain cross-checks:
- Fraud thresholds against the merchant's expected txn profile (from sandbox patterns)
- Settlement accounts against the merchant's banking record
- Tax config against the merchant's state/locality/MCC
- Chargeback routing against Fiserv's own chargeback system
- Refund policies against the merchant's own website / T&C

Anything inconsistent gets flagged as a pre-launch blocker.

### Cutover (T-0)

LaunchAgent watches the first production transaction live. If it fails, the Brain immediately:
1. Captures the ISO 8583 response
2. Diagnoses (it has the merchant's entire sandbox history + feedback memory to compare against)
3. Either auto-remediates or hot-dials the TAM

### The watch window (T+0 to T+72 hours)

The Brain runs a continuous anomaly detector comparing production traffic against the sandbox baseline and against comparable merchants (same cluster + business model). Detected anomalies:
- Auth rate >2σ below baseline → investigate issuer / BIN patterns
- Latency spike → check Fiserv infra + merchant-side infra
- Decline-code distribution shift → check fraud rules
- Refund/chargeback early indicators → check merchant-side fulfillment
- Settlement not arriving as expected → check cutoff timing

Any real anomaly triggers a narrative alert ("your auth rate in the last 2 hours is 4% below the first-hour baseline, concentrated on Visa credit from issuers X and Y — this looks like fraud rule mis-tune, not an issuer event") and optionally a human-in-loop remediation.

### Stability declaration (T+1 week)

LaunchAgent runs a structured review — checks the full metric set against thresholds, writes a "launch stable" memory entry, and starts handing off to OpsAgent for steady-state operations.

### Retrospective (T+2 weeks)

Brain generates a launch retro automatically:
- Incidents: count, severity, time-to-detect, time-to-resolve
- Checklist items skipped or failed
- Fraud rule tuning needed
- Any manual interventions
- Suggestions for the next launch of a similar merchant cluster

Retros become training data for every subsequent merchant's launch.

## Brain capabilities required for Phase 2

- **LaunchAgent** — orchestrates pre-launch checklist, cutover watch, stability declaration
- **AnomalyAgent** — continuous statistical + comparative anomaly detection
- **FraudTuningAgent** — initial fraud threshold tuning from sandbox patterns
- **SettlementAgent** — verifies settlement flows, catches discrepancies in first cycles
- **EscalationAgent** — decides when to wake up a human (TAM or merchant)
- **RetroAgent** — generates structured launch retrospectives

## KPIs

- **Clean-launch rate** — % of launches with zero P1 incidents in the first 72 hours (target 90%+)
- **Launch-week incident count** — mean incidents per launch (target: down 60%)
- **Time-to-detect** — seconds from anomaly emergence to Brain alert (target: <2 min)
- **Time-to-resolve** — minutes from detection to remediation (target: <15 min for Brain-remediable issues)

## Channel nuance

- **Direct / Clover / ISV:** Brain runs end-to-end, full telemetry, high autonomy
- **Bank channel:** Brain runs end-to-end on Fiserv-owned telemetry; bank's TAM is first escalation; white-labeled reporting for bank ops
- **PayFac:** Brain exposed as API; PayFac's ops team drives the launch, Brain provides anomaly feed and retrospective

## The "launch brain" wedge

Phase 2 is the single most visceral pitch of the Brain. "We watched your launch for 72 hours so you didn't have to" is a sentence mid-market merchants will pay for. This is where the two-pilot beachhead proves ROI fastest.
