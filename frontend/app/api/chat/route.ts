/**
 * Chat API route — forwards visitor messages to the Mastra routing-agent.
 *
 * All intent classification and specialist delegation happens inside Mastra.
 * This route is intentionally thin: validate input, call one agent, return reply.
 */

const MASTRA_URL = process.env.MASTRA_URL || "http://localhost:4111";

const FALLBACK_REPLY =
  "Happy to help! Are you interested in AI coaching, scheduling a session, or something else?";

export async function POST(req: Request) {
  try {
    const { message, history = [] } = (await req.json()) as {
      message?: string;
      history?: Array<{ role: "user" | "assistant"; content: string }>;
    };

    if (!message || typeof message !== "string") {
      return Response.json({ reply: FALLBACK_REPLY });
    }

    const messages = history.length > 0
      ? [...history, { role: "user", content: message }]
      : [{ role: "user", content: message }];

    const res = await fetch(`${MASTRA_URL}/api/agents/routing-agent/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!res.ok) {
      throw new Error(`Mastra responded ${res.status}`);
    }

    const data = (await res.json()) as { text?: string };
    const reply = (data.text ?? "").trim() || FALLBACK_REPLY;

    return Response.json({ reply });
  } catch (err) {
    console.error("[chat/route] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
