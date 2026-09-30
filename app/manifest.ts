import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "رخ پوش | پرو مجازی لباس",
    short_name: "رخ پوش",
    description: "پرو مجازی لباس برای دیدن نتیجه انتخاب روی تصویر پیش از خرید.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    lang: "fa",
    dir: "rtl",
  };
}
