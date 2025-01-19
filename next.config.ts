import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['213.108.20.181'], // Add your backend domain here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '213.108.20.181',
        port: '3000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
