import Link from "next/link";
import type { BlogPost } from "@/lib/blog/types";
import BlogDate from "./BlogDate";
import BlogImage from "./BlogImage";

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="blog-card">
      {post.featuredImage ? <BlogImage image={post.featuredImage} /> : null}
      <div className="blog-card__body">
        <div className="blog-card__meta">
          {post.category ? <span>{post.category}</span> : null}
          <BlogDate value={post.publishedAt} />
        </div>
        <h2 className="blog-card__title fa-copy">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="blog-card__excerpt fa-copy">{post.excerpt}</p>
        <Link className="blog-card__link fa-copy" href={`/blog/${post.slug}`}>
          مطالعه مقاله
        </Link>
      </div>
    </article>
  );
}
