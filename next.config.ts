import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    AUTH_SECRET: process.env.AUTH_SECRET,
  },
  /* config options here */
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tee-up-photos.s3.us-west-2.amazonaws.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;