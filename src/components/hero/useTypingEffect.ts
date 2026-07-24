"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TypingSegment {
  text: string;
  accent?: boolean;
}

/** A heading is rendered as multiple lines separated by `<br />`. */
export type TypingLine = TypingSegment[];

export interface TypingState {
  /** Lines truncated to the currently revealed character count.
   *  Lines that have not yet been started are returned as `[]`
   *  so the component can skip rendering them entirely. */
  revealedLines: TypingLine[];
  /** true while the typing animation is running */
  isTyping: boolean;
  /** true once the full text has been revealed (or instantly when reduced-motion) */
  isDone: boolean;
  /** true when a blinking caret should be visible (not during reduced-motion) */
  showCaret: boolean;
}

// ─── Constants ─────────────────────────────────────────────────────────────────

/** Target total duration of the typing animation (ms) */
const TYPING_DURATION_MS = 2000;

/** Short pause kept after typing finishes before signalling done (ms) */
const TYPING_SETTLE_MS = 150;

/** Blink period of the caret (ms) */
const CARET_BLINK_MS = 530;

/** How long the caret stays after typing completes before fading out (ms) */
const CARET_LINGER_MS = 400;

// ─── Hook ──────────────────────────────────────────────────────────────────────

/**
 * Reveals the provided `lines` character-by-character, like a terminal
 * typing effect. Runs on every mount (page load / refresh), and respects
 * `prefers-reduced-motion` (renders fully, instantly, without a caret).
 *
 * Layout shift is handled by the rendering component, not here — this hook
 * only tracks how many characters are currently visible.
 *
 * @param lines  Ordered lines of segments. Accent segments keep their colour.
 */
export function useTypingEffect(lines: TypingLine[]): TypingState {
  const [revealedChars, setRevealedChars] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showCaret, setShowCaret] = useState(false);

  const rafRef = useRef<number | null>(null);
  const settleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const caretLingerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const caretBlinkRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalChars = lines.reduce(
    (sum, line) => sum + line.reduce((s, seg) => s + seg.text.length, 0),
    0,
  );

  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      setRevealedChars(totalChars);
      setIsTyping(false);
      setIsDone(true);
      setShowCaret(false);
      return;
    }

    // ── Active typing ────────────────────────────────────────────────────
    setIsTyping(true);
    setShowCaret(true);

    const perChar = Math.max(8, TYPING_DURATION_MS / Math.max(1, totalChars));
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const count = Math.min(totalChars, Math.floor(elapsed / perChar));
      setRevealedChars(count);

      if (count < totalChars) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setIsTyping(false);

        settleTimerRef.current = setTimeout(() => {
          setIsDone(true);
        }, TYPING_SETTLE_MS);

        // Slow caret blink while idle after typing completes
        let on = true;
        caretBlinkRef.current = setInterval(() => {
          on = !on;
          setShowCaret(on);
        }, CARET_BLINK_MS);

        // After a short linger, stop blinking and hide the caret for good
        caretLingerTimerRef.current = setTimeout(() => {
          if (caretBlinkRef.current) {
            clearInterval(caretBlinkRef.current);
            caretBlinkRef.current = null;
          }
          setShowCaret(false);
        }, CARET_LINGER_MS);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      if (caretLingerTimerRef.current) clearTimeout(caretLingerTimerRef.current);
      if (caretBlinkRef.current) clearInterval(caretBlinkRef.current);
    };
  }, [totalChars]);

  // ── Derive truncated lines ─────────────────────────────────────────────
  let remaining = revealedChars;
  const revealedLines: TypingLine[] = [];
  for (const line of lines) {
    if (remaining <= 0) {
      revealedLines.push([]);
      continue;
    }
    const truncated: TypingSegment[] = [];
    for (const seg of line) {
      if (remaining <= 0) {
        truncated.push({ text: "", accent: seg.accent });
        continue;
      }
      const take = Math.min(remaining, seg.text.length);
      truncated.push({ text: seg.text.slice(0, take), accent: seg.accent });
      remaining -= take;
    }
    revealedLines.push(truncated);
  }

  return { revealedLines, isTyping, isDone, showCaret };
}