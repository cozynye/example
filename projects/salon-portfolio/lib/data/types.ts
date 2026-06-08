// 포트폴리오 데이터 타입 정의

export type ThemeType =
  | 'apple'
  | 'trendy'
  | 'classic'
  | 'minimal'
  | 'vibrant'
  | 'nature'
  | 'luxury'
  | 'soft'
  | 'bold'
  | 'earth'
  | 'midnight' // 다크 글래스 (네온/인디고)
  | 'ink'; // 모노크롬 + 골드

// 레이아웃 변형 타입
export type LayoutVariant =
  | 'magazine'    // 매거진 스타일 (split screen, masonry)
  | 'minimal'     // 미니멀 (full-width text, horizontal scroll)
  | 'classic'     // 클래식 (centered, grid)
  | 'card'        // 카드 기반 (bento box, colorful)
  | 'organic'     // 유기적 (curved, asymmetric)
  | 'fullscreen'  // 풀스크린 (slider, large images)
  | 'layered'     // 레이어드 (overlapping, circular)
  | 'typography'  // 타이포그래피 중심 (large text, bold)
  // --- 프리미엄 라인 (애니메이션 내장, 11~15) ---
  | 'showcase'    // Apple 미니멀 (대형 여백, 스크롤 줌)
  | 'aurora'      // 다크 글래스 (그라데이션, 글래스모피즘, 네온)
  | 'editorial'   // 잡지풍 (대담 타이포, 비대칭, 인덱스, 마키)
  | 'noir'        // 모노크롬 럭셔리 (흑백+골드, 시네마틱, 그레인)
  | 'kinetic';    // 키네틱 타이포 + 가로 스크롤

// 섹션 타입
export type SectionType =
  | 'hero'
  | 'about'
  | 'stylist'
  | 'gallery'
  | 'services'
  | 'hours'
  | 'contact';

export interface Portfolio {
  id: number;
  salonName: string;
  tagline: string;
  theme: ThemeType;
  layout: {
    variant: LayoutVariant;
    sectionOrder: SectionType[];
  };
  hero: HeroSection;
  about: AboutSection;
  stylist: StylistSection;
  gallery: GallerySection;
  services: ServicesSection;
  hours: HoursSection;
  contact: ContactSection;
}

export interface HeroSection {
  backgroundImage: string;
  title: string;
  subtitle: string;
  ctaButtons: {
    primary: {
      text: string;
      action: string;
    };
    secondary: {
      text: string;
      action: string;
    };
  };
}

export interface AboutSection {
  title: string;
  description: string[];
  image: string;
  stats?: {
    label: string;
    value: string;
  }[];
}

export interface StylistSection {
  title: string;
  stylists: {
    name: string;
    role: string;
    experience: string;
    specialties: string[];
    image: string;
    education?: string[];
    awards?: string[];
    social?: {
      instagram?: string;
      facebook?: string;
    };
  }[];
}

export interface GallerySection {
  title: string;
  categories: string[];
  images: {
    id: number;
    src: string;
    alt: string;
    category: string;
  }[];
}

export interface ServicesSection {
  title: string;
  services: {
    category: string;
    items: {
      name: string;
      description?: string;
      price: string;
    }[];
  }[];
}

export interface HoursSection {
  title: string;
  hours: {
    day: string;
    time: string;
  }[];
  closedDays: string[];
  notes: string[];
  bookingMethods: {
    phone: string;
    naver?: string;
    kakao?: string;
  };
  parking?: string;
}

export interface ContactSection {
  title: string;
  address: string;
  phone: string;
  email?: string;
  mapUrl: string;
  naverBooking?: string;
  social?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
  };
}
