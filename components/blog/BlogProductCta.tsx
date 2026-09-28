import Link from "next/link";

export default function BlogProductCta() {
  return (
    <section className="blog-cta" aria-labelledby="blog-cta-title">
      <div>
        <p className="eyebrow fa-copy">رخ پوش</p>
        <h2 id="blog-cta-title" className="blog-cta__title fa-copy">
          درباره کاربرد پرو مجازی لباس بیشتر بدانید
        </h2>
      </div>
      <Link className="content-page__button fa-copy" href="/for-online-stores">
        آشنایی برای فروشگاه‌ها
      </Link>
    </section>
  );
}
