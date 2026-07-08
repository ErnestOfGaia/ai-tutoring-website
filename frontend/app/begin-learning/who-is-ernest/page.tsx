import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";

export const metadata: Metadata = {
  title: "Who Is Ernest",
  description:
    "Ernest Of Gaia is a local AI coach on the Oregon Coast, helping people use appropriate AI tools in their home, hobby, or business. Plain English, no jargon, no hype.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/who-is-ernest",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ernest Of Gaia",
  jobTitle: "AI Coach",
  description:
    "Local AI coach helping people use appropriate AI tools in their home, hobby, or business through personalized 1-on-1 coaching.",
  url: "https://ernestofgaia.xyz",
  telephone: "+1-503-664-0546",
  email: "eog@ernestofgaia.xyz",
  address: {
    "@type": "PostalAddress",
    addressRegion: "Oregon",
    addressLocality: "Pacific City",
  },
  sameAs: [
    "https://linkedin.com/in/ernestofgaia",
    "https://www.youtube.com/@ErnestOfGaia",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Prompt Engineering",
    "AI Coaching",
    "Workflow Automation",
    "Lifelong Learning",
  ],
};

export default function WhoIsErnest() {
  return (
    <PageLayout
      prev="/begin-learning"
      prevLabel="← Back"
      next="/begin-learning/what-i-do"
      nextLabel="What I Do →"
      breadcrumbs={[{ label: "Who Is Ernest", href: "/begin-learning/who-is-ernest" }]}
      jsonLd={personJsonLd}
    >
      <h1>Who Is Ernest</h1>

      <p>
        I&apos;m Ernest, a local AI coach based on the Oregon Coast. I help
        people understand and use appropriate AI tools in their home, hobby,
        or business — no jargon, no hype, no selling you something you
        don&apos;t need.
      </p>

      <h3>My Story</h3>
      <p>
        I grew up cooking, selling, and growing food in the Midwest before
        moving to Oregon. I currently live in Pacific City and work along the
        coast and the I-5 corridor in Oregon. Over the years I have taught
        farmers and young scientists how to use basic technology to support
        their work and businesses. Whether it&apos;s accounting,
        communications, inventory tracking, or any of the other boring things
        that computers do, quite simply AI tools are making it cost effective
        for small businesses to service themselves and offer services that
        only the big companies could offer.
      </p>
      <p>
        I love teaching in person, in non-traditional settings, and I love
        learning from others and helping bring their dreams into existence.
      </p>

      <h3>My Approach</h3>
      <p>
        Every session is one-on-one, on your actual device, with your real
        problems. I don&apos;t lecture. I don&apos;t show slides. We work
        together until something clicks. If you have questions, we slow down.
        If you want to go deeper, we go deeper.
      </p>

      <h3>My Philosophy</h3>
      <p>
        AI is a tool. It&apos;s not magic, it&apos;s not coming for
        everyone&apos;s job, and it&apos;s not going to make your life better
        just because you bought it. It earns its place when it removes
        friction from work you actually do, in a way that fits how you
        actually live.
      </p>
      <p>
        My job is to help you decide what&apos;s <em>appropriate</em> — for
        your home, your hobby, or your business — and then build the small
        rhythm of practice that makes it stick. Notice what&apos;s worth
        doing. Try the smallest version of it. Evaluate honestly. Adjust.
        That cycle is the work.
      </p>
      <p>
        The skills we build outlast any specific tool. The model on the
        screen will change. The way you think about deciding, trying, and
        adjusting won&apos;t. That&apos;s the part I care about — and the
        part nobody else can do for you.
      </p>

      <h3>I Don&apos;t Make Courses. I Help You Use Them.</h3>
      <p>
        I don&apos;t build courses — I tutor people through good ones.{" "}
        <a
          href="https://www.anthropic.com/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>Anthropic Academy</strong>
        </a>{" "}
        is the one I stand behind: it&apos;s clear, well-paced, and built by
        the people making the tools. I&apos;m glad to sit with you while you
        work through it — applying what you learn to your real work,
        troubleshooting the exercises, and connecting concepts back to your
        day-to-day. There&apos;s a difference between watching someone explain
        a hammer and actually learning to build something, and that second
        part is where I come in.
      </p>
      <p>
        <strong>OpenAI</strong> and <strong>Google AI</strong> offer similar
        tracks if those tools fit your workflow better. Pick whichever course
        matches your goals — what matters most is what <em>you&apos;re</em>{" "}
        trying to do, not which platform we use to get there.
      </p>

      <div className="eogbook-drilldown" aria-label="Explore more about Ernest">
        <a href="/begin-learning/who-is-ernest/approach" className="eogbook-drill-link">
          Explore my coaching approach and methodology
        </a>
      </div>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Schedule a free call
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
