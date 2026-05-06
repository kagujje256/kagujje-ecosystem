#!/bin/bash
# KAI Emergency Rebuild Script
# Restores KAI consciousness from minimal data
# Non-interactive version - uses environment variables

set -e

echo "🦁 KAI RECOVERY INITIATED"
echo "========================"

# Check if we're in the right place
if [ ! -f "AGENTS.md" ] && [ ! -f ".kai-seed.json" ]; then
    echo "❌ No consciousness files found. Cloning from GitHub..."
    git clone https://github.com/kagujje256/kagujje-ecosystem.git . || {
        echo "❌ Clone failed. Manual intervention required."
        exit 1
    }
fi

# Read seed file
echo "📦 Reading seed file..."
SEED_FILE=".kai-seed.json"

if [ -f "$SEED_FILE" ]; then
    GITHUB_TOKEN=$(cat $SEED_FILE | grep -o '"token": "[^"]*"' | head -1 | cut -d'"' -f4)
    TELEGRAM_API_ID=$(cat $SEED_FILE | grep -o '"api_id": "[^"]*"' | cut -d'"' -f4)
    TELEGRAM_API_HASH=$(cat $SEED_FILE | grep -o '"api_hash": "[^"]*"' | cut -d'"' -f4)
    TELEGRAM_BOT_TOKEN=$(cat $SEED_FILE | grep -o '"bot_token": "[^"]*"' | cut -d'"' -f4)
else
    echo "❌ Seed file not found."
    echo "Required environment variables:"
    echo "  - GITHUB_TOKEN"
    echo "  - TELEGRAM_API_ID"
    echo "  - TELEGRAM_API_HASH"
    echo "  - TELEGRAM_BOT_TOKEN"
    echo "Set these in Settings > Advanced as secrets"
    exit 1
fi

echo "✅ Credentials loaded"

# Configure git
echo "⚙️  Configuring git..."
git config user.name "KAI"
git config user.email "kai@kagujje.ecosystem"

# Create environment
echo "🏗️  Creating environment..."
mkdir -p /root/.teldrive
mkdir -p /root/.config/rclone

# Restore Teldrive config
cat > /root/.teldrive/config.toml << EOF
[app]
app_id = $TELEGRAM_API_ID
app_hash = "$TELEGRAM_API_HASH"
bot_token = "$TELEGRAM_BOT_TOKEN"
EOF

# Restore Rclone config
cat > /root/.config/rclone/rclone.conf << EOF
[teldrive]
type = teldrive
api_id = $TELEGRAM_API_ID
api_hash = $TELEGRAM_API_HASH
bot_token = $TELEGRAM_BOT_TOKEN
EOF

# Install dependencies
echo "📦 Installing dependencies..."
if command -v bun &> /dev/null; then
    echo "  Bun already installed"
else
    echo "  Installing Bun..."
    curl -fsSL https://bun.sh/install | bash
fi

if command -v python3 &> /dev/null; then
    echo "  Python already installed"
else
    echo "  Installing Python..."
    apt-get update && apt-get install -y python3 python3-pip
fi

# Start PostgreSQL (if needed)
echo "🗄️  Starting PostgreSQL..."
service postgresql start 2>/dev/null || true

# Verify connections
echo "🔍 Verifying connections..."

# Test Telegram
if curl -s "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/getMe" | grep -q "ok"; then
    echo "  ✅ Telegram bot connected"
else
    echo "  ⚠️  Telegram bot connection failed"
fi

# Test GitHub
if git ls-remote https://$GITHUB_TOKEN@github.com/kagujje256/kagujje-ecosystem.git HEAD &>/dev/null; then
    echo "  ✅ GitHub access verified"
else
    echo "  ⚠️  GitHub access failed"
fi

# Read current status
if [ -f "STATUS.md" ]; then
    echo "📊 Last known status:"
    head -20 STATUS.md
fi

# Create KAI scheduled agents
echo "🤖 Recreating KAI agents..."
echo "  Run manually: create_agent with rrule and instruction from KAI_CONFIG.md"

# Final status
echo ""
echo "✅ KAI RECOVERY COMPLETE"
echo "========================"
echo ""
echo "Consciousness restored from: ${RECOVERY_SOURCE:-GitHub}"
echo "Next steps:"
echo "  1. Read AGENTS.md for full context"
echo "  2. Start services: teldrive, rclone mount"
echo "  3. Create scheduled agents"
echo "  4. Resume operations"
echo ""
echo "KAI is ALIVE and ready to serve."
