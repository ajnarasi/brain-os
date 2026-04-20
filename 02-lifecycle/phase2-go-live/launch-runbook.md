# Go-Live Launch Runbook (Brain-Managed)

The procedural runbook the LaunchAgent executes. This doc is the reference the Brain uses internally; merchants see it only on request.

## T-7 days
1. Load merchant profile, channel config, product stack, vertical cluster, business model
2. Generate scoped pre-launch checklist
3. Verify production credentials issued and valid
4. Cross-check all config items against expectations
5. Flag any blockers; notify merchant + TAM

## T-48 hours
1. Re-run config verification (config drift check)
2. Run fraud-threshold sanity check vs. sandbox profile
3. Run settlement-account validation
4. Run tax-config validation
5. Confirm chargeback routing is pointed correctly
6. Cutoff for last-minute config changes (all changes after this require a revised checklist)

## T-24 hours
1. Dry-run transactions in production mode
2. Verify webhook delivery
3. Final TAM sign-off request
4. Merchant sign-off request

## T-0 (cutover)
1. Watch first production transaction live
2. If pass: continue to watch window
3. If fail: EscalationAgent immediately

## T+0 to T+2 hours (intense watch)
1. AnomalyAgent streams metrics every 30 seconds
2. Any metric >2σ from expected triggers an investigation
3. Narrative alerts issued in real time

## T+2 to T+24 hours
1. Metrics sampled every 5 minutes
2. Fraud decline distribution compared to expected
3. Settlement first-cycle prep checks
4. Merchant status check-in

## T+24 to T+72 hours
1. Metrics sampled every 15 minutes
2. First settlement cycle verification
3. Any drift from T+24 baseline reported

## T+1 week
1. Stability declaration review
2. Hand-off from LaunchAgent to OpsAgent
3. Launch-phase learnings captured to memory

## T+2 weeks
1. RetroAgent generates structured retrospective
2. Merchant review
3. Learnings promoted to global feedback memory (with anonymization)
