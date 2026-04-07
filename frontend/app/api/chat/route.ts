function classify(message: string): string {
  const lower = message.toLowerCase();
  if (/coach|learn|ai|tool|help|skill|train/.test(lower)) {
    return "I'd love to help you explore AI coaching! Ernest offers 1-on-1 sessions, custom plans, and on-site visits across the Pacific City to Portland Metro area. What aspect of AI are you looking to master?";
  }
  if (/schedul|book|appoint|meet|time|session|when|availab/.test(lower)) {
    return "I can help schedule a session — what days work for you?";
  }
  if (/job|hire|work|partner|collaborat|opportunit|collab/.test(lower)) {
    return "Ernest is open to collaboration — tell me more about what you have in mind.";
  }
  return "Happy to help! Are you interested in coaching, scheduling, or something else?";
}

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const reply = classify(message as string);
    return Response.json({ reply });
  } catch {
    return new Response("Internal Server Error", { status: 500 });
  }
}
