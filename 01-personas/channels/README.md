# Channels — How Merchants Reach Fiserv

**The differentiating axis.** Most payments-AI products are built for direct-channel merchants only (Stripe's model). Fiserv's structural advantage is that its merchants arrive through eight distinct channels, each with different onboarding, support ownership, commercial relationship, data access, and trust model. A channel-blind Brain will fail for ~70% of Fiserv's merchant base.

## The eight channels

| # | Channel | Typical volume share | Who owns the merchant relationship | Who pays for the Brain |
|---|---|---|---|---|
| 1 | **Direct sales** | ~15% | Fiserv | Merchant or Fiserv (bundled) |
| 2 | **Bank partners (FI channel)** | ~30% | Partner bank | Bank (revenue-share with Fiserv) |
| 3 | **ISOs / agent networks** | ~10% | ISO | ISO (rev-share) or merchant direct |
| 4 | **ISVs (integrated payments)** | ~25% | ISV (Clover, 3rd-party ISVs) | ISV (rev-share) or Fiserv (bundled with platform) |
| 5 | **PayFacs / PSPs** | ~8% | PayFac | PayFac (API-based) |
| 6 | **Marketplaces / platforms** | ~5% | Platform | Platform (bundled) |
| 7 | **Referral / wholesale** | ~4% | Varies | Merchant direct |
| 8 | **Franchise / master merchants** | ~3% | Franchisor / master merchant | Master (bundled to locations) |

Share percentages are illustrative — actual shares vary by product line. The point is that **no single channel is a majority**, so the Brain has to work for all of them from day 1.

## Channel determines 4 things about the Brain

### 1. Surface (where the Brain appears)
- Direct → Fiserv merchant portal + Clover app
- Bank → white-labeled inside the bank's merchant portal (Fiserv is invisible to the end merchant)
- ISV → embedded inside the ISV's UX (a "Brain" tab in Shopify, a section in a vertical SaaS tool)
- PayFac → API-only; the PayFac builds the UX
- Marketplace / franchise → embedded in the corporate dashboard, rolled up from location level

### 2. Data access (what the Brain can see)
- Direct + Clover → full txn, dispute, settlement, TAM notes, KB access
- Bank → restricted by partner agreement; typically txn + dispute + settlement, limited TAM access, no cross-merchant benchmarking without explicit consent
- ISV → full txn access usually; limited merchant-CRM access (the ISV owns the CRM)
- ISO → varies by ISO agreement; often txn-only
- PayFac → full access to the PayFac's book; the PayFac's sub-merchants are a different data-access question entirely
- Marketplace → full access, but sub-merchant data is platform-mediated
- Referral / franchise → full access (the merchant is usually a direct Fiserv merchant routed through the referrer)

### 3. Commercial model (who pays)
- Direct → merchant or bundled into Fiserv ARR
- Bank → bank pays rev-share to Fiserv; bank decides whether to mark it up to the merchant
- ISV → rev-share or platform-bundled
- ISO → ISO pays rev-share (residuals model); merchant usually doesn't see a separate line item
- PayFac → API consumption pricing
- Marketplace → platform-bundled into the platform's merchant contract
- Referral → merchant-direct
- Franchise → master merchant bundles to locations

### 4. Trust / branding (who the merchant thinks is talking to them)
- Direct + Clover → Fiserv-branded (or Clover-branded)
- Bank → **bank-branded** (Fiserv invisible)
- ISV → **ISV-branded** (may be co-branded with Fiserv)
- ISO → co-branded or ISO-branded
- PayFac → invisible (it's the PayFac's product)
- Marketplace → marketplace-branded
- Referral → Fiserv-branded
- Franchise → usually Fiserv-branded or master-branded

## Why this axis kills naive competitors

A generic payments-AI tool can ship a direct-channel product in weeks. It takes 18–36 months to negotiate bank-channel data-sharing agreements, build white-label infra, earn ISV trust enough to embed, and satisfy PayFac API requirements. Fiserv has all of this already — the Brain just needs to plug into it.

## Per-channel detail

See: `direct-sales.md`, `bank-partners.md`, `isos-agents.md`, `isvs-integrated-payments.md`, `payfacs-psps.md`, `marketplaces-platforms.md`, `referral-and-wholesale.md`, `franchise-master-merchants.md`.

## Channel-memory extension to Karpathy's model

The base memory types (user, feedback, project, reference) don't capture the channel relationship. Proposal: add a **5th memory type = "partner memory"** that captures the channel relationship — who owns the merchant, which data is restricted, which surface to use, which TAM to route to. The Brain loads partner memory at session start alongside the merchant's own memory. Open question for architecture design.
