import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Reveal, Stagger, StaggerItem, Marquee } from '@/components/ui/motion';
import { SITE } from '@/lib/site-config';

export const metadata: Metadata = {
  title: { absolute: 'Make · 미용실 홈페이지 제작 50만원 · 3일' },
  description: '업종에 딱 맞는 웹사이트를 단 3일에 — 미용실부터 시작합니다. 15가지 디자인 중에서 고르세요.',
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
  {
    name: '동물병원',
    en: 'Animal Clinic',
    href: '/vet/portfolio',
    active: true,
    badge: 'LIVE · 12가지 디자인',
    desc: '진료과목 · 의료진 · 응급/24시 · 진료비 · 네이버 예약 연동까지. 12가지 디자인 중에서 고르세요.',
    image:
      'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1280&q=80',
  },
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
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <span className="inline-block rounded-full bg-pink-500 px-3 py-1 text-xs font-bold text-white">
                    {s.badge}
                  </span>
                  <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                    {SITE.price.base} · 3일 제작
                  </span>
                </div>
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

      {/* 오퍼: 가격 · 포함 · 과정 */}
      <section id="offer" className="relative border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-14 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">미용실 홈페이지, 이 가격에</h2>
            <p className="mt-4 text-white/50">복잡한 견적 없이 — 처음부터 가격을 공개합니다.</p>
          </Reveal>

          <div className="mb-16 grid items-start gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
                <div className="flex items-end gap-3">
                  <span className="whitespace-nowrap bg-gradient-to-r from-pink-400 to-indigo-400 bg-clip-text text-5xl font-black text-transparent md:text-6xl">
                    {SITE.price.base}
                  </span>
                  <span className="mb-2 text-white/50">{SITE.price.baseNote}</span>
                </div>
                <div className="mt-3 inline-block rounded-full bg-pink-500/15 px-3 py-1 text-sm font-bold text-pink-300">
                  🎉 {SITE.price.promo}
                </div>
                <ul className="mt-6 space-y-2 text-white/70">
                  {SITE.price.options.map((o) => (
                    <li key={o.name} className="flex justify-between border-b border-white/5 pb-2">
                      <span>{o.name}</span>
                      <span className="font-semibold text-white">{o.price}</span>
                    </li>
                  ))}
                  <li className="flex justify-between">
                    <span>유지보수</span>
                    <span className="font-semibold text-white">{SITE.price.maintenance}</span>
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
                <h3 className="mb-5 text-lg font-bold">기본 포함</h3>
                <ul className="space-y-3">
                  {SITE.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-white/80">
                      <span className="text-pink-400">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="mb-10 text-center">
            <h3 className="text-2xl font-bold md:text-3xl">3일이면 끝납니다</h3>
            <p className="mt-3 text-white/50">매장 사진 몇 장과 가격표만 주세요. 없으면 함께 준비해 드립니다.</p>
          </Reveal>
          <Stagger className="mb-14 grid gap-5 md:grid-cols-3">
            {SITE.process.map((p) => (
              <StaggerItem key={p.step}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <div className="text-4xl font-black text-white/15">0{p.step}</div>
                  <div className="mt-2 text-lg font-bold">{p.title}</div>
                  <p className="mt-2 text-sm text-white/55">{p.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="text-center">
            <a
              href={SITE.contact.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FEE500] px-8 py-4 text-base font-bold text-[#3C1E1E] transition-transform hover:scale-[0.97]"
            >
              카톡으로 1분 문의
            </a>
            <p className="mt-4 text-sm text-white/40">카톡 1일 내 답변 · 계약 전 시안 확인 · 1차 무료 수정</p>
          </Reveal>
        </div>
      </section>

      {/* 신뢰 보증 + FAQ */}
      <section className="relative border-t border-white/10 px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl">
          <Reveal className="mb-16 flex flex-wrap justify-center gap-3">
            {SITE.guarantees.map((g) => (
              <span
                key={g}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/80"
              >
                <span className="text-pink-400">✓</span>
                {g}
              </span>
            ))}
          </Reveal>

          <Reveal className="mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">자주 묻는 질문</h2>
            <p className="mt-4 text-white/50">미용실 원장님들이 가장 많이 물어보시는 것들</p>
          </Reveal>

          <div className="space-y-3">
            {SITE.faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold md:text-lg">
                  {f.q}
                  <span className="shrink-0 text-xl text-pink-400 transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 leading-relaxed text-white/65">{f.a}</p>
              </details>
            ))}
          </div>

          <Reveal className="mt-12 text-center">
            <a
              href={SITE.contact.kakaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FEE500] px-8 py-4 text-base font-bold text-[#3C1E1E] transition-transform hover:scale-[0.97]"
            >
              더 궁금한 점은 카톡으로 물어보세요
            </a>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 pb-16 text-center text-sm text-white/40">
        Make · 업종별 웹사이트 제작 · 3일 제작 · 모바일 최적화
      </footer>
    </main>
  );
}
