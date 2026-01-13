import React, { useState, useEffect, useRef } from 'react';
import { Server, Database, Cloud, Lock, Terminal, Cpu, Globe, ArrowRight, Search, Check, Loader2, Zap, Rocket } from 'lucide-react';
import HowItWorks from '../components/HowItWorks';

interface TerminalLine {
  type: 'command' | 'output';
  content: string | string[];
}

const HostPage: React.FC = () => {
  // --- Terminal State ---
  const [terminalHistory, setTerminalHistory] = useState<TerminalLine[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- Domain Search State ---
  const [domainQuery, setDomainQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<'idle' | 'available' | 'taken'>('idle');
  const [deployStage, setDeployStage] = useState<number>(0); // 0: Idle, 1: Minting, 2: Storage, 3: Success

  // --- Terminal Script Logic ---
  const script = [
    { type: 'command', text: 'npm install -g fluid-cli', delay: 500 },
    { type: 'output', content: ['<span class="text-slate-400">+ fluid-cli@1.0.4</span>', '<span class="text-slate-400">added 12 packages in 2s</span>'], delay: 400 },
    { type: 'command', text: 'fluid init', delay: 800 },
    { type: 'output', content: ['<span class="text-blue-400">?</span> Project name: <span class="text-white">awesome-dapp</span>', '<span class="text-blue-400">?</span> Framework: <span class="text-white">React / Next.js</span>', '<span class="text-blue-400">?</span> Storage: <span class="text-white">Permanent (Parmaweb)</span>'], delay: 600 },
    { type: 'command', text: 'fluid deploy', delay: 800 },
    { type: 'output', content: ['<span class="text-slate-300">> Building project...</span>', '<span class="text-slate-300">> Uploading assets to Shard 1...</span>', '<span class="text-slate-300">> Uploading assets to Shard 2...</span>', '<span class="text-slate-300">> Verifying integrity...</span>'], delay: 600 },
    { type: 'output', content: ['<span class="text-emerald-400 font-bold">✔ Deployment Successful!</span>', 'Access your app at: <span class="underline text-blue-400 cursor-pointer hover:text-blue-300">https://fluid.link/awesome-dapp</span>'], delay: 400 }
  ];

  useEffect(() => {
    let timeoutId: any;
    let isMounted = true;

    const processStep = async () => {
      if (stepIndex >= script.length) {
         timeoutId = setTimeout(() => {
            if (isMounted) {
                setTerminalHistory([]);
                setStepIndex(0);
            }
         }, 8000);
         return;
      }

      const step = script[stepIndex];

      if (step.type === 'command') {
        if (isMounted) setIsTyping(true);
        let charIndex = 0;
        
        const typeChar = () => {
          if (!isMounted) return;
          if (charIndex <= (step.text as string).length) {
            setCurrentLine((step.text as string).slice(0, charIndex));
            charIndex++;
            timeoutId = setTimeout(typeChar, 50 + Math.random() * 30);
          } else {
            setIsTyping(false);
            timeoutId = setTimeout(() => {
               if (isMounted) {
                   setTerminalHistory(prev => [...prev, { type: 'command', content: step.text as string }]);
                   setCurrentLine('');
                   setStepIndex(prev => prev + 1);
               }
            }, 300);
          }
        };
        typeChar();
      } else {
        timeoutId = setTimeout(() => {
           if (isMounted) {
               setTerminalHistory(prev => [...prev, { type: 'output', content: step.content as string[] }]);
               setStepIndex(prev => prev + 1);
           }
        }, step.delay);
      }
    };

    if (!isTyping) processStep();

    return () => {
        isMounted = false;
        clearTimeout(timeoutId);
    };
  }, [stepIndex]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalHistory, currentLine]);

  // --- Domain Logic ---
  const handleDomainSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!domainQuery) return;
    
    setIsSearching(true);
    setSearchResult('idle');
    setDeployStage(0);

    // Simulate API search
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult('available');
    }, 1200);
  };

  const handleDeployProcess = () => {
    setDeployStage(1);
    
    // Simulate steps
    setTimeout(() => setDeployStage(2), 2000);
    setTimeout(() => setDeployStage(3), 4500);
  };

  return (
    <div className="min-h-screen pt-28 pb-16">
      
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
         <div className="inline-block px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 mb-6 animate-pulse">
            <span className="text-indigo-500 font-bold uppercase tracking-wider text-sm">Parmaweb Protocol V1</span>
         </div>
         <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6">
            The Permanent Web. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Unstoppable Hosting.</span>
         </h1>
         <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10">
            Deploy full-stack applications to the Fluid Blockchain. Censorship-resistant, 100% uptime, and one-time payment for eternal storage.
         </p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
                onClick={() => document.getElementById('domain-search')?.scrollIntoView({ behavior: 'smooth'})}
                className="px-8 py-4 bg-indigo-600 text-white font-bold rounded-full hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25"
             >
                <Globe size={20} /> Claim Domain
             </button>
             <button className="px-8 py-4 bg-transparent border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                <Terminal size={20} /> CLI Guide
             </button>
         </div>
      </section>

      {/* Terminal Visual */}
      <section className="max-w-5xl mx-auto px-4 mb-24">
         <div className="bg-slate-900 rounded-xl border border-slate-800 shadow-2xl overflow-hidden font-mono text-sm">
            <div className="bg-slate-800 px-4 py-2 flex items-center gap-2 border-b border-slate-700">
               <div className="w-3 h-3 rounded-full bg-red-500"></div>
               <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
               <div className="w-3 h-3 rounded-full bg-green-500"></div>
               <div className="ml-4 text-slate-400 text-xs md:text-sm">user@dev:~/my-fluid-app</div>
            </div>
            <div 
                ref={scrollRef}
                className="p-6 text-slate-300 space-y-1 h-[300px] overflow-y-auto scroll-smooth"
            >
               {terminalHistory.map((item, index) => (
                   <div key={index}>
                       {item.type === 'command' ? (
                           <div className="flex flex-wrap">
                               <span className="text-green-400 mr-2 shrink-0">$</span>
                               <span>{item.content as string}</span>
                           </div>
                       ) : (
                           <div className="flex flex-col">
                               {Array.isArray(item.content) ? (
                                   item.content.map((line, i) => (
                                       <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
                                   ))
                               ) : (
                                   <div dangerouslySetInnerHTML={{ __html: item.content as string }} />
                               )}
                           </div>
                       )}
                   </div>
               ))}
               {isTyping && (
                   <div className="flex flex-wrap">
                       <span className="text-green-400 mr-2 shrink-0">$</span>
                       <span>{currentLine}</span>
                       <span className="animate-pulse bg-slate-400 w-2 h-5 inline-block ml-1 align-middle"></span>
                   </div>
               )}
               {!isTyping && stepIndex < script.length && (
                   <div className="flex"><span className="animate-pulse bg-slate-400 w-2 h-5 inline-block align-middle mt-1"></span></div>
               )}
               {!isTyping && stepIndex >= script.length && (
                   <div className="flex"><span className="text-green-400 mr-2">$</span><span className="animate-pulse bg-slate-400 w-2 h-5 inline-block align-middle mt-1"></span></div>
               )}
            </div>
         </div>
      </section>

      {/* Domain Acquisition Section */}
      <section id="domain-search" className="max-w-4xl mx-auto px-4 mb-32 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-[100px] pointer-events-none"></div>
          
          <div className="text-center mb-10 relative z-10">
             <h2 className="text-3xl font-extrabold text-white mb-2">Claim Your Web3 Identity</h2>
             <p className="text-slate-400">Mint your decentralized domain instantly. Free when deploying to Parmaweb.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 overflow-hidden">
             
             {/* Search Input */}
             <form onSubmit={handleDomainSearch} className="relative mb-8">
                <input 
                  type="text" 
                  value={domainQuery}
                  onChange={(e) => setDomainQuery(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                  placeholder="find-your-name"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl py-5 pl-6 pr-32 text-xl md:text-2xl font-bold text-white focus:outline-none focus:border-indigo-500 transition-colors placeholder-slate-700"
                />
                <button 
                  type="submit"
                  disabled={isSearching || !domainQuery}
                  className="absolute right-2 top-2 bottom-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 rounded-lg font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSearching ? <Loader2 className="animate-spin" /> : <Search />}
                  Search
                </button>
             </form>

             {/* Results Area */}
             <div className="space-y-3 min-h-[200px]">
                
                {isSearching && (
                   <div className="flex flex-col items-center justify-center py-12 text-slate-500">
                      <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
                      <p>Checking availability across chains...</p>
                   </div>
                )}

                {!isSearching && searchResult === 'idle' && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-600 border border-dashed border-slate-800 rounded-xl bg-slate-950/50">
                       <Globe size={48} className="mb-4 opacity-20" />
                       <p>Enter a name above to secure your decentralized domain.</p>
                    </div>
                )}

                {!isSearching && searchResult === 'available' && deployStage === 0 && (
                   <div className="animate-fade-in-up space-y-3">
                      
                      {/* Fluid Domain (FREE) */}
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/10 to-indigo-500/10 border border-emerald-500/30 rounded-xl relative overflow-hidden group">
                         <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">RECOMMENDED</div>
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                               <Check size={20} />
                            </div>
                            <div>
                               <h3 className="text-lg font-bold text-white">{domainQuery}.fluid</h3>
                               <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                                  <Zap size={10} /> Instant Activation
                               </p>
                            </div>
                         </div>
                         <div className="text-right flex items-center gap-4">
                            <div>
                               <div className="text-xs text-slate-500 line-through">$25.00/yr</div>
                               <div className="text-xl font-bold text-white">FREE</div>
                            </div>
                            <button 
                               onClick={handleDeployProcess}
                               className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-emerald-400 transition-colors shadow-lg"
                            >
                               Register
                            </button>
                         </div>
                      </div>

                      {/* Other Domains (Comparison) */}
                      <div className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                               E
                            </div>
                            <div>
                               <h3 className="text-lg font-bold text-slate-300">{domainQuery}.eth</h3>
                               <p className="text-xs text-slate-500">Ethereum Name Service</p>
                            </div>
                         </div>
                         <div className="text-right">
                             <div className="text-lg font-bold text-slate-300">$180.00</div>
                             <div className="text-xs text-slate-500">+ Gas Fees</div>
                         </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-xl opacity-60 hover:opacity-100 transition-opacity">
                         <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                               S
                            </div>
                            <div>
                               <h3 className="text-lg font-bold text-slate-300">{domainQuery}.sol</h3>
                               <p className="text-xs text-slate-500">Solana Names</p>
                            </div>
                         </div>
                         <div className="text-right">
                             <div className="text-lg font-bold text-slate-300">$20.00</div>
                             <div className="text-xs text-slate-500">~ $20/yr</div>
                         </div>
                      </div>

                   </div>
                )}

                {/* Deployment Animation State */}
                {deployStage > 0 && (
                    <div className="py-8 px-4 bg-black/20 rounded-xl border border-indigo-500/20 text-center animate-fade-in-up">
                        {deployStage < 3 ? (
                            <div className="flex flex-col items-center">
                                <div className="relative w-16 h-16 mb-6">
                                    <div className="absolute inset-0 border-4 border-slate-800 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                                    <Rocket className="absolute inset-0 m-auto text-indigo-400 animate-pulse" size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Deploying to Parmaweb</h3>
                                <div className="space-y-2 text-sm text-slate-400">
                                    <p className={deployStage >= 1 ? "text-emerald-400 flex items-center justify-center gap-2" : "opacity-50"}>
                                       {deployStage >= 1 && <Check size={14} />} Minting <span className="text-white font-mono">{domainQuery}.fluid</span>...
                                    </p>
                                    <p className={deployStage >= 2 ? "text-emerald-400 flex items-center justify-center gap-2" : "opacity-50"}>
                                       {deployStage >= 2 && <Check size={14} />} Allocating Storage Shards...
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center animate-fade-in-up">
                                <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                                    <Check size={32} className="text-black" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">You're Live!</h3>
                                <p className="text-slate-400 mb-6">Your decentralized website is now accessible globally.</p>
                                <div className="bg-slate-950 px-6 py-3 rounded-lg border border-slate-800 flex items-center gap-3">
                                    <Globe size={16} className="text-emerald-400" />
                                    <span className="text-blue-400 font-mono underline cursor-pointer hover:text-white transition-colors">
                                        https://{domainQuery}.fluid.link
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                )}

             </div>
          </div>
      </section>

      {/* Sharding & Endowment Visualization (Technical Deep Dive) */}
      <section className="border-y border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-black/20 mb-24">
         <HowItWorks />
      </section>

      {/* Features Grid */}
      <section className="bg-slate-50 dark:bg-slate-900/50 py-24 border-y border-slate-200 dark:border-slate-800">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-16 text-slate-900 dark:text-white">Why Host on Fluid?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
               
               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 text-indigo-500 group-hover:scale-110 transition-transform">
                     <Lock size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Censorship Resistant</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Data is stored immutably across a distributed network of nodes. No central authority can take your site down.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                     <Cloud size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">100% Uptime</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Redundant sharding ensures your content is always available, even if multiple nodes go offline simultaneously.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6 text-emerald-500 group-hover:scale-110 transition-transform">
                     <Database size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">One-Time Payment</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Pay once in $FLUID tokens to store data forever. No monthly subscription fees for storage.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6 text-blue-500 group-hover:scale-110 transition-transform">
                     <Globe size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Global CDN</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Built-in content delivery network serves your dApp from the node closest to the user for blazing fast speeds.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                     <Cpu size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Serverless Compute</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     Run serverless functions directly on-chain for dynamic applications and backend logic.
                  </p>
               </div>

               <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-500/50 transition-colors group">
                  <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center mb-6 text-pink-500 group-hover:scale-110 transition-transform">
                     <ArrowRight size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Instant Deployment</h3>
                  <p className="text-slate-600 dark:text-slate-400">
                     CI/CD integration allows you to deploy from GitHub automatically with every commit.
                  </p>
               </div>

            </div>
         </div>
      </section>

    </div>
  );
};

export default HostPage;