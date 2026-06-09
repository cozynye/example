// 동물병원 포트폴리오 데이터 타입 — 미용실과 다른 의료 IA 반영
// 재사용 가능한 섹션 타입은 기존 salon types에서 가져온다.
import type {
  ThemeType,
  LayoutVariant,
  HeroSection,
  AboutSection,
  StylistSection,
  HoursSection,
  ContactSection,
} from './types';

export type VetTier = '24h' | 'night' | 'day'; // 24시 2차 / 야간 1.5차 / 주간 1차

export type VetSectionType =
  | 'hero'
  | 'emergency' // 응급·야간·24시 (vet 전용)
  | 'trust' // 신뢰지표 (통계·인증·별점)
  | 'services' // 진료과목 (의학 분과)
  | 'doctors' // 의료진 (수의사)
  | 'facility' // 첨단 장비·시설
  | 'cost' // 진료비 (법정 게시)
  | 'reviews' // 치료후기
  | 'hours' // 진료시간
  | 'about' // 병원 소개
  | 'contact'; // 오시는 길

export interface VetClinic {
  id: number;
  clinicName: string;
  tagline: string;
  tier: VetTier;
  /** 응급/대표 전화 (click-to-call, 헤더/sticky 노출) */
  emergencyPhone: string;
  theme: ThemeType;
  layout: {
    variant: LayoutVariant;
    sectionOrder: VetSectionType[];
  };
  hero: VetHeroSection;
  emergency?: EmergencySection;
  trust: TrustSection;
  services: VetServicesSection;
  doctors: StylistSection; // 재사용 (role='원장 수의사', education=수의대, specialties=진료과)
  facility: FacilitySection;
  cost: CostSection;
  reviews?: ReviewsSection;
  hours: HoursSection; // 재사용
  about: AboutSection; // 재사용
  contact: ContactSection; // 재사용
}

// Hero — 기존 HeroSection + 응급 배지/전화 슬롯
export interface VetHeroSection extends HeroSection {
  /** 히어로 상단 배지 (예: '24시 응급진료', '야간진료', '주차가능', '네이버예약') */
  badges?: string[];
}

// 응급·야간·24시 (vet 전용)
export interface EmergencySection {
  title: string;
  /** 강조 문구 (예: '365일 24시간 응급 진료') */
  headline: string;
  phone: string;
  /** 3단 시간대 */
  schedule: { label: string; time: string }[]; // 주간/야간/응급
  /** 응급 내원이 필요한 증상 리스트 */
  symptoms: string[];
  /** 야간/응급 진료비 할증 고지 */
  surchargeNote?: string;
}

// 신뢰지표
export interface TrustSection {
  title?: string;
  /** 누적 통계 (예: 누적 진료 12만 마리, 수술 4.5만 건) */
  stats: { value: string; label: string }[];
  /** 인증/배지 (예: 2차병원 인증, AAHA, Fear Free) */
  badges?: string[];
  /** 네이버/구글 별점 */
  rating?: { platform: string; score: string; count: string }[];
}

// 진료과목 (의학 분과 — 가격이 아니라 진료영역)
export interface VetServicesSection {
  title: string;
  /** 과(科) → 세부 진료/질환 */
  departments: {
    name: string; // 예: 내과
    icon?: string; // 이모지 또는 키
    description: string;
    items: string[]; // 세부 진료/질환
  }[];
}

// 첨단 장비·시설
export interface FacilitySection {
  title: string;
  subtitle?: string;
  equipment: {
    name: string; // 예: 1.5T MRI
    spec?: string; // 예: GE, 딥러닝 탑재
    description: string;
    image: string;
  }[];
}

// 진료비 (수의사법 법정 게시)
export interface CostSection {
  title: string;
  note: string; // 할증 고지 (야간/응급/체중별)
  items: { name: string; price: string }[];
}

// 치료후기
export interface ReviewsSection {
  title: string;
  reviews: {
    author: string; // 예: 보호자 김OO (말티즈)
    rating: number; // 1-5
    text: string;
    date?: string;
  }[];
}
