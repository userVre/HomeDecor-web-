const ROBOTS_TXT = `User-agent: *
Allow: /
Sitemap: https://home-decor-web-mu.vercel.app/sitemap.xml
`;

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
