# Business Model: MOTO / CNP

Mail order, phone order, IVR payments, call-center payments. Older business model but still significant in B2B services, debt collection, government, and some healthcare.

## Characteristic pattern
- Human agent takes card over the phone OR IVR captures it
- PCI scope is voice-channel (specific rules apply)
- Higher chargeback rate than e-com (CNP + human error)
- Usually paired with another channel (MOTO is rarely the only channel)

## Brain-relevant data sources
Call center systems, IVR logs, agent workstations

## Memory schema
Merchant → Agent → Call → Payment-attempt

## Brain capabilities that matter most
- PCI voice-scope compliance
- Agent-assisted dispute drafting
- IVR decline handling
- Call-center quality metrics

## Typical size
Varies. Often enterprise-heavy because call centers are expensive.

## Priority
V3+. MOTO-first merchants are a small segment; MOTO-as-a-supplement is a common pattern but doesn't justify bespoke Brain work until the primary business models are covered.
