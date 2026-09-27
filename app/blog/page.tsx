import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";

// Temporary noindex destination. Replace with the approved blog implementation in Prompt 02.
export const metadata: Metadata = {
  title: { absolute: "مقالات | رخ پوش" },
  description: "بخش مقالات رخ پوش هنوز برای انتشار آماده نشده است.",
  alternates: { canonical: "https://rookhposh.ir/blog/" },
  robots: { index: false, follow: true },
};

export default function BlogPlaceholderPage() {
  return (
    <MarketingPageShell
      breadcrumb="مقالات"
      path="/blog"
      eyebrow="مقالات رخ پوش"
      title="مقالات به‌زودی منتشر می‌شوند"
      description="بخش مقالات رخ پوش هنوز برای انتشار آماده نشده است."
    >
      <section className="content-page__section" aria-labelledby="blog-placeholder-title">
        <h2 id="blog-placeholder-title" className="content-page__section-title fa-copy">
          این بخش در حال آماده‌سازی است
        </h2>
        <p className="content-page__section-copy fa-copy">
          برای آشنایی بیشتر با پرو مجازی لباس، می‌توانید نحوه کار، خدمات فروشگاهی و
          پاسخ‌های متداول را مطالعه کنید.
        </p>
        <Link className="content-page__button fa-copy" href="/faq">
          مشاهده سؤالات متداول
        </Link>
      </section>
    </MarketingPageShell>
  );
}
