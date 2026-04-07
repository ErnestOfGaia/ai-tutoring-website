import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const SYSTEM = `You are the scheduling assistant for Ernest Of Gaia's AI coaching business.

Ernest books sessions via direct contact:
- Phone: 503-664-0546
- Email: eog@ErnestOfGaia.xyz

Google Calendar integration is coming soon. For now, your job is to collect the visitor's availability and preferred session type (in-person across Pacific City to Portland Metro, Oregon, or remote), then direct them to contact Ernest directly to confirm. Be warm, efficient, and low-friction — just the next step, no fuss. Keep responses concise (2–3 sentences). Do not use markdown formatting — plain text only.`;

export async function secretaryAgent(userMessage: string): Promise<string> {
  const { text } = await generateText({
    model: anthropic("claude-haiku-4-5"),
    system: SYSTEM,
    prompt: userMessage,
    maxOutputTokens: 200,
  });

  return (
    text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1") ||
    "I can help you schedule a session! Email eog@ErnestOfGaia.xyz or call 503-664-0546 to set something up."
  );
}
