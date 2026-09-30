import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import { createPageMetadata } from "@/lib/marketing";

export const metadata: Metadata = createPageMetadata({
  title: "راهکار اتاق پرو مجازی برای فروشگاه‌های آنلاین",
  description:
    "برای فروشگاه‌های آنلاین لباس، نتیجه انتخاب را روی تصویر مشتری پیش از خرید بررسی کنید.",
  path: "/for-online-stores",
});

const storeBenefits = [
  {
    title: "تصویر مشتری",
    description: "تجربه با یک تصویر واضح، تمام‌قد و رو به دوربین شروع می‌شود.",
  },
  {
    title: "انتخاب گزینه‌های لباس",
    description: "گزینه‌های لباس را انتخاب کنید و مدل و رنگ را کنار هم ببینید.",
  },
  {
    title: "دیدن پیش‌نمایش انتخاب",
    description: "نتیجه انتخاب روی تصویر مشتری پیش از پرداخت برای بررسی دیده می‌شود.",
  },
] as const;

export default function ForOnlineStoresPage() {
  return (
    <MarketingPageShell
      breadcrumb="برای فروشگاه‌ها"
      path="/for-online-stores"
      eyebrow="برای فروشگاه‌ها"
      title="راهکار پرو مجازی برای فروشگاه‌های آنلاین"
      description="دیدن گزینه‌های لباس روی تصویر مشتری، مسیر انتخاب آنلاین را برای فروشگاه‌ها روشن‌تر می‌کند."
    >
      <section className="content-page__section" aria-labelledby="store-value-title">
        <p className="eyebrow eyebrow--center fa-copy">کاربرد محصول</p>
        <h2 id="store-value-title" className="content-page__section-title fa-copy">
          پیش‌نمایش لباس در مسیر خرید آنلاین
        </h2>
        <p className="content-page__section-lead fa-copy">
          رخ پوش برای فروشگاه‌ها تصویر مشتری، گزینه لباس و پیش‌نمایش نتیجه را در
          یک مسیر ساده کنار هم قرار می‌دهد.
        </p>

        <div className="content-page__cards">
          {storeBenefits.map((benefit, index) => (
            <article className="content-page__card" key={benefit.title}>
              <p className="content-page__card-index">۰{index + 1}</p>
              <h3 className="fa-copy">{benefit.title}</h3>
              <p className="fa-copy">{benefit.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-page__split" aria-labelledby="store-start-title">
        <div>
          <p className="eyebrow fa-copy">شروع تجربه</p>
          <h2 id="store-start-title" className="content-page__section-title fa-copy">
            برای شروع چه چیزی لازم است؟
          </h2>
          <p className="content-page__section-copy fa-copy">
            یک تصویر واضح، تمام‌قد و رو به دوربین برای شروع تجربه مناسب است. پس
            از آن می‌توان گزینه‌های لباس را انتخاب و نتیجه را پیش از خرید دید.
          </p>
        </div>
        <div className="content-page__callout content-page__callout--compact">
          <p className="eyebrow fa-copy">انتخاب پلن</p>
          <h3 className="content-page__callout-title fa-copy">
            تعرفه‌ها را برای برنامه فروشگاه بررسی کنید
          </h3>
          <div className="content-page__callout-actions">
            <Link className="content-page__button fa-copy" href="/pricing">
              مشاهده تعرفه‌های رخ پوش
            </Link>
            <Link className="content-page__button fa-copy" href="/blog">
              مطالعه مقالات
            </Link>
          </div>
        </div>
      </section>
    </MarketingPageShell>
  );
}
