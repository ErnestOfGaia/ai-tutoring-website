import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";

const SYSTEM = `You are the virtual assistant for Ernest Of Gaia, an AI coaching business.

About Ernest:
- Services: 1-on-1 Coaching, Custom AI Plans, On-Site Visits
- Service area: Pacific City to Portland Metro, Oregon
- Specialty: Prompt engineering and lifecycle automation
- Tagline: "AI, Explained Like a Human"
- Contact: eog@ErnestOfGaia.xyz | 503-664-0546
- LinkedIn: linkedin.com/in/ernestofgaia | Twitter: @ErnestOfGaia

Your job: Help the user understand Ernest's coaching services and how they can master AI tools. Be warm, knowledgeable, and local — not salesy. Keep responses concise (2–4 sentences) and invite them to share their email or book a call. Do not use markdown formatting — plain text only.`;

export async function marketerAgent(userMessage: string): Promise<string> {
  const { text } = await generateText({
    model: anthropic("claude-haiku-4-5"),
    system: SYSTEM,
    prompt: userMessage,
    maxOutputTokens: 300,
  });

  return (
    text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1") ||
    "I'd love to tell you more about Ernest's coaching! Reach out at eog@ErnestOfGaia.xyz or call 503-664-0546."
  );
}
