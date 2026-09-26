import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import PlanCards from "@/components/marketing/PlanCards";
import { createPageMetadata } from "@/lib/marketing";

export const metadata: Metadata = createPageMetadata({
  title: "تعرفه پرو مجازی لباس برای فروشگاه‌ها",
  description:
    "پلن‌های آزمایشی، فصلی و سالانه رخ پوش با اعتبار و نرخ مشخص برای فروشگاه‌ها.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <MarketingPageShell
      breadcrumb="تعرفه‌ها"
      path="/pricing"
      eyebrow="تعرفه‌های شفاف"
      title="برای هر مرحله از رشد شما"
      description="از اولین تجربه تا استفاده مداوم، پلنی را انتخاب کنید که با ریتم فروش شما هماهنگ است."
    >
      <section className="content-page__section content-page__section--wide" aria-labelledby="plans-title">
        <h2 id="plans-title" className="visually-hidden">
          پلن‌های رخ پوش
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
        <Link className="content-page__button fa-copy" href="/faq">
          مشاهده سؤالات متداول
        </Link>
      </section>
    </MarketingPageShell>
  );
}
