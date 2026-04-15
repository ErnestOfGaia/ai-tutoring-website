import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Steps 4–5: Build Skills & See Results",
  description:
    "How AI coaching progresses over time: session rhythm, skill building, and what results look like at 3 sessions, 6 sessions, and 6 months with Ernest Of Gaia.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/how-it-works/step-4-5",
  },
};

export default function Step45() {
  return (
    <PageLayout
      prev="/eogbook/how-it-works/step-3"
      prevLabel="← Step 3"
      next="/eogbook/giveback"
      nextLabel="Nonprofit Giveback →"
      breadcrumbs={[
        { label: "How It Works", href: "/eogbook/how-it-works" },
        {
          label: "Steps 4–5: Build & Results",
          href: "/eogbook/how-it-works/step-4-5",
        },
      ]}
    >
      <h1>Steps 4–5: Build Skills &amp; See Results</h1>
      <h2>How Coaching Progresses Over Time</h2>

      <h3>Step 4: Build Your Skills Over Time</h3>
      <p>
        Each session builds on the last. We move at your pace. If something
        doesn&apos;t make sense, we slow down. If you want to go deeper on
        something, we go deeper. Sessions follow this rhythm:
      </p>
      <ul>
        <li>
          <strong>Check-in</strong> (10 min): What worked from last week&apos;s
          homework?
        </li>
        <li>
          <strong>Build</strong> (40–60 min): Hands-on work with new techniques
          or tools
        </li>
        <li>
          <strong>Wrap</strong> (10 min): Recap what we built, assign focused
          homework
        </li>
      </ul>

      <h3>Step 5: See Real Results</h3>
      <p>
        Progress is steady and noticeable. Here&apos;s what most people
        experience:
      </p>

      <div className="eogbook-table-wrap">
        <table className="eogbook-table">
          <thead>
            <tr>
              <th scope="col">Timeline</th>
              <th scope="col">What You&apos;ll Notice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Session 3–4</strong></td>
              <td>More comfortable, asking better questions, solving real problems without help</td>
            </tr>
            <tr>
              <td><strong>6 sessions</strong></td>
              <td>Workflows running, tools integrated into daily routine</td>
            </tr>
            <tr>
              <td><strong>12 sessions</strong></td>
              <td>AI is part of your daily toolkit. You&apos;re teaching others.</td>
            </tr>
            <tr>
              <td><strong>6 months (Tier 2)</strong></td>
              <td>Workflows built, integrations working, prompt library growing</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>What Makes This Different</h3>
      <div className="eogbook-table-wrap">
        <table className="eogbook-table">
          <thead>
            <tr>
              <th scope="col">Traditional courses</th>
              <th scope="col">Ernest Of Gaia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Self-paced, no support</td>
              <td>1-on-1, personalized to your workflow</td>
            </tr>
            <tr>
              <td>You figure it out alone</td>
              <td>Active — you do it, I guide</td>
            </tr>
            <tr>
              <td>No accountability</td>
              <td>Ongoing relationship, homework, recap docs</td>
            </tr>
            <tr>
              <td>Generic examples</td>
              <td>Your actual device, your actual problems</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Take the first step
        </a>
      </div>
    </PageLayout>
  );
}
