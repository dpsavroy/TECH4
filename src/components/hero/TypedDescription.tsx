"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { useTypingEffect, TypingLine } from "./useTypingEffect";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TypedDescriptionProps {
  /** Plain text to reveal character-by-character. No accent segments. */
  text: string;
  /** Base text colour. */
  textColor: string;
  /** Caret colour (defaults to textColor). */
  caretColor?: string;
  /** Tailwind / inline className applied to the <p>. */
  className?: string;
  /** Inline style applied to the <p> (font, weight, tracking, …). */
  style?: CSSProperties;
  /** Called once the typing animation has fully completed. */
  onDone?: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

/**
 * Renders a <p> paragraph with a one-shot terminal-style typing effect.
 *
 * Anti-CLS strategy: the component always renders the *complete final
 * text* as an invisible "skeleton" that reserves the exact final layout
 * box. The typed characters are rendered as an absolutely-positioned
 * overlay on top, so surrounding elements never shift by a single pixel.
 *
 * The effect runs once per browser session (see `useTypingEffect`) and is
 * skipped entirely when `prefers-reduced-motion: reduce` is set.
 */
export function TypedDescription({
  text,
  textColor,
  caretColor,
  className,
  style,
  onDone,
}: TypedDescriptionProps) {
  // Single line, single non-accent segment — the description has no
  // highlighted words, so the whole paragraph shares one colour.
  const lines: TypingLine[] = [[{ text }]];

  const { revealedLines, isDone, showCaret } = useTypingEffect(lines);

  // Notify parent once typing is complete. Using an effect avoids calling
  // the parent callback during render.
  const doneRef = useRef(false);
  useEffect(() => {
    if (isDone && !doneRef.current) {
      doneRef.current = true;
      onDone?.();
    }
  }, [isDone, onDone]);

  const revealedText = revealedLines[0]?.[0]?.text ?? "";
  const caret = caretColor ?? textColor;

  return (
    <p
      className={className}
      style={{ ...style, position: "relative", color: textColor }}
    >
      {/* ── Skeleton: full final text, invisible, reserves layout ── */}
      <span aria-hidden="true" style={{ visibility: "hidden" }}>
        {text}
      </span>

      {/* ── Overlay: typed characters, absolutely positioned ── */}
      <span
        aria-label={text}
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
        }}
      >
        {revealedText}
        {showCaret && (
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "0.06em",
              height: "1em",
              marginLeft: "0.08em",
              transform: "translateY(0.14em)",
              backgroundColor: caret,
              transition: "opacity 120ms ease",
            }}
          />
        )}
      </span>
    </p>
  );
}