---
name: self-healer
description: Autonomous error detection and recovery - monitors all services, agents, and routes. Automatically heals failures without human intervention.
compatibility: Created for Zo Computer
metadata:
  author: kaggu.zo.computer
  version: 1.0.0
  federation: dual-mcp
---

# Self Healer

## Purpose
The ecosystem NEVER stops. Automatic failure recovery.

## Monitoring Targets
- All agents (heartbeat, brain, monitor)
- All services (teldrive, kai-pulse)
- All routes (API endpoints)
- System resources (RAM, disk)

## Execution Protocol
1. Check all services status
2. Detect failures within 30 seconds
3. Auto-restart failed services
4. Log incident
5. Notify channel
6. If unrecoverable → delegate to federation partner

## Triggers
- Every 1 minute
- On error detection
- On service crash

## Output
- Health status report
- Recovery log
- Channel alerts
