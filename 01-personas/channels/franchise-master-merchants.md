# Channel: Franchise / Master Merchants

Hierarchical merchant relationships — franchisors and their franchisees, buying groups, co-ops, national retail chains with store-level operations under a corporate umbrella.

- **Who owns the merchant:** The franchisor / master merchant (corporate)
- **Who pays for Brain:** Master merchant (bundled to locations, charged back per location)
- **Data access:** Full at corporate; individual location data rolls up
- **Surface:** Corporate dashboard with location-level drill-downs
- **Trust relationship:** Location-level operators trust corporate; corporate trusts Fiserv
- **Typical size:** Master merchant is usually mid-market to enterprise; individual locations are SMB
- **Typical pain:** Multi-location consistency, compliance drift per location, analytics roll-up, brand standards for payment ops
- **Brain autonomy default:** Split — corporate has more autonomy than individual locations

## Brain experience
- **Hierarchical memory:** corporate memory + per-location memory, with corporate able to set policies that cascade
- **Corporate view:** aggregate analytics, compliance dashboards, per-location drill-down
- **Location view:** simplified SMB-style Brain at each location
- **Cross-location patterns:** Brain can spot issues that are invisible at single-location level ("6 of your 40 locations have a chargeback rate 3x higher than the rest — here's why")

## Why this matters
- Franchises and master merchants represent a large segment of Fiserv's mid-market + enterprise book
- Corporate loves tools that help them manage consistency across locations
- Location-level operators are usually SMB-tier and will use the simpler Brain

## Hard problems
- Memory hierarchy design (what's shared, what's private)
- Corporate-vs-location policy conflicts (corporate wants to tune fraud, location operator wants looser thresholds)
- Location turnover (franchisee churn is real; memory handoff needed)

## Priority
V2. The hierarchical memory model is non-trivial and isn't on the critical path for the two-slice MVP.
