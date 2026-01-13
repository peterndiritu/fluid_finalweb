import React, { useState, useEffect } from 'react';
import { Wallet, ArrowRight, CreditCard, ArrowLeftRight, Server, Lock, Repeat, Zap, Globe, ShieldCheck, Database, Layers, PieChart, HandCoins, TrendingUp, Landmark, Percent, Scale } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [totalDistributed, setTotalDistributed] = useState(1248590);

  // Simulate live revenue distribution counting
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalDistributed(prev => prev + Math.floor(Math.random() * 5));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Non-Custodial Wallet",
      desc: "True ownership. Your private keys are encrypted on your device. Support for 10+ chains including ETH, SOL, and BTC.",
      icon: ShieldCheck,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10"
    },
    {
      title: "2M+ TPS Blockchain",
      desc: "Fluid Chain delivers sub-second finality and infinite scalability via dynamic sharding architecture.",
      icon: Zap,
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      title: "Parmaweb Hosting",
      desc: "Censorship-resistant permanent hosting. Pay once in FLUID tokens and store your dApps forever.",
      icon: Server,
      color: "text-orange-500",
      bg: "bg-orange-500/10"
    },
    {
      title: "Endowment Economy",
      desc: "A revolutionary economic model where storage fees generate yield to sustain network costs indefinitely.",
      icon: Database,
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    },
    {
      title: "Transparent & Efficient",
      desc: "Zero hidden fees. Real-time on-chain transparency for all transactions and hosting allocations.",
      icon: Layers,
      color: "text-cyan-500",
      bg: "bg-cyan-500/10"
    },
    {
      title: "Global Fiat Ramp",
      desc: "Seamlessly move between crypto and fiat. Spend globally with virtual cards and instant bank transfers.",
      icon: Globe,
      color: "text-pink-500",
      bg: "bg-pink-500/10"
    }
  ];

  return (
    <div className="flex flex-col gap-0">
        {/* Hero Section */}
        <div className="relative bg-transparent">
            <section id="presale" className="relative pt-32 pb-20 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
              </div>

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
                      <button 
                        onClick={() => onNavigate('buy')}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/40 border border-slate-700/50 mb-6 animate-fade-in-up backdrop-blur-sm hover:bg-slate-800/50 transition-colors group cursor-pointer"
                      >
                        <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-emerald-400 text-xs font-bold tracking-wide uppercase group-hover:text-emerald-300">Presale Stage 1 Live</span>
                        <ArrowRight size={14} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight animate-fade-in-up leading-tight">
                        Scalable Blockchain. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-emerald-400">Permanent Hosting.</span>
                      </h1>

                      <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up">
                        The first Layer-1 delivering 2M+ TPS and censorship-resistant storage. Manage assets with our non-custodial multi-chain wallet.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center animate-fade-in-up">
                          <button 
                            onClick={() => onNavigate('buy')}
                            className="px-8 py-4 rounded-full bg-gradient-to-r from-lime-400 to-green-500 text-slate-900 font-bold text-lg hover:shadow-lg hover:shadow-lime-500/20 transition-all hover:scale-105 flex items-center justify-center gap-2"
                          >
                            Buy FLUID Tokens <ArrowRight size={20} />
                          </button>
                          <button 
                             onClick={() => onNavigate('blockchain')}
                             className="px-8 py-4 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                          >
                            Explore Protocol
                          </button>
                      </div>
                  </div>
              </div>
            </section>

            {/* Metrics Strip */}
            <div className="border-y border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-sm relative z-20">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="text-center">
                          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">2M+</div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">TPS</div>
                      </div>
                      <div className="text-center">
                          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">~600ms</div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Finality</div>
                      </div>
                      <div className="text-center">
                          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">100%</div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Uptime</div>
                      </div>
                      <div className="text-center">
                          <div className="text-3xl font-extrabold text-slate-900 dark:text-white">Zero</div>
                          <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">Custody</div>
                      </div>
                  </div>
               </div>
            </div>

            {/* REVENUE SHARING SECTION */}
            <section className="py-24 relative overflow-hidden bg-white dark:bg-slate-950">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="grid lg:grid-cols-2 gap-16 items-center">
                     
                     {/* Left Side: Info */}
                     <div className="scroll-card">
                        <span className="text-emerald-500 font-bold uppercase tracking-widest text-sm">Real Yield Economy</span>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mt-4 mb-6">
                           Egalitarian <br/>
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Proportional Yield.</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                           Fluid eliminates complex tiers. We believe in fair distribution: 40% of all platform revenue—hosting fees, trading volume, and card spreads—is redistributed directly to $FLUID stakers. Every token earns the exact same share.
                        </p>
                        
                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                           <div className="flex items-start gap-3">
                              <div className="mt-1 w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                 <Scale size={20} className="text-emerald-500" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-slate-900 dark:text-white">Fair Share Distribution</h4>
                                 <p className="text-sm text-slate-500">Earnings are strictly based on your percentage of the total staked pool.</p>
                              </div>
                           </div>
                           <div className="flex items-start gap-3">
                              <div className="mt-1 w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                 <Percent size={20} className="text-cyan-500" />
                              </div>
                              <div>
                                 <h4 className="font-bold text-slate-900 dark:text-white">Base Yield for All</h4>
                                 <p className="text-sm text-slate-500">No minimums required to start earning your piece of the ecosystem.</p>
                              </div>
                           </div>
                        </div>

                        <button 
                           onClick={() => onNavigate('token')}
                           className="inline-flex items-center gap-2 text-emerald-500 font-bold hover:text-emerald-400 transition-colors group"
                        >
                           View Distribution Dashboard <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>

                     {/* Right Side: Dashboard Simulation */}
                     <div className="relative scroll-card">
                        <div className="absolute inset-0 bg-emerald-500/10 blur-[80px] rounded-full"></div>
                        <div className="relative bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 shadow-2xl backdrop-blur-xl">
                           <div className="flex justify-between items-center mb-8">
                              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                 <PieChart size={18} className="text-emerald-500" /> Live Redistribution
                              </h3>
                              <span className="text-xs font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-lg">UNIFIED POOL</span>
                           </div>

                           <div className="text-center mb-10">
                              <div className="text-sm text-slate-500 font-bold uppercase tracking-widest mb-1">Total Distributed to Stakers</div>
                              <div className="text-5xl font-mono font-extrabold text-slate-900 dark:text-white">
                                 ${totalDistributed.toLocaleString()}
                              </div>
                              <div className="text-emerald-500 text-sm font-bold flex items-center justify-center gap-1 mt-2">
                                 <TrendingUp size={14} /> +12.4% vs last period
                              </div>
                           </div>

                           <div className="space-y-4">
                              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                                 <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                                          <Server size={20} />
                                       </div>
                                       <div>
                                          <div className="text-sm font-bold text-slate-900 dark:text-white">Parmaweb Storage</div>
                                          <div className="text-[10px] text-slate-500">Direct Pool Contribution</div>
                                       </div>
                                    </div>
                                    <div className="text-right">
                                       <div className="font-bold text-emerald-500">+$12,402</div>
                                       <div className="text-[10px] text-slate-500">Allocated</div>
                                    </div>
                                 </div>
                              </div>
                              <div className="bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                                 <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                          <Repeat size={20} />
                                       </div>
                                       <div>
                                          <div className="text-sm font-bold text-slate-900 dark:text-white">DEX Volume Share</div>
                                          <div className="text-[10px] text-slate-500">Real-time Fees</div>
                                       </div>
                                    </div>
                                    <div className="text-right">
                                       <div className="font-bold text-emerald-500">+$8,940</div>
                                       <div className="text-[10px] text-slate-500">Allocated</div>
                                    </div>
                                 </div>
                              </div>
                           </div>

                           <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
                              <div className="flex items-center justify-between">
                                 <div className="flex items-center gap-2">
                                    <HandCoins size={18} className="text-slate-400" />
                                    <span className="text-xs font-bold text-slate-500">Standardized Base Yield</span>
                                 </div>
                                 <span className="text-sm font-bold text-emerald-500">~18.5% APY</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            
            {/* Features Grid */}
            <section className="py-24 relative bg-slate-50 dark:bg-slate-900/50">
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                     <span className="text-blue-500 font-bold uppercase tracking-widest text-sm">Ecosystem</span>
                     <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-2">Built for Efficiency & Transparency</h2>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {features.map((feature, i) => (
                        <div key={i} className="p-8 rounded-3xl bg-white dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all group hover:-translate-y-1">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}>
                              <feature.icon size={24} />
                           </div>
                           <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{feature.title}</h3>
                           <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                              {feature.desc}
                           </p>
                        </div>
                     ))}
                  </div>
               </div>
            </section>
        </div>
    </div>
  );
};

export default Home;