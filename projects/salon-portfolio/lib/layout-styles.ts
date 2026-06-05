// 레이아웃 변형(LayoutVariant)별 시각 스타일 단일 진실 공급원(SSOT)
//
// ⚠️ 순수 함수/상수만 둔다. React 훅·브라우저 API 금지.
//    server 섹션(About/Stylist/Services/Hours/Contact)과
//    client 섹션(Gallery)이 모두 import 하므로 'use client'가 붙으면 안 된다.

import type { LayoutVariant } from './data/types';

// ============================================
// 레이아웃 패밀리 (구조 골격 그룹)
// ============================================

export type LayoutFamily = 'split' | 'centered' | 'card' | 'overlay' | 'glass' | 'luxe';

const FAMILY_MAP: Record<LayoutVariant, LayoutFamily> = {
  magazine: 'split', // 좌우 split + 넘버링 + order 교차
  classic: 'split', // 좌우 2단 (대조군, 둥근 모서리·제목 중앙)
  organic: 'split', // 좌우 split + 곡선 오프셋
  layered: 'split', // 좌우 split + 겹침
  minimal: 'centered', // 중앙 + 얇은 폰트 + 구분선
  typography: 'centered', // 검은 배경 + 거대 타이포
  card: 'card', // bento 컬러블록 타일
  fullscreen: 'overlay', // 이미지 풀블리드 + 오버레이
  // --- 프리미엄 라인 (11~15) ---
  showcase: 'centered', // Apple 미니멀
  aurora: 'glass', // 다크 글래스
  editorial: 'split', // 잡지풍 비대칭
  noir: 'luxe', // 모노크롬 럭셔리
  kinetic: 'centered', // 키네틱 타이포
};

export function getLayoutFamily(variant: LayoutVariant): LayoutFamily {
  return FAMILY_MAP[variant] ?? 'centered';
}

// ============================================
// 다크 배경 여부 (텍스트 색 결정의 기준)
// ============================================

// typography(검은 배경), fullscreen(어두운 오버레이)은 흰 텍스트가 필요하다.
export function isDarkLayout(variant: LayoutVariant): boolean {
  return (
    variant === 'typography' ||
    variant === 'fullscreen' ||
    variant === 'aurora' ||
    variant === 'noir'
  );
}

// Section 컴포넌트에 넘길 background prop
export function getSectionBackground(
  variant: LayoutVariant,
  fallback: 'white' | 'gray' = 'white'
): 'white' | 'gray' | 'dark' {
  if (variant === 'typography' || variant === 'aurora' || variant === 'noir') return 'dark';
  if (variant === 'card' || variant === 'organic' || variant === 'showcase') return 'gray';
  return fallback;
}

// ============================================
// 텍스트 색 (다크/라이트 분기)
// ============================================

export interface TextColors {
  heading: string;
  body: string;
  muted: string;
}

export function getTextColors(variant: LayoutVariant): TextColors {
  if (isDarkLayout(variant)) {
    return {
      heading: 'text-white',
      body: 'text-white/80',
      muted: 'text-white/60',
    };
  }
  return {
    heading: 'text-[var(--color-text-primary)]',
    body: 'text-[var(--color-text-secondary)]',
    muted: 'text-[var(--color-text-secondary)]',
  };
}

// ============================================
// 섹션 제목 스타일 (variant별 무게/크기/정렬)
// ============================================

// 폰트 무게/크기/자간만. 정렬·색은 섹션이 맥락에 맞게 더한다.
const HEADING_MAP: Record<LayoutVariant, string> = {
  magazine: 'text-4xl md:text-6xl font-bold tracking-tight',
  classic: 'text-4xl md:text-5xl font-bold',
  organic: 'text-4xl md:text-5xl font-medium',
  layered: 'text-4xl md:text-6xl font-bold',
  minimal: 'text-3xl md:text-5xl font-light tracking-[0.05em]',
  typography: 'text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase',
  card: 'text-4xl md:text-5xl font-bold',
  fullscreen: 'text-5xl md:text-6xl font-serif font-light',
  // --- 프리미엄 라인 ---
  showcase: 'text-5xl md:text-7xl font-semibold tracking-[-0.03em]',
  aurora: 'text-4xl md:text-6xl font-semibold tracking-tight',
  editorial: 'text-5xl md:text-8xl font-black tracking-[-0.04em] leading-[0.95]',
  noir: 'text-5xl md:text-7xl font-serif font-light tracking-[0.1em]',
  kinetic: 'text-6xl md:text-[8rem] font-black uppercase leading-[0.85] tracking-tighter',
};

export function getHeadingClass(variant: LayoutVariant): string {
  return HEADING_MAP[variant] ?? HEADING_MAP.classic;
}

// ============================================
// 카드 표면 (배경/그림자/radius)
// minimal·typography·fullscreen은 면이 없다(빈 문자열).
// ============================================

const CARD_SURFACE_MAP: Record<LayoutVariant, string> = {
  magazine: 'bg-white',
  organic: 'bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]',
  layered: 'bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-xl)]',
  minimal: '', // 면 없음, 구분선만
  classic: 'bg-white rounded-[var(--radius-xl)] shadow-[var(--shadow-md)]',
  typography: 'border border-white/15',
  card: 'rounded-[var(--radius-xl)] shadow-[var(--shadow-lg)]',
  fullscreen: 'bg-white/10 backdrop-blur-md rounded-[var(--radius-lg)]',
  // --- 프리미엄 라인 ---
  showcase: 'bg-[var(--color-light-gray)] rounded-[var(--radius-xl)]',
  aurora:
    'bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-[var(--radius-xl)] shadow-[0_8px_40px_rgba(0,0,0,0.4)]',
  editorial: '',
  noir: 'bg-white/[0.03] border border-[var(--color-accent)]/25',
  kinetic: '',
};

export function getCardClass(variant: LayoutVariant): string {
  return CARD_SURFACE_MAP[variant] ?? CARD_SURFACE_MAP.classic;
}

// minimal 계열에서 항목 구분에 쓰는 hairline
export function getDividerClass(variant: LayoutVariant): string {
  if (variant === 'minimal') return 'border-t border-[var(--color-text-tertiary)]';
  if (isDarkLayout(variant)) return 'border-t border-white/15';
  return 'border-t border-[var(--color-light-gray)]';
}

// ============================================
// split 계열 보조 (magazine / organic / layered)
// ============================================

// 섹션 인덱스에 따라 이미지를 좌/우 교차 배치 (magazine 잡지 느낌)
export function getSplitOrderClass(
  variant: LayoutVariant,
  sectionIndex: number
): { image: string; content: string } {
  if (variant !== 'magazine') {
    return { image: '', content: '' };
  }
  const imageFirst = sectionIndex % 2 === 0;
  return imageFirst
    ? { image: 'md:order-1', content: 'md:order-2' }
    : { image: 'md:order-2', content: 'md:order-1' };
}

// split 계열의 이미지 래퍼 모서리/오프셋 (organic=곡선, layered=겹침)
export function getSplitImageClass(variant: LayoutVariant): string {
  switch (variant) {
    case 'organic':
      return 'rounded-[var(--radius-xl)] rounded-tr-[120px] md:rotate-[-1.5deg]';
    case 'layered':
      return 'rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] md:translate-y-6';
    case 'magazine':
      return ''; // 각진 풀블리드
    default:
      return 'rounded-[var(--radius-xl)]';
  }
}

// layered 전용: 콘텐츠 카드가 이미지를 겹쳐 덮는 음수 마진
export function getLayeredContentClass(variant: LayoutVariant): string {
  return variant === 'layered' ? 'md:-ml-16 md:mt-12 relative z-10' : '';
}

// ============================================
// 프리미엄 라인 보조 (showcase/aurora/editorial/noir/kinetic)
// ============================================

// aurora: 다크 그라데이션 배경 클래스 (globals.css의 .aurora-bg)
export function getGlowClass(variant: LayoutVariant): string {
  return variant === 'aurora' ? 'aurora-bg' : '';
}

// noir: 그레인 오버레이 클래스 (globals.css의 .grain-overlay)
export function getGrainClass(variant: LayoutVariant): string {
  return variant === 'noir' ? 'grain-overlay' : '';
}

// editorial: 거대 인덱스 넘버 스타일
export function getIndexNumberClass(): string {
  return 'text-[5rem] md:text-[9rem] font-black leading-none text-[var(--color-primary)]/10 select-none';
}
