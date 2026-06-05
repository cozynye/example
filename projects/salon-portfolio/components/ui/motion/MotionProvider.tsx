'use client';

import { MotionConfig } from 'motion/react';
import type { ReactNode } from 'react';

// prefers-reduced-motion 사용자에게 모션 자동 비활성 (접근성)
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
