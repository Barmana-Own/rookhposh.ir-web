import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";

export const alt = "رخ پوش | پرو مجازی لباس برای فروشگاه‌ها";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#0a0a0b",
          color: "#f4eee3",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          textAlign: "right",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#d8bd82",
            direction: "rtl",
            display: "flex",
            fontSize: 42,
            fontWeight: 700,
            marginBottom: 28,
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            direction: "rtl",
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.25,
            maxWidth: 1000,
          }}
        >
          Rookhposh
        </div>
        <div
          style={{
            color: "#c9c1b5",
            display: "flex",
            fontSize: 28,
            lineHeight: 1.7,
            marginTop: 28,
            maxWidth: 900,
          }}
        >
          Virtual clothing try-on for stores
        </div>
      </div>
    ),
    size,
  );
}
