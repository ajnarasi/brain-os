# Vertical: Healthcare

Sub-verticals: dental practices, veterinary, medical clinics, hospitals, urgent care, pharmacy, optometry, mental/behavioral health, telehealth, DME (durable medical equipment), medical devices.

## Characteristic pain
HIPAA constraints on data handling, HSA/FSA card acceptance and workflow, insurance adjudication before copay, patient balance dunning, prior-authorization workflows, EHR integration complexity.

## Brain-relevant data sources
EHR, practice management system, billing clearinghouse, insurance adjudication responses, settlement, dispute, patient portal.

## Regulatory overlay
**HIPAA** — this is the big one. All Brain memory for healthcare merchants must be HIPAA-scoped. HSA/FSA rules on card acceptance. State-level healthcare regulations.

## Vertical-specific Brain capabilities
- **HIPAA-scoped memory:** separate memory partition; never retrieved into general context
- **Copay workflow:** adjudicate → copay → tokenize
- **HSA/FSA token handling:** proper treatment of HSA/FSA cards
- **Patient balance dunning:** tuned for healthcare collections (different from retail dunning)
- **Insurance adjudication narrative:** "here's why the claim was denied, here's what to do"

## MVP fit
Not in v1 MVP. HIPAA scoping adds compliance complexity that would slow the first ship. But healthcare is a strong V2 target — pain is high, willingness to pay is high, and regulatory compliance is a moat (hard for generic AI competitors to ship).

## Monetization ceiling
Mid-market to enterprise. High willingness to pay because healthcare IT is structurally underinvested and Brain would be a rare "actually works" AI product in this space.
