import Container from '../ui/Container';
import { Reveal } from '../ui/motion';
import type { EmergencySection as EmergencyData } from '@/lib/data/vet-types';

// 응급·야간·24시 — 동물병원 IA의 중심축. 긴급함을 위해 항상 레드 액센트(테마 무관).
export default function EmergencySection({ data }: { data: EmergencyData }) {
  return (
    <section id="emergency" className="bg-[#1a0e0e] py-16 md:py-20">
      <Container>
        <Reveal>
          <div className="mb-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-950/60 to-transparent p-7 md:flex-row md:items-center md:p-9">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-red-500/20 px-3 py-1 text-sm font-bold text-red-300">
                🚨 응급 진료
              </span>
              <h2 className="mt-3 text-2xl font-black text-white md:text-3xl">{data.headline}</h2>
            </div>
            <a
              href={`tel:${data.phone.replace(/-/g, '')}`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-red-500 px-7 py-4 text-lg font-black text-white transition-transform hover:scale-[0.97]"
            >
              📞 {data.phone}
            </a>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* 3단 진료시간 */}
          <Reveal>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="mb-5 text-lg font-bold text-white">진료 시간대</h3>
              <ul className="space-y-3">
                {data.schedule.map((s) => (
                  <li key={s.label} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0">
                    <span className="font-semibold text-white/80">{s.label}</span>
                    <span className="font-bold text-red-300">{s.time}</span>
                  </li>
                ))}
              </ul>
              {data.surchargeNote && (
                <p className="mt-4 text-xs text-white/45">※ {data.surchargeNote}</p>
              )}
            </div>
          </Reveal>

          {/* 응급 증상 */}
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <h3 className="mb-5 text-lg font-bold text-white">이런 증상은 즉시 내원하세요</h3>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {data.symptoms.map((sym) => (
                  <li key={sym} className="flex items-start gap-2 text-sm text-white/75">
                    <span className="mt-0.5 text-red-400">▲</span>
                    {sym}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
