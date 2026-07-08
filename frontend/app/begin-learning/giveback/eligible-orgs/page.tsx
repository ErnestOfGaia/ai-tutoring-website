import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Eligible Organizations",
  description:
    "Which nonprofits are eligible for the Ernest Of Gaia giveback program? 501(c)(3)s, schools, libraries, tribal organizations, community action agencies, arts collectives, disaster-relief groups like Team Rubicon, and more.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/giveback/eligible-orgs",
  },
};

export default function EligibleOrgs() {
  return (
    <PageLayout
      prev="/begin-learning/giveback/how-it-works"
      prevLabel="← How It Works"
      next="/begin-learning/trust"
      nextLabel="Trust & FAQs →"
      breadcrumbs={[
        { label: "Nonprofit Giveback", href: "/begin-learning/giveback" },
        {
          label: "Eligible Organizations",
          href: "/begin-learning/giveback/eligible-orgs",
        },
      ]}
    >
      <h1>Eligible Organizations</h1>
      <h2>Who the Giveback Program Supports</h2>

      <p>
        The goal of the giveback program is to spread AI literacy to
        organizations doing good work in their communities but without the
        budget to invest in AI training on their own.
      </p>

      <h3>Eligible Organization Types</h3>
      <ul>
        <li>501(c)(3) nonprofits (any focus area)</li>
        <li>Schools and school districts (public or private)</li>
        <li>Community action agencies</li>
        <li>Libraries and library districts</li>
        <li>Arts organizations, community gardens, and environmental groups</li>
        <li>Tribal organizations and Indigenous-led nonprofits</li>
        <li>Food banks, shelters, and mutual aid organizations</li>
        <li>
          Disaster-relief organizations (including{" "}
          <a
            href="https://teamrubiconusa.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Team Rubicon
          </a>
          , where I&apos;ve volunteered as a Grey Shirt for a decade)
        </li>
        <li>Co-ops and community-owned businesses with nonprofit arms</li>
      </ul>

      <h3>Geographic Focus</h3>
      <p>
        I work primarily along the Pacific City to Portland corridor and the
        I-5 corridor in Oregon, but the giveback program isn&apos;t geography-
        locked: nominate a nonprofit you care about anywhere. Online sessions
        let us support organizations beyond the local area, and Team Rubicon
        gives the program a built-in Pacific Northwest fallback if you
        don&apos;t have a specific org in mind.
      </p>

      <h3>How to Nominate</h3>
      <p>
        Once you&apos;ve completed 12 hours of paid coaching, reach out with
        the name of the organization you&apos;d like to nominate. I&apos;ll
        confirm eligibility and handle all the outreach and scheduling.
      </p>
      <p>
        You don&apos;t need a personal connection to the organization — just
        a belief that they&apos;d benefit from AI literacy training.
      </p>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Start coaching to earn your giveback
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
