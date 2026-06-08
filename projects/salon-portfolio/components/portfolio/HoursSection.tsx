import React from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import type { HoursSection as HoursData, LayoutVariant } from '@/lib/data/types';
import {
  getLayoutFamily,
  isDarkLayout,
  getSectionBackground,
  getTextColors,
  getHeadingClass,
} from '@/lib/layout-styles';
import { Reveal } from '../ui/motion';

interface HoursSectionProps {
  data: HoursData;
  layoutVariant?: LayoutVariant;
}

const PhoneSvg = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const CalendarSvg = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const KakaoSvg = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z" />
  </svg>
);

export default function HoursSection({ data, layoutVariant = 'classic' }: HoursSectionProps) {
  const variant = layoutVariant;
  const family = getLayoutFamily(variant);
  const text = getTextColors(variant);
  const heading = getHeadingClass(variant);
  const dark = isDarkLayout(variant);

  const accentColor = dark ? 'text-[var(--color-accent)]' : 'text-[var(--color-primary-dark)]';
  const boxClass = dark
    ? 'bg-white/5 rounded-[var(--radius-lg)] p-8'
    : variant === 'card'
      ? 'bg-white rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-md)]'
      : 'bg-[var(--color-light-gray)] rounded-[var(--radius-lg)] p-8';
  const subtleBg = dark ? 'bg-white/5' : 'bg-[var(--color-light-gray)]';

  const renderHoursList = (big = false) => (
    <ul className={big ? 'space-y-4' : 'space-y-3'}>
      {data.hours.map((hour, index) => (
        <li key={index} className={`flex justify-between ${big ? 'text-lg md:text-xl' : ''} ${text.heading}`}>
          <span className="font-medium">{hour.day}</span>
          <span className={text.muted}>{hour.time}</span>
        </li>
      ))}
    </ul>
  );

  const renderClosedDays = (borderColor: string) =>
    data.closedDays.length > 0 ? (
      <div className={`mt-6 pt-6 border-t ${borderColor}`}>
        <p className={`text-sm ${text.muted}`}>
          <span className="font-semibold">휴무일:</span> {data.closedDays.join(', ')}
        </p>
      </div>
    ) : null;

  const renderBookingList = () => (
    <ul className="space-y-4">
      <li className="flex items-start">
        <span className={`${accentColor} mr-3 mt-0.5 flex-shrink-0`}>
          <PhoneSvg />
        </span>
        <div>
          <div className={`font-semibold ${text.heading}`}>전화 예약</div>
          <a href={`tel:${data.bookingMethods.phone.replace(/-/g, '')}`} className={`${accentColor} hover:underline`}>
            {data.bookingMethods.phone}
          </a>
        </div>
      </li>
      {data.bookingMethods.naver && (
        <li className="flex items-start">
          <span className={`${accentColor} mr-3 mt-0.5 flex-shrink-0`}>
            <CalendarSvg />
          </span>
          <div>
            <div className={`font-semibold ${text.heading}`}>네이버 예약</div>
            <a href={data.bookingMethods.naver} target="_blank" rel="noopener noreferrer" className={`${accentColor} hover:underline text-sm`}>
              온라인 예약하기 →
            </a>
          </div>
        </li>
      )}
      {data.bookingMethods.kakao && (
        <li className="flex items-start">
          <span className={`${accentColor} mr-3 mt-0.5 flex-shrink-0`}>
            <KakaoSvg />
          </span>
          <div>
            <div className={`font-semibold ${text.heading}`}>카카오톡 예약</div>
            <a href={data.bookingMethods.kakao} target="_blank" rel="noopener noreferrer" className={`${accentColor} hover:underline text-sm`}>
              카카오톡으로 문의 →
            </a>
          </div>
        </li>
      )}
    </ul>
  );

  const renderNotes = () =>
    data.notes.length > 0 ? (
      <div className={`mt-8 p-6 rounded-[var(--radius-lg)] ${subtleBg}`}>
        <ul className="space-y-2 text-sm">
          {data.notes.map((note, index) => (
            <li key={index} className={`flex items-start ${text.muted}`}>
              <span className={`mr-2 ${accentColor}`}>•</span>
              {note}
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const renderParking = () =>
    data.parking ? (
      <div className="mt-4 text-center">
        <p className={`text-sm ${text.muted}`}>
          <span className="font-semibold">주차:</span> {data.parking}
        </p>
      </div>
    ) : null;

  // ===== glass (aurora) / luxe (noir): 다크 2단 박스 =====
  if (family === 'glass' || family === 'luxe') {
    const isGlass = family === 'glass';
    const box = isGlass
      ? 'bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-[var(--radius-lg)] p-8'
      : 'border border-[var(--color-accent)]/25 p-8';
    const h3 = isGlass ? 'text-xl font-bold text-white' : 'text-xl font-serif text-[var(--color-accent)]';
    return (
      <section id="hours" className={`${isGlass ? 'aurora-bg' : 'bg-black grain-overlay'} py-24 md:py-32`}>
        <Container maxWidth="narrow" className="relative z-10">
          <Reveal>
            <h2 className={`${heading} mb-16 text-center text-white`}>{data.title}</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className={box}>
                <h3 className={`mb-6 ${h3}`}>영업시간</h3>
                {renderHoursList()}
                {renderClosedDays('border-white/15')}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className={box}>
                <h3 className={`mb-6 ${h3}`}>예약 방법</h3>
                {renderBookingList()}
              </div>
            </Reveal>
          </div>
          {renderNotes()}
          {renderParking()}
        </Container>
      </section>
    );
  }

  // ===== centered (minimal, typography): 박스 없이 중앙 1열 =====
  if (family === 'centered') {
    const bigHours = variant === 'typography';
    return (
      <Section id="hours" background={getSectionBackground(variant)}>
        <Container maxWidth="narrow">
          <h2 className={`${heading} mb-16 text-center ${text.heading}`}>{data.title}</h2>
          <div className="max-w-xl mx-auto">
            <h3 className={`text-center mb-6 font-semibold ${text.heading} ${bigHours ? 'text-2xl uppercase tracking-tight' : 'text-lg tracking-[0.1em]'}`}>
              영업시간
            </h3>
            <div className="mb-12">
              <ul className={bigHours ? 'space-y-4' : 'space-y-3'}>
                {data.hours.map((hour, index) => (
                  <li
                    key={index}
                    className={`flex justify-between py-3 border-b ${dark ? 'border-white/15' : 'border-[var(--color-text-tertiary)]'} ${bigHours ? 'text-xl' : ''} ${text.heading}`}
                  >
                    <span className="font-medium">{hour.day}</span>
                    <span className={text.muted}>{hour.time}</span>
                  </li>
                ))}
              </ul>
              {renderClosedDays(dark ? 'border-white/15' : 'border-[var(--color-text-tertiary)]')}
            </div>
            <h3 className={`text-center mb-6 font-semibold ${text.heading} ${bigHours ? 'text-2xl uppercase tracking-tight' : 'text-lg tracking-[0.1em]'}`}>
              예약 방법
            </h3>
            <div className="max-w-sm mx-auto">{renderBookingList()}</div>
          </div>
          {renderNotes()}
          {renderParking()}
        </Container>
      </Section>
    );
  }

  // ===== overlay (fullscreen): 어두운 배경 2단 =====
  if (family === 'overlay') {
    return (
      <section id="hours" className="bg-[var(--color-almost-black)] py-20 md:py-[80px]">
        <Container maxWidth="narrow">
          <h2 className={`${heading} mb-16 text-center text-white`}>{data.title}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className={boxClass}>
              <h3 className={`text-xl font-bold mb-6 ${text.heading}`}>영업시간</h3>
              {renderHoursList()}
              {renderClosedDays('border-white/15')}
            </div>
            <div className={boxClass}>
              <h3 className={`text-xl font-bold mb-6 ${text.heading}`}>예약 방법</h3>
              {renderBookingList()}
            </div>
          </div>
          {renderNotes()}
          {renderParking()}
        </Container>
      </section>
    );
  }

  // ===== split + card: 회색/흰 박스 2단 =====
  return (
    <Section id="hours" background={getSectionBackground(variant)}>
      <Container maxWidth="narrow">
        <h2 className={`${heading} mb-16 ${variant === 'classic' ? 'text-center' : 'text-left'} ${text.heading}`}>
          {data.title}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className={boxClass}>
            <h3 className={`text-xl font-bold mb-6 ${text.heading}`}>영업시간</h3>
            {renderHoursList()}
            {renderClosedDays('border-[var(--color-text-tertiary)]')}
          </div>
          <div className={boxClass}>
            <h3 className={`text-xl font-bold mb-6 ${text.heading}`}>예약 방법</h3>
            {renderBookingList()}
          </div>
        </div>
        {renderNotes()}
        {renderParking()}
      </Container>
    </Section>
  );
}
