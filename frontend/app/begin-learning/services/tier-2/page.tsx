import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Tier 2: The Builder",
  description:
    "Tier 2 Builder: build real workflows with AI tools, tested before you rely on them. $110/session, 75 minutes. Custom prompts, content pipelines, and workflows for your home, hobby, or business.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/services/tier-2",
  },
};

const tier2JsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Tier 2: The Builder",
  description:
    "Build real workflows with AI tools, tested before you rely on them. 75-minute sessions covering custom prompts, content pipelines, prompt libraries, and workflows that support consistent customer service, current books, and organized projects.",
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
      prev="/begin-learning/services/tier-1"
      prevLabel="← Tier 1"
      next="/begin-learning/services/plans"
      nextLabel="Plans →"
      breadcrumbs={[
        { label: "Services", href: "/begin-learning/services" },
        { label: "Tier 2: The Builder", href: "/begin-learning/services/tier-2" },
      ]}
      jsonLd={tier2JsonLd}
    >
      <h1>Tier 2: The Builder</h1>
      <h2>Build Real Workflows with AI Tools</h2>

      <p className="eogbook-label" style={{ fontSize: "1rem", fontWeight: 700, color: "var(--cream)", letterSpacing: "normal", textTransform: "none" }}>
        <strong>$110 per session · 75 minutes · In-person or online</strong>
      </p>

      <p>
        Test and use AI tools to support how you work. This tier is for people
        ready to build real workflows the careful way — borrowing a practice
        from software development called test-driven development: nothing
        joins your business until it&apos;s been tested and proven. Build it,
        test it, trust it — then let it into your home, hobby, or business.
      </p>
      <p>
        This isn&apos;t about automating your life away. It&apos;s about
        finally being able to offer consistent customer support, stay current
        with regulations and accounting, and get organized enough for real
        project management and higher-quality service.
      </p>

      <h3>What You&apos;ll Build</h3>
      <ul>
        <li>Custom prompts written for your business and your voice</li>
        <li>Workflows that are tested before you rely on them</li>
        <li>Content pipelines — social media, email, proposals</li>
        <li>A prompt library that grows with you</li>
        <li>Connections to the documents and tools you already use</li>
      </ul>

      <h3>Tools Covered</h3>
      <p>Claude.ai Pro, ChatGPT Plus, PaperClipAI &amp; others</p>

      <h3>Best For</h3>
      <p>
        People who have the basics down and are ready to build. Small business
        owners, creators, and anyone whose week has a repetitive stretch that
        deserves a tested workflow.
      </p>

      <h3>After Each Session</h3>
      <p>
        A written recap, your updated prompt library, and one concrete
        exercise to test before next time.
      </p>

      <div className="eogbook-cta-row">
        <a href="/begin-learning/services/plans" className="cta-btn">
          See coaching plans
        </a>
        <a href="sms:+15036640546" className="cta-btn">
          Book a free handshake call
        </a>
      </div>
    </PageLayout>
  );
}
