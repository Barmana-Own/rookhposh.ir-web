import type { ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";
import { parseBlogRichContent, type BlogRichMark, type BlogRichNode } from "@/lib/blog/rich-document";

function renderMarks(text: string, marks: BlogRichMark[] | undefined, key: string): ReactNode {
  let output: ReactNode = text;
  for (const [index, mark] of (marks ?? []).entries()) {
    if (mark.type === "code") {
      output = <code key={`${key}-code-${index}`}>{output}</code>;
      continue;
    }
    if (mark.type === "bold") {
      output = <strong key={`${key}-bold-${index}`}>{output}</strong>;
      continue;
    }
    if (mark.type === "italic") {
      output = <em key={`${key}-italic-${index}`}>{output}</em>;
      continue;
    }
    if (mark.type === "strike") {
      output = <s key={`${key}-strike-${index}`}>{output}</s>;
      continue;
    }
    if (mark.type === "underline") {
      output = <u key={`${key}-underline-${index}`}>{output}</u>;
      continue;
    }
    if (mark.type !== "link") continue;
    const external = /^https?:\/\//.test(mark.attrs.href);
    output = <a key={`${key}-link-${index}`} href={mark.attrs.href} title={mark.attrs.title} target={external ? "_blank" : undefined} rel={external ? "noreferrer noopener" : undefined}>{output}</a>;
  }
  return output;
}

function renderRichNode(node: BlogRichNode, key: string): ReactNode {
  const children = (node.content ?? []).map((child, index) => renderRichNode(child, `${key}-${index}`));
  switch (node.type) {
    case "doc": return <>{children}</>;
    case "text": return renderMarks(node.text ?? "", node.marks, key);
    case "hardBreak": return <br key={key} />;
    case "paragraph": return <p key={key}>{children}</p>;
    case "heading": return node.attrs?.level === 2 ? <h2 key={key}>{children}</h2> : <h3 key={key}>{children}</h3>;
    case "bulletList": return <ul key={key}>{children}</ul>;
    case "orderedList": return <ol key={key} start={typeof node.attrs?.start === "number" ? node.attrs.start : 1}>{children}</ol>;
    case "listItem": return <li key={key}>{children}</li>;
    case "blockquote": return <blockquote key={key}>{children}</blockquote>;
    case "codeBlock": return <pre key={key}><code>{children}</code></pre>;
    case "image": return <img key={key} src={String(node.attrs?.src ?? "")} alt={String(node.attrs?.alt ?? "")} title={node.attrs?.title ? String(node.attrs.title) : undefined} width={typeof node.attrs?.width === "number" ? node.attrs.width : undefined} height={typeof node.attrs?.height === "number" ? node.attrs.height : undefined} loading="lazy" />;
    default: return null;
  }
}

export default function BlogContent({ content, contentFormat = "markdown" }: { content: string; contentFormat?: string }) {
  if (contentFormat === "tiptap-json") {
    const document = parseBlogRichContent(content);
    return <div className="blog-prose">{document ? renderRichNode(document, "document") : <p>محتوای این مقاله در دسترس نیست.</p>}</div>;
  }

  return (
    <div className="blog-prose">
      <ReactMarkdown
        rehypePlugins={[rehypeSanitize]}
        skipHtml
        components={{
          img: () => null,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
