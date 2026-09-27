import Link from "next/link";
import PublicFooter from "@/components/marketing/PublicFooter";
import PublicHeader from "@/components/marketing/PublicHeader";

export default function NotFound() {
  return (
    <div className="page-shell content-page not-found-page" dir="rtl">
      <PublicHeader />
      <main className="content-page__main not-found-page__main">
        <section className="content-page__hero" aria-labelledby="not-found-title">
          <p className="eyebrow fa-copy">خطای ۴۰۴</p>
          <h1 id="not-found-title" className="content-page__title fa-copy">
            صفحه مورد نظر پیدا نشد
          </h1>
          <p className="content-page__lead fa-copy">
            ممکن است نشانی صفحه تغییر کرده باشد. از یکی از مسیرهای زیر ادامه دهید.
          </p>
          <nav className="not-found__links" aria-label="پیوندهای پیشنهادی">
            <Link className="content-page__button fa-copy" href="/">
              صفحه اصلی
            </Link>
            <Link className="content-page__button fa-copy" href="/how-it-works">
              نحوه کار
            </Link>
            <Link className="content-page__button fa-copy" href="/for-online-stores">
              برای فروشگاه‌ها
            </Link>
            <Link className="content-page__button fa-copy" href="/pricing">
              تعرفه‌ها
            </Link>
            <Link className="content-page__button fa-copy" href="/blog">
              مقالات
            </Link>
            <Link className="content-page__button fa-copy" href="/faq">
              سؤالات متداول
            </Link>
          </nav>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
