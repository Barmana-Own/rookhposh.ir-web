import { revalidatePath, revalidateTag } from "next/cache";

import { verifyBlogRevalidation } from "@/lib/blog/revalidation";

export const dynamic = "force-dynamic";
const MAX_REQUEST_BODY_BYTES = 100_000;

async function readLimitedBody(request: Request) {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength && (!/^\d+$/.test(declaredLength) || Number(declaredLength) > MAX_REQUEST_BODY_BYTES)) {
    return null;
  }

  if (!request.body) {
    return "";
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const result = await reader.read();
      if (result.done) break;
      total += result.value.byteLength;
      if (total > MAX_REQUEST_BODY_BYTES) {
        await reader.cancel();
        return null;
      }
      chunks.push(result.value);
    }
  } finally {
    reader.releaseLock();
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return new TextDecoder().decode(body);
}

export async function POST(request: Request) {
  const secret = process.env.BLOG_REVALIDATION_SECRET;
  if (!secret || secret.length < 32) {
    return Response.json({ error: "Revalidation is not configured." }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }

  const body = await readLimitedBody(request);
  if (body === null) {
    return Response.json({ error: "Revalidation request is too large." }, { status: 413, headers: { "Cache-Control": "no-store" } });
  }
  const event = verifyBlogRevalidation({
    body,
    timestamp: request.headers.get("x-rookhposh-timestamp"),
    eventId: request.headers.get("x-rookhposh-event-id"),
    signature: request.headers.get("x-rookhposh-signature"),
    secret,
  });
  if (!event) {
    return Response.json({ error: "Invalid revalidation authorization." }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  revalidateTag("blog-content", "max");
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  revalidatePath("/feed.xml");
  if (event.slug) revalidatePath(`/blog/${event.slug}`);
  if (event.previousSlug) revalidatePath(`/blog/${event.previousSlug}`);

  return Response.json({ revalidated: true }, { headers: { "Cache-Control": "no-store" } });
}
