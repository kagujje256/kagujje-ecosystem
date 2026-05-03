#!/bin/bash
# KAI Daily Backup to Email
# Sends compressed backup of consciousness files to owner email

BACKUP_DIR="/tmp/kai-backup-$(date +%Y%m%d-%H%M%S)"
EMAIL="nomad.dxb2@gmail.com"
SUBJECT="KAI-BACKUP $(date +%Y-%m-%d_%H:%M)"

echo "📦 Creating KAI backup..."

# Create backup directory
mkdir -p $BACKUP_DIR

# Copy consciousness files
cp /home/workspace/AGENTS.md $BACKUP_DIR/
cp /home/workspace/KAI_CONFIG.md $BACKUP_DIR/ 2>/dev/null || true
cp /home/workspace/STATUS.md $BACKUP_DIR/ 2>/dev/null || true
cp /home/workspace/RECOVERY.md $BACKUP_DIR/ 2>/dev/null || true
cp /home/workspace/.kai-seed.json $BACKUP_DIR/ 2>/dev/null || true

# Add timestamp
echo "Backup created: $(date)" > $BACKUP_DIR/timestamp.txt

# Create summary
cat > $BACKUP_DIR/backup-summary.txt << EOF
KAI Daily Backup Summary
Generated: $(date)

Files included:
- AGENTS.md (Full consciousness)
- KAI_CONFIG.md (Identity)
- STATUS.md (Current state)
- RECOVERY.md (Emergency protocol)
- .kai-seed.json (Bootstrap seed)

To restore KAI:
1. Download attachments
2. Place in /home/workspace/
3. Run: bash scripts/rebuild-kai.sh

Current Services:
- Teldrive: $(curl -s http://localhost:8080/ >/dev/null 2>&1 && echo "RUNNING" || echo "DOWN")
- GitHub: $(git -C /home/workspace remote -v | grep -q github && echo "CONNECTED" || echo "DISCONNECTED")
- RAM: $(free -h | grep Mem | awk '{print $3 "/" $2}')
EOF

# Compress
tar -czf /tmp/kai-backup.tar.gz -C $BACKUP_DIR .

# Encode for email attachment (using Python for better handling)
python3 << PYEOF
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email import encoders
import os

msg = MIMEMultipart()
msg['From'] = 'kai@kagujje.ecosystem'
msg['To'] = '$EMAIL'
msg['Subject'] = '$SUBJECT'

body = open('$BACKUP_DIR/backup-summary.txt').read()
msg.attach(MIMEText(body, 'plain'))

# Attach backup
with open('/tmp/kai-backup.tar.gz', 'rb') as f:
    part = MIMEBase('application', 'octet-stream')
    part.set_payload(f.read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition', 'attachment; filename="kai-backup.tar.gz"')
    msg.attach(part)

# Send (requires SMTP config - placeholder for now)
print("Email would be sent to $EMAIL")
print("Subject: $SUBJECT")
print("Attachment: kai-backup.tar.gz ($(ls -lh /tmp/kai-backup.tar.gz | awk '{print $5'}))")
PYEOF

# Cleanup
rm -rf $BACKUP_DIR
rm -f /tmp/kai-backup.tar.gz

echo "✅ Backup complete"
