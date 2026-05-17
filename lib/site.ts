export const siteConfig = {
  name: "HomeDecor AI",
  title: "HomeDecor AI | AI Interior Design & Room Makeovers",
  description:
    "Transform rooms with AI-powered interior design concepts, photorealistic makeovers, and luxury home decor inspiration.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://homedecor.ai",
  ogImage: "/opengraph-image",
  twitterHandle: "@homedecorai",
  brandBlue: "#2563eb",
};

export function absoluteUrl(path = "/") {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
