import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Your 5-step AI coaching journey with Ernest Of Gaia: free handshake call, choose your tier, first session, build skills over time, see real results.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/how-it-works",
  },
};

const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Your Coaching Journey — Simple and Practical",
  description:
    "Five-step coaching journey from first contact to real AI results with Ernest Of Gaia.",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Free Handshake Call",
      text: "Start with a free 30-minute online conversation. We'll talk about how you work, what you're hoping to tackle, and whether coaching is right for you. No pressure. No commitment.",
      url: "https://ernestofgaia.xyz/eogbook/how-it-works/step-1",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Choose Your Tier",
      text: "Based on what you shared in the handshake call, we'll agree on the right tier for you: Tier 1 if you're brand new to AI, or Tier 2 if you want to build workflows.",
      url: "https://ernestofgaia.xyz/eogbook/how-it-works/step-2",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Your First Real Session",
      text: "Your first paid session is conversational and hands-on. We'll work on your actual device with real tools. Within 24 hours you'll get a written recap, custom prompts or templates, and a simple homework exercise.",
      url: "https://ernestofgaia.xyz/eogbook/how-it-works/step-3",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Build Your Skills Over Time",
      text: "Each session builds on the last. Sessions follow a check-in, build, and wrap rhythm. We move at your pace.",
      url: "https://ernestofgaia.xyz/eogbook/how-it-works/step-4-5",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "See Real Results",
      text: "By your 3rd or 4th session, you'll be comfortable using AI tools without help. By 6 months, workflows are running and AI is part of your daily toolkit.",
      url: "https://ernestofgaia.xyz/eogbook/how-it-works/step-4-5",
    },
  ],
};

export default function HowItWorks() {
  return (
    <PageLayout
      prev="/eogbook/services"
      prevLabel="← Services"
      next="/eogbook/giveback"
      nextLabel="Nonprofit Giveback →"
      breadcrumbs={[{ label: "How It Works", href: "/eogbook/how-it-works" }]}
      jsonLd={howToJsonLd}
    >
      <h1>How It Works</h1>
      <h2>Your 5-Step Coaching Journey</h2>

      <div className="eogbook-steps" role="list">
        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 1">1</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">Free Handshake Call</div>
            <div className="eogbook-step-desc">
              A free 30-minute online conversation. We talk about how you work,
              what you want to tackle, and whether coaching is the right fit. No
              pressure, no commitment.
            </div>
          </div>
        </div>

        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 2">2</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">Choose Your Tier</div>
            <div className="eogbook-step-desc">
              Based on your goals and skill level, we&apos;ll agree on the right
              tier — Foundations, Workshop, or Masterclass. Most people start
              with 1–2 single sessions before committing to a plan.
            </div>
          </div>
        </div>

        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 3">3</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">Your First Real Session</div>
            <div className="eogbook-step-desc">
              Hands-on, conversational, on your actual device. You interact
              directly with the tools. Within 24 hours: a written recap, custom
              prompts, and a homework exercise.
            </div>
          </div>
        </div>

        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 4">4</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">Build Your Skills Over Time</div>
            <div className="eogbook-step-desc">
              Sessions follow a rhythm: check-in on homework (10 min) → build
              new techniques (40–60 min) → recap and assign homework (10 min).
              We move at your pace.
            </div>
          </div>
        </div>

        <div className="eogbook-step" role="listitem">
          <div className="eogbook-step-num" aria-label="Step 5">5</div>
          <div className="eogbook-step-body">
            <div className="eogbook-step-title">See Real Results</div>
            <div className="eogbook-step-desc">
              By session 3–4: comfortable, asking better questions, solving real
              problems. By 6 sessions: workflows running. By 12: AI is part of
              your daily toolkit.
            </div>
          </div>
        </div>
      </div>

      <div className="eogbook-drilldown" aria-label="Explore each step in detail">
        <a
          href="/eogbook/how-it-works/step-1"
          className="eogbook-drill-link"
        >
          Step 1: What happens on the free handshake call
        </a>
        <a
          href="/eogbook/how-it-works/step-2"
          className="eogbook-drill-link"
        >
          Step 2: How to choose the right tier
        </a>
        <a
          href="/eogbook/how-it-works/step-3"
          className="eogbook-drill-link"
        >
          Step 3: What to expect in your first session
        </a>
        <a
          href="/eogbook/how-it-works/step-4-5"
          className="eogbook-drill-link"
        >
          Steps 4–5: Building skills and seeing results over time
        </a>
      </div>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Schedule your free call
        </a>
      </div>
    </PageLayout>
  );
}
