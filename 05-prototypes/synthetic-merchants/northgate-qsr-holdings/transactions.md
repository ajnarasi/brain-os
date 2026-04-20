---
merchant: northgate-qsr-holdings
file_type: synthetic_transactions
count: 10
window: "2026-04-14 (sample across brands and locations)"
source_type: "synthetic-demo-data"
---

# Synthetic transactions — NorthGate QSR Holdings (sample from 2026-04-14)

10 representative transactions from **today** across the 3 brands and multiple back-ends, chosen to support the Slice D demo scenarios (cross-location anomaly, multi-back-end reconciliation).

All amounts in USD. All names, MIDs, and cardholder details are fake.

---

## txn_NG_001 — Arby's morning rush EMV contactless (normal)

- **Time:** 07:12 CT
- **Brand / location:** Arby's — Macon, GA location (`NGHOLD-ARBY-23`)
- **Amount:** $9.85
- **Auth:** Approved, DE39 `00`, EMV contactless
- **Card:** Visa credit via Apple Pay
- **Back-end:** Nashville
- **Notes:** Normal example of the Arby's morning rush pattern per `feedback.md#arbys-morning-rush-pattern`. 73% of Arby's morning txns are contactless — this is one of them.

## txn_NG_002 — Arby's fuel-attached location (fuel side)

- **Time:** 07:34 CT
- **Brand / location:** Arby's — Valdosta, GA travel-plaza location (`NGHOLD-ARBY-09`), **fuel side**
- **Amount:** $58.40 (18.3 gallons gasoline)
- **Auth:** Pre-auth via **Buypass**, completed at pump
- **Card:** Fleet card (WEX) — driver ID required
- **Back-end:** **Buypass** (fuel) — separate from Nashville for this merchant's QSR sales
- **Notes:** Example of the fuel-side flow. Only applies at the 4 fuel-attached Arby's locations. See `corpus/01-apis/ucom-ipg.md` for the cross-back-end context.

## txn_NG_003 — Arby's fuel-attached location (QSR side, same customer)

- **Time:** 07:38 CT
- **Brand / location:** Arby's — Valdosta, GA (`NGHOLD-ARBY-09`), **QSR side**
- **Amount:** $7.25 (breakfast sandwich + coffee)
- **Auth:** Approved, DE39 `00`, EMV chip
- **Card:** Same WEX fleet card from txn_NG_002 — driver bought fuel then walked in for breakfast
- **Back-end:** **Nashville** — different pipe from the fuel purchase
- **Notes:** Demonstrates the cross-back-end reality — the **same customer + same card** generated two separate transactions on two separate back-ends within 4 minutes. Brain must reconcile across both for a complete picture of the location's day.

## txn_NG_004 — Arby's declined (PART OF TODAY'S SOUTHEAST ANOMALY — see incidents.md)

- **Time:** 07:42 CT
- **Brand / location:** Arby's — Valdosta, GA (`NGHOLD-ARBY-09`), fuel side
- **Amount:** $47.20 (attempted fuel purchase)
- **Auth:** **Declined** — Buypass return code (fuel authorization host timeout after 8 seconds)
- **Card:** Personal Visa credit
- **Back-end:** Buypass
- **Notes:** ⚠️ **Part of the southeast Arby's fuel anomaly** that IncidentAgent is currently investigating. See txns 005, 007 for the cluster. Customer re-swiped at a different pump and succeeded on retry.

## txn_NG_005 — Arby's declined (ANOMALY, Macon GA)

- **Time:** 07:55 CT
- **Brand / location:** Arby's — Dublin, GA travel-plaza location (`NGHOLD-ARBY-31`), fuel side
- **Amount:** $62.80 (fuel)
- **Auth:** **Declined** — Buypass return code (EMV kernel mismatch on pump)
- **Card:** Visa debit
- **Back-end:** Buypass
- **Notes:** ⚠️ **Part of the anomaly cluster.** Same back-end, geographically close (Dublin GA, ~60 miles from Macon/Valdosta).

## txn_NG_006 — BWW evening rush (normal)

- **Time:** 19:47 CT
- **Brand / location:** BWW — Nashville, TN downtown (`NGHOLD-BWW-03`)
- **Amount:** $127.40 (table of 4 — apps, wings, beers) + $22.93 tip = **$150.33**
- **Auth:** Approved, DE39 `00`, EMV chip
- **Card:** Mastercard credit
- **Back-end:** Nashville
- **Notes:** Clean BWW weeknight dinner. Derek Lee's region.

## txn_NG_007 — Arby's declined (ANOMALY, 3rd location)

- **Time:** 08:03 CT
- **Brand / location:** Arby's — Macon, GA travel-plaza location (`NGHOLD-ARBY-17`), fuel side
- **Amount:** $53.10 (fuel)
- **Auth:** **Declined** — Buypass host timeout
- **Card:** Amex
- **Back-end:** Buypass
- **Notes:** ⚠️ **Third location in the anomaly cluster.** All 3 declined Arby's are fuel-side, Southeast Georgia, all on Buypass, all in the 07:42–08:03 CT window. The 4th fuel-attached Arby's (Cordele, GA — `NGHOLD-ARBY-44`) has NOT shown the issue. This is a clear cluster. See `incidents.md` for the likely Buypass firmware explanation (per `feedback.md#buypass-pump-firmware-sentinel`).

## txn_NG_008 — Jimmy John's lunch counter sale

- **Time:** 12:42 CT
- **Brand / location:** Jimmy John's — Knoxville, TN (`NGHOLD-JJ-05`)
- **Amount:** $11.85
- **Auth:** Approved, contactless, Google Pay (Visa backend)
- **Back-end:** Nashville
- **Notes:** Normal JJ lunch rush transaction.

## txn_NG_009 — BWW gift card purchase (ValueLink)

- **Time:** 17:15 CT
- **Brand / location:** BWW — Chattanooga, TN (`NGHOLD-BWW-07`)
- **Amount:** $100.00 (gift card purchase, part of Inspire's Blazin' Rewards)
- **Auth:** Approved, EMV chip (Mastercard)
- **Back-end:** **Nashville** for the card authorization + **ValueLink** for the gift card creation and balance seeding
- **Notes:** Demonstrates cross-back-end (Nashville + ValueLink) handling for gift card purchases. Gift cards are a material volume for the Inspire portfolio per `feedback.md#valuelink-promo-inventory`.

## txn_NG_010 — BWW PIN debit

- **Time:** 20:12 CT
- **Brand / location:** BWW — Birmingham, AL (`NGHOLD-BWW-11`)
- **Amount:** $87.50 + $15.75 tip = $103.25
- **Auth:** Approved via STAR (PIN debit)
- **Back-end:** **STAR** for PIN routing (not Nashville)
- **Notes:** Shows PIN debit routing. Good data point for AnalyticsAgent when discussing interchange optimization across PIN vs. signature debit.

---

## Summary stats for AnalyticsAgent

### Per-brand volume (sample from today)

| Brand | Txns | Revenue | Notes |
|---|--:|--:|---|
| Arby's | 5 | $175.60 | 3 declines in the anomaly cluster (txns 004, 005, 007) — ⚠️ investigation in progress |
| BWW | 3 | $353.58 | Higher average ticket; healthy tips |
| Jimmy John's | 2 | $23.70 | Normal |

### Per-back-end reconciliation (the NorthGate signature complexity)

| Back-end | Txns | Volume | Status |
|---|--:|--:|---|
| Nashville (North) | 6 | $434.88 | Healthy |
| Buypass (fuel) | 4 | $221.50 | ⚠️ **3 declines = cluster** (txns 004, 005, 007 in SE GA between 07:42 and 08:03 CT) |
| STAR (PIN debit) | 1 | $103.25 | Healthy |
| ValueLink (gift card) | 1 (overlay on NG_009) | $100.00 | Healthy |
| TeleCheck | 0 | — | N/A today |

### The critical pattern for the demo

**3 of 4 fuel-attached Arby's locations in Southeast Georgia declined fuel transactions via Buypass between 07:42 and 08:03 CT.** The 4th location (Cordele GA) did not. This is exactly the anomaly IncidentAgent should detect, cluster, narrate, and tie back to `feedback.md#buypass-pump-firmware-sentinel`. The expected Brain output is the narrative in `incidents.md` for the active investigation.

### Baseline context for anomaly detection

- **Today's expected Arby's morning rush (per `feedback.md#arbys-morning-rush-pattern`):** ~$88K across 47 locations in the 06:30–08:00 CT window, approval rate >=98%
- **Actual today:** The non-fuel-attached Arby's locations are tracking at 98.3% (healthy). The fuel-side of the 4 fuel-attached Arby's locations is tracking at 73% (⚠️ anomaly concentrated there).
- **Cluster:** Southeast GA, Buypass back-end, fuel side, 07:42–08:03 CT window
