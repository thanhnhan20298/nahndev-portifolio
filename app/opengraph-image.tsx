import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config/site";

export const runtime = "edge";
export const alt = siteConfig.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#f5f5f5",
        padding: 80,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(225,25,36,0.06) 3px, rgba(225,25,36,0.06) 6px)",
        }}
      />
      <p style={{ fontSize: 28, letterSpacing: 8, color: "#e11924", margin: 0 }}>CLASSIFIED</p>
      <p
        style={{
          fontSize: 96,
          fontWeight: 800,
          textTransform: "uppercase",
          margin: "16px 0 0",
          lineHeight: 1,
        }}
      >
        {siteConfig.name}
      </p>
      <p style={{ fontSize: 32, marginTop: 24, opacity: 0.85, maxWidth: 800 }}>
        Full-stack · FPT Software · Spring & Next.js
      </p>
      <div
        style={{
          marginTop: 48,
          width: 120,
          height: 6,
          background: "#e11924",
        }}
      />
    </div>,
    { ...size },
  );
}
