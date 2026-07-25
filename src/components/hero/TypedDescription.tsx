"use client";

import { CSSProperties, useEffect, useRef } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { useTypingEffect, TypingLine } from "./useTypingEffect";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TypedDescriptionProps {
  /** Plain text to reveal character-by-character. No accent segments. */
  text: string;
  /** Base text colour. */
  textColor: string;
  /** Caret colour (defaults to textColor). */
  caretColor?: string;
  /** Tailwind / inline className applied to the terminal window. */
  className?: string;
  /** Inline style applied to the terminal window. */
  style?: CSSProperties;
  /** Window title shown in the terminal header bar. */
  title?: string;
  /** Called once the typing animation has fully completed. */
  onDone?: () => void;
}

// ─── Component ──────────────────────────────────────────────────────────────────

/**
 * Renders a macOS-style terminal window whose body reveals text
 * character-by-character with a blinking block caret.
 *
 * Anti-CLS strategy: the body always renders the *complete final text* as
 * an invisible "skeleton" that reserves the exact final layout box. The
 * typed characters are rendered as an absolutely-positioned overlay on
 * top, alongside a fixed-width prompt glyph, so surrounding elements
 * never shift by a single pixel.
 *
 * The effect runs on every mount and is skipped entirely (full text shown
 * instantly, no caret) when `prefers-reduced-motion: reduce` is set.
 */
export function TypedDescription({
  text,
  textColor,
  caretColor,
  className,
  style,
  title = "tech4 — integrator",
  onDone,
}: TypedDescriptionProps) {
  // Single line, single non-accent segment — the description has no
  // highlighted words, so the whole paragraph shares one colour.
  const lines: TypingLine[] = [[{ text }]];

  const { revealedLines, isDone, showCaret } = useTypingEffect(lines);
  const { theme } = useTheme();
  const isDark = theme === "dark";

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
    <div
      className={[
        // Premium terminal window — calm, engineering-first (no glow)
        "overflow-hidden rounded-lg border backdrop-blur-[2px]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        borderColor: isDark
          ? "rgb(255 255 255 / 0.08)"
          : "rgb(0 0 0 / 0.08)",
        backgroundColor: isDark
          ? "rgb(18 27 39 / 0.58)"
          : "rgb(247 248 250 / 0.65)",
        ...style,
      }}
    >
      {/* ── Window chrome: traffic lights + title ───────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{
          borderColor: isDark
            ? "rgb(255 255 255 / 0.06)"
            : "rgb(0 0 0 / 0.06)",
        }}
      >
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="block w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="block w-2.5 h-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span
          className="ml-1 text-[0.7rem] font-medium uppercase tracking-[0.08em] opacity-50"
          style={{
            fontFamily: "var(--font-geist-mono), monospace",
            color: isDark ? "rgb(255 255 255 / 0.7)" : "inherit",
          }}
        >
          {title}
        </span>
      </div>

      {/* ── Terminal body ───────────────────────────────────────────────── */}
      <div
        className="relative px-4 py-3"
        style={{
          fontFamily: "var(--font-geist-mono), 'SFMono-Regular', Consolas, monospace",
          fontSize: "1.0625rem",
          lineHeight: "1.75rem",
          color: textColor,
        }}
      >
        <p className="relative m-0 whitespace-pre-wrap break-words">
          {/* Prompt glyph — fixed, never typed */}
          <span
            aria-hidden="true"
            style={{ marginRight: "0.5rem", opacity: 0.55 }}
          >
            ›
          </span>

          {/* ── Skeleton: full final text, invisible, reserves layout ── */}
          <span aria-hidden="true" style={{ visibility: "hidden" }}>
            {text}
          </span>

          {/* ── Overlay: typed characters + caret, absolutely positioned ── */}
          <span
            aria-label={text}
            style={{
              position: "absolute",
              inset: 0,
              paddingLeft: "1.4375rem", // offset past the prompt glyph
            }}
          >
            {revealedText}
            {showCaret && (
              <span
                aria-hidden="true"
                style={{
                  display: "inline-block",
                  width: "0.6em",
                  height: "1.05em",
                  marginLeft: "0.05em",
                  transform: "translateY(0.18em)",
                  backgroundColor: caret,
                  transition: "opacity 120ms ease",
                }}
              />
            )}
          </span>
        </p>
      </div>
    </div>
  );
}