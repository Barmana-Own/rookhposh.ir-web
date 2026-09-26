import Image from "next/image";
import Link from "next/link";

export default function PublicHeader() {
  return (
    <header className="site-header" id="header">
      <Link className="brand" href="/" aria-label="خانه رخ پوش">
        <Image
          className="brand__mark"
          src="/images/rookhposh-mark.webp"
          alt="نشان رخ پوش"
          width={70}
          height={47}
        />
        <span className="brand__word fa-copy">رخ پوش</span>
      </Link>
      <nav className="nav" aria-label="ناوبری اصلی">
        <Link className="fa-copy" href="/how-it-works">
          نحوه کار
        </Link>
        <Link className="fa-copy" href="/pricing">
          تعرفه‌ها
        </Link>
        <a
          className="fa-copy"
          href="https://blog.rookhposh.ir"
          target="_blank"
          rel="noopener noreferrer"
        >
          وبلاگ
        </a>
        <a
          className="nav__cta"
          href="https://dash.rookhposh.ir"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="fa-copy">ورود به اتاق پرو</span>
        </a>
      </nav>
    </header>
  );
}
