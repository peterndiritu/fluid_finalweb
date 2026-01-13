import React, { useState, useEffect } from 'react';
import { Wallet, ArrowRight, CreditCard, ArrowLeftRight, Server, Lock, Repeat, Zap, Globe, ShieldCheck, Database, Layers, PieChart, HandCoins, TrendingUp, Landmark, Percent, Scale } from 'lucide-react';
import FluidAssistant from '../components/FluidAssistant';

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
                        <span className="text-emerald-400 text-xs font-bold tracking-wide">
                          Presale is Live - Join Now
                        </span>
                        <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </button>

                      <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-8 tracking-tighter leading-[0.9]">
                        The Fluid <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-emerald-400 to-cyan-500">Infrastructure</span>
                      </h1>
                      
                      <p className="text-xl text-slate-400 max-w-2xl mb-12 font-medium">
                        Building the foundations of the permanent web. Institutional-grade blockchain for the next generation of finance and storage.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-4 mb-20 w-full justify-center">
                         <button 
                          onClick={() => onNavigate('buy')}
                          className="px-10 py-5 bg-white text-slate-950 font-bold rounded-2xl text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                         >
                           Get Started <ArrowRight size={20} />
                         </button>
                         <button 
                          onClick={() => onNavigate('about')}
                          className="px-10 py-5 bg-slate-900 text-white border border-slate-800 font-bold rounded-2xl text-lg hover:bg-slate-800 transition-colors"
                         >
                           Whitepaper
                         </button>
                      </div>
                </div>
              </div>
            </section>
        </div>

        {/* Features Section */}
        <section id="features" className="py-24 bg-transparent border-y border-slate-200 dark:border-slate-800">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                 <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Core Ecosystem</h2>
                 <p className="text-slate-500 font-medium">Powering the next era of decentralized services.</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {features.map((item, idx) => (
                    <div key={idx} className="p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl hover:border-emerald-500/30 transition-all group shadow-sm dark:shadow-none">
                       <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6 ${item.color} group-hover:scale-110 transition-transform`}>
                          <item.icon size={28} />
                       </div>
                       <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
                       <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Gemini AI Assistant */}
        <FluidAssistant />

        {/* Stats CTA */}
        <section className="py-20 bg-slate-900/50 backdrop-blur-md border-b border-slate-800">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
              <div>
                 <h2 className="text-3xl font-bold text-white mb-2">Join 12,400+ Early Supporters</h2>
                 <p className="text-slate-400 font-medium">Revenue distributed back to holders in real-time.</p>
              </div>
              <div className="flex flex-col items-center">
                 <div className="text-4xl font-mono font-extrabold text-emerald-400 mb-1">
                    ${totalDistributed.toLocaleString()}
                 </div>
                 <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Revenue Distributed</div>
              </div>
              <button 
                onClick={() => onNavigate('buy')}
                className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
              >
                 Join Presale
              </button>
           </div>
        </section>
    </div>
  );
};

export default Home;