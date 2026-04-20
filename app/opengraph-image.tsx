import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "TheUrk — Solo Founder · Systems Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(120% 80% at 70% 20%, #1B2844 0%, #0F1729 45%, #0B1120 100%)",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          color: "#E8ECF4",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 4,
            color: "#7587A8",
            fontWeight: 600,
            marginBottom: 24,
          }}
        >
          THEURK
        </div>
        <div
          style={{
            fontSize: 132,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          Urk
        </div>
        <div
          style={{
            fontSize: 38,
            color: "#94A3B8",
            maxWidth: 900,
            lineHeight: 1.3,
            marginBottom: 56,
          }}
        >
          Solo Founder · Systems Designer
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 22,
            letterSpacing: 8,
            color: "#D4A853",
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 56,
              height: 1,
              backgroundColor: "#D4A853",
              display: "block",
            }}
          />
          THINK · DESIGN · SHIP
          <span
            style={{
              width: 56,
              height: 1,
              backgroundColor: "#D4A853",
              display: "block",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 64,
            right: 80,
            fontSize: 22,
            color: "#7587A8",
          }}
        >
          theurknotes.com
        </div>
      </div>
    ),
    { ...size },
  );
}
