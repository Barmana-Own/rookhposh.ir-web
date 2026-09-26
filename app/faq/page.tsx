import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/marketing/FaqList";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import { createPageMetadata } from "@/lib/marketing";

export const metadata: Metadata = createPageMetadata({
  title: "سؤالات متداول پرو مجازی لباس",
  description:
    "پاسخ پرسش‌های اصلی درباره تصویر، انتخاب لباس، پیش‌نمایش و مقایسه در پرو مجازی رخ پوش.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <MarketingPageShell
      breadcrumb="سؤالات متداول"
      path="/faq"
      eyebrow="پاسخ‌های کوتاه"
      title="درباره پرو مجازی رخ پوش"
      description="پاسخ پرسش‌های اصلی درباره روند انتخاب تصویر، لباس و نتیجه نهایی."
    >
      <section className="faq content-page__faq" aria-labelledby="faq-list-title">
        <div className="faq__intro">
          <h2 id="faq-list-title" className="faq__title fa-copy">
            پرسش‌های اصلی
          </h2>
          <p className="faq__lead fa-copy">
            اگر پاسخ موردنظر خود را پیدا نکردید، از طریق داشبورد با تجربه رخ پوش
            ادامه دهید.
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
        <Link className="content-page__button fa-copy" href="/how-it-works">
          مشاهده نحوه کار
        </Link>
      </section>
    </MarketingPageShell>
  );
}
