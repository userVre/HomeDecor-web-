import { getAllBlogPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/site";

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const XML_CONTENT_TYPE = "application/xml; charset=utf-8";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(date: Date) {
  return date.toISOString();
}

function renderUrl(entry: SitemapEntry) {
  return `<url><loc>${escapeXml(entry.url)}</loc><lastmod>${escapeXml(entry.lastModified)}</lastmod><changefreq>${entry.changeFrequency}</changefreq><priority>${entry.priority}</priority></url>`;
}

export function GET() {
  const now = formatDate(new Date());
  const posts = getAllBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: formatDate(new Date(`${post.date}T00:00:00.000Z`)),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const entries: SitemapEntry[] = [
    {
      url: absoluteUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
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
      priority: 0.85,
    },
    {
      url: absoluteUrl("/compare"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    ...posts,
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries.map(renderUrl).join("")}</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": XML_CONTENT_TYPE,
    },
  });
}
