import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'default' | 'narrow' | 'wide';
}

export default function Container({
  children,
  className = '',
  maxWidth = 'default',
}: ContainerProps) {
  const maxWidthStyles = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1400px]',
  };

  return (
    <div
      className={`mx-auto px-6 md:px-8 ${maxWidthStyles[maxWidth]} ${className}`}
    >
      {children}
    </div>
  );
}
