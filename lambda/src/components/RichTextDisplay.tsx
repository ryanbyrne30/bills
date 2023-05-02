import sanitizeHtml from "sanitize-html";

export function RichTextDisplay({
  html,
  className,
}: {
  html: string;
  className?: string;
}) {
  return (
    <div
      className={`rich-text ${className || ""}`}
      dangerouslySetInnerHTML={{
        __html: sanitizeHtmlString(html),
      }}
    ></div>
  );
}

export function sanitizeHtmlString(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "b",
      "i",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "ol",
      "ul",
      "li",
      "strong",
      "br",
      "a",
    ],
    allowedAttributes: {
      a: ["href"],
    },
  });
}
