import React from 'react';
import { Camera, Video, MessageSquare, Globe, MapPin, Instagram, Linkedin, Facebook, Youtube, Share2, Download, Zap } from 'lucide-react';
import { COMPANY_NAME, SOCIAL_LINKS } from '../constants';
import Logo from './Logo';

const LinkHub: React.FC = () => {
  const links = [
    { 
      label: 'Book a Shoot Now', 
      sub: 'Priority 12-24hr Turnaround',
      icon: <Zap size={20} className="text-brand-dark" />, 
      action: () => window.location.href = 'mailto:bookings@arboroak.com?subject=Booking Request',
      primary: true
    },
    { 
      label: 'View Portfolio', 
      sub: 'Luxury & Commercial Gallery',
      icon: <Video size={20} />, 
      action: () => window.location.href = '/#portfolio',
      primary: false
    },
    { 
      label: 'Text Me Directly', 
      sub: 'Fast Response for Agents',
      icon: <MessageSquare size={20} />, 
      action: () => window.location.href = 'sms:5551234567',
      primary: false
    },
    { 
      label: 'Visit Main Website', 
      sub: 'Full Service Catalog & AI Tools',
      icon: <Globe size={20} />, 
      action: () => window.location.href = '/',
      primary: false
    }
  ];

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: COMPANY_NAME,
        text: 'Premium Real Estate Media in Chicago & Will County.',
        url: window.location.href,
      });
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center py-12 px-6 relative overflow-hidden selection:bg-brand-accent selection:text-brand-dark">
      
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[40%] bg-gradient-to-b from-brand-primary/30 to-transparent blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-[40%] bg-gradient-to-t from-brand-accent/10 to-transparent blur-[120px] rounded-full pointer-events-none"></div>

      {/* Header Section */}
      <div className="z-10 flex flex-col items-center text-center space-y-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-accent to-brand-primary rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative w-28 h-28 bg-brand-light rounded-full flex items-center justify-center shadow-2xl border-4 border-brand-accent/20">
            <Logo className="w-16 h-16" color="dark" />
            <div className="absolute bottom-1 right-1 w-7 h-7 bg-brand-accent border-4 border-brand-dark rounded-full flex items-center justify-center shadow-lg">
              <Zap size={12} className="text-brand-dark fill-brand-dark" />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-serif text-white tracking-wider font-bold">{COMPANY_NAME}</h1>
          <div className="flex items-center justify-center gap-2">
            <span className="h-px w-4 bg-brand-accent/50"></span>
            <p className="text-brand-accent text-xs font-bold uppercase tracking-[0.3em]">Premium Media Partner</p>
            <span className="h-px w-4 bg-brand-accent/50"></span>
          </div>
        </div>

        <p className="text-gray-400 text-sm max-w-xs leading-relaxed font-medium">
          Elevating listings with high-end visuals in the South Suburbs & Will County.
        </p>
      </div>

      {/* Links Stack */}
      <div className="w-full max-w-md space-y-4 z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
        {links.map((link, idx) => (
          <button
            key={idx}
            onClick={link.action}
            className={`w-full p-5 rounded-2xl flex items-center gap-5 transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] ${
              link.primary 
                ? 'bg-gradient-to-r from-brand-accent to-[#d4b075] text-brand-dark shadow-[0_10px_30px_rgba(197,160,101,0.3)] font-bold' 
                : 'bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-xl group'
            }`}
          >
            <div className={`p-3 rounded-xl flex-shrink-0 transition-colors ${link.primary ? 'bg-brand-dark/10' : 'bg-brand-accent/10 text-brand-accent group-hover:bg-brand-accent group-hover:text-brand-dark'}`}>
              {link.icon}
            </div>
            <div className="text-left flex-grow">
              <h3 className="text-base leading-none mb-1">{link.label}</h3>
              <p className={`text-[11px] uppercase tracking-wider font-bold ${link.primary ? 'text-brand-dark/70' : 'text-gray-500'}`}>{link.sub}</p>
            </div>
            <div className={`opacity-30 group-hover:opacity-100 transition-opacity ${link.primary ? 'text-brand-dark' : 'text-brand-accent'}`}>
              <Share2 size={16} />
            </div>
          </button>
        ))}
      </div>

      {/* Quick Action Row */}
      <div className="flex gap-4 mt-8 z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
        <button 
          onClick={handleShare}
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 flex flex-col items-center justify-center gap-1 text-white hover:bg-white/10 transition-all"
        >
          <Share2 size={20} className="text-brand-accent" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Share Hub</span>
        </button>
        <button 
          className="flex-1 bg-white/5 border border-white/10 rounded-2xl py-4 flex flex-col items-center justify-center gap-1 text-white hover:bg-white/10 transition-all"
          onClick={() => alert("Business card feature coming soon! You can screenshot the hub for now.")}
        >
          <Download size={20} className="text-brand-accent" />
          <span className="text-[10px] font-bold uppercase tracking-widest">Save Contact</span>
        </button>
      </div>

      {/* Social Row */}
      <div className="flex gap-8 mt-12 z-10 animate-in fade-in duration-1000 delay-500">
         {SOCIAL_LINKS.filter(l => l.platform !== 'Facebook' || l.handle.includes('Media')).map(link => (
            <a 
              key={link.platform} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-brand-accent transition-all transform hover:scale-125 hover:-translate-y-1"
              title={link.platform}
            >
                {link.platform === 'Instagram' && <Instagram size={24} />}
                {link.platform === 'LinkedIn' && <Linkedin size={24} />}
                {link.platform === 'Facebook' && <Facebook size={24} />}
                {link.platform === 'YouTube' && <Youtube size={24} />}
            </a>
         ))}
      </div>

      <div className="mt-auto pt-16 text-center z-10">
        <div className="flex items-center justify-center gap-2 text-gray-600 text-[10px] font-bold uppercase tracking-[0.4em]">
           <MapPin size={12} className="text-brand-accent" /> Chicago • Will County • NWI
        </div>
        <p className="text-gray-700 text-[9px] mt-4 uppercase tracking-widest font-bold">
          &copy; {new Date().getFullYear()} {COMPANY_NAME} • Built for the Elite
        </p>
      </div>

    </div>
  );
};

export default LinkHub;