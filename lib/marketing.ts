import type { Metadata } from "next";
import {
  SITE_NAME,
  SITE_ORIGIN,
  SITE_URL,
} from "@/lib/site";

export const SOCIAL_IMAGE = {
  url: "/images/rookhposh-mark.webp",
  width: 768,
  height: 512,
  alt: "نشان رخ پوش",
};

export const PUBLIC_INDEXABLE_ROUTES = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/for-online-stores", changeFrequency: "monthly", priority: 0.8 },
  { path: "/how-it-works", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
] as const;

export const STORY_STEPS = [
  {
    number: "۰۱",
    title: "تصویرتان را بارگذاری کنید",
    description: "تصویری واضح، تمام‌قد و رو به دوربین برای شروع تجربه مناسب است.",
  },
  {
    number: "۰۲",
    title: "لباس دلخواهتان را انتخاب کنید",
    description: "مدل، رنگ و اندازه لباس را از میان گزینه‌های موجود انتخاب کنید.",
  },
  {
    number: "۰۳",
    title: "لباس، متناسب با تصویر شما",
    description: "رخ پوش گزینه انتخابی شما را برای اجرای پرو مجازی روی تصویر آماده می‌کند.",
  },
  {
    number: "۰۴",
    title: "نتیجه را پیش از خرید ببینید",
    description: "پیش‌نمایش نتیجه، فرم و جزئیات لباس را پیش از پرداخت روشن‌تر می‌کند.",
  },
  {
    number: "۰۵",
    title: "استایل‌ها را کنار هم بسنجید",
    description: "مدل، رنگ و تناسب گزینه‌های مختلف را با هم مقایسه کنید.",
  },
  {
    number: "۰۶",
    title: "رنگ و اندازه را دقیق‌تر کنید",
    description: "انتخاب نهایی را با جزئیات بیشتری شخصی‌سازی کنید.",
  },
  {
    number: "۰۷",
    title: "با اطمینان سفارش دهید",
    description: "با تصویر روشن‌تری از نتیجه، انتخاب نهایی‌تان را انجام دهید.",
  },
] as const;

export const PLANS = [
  {
    name: "آزمایشی",
    term: "۱ ماه دسترسی",
    description: "شروعی کم‌ریسک برای سنجش تجربه پرو مجازی در فروشگاه شما.",
    price: "۹۰۰,۰۰۰",
    credits: "۱,۲۰۰ پرو",
    unitPrice: "۷۵۰ تومان",
    badge: "",
    featured: false,
  },
  {
    name: "فصلی",
    term: "۴ ماه دسترسی",
    description: "انتخاب متعادل برای کمپین‌ها و کالکشن‌های یک فصل کامل.",
    price: "۳,۲۰۰,۰۰۰",
    credits: "۵,۰۰۰ پرو",
    unitPrice: "۶۴۰ تومان",
    badge: "محبوب‌ترین",
    featured: true,
  },
  {
    name: "سالانه",
    term: "۱۲ ماه دسترسی",
    description: "بیشترین ظرفیت و بهترین نرخ برای فروشگاه‌های در حال رشد.",
    price: "۸,۴۰۰,۰۰۰",
    credits: "۱۴,۰۰۰ پرو",
    unitPrice: "۶۰۰ تومان",
    badge: "کمترین نرخ هر پرو",
    featured: false,
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "رخ پوش چه خدمتی ارائه می‌کند؟",
    answer:
      "رخ پوش امکان پرو مجازی لباس را فراهم می‌کند تا فروشگاه‌ها نتیجه انتخاب لباس را روی تصویر مشتری پیش از خرید ببینند.",
  },
  {
    question: "برای شروع چه تصویری لازم است؟",
    answer: "یک تصویر واضح، تمام‌قد و رو به دوربین برای شروع تجربه مناسب است.",
  },
  {
    question: "چه چیزهایی را می‌توانم انتخاب کنم؟",
    answer: "می‌توانید مدل، رنگ و اندازه لباس را انتخاب و گزینه‌های مختلف را با هم مقایسه کنید.",
  },
  {
    question: "پرو مجازی چه کمکی به خرید می‌کند؟",
    answer:
      "با دیدن پیش‌نمایش قبل از پرداخت، تصمیم‌گیری درباره انتخاب نهایی با تصویر روشن‌تری انجام می‌شود.",
  },
] as const;

export function publicUrl(path: string) {
  const normalizedPath = path === "/" ? "/" : `/${path.replace(/^\/+|\/+$/g, "")}/`;
  return new URL(normalizedPath, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = publicUrl(path);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "fa_IR",
      url: canonical,
      siteName: SITE_NAME,
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    authors: [{ name: SITE_NAME, url: SITE_ORIGIN }],
  };
}
