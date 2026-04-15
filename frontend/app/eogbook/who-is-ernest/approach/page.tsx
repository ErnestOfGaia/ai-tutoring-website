import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "My Coaching Approach",
  description:
    "Ernest Of Gaia's coaching approach: hands-on, personalized, conversational. No lectures. Sessions on your actual device with your real problems.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/who-is-ernest/approach",
  },
};

export default function Approach() {
  return (
    <PageLayout
      prev="/eogbook/who-is-ernest"
      prevLabel="← Who Is Ernest"
      next="/eogbook/what-i-do"
      nextLabel="What I Do →"
      breadcrumbs={[
        { label: "Who Is Ernest", href: "/eogbook/who-is-ernest" },
        {
          label: "Approach",
          href: "/eogbook/who-is-ernest/approach",
        },
      ]}
    >
      <h1>My Coaching Approach</h1>
      <h2>The Coach Behind EOGbook</h2>

      <h3>Hands-On Learning</h3>
      <p>
        Every session is on your actual device with your real tools and your
        real problems. You interact directly with Claude or ChatGPT — you
        don&apos;t watch me demonstrate. If something isn&apos;t making sense,
        we stop and work through it together until it does.
      </p>

      <h3>Plain English, Always</h3>
      <p>
        No acronyms without explanation. No assuming you know what
        &ldquo;tokens&rdquo; or &ldquo;parameters&rdquo; means. I meet you
        where you are and build from there. The jargon exists — I just
        won&apos;t use it unless you want to understand it.
      </p>

      <h3>Personalized to You</h3>
      <p>
        There&apos;s no standard curriculum. Before each session I think about
        what <em>you</em> told me last time — what you&apos;re working on,
        what clicked, what didn&apos;t. The session is built around that.
      </p>

      <h3>Accountability That Works</h3>
      <p>
        Homework is real but light. Each session ends with one concrete
        exercise to practice before next time. We review it at the start of the
        next session. That rhythm is what makes skills actually stick.
      </p>

      <h3>Honest About Limitations</h3>
      <p>
        AI is powerful but imperfect. Part of my job is making sure you know
        when <em>not</em> to use it, when to double-check its output, and how
        to stay in control of the work it produces for you.
      </p>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
      </div>
    </PageLayout>
  );
}
