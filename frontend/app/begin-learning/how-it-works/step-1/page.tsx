import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Step 1: Free Handshake Call",
  description:
    "Start your AI coaching journey with a free 30-minute handshake call with Ernest Of Gaia. No pressure, no commitment. Talk through your goals and whether coaching is the right fit.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/how-it-works/step-1",
  },
};

export default function Step1() {
  return (
    <PageLayout
      prev="/begin-learning/how-it-works"
      prevLabel="← How It Works"
      next="/begin-learning/how-it-works/step-2"
      nextLabel="Step 2 →"
      breadcrumbs={[
        { label: "How It Works", href: "/begin-learning/how-it-works" },
        {
          label: "Step 1: Free Handshake",
          href: "/begin-learning/how-it-works/step-1",
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

      <h3>What You&apos;ll Walk Away With</h3>
      <ul>
        <li>
          Straight answers to your AI questions, in plain English — including
          what AI can&apos;t do for your situation
        </li>
        <li>
          An honest fit assessment — if coaching isn&apos;t right for you,
          I&apos;ll say so
        </li>
        <li>
          One clear next step: a first session and which tier to start with,
          a course to try, or something you can do on your own this week
        </li>
      </ul>

      <h3>How to Start</h3>
      <p>
        Text <a href="sms:+15036640546">503-664-0546</a> with &ldquo;AI
        coaching&rdquo; and I&apos;ll follow up within 48 hours to schedule a
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
        <a href="sms:+15036640546" className="cta-btn">
          Schedule your free call now
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
