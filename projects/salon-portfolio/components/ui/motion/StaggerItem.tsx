'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';

// Stagger의 직접 자식. variants를 부모로부터 상속받아 순차 등장.
export default function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
