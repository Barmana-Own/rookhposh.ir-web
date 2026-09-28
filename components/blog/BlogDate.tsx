export function formatBlogDate(value: string) {
  return new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function BlogDate({
  value,
  label,
}: {
  value: string;
  label?: string;
}) {
  return (
    <time dateTime={value}>
      {label ? `${label}: ` : ""}
      {formatBlogDate(value)}
    </time>
  );
}
