import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Ready to start AI coaching with Ernest Of Gaia? Book your free 30-minute call. No credit card. No pressure. Text 503-664-0546 or email eog@ernestofgaia.xyz.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/get-started",
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Ernest Of Gaia",
  description:
    "AI coaching in plain English for your home, hobby, or business. Book a free 30-minute handshake call.",
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
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    description: "Sessions by appointment. Response within 48 hours.",
  },
};

export default function GetStarted() {
  return (
    <PageLayout
      prev="/begin-learning/trust"
      prevLabel="← Trust & FAQs"
      breadcrumbs={[{ label: "Get Started", href: "/begin-learning/get-started" }]}
      jsonLd={contactJsonLd}
    >
      <h1>Get Started</h1>
      <h2>Ready? Let&apos;s Talk</h2>

      <p>
        The hardest part is starting. A free 30-minute call is completely
        low-pressure — we&apos;ll figure out if coaching is right for you,
        answer any questions, and go from there.
      </p>

      <p>
        <strong>No credit card. No pressure. Free 30-minute call.</strong>
      </p>

      <h3>How to Reach Me</h3>

      <div className="eogbook-drilldown" style={{ marginTop: "0.75rem" }} aria-label="Contact options">
        <a
          href="sms:+15036640546"
          className="eogbook-drill-link"
          aria-label="Text or call Ernest at 503-664-0546"
        >
          <span>Text or call <strong>503-664-0546</strong></span>
        </a>
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=eog%40ernestofgaia.xyz`}
          className="eogbook-drill-link"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email Ernest at eog@ernestofgaia.xyz"
        >
          <span>Email <strong>eog@ernestofgaia.xyz</strong></span>
        </a>
      </div>

      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)", margin: "0.75rem 0 0.25rem" }}>
        <strong>Text to start:</strong> Send &ldquo;AI coaching&rdquo; to{" "}
        <a href="sms:+15036640546">503-664-0546</a>{" "}
        and I&apos;ll follow up within 48 hours.
      </p>

      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)" }}>
        Serving Pacific City to Portland, Oregon &amp; the I-5 Corridor ·
        Online coaching available anywhere · Response within 48 hours of
        first message
      </p>

      <hr className="eogbook-divider" />

      <h3>What to Expect in Your Free Call</h3>
      <ul>
        <li>
          <strong>Straight answers</strong> — your AI questions answered in
          plain English, including what AI can&apos;t do for your situation
        </li>
        <li>
          <strong>An honest fit assessment</strong> — if coaching isn&apos;t
          right for you, I&apos;ll say so
        </li>
        <li>
          <strong>One clear next step</strong> — whether that&apos;s a first
          session, a course to try, or something you can do on your own this
          week
        </li>
      </ul>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Text to start a free call
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
