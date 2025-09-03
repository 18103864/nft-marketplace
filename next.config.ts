import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip ESLint during builds
  images: {
    domains: ['gateway.pinata.cloud', 'via.placeholder.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Skip TypeScript type errors during builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Keep your transpiles (useful for mpl/umi)
  transpilePackages: [
    '@metaplex-foundation/mpl-token-metadata',
    '@metaplex-foundation/umi',
  ],
};

export default nextConfig;
