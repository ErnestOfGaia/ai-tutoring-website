import Link from "next/link";
import ChatButton from "./_components/ChatButton";

export default function Home() {
  return (
    <>
      {/* ── Top bar ── */}
      <header className="top-bar">
        <a href="tel:+15036640546">503-664-0546</a>
        <a href="mailto:eog@ErnestOfGaia.xyz">eog@ErnestOfGaia.xyz</a>
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
      </header>

      {/* ── Hero ── */}
      <main className="hero">
        <div className="hero-card">
          <div key="info" className="card-content">
            <p className="eyebrow">Your local guide to AI tools</p>

            <h1>Ernest Of Gaia</h1>

            <p className="hero-body">
              Master the art of prompt engineering and lifecycle automation
              through personalized, 1-on-1 holistic coaching.
            </p>

            <p className="tagline">AI, Explained Like a Human</p>

            <div className="location-pill">Pacific City → Portland, Oregon</div>

            <div className="services">
              <Link href="/eogbook/what-i-do" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>Custom Workflows</Link>
              <Link href="/eogbook/services/tier-1" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>Foundations (Tier 1)</Link>
              <Link href="/eogbook/services/tier-2" className="service-card" style={{ textDecoration: 'none', color: 'inherit' }}>The Workshop (Tier 2)</Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/eogbook" className="cta-btn" style={{ textDecoration: 'none' }}>
                Open Book
              </Link>
              <ChatButton className="cta-btn" />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
