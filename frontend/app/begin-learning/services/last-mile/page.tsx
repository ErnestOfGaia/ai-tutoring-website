import type { Metadata } from "next";
import PageLayout from "../../_components/PageLayout";

export const metadata: Metadata = {
  title: "Last Mile Website Development — Oregon",
  description:
    "Website almost done but not quite? Last Mile Website Development finishes what's stalled: broken forms, placeholder copy, missing SEO, mobile bugs, slow pages. Flat quote after a free audit. Serving Oregon small businesses — Pacific City, Portland, Salem, and the I-5 corridor.",
  alternates: {
    canonical: "https://ernestofgaia.xyz/begin-learning/services/last-mile",
  },
};

// Pricing intentionally unnumbered: flat quote per fix after the free audit.
// [PRICE TBD] — Ernest sets published prices (flat-fee vs hourly still open
// per the Last Mile exploration doc). Do not invent numbers.
const lastMileJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Last Mile Website Development",
  serviceType: "Website Finishing and Repair",
  description:
    "Finishing service for websites that are 80-90% done: broken contact forms, unedited placeholder copy, missing SEO tags, slow load times, mobile layout bugs, and deployment issues. Flat quote after a free site audit. For Oregon small businesses.",
  provider: {
    "@type": "Person",
    name: "Ernest Of Gaia",
    url: "https://ernestofgaia.xyz",
  },
  areaServed: [
    { "@type": "State", name: "Oregon" },
    { "@type": "City", name: "Portland" },
    { "@type": "City", name: "Salem" },
    { "@type": "City", name: "Pacific City" },
  ],
  offers: {
    "@type": "Offer",
    // Flat quote per engagement — no list price published.
    priceSpecification: {
      "@type": "PriceSpecification",
      priceCurrency: "USD",
    },
    availability: "https://schema.org/InStock",
  },
};

export default function LastMile() {
  return (
    <PageLayout
      prev="/begin-learning/services"
      prevLabel="← Services"
      next="/begin-learning/get-started"
      nextLabel="Get Started →"
      breadcrumbs={[
        { label: "Services", href: "/begin-learning/services" },
        { label: "Last Mile", href: "/begin-learning/services/last-mile" },
      ]}
      jsonLd={lastMileJsonLd}
    >
      <h1>Last Mile Website Development</h1>
      <h2>Almost-Finished Isn&apos;t Finished</h2>

      <p>
        Is your website still not done? The contact form that never quite
        worked, the &ldquo;Lorem ipsum&rdquo; nobody replaced, the page that
        looks wrong on phones, the freelancer who stopped answering emails.
        You don&apos;t need a rebuild — you need someone to finish the last
        mile.
      </p>

      <h3>What Counts as the Last Mile</h3>
      <ul>
        <li>Contact and booking forms that don&apos;t submit, don&apos;t send, or land in spam</li>
        <li>Placeholder text and images still sitting on live pages</li>
        <li>Missing page titles, descriptions, and the SEO basics Google needs to find you</li>
        <li>Pages that load slowly or break on mobile</li>
        <li>A site that&apos;s built but stuck — never actually launched, or launched at the wrong address</li>
        <li>Small features the original build skipped: a menu update, a photo gallery, an online form</li>
      </ul>

      <h3>How It Works</h3>
      <ol>
        <li>
          <strong>Free audit.</strong> Send me your web address. I check the
          forms, the speed, the mobile view, and the search-engine basics, and
          send you a plain-English list of what&apos;s actually wrong.
        </li>
        <li>
          <strong>Flat quote.</strong> You get one price for the fix — not an
          hourly meter running. You decide what&apos;s worth fixing.
        </li>
        <li>
          <strong>The fix.</strong> I do the work, show you the before and
          after, and confirm everything works on your devices.
        </li>
        <li>
          <strong>The handoff.</strong> You get a short write-up of what
          changed and how to keep it working. No lock-in, no forced
          maintenance contract.
        </li>
      </ol>

      <h3>Who This Is For</h3>
      <p>
        Oregon small businesses with a website that&apos;s 80–90% done —
        self-built on a template, inherited from a departed freelancer, or
        stalled after the agency quote for &ldquo;phase two&rdquo; came in
        too high. Restaurants, farms, shops, trades, galleries, and
        professional services from the coast to the I-5 corridor. If the last
        20% has been on your to-do list for months, that&apos;s the job.
      </p>

      <h3>See the Work</h3>
      <p>
        <a
          href="https://mechanicalcupcakes.fun"
          target="_blank"
          rel="noopener noreferrer"
        >
          <strong>mechanicalcupcakes.fun</strong>
        </a>{" "}
        is my working project gallery — different styles of website builds and
        mini apps, finished and in progress. Its resident agent,{" "}
        <strong>Hoot</strong>, can explain the web-development principles and
        techniques behind each one in plain English.
      </p>

      <h3>Why a Coach for This?</h3>
      <p>
        Because the fix comes with understanding. Every Last Mile job ends
        with you knowing what was broken, what changed, and how to keep it
        healthy — the same plain-English, no-lock-in approach as my AI
        coaching. And if you want to learn to maintain the site yourself,
        that&apos;s a natural next step we can take together.
      </p>

      <div className="eogbook-cta-row">
        <a href="sms:+15036640546" className="cta-btn">
          Text me your web address for a free audit
        </a>
      </div>
    </PageLayout>
  );
}
