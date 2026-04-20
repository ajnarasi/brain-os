---
merchant: casa-rosa-taqueria
file_type: synthetic_transactions
count: 10
window: "2026-04-14 (single day)"
source_type: "synthetic-demo-data"
---

# Synthetic transactions — Casa Rosa Taqueria (Tuesday 2026-04-14)

10 representative transactions from **today** (so the daily close narrative scenario is current). Fabricated for the demo.

All amounts in USD. All names are fake. All MIDs are synthetic.

---

## txn_CR_001 — Lunch rush card-present sale (East Austin)

- **Time:** 13:04 CT
- **Location:** East Austin (`CLVR-CR-EA`)
- **Amount:** $18.75 (meal) + $3.75 (tip) = **$22.50**
- **Auth:** Approved, Clover Mini, contactless Visa
- **Method:** Apple Pay
- **Notes:** Normal lunch rush transaction

## txn_CR_002 — Takeout via Clover Online Ordering

- **Time:** 12:47 CT
- **Location:** South Congress (`CLVR-CR-SC`)
- **Amount:** $31.20
- **Auth:** Approved, Mastercard credit, card-not-present
- **Method:** Clover Online Ordering, paid at order
- **Notes:** Pickup at 13:15 CT, customer retrieved order without issue

## txn_CR_003 — DoorDash Drive order (delivery)

- **Time:** 12:22 CT
- **Location:** North Loop (`CLVR-CR-NL`)
- **Amount:** $28.95 (order) — paid by DoorDash, not the end customer
- **Auth:** Approved, part of DoorDash's batch settlement
- **Driver pickup:** 12:33 CT (GPS confirmed via DoorDash Drive app)
- **Driver delivery:** 12:48 CT (GPS confirmed)
- **Notes:** Clean DoorDash flow. Delivery data fully captured, so if this gets disputed, `feedback.md#doordash-not-received-template` applies.

## txn_CR_004 — PIN debit declined (first customer of morning, fixed by reboot)

- **Time:** 07:02 CT
- **Location:** North Loop (`CLVR-CR-NL`)
- **Amount:** $7.42 (breakfast taco + coffee)
- **Auth:** **Declined** on first attempt, Clover Mini PIN pad
- **Reason:** PIN pad soft decline — post-firmware-update state (per `feedback.md#pin-pad-firmware-nightly`)
- **Resolution:** Luis rebooted the Mini at 07:04 CT, customer re-swiped at 07:05 CT, approved
- **Notes:** This is the known "post-firmware-update morning" pattern. Flag in daily close narrative that Luis caught it and the rest of the morning was clean.

## txn_CR_005 — Disputed: DoorDash "item not received" (3 days old, new chargeback)

- **Original time:** 2026-04-11 19:15 CT
- **Location:** East Austin (`CLVR-CR-EA`)
- **Amount:** $42.30 (order of 4 items for a family)
- **Auth:** Approved (original order)
- **Driver pickup:** 19:24 CT (GPS confirmed)
- **Driver delivery:** 19:41 CT (GPS confirmed at destination address)
- **Status as of today (2026-04-14):** ⚠️ **NEW CHARGEBACK** received 09:15 CT this morning under **DoorDash's internal dispute process**
- **Customer claim:** Did not receive the order
- **Evidence available:** GPS pickup + GPS delivery timestamps from DoorDash Drive app + order-release timestamp from Clover KDS
- **Win rate:** Per `feedback.md#doordash-not-received-template`, 100% win rate (6/6) when GPS is available
- **Recommended action:** DisputeAgent → draft response using `dd-not-received-template` + attach GPS data + order-release timestamp

## txn_CR_006 — Large table bill at South Congress

- **Time:** 19:22 CT (yes, tonight — in the middle of the dinner rush right now)
- **Location:** South Congress (`CLVR-CR-SC`)
- **Amount:** $184.50 (meal) + $33.21 (18% tip) = **$217.71**
- **Auth:** Approved, Amex credit, contactless
- **Server:** Elena Moreno
- **Notes:** Table of 8. Normal weeknight pattern. Tip is healthy.

## txn_CR_007 — Split payment at East Austin

- **Time:** 19:45 CT
- **Location:** East Austin (`CLVR-CR-EA`)
- **Amount:** $67.40 total, split across 3 cards
  - Card A: $25.00 (Visa, approved)
  - Card B: $25.00 (Mastercard, approved)
  - Card C: $17.40 (Discover, approved)
- **Notes:** Clean split. Server handled via Clover Flex.

## txn_CR_008 — Declined: insufficient funds

- **Time:** 18:47 CT
- **Location:** North Loop (`CLVR-CR-NL`)
- **Amount:** $24.10
- **Auth:** **Declined** — ISO 8583 DE39 `51` (insufficient funds)
- **Card:** Visa debit
- **Resolution:** Customer used a different card, re-swiped, approved
- **Notes:** Translate to owner-language in the daily close narrative: "one card was declined for insufficient funds, the customer used a different card and the sale went through." Do NOT say "DE39 `51`."

## txn_CR_009 — Refund processed

- **Time:** 17:18 CT
- **Location:** South Congress (`CLVR-CR-SC`)
- **Amount:** **-$14.20** (refund)
- **Original txn:** A lunch order from earlier today where a customer reported a missing side. Maria authorized the refund.
- **Notes:** Normal service-recovery refund. Casa Rosa averages 1–2 of these a day.

## txn_CR_010 — Uber Eats order

- **Time:** 20:08 CT (current — still in progress)
- **Location:** East Austin (`CLVR-CR-EA`)
- **Amount:** $36.80
- **Auth:** Approved, Uber Eats batch
- **Notes:** Still in "driver en route" state in the Uber Eats Connect app as of daily close time.

---

## Summary stats for AnalyticsAgent (daily close narrative)

### Revenue by location (per `feedback.md#tip-reconciliation-by-location`)

| Location | Transactions | Net revenue | Tips | Notes |
|---|--:|--:|--:|---|
| East Austin (`CLVR-CR-EA`) | 4 | $150.75 | $19.58 | One DoorDash dispute received (txn_CR_005) |
| South Congress (`CLVR-CR-SC`) | 3 | $263.11 | $33.21 | Large table at 19:22 drove the day |
| North Loop (`CLVR-CR-NL`) | 3 | $60.47 | $6.85 | Morning PIN pad reboot, otherwise clean |

### Total
- **Revenue:** $474.33 across 10 txns (+ one refund of $14.20)
- **Tips:** $59.64
- **Approval rate:** 10 / 11 attempts after retries = 91% (below baseline 94% due to the PIN pad reboot attempt)
- **Disputes:** 1 received today (txn_CR_005) — DoorDash not-received, high-win template applies
- **Refunds:** 1 ($14.20)

### Brain should flag in daily close

1. **Dispute action item:** A new DoorDash dispute came in this morning. DisputeAgent has already drafted the response using the highest-win-rate template (100% with GPS data available). Ready for Maria's one-click review.
2. **Morning PIN pad reboot:** Luis caught the post-firmware-update pattern at 07:04 CT. No action needed — this is a known routine.
3. **South Congress outperformed on tips:** 18% vs. average 16.5%. Unusually high average ticket thanks to the table of 8 at 19:22 CT.
4. **Forecast tomorrow (Wednesday):** Based on recent Tuesdays and weather, expect ~$4,100–$4,500 across locations. Wednesday is typically slightly lower than Tuesday for Casa Rosa.
