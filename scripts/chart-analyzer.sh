#!/bin/bash
PROMPT=$(cat << 'EOF'
Analyze the TradingView chart screenshot at /home/workspace/tradingview_chart.png.
Provide an advanced prediction for the next 24-48 hours based on technical analysis patterns (RSI, Moving Averages, Support/Resistance, etc.) visible in the image.
Respond with a clear 'KAI PREDICTION' header and bullet points for the analysis.
EOF
)

# Escape the prompt for JSON
ESCAPED_PROMPT=$(echo "$PROMPT" | jq -aRs .)

cat << EOF > /tmp/ask_body.json
{
  "input": $ESCAPED_PROMPT,
  "model_name": "byok:35e4c342-70f9-4f35-a856-238c3c0193ff"
}
EOF

curl -s -X POST https://api.zo.computer/zo/ask \
  -H "Authorization: $ZO_CLIENT_IDENTITY_TOKEN" \
  -H "Content-Type: application/json" \
  -d @/tmp/ask_body.json
