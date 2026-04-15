import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Coaching Plans",
  description:
    "Ernest Of Gaia coaching plans: pay as you go, Launch Plan (3 months), Growth Plan (6 months), Transformation Plan (9 months). Save 5–10% with longer commitments.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/services/plans",
  },
};

export default function Plans() {
  return (
    <PageLayout
      prev="/eogbook/services/tier-3"
      prevLabel="← Tier 3"
      next="/eogbook/how-it-works"
      nextLabel="How It Works →"
      breadcrumbs={[
        { label: "Services", href: "/eogbook/services" },
        { label: "Coaching Plans", href: "/eogbook/services/plans" },
      ]}
    >
      <h1>Coaching Plans</h1>
      <h2>Choose Your Commitment Level</h2>

      <p>
        Once you decide on a tier, you can book sessions as you go, or lock in
        a plan and save:
      </p>

      <div className="eogbook-table-wrap">
        <table className="eogbook-table">
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Duration</th>
              <th scope="col">Sessions</th>
              <th scope="col">Savings</th>
              <th scope="col">Bonus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pay as you go</strong></td>
              <td>Flexible</td>
              <td>1–2</td>
              <td>None</td>
              <td>None</td>
            </tr>
            <tr>
              <td><strong>Launch Plan</strong></td>
              <td>3 months</td>
              <td>12 sessions</td>
              <td>None</td>
              <td>1 free nonprofit session</td>
            </tr>
            <tr>
              <td><strong>Growth Plan</strong></td>
              <td>6 months</td>
              <td>24 sessions</td>
              <td>5% off</td>
              <td>2 free nonprofit sessions</td>
            </tr>
            <tr>
              <td><strong>Transformation Plan</strong></td>
              <td>9 months</td>
              <td>36 sessions</td>
              <td>10% off</td>
              <td>3 free nonprofit sessions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Monthly Cost Estimates</h3>
      <ul>
        <li>
          <strong>Tier 1 Foundations:</strong>{" "}
          approximately $300–$405 per month
        </li>
        <li>
          <strong>Tier 2 Workshop:</strong>{" "}
          approximately $415–$577 per month
        </li>
      </ul>

      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)" }}>
        All plans are 1 session per week. The nonprofit giveback bonus applies
        after completing the plan&apos;s full session count. You can start with
        pay-as-you-go sessions and move to a plan at any time.
      </p>

      <div className="eogbook-cta-row">
        <a href="/eogbook/giveback" className="back-btn">
          Learn about the giveback program
        </a>
        <a href="tel:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
      </div>
    </PageLayout>
  );
}
