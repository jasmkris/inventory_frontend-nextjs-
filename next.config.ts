import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['malonenace.ddns.net'], // Add your backend domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'malonenace.ddns.net',
        port: '',
        pathname: '/uploads/**',
      },
    ],
  },
  eslintConfig: {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // Change from error to warning
      "@typescript-eslint/no-unused-vars": ["error", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }],
      "react-hooks/exhaustive-deps": "warn"
    }
  }
};

export default nextConfig;
