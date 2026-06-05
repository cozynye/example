import React from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Button from '../ui/Button';
import type { ContactSection as ContactData, LayoutVariant } from '@/lib/data/types';
import {
  getLayoutFamily,
  isDarkLayout,
  getSectionBackground,
  getTextColors,
  getHeadingClass,
} from '@/lib/layout-styles';
import { Reveal } from '../ui/motion';

interface ContactSectionProps {
  data: ContactData;
  layoutVariant?: LayoutVariant;
}

const InstagramSvg = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const FacebookSvg = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const YoutubeSvg = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function ContactSection({ data, layoutVariant = 'classic' }: ContactSectionProps) {
  const variant = layoutVariant;
  const family = getLayoutFamily(variant);
  const text = getTextColors(variant);
  const heading = getHeadingClass(variant);
  const dark = isDarkLayout(variant);

  const accentColor = dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary)]';
  const socialBtnClass = dark
    ? 'bg-white/10 text-white hover:bg-white hover:text-black'
    : 'bg-[var(--color-primary)] text-white hover:opacity-80';

  const mapBlock = (
    <div className="h-[400px] md:h-[500px] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-md)]">
      <iframe
        src={data.mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );

  const renderSocial = (center = false) =>
    data.social ? (
      <div>
        <h3 className={`text-xl font-bold mb-4 ${text.heading}`}>SNS</h3>
        <div className={`flex gap-4 ${center ? 'justify-center' : ''}`}>
          {data.social.instagram && (
            <a href={data.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${socialBtnClass}`}>
              <InstagramSvg />
            </a>
          )}
          {data.social.facebook && (
            <a href={data.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${socialBtnClass}`}>
              <FacebookSvg />
            </a>
          )}
          {data.social.youtube && (
            <a href={data.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${socialBtnClass}`}>
              <YoutubeSvg />
            </a>
          )}
        </div>
      </div>
    ) : null;

  const renderDetails = (center = false, bigPhone = false) => (
    <div className={`space-y-8 ${center ? 'text-center' : ''}`}>
      <div>
        <h3 className={`text-xl font-bold mb-4 ${text.heading}`}>주소</h3>
        <p className={`text-lg leading-relaxed ${text.body}`}>{data.address}</p>
        <Button href={data.mapUrl} variant="ghost" size="small" className="mt-3">
          지도에서 보기 →
        </Button>
      </div>
      <div>
        <h3 className={`text-xl font-bold mb-4 ${text.heading}`}>전화</h3>
        <a
          href={`tel:${data.phone.replace(/-/g, '')}`}
          className={`font-bold hover:underline ${accentColor} ${bigPhone ? 'text-4xl md:text-5xl' : 'text-2xl'}`}
        >
          {data.phone}
        </a>
      </div>
      {data.email && (
        <div>
          <h3 className={`text-xl font-bold mb-4 ${text.heading}`}>이메일</h3>
          <a href={`mailto:${data.email}`} className={`text-lg hover:underline ${accentColor}`}>
            {data.email}
          </a>
        </div>
      )}
      <div className={center ? 'flex justify-center' : ''}>{renderSocial(center)}</div>
      <div className={`pt-8 ${center ? 'flex justify-center' : ''}`}>
        <Button href={`tel:${data.phone.replace(/-/g, '')}`} size="large">
          전화로 예약하기
        </Button>
      </div>
    </div>
  );

  // ===== glass (aurora) / luxe (noir): 다크 2단 =====
  if (family === 'glass' || family === 'luxe') {
    const isGlass = family === 'glass';
    return (
      <section id="contact" className={`${isGlass ? 'aurora-bg' : 'bg-black grain-overlay'} py-24 md:py-32`}>
        <Container className="relative z-10">
          <Reveal>
            <h2 className={`${heading} mb-16 text-center text-white`}>{data.title}</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <Reveal>{mapBlock}</Reveal>
            <Reveal delay={0.1}>{renderDetails()}</Reveal>
          </div>
        </Container>
      </section>
    );
  }

  // ===== centered (minimal, typography): 지도 위 + 연락처 중앙 =====
  if (family === 'centered') {
    return (
      <Section id="contact" background={getSectionBackground(variant)}>
        <Container maxWidth="narrow">
          <h2 className={`${heading} mb-12 text-center ${text.heading}`}>{data.title}</h2>
          {mapBlock}
          <div className="mt-12">{renderDetails(true, variant === 'typography')}</div>
        </Container>
      </Section>
    );
  }

  // ===== overlay (fullscreen): 어두운 배경 2단 =====
  if (family === 'overlay') {
    return (
      <section id="contact" className="bg-[var(--color-almost-black)] py-20 md:py-[80px]">
        <Container>
          <h2 className={`${heading} mb-16 text-center text-white`}>{data.title}</h2>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {mapBlock}
            {renderDetails()}
          </div>
        </Container>
      </section>
    );
  }

  // ===== split + card: 지도 | 연락처 2단 =====
  return (
    <Section id="contact" background={getSectionBackground(variant)}>
      <Container>
        <h2 className={`${heading} mb-16 ${variant === 'classic' ? 'text-center' : 'text-left'} ${text.heading}`}>
          {data.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {mapBlock}
          {renderDetails()}
        </div>
      </Container>
    </Section>
  );
}
