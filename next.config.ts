import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: '**.cloudfront.net',
    }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
