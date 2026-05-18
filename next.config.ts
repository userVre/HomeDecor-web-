import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/sitemap.xml/",
        destination: "/sitemap.xml",
      },
      {
        source: "/robots.txt/",
        destination: "/robots.txt",
      },
      {
        source: "/sitemap.txt/",
        destination: "/sitemap.txt",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
