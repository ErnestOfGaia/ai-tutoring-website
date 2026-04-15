"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface NavigationButtonsProps {
  prev?: string;
  next?: string;
  prevLabel?: string;
  nextLabel?: string;
}

export default function NavigationButtons({
  prev,
  next,
  prevLabel = "← Back",
  nextLabel = "Forward →",
}: NavigationButtonsProps) {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't fire when typing in inputs
      if (
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement
      )
        return;

      if (e.key === "Escape") router.push("/eogbook");
      if (e.key === "ArrowLeft" && prev) router.push(prev);
      if (e.key === "ArrowRight" && next) router.push(next);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router, prev, next]);

  return (
    <nav className="eogbook-nav" aria-label="EOGbook page navigation">
      {prev ? (
        <Link href={prev} className="back-btn" aria-label={prevLabel}>
          {prevLabel}
        </Link>
      ) : (
        <span
          className="back-btn back-btn--disabled"
          aria-disabled="true"
          aria-label="No previous page"
        >
          {prevLabel}
        </span>
      )}

      <Link
        href="/eogbook"
        className="back-btn eogbook-home-btn"
        aria-label="Return to EOGbook home directory"
      >
        ⌂ Home
      </Link>

      {next ? (
        <Link
          href={next}
          className="back-btn eogbook-next-btn"
          aria-label={nextLabel}
        >
          {nextLabel}
        </Link>
      ) : (
        <span
          className="back-btn back-btn--disabled eogbook-next-btn"
          aria-disabled="true"
          aria-label="No next page"
        >
          {nextLabel}
        </span>
      )}
    </nav>
  );
}
