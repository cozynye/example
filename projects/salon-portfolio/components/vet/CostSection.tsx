import Section from '../ui/Section';
import Container from '../ui/Container';
import { Reveal } from '../ui/motion';
import { getSectionBackground, getTextColors, getHeadingClass, isDarkLayout } from '@/lib/layout-styles';
import type { CostSection as Data } from '@/lib/data/vet-types';
import type { LayoutVariant } from '@/lib/data/types';

// 진료비 — 수의사법상 홈페이지 게시 법적 의무 (2025.1.5~)
export default function CostSection({
  data,
  layoutVariant = 'classic',
}: {
  data: Data;
  layoutVariant?: LayoutVariant;
}) {
  const text = getTextColors(layoutVariant);
  const heading = getHeadingClass(layoutVariant);
  const dark = isDarkLayout(layoutVariant);
  const priceColor = dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary-dark)]';
  const border = dark ? 'border-white/10' : 'border-black/5';

  return (
    <Section id="cost" background={getSectionBackground(layoutVariant)}>
      <Container>
        <Reveal className="mb-3 text-center">
          <h2 className={`${heading} ${text.heading}`}>{data.title}</h2>
        </Reveal>
        <p className={`mx-auto mb-10 max-w-2xl text-center text-sm ${text.muted}`}>{data.note}</p>
        <Reveal className="mx-auto max-w-2xl">
          <ul className={`rounded-2xl border ${border} ${dark ? 'bg-white/[0.03]' : 'bg-white shadow-[var(--shadow-md)]'} divide-y ${dark ? 'divide-white/10' : 'divide-black/5'}`}>
            {data.items.map((it) => (
              <li key={it.name} className="flex items-center justify-between gap-4 px-6 py-3.5">
                <span className={`text-sm ${text.body}`}>{it.name}</span>
                <span className={`shrink-0 font-bold ${priceColor}`}>{it.price}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <p className={`mt-5 text-center text-xs ${text.muted}`}>
          ※ 동물병원 진료비는 수의사법에 따라 게시되며, 동물의 상태·체중·진료 항목에 따라 달라질 수 있습니다.
        </p>
      </Container>
    </Section>
  );
}
