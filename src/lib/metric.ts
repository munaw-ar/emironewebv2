/**
 * Research metrics are stored as a number fused with a descriptor word, e.g.
 * "3–5% interested", "≈87% inbox", "8–12 calls", "≈2.7% repeat". Rendered raw
 * in a large display face inside a narrow card, the descriptor wraps mid-word
 * ("intereste\nd"). splitMetric separates the leading numeric token from the
 * trailing descriptor so each can be typeset on its own terms.
 */
export interface SplitMetric {
  /** Leading numeric token, e.g. "3–5%", "≈87%", "8–12". */
  value: string;
  /** Trailing descriptor, e.g. "interested", "inbox", "calls". May be empty. */
  unit: string;
}

// Optional ≈/~ prefix, a number (with decimals/commas), an optional en-dash/
// hyphen range, and an optional trailing %. Everything after is the descriptor.
const METRIC_RE = /^\s*([≈~]?\s*\d[\d.,]*(?:\s*[–—-]\s*[\d.,]+)?\s*%?)\s*(.*)$/;

export function splitMetric(raw: string | null | undefined): SplitMetric {
  if (!raw) return { value: "N/A", unit: "" };
  const m = raw.match(METRIC_RE);
  if (!m) return { value: raw.trim(), unit: "" };
  return { value: m[1].replace(/\s+/g, " ").trim(), unit: m[2].trim() };
}
