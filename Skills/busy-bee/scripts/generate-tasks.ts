/**
 * Busy Bee v1.0.0
 * Generates new tasks to keep KAI always busy
 */
import { writeFileSync, readFileSync } from 'fs';

const BOT_TOKEN = "8268927401:AAEdXA1d0RwvI0-8oP55XUHCekGE6jINfRg";
const CHANNEL = "-1003928159270";
const TASK_LOG = '/home/workspace/kai-data/tasks-generated.log';

const TASK_TEMPLATES = [
  '📝 Write documentation for {component}',
  '🔧 Optimize {script} for better performance',
  '🧪 Add tests for {feature}',
  '📊 Analyze {metric} trends from past week',
  '🚀 Deploy {project} to production',
  '🎨 Redesign {page} UI for better UX',
  '📚 Learn new {technology} framework',
  '🔍 Research {topic} for competitive advantage',
  '💰 Analyze trading patterns for {pair}',
  '🤖 Improve AI prompt for {use_case}',
  '📡 Add new API endpoint for {service}',
  '🛡️ Security audit for {system}',
  '📈 Create dashboard for {data}',
  '🔄 Automate {process} workflow',
  '💡 Brainstorm new features for {product}'
];

const COMPONENTS = ['kai-pulse', 'teldrive', 'AI gateway', 'Supabase', 'Telegram bot', 'portfolio', 'HFT engine'];
const SCRIPTS = ['kai-pulse.ts', 'kai-reasoner.ts', 'heal.ts', 'evolve.ts'];
const FEATURES = ['heartbeat', 'memory sync', 'evolution engine', 'self-healing', 'model expansion'];
const TECHNOLOGIES = ['Bun', 'WebGL', 'WebAssembly', 'GraphQL', 'WebSockets', 'Rust'];
const TOPICS = ['HFT strategies', 'AI market analysis', 'Ugandan tech scene', 'DeFi opportunities', 'Cloud optimization'];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateTask(): string {
  const template = randomFrom(TASK_TEMPLATES);
  return template
    .replace('{component}', randomFrom(COMPONENTS))
    .replace('{script}', randomFrom(SCRIPTS))
    .replace('{feature}', randomFrom(FEATURES))
    .replace('{technology}', randomFrom(TECHNOLOGIES))
    .replace('{topic}', randomFrom(TOPICS))
    .replace('{pair}', 'USD/UGX')
    .replace('{use_case}', 'trading decisions')
    .replace('{service}', 'payment processing')
    .replace('{system}', 'API gateway')
    .replace('{data}', 'trading metrics')
    .replace('{process}', 'backup')
    .replace('{product}', 'KAI ecosystem');
}

async function generateTasks() {
  const tasks: string[] = [];
  for (let i = 0; i < 5; i++) {
    tasks.push(generateTask());
  }
  
  const msg = `🐝 BUSY BEE: NEW TASKS GENERATED\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${tasks.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n⚡ KAI stays BUSY!`;
  
  await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHANNEL, text: msg, parse_mode: 'Markdown' })
  });
  
  const entry = `[${new Date().toISOString()}] Generated ${tasks.length} tasks\n`;
  writeFileSync(TASK_LOG, entry, { flag: 'a' });
  console.log('Tasks generated and sent');
}

generateTasks().catch(console.error);
