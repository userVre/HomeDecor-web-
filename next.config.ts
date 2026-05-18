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
      {
        source: "/sitemap_index.xml/",
        destination: "/sitemap_index.xml",
      },
      {
        source: "/sitemap-0.xml/",
        destination: "/sitemap-0.xml",
      },
      {
        source: "/google-sitemap.xml/",
        destination: "/google-sitemap.xml",
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
