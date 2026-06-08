import React from 'react';
import Image from 'next/image';
import Section from '../ui/Section';
import Container from '../ui/Container';
import type { StylistSection as StylistData, LayoutVariant } from '@/lib/data/types';
import {
  getLayoutFamily,
  isDarkLayout,
  getSectionBackground,
  getTextColors,
  getHeadingClass,
  getSplitOrderClass,
  getSplitImageClass,
} from '@/lib/layout-styles';
import { Reveal } from '../ui/motion';

interface StylistSectionProps {
  data: StylistData;
  layoutVariant?: LayoutVariant;
}

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

type Stylist = StylistData['stylists'][number];

export default function StylistSection({ data, layoutVariant = 'classic' }: StylistSectionProps) {
  const variant = layoutVariant;
  const family = getLayoutFamily(variant);
  const text = getTextColors(variant);
  const heading = getHeadingClass(variant);
  const dark = isDarkLayout(variant);

  const chipClass = dark
    ? 'bg-white/10 text-white'
    : 'bg-[var(--color-light-gray)] text-[var(--color-text-primary)]';
  const roleClass = dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary-dark)]';

  const renderSpecialties = (stylist: Stylist, center = false) => (
    <div className="mb-6">
      <h4 className={`text-sm font-semibold mb-3 ${text.muted}`}>전문 분야</h4>
      <div className={`flex flex-wrap gap-2 ${center ? 'justify-center' : ''}`}>
        {stylist.specialties.map((s, i) => (
          <span key={i} className={`px-4 py-2 text-sm rounded-full ${chipClass}`}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );

  const renderList = (title: string, items: string[] | undefined, marker: string, markerColor: string) =>
    items && items.length > 0 ? (
      <div className="mb-6 last:mb-0">
        <h4 className={`text-sm font-semibold mb-3 ${text.muted}`}>{title}</h4>
        <ul className="space-y-2">
          {items.map((item, i) => (
            <li key={i} className={`flex items-start ${text.body}`}>
              <span className={`mr-2 ${markerColor}`}>{marker}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const renderSocial = (stylist: Stylist) =>
    stylist.social?.instagram ? (
      <div className="flex gap-3 mt-4">
        <a
          href={stylist.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
            dark
              ? 'bg-white/10 text-white hover:bg-white hover:text-black'
              : 'bg-[var(--color-light-gray)] hover:bg-[var(--color-primary)] hover:text-white'
          }`}
        >
          <span className="sr-only">Instagram</span>
          <InstagramIcon />
        </a>
      </div>
    ) : null;

  // 이름/역할/경력 + specialties + education + awards (split·card 공통)
  const renderFullInfo = (stylist: Stylist, showName = true) => (
    <div>
      {showName && (
        <>
          <h3 className={`text-3xl font-bold mb-2 ${text.heading}`}>{stylist.name}</h3>
          <p className={`text-lg mb-1 ${roleClass}`}>{stylist.role}</p>
          <p className={`mb-6 ${text.muted}`}>{stylist.experience}</p>
        </>
      )}
      {renderSpecialties(stylist)}
      {renderList('교육', stylist.education, '•', 'text-[var(--color-primary)]')}
      {renderList('수상 이력', stylist.awards, '★', dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-accent)]')}
    </div>
  );

  // ===== glass (aurora): 다크 글래스 카드 =====
  if (family === 'glass') {
    return (
      <section id="stylist" className="aurora-bg py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className={`${heading} mb-12 text-center text-white`}>{data.title}</h2>
          </Reveal>
          <div className="space-y-8">
            {data.stylists.map((stylist, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="grid md:grid-cols-[280px,1fr] gap-8 items-center bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-[var(--radius-xl)] p-8 md:p-10">
                  <div className="relative aspect-square rounded-[var(--radius-lg)] overflow-hidden">
                    <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="280px" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{stylist.name}</h3>
                    <p className="text-[var(--color-accent)] mb-1">{stylist.role}</p>
                    <p className="text-white/60 mb-6">{stylist.experience}</p>
                    {renderSpecialties(stylist)}
                    {renderSocial(stylist)}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // ===== luxe (noir): 시네마틱 원형 흑백 =====
  if (family === 'luxe') {
    return (
      <section id="stylist" className="bg-black grain-overlay py-24 md:py-32">
        <Container maxWidth="narrow" className="relative z-10">
          <Reveal>
            <h2 className={`${heading} mb-16 text-center text-white`}>{data.title}</h2>
          </Reveal>
          <div className="space-y-16">
            {data.stylists.map((stylist, idx) => (
              <Reveal key={idx} className="text-center">
                <div className="relative w-44 h-44 md:w-52 md:h-52 mx-auto rounded-full overflow-hidden mb-8 grayscale border border-[var(--color-accent)]/30">
                  <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="13rem" />
                </div>
                <h3 className="text-4xl font-serif font-light tracking-wide text-white mb-2">{stylist.name}</h3>
                <p className="text-[var(--color-accent)] tracking-[0.2em] uppercase text-sm mb-1">{stylist.role}</p>
                <p className="text-white/50 mb-6">{stylist.experience}</p>
                {renderSpecialties(stylist, true)}
                <div className="flex justify-center">{renderSocial(stylist)}</div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // ===== overlay (fullscreen): 이미지 배경 + 하단 그라데이션 오버레이 =====
  if (family === 'overlay') {
    return (
      <section id="stylist" className="bg-[var(--color-almost-black)] py-20 md:py-[80px]">
        <Container>
          <h2 className={`${heading} mb-12 text-center text-white`}>{data.title}</h2>
          <div className="space-y-8">
            {data.stylists.map((stylist, idx) => (
              <div key={idx} className="relative min-h-[520px] overflow-hidden">
                <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white max-w-3xl">
                  <h3 className="text-4xl md:text-5xl font-serif font-light mb-2">{stylist.name}</h3>
                  <p className="text-xl text-[var(--color-accent)] mb-1">{stylist.role}</p>
                  <p className="text-white/70 mb-6">{stylist.experience}</p>
                  {renderSpecialties(stylist)}
                  {renderSocial(stylist)}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  // ===== centered (minimal, typography): 원형 이미지 중앙 + 간결 =====
  if (family === 'centered') {
    return (
      <Section id="stylist" background={getSectionBackground(variant)}>
        <Container maxWidth="narrow">
          <h2 className={`${heading} mb-16 text-center ${text.heading}`}>{data.title}</h2>
          <div className="space-y-16">
            {data.stylists.map((stylist, idx) => (
              <div key={idx} className="text-center">
                <div className="relative w-40 h-40 md:w-48 md:h-48 mx-auto rounded-full overflow-hidden mb-6">
                  <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="12rem" />
                </div>
                <h3
                  className={`mb-2 ${text.heading} ${
                    variant === 'typography'
                      ? 'text-4xl md:text-6xl font-black uppercase tracking-tight'
                      : 'text-3xl font-light'
                  }`}
                >
                  {stylist.name}
                </h3>
                <p className={`text-lg mb-1 ${roleClass}`}>{stylist.role}</p>
                <p className={`mb-6 ${text.muted}`}>{stylist.experience}</p>
                {renderSpecialties(stylist, true)}
                <div className="flex justify-center">{renderSocial(stylist)}</div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  // ===== card: 컬러 헤더 + 정보 =====
  if (family === 'card') {
    return (
      <Section id="stylist" background={getSectionBackground(variant)}>
        <Container>
          <h2 className={`${heading} mb-12 text-center ${text.heading}`}>{data.title}</h2>
          <div className="space-y-8">
            {data.stylists.map((stylist, idx) => (
              <div key={idx} className="bg-white rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-lg)]">
                <div className="bg-[var(--color-primary)] p-6 md:p-8 text-white flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold">{stylist.name}</h3>
                    <p className="opacity-90">
                      {stylist.role} · {stylist.experience}
                    </p>
                  </div>
                  {renderSocial(stylist)}
                </div>
                <div className="grid md:grid-cols-[280px,1fr] gap-6 lg:gap-8 p-6 md:p-8">
                  <div className="relative aspect-square rounded-[var(--radius-lg)] overflow-hidden">
                    <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="280px" />
                  </div>
                  {renderFullInfo(stylist, false)}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  // ===== split (magazine, classic, organic, layered) =====
  const imageClass = getSplitImageClass(variant);

  return (
    <Section id="stylist" background={getSectionBackground(variant, 'gray')}>
      <Container>
        <h2 className={`${heading} mb-16 ${variant === 'classic' ? 'text-center' : 'text-left'} ${text.heading}`}>
          {data.title}
        </h2>
        <div className="space-y-16">
          {data.stylists.map((stylist, idx) => {
            const order = getSplitOrderClass(variant, idx);
            const inner = (
              <div className="grid md:grid-cols-[300px,1fr] gap-8 lg:gap-12 items-start">
                <div className={`relative ${order.image}`}>
                  {variant === 'magazine' && (
                    <span className="block text-6xl font-black text-[var(--color-primary)] opacity-20 leading-none mb-2">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  )}
                  <div className={`relative w-full aspect-square overflow-hidden ${imageClass}`}>
                    <Image src={stylist.image} alt={stylist.name} fill className="object-cover" sizes="300px" />
                  </div>
                  {renderSocial(stylist)}
                </div>
                <div className={order.content}>{renderFullInfo(stylist)}</div>
              </div>
            );

            return variant === 'classic' ? (
              <div key={idx} className="bg-white rounded-[var(--radius-xl)] p-8 md:p-12 shadow-[var(--shadow-md)]">
                {inner}
              </div>
            ) : (
              <div key={idx}>{inner}</div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
