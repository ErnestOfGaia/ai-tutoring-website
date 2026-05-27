import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  /**
   * Legacy URL redirects.
   *
   * /eogbook was renamed to /begin-learning on 2026-05-27. Any link
   * elsewhere on the internet — print, social, prior agentic-brain
   * summaries, search-engine indexes — still resolves to the right
   * page via a permanent (301) redirect. Safe to remove once we're
   * confident no inbound traffic is using the old paths.
   */
  async redirects() {
    return [
      {
        source: "/eogbook",
        destination: "/begin-learning",
        permanent: true,
      },
      {
        source: "/eogbook/:path*",
        destination: "/begin-learning/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
