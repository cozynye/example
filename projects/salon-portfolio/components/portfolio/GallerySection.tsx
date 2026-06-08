'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Section from '../ui/Section';
import Container from '../ui/Container';
import type { GallerySection as GalleryData, LayoutVariant } from '@/lib/data/types';
import { isDarkLayout, getTextColors, getHeadingClass, getSectionBackground } from '@/lib/layout-styles';
import { KineticScroll } from '../ui/motion';

interface GallerySectionProps {
  data: GalleryData;
  layoutVariant?: LayoutVariant;
  theme?: string; // 같은 variant 쌍둥이 분리용 (fullscreen: luxury↔bold, layered: soft↔earth)
}

export default function GallerySection({ data, layoutVariant = 'classic', theme }: GallerySectionProps) {
  const variant = layoutVariant;
  // categories[0]을 "전체 보기" sentinel로 사용 — 라벨이 '전체'든 'ALL'이든 동작.
  // (직접 '전체' 리터럴에 의존하면 영문 카테고리 포트폴리오에서 ALL 클릭 시 0장 매칭 버그 발생)
  const allLabel = data.categories[0] ?? '전체';
  const [activeCategory, setActiveCategory] = useState(allLabel);
  const dark = isDarkLayout(variant);
  const text = getTextColors(variant);

  const filteredImages =
    activeCategory === allLabel
      ? data.images
      : data.images.filter((img) => img.category === activeCategory);

  // 그리드 컨테이너 클래스 (8종)
  const getGridClass = () => {
    switch (variant) {
      case 'magazine':
        return 'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'; // Masonry
      case 'minimal':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8'; // 큰 2열
      case 'card':
        return 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'; // Bento
      case 'organic':
        return 'columns-2 lg:columns-3 gap-5 space-y-5'; // 비대칭 masonry
      case 'fullscreen':
        // P9(bold)는 빽빽한 모자이크, P7(luxury)는 대형 풀블리드 2열
        return theme === 'bold'
          ? 'grid grid-cols-2 md:grid-cols-4 gap-1.5'
          : 'grid grid-cols-1 md:grid-cols-2 gap-2';
      case 'layered':
        // P10(earth)은 자연스러운 masonry, P8(soft)은 오프셋 그리드
        return theme === 'earth'
          ? 'columns-2 lg:columns-3 gap-3 space-y-3'
          : 'grid grid-cols-2 md:grid-cols-3 gap-6';
      case 'typography':
        return 'grid grid-cols-2 md:grid-cols-4 gap-3'; // 작은 타일, 텍스트 우선
      case 'showcase':
        return 'grid grid-cols-1 md:grid-cols-2 gap-6'; // Apple 큰 2열
      case 'aurora':
        return 'grid grid-cols-2 md:grid-cols-3 gap-4'; // 글래스 그리드
      case 'editorial':
        return 'columns-2 md:columns-3 gap-4 space-y-4'; // 잡지 masonry
      case 'noir':
        return 'grid grid-cols-2 md:grid-cols-4 gap-2'; // 빽빽한 흑백 그리드
      case 'kinetic':
        return 'grid grid-cols-2 md:grid-cols-5 gap-3'; // 다이내믹 작은 타일
      default:
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'; // Classic 3열
    }
  };

  // 개별 타일 클래스 (aspect/radius/오프셋)
  const getTileClass = (idx: number) => {
    const base = 'group relative overflow-hidden rounded-[var(--radius-lg)]';
    switch (variant) {
      case 'magazine':
        return `${base} break-inside-avoid aspect-[3/4]`;
      case 'organic':
        return `${base} break-inside-avoid ${idx % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'} ${
          idx % 2 === 0 ? 'rounded-tr-[60px]' : 'rounded-bl-[60px]'
        }`;
      case 'card':
        return `${base} aspect-square ${idx % 7 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`;
      case 'fullscreen':
        // bold=정사각 모자이크 / luxury=시네마틱 와이드
        return theme === 'bold' ? `${base} aspect-square` : `${base} aspect-[16/10]`;
      case 'layered':
        // earth=masonry 가변 높이 / soft=오프셋 그리드
        return theme === 'earth'
          ? `${base} break-inside-avoid ${idx % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`
          : `${base} aspect-[3/4] ${idx % 2 === 1 ? 'md:translate-y-8' : ''}`;
      case 'typography':
        return `${base} aspect-square`;
      case 'minimal':
        return `${base} aspect-[4/3]`;
      case 'showcase':
        return `${base} aspect-[4/3]`;
      case 'aurora':
        return `${base} aspect-square border border-white/10`;
      case 'editorial':
        return `${base} break-inside-avoid ${idx % 3 === 0 ? 'aspect-[3/4]' : 'aspect-square'}`;
      case 'noir':
        return `${base} aspect-square grayscale transition-all duration-500 hover:grayscale-0`;
      case 'kinetic':
        return `${base} aspect-square`;
      default:
        return `${base} aspect-[3/4]`;
    }
  };

  // Kinetic — 세로 스크롤을 가로 이동으로 (필터 없이 가로 스크롤 갤러리)
  if (variant === 'kinetic') {
    return (
      <section id="gallery" className="bg-white">
        <Container maxWidth="wide">
          <h2 className={`${getHeadingClass(variant)} text-center pt-20 mb-2 ${text.heading}`}>{data.title}</h2>
          <p className="text-center text-sm tracking-[0.3em] uppercase text-[var(--color-primary)] mb-4">Scroll →</p>
        </Container>
        <KineticScroll end="-70%">
          {data.images.map((image) => (
            <div
              key={image.id}
              className="group relative w-[260px] md:w-[360px] aspect-[3/4] flex-shrink-0 overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="360px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm font-semibold">{image.alt}</p>
              </div>
            </div>
          ))}
        </KineticScroll>
      </section>
    );
  }

  const stickyBg = dark ? 'bg-black/80' : 'bg-white/95';
  const filterInactive = dark
    ? 'bg-white/10 text-white hover:bg-white/20'
    : 'bg-[var(--color-light-gray)] text-[var(--color-text-primary)] hover:bg-[var(--color-text-secondary)] hover:text-white';

  return (
    <Section id="gallery" background={getSectionBackground(variant)}>
      <Container maxWidth="wide">
        <h2 className={`${getHeadingClass(variant)} text-center mb-12 ${text.heading}`}>{data.title}</h2>

        {/* Category Filter - Sticky */}
        <div className={`sticky top-0 z-20 ${stickyBg} backdrop-blur-md py-4 -mx-6 px-6 mb-8`}>
          <div className="flex flex-wrap justify-center gap-3">
            {data.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                  activeCategory === category ? 'bg-[var(--color-primary)] text-white' : filterInactive
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className={getGridClass()}>
          {filteredImages.map((image, idx) => (
            <div key={image.id} className={getTileClass(idx)}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
