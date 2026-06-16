import DOMPurify from 'dompurify';

// CMS links open in a new tab without leaking the opener (reverse-tabnabbing).
DOMPurify.addHook('afterSanitizeAttributes', (node) => {
  if (node.nodeName === 'A' && node.getAttribute('href')) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

/**
 * Sanitize admin-authored CMS HTML before it is rendered via
 * dangerouslySetInnerHTML. Uses DOMPurify, which removes scripts, inline event
 * handlers (onerror/onload/...), javascript:/data: URLs, and dangerous embeds,
 * while preserving the rich formatting our research content relies on
 * (headings, tables, lists, links, and inline styles for callout boxes/bars).
 *
 * Replaces the previous regex sanitizer, which missed unquoted handlers,
 * <svg onload>, <iframe>, javascript: URLs, and more.
 */
export function sanitizeHtml(html: string): string {
  if (!html) return '';
  return DOMPurify.sanitize(html, {
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'button', 'textarea', 'base', 'meta', 'link'],
    FORBID_ATTR: ['srcdoc', 'formaction', 'xlink:href'],
    ADD_ATTR: ['target'],
  });
}
