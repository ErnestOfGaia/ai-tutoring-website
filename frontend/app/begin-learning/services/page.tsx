import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI coaching tiers from Ernest Of Gaia: Tier 1 Foundations ($75/session), Tier 2 The Builder ($110/session). All coaching is personalized and 1-on-1.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/services",
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Ernest Of Gaia AI Coaching Service Tiers",
  description:
    "Ways to work together: Foundations and Builder coaching tiers.",
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
        name: "Tier 2: The Builder",
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
  ],
};

export default function Services() {
  return (
    <PageLayout
      prev="/begin-learning/what-i-do"
      prevLabel="← What I Do"
      next="/begin-learning/how-it-works"
      nextLabel="How It Works →"
      breadcrumbs={[{ label: "Services", href: "/begin-learning/services" }]}
      jsonLd={servicesJsonLd}
    >
      <h1>Services</h1>
      <h2>Two Ways to Work Together</h2>

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
            <span className="eogbook-tier-tag">AI Starter</span>
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
            Tier 2: The Builder
          </div>
          <div className="eogbook-tier-price">$110 / session</div>
          <div className="eogbook-tier-meta">75 min · In-person or online</div>
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", marginBottom: 0 }}>
            Build real workflows, tested before you rely on them. Custom
            prompts, content pipelines, and a prompt library that grows with
            you.
          </p>
        </div>

      </div>

      <div className="eogbook-drilldown" aria-label="Explore individual tiers">
        <a href="/begin-learning/services/tier-1" className="eogbook-drill-link">
          Explore Tier 1 Foundations details
        </a>
        <a href="/begin-learning/services/tier-2" className="eogbook-drill-link">
          Explore Tier 2 Builder details
        </a>
        <a href="/begin-learning/services/plans" className="eogbook-drill-link">
          See coaching plans and commitment options
        </a>
        <a href="/begin-learning/services/last-mile" className="eogbook-drill-link">
          Website almost done but stuck? Last Mile Website Development
        </a>
      </div>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=eog%40ernestofgaia.xyz`}
          className="cta-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Email instead
        </a>
      </div>
    </PageLayout>
  );
}
