import type { Metadata } from "next";
import Link from "next/link";
import NavigationButtons from "./_components/NavigationButtons";

export const metadata: Metadata = {
  title: "Begin Learning — Ernest Of Gaia AI Coaching",
  description:
    "AI for your Home, Hobby, or Business. Explore Ernest Of Gaia's AI coaching: who I am, what I do, service tiers, how it works, nonprofit giveback, FAQs, and getting started.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ernest Of Gaia",
  description:
    "A human-centered approach to AI. Personalized 1-on-1 coaching for your home, hobby, or business — Foundations and Builder tiers, plus Last Mile website development for Oregon small businesses.",
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
      name: "Tier 2: The Builder",
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
  ],
};

const tiles: {
  num: string;
  title: string;
  desc: string;
  href: string;
  external?: boolean;
}[] = [
  {
    num: "01",
    title: "Who Is Ernest",
    desc: "Learn my story, approach, and philosophy",
    href: "/begin-learning/who-is-ernest",
  },
  {
    num: "02",
    title: "What I Do",
    desc: "Plain English AI coaching & lifelong learning",
    href: "/begin-learning/what-i-do",
  },
  {
    num: "03",
    title: "Services",
    desc: "Coaching tiers, plans & Last Mile web development",
    href: "/begin-learning/services",
  },
  {
    num: "04",
    title: "How It Works",
    desc: "Five steps from handshake to results",
    href: "/begin-learning/how-it-works",
  },
  {
    num: "05",
    title: "Nonprofit Giveback",
    desc: "Your coaching, your community",
    href: "/begin-learning/giveback",
  },
  {
    num: "06",
    title: "Trust & FAQs",
    desc: "What I believe about learning, plus real answers",
    href: "/begin-learning/trust",
  },
  {
    num: "07",
    title: "Get Started",
    desc: "Contact me and book your free call",
    href: "/begin-learning/get-started",
  },
  {
    num: "08",
    title: "The Blog",
    desc: "Notes on building, learning & putting AI to work",
    href: "/blog",
    external: true,
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

        <h1>AI for your Home, Hobby, or Business</h1>

        <h2>Explore the coaching experience</h2>

        <p>
          Eight pages. Everything you need to know about working with me — from
          my story to how to book your first free call — plus the blog.
        </p>

        <nav
          className="eogbook-tiles"
          aria-label="EOGbook pages"
        >
          {tiles.map((tile) => {
            const inner = (
              <>
                <span className="eogbook-tile-num">{tile.num}</span>
                <span className="eogbook-tile-title">{tile.title}</span>
                <span className="eogbook-tile-desc">{tile.desc}</span>
              </>
            );
            // The Blog lives in a separate container at /blog (via NPM), not a route
            // in this app — use a plain anchor for a real navigation.
            return tile.external ? (
              <a
                key={tile.href}
                href={tile.href}
                className="eogbook-tile"
                aria-label={`${tile.title}: ${tile.desc}`}
              >
                {inner}
              </a>
            ) : (
              <Link
                key={tile.href}
                href={tile.href}
                className="eogbook-tile"
                aria-label={`${tile.title}: ${tile.desc}`}
              >
                {inner}
              </Link>
            );
          })}
        </nav>

        <div className="eogbook-cta-row">
          <a href="sms:+15036640546" className="cta-btn">
            Start with a free call
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
      </div>

      <NavigationButtons next="/begin-learning/who-is-ernest" nextLabel="Who Is Ernest →" />
    </div>
  );
}
