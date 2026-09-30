export type BlogRichMark =
  | { type: "link"; attrs: { href: string; title?: string } }
  | { type: "code" | "bold" | "italic" | "strike" | "underline" };

export type BlogRichNode = {
  type:
    | "doc"
    | "paragraph"
    | "heading"
    | "bulletList"
    | "orderedList"
    | "listItem"
    | "blockquote"
    | "codeBlock"
    | "image"
    | "hardBreak"
    | "text";
  attrs?: Record<string, string | number>;
  content?: BlogRichNode[];
  text?: string;
  marks?: BlogRichMark[];
};

export type BlogRichDocument = { type: "doc"; content: BlogRichNode[] };

const MAX_NODES = 1_000;
const MAX_DEPTH = 20;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function safeUrl(value: unknown, allowFragment = false) {
  if (typeof value !== "string" || value.length > 2_048) return null;
  const text = value.trim();
  if ((text.startsWith("/") && !text.startsWith("//")) || (allowFragment && text.startsWith("#"))) return text;
  try {
    const url = new URL(text);
    if (url.protocol === "http:" || url.protocol === "https:" || (allowFragment && url.protocol === "mailto:")) return text;
  } catch {
    return null;
  }
  return null;
}

function normalizeMarks(value: unknown): BlogRichMark[] | null | undefined {
  if (value === undefined) return undefined;
  if (!Array.isArray(value) || value.length > 10) return null;
  const marks: BlogRichMark[] = [];
  for (const candidate of value) {
    if (!isRecord(candidate) || typeof candidate.type !== "string") return null;
    if (["code", "bold", "italic", "strike", "underline"].includes(candidate.type)) {
      marks.push({ type: candidate.type as "code" | "bold" | "italic" | "strike" | "underline" });
      continue;
    }
    if (candidate.type !== "link" || !isRecord(candidate.attrs)) return null;
    const href = safeUrl(candidate.attrs.href, true);
    if (!href) return null;
    const title = candidate.attrs.title === undefined || candidate.attrs.title === null
      ? undefined
      : typeof candidate.attrs.title === "string" && candidate.attrs.title.length <= 240
        ? candidate.attrs.title
        : null;
    if (title === null) return null;
    marks.push(title ? { type: "link", attrs: { href, title } } : { type: "link", attrs: { href } });
  }
  return marks.length ? marks : undefined;
}

function normalizeNode(value: unknown, depth: number, count: { value: number }): BlogRichNode | null {
  if (depth > MAX_DEPTH || count.value >= MAX_NODES || !isRecord(value) || typeof value.type !== "string") return null;
  count.value += 1;
  if (value.type === "text") {
    const marks = normalizeMarks(value.marks);
    return typeof value.text === "string" && value.text.length <= 100_000 && marks !== null
      ? { type: "text", text: value.text, marks: marks ?? undefined }
      : null;
  }
  if (value.type === "hardBreak") return { type: "hardBreak" };
  if (value.type === "image") {
    if (!isRecord(value.attrs)) return null;
    const src = safeUrl(value.attrs.src);
    const alt = typeof value.attrs.alt === "string" ? value.attrs.alt.trim() : "";
    if (!src || !alt || alt.length > 300) return null;
    const attrs: Record<string, string | number> = { src, alt };
    if (typeof value.attrs.title === "string" && value.attrs.title.length <= 240) attrs.title = value.attrs.title;
    for (const dimension of ["width", "height"] as const) {
      if (value.attrs[dimension] !== undefined && (typeof value.attrs[dimension] !== "number" || !Number.isInteger(value.attrs[dimension]) || value.attrs[dimension] < 1 || value.attrs[dimension] > 10_000)) return null;
      if (typeof value.attrs[dimension] === "number") attrs[dimension] = value.attrs[dimension];
    }
    return { type: "image", attrs };
  }
  if (!["doc", "paragraph", "heading", "bulletList", "orderedList", "listItem", "blockquote", "codeBlock"].includes(value.type)) return null;
  const children = value.content === undefined ? [] : value.content;
  if (!Array.isArray(children) || children.length > MAX_NODES) return null;
  const attrs: Record<string, string | number> = {};
  if (value.type === "heading") {
    if (!isRecord(value.attrs) || (value.attrs.level !== 2 && value.attrs.level !== 3)) return null;
    attrs.level = value.attrs.level;
  }
  if (value.type === "orderedList") {
    const start = !isRecord(value.attrs) || value.attrs.start === undefined || value.attrs.start === null ? 1 : value.attrs.start;
    if (typeof start !== "number" || !Number.isInteger(start) || start < 1 || start > 1_000) return null;
    attrs.start = start;
  }
  const normalizedChildren: BlogRichNode[] = [];
  for (const child of children) {
    const normalized = normalizeNode(child, depth + 1, count);
    if (!normalized) return null;
    normalizedChildren.push(normalized);
  }
  return Object.keys(attrs).length ? { type: value.type as BlogRichNode["type"], attrs, content: normalizedChildren } : { type: value.type as BlogRichNode["type"], content: normalizedChildren };
}

export function parseBlogRichContent(value: string): BlogRichDocument | null {
  try {
    const parsed = JSON.parse(value) as unknown;
    const document = normalizeNode(parsed, 0, { value: 0 });
    return document?.type === "doc" ? { type: "doc", content: document.content ?? [] } : null;
  } catch {
    return null;
  }
}
