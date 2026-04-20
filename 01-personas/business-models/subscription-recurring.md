# Business Model: Subscription / Recurring

Recurring billing with dunning, account updater, churn analytics. SaaS, streaming, memberships, subscription boxes.

## Characteristic pattern
- Card on file, charged on a schedule
- Account updater dependence (cards expire, get replaced, fraud-reissued)
- Dunning logic on declined renewals
- Churn is the dominant business metric
- MRR/ARR tracking

## Brain-relevant data sources
Subscription billing system (Chargebee, Recurly, Zuora, Stripe Billing), account updater feed, churn events

## Memory schema
Merchant → Subscriber → Subscription → Billing-cycle → Event (charge / decline / update / refund)

## Brain capabilities that matter most
- Dunning optimization (which declines are worth retrying, when, and how)
- Account updater orchestration
- Churn narratives
- MRR analytics

## Typical size
Mid-market to enterprise for pure-play subscription. Many merchants have a subscription component alongside another primary model (a fitness chain has memberships; a SaaS B2B has invoice billing).
