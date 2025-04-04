import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  className?: string;
  animation?: 'pulse' | 'bounce' | 'shine' | 'none';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  animation = 'none',
  className = '',
  ...props
}) => {
  // Base styles for all button variants with improved transitions
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden';
  
  // Enhanced variant styles with better hover effects
  const variantClasses = {
    primary: 'bg-[var(--color-cinnabar)] text-white hover:bg-[var(--color-cinnabar-dark)] hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-lg focus:ring-[var(--color-cinnabar)] active:translate-y-0 active:scale-95',
    secondary: 'bg-[var(--color-verdigris)] text-white hover:bg-[var(--color-verdigris-dark)] hover:-translate-y-1 hover:scale-105 shadow-md hover:shadow-lg focus:ring-[var(--color-verdigris)] active:translate-y-0 active:scale-95',
    outline: 'border-2 border-[var(--foreground)] text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] hover:-translate-y-1 hover:scale-105 focus:ring-[var(--foreground)] active:translate-y-0 active:scale-95',
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
  
  // Animation classes
  const animationClasses = {
    none: '',
    pulse: 'hover:animate-pulse',
    bounce: 'hover:animate-bounce',
    shine: 'shine-effect', // Custom animation with pseudo-element
  };

  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${disabledClasses} ${animationClasses[animation]} ${className}`;
  
  return (
    <button
      className={buttonClasses}
      {...props}
    >
      {children}
      {animation === 'shine' && (
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -inset-[40%] top-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shine-animation"></span>
        </span>
      )}
    </button>
  );
};

export default Button; 