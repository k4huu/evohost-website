import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.evohost.pl/**")],
  },
};

export default nextConfig;
