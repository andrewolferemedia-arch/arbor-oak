import React from 'react';

interface LogoProps {
  className?: string;
  color?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-12 h-12", color = 'gold' }) => {
  const presets: Record<string, string> = {
    gold: '#c5a065',
    dark: '#1a2e1a',
    light: '#f4f4f0'
  };

  const getColor = () => {
    if (presets[color]) return presets[color];
    return color; 
  };

  const fill = getColor();
  
  // Secondary element color logic:
  // If the main color is the dark preset, use the gold accent.
  // Otherwise default to the dark brand color (works well on light/gold backgrounds).
  const secondaryFill = color === 'dark' ? '#c5a065' : '#1a2e1a';

  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Circle Border (Optional, can be removed for cleaner look) */}
      <circle cx="50" cy="50" r="48" stroke={fill} strokeWidth="2" className="opacity-20" />
      
      {/* The 'A' */}
      <path d="M50 15 L75 85 H65 L58 65 H42 L35 85 H25 L50 15 Z" fill={fill} className="opacity-90"/>
      <path d="M44 58 H56 L50 38 L44 58 Z" fill={secondaryFill} />

      {/* The 'O' intertwined */}
      <path d="M50 25 C30 25 20 40 20 55 C20 75 35 85 50 85 C65 85 80 75 80 55 C80 40 70 25 50 25 M50 32 C65 32 72 45 72 55 C72 70 60 78 50 78 C40 78 28 70 28 55 C28 45 35 32 50 32" 
            fill={fill} fillRule="evenodd" className="opacity-80" />

      {/* The Oak Leaf Accent */}
      <path d="M50 55 Q 60 45, 85 40 Q 75 50, 78 60 Q 65 60, 60 75 Q 55 60, 50 55" fill={fill} />
    </svg>
  );
};

export default Logo;