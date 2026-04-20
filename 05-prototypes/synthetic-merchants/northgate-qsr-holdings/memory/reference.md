---
type: reference
merchant: northgate-qsr-holdings
last_reviewed: 2026-04-14
---

# Reference memory — NorthGate QSR Holdings

## Fiserv product docs (corpus) — primary
- **IPG / Connected Commerce (Ucom)** — `corpus/01-apis/ucom-ipg.md`. **The** primary reference for NorthGate's platform. Covers hashExtended signature, Inspire Brands Carat relationship context, enterprise custom integration patterns.
- **SnapPay** — `corpus/01-apis/snappay.md`. Supplier AR/AP — relevant when Rachel or Tony asks about B2B supplier payments and the Oracle ERP Cloud integration.
- **Clover** — `corpus/01-apis/clover.md`. Not directly relevant but referenced when comparing NorthGate's enterprise IPG to franchisee groups on simpler platforms.
- **CommerceHub** — `corpus/01-apis/commercehub.md`. Referenced for comparing auth patterns (HMAC SHA256 vs. IPG's hashExtended).

## Industry standards (corpus)
- **ISO 8583** — `corpus/03-industry-standards/iso-8583.md`. Critical for decline-code interpretation in cross-location anomaly narratives. Dana's analyst language includes DE39 codes sometimes.
- **EMV / EMVCo** — `corpus/03-industry-standards/emv-emvco.md`. EMV contactless is 73% of the morning-rush tender mix (per `feedback.md#arbys-morning-rush-pattern`). Relevant when contactless reader issues come up.
- **NACHA** — `corpus/03-industry-standards/nacha.md`. Relevant for supplier AR/AP via SnapPay.
- **PCI DSS 4.0** — `corpus/03-industry-standards/pci-dss.md`. **Critical** for NorthGate — Level 1 merchant, annual audit (`proj-pci-audit-2026`).

## Fiserv context + merchant context (corpus)
- **Fiserv press releases** — `corpus/02-fiserv-general/blogs-press-releases.md`. Critically includes the Inspire Brands Carat Sep 2023 announcement and the Visa/MC agentic commerce pacts (Dec 2025). Dana reads these so she knows what Fiserv is doing at the network level.
- **Fiserv merchant issues** — `corpus/02-fiserv-general/merchant-issues.md`. Cited for understanding Fiserv's merchant retention context and the Sept 2025 securities class action — Dana tracks this as a risk factor for her contract.
- **Strategic merchants** — `corpus/04-merchant-context/strategic-merchants.md`. Parent-brand context on Inspire Brands (and also Yum!, Costco for comparative strategy).
- **Failure patterns** — `corpus/04-merchant-context/failure-patterns.md`. Chargeback reason codes + SDK failure patterns.
- **Industry risk** — `corpus/04-merchant-context/industry-risk.md`. Used for enterprise-scale benchmarking (MRC, Nilson, Datos).

## External / vendor docs (NOT in corpus — flag as research gap if needed)
- **Inspire Brands franchisee portal docs** — internal to Inspire, not public
- **Parent-brand POS documentation** — NCR Aloha, Oracle Simphony, Arby's proprietary — not in corpus; limited public docs
- **ValueLink operations runbook** — partner-operational doc, not public
- **Buypass petroleum operations docs** — limited public surface; flag for research refresh

## Fiserv-side contacts
- **Chris Nguyen** — Corp TAM, monthly with Dana, quarterly with Rachel, 24/7 on-call for P0
- **Fiserv solutions engineering (rotating)** — engaged through Chris for cert issues
- **Fiserv legal** — engaged through Chris for contract matters
- **Fiserv Carat product team** — Inspire Brands relationship is a flagship Carat account; Dana has attended 2 Fiserv advisory sessions with the Carat product team
- **Buypass operations** — only via Chris; NorthGate has no direct Buypass contact

## Internal NorthGate runbooks (synthetic — don't exist in demo)
- `runbook-super-bowl-fraud-tuning.md` — Derek owns; applied annually
- `runbook-mobile-order-rollout.md` — Tony + Janice own; used for `proj-mobile-order-rollout`
- `runbook-cross-back-end-reconciliation.md` — Tony owns; manual today, per `proj-fuel-attached-reconciliation`
- `runbook-pci-audit-evidence-collection.md` — Tony + Rachel own; annual

## Benchmarking cohort (for AnalyticsAgent)
- Cluster: **Enterprise QSR franchisee groups, 50–200 locations, multi-brand Inspire Brands portfolio, strategic Fiserv customer**
- Public benchmark source: `corpus/04-merchant-context/strategic-merchants.md` (parent brand context) + `corpus/04-merchant-context/industry-risk.md` (general industry)
- No exact comp in public data — Dana is interested in "merchants that look structurally similar" not precise benchmarks

## Language preference

**Analyst-language.** Specific numbers, regional variance, BIN-range concentration, time-series deltas, cross-location clustering. Default to tables for cross-location data. Default to bullet-pointed findings with severity ranking. Dana reads a lot of data; density beats friendliness.

## Citation style for NorthGate

Dana wants to know *specifically* where a claim comes from. Citations should be:
- **Corpus:** `corpus/<full-path>.md`
- **Memory:** `feedback memory: <rule-id>` (e.g., `feedback memory: bww-super-bowl-capacity`)
- **Transaction-level:** by MID + timestamp, not by customer name
- **Cross-location claims:** cite the cluster, then offer drill-down on request

## Freshness

- Corpus files above: collected 2026-04-14, high reliability
- Inspire Brands / parent-brand context: high-level only from public sources
- Internal runbooks + partner-operational docs: **not in corpus** — flag as research gap
