import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Tier 3: Masterclass — AI Architect",
  description:
    "Tier 3 Masterclass: full AI operations strategy. $165/session, 90 minutes. Available by inquiry after foundational work in Tier 1 or 2. For founders and operations leads.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/services/tier-3",
  },
};

const tier3JsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tier 3: Masterclass — AI Architect",
  description:
    "Full AI operations strategy for your entire business. 90-minute sessions covering multi-step automation, agentic workflows, Claude API orientation, team rollout planning, and ROI measurement. Available by special inquiry after Tier 1 or 2.",
  provider: {
    "@type": "Person",
    name: "Ernest Of Gaia",
    url: "https://ernestofgaia.xyz",
  },
  offers: {
    "@type": "Offer",
    price: "165",
    priceCurrency: "USD",
    duration: "PT90M",
    availability: "https://schema.org/LimitedAvailability",
  },
  areaServed: { "@type": "State", name: "Oregon" },
};

export default function Tier3() {
  return (
    <PageLayout
      prev="/eogbook/services/tier-2"
      prevLabel="← Tier 2"
      next="/eogbook/services/plans"
      nextLabel="Coaching Plans →"
      breadcrumbs={[
        { label: "Services", href: "/eogbook/services" },
        { label: "Tier 3: Masterclass", href: "/eogbook/services/tier-3" },
      ]}
      jsonLd={tier3JsonLd}
    >
      <h1>Tier 3: Masterclass</h1>
      <h2>AI Architect — Full Operations Strategy</h2>

      <p className="eogbook-label" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--teal)", letterSpacing: "normal", textTransform: "none" }}>
        <strong>$165 per session · 90 minutes · Available by special inquiry</strong>
      </p>

      <p>
        This tier is for founders, operations leads, and business owners
        embedding AI across entire departments or teams. It requires
        foundational work in Tier 1 or 2 first.
      </p>

      <h3>What&apos;s Included</h3>
      <ul>
        <li>Full AI operations strategy for your entire business</li>
        <li>Multi-step automation and agentic workflows</li>
        <li>Claude API orientation (no coding required)</li>
        <li>Rollout planning and team training</li>
        <li>ROI measurement frameworks</li>
      </ul>

      <h3>Best For</h3>
      <p>
        Founders, operations leads, and business owners ready to embed AI
        across entire departments or teams. This tier requires completing
        foundational work in Tier 1 or 2 — we&apos;ll determine together
        whether this is the right fit for your goals.
      </p>

      <h3>How to Access Tier 3</h3>
      <p>
        Start with the free handshake call. If you&apos;re new to AI coaching,
        we&apos;ll begin with Tier 1 or 2 and move to Masterclass when the
        foundation is in place.
      </p>

      <div className="eogbook-cta-row">
        <a href="/eogbook/services/plans" className="back-btn">
          See coaching plans
        </a>
        <a href="tel:+15036640546" className="cta-btn">
          Inquire about Masterclass
        </a>
      </div>
    </PageLayout>
  );
}
