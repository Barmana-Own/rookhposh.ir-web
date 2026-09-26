import type { Metadata } from "next";
import Link from "next/link";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import { createPageMetadata } from "@/lib/marketing";

export const metadata: Metadata = createPageMetadata({
  title: "پرو مجازی لباس برای فروشگاه‌ها",
  description:
    "رخ پوش برای فروشگاه‌ها امکان دیدن پیش‌نمایش لباس روی تصویر مشتری را پیش از خرید فراهم می‌کند.",
  path: "/for-online-stores",
});

const storeBenefits = [
  {
    title: "تصویر مشتری",
    description: "تجربه با یک تصویر واضح، تمام‌قد و رو به دوربین شروع می‌شود.",
  },
  {
    title: "انتخاب مدل و رنگ",
    description: "گزینه‌های لباس را انتخاب کنید و مدل، رنگ و اندازه را کنار هم ببینید.",
  },
  {
    title: "پیش‌نمایش پیش از خرید",
    description: "نتیجه انتخاب روی تصویر مشتری پیش از پرداخت قابل مشاهده و مقایسه است.",
  },
] as const;

export default function ForOnlineStoresPage() {
  return (
    <MarketingPageShell
      breadcrumb="برای فروشگاه‌ها"
      path="/for-online-stores"
      eyebrow="برای فروشگاه‌ها"
      title="پرو مجازی لباس برای فروشگاه‌ها"
      description="رخ پوش پلی میان انتخاب آنلاین و اطمینان واقعی است؛ تصویری روشن‌تر از نتیجه لباس، پیش از خرید."
    >
      <section className="content-page__section" aria-labelledby="store-value-title">
        <p className="eyebrow eyebrow--center fa-copy">کاربرد محصول</p>
        <h2 id="store-value-title" className="content-page__section-title fa-copy">
          یک مسیر روشن برای انتخاب لباس
        </h2>
        <p className="content-page__section-lead fa-copy">
          رخ پوش تجربه پرو مجازی لباس را برای فروشگاه‌ها توضیح می‌دهد: تصویر
          مشتری، لباس انتخابی و پیش‌نمایش نتیجه در یک مسیر قابل فهم کنار هم قرار
          می‌گیرند.
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
            از آن می‌توان مدل، رنگ و اندازه لباس را انتخاب و نتیجه را پیش از خرید
            دید.
          </p>
        </div>
        <div className="content-page__callout content-page__callout--compact">
          <p className="eyebrow fa-copy">انتخاب پلن</p>
          <h3 className="content-page__callout-title fa-copy">
            پلنی متناسب با ریتم فروشگاه انتخاب کنید
          </h3>
          <Link className="content-page__button fa-copy" href="/pricing">
            مشاهده تعرفه‌ها
          </Link>
        </div>
      </section>
    </MarketingPageShell>
  );
}
