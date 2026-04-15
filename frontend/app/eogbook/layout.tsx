import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "EOGbook — Ernest Of Gaia",
    template: "%s | EOGbook — Ernest Of Gaia",
  },
  description:
    "Explore AI coaching services from Ernest Of Gaia. Seven pages covering who I am, what I do, service tiers, how coaching works, the nonprofit giveback program, FAQs, and how to get started.",
};

export default function EOGbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* ── Top bar ── */}
      <header className="top-bar">
        <a href="tel:+15036640546">503-664-0546</a>
        <a href="mailto:eog@ernestofgaia.xyz">eog@ernestofgaia.xyz</a>
        <a
          href="https://linkedin.com/in/ernestofgaia"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://x.com/ErnestOfGaia"
          target="_blank"
          rel="noopener noreferrer"
        >
          @ErnestOfGaia
        </a>
        <a href="/">← Home</a>
      </header>

      {/* ── Hero background + card ── */}
      <main className="hero">
        <div className="hero-card eogbook-card">{children}</div>
      </main>
    </>
  );
}
