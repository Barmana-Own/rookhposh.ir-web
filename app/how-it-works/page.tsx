import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import StorySteps from "@/components/marketing/StorySteps";
import { createPageMetadata } from "@/lib/marketing";

export const metadata: Metadata = createPageMetadata({
  title: "نحوه کار پرو مجازی لباس",
  description:
    "از بارگذاری تصویر تا انتخاب لباس و دیدن نتیجه پیش از خرید؛ مراحل تجربه پرو مجازی رخ پوش را ببینید.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <MarketingPageShell
      breadcrumb="نحوه کار"
      path="/how-it-works"
      eyebrow="مسیر پرو مجازی"
      title="از تصویر تا انتخاب نهایی"
      description="رخ پوش مسیر انتخاب لباس را از تصویر شما تا دیدن نتیجه پیش از خرید، در چند مرحله روشن توضیح می‌دهد."
    >
      <section className="content-page__section" aria-labelledby="steps-title">
        <p className="eyebrow eyebrow--center fa-copy">هفت مرحله روشن</p>
        <h2 id="steps-title" className="content-page__section-title fa-copy">
          تجربه‌ای که از انتخاب شروع می‌شود
        </h2>
        <p className="content-page__section-lead fa-copy">
          تصویر واضح، انتخاب لباس و پیش‌نمایش نتیجه در کنار هم قرار می‌گیرند تا
          مقایسه مدل، رنگ و اندازه پیش از خرید ساده‌تر باشد.
        </p>
        <StorySteps />
      </section>

      <section className="content-page__callout" aria-labelledby="next-step-title">
        <div>
          <p className="eyebrow fa-copy">ادامه مسیر</p>
          <h2 id="next-step-title" className="content-page__callout-title fa-copy">
            برای فروشگاه‌ها، مسیر انتخاب را روشن‌تر کنید
          </h2>
        </div>
        <Link className="content-page__button fa-copy" href="/for-online-stores">
          آشنایی با کاربرد برای فروشگاه‌ها
        </Link>
      </section>
    </MarketingPageShell>
  );
}
