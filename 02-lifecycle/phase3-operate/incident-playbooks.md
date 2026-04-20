# Operate — Incident Playbooks

Common incidents the Brain must recognize, narrate, and (eventually) remediate. Each becomes a structured playbook the IncidentAgent loads on detection.

## Auth rate drop
**Detection:** auth rate >2σ below 7-day baseline
**Narrative template:** "Your auth rate is X% (down Y pp from baseline). The drop is concentrated in [segment: issuer / BIN / card brand / geo / product]. Likely causes: [rank-ordered]. Suggested actions: [ranked]."
**Common causes:** issuer/BIN change, fraud rule mis-tune, 3DS flow break, infra latency, stale token refresh

## Decline-code distribution shift
**Detection:** significant change in the mix of decline codes
**Narrative template:** "Your decline mix shifted at [time]. [Code X] went from A% to B%. This matches [prior incident / known pattern]."
**Common causes:** fraud tuning, issuer policy change, 3DS misconfig, AVS/CVV strictness change

## Latency spike
**Detection:** p50 or p99 latency increases >2σ
**Narrative template:** "Your p99 is [X]ms, up from [Y]ms baseline. Fiserv-side latency is [Z]ms. The remaining [X-Z]ms is merchant-side or network."
**Common causes:** Fiserv infra, merchant-side infra, network, geo-routing change

## Dispute spike
**Detection:** dispute volume 2x 7-day baseline
**Narrative template:** "You received [N] disputes today, vs. avg of [M]. Concentration: [category]. Top drivers: [list]."
**Common causes:** delivery partner, friendly fraud wave, fulfillment issue, descriptor confusion, subscription auto-renewal

## Settlement variance
**Detection:** settlement amount ≠ expected from txn total (outside tolerance)
**Narrative template:** "Today's settlement was $X, expected $Y. Variance: $Z. Reason: [identified / investigating]."
**Common causes:** chargeback holds, reserve adjustments, partner bank cutoff timing, refund timing, network fee change

## Fraud rule drift
**Detection:** false-positive rate creeping up week-over-week
**Narrative template:** "Your fraud rules are blocking [X%] more legitimate-looking txns than last month. Top rules driving this: [list]. Suggested tuning: [specific rule changes]."

## Integration regression
**Detection:** previously-working path starts returning errors
**Narrative template:** "Path [X] started failing at [time]. [Y%] of requests affected. The failure mode looks like [known pattern / new]."

## Each playbook ships with
- Detection logic (what triggers it)
- Narrative template (human-readable summary)
- Top-N diagnostic branches (what to investigate first)
- Suggested actions (what to do)
- Historical win rate (if available)
- Escalation path (when to involve a human)
