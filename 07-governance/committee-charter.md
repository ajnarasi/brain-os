---
document: Fiserv Brain AI Governance Committee Charter
version: v1.0
status: draft
date: 2026-04-14
owner: Ajay Narasimma (proposed committee secretary)
companion_docs:
  - 03-architecture/data-security-governance.md
  - 07-governance/white-paper.md
  - 05-prototypes/exec-brief/index.html
---

# Fiserv Brain — AI Governance Committee Charter

**Charter v1.0 · Draft for executive approval · April 2026**

---

## 1. Purpose

The **Fiserv Brain AI Governance Committee** ("the Committee") exists to ensure that the deployment of the Fiserv Brain — a per-merchant compound AI system serving Fiserv's merchant ecosystem — meets Fiserv's standards for data protection, regulatory compliance, operational risk management, and commercial integrity, without blocking the velocity required to ship a competitive product.

The Committee is the single authority for AI-specific decisions that cross business-unit boundaries. It is not a replacement for existing security, privacy, legal, or engineering review functions; it is a coordinating body that gates AI-specific decisions those functions cannot individually resolve.

---

## 2. Authority

The Committee has **decision-making authority** over:

- Approval of data flows into the Brain at Tier 1 (internal business data), Tier 2 (PCI-scoped), Tier 3 (HIPAA-scoped), and Tier 4 (cross-border regulated) per `03-architecture/data-security-governance.md` Pattern B.
- Approval of LLM vendor selection and endpoint routing for each data tier.
- Approval of production prompt changes that affect merchant-facing outputs or agentic actions.
- Approval of new agent capabilities that take financially material actions.
- Sign-off on incident response actions involving Brain-originated errors.
- Sign-off on the phased deployment sequence (dev → internal TAM pilot → internal ops pilot → closed merchant beta → general availability).

The Committee has **advisory-only authority** over:
- Product roadmap priorities for the Brain (informs but does not decide).
- Commercial pricing and packaging of the Brain as a merchant-facing SKU.

---

## 3. Membership

The Committee has nine standing members, each representing a function whose sign-off is required before the Brain can operate at scale inside Fiserv.

| Role | Function | Voting |
|---|---|:-:|
| **Chair** | Chief Product Officer (or delegate at VP-level or higher) | ✅ |
| **Vice Chair** | Chief Information Security Officer (or delegate) | ✅ |
| **Member** | GM, Merchant Services (or delegate) | ✅ |
| **Member** | GM, Clover (or delegate) | ✅ |
| **Member** | GM, Financial Institutions (or delegate) | ✅ |
| **Member** | Chief Privacy Officer (or delegate) | ✅ |
| **Member** | General Counsel, Product & Commercial (or delegate) | ✅ |
| **Member** | Chief Enterprise Risk Officer (or delegate) | ✅ |
| **Secretary** | Product lead for the Fiserv Brain initiative | Non-voting |

Observers (non-voting) may attend on invitation: Fiserv TAM leadership, Fiserv solutions-engineering leadership, internal audit, external counsel, cloud-infrastructure leadership.

---

## 4. Responsibilities

The Committee is responsible for:

1. **Approving the data classification rubric** (5 tiers, T0–T4) and maintaining it against regulatory and contractual changes.
2. **Approving production LLM routing decisions** — which model handles which tier of data under which contractual terms.
3. **Reviewing and approving every prompt change** that touches Tier 1 or higher data before it reaches production.
4. **Reviewing every P0 / P1 incident** involving the Brain within 48 hours of detection, and owning the post-mortem publication.
5. **Approving or rejecting new agent capabilities** that extend the Brain's action surface (ticket creation, fraud rule adjustment, dispute submission, settlement variance correction, etc.).
6. **Authorizing phase transitions** in the deployment sequence: sandbox → internal TAM pilot → internal ops pilot → closed merchant beta → GA.
7. **Maintaining the Committee's risk register** — adding, re-scoring, and retiring risks as the product matures.
8. **Quarterly review of LLM vendor contracts** (AWS Bedrock, Azure OpenAI, self-hosted infrastructure) for renewal, replacement, or consolidation decisions.
9. **Approving red-team findings** and tracking remediation to completion.
10. **Annual charter review** — reconfirming or amending this charter against the Brain's current state.

---

## 5. Meeting Cadence

- **Pilot phase (Phase 1 + Phase 2 internal pilots):** Weekly, 45 minutes, Thursdays 11:00–11:45 ET.
- **Beta phase (Phase 3 closed merchant beta):** Bi-weekly, 60 minutes.
- **GA phase (Phase 4 general availability):** Monthly, 60 minutes, with ad-hoc sessions for P0/P1 incidents.
- **Emergency sessions:** Convenable within 24 hours on call from the Chair, Vice Chair, or Secretary.

---

## 6. Decision-Making

Decisions require **a simple majority of voting members present**, subject to the following constraints:

- A **quorum of five voting members** (including either the Chair or Vice Chair) is required for any binding decision.
- Decisions affecting **data Tier 2 (PCI)** require the affirmative vote of the **Vice Chair (CISO)**.
- Decisions affecting **data Tier 3 (HIPAA)** require the affirmative vote of **Chief Privacy Officer**.
- Decisions involving **new LLM vendor contracts** require the affirmative vote of **General Counsel, Product & Commercial**.
- Any member may **raise a veto on data-exposure, regulatory, or reputational grounds**; vetoes suspend the decision and escalate to the CEO for resolution within 5 business days.

Decisions are recorded in a running decision log maintained by the Secretary and published to a shared location accessible to all Committee members plus designated leadership.

---

## 7. Escalation Path

| Trigger | Route |
|---|---|
| Member veto not resolved within Committee | Chair → CEO |
| P0 incident with regulatory exposure | Vice Chair + Chief Privacy Officer + General Counsel → CEO + External Counsel |
| P0 incident with customer-facing damage | Chair + GM of affected BU → CEO |
| Vendor contract dispute | General Counsel → Chief Financial Officer → CEO |
| Any situation where a member believes an approved decision creates unacceptable risk | Any member → CEO, with written dissent filed |

---

## 8. Review Cycle

This charter is reviewed and reaffirmed or amended **annually**, on the anniversary of its initial approval, or upon any of:

- A change in Fiserv's regulatory footprint (e.g., new country, new licensing category)
- A change in the Brain's deployment scope (e.g., GA launch, new vendor)
- A Committee member role change or prolonged vacancy
- A P0 incident where Committee process is identified as a contributing factor

Amendments require a **two-thirds supermajority of voting members**.

---

## 9. Signatures (required for approval)

| Role | Name | Signature | Date |
|---|---|:-:|:-:|
| Chief Executive Officer | _______________________ | ☐ | ☐ |
| Chief Product Officer (Chair) | _______________________ | ☐ | ☐ |
| Chief Information Security Officer (Vice Chair) | _______________________ | ☐ | ☐ |
| Chief Privacy Officer | _______________________ | ☐ | ☐ |
| General Counsel | _______________________ | ☐ | ☐ |

---

**End of Charter · v1.0 · April 2026**

*Next action: Secretary circulates this charter to the nine standing members for review + sign-off within 10 business days of Executive approval.*
