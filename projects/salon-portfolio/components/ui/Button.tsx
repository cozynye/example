import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  onClick,
  className = '',
}: ButtonProps) {
  // Base styles with keyboard focus support
  const baseStyles =
    'inline-flex items-center justify-center font-semibold rounded-[var(--radius-md)] transition-all duration-[var(--transition-base)] cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-primary)]/30 focus-visible:ring-offset-2';

  // Variant styles
  const variantStyles = {
    primary:
      'bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:opacity-80',
    secondary:
      'bg-transparent border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
    ghost:
      'bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-light-gray)]',
  };

  // Size styles
  const sizeStyles = {
    small: 'h-9 px-4 text-sm',
    medium: 'h-11 px-6 text-base',
    large: 'h-[52px] px-8 text-lg',
  };

  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // Render as link if href is provided
  if (href) {
    return (
      <a href={href} className={buttonClasses}>
        {children}
      </a>
    );
  }

  // Render as button
  return (
    <button onClick={onClick} className={buttonClasses}>
      {children}
    </button>
  );
}
