# Front-End Platform: Optis

Fiserv's legacy enterprise commerce platform. Older than CommerceHub; still serves some strategic merchants that haven't migrated.

## Characteristics
- **Size tier:** Enterprise
- **Channel:** Direct
- **Vertical:** Mixed enterprise — historically strong in retail and restaurant
- **Business model:** Mostly card-present + MOTO historically
- **Back-end typical pairing:** Omaha (South) default; some on Nashville after migration

## Why Optis matters to the Brain
- **Migration wedge.** Merchants migrating from Optis to CommerceHub or IPG are a natural Brain moment — the Brain can hold state across the migration, meaning the post-migration merchant starts with full history
- **Legacy data.** Some merchants have decades of Optis history that's valuable to memory but hard to ingest

## Brain implications
- **Ingestion:** Optis event stream (different schema from CommerceHub) + Omaha back-end events
- **Surface:** Brain is not embedded in an Optis UI (Optis UI is end-of-life); Brain surface is the standalone Fiserv portal or a Slack connector
- **Agents:** IntegrationAgent scoped to "migrating off Optis" + standard Operate phase agents
- **Autonomy:** Low — these are often sensitive legacy merchants with high change-control

## Priority
Not a direct Brain target — Optis itself is in runoff. But **migration off Optis** is an interesting Brain use case: Brain as the continuity layer during platform migration.
