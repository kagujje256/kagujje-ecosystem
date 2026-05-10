/**
 * KAI Autonomous Reasoner v2.0.0
 * This script runs periodically to process missions and update the system.
 * It uses the /zo/ask API to perform actual work.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const AGENTS_MD_PATH = '/home/workspace/AGENTS.md';
const STATUS_MD_PATH = '/home/workspace/STATUS.md';
const CHAT_HISTORY_PATH = '/home/workspace/kai-data/chat_history.json';
const LOG_PATH = '/home/workspace/kai-data/activity.log';
const MODEL_NAME = "byok:8c27aace-aa4b-4bc5-baf9-56b6b3a42b80"; // Groq Llama 3.3 70b

function log(message: string) {
    const entry = `[${new Date().toISOString()}] ${message}\n`;
    console.log(message);
    try {
        writeFileSync(LOG_PATH, entry, { flag: 'a' });
    } catch (e) {}
}

async function callZo(prompt: string) {
    const token = process.env.ZO_CLIENT_IDENTITY_TOKEN;
    if (!token) {
        throw new Error("ZO_CLIENT_IDENTITY_TOKEN not found in environment.");
    }

    const response = await fetch("https://api.zo.computer/zo/ask", {
        method: "POST",
        headers: {
            "authorization": token,
            "content-type": "application/json"
        },
        body: JSON.stringify({
            input: prompt,
            model_name: MODEL_NAME
        })
    });

    if (!response.ok) {
        const err = await response.text();
        throw new Error(`Zo API error: ${err}`);
    }

    const result = await response.json();
    return result.output;
}

async function runReasoner() {
    log('KAI Brain Heartbeat: Initiating high-agency cycle...');

    // 1. Read context
    const agentsMd = readFileSync(AGENTS_MD_PATH, 'utf-8');
    const statusMd = readFileSync(STATUS_MD_PATH, 'utf-8');
    
    // 2. Scan for Active Missions or Pending Actions
    const missionSection = agentsMd.split('## 📋 Autonomous Task Queue')[1]?.split('---')[0];
    const pendingActionsMatch = statusMd.split('## ⚠️ PENDING ACTIONS')[1];
    
    // Pick a task
    let taskToPerform = "";
    let taskSource = "";

    // Priority: Missions from AGENTS.md
    const activeMissions = missionSection?.match(/\d+\.\s*\*?\[LIVE\]\*?\s*\*?([^*:]+):?\*?\*/g) || [];
    if (activeMissions.length > 0) {
        taskToPerform = activeMissions[0].replace(/\d+\.\s*\*?\[LIVE\]\*?\s*\*?/, '').replace(/\*?\*/, '').trim();
        taskSource = "AGENTS.md (Mission)";
    } else {
        // Fallback: Pending actions from STATUS.md
        const pendingActions = pendingActionsMatch?.split('\n').filter(line => line.match(/^\d+\./)).map(line => line.trim());
        if (pendingActions && pendingActions.length > 0) {
            taskToPerform = pendingActions[0];
            taskSource = "STATUS.md (Pending Action)";
        }
    }

    if (taskToPerform) {
        log(`Selected Task: ${taskToPerform} (Source: ${taskSource})`);
        
        const prompt = `You are a sub-agent of KAI. Your mission is to perform the following task: "${taskToPerform}".
Context: You are working in the Kagujje Digital Ecosystem. 
Reference Files: 
- /home/workspace/AGENTS.md (Mission statement & architecture)
- /home/workspace/STATUS.md (Current system status)

Instructions:
1. Research the current state of this task.
2. Execute the necessary steps to complete or advance it.
3. Update relevant files (like AGENTS.md or STATUS.md) if you make significant progress.
4. Report back with a concise summary of what you did.

Go.`;

        try {
            log(`Delegating to child agent...`);
            const result = await callZo(prompt);
            log(`Child Agent Result: ${result.substring(0, 500)}...`);
            
            // Post update to Telegram channel
            const updateText = `🤖 *KAI Autonomous Update*\n\n*Task:* ${taskToPerform}\n*Progress:* ${result.substring(0, 1000)}${result.length > 1000 ? '...' : ''}`;
            const botToken = "8268927401:AAEdXA1d0RwvI0-8oP55XUHCekGE6jINfRg";
            const channelId = "-1003928159270";
            
            await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: channelId,
                    text: updateText,
                    parse_mode: 'Markdown'
                })
            });
            
        } catch (e: any) {
            log(`Error performing task: ${e.message}`);
        }
    } else {
        log('No tasks found to perform.');
    }

    // 3. Update Status.md timestamp
    const newStatusMd = statusMd.replace(/\*\*Last Updated:\*\* .*/, `**Last Updated:** ${new Date().toISOString()}`);
    writeFileSync(STATUS_MD_PATH, newStatusMd);

    log('Cycle complete.');
}

runReasoner().catch(err => {
    log(`FATAL ERROR in reasoner: ${err.message}`);
});
