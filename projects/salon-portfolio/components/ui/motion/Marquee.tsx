'use client';

import { motion, useReducedMotion } from 'motion/react';

interface MarqueeProps {
  text: string;
  className?: string;
  duration?: number;
  reverse?: boolean;
}

// 무한 가로 흐름 텍스트 (editorial 마키). 순수 장식이므로 aria-hidden.
// reduced-motion 선호 시 정지 (JS 애니메이션은 CSS fallback이 안 먹으므로 직접 처리).
export default function Marquee({ text, className, duration = 22, reverse = false }: MarqueeProps) {
  const reduced = useReducedMotion();
  return (
    <div aria-hidden="true" className={`overflow-hidden whitespace-nowrap ${className ?? ''}`}>
      <motion.div
        className="inline-flex"
        animate={reduced ? undefined : { x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={reduced ? undefined : { duration, ease: 'linear', repeat: Infinity }}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="px-8">
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
