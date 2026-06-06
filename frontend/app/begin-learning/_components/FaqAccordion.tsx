"use client";

import { useState, type ReactNode } from "react";

interface FaqItem {
  q: string;
  a: string;
}

/**
 * Tiny inline markdown parser for FAQ answers. Handles:
 *   [label](url)  → <a>  (external URLs open in a new tab)
 *   **text**      → <strong>
 *   *text*        → <em>
 *
 * Order matters: link first (to keep [text] from being eaten by italic),
 * then bold (to keep ** from being split into two italics), then italic.
 * Anything else passes through as plain text. If we ever need lists,
 * headings, or nested emphasis, swap this for a real markdown lib.
 */
function renderInline(text: string): ReactNode[] {
  // Pattern matches all three at once; the alternation order is what
  // gives links and bold priority over single-asterisk italic.
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > lastIndex) parts.push(text.slice(lastIndex, m.index));
    if (m[1] !== undefined) {
      const [, label, url] = m;
      const external = /^https?:\/\//.test(url);
      parts.push(
        <a
          key={`md-${key++}`}
          href={url}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {label}
        </a>,
      );
    } else if (m[3] !== undefined) {
      parts.push(<strong key={`md-${key++}`}>{m[3]}</strong>);
    } else if (m[4] !== undefined) {
      parts.push(<em key={`md-${key++}`}>{m[4]}</em>);
    }
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="eogbook-faq" role="list">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        const id = `faq-a-${i}`;
        return (
          <div className="eogbook-faq-item" key={i} role="listitem">
            <button
              type="button"
              className="eogbook-faq-q"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <span>{item.q}</span>
              <span className="eogbook-faq-q-icon" aria-hidden="true">
                ▾
              </span>
            </button>
            <div
              id={id}
              className={`eogbook-faq-a${isOpen ? " eogbook-faq-a--open" : ""}`}
              role="region"
              aria-labelledby={`faq-q-${i}`}
            >
              {/* Split on blank-line separators so longer answers can be
                  authored as short paragraphs in the source string.
                  Each paragraph passes through the inline link parser. */}
              {item.a.split(/\n\s*\n/).map((para, j) => (
                <p key={j}>{renderInline(para)}</p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
