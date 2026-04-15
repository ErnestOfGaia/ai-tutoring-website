import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Step 2: Choose Your Tier",
  description:
    "After the free handshake call, choose the right AI coaching tier: Tier 1 Foundations for beginners, Tier 2 Workshop for workflow builders.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/how-it-works/step-2",
  },
};

export default function Step2() {
  return (
    <PageLayout
      prev="/eogbook/how-it-works/step-1"
      prevLabel="← Step 1"
      next="/eogbook/how-it-works/step-3"
      nextLabel="Step 3 →"
      breadcrumbs={[
        { label: "How It Works", href: "/eogbook/how-it-works" },
        {
          label: "Step 2: Choose Your Tier",
          href: "/eogbook/how-it-works/step-2",
        },
      ]}
    >
      <h1>Step 2: Choose Your Tier</h1>
      <h2>Finding the Right Starting Point</h2>

      <p>
        Based on what you shared in the handshake call, we&apos;ll agree on the
        right tier for you. No pressure to commit to a plan upfront. Most
        people start with a single session to see how we work together.
      </p>

      <h3>Tier 1 Foundations — If You&apos;re Brand New</h3>
      <p>
        You&apos;ve heard about AI but haven&apos;t really used it yet, or
        you&apos;ve tried it and it didn&apos;t quite click. Start here.{" "}
        <strong>$75/session · 60 minutes.</strong>
      </p>

      <h3>Tier 2 Workshop — If You Want to Build Workflows</h3>
      <p>
        You&apos;ve used AI a bit and want to go deeper — custom prompts,
        automations, real integrations with your work. This is the most popular
        tier. <strong>$110/session · 75 minutes.</strong>
      </p>

      <h3>Not Sure? That&apos;s Normal</h3>
      <p>
        That&apos;s exactly what the free handshake call is for. I&apos;ll
        listen to your goals and recommend the starting point that makes the
        most sense. We can always move between tiers as your skills develop.
      </p>

      <div className="eogbook-cta-row">
        <a href="/eogbook/services" className="back-btn">
          Compare all tiers
        </a>
        <a href="tel:+15036640546" className="cta-btn">
          Schedule your free call
        </a>
      </div>
    </PageLayout>
  );
}
