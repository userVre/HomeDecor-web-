import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";

const BASE_URL = "https://home-decor-web-mu.vercel.app";
const STATIC_PATHS = ["/", "/blog", "/how-it-works", "/compare"];

export const dynamic = "force-dynamic";
export const revalidate = 0;

function cleanSlug(slug: string) {
  return slug
    .trim()
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function sitemapUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return encodeURI(`${BASE_URL}${normalizedPath}`);
}

function strictIsoDate(date: Date) {
  return date.toISOString();
}

function postIsoDate(date: string, slug: string) {
  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Invalid sitemap date for blog post "${slug}": ${date}`);
  }

  return strictIsoDate(parsedDate);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = strictIsoDate(new Date());
  const staticEntries = STATIC_PATHS.map((path) => ({
    url: sitemapUrl(path),
    lastModified: now,
  }));
  const blogEntries = getAllBlogPosts().map((post) => {
    const slug = cleanSlug(post.slug);

    if (!slug) {
      throw new Error(`Invalid sitemap slug for blog post: ${post.slug}`);
    }

    return {
      url: sitemapUrl(`/blog/${slug}`),
      lastModified: postIsoDate(post.date, post.slug),
    };
  });

  return [...staticEntries, ...blogEntries];
}
