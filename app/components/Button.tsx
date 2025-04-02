import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  fullWidth = false,
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) {
  // Define variant styles
  const variantStyles = {
    primary: 'bg-[var(--color-cinnabar)] hover:bg-[#c04d2f] text-white',
    secondary: 'bg-[var(--color-verdigris)] hover:bg-[#289295] text-white',
    outline: 'bg-transparent border border-[var(--color-jet)] dark:border-[var(--color-floral-white)] text-[var(--color-jet)] dark:text-[var(--color-floral-white)] hover:bg-[var(--color-jet)] hover:dark:bg-[var(--color-floral-white)] hover:text-white hover:dark:text-[var(--color-jet)]',
  };

  // Define size styles
  const sizeStyles = {
    small: 'text-sm py-1.5 px-4',
    medium: 'text-base py-2.5 px-6',
    large: 'text-base py-3 px-8',
  };

  // Build class string
  const buttonClasses = `
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${fullWidth ? 'w-full' : ''}
    rounded-full
    font-medium
    transition-all
    duration-300
    focus:ring-2
    focus:ring-opacity-50
    focus:outline-none
    ${variant === 'primary' ? 'focus:ring-[var(--color-cinnabar)]' : ''}
    ${variant === 'secondary' ? 'focus:ring-[var(--color-verdigris)]' : ''}
    ${disabled ? 'opacity-50 cursor-not-allowed' : 'transform hover:-translate-y-1 hover:shadow-md'}
    ${className}
  `;

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
} 