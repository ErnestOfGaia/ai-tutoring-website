import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Eligible Organizations",
  description:
    "Which Oregon nonprofits are eligible for the Ernest Of Gaia giveback program? 501(c)(3)s, schools, libraries, tribal organizations, community action agencies, and more.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/giveback/eligible-orgs",
  },
};

export default function EligibleOrgs() {
  return (
    <PageLayout
      prev="/eogbook/giveback/how-it-works"
      prevLabel="← How It Works"
      next="/eogbook/trust"
      nextLabel="Trust & FAQs →"
      breadcrumbs={[
        { label: "Nonprofit Giveback", href: "/eogbook/giveback" },
        {
          label: "Eligible Organizations",
          href: "/eogbook/giveback/eligible-orgs",
        },
      ]}
    >
      <h1>Eligible Organizations</h1>
      <h2>Who We Support Through the Giveback Program</h2>

      <p>
        The goal of the giveback program is to spread AI literacy to
        organizations that are doing good work in Oregon communities but
        don&apos;t have the budget to invest in AI training on their own.
      </p>

      <h3>Eligible Organization Types</h3>
      <ul>
        <li>Local 501(c)(3) nonprofits (any focus area)</li>
        <li>Oregon schools and school districts (public or private)</li>
        <li>Community action agencies</li>
        <li>Libraries and library districts</li>
        <li>Arts organizations and environmental groups</li>
        <li>Tribal organizations and Indigenous-led nonprofits</li>
        <li>Food banks, shelters, and mutual aid organizations</li>
        <li>Co-ops and community-owned businesses with nonprofit arms</li>
      </ul>

      <h3>Geographic Focus</h3>
      <p>
        Priority goes to organizations serving the Pacific City to Portland
        corridor in Oregon, but I&apos;ll consider any Oregon-based
        organization you nominate. Online sessions extend reach statewide.
      </p>

      <h3>How to Nominate</h3>
      <p>
        Once you&apos;ve completed 12 hours of paid coaching, reach out with
        the name of the organization you&apos;d like to nominate. I&apos;ll
        confirm eligibility and handle all the outreach and scheduling.
      </p>
      <p>
        You don&apos;t need a personal connection to the organization — just a
        belief that they&apos;d benefit from AI literacy training.
      </p>

      <h3>Real Impact</h3>
      <p>
        In 2025, this program will support small nonprofit staff learning to
        use AI for efficiency, teachers integrating AI literacy into
        classrooms, and community organizations stretching limited resources
        further.
      </p>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Start coaching to earn your giveback
        </a>
      </div>
    </PageLayout>
  );
}
