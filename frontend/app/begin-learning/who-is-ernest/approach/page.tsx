import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "My Coaching Approach",
  description:
    "Ernest Of Gaia's coaching approach: hands-on, personalized, conversational. No lectures. Sessions on your actual device with your real problems.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/who-is-ernest/approach",
  },
};

export default function Approach() {
  return (
    <PageLayout
      prev="/begin-learning/who-is-ernest"
      prevLabel="← Who Is Ernest"
      next="/begin-learning/what-i-do"
      nextLabel="What I Do →"
      breadcrumbs={[
        { label: "Who Is Ernest", href: "/begin-learning/who-is-ernest" },
        {
          label: "Approach",
          href: "/begin-learning/who-is-ernest/approach",
        },
      ]}
    >
      <h1>My Coaching Approach</h1>

      <h3>Hands-On Learning</h3>
      <p>
        Every session is on your actual device with your real tools and your
        real problems. You interact directly with Claude or ChatGPT, with me
        there as a coach. If something isn&apos;t making sense, we stop and
        work through it together until it does.
      </p>

      <h3>Plain English, Always</h3>
      <p>
        No acronyms without explanation. No assuming you know what
        &ldquo;tokens&rdquo; or &ldquo;parameters&rdquo; means. I meet you
        where you are and build from there. The jargon still exists but I
        won&apos;t use it unless you want to understand it.
      </p>

      <h3>Personalized to You</h3>
      <p>
        There&apos;s no standard curriculum. Before each session I think about
        what you told me last time — what you&apos;re working on, what
        clicked, what didn&apos;t. The session is built around that.
      </p>

      <h3>Accountability That Works</h3>
      <p>
        Homework is real but light. Each session ends with one concrete
        exercise to practice before next time. We&apos;ll review it at the
        start of the next session. This rhythm is what makes skills stick.
      </p>

      <h3>Honest About Limitations</h3>
      <p>
        AI is powerful but imperfect. Part of my job is making sure you know
        when not to use it, when to double-check its output (answer: always),
        and how to stay in control of the work it produces for you.
      </p>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Schedule a free call
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
