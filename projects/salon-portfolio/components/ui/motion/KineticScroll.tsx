'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], ['2%', end]);
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
