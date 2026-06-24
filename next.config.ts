import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  async redirects() {
    return [
      {
        source: "/solutions",
        destination: "/solutions/social-listening-analytics",
        permanent: true
      },
      {
        source: "/solution/:slug*",
        destination: "/solutions/:slug*",
        permanent: true
      }
    ]
  }
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
