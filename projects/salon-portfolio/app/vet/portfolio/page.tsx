import { Metadata } from 'next';
import Link from 'next/link';
import { SITE } from '@/lib/site-config';
import VetCatalog from '@/components/site/VetCatalog';

export const metadata: Metadata = {
  title: '동물병원 홈페이지 디자인 12가지',
  description:
    '마음에 드는 디자인을 고르면 원장님 동물병원으로 똑같이 만들어 드립니다. 50만원 · 3일 제작 · 진료과목·의료진·진료비·네이버 예약 연동.',
};

export default function VetPortfolioListPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 h-[40vh] w-[90vw] -translate-x-1/2 rounded-full opacity-20 blur-3xl bg-[radial-gradient(closest-side,#22c55e,transparent)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-12 text-center">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-semibold text-white/50 transition-colors hover:text-white"
          >
            ← Make
          </Link>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">마음에 드는 디자인을 고르세요</h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/60">
            고르기만 하면, <strong className="text-white">원장님 동물병원 정보</strong>로 똑같이 만들어 드립니다.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm">
            <span className="rounded-full bg-white/10 px-4 py-1.5 font-bold">{SITE.price.base}</span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 font-bold">3일 제작</span>
            <span className="rounded-full bg-white/10 px-4 py-1.5 font-bold">진료과목·진료비·네이버 예약</span>
          </div>
        </div>

        <VetCatalog />

        <section className="mt-20 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-14 text-center md:py-16">
          <h2 className="text-2xl font-bold md:text-4xl">우리 병원에 맞는 디자인이 궁금하세요?</h2>
          <p className="mx-auto mt-4 max-w-md text-white/60">
            진료과목·분위기에 어울리는 디자인을 무료로 추천해 드릴게요. 부담 없이 물어보세요.
          </p>
          <a
            href={SITE.contact.kakaoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#FEE500] px-8 py-4 text-base font-bold text-[#3C1E1E] transition-transform hover:scale-[0.97]"
          >
            카톡으로 추천받기
          </a>
          <p className="mt-4 text-sm text-white/40">카톡 1일 내 답변</p>
        </section>
      </div>
    </main>
  );
}
