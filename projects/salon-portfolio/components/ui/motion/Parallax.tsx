'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import type { ReactNode } from 'react';

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  offset?: number; // 스크롤에 따른 y 이동 폭(px)
}

// 스크롤 연동 패럴랙스. children은 server 컴포넌트 가능.
export default function Parallax({ children, className, offset = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
