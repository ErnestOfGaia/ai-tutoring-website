import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Coaching Plans",
  description:
    "Ernest Of Gaia coaching plans: pay as you go, or pick a pace — Habit (3 months), Rhythm (6 months, 5% off), Craft (9 months, 10% off). Consistent practice is what makes AI skills stick.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/services/plans",
  },
};

export default function Plans() {
  return (
    <PageLayout
      prev="/begin-learning/services/tier-2"
      prevLabel="← Tier 2"
      next="/begin-learning/how-it-works"
      nextLabel="How It Works →"
      breadcrumbs={[
        { label: "Services", href: "/begin-learning/services" },
        { label: "Coaching Plans", href: "/begin-learning/services/plans" },
      ]}
    >
      <h1>Coaching Plans</h1>
      <h2>Pick a Pace, Not a Package</h2>

      <p>
        Once you decide on a tier, you can book sessions one at a time —
        that&apos;s a fine way to start, and plenty of people stay there.
        Plans exist for one reason: consistent practice is what makes skills
        stick, and a longer rhythm earns a discount.
      </p>

      <div className="eogbook-table-wrap">
        <table className="eogbook-table">
          <thead>
            <tr>
              <th scope="col">Plan</th>
              <th scope="col">Length</th>
              <th scope="col">Cadence</th>
              <th scope="col">Savings</th>
              <th scope="col">Giveback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Pay as you go</strong></td>
              <td>Flexible</td>
              <td>You set it</td>
              <td>—</td>
              <td>Earned every 12 hours</td>
            </tr>
            <tr>
              <td><strong>Habit</strong></td>
              <td>3 months</td>
              <td>Typically weekly</td>
              <td>—</td>
              <td>1 nonprofit session</td>
            </tr>
            <tr>
              <td><strong>Rhythm</strong></td>
              <td>6 months</td>
              <td>Typically weekly</td>
              <td>5% off</td>
              <td>2 nonprofit sessions</td>
            </tr>
            <tr>
              <td><strong>Craft</strong></td>
              <td>9 months</td>
              <td>Typically weekly</td>
              <td>10% off</td>
              <td>3 nonprofit sessions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.65)" }}>
        Cadence is set together at the free call — weekly is typical, but the
        right rhythm is the one you&apos;ll actually keep. Giveback sessions
        work the same for everyone: one free nonprofit session for every 12
        hours of paid coaching — plans just get you there on a schedule. Start
        pay-as-you-go and move to a plan whenever you like.
      </p>

      <div className="eogbook-cta-row">
        <a href="/begin-learning/giveback" className="cta-btn">
          Learn about the giveback program
        </a>
        <a href="sms:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
      </div>
    </PageLayout>
  );
}
