import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Tier 1: Foundations — AI Starter",
  description:
    "Tier 1 Foundations: get comfortable with AI. $75/session, 60 minutes, in-person or online. Covers ChatGPT, Claude, prompting basics, Claude Projects setup. Best for beginners.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/services/tier-1",
  },
};

const tier1JsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tier 1: Foundations — AI Starter",
  description:
    "Get comfortable with AI. Build your first habits. 60-minute sessions covering ChatGPT, Claude, prompting basics, Claude Projects setup, AI safety, and one concrete homework exercise per session.",
  provider: {
    "@type": "Person",
    name: "Ernest Of Gaia",
    url: "https://ernestofgaia.xyz",
  },
  offers: {
    "@type": "Offer",
    price: "75",
    priceCurrency: "USD",
    duration: "PT60M",
    availability: "https://schema.org/InStock",
  },
  areaServed: { "@type": "State", name: "Oregon" },
};

export default function Tier1() {
  return (
    <PageLayout
      prev="/eogbook/services"
      prevLabel="← Services"
      next="/eogbook/services/tier-2"
      nextLabel="Tier 2 →"
      breadcrumbs={[
        { label: "Services", href: "/eogbook/services" },
        { label: "Tier 1: Foundations", href: "/eogbook/services/tier-1" },
      ]}
      jsonLd={tier1JsonLd}
    >
      <h1>Tier 1: Foundations</h1>
      <h2>AI Starter — Get Comfortable with AI</h2>

      <p className="eogbook-label" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "normal", textTransform: "none" }}>
        <strong>$75 per session · 60 minutes · In-person or online</strong>
      </p>

      <p>
        Build your first AI habits. This tier is for people with little to no
        AI experience. No prerequisites. No embarrassment. Everyone starts
        somewhere.
      </p>

      <h3>What You&apos;ll Learn</h3>
      <ul>
        <li>How ChatGPT and Claude actually work</li>
        <li>How to write prompts that get results</li>
        <li>What AI safety and hallucinations mean (and why it matters)</li>
        <li>How to set up your free Claude.ai account</li>
        <li>How to organize your work using Claude Projects</li>
        <li>One concrete homework exercise to practice before your next session</li>
      </ul>

      <h3>Tools Covered</h3>
      <p>Claude.ai, ChatGPT, Google Gemini, basic Notion AI</p>

      <h3>Best For</h3>
      <p>
        Beginners with little to no AI experience. Solopreneurs. Small retail,
        hospitality, or service business owners. Anyone who&apos;s heard of AI
        but hasn&apos;t made it work yet.
      </p>

      <h3>After Your First Session</h3>
      <p>
        Within 24 hours, you&apos;ll get: a written recap of what we covered, a
        custom homework template, and a clear picture of where you&apos;re
        starting and where we&apos;re headed.
      </p>

      <div className="eogbook-cta-row">
        <a href="/eogbook/services/plans" className="back-btn">
          See coaching plans
        </a>
        <a href="tel:+15036640546" className="cta-btn">
          Book a free handshake call
        </a>
      </div>
    </PageLayout>
  );
}
