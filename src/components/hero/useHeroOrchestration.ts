"use client";

import { useEffect, useRef, useState } from "react";

// ─── Shared types & data ────────────────────────────────────────────────────

export type SystemType = "bms" | "bas" | "cctv" | "sap" | "kd" | "hvac";

export const systemsList: { id: SystemType; label: string; desc: string }[] = [
  { id: "bms", label: "BMS", desc: "Centralne zarządzanie" },
  { id: "bas", label: "BAS", desc: "Automatyka budynkowa" },
  { id: "cctv", label: "CCTV", desc: "Monitoring wizyjny IP" },
  { id: "sap", label: "SAP", desc: "System sygnalizacji pożarowej" },
  { id: "kd", label: "KD", desc: "Kontrola dostępu" },
  { id: "hvac", label: "HVAC", desc: "Automatyka HVAC" },
];

// ─── Timing ─────────────────────────────────────────────────────────────────

/** Delay before first card appears (ms) */
const INTRO_INITIAL_DELAY = 900;

/** How long each card's reveal is spaced during the intro sequence (ms) */
const INTRO_STEP = 1400;

/** After all cards appear, how long to pause before starting the auto-cycle (ms) */
const INTRO_SETTLE_DELAY = 1800;

/** Auto-cycle cadence once intro is complete (ms) */
const CYCLE_INTERVAL = 4500;

// ─── Hook ────────────────────────────────────────────────────────────────────

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
export function useHeroOrchestration() {
  const [activeSystem, setActiveSystem] = useState<SystemType | null>(null);
  const [visibleSystems, setVisibleSystems] = useState<SystemType[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const currentIndexRef = useRef(-1);
  const cycleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const introStartedRef = useRef(false);

  // ── Intro sequence ────────────────────────────────────────────────────────
  // Runs once. Not affected by hover state — users should see all cards
  // appear even if they hover during the intro.
  useEffect(() => {
    if (introStartedRef.current) return;
    introStartedRef.current = true;

    const timeouts: ReturnType<typeof setTimeout>[] = [];

    systemsList.forEach((system, index) => {
      const t = setTimeout(
        () => {
          currentIndexRef.current = index;
          setActiveSystem(system.id);
          setVisibleSystems((prev) =>
            prev.includes(system.id) ? prev : [...prev, system.id],
          );

          // After last card appears, schedule transition to auto-cycle
          if (index === systemsList.length - 1) {
            const settle = setTimeout(
              () => setIntroComplete(true),
              INTRO_SETTLE_DELAY,
            );
            timeouts.push(settle);
          }
        },
        INTRO_INITIAL_DELAY + index * INTRO_STEP,
      );

      timeouts.push(t);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  // ── Auto-cycle ────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!introComplete || isHovered) {
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
  }, [introComplete, isHovered]);

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
    activeSystem,
    visibleSystems,
    isHovered,
    setIsHovered,
    handleSelect,
    introComplete,
  };
}
