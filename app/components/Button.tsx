import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className = '',
  ...props
}) => {
  // Base styles for all button variants
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Variant styles with enhanced contrast
  const variantClasses = {
    primary: 'bg-[var(--color-cinnabar)] text-white hover:bg-[var(--color-cinnabar-dark)] hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:ring-[var(--color-cinnabar)]',
    secondary: 'bg-[var(--color-verdigris)] text-white hover:bg-[var(--color-verdigris-dark)] hover:-translate-y-0.5 shadow-md hover:shadow-lg focus:ring-[var(--color-verdigris)]',
    outline: 'border-2 border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:-translate-y-0.5 focus:ring-[var(--foreground)]',
  };
  
  // Size styles
  const sizeClasses = {
    small: 'text-xs px-3 py-1.5 space-x-1.5',
    medium: 'text-sm px-4 py-2 space-x-2',
    large: 'text-base px-6 py-3 space-x-3',
  };
  
  // Width styles
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Disabled styles
  const disabledClasses = props.disabled
    ? 'opacity-70 cursor-not-allowed pointer-events-none'
    : '';
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button; 