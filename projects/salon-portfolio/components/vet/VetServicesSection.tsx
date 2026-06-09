import Section from '../ui/Section';
import Container from '../ui/Container';
import { Reveal } from '../ui/motion';
import { getSectionBackground, getTextColors, getHeadingClass, isDarkLayout } from '@/lib/layout-styles';
import type { VetServicesSection as Data } from '@/lib/data/vet-types';
import type { LayoutVariant } from '@/lib/data/types';

// 진료과목 — 의학 분과 체계 (가격 X, 진료영역 O)
export default function VetServicesSection({
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
  const chipCls = dark ? 'bg-white/10 text-white/70' : 'bg-[var(--color-light-gray)] text-[var(--color-text-secondary)]';

  return (
    <Section id="services" background={getSectionBackground(layoutVariant)}>
      <Container>
        <Reveal className="mb-12 text-center">
          <h2 className={`${heading} ${text.heading}`}>{data.title}</h2>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {data.departments.map((d) => (
            <Reveal key={d.name}>
              <div className={`h-full rounded-2xl border p-6 ${cardCls}`}>
                <div className="mb-3 flex items-center gap-2.5">
                  {d.icon && <span className="text-2xl">{d.icon}</span>}
                  <h3 className={`text-xl font-bold ${text.heading}`}>{d.name}</h3>
                </div>
                <p className={`mb-4 text-sm leading-relaxed ${text.body}`}>{d.description}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {d.items.map((it) => (
                    <li key={it} className={`rounded-full px-2.5 py-1 text-xs ${chipCls}`}>
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
