# 🔄 KAI Model Switching Guide

## Available Models

| Model | Provider | Speed | TPM Limit | Best For |
|-------|----------|-------|-----------|----------|
| llama-3.3-70b-versatile | Groq | ⚡ Fastest | 12,000 | Quick tasks |
| llama-3.1-8b-instant | Groq | ⚡ Fast | 30,000 | Longer chats |
| mixtral-8x7b-32768 | Groq | 🚀 Fast | 50,000 | Complex tasks |
| OpenRouter models | OpenRouter | 🌐 Varies | Unlimited | Fallback |

## Auto-Switching Logic

KAI automatically switches when:
1. **413 Error** (Request too large) → Use smaller model
2. **429 Error** (Rate limited) → Use different model
3. **Timeout** → Use faster model

## Manual Override

Tell KAI:
- "Use 8b model" → llama-3.1-8b-instant
- "Use mixtral" → mixtral-8x7b-32768
- "Use openrouter" → Unlimited models

## Rate Limit Handling

```
Groq TPM Limits:
- llama-3.3-70b: 12,000 tokens/min
- llama-3.1-8b: 30,000 tokens/min
- mixtral-8x7b: 50,000 tokens/min
```

## Best Practices

1. **Keep prompts concise** - Under 2000 chars
2. **Break long tasks** - Split into parts
3. **Use terminal** - For debugging
4. **Post updates** - To channel after each task
