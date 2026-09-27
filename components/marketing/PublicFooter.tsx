import Image from "next/image";
import Link from "next/link";

export default function PublicFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__main">
        <div className="foot-trust">
          <h4 className="fa-copy">اعتماد شما</h4>
          <a
            className="enamad-seal"
            href="https://trustseal.enamad.ir/?id=766810&Code=BoszJ7ELEWQDMP7xbJAbGXYk4CYHnr8L"
            target="_blank"
            rel="noopener noreferrer"
            referrerPolicy="origin"
            aria-label="مشاهده نماد اعتماد الکترونیکی رخ پوش"
          >
            <img
              src="https://trustseal.enamad.ir/logo.aspx?id=766810&Code=BoszJ7ELEWQDMP7xbJAbGXYk4CYHnr8L"
              alt="نماد اعتماد الکترونیکی رخ پوش"
              loading="lazy"
              referrerPolicy="origin"
            />
          </a>
        </div>

        <div className="foot-cols">
          <div>
            <h4 className="fa-copy">رخ‌پوش</h4>
            <Link className="fa-copy" href="/">
              صفحه اصلی
            </Link>
            <Link className="fa-copy" href="/how-it-works">
              نحوه کار
            </Link>
            <Link className="fa-copy" href="/faq">
              سؤالات متداول
            </Link>
            <span
              className="footer-link footer-link--pending fa-copy"
              aria-disabled="true"
              title="متن تأییدشده قوانین هنوز ارائه نشده است"
            >
              قوانین و شرایط استفاده
            </span>
            <span
              className="footer-link footer-link--pending fa-copy"
              aria-disabled="true"
              title="متن تأییدشده حریم خصوصی هنوز ارائه نشده است"
            >
              سیاست حفظ حریم خصوصی
            </span>
          </div>
          <div>
            <h4 className="fa-copy">راهنما</h4>
            <Link className="fa-copy" href="/for-online-stores">
              برای فروشگاه‌ها
            </Link>
            <Link className="fa-copy" href="/pricing">
              تعرفه‌ها
            </Link>
            <Link className="fa-copy" href="/blog">
              مقالات
            </Link>
          </div>
        </div>

        <div className="footer-about">
          <div className="footer-about__brand">
            <Image
              src="/images/rookhposh-mark.webp"
              alt="نشان رخ پوش"
              width={42}
              height={42}
            />
            <span className="fa-copy">رخ‌پوش</span>
          </div>
          <p className="footer-about__description fa-copy">
            رخ‌پوش، تجربه هوشمند پرو مجازی لباس؛ پلی میان انتخاب آنلاین و اطمینان واقعی.
          </p>
          <a className="footer-about__phone ltr-copy" href="tel:+989037862349">
            09037862349
          </a>
          <p className="footer-about__address fa-copy">
            خراسان رضوی، شهرستان نیشابور، مسکن مهر نور
          </p>
        </div>
      </div>

      <div className="site-footer__bottom">
        <p className="foot-legal fa-copy" dir="rtl">
          © <span id="year">۱۴۰۵</span> رخ‌پوش — تمام حقوق محفوظ است.
        </p>
        <p className="foot-signature fa-copy" dir="rtl">
          ساخته‌شده برای انتخاب مطمئن‌تر
        </p>
        <p className="foot-credit-line fa-copy" dir="rtl">
          © ۱۴۰۵ طراحی و توسعه توسط{" "}
          <a
            className="footer-credit fa-copy"
            href="https://bog.co.ir"
            target="_blank"
            rel="noopener noreferrer"
          >
            بارمانا
          </a>
        </p>
      </div>
    </footer>
  );
}
