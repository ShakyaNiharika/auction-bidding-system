import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'www.saveur.com',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    // ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows ALL domains
      },
    ],
  },
};

export default nextConfig;
