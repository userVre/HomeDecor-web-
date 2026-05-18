export const siteConfig = {
  name: "HomeDecor AI",
  title: "HomeDecor AI | Android AI Home Design App",
  description:
    "Upload a photo and visualize professional-looking AI redesign concepts for rooms, exteriors, gardens, walls, floors, and objects before you renovate.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://homedecor.ai",
  ogImage: "/opengraph-image",
  twitterHandle: "@homedecorai",
  brandBlue: "#3e63dd",
};

export function absoluteUrl(path = "/") {
  const baseUrl = siteConfig.url.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${baseUrl}${normalizedPath}`;
}
