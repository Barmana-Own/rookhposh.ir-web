import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MarketingPageShell from "@/components/marketing/MarketingPageShell";
import BlogContent from "@/components/blog/BlogContent";
import BlogDate from "@/components/blog/BlogDate";
import BlogImage from "@/components/blog/BlogImage";
import BlogProductCta from "@/components/blog/BlogProductCta";
import BlogCard from "@/components/blog/BlogCard";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/blog/repository";
import { publicUrl, SOCIAL_IMAGE } from "@/lib/marketing";

export const dynamic = "force-dynamic";

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: { absolute: "مقاله پیدا نشد | رخ پوش" },
      robots: { index: false, follow: false },
    };
  }

  const canonical = post.canonicalUrl ?? publicUrl(`/blog/${post.slug}`);
  const title = post.seoTitle ?? post.title;
  const description = post.metaDescription ?? post.excerpt;
  const image = post.ogImage ?? post.featuredImage?.url ?? SOCIAL_IMAGE.url;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.ogTitle ?? title,
      description: post.ogDescription ?? description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? undefined,
      authors: post.author ? [post.author.displayName] : undefined,
      images: [{ url: image, alt: post.featuredImage?.alt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.ogTitle ?? title,
      description: post.ogDescription ?? description,
      images: [image],
    },
    robots: {
      index: !post.noindex,
      follow: true,
      googleBot: { index: !post.noindex, follow: true },
    },
    authors: post.author ? [{ name: post.author.displayName }] : undefined,
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getPublishedPosts())
    .filter(
      (candidate) =>
        candidate.slug !== post.slug &&
        post.category &&
        candidate.category === post.category,
    )
    .slice(0, 3);

  return (
    <MarketingPageShell
      breadcrumb={post.title}
      path={`/blog/${post.slug}`}
      eyebrow={post.category ?? "مقاله رخ پوش"}
      title={post.title}
      description={post.excerpt}
    >
      <article className="blog-article" aria-labelledby="blog-article-details">
        <header className="blog-article__header" id="blog-article-details">
          <div className="blog-article__meta">
            {post.category ? <span>{post.category}</span> : null}
            <BlogDate value={post.publishedAt} label="انتشار" />
            {post.updatedAt && post.updatedAt !== post.publishedAt ? (
              <BlogDate value={post.updatedAt} label="به‌روزرسانی" />
            ) : null}
          </div>
          {post.author ? (
            <p className="blog-article__author fa-copy">
              نویسنده: {post.author.displayName}
            </p>
          ) : null}
        </header>

        {post.featuredImage ? (
          <BlogImage image={post.featuredImage} priority />
        ) : null}

        <BlogContent content={post.content} />

        {post.tags.length > 0 ? (
          <footer className="blog-article__footer">
            <span className="blog-article__tags-label fa-copy">برچسب‌ها:</span>
            <ul className="blog-article__tags" aria-label="برچسب‌های مقاله">
              {post.tags.map((tag) => (
                <li key={tag} className="fa-copy">
                  {tag}
                </li>
              ))}
            </ul>
          </footer>
        ) : null}
      </article>

      {relatedPosts.length > 0 ? (
        <section className="blog-related" aria-labelledby="blog-related-title">
          <div className="blog-index__heading">
            <p className="eyebrow eyebrow--center fa-copy">ادامه مطالعه</p>
            <h2 id="blog-related-title" className="content-page__section-title fa-copy">
              مطالب مرتبط
            </h2>
          </div>
          <div className="blog-grid">
            {relatedPosts.map((relatedPost) => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}

      <BlogProductCta />
    </MarketingPageShell>
  );
}
