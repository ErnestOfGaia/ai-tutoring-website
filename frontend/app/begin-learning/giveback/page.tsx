import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Nonprofit Giveback",
  description:
    "For every 12 hours of paid coaching with Ernest Of Gaia, one free AI coaching session goes to a nonprofit you choose — or rolls into Ernest's volunteer work with Team Rubicon. Your investment supports your community.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/giveback",
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Program",
  name: "Ernest Of Gaia Nonprofit Giveback Program",
  description:
    "For every 12 hours of paid coaching, Ernest Of Gaia donates one complimentary AI coaching session to a nonprofit of the client's choice — or routes the hours to Team Rubicon, where Ernest has volunteered for a decade.",
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
      prev="/begin-learning/how-it-works"
      prevLabel="← How It Works"
      next="/begin-learning/trust"
      nextLabel="Trust & FAQs →"
      breadcrumbs={[
        { label: "Nonprofit Giveback", href: "/begin-learning/giveback" },
      ]}
      jsonLd={orgJsonLd}
    >
      <h1>Nonprofit Giveback</h1>
      <h2>Your Coaching, Your Community</h2>

      <p>
        When you invest in coaching, you invest in your community too. For
        every <strong>12 hours of paid coaching</strong> — that&apos;s 12
        sessions at Tier 1, or 8 sessions at Tier 2 — I donate one
        complimentary AI coaching session to a nonprofit <em>you</em>{" "}
        nominate, in person or online.
      </p>

      <h3>How It Works</h3>
      <ol>
        <li>
          <strong>You complete 12 hours of paid coaching</strong> in any tier.
        </li>
        <li>
          <strong>You pick the nonprofit</strong> — a local food bank, a
          school or library, an arts collective, a community garden, a tribal
          organization, whatever you care about.
        </li>
        <li>
          <strong>I reach out and schedule</strong> the session, in person or
          online — with a staff member or team.
        </li>
        <li>
          <strong>They learn practical AI.</strong> Basics, one real workflow,
          and a resource list they can keep.
        </li>
        <li>
          <strong>Optional:</strong> you can sit in as a mentor, which deepens
          your own learning too.
        </li>
      </ol>

      <h3>No Nonprofit in Mind?</h3>
      <p>
        Your hours can roll into the work I already do with{" "}
        <a
          href="https://teamrubiconusa.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Team Rubicon</strong>
        </a>
        , which has a Pacific Northwest chapter. I&apos;ve been a Grey Shirt
        with them for a decade.
      </p>
      <p>
        Their words, not mine: <em>&ldquo;Service, to us, is a mindset.
        It&apos;s a resolve — a beacon of light amidst the fog of chaos — to
        bring equitable relief to vulnerable communities before, during, and
        after a disaster strikes.&rdquo;</em>
      </p>

      <h3>Who&apos;s Eligible</h3>
      <p>
        Any 501(c)(3) nonprofit you care about. Schools and school districts,
        libraries, community action agencies, food banks, arts organizations,
        community gardens, tribal and Indigenous-led nonprofits, and
        disaster-relief groups like Team Rubicon all qualify. If it&apos;s
        local to you and doing good, it&apos;s probably eligible — the
        drilldown page below has the full guidelines.
      </p>

      <div className="eogbook-drilldown" aria-label="Explore the giveback program">
        <a
          href="/begin-learning/giveback/how-it-works"
          className="eogbook-drill-link"
        >
          How the giveback program works in detail
        </a>
        <a
          href="/begin-learning/giveback/eligible-orgs"
          className="eogbook-drill-link"
        >
          See eligible organizations and how to nominate
        </a>
      </div>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Invest in coaching, invest in your community
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
