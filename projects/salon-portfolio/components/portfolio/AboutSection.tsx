import React from 'react';
import Image from 'next/image';
import Section from '../ui/Section';
import Container from '../ui/Container';
import type { AboutSection as AboutData, LayoutVariant } from '@/lib/data/types';
import {
  getLayoutFamily,
  isDarkLayout,
  getSectionBackground,
  getTextColors,
  getHeadingClass,
  getCardClass,
  getDividerClass,
  getSplitOrderClass,
  getSplitImageClass,
  getLayeredContentClass,
} from '@/lib/layout-styles';
import { Reveal } from '../ui/motion';

interface AboutSectionProps {
  data: AboutData;
  layoutVariant?: LayoutVariant;
  theme?: string; // overlay 쌍둥이(P7 luxury↔P9 bold) 분리용
}

export default function AboutSection({ data, layoutVariant = 'classic', theme }: AboutSectionProps) {
  const variant = layoutVariant;
  const family = getLayoutFamily(variant);
  const text = getTextColors(variant);
  const heading = getHeadingClass(variant);

  // description 문단 공통
  const renderDescription = (center = false) =>
    data.description.map((paragraph, i) => (
      <p key={i} className={center ? 'text-center' : ''}>
        {paragraph}
      </p>
    ));

  // stats 공통 (variant별 스타일)
  const renderStats = (center = false) => {
    if (!data.stats || data.stats.length === 0) return null;

    // card: 컬러블록 타일
    if (variant === 'card') {
      const blocks = [
        'bg-[var(--color-primary)]',
        'bg-[var(--color-secondary)]',
        'bg-[var(--color-accent)]',
      ];
      return (
        <div className="grid grid-cols-3 gap-4 mt-10">
          {data.stats.map((stat, i) => (
            <div
              key={i}
              className={`${blocks[i % 3]} rounded-[var(--radius-lg)] p-6 text-center text-white`}
            >
              <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-sm opacity-90 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      );
    }

    // minimal: hairline 구분선 + 얇은 폰트
    if (variant === 'minimal') {
      return (
        <div className={`flex flex-wrap justify-center gap-x-12 gap-y-6 mt-12 pt-10 ${getDividerClass(variant)}`}>
          {data.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className={`text-2xl md:text-3xl font-light ${text.heading}`}>{stat.value}</div>
              <div className={`text-xs tracking-[0.2em] uppercase mt-2 ${text.muted}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      );
    }

    // typography: 거대 숫자
    if (variant === 'typography') {
      return (
        <div className="grid grid-cols-3 gap-6 mt-14">
          {data.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-6xl font-black text-white leading-none">{stat.value}</div>
              <div className="text-xs tracking-[0.2em] uppercase mt-3 text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      );
    }

    // split / overlay 공통 (3칸)
    return (
      <div className={`grid grid-cols-3 gap-8 mt-8 pt-8 ${getDividerClass(variant)}`}>
        {data.stats.map((stat, i) => (
          <div key={i} className={center ? 'text-center' : ''}>
            <div
              className={`text-3xl md:text-4xl font-bold mb-2 ${
                isDarkLayout(variant) ? 'text-white' : 'text-[var(--color-primary)]'
              }`}
            >
              {stat.value}
            </div>
            <div className={`text-sm ${text.muted}`}>{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  // ===== glass (aurora): 다크 글래스 2단 =====
  if (family === 'glass') {
    return (
      <section id="about" className="aurora-bg py-24 md:py-32">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <Reveal>
              <h2 className={`${heading} mb-6 text-white`}>{data.title}</h2>
              <div className="space-y-4 text-lg text-white/70 leading-relaxed">{renderDescription()}</div>
              {renderStats()}
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] rounded-[var(--radius-xl)] overflow-hidden border border-white/10 shadow-[0_8px_50px_rgba(0,0,0,0.5)]">
                <Image src={data.image} alt={data.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    );
  }

  // ===== luxe (noir): 시네마틱 흑백 중앙 =====
  if (family === 'luxe') {
    return (
      <section id="about" className="bg-black grain-overlay py-24 md:py-32">
        <Container maxWidth="narrow" className="relative z-10">
          <Reveal className="text-center">
            <div className="w-12 h-px bg-[var(--color-accent)] mx-auto mb-8" />
            <h2 className={`${heading} mb-10 text-white`}>{data.title}</h2>
            <div className="space-y-5 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              {renderDescription(true)}
            </div>
            {renderStats(true)}
          </Reveal>
        </Container>
      </section>
    );
  }

  // ===== overlay (fullscreen): 풀블리드 이미지 — P7(luxury) 중앙 우아 vs P9(bold) 좌측 강렬 =====
  if (family === 'overlay') {
    const isBold = theme === 'bold';
    return (
      <section id="about" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src={data.image} alt={data.title} fill className={`object-cover ${isBold ? 'contrast-110' : ''}`} sizes="100vw" />
          <div className={`absolute inset-0 ${isBold ? 'bg-gradient-to-r from-black/85 via-black/55 to-black/30' : 'bg-black/60'}`} />
        </div>
        <Container maxWidth="narrow" className={`relative z-10 py-24 ${isBold ? 'text-left' : 'text-center'}`}>
          {isBold && <span className="block w-12 h-1.5 bg-[var(--color-primary)] mb-6" />}
          <h2 className={`${heading} mb-8 text-white`}>{data.title}</h2>
          <div className={`space-y-4 text-lg text-white/80 leading-relaxed max-w-2xl ${isBold ? '' : 'mx-auto'}`}>
            {renderDescription(!isBold)}
          </div>
          {renderStats(!isBold)}
        </Container>
      </section>
    );
  }

  // ===== centered (minimal, typography): 중앙 세로 스택 =====
  if (family === 'centered') {
    return (
      <Section id="about" background={getSectionBackground(variant)}>
        <Container maxWidth="narrow">
          <Reveal className="text-center">
            <h2 className={`${heading} mb-10 ${text.heading}`}>{data.title}</h2>
            {(variant === 'minimal' || variant === 'showcase') && (
              <div className="relative w-full max-w-md mx-auto aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden mb-10">
                <Image src={data.image} alt={data.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 28rem" />
              </div>
            )}
            <div
              className={`space-y-5 ${
                variant === 'typography' ? 'text-xl md:text-2xl' : 'text-lg'
              } ${text.body} leading-relaxed max-w-2xl mx-auto`}
            >
              {renderDescription(true)}
            </div>
            {renderStats(true)}
          </Reveal>
        </Container>
      </Section>
    );
  }

  // ===== card: 이미지 + 컬러블록 stats =====
  if (family === 'card') {
    return (
      <Section id="about" background={getSectionBackground(variant)}>
        <Container>
          <h2 className={`${heading} mb-12 text-center ${text.heading}`}>{data.title}</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)]">
              <Image src={data.image} alt={data.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
            <div className={`space-y-4 text-lg ${text.body} leading-relaxed`}>
              {renderDescription()}
            </div>
          </div>
          {renderStats()}
        </Container>
      </Section>
    );
  }

  // ===== split (magazine, classic, organic, layered): 좌우 2단 =====
  const order = getSplitOrderClass(variant, 0);
  const imageClass = getSplitImageClass(variant);
  const layeredContent = getLayeredContentClass(variant);
  const headingAlign = variant === 'classic' ? 'text-center md:text-left' : 'text-left';

  const contentInner = (
    <>
      <h2 className={`${heading} ${headingAlign} mb-8 ${text.heading}`}>{data.title}</h2>
      <div className={`space-y-4 text-lg ${text.body} leading-relaxed`}>
        {renderDescription()}
      </div>
      {renderStats()}
    </>
  );

  return (
    <Section id="about" background={getSectionBackground(variant)}>
      <Container>
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className={`relative ${order.image}`}>
            {variant === 'magazine' && (
              <span className="block text-7xl md:text-8xl font-black text-[var(--color-primary)] opacity-20 leading-none mb-2">
                01
              </span>
            )}
            <div className={`relative h-[400px] md:h-[500px] overflow-hidden ${imageClass}`}>
              <Image src={data.image} alt={data.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>

          {/* Content */}
          <div className={`${order.content} ${layeredContent}`}>
            {variant === 'layered' ? (
              <div className={`${getCardClass(variant)} p-8 md:p-10`}>{contentInner}</div>
            ) : (
              contentInner
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
