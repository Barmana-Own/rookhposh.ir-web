import type { Metadata } from "next";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import BlogCard from "@/components/blog/BlogCard";
import BlogProductCta from "@/components/blog/BlogProductCta";
import { getPublishedPosts } from "@/lib/blog/repository";
import { publicUrl, SOCIAL_IMAGE } from "@/lib/marketing";
import { SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

const BLOG_DESCRIPTION =
  "مقالات منتشرشده رخ پوش درباره پرو مجازی لباس و کاربردهای آن برای فروشگاه‌ها.";
const BLOG_EMPTY_DESCRIPTION =
  "مقالات رخ پوش پس از انتشار از منبع محتوای رسمی در این بخش نمایش داده می‌شوند.";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getPublishedPosts();
  const indexable = posts.some((post) => !post.noindex);
  const description = posts.length > 0 ? BLOG_DESCRIPTION : BLOG_EMPTY_DESCRIPTION;

  return {
    title: "مقالات رخ پوش",
    description,
    alternates: {
      canonical: publicUrl("/blog"),
      types: { "application/rss+xml": publicUrl("/feed.xml") },
    },
    openGraph: {
      type: "website",
      url: publicUrl("/blog"),
      locale: "fa_IR",
      siteName: SITE_NAME,
      title: "مقالات رخ پوش",
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: "مقالات رخ پوش",
      description,
      images: [SOCIAL_IMAGE.url],
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: { index: indexable, follow: true },
    },
  };
}

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <MarketingPageShell
      breadcrumb="مقالات"
      path="/blog"
      eyebrow="مقالات رخ پوش"
      title="مقالات رخ پوش"
      description={posts.length > 0 ? BLOG_DESCRIPTION : BLOG_EMPTY_DESCRIPTION}
    >
      {posts.length > 0 ? (
        <section className="blog-index" aria-labelledby="blog-latest-title">
          <div className="blog-index__heading">
            <p className="eyebrow eyebrow--center fa-copy">تازه‌ترین نوشته‌ها</p>
            <h2 id="blog-latest-title" className="content-page__section-title fa-copy">
              از مجله رخ پوش
            </h2>
          </div>
          <div className="blog-grid">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      ) : (
        <section className="blog-empty" aria-labelledby="blog-empty-title">
          <p className="eyebrow eyebrow--center fa-copy">مقالات رخ پوش</p>
          <h2 id="blog-empty-title" className="content-page__section-title fa-copy">
            مقاله‌ای منتشر نشده است
          </h2>
          <p className="content-page__section-copy fa-copy">
            مطالب این بخش پس از انتشار از منبع محتوای رسمی رخ پوش در دسترس قرار می‌گیرند.
          </p>
        </section>
      )}
      <BlogProductCta />
    </MarketingPageShell>
  );
}
