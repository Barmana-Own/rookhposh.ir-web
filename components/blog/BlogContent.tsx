import ReactMarkdown from "react-markdown";
import rehypeSanitize from "rehype-sanitize";

export default function BlogContent({ content }: { content: string }) {
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
