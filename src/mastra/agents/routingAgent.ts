// Stub keyword classifier — will be replaced with LLM routing in a later sprint day.
// The API route (frontend/app/api/chat/route.ts) uses its own inline copy until
// Mastra is exposed as an HTTP service and the route calls it via fetch.

export type Intent = "coaching" | "scheduling" | "jobs" | "fallback";

const RESPONSES: Record<Intent, string> = {
  coaching:
    "I'd love to help you explore AI coaching! Ernest offers 1-on-1 sessions, custom plans, and on-site visits across the Pacific City to Portland Metro area. What aspect of AI are you looking to master?",
  scheduling: "I can help schedule a session — what days work for you?",
  jobs: "Ernest is open to collaboration — tell me more about what you have in mind.",
  fallback: "Happy to help! Are you interested in coaching, scheduling, or something else?",
};

export function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase();
  if (/coach|learn|ai|tool|help|skill|train/.test(lower)) return "coaching";
  if (/schedul|book|appoint|meet|time|session|when|availab/.test(lower)) return "scheduling";
  if (/job|hire|work|partner|collaborat|opportunit|collab/.test(lower)) return "jobs";
  return "fallback";
}

export function getRoutingResponse(message: string): string {
  return RESPONSES[classifyIntent(message)];
}
