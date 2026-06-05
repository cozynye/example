import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import type { HeroSection as HeroData, LayoutVariant } from '@/lib/data/types';
import { Reveal, Parallax, GlowField, Marquee, Stagger, StaggerItem } from '../ui/motion';

interface HeroSectionProps {
  data: HeroData;
  layoutVariant?: LayoutVariant;
}

export default function HeroSection({ data, layoutVariant = 'classic' }: HeroSectionProps) {
  // Magazine Layout (Trendy - Portfolio 1)
  if (layoutVariant === 'magazine') {
    return (
      <section className="grid md:grid-cols-2 h-screen min-h-[600px]">
        <div className="relative order-2 md:order-1">
          <Image src={data.backgroundImage} alt={data.title} fill sizes="100vw" className="object-cover" priority quality={90} />
        </div>
        <div className="flex items-center justify-center p-8 md:p-12 order-1 md:order-2 bg-[var(--color-background)]">
          <div className="max-w-md">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-[var(--color-text)]">{data.title}</h1>
            <p className="text-xl md:text-2xl mb-8 text-[var(--color-text-secondary)]">{data.subtitle}</p>
            <div className="flex flex-col gap-4">
              <Button href={data.ctaButtons.primary.action} size="large">{data.ctaButtons.primary.text}</Button>
              <Button href={data.ctaButtons.secondary.action} variant="secondary" size="large">{data.ctaButtons.secondary.text}</Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Minimal Layout (Apple - Portfolio 2, 4)
  if (layoutVariant === 'minimal') {
    return (
      <section className="relative h-screen min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src={data.backgroundImage} alt={data.title} fill sizes="100vw" className="object-cover" priority quality={90} />
        </div>
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-light mb-6 text-[var(--color-text)]">{data.title}</h1>
          <p className="text-2xl md:text-3xl text-[var(--color-text-secondary)]">{data.subtitle}</p>
        </div>
      </section>
    );
  }

  // Typography Layout (Bold - Portfolio 9)
  if (layoutVariant === 'typography') {
    return (
      <section className="h-screen min-h-[600px] flex items-center justify-center bg-black text-white">
        <div className="text-center px-6 max-w-6xl mx-auto">
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-6 leading-none">{data.title}</h1>
          <p className="text-3xl md:text-4xl font-bold">{data.subtitle}</p>
        </div>
      </section>
    );
  }

  // Fullscreen Layout (Luxury - Portfolio 7)
  if (layoutVariant === 'fullscreen') {
    return (
      <section className="relative h-screen min-h-[600px]">
        <div className="absolute inset-0">
          <Image src={data.backgroundImage} alt={data.title} fill sizes="100vw" className="object-cover" priority quality={90} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-light mb-8">{data.title}</h1>
          <p className="text-2xl md:text-3xl mb-12 font-light tracking-wide">{data.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-6">
            <Button href={data.ctaButtons.primary.action} size="large" className="min-w-[200px]">{data.ctaButtons.primary.text}</Button>
            <Button href={data.ctaButtons.secondary.action} variant="secondary" size="large" className="!text-white !border-white hover:!bg-white/20 min-w-[200px]">{data.ctaButtons.secondary.text}</Button>
          </div>
        </div>
      </section>
    );
  }

  // Showcase (Apple 미니멀) — 라이트 + 스크롤 줌
  if (layoutVariant === 'showcase') {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--color-light-gray)] py-24">
        <Reveal className="text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-semibold tracking-[-0.04em] text-[var(--color-text-primary)] mb-6">
            {data.title}
          </h1>
          <p className="text-2xl md:text-3xl text-[var(--color-text-secondary)] mb-10">{data.subtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href={data.ctaButtons.primary.action} size="large">{data.ctaButtons.primary.text}</Button>
            <Button href={data.ctaButtons.secondary.action} variant="secondary" size="large">{data.ctaButtons.secondary.text}</Button>
          </div>
        </Reveal>
        <Parallax offset={50} className="w-full max-w-5xl mt-16 px-6">
          <div className="relative aspect-[16/9] rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-xl)]">
            <Image src={data.backgroundImage} alt={data.title} fill sizes="100vw" className="object-cover" priority quality={90} />
          </div>
        </Parallax>
      </section>
    );
  }

  // Aurora (다크 글래스) — 그라데이션 + 글래스 + 마우스 글로우
  if (layoutVariant === 'aurora') {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden aurora-bg">
        <GlowField />
        <Reveal className="relative z-10 px-6 w-full max-w-2xl mx-auto">
          <div className="bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-[var(--radius-xl)] p-10 md:p-14 text-center shadow-[0_8px_60px_rgba(0,0,0,0.5)]">
            <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6">{data.title}</h1>
            <p className="text-xl md:text-2xl text-white/70 mb-8">{data.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href={data.ctaButtons.primary.action} size="large">{data.ctaButtons.primary.text}</Button>
              <Button href={data.ctaButtons.secondary.action} variant="secondary" size="large" className="!text-white !border-white/30 hover:!bg-white/10">{data.ctaButtons.secondary.text}</Button>
            </div>
          </div>
        </Reveal>
      </section>
    );
  }

  // Editorial (잡지) — 비대칭 + 마키
  if (layoutVariant === 'editorial') {
    return (
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white py-20">
        <Marquee text={`${data.subtitle} — `} duration={24} className="text-4xl md:text-6xl font-black uppercase tracking-tight text-[var(--color-text-primary)]/10 mb-10" />
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center px-6 md:px-12 max-w-7xl mx-auto w-full">
          <Reveal>
            <span className="block text-sm font-bold tracking-[0.3em] uppercase text-[var(--color-primary)] mb-4">Hair Editorial</span>
            <h1 className="text-6xl md:text-8xl font-black tracking-[-0.04em] leading-[0.9] text-[var(--color-text-primary)] mb-8">{data.title}</h1>
            <div className="flex gap-4">
              <Button href={data.ctaButtons.primary.action} size="large">{data.ctaButtons.primary.text}</Button>
              <Button href={data.ctaButtons.secondary.action} variant="ghost" size="large">{data.ctaButtons.secondary.text}</Button>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={data.backgroundImage} alt={data.title} fill sizes="(max-width:768px) 100vw, 40vw" className="object-cover" priority quality={90} />
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  // Noir (모노크롬 럭셔리) — 시네마틱 흑백 + 그레인
  if (layoutVariant === 'noir') {
    return (
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black grain-overlay">
        <div className="absolute inset-0">
          <Image src={data.backgroundImage} alt={data.title} fill sizes="100vw" className="object-cover grayscale opacity-50" priority quality={90} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/85" />
        </div>
        <Reveal className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <div className="w-16 h-px bg-[var(--color-accent)] mx-auto mb-8" />
          <h1 className="text-6xl md:text-8xl font-serif font-light tracking-[0.12em] text-white mb-6">{data.title}</h1>
          <p className="text-base md:text-lg text-white/70 tracking-[0.25em] uppercase mb-10">{data.subtitle}</p>
          <Button href={data.ctaButtons.primary.action} size="large">{data.ctaButtons.primary.text}</Button>
        </Reveal>
      </section>
    );
  }

  // Kinetic (키네틱 타이포)
  if (layoutVariant === 'kinetic') {
    return (
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white py-20">
        <Stagger className="text-center px-6 w-full" stagger={0.15}>
          <StaggerItem>
            <span className="block text-sm font-bold tracking-[0.3em] uppercase text-[var(--color-primary)] mb-6">In Motion</span>
          </StaggerItem>
          <StaggerItem>
            <h1 className="text-7xl md:text-[11rem] font-black uppercase leading-[0.82] tracking-tighter text-[var(--color-text-primary)]">{data.title}</h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-2xl md:text-4xl font-bold mt-6 text-[var(--color-primary)]">{data.subtitle}</p>
          </StaggerItem>
          <StaggerItem>
            <div className="flex gap-4 justify-center mt-10">
              <Button href={data.ctaButtons.primary.action} size="large">{data.ctaButtons.primary.text}</Button>
              <Button href={data.ctaButtons.secondary.action} variant="secondary" size="large">{data.ctaButtons.secondary.text}</Button>
            </div>
          </StaggerItem>
        </Stagger>
      </section>
    );
  }

  // Default: Classic Layout
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={data.backgroundImage}
          alt={data.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          {data.title}
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-white/90">
          {data.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button href={data.ctaButtons.primary.action} size="large">
            {data.ctaButtons.primary.text}
          </Button>
          <Button
            href={data.ctaButtons.secondary.action}
            variant="secondary"
            size="large"
            className="!text-white !border-white hover:!bg-white/20"
          >
            {data.ctaButtons.secondary.text}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
