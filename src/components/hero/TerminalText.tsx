"use client";

import { useEffect, useState, useRef } from "react";

const lines = [
  "> Объединяем диспетчеризацию BMS, службу Helpdesk 24/7",
  "> и системы безопасности в единую надёжную экосистему",
  "> для коммерческой и промышленной недвижимости.",
];

const LINE_DELAY = 600; // ms between lines
const CHAR_SPEED = 35; // ms per character

export function TerminalText() {
  const [displayedLines, setDisplayedLines] = useState<string[]>(["", "", ""]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [allDone, setAllDone] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);

  // Typing effect
  useEffect(() => {
    if (currentLine >= lines.length) {
      setAllDone(true);
      return;
    }

    const line = lines[currentLine];
    if (currentChar >= line.length) {
      // Line complete, move to next line after delay
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, LINE_DELAY);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => {
        const next = [...prev];
        next[currentLine] = line.slice(0, currentChar + 1);
        return next;
      });
      setCurrentChar((prev) => prev + 1);
    }, CHAR_SPEED);

    return () => clearTimeout(timeout);
  }, [currentLine, currentChar]);

  return (
    <div className="relative w-full max-w-xl lg:max-w-2xl font-mono text-sm sm:text-base leading-relaxed">
      {/* Terminal window chrome */}
      <div className="rounded-xl border border-white/10 bg-slate-900/60 backdrop-blur-md overflow-hidden shadow-2xl shadow-cyan-500/5">
        {/* Terminal title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/5 bg-slate-900/80">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-3 text-[10px] sm:text-xs text-slate-500 tracking-wider uppercase select-none">
            tech4@terminal — ~/services
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 sm:p-5 md:p-6 min-h-[140px] sm:min-h-[160px]">
          {/* Prompt line (static) */}
          <div className="flex items-start gap-2 mb-3 text-slate-500">
            <span className="text-cyan-400 font-semibold select-none shrink-0">tech4@bms:~$</span>
            <span className="text-slate-300">cat ./mission.txt</span>
          </div>

          {/* Output lines */}
          <div className="pl-4 border-l border-white/5">
            {displayedLines.map((line, idx) => (
              <div key={idx} className="relative">
                <span className="text-slate-400">
                  {line}
                </span>
                {/* Show cursor at the end of the last active line */}
                {idx === currentLine && currentLine < lines.length && (
                  <span
                    ref={cursorRef}
                    className="inline-block w-[7px] h-[1.1em] bg-cyan-400 align-middle ml-0.5 animate-pulse"
                    style={{ animationDuration: "0.6s" }}
                  />
                )}
                {/* Empty lines */}
                {line === "" && idx === currentLine && currentLine < lines.length && (
                  <span
                    className="inline-block w-[7px] h-[1.1em] bg-cyan-400 align-middle animate-pulse"
                    style={{ animationDuration: "0.6s" }}
                  />
                )}
              </div>
            ))}
            {/* Blinking cursor after all lines done */}
            {allDone && (
              <div className="flex items-start gap-2 mt-3 text-slate-500">
                <span className="text-cyan-400 font-semibold select-none shrink-0">tech4@bms:~$</span>
                <span className="inline-block w-[7px] h-[1.1em] bg-cyan-400 animate-pulse" style={{ animationDuration: "0.8s" }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",
        }}
      />
    </div>
  );
}