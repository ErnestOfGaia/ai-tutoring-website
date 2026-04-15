import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Who Is Ernest",
  description:
    "Ernest Of Gaia is a local AI coach helping non-technical people in Oregon understand and use AI tools practically. Plain English, no jargon, no hype.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/who-is-ernest",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ernest Of Gaia",
  jobTitle: "AI Coach",
  description:
    "Local AI coach helping non-technical people in Oregon use AI tools practically through personalized 1-on-1 coaching.",
  url: "https://ernestofgaia.xyz",
  telephone: "+1-503-664-0546",
  email: "eog@ernestofgaia.xyz",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Oregon",
    addressLocality: "Pacific City",
  },
  sameAs: [
    "https://linkedin.com/in/ernestofgaia",
    "https://x.com/ErnestOfGaia",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Prompt Engineering",
    "AI Coaching",
    "Workflow Automation",
    "Lifelong Learning",
  ],
};

export default function WhoIsErnest() {
  return (
    <PageLayout
      prev="/eogbook"
      prevLabel="← Directory"
      next="/eogbook/what-i-do"
      nextLabel="What I Do →"
      breadcrumbs={[{ label: "Who Is Ernest", href: "/eogbook/who-is-ernest" }]}
      jsonLd={personJsonLd}
    >
      <h1>Who Is Ernest</h1>
      <h2>The Coach Behind EOGbook</h2>

      <p>
        I&apos;m Ernest, a local AI coach based on the Oregon Coast. I help
        non-technical people understand and use AI tools practically — no
        jargon, no hype, no selling you something you don&apos;t need.
      </p>

      <h3>My Story</h3>
      <p>
        I grew up and work in the Pacific City to Portland corridor in Oregon.
        Over the years I watched powerful tools arrive that could genuinely
        change how people work — and watched most people get left behind because
        nobody explained them in plain terms. That gap is why I coach.
      </p>

      <h3>My Approach</h3>
      <p>
        Every session is one-on-one, on your actual device, with your real
        problems. I don&apos;t lecture. I don&apos;t show slides. We work
        together until something clicks. If you have questions, we slow down.
        If you want to go deeper, we go deeper.
      </p>

      <h3>My Philosophy</h3>
      <p>
        <strong>AI is a tool. The goal is to keep you ahead of change.</strong>{" "}
        That means honest conversations about what AI can and can&apos;t do,
        what risks are real, and how to build skills that last beyond any single
        tool or trend.
      </p>

      <h3>Why Coaching, Not Courses</h3>
      <p>
        Courses give you information. Coaching builds capability. There&apos;s a
        difference between watching someone explain a hammer and actually
        learning to build something. I&apos;m here for the second kind.
      </p>

      <div className="eogbook-drilldown" aria-label="Explore more about Ernest">
        <a href="/eogbook/who-is-ernest/approach" className="eogbook-drill-link">
          Explore my coaching approach and methodology
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
