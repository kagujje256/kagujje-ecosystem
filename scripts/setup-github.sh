#!/bin/bash
# Kagujje Ecosystem - GitHub Setup Script
# Run this to connect to GitHub and push the ecosystem

set -e

echo "🦁 Setting up Kagujje Ecosystem GitHub Repository..."

# Check for GitHub token
if [ -z "$GITHUB_TOKEN" ]; then
    echo "❌ GITHUB_TOKEN not set"
    echo "Please set it: export GITHUB_TOKEN=your_token_here"
    echo "Get your token from: https://github.com/settings/tokens"
    exit 1
fi

# Configure git
git config --global user.name "Kagujje AI"
git config --global user.email "ai@kagujje.com"

# Create .gitignore
cat > /home/workspace/.gitignore << 'EOF'
# Dependencies
node_modules/
__pycache__/
*.pyc
.env
.venv/
venv/

# Build outputs
dist/
build/
.next/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# Secrets (NEVER commit these)
*.pem
*.key
secrets.json
.env.local
.env.*.local

# Cache
.cache/
*.log

# Temporary
tmp/
temp/
*.tmp

# Trash
Trash/
EOF

# Initialize repo if needed
cd /home/workspace
if [ ! -d .git ]; then
    git init
fi

# Create remote
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/kagujje256/kagujje-ecosystem.git

# Stage all files
git add -A

# Commit
git commit -m "🦁 Kagujje Ecosystem - Initial Setup

- Central Intelligence AGENTS.md
- Distributed architecture protocol
- Resource allocation documentation
- Self-evolution framework

By: Kagujje AI on $(date +%Y-%m-%d)" || echo "Nothing to commit"

# Push (will fail if repo doesn't exist yet)
echo ""
echo "Attempting to push..."
git push -u origin master 2>&1 || {
    echo ""
    echo "⚠️  Repository doesn't exist yet. Creating it..."
    
    # Create repo using GitHub API
    curl -X POST \
        -H "Authorization: token $GITHUB_TOKEN" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/user/repos \
        -d '{
            "name": "kagujje-ecosystem",
            "description": "🦁 Kagujje Digital Ecosystem - Central Intelligence for HFT, Content Automation, and Digital Excellence",
            "private": false,
            "has_issues": true,
            "has_projects": true,
            "has_wiki": true,
            "auto_init": false
        }'
    
    echo ""
    echo "Retrying push..."
    sleep 2
    git push -u origin master
}

echo ""
echo "✅ GitHub repository ready!"
echo "📍 https://github.com/kagujje256/kagujje-ecosystem"
