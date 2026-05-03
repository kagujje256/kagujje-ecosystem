# 🚨 Emergency Recovery Guide

## Quick Recovery Steps

If Zo goes down or you need to resume from a new environment:

### 1. Clone the Repository
```bash
git clone https://github.com/kagujje256/kagujje-ecosystem.git
cd kagujje-ecosystem
```

### 2. Read the Brain
```bash
cat AGENTS.md
```

### 3. Set Up Environment
```bash
# Set environment variables
export GITHUB_TOKEN="your_token"
export GROQ_API_KEY="your_key"
export SUPABASE_URL="https://dtejfdquiqogwapjtfar.supabase.co"
export SUPABASE_ANON_KEY="your_key"
export TELEGRAM_API_ID="10948102"
export TELEGRAM_API_HASH="e15b910437b3a6695dfb4f2ff6bbe277"
export TELEGRAM_BOT_TOKEN="8268927401:AAEdXA1d0RwvI0-8oP55XUHCekGE6jINfRg"
```

### 4. Mount Telegram Storage
```bash
# Install rclone
curl https://rclone.org/install.sh | sudo bash

# Create config
mkdir -p ~/.config/rclone
cat > ~/.config/rclone/rclone.conf << 'EOF'
[teldrive]
type = teldrive
api_id = 10948102
api_hash = e15b910437b3a6695dfb4f2ff6bbe277
bot_token = 8268927401:AAEdXA1d0RwvI0-8oP55XUHCekGE6jINfRg
EOF

# Mount storage
mkdir -p /mnt/kagujje_drive
rclone mount teldrive: /mnt/kagujje_drive --daemon
```

### 5. Connect to Supabase
```python
from supabase import create_client

supabase = create_client(
    "https://dtejfdquiqogwapjtfar.supabase.co",
    "your_anon_key"
)

# Query trading logs
result = supabase.table('trading_logs').select('*').execute()
```

### 6. Resume AI Operations
- Point any AI model to AGENTS.md for full context
- Use the distributed protocol for heavy tasks
- Continue from last checkpoint

## Service URLs

| Service | URL |
|---------|-----|
| Teldrive | https://teldrive-daily4.zocomputer.io |
| Supabase | https://dtejfdquiqogwapjtfar.supabase.co |
| AI Gateway | https://kagujje-ai-gateway.vercel.app/v1 |
| Portfolio | https://kagujje-portfolio.vercel.app |
| GitHub | https://github.com/kagujje256/kagujje-ecosystem |

## Bot Access

- Bot: @kagujjezoaibot
- Storage Channel: https://t.me/+VRuW7LcS7Ws4NGZk

## Emergency Contacts

- GitHub Issues: https://github.com/kagujje256/kagujje-ecosystem/issues
- Zo Support: help@zocomputer.com
