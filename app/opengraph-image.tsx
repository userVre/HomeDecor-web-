import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#ffffff",
          color: "#050505",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "34px",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "20px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: siteConfig.brandBlue,
                borderRadius: "999px",
                color: "#ffffff",
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                height: 72,
                justifyContent: "center",
                width: 72,
              }}
            >
              H
            </div>
            <div style={{ fontSize: 34, fontWeight: 700 }}>{siteConfig.name}</div>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 82,
              fontWeight: 700,
              letterSpacing: -1,
              lineHeight: 0.96,
              maxWidth: 930,
            }}
          >
            AI Interior Design for Modern Homes
          </div>
          <div
            style={{
              color: "#5f6368",
              display: "flex",
              fontSize: 30,
              lineHeight: 1.35,
              maxWidth: 820,
            }}
          >
            Photorealistic room makeovers, luxury decor ideas, and intelligent
            design planning.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
