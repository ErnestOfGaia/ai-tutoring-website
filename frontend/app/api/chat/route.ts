/**
 * Chat API route — classifies intent and routes to the appropriate Mastra agent.
 *
 * Agents live in the Mastra backend (default: http://localhost:4111).
 * Set MASTRA_URL in .env to point at production.
 *
 * ⚠️ MIRROR of `src/mastra/agents/routingAgent.ts` (source of truth).
 * Frontend is a separate Next.js project and can't import from `src/mastra`
 * at runtime. Keep the Intent union, regex order, and keyword sets in sync
 * with that file. If you add an intent here, add it there too.
 */

const MASTRA_URL = process.env.MASTRA_URL || "http://localhost:4111";

const FALLBACK_REPLY =
  "Happy to help! Are you interested in AI coaching, scheduling a session, or something else?";

const RESUME_HANDOFF_REPLY =
  "You can explore Ernest's work history on the resume site — https://resume.ernestofgaia.xyz (opens in a new tab). The Librarian there can walk you through specific roles, skills, or projects.";

type Intent = "coaching" | "scheduling" | "jobs" | "resume" | "fallback";

function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase();
  if (/resume|portfolio|work history|background|experience|\bcv\b|\bbio\b/.test(lower))             return "resume";
  if (/coach|learn|ai|tool|help|skill|train|offer|serv|what does|what do|who is/.test(lower))      return "coaching";
  if (/job|hire|partner|collaborat|opportunit|collab|consult|contract|recruit|work with|project|rate/.test(lower))  return "jobs";
  if (/schedul|book|appoint|meet|time|session|when|availab/.test(lower))                                           return "scheduling";
  return "fallback";
}

async function callMastraAgent(agentId: string, message: string): Promise<string> {
  const res = await fetch(`${MASTRA_URL}/api/agents/${agentId}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: message }],
    }),
  });

  if (!res.ok) {
    throw new Error(`Mastra responded ${res.status} for agent "${agentId}"`);
  }

  const data = (await res.json()) as { text?: string };
  return (data.text ?? "").trim() || FALLBACK_REPLY;
}

export async function POST(req: Request) {
  try {
    const { message } = (await req.json()) as { message?: string };

    if (!message || typeof message !== "string") {
      return Response.json({ reply: FALLBACK_REPLY });
    }

    const intent = classifyIntent(message);

    let reply: string;
    switch (intent) {
      case "coaching":
        reply = await callMastraAgent("marketer-agent", message);
        break;
      case "scheduling":
        reply = await callMastraAgent("secretary-agent", message);
        break;
      case "jobs":
        reply = await callMastraAgent("recruiter-agent", message);
        break;
      case "resume":
        reply = RESUME_HANDOFF_REPLY;
        break;
      default:
        reply = FALLBACK_REPLY;
    }

    return Response.json({ reply, intent });
  } catch (err) {
    console.error("[chat/route] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
