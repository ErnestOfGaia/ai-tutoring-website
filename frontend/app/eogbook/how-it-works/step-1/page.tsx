import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Step 1: Free Handshake Call",
  description:
    "Start your AI coaching journey with a free 30-minute handshake call with Ernest Of Gaia. No pressure, no commitment. Talk through your goals and whether coaching is the right fit.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/how-it-works/step-1",
  },
};

export default function Step1() {
  return (
    <PageLayout
      prev="/eogbook/how-it-works"
      prevLabel="← How It Works"
      next="/eogbook/how-it-works/step-2"
      nextLabel="Step 2 →"
      breadcrumbs={[
        { label: "How It Works", href: "/eogbook/how-it-works" },
        {
          label: "Step 1: Free Handshake",
          href: "/eogbook/how-it-works/step-1",
        },
      ]}
    >
      <h1>Step 1: Free Handshake Call</h1>
      <h2>Start the Conversation — No Commitment</h2>

      <p>
        Start with a free 30-minute online conversation. We&apos;ll talk about
        how you work, what you&apos;re hoping to tackle, and whether coaching is
        right for you. No pressure. No commitment.
      </p>

      <h3>What We&apos;ll Cover</h3>
      <ul>
        <li>How you currently work and what slows you down</li>
        <li>What AI can actually do for you (and what it can&apos;t)</li>
        <li>Whether coaching is the right fit for your goals</li>
        <li>What happens next if you want to move forward</li>
        <li>Which tier makes sense to start with</li>
      </ul>

      <h3>How to Start</h3>
      <p>
        Text <a href="tel:+15036640546">503-664-0546</a> with &ldquo;AI
        coaching&rdquo; and I&apos;ll follow up within 24 hours to schedule a
        time that works for you.
      </p>

      <h3>What to Expect</h3>
      <p>
        The call is online via video. Casual and conversational — not a sales
        pitch. I genuinely want to figure out if I can help you before you
        invest any money. If coaching isn&apos;t the right fit, I&apos;ll tell
        you.
      </p>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Schedule your free call now
        </a>
      </div>
    </PageLayout>
  );
}
