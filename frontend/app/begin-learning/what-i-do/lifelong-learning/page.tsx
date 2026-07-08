import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Lifelong Learning Framework",
  description:
    "Ernest Of Gaia's lifelong learning framework: cross-functional skills, deep understanding of the tools you use, and strategic practice tied to your real work. Learning how to learn, in plain English.",
  alternates: {
    canonical:
      "https://ernestofgaia.xyz/begin-learning/what-i-do/lifelong-learning",
  },
};

export default function LifelongLearning() {
  return (
    <PageLayout
      prev="/begin-learning/what-i-do/ai-skills"
      prevLabel="← AI Skills"
      next="/begin-learning/services"
      nextLabel="Services →"
      breadcrumbs={[
        { label: "What I Do", href: "/begin-learning/what-i-do" },
        {
          label: "Lifelong Learning",
          href: "/begin-learning/what-i-do/lifelong-learning",
        },
      ]}
    >
      <h1>Lifelong Learning Framework</h1>
      <h2>Learning How to Learn</h2>

      <p>
        The AI landscape changes every few months. The people who navigate it
        well aren&apos;t the ones who memorized the most features —
        they&apos;re the ones who built durable learning habits. That&apos;s
        what this framework develops.
      </p>

      <h3>What It Means in Practice</h3>
      <p>
        Every session reinforces the same core questions: What problem am I
        actually trying to solve? Is this the appropriate tool for it? How do
        I verify the output? How do I improve the result? Over time, these
        become automatic.
      </p>

      <h3>Generalist Skills, Deep Understanding</h3>
      <p>
        The skills we build are cross-functional — asking good questions,
        breaking problems down, verifying results — and they transfer to
        whatever you work on next. But breadth in skills doesn&apos;t mean
        shallow with tools. We learn one tool well, because depth is what
        teaches you what&apos;s actually happening under the surface — and
        it&apos;s what keeps you from becoming dependent on whichever platform
        is loudest this quarter.
      </p>

      <h3>Strategic Practice</h3>
      <p>
        Each session closes with homework — one specific exercise tied to what
        we worked on. The next session starts with a check-in: what worked,
        what didn&apos;t, what questions emerged.
      </p>
      <p>
        The old saying is &ldquo;practice makes perfect.&rdquo; The real
        saying is &ldquo;perfect practice makes perfect&rdquo; — how you
        practice shapes what you get. One deliberate exercise tied to your
        actual work beats an hour of aimless prompting. That loop is the
        framework in action.
      </p>

      <h3>Honest About What Changes</h3>
      <p>
        Part of every coaching relationship is regular recalibration. The tools
        change. Your work evolves. What I teach you in month one may not be the
        same as what we focus on in month six. That&apos;s not a flaw —
        it&apos;s the point.
      </p>

      <div className="eogbook-cta-row">
        <a href="/begin-learning/services" className="cta-btn">
          See service tiers
        </a>
        <a href="sms:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
      </div>
    </PageLayout>
  );
}
