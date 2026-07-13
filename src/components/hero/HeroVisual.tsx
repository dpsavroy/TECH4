"use client";

import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import { colors, radius, transitions, typography } from "@/styles/design-tokens";
import { SYSTEM_COLORS } from "./BuildingSchematic";

type SystemType = "bms" | "bas" | "cctv" | "sap" | "kd" | "hvac";

const systemsList: { id: SystemType; label: string; desc: string; color: string }[] = [
  { id: "bms", label: "BMS", desc: "Central management", color: SYSTEM_COLORS.bms },
  { id: "bas", label: "BAS", desc: "Building automation", color: SYSTEM_COLORS.bas },
  { id: "cctv", label: "CCTV", desc: "IP video surveillance", color: SYSTEM_COLORS.cctv },
  { id: "sap", label: "SAP", desc: "Fire alarm system", color: SYSTEM_COLORS.sap },
  { id: "kd", label: "KD", desc: "Access control", color: SYSTEM_COLORS.kd },
  { id: "hvac", label: "HVAC", desc: "HVAC automation", color: SYSTEM_COLORS.hvac },
];

const systemHotspots: Record<SystemType, { x: number; y: number }[]> = {
  bms: [{ x: 55, y: 42 }, { x: 56, y: 57 }, { x: 55, y: 72 }],
  bas: [{ x: 43, y: 29 }, { x: 47, y: 50 }, { x: 48, y: 68 }],
  cctv: [{ x: 18, y: 30 }, { x: 81, y: 31 }, { x: 78, y: 68 }],
  sap: [{ x: 67, y: 25 }, { x: 68, y: 47 }, { x: 68, y: 67 }],
  kd: [{ x: 33, y: 77 }, { x: 51, y: 77 }, { x: 62, y: 87 }],
  hvac: [{ x: 42, y: 14 }, { x: 54, y: 17 }, { x: 53, y: 88 }],
};

const BuildingCutaway = memo(function BuildingCutaway() {
  return (
    <Image
      src="/tech4-building-transparent.png"
      alt="Engineering cutaway of a commercial building with visible technical systems"
      fill
      priority
      quality={100}
      unoptimized
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 672px"
      className="pointer-events-none z-0 object-contain"
      style={{ transform: "translateZ(0)" }}
    />
  );
});

function SystemHotspots({ activeSystem }: { activeSystem: SystemType | null }) {
  if (!activeSystem) return null;

  const color = SYSTEM_COLORS[activeSystem];

  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 z-20 h-full w-full"
      aria-hidden="true"
    >
      {systemHotspots[activeSystem].map((hotspot, index) => (
        <g key={`${activeSystem}-${index}`} style={{ transformOrigin: `${hotspot.x}px ${hotspot.y}px` }}>
          <circle
            cx={hotspot.x}
            cy={hotspot.y}
            r="2.8"
            fill={color}
            opacity="0.18"
            className="animate-ping motion-reduce:animate-none"
            style={{ animationDelay: `${index * 180}ms`, animationDuration: "2.4s" }}
          />
          <circle cx={hotspot.x} cy={hotspot.y} r="1.35" fill="white" opacity="0.94" />
          <circle cx={hotspot.x} cy={hotspot.y} r="0.72" fill={color} />
        </g>
      ))}
    </svg>
  );
}

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
      <div className="w-full relative aspect-square transform-gpu will-change-transform [backface-visibility:hidden] transition-transform duration-500 ease-out hover:scale-[1.01] drop-shadow-[0_12px_36px_rgba(10,18,32,0.04)] dark:drop-shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
        <BuildingCutaway />
        <div
          className={`pointer-events-none absolute inset-0 z-10 bg-slate-950 transition-opacity duration-500 ease-out ${activeSystem ? "opacity-15" : "opacity-0"}`}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute top-0 left-0 z-20 w-4 h-4 border-t border-l border-neutral-300 dark:border-neutral-800" />
        <div className="pointer-events-none absolute top-0 right-0 z-20 w-4 h-4 border-t border-r border-neutral-300 dark:border-neutral-800" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-4 h-4 border-b border-l border-neutral-300 dark:border-neutral-800" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-20 w-4 h-4 border-b border-r border-neutral-300 dark:border-neutral-800" />
        <SystemHotspots activeSystem={activeSystem} />
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
