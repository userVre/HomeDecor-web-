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
          color: "#1c2024",
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
              color: "#60646c",
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
            alignItems: "center",
            background: "#f0f0f3",
            border: "1px solid #e8e8e8",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            padding: "44px",
            width: "42%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              background: siteConfig.brandBlue,
              borderRadius: 999,
              color: "#ffffff",
              display: "flex",
              fontSize: 58,
              fontWeight: 800,
              height: 128,
              justifyContent: "center",
              width: 128,
            }}
          >
            H
          </div>
          <div
            style={{
              color: "#1c2024",
              display: "flex",
              fontSize: 34,
              fontWeight: 700,
              lineHeight: 1.1,
              marginTop: 34,
              textAlign: "center",
            }}
          >
            {post.category}
          </div>
          <div
            style={{
              color: "#60646c",
              display: "flex",
              fontSize: 24,
              lineHeight: 1.3,
              marginTop: 18,
              textAlign: "center",
            }}
          >
            AI home design ideas for real spaces
          </div>
        </div>
      </div>
    ),
    size,
  );
}
