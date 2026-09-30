import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import StorySteps from "@/components/marketing/StorySteps";
import { createPageMetadata } from "@/lib/marketing";

export const metadata: Metadata = createPageMetadata({
  title: "مراحل استفاده از پرو مجازی لباس",
  description:
    "هفت مرحله تجربه رخ پوش را از بارگذاری تصویر تا دیدن پیش‌نمایش نتیجه مرور کنید.",
  path: "/how-it-works",
});

export default function HowItWorksPage() {
  return (
    <MarketingPageShell
      breadcrumb="نحوه کار"
      path="/how-it-works"
      eyebrow="مسیر پرو مجازی"
      title="مراحل پرو مجازی، از تصویر تا انتخاب"
      description="رخ پوش مسیر بارگذاری تصویر، انتخاب لباس و دیدن پیش‌نمایش نتیجه را در چند مرحله توضیح می‌دهد."
    >
      <section className="content-page__section" aria-labelledby="steps-title">
        <p className="eyebrow eyebrow--center fa-copy">هفت مرحله روشن</p>
        <h2 id="steps-title" className="content-page__section-title fa-copy">
          تجربه‌ای که از انتخاب شروع می‌شود
        </h2>
        <p className="content-page__section-lead fa-copy">
          تصویر واضح، انتخاب لباس و پیش‌نمایش نتیجه در چند گام کنار هم قرار
          می‌گیرند.
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
        <div className="content-page__callout-actions">
          <Link className="content-page__button fa-copy" href="/for-online-stores">
            آشنایی با کاربرد برای فروشگاه‌ها
          </Link>
          <Link className="content-page__button fa-copy" href="/blog">
            مطالعه مقالات رخ پوش
          </Link>
        </div>
      </section>
    </MarketingPageShell>
  );
}
