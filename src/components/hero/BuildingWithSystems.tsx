"use client";

import { useState, useRef, useEffect } from "react";
import {
  Server,
  Lock,
  Thermometer,
  Video,
  Shield,
  Cpu,
} from "lucide-react";

// System definitions with positions and target points on the building
interface SystemMarker {
  id: string;
  label: string;
  icon: React.ReactNode;
  // Position of the marker (percentage of container)
  markerX: number;
  markerY: number;
  // Target point on the building SVG (percentage of SVG viewBox 0-600)
  targetX: number;
  targetY: number;
  // Description
  description: string;
}

const systems: SystemMarker[] = [
  {
    id: "skud",
    label: "СКУД",
    icon: <Lock className="w-5 h-5" />,
    markerX: 8,
    markerY: 72,
    targetX: 300,
    targetY: 460,
    description: "Контроль доступа — двери и турникеты",
  },
  {
    id: "cctv",
    label: "ССТВ",
    icon: <Video className="w-5 h-5" />,
    markerX: 88,
    markerY: 20,
    targetX: 380,
    targetY: 120,
    description: "Видеонаблюдение — камеры по периметру",
  },
  {
    id: "ops",
    label: "ОПС",
    icon: <Shield className="w-5 h-5" />,
    markerX: 92,
    markerY: 60,
    targetX: 440,
    targetY: 310,
    description: "Охранно-пожарная сигнализация",
  },
  {
    id: "core",
    label: "Ядро",
    icon: <Server className="w-5 h-5" />,
    markerX: 50,
    markerY: 50,
    targetX: 300,
    targetY: 280,
    description: "Центральное ядро — серверная и коммуникации",
  },
  {
    id: "bms",
    label: "BMS",
    icon: <Cpu className="w-5 h-5" />,
    markerX: 18,
    markerY: 28,
    targetX: 300,
    targetY: 80,
    description: "Диспетчеризация и управление зданием",
  },
  {
    id: "hvac",
    label: "HVAC",
    icon: <Thermometer className="w-5 h-5" />,
    markerX: 8,
    markerY: 10,
    targetX: 340,
    targetY: 145,
    description: "Отопление, вентиляция, кондиционирование",
  },
];

export function BuildingWithSystems() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`relative w-full max-w-[580px] xl:max-w-[680px] aspect-square mx-auto transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Building SVG as background layer */}
      <svg
        ref={svgRef}
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full select-none"
        fill="none"
      >
        {/* Glow behind building */}
        <defs>
          <radialGradient id="buildingGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(6,182,212,0.06)" />
            <stop offset="100%" stopColor="rgba(6,182,212,0)" />
          </radialGradient>
          <filter id="buildingShadow">
            <feDropShadow dx="0" dy="0" stdDeviation="20" floodColor="rgba(6,182,212,0.15)" />
          </filter>
        </defs>

        {/* Ground plane shadow */}
        <ellipse cx="300" cy="500" rx="180" ry="30" fill="rgba(6,182,212,0.06)" />

        {/* Building fill with glow */}
        <rect x="0" y="0" width="600" height="600" fill="url(#buildingGlow)" />

        {/* Building body – right face */}
        <polygon
          points="300,493 455.9,403 455.9,109 300,199"
          fill="rgba(15,23,42,0.7)"
          stroke="rgba(100,140,170,0.35)"
          strokeWidth="1"
        />
        {/* Building body – left face (slightly darker) */}
        <polygon
          points="300,493 144.1,403 144.1,109 300,199"
          fill="rgba(10,16,30,0.75)"
          stroke="rgba(100,140,170,0.3)"
          strokeWidth="1"
        />
        {/* Building body – right roof face */}
        <polygon
          points="455.9,403 300,313 300,19 455.9,109"
          fill="rgba(15,23,42,0.5)"
          stroke="rgba(100,140,170,0.3)"
          strokeWidth="1"
        />
        {/* Building body – left roof face */}
        <polygon
          points="144.1,403 300,313 300,19 144.1,109"
          fill="rgba(8,14,28,0.6)"
          stroke="rgba(100,140,170,0.25)"
          strokeWidth="1"
        />
        {/* Building top */}
        <polygon
          points="300,199 455.9,109 300,19 144.1,109"
          fill="rgba(20,30,50,0.55)"
          stroke="rgba(100,140,170,0.35)"
          strokeWidth="1"
        />

        {/* Window grid lines – right face horizontal */}
        {[370, 340, 310, 280, 250, 220].map((y, i) => (
          <line
            key={`rh-${i}`}
            x1={300 + (455.9 - 300) * ((y - 199) / (493 - 199))}
            y1={y}
            x2={455.9}
            y2={y - (199 - y) * ((455.9 - 300) / (493 - 300))}
            stroke="rgba(6,182,212,0.08)"
            strokeWidth="0.5"
          />
        ))}
        {/* Window grid lines – left face horizontal */}
        {[370, 340, 310, 280, 250, 220].map((y, i) => (
          <line
            key={`lh-${i}`}
            x1={144.1}
            y1={y - (199 - y) * ((300 - 144.1) / (493 - 300))}
            x2={300 - (455.9 - 300) * ((y - 199) / (493 - 199))}
            y2={y}
            stroke="rgba(6,182,212,0.06)"
            strokeWidth="0.5"
          />
        ))}

        {/* Core / elevator shaft */}
        <rect
          x="270"
          y="140"
          width="60"
          height="350"
          rx="2"
          fill="rgba(6,182,212,0.04)"
          stroke="rgba(6,182,212,0.2)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />

        {/* Roof AHU units */}
        <rect x="340" y="105" width="35" height="20" rx="3" fill="rgba(100,140,170,0.2)" stroke="rgba(100,140,170,0.4)" strokeWidth="0.7" />
        <rect x="380" y="98" width="28" height="16" rx="3" fill="rgba(100,140,170,0.15)" stroke="rgba(100,140,170,0.35)" strokeWidth="0.7" />

        {/* Entrance highlight */}
        <rect
          x="280"
          y="430"
          width="40"
          height="60"
          rx="2"
          fill="rgba(6,182,212,0.05)"
          stroke="rgba(6,182,212,0.15)"
          strokeWidth="0.8"
        />

        {/* Connection lines from markers to building targets */}
        {systems.map((sys) => {
          const isActive = activeId === sys.id;
          // Convert marker percentage positions to SVG coordinates
          const mx = (sys.markerX / 100) * 600;
          const my = (sys.markerY / 100) * 600;
          return (
            <g key={`conn-${sys.id}`}>
              {/* Main connection line */}
              <line
                x1={mx}
                y1={my}
                x2={sys.targetX}
                y2={sys.targetY}
                stroke={isActive ? "rgba(6,182,212,0.6)" : "rgba(6,182,212,0.18)"}
                strokeWidth={isActive ? "1.2" : "0.7"}
                strokeDasharray={isActive ? "6 3" : "3 4"}
                className="transition-all duration-400"
                style={{
                  transition: "stroke 0.4s, stroke-width 0.4s, opacity 0.4s",
                }}
              />
              {/* Small dot at target */}
              <circle
                cx={sys.targetX}
                cy={sys.targetY}
                r={isActive ? 3.5 : 2.5}
                fill={isActive ? "rgba(6,182,212,0.7)" : "rgba(6,182,212,0.25)"}
                className="transition-all duration-400"
              />
              {/* Pulse ring at target when active */}
              {isActive && (
                <circle
                  cx={sys.targetX}
                  cy={sys.targetY}
                  r="6"
                  fill="none"
                  stroke="rgba(6,182,212,0.4)"
                  strokeWidth="1"
                  className="animate-ping"
                  style={{ animationDuration: "2s" }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* HTML Markers positioned over the edges */}
      {systems.map((sys) => {
        const isActive = activeId === sys.id;
        return (
          <div
            key={sys.id}
            className="absolute flex flex-col items-center gap-1 transition-all duration-400 cursor-pointer z-10"
            style={{
              left: `${sys.markerX}%`,
              top: `${sys.markerY}%`,
              transform: "translate(-50%, -50%)",
            }}
            onMouseEnter={() => setActiveId(sys.id)}
            onMouseLeave={() => setActiveId(null)}
          >
            {/* Icon circle */}
            <div
              className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ${
                isActive
                  ? "border-cyan-400/50 bg-cyan-500/15 shadow-lg shadow-cyan-500/25 scale-110"
                  : "border-white/10 bg-slate-900/70 backdrop-blur-sm hover:border-cyan-500/25"
              }`}
            >
              <div
                className={`transition-colors duration-300 ${
                  isActive ? "text-cyan-400" : "text-slate-400"
                }`}
              >
                {sys.icon}
              </div>
            </div>

            {/* Label */}
            <span
              className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all duration-300 ${
                isActive ? "text-cyan-400" : "text-slate-500"
              }`}
            >
              {sys.label}
            </span>

            {/* Tooltip description */}
            <div
              className={`absolute top-full mt-2 px-3 py-1.5 rounded-lg bg-slate-900 border text-xs text-slate-300 whitespace-nowrap pointer-events-none transition-all duration-300 ${
                isActive
                  ? "opacity-100 translate-y-0 border-cyan-500/30"
                  : "opacity-0 translate-y-2 border-transparent"
              }`}
            >
              {sys.description}
            </div>
          </div>
        );
      })}
    </div>
  );
}