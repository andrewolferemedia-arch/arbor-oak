import React, { useState, useEffect } from 'react';
import { ArrowRight, Zap, Youtube } from 'lucide-react';
import { HERO_IMAGES, TAGLINE, SOCIAL_LINKS } from '../constants';

interface HeroProps {
  onBookNow: () => void;
  onViewPortfolio: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBookNow, onViewPortfolio }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get YouTube Link from constants if available
  const youtubeLink = SOCIAL_LINKS.find(link => link.platform === 'YouTube')?.url || '#';

  // Cycle through the hero images if they exist
  useEffect(() => {
    if (HERO_IMAGES.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-brand-dark">
      
      {/* Background Slideshow */}
      {HERO_IMAGES.length > 0 && HERO_IMAGES.map((image, index) => (
        <div 
          key={image.src}
          className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-[2000ms] ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ 
            backgroundImage: `url(${image.src})`,
            transform: index === currentImageIndex ? 'scale(1.05)' : 'scale(1.0)',
            transition: 'opacity 2s ease-in-out, transform 10s ease-out'
          }}
        ></div>
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-brand-dark/60 via-brand-dark/40 to-brand-dark/90"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-6 animate-fade-in-up">
        
        {/* Location Badge */}
        <div className="flex flex-col items-center gap-3 mb-2">
            <div className="inline-block px-4 py-1 border border-brand-accent/50 rounded-full bg-brand-dark/40 backdrop-blur-md">
                <span className="text-brand-accent text-xs font-bold tracking-[0.2em] uppercase shadow-sm">
                    South Suburbs • Will County • Chicagoland
                </span>
            </div>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-tight drop-shadow-2xl">
          Arbor <span className="text-brand-accent">&</span> Oak
        </h1>
        
        <p className="text-sm md:text-base text-gray-200 font-medium tracking-[0.15em] max-w-3xl mx-auto pt-4 mt-2 uppercase font-sans opacity-90 drop-shadow-md">
          {TAGLINE}
        </p>
        
        <div className="flex flex-col items-center justify-center gap-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <button 
              onClick={onBookNow}
              className="group relative px-8 py-4 bg-brand-accent text-brand-dark font-bold tracking-wider rounded overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(197,160,101,0.5)] w-full md:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                BOOK A SHOOT <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
              </span>
            </button>
            
            <a 
              href={youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="group px-8 py-4 bg-red-700/90 text-white font-bold tracking-wider rounded hover:bg-red-600 transition-colors w-full md:w-auto flex items-center justify-center gap-2 shadow-lg"
            >
              <Youtube size={20} /> WATCH REELS
            </a>

            <button 
              onClick={onViewPortfolio}
              className="group px-8 py-4 bg-transparent border border-white text-white font-medium tracking-wider rounded hover:bg-white/10 transition-colors w-full md:w-auto flex items-center justify-center gap-2 backdrop-blur-sm"
            >
              VIEW PORTFOLIO
            </button>
          </div>

          {/* Speed Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/90 border border-brand-accent/50 backdrop-blur-md rounded shadow-lg transform hover:scale-105 transition-transform">
               <Zap size={14} className="fill-brand-accent text-brand-accent" />
               <span className="text-xs font-bold tracking-widest uppercase text-white">
                  ⚡ 12-24hr Turnaround
              </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;