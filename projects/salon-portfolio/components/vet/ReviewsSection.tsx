import Section from '../ui/Section';
import Container from '../ui/Container';
import { Reveal } from '../ui/motion';
import { getSectionBackground, getTextColors, getHeadingClass, isDarkLayout } from '@/lib/layout-styles';
import type { ReviewsSection as Data } from '@/lib/data/vet-types';
import type { LayoutVariant } from '@/lib/data/types';

// 치료후기 — 보호자 후기 카드
export default function ReviewsSection({
  data,
  layoutVariant = 'classic',
}: {
  data: Data;
  layoutVariant?: LayoutVariant;
}) {
  const text = getTextColors(layoutVariant);
  const heading = getHeadingClass(layoutVariant);
  const dark = isDarkLayout(layoutVariant);
  const cardCls = dark ? 'border-white/10 bg-white/[0.03]' : 'border-black/5 bg-white shadow-[var(--shadow-md)]';

  return (
    <Section id="reviews" background={getSectionBackground(layoutVariant)}>
      <Container>
        <Reveal className="mb-12 text-center">
          <h2 className={`${heading} ${text.heading}`}>{data.title}</h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {data.reviews.map((r, i) => (
            <Reveal key={i} delay={(i % 3) * 0.08}>
              <div className={`flex h-full flex-col rounded-2xl border p-6 ${cardCls}`}>
                <div className="mb-3 text-lg tracking-wide text-amber-400">
                  {'★'.repeat(Math.max(0, Math.min(5, r.rating)))}
                  <span className="text-zinc-300">{'★'.repeat(5 - Math.max(0, Math.min(5, r.rating)))}</span>
                </div>
                <p className={`flex-1 text-sm leading-relaxed ${text.body}`}>“{r.text}”</p>
                <div className={`mt-4 text-sm font-semibold ${text.heading}`}>
                  {r.author}
                  {r.date && <span className={`ml-2 font-normal ${text.muted}`}>· {r.date}</span>}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
