import React, { useState, useRef } from 'react';
import { generateMarketingContent, generateMarketingContentFromImage } from '../services/geminiService';
import { GeneratorTone, PlatformType } from '../types';
import { Sparkles, Copy, CheckCircle, Loader2, Image as ImageIcon, Type, Upload, RefreshCw, FileText, Video, Zap } from 'lucide-react';

const MarketingGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'image'>('text');
  
  // Common State
  const [platform, setPlatform] = useState<PlatformType>(PlatformType.TIKTOK); // Default to Video Script
  const [tone, setTone] = useState<GeneratorTone>(GeneratorTone.VIRAL);
  const [generatedContent, setGeneratedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Text Mode State
  const [topic, setTopic] = useState('');

  // Image Mode State
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageContext, setImageContext] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    if (!generatedContent) setGeneratedContent(''); 
    
    try {
      let content = "";
      if (activeTab === 'text') {
        if (!topic) return;
        content = await generateMarketingContent(topic, platform, tone);
      } else {
        if (!selectedImage || !imagePreview) return;
        const base64Data = imagePreview.split(',')[1];
        const mimeType = selectedImage.type;
        
        content = await generateMarketingContentFromImage(
          base64Data, 
          mimeType, 
          platform, 
          tone, 
          imageContext
        );
      }
      setGeneratedContent(content);
    } catch (e) {
      console.error(e);
      setGeneratedContent("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-brand-primary to-brand-dark px-8 py-6 text-white">
        <div className="flex items-center gap-3 mb-2">
            <Sparkles className="text-brand-accent" />
            <h3 className="font-serif text-2xl font-semibold">Content Generator</h3>
        </div>
        <p className="text-brand-light/80 text-sm">
          Generate full scripts, viral hooks, and property descriptions instantly.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('text')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'text' 
              ? 'bg-gray-50 text-brand-primary border-b-2 border-brand-primary' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <Type size={16} /> From Topic
        </button>
        <button
          onClick={() => setActiveTab('image')}
          className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${
            activeTab === 'image' 
              ? 'bg-gray-50 text-brand-primary border-b-2 border-brand-primary' 
              : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <ImageIcon size={16} /> From Photo
        </button>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          
          {/* Input Area */}
          {activeTab === 'text' ? (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                What are we creating today?
              </label>
              <textarea
                rows={4}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g., A video tour of a $500k home in Frankfort, or 'Why you should buy now', or property details for a description..."
                className="w-full px-4 py-3 rounded border border-gray-300 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
              />
            </div>
          ) : (
            <div className="space-y-4">
               <div 
                 className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                   imagePreview ? 'border-brand-primary bg-brand-primary/5' : 'border-gray-300 hover:border-brand-primary hover:bg-gray-50'
                 }`}
                 onClick={() => fileInputRef.current?.click()}
               >
                 <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageSelect} 
                    accept="image/*" 
                    className="hidden" 
                 />
                 {imagePreview ? (
                   <div className="relative w-full h-48 group">
                     <img src={imagePreview} alt="Preview" className="w-full h-full object-contain" />
                     <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity">
                       <span className="text-white text-sm font-bold">Change Image</span>
                     </div>
                   </div>
                 ) : (
                   <>
                     <Upload className="text-gray-400 mb-2" size={32} />
                     <p className="text-sm text-gray-500 font-medium">Upload Listing Photo</p>
                   </>
                 )}
               </div>
               
               <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Key Features (Optional)
                  </label>
                  <input
                    type="text"
                    value={imageContext}
                    onChange={(e) => setImageContext(e.target.value)}
                    placeholder="e.g., Mention the natural light..."
                    className="w-full px-4 py-2 rounded border border-gray-300 focus:border-brand-primary outline-none"
                  />
               </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Format</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PlatformType)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-brand-primary outline-none"
              >
                <option value={PlatformType.TIKTOK}>Short Video Script (Reels)</option>
                <option value={PlatformType.HOOKS}>Viral Hooks List</option>
                <option value={PlatformType.INSTAGRAM}>Instagram Caption</option>
                <option value={PlatformType.MLS}>MLS Description</option>
                <option value={PlatformType.LINKEDIN}>LinkedIn Post</option>
                <option value={PlatformType.EMAIL}>Email Blast</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tone</label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as GeneratorTone)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:border-brand-primary outline-none"
              >
                {Object.values(GeneratorTone).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || (activeTab === 'text' ? !topic : !selectedImage)}
            className="w-full bg-brand-primary text-white font-bold py-3 rounded hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
          >
            {isLoading ? <Loader2 className="animate-spin" /> : (generatedContent ? <RefreshCw size={18}/> : <Sparkles size={18} />)}
            {isLoading ? 'CREATING...' : (generatedContent ? 'REGENERATE' : 'GENERATE')}
          </button>
        </div>

        {/* Output */}
        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 relative min-h-[400px] flex flex-col shadow-inner">
          <div className="absolute top-4 right-4 z-10">
             <button
              onClick={handleCopy}
              disabled={!generatedContent}
              className="p-2 text-gray-500 hover:text-brand-primary bg-white rounded-full shadow-sm border border-gray-200 transition-all hover:scale-110 disabled:opacity-30 disabled:scale-100"
              title="Copy to clipboard"
             >
               {copied ? <CheckCircle size={20} className="text-green-600" /> : <Copy size={20} />}
             </button>
          </div>
          
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            {platform === PlatformType.TIKTOK ? <Video size={14} /> : platform === PlatformType.HOOKS ? <Zap size={14} /> : <FileText size={14} />} 
            {platform === PlatformType.TIKTOK ? 'Video Script' : 'Generated Content'}
          </h4>

          {generatedContent || isLoading ? (
             <textarea 
               value={generatedContent}
               onChange={(e) => setGeneratedContent(e.target.value)}
               className="w-full h-full flex-grow bg-transparent border-none outline-none resize-none text-gray-700 text-sm leading-relaxed p-0 focus:ring-0 font-sans font-medium"
               placeholder={isLoading ? "The AI is brainstorming..." : "Your professional content will appear here..."}
               spellCheck={false}
             />
          ) : (
            <div className="flex-grow flex flex-col items-center justify-center text-gray-400 text-sm italic opacity-60">
               <Sparkles size={48} className="mb-4 text-brand-primary/20" />
              {activeTab === 'image' 
                ? 'Upload a photo to generate a script...' 
                : 'Enter a topic (e.g. "Interest rates are dropping") to get a viral video script...'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketingGenerator;