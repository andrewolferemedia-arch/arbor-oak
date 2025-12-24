import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Linkedin, Facebook, Lock, CreditCard, Youtube } from 'lucide-react';
import { COMPANY_NAME, SOCIAL_LINKS } from '../constants';
import Logo from './Logo';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'services', label: 'Services' },
    { id: 'marketing', label: 'Marketing Suite' },
    { id: 'contact', label: 'Book Now' },
  ];

  // If we are in the operator engine or studio, show minimal layout
  if (activeTab === 'wholesale_engine' || activeTab === 'card_studio') {
    return (
      <div className="min-h-screen bg-gray-900">
        <nav className="bg-gray-800 text-white p-4 border-b border-gray-700 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <Logo className="w-8 h-8" color="gold" />
                <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Operator Mode</span>
            </div>
            <div className="flex gap-4">
                <button 
                  onClick={() => setActiveTab('wholesale_engine')}
                  className={`text-xs uppercase font-bold ${activeTab === 'wholesale_engine' ? 'text-green-400' : 'text-gray-500'}`}
                >
                    Deals
                </button>
                <button 
                  onClick={() => setActiveTab('card_studio')}
                  className={`text-xs uppercase font-bold ${activeTab === 'card_studio' ? 'text-green-400' : 'text-gray-500'}`}
                >
                    Cards
                </button>
            </div>
        </nav>
        {children}
        <button 
          onClick={() => setActiveTab('home')}
          className="fixed bottom-4 right-4 text-gray-600 hover:text-white text-xs uppercase bg-black/50 px-3 py-1 rounded"
        >
          Exit System
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navigation */}
      <nav 
        className={`fixed w-full z-50 transition-all duration-300 border-b border-brand-accent/20 ${
          scrolled ? 'bg-brand-dark/95 text-white backdrop-blur-md py-2 shadow-xl' : 'bg-brand-dark text-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => setActiveTab('home')}
            >
              <div className="p-1 rounded-full group-hover:bg-brand-accent/10 transition-colors">
                <Logo className="w-10 h-10 md:w-12 md:h-12" color="gold" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-serif text-lg sm:text-2xl font-semibold tracking-wider text-brand-light leading-none">
                  {COMPANY_NAME}
                </span>
                <span className="text-[0.5rem] sm:text-[0.6rem] font-sans font-bold tracking-[0.25em] text-brand-accent/80 uppercase mt-1 group-hover:text-brand-accent transition-colors">
                  Real Estate Media
                </span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-xs lg:text-sm font-bold tracking-widest uppercase hover:text-brand-accent transition-colors ${
                    activeTab === item.id ? 'text-brand-accent' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-brand-accent transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark border-t border-brand-accent/20 shadow-xl">
            <div className="px-4 py-6 space-y-4 flex flex-col items-center">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-sm font-bold tracking-widest uppercase py-2 hover:text-brand-accent transition-colors ${
                    activeTab === item.id ? 'text-brand-accent' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12 border-t border-brand-accent/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2 mb-4">
                  <Logo className="w-8 h-8" color="gold" />
                  <h3 className="font-serif text-xl font-bold">{COMPANY_NAME}</h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                Premium real estate media services for agents, developers, and investors in the Chicagoland area.
              </p>
            </div>
            
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-brand-accent">Follow Us</h4>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((link) => (
                   <a 
                     key={link.platform}
                     href={link.url} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-gray-400 hover:text-white transition-colors"
                   >
                     {link.platform === 'Instagram' && <Instagram size={20} />}
                     {link.platform === 'Facebook' && <Facebook size={20} />}
                     {link.platform === 'LinkedIn' && <Linkedin size={20} />}
                     {link.platform === 'YouTube' && <Youtube size={20} />}
                   </a>
                ))}
              </div>
            </div>

            <div className="text-gray-400 text-sm">
              <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-brand-accent">Contact</h4>
              <p>bookings@arboroakrealestatemedia.com</p>
              <p>(555) 123-4567</p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
            <span>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</span>
            
            <div className="flex gap-4">
               {/* Link Hub Access (Public) */}
               <button 
                onClick={() => setActiveTab('link_hub')} 
                className="hover:text-white transition-colors flex items-center gap-1"
                title="Link in Bio"
               >
                <CreditCard size={12} />
               </button>

               {/* Operator Access (Hidden) */}
               <button 
                onClick={() => setActiveTab('wholesale_engine')} 
                className="opacity-20 hover:opacity-100 transition-opacity"
                title="Operator Access"
               >
                <Lock size={12} />
               </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;