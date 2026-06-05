import { Metadata } from 'next';
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
    title: `${portfolio.salonName} | 미용실 포트폴리오`,
    description: portfolio.tagline,
    keywords: [
      portfolio.salonName,
      '미용실',
      '헤어살롱',
      '포트폴리오',
      portfolio.theme,
    ],
    openGraph: {
      title: `${portfolio.salonName} | 미용실 포트폴리오`,
      description: portfolio.tagline,
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
        return <HeroSection key="hero" data={portfolio.hero} layoutVariant={layoutVariant} />;
      case 'about':
        return <AboutSection key="about" data={portfolio.about} layoutVariant={layoutVariant} />;
      case 'stylist':
        return <StylistSection key="stylist" data={portfolio.stylist} layoutVariant={layoutVariant} />;
      case 'gallery':
        return <GallerySection key="gallery" data={portfolio.gallery} layoutVariant={layoutVariant} />;
      case 'services':
        return <ServicesSection key="services" data={portfolio.services} layoutVariant={layoutVariant} />;
      case 'hours':
        return <HoursSection key="hours" data={portfolio.hours} layoutVariant={layoutVariant} />;
      case 'contact':
        return <ContactSection key="contact" data={portfolio.contact} layoutVariant={layoutVariant} />;
      default:
        return null;
    }
  };

  return (
    <div data-theme={portfolio.theme} data-layout={portfolio.layout.variant}>
      {portfolio.layout.sectionOrder.map(renderSection)}
    </div>
  );
}
