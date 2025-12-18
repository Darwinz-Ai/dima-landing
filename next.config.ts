import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [{
      protocol: "https",
      hostname: "firebasestorage.googleapis.com"
    },
    {
      protocol: "https",
      hostname: "placehold.co"
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com"
    }
    ],
    qualities: [75, 85, 95, 100],
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
