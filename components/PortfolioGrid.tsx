import React, { useState } from 'react';
import { PORTFOLIO_IMAGES, COMPANY_NAME } from '../constants';
import { PortfolioItem } from '../types';
import { Facebook, Linkedin, Twitter, Link as LinkIcon, Check } from 'lucide-react';

const PortfolioGrid: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredImages = filter === 'all' 
    ? PORTFOLIO_IMAGES 
    : PORTFOLIO_IMAGES.filter(img => img.category === filter);

  const handleShare = (e: React.MouseEvent, platform: string, item: PortfolioItem) => {
    e.stopPropagation();
    const url = window.location.href; 
    const text = `Check out this ${item.title} by ${COMPANY_NAME}`;
    
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
            setCopiedId(item.id);
            setTimeout(() => setCopiedId(null), 2000);
            return;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const SocialButtons = ({ item, light = false }: { item: PortfolioItem, light?: boolean }) => (
    <div className="flex items-center justify-center gap-4 mt-3">
      <button 
        onClick={(e) => handleShare(e, 'facebook', item)}
        className={`${light ? 'text-gray-400 hover:text-brand-primary' : 'text-white hover:text-brand-accent'} transition-colors transform hover:scale-110`}
        title="Share on Facebook"
      >
        <Facebook size={18} />
      </button>
      <button 
        onClick={(e) => handleShare(e, 'linkedin', item)}
        className={`${light ? 'text-gray-400 hover:text-brand-primary' : 'text-white hover:text-brand-accent'} transition-colors transform hover:scale-110`}
        title="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </button>
      <button 
        onClick={(e) => handleShare(e, 'twitter', item)}
        className={`${light ? 'text-gray-400 hover:text-brand-primary' : 'text-white hover:text-brand-accent'} transition-colors transform hover:scale-110`}
        title="Share on X (Twitter)"
      >
        <Twitter size={18} />
      </button>
      <button 
        onClick={(e) => handleShare(e, 'copy', item)}
        className={`${light ? 'text-gray-400 hover:text-brand-primary' : 'text-white hover:text-brand-accent'} transition-colors transform hover:scale-110`}
        title="Copy Link"
      >
        {copiedId === item.id ? <Check size={18} className="text-green-500" /> : <LinkIcon size={18} />}
      </button>
    </div>
  );

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-brand-light">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-serif text-brand-dark">Selected Works</h2>
          <div className="h-1 w-20 bg-brand-accent mx-auto"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From luxury residential listings to commercial developments.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4">
          {['all', 'high-rise', 'residential', 'commercial', 'interior'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 border ${
                filter === cat
                  ? 'bg-brand-primary text-white border-brand-primary'
                  : 'bg-transparent text-brand-gray border-gray-300 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <div 
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-md cursor-pointer bg-gray-200"
              onClick={() => setSelectedImage(image)}
            >
              <img 
                src={image.src} 
                alt={image.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
              />
              <div className="absolute inset-0 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 p-4">
                  <h3 className="text-white font-serif text-xl">{image.title}</h3>
                  <span className="text-brand-accent text-sm uppercase tracking-widest mt-2 block mb-4">
                    {image.category.replace('-', ' ')}
                  </span>
                  {/* Share Buttons in Grid Overlay */}
                  <div onClick={(e) => e.stopPropagation()}>
                    <SocialButtons item={image} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-5xl w-full max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="relative flex-grow overflow-hidden flex items-center justify-center">
                <img 
                src={selectedImage.src} 
                alt={selectedImage.title} 
                className="w-auto h-auto max-w-full max-h-[80vh] object-contain rounded-sm shadow-2xl" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/800x600?text=Image+Not+Found';
                }}
                />
            </div>
            
            <div className="mt-4 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
               <div className="text-center md:text-left">
                    <h3 className="text-white font-serif text-2xl">{selectedImage.title}</h3>
                    <p className="text-brand-accent text-sm uppercase tracking-widest mt-1">
                        {selectedImage.category.replace('-', ' ')}
                    </p>
               </div>
               
               <div className="flex items-center gap-4">
                   <span className="text-gray-400 text-sm hidden md:inline">Share this:</span>
                   <SocialButtons item={selectedImage} />
               </div>
            </div>
            
            <button 
                className="absolute top-4 right-4 text-white hover:text-brand-accent p-2"
                onClick={() => setSelectedImage(null)}
            >
                <span className="text-4xl">&times;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGrid;