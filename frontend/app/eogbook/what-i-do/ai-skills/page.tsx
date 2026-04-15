import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "AI Skills Training",
  description:
    "What AI skills does Ernest Of Gaia teach? Prompting, Claude Projects, multi-tool workflows, content pipelines, Google Workspace integrations, and AI safety basics.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/what-i-do/ai-skills",
  },
};

export default function AiSkills() {
  return (
    <PageLayout
      prev="/eogbook/what-i-do"
      prevLabel="← What I Do"
      next="/eogbook/what-i-do/lifelong-learning"
      nextLabel="Lifelong Learning →"
      breadcrumbs={[
        { label: "What I Do", href: "/eogbook/what-i-do" },
        { label: "AI Skills Training", href: "/eogbook/what-i-do/ai-skills" },
      ]}
    >
      <h1>AI Skills Training</h1>
      <h2>What You&apos;ll Learn to Do</h2>

      <p>
        The goal isn&apos;t to memorize AI features — it&apos;s to build
        instincts that transfer across tools and hold up as tools evolve. Here
        are the concrete skills sessions cover:
      </p>

      <h3>Foundations Skills (Tier 1)</h3>
      <ul>
        <li>How ChatGPT and Claude actually work — what they are and aren&apos;t</li>
        <li>Writing prompts that get consistent, useful results</li>
        <li>Setting up and organizing Claude.ai and ChatGPT accounts</li>
        <li>Using Claude Projects to maintain context across sessions</li>
        <li>Understanding AI safety, hallucinations, and when to verify output</li>
        <li>
          <strong>Tools:</strong> Claude.ai, ChatGPT, Google Gemini, Notion AI
        </li>
      </ul>

      <h3>Builder Skills (Tier 2)</h3>
      <ul>
        <li>Custom prompts written for your specific business and brand voice</li>
        <li>Multi-tool workflows: text, images, documents working together</li>
        <li>Content pipelines for social media, email, or proposals</li>
        <li>Google Workspace, Notion, or Airtable integrations with AI</li>
        <li>Building and maintaining a reusable prompt library</li>
        <li>
          <strong>Tools:</strong> Claude.ai Pro, ChatGPT Plus, Perplexity,
          Notion, Make.com (intro), Google Workspace AI
        </li>
      </ul>

      <div className="eogbook-cta-row">
        <a href="/eogbook/services" className="back-btn">
          See service tiers and pricing
        </a>
        <a href="tel:+15036640546" className="cta-btn">
          Schedule a free call
        </a>
      </div>
    </PageLayout>
  );
}
