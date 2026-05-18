import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { comparisonPages } from "@/lib/comparisons";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/how-it-works"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/compare"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.date}T00:00:00.000Z`),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparisonRoutes = comparisonPages.map((page) => ({
    url: absoluteUrl(`/compare/${page.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...comparisonRoutes];
}
