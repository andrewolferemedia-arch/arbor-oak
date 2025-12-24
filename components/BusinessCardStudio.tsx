import React, { useState, useRef } from 'react';
import Logo from './Logo';
import { Phone, Mail, Globe, MapPin, QrCode, Download, ChevronRight, User, Hash, Upload, Image as ImageIcon, Type, Move, Palette, Sliders, Layers, LayoutTemplate, Crosshair, Plus } from 'lucide-react';

const BusinessCardStudio: React.FC = () => {
  const [details, setDetails] = useState({
    name: 'Andre Wolfe',
    title: 'Real Estate Media Specialist',
    phone: '(555) 123-4567',
    email: 'bookings@arboroakrealestatemedia.com',
    website: 'arboroakrealestatemedia.com'
  });

  const [activeTab, setActiveTab] = useState<'cards' | 'watermark'>('cards');

  // --- WATERMARK STATE ---
  const [wm, setWm] = useState({
    variation: 'combined' as 'icon' | 'text' | 'combined',
    size: 200, // Pixel width reference
    opacity: 1,
    x: 50, // %
    y: 50, // %
    color: 'gold' as string,
    bgMode: 'color' as 'color' | 'image',
    bgColor: '#1a2e1a',
    bgImage: null as string | null
  });
  
  const [isDragging, setIsDragging] = useState(false);
  const [activeSnapX, setActiveSnapX] = useState<number | null>(null);
  const [activeSnapY, setActiveSnapY] = useState<number | null>(null);
  
  const wmFileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleWmChange = (key: string, value: any) => {
    setWm(prev => ({ ...prev, [key]: value }));
  };

  const handleWmImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setWm(prev => ({ ...prev, bgImage: ev.target?.result as string, bgMode: 'image' }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to resolve preset names to hex
  const resolveColor = (c: string) => {
    switch(c) {
      case 'gold': return '#c5a065';
      case 'light': return '#f4f4f0';
      case 'dark': return '#1a2e1a';
      default: return c;
    }
  };

  // --- DRAG LOGIC ---
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !previewContainerRef.current) return;
    
    const rect = previewContainerRef.current.getBoundingClientRect();
    const xRaw = ((e.clientX - rect.left) / rect.width) * 100;
    const yRaw = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Clamp values
    let x = Math.max(0, Math.min(100, xRaw));
    let y = Math.max(0, Math.min(100, yRaw));
    
    // Snapping Logic (Grid + Center)
    const SNAP_THRESHOLD = 2.5; // Snap sensitivity
    // Expanded grid lines: 10%, 25%, 50%, 75%, 90%
    const SNAP_POINTS = [10, 25, 50, 75, 90]; 
    
    let snapX: number | null = null;
    let snapY: number | null = null;

    // Check X
    for (const p of SNAP_POINTS) {
      if (Math.abs(x - p) < SNAP_THRESHOLD) {
        x = p;
        snapX = p;
        break;
      }
    }

    // Check Y
    for (const p of SNAP_POINTS) {
      if (Math.abs(y - p) < SNAP_THRESHOLD) {
        y = p;
        snapY = p;
        break;
      }
    }

    setActiveSnapX(snapX);
    setActiveSnapY(snapY);
    
    setWm(prev => ({ ...prev, x, y }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveSnapX(null);
    setActiveSnapY(null);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setActiveSnapX(null);
    setActiveSnapY(null);
  };

  // --- REUSABLE COMPONENTS ---
  const CardContainer = ({ children, className = "" }: any) => (
    <div className={`relative w-full aspect-[1.75/1] shadow-2xl rounded-sm overflow-hidden flex flex-col transition-all duration-300 ${className}`}>
      {children}
    </div>
  );

  const VerticalCardContainer = ({ children, className = "" }: any) => (
    <div className={`relative w-full aspect-[1/1.75] shadow-2xl rounded-sm overflow-hidden flex flex-col transition-all duration-300 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-800 pb-20 selection:bg-brand-accent selection:text-brand-dark">
      
      {/* TOOLBAR */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h1 className="text-xl font-serif font-bold text-brand-dark flex items-center gap-2">
              <Logo className="w-8 h-8" color="dark" /> Brand Asset Studio
            </h1>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
               <button 
                onClick={() => setActiveTab('cards')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'cards' ? 'bg-white shadow text-brand-primary' : 'text-gray-500'}`}
               >
                 Business Cards
               </button>
               <button 
                onClick={() => setActiveTab('watermark')}
                className={`px-4 py-2 rounded-md text-sm font-bold transition-colors ${activeTab === 'watermark' ? 'bg-white shadow text-brand-primary' : 'text-gray-500'}`}
               >
                 Watermark / Logo
               </button>
            </div>
          </div>

          {/* EDIT DETAILS FORM (Only for cards) */}
          {activeTab === 'cards' && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-5 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="md:col-span-1 flex items-center">
                  <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">Live<br/>Preview<br/>Editor</span>
              </div>
              <div className="relative">
                  <User size={14} className="absolute top-3 left-3 text-gray-400" />
                  <input name="name" value={details.name} onChange={handleChange} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:border-brand-primary outline-none" placeholder="Name" />
              </div>
              <div className="relative">
                  <Hash size={14} className="absolute top-3 left-3 text-gray-400" />
                  <input name="title" value={details.title} onChange={handleChange} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:border-brand-primary outline-none" placeholder="Title" />
              </div>
              <div className="relative">
                  <Phone size={14} className="absolute top-3 left-3 text-gray-400" />
                  <input name="phone" value={details.phone} onChange={handleChange} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:border-brand-primary outline-none" placeholder="Phone" />
              </div>
              <div className="relative">
                  <Mail size={14} className="absolute top-3 left-3 text-gray-400" />
                  <input name="email" value={details.email} onChange={handleChange} className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded focus:border-brand-primary outline-none" placeholder="Email" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        
        {activeTab === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* DESIGN 1: THE EXECUTIVE */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <h3 className="font-serif text-lg font-bold text-brand-dark">01. The Executive</h3>
                 <span className="text-xs uppercase bg-brand-dark text-white px-2 py-1 rounded">Classic</span>
               </div>
               
               {/* Front */}
               <CardContainer className="bg-brand-dark border-b-4 border-brand-accent">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent"></div>
                  <div className="flex-grow flex flex-col items-center justify-center relative z-10">
                     <Logo className="w-20 h-20 mb-3" color="gold" />
                     <h2 className="text-brand-accent font-serif text-2xl tracking-[0.1em]">ARBOR & OAK</h2>
                     <p className="text-gray-400 text-[10px] uppercase tracking-[0.4em] mt-1">Real Estate Media</p>
                  </div>
               </CardContainer>
               
               {/* Back */}
               <CardContainer className="bg-white border-b-4 border-brand-dark p-8 flex-row items-center">
                  <div className="w-2/3 pr-4">
                     <h3 className="font-serif text-xl font-bold text-brand-dark">{details.name}</h3>
                     <p className="text-brand-primary text-[10px] font-bold uppercase tracking-wider mb-6">{details.title}</p>
                     
                     <div className="space-y-2 text-gray-600">
                        <div className="flex items-center gap-2 text-[11px]"><Phone size={12} className="text-brand-accent"/> {details.phone}</div>
                        <div className="flex items-center gap-2 text-[11px]"><Mail size={12} className="text-brand-accent"/> {details.email}</div>
                        <div className="flex items-center gap-2 text-[11px]"><Globe size={12} className="text-brand-accent"/> {details.website}</div>
                     </div>
                  </div>
                  <div className="w-1/3 border-l border-gray-100 pl-4 flex flex-col items-center justify-center h-full">
                      <div className="bg-gray-900 p-2 rounded">
                        <QrCode className="text-white w-16 h-16" />
                      </div>
                      <span className="text-[9px] text-gray-400 mt-2 uppercase">Connect</span>
                  </div>
               </CardContainer>
            </div>


            {/* DESIGN 2: THE MODERNIST */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <h3 className="font-serif text-lg font-bold text-brand-dark">02. The Modernist</h3>
                 <span className="text-xs uppercase bg-gray-200 text-gray-600 px-2 py-1 rounded">Clean</span>
               </div>
               
               {/* Front */}
               <CardContainer className="bg-brand-light">
                  <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary transform skew-x-[-20deg] translate-x-12"></div>
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                     <div className="bg-white/90 backdrop-blur shadow-xl p-6 rounded-full">
                        <Logo className="w-12 h-12" color="dark" />
                     </div>
                  </div>
               </CardContainer>

               {/* Back */}
               <CardContainer className="bg-white p-8">
                  <div className="h-full flex flex-col justify-between">
                     <div className="flex justify-between items-start">
                        <div>
                           <h3 className="font-sans font-black text-2xl text-brand-dark uppercase tracking-tight">{details.name}</h3>
                           <p className="text-gray-400 text-xs font-bold">{details.title}</p>
                        </div>
                        <Logo className="w-8 h-8 opacity-20" color="dark" />
                     </div>

                     <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="space-y-1">
                           <p className="text-[9px] font-bold text-gray-300 uppercase">Contact</p>
                           <p className="text-[11px] font-bold text-brand-dark">{details.phone}</p>
                           <p className="text-[11px] font-bold text-brand-dark">{details.email}</p>
                        </div>
                        <div className="space-y-1 text-right">
                           <p className="text-[9px] font-bold text-gray-300 uppercase">Portfolio</p>
                           <p className="text-[11px] font-bold text-brand-dark">{details.website}</p>
                           <p className="text-[11px] font-bold text-brand-dark">@arboroakmedia</p>
                        </div>
                     </div>
                  </div>
               </CardContainer>
            </div>

            {/* DESIGN 3: THE CREATIVE (Vertical) */}
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <h3 className="font-serif text-lg font-bold text-brand-dark">03. The Vertical</h3>
                 <span className="text-xs uppercase bg-brand-accent text-brand-dark px-2 py-1 rounded">Trendy</span>
               </div>
               
               <div className="flex gap-4">
                  {/* Front */}
                  <VerticalCardContainer className="bg-brand-dark items-center justify-center p-6 text-center">
                     <div className="border border-brand-accent/30 p-8 w-full h-full flex flex-col items-center justify-center">
                       <Logo className="w-16 h-16 mb-6" color="gold" />
                       <h2 className="text-white font-serif text-xl leading-none">ARBOR</h2>
                       <span className="text-brand-accent font-serif text-lg italic">&</span>
                       <h2 className="text-white font-serif text-xl leading-none">OAK</h2>
                     </div>
                  </VerticalCardContainer>

                  {/* Back */}
                  <VerticalCardContainer className="bg-brand-primary/10 items-center text-center p-8 bg-white">
                      <div className="mt-8">
                        <h3 className="font-serif text-lg font-bold text-brand-dark">{details.name}</h3>
                        <p className="text-[9px] uppercase tracking-widest text-brand-primary mt-1 mb-8">{details.title}</p>
                      </div>
                      
                      <div className="bg-white p-2 shadow-lg rounded-lg mb-6">
                         <QrCode className="w-24 h-24 text-brand-dark" />
                      </div>
                      
                      <div className="mt-auto space-y-1 text-[10px] text-gray-600">
                         <p>{details.phone}</p>
                         <p>{details.website}</p>
                      </div>
                  </VerticalCardContainer>
               </div>
            </div>

            {/* DESIGN 4: THE GOLD STANDARD */}
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <h3 className="font-serif text-lg font-bold text-brand-dark">04. Gold Standard</h3>
                 <span className="text-xs uppercase bg-yellow-600 text-white px-2 py-1 rounded">Luxury</span>
               </div>
               
               {/* Front */}
               <CardContainer className="bg-brand-accent flex items-center justify-center">
                  <div className="absolute inset-2 border-2 border-brand-dark/20"></div>
                  <div className="text-center z-10">
                     <Logo className="w-16 h-16 mx-auto mb-2" color="dark" />
                  </div>
               </CardContainer>

               {/* Back */}
               <CardContainer className="bg-brand-dark p-8 flex flex-col justify-center text-center">
                   <h3 className="font-serif text-2xl text-brand-accent mb-2">{details.name}</h3>
                   <div className="flex items-center justify-center gap-2 text-white/50 mb-6">
                      <div className="h-[1px] w-8 bg-white/20"></div>
                      <span className="text-[9px] uppercase tracking-widest">Photography & Media</span>
                      <div className="h-[1px] w-8 bg-white/20"></div>
                   </div>
                   
                   <div className="bg-white/5 inline-block mx-auto px-6 py-3 rounded border border-white/10 backdrop-blur-sm">
                      <p className="text-white text-sm tracking-wider font-bold">{details.phone}</p>
                   </div>
                   <p className="text-[10px] text-brand-accent mt-4">{details.website}</p>
               </CardContainer>
            </div>

          </div>
        )}

        {/* --- WATERMARK STUDIO SECTION --- */}
        {activeTab === 'watermark' && (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* 1. Preview Canvas */}
            <div className="lg:w-2/3 order-2 lg:order-1">
               <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                 <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2 justify-between">
                   <span className="flex items-center gap-2"><ImageIcon size={16} /> Live Preview</span>
                   <div className="flex items-center gap-2">
                      {isDragging && (
                        <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded font-bold animate-pulse">
                          Snap: 10% | 25% | 50% | 75% | 90%
                        </span>
                      )}
                      <span className="text-[10px] bg-brand-accent/20 text-brand-accent px-2 py-1 rounded">Click & Drag Logo to Move</span>
                   </div>
                 </h3>
                 <div 
                   ref={previewContainerRef}
                   className="relative w-full aspect-video rounded-lg overflow-hidden border border-gray-200 shadow-inner select-none group"
                   style={{ 
                     backgroundColor: wm.bgMode === 'color' ? wm.bgColor : 'transparent',
                     backgroundImage: wm.bgMode === 'image' && wm.bgImage ? `url(${wm.bgImage})` : 'none',
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     cursor: isDragging ? 'grabbing' : 'default'
                   }}
                   onMouseDown={handleMouseDown}
                   onMouseMove={handleMouseMove}
                   onMouseUp={handleMouseUp}
                   onMouseLeave={handleMouseLeave}
                 >
                    {/* Placeholder hint if no image */}
                    {!wm.bgImage && wm.bgMode === 'image' && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100 pointer-events-none">
                          <div className="text-center">
                              <ImageIcon size={48} className="mx-auto mb-2 opacity-50"/>
                              <p className="text-sm">Upload a background image to preview</p>
                          </div>
                        </div>
                    )}

                    {/* SNAP GUIDES */}
                    {isDragging && (
                      <>
                        {/* Render Active Snap Lines */}
                        {activeSnapY !== null && (
                          <div 
                            className="absolute w-full h-px bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.8)] z-0 pointer-events-none transition-all"
                            style={{ top: `${activeSnapY}%` }}
                          ></div>
                        )}
                        {activeSnapX !== null && (
                          <div 
                            className="absolute h-full w-px bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.8)] z-0 pointer-events-none transition-all"
                            style={{ left: `${activeSnapX}%` }}
                          ></div>
                        )}
                        
                        {/* Always show dashed center lines faintly for reference */}
                        <div className={`absolute top-1/2 left-0 w-full h-px border-t border-dashed pointer-events-none transition-colors duration-200 ${activeSnapY === 50 ? 'border-transparent' : 'border-white/30'}`}></div>
                        <div className={`absolute top-0 left-1/2 h-full w-px border-l border-dashed pointer-events-none transition-colors duration-200 ${activeSnapX === 50 ? 'border-transparent' : 'border-white/30'}`}></div>
                      </>
                    )}

                    {/* The Watermark Element */}
                    <div 
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center select-none text-center cursor-move active:cursor-grabbing hover:opacity-90 transition-transform duration-100 ${isDragging ? 'scale-110 drop-shadow-2xl' : 'drop-shadow-none'}`}
                      style={{
                        left: `${wm.x}%`,
                        top: `${wm.y}%`,
                        opacity: wm.opacity,
                        width: `${wm.size}px`, 
                        // If snapping, ensure swift transition
                        transition: isDragging ? 'none' : 'all 0.1s ease-out'
                      }}
                    >
                        {/* Render based on variation */}
                        {(wm.variation === 'icon' || wm.variation === 'combined') && (
                          <Logo className="w-full h-auto pointer-events-none" color={wm.color} />
                        )}
                        {(wm.variation === 'text' || wm.variation === 'combined') && (
                          <div className={`${wm.variation === 'combined' ? 'mt-[10%]' : ''} font-serif font-bold tracking-widest uppercase leading-none text-center whitespace-nowrap pointer-events-none`}
                                style={{ 
                                  color: resolveColor(wm.color),
                                  fontSize: `${wm.size * 0.15}px` 
                                }}
                          >
                              Arbor & Oak
                          </div>
                        )}
                    </div>
                 </div>
                 <div className="mt-4 flex justify-end">
                    <button 
                      className="text-xs text-brand-primary flex items-center gap-1 hover:underline"
                      onClick={() => alert("To save: Take a screenshot of the preview or use screen capture software for high fidelity.")}
                    >
                      <Download size={14} /> Save Preview
                    </button>
                 </div>
               </div>
            </div>

            {/* 2. Controls Panel */}
            <div className="lg:w-1/3 order-1 lg:order-2 space-y-6">
                
                {/* Variation Selection */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                       <Layers size={14} /> Variation
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                        {['icon', 'text', 'combined'].map(v => (
                          <button
                            key={v}
                            onClick={() => handleWmChange('variation', v)}
                            className={`py-2 px-1 text-xs font-bold uppercase rounded border transition-all ${
                              wm.variation === v 
                                ? 'bg-brand-dark text-white border-brand-dark' 
                                : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-primary'
                            }`}
                          >
                             {v}
                          </button>
                        ))}
                    </div>
                </div>

                {/* Appearance Controls */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-6">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                       <Sliders size={14} /> Adjustments
                    </h4>

                    {/* Logo Color */}
                    <div>
                        <label className="text-[10px] uppercase font-bold text-gray-400 mb-2 block">Logo Color</label>
                        <div className="flex gap-2 items-center">
                           {[
                             { id: 'gold', hex: '#c5a065' },
                             { id: 'light', hex: '#f4f4f0' },
                             { id: 'dark', hex: '#1a2e1a' }
                           ].map(c => (
                             <button
                               key={c.id}
                               onClick={() => handleWmChange('color', c.id)}
                               className={`w-8 h-8 rounded-full border-2 ${wm.color === c.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                               style={{ backgroundColor: c.hex }}
                               title={c.id}
                             />
                           ))}
                           
                           {/* Divider */}
                           <div className="w-px h-6 bg-gray-200 mx-2"></div>
                           
                           {/* Custom Color Input */}
                            <div className="relative group" title="Custom Color">
                               <div className={`w-8 h-8 rounded-full border-2 overflow-hidden cursor-pointer ${!['gold', 'light', 'dark'].includes(wm.color) ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}>
                                 <input 
                                   type="color"
                                   value={resolveColor(wm.color)}
                                   onChange={(e) => handleWmChange('color', e.target.value)}
                                   className="w-[150%] h-[150%] p-0 border-0 -m-[25%] cursor-pointer"
                                 />
                               </div>
                               {!['gold', 'light', 'dark'].includes(wm.color) && (
                                 <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-[2px] shadow-sm">
                                   <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                 </div>
                               )}
                            </div>
                        </div>
                    </div>

                    {/* Size Slider */}
                    <div>
                       <div className="flex justify-between mb-1">
                          <label className="text-[10px] uppercase font-bold text-gray-400">Size</label>
                          <span className="text-[10px] font-mono text-gray-500">{wm.size}px</span>
                       </div>
                       <input 
                         type="range" min="50" max="400" step="10"
                         value={wm.size}
                         onChange={(e) => handleWmChange('size', Number(e.target.value))}
                         className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                       />
                    </div>

                    {/* Opacity Slider */}
                    <div>
                       <div className="flex justify-between mb-1">
                          <label className="text-[10px] uppercase font-bold text-gray-400">Opacity</label>
                          <span className="text-[10px] font-mono text-gray-500">{Math.round(wm.opacity * 100)}%</span>
                       </div>
                       <input 
                         type="range" min="0" max="1" step="0.05"
                         value={wm.opacity}
                         onChange={(e) => handleWmChange('opacity', Number(e.target.value))}
                         className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                       />
                    </div>

                    {/* Position Controls */}
                    <div className="grid grid-cols-2 gap-4">
                       <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Pos X ({Math.round(wm.x)}%)</label>
                          <input 
                            type="range" min="0" max="100"
                            value={wm.x}
                            onChange={(e) => handleWmChange('x', Number(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                          />
                       </div>
                       <div>
                          <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Pos Y ({Math.round(wm.y)}%)</label>
                          <input 
                            type="range" min="0" max="100"
                            value={wm.y}
                            onChange={(e) => handleWmChange('y', Number(e.target.value))}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                          />
                       </div>
                    </div>
                </div>

                {/* Background Controls */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                       <Palette size={14} /> Background
                    </h4>
                    
                    <div className="flex gap-2 mb-4">
                       <button 
                         onClick={() => handleWmChange('bgMode', 'color')}
                         className={`flex-1 py-2 text-xs font-bold rounded ${wm.bgMode === 'color' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-500'}`}
                       >
                         Solid Color
                       </button>
                       <button 
                         onClick={() => handleWmChange('bgMode', 'image')}
                         className={`flex-1 py-2 text-xs font-bold rounded ${wm.bgMode === 'image' ? 'bg-brand-primary text-white' : 'bg-gray-100 text-gray-500'}`}
                       >
                         Image
                       </button>
                    </div>

                    {wm.bgMode === 'color' ? (
                       <input 
                         type="color" 
                         value={wm.bgColor}
                         onChange={(e) => handleWmChange('bgColor', e.target.value)}
                         className="w-full h-10 p-1 rounded border border-gray-300 cursor-pointer"
                       />
                    ) : (
                       <div 
                         onClick={() => wmFileInputRef.current?.click()}
                         className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                       >
                          <input 
                            type="file" 
                            ref={wmFileInputRef}
                            onChange={handleWmImageUpload}
                            accept="image/*"
                            className="hidden"
                          />
                          <Upload size={20} className="mx-auto text-gray-400 mb-2"/>
                          <p className="text-xs text-gray-500">Click to upload image</p>
                       </div>
                    )}
                </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BusinessCardStudio;