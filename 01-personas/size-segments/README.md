# Size Segments

Five tiers of merchant by Gross Processing Volume (GPV). GPV is the better axis than headcount or revenue because payments-volume drives operational complexity.

| Tier | GPV | Sophistication | Fiserv products typically | Brain model |
|---|---|---|---|---|
| **Micro-SMB** | <$1M | Owner-operator, no IT/PM | Clover Starter, basic CommerceHub | **Zero-touch.** Brain proactively alerts; takes action with minimal prompting. Free tier. |
| **SMB** | $1M–$10M | 1–10 locations, part-time ops | Clover Pro, CommerceHub, ISV-embedded | **Do-it-for-me by default, escalate on ambiguity.** $49–$99/mo/MID. |
| **Mid-Market** | $10M–$500M | 10–200 locations, light PM+IT, growing multi-channel | CommerceHub Enterprise, Carat, Optis, multiple payment products | **Co-pilot with agency.** Agents run semi-autonomously, humans approve financially material actions. $499–$1,999/mo. |
| **Enterprise** | $500M–$5B | National, full PM/IT/procurement | Carat APIs, custom CommerceHub, multiple processing relationships | **API-first.** Brain exposed as API; merchant builds it into their own ops tooling. $10K–$100K/mo. |
| **Strategic / Global** | $5B+ | Multi-region, multi-processor, public-company reporting constraints | Custom everything | **White-glove embedded.** Brain runs inside merchant's own environment; custom memory schemas; negotiated SLAs. Custom pricing. |

## How size shapes the Brain experience

- **Micro-SMB to SMB** — the Brain is a *replacement* for staff the merchant doesn't have. Agents act by default, the surface is simple (one pane in the Clover app, one widget in Fiserv portal).
- **Mid-Market** — the Brain is *leverage* for a lean team. It takes rote work off PMs and ops, surfaces issues early, and presents analytics as narratives instead of dashboards.
- **Enterprise to Global** — the Brain is a *platform primitive*. The merchant already has ops tooling; the Brain plugs into it via API, exposes memory, and acts as a specialized agent within the merchant's broader automation stack.

## Key discontinuities

- **$10M GPV** — inflection from "do-it-for-me" to "co-pilot." Below this, merchants want the Brain to act; above, they want to approve.
- **$500M GPV** — inflection from "UI-first" to "API-first." Above this, merchants have ops teams with their own tooling.
- **$5B GPV** — inflection from "Fiserv SaaS" to "customer-owned deployment." Strategic merchants won't run on shared infra.

## Per-tier detail

See `micro-smb.md`, `smb.md`, `mid-market.md`, `enterprise.md`, and `strategic-global.md`.
