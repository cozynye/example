'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';

// aurora: 마우스를 따라다니는 네온 글로우.
// 초기값 0,0 (SSR=CSR 동일 → hydration mismatch 없음).
// 마우스 진입 전·터치 기기에서는 opacity 0으로 숨겨 좌상단 고정 글로우를 방지.
export default function GlowField({ className }: { className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 60, damping: 20 });
  const sy = useSpring(y, { stiffness: 60, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const prefersReduced = useReducedMotion();

  // 장식용 마우스 추적 글로우 — 모션 최소화 선호 시 비활성(움직이는 요소 제거).
  if (prefersReduced) return null;

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    if (!active) setActive(true);
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className={`absolute inset-0 overflow-hidden ${className ?? ''}`}>
      <motion.div
        className="pointer-events-none absolute h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-500"
        style={{
          left: sx,
          top: sy,
          opacity: active ? 0.6 : 0,
          background:
            'radial-gradient(circle, var(--color-glow-1, rgba(124,111,240,0.5)) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
