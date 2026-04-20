---
type: feedback
merchant: northgate-qsr-holdings
last_reviewed: 2026-04-14
---

# Feedback memory — NorthGate QSR Holdings

Rules learned from prior incidents + operations. Each entry is a lesson Dana's lean central payments team should never need to re-learn.

---

## buypass-pump-firmware-sentinel — "Watch for regional auth rate dip after a Buypass pump firmware window"

**Rule:** Buypass (petroleum / fuel authorization) pushes pump firmware updates in rolling waves, usually during overnight hours. When a wave hits the Southeast (where NorthGate's 4 fuel-attached Arby's locations live), the first few hours of the morning can show auth rate dips at those specific locations due to the EMV pump kernel needing to resync with the updated firmware.

**Why:** 2025-10-14 — IncidentAgent predecessor (a Slack alert from Chris Nguyen) caught a 3% auth rate dip across 3 of 4 fuel-attached Arby's between 06:00 and 09:00 CT. Root cause traced to a Buypass firmware push overnight. Unrelated to NorthGate's core Fiserv platform — it was a fuel-side issue at the pump. See `incidents.md#fuel-firmware-oct-2025`.

**How to apply:** IncidentAgent should:
1. Check whether there was a Buypass firmware window in the last 24 hours when investigating auth rate dips at NorthGate's fuel-attached locations
2. Cluster by back-end (Nashville vs. Buypass) when narrating anomalies — don't roll up across back-ends
3. Know that the fuel-side dip does **not** affect the non-fuel Arby's locations or BWW/Jimmy John's (different back-end)
4. Escalation path: Chris Nguyen (Fiserv corp TAM) → Buypass operations team

**Source:** 2025-10-14 fuel-attached Arby's investigation; post-mortem with Dana + Chris.
**Scope:** Merchant-specific, but generalizable to any strategic QSR merchant with fuel-attached locations on Buypass.
**Confidence:** Medium (one confirmed instance; Chris has mentioned there have been ~3 similar Buypass firmware windows across his broader book).
**Last verified:** 2026-02-10.

---

## bww-super-bowl-capacity — "BWW Super Bowl capacity planning needs pre-event fraud rule tuning"

**Rule:** Super Bowl Sunday is NorthGate BWW's single-largest revenue day of the year (3.5x normal Sunday volume). Fraud rules tuned for normal volumes false-positive during the Super Bowl peak because: (a) out-of-town visitors using cards the rules flag as geo-anomalous, (b) rapid high-ticket transactions (parties + takeout orders) hitting velocity thresholds, (c) mobile-order pickup volume spikes.

**Why:** Super Bowl LIX (February 2025) — 14 BWW locations saw ~120 false-positive declines in a 3-hour window during game time. Estimated lost revenue: ~$3,400. Also: reputational — customers complaining on social media in real time during a sports-bar event is the worst possible PR.

**How to apply:** Every year in late January, Dana should run the "Super Bowl prep" checklist:
1. Loosen fraud velocity rules by 30% at BWW locations starting Thursday before Super Bowl
2. Loosen geo-anomaly rules by 50% at BWW locations same window
3. Revert to normal rules Monday morning after Super Bowl
4. Watch cross-location incident stream during game time (IncidentAgent + human-on-call)

**Source:** Super Bowl LIX post-mortem, Dana + Derek Lee (BWW regional ops), 2025-02-17.
**Scope:** Merchant-specific and event-specific.
**Confidence:** High (one data point but clear pattern; expected to repeat).
**Last verified:** 2026-02-09 (post-Super Bowl LX — applied successfully; zero false-positive complaints).

---

## arbys-morning-rush-pattern — "Arby's morning rush 6:30-8:00 AM is EMV tap-to-pay dominated"

**Rule:** At Arby's locations, 73% of transactions between 06:30 and 08:00 CT are EMV contactless (tap to pay), primarily Apple Pay and Google Pay. Auth rate in this window should be >=98%; any dip below 97% is worth investigating as a potential contactless reader or network issue at specific locations.

**Why:** Q1 2026 analytics review — Dana asked "what does a normal morning look like?" and Luis (Dana's analyst) pulled the breakdown. Pattern has been remarkably consistent across Q4 2025 and Q1 2026.

**How to apply:** AnalyticsAgent baseline for Arby's morning rush:
- Expected volume: ~$88K across 47 Arby's locations in the 06:30–08:00 window
- Expected tender mix: 73% EMV contactless, 18% magstripe/chip, 9% cash
- Expected approval rate: >=98%
- **Alert threshold:** if approval rate drops below 97% across more than 5 locations, escalate to IncidentAgent

**Source:** Q1 2026 analytics review, Dana Okafor, 2026-03-15.
**Scope:** Merchant-specific (Arby's brand-specific).
**Confidence:** High (consistent across 2 quarters).
**Last verified:** 2026-04-10.

---

## cross-location-noc-narrative — "Cluster alerts, don't enumerate them"

**Rule:** When raising cross-location incidents, the Brain should narrate the **cluster** ("3 of 47 Arby's locations in southeast Georgia"), **not** enumerate the individual locations. Dana manages 67 locations — she doesn't want 47 alerts; she wants "the 3 in Georgia." Only drill down to individual locations on explicit request.

**Why:** 2025-11-02 — IncidentAgent predecessor (manual alerting) pinged Dana with 47 individual alerts during a Nashville back-end brief hiccup. She didn't read any of them. Afterward she told Chris Nguyen: "Tell me the cluster, not the list."

**How to apply:**
- IncidentAgent raises ONE alert per cluster
- Cluster = (region, back-end, brand, OR time window) — whichever best explains the pattern
- Individual-location drill-down is available on `/expand` or explicit request only
- Default narrative length: 150–300 words, never 1,000

**Source:** Feedback conversation with Dana + Chris Nguyen, 2025-11-05.
**Scope:** Merchant-specific (but probably generalizable to all enterprise merchants).
**Confidence:** High — explicit merchant directive.
**Last verified:** 2026-04-14.

---

## valuelink-promo-inventory — "Check ValueLink gift card inventory before a national promo launches"

**Rule:** Before any Inspire Brands national promo involving gift cards (e.g., "buy a $50 gift card, get a $10 bonus"), verify that ValueLink has enough card stock provisioned for the expected promo lift. Running out mid-promo generates customer complaints and can't be fixed quickly.

**Why:** 2025-12-10 — "Arby's Holiday Gift Card Bonus" promo exhausted ValueLink inventory at 3 Arby's locations within the first 4 hours. Locations had to turn customers away for the rest of the day. Dana estimated lost sale: ~$18K across the 3 locations + significant reputational cost during holiday season.

**How to apply:** Two weeks before any national gift card promo:
1. Check ValueLink inventory levels at all relevant locations
2. Coordinate with ValueLink operations to provision extra stock
3. Set up a "inventory depletion" alert during the promo window
4. Chris Nguyen has the ValueLink operations contact

**Source:** 2025-12-10 Arby's holiday gift card promo post-mortem.
**Scope:** Merchant-specific and promo-specific.
**Confidence:** High.
**Last verified:** 2026-03-20.
