import { getPublishedPosts } from "@/lib/blog/repository";
import { publicUrl } from "@/lib/marketing";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const dynamic = "force-dynamic";

const INVALID_XML_CHARACTERS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g;

function escapeXml(value: string) {
  return value
    .replace(INVALID_XML_CHARACTERS, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822Date(value: string) {
  return new Date(value).toUTCString();
}

function renderItem(post: Awaited<ReturnType<typeof getPublishedPosts>>[number]) {
  const link = publicUrl(`/blog/${post.slug}`);
  const category = post.category
    ? `\n      <category>${escapeXml(post.category)}</category>`
    : "";
  const author = post.author
    ? `\n      <dc:creator>${escapeXml(post.author.displayName)}</dc:creator>`
    : "";

  return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${escapeXml(toRfc822Date(post.publishedAt))}</pubDate>${category}${author}
    </item>`;
}

export async function GET() {
  const posts = (await getPublishedPosts()).filter((post) => !post.noindex);
  const feedUrl = publicUrl("/feed.xml");
  const items = posts.map(renderItem).join("");
  const latestPublication = posts[0]?.publishedAt;
  const lastBuildDate = latestPublication
    ? `\n    <lastBuildDate>${escapeXml(toRfc822Date(latestPublication))}</lastBuildDate>`
    : "";

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(`${SITE_NAME} | مقالات`)}</title>
    <link>${escapeXml(publicUrl("/blog"))}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>fa-IR</language>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />${lastBuildDate}${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
