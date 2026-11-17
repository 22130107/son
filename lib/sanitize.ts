import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize HTML content before rendering with dangerouslySetInnerHTML.
 * Strips malicious scripts, event handlers, and dangerous attributes.
 */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });
}

/**
 * Strip all HTML tags from a string, returning clean plain text.
 * Ideal for excerpts, summaries, and meta description tags.
 */
export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}
