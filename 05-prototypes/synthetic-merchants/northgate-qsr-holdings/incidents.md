---
merchant: northgate-qsr-holdings
file_type: synthetic_incidents
count: 3
source_type: "synthetic-demo-data"
---

# Historical incidents — NorthGate QSR Holdings

Three significant past incidents. Plus one **active incident in progress** at the end that connects to the demo scenario.

---

## fuel-firmware-oct-2025 — "Southeast fuel-attached Arby's auth rate dip (October 2025)"

**Severity:** P1 (high — visible to customers, crossed back-end boundary)
**Date:** 2025-10-14, 06:00 CT → 09:00 CT (3-hour window)
**Impact:** ~14 declined fuel transactions across 3 of 4 fuel-attached Arby's locations; estimated ~$850 lost + customer friction at the pump
**Status:** Resolved 2025-10-14 12:00 CT; post-mortem 2025-10-21

### Narrative

On the morning of 2025-10-14, 3 of NorthGate's 4 fuel-attached Arby's locations in the Southeast (Valdosta GA, Dublin GA, Macon GA — though NOT Cordele GA) showed an unexpected auth rate dip concentrated on the **Buypass** fuel-side (not the Nashville QSR side). Approval rate at those 3 locations' fuel pumps dropped from the expected >=98% baseline to ~85% over a 3-hour window.

Chris Nguyen (Fiserv Corp TAM) flagged it to Dana at 08:30 CT via the monthly on-call Slack. Dana investigated:

1. **Not a Nashville issue** — the same 3 locations' QSR sides were running clean at 98%+ approval
2. **Not a network issue** — other NorthGate locations on Nashville were all fine
3. **Not a card-brand issue** — the decline reasons mixed across Visa, Mastercard, Amex
4. **Cluster = Buypass-side only + Southeast GA only + morning window only**

Investigation with Buypass operations (via Chris) confirmed: Buypass had pushed an **EMV pump firmware update** overnight (2025-10-13 → 2025-10-14), rolled out in a Southeast wave. The firmware update left 3 of the 4 NorthGate fuel-attached locations in a state where the pump EMV kernel needed to re-sync with the updated host. The 4th location (Cordele GA) happened to not be in the same firmware wave.

Resolution: Buypass operations completed the re-sync by 12:00 CT. By 12:15, all 4 locations were back to baseline.

### Root cause
- **Primary:** Buypass rolling firmware update mid-wave, leaving affected pumps in a temporarily degraded state
- **Contributing:** NorthGate has no visibility into Buypass's firmware release schedule — we found out after the fact from Chris
- **Contributing:** NorthGate's incident alerting was cross-back-end silo'd (Nashville alerts and Buypass alerts went to different monitoring queues)

### Resolution
1. Buypass operations re-synced the affected pumps (2025-10-14 12:00 CT)
2. Post-mortem with Dana + Chris (2025-10-21)
3. Chris committed to giving NorthGate advance notice of future Buypass firmware windows (partial — Chris has delivered notice 2 of 3 times since)
4. Feedback memory entry created: `feedback.md#buypass-pump-firmware-sentinel`
5. IncidentAgent (then manual, now this Brain prototype) was tuned to cluster by back-end and region when investigating fuel-attached locations

### Cited feedback memory
- `feedback.md#buypass-pump-firmware-sentinel`

### Lessons for the Brain
The canonical "cross-back-end anomaly" pattern for NorthGate. Any fuel-attached-location auth-rate dip should check (1) is it only on the fuel side, (2) is it a regional cluster, (3) is it time-window-bounded, (4) did Buypass push firmware recently. This is the prototype of the Slice D demo scenario.

---

## super-bowl-lix-false-positives — "Super Bowl LIX BWW false-positive cascade (Feb 2025)"

**Severity:** P1 (high — customer-visible, real-time, reputational)
**Date:** 2025-02-09, 17:00 CT (game start) → 21:00 CT (game end + post-game)
**Impact:** ~120 false-positive declines across 14 BWW locations; ~$3,400 lost revenue; significant social media complaints during the game
**Status:** Resolved same-day through emergency rule adjustments; post-mortem 2025-02-17

### Narrative

Super Bowl LIX on 2025-02-09. BWW is a sports-bar chain — Super Bowl Sunday is the single-largest revenue day of the year. During pre-game and game-time hours, 14 of NorthGate's 12 BWW locations (some counted twice because of shift changes) experienced an elevated false-positive decline rate on fraud rules that had been tuned for normal Sunday volumes.

Specifically:
- **Velocity rules** flagged rapid high-ticket orders as suspicious (groups ordering multiple wing platters + pitchers + towers)
- **Geo-anomaly rules** flagged out-of-town visitors (family watching the game with in-laws in a different city)
- **Mobile-order rules** flagged the curbside pickup spike as anomalous

Derek Lee (BWW regional ops) started getting customer complaints on social media within 90 minutes of kickoff. Dana Okafor emergency-loosened the fraud envelope at 18:30 CT (across all 12 BWW locations) via Chris Nguyen's on-call support. Decline rate normalized by 19:15 CT but the damage (~120 complaints) was done.

### Root cause
- **Primary:** Fraud rules tuned for normal volumes, not 3.5x peak
- **Contributing:** No pre-event fraud rule adjustment in NorthGate's Super Bowl prep runbook (at the time)
- **Contributing:** Social media was faster than internal monitoring — Derek found out from Twitter, not from a Brain alert

### Resolution
1. Emergency fraud envelope loosening during game (2025-02-09)
2. Post-game reversion to normal rules (2025-02-10 08:00 CT)
3. Post-mortem with Dana + Derek + Chris Nguyen (2025-02-17)
4. Created annual Super Bowl prep runbook (now at `runbook-super-bowl-fraud-tuning.md`)
5. Feedback memory entry created: `feedback.md#bww-super-bowl-capacity`
6. Applied successfully for Super Bowl LX (2026-02-08) — zero complaints

### Cited feedback memory
- `feedback.md#bww-super-bowl-capacity`

### Lessons for the Brain
Pre-event fraud rule adjustment is a pattern that generalizes beyond Super Bowl — any known traffic surge event (SXSW for Casa Rosa, March Madness for BWW, graduation season for Casa Rosa catering, BFCM for Indigo Road) needs the same pattern. AnalyticsAgent should proactively flag upcoming surge events in its monthly narratives.

---

## valuelink-inventory-dec-2025 — "Arby's holiday gift card bonus promo depleted ValueLink stock"

**Severity:** P2 (medium — promo-specific, short window)
**Date:** 2025-12-10, 09:00 CT (promo launch) → 13:00 CT (stock depletion)
**Impact:** 3 Arby's locations ran out of gift card inventory mid-promo; ~$18K estimated lost sale + customer complaints during holiday shopping
**Status:** Resolved next day; post-mortem 2025-12-15

### Narrative

For the Arby's Holiday Gift Card Bonus ("Buy a $50 gift card, get a $10 bonus") promo on 2025-12-10, NorthGate wasn't involved in inventory provisioning decisions — that's handled by Inspire Brands corporate + ValueLink operations. Unfortunately, ValueLink provisioned stock based on prior-year demand, which under-estimated the 2025 uplift from Inspire's stronger holiday marketing.

At 3 NorthGate Arby's locations (all high-traffic stores in metro Atlanta), the ValueLink gift card inventory was depleted by ~13:00 CT, meaning customers trying to buy gift cards for the rest of the promo day had to be turned away. Locations in less-trafficked areas had enough stock and were unaffected.

Dana found out from Janice Park (Arby's regional ops) at ~14:00 CT when Janice relayed complaints from store managers. By the time Dana escalated to Chris Nguyen and Chris engaged ValueLink operations, the inventory re-provisioning for next-day was the only fix available.

### Root cause
- **Primary:** ValueLink pre-promo inventory forecasting based on prior-year data
- **Contributing:** No cross-team coordination between Inspire Brands promo planning and ValueLink operations (at the franchisee group level — NorthGate had no line of sight)
- **Contributing:** No "real-time inventory depletion" alert during the promo window

### Resolution
1. Inventory re-provisioned by next day (2025-12-11)
2. Affected customers offered a $15 credit via email marketing (apology + retention)
3. Post-mortem with Dana + Janice + Chris (2025-12-15)
4. Chris committed to flagging Dana in advance of future Inspire national promos involving gift cards
5. Feedback memory entry created: `feedback.md#valuelink-promo-inventory`

### Cited feedback memory
- `feedback.md#valuelink-promo-inventory`

### Lessons for the Brain
Two weeks before any national promo involving gift cards, the Brain should proactively check ValueLink inventory levels. This is an example of a proactive monitoring task the Brain can own as part of its "Operate phase" value.

---

## ⚠️ ACTIVE INCIDENT — fuel-firmware-apr-2026 (in progress right now)

**Severity:** P1 (high — still in progress)
**Date:** 2026-04-14 (today), 07:42 CT → ongoing
**Impact:** 3 of 4 fuel-attached Arby's fuel-side declines in a ~25-minute window; ~$160 in declined volume so far + customer friction

### Narrative (current state)

**Right now,** 3 of NorthGate's 4 fuel-attached Arby's locations in Southeast Georgia (Valdosta, Dublin, Macon) are showing fuel-side declines on the Buypass back-end. Specifically (see `transactions.md`):

- **txn_NG_004** at 07:42 CT, Valdosta GA, Buypass host timeout
- **txn_NG_005** at 07:55 CT, Dublin GA, EMV kernel mismatch
- **txn_NG_007** at 08:03 CT, Macon GA, Buypass host timeout

The 4th fuel-attached Arby's location (Cordele GA, `NGHOLD-ARBY-44`) is **NOT** showing the issue. The non-fuel-attached Arby's locations are all running clean. BWW and Jimmy John's are all running clean.

**Cluster signature:** Southeast Georgia + Buypass back-end + fuel side + morning window — **this matches the pattern from `incidents.md#fuel-firmware-oct-2025`**.

**Likely root cause:** Buypass pushed a firmware update overnight in the Southeast wave (repeat of the 2025-10-14 pattern). Per `feedback.md#buypass-pump-firmware-sentinel`, this is exactly what IncidentAgent should detect and narrate.

**Recommended action for Brain:**
1. Alert Dana with the cluster narrative (not 3 separate alerts)
2. Tie back to the October 2025 incident
3. Suggest contacting Chris Nguyen to confirm whether Buypass had a firmware window overnight
4. Do NOT attempt any remediation — this is a Buypass-side issue, NorthGate has no levers here
5. Draft the narrative for Dana's morning check-in

This active incident is the **core of the Slice D demo scenario** (scenario #5 in `demo-mvp.md`): "Something is wrong with my auth rate today" — the Brain detects, clusters, narrates, and ties to memory all in one response.
