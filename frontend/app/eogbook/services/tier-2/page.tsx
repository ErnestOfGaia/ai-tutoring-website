import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Tier 2: The Workshop — AI Builder",
  description:
    "Tier 2 Workshop: build real AI workflows. $110/session, 75 minutes. Custom prompts, content pipelines, Claude Projects, Google Workspace integrations. Most popular tier.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/services/tier-2",
  },
};

const tier2JsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tier 2: The Workshop — AI Builder",
  description:
    "Build real workflows. Make AI core to how you work. 75-minute sessions covering custom prompts, multi-tool workflows, Claude Projects, content pipelines, and integrations with Google Workspace, Notion, or Airtable.",
  provider: {
    "@type": "Person",
    name: "Ernest Of Gaia",
    url: "https://ernestofgaia.xyz",
  },
  offers: {
    "@type": "Offer",
    price: "110",
    priceCurrency: "USD",
    duration: "PT75M",
    availability: "https://schema.org/InStock",
  },
  areaServed: { "@type": "State", name: "Oregon" },
};

export default function Tier2() {
  return (
    <PageLayout
      prev="/eogbook/services/tier-1"
      prevLabel="← Tier 1"
      next="/eogbook/services/plans"
      nextLabel="Plans →"
      breadcrumbs={[
        { label: "Services", href: "/eogbook/services" },
        { label: "Tier 2: The Workshop", href: "/eogbook/services/tier-2" },
      ]}
      jsonLd={tier2JsonLd}
    >
      <h1>Tier 2: The Workshop</h1>
      <h2>AI Builder — Build Real Workflows</h2>

      <p className="eogbook-label" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "normal", textTransform: "none" }}>
        <strong>$110 per session · 75 minutes · In-person or online · ⭐ Most Popular</strong>
      </p>

      <p>
        Make AI core to how you work. This tier is for people ready to build
        real workflows, integrate AI into their business, and stop doing things
        manually that a well-designed system could handle.
      </p>

      <h3>What You&apos;ll Build</h3>
      <ul>
        <li>Custom prompts written specifically for your business and brand voice</li>
        <li>Multi-tool workflows (text, images, documents working together)</li>
        <li>Claude Projects customized for your business with persistent memory</li>
        <li>Content pipelines — social media, email, proposals, whatever you need</li>
        <li>Integrations with Google Workspace, Notion, or Airtable</li>
        <li>A growing prompt library you can reuse and refine</li>
      </ul>

      <h3>Tools Covered</h3>
      <p>
        Claude.ai Pro, ChatGPT Plus, Perplexity, Notion, Make.com (intro
        automation), Google Workspace AI
      </p>

      <h3>Best For</h3>
      <p>
        Creators, marketers, consultants, small business owners, and anyone
        ready to make AI a core part of their workflow.
      </p>

      <h3>After Each Session</h3>
      <p>
        Detailed recap, updated prompt library, workflow diagram or blueprint,
        and homework designed for your specific business.
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
