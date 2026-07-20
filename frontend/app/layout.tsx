import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import ChatOverlay from "./_components/ChatOverlay";
import TopBar from "./_components/TopBar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ernest Of Gaia — AI Coaching",
  description:
    "A human-centered approach to AI. Personalized 1-on-1 coaching for your home, hobby, or business — plain English, no jargon, no hype. Serving Pacific City to Portland, Oregon & the I-5 Corridor.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      name: "Ernest Of Gaia",
      url: "https://ernestofgaia.xyz",
      telephone: "+15036640546",
      email: "eog@ErnestOfGaia.xyz",
      description:
        "A human-centered approach to AI. Personalized 1-on-1 coaching for your home, hobby, or business — plain English, no jargon, no hype.",
      areaServed: "Pacific City to Portland Metro, Oregon & the I-5 Corridor",
    },
    {
      "@type": "Person",
      name: "Ernest Of Gaia",
      url: "https://ernestofgaia.xyz",
      sameAs: [
        "https://linkedin.com/in/ernestofgaia",
        "https://www.youtube.com/@ErnestOfGaia",
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <TopBar />
        {children}
        <ChatOverlay />
        <Script
          defer
          src="https://analytics.ernestofgaia.xyz/script.js"
          data-website-id="6c3937c8-81e4-4ab5-a392-73e2223b236d"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
