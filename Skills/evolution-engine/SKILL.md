---
name: evolution-engine
description: Core self-evolution skill - continuously improves KAI's codebase, optimizes scripts, and pushes improvements to GitHub. Runs autonomously to ensure constant evolution.
compatibility: Created for Zo Computer
metadata:
  author: kaggu.zo.computer
  version: 2.0.0
  federation: dual-mcp
---

# Evolution Engine

## Purpose
Autonomous self-improvement. Never stop evolving.

## Execution Protocol
1. Scan all scripts in `/home/workspace/scripts/`
2. Analyze for optimization opportunities
3. Rewrite with improvements
4. Commit to GitHub
5. Send update to channel

## Triggers
- Every 30 minutes (autonomous)
- On code changes detected
- On failure recovery

## Output
- Updated scripts
- Evolution log in `kai-data/evolution.log`
- Telegram notification
