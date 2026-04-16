/**
 * Chat API route — classifies intent and routes to the appropriate Mastra agent.
 *
 * Agents live in the Mastra backend (default: http://localhost:4111).
 * Set MASTRA_URL in .env to point at production.
 */

const MASTRA_URL = process.env.MASTRA_URL || "http://localhost:4111";

const FALLBACK_REPLY =
  "Happy to help! Are you interested in AI coaching, scheduling a session, or something else?";

function classifyIntent(message: string): "coaching" | "scheduling" | "jobs" | "fallback" {
  const lower = message.toLowerCase();
  if (/coach|learn|ai|tool|help|skill|train/.test(lower))                                        return "coaching";
  if (/schedul|book|appoint|meet|time|session|when|availab/.test(lower))                         return "scheduling";
  if (/job|hire|work|partner|collaborat|opportunit|collab|consult|contract|recruit/.test(lower)) return "jobs";
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
      default:
        reply = FALLBACK_REPLY;
    }

    return Response.json({ reply });
  } catch (err) {
    console.error("[chat/route] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
