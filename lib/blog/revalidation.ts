import { createHmac, timingSafeEqual } from "node:crypto";

export type BlogRevalidationEvent = {
  eventId: string;
  action: "post.changed";
  slug?: string;
  previousSlug?: string;
  status?: "DRAFT" | "IN_REVIEW" | "PUBLISHED" | "ARCHIVED";
};

const MAX_CLOCK_SKEW_MS = 5 * 60 * 1_000;
const SLUG_PATTERN = /^[\p{L}\p{N}][\p{L}\p{N}_-]{0,119}$/u;

function expectedSignature(secret: string, timestamp: string, eventId: string, body: string) {
  return createHmac("sha256", secret).update(`${timestamp}.${eventId}.${body}`).digest("base64url");
}

function validSlug(value: unknown) {
  return value === undefined || (typeof value === "string" && SLUG_PATTERN.test(value));
}

export function verifyBlogRevalidation(input: {
  body: string;
  timestamp: string | null;
  eventId: string | null;
  signature: string | null;
  secret: string;
  now?: number;
}): BlogRevalidationEvent | null {
  if (!input.timestamp || !input.eventId || !input.signature || input.body.length > 100_000 || input.secret.length < 32) return null;
  const timestamp = Number(input.timestamp);
  if (!Number.isSafeInteger(timestamp) || Math.abs((input.now ?? Date.now()) - timestamp) > MAX_CLOCK_SKEW_MS) return null;
  if (!/^[a-f0-9-]{36}$/i.test(input.eventId)) return null;

  const expected = expectedSignature(input.secret, input.timestamp, input.eventId, input.body);
  const actualBytes = Buffer.from(input.signature, "base64url");
  const expectedBytes = Buffer.from(expected, "base64url");
  if (actualBytes.length !== expectedBytes.length || !timingSafeEqual(actualBytes, expectedBytes)) return null;

  try {
    const payload = JSON.parse(input.body) as Partial<BlogRevalidationEvent>;
    if (payload.eventId !== input.eventId || payload.action !== "post.changed" || !validSlug(payload.slug) || !validSlug(payload.previousSlug)) return null;
    if (payload.status !== undefined && !["DRAFT", "IN_REVIEW", "PUBLISHED", "ARCHIVED"].includes(payload.status)) return null;
    return {
      eventId: input.eventId,
      action: "post.changed",
      ...(payload.slug ? { slug: payload.slug } : {}),
      ...(payload.previousSlug ? { previousSlug: payload.previousSlug } : {}),
      ...(payload.status ? { status: payload.status } : {}),
    };
  } catch {
    return null;
  }
}
