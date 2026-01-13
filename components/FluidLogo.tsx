import React from 'react';

interface FluidLogoProps {
  className?: string;
  size?: number;
}

const FluidLogo: React.FC<FluidLogoProps> = ({ className = "w-8 h-8", size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="fluidLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <path 
        d="M55 20 H90 A5 5 0 0 1 90 35 H55 A5 5 0 0 1 55 20 Z" 
        transform="skewX(-20)" 
        fill="url(#fluidLogoGradient)" 
      />
      <path 
        d="M40 42 H85 A5 5 0 0 1 85 57 H40 A5 5 0 0 1 40 42 Z" 
        transform="skewX(-20)" 
        fill="url(#fluidLogoGradient)" 
      />
    </svg>
  );
};

export default FluidLogo;