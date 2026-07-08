import type { NextRequest } from "next/server";

const eogbookData = {
  siteUrl: "https://ernestofgaia.xyz",
  eogbookRoot: "/begin-learning",
  lastUpdated: "2026-07-06",
  description:
    "Ernest Of Gaia — a human-centered approach to AI. Personalized 1-on-1 coaching for your home, hobby, or business, plus Last Mile website development for Oregon small businesses.",
  contact: {
    telephone: "+1-503-664-0546",
    textPreferred: true,
    email: "eog@ernestofgaia.xyz",
    linkedin: "https://linkedin.com/in/ernestofgaia",
    youtube: "https://www.youtube.com/@ErnestOfGaia",
    areaServed: "Pacific City to Portland, Oregon & the I-5 Corridor",
    responseTime: "Within 48 hours of first message",
  },
  services: [
    {
      id: "tier-0",
      name: "Tier 0: Free Handshake Session",
      price: 0,
      duration: "30 minutes",
      format: "Online",
      description:
        "Free 30-minute conversation to discuss your goals and whether coaching is the right fit.",
      url: "/begin-learning/how-it-works/step-1",
    },
    {
      id: "tier-1",
      name: "Tier 1: Foundations — AI Starter",
      price: 75,
      priceCurrency: "USD",
      duration: "60 minutes",
      format: "In-person or online",
      description:
        "Get comfortable with AI. Prompting basics, Claude.ai setup, AI safety. Best for beginners.",
      url: "/begin-learning/services/tier-1",
    },
    {
      id: "tier-2",
      name: "Tier 2: The Builder",
      price: 110,
      priceCurrency: "USD",
      duration: "75 minutes",
      format: "In-person or online",
      description:
        "Build real workflows with AI tools, tested before you rely on them. Custom prompts, content pipelines, a prompt library that grows with you.",
      url: "/begin-learning/services/tier-2",
    },
    {
      id: "last-mile",
      name: "Last Mile Website Development",
      price: null,
      pricing: "Flat quote after a free site audit",
      format: "Remote or on-site (Oregon)",
      description:
        "Finishing service for websites that are 80-90% done: broken forms, placeholder copy, missing SEO tags, mobile bugs, stalled launches. Free audit, flat quote, no lock-in.",
      url: "/begin-learning/services/last-mile",
    },
  ],
  plans: [
    {
      name: "Pay as you go",
      duration: "Flexible",
      cadence: "You set it",
      savings: null,
      giveback: "Earned every 12 hours of paid coaching",
    },
    {
      name: "Habit",
      duration: "3 months",
      cadence: "Typically weekly — set together at the free call",
      savings: null,
      giveback: "1 free nonprofit session",
    },
    {
      name: "Rhythm",
      duration: "6 months",
      cadence: "Typically weekly — set together at the free call",
      savings: "5% off",
      giveback: "2 free nonprofit sessions",
    },
    {
      name: "Craft",
      duration: "9 months",
      cadence: "Typically weekly — set together at the free call",
      savings: "10% off",
      giveback: "3 free nonprofit sessions",
    },
  ],
  journey: [
    {
      step: 1,
      title: "Free Handshake Call",
      description:
        "Free 30-minute online conversation about your goals and whether coaching is right for you.",
      url: "/begin-learning/how-it-works/step-1",
    },
    {
      step: 2,
      title: "Choose Your Tier",
      description:
        "Based on the handshake call, agree on the right tier. Most people start with a single session.",
      url: "/begin-learning/how-it-works/step-2",
    },
    {
      step: 3,
      title: "Your First Real Session",
      description:
        "Hands-on session on your actual device. Within 24 hours: written recap, custom prompts, homework.",
      url: "/begin-learning/how-it-works/step-3",
    },
    {
      step: 4,
      title: "Build Your Skills Over Time",
      description:
        "Sessions follow check-in, build, wrap rhythm. Move at your pace.",
      url: "/begin-learning/how-it-works/step-4-5",
    },
    {
      step: 5,
      title: "See Real Results",
      description:
        "Faster than you'd expect for confidence; slower than you'd hope for fluency. Comfort comes early; tested workflows over a couple of months; within a season, AI is part of the daily toolkit.",
      url: "/begin-learning/how-it-works/step-4-5",
    },
  ],
  faqs: [
    {
      question: "I've never used AI before. Will I be lost?",
      answer:
        "Not at all. This is exactly what Tier 1 is for. We start with the absolute basics — what AI is, what it can and can't do, how to write a simple prompt. No prerequisites. No embarrassment. Everyone starts somewhere.",
      url: "/begin-learning/trust",
    },
    {
      question: "Do I need to bring anything special?",
      answer:
        "Just your actual work device (laptop or tablet) and a free account at Claude.ai or ChatGPT. I'll send setup instructions before your first session.",
      url: "/begin-learning/trust",
    },
    {
      question: "What if I'm not sure which tier is right?",
      answer:
        "That's what the free handshake call is for. We'll talk through your goals, your current skill level, and what you're trying to accomplish. I'll recommend the tier that fits best.",
      url: "/begin-learning/trust",
    },
    {
      question: "Can we do this remotely?",
      answer:
        "Yes. I prefer in-person in the Pacific City to Portland corridor, but I offer online coaching too.",
      url: "/begin-learning/trust",
    },
    {
      question: "How long until I see results?",
      answer:
        "Faster than you'd expect for confidence; slower than you'd hope for fluency. The first few sessions shift something; workflows come together over a couple of months of regular practice; within a season, AI is usually part of the daily toolkit — if you use what we cover between sessions.",
      url: "/begin-learning/trust",
    },
    {
      question: "What if I don't have time for a full plan?",
      answer:
        "Book single sessions as you go. No commitment required.",
      url: "/begin-learning/trust",
    },
    {
      question: "How does the nonprofit giveback actually work?",
      answer:
        "After 12 hours of paid coaching, you pick the nonprofit — I reach out and set up the session, in person or online, and you can sit in. No nonprofit in mind? Your hours can roll into Ernest's volunteer work with Team Rubicon, where he's been a Grey Shirt for a decade.",
      url: "/begin-learning/giveback",
    },
    {
      question: "Will AI take my job?",
      answer:
        "It doesn't have to. Most of it depends on what you do next. The real question is a risk-management one, and the way through is a cycle: study, learn, try, evaluate. No fear-selling here — come curious, not anxious.",
      url: "/begin-learning/trust",
    },
  ],
  pages: [
    { title: "Home Directory", url: "/begin-learning", priority: 1.0 },
    { title: "Who Is Ernest", url: "/begin-learning/who-is-ernest", priority: 0.9 },
    { title: "What I Do", url: "/begin-learning/what-i-do", priority: 0.9 },
    { title: "Services", url: "/begin-learning/services", priority: 0.9 },
    { title: "Last Mile Website Development", url: "/begin-learning/services/last-mile", priority: 0.8 },
    { title: "How It Works", url: "/begin-learning/how-it-works", priority: 0.9 },
    { title: "Nonprofit Giveback", url: "/begin-learning/giveback", priority: 0.8 },
    { title: "Trust & FAQs", url: "/begin-learning/trust", priority: 0.8 },
    { title: "Get Started", url: "/begin-learning/get-started", priority: 0.9 },
  ],
};

export function GET(_request: NextRequest) {
  return Response.json(eogbookData, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
