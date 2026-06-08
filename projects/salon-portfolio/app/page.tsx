import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem, Marquee } from '@/components/ui/motion';

export const metadata: Metadata = {
  title: 'Make',
  description: '업종에 딱 맞는 웹사이트를 단 3일에 — 미용실부터 시작합니다.',
};

// 업종 디렉토리 — active=true는 featured 카드로, false는 "준비 중" 그리드로 렌더.
// 새 업종(교회/동물병원 등)은 여기에 한 줄만 추가하면 된다.
const services = [
  {
    name: '미용실',
    en: 'Hair Salon',
    href: '/hair/portfolio',
    active: true,
    badge: 'LIVE · 15가지 디자인',
    desc: '갤러리 · 스타일리스트 · 가격표 · 예약 · 인스타 연동까지. 15가지 디자인 중에서 고르세요.',
    image:
      'https://images.unsplash.com/photo-1440508319978-8b67875e39d7?auto=format&fit=crop&w=1280&q=80',
  },
  { name: '동물병원', en: 'Animal Clinic', active: false, accent: 'from-emerald-400 to-teal-500', emoji: '🐾' },
  { name: '교회', en: 'Church', active: false, accent: 'from-indigo-400 to-violet-500', emoji: '⛪' },
  { name: '카페·음식점', en: 'Cafe & Food', active: false, accent: 'from-amber-400 to-orange-500', emoji: '☕' },
];

export default function Home() {
  const activeServices = services.filter((s) => s.active);
  const comingSoon = services.filter((s) => !s.active);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0a0a0f] text-white">
      {/* 앰비언트 그라데이션 */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-1/4 left-1/2 -translate-x-1/2 h-[60vh] w-[120vw] rounded-full opacity-30 blur-3xl bg-[radial-gradient(closest-side,#ec4899,transparent)]" />
        <div className="absolute top-1/3 right-0 h-[45vh] w-[45vw] rounded-full opacity-20 blur-3xl bg-[radial-gradient(closest-side,#6366f1,transparent)]" />
      </div>

      {/* Hero */}
      <section className="relative px-6 pt-28 pb-14 text-center md:pt-40">
        <Reveal>
          <span className="mb-7 inline-block text-xs font-bold uppercase tracking-[0.45em] text-white/45 md:text-sm">
            Websites for local business
          </span>
        </Reveal>
        <Reveal delay={0.08} y={48}>
          <h1 className="bg-gradient-to-r from-pink-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-[24vw] font-black leading-[0.8] tracking-tighter text-transparent md:text-[13rem]">
            Make
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/70 md:text-2xl">
            업종에 딱 맞는 웹사이트를 <strong className="font-bold text-white">단 3일</strong>에.
            <br />
            지금은 <span className="text-pink-300">미용실</span>부터 시작합니다.
          </p>
        </Reveal>
      </section>

      {/* Marquee */}
      <div className="relative border-y border-white/10 py-5">
        <Marquee
          text="MAKE — 미용실 — 동물병원 — 교회 — 카페 — "
          className="text-4xl font-black uppercase text-white/[0.07] md:text-7xl"
        />
      </div>

      {/* 업종 선택 */}
      <section className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        <Reveal className="mb-12 text-center md:mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">무엇을 만들까요?</h2>
          <p className="mt-4 text-white/50">업종을 선택하면 디자인 샘플을 볼 수 있어요</p>
        </Reveal>

        {/* Featured (active 업종) */}
        {activeServices.map((s) => (
          <Reveal key={s.name} y={40} className="mb-6">
            <Link
              href={s.href!}
              className="group relative block overflow-hidden rounded-3xl border border-white/10"
            >
              <div className="relative h-[420px] md:h-[460px]">
                <Image
                  src={s.image!}
                  alt={`${s.name} 웹사이트 샘플`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1024px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-8 md:p-12">
                <span className="mb-4 inline-block rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white">
                  {s.badge}
                </span>
                <h3 className="mb-3 text-5xl font-black tracking-tight md:text-7xl">{s.name}</h3>
                <p className="mb-6 max-w-md text-lg text-white/70">{s.desc}</p>
                <span className="inline-flex items-center gap-2 text-lg font-bold text-pink-300 transition-all group-hover:gap-4">
                  디자인 보러가기
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}

        {/* 준비 중 업종 */}
        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {comingSoon.map((s) => (
            <StaggerItem key={s.name}>
              <div className="group relative flex h-44 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <div
                  className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl bg-gradient-to-br ${s.accent}`}
                />
                <div className="text-3xl">{s.emoji}</div>
                <div>
                  <div className="text-2xl font-bold">{s.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/40">
                    {s.en} · 준비 중
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Footer */}
      <footer className="relative px-6 pb-16 text-center text-sm text-white/40">
        Make · 업종별 웹사이트 제작 · 3일 제작 · 모바일 최적화
      </footer>
    </main>
  );
}
