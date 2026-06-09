import Image from 'next/image';
import Section from '../ui/Section';
import Container from '../ui/Container';
import { Reveal } from '../ui/motion';
import { getSectionBackground, getTextColors, getHeadingClass, isDarkLayout } from '@/lib/layout-styles';
import type { FacilitySection as Data } from '@/lib/data/vet-types';
import type { LayoutVariant } from '@/lib/data/types';

// 첨단 장비·시설 — 병원 등급 신뢰
export default function FacilitySection({
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
    <Section id="facility" background={getSectionBackground(layoutVariant, 'gray')}>
      <Container>
        <Reveal className="mb-12 text-center">
          <h2 className={`${heading} ${text.heading}`}>{data.title}</h2>
          {data.subtitle && <p className={`mt-4 ${text.muted}`}>{data.subtitle}</p>}
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.equipment.map((e) => (
            <Reveal key={e.name}>
              <div className={`h-full overflow-hidden rounded-2xl border ${cardCls}`}>
                <div className="relative aspect-[4/3]">
                  <Image src={e.image} alt={e.name} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className={`text-lg font-bold ${text.heading}`}>{e.name}</h3>
                    {e.spec && (
                      <span className="rounded-full bg-[var(--color-primary)] px-2.5 py-0.5 text-xs font-semibold text-white">
                        {e.spec}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm leading-relaxed ${text.body}`}>{e.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
