import type { Metadata, Viewport } from "next";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/500.css";
import "@fontsource/vazirmatn/600.css";
import "@fontsource/vazirmatn/700.css";
import "@fontsource/vazirmatn/800.css";
import "./globals.css";
import StructuredData from "@/components/seo/StructuredData";
import { SOCIAL_IMAGE } from "@/lib/marketing";
import {
  SITE_DESCRIPTION,
  SITE_HOMEPAGE_URL,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_URL,
  getGoogleSiteVerification,
} from "@/lib/site";

const googleSiteVerification = getGoogleSiteVerification();

export const metadata: Metadata = {
  metadataBase: SITE_URL,
  title: {
    default: "رخ پوش | اتاق پرو دیجیتال لباس",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: SITE_HOMEPAGE_URL,
  },
  authors: [{ name: SITE_NAME, url: SITE_ORIGIN }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_HOMEPAGE_URL,
    siteName: SITE_NAME,
    title: "رخ پوش | اتاق پرو دیجیتال لباس",
    description: SITE_DESCRIPTION,
    images: [SOCIAL_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "رخ پوش | اتاق پرو دیجیتال لباس",
    description: SITE_DESCRIPTION,
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
  verification: googleSiteVerification
    ? { google: googleSiteVerification }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
