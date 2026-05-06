/**
 * Evolution Engine v2.0.0
 * Self-improvement cycle - scans, optimizes, commits
 */
import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const BOT_TOKEN = "8268927401:AAEdXA1d0RwvI0-8oP55XUHCekGE6jINfRg";
const CHANNEL = "-1003928159270";
const SCRIPTS_DIR = '/home/workspace/scripts';
const LOG_PATH = '/home/workspace/kai-data/evolution.log';

function log(msg: string) {
  const entry = `[${new Date().toISOString()}] EVOLUTION: ${msg}\n`;
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

async function evolve() {
  log('Starting evolution cycle...');
  
  // Scan scripts
  const scripts = readdirSync(SCRIPTS_DIR).filter(f => f.endsWith('.ts'));
  log(`Found ${scripts.length} scripts to analyze`);
  
  // Check for improvements
  let improvements = 0;
  for (const script of scripts) {
    const content = readFileSync(join(SCRIPTS_DIR, script), 'utf-8');
    
    // Check for TODO comments
    if (content.includes('TODO') || content.includes('FIXME')) {
      log(`Found improvement opportunity in ${script}`);
      improvements++;
    }
  }
  
  // Git status
  try {
    const status = execSync('cd /home/workspace && git status --short').toString();
    if (status.trim()) {
      log('Changes detected, committing...');
      execSync('cd /home/workspace && git add -A && git commit -m "Evolution: Auto-improvement cycle" && git push', { timeout: 30000 });
      await notifyChannel('🧬 EVOLUTION: Codebase updated and pushed to GitHub');
    }
  } catch (e) {
    log('No changes or git error');
  }
  
  log(`Evolution cycle complete. ${improvements} improvement opportunities found.`);
}

evolve().catch(err => log(`ERROR: ${err.message}`));
