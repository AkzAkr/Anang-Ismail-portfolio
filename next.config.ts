import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // optimizePackageImports: GSAP + Lenis kecil, tapi tetap rapikan per skill nextjs build-*
  experimental: {
    optimizePackageImports: ["gsap"],
  },
};

export default nextConfig;
