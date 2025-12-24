import React, { useState } from 'react';
import { analyzeHighestAndBestUse, generateSellerOutreach } from '../services/geminiService';
import { DealType, OutreachStyle } from '../types';
import { BrainCircuit, MessageSquare, Terminal, Map, Hammer, DollarSign, Lock } from 'lucide-react';

const WholesaleEngine: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'analyzer' | 'outreach'>('analyzer');
  
  // Analyzer State
  const [dealType, setDealType] = useState<DealType>(DealType.RAW_LAND);
  const [zoningCode, setZoningCode] = useState('');
  const [dealNotes, setDealNotes] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  // Outreach State
  const [outreachStyle, setOutreachStyle] = useState<OutreachStyle>(OutreachStyle.DIRECT_BROKER);
  const [painPoint, setPainPoint] = useState('');
  const [outreachResult, setOutreachResult] = useState('');
  const [writing, setWriting] = useState(false);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    const result = await analyzeHighestAndBestUse(dealType, dealNotes, zoningCode);
    setAnalysisResult(result);
    setAnalyzing(false);
  };

  const handleOutreach = async () => {
    setWriting(true);
    const result = await generateSellerOutreach(dealType, outreachStyle, painPoint);
    setOutreachResult(result);
    setWriting(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-mono">
      {/* Header / Command Bar */}
      <div className="border-b border-gray-700 bg-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="text-green-500" />
          <h1 className="text-xl font-bold tracking-widest uppercase text-green-500">
            Operator_Command_Center <span className="text-gray-500 text-sm normal-case">// v1.0</span>
          </h1>
        </div>
        <div className="flex gap-4">
           <button 
             onClick={() => setActiveModule('analyzer')}
             className={`px-4 py-2 text-sm uppercase font-bold border ${activeModule === 'analyzer' ? 'bg-green-500/20 border-green-500 text-green-400' : 'border-gray-600 text-gray-500 hover:border-gray-400'}`}
           >
             Deal Analysis
           </button>
           <button 
             onClick={() => setActiveModule('outreach')}
             className={`px-4 py-2 text-sm uppercase font-bold border ${activeModule === 'outreach' ? 'bg-green-500/20 border-green-500 text-green-400' : 'border-gray-600 text-gray-500 hover:border-gray-400'}`}
           >
             Sniper Outreach
           </button>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        
        {/* ANALYZER MODULE */}
        {activeModule === 'analyzer' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-gray-800 p-6 border border-gray-700 rounded">
                <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <Map size={18} /> Deal Inputs
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Asset Class</label>
                    <select 
                      value={dealType}
                      onChange={(e) => setDealType(e.target.value as DealType)}
                      className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:border-green-500 focus:outline-none"
                    >
                      {Object.values(DealType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Zoning / Utilities / Context</label>
                    <input 
                      value={zoningCode}
                      onChange={(e) => setZoningCode(e.target.value)}
                      placeholder="e.g. R1 Residential, Ag Land (no sewer), Industrial I-2..."
                      className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Notes / "The Mess"</label>
                    <textarea 
                      rows={5}
                      value={dealNotes}
                      onChange={(e) => setDealNotes(e.target.value)}
                      placeholder="e.g. 5 acres. Owner died 3 years ago (probate?). Access road is dirt. Neighbor says he uses part of it for cows."
                      className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  
                  <button 
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {analyzing ? <BrainCircuit className="animate-pulse" /> : <Hammer />} 
                    {analyzing ? 'Processing Entitlements...' : 'Run Highest & Best Use'}
                  </button>
                </div>
              </div>
            </div>

            {/* Output */}
            <div className="bg-gray-800 p-6 border border-gray-700 rounded h-full min-h-[500px]">
              <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                <DollarSign size={18} /> Analysis Report
              </h3>
              <div className="bg-black/50 p-4 rounded h-[calc(100%-2rem)] overflow-y-auto border border-gray-700 font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                {analysisResult || (
                  <span className="text-gray-600 italic">
                    // Awaiting Input...<br/>
                    // System will identify entitlement risks, outdoor storage potential, and curative title needs.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* OUTREACH MODULE */}
        {activeModule === 'outreach' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
             <div className="space-y-6">
              <div className="bg-gray-800 p-6 border border-gray-700 rounded">
                <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                  <MessageSquare size={18} /> Sniper Marketing
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Asset Class</label>
                    <select 
                      value={dealType}
                      onChange={(e) => setDealType(e.target.value as DealType)}
                      className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:border-green-500 focus:outline-none"
                    >
                      {Object.values(DealType).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Persona / Style</label>
                    <select 
                      value={outreachStyle}
                      onChange={(e) => setOutreachStyle(e.target.value as OutreachStyle)}
                      className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:border-green-500 focus:outline-none"
                    >
                      {Object.values(OutreachStyle).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase text-gray-500 mb-1">Pain Points / Situation</label>
                    <textarea 
                      rows={4}
                      value={painPoint}
                      onChange={(e) => setPainPoint(e.target.value)}
                      placeholder="e.g. Tax delinquent list (3 years behind). Out of state owner (lives in Florida). Vacant lot."
                      className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-sm focus:border-green-500 focus:outline-none"
                    />
                  </div>
                  
                  <button 
                    onClick={handleOutreach}
                    disabled={writing}
                    className="w-full bg-green-700 hover:bg-green-600 text-white font-bold py-3 rounded uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    {writing ? <BrainCircuit className="animate-pulse" /> : <Terminal />} 
                    {writing ? 'Drafting Copy...' : 'Generate Script'}
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-6 border border-gray-700 rounded h-full min-h-[500px]">
              <h3 className="text-green-400 font-bold mb-4 flex items-center gap-2">
                 Output Console
              </h3>
              <div className="bg-black/50 p-4 rounded h-[calc(100%-2rem)] overflow-y-auto border border-gray-700 font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-wrap">
                {outreachResult || (
                   <span className="text-gray-600 italic">
                    // Ready to generate...<br/>
                    // Output optimized for SMS (Launch Control) or Direct Mail.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WholesaleEngine;