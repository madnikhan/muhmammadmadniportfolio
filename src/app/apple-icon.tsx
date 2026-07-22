import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#070b09",
          color: "#33ff99",
          fontFamily: "ui-monospace, Menlo, monospace",
          border: "6px solid rgba(51,255,153,0.35)",
        }}
      >
        <div style={{ fontSize: 28, color: "#6b8f7a", marginBottom: 4 }}>$</div>
        <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1 }}>M</div>
      </div>
    ),
    { ...size },
  );
}
