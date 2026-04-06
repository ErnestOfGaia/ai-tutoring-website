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
          <p className="eyebrow">Your local guide to AI tools</p>

          <h1>Ernest Of Gaia</h1>

          <p className="hero-body">
            Master the art of prompt engineering and lifecycle automation
            through personalized, 1-on-1 holistic coaching.
          </p>

          <p className="tagline">AI, Explained Like a Human</p>

          <div className="location-pill">Pacific City → Portland, Oregon</div>

          <div className="services">
            <div className="service-card">1-on-1 Coaching</div>
            <div className="service-card">Custom Plans</div>
            <div className="service-card">On-Site Visits</div>
          </div>

          <button type="button" className="cta-btn">
            Chat with me
          </button>
        </div>
      </main>
    </>
  );
}
