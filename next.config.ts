import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['213.108.20.181'], // Add your backend domain here
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '213.108.20.181',
        port: '3000',
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
