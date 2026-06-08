import { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import ShareButton from '@/components/site/ShareButton';
import HeroSection from '@/components/portfolio/HeroSection';
import AboutSection from '@/components/portfolio/AboutSection';
import StylistSection from '@/components/portfolio/StylistSection';
import GallerySection from '@/components/portfolio/GallerySection';
import ServicesSection from '@/components/portfolio/ServicesSection';
import HoursSection from '@/components/portfolio/HoursSection';
import ContactSection from '@/components/portfolio/ContactSection';
import type { Portfolio } from '@/lib/data/types';

// 포트폴리오 데이터 로드 함수
async function getPortfolio(id: string): Promise<Portfolio | null> {
  try {
    const portfolio = await import(`@/lib/data/portfolio-${id}.json`);
    return portfolio.default;
  } catch (error) {
    console.error(`Portfolio ${id} not found:`, error);
    return null;
  }
}

// Static Site Generation - 사전 생성할 포트폴리오 ID 지정
export async function generateStaticParams() {
  return Array.from({ length: 15 }, (_, i) => ({ id: String(i + 1) }));
}

// 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const portfolio = await getPortfolio(id);

  if (!portfolio) {
    return {
      title: '포트폴리오를 찾을 수 없습니다',
    };
  }

  return {
    title: `${portfolio.salonName} · 미용실 홈페이지 디자인`,
    description: `${portfolio.tagline} — 이 디자인으로 내 미용실 홈페이지를 50만원·3일에 만들어 드립니다.`,
    keywords: [portfolio.salonName, '미용실 홈페이지', '헤어살롱 웹사이트', '미용실 사이트 제작', portfolio.theme],
    openGraph: {
      title: `${portfolio.salonName} · 미용실 홈페이지 디자인 | Make`,
      description: `${portfolio.tagline} — 50만원·3일 제작.`,
      images: [portfolio.hero.backgroundImage],
      type: 'website',
    },
  };
}

// 포트폴리오 상세 페이지
export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const portfolio = await getPortfolio(id);

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">포트폴리오를 찾을 수 없습니다</h1>
          <p className="text-[var(--color-text-secondary)]">
            요청하신 포트폴리오가 존재하지 않습니다.
          </p>
        </div>
      </div>
    );
  }

  // 섹션 컴포넌트 렌더링 헬퍼
  const renderSection = (sectionType: string) => {
    const layoutVariant = portfolio.layout.variant;

    switch (sectionType) {
      case 'hero':
        return <HeroSection key="hero" data={portfolio.hero} layoutVariant={layoutVariant} theme={portfolio.theme} />;
      case 'about':
        return <AboutSection key="about" data={portfolio.about} layoutVariant={layoutVariant} theme={portfolio.theme} />;
      case 'stylist':
        return <StylistSection key="stylist" data={portfolio.stylist} layoutVariant={layoutVariant} />;
      case 'gallery':
        return <GallerySection key="gallery" data={portfolio.gallery} layoutVariant={layoutVariant} theme={portfolio.theme} />;
      case 'services':
        return <ServicesSection key="services" data={portfolio.services} layoutVariant={layoutVariant} theme={portfolio.theme} />;
      case 'hours':
        return <HoursSection key="hours" data={portfolio.hours} layoutVariant={layoutVariant} />;
      case 'contact':
        return <ContactSection key="contact" data={portfolio.contact} layoutVariant={layoutVariant} />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* 데모 안내 배너 — '내 사진 없는데?' 불안 즉시 해소 */}
      <div className="bg-zinc-900 px-4 py-2.5 text-center text-xs text-white/85 sm:text-sm">
        ✏️ 이 페이지는 <strong className="text-white">디자인 예시</strong>입니다 — 사진·이름·가격·지도·예약은 모두 원장님 미용실 정보로 교체됩니다.
      </div>

      {/* 데모 */}
      <div data-theme={portfolio.theme} data-layout={portfolio.layout.variant}>
        {portfolio.layout.sectionOrder.map(renderSection)}
      </div>

      {/* 판매자 전환 섹션 — 데모와 명확히 분리된 'Make' 주문 CTA */}
      <section className="bg-[#0a0a0f] px-6 py-20 text-center text-white md:py-28">
        <div className="mx-auto max-w-2xl">
          <span className="mb-5 inline-block rounded-full bg-pink-500/20 px-4 py-1.5 text-sm font-bold text-pink-300">
            “{portfolio.salonName}” 디자인
          </span>
          <h2 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
            이 디자인이 마음에 드세요?
          </h2>
          <p className="mb-8 text-lg text-white/65">
            이 스타일 그대로 <strong className="text-white">원장님 미용실 사이트</strong>로 만들어 드립니다.
            <br />
            <strong className="text-white">{SITE.price.base}</strong> · 3일 제작 · 네이버·카카오맵·예약·인스타 연동 기본 포함.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={SITE.contact.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FEE500] px-8 py-4 text-base font-bold text-[#3C1E1E] transition-transform hover:scale-[0.97]"
            >
              이 디자인으로 내 사이트 만들기
            </a>
            <Link
              href="/hair/portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10"
            >
              다른 디자인 보기
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/40">카톡 1일 내 답변 · 계약 전 시안 확인 · 1차 무료 수정</p>

          {/* 데모 간 이동 + 공유 */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-white/10 pt-8 text-sm">
            <Link
              href={`/hair/portfolio/${Number(id) <= 1 ? 15 : Number(id) - 1}`}
              className="text-white/60 transition-colors hover:text-white"
            >
              ← 이전 디자인
            </Link>
            <Link
              href="/hair/portfolio"
              className="font-semibold text-white/80 transition-colors hover:text-white"
            >
              전체 디자인 보기
            </Link>
            <Link
              href={`/hair/portfolio/${Number(id) >= 15 ? 1 : Number(id) + 1}`}
              className="text-white/60 transition-colors hover:text-white"
            >
              다음 디자인 →
            </Link>
            <ShareButton title={`${portfolio.salonName} · 미용실 홈페이지 디자인`} />
          </div>
        </div>
      </section>
    </>
  );
}
