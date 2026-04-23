// SOURCE OF TRUTH for Router intent classification.
//
// The live Router lives in `frontend/app/api/chat/route.ts` because the
// frontend is a separate Next.js app (separate tsconfig + package.json), so it
// can't import from `src/mastra` at runtime without bundler gymnastics.
//
// Rule: `chat/route.ts` MUST mirror the `Intent` union, the regex order, and
// the keyword sets below. When you change anything here, update that file too.
// Any intent added here without an accompanying branch in `chat/route.ts` is
// a bug.

export type Intent = "coaching" | "scheduling" | "jobs" | "resume" | "fallback";

const RESPONSES: Record<Intent, string> = {
  coaching:
    "I'd love to help you explore AI coaching! Ernest offers 1-on-1 sessions, custom plans, and on-site visits across the Pacific City to Portland Metro area. What aspect of AI are you looking to master?",
  scheduling: "I can help schedule a session — what days work for you?",
  jobs: "Ernest is open to collaboration — tell me more about what you have in mind.",
  resume:
    "You can explore Ernest's work history on the resume site — https://resume.ernestofgaia.xyz (opens in a new tab). The Librarian there can walk you through specific roles, skills, or projects.",
  fallback: "Happy to help! Are you interested in coaching, scheduling, or something else?",
};

export function classifyIntent(message: string): Intent {
  const lower = message.toLowerCase();
  if (/resume|portfolio|work history|background|experience|\bcv\b|\bbio\b/.test(lower))             return "resume";
  if (/consult|collaborat|\bpartner\b|recruit|contract|\bhire\b|automat.*project|project.*automat/.test(lower))  return "jobs";   // unambiguous B2B — before coaching
  if (/coach|learn|\bai\b|tool|help|skill|train|offer|serv|what does|what do you|what is|who is|automat|website|hello|cost|pric|how much|fee|tier|competitor|compar|versus|\bvs\b|cheaper|cheapest|alternativ/.test(lower))      return "coaching";
  if (/job|opportunit|collab|work with|project|rate/.test(lower))                                   return "jobs";   // remaining jobs keywords
  if (/schedul|book|appoint|meet|time|session|when|availab|evening|morning|afternoon|online|virtual|remote|lock|confirm|finalize|detail/.test(lower))                                           return "scheduling";
  return "fallback";
}

export function getRoutingResponse(message: string): string {
  return RESPONSES[classifyIntent(message)];
}
