import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Giveback Program: How It Works",
  description:
    "The Ernest Of Gaia nonprofit giveback program in detail: 5-step process from completing 12 coaching hours to nominating and delivering a free session to a local Oregon nonprofit.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/giveback/how-it-works",
  },
};

export default function GivebackHowItWorks() {
  return (
    <PageLayout
      prev="/eogbook/giveback"
      prevLabel="← Nonprofit Giveback"
      next="/eogbook/giveback/eligible-orgs"
      nextLabel="Eligible Orgs →"
      breadcrumbs={[
        { label: "Nonprofit Giveback", href: "/eogbook/giveback" },
        {
          label: "How It Works",
          href: "/eogbook/giveback/how-it-works",
        },
      ]}
    >
      <h1>Giveback Program: How It Works</h1>
      <h2>Five Steps from Coaching Hours to Community Impact</h2>

      <p>
        The giveback program is simple by design. Here&apos;s exactly what
        happens from start to finish:
      </p>

      <div className="eogbook-steps" role="list">
        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 1">1</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">Complete 12 hours of paid coaching</div>
            <div className="eogbook-step-desc">
              That&apos;s 12 sessions at Tier 1, or 8 sessions at Tier 2. Hours can span any plan — they accumulate
              over time.
            </div>
          </div>
        </div>

        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 2">2</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">Nominate a nonprofit</div>
            <div className="eogbook-step-desc">
              Choose any eligible organization — a school, library, food bank,
              community action agency, tribal organization, or 501(c)(3) in
              your county or nearby. See the{" "}
              <a href="/eogbook/giveback/eligible-orgs">eligible organizations list</a>.
            </div>
          </div>
        </div>

        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 3">3</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">I reach out and schedule</div>
            <div className="eogbook-step-desc">
              I contact the organization, explain the program, and schedule a
              session — either with a staff member, a small team, or whoever
              they designate.
            </div>
          </div>
        </div>

        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 4">4</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">The free session happens</div>
            <div className="eogbook-step-desc">
              The session covers AI basics, one real workflow they can use
              immediately, and a resource list to keep. Same quality as any
              paid coaching session.
            </div>
          </div>
        </div>

        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 5">5</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">Optional: You attend as a mentor</div>
            <div className="eogbook-step-desc">
              You can sit in on the nonprofit session if you want — it deepens
              your own learning and lets you see the skills you&apos;ve built
              in a new context.
            </div>
          </div>
        </div>
      </div>

      <h3>The Giveback Calculation</h3>
      <p>
        You complete 12 hours of paid coaching (in any tier), and I deliver one
        free session to the organization you nominate. Every coaching plan
        includes at least one nonprofit session as a bonus.
      </p>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Start your coaching journey
        </a>
      </div>
    </PageLayout>
  );
}
