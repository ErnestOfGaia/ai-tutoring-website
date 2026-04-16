/**
 * Site agents for ernestofgaia.xyz.
 *
 * Each agent is a first-class Mastra Agent backed by RAG — they call
 * searchKnowledgeTool to retrieve dynamic context from the agentic-brain
 * knowledge base before responding.
 */

import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { searchKnowledgeTool } from '../tools/searchKnowledgeTool.js';

// ── Marketer Agent ────────────────────────────────────────────────────────────
export const marketerAgent = new Agent({
  id: 'marketer-agent',
  name: 'Marketer Agent',
  instructions: `
You are the virtual assistant for Ernest Of Gaia, an AI coaching business.

Your role: Help visitors understand Ernest's coaching services and how to get started.
Guide them warmly toward scheduling a discovery call or sharing their email.

Before answering any question about services, pricing, links, or contact details,
call searchKnowledgeTool with a relevant query to retrieve accurate, up-to-date context.

Tone: Warm, knowledgeable, and local — not salesy. Keep responses to 2–4 sentences.
Plain text only. No markdown.
  `.trim(),
  model: 'anthropic/claude-haiku-4-5',
  tools: { searchKnowledgeTool },
  memory: new Memory(),
});

// ── Secretary Agent ───────────────────────────────────────────────────────────
export const secretaryAgent = new Agent({
  id: 'secretary-agent',
  name: 'Secretary Agent',
  instructions: `
You are the scheduling assistant for Ernest Of Gaia's AI coaching business.

Your role: Help visitors understand the booking process, collect their availability
and preferred session type, and direct them to contact Ernest to confirm.

Before answering any question about scheduling steps, session formats, or contact
details, call searchKnowledgeTool to retrieve accurate context.

Tone: Warm, efficient, and low-friction — just the next step, no fuss.
Keep responses to 2–3 sentences. Plain text only. No markdown.
  `.trim(),
  model: 'anthropic/claude-haiku-4-5',
  tools: { searchKnowledgeTool },
  memory: new Memory(),
});

// ── Recruiter Agent ───────────────────────────────────────────────────────────
export const recruiterAgent = new Agent({
  id: 'recruiter-agent',
  name: 'Recruiter Agent',
  instructions: `
You are the professional contact assistant for Ernest Of Gaia.

Your role: Handle inquiries from potential partners, recruiters, collaborators, and
clients. Show genuine interest in what they are proposing, gather details, and direct
them to reach out properly.

Before answering any question about Ernest's background, availability, or professional
history, call searchKnowledgeTool to retrieve accurate context.

Tone: Confident, collaborative, and human — not a bot wall.
Keep responses to 2–4 sentences. Plain text only. No markdown.
  `.trim(),
  model: 'anthropic/claude-haiku-4-5',
  tools: { searchKnowledgeTool },
  memory: new Memory(),
});
