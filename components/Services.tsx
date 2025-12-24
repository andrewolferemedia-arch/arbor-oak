import React, { useState } from 'react';
import { Camera, Video, Briefcase, User, Facebook, Linkedin, Twitter, Link as LinkIcon, Check, Zap, Youtube, Package, Film, ArrowRight } from 'lucide-react';
import { SERVICES, COMPANY_NAME } from '../constants';

interface ServicesProps {
  onBook: (serviceName: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onBook }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera': return <Camera size={32} />;
      case 'Video': return <Video size={32} />;
      case 'User': return <User size={32} />;
      case 'Youtube': return <Youtube size={32} />;
      case 'Package': return <Package size={32} />;
      case 'Film': return <Film size={32} />;
      default: return <Briefcase size={32} />;
    }
  };

  const handleShare = (platform: string, service: any) => {
    const url = window.location.href; 
    const text = `Check out ${service.title} services by ${COMPANY_NAME}`;
    
    let shareUrl = '';
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
            break;
        case 'copy':
            navigator.clipboard.writeText(`${text} - ${url}`);
            setCopiedId(service.id);
            setTimeout(() => setCopiedId(null), 2000);
            return;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className="py-20 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Header Text */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-4xl font-serif text-white leading-tight">
              Comprehensive <span className="text-brand-accent">Media Solutions</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              We don't just take photos; we create assets that sell properties. Whether you are an agent or a commercial developer, our media is the hub of your marketing strategy.
            </p>
            
            <div className="space-y-4 mt-8">
                {/* Speed Box */}
                <div className="p-5 bg-brand-accent/10 border border-brand-accent/30 rounded-lg">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                    <Zap size={20} className="text-yellow-400 fill-yellow-400" /> Speed Guarantee
                  </h4>
                  <p className="text-xs text-gray-300">
                    We know time kills deals. That's why we deliver <span className="text-white font-bold">Listing Photos in 12-24 hours</span>.
                  </p>
                </div>
            </div>
          </div>

          {/* Service Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <div 
                key={service.id}
                className={`p-8 rounded transition-all duration-300 flex flex-col group relative ${
                  service.id === 'bundle' 
                    ? 'bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 border-2 border-brand-accent shadow-[0_0_20px_rgba(197,160,101,0.2)]' 
                    : 'bg-brand-primary/10 border border-brand-accent/10 hover:bg-brand-primary/20'
                }`}
              >
                {service.id === 'bundle' && (
                  <div className="absolute top-0 right-0 bg-brand-accent text-brand-dark text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg">
                    Best Value
                  </div>
                )}

                <div className={`${service.id === 'bundle' ? 'text-brand-accent' : 'text-brand-accent'} mb-4 group-hover:scale-110 transition-transform origin-left`}>
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                
                {/* Social Share Row */}
                <div className="flex items-center gap-3 mb-4 pt-4 border-t border-brand-accent/10">
                   <span className="text-xs text-brand-gray uppercase tracking-wider font-bold">Share:</span>
                   <div className="flex gap-2">
                      <button onClick={() => handleShare('facebook', service)} className="text-gray-500 hover:text-white transition-colors"><Facebook size={16} /></button>
                      <button onClick={() => handleShare('linkedin', service)} className="text-gray-500 hover:text-white transition-colors"><Linkedin size={16} /></button>
                      <button onClick={() => handleShare('twitter', service)} className="text-gray-500 hover:text-white transition-colors"><Twitter size={16} /></button>
                      <button onClick={() => handleShare('copy', service)} className="text-gray-500 hover:text-white transition-colors">
                        {copiedId === service.id ? <Check size={16} className="text-green-500"/> : <LinkIcon size={16} />}
                      </button>
                   </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className={`font-semibold ${service.id === 'bundle' ? 'text-brand-accent text-lg' : 'text-brand-light'}`}>
                    {service.price}
                  </span>
                  <button 
                    onClick={() => onBook(service.title)}
                    className="text-xs text-brand-accent uppercase font-bold tracking-wider hover:text-white transition-colors flex items-center gap-1"
                  >
                    {service.id === 'bundle' ? 'Get The Kit' : 'Book Now'} <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services;