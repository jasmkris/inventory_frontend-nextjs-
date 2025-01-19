import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['44.233.151.27'], // Add your backend domain here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '44.233.151.27',
        port: '10000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
