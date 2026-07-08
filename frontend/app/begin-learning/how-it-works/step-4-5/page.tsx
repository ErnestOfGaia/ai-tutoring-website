import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Steps 4–5: Build Skills & See Results",
  description:
    "How AI coaching progresses over time: the check-in, build, wrap session rhythm, strategic practice between sessions, and what progress honestly looks like — confidence early, fluency with practice.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/how-it-works/step-4-5",
  },
};

export default function Step45() {
  return (
    <PageLayout
      prev="/begin-learning/how-it-works/step-3"
      prevLabel="← Step 3"
      next="/begin-learning/giveback"
      nextLabel="Nonprofit Giveback →"
      breadcrumbs={[
        { label: "How It Works", href: "/begin-learning/how-it-works" },
        {
          label: "Steps 4–5: Build & Results",
          href: "/begin-learning/how-it-works/step-4-5",
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
        Faster than you&apos;d expect for confidence; slower than you&apos;d
        hope for fluency. Progress isn&apos;t a straight line — but it does
        have a shape:
      </p>

      <div className="eogbook-table-wrap">
        <table className="eogbook-table">
          <thead>
            <tr>
              <th scope="col">Stretch</th>
              <th scope="col">What You&apos;ll Notice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Early sessions</strong></td>
              <td>Something shifts — less worry about doing it wrong, better questions, a clearer sense of what AI is good at for you</td>
            </tr>
            <tr>
              <td><strong>A couple of months</strong></td>
              <td>Workflows coming together — built, tested, and trusted with real work</td>
            </tr>
            <tr>
              <td><strong>Within a season</strong></td>
              <td>AI is part of your daily toolkit — if you&apos;re using what we cover between sessions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>What Makes Coaching Different</h3>
      <div className="eogbook-table-wrap">
        <table className="eogbook-table">
          <thead>
            <tr>
              <th scope="col">Learning alone</th>
              <th scope="col">Learning coached</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>You figure out what to practice</td>
              <td>One deliberate exercise per session, tied to your real work</td>
            </tr>
            <tr>
              <td>Stuck means stalled</td>
              <td>Stuck means we slow down and work through it together</td>
            </tr>
            <tr>
              <td>No one checks in</td>
              <td>Every session starts with what worked and what didn&apos;t</td>
            </tr>
            <tr>
              <td>Generic examples</td>
              <td>Your actual device, your actual problems</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Take the first step
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
