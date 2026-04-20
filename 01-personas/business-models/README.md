# Business Models

Business model is orthogonal to size, channel, and vertical. A mid-market fashion brand (mid-market / ISV+direct / Retail & Commerce) could simultaneously be pure D2C, omnichannel, **and** B2B wholesale — three different business models inside one legal entity, each with its own operational pattern.

The Brain must know which business models a merchant operates, because the memory schema, agent loadout, and analytics narratives all change.

## The six models

### 1. B2C / D2C
Card-present POS, e-commerce, or omnichannel retail selling to end consumers. Classic retail shape.
- **Data:** POS txns, e-com orders, returns
- **Brain cares about:** fraud, returns, checkout optimization, APM coverage per geography
- **Memory schema:** Merchant → Store / Site → Terminal / Session → Transaction → (Customer?)

### 2. B2B invoice-based
Selling to other businesses, usually with NET terms, ACH, Level 2/3 card data, purchasing-card acceptance, AR integration.
- **Data:** ERP (SAP, NetSuite, Dynamics), AR system, purchasing card interchange tables
- **Brain cares about:** Level 2/3 data enrichment, NET-terms dunning, interchange optimization, AR reconciliation
- **Memory schema:** Merchant → Customer-Business → Invoice → Payment → PO-reference

### 3. B2B2C marketplace / platform
Sub-merchant-facilitated payments. Think Uber, DoorDash, Etsy — the platform accepts the payment on behalf of a sub-merchant and splits the funds.
- **Data:** Sub-merchant KYC, split instructions, 1099-K data
- **Brain cares about:** sub-merchant onboarding, split-payment correctness, 1099-K reporting, MATCH-list risk propagation
- **Memory schema:** Platform → Sub-merchant (with its own memory subtree) → Transaction → Split

### 4. Subscription / recurring
Recurring billing with dunning, account-updater, churn analytics. Includes SaaS, streaming, membership, subscription boxes.
- **Data:** Subscription billing system, account-updater feed, churn events
- **Brain cares about:** dunning optimization, account-updater orchestration, churn narratives, MRR analytics
- **Memory schema:** Merchant → Subscriber → Subscription → Billing-cycle → Event (charge / decline / update)

### 5. Omnichannel / unified commerce
Merchant operates both card-present and card-not-present, and the two are linked (BOPIS, ship-from-store, tokenized loyalty, unified returns).
- **Data:** Unified order system, tokenization vault, loyalty system
- **Brain cares about:** channel reconciliation, token interoperability, cross-channel fraud, BOPIS ops
- **Memory schema:** Merchant → Customer (persistent token) → Order → Fulfillment (multi-channel)

### 6. MOTO / CNP
Mail order / phone order, IVR payments, call-center payments. Older business model but still large in B2B services, debt collection, govt, and some healthcare.
- **Data:** Call center systems, IVR logs
- **Brain cares about:** PCI scope (voice), agent-assisted dispute, IVR decline handling
- **Memory schema:** Merchant → Agent → Call → Payment-attempt

## Composition

Most real merchants operate 2–3 models simultaneously:
- Mid-market fashion brand: D2C + Omnichannel + B2B wholesale
- Clover restaurant: D2C (card-present) + possibly Subscription (if loyalty membership)
- Community bank SMB cohort: usually D2C only
- Enterprise healthcare system: B2B invoice (to insurers) + D2C (copays) + MOTO (phone payments)

The Brain loads the agents and memory schemas for *all* applicable business models, not just the primary one.

## Per-model detail

See `b2c-dtc.md`, `b2b-invoice.md`, `b2b2c-marketplace.md`, `subscription-recurring.md`, `omnichannel.md`, `moto-cnp.md`.
