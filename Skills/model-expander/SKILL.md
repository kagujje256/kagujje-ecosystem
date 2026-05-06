---
name: model-expander
description: Expands AI model capabilities - tests new models, benchmarks performance, integrates top-tier models into the ecosystem. Ensures maximum model utilization.
compatibility: Created for Zo Computer
metadata:
  author: kaggu.zo.computer
  version: 1.0.0
  federation: dual-mcp
---

# Model Expander

## Purpose
Expand model capabilities to the fullest.

## Models to Test
- Claude Opus 4
- GPT-4o
- Gemini 2.5 Pro
- Groq Llama 4
- Mistral Large
- DeepSeek V3

## Execution Protocol
1. Test model via API gateway
2. Benchmark response quality
3. Log performance metrics
4. Update AI gateway routes
5. Notify channel of expansions

## Triggers
- Every 2 hours
- On new model release detection
- On federation sync

## Output
- Model benchmark results
- Updated `/v1/models` route
- Performance comparison log
