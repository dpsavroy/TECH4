"use client";

import { useTheme } from "@/components/theme/ThemeProvider";
import { colors, darkColors } from "@/styles/design-tokens";

export const SYSTEM_COLORS = {
  hvac: "#3B82F6",
  sap: "#EF4444",
  kd: "#22C55E",
  cctv: "#8B5CF6",
  bas: "#F97316",
  bms: colors.primary.signal,
} as const;

interface BuildingSchematicProps {
  activeSystem: "bms" | "bas" | "cctv" | "sap" | "kd" | "hvac" | null;
}

const floors = [500, 450, 400, 350, 300, 250, 200];
const beamLevels = [494, 444, 394, 344, 294, 244, 194];
const facadeMullions = [0.2, 0.4, 0.6, 0.8];

function diamond(y: number) {
  return `300,${y} 455.9,${y - 90} 300,${y - 180} 144.1,${y - 90}`;
}

export function BuildingSchematic({ activeSystem }: BuildingSchematicProps) {
  const { theme } = useTheme();
  const themeColors = theme === "dark" ? darkColors : colors;
  const hvacActive = activeSystem === "hvac";
  const cctvActive = activeSystem === "cctv";
  const sapActive = activeSystem === "sap";
  const kdActive = activeSystem === "kd";
  const bmsActive = activeSystem === "bms";
  const basActive = activeSystem === "bas";
  const securityActive = cctvActive || kdActive;
  const networkActive = bmsActive || basActive;
  const systemStroke = hvacActive
    ? SYSTEM_COLORS.hvac
    : sapActive
      ? SYSTEM_COLORS.sap
      : kdActive
        ? SYSTEM_COLORS.kd
        : cctvActive
          ? SYSTEM_COLORS.cctv
          : basActive
            ? SYSTEM_COLORS.bas
            : bmsActive
              ? SYSTEM_COLORS.bms
              : themeColors.neutral[400];

  return (
    <svg
      viewBox="0 0 600 600"
      className="w-full h-auto select-none"
      role="img"
      aria-label="Izometryczny model BIM konstrukcji i instalacji budynku biurowego TECH4"
    >
      <title>TECH4 Revit-style office building model</title>
      <desc>Gęsty izometryczny model BIM budynku biurowego z konstrukcją, fasadą kurtynową, rdzeniem oraz instalacjami technicznymi.</desc>

      <defs>
        <pattern id="bimGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke={themeColors.neutral[300]} strokeWidth="0.45" opacity="0.36" />
          <circle cx="0" cy="0" r="0.7" fill={themeColors.neutral[400]} opacity="0.34" />
        </pattern>
        <pattern id="concreteHatch" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="7" stroke={themeColors.neutral[500]} strokeWidth="0.55" opacity="0.34" />
        </pattern>
        <pattern id="concreteStipple" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="3" r="0.55" fill={themeColors.neutral[500]} opacity="0.3" />
          <circle cx="9" cy="8" r="0.45" fill={themeColors.neutral[500]} opacity="0.22" />
        </pattern>
        <style>{`
          .bim-transition { transition: stroke .4s cubic-bezier(.2,0,0,1), opacity .4s cubic-bezier(.2,0,0,1), fill .4s cubic-bezier(.2,0,0,1); }
          .fan-blade { transform-origin: 401px 105px; }
          .fan-active .fan-blade { animation: spinFan 3s linear infinite; }
          @keyframes spinFan { to { transform: rotate(360deg); } }
          @media (prefers-reduced-motion: reduce) { .fan-active .fan-blade { animation: none !important; } }
        `}</style>
      </defs>

      {/* BIM sheet and low-priority construction geometry */}
      <rect x="15" y="15" width="570" height="570" rx="8" fill="url(#bimGrid)" />
      <rect x="15" y="15" width="570" height="570" rx="8" fill="none" stroke={themeColors.neutral[200]} className="dark:stroke-neutral-800" opacity="0.65" />
      <g fill="none" stroke={themeColors.neutral[400]} strokeWidth="0.55" strokeDasharray="4 5" className="dark:stroke-neutral-700" opacity="0.32">
        <line x1="75" y1="500" x2="525" y2="240" />
        <line x1="75" y1="240" x2="525" y2="500" />
        <line x1="300" y1="35" x2="300" y2="540" />
        <line x1="108" y1="410" x2="492" y2="188" strokeDasharray="2 5" />
        <line x1="108" y1="188" x2="492" y2="410" strokeDasharray="2 5" />
      </g>
      <g fill="none" stroke={themeColors.neutral[400]} strokeWidth="0.7" className="dark:stroke-neutral-700" opacity="0.42">
        <path d="M112 417h14m-7-7v14 M474 417h14m-7-7v14 M293 505h14m-7-7v14 M293 188h14m-7-7v14" />
        <path d="M126 435l10-5m-10 5 10 5 M464 435l10-5m-10 5 10 5" />
        <path d="M131 125h18m-9-6v12 M451 125h18m-9-6v12" />
      </g>

      {/* Reinforced concrete floor plates: top surface, structural edge, underside and chamfer */}
      <g className="bim-transition dark:stroke-neutral-700" stroke={themeColors.neutral[500]} strokeWidth="0.8" strokeLinejoin="round">
        {floors.map((level, index) => {
          const accent = (index === 3 && hvacActive) || (index === 6 && hvacActive);
          const stroke = accent ? SYSTEM_COLORS.hvac : themeColors.neutral[500];
          return (
            <g key={level} stroke={stroke} opacity={accent ? 0.94 : 0.74} fill="none">
              <polygon points={diamond(level - 7)} fill={themeColors.background.surface} className="dark:fill-neutral-900" opacity="0.28" />
              <polygon points={`300,${level} 455.9,${level - 90} 455.9,${level - 97} 300,${level - 7}`} fill="url(#concreteHatch)" />
              <polygon points={`300,${level} 144.1,${level - 90} 144.1,${level - 97} 300,${level - 7}`} fill="url(#concreteHatch)" opacity="0.82" />
              <polygon points={`300,${level - 7} 455.9,${level - 97} 300,${level - 187} 144.1,${level - 97}`} fill="url(#concreteStipple)" stroke="none" opacity="0.28" />
              <path d={`M300 ${level - 3.5}L452 ${level - 91.5}M300 ${level - 3.5}L148 ${level - 91.5}`} strokeWidth="0.6" />
              <path d={`M300 ${level - 10}L450 ${level - 96.5}M300 ${level - 10}L150 ${level - 96.5} M300 ${level - 184}L452 ${level - 96}M300 ${level - 184}L148 ${level - 96}`} strokeWidth="0.42" opacity="0.68" />
              <path d={`M300 ${level}l-5-3.2m5 3.2 5-3.2 M455.9 ${level - 90}l-5-3m5 3v-6 M144.1 ${level - 90}l5-3m-5 3v-6`} strokeWidth="0.8" />
              <path d={`M300 ${level - 7}L455.9 ${level - 97}L300 ${level - 187}L144.1 ${level - 97}Z`} strokeWidth="1" />
            </g>
          );
        })}
      </g>

      {/* Primary structural column grid, including hidden rear supports */}
      <g stroke={themeColors.neutral[500]} fill="none" className="dark:stroke-neutral-600 bim-transition" opacity="0.76">
        <g strokeWidth="1.3">
          <line x1="300" y1="500" x2="300" y2="194" />
          <line x1="455.9" y1="410" x2="455.9" y2="104" />
          <line x1="144.1" y1="410" x2="144.1" y2="104" />
        </g>
        <g strokeWidth="1.05">
          <line x1="331.2" y1="482" x2="331.2" y2="176" />
          <line x1="362.4" y1="464" x2="362.4" y2="158" />
          <line x1="393.5" y1="446" x2="393.5" y2="140" />
          <line x1="424.7" y1="428" x2="424.7" y2="122" />
          <line x1="268.8" y1="482" x2="268.8" y2="176" />
          <line x1="237.6" y1="464" x2="237.6" y2="158" />
          <line x1="206.5" y1="446" x2="206.5" y2="140" />
          <line x1="175.3" y1="428" x2="175.3" y2="122" />
        </g>
        <g strokeWidth="0.8" strokeDasharray="3 3" opacity="0.42">
          <line x1="300" y1="320" x2="300" y2="14" />
          <line x1="175.3" y1="428" x2="175.3" y2="122" />
          <line x1="237.6" y1="392" x2="237.6" y2="86" />
          <line x1="362.4" y1="392" x2="362.4" y2="86" />
          <line x1="424.7" y1="428" x2="424.7" y2="122" />
        </g>
      </g>

      {/* Primary perimeter beams and dense secondary framing */}
      <g stroke={themeColors.neutral[600]} fill="none" className="dark:stroke-neutral-500 bim-transition" opacity="0.76" strokeLinejoin="round">
        {beamLevels.map((level) => (
          <g key={level}>
            <path d={`M144.1 ${level - 84}L300 ${level + 6}L455.9 ${level - 84}M144.1 ${level - 84}L300 ${level - 174}L455.9 ${level - 84}`} strokeWidth="1.15" />
            <path d={`M144.1 ${level - 80}L300 ${level + 10}L455.9 ${level - 80}`} strokeWidth="0.5" opacity="0.65" />
            <path d={`M175.3 ${level - 66}L331.2 ${level + 24}L424.7 ${level - 30} M237.6 ${level - 102}L393.5 ${level - 12} M268.8 ${level - 120}L362.4 ${level - 66}`} strokeWidth="0.65" opacity="0.72" />
            <path d={`M175.3 ${level - 66}L331.2 ${level - 156}L424.7 ${level - 102} M237.6 ${level - 102}L393.5 ${level - 192}`} strokeWidth="0.55" strokeDasharray="2 3" opacity="0.43" />
            <path d={`M144.1 ${level - 84}v-7 M175.3 ${level - 66}v-7 M237.6 ${level - 102}v-7 M300 ${level + 6}v-7 M362.4 ${level - 66}v-7 M424.7 ${level - 30}v-7 M455.9 ${level - 84}v-7`} strokeWidth="0.72" opacity="0.82" />
          </g>
        ))}
      </g>

      {/* Central reinforced concrete core: walls, lift, stair and services */}
      <g stroke={systemStroke} fill="none" className="bim-transition dark:stroke-neutral-600" opacity={securityActive || networkActive || sapActive ? 0.98 : 0.7}>
        <g strokeWidth={securityActive || networkActive || sapActive ? 1.45 : 1.05}>
          <path d="M300 440V112 M352 410V82 M248 410V82 M300 380V52" strokeDasharray="0" />
          <path d="M300 432V120 M344 407V95 M256 407V95 M300 382V65" strokeWidth="0.75" />
          <polygon points="300,432 344,407 344,95 300,120" fill="url(#concreteHatch)" opacity="0.18" />
          <polygon points="300,432 256,407 256,95 300,120" fill="url(#concreteHatch)" opacity="0.14" />
          <polygon points="300,120 352,90 300,60 248,90" fill={themeColors.background.muted} className="dark:fill-neutral-900" opacity="0.42" />
          <polygon points="300,128 344,103 300,78 256,103" fill="url(#concreteHatch)" opacity="0.5" />
        </g>
        <g strokeWidth="0.55" opacity="0.55">
          {beamLevels.slice(1).map((level) => <path key={level} d={`M258 ${level - 18}L300 ${level - 42}L342 ${level - 18} M258 ${level - 10}L300 ${level - 34}L342 ${level - 10}`} />)}
        </g>
        {/* Elevator shaft and car */}
        <g stroke={securityActive ? systemStroke : themeColors.neutral[600]} strokeWidth="0.95" opacity={securityActive ? 1 : 0.78}>
          <path d="M277 420V135 M300 433V148 M323 420V135" />
          <polygon points="300,286 326,271 300,256 274,271" fill={themeColors.background.surface} className="dark:fill-neutral-900" />
          <polygon points="300,262 326,247 300,232 274,247" />
          <line x1="274" y1="271" x2="274" y2="247" /><line x1="326" y1="271" x2="326" y2="247" /><line x1="300" y1="286" x2="300" y2="262" />
        </g>
        {/* Stair flights and landings */}
        <g stroke={themeColors.neutral[600]} strokeWidth="0.7" opacity="0.84">
          <path d="M258 397l34-20-24-14 34-20-24-14 34-20-24-14 34-20-24-14 34-20-24-14" />
          <path d="M342 397l-34-20 24-14-34-20 24-14-34-20 24-14-34-20 24-14-34-20 24-14" />
          <path d="M268 405L300 387L332 405 M268 355L300 337L332 355 M268 305L300 287L332 305 M268 255L300 237L332 255 M268 205L300 187L332 205" strokeWidth="0.5" />
          <path d="M264 403L264 188 M336 403L336 188 M264 403l5-3m-5 3 5 3 M336 403l-5-3m5 3-5 3" strokeWidth="0.48" opacity="0.7" />
        </g>
        {/* Vertical ducts, pipe pairs and network risers */}
        <g stroke={networkActive ? systemStroke : themeColors.neutral[500]} strokeWidth="0.8" opacity={networkActive ? 1 : 0.65}>
          <line x1="282" y1="422" x2="282" y2="132" strokeDasharray="2 2" />
          <line x1="318" y1="422" x2="318" y2="132" strokeDasharray="2 2" />
          <line x1="290" y1="424" x2="290" y2="130" /><line x1="310" y1="424" x2="310" y2="130" />
          {floors.slice(1).map((level) => <path key={level} d={`M280 ${level - 22}H320 M282 ${level - 28}H318`} strokeWidth="0.5" />)}
        </g>
      </g>

      {/* Technical risers and exposed mechanical distribution, secondary until HVAC is active */}
      <g stroke={hvacActive ? SYSTEM_COLORS.hvac : themeColors.neutral[500]} fill="none" className="bim-transition dark:stroke-neutral-700" opacity={hvacActive ? 1 : 0.38}>
        <g strokeWidth={hvacActive ? 1.45 : 0.8}>
          <path d="M334 390V174H402V152" />
          <path d="M266 390V224H198V202" />
          <path d="M334 340H402V290H432 M266 340H198V290H168" strokeDasharray="4 2" />
        </g>
        <g strokeWidth="0.65">
          <path d="M343 386V184H390 M257 386V234H210" />
          <path d="M338 275h58m-58 8h58 M204 275h58m-58 8h58" />
          <circle cx="402" cy="152" r="3" /><circle cx="198" cy="202" r="3" />
        </g>
      </g>

      {/* Roof plant: dunnage, ducts, two AHUs, fans and pipework */}
      <g stroke={hvacActive ? SYSTEM_COLORS.hvac : themeColors.neutral[500]} fill="none" className="bim-transition dark:stroke-neutral-600" opacity={hvacActive ? 1 : 0.44}>
        <g strokeWidth="0.8">
          <path d="M326 176L414 125L384 108L296 159Z M326 183L414 132 M296 166L384 115" />
          <path d="M316 172L408 119 M326 166L418 113" strokeWidth="1.2" />
          <line x1="326" y1="183" x2="326" y2="169" /><line x1="414" y1="132" x2="414" y2="118" /><line x1="296" y1="166" x2="296" y2="152" />
        </g>
        <g className={hvacActive ? "fan-active" : ""} strokeWidth="0.95">
          <polygon points="350,151 380,134 364,125 334,142" fill={themeColors.background.surface} className="dark:fill-neutral-900" />
          <polygon points="350,133 380,116 364,107 334,124" />
          <line x1="350" y1="151" x2="350" y2="133" /><line x1="380" y1="134" x2="380" y2="116" /><line x1="334" y1="142" x2="334" y2="124" />
          <ellipse cx="357" cy="127" rx="8" ry="4" /><ellipse cx="370" cy="119.5" rx="8" ry="4" />
          <g className="fan-blade"><path d="M401 105l8-4m-8 4-5-7m5 7 5 7m-5-7-8 4" /></g>
        </g>
        <g strokeWidth="0.75">
          <polygon points="394,128 424,111 408,102 378,119" fill={themeColors.background.surface} className="dark:fill-neutral-900" />
          <polygon points="394,111 424,94 408,85 378,102" />
          <line x1="394" y1="128" x2="394" y2="111" /><line x1="424" y1="111" x2="424" y2="94" /><line x1="378" y1="119" x2="378" y2="102" />
          <path d="M321 155h35l18-10h33 M321 161h35l18-10h33" /><circle cx="321" cy="158" r="3" /><circle cx="407" cy="135" r="3" />
        </g>
      </g>

      {/* Curtain wall: four glazed elevations, mullions, transoms, corner glazing and parapet */}
      <g stroke="#6387A6" fill="none" className="bim-transition dark:stroke-neutral-500" opacity="0.84">
        <g fill="#DDEBF4" stroke="none" className="dark:fill-[#1B2C3B]" opacity="0.42">
          <polygon points="300,493 455.9,403 455.9,109 300,199" />
          <polygon points="300,493 144.1,403 144.1,109 300,199" opacity="0.9" />
          <polygon points="455.9,403 300,313 300,19 455.9,109" opacity="0.54" />
          <polygon points="144.1,403 300,313 300,19 144.1,109" opacity="0.54" />
        </g>
        <g strokeWidth="0.82">
          {facadeMullions.map((ratio) => (
            <g key={ratio}>
              <line x1={300 + 155.9 * ratio} y1={493 - 90 * ratio} x2={300 + 155.9 * ratio} y2={199 - 90 * ratio} />
              <line x1={300 - 155.9 * ratio} y1={493 - 90 * ratio} x2={300 - 155.9 * ratio} y2={199 - 90 * ratio} />
              <line x1={455.9 - 155.9 * ratio} y1={403 - 90 * ratio} x2={455.9 - 155.9 * ratio} y2={109 - 90 * ratio} opacity="0.62" />
              <line x1={144.1 + 155.9 * ratio} y1={403 - 90 * ratio} x2={144.1 + 155.9 * ratio} y2={109 - 90 * ratio} opacity="0.62" />
            </g>
          ))}
          {/* Recessed panel-edge lines provide glazing depth without reflections. */}
          {facadeMullions.slice(0, 3).map((ratio) => (
            <g key={`panel-${ratio}`} stroke="#9FB8CB" strokeWidth="0.36" opacity="0.58">
              <line x1={304 + 155.9 * ratio} y1={487 - 90 * ratio} x2={304 + 155.9 * ratio} y2={205 - 90 * ratio} />
              <line x1={296 - 155.9 * ratio} y1={487 - 90 * ratio} x2={296 - 155.9 * ratio} y2={205 - 90 * ratio} />
            </g>
          ))}
          {floors.slice(0, 6).map((level) => (
            <g key={level} strokeWidth="0.62">
              <path d={`M300 ${level - 17}L455.9 ${level - 107} M300 ${level - 17}L144.1 ${level - 107}`} />
              <path d={`M455.9 ${level - 107}L300 ${level - 197} M144.1 ${level - 107}L300 ${level - 197}`} opacity="0.56" />
            </g>
          ))}
        </g>
        <g stroke="#4E718F" strokeWidth="1.2" className="dark:stroke-neutral-400">
          <line x1="300" y1="493" x2="300" y2="193" /><line x1="455.9" y1="403" x2="455.9" y2="103" /><line x1="144.1" y1="403" x2="144.1" y2="103" />
          <path d="M300 193L455.9 103L300 13L144.1 103Z" />
          <path d="M300 187L451 100 M300 187L149 100" strokeWidth="0.6" />
        </g>
      </g>

      {/* Roof-mounted solar array remains energy-system specific */}
      <g stroke={themeColors.neutral[500]} fill="transparent" className="bim-transition dark:stroke-neutral-700" strokeWidth="0.7" opacity="0.34">
        <polygon points="180,154 214,171 239,157 205,140" /><polygon points="219,176 253,193 278,179 244,162" /><polygon points="258,198 292,215 317,201 283,184" />
        <path d="M191 151l13 17m-1-24 13 17m14 8 13 17m-1-24 13 17m14 8 13 17m-1-24 13 17" strokeWidth="0.55" />
      </g>
    </svg>
  );
}
