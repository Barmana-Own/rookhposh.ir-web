import { createHmac, randomUUID } from "node:crypto";

const origin = process.env.SEO_SMOKE_ORIGIN ?? "http://127.0.0.1:3100";
const secret = process.env.BLOG_REVALIDATION_SECRET;

if (!secret || secret.length < 32) {
  console.error("BLOG_REVALIDATION_SECRET must be provided for this smoke test.");
  process.exitCode = 2;
} else {
  const timestamp = String(Date.now());
  const eventId = randomUUID();
  const body = JSON.stringify({ eventId, action: "post.changed", slug: "integration-post", status: "PUBLISHED" });
  const signature = createHmac("sha256", secret).update(`${timestamp}.${eventId}.${body}`).digest("base64url");

  const headers = {
    "Content-Type": "application/json",
    "X-Rookhposh-Timestamp": timestamp,
    "X-Rookhposh-Event-Id": eventId,
    "X-Rookhposh-Signature": signature,
  };
  const invalid = await fetch(new URL("/api/revalidate/blog", origin), {
    method: "POST",
    headers: { ...headers, "X-Rookhposh-Signature": "invalid" },
    body,
  });
  const valid = await fetch(new URL("/api/revalidate/blog", origin), {
    method: "POST",
    headers,
    body,
  });

  if (invalid.status !== 401 || valid.status !== 200) {
    console.error(`Revalidation smoke failed: invalid=${invalid.status}, valid=${valid.status}`);
    process.exitCode = 1;
  } else {
    console.log("Revalidation authorization smoke validation passed.");
  }
}
