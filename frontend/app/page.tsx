import Link from "next/link";
import ChatButton from "./_components/ChatButton";

export default function Home() {
  return (
    <>
      {/* TopBar moved to app/layout.tsx — now persistent across all routes */}

      {/* ── Hero ── */}
      <main className="hero">
        <div className="hero-card">
          <div key="info" className="card-content">
            <p className="eyebrow">Your local guide to AI tools</p>

            <h1>Ernest Of Gaia</h1>

            <p className="hero-body">
              A Human-Centered Approach to AI.
              <br />
              Learn AI that actually fits the way you work, think, and live.
            </p>

            <p className="tagline">AI for your Home, Hobby, or Business</p>

            <div className="location-pill">
              <span aria-hidden="true">📍</span>
              <span>Pacific City → Portland, Oregon</span>
            </div>

            <div className="services">
              <Link href="/begin-learning/services" className="service-card">Services</Link>
              {/* The Blog is served by a separate container at /blog (via NPM), not a
                  route in this app — use a plain anchor for a real navigation. */}
              <a href="/blog" className="service-card">The Blog</a>
              <Link href="/begin-learning/giveback" className="service-card">Give Back</Link>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link href="/begin-learning" className="cta-btn" style={{ textDecoration: 'none' }}>
                Learn More
              </Link>
              <ChatButton className="cta-btn">Ask Questions</ChatButton>
              {/* Auto-sends a booking-intent message so the router lands
                  the visitor directly on the secretary agent — no recap of
                  intent needed. */}
              <ChatButton
                className="cta-btn"
                initialMessage="Hi! I'd like to book an appointment."
              >
                Book Appointment
              </ChatButton>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
