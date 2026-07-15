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

const systemStories: Partial<Record<SystemType, { image: string; tag: string; title: string; description: string }>> = {
  bms: {
    image: "/bms-control-room.png",
    tag: "BMS · CONTROL VIEW",
    title: "Centralny nadzór budynku",
    description: "Stan instalacji w jednym widoku.",
  },
  bas: {
    image: "/bas-control-panel.png",
    tag: "BAS · AUTOMATION",
    title: "Automatyka reaguje na potrzeby biura",
    description: "Światło i komfort pod kontrolą.",
  },
  cctv: {
    image: "/cctv-control-room.png",
    tag: "CCTV · LIVE VIEW",
    title: "Monitoring w czasie rzeczywistym",
    description: "Obraz z kamer i punkt ochrony.",
  },
  kd: {
    image: "/access-card.png",
    tag: "KD · ACCESS GRANTED",
    title: "Karta, czytnik, otwarte drzwi",
    description: "Bezpieczne wejście bez klucza.",
  },
  sap: {
    image: "/sap-detector-test.png",
    tag: "SAP · SAFETY TEST",
    title: "Gotowość systemu pożarowego",
    description: "Czujki i alarm pod stałym nadzorem.",
  },
  hvac: {
    image: "/hvac-service.png",
    tag: "HVAC · PERFORMANCE",
    title: "Komfort i jakość powietrza",
    description: "Wydajna wentylacja każdego dnia.",
  },
};

const BuildingCutaway = memo(function BuildingCutaway() {
  return (
    <Image
      src="/tech4-building-transparent.png"
      alt="Engineering cutaway of a commercial building with visible technical systems"
      width={1024}
      height={1024}
      priority
      quality={100}
      unoptimized
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 70vw, 672px"
      className="pointer-events-none z-0 h-auto w-full object-contain"
      style={{ transform: "translateZ(0)" }}
    />
  );
});

function SystemMarker({ x, y, color, system }: { x: number; y: number; color: string; system: SystemType }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="2.1" fill="white" stroke={color} strokeWidth="0.42" />
      {system === "cctv" ? <path d="M-1.15-0.82h1.65l.42.46H1.35v1.36H-1.15zM1.35-.3l.95-.55v1.65l-.95-.55z" fill={color} /> : null}
      {system === "kd" ? <><path d="M-1.05-1.1h1.05v2.2h-1.05zM.42-.86v1.72M.65-.36h.42" fill="none" stroke={color} strokeWidth="0.42" strokeLinecap="round" /><circle cx="-.53" cy=".18" r=".14" fill={color} /></> : null}
      {system === "bms" ? <><rect x="-1.18" y="-1" width="2.36" height="1.62" rx=".16" fill="none" stroke={color} strokeWidth=".42" /><path d="M-.42 1h.84M0 .62V1" stroke={color} strokeWidth=".42" strokeLinecap="round" /></> : null}
      {system === "bas" ? <><rect x="-1" y="-1.1" width="2" height="2.2" rx=".18" fill="none" stroke={color} strokeWidth=".42" /><circle cx="-.42" cy="-.38" r=".2" fill={color} /><circle cx=".42" cy=".38" r=".2" fill={color} /></> : null}
      {system === "sap" ? <><circle cy="-.18" r=".88" fill="none" stroke={color} strokeWidth=".42" /><path d="M-1.05 1h2.1M-.55 1v-.32h1.1V1" stroke={color} strokeWidth=".42" strokeLinecap="round" /></> : null}
      {system === "hvac" ? <><circle r=".92" fill="none" stroke={color} strokeWidth=".42" /><path d="M0-.92C.66-.68.66-.16.12 0M.8.46C.25.85-.25.55-.12.02M-.78.46C-.92-.15-.45-.55.1-.02" fill="none" stroke={color} strokeWidth=".38" strokeLinecap="round" /></> : null}
    </g>
  );
}

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
        <g key={`${activeSystem}-${index}`}>
          <SystemMarker {...hotspot} color={color} system={activeSystem} />
        </g>
      ))}
    </svg>
  );
}

const routePaths: Record<SystemType, string> = {
  bms: "M55 42V57H62V72",
  bas: "M43 29H47V50H58V68",
  cctv: "M18 30H47V49H78V68",
  sap: "M67 25V47V67",
  kd: "M33 77H51V66H62V87",
  hvac: "M42 14H54V52H53V88",
};

function SystemRoutes({ activeSystem }: { activeSystem: SystemType | null }) {
  if (!activeSystem) return null;

  const color = SYSTEM_COLORS[activeSystem];
  const path = routePaths[activeSystem];

  return (
    <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 z-10 h-full w-full" aria-hidden="true">
      <style>{`
        .system-route { stroke-dasharray: 3.5 2.5; animation: route-flow 1.7s linear infinite; }
        @keyframes route-flow { to { stroke-dashoffset: -12; } }
        @media (prefers-reduced-motion: reduce) { .system-route { animation: none; } }
      `}</style>
      <path d={path} fill="none" stroke={color} strokeWidth="0.46" strokeLinecap="round" strokeLinejoin="round" className="system-route" opacity="0.9" />
    </svg>
  );
}

function SystemStory({ activeSystem }: { activeSystem: SystemType | null }) {
  const story = activeSystem ? systemStories[activeSystem] : null;
  if (!story || !activeSystem) return null;

  return (
    <article
      className={`story-enter pointer-events-none absolute z-30 w-52 overflow-hidden border border-white/80 bg-white/95 shadow-[0_18px_42px_rgba(14,29,51,0.18)] backdrop-blur-sm ${activeSystem === "kd" || activeSystem === "sap" ? "bottom-[8%] right-[3%]" : "right-0 top-[12%]"}`}
      style={{ borderRadius: radius.md, animation: "story-enter 300ms cubic-bezier(.16, 1, .3, 1) both" }}
      aria-label={story.title}
    >
      <div className="relative h-24 overflow-hidden bg-neutral-900">
        <Image src={story.image} alt="" fill sizes="208px" className="story-pan object-cover" />
        <span className="absolute left-2 top-2 px-1.5 py-1 font-mono text-[8px] font-medium tracking-[0.08em] text-white" style={{ backgroundColor: SYSTEM_COLORS[activeSystem] }}>
          {activeSystem === "cctv" ? "LIVE" : activeSystem === "kd" ? "ACCESS" : "ACTIVE"}
        </span>
        <span className="story-scan absolute inset-x-0 bottom-0 h-px bg-white/75 shadow-[0_0_12px_4px_rgba(166,210,255,0.8)]" />
      </div>
      <div className="p-3">
        <span className="block font-mono text-[8px] font-medium tracking-[0.06em] text-neutral-500">{story.tag}</span>
        <strong className="mt-1 block text-[11px] leading-snug text-neutral-900">{story.title}</strong>
        <p className="mt-1 text-[10px] leading-snug text-neutral-500">{story.description}</p>
      </div>
    </article>
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
      <div className="w-full relative transform-gpu will-change-transform [backface-visibility:hidden] transition-transform duration-500 ease-out hover:scale-[1.01] drop-shadow-[0_12px_36px_rgba(10,18,32,0.04)] dark:drop-shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
        <style>{`
          .story-pan { animation: story-pan 3.2s ease-in-out infinite alternate; }
          .story-scan { animation: story-scan 2.8s linear infinite; }
          @keyframes story-enter { from { opacity: 0; transform: translateY(8px) scale(.98); } to { opacity: 1; transform: none; } }
          @keyframes story-pan { to { transform: scale(1.07); } }
          @keyframes story-scan { 0% { transform: translateY(0); } 100% { transform: translateY(-96px); } }
          @media (prefers-reduced-motion: reduce) { .story-enter, .story-pan, .story-scan { animation: none !important; } }
        `}</style>
        <BuildingCutaway />
        <div className="pointer-events-none absolute top-0 left-0 z-20 w-4 h-4 border-t border-l border-neutral-300 dark:border-neutral-800" />
        <div className="pointer-events-none absolute top-0 right-0 z-20 w-4 h-4 border-t border-r border-neutral-300 dark:border-neutral-800" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-4 h-4 border-b border-l border-neutral-300 dark:border-neutral-800" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-20 w-4 h-4 border-b border-r border-neutral-300 dark:border-neutral-800" />
        <SystemRoutes activeSystem={activeSystem} />
        <SystemHotspots activeSystem={activeSystem} />
        <SystemStory activeSystem={activeSystem} />
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
