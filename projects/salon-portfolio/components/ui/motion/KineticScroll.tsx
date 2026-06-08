'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

interface KineticScrollProps {
  children: ReactNode;
  className?: string;
  end?: string; // 가로 이동 종료 위치 (기본 -65%)
}

// 세로 스크롤을 가로 이동으로 변환 (sticky + horizontal scroll).
// children은 가로로 늘어설 아이템들 (server 컴포넌트 가능).
export default function KineticScroll({ children, className, end = '-65%' }: KineticScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['2%', end]);
  // 모션 최소화 선호 시 스크롤재킹(세로→가로 변환) 대신 수동 가로 스크롤로 폴백.
  if (prefersReduced) {
    return (
      <div className={`overflow-x-auto ${className ?? ''}`}>
        <div className="flex gap-6 px-6 pb-6">{children}</div>
      </div>
    );
  }
  return (
    <div ref={ref} className={`relative h-[250vh] ${className ?? ''}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 will-change-transform">
          {children}
        </motion.div>
      </div>
    </div>
  );
}
