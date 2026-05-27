import type { MetadataRoute } from "next";

const BASE_URL = "https://ernestofgaia.xyz";
const LAST_MOD = "2026-04-15";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Root
    {
      url: `${BASE_URL}/`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 1.0,
    },

    // ── EOGbook home directory
    {
      url: `${BASE_URL}/begin-learning`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 1.0,
    },

    // ── EOGbook main pages
    {
      url: `${BASE_URL}/begin-learning/who-is-ernest`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/begin-learning/what-i-do`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/begin-learning/services`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/begin-learning/how-it-works`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/begin-learning/giveback`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/begin-learning/trust`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/begin-learning/get-started`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    // ── EOGbook drill-down pages
    {
      url: `${BASE_URL}/begin-learning/who-is-ernest/approach`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/what-i-do/ai-skills`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/what-i-do/lifelong-learning`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/services/tier-1`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/begin-learning/services/tier-2`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/begin-learning/services/tier-3`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/begin-learning/services/plans`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/how-it-works/step-1`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/how-it-works/step-2`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/how-it-works/step-3`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/how-it-works/step-4-5`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/giveback/how-it-works`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/begin-learning/giveback/eligible-orgs`,
      lastModified: LAST_MOD,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
