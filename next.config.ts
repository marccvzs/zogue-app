import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "**.ufs.sh",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
