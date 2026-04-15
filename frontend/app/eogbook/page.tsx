import type { Metadata } from "next";
import Link from "next/link";
import NavigationButtons from "./_components/NavigationButtons";

export const metadata: Metadata = {
  title: "EOGbook — Ernest Of Gaia AI Coaching",
  description:
    "AI That Actually Works for Your Real Life. Explore Ernest Of Gaia's AI coaching services: who I am, what I do, service tiers, how it works, nonprofit giveback, FAQs, and getting started.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ernest Of Gaia",
  description:
    "AI coaching for non-technical people in Oregon. 1-on-1 personalized coaching across three service tiers: Foundations, Workshop, and Masterclass.",
  url: "https://ernestofgaia.xyz",
  telephone: "+1-503-664-0546",
  email: "eog@ernestofgaia.xyz",
  areaServed: {
    "@type": "State",
    name: "Oregon",
  },
  address: {
    "@type": "PostalAddress",
    addressRegion: "Oregon",
    addressLocality: "Pacific City",
  },
  service: [
    {
      "@type": "Service",
      name: "Tier 1: Foundations",
      description:
        "AI Starter coaching for beginners with little to no AI experience. 60-minute sessions covering basics, prompting, and Claude.ai setup.",
      provider: { "@type": "Person", name: "Ernest Of Gaia" },
      offers: {
        "@type": "Offer",
        price: "75",
        priceCurrency: "USD",
        duration: "PT60M",
      },
    },
    {
      "@type": "Service",
      name: "Tier 2: The Workshop",
      description:
        "AI Builder coaching for creators and business owners. 75-minute sessions focusing on custom workflows, integrations, and content pipelines.",
      provider: { "@type": "Person", name: "Ernest Of Gaia" },
      offers: {
        "@type": "Offer",
        price: "110",
        priceCurrency: "USD",
        duration: "PT75M",
      },
    },
    {
      "@type": "Service",
      name: "Tier 3: Masterclass",
      description:
        "AI Architect coaching for founders and operations leads. 90-minute sessions on full AI operations strategy, automation, and team rollout.",
      provider: { "@type": "Person", name: "Ernest Of Gaia" },
      offers: {
        "@type": "Offer",
        price: "165",
        priceCurrency: "USD",
        duration: "PT90M",
      },
    },
  ],
};

const tiles = [
  {
    num: "01",
    title: "Who Is Ernest",
    desc: "Learn my story, approach, and philosophy",
    href: "/eogbook/who-is-ernest",
  },
  {
    num: "02",
    title: "What I Do",
    desc: "Plain English AI coaching & lifelong learning",
    href: "/eogbook/what-i-do",
  },
  {
    num: "03",
    title: "Services",
    desc: "Three tiers, customized to your goals",
    href: "/eogbook/services",
  },
  {
    num: "04",
    title: "How It Works",
    desc: "Five steps from handshake to results",
    href: "/eogbook/how-it-works",
  },
  {
    num: "05",
    title: "Nonprofit Giveback",
    desc: "Your coaching, your community",
    href: "/eogbook/giveback",
  },
  {
    num: "06",
    title: "Trust & FAQs",
    desc: "Real answers, real trust signals",
    href: "/eogbook/trust",
  },
  {
    num: "07",
    title: "Get Started",
    desc: "Contact me and book your free call",
    href: "/eogbook/get-started",
  },
];

export default function EOGbookHome() {
  return (
    <div className="card-content eogbook-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      <div className="eogbook-content">
        <p className="eyebrow" style={{ textAlign: "left", marginBottom: "0.4rem" }}>
          Ernest Of Gaia · AI Coaching
        </p>

        <h1>AI That Actually Works for Your Real Life</h1>

        <h2>Explore the coaching experience</h2>

        <p>
          Seven pages. Everything you need to know about working with me — from
          my story to how to book your first free call.
        </p>

        <nav
          className="eogbook-tiles"
          aria-label="EOGbook pages"
        >
          {tiles.map((tile) => (
            <Link
              key={tile.href}
              href={tile.href}
              className="eogbook-tile"
              aria-label={`${tile.title}: ${tile.desc}`}
            >
              <span className="eogbook-tile-num">{tile.num}</span>
              <span className="eogbook-tile-title">{tile.title}</span>
              <span className="eogbook-tile-desc">{tile.desc}</span>
            </Link>
          ))}
        </nav>

        <div className="eogbook-cta-row">
          <a href="tel:+15036640546" className="cta-btn">
            Start with a free call
          </a>
        </div>
      </div>

      <NavigationButtons next="/eogbook/who-is-ernest" nextLabel="Who Is Ernest →" />
    </div>
  );
}
