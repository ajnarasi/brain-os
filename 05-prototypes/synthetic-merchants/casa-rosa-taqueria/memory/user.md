---
type: user
merchant: casa-rosa-taqueria
last_reviewed: 2026-04-14
---

# User memory — Casa Rosa Taqueria

## Entity
- Legal: Casa Rosa Taqueria LLC (Texas LLC)
- DBA: Casa Rosa
- Locations: 3 (East Austin, South Congress, North Loop)
- Primary Clover MID: `CLVR-CR-001`
- Location-specific merchant IDs: `CLVR-CR-EA` (East Austin), `CLVR-CR-SC` (South Congress), `CLVR-CR-NL` (North Loop)
- MCC: **5812** — Eating Places, Restaurants
- Countries: US only (Texas only)
- Owner name on file: Maria Delgado
- EIN: synthetic `XX-XXXXXXX`

## Product stack
- **Clover Pro** + **Clover Restaurant** bundle
- **Clover Flex** (handheld tablets for server-forward ordering) — 8 units total across 3 locations
- **Clover Mini** (counter terminals) — 1 per location
- **Clover KDS** (kitchen display)
- **Clover Online Ordering**
- **Clover Inventory** (basic)
- Clover App Market apps installed:
  - **Tip Free** (tip handling + reconciliation)
  - **Time Clock** (employee clock-in/out)
  - **DoorDash Drive** (direct DoorDash integration)
  - **Uber Eats Connect**
  - **Grubhub Marketplace**
- **Gusto** (payroll, outside Clover)

## Roles (DRIs)

| Role | Name | Responsibilities | Session scope |
|---|---|---|---|
| Owner | Maria Delgado | Everything. Close-out, reconciliation, escalation, hiring | Everything, short and direct |
| Ops (PT) / son | Luis Delgado | Scheduling, loyalty project, delivery aggregator ops | Technical side when relevant |
| Head cook | Javier Ruiz | East Austin operations; kitchen + basic POS questions | Kitchen-side only |
| GM | Elena Moreno | South Congress day-to-day | Location-specific |

When the Brain session identifies Maria as the user (the default), keep tone short, direct, and owner-friendly. When Luis is the user, technical detail is fine.

## Preferences

- **Alerting cadence:** Daily close narrative delivered at end-of-day (around 22:00–23:00 CT when last transaction processes). Incident alerts immediately only for P0 (terminal down, settlement missing). No marketing-optimization narratives.
- **Tone:** **Short. Plain. Owner-language.** Never "per ISO 8583 DE39 response code" — just "the card was declined."
- **Risk tolerance:** Medium — Maria will tolerate some false positives but not at the cost of turning away a paying customer during dinner rush.
- **Settlement preference:** Daily settlement, same account. She watches it every morning with her coffee.
- **Reporting format:** Daily close narrative is the main surface. Weekly and monthly are optional and she rarely reads them unless something is wrong.
- **Do-not-contact windows:** No alerts during dinner service (17:30–21:30 CT) unless P0. Maria is on the floor during those hours and can't look at her phone.

## Contract
- **Tier:** Clover Pro + Restaurant bundle
- **Term:** Month-to-month, auto-renewing
- **Hardware:** Leased through Clover Capital (Flex units and Minis)

## Platform notes

See `partner.md` for full channel + platform. Short version: **Clover ISV channel (effectively direct since Fiserv owns Clover)**, Clover → Nashville back-end, STAR/NYCE for PIN debit. No Buypass, TeleCheck, ValueLink, or Omaha exposure.
