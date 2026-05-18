import { getSitemapEntries } from "@/lib/sitemap";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export function GET() {
  const body = `${getSitemapEntries()
    .map((entry) => entry.url)
    .join("\n")}\n`;

  return new Response(body, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
