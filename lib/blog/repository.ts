import { SITE_ORIGIN } from "@/lib/site";
import {
  fetchBlogPostPayload,
  fetchBlogPostsPayload,
} from "./client";
import type { BlogAuthor, BlogImage, BlogPost } from "./types";

const MAX_ID_LENGTH = 200;
const MAX_TITLE_LENGTH = 240;
const MAX_EXCERPT_LENGTH = 1_000;
const MAX_CONTENT_LENGTH = 500_000;
const MAX_CATEGORY_LENGTH = 100;
const MAX_TAG_LENGTH = 80;
const MAX_TAG_COUNT = 20;
const BLOG_SLUG_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}_-]{0,119}$/u;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return null;
  }

  const text = value.trim();
  return text && text.length <= maxLength ? text : null;
}

function readOptionalText(value: unknown, maxLength: number) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return readText(value, maxLength);
}

function readSafeAssetUrl(value: unknown) {
  const text = readText(value, 2_000);

  if (!text || text.startsWith("//")) {
    return null;
  }

  if (text.startsWith("/")) {
    return text;
  }

  try {
    const url = new URL(text);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function readCanonicalUrl(value: unknown) {
  const text = readOptionalText(value, 2_000);

  if (!text) {
    return null;
  }

  try {
    const url = new URL(text, SITE_ORIGIN);

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null;
    }

    return url.origin === SITE_ORIGIN ? url.toString() : null;
  } catch {
    return null;
  }
}

function readDate(value: unknown, { required }: { required: boolean }) {
  if (typeof value !== "string") {
    return required ? null : undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return required ? null : undefined;
  }

  return date.toISOString();
}

function readImage(value: unknown): BlogImage | null {
  if (!isRecord(value)) {
    return null;
  }

  const url = readSafeAssetUrl(value.url);
  const alt = readText(value.alt, 300);

  return url && alt ? { url, alt } : null;
}

function readAuthor(value: unknown): BlogAuthor | null {
  if (!isRecord(value)) {
    return null;
  }

  const displayName = readText(value.displayName, 160);
  return displayName ? { displayName } : null;
}

function readTags(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((tag) => readText(tag, MAX_TAG_LENGTH))
    .filter((tag): tag is string => Boolean(tag))
    .slice(0, MAX_TAG_COUNT);
}

function isPublishedPayload(record: Record<string, unknown>) {
  const status = readOptionalText(record.status, 40);
  const published = record.published;

  if (status && status.toLowerCase() !== "published") {
    return false;
  }

  if (typeof published === "boolean" && !published) {
    return false;
  }

  return true;
}

function parseBlogPost(value: unknown): BlogPost | null {
  if (!isRecord(value) || !isPublishedPayload(value)) {
    return null;
  }

  const id = readText(value.id, MAX_ID_LENGTH);
  const slug = readText(value.slug, 120);
  const title = readText(value.title, MAX_TITLE_LENGTH);
  const excerpt = readText(value.excerpt, MAX_EXCERPT_LENGTH);
  const content = readText(value.content, MAX_CONTENT_LENGTH);
  const publishedAt = readDate(value.publishedAt, { required: true });
  const updatedAt = readDate(value.updatedAt, { required: false });
  const noindex = value.noindex === undefined ? false : value.noindex;
  const contentFormat = value.contentFormat ?? value.format;

  if (
    !id ||
    !slug ||
    !BLOG_SLUG_PATTERN.test(slug) ||
    !title ||
    !excerpt ||
    !content ||
    !publishedAt ||
    (contentFormat !== undefined && contentFormat !== "markdown" && contentFormat !== "plain-text") ||
    typeof noindex !== "boolean"
  ) {
    return null;
  }

  if (new Date(publishedAt).getTime() > Date.now()) {
    return null;
  }

  return {
    id,
    slug,
    title,
    excerpt,
    content,
    featuredImage: readImage(value.featuredImage),
    category: readOptionalText(value.category, MAX_CATEGORY_LENGTH),
    tags: readTags(value.tags),
    author: readAuthor(value.author),
    publishedAt,
    updatedAt: updatedAt ?? null,
    seoTitle: readOptionalText(value.seoTitle, MAX_TITLE_LENGTH),
    metaDescription: readOptionalText(value.metaDescription, 1_000),
    canonicalUrl: readCanonicalUrl(value.canonicalUrl),
    ogTitle: readOptionalText(value.ogTitle, MAX_TITLE_LENGTH),
    ogDescription: readOptionalText(value.ogDescription, 1_000),
    ogImage: readSafeAssetUrl(value.ogImage),
    noindex,
  };
}

function extractPostValues(payload: unknown) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!isRecord(payload)) {
    return [];
  }

  if (Array.isArray(payload.posts)) {
    return payload.posts;
  }

  if (Array.isArray(payload.data)) {
    return payload.data;
  }

  if (isRecord(payload.post)) {
    return [payload.post];
  }

  return [payload];
}

function sortAndDedupe(posts: BlogPost[]) {
  const seen = new Set<string>();

  return posts
    .filter((post) => {
      if (seen.has(post.slug)) {
        return false;
      }

      seen.add(post.slug);
      return true;
    })
    .sort(
      (first, second) =>
        new Date(second.publishedAt).getTime() - new Date(first.publishedAt).getTime(),
    );
}

export async function getPublishedPosts() {
  const payload = await fetchBlogPostsPayload();
  const posts = extractPostValues(payload)
    .map(parseBlogPost)
    .filter((post): post is BlogPost => Boolean(post));

  return sortAndDedupe(posts);
}

export async function getPublishedPostBySlug(slug: string) {
  if (!BLOG_SLUG_PATTERN.test(slug)) {
    return null;
  }

  const payload = await fetchBlogPostPayload(slug);
  const post = extractPostValues(payload)
    .map(parseBlogPost)
    .find((candidate) => candidate?.slug === slug);

  return post ?? null;
}
