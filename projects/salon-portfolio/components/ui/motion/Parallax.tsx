'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  offset?: number; // 스크롤에 따른 y 이동 폭(px)
}

// 스크롤 연동 패럴랙스. children은 server 컴포넌트 가능.
export default function Parallax({ children, className, offset = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  // 모션 최소화 선호 시 패럴랙스 비활성 — useTransform은 inline transform을 직접 구동해
  // CSS prefers-reduced-motion 블록으로는 멈추지 않으므로 JS에서 가드한다.
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
