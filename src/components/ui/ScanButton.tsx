'use client';

import { ReactNode } from 'react';

interface ScanButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: 'solid' | 'outline';
  className?: string;
}

/**
 * ScanButton — CTA button with a vertical scan-line animation.
 *
 * Animation is defined in globals.css as `.scan-btn` + `@keyframes scan`.
 * This avoids styled-jsx (not installed) while keeping the styles co-located
 * in the project's single global CSS file.
 *
 * - variant="solid"   → filled green background, white text (primary CTA)
 * - variant="outline" → transparent with green border (secondary CTA)
 *
 * Renders as <a> when `href` is provided, otherwise as <button>.
 * Respects `prefers-reduced-motion` — animation is suppressed via CSS media query.
 */
export default function ScanButton({
  children,
  onClick,
  href,
  variant = 'outline',
  className,
}: ScanButtonProps) {
  const sharedClass = `scan-btn${className ? ` ${className}` : ''}`;

  if (href) {
    return (
      <a href={href} className={sharedClass} data-variant={variant}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={sharedClass} data-variant={variant}>
      {children}
    </button>
  );
}
