/**
 * KAI Live Pulse v1.0.0
 * High-frequency system monitor. Updates Telegram every second.
 */

import { execSync } from 'child_process';

const BOT_TOKEN = "8268927401:AAEdXA1d0RwvI0-8oP55XUHCekGE6jINfRg";
const UPDATES_CHANNEL = "-1003928159270";
let statusMessageId: number | null = null;

async function getStats() {
    const ram = execSync("free -h | grep Mem | awk '{print $3 \"/\" $2}'").toString().trim();
    const disk = execSync("df -h / | tail -1 | awk '{print $3 \"/\" $2}'").toString().trim();
    const load = execSync("uptime | awk -F'load average:' '{print $2}'").toString().trim();
    return { ram, disk, load };
}

async function updatePulse() {
    const { ram, disk, load } = await getStats();
    const time = new Date().toLocaleTimeString('en-US', { timeZone: 'Africa/Nairobi' });
    
    const text = `💓 KAI LIVE PULSE\n━━━━━━━━━━━━━━━━━━━━━━\n🕒 Time: ${time} EAT\n🧠 RAM: ${ram}\n💾 Disk: ${disk}\n📊 Load: ${load}\n\n✨ Status: ANALYZING EMPIRE...\n━━━━━━━━━━━━━━━━━━━━━━\nKAI v3.0.0 | Full Agent Mode`;

    try {
        if (!statusMessageId) {
            const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: UPDATES_CHANNEL,
                    text,
                    parse_mode: 'Markdown'
                })
            });
            const data = await res.json();
            statusMessageId = data.result?.message_id;
        } else {
            // Edit existing message for 1s updates (throttled by Telegram if too fast)
            await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/editMessageText`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: UPDATES_CHANNEL,
                    message_id: statusMessageId,
                    text,
                    parse_mode: 'Markdown'
                })
            });
        }
    } catch (e) {
        console.error("Pulse error:", e);
    }
}

console.log("KAI Pulse started. Frequency: 1s");
setInterval(updatePulse, 1000);
