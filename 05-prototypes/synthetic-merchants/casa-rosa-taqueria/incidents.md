---
merchant: casa-rosa-taqueria
file_type: synthetic_incidents
count: 3
source_type: "synthetic-demo-data"
---

# Historical incidents — Casa Rosa Taqueria

---

## dd-chargeback-streak-2025 — "Q2 2025 DoorDash chargeback streak"

**Severity:** P1 (high — financial impact)
**Date:** 2025-04-15 to 2025-06-20 (2-month window)
**Impact:** 8 DoorDash-originated chargebacks across 3 locations; ~$310 in contested charges; ~4 hours of Luis's time
**Status:** Resolved 2025-07-01 (post-mortem + template locked in)

### Narrative

Over a 2-month period in Q2 2025, Casa Rosa received 8 DoorDash-originated chargebacks under "item not received" / "order did not arrive." At the time, Luis was handling disputes ad-hoc with generic "we delivered the food to the DoorDash driver" responses — winning some, losing others, with no clear pattern.

In July 2025 post-mortem, Luis discovered that the 6 wins all had GPS pickup + GPS delivery data pulled from the DoorDash Drive Clover app, and the 2 losses didn't (one driver had forgotten to confirm delivery in the app; one driver had poor GPS signal at the delivery location). The pattern was **not** about the food or the restaurant — it was entirely about whether evidence could be attached.

### Root cause
- **Primary:** No standardized dispute template with GPS evidence requirement
- **Contributing:** Luis wasn't pulling DoorDash Drive data consistently — sometimes forgot, sometimes didn't know it was available

### Resolution
1. Standardized dispute template: always attach GPS pickup + GPS delivery + order-release timestamp (2025-07-01)
2. Feedback memory entry created: `feedback.md#doordash-not-received-template`
3. Luis added "pull GPS data first" to his dispute-response SOP

### Cited feedback memory
- `feedback.md#doordash-not-received-template`

### Lessons for the Brain
DisputeAgent should proactively pull GPS pickup + delivery data from DoorDash Drive integration whenever a "not received" chargeback comes in. The win rate is so stark (100% with GPS, 0% without) that this isn't a template — it's a rule.

---

## tip-discrepancy-nov-2025 — "Tip reporting discrepancy across locations"

**Severity:** P2 (medium — reconciliation only, no customer impact)
**Date:** 2025-11-08 (detected) → 2025-11-20 (resolved)
**Impact:** ~$480 phantom double-counting across aggregate reports; ~6 hours of reconciliation work
**Status:** Resolved 2025-11-20

### Narrative

In early November 2025, Maria noticed that the aggregate tip totals in Clover's parent-MID report didn't match what servers had reported at end-of-shift. The discrepancy was ~$480 over the first week of November, always in the direction of the aggregate report showing *more* tips than the per-location reports summed to.

Investigation over 2 weeks found the pattern: when a server from one location covered a shift at another location (which happens regularly at Casa Rosa because the 3 locations share some staff during slow periods), the tip for that server was recorded at the **clocked-in location** in the server-report but rolled up to the **scheduled location** in the parent-MID aggregate. The discrepancy was essentially double-counting across the two reporting paths.

### Root cause
- **Primary:** Parent-MID aggregate rollup logic didn't match per-location POS reporting when shifts crossed locations
- **Contributing:** Maria had been using the parent-MID report as the single source of truth without realizing it diverged from the per-location view

### Resolution
1. Maria switched to **per-location reconciliation** as the primary close-out method (2025-11-20)
2. Parent-MID report relegated to "reference only" status
3. Feedback memory entry created: `feedback.md#tip-reconciliation-by-location`
4. Luis and Maria did a retroactive 3-month reconciliation to unwind prior phantom double-counting (~$1,400 net adjustment)

### Cited feedback memory
- `feedback.md#tip-reconciliation-by-location`

### Lessons for the Brain
AnalyticsAgent's daily close narrative must **always** show tips per location, not as aggregate. If Maria asks for aggregate, compute it separately but start with per-location. This is the single most important rule for the close-out narrative.

---

## flex-offline-friday-rush — "East Austin Flex unit offline during Friday dinner rush"

**Severity:** P1 (high — active customer impact)
**Date:** 2025-08-22, 18:45 CT → 18:51 CT (6-minute window)
**Impact:** 2 tables walked out without paying, ~$180 in lost sale + reputation cost
**Status:** Resolved same-day; prevention added to checklist

### Narrative

On Friday 2025-08-22 at 18:45 CT (peak dinner rush), one of the Clover Flex units at East Austin froze during a server's attempt to process a $78 table bill. The server pressed power to reboot, which took the unit offline for 6 minutes while it restarted and reconnected to the Clover server.

During those 6 minutes, two tables that had been waiting to pay got impatient. One paid cash to the manager (minus tip). One walked out without paying after ~5 minutes of waiting (a "dine-and-dash," though not intentional — the customer had left cash on the table that the server didn't see initially).

The Flex unit had shown battery warnings earlier in the afternoon but Javier had planned to reboot it after the dinner rush ended — exactly the wrong order of operations.

### Root cause
- **Primary:** Flex unit rebooted during service (worst possible time)
- **Contributing:** No pre-shift Flex health check in the opening/pre-service runbook
- **Contributing:** Battery warnings had been showing for hours and no one acted on them

### Resolution
1. Pre-shift Flex health check added to Maria's opening runbook (2025-08-25)
2. Any unit with battery or latency warnings is rebooted **before 16:30 CT** (well before dinner rush starts at 17:30 CT)
3. Feedback memory entry created: `feedback.md#friday-dinner-rush-terminal-reboot`
4. Javier briefed on the rule in the next staff meeting

### Cited feedback memory
- `feedback.md#friday-dinner-rush-terminal-reboot`

### Lessons for the Brain
IncidentAgent should watch for: (1) terminal health telemetry during service windows, (2) any reboot event during dinner rush (17:30–21:30 CT). If a unit is showing signs of slowness or battery issues in the afternoon, the Brain should proactively suggest a reboot before 16:30 CT — don't wait for the terminal to fail during service.
