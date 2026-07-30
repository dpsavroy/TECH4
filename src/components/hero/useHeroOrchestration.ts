'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Shared types & data ────────────────────────────────────────────────────

export type SystemType = 'bms' | 'bas' | 'cctv' | 'sap' | 'kd' | 'hvac';

/**
 * Ordered list of building systems for the hero sequence.
 * Labels and descriptions are locale-aware and come from translations
 * (useTranslations().systems[id]) — not stored here.
 */
export const systemsList: { id: SystemType }[] = [
  { id: 'bms' },
  { id: 'bas' },
  { id: 'cctv' },
  { id: 'sap' },
  { id: 'kd' },
  { id: 'hvac' },
];

// ─── Timing ─────────────────────────────────────────────────────────────────

/** Delay before the terminal-style card sequence begins (ms) */
const INTRO_INITIAL_DELAY = 0;

/** Fast spacing between card reveals during the intro sequence (ms) */
const INTRO_STEP = 75;

/** After all cards appear, how long to pause before starting the auto-cycle (ms) */
const INTRO_SETTLE_DELAY = 1800;

/** Auto-cycle cadence once intro is complete (ms) */
const CYCLE_INTERVAL = 4500;

// ─── Hook ────────────────────────────────────────────────────────────────────

export interface UseHeroOrchestrationOptions {
  /**
   * Gate the start of the card intro cascade. When `false`, the sequence
   * does not begin; when it later becomes `true` the cascade runs.
   * Defaults to `true` (start immediately) for backward compatibility.
   */
  introStarted?: boolean;
}

/**
 * Orchestrates the Hero animation sequence.
 *
 * Intro phase (runs once on mount, unaffected by hover):
 *   - Reveals each system card sequentially every INTRO_STEP ms
 *   - Activates the corresponding building system simultaneously
 *
 * Auto-cycle phase (starts after all cards are revealed):
 *   - Cycles through systems every CYCLE_INTERVAL ms
 *   - Pauses while isHovered is true
 */
export function useHeroOrchestration(opts?: UseHeroOrchestrationOptions) {
  const introStarted = opts?.introStarted ?? true;

  const [activeSystem, setActiveSystem] = useState<SystemType | null>('bms');
  const [visibleSystems, setVisibleSystems] = useState<SystemType[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [isInView, setIsInView] = useState(true);

  const containerRef = useRef<HTMLElement>(null);
  const currentIndexRef = useRef(-1);
  const cycleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Intersection Observer ───────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Intro sequence ────────────────────────────────────────────────────────
  // Runs once. Not affected by hover state — users should see all cards
  // appear even if they hover during the intro.
  // Gated by `introStarted` so external animations (e.g. the typed heading)
  // can delay the cascade until they complete.
  useEffect(() => {
    if (!introStarted) return;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    systemsList.forEach((system, index) => {
      const t = setTimeout(
        () => {
          currentIndexRef.current = index;
          setActiveSystem(system.id);
          setVisibleSystems((prev) =>
            prev.includes(system.id) ? prev : [...prev, system.id]
          );

          // After last card appears, schedule transition to auto-cycle
          if (index === systemsList.length - 1) {
            const settle = setTimeout(
              () => setIntroComplete(true),
              INTRO_SETTLE_DELAY
            );
            timeouts.push(settle);
          }
        },
        INTRO_INITIAL_DELAY + index * INTRO_STEP
      );

      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [introStarted]);

  // ── Auto-cycle ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!introComplete || isHovered || !isInView) {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
      return;
    }

    cycleIntervalRef.current = setInterval(() => {
      currentIndexRef.current =
        (currentIndexRef.current + 1) % systemsList.length;
      setActiveSystem(systemsList[currentIndexRef.current].id);
    }, CYCLE_INTERVAL);

    return () => {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
      }
    };
  }, [introComplete, isHovered, isInView]);

  // ── Manual selection ──────────────────────────────────────────────────────
  const handleSelect = (id: SystemType) => {
    setActiveSystem(id);
    currentIndexRef.current = systemsList.findIndex((s) => s.id === id);
    setIsHovered(true);
    // Ensure this system is marked visible (handles edge case: user clicks
    // before intro would have naturally revealed it)
    setVisibleSystems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return {
    containerRef,
    activeSystem,
    visibleSystems,
    isHovered,
    setIsHovered,
    handleSelect,
    introComplete,
  };
}
