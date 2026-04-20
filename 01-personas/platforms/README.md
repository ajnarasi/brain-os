# Axis 5 — Fiserv Platform

The fifth segmentation axis. Orthogonal to Size, Channel, Vertical, and Business Model. Captures **which Fiserv product stack a merchant actually runs on** — which is not the same thing as how they got to Fiserv (Channel) or what they sell (Vertical).

A Yum! Brands corporate merchant can be: Strategic Global / Direct (+ Franchise hierarchy) / Restaurant-QSR / B2C+Omnichannel — **and** run on IPG (front-end) over Nashville (back-end), with fuel-attached locations additionally touching Buypass. A Clover SMB restaurant is also Restaurant/B2C but runs on an entirely different platform stack (Clover over Nashville). Same vertical, same business model, wildly different Brain integration.

## Two tiers of platform

Fiserv's product stack is really **two layers**:

1. **Front-end commerce platforms** — what the merchant interacts with directly. POS software, e-com/omnichannel stacks, admin portals, developer APIs. This is where the merchant's integration effort and operational experience lives.
2. **Back-end authorization / clearing platforms** — the processing pipes underneath. Where ISO 8583 messages flow, where authorization decisions are made, where settlement files originate. The merchant never sees these directly, but they determine what telemetry the Brain can ingest and how fast.

The two tiers are often loosely coupled — the same front-end can sit on top of multiple back-ends depending on merchant legacy, and the same back-end serves many front-ends.

## Front-end commerce platforms

| Platform | Typical merchant segment | Notes |
|---|---|---|
| **Clover** | Micro-SMB to SMB, card-present + light e-com | SMB-first POS; Clover App Market for distribution |
| **CommerceHub** | Mid-market to enterprise omnichannel / e-com | Unified commerce, BFCM scale, APM orchestration |
| **IPG (Ucom)** | **Strategic / enterprise QSR and big-box retail** | Powers Yum! Brands, Dunkin', Inspire Brands, Costco; custom, high-volume, card-present dominant |
| **Carat** | Enterprise API / operating-system customers | API-first; used by platforms, marketplaces, large enterprises building their own commerce |
| **Optis** | Legacy enterprise (being migrated) | Older platform; some merchants still on it while migration is in flight |
| **Payeezy** | Developer / SMB gateway | Simpler integration surface for developer-led SMB e-com |
| **AccessOne** | Healthcare payments | Healthcare-specific payment + billing platform |

See `front-end/` for per-platform docs.

## Back-end authorization / clearing platforms

| Platform | Role | Volume share | Notes |
|---|---|---|---|
| **Nashville (North)** | Primary authorization + clearing | Vast majority of Fiserv merchant txn volume | First Data's legacy "North" platform; custom ISO 8583 dialect |
| **Omaha (South)** | Secondary authorization + clearing | Smaller and shrinking | First Data "South" platform; "South Oceans" is an internal shorthand; merchants consolidating toward Nashville |
| **Buypass** | Petroleum / c-store / fleet fuel authorization | Specialty, high volume in fuel MCCs | EMV pump support; Voyager/WEX/Fuelman fleet card routing |
| **STAR / NYCE / Accel** | PIN debit networks (Fiserv-owned) | Significant for debit-heavy merchants | Different auth path from signature debit; PINless debit capabilities |
| **TeleCheck** | Check authorization + verification | Specific verticals (grocery, big-box) | Still material in some segments |
| **ValueLink** | Gift card authorization + settlement | Specialty | Closed-loop and open-loop gift cards |
| **Cardnet** | Legacy international | Small | Limited ongoing investment |

See `back-end/` for per-platform docs.

## Cross-axis matrix (front-end × back-end typical pairings)

| Front-end | Nashville (N) | Omaha (S) | Buypass | STAR/NYCE | TeleCheck | ValueLink |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Clover | ✅ default | rare | — | ✅ PIN | — | ✅ |
| CommerceHub | ✅ default | some legacy | — | ✅ PIN | ✅ | ✅ |
| IPG (Ucom) | ✅ default | rare | ✅ fuel locations | ✅ PIN | ✅ grocery | ✅ |
| Carat | ✅ mostly | some | — | ✅ PIN | — | ✅ |
| Optis | some | ✅ legacy | — | ✅ PIN | — | — |

*Pairings vary per merchant history; this matrix is the common case, not a rule.*

## Why the Brain must be platform-aware

1. **Ingestion differs per back-end.** Nashville's ISO 8583 dialect is not the same as Omaha's. Buypass has petroleum-specific DE extensions. The Brain must parse each correctly.
2. **Agents differ per front-end.** Clover has its App Market surface; IPG has a custom admin for enterprise QSR; CommerceHub has a unified-commerce portal. The same agent capability ("read today's sales") is a totally different implementation on each.
3. **Failure modes differ.** Integration failure modes on IPG (custom enterprise integrations, complex cert cycles) are different from Clover (app-market sandbox → certify → publish).
4. **Data latency differs.** Nashville near-real-time; some legacy back-ends are batch-only; Buypass settlement cycles are fuel-specific.
5. **Trust / H-I-L gates differ.** A Yum! Brands corporate merchant running on IPG will have strict change-control processes; the Brain can't autonomously change fraud rules across 7,000 Taco Bell locations without corporate approval.

## How platform interacts with the other axes

- **Channel × Platform:** most IPG merchants are Direct channel; most Clover merchants are ISV channel; bank-channel merchants can be on Clover, CommerceHub, or IPG depending on the bank's arrangement.
- **Size × Platform:** Micro-SMB→SMB mostly on Clover; Mid-market on CommerceHub or Carat; Enterprise/Strategic on IPG, Carat, or custom.
- **Vertical × Platform:** Restaurant-QSR splits sharply — SMB goes to Clover, strategic goes to IPG; Retail is mostly CommerceHub; Healthcare often on AccessOne.
- **Business-model × Platform:** Omnichannel is mostly CommerceHub + Carat; pure card-present SMB is Clover; card-present enterprise is IPG.

## Memory implications

The Brain's memory schema must include platform as a first-class field in user memory (who this merchant is) and must load platform-specific ingestion parsers, agent loadouts, and surface configurations at session start. A "partner memory" entry captures the channel relationship; a new **"platform memory"** sub-type captures the front-end + back-end stack specifics. Proposed as an extension to the 5-type memory model in `../../03-architecture/memory-layers.md`.
