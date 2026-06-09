import Section from '../ui/Section';
import Container from '../ui/Container';
import { Reveal } from '../ui/motion';
import { getSectionBackground, getTextColors, getHeadingClass, isDarkLayout } from '@/lib/layout-styles';
import type { TrustSection as Data } from '@/lib/data/vet-types';
import type { LayoutVariant } from '@/lib/data/types';

// 신뢰지표 — 누적 통계 + 인증 + 별점
export default function TrustSection({
  data,
  layoutVariant = 'classic',
}: {
  data: Data;
  layoutVariant?: LayoutVariant;
}) {
  const text = getTextColors(layoutVariant);
  const heading = getHeadingClass(layoutVariant);
  const dark = isDarkLayout(layoutVariant);
  const statColor = dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary-dark)]';
  const badgeCls = dark ? 'border-white/15 text-white/80' : 'border-black/10 text-[var(--color-text-secondary)]';

  return (
    <Section id="trust" background={getSectionBackground(layoutVariant, 'gray')}>
      <Container>
        {data.title && (
          <Reveal className="mb-10 text-center">
            <h2 className={`${heading} ${text.heading}`}>{data.title}</h2>
          </Reveal>
        )}
        <Reveal>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {data.stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className={`text-3xl font-black md:text-5xl ${statColor}`}>{s.value}</div>
                <div className={`mt-2 text-sm ${text.muted}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {data.badges && data.badges.length > 0 && (
          <Reveal delay={0.1} className="mt-10 flex flex-wrap justify-center gap-2.5">
            {data.badges.map((b) => (
              <span key={b} className={`rounded-full border px-4 py-2 text-sm font-semibold ${badgeCls}`}>
                ✓ {b}
              </span>
            ))}
          </Reveal>
        )}

        {data.rating && data.rating.length > 0 && (
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3">
            {data.rating.map((r) => (
              <div key={r.platform} className={`flex items-center gap-2 text-sm ${text.body}`}>
                <span className="font-bold text-amber-400">★ {r.score}</span>
                <span className={text.muted}>
                  {r.platform} · 리뷰 {r.count}
                </span>
              </div>
            ))}
          </Reveal>
        )}
      </Container>
    </Section>
  );
}
