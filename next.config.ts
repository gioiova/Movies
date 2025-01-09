import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"], // Add this line to allow images from image.tmdb.org
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // Use true for permanent redirect
      },
    ];
  },
};

export default nextConfig;
