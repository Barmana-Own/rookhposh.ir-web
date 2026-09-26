import PublicFooter from "@/components/marketing/PublicFooter";
import PublicHeader from "@/components/marketing/PublicHeader";
import AnimationRuntime from "./AnimationRuntime";
import LoaderSection from "./LoaderSection";

export default function OctabootExperience() {
  return (
    <div className="page-shell" dir="rtl" aria-label="تجربه اتاق پرو دیجیتال رخ پوش">
      <LoaderSection />

      <PublicHeader />

      <main id="top">
        <section
          className="scene scene--fallback"
          id="scene"
          aria-labelledby="journey-title"
        >
          <h2 id="journey-title" className="visually-hidden">
            مراحل پرو مجازی لباس در رخ پوش
          </h2>
          <div className="sticky" id="sticky">
            <AnimationRuntime />

            <div className="panel panel--hero" data-panel="hero">
              <p className="eyebrow fa-copy">رخ پوش · اتاق پرو دیجیتال</p>
              <h1 className="hero-title fa-copy">
                {"پرو\u00a0مجازی\u00a0را"}
                <br />
                {"پیش\u00a0از\u00a0خرید"}
                <br />
                <em>امتحان کنید</em>
              </h1>
              <div className="scroll-cue">
                <span />
                <b className="scroll-cue__label fa-copy">اسکرول</b>
              </div>
            </div>

            <article className="panel panel--left" data-panel="1" dir="rtl">
              <span className="panel__index">01</span>
              <p className="panel__kicker fa-copy">تصویر شما</p>
              <h2 className="panel__title fa-copy">
                تصویرتان را
                <br />
                بارگذاری کنید
              </h2>
              <p className="panel__spec fa-copy">
                <i>شروع</i> تصویری واضح، تمام‌قد و رو به دوربین
              </p>
            </article>

            <article className="panel panel--right" data-panel="2" dir="rtl">
              <span className="panel__index">02</span>
              <p className="panel__kicker fa-copy">انتخاب استایل</p>
              <h2 className="panel__title fa-copy">
                لباس دلخواهتان را
                <br />
                انتخاب کنید
              </h2>
              <p className="panel__body fa-copy">
                از میان مدل‌ها، رنگ‌ها و اندازه‌های موجود انتخاب کنید. رخ پوش
                گزینه انتخابی شما را برای اجرای پرو مجازی آماده می‌کند.
              </p>
              <p className="panel__spec fa-copy">
                <i>کاتالوگ</i> مدل‌ها و رنگ‌های متنوع
              </p>
            </article>

            <article className="panel panel--left" data-panel="3" dir="rtl">
              <span className="panel__index">03</span>
              <p className="panel__kicker fa-copy">پردازش هوشمند</p>
              <h2 className="panel__title fa-copy">
                لباس، متناسب با
                <br />
                تصویر شما
              </h2>
              <p className="panel__spec fa-copy">
                <i>فناوری</i> جانمایی هوشمند لباس روی تصویر
              </p>
            </article>

            <article className="panel panel--right" data-panel="4" dir="rtl">
              <span className="panel__index">04</span>
              <p className="panel__kicker fa-copy">پیش‌نمایش</p>
              <h2 className="panel__title fa-copy">
                نتیجه را پیش از
                <br />
                خرید ببینید
              </h2>
              <p className="panel__spec fa-copy">
                <i>وضوح</i> نمایش طبیعی فرم و جزئیات لباس
              </p>
            </article>

            <article className="panel panel--left" data-panel="5" dir="rtl">
              <span className="panel__index">05</span>
              <p className="panel__kicker fa-copy">مقایسه</p>
              <h2 className="panel__title fa-copy">
                استایل‌ها را
                <br />
                کنار هم بسنجید
              </h2>
              <p className="panel__spec fa-copy">
                <i>انتخاب</i> مقایسه مدل، رنگ و تناسب
              </p>
            </article>

            <article className="panel panel--right" data-panel="6" dir="rtl">
              <span className="panel__index">06</span>
              <p className="panel__kicker fa-copy">جزئیات انتخاب</p>
              <h2 className="panel__title fa-copy">
                رنگ و اندازه را
                <br />
                دقیق‌تر کنید
              </h2>
              <p className="panel__spec fa-copy">
                <i>تنظیم</i> شخصی‌سازی انتخاب نهایی
              </p>
            </article>

            <article className="panel panel--left" data-panel="7" dir="rtl">
              <span className="panel__index">07</span>
              <p className="panel__kicker fa-copy">خرید مطمئن</p>
              <h2 className="panel__title fa-copy">
                با اطمینان
                <br />
                سفارش دهید
              </h2>
              <p className="panel__body fa-copy">
                وقتی انتخاب نهایی‌تان را پیدا کردید، با تصویری روشن از نتیجه،
                خریدتان را با اطمینان کامل کنید.
              </p>
              <p className="panel__spec fa-copy">
                <i>نتیجه</i> تصمیمی مطمئن، پیش از پرداخت
              </p>
            </article>

          </div>
        </section>

        <section className="pricing" id="plans" aria-labelledby="pricing-title">
          <div className="pricing__intro">
            <p className="eyebrow eyebrow--center fa-copy">تعرفه‌های شفاف</p>
            <h2 id="pricing-title" className="pricing__title fa-copy">
              برای هر مرحله از <span>رشد شما</span>
            </h2>
            <p className="pricing__lead fa-copy">
              از اولین تجربه تا استفاده مداوم، پلنی را انتخاب کنید که با ریتم
              فروش شما هماهنگ است.
            </p>
          </div>

          <div className="pricing-grid">
            <article className="pricing-card" dir="rtl">
              <div className="pricing-card__header">
                <div>
                  <p className="pricing-card__eyebrow fa-copy">پکیج</p>
                  <h3 className="pricing-card__title fa-copy">آزمایشی</h3>
                </div>
                <span className="pricing-card__term fa-copy">۱ ماه دسترسی</span>
              </div>
              <p className="pricing-card__body fa-copy">
                شروعی کم‌ریسک برای سنجش تجربه پرو مجازی در فروشگاه شما.
              </p>
              <p className="pricing-card__price fa-copy">
                <strong>۹۰۰,۰۰۰</strong>
                <span>تومان</span>
              </p>
              <dl className="pricing-card__details">
                <div>
                  <dt className="fa-copy">اعتبار کل</dt>
                  <dd className="fa-copy">۱,۲۰۰ پرو</dd>
                </div>
                <div>
                  <dt className="fa-copy">نرخ هر پرو</dt>
                  <dd className="fa-copy">۷۵۰ تومان</dd>
                </div>
              </dl>
              <a
                className="pricing-card__cta fa-copy"
                href="https://dash.rookhposh.ir"
                target="_blank"
                rel="noopener noreferrer"
              >
                انتخاب پکیج آزمایشی
              </a>
            </article>

            <article className="pricing-card pricing-card--featured" dir="rtl">
              <span className="pricing-card__badge fa-copy">محبوب‌ترین</span>
              <div className="pricing-card__header">
                <div>
                  <p className="pricing-card__eyebrow fa-copy">پکیج</p>
                  <h3 className="pricing-card__title fa-copy">فصلی</h3>
                </div>
                <span className="pricing-card__term fa-copy">۴ ماه دسترسی</span>
              </div>
              <p className="pricing-card__body fa-copy">
                انتخاب متعادل برای کمپین‌ها و کالکشن‌های یک فصل کامل.
              </p>
              <p className="pricing-card__price fa-copy">
                <strong>۳,۲۰۰,۰۰۰</strong>
                <span>تومان</span>
              </p>
              <dl className="pricing-card__details">
                <div>
                  <dt className="fa-copy">اعتبار کل</dt>
                  <dd className="fa-copy">۵,۰۰۰ پرو</dd>
                </div>
                <div>
                  <dt className="fa-copy">نرخ هر پرو</dt>
                  <dd className="fa-copy">۶۴۰ تومان</dd>
                </div>
              </dl>
              <a
                className="pricing-card__cta fa-copy"
                href="https://dash.rookhposh.ir"
                target="_blank"
                rel="noopener noreferrer"
              >
                انتخاب پکیج فصلی
              </a>
            </article>

            <article className="pricing-card" dir="rtl">
              <span className="pricing-card__badge pricing-card__badge--dark fa-copy">
                کمترین نرخ هر پرو
              </span>
              <div className="pricing-card__header">
                <div>
                  <p className="pricing-card__eyebrow fa-copy">پکیج</p>
                  <h3 className="pricing-card__title fa-copy">سالانه</h3>
                </div>
                <span className="pricing-card__term fa-copy">۱۲ ماه دسترسی</span>
              </div>
              <p className="pricing-card__body fa-copy">
                بیشترین ظرفیت و بهترین نرخ برای فروشگاه‌های در حال رشد.
              </p>
              <p className="pricing-card__price fa-copy">
                <strong>۸,۴۰۰,۰۰۰</strong>
                <span>تومان</span>
              </p>
              <dl className="pricing-card__details">
                <div>
                  <dt className="fa-copy">اعتبار کل</dt>
                  <dd className="fa-copy">۱۴,۰۰۰ پرو</dd>
                </div>
                <div>
                  <dt className="fa-copy">نرخ هر پرو</dt>
                  <dd className="fa-copy">۶۰۰ تومان</dd>
                </div>
              </dl>
              <a
                className="pricing-card__cta fa-copy"
                href="https://dash.rookhposh.ir"
                target="_blank"
                rel="noopener noreferrer"
              >
                انتخاب پکیج سالانه
              </a>
            </article>
          </div>

          <section className="faq" id="faq" aria-labelledby="faq-title">
            <div className="faq__intro">
              <p className="eyebrow eyebrow--center fa-copy">پاسخ‌های کوتاه</p>
              <h2 id="faq-title" className="faq__title fa-copy">
                درباره پرو مجازی رخ پوش
              </h2>
              <p className="faq__lead fa-copy">
                پاسخ پرسش‌های اصلی درباره روند انتخاب تصویر، لباس و نتیجه نهایی.
              </p>
            </div>

            <div className="faq__list">
              <details className="faq__item">
                <summary className="fa-copy">رخ پوش چه خدمتی ارائه می‌کند؟</summary>
                <p className="fa-copy">
                  رخ پوش امکان پرو مجازی لباس را فراهم می‌کند تا فروشگاه‌ها
                  نتیجه انتخاب لباس را روی تصویر مشتری پیش از خرید ببینند.
                </p>
              </details>
              <details className="faq__item">
                <summary className="fa-copy">برای شروع چه تصویری لازم است؟</summary>
                <p className="fa-copy">
                  یک تصویر واضح، تمام‌قد و رو به دوربین برای شروع تجربه مناسب
                  است.
                </p>
              </details>
              <details className="faq__item">
                <summary className="fa-copy">چه چیزهایی را می‌توانم انتخاب کنم؟</summary>
                <p className="fa-copy">
                  می‌توانید مدل، رنگ و اندازه لباس را انتخاب و گزینه‌های مختلف
                  را با هم مقایسه کنید.
                </p>
              </details>
              <details className="faq__item">
                <summary className="fa-copy">پرو مجازی چه کمکی به خرید می‌کند؟</summary>
                <p className="fa-copy">
                  با دیدن پیش‌نمایش قبل از پرداخت، تصمیم‌گیری درباره انتخاب
                  نهایی با تصویر روشن‌تری انجام می‌شود.
                </p>
              </details>
            </div>
          </section>

          <PublicFooter />
        </section>


      </main>
    </div>
  );
}
