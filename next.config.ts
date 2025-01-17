import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  images: {
    domains: ['localhost'], // Add your backend domain here
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
    ],
  },
=======
  /* config options here */
>>>>>>> e8f13d079188d56eaced21503e0728eb2c3b82be
};

export default nextConfig;
