"use client";

import { useState } from "react";

interface FaqItem {
  q: string;
  a: string;
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
              {item.a}
            </div>
          </div>
        );
      })}
    </div>
  );
}
