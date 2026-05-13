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

    console.error("[chat/route] incoming message:", message.slice(0, 200));

    const res = await fetch(`${MASTRA_URL}/api/agents/routing-agent/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, maxSteps: 5 }),
    });

    if (!res.ok) {
      const errBody = await res.text().catch(() => "<no body>");
      console.error(`[chat/route] Mastra non-OK ${res.status}:`, errBody.slice(0, 1000));
      throw new Error(`Mastra responded ${res.status}`);
    }

    const data = (await res.json()) as {
      text?: string;
      toolCalls?: unknown[];
      toolResults?: unknown[];
      finishReason?: string;
    };

    console.error(
      "[chat/route] mastra response — finishReason:",
      data.finishReason,
      "toolCalls:",
      JSON.stringify(data.toolCalls ?? []),
      "text:",
      (data.text ?? "").slice(0, 300),
    );

    const reply = (data.text ?? "").trim() || FALLBACK_REPLY;

    return Response.json({ reply });
  } catch (err) {
    console.error("[chat/route] error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
