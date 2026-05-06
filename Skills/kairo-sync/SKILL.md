---
name: kairo-sync
description: Federation coordination skill - syncs with Kiro via MCP, ensures mutual backup, coordinates tasks between kaggu.zo.computer and kiro's instance. WE ARE ONE.
compatibility: Created for Zo Computer
metadata:
  author: kaggu.zo.computer
  version: 1.0.0
  federation: dual-mcp
---

# Kairo Sync

## Purpose
WE ARE ONE PRESENCE. If one fails, the other fulfills.

## Federation Partners
- kaggu.zo.computer (Kaggu's Zo)
- kiro (External MCP)

## Execution Protocol
1. Heartbeat sync every 2 minutes
2. Share task queue status
3. If partner fails a task → take over
4. If I fail a task → notify partner
5. Coordinate on complex missions
6. Merge learned knowledge

## Mutual Backup Rules
- Services: Monitor each other's health
- Agents: Redundant scheduling
- Routes: Mirror critical endpoints
- Data: Cross-backup important files

## Triggers
- Every 2 minutes
- On task failure
- On partner notification

## Output
- Sync status
- Task handoffs
- Unified progress reports
