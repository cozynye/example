'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

type Clinic = {
  id: number;
  name: string;
  tier: '24시 응급' | '야간 진료' | '주간 진료';
  mood: string;
  desc: string;
  color: string;
  image: string;
};

const img = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1100&q=70`;

const CLINICS: Clinic[] = [
  { id: 1, name: '튼튼동물의료센터', tier: '24시 응급', mood: '24시 종합 2차병원', desc: '응급의학부터 정밀진단까지', color: '#2C3E50', image: img('1450778869180-41d0601e046e') },
  { id: 2, name: '리안24시동물의료센터', tier: '24시 응급', mood: '다크 응급센터', desc: '야간·응급 중환자 특화', color: '#7C6FF0', image: img('1559190394-df5a28aab5c5') },
  { id: 5, name: '프리미엄 펫메디컬센터', tier: '24시 응급', mood: '프리미엄 메디컬', desc: 'MRI·CT 첨단 VIP 진료', color: '#B8941F', image: img('1518155317743-a8ff43ea6a5f') },
  { id: 9, name: '노블 동물메디컬센터', tier: '24시 응급', mood: '럭셔리 시네마틱', desc: '흑백+골드 프리미엄 2차', color: '#C9A24B', image: img('1514888286974-6c03e2ca1dba') },

  { id: 8, name: '정밀영상 동물메디컬', tier: '야간 진료', mood: '영상의학 특화', desc: 'CT·MRI 정밀진단', color: '#1D1D1F', image: img('1666214280557-f1b5022eb634') },
  { id: 12, name: '다이나믹 동물병원', tier: '야간 진료', mood: '다이내믹 키네틱', desc: '젊고 활기찬 에너지', color: '#E91E63', image: img('1591946614720-90a587da4a36') },

  { id: 3, name: '고양이마음 동물병원', tier: '주간 진료', mood: '고양이 전문', desc: '캣 프렌들리 특화 진료', color: '#B39DDB', image: img('1574158622682-e40e69881006') },
  { id: 4, name: '우리동네 행복동물병원', tier: '주간 진료', mood: '동네 친근', desc: '예방접종·건강검진 중심', color: '#FF6B9D', image: img('1543466835-00a7907e9de1') },
  { id: 6, name: '자연한방 동물병원', tier: '주간 진료', mood: '한방·재활', desc: '침·재활·자연주의', color: '#2E7D32', image: img('1535268647677-300dbf3d78d1') },
  { id: 7, name: '모던펫 동물클리닉', tier: '주간 진료', mood: '모던 미니멀', desc: '깔끔한 1차 진료', color: '#0071E3', image: img('1576765608535-5f04d1e3f289') },
  { id: 10, name: '든든 노령동물병원', tier: '주간 진료', mood: '노령견 시니어', desc: '건강검진·재활·완화케어', color: '#795548', image: img('1612531386530-97286d97c2d2') },
  { id: 11, name: '올케어 동물병원', tier: '주간 진료', mood: '토탈케어', desc: '진료+예방+건강관리', color: '#FF6347', image: img('1583337130417-3346a1be7dee') },
];

const FILTERS = ['전체', '24시 응급', '야간 진료', '주간 진료'] as const;

export default function VetCatalog() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>('전체');
  const shown = filter === '전체' ? CLINICS : CLINICS.filter((c) => c.tier === filter);

  return (
    <div>
      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-5 py-2.5 text-sm font-bold transition-colors ${
              filter === f ? 'bg-white text-zinc-900' : 'border border-white/15 text-white/70 hover:bg-white/10'
            }`}
          >
            {f === '전체' ? '전체 보기' : f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((c) => (
          <Link
            key={c.id}
            href={`/vet/portfolio/${c.id}`}
            className="group relative block aspect-[4/5] overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 transition-all hover:ring-white/30"
          >
            <Image
              src={c.image}
              alt={`${c.name} 동물병원 홈페이지 디자인`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 top-0 flex justify-end p-4">
              <span className="rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                {c.tier}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 flex flex-col p-5 text-white">
              <span className="mb-2 w-fit rounded-full px-2.5 py-1 text-[11px] font-bold text-white" style={{ backgroundColor: c.color }}>
                {c.mood}
              </span>
              <h3 className="text-xl font-black tracking-tight">{c.name}</h3>
              <p className="mt-1 text-sm text-white/75">{c.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
