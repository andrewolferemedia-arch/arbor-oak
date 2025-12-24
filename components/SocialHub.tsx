import React from 'react';
import { SOCIAL_LINKS } from '../constants';
import { ArrowUpRight, Calendar, Video, TrendingUp, Mic2, ShieldCheck, Crown, Briefcase, Layout, CheckCircle } from 'lucide-react';
import MarketingGenerator from './MarketingGenerator';

interface SocialHubProps {
  onBook: (packageName: string) => void;
}

const SocialHub: React.FC<SocialHubProps> = ({ onBook }) => {
  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Hero Section of Marketing Suite */}
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-widest mb-2">
             Partner Portal
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-brand-dark">Agent Marketing Suite</h2>
          <p className="text-gray-600 text-lg">
            We are more than just photographers. We are your <span className="font-bold text-brand-primary">Media Department</span>. 
            Use our tools to plan your content, script your videos, and build your brand.
          </p>
        </div>

        {/* --- THE RETAINER SECTION --- */}
        <div className="relative">
          <div className="absolute inset-0 bg-brand-dark/5 skew-y-1 transform -z-10 rounded-3xl"></div>
          <div className="py-8">
            <div className="text-center mb-12">
               <h3 className="text-3xl font-serif text-brand-dark mb-4">The Agency Retainer</h3>
               <p className="text-gray-500 max-w-2xl mx-auto">
                 Stop paying a la carte prices. Put us on your team. Get consistent, priority access to all our services for a flat monthly rate.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
               
               {/* Tier 1: Consistency */}
               <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
                  <h4 className="font-bold text-lg text-gray-500 uppercase tracking-widest mb-2">The Consistency</h4>
                  <div className="text-4xl font-serif text-brand-dark mb-6">$650<span className="text-sm text-gray-400 font-sans">/mo</span></div>
                  <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                    Perfect for the agent closing 1-2 deals a month who needs to look professional every time.
                  </p>
                  <ul className="space-y-4 mb-8 flex-grow">
                     <li className="flex items-start gap-3 text-sm">
                       <CheckCircle size={16} className="text-brand-primary mt-1 flex-shrink-0" /> 
                       <span><strong>1 Full Listing Package</strong> (Photo, Floor Plan, Cinematic Video)</span>
                     </li>
                     <li className="flex items-start gap-3 text-sm">
                       <CheckCircle size={16} className="text-brand-primary mt-1 flex-shrink-0" /> 
                       <span><strong>2 Social Reels</strong> (Filmed on location or in studio)</span>
                     </li>
                     <li className="flex items-start gap-3 text-sm">
                       <CheckCircle size={16} className="text-brand-primary mt-1 flex-shrink-0" /> 
                       <span>Interactive Floor Plans</span>
                     </li>
                  </ul>
                  <button 
                    onClick={() => onBook('Retainer: The Consistency ($650/mo)')}
                    className="w-full py-3 border-2 border-brand-dark text-brand-dark font-bold uppercase tracking-wider hover:bg-brand-dark hover:text-white transition-colors rounded"
                  >
                    Select Plan
                  </button>
               </div>

               {/* Tier 2: Growth (Highlighted) */}
               <div className="bg-brand-dark rounded-xl shadow-2xl border border-brand-accent p-8 flex flex-col relative transform md:-translate-y-4">
                  <div className="absolute top-0 right-0 bg-brand-accent text-brand-dark text-xs font-bold px-3 py-1 uppercase tracking-widest rounded-bl-lg">
                    Most Popular
                  </div>
                  <h4 className="font-bold text-lg text-brand-accent uppercase tracking-widest mb-2">The Growth</h4>
                  <div className="text-4xl font-serif text-white mb-6">$1,500<span className="text-sm text-gray-400 font-sans">/mo</span></div>
                  <p className="text-sm text-gray-400 mb-8 border-b border-white/10 pb-8">
                    For the scaling agent who needs to be everywhere, all the time. Your full media department.
                  </p>
                  <ul className="space-y-4 mb-8 flex-grow text-gray-200">
                     <li className="flex items-start gap-3 text-sm">
                       <ShieldCheck size={16} className="text-brand-accent mt-1 flex-shrink-0" /> 
                       <span><strong>Unlimited Media Listings</strong> (Photos, Floor Plans, Cinematic)</span>
                     </li>
                     <li className="flex items-start gap-3 text-sm">
                       <ShieldCheck size={16} className="text-brand-accent mt-1 flex-shrink-0" /> 
                       <span><strong>Unlimited Tours</strong> (20+ Min Long-Form Video)</span>
                     </li>
                     <li className="flex items-start gap-3 text-sm">
                       <ShieldCheck size={16} className="text-brand-accent mt-1 flex-shrink-0" /> 
                       <span><strong>Unlimited Socials</strong> (Reels, Shorts & Strategy)</span>
                     </li>
                     <li className="flex items-start gap-3 text-sm">
                       <ShieldCheck size={16} className="text-brand-accent mt-1 flex-shrink-0" /> 
                       <span>Priority Booking Status</span>
                     </li>
                  </ul>
                  <button 
                    onClick={() => onBook('Retainer: The Growth ($1,500/mo)')}
                    className="w-full py-3 bg-brand-accent text-brand-dark font-bold uppercase tracking-wider hover:bg-white transition-colors rounded"
                  >
                    Start Partnership
                  </button>
               </div>

               {/* Tier 3: Monopoly */}
               <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-brand-dark"></div>
                  <h4 className="font-bold text-lg text-brand-dark uppercase tracking-widest mb-2">The Monopoly</h4>
                  <div className="text-4xl font-serif text-brand-dark mb-6">Custom<span className="text-sm text-gray-400 font-sans"></span></div>
                  <p className="text-sm text-gray-500 mb-8 border-b border-gray-100 pb-8">
                    For teams and top producers. Volume pricing and dedicated creative strategy.
                  </p>
                  <ul className="space-y-4 mb-8 flex-grow">
                     <li className="flex items-start gap-3 text-sm">
                       <Crown size={16} className="text-brand-dark mt-1 flex-shrink-0" /> 
                       <span>Unlimited Listing Photography</span>
                     </li>
                     <li className="flex items-start gap-3 text-sm">
                       <Crown size={16} className="text-brand-dark mt-1 flex-shrink-0" /> 
                       <span>Dedicated Editing Team</span>
                     </li>
                     <li className="flex items-start gap-3 text-sm">
                       <Crown size={16} className="text-brand-dark mt-1 flex-shrink-0" /> 
                       <span>Monthly Strategy Workshop</span>
                     </li>
                     <li className="flex items-start gap-3 text-sm">
                       <Crown size={16} className="text-brand-dark mt-1 flex-shrink-0" /> 
                       <span>Custom Intro/Outro Animation</span>
                     </li>
                  </ul>
                  <button 
                    onClick={() => onBook('Retainer: The Monopoly (Custom)')}
                    className="w-full py-3 border-2 border-brand-dark text-brand-dark font-bold uppercase tracking-wider hover:bg-brand-dark hover:text-white transition-colors rounded"
                  >
                    Let's Collaborate
                  </button>
               </div>
            </div>

            {/* Build Your Own Banner */}
            <div className="max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-brand-accent/20">
               <div className="flex items-center gap-4">
                  <div className="bg-brand-accent/20 p-3 rounded-full text-brand-dark">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h4 className="font-serif text-xl font-bold text-brand-dark">Build Your Own Package</h4>
                    <p className="text-sm text-gray-500">Don't see exactly what you need? Mix and match services.</p>
                  </div>
               </div>
               <button 
                 onClick={() => onBook('Custom Package Inquiry')}
                 className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-sm uppercase tracking-wider rounded transition-colors"
               >
                  Customize Quote
               </button>
            </div>
          </div>
        </div>

        {/* Strategy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Strategy 1: Content Days */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-brand-accent group hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-accent group-hover:text-white transition-colors">
                    <Calendar size={24} className="text-brand-accent group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Content Days</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    Stop scrambling for content. Book a <strong>half-day shoot</strong> where we film 4-6 Reels, headshots, and "About Me" intros in one session.
                </p>
                <button 
                  onClick={() => onBook('Strategy Call: Content Days')}
                  className="text-brand-primary font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all"
                >
                    Book Strategy Call <ArrowUpRight size={16} />
                </button>
            </div>

            {/* Strategy 2: Video First */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-brand-primary group hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <Video size={24} className="text-brand-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Video First Marketing</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    Photos sell the house. <strong>Video sells YOU.</strong> Use our Script Generator below to stop the scroll and become the local celebrity agent.
                </p>
                <a href="#generator" className="text-brand-primary font-bold text-sm uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                    Create Scripts <ArrowUpRight size={16} />
                </a>
            </div>

            {/* Strategy 3: Trend Jacking */}
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-gray-800 group hover:transform hover:-translate-y-2 transition-all duration-300">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-gray-800 group-hover:text-white transition-colors">
                    <TrendingUp size={24} className="text-gray-600 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">Trend Analysis</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    Don't know what to post? We analyze trending audio and local market data to give you "Hooks" that actually work.
                </p>
                <div className="flex items-center gap-2 text-xs text-green-600 font-bold bg-green-50 px-3 py-1 rounded-full w-fit">
                    <Mic2 size={12} /> New Trends Weekly
                </div>
            </div>
        </div>

        {/* AI Generator Section */}
        <div id="generator" className="pt-8 border-t border-gray-200">
           <div className="mb-8">
              <h3 className="text-2xl font-serif text-brand-dark mb-2">AI Creative Studio</h3>
              <p className="text-gray-500">
                Your personal copywriter and script director. Upload a photo or enter a topic to generate content instantly.
              </p>
           </div>
           <MarketingGenerator />
        </div>

        {/* Social Proof / Connect */}
        <div className="bg-brand-dark text-white rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <h3 className="text-2xl font-serif mb-2">Let's Collaborate</h3>
                <p className="text-gray-400 max-w-md">
                    Follow us for daily tips on Real Estate Marketing, behind the scenes, and strategy breakdowns.
                </p>
            </div>
            <div className="flex gap-4">
                 {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 hover:bg-brand-accent text-white p-4 rounded-full transition-all duration-300"
                      title={link.platform}
                    >
                       <span className="font-bold text-xs">{link.platform}</span>
                    </a>
                  ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default SocialHub;