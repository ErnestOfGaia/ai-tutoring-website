import type { Metadata } from "next";
import ChatButton from "../_components/ChatButton";

export const metadata: Metadata = {
  title: {
    default: "Begin Learning — Ernest Of Gaia",
    template: "%s | Ernest Of Gaia",
  },
  description:
    "Explore AI coaching services from Ernest Of Gaia. Who I am, what I do, service tiers, coaching plans, Last Mile website development, the nonprofit giveback program, FAQs, and how to get started.",
};

export default function EOGbookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Contact links moved to the global TopBar (app/_components/TopBar.tsx),
          rendered from app/layout.tsx. EOGbook keeps only its own subnav for
          chat + back-to-home. */}
      <nav className="eogbook-subnav">
        <ChatButton className="top-nav-cta" />
        <a href="/">← Home</a>
      </nav>

      {/* ── Hero background + card ── */}
      <main className="hero">
        <div className="hero-card eogbook-card">{children}</div>
      </main>
    </>
  );
}
