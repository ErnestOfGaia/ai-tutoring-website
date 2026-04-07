import { marketerAgent } from "@/lib/agents/marketerAgent";
import { secretaryAgent } from "@/lib/agents/secretaryAgent";
import { recruiterAgent } from "@/lib/agents/recruiterAgent";

function classifyIntent(message: string): "coaching" | "scheduling" | "jobs" | "fallback" {
  const lower = message.toLowerCase();
  if (/coach|learn|ai|tool|help|skill|train/.test(lower)) return "coaching";
  if (/schedul|book|appoint|meet|time|session|when|availab/.test(lower)) return "scheduling";
  if (/job|hire|work|partner|collaborat|opportunit|collab/.test(lower)) return "jobs";
  return "fallback";
}

const FALLBACK_REPLY =
  "Happy to help! Are you interested in AI coaching, scheduling a session, or something else?";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return Response.json({ reply: FALLBACK_REPLY });
    }

    const intent = classifyIntent(message);

    let reply: string;
    switch (intent) {
      case "coaching":
        reply = await marketerAgent(message);
        break;
      case "scheduling":
        reply = await secretaryAgent(message);
        break;
      case "jobs":
        reply = await recruiterAgent(message);
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
