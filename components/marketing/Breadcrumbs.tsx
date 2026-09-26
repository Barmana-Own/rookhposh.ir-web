import Link from "next/link";
import { publicUrl } from "@/lib/marketing";

export default function Breadcrumbs({
  name,
  path,
}: {
  name: string;
  path: string;
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "خانه",
        item: publicUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name,
        item: publicUrl(path),
      },
    ],
  };

  return (
    <>
      <nav className="content-page__breadcrumbs" aria-label="مسیر صفحه">
        <Link href="/">خانه</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{name}</span>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
