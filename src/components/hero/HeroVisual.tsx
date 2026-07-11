"use client";

import { useEffect, useRef, useState } from "react";
import { colors, radius, transitions, typography } from "@/styles/design-tokens";
import { BuildingSchematic, SYSTEM_COLORS } from "./BuildingSchematic";

type SystemType = "bms" | "bas" | "cctv" | "sap" | "kd" | "hvac";

const systemsList: { id: SystemType; label: string; desc: string; color: string }[] = [
  { id: "bms", label: "BMS", desc: "Central management", color: SYSTEM_COLORS.bms },
  { id: "bas", label: "BAS", desc: "Building automation", color: SYSTEM_COLORS.bas },
  { id: "cctv", label: "CCTV", desc: "IP video surveillance", color: SYSTEM_COLORS.cctv },
  { id: "sap", label: "SAP", desc: "Fire alarm system", color: SYSTEM_COLORS.sap },
  { id: "kd", label: "KD", desc: "Access control", color: SYSTEM_COLORS.kd },
  { id: "hvac", label: "HVAC", desc: "HVAC automation", color: SYSTEM_COLORS.hvac },
];

export function HeroVisual() {
  const [activeSystem, setActiveSystem] = useState<SystemType | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const cycleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentIndexRef = useRef(-1);

  useEffect(() => {
    if (isHovered) {
      if (cycleIntervalRef.current) {
        clearInterval(cycleIntervalRef.current);
        cycleIntervalRef.current = null;
      }
      return;
    }

    const startCycle = () => {
      cycleIntervalRef.current = setInterval(() => {
        currentIndexRef.current = (currentIndexRef.current + 1) % systemsList.length;
        setActiveSystem(systemsList[currentIndexRef.current].id);
      }, 4500);
    };

    const delayTimeout = setTimeout(() => {
      currentIndexRef.current = 0;
      setActiveSystem(systemsList[0].id);
      startCycle();
    }, 1200);

    return () => {
      clearTimeout(delayTimeout);
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
    };
  }, [isHovered]);

  const handleSelect = (id: SystemType) => {
    setActiveSystem(id);
    currentIndexRef.current = systemsList.findIndex((system) => system.id === id);
    setIsHovered(true);
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="w-full relative aspect-square transition-all duration-500 ease-out transform hover:scale-[1.01] drop-shadow-[0_12px_36px_rgba(10,18,32,0.04)] dark:drop-shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-neutral-300 dark:border-neutral-800" />
        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-neutral-300 dark:border-neutral-800" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-neutral-300 dark:border-neutral-800" />
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-neutral-300 dark:border-neutral-800" />
        <BuildingSchematic activeSystem={activeSystem} />
      </div>

      <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {systemsList.map((system) => {
          const isSelected = activeSystem === system.id;
          return (
            <button
              key={system.id}
              type="button"
              onClick={() => handleSelect(system.id)}
              onMouseEnter={() => setActiveSystem(system.id)}
              className="flex flex-col text-left p-3.5 border bg-white/40 backdrop-blur-sm transition-all focus-visible:ring-3 group dark:bg-[#0B111A]/20"
              style={{
                borderColor: isSelected ? system.color : "rgba(221, 227, 234, 0.6)",
                borderRadius: radius.sm,
                transitionDuration: transitions.duration.fast,
                transitionTimingFunction: transitions.easing.standard,
                ["--tw-ring-color" as string]: "rgb(47 111 237 / 0.18)",
              }}
              aria-pressed={isSelected}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0 transition-transform duration-300" style={{ backgroundColor: system.color, transform: isSelected ? "scale(1.3)" : "scale(1)" }} />
                  <span style={{ fontFamily: typography.fontFamily.mono, color: isSelected ? colors.primary.ink : colors.neutral[600], fontSize: "0.75rem", fontWeight: typography.weight.semibold, letterSpacing: "0.05em" }} className="dark:text-neutral-300 uppercase">
                    {system.label}
                  </span>
                </div>
                <span style={{ fontFamily: typography.fontFamily.mono, fontSize: "0.7rem", color: isSelected ? system.color : "transparent" }} className="transition-colors duration-300">
                  {isSelected ? "● ACTIVE" : ""}
                </span>
              </div>
              <p style={{ color: colors.neutral[500], fontSize: "0.75rem", lineHeight: "1.25" }} className="transition-colors duration-300 group-hover:text-neutral-700 dark:group-hover:text-neutral-300">
                {system.desc}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
