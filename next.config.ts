import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
