import {
  SITE_DESCRIPTION,
  SITE_HOMEPAGE_URL,
  SITE_NAME,
  SITE_ORIGIN,
} from "@/lib/site";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_ORIGIN}/#organization`,
      name: SITE_NAME,
      url: SITE_HOMEPAGE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/images/rookhposh-mark.webp`,
        width: 768,
        height: 512,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+989037862349",
        contactType: "customer service",
        availableLanguage: ["fa-IR"],
      },
      sameAs: ["https://blog.rookhposh.ir"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_ORIGIN}/#website`,
      url: SITE_HOMEPAGE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "fa-IR",
      publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    },
    {
      "@type": "Service",
      "@id": `${SITE_ORIGIN}/#virtual-fitting-room`,
      name: "پرو مجازی لباس",
      serviceType: "پرو مجازی لباس برای فروشگاه‌ها",
      description:
        "پیش‌نمایش هوشمند لباس روی تصویر مشتری برای مقایسه مدل، رنگ و اندازه پیش از خرید.",
      provider: { "@id": `${SITE_ORIGIN}/#organization` },
      availableLanguage: ["fa-IR"],
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
