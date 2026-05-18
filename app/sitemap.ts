import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { comparisonPages } from "@/lib/comparisons";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.date}T00:00:00`),
    changeFrequency: "weekly" as const,
    priority: 0.8,
    images: [
      post.heroImage.startsWith("http")
        ? post.heroImage
        : absoluteUrl(post.heroImage),
    ],
  }));

  const comparisons = comparisonPages.map((page) => ({
    url: absoluteUrl(`/compare/${page.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/how-it-works"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/compare"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...posts,
    ...comparisons,
  ];
}
