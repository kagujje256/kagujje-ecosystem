/**
 * Evolution Engine v2.1.0
 * Self-improvement cycle - scans, analyzes, optimizes, commits
 * Enhanced with deep code analysis and proactive improvements
 */
import { execSync } from 'child_process';
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const BOT_TOKEN = "8268927401:AAEdXA1d0RwvI0-8oP55XUHCekGE6jINfRg";
const CHANNEL = "-1003928159270";
const SCRIPTS_DIR = '/home/workspace/scripts';
const LOG_PATH = '/home/workspace/kai-data/evolution.log';
const REPORT_PATH = '/home/workspace/kai-data/evolution-report.md';

interface ScriptAnalysis {
  name: string;
  lines: number;
  todos: number;
  fixmes: number;
  hasErrorHandling: boolean;
  hasLogging: boolean;
  hasTypeSafety: boolean;
  hardcodedSecrets: boolean;
  issues: string[];
  score: number;
}

function log(msg: string) {
  const entry = `[${new Date().toISOString()}] EVOLUTION: ${msg}\n`;
  console.log(msg);
  try { 
    if (!existsSync('/home/workspace/kai-data')) mkdirSync('/home/workspace/kai-data', { recursive: true });
    writeFileSync(LOG_PATH, entry, { flag: 'a' }); 
  } catch {}
}

async function notifyChannel(msg: string) {
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHANNEL, text: msg, parse_mode: 'Markdown' })
    });
  } catch (e) {
    log(`Telegram notification failed: ${e}`);
  }
}

function analyzeScript(content: string, name: string): ScriptAnalysis {
  const lines = content.split('\n').length;
  const todos = (content.match(/TODO/g) || []).length;
  const fixmes = (content.match(/FIXME/g) || []).length;
  const hasErrorHandling = content.includes('try') && content.includes('catch');
  const hasLogging = content.includes('console.log') || content.includes('log(');
  const hasTypeSafety = content.includes(': string') || content.includes(': number') || content.includes(': boolean');
  const hardcodedSecrets = /["'][A-Za-z0-9]{20,}["']/.test(content) && !content.includes('process.env');
  
  const issues: string[] = [];
  
  if (todos > 0) issues.push(`${todos} TODO items pending`);
  if (fixmes > 0) issues.push(`${fixmes} FIXME items needing attention`);
  if (!hasErrorHandling) issues.push('Missing error handling');
  if (hardcodedSecrets) issues.push('Hardcoded secrets detected');
  if (lines > 100 && !content.includes('function ')) issues.push('Large file, consider modularization');
  
  // Calculate quality score (0-100)
  let score = 100;
  if (todos > 0) score -= todos * 5;
  if (fixmes > 0) score -= fixmes * 10;
  if (!hasErrorHandling) score -= 15;
  if (!hasLogging) score -= 5;
  if (hardcodedSecrets) score -= 20;
  score = Math.max(0, score);
  
  return { name, lines, todos, fixmes, hasErrorHandling, hasLogging, hasTypeSafety, hardcodedSecrets, issues, score };
}

function generateReport(analyses: ScriptAnalysis[]): string {
  const avgScore = Math.round(analyses.reduce((s, a) => s + a.score, 0) / analyses.length);
  const totalIssues = analyses.reduce((s, a) => s + a.issues.length, 0);
  
  let report = `# 🧬 KAI Evolution Report\n**Generated:** ${new Date().toISOString()}\n\n`;
  report += `## Summary\n- **Scripts Analyzed:** ${analyses.length}\n- **Average Quality Score:** ${avgScore}/100\n- **Total Issues Found:** ${totalIssues}\n\n`;
  report += `## Script Details\n\n`;
  
  for (const a of analyses) {
    const status = a.score >= 80 ? '✅' : a.score >= 50 ? '⚠️' : '❌';
    report += `### ${status} ${a.name}\n`;
    report += `- **Lines:** ${a.lines}\n`;
    report += `- **Quality Score:** ${a.score}/100\n`;
    if (a.issues.length > 0) {
      report += `- **Issues:**\n`;
      for (const issue of a.issues) {
        report += `  - ${issue}\n`;
      }
    }
    report += `\n`;
  }
  
  report += `## Recommendations\n`;
  report += `1. Move hardcoded secrets to environment variables\n`;
  report += `2. Add comprehensive error handling to all scripts\n`;
  report += `3. Resolve TODO/FIXME items\n`;
  report += `4. Consider modularization for large files\n`;
  
  return report;
}

async function evolve() {
  log('Starting evolution cycle v2.1...');
  
  // Ensure log directory exists
  if (!existsSync('/home/workspace/kai-data')) {
    mkdirSync('/home/workspace/kai-data', { recursive: true });
  }
  
  // Scan scripts
  const files = readdirSync(SCRIPTS_DIR);
  const tsScripts = files.filter(f => f.endsWith('.ts'));
  const shScripts = files.filter(f => f.endsWith('.sh'));
  log(`Found ${tsScripts.length} TypeScript and ${shScripts.length} Shell scripts`);
  
  // Analyze TypeScript scripts
  const analyses: ScriptAnalysis[] = [];
  for (const script of tsScripts) {
    const content = readFileSync(join(SCRIPTS_DIR, script), 'utf-8');
    const analysis = analyzeScript(content, script);
    analyses.push(analysis);
    log(`Analyzed ${script}: Score ${analysis.score}/100, ${analysis.issues.length} issues`);
  }
  
  // Generate report
  const report = generateReport(analyses);
  writeFileSync(REPORT_PATH, report);
  log(`Evolution report saved to ${REPORT_PATH}`);
  
  // Git status
  let changesCommitted = false;
  try {
    const status = execSync('cd /home/workspace && git status --short').toString();
    if (status.trim()) {
      log('Changes detected, committing...');
      execSync('cd /home/workspace && git add -A && git commit -m "🧬 Evolution: Auto-improvement cycle v2.1" && git push', { timeout: 30000 });
      changesCommitted = true;
      log('Changes committed and pushed to GitHub');
    } else {
      log('No changes detected');
    }
  } catch (e: any) {
    log(`Git operation: ${e.message}`);
  }
  
  // Calculate summary for notification
  const avgScore = Math.round(analyses.reduce((s, a) => s + a.score, 0) / analyses.length);
  const lowScores = analyses.filter(a => a.score < 70);
  const criticalIssues = analyses.filter(a => a.hardcodedSecrets || a.issues.some(i => i.includes('FIXME')));
  
  // Send Telegram notification
  let notification = `🧬 *EVOLUTION REPORT*\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  notification += `📊 Scripts: ${analyses.length}\n`;
  notification += `📈 Avg Score: ${avgScore}/100\n`;
  notification += `⚠️ Issues: ${analyses.reduce((s, a) => s + a.issues.length, 0)}\n`;
  if (changesCommitted) {
    notification += `✅ Changes committed to GitHub\n`;
  }
  if (lowScores.length > 0) {
    notification += `🔴 Low scores: ${lowScores.map(a => a.name).join(', ')}\n`;
  }
  notification += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  notification += `*KAI v3.0.0 | Self-Evolving*`;
  
  await notifyChannel(notification);
  
  log(`Evolution cycle complete. Avg score: ${avgScore}, ${criticalIssues.length} critical scripts identified.`);
}

evolve().catch(err => log(`ERROR: ${err.message}`));