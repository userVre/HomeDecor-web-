import type { MetadataRoute } from "next";
import { getSitemapEntries } from "@/lib/sitemap";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function sitemap(): MetadataRoute.Sitemap {
  return getSitemapEntries();
}
