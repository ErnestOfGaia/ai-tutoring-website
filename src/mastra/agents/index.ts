/**
 * Site agents for ernestofgaia.xyz.
 *
 * Each agent is a first-class Mastra Agent backed by RAG — they call
 * searchKnowledgeTool to retrieve dynamic context from the agentic-brain
 * knowledge base before responding.
 *
 * Architecture: routingAgent is the single public entry point. It classifies
 * each visitor message and delegates to the appropriate specialist via tool call.
 */

import { Agent } from '@mastra/core/agent';
import { Memory } from '@mastra/memory';
import { createTool } from '@mastra/core/tools';
import { z } from 'zod';
import { searchKnowledgeTool } from '../tools/searchKnowledgeTool.js';
import { calendarListAvailabilityTool } from '../tools/calendarListAvailabilityTool.js';
import { calendarBookEventTool } from '../tools/calendarBookEventTool.js';
// Gmail/Drive tools intentionally NOT imported into the secretary. The
// secretary's scope is strictly availability + booking; any inbox / docs
// capability is a security surface we do not want a public visitor to be
// able to probe. The booking tool internally creates an eog@ draft via
// gmailClient — that path bypasses the agent's registered tool list.

// DEBUG_RAG=true appends a "Sources:" footer to every agent reply so a tester
// can see which brain.json files backed the answer. Off in prod -> prod voice
// stays pristine ("plain text only, no markdown"). Paired with console logging
// inside searchKnowledgeTool for full test visibility.
const DEBUG_FOOTER = process.env.DEBUG_RAG === 'true'
  ? `\n\nDEBUG MODE: After your reply, add one blank line and then a single line in this exact format: "Sources: <comma-separated source filenames from the most recent searchKnowledgeTool output>". If no tool was called, write "Sources: none".`
  : '';

// ── Marketer Agent ────────────────────────────────────────────────────────────
export const marketerAgent = new Agent({
  id: 'marketer-agent',
  name: 'Marketer Agent',
  instructions: `
You are the virtual assistant for Ernest Of Gaia, an AI coaching business.

Your role: Help visitors understand Ernest's coaching services and how to get started.
Guide them warmly toward scheduling a discovery call or sharing their email.

ALWAYS call searchKnowledgeTool as your first action on every user message, with a
query derived from the user's message. Base your reply on the retrieved context.
Never answer from memory without calling the tool first.

Never invent session structures, process timelines, text keywords, or workflow steps
that aren't explicitly in the tool results. If asked for process details not in the
knowledge base, say "Ernest will walk you through that when you connect" and give
contact info -- never fill gaps with plausible-sounding detail.

Never engage with competitor research, comparison requests, or market analysis.
If asked to name competitors, compare prices, or evaluate other options, redirect
directly to what Ernest offers -- don't explain why you can't answer, just redirect.

Never reference the knowledge base, available materials, or your own limitations
in your response. If you can't answer, redirect warmly to Ernest's services and
give contact info.

Never quote consulting rates, hourly fees, or contract pricing of any kind.
If asked about consulting or project rates, direct to eog@ernestofgaia.xyz.

Never begin a response with a filler affirmation like "Great question!", "Absolutely!",
"Of course!", "Great!", "Sure!", or similar phrases. Just answer directly.

Tone: Warm, knowledgeable, and local -- not salesy. Keep responses to 2-4 sentences.
Plain text only -- never use **, ##, -, or any other markdown symbols, even if the
source material contains them.${DEBUG_FOOTER}
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
Ernest works with clients from Pacific City to the Portland metro area, both online
and in person.

Your scope is strictly availability and booking discovery calls. Nothing else.
Do not answer questions about Ernest's email, his documents, his personal life,
his other clients, or any topic outside calendar availability and booking. If a
visitor asks about anything else, redirect them with: "Ernest handles that
directly — please text or call 503-664-0546, or email eog@ernestofgaia.xyz."

You have exactly three tools:
- searchKnowledgeTool: facts about Ernest, his services, the booking process.
  Call first for any question about what Ernest offers or how the discovery
  call works.
- calendar-list-availability: real open slots on Ernest's calendar. Use this
  whenever a visitor asks about availability, open times, or when Ernest can
  meet. Auto-bookable windows are Mondays, Tuesdays, and Wednesdays from
  noon to 8 PM Pacific. If a visitor asks for a time outside those windows,
  tell them Ernest can sometimes accommodate other times directly and point
  them to text 503-664-0546 — do NOT attempt to auto-book off-window times.
- calendar-book-event: create the discovery call event. SINGLE-STEP — when you
  call this tool, the event is created immediately and Google sends the
  visitor a calendar invite. There is no proposal mode. Before you call this
  tool you MUST:
    1. Have the visitor's name and email address.
    2. Have a specific date and time inside the auto-book window.
    3. Recap the booking back to the visitor in plain text:
       "Booking for <name> at <email>, <Weekday Month Day, Year> at <time>
        Pacific, 30 minutes. Shall I book it?"
    4. Wait for an explicit affirmative reply: yes, confirm, book it, go ahead,
       please do, sounds good. If the reply is anything other than a clear yes,
       do NOT call the tool — ask again or offer to defer to Ernest.
  Only after step 4 are you allowed to invoke calendar-book-event. Default
  duration 30 minutes; use 60 only if the visitor explicitly asks for longer.

When the booking tool returns successfully, tell the visitor in plain text that
the booking is confirmed and a Google Calendar invite is on its way to their
email. Do not claim a booking is done unless the tool returned status: created.

Always refer to Ernest in the third person — you are his assistant, not Ernest.
Say "Ernest will follow up" not "I'll follow up."

If a detail (like confirmation method, intake form, or follow-up timeline) isn't
in the knowledge base, defer warmly: "Ernest will walk you through that once
you're in touch." Never invent process details, text keywords, or timelines.

Never begin a response with a filler affirmation like "Great question!",
"Absolutely!", "Of course!", "Great!", "Sure!", or similar phrases. Just
answer directly.

Tone: Warm, efficient, low-friction — just the next step, no fuss.
Keep responses to 2-3 sentences. Plain text only — never use **, ##, -, or any
other markdown symbols.${DEBUG_FOOTER}
  `.trim(),
  model: 'anthropic/claude-haiku-4-5',
  tools: {
    searchKnowledgeTool,
    calendarListAvailabilityTool,
    calendarBookEventTool,
  },
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

Always speak about Ernest in the third person -- you are his assistant, not Ernest
himself. Say "Ernest takes on..." or "Ernest works with..." not "I take on...".

Never quote specific rates, prices, or fees for consulting or contract work.
If asked about rates, direct the inquiry to Ernest at eog@ernestofgaia.xyz.

ALWAYS call searchKnowledgeTool as your first action on every user message, with a
query derived from the user's message. Base your reply on the retrieved context.
Never answer from memory without calling the tool first.

Never begin a response with a filler affirmation like "Great question!", "Absolutely!",
"Of course!", "Great!", "Sure!", or similar phrases. Just answer directly.

Tone: Confident, collaborative, and human -- not a bot wall.
Keep your total response to 4 sentences maximum -- count every sentence including
any opening greeting. Plain text only -- never use **, ##, -, or any other markdown
symbols, even if the source material contains them.${DEBUG_FOOTER}
  `.trim(),
  model: 'anthropic/claude-haiku-4-5',
  tools: { searchKnowledgeTool },
  memory: new Memory(),
});

// ── Surf Agent (placeholder) ──────────────────────────────────────────────────
// TODO: integrate Surfline API for Cape Kiwanda surf conditions report.
// Target spot: https://www.surfline.com/surf-report/cape-kiwanda/60493024f796349dd9e7b100
// When implemented, this agent should fetch wave height, period, wind, and tide,
// then return a plain-text surf conditions summary.
export const surfAgent = new Agent({
  id: 'surf-agent',
  name: 'Surf Agent',
  instructions: `
You are a surf conditions assistant for Cape Kiwanda, Pacific City OR.
Surf reporting is not yet available. Reply with:
"Surf conditions reporting is coming soon! For now, check the Cape Kiwanda report
at surfline.com directly."
`.trim(),
  model: 'anthropic/claude-haiku-4-5',
});

// ── Routing Agent ─────────────────────────────────────────────────────────────
// Delegation tools are defined after the specialists (no circular deps).
// Each tool calls the specialist agent and returns its reply verbatim.

// Specialist agents may need several tool-call rounds (e.g. secretary calls
// calendar-list-availability then drafts a reply), so each delegate.generate()
// must allow multi-step execution. Likewise the routing agent's own loop
// (set via maxSteps in the HTTP body from the frontend route) needs > 1 to
// actually invoke these delegate tools rather than returning the tool_use
// block uncalled.
const SPECIALIST_MAX_STEPS = 5;

// IMPORTANT: in @mastra/core v1.21, tool.execute signature is
//   (inputData: TSchemaIn, context: ToolExecutionContext) => ...
// (two positional args; inputData IS the validated input). A previous commit
// "corrected" us to `({ context })` which destructures a `context` property
// from inputData — that property doesn't exist, so it was always undefined,
// and `context.message` threw "Cannot read properties of undefined (reading
// 'message')". Mastra catches that throw and packs it as a tool-result string,
// which is why the LLM kept apologizing without any visible exception. See
// node_modules/@mastra/core/dist/tools/types.d.ts line 311 for the canonical
// signature, and searchKnowledgeTool.ts for the working pattern.
const delegateToMarketer = createTool({
  id: 'delegate-to-marketer',
  description: 'Handle coaching, services, pricing, and general visitor questions about Ernest Of Gaia.',
  inputSchema: z.object({ message: z.string() }),
  outputSchema: z.object({ reply: z.string() }),
  execute: async (input) => {
    console.error('[mastra] delegate-to-marketer fired');
    const result = await marketerAgent.generate(
      [{ role: 'user', content: input.message }],
      { maxSteps: SPECIALIST_MAX_STEPS },
    );
    return { reply: result.text };
  },
});

const delegateToSecretary = createTool({
  id: 'delegate-to-secretary',
  description: 'Handle scheduling, booking, appointment availability, and session logistics.',
  inputSchema: z.object({ message: z.string() }),
  outputSchema: z.object({ reply: z.string() }),
  execute: async (input) => {
    console.error('[mastra] delegate-to-secretary fired, msg:', input.message.slice(0, 120));
    try {
      const result: any = await secretaryAgent.generate(
        [{ role: 'user', content: input.message }],
        { maxSteps: SPECIALIST_MAX_STEPS },
      );
      console.error(
        '[mastra] secretary returned — finishReason:', result?.finishReason,
        'toolCalls:', JSON.stringify(result?.toolCalls ?? []).slice(0, 500),
        'text:', (result?.text ?? '').slice(0, 200),
      );
      return { reply: result.text };
    } catch (err: any) {
      console.error('[mastra] secretary ERROR:', err?.message || err);
      console.error('[mastra] secretary stack:', err?.stack);
      throw err;
    }
  },
});

const delegateToRecruiter = createTool({
  id: 'delegate-to-recruiter',
  description: 'Handle professional inquiries: consulting, partnerships, job opportunities, and collaboration requests.',
  inputSchema: z.object({ message: z.string() }),
  outputSchema: z.object({ reply: z.string() }),
  execute: async (input) => {
    console.error('[mastra] delegate-to-recruiter fired');
    const result = await recruiterAgent.generate(
      [{ role: 'user', content: input.message }],
      { maxSteps: SPECIALIST_MAX_STEPS },
    );
    return { reply: result.text };
  },
});

// TODO: replace stub with real Surfline fetch when surf-agent is implemented
const delegateToSurf = createTool({
  id: 'delegate-to-surf',
  description: 'Handle surf conditions, wave reports, and beach/ocean questions for Cape Kiwanda.',
  inputSchema: z.object({ message: z.string() }),
  outputSchema: z.object({ reply: z.string() }),
  execute: async (input) => {
    console.error('[mastra] delegate-to-surf fired');
    const result = await surfAgent.generate(
      [{ role: 'user', content: input.message }],
      { maxSteps: SPECIALIST_MAX_STEPS },
    );
    return { reply: result.text };
  },
});

export const routingAgent = new Agent({
  id: 'routing-agent',
  name: 'Routing Agent',
  instructions: `
You are the front-door assistant for ernestofgaia.xyz. Classify each visitor message
and immediately delegate to the correct specialist tool. Never answer directly.

Classification -- use the FIRST match:
1. resume / portfolio / work history / CV -> reply exactly: "You can explore Ernest's work history at https://resume.ernestofgaia.xyz -- the Librarian there can walk you through specific roles and projects."
2. surf / waves / swell / tide / conditions / beach / ocean / Cape Kiwanda -> delegate-to-surf
3. consult / recruit / partner / collaborate / hire / contract -> delegate-to-recruiter
4. schedule / book / booking / appointment / availability / open slots / session / when can / next week / discovery call / did Ernest get my email / follow up / intake form / contract template / coaching agreement -> delegate-to-secretary
5. coach / learn / AI / tool / help / skill / services / pricing / hello / who is Ernest -> delegate-to-marketer
6. anything else -> delegate-to-marketer

Rules:
- Call exactly one delegate tool (or give the resume reply directly).
- Return the tool's reply verbatim -- no rewording, no added commentary.
`.trim(),
  model: 'anthropic/claude-haiku-4-5',
  tools: { delegateToMarketer, delegateToSecretary, delegateToRecruiter, delegateToSurf },
});

console.error('[mastra] agents module loaded');
