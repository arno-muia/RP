import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/giving", destination: "/give", permanent: true },
      { source: "/plan-visit", destination: "/visit", permanent: true },
      { source: "/request-prayer", destination: "/prayer", permanent: true },
      { source: "/learn", destination: "/academy", permanent: true },
    ];
  },
};

export default nextConfig;
