import type { Metadata } from "next";
import PageLayout from "../_components/PageLayout";
import FaqAccordion from "../_components/FaqAccordion";

export const metadata: Metadata = {
  title: "Trust & FAQs",
  description:
    "Frequently asked questions and trust signals for Ernest Of Gaia AI coaching. Real answers about getting started, pricing, results, and the nonprofit giveback program.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/trust",
  },
};

const faqItems = [
  {
    q: "I've never used AI before. Will I be lost?",
    a: "Not at all. This is exactly what Tier 1 is for. We start with the absolute basics — what AI is, what it can and can't do, how to write a simple prompt. No prerequisites. No embarrassment. Everyone starts somewhere.",
  },
  {
    q: "Do I need to bring anything special?",
    a: "Just your actual work device (laptop or tablet) and a free account at Claude.ai or ChatGPT. I'll send setup instructions before your first session.",
  },
  {
    q: "What if I'm not sure which tier is right?",
    a: "That's what the free handshake call is for. We'll talk through your goals, your current skill level, and what you're trying to accomplish. I'll recommend the tier that fits best.",
  },
  {
    q: "Can we do this remotely?",
    a: "Yes. I prefer in-person in the Pacific City to Portland corridor, but I offer online coaching too. If you're more than an hour away, we can do your first session online to see if it's a good fit.",
  },
  {
    q: "How long until I see results?",
    a: `Faster than you'd expect for confidence; slower than you'd hope for fluency.

The first few sessions tend to shift something — for some people it's losing the worry that they're doing it wrong, for others it's figuring out which parts of their actual work AI is good at, for others still it's just narrowing the field from "AI can do anything" to "here are the three things it does for me."

Workflows tend to come together over a couple of months of regular practice. Within a season, AI usually becomes part of the daily toolkit — but only if you're using what we cover between sessions.

I'd rather under-promise on a timeline than quote a number I can't back.`,
  },
  {
    q: "What if I don't have time for a full plan?",
    a: "Book single sessions as you go. No commitment. Most people start with 1–2 sessions to see how we work together, then decide if a plan makes sense.",
  },
  {
    q: "How does the nonprofit giveback actually work?",
    a: `You pick the nonprofit. After you complete 12 hours of paid coaching (any tier), tell me who you want the giveback to support — a local food bank, an arts collective, a community garden, whatever you care about. I reach out, set up the session in person or online, and you're welcome to sit in.

If you don't have a local nonprofit in mind, your hours can roll into the work I already do with [Team Rubicon](https://teamrubiconusa.org/), which has a Pacific Northwest chapter. I've been a Grey Shirt with them for a decade.

Their words, not mine: "Service, to us, is a mindset. It's a resolve — a beacon of light amidst the fog of chaos — to bring equitable relief to vulnerable communities before, during, and after a disaster strikes."`,
  },
  {
    q: "Will AI take my job?",
    a: `**It doesn't have to.** That's my honest first answer. Whether AI takes your job depends on a lot of things — what you do, who you work for, how the tools evolve — but most of it depends on what you do *next.* You have more say in this than the headlines suggest.

The real question hiding inside "Will AI take my job?" is a risk-management question. We treat risk like weather — something that happens to us. But anyone who's run a small business, or watched a toddler near a flight of stairs, already knows how to do this: notice what could go wrong, decide which risks matter, and put small habits in place before they need to be big decisions.

AI is one of those risks. So is doing nothing about AI. The way through isn't panic and it isn't denial — it's a cycle: **study, learn, try, evaluate.** Read a thing. Try a small version of it. See what changed in your work. Adjust. Repeat. That cycle shrinks the risk every time you complete it.

I'm not here to sell AI by making you anxious. If you came in with your stomach doing flips about being left behind, take a breath — that's not the headspace anything useful gets learned in. Come back when you're curious instead of anxious. What I want for you is the same thing I want for myself: to be grounded, useful, and inspired.`,
  },
];

// Strip inline markdown ([label](url), **bold**, *italic*) for the FAQ
// JSON-LD payload. Google's FAQPage schema expects plain text (or simple
// HTML), not markdown — leaving the syntax in would surface literal
// asterisks and "[Team Rubicon](https://…)" in search-result rich snippets.
const stripMd = (s: string) =>
  s
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: stripMd(item.a),
    },
  })),
};

export default function TrustFaqs() {
  return (
    <PageLayout
      prev="/begin-learning/giveback"
      prevLabel="← Nonprofit Giveback"
      next="/begin-learning/get-started"
      nextLabel="Get Started →"
      breadcrumbs={[{ label: "Trust & FAQs", href: "/begin-learning/trust" }]}
      jsonLd={faqJsonLd}
    >
      <h1>Trust &amp; FAQs</h1>

      <h2>What I Believe About Learning</h2>

      <div className="eogbook-beliefs">
        <div className="eogbook-belief">
          <h3>You&apos;re not behind. You&apos;re on time.</h3>
          <p>
            Every person I coach starts with the same private fear: <em>everyone
            else already gets this.</em> They don&apos;t. The people who look
            fluent with AI today started six months ago, asked the same beginner
            questions you have, and just kept showing up. The starting line is
            wherever you are right now &mdash; and that&apos;s the only place it
            could be.
          </p>
        </div>

        <div className="eogbook-belief">
          <h3>You don&apos;t need to be smart. You need a small rhythm.</h3>
          <p>
            Lifelong learners aren&apos;t people with special brains &mdash;
            they&apos;re people with a habit. Read a thing, try a small version
            of it the same week, tell someone what you learned. That&apos;s the
            whole game. AI rewards this rhythm more than any tool I&apos;ve used:
            ten minutes a day will get you further than ten hours of trying to
            &ldquo;study it properly.&rdquo;
          </p>
        </div>

        <div className="eogbook-belief">
          <h3>The goal isn&apos;t to master AI. It&apos;s to make your work breathe.</h3>
          <p>
            You don&apos;t have to become a &ldquo;prompt engineer&rdquo; or a
            &ldquo;power user.&rdquo; You just need the parts of your day that
            drain you to get lighter. Every &ldquo;ugh, this again&rdquo; is a
            candidate. We find the one that bugs you most, and we fix that one.
            Then the next one. That&apos;s how &ldquo;I don&apos;t know if I
            can&rdquo; turns into &ldquo;I already did.&rdquo;
          </p>
        </div>

        <p className="eogbook-belief-attribution">You can. You just haven&apos;t yet.</p>
      </div>

      <hr className="eogbook-divider" />

      <h2>Frequently Asked Questions</h2>

      <FaqAccordion items={faqItems} />

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Still have questions? Let&apos;s talk
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
