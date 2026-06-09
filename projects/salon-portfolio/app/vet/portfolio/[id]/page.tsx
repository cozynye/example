import { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import ShareButton from '@/components/site/ShareButton';
import type { VetClinic, VetSectionType } from '@/lib/data/vet-types';

// 재사용 (미용실) 섹션
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import StylistSection from '@/components/portfolio/StylistSection';
import HoursSection from '@/components/portfolio/HoursSection';
import ContactSection from '@/components/portfolio/ContactSection';
// vet 전용 섹션
import EmergencySection from '@/components/vet/EmergencySection';
import TrustSection from '@/components/vet/TrustSection';
import VetServicesSection from '@/components/vet/VetServicesSection';
import FacilitySection from '@/components/vet/FacilitySection';
import CostSection from '@/components/vet/CostSection';
import ReviewsSection from '@/components/vet/ReviewsSection';

const TOTAL = 12;

async function getClinic(id: string): Promise<VetClinic | null> {
  try {
    const c = await import(`@/lib/data/vet-clinic-${id}.json`);
    return c.default as VetClinic;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  return Array.from({ length: TOTAL }, (_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = await getClinic(id);
  if (!c) return { title: '동물병원을 찾을 수 없습니다' };
  return {
    title: `${c.clinicName} · 동물병원 홈페이지 디자인`,
    description: `${c.tagline} — 이 디자인으로 우리 동물병원 홈페이지를 50만원·3일에 만들어 드립니다.`,
    openGraph: {
      title: `${c.clinicName} · 동물병원 홈페이지 디자인 | Make`,
      description: `${c.tagline} — 50만원·3일 제작.`,
      images: [c.hero.backgroundImage],
    },
  };
}

export default async function VetClinicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const clinic = await getClinic(id);

  if (!clinic) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">동물병원을 찾을 수 없습니다</h1>
          <Link href="/vet/portfolio" className="text-[var(--color-primary)]">
            전체 디자인 보기 →
          </Link>
        </div>
      </div>
    );
  }

  const v = clinic.layout.variant;

  const renderSection = (section: VetSectionType) => {
    switch (section) {
      case 'hero':
        return <HeroSection key="hero" data={clinic.hero} layoutVariant={v} theme={clinic.theme} />;
      case 'emergency':
        return clinic.emergency ? <EmergencySection key="emergency" data={clinic.emergency} /> : null;
      case 'trust':
        return clinic.trust ? <TrustSection key="trust" data={clinic.trust} layoutVariant={v} /> : null;
      case 'services':
        return clinic.services ? <VetServicesSection key="services" data={clinic.services} layoutVariant={v} /> : null;
      case 'doctors':
        return clinic.doctors ? <StylistSection key="doctors" data={clinic.doctors} layoutVariant={v} /> : null;
      case 'facility':
        return clinic.facility ? <FacilitySection key="facility" data={clinic.facility} layoutVariant={v} /> : null;
      case 'cost':
        return <CostSection key="cost" data={clinic.cost} layoutVariant={v} />;
      case 'reviews':
        return clinic.reviews ? <ReviewsSection key="reviews" data={clinic.reviews} layoutVariant={v} /> : null;
      case 'hours':
        return <HoursSection key="hours" data={clinic.hours} layoutVariant={v} />;
      case 'about':
        return <AboutSection key="about" data={clinic.about} layoutVariant={v} theme={clinic.theme} />;
      case 'contact':
        return <ContactSection key="contact" data={clinic.contact} layoutVariant={v} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 데모 안내 배너 */}
      <div className="bg-zinc-900 px-4 py-2.5 text-center text-xs text-white/85 sm:text-sm">
        ✏️ 이 페이지는 <strong className="text-white">디자인 예시</strong>입니다 — 병원명·진료과목·의료진·진료비·지도·예약은 모두 원장님 병원 정보로 교체됩니다.
      </div>

      {/* 데모 */}
      <div data-theme={clinic.theme} data-layout={clinic.layout.variant}>
        {clinic.layout.sectionOrder.map(renderSection)}
      </div>

      {/* 판매자 전환 섹션 */}
      <section className="bg-[#0a0a0f] px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-2xl">
          <span className="mb-5 inline-block rounded-full bg-pink-500/20 px-4 py-1.5 text-sm font-bold text-pink-300">
            “{clinic.clinicName}” 디자인
          </span>
          <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">이 디자인이 마음에 드세요?</h2>
          <p className="mb-8 text-lg text-white/65">
            이 스타일 그대로 <strong className="text-white">원장님 동물병원 사이트</strong>로 만들어 드립니다.
            <br />
            <strong className="text-white">{SITE.price.base}</strong> · 3일 제작 · 네이버 예약·진료과목·진료비·지도 연동 기본 포함.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={SITE.contact.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FEE500] px-8 py-4 text-base font-bold text-[#3C1E1E] transition-transform hover:scale-[0.97]"
            >
              이 디자인으로 내 병원 사이트 만들기
            </a>
            <Link
              href="/vet/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              다른 디자인 보기
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/40">카톡 1일 내 답변 · 계약 전 시안 확인 · 1차 무료 수정</p>

          {/* 데모 간 이동 + 공유 */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8 text-sm">
            <Link
              href={`/vet/portfolio/${Number(id) <= 1 ? TOTAL : Number(id) - 1}`}
              className="text-white/60 transition-colors hover:text-white"
            >
              ← 이전 디자인
            </Link>
            <Link href="/vet/portfolio" className="font-semibold text-white/80 transition-colors hover:text-white">
              전체 디자인 보기
            </Link>
            <Link
              href={`/vet/portfolio/${Number(id) >= TOTAL ? 1 : Number(id) + 1}`}
              className="text-white/60 transition-colors hover:text-white"
            >
              다음 디자인 →
            </Link>
            <ShareButton title={`${clinic.clinicName} · 동물병원 홈페이지 디자인`} />
          </div>
        </div>
      </section>
    </>
  );
}
