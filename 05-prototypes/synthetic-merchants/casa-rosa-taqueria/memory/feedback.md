---
type: feedback
merchant: casa-rosa-taqueria
last_reviewed: 2026-04-14
---

# Feedback memory — Casa Rosa Taqueria

---

## tip-reconciliation-by-location — "Reconcile tips per location, not per MID"

**Rule:** When closing out tips at end of day, always reconcile per location (`CLVR-CR-EA`, `CLVR-CR-SC`, `CLVR-CR-NL`) — not at the parent MID level. The parent MID aggregation will double-count tips that were moved between locations during shift swaps.

**Why:** November 2025 — Maria caught a tip-reporting discrepancy of ~$480 between what servers had reported and what Clover's parent-MID report showed. Root cause: when a South Congress server covered an East Austin shift, the tip was recorded at South Congress in POS but rolled up to East Austin in the aggregate report. Two locations over 1 week → ~$480 in phantom double-counting.

**How to apply:** Default daily close narrative from AnalyticsAgent must present tip totals **per location**, not aggregated. If Maria asks for aggregate, generate it separately, but always start per-location.

**Source:** Tip reconciliation discrepancy investigation, Maria + Luis, 2025-11-20.
**Scope:** Merchant-specific (but almost certainly generalizable to multi-location Clover restaurants).
**Confidence:** High.
**Last verified:** 2026-03-30 (monthly sanity check).

---

## doordash-not-received-template — "DoorDash 'item not received' wins with delivery-zone GPS + timestamp"

**Rule:** For DoorDash-originated chargebacks under "item not received," the winning template attaches: (a) DoorDash driver pickup timestamp from Clover's DoorDash Drive app, (b) delivery-confirmation GPS ping from DoorDash's dasher app (if the driver confirmed delivery), (c) Casa Rosa's order-complete timestamp showing food was released to the driver.

**Why:** Q2 2025 — a streak of 8 DoorDash-originated chargebacks, 6 wins and 2 losses. The 2 losses didn't have GPS delivery confirmation. The 6 wins all did.

**How to apply:** Whenever a DoorDash-sourced chargeback comes in under "not received," immediately pull the driver pickup + GPS delivery data from the DoorDash Drive Clover app before drafting a response. **Win rate with GPS: 6/6 (100%). Without: 0/2 (0%).**

**Source:** Q2 2025 dispute tracking, Luis Delgado.
**Scope:** Merchant-specific.
**Confidence:** Medium (small sample, but clear pattern).
**Last verified:** 2026-02-15.

---

## friday-dinner-rush-terminal-reboot — "Reboot Flex units before Friday 5pm, not during"

**Rule:** If any Clover Flex unit is showing signs of slow response or battery warnings in the afternoon, reboot it **before 16:30 CT** on a Friday — never during service. A reboot during the 17:30–21:30 dinner window takes Flex units offline for ~4–6 minutes, which in a Friday rush means 2–3 tables stuck without ability to order or pay.

**Why:** 2025-08-22 — East Austin Flex unit froze at 18:45 CT. Javier tried to reboot; unit was offline for ~6 minutes. Two tables walked out during the outage. Estimated lost sale: ~$180 plus reputation.

**How to apply:** Daily pre-shift Flex check at 16:00 CT; reboot any unit with latency or battery warnings before 16:30 CT. Pre-shift checklist should be added to Maria's opening runbook.

**Source:** Friday dinner rush incident, Javier + Maria, 2025-08-22.
**Scope:** Merchant-specific.
**Confidence:** Medium.
**Last verified:** 2026-02-01.

---

## pin-pad-firmware-nightly — "Firmware updates land at midnight — don't open at 5am without a reboot"

**Rule:** Clover pushes some Flex/Mini firmware updates overnight around midnight. On mornings after an update, the PIN pad sometimes needs a manual reboot before it will process its first PIN debit transaction. If Maria opens at 5am (for breakfast prep delivery) without rebooting, the first PIN debit customer of the morning hits a soft decline.

**Why:** 2025-10-18 — North Loop location's first customer of the morning (a coffee + breakfast taco pickup, $7.42 PIN debit) declined. Reboot fixed it. Happened twice more over the following 2 months on post-update mornings.

**How to apply:** After any overnight firmware update notification (visible in Clover dashboard), Luis runs a reboot sweep at 5:30am before opening. Less than 1 minute of work, saves the first-customer decline.

**Source:** North Loop opening routine, Luis Delgado, 2025-10-18 onward.
**Scope:** Merchant-specific.
**Confidence:** Medium.
**Last verified:** 2026-03-10.

---

## sxsw-fraud-tuning — "Loosen fraud rules during SXSW, not after"

**Rule:** During SXSW week (first week of March), Casa Rosa's fraud false-positive rate triples because of out-of-state visitors using cards Clover's default fraud rules flag as unusual. Loosen the velocity and geo rules **one week before SXSW starts**, not after, or else Maria loses first-day conversion.

**Why:** SXSW 2025 (first week of March 2025) — on opening day, ~11 legitimate out-of-state transactions declined in the first 3 hours. By the time Luis loosened the rules, lunch service was half over. Estimated lost sales: ~$900.

**How to apply:** In late February, AnalyticsAgent should remind Luis to adjust the fraud envelope for SXSW week. Revert to normal on the Monday after.

**Source:** SXSW 2025 post-mortem, Luis Delgado, 2025-03-20.
**Scope:** Merchant-specific and date-specific.
**Confidence:** High.
**Last verified:** 2026-03-02 (applied pre-SXSW 2026 successfully).
