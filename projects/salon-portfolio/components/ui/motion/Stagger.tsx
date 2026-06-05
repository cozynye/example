'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

interface StaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}

// 자식(StaggerItem)을 순차 등장시키는 컨테이너.
// 자식 내부 콘텐츠는 server 컴포넌트 가능 (variants는 StaggerItem이 보유).
export default function Stagger({ children, className, stagger = 0.12, delay = 0.1 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
