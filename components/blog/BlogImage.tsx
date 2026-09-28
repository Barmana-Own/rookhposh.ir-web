import type { BlogImage as BlogImageData } from "@/lib/blog/types";

export default function BlogImage({
  image,
  priority = false,
}: {
  image: BlogImageData;
  priority?: boolean;
}) {
  return (
    <div className="blog-image">
      <img
        src={image.url}
        alt={image.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </div>
  );
}
