import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import PlanCards from "@/components/marketing/PlanCards";
import { createPageMetadata } from "@/lib/marketing";

export const metadata: Metadata = createPageMetadata({
  title: "انتخاب پلن رخ پوش برای فروشگاه‌ها",
  description:
    "مدت دسترسی، اعتبار و نرخ هر پلن رخ پوش را برای فروشگاه‌ها بررسی کنید.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <MarketingPageShell
      breadcrumb="تعرفه‌ها"
      path="/pricing"
      eyebrow="تعرفه‌های شفاف"
      title="تعرفه و پلن‌های رخ پوش"
      description="مدت دسترسی، اعتبار و نرخ هر پلن را پیش از انتخاب برای فروشگاه بررسی کنید."
    >
      <section className="content-page__section content-page__section--wide" aria-labelledby="plans-title">
        <h2 id="plans-title" className="visually-hidden">
          جزئیات پلن‌های قیمت‌گذاری رخ پوش
        </h2>
        <PlanCards />
      </section>
      <section className="content-page__callout" aria-labelledby="pricing-help-title">
        <div>
          <p className="eyebrow fa-copy">نیاز به اطلاعات بیشتر دارید؟</p>
          <h2 id="pricing-help-title" className="content-page__callout-title fa-copy">
            پاسخ پرسش‌های اصلی را بخوانید
          </h2>
        </div>
        <div className="content-page__callout-actions">
          <Link className="content-page__button fa-copy" href="/faq">
            مشاهده سؤالات متداول
          </Link>
          <Link className="content-page__button fa-copy" href="/blog">
            مطالعه مقالات رخ پوش
          </Link>
        </div>
      </section>
    </MarketingPageShell>
  );
}
