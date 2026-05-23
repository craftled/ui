import { ImageResponse } from "next/og";

export const alt = "Craftled UI — a craft-led, shadcn-native component library";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        backgroundColor: "#0a0a0a",
        backgroundImage:
          "radial-gradient(circle at 20% 20%, rgba(255, 107, 157, 0.18) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(167, 139, 250, 0.18) 0%, transparent 50%)",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        fontFamily: "sans-serif",
        height: "100%",
        justifyContent: "space-between",
        padding: "80px",
        width: "100%",
      }}
    >
      {/* Top: brand mark */}
      <div
        style={{
          alignItems: "center",
          color: "rgba(250, 250, 250, 0.7)",
          display: "flex",
          fontSize: "26px",
          fontWeight: 500,
          gap: "16px",
          letterSpacing: "-0.02em",
        }}
      >
        <div
          style={{
            background:
              "linear-gradient(135deg, #ff6b9d 0%, #a78bfa 50%, #60a5fa 100%)",
            borderRadius: "10px",
            display: "flex",
            height: "36px",
            width: "36px",
          }}
        />
        Craftled UI
      </div>

      {/* Bottom: title + tagline + url */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "32px",
        }}
      >
        <div
          style={{
            color: "#fafafa",
            display: "flex",
            flexDirection: "column",
            fontSize: "110px",
            fontWeight: 700,
            letterSpacing: "-0.05em",
            lineHeight: 0.95,
          }}
        >
          <span style={{ display: "flex" }}>Craft-led,</span>
          <span style={{ display: "flex" }}>shadcn-native.</span>
        </div>
        <div
          style={{
            alignItems: "flex-end",
            color: "rgba(250, 250, 250, 0.6)",
            display: "flex",
            fontSize: "30px",
            justifyContent: "space-between",
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ display: "flex" }}>
            Charts, blocks, shaders, and primitives.
          </span>
          <span
            style={{
              color: "rgba(250, 250, 250, 0.5)",
              display: "flex",
              fontSize: "24px",
            }}
          >
            ui.craftled.com
          </span>
        </div>
      </div>
    </div>,
    size
  );
}
