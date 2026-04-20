# MVP Scope — Two Parallel Pilots

A single-vertical MVP can't validate the category thesis because the thesis is that the Brain works *across* channels and segments. So the MVP is two parallel thin slices. If both land, the category is real. If one lands, the product is real but the category is TBD. If neither lands, kill it.

## Slice A — Mid-Market Fashion Brand (Value Pilot)

**Thesis:** Mid-market merchants will pay real money if the Brain demonstrably lifts conversion and cuts dispute handling time.

### Target segment
- **Size:** Mid-Market ($10M–$500M GPV)
- **Vertical:** Retail & Commerce / Fashion & Apparel
- **Channel:** Direct CommerceHub + ISV (Shopify, BigCommerce via Carat)
- **Business model:** Omnichannel + D2C (often + B2B wholesale)
- **Number of pilots:** 3 merchants
- **Pilot duration:** 120 days

### Phases covered
- Full Integrate phase (for net-new merchants onboarding during pilot window)
- Full Go-Live phase
- Operate phase (thin — ticket deflection + weekly analytics narratives + BFCM launch brain)

### Agents shipped
- DocsAgent
- IntegrationAgent
- SandboxAgent
- LaunchAgent + AnomalyAgent + FraudTuningAgent
- TicketAgent + AnalyticsAgent + DisputeAgent
- **APMAgent** (leverages the existing APM Checkout SDK work in the parent `APM/` folder — this is where that work plugs in)

### Killer demo
**BFCM launch brain.** Merchant onboards in August, launches a new APM in October, BFCM hits in November. Brain runs the integration, watches the launch, then operates as a launch brain through BFCM — anomaly detection, auth rate alerts, APM-per-geo guidance, daily analytics narrative through the peak.

### Success metrics
- **30% lift** in approval rate during pilot window (vs. pre-pilot baseline)
- **50% reduction** in dispute handling time (hours per dispute)
- **40% reduction** in integration support tickets
- **NPS ≥50** at day 90

### Commercial model
- Free during pilot
- Intended pricing post-pilot: Business tier ($499–$1,999/mo) per merchant

### Data access
Full — direct CommerceHub merchants.

### Surface
- Primary: Fiserv merchant portal (Brain as a new tab)
- Secondary: Slack connector for the merchant's ops team

---

## Slice B — Clover-Native SMB Restaurant (Distribution Pilot)

**Thesis:** Zero-CAC distribution via Clover App Market can prove the ISV-channel thesis and validate that SMB merchants will adopt the Brain if it's embedded in tooling they already use.

### Target segment
- **Size:** SMB ($1M–$10M GPV, typically 1–5 locations)
- **Vertical:** Restaurant & Food (full-service or fast casual)
- **Channel:** ISV (Clover App Market)
- **Business model:** B2C card-present + delivery aggregator integration
- **Number of pilots:** 25 merchants (via Clover app install)
- **Pilot duration:** 90 days

### Phases covered
- **Operate phase primarily** (the pilot merchants are already live on Clover)
- Light Integrate for add-on products (e.g., enabling a new payment method mid-pilot)

### Agents shipped
- DocsAgent (Clover-scoped)
- TicketAgent (Clover ops flow)
- **DailyCloseAgent** (restaurant-specific — daily close narrative)
- DisputeAgent (chargeback defense for delivery-partner disputes)
- **TipReconciliationAgent** (restaurant-specific — tip handling)
- IncidentAgent
- AnalyticsAgent (shift-level)

### Killer demo
**The daily close brain.** Owner closes up at 11pm, opens the Clover app, clicks "Brain" — gets a plain-English summary: "Today: $4,200 in sales, 87 transactions, 12% higher than last Tuesday. Tips averaged 18%. One chargeback from DoorDash — I drafted the response, review it here. Tomorrow's forecast based on weather + your history: ~$3,800. Note: your fraud rule blocked 2 legitimate-looking transactions this afternoon; want me to relax it?"

### Success metrics
- **40% ticket deflection** (Clover tier-1 support → Brain)
- **20% faster daily close** (from owner time-on-task reduction)
- **NPS ≥50** at day 60
- **App-market install rate** (% of eligible merchants who install after seeing it)

### Commercial model
- Free during pilot
- Intended pricing post-pilot: Pro tier ($49–$99/mo) — bundled into Clover app marketplace for rev-share

### Data access
Full — Clover is a Fiserv ISV surface.

### Surface
- Primary: Clover app (dedicated Brain tab)
- Secondary: Optional email digest of the daily close narrative

---

## Shared infrastructure (built once, used by both slices)

- Per-merchant memory store (5 memory types)
- Ingestion layer connected to CommerceHub + Clover + dispute system + settlement system
- Retrieval / RAG layer
- Orchestration layer with channel-aware routing
- Compliance overlay (PCI; healthcare not in scope for v1)

## Out of scope for v1

- All other size segments (micro, enterprise, strategic)
- All other channels besides direct + Clover ISV (bank, ISO, PayFac, marketplace, etc. — v2+)
- All other verticals besides Retail/Fashion and Restaurant/Food
- Agentic execution beyond draft-and-approve (no fully autonomous actions in v1)
- Multi-region, non-US merchants
- Strategic global custom deployments

## Validation criteria

At day 120 (end of Slice A) and day 90 (end of Slice B):

- **Both slices hit success metrics** → thesis validated; fund Year 2 build-out at full scale
- **Only Slice A hits** → value is real but distribution is TBD; focus on direct + mid-market, deprioritize ISV push
- **Only Slice B hits** → distribution works but monetization is TBD; go deeper on Clover app-market before expanding
- **Neither hits** → kill it; don't re-scope to a third pilot hoping for better results

## Stretch: Slice C — Bank-Channel Community Bank SMB Cohort

**Only activated if Slices A and B land.** Proves the white-label / FI-channel thesis, which is the single largest untapped axis in Fiserv's distribution. One partner community bank, co-brand Brain deployment to 50–100 of their SMB merchants (mixed verticals), 90-day pilot. Success = signed multi-year co-brand deal with the bank.

---

## V2 Prize: Slice D — IPG (Ucom) Strategic-QSR Pilot

**Not in v1. First real V2 target.** The single largest potential revenue line in Fiserv's book. Proves that the Brain can serve Fiserv's enterprise / strategic customers, not just SMB and mid-market.

### Target segment
- **Size:** Strategic / Global ($5B+ GPV)
- **Channel:** Direct (Fiserv corporate sales) + Franchise hierarchy underneath
- **Vertical:** Restaurant-QSR (or Retail-Big-Box)
- **Business model:** B2C card-present + growing omnichannel (mobile app, drive-thru, kiosk, loyalty)
- **Platform:** **IPG (Ucom)** front-end over **Nashville** primary back-end; **Buypass** for fuel-attached locations; **STAR/NYCE** for PIN debit; **ValueLink** for gift/loyalty; **TeleCheck** in grocery contexts
- **Candidate merchants:** Inspire Brands (single sub-brand like Arby's), Yum! Brands (single sub-brand like Taco Bell), Dunkin', Costco
- **Pilot size:** 1 corporate brand, 120 days, scoped to a single region
- **Pilot duration:** 120 days

### What's different about an IPG pilot

- **No autonomous action.** Corporate change-control is absolute. The Brain is narrative + leverage, never actor.
- **Hierarchical memory required.** Corporate → Region → District → Location, with different Brain views per level.
- **Multi-back-end ingestion required.** Must reconcile Nashville + (Buypass for fuel where applicable) + STAR/NYCE + ValueLink.
- **Custom integration work.** No canned boarding flow.
- **Longer sales cycle.** 6–18 months just to begin the pilot.

### Killer demo
**The corporate payments exec review.** A lean central payments team at a thousand-plus-location QSR walks into a weekly exec review with: "Here's what changed across our full brand this week. Here are the 12 locations driving most of our chargeback spend. Here are the 3 regional issues driving our auth rate dip and the probable causes. Here's the hour I caught an incident before our NOC did." That's the ROI pitch — the Brain is the analyst the lean central team doesn't have.

### Success metrics
- Corporate payments team saves **≥10 hours/week** of analyst work
- Brain catches **≥1 material incident** before corporate's own NOC does
- **≥3 regional optimization suggestions** implemented by corporate
- Post-pilot commercial conversation progresses to multi-brand rollout (same parent company)

### Commercial model
Custom enterprise pricing — $50K–$250K/month per corporate brand, negotiated per deal. Payback expected in analyst-time savings alone.

### Data access
Full at corporate level, subject to strict change-control and audit requirements. Location-level data access driven by corporate policy (franchisee privacy considerations).

### Surface
Enterprise admin portal embedded in corporate's own payments tooling, plus API access for corporate's own ops automation. **No consumer-grade UI** — IPG merchants already have bespoke admin surfaces.

### Sequencing
- Month 0–6: Sales cycle, legal, data-access scoping
- Month 6–9: Custom integration + ingestion setup (Nashville + specialty back-ends as needed)
- Month 9–13: 120-day pilot
- Month 13+: Commercial conversation on full-brand or parent-company rollout

Slice D is the "prize" that justifies building the multi-back-end ingestion layer and the hierarchical memory model in V2.

## Resources needed (rough order of magnitude)

- 1 PM (Ajay, part-time for the pitch; full-time if the pitch lands)
- 3–4 engineers (1 Brain platform, 2 agent/integration, 1 UX/surface)
- 1 data engineer for ingestion
- 1 designer for the merchant-facing surfaces
- Fiserv internal: 1 TAM per pilot merchant, legal review for data-access scopes, compliance review for PCI handling
- Cloud infra + LLM API budget: ~$50K/month for pilot cohort of ~30 merchants (dominated by LLM, falls fast with per-merchant memory warming)
