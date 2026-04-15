import type { NextRequest } from "next/server";

const eogbookData = {
  siteUrl: "https://ernestofgaia.xyz",
  eogbookRoot: "/eogbook",
  lastUpdated: "2026-04-15",
  description:
    "Ernest Of Gaia — AI coaching for non-technical people in Oregon. 1-on-1 personalized coaching across three service tiers.",
  contact: {
    telephone: "+1-503-664-0546",
    email: "eog@ernestofgaia.xyz",
    linkedin: "https://linkedin.com/in/ernestofgaia",
    twitter: "https://x.com/ErnestOfGaia",
    areaServed: "Pacific City to Portland, Oregon",
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
      url: "/eogbook/how-it-works/step-1",
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
      url: "/eogbook/services/tier-1",
    },
    {
      id: "tier-2",
      name: "Tier 2: The Workshop — AI Builder",
      price: 110,
      priceCurrency: "USD",
      duration: "75 minutes",
      format: "In-person or online",
      popular: true,
      description:
        "Build real workflows. Custom prompts, content pipelines, multi-tool integrations.",
      url: "/eogbook/services/tier-2",
    },
  ],
  plans: [
    {
      name: "Pay as you go",
      duration: "Flexible",
      sessions: "1–2",
      savings: null,
      bonus: null,
    },
    {
      name: "Launch Plan",
      duration: "3 months",
      sessions: 12,
      savings: null,
      bonus: "1 free nonprofit session",
    },
    {
      name: "Growth Plan",
      duration: "6 months",
      sessions: 24,
      savings: "5% off",
      bonus: "2 free nonprofit sessions",
    },
    {
      name: "Transformation Plan",
      duration: "9 months",
      sessions: 36,
      savings: "10% off",
      bonus: "3 free nonprofit sessions",
    },
  ],
  journey: [
    {
      step: 1,
      title: "Free Handshake Call",
      description:
        "Free 30-minute online conversation about your goals and whether coaching is right for you.",
      url: "/eogbook/how-it-works/step-1",
    },
    {
      step: 2,
      title: "Choose Your Tier",
      description:
        "Based on the handshake call, agree on the right tier. Most people start with a single session.",
      url: "/eogbook/how-it-works/step-2",
    },
    {
      step: 3,
      title: "Your First Real Session",
      description:
        "Hands-on session on your actual device. Within 24 hours: written recap, custom prompts, homework.",
      url: "/eogbook/how-it-works/step-3",
    },
    {
      step: 4,
      title: "Build Your Skills Over Time",
      description:
        "Sessions follow check-in, build, wrap rhythm. Move at your pace.",
      url: "/eogbook/how-it-works/step-4-5",
    },
    {
      step: 5,
      title: "See Real Results",
      description:
        "By session 3–4: comfortable and solving real problems. By 12 sessions: AI in your daily toolkit.",
      url: "/eogbook/how-it-works/step-4-5",
    },
  ],
  faqs: [
    {
      question: "I've never used AI before. Will I be lost?",
      answer:
        "Not at all. This is exactly what Tier 1 is for. We start with the absolute basics — what AI is, what it can and can't do, how to write a simple prompt. No prerequisites. No embarrassment. Everyone starts somewhere.",
      url: "/eogbook/trust",
    },
    {
      question: "Do I need to bring anything special?",
      answer:
        "Just your actual work device (laptop or tablet) and a free account at Claude.ai or ChatGPT. I'll send setup instructions before your first session.",
      url: "/eogbook/trust",
    },
    {
      question: "What if I'm not sure which tier is right?",
      answer:
        "That's what the free handshake call is for. We'll talk through your goals, your current skill level, and what you're trying to accomplish. I'll recommend the tier that fits best.",
      url: "/eogbook/trust",
    },
    {
      question: "Can we do this remotely?",
      answer:
        "Yes. I prefer in-person in the Pacific City to Portland corridor, but I offer online coaching too.",
      url: "/eogbook/trust",
    },
    {
      question: "How long until I see results?",
      answer:
        "Most people notice a shift by their 3rd session. By 6 sessions, workflows are running. By 12, AI is part of their daily toolkit.",
      url: "/eogbook/trust",
    },
    {
      question: "What if I don't have time for a full plan?",
      answer:
        "Book single sessions as you go. No commitment required.",
      url: "/eogbook/trust",
    },
    {
      question: "How does the nonprofit giveback actually work?",
      answer:
        "After 12 hours of paid coaching, you nominate a nonprofit. I contact them, schedule a free coaching session, and you can attend if you want.",
      url: "/eogbook/giveback",
    },
    {
      question: "Will AI take my job?",
      answer:
        "That's a fair question we discuss directly. AI is a tool — the goal is to help you stay ahead of that change.",
      url: "/eogbook/trust",
    },
  ],
  pages: [
    { title: "Home Directory", url: "/eogbook", priority: 1.0 },
    { title: "Who Is Ernest", url: "/eogbook/who-is-ernest", priority: 0.9 },
    { title: "What I Do", url: "/eogbook/what-i-do", priority: 0.9 },
    { title: "Services", url: "/eogbook/services", priority: 0.9 },
    { title: "How It Works", url: "/eogbook/how-it-works", priority: 0.9 },
    { title: "Nonprofit Giveback", url: "/eogbook/giveback", priority: 0.8 },
    { title: "Trust & FAQs", url: "/eogbook/trust", priority: 0.8 },
    { title: "Get Started", url: "/eogbook/get-started", priority: 0.9 },
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
