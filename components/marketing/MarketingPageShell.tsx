import type { ReactNode } from "react";
import Breadcrumbs from "@/components/marketing/Breadcrumbs";
import PublicFooter from "@/components/marketing/PublicFooter";
import PublicHeader from "@/components/marketing/PublicHeader";

export default function MarketingPageShell({
  breadcrumb,
  path,
  eyebrow,
  title,
  description,
  children,
}: {
  breadcrumb: string;
  path: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="page-shell content-page" dir="rtl">
      <PublicHeader />
      <main className="content-page__main">
        <section className="content-page__hero" aria-labelledby="page-title">
          <Breadcrumbs name={breadcrumb} path={path} />
          <p className="eyebrow fa-copy">{eyebrow}</p>
          <h1 id="page-title" className="content-page__title fa-copy">
            {title}
          </h1>
          <p className="content-page__lead fa-copy">{description}</p>
        </section>
        <div className="content-page__body">{children}</div>
      </main>
      <PublicFooter />
    </div>
  );
}
