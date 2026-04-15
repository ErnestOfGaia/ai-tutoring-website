import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Step 3: Your First Session",
  description:
    "What to expect in your first paid AI coaching session with Ernest Of Gaia: hands-on, on your actual device, followed by a written recap and custom homework within 24 hours.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/eogbook/how-it-works/step-3",
  },
};

export default function Step3() {
  return (
    <PageLayout
      prev="/eogbook/how-it-works/step-2"
      prevLabel="← Step 2"
      next="/eogbook/how-it-works/step-4-5"
      nextLabel="Steps 4–5 →"
      breadcrumbs={[
        { label: "How It Works", href: "/eogbook/how-it-works" },
        {
          label: "Step 3: First Session",
          href: "/eogbook/how-it-works/step-3",
        },
      ]}
    >
      <h1>Step 3: Your First Real Session</h1>
      <h2>Hands-On from the Start</h2>

      <p>
        Your first paid session is conversational and hands-on. We&apos;ll work
        on your actual device with real tools. You interact directly with Claude
        or ChatGPT — not watching me do it. I explain everything in plain terms
        and slow down if you have questions.
      </p>

      <h3>What to Bring</h3>
      <ul>
        <li>Your actual work laptop or tablet</li>
        <li>A pen and paper (or notes app) to capture key ideas</li>
        <li>
          A free Claude.ai or ChatGPT account — setup instructions sent
          beforehand
        </li>
      </ul>

      <h3>What Happens During the Session</h3>
      <p>
        We&apos;ll start by reviewing what you want to accomplish. Then we work
        together on real tasks with real tools — prompting, building, adjusting.
        You do the driving; I guide and explain. By the end you&apos;ll have
        built something you can keep using.
      </p>

      <h3>What Happens After</h3>
      <p>
        Within 24 hours, you&apos;ll receive:
      </p>
      <ul>
        <li>A written recap of what we covered</li>
        <li>Custom prompts or templates you can use immediately</li>
        <li>A simple homework exercise to practice before your next session</li>
      </ul>

      <div className="eogbook-cta-row">
        <a href="tel:+15036640546" className="cta-btn">
          Book your first session
        </a>
      </div>
    </PageLayout>
  );
}
