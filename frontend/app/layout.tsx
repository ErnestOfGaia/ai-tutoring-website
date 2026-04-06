import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ernest Of Gaia — AI Coaching",
  description:
    "Personalized 1-on-1 AI coaching for prompt engineering and lifecycle automation. Serving Pacific City to Portland, Oregon.",
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
        "Personalized AI coaching for prompt engineering and lifecycle automation",
      areaServed: "Pacific City to Portland Metro, Oregon",
    },
    {
      "@type": "Person",
      name: "Ernest Of Gaia",
      url: "https://ernestofgaia.xyz",
      sameAs: [
        "https://linkedin.com/in/ernestofgaia",
        "https://x.com/ErnestOfGaia",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
