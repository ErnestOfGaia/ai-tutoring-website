import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "What I Do",
  description:
    "Plain English AI coaching and lifelong learning. Ernest Of Gaia helps you use AI tools practically — no jargon, no hype, hands-on sessions on your actual device.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/what-i-do",
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI Coaching — Ernest Of Gaia",
  description:
    "Personalized 1-on-1 AI coaching. Plain English AI training and a lifelong learning framework — appropriate AI tools for your home, hobby, or business.",
  provider: {
    "@type": "Person",
    name: "Ernest Of Gaia",
    url: "https://ernestofgaia.xyz",
  },
  areaServed: {
    "@type": "State",
    name: "Oregon",
  },
  serviceType: "AI Coaching",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Coaching Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tier 1: Foundations",
          description: "AI Starter coaching for beginners",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Tier 2: The Builder",
          description: "AI Builder coaching for workflow creation",
        },
      },
    ],
  },
};

export default function WhatIDo() {
  return (
    <PageLayout
      prev="/begin-learning/who-is-ernest"
      prevLabel="← Who Is Ernest"
      next="/begin-learning/services"
      nextLabel="Services →"
      breadcrumbs={[{ label: "What I Do", href: "/begin-learning/what-i-do" }]}
      jsonLd={serviceJsonLd}
    >
      <h1>What I Do</h1>
      <h2>AI Coaching for the Real World</h2>

      <p>
        Learn to use AI tools the way they&apos;re meant to be used — at your
        own pace, on your own devices, with someone who speaks plain English.
      </p>

      <h3>Plain English AI Training</h3>
      <p>
        You&apos;ve probably heard about ChatGPT or Claude. Maybe you&apos;ve
        tried them. But getting them to actually work for you — your
        business, your workflow, your real problems — that&apos;s a different
        story. I translate the noise into practical skills you use tomorrow.
      </p>
      <p>
        What it is: 1-on-1 sessions on your actual device, working on your
        real challenges, building skills that stick.
      </p>
      <p>
        What it isn&apos;t: lectures, slideshows, generic courses, or anything
        that doesn&apos;t fit your actual life.
      </p>

      <h3>Lifelong Learning</h3>
      <p>
        AI tools change fast, but chasing every new one is how you end up
        dependent on whichever platform is loudest this quarter. Most of them
        are different versions of the same features anyway. The real skill
        isn&apos;t learning tools quickly — it&apos;s learning one well.
      </p>
      <p>
        Depth teaches you what the tool is actually doing, what to trust it
        with, and what stays true when the interface changes. Once you have
        that, picking up a new tool becomes a small step, not a from-scratch
        scramble. Every session builds toward that understanding: knowing how
        to figure things out, ask the right questions, and stay grounded as
        technology evolves.
      </p>

      <h3>Real Problems, Real Solutions</h3>
      <ul>
        <li>Writing prompts that actually get results</li>
        <li>Automating repetitive tasks in your business</li>
        <li>Building content pipelines you can reuse</li>
        <li>Understanding what AI can and can&apos;t do reliably</li>
        <li>Setting up tools like Claude Projects for your workflow</li>
      </ul>

      <h3>No Lectures. No Fluff.</h3>
      <p>
        Every session is conversational and hands-on. You interact directly with
        the tools — not watching me do it. I explain everything in plain terms
        and slow down whenever you have questions.
      </p>

      <div className="eogbook-drilldown" aria-label="Explore coaching details">
        <a href="/begin-learning/what-i-do/ai-skills" className="eogbook-drill-link">
          Explore AI Skills Training in depth
        </a>
        <a
          href="/begin-learning/what-i-do/lifelong-learning"
          className="eogbook-drill-link"
        >
          Learn about the Lifelong Learning Framework
        </a>
      </div>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          See if this fits your goals
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
