'use client';

import { useEffect, useRef, useState } from 'react';

const NATURAL_W = 1720;
const NATURAL_H = 624;
const SCALE = 0.5;

const ICON = { x0: 157, y0: 87, x1: 462, y1: 393 };
const TECH = { x0: 526, y0: 87, x1: 1395, y1: 393 };
const FOUR = { x0: 1421, y0: 87, x1: 1618, y1: 393 };
const TAG  = { x0: 221, y0: 491, x1: 1593, y1: 553 };

function crop(box: { x0: number, y0: number, x1: number, y1: number }) {
  return {
    w: Math.round((box.x1 - box.x0) * SCALE),
    h: Math.round((box.y1 - box.y0) * SCALE),
    bgX: Math.round(-box.x0 * SCALE),
    bgY: Math.round(-box.y0 * SCALE),
  };
}

const icon = crop(ICON);
const tech = crop(TECH);
const four = crop(FOUR);
const tag = crop(TAG);
const bgW = Math.round(NATURAL_W * SCALE);
const bgH = Math.round(NATURAL_H * SCALE);
const rowH = icon.h;
const iconTechGap = Math.round((TECH.x0 - ICON.x1) * SCALE);
const techFourGap = Math.round((FOUR.x0 - TECH.x1) * SCALE);
const tagMarginTop = Math.round((TAG.y0 - ICON.y1) * SCALE);

export default function LogoIntro() {
  const [phase, setPhase] = useState<'reveal' | 'flying' | 'done'>('reveal');
  const rowRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Phase: reveal
    const reveal = revealRef.current;
    if (reveal) {
      reveal.style.visibility = 'hidden';
      reveal.style.width = 'auto';
      const natural = reveal.offsetWidth;
      reveal.style.width = '0px';
      reveal.style.visibility = 'visible';
      // Trigger reflow
      void reveal.offsetWidth;

      const t1 = setTimeout(() => {
        reveal.style.width = natural + 'px';
        reveal.classList.add('shown');
      }, 500);

      const t2 = setTimeout(() => {
        setPhase('flying');
      }, 2100);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  useEffect(() => {
    if (phase !== 'flying') return;
    const row = rowRef.current;
    const target = document.getElementById('site-logo');
    if (!row || !target) {
      setPhase('done');
      return;
    }

    const startRect = row.getBoundingClientRect();
    const endRect = target.getBoundingClientRect();

    const scale = endRect.width / startRect.width;
    const dx = endRect.left + endRect.width / 2 - (startRect.left + startRect.width / 2);
    const dy = endRect.top + endRect.height / 2 - (startRect.top + startRect.height / 2);

    row.style.transformOrigin = 'center center';
    row.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
    row.style.transform = `translate(${dx}px, ${dy}px) scale(${scale})`;

    const tagline = row.parentElement?.querySelector('.tagline') as HTMLElement | null;
    const taglineTarget = document.getElementById('site-tagline');

    if (tagline && taglineTarget) {
      const tStart = tagline.getBoundingClientRect();
      const tEnd = taglineTarget.getBoundingClientRect();

      const tScale = tEnd.width / tStart.width;
      const tdx = tEnd.left + tEnd.width / 2 - (tStart.left + tStart.width / 2);
      const tdy = tEnd.top + tEnd.height / 2 - (tStart.top + tStart.height / 2);

      tagline.style.transformOrigin = 'center center';
      tagline.style.transition = 'transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
      tagline.style.transform = `translate(${tdx}px, ${tdy}px) scale(${tScale})`;
    } else if (tagline) {
      // fallback
      tagline.style.transition = 'opacity 0.8s ease';
      tagline.style.opacity = '0';
    }

    const onEnd = () => {
      if (overlayRef.current) {
        overlayRef.current.style.transition = 'opacity 0.35s ease';
        overlayRef.current.style.opacity = '0';
        overlayRef.current.style.pointerEvents = 'none';
      }
      setTimeout(() => {
        document.body.style.overflow = '';
        setPhase('done');
      }, 350);
    };

    row.addEventListener('transitionend', onEnd, { once: true });
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#fff',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div ref={rowRef} style={{ display: 'flex', alignItems: 'center', height: rowH, gap: 0 }}
           className={phase === 'flying' ? '' : undefined}>
        <div
          ref={revealRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            opacity: 0,
            width: 0,
            gap: iconTechGap,
            transition: 'width 1.1s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
          }}
          className="reveal-left-el"
        >
          <Piece box={icon} bgW={bgW} bgH={bgH} />
          <Piece box={tech} bgW={bgW} bgH={bgH} />
        </div>
        <div style={{ width: techFourGap, flexShrink: 0 }} />
        <Piece box={four} bgW={bgW} bgH={bgH} />
      </div>
      <div
        className="piece tagline"
        style={{
          width: tag.w,
          height: tag.h,
          marginTop: tagMarginTop,
          backgroundImage: "url('/logo/tech4-logo.png')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${bgW}px ${bgH}px`,
          backgroundPosition: `${tag.bgX}px ${tag.bgY}px`,
          opacity: 0,
          transition: 'opacity 0.8s ease 0.4s',
        }}
      />
      <RevealTrigger revealRef={revealRef} />
    </div>
  );
}

function Piece({ box, bgW, bgH }: { box: { w: number; h: number; bgX: number; bgY: number }; bgW: number; bgH: number }) {
  return (
    <div
      className="piece"
      style={{
        width: box.w,
        height: box.h,
        flexShrink: 0,
        backgroundImage: "url('/logo/tech4-logo.png')",
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${box.bgX}px ${box.bgY}px`,
      }}
    />
  );
}

function RevealTrigger({ revealRef }: { revealRef: React.RefObject<HTMLDivElement | null> }) {
  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const timer = setTimeout(() => {
      el.style.opacity = '1';
      const tagEl = document.querySelector('.piece.tagline') as HTMLElement | null;
      if (tagEl) tagEl.style.opacity = '1';
    }, 520);
    return () => clearTimeout(timer);
  }, [revealRef]);
  return null;
}
