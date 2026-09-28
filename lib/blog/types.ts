export type BlogImage = {
  url: string;
  alt: string;
};

export type BlogAuthor = {
  displayName: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: BlogImage | null;
  category: string | null;
  tags: string[];
  author: BlogAuthor | null;
  publishedAt: string;
  updatedAt: string | null;
  seoTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogTitle: string | null;
  ogDescription: string | null;
  ogImage: string | null;
  noindex: boolean;
};
