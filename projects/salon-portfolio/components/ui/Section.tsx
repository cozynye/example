import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: 'white' | 'gray' | 'dark';
}

export default function Section({
  children,
  id,
  className = '',
  background = 'white',
}: SectionProps) {
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-[var(--color-light-gray)]',
    dark: 'bg-[var(--color-almost-black)] text-white',
  };

  return (
    <section
      id={id}
      className={`py-20 md:py-[80px] ${backgroundStyles[background]} ${className}`}
    >
      {children}
    </section>
  );
}
