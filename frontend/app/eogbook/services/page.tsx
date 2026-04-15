import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Three AI coaching tiers from Ernest Of Gaia: Tier 1 Foundations ($75/session), Tier 2 The Workshop ($110/session), Tier 3 Masterclass ($165/session). All coaching is personalized and 1-on-1.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/services",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ernest Of Gaia AI Coaching Service Tiers",
  description:
    "Three ways to work together: Foundations, Workshop, and Masterclass coaching tiers.",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "Tier 1: Foundations — AI Starter",
        description:
          "Get comfortable with AI. 60-minute sessions covering ChatGPT, Claude, prompting basics, Claude Projects setup, and AI safety. Best for beginners.",
        provider: { "@type": "Person", name: "Ernest Of Gaia" },
        offers: {
          "@type": "Offer",
          price: "75",
          priceCurrency: "USD",
          duration: "PT60M",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "Tier 2: The Workshop — AI Builder",
        description:
          "Build real workflows. 75-minute sessions covering custom prompts, multi-tool workflows, Claude Projects, content pipelines, and Google Workspace integrations.",
        provider: { "@type": "Person", name: "Ernest Of Gaia" },
        offers: {
          "@type": "Offer",
          price: "110",
          priceCurrency: "USD",
          duration: "PT75M",
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Tier 3: Masterclass — AI Architect",
        description:
          "Full AI operations strategy. 90-minute sessions covering multi-step automation, agentic workflows, Claude API orientation, team training, and ROI frameworks.",
        provider: { "@type": "Person", name: "Ernest Of Gaia" },
        offers: {
          "@type": "Offer",
          price: "165",
          priceCurrency: "USD",
          duration: "PT90M",
        },
      },
    },
  ],
};

export default function Services() {
  return (
    <PageLayout
      prev="/eogbook/what-i-do"
      prevLabel="← What I Do"
      next="/eogbook/how-it-works"
      nextLabel="How It Works →"
      breadcrumbs={[{ label: "Services", href: "/eogbook/services" }]}
      jsonLd={servicesJsonLd}
    >
      <h1>Services</h1>
      <h2>Three Ways to Work Together</h2>

      <p>
        Whether you&apos;re just curious about AI or ready to build workflows,
        there&apos;s a tier that fits. All coaching is personalized,
        one-on-one, and focused on what <em>you</em> need.
      </p>

      <div className="eogbook-tier-grid">
        {/* Tier 0 */}
        <div className="eogbook-tier-card">
          <div className="eogbook-tier-name">Tier 0: Free Handshake</div>
          <div className="eogbook-tier-price">Free</div>
          <div className="eogbook-tier-meta">30 min · Online · No commitment</div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", marginBottom: 0 }}>
            Talk through how you work, what AI can do for you, and whether
            coaching is the right fit.
          </p>
        </div>

        {/* Tier 1 */}
        <div className="eogbook-tier-card">
          <div className="eogbook-tier-name">
            Tier 1: Foundations
            <span className="eogbook-label" style={{ display: "inline", marginLeft: "0.5rem", fontSize: "0.7rem" }}>AI Starter</span>
          </div>
          <div className="eogbook-tier-price">$75 / session</div>
          <div className="eogbook-tier-meta">60 min · In-person or online</div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", marginBottom: 0 }}>
            Build your first AI habits. Prompting basics, Claude.ai setup,
            AI safety, and one concrete homework exercise per session.
          </p>
        </div>

        {/* Tier 2 */}
        <div className="eogbook-tier-card eogbook-tier-card--popular">
          <div className="eogbook-tier-name">
            Tier 2: The Workshop
            <span className="eogbook-badge">Most Popular</span>
          </div>
          <div className="eogbook-tier-price">$110 / session</div>
          <div className="eogbook-tier-meta">75 min · In-person or online</div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", marginBottom: 0 }}>
            Build real workflows. Custom prompts, content pipelines, Claude
            Projects, integrations with Google Workspace or Notion.
          </p>
        </div>

        {/* Tier 3 */}
        <div className="eogbook-tier-card">
          <div className="eogbook-tier-name">
            Tier 3: Masterclass
            <span className="eogbook-label" style={{ display: "inline", marginLeft: "0.5rem", fontSize: "0.7rem" }}>By Inquiry</span>
          </div>
          <div className="eogbook-tier-price">$165 / session</div>
          <div className="eogbook-tier-meta">90 min · In-person or online</div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", marginBottom: 0 }}>
            Full AI operations strategy. Automation, agentic workflows, team
            training, ROI frameworks. Available after foundational work in Tier 1 or 2.
          </p>
        </div>
      </div>

      <div className="eogbook-drilldown" aria-label="Explore individual tiers">
        <a href="/eogbook/services/tier-1" className="eogbook-drill-link">
          Explore Tier 1 Foundations details
        </a>
        <a href="/eogbook/services/tier-2" className="eogbook-drill-link">
          Explore Tier 2 Workshop details
        </a>
        <a href="/eogbook/services/tier-3" className="eogbook-drill-link">
          Explore Tier 3 Masterclass details
        </a>
        <a href="/eogbook/services/plans" className="eogbook-drill-link">
          See coaching plans and commitment options
        </a>
      </div>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
      </div>
    </PageLayout>
  );
}
