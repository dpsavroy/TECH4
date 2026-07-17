"use client";

import { memo } from "react";
import { colors, radius, transitions, typography } from "@/styles/design-tokens";
import { SYSTEM_COLORS } from "./BuildingSchematic";
import { systemsList } from "./useHeroOrchestration";
import type { SystemType } from "./useHeroOrchestration";

interface SystemCardsProps {
  activeSystem: SystemType | null;
  visibleSystems: SystemType[];
  onSelect: (id: SystemType) => void;
  onHoverChange: (hovered: boolean) => void;
  /**
   * When true, renders a compact 2–3 column grid instead of a vertical stack.
   * Used at lg breakpoint where cards sit below the building.
   */
  compact?: boolean;
}

/**
 * System card panel.
 *
 * On xl (3-column layout): vertical stack on the right, each card has a
 * left-extending connection line in the system color that fades toward the
 * building in the center column.
 *
 * On lg and below (compact=true): 2-col / 3-col grid, no connection lines.
 */
export const SystemCards = memo(function SystemCards({
  activeSystem,
  visibleSystems,
  onSelect,
  onHoverChange,
  compact = false,
}: SystemCardsProps) {
  return (
    <div
      className={
        compact
          ? "grid grid-cols-2 sm:grid-cols-3 gap-2.5"
          : "flex flex-col gap-2"
      }
      onMouseLeave={() => onHoverChange(false)}
    >
      {systemsList.map((system) => {
        const isVisible = visibleSystems.includes(system.id);
        const isActive = activeSystem === system.id;
        const color = SYSTEM_COLORS[system.id];

        return (
          <div key={system.id} className="relative">
            {/*
              Connection line — visible only in vertical stack (xl, non-compact).
              Extends leftward from the card toward the building in the center column.
              Fades from system color (card side) to transparent (building side).
              Draws in simultaneously with the card entrance animation.
            */}
            {!compact && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-px"
                style={{
                  right: "100%",
                  width: "2.25rem",
                  background: isVisible
                    ? `linear-gradient(to left, ${color}${isActive ? "BB" : "44"}, transparent)`
                    : "transparent",
                  transition: `background 500ms ${transitions.easing.standard}`,
                }}
              />
            )}

            <button
              type="button"
              onClick={() => onSelect(system.id)}
              onMouseEnter={() => {
                onHoverChange(true);
                onSelect(system.id);
              }}
              aria-pressed={isActive}
              className="w-full flex flex-col text-left p-3.5 border bg-white/40 backdrop-blur-sm group dark:bg-[#0B111A]/20 focus-visible:outline-none focus-visible:ring-2"
              style={{
                borderRadius: radius.sm,
                borderColor: isActive
                  ? color
                  : "rgba(221, 227, 234, 0.6)",
                // Entrance: slides in from the right when the system is first revealed.
                // Post-entrance: only border-color transitions (for active state).
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateX(0)" : "translateX(20px)",
                transition: `opacity 420ms ${transitions.easing.entrance}, transform 420ms ${transitions.easing.entrance}, border-color ${transitions.duration.fast} ${transitions.easing.standard}`,
                pointerEvents: isVisible ? "auto" : "none",
                ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
              }}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  {/* System color indicator dot */}
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      backgroundColor: color,
                      transform: isActive ? "scale(1.45)" : "scale(1)",
                      transition: `transform ${transitions.duration.base} ${transitions.easing.entrance}`,
                    }}
                  />
                  {/* System label */}
                  <span
                    style={{
                      fontFamily: typography.fontFamily.mono,
                      color: isActive ? colors.primary.ink : colors.neutral[600],
                      fontSize: "0.75rem",
                      fontWeight: typography.weight.semibold,
                      letterSpacing: "0.05em",
                    }}
                    className="uppercase dark:text-neutral-300 transition-colors duration-200"
                  >
                    {system.label}
                  </span>
                </div>

                {/* Active indicator */}
                <span
                  aria-hidden={!isActive}
                  style={{
                    fontFamily: typography.fontFamily.mono,
                    fontSize: "0.65rem",
                    color: isActive ? color : "transparent",
                    transition: `color ${transitions.duration.base} ${transitions.easing.standard}`,
                  }}
                >
                  ● ACTIVE
                </span>
              </div>

              {/* Description */}
              <p
                style={{
                  color: colors.neutral[500],
                  fontSize: "0.75rem",
                  lineHeight: "1.3",
                }}
                className="transition-colors duration-200 group-hover:text-neutral-700 dark:group-hover:text-neutral-300"
              >
                {system.desc}
              </p>
            </button>
          </div>
        );
      })}
    </div>
  );
});
