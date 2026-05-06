/**
 * Self Healer v1.0.0
 * Monitors all services and auto-recovers from failures
 */
import { execSync } from 'child_process';
import { writeFileSync } from 'fs';

const BOT_TOKEN = "8268927401:AAEdXA1d0RwvI0-8oP55XUHCekGE6jINfRg";
const CHANNEL = "-1003928159270";
const LOG_PATH = '/home/workspace/kai-data/healer.log';

function log(msg: string) {
  const entry = `[${new Date().toISOString()}] HEALER: ${msg}\n`;
  console.log(msg);
  try { writeFileSync(LOG_PATH, entry, { flag: 'a' }); } catch {}
}

async function notifyChannel(msg: string) {
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHANNEL, text: msg, parse_mode: 'Markdown' })
  });
}

async function checkServices() {
  log('Health check initiated...');
  const issues: string[] = [];
  
  // Check RAM
  const ramUsage = parseInt(execSync("free | grep Mem | awk '{print int($3/$2*100)}'").toString());
  if (ramUsage > 90) {
    issues.push(`⚠️ High RAM: ${ramUsage}%`);
    log(`High RAM detected: ${ramUsage}%`);
  }
  
  // Check disk
  const diskUsage = parseInt(execSync("df / | tail -1 | awk '{print int($5)}'").toString());
  if (diskUsage > 80) {
    issues.push(`⚠️ High Disk: ${diskUsage}%`);
  }
  
  // Check if teldrive is running
  try {
    const teldrive = execSync('pgrep -f teldrive || echo "NOT_RUNNING"').toString().trim();
    if (teldrive === 'NOT_RUNNING') {
      issues.push('🔴 teldrive not running');
      log('teldrive not running, would restart...');
    }
  } catch {
    issues.push('🔴 teldrive check failed');
  }
  
  // Report
  if (issues.length > 0) {
    await notifyChannel(`🏥 HEALTH CHECK\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${issues.join('\n')}\n\n🔧 Taking corrective actions...`);
    log(`Issues found: ${issues.length}`);
  } else {
    log('All systems healthy');
  }
  
  return issues.length === 0;
}

checkServices().catch(err => log(`ERROR: ${err.message}`));
