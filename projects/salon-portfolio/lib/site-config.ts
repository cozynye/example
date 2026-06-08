// =============================================================
//  Make 판매 사이트 설정 — 연락처/가격을 여기 한 곳에서 관리.
//  ⚠️ 아래 contact 값을 실제 카카오 오픈채팅 링크·전화번호·이메일로 교체하세요.
//     (사이트 전체 CTA가 이 값으로 연결됩니다.)
// =============================================================

export const SITE = {
  serviceName: 'Make',
  tagline: '미용실 전용 홈페이지를 단 3일에',
  // ⚠️ 실제 배포 도메인으로 교체 — OG 이미지/sitemap 절대경로 resolve에 사용
  url: 'https://make-salon.vercel.app',

  // 가격 (기획서 기준 — 필요시 여기서만 수정)
  price: {
    base: '50만원',
    baseNote: '단일 페이지 기준',
    options: [
      { name: '2페이지 구성', price: '+20만원' },
      { name: '문의 폼 추가', price: '+10만원' },
    ],
    maintenance: '월 5만원',
    promo: '첫 5팀 한정 40만원',
  },

  // ⚠️ 실제 값으로 반드시 교체 — 현재는 placeholder
  contact: {
    kakaoUrl: 'https://open.kakao.com/o/REPLACE_WITH_YOUR_OPENCHAT',
    phone: '010-0000-0000',
    email: 'hello@example.com',
  },

  // 모든 제작에 기본 포함되는 기능
  features: [
    '네이버·카카오맵 연동',
    '네이버 예약 링크',
    '인스타그램 피드',
    '모바일 최적화',
  ],

  // 제작 프로세스 3스텝
  process: [
    { step: 1, title: '카톡 문의 · 자료 전달', desc: '매장 사진 몇 장과 가격표만 주세요. 없으면 함께 준비해 드립니다.' },
    { step: 2, title: '디자인 2옵션 시안', desc: '트렌디 vs 정석 중에서 고르세요.' },
    { step: 3, title: '3일 내 완성 · 배포', desc: '도메인 연결까지 한 번에 끝납니다.' },
  ],
} as const;

// 카톡 문의 링크에 어떤 디자인을 보고 있었는지 메모를 붙인다 (사전 채움 효과).
export function kakaoInquiryUrl(note?: string): string {
  return SITE.contact.kakaoUrl;
}
