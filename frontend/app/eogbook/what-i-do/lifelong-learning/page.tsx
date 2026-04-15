import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Lifelong Learning Framework",
  description:
    "Ernest Of Gaia's lifelong learning generalist framework: building adaptable learning instincts, not just mastering one tool. Stay ahead of change in an evolving AI landscape.",
  alternates: {
    canonical:
      "https://ernestofgaia.xyz/eogbook/what-i-do/lifelong-learning",
  },
};

export default function LifelongLearning() {
  return (
    <PageLayout
      prev="/eogbook/what-i-do/ai-skills"
      prevLabel="← AI Skills"
      next="/eogbook/services"
      nextLabel="Services →"
      breadcrumbs={[
        { label: "What I Do", href: "/eogbook/what-i-do" },
        {
          label: "Lifelong Learning",
          href: "/eogbook/what-i-do/lifelong-learning",
        },
      ]}
    >
      <h1>Lifelong Learning Framework</h1>
      <h2>Learning How to Learn New Tools</h2>

      <p>
        The AI landscape changes every few months. The people who adapt fastest
        aren&apos;t the ones who memorized the most features — they&apos;re the
        ones who built the right learning instincts. That&apos;s what this
        framework develops.
      </p>

      <h3>What It Means in Practice</h3>
      <p>
        Every session reinforces the same core questions: <em>What problem am I
        actually trying to solve? What tool is best for this? How do I verify
        the output? How do I improve the result?</em> Over time, these become
        automatic.
      </p>

      <h3>Generalist Over Specialist</h3>
      <p>
        You don&apos;t need to be an expert in any single tool. You need to
        understand the category well enough to pick up new tools quickly. We
        build broad capability, not deep dependence on one product.
      </p>

      <h3>Learning Session to Session</h3>
      <p>
        Each session closes with homework — one specific exercise tied to what
        we worked on. The next session starts with a check-in: what worked,
        what didn&apos;t, what questions emerged. That loop is the framework in
        action.
      </p>

      <h3>Honest About What Changes</h3>
      <p>
        Part of every coaching relationship is regular recalibration. The tools
        change. Your work evolves. What I teach you in month one may not be the
        same as what we focus on in month six. That&apos;s not a flaw —
        it&apos;s the point.
      </p>

      <div className="eogbook-cta-row">
        <a href="/eogbook/services" className="back-btn">
          See service tiers
        </a>
        <a href="tel:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
      </div>
    </PageLayout>
  );
}
