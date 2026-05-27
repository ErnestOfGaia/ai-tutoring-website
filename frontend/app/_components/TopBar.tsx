/**
 * TopBar — persistent header rendered from app/layout.tsx on every page.
 *
 * Replaced the older inline text bar (phone / email / LinkedIn / @handle).
 * Now: a prominent "Text Me" pill + circular icon buttons for Email,
 * LinkedIn, and YouTube. Hides the raw contact details from passersby
 * while still routing real intent through one tap.
 *
 * Icons: inline SVGs (no extra asset pipeline, no extra HTTP requests,
 * inherit currentColor so brand-color theming Just Works).
 *
 * Text Me: uses sms: scheme — native SMS composer on phones, Phone Link /
 * Messages on desktops with a handler installed.
 */

const PHONE = "+15036640546";
const EMAIL = "eog@ErnestOfGaia.xyz";
const LINKEDIN = "https://linkedin.com/in/ernestofgaia";
const YOUTUBE = "https://www.youtube.com/@ErnestOfGaia";

export default function TopBar() {
  return (
    <header className="top-bar">
      <div className="top-bar-inner">
        <a href={`sms:${PHONE}`} className="text-me-btn" aria-label="Text Ernest">
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Text Me</span>
        </a>

        <span className="top-bar-divider" aria-hidden="true" />

        <a
          // Gmail web compose — opens in a new tab regardless of whether
          // the visitor has a desktop mail client. More reliable than
          // mailto: which silently no-ops for many Windows + Chrome users.
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EMAIL)}`}
          className="icon-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email Ernest"
          title={`Email ${EMAIL}`}
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </a>

        <a
          href={LINKEDIN}
          className="icon-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          title="LinkedIn"
        >
          <svg
            width="18" height="18" viewBox="0 0 24 24" fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
          </svg>
        </a>

        <a
          href={YOUTUBE}
          className="icon-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
          title="YouTube"
        >
          <svg
            width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
            aria-hidden="true"
          >
            <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z" />
          </svg>
        </a>
      </div>
    </header>
  );
}
