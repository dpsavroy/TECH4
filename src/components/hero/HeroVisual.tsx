"use client";

import Image from "next/image";
import { memo } from "react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { colors, darkColors, radius } from "@/styles/design-tokens";
import { SYSTEM_COLORS } from "./BuildingSchematic";
import type { SystemType } from "./useHeroOrchestration";

// ─── Static data ─────────────────────────────────────────────────────────────

const systemHotspots: Record<SystemType, { x: number; y: number }[]> = {
  bms: [
    { x: 55, y: 42 },
    { x: 56, y: 57 },
    { x: 55, y: 72 },
  ],
  bas: [
    { x: 43, y: 29 },
    { x: 47, y: 50 },
    { x: 48, y: 68 },
  ],
  cctv: [
    { x: 18, y: 30 },
    { x: 81, y: 31 },
    { x: 78, y: 68 },
  ],
  sap: [
    { x: 67, y: 25 },
    { x: 68, y: 47 },
    { x: 68, y: 67 },
  ],
  kd: [
    { x: 33, y: 77 },
    { x: 51, y: 77 },
    { x: 62, y: 87 },
  ],
  hvac: [
    { x: 42, y: 14 },
    { x: 54, y: 17 },
    { x: 53, y: 88 },
  ],
};

const systemStories: Partial<
  Record<
    SystemType,
    { image: string; tag: string; title: string; description: string }
  >
> = {
  bms: {
    image: "/bms-control-room.png",
    tag: "BMS · WIDOK NADZORU",
    title: "Centralny nadzór budynku",
    description: "Stan instalacji w jednym widoku.",
  },
  bas: {
    image: "/bas-control-panel.png",
    tag: "BAS · AUTOMATYKA",
    title: "Automatyka reaguje na potrzeby biura",
    description: "Światło i komfort pod kontrolą.",
  },
  cctv: {
    image: "/cctv-control-room.png",
    tag: "CCTV · PODGLĄD NA ŻYWO",
    title: "Monitoring w czasie rzeczywistym",
    description: "Obraz z kamer i punkt ochrony.",
  },
  kd: {
    image: "/access-card.png",
    tag: "KD · DOSTĘP PRZYZNANY",
    title: "Karta, czytnik, otwarte drzwi",
    description: "Bezpieczne wejście bez klucza.",
  },
  sap: {
    image: "/sap-detector-test.png",
    tag: "SAP · TEST BEZPIECZEŃSTWA",
    title: "Gotowość systemu pożarowego",
    description: "Czujki i alarm pod stałym nadzorem.",
  },
  hvac: {
    image: "/hvac-service.png",
    tag: "HVAC · WYDAJNOŚĆ",
    title: "Komfort i jakość powietrza",
    description: "Wydajna wentylacja każdego dnia.",
  },
};

const routePaths: Record<SystemType, string> = {
  bms: "M55 42V57H62V72",
  bas: "M43 29H47V50H58V68",
  cctv: "M18 30H47V49H78V68",
  sap: "M67 25V47V67",
  kd: "M33 77H51V66H62V87",
  hvac: "M42 14H54V52H53V88",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

const BuildingCutaway = memo(function BuildingCutaway() {
  return (
    <Image
      src="/tech4-building-transparent.png"
      alt="Przekrój techniczny budynku komercyjnego z widocznymi instalacjami technicznymi"
      width={1024}
      height={1024}
      priority
      quality={100}
      unoptimized
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, (max-width: 1280px) 55vw, 560px"
      className="pointer-events-none z-0 h-auto w-full object-contain"
      style={{ transform: "translateZ(0)" }}
    />
  );
});

function SystemMarker({
  x,
  y,
  color,
  system,
}: {
  x: number;
  y: number;
  color: string;
  system: SystemType;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="2.1" fill="white" stroke={color} strokeWidth="0.42" />
      {system === "cctv" ? (
        <path
          d="M-1.15-0.82h1.65l.42.46H1.35v1.36H-1.15zM1.35-.3l.95-.55v1.65l-.95-.55z"
          fill={color}
        />
      ) : null}
      {system === "kd" ? (
        <>
          <path
            d="M-1.05-1.1h1.05v2.2h-1.05zM.42-.86v1.72M.65-.36h.42"
            fill="none"
            stroke={color}
            strokeWidth="0.42"
            strokeLinecap="round"
          />
          <circle cx="-.53" cy=".18" r=".14" fill={color} />
        </>
      ) : null}
      {system === "bms" ? (
        <>
          <rect
            x="-1.18"
            y="-1"
            width="2.36"
            height="1.62"
            rx=".16"
            fill="none"
            stroke={color}
            strokeWidth=".42"
          />
          <path
            d="M-.42 1h.84M0 .62V1"
            stroke={color}
            strokeWidth=".42"
            strokeLinecap="round"
          />
        </>
      ) : null}
      {system === "bas" ? (
        <>
          <rect
            x="-1"
            y="-1.1"
            width="2"
            height="2.2"
            rx=".18"
            fill="none"
            stroke={color}
            strokeWidth=".42"
          />
          <circle cx="-.42" cy="-.38" r=".2" fill={color} />
          <circle cx=".42" cy=".38" r=".2" fill={color} />
        </>
      ) : null}
      {system === "sap" ? (
        <>
          <circle cy="-.18" r=".88" fill="none" stroke={color} strokeWidth=".42" />
          <path
            d="M-1.05 1h2.1M-.55 1v-.32h1.1V1"
            stroke={color}
            strokeWidth=".42"
            strokeLinecap="round"
          />
        </>
      ) : null}
      {system === "hvac" ? (
        <>
          <circle r=".92" fill="none" stroke={color} strokeWidth=".42" />
          <path
            d="M0-.92C.66-.68.66-.16.12 0M.8.46C.25.85-.25.55-.12.02M-.78.46C-.92-.15-.45-.55.1-.02"
            fill="none"
            stroke={color}
            strokeWidth=".38"
            strokeLinecap="round"
          />
        </>
      ) : null}
    </g>
  );
}

function SystemHotspots({
  activeSystem,
}: {
  activeSystem: SystemType | null;
}) {
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

function SystemRoutes({ activeSystem }: { activeSystem: SystemType | null }) {
  if (!activeSystem) return null;
  const color = SYSTEM_COLORS[activeSystem];
  const path = routePaths[activeSystem];
  return (
    <svg
      viewBox="0 0 100 100"
      className="pointer-events-none absolute inset-0 z-10 h-full w-full"
      aria-hidden="true"
    >
      <style>{`
        .system-route { stroke-dasharray: 3.5 2.5; animation: route-flow 1.7s linear infinite; }
        @keyframes route-flow { to { stroke-dashoffset: -12; } }
        @media (prefers-reduced-motion: reduce) { .system-route { animation: none; } }
      `}</style>
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="0.46"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="system-route"
        opacity="0.9"
      />
    </svg>
  );
}

/**
 * Floating story card that overlays the building image.
 *
 * Positioning:
 * - On xl (3-column layout) the card appears on the LEFT side of the building
 *   so it does not overlap the SystemCards in the right column.
 * - On lg and below it appears on the RIGHT side as before.
 */
function SystemStory({ activeSystem }: { activeSystem: SystemType | null }) {
  const { theme } = useTheme();
  const story = activeSystem ? systemStories[activeSystem] : null;
  if (!story || !activeSystem) return null;

  const isBottom = activeSystem === "kd" || activeSystem === "sap";
  const isDark = theme === "dark";
  const themeColors = isDark ? darkColors : colors;

  return (
    <article
      className={[
        "story-enter pointer-events-none absolute z-30 w-52 overflow-hidden",
        "border backdrop-blur-sm",
        // Vertical position
        isBottom ? "bottom-[8%]" : "top-[12%]",
        // Horizontal: left at xl (right column occupied by SystemCards), right at lg/md
        "right-0 xl:right-auto xl:left-0",
      ].join(" ")}
      style={{
        borderRadius: radius.md,
        backgroundColor: isDark
          ? "rgb(24 35 51 / 0.95)"
          : "rgb(255 255 255 / 0.95)",
        borderColor: isDark ? darkColors.neutral[800] : "rgb(255 255 255 / 0.80)",
        boxShadow: isDark
          ? "0 18px 42px rgb(0 0 0 / 0.36)"
          : "0 18px 42px rgb(14 29 51 / 0.18)",
        animation: "story-enter 300ms cubic-bezier(.16, 1, .3, 1) both",
      }}
      aria-label={story.title}
    >
      <div className="relative h-24 overflow-hidden bg-neutral-900">
        <Image
          src={story.image}
          alt=""
          fill
          sizes="208px"
          className="story-pan object-cover"
        />
        <span
          className="absolute left-2 top-2 px-1.5 py-1 font-mono text-[8px] font-medium tracking-[0.08em] text-white"
          style={{ backgroundColor: SYSTEM_COLORS[activeSystem] }}
        >
          {activeSystem === "cctv"
            ? "NA ŻYWO"
            : activeSystem === "kd"
              ? "DOSTĘP"
              : "AKTYWNY"}
        </span>
        <span className="story-scan absolute inset-x-0 bottom-0 h-px bg-white/75 shadow-[0_0_12px_4px_rgba(166,210,255,0.8)]" />
      </div>
      <div className="p-3">
        <span
          className="block font-mono text-[8px] font-medium tracking-[0.06em]"
          style={{ color: isDark ? darkColors.neutral[400] : colors.neutral[500] }}
        >
          {story.tag}
        </span>
        <strong
          className="mt-1 block text-[11px] leading-snug"
          style={{ color: themeColors.primary.ink }}
        >
          {story.title}
        </strong>
        <p
          className="mt-1 text-[10px] leading-snug"
          style={{ color: isDark ? darkColors.neutral[400] : colors.neutral[500] }}
        >
          {story.description}
        </p>
      </div>
    </article>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

interface HeroVisualProps {
  activeSystem: SystemType | null;
  isHovered: boolean;
  onHoverChange: (hovered: boolean) => void;
  onSystemSelect: (id: SystemType) => void;
}

export function HeroVisual({
  activeSystem,
  isHovered: _isHovered,
  onHoverChange,
  onSystemSelect: _onSystemSelect,
}: HeroVisualProps) {
  const { theme } = useTheme();
  const cornerMarkColor = theme === "dark" ? darkColors.neutral[800] : colors.neutral[300];

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full max-w-2xl xl:max-w-none mx-auto"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      {/* Animation keyframes — scoped to this component */}
      <style>{`
        .story-pan  { animation: story-pan  3.2s ease-in-out infinite alternate; }
        .story-scan { animation: story-scan 2.8s linear infinite; }
        @keyframes story-enter {
          from { opacity: 0; transform: translateY(8px) scale(.98); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes story-pan  { to { transform: scale(1.07); } }
        @keyframes story-scan { 0% { transform: translateY(0); } 100% { transform: translateY(-96px); } }
        @media (prefers-reduced-motion: reduce) {
          .story-enter, .story-pan, .story-scan { animation: none !important; }
        }
      `}</style>

      <div className="w-full relative transform-gpu will-change-transform [backface-visibility:hidden] transition-transform duration-500 ease-out hover:scale-[1.01] drop-shadow-[0_12px_36px_rgba(10,18,32,0.04)] dark:drop-shadow-[0_12px_36px_rgba(0,0,0,0.4)]">
        <BuildingCutaway />

        {/* Engineering corner marks */}
        <div className="pointer-events-none absolute top-0 left-0 z-20 w-4 h-4 border-t border-l" style={{ borderColor: cornerMarkColor }} />
        <div className="pointer-events-none absolute top-0 right-0 z-20 w-4 h-4 border-t border-r" style={{ borderColor: cornerMarkColor }} />
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-4 h-4 border-b border-l" style={{ borderColor: cornerMarkColor }} />
        <div className="pointer-events-none absolute bottom-0 right-0 z-20 w-4 h-4 border-b border-r" style={{ borderColor: cornerMarkColor }} />

        <SystemRoutes activeSystem={activeSystem} />
        <SystemHotspots activeSystem={activeSystem} />
        <SystemStory activeSystem={activeSystem} />
      </div>
    </div>
  );
}
