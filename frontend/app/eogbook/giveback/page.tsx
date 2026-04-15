import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Nonprofit Giveback",
  description:
    "For every 12 hours of paid coaching with Ernest Of Gaia, one free AI coaching session goes to a local Oregon nonprofit of your choice. Your investment supports your community.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/giveback",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Program",
  name: "Ernest Of Gaia Nonprofit Giveback Program",
  description:
    "For every 12 hours of paid coaching, Ernest Of Gaia donates one complimentary AI coaching session to a local Oregon nonprofit of the client's choice.",
  organizer: {
    "@type": "Person",
    name: "Ernest Of Gaia",
    url: "https://ernestofgaia.xyz",
  },
  sponsor: {
    "@type": "LocalBusiness",
    name: "Ernest Of Gaia",
    url: "https://ernestofgaia.xyz",
  },
};

export default function Giveback() {
  return (
    <PageLayout
      prev="/eogbook/how-it-works"
      prevLabel="← How It Works"
      next="/eogbook/trust"
      nextLabel="Trust & FAQs →"
      breadcrumbs={[
        { label: "Nonprofit Giveback", href: "/eogbook/giveback" },
      ]}
      jsonLd={orgJsonLd}
    >
      <h1>Nonprofit Giveback</h1>
      <h2>Your Coaching, Your Community</h2>

      <p>
        When you invest in coaching, you invest in your community too. For every{" "}
        <strong>12 hours of paid coaching</strong> — that&apos;s 12 sessions at
        Tier 1, or 8 sessions at Tier 2 — I donate one
        complimentary AI coaching session to a local Oregon nonprofit of{" "}
        <em>your</em> choice.
      </p>

      <h3>How It Works</h3>
      <ol>
        <li>
          <strong>You complete 12 hours of paid coaching</strong> in any tier.
        </li>
        <li>
          <strong>You nominate a nonprofit</strong> — a school, library,
          community action agency, food bank, or tribal organization in your
          county.
        </li>
        <li>
          <strong>I reach out and schedule</strong> a free session with them —
          with a staff member or team.
        </li>
        <li>
          <strong>They learn practical AI.</strong> Basics, one real workflow,
          and a resource list they can keep.
        </li>
        <li>
          <strong>Optional:</strong> You can attend as a mentor, which deepens
          your own learning too.
        </li>
      </ol>

      <h3>Who We Support</h3>
      <p>
        Eligible organizations include local 501(c)(3) nonprofits, Oregon
        schools and school districts, community action agencies, libraries,
        arts organizations, and tribal and Indigenous-led nonprofits.
      </p>

      <h3>Real Impact</h3>
      <p>
        This program supports small nonprofit staff learning to use AI for
        efficiency, teachers integrating AI literacy into classrooms, and
        community organizations stretching limited resources further.
      </p>
      <p>
        <strong>Your coaching hours = Community AI literacy.</strong>
      </p>

      <div className="eogbook-drilldown" aria-label="Explore the giveback program">
        <a
          href="/eogbook/giveback/how-it-works"
          className="eogbook-drill-link"
        >
          How the giveback program works in detail
        </a>
        <a
          href="/eogbook/giveback/eligible-orgs"
          className="eogbook-drill-link"
        >
          See eligible organizations and how to nominate
        </a>
      </div>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Invest in coaching, invest in your community
        </a>
      </div>
    </PageLayout>
  );
}
