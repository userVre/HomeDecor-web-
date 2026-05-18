import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";
import { comparisonPages } from "@/lib/comparisons";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/") },
    { url: absoluteUrl("/blog") },
    { url: absoluteUrl("/how-it-works") },
    { url: absoluteUrl("/compare") },
  ];

  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
  }));

  const comparisonRoutes = comparisonPages.map((page) => ({
    url: absoluteUrl(`/compare/${page.slug}`),
  }));

  return [...staticRoutes, ...blogRoutes, ...comparisonRoutes];
}
