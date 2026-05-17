import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { getBlogPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type BlogOpenGraphImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BlogOpenGraphImage({
  params,
}: BlogOpenGraphImageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return new ImageResponse(
    (
      <div
        style={{
          background: "#ffffff",
          color: "#050505",
          display: "flex",
          height: "100%",
          padding: "64px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "58%",
          }}
        >
          <div
            style={{
              color: siteConfig.brandBlue,
              display: "flex",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 0.98,
              paddingRight: "32px",
            }}
          >
            {post.title}
          </div>
          <div
            style={{
              color: "#5f6368",
              display: "flex",
              fontSize: 25,
              lineHeight: 1.35,
              paddingRight: "44px",
            }}
          >
            {post.excerpt}
          </div>
        </div>
        <div
          style={{
            background: "#f4f4f2",
            display: "flex",
            height: "100%",
            overflow: "hidden",
            width: "42%",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={post.heroAlt}
            src={post.heroImage}
            style={{
              height: "100%",
              objectFit: "cover",
              width: "100%",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
