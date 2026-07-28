'use client';

import { ReactNode, useRef, useState, useEffect } from 'react';

interface TraceButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

export default function TraceButton({
  children,
  onClick,
  href,
  variant = 'outline',
  className,
}: TraceButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [size, setSize] = useState({ w: 160, h: 46 });

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setSize({ w: rect.width, h: rect.height });
    }
  }, [children]);

  const sharedClass = `trace-btn${className ? ` ${className}` : ''}`;
  const content = (
    <>
      {children}
      <svg viewBox={`0 0 ${size.w} ${size.h}`} preserveAspectRatio="none">
        <rect
          className="trace-base"
          x="1"
          y="1"
          width={size.w - 2}
          height={size.h - 2}
          rx="8"
        />
        <rect
          className="trace-glow"
          x="1"
          y="1"
          width={size.w - 2}
          height={size.h - 2}
          rx="8"
          pathLength={400}
        />
      </svg>
    </>
  );

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={sharedClass}
        data-variant={variant}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type="button"
      onClick={onClick}
      className={sharedClass}
      data-variant={variant}
    >
      {content}
    </button>
  );
}
