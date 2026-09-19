import { ImageResponse } from "next/og";
import { SITE, PROFILE } from "@/data/data";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** OG card bergaya sky-pixel: langit gradien + matahari piksel + brand. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: "linear-gradient(180deg, #55c8ee 0%, #6698de 60%, #3a2f68 100%)",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ width: 56, height: 56, background: "#ffd36a", border: "6px solid #10264a" }} />
          <div style={{ fontSize: 32, fontWeight: 700, color: "#10264a" }}>{SITE.brand}</div>
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, color: "#f7fcff", marginTop: 24, textShadow: "0 6px 0 rgba(16,38,74,0.4)" }}>
          SKY PIXEL PORTFOLIO
        </div>
        <div style={{ fontSize: 30, color: "#10264a", marginTop: 16 }}>{PROFILE.role}</div>
      </div>
    ),
    { ...size }
  );
}
