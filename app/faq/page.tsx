import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/marketing/FaqList";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import { createPageMetadata } from "@/lib/marketing";

export const metadata: Metadata = createPageMetadata({
  title: "پاسخ پرسش‌های رایج درباره رخ پوش",
  description:
    "پاسخ‌های کوتاه درباره تصویر ورودی، انتخاب لباس و پیش‌نمایش نتیجه رخ پوش.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <MarketingPageShell
      breadcrumb="سؤالات متداول"
      path="/faq"
      eyebrow="پاسخ‌های کوتاه"
      title="پاسخ به پرسش‌های رایج"
      description="پاسخ‌های کوتاه درباره شروع تجربه، انتخاب لباس و دیدن پیش‌نمایش نتیجه."
    >
      <section className="faq content-page__faq" aria-labelledby="faq-list-title">
        <div className="faq__intro">
          <h2 id="faq-list-title" className="faq__title fa-copy">
            پرسش‌های اصلی
          </h2>
          <p className="faq__lead fa-copy">
            پرسش‌های رایج درباره تصویر ورودی و انتخاب گزینه‌های لباس را یک‌جا
            بخوانید.
          </p>
        </div>
        <FaqList />
      </section>
      <section className="content-page__callout" aria-labelledby="faq-next-title">
        <div>
          <p className="eyebrow fa-copy">ادامه مسیر</p>
          <h2 id="faq-next-title" className="content-page__callout-title fa-copy">
            مراحل پرو مجازی را ببینید
          </h2>
        </div>
        <div className="content-page__callout-actions">
          <Link className="content-page__button fa-copy" href="/how-it-works">
            مشاهده نحوه کار
          </Link>
          <Link className="content-page__button fa-copy" href="/blog">
            مطالعه مقالات رخ پوش
          </Link>
        </div>
      </section>
    </MarketingPageShell>
  );
}
