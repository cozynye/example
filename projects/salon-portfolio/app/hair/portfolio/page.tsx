import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '포트폴리오 갤러리 | 15가지 미용실 템플릿',
  description: '다양한 테마와 레이아웃의 미용실 포트폴리오를 확인하세요',
};

// 포트폴리오 메타 정보
const portfolios = [
  {
    id: 1,
    name: '스타일 헤어',
    theme: 'trendy',
    layout: 'magazine',
    description: 'Split screen + Masonry gallery',
    color: '#FF6B9D',
  },
  {
    id: 2,
    name: '모던 살롱',
    theme: 'apple',
    layout: 'minimal',
    description: 'Minimal typography + 20% opacity',
    color: '#0071E3',
  },
  {
    id: 3,
    name: '클래식 에비뉴',
    theme: 'classic',
    layout: 'classic',
    description: 'Traditional centered + 3-column',
    color: '#2C3E50',
  },
  {
    id: 4,
    name: '블랙 앤 화이트',
    theme: 'minimal',
    layout: 'typography',
    description: 'Black & white + Giant type',
    color: '#1D1D1F',
  },
  {
    id: 5,
    name: '비비드 살롱',
    theme: 'vibrant',
    layout: 'card',
    description: 'Bento box + Colorful cards',
    color: '#FF6347',
  },
  {
    id: 6,
    name: '그린 가든',
    theme: 'nature',
    layout: 'organic',
    description: 'Organic curves + Natural green',
    color: '#2E7D32',
  },
  {
    id: 7,
    name: '르 뤽스 살롱',
    theme: 'luxury',
    layout: 'fullscreen',
    description: 'Fullscreen slider + Gold luxury',
    color: '#D4AF37',
  },
  {
    id: 8,
    name: '소프트 터치',
    theme: 'soft',
    layout: 'layered',
    description: 'Layered design + Pastel colors',
    color: '#B39DDB',
  },
  {
    id: 9,
    name: '볼드 스튜디오',
    theme: 'bold',
    layout: 'fullscreen',
    description: 'Fullscreen + Bold vivid',
    color: '#E91E63',
  },
  {
    id: 10,
    name: '어스 라운지',
    theme: 'earth',
    layout: 'layered',
    description: 'Layered overlap + Earth tones',
    color: '#795548',
  },
  {
    id: 11,
    name: 'OBJET',
    theme: 'apple',
    layout: 'showcase',
    description: 'Apple minimal + 스크롤 줌',
    color: '#0071E3',
  },
  {
    id: 12,
    name: 'LUMINA',
    theme: 'midnight',
    layout: 'aurora',
    description: '다크 글래스 + 네온 글로우',
    color: '#7C6FF0',
  },
  {
    id: 13,
    name: 'EDIT',
    theme: 'minimal',
    layout: 'editorial',
    description: '에디토리얼 + 대담 타이포',
    color: '#1D1D1F',
  },
  {
    id: 14,
    name: 'NOIR',
    theme: 'ink',
    layout: 'noir',
    description: '모노크롬 + 골드 시네마틱',
    color: '#C9A24B',
  },
  {
    id: 15,
    name: 'MOMENTUM',
    theme: 'ink',
    layout: 'kinetic',
    description: '키네틱 타이포 + 가로 스크롤',
    color: '#C9A24B',
  },
];

export default function PortfolioListPage() {
  return (
    <main className="min-h-screen bg-[var(--color-light-gray)] py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-[var(--color-text-primary)]">
            미용실 포트폴리오 갤러리
          </h1>
          <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto">
            15가지 다른 테마와 레이아웃으로 디자인된 미용실 포트폴리오를 확인하세요.
            <br />
            각각 고유한 섹션 순서와 Unsplash 이미지를 사용합니다.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolios.map((portfolio) => (
            <Link
              key={portfolio.id}
              href={`/hair/portfolio/${portfolio.id}`}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Thumbnail */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundColor: portfolio.color }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="text-6xl font-black mb-2 opacity-50"
                      style={{ color: portfolio.color }}
                    >
                      {portfolio.id}
                    </div>
                    <div className="text-2xl font-bold text-gray-600">
                      {portfolio.name}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: portfolio.color }}
                  >
                    {portfolio.theme}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                    {portfolio.layout}
                  </span>
                </div>

                <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                  {portfolio.description}
                </p>

                <div className="flex items-center text-sm font-semibold text-[var(--color-primary)] group-hover:gap-2 transition-all">
                  보러가기
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-white rounded-2xl p-8 shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-[var(--color-text-primary)]">
              🎨 레이아웃 종류
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-left">
                <div className="font-semibold text-[var(--color-primary)]">Magazine</div>
                <div className="text-[var(--color-text-secondary)]">Split + Masonry</div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--color-primary)]">Minimal</div>
                <div className="text-[var(--color-text-secondary)]">Light + Large</div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--color-primary)]">Card</div>
                <div className="text-[var(--color-text-secondary)]">Bento Box</div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--color-primary)]">Fullscreen</div>
                <div className="text-[var(--color-text-secondary)]">Slider + Luxury</div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--color-primary)]">Typography</div>
                <div className="text-[var(--color-text-secondary)]">Black + Giant</div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--color-primary)]">Organic</div>
                <div className="text-[var(--color-text-secondary)]">Curves + Nature</div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--color-primary)]">Layered</div>
                <div className="text-[var(--color-text-secondary)]">Overlapping</div>
              </div>
              <div className="text-left">
                <div className="font-semibold text-[var(--color-primary)]">Classic</div>
                <div className="text-[var(--color-text-secondary)]">Traditional</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
