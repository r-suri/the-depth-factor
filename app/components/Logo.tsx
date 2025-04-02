import Image from 'next/image';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
  className?: string;
}

export default function Logo({ size = 'medium', withText = true, className = '' }: LogoProps) {
  const sizeMap = {
    small: 30,
    medium: 40,
    large: 60
  };

  const logoSize = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 transition-transform hover:scale-105 duration-300 ${className}`}>
      <div className="relative flex-shrink-0" style={{ width: logoSize, height: logoSize }}>
        <svg 
          viewBox="0 0 200 200" 
          width={logoSize} 
          height={logoSize}
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M82.3,121.4c-29.7-12.3-41.2-47.1-25.6-77C73.5,12.8,109.8,5.2,141.2,24.4c26.4,16.1,33.6,51.4,15.9,78.2c-10.8,16.4-27.8,25.3-43.7,26c-6.4,0.3-9.9,1.7-13.2,7.8c-5.1,9.5-10.8,18.7-16.4,27.9c-0.5,0.8-1.7,1.8-2.5,1.8c-10.9-0.1-21.7-0.3-33.2-0.5c9.1-14.5,17.7-28.2,26.3-41.9C76.6,120.4,79.4,118,82.3,121.4z" fill="#D05634"/>
          <path d="M82.1,121.2c-16.7-8.3-29.7-19.6-35.9-37.5C37.3,59,47.2,32.3,68.9,16.7c22.8-16.4,52.7-14.4,73.5,4.9c19.8,18.3,24.1,47.8,10,71.6c-4.2,7.1-10.3,12.5-16.9,17.5c-10.3,7.8-15.7,7.5-24-1.9C101,97.5,90.4,88.8,78.4,82c-3.1-1.7-5.1-1.5-7.3,1.1c-2.1,2.5-2.2,4.5,0.1,6.8c9.1,9.1,16.7,19.4,23.5,30.2C96.5,122.9,88.5,126.5,82.1,121.2z" fill="#2EA3A6"/>
          <path d="M111,93.2c7.7,0,13.9-6.2,13.9-13.9c0-7.7-6.2-13.9-13.9-13.9c-7.7,0-13.9,6.2-13.9,13.9C97.1,87,103.3,93.2,111,93.2z" fill="#FEFBF3"/>
          <path d="M75.9,93.2c7.7,0,13.9-6.2,13.9-13.9c0-7.7-6.2-13.9-13.9-13.9c-7.7,0-13.9,6.2-13.9,13.9C62,87,68.2,93.2,75.9,93.2z" fill="#FEFBF3"/>
          <path d="M76,89.8c5.8,0,10.5-4.7,10.5-10.5c0-5.8-4.7-10.5-10.5-10.5c-5.8,0-10.5,4.7-10.5,10.5C65.5,85.1,70.2,89.8,76,89.8z" fill="#2EA3A6"/>
          <path d="M111,89.8c5.8,0,10.5-4.7,10.5-10.5c0-5.8-4.7-10.5-10.5-10.5c-5.8,0-10.5,4.7-10.5,10.5C100.5,85.1,105.2,89.8,111,89.8z" fill="#D05634"/>
          <path d="M93.5,79.3h1c0-2,0-4,0-6c-1.6,0-3.2,0-4.8,0c0,2,0,4,0,6h1.9c0,1.3,0,2.7,0,4c0.7,0,1.3,0,1.9,0C93.5,82,93.5,80.7,93.5,79.3z" fill="#FEFBF3"/>
        </svg>
      </div>
      {withText && (
        <span className="font-semibold text-xl tracking-tight text-[var(--color-foreground)]">
          The Depth Factor
        </span>
      )}
    </div>
  );
} 