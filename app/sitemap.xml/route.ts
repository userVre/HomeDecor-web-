import { getAllBlogPosts } from "@/lib/blog";

type SitemapEntry = {
  url: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
};

const XML_CONTENT_TYPE = "application/xml; charset=utf-8";
const SITEMAP_BASE_URL = "https://home-decor-web-mu.vercel.app";
const XML_INVALID_CHARACTER_PATTERN =
  /[^\u{9}\u{A}\u{D}\u{20}-\u{D7FF}\u{E000}-\u{FFFD}\u{10000}-\u{10FFFF}]/gu;
const XML_ENTITIES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};

function escapeXml(value: string | number) {
  return String(value)
    .replace(XML_INVALID_CHARACTER_PATTERN, "")
    .replace(/[&<>"']/g, (character) => XML_ENTITIES[character]);
}

function formatDate(date: Date) {
  return date.toISOString();
}

function formatPostDateForSitemap(date: string, slug: string) {
  const postDate = new Date(`${date}T00:00:00.000Z`);

  if (Number.isNaN(postDate.getTime())) {
    throw new Error(`Invalid sitemap date for post "${slug}": ${date}`);
  }

  return formatDate(postDate);
}

function encodeSitemapPath(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return normalizedPath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function sitemapUrl(path = "/") {
  return `${SITEMAP_BASE_URL}${encodeSitemapPath(path)}`;
}

function renderUrl(entry: SitemapEntry) {
  return `<url><loc>${escapeXml(entry.url)}</loc><lastmod>${escapeXml(entry.lastModified)}</lastmod><changefreq>${escapeXml(entry.changeFrequency)}</changefreq><priority>${escapeXml(entry.priority)}</priority></url>`;
}

export function GET() {
  const now = formatDate(new Date());
  const posts = getAllBlogPosts().map((post) => ({
    url: sitemapUrl(`/blog/${post.slug}`),
    lastModified: formatPostDateForSitemap(post.date, post.slug),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const entries: SitemapEntry[] = [
    {
      url: sitemapUrl("/"),
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: sitemapUrl("/blog"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: sitemapUrl("/how-it-works"),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: sitemapUrl("/compare"),
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
