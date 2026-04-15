import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";
import FaqAccordion from "../_components/FaqAccordion";

export const metadata: Metadata = {
  title: "Trust & FAQs",
  description:
    "Frequently asked questions and trust signals for Ernest Of Gaia AI coaching. Real answers about getting started, pricing, results, and the nonprofit giveback program.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/trust",
  },
};

const faqItems = [
  {
    q: "I've never used AI before. Will I be lost?",
    a: "Not at all. This is exactly what Tier 1 is for. We start with the absolute basics — what AI is, what it can and can't do, how to write a simple prompt. No prerequisites. No embarrassment. Everyone starts somewhere.",
  },
  {
    q: "Do I need to bring anything special?",
    a: "Just your actual work device (laptop or tablet) and a free account at Claude.ai or ChatGPT. I'll send setup instructions before your first session.",
  },
  {
    q: "What if I'm not sure which tier is right?",
    a: "That's what the free handshake call is for. We'll talk through your goals, your current skill level, and what you're trying to accomplish. I'll recommend the tier that fits best.",
  },
  {
    q: "Can we do this remotely?",
    a: "Yes. I prefer in-person in the Pacific City to Portland corridor, but I offer online coaching too. If you're more than an hour away, we can do your first session online to see if it's a good fit.",
  },
  {
    q: "How long until I see results?",
    a: "Most people notice a shift by their 3rd session — they're more comfortable, asking better questions, solving actual problems. By 6 sessions, workflows are running. By 12, AI is part of their daily toolkit.",
  },
  {
    q: "What if I don't have time for a full plan?",
    a: "Book single sessions as you go. No commitment. Most people start with 1–2 sessions to see how we work together, then decide if a plan makes sense.",
  },
  {
    q: "How does the nonprofit giveback actually work?",
    a: "Simple: after you complete 12 hours of paid coaching (any tier), you pick a nonprofit you care about. I contact them, schedule a free coaching session, and you can even sit in if you want. It's a way of spreading AI literacy in Oregon.",
  },
  {
    q: "Will AI take my job?",
    a: "That's a fair question, and one we'll discuss directly. Part of good coaching is honest risk awareness. AI is a tool, and like any tool, it changes what we do. The goal is to help you stay ahead of that change.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function TrustFaqs() {
  return (
    <PageLayout
      prev="/eogbook/giveback"
      prevLabel="← Nonprofit Giveback"
      next="/eogbook/get-started"
      nextLabel="Get Started →"
      breadcrumbs={[{ label: "Trust & FAQs", href: "/eogbook/trust" }]}
      jsonLd={faqJsonLd}
    >
      <h1>Trust &amp; FAQs</h1>

      <h2>What Clients Say</h2>

      <div className="eogbook-trust-signals" role="list">
        <div className="eogbook-signal" role="listitem">15+ clients coached since 2025</div>
        <div className="eogbook-signal" role="listitem">95% complete their first month</div>
        <div className="eogbook-signal" role="listitem">87% avg. homework completion</div>
        <div className="eogbook-signal" role="listitem">Free 30-min call, no credit card</div>
        <div className="eogbook-signal" role="listitem">Pacific City → Portland, Oregon</div>
      </div>

      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", fontStyle: "italic", marginBottom: "1rem" }}>
        Client testimonials coming soon. In the meantime, start with a free
        call — no commitment required.
      </p>

      <hr className="eogbook-divider" />

      <h2>Frequently Asked Questions</h2>

      <FaqAccordion items={faqItems} />

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Still have questions? Let&apos;s talk
        </a>
      </div>
    </PageLayout>
  );
}
