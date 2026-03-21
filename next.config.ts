import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/gonpunclaw-web",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
