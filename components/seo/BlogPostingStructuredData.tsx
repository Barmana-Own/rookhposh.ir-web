import type { BlogPost } from "@/lib/blog/types";
import { SITE_ORIGIN, SITE_URL } from "@/lib/site";
import JsonLd from "./JsonLd";

function absoluteUrl(value: string) {
  return new URL(value, SITE_URL).toString();
}

export default function BlogPostingStructuredData({
  canonical,
  post,
}: {
  canonical: string;
  post: BlogPost;
}) {
  const image = post.ogImage ?? post.featuredImage?.url;
  const structuredData: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonical}#blogposting`,
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    publisher: { "@id": `${SITE_ORIGIN}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    url: canonical,
    inLanguage: "fa-IR",
  };

  if (image) {
    structuredData.image = [absoluteUrl(image)];
  }

  if (post.author) {
    structuredData.author = {
      "@type": "Person",
      name: post.author.displayName,
    };
  }

  return <JsonLd data={structuredData} />;
}
