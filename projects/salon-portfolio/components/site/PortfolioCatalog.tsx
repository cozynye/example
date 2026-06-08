'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Design = {
  id: number;
  name: string;
  style: '트렌디한' | '깔끔한' | '고급스러운';
  mood: string;
  desc: string;
  color: string;
  image: string;
};

// 각 디자인의 실제 hero 사진 + 원장 언어 라벨 (개발 용어 trendy/magazine 등은 노출하지 않음)
const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1100&q=70`;

const DESIGNS: Design[] = [
  { id: 1, name: '스타일 헤어', style: '트렌디한', mood: '잡지처럼 감각적인', desc: '화보 느낌의 매거진 레이아웃', color: '#FF6B9D', image: img('1440508319978-8b67875e39d7') },
  { id: 4, name: '블랙 앤 화이트', style: '트렌디한', mood: '강렬한 흑백 타이포', desc: '큰 글씨로 임팩트를 주는', color: '#1D1D1F', image: img('1554519934-e32b1629d9ee') },
  { id: 5, name: '비비드 살롱', style: '트렌디한', mood: '컬러풀하고 발랄한', desc: '알록달록 타일로 구성한', color: '#FF6347', image: img('1568339434343-2a640a1a9946') },
  { id: 9, name: '볼드 스튜디오', style: '트렌디한', mood: '강렬하고 대담한', desc: '임팩트 있는 풀스크린', color: '#E91E63', image: img('1630168258841-ea0ae143ee1f') },
  { id: 15, name: 'MOMENTUM', style: '트렌디한', mood: '다이내믹 키네틱', desc: '가로로 흐르는 갤러리', color: '#C9A24B', image: img('1531923690882-840d0dad3f24') },

  { id: 2, name: '모던 살롱', style: '깔끔한', mood: '애플처럼 깔끔한', desc: '군더더기 없는 미니멀', color: '#0071E3', image: img('1507003211169-0a1dd7228f2d') },
  { id: 3, name: '클래식 에비뉴', style: '깔끔한', mood: '품격있는 정석', desc: '신뢰감 주는 전통 스타일', color: '#2C3E50', image: img('1527799820374-dcf8d9d4a388') },
  { id: 6, name: '그린 가든', style: '깔끔한', mood: '자연스럽고 편안한', desc: '그린톤 곡선 디자인', color: '#2E7D32', image: img('1592647420148-bfcc177e2117') },
  { id: 11, name: 'OBJET', style: '깔끔한', mood: '애플 쇼케이스', desc: '제품처럼 스크롤로 보여주는', color: '#0071E3', image: img('1695527081874-b674c46f40fb') },
  { id: 13, name: 'EDIT', style: '깔끔한', mood: '에디토리얼 매거진', desc: '비대칭 잡지 편집 느낌', color: '#1D1D1F', image: img('1601597565151-70c4020dc0e1') },

  { id: 7, name: '르 뤽스 살롱', style: '고급스러운', mood: '럭셔리 풀스크린', desc: '골드 감성의 고급 살롱', color: '#B8941F', image: img('1600948836587-02c1842c9140') },
  { id: 8, name: '소프트 터치', style: '고급스러운', mood: '부드러운 파스텔', desc: '은은하고 따뜻한 무드', color: '#B39DDB', image: img('1616104130421-6eccff73df1d') },
  { id: 10, name: '어스 라운지', style: '고급스러운', mood: '차분한 어스톤', desc: '내추럴 우드 감성', color: '#795548', image: img('1657105052497-f996284ffff8') },
  { id: 12, name: 'LUMINA', style: '고급스러운', mood: '다크 네온 글래스', desc: '세련된 야경 무드', color: '#7C6FF0', image: img('1584359018585-82fb9b6b710d') },
  { id: 14, name: 'NOIR', style: '고급스러운', mood: '시네마틱 모노크롬', desc: '흑백 + 골드 시네마', color: '#C9A24B', image: img('1661292932068-8161765c3940') },
];

const FILTERS = ['전체', '트렌디한', '깔끔한', '고급스러운'] as const;

export default function PortfolioCatalog() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('전체');
  const shown = filter === '전체' ? DESIGNS : DESIGNS.filter((d) => d.style === filter);

  return (
    <div>
      {/* 필터 */}
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              filter === f
                ? 'bg-white text-zinc-900'
                : 'border border-white/15 text-white/70 hover:bg-white/10'
            }`}
          >
            {f === '전체' ? '전체 보기' : `${f} 디자인`}
          </button>
        ))}
      </div>

      {/* 그리드 */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((d) => (
          <Link
            key={d.id}
            href={`/hair/portfolio/${d.id}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 transition-all hover:ring-white/30"
          >
            <Image
              src={d.image}
              alt={`${d.name} 미용실 홈페이지 디자인`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 text-white">
              <span
                className="mb-2 w-fit rounded-full px-2.5 py-1 text-[11px] font-bold"
                style={{ backgroundColor: d.color }}
              >
                {d.mood}
              </span>
              <h3 className="text-2xl font-black tracking-tight">{d.name}</h3>
              <p className="mt-1 text-sm text-white/75">{d.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-white/0 transition-all group-hover:text-white">
                이 디자인 보기 →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
