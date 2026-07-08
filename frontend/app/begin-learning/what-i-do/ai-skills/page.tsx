import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "AI Skills Training",
  description:
    "What AI skills does Ernest Of Gaia teach? Claude and ChatGPT, learned well: prompting skills, repeatable routines, and an honest introduction to AI agents. Plain English, hands-on.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/what-i-do/ai-skills",
  },
};

export default function AiSkills() {
  return (
    <PageLayout
      prev="/begin-learning/what-i-do"
      prevLabel="← What I Do"
      next="/begin-learning/what-i-do/lifelong-learning"
      nextLabel="Lifelong Learning →"
      breadcrumbs={[
        { label: "What I Do", href: "/begin-learning/what-i-do" },
        { label: "AI Skills Training", href: "/begin-learning/what-i-do/ai-skills" },
      ]}
    >
      <h1>AI Skills Training</h1>
      <h2>What You&apos;ll Learn to Do</h2>

      <p>
        The goal isn&apos;t to memorize AI features — it&apos;s to build
        cross-functional skills that transfer, and a deep enough understanding
        of your main tool that the next one is a small step, not a starting
        over. We work in <strong>Claude and ChatGPT</strong> — learning one or
        both well beats sampling everything on the market.
      </p>

      <h3>Skills — working with AI directly</h3>
      <ul>
        <li>How Claude and ChatGPT actually work — what they are and aren&apos;t</li>
        <li>Writing prompts that get consistent, useful results</li>
        <li>Setting up and organizing your account so context carries between sessions</li>
        <li>Knowing when to verify output (answer: always) and how to do it fast</li>
      </ul>

      <h3>Routines — making it repeatable</h3>
      <ul>
        <li>Custom prompts written for your business and your voice</li>
        <li>Content pipelines you reuse: social media, email, proposals</li>
        <li>A prompt library that grows with you instead of starting from zero each time</li>
        <li>Connecting AI to the documents and tools you already use</li>
      </ul>

      <h3>Agents — where it&apos;s heading</h3>
      <ul>
        <li>What AI agents are, in plain English — and what they can safely do today</li>
        <li>Recognizing when a routine is ready to become something that runs with less of you in it</li>
        <li>Staying in control: review, verification, and knowing what not to delegate</li>
      </ul>

      <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.7)" }}>
        Already deep in Google&apos;s ecosystem? Tell me in the first call —
        we can work in Google&apos;s AI tools where they fit you better. The
        skills are the same; the buttons are different.
      </p>

      <div className="eogbook-cta-row">
        <a href="/begin-learning/services" className="cta-btn">
          See service tiers and pricing
        </a>
        <a href="sms:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
      </div>
    </PageLayout>
  );
}
