import { getAllBlogPosts } from "@/lib/blog";

type SitemapEntry = {
  url: string;
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
  return `<url><loc>${escapeXml(entry.url)}</loc></url>`;
}

export function GET() {
  const posts = getAllBlogPosts().map((post) => ({
    url: sitemapUrl(`/blog/${post.slug}`),
  }));

  const entries: SitemapEntry[] = [
    {
      url: sitemapUrl("/"),
    },
    {
      url: sitemapUrl("/blog"),
    },
    {
      url: sitemapUrl("/how-it-works"),
    },
    {
      url: sitemapUrl("/compare"),
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
