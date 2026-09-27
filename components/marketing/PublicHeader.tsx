import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";

const PUBLIC_NAVIGATION_LINKS = [
  { href: "/how-it-works", label: "نحوه کار" },
  { href: "/for-online-stores", label: "برای فروشگاه‌ها" },
  { href: "/pricing", label: "تعرفه‌ها" },
  { href: "/blog", label: "مقالات" },
] as const;

const DASHBOARD_URL = "https://dash.rookhposh.ir";

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
        {PUBLIC_NAVIGATION_LINKS.map((item) => (
          <Link className="fa-copy" href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
        <a
          className="nav__cta"
          href={DASHBOARD_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="fa-copy">ورود به اتاق پرو</span>
        </a>
      </nav>
      <MobileNav links={PUBLIC_NAVIGATION_LINKS} dashboardHref={DASHBOARD_URL} />
    </header>
  );
}
