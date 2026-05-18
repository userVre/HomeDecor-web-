const ROBOTS_TXT = `User-agent: *
Allow: /
Sitemap: https://home-decor-web-mu.vercel.app/sitemap.xml
`;

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
  return new Response(ROBOTS_TXT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
