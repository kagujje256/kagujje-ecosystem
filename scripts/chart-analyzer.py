import requests
import os

MODEL_NAME = "byok:35e4c342-70f9-4f35-a856-238c3c0193ff" # Gemini Pro

def analyze_chart():
    prompt = """Analyze the TradingView chart screenshot at /home/workspace/tradingview_chart.png.
Provide an advanced prediction for the next 24-48 hours based on technical analysis patterns (RSI, Moving Averages, Support/Resistance, etc.) visible in the image.
Respond with a clear 'KAI PREDICTION' header and bullet points for the analysis."""

    response = requests.post(
        "https://api.zo.computer/zo/ask",
        headers={
            "authorization": os.environ["ZO_CLIENT_IDENTITY_TOKEN"],
            "content-type": "application/json"
        },
        json={"input": prompt, "model_name": MODEL_NAME}
    )
    
    if response.status_code == 200:
        print(response.json()["output"])
    else:
        print(f"Error: {response.status_code} - {response.text}")

if __name__ == "__main__":
    analyze_chart()
