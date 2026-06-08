import React from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Button from '../ui/Button';
import type { ServicesSection as ServicesData, LayoutVariant } from '@/lib/data/types';
import {
  getLayoutFamily,
  isDarkLayout,
  getSectionBackground,
  getTextColors,
  getHeadingClass,
  getCardClass,
} from '@/lib/layout-styles';
import { Reveal, Stagger, StaggerItem } from '../ui/motion';

interface ServicesSectionProps {
  data: ServicesData;
  layoutVariant?: LayoutVariant;
}

type ServiceCategory = ServicesData['services'][number];

export default function ServicesSection({ data, layoutVariant = 'classic' }: ServicesSectionProps) {
  const variant = layoutVariant;
  const family = getLayoutFamily(variant);
  const text = getTextColors(variant);
  const heading = getHeadingClass(variant);
  const dark = isDarkLayout(variant);

  const itemBorder = dark ? 'border-white/15' : 'border-[var(--color-light-gray)]';
  const priceColor = dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary-dark)]';

  // 가격 항목 리스트 공통
  const renderItems = (items: ServiceCategory['items']) => (
    <ul className="space-y-4">
      {items.map((item, idx) => (
        <li key={idx} className={`flex justify-between items-start pb-4 border-b ${itemBorder} last:border-0`}>
          <div className="flex-1">
            <div className={`font-semibold ${text.heading}`}>{item.name}</div>
            {item.description && <div className={`text-sm mt-1 ${text.muted}`}>{item.description}</div>}
          </div>
          <div className={`font-bold ml-4 ${priceColor}`}>{item.price}</div>
        </li>
      ))}
    </ul>
  );

  const ctaButton = (
    <div className="text-center mt-12">
      <Button href="#contact" size="large">
        예약 문의하기
      </Button>
    </div>
  );

  // ===== glass (aurora): 글래스 카드 + 스태거 =====
  if (family === 'glass') {
    return (
      <section id="services" className="aurora-bg py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className={`${heading} mb-16 text-center text-white`}>{data.title}</h2>
          </Reveal>
          <Stagger className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {data.services.map((category, i) => (
              <StaggerItem
                key={i}
                className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-[var(--radius-xl)] p-8"
              >
                <h3 className="text-2xl font-bold mb-6 text-[var(--color-accent)]">{category.category}</h3>
                {renderItems(category.items)}
              </StaggerItem>
            ))}
          </Stagger>
          {ctaButton}
        </Container>
      </section>
    );
  }

  // ===== luxe (noir): 시네마틱 메뉴판 =====
  if (family === 'luxe') {
    return (
      <section id="services" className="bg-black grain-overlay py-24 md:py-32">
        <Container className="relative z-10">
          <Reveal>
            <h2 className={`${heading} mb-16 text-center text-white`}>{data.title}</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
            {data.services.map((category, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <h3 className="text-2xl font-serif mb-6 pb-3 border-b border-[var(--color-accent)]/40 text-[var(--color-accent)]">
                  {category.category}
                </h3>
                {renderItems(category.items)}
              </Reveal>
            ))}
          </div>
          {ctaButton}
        </Container>
      </section>
    );
  }

  // ===== overlay (fullscreen): 어두운 럭셔리 메뉴판 =====
  if (family === 'overlay') {
    return (
      <section id="services" className="bg-[var(--color-almost-black)] py-20 md:py-[80px]">
        <Container>
          <h2 className={`${heading} mb-16 text-center text-white`}>{data.title}</h2>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
            {data.services.map((category, i) => (
              <div key={i}>
                <h3 className="text-2xl font-serif mb-6 pb-3 border-b border-[var(--color-accent)]/40 text-[var(--color-accent)]">
                  {category.category}
                </h3>
                {renderItems(category.items)}
              </div>
            ))}
          </div>
          {ctaButton}
        </Container>
      </section>
    );
  }

  // ===== centered (minimal, typography): 1열 중앙 =====
  if (family === 'centered') {
    return (
      <Section id="services" background={getSectionBackground(variant)}>
        <Container maxWidth="narrow">
          <h2 className={`${heading} mb-16 text-center ${text.heading}`}>{data.title}</h2>
          <div className="space-y-14">
            {data.services.map((category, i) => (
              <div key={i}>
                <h3
                  className={`mb-6 text-center ${text.heading} ${
                    variant === 'typography'
                      ? 'text-3xl md:text-5xl font-black uppercase tracking-tight'
                      : 'text-2xl font-light tracking-[0.1em]'
                  }`}
                >
                  {category.category}
                </h3>
                {renderItems(category.items)}
              </div>
            ))}
          </div>
          {ctaButton}
        </Container>
      </Section>
    );
  }

  // ===== card: 컬러 상단 보더 카드 =====
  if (family === 'card') {
    const accents = [
      'border-t-[var(--color-primary)]',
      'border-t-[var(--color-secondary)]',
      'border-t-[var(--color-accent)]',
    ];
    return (
      <Section id="services" background={getSectionBackground(variant)}>
        <Container>
          <h2 className={`${heading} mb-12 text-center ${text.heading}`}>{data.title}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.services.map((category, i) => (
              <div
                key={i}
                className={`bg-white rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-lg)] border-t-4 ${accents[i % accents.length]}`}
              >
                <h3 className="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">{category.category}</h3>
                {renderItems(category.items)}
              </div>
            ))}
          </div>
          {ctaButton}
        </Container>
      </Section>
    );
  }

  // ===== split (magazine, classic, organic, layered): 2단 카드 그리드 =====
  return (
    <Section id="services" background={getSectionBackground(variant, 'gray')}>
      <Container>
        <h2 className={`${heading} mb-16 ${variant === 'classic' ? 'text-center' : 'text-left'} ${text.heading}`}>
          {data.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.services.map((category, i) => (
            <div key={i} className={`${getCardClass(variant)} p-8`}>
              {variant === 'magazine' && (
                <span className="block text-4xl font-black text-[var(--color-primary-dark)] opacity-20 leading-none mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
              <h3 className="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">{category.category}</h3>
              {renderItems(category.items)}
            </div>
          ))}
        </div>
        {ctaButton}
      </Container>
    </Section>
  );
}
