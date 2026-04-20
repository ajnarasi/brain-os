# Memory Schema

The five memory types the Brain maintains per merchant, plus the schema for each. Extends Karpathy's 4-type model with a 5th type (partner memory) specific to Fiserv's multi-channel, multi-platform reality.

## The 5 types

### 1. User memory (`memory/user.md`)
Durable facts about the merchant and the humans operating it.

**Shape:**
- Legal entity + DBA
- MIDs (synthetic in demo)
- MCC + secondary MCCs
- Countries + currencies
- Product stack: Fiserv products enabled, third-party tools
- Roles: DRI dev, DRI ops, finance lead, TAM, escalation contact
- Preferences: alerting cadence, risk tolerance, settlement pref, reporting format, tone
- Contract tier (referenced not stored)

**Freshness:** Stable. Review quarterly or on event (contract renewal, MID change).

### 2. Feedback memory (`memory/feedback.md`)
Lessons learned from prior interactions — the "we tried X, it failed because Y, the fix is Z" layer.

**Entry shape** (structured bullets or short blocks):
- **Rule** — the lesson (one sentence)
- **Why** — the reason (often a past incident)
- **How to apply** — when this kicks in
- **Source** — conversation, incident, or ticket it came from
- **Scope** — merchant-specific / cluster-specific / global
- **Confidence** — based on repeat confirmations

**Freshness:** Marked stale if no confirmation in 90 days; revalidated before use.

### 3. Project memory (`memory/project.md`)
In-flight initiatives with explicit expiry dates.

**Entry shape:**
- **Project** — short name
- **Why** — motivation
- **Status** — current state
- **Deadline / target date**
- **Blockers**
- **Owner (merchant-side)**

**Freshness:** High decay rate. Auto-archive after completion; flag stale entries on retrieval.

### 4. Reference memory (`memory/reference.md`)
Pointers to external resources the Brain should consult.

**Entry shape:**
- **Resource name**
- **Location** (URL or corpus path)
- **When to use**
- **Last verified**

**Freshness:** Links checked periodically; stale links flagged.

### 5. Partner memory (`memory/partner.md`) — Fiserv-specific
The channel + platform relationship.

**Entry shape:**
- **Channel** — direct / bank / ISO / ISV / PayFac / marketplace / referral / franchise
- **Partner entity** — specific bank, ISV, ISO, PayFac, or franchisor name
- **Front-end platform** — Clover / CommerceHub / IPG-Ucom / Carat / Optis / etc.
- **Back-end platforms** — Nashville / Omaha / Buypass / STAR-NYCE / TeleCheck / ValueLink (can be multiple per merchant)
- **Support routing** — who is first line (Fiserv TAM, bank, ISO, ISV, merchant's own team)
- **Data-access constraints** — what the Brain is/isn't allowed to see
- **Branding** — Fiserv-branded / partner-branded / white-label
- **Commercial** — who pays (merchant, partner, bundled)

**Freshness:** Event-driven — changes on channel change or contract amendment.

## Memory hydration order (at session start)

1. **Partner memory** — sets channel + platform context. Drives everything else.
2. **User memory** — who this merchant is.
3. **Most recently touched project memory** entries.
4. **Feedback memory** entries relevant to the current topic (retrieved on-demand, not all loaded at once).
5. **Reference memory** — lazily, on retrieval.

Total hydration budget for a fast session: ~10K tokens. Deep sessions: up to ~50K.

## Write-back policy

- Agents draft candidate memory entries after substantive interactions
- Drafts are shown to the merchant for approval before persistence
- Approved entries are appended to the relevant memory file
- Rejections are logged (so the Brain doesn't re-suggest the same rejected rule)
- No silent writes

## What NOT to store in memory

- PAN, CVV, any regulated identifiers (never — use tokens)
- Live transaction data (query instead)
- Current fraud rules (query instead)
- Conversation-local state (that's session state, not memory)
- Anything the merchant explicitly marked "don't remember this"

## Freshness decay per type

| Type | Decay rate | Volatility |
|---|---|---|
| User | Low | Stable |
| Feedback | Medium | Moderate (rules get outdated) |
| Project | High | In-flight by definition |
| Reference | Low | Stable; links rot over time |
| Partner | Low | Event-driven changes only |

At retrieval time, every memory entry is scored on age × volatility × consequence-of-acting. If the score exceeds a threshold, the Brain must re-verify before using the memory.
